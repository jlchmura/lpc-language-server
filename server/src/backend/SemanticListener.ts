import { ParseTree, ParserRuleContext, RuleContext, Token } from "antlr4ng";
import { LPCParserListener } from "../parser3/LPCParserListener";
import { IDiagnosticEntry, SymbolGroupKind } from "../types";
import { ContextSymbolTable } from "./ContextSymbolTable";
import {
    CallOtherExpressionContext,
    CallOtherTargetContext,
    CloneObjectExpressionContext,
    FunctionDeclarationContext,
    IdentifierExpressionContext,
    IncludeDirectiveContext,
    InheritStatementContext,
    MethodInvocationContext,
    PrimaryExpressionContext,
    ProgramContext,
} from "../parser3/LPCParser";
import {
    ScopedSymbol,
    TypeKind,
    MethodSymbol as BaseMethodSymbol,
} from "antlr4-c3";
import {
    EfunSymbol,
    ITypedSymbol,
    IdentifierSymbol,
    InheritSymbol,
} from "../symbols/Symbol";
import {
    areSetsEqual,
    areTwoParameterArraysEqual,
    getSibling,
    rangeFromTokens,
    resolveOfTypeSync,
    trimQuotes,
} from "../utils";
import { VariableSymbol } from "../symbols/variableSymbol";
import { MethodDeclarationSymbol, MethodSymbol } from "../symbols/methodSymbol";
import { isInstanceOfIEvaluatableSymbol } from "../symbols/base";
import { CallOtherSymbol } from "../symbols/objectSymbol";
import { DiagnosticSeverity } from "vscode-languageserver";
import { IncludeSymbol } from "../symbols/includeSymbol";
import { SourceContext } from "./SourceContext";

export class SemanticListener extends LPCParserListener {
    private seenSymbols = new Map<string, Token>();

    public constructor(
        private diagnostics: IDiagnosticEntry[],
        private symbolTable: ContextSymbolTable,
        private sourceContext: SourceContext
    ) {
        super();
    }

    enterProgram = (ctx: ProgramContext) => {
        // evaluate everything, so that we can use teh eval results in further diagnostics
        this.evaluateProgram(this.symbolTable);
    };

    /**
     * validate that the include file was loaded
     * @param ctx
     */
    exitIncludeDirective = (ctx: IncludeDirectiveContext) => {
        const symbol = this.symbolTable.symbolWithContextSync(
            ctx
        ) as IncludeSymbol;
        if (!symbol?.isLoaded) {
            this.logDiagnostic(
                "Could not load include file '" + symbol.name + "'",
                ctx.start,
                ctx.stop,
                DiagnosticSeverity.Warning
            );
        }
    };

    exitInheritStatement = (ctx: InheritStatementContext) => {
        const symbol = this.symbolTable.symbolWithContextSync(
            ctx
        ) as InheritSymbol;
        if (!symbol?.isLoaded) {
            this.logDiagnostic(
                "Could not load inherited file '" + symbol.name + "'",
                ctx.start,
                ctx.stop,
                DiagnosticSeverity.Warning
            );
        }
    };

    exitIdentifierExpression = (ctx: IdentifierExpressionContext): void => {
        const id = ctx.Identifier();
        const symbol = id.getText();

        const ss = this.symbolTable.symbolWithContextSync(ctx);
        const scope = ss.getParentOfType(ScopedSymbol);
        const parentContext = this.symbolTable.findSymbolDefinition(ctx);
        const parentScope = parentContext?.getParentOfType(ScopedSymbol);

        this.checkSymbolExistence(
            true,
            SymbolGroupKind.Identifier,
            symbol,
            "Unknown symbol",
            id.symbol,
            parentScope
        );
        this.symbolTable.incrementSymbolRefCount(symbol);
    };

    exitCallOtherTarget = (ctx: CallOtherTargetContext) => {
        // find the object that the method is being called on
        const target = getSibling(ctx, -2); // -1 is the arrow
        const symbol = this.symbolTable.symbolWithContextSync(target);

        const symbolCont = this.symbolTable.symbolContainingContext(ctx);

        const i = 0;
    };

    exitFunctionDeclaration = (ctx: FunctionDeclarationContext) => {
        const symbol = this.symbolTable.symbolWithContextSync(
            ctx
        ) as MethodSymbol;
        if (!symbol) return;

        const functionDef = resolveOfTypeSync(
            symbol.parent,
            symbol.name,
            MethodDeclarationSymbol,
            false
        );

        const funStart = ctx.start;
        const funEnd = ctx.functionHeader().PAREN_CLOSE().symbol;

        if (!!functionDef) {
            // validate that everything matches
            if (
                !areSetsEqual(
                    symbol.functionModifiers,
                    functionDef.functionModifiers
                )
            ) {
                this.logDiagnostic(
                    "Function modifiers do not match",
                    funStart,
                    funEnd
                );
            }

            if (symbol.returnType?.name !== functionDef.returnType?.name) {
                this.logDiagnostic(
                    `Function return type (${
                        symbol.returnType?.name ?? "unspecified"
                    }) does not match its definition (${
                        functionDef.returnType?.name ?? "unspecified"
                    })`,
                    funStart,
                    funEnd
                );
            }

            if (
                !areTwoParameterArraysEqual(
                    symbol.getParametersSync(),
                    functionDef.getParametersSync()
                )
            ) {
                this.logDiagnostic(
                    `Function parameters do not match its definition`,
                    funStart,
                    funEnd
                );
            }
        }
    };

    evaluateProgram(progSymbol: ScopedSymbol) {
        // if (this.diagnostics.length > 0) {
        //     console.log("Skipping eval due to unresolved diagnostics");
        //     return;
        // }
        for (const child of progSymbol.children) {
            if (child instanceof MethodSymbol) {
                child.resetCallDepth();
            }
            if (isInstanceOfIEvaluatableSymbol(child)) {
                child.eval();
            } else {
                console.debug("node not evaluable: " + child.name);
            }
        }
    }

    exitMethodInvocation = (ctx: MethodInvocationContext) => {
        const parent = ctx.parent as PrimaryExpressionContext;

        // the tokens to use to generate the error range
        let rangeStart = parent.start;
        let rangeEnd = parent.stop;

        // find the context that this method is being invoked on
        const methodObj = getSibling(ctx, -1);
        const methodName = trimQuotes(methodObj.getText());
        rangeStart = methodObj.start;

        // symbol table that will be used to look up definition
        let lookupTable: ContextSymbolTable = this.symbolTable;

        // if this is a call to another object, use that object's symbol table
        if (ctx.parent instanceof CallOtherExpressionContext) {
            const callOtherSymbol = this.symbolTable.symbolWithContextSync(
                ctx.parent
            ) as CallOtherSymbol;
            if (callOtherSymbol.objectRef?.isLoaded === true) {
                lookupTable = callOtherSymbol.objectRef.context.symbolTable;
            } else {
                this.logDiagnostic(
                    `Object '${
                        callOtherSymbol.objectRef?.filename ?? ""
                    }' could not be loaded`,
                    methodObj.start,
                    methodObj.stop,
                    DiagnosticSeverity.Warning
                );
                return;
            }
        }

        // get the definition for that method
        const methodSymbol = lookupTable.resolveSync(
            methodName
        ) as MethodSymbol;
        const symbolInfo = lookupTable.getSymbolInfo(methodSymbol);

        // this will include efuns
        if (methodName && methodSymbol instanceof BaseMethodSymbol) {
            // check if the number of arguments is correct
            const callArgs = ctx.argumentList()?.argument() ?? [];
            const methodParams = methodSymbol?.getParametersSync() ?? [];
            const isVarArgs = methodSymbol.functionModifiers.has("varargs");

            if (callArgs.length < methodParams.length && !isVarArgs) {
                // find first arg that wasn't provided
                const notProvidedArg = methodParams[callArgs.length];
                const entry = this.logDiagnostic(
                    `Expected ${methodParams.length} arguments, but got ${callArgs.length}`,
                    rangeStart,
                    rangeEnd
                );

                // add info about the missing arg
                entry.related = {
                    type: DiagnosticSeverity.Error,
                    message: `An argument for '${notProvidedArg.name}' was not provided`,
                    range: symbolInfo?.definition?.range ?? entry.range,
                    source: symbolInfo?.source,
                };
            } else if (callArgs.length > methodParams.length) {
                if (
                    !(
                        methodSymbol instanceof EfunSymbol &&
                        methodSymbol.allowsMultiArgs()
                    )
                ) {
                    // create range based on any extra args
                    const offenderStart = callArgs[methodParams.length].start;
                    const offenderEnd = callArgs[callArgs.length - 1].stop;
                    const entry = this.logDiagnostic(
                        `Expected ${methodParams.length} arguments, but got ${callArgs.length}`,
                        offenderStart,
                        offenderEnd
                    );
                }
            }
        } else {
            this.logDiagnostic(
                "Unknown function name",
                parent.start,
                parent.stop
            );
        }
    };

    private logDiagnostic(
        message: string,
        offendingTokenStart: Token,
        offendingTokenEnd: Token,
        type: DiagnosticSeverity = DiagnosticSeverity.Error
    ) {
        offendingTokenEnd = offendingTokenEnd ?? offendingTokenStart;
        const entry: IDiagnosticEntry = {
            type: type,
            message: message,
            range: rangeFromTokens(offendingTokenStart, offendingTokenEnd),
        };
        this.diagnostics.push(entry);
        return entry;
    }

    protected checkSymbolExistence(
        mustExist: boolean,
        kind: SymbolGroupKind,
        symbol: string,
        message: string,
        offendingToken: Token,
        context?: ScopedSymbol
    ): void {
        if (
            this.symbolTable.symbolExistsInGroup(
                symbol,
                kind,
                false,
                context
            ) !== mustExist
        ) {
            const entry: IDiagnosticEntry = {
                type: DiagnosticSeverity.Error,
                message: message + " '" + symbol + "'",
                range: {
                    start: {
                        column: offendingToken.column,
                        row: offendingToken.line,
                    },
                    end: {
                        column:
                            offendingToken.column +
                            offendingToken.stop -
                            offendingToken.start +
                            1,
                        row: offendingToken.line,
                    },
                },
            };
            this.diagnostics.push(entry);
        }
    }
}

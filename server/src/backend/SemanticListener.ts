import { Token } from "antlr4ng";
import { LPCParserListener } from "../parser3/LPCParserListener";
import { IDiagnosticEntry, SymbolGroupKind } from "../types";
import { ContextSymbolTable } from "./ContextSymbolTable";
import {
    CallOtherTargetContext,
    FunctionDeclarationContext,
    InheritStatementContext,
    MethodInvocationContext,
    PrimaryExpressionContext,
    PrimitiveTypeVariableDeclarationContext,
    ProgramContext,
} from "../parser3/LPCParser";
import { ScopedSymbol, MethodSymbol as BaseMethodSymbol } from "antlr4-c3";
import {
    areSetsEqual,
    areTwoParameterArraysEqual,
    getSibling,
    rangeFromTokens,
    resolveOfTypeSync,
    symbolWithContextSync,
} from "../utils";
import {
    EfunSymbol,
    MethodDeclarationSymbol,
    MethodInvocationSymbol,
    MethodSymbol,
} from "../symbols/methodSymbol";
import { CallOtherSymbol } from "../symbols/objectSymbol";
import { DiagnosticSeverity } from "vscode-languageserver";
import { IncludeSymbol } from "../symbols/includeSymbol";
import { SourceContext } from "./SourceContext";
import { CallStack } from "./CallStack";
import { InheritSymbol } from "../symbols/inheritSymbol";
import { addPogramToStack } from "./CallStackUtils";
import { ensureLpcConfig } from "./LpcConfig";
import { getDriverInfo } from "../driver/Driver";
import { EfunSymbols } from "../driver/EfunsLDMud";
import { isInstanceOfIEvaluatableSymbol } from "../symbols/base";

export class SemanticListener extends LPCParserListener {
    private seenSymbols = new Map<string, Token>();
    private config = ensureLpcConfig();
    private driver = getDriverInfo();

    public constructor(
        private diagnostics: IDiagnosticEntry[],
        private symbolTable: ContextSymbolTable,
        private sourceContext: SourceContext
    ) {
        super();
    }

    enterProgram = (ctx: ProgramContext) => {
        // evaluate everything, so that we can use the eval results in further diagnostics
        //try {
        this.evaluateProgram(this.symbolTable);
        // } catch (e) {
        //     console.error("SemanticListener: error evaluating program: ", e);
        // }
    };

    // /**
    //  * validate that the include file was loaded
    //  * @param ctx
    //  */
    // exitIncludeDirective = (ctx: IncludeDirectiveContext) => {
    //     const symbol = symbolWithContextSync(this.symbolTable,
    //         ctx
    //     ) as IncludeSymbol;
    //     if (!symbol?.isLoaded) {
    //         this.logDiagnostic(
    //             "Could not load include file '" + symbol.name + "'",
    //             ctx.start,
    //             ctx.stop,
    //             DiagnosticSeverity.Warning
    //         );
    //     }
    // };

    exitInheritStatement = (ctx: InheritStatementContext) => {
        const symbol = symbolWithContextSync(
            this.symbolTable,
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

    // exitIdentifierExpression = (ctx: IdentifierExpressionContext): void => {
    //     const id = ctx.Identifier();
    //     const symbol = id.getText();

    //     const ss = symbolWithContextSync(this.symbolTable,ctx);
    //     const scope = ss?.getParentOfType(ScopedSymbol);
    //     const parentContext = this.symbolTable.findSymbolDefinition(ctx);
    //     const parentScope = parentContext?.getParentOfType(ScopedSymbol);

    //     this.checkSymbolExistence(
    //         true,
    //         SymbolGroupKind.Identifier,
    //         symbol,
    //         "Unknown symbol",
    //         id.symbol,
    //         parentScope
    //     );
    //     this.symbolTable.incrementSymbolRefCount(symbol);
    // };

    exitCallOtherTarget = (ctx: CallOtherTargetContext) => {};

    exitFunctionDeclaration = (ctx: FunctionDeclarationContext) => {
        const symbol = symbolWithContextSync(
            this.symbolTable,
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

    exitPrimitiveTypeVariableDeclaration = (
        ctx: PrimitiveTypeVariableDeclarationContext
    ) => {
        const objName = ctx._objectName;

        if (!!objName?.text) {
            const { version } = this.config.driver;

            if (
                !this.driver.checkFeatureCompatibility(
                    "NamedObjectTypes",
                    version
                )
            ) {
                this.logDiagnostic(
                    `Named object type not supported by driver version ${version}`,
                    objName,
                    objName,
                    DiagnosticSeverity.Warning
                );
            }
        }
    };

    evaluateProgram(progSymbol: ScopedSymbol) {
        const stack = new CallStack(progSymbol);
        const programFilename = this.sourceContext.fileName;
        const backend = this.sourceContext.backend;
        const imports = backend.getDependencies(programFilename);

        // add globals (efuns, etc) to the stack first
        // NTBLA: what about SEFUNS
        addPogramToStack(EfunSymbols, stack);

        // add all dependencies to the stack second
        // must be done recurisvely
        const processed = new Set<string>();
        while (imports.length > 0) {
            const importFilename = imports.shift();
            const importCtx = backend.getContext(importFilename);
            if (!!importCtx && !processed.has(importFilename)) {
                processed.add(importFilename);

                const importTbl = importCtx.symbolTable;
                addPogramToStack(importTbl, stack);

                imports.push(
                    ...(backend.getDependencies(importFilename) ?? [])
                );
            }
        }

        // TODO:  this is wrong. We need to evaluate as we add symbols
        // to the stack to match the order in which LPC runs code.

        // now add this program to the stack
        addPogramToStack(progSymbol, stack);

        // now evaluate this program
        for (const child of progSymbol.children) {
            if (child instanceof MethodSymbol) {
                const result = child.eval(stack);
            }
        }
    }

    exitMethodInvocation = (ctx: MethodInvocationContext) => {
        const parent = ctx.parent as unknown as PrimaryExpressionContext;

        // the tokens to use to generate the error range
        let rangeStart = parent.start;
        let rangeEnd = parent.stop;

        // find the context that this method is being invoked on
        const methodObj = getSibling(ctx, -1);
        rangeStart = methodObj.start;

        // get the method invocation symbol
        const methodInvSymbol = symbolWithContextSync(
            this.symbolTable,
            ctx
        ) as MethodInvocationSymbol;

        // get the symbol for the method
        const methodSymbol = methodInvSymbol?.getMethodSymbol();
        const methodName = methodSymbol?.name ?? methodObj.getText();

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
                    `Wrong number of arguments to ${methodName}: expected ${methodParams.length}, got ${callArgs.length}`,
                    rangeStart,
                    rangeEnd
                );

                // get the definition for that method
                const symbolInfo =
                    this.symbolTable.getSymbolInfo(methodInvSymbol);

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
        } else if (
            methodInvSymbol &&
            methodInvSymbol.parent instanceof CallOtherSymbol &&
            !methodInvSymbol.parent.objContext
        ) {
            // if the method wasn't found because its a call other and the source object wasn't loaded, then
            // log that as a warning, not an error.
            this.logDiagnostic(
                `Call other object could not be loaded, unable to resolve function`,
                parent.start,
                parent.stop,
                DiagnosticSeverity.Warning
            );
        } else {
        }
    };

    // exitPrimaryExpression = (ctx: PrimaryExpressionContext) => {
    //     if (
    //         ctx.ARROW().length > 0 &&
    //         (ctx.callOtherTarget().length === 0 ||
    //             ctx.methodInvocation().length === 0)
    //     ) {
    //         this.logDiagnostic(
    //             "Call_other expression missing function name",
    //             ctx.start,
    //             ctx.stop
    //         );
    //     }
    // };

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

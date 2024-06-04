import { ParserRuleContext, Token } from "antlr4ng";
import { LPCParserListener } from "../parser3/LPCParserListener";
import { IDiagnosticEntry, SymbolGroupKind } from "../types";
import { ContextSymbolTable } from "./ContextSymbolTable";
import {
    CallOtherTargetContext,
    CatchExprContext,
    CatchExpressionContext,
    FunctionDeclarationContext,
    InheritStatementContext,
    LiteralContext,
    MethodInvocationContext,
    ParameterContext,
    PrimaryExpressionContext,
    ProgramContext,
    StructInitializerExpressionContext,
    VariableDeclarationContext,
} from "../parser3/LPCParser";
import { ScopedSymbol, MethodSymbol as BaseMethodSymbol } from "antlr4-c3";
import {
    areSetsEqual,
    areTwoParameterArraysEqual,
    firstEntry,
    getSibling,
    lastEntry,
    logDiagnosticForTokens,
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
import { LPCToken } from "../parser3/LPCToken";
import { LDMudFeatures } from "../driver/DriverLdMud";
import { FluffOSFeatures } from "../driver/DriverFluffOS";
import { FeatureValidationResult, IDriver } from "../driver/types";

export class SemanticListener extends LPCParserListener {
    private seenSymbols = new Map<string, Token>();
    private config = ensureLpcConfig();
    private driver: IDriver = getDriverInfo();

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
            // but ignore the deprecated flag

            const symbolMods = new Set(symbol.functionModifiers);
            symbolMods.delete("deprecated");
            const defMods = new Set(functionDef.functionModifiers);
            defMods.delete("deprecated");

            if (!areSetsEqual(symbolMods, defMods)) {
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

    exitVariableDeclaration = (ctx: VariableDeclarationContext) => {
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
                    `Expected ${methodParams.length} arguments, but got ${callArgs.length}.`,
                    rangeStart,
                    rangeEnd,
                    DiagnosticSeverity.Error,
                    "argumentsMissing"
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
                    ) &&
                    lastEntry(methodParams)?.varArgs !== true
                ) {
                    // create range based on any extra args
                    const offenderStart = callArgs[methodParams.length].start;
                    const offenderEnd = callArgs[callArgs.length - 1].stop;

                    const entry = this.logDiagnostic(
                        `Expected ${methodParams.length} arguments, but got ${callArgs.length}.`,
                        offenderStart,
                        ctx.PAREN_CLOSE().getSymbol(),
                        DiagnosticSeverity.Error,
                        "argumentsTooMany"
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

    exitPrimaryExpression = (ctx: PrimaryExpressionContext) => {
        if (ctx.DOT()?.length > 0) {
            const { version } = this.config.driver;

            if (
                !this.driver.checkFeatureCompatibility(
                    LDMudFeatures.DotCallStrict,
                    version
                )
            ) {
                const dot = firstEntry(ctx.DOT());
                this.logDiagnostic(
                    `call_strict operator form (.) not supported by driver version ${version}`,
                    dot.getSymbol(),
                    dot.getSymbol(),
                    DiagnosticSeverity.Warning
                );
            }
        }
    };

    exitLiteral = (ctx: LiteralContext) => {
        // format thousands separator in fluffos
        // e.g. 1_000_000
        if (ctx.IntegerConstant() || ctx.FloatingConstant()) {
            const txt = ctx.getText();
            if (txt.indexOf("_") > -1) {
                const { version, type } = this.config.driver;

                const check = this.driver.checkFeatureCompatibility(
                    FluffOSFeatures.NumericConstThousandSeparator,
                    version
                );

                let msg: string =
                    "Numeric constant with underscore not supported by driver ";
                if (check == FeatureValidationResult.NotSupported) {
                    msg += `type ${type}`;
                } else if (
                    check == FeatureValidationResult.VersionNotSufficient
                ) {
                    msg += `version ${version}`;
                }

                if (check != FeatureValidationResult.Supported) {
                    const sym = ctx.IntegerConstant().getSymbol();
                    this.logDiagnostic(msg, sym, sym, DiagnosticSeverity.Error);
                }
            }
        }
    };

    enterParameter = (ctx: ParameterContext) => {
        const { version, type } = this.config.driver;

        if (ctx.TRIPPLEDOT()) {
            this.validateFeatureSupported(
                ctx,
                ctx.TRIPPLEDOT().getSymbol(),
                FluffOSFeatures.SyntaxArgSpreadOperator,
                "Argument spread operator not supported"
            );
        }
    };

    enterStructInitializerExpression = (
        ctx: StructInitializerExpressionContext
    ) => {
        if (ctx.NEW()) {
            this.validateFeatureSupported(
                ctx,
                ctx.NEW().getSymbol(),
                FluffOSFeatures.SyntaxNewStruct,
                "new(class Identifier) syntax not supported"
            );
        } else {
            this.validateFeatureSupported(
                ctx,
                ctx._structName,
                LDMudFeatures.SyntaxStructInitializer,
                "<Identifier> struct initializer syntax not supported"
            );
        }
    };

    enterCatchExpr = (ctx: CatchExprContext) => {
        if (!!ctx.block()) {
            this.validateFeatureSupported(
                ctx,
                ctx.CATCH().getSymbol(),
                FluffOSFeatures.SyntaxCatchBlock,
                "catch {} syntax not supported"
            );
        }
    };

    private validateFeatureSupported(
        ctx: ParserRuleContext,
        token: Token,
        feature: string,
        failMsg: string
    ): boolean {
        let msgSuffix: string;
        switch (
            this.driver.checkFeatureCompatibility(
                feature,
                this.config.driver.version
            )
        ) {
            case FeatureValidationResult.NotSupported:
                msgSuffix = `by driver type ${this.config.driver.type}`;
                break;
            case FeatureValidationResult.VersionNotSufficient:
                msgSuffix = `by driver version ${this.config.driver.version}`;
                break;
            case FeatureValidationResult.Supported:
                return true;
        }

        logDiagnosticForTokens(
            this.diagnostics,
            `${failMsg} ${msgSuffix}`,
            token,
            token,
            DiagnosticSeverity.Error
        );

        return false;
    }

    private logDiagnostic(
        message: string,
        offendingTokenStart: Token,
        offendingTokenEnd: Token,
        type: DiagnosticSeverity = DiagnosticSeverity.Error,
        source?: string
    ) {
        return logDiagnosticForTokens(
            this.diagnostics,
            message,
            offendingTokenStart,
            offendingTokenEnd,
            type,
            source
        );
    }
}

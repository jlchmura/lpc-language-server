import * as commentParser from "comment-parser";
import {
    AbstractParseTreeVisitor,
    BailErrorStrategy,
    CharStream,
    CommonTokenStream,
    ParseTree,
    ParserRuleContext,
    PredictionMode,
    TerminalNode,
    Token,
} from "antlr4ng";
import { LPCParserVisitor } from "../parser3/LPCParserVisitor";
import {
    ArrayType,
    BaseSymbol,
    FundamentalType,
    IType,
    ReferenceKind,
    ScopedSymbol,
    SymbolTable,
    SymbolConstructor,
} from "antlr4-c3";
import { ContextSymbolTable } from "./ContextSymbolTable";
import { LpcFacade } from "./facade";
import {
    AdditiveExpressionContext,
    AndExpressionContext,
    AssignmentExpressionContext,
    BracketExpressionContext,
    CallOtherTargetContext,
    CloneObjectExpressionContext,
    ConditionalAndExpressionContext,
    ConditionalExpressionContext,
    ConditionalOrExpressionContext,
    DefinePreprocessorDirectiveContext,
    EqualityExpressionContext,
    ExclusiveOrExpressionContext,
    ExpressionContext,
    FunctionDeclarationContext,
    FunctionHeaderDeclarationContext,
    IdentifierExpressionContext,
    IfStatementContext,
    IncludeDirectiveContext,
    InclusiveOrExpressionContext,
    InheritStatementContext,
    InheritSuperExpressionContext,
    InlineClosureExpressionContext,
    LPCParser,
    LambdaExpressionContext,
    LiteralContext,
    MethodInvocationContext,
    MultiplicativeExpressionContext,
    ParameterListContext,
    PrimaryExpressionContext,
    PrimitiveTypeParameterExpressionContext,
    PrimitiveTypeVariableDeclarationContext,
    ProgramContext,
    RelationalExpresionContext,
    ReturnStatementContext,
    SelectionDirectiveContext,
    StructDeclarationContext,
    StructParameterExpressionContext,
    StructVariableDeclarationContext,
} from "../parser3/LPCParser";
import { IdentifierSymbol, PreprocessorSymbol } from "../symbols/Symbol";
import { FoldingRange, SemanticTokensBuilder } from "vscode-languageserver";
import {
    COMMENT_CHANNEL_NUM,
    ContextImportInfo,
    LpcTypes,
    SemanticTokenModifiers,
    SemanticTokenTypes,
    typeNameToIType,
} from "../types";
import { LPCLexer } from "../parser3/LPCLexer";
import {
    VariableIdentifierSymbol,
    VariableInitializerSymbol,
    VariableSymbol,
} from "../symbols/variableSymbol";
import { DefineSymbol, DefineVariableSymbol } from "../symbols/defineSymbol";
import { AssignmentSymbol } from "../symbols/assignmentSymbol";
import { InlineClosureSymbol } from "../symbols/closureSymbol";
import {
    FunctionIdentifierSymbol,
    MethodDeclarationSymbol,
    MethodInvocationSymbol,
    MethodParameterSymbol,
    MethodSymbol,
    ReturnSymbol,
} from "../symbols/methodSymbol";
import { ExpressionSymbol } from "../symbols/expressionSymbol";
import {
    firstEntry,
    getSibling,
    lastEntry,
    lexRangeFromContext,
    lexRangeFromToken,
    normalizeFilename,
    trimQuotes,
} from "../utils";
import { LiteralSymbol } from "../symbols/literalSymbol";
import { OperatorSymbol } from "../symbols/operatorSymbol";
import { ConditionalSymbol } from "../symbols/conditionalSymbol";
import { CloneObjectSymbol } from "../symbols/objectSymbol";
import { IncludeSymbol } from "../symbols/includeSymbol";
import { IfSymbol, SelectionSymbol } from "../symbols/selectionSymbol";
import {
    IEvaluatableSymbol,
    IRenameableSymbol,
    getSymbolsOfTypeSync,
} from "../symbols/base";

import { ArrowSymbol } from "../symbols/arrowSymbol";
import { SemanticTokenCollection } from "./SemanticTokenCollection";
import {
    InheritSuperAccessorSymbol,
    InheritSymbol,
} from "../symbols/inheritSymbol";
import { LpcFileHandler } from "./FileHandler";

type GenericConstructorParameters<T> = ConstructorParameters<
    new (...args: any[]) => T
>;

export class DetailsVisitor
    extends AbstractParseTreeVisitor<ScopedSymbol>
    implements LPCParserVisitor<ScopedSymbol>
{
    protected scope = this.symbolTable as ScopedSymbol;

    private defineLexer = new LPCLexer(CharStream.fromString(""));
    private defineTokenStream = new CommonTokenStream(this.defineLexer);
    private defineParser = new LPCParser(this.defineTokenStream);

    constructor(
        private backend: LpcFacade,
        private symbolTable: ContextSymbolTable,
        private imports: ContextImportInfo[],
        private tokenBuilder: SemanticTokenCollection,
        private fileHandler: LpcFileHandler
    ) {
        super();
    }

    /**
     * Parse a synthentic code block from a define directive
     * @param str code block string
     * @returns symbol table
     * @deprecated
     */
    private parseDefine(str: string) {
        this.defineLexer.inputStream = CharStream.fromString(str);
        // reset everything
        this.defineLexer.reset();
        this.defineTokenStream.setTokenSource(this.defineLexer);
        this.defineParser.reset();
        this.defineParser.interpreter.predictionMode = PredictionMode.SLL;
        // no recovery needed, just bail
        this.defineParser.errorHandler = new BailErrorStrategy();
        try {
            const table = new ContextSymbolTable("define", {
                allowDuplicateSymbols: true,
            });
            table.addDependencies(this.symbolTable);
            table.tree = this.defineParser.program();
            const vis = new DetailsVisitor(
                this.backend,
                table,
                [],
                this.tokenBuilder,
                this.fileHandler
            );
            table.tree.accept(vis);
            return table;
        } catch (e) {
            const i = 0;
        }
    }

    /**
     * This parser goes a bit above and beyond when it comes to define directives.
     * Because we want to be able to validate the code that uses them, for example
     * to know that `TP` is the same as `this_player()`.  To do this, the define
     * will be reassembled into a fake function or variable and re-parsed. Assuming
     * the parse is successful, it will then be merged into the original symbol table
     * and assigned to the define's context.  This way the token stream is not modified.
     * @param ctx
     * @returns
     */
    visitDefinePreprocessorDirective = (
        ctx: DefinePreprocessorDirectiveContext
    ) => {
        const tokenIdx = ctx.start.tokenIndex;
        const defineStr = ctx.END_DEFINE()?.getText()?.trim();

        // trim everything after the first space
        // find the first index of a space or tab in defineStr
        const idx = findSpaceOrTabNotInParentheses(defineStr);
        const label = idx > 0 ? defineStr.substring(0, idx) : defineStr;
        let value = defineStr.substring(idx + 1);

        // strip escaped newlines
        value = value.replace(/\\\n/g, "");

        // is this a macro?
        if (label.includes("(")) {
            // re-assemble this as a fake function and parse it
            // the newline before the semi is intention, incase the define has a
            // comment after it
            let funcStr = `${label} { return ${value}\n; }\n`;
            try {
                let table = this.parseDefine(funcStr);
                if (!table) {
                    // try one more time without the return
                    // there may be a better way to do this instead of trying to parse twice
                    funcStr = `${label} { ${value}; }\n`;
                    table = this.parseDefine(funcStr);
                }
                // now there should be a method symbol in there
                const methodSym = firstEntry(
                    getSymbolsOfTypeSync(table, MethodSymbol)
                );
                if (!!methodSym) {
                    // create a new method that will be on this file's symbol table
                    const defineMethodSym = this.addNewSymbol(
                        MethodSymbol,
                        ctx,
                        methodSym.name
                    );
                    defineMethodSym.functionModifiers = new Set();

                    // move params over
                    while (methodSym.children.length > 0) {
                        defineMethodSym.addSymbol(methodSym.firstChild);
                    }

                    return undefined;
                }
            } catch {}
        } else {
            // not a macro, but the value may still have an expression
            const varStr = `${label} = ${value}\n;`;
            try {
                const table = this.parseDefine(varStr);
                // add a variable symbol to this file's table
                const varSym = this.addNewSymbol(
                    DefineVariableSymbol,
                    ctx,
                    label
                );
                // if there is an initializer, move its children over
                const varInit = firstEntry(
                    getSymbolsOfTypeSync(table, VariableInitializerSymbol)
                );
                if (!!varInit) {
                    this.withScope(
                        ctx,
                        VariableInitializerSymbol,
                        ["#initializer#", varSym],
                        (s) => {
                            while (varInit.children.length > 0) {
                                s.addSymbol(varInit.firstChild);
                            }
                        }
                    );

                    return undefined;
                }
            } catch {}
        }

        // this is a final fallback - just add a symbol so we can resolve it
        const sym = this.symbolTable.addNewSymbolOfType(
            DefineSymbol,
            this.scope,
            label,
            value
        );
        sym.context = ctx;

        return this.visitChildren(ctx);
    };

    visitSelectionDirective = (ctx: SelectionDirectiveContext) => {
        const tokenIdx = ctx.start.tokenIndex;
        const label =
            ctx.selectionDirectiveTypeSingle()?.getText() ||
            ctx.selectionDirectiveTypeWithArg()?.getText();
        const name = label + "_" + tokenIdx;

        if (!!name) {
            return this.withScope(ctx, PreprocessorSymbol, [name, label], () =>
                this.visitChildren(ctx)
            );
        } else {
            return this.visitChildren(ctx);
        }
    };

    visitPrimaryExpression = (ctx: PrimaryExpressionContext) => {
        // TODO: special handling for bracket expressions here?

        // NTBLA: need to refactor and combine callother and member access into an "Arrow" symbol
        // because the method I used below breaks call other autocomplete
        // autocomplete will need to load values based on the evaluated symbol type

        if (ctx.ARROW().length > 0) {
            // if there is an arrow and invocation, then this is a call_other expression
            return this.withScope(
                ctx,
                ArrowSymbol,
                ["->", this.fileHandler],
                (symbol) => {
                    // first find the arrow because there can be multiple expressions before it
                    const arrowIdx = ctx.children.findIndex(
                        (c) => c.getText() === "->"
                    );

                    // everything up to the arrow goes into an expression
                    const exprCtx = ctx.children.slice(0, arrowIdx);
                    if (exprCtx.length > 1) {
                        // parse children into an expression
                        const mergedCtx = new PrimaryExpressionContext(
                            ctx,
                            ctx.invokingState
                        );
                        mergedCtx.start = (
                            exprCtx[0] as ParserRuleContext
                        ).start;
                        mergedCtx.stop = (
                            exprCtx[exprCtx.length - 1] as ParserRuleContext
                        ).stop;
                        this.withScope(
                            mergedCtx,
                            ExpressionSymbol,
                            ["#primary-expression#"],
                            (s) => {
                                exprCtx.forEach((c) => this.visit(c));
                            }
                        );
                    } else if (exprCtx.length === 1) {
                        // if there's only one child, then just visit it
                        // and the first child becomes the source Object
                        this.visit(exprCtx[0]);
                    } else {
                        // this shoudn't happen
                        throw new Error("Invalid call_other expression");
                    }

                    // we should end up with one child, which is the source object
                    const sourceObject = symbol.lastChild as IEvaluatableSymbol;

                    // after the arrow we should have a call other target and a method invocation
                    // but those may be missing if the user is typing and the code is incomplete
                    const callOtherTargetCtx = ctx._target;
                    const methodInvocationCtx = ctx._invocation;

                    let target: IEvaluatableSymbol;
                    let methodInvoc: MethodInvocationSymbol;

                    if (!!callOtherTargetCtx) {
                        this.visit(callOtherTargetCtx);
                        target = symbol.lastChild as IEvaluatableSymbol;
                        this.markContext(
                            callOtherTargetCtx,
                            SemanticTokenTypes.Method
                        );
                    }
                    if (!!methodInvocationCtx) {
                        this.visitMethodInvocation(methodInvocationCtx);
                        methodInvoc =
                            symbol.lastChild as MethodInvocationSymbol;
                    }

                    // at this point we have to figure out which type of symbol we're dealing with \
                    // and fill in its properties
                    symbol.source = sourceObject;
                    symbol.target = target;
                    symbol.methodInvocation = methodInvoc;
                    symbol.functionName = target?.name;

                    return symbol;
                }
            );
        } else {
            // standard expression
            return this.withScope(
                ctx,
                ExpressionSymbol,
                ["#primary-expression#"],
                (s) => {
                    return this.visitChildren(ctx);
                }
            );
        }
    };

    private markToken(
        token: Token,
        tokenType: number,
        tokenModifiers: number[] = []
    ) {
        if (!token) return;

        this.tokenBuilder.add(
            token.line,
            token.column,
            token.stop - token.start + 1,
            tokenType,
            tokenModifiers
        );
    }

    private markContext(
        ctx: ParserRuleContext,
        tokenType: number,
        tokenModifiers: number[] = []
    ) {
        if (!ctx) return;
        const { start, stop } = ctx;

        this.tokenBuilder.add(
            start.line,
            start.column,
            stop.stop - start.start + 1,
            tokenType,
            tokenModifiers
        );
    }

    visitCallOtherTarget = (ctx: CallOtherTargetContext) => {
        // the call other target can be an identifier, a string literal, or an expression
        if (ctx.Identifier()) {
            const fid = this.addNewSymbol(
                FunctionIdentifierSymbol,
                ctx,
                ctx.Identifier().getText()
            );
            fid.nameRange = lexRangeFromToken(ctx.Identifier().symbol);
            this.markToken(ctx.Identifier().symbol, SemanticTokenTypes.Method);
        } else if (ctx.expression()) {
            return this.visitExpression(ctx.expression());
        } else {
            // probably a string literal, which has its own visitor
            return this.visitChildren(ctx);
        }
    };

    visitMethodInvocation = (ctx: MethodInvocationContext) => {
        return this.withScope(
            ctx,
            MethodInvocationSymbol,
            ["#method-invocation#"],
            (s) => {
                return this.visitChildren(ctx);
            }
        );
    };

    visitIdentifierExpression = (ctx: IdentifierExpressionContext) => {
        const priExp = ctx.parent as unknown as PrimaryExpressionContext;
        const isVar = priExp.methodInvocation().length === 0; // if its not a method invocation, then its a variable reference
        const parentSymbol = this.scope;
        const name = ctx.Identifier().getText();

        let symbolType: SymbolConstructor<BaseSymbol, unknown[]>;

        const nextSib = getSibling(ctx, 1);
        if (nextSib instanceof MethodInvocationContext) {
            // if the next symbol is a method invocation, then its a function
            symbolType = FunctionIdentifierSymbol;
            this.markContext(ctx, SemanticTokenTypes.Method, []);
        } else if (nextSib instanceof BracketExpressionContext) {
            // if the next symbol is a bracket expression, then its a variable
            symbolType = VariableIdentifierSymbol;
            this.markContext(ctx, SemanticTokenTypes.Variable, [
                SemanticTokenModifiers.Local,
            ]);
        } else if (priExp.ARROW()?.length > 0) {
            // if there's an arrow anywhere after that then its a variable
            symbolType = VariableIdentifierSymbol;
            this.markContext(ctx, SemanticTokenTypes.Variable, [
                SemanticTokenModifiers.Local,
            ]);
        } else if (priExp.methodInvocation().length > 0) {
            // method invocation means its a function
            symbolType = FunctionIdentifierSymbol;
            this.markContext(ctx, SemanticTokenTypes.Method, []);
        } else {
            // otherwise its a variable
            symbolType = VariableIdentifierSymbol;
            this.markContext(ctx, SemanticTokenTypes.Variable, [
                SemanticTokenModifiers.Local,
            ]);
        }

        const newSym = this.addNewSymbol(symbolType, ctx, `${name}`);
        (newSym as IRenameableSymbol).nameRange = lexRangeFromToken(
            ctx.Identifier().getSymbol()
        );
        return undefined;
    };

    /**
     * this handles clone_object and load_object
     * @param ctx
     * @returns
     */
    visitCloneObjectExpression = (ctx: CloneObjectExpressionContext) => {
        let name = "#clone-object#";
        if (ctx.LoadObject()) name = "#load-object#";

        return this.withScope(
            ctx,
            CloneObjectSymbol,
            [name, this.fileHandler],
            (s) => {
                return this.visitChildren(ctx);
            }
        );
    };

    visitStructVariableDeclaration = (
        ctx: StructVariableDeclarationContext
    ) => {
        const varDecls = ctx.variableDeclarator();
        const structNames = ctx.Identifier();
        varDecls.forEach((varDecl, idx) => {
            const structCtx = structNames[idx];
            const varNm = varDecl._variableName?.text;

            const structName = structCtx?.getText(); // NTBLA: store this in the type somewhere
            const varSym = this.addNewSymbol(
                VariableSymbol,
                structCtx,
                varNm,
                LpcTypes.structType,
                varDecl._variableName
            );

            const initCtx = varDecl.variableInitializer();
            if (!!initCtx) {
                return this.withScope(
                    initCtx,
                    VariableInitializerSymbol,
                    ["#initializer#" + varNm, varSym],
                    (s) => {
                        return this.visitChildren(initCtx);
                    }
                );
            }
        });

        return undefined;
    };

    visitPrimitiveTypeVariableDeclaration = (
        ctx: PrimitiveTypeVariableDeclarationContext
    ) => {
        // ctx will either be scalar or array, it doesn't matter right now

        //this.markContext(ctx.primitiveTypeSpecifier(), SemanticTokenTypes.Type);

        let tt = ctx.primitiveTypeSpecifier()?.getText();
        let i: number;
        let varType: IType;
        if (tt) {
            const isArray = tt.endsWith("*");
            if (isArray) {
                tt = tt.substring(0, tt.length - 1);
            }
            switch (tt) {
                case "int":
                    varType = FundamentalType.integerType;
                    break;
                case "string":
                    varType = FundamentalType.stringType;
                    break;
                case "float":
                    varType = FundamentalType.floatType;
                    break;
            }

            if (isArray) {
                varType = new ArrayType(
                    tt + "*",
                    ReferenceKind.Pointer,
                    varType
                );
            }
        }

        const varDecls = ctx.variableDeclarator();
        varDecls.forEach((varDecl) => {
            const nm = varDecl._variableName?.text;
            const varSym = this.addNewSymbol(
                VariableSymbol,
                varDecl.Identifier(),
                nm,
                varType,
                varDecl._variableName
            );
            this.markToken(varDecl._variableName, SemanticTokenTypes.Variable);

            const initCtx = varDecl.variableInitializer();
            if (!!initCtx) {
                return this.withScope(
                    initCtx,
                    VariableInitializerSymbol,
                    ["#initializer#" + nm, varSym],
                    (s) => {
                        return this.visitChildren(initCtx);
                    }
                );
            }
        });

        return undefined;
    };

    visitIncludeDirective = (ctx: IncludeDirectiveContext) => {
        let filename = ctx.directiveIncludeFile().getText();

        const symbol = this.addNewSymbol(IncludeSymbol, ctx, filename);
        symbol.isLoaded = this.fileHandler.doesImportFile(filename);

        return undefined;
    };

    visitInheritStatement = (ctx: InheritStatementContext) => {
        let filename = trimQuotes(ctx._inheritTarget!.text);

        const symbol = this.addNewSymbol(
            InheritSymbol,
            ctx,
            filename,
            filename
        );
        this.imports.push({ filename, symbol });

        return undefined;
    };

    visitInheritSuperExpression = (ctx: InheritSuperExpressionContext) => {
        const filename = ctx._filename?.text ?? "";
        return this.withScope(
            ctx,
            InheritSuperAccessorSymbol,
            ["#inherit-super#" + filename, filename, this.fileHandler],
            (s) => {
                return this.visitChildren(ctx);
            }
        );
    };

    visitInlineClosureExpression = (ctx: InlineClosureExpressionContext) => {
        let parent = ctx.parent;
        let name: string | undefined = undefined;
        while (!name && !!parent) {
            const parentIdCtx =
                parent as unknown as IdentifierExpressionContext;
            if (!!parentIdCtx) {
                name = parentIdCtx.getText && parentIdCtx.getText();
            }

            if (!name) {
                parent = parent.parent;
            }
        }

        return this.withScope(
            ctx,
            InlineClosureSymbol,
            ["(: :) Inline closure"],
            (s) => {
                s.foldingRange = FoldingRange.create(
                    ctx.start.line - 1,
                    ctx.stop.line - 2,
                    ctx.start.column,
                    ctx.stop.column
                );
                return this.visitChildren(ctx);
            }
        );
    };

    visitIfStatement = (ctx: IfStatementContext) => {
        const tokenIdx = ctx.start.tokenIndex;
        const name = "if_" + tokenIdx;

        const ifSymTbl = this.withScope(ctx, IfSymbol, [name], () => {
            const ifSym = this.scope as IfSymbol;

            let i = 0;
            const ifExpCtx = ctx.ifExpression();
            this.withScope(ifExpCtx, SelectionSymbol, ["if", "if"], (s) => {
                ifSym.if = s;
                s.foldingRange = FoldingRange.create(
                    ifExpCtx.start.line - 1,
                    ifExpCtx.stop.line - 2,
                    ifExpCtx.start.column,
                    ifExpCtx.stop.column
                );
                return this.visitChildren(ifExpCtx);
            });

            const ifElseCtx = ctx.elseIfExpression() ?? [];
            ifSym.elseIf = [];
            ifElseCtx.forEach((e) => {
                this.withScope(
                    e,
                    SelectionSymbol,
                    ["else if", "else if"],
                    (s) => {
                        ifSym.elseIf.push(s);
                        s.foldingRange = FoldingRange.create(
                            e.start.line - 1,
                            e.stop.line - 2,
                            e.start.column,
                            e.stop.column
                        );
                        return this.visitChildren(e);
                    }
                );
            });

            const elseCtx = ctx.elseExpression();
            if (!!elseCtx) {
                this.withScope(
                    elseCtx,
                    SelectionSymbol,
                    ["else", "else"],
                    (s) => {
                        ifSym.else = s;
                        s.foldingRange = FoldingRange.create(
                            elseCtx.start.line - 1,
                            elseCtx.stop.line - 2,
                            elseCtx.start.column,
                            elseCtx.stop.column
                        );
                        return this.visitChildren(elseCtx);
                    }
                );
            }

            return this.visitChildren(ctx);
        });

        return ifSymTbl;
    };

    visitFunctionHeaderDeclaration = (
        ctx: FunctionHeaderDeclarationContext
    ) => {
        const header = ctx.functionHeader();
        const nm = header._functionName.text;
        const retType = typeNameToIType.get(header.typeSpecifier()?.getText());
        const mods = new Set(
            header.functionModifier()?.map((m) => m.getText()) ?? []
        );

        this.markToken(header._functionName, SemanticTokenTypes.Method, [
            SemanticTokenModifiers.Definition,
        ]);
        //this.markContext(header.typeSpecifier(), SemanticTokenTypes.Type);

        return this.withScope(
            ctx,
            MethodDeclarationSymbol,
            [nm, retType, mods],
            (s) => {
                s.nameRange = lexRangeFromToken(header._functionName);
                s.doc = this.getPrefixComments(ctx);
                s.foldingRange = FoldingRange.create(
                    ctx.start.line - 1,
                    ctx.stop.line - 2,
                    ctx.start.column,
                    ctx.stop.column
                );
                return this.visitChildren(ctx);
            }
        );
    };

    visitFunctionDeclaration = (ctx: FunctionDeclarationContext) => {
        const header = ctx.functionHeader();
        const nm = header._functionName.text;
        const retType = typeNameToIType.get(header.typeSpecifier()?.getText());
        const mods = new Set(
            header.functionModifier()?.map((m) => m.getText()) ?? []
        );

        this.markToken(header._functionName, SemanticTokenTypes.Method, [
            SemanticTokenModifiers.Declaration,
        ]);
        //this.markContext(header.typeSpecifier(), SemanticTokenTypes.Type);

        return this.withScope(ctx, MethodSymbol, [nm, retType, mods], (s) => {
            s.nameRange = lexRangeFromToken(header._functionName);
            s.doc = this.getPrefixComments(ctx);
            s.foldingRange = FoldingRange.create(
                ctx.start.line - 1,
                ctx.stop.line - 2,
                ctx.start.column,
                ctx.stop.column
            );

            return this.visitChildren(ctx);
        });
    };

    visitReturnStatement = (ctx: ReturnStatementContext) => {
        return this.withScope(ctx, ReturnSymbol, ["#return#"], (s) => {
            return this.visitChildren(ctx);
        });
    };

    visitParameterList = (ctx: ParameterListContext) => {
        const prms = ctx.parameter();
        prms.forEach((p) => {
            let name: string, typeName: string, type: IType, nameToken: Token;
            if (p instanceof PrimitiveTypeParameterExpressionContext) {
                const pExp = p as PrimitiveTypeParameterExpressionContext;
                nameToken = pExp._paramName;
                name = pExp._paramName.text;
                typeName = pExp._paramType?.getText();
                type = typeNameToIType.get(typeName);

                this.markToken(pExp._paramName, SemanticTokenTypes.Parameter, [
                    SemanticTokenModifiers.Declaration,
                ]);
                //this.markContext(pExp._paramType, SemanticTokenTypes.Type);
            } else {
                const sExp = p as StructParameterExpressionContext;
                nameToken = sExp._paramName;
                name = sExp._paramName.text;
                typeName = "struct";
                type = LpcTypes.closureType;
            }
            this.addNewSymbol(MethodParameterSymbol, p, name, type, nameToken);
        });
        return undefined;
    };

    visitAssignmentExpression = (ctx: AssignmentExpressionContext) => {
        const lhsCtx = ctx.conditionalExpressionBase();
        const rhsCtx = ctx.expression();
        const op = ctx.assignmentOperator().getText();

        return this.withScope(
            ctx,
            AssignmentSymbol,
            ["#assignment#", op],
            (s) => {
                return this.visitChildren(ctx);
            }
        );
    };

    visitExpression = (ctx: ExpressionContext) => {
        //if (ctx.children?.length > 1) {
        return this.withScope(ctx, ExpressionSymbol, ["#expression#"], (s) => {
            return this.visitChildren(ctx);
        });
        // } else {
        //     return this.visitChildren(ctx);
        // }
    };

    visitConditionalExpression = (ctx: ConditionalExpressionContext) => {
        return this.withScope(
            ctx,
            ExpressionSymbol,
            ["#conditional-expression#"],
            (s) => {
                return this.visitChildren(ctx);
            }
        );
    };

    visitAdditiveExpression = (ctx: AdditiveExpressionContext) => {
        const operator = ctx._op.text;
        return this.withScope(ctx, OperatorSymbol, [operator], (s) => {
            return this.visitChildren(ctx);
        });
    };

    visitMultiplicativeExpression = (ctx: MultiplicativeExpressionContext) => {
        const operator = ctx._op.text;
        return this.withScope(ctx, OperatorSymbol, [operator], (s) => {
            return this.visitChildren(ctx);
        });
    };

    parseConditionalSymbol(ctx: ParserRuleContext, operator: string) {
        return this.withScope(ctx, ConditionalSymbol, [operator], (s) => {
            return this.visitChildren(ctx);
        });
    }

    visitEqualityExpression = (ctx: EqualityExpressionContext) =>
        this.parseConditionalSymbol(ctx, ctx._op.text);
    visitRelationalExpresion = (ctx: RelationalExpresionContext) =>
        this.parseConditionalSymbol(ctx, ctx._op.text);
    visitAndExpression = (ctx: AndExpressionContext) =>
        this.parseConditionalSymbol(ctx, ctx._op.text);
    visitExclusiveOrExpression = (ctx: ExclusiveOrExpressionContext) =>
        this.parseConditionalSymbol(ctx, ctx._op.text);
    visitInclusiveOrExpression = (ctx: InclusiveOrExpressionContext) =>
        this.parseConditionalSymbol(ctx, ctx._op.text);
    visitConditionalAndExpression = (ctx: ConditionalAndExpressionContext) =>
        this.parseConditionalSymbol(ctx, ctx._op.text);
    visitConditionalOrExpression = (ctx: ConditionalOrExpressionContext) =>
        this.parseConditionalSymbol(ctx, ctx._op.text);

    // TODO: ternary expression

    // prettier-ignore
    visitLiteral = (ctx: LiteralContext) => {
        if (!!ctx.IntegerConstant()) {
            this.addNewSymbol(LiteralSymbol, ctx, "int", FundamentalType.integerType, +ctx.IntegerConstant().getText());
            this.markToken(ctx.StringLiteral()?.symbol, SemanticTokenTypes.Number);
        } else if (!!ctx.FloatingConstant()) {
            this.addNewSymbol(LiteralSymbol, ctx, "float", FundamentalType.floatType, +ctx.FloatingConstant().getText());
            this.markToken(ctx.StringLiteral()?.symbol, SemanticTokenTypes.Number);
        } else if (!!ctx.StringLiteral()) {
            this.addNewSymbol(LiteralSymbol, ctx, "string", FundamentalType.stringType, trimQuotes(ctx.StringLiteral().getText()));
            this.markToken(ctx.StringLiteral()?.symbol, SemanticTokenTypes.String);
        }
        
        return undefined;
    };

    visitLambdaExpression = (ctx: LambdaExpressionContext) => {
        this.markContext(ctx, SemanticTokenTypes.Parameter);
        return undefined;
    };

    //  visitTerminal = (node: TerminalNode) => {
    //      switch (node.symbol.type) {
    // //         case LPCLexer.PLUS:
    // //         case LPCLexer.MINUS:
    // //         case LPCLexer.STAR:
    // //         case LPCLexer.DIV:
    // //         case LPCLexer.MOD:
    // //         case LPCLexer.SHL:
    // //         case LPCLexer.SHR:
    // //         case LPCLexer.AND:
    // //         case LPCLexer.OR:
    // //         case LPCLexer.XOR:
    // //         case LPCLexer.NOT:
    // //         case LPCLexer.INC:
    // //         case LPCLexer.DEC:
    // //             this.addNewSymbol(OperatorSymbol, node, node.getText());
    // //             break;
    //         case LPCLexer.Identifier:
    //             this.addNewSymbol(IdentifierSymbol, node, node.getText());
    //             break;
    //         default:
    //             // Ignore the rest.
    //             break;

    //      }

    //     return undefined;
    // };

    protected withScope<T, S extends ScopedSymbol>(
        tree: ParseTree,
        type: new (...args: GenericConstructorParameters<T>) => S,
        args: GenericConstructorParameters<T>,
        action: (symbol: S) => T
    ): T {
        const scope = this.symbolTable.addNewSymbolOfType(
            type,
            this.scope,
            ...args
        );
        scope.context = tree;
        this.scope = scope;
        try {
            return action(scope);
        } finally {
            this.scope = scope.parent as ScopedSymbol;
        }
    }

    /**
     * Adds a new symbol to the current symbol TOS.
     *
     * @param type The type of the symbol to add.
     * @param context The symbol's parse tree, to allow locating it.
     * @param args The actual arguments for the new symbol.
     *
     * @returns The new symbol.
     */
    private addNewSymbol<T extends BaseSymbol>(
        type: new (...args: any[]) => T,
        context: ParseTree,
        ...args: any[]
    ): T {
        const symbol = this.symbolTable.addNewSymbolOfType(
            type,
            this.scope,
            ...args
        );
        symbol.context = context;

        return symbol;
    }

    /**
     * get code comments to the left a context
     * @param ctx
     * @returns
     */
    private getPrefixComments(ctx: ParserRuleContext) {
        const source = this.symbolTable.owner!;
        const tokenIdx = ctx.start.tokenIndex;
        const comments = source?.tokenStream?.getHiddenTokensToLeft(
            tokenIdx,
            COMMENT_CHANNEL_NUM
        );
        if (comments?.length > 0) {
            const commentText = lastEntry(comments)?.text ?? "";
            return firstEntry(commentParser.parse(commentText));
        }

        return undefined;
    }
}

function findSpaceOrTabNotInParentheses(s: string): number {
    if (!findSpaceOrTabNotInParentheses) return -1;
    let inParentheses = false;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === "(") {
            inParentheses = true;
        } else if (s[i] === ")") {
            inParentheses = false;
        } else if (!inParentheses && (s[i] === " " || s[i] === "\t")) {
            return i;
        }
    }
    return -1;
}

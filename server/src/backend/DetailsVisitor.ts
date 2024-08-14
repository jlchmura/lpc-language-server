import * as commentParser from "comment-parser";
import {
    AbstractParseTreeVisitor,
    ParseTree,
    ParserRuleContext,
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
    SymbolConstructor,
} from "antlr4-c3";
import { ContextSymbolTable } from "./ContextSymbolTable";
import {
    ArrayExpressionContext,
    BracketExpressionContext,
    CallOtherTargetContext,
    ConditionalExpressionContext,
    DefinePreprocessorDirectiveContext,
    DoWhileStatementContext,
    ExpressionContext,
    ForEachStatementContext,
    //ForEachVariableContext,
    ForStatementContext,
    //ForVariableContext,
    FunctionDeclarationContext,
    FunctionHeaderDeclarationContext,
    IdentifierExpressionContext,
    IfStatementContext,
    IncludePreprocessorDirectiveContext,
    InheritStatementContext,
    InlineClosureExpressionContext,
    LambdaExpressionContext,
    LiteralContext,
    MethodInvocationContext,
    ParameterListContext,
    PrimaryExpressionContext,
    PrimitiveTypeSpecifierContext,
    ReturnStatementContext,
    SelectionPreprocessorDirectiveContext,
    StringConcatExpressionContext,
    StructDeclarationContext,
    StructMemberDeclarationContext,
    UnionableTypeSpecifierContext,
    ValidIdentifiersContext,
    VariableDeclarationListContext,
    VariableDeclaratorContext,
    WhileStatementContext,
} from "../parser3/LPCParser";
import { PreprocessorSymbol } from "../symbols/Symbol";
import { FoldingRange } from "vscode-languageserver";
import {
    ContextImportInfo,
    LpcTypes,
    SemanticTokenModifiers,
    SemanticTokenTypes,
    StructType,
    typeNameToIType,
} from "../types";
import { LPCLexer } from "../parser3/LPCLexer";
import {
    VariableIdentifierSymbol,
    VariableInitializerSymbol,
    VariableSymbol,
    MethodParameterSymbol,
} from "../symbols/variableSymbol";
import { DefineSymbol } from "../symbols/defineSymbol";
import { AssignmentSymbol } from "../symbols/assignmentSymbol";
import {
    FunctionIdentifierSymbol,
    MethodDeclarationSymbol,
    MethodSymbol,
    ReturnSymbol,
} from "../symbols/methodSymbol";
import {
    BracketExpressionSymbol,
    ExpressionSymbol,
} from "../symbols/expressionSymbol";
import {
    firstEntry,
    getSibling,
    lastEntry,
    lexRangeFromContext,
    lexRangeFromToken,
    parseMacroNameFromDefineString,
    trimQuotes,
} from "../utils";
import { LiteralSymbol } from "../symbols/literalSymbol";
import { OperatorSymbol } from "../symbols/operatorSymbol";
import { ConditionalSymbol } from "../symbols/conditionalSymbol";
import { IncludeSymbol } from "../symbols/includeSymbol";
import { IfSymbol, SelectionSymbol } from "../symbols/selectionSymbol";
import { IEvaluatableSymbol, IRenameableSymbol } from "../symbols/base";
import { ArrowSymbol, ArrowType } from "../symbols/arrowSymbol";
import { SemanticTokenCollection } from "./SemanticTokenCollection";
import {
    InheritSuperAccessorSymbol,
    InheritSymbol,
} from "../symbols/inheritSymbol";
import { LpcFileHandler } from "./FileHandler";
import { ForEachSymbol, IterationSymbol } from "../symbols/forSymbol";
import { COMMENT_CHANNEL } from "../parser3/LPCPreprocessingLexer";
import { LPCToken } from "../parser3/LPCToken";
import {
    StructDeclarationSymbol,
    StructMemberIdentifierSymbol,
} from "../symbols/structSymbol";
import { ArraySymbol } from "../symbols/arraySymbol";
import { InlineClosureSymbol } from "../symbols/closureSymbol";
import { MethodInvocationSymbol } from "../symbols/methodInvocationSymbol";

type GenericConstructorParameters<T> = ConstructorParameters<
    new (...args: any[]) => T
>;

export class DetailsVisitor
    extends AbstractParseTreeVisitor<ScopedSymbol>
    implements LPCParserVisitor<ScopedSymbol>
{
    protected scope = this.symbolTable as ScopedSymbol;

    constructor(
        private symbolTable: ContextSymbolTable,
        private imports: ContextImportInfo[],
        private tokenBuilder: SemanticTokenCollection,
        private fileHandler: LpcFileHandler,
        private filename: string,
        private configDefines: Map<string, string>
    ) {
        super();
        this.visitConfigDefines();
    }

    visitConfigDefines() {
        for (const [key, value] of this.configDefines.entries()) {
            const sym = this.symbolTable.addNewSymbolOfType(
                DefineSymbol,
                this.scope,
                key,
                value
            );
            sym.context = undefined;
        }
    }

    visitDefinePreprocessorDirective = (
        ctx: DefinePreprocessorDirectiveContext
    ) => {
        // NTBLA: remove this

        const defineStr = ctx.END_DEFINE()?.getText()?.trim();

        const nameResult = parseMacroNameFromDefineString(defineStr);
        const label = nameResult?.name ?? defineStr;
        const value = ""; // ntbla: this can be removed

        // just add a symbol so we can resolve it
        const sym = this.symbolTable.addNewSymbolOfType(
            DefineSymbol,
            this.scope,
            label,
            value
        );
        sym.context = ctx;

        return this.visitChildren(ctx);
    };

    visitBracketExpression = (ctx: BracketExpressionContext) => {
        return this.withScope(
            ctx,
            BracketExpressionSymbol,
            ["#bracket-expression#"],
            (s) => {
                return this.visitChildren(ctx);
            }
        );
    };

    visitSelectionPreprocessorDirective = (
        ctx: SelectionPreprocessorDirectiveContext
    ) => {
        const tokenIdx = ctx.start.tokenIndex;
        const label =
            ctx.selectionPreprocessorDirectiveTypeSingle()?.getText() ||
            ctx.selectionPreprocessorDirectiveTypeWithArg()?.getText();
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
        if (ctx.ARROW().length > 0 || ctx.DOT().length > 0) {
            const arrowChars = ctx.ARROW().length > 0 ? "->" : ".";

            // if there is an arrow and invocation, then this is a call_other expression
            return this.withScope(
                ctx,
                ArrowSymbol,
                [arrowChars, this.fileHandler],
                (symbol) => {
                    // first find the arrow because there can be multiple expressions before it
                    const arrowIdx = ctx.children.findIndex(
                        (c) => c.getText() == arrowChars
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
                                if (s.children.length == 1) {
                                    const ii = 0;
                                }
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
                    const structMemberCtx = ctx._structMember;

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
                        symbol.ArrowType = ArrowType.CallOther; // definitely a call other
                    }
                    if (!!structMemberCtx) {
                        target = this.addNewSymbol(
                            StructMemberIdentifierSymbol,
                            ctx,
                            structMemberCtx.text
                        );

                        symbol.ArrowType = ArrowType.StructMember; // definitely a struct

                        this.markToken(
                            structMemberCtx,
                            SemanticTokenTypes.Property
                        );
                    }

                    // at this point we have to figure out which type of symbol we're dealing with \
                    // and fill in its properties
                    symbol.source = sourceObject;
                    symbol.target = target;
                    symbol.methodInvocation = methodInvoc;
                    symbol.functionName = !!methodInvoc
                        ? target?.name
                        : undefined;

                    return symbol;
                }
            );
        } else if (ctx._super_) {
            const superCtx = ctx._super_;
            const filename =
                superCtx._filename?.text ??
                superCtx._validIdFilename?.getText() ??
                "";
            return this.withScope(
                ctx,
                InheritSuperAccessorSymbol,
                ["#inherit-super#" + filename, filename, this.fileHandler],
                (s) => {
                    return this.visitChildren(ctx);
                }
            );
            // } else if (
            //     ctx.methodInvocation()?.length > 0 &&
            //     ctx._pe instanceof IdentifierExpressionContext &&
            //     (ctx._pe.getText() == "clone_object" ||
            //         ctx._pe.getText() == "load_object")
            // ) {
            //     const fnIdCtx = ctx._pe.validIdentifiers();
            //     const fnName = fnIdCtx?.getText();
            //     return this.withScope(
            //         ctx,
            //         CloneObjectSymbol,
            //         [fnName, this.fileHandler],
            //         (s) => {
            //             this.markContext(fnIdCtx, SemanticTokenTypes.Method, [
            //                 SemanticTokenModifiers.DefaultLibrary,
            //             ]);
            //             return this.visitChildren(ctx?.methodInvocation()?.at(0));
            //         }
            //     );
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
        tokenModifiers: number[] = [],
        len?: number
    ) {
        if (!token || (token as LPCToken).filename != this.filename) return;
        len ??= token.stop - token.start + 1;
        this.tokenBuilder.add(
            token.line,
            token.column,
            len,
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

        if ((start as LPCToken).filename != this.filename) return;

        const len = stop.stop - start.start + 1;
        this.tokenBuilder.add(
            start.line,
            start.column,
            len,
            tokenType,
            tokenModifiers
        );
    }

    visitCallOtherTarget = (ctx: CallOtherTargetContext) => {
        // the call other target can be an identifier, a string literal, or an expression

        if (ctx.validIdentifiers()) {
            const fid = this.addNewSymbol(
                FunctionIdentifierSymbol,
                ctx,
                ctx.validIdentifiers().getText()
            );
            fid.nameRange = lexRangeFromContext(ctx.validIdentifiers());
            this.markContext(ctx.validIdentifiers(), SemanticTokenTypes.Method);
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
        const name = ctx.validIdentifiers().getText();

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
            this.getValidIdentifier(ctx.validIdentifiers()).symbol
        );
        return undefined;
    };

    visitStructDeclaration = (ctx: StructDeclarationContext) => {
        const name = ctx._structName.text;
        const inheritsFromName = ctx._structInherits?.text;

        return this.withScope(
            ctx,
            StructDeclarationSymbol,
            [name, inheritsFromName],
            (s) => {
                return this.visitChildren(ctx);
            }
        );
    };

    parseTypeSpecifier(ctx: UnionableTypeSpecifierContext) {
        const u = ctx;
        if (u?.structTypeSpecifier()) {
            const spec = u.structTypeSpecifier();
            return new StructType(spec.Identifier().getText());
        } else {
            return this.parsePrimitiveType(
                u?.primitiveTypeSpecifier(),
                u?.STAR()?.at(0)
            );
        }
    }

    parsePrimitiveType(
        ctx: PrimitiveTypeSpecifierContext,
        star?: TerminalNode
    ) {
        let tt = ctx?.getText();
        let varType: IType;
        if (tt) {
            let isArray = tt.endsWith("*");
            if (isArray) tt = tt.substring(0, tt.length - 1);
            else isArray = !!star;

            switch (tt) {
                case "bytes":
                    varType = LpcTypes.bytesType;
                    break;
                case "int":
                    varType = LpcTypes.intType;
                    break;
                case "string":
                    varType = LpcTypes.stringType;
                    break;
                case "object":
                    varType = LpcTypes.objectType;
                    break;
                case "mixed":
                    varType = LpcTypes.mixedType;
                    break;
                case "float":
                    varType = FundamentalType.floatType;
                    break;
                case "function":
                    varType = LpcTypes.functionType;
                    break;
                case "unknown":
                    varType = LpcTypes.unknownType;
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

        this.markContext(ctx, SemanticTokenTypes.Type);

        return varType;
    }

    parseVariableDeclaration(
        varDecl: VariableDeclaratorContext,
        varType: IType
    ): VariableSymbol {
        if (!varDecl) return undefined;

        const varNameSym = varDecl._variableName;
        const nm = varNameSym?.getText();
        const varSym = this.addNewSymbol(
            VariableSymbol,
            varDecl.validIdentifiers(),
            nm,
            varType,
            varNameSym
        );

        if (varNameSym) {
            const id = this.getValidIdentifier(varNameSym);
            if (id) {
                this.markToken(id.symbol, SemanticTokenTypes.Variable);
            }
        }

        return varSym;
    }

    visitStructMemberDeclaration = (ctx: StructMemberDeclarationContext) => {
        const typeCtx = ctx.unionableTypeSpecifier();
        const varType =
            this.parseTypeSpecifier(typeCtx) ?? LpcTypes.unknownType;

        const ids = ctx.Identifier();
        for (const id of ids) {
            const varName = id.getText();
            this.addNewSymbol(VariableSymbol, ctx, varName, varType, id);
        }

        return undefined;
    };

    visitVariableDeclarationList = (ctx: VariableDeclarationListContext) => {
        // ctx will either be scalar or array, it doesn't matter right now

        const typeCtx = ctx.unionableTypeSpecifier();
        const varType =
            this.parseTypeSpecifier(typeCtx) ?? LpcTypes.unknownType;

        const varDecls = ctx.variableDeclaratorExpression();

        // unfortunately, LPC doesn't require type names, so this might be a
        // variable declaration, or it might not. We need to do some additional checks to figure that out
        let isDecl = false;
        if (varDecls.length > 1) {
            // if there are multiple declarations then its definitely a declaration
            isDecl = true;
        } else if (
            typeCtx?.structTypeSpecifier() ||
            typeCtx?.primitiveTypeSpecifier()
        ) {
            // if there is a type specifier its a declaration
            isDecl = true;
        } else if (ctx.variableModifier()?.length > 0) {
            // if there are variable modifiers then its a declaration
            isDecl = true;
        }

        varDecls.forEach((varDeclExp) => {
            const name = varDeclExp
                .variableDeclarator()
                ._variableName?.getText();

            // if its not yet determined to be a declaration, then try to resolve the symbol.
            // If it can't be resolved, then its a new declaration
            if (!isDecl && !this.symbolTable.resolveSync(name, false)) {
                isDecl = true;
            }

            if (!isDecl) {
                // not a new declaration, parse as an identifier
                if (varDeclExp.variableInitializer()) {
                    this.withScope(
                        varDeclExp,
                        AssignmentSymbol,
                        ["#assignment#" + name, "="],
                        (s) => {
                            // not a new declaration, parse as an identifier
                            this.addNewSymbol(
                                VariableIdentifierSymbol,
                                varDeclExp.variableDeclarator(),
                                name
                            );
                            this.visit(varDeclExp.variableInitializer());
                            return s;
                        }
                    );
                } else {
                    this.addNewSymbol(
                        VariableIdentifierSymbol,
                        varDeclExp.variableDeclarator(),
                        name
                    );
                }
                return;
            }

            const varSym = this.parseVariableDeclaration(
                varDeclExp.variableDeclarator(),
                varType
            );

            const initCtx = varDeclExp.variableInitializer();
            if (!!initCtx) {
                return this.withScope(
                    initCtx,
                    VariableInitializerSymbol,
                    ["#initializer#" + varSym.name, varSym],
                    (s) => {
                        return this.visitChildren(initCtx);
                    }
                );
            }
        });

        return undefined;
    };

    visitIncludePreprocessorDirective = (
        ctx: IncludePreprocessorDirectiveContext
    ) => {
        const fileCtx = ctx.directiveIncludeFile();

        let filename = fileCtx.getText();
        if (!filename) {
            const stringLits = fileCtx.StringLiteral();
            filename = stringLits.map((s) => trimQuotes(s.getText())).join("");
        }

        const symbol = this.addNewSymbol(IncludeSymbol, ctx, filename);
        symbol.isLoaded = this.fileHandler.doesIncludeFile(filename);

        return undefined;
    };

    visitInheritStatement = (ctx: InheritStatementContext) => {
        const stringLits: TerminalNode[] = [];
        let inhCtxs: ParseTree[] = [ctx?.inherit()?.inheritFile()];
        while (inhCtxs.length > 0) {
            const inh = inhCtxs.shift();
            if (!inh) continue;

            if (
                inh instanceof TerminalNode &&
                inh.symbol.type === LPCLexer.StringLiteral
            ) {
                stringLits.push(inh);
            } else if (inh instanceof ParserRuleContext) {
                inhCtxs.push(...inh.children);
            }
        }
        stringLits.sort((a, b) => a.symbol.tokenIndex - b.symbol.tokenIndex);
        const filename = stringLits
            .map((s) => trimQuotes(s.getText()))
            .join("");

        const symbol = this.addNewSymbol(
            InheritSymbol,
            ctx,
            filename,
            filename
        );

        this.fileHandler.loadReference(filename, symbol);
        this.imports.push({ filename, symbol });

        return undefined;
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
        const nm = header._functionName?.getText();
        const retType = typeNameToIType.get(header.typeSpecifier()?.getText());
        const mods = new Set(
            header.functionModifier()?.map((m) => m.getText()) ?? []
        );

        this.markContext(header._functionName, SemanticTokenTypes.Method, [
            SemanticTokenModifiers.Definition,
        ]);

        return this.withScope(
            ctx,
            MethodDeclarationSymbol,
            [nm, retType, mods],
            (s) => {
                s.nameRange = lexRangeFromContext(header._functionName);
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
        const nm = header._functionName.getText();
        const retType = typeNameToIType.get(header.typeSpecifier()?.getText());
        const mods = new Set(
            header.functionModifier()?.map((m) => m.getText()) ?? []
        );

        this.markContext(header._functionName, SemanticTokenTypes.Method, [
            SemanticTokenModifiers.Declaration,
        ]);
        //this.markContext(header.typeSpecifier(), SemanticTokenTypes.Type);

        return this.withScope(ctx, MethodSymbol, [nm, retType, mods], (s) => {
            s.nameRange = lexRangeFromContext(header._functionName);
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

    getValidIdentifier(ctx: ValidIdentifiersContext) {
        return ctx?.children.find(
            (c) => c instanceof TerminalNode
        ) as TerminalNode;
    }

    visitParameterList = (ctx: ParameterListContext) => {
        const prms = ctx.parameter();
        prms.forEach((p) => {
            const typeCtx = p.unionableTypeSpecifier();
            const typeName = typeCtx?.getText();
            const type =
                this.parseTypeSpecifier(typeCtx) ?? LpcTypes.unknownType;
            let varArgs = !!p.VARARGS() || !!p.TRIPPLEDOT();

            const id = this.getValidIdentifier(p._paramName);
            const nameToken = id?.symbol;
            const name = p._paramName?.getText();

            if (!!id) {
                this.markToken(id.symbol, SemanticTokenTypes.Parameter, [
                    SemanticTokenModifiers.Declaration,
                ]);
            }

            this.addNewSymbol(
                MethodParameterSymbol,
                p,
                name,
                type,
                nameToken,
                varArgs
            );
        });
        return undefined;
    };

    visitConditionalExpression = (ctx: ConditionalExpressionContext) => {
        if (ctx._p > 0) {
            const ii = 0;
        }
        if (ctx._assignOp) {
            return this.withScope(
                ctx,
                AssignmentSymbol,
                ["#conditional-expression#", ctx._assignOp.getText()],
                (s) => {
                    return this.visitChildren(ctx);
                }
            );
        } else if (ctx._cond) {
            const operator = ctx._cond?.text;
            return this.withScope(ctx, ConditionalSymbol, [operator], (s) => {
                return this.visitChildren(ctx);
            });
        } else if (ctx._ternOp) {
            // TODO: ternary expression
            return this.withScope(
                ctx,
                ConditionalSymbol,
                [ctx._ternOp.text],
                (s) => {
                    return this.visitChildren(ctx);
                }
            );
        } else if (ctx._op) {
            let lastOpSym: OperatorSymbol;
            let origScope = this.scope;

            if (ctx.children.length == 2) {
                // unary operator
                const operator = ctx.children[0].getText();
                let opSym = (this.scope = this.addNewSymbol(
                    OperatorSymbol,
                    ctx,
                    operator
                ));

                this.visit(ctx.children[1] as ParserRuleContext);
                opSym.lhs = lastEntry(opSym.children) as IEvaluatableSymbol;

                this.markToken(
                    (ctx.children[0] as TerminalNode).symbol,
                    SemanticTokenTypes.Operator
                );
            } else {
                for (let i = ctx.children.length - 2; i > 0; i -= 2) {
                    const child = ctx.children[i - 1];
                    const operator = ctx.children[i].getText();
                    let opSym = (this.scope = this.addNewSymbol(
                        OperatorSymbol,
                        ctx,
                        operator
                    ));

                    this.visit(ctx.children[i - 1] as ParserRuleContext);
                    opSym.lhs = firstEntry(
                        opSym.children
                    ) as IEvaluatableSymbol;

                    this.visit(ctx.children[i + 1] as ParserRuleContext);
                    opSym.rhs = lastEntry(opSym.children) as IEvaluatableSymbol;

                    if (lastOpSym) {
                        lastOpSym.lhs = opSym;
                    }

                    this.markToken(
                        (child as TerminalNode).symbol,
                        SemanticTokenTypes.Operator
                    );

                    lastOpSym = opSym;
                }
            }

            this.scope = origScope;
            //this.scope.children.push(lastOpSym);
            return lastOpSym;
        }

        // none of the above, pass through to unary, etc.
        this.visitChildren(ctx);
    };

    visitExpression = (ctx: ExpressionContext) => {
        //if (ctx.children?.length > 1) {
        return this.withScope(ctx, ExpressionSymbol, ["#expression#"], (s) => {
            return this.visitChildren(ctx);
        });
    };

    parseIterationStatement(
        ctx: ParserRuleContext,
        symbolType: typeof IterationSymbol
    ) {
        const tokenIdx = ctx.start.tokenIndex;
        const name = "#iteration_" + tokenIdx;

        return this.withScope(ctx, symbolType, [name, "for"], (s) => {
            // s.foldingRange = FoldingRange.create(
            //     ctx.start.line - 1,
            //     ctx.stop.line - 2,
            //     ctx.start.column,
            //     ctx.stop.column
            // );
            return this.visitChildren(ctx);
        });
    }

    visitForEachStatement = (ctx: ForEachStatementContext) =>
        this.parseIterationStatement(ctx, ForEachSymbol);
    visitDoWhileStatement = (ctx: DoWhileStatementContext) =>
        this.parseIterationStatement(ctx, IterationSymbol);
    visitWhileStatement = (ctx: WhileStatementContext) =>
        this.parseIterationStatement(ctx, IterationSymbol);
    visitForStatement = (ctx: ForStatementContext) =>
        this.parseIterationStatement(ctx, IterationSymbol);

    // visitForVariable = (ctx: ForVariableContext) => {
    //     if (ctx.variableDeclarator()) {
    //         const varType = this.parsePrimitiveType(
    //             ctx.primitiveTypeSpecifier()
    //         );
    //         const varSym = this.parseVariableDeclaration(
    //             ctx.variableDeclarator(),
    //             varType
    //         );
    //         return undefined;
    //     }

    //     //const varType = this.parsePrimitiveType(ctx.primitiveTypeSpecifier());
    //     return this.visitChildren(ctx);
    // };

    // visitForEachVariable = (ctx: ForEachVariableContext) => {
    //     const varType = this.parseTypeSpecifier(
    //         ctx.typeSpecifier()?.unionableTypeSpecifier()
    //     );
    //     const varSym = this.parseVariableDeclaration(
    //         ctx.variableDeclarator(),
    //         varType
    //     );
    //     return undefined;
    // };

    // prettier-ignore
    visitLiteral = (ctx: LiteralContext) => {        
        if (!!ctx.IntegerConstant()) {
            this.addNewSymbol(LiteralSymbol, ctx, "int", FundamentalType.integerType, +ctx.IntegerConstant().getText().replace("_",""));
            this.markToken(ctx.IntegerConstant()?.symbol, SemanticTokenTypes.Number);
        } else if (!!ctx.FloatingConstant()) {
            this.addNewSymbol(LiteralSymbol, ctx, "float", FundamentalType.floatType, +ctx.FloatingConstant().getText());
            this.markToken(ctx.FloatingConstant()?.symbol, SemanticTokenTypes.Number);
        }       
        
        return undefined;
    };

    visitStringConcatExpression = (ctx: StringConcatExpressionContext) => {
        const stringLits = ctx.StringLiteral();
        const concatStr = stringLits
            .map((s) => trimQuotes(s.getText()))
            .join("");
        this.addNewSymbol(
            LiteralSymbol,
            ctx,
            "string",
            FundamentalType.stringType,
            concatStr
        );

        // don't send if string contains only a unicode character (like emoji)
        // it was breaking vscode when the semantic highlight applies
        const strLen = concatStr.length;
        this.markToken(ctx.start, SemanticTokenTypes.String, [], strLen + 2);

        // if (concatStr.match(/\/|\.c/)) {
        //     console.debug("possible filename: " + concatStr);
        // }

        return undefined;
    };

    visitLambdaExpression = (ctx: LambdaExpressionContext) => {
        if (ctx.LAMBDA_IDENTIFIER()) {
            // this is a special case
            const token = ctx.LAMBDA_IDENTIFIER().symbol;
            this.markToken(token, SemanticTokenTypes.LambdaPrefix, [], 1);
        } else {
            let prefixStart = (ctx.HASH() ?? ctx.SINGLEQUOT())?.symbol;
            const prefixEnd = ctx.SINGLEQUOT()?.symbol ?? prefixStart;
            const expEnd = ctx.stop;

            this.markToken(
                prefixStart,
                SemanticTokenTypes.LambdaPrefix,
                [],
                prefixEnd.column - prefixStart.column + 1
            );
        }
        return undefined;
    };

    visitArrayExpression = (ctx: ArrayExpressionContext) => {
        return this.withScope(ctx, ArraySymbol, ["#array-expression#"], (s) => {
            return this.visitChildren(ctx);
        });
    };

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
            COMMENT_CHANNEL
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

function containsUnicodeOrHigher(str: string): boolean {
    // This regex matches characters outside the BMP (Basic Multilingual Plane).
    // These characters are represented by surrogate pairs in JavaScript strings.
    const unicodeOrHigherRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
    return unicodeOrHigherRegex.test(str);
}

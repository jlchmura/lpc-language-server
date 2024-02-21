// Generated from grammar/LPC.g4 by ANTLR 4.13.1

import { AbstractParseTreeVisitor } from "antlr4ng";


import { ProgramContext } from "./LPCParser.js";
import { PreprocessorDirectiveContext } from "./LPCParser.js";
import { DirectiveTypeContext } from "./LPCParser.js";
import { DirectiveTypeWithArgumentsContext } from "./LPCParser.js";
import { DirectiveArgumentContext } from "./LPCParser.js";
import { DirectiveTypeDefineContext } from "./LPCParser.js";
import { DirectiveDefineParamContext } from "./LPCParser.js";
import { DirectiveDefineArgumentContext } from "./LPCParser.js";
import { DirectiveTypeIncludeContext } from "./LPCParser.js";
import { DirectiveIncludeFileContext } from "./LPCParser.js";
import { DirectiveIncludeFilenameContext } from "./LPCParser.js";
import { DirectiveIncludeFileGlobalContext } from "./LPCParser.js";
import { DirectiveIncludeFileLocalContext } from "./LPCParser.js";
import { DirectiveTypePragmaContext } from "./LPCParser.js";
import { InheritStatementContext } from "./LPCParser.js";
import { InheritSuperStatementContext } from "./LPCParser.js";
import { DeclarationContext } from "./LPCParser.js";
import { FunctionDeclarationContext } from "./LPCParser.js";
import { ParameterListContext } from "./LPCParser.js";
import { ParameterContext } from "./LPCParser.js";
import { ScalarDeclarationContext } from "./LPCParser.js";
import { ArrayContentContext } from "./LPCParser.js";
import { ArrayDeclarationContext } from "./LPCParser.js";
import { MappingKeyContext } from "./LPCParser.js";
import { MappingContentContext } from "./LPCParser.js";
import { MappingExpressionContext } from "./LPCParser.js";
import { VariableDeclarationContext } from "./LPCParser.js";
import { TypeSpecifierContext } from "./LPCParser.js";
import { StatementContext } from "./LPCParser.js";
import { ExpressionStatementContext } from "./LPCParser.js";
import { CompoundStatementContext } from "./LPCParser.js";
import { SelectionStatementContext } from "./LPCParser.js";
import { IfStatementContext } from "./LPCParser.js";
import { SwitchStatementContext } from "./LPCParser.js";
import { CaseExpressionContext } from "./LPCParser.js";
import { CaseStatementContext } from "./LPCParser.js";
import { DefaultStatementContext } from "./LPCParser.js";
import { IterationStatementContext } from "./LPCParser.js";
import { JumpStatementContext } from "./LPCParser.js";
import { CallOtherTargetContext } from "./LPCParser.js";
import { CallOtherExpressionContext } from "./LPCParser.js";
import { ExpressionContext } from "./LPCParser.js";
import { ExpressionListContext } from "./LPCParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `LPCParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class LPCVisitor<Result> extends AbstractParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by `LPCParser.program`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProgram?: (ctx: ProgramContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.preprocessorDirective`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPreprocessorDirective?: (ctx: PreprocessorDirectiveContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.directiveType`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDirectiveType?: (ctx: DirectiveTypeContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.directiveTypeWithArguments`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDirectiveTypeWithArguments?: (ctx: DirectiveTypeWithArgumentsContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.directiveArgument`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDirectiveArgument?: (ctx: DirectiveArgumentContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.directiveTypeDefine`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDirectiveTypeDefine?: (ctx: DirectiveTypeDefineContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.directiveDefineParam`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDirectiveDefineParam?: (ctx: DirectiveDefineParamContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.directiveDefineArgument`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDirectiveDefineArgument?: (ctx: DirectiveDefineArgumentContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.directiveTypeInclude`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDirectiveTypeInclude?: (ctx: DirectiveTypeIncludeContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.directiveIncludeFile`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDirectiveIncludeFile?: (ctx: DirectiveIncludeFileContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.directiveIncludeFilename`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDirectiveIncludeFilename?: (ctx: DirectiveIncludeFilenameContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.directiveIncludeFileGlobal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDirectiveIncludeFileGlobal?: (ctx: DirectiveIncludeFileGlobalContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.directiveIncludeFileLocal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDirectiveIncludeFileLocal?: (ctx: DirectiveIncludeFileLocalContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.directiveTypePragma`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDirectiveTypePragma?: (ctx: DirectiveTypePragmaContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.inheritStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInheritStatement?: (ctx: InheritStatementContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.inheritSuperStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInheritSuperStatement?: (ctx: InheritSuperStatementContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.declaration`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDeclaration?: (ctx: DeclarationContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.functionDeclaration`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunctionDeclaration?: (ctx: FunctionDeclarationContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.parameterList`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParameterList?: (ctx: ParameterListContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.parameter`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParameter?: (ctx: ParameterContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.scalarDeclaration`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitScalarDeclaration?: (ctx: ScalarDeclarationContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.arrayContent`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArrayContent?: (ctx: ArrayContentContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.arrayDeclaration`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArrayDeclaration?: (ctx: ArrayDeclarationContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.mappingKey`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMappingKey?: (ctx: MappingKeyContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.mappingContent`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMappingContent?: (ctx: MappingContentContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.mappingExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMappingExpression?: (ctx: MappingExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.variableDeclaration`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVariableDeclaration?: (ctx: VariableDeclarationContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.typeSpecifier`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTypeSpecifier?: (ctx: TypeSpecifierContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.statement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStatement?: (ctx: StatementContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.expressionStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpressionStatement?: (ctx: ExpressionStatementContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.compoundStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCompoundStatement?: (ctx: CompoundStatementContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.selectionStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSelectionStatement?: (ctx: SelectionStatementContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.ifStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIfStatement?: (ctx: IfStatementContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.switchStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSwitchStatement?: (ctx: SwitchStatementContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.caseExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCaseExpression?: (ctx: CaseExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.caseStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCaseStatement?: (ctx: CaseStatementContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.defaultStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDefaultStatement?: (ctx: DefaultStatementContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.iterationStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIterationStatement?: (ctx: IterationStatementContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.jumpStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitJumpStatement?: (ctx: JumpStatementContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.callOtherTarget`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCallOtherTarget?: (ctx: CallOtherTargetContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.callOtherExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCallOtherExpression?: (ctx: CallOtherExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpression?: (ctx: ExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.expressionList`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpressionList?: (ctx: ExpressionListContext) => Result;
}

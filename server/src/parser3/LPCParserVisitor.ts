// Generated from grammar/LPCParser.g4 by ANTLR 4.13.1

import { AbstractParseTreeVisitor } from "antlr4ng";


import { ProgramContext } from "./LPCParser.js";
import { PreprocessorDirectiveContext } from "./LPCParser.js";
import { DefinePreprocessorDirectiveContext } from "./LPCParser.js";
import { SelectionDirectiveContext } from "./LPCParser.js";
import { SelectionDirectiveTypeSingleContext } from "./LPCParser.js";
import { SelectionDirectiveTypeWithArgContext } from "./LPCParser.js";
import { DirectiveTypeWithArgumentsContext } from "./LPCParser.js";
import { DirectiveArgumentContext } from "./LPCParser.js";
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
import { FunctionModifierContext } from "./LPCParser.js";
import { FunctionHeaderContext } from "./LPCParser.js";
import { FunctionHeaderDeclarationContext } from "./LPCParser.js";
import { FunctionDeclarationContext } from "./LPCParser.js";
import { ParameterListContext } from "./LPCParser.js";
import { ParameterContext } from "./LPCParser.js";
import { ArrayExpressionContext } from "./LPCParser.js";
import { MappingKeyContext } from "./LPCParser.js";
import { MappingContentContext } from "./LPCParser.js";
import { MappingExpressionContext } from "./LPCParser.js";
import { VariableDeclarationContext } from "./LPCParser.js";
import { PrimitiveTypeSpecifierContext } from "./LPCParser.js";
import { TypeSpecifierContext } from "./LPCParser.js";
import { InlineClosureExpressionContext } from "./LPCParser.js";
import { StatementContext } from "./LPCParser.js";
import { ExpressionStatementContext } from "./LPCParser.js";
import { CompoundStatementContext } from "./LPCParser.js";
import { SelectionStatementContext } from "./LPCParser.js";
import { ElseIfExpressionContext } from "./LPCParser.js";
import { ElseExpressionContext } from "./LPCParser.js";
import { IfExpressionContext } from "./LPCParser.js";
import { IfStatementContext } from "./LPCParser.js";
import { SwitchStatementContext } from "./LPCParser.js";
import { CaseExpressionContext } from "./LPCParser.js";
import { CaseStatementContext } from "./LPCParser.js";
import { DefaultStatementContext } from "./LPCParser.js";
import { IterationStatementContext } from "./LPCParser.js";
import { JumpStatementContext } from "./LPCParser.js";
import { CallOtherTargetContext } from "./LPCParser.js";
import { ExpressionContext } from "./LPCParser.js";
import { ArrayAccessExpressionContext } from "./LPCParser.js";
import { ExpressionListContext } from "./LPCParser.js";
import { AssignmentExpressionContext } from "./LPCParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `LPCParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class LPCParserVisitor<Result> extends AbstractParseTreeVisitor<Result> {
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
     * Visit a parse tree produced by `LPCParser.definePreprocessorDirective`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDefinePreprocessorDirective?: (ctx: DefinePreprocessorDirectiveContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.selectionDirective`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSelectionDirective?: (ctx: SelectionDirectiveContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.selectionDirectiveTypeSingle`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSelectionDirectiveTypeSingle?: (ctx: SelectionDirectiveTypeSingleContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.selectionDirectiveTypeWithArg`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSelectionDirectiveTypeWithArg?: (ctx: SelectionDirectiveTypeWithArgContext) => Result;
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
     * Visit a parse tree produced by `LPCParser.functionModifier`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunctionModifier?: (ctx: FunctionModifierContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.functionHeader`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunctionHeader?: (ctx: FunctionHeaderContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.functionHeaderDeclaration`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunctionHeaderDeclaration?: (ctx: FunctionHeaderDeclarationContext) => Result;
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
     * Visit a parse tree produced by `LPCParser.arrayExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArrayExpression?: (ctx: ArrayExpressionContext) => Result;
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
     * Visit a parse tree produced by `LPCParser.primitiveTypeSpecifier`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPrimitiveTypeSpecifier?: (ctx: PrimitiveTypeSpecifierContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.typeSpecifier`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTypeSpecifier?: (ctx: TypeSpecifierContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.inlineClosureExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInlineClosureExpression?: (ctx: InlineClosureExpressionContext) => Result;
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
     * Visit a parse tree produced by `LPCParser.elseIfExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitElseIfExpression?: (ctx: ElseIfExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.elseExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitElseExpression?: (ctx: ElseExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.ifExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIfExpression?: (ctx: IfExpressionContext) => Result;
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
     * Visit a parse tree produced by `LPCParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpression?: (ctx: ExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.arrayAccessExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArrayAccessExpression?: (ctx: ArrayAccessExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.expressionList`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpressionList?: (ctx: ExpressionListContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.assignmentExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAssignmentExpression?: (ctx: AssignmentExpressionContext) => Result;
}


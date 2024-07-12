// Generated from grammar/LPCParser.g4 by ANTLR 4.13.1

import { AbstractParseTreeVisitor } from "antlr4ng";

 
    import {LPCParserBase} from "./LPCParserBase";


import { ProgramContext } from "./LPCParser.js";
import { PreprocessorDirectiveContext } from "./LPCParser.js";
import { IncludePreprocessorDirectiveContext } from "./LPCParser.js";
import { DefinePreprocessorDirectiveContext } from "./LPCParser.js";
import { SelectionPreprocessorDirectiveContext } from "./LPCParser.js";
import { SelectionPreprocessorDirectiveTypeSingleContext } from "./LPCParser.js";
import { SelectionPreprocessorDirectiveTypeWithArgContext } from "./LPCParser.js";
import { DirectiveIfTestExpressionContext } from "./LPCParser.js";
import { DirectiveIfArgumentContext } from "./LPCParser.js";
import { DirectiveTypeWithArgumentsContext } from "./LPCParser.js";
import { DirectiveArgumentContext } from "./LPCParser.js";
import { DirectiveTypeIncludeContext } from "./LPCParser.js";
import { DirectiveIncludeFileContext } from "./LPCParser.js";
import { DirectiveTypePragmaContext } from "./LPCParser.js";
import { InheritStatementContext } from "./LPCParser.js";
import { InheritModifierContext } from "./LPCParser.js";
import { InheritContext } from "./LPCParser.js";
import { DefaultModifierContext } from "./LPCParser.js";
import { InheritFileContext } from "./LPCParser.js";
import { InheritSuperExpressionContext } from "./LPCParser.js";
import { GlobalModifierStatementContext } from "./LPCParser.js";
import { DeclarationContext } from "./LPCParser.js";
import { FunctionModifierContext } from "./LPCParser.js";
import { FunctionHeaderContext } from "./LPCParser.js";
import { FunctionHeaderDeclarationContext } from "./LPCParser.js";
import { FunctionDeclarationContext } from "./LPCParser.js";
import { ParameterListContext } from "./LPCParser.js";
import { ParameterContext } from "./LPCParser.js";
import { StructMemberDeclarationContext } from "./LPCParser.js";
import { StructMemberInitializerContext } from "./LPCParser.js";
import { VariableModifierContext } from "./LPCParser.js";
import { StructModifierContext } from "./LPCParser.js";
import { StructDeclarationContext } from "./LPCParser.js";
import { VariableDeclarationStatementContext } from "./LPCParser.js";
import { VariableDeclarationContext } from "./LPCParser.js";
import { VariableDeclaratorExpressionContext } from "./LPCParser.js";
import { VariableDeclaratorContext } from "./LPCParser.js";
import { VariableInitializerContext } from "./LPCParser.js";
import { PrimitiveTypeSpecifierContext } from "./LPCParser.js";
import { MethodInvocationContext } from "./LPCParser.js";
import { StructTypeSpecifierContext } from "./LPCParser.js";
import { TypeSpecifierContext } from "./LPCParser.js";
import { UnionableTypeSpecifierContext } from "./LPCParser.js";
import { ArrayExpressionContext } from "./LPCParser.js";
import { MappingContentContext } from "./LPCParser.js";
import { MappingValueInitializerContext } from "./LPCParser.js";
import { MappingKeylessInitializerContext } from "./LPCParser.js";
import { MappingEmptyInitializerContext } from "./LPCParser.js";
import { ExpressionContext } from "./LPCParser.js";
import { CommaableExpressionContext } from "./LPCParser.js";
import { AssignmentOperatorContext } from "./LPCParser.js";
import { ConditionalExpressionContext } from "./LPCParser.js";
import { PrimaryExpressionContext } from "./LPCParser.js";
import { LiteralExpressionContext } from "./LPCParser.js";
import { StringConcatExpressionContext } from "./LPCParser.js";
import { IdentifierExpressionContext } from "./LPCParser.js";
import { StructInitializerExpressionContext } from "./LPCParser.js";
import { ParenExpressionContext } from "./LPCParser.js";
import { PrimaryArrayExpressionContext } from "./LPCParser.js";
import { PrimaryMappingExpressionContext } from "./LPCParser.js";
import { CatchExpressionContext } from "./LPCParser.js";
import { ValidIdentifiersContext } from "./LPCParser.js";
import { CatchExprContext } from "./LPCParser.js";
import { InlineClosureExpressionContext } from "./LPCParser.js";
import { BracketExpressionContext } from "./LPCParser.js";
import { LambdaArrayIndexorContext } from "./LPCParser.js";
import { LambdaExpressionContext } from "./LPCParser.js";
import { PrimitiveTypeCastExpressionContext } from "./LPCParser.js";
import { DeclarativeTypeCastExpressionContext } from "./LPCParser.js";
import { StructCastExpressionContext } from "./LPCParser.js";
import { StatementContext } from "./LPCParser.js";
import { BlockContext } from "./LPCParser.js";
import { SelectionStatementContext } from "./LPCParser.js";
import { ElseIfExpressionContext } from "./LPCParser.js";
import { ElseExpressionContext } from "./LPCParser.js";
import { IfExpressionContext } from "./LPCParser.js";
import { IfStatementContext } from "./LPCParser.js";
import { SwitchStatementContext } from "./LPCParser.js";
import { CaseExpressionContext } from "./LPCParser.js";
import { CaseStatementContext } from "./LPCParser.js";
import { DefaultStatementContext } from "./LPCParser.js";
import { WhileStatementContext } from "./LPCParser.js";
import { DoWhileStatementContext } from "./LPCParser.js";
import { ForStatementContext } from "./LPCParser.js";
import { ForEachStatementContext } from "./LPCParser.js";
import { ForRangeExpressionContext } from "./LPCParser.js";
import { ForeachRangeExpressionContext } from "./LPCParser.js";
import { ReturnStatementContext } from "./LPCParser.js";
import { JumpStatementContext } from "./LPCParser.js";
import { CallOtherTargetContext } from "./LPCParser.js";
import { LiteralContext } from "./LPCParser.js";
import { ArgumentContext } from "./LPCParser.js";
import { ArgumentListContext } from "./LPCParser.js";


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
     * Visit a parse tree produced by `LPCParser.includePreprocessorDirective`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIncludePreprocessorDirective?: (ctx: IncludePreprocessorDirectiveContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.definePreprocessorDirective`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDefinePreprocessorDirective?: (ctx: DefinePreprocessorDirectiveContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.selectionPreprocessorDirective`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSelectionPreprocessorDirective?: (ctx: SelectionPreprocessorDirectiveContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.selectionPreprocessorDirectiveTypeSingle`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSelectionPreprocessorDirectiveTypeSingle?: (ctx: SelectionPreprocessorDirectiveTypeSingleContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.selectionPreprocessorDirectiveTypeWithArg`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSelectionPreprocessorDirectiveTypeWithArg?: (ctx: SelectionPreprocessorDirectiveTypeWithArgContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.directiveIfTestExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDirectiveIfTestExpression?: (ctx: DirectiveIfTestExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.directiveIfArgument`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDirectiveIfArgument?: (ctx: DirectiveIfArgumentContext) => Result;
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
     * Visit a parse tree produced by `LPCParser.inheritModifier`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInheritModifier?: (ctx: InheritModifierContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.inherit`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInherit?: (ctx: InheritContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.defaultModifier`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDefaultModifier?: (ctx: DefaultModifierContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.inheritFile`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInheritFile?: (ctx: InheritFileContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.inheritSuperExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInheritSuperExpression?: (ctx: InheritSuperExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.globalModifierStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitGlobalModifierStatement?: (ctx: GlobalModifierStatementContext) => Result;
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
     * Visit a parse tree produced by `LPCParser.structMemberDeclaration`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStructMemberDeclaration?: (ctx: StructMemberDeclarationContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.structMemberInitializer`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStructMemberInitializer?: (ctx: StructMemberInitializerContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.variableModifier`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVariableModifier?: (ctx: VariableModifierContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.structModifier`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStructModifier?: (ctx: StructModifierContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.structDeclaration`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStructDeclaration?: (ctx: StructDeclarationContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.variableDeclarationStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVariableDeclarationStatement?: (ctx: VariableDeclarationStatementContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.variableDeclaration`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVariableDeclaration?: (ctx: VariableDeclarationContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.variableDeclaratorExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVariableDeclaratorExpression?: (ctx: VariableDeclaratorExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.variableDeclarator`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVariableDeclarator?: (ctx: VariableDeclaratorContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.variableInitializer`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVariableInitializer?: (ctx: VariableInitializerContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.primitiveTypeSpecifier`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPrimitiveTypeSpecifier?: (ctx: PrimitiveTypeSpecifierContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.methodInvocation`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMethodInvocation?: (ctx: MethodInvocationContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.structTypeSpecifier`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStructTypeSpecifier?: (ctx: StructTypeSpecifierContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.typeSpecifier`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTypeSpecifier?: (ctx: TypeSpecifierContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.unionableTypeSpecifier`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUnionableTypeSpecifier?: (ctx: UnionableTypeSpecifierContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.arrayExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArrayExpression?: (ctx: ArrayExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.mappingContent`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMappingContent?: (ctx: MappingContentContext) => Result;
    /**
     * Visit a parse tree produced by the `mappingValueInitializer`
     * labeled alternative in `LPCParser.mappingExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMappingValueInitializer?: (ctx: MappingValueInitializerContext) => Result;
    /**
     * Visit a parse tree produced by the `mappingKeylessInitializer`
     * labeled alternative in `LPCParser.mappingExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMappingKeylessInitializer?: (ctx: MappingKeylessInitializerContext) => Result;
    /**
     * Visit a parse tree produced by the `mappingEmptyInitializer`
     * labeled alternative in `LPCParser.mappingExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMappingEmptyInitializer?: (ctx: MappingEmptyInitializerContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpression?: (ctx: ExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.commaableExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCommaableExpression?: (ctx: CommaableExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.assignmentOperator`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAssignmentOperator?: (ctx: AssignmentOperatorContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.conditionalExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitConditionalExpression?: (ctx: ConditionalExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.primaryExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPrimaryExpression?: (ctx: PrimaryExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `literalExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLiteralExpression?: (ctx: LiteralExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `stringConcatExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStringConcatExpression?: (ctx: StringConcatExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `identifierExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIdentifierExpression?: (ctx: IdentifierExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `structInitializerExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStructInitializerExpression?: (ctx: StructInitializerExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `parenExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParenExpression?: (ctx: ParenExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `primaryArrayExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPrimaryArrayExpression?: (ctx: PrimaryArrayExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `primaryMappingExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPrimaryMappingExpression?: (ctx: PrimaryMappingExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `catchExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCatchExpression?: (ctx: CatchExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.validIdentifiers`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitValidIdentifiers?: (ctx: ValidIdentifiersContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.catchExpr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCatchExpr?: (ctx: CatchExprContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.inlineClosureExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInlineClosureExpression?: (ctx: InlineClosureExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.bracketExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBracketExpression?: (ctx: BracketExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.lambdaArrayIndexor`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLambdaArrayIndexor?: (ctx: LambdaArrayIndexorContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.lambdaExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLambdaExpression?: (ctx: LambdaExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `primitiveTypeCastExpression`
     * labeled alternative in `LPCParser.castExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPrimitiveTypeCastExpression?: (ctx: PrimitiveTypeCastExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `declarativeTypeCastExpression`
     * labeled alternative in `LPCParser.castExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDeclarativeTypeCastExpression?: (ctx: DeclarativeTypeCastExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `structCastExpression`
     * labeled alternative in `LPCParser.castExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStructCastExpression?: (ctx: StructCastExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.statement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStatement?: (ctx: StatementContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.block`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBlock?: (ctx: BlockContext) => Result;
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
     * Visit a parse tree produced by the `whileStatement`
     * labeled alternative in `LPCParser.iterationStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWhileStatement?: (ctx: WhileStatementContext) => Result;
    /**
     * Visit a parse tree produced by the `doWhileStatement`
     * labeled alternative in `LPCParser.iterationStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDoWhileStatement?: (ctx: DoWhileStatementContext) => Result;
    /**
     * Visit a parse tree produced by the `forStatement`
     * labeled alternative in `LPCParser.iterationStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitForStatement?: (ctx: ForStatementContext) => Result;
    /**
     * Visit a parse tree produced by the `forEachStatement`
     * labeled alternative in `LPCParser.iterationStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitForEachStatement?: (ctx: ForEachStatementContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.forRangeExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitForRangeExpression?: (ctx: ForRangeExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.foreachRangeExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitForeachRangeExpression?: (ctx: ForeachRangeExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.returnStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitReturnStatement?: (ctx: ReturnStatementContext) => Result;
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
     * Visit a parse tree produced by `LPCParser.literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLiteral?: (ctx: LiteralContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.argument`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArgument?: (ctx: ArgumentContext) => Result;
    /**
     * Visit a parse tree produced by `LPCParser.argumentList`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArgumentList?: (ctx: ArgumentListContext) => Result;
}


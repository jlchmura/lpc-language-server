// Generated from grammar/LPCParser.g4 by ANTLR 4.13.1

import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { ProgramContext } from "./LPCParser.js";
import { PreprocessorDirectiveContext } from "./LPCParser.js";
import { IncludeDirectiveContext } from "./LPCParser.js";
import { DefinePreprocessorDirectiveContext } from "./LPCParser.js";
import { SelectionDirectiveContext } from "./LPCParser.js";
import { SelectionDirectiveTypeSingleContext } from "./LPCParser.js";
import { SelectionDirectiveTypeWithArgContext } from "./LPCParser.js";
import { DirectiveTypeWithArgumentsContext } from "./LPCParser.js";
import { DirectiveArgumentContext } from "./LPCParser.js";
import { DirectiveDefineParamContext } from "./LPCParser.js";
import { DirectiveDefineArgumentContext } from "./LPCParser.js";
import { DirectiveTypeIncludeContext } from "./LPCParser.js";
import { IncludeGlobalFileContext } from "./LPCParser.js";
import { IncludeLocalFileContext } from "./LPCParser.js";
import { IncludeDefineContext } from "./LPCParser.js";
import { DirectiveIncludeFilenameContext } from "./LPCParser.js";
import { DirectiveIncludeFileGlobalContext } from "./LPCParser.js";
import { DirectiveIncludeFileLocalContext } from "./LPCParser.js";
import { DirectiveTypePragmaContext } from "./LPCParser.js";
import { InheritStatementContext } from "./LPCParser.js";
import { InheritSuperExpressionContext } from "./LPCParser.js";
import { DeclarationContext } from "./LPCParser.js";
import { FunctionModifierContext } from "./LPCParser.js";
import { FunctionHeaderContext } from "./LPCParser.js";
import { FunctionHeaderDeclarationContext } from "./LPCParser.js";
import { FunctionDeclarationContext } from "./LPCParser.js";
import { ParameterListContext } from "./LPCParser.js";
import { PrimitiveTypeParameterExpressionContext } from "./LPCParser.js";
import { StructParameterExpressionContext } from "./LPCParser.js";
import { StructDeclarationContext } from "./LPCParser.js";
import { StructMemberDeclarationContext } from "./LPCParser.js";
import { ArrayExpressionContext } from "./LPCParser.js";
import { MappingContentContext } from "./LPCParser.js";
import { MappingValueInitializerContext } from "./LPCParser.js";
import { MappingEmptyInitializerContext } from "./LPCParser.js";
import { VariableModifierContext } from "./LPCParser.js";
import { PrimitiveTypeVariableDeclarationContext } from "./LPCParser.js";
import { StructVariableDeclarationContext } from "./LPCParser.js";
import { VariableDeclaratorContext } from "./LPCParser.js";
import { VariableInitializerContext } from "./LPCParser.js";
import { PrimitiveTypeSpecifierContext } from "./LPCParser.js";
import { MethodInvocationContext } from "./LPCParser.js";
import { ArrayTypeSpecifierContext } from "./LPCParser.js";
import { TypeSpecifierContext } from "./LPCParser.js";
import { InlineClosureExpressionContext } from "./LPCParser.js";
import { StatementContext } from "./LPCParser.js";
import { ExpressionStatementContext } from "./LPCParser.js";
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
import { IterationStatementContext } from "./LPCParser.js";
import { ForVariableContext } from "./LPCParser.js";
import { ReturnStatementContext } from "./LPCParser.js";
import { JumpStatementContext } from "./LPCParser.js";
import { CallOtherTargetContext } from "./LPCParser.js";
import { LambdaExpressionContext } from "./LPCParser.js";
import { RightShiftAssignmentContext } from "./LPCParser.js";
import { LiteralContext } from "./LPCParser.js";
import { PrimitiveTypeCastExpressionContext } from "./LPCParser.js";
import { StructCastExpressionContext } from "./LPCParser.js";
import { AssignmentOperatorContext } from "./LPCParser.js";
import { RelationalExpresionContext } from "./LPCParser.js";
import { AndExpressionContext } from "./LPCParser.js";
import { ConditionalOrExpressionContext } from "./LPCParser.js";
import { ShiftExpressionContext } from "./LPCParser.js";
import { AdditiveExpressionContext } from "./LPCParser.js";
import { TempUnaryExpressionContext } from "./LPCParser.js";
import { ConditionalExpressionContext } from "./LPCParser.js";
import { InclusiveOrExpressionContext } from "./LPCParser.js";
import { ExclusiveOrExpressionContext } from "./LPCParser.js";
import { EqualityExpressionContext } from "./LPCParser.js";
import { ConditionalAndExpressionContext } from "./LPCParser.js";
import { MultiplicativeExpressionContext } from "./LPCParser.js";
import { UnaryExpressionContext } from "./LPCParser.js";
import { PrimaryExpressionContext } from "./LPCParser.js";
import { LiteralExpressionContext } from "./LPCParser.js";
import { CloneObjectExpressionContext } from "./LPCParser.js";
import { IdentifierExpressionContext } from "./LPCParser.js";
import { ParenExpressionContext } from "./LPCParser.js";
import { PrimaryArrayExpressionContext } from "./LPCParser.js";
import { PrimaryMappingExpressionContext } from "./LPCParser.js";
import { StringConcatExpressionContext } from "./LPCParser.js";
import { CatchExpressionContext } from "./LPCParser.js";
import { InheritExpressionContext } from "./LPCParser.js";
import { ExpressionContext } from "./LPCParser.js";
import { CatchExprContext } from "./LPCParser.js";
import { BracketExpressionContext } from "./LPCParser.js";
import { ArgumentContext } from "./LPCParser.js";
import { ArgumentListContext } from "./LPCParser.js";
import { ExpressionListContext } from "./LPCParser.js";
import { AssignmentExpressionContext } from "./LPCParser.js";
import { NonAssignmentExpressionContext } from "./LPCParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `LPCParser`.
 */
export class LPCParserListener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `LPCParser.program`.
     * @param ctx the parse tree
     */
    enterProgram?: (ctx: ProgramContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.program`.
     * @param ctx the parse tree
     */
    exitProgram?: (ctx: ProgramContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.preprocessorDirective`.
     * @param ctx the parse tree
     */
    enterPreprocessorDirective?: (ctx: PreprocessorDirectiveContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.preprocessorDirective`.
     * @param ctx the parse tree
     */
    exitPreprocessorDirective?: (ctx: PreprocessorDirectiveContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.includeDirective`.
     * @param ctx the parse tree
     */
    enterIncludeDirective?: (ctx: IncludeDirectiveContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.includeDirective`.
     * @param ctx the parse tree
     */
    exitIncludeDirective?: (ctx: IncludeDirectiveContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.definePreprocessorDirective`.
     * @param ctx the parse tree
     */
    enterDefinePreprocessorDirective?: (ctx: DefinePreprocessorDirectiveContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.definePreprocessorDirective`.
     * @param ctx the parse tree
     */
    exitDefinePreprocessorDirective?: (ctx: DefinePreprocessorDirectiveContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.selectionDirective`.
     * @param ctx the parse tree
     */
    enterSelectionDirective?: (ctx: SelectionDirectiveContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.selectionDirective`.
     * @param ctx the parse tree
     */
    exitSelectionDirective?: (ctx: SelectionDirectiveContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.selectionDirectiveTypeSingle`.
     * @param ctx the parse tree
     */
    enterSelectionDirectiveTypeSingle?: (ctx: SelectionDirectiveTypeSingleContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.selectionDirectiveTypeSingle`.
     * @param ctx the parse tree
     */
    exitSelectionDirectiveTypeSingle?: (ctx: SelectionDirectiveTypeSingleContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.selectionDirectiveTypeWithArg`.
     * @param ctx the parse tree
     */
    enterSelectionDirectiveTypeWithArg?: (ctx: SelectionDirectiveTypeWithArgContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.selectionDirectiveTypeWithArg`.
     * @param ctx the parse tree
     */
    exitSelectionDirectiveTypeWithArg?: (ctx: SelectionDirectiveTypeWithArgContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.directiveTypeWithArguments`.
     * @param ctx the parse tree
     */
    enterDirectiveTypeWithArguments?: (ctx: DirectiveTypeWithArgumentsContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.directiveTypeWithArguments`.
     * @param ctx the parse tree
     */
    exitDirectiveTypeWithArguments?: (ctx: DirectiveTypeWithArgumentsContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.directiveArgument`.
     * @param ctx the parse tree
     */
    enterDirectiveArgument?: (ctx: DirectiveArgumentContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.directiveArgument`.
     * @param ctx the parse tree
     */
    exitDirectiveArgument?: (ctx: DirectiveArgumentContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.directiveDefineParam`.
     * @param ctx the parse tree
     */
    enterDirectiveDefineParam?: (ctx: DirectiveDefineParamContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.directiveDefineParam`.
     * @param ctx the parse tree
     */
    exitDirectiveDefineParam?: (ctx: DirectiveDefineParamContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.directiveDefineArgument`.
     * @param ctx the parse tree
     */
    enterDirectiveDefineArgument?: (ctx: DirectiveDefineArgumentContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.directiveDefineArgument`.
     * @param ctx the parse tree
     */
    exitDirectiveDefineArgument?: (ctx: DirectiveDefineArgumentContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.directiveTypeInclude`.
     * @param ctx the parse tree
     */
    enterDirectiveTypeInclude?: (ctx: DirectiveTypeIncludeContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.directiveTypeInclude`.
     * @param ctx the parse tree
     */
    exitDirectiveTypeInclude?: (ctx: DirectiveTypeIncludeContext) => void;
    /**
     * Enter a parse tree produced by the `includeGlobalFile`
     * labeled alternative in `LPCParser.directiveIncludeFile`.
     * @param ctx the parse tree
     */
    enterIncludeGlobalFile?: (ctx: IncludeGlobalFileContext) => void;
    /**
     * Exit a parse tree produced by the `includeGlobalFile`
     * labeled alternative in `LPCParser.directiveIncludeFile`.
     * @param ctx the parse tree
     */
    exitIncludeGlobalFile?: (ctx: IncludeGlobalFileContext) => void;
    /**
     * Enter a parse tree produced by the `includeLocalFile`
     * labeled alternative in `LPCParser.directiveIncludeFile`.
     * @param ctx the parse tree
     */
    enterIncludeLocalFile?: (ctx: IncludeLocalFileContext) => void;
    /**
     * Exit a parse tree produced by the `includeLocalFile`
     * labeled alternative in `LPCParser.directiveIncludeFile`.
     * @param ctx the parse tree
     */
    exitIncludeLocalFile?: (ctx: IncludeLocalFileContext) => void;
    /**
     * Enter a parse tree produced by the `includeDefine`
     * labeled alternative in `LPCParser.directiveIncludeFile`.
     * @param ctx the parse tree
     */
    enterIncludeDefine?: (ctx: IncludeDefineContext) => void;
    /**
     * Exit a parse tree produced by the `includeDefine`
     * labeled alternative in `LPCParser.directiveIncludeFile`.
     * @param ctx the parse tree
     */
    exitIncludeDefine?: (ctx: IncludeDefineContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.directiveIncludeFilename`.
     * @param ctx the parse tree
     */
    enterDirectiveIncludeFilename?: (ctx: DirectiveIncludeFilenameContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.directiveIncludeFilename`.
     * @param ctx the parse tree
     */
    exitDirectiveIncludeFilename?: (ctx: DirectiveIncludeFilenameContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.directiveIncludeFileGlobal`.
     * @param ctx the parse tree
     */
    enterDirectiveIncludeFileGlobal?: (ctx: DirectiveIncludeFileGlobalContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.directiveIncludeFileGlobal`.
     * @param ctx the parse tree
     */
    exitDirectiveIncludeFileGlobal?: (ctx: DirectiveIncludeFileGlobalContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.directiveIncludeFileLocal`.
     * @param ctx the parse tree
     */
    enterDirectiveIncludeFileLocal?: (ctx: DirectiveIncludeFileLocalContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.directiveIncludeFileLocal`.
     * @param ctx the parse tree
     */
    exitDirectiveIncludeFileLocal?: (ctx: DirectiveIncludeFileLocalContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.directiveTypePragma`.
     * @param ctx the parse tree
     */
    enterDirectiveTypePragma?: (ctx: DirectiveTypePragmaContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.directiveTypePragma`.
     * @param ctx the parse tree
     */
    exitDirectiveTypePragma?: (ctx: DirectiveTypePragmaContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.inheritStatement`.
     * @param ctx the parse tree
     */
    enterInheritStatement?: (ctx: InheritStatementContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.inheritStatement`.
     * @param ctx the parse tree
     */
    exitInheritStatement?: (ctx: InheritStatementContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.inheritSuperExpression`.
     * @param ctx the parse tree
     */
    enterInheritSuperExpression?: (ctx: InheritSuperExpressionContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.inheritSuperExpression`.
     * @param ctx the parse tree
     */
    exitInheritSuperExpression?: (ctx: InheritSuperExpressionContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.declaration`.
     * @param ctx the parse tree
     */
    enterDeclaration?: (ctx: DeclarationContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.declaration`.
     * @param ctx the parse tree
     */
    exitDeclaration?: (ctx: DeclarationContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.functionModifier`.
     * @param ctx the parse tree
     */
    enterFunctionModifier?: (ctx: FunctionModifierContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.functionModifier`.
     * @param ctx the parse tree
     */
    exitFunctionModifier?: (ctx: FunctionModifierContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.functionHeader`.
     * @param ctx the parse tree
     */
    enterFunctionHeader?: (ctx: FunctionHeaderContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.functionHeader`.
     * @param ctx the parse tree
     */
    exitFunctionHeader?: (ctx: FunctionHeaderContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.functionHeaderDeclaration`.
     * @param ctx the parse tree
     */
    enterFunctionHeaderDeclaration?: (ctx: FunctionHeaderDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.functionHeaderDeclaration`.
     * @param ctx the parse tree
     */
    exitFunctionHeaderDeclaration?: (ctx: FunctionHeaderDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.functionDeclaration`.
     * @param ctx the parse tree
     */
    enterFunctionDeclaration?: (ctx: FunctionDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.functionDeclaration`.
     * @param ctx the parse tree
     */
    exitFunctionDeclaration?: (ctx: FunctionDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.parameterList`.
     * @param ctx the parse tree
     */
    enterParameterList?: (ctx: ParameterListContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.parameterList`.
     * @param ctx the parse tree
     */
    exitParameterList?: (ctx: ParameterListContext) => void;
    /**
     * Enter a parse tree produced by the `primitiveTypeParameterExpression`
     * labeled alternative in `LPCParser.parameter`.
     * @param ctx the parse tree
     */
    enterPrimitiveTypeParameterExpression?: (ctx: PrimitiveTypeParameterExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `primitiveTypeParameterExpression`
     * labeled alternative in `LPCParser.parameter`.
     * @param ctx the parse tree
     */
    exitPrimitiveTypeParameterExpression?: (ctx: PrimitiveTypeParameterExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `structParameterExpression`
     * labeled alternative in `LPCParser.parameter`.
     * @param ctx the parse tree
     */
    enterStructParameterExpression?: (ctx: StructParameterExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `structParameterExpression`
     * labeled alternative in `LPCParser.parameter`.
     * @param ctx the parse tree
     */
    exitStructParameterExpression?: (ctx: StructParameterExpressionContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.structDeclaration`.
     * @param ctx the parse tree
     */
    enterStructDeclaration?: (ctx: StructDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.structDeclaration`.
     * @param ctx the parse tree
     */
    exitStructDeclaration?: (ctx: StructDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.structMemberDeclaration`.
     * @param ctx the parse tree
     */
    enterStructMemberDeclaration?: (ctx: StructMemberDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.structMemberDeclaration`.
     * @param ctx the parse tree
     */
    exitStructMemberDeclaration?: (ctx: StructMemberDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.arrayExpression`.
     * @param ctx the parse tree
     */
    enterArrayExpression?: (ctx: ArrayExpressionContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.arrayExpression`.
     * @param ctx the parse tree
     */
    exitArrayExpression?: (ctx: ArrayExpressionContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.mappingContent`.
     * @param ctx the parse tree
     */
    enterMappingContent?: (ctx: MappingContentContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.mappingContent`.
     * @param ctx the parse tree
     */
    exitMappingContent?: (ctx: MappingContentContext) => void;
    /**
     * Enter a parse tree produced by the `mappingValueInitializer`
     * labeled alternative in `LPCParser.mappingExpression`.
     * @param ctx the parse tree
     */
    enterMappingValueInitializer?: (ctx: MappingValueInitializerContext) => void;
    /**
     * Exit a parse tree produced by the `mappingValueInitializer`
     * labeled alternative in `LPCParser.mappingExpression`.
     * @param ctx the parse tree
     */
    exitMappingValueInitializer?: (ctx: MappingValueInitializerContext) => void;
    /**
     * Enter a parse tree produced by the `mappingEmptyInitializer`
     * labeled alternative in `LPCParser.mappingExpression`.
     * @param ctx the parse tree
     */
    enterMappingEmptyInitializer?: (ctx: MappingEmptyInitializerContext) => void;
    /**
     * Exit a parse tree produced by the `mappingEmptyInitializer`
     * labeled alternative in `LPCParser.mappingExpression`.
     * @param ctx the parse tree
     */
    exitMappingEmptyInitializer?: (ctx: MappingEmptyInitializerContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.variableModifier`.
     * @param ctx the parse tree
     */
    enterVariableModifier?: (ctx: VariableModifierContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.variableModifier`.
     * @param ctx the parse tree
     */
    exitVariableModifier?: (ctx: VariableModifierContext) => void;
    /**
     * Enter a parse tree produced by the `primitiveTypeVariableDeclaration`
     * labeled alternative in `LPCParser.variableDeclaration`.
     * @param ctx the parse tree
     */
    enterPrimitiveTypeVariableDeclaration?: (ctx: PrimitiveTypeVariableDeclarationContext) => void;
    /**
     * Exit a parse tree produced by the `primitiveTypeVariableDeclaration`
     * labeled alternative in `LPCParser.variableDeclaration`.
     * @param ctx the parse tree
     */
    exitPrimitiveTypeVariableDeclaration?: (ctx: PrimitiveTypeVariableDeclarationContext) => void;
    /**
     * Enter a parse tree produced by the `structVariableDeclaration`
     * labeled alternative in `LPCParser.variableDeclaration`.
     * @param ctx the parse tree
     */
    enterStructVariableDeclaration?: (ctx: StructVariableDeclarationContext) => void;
    /**
     * Exit a parse tree produced by the `structVariableDeclaration`
     * labeled alternative in `LPCParser.variableDeclaration`.
     * @param ctx the parse tree
     */
    exitStructVariableDeclaration?: (ctx: StructVariableDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.variableDeclarator`.
     * @param ctx the parse tree
     */
    enterVariableDeclarator?: (ctx: VariableDeclaratorContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.variableDeclarator`.
     * @param ctx the parse tree
     */
    exitVariableDeclarator?: (ctx: VariableDeclaratorContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.variableInitializer`.
     * @param ctx the parse tree
     */
    enterVariableInitializer?: (ctx: VariableInitializerContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.variableInitializer`.
     * @param ctx the parse tree
     */
    exitVariableInitializer?: (ctx: VariableInitializerContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.primitiveTypeSpecifier`.
     * @param ctx the parse tree
     */
    enterPrimitiveTypeSpecifier?: (ctx: PrimitiveTypeSpecifierContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.primitiveTypeSpecifier`.
     * @param ctx the parse tree
     */
    exitPrimitiveTypeSpecifier?: (ctx: PrimitiveTypeSpecifierContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.methodInvocation`.
     * @param ctx the parse tree
     */
    enterMethodInvocation?: (ctx: MethodInvocationContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.methodInvocation`.
     * @param ctx the parse tree
     */
    exitMethodInvocation?: (ctx: MethodInvocationContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.arrayTypeSpecifier`.
     * @param ctx the parse tree
     */
    enterArrayTypeSpecifier?: (ctx: ArrayTypeSpecifierContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.arrayTypeSpecifier`.
     * @param ctx the parse tree
     */
    exitArrayTypeSpecifier?: (ctx: ArrayTypeSpecifierContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.typeSpecifier`.
     * @param ctx the parse tree
     */
    enterTypeSpecifier?: (ctx: TypeSpecifierContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.typeSpecifier`.
     * @param ctx the parse tree
     */
    exitTypeSpecifier?: (ctx: TypeSpecifierContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.inlineClosureExpression`.
     * @param ctx the parse tree
     */
    enterInlineClosureExpression?: (ctx: InlineClosureExpressionContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.inlineClosureExpression`.
     * @param ctx the parse tree
     */
    exitInlineClosureExpression?: (ctx: InlineClosureExpressionContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.statement`.
     * @param ctx the parse tree
     */
    enterStatement?: (ctx: StatementContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.statement`.
     * @param ctx the parse tree
     */
    exitStatement?: (ctx: StatementContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.expressionStatement`.
     * @param ctx the parse tree
     */
    enterExpressionStatement?: (ctx: ExpressionStatementContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.expressionStatement`.
     * @param ctx the parse tree
     */
    exitExpressionStatement?: (ctx: ExpressionStatementContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.block`.
     * @param ctx the parse tree
     */
    enterBlock?: (ctx: BlockContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.block`.
     * @param ctx the parse tree
     */
    exitBlock?: (ctx: BlockContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.selectionStatement`.
     * @param ctx the parse tree
     */
    enterSelectionStatement?: (ctx: SelectionStatementContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.selectionStatement`.
     * @param ctx the parse tree
     */
    exitSelectionStatement?: (ctx: SelectionStatementContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.elseIfExpression`.
     * @param ctx the parse tree
     */
    enterElseIfExpression?: (ctx: ElseIfExpressionContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.elseIfExpression`.
     * @param ctx the parse tree
     */
    exitElseIfExpression?: (ctx: ElseIfExpressionContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.elseExpression`.
     * @param ctx the parse tree
     */
    enterElseExpression?: (ctx: ElseExpressionContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.elseExpression`.
     * @param ctx the parse tree
     */
    exitElseExpression?: (ctx: ElseExpressionContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.ifExpression`.
     * @param ctx the parse tree
     */
    enterIfExpression?: (ctx: IfExpressionContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.ifExpression`.
     * @param ctx the parse tree
     */
    exitIfExpression?: (ctx: IfExpressionContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.ifStatement`.
     * @param ctx the parse tree
     */
    enterIfStatement?: (ctx: IfStatementContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.ifStatement`.
     * @param ctx the parse tree
     */
    exitIfStatement?: (ctx: IfStatementContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.switchStatement`.
     * @param ctx the parse tree
     */
    enterSwitchStatement?: (ctx: SwitchStatementContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.switchStatement`.
     * @param ctx the parse tree
     */
    exitSwitchStatement?: (ctx: SwitchStatementContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.caseExpression`.
     * @param ctx the parse tree
     */
    enterCaseExpression?: (ctx: CaseExpressionContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.caseExpression`.
     * @param ctx the parse tree
     */
    exitCaseExpression?: (ctx: CaseExpressionContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.caseStatement`.
     * @param ctx the parse tree
     */
    enterCaseStatement?: (ctx: CaseStatementContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.caseStatement`.
     * @param ctx the parse tree
     */
    exitCaseStatement?: (ctx: CaseStatementContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.defaultStatement`.
     * @param ctx the parse tree
     */
    enterDefaultStatement?: (ctx: DefaultStatementContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.defaultStatement`.
     * @param ctx the parse tree
     */
    exitDefaultStatement?: (ctx: DefaultStatementContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.iterationStatement`.
     * @param ctx the parse tree
     */
    enterIterationStatement?: (ctx: IterationStatementContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.iterationStatement`.
     * @param ctx the parse tree
     */
    exitIterationStatement?: (ctx: IterationStatementContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.forVariable`.
     * @param ctx the parse tree
     */
    enterForVariable?: (ctx: ForVariableContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.forVariable`.
     * @param ctx the parse tree
     */
    exitForVariable?: (ctx: ForVariableContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.returnStatement`.
     * @param ctx the parse tree
     */
    enterReturnStatement?: (ctx: ReturnStatementContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.returnStatement`.
     * @param ctx the parse tree
     */
    exitReturnStatement?: (ctx: ReturnStatementContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.jumpStatement`.
     * @param ctx the parse tree
     */
    enterJumpStatement?: (ctx: JumpStatementContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.jumpStatement`.
     * @param ctx the parse tree
     */
    exitJumpStatement?: (ctx: JumpStatementContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.callOtherTarget`.
     * @param ctx the parse tree
     */
    enterCallOtherTarget?: (ctx: CallOtherTargetContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.callOtherTarget`.
     * @param ctx the parse tree
     */
    exitCallOtherTarget?: (ctx: CallOtherTargetContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.lambdaExpression`.
     * @param ctx the parse tree
     */
    enterLambdaExpression?: (ctx: LambdaExpressionContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.lambdaExpression`.
     * @param ctx the parse tree
     */
    exitLambdaExpression?: (ctx: LambdaExpressionContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.rightShiftAssignment`.
     * @param ctx the parse tree
     */
    enterRightShiftAssignment?: (ctx: RightShiftAssignmentContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.rightShiftAssignment`.
     * @param ctx the parse tree
     */
    exitRightShiftAssignment?: (ctx: RightShiftAssignmentContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.literal`.
     * @param ctx the parse tree
     */
    enterLiteral?: (ctx: LiteralContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.literal`.
     * @param ctx the parse tree
     */
    exitLiteral?: (ctx: LiteralContext) => void;
    /**
     * Enter a parse tree produced by the `primitiveTypeCastExpression`
     * labeled alternative in `LPCParser.castExpression`.
     * @param ctx the parse tree
     */
    enterPrimitiveTypeCastExpression?: (ctx: PrimitiveTypeCastExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `primitiveTypeCastExpression`
     * labeled alternative in `LPCParser.castExpression`.
     * @param ctx the parse tree
     */
    exitPrimitiveTypeCastExpression?: (ctx: PrimitiveTypeCastExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `structCastExpression`
     * labeled alternative in `LPCParser.castExpression`.
     * @param ctx the parse tree
     */
    enterStructCastExpression?: (ctx: StructCastExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `structCastExpression`
     * labeled alternative in `LPCParser.castExpression`.
     * @param ctx the parse tree
     */
    exitStructCastExpression?: (ctx: StructCastExpressionContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.assignmentOperator`.
     * @param ctx the parse tree
     */
    enterAssignmentOperator?: (ctx: AssignmentOperatorContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.assignmentOperator`.
     * @param ctx the parse tree
     */
    exitAssignmentOperator?: (ctx: AssignmentOperatorContext) => void;
    /**
     * Enter a parse tree produced by the `relationalExpresion`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    enterRelationalExpresion?: (ctx: RelationalExpresionContext) => void;
    /**
     * Exit a parse tree produced by the `relationalExpresion`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    exitRelationalExpresion?: (ctx: RelationalExpresionContext) => void;
    /**
     * Enter a parse tree produced by the `andExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    enterAndExpression?: (ctx: AndExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `andExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    exitAndExpression?: (ctx: AndExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `conditionalOrExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    enterConditionalOrExpression?: (ctx: ConditionalOrExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `conditionalOrExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    exitConditionalOrExpression?: (ctx: ConditionalOrExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `shiftExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    enterShiftExpression?: (ctx: ShiftExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `shiftExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    exitShiftExpression?: (ctx: ShiftExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `additiveExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    enterAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `additiveExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    exitAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `tempUnaryExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    enterTempUnaryExpression?: (ctx: TempUnaryExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `tempUnaryExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    exitTempUnaryExpression?: (ctx: TempUnaryExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `conditionalExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    enterConditionalExpression?: (ctx: ConditionalExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `conditionalExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    exitConditionalExpression?: (ctx: ConditionalExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `inclusiveOrExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    enterInclusiveOrExpression?: (ctx: InclusiveOrExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `inclusiveOrExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    exitInclusiveOrExpression?: (ctx: InclusiveOrExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `exclusiveOrExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    enterExclusiveOrExpression?: (ctx: ExclusiveOrExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `exclusiveOrExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    exitExclusiveOrExpression?: (ctx: ExclusiveOrExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `equalityExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    enterEqualityExpression?: (ctx: EqualityExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `equalityExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    exitEqualityExpression?: (ctx: EqualityExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `conditionalAndExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    enterConditionalAndExpression?: (ctx: ConditionalAndExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `conditionalAndExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    exitConditionalAndExpression?: (ctx: ConditionalAndExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `multiplicativeExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    enterMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `multiplicativeExpression`
     * labeled alternative in `LPCParser.conditionalExpressionBase`.
     * @param ctx the parse tree
     */
    exitMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.unaryExpression`.
     * @param ctx the parse tree
     */
    enterUnaryExpression?: (ctx: UnaryExpressionContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.unaryExpression`.
     * @param ctx the parse tree
     */
    exitUnaryExpression?: (ctx: UnaryExpressionContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.primaryExpression`.
     * @param ctx the parse tree
     */
    enterPrimaryExpression?: (ctx: PrimaryExpressionContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.primaryExpression`.
     * @param ctx the parse tree
     */
    exitPrimaryExpression?: (ctx: PrimaryExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `literalExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     */
    enterLiteralExpression?: (ctx: LiteralExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `literalExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     */
    exitLiteralExpression?: (ctx: LiteralExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `cloneObjectExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     */
    enterCloneObjectExpression?: (ctx: CloneObjectExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `cloneObjectExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     */
    exitCloneObjectExpression?: (ctx: CloneObjectExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `identifierExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     */
    enterIdentifierExpression?: (ctx: IdentifierExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `identifierExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     */
    exitIdentifierExpression?: (ctx: IdentifierExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `parenExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     */
    enterParenExpression?: (ctx: ParenExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `parenExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     */
    exitParenExpression?: (ctx: ParenExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `primaryArrayExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     */
    enterPrimaryArrayExpression?: (ctx: PrimaryArrayExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `primaryArrayExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     */
    exitPrimaryArrayExpression?: (ctx: PrimaryArrayExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `primaryMappingExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     */
    enterPrimaryMappingExpression?: (ctx: PrimaryMappingExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `primaryMappingExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     */
    exitPrimaryMappingExpression?: (ctx: PrimaryMappingExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `stringConcatExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     */
    enterStringConcatExpression?: (ctx: StringConcatExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `stringConcatExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     */
    exitStringConcatExpression?: (ctx: StringConcatExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `catchExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     */
    enterCatchExpression?: (ctx: CatchExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `catchExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     */
    exitCatchExpression?: (ctx: CatchExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `inheritExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     */
    enterInheritExpression?: (ctx: InheritExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `inheritExpression`
     * labeled alternative in `LPCParser.primaryExpressionStart`.
     * @param ctx the parse tree
     */
    exitInheritExpression?: (ctx: InheritExpressionContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.expression`.
     * @param ctx the parse tree
     */
    enterExpression?: (ctx: ExpressionContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.expression`.
     * @param ctx the parse tree
     */
    exitExpression?: (ctx: ExpressionContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.catchExpr`.
     * @param ctx the parse tree
     */
    enterCatchExpr?: (ctx: CatchExprContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.catchExpr`.
     * @param ctx the parse tree
     */
    exitCatchExpr?: (ctx: CatchExprContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.bracketExpression`.
     * @param ctx the parse tree
     */
    enterBracketExpression?: (ctx: BracketExpressionContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.bracketExpression`.
     * @param ctx the parse tree
     */
    exitBracketExpression?: (ctx: BracketExpressionContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.argument`.
     * @param ctx the parse tree
     */
    enterArgument?: (ctx: ArgumentContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.argument`.
     * @param ctx the parse tree
     */
    exitArgument?: (ctx: ArgumentContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.argumentList`.
     * @param ctx the parse tree
     */
    enterArgumentList?: (ctx: ArgumentListContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.argumentList`.
     * @param ctx the parse tree
     */
    exitArgumentList?: (ctx: ArgumentListContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.expressionList`.
     * @param ctx the parse tree
     */
    enterExpressionList?: (ctx: ExpressionListContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.expressionList`.
     * @param ctx the parse tree
     */
    exitExpressionList?: (ctx: ExpressionListContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.assignmentExpression`.
     * @param ctx the parse tree
     */
    enterAssignmentExpression?: (ctx: AssignmentExpressionContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.assignmentExpression`.
     * @param ctx the parse tree
     */
    exitAssignmentExpression?: (ctx: AssignmentExpressionContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.nonAssignmentExpression`.
     * @param ctx the parse tree
     */
    enterNonAssignmentExpression?: (ctx: NonAssignmentExpressionContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.nonAssignmentExpression`.
     * @param ctx the parse tree
     */
    exitNonAssignmentExpression?: (ctx: NonAssignmentExpressionContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}


// Generated from grammar/LPC.g4 by ANTLR 4.13.1

import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


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
 * This interface defines a complete listener for a parse tree produced by
 * `LPCParser`.
 */
export class LPCListener implements ParseTreeListener {
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
     * Enter a parse tree produced by `LPCParser.directiveType`.
     * @param ctx the parse tree
     */
    enterDirectiveType?: (ctx: DirectiveTypeContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.directiveType`.
     * @param ctx the parse tree
     */
    exitDirectiveType?: (ctx: DirectiveTypeContext) => void;
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
     * Enter a parse tree produced by `LPCParser.directiveTypeDefine`.
     * @param ctx the parse tree
     */
    enterDirectiveTypeDefine?: (ctx: DirectiveTypeDefineContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.directiveTypeDefine`.
     * @param ctx the parse tree
     */
    exitDirectiveTypeDefine?: (ctx: DirectiveTypeDefineContext) => void;
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
     * Enter a parse tree produced by `LPCParser.directiveIncludeFile`.
     * @param ctx the parse tree
     */
    enterDirectiveIncludeFile?: (ctx: DirectiveIncludeFileContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.directiveIncludeFile`.
     * @param ctx the parse tree
     */
    exitDirectiveIncludeFile?: (ctx: DirectiveIncludeFileContext) => void;
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
     * Enter a parse tree produced by `LPCParser.inheritSuperStatement`.
     * @param ctx the parse tree
     */
    enterInheritSuperStatement?: (ctx: InheritSuperStatementContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.inheritSuperStatement`.
     * @param ctx the parse tree
     */
    exitInheritSuperStatement?: (ctx: InheritSuperStatementContext) => void;
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
     * Enter a parse tree produced by `LPCParser.parameter`.
     * @param ctx the parse tree
     */
    enterParameter?: (ctx: ParameterContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.parameter`.
     * @param ctx the parse tree
     */
    exitParameter?: (ctx: ParameterContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.scalarDeclaration`.
     * @param ctx the parse tree
     */
    enterScalarDeclaration?: (ctx: ScalarDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.scalarDeclaration`.
     * @param ctx the parse tree
     */
    exitScalarDeclaration?: (ctx: ScalarDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.arrayContent`.
     * @param ctx the parse tree
     */
    enterArrayContent?: (ctx: ArrayContentContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.arrayContent`.
     * @param ctx the parse tree
     */
    exitArrayContent?: (ctx: ArrayContentContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.arrayDeclaration`.
     * @param ctx the parse tree
     */
    enterArrayDeclaration?: (ctx: ArrayDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.arrayDeclaration`.
     * @param ctx the parse tree
     */
    exitArrayDeclaration?: (ctx: ArrayDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.mappingKey`.
     * @param ctx the parse tree
     */
    enterMappingKey?: (ctx: MappingKeyContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.mappingKey`.
     * @param ctx the parse tree
     */
    exitMappingKey?: (ctx: MappingKeyContext) => void;
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
     * Enter a parse tree produced by `LPCParser.mappingExpression`.
     * @param ctx the parse tree
     */
    enterMappingExpression?: (ctx: MappingExpressionContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.mappingExpression`.
     * @param ctx the parse tree
     */
    exitMappingExpression?: (ctx: MappingExpressionContext) => void;
    /**
     * Enter a parse tree produced by `LPCParser.variableDeclaration`.
     * @param ctx the parse tree
     */
    enterVariableDeclaration?: (ctx: VariableDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.variableDeclaration`.
     * @param ctx the parse tree
     */
    exitVariableDeclaration?: (ctx: VariableDeclarationContext) => void;
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
     * Enter a parse tree produced by `LPCParser.compoundStatement`.
     * @param ctx the parse tree
     */
    enterCompoundStatement?: (ctx: CompoundStatementContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.compoundStatement`.
     * @param ctx the parse tree
     */
    exitCompoundStatement?: (ctx: CompoundStatementContext) => void;
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
     * Enter a parse tree produced by `LPCParser.callOtherExpression`.
     * @param ctx the parse tree
     */
    enterCallOtherExpression?: (ctx: CallOtherExpressionContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.callOtherExpression`.
     * @param ctx the parse tree
     */
    exitCallOtherExpression?: (ctx: CallOtherExpressionContext) => void;
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
     * Enter a parse tree produced by `LPCParser.expressionList`.
     * @param ctx the parse tree
     */
    enterExpressionList?: (ctx: ExpressionListContext) => void;
    /**
     * Exit a parse tree produced by `LPCParser.expressionList`.
     * @param ctx the parse tree
     */
    exitExpressionList?: (ctx: ExpressionListContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

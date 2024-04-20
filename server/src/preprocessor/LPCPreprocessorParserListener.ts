// Generated from grammar/LPCPreprocessorParser.g4 by ANTLR 4.13.1

import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { ObjectiveCDocumentContext } from "./LPCPreprocessorParser.js";
import { TextContext } from "./LPCPreprocessorParser.js";
import { CodeContext } from "./LPCPreprocessorParser.js";
import { PreprocessorImportContext } from "./LPCPreprocessorParser.js";
import { PreprocessorConditionalContext } from "./LPCPreprocessorParser.js";
import { PreprocessorDefContext } from "./LPCPreprocessorParser.js";
import { PreprocessorPragmaContext } from "./LPCPreprocessorParser.js";
import { PreprocessorDefineContext } from "./LPCPreprocessorParser.js";
import { Directive_textContext } from "./LPCPreprocessorParser.js";
import { PreprocessorParenthesisContext } from "./LPCPreprocessorParser.js";
import { PreprocessorNotContext } from "./LPCPreprocessorParser.js";
import { PreprocessorBinaryContext } from "./LPCPreprocessorParser.js";
import { PreprocessorConstantContext } from "./LPCPreprocessorParser.js";
import { PreprocessorConditionalSymbolContext } from "./LPCPreprocessorParser.js";
import { PreprocessorDefinedContext } from "./LPCPreprocessorParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `LPCPreprocessorParser`.
 */
export class LPCPreprocessorParserListener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `LPCPreprocessorParser.objectiveCDocument`.
     * @param ctx the parse tree
     */
    enterObjectiveCDocument?: (ctx: ObjectiveCDocumentContext) => void;
    /**
     * Exit a parse tree produced by `LPCPreprocessorParser.objectiveCDocument`.
     * @param ctx the parse tree
     */
    exitObjectiveCDocument?: (ctx: ObjectiveCDocumentContext) => void;
    /**
     * Enter a parse tree produced by `LPCPreprocessorParser.text`.
     * @param ctx the parse tree
     */
    enterText?: (ctx: TextContext) => void;
    /**
     * Exit a parse tree produced by `LPCPreprocessorParser.text`.
     * @param ctx the parse tree
     */
    exitText?: (ctx: TextContext) => void;
    /**
     * Enter a parse tree produced by `LPCPreprocessorParser.code`.
     * @param ctx the parse tree
     */
    enterCode?: (ctx: CodeContext) => void;
    /**
     * Exit a parse tree produced by `LPCPreprocessorParser.code`.
     * @param ctx the parse tree
     */
    exitCode?: (ctx: CodeContext) => void;
    /**
     * Enter a parse tree produced by the `preprocessorImport`
     * labeled alternative in `LPCPreprocessorParser.directive`.
     * @param ctx the parse tree
     */
    enterPreprocessorImport?: (ctx: PreprocessorImportContext) => void;
    /**
     * Exit a parse tree produced by the `preprocessorImport`
     * labeled alternative in `LPCPreprocessorParser.directive`.
     * @param ctx the parse tree
     */
    exitPreprocessorImport?: (ctx: PreprocessorImportContext) => void;
    /**
     * Enter a parse tree produced by the `preprocessorConditional`
     * labeled alternative in `LPCPreprocessorParser.directive`.
     * @param ctx the parse tree
     */
    enterPreprocessorConditional?: (ctx: PreprocessorConditionalContext) => void;
    /**
     * Exit a parse tree produced by the `preprocessorConditional`
     * labeled alternative in `LPCPreprocessorParser.directive`.
     * @param ctx the parse tree
     */
    exitPreprocessorConditional?: (ctx: PreprocessorConditionalContext) => void;
    /**
     * Enter a parse tree produced by the `preprocessorDef`
     * labeled alternative in `LPCPreprocessorParser.directive`.
     * @param ctx the parse tree
     */
    enterPreprocessorDef?: (ctx: PreprocessorDefContext) => void;
    /**
     * Exit a parse tree produced by the `preprocessorDef`
     * labeled alternative in `LPCPreprocessorParser.directive`.
     * @param ctx the parse tree
     */
    exitPreprocessorDef?: (ctx: PreprocessorDefContext) => void;
    /**
     * Enter a parse tree produced by the `preprocessorPragma`
     * labeled alternative in `LPCPreprocessorParser.directive`.
     * @param ctx the parse tree
     */
    enterPreprocessorPragma?: (ctx: PreprocessorPragmaContext) => void;
    /**
     * Exit a parse tree produced by the `preprocessorPragma`
     * labeled alternative in `LPCPreprocessorParser.directive`.
     * @param ctx the parse tree
     */
    exitPreprocessorPragma?: (ctx: PreprocessorPragmaContext) => void;
    /**
     * Enter a parse tree produced by the `preprocessorDefine`
     * labeled alternative in `LPCPreprocessorParser.directive`.
     * @param ctx the parse tree
     */
    enterPreprocessorDefine?: (ctx: PreprocessorDefineContext) => void;
    /**
     * Exit a parse tree produced by the `preprocessorDefine`
     * labeled alternative in `LPCPreprocessorParser.directive`.
     * @param ctx the parse tree
     */
    exitPreprocessorDefine?: (ctx: PreprocessorDefineContext) => void;
    /**
     * Enter a parse tree produced by `LPCPreprocessorParser.directive_text`.
     * @param ctx the parse tree
     */
    enterDirective_text?: (ctx: Directive_textContext) => void;
    /**
     * Exit a parse tree produced by `LPCPreprocessorParser.directive_text`.
     * @param ctx the parse tree
     */
    exitDirective_text?: (ctx: Directive_textContext) => void;
    /**
     * Enter a parse tree produced by the `preprocessorParenthesis`
     * labeled alternative in `LPCPreprocessorParser.preprocessor_expression`.
     * @param ctx the parse tree
     */
    enterPreprocessorParenthesis?: (ctx: PreprocessorParenthesisContext) => void;
    /**
     * Exit a parse tree produced by the `preprocessorParenthesis`
     * labeled alternative in `LPCPreprocessorParser.preprocessor_expression`.
     * @param ctx the parse tree
     */
    exitPreprocessorParenthesis?: (ctx: PreprocessorParenthesisContext) => void;
    /**
     * Enter a parse tree produced by the `preprocessorNot`
     * labeled alternative in `LPCPreprocessorParser.preprocessor_expression`.
     * @param ctx the parse tree
     */
    enterPreprocessorNot?: (ctx: PreprocessorNotContext) => void;
    /**
     * Exit a parse tree produced by the `preprocessorNot`
     * labeled alternative in `LPCPreprocessorParser.preprocessor_expression`.
     * @param ctx the parse tree
     */
    exitPreprocessorNot?: (ctx: PreprocessorNotContext) => void;
    /**
     * Enter a parse tree produced by the `preprocessorBinary`
     * labeled alternative in `LPCPreprocessorParser.preprocessor_expression`.
     * @param ctx the parse tree
     */
    enterPreprocessorBinary?: (ctx: PreprocessorBinaryContext) => void;
    /**
     * Exit a parse tree produced by the `preprocessorBinary`
     * labeled alternative in `LPCPreprocessorParser.preprocessor_expression`.
     * @param ctx the parse tree
     */
    exitPreprocessorBinary?: (ctx: PreprocessorBinaryContext) => void;
    /**
     * Enter a parse tree produced by the `preprocessorConstant`
     * labeled alternative in `LPCPreprocessorParser.preprocessor_expression`.
     * @param ctx the parse tree
     */
    enterPreprocessorConstant?: (ctx: PreprocessorConstantContext) => void;
    /**
     * Exit a parse tree produced by the `preprocessorConstant`
     * labeled alternative in `LPCPreprocessorParser.preprocessor_expression`.
     * @param ctx the parse tree
     */
    exitPreprocessorConstant?: (ctx: PreprocessorConstantContext) => void;
    /**
     * Enter a parse tree produced by the `preprocessorConditionalSymbol`
     * labeled alternative in `LPCPreprocessorParser.preprocessor_expression`.
     * @param ctx the parse tree
     */
    enterPreprocessorConditionalSymbol?: (ctx: PreprocessorConditionalSymbolContext) => void;
    /**
     * Exit a parse tree produced by the `preprocessorConditionalSymbol`
     * labeled alternative in `LPCPreprocessorParser.preprocessor_expression`.
     * @param ctx the parse tree
     */
    exitPreprocessorConditionalSymbol?: (ctx: PreprocessorConditionalSymbolContext) => void;
    /**
     * Enter a parse tree produced by the `preprocessorDefined`
     * labeled alternative in `LPCPreprocessorParser.preprocessor_expression`.
     * @param ctx the parse tree
     */
    enterPreprocessorDefined?: (ctx: PreprocessorDefinedContext) => void;
    /**
     * Exit a parse tree produced by the `preprocessorDefined`
     * labeled alternative in `LPCPreprocessorParser.preprocessor_expression`.
     * @param ctx the parse tree
     */
    exitPreprocessorDefined?: (ctx: PreprocessorDefinedContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}


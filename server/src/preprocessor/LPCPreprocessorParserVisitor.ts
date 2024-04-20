// Generated from grammar/LPCPreprocessorParser.g4 by ANTLR 4.13.1

import { AbstractParseTreeVisitor } from "antlr4ng";


import { LpcDocumentContext } from "./LPCPreprocessorParser.js";
import { CodeTextContext } from "./LPCPreprocessorParser.js";
import { PreprocessorDirectiveContext } from "./LPCPreprocessorParser.js";
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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `LPCPreprocessorParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class LPCPreprocessorParserVisitor<Result> extends AbstractParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by `LPCPreprocessorParser.lpcDocument`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLpcDocument?: (ctx: LpcDocumentContext) => Result;
    /**
     * Visit a parse tree produced by the `codeText`
     * labeled alternative in `LPCPreprocessorParser.text`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCodeText?: (ctx: CodeTextContext) => Result;
    /**
     * Visit a parse tree produced by the `preprocessorDirective`
     * labeled alternative in `LPCPreprocessorParser.text`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPreprocessorDirective?: (ctx: PreprocessorDirectiveContext) => Result;
    /**
     * Visit a parse tree produced by `LPCPreprocessorParser.code`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCode?: (ctx: CodeContext) => Result;
    /**
     * Visit a parse tree produced by the `preprocessorImport`
     * labeled alternative in `LPCPreprocessorParser.directive`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPreprocessorImport?: (ctx: PreprocessorImportContext) => Result;
    /**
     * Visit a parse tree produced by the `preprocessorConditional`
     * labeled alternative in `LPCPreprocessorParser.directive`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPreprocessorConditional?: (ctx: PreprocessorConditionalContext) => Result;
    /**
     * Visit a parse tree produced by the `preprocessorDef`
     * labeled alternative in `LPCPreprocessorParser.directive`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPreprocessorDef?: (ctx: PreprocessorDefContext) => Result;
    /**
     * Visit a parse tree produced by the `preprocessorPragma`
     * labeled alternative in `LPCPreprocessorParser.directive`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPreprocessorPragma?: (ctx: PreprocessorPragmaContext) => Result;
    /**
     * Visit a parse tree produced by the `preprocessorDefine`
     * labeled alternative in `LPCPreprocessorParser.directive`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPreprocessorDefine?: (ctx: PreprocessorDefineContext) => Result;
    /**
     * Visit a parse tree produced by `LPCPreprocessorParser.directive_text`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDirective_text?: (ctx: Directive_textContext) => Result;
    /**
     * Visit a parse tree produced by the `preprocessorParenthesis`
     * labeled alternative in `LPCPreprocessorParser.preprocessor_expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPreprocessorParenthesis?: (ctx: PreprocessorParenthesisContext) => Result;
    /**
     * Visit a parse tree produced by the `preprocessorNot`
     * labeled alternative in `LPCPreprocessorParser.preprocessor_expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPreprocessorNot?: (ctx: PreprocessorNotContext) => Result;
    /**
     * Visit a parse tree produced by the `preprocessorBinary`
     * labeled alternative in `LPCPreprocessorParser.preprocessor_expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPreprocessorBinary?: (ctx: PreprocessorBinaryContext) => Result;
    /**
     * Visit a parse tree produced by the `preprocessorConstant`
     * labeled alternative in `LPCPreprocessorParser.preprocessor_expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPreprocessorConstant?: (ctx: PreprocessorConstantContext) => Result;
    /**
     * Visit a parse tree produced by the `preprocessorConditionalSymbol`
     * labeled alternative in `LPCPreprocessorParser.preprocessor_expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPreprocessorConditionalSymbol?: (ctx: PreprocessorConditionalSymbolContext) => Result;
    /**
     * Visit a parse tree produced by the `preprocessorDefined`
     * labeled alternative in `LPCPreprocessorParser.preprocessor_expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPreprocessorDefined?: (ctx: PreprocessorDefinedContext) => Result;
}


import { ParserRuleContext, TokenStreamRewriter } from "antlr4ng";
import {
    CodeTextContext,
    PreprocessorConditionalContext,
    PreprocessorConditionalDefContext,
    PreprocessorConditionalElseContext,
    PreprocessorConditionalEndContext,
    PreprocessorDefineContext,
    PreprocessorDirectiveContext,
    PreprocessorUndefContext,
} from "../preprocessor/LPCPreprocessorParser";
import { LPCPreprocessorParserListener } from "../preprocessor/LPCPreprocessorParserListener";

import { MacroDefinition, IPosition } from "../types";
import {
    DocumentHighlight,
    DocumentHighlightKind,
    SemanticTokenModifiers,
    SemanticTokenTypes,
    SemanticTokens,
    SemanticTokensBuilder,
} from "vscode-languageserver";
import { getSelectionRange, lexRangeToLspRange } from "../utils";

const REG_DEFINE_WITHARGS = /(.*)\((.+)\)/g;

export class PreprocessorListener extends LPCPreprocessorParserListener {
    inConditional = false;
    isExecutable = true;

    constructor(
        public macroTable: Map<string, MacroDefinition>,
        private filename: string,
        private rewriter: TokenStreamRewriter,
        private tokenBuilder: SemanticTokensBuilder
    ) {
        super();
    }

    enterCodeText = (ctx: CodeTextContext) => {
        if (!this.isExecutable) {
            // replace the text with empty spaces
            const { start, stop } = ctx;

            const str = ctx.getText();

            // the preprocessor sees continugious code lines as a single token, so split those and build semantic tokesn individually
            const lines = str.split("\n");
            for (let i = 0; i < lines.length; i++) {
                this.tokenBuilder.push(
                    ctx.start.line - 1 + i,
                    0,
                    lines[i].length,
                    0,
                    0
                );
            }

            // regex to replace all characters with a space except newlines
            const newStr = str.replace(/./g, (c) => (c == "\n" ? c : " "));
            this.rewriter.replace(start, stop, newStr);
        }
    };

    enterPreprocessorDirective = (ctx: PreprocessorDirectiveContext) => {};

    enterPreprocessorConditional = (ctx: PreprocessorConditionalContext) => {
        const exp = ctx.preprocessor_expression();

        const i = 0;
    };

    enterPreprocessorConditionalElse = (
        ctx: PreprocessorConditionalElseContext
    ) => {
        if (this.inConditional) {
            this.isExecutable = !this.isExecutable;
        } else {
            // this is an error - log it
            console.error(
                "found an #ELSE outside of conditional directive block"
            );
        }
    };

    /**
     * generate semantic tokens for the context so that the IDE
     * will mark it as commented out.
     * @param ctx
     */
    private markContextAsUnexecutable(ctx: ParserRuleContext) {}

    private markContext(ctx: ParserRuleContext, tokenType: number) {
        const { start, stop } = ctx;

        if (start.line == stop.line) {
            // add to the token builder
            this.tokenBuilder.push(start.line - 1, start.column, 999, 0, 0);
        } else {
            // add the first line
            this.tokenBuilder.push(
                start.line - 1,
                start.column,
                start.stop - start.start + 1,
                0,
                0
            );

            // add intermediate lines
            for (let i = start.line + 1; i < stop.line; i++) {
                this.tokenBuilder.push(i - 1, 0, 999, 0, 0);
            }

            // add the last line
            this.tokenBuilder.push(stop.line - 1, 0, stop.column, 0, 0);
        }
    }

    enterPreprocessorConditionalEnd = (
        ctx: PreprocessorConditionalEndContext
    ) => {
        this.inConditional = false;
        this.isExecutable = true;
    };

    enterPreprocessorConditionalDef = (
        ctx: PreprocessorConditionalDefContext
    ) => {
        const sym = ctx.CONDITIONAL_SYMBOL();
        const shouldExist = !!ctx.IFDEF() ? true : false;
        const symName = sym?.getText();

        this.inConditional = true;
        this.isExecutable = this.macroTable.has(symName) === shouldExist;
        const i = 0;
    };

    enterPreprocessorDefine = (ctx: PreprocessorDefineContext) => {
        if (!this.isExecutable) {
            // use parent context so that it includes the hash
            this.markContextAsUnexecutable(ctx.parent);
            return;
        }

        this.markContext(ctx.parent, 1); //ntbla make 1 a constant

        const nameCtx = ctx.CONDITIONAL_SYMBOL();
        const name = nameCtx?.getText();
        const value = ctx.directive_text()?.getText().trim();

        REG_DEFINE_WITHARGS.lastIndex = 0;
        const nameMatch = REG_DEFINE_WITHARGS.exec(name);
        if (!!nameMatch && !!nameMatch[2]) {
            // function type macro
            const nameOnly = nameMatch[1]; // just the name
            const argStr = nameMatch[2]; // the arguments portion
            const argArr = argStr.split(",").map((a) => a.trim());

            const def: MacroDefinition = {
                value,
                filename: this.filename,
                start: { row: ctx.start.line, column: ctx.start.column },
                end: { row: ctx.stop.line, column: ctx.stop.column },
                regex: new RegExp(`\\b${nameOnly}\\(`, "g"),
                annotation: `[[@${nameOnly}]]`,
                args: argArr,
                markedValue: identifyArgInstances(value, argArr),
            };

            this.macroTable.set(nameOnly, def);
        } else if (!!name) {
            // regular macro
            const def: MacroDefinition = {
                value,
                filename: this.filename,
                start: { row: ctx.start.line, column: ctx.start.column },
                end: { row: ctx.stop.line, column: ctx.stop.column },
                regex: new RegExp(`\\b${name}\\b`, "g"),
                annotation: `[[@${name}]]`,
            };

            this.macroTable.set(name, def);
        }

        const start = ctx.parent.start;
        const stop = ctx.stop;
        const lines = stop.line - start.line;
        this.rewriter.replace(start, stop, "\n".repeat(lines));
    };

    enterPreprocessorUndef = (ctx: PreprocessorUndefContext) => {
        const name = ctx.CONDITIONAL_SYMBOL()?.getText();
        this.macroTable.delete(name);

        const start = ctx.parent.start;
        const stop = ctx.stop;
        const lines = stop.line - start.line;
        this.rewriter.replace(start, stop, "\n".repeat(lines));
    };
}

/**
 * Identify instances and their positions of the macro args
 * @param macroValue the macro value
 * @param args array of arg names
 */
function identifyArgInstances(macroValue: string, args: string[]) {
    let i = 0;
    let inQuote = false;
    let isEscape = false;
    while (i < macroValue.length) {
        if (inQuote && macroValue[i] == '"' && !isEscape) {
            inQuote = false;
        } else if (isEscape) {
            isEscape = false;
        } else if (macroValue[i] == '"') {
            inQuote = true;
        } else if (macroValue[i] == "\\") {
            isEscape = true;
        } else {
            const remainderString = macroValue.substring(i);
            const strBack1 = macroValue.substring(i - 1);

            // check each arg
            for (let j = 0; j < args.length; j++) {
                const arg = args[j];
                if (
                    remainderString.startsWith(arg) &&
                    strBack1.match(`\\b${arg}\\b`)?.index == 1
                ) {
                    // substitute the mark for the variable name
                    const mark = `[[@${arg}]]`;
                    const markLen = mark.length;
                    macroValue =
                        macroValue.substring(0, i) +
                        mark +
                        macroValue.substring(i + arg.length);

                    // advance i past the mark
                    i += markLen;

                    break;
                }
            }
        }

        i++;
    }

    return macroValue;
}

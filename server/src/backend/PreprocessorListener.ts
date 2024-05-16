import { ParserRuleContext, Token, TokenStreamRewriter } from "antlr4ng";
import {
    CodeTextContext,
    PreprocessorConditionalContext,
    PreprocessorConditionalDefContext,
    PreprocessorConditionalElseContext,
    PreprocessorConditionalEndContext,
    PreprocessorDefineContext,
    PreprocessorDirectiveContext,
    PreprocessorImportContext,
    PreprocessorUndefContext,
} from "../preprocessor/LPCPreprocessorParser";
import { LPCPreprocessorParserListener } from "../preprocessor/LPCPreprocessorParserListener";
import { MacroDefinition, SemanticTokenTypes } from "../types";
import { SemanticTokenCollection } from "./SemanticTokenCollection";

const REG_DEFINE_WITHARGS = /(.*)\((.+)\)/g;

/**
 * Handles preprocessor directives.
 *
 * - This listener will handle conditional directives
 *   and _comment_ out any code text that is not within an active conditional block.
 * - Macro directives will be parsed and added to the macro table.
 * - Import directives are parsed and the import file added to a list (to be handled by SourceContext)
 */
export class PreprocessorListener extends LPCPreprocessorParserListener {
    inConditional = false;
    isExecutable = true;

    constructor(
        public macroTable: Map<string, MacroDefinition>,
        private filename: string,
        private rewriter: TokenStreamRewriter,
        private tokenBuilder: SemanticTokenCollection,
        private includeFiles: string[]
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
                this.tokenBuilder.add(
                    ctx.start.line + i,
                    0,
                    lines[i].length,
                    SemanticTokenTypes.Comment,
                    []
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
        const expStr = exp.getText().trim();

        this.inConditional = true;
        if (expStr.trim() == "0") {
            this.isExecutable = false;
        } else {
            this.isExecutable = true;
        }
        // ntbla: handle defined()
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
    private markContextAsUnexecutable(ctx: ParserRuleContext) {
        this.markContext(ctx, SemanticTokenTypes.Comment);
    }

    private markContext(ctx: ParserRuleContext, tokenType: number) {
        const { start, stop } = ctx;

        if (start.line == stop.line) {
            // add to the token builder
            this.tokenBuilder.add(start.line, start.column, 999, tokenType, []);
        } else {
            // add the first line
            this.tokenBuilder.add(
                start.line,
                start.column,
                start.stop - start.start + 1,
                tokenType
            );

            // add intermediate lines
            for (let i = start.line + 1; i < stop.line; i++) {
                this.tokenBuilder.add(i, 0, 999, tokenType);
            }

            // add the last line
            this.tokenBuilder.add(stop.line, 0, stop.column, tokenType);
        }
    }

    private markToken(token: Token, tokenType: number) {
        this.tokenBuilder.add(
            token.line,
            token.column,
            token.stop - token.start + 1,
            tokenType
        );
    }

    enterPreprocessorConditionalEnd = (
        ctx: PreprocessorConditionalEndContext
    ) => {
        this.inConditional = false;
        this.isExecutable = true;

        // replace with spaces
        const { start, stop } = ctx.parent;
        const str = ctx.parent.getText();
        const newStr = str.replace(/./g, (c) => (c == "\n" ? c : " "));
        this.rewriter.replace(start, stop, newStr);
    };

    enterPreprocessorConditionalDef = (
        ctx: PreprocessorConditionalDefContext
    ) => {
        const sym = ctx.CONDITIONAL_SYMBOL();
        const shouldExist = !!ctx.IFDEF() ? true : false;
        const symName = sym?.getText();

        this.inConditional = true;
        this.isExecutable = this.macroTable.has(symName) === shouldExist;

        // replace with spaces
        const { start, stop } = ctx.parent;
        const str = ctx.parent.getText();
        const newStr = str.replace(/./g, (c) => (c == "\n" ? c : " "));
        this.rewriter.replace(start, stop, newStr);
    };

    enterPreprocessorImport = (ctx: PreprocessorImportContext) => {
        const includeFile = ctx.directive_text().getText();
        this.includeFiles.push(includeFile);
    };

    enterPreprocessorDefine = (ctx: PreprocessorDefineContext) => {
        if (!this.isExecutable) {
            // use parent context so that it includes the hash
            this.markContextAsUnexecutable(ctx.parent);
            return;
        }

        const nameCtx = ctx.CONDITIONAL_SYMBOL();
        const name = nameCtx?.getText();
        const value = ctx.directive_text()?.getText().trim();

        this.markContext(ctx.parent, SemanticTokenTypes.Macro);

        REG_DEFINE_WITHARGS.lastIndex = 0;
        const nameMatch = REG_DEFINE_WITHARGS.exec(name);
        if (!!nameMatch && !!nameMatch[2]) {
            // function type macro
            const nameOnly = nameMatch[1]; // just the name
            const argStr = nameMatch[2]; // the arguments portion
            const argArr = argStr.split(",").map((a) => a.trim());

            const def: MacroDefinition = {
                name: nameOnly,
                value,
                filename: this.filename,
                start: { row: ctx.start.line, column: ctx.start.column },
                end: { row: ctx.stop.line, column: ctx.stop.column },
                annotation: `[[@${nameOnly}]]`,
                args: argArr,
                markedValue: identifyArgInstances(value, argArr),
            };

            this.macroTable.set(nameOnly, def);
        } else if (!!name) {
            // regular macro
            const def: MacroDefinition = {
                name,
                value,
                filename: this.filename,
                start: { row: ctx.start.line, column: ctx.start.column },
                end: { row: ctx.stop.line, column: ctx.stop.column },
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
        const start = ctx.parent.start;
        const stop = ctx.stop;
        const lines = stop.line - start.line;

        if (!this.isExecutable) {
            // the preprocessor sees continugious code lines as a single token, so split those and build semantic tokesn individually
            for (let i = 0; i <= lines; i++) {
                this.tokenBuilder.add(
                    ctx.start.line + i,
                    0,
                    999,
                    SemanticTokenTypes.Comment,
                    []
                );
            }
        } else {
            const name = ctx.CONDITIONAL_SYMBOL()?.getText();
            this.macroTable.delete(name);
        }

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

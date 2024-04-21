import { TokenStreamRewriter } from "antlr4ng";
import {
    PreprocessorDefineContext,
    PreprocessorDirectiveContext,
} from "../preprocessor/LPCPreprocessorParser";
import { LPCPreprocessorParserListener } from "../preprocessor/LPCPreprocessorParserListener";
import { MacroDefinition } from "../types";

const REG_DEFINE_WITHARGS = /(.*)\((.+)\)/g;

export class PreprocessorListener extends LPCPreprocessorParserListener {
    constructor(
        public macroTable: Map<string, MacroDefinition>,
        private filename: string,
        private rewriter: TokenStreamRewriter
    ) {
        super();
    }

    enterPreprocessorDirective = (ctx: PreprocessorDirectiveContext) => {};

    enterPreprocessorDefine = (ctx: PreprocessorDefineContext) => {
        const name = ctx.CONDITIONAL_SYMBOL()?.getText();
        const value = ctx.directive_text()?.getText();

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
            };

            this.macroTable.set(nameOnly, def);
        } else if (!!name) {
            // regular macro
            const def: MacroDefinition = {
                value,
                filename: this.filename,
                start: { row: ctx.start.line, column: ctx.start.column },
                end: { row: ctx.stop.line, column: ctx.stop.column },
                regex: new RegExp(`\\b${name}(?!]]|.*")\\b`, "g"),
                annotation: `[[@${name}]]`,
            };

            this.macroTable.set(name, def);
        }

        const start = ctx.parent.start;
        const stop = ctx.stop;
        const lines = stop.line - start.line;
        this.rewriter.replace(start, stop, "\n".repeat(lines));
    };
}

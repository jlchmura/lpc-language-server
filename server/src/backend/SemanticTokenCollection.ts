import { SemanticTokens, SemanticTokensBuilder } from "vscode-languageserver";
import { SourceMap } from "./SourceMap";
import { ILexicalRange } from "../types";

type tokenData = {
    line: number;
    column: number;
    length: number;
    tokenType: number;
    tokenModifiers: number[];
};

export class SemanticTokenCollection {
    private tokens: tokenData[] = [];
    private ignoredRanges: ILexicalRange[] = [];

    constructor() {}

    /**
     * Add a token. Line and column are 1-based
     * @param line 1-based line number of the token's starting position
     * @param column 1-based column number of the token's starting position
     * @param length length of the token
     * @param tokenType type of the token
     * @param tokenModifiers optional array of token modifiers
     */
    public add(
        line: number,
        column: number,
        length: number,
        tokenType: number,
        tokenModifiers: number[] = []
    ) {
        this.tokens.push({ line, column, length, tokenType, tokenModifiers });
    }

    /**
     * marks a range of the document as ignored, so that semantic tokens won't be added.
     * this is needed for macros, where the substituted value has code that will later be parsed as symbols
     */
    public ignoreRange(range: ILexicalRange) {
        this.ignoredRanges.push(range);
    }

    /**
     * test if a token (based on start position)
     * @param line
     * @param column
     * @returns
     */
    private isIgnored(token: tokenData): boolean {
        /** assumes ignoredRanges has been sorted */
        const { line, column } = token;

        // NTBLA: change this to use binary search

        for (const range of this.ignoredRanges) {
            // test if line/column is within the range
            if (
                range.start.row <= line &&
                range.end.row >= line &&
                (range.start.row !== line || range.start.column <= column) &&
                (range.end.row !== line || range.end.column >= column)
            ) {
                return true;
            } else if (range.end.row < line) {
                break;
            }
        }

        return false;
    }

    /**
     * Build the semantic token result sent to the client extension
     * @param sourceMap sourcemap to use in translating token positions
     * @returns SemanticTokens result
     */
    public build(sourceMap: SourceMap): SemanticTokens {
        const builder = new SemanticTokensBuilder();

        // sort ranges
        this.ignoredRanges.sort((a, b) => {
            if (a.start.row === b.start.row) {
                return a.start.column - b.start.column;
            }
            return a.start.row - b.start.row;
        });

        // sort tokens because vscode's api is dumb and doesn't do it for us
        const mapped = this.tokens
            .filter((token) => !this.isIgnored(token))
            .map((token) => {
                let modifiers = 0;
                for (const modifier of token.tokenModifiers) {
                    // this is rediculous... WHY VSCODE?!
                    modifiers |= (1 << modifier) >>> 0;
                }

                const sourceMapping = sourceMap.getSourceLocation(
                    token.line - 1,
                    token.column + 1
                );

                return [
                    sourceMapping?.row ?? token.line - 1,
                    !!sourceMapping ? sourceMapping?.column - 1 : token.column,
                    token.length,
                    token.tokenType,
                    modifiers,
                ];
            });

        // sort after we've translated to source locations
        mapped.sort((a, b) => {
            if (a[0] === b[0]) {
                return a[1] - b[1];
            }
            return a[0] - b[0];
        });

        for (const token of mapped) {
            builder.push(token[0], token[1], token[2], token[3], token[4]);
        }

        return builder.build();
    }
}

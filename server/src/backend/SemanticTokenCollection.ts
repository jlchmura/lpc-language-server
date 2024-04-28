import { SemanticTokens, SemanticTokensBuilder } from "vscode-languageserver";
import { SourceMap } from "./SourceMap";

type tokenData = {
    line: number;
    column: number;
    length: number;
    tokenType: number;
    tokenModifiers: number[];
};

export class SemanticTokenCollection {
    private tokens: tokenData[] = [];

    constructor() {}

    public add(
        line: number,
        column: number,
        length: number,
        tokenType: number,
        tokenModifiers: number[] = []
    ) {
        this.tokens.push({ line, column, length, tokenType, tokenModifiers });
    }

    public build(sourceMap: SourceMap): SemanticTokens {
        const builder = new SemanticTokensBuilder();
        // sort tokens because vscode's api is dumb and doesn't do it for us

        const mapped = this.tokens.map((token) => {
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

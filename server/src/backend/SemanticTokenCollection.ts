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
        this.tokens.sort((a, b) => {
            if (a.line === b.line) {
                return a.column - b.column;
            } else {
                return a.line - b.line;
            }
        });
        this.tokens.forEach((token) => {
            let modifiers = 0;
            for (const modifier of token.tokenModifiers) {
                // this is rediculous... WHY VSCODE?!
                modifiers |= (1 << modifier) >>> 0;
            }

            const sourceMapping = sourceMap.getSourceLocation(
                token.line - 1,
                token.column + 1
            );

            builder.push(
                sourceMapping?.row ?? token.line - 1,
                sourceMapping?.column - 1 ?? token.column,
                token.length,
                token.tokenType,
                modifiers
            );
        });

        return builder.build();
    }
}

import { SemanticTokens, SemanticTokensBuilder } from "vscode-languageserver";

type tokenData = {
    line: number;
    column: number;
    length: number;
    tokenType: number;
    tokenModifiers: number[];
};

export class SemanticTokenCollection {
    private tokens: tokenData[] = [];

    public add(
        line: number,
        column: number,
        length: number,
        tokenType: number,
        tokenModifiers: number[] = []
    ) {
        this.tokens.push({ line, column, length, tokenType, tokenModifiers });
    }

    public build(): SemanticTokens {
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
            builder.push(
                token.line - 1,
                token.column,
                token.length,
                token.tokenType,
                modifiers
            );
        });

        return builder.build();
    }
}

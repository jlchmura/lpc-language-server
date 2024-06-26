import {
    CharStream,
    Interval,
    Token,
    TokenFactory,
    TokenSource,
} from "antlr4ng";
import { LPCToken } from "./LPCToken";

export class LPCTokenFactor implements TokenFactory<LPCToken> {
    public filenameStack: string[] = [];

    constructor(protected filename: string) {
        this.filenameStack.push(filename);
    }

    create(
        source: [TokenSource, CharStream],
        type: number,
        text: string,
        channel: number,
        start: number,
        stop: number,
        line: number,
        column: number
    ): LPCToken {
        const t: LPCToken = new LPCToken({
            source: source,
            type: type,
            channel: channel,
            start: start,
            stop: stop,
            line: line,
            column: column,
        });
        t.line = line;
        t.column = column;
        const input = source[1];
        t.text = input.getTextFromInterval(Interval.of(start, stop));
        t.filename = this.filenameStack[this.filenameStack.length - 1];

        return t;
    }

    cloneToken(t: LPCToken): LPCToken {
        const newToken = new LPCToken({ ...t });

        newToken.line = t.line;
        newToken.text = t.text;
        newToken.filename = t.filename;
        newToken.relatedToken = t.relatedToken;

        return newToken;
    }
}

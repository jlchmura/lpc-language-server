import {
    CharStream,
    Interval,
    Token,
    TokenFactory,
    TokenSource,
} from "antlr4ng";
import { LPCToken } from "./LPCToken";

export class LPCTokenFactor implements TokenFactory<LPCToken> {
    constructor(protected filename: string) {}

    create(
        source: [TokenSource, CharStream],
        type: number,
        text: string,
        channel: number,
        start: number,
        stop: number,
        line: number,
        charPositionInLine: number
    ): LPCToken {
        const t: LPCToken = new LPCToken({
            source: source,
            type: type,
            channel: channel,
            start: start,
            stop: stop,
        });
        t.line = line;
        const input = source[1];
        t.text = input.getTextFromInterval(Interval.of(start, stop));
        t.filename = this.filename;

        return t;
    }
}

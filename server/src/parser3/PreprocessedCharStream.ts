import { CharStreamImpl, IntStream, Interval, Token } from "antlr4ng";
import { UnbufferedTokenStream } from "antlr4ng/dist/UnbufferedTokenStream";
import { ReadStream } from "fs";
import { Readable } from "stream";
import { UnbufferedCharStream } from "./UnbufferedCharStream";
import { ReadableString } from "./ReadableString";
import { LPCToken } from "./LPCToken";

export class PreprocessedCharStream extends UnbufferedCharStream {
    protected tokens: Token[];
    protected tokenCharIntervals: Interval[];

    /** Token index that we are processing */
    protected tp: number;
    /** Char index with token text that corresponds to LA(1) */
    protected c: number = -1;

    /** text of the current token */
    protected text: string;

    constructor(tokens: Token[]) {
        super(1);
        this.tokens = tokens;
        this.text = tokens[0].text;
        // const stream = new ReadableString(code);
        // super(stream, 256);
    }

    protected override nextChar(): number {
        if (this.tp >= this.tokens.length) {
            return IntStream.EOF;
        }
        this.c++;
        if (this.c == this.text.length) {
            this.tp++;
            if (this.tp == this.tokens.length) return IntStream.EOF;
            this.c = 0;
            const tt = this.tokens[this.tp];
            const t = tt as LPCToken; // cast to our token type here
            this.text = t.text;
            this.name = t.filename;
        }

        return this.text.charCodeAt(this.c);
    }

    protected intervalFor(intervals: Interval[], ci: number): number {
        let ti = 0;
        for (const iv of intervals) {
            if (iv.start <= ci && ci <= iv.stop) {
                return ti;
            }
            ti++;
        }

        return -1;
    }

    public getTokenIndexFromCharIndex(ci: number): number {
        return this.intervalFor(this.tokenCharIntervals, ci);
    }

    public getFilenameForCharIndex(ci: number): string {
        const ti = this.getTokenIndexFromCharIndex(ci);
        if (ti != -1) {
            const tt = this.tokens[ti];
            const t = tt as LPCToken; // cast to our token type here
            return t.filename;
        }
        return null;
    }

    protected computeTokenForCharRanges(tokens: Token[]): void {
        this.tokenCharIntervals = [];
        let absCharIndex = 0;
        for (const t of tokens) {
            const n = t.text.length;
            this.tokenCharIntervals.push(
                Interval.of(absCharIndex, absCharIndex + n - 1)
            );
            absCharIndex += n;
        }
    }

    protected computeTokenLineRanges(tokens: Token[]): void {
        let absCharIndex = 0;
        for (const tt of tokens) {
            const t = tt as LPCToken; // cast to our token type here
            t.lineIntervals = [];
            const text = t.text;
            const n = text.length;
            let intervalStart = 0;
            for (let c = 0; c < n; c++) {
                if (text[c] == "\n") {
                    t.lineIntervals.push(
                        Interval.of(
                            absCharIndex + intervalStart,
                            absCharIndex + c
                        )
                    );
                    intervalStart = c + 1;
                }
            }
            if (t.lineIntervals.length == 0) {
                t.lineIntervals.push(Interval.of(0, n - 1));
            }
            absCharIndex += n;
        }
    }
}

import { CharStreamImpl } from "antlr4ng";
import { UnbufferedTokenStream } from "antlr4ng/dist/UnbufferedTokenStream";
import { ReadStream } from "fs";
import { Readable } from "stream";

class IntStreamConstants {
    static EOF: number = -1;
}

interface ICharStream {
    // Define the methods and properties that ICharStream should have
}

export class UnbufferedCharStream implements ICharStream {
    protected n: number;
    protected data: number[];
    protected input: Readable;
    protected p: number = 1;
    protected lastChar: number;
    protected currentCharIndex: number;
    protected numMarkers: number;
    protected lastCharBufferStart: number;
    public name: string;

    constructor(bufferSize: number);
    constructor(input: Readable, bufferSize: number);
    constructor(inputOrBufferSize: Readable | number, bufferSize?: number) {
        if (typeof inputOrBufferSize === "number") {
            this.n = 0;
            this.data = new Array(inputOrBufferSize);
        } else {
            this.n = 0;
            this.data = new Array(bufferSize);
            this.input = inputOrBufferSize as Readable;
            this.fill(1);
        }
    }

    public consume(): void {
        if (this.LA(1) === IntStreamConstants.EOF) {
            throw new Error("cannot consume EOF");
        }
        this.lastChar = this.data[this.p];
        if (this.p === this.n - 1 && this.numMarkers === 0) {
            this.n = 0;
            this.p = -1;
            this.lastCharBufferStart = this.lastChar;
        }
        this.p++;
        this.currentCharIndex++;
        this.sync(1);
    }

    protected sync(want: number): void {
        const need = this.p + want - 1 - this.n + 1;
        if (need > 0) {
            this.fill(need);
        }
    }

    protected fill(n: number): number {
        for (let i = 0; i < n; i++) {
            if (
                this.n > 0 &&
                this.data[this.n - 1] === IntStreamConstants.EOF
            ) {
                return i;
            }
            const c = this.nextChar();
            if (c > 0xffff || c === IntStreamConstants.EOF) {
                this.add(c);
            } else {
                const ch = String.fromCharCode(c);
                if (ch.charCodeAt(0) >= 0xdc00 && ch.charCodeAt(0) <= 0xdfff) {
                    throw new Error(
                        "Invalid UTF-16 (low surrogate with no preceding high surrogate)"
                    );
                } else if (
                    ch.charCodeAt(0) >= 0xd800 &&
                    ch.charCodeAt(0) <= 0xdbff
                ) {
                    const lowSurrogate = this.nextChar();
                    if (lowSurrogate > 0xffff) {
                        throw new Error(
                            "Invalid UTF-16 (high surrogate followed by code point > U+FFFF"
                        );
                    } else if (lowSurrogate === IntStreamConstants.EOF) {
                        throw new Error(
                            "Invalid UTF-16 (low surrogate with no preceding high surrogate)"
                        );
                    } else {
                        const lowSurrogateChar =
                            String.fromCharCode(lowSurrogate);
                        if (
                            lowSurrogateChar.charCodeAt(0) >= 0xdc00 &&
                            lowSurrogateChar.charCodeAt(0) <= 0xdfff
                        ) {
                            this.add(
                                ch.charCodeAt(0) * 0x400 +
                                    lowSurrogateChar.charCodeAt(0) -
                                    0x360dc00
                            );
                        } else {
                            throw new Error(
                                "Invalid UTF-16 (low surrogate with no preceding high surrogate)"
                            );
                        }
                    }
                } else {
                    this.add(c);
                }
            }
        }
        return n;
    }

    protected nextChar(): number {
        return this.input.read(1)[0];
    }

    protected add(c: number): void {
        if (this.n >= this.data.length) {
            this.data = this.data.concat(new Array(this.data.length));
        }
        this.data[this.n++] = c;
    }

    public LA(i: number): number {
        if (i === -1) {
            return this.lastChar;
        }
        this.sync(i);
        const index = this.p + i - 1;
        if (index < 0) {
            throw new Error();
        }
        if (index >= this.n) {
            return IntStreamConstants.EOF;
        }
        return this.data[index];
    }
}

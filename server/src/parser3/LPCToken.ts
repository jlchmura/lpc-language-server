import {
    ATNSimulator,
    CharStream,
    CommonToken,
    Interval,
    Recognizer,
    Token,
    TokenSource,
} from "antlr4ng";

export class LPCToken extends CommonToken {
    public filename: string;
    //public lineIntervals: Interval[];
    public relatedToken: Token | undefined;
    public generatedCode: string;

    constructor(details: {
        source: [TokenSource | null, CharStream | null];
        type: number;
        channel?: number;
        start?: number;
        stop?: number;
        text?: string;
        line?: number;
        tokenIndex?: number;
        column?: number;
    }) {
        super(details);
    }

    override toString(recognizer?: Recognizer<ATNSimulator>): string {
        const t = super.toString(recognizer);
        return `${this.filename}:${t}`;
    }
}

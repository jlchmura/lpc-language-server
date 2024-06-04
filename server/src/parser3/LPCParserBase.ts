import { Parser, TokenStream } from "antlr4ng";

export abstract class LPCParserBase extends Parser {
    public driverType: string = "ldmud";

    constructor(input: TokenStream) {
        super(input);
    }

    protected isFluff(): boolean {
        return this.driverType == "fluffos";
    }

    protected isLD(): boolean {
        return this.driverType == "ldmud";
    }
}

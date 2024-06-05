import * as antlr from "antlr4ng";

export abstract class LPCLexerBase extends antlr.Lexer {
    /** driver type - used in semantic predicates */
    public driverType: string = "ldmud";

    public constructor(input: antlr.CharStream) {
        super(input);
    }

    /** @returns true if the driver type is set to fluffos */
    protected isFluff(): boolean {
        return this.driverType == "fluffos";
    }

    /** @returns true if the driver type is set to ldmud */
    protected isLD(): boolean {
        return this.driverType == "ldmud";
    }
}

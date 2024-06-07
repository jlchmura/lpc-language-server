import { BailErrorStrategy, CommonTokenStream, PredictionMode } from "antlr4ng";
import { DriverType } from "../backend/LpcConfig";
import { LPCParser } from "../parser3/LPCParser";
import { getLexer } from "./test-utils";
import { LPCPreprocessingLexer } from "../parser3/LPCPreprocessingLexer";

describe("Test", () => {
    beforeAll(() => {});

    it("Should pass", () => {
        expect(1).toBe(1);
    });

    it("Should parse LDMud syntax", () => {
        const parser = getParser("ldmud.c", DriverType.LDMud);

        const tree = parser.program();
        expect(tree).toBeDefined();
        expect(tree.children.length).toBeGreaterThan(0);
    });

    it("Should parse FluffOS syntax", () => {
        const parser = getParser("fluffos.c", DriverType.FluffOS);

        const tree = parser.program();
        expect(tree).toBeDefined();
        expect(tree.children.length).toBeGreaterThan(0);
    });
});

function getParser(filename: string, driverType: DriverType) {
    const lexer = getLexer(filename);
    lexer.driverType = driverType;

    const tokenStream = new CommonTokenStream(lexer);
    tokenStream.fill();

    const parser = new LPCParser(tokenStream);
    parser.interpreter.predictionMode = PredictionMode.SLL;
    parser.driverType = lexer.driverType;
    parser.setTokenFactory(lexer.tokenFactory);
    parser.buildParseTrees = true;
    parser.errorHandler = new BailErrorStrategy();
    return parser;
}

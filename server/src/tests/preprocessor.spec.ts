import { BailErrorStrategy, CommonTokenStream, PredictionMode } from "antlr4ng";
import { DriverType } from "../backend/LpcConfig";
import { LPCParser } from "../parser3/LPCParser";
import { getLexer } from "./test-utils";
import { LPCPreprocessingLexer } from "../parser3/LPCPreprocessingLexer";
import { TestFileHandler } from "./TestFileHandler";

describe("Test", () => {
    beforeAll(() => {});

    it("Should pass", () => {
        expect(1).toBe(1);
    });

    it("should correctly parse ldmud preprocessor directives", () => {
        const parser = getParser("preproc.c", DriverType.LDMud);
        const tree = parser.program();
        expect(tree).toBeDefined();
    });

    it("should report include files", () => {
        const lexer = getLexer("includes-test.c", []);
        const tokens = lexer.getAllTokens();
        const handler = lexer.fileHandler as TestFileHandler;

        expect(handler.includes?.length).toEqual(2);
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

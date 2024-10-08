import * as fs from "fs";
import * as path from "path";
import {
    BailErrorStrategy,
    CharStream,
    CommonTokenStream,
    PredictionMode,
} from "antlr4ng";
import { LPCPreprocessingLexer } from "../parser3/LPCPreprocessingLexer";
import { LPCTokenFactor } from "../parser3/LPCTokenFactory";
import { TestFileHandler } from "./TestFileHandler";
import { IDiagnosticEntry } from "../types";
import { LPCParser } from "../parser3/LPCParser";
import { DriverType } from "../backend/LpcConfig";
import { LPCLexer } from "../parser3/LPCLexer";
import { IdentifierMap } from "../backend/IdentifierMap";

const baseDir = path.join(process.cwd(), "server/src/tests/test-assets/");

export function resolveTestFilePath(filename: string): string {
    return path.join(baseDir, filename);
}

function getStream(filename: string): CharStream {
    const f = path.join(
        process.cwd(),
        "server/src/tests/test-assets/",
        filename
    );
    return CharStream.fromString(fs.readFileSync(f, "utf8").toString());
}

export function getLexer(
    filename: string,
    diags: IDiagnosticEntry[] = []
): LPCPreprocessingLexer {
    const stream = getStream(filename);
    const identifiers = new IdentifierMap();
    const lexer = new LPCPreprocessingLexer(stream, filename, identifiers);
    lexer.tokenFactory = new LPCTokenFactor(filename, identifiers);
    lexer.fileHandler = new TestFileHandler();
    return lexer;
}

export function getLexerFromString(
    s: string,
    diags: IDiagnosticEntry[] = []
): LPCPreprocessingLexer {
    const stream = CharStream.fromString(s);
    const identifiers = new IdentifierMap();
    const lexer = new LPCPreprocessingLexer(stream, "test.c", identifiers);
    lexer.tokenFactory = new LPCTokenFactor("test.c", identifiers);
    lexer.fileHandler = new TestFileHandler();
    return lexer;
}

function getParserImpl(lexer: LPCLexer, driverType: DriverType) {
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

export function getParserFromString(code: string, driverType: DriverType) {
    const lexer = getLexerFromString(code);
    return getParserImpl(lexer, driverType);
}

export function getParser(filename: string, driverType: DriverType) {
    return getParserImpl(getLexer(filename), driverType);
}

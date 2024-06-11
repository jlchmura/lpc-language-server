import * as fs from "fs";
import * as path from "path";
import { CharStream } from "antlr4ng";
import { LPCPreprocessingLexer } from "../parser3/LPCPreprocessingLexer";
import { LPCTokenFactor } from "../parser3/LPCTokenFactory";
import { TestFileHandler } from "./TestFileHandler";
import { IDiagnosticEntry } from "../types";

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
    const lexer = new LPCPreprocessingLexer(stream, filename, []);
    lexer.tokenFactory = new LPCTokenFactor(filename);
    lexer.fileHandler = new TestFileHandler();
    return lexer;
}

export function getLexerFromString(
    s: string,
    diags: IDiagnosticEntry[] = []
): LPCPreprocessingLexer {
    const stream = CharStream.fromString(s);
    const lexer = new LPCPreprocessingLexer(stream, "test.c", []);
    lexer.tokenFactory = new LPCTokenFactor("test.c");
    lexer.fileHandler = new TestFileHandler();
    return lexer;
}

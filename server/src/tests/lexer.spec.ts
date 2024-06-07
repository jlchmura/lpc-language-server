import * as fs from "fs";
import * as path from "path";
import { CharStream } from "antlr4ng";
import { LPCPreprocessingLexer } from "../parser3/LPCPreprocessingLexer";
import { LPCTokenFactor } from "../parser3/LPCTokenFactory";
import { TestFileHandler } from "./TestFileHandler";
import { LPCToken } from "../parser3/LPCToken";
import { DriverType, LpcConfig, setLpcConfig } from "../backend/LpcConfig";
import { LexerTextErrorListener } from "./LexerTestErrorListener";
import { IDiagnosticEntry } from "../types";

describe("Test", () => {
    beforeAll(() => {});

    it("Should exist", () => {
        const lexer = new LPCPreprocessingLexer(
            CharStream.fromString(""),
            "",
            []
        );
        expect(lexer).toBeDefined();

        expect(lexer).toHaveProperty("driverType");
        expect(lexer).toHaveProperty("addMacros");
        //expect(lexer).toHaveProperty("fileHandler");
    });

    it("Should lex basic.c", () => {
        const filename = path.join(
            process.cwd(),
            "server/src/tests/test-assets/basic.c"
        );
        const stream = CharStream.fromString(
            fs.readFileSync(filename, "utf8").toString()
        );
        const lexer = new LPCPreprocessingLexer(stream, filename, []);
        lexer.tokenFactory = new LPCTokenFactor(filename);
        const tokens = lexer.getAllTokens();

        expect(tokens?.length).toBeGreaterThan(0);
    });

    it("Should lex all LDMud syntax", () => {
        const filename = path.join(
            process.cwd(),
            "server/src/tests/test-assets/ldmud.c"
        );
        const stream = CharStream.fromString(
            fs.readFileSync(filename, "utf8").toString()
        );
        const lexer = new LPCPreprocessingLexer(stream, filename, []);
        const lexDiags: IDiagnosticEntry[] = [];
        lexer.addErrorListener(new LexerTextErrorListener(lexDiags));
        lexer.driverType = DriverType.LDMud;
        lexer.tokenFactory = new LPCTokenFactor(filename);
        lexer.fileHandler = new TestFileHandler();
        const tokens = lexer.getAllTokens();

        expect(lexDiags.length).toBe(0);
        expect(tokens?.length).toBeGreaterThan(0);
        expect(
            tokens.filter((f) => (f as LPCToken).filename.endsWith("ldmud.h"))
                .length
        ).toBeGreaterThan(0);
    });

    it("Should lex all FluffOS syntax", () => {
        const filename = path.join(
            process.cwd(),
            "server/src/tests/test-assets/fluffos.c"
        );
        const stream = CharStream.fromString(
            fs.readFileSync(filename, "utf8").toString()
        );
        const lexer = new LPCPreprocessingLexer(stream, filename, []);
        const lexDiags: IDiagnosticEntry[] = [];
        lexer.addErrorListener(new LexerTextErrorListener(lexDiags));
        lexer.driverType = DriverType.FluffOS;
        lexer.tokenFactory = new LPCTokenFactor(filename);
        lexer.fileHandler = new TestFileHandler();
        const tokens = lexer.getAllTokens();

        expect(lexDiags.length).toBe(0);
        expect(tokens?.length).toBeGreaterThan(0);
        expect(
            tokens.filter((f) => (f as LPCToken).filename.endsWith("fluffos.h"))
                .length
        ).toBeGreaterThan(0);
    });
});

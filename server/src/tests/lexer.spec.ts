import * as fs from "fs";
import * as path from "path";
import { CharStream } from "antlr4ng";
import { LPCPreprocessingLexer } from "../parser3/LPCPreprocessingLexer";
import { LPCTokenFactor } from "../parser3/LPCTokenFactory";
import { TestFileHandler } from "./TestFileHandler";
import { LPCToken } from "../parser3/LPCToken";
import { DriverType } from "../backend/LpcConfig";
import { IDiagnosticEntry } from "../types";
import { LPCLexer } from "../parser3/LPCLexer";
import { trimQuotes } from "../parser3/parser-utils";
import { getLexer, getLexerFromString } from "./test-utils";
import { IdentifierMap } from "../backend/IdentifierMap";

describe("Test", () => {
    beforeAll(() => {});

    it("Should exist", () => {
        const lexer = new LPCPreprocessingLexer(
            CharStream.fromString(""),
            "",
            new IdentifierMap()
        );
        expect(lexer).toBeDefined();

        expect(lexer).toHaveProperty("driverType");
        expect(lexer).toHaveProperty("addMacros");
        //expect(lexer).toHaveProperty("fileHandler");
    });

    it("Should lex basic.c", () => {
        const lexer = getLexer("basic.c");
        const tokens = lexer.getAllTokens();

        expect(tokens?.length).toBeGreaterThan(0);
    });

    it("Should lex all LDMud syntax", () => {
        const lexDiags: IDiagnosticEntry[] = [];
        const lexer = getLexer("ldmud.c", lexDiags);
        lexer.driverType = DriverType.LDMud;
        const tokens = lexer.getAllTokens();

        expect(lexDiags.length).toBe(0);
        expect(tokens?.length).toBeGreaterThan(0);
        expect(
            tokens.filter((f) => (f as LPCToken).filename.endsWith("ldmud.h"))
                .length
        ).toBeGreaterThan(0);
    });

    it("Should lex all FluffOS syntax", () => {
        const lexDiags: IDiagnosticEntry[] = [];
        const lexer = getLexer("fluffos.c", lexDiags);
        lexer.driverType = DriverType.FluffOS;
        const tokens = lexer.getAllTokens();

        expect(lexDiags.length).toBe(0);
        expect(tokens?.length).toBeGreaterThan(0);
        expect(
            tokens.filter((f) => (f as LPCToken).filename.endsWith("fluffos.h"))
                .length
        ).toBeGreaterThan(0);
    });

    it("should reset the lexer", () => {
        const lexDiags: IDiagnosticEntry[] = [];
        const lexer = getLexer("ldmud.c", lexDiags);
        lexer.driverType = DriverType.LDMud;
        const tokens = lexer.getAllTokens();

        expect(lexer.getMacros().size).toBeGreaterThan(0);
        lexer.reset();
        expect(lexer.getMacros().size).toBe(0);
    });

    it("should add macros to the lexer", () => {
        const lexer = getLexerFromString("string s = foo;");
        lexer.addMacros(new Map([["foo", '"bar"']]));
        const t = lexer.getAllTokens().at(-2);
        expect(t.text).toBe('"bar"');
    });

    it("should add a global include", () => {
        const lexer = getLexerFromString("\n\n");
        lexer.addMacros(new Map([["__GLOBAL_INCLUDE__", '"fluffos.h"']]));
        const tokens = lexer.getAllTokens();
        expect(tokens.at(0).type).toBe(LPCLexer.HASH);
        expect(
            (tokens.at(6) as LPCToken).filename.endsWith("fluffos.h")
        ).toBeTruthy();
    });

    it("should add filename to tokens", () => {
        const lexer = getLexer("basic.c");
        const tokens = lexer.getAllTokens();
        const t = tokens[0] as LPCToken;
        expect(t.filename).toContain("basic.c");
        expect(t.toString()).toContain("basic.c");
    });

    it("should return vocab", () => {
        const lexer = getLexer("basic.c");
        const vocab = lexer.vocabulary;
        expect(vocab).toBeDefined();
    });

    it("should report error when a text shortuct doesn't end", () => {
        const lexDiags: IDiagnosticEntry[] = [];
        const lexer = getLexerFromString(
            `string s = @FOO
            line 1
            line 2 
        `,
            lexDiags
        );

        expect(lexer.getAllTokens).toThrow();
    });
});

describe("Parser Utils", () => {
    it("should trim quotes", () => {
        expect(trimQuotes('"foo"')).toEqual("foo");
        expect(trimQuotes("foo")).toEqual("foo");
    });
});

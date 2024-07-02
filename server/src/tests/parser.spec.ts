import { DriverType } from "../backend/LpcConfig";
import { getParser, getParserFromString } from "./test-utils";

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

    describe("FluffOS", () => {
        it("Should parse FluffOS syntax", () => {
            const parser = getParser("fluffos.c", DriverType.FluffOS);

            const tree = parser.program();
            expect(tree).toBeDefined();
            expect(tree.children.length).toBeGreaterThan(0);
        });
        it("should parse the new() class syntax", () => {
            const parser = getParser("fluffos-new.c", DriverType.FluffOS);

            const tree = parser.program();
            expect(tree).toBeDefined();
            expect(tree.children.length).toBeGreaterThan(0);
        });
        it("should handle the `ref` keyword", () => {
            const parser = getParser(
                "call-by-ref.fluffos.c",
                DriverType.FluffOS
            );

            const tree = parser.program();
            expect(tree).toBeDefined();
            expect(tree.children.length).toBeGreaterThan(0);
        });

        it("should parse numbers with underscores", () => {
            const testCode = "test() { int x = 1_000; float f = 1_000.0; }";
            const parser = getParserFromString(testCode, DriverType.FluffOS);
            const tree = parser.program();

            expect(parser.numberOfSyntaxErrors).toEqual(0);
            expect(tree).toBeDefined();
            expect(tree.children.length).toBeGreaterThan(0);
        });
    });
});

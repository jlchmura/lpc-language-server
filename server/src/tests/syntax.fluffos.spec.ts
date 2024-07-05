import { DriverType } from "../config-types";
import { getParser } from "./test-utils";

describe("FluffOS-specific Syntax Tests", () => {
    it("should parse case statements with open-ended ranges", () => {
        const parser = getParser("syntax-switch.fluffos.c", DriverType.FluffOS);
        const tree = parser.program();

        expect(tree).toBeDefined();
    });

    it("should parse function argument defaults", () => {
        const parser = getParser(
            "syntax-functions.fluffos.c",
            DriverType.FluffOS
        );
        const tree = parser.program();

        expect(tree).toBeDefined();
    });
});

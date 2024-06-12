import {
    areSetsEqual,
    lexRangeToLspRange,
    normalizeFilename,
    trimStart,
} from "../utils";

describe("utils.ts", () => {
    it("should return the proper range from lexRangeToLspRange()", () => {
        const r = lexRangeToLspRange({
            start: { row: 1, column: 2 },
            end: { row: 3, column: 4 },
        });
        expect(r.start.line).toBe(0);
        expect(r.start.character).toBe(2);
        expect(r.end.line).toBe(2);
        expect(r.end.character).toBe(4);
    });

    it("should test if two sets are equal", () => {
        const set1 = new Set([1, 2, 3, 4, 5]);
        const set2 = new Set([1, 2, 3, 4, 5]);
        const set3 = new Set([1, 2, 3, 4, 5, 6]);
        const set4 = new Set([1, 2, 3, 4, 5, 7]);

        expect(areSetsEqual(set1, set2)).toBe(true);
        expect(areSetsEqual(set1, set3)).toBe(false);
        expect(areSetsEqual(set3, set4)).toBe(false);
    });

    it("should normalize filenames", () => {
        const isWin = process.platform === "win32";

        expect(normalizeFilename(undefined)).toBeUndefined();
        expect(normalizeFilename("")).toBe("");

        if (!isWin) {
            expect(normalizeFilename("/path/to/file")).toBe("/path/to/file.c");

            // it should parse filenames that look like URI's
            expect(normalizeFilename("file:///path/to/file")).toBe(
                "/path/to/file.c"
            );
        }

        if (isWin) {
            // it should parse file uri's from windows that contain a drive letter
            expect(normalizeFilename("file:///c:/path/to/file")).toBe(
                "c:\\path\\to\\file.c"
            );
        }

        // it should not chnage the extension if one was provided
        expect(normalizeFilename("test.h")).toBe("test.h");
    });

    it("get a valid string result from trimStart()", () => {
        expect(trimStart("___test", "___")).toBe("test");
        expect(trimStart(undefined, "___")).toBe(undefined);
        expect(trimStart("___test", undefined)).toBe("___test");
        expect(trimStart("***test", "___")).toBe("***test");
    });
});

import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";
import { createTestLanguageService } from "./harness.js";

/**
 * `({ ... })` spelled as a doc type. The mapping form `([ ... ])` has always parsed in lpcdoc,
 * and a mudlib naturally writes both the way their values are written -- so the array form
 * looked supported and was not. It reported "Type expected", and because `@returns` overrides
 * the declared type, an unparseable one replaced a correct `string*` return with `mixed`.
 *
 * LPC has no tuple type, so a multi-element spelling becomes an array of the union of its
 * elements.
 */
const cwd = lpc.normalizePath(process.cwd());

function probe(main: string, marker: string) {
    const { ls, abs } = createTestLanguageService({ "lib/main.c": main }, {
        driverType: lpc.LanguageVariant.FluffOS,
        diagnostics: true,
        rootDir: lpc.normalizePath(path.join(cwd, "lib")),
    });
    const fileName = abs("lib/main.c");
    const diagnostics = [...ls.getSyntacticDiagnostics(fileName), ...ls.getSemanticDiagnostics(fileName)]
        .map(d => lpc.flattenDiagnosticMessageText(d.messageText, " "));
    const hover = ls.getQuickInfoAtPosition(fileName, main.indexOf(marker))?.displayParts
        ?.map(p => p.text).join("").replace(/\s+/g, " ");
    return { diagnostics, hover };
}

const returns = (type: string) => `/**\n * @returns {${type}} v\n */\nstring *f() { return ({}); }\n`;

describe("array literal spelled as an lpcdoc type", () => {
    it("is an array of its single element", () => {
        expect(probe(returns(`({ string })`), "f()"))
            .toEqual({ diagnostics: [], hover: "function string* f()" });
    });

    it("collapses repeated elements to one element type", () => {
        expect(probe(returns(`({ string, string })`), "f()"))
            .toEqual({ diagnostics: [], hover: "function string* f()" });
    });

    it("is an array of the union when the elements differ", () => {
        expect(probe(returns(`({ string, object })`), "f()"))
            .toEqual({ diagnostics: [], hover: "function (object | string)* f()" });
    });

    it("accepts the empty literal as an array of mixed", () => {
        expect(probe(returns(`({ })`), "f()"))
            .toEqual({ diagnostics: [], hover: "function mixed* f()" });
    });

    it("takes a trailing array marker like any other type", () => {
        expect(probe(`/**\n * @type {({ int, int })*}\n */\nmixed *dims = ({});\n`, "dims"))
            .toEqual({ diagnostics: [], hover: "var int** dims" });
    });

    it("is a union member like any other type", () => {
        expect(probe(returns(`({ string }) | ({ string, string })`), "f()"))
            .toEqual({ diagnostics: [], hover: "function string* f()" });
    });

    it("reports no error on the include that pulls in the doc comment", () => {
        const { ls, abs } = createTestLanguageService({
            "lib/sefun/file.c": returns(`({ string, string })`),
            "lib/main.c": `#include "/sefun/file.c"\n`,
        }, {
            driverType: lpc.LanguageVariant.FluffOS,
            diagnostics: true,
            rootDir: lpc.normalizePath(path.join(cwd, "lib")),
        });
        const fileName = abs("lib/main.c");
        expect([...ls.getSyntacticDiagnostics(fileName), ...ls.getSemanticDiagnostics(fileName)]).toEqual([]);
    });
});

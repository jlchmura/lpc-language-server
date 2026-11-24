import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService, codeAndMessage, DRIVERS } from "./harness.js";

/**
 * LPC's builtin types are branded by the `__LS__` globals in efuns.*.h: an array type's one
 * property is `__LS__Array`, a mapping's `__LS__Mapping`, and so on. An assignment between two
 * of them failed on the brand, and the error named it:
 *
 *     Property '__LS__Array' is missing in type 'mapping' but required in type 'string*'.
 *
 * The plain "Type 'mapping' is not assignable to type 'string*'." is reported instead.
 */
function errors(source: string, driverType: lpc.LanguageVariant): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType });
    return ls.getSemanticDiagnostics(abs("test.c")).map(codeAndMessage);
}

describe.each(DRIVERS)("type errors between builtin types (%s)", (_name, driverType) => {
    it("names the types, not the brand: filter() on a mapping into an array", () => {
        // lib/std/living/body.c: filter() on a mapping returns a mapping.
        expect(errors(`mapping limbs;\nint f() {\n    string *attach;\n    attach = filter(limbs, (: 1 :));\n    return sizeof(attach);\n}\n`, driverType))
            .toEqual(["2322: Type 'mapping' is not assignable to type 'string*'."]);
    });

    it("never mentions an __LS__ brand, for any pair of types", () => {
        const types = ["int", "float", "string", "mapping", "object", "function", "int *", "string *", "mapping *", "<int|string>*",
            ...(driverType === lpc.LanguageVariant.FluffOS ? ["buffer", "class Foo"] : ["closure", "status", "bytes", "symbol", "lwobject", "struct Foo"])];
        let source = driverType === lpc.LanguageVariant.FluffOS ? "class Foo { int a; }\n" : "struct Foo { int a; };\n";
        let n = 0;
        for (const from of types) for (const to of types) if (from !== to) source += `void f${n++}(${from} x) { ${to} y = x; }\n`;
        expect(errors(source, driverType).filter(e => e.includes("__LS__"))).toEqual([]);
    });
});

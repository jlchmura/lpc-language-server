import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";
import { createTestLanguageService } from "./harness.js";

/**
 * A type-guard overload (`filter<T,S>(T*, (T) => e is S): S*`) has to be rejected when the
 * callback passed in is an ordinary predicate, so resolution moves on to the plain overload.
 *
 * `compareSignaturesRelated` does reject it -- a source signature with no type predicate cannot
 * satisfy a target signature that has one. But that rejection never reached overload resolution:
 * `canSkipStrictObjectCheck` turns *any* object-to-object structural mismatch into a match while
 * `strictObjectTypes` is off, and a closure type is an object type with a call signature. So the
 * guard overload matched everything, won as the first candidate, and the call came back with its
 * type parameters uninferred -- `mixed*` instead of `string*`.
 *
 * The LPC object-type leniency is about object members, not about type guards. Discarding a
 * missing type predicate makes guard overloads impossible to discriminate, which is what blocked
 * giving `filter` its guard overload: every ordinary `filter` call would degrade to `mixed*`.
 */
const cwd = lpc.normalizePath(process.cwd());

const callbacks = `/**
 * @template T
 * @callback plainCallback
 * @param {T} element
 * @returns {int} keep
 */

/**
 * @template T, S
 * @callback guardCallback
 * @param {T} element
 * @returns {element is S}
 */
`;

const guardOverload = `/**
 * @template T, S
 * @param {T*} source
 * @param {guardCallback<T,S>} f
 * @returns {S*}
 */
mixed *myfilter(mixed *source, function f);
`;

const plainOverload = `/**
 * @template T
 * @param {T*} source
 * @param {plainCallback<T>} f
 * @returns {T*}
 */
mixed *myfilter(mixed *source, function f);
`;

/** Hover type of the variable the call result was assigned to. */
function resultTypeOf(declarations: string, call: string): string | undefined {
    const test =
        `/**\n * @returns {ob is "/std/npc/vendor.c"} yes\n */\nint vendorp(mixed ob) { return 0; }\n\n` +
        callbacks +
        declarations +
        `void t() {\n` +
        `  /** @type {"/std/living.c"} */\n` +
        `  object *livings = ({});\n` +
        `  string *strs = ({ "a" });\n` +
        `  mixed r = ${call};\n` +
        `  r;\n` +
        `}\n`;
    const files: Record<string, string> = {
        "lib/std/living.c": `int is_living() { return 1; }\n`,
        "lib/std/npc/vendor.c": `inherit "/std/living.c";\nint is_vendor() { return 1; }\n`,
        "lib/test.c": test,
    };
    const { ls, abs } = createTestLanguageService(files, {
        driverType: lpc.LanguageVariant.FluffOS,
        diagnostics: true,
        rootDir: path.join(cwd, "lib"),
    } as any);
    const quickInfo = ls.getQuickInfoAtPosition(abs("lib/test.c"), test.indexOf("r;\n"));
    return quickInfo?.displayParts?.map(p => p.text).join("").replace(/\s+/g, " ");
}

describe("overload resolution with a type-guard callback", () => {
    it("infers through the plain overload when it is the only one", () => {
        expect(resultTypeOf(plainOverload, `myfilter(strs, (: strlen($1) > 2 :))`))
            .toBe("(local var) string* r");
    });

    it("falls through to the plain overload when the callback is not a type guard", () => {
        expect(resultTypeOf(guardOverload + plainOverload, `myfilter(strs, (: strlen($1) > 2 :))`))
            .toBe("(local var) string* r");
    });

    it("picks the guard overload and narrows when the callback is a type guard", () => {
        expect(resultTypeOf(guardOverload + plainOverload, `myfilter(livings, (: vendorp :))`))
            .toBe(`(local var) object "/std/npc/vendor"* r`);
    });
});

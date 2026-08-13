# Pick-up prompt: overload resolution doesn't fall through to the next candidate

Paste this into a fresh session in `lpc-language-server`.

---

In this LPC language server (a TypeScript-compiler fork), overload resolution appears not to fall
through to the next candidate after rejecting one. When a call has two overloads and the first is
correctly rejected, the call still resolves to that first overload with its type parameters
uninferred, instead of trying the second.

## Reproduce

Drop this in `server/src/tests/zzprobe.spec.ts` and run `npm test -- zzprobe`:

```ts
import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";
import { createTestLanguageService } from "./harness.js";

const cwd = lpc.normalizePath(process.cwd());

const cbs = `/**
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
const guardOv = `/**
 * @template T, S
 * @param {T*} source
 * @param {guardCallback<T,S>} f
 * @returns {S*}
 */
mixed *myfilter(mixed *source, function f);
`;
const plainOv = `/**
 * @template T
 * @param {T*} source
 * @param {plainCallback<T>} f
 * @returns {T*}
 */
mixed *myfilter(mixed *source, function f);
`;

function go(label: string, decls: string, call: string) {
    const files: Record<string, string> = {
        "lib/std/living.c": `int is_living() { return 1; }\n`,
        "lib/std/npc/vendor.c": `inherit "/std/living.c";\nint is_vendor() { return 1; }\n`,
        "lib/test.c":
            `/**\n * @returns {ob is "/std/npc/vendor.c"} yes\n */\nint vendorp(mixed ob) { return 0; }\n\n` +
            cbs + decls +
            `void t() {\n  /** @type {"/std/living.c"} */\n  object *livings = ({});\n  string *strs = ({ "a" });\n  mixed r = ${call};\n  r;\n}\n`,
    };
    const { ls, abs } = createTestLanguageService(files, {
        driverType: lpc.LanguageVariant.FluffOS,
        diagnostics: true,
        rootDir: path.join(cwd, "lib"),
    } as any);
    const f = abs("lib/test.c");
    const src = files["lib/test.c"];
    console.log(`>>> ${label}: ${ls.getQuickInfoAtPosition(f, src.indexOf("r;\n"))?.displayParts?.map(p => p.text).join("").replace(/\s+/g, " ")}`);
}

describe("overload fallthrough", () => {
    it("1", () => go("plain overload alone, plain cb", plainOv, `myfilter(strs, (: strlen($1) > 2 :))`));
    it("2", () => go("both overloads,       plain cb", guardOv + plainOv, `myfilter(strs, (: strlen($1) > 2 :))`));
    it("3", () => go("both overloads,       guard cb", guardOv + plainOv, `myfilter(livings, (: vendorp :))`));
});
```

Current output:

```
>>> plain overload alone, plain cb: (local var) string* r     <- correct
>>> both overloads,       plain cb: (local var) mixed* r      <- BUG, expected string*
>>> both overloads,       guard cb: (local var) object "/std/npc/vendor"* r   <- correct
```

Case 2 is the bug. Adding an overload that does not apply changes the result of a call that
should have matched the second one.

## What is already established — please don't re-derive

- **The predicate discrimination works.** Instrumenting `compareSignaturesRelated`
  (`server/src/compiler/checker.ts`, search `preserves behavior forbidding boolean returning
  functions`) shows exactly one comparison per call, and for case 2 it reports
  `targetPred=true sourcePred=false`. That hits the `isIdentifierTypePredicate(targetTypePredicate)`
  branch which returns `Ternary.False`. So the guard overload *is* being rejected. The problem is
  what happens after the rejection.
- **`compareTypePredicateRelatedTo` is already implemented** (ported from TypeScript). It was a
  stub returning `Ternary.True`; it is not the cause here, and implementing it did not change
  case 2.
- **`(: foo :)` already carries `foo`'s signature**, including its type predicate. That was a
  separate fix. `(: vendorp :)` hovers as `function(mixed ob)` with the predicate intact.
- Case 3 proves inference through a type-predicate callback works end to end
  (`applyToReturnTypes` has the predicate branch and it fires).

## Where to look

`chooseOverload` / `getSignatureApplicabilityError` / `resolveCall` in
`server/src/compiler/checker.ts`. The question is whether a candidate rejected during the
applicability pass is actually removed from consideration, or whether the code falls back to the
first candidate when every candidate fails — and if the latter, why the second overload is also
failing when it succeeds on its own (case 1).

A useful next measurement: log each candidate considered in `chooseOverload` for case 2, with the
applicability error for each. If the second overload also reports an error there, the fallthrough
is fine and the real bug is that the *second* overload stops matching once the first is present
(inference-context contamination between candidates would be the thing to suspect).

TypeScript's own implementation is checked out at
`/Users/johnchmura/code/TypeScript/src/compiler/checker.ts` for side-by-side comparison.

## Why it matters

It blocks giving `filter` a type-guard overload:

```lpc
object *vendors = filter(room->query_living_contents(), (: vendorp :));
```

should yield an array of the guarded type, the way TypeScript's
`filter<S extends T>(predicate: (v: T) => v is S): S[]` does. The mechanism works (case 3), but the
overload cannot be added to `efuns/fluffos/general.h` until case 2 is fixed — otherwise every
ordinary `filter` call in every mudlib silently degrades from `T*` to `mixed*`.

## Ground rules that paid off last time

- Verify a repro is faithful before drawing conclusions from it. Several hours were lost to
  harness setups that looked right and weren't: `sefunFile` needs an **absolute** path via
  `testFilePath()`, `globalIncludeFiles` did not apply at all, and `scanner.getFileName()` is
  empty during JSDoc parsing so filtering instrumentation on it silently matches nothing.
- Before claiming a fix, check the test fails without it (`git stash push -- <file>`, run, pop).
- `npm test` is the full suite (~1061 tests). `npx tsc --noEmit -p server` for typecheck.

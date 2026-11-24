import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService, codeAndMessage } from "./harness.js";

/**
 * LDMud efun declarations checked against the driver's func_spec (LDMud 3.6.8).
 *
 * Each snippet compiles in the driver. Before these efun.h fixes the checker reported
 * an error for each one.
 */
function errors(body: string): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": body }, {
        driverType: lpc.LanguageVariant.LDMud,
        diagnostics: true,
    });
    return ls.getSemanticDiagnostics(abs("test.c")).map(codeAndMessage);
}

describe("LDMud efun signatures", () => {
    it("snoop() returns int (func_spec: int snoop(object, void|object))", () => {
        expect(errors(`int f(object a, object b) { int r = snoop(a, b); return r + snoop(a); }`)).toEqual([]);
    });

    it("regmatch() with options returns mixed: a string, or an array with RE_MATCH_SUBS", () => {
        expect(errors(`
            string *subs(string s) { return regmatch(s, "(a)(b)", 8); }
            string whole(string s) { return regmatch(s, "a+", 0, 1); }
        `)).toEqual([]);
    });

    it("to_bytes()/to_text() take an int array (the parameter name 'bytes' typed it as bytes)", () => {
        expect(errors(`
            bytes b(int *codes) { return to_bytes(codes); }
            string t(int *codes) { return to_text(codes, "UTF-8"); }
        `)).toEqual([]);
    });

    it("set_driver_hook() accepts a mapping (H_MODIFY_COMMAND)", () => {
        expect(errors(`void f() { set_driver_hook(9, ([ "e": "east" ])); }`)).toEqual([]);
    });

    it("functionlist() and get_error_file() flags are optional", () => {
        expect(errors(`
            mixed *a(object o) { return functionlist(o); }
            mixed *b(string n) { return get_error_file(n); }
        `)).toEqual([]);
    });

    it("map()/filter() with only a function name call it in this_object()", () => {
        expect(errors(`
            int valid(object o) { return 1; }
            object *pick(object *obs) { return filter(obs, "valid"); }
            mixed *all(object *obs) { return map(obs, "valid"); }
        `)).toEqual([]);
    });

    it("map()/filter() with a function name take extra arguments for this_object()", () => {
        expect(errors(`
            void add(object o, int n) {}
            int keep(string k, int v, int n) { return v > n; }
            void f(object *u, int amount) {
                mapping m;
                map(u, "add", amount);
                filter(u, "add", amount);
                m = filter(([ "a": 1, "b": 2 ]), "keep", 1);
            }
        `)).toEqual([]);
    });

    it("map() on a mapping returns a mapping (mapping overloads before the struct ones)", () => {
        expect(errors(`mapping f(mapping m) { return map(m, (: $2 + 1 :)); }`)).toEqual([]);
    });

    it("map() and filter() on a string take a function name with extra arguments", () => {
        expect(errors(`
            int f(int c, int n) { return c + n; }
            void g() {
                string s = map("abc", "f", 1);
                s = filter("abc", "f", 1);
            }
        `)).toEqual([]);
    });

    it("max() and min() take any number of arguments (a varargs parameter is the array of the extra ones)", () => {
        expect(errors(`
            string s() { return max("a", "b"); }
            bytes b(bytes x, bytes y) { return min(x, y, x); }
            int i() { return min(3, 4, 5) + max(1); }
            float fl() { return max(1.0, 2.0); }
            mixed n() { return max(1, 2.5) + min(1, -1.1); }
            int arr() { return min(({ 3, 4 })) + max(({ 1, 2 })); }
            string sarr() { return max(({ "foo", "bar" })); }
        `)).toEqual([]);
    });

    it("max() and min() still reject arguments the driver can't compare", () => {
        expect(errors(`mixed f(object o) { return max(o, o); }`).length).toBeGreaterThan(0);
    });

    it("new_lwobject(), sl_exec() and limited() pass extra arguments on", () => {
        expect(errors(`
            lwobject lw() { return new_lwobject("/lw", 1, "a"); }
            mixed sl() { return sl_exec("SELECT ?", 1); }
            mixed lim(closure c) {
                limited(c);
                limited(c, 1, 1000, 2, 5);
                return limited(c, ({ 100000 }), 1, 2);
            }
        `)).toEqual([]);
    });

    it("living() does not narrow to the player object (NPCs are living)", () => {
        const source = `void t(object npc) {\n    if (living(npc)) {\n        npc/*T*/;\n    }\n}\n`;
        const { ls, abs } = createTestLanguageService({ "test.c": source, "obj/player.c": `int is_player() { return 1; }\n` }, {
            driverType: lpc.LanguageVariant.LDMud,
            diagnostics: true,
        });
        const info = ls.getQuickInfoAtPosition(abs("test.c"), source.indexOf("npc/*T*/"));
        expect(lpc.displayPartsToString(info?.displayParts)).toBe(`(parameter)  object npc`);
    });
});

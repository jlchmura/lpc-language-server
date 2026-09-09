import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * The FluffOS external handle API (fluffos#1377): external_create() allocates a handle,
 * external_run() starts it and yields an awaitable promise, and the rest read or tear down
 * that handle. external_start() keeps its classic callback form and gains a promise form
 * when the callbacks are omitted -- the same shape async_read()/call_out() already use.
 *
 * Also include_list() (fluffos#1375), which is unrelated to any of the above but arrived in
 * the same driver window.
 *
 * These are all FluffOS-only: PACKAGE_EXTERNAL has no LDMud counterpart.
 */

function diagnosticsFor(source: string, driverType: lpc.LanguageVariant): lpc.Diagnostic[] {
    const root = process.cwd();
    const virtualFile = lpc.normalizeSlashes(path.join(root, "server/src/tests/cases/compiler/__externalProbe.c"));
    const isVirtual = (fn: string) => !!fn && lpc.normalizeSlashes(fn) === virtualFile;

    const compilerOptions: lpc.CompilerOptions = { driverType, diagnostics: true };
    const host = lpc.createCompilerHost(compilerOptions);
    const origReadFile = host.readFile;
    const origFileExists = host.fileExists;
    host.readFile = (fn: string) => (isVirtual(fn) ? source : origReadFile.call(host, fn));
    host.fileExists = (fn: string) => (isVirtual(fn) ? true : origFileExists.call(host, fn));
    host.getDefaultLibFileName = () =>
        lpc.combinePaths(root, lpc.getDefaultLibFolder(compilerOptions), lpc.getDefaultLibFileName(compilerOptions));

    const program = lpc.createProgram({ host, rootNames: [virtualFile], options: compilerOptions, oldProgram: undefined });
    const file = program.getSourceFile(virtualFile)!;
    return [...file.parseDiagnostics, ...program.getSemanticDiagnostics(file)];
}

function messages(source: string, driverType = lpc.LanguageVariant.FluffOS): string {
    return diagnosticsFor(source, driverType).map(d => lpc.flattenDiagnosticMessageText(d.messageText, "\n")).join("\n");
}

describe("FluffOS external handles (fluffos#1377)", () => {
    it("accepts the whole handle lifecycle", () => {
        const source = `
async void run(string url) {
    int h = external_create(2, ({ "-s", url }));

    external_write(h, "payload");
    external_close_stdin(h);

    mixed *r = await external_run(h);

    string out = external_stdout(h);
    string err = external_stderr(h);
    int code = external_exit_code(h);

    external_kill(h);
    external_close(h);
}
`;
        expect(messages(source)).toBe("");
    });

    it("takes args as an array or as a space-separated string", () => {
        const source = `
void test(string url) {
    int a = external_create(2, ({ "-s", url }));
    int b = external_create(2, "-s " + url);
}
`;
        expect(messages(source)).toBe("");
    });

    it("resolves external_run to a promise of the result tuple", () => {
        // ({ stdout, stderr, exit_code }) -- an array, not a single value.
        const source = `
async void test() { int bad = await external_run(1); }
`;
        expect(messages(source)).toContain("Type 'mixed*' is not assignable to type 'int'");
    });

    it("picks the promise form of external_start when the callbacks are omitted", () => {
        const source = `
async void test() { mixed *r = await external_start(2, ({ "-s" })); }
`;
        expect(messages(source)).toBe("");
    });

    it("keeps the classic callback form of external_start returning the socket fd", () => {
        const source = `
void rd(int fd, string data) {}
void wr(int fd) {}
void cl(int fd) {}

void test() {
    int fd = external_start(2, ({ "-s" }), (: rd :), (: wr :), (: cl :));
    int no_close = external_start(2, ({ "-s" }), (: rd :), (: wr :));
}
`;
        expect(messages(source)).toBe("");
    });

    it("declares include_list, defaulting to this_object()", () => {
        const source = `
void test(object ob) {
    string *with_arg = include_list(ob);
    string *defaulted = include_list();
}
`;
        expect(messages(source)).toBe("");
    });

    it("types include_list as an array of filenames", () => {
        const source = `
void test(object ob) { int bad = include_list(ob); }
`;
        expect(messages(source)).toContain("Type 'string*' is not assignable to type 'int'");
    });

    it("leaves the external efuns undeclared under LDMud", () => {
        // PACKAGE_EXTERNAL is FluffOS-only; the efun header is not loaded for LDMud.
        const source = `
void test() { int h = external_create(2, ({ "-s" })); }
`;
        expect(messages(source, lpc.LanguageVariant.LDMud)).toContain("external_create");
    });
});

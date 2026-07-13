import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";

/**
 * End-to-end guard for the lazy prescan behind workspace-symbol search.
 *
 * Programs are loaded lazily: opening one file does not parse the rest of a (possibly huge)
 * project. The "navto" session handler bridges that gap by scanning the raw text of the
 * project's unparsed root files for the query and marking the hits for parsing before it
 * searches. This test opens exactly one file and asserts that a symbol declared in a
 * *never-opened* sibling file is still found.
 *
 * Note: the prescan keys off the query's first contiguous word segment (see
 * `markNavtoCandidatesForParsing`), so a purely fuzzy query like "whm" would NOT pull an
 * unopened "wibble_hidden_marker" in. Contiguous prefix/substring queries (the common case)
 * are what exercise the lazy path here; fuzzy matching over already-loaded files is covered
 * by navigateTo.spec.ts.
 */
const protocol = lpc.server.protocol;

describe("navigate to lazily loads unopened files", () => {
    function makeLogger(): lpc.server.Logger {
        return {
            close: () => undefined,
            hasLevel: () => false,
            loggingEnabled: () => false,
            perftrc: () => undefined,
            info: () => undefined,
            msg: () => undefined,
            startGroup: () => undefined,
            endGroup: () => undefined,
            getLogFileName: () => undefined,
            isSemantic: true,
        } as unknown as lpc.server.Logger;
    }

    let session: lpc.server.Session | undefined;
    let openedFile: string | undefined;

    afterEach(() => {
        if (session && openedFile) {
            try {
                session.executeCommand({ seq: 99, type: "request", command: protocol.CommandTypes.Close, arguments: { file: openedFile } } as any);
            }
            catch {
                /* ignore teardown errors */
            }
        }
        session = undefined;
        openedFile = undefined;
    });

    function makeSession(root: string): lpc.server.Session {
        const noopWatcher = { close: () => undefined };
        const host = {
            ...(lpc.sys as lpc.server.ServerHost),
            setTimeout: setTimeout as any,
            clearTimeout: clearTimeout as any,
            setImmediate: setImmediate as any,
            clearImmediate: clearImmediate as any,
            watchFile: () => noopWatcher,
            watchDirectory: () => noopWatcher,
        } as lpc.server.ServerHost;

        return new lpc.server.Session({
            host,
            cancellationToken: lpc.server.nullCancellationToken,
            useSingleInferredProject: true,
            useInferredProjectPerProjectRoot: false,
            byteLength: Buffer.byteLength,
            hrtime: process.hrtime,
            logger: makeLogger(),
            canUseEvents: false,
            suppressDiagnosticEvents: true,
            serverMode: lpc.LanguageServiceMode.Semantic,
            projectRootFolder: lpc.normalizePath(root),
        });
    }

    function navto(searchValue: string): lpc.server.protocol.NavtoItem[] {
        const res = session!.executeCommand({ seq: 1, type: "request", command: protocol.CommandTypes.Navto, arguments: { searchValue } } as lpc.server.protocol.NavtoRequest);
        return (res.response ?? []) as lpc.server.protocol.NavtoItem[];
    }

    it("finds a symbol declared in a file that was never opened", () => {
        const root = fs.mkdtempSync(path.join(os.tmpdir(), "lpc-navto-"));
        fs.writeFileSync(path.join(root, "opened.c"), "void opened_fn() {}\n");
        fs.writeFileSync(path.join(root, "hidden.c"), "void wibble_hidden_marker() {}\n");
        fs.writeFileSync(
            path.join(root, "lpc-config.json"),
            JSON.stringify({ driver: { type: "fluffos" }, include: ["**/*.c"] }),
        );

        session = makeSession(root);
        openedFile = lpc.normalizePath(path.join(root, "opened.c"));
        session.executeCommand({
            seq: 0,
            type: "request",
            command: protocol.CommandTypes.Open,
            arguments: { file: openedFile, projectRootPath: lpc.normalizePath(root) },
        } as lpc.server.protocol.OpenRequest);

        // hidden.c is a root file of the configured project but was never opened/parsed.
        const items = navto("wibble_hidden_marker");
        const hit = items.find(i => i.name === "wibble_hidden_marker");
        expect(hit).toBeDefined();
        expect(lpc.normalizePath(hit!.file)).toBe(lpc.normalizePath(path.join(root, "hidden.c")));
    });
});

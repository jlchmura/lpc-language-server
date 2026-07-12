import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";

/**
 * Repro for #200: an open file that is *excluded* from the lpc-config project
 * (or opened with no config at all) must still be usable (rename, references,
 * etc). Such a file is placed in an inferred project; the inferred project was
 * left with `languageServiceEnabled === undefined`, so session.getProjects()
 * filtered it out and rename reported "no project".
 */
describe("excluded open file gets a project (#200)", () => {
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

    let service: lpc.server.ProjectService | undefined;
    let openedFile: lpc.server.NormalizedPath | undefined;

    afterEach(() => {
        // Close the open file so the service releases its projects / file watchers.
        if (service && openedFile) service.closeClientFile(openedFile);
        service = undefined;
        openedFile = undefined;
    });

    function openInService(root: string, file: string): lpc.server.ScriptInfo | undefined {
        const noopWatcher = { close: () => undefined };
        // Delegate to the real system host but stub out file/directory watching so the
        // test doesn't leave live fs watchers (and their handles) open after teardown.
        const host = {
            ...(lpc.sys as lpc.server.ServerHost),
            setTimeout: setTimeout as any,
            clearTimeout: clearTimeout as any,
            setImmediate: setImmediate as any,
            clearImmediate: clearImmediate as any,
            watchFile: () => noopWatcher,
            watchDirectory: () => noopWatcher,
        } as lpc.server.ServerHost;

        service = new lpc.server.ProjectService({
            host,
            logger: makeLogger(),
            cancellationToken: lpc.server.nullCancellationToken,
            useSingleInferredProject: true,
            useInferredProjectPerProjectRoot: false,
            session: undefined,
            projectRootFolder: lpc.normalizePath(root),
        });
        service.setCompilerOptionsForInferredProjects({ driverType: lpc.LanguageVariant.FluffOS } as any);

        openedFile = lpc.server.toNormalizedPath(lpc.normalizePath(file));
        service.openClientFileWithNormalizedPath(
            openedFile,
            fs.readFileSync(file, "utf8"),
            undefined,
            false,
            lpc.server.toNormalizedPath(lpc.normalizePath(root)),
        );
        return service.getScriptInfo(openedFile);
    }

    // session.getProjects() keeps only projects matching `languageServiceEnabled && !isOrphan()`.
    // If none survive, rename throws "no project". Assert the open file has a usable project.
    function expectUsableProject(info: lpc.server.ScriptInfo | undefined) {
        expect(info).toBeDefined();
        expect(info!.isOrphan()).toBe(false);
        const usable = info!.containingProjects.filter(p => p.languageServiceEnabled && !p.isOrphan());
        expect(usable.length).toBeGreaterThan(0);
    }

    it("does not orphan an excluded open file", () => {
        const root = fs.mkdtempSync(path.join(os.tmpdir(), "lpc200-"));
        fs.writeFileSync(path.join(root, "included.c"), "void f() {}\n");
        const excluded = path.join(root, "excluded.c");
        fs.writeFileSync(excluded, "void g() {}\n");
        fs.writeFileSync(
            path.join(root, "lpc-config.json"),
            JSON.stringify({ driver: { type: "fluffos" }, include: ["**/*.c"], exclude: ["excluded.c"] }),
        );

        expectUsableProject(openInService(root, excluded));
    });

    it("does not orphan a standalone file with NO config at all", () => {
        const root = fs.mkdtempSync(path.join(os.tmpdir(), "lpc200b-"));
        const lone = path.join(root, "lone.c");
        fs.writeFileSync(lone, "void g() {}\n");
        // NOTE: no lpc-config.json written.

        expectUsableProject(openInService(root, lone));
    });
});

#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";
import { IFileHandler } from "./backend/types";
import { loadLpcConfig } from "./backend/LpcConfig";
import * as lpc from "./lpc/_namespaces/lpc.js";
import { Session, protocol } from "./lpc/_namespaces/lpc.server.js";
import { Logger } from "./lpcserver/nodeServer";

function main() {
    class MockFileHandler implements IFileHandler {
        constructor() {}

        public loadInclude(
            refFilename: string,
            filename: string
        ): { uri: string; source: string } {
            filename = filename.slice(1, -1);
            if (fs.existsSync(filename)) {
                const source = fs.readFileSync(filename, "utf-8");
                return { uri: filename, source };
            } else {
                return { uri: filename, source: "" };
            }
        }
    }

    lpc.performance.enable();
    lpc.Debug.enableDebugInfo();

    //import { LpcFacade } from "./backend/facade";
    //const workDir = path.resolve(process.cwd()); //, "../fluff-test");
    const workDir = path.resolve(process.cwd());
    //const filename = path.join(workDir, process.argv[3]);
    const filename = path.join(workDir, "room/test.c");
    const fileOnly = path.basename(filename);
    const sourceText = fs.readFileSync(filename, "utf-8");
    const configFile = path.join(workDir, "lpc-config.json");
    const config = loadLpcConfig(configFile);

    const files: { [index: string]: string } = {
        [fileOnly]: sourceText,
    };

    const fileRelativePath = lpc.convertToRelativePath(filename, workDir, f=>f);
    const projectFile = path.normalize(path.join(workDir, "lpc-config.json"));
    //const host = createHost(filename, sourceText, config);
    const serverHost = lpc.sys as lpc.server.ServerHost;
    const cancelToken = lpc.server.nullCancellationToken;
    const logger = new Logger(undefined, true, lpc.server.LogLevel.verbose);
    const session = new Session({ 
        host: serverHost, 
        cancellationToken: cancelToken,
        byteLength: Buffer.byteLength,
        useSingleInferredProject: false,
        useInferredProjectPerProjectRoot: false,
        logger,
        canUseEvents: true,
        hrtime: process.hrtime,
        projectRootFolder: workDir,
    });

    session.updateOpen({
        openFiles: [{ file: filename, projectFileName: projectFile }],            
    });

    //const svc = doCreateLanguageService();
    // const srcFile = host.getSourceFile(filename);
    // const checker = p2.createTypeChecker(host); // binder is called by checker
    // const diags = checker.getDiagnostics(srcFile);
    // const daigsB = srcFile.bindDiagnostics;

    const pos = 64;
    const args: lpc.server.protocol.FileLocationRequestArgs = {
        file: fileRelativePath,
        line: 4,
        offset: 15,
        //position: pos, 
        projectFileName: projectFile
    };
    // const node = getTouchingPropertyName(srcFile, pos);
    //const def = svc.getDefinitionAtPosition(fileOnly, pos, false, false);
    const diags2 = session.getSemanticDiagnosticsSync({file: fileRelativePath, projectFileName: projectFile});
    //const inf2 = session.getQuickInfoWorker(args, false);
    //const diags = session.getDiagnosticsForFiles({delay:0, files: [fileRelativePath]});
    // const refs = session.getReferences(args, true);

    const comps = session.getCompletions(
        {file: 'room/test.c', projectFileName: '/Users/johnchmura/code/lpc-test2/lpc-config.json', line: 9, offset: 7, prefix: undefined},
        protocol.CommandTypes.CompletionInfo
    );

    console.debug("done");
}

main();
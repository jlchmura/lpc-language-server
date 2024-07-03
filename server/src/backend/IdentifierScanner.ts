import { ensureLpcConfig } from "./LpcConfig";
import * as fs from "fs";
import { glob } from "glob";
import * as path from "path";
import { CancellationToken } from "vscode-languageserver";
import { LPCPreprocessingLexer } from "../parser3/LPCPreprocessingLexer";
import { CharStream } from "antlr4ng";
import { LPCLexer } from "../parser3/LPCLexer";
import { MultiMap } from "../types";
import { performance } from "perf_hooks";
import { IFileHandler, LoadImportResult } from "./types";
import { LpcFacade } from "./facade";

/**
 * This is no longer used
 *
 */
class IdentifierScannerFileHandler implements IFileHandler {
    constructor(
        private backend: LpcFacade,
        private searchDirs: string[],
        private includes: string[]
    ) {}

    /**
     * Loads an INCLUDE file
     * @param sourceFilename The filename that is loading the include
     * @param filename The filename of the include file
     * @returns
     */
    public loadInclude(
        sourceFilename: string,
        filename: string
    ): LoadImportResult {
        const importInfo = this.backend.resolveFilename(
            filename,
            sourceFilename,
            this.searchDirs
        );

        this.includes.push(importInfo.fullPath);

        try {
            const source = !!importInfo.fullPath
                ? fs.readFileSync(importInfo.fullPath, "utf-8")
                : "";

            return { uri: importInfo.fullPath, source };
        } catch (e) {
            return { uri: importInfo.fullPath, source: undefined };
        }
    }
}

/**
 * Scans all files in the workspace for identifiers and stores them in a cache.
 */
export class IdentifierScanner {
    private stack: string[] = [];

    constructor(
        private backend: LpcFacade,
        private workspaceDir: string,
        /** the identifier token cache. key is the identifier, value is a set of files containing that identifier */
        private tokenCache: MultiMap<string, string>,
        /** include ref mapping, which maps an include file to all the files that reference it */
        private includeRefs: MultiMap<string, string>,
        private resolveIncludeDirs: (filename: string) => string[]
    ) {}

    /**
     * Scans all files in the workspace and builds the identifier cache
     * @param token cancellation token
     */
    public async scanFiles(token: CancellationToken) {
        performance.mark("identifier-scan-start");
        await this.addFilesForScanning(token);

        const totalSize = this.stack.length;
        while (this.stack.length > 0 && !token.isCancellationRequested) {
            await this.scanNextFile(token);
        }

        console.log(
            `Scanned ${totalSize - this.stack.length} of ${totalSize} files`
        );

        performance.mark("identifier-scan-end");
        performance.measure(
            "identifier-scan",
            "identifier-scan-start",
            "identifier-scan-end"
        );
    }

    private async scanNextFile(token: CancellationToken) {
        if (this.stack.length === 0) {
            return;
        }

        const file = this.stack.pop();

        const promise = new Promise<boolean>((resolve, reject) => {
            fs.readFile(file, "utf8", (err, data) => {
                if (err) {
                    console.error(`Error reading file ${file}: ${err}`);
                    reject(err);
                    return;
                }

                try {
                    const config = ensureLpcConfig();
                    const extraIncludeDirs = this.resolveIncludeDirs(file);
                    const includeFiles: string[] = [];
                    const lexer = new LPCPreprocessingLexer(
                        CharStream.fromString(data),
                        file
                    );
                    lexer.driverType = config.driver.type;
                    lexer.fileHandler = new IdentifierScannerFileHandler(
                        this.backend,
                        extraIncludeDirs,
                        includeFiles
                    );
                    lexer.addMacros(
                        this.backend.getDriverPredefinedMacros(file)
                    );

                    includeFiles.forEach((f) => {
                        this.includeRefs.add(f, file);
                    });

                    const tokens = lexer.getAllTokens();
                    tokens.forEach((token) => {
                        switch (token.type) {
                            case LPCLexer.Identifier:
                            case LPCLexer.BYTES:
                            case LPCLexer.BUFFER:
                            case LPCLexer.FUNCTIONS:
                            case LPCLexer.VARIABLES:
                            case LPCLexer.VISIBLE:
                            case LPCLexer.STRUCTS:
                            case LPCLexer.SYMBOL:
                            case LPCLexer.IN:
                            case LPCLexer.CHAR:
                                this.tokenCache.add(token.text, file);
                                break;
                            // case LPCLexer.StringLiteral:
                            //     const stringText = trimQuotes(token.text);
                            //     this.tokenCache.add(stringText, file);
                            //     break;
                        }
                    });

                    resolve(true);
                } catch (e) {
                    console.error(`Error scanning file ${file}: ${e}`);
                    resolve(false);
                }
            });
        });

        return promise;
    }

    private async addFilesForScanning(token: CancellationToken) {
        const dirsToProcess = [this.workspaceDir];
        const excludeFiles = await this.getExludes();

        // now process everything else
        while (dirsToProcess.length > 0 && !token.isCancellationRequested) {
            const dir = dirsToProcess.pop();
            const files = fs.readdirSync(dir, { withFileTypes: true });

            for (const file of files) {
                if (token.isCancellationRequested) break;

                const filename = path.join(dir, file.name);
                if (file.isDirectory()) {
                    if (excludeFiles.has(filename)) {
                        console.debug(
                            `Skipping dir ${filename} due to exclusion`
                        );
                    } else {
                        dirsToProcess.push(filename);
                    }
                } else if (file.name.endsWith(".c")) {
                    if (excludeFiles.has(filename)) {
                        console.debug(`Skipping ${filename} due to exclusion`);
                        continue;
                    }

                    this.stack.push(filename);
                }
            }
        }
    }

    private async getExludes(): Promise<Set<string>> {
        const config = ensureLpcConfig();

        const globExcludes =
            config.exclude?.length > 0
                ? await glob.glob(config.exclude, {
                      cwd: this.workspaceDir,
                      root: this.workspaceDir,
                      matchBase: true,
                  })
                : [];

        const excludeFiles = new Set(
            globExcludes.map((f) =>
                f.toLowerCase().startsWith(this.workspaceDir.toLowerCase())
                    ? f
                    : path.join(this.workspaceDir, f)
            )
        );

        return excludeFiles;
    }
}

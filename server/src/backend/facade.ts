import * as fs from "fs";
import * as path from "path";
import { SourceContext } from "./SourceContext";
import { TextDocument } from "vscode-languageserver-textdocument";
import { IDiagnosticEntry, ISymbolInfo } from "../types";
import { BaseSymbol } from "antlr4-c3";
import { URI } from "vscode-uri";

export interface IContextEntry {
    context: SourceContext;
    refCount: number;
    dependencies: string[];
    filename: string;
}

enum DependencySearchType {
    Local,
    Global,
}

/**
 * tests if a filename is surrounded by chars @c and if so
 * removes them
 * @param filename
 * @param c
 * @returns
 */
function testFilename(filename: string, c: string, cEnd: string): string {
    if (filename.startsWith(c) && filename.endsWith(cEnd)) {
        return filename.slice(1, filename.length - 1);
    } else {
        return filename;
    }
}

/**
 * this stores the context of the LPC runtime which contains
 * source context, dependencies, and code for each LPC file.
 */
export class LpcFacade {
    /**
     * Mapping file names to SourceContext instances.
     */
    private sourceContexts: Map<string, IContextEntry> = new Map<
        string,
        IContextEntry
    >();

    public constructor(
        private importDir: string,
        private workspaceDir: string
    ) {
        console.log("LpcFacade created", importDir, workspaceDir);
    }

    public loadLpc(fileName: string, source?: string): SourceContext {
        let contextEntry = this.sourceContexts.get(fileName);
        if (!contextEntry) {
            if (!source) {
                try {
                    if (path.isAbsolute(fileName)) {
                        source = fs.readFileSync(fileName, "utf8");
                    } else {
                        fs.statSync(path.join(this.workspaceDir, fileName));
                        source = fs.readFileSync(fileName, "utf8");
                    }
                } catch (e) {
                    source = "";
                }
            }

            const context = new SourceContext(fileName, this.workspaceDir);
            contextEntry = {
                context,
                refCount: 0,
                dependencies: [],
                filename: fileName,
            };
            this.sourceContexts.set(fileName, contextEntry);

            // Do an initial parse run and load all dependencies of this context
            // and pass their references to this context.
            context.setText(source);
            this.parseLpc(contextEntry);
        }
        contextEntry.refCount++;

        return contextEntry.context;
    }

    public releaseLpc(fileName: string): void {
        this.internalReleaseLpc(fileName);
    }

    private internalReleaseLpc(
        fileName: string,
        referencing?: IContextEntry
    ): void {
        const contextEntry = this.sourceContexts.get(fileName);
        if (contextEntry) {
            if (referencing) {
                // If a referencing context is given remove this one from the reference's dependencies list,
                // which in turn will remove the referencing context from the dependency's referencing list.
                referencing.context.removeDependency(contextEntry.context);
            }

            contextEntry.refCount--;
            if (contextEntry.refCount === 0) {
                this.sourceContexts.delete(fileName);

                // Release also all dependencies.
                for (const dep of contextEntry.dependencies) {
                    this.internalReleaseLpc(dep, contextEntry);
                }
            }
        }
    }

    private parseLpc(contextEntry: IContextEntry) {
        const oldDependencies = contextEntry.dependencies;
        contextEntry.dependencies = [];
        const newDependencies = contextEntry.context.parse();

        for (const dep of newDependencies) {
            const depContext = this.loadDependency(contextEntry, dep);
            if (depContext) {
                contextEntry.context.addAsReferenceTo(depContext);
            }
        }

        // Release all old dependencies. This will only unload grammars which have
        // not been ref-counted by the above dependency loading (or which are not used by other
        // grammars).
        for (const dep of oldDependencies) {
            this.releaseLpc(dep);
        }
    }

    /**
     * Call this to refresh the internal input stream as a preparation to a reparse call
     * or for code completion.
     * Does nothing if no grammar has been loaded for that file name.
     *
     * @param fileName The grammar file name.
     * @param source The grammar code.
     */
    public setText(fileName: string, source: string): void {
        const contextEntry = this.sourceContexts.get(fileName);
        if (contextEntry) {
            contextEntry.context.setText(source);
        }
    }

    private loadDependency(
        contextEntry: IContextEntry,
        depName: string
    ): SourceContext | undefined {
        // The given import dir is used to locate the dependency (either relative to the base path or via an
        // absolute path).
        // If we cannot find the grammar file that way we try the base folder.

        const contextFilename = contextEntry.filename.startsWith("file:")
            ? URI.parse(contextEntry.filename).fsPath
            : contextEntry.filename;
        const basePath = path.dirname(contextFilename);
        const fullPath = path.isAbsolute(this.importDir)
            ? this.importDir
            : path.join(basePath, this.importDir);
        try {
            let filename = depName;
            // figure out the search type
            let depType = DependencySearchType.Local;
            if (depName !== (filename = testFilename(filename, '"', '"'))) {
                depType = DependencySearchType.Local;
            } else if (
                depName !== (filename = testFilename(filename, "<", ">"))
            ) {
                depType = DependencySearchType.Global;
            }

            // add a file extension if there isn't one
            if (!filename.endsWith(".c") && !filename.endsWith(".h")) {
                filename += ".c";
            }

            const searchPaths = [basePath, fullPath];
            if (depType === DependencySearchType.Global) {
                searchPaths.reverse();
            }

            for (const p of searchPaths) {
                const depPath = path.join(p, filename);
                try {
                    fs.accessSync(depPath, fs.constants.R_OK);
                    contextEntry.dependencies.push(depPath);
                    return this.loadLpc(depPath);                    
                } catch (e) {
                    // ignore
                    const i = 0;
                }
            }
        } catch (e) {
            // ignore
        }

        // Ignore the dependency if we cannot find the source file for it.
        return undefined;
    }

    public getContext(
        fileName: string,
        source?: string | undefined
    ): SourceContext {
        const contextEntry = this.sourceContexts.get(fileName);
        if (!contextEntry) {
            return this.loadLpc(fileName, source);
        }

        return contextEntry.context;
    }

    public getDiagnostics(fileName: string): IDiagnosticEntry[] {
        const context = this.getContext(fileName);

        return context.getDiagnostics();
    }

    /**
     * Triggers a parse run for the given file name. This grammar must have been loaded before.
     *
     * @param fileName The grammar file name.
     */
    public reparse(fileName: string): void {
        const contextEntry = this.sourceContexts.get(fileName);
        if (contextEntry) {
            this.parseLpc(contextEntry);
        }
    }

    /**
     * Returns a list of top level symbols from a file (and optionally its dependencies).
     *
     * @param fileName The grammar file name.
     * @param fullList If true, includes symbols from all dependencies as well.
     * @returns A list of symbol info entries.
     */
    public listTopLevelSymbols(
        fileName: string,
        fullList: boolean
    ): ISymbolInfo[] {
        const context = this.getContext(fileName);

        return context.listTopLevelSymbols(!fullList);
    }
}

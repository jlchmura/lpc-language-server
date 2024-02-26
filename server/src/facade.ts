import * as fs from "fs";
import * as path from "path";
import { SourceContext } from "./SourceContext";
import { TextDocument } from "vscode-languageserver-textdocument";
import { IDiagnosticEntry } from "./types";

export interface IContextEntry {
  context: SourceContext;
  refCount: number;
  dependencies: string[];
  grammar: string; // The grammar file name.
}

/**
 * this stores the context of the LPC runtime which contains
 * source context, dependencies, and grammar for each LPC file.
 */
export class LpcFacade {
  /**
   * Mapping file names to SourceContext instances.
   */
  private sourceContexts: Map<string, IContextEntry> = new Map<
    string,
    IContextEntry
  >();

  public constructor(private importDir: string, private workspaceDir: string) {
    console.log("LpcFacade created", importDir, workspaceDir);
  }

  public loadGrammar(fileName: string, source?: string): SourceContext {
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
        grammar: fileName,
      };
      this.sourceContexts.set(fileName, contextEntry);

      // Do an initial parse run and load all dependencies of this context
      // and pass their references to this context.
      context.setText(source);
      this.parseGrammar(contextEntry);
    }
    contextEntry.refCount++;

    return contextEntry.context;
  }

  public releaseGrammar(fileName: string): void {
    this.internalReleaseGrammar(fileName);
  }

  private internalReleaseGrammar(
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
          this.internalReleaseGrammar(dep, contextEntry);
        }
      }
    }
  }

  private parseGrammar(contextEntry: IContextEntry) {
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
      this.releaseGrammar(dep);
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
    const basePath = path.dirname(contextEntry.grammar);
    const fullPath = path.isAbsolute(this.importDir)
      ? this.importDir
      : path.join(basePath, this.importDir);
    try {
      const depPath = path.join(fullPath, depName + ".g4");
      fs.accessSync(depPath, fs.constants.R_OK);
      // Target path can be read. Now check the target file.
      contextEntry.dependencies.push(depPath);

      return this.loadGrammar(depPath);
    } catch (e) {
      // ignore
    }

    // File not found. Try other extension.
    try {
      const depPath = path.join(fullPath, depName + ".g");
      fs.accessSync(depPath, fs.constants.R_OK);
      // Target path can be read. Now check the target file.
      contextEntry.dependencies.push(depPath);

      return this.loadGrammar(depPath);
    } catch (e) {
      // ignore
    }

    // Couldn't find it in the import folder. Use the base then.
    try {
      const depPath = path.join(basePath, depName + ".g4");
      fs.statSync(depPath);
      contextEntry.dependencies.push(depPath);

      return this.loadGrammar(depPath);
    } catch (e) {
      // ignore
    }

    try {
      const depPath = path.join(basePath, depName + ".g");
      fs.statSync(depPath);
      contextEntry.dependencies.push(depPath);

      return this.loadGrammar(depPath);
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
      return this.loadGrammar(fileName, source);
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
      this.parseGrammar(contextEntry);
    }
  }
}

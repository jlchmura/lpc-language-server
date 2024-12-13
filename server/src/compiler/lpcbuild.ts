import { Extension, ResolvedConfigFileName, combinePaths, fileExtensionIs } from "./_namespaces/lpc.js";

/** @internal */
export function resolveConfigFileProjectName(project: string): ResolvedConfigFileName {
    if (fileExtensionIs(project, Extension.Json)) {
        return project as ResolvedConfigFileName;
    }

    return combinePaths(project, "lpc-config.json") as ResolvedConfigFileName;
}


import { createSortedArray, getNormalizedAbsolutePath, isRootedDiskPath, normalizePath, Path, SortedArray, SortedReadonlyArray } from "./_namespaces/lpc";
import { Project } from "./_namespaces/lpc.server";

export enum LogLevel {
    terse,
    normal,
    requestTime,
    verbose,
}

export interface Logger {
    close(): void;
    hasLevel(level: LogLevel): boolean;
    loggingEnabled(): boolean;
    perftrc(s: string): void;
    info(s: string): void;
    startGroup(): void;
    endGroup(): void;
    msg(s: string, type?: Msg): void;
    getLogFileName(): string | undefined;
    /** @internal*/ isTestLogger?: boolean;
}

// TODO: Use a const enum (https://github.com/Microsoft/TypeScript/issues/16804)
export enum Msg {
    Err = "Err",
    Info = "Info",
    Perf = "Perf",
}

export type NormalizedPath = string & { __normalizedPathTag: any; };

export const emptyArray: SortedReadonlyArray<never> = createSortedArray<never>();

export function normalizedPathToPath(normalizedPath: NormalizedPath, currentDirectory: string, getCanonicalFileName: (f: string) => string): Path {
    const f = isRootedDiskPath(normalizedPath) ? normalizedPath : getNormalizedAbsolutePath(normalizedPath, currentDirectory);
    return getCanonicalFileName(f) as Path;
}

export function toNormalizedPath(fileName: string): NormalizedPath {
    return normalizePath(fileName) as NormalizedPath;
}

export namespace Errors {
    export function ThrowNoProject(): never {
        throw new Error("No Project.");
    }
    export function ThrowProjectLanguageServiceDisabled(): never {
        throw new Error("The project's language service is disabled.");
    }
    export function ThrowProjectDoesNotContainDocument(fileName: string, project: Project): never {
        throw new Error(`Project '${project.getProjectName()}' does not contain document '${fileName}'`);
    }
}

export function asNormalizedPath(fileName: string): NormalizedPath {
    return fileName as NormalizedPath;
}

/** @internal */
export function makeAuxiliaryProjectName(counter: number): string {
    return `/dev/null/auxiliaryProject${counter}*`;
}

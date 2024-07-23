import { getNormalizedAbsolutePath, isRootedDiskPath, normalizePath, Path, SortedArray, SortedReadonlyArray } from "./_namespaces/lpc";

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

export function createSortedArray<T>(): SortedArray<T> {
    return [] as any as SortedArray<T>; // TODO: GH#19873
}

export const emptyArray: SortedReadonlyArray<never> = createSortedArray<never>();

export function normalizedPathToPath(normalizedPath: NormalizedPath, currentDirectory: string, getCanonicalFileName: (f: string) => string): Path {
    const f = isRootedDiskPath(normalizedPath) ? normalizedPath : getNormalizedAbsolutePath(normalizedPath, currentDirectory);
    return getCanonicalFileName(f) as Path;
}

export function toNormalizedPath(fileName: string): NormalizedPath {
    return normalizePath(fileName) as NormalizedPath;
}

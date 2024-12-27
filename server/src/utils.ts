import { URI } from "vscode-uri";

/**
 * Add a file extension to a filename if it doesn't have one
 * @param filename filename to normalize
 * @returns
 */
export function normalizeFileExtension(filename: string) {
    if (!filename) return filename;

    if (!filename.endsWith(".c") && !filename.endsWith(".h")) {
        filename += ".c";
    }

    return filename;
}

export function normalizeFilename(filename: string) {
    if (!filename) return filename;

    filename = normalizeFileExtension(filename);

    if (filename.startsWith("file:")) {
        const uri = URI.parse(filename);
        const fsPath = uri.fsPath;
        return fsPath;
    } else {
        return filename;
    }
}


export function trimStart(original: string, toRemove: string): string {
    if (original?.startsWith(toRemove)) {
        return original.slice(toRemove.length);
    }
    return original;
}

export function pushIfDefined<T>(arr: T[], item: T) {
    if (!!item) {
        arr.push(item);
    }
}

/**
 * tests if a filename is surrounded by chars @c and if so
 * removes them
 * @param filename
 * @param c
 * @returns
 */
export function testFilename(
    filename: string,
    c: string,
    cEnd: string
): string {
    if (filename.startsWith(c) && filename.endsWith(cEnd)) {
        return filename.slice(1, filename.length - 1);
    } else {
        return filename;
    }
}

/** escape a string for use in regex */
export function escapeRegExp(str: string) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

export function areWeTestingWithJest() {
    return process.env.JEST_WORKER_ID !== undefined;
}



import { CharacterCodes } from "../backend/types";
import { startsWith } from "./_namespaces/lpc";

/** @internal */
export function countPathComponents(path: string): number {
    let count = 0;
    for (let i = startsWith(path, "./") ? 2 : 0; i < path.length; i++) {
        if (path.charCodeAt(i) === CharacterCodes.slash) count++;
    }
    return count;
}

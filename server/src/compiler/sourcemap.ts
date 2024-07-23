/** @internal */
export interface LineInfo {
    getLineCount(): number;
    getLineText(line: number): string;
}

/** @internal */
export function getLineInfo(text: string, lineStarts: readonly number[]): LineInfo {
    return {
        getLineCount: () => lineStarts.length,
        getLineText: line => text.substring(lineStarts[line], lineStarts[line + 1]),
    };
}

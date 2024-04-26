import { IPosition } from "../types";
import { Range } from "vscode-languageserver";

type SourceMapping = {
    line: number;
    column: number;
    sourceLine: number;
    sourceColumn: number;
};

export class SourceMap {
    private mapping: SourceMapping[] = [];

    constructor() {}

    public resort() {
        this.mapping.sort((a, b) => {
            if (a.line == b.line) {
                return a.column - b.column;
            } else {
                return a.line - b.line;
            }
        });
    }

    public addMapping(
        generatedLine: number,
        generatedColumn: number,
        sourceLine: number,
        sourceColumn: number
    ) {
        this.mapping.push({
            line: generatedLine,
            column: generatedColumn,
            sourceLine: sourceLine,
            sourceColumn: sourceColumn,
        });
    }

    private findEntry(
        sourceLine: number,
        sourceColumn: number
    ): SourceMapping | undefined {
        // find the closets mapping
        // using this algorithm borrowed from nodes sourcemap
        let first = 0;
        let count = this.mapping.length;
        while (count > 1) {
            const step = count >> 1;
            const middle = first + step;
            const mapping = this.mapping[middle];
            if (
                sourceLine < mapping.sourceLine ||
                (sourceLine === mapping.sourceLine &&
                    sourceColumn < mapping.sourceColumn)
            ) {
                count = step;
            } else {
                first = middle;
                count -= step;
            }
        }

        const m = this.mapping[first];
        if (
            !first &&
            m &&
            (sourceLine < m.sourceLine ||
                (sourceLine === m.sourceLine && sourceColumn < m.sourceColumn))
        ) {
            return undefined;
        } else if (!m) {
            return undefined;
        } else {
            return m;
        }
    }

    private findEntryByGeneratedPosition(
        generatedLine: number,
        generatedColumn: number
    ): SourceMapping | undefined {
        // find the closets mapping
        // using this algorithm borrowed from nodes sourcemap
        let first = 0;
        let count = this.mapping.length;
        while (count > 1) {
            const step = count >> 1;
            const middle = first + step;
            const mapping = this.mapping[middle];
            if (
                generatedLine < mapping.line ||
                (generatedLine === mapping.line &&
                    generatedColumn < mapping.column)
            ) {
                count = step;
            } else {
                first = middle;
                count -= step;
            }
        }

        const m = this.mapping[first];
        if (
            !first &&
            m &&
            (generatedLine < m.line ||
                (generatedLine === m.line && generatedColumn < m.column))
        ) {
            return undefined;
        } else if (!m) {
            return undefined;
        } else {
            return m;
        }
    }

    /**
     * convert sourcText column/row to lexer column/row using the sourceMap.
     * row/column are 1-based
     * @param column
     * @param row
     * @returns
     */
    public getGeneratedLocation(
        sourceLine: number,
        sourceColumn: number
    ): IPosition | undefined {
        const m = this.findEntry(sourceLine, sourceColumn);

        if (!m) return { column: sourceColumn, row: sourceLine };

        // adjust the line and column based on the offset
        const lineOffset = m.line - m.sourceLine;
        const columnOffset = m.column - m.sourceColumn;

        return {
            column: sourceColumn + (m.line == sourceLine ? columnOffset : 0),
            row: sourceLine + lineOffset,
        };
    }

    /**
     * Find the source location based on a position in the generated text.
     * line/column are 1-based
     * @param generatedLine
     * @param generatedColumn
     * @returns
     */
    public getSourceLocation(
        generatedLine: number,
        generatedColumn: number
    ): IPosition | undefined {
        const m = this.findEntryByGeneratedPosition(
            generatedLine,
            generatedColumn
        );
        // adjust the line and column based on the offset
        if (!m) {
            return undefined;
        }

        const lineOffset = m.sourceLine - m.line;
        const columnOffset = m.sourceColumn - m.column;

        return {
            column:
                generatedColumn + (m.line == generatedLine ? columnOffset : 0),
            row: generatedLine + lineOffset,
        };
    }

    public createSourceRange(
        startLine: number,
        startChar: number,
        endLine: number,
        endChar: number
    ): Range {
        const start = this.getSourceLocation(startLine, startChar);
        const end = this.getSourceLocation(endLine, endChar);

        return Range.create(
            start?.row ?? startLine,
            start?.column ?? startChar,
            end?.row ?? endLine,
            end?.column ?? endChar
        );
    }
}

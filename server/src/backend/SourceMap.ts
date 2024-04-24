import { IPosition } from "../types";

type SourceMapping = {
    line: number;
    column: number;
    sourceLine: number;
    sourceColumn: number;
};

export class SourceMap {
    private mapping: SourceMapping[] = [];

    constructor() {}

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

    /**
     * convert sourcText column/row to lexer column/row using the sourceMap
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
        const lineOffset = sourceLine - m.sourceLine;
        const columnOffset = sourceColumn - m.sourceColumn;

        return {
            column: m.column + columnOffset,
            row: m.line + lineOffset,
        };
    }

    public getSourceLocation(
        generatedLine: number,
        generatedColumn: number
    ): IPosition | undefined {
        const m = this.findEntry(generatedLine, generatedColumn);
        // adjust the line and column based on the offset
        if (!m) {
            return undefined;
        }
        const lineOffset = generatedLine - m.line;
        const columnOffset = generatedColumn - m.column;

        return {
            column: m.sourceColumn + columnOffset,
            row: m.sourceLine + lineOffset,
        };
    }
}

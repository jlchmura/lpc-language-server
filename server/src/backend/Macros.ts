import { IIndexedPosition, IPosition, MacroDefinition } from "../types";
import { escapeRegExp } from "../utils";
import { SemanticTokenCollection } from "./SemanticTokenCollection";
import { SourceMap } from "./SourceMap";

const MacroNameRegex = /^[a-zA-Z][a-zA-Z0-9_]*/;

export type MacroTable = Map<string, MacroDefinition>;

type MacroInstance = {
    key: string;
    start: IPosition;
    end: IPosition;
    startIndex: number;
    endIndex: number;
    openParen?: IIndexedPosition;
    closeParen?: IIndexedPosition;
    commas?: IIndexedPosition[];
    disabled?: boolean;
};

export class MacroProcessor {
    private macroInstances: MacroInstance[] = [];

    private writer: CodeWriter = new CodeWriter();
    private builders = new CodeBuilderCollection(
        this.sourceMap,
        [],
        this.writer
    );

    private codeIdx = 0;
    private row = 1;
    private column = 1;

    constructor(
        private macroTable: MacroTable,
        private sourceMap: SourceMap,
        private code: string,
        private semanticTokens: SemanticTokenCollection
    ) {}

    private reset() {
        this.codeIdx = 0;
        this.row = 1;
        this.column = 1;
    }

    private seekToIndex(index: number): string {
        const startIdx = this.codeIdx;
        while (this.codeIdx <= index) {
            this.column++;
            if (this.code[this.codeIdx] == "\n") {
                this.row++;
                this.column = 1;
            }
            this.codeIdx++;
        }

        return this.code.substring(startIdx, this.codeIdx);
    }

    /**
     * process the current line and tag all instances of macros
     * @param line
     * @param macros
     */
    public markMacros() {
        // first, find all macro instances in the code
        this.macroInstances = this.findMacroInstances();

        console.debug("Found macro instances: ", this.macroInstances);
    }

    /**
     * Find all instances of c-style precprocessor macros in this line of code and return their starting index.
     * @param line
     * @param macros
     */
    private findMacroInstances() {
        const code = this.code;
        const instances: MacroInstance[] = [];
        const macroArr = Array.from(this.macroTable.values());
        // order function macros first, then regular, but keep their definition order beyond that.
        const macroOrder = [
            ...macroArr.filter((m) => !!m.args),
            ...macroArr.filter((m) => !m.args),
        ];

        let row = 0,
            column = -1;
        let j = -1;
        let inQuot = false,
            inEsc = false;

        while (j++ < code.length) {
            column++;
            if (!inEsc && code[j] === "\n") {
                row++;
                column = -1;
                continue;
            } else if (!inEsc && code[j] === '"') {
                inQuot = !inQuot;
                continue;
            } else if (code[j] === "\\") {
                inEsc = true;
                continue;
            } else if (inQuot) {
                // if we're in a quote then it can't be a macro
                continue;
            }

            // next character might be a macro
            for (const def of macroOrder) {
                const key = def.name;
                const startWithKey = !!def.args ? key + "(" : key;
                if (
                    code.startsWith(startWithKey, j) &&
                    code.substring(j - 1).match(`\\b${key}\\b`)?.index == 1 // must be a whole word match
                ) {
                    const start: IPosition = { row, column };
                    let end = { row, column: column + key.length };
                    let endIndex = j + key.length;
                    const instance: MacroInstance = {
                        key,
                        start,
                        end,
                        startIndex: j,
                        endIndex: j + key.length,
                    };

                    // if this is a macro with arguments, find the closing paren
                    // we'll need to temporarily scroll forward to find the closing paren
                    if (!!def.args) {
                        // setup some new counters for this sub loop
                        let openCharCount = 0,
                            openQuote = false,
                            subEscape = false;
                        let k = j + key.length;
                        let c = column + key.length;
                        let r = row;

                        // init some function-specific things in the instance
                        instance.commas = [];

                        // scroll past the name to the opening paren
                        while (code[k] !== "(") {
                            k++;
                            c++;
                            // need to track line changes
                            if (code[k] === "\n") {
                                r++;
                                c = -1;
                            }
                        }

                        // store position of the opening paren
                        instance.openParen = { row: r, column: c, index: k };

                        // now look for commas and the final closing paren
                        openCharCount++;
                        while (openCharCount > 0 && k < code.length) {
                            k++;
                            c++;
                            switch (code[k]) {
                                case "\n":
                                    if (!subEscape) {
                                        r++;
                                        c = -1;
                                    }
                                    break;
                                case "\\":
                                    subEscape = true;
                                    // nothing else can happen, so continue
                                    continue;
                                case "(":
                                case "[":
                                    if (!openQuote) {
                                        openCharCount++;
                                    }
                                    break;
                                case ")":
                                case "]":
                                    if (!openQuote) {
                                        openCharCount--;
                                    }
                                    if (openCharCount == 0) {
                                        // found the final closing paren, log it.
                                        instance.closeParen = {
                                            row: r,
                                            column: c,
                                            index: k,
                                        };
                                        // ntbla: check if char is actually a paren and log diags if not
                                    }
                                    break;
                                case '"':
                                    if (!subEscape) {
                                        openQuote = !openQuote;
                                    }
                                    break;
                                case ",":
                                    if (!openQuote && openCharCount == 1) {
                                        // this is a comma that separates arguments
                                        instance.commas.push({
                                            row: r,
                                            column: c,
                                            index: k,
                                        });
                                    }
                                    break;
                            } // end of switch

                            subEscape = false;
                        } // end of k loop

                        if (openCharCount > 0) {
                            // NTBLA: send to diagnostics
                            console.error("Macro missing closing paren: ", key);
                            continue;
                        }

                        // this is the closing paren of the macro function
                        end = { row: r, column: c };
                        endIndex = k;
                    } // end of macro-function test

                    instance.end = end; // update the end position
                    instance.endIndex = endIndex;
                    instances.push(instance);
                } else {
                    inEsc = false; // turn off escape
                } //end of macro startsWith test
            } //end of macroOrder loop
        }

        return instances;
    }

    public replaceMacros() {
        // sort macros by start.row then start.column
        // this is so that once we set a source map, it won't change
        this.macroInstances.sort((a, b) => {
            if (a.start.row < b.start.row) {
                return -1;
            } else if (a.start.row > b.start.row) {
                return 1;
            } else {
                return a.start.column - b.start.column;
            }
        });

        let rootBuilder = this.builders;
        this.createBuildersForSequence(rootBuilder, 0, this.code.length - 1);

        this.builders.build(0);

        const finalCode = this.writer.code;
        const lines = finalCode.split("\n");
        return finalCode;
    }

    private createBuildersForSequence(
        rootBuilder: CodeBuilderCollection,
        startMacroIndex: number,
        endIndex: number
    ) {
        let b: CodeBuilder;
        let i: number;
        for (i = startMacroIndex; i < this.macroInstances.length; i++) {
            const inst = this.macroInstances[i];
            const def = this.macroTable.get(inst.key);

            if (
                inst.disabled ||
                // macro must intersect current codeIdx and endIndex
                !(inst.endIndex >= this.codeIdx && inst.startIndex <= endIndex)
            )
                continue;

            // mark as disabled so we don't process this macro again
            inst.disabled = true;

            // put the text before the macro into the builder
            const startRow = this.row;
            const startCol = this.column;
            const txt = this.seekToIndex(inst.startIndex - 1);
            if (txt.length > 0) {
                b = new CodeBuilderString(
                    this.sourceMap,
                    txt,
                    startRow,
                    startCol,
                    this.writer
                );
                rootBuilder.add(b);
            }

            if (!!inst.openParen) {
                const args: CodeBuilder[] = [];

                this.seekToIndex(inst.openParen.index + 1); // skip the open paren

                // create builders for each arg
                for (let j = 0; j < def.args.length; j++) {
                    const prevComma = inst.commas[j - 1] || inst.openParen;
                    const nextComma = inst.commas[j] || inst.closeParen;

                    const argBuilder = (args[j] = new CodeBuilderCollection(
                        this.sourceMap,
                        [],
                        this.writer
                    ));

                    // create a build for this arg.  adjust i based on which macros it consumed.
                    this.createBuildersForSequence(
                        argBuilder,
                        i,
                        nextComma.index - 1
                    );

                    this.seekToIndex(nextComma.index); // skip the comma
                }

                b = new CodeBuilderFunctionMacro(
                    this.sourceMap,
                    inst,
                    this.macroTable.get(inst.key),
                    args,
                    this.writer
                );
                rootBuilder.add(b);
            } else {
                const macro = this.macroTable.get(inst.key);
                b = new CodeBuilderMacro(
                    this.sourceMap,
                    inst,
                    macro,
                    this.writer
                );
                rootBuilder.add(b);

                const t = this.seekToIndex(
                    this.codeIdx + macro.name.length - 1
                ); // skip the macro name
                const i = 0;
            }
        }

        // if there is any text left, add it to the builder
        const startRow = this.row;
        const startCol = this.column;
        const txt = this.seekToIndex(endIndex);
        if (txt.length > 0) {
            b = new CodeBuilderString(
                this.sourceMap,
                txt,
                startRow,
                startCol,
                this.writer
            );
            rootBuilder.add(b);
        }

        return i;
    }

    // private applyMacroInstance(lines: string[], index: number) {
    //     const inst = this.macroInstances[index];
    //     const def = this.macroTable.get(inst.key);
    //     if (def && !inst.disabled) {
    //         if (!!def.args) {
    //             let j = index;
    //             while (
    //                 j++ < this.macroInstances.length &&
    //                 this.macroInstances[j]?.end.row == inst.end.row &&
    //                 this.macroInstances[j]?.end.column <= inst.end.column
    //             ) {
    //                 // scroll forward and apply other macros that occur before the end of this one
    //                 this.applyMacroInstance(lines, j);
    //             }
    //             this.processMacroFunction(lines, inst.key, def, inst);
    //             inst.disabled = true;
    //         } else {
    //             this.processMacro(lines, inst.key, def, inst.start, inst.end);
    //             inst.disabled = true;
    //         }
    //     }
    // }

    /**
     * replaces an instance of a standard macro with its value
     * @param lines array of sourcecode lines
     * @param name macro name
     * @param def macro definition
     * @param sourceStart the starting position in the source doc
     * @param sourceEnd the ending positiong of the macro reference in the source doc
     */
    // private processMacro(
    //     lines: string[],
    //     name: string,
    //     def: MacroDefinition,
    //     sourceStart: IPosition,
    //     sourceEnd: IPosition
    // ) {
    //     const { value } = def;
    //     console.debug(`Processing macro: ${name} => ${value}`);

    //     // compute the start and end of the macro instance using the sourcemap
    //     const start = this.sourceMap.getGeneratedLocation(
    //         sourceStart.row,
    //         sourceStart.column
    //     );
    //     const end = this.sourceMap.getGeneratedLocation(
    //         sourceEnd.row,
    //         sourceEnd.column
    //     );

    //     if (start.row != end.row) {
    //         console.error(
    //             "Macro spans multiple lines, which is not supported: ",
    //             name
    //         );
    //     }

    //     // first, clear all text in `lines[]` between the start and end of the macro instance
    //     let i = start.row;
    //     lines[i] =
    //         lines[i].substring(0, start.column) +
    //         lines[i].substring(end.column);

    //     // now slice in the final value at start.pos
    //     // plus a space to sep the annotation from previous token
    //     const macroMark = ` [[@${name}]]`;
    //     const valueToSub = macroMark + value;
    //     lines[start.row] =
    //         lines[start.row].substring(0, start.column) +
    //         valueToSub +
    //         lines[start.row].substring(start.column);

    //     // now add sourcemaps for the start of the macro and then end
    //     this.sourceMap.addMapping(
    //         start.row,
    //         start.column + macroMark.length,
    //         start.row,
    //         start.column
    //     );
    //     this.sourceMap.addMapping(
    //         start.row,
    //         start.column + valueToSub.length,
    //         end.row,
    //         end.column + 1
    //     );
    // }

    /**
     * Process an occurance of a macro function
     * @param lines source code lines array
     * @param name name of the macro
     * @param def macro definition
     * @param sourceStart start of the macro function occurance
     * @param sourceEnd end of the macro function occurance
     * @param commas position of commas in the macro function occurance
     */
    // private processMacroFunction(
    //     lines: string[],
    //     name: string,
    //     def: MacroDefinition,
    //     instance: MacroInstance
    // ) {
    //     // NTBLA: validate number of args
    //     console.debug("Processing macro function: ", name);

    //     let argMarkedValue = def.markedValue;
    //     const { start, end, commas, openParen, closeParen } = instance;
    //     const { annotation } = def;

    //     let argIdx = 0;
    //     const originPos = this.sourceMap.getGeneratedLocation(
    //         start.row,
    //         start.column
    //     );
    //     // const argOrigin = this.sourceMap.getGeneratedLocation(
    //     //     openParen.row + 1,
    //     //     openParen.column
    //     // );

    //     // add a sourcemap for the start of the macro (past the annotation)
    //     this.sourceMap.addMapping(
    //         start.row,
    //         start.column + annotation.length + 1 + 1, // +1 for space after annotation
    //         originPos.row,
    //         originPos.column
    //     );

    //     // adjust each common position using sourcemap

    //     while (argIdx < def.args.length) {
    //         const argName = def.args[argIdx];
    //         // start position of the arg value
    //         let startPos = {
    //             ...(argIdx == 0 ? openParen : commas[argIdx - 1]),
    //         };

    //         startPos = this.sourceMap.getGeneratedLocation(
    //             startPos.row,
    //             startPos.column + 1,
    //         );

    //         // end position of the arg value
    //         let endPos = {
    //             ...(argIdx == commas.length || commas.length == 0
    //                 ? closeParen
    //                 : commas[argIdx]),
    //         };
    //         endPos = this.sourceMap.getGeneratedLocation(
    //             endPos.row,
    //             endPos.column + 1
    //         );
    //         endPos.column--;

    //         let valToSub = "";
    //         if (startPos.row == endPos.row) {
    //             valToSub = lines[startPos.row].substring(
    //                 startPos.column,
    //                 endPos.column
    //             );
    //         } else {
    //             let j = startPos.row;
    //             while (j <= endPos.row) {
    //                 if (j == startPos.row) {
    //                     valToSub += lines[j].substring(startPos.column);
    //                 } else if (j == endPos.row) {
    //                     valToSub += lines[j].substring(0, endPos.column);
    //                 } else {
    //                     valToSub += lines[j];
    //                 }
    //                 j++;
    //             }
    //         }

    //         // remove newlines to make things easier
    //         valToSub = valToSub.replace(/\n/g, "").trim();

    //         // now substitute the value by appending the arg value just after each arg mark
    //         const mark = `[[@${argName}]]`;

    //         argMarkedValue = argMarkedValue.replace(
    //             new RegExp(escapeRegExp(mark), "g"),
    //             // add a space at the beginning so that the mark combined with potential marco paren doesn't look like an array open
    //             " " + mark + valToSub
    //         );

    //         console.debug(` |- Substituting arg ${argName} => ${valToSub}`);
    //         argIdx++;
    //     } //end of arg loop

    //     // finally, after all marks have been replaced with their values, we'll put the code back together
    //     // first, clear all text in `lines[]` between the start of the macro instance and closing paren, which may be on different lines
    //     let i = start.row;
    //     let j = closeParen.row;

    //     if (i == j) {
    //         lines[i] =
    //             lines[i].substring(0, start.column) +
    //             lines[i].substring(closeParen.column + 1);
    //     } else {
    //         // opening line
    //         lines[i] = lines[i].substring(0, start.column);

    //         // inbetween lines
    //         while (i < j - 1) {
    //             i++;
    //             lines[i] = "";
    //         }
    //         // closing line
    //         if (i != j) lines[j] = lines[j].substring(closeParen.column + 1); // +1 to eat the closing paren
    //     }

    //     // now slice in the final value at start.pos
    //     // plus a space to sep the annotation from previous token
    //     const valueToSub = " " + annotation + argMarkedValue;
    //     lines[start.row] =
    //         lines[start.row].substring(0, start.column) +
    //         valueToSub +
    //         lines[start.row].substring(start.column);

    //     this.sourceMap.addMapping(
    //         i,
    //         originPos.column + valueToSub.length,
    //         closeParen.row,
    //         closeParen.column
    //     );

    //     // the next char after the closing paren should be in the same place
    //     this.sourceMap.addMapping(
    //         closeParen.row,
    //         closeParen.column + 1,
    //         closeParen.row,
    //         closeParen.column + 1
    //     );

    //     this.sourceMap.resort();

    //     const jjj = 0;
    // }
}

class CodeWriter {
    private _code: string = "";

    public get code() {
        return this._code;
    }

    public line = 1;
    public column = 1;

    write(text: string) {
        this._code += text;
        for (let i = 0; i < text.length; i++) {
            if (text[i] == "\n") {
                this.line++;
                this.column = 1;
            } else {
                this.column++;
            }
        }
    }
}

abstract class CodeBuilder {
    constructor(protected sourceMap: SourceMap, protected writer: CodeWriter) {}
    abstract build(index: number): void;
}
class CodeBuilderCollection extends CodeBuilder {
    constructor(
        sourceMap: SourceMap,
        private builders: CodeBuilder[],
        writer: CodeWriter
    ) {
        super(sourceMap, writer);
    }

    build(index: number): void {
        this.builders.forEach((b) => b.build(index));
    }

    public add(builder: CodeBuilder) {
        this.builders.push(builder);
    }
}
class CodeBuilderString extends CodeBuilder {
    hasSourceMap = false;

    constructor(
        sourceMap: SourceMap,
        private value: string,
        private sourceLine: number,
        private sourceColumn: number,
        writer: CodeWriter
    ) {
        super(sourceMap, writer);
    }
    build(index: number): void {
        if (!this.hasSourceMap) {
            this.sourceMap.addMapping(
                this.writer.line,
                this.writer.column + 1,
                this.sourceLine,
                this.sourceColumn
            );
            this.hasSourceMap = true;
        }
        this.writer.write(` ${this.value}`);
    }
}
class CodeBuilderMacro extends CodeBuilder {
    private hasSourceMap = false;

    constructor(
        sourceMap: SourceMap,
        protected inst: MacroInstance,
        protected def: MacroDefinition,
        writer: CodeWriter
    ) {
        super(sourceMap, writer);
    }
    build(index: number) {
        const { start } = this.inst;
        const { annotation, value } = this.def;

        if (!this.hasSourceMap) {
            this.sourceMap.addMapping(
                this.writer.line,
                this.writer.column + 1 + annotation.length,
                start.row,
                start.column
            ); //  +1 for the space
            this.hasSourceMap = true;
        }
        this.writer.write(` ${annotation}${value}`);
    }
}
class CodeBuilderFunctionMacro extends CodeBuilder {
    private hasSourceMap = false;

    constructor(
        sourceMap: SourceMap,
        protected inst: MacroInstance,
        protected def: MacroDefinition,
        protected args: CodeBuilder[],
        writer: CodeWriter
    ) {
        super(sourceMap, writer);
    }
    build(index: number) {
        const origCol = this.writer.column;
        const { start, openParen, closeParen } = this.inst;
        const { annotation, markedValue, name, args: argNames } = this.def;

        if (!this.hasSourceMap) {
            this.sourceMap.addMapping(
                this.writer.line,
                this.writer.column + 1 + annotation.length,
                start.row,
                start.column
            ); //  +1 for the space
            this.hasSourceMap = true;
        }

        this.writer.write(` ${annotation}`);

        // add sourcemap to start of the macro
        this.sourceMap.addMapping(
            this.writer.line,
            this.writer.column,
            start.row,
            start.column
        );

        let i = 0;
        while (i < markedValue.length) {
            if (markedValue.startsWith("[[@", i)) {
                // we've found a mark
                const markEnd = markedValue.indexOf("]]", i) + 2;
                const mark = markedValue.substring(i, markEnd);
                const argIdx = argNames.indexOf(
                    mark.substring(3, mark.length - 2)
                );

                // build arg code

                this.args[argIdx].build(index);

                i = markEnd - 1;
            } else {
                this.writer.write(markedValue[i]);
            }
            i++;
        }

        //code += this.argBuilder.build(index, line, origCol + code.length);

        // add sourcemap to close paren
        //this.writer.write(")");
        this.sourceMap.addMapping(
            this.writer.line,
            this.writer.column,
            closeParen.row,
            closeParen.column
        );
    }
}

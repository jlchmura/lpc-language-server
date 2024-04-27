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

        while (++j < code.length) {
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
            } else if (!code[j].match(/[a-zA-Z]/)) {
                // macros must start with a letter so if it doesn't, skip
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
        // make a first pass for functions only
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

                const seekTxt = this.seekToIndex(inst.openParen.index); // skip the open paren

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
                    this.writer,
                    this.macroTable
                );
                rootBuilder.add(b);
            } else {
                const macro = this.macroTable.get(inst.key);
                b = new CodeBuilderMacro(
                    this.sourceMap,
                    inst,
                    macro,
                    this.writer,
                    this.macroTable
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

    // public onBuild: (str: string) => CodeBuilder[] | undefined = () =>
    //     undefined;
}
class CodeBuilderCollection extends CodeBuilder {
    constructor(
        sourceMap: SourceMap,
        public builders: CodeBuilder[],
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
        writer: CodeWriter,
        private macroTable: MacroTable
    ) {
        super(sourceMap, writer);
    }
    build(index: number) {
        const { start } = this.inst;
        const { annotation } = this.def;
        let { value } = this.def;

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

        // before writing the value, process any nested macros
        // NTBLA: also test for letters
        if (value?.length > 0) {
            const parser = new MacroProcessor(
                this.macroTable,
                new SourceMap(),
                value,
                new SemanticTokenCollection()
            );
            parser.markMacros();
            value = parser.replaceMacros();
        }

        this.writer.write(`${value ?? ""}`);
    }
}
class CodeBuilderFunctionMacro extends CodeBuilder {
    private hasSourceMap = false;

    constructor(
        sourceMap: SourceMap,
        protected inst: MacroInstance,
        protected def: MacroDefinition,
        protected args: CodeBuilder[],
        writer: CodeWriter,
        private macroTable: MacroTable
    ) {
        super(sourceMap, writer);
    }
    build(index: number) {
        const origCol = this.writer.column;
        const { start, openParen, closeParen } = this.inst;
        const { annotation, name, args: argNames } = this.def;
        let { markedValue } = this.def;

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

        // parse the macro value for nested macros
        if (markedValue?.length > 0) {
            const parser = new MacroProcessor(
                this.macroTable,
                new SourceMap(),
                markedValue,
                new SemanticTokenCollection()
            );
            parser.markMacros();
            markedValue = parser.replaceMacros();
        }

        let i = 0;
        while (i < markedValue.length) {
            if (markedValue.startsWith("[[@", i)) {
                // we've found a mark
                const markEnd = markedValue.indexOf("]]", i) + 2;
                const mark = markedValue.substring(i, markEnd);
                const argIdx = argNames.indexOf(
                    mark.substring(3, mark.length - 2)
                );

                // there may be marks in there for submacros,
                // so those won't be found in the arg table
                if (argIdx >= 0) {
                    // build arg code
                    this.args[argIdx].build(index);
                } else {
                    // not an arg, so we can drop this mark
                }
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

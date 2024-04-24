import { IPosition, MacroDefinition } from "../types";
import { escapeRegExp } from "../utils";

export type MacroTable = Map<string, MacroDefinition>;

type MacroInstance = {
    key: string;
    start: IPosition;
    end: IPosition;
    commas: IPosition[];
};

export class MacroProcessor {
    private commaPos: IPosition[];
    private closingParenPos: IPosition;
    private openParenPos: IPosition;

    constructor(private macroTable: MacroTable, private code: string) {}

    /**
     * process the current line and tag all instances of macros
     * @param line
     * @param macros
     */
    public markMacros() {
        // first, find all macro instances in the code
        const macroInstances = this.findMacroInstances();
        console.debug("Found macro instances: ", macroInstances);
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
                    const commas: IPosition[] = [];

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
                                    break;
                                case '"':
                                    if (!subEscape) {
                                        openQuote = !openQuote;
                                    }
                                    break;
                                case ",":
                                    if (!openQuote && openCharCount == 1) {
                                        // this is a comma that separates arguments
                                        commas.push({ row: r, column: c });
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
                    } // end of macro-function test

                    instances.push({ key, start, end, commas });
                } else {
                    inEsc = false; // turn off escape
                }
            }
        }

        return instances;
    }

    // NTBLA: validate number of args
    public processMacroFunction(
        lines: string[],
        name: string,
        def: MacroDefinition,
        pos: IPosition
    ) {
        console.debug("Processing macro function: ", name);

        // now find location of commas in the macro call
        this.identifyCommas(lines, {
            row: pos.row,
            column: pos.column + name.length,
        });

        let argMarkedValue = def.markedValue;

        let argIdx = 0;
        while (argIdx < def.args.length) {
            const argName = def.args[argIdx];
            // start position of the arg value
            const startPos = {
                ...(argIdx == 0
                    ? this.openParenPos
                    : this.commaPos[argIdx - 1]),
            };
            startPos.column++;
            // end position of the arg value
            const endPos = {
                ...(argIdx == this.commaPos.length || this.commaPos.length == 0
                    ? this.closingParenPos
                    : this.commaPos[argIdx]),
            };

            let valToSub = "";
            if (startPos.row == endPos.row) {
                valToSub = lines[startPos.row].substring(
                    startPos.column,
                    endPos.column
                );
            } else {
                let j = startPos.row;
                while (j <= endPos.row) {
                    if (j == startPos.row) {
                        valToSub += lines[j].substring(startPos.column);
                    } else if (j == endPos.row) {
                        valToSub += lines[j].substring(0, endPos.column);
                    } else {
                        valToSub += lines[j];
                    }
                    j++;
                }
            }

            // remove newlines to make things easier
            valToSub = valToSub.replace(/\n/g, "").trim();

            // now substitute the value by appending the arg value just after each arg mark
            const mark = `[[@${argName}]]`;

            argMarkedValue = argMarkedValue.replace(
                new RegExp(escapeRegExp(mark), "g"),
                // add a space at the beginning so that the mark combined with potential marco paren doesn't look like an array open
                " " + mark + valToSub
            );

            console.debug(` |- Substituting arg ${argName} => ${valToSub}`);
            argIdx++;
        }

        // finally, after all marks have been replaced with their values, we'll put the code back together
        // first, clear all text in `lines[]` between the start of the macro instance and closing paren, which may be on different lines
        let i = pos.row;
        let j = this.closingParenPos.row;

        if (i == j) {
            lines[i] =
                lines[i].substring(0, pos.column) +
                lines[i].substring(this.closingParenPos.column + 1);
        } else {
            // opening line
            lines[i] = lines[i].substring(0, pos.column);
            // inbetween lines
            while (i < j) {
                i++;
                lines[i] = "";
            }
            // closing line
            if (i != j)
                lines[j] = lines[j].substring(this.closingParenPos.column);
        }

        // now slice in the final value at start.pos
        // plus a space to sep the annotation from previous token
        const macroMark = ` [[@${name}]]`;
        const valueToSub = macroMark + argMarkedValue;
        lines[pos.row] =
            lines[pos.row].substring(0, pos.column) +
            valueToSub +
            lines[pos.row].substring(pos.column);

        const jjj = 0;
    }

    public identifyCommas(lines: string[], pos: IPosition): void {
        const i = pos.row,
            start = pos.column;

        this.commaPos = [];
        this.closingParenPos = undefined;
        this.openParenPos = undefined;

        // we need to identify the line & column of each comma
        // as well as the final closing paren.  a comma only counts if it is not
        // inside a known set of characters: (, [, "
        let j = i,
            col = start,
            curLine: string;
        let openCharCount = 0,
            openQuote = false;
        while (!this.closingParenPos && j < lines.length) {
            curLine = lines[j];
            while (!this.closingParenPos && col < curLine.length) {
                switch (curLine[col]) {
                    case "(":
                    case "[":
                        if (openCharCount == 0 && curLine[col] == "(") {
                            this.openParenPos = {
                                row: j,
                                column: col,
                            };
                        }
                        openCharCount++;
                        break;
                    case ",":
                        // there will always be one for the opening paren of the macro
                        if (openCharCount == 1) {
                            this.commaPos.push({
                                row: j,
                                column: col,
                            });
                        }
                        break;
                    case ")":
                    case "]":
                        openCharCount--;
                        if (openCharCount == 0) {
                            // this is the end of the macro
                            this.closingParenPos = {
                                row: j,
                                column: col,
                            };
                        }
                        break;
                    case '"':
                        if (!openQuote) {
                            openQuote = true;
                            openCharCount++;
                        } else if (col > 0 && curLine[col - 1] != "\\") {
                            // not an escaped quote
                            // and there is an open quote, so this must be the close
                            openQuote = false;
                            openCharCount--;
                        }
                        break;
                }
                col++;
            }
            j++;
            col = 0;
        }
    }
}

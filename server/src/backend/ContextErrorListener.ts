/*
 * Original Source: https://github.com/mike-lischke/vscode-antlr4
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
    BaseErrorListener,
    Recognizer,
    RecognitionException,
    Token,
    ATNSimulator,
} from "antlr4ng";

import { IDiagnosticEntry } from "../types";
import { DiagnosticSeverity } from "vscode-languageserver";

export class ContextErrorListener extends BaseErrorListener {
    public constructor(private errorList: IDiagnosticEntry[]) {
        super();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public override syntaxError<S extends Token, T extends ATNSimulator>(
        recognizer: Recognizer<T>,
        offendingSymbol: S | null,
        line: number,
        column: number,
        msg: string,
        _e: RecognitionException | null
    ): void {
        const error: IDiagnosticEntry = {
            type: DiagnosticSeverity.Error,
            message: msg,
            range: {
                start: {
                    column,
                    row: line,
                },
                end: {
                    column: column + 1,
                    row: line,
                },
            },
        };

        if (offendingSymbol) {
            error.range.end.column =
                column + offendingSymbol.stop - offendingSymbol.start + 1;
        }
        this.errorList.push(error);
    }
}

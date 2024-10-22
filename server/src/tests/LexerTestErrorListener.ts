// import {
//     ATNSimulator,
//     BaseErrorListener,
//     RecognitionException,
//     Recognizer,
//     Token,
// } from "antlr4ng";
// import { IDiagnosticEntry } from "../types";
// import { DiagnosticSeverity } from "vscode-languageserver";

// export class LexerTextErrorListener extends BaseErrorListener {
//     public constructor(private errorList: IDiagnosticEntry[]) {
//         super();
//     }

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     public override syntaxError<S extends Token, T extends ATNSimulator>(
//         _recognizer: Recognizer<T>,
//         _offendingSymbol: S | null,
//         line: number,
//         column: number,
//         msg: string,
//         _e: RecognitionException | null
//     ): void {
//         const error: IDiagnosticEntry = {
//             type: DiagnosticSeverity.Error,
//             message: msg,
//             range: {
//                 start: {
//                     column,
//                     row: line,
//                 },
//                 end: {
//                     column: column + 1,
//                     row: line,
//                 },
//             },
//         };

//         this.errorList.push(error);
//     }
// }

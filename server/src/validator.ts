import {
  ANTLRErrorListener,
  ATNConfigSet,
  ATNSimulator,
  BaseErrorListener,
  DFA,
  Parser,
  RecognitionException,
  Recognizer,
  Token,
} from "antlr4ng";
import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";

export class VSCodeANTLRErrorListener extends BaseErrorListener {
  private diaognostics: Diagnostic[] = [];

  public getDiaognostics(): Diagnostic[] {
    return this.diaognostics;
  }

  constructor(private doc: TextDocument, private uri: string) {
    super();
  }

  syntaxError<S extends Token, T extends ATNSimulator>(
    recognizer: Recognizer<T>,
    offendingSymbol: S | null,
    line: number,
    column: number,
    msg: string,
    e: RecognitionException | null
  ) {
    const diagnostic = Diagnostic.create(
      {
        start: {
          line: offendingSymbol.line - 1,
          character: offendingSymbol.column,
        },
        end: {
          line: offendingSymbol.line - 1,
          character: offendingSymbol.column + 1,
        },
      },
      msg,
      DiagnosticSeverity.Error
    );

    this.diaognostics.push(diagnostic);
  }
}

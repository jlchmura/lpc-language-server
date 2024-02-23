import { CharStreams, CommonTokenStream } from "antlr4ng";
import { Hover, Range } from "vscode-languageserver";
import { Position, TextDocument } from "vscode-languageserver-textdocument";
import { LPCLexer } from "./parser3/LPCLexer";
import {
  LPCParser,
  ProgramContext,
  VariableDeclarationContext,
} from "./parser3/LPCParser";
import { CaretPosition } from "./completions";
import { computeTokenPosition } from "./tokenposition";
import { SymbolTableVisitor } from "./symbolTableVisitor";

export function doHover(
  document: TextDocument,
  position: Position,
  settings = {}
): Hover | null {
  const code = document.getText();

  let input = CharStreams.fromString(code);
  let lexer = new LPCLexer(input);
  let tokenStream = new CommonTokenStream(lexer);
  let parser = new LPCParser(tokenStream);

  let parseTree: ProgramContext;

  try {
    parseTree = parser.program();
  } catch (e) {
    return null;
  }

  const symVis= new SymbolTableVisitor().visit(parseTree);
    const symbols = symVis.getAllNestedSymbolsSync().filter(s => {

    });
  // compute caretPosition from position.line & .character
  let caretPos: CaretPosition = {
    line: position.line + 1,
    column: position.character,
  };

  const token = computeTokenPosition(parseTree, tokenStream, caretPos);

  if (token?.context instanceof VariableDeclarationContext) {
    return {
      contents: `Hover for variable ${token.context.getText()}`,
      range: Range.create(
        token.token.start,
        token.token.column,
        token.token.stop,
        token.token.column + token.token.text.length
      ),
    };
  } else {
    return {
      contents: `This is a hover for ${token?.text}`,
    };
  }

  
}

import {
  Definition,
  DefinitionLink,
  Location,
  LocationLink,
  Position,
  Range,
} from "vscode-languageserver";
import { SymbolTableVisitor } from "./symbolTableVisitor";
import { CharStreams, CommonTokenStream, ParserRuleContext } from "antlr4ng";
import { LPCLexer } from "./parser3/LPCLexer";
import { LPCParser, ProgramContext } from "./parser3/LPCParser";
import {
  MethodSymbol,
  ScopedSymbol,
  SymbolTable,
  VariableSymbol,
} from "antlr4-c3/index";
import { getSelectionRange } from "./utils";
import { TextDocument } from "vscode-languageserver-textdocument";
import { CaretPosition } from "./completions";
import { computeTokenPosition } from "./tokenposition";

export function getDefinitions(
  doc: TextDocument,
  code: string,
  caretPosition: CaretPosition
): Definition | DefinitionLink[] {
  const locations: DefinitionLink[] = [];

  let input = CharStreams.fromString(code);
  let lexer = new LPCLexer(input);
  let tokenStream = new CommonTokenStream(lexer);
  let parser = new LPCParser(tokenStream);

  let parseTree: ProgramContext;

  try {
    parseTree = parser.program();
  } catch (e) {
    return [];
  }

  // find the token at this position and get its name
  const position = computeTokenPosition(parseTree, tokenStream, caretPosition);
  if (!position) return [];
  
  const token = position.token;
  let nameToFind = position.token.text;

  // since LPC allows string literals to be used as identifiers, remove the quotes
  // so we can stil find functions that corespond to this string
  if (position.token.type == LPCParser.StringLiteral) {
    nameToFind = nameToFind.slice(1, -1); // remove quotes
  }

  console.log("Looking for definition of " + nameToFind);

  const symbols = new SymbolTableVisitor().visit(parseTree);

  // find symbols that match the name
  symbols
    .getAllNestedSymbolsSync()
    .filter((s) => s.name == nameToFind)
    .forEach((s) => {
      const ctx = (s.context ?? s.parent?.context) as ParserRuleContext;
      if (!ctx) return;

      const name = s.name;

      const rng = getSelectionRange(ctx);
      const origRng = Range.create(
        Position.create(token.line - 1, token.start),
        Position.create(token.line - 1, token.stop)
      );
      
      locations.push(LocationLink.create(doc.uri, rng, rng, origRng));
    });

  return locations;
}

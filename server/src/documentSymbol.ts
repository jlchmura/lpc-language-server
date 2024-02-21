import {
  CancellationToken,
  DocumentSymbol,
  FoldingRange,
  Position,
  Range,
  SymbolKind,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { SymbolTableVisitor } from "./symbolTableVisitor";
import { CharStreams, CommonTokenStream, ParserRuleContext } from "antlr4ng";
import { LPCLexer } from "./parser3/LPCLexer";
import { LPCParser, ProgramContext } from "./parser3/LPCParser";
import { MethodSymbol, ScopedSymbol, SymbolTable, VariableSymbol } from "antlr4-c3/index";
import { getSelectionRange } from "./utils";


 export function getDocumentSymbols(code:string): DocumentSymbol[] {  
  let results: DocumentSymbol[] = [];

  let input = CharStreams.fromString(code);
  let lexer = new LPCLexer(input);
  let tokenStream = new CommonTokenStream(lexer);
  let parser = new LPCParser(tokenStream);
  
  let parseTree:ProgramContext;
  
  try {
    parseTree = parser.program();
  }catch (e) {
    return [];
  }

  const symbols = new SymbolTableVisitor().visit(parseTree);

  // functions
  symbols.getAllNestedSymbolsSync().filter(s => s instanceof MethodSymbol && !!s).forEach((s:MethodSymbol) => {
    const ctx = s.context as ParserRuleContext;  
    if (!ctx) return;

    const rng = getSelectionRange(ctx);
    const vars = getVariableSymbols(s);

    results.push(DocumentSymbol.create(s.name, "", SymbolKind.Function, rng, rng, vars));    
  });

  results.push(...getVariableSymbols(symbols));
  
  return results;

 }

function getVariableSymbols(symbols:ScopedSymbol):DocumentSymbol[] {
  return symbols.getAllNestedSymbolsSync().filter(s => s instanceof VariableSymbol).map((s:VariableSymbol) => {
    const ctx = s.context as ParserRuleContext;  
    if (!ctx) return;

    const rng = getSelectionRange(ctx);

    return DocumentSymbol.create(s.name, s?.type?.name, SymbolKind.Variable, rng, rng);    
  }).filter(s=>!!s) || [];
}



//   const ast = ParseLPC(document.getText());
//   return getDocumentSymbolsFromAst(document, ast);
// }
// export function getDocumentSymbolsFromAst(
//   document: TextDocument,
//   ast: LPCDocument
// ): DocumentSymbol[] {
//   const results: DocumentSymbol[] = [];

//   ast.roots.forEach((node) => {
//     const posStart = document.positionAt(node.start);
//     const posEnd = document.positionAt(node.end);
//     const rng = Range.create(posStart, posEnd);

//     if (node.type == "function") {
//       const fn = node as FunctionDeclarationNode;

//       results.push({
//         kind: SymbolKind.Function,
//         name: fn?.id?.name || "",
//         selectionRange: rng,
//         range: rng,
//       });
//     } else if (node.type == "var-decl") {
//       const v = node as VariableDeclarationNode;
//       const vStart = document.positionAt(v.start);
//       const vEnd = document.positionAt(v.end);
//       v.declarations.forEach((d) => {
//         results.push({
//           kind: SymbolKind.Variable,
//           name: d?.id?.attributes?.name || "",
//           range: rng,
//           selectionRange: Range.create(vStart, vEnd),
//           detail: v.varType?.name,
//         });
//       });
//     }
//   });

//   return results;
// }


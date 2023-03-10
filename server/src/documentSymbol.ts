import {
  CancellationToken,
  DocumentSymbol,
  FoldingRange,
  Position,
  Range,
  SymbolKind,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";

import { LPCDocument, ParseLPC } from "./parser";
import {
  FunctionDeclarationNode,
  LPCNode,
  VariableDeclarationNode,
} from "./parser/nodeTypes";

export function getDocumentSymbols(document: TextDocument): DocumentSymbol[] {
  const ast = ParseLPC(document.getText());
  return getDocumentSymbolsFromAst(document, ast);
}
export function getDocumentSymbolsFromAst(
  document: TextDocument,
  ast: LPCDocument
): DocumentSymbol[] {
  const results: DocumentSymbol[] = [];

  ast.roots.forEach((node) => {
    const posStart = document.positionAt(node.start);
    const posEnd = document.positionAt(node.end);
    const rng = Range.create(posStart, posEnd);

    if (node.type == "function") {
      const fn = node as FunctionDeclarationNode;

      results.push({
        kind: SymbolKind.Function,
        name: fn?.id?.name || "",
        selectionRange: rng,
        range: rng,
      });
    } else if (node.type == "var-decl") {
      const v = node as VariableDeclarationNode;
      const vStart = document.positionAt(v.start);
      const vEnd = document.positionAt(v.end);
      v.declarations.forEach((d) => {
        results.push({
          kind: SymbolKind.Variable,
          name: d?.id?.name || "",
          range: rng,
          selectionRange: Range.create(vStart, vEnd),
          detail: v.varType?.name,
        });
      });
    }
  });

  return results;
}


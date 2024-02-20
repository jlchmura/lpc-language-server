import { DocumentHighlight, Location, Range } from "vscode-languageserver";
import { Position, TextDocument } from "vscode-languageserver-textdocument";
// import { getDocumentSymbols, getDocumentSymbolsFromAst } from "./documentSymbol";
// import { LPCDocument } from "./parser";
// import { LPCNode } from "./parser/nodeTypes";

// function getRange(node: LPCNode, document: TextDocument): Range {
// 	return Range.create(document.positionAt(node.start), document.positionAt(node.end));
// }

// export class LPCNavigation {
// 	private getHighlightNode(document: TextDocument, position: Position, ast: LPCDocument): LPCNode | undefined {
// 		const offset = document.offsetAt(position);
// 		let node = ast.findNodeAt(offset);
// 		if (!node) {
// 			return;
// 		}
// 		if (node.type === "identifier" && node.parent && node.parent.type === "function") {
// 			node = node.parent;
// 		}

// 		return node;
// 	}

//     private getNodeText(document: TextDocument, node: LPCNode) {
//         return document.getText().substring(node.start, node.end);
//     }

// 	public findDefinition(document: TextDocument, position: Position,ast: LPCDocument): Location | null {

// 		const symbols = getDocumentSymbolsFromAst(document,ast);
// 		const offset = document.offsetAt(position);
// 		const node = ast.findNodeAt(offset);

// 		if (!node) {
// 			return null;
// 		}
        
//         const txt = document.getText().substring(node.start, node.end);
//         const symbol = symbols.find(s => s.name == txt);

// 		if (!symbol) {
// 			return null;
// 		}

// 		return {
// 			uri: document.uri,
// 			range: symbol.selectionRange
// 		};
// 	}

//     public findDocumentHighlights(document: TextDocument, position: Position, ast: LPCDocument): DocumentHighlight[] {
// 		const result: DocumentHighlight[] = [];
// 		const node = this.getHighlightNode(document, position, ast);
// 		if (!node) {
// 			return result;
// 		}

// 		const symbols = getDocumentSymbolsFromAst(document, ast);
// 		//const symbol = symbols.findSymbolFromNode(node);
// 		const name = this.getNodeText(document, node);

// 		// stylesheet.accept(candidate => {
// 		// 	if (symbol) {
// 		// 		if (symbols.matchesSymbol(candidate, symbol)) {
// 		// 			result.push({
// 		// 				kind: getHighlightKind(candidate),
// 		// 				range: getRange(candidate, document)
// 		// 			});
// 		// 			return false;
// 		// 		}
// 		// 	} else if (node && node.type === candidate.type && candidate.matches(name)) {
// 		// 		// Same node type and data
// 		// 		result.push({
// 		// 			kind: getHighlightKind(candidate),
// 		// 			range: getRange(candidate, document)
// 		// 		});
// 		// 	}
// 		// 	return true;
// 		// });

// 		return result;
// 	}

// }
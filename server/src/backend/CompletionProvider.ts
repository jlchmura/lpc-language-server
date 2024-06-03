import { TextDocument } from "vscode-languageserver-textdocument";
import { LpcFacade } from "./facade";
import {
    CompletionItem,
    CompletionItemKind,
    InsertTextFormat,
    MarkupContent,
    Position,
    Range,
    TextEdit,
    integer,
} from "vscode-languageserver";
import {
    completionDetails,
    completionSortKeys,
    generateSymbolDoc,
    translateCompletionKind,
} from "../symbols/Symbol";

import { LpcBaseMethodSymbol, MethodSymbol } from "../symbols/methodSymbol";
import { LpcTypes, SymbolKind } from "../types";
import { ArrowSymbol } from "../symbols/arrowSymbol";
import { ContextSymbolTable } from "./ContextSymbolTable";
import { VariableSymbol } from "../symbols/variableSymbol";
import { BaseSymbol, ScopedSymbol, SymbolTable } from "antlr4-c3";

import { getSelfOrParentOfType, getSymbolsFromAllParents } from "../utils";
import { EfunSymbols } from "../driver/EfunsLDMud";

export class CompletionProvider {
    constructor(private backend: LpcFacade) {}

    public async provideCompletionItems(
        document: TextDocument,
        position: Position
    ): Promise<CompletionItem[]> {
        if (isPotentiallyValidDocCompletionPosition(document, position)) {
            return this.provideDocCommentCompletion(document, position);
        } else {
            return this.provideCodeCompletionItems(document, position);
        }
    }

    public resolveCompletionItem(item: CompletionItem): CompletionItem {
        const sourceCtx = this.backend.getContext(item.data.source);
        if (item.label == "/** */") {
            return item;
        } else {
            const info =
                sourceCtx?.getSymbolInfo(item.label) ??
                EfunSymbols.getSymbolInfo(item.label);
            if (!!info) {
                item.detail =
                    info.description !== undefined
                        ? info.description
                        : completionDetails.get(info.kind);

                item.documentation = {
                    value: generateSymbolDoc(info.symbol),
                    kind: "markdown",
                } as MarkupContent;
            }
            return item;
        }
    }

    private async provideCodeCompletionItems(
        document: TextDocument,
        position: Position
    ): Promise<CompletionItem[]> {
        const lineNum = position.line;
        const line = document.getText(
            Range.create(lineNum, 0, lineNum, integer.MAX_VALUE)
        );

        // get the current symbol
        const searchPosition = Position.create(
            position.line + 1,
            position.character
        );
        let symbol = this.backend.symbolContainingPosition(
            document.uri,
            searchPosition
        );

        // use arrow parent if we're on an arrow symbol
        if (symbol.parent instanceof ArrowSymbol) symbol = symbol.parent;

        const symbolTable = this.backend.getContext(document.uri)?.symbolTable;
        const symbols: BaseSymbol[] = [];

        if (symbol instanceof SymbolTable) {
            // program level
            symbols.push(
                ...(await symbolTable.getAllSymbols(MethodSymbol, false)),
                ...(await symbolTable.getAllSymbols(VariableSymbol, false))
            );
        } else if (symbol instanceof ArrowSymbol) {
            symbols.push(
                ...(await getSymbolsFromAllParents(
                    symbol.symbolTable,
                    MethodSymbol,
                    false,
                    true
                ))
            );
        } else if (
            symbol instanceof MethodSymbol ||
            symbol.symbolPath.some((p) => p instanceof MethodSymbol)
        ) {
            // get the first scoped parent
            const scope = getSelfOrParentOfType(symbol, ScopedSymbol);

            symbols.push(
                ...(await symbolTable.getAllSymbols(MethodSymbol, false)), // any method symbol is valid
                ...(await getSymbolsFromAllParents(
                    scope,
                    VariableSymbol,
                    false
                )) // variables start w/ this scope and go up
            );
        } else {
            console.debug("[COMPLETE] " + symbol.context, symbol);
        }

        if (symbols.length > 0) {
            // dedupe symbols based on name
            const dedupedSymbols = new Map<string, BaseSymbol>();
            symbols.forEach((s) => {
                dedupedSymbols.set(s.name, s);
            });

            const results: CompletionItem[] = [];
            dedupedSymbols.forEach((s) => {
                const kind =
                    (s as LpcBaseMethodSymbol)?.kind ?? SymbolKind.Unknown;
                const item = CompletionItem.create(s.name);
                item.kind = translateCompletionKind(kind);
                item.sortText = (completionSortKeys.get(kind) ?? "99") + s.name;
                item.data = {
                    source: (s.symbolTable as ContextSymbolTable)?.owner
                        ?.fileName,
                };
                results.push(item);
            });

            return results;
        }

        return this.backend
            .getCodeCompletionCandidates(
                document.uri,
                position.character,
                position.line + 1
            )
            .then((candidates) => {
                const completionList: CompletionItem[] = [];
                candidates.forEach((c) => {
                    const item = CompletionItem.create(c.name);
                    item.data = {
                        source: c.source,
                    };
                    item.kind = translateCompletionKind(c.kind);
                    item.sortText =
                        (completionSortKeys.get(c.kind) ?? "99") + c.name;

                    completionList.push(item);
                });
                return completionList;
            });
    }

    private provideDocCommentCompletion(
        document: TextDocument,
        position: Position
    ): CompletionItem[] {
        // doc comment

        // find the range of the comment
        const lineNum = position.line;
        const line = document.getText(
            Range.create(lineNum, 0, lineNum, integer.MAX_VALUE)
        );
        const prefix = line.slice(0, position.character).match(/\/\**\s*$/);
        const suffix = line.slice(position.character).match(/^\s*\**\//);

        const start = {
            ...position,
            character: position.character + (prefix ? -prefix[0].length : 0),
        };
        const end = {
            ...start,
            character: position.character + (suffix ? suffix[0].length : 0),
        };
        const range = Range.create(start, end);

        // find the next symbol
        let paramText: string = "";
        const searchPosition = Position.create(
            position.line + 1,
            position.character - 1
        );
        const symbol = this.backend.symbolContainingPosition(
            document.uri,
            searchPosition
        );

        if (!!symbol) {
            if (symbol instanceof MethodSymbol) {
                // if this is a method, add the params and return type to the snippet
                let paramIdx = 1;
                const paramSymbols = symbol.getParametersSync();
                paramSymbols.forEach((param) => {
                    const typeString = !!param.type
                        ? ` \{${param.type.name}\}`
                        : "";
                    paramText += `\n * @param${typeString} ${param.name} \$${paramIdx}`;
                    paramIdx++;
                });

                // return type
                const returnType = symbol.returnType;
                if (!!returnType && returnType != LpcTypes.voidType) {
                    const typeString = ` {${returnType.name}} \$${paramIdx}`;
                    paramText += `\n * @return${typeString}`;
                }
            }
        }

        // construct the replacement
        return [
            {
                label: "/** */",
                data: {
                    position: position,
                    uri: document.uri,
                },
                kind: CompletionItemKind.Text,
                sortText: "00/**",
                detail: "Doc Comment",
                // use a textedit to replace the range with the snippet
                textEdit: TextEdit.replace(
                    range,
                    `/**\n * \$0${paramText}\n */`
                ),
                insertTextFormat: InsertTextFormat.Snippet,
            },
        ];
    }
}

export function isPotentiallyValidDocCompletionPosition(
    document: TextDocument,
    position: Position
): boolean {
    // Only show the JSdoc completion when the everything before the cursor is whitespace
    // or could be the opening of a comment
    const lineNum = position.line;
    const line = document.getText(
        Range.create(lineNum, 0, lineNum, integer.MAX_VALUE)
    );
    const prefix = line.slice(0, position.character);
    if (
        !prefix.endsWith("*") ||
        !/^\s*$|\/\*\*\s*$|^\s*\/\*\*+\s*$/.test(prefix)
    ) {
        return false;
    }

    // And everything after is possibly a closing comment or more whitespace
    const suffix = line.slice(position.character);
    return /^\s*(\*+\/)?\s*$/.test(suffix);
}

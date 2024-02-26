import { TextDocument } from "vscode-languageserver-textdocument";
import { LpcFacade } from "./facade";
import {
  CancellationToken,
  Location,
  Range,
  SymbolInformation,
} from "vscode-languageserver";
import { URI } from "vscode-uri";
import { SymbolKind } from "../types";
import { symbolDescriptionFromEnum, translateSymbolKind } from "./Symbol";

export class LpcSymbolProvider {
  constructor(private backend: LpcFacade) {}

  public getSymbols(document: TextDocument) {
    const symbols = this.backend.listTopLevelSymbols(document.uri, false);
    const symbolsList: SymbolInformation[] = [];

    for (const symbol of symbols) {
      if (!symbol.definition) {
        continue;
      }

      const startRow =
        symbol.definition.range.start.row > 0
          ? symbol.definition.range.start.row - 1
          : 0;
      const endRow =
        symbol.definition.range.end.row > 0
          ? symbol.definition.range.end.row - 1
          : 0;
      const range = Range.create(
        startRow,
        symbol.definition.range.start.column,
        endRow,
        symbol.definition.range.end.column
      );
      //const location = Location.create(symbol.source, range);

      //let description = symbolDescriptionFromEnum(symbol.kind);
      const kind = translateSymbolKind(symbol.kind);
      //const totalTextLength = symbol.name.length + description.length + 1;
      // if (symbol.kind === SymbolKind.LexerMode && totalTextLength < 80) {
      //     // Add a marker to show parts which belong to a particular lexer mode.
      //     // Not 100% perfect (i.e. right aligned, as symbol and description use different fonts),
      //     // but good enough.
      //     const markerWidth = 80 - totalTextLength;
      //     description += " " + "-".repeat(markerWidth);
      // }
      const info = SymbolInformation.create(
        symbol.name,
        kind,
        range,
        symbol.source
      );
      symbolsList.push(info);
    }

    return symbolsList;
  }
}

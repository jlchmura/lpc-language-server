import { Location, LocationLink, Position, Range } from "vscode-languageserver";
import { LpcFacade } from "./facade";
import { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";

export class LpcDefinitionProvider {
    constructor(private backend: LpcFacade) {}

    public getDefinition(document: TextDocument, position: Position): LocationLink[] {
        const info = this.backend.symbolInfoAtPosition(
            document.uri,
            position.character,
            position.line + 1,
            true
        );
        if (!info) return null;

        // VS code shows the text for the range given here on holding ctrl/cmd, which is rather
        // useless given that we show this info already in the hover provider. So, in order
        // to limit the amount of text we only pass on the smallest range which is possible.
        // Yet we need the correct start position to not break the goto-definition feature.
        if (info.definition) {
            const range = Range.create(
                info.definition.range.start.row - 1,
                info.definition.range.start.column,
                info.definition.range.end.row - 1,
                info.definition.range.end.column
            );

            return [LocationLink.create(info.source, range, range)];
        } else {
            // Empty for built-in entities.
            return [LocationLink.create("", Range.create(0, 0, 0, 0), Range.create(0, 0, 0, 0))];
        }
    }
}

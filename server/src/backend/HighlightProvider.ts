import {
    DocumentHighlight,
    DocumentHighlightKind,
    Position,
} from "vscode-languageserver";
import { LpcFacade } from "./facade";
import { firstEntry, lexRangeToLspRange } from "../utils";

export class HighlightProvider {
    constructor(private backend: LpcFacade) {}

    public getHighlights(uri: string, position: Position): DocumentHighlight[] {
        const filename = uri;
        const info = firstEntry(
            this.backend.symbolInfoAtPosition(
                filename,
                position.character,
                position.line + 1,
                true
            )
        );
        if (!info) return [];

        const occs = this.backend.getHighlights(filename, info.name);
        console.debug("highlights", occs);
        return occs;
    }
}

import { DocumentHighlight } from "vscode-languageserver";
import { LpcFacade } from "./facade";

export class HighlightProvider {
    constructor(private backend: LpcFacade) {}

    public getHighlights(uri: string): DocumentHighlight[] {
        return [];
    }
}

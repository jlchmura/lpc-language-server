import { LPCParser } from "../parser3/LPCParser";

export class TestParser extends LPCParser {
    override addContextToParseTree(): void {
        // add current context to parent if we have a parent
        if (this.context?.parent !== null) {
            this.context!.parent.addChild(this.context!);
        }
    }
}

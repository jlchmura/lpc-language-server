import {
    ATNSimulator,
    BaseErrorListener,
    RecognitionException,
    Recognizer,
} from "antlr4ng";
import { LPCToken } from "./parser3/LPCToken";

export class ConsoleErrorListener extends BaseErrorListener {
    /**
     * Provides a default instance of {@link ConsoleErrorListener}.
     */
    public static readonly instance = new ConsoleErrorListener();

    public override syntaxError<T extends ATNSimulator>(
        recognizer: Recognizer<T> | null,
        offendingSymbol: unknown,
        line: number,
        charPositionInLine: number,
        msg: string | null,
        _e: RecognitionException | null
    ): void {
        const lt = offendingSymbol as LPCToken;
        console.error(
            lt.filename + ":" + line + ":" + charPositionInLine + " " + msg
        );
    }
}

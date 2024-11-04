import { LanguageServiceHost } from "./_namespaces/lpc.js";

export interface SessionClientHost extends LanguageServiceHost {
    writeMessage(message: string): void;
}
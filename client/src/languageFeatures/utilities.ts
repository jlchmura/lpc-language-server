import * as vscode from 'vscode';

export function toOpenLpcFilePath(document: vscode.TextDocument): string | undefined {
    if (document.uri.scheme === 'file') {
        return document.uri.fsPath;
    }
    return undefined;
}
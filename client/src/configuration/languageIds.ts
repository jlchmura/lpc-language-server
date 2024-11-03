/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';

export const lpc = 'lpc';
export const javascript = 'javascript';

export const lpcLanguageModes = [
	lpc
];

export function isSupportedLanguageMode(doc: vscode.TextDocument) {
	return vscode.languages.match([lpc], doc) > 0;
}

export function isLpcDocument(doc: vscode.TextDocument) {
	return vscode.languages.match([lpc], doc) > 0;
}

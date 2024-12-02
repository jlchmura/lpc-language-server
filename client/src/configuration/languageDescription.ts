/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { basename } from 'path';
import * as vscode from 'vscode';
import * as languageIds from './languageIds';

export const enum DiagnosticLanguage {
	JavaScript,
	TypeScript
}

export const allDiagnosticLanguages = [DiagnosticLanguage.JavaScript, DiagnosticLanguage.TypeScript];

export interface LanguageDescription {
	readonly id: string;
	readonly diagnosticOwner: string;
	readonly diagnosticSource: string;
	readonly diagnosticLanguage: DiagnosticLanguage;
	readonly languageIds: readonly string[];
	readonly configFilePattern?: RegExp;
	readonly isExternal?: boolean;
	readonly standardFileExtensions: readonly string[];
}

export const standardLanguageDescriptions: LanguageDescription[] = [
	{
		id: 'typescript',
		diagnosticOwner: 'typescript',
		diagnosticSource: 'ts',
		diagnosticLanguage: DiagnosticLanguage.TypeScript,
		languageIds: [languageIds.lpc],
		configFilePattern: /^lpc-config(\..*)?\.json$/i,
		standardFileExtensions: [
			'c',
			'h',
			'lpc'
		],
	}
];

export function isLpcConfigFileName(fileName: string): boolean {
	return /^lpc-config\.(.+\.)?json$/i.test(basename(fileName));
}


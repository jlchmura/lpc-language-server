import * as vscode from 'vscode';
import * as Proto from '../protocol/protocol';
import * as typeConverters from "../typeConverters";
import { LanguageDescription } from '../configuration/languageDescription';
import { toOpenLpcFilePath } from './utilities';
import { LanguageClient } from 'vscode-languageclient/node';
import { DocumentSelector } from '../documentSelector';

const defaultJsDoc = new vscode.SnippetString(`/**\n * $0\n */`);

class JsDocCompletionItem extends vscode.CompletionItem {
	constructor(
		public readonly document: vscode.TextDocument,
		public readonly position: vscode.Position
	) {
		super('/** */', vscode.CompletionItemKind.Text);
		this.detail = vscode.l10n.t("JSDoc comment");
		this.sortText = '\0';

		const line = document.lineAt(position.line).text;
		const prefix = line.slice(0, position.character).match(/\/\**\s*$/);
		const suffix = line.slice(position.character).match(/^\s*\**\//);
		const start = position.translate(0, prefix ? -prefix[0].length : 0);
		const range = new vscode.Range(start, position.translate(0, suffix ? suffix[0].length : 0));
		this.range = { inserting: range, replacing: range };
	}
}

class JsDocCompletionProvider implements vscode.CompletionItemProvider {

	constructor(
		private readonly client: LanguageClient,
		private readonly language: LanguageDescription,
		// private readonly fileConfigurationManager: FileConfigurationManager,
	) { }

	public async provideCompletionItems(
		document: vscode.TextDocument,
		position: vscode.Position,
		token: vscode.CancellationToken
	): Promise<vscode.CompletionItem[] | undefined> {
		if (!vscode.workspace.getConfiguration(this.language.id, document).get('suggest.completeJSDocs')) {
			return undefined;
		}
        
		const file = toOpenLpcFilePath(document);
		if (!file) {
			return undefined;
		}

		if (!this.isPotentiallyValidDocCompletionPosition(document, position)) {
			return undefined;
		}

        const args = typeConverters.Position.toFileLocationRequestArgs(file, position);
		const response = await this.client.sendRequest<any>("docCommentTemplate", {
            arguments: {...args}
        }, token);
		if (!response) {
			return undefined;
		}

		const item = new JsDocCompletionItem(document, position);

		// Workaround for #43619
		// docCommentTemplate previously returned undefined for empty jsdoc templates.
		// TS 2.7 now returns a single line doc comment, which breaks indentation.
		if (response.newText === '/** */') {
			item.insertText = defaultJsDoc;
		} else {
			item.insertText = templateToSnippet(response.newText);
		}

		return [item];
	}

	private isPotentiallyValidDocCompletionPosition(
		document: vscode.TextDocument,
		position: vscode.Position
	): boolean {
		// Only show the JSdoc completion when the everything before the cursor is whitespace
		// or could be the opening of a comment
		const line = document.lineAt(position.line).text;
		const prefix = line.slice(0, position.character);
		if (!/^\s*$|\/\*\*\s*$|^\s*\/\*\*+\s*$/.test(prefix)) {
			return false;
		}

		// And everything after is possibly a closing comment or more whitespace
		const suffix = line.slice(position.character);
		return /^\s*(\*+\/)?\s*$/.test(suffix);
	}
}

export function templateToSnippet(template: string): vscode.SnippetString {
	// TODO: use append placeholder
	let snippetIndex = 1;
	template = template.replace(/\$/g, '\\$'); // CodeQL [SM02383] This is only used for text which is put into the editor. It is not for rendered html
	template = template.replace(/^[ \t]*(?=(\/|[ ]\*))/gm, '');
	template = template.replace(/^(\/\*\*\s*\*[ ]*)$/m, (x) => x + `\$0`);
	template = template.replace(/\* @param([ ]\{\S+\})?\s+(\S+)[ \t]*$/gm, (_param, type, post) => {
		let out = '* @param ';
		if (type === ' {any}' || type === ' {*}') {
			out += `{\$\{${snippetIndex++}:*\}} `;
		} else if (type) {
			out += type + ' ';
		}
		out += post + ` \${${snippetIndex++}}`;
		return out;
	});

	template = template.replace(/\* @returns[ \t]*$/gm, `* @returns \${${snippetIndex++}}`);

	return new vscode.SnippetString(template);
}

export function register(
	selector: DocumentSelector,
	language: LanguageDescription,
	client: LanguageClient,
	// fileConfigurationManager: FileConfigurationManager,

): vscode.Disposable {
	return vscode.languages.registerCompletionItemProvider(selector.syntax,
		new JsDocCompletionProvider(client, language),
		'*');
}

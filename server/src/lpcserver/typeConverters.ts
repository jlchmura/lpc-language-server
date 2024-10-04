import * as vscode from "vscode-languageserver";
import * as Proto from "../server/_namespaces/lpc.server.protocol.js";
import { protocol } from "../server/_namespaces/lpc.server.js";
import { ScriptElementKind } from "../server/_namespaces/lpc.js";
import { URI } from "vscode-uri";
import { KindModifiers } from "./protocol.const.js";




export namespace Range {
	export const fromTextSpan = (span: Proto.TextSpan): vscode.Range =>
		fromLocations(span.start, span.end);

	export const toTextSpan = (range: vscode.Range): Proto.TextSpan => ({
		start: Position.toLocation(range.start),
		end: Position.toLocation(range.end)
	});

	export const fromLocations = (start: Proto.Location, end: Proto.Location): vscode.Range =>
		vscode.Range.create(
			Math.max(0, start.line - 1), Math.max(start.offset - 1, 0),
			Math.max(0, end.line - 1), Math.max(0, end.offset - 1));

	export const toFileRangeRequestArgs = (file: string, range: vscode.Range): Proto.FileRangeRequestArgs => ({
		file,
		startLine: range.start.line + 1,
		startOffset: range.start.character + 1,
		endLine: range.end.line + 1,
		endOffset: range.end.character + 1
	});

	export const toFormattingRequestArgs = (file: string, range: vscode.Range): Proto.FormatRequestArgs => ({
		file,
		line: range.start.line + 1,
		offset: range.start.character + 1,
		endLine: range.end.line + 1,
		endOffset: range.end.character + 1
	});
}

export namespace Position {
	export const fromLocation = (tslocation: Proto.Location): vscode.Position =>
		vscode.Position.create(tslocation.line - 1, tslocation.offset - 1);

	export const toLocation = (vsPosition: vscode.Position): Proto.Location => ({
		line: vsPosition.line + 1,
		offset: vsPosition.character + 1,
	});

	export const toFileLocationRequestArgs = (file: string, position: vscode.Position): Proto.FileLocationRequestArgs => ({
		file,
		line: position.line + 1,
		offset: position.character + 1,
	});
}

export namespace Location {
	export const fromTextSpan = (resource: URI, tsTextSpan: Proto.TextSpan): vscode.Location =>
		vscode.Location.create(resource.toString(), Range.fromTextSpan(tsTextSpan));
}


export namespace WorkspaceEdit {
	export function fromRenames(
		locations: ReadonlyArray<Proto.SpanGroup>,
		newName: string
	) {
		const edit: vscode.WorkspaceEdit = { changes: {} };
		for (const spanGroup of locations) {
			const resource = spanGroup.file;
			for (const textSpan of spanGroup.locs) {
				edit.changes[resource] = edit.changes[resource] || [];
				edit.changes[resource].push(vscode.TextEdit.replace(
					Range.fromTextSpan(textSpan),
					newName
				));				
			}
		}
		return edit;
	}
}

export namespace CompletionKind {
	export function fromKind(kind: string): vscode.CompletionItemKind {
		switch (kind) {			
			case ScriptElementKind.primitiveType:
			case ScriptElementKind.keyword:
				return vscode.CompletionItemKind.Keyword;

			// case ScriptElementKind.const:
			// case ScriptElementKind.let:
			// case ScriptElementKind.variable:
			// case ScriptElementKind.localVariable:
			case ScriptElementKind.alias:
			case ScriptElementKind.parameterElement:
				return vscode.CompletionItemKind.Variable;

			case ScriptElementKind.memberVariableElement:			
				return vscode.CompletionItemKind.Field;

			case ScriptElementKind.functionElement:
			case ScriptElementKind.localFunctionElement:
				return vscode.CompletionItemKind.Function;

			// case ScriptElementKind.method:
			// case ScriptElementKind.constructSignature:
			case ScriptElementKind.callSignatureElement:
			case ScriptElementKind.indexSignatureElement:
				return vscode.CompletionItemKind.Method;

			// case ScriptElementKind.enum:
			// 	return vscode.CompletionItemKind.Enum;

			// case ScriptElementKind.enumMember:
			// 	return vscode.CompletionItemKind.EnumMember;

			// case ScriptElementKind.module:
			// case ScriptElementKind.externalModuleName:
			// 	return vscode.CompletionItemKind.Module;

			case ScriptElementKind.classElement:
			case ScriptElementKind.typeElement:
				return vscode.CompletionItemKind.Class;

			case ScriptElementKind.interfaceElement:
				return vscode.CompletionItemKind.Interface;

			case ScriptElementKind.warning:
				return vscode.CompletionItemKind.Text;

			case ScriptElementKind.scriptElement:
				return vscode.CompletionItemKind.File;

			case ScriptElementKind.directory:
				return vscode.CompletionItemKind.Folder;

			case ScriptElementKind.string:
				return vscode.CompletionItemKind.Constant;

			default:
				return vscode.CompletionItemKind.Property;
		}
	}

	export function getDetails(tsEntry: protocol.CompletionEntry) : string | undefined {
		if (!tsEntry.kindModifiers || tsEntry.kind !== ScriptElementKind.scriptElement) {
			return;
		}
	
		const kindModifiers = parseKindModifier(tsEntry.kindModifiers);
		
		for (const extModifier of KindModifiers.fileExtensionKindModifiers) {
			if (kindModifiers.has(extModifier)) {
				if (tsEntry.name.toLowerCase().endsWith(extModifier)) {
					return tsEntry.name;
				} else {
					return tsEntry.name + extModifier;
				}
			}
		}
		return undefined;		
	}

	export function parseKindModifier(kindModifiers: string): Set<string> {
		return new Set(kindModifiers.split(/,|\s+/g));
	}
	
}
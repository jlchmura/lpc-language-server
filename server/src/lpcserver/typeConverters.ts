import * as vscode from "vscode-languageserver";
import * as Proto from "../server/_namespaces/lpc.server.protocol.js";
import { protocol } from "../server/_namespaces/lpc.server.js";
import { DocumentSpan, ScriptElementKind, SymbolDisplayPart, TextSpan, diagnosticPrefix, isString } from "../server/_namespaces/lpc.js";
import { URI } from "vscode-uri";
import { KindModifiers } from "./protocol.const.js";
import { IFilePathToResourceConverter, asPlainTextWithLinks, documentationToMarkdown, tagsToMarkdown } from "./textRendering.js";
import { getFileResourceConverter } from "./utils.js";

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

	export function fromFileSpan(span: Proto.FileSpan): vscode.Location {
		return vscode.Location.create(URI.file(span.file).toString(), Range.fromTextSpan(span));
	}	
}


export namespace WorkspaceEdit {
	export function fromRenames(
		locations: ReadonlyArray<Proto.SpanGroup>,
		newName: string
	) {
		const edit: vscode.WorkspaceEdit = { changes: {} };
		for (const spanGroup of locations) {
			const resource = URI.file(spanGroup.file).toString();
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
			case ScriptElementKind.define:
				return vscode.CompletionItemKind.Enum;
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

export namespace CompletionEntryDetails {
	export function convert(
		entry: protocol.CompletionEntryDetails,
		baseUri: URI
	): vscode.CompletionItem {
		const item = vscode.CompletionItem.create(entry.name);
		item.detail = entry.displayParts.map(part => part.text).join('');								
		item.documentation = {
			kind: "markdown",
			value: documentationToMarkdown(entry.documentation, entry.tags, undefined, baseUri)
		} satisfies vscode.MarkupContent;								
		return item;		
	}
}

// export namespace DisplayPart {	
// 	export function documentationToMarkdown(
// 		documentation: readonly SymbolDisplayPart[],
// 		tags: readonly Proto.JSDocTagInfo[],
// 		baseUri: URI | undefined		
// 	) {
// 		let markdown = '';		
// 		if (isString(documentation)) {
// 			markdown += documentation;
// 		} else if (documentation) {
// 			markdown += documentation.map(part => part.text).join('');
// 		}
// 		if (tags) {
// 			const converter: IFilePathToResourceConverter = { toResource: (file: string) => URI.file(file) };
// 			const tagsMarkdown = tagsToMarkdown(tags, converter );
// 			markdown += ('\n\n' + tagsMarkdown);
// 		}

// 		return markdown;
// 	}	
// }

export namespace SignatureHelp {
	export function convertSignature(item: Proto.SignatureHelpItem, baseUri: URI) {
		const converter = getFileResourceConverter();

		const signature = vscode.SignatureInformation.create(
			asPlainTextWithLinks(item.prefixDisplayParts, converter),
			documentationToMarkdown(item.documentation, item.tags.filter(x => x.name !== 'param'), converter, baseUri)
		);

		let textIndex = signature.label.length;
		const separatorLabel = asPlainTextWithLinks(item.separatorDisplayParts, converter);
		for (let i = 0; i < item.parameters.length; ++i) {
			const parameter = item.parameters[i];
			const label = asPlainTextWithLinks(parameter.displayParts, converter);

			signature.parameters.push(
				vscode.ParameterInformation.create(
					[textIndex, textIndex + label.length],
					documentationToMarkdown(parameter.documentation, [], converter, baseUri)));

			textIndex += label.length;
			signature.label += label;

			if (i !== item.parameters.length - 1) {
				signature.label += separatorLabel;
				textIndex += separatorLabel.length;
			}
		}

		signature.label += asPlainTextWithLinks(item.suffixDisplayParts, converter);
		return signature;
	}
}

export namespace Diagnostic {
	export function severityFromCategory(category: string): vscode.DiagnosticSeverity {
		switch (category) {
			case "error": return vscode.DiagnosticSeverity.Error;
			case "warning": return vscode.DiagnosticSeverity.Warning;
			case "suggestion": return vscode.DiagnosticSeverity.Information;
			case "message": return vscode.DiagnosticSeverity.Hint;
			default: return vscode.DiagnosticSeverity.Error;
		}
	}

	export function fromDiagnostic(diagnostic: protocol.Diagnostic): vscode.Diagnostic {
		const d = vscode.Diagnostic.create(
			Range.fromTextSpan(diagnostic),
			diagnostic.text,
			severityFromCategory(diagnostic.category),
			diagnostic.code.toString(),
			diagnosticPrefix,
			diagnostic.relatedInformation?.map(fromRelatedInformation)
		);

		const tags: vscode.DiagnosticTag[] = [];
		if (diagnostic.reportsUnnecessary) {
			tags.push(vscode.DiagnosticTag.Unnecessary);
		}
		if (diagnostic.reportsDeprecated) {
			tags.push(vscode.DiagnosticTag.Deprecated);
		}     
		d.tags = tags;
		return d;
	}

	export function fromRelatedInformation(relatedInformation: protocol.DiagnosticRelatedInformation): vscode.DiagnosticRelatedInformation {		
		const d = vscode.DiagnosticRelatedInformation.create(
			relatedInformation.span ? Location.fromFileSpan(relatedInformation.span) : vscode.Location.create("", vscode.Range.create(0,0,0,0)),
			relatedInformation.message
		);
		return d;				
	}
}


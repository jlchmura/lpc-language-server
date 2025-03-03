import * as ls from "vscode-languageserver";
import * as lpc from "../lpc/lpc.js";
import * as protocol from "../server/_namespaces/lpc.server.protocol.js";
import * as typeConverters from './typeConverters.js';
import * as PConst from "./protocol.const.js";
import { URI } from "vscode-uri";
import { IFilePathToResourceConverter } from "./textRendering.js";

const getSymbolKind = (kind: string): ls.SymbolKind => {
	switch (kind) {
		case PConst.Kind.module: return ls.SymbolKind.Module;
		case PConst.Kind.class: return ls.SymbolKind.Class;
		case PConst.Kind.enum: return ls.SymbolKind.Enum;
        case PConst.Kind.define: return ls.SymbolKind.Enum;
		case PConst.Kind.interface: return ls.SymbolKind.Interface;
		case PConst.Kind.method: return ls.SymbolKind.Method;
		case PConst.Kind.memberVariable: return ls.SymbolKind.Property;
		case PConst.Kind.memberGetAccessor: return ls.SymbolKind.Property;
		case PConst.Kind.memberSetAccessor: return ls.SymbolKind.Property;
		case PConst.Kind.variable: return ls.SymbolKind.Variable;
		case PConst.Kind.const: return ls.SymbolKind.Variable;
		case PConst.Kind.localVariable: return ls.SymbolKind.Variable;
		case PConst.Kind.function: return ls.SymbolKind.Function;
		case PConst.Kind.localFunction: return ls.SymbolKind.Function;
		case PConst.Kind.constructSignature: return ls.SymbolKind.Constructor;
		case PConst.Kind.constructorImplementation: return ls.SymbolKind.Constructor;
	}
	return ls.SymbolKind.Variable;
};

export function parseKindModifier(kindModifiers: string): Set<string> {
	return new Set(kindModifiers.split(/,|\s+/g));
}

/**
 * Test if `otherRange` is in `range`. If the ranges are equal, will return true.
 */
export function containsRange(range: ls.Range, otherRange: ls.Range): boolean {        
    if (otherRange.start.line < range.start.line || otherRange.end.line < range.start.line) {
        return false;
    }
    if (otherRange.start.line > range.end.line || otherRange.end.line > range.end.line) {
        return false;
    }
    if (otherRange.start.line === range.start.line && otherRange.start.character < range.start.character) {
        return false;
    }
    if (otherRange.end.line === range.end.line && otherRange.end.character > range.end.character) {
        return false;
    }
    return true;
}

/**
	 * A intersection of the two ranges.
	 */
export function intersectRanges(a: ls.Range, b: ls.Range): ls.Range | null {
    let resultStartLineNumber = a.start.line;
    let resultStartColumn = a.start.character;
    let resultEndLineNumber = a.end.line;
    let resultEndColumn = a.end.character;
    const otherStartLineNumber = b.start.line;
    const otherStartColumn = b.start.character;
    const otherEndLineNumber = b.end.line;
    const otherEndColumn = b.end.character;

    if (resultStartLineNumber < otherStartLineNumber) {
        resultStartLineNumber = otherStartLineNumber;
        resultStartColumn = otherStartColumn;
    } else if (resultStartLineNumber === otherStartLineNumber) {
        resultStartColumn = Math.max(resultStartColumn, otherStartColumn);
    }

    if (resultEndLineNumber > otherEndLineNumber) {
        resultEndLineNumber = otherEndLineNumber;
        resultEndColumn = otherEndColumn;
    } else if (resultEndLineNumber === otherEndLineNumber) {
        resultEndColumn = Math.min(resultEndColumn, otherEndColumn);
    }

    // Check if selection is now empty
    if (resultStartLineNumber > resultEndLineNumber) {
        return null;
    }
    if (resultStartLineNumber === resultEndLineNumber && resultStartColumn > resultEndColumn) {
        return null;
    }
    return ls.Range.create(resultStartLineNumber, resultStartColumn, resultEndLineNumber, resultEndColumn);
}

function shouldInclueEntry(item: protocol.NavigationTree | lpc.NavigationBarItem): boolean {
    if (item.kind === "alias") {
        return false;
    }
    return !!(item.text && item.text !== '<function>' && item.text !== '<class>');
}

function convertSymbol(item: protocol.NavigationTree, range: ls.Range): ls.DocumentSymbol {
    const selectionRange = item.nameSpan ? typeConverters.Range.fromTextSpan(item.nameSpan) : range;
    let label = item.text;

    // switch (item.kind) {
    //     case PConst.Kind.memberGetAccessor: label = `(get) ${label}`; break;
    //     case PConst.Kind.memberSetAccessor: label = `(set) ${label}`; break;
    // }

    const symbolInfo = ls.DocumentSymbol.create(
        label,
        '',
        getSymbolKind(item.kind),
        range,
        containsRange(range, selectionRange) ? selectionRange : range);


    const kindModifiers = parseKindModifier(item.kindModifiers);
    if (kindModifiers.has(PConst.KindModifiers.deprecated)) {
        symbolInfo.tags = [ls.SymbolTag.Deprecated];
    }

    return symbolInfo;
}

export function convertNavTree(
    resource: URI,
    output: ls.DocumentSymbol[],
    item: protocol.NavigationTree,
): boolean {
    let shouldInclude = shouldInclueEntry(item);
    if (!shouldInclude && !item.childItems?.length) {
        return false;
    }

    const children = new Set(item.childItems || []);
    for (const span of item.spans) {
        const range = typeConverters.Range.fromTextSpan(span);
        const symbolInfo = convertSymbol(item, range);

        for (const child of children) {
            if (child.spans.some(span => !!intersectRanges(range, typeConverters.Range.fromTextSpan(span)))) {
                symbolInfo.children ??= [];
                const includedChild = convertNavTree(resource, symbolInfo.children, child);
                shouldInclude = shouldInclude || includedChild;
                children.delete(child);
            }
        }

        if (shouldInclude) {
            output.push(symbolInfo);
        }
    }

    return shouldInclude;
}

export function getFileResourceConverter(): IFilePathToResourceConverter {    
    const converter: IFilePathToResourceConverter = { toResource: (file: string) => file && URI.file(file) };
    return converter;
}
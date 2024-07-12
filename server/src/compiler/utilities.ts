import * as antlr from "antlr4ng";
import * as parserCore from "../parser3/parser-core";
import { Debug, DiagnosticArguments, DiagnosticMessage, DiagnosticRelatedInformation, DiagnosticWithDetachedLocation, DiagnosticWithLocation, Identifier, MapLike, ModifierFlags, Node, NodeFlags, ReadonlyTextRange, some, SourceFile, Symbol, SymbolFlags, SyntaxKind, TextRange, Token, TransformFlags } from "./_namespaces/lpc";

/** @internal */
export interface ObjectAllocator {
    getNodeConstructor(): new (kind: SyntaxKind, pos: number, end: number) => Node;
    getTokenConstructor(): new <TKind extends SyntaxKind>(kind: TKind, pos: number, end: number) => Token<TKind>;
    getIdentifierConstructor(): new (kind: SyntaxKind.Identifier, pos: number, end: number) => Identifier;    
    getSourceFileConstructor(): new (kind: SyntaxKind.SourceFile, pos: number, end: number) => SourceFile;
    getSymbolConstructor(): new (flags: SymbolFlags, name: string) => Symbol;
    //getTypeConstructor(): new (checker: TypeChecker, flags: TypeFlags) => Type;
    //getSignatureConstructor(): new (checker: TypeChecker, flags: SignatureFlags) => Signature;    
}


/** @internal */
export const objectAllocator: ObjectAllocator = {
    getNodeConstructor: () => Node as any,
    getTokenConstructor: () => Token as any,
    getIdentifierConstructor: () => Identifier as any,    
    getSourceFileConstructor: () => Node as any,
    getSymbolConstructor: () => Symbol as any,
    // getTypeConstructor: () => Type as any,
    // getSignatureConstructor: () => Signature as any,    
};


function Symbol(this: Symbol, flags: SymbolFlags, name: string) {
    // Note: if modifying this, be sure to update SymbolObject in src/services/services.ts
    this.flags = flags;
    this.name = name;
    this.declarations = undefined;
    this.valueDeclaration = undefined;
    this.id = 0;
    this.mergeId = 0;
    this.parent = undefined;
    this.members = undefined;
    this.exports = undefined;
    this.exportSymbol = undefined;
    this.constEnumOnlyModule = undefined;
    this.isReferenced = undefined;
    this.lastAssignmentPos = undefined;
    (this as any).links = undefined; // used by TransientSymbol
}

// function Type(this: Type, checker: TypeChecker, flags: TypeFlags) {
//     // Note: if modifying this, be sure to update TypeObject in src/services/services.ts
//     this.flags = flags;
//     if (Debug.isDebugging || tracing) {
//         this.checker = checker;
//     }
// }

// function Signature(this: Signature, checker: TypeChecker, flags: SignatureFlags) {
//     // Note: if modifying this, be sure to update SignatureObject in src/services/services.ts
//     this.flags = flags;
//     if (Debug.isDebugging) {
//         this.checker = checker;
//     }
// }

function Node(this: Mutable<Node>, kind: SyntaxKind, pos: number, end: number) {
    // Note: if modifying this, be sure to update NodeObject in src/services/services.ts
    this.pos = pos;
    this.end = end;
    this.kind = kind;
    this.id = 0;
    this.flags = NodeFlags.None;
    this.modifierFlagsCache = ModifierFlags.None;
    this.transformFlags = TransformFlags.None;
    this.parent = undefined!;
    this.original = undefined;
    this.emitNode = undefined;
}

function Token(this: Mutable<Node>, kind: SyntaxKind, pos: number, end: number) {
    // Note: if modifying this, be sure to update TokenOrIdentifierObject in src/services/services.ts
    this.pos = pos;
    this.end = end;
    this.kind = kind;
    this.id = 0;
    this.flags = NodeFlags.None;
    this.transformFlags = TransformFlags.None;
    this.parent = undefined!;
    this.emitNode = undefined;
}

function Identifier(this: Mutable<Node>, kind: SyntaxKind, pos: number, end: number) {
    // Note: if modifying this, be sure to update TokenOrIdentifierObject in src/services/services.ts
    this.pos = pos;
    this.end = end;
    this.kind = kind;
    this.id = 0;
    this.flags = NodeFlags.None;
    this.transformFlags = TransformFlags.None;
    this.parent = undefined!;
    this.original = undefined;
    this.emitNode = undefined;
}

/** @internal */
export type Mutable<T extends object> = { -readonly [K in keyof T]: T[K]; };

/**
 * Bypasses immutability and directly sets the `end` property of a `TextRange` or `Node`.
 *
 * @internal
 */
export function setTextRangeEnd<T extends ReadonlyTextRange>(range: T, end: number) {
    (range as TextRange).end = end;
    return range;
}

/**
 * Bypasses immutability and directly sets the `pos` and `end` properties of a `TextRange` or `Node`.
 *
 * @internal
 */
export function setTextRangePosEnd<T extends ReadonlyTextRange>(range: T, pos: number, end: number) {
    return setTextRangeEnd(setTextRangePos(range, pos), end);
}

/**
 * Bypasses immutability and directly sets the `pos` property of a `TextRange` or `Node`.
 *
 * @internal
 */
export function setTextRangePos<T extends ReadonlyTextRange>(range: T, pos: number) {
    (range as TextRange).pos = pos;
    return range;
}


/**
 * Bypasses immutability and directly sets the `pos` and `end` properties of a `TextRange` or `Node` from the
 * provided position and width.
 *
 * @internal
 */
export function setTextRangePosWidth<T extends ReadonlyTextRange>(range: T, pos: number, width: number) {
    return setTextRangePosEnd(range, pos, pos + width);
}

/** gets TerminalNode's from this context and all children contextes */
export function getNestedTerminals(context: antlr.ParserRuleContext, type?: number) {
    const children = [...context.children];
    const result: antlr.TerminalNode[]=[];
    while (children.length > 0) {
        const child = children.shift();
        if (child instanceof antlr.TerminalNode && (type===undefined || child.symbol.type == type)) {
            result.push(child);
        } else if (child instanceof antlr.ParserRuleContext) {
            children.push(...child.children);
        }
    }
    return result;
}

function assertDiagnosticLocation(sourceText: string, start: number, length: number) {
    Debug.assertGreaterThanOrEqual(start, 0);
    Debug.assertGreaterThanOrEqual(length, 0);
    Debug.assertLessThanOrEqual(start, sourceText.length);
    Debug.assertLessThanOrEqual(start + length, sourceText.length);
}

let localizedDiagnosticMessages: MapLike<string> | undefined;

/** @internal */
export function getLocaleSpecificMessage(message: DiagnosticMessage) {
    return localizedDiagnosticMessages && localizedDiagnosticMessages[message.key] || message.message;
}

/** @internal */
export function formatStringFromArgs(text: string, args: DiagnosticArguments): string {
    return text.replace(/{(\d+)}/g, (_match, index: string) => "" + Debug.checkDefined(args[+index]));
}

/** @internal */
export function createDetachedDiagnostic(fileName: string, sourceText: string, start: number, length: number, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithDetachedLocation {
    if ((start + length) > sourceText.length) {
        length = sourceText.length - start;
    }

    assertDiagnosticLocation(sourceText, start, length);
    let text = getLocaleSpecificMessage(message);

    if (some(args)) {
        text = formatStringFromArgs(text, args);
    }

    return {
        file: undefined,
        start,
        length,

        messageText: text,
        category: message.category,
        code: message.code,
        reportsUnnecessary: message.reportsUnnecessary,
        fileName,
    };
}

/** @internal */
export function attachFileToDiagnostics(diagnostics: DiagnosticWithDetachedLocation[], file: SourceFile): DiagnosticWithLocation[] {
    const diagnosticsWithLocation: DiagnosticWithLocation[] = [];
    for (const diagnostic of diagnostics) {
        diagnosticsWithLocation.push(attachFileToDiagnostic(diagnostic, file));
    }
    return diagnosticsWithLocation;
}

function attachFileToDiagnostic(diagnostic: DiagnosticWithDetachedLocation, file: SourceFile): DiagnosticWithLocation {
    const fileName = file.fileName || "";
    const length = file.text.length;
    Debug.assertEqual(diagnostic.fileName, fileName);
    Debug.assertLessThanOrEqual(diagnostic.start, length);
    Debug.assertLessThanOrEqual(diagnostic.start + diagnostic.length, length);
    const diagnosticWithLocation: DiagnosticWithLocation = {
        file,
        start: diagnostic.start,
        length: diagnostic.length,
        messageText: diagnostic.messageText,
        category: diagnostic.category,
        code: diagnostic.code,
        reportsUnnecessary: diagnostic.reportsUnnecessary,
    };
    if (diagnostic.relatedInformation) {
        diagnosticWithLocation.relatedInformation = [];
        for (const related of diagnostic.relatedInformation) {
            if (isDiagnosticWithDetachedLocation(related) && related.fileName === fileName) {
                Debug.assertLessThanOrEqual(related.start, length);
                Debug.assertLessThanOrEqual(related.start + related.length, length);
                diagnosticWithLocation.relatedInformation.push(attachFileToDiagnostic(related, file));
            }
            else {
                diagnosticWithLocation.relatedInformation.push(related);
            }
        }
    }
    return diagnosticWithLocation;
}

function isDiagnosticWithDetachedLocation(diagnostic: DiagnosticRelatedInformation | DiagnosticWithDetachedLocation): diagnostic is DiagnosticWithDetachedLocation {
    return diagnostic.file === undefined
        && diagnostic.start !== undefined
        && diagnostic.length !== undefined
        && typeof (diagnostic as DiagnosticWithDetachedLocation).fileName === "string";
}

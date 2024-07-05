import * as antlr from "antlr4ng";
import { hasProperty } from "./core";
import {
    Identifier,
    ModifierFlags,
    ModifierLike,
    Node,
    NodeArray,
    NodeFlags,
    PrivateIdentifier,
    ReadonlyTextRange,
    SourceFile,
    SymbolFlags,
    SyntaxKind,
    TextRange,
    Token,
} from "./types";
import { LPCLexer } from "../parser3/LPCLexer";

/** @internal */
export type Mutable<T extends object> = { -readonly [K in keyof T]: T[K] };

/**
 * @internal
 */
// prettier-ignore
export interface ObjectAllocator {
    getNodeConstructor(): new (kind: SyntaxKind, pos: number, end: number) => Node;
    getTokenConstructor(): new <TKind extends SyntaxKind>(kind: TKind, pos: number, end: number) => Token<TKind>;
    getIdentifierConstructor(): new (kind: SyntaxKind.Identifier, pos: number, end: number) => Identifier;
    getPrivateIdentifierConstructor(): new (kind: SyntaxKind.PrivateIdentifier, pos: number, end: number) => PrivateIdentifier;
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
    getPrivateIdentifierConstructor: () => Node as any,
    getSourceFileConstructor: () => Node as any,
    getSymbolConstructor: () => Symbol as any,
    //getTypeConstructor: () => Type as any,
    //getSignatureConstructor: () => Signature as any,
};

function Node(this: Mutable<Node>, kind: SyntaxKind, pos: number, end: number) {
    this.pos = pos;
    this.end = end;
    this.kind = kind;
    this.id = 0;
    this.flags = NodeFlags.None;
    this.modifierFlagsCache = ModifierFlags.None;
    this.parent = undefined!;
    this.original = undefined;
}

function Identifier(
    this: Mutable<Node>,
    kind: SyntaxKind,
    pos: number,
    end: number
) {
    this.pos = pos;
    this.end = end;
    this.kind = kind;
    this.id = 0;
    this.flags = NodeFlags.None;
    this.parent = undefined!;
    this.original = undefined;
}

function Token(
    this: Mutable<Node>,
    kind: SyntaxKind,
    pos: number,
    end: number
) {
    // Note: if modifying this, be sure to update TokenOrIdentifierObject in src/services/services.ts
    this.pos = pos;
    this.end = end;
    this.kind = kind;
    this.id = 0;
    this.flags = NodeFlags.None;
    this.parent = undefined!;
}

/** @internal */
export function isNodeArray<T extends Node>(
    array: readonly T[]
): array is NodeArray<T> {
    return hasProperty(array, "pos") && hasProperty(array, "end");
}

/**
 * Bypasses immutability and directly sets the `pos` property of a `TextRange` or `Node`.
 *
 * @internal
 */
export function setTextRangePos<T extends ReadonlyTextRange>(
    range: T,
    pos: number
) {
    (range as TextRange).pos = pos;
    return range;
}

/**
 * Bypasses immutability and directly sets the `end` property of a `TextRange` or `Node`.
 *
 * @internal
 */
export function setTextRangeEnd<T extends ReadonlyTextRange>(
    range: T,
    end: number
) {
    (range as TextRange).end = end;
    return range;
}

/**
 * Bypasses immutability and directly sets the `pos` and `end` properties of a `TextRange` or `Node`.
 *
 * @internal
 */
export function setTextRangePosEnd<T extends ReadonlyTextRange>(
    range: T,
    pos: number,
    end: number
) {
    return setTextRangeEnd(setTextRangePos(range, pos), end);
}

/**
 * Bypasses immutability and directly sets the `pos` and `end` properties of a `TextRange` or `Node` from the
 * provided position and width.
 *
 * @internal
 */
export function setTextRangePosWidth<T extends ReadonlyTextRange>(
    range: T,
    pos: number,
    width: number
) {
    return setTextRangePosEnd(range, pos, pos + width);
}

/** @internal */
export function modifiersToFlags(
    modifiers: readonly ModifierLike[] | undefined
) {
    let flags = ModifierFlags.None;
    if (modifiers) {
        for (const modifier of modifiers) {
            flags |= modifierToFlag(modifier.getSymbol().type);
        }
    }
    return flags;
}

export function modifierToFlag(tokenType: number): ModifierFlags {
    switch (tokenType) {
        case LPCLexer.PUBLIC:
            return ModifierFlags.Public;
        case LPCLexer.PROTECTED:
            return ModifierFlags.Protected;
        case LPCLexer.PRIVATE:
            return ModifierFlags.Private;
        case LPCLexer.STATIC:
            return ModifierFlags.Static;
        case LPCLexer.NOMASK:
            return ModifierFlags.NoMask;
        case LPCLexer.NOSAVE:
            return ModifierFlags.NoSave;
        case LPCLexer.NOSHADOW:
            return ModifierFlags.NoShadow;
        case LPCLexer.VISIBLE:
            return ModifierFlags.Visible;
        case LPCLexer.DEPRECATED:
            return ModifierFlags.Deprecated;
    }
    return ModifierFlags.None;
}

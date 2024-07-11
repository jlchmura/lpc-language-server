import { Node, SyntaxKind } from "./types";
import { objectAllocator } from "./utilities";

/**
 * A `BaseNodeFactory` is an abstraction over an `ObjectAllocator` that handles caching `Node` constructors
 * and allocating `Node` instances based on a set of predefined types.
 *
 * @internal
 */
export interface BaseNodeFactory {
    createBaseSourceFileNode(kind: SyntaxKind.SourceFile): Node;
    createBaseIdentifierNode(kind: SyntaxKind.Identifier): Node;
    createBasePrivateIdentifierNode(kind: SyntaxKind.PrivateIdentifier): Node;
    createBaseTokenNode(kind: SyntaxKind): Node;
    createBaseNode(kind: SyntaxKind): Node;
}

// prettier-ignore
export function createBaseNodeFactory(): BaseNodeFactory {
    let SourceFileConstructor: new (kind: SyntaxKind.SourceFile, pos:number, end: number) => Node;
    let TokenConstructor: new (kind: SyntaxKind, pos: number, end: number) => Node;
    let IdentifierConstructor: new (kind: SyntaxKind.Identifier, pos: number, end: number) => Node;
    let PrivateIdentifierConstructor: new (kind: SyntaxKind.PrivateIdentifier, pos: number, end: number) => Node;    
    let NodeConstructor: new (kind: SyntaxKind, pos: number, end: number) => Node;

    return {
        createBaseSourceFileNode,
        createBaseIdentifierNode,
        createBasePrivateIdentifierNode,
        createBaseTokenNode,
        createBaseNode,
    };

    function createBaseSourceFileNode(kind: SyntaxKind.SourceFile): Node {
        return new (SourceFileConstructor || (SourceFileConstructor = objectAllocator.getSourceFileConstructor()))(kind, -1, -1);
    }

    function createBaseIdentifierNode(kind: SyntaxKind.Identifier): Node {
        return new (IdentifierConstructor || (IdentifierConstructor = objectAllocator.getIdentifierConstructor()))(kind, /*pos*/ -1, /*end*/ -1);
    }

    function createBasePrivateIdentifierNode(kind: SyntaxKind.PrivateIdentifier): Node {
        return new (PrivateIdentifierConstructor || (PrivateIdentifierConstructor = objectAllocator.getPrivateIdentifierConstructor()))(kind, /*pos*/ -1, /*end*/ -1);
    }

    function createBaseTokenNode(kind: SyntaxKind): Node {
        return new (TokenConstructor || (TokenConstructor = objectAllocator.getTokenConstructor()))(kind, /*pos*/ -1, /*end*/ -1);
    }

    function createBaseNode(kind: SyntaxKind): Node {
        return new (NodeConstructor || (NodeConstructor = objectAllocator.getNodeConstructor()))(kind, /*pos*/ -1, /*end*/ -1);
    }
}

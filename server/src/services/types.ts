import { Node, SourceFile, SourceFileLike } from "./_namespaces/lpc.js";

declare module "../compiler/types.js" {
    // Module transform: converted from interface augmentation
    export interface Node {
        getSourceFile(): SourceFile;
        getChildCount(sourceFile?: SourceFile): number;
        getChildAt(index: number, sourceFile?: SourceFile): Node;
        getChildren(sourceFile?: SourceFile): readonly Node[];
        /** @internal */
        getChildren(sourceFile?: SourceFileLike): readonly Node[]; // eslint-disable-line @typescript-eslint/unified-signatures
        getStart(
            sourceFile?: SourceFile,
            includeJsDocComment?: boolean
        ): number;
        /** @internal */
        getStart(
            sourceFile?: SourceFileLike,
            includeJsDocComment?: boolean
        ): number; // eslint-disable-line @typescript-eslint/unified-signatures
        getFullStart(): number;
        getEnd(): number;
        getWidth(sourceFile?: SourceFileLike): number;
        getFullWidth(): number;
        getLeadingTriviaWidth(sourceFile?: SourceFile): number;
        getFullText(sourceFile?: SourceFile): string;
        getText(sourceFile?: SourceFile): string;
        getFirstToken(sourceFile?: SourceFile): Node | undefined;
        /** @internal */
        getFirstToken(sourceFile?: SourceFileLike): Node | undefined; // eslint-disable-line @typescript-eslint/unified-signatures
        getLastToken(sourceFile?: SourceFile): Node | undefined;
        /** @internal */
        getLastToken(sourceFile?: SourceFileLike): Node | undefined; // eslint-disable-line @typescript-eslint/unified-signatures
        // See ts.forEachChild for documentation.
        forEachChild<T>(
            cbNode: (node: Node) => T | undefined,
            cbNodeArray?: (nodes: NodeArray<Node>) => T | undefined
        ): T | undefined;
    }
}

declare module "../compiler/types.js" {
    // Module transform: converted from interface augmentation
    export interface SourceFile {
        /** @internal */ version: string;
        ///** @internal */ scriptSnapshot: IScriptSnapshot | undefined;
        /** @internal */ nameTable: Map<string, number> | undefined;

        /** @internal */ getNamedDeclarations(): Map<
            string,
            readonly Declaration[]
        >;

        getLineAndCharacterOfPosition(pos: number): LineAndCharacter;
        getLineEndOfPosition(pos: number): number;
        getLineStarts(): readonly number[];
        getPositionOfLineAndCharacter(line: number, character: number): number;
        //update(newText: string, textChangeRange: TextChangeRange): SourceFile;

        ///** @internal */ sourceMapper?: DocumentPositionMapper;
    }
}

declare module "../compiler/types.js" {
    // Module transform: converted from interface augmentation
    export interface SourceFileLike {
        getLineAndCharacterOfPosition(pos: number): LineAndCharacter;
    }
}

declare module "../compiler/types.js" {
    // Module transform: converted from interface augmentation
    export interface Identifier {
        readonly text: string;
    }
}

export interface SymbolDisplayPart {
    /**
     * Text of an item describing the symbol.
     */
    text: string;
    /**
     * The symbol's kind (such as 'className' or 'parameterName' or plain 'text').
     */
    kind: string;
}

export interface JSDocTagInfo {
    name: string;
    text?: SymbolDisplayPart[];
}

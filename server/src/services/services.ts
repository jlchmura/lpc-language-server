import {
    AssignmentDeclarationKind,
    BaseType,
    BinaryExpression,
    computePositionOfLineAndCharacter,
    createMultiMap,
    createScanner,
    Debug,
    Declaration,
    DiagnosticWithLocation,
    EmitNode,
    emptyArray,
    EndOfFileToken,
    EntityName,
    FileReference,
    find,
    FloatLiteralType,
    FlowNode,
    forEach,
    forEachChild,
    FunctionLikeDeclaration,
    getAssignmentDeclarationKind,
    getLineAndCharacterOfPosition,
    getLineStarts,
    getNodeChildren,
    getNonAssignedNameOfDeclaration,
    getObjectFlags,
    getSourceFileOfNode,
    getTokenPosOfNode,
    HasLocals,
    hasSyntacticModifier,
    Identifier,
    IndexKind,
    IndexType,
    InheritDeclaration,
    IntLiteralType,
    isBindingPattern,
    isJSDocCommentContainingNode,
    isNodeKind,
    isPropertyNameLiteral,
    JSDoc,
    JSDocContainer,
    LanguageVariant,
    lastOrUndefined,
    LineAndCharacter,
    LiteralType,
    ModifierFlags,
    Node,
    NodeArray,
    NodeFlags,
    ObjectAllocator,
    ObjectFlags,
    Path,
    positionIsSynthesized,
    Scanner,
    setNodeChildren,
    Signature,
    SignatureDeclaration,
    SignatureFlags,
    SignatureKind,
    singleElementArray,
    SourceFile,
    SourceFileLike,
    Statement,
    StringLiteral,
    StringLiteralType,
    Symbol,
    SymbolFlags,
    SymbolLinks,
    symbolName,
    SymbolTable,
    SyntaxKind,
    SyntaxList,
    TextChangeRange,
    TextRange,
    Token,
    TransformFlags,
    Type,
    TypeChecker,
    TypeFlags,
    TypeNode,
    TypeParameter,
    UnionOrIntersectionType,
    UnionType,
    VariableDeclaration,
    getNameFromPropertyName,
    JSDocTagInfo,
    SymbolDisplayPart,
} from "./_namespaces/lpc.js";

// These utilities are common to multiple language service features.
// #region
/** @internal */
export const scanner: Scanner = createScanner(/*skipTrivia*/ true);

function getServicesObjectAllocator(): ObjectAllocator {
    return {
        getNodeConstructor: () => NodeObject,
        getTokenConstructor: () => TokenObject,

        getIdentifierConstructor: () => IdentifierObject,
        getSourceFileConstructor: () => SourceFileObject,
        getSymbolConstructor: () => SymbolObject,
        getTypeConstructor: () => TypeObject,
        getSignatureConstructor: () => SignatureObject,
        //getSourceMapSourceConstructor: () => SourceMapSourceObject,
    };
}

class TokenOrIdentifierObject<TKind extends SyntaxKind> implements Node {
    public kind: TKind;
    public pos: number;
    public end: number;
    public flags: NodeFlags;
    public modifierFlagsCache!: ModifierFlags;
    public transformFlags: TransformFlags;
    public parent: Node;
    public symbol!: Symbol;
    public jsDocComments?: JSDoc[];
    public id?: number;
    public emitNode?: EmitNode | undefined;

    constructor(kind: TKind, pos: number, end: number) {
        // Note: if modifying this, be sure to update Token and Identifier in src/compiler/utilities.ts
        this.pos = pos;
        this.end = end;
        this.kind = kind;
        this.id = 0;
        this.flags = NodeFlags.None;
        this.transformFlags = TransformFlags.None;
        this.parent = undefined!;
        this.emitNode = undefined;
    }

    public getSourceFile(): SourceFile {
        return getSourceFileOfNode(this);
    }

    public getStart(
        sourceFile?: SourceFileLike,
        includeJsDocComment?: boolean
    ): number {
        return getTokenPosOfNode(this, sourceFile, includeJsDocComment);
    }

    public getFullStart(): number {
        return this.pos;
    }

    public getEnd(): number {
        return this.end;
    }

    public getWidth(sourceFile?: SourceFile): number {
        return this.getEnd() - this.getStart(sourceFile);
    }

    public getFullWidth(): number {
        return this.end - this.pos;
    }

    public getLeadingTriviaWidth(sourceFile?: SourceFile): number {
        return this.getStart(sourceFile) - this.pos;
    }

    public getFullText(sourceFile?: SourceFile): string {
        return (sourceFile || this.getSourceFile()).text.substring(
            this.pos,
            this.end
        );
    }

    public getText(sourceFile?: SourceFile): string {
        if (!sourceFile) {
            sourceFile = this.getSourceFile();
        }
        return sourceFile.text.substring(
            this.getStart(sourceFile),
            this.getEnd()
        );
    }

    public getChildCount(): number {
        return this.getChildren().length;
    }

    public getChildAt(index: number): Node {
        return this.getChildren()[index];
    }

    public getChildren(): Node[] {
        return this.kind === SyntaxKind.EndOfFileToken
            ? (this as Node as EndOfFileToken).jsDoc || emptyArray
            : emptyArray;
    }

    public getFirstToken(): Node | undefined {
        return undefined;
    }

    public getLastToken(): Node | undefined {
        return undefined;
    }

    public forEachChild<T>(): T | undefined {
        return undefined;
    }
}

class IdentifierObject
    extends TokenOrIdentifierObject<SyntaxKind.Identifier>
    implements Identifier
{
    public text!: string;
    declare _LpcjsDocContainerBrand: any;
    declare _primaryExpressionBrand: any;
    declare _memberExpressionBrand: any;
    declare _leftHandSideExpressionBrand: any;
    declare _updateExpressionBrand: any;
    declare _unaryExpressionBrand: any;
    declare _expressionBrand: any;
    declare _declarationBrand: any;
    declare _flowContainerBrand: any;
    typeArguments!: NodeArray<TypeNode>;
    constructor(kind: SyntaxKind.Identifier, pos: number, end: number) {
        super(kind, pos, end);
    }
}

class TokenObject<TKind extends SyntaxKind>
    extends TokenOrIdentifierObject<TKind>
    implements Token<TKind>
{
    constructor(kind: TKind, pos: number, end: number) {
        super(kind, pos, end);
    }
}

function createNode<TKind extends SyntaxKind>(
    kind: TKind,
    pos: number,
    end: number,
    parent: Node
): NodeObject<TKind> | TokenObject<TKind> | IdentifierObject {
    const node = isNodeKind(kind)
        ? new NodeObject(kind, pos, end)
        : kind === SyntaxKind.Identifier
        ? new IdentifierObject(SyntaxKind.Identifier, pos, end)
        : new TokenObject(kind, pos, end);
    node.parent = parent;
    node.flags = parent.flags & NodeFlags.ContextFlags;
    return node;
}

class NodeObject<TKind extends SyntaxKind> implements Node {
    public kind: TKind;
    public pos: number;
    public end: number;
    public flags: NodeFlags;
    public modifierFlagsCache: ModifierFlags;
    public transformFlags: TransformFlags;
    public parent: Node;
    public symbol!: Symbol; // Actually optional, but it was too annoying to access `node.symbol!` everywhere since in many cases we know it must be defined
    public jsDoc?: JSDoc[];
    public original?: Node;
    public id?: number;
    public emitNode?: EmitNode;

    constructor(kind: TKind, pos: number, end: number) {
        // Note: if modifying this, be sure to update Node in src/compiler/utilities.ts
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

    private assertHasRealPosition(message?: string) {
        // eslint-disable-next-line local/debug-assert
        Debug.assert(
            !positionIsSynthesized(this.pos) &&
                !positionIsSynthesized(this.end),
            message || "Node must have a real position for this operation"
        );
    }

    public getSourceFile(): SourceFile {
        return getSourceFileOfNode(this);
    }

    public getStart(
        sourceFile?: SourceFileLike,
        includeJsDocComment?: boolean
    ): number {
        this.assertHasRealPosition();
        return getTokenPosOfNode(this, sourceFile, includeJsDocComment);
    }

    public getFullStart(): number {
        this.assertHasRealPosition();
        return this.pos;
    }

    public getEnd(): number {
        this.assertHasRealPosition();
        return this.end;
    }

    public getWidth(sourceFile?: SourceFile): number {
        this.assertHasRealPosition();
        return this.getEnd() - this.getStart(sourceFile);
    }

    public getFullWidth(): number {
        this.assertHasRealPosition();
        return this.end - this.pos;
    }

    public getLeadingTriviaWidth(sourceFile?: SourceFile): number {
        this.assertHasRealPosition();
        return this.getStart(sourceFile) - this.pos;
    }

    public getFullText(sourceFile?: SourceFile): string {
        this.assertHasRealPosition();
        return (sourceFile || this.getSourceFile()).text.substring(
            this.pos,
            this.end
        );
    }

    public getText(sourceFile?: SourceFile): string {
        this.assertHasRealPosition();
        if (!sourceFile) {
            sourceFile = this.getSourceFile();
        }
        return sourceFile.text.substring(
            this.getStart(sourceFile),
            this.getEnd()
        );
    }

    public getChildCount(sourceFile?: SourceFile): number {
        return this.getChildren(sourceFile).length;
    }

    public getChildAt(index: number, sourceFile?: SourceFile): Node {
        return this.getChildren(sourceFile)[index];
    }

    public getChildren(
        sourceFile: SourceFileLike = getSourceFileOfNode(this)
    ): readonly Node[] {
        this.assertHasRealPosition(
            "Node without a real position cannot be scanned and thus has no token nodes - use forEachChild and collect the result if that's fine"
        );
        return (
            getNodeChildren(this, sourceFile) ??
            setNodeChildren(this, sourceFile, createChildren(this, sourceFile))
        );
    }

    public getFirstToken(sourceFile?: SourceFileLike): Node | undefined {
        this.assertHasRealPosition();
        const children = this.getChildren(sourceFile);
        if (!children.length) {
            return undefined;
        }

        const child = find(
            children,
            (kid) =>
                kid.kind < SyntaxKind.FirstJSDocNode ||
                kid.kind > SyntaxKind.LastJSDocNode
        )!;
        return child.kind < SyntaxKind.FirstNode
            ? child
            : child.getFirstToken(sourceFile);
    }

    public getLastToken(sourceFile?: SourceFileLike): Node | undefined {
        this.assertHasRealPosition();
        const children = this.getChildren(sourceFile);

        const child = lastOrUndefined(children);
        if (!child) {
            return undefined;
        }

        return child.kind < SyntaxKind.FirstNode
            ? child
            : child.getLastToken(sourceFile);
    }

    public forEachChild<T>(
        cbNode: (node: Node) => T,
        cbNodeArray?: (nodes: NodeArray<Node>) => T
    ): T | undefined {
        return forEachChild(this, cbNode, cbNodeArray);
    }
}

function createChildren(
    node: Node,
    sourceFile: SourceFileLike | undefined
): readonly Node[] {
    const children: Node[] = [];

    if (isJSDocCommentContainingNode(node)) {
        /** Don't add trivia for "tokens" since this is in a comment. */
        node.forEachChild((child) => {
            children.push(child);
        });
        return children;
    }

    scanner.setText((sourceFile || node.getSourceFile()).text);
    let pos = node.pos;
    const processNode = (child: Node) => {
        addSyntheticNodes(children, pos, child.pos, node);
        children.push(child);
        pos = child.end;
    };
    const processNodes = (nodes: NodeArray<Node>) => {
        addSyntheticNodes(children, pos, nodes.pos, node);
        children.push(createSyntaxList(nodes, node));
        pos = nodes.end;
    };
    // jsDocComments need to be the first children
    forEach((node as JSDocContainer).jsDoc, processNode);
    // For syntactic classifications, all trivia are classified together, including jsdoc comments.
    // For that to work, the jsdoc comments should still be the leading trivia of the first child.
    // Restoring the scanner position ensures that.
    pos = node.pos;
    node.forEachChild(processNode, processNodes);
    addSyntheticNodes(children, pos, node.end, node);
    scanner.setText(undefined);
    return children;
}

class SourceFileObject
    extends NodeObject<SyntaxKind.SourceFile>
    implements SourceFile
{
    declare _declarationBrand: any;
    declare _localsContainerBrand: any;
    public fileName!: string;
    public path!: Path;
    public resolvedPath!: Path;
    public originalFileName!: string;
    public text!: string;
    //public scriptSnapshot!: IScriptSnapshot;
    public lineMap!: readonly number[];

    public statements!: NodeArray<Statement>;
    public endOfFileToken!: Token<SyntaxKind.EndOfFileToken>;

    public amdDependencies!: { name: string; path: string }[];
    public moduleName!: string;
    public referencedFiles!: FileReference[];
    public typeReferenceDirectives!: FileReference[];
    public libReferenceDirectives!: FileReference[];

    public syntacticDiagnostics!: DiagnosticWithLocation[];
    public parseDiagnostics!: DiagnosticWithLocation[];
    public bindDiagnostics!: DiagnosticWithLocation[];
    public bindSuggestionDiagnostics?: DiagnosticWithLocation[];

    public isDeclarationFile!: boolean;
    public isDefaultLib!: boolean;
    public hasNoDefaultLib!: boolean;
    public externalModuleIndicator!: Node; // The first node that causes this file to be an external module
    public commonJsModuleIndicator!: Node; // The first node that causes this file to be a CommonJS module
    public nodeCount!: number;
    public identifierCount!: number;
    public symbolCount!: number;
    public version!: string;
    // public scriptKind!: ScriptKind;
    // public languageVersion!: ScriptTarget;
    public languageVariant!: LanguageVariant;
    public identifiers!: Map<string, string>;
    public nameTable: Map<string, number> | undefined;
    public imports!: readonly StringLiteral[];
    public moduleAugmentations!: StringLiteral[];
    private namedDeclarations: Map<string, Declaration[]> | undefined;
    public ambientModuleNames!: string[];
    //public checkJsDirective: CheckJsDirective | undefined;
    public errorExpectations: TextRange[] | undefined;
    public possiblyContainDynamicImport?: boolean;
    //public pragmas!: PragmaMap;
    public localJsxFactory: EntityName | undefined;
    public localJsxNamespace: string | undefined;

    constructor(kind: SyntaxKind.SourceFile, pos: number, end: number) {
        super(kind, pos, end);
    }
    renamedDependencies?: ReadonlyMap<string, string>;
    classifiableNames?: ReadonlySet<string>;
    inherits: NodeArray<InheritDeclaration>;
    endFlowNode?: FlowNode;
    localSymbol?: Symbol;
    locals?: SymbolTable;
    nextContainer?: HasLocals;

    public update(
        newText: string,
        textChangeRange: TextChangeRange
    ): SourceFile {
        throw "Not implemneted";
        //return updateSourceFile(this, newText, textChangeRange);
    }

    public getLineAndCharacterOfPosition(position: number): LineAndCharacter {
        return getLineAndCharacterOfPosition(this, position);
    }

    public getLineStarts(): readonly number[] {
        return getLineStarts(this);
    }

    public getPositionOfLineAndCharacter(
        line: number,
        character: number,
        allowEdits?: true
    ): number {
        return computePositionOfLineAndCharacter(
            getLineStarts(this),
            line,
            character,
            this.text,
            allowEdits
        );
    }

    public getLineEndOfPosition(pos: number): number {
        const { line } = this.getLineAndCharacterOfPosition(pos);
        const lineStarts = this.getLineStarts();

        let lastCharPos: number | undefined;
        if (line + 1 >= lineStarts.length) {
            lastCharPos = this.getEnd();
        }
        if (!lastCharPos) {
            lastCharPos = lineStarts[line + 1] - 1;
        }

        const fullText = this.getFullText();
        // if the new line is "\r\n", we should return the last non-new-line-character position
        return fullText[lastCharPos] === "\n" &&
            fullText[lastCharPos - 1] === "\r"
            ? lastCharPos - 1
            : lastCharPos;
    }

    public getNamedDeclarations(): Map<string, Declaration[]> {
        if (!this.namedDeclarations) {
            this.namedDeclarations = this.computeNamedDeclarations();
        }

        return this.namedDeclarations;
    }

    private computeNamedDeclarations(): Map<string, Declaration[]> {
        const result = createMultiMap<string, Declaration>();

        this.forEachChild(visit);

        return result;

        function addDeclaration(declaration: Declaration) {
            const name = getDeclarationName(declaration);
            if (name) {
                result.add(name, declaration);
            }
        }

        function getDeclarations(name: string) {
            let declarations = result.get(name);
            if (!declarations) {
                result.set(name, (declarations = []));
            }
            return declarations;
        }

        function getDeclarationName(declaration: Declaration) {
            const name = getNonAssignedNameOfDeclaration(declaration);
            return isPropertyNameLiteral(name)
                ? getNameFromPropertyName(name)
                : undefined;
            // TODO
            // return (
            //     name &&
            //     (isComputedPropertyName(name) &&
            //     isPropertyAccessExpression(name.expression)
            //         ? name.expression.name.text
            //         : isPropertyName(name)
            //         ? getNameFromPropertyName(name)
            //         : undefined)
            // );
        }

        function visit(node: Node): void {
            switch (node.kind) {
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                    // case SyntaxKind.MethodDeclaration:
                    // case SyntaxKind.MethodSignature:
                    const functionDeclaration = node as FunctionLikeDeclaration;
                    const declarationName =
                        getDeclarationName(functionDeclaration);

                    if (declarationName) {
                        const declarations = getDeclarations(declarationName);
                        const lastDeclaration = lastOrUndefined(declarations);

                        // Check whether this declaration belongs to an "overload group".
                        if (
                            lastDeclaration &&
                            functionDeclaration.parent ===
                                lastDeclaration.parent &&
                            functionDeclaration.symbol ===
                                lastDeclaration.symbol
                        ) {
                            // Overwrite the last declaration if it was an overload
                            // and this one is an implementation.
                            if (
                                functionDeclaration.body &&
                                !(lastDeclaration as FunctionLikeDeclaration)
                                    .body
                            ) {
                                declarations[declarations.length - 1] =
                                    functionDeclaration;
                            }
                        } else {
                            declarations.push(functionDeclaration);
                        }
                    }
                    forEachChild(node, visit);
                    break;

                // case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ClassExpression:
                // case SyntaxKind.InterfaceDeclaration:
                // case SyntaxKind.TypeAliasDeclaration:
                // case SyntaxKind.EnumDeclaration:
                // case SyntaxKind.ModuleDeclaration:
                // case SyntaxKind.ImportEqualsDeclaration:
                // case SyntaxKind.ExportSpecifier:
                // case SyntaxKind.ImportSpecifier:
                // case SyntaxKind.ImportClause:
                // case SyntaxKind.NamespaceImport:
                // case SyntaxKind.GetAccessor:
                // case SyntaxKind.SetAccessor:
                case SyntaxKind.TypeLiteral:
                    addDeclaration(node as Declaration);
                    forEachChild(node, visit);
                    break;

                case SyntaxKind.Parameter:
                    // Only consider parameter properties
                    if (
                        !hasSyntacticModifier(
                            node,
                            ModifierFlags.ParameterPropertyModifier
                        )
                    ) {
                        break;
                    }
                // falls through

                case SyntaxKind.VariableDeclaration:
                case SyntaxKind.BindingElement: {
                    const decl = node as VariableDeclaration;
                    if (isBindingPattern(decl.name)) {
                        forEachChild(decl.name, visit);
                        break;
                    }
                    if (decl.initializer) {
                        visit(decl.initializer);
                    }
                }
                // falls through
                // case SyntaxKind.EnumMember:
                case SyntaxKind.PropertyDeclaration:
                    // case SyntaxKind.PropertySignature:
                    addDeclaration(node as Declaration);
                    break;

                // case SyntaxKind.ExportDeclaration:
                //     // Handle named exports case e.g.:
                //     //    export {a, b as B} from "mod";
                //     const exportDeclaration = node as ExportDeclaration;
                //     if (exportDeclaration.exportClause) {
                //         if (isNamedExports(exportDeclaration.exportClause)) {
                //             forEach(
                //                 exportDeclaration.exportClause.elements,
                //                 visit
                //             );
                //         } else {
                //             visit(exportDeclaration.exportClause.name);
                //         }
                //     }
                //     break;

                // case SyntaxKind.ImportDeclaration:
                //     const importClause = (node as ImportDeclaration)
                //         .importClause;
                //     if (importClause) {
                //         // Handle default import case e.g.:
                //         //    import d from "mod";
                //         if (importClause.name) {
                //             addDeclaration(importClause.name);
                //         }

                //         // Handle named bindings in imports e.g.:
                //         //    import * as NS from "mod";
                //         //    import {a, b as B} from "mod";
                //         if (importClause.namedBindings) {
                //             if (
                //                 importClause.namedBindings.kind ===
                //                 SyntaxKind.NamespaceImport
                //             ) {
                //                 addDeclaration(importClause.namedBindings);
                //             } else {
                //                 forEach(
                //                     importClause.namedBindings.elements,
                //                     visit
                //                 );
                //             }
                //         }
                //     }
                //     break;

                case SyntaxKind.BinaryExpression:
                    if (
                        getAssignmentDeclarationKind(
                            node as BinaryExpression
                        ) !== AssignmentDeclarationKind.None
                    ) {
                        addDeclaration(node as BinaryExpression);
                    }
                // falls through

                default:
                    forEachChild(node, visit);
            }
        }
    }
}

function addSyntheticNodes(
    nodes: Node[],
    pos: number,
    end: number,
    parent: Node
): void {
    // TODO
    // scanner.resetTokenState(pos);
    // while (pos < end) {
    //     const token = scanner.scan();
    //     const textPos = scanner.getTokenEnd();
    //     if (textPos <= end) {
    //         if (token === SyntaxKind.Identifier) {
    //             if (hasTabstop(parent)) {
    //                 continue;
    //             }
    //             Debug.fail(`Did not expect ${Debug.formatSyntaxKind(parent.kind)} to have an Identifier in its trivia`);
    //         }
    //         nodes.push(createNode(token, pos, textPos, parent));
    //     }
    //     pos = textPos;
    //     if (token === SyntaxKind.EndOfFileToken) {
    //         break;
    //     }
    // }
}

function createSyntaxList(nodes: NodeArray<Node>, parent: Node): Node {
    const list = createNode(
        SyntaxKind.SyntaxList,
        nodes.pos,
        nodes.end,
        parent
    ) as any as SyntaxList;
    const children: Node[] = [];
    let pos = nodes.pos;
    for (const node of nodes) {
        addSyntheticNodes(children, pos, node.pos, parent);
        children.push(node);
        pos = node.end;
    }
    addSyntheticNodes(children, pos, nodes.end, parent);
    list._children = children;
    return list;
}

class SymbolObject implements Symbol {
    flags: SymbolFlags;
    escapedName: string;
    declarations?: Declaration[];
    valueDeclaration?: Declaration;
    members?: SymbolTable;
    exports?: SymbolTable;
    id: number;
    mergeId: number;
    parent?: Symbol;
    exportSymbol?: Symbol;
    constEnumOnlyModule: boolean | undefined;
    isReferenced?: SymbolFlags;
    lastAssignmentPos?: number;
    links?: SymbolLinks;

    // Undefined is used to indicate the value has not been computed. If, after computing, the
    // symbol has no doc comment, then the empty array will be returned.
    documentationComment?: SymbolDisplayPart[];
    tags?: JSDocTagInfo[]; // same

    contextualGetAccessorDocumentationComment?: SymbolDisplayPart[];
    contextualSetAccessorDocumentationComment?: SymbolDisplayPart[];

    contextualGetAccessorTags?: JSDocTagInfo[];
    contextualSetAccessorTags?: JSDocTagInfo[];

    constructor(flags: SymbolFlags, name: string) {
        // Note: if modifying this, be sure to update Symbol in src/compiler/types.ts
        this.flags = flags;
        this.escapedName = name;
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
        this.links = undefined; // used by TransientSymbol
    }
    toString(): string {
        throw new Error("Method not implemented.");
    }
    valueOf(): symbol {
        throw new Error("Method not implemented.");
    }
    description: string;
    [Symbol.toPrimitive](hint: string): symbol {
        throw new Error("Method not implemented.");
    }
    [Symbol.toStringTag]: string;

    getFlags(): SymbolFlags {
        return this.flags;
    }

    get name(): string {
        return symbolName(this);
    }

    getEscapedName(): string {
        return this.escapedName;
    }

    getName(): string {
        return this.name;
    }

    getDeclarations(): Declaration[] | undefined {
        return this.declarations;
    }

    getDocumentationComment(
        checker: TypeChecker | undefined
    ): SymbolDisplayPart[] {
        if (!this.documentationComment) {
            this.documentationComment = emptyArray; // Set temporarily to avoid an infinite loop finding inherited docs

            // if (!this.declarations && isTransientSymbol(this) && this.links.target && isTransientSymbol(this.links.target) && this.links.target.links.tupleLabelDeclaration) {
            //     const labelDecl = this.links.target.links.tupleLabelDeclaration;
            //     this.documentationComment = getDocumentationComment([labelDecl], checker);
            // }
            // else {
            //     this.documentationComment = getDocumentationComment(this.declarations, checker);
            // }
        }
        return this.documentationComment;
    }

    getContextualDocumentationComment(
        context: Node | undefined,
        checker: TypeChecker | undefined
    ): SymbolDisplayPart[] {
        if (context) {
            // if (isGetAccessor(context)) {
            //     if (!this.contextualGetAccessorDocumentationComment) {
            //         this.contextualGetAccessorDocumentationComment = getDocumentationComment(filter(this.declarations, isGetAccessor), checker);
            //     }
            //     if (length(this.contextualGetAccessorDocumentationComment)) {
            //         return this.contextualGetAccessorDocumentationComment;
            //     }
            // }
            // if (isSetAccessor(context)) {
            //     if (!this.contextualSetAccessorDocumentationComment) {
            //         this.contextualSetAccessorDocumentationComment = getDocumentationComment(filter(this.declarations, isSetAccessor), checker);
            //     }
            //     if (length(this.contextualSetAccessorDocumentationComment)) {
            //         return this.contextualSetAccessorDocumentationComment;
            //     }
            // }
        }
        return this.getDocumentationComment(checker);
    }

    getJsDocTags(checker?: TypeChecker): JSDocTagInfo[] {
        if (this.tags === undefined) {
            this.tags = emptyArray; // Set temporarily to avoid an infinite loop finding inherited tags
            this.tags = getJsDocTagsOfDeclarations(this.declarations, checker);
        }

        return this.tags;
    }

    getContextualJsDocTags(
        context: Node | undefined,
        checker: TypeChecker | undefined
    ): JSDocTagInfo[] {
        if (context) {
            // if (isGetAccessor(context)) {
            //     if (!this.contextualGetAccessorTags) {
            //         this.contextualGetAccessorTags = getJsDocTagsOfDeclarations(
            //             filter(this.declarations, isGetAccessor),
            //             checker
            //         );
            //     }
            //     if (length(this.contextualGetAccessorTags)) {
            //         return this.contextualGetAccessorTags;
            //     }
            // }
            // if (isSetAccessor(context)) {
            //     if (!this.contextualSetAccessorTags) {
            //         this.contextualSetAccessorTags = getJsDocTagsOfDeclarations(
            //             filter(this.declarations, isSetAccessor),
            //             checker
            //         );
            //     }
            //     if (length(this.contextualSetAccessorTags)) {
            //         return this.contextualSetAccessorTags;
            //     }
            // }
        }
        return this.getJsDocTags(checker);
    }
}

function getJsDocTagsOfDeclarations(
    declarations: Declaration[] | undefined,
    checker: TypeChecker | undefined
): JSDocTagInfo[] {
    if (!declarations) return emptyArray;
    console.warn("todo implement me - getJsDocTagsOfDeclarations");
    return [];
    // let tags = JsDoc.getJsDocTagsFromDeclarations(declarations, checker);
    // if (checker && (tags.length === 0 || declarations.some(hasJSDocInheritDocTag))) {
    //     const seenSymbols = new Set<Symbol>();
    //     for (const declaration of declarations) {
    //         const inheritedTags = findBaseOfDeclaration(checker, declaration, symbol => {
    //             if (!seenSymbols.has(symbol)) {
    //                 seenSymbols.add(symbol);
    //                 if (declaration.kind === SyntaxKind.GetAccessor || declaration.kind === SyntaxKind.SetAccessor) {
    //                     return symbol.getContextualJsDocTags(declaration, checker);
    //                 }
    //                 return symbol.declarations?.length === 1 ? symbol.getJsDocTags(checker) : undefined;
    //             }
    //         });
    //         if (inheritedTags) {
    //             tags = [...inheritedTags, ...tags];
    //         }
    //     }
    // }
    // return tags;
}

class TypeObject implements Type {
    checker: TypeChecker;
    flags: TypeFlags;
    objectFlags?: ObjectFlags;
    id!: number;
    symbol!: Symbol;
    constructor(checker: TypeChecker, flags: TypeFlags) {
        // Note: if modifying this, be sure to update Type in src/compiler/types.ts
        this.flags = flags;
        this.checker = checker;
    }
    getFlags(): TypeFlags {
        return this.flags;
    }
    getSymbol(): Symbol | undefined {
        return this.symbol;
    }
    getProperties(): Symbol[] {
        throw "implement me";
        //return this.checker.getPropertiesOfType(this);
    }
    getProperty(propertyName: string): Symbol | undefined {
        throw "implement me";
        // return this.checker.getPropertyOfType(this, propertyName);
    }
    getApparentProperties(): Symbol[] {
        throw "implement me";
        // return this.checker.getAugmentedPropertiesOfType(this);
    }
    getCallSignatures(): readonly Signature[] {
        throw "implement me";
        // return this.checker.getSignaturesOfType(this, SignatureKind.Call);
    }
    getConstructSignatures(): readonly Signature[] {
        throw "implement me";
        // return this.checker.getSignaturesOfType(this, SignatureKind.Construct);
    }
    getStringIndexType(): Type | undefined {
        throw "implement me";
        // return this.checker.getIndexTypeOfType(this, IndexKind.String);
    }
    getNumberIndexType(): Type | undefined {
        throw "implement me";
        // return this.checker.getIndexTypeOfType(this, IndexKind.Number);
    }
    getBaseTypes(): BaseType[] | undefined {
        throw "implement me";
        // return this.isClassOrInterface()
        //     ? this.checker.getBaseTypes(this)
        //     : undefined;
    }
    isNullableType(): boolean {
        throw "implement me";
        // return this.checker.isNullableType(this);
    }
    getNonNullableType(): Type {
        throw "implement me";
        // return this.checker.getNonNullableType(this);
    }
    getNonOptionalType(): Type {
        throw "implement me";
        // return this.checker.getNonOptionalType(this);
    }
    getConstraint(): Type | undefined {
        throw "implement me";
        // return this.checker.getBaseConstraintOfType(this);
    }
    getDefault(): Type | undefined {
        throw "implement me";
        // return this.checker.getDefaultFromTypeParameter(this);
    }

    isUnion(): this is UnionType {
        return !!(this.flags & TypeFlags.Union);
    }

    isUnionOrIntersection(): this is UnionOrIntersectionType {
        return !!(this.flags & TypeFlags.UnionOrIntersection);
    }
    isLiteral(): this is LiteralType {
        return !!(
            this.flags &
            (TypeFlags.StringLiteral |
                TypeFlags.IntLiteral |
                TypeFlags.FloatLiteral)
        );
    }
    isStringLiteral(): this is StringLiteralType {
        return !!(this.flags & TypeFlags.StringLiteral);
    }
    isIntLiteral(): this is IntLiteralType {
        return !!(this.flags & TypeFlags.IntLiteral);
    }
    isFloatLiteral(): this is FloatLiteralType {
        return !!(this.flags & TypeFlags.FloatLiteral);
    }
    isTypeParameter(): this is TypeParameter {
        return !!(this.flags & TypeFlags.TypeParameter);
    }
    // isClass(): this is InterfaceType {
    //     return !!(getObjectFlags(this) & ObjectFlags.Class);
    // }
    isIndexType(): this is IndexType {
        return !!(this.flags & TypeFlags.Index);
    }
}

class SignatureObject implements Signature {
    flags: SignatureFlags;
    checker: TypeChecker;
    declaration!: SignatureDeclaration;
    typeParameters?: TypeParameter[];
    parameters!: Symbol[];
    thisParameter!: Symbol;
    resolvedReturnType!: Type;
    //resolvedTypePredicate: TypePredicate | undefined;
    minTypeArgumentCount!: number;
    minArgumentCount!: number;

    // Undefined is used to indicate the value has not been computed. If, after computing, the
    // symbol has no doc comment, then the empty array will be returned.
    documentationComment?: SymbolDisplayPart[];
    jsDocTags?: JSDocTagInfo[]; // same

    constructor(checker: TypeChecker, flags: SignatureFlags) {
        // Note: if modifying this, be sure to update Signature in src/compiler/types.ts
        this.flags = flags;
        this.checker = checker;
    }

    getDeclaration(): SignatureDeclaration {
        return this.declaration;
    }
    getTypeParameters(): TypeParameter[] | undefined {
        return this.typeParameters;
    }
    getParameters(): Symbol[] {
        return this.parameters;
    }
    getReturnType(): Type {
        throw "implement me";
        //return this.checker.getReturnTypeOfSignature(this);
    }

    getDocumentationComment(): SymbolDisplayPart[] {
        throw "implement me";
        //return this.documentationComment || (this.documentationComment = getDocumentationComment(singleElementArray(this.declaration), this.checker));
    }

    getJsDocTags(): JSDocTagInfo[] {
        return (
            this.jsDocTags ||
            (this.jsDocTags = getJsDocTagsOfDeclarations(
                singleElementArray(this.declaration),
                this.checker
            ))
        );
    }
}

import { pushIfDefined } from "../utils.js";
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
    hasSyntacticModifier,
    Identifier,
    IndexKind,
    IndexType,
    InheritDeclaration,
    IntLiteralType,
    isBindingPattern,
    isJSDocCommentContainingNode,
    isNodeKind,
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
    setObjectAllocator,
    CancellationToken,
    returnFalse,
    noop,
    Program,
    LanguageService,
    DefinitionInfo,
    CreateProgramOptions,
    LanguageServiceHost,
    CompilerOptions,
    CompilerHost,
    createProgram,
    getNewLineCharacter,
    maybeBind,
    toPath,
    IScriptSnapshot,
    ScriptTarget,
    CreateSourceFileOptions,
    ScriptKind,
    createSourceFile,
    getSnapshotText,
    DocumentRegistry,
    createDocumentRegistry,
    createGetCanonicalFileName,
    directoryProbablyExists,
    ModuleKind,
    textSpanEnd,
    updateSourceFile,
    TextSpan,
    GoToDefinition,
    PossibleProgramFileInfo,
    QuickInfo,
    getTouchingPropertyName,
    isNewExpression,
    ScriptElementKind,
    ScriptElementKindModifier,
    createTextSpanFromNode,
    SymbolDisplay,
    EmitTextWriter,
    typeToDisplayParts,
    getContainerNode,
    HostCancellationToken,
    timestamp,
    tracing,
    OperationCanceledException,
    map,
    LanguageServiceMode,
    LpcFileHandler,
    Diagnostic,
    getScriptKind,
    getSourceMapper,
    hostUsesCaseSensitiveFileNames,
    NavigationTree,
    getImpliedNodeFormatForFile,
    hostGetCanonicalFileName,
    getSetExternalModuleIndicator,
    JSDocParsingMode,
    ReferencedSymbol,
    getMappedDocumentSpan,
    DocumentSpan,
    hasJSDocNodes,
    isIdentifier,
    isStringOrNumericLiteralLike,
    isTagName,
    IntLiteral,
    FloatLiteral,
    isDeclarationName,
    isLiteralComputedPropertyDeclarationName,
    getEscapedTextOfIdentifierOrLiteral,
    UserPreferences,
    RenameInfo,
    Rename,
    getAdjustedRenameLocation,
    getQuotePreference,
    emptyOptions,
    RenameLocation,
    GetCompletionsAtPositionOptions,
    identity,
    Completions,
    formatting,
    isToken,
    firstDefined,
    CompletionInfo,
    InterfaceType,
    NavigationBar,
    FindAllReferences,
    isInComment,
    JsDoc,
    getJSDocTags,
    getAllSuperTypeNodes,
    lineBreakPart,
    hasTabstop,
    isComputedPropertyName,
    isPropertyAccessExpression,
    isPropertyName,
    isIncludeDirective,
    Classifications,
    SignatureHelpItemsOptions,
    SignatureHelpItems,
    SignatureHelp,
    isDefineDirective,
    createLpcFileHandler,
    sys,
    isProgramUptoDate,
    HasInvalidatedResolutions,
    ParsedCommandLine,
    JsonSourceFile,
    parseJsonSourceFileConfigFileContent,
    getDirectoryPath,
    getNormalizedAbsolutePath,
    ParseConfigFileHost,
    CompletionEntryDetails,
    CompletionEntryData,
    DocCommentTemplateOptions,
    TextInsertion,
    getNewLineOrDefaultFromHost,
    PragmaMap,
    ResolvedProjectReference,
    CheckLpcDirective,
    bindSourceFile,
    tryGetTextOfPropertyName,
    getSourceFileOrIncludeOfNode,
    SourceFileBase,
} from "./_namespaces/lpc.js";
import * as classifier2020 from "./classifier2020.js";
import { computeSuggestionDiagnostics } from "./suggestionDiagnostics.js";

// These utilities are common to multiple language service features.
// #region
/** @internal */
export const scanner: Scanner = createScanner(ScriptTarget.LPC, /*skipTrivia*/ true, /*shouldSkipNonParsableDirectives*/ true);

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

    public getSourceFileOrInclude(): SourceFileBase {
        return getSourceFileOrIncludeOfNode(this);
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

    public getWidth(sourceFile?: SourceFileBase): number {        
        return this.getEnd() - this.getStart(sourceFile);        
    }

    public getFullWidth(): number {
        return this.end - this.pos;
    }

    public getLeadingTriviaWidth(sourceFile?: SourceFileBase): number {
        return this.getStart(sourceFile) - this.pos;
    }

    public getFullText(sourceFile?: SourceFileBase): string {
        return (sourceFile || this.getSourceFileOrInclude()).text.substring(
            this.pos,
            this.end
        );
    }

    public getText(sourceFile?: SourceFileBase): string {
        if (!sourceFile) {
            sourceFile = this.getSourceFileOrInclude();
            Debug.assertIsDefined(sourceFile);
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

class IdentifierObject extends TokenOrIdentifierObject<SyntaxKind.Identifier> implements Identifier {
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

class TokenObject<TKind extends SyntaxKind> extends TokenOrIdentifierObject<TKind> implements Token<TKind> {
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

    public getSourceFileOrInclude(): SourceFileBase {
        return getSourceFileOrIncludeOfNode(this);
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

    public getLeadingTriviaWidth(sourceFile?: SourceFileBase): number {
        this.assertHasRealPosition();
        return this.getStart(sourceFile) - this.pos;
    }

    public getFullText(sourceFile?: SourceFileBase): string {
        this.assertHasRealPosition();
        return (sourceFile || this.getSourceFileOrInclude()).text.substring(
            this.pos,
            this.end
        );
    }

    public getText(sourceFile?: SourceFileBase): string {
        this.assertHasRealPosition();
        if (!sourceFile) {
            sourceFile = this.getSourceFileOrInclude();
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
    Debug.assertIsDefined(pos);
    const processNode = (child: Node) => {
        addSyntheticNodes(children, pos, child.pos, node, sourceFile.inactiveCodeRanges);
        children.push(child);        
        pos = child.end;
        Debug.assertIsDefined(pos);
    };
    const processNodes = (nodes: NodeArray<Node>) => {                
        // const nodesInSameFile = nodes.filter(n => !n.originFilename || n.originFilename === (isSourceFile(node) ? node.fileName : node.originFilename));        
        // if (nodesInSameFile.length !== nodes.length) {
        //     // if (nodesInSameFile.length === 0) {
        //     //     pos = nodes.end ?? 0;
        //     //     return;
        //     // }
        //     nodes = factory.createNodeArray(nodesInSameFile);
        //     if (nodes.length > 0) {
        //         setTextRangePosEnd(nodes, nodesInSameFile[0].pos, nodesInSameFile[nodesInSameFile.length - 1].end);
        //     }
        // }
        // nodes.forEach(n => {
        //     if (n.originFilename !== (isSourceFile(node) ? node.fileName : node.originFilename)) {
        //         Debug.assert(n.end <= node.end);
        //         Debug.assert(n.pos >= node.pos);
        //     }
        // });
        addSyntheticNodes(children, pos, nodes.pos, node, sourceFile.inactiveCodeRanges);
        pushIfDefined(children, createSyntaxList(nodes, node, sourceFile.inactiveCodeRanges));
        pos = nodes.end ?? 0;
        Debug.assertIsDefined(pos);
    };
    // jsDocComments need to be the first children
    forEach((node as JSDocContainer).jsDoc, processNode);
    // For syntactic classifications, all trivia are classified together, including jsdoc comments.
    // For that to work, the jsdoc comments should still be the leading trivia of the first child.
    // Restoring the scanner position ensures that.
    pos = node.pos;
    node.forEachChild(processNode, processNodes);
    if (pos >= 0) {
        // if pos is -1 then children had an empty syntax list
        addSyntheticNodes(children, pos, node.end, node, sourceFile.inactiveCodeRanges);
    }
    scanner.setText(undefined);

    return children;
}

class SourceFileObject extends NodeObject<SyntaxKind.SourceFile> implements SourceFile {
    declare _declarationBrand: any;
    declare _localsContainerBrand: any;
    declare _hasHeritageBrand: any;
    public fileName!: string;
    public path!: Path;
    public resolvedPath!: Path;
    public originalFileName!: string;
    public text!: string;
    public scriptSnapshot!: IScriptSnapshot;
    public lineMap!: readonly number[];

    public statements!: NodeArray<Statement>;
    public endOfFileToken!: Token<SyntaxKind.EndOfFileToken>;

    // public amdDependencies!: { name: string; path: string }[];
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
    public scriptKind!: ScriptKind;
    public languageVersion!: ScriptTarget;
    public languageVariant!: LanguageVariant;
    public identifiers!: Map<string, string>;
    public nameTable: Map<string, number> | undefined;
    public imports!: readonly StringLiteral[];
    public heritageClauses!: NodeArray<InheritDeclaration>;
    public moduleAugmentations!: StringLiteral[];
    private namedDeclarations: Map<string, Declaration[]> | undefined;
    public ambientModuleNames!: string[];
    //public checkJsDirective: CheckJsDirective | undefined;
    public errorExpectations: TextRange[] | undefined;
    public possiblyContainDynamicImport?: boolean;
    public pragmas!: PragmaMap;
    public localJsxFactory: EntityName | undefined;
    public localJsxNamespace: string | undefined;
    public checkLpcDirective: CheckLpcDirective | undefined;

    constructor(kind: SyntaxKind.SourceFile, pos: number, end: number) {
        super(kind, pos, end);
    }

    // renamedDependencies?: ReadonlyMap<string, string>;
    // classifiableNames?: ReadonlySet<string>;
    // inherits: NodeArray<InheritDeclaration>;
    // endFlowNode?: FlowNode;
    // localSymbol?: Symbol;
    // locals?: SymbolTable;
    // nextContainer?: HasLocals;

    public update(newText: string, textChangeRange: TextChangeRange): SourceFile {
        Debug.fail("not implemented");
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
            return name && (isComputedPropertyName(name) && isPropertyAccessExpression(name.expression) ? tryGetTextOfPropertyName(name.expression.name)
                : isPropertyName(name) ? getNameFromPropertyName(name) : undefined);            
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

                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ClassExpression:
                // case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                case SyntaxKind.StructDeclaration:                
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

/**
 * 
 * @param nodes 
 * @param pos 
 * @param end 
 * @param parent 
 * @param skipRanges TextRanges of code that has been disabled by directives. These ranges will not be scanned for tokens
 */
function addSyntheticNodes(
    nodes: Node[],
    pos: number,
    end: number,
    parent: Node,
    skipRanges: readonly TextRange[]
): void {        
    // find the first skip range that ends after pos
    let skipIdx = 0;
    while (skipIdx < skipRanges.length - 1 && skipRanges[skipIdx].end < pos) {
        skipIdx++;
    }
    // if there are no skipped ranges, then skipIdx should be -1 and we won't check it later
    if (skipRanges.length == 0) skipIdx = -1;

    scanner.resetTokenState(pos, true);
    while (pos < end) {        
        let token = scanner.scan();
        let textPos = scanner.getTokenEnd();
                
        // handle define directives - scan all the way to the end of the line and ignore and non-trivia tokens
        if (token === SyntaxKind.DefineDirective) {
            token = scanner.scan();
            while (token !== SyntaxKind.EndOfFileToken && token !== SyntaxKind.NewLineTrivia) {
                token = scanner.scan();
            }            
            pos = scanner.getTokenEnd();
            continue;
        }
        if (isDefineDirective(parent) && pos >= parent.range?.pos) {
            // skip the contents of a define direct
            pos = parent.range.end;
            continue;
        }        
        
        // handle include directive with global path, e.g. #include <foo>
        if (token === SyntaxKind.IncludeDirective) {                                    
            token = scanner.scan(); // get the string literal
            if (token === SyntaxKind.LessThanToken) {
                token = scanner.reScanLessThanTokenAsStringLiteral();
            }

            textPos = scanner.getTokenEnd();
        } else if (token === SyntaxKind.LessThanToken && isIncludeDirective(parent)) {
            token = scanner.reScanLessThanTokenAsStringLiteral();
            textPos = scanner.getTokenEnd();
        }

        if (textPos <= end) {      
            // advanced to next skip range if needed      
            while (skipIdx >= 0 && skipRanges[skipIdx].end < textPos && skipIdx < skipRanges.length - 1) {
                skipIdx++;
            }

            // if pos is inside a skipped range, then continue
            if (skipIdx >= 0 && textPos >= skipRanges[skipIdx].pos && textPos <= skipRanges[skipIdx].end) {
                if (token === SyntaxKind.EndOfFileToken) {
                    break;
                }
                continue;
            }                        

            if (token === SyntaxKind.Identifier) {
                if (hasTabstop(parent)) {
                    continue;
                }                
                console.warn(`Did not expect ${Debug.formatSyntaxKind(parent.kind)} to have an Identifier in its trivia`);
                break;
                // Debug.fail(`Did not expect ${Debug.formatSyntaxKind(parent.kind)} to have an Identifier in its trivia`);
            }
            
            nodes.push(createNode(token, pos, textPos, parent));
        }
        pos = textPos;
        if (token === SyntaxKind.EndOfFileToken) {
            break;
        }
    }
}

function createSyntaxList(nodes: NodeArray<Node>, parent: Node, skipRanges: readonly TextRange[]): SyntaxList | undefined {
    const list = createNode(
        SyntaxKind.SyntaxList,
        nodes.pos,
        nodes.end,
        parent
    ) as any as SyntaxList;
    const children: Node[] = [];
    let pos = nodes.pos;
    for (const node of nodes) {
        // TODO - disable hover on macros for now
        // if (!node.macro && (!node.originFilename || node.originFilename === sourceFilename)) {
            addSyntheticNodes(children, pos, node.pos, parent, skipRanges);
            children.push(node);
            pos = node.end;            
        // }
    }
    
    // if (children.length > 0) {
    if ((parent.flags & NodeFlags.MacroContext) === 0) {
        addSyntheticNodes(children, pos, nodes.end, parent, skipRanges);    
    }
    // }
    list._children = children;    
    return list;
}

class SymbolObject implements Symbol {
    flags: SymbolFlags;
    name: string;
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
        this.links = undefined; // used by TransientSymbol
    }

    getFlags(): SymbolFlags {
        return this.flags;
    }

    getEscapedName(): string {
        return this.name;
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
                this.documentationComment = getDocumentationComment(this.declarations, checker);
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

function findBaseOfDeclaration<T>(checker: TypeChecker, declaration: Declaration, cb: (symbol: Symbol) => T[] | undefined): T[] | undefined {
    const classOrInterfaceDeclaration = declaration.parent;// declaration.parent?.kind === SyntaxKind.Constructor ? declaration.parent.parent : declaration.parent;
    if (!classOrInterfaceDeclaration) return;

    const isStaticMember = false;// hasStaticModifier(declaration);
    return firstDefined(getAllSuperTypeNodes(classOrInterfaceDeclaration), superTypeNode => {
        const baseType = checker.getTypeAtLocation(superTypeNode);
        const type = isStaticMember && baseType.symbol ? checker.getTypeOfSymbol(baseType.symbol) : baseType;
        const symbol = checker.getPropertyOfType(type, declaration.symbol.name);
        return symbol ? cb(symbol) : undefined;
    });
}

/**
 * Returns whether or not the given node has a JSDoc "inheritDoc" tag on it.
 * @param node the Node in question.
 * @returns `true` if `node` has a JSDoc "inheritDoc" tag on it, otherwise `false`.
 */
function hasJSDocInheritDocTag(node: Node) {
    return getJSDocTags(node).some(tag => tag.tagName.text === "inheritDoc" || tag.tagName.text === "inheritdoc");
}

function getJsDocTagsOfDeclarations(declarations: Declaration[] | undefined, checker: TypeChecker | undefined): JSDocTagInfo[] {
    if (!declarations) return emptyArray;

    let tags = JsDoc.getJsDocTagsFromDeclarations(declarations, checker);
    if (checker && (tags.length === 0 || declarations.some(hasJSDocInheritDocTag))) {
        const seenSymbols = new Set<Symbol>();
        for (const declaration of declarations) {
            const inheritedTags = findBaseOfDeclaration(checker, declaration, symbol => {
                if (!seenSymbols.has(symbol)) {
                    seenSymbols.add(symbol);                    
                    return symbol.declarations?.length === 1 ? symbol.getJsDocTags(checker) : undefined;
                }
            });
            if (inheritedTags) {
                tags = [...inheritedTags, ...tags];
            }
        }
    }
    return tags;
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
    isClassOrInterface(): this is InterfaceType {
        return !!(getObjectFlags(this) & ObjectFlags.ClassOrInterface);
    }
    isClass(): this is InterfaceType {
        return !!(getObjectFlags(this) & ObjectFlags.Class);
    }
    getFlags(): TypeFlags {
        return this.flags;
    }
    getSymbol(): Symbol | undefined {
        return this.symbol;
    }
    getProperties(): Symbol[] {        
        return this.checker.getPropertiesOfType(this);
    }
    getProperty(propertyName: string): Symbol | undefined {        
        return this.checker.getPropertyOfType(this, propertyName);
    }
    getApparentProperties(): Symbol[] {        
        return this.checker.getAugmentedPropertiesOfType(this);
    }
    getCallSignatures(): readonly Signature[] {        
        return this.checker.getSignaturesOfType(this, SignatureKind.Call);
    }
    getConstructSignatures(): readonly Signature[] {        
        return this.checker.getSignaturesOfType(this, SignatureKind.Construct);
    }
    getStringIndexType(): Type | undefined {        
        return this.checker.getIndexTypeOfType(this, IndexKind.String);
    }
    getNumberIndexType(): Type | undefined {        
        return this.checker.getIndexTypeOfType(this, IndexKind.Number);
    }
    getBaseTypes(): BaseType[] | undefined {        
        return this.isClassOrInterface()
            ? this.checker.getBaseTypes(this)
            : undefined;
    }
    isNullableType(): boolean {        
        return this.checker.isNullableType(this);
    }
    getNonNullableType(): Type {        
        return this.checker.getNonNullableType(this);
    }
    getNonOptionalType(): Type {        
        return this.checker.getNonOptionalType(this);
    }
    getConstraint(): Type | undefined {        
        return this.checker.getBaseConstraintOfType(this);
    }
    getDefault(): Type | undefined {        
        return this.checker.getDefaultFromTypeParameter(this);
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
        return this.checker.getReturnTypeOfSignature(this);
    }

    getDocumentationComment(): SymbolDisplayPart[] {        
        return this.documentationComment || (this.documentationComment = getDocumentationComment(singleElementArray(this.declaration), this.checker));
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

const NoopCancellationToken: CancellationToken = {
    isCancellationRequested: returnFalse,
    throwIfCancellationRequested: noop,
};

export function getDefaultCompilerOptions(): CompilerOptions {
    // Always default to "ScriptTarget.ES5" for the language service
    return {
        libIncludeDirs: ["/sys", "/include"],
    };
}

export function createLanguageService(
    host: LanguageServiceHost,
    fileHandler: LpcFileHandler,
    documentRegistry: DocumentRegistry = createDocumentRegistry(                
        host.useCaseSensitiveFileNames && host.useCaseSensitiveFileNames(),
        host.getCurrentDirectory(),
        host.jsDocParsingMode
    ),
    syntaxOnlyOrLanguageServiceMode?: boolean | LanguageServiceMode,
): LanguageService {
    let languageServiceMode: LanguageServiceMode;
    if (syntaxOnlyOrLanguageServiceMode === undefined) {
        languageServiceMode = LanguageServiceMode.Semantic;
    }
    else if (typeof syntaxOnlyOrLanguageServiceMode === "boolean") {
        // languageServiceMode = SyntaxOnly
        languageServiceMode = syntaxOnlyOrLanguageServiceMode ? LanguageServiceMode.Syntactic : LanguageServiceMode.Semantic;
    }
    else {
        languageServiceMode = syntaxOnlyOrLanguageServiceMode;
    }
    
    const syntaxTreeCache: SyntaxTreeCache = new SyntaxTreeCache(host);
    let program: Program;
    let lastProjectVersion: string;
    let lastTypesRootVersion = 0;

    const cancellationToken = NoopCancellationToken;

    function log(message: string) {        
        if (host.log) {
            host.log(message);
        }
    }
    
    const currentDirectory = host.getCurrentDirectory();
    const useCaseSensitiveFileNames = hostUsesCaseSensitiveFileNames(host);
    const getCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);
    
    const sourceMapper = getSourceMapper({
        useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
        getCurrentDirectory: () => currentDirectory,
        getProgram,
        fileExists: maybeBind(host, host.fileExists),
        readFile: maybeBind(host, host.readFile),
        getDocumentPositionMapper: maybeBind(host, host.getDocumentPositionMapper),
        getSourceFileLike: maybeBind(host, host.getSourceFileLike),
        log,
    });
    
    const ls: LanguageService = {
        getEncodedSemanticClassifications,
        getDefinitionAtPosition,
        getQuickInfoAtPosition,
        getSignatureHelpItems,
        cleanupSemanticCache,
        getCompilerOptionsDiagnostics,
        getProgram,
        getCurrentProgram: () => program,
        getSuggestionDiagnostics,
        getSyntacticDiagnostics,
        getSemanticDiagnostics,
        getSourceMapper: () => sourceMapper,
        toLineColumnOffset,
        getNavigationTree,
        findReferences,
        updateIsDefinitionOfReferencedSymbols,
        findRenameLocations,
        getRenameInfo,
        getCompletionsAtPosition,
        getCompletionEntryDetails,
        getDocCommentTemplateAtPosition,
        dispose
    };

    return ls;

    function dispose(): void {
        cleanupSemanticCache();
        host = undefined!;
    }

    // TODO: GH#18217 frequently asserted as defined
    function getProgram(): Program | undefined {
        if (languageServiceMode === LanguageServiceMode.Syntactic) {
            Debug.assert(program === undefined);
            return undefined;
        }

        synchronizeHostData();

        return program;
    }

    function getNavigationTree(fileName: string): NavigationTree {        
        return NavigationBar.getNavigationTree(syntaxTreeCache.getCurrentSourceFile(fileName), cancellationToken);
    }
    
    function updateIsDefinitionOfReferencedSymbols(referencedSymbols: readonly ReferencedSymbol[], knownSymbolSpans: Set<DocumentSpan>): boolean {
        const checker = program.getTypeChecker();
        const symbol = getSymbolForProgram();

        if (!symbol) return false;

        for (const referencedSymbol of referencedSymbols) {
            for (const ref of referencedSymbol.references) {
                const refNode = getNodeForSpan(ref);
                Debug.assertIsDefined(refNode);
                if (knownSymbolSpans.has(ref) || FindAllReferences.isDeclarationOfSymbol(refNode, symbol)) {
                    knownSymbolSpans.add(ref);
                    ref.isDefinition = true;
                    const mappedSpan = getMappedDocumentSpan(ref, sourceMapper, maybeBind(host, host.fileExists));
                    if (mappedSpan) {
                        knownSymbolSpans.add(mappedSpan);
                    }
                }
                else {
                    ref.isDefinition = false;
                }
            }
        }

        return true;

        function getSymbolForProgram(): Symbol | undefined {
            for (const referencedSymbol of referencedSymbols) {
                for (const ref of referencedSymbol.references) {
                    if (knownSymbolSpans.has(ref)) {
                        const refNode = getNodeForSpan(ref);
                        Debug.assertIsDefined(refNode);
                        return checker.getSymbolAtLocation(refNode);
                    }
                    const mappedSpan = getMappedDocumentSpan(ref, sourceMapper, maybeBind(host, host.fileExists));
                    if (mappedSpan && knownSymbolSpans.has(mappedSpan)) {
                        const refNode = getNodeForSpan(mappedSpan);
                        if (refNode) {
                            return checker.getSymbolAtLocation(refNode);
                        }
                    }
                }
            }

            return undefined;
        }

        function getNodeForSpan(docSpan: DocumentSpan): Node | undefined {
            const sourceFile = program.getSourceFile(docSpan.fileName);
            if (!sourceFile) return undefined;
            const rawNode = getTouchingPropertyName(sourceFile, docSpan.textSpan.start);
            const adjustedNode = FindAllReferences.Core.getAdjustedNode(rawNode, { use: FindAllReferences.FindReferencesUse.References });
            return adjustedNode;
        }
    }

    
    function cleanupSemanticCache(): void {
        if (program) {
            // Use paths to ensure we are using correct key and paths as document registry could be created with different current directory than host
            const key = documentRegistry.getKeyForCompilationSettings(program.getCompilerOptions());
            forEach(program.getSourceFiles(), f => documentRegistry.releaseDocumentWithKey(f.resolvedPath, key, f.scriptKind, f.impliedNodeFormat));
            program = undefined!; // TODO: GH#18217
        }
    }

    /// Diagnostics
    function getSyntacticDiagnostics(fileName: string): DiagnosticWithLocation[] {
        synchronizeHostData();

        return program.getSyntacticDiagnostics(getValidSourceFile(fileName), cancellationToken).slice();
    }

    /**
     * getSemanticDiagnostics return array of Diagnostics. If '-d' is not enabled, only report semantic errors
     * If '-d' enabled, report both semantic and emitter errors
     */
    function getSemanticDiagnostics(fileName: string): Diagnostic[] {
        synchronizeHostData();

        const targetSourceFile = getValidSourceFile(fileName);

        // Only perform the action per file regardless of '-out' flag as LanguageServiceHost is expected to call this function per file.
        // Therefore only get diagnostics for given file.

        const semanticDiagnostics = program.getSemanticDiagnostics(targetSourceFile, cancellationToken);
        // if (!getEmitDeclarations(program.getCompilerOptions())) {
        //     return semanticDiagnostics.slice();
        // }

        // If '-d' is enabled, check for emitter error. One example of emitter error is export class implements non-export interface
        const declarationDiagnostics = program.getDeclarationDiagnostics(targetSourceFile, cancellationToken);
        return [...semanticDiagnostics, ...declarationDiagnostics];
    }

    function getSuggestionDiagnostics(fileName: string): DiagnosticWithLocation[] {
        synchronizeHostData();
        return computeSuggestionDiagnostics(getValidSourceFile(fileName), program, cancellationToken);        
    }

    function getCompilerOptionsDiagnostics() {
        synchronizeHostData();
        return [...program.getOptionsDiagnostics(cancellationToken), ...program.getGlobalDiagnostics(cancellationToken)];
    }

    function findReferences(fileName: string, position: number): ReferencedSymbol[] | undefined {
        synchronizeHostData();
        return FindAllReferences.findReferencedSymbols(program, cancellationToken, program.getSourceFiles(), getValidSourceFile(fileName), position);
    }
    
    function toLineColumnOffset(fileName: string, position: number): LineAndCharacter {
        // Go to Definition supports returning a zero-length span at position 0 for
        // non-existent files. We need to special-case the conversion of position 0
        // to avoid a crash trying to get the text for that file, since this function
        // otherwise assumes that 'fileName' is the name of a file that exists.
        if (position === 0) {
            return { line: 0, character: 0 };
        }
        return sourceMapper.toLineColumnOffset(fileName, position);
    }

    function synchronizeHostData(): void {
        if (host.updateFromProject && !host.updateFromProjectInProgress) {
            host.updateFromProject();
        }
        else {
            synchronizeHostDataWorker();
        }
    }

    function synchronizeHostDataWorker(): void {
        Debug.assert(languageServiceMode !== LanguageServiceMode.Syntactic);

        // perform fast check if host supports it
        if (host.getProjectVersion) {
            const hostProjectVersion = host.getProjectVersion();
            if (hostProjectVersion) {
                if (lastProjectVersion === hostProjectVersion) {
                    // && !host.hasChangedAutomaticTypeDirectiveNames?.()) {
                    return;
                }

                lastProjectVersion = hostProjectVersion;
            }
        }

        // This array is retained by the program and will be used to determine if the program is up to date,
        // so we need to make a copy in case the host mutates the underlying array - otherwise it would look
        // like every program always has the host's current list of root files.
        const rootFileNames = host.getScriptFileNames().slice();                
        const parseableFiles = new Set(host.getParseableFiles());

        // Get a fresh cache of the host information
        const newSettings = host.getCompilationSettings() || getDefaultCompilerOptions();
        const hasInvalidatedResolutions: HasInvalidatedResolutions = host.hasInvalidatedResolutions || returnFalse;
        const hasInvalidatedLibResolutions = maybeBind(host, host.hasInvalidatedLibResolutions) || returnFalse;
        const hasChangedAutomaticTypeDirectiveNames = maybeBind(host, host.hasChangedAutomaticTypeDirectiveNames);
        const projectReferences = host.getProjectReferences?.();
        let parsedCommandLines: Map<Path, ParsedCommandLine | false> | undefined;

        const useCaseSensitiveFileNames = hostUsesCaseSensitiveFileNames(host);
        const getCanonicalFileName = createGetCanonicalFileName(
            useCaseSensitiveFileNames
        );

        // The call to isProgramUptoDate below may refer back to documentRegistryBucketKey;
        // calculate this early so it's not undefined if downleveled to a var (or, if emitted
        // as a const variable without downleveling, doesn't crash).
        const documentRegistryBucketKey =
            documentRegistry.getKeyForCompilationSettings(newSettings);
        let releasedScriptKinds: Set<Path> | undefined = new Set();

        const currentDirectory = host.getCurrentDirectory();

        // Now create a new compiler
        let compilerHost: CompilerHost | undefined = {
            getSourceFile: getOrCreateSourceFile,
            getSourceFileByPath: getOrCreateSourceFileByPath,
            getSourceTextFromSnapshot: getSourceTextFromSnapshot,
            getCancellationToken: () => cancellationToken,
            getCanonicalFileName,
            useCaseSensitiveFileNames: () => true, //useCaseSensitiveFileNames,
            getNewLine: () => getNewLineCharacter(newSettings),
            getDefaultLibFileName: options => host.getDefaultLibFileName(options),
            writeFile: noop,
            getCurrentDirectory: () => currentDirectory,
            fileExists: (fileName) => host.fileExists(fileName),
            readFile: (fileName) => host.readFile && host.readFile(fileName),
            //getSymlinkCache: maybeBind(host, host.getSymlinkCache),
            realpath: maybeBind(host, host.realpath),
            directoryExists: (directoryName) => {
                return directoryProbablyExists(directoryName, host);
            },
            getDirectories: (path) => {
                return host.getDirectories ? host.getDirectories(path) : [];
            },
            readDirectory: (
                path: string,
                extensions?: readonly string[],
                exclude?: readonly string[],
                include?: readonly string[],
                depth?: number
            ) => {
                Debug.checkDefined(
                    host.readDirectory,
                    "'LanguageServiceHost.readDirectory' must be implemented to correctly process 'projectReferences'"
                );
                return host.readDirectory!(
                    path,
                    extensions,
                    exclude,
                    include,
                    depth
                );
            },
            onReleaseOldSourceFile,
            onReleaseParsedCommandLine,
            onAllFilesNeedReparse,
            hasInvalidatedResolutions,
            hasInvalidatedLibResolutions,
            //hasChangedAutomaticTypeDirectiveNames,
            trace: maybeBind(host, host.trace),
            resolveModuleNames: maybeBind(host, host.resolveModuleNames),
            getModuleResolutionCache: maybeBind(
                host,
                host.getModuleResolutionCache
            ),
            createHash: maybeBind(host, host.createHash),
            // resolveTypeReferenceDirectives: maybeBind(
            //     host,
            //     host.resolveTypeReferenceDirectives
            // ),
            resolveModuleNameLiterals: maybeBind(
                host,
                host.resolveModuleNameLiterals
            ),
            // resolveTypeReferenceDirectiveReferences: maybeBind(
            //     host,
            //     host.resolveTypeReferenceDirectiveReferences
            // ),
            resolveLibrary: maybeBind(host, host.resolveLibrary),
            useSourceOfProjectReferenceRedirect: maybeBind(
                host,
                host.useSourceOfProjectReferenceRedirect
            ),
            getParsedCommandLine,
            jsDocParsingMode: host.jsDocParsingMode,            
            getParseableFiles: maybeBind(host, host.getParseableFiles),            
        };

        host.setCompilerHost?.(compilerHost);

        const parseConfigHost: ParseConfigFileHost = {
            useCaseSensitiveFileNames,
            fileExists: fileName => compilerHost!.fileExists(fileName),
            readFile: fileName => compilerHost!.readFile(fileName),
            directoryExists: f => compilerHost!.directoryExists!(f),
            getDirectories: f => compilerHost!.getDirectories!(f),
            realpath: compilerHost.realpath,
            readDirectory: (...args) => compilerHost!.readDirectory!(...args),
            trace: compilerHost.trace,
            getCurrentDirectory: compilerHost.getCurrentDirectory,
            onUnRecoverableConfigFileDiagnostic: noop,
        };
        
        

        // If the program is already up-to-date, we can reuse it
        if (isProgramUptoDate(program, rootFileNames, newSettings, (_path, fileName) => host.getScriptVersion(fileName), fileName => compilerHost!.fileExists(fileName), hasInvalidatedResolutions, hasInvalidatedLibResolutions, hasChangedAutomaticTypeDirectiveNames, getParsedCommandLine, projectReferences, parseableFiles)) {
            compilerHost = undefined;
            parsedCommandLines = undefined;
            releasedScriptKinds = undefined;
            return;
        }
        
        // IMPORTANT - It is critical from this moment onward that we do not check
        // cancellation tokens.  We are about to mutate source files from a previous program
        // instance.  If we cancel midway through, we may end up in an inconsistent state where
        // the program points to old source files that have been invalidated because of
        // incremental parsing.

        const options: CreateProgramOptions = {
            rootNames: rootFileNames,
            options: newSettings,
            host: compilerHost,
            oldProgram: program,
            projectReferences,
        };        
        program = createProgram(options);

        // 'getOrCreateSourceFile' depends on caching but should be used past this point.
        // After this point, the cache needs to be cleared to allow all collected snapshots to be released
        compilerHost = undefined;
        parsedCommandLines = undefined;
        releasedScriptKinds = undefined;

        // We reset this cache on structure invalidation so we don't hold on to outdated files for long; however we can't use the `compilerHost` above,
        // Because it only functions until `hostCache` is cleared, while we'll potentially need the functionality to lazily read sourcemap files during
        // the course of whatever called `synchronizeHostData`
        sourceMapper.clearCache();

        // Make sure all the nodes in the program are both bound, and have their parent
        // pointers set property.
        if (program.getRootFileNames().length) {
            program.getTypeChecker();
        }
        return;

        function getOrCreateSourceFile(
            fileName: string,
            languageVersionOrOptions: ScriptTarget | CreateSourceFileOptions,  
            onError?: (
                message: string
            ) => void,
            shouldCreateNewSourceFile?: boolean
        ): SourceFile | undefined {
            return getOrCreateSourceFileByPath(
                fileName,
                toPath(fileName, currentDirectory, getCanonicalFileName),
                languageVersionOrOptions, 
                onError,
                shouldCreateNewSourceFile
            );
        }

        function getParsedCommandLine(fileName: string): ParsedCommandLine | undefined {
            const path = toPath(fileName, currentDirectory, getCanonicalFileName);
            const existing = parsedCommandLines?.get(path);
            if (existing !== undefined) return existing || undefined;

            const result = host.getParsedCommandLine ?
                host.getParsedCommandLine(fileName) :
                getParsedCommandLineOfConfigFileUsingSourceFile(fileName);
            (parsedCommandLines ||= new Map()).set(path, result || false);
            return result;
        }

        function getParsedCommandLineOfConfigFileUsingSourceFile(configFileName: string): ParsedCommandLine | undefined {
            const result = getOrCreateSourceFile(configFileName, ScriptTarget.JSON) as JsonSourceFile | undefined;
            if (!result) return undefined;
            result.path = toPath(configFileName, currentDirectory, getCanonicalFileName);
            result.resolvedPath = result.path;
            result.originalFileName = result.fileName;
            return parseJsonSourceFileConfigFileContent(
                result,
                parseConfigHost,
                getNormalizedAbsolutePath(getDirectoryPath(configFileName), currentDirectory),
                /*existingOptions*/ undefined,
                getNormalizedAbsolutePath(configFileName, currentDirectory),
            );
        }

        
        // Release any files we have acquired in the old program but are
        // not part of the new program.
        function releaseOldSourceFile(
            oldSourceFile: SourceFile,
            oldOptions: CompilerOptions
        ) {
            const oldSettingsKey =
                documentRegistry.getKeyForCompilationSettings(oldOptions);
            documentRegistry.releaseDocumentWithKey(
                oldSourceFile.resolvedPath,
                oldSettingsKey,
                oldSourceFile.scriptKind,
                ModuleKind.LPC
            );
        }

        function onAllFilesNeedReparse(fileNames: string[]): void {
            if (host.onAllFilesNeedReparse) {
                host.onAllFilesNeedReparse(fileNames);
            }
        }

        function onReleaseParsedCommandLine(configFileName: string, oldResolvedRef: ResolvedProjectReference | undefined, oldOptions: CompilerOptions) {
            if (host.getParsedCommandLine) {
                host.onReleaseParsedCommandLine?.(configFileName, oldResolvedRef, oldOptions);
            }
            else if (oldResolvedRef) {
                onReleaseOldSourceFile(oldResolvedRef.sourceFile, oldOptions);
            }
        }
        
        function onReleaseOldSourceFile(
            oldSourceFile: SourceFile,
            oldOptions: CompilerOptions,
            hasSourceFileByPath?: boolean,
            newSourceFileByResolvedPath?: SourceFile | undefined
        ) {
            releaseOldSourceFile(oldSourceFile, oldOptions);
            if (hasSourceFileByPath) {
                host.onReleaseOldSourceFile?.(
                    oldSourceFile,
                    oldOptions,
                    hasSourceFileByPath,
                    newSourceFileByResolvedPath
                );
            }
        }

        function getSourceTextFromSnapshot(fileName: string): string | undefined {
            const scriptSnapshot = host.getScriptSnapshot(fileName);
            if (!scriptSnapshot) {
                return undefined;
            }
            return getSnapshotText(scriptSnapshot);
        }

        function getOrCreateSourceFileByPath(
            fileName: string,
            path: Path,
            languageVersionOrOptions: ScriptTarget | CreateSourceFileOptions, 
            _onError?: (
                message: string
            ) => void,
            shouldCreateNewSourceFile?: boolean
        ): SourceFile | undefined {
            Debug.assert(
                compilerHost,
                "getOrCreateSourceFileByPath called after typical CompilerHost lifetime, check the callstack something with a reference to an old host."
            );
            // The program is asking for this file, check first if the host can locate it.
            // If the host can not locate the file, then it does not exist. return undefined
            // to the program to allow reporting of errors for missing files.
            const scriptSnapshot = host.getScriptSnapshot(fileName);
            if (!scriptSnapshot) {
                return undefined;
            }

            const scriptKind = getScriptKind(fileName, host);
            const scriptVersion = host.getScriptVersion(fileName);

            // Check if the language version has changed since we last created a program; if they are the same,
            // it is safe to reuse the sourceFiles; if not, then the shape of the AST can change, and the oldSourceFile
            // can not be reused. we have to dump all syntax trees and create new ones.
            if (!shouldCreateNewSourceFile) {
                // Check if the old program had this file already
                const oldSourceFile =
                    program && program.getSourceFileByPath(path);
                if (oldSourceFile) {
                    // We already had a source file for this file name.  Go to the registry to
                    // ensure that we get the right up to date version of it.  We need this to
                    // address the following race-condition.  Specifically, say we have the following:
                    //
                    //      LS1
                    //          \
                    //           DocumentRegistry
                    //          /
                    //      LS2
                    //
                    // Each LS has a reference to file 'foo.ts' at version 1.  LS2 then updates
                    // it's version of 'foo.ts' to version 2.  This will cause LS2 and the
                    // DocumentRegistry to have version 2 of the document.  However, LS1 will
                    // have version 1.  And *importantly* this source file will be *corrupt*.
                    // The act of creating version 2 of the file irrevocably damages the version
                    // 1 file.
                    //
                    // So, later when we call into LS1, we need to make sure that it doesn't use
                    // it's source file any more, and instead defers to DocumentRegistry to get
                    // either version 1, version 2 (or some other version) depending on what the
                    // host says should be used.

                    // We do not support the scenario where a host can modify a registered
                    // file's script kind, i.e. in one project some file is treated as ".ts"
                    // and in another as ".js"
                    if (scriptKind === oldSourceFile.scriptKind || releasedScriptKinds!.has(oldSourceFile.resolvedPath)) {
                        return documentRegistry.updateDocumentWithKey(fileName, path, host, documentRegistryBucketKey, scriptSnapshot, scriptVersion, scriptKind, languageVersionOrOptions);
                    }
                    else {
                        // Release old source file and fall through to aquire new file with new script kind
                        documentRegistry.releaseDocumentWithKey(oldSourceFile.resolvedPath, documentRegistry.getKeyForCompilationSettings(program.getCompilerOptions()), oldSourceFile.scriptKind, oldSourceFile.impliedNodeFormat);
                        releasedScriptKinds!.add(oldSourceFile.resolvedPath);
                    }
                }

                // We didn't already have the file.  Fall through and acquire it from the registry.
            }

            // Could not find this file in the old program, create a new SourceFile for it.
            return documentRegistry.acquireDocumentWithKey(
                fileName,
                path,
                host,
                documentRegistryBucketKey,
                scriptSnapshot,
                scriptVersion,
                scriptKind,
                languageVersionOrOptions
            );
        }
    }

    function getValidSourceFile(fileName: string): SourceFile {
        const sourceFile = program.getSourceFile(fileName);
        if (!sourceFile) {
            const error: Error & PossibleProgramFileInfo = new Error(`Could not find source file: '${fileName}'.`);

            // We've been having trouble debugging this, so attach sidecar data for the tsserver log.
            // See https://github.com/microsoft/TypeScript/issues/30180.
            error.ProgramFiles = program.getSourceFiles().map(f => f.fileName);

            throw error;
        }
        bindSourceFile(sourceFile, program.getCompilerOptions());
        return sourceFile;
    }

    
    /// Goto definition
    function getDefinitionAtPosition(
        fileName: string,
        position: number,
        searchOtherFilesOnly?: boolean,
        stopAtAlias?: boolean
    ): readonly DefinitionInfo[] | undefined {
        synchronizeHostData();        
        return GoToDefinition.getDefinitionAtPosition(program, getValidSourceFile(fileName), position, searchOtherFilesOnly, stopAtAlias);
    }

    function getNodeForQuickInfo(node: Node): Node {
        if (node.parent && isNewExpression(node.parent) && node.pos === node.parent.pos) {
            return node.parent.expression;
        }
        // if (isNamedTupleMember(node.parent) && node.pos === node.parent.pos) {
        //     return node.parent;
        // }
        // if (isImportMeta(node.parent) && node.parent.name === node) {
        //     return node.parent;
        // }        
        return node;
    }

    function shouldGetType(sourceFile: SourceFile, node: Node, position: number): boolean {
        switch (node.kind) {
            case SyntaxKind.Identifier:
                // if (
                //     node.flags & NodeFlags.JSDoc &&
                //     ((node.parent.kind === SyntaxKind.PropertySignature && (node.parent as PropertySignature).name === node) ||
                //         findAncestor(node, n => n.kind === SyntaxKind.Parameter))
                // ) {
                //     // if we'd request type at those locations we'd get `errorType` that displays confusingly as `any`
                //     return false;
                // }
                return true;// !isLabelName(node) && !isTagName(node) && !isConstTypeReference(node.parent);
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.QualifiedName:
                // Don't return quickInfo if inside the comment in `a/**/.b`                
                return !isInComment(sourceFile, position);
            case SyntaxKind.SuperKeyword:
            // case SyntaxKind.NamedTupleMember:
                return true;
            // case SyntaxKind.MetaProperty:
            //     return isImportMeta(node);
            default:
                return false;
        }
    }
    
    /**
     * Signature Help
     * This is a semantic operation.
     */
    function getSignatureHelpItems(fileName: string, position: number, { triggerReason }: SignatureHelpItemsOptions = emptyOptions): SignatureHelpItems | undefined {
        synchronizeHostData();

        const sourceFile = getValidSourceFile(fileName);

        return SignatureHelp.getSignatureHelpItems(program, sourceFile, position, triggerReason, cancellationToken);
    }

    function getEncodedSemanticClassifications(fileName: string, span: TextSpan): Classifications {        
        synchronizeHostData();
                
        return classifier2020.getEncodedSemanticClassifications(program, cancellationToken, getValidSourceFile(fileName), span);        
    }

    function getQuickInfoAtPosition(fileName: string, position: number): QuickInfo | undefined {
        synchronizeHostData();

        const sourceFile = getValidSourceFile(fileName);
        const node = getTouchingPropertyName(sourceFile, position);
        if (node === sourceFile) {
            // Avoid giving quickInfo for the sourceFile as a whole.
            return undefined;
        }

        const typeChecker = program.getTypeChecker();
        const nodeForQuickInfo = getNodeForQuickInfo(node);
        const symbol = getSymbolAtLocationForQuickInfo(nodeForQuickInfo, typeChecker);
        if (!symbol || typeChecker.isUnknownSymbol(symbol) && nodeForQuickInfo) {
            const type = nodeForQuickInfo && shouldGetType(sourceFile, nodeForQuickInfo, position) ? typeChecker.getTypeAtLocation(nodeForQuickInfo) : undefined;
            return type && {
                kind: ScriptElementKind.unknown,
                kindModifiers: ScriptElementKindModifier.none,
                textSpan: createTextSpanFromNode(nodeForQuickInfo, sourceFile),
                displayParts: typeChecker.runWithCancellationToken(cancellationToken, typeChecker => typeToDisplayParts(typeChecker, type, getContainerNode(nodeForQuickInfo))),
                documentation: type.symbol ? type.symbol.getDocumentationComment(typeChecker) : undefined,
                tags: type.symbol ? type.symbol.getJsDocTags(typeChecker) : undefined,
            };
        }

        const { symbolKind, displayParts, documentation, tags } = typeChecker.runWithCancellationToken(cancellationToken, typeChecker => SymbolDisplay.getSymbolDisplayPartsDocumentationAndSymbolKind(typeChecker, symbol, sourceFile, getContainerNode(nodeForQuickInfo), nodeForQuickInfo));
        return {
            kind: symbolKind,
            kindModifiers: SymbolDisplay.getSymbolModifiers(typeChecker, symbol),
            textSpan: createTextSpanFromNode(nodeForQuickInfo, sourceFile),
            displayParts,
            documentation,
            tags,
        };
    }

    function findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean, preferences?: UserPreferences | boolean): RenameLocation[] | undefined {
        synchronizeHostData();
        const sourceFile = getValidSourceFile(fileName);
        const node = getAdjustedRenameLocation(getTouchingPropertyName(sourceFile, position));
        if (!Rename.nodeIsEligibleForRename(node)) return undefined;
        
        const quotePreference = getQuotePreference(sourceFile, preferences ?? emptyOptions);
        const providePrefixAndSuffixTextForRename = typeof preferences === "boolean" ? preferences : preferences?.providePrefixAndSuffixTextForRename;
        return getReferencesWorker(node, position, { findInStrings, findInComments, providePrefixAndSuffixTextForRename, use: FindAllReferences.FindReferencesUse.Rename }, (entry, originalNode, checker) => FindAllReferences.toRenameLocation(entry, originalNode, checker, providePrefixAndSuffixTextForRename || false, quotePreference));        
    }
    
    function getRenameInfo(fileName: string, position: number, preferences: UserPreferences | undefined): RenameInfo {
        synchronizeHostData();
        return Rename.getRenameInfo(program, getValidSourceFile(fileName), position, preferences || {});
    }

    function getReferencesWorker<T>(node: Node, position: number, options: FindAllReferences.Options, cb: FindAllReferences.ToReferenceOrRenameEntry<T>): T[] | undefined {
        synchronizeHostData();

        // Exclude default library when renaming as commonly user don't want to change that file.
        const sourceFiles = options && options.use === FindAllReferences.FindReferencesUse.Rename
            ? program.getSourceFiles().filter(sourceFile => !program.isSourceFileDefaultLibrary(sourceFile))
            : program.getSourceFiles();

        return FindAllReferences.findReferenceOrRenameEntries(program, cancellationToken, sourceFiles, node, position, options, cb);
    }

    function getDocCommentTemplateAtPosition(fileName: string, position: number, options?: DocCommentTemplateOptions, formatOptions?: FormatCodeSettings): TextInsertion | undefined {
        const formatSettings = formatOptions ? formatting.getFormatContext(formatOptions, host).options : undefined;
        return JsDoc.getDocCommentTemplateAtPosition(getNewLineOrDefaultFromHost(host, formatSettings), syntaxTreeCache.getCurrentSourceFile(fileName), position, options);
    }
    
    function getCompletionEntryDetails(fileName: string, position: number, name: string, formattingOptions: FormatCodeSettings | undefined, source: string | undefined, preferences: UserPreferences = emptyOptions, data?: CompletionEntryData): CompletionEntryDetails | undefined {
        synchronizeHostData();
        return Completions.getCompletionEntryDetails(
            program,
            log,
            getValidSourceFile(fileName),
            position,
            { name, source, data },
            host,
            (formattingOptions && formatting.getFormatContext(formattingOptions, host))!, // TODO: GH#18217
            preferences,
            cancellationToken,
        );
    }
    
    function getCompletionsAtPosition(fileName: string, position: number, options: GetCompletionsAtPositionOptions = emptyOptions, formattingSettings?: FormatCodeSettings): CompletionInfo | undefined {
        // Convert from deprecated options names to new names
        const fullPreferences: UserPreferences = {
            ...identity<UserPreferences>(options), // avoid excess property check
            includeCompletionsForModuleExports: options.includeCompletionsForModuleExports || options.includeExternalModuleExports,
            includeCompletionsWithInsertText: options.includeCompletionsWithInsertText || options.includeInsertTextCompletions,
        };
        synchronizeHostData();
        return Completions.getCompletionsAtPosition(
            host,
            program,
            log,
            getValidSourceFile(fileName),
            position,
            fullPreferences,
            options.triggerCharacter,
            options.triggerKind,
            cancellationToken,
            formattingSettings && formatting.getFormatContext(formattingSettings, host),
            options.includeSymbol,
        );
    }

}

setObjectAllocator(getServicesObjectAllocator());

function setSourceFileFields(
    sourceFile: SourceFile,
    scriptSnapshot: IScriptSnapshot,
    version: string
) {
    sourceFile.version = version;
    sourceFile.scriptSnapshot = scriptSnapshot;
}

export function createLanguageServiceSourceFile(
    fileName: string,
    scriptSnapshot: IScriptSnapshot,    
    scriptTargetOrOptions: ScriptTarget | CreateSourceFileOptions,
    version: string,
    setNodeParents: boolean,
    languageVariant: LanguageVariant,
    scriptKind?: ScriptKind,    
): SourceFile {
    const sourceFile = createSourceFile(
        fileName,
        getSnapshotText(scriptSnapshot),                  
        scriptTargetOrOptions,
        setNodeParents,
        scriptKind,
        languageVariant
    );
    setSourceFileFields(sourceFile, scriptSnapshot, version);
    return sourceFile;
}

export function updateLanguageServiceSourceFile(
    sourceFile: SourceFile,
    globalIncludes: string[],
    configDefines: ReadonlyMap<string,string>,
    fileHandler: LpcFileHandler,
    scriptSnapshot: IScriptSnapshot,    
    version: string,
    textChangeRange: TextChangeRange | undefined,    
    languageVariant: LanguageVariant,
    reportParsedDefines: boolean,
    aggressiveChecks?: boolean
): SourceFile {
    // If we were given a text change range, and our version or open-ness changed, then
    // incrementally parse this file.
    if (textChangeRange) {
        if (version !== sourceFile.version) {
            let newText: string;

            // grab the fragment from the beginning of the original text to the beginning of the span
            const prefix =
                textChangeRange.span.start !== 0
                    ? sourceFile.text.substr(0, textChangeRange.span.start)
                    : "";

            // grab the fragment from the end of the span till the end of the original text
            const suffix =
                textSpanEnd(textChangeRange.span) !== sourceFile.text.length
                    ? sourceFile.text.substr(textSpanEnd(textChangeRange.span))
                    : "";

            if (textChangeRange.newLength === 0) {
                // edit was a deletion - just combine prefix and suffix
                newText = prefix && suffix ? prefix + suffix : prefix || suffix;
            } else {
                // it was actual edit, fetch the fragment of new text that correspond to new span
                const changedText = scriptSnapshot.getText(
                    textChangeRange.span.start,
                    textChangeRange.span.start + textChangeRange.newLength
                );
                // combine prefix, changed text and suffix
                newText =
                    prefix && suffix
                        ? prefix + changedText + suffix
                        : prefix
                        ? prefix + changedText
                        : changedText + suffix;
            }

            const newSourceFile = updateSourceFile(
                sourceFile,
                newText,         
                globalIncludes,
                configDefines,
                fileHandler,       
                textChangeRange,
                aggressiveChecks,
                languageVariant
            );
            setSourceFileFields(newSourceFile, scriptSnapshot, version);
            // after incremental parsing nameTable might not be up-to-date
            // drop it so it can be lazily recreated later
            newSourceFile.nameTable = undefined;

            // dispose all resources held by old script snapshot
            if (sourceFile !== newSourceFile && sourceFile.scriptSnapshot) {
                if (sourceFile.scriptSnapshot.dispose) {
                    sourceFile.scriptSnapshot.dispose();
                }

                sourceFile.scriptSnapshot = undefined;
            }

            return newSourceFile;
        }
    }

    const options: CreateSourceFileOptions = {
        languageVersion: sourceFile.languageVersion,
        impliedNodeFormat: sourceFile.impliedNodeFormat,
        setExternalModuleIndicator: sourceFile.setExternalModuleIndicator,
        jsDocParsingMode: sourceFile.jsDocParsingMode,
        globalIncludes,
        fileHandler,
        reportParsedDefines,
        configDefines
    };
    // Otherwise, just create a new source file.
    return createLanguageServiceSourceFile(
        sourceFile.fileName,
        scriptSnapshot,        
        options,        
        version,
        /*setNodeParents*/ true,
        languageVariant,
        sourceFile.scriptKind
    );
}

function getSymbolAtLocationForQuickInfo(node: Node, checker: TypeChecker): Symbol | undefined {
    // const object = getContainingObjectLiteralElement(node);
    // if (object) {
    //     const contextualType = checker.getContextualType(object.parent);
    //     const properties = contextualType && getPropertySymbolsFromContextualType(object, checker, contextualType, /*unionSymbolOk*/ false);
    //     if (properties && properties.length === 1) {
    //         return first(properties);
    //     }
    // }  
    if (node.flags & NodeFlags.MacroContext) {
        // the macro name for each node is stored in a map on the sourcefile
        const macroName = node.getSourceFile()?.nodeMacroMap.get(node);
        return macroName && checker.resolveName(macroName, node.parent, SymbolFlags.Define, false);                    
    }

    const symbol = checker.getSymbolAtLocation(node);    
    return symbol;
}

/** @internal */
export interface DisplayPartsSymbolWriter extends EmitTextWriter {
    displayParts(): SymbolDisplayPart[];
}

/**
 * A cancellation that throttles calls to the host
 *
 * @internal
 */
export class ThrottledCancellationToken implements CancellationToken {
    // Store when we last tried to cancel.  Checking cancellation can be expensive (as we have
    // to marshall over to the host layer).  So we only bother actually checking once enough
    // time has passed.
    private lastCancellationCheckTime = 0;

    constructor(private hostCancellationToken: HostCancellationToken, private readonly throttleWaitMilliseconds = 20) {
    }

    public isCancellationRequested(): boolean {
        const time = timestamp();
        const duration = Math.abs(time - this.lastCancellationCheckTime);
        if (duration >= this.throttleWaitMilliseconds) {
            // Check no more than once every throttle wait milliseconds
            this.lastCancellationCheckTime = time;
            return this.hostCancellationToken.isCancellationRequested();
        }

        return false;
    }

    public throwIfCancellationRequested(): void {
        if (this.isCancellationRequested()) {
            tracing?.instant(tracing.Phase.Session, "cancellationThrown", { kind: "ThrottledCancellationToken" });
            throw new OperationCanceledException();
        }
    }
}

/**
 * Convert display parts to a string
 * @param displayParts array of parts
 * @returns a string
 */
export function displayPartsToString(displayParts: SymbolDisplayPart[] | undefined) {
    if (displayParts) {        
        return map(displayParts, displayPart => displayPart.text).join("");
    }

    return "";
}

export enum SemicolonPreference {
    Ignore = "ignore",
    Insert = "insert",
    Remove = "remove",
}

export enum IndentStyle {
    None = 0,
    Block = 1,
    Smart = 2,
}


// TODO: GH#18217 These are frequently asserted as defined
export interface EditorSettings {
    baseIndentSize?: number;
    indentSize?: number;
    tabSize?: number;
    newLineCharacter?: string;
    convertTabsToSpaces?: boolean;
    indentStyle?: IndentStyle;
    trimTrailingWhitespace?: boolean;
}

export interface FormatCodeSettings extends EditorSettings {
    readonly insertSpaceAfterCommaDelimiter?: boolean;
    readonly insertSpaceAfterSemicolonInForStatements?: boolean;
    readonly insertSpaceBeforeAndAfterBinaryOperators?: boolean;
    readonly insertSpaceAfterConstructor?: boolean;
    readonly insertSpaceAfterKeywordsInControlFlowStatements?: boolean;
    readonly insertSpaceAfterFunctionKeywordForAnonymousFunctions?: boolean;
    readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis?: boolean;
    readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets?: boolean;
    readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces?: boolean;
    readonly insertSpaceAfterOpeningAndBeforeClosingEmptyBraces?: boolean;
    readonly insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces?: boolean;
    readonly insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces?: boolean;
    readonly insertSpaceAfterTypeAssertion?: boolean;
    readonly insertSpaceBeforeFunctionParenthesis?: boolean;
    readonly placeOpenBraceOnNewLineForFunctions?: boolean;
    readonly placeOpenBraceOnNewLineForControlBlocks?: boolean;
    readonly insertSpaceBeforeTypeAnnotation?: boolean;
    readonly indentMultiLineObjectLiteralBeginningOnBlankLine?: boolean;
    readonly semicolons?: SemicolonPreference;
    readonly indentSwitchCase?: boolean;
}


export function getDefaultFormatCodeSettings(newLineCharacter?: string): FormatCodeSettings {
    return {
        indentSize: 2,
        tabSize: 2,
        newLineCharacter: newLineCharacter || "\n",
        convertTabsToSpaces: true,
        indentStyle: IndentStyle.Smart,
        insertSpaceAfterConstructor: false,
        insertSpaceAfterCommaDelimiter: true,
        insertSpaceAfterSemicolonInForStatements: true,
        insertSpaceBeforeAndAfterBinaryOperators: true,
        insertSpaceAfterKeywordsInControlFlowStatements: true,
        insertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
        insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
        insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
        insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true,
        insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
        insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: false,
        insertSpaceBeforeFunctionParenthesis: false,
        placeOpenBraceOnNewLineForFunctions: false,
        placeOpenBraceOnNewLineForControlBlocks: false,
        semicolons: SemicolonPreference.Ignore,
        trimTrailingWhitespace: true,
        indentSwitchCase: true,
    };
}

class SyntaxTreeCache {
    // For our syntactic only features, we also keep a cache of the syntax tree for the
    // currently edited file.
    private currentFileName: string | undefined;
    private currentFileVersion: string | undefined;
    private currentFileScriptSnapshot: IScriptSnapshot | undefined;
    private currentSourceFile: SourceFile | undefined;

    constructor(private host: LanguageServiceHost) {
    }

    public getCurrentSourceFile(fileName: string): SourceFile {
        const scriptSnapshot = this.host.getScriptSnapshot(fileName);
        if (!scriptSnapshot) {
            // The host does not know about this file.
            throw new Error("Could not find file: '" + fileName + "'.");
        }

        const compilerOptions = this.host.getCompilationSettings();
        const scriptKind = getScriptKind(fileName, this.host);
        const version = this.host.getScriptVersion(fileName);
        const languageVariant = this.host.getCompilationSettings()?.driverType;
        const globalIncludes: string[] = compilerOptions?.globalIncludeFiles || emptyArray;
        let sourceFile: SourceFile | undefined;

        // This is a new file, just parse it
        const options: CreateSourceFileOptions = {
            languageVersion: ScriptTarget.Latest,
            impliedNodeFormat: getImpliedNodeFormatForFile(
                toPath(fileName, this.host.getCurrentDirectory(), this.host.getCompilerHost?.()?.getCanonicalFileName || hostGetCanonicalFileName(this.host)),
                this.host.getCompilerHost?.()?.getModuleResolutionCache?.()?.getPackageJsonInfoCache(),
                this.host,
                compilerOptions,
            ),
            setExternalModuleIndicator: getSetExternalModuleIndicator(this.host.getCompilationSettings()),
            // These files are used to produce syntax-based highlighting, which reads JSDoc, so we must use ParseAll.
            jsDocParsingMode: JSDocParsingMode.ParseAll,
            globalIncludes,
            fileHandler: createLpcFileHandler({
                fileExists: fileName => sys.fileExists(fileName),
                readFile: fileName => sys.readFile(fileName),
                getCurrentDirectory: () => sys.getCurrentDirectory(),
                getIncludeDirs: ()=>this.host.getIncludeDirs(),  
                getCompilerOptions: () => this.host.getCompilationSettings(),
            })
        }; 

        // if (this.currentFileName !== fileName) {                       
            sourceFile = createLanguageServiceSourceFile(fileName, scriptSnapshot, options, version, /*setNodeParents*/ true, languageVariant, scriptKind);
        // }
        // else if (this.currentFileVersion !== version) {            
        //     // This is the same file, just a newer version. Incrementally parse the file.
        //     const editRange = scriptSnapshot.getChangeRange(this.currentFileScriptSnapshot!);
                        
        //     sourceFile = updateLanguageServiceSourceFile(this.currentSourceFile!, options.globalIncludes, options.configDefines, options.fileHandler, scriptSnapshot, version, editRange, languageVariant, false);
        // }

        if (sourceFile) {
            // All done, ensure state is up to date
            this.currentFileVersion = version;
            this.currentFileName = fileName;
            this.currentFileScriptSnapshot = scriptSnapshot;
            this.currentSourceFile = sourceFile;
        }

        return this.currentSourceFile!;
    }
}

/**
 * Names in the name table are escaped, so an identifier `__foo` will have a name table entry `___foo`.
 *
 * @internal
 */
export function getNameTable(sourceFile: SourceFile): Map<string, number> {
    if (!sourceFile.nameTable) {
        initializeNameTable(sourceFile);
    }

    return sourceFile.nameTable!; // TODO: GH#18217
}


function initializeNameTable(sourceFile: SourceFile): void {
    const nameTable = sourceFile.nameTable = new Map();
    sourceFile.forEachChild(function walk(node) {        
        if (isIdentifier(node) && !isTagName(node) && node.text || isStringOrNumericLiteralLike(node) && literalIsName(node)) {
            const text = getEscapedTextOfIdentifierOrLiteral(node);            
            nameTable.set(text, nameTable.get(text) === undefined ? node.pos : -1);
        }
        // else if (isPrivateIdentifier(node)) {
        //     const text = node.text;
        //     nameTable.set(text, nameTable.get(text) === undefined ? node.pos : -1);
        // }

        forEachChild(node, walk);
        if (hasJSDocNodes(node)) {
            for (const jsDoc of node.jsDoc!) {
                forEachChild(jsDoc, walk);
            }
        }
    });
}

/**
 * We want to store any numbers/strings if they were a name that could be
 * related to a declaration.  So, if we have 'import x = require("something")'
 * then we want 'something' to be in the name table.  Similarly, if we have
 * "a['propname']" then we want to store "propname" in the name table.
 */
function literalIsName(node: StringLiteral | IntLiteral | FloatLiteral): boolean {
    return isDeclarationName(node) ||
        // node.parent.kind === SyntaxKind.ExternalModuleReference ||
        // isArgumentOfElementAccessExpression(node) ||
        isLiteralComputedPropertyDeclarationName(node);
}

/**
 * Returns the containing object literal property declaration given a possible name node, e.g. "a" in x = { "a": 1 }
 *
 * @internal
 */
export function getContainingObjectLiteralElement(node: Node): undefined {//ObjectLiteralElementWithName | undefined {
    return undefined;
    // const element = getContainingObjectLiteralElementWorker(node);
    // return element && (isObjectLiteralExpression(element.parent) || isJsxAttributes(element.parent)) ? element as ObjectLiteralElementWithName : undefined;
}

/** @internal */
export function findChildOfKind<T extends Node>(n: Node, kind: T["kind"], sourceFile: SourceFileLike): T | undefined {
    return find(n.getChildren(sourceFile), (c): c is T => c.kind === kind);
}

function nodeHasTokens(n: Node, sourceFile: SourceFileLike): boolean {
    // If we have a token or node that has a non-zero width, it must have tokens.
    // Note: getWidth() does not take trivia into account.
    return n.kind === SyntaxKind.EndOfFileToken ? !!(n as EndOfFileToken).jsDoc : n.getWidth(sourceFile) !== 0;
}


/** @internal */
export function findNextToken(previousToken: Node, parent: Node, sourceFile: SourceFileLike): Node | undefined {
    return find(parent);

    function find(n: Node): Node | undefined {
        if (isToken(n) && n.pos === previousToken.end) {
            // this is token that starts at the end of previous token - return it
            return n;
        }
        return firstDefined(n.getChildren(sourceFile), child => {
            const shouldDiveInChildNode =
                // previous token is enclosed somewhere in the child
                (child.pos <= previousToken.pos && child.end > previousToken.end) ||
                // previous token ends exactly at the beginning of child
                (child.pos === previousToken.end);
            return shouldDiveInChildNode && nodeHasTokens(child, sourceFile) ? find(child) : undefined;
        });
    }
}

function getDocumentationComment(declarations: readonly Declaration[] | undefined, checker: TypeChecker | undefined): SymbolDisplayPart[] {
    if (!declarations) return emptyArray;

    let doc = JsDoc.getJsDocCommentsFromDeclarations(declarations, checker);
    if (checker && (doc.length === 0 || declarations.some(hasJSDocInheritDocTag))) {
        const seenSymbols = new Set<Symbol>();
        for (const declaration of declarations) {
            const inheritedDocs = findBaseOfDeclaration(checker, declaration, symbol => {
                if (!seenSymbols.has(symbol)) {
                    seenSymbols.add(symbol);                    
                    return symbol.getDocumentationComment(checker);
                }
            });
            // TODO: GH#16312 Return a ReadonlyArray, avoid copying inheritedDocs
            if (inheritedDocs) doc = doc.length === 0 ? inheritedDocs.slice() : inheritedDocs.concat(lineBreakPart(), doc);
        }
    }
    return doc;
}

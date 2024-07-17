import * as antlr from "antlr4ng";
import { Signature, Type, Debug, DiagnosticArguments, DiagnosticMessage, DiagnosticRelatedInformation, DiagnosticWithDetachedLocation, DiagnosticWithLocation, Identifier, MapLike, ModifierFlags, Node, NodeFlags, ReadonlyTextRange, some, SourceFile, Symbol, SymbolFlags, SyntaxKind, TextRange, Token, TransformFlags, TypeChecker, TypeFlags, tracing, SignatureFlags, canHaveModifiers, Modifier, skipTrivia, SymbolTable, CallExpression, Declaration, getCombinedNodeFlags, BinaryExpression, AssignmentDeclarationKind, isCallExpression, isBinaryExpression, isIdentifier, Diagnostic, emptyArray, PropertyNameLiteral, DeclarationName, LiteralLikeNode, AssignmentExpression, LogicalOrCoalescingAssignmentOperator, LogicalOperator, Expression, OuterExpressionKinds, OuterExpression, WrappedExpression, PrefixUnaryExpression, PostfixUnaryExpression, ForEachStatement, ShorthandPropertyAssignment, PropertyAssignment, PropertyAccessExpression, ParenthesizedExpression, BinaryOperatorToken, AssertionLevel, SortedArray, binarySearch, identity, Comparison, DiagnosticMessageChain, compareStringsCaseSensitive, compareValues, insertSorted, flatMapToMutable, DiagnosticCollection, isJSDocTemplateTag, HasJSDoc, lastOrUndefined, JSDoc, isJSDoc, find, ParameterDeclaration, FunctionDeclaration, InlineClosureExpression, FunctionExpression, forEachChild, returnUndefined, returnFalse, CompilerOptions, FunctionLikeDeclaration, canHaveLocals, isFunctionLike, isParameter, PropertyDeclaration, BindingElement, isString, InternalSymbolName, isSourceFile, StructDeclaration, isStructDeclaration, JSDocTemplateTag, TypeNodeSyntaxKind, isTypeNode, isFunctionLikeDeclaration, SignatureDeclaration, AccessExpression, isInlineClosureExpression, PropertyAccessEntityNameExpression, isPropertyAccessExpression, EntityNameExpression, isVariableDeclaration, VariableDeclarationInitializedTo, CanonicalDiagnostic, HasInitializer, ExpressionStatement, ForStatement, isShorthandPropertyAssignment, JSDocTag, EqualsToken, AssignmentOperatorToken, isLeftHandSideExpression, isFunctionLikeKind, AdditiveOperator, AdditiveOperatorOrHigher, AssignmentOperatorOrHigher, BinaryOperator, BitwiseOperator, BitwiseOperatorOrHigher, EqualityOperator, EqualityOperatorOrHigher, ExponentiationOperator, LogicalOperatorOrHigher, MultiplicativeOperator, MultiplicativeOperatorOrHigher, RelationalOperator, RelationalOperatorOrHigher, ShiftOperator, ShiftOperatorOrHigher, HasFlowNode, ObjectFlags, ObjectFlagsType, isDeclaration, isBindingPattern, isJSDocSignature, JSDocSignature, TypeNode, findAncestor, Extension, fileExtensionIs, NamedDeclaration, KeywordSyntaxKind, binarySearchKey, SourceFileLike, isToken, EndOfFileToken, isJSDocCommentContainingNode, firstOrUndefined, getNodeChildren, JSDocContainer, PropertyName, idText, isMemberName, forEach, PrinterOptions, NewLineKind, flatMap, getNormalizedPathComponents, removeTrailingDirectorySeparator, directorySeparator, normalizePath, FileWatcher, PackageId, ScriptKind, TextSpan, CheckFlags, TransientSymbol, getCombinedModifierFlags, isElementAccessExpression, createTextSpan, CaseOrDefaultClause, createTextSpanFromBounds, ReturnStatement, createScanner, isQualifiedName, EntityNameOrEntityNameExpression, isCallOrNewExpression, CallLikeExpression, EmitTextWriter, computeLineStarts, last, isWhiteSpaceLike, ScriptTarget, isIdentifierStart } from "./_namespaces/lpc.js";
import { CharacterCodes } from "../backend/types.js";

/** @internal */
export interface ObjectAllocator {
    getNodeConstructor(): new (kind: SyntaxKind, pos: number, end: number) => Node;
    getTokenConstructor(): new <TKind extends SyntaxKind>(kind: TKind, pos: number, end: number) => Token<TKind>;
    getIdentifierConstructor(): new (kind: SyntaxKind.Identifier, pos: number, end: number) => Identifier;    
    getSourceFileConstructor(): new (kind: SyntaxKind.SourceFile, pos: number, end: number) => SourceFile;
    getSymbolConstructor(): new (flags: SymbolFlags, name: string) => Symbol;
    getTypeConstructor(): new (checker: TypeChecker, flags: TypeFlags) => Type;
    getSignatureConstructor(): new (checker: TypeChecker, flags: SignatureFlags) => Signature;    
}


/** @internal */
export const objectAllocator: ObjectAllocator = {
    getNodeConstructor: () => Node as any,
    getTokenConstructor: () => Token as any,
    getIdentifierConstructor: () => Identifier as any,    
    getSourceFileConstructor: () => Node as any,
    getSymbolConstructor: () => Symbol as any,
    getTypeConstructor: () => Type as any,
    getSignatureConstructor: () => Signature as any,    
};
const objectAllocatorPatchers: ((objectAllocator: ObjectAllocator) => void)[] = [];

function Signature(this: Signature, checker: TypeChecker, flags: SignatureFlags) {
    // Note: if modifying this, be sure to update SignatureObject in src/services/services.ts
    this.flags = flags;
    if (Debug.isDebugging) {
        this.checker = checker;
    }
}

function Type(this: Type, checker: TypeChecker, flags: TypeFlags) {
    // Note: if modifying this, be sure to update TypeObject in src/services/services.ts
    this.flags = flags;
    if (Debug.isDebugging || tracing) {
        this.checker = checker;
    }
}

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


/**
 * Gets the effective ModifierFlags for the provided node, including JSDoc modifiers. The modifier flags cache on the node is ignored.
 *
 * NOTE: This function may use `parent` pointers.
 *
 * @internal
 */
export function getEffectiveModifierFlagsNoCache(node: Node): ModifierFlags {
    return getSyntacticModifierFlagsNoCache(node) | getJSDocModifierFlagsNoCache(node);
}

function getJSDocModifierFlagsNoCache(node: Node): ModifierFlags {
    return 0; // TODO return selectEffectiveModifierFlags(getRawJSDocModifierFlagsNoCache(node));
}

/**
 * Gets the ModifierFlags for syntactic modifiers on the provided node. The modifier flags cache on the node is ignored.
 *
 * NOTE: This function does not use `parent` pointers and will not include modifiers from JSDoc.
 *
 * @internal
 * @knipignore
 */
export function getSyntacticModifierFlagsNoCache(node: Node): ModifierFlags {
    let flags = canHaveModifiers(node) ? modifiersToFlags(node.modifiers) : ModifierFlags.None;
    // if (node.flags & NodeFlags.NestedNamespace || node.kind === SyntaxKind.Identifier && node.flags & NodeFlags.IdentifierIsInJSDocNamespace) {
    //     flags |= ModifierFlags.Export;
    // }
    return flags;
}

/** @internal */
export function modifiersToFlags(modifiers: readonly Modifier[] | undefined) {
    let flags = ModifierFlags.None;
    if (modifiers) {
        for (const modifier of modifiers) {
            flags |= modifierToFlag(modifier.kind);
        }
    }
    return flags;
}

/** @internal */
export function modifierToFlag(token: SyntaxKind): ModifierFlags {
    switch (token) {
        case SyntaxKind.StaticKeyword:
            return ModifierFlags.Static;
        case SyntaxKind.PublicKeyword:
            return ModifierFlags.Public;
        case SyntaxKind.ProtectedKeyword:
            return ModifierFlags.Protected;
        case SyntaxKind.PrivateKeyword:
            return ModifierFlags.Private;        
        case SyntaxKind.NoMaskKeyword:
            return ModifierFlags.NoMask;
        case SyntaxKind.NoShadowKeyword:
            return ModifierFlags.NoShadow;
        case SyntaxKind.NoSaveKeyword:
            return ModifierFlags.NoSave;
        case SyntaxKind.VisibleKeyword:
            return ModifierFlags.Visible;
        // case SyntaxKind.AsyncKeyword:
        //     return ModifierFlags.Async;        
        // case SyntaxKind.InKeyword:
        //     return ModifierFlags.In;        
    }
    return ModifierFlags.None;
}

/** @internal */
export function positionIsSynthesized(pos: number): boolean {
    // This is a fast way of testing the following conditions:
    //  pos === undefined || pos === null || isNaN(pos) || pos < 0;
    return !(pos >= 0);
}

/** @internal */
export function nodeIsSynthesized(range: TextRange): boolean {
    return positionIsSynthesized(range.pos)
        || positionIsSynthesized(range.end);
}

/** @internal */
export function getSourceFileOfNode(node: Node): SourceFile;
/** @internal */
export function getSourceFileOfNode(node: Node | undefined): SourceFile | undefined;
/** @internal */
export function getSourceFileOfNode(node: Node | undefined): SourceFile | undefined {
    while (node && node.kind !== SyntaxKind.SourceFile) {
        node = node.parent;
    }
    return node as SourceFile;
}

/** @internal */
export function getSourceTextOfNodeFromSourceFile(sourceFile: SourceFile, node: Node, includeTrivia = false): string {
    return getTextOfNodeFromSourceText(sourceFile.text, node, includeTrivia);
}

/** @internal */
export function getTextOfNodeFromSourceText(sourceText: string, node: Node, includeTrivia = false): string {
    if (nodeIsMissing(node)) {
        return "";
    }

    let text = sourceText.substring(includeTrivia ? node.pos : skipTrivia(sourceText, node.pos), node.end);

    // if (isJSDocTypeExpressionOrChild(node)) {
    //     // strip space + asterisk at line start
    //     text = text.split(/\r\n|\n|\r/).map(line => line.replace(/^\s*\*/, "").trimStart()).join("\n");
    // }

    return text;
}


// Returns true if this node is missing from the actual source code. A 'missing' node is different
// from 'undefined/defined'. When a node is undefined (which can happen for optional nodes
// in the tree), it is definitely missing. However, a node may be defined, but still be
// missing.  This happens whenever the parser knows it needs to parse something, but can't
// get anything in the source code that it expects at that location. For example:
//
//          let a: ;
//
// Here, the Type in the Type-Annotation is not-optional (as there is a colon in the source
// code). So the parser will attempt to parse out a type, and will create an actual node.
// However, this node will be 'missing' in the sense that no actual source-code/tokens are
// contained within it.
/** @internal */
export function nodeIsMissing(node: Node | undefined): boolean {
    if (node === undefined) {
        return true;
    }

    return node.pos === node.end && node.pos >= 0 && node.kind !== SyntaxKind.EndOfFileToken;
}

/**
 * Bypasses immutability and directly sets the `parent` property of a `Node`.
 *
 * @internal
 */
export function setParent<T extends Node>(child: T, parent: T["parent"] | undefined): T;
/** @internal */
export function setParent<T extends Node>(child: T | undefined, parent: T["parent"] | undefined): T | undefined;
/** @internal */
export function setParent<T extends Node>(child: T | undefined, parent: T["parent"] | undefined): T | undefined {
    if (child && parent) {
        (child as Mutable<T>).parent = parent;
    }
    return child;
}

/** @internal */
export function createSymbolTable(symbols?: readonly Symbol[]): SymbolTable {
    const result = new Map<string, Symbol>();
    if (symbols) {
        for (const symbol of symbols) {
            result.set(symbol.name, symbol);
        }
    }
    return result;
}

/** @internal */
export function getImmediatelyInvokedFunctionExpression(func: Node): CallExpression | undefined {
    if (func.kind === SyntaxKind.FunctionExpression || func.kind === SyntaxKind.InlineClosureExpression) {
        let prev = func;
        let parent = func.parent;
        // while (parent.kind === SyntaxKind.ParenthesizedExpression) {
        //     prev = parent;
        //     parent = parent.parent;
        // }
        if (parent.kind === SyntaxKind.CallExpression && (parent as CallExpression).expression === prev) {
            return parent as CallExpression;
        }
    }
}

/** @internal */
export function nodeIsPresent(node: Node | undefined): boolean {
    return !nodeIsMissing(node);
}

/** @internal */
export function isBlockOrCatchScoped(declaration: Declaration) {
    return (getCombinedNodeFlags(declaration) & NodeFlags.BlockScoped) !== 0 ||
        isCatchClauseVariableDeclarationOrBindingElement(declaration);
}

/** @internal */
export function isCatchClauseVariableDeclarationOrBindingElement(declaration: Declaration) {
    const node = getRootDeclaration(declaration);
    return node.kind === SyntaxKind.VariableDeclaration && node.parent.kind === SyntaxKind.CatchClause;
}

/** @internal */
export function getRootDeclaration(node: Node): Node {
    // while (node.kind === SyntaxKind.BindingElement) {
    //     node = node.parent.parent;
    // }
    return node;
}


/**
 * This function returns true if the this node's root declaration is a parameter.
 * For example, passing a `ParameterDeclaration` will return true, as will passing a
 * binding element that is a child of a `ParameterDeclaration`.
 *
 * If you are looking to test that a `Node` is a `ParameterDeclaration`, use `isParameter`.
 *
 * @internal
 */
export function isPartOfParameterDeclaration(node: Declaration): boolean {
    const root = getRootDeclaration(node);
    return root.kind === SyntaxKind.Parameter;
}

/** @internal */
export function hasSyntacticModifier(node: Node, flags: ModifierFlags): boolean {
    return !!getSelectedSyntacticModifierFlags(node, flags);
}

/** @internal @knipignore */
export function getSelectedSyntacticModifierFlags(node: Node, flags: ModifierFlags): ModifierFlags {
    return getSyntacticModifierFlags(node) & flags;
}


/**
 * Gets the ModifierFlags for syntactic modifiers on the provided node. The modifiers will be cached on the node to improve performance.
 *
 * NOTE: This function does not use `parent` pointers and will not include modifiers from JSDoc.
 *
 * @internal
 */
export function getSyntacticModifierFlags(node: Node): ModifierFlags {
    return getModifierFlagsWorker(node, /*includeJSDoc*/ false);
}

function getModifierFlagsWorker(node: Node, includeJSDoc: boolean, alwaysIncludeJSDoc?: boolean): ModifierFlags {
    if (node.kind >= SyntaxKind.FirstToken && node.kind <= SyntaxKind.LastToken) {
        return ModifierFlags.None;
    }

    if (!(node.modifierFlagsCache & ModifierFlags.HasComputedFlags)) {
        node.modifierFlagsCache = getSyntacticModifierFlagsNoCache(node) | ModifierFlags.HasComputedFlags;
    }

    // if (alwaysIncludeJSDoc || includeJSDoc && isInJSFile(node)) {
    //     if (!(node.modifierFlagsCache & ModifierFlags.HasComputedJSDocModifiers) && node.parent) {
    //         node.modifierFlagsCache |= getRawJSDocModifierFlagsNoCache(node) | ModifierFlags.HasComputedJSDocModifiers;
    //     }
    //     return selectEffectiveModifierFlags(node.modifierFlagsCache);
    // }

    return selectSyntacticModifierFlags(node.modifierFlagsCache);
}

function selectSyntacticModifierFlags(flags: ModifierFlags) {
    return flags & ModifierFlags.SyntacticModifiers;
}

function getAssignmentDeclarationKindWorker(expr: BinaryExpression | CallExpression): AssignmentDeclarationKind {
    return AssignmentDeclarationKind.None
    // if (isCallExpression(expr)) {
    //     if (!isBindableObjectDefinePropertyCall(expr)) {
    //         return AssignmentDeclarationKind.None;
    //     }
    //     const entityName = expr.arguments[0];
    //     // if (isExportsIdentifier(entityName) || isModuleExportsAccessExpression(entityName)) {
    //     //     return AssignmentDeclarationKind.ObjectDefinePropertyExports;
    //     // }
    //     // if (isBindableStaticAccessExpression(entityName) && getElementOrPropertyAccessName(entityName) === "prototype") {
    //     //     return AssignmentDeclarationKind.ObjectDefinePrototypeProperty;
    //     // }
    //     return AssignmentDeclarationKind.ObjectDefinePropertyValue;
    // }
    // if (expr.operatorToken.kind !== SyntaxKind.EqualsToken /*|| !isAccessExpression(expr.left) || isVoidZero(getRightMostAssignedExpression(expr))*/) {
    //     return AssignmentDeclarationKind.None;
    // }
    // // if (isBindableStaticNameExpression(expr.left.expression, /*excludeThisKeyword*/ true) && getElementOrPropertyAccessName(expr.left) === "prototype" && isObjectLiteralExpression(getInitializerOfBinaryExpression(expr))) {
    // //     // F.prototype = { ... }
    // //     return AssignmentDeclarationKind.Prototype;
    // // }
    // return getAssignmentDeclarationPropertyAccessKind(expr.left);
}



/// Given a BinaryExpression, returns SpecialPropertyAssignmentKind for the various kinds of property
/// assignments we treat as special in the binder
/** @internal */
export function getAssignmentDeclarationKind(expr: BinaryExpression | CallExpression): AssignmentDeclarationKind {
    const special = getAssignmentDeclarationKindWorker(expr);
    return special === AssignmentDeclarationKind.Property /*|| isInJSFile(expr)*/ ? special : AssignmentDeclarationKind.None;
}

/** @internal */
export function isAssignmentDeclaration(decl: Declaration) {
    return isBinaryExpression(decl) /*|| isAccessExpression(decl)*/ || isIdentifier(decl) || isCallExpression(decl);
}


/** @internal */
export function setValueDeclaration(symbol: Symbol, node: Declaration): void {
    const { valueDeclaration } = symbol;
    if (
        !valueDeclaration ||
        !(node.flags & NodeFlags.Ambient /*&& !isInJSFile(node)*/ && !(valueDeclaration.flags & NodeFlags.Ambient)) &&
            (isAssignmentDeclaration(valueDeclaration) && !isAssignmentDeclaration(node)) ||
        (valueDeclaration.kind !== node.kind /*&& isEffectiveModuleDeclaration(valueDeclaration)*/)
    ) {
        // other kinds of value declarations take precedence over modules and assignment declarations
        symbol.valueDeclaration = node;
    }
}

/** @internal */
export function addRelatedInfo<T extends Diagnostic>(diagnostic: T, ...relatedInformation: DiagnosticRelatedInformation[]): T {
    if (!relatedInformation.length) {
        return diagnostic;
    }
    if (!diagnostic.relatedInformation) {
        diagnostic.relatedInformation = [];
    }
    Debug.assert(diagnostic.relatedInformation !== emptyArray, "Diagnostic had empty array singleton for related info, but is still being constructed!");
    diagnostic.relatedInformation.push(...relatedInformation);
    return diagnostic;
}

/** @internal */
export function isPropertyNameLiteral(node: Node): node is PropertyNameLiteral {
    switch (node.kind) {
        case SyntaxKind.Identifier:
        case SyntaxKind.StringLiteral:
        // case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.IntLiteral:        
            return true;
        default:
            return false;
    }
}

/** @internal */
export function getFullWidth(node: Node) {
    return node.end - node.pos;
}


// Return display name of an identifier
// Computed property names will just be emitted as "[<expr>]", where <expr> is the source
// text of the expression in the computed property.
/** @internal */
export function declarationNameToString(name: DeclarationName | /*QualifiedName |*/ undefined) {
    return !name || getFullWidth(name) === 0 ? "(Missing)" : getTextOfNode(name);
}

/** @internal */
export function getTextOfNode(node: Node, includeTrivia = false): string {
    return getSourceTextOfNodeFromSourceFile(getSourceFileOfNode(node), node, includeTrivia);
}

/** @internal */
export function getErrorSpanForNode(sourceFile: SourceFile, node: Node): TextSpan {
    //return createTextSpan(node.pos, node.end - node.pos);
    let errorNode: Node | undefined = node;
    switch (node.kind) {
        case SyntaxKind.SourceFile: {
            const pos = skipTrivia(sourceFile.text, 0, /*stopAfterLineBreak*/ false);
            if (pos === sourceFile.text.length) {
                // file is empty - return span for the beginning of the file
                return createTextSpan(0, 0);
            }
            return getSpanOfTokenAtPosition(sourceFile, pos);
        }
        // This list is a work in progress. Add missing node kinds to improve their error
        // spans.
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.BindingElement:
        // case SyntaxKind.ClassDeclaration:
        case SyntaxKind.ClassExpression:
        // case SyntaxKind.InterfaceDeclaration:
        // case SyntaxKind.ModuleDeclaration:        
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        // case SyntaxKind.MethodDeclaration:    
        case SyntaxKind.PropertyDeclaration:
        // case SyntaxKind.PropertySignature:        
            errorNode = (node as NamedDeclaration).name;
            break;
        // case SyntaxKind.InlineClosureExpression:
        //     return getErrorSpanForArrowFunction(sourceFile, node as ArrowFunction);
        case SyntaxKind.CaseClause:
        case SyntaxKind.DefaultClause: {
            const start = skipTrivia(sourceFile.text, (node as CaseOrDefaultClause).pos);
            const end = (node as CaseOrDefaultClause).statements.length > 0 ? (node as CaseOrDefaultClause).statements[0].pos : (node as CaseOrDefaultClause).end;
            return createTextSpanFromBounds(start, end);
        }
        case SyntaxKind.ReturnStatement: {
            const pos = skipTrivia(sourceFile.text, (node as ReturnStatement/* | YieldExpression*/).pos);
            return getSpanOfTokenAtPosition(sourceFile, pos);
        }        
    }

    if (errorNode === undefined) {
        // If we don't have a better node, then just set the error on the first token of
        // construct.
        return getSpanOfTokenAtPosition(sourceFile, node.pos);
    }

    //Debug.assert(!isJSDoc(errorNode));

    const isMissing = nodeIsMissing(errorNode);
    const pos = isMissing// || isJsxText(node)
        ? errorNode.pos
        : skipTrivia(sourceFile.text, errorNode.pos);

    // These asserts should all be satisfied for a properly constructed `errorNode`.
    if (isMissing) {
        Debug.assert(pos === errorNode.pos, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
        Debug.assert(pos === errorNode.end, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
    }
    else {
        Debug.assert(pos >= errorNode.pos, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
        Debug.assert(pos <= errorNode.end, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
    }

    return createTextSpanFromBounds(pos, errorNode.end);
}

/** @internal */
export function getSpanOfTokenAtPosition(sourceFile: SourceFile, pos: number): TextSpan {
    console.warn("TODO - implement this properly - getSpanOfTokenAtPosition");
    return createTextSpanFromBounds(pos, pos+1); 
    //const scanner = createScanner(sourceFile.languageVersion, /*skipTrivia*/ true, sourceFile.languageVariant, sourceFile.text, /*onError*/ undefined, pos);
    // scanner.scan();
    // const start = scanner.getTokenStart();
    // return createTextSpanFromBounds(start, scanner.getTokenEnd());
}

/** @internal */
export function createDiagnosticForNodeInSourceFile(sourceFile: SourceFile, node: Node, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithLocation {
    const span = getErrorSpanForNode(sourceFile, node);
    return createFileDiagnostic(sourceFile, span.start, span.length, message, ...args);
}

/** @internal */
export function createFileDiagnostic(file: SourceFile, start: number, length: number, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithLocation {
    assertDiagnosticLocation(file.text, start, length);

    let text = getLocaleSpecificMessage(message);

    if (some(args)) {
        text = formatStringFromArgs(text, args);
    }

    return {
        file,
        start,
        length,

        messageText: text,
        category: message.category,
        code: message.code,
        reportsUnnecessary: message.reportsUnnecessary,
        reportsDeprecated: message.reportsDeprecated,
    };
}

export function isLiteralLike(node: Node): node is LiteralLikeNode {
    switch (node.kind) {
        case SyntaxKind.StringLiteral:
        case SyntaxKind.IntLiteral:
        case SyntaxKind.FloatLiteral:
            return true;
        default:
            return false;
    }
}

export function isFalsyLiteral(node: Node): boolean {
    return isLiteralLike(node) && node.text === "0";
}

export function isTruthyLiteral(node: Node): boolean {
    return isLiteralLike(node) && node.text.length > 0 && node.text != "0";
}

/** @internal */
export function isLogicalOrCoalescingAssignmentExpression(expr: Node): expr is AssignmentExpression<Token<LogicalOrCoalescingAssignmentOperator>> {
    return isBinaryExpression(expr) && isLogicalOrCoalescingAssignmentOperator(expr.operatorToken.kind);
}

/** @internal */
export function isLogicalOrCoalescingAssignmentOperator(token: SyntaxKind): token is LogicalOrCoalescingAssignmentOperator {
    return token === SyntaxKind.BarBarEqualsToken
        //|| token === SyntaxKind.AmpersandAmpersandEqualsToken
        || token === SyntaxKind.QuestionQuestionEqualsToken;
}

export function isBinaryLogicalOperator(token: SyntaxKind): boolean {
    return token === SyntaxKind.BarBarToken || token === SyntaxKind.AmpersandAmpersandToken;
}

/** @internal */
export function isLogicalOrCoalescingBinaryOperator(token: SyntaxKind): token is LogicalOperator {
    return isBinaryLogicalOperator(token);
}

/** @internal */
export function isLogicalOrCoalescingBinaryExpression(expr: Node): expr is BinaryExpression {
    return isBinaryExpression(expr) && isLogicalOrCoalescingBinaryOperator(expr.operatorToken.kind);
}

/** @internal */
export function isAssignmentOperator(token: SyntaxKind): boolean {
    return token >= SyntaxKind.FirstAssignment && token <= SyntaxKind.LastAssignment;
}

/** @internal */
export function isOuterExpression(node: Node, kinds = OuterExpressionKinds.All): node is OuterExpression {
    switch (node.kind) {
        case SyntaxKind.ParenthesizedExpression:
            // if (kinds & OuterExpressionKinds.ExcludeJSDocTypeAssertion && isJSDocTypeAssertion(node)) {
            //     return false;
            // }
            return (kinds & OuterExpressionKinds.Parentheses) !== 0;
        // case SyntaxKind.TypeAssertionExpression:
        // case SyntaxKind.AsExpression:
        // case SyntaxKind.ExpressionWithTypeArguments:
        // case SyntaxKind.SatisfiesExpression:
        //    return (kinds & OuterExpressionKinds.TypeAssertions) !== 0;
        // case SyntaxKind.NonNullExpression:
        //     return (kinds & OuterExpressionKinds.NonNullAssertions) !== 0;
        case SyntaxKind.PartiallyEmittedExpression:
            return (kinds & OuterExpressionKinds.PartiallyEmittedExpressions) !== 0;
    }
    return false;
}

/** @internal */
export function skipOuterExpressions<T extends Expression>(node: WrappedExpression<T>): T;
/** @internal */
export function skipOuterExpressions(node: Expression, kinds?: OuterExpressionKinds): Expression;
/** @internal */
export function skipOuterExpressions(node: Node, kinds?: OuterExpressionKinds): Node;
/** @internal */
export function skipOuterExpressions(node: Node, kinds = OuterExpressionKinds.All) {
    while (isOuterExpression(node, kinds)) {
        node = node.expression;
    }
    return node;
}

// A node is an assignment target if it is on the left hand side of an '=' token, if it is parented by a property
// assignment in an object literal that is an assignment target, or if it is parented by an array literal that is
// an assignment target. Examples include 'a = xxx', '{ p: a } = xxx', '[{ a }] = xxx'.
// (Note that `p` is not a target in the above examples, only `a`.)
/** @internal */
export function isAssignmentTarget(node: Node): boolean {
    return !!getAssignmentTarget(node);
}

type AssignmentTarget =
    | BinaryExpression
    | PrefixUnaryExpression
    | PostfixUnaryExpression
    | ForEachStatement;

function getAssignmentTarget(node: Node): AssignmentTarget | undefined {
    let parent = node.parent;
    while (true) {
        switch (parent.kind) {
            case SyntaxKind.BinaryExpression:
                const binaryExpression = parent as BinaryExpression;
                const binaryOperator = binaryExpression.operatorToken.kind;
                return isAssignmentOperator(binaryOperator) && binaryExpression.left === node ? binaryExpression : undefined;
            case SyntaxKind.PrefixUnaryExpression:
            case SyntaxKind.PostfixUnaryExpression:
                const unaryExpression = parent as PrefixUnaryExpression | PostfixUnaryExpression;
                const unaryOperator = unaryExpression.operator;
                return unaryOperator === SyntaxKind.PlusPlusToken || unaryOperator === SyntaxKind.MinusMinusToken ? unaryExpression : undefined;
            case SyntaxKind.ForEachStatement:            
                const forInOrOfStatement = parent as ForEachStatement;
                return some(forInOrOfStatement.initializer, (i)=> i === node) ? forInOrOfStatement : undefined;
            case SyntaxKind.ParenthesizedExpression:
            case SyntaxKind.ArrayLiteralExpression:
            case SyntaxKind.SpreadElement:
            //case SyntaxKind.NonNullExpression:
                node = parent;
                break;
            // case SyntaxKind.SpreadAssignment:
            //     node = parent.parent;
            //     break;
            case SyntaxKind.ShorthandPropertyAssignment:
                if ((parent as ShorthandPropertyAssignment).name !== node) {
                    return undefined;
                }
                node = parent.parent;
                break;
            case SyntaxKind.PropertyAssignment:
                if ((parent as PropertyAssignment).name === node) {
                    return undefined;
                }
                node = parent.parent;
                break;
            default:
                return undefined;
        }
        parent = node.parent;
    }
}

/** @internal */
export function isDottedName(node: Expression): boolean {
    return node.kind === SyntaxKind.Identifier        
        || node.kind === SyntaxKind.SuperKeyword    
        || node.kind === SyntaxKind.PropertyAccessExpression && isDottedName((node as PropertyAccessExpression).expression)
        || node.kind === SyntaxKind.ParenthesizedExpression && isDottedName((node as ParenthesizedExpression).expression);
}

type BinaryExpressionState = <TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: BinaryExpression[], userStateStack: TState[], resultHolder: { value: TResult; }, outerState: TOuterState) => number;
namespace BinaryExpressionState {
    /**
     * Handles walking into a `BinaryExpression`.
     * @param machine State machine handler functions
     * @param frame The current frame
     * @returns The new frame
     */
    export function enter<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: BinaryExpression[], userStateStack: TState[], _resultHolder: { value: TResult; }, outerState: TOuterState): number {
        const prevUserState = stackIndex > 0 ? userStateStack[stackIndex - 1] : undefined;
        Debug.assertEqual(stateStack[stackIndex], enter);
        userStateStack[stackIndex] = machine.onEnter(nodeStack[stackIndex], prevUserState, outerState);
        stateStack[stackIndex] = nextState(machine, enter);
        return stackIndex;
    }

    /**
     * Handles walking the `left` side of a `BinaryExpression`.
     * @param machine State machine handler functions
     * @param frame The current frame
     * @returns The new frame
     */
    export function left<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: BinaryExpression[], userStateStack: TState[], _resultHolder: { value: TResult; }, _outerState: TOuterState): number {
        Debug.assertEqual(stateStack[stackIndex], left);
        Debug.assertIsDefined(machine.onLeft);
        stateStack[stackIndex] = nextState(machine, left);
        const nextNode = machine.onLeft(nodeStack[stackIndex].left, userStateStack[stackIndex], nodeStack[stackIndex]);
        if (nextNode) {
            checkCircularity(stackIndex, nodeStack, nextNode);
            return pushStack(stackIndex, stateStack, nodeStack, userStateStack, nextNode);
        }
        return stackIndex;
    }

    /**
     * Handles walking the `operatorToken` of a `BinaryExpression`.
     * @param machine State machine handler functions
     * @param frame The current frame
     * @returns The new frame
     */
    export function operator<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: BinaryExpression[], userStateStack: TState[], _resultHolder: { value: TResult; }, _outerState: TOuterState): number {
        Debug.assertEqual(stateStack[stackIndex], operator);
        Debug.assertIsDefined(machine.onOperator);
        stateStack[stackIndex] = nextState(machine, operator);
        machine.onOperator(nodeStack[stackIndex].operatorToken, userStateStack[stackIndex], nodeStack[stackIndex]);
        return stackIndex;
    }

    /**
     * Handles walking the `right` side of a `BinaryExpression`.
     * @param machine State machine handler functions
     * @param frame The current frame
     * @returns The new frame
     */
    export function right<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: BinaryExpression[], userStateStack: TState[], _resultHolder: { value: TResult; }, _outerState: TOuterState): number {
        Debug.assertEqual(stateStack[stackIndex], right);
        Debug.assertIsDefined(machine.onRight);
        stateStack[stackIndex] = nextState(machine, right);
        const nextNode = machine.onRight(nodeStack[stackIndex].right, userStateStack[stackIndex], nodeStack[stackIndex]);
        if (nextNode) {
            checkCircularity(stackIndex, nodeStack, nextNode);
            return pushStack(stackIndex, stateStack, nodeStack, userStateStack, nextNode);
        }
        return stackIndex;
    }

    /**
     * Handles walking out of a `BinaryExpression`.
     * @param machine State machine handler functions
     * @param frame The current frame
     * @returns The new frame
     */
    export function exit<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: BinaryExpression[], userStateStack: TState[], resultHolder: { value: TResult; }, _outerState: TOuterState): number {
        Debug.assertEqual(stateStack[stackIndex], exit);
        stateStack[stackIndex] = nextState(machine, exit);
        const result = machine.onExit(nodeStack[stackIndex], userStateStack[stackIndex]);
        if (stackIndex > 0) {
            stackIndex--;
            if (machine.foldState) {
                const side = stateStack[stackIndex] === exit ? "right" : "left";
                userStateStack[stackIndex] = machine.foldState(userStateStack[stackIndex], result, side);
            }
        }
        else {
            resultHolder.value = result;
        }
        return stackIndex;
    }

    /**
     * Handles a frame that is already done.
     * @returns The `done` state.
     */
    export function done<TOuterState, TState, TResult>(_machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], _nodeStack: BinaryExpression[], _userStateStack: TState[], _resultHolder: { value: TResult; }, _outerState: TOuterState): number {
        Debug.assertEqual(stateStack[stackIndex], done);
        return stackIndex;
    }

    export function nextState<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, currentState: BinaryExpressionState) {
        switch (currentState) {
            case enter:
                if (machine.onLeft) return left;
                // falls through
            case left:
                if (machine.onOperator) return operator;
                // falls through
            case operator:
                if (machine.onRight) return right;
                // falls through
            case right:
                return exit;
            case exit:
                return done;
            case done:
                return done;
            default:
                Debug.fail("Invalid state");
        }
    }

    function pushStack<TState>(stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: BinaryExpression[], userStateStack: TState[], node: BinaryExpression) {
        stackIndex++;
        stateStack[stackIndex] = enter;
        nodeStack[stackIndex] = node;
        userStateStack[stackIndex] = undefined!;
        return stackIndex;
    }

    function checkCircularity(stackIndex: number, nodeStack: BinaryExpression[], node: BinaryExpression) {
        if (Debug.shouldAssert(AssertionLevel.Aggressive)) {
            while (stackIndex >= 0) {
                Debug.assert(nodeStack[stackIndex] !== node, "Circular traversal detected.");
                stackIndex--;
            }
        }
    }
}

/**
 * Holds state machine handler functions
 */
class BinaryExpressionStateMachine<TOuterState, TState, TResult> {
    constructor(
        readonly onEnter: (node: BinaryExpression, prev: TState | undefined, outerState: TOuterState) => TState,
        readonly onLeft: ((left: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
        readonly onOperator: ((operatorToken: BinaryOperatorToken, userState: TState, node: BinaryExpression) => void) | undefined,
        readonly onRight: ((right: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
        readonly onExit: (node: BinaryExpression, userState: TState) => TResult,
        readonly foldState: ((userState: TState, result: TResult, side: "left" | "right") => TState) | undefined,
    ) {
    }
}


/**
 * Creates a state machine that walks a `BinaryExpression` using the heap to reduce call-stack depth on a large tree.
 * @param onEnter Callback evaluated when entering a `BinaryExpression`. Returns new user-defined state to associate with the node while walking.
 * @param onLeft Callback evaluated when walking the left side of a `BinaryExpression`. Return a `BinaryExpression` to continue walking, or `void` to advance to the right side.
 * @param onRight Callback evaluated when walking the right side of a `BinaryExpression`. Return a `BinaryExpression` to continue walking, or `void` to advance to the end of the node.
 * @param onExit Callback evaluated when exiting a `BinaryExpression`. The result returned will either be folded into the parent's state, or returned from the walker if at the top frame.
 * @param foldState Callback evaluated when the result from a nested `onExit` should be folded into the state of that node's parent.
 * @returns A function that walks a `BinaryExpression` node using the above callbacks, returning the result of the call to `onExit` from the outermost `BinaryExpression` node.
 *
 * @internal
 */
export function createBinaryExpressionTrampoline<TState, TResult>(
    onEnter: (node: BinaryExpression, prev: TState | undefined) => TState,
    onLeft: ((left: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
    onOperator: ((operatorToken: BinaryOperatorToken, userState: TState, node: BinaryExpression) => void) | undefined,
    onRight: ((right: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
    onExit: (node: BinaryExpression, userState: TState) => TResult,
    foldState: ((userState: TState, result: TResult, side: "left" | "right") => TState) | undefined,
): (node: BinaryExpression) => TResult;
/**
 * Creates a state machine that walks a `BinaryExpression` using the heap to reduce call-stack depth on a large tree.
 * @param onEnter Callback evaluated when entering a `BinaryExpression`. Returns new user-defined state to associate with the node while walking.
 * @param onLeft Callback evaluated when walking the left side of a `BinaryExpression`. Return a `BinaryExpression` to continue walking, or `void` to advance to the right side.
 * @param onRight Callback evaluated when walking the right side of a `BinaryExpression`. Return a `BinaryExpression` to continue walking, or `void` to advance to the end of the node.
 * @param onExit Callback evaluated when exiting a `BinaryExpression`. The result returned will either be folded into the parent's state, or returned from the walker if at the top frame.
 * @param foldState Callback evaluated when the result from a nested `onExit` should be folded into the state of that node's parent.
 * @returns A function that walks a `BinaryExpression` node using the above callbacks, returning the result of the call to `onExit` from the outermost `BinaryExpression` node.
 *
 * @internal
 */
export function createBinaryExpressionTrampoline<TOuterState, TState, TResult>(
    onEnter: (node: BinaryExpression, prev: TState | undefined, outerState: TOuterState) => TState,
    onLeft: ((left: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
    onOperator: ((operatorToken: BinaryOperatorToken, userState: TState, node: BinaryExpression) => void) | undefined,
    onRight: ((right: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
    onExit: (node: BinaryExpression, userState: TState) => TResult,
    foldState: ((userState: TState, result: TResult, side: "left" | "right") => TState) | undefined,
): (node: BinaryExpression, outerState: TOuterState) => TResult;
/** @internal */
export function createBinaryExpressionTrampoline<TOuterState, TState, TResult>(
    onEnter: (node: BinaryExpression, prev: TState | undefined, outerState: TOuterState) => TState,
    onLeft: ((left: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
    onOperator: ((operatorToken: BinaryOperatorToken, userState: TState, node: BinaryExpression) => void) | undefined,
    onRight: ((right: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
    onExit: (node: BinaryExpression, userState: TState) => TResult,
    foldState: ((userState: TState, result: TResult, side: "left" | "right") => TState) | undefined,
) {
    const machine = new BinaryExpressionStateMachine(onEnter, onLeft, onOperator, onRight, onExit, foldState);
    return trampoline;

    function trampoline(node: BinaryExpression, outerState: TOuterState) {
        const resultHolder: { value: TResult; } = { value: undefined! };
        const stateStack: BinaryExpressionState[] = [BinaryExpressionState.enter];
        const nodeStack: BinaryExpression[] = [node];
        const userStateStack: TState[] = [undefined!];
        let stackIndex = 0;
        while (stateStack[stackIndex] !== BinaryExpressionState.done) {
            stackIndex = stateStack[stackIndex](machine, stackIndex, stateStack, nodeStack, userStateStack, resultHolder, outerState);
        }
        Debug.assertEqual(stackIndex, 0);
        return resultHolder.value;
    }
}

/** @internal */
export function skipParentheses(node: Expression, excludeJSDocTypeAssertions?: boolean): Expression;
/** @internal */
export function skipParentheses(node: Node, excludeJSDocTypeAssertions?: boolean): Node;
/** @internal */
export function skipParentheses(node: Node, excludeJSDocTypeAssertions?: boolean): Node {
    const flags = excludeJSDocTypeAssertions ?
        OuterExpressionKinds.Parentheses | OuterExpressionKinds.ExcludeJSDocTypeAssertion :
        OuterExpressionKinds.Parentheses;
    return skipOuterExpressions(node, flags);
}

/** @internal */
export function createDiagnosticCollection(): DiagnosticCollection {
    let nonFileDiagnostics = [] as Diagnostic[] as SortedArray<Diagnostic>; // See GH#19873
    const filesWithDiagnostics = [] as string[] as SortedArray<string>;
    const fileDiagnostics = new Map<string, SortedArray<DiagnosticWithLocation>>();
    let hasReadNonFileDiagnostics = false;

    return {
        add,
        lookup,
        getGlobalDiagnostics,
        getDiagnostics,
    };

    function lookup(diagnostic: Diagnostic): Diagnostic | undefined {
        let diagnostics: SortedArray<Diagnostic> | undefined;
        if (diagnostic.file) {
            diagnostics = fileDiagnostics.get(diagnostic.file.fileName);
        }
        else {
            diagnostics = nonFileDiagnostics;
        }
        if (!diagnostics) {
            return undefined;
        }
        const result = binarySearch(diagnostics, diagnostic, identity, compareDiagnosticsSkipRelatedInformation);
        if (result >= 0) {
            return diagnostics[result];
        }
        if (~result > 0 && diagnosticsEqualityComparer(diagnostic, diagnostics[~result - 1])) {
            return diagnostics[~result - 1];
        }
        return undefined;
    }
   
    function add(diagnostic: Diagnostic): void {
        let diagnostics: SortedArray<Diagnostic> | undefined;
        if (diagnostic.file) {
            diagnostics = fileDiagnostics.get(diagnostic.file.fileName);
            if (!diagnostics) {
                diagnostics = [] as Diagnostic[] as SortedArray<DiagnosticWithLocation>; // See GH#19873
                fileDiagnostics.set(diagnostic.file.fileName, diagnostics as SortedArray<DiagnosticWithLocation>);
                insertSorted(filesWithDiagnostics, diagnostic.file.fileName, compareStringsCaseSensitive);
            }
        }
        else {
            // If we've already read the non-file diagnostics, do not modify the existing array.
            if (hasReadNonFileDiagnostics) {
                hasReadNonFileDiagnostics = false;
                nonFileDiagnostics = nonFileDiagnostics.slice() as SortedArray<Diagnostic>;
            }

            diagnostics = nonFileDiagnostics;
        }

        insertSorted(diagnostics, diagnostic, compareDiagnosticsSkipRelatedInformation, diagnosticsEqualityComparer);
    }

    function getGlobalDiagnostics(): Diagnostic[] {
        hasReadNonFileDiagnostics = true;
        return nonFileDiagnostics;
    }

    function getDiagnostics(fileName: string): DiagnosticWithLocation[];
    function getDiagnostics(): Diagnostic[];
    function getDiagnostics(fileName?: string): Diagnostic[] {
        if (fileName) {
            return fileDiagnostics.get(fileName) || [];
        }

        const fileDiags: Diagnostic[] = flatMapToMutable(filesWithDiagnostics, f => fileDiagnostics.get(f));
        if (!nonFileDiagnostics.length) {
            return fileDiags;
        }
        fileDiags.unshift(...nonFileDiagnostics);
        return fileDiags;
    }
}

function getDiagnosticCode(d: Diagnostic): number {
    return d.canonicalHead?.code || d.code;
}

function getDiagnosticMessage(d: Diagnostic): string | DiagnosticMessageChain {
    return d.canonicalHead?.messageText || d.messageText;
}

function getDiagnosticFilePath(diagnostic: Diagnostic): string | undefined {
    return diagnostic.file ? diagnostic.file.path : undefined;
}

// An diagnostic message with more elaboration should be considered *less than* a diagnostic message
// with less elaboration that is otherwise similar.
function compareMessageText(
    d1: Diagnostic,
    d2: Diagnostic,
): Comparison {
    let headMsg1 = getDiagnosticMessage(d1);
    let headMsg2 = getDiagnosticMessage(d2);
    if (typeof headMsg1 !== "string") {
        headMsg1 = headMsg1.messageText;
    }
    if (typeof headMsg2 !== "string") {
        headMsg2 = headMsg2.messageText;
    }
    const chain1 = typeof d1.messageText !== "string" ? d1.messageText.next : undefined;
    const chain2 = typeof d2.messageText !== "string" ? d2.messageText.next : undefined;

    let res = compareStringsCaseSensitive(headMsg1, headMsg2);
    if (res) {
        return res;
    }

    res = compareMessageChain(chain1, chain2);
    if (res) {
        return res;
    }

    if (d1.canonicalHead && !d2.canonicalHead) {
        return Comparison.LessThan;
    }
    if (d2.canonicalHead && !d1.canonicalHead) {
        return Comparison.GreaterThan;
    }

    return Comparison.EqualTo;
}

function compareDiagnosticsSkipRelatedInformation(d1: Diagnostic, d2: Diagnostic): Comparison {
    const code1 = getDiagnosticCode(d1);
    const code2 = getDiagnosticCode(d2);
    return compareStringsCaseSensitive(getDiagnosticFilePath(d1), getDiagnosticFilePath(d2)) ||
        compareValues(d1.start, d2.start) ||
        compareValues(d1.length, d2.length) ||
        compareValues(code1, code2) ||
        compareMessageText(d1, d2) ||
        Comparison.EqualTo;
}

// First compare by size of the message chain,
// then compare by content of the message chain.
function compareMessageChain(
    c1: DiagnosticMessageChain[] | undefined,
    c2: DiagnosticMessageChain[] | undefined,
): Comparison {
    if (c1 === undefined && c2 === undefined) {
        return Comparison.EqualTo;
    }
    if (c1 === undefined) {
        return Comparison.GreaterThan;
    }
    if (c2 === undefined) {
        return Comparison.LessThan;
    }

    return compareMessageChainSize(c1, c2) || compareMessageChainContent(c1, c2);
}


function compareMessageChainSize(
    c1: DiagnosticMessageChain[] | undefined,
    c2: DiagnosticMessageChain[] | undefined,
): Comparison {
    if (c1 === undefined && c2 === undefined) {
        return Comparison.EqualTo;
    }
    if (c1 === undefined) {
        return Comparison.GreaterThan;
    }
    if (c2 === undefined) {
        return Comparison.LessThan;
    }

    let res = compareValues(c2.length, c1.length);
    if (res) {
        return res;
    }

    for (let i = 0; i < c2.length; i++) {
        res = compareMessageChainSize(c1[i].next, c2[i].next);
        if (res) {
            return res;
        }
    }

    return Comparison.EqualTo;
}

// Assumes the two chains have the same shape.
function compareMessageChainContent(
    c1: DiagnosticMessageChain[],
    c2: DiagnosticMessageChain[],
): Comparison {
    let res;
    for (let i = 0; i < c2.length; i++) {
        res = compareStringsCaseSensitive(c1[i].messageText, c2[i].messageText);
        if (res) {
            return res;
        }
        if (c1[i].next === undefined) {
            continue;
        }
        res = compareMessageChainContent(c1[i].next!, c2[i].next!);
        if (res) {
            return res;
        }
    }
    return Comparison.EqualTo;
}

 /** @internal */
 export function diagnosticsEqualityComparer(d1: Diagnostic, d2: Diagnostic): boolean {
    const code1 = getDiagnosticCode(d1);
    const code2 = getDiagnosticCode(d2);
    const msg1 = getDiagnosticMessage(d1);
    const msg2 = getDiagnosticMessage(d2);
    return compareStringsCaseSensitive(getDiagnosticFilePath(d1), getDiagnosticFilePath(d2)) === Comparison.EqualTo &&
        compareValues(d1.start, d2.start) === Comparison.EqualTo &&
        compareValues(d1.length, d2.length) === Comparison.EqualTo &&
        compareValues(code1, code2) === Comparison.EqualTo &&
        messageTextEqualityComparer(msg1, msg2);
}

function messageTextEqualityComparer(m1: string | DiagnosticMessageChain, m2: string | DiagnosticMessageChain): boolean {
    const t1 = typeof m1 === "string" ? m1 : m1.messageText;
    const t2 = typeof m2 === "string" ? m2 : m2.messageText;
    return compareStringsCaseSensitive(t1, t2) === Comparison.EqualTo;
}

/** @internal */
export function createNameResolver({
    compilerOptions,
    requireSymbol,
    argumentsSymbol,
    error,
    getSymbolOfDeclaration,
    globals,
    lookup,
    setRequiresScopeChangeCache = returnUndefined,
    getRequiresScopeChangeCache = returnUndefined,
    onPropertyWithInvalidInitializer = returnFalse,
    onFailedToResolveSymbol = returnUndefined,
    onSuccessfullyResolvedSymbol = returnUndefined,
}: {
    compilerOptions: CompilerOptions;
    getSymbolOfDeclaration: (node: Declaration) => Symbol;
    error: (location: Node | undefined, message: DiagnosticMessage, ...args: DiagnosticArguments) => void;
    globals: SymbolTable;
    argumentsSymbol: Symbol;
    requireSymbol: Symbol;
    lookup: (symbols: SymbolTable, name: string, meaning: SymbolFlags) => Symbol | undefined;
    setRequiresScopeChangeCache: undefined | ((node: FunctionLikeDeclaration, value: boolean) => void);
    getRequiresScopeChangeCache: undefined | ((node: FunctionLikeDeclaration) => boolean | undefined);
    onPropertyWithInvalidInitializer?: (location: Node | undefined, name: string, declaration: PropertyDeclaration, result: Symbol | undefined) => boolean;
    onFailedToResolveSymbol?: (
        location: Node | undefined,
        name: string | Identifier,
        meaning: SymbolFlags,
        nameNotFoundMessage: DiagnosticMessage,
    ) => void;
    onSuccessfullyResolvedSymbol?: (
        location: Node | undefined,
        result: Symbol,
        meaning: SymbolFlags,
        lastLocation: Node | undefined,
        associatedDeclarationForContainingInitializerOrBindingName: ParameterDeclaration | BindingElement | undefined,
        withinDeferredContext: boolean,
    ) => void;
}) {
    /* eslint-disable no-var */
    var emptySymbols = createSymbolTable();
    return resolveNameHelper;
    function resolveNameHelper(
        location: Node | undefined,
        nameArg: string | Identifier,
        meaning: SymbolFlags,
        nameNotFoundMessage: DiagnosticMessage | undefined,
        isUse: boolean,
        excludeGlobals?: boolean,
    ): Symbol | undefined {
        const originalLocation = location; // needed for did-you-mean error reporting, which gathers candidates starting from the original location
        let result: Symbol | undefined;
        let lastLocation: Node | undefined;
        let lastSelfReferenceLocation: Declaration | undefined;
        let propertyWithInvalidInitializer: PropertyDeclaration | undefined;
        let associatedDeclarationForContainingInitializerOrBindingName: ParameterDeclaration | BindingElement | undefined;
        let withinDeferredContext = false;
        let grandparent: Node;
        const name = isString(nameArg) ? nameArg : (nameArg as Identifier).text;
        loop:
        while (location) {
            // TODO HANDLE INCLUDE/INHERITS HERE?
            // if (isModuleOrEnumDeclaration(location) && lastLocation && location.name === lastLocation) {
            //     // If lastLocation is the name of a namespace or enum, skip the parent since it will have is own locals that could
            //     // conflict.
            //     lastLocation = location;
            //     location = location.parent;
            // }
            if (canHaveLocals(location) && location.locals) {
                if (result = lookup(location.locals, name, meaning)) {
                    let useResult = true;
                    if (isFunctionLike(location) && lastLocation && lastLocation !== (location as FunctionLikeDeclaration).body) {
                        // symbol lookup restrictions for function-like declarations
                        // - Type parameters of a function are in scope in the entire function declaration, including the parameter
                        //   list and return type. However, local types are only in scope in the function body.
                        // - parameters are only in the scope of function body
                        // This restriction does not apply to JSDoc comment types because they are parented
                        // at a higher level than type parameters would normally be
                        if (meaning & result.flags & SymbolFlags.Type && lastLocation.kind !== SyntaxKind.JSDoc) {
                            useResult = result.flags & SymbolFlags.TypeParameter
                                // type parameters are visible in parameter list, return type and type parameter list
                                ? !!(lastLocation.flags & NodeFlags.Synthesized) || // Synthetic fake scopes are added for signatures so type parameters are accessible from them
                                    lastLocation === (location as FunctionLikeDeclaration).type ||
                                    lastLocation.kind === SyntaxKind.Parameter ||
                                    lastLocation.kind === SyntaxKind.JSDocParameterTag ||
                                    lastLocation.kind === SyntaxKind.JSDocReturnTag ||
                                    lastLocation.kind === SyntaxKind.TypeParameter
                                // local types not visible outside the function body
                                : false;
                        }
                        if (meaning & result.flags & SymbolFlags.Variable) {
                            // expression inside parameter will lookup as normal variable scope when targeting es2015+
                            if (useOuterVariableScopeInParameter(result, location, lastLocation)) {
                                useResult = false;
                            }
                            else if (result.flags & SymbolFlags.FunctionScopedVariable) {
                                // parameters are visible only inside function body, parameter list and return type
                                // technically for parameter list case here we might mix parameters and variables declared in function,
                                // however it is detected separately when checking initializers of parameters
                                // to make sure that they reference no variables declared after them.
                                useResult = lastLocation.kind === SyntaxKind.Parameter ||
                                    !!(lastLocation.flags & NodeFlags.Synthesized) || // Synthetic fake scopes are added for signatures so parameters are accessible from them
                                    (
                                        lastLocation === (location as FunctionLikeDeclaration).type &&
                                        !!findAncestor(result.valueDeclaration, isParameter)
                                    );
                            }
                        }
                    }
                    
                    if (useResult) {
                        break loop;
                    }
                    else {
                        result = undefined;
                    }
                }
            }
            withinDeferredContext = withinDeferredContext || getIsDeferredContext(location, lastLocation);
            switch (location.kind) {
                case SyntaxKind.SourceFile:
                    //if (!isExternalOrCommonJsModule(location as SourceFile)) break;
                    // falls through
                //case SyntaxKind.ModuleDeclaration:
                    const moduleExports = getSymbolOfDeclaration(location as SourceFile /*| ModuleDeclaration*/)?.exports || emptySymbols;
                    if (location.kind === SyntaxKind.SourceFile) {// || (isModuleDeclaration(location) && location.flags & NodeFlags.Ambient && !isGlobalScopeAugmentation(location))) {
                        // It's an external module. First see if the module has an export default and if the local
                        // name of that export default matches.
                        if (result = moduleExports.get(InternalSymbolName.Default)) {
                            const localSymbol = getLocalSymbolForExportDefault(result);
                            if (localSymbol && (result.flags & meaning) && localSymbol.name === name) {
                                break loop;
                            }
                            result = undefined;
                        }

                        // Because of module/namespace merging, a module's exports are in scope,
                        // yet we never want to treat an export specifier as putting a member in scope.
                        // Therefore, if the name we find is purely an export specifier, it is not actually considered in scope.
                        // Two things to note about this:
                        //     1. We have to check this without calling getSymbol. The problem with calling getSymbol
                        //        on an export specifier is that it might find the export specifier itself, and try to
                        //        resolve it as an alias. This will cause the checker to consider the export specifier
                        //        a circular alias reference when it might not be.
                        //     2. We check === SymbolFlags.Alias in order to check that the symbol is *purely*
                        //        an alias. If we used &, we'd be throwing out symbols that have non alias aspects,
                        //        which is not the desired behavior.
                        const moduleExport = moduleExports.get(name);
                        if (
                            moduleExport &&
                            moduleExport.flags === SymbolFlags.Alias 
                            // TODO && (getDeclarationOfKind(moduleExport, SyntaxKind.ExportSpecifier) || getDeclarationOfKind(moduleExport, SyntaxKind.NamespaceExport))
                        ) {
                            break;
                        }
                    }

                    // ES6 exports are also visible locally (except for 'default'), but commonjs exports are not (except typedefs)
                    // if (name !== InternalSymbolName.Default && (result = lookup(moduleExports, name, meaning & SymbolFlags.ModuleMember))) {
                    //     if (isSourceFile(location) && location.commonJsModuleIndicator && !result.declarations?.some(isJSDocTypeAlias)) {
                    //         result = undefined;
                    //     }
                    //     else {
                    //         break loop;
                    //     }
                    // }
                    break;                
                case SyntaxKind.PropertyDeclaration:
                    // TODO: I don't think this is needed for LPC structs
                    // TypeScript 1.0 spec (April 2014): 8.4.1
                    // Initializer expressions for instance member variables are evaluated in the scope
                    // of the class constructor body but are not permitted to reference parameters or
                    // local variables of the constructor. This effectively means that entities from outer scopes
                    // by the same name as a constructor parameter or local variable are inaccessible
                    // in initializer expressions for instance member variables.                    
                    // const ctor = findConstructorDeclaration(location.parent as ClassLikeDeclaration);
                    // if (ctor && ctor.locals) {
                    //     if (lookup(ctor.locals, name, meaning & SymbolFlags.Value)) {
                    //         // Remember the property node, it will be used later to report appropriate error
                    //         Debug.assertNode(location, isPropertyDeclaration);
                    //         propertyWithInvalidInitializer = location;
                    //     }
                    // }
            
                    break;
                case SyntaxKind.StructDeclaration:
                case SyntaxKind.ClassExpression:
                //case SyntaxKind.InterfaceDeclaration:
                    // The below is used to lookup type parameters within a class or interface, as they are added to the class/interface locals
                    // These can never be latebound, so the symbol's raw members are sufficient. `getMembersOfNode` cannot be used, as it would
                    // trigger resolving late-bound names, which we may already be in the process of doing while we're here!
                    if (result = lookup(getSymbolOfDeclaration(location as StructDeclaration).members || emptySymbols, name, meaning & SymbolFlags.Type)) {
                        if (!isTypeParameterSymbolDeclaredInContainer(result, location)) {
                            // ignore type parameters not declared in this container
                            result = undefined;
                            break;
                        }                        
                        break loop;
                    }
                    // if (isClassExpression(location) && meaning & SymbolFlags.Class) {
                    //     const className = location.name;
                    //     if (className && name === className.text) {
                    //         result = location.symbol;
                    //         break loop;
                    //     }
                    // }
                    break;                               
                case SyntaxKind.InlineClosureExpression:                    
                //case SyntaxKind.MethodDeclaration:                
                case SyntaxKind.FunctionDeclaration:
                    if (meaning & SymbolFlags.Variable && name === "arguments") {
                        result = argumentsSymbol;
                        break loop;
                    }
                    break;
                case SyntaxKind.FunctionExpression:
                    if (meaning & SymbolFlags.Variable && name === "arguments") {
                        result = argumentsSymbol;
                        break loop;
                    }

                    if (meaning & SymbolFlags.Function) {
                        const functionName = (location as FunctionExpression).name;
                        if (functionName && name === functionName.text) {
                            result = (location as FunctionExpression).symbol;
                            break loop;
                        }
                    }
                    break;                
                case SyntaxKind.JSDocTypedefTag:
                case SyntaxKind.JSDocCallbackTag:
                case SyntaxKind.JSDocEnumTag:
                case SyntaxKind.JSDocImportTag:
                    // js type aliases do not resolve names from their host, so skip past it
                    const root = getJSDocRoot(location);
                    if (root) {
                        location = root.parent;
                    }
                    break;
                case SyntaxKind.Parameter:
                    if (
                        lastLocation && (
                            lastLocation === (location as ParameterDeclaration).initializer ||
                            lastLocation === (location as ParameterDeclaration).name //&& isBindingPattern(lastLocation)
                        )
                    ) {
                        if (!associatedDeclarationForContainingInitializerOrBindingName) {
                            associatedDeclarationForContainingInitializerOrBindingName = location as ParameterDeclaration;
                        }
                    }
                    break;
                // case SyntaxKind.BindingElement:
                //     if (
                //         lastLocation && (
                //             lastLocation === (location as BindingElement).initializer ||
                //             lastLocation === (location as BindingElement).name && isBindingPattern(lastLocation)
                //         )
                //     ) {
                //         if (isPartOfParameterDeclaration(location as BindingElement) && !associatedDeclarationForContainingInitializerOrBindingName) {
                //             associatedDeclarationForContainingInitializerOrBindingName = location as BindingElement;
                //         }
                //     }
                //     break;                
                // case SyntaxKind.ExportSpecifier:
                //     // External module export bindings shouldn't be resolved to local symbols.
                //     if (
                //         lastLocation &&
                //         lastLocation === (location as ExportSpecifier).propertyName &&
                //         (location as ExportSpecifier).parent.parent.moduleSpecifier
                //     ) {
                //         location = location.parent.parent.parent;
                //     }
                //     break;
            }
            if (isSelfReferenceLocation(location, lastLocation)) {
                lastSelfReferenceLocation = location;
            }
            lastLocation = location;
            // TODO
            // location = isJSDocTemplateTag(location) ? getEffectiveContainerForJSDocTemplateTag(location) || location.parent :
            //     isJSDocParameterTag(location) || isJSDocReturnTag(location) ? getHostSignatureFromJSDoc(location) || location.parent :
            //     location.parent;
            location = location.parent;
        }

        // We just climbed up parents looking for the name, meaning that we started in a descendant node of `lastLocation`.
        // If `result === lastSelfReferenceLocation.symbol`, that means that we are somewhere inside `lastSelfReferenceLocation` looking up a name, and resolving to `lastLocation` itself.
        // That means that this is a self-reference of `lastLocation`, and shouldn't count this when considering whether `lastLocation` is used.
        if (isUse && result && (!lastSelfReferenceLocation || result !== lastSelfReferenceLocation.symbol)) {
            result.isReferenced! |= meaning;
        }

        if (!result) {
            if (lastLocation) {
                Debug.assertNode(lastLocation, isSourceFile);                
            }

            if (!excludeGlobals) {
                result = lookup(globals, name, meaning);
            }
        }
        if (!result) {
            // TODO handle include/inherit here?
            // if (originalLocation && isInJSFile(originalLocation) && originalLocation.parent) {
            //     if (isRequireCall(originalLocation.parent, /*requireStringLiteralLikeArgument*/ false)) {
            //         return requireSymbol;
            //     }
            // }
        }

        if (nameNotFoundMessage) {
            if (propertyWithInvalidInitializer && onPropertyWithInvalidInitializer(originalLocation, name, propertyWithInvalidInitializer, result)) {
                return undefined;
            }
            if (!result) {
                onFailedToResolveSymbol(originalLocation, nameArg, meaning, nameNotFoundMessage);
            }
            else {
                onSuccessfullyResolvedSymbol(originalLocation, result, meaning, lastLocation, associatedDeclarationForContainingInitializerOrBindingName, withinDeferredContext);
            }
        }

        return result;
    }

    function useOuterVariableScopeInParameter(result: Symbol, location: Node, lastLocation: Node) {        
        const functionLocation = location as FunctionLikeDeclaration;
        if (
            isParameter(lastLocation)
            && functionLocation.body
            && result.valueDeclaration
            && result.valueDeclaration.pos >= functionLocation.body.pos
            && result.valueDeclaration.end <= functionLocation.body.end
        ) {
            // check for several cases where we introduce temporaries that require moving the name/initializer of the parameter to the body
            // - static field in a class expression
            // - optional chaining pre-es2020
            // - nullish coalesce pre-es2020
            // - spread assignment in binding pattern pre-es2017
            // if (target >= ScriptTarget.ES2015) {
            //     let declarationRequiresScopeChange = getRequiresScopeChangeCache(functionLocation);
            //     if (declarationRequiresScopeChange === undefined) {
            //         declarationRequiresScopeChange = forEach(functionLocation.parameters, requiresScopeChange) || false;
            //         setRequiresScopeChangeCache(functionLocation, declarationRequiresScopeChange);
            //     }
            //     return !declarationRequiresScopeChange;
            // }
        }
        return false;

        function requiresScopeChange(node: ParameterDeclaration): boolean {
            return requiresScopeChangeWorker(node.name)
                || !!node.initializer && requiresScopeChangeWorker(node.initializer);
        }

        function requiresScopeChangeWorker(node: Node): boolean {
            switch (node.kind) {
                case SyntaxKind.InlineClosureExpression:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.FunctionDeclaration:                
                    // do not descend into these
                    return false;
                //case SyntaxKind.MethodDeclaration:                
                case SyntaxKind.PropertyAssignment:
                    return requiresScopeChangeWorker((node as /*MethodDeclaration | AccessorDeclaration |*/ PropertyAssignment).name);
                case SyntaxKind.PropertyDeclaration:                    
                    return requiresScopeChangeWorker((node as PropertyDeclaration).name);
                default:
                    // null coalesce and optional chain pre-es2020 produce temporary variables                    
                    // if (isBindingElement(node) && node.dotDotDotToken && isObjectBindingPattern(node.parent)) {
                    //     return target < ScriptTarget.ES2017;
                    // }
                    if (isTypeNode(node)) return false;
                    return forEachChild(node, requiresScopeChangeWorker) || false;
            }
        }
    }

    function getIsDeferredContext(location: Node, lastLocation: Node | undefined): boolean {
        if (location.kind !== SyntaxKind.InlineClosureExpression && location.kind !== SyntaxKind.FunctionExpression) {
            // initializers in instance property declaration of class like entities are executed in constructor and thus deferred
            return ((
                isFunctionLikeDeclaration(location) ||
                (location.kind === SyntaxKind.PropertyDeclaration)
            ) && (!lastLocation || lastLocation !== (location as SignatureDeclaration | PropertyDeclaration).name)); // A name is evaluated within the enclosing scope - so it shouldn't count as deferred
        }
        if (lastLocation && lastLocation === (location as FunctionExpression | InlineClosureExpression).name) {
            return false;
        }
        // generator functions and async functions are not inlined in control flow when immediately invoked
        if ((location as FunctionExpression | InlineClosureExpression).asteriskToken){// || hasSyntacticModifier(location, ModifierFlags.Async)) {
            return true;
        }
        return !getImmediatelyInvokedFunctionExpression(location);
    }

    type SelfReferenceLocation =
        | ParameterDeclaration
        | FunctionDeclaration
        // | ClassDeclaration
        // | InterfaceDeclaration
        // | EnumDeclaration
        // | TypeAliasDeclaration
        // | ModuleDeclaration;
        ;

    function isSelfReferenceLocation(node: Node, lastLocation: Node | undefined): node is SelfReferenceLocation {
        switch (node.kind) {
            case SyntaxKind.Parameter:
                return !!lastLocation && lastLocation === (node as ParameterDeclaration).name;
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.StructDeclaration:
            // case SyntaxKind.InterfaceDeclaration:
            // case SyntaxKind.EnumDeclaration:
            // case SyntaxKind.TypeAliasDeclaration:
            // case SyntaxKind.ModuleDeclaration: // For `namespace N { N; }`
                return true;
            default:
                return false;
        }
    }

    function isTypeParameterSymbolDeclaredInContainer(symbol: Symbol, container: Node) {
        if (symbol.declarations) {
            for (const decl of symbol.declarations) {
                if (decl.kind === SyntaxKind.TypeParameter) {
                    const parent = isJSDocTemplateTag(decl.parent) ? getJSDocHost(decl.parent) : decl.parent;
                    if (parent === container) {
                        return true;// no type alises in LPC? !(isJSDocTemplateTag(decl.parent) && find((decl.parent.parent as JSDoc).tags, isJSDocTypeAlias));
                    }
                }
            }
        }

        return false;
    }
}


/**
 * Use getEffectiveJSDocHost if you additionally need to look for jsdoc on parent nodes, like assignments.
 *
 * @internal
 */
export function getJSDocHost(node: Node): HasJSDoc | undefined {
    const jsDoc = getJSDocRoot(node);
    if (!jsDoc) {
        return undefined;
    }

    const host = jsDoc.parent;
    if (host && host.jsDoc && jsDoc === lastOrUndefined(host.jsDoc)) {
        return host;
    }
}

/** @internal */
export function getJSDocRoot(node: Node): JSDoc | undefined {
    return findAncestor(node.parent, isJSDoc);
}

/** @internal */
export function getLocalSymbolForExportDefault(symbol: Symbol) {
    if (!symbol.declarations) return undefined;
    for (const decl of symbol.declarations) {
        if (decl.localSymbol) return decl.localSymbol;
    }
    return undefined;
}

/** @internal */
export function getEffectiveContainerForJSDocTemplateTag(node: JSDocTemplateTag) {
    // TODO
    return undefined;
    // if (isJSDoc(node.parent) && node.parent.tags) {
    //     // A @template tag belongs to any @typedef, @callback, or @enum tags in the same comment block, if they exist.
    //     const typeAlias = find(node.parent.tags, isJSDocTypeAlias);
    //     if (typeAlias) {
    //         return typeAlias;
    //     }
    // }
    // // otherwise it belongs to the host it annotates
    // return getHostSignatureFromJSDoc(node);
}

/** @internal */
export function isTypeNodeKind(kind: SyntaxKind): kind is TypeNodeSyntaxKind {
    return (kind >= SyntaxKind.FirstTypeNode && kind <= SyntaxKind.LastTypeNode)
        //|| kind === SyntaxKind.AnyKeyword
        || kind === SyntaxKind.UnknownKeyword
        || kind === SyntaxKind.IntKeyword
        || kind === SyntaxKind.FloatKeyword
        || kind === SyntaxKind.ObjectKeyword
        || kind === SyntaxKind.MixedKeyword
        || kind === SyntaxKind.StringKeyword
        || kind === SyntaxKind.MappingKeyword
        || kind === SyntaxKind.VoidKeyword
        || kind === SyntaxKind.ClosureKeywoord        
        || kind === SyntaxKind.JSDocAllType
        || kind === SyntaxKind.JSDocUnknownType
        || kind === SyntaxKind.JSDocNullableType
        || kind === SyntaxKind.JSDocNonNullableType
        || kind === SyntaxKind.JSDocOptionalType
        || kind === SyntaxKind.JSDocFunctionType
        || kind === SyntaxKind.JSDocVariadicType;
}

/** @internal */
export function createDiagnosticForNode(node: Node, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithLocation {
    const sourceFile = getSourceFileOfNode(node);
    return createDiagnosticForNodeInSourceFile(sourceFile, node, message, ...args);
}

/** @internal */
export function createCompilerDiagnostic(message: DiagnosticMessage, ...args: DiagnosticArguments): Diagnostic {
    let text = getLocaleSpecificMessage(message);

    if (some(args)) {
        text = formatStringFromArgs(text, args);
    }

    return {
        file: undefined,
        start: undefined,
        length: undefined,

        messageText: text,
        category: message.category,
        code: message.code,
        reportsUnnecessary: message.reportsUnnecessary,
        reportsDeprecated: message.reportsDeprecated,
    };
}

/** @internal */
export function isAccessExpression(node: Node): node is AccessExpression {
    return node.kind === SyntaxKind.PropertyAccessExpression || node.kind === SyntaxKind.ElementAccessExpression;
}

/** @internal */
export function isEntityNameExpression(node: Node): node is EntityNameExpression {
    return node.kind === SyntaxKind.Identifier || isPropertyAccessEntityNameExpression(node);
}

/** @internal */
export function isPropertyAccessEntityNameExpression(node: Node): node is PropertyAccessEntityNameExpression {
    return isPropertyAccessExpression(node) && isIdentifier(node.name) && isEntityNameExpression(node.expression);
}


/** @internal */
export function isAliasableExpression(e: Expression) {
    return isEntityNameExpression(e) || isInlineClosureExpression(e);
}

/**
 * Like {@link isVariableDeclarationInitializedToRequire} but allows things like `require("...").foo.bar` or `require("...")["baz"]`.
 *
 * @internal
 */
export function isVariableDeclarationInitializedToBareOrAccessedRequire(node: Node): node is VariableDeclarationInitializedTo</*RequireOrImportCall |*/ AccessExpression> {
    return isVariableDeclarationInitializedWithRequireHelper(node, /*allowAccessedRequire*/ true);
}

function isVariableDeclarationInitializedWithRequireHelper(node: Node, allowAccessedRequire: boolean) {
    return false;
    // return isVariableDeclaration(node) &&
    //     !!node.initializer &&
    //     isRequireCall(allowAccessedRequire ? getLeftmostAccessExpression(node.initializer) : node.initializer, /*requireStringLiteralLikeArgument*/ true);
}

/** @internal */
export function getCanonicalDiagnostic(message: DiagnosticMessage, ...args: string[]): CanonicalDiagnostic {
    return {
        code: message.code,
        messageText: formatMessage(message, ...args),
    };
}

/** @internal */
export function formatMessage(message: DiagnosticMessage, ...args: DiagnosticArguments): string {
    let text = getLocaleSpecificMessage(message);

    if (some(args)) {
        text = formatStringFromArgs(text, args);
    }

    return text;
}

/** @internal */
// TODO: rename to `isExternalFile`?
export function isExternalOrCommonJsModule(file: SourceFile): boolean {
    return (file.externalModuleIndicator) !== undefined;
}

/** @internal */
export function isExpressionNode(node: Node): boolean {
    switch (node.kind) {
        case SyntaxKind.SuperKeyword:
        // case SyntaxKind.NullKeyword:
        // case SyntaxKind.TrueKeyword:
        // case SyntaxKind.FalseKeyword:
        // case SyntaxKind.RegularExpressionLiteral:
        case SyntaxKind.ArrayLiteralExpression:
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.CallExpression:
        case SyntaxKind.NewExpression:        
        case SyntaxKind.ParenthesizedExpression:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.InlineClosureExpression:        
        case SyntaxKind.PrefixUnaryExpression:
        case SyntaxKind.PostfixUnaryExpression:
        case SyntaxKind.BinaryExpression:
        case SyntaxKind.ConditionalExpression:
        case SyntaxKind.SpreadElement:        
            return true;        
        // case SyntaxKind.QualifiedName:
        //     while (node.parent.kind === SyntaxKind.QualifiedName) {
        //         node = node.parent;
        //     }
        //     return node.parent.kind === SyntaxKind.TypeQuery || isJSDocLinkLike(node.parent) || isJSDocNameReference(node.parent) || isJSDocMemberName(node.parent) || isJSXTagName(node);
        case SyntaxKind.JSDocMemberName:
            // while (isJSDocMemberName(node.parent)) {
            //     node = node.parent;
            // }
            // return node.parent.kind === SyntaxKind.TypeQuery || isJSDocLinkLike(node.parent) || isJSDocNameReference(node.parent) || isJSDocMemberName(node.parent) || isJSXTagName(node);
        // case SyntaxKind.PrivateIdentifier:
        //     return isBinaryExpression(node.parent) && node.parent.left === node && node.parent.operatorToken.kind === SyntaxKind.InKeyword;
        case SyntaxKind.Identifier:
            // if (isJSDocLinkLike(node.parent) || isJSDocNameReference(node.parent) || isJSDocMemberName(node.parent) || isJSXTagName(node)) {
            //     return true;
            // }
            // falls through

        case SyntaxKind.IntLiteral:
        case SyntaxKind.FloatLiteral:
        case SyntaxKind.StringLiteral:        
            return isInExpressionContext(node);
        default:
            return false;
    }
}


/** @internal */
export function isInExpressionContext(node: Node): boolean {
    const { parent } = node;
    switch (parent.kind) {
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.Parameter:
        case SyntaxKind.PropertyDeclaration:
        // case SyntaxKind.PropertySignature:
        // case SyntaxKind.EnumMember:
        case SyntaxKind.PropertyAssignment:
        // case SyntaxKind.BindingElement:
            return (parent as HasInitializer).initializer === node;
        case SyntaxKind.ExpressionStatement:
        case SyntaxKind.IfStatement:
        case SyntaxKind.DoWhileStatement:
        case SyntaxKind.WhileStatement:
        case SyntaxKind.ReturnStatement:        
        case SyntaxKind.SwitchStatement:
        case SyntaxKind.CaseClause:        
            return (parent as ExpressionStatement).expression === node;
        case SyntaxKind.ForStatement:
            const forStatement = parent as ForStatement;
            return (forStatement.initializer === node && forStatement.initializer.kind !== SyntaxKind.VariableDeclarationList) ||
                forStatement.condition === node ||
                forStatement.incrementor === node;
        case SyntaxKind.ForEachStatement:        
            Debug.fail("TODO Implement me - forEachStatement");
            // const forInOrOfStatement = parent as ForEachStatement;
            // return (forInOrOfStatement.initializer === node && forInOrOfStatement.initializer.kind !== SyntaxKind.VariableDeclarationList) ||
            //     forInOrOfStatement.expression === node;        
        case SyntaxKind.ShorthandPropertyAssignment:
            return (parent as ShorthandPropertyAssignment).objectAssignmentInitializer === node;        
        default:
            return isExpressionNode(parent);
    }
}

/** @internal */
export function isValidTypeOnlyAliasUseSite(useSite: Node): boolean {
    return !!(useSite.flags & NodeFlags.Ambient)                        
        || !(isExpressionNode(useSite) || isShorthandPropertyNameUseSite(useSite));
}

function isShorthandPropertyNameUseSite(useSite: Node) {
    return isIdentifier(useSite) && isShorthandPropertyAssignment(useSite.parent) && useSite.parent.name === useSite;
}

/** @internal */
export function isWriteOnlyAccess(node: Node) {
    return accessKind(node) === AccessKind.Write;
}

/** @internal */
export function isWriteAccess(node: Node) {
    return accessKind(node) !== AccessKind.Read;
}

const enum AccessKind {
    /** Only reads from a variable. */
    Read,
    /** Only writes to a variable without ever reading it. E.g.: `x=1;`. */
    Write,
    /** Reads from and writes to a variable. E.g.: `f(x++);`, `x/=1`. */
    ReadWrite,
}
function accessKind(node: Node): AccessKind {
    const { parent } = node;

    switch (parent?.kind) {
        case SyntaxKind.ParenthesizedExpression:
            return accessKind(parent);
        case SyntaxKind.PostfixUnaryExpression:
        case SyntaxKind.PrefixUnaryExpression:
            const { operator } = parent as PrefixUnaryExpression | PostfixUnaryExpression;
            return operator === SyntaxKind.PlusPlusToken || operator === SyntaxKind.MinusMinusToken ? AccessKind.ReadWrite : AccessKind.Read;
        case SyntaxKind.BinaryExpression:
            const { left, operatorToken } = parent as BinaryExpression;
            return left === node && isAssignmentOperator(operatorToken.kind) ?
                operatorToken.kind === SyntaxKind.EqualsToken ? AccessKind.Write : AccessKind.ReadWrite
                : AccessKind.Read;
        case SyntaxKind.PropertyAccessExpression:
            return (parent as PropertyAccessExpression).name !== node ? AccessKind.Read : accessKind(parent);
        case SyntaxKind.PropertyAssignment: {
            const parentAccess = accessKind(parent.parent);
            // In `({ x: varname }) = { x: 1 }`, the left `x` is a read, the right `x` is a write.
            return node === (parent as PropertyAssignment).name ? reverseAccessKind(parentAccess) : parentAccess;
        }
        case SyntaxKind.ShorthandPropertyAssignment:
            // Assume it's the local variable being accessed, since we don't check public properties for --noUnusedLocals.
            return node === (parent as ShorthandPropertyAssignment).objectAssignmentInitializer ? AccessKind.Read : accessKind(parent.parent);
        case SyntaxKind.ArrayLiteralExpression:
            return accessKind(parent);
        default:
            return AccessKind.Read;
    }
}
function reverseAccessKind(a: AccessKind): AccessKind {
    switch (a) {
        case AccessKind.Read:
            return AccessKind.Write;
        case AccessKind.Write:
            return AccessKind.Read;
        case AccessKind.ReadWrite:
            return AccessKind.ReadWrite;
        default:
            return Debug.assertNever(a);
    }
}

/** @internal */
export function canHaveJSDoc(node: Node): node is HasJSDoc {
    switch (node.kind) {
        case SyntaxKind.InlineClosureExpression:
        case SyntaxKind.BinaryExpression:
        case SyntaxKind.Block:
        case SyntaxKind.BreakStatement:
        case SyntaxKind.CaseClause:
        // case SyntaxKind.CallSignature:
        // case SyntaxKind.ClassDeclaration:
        case SyntaxKind.ClassExpression:        
        case SyntaxKind.ContinueStatement:        
        case SyntaxKind.DoWhileStatement:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.EmptyStatement:
        case SyntaxKind.EndOfFileToken:        
        case SyntaxKind.ExpressionStatement:
        case SyntaxKind.ForEachStatement:        
        case SyntaxKind.ForStatement:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        // case SyntaxKind.FunctionType:        
        case SyntaxKind.Identifier:
        case SyntaxKind.IfStatement:        
        case SyntaxKind.IndexSignature:        
        case SyntaxKind.JSDocFunctionType:
        case SyntaxKind.JSDocSignature:        
        // case SyntaxKind.MethodDeclaration:
        // case SyntaxKind.MethodSignature:        
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.Parameter:
        case SyntaxKind.ParenthesizedExpression:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.PropertyDeclaration:
        //case SyntaxKind.PropertySignature:
        case SyntaxKind.ReturnStatement:
        //case SyntaxKind.SemicolonClassElement:        
        case SyntaxKind.ShorthandPropertyAssignment:
        //case SyntaxKind.SpreadAssignment:
        case SyntaxKind.SwitchStatement:        
        case SyntaxKind.TypeParameter:
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.VariableStatement:
        case SyntaxKind.WhileStatement:        
            return true;
        default:
            return false;
    }
}


/**
 * This function checks multiple locations for JSDoc comments that apply to a host node.
 * At each location, the whole comment may apply to the node, or only a specific tag in
 * the comment. In the first case, location adds the entire {@link JSDoc} object. In the
 * second case, it adds the applicable {@link JSDocTag}.
 *
 * For example, a JSDoc comment before a parameter adds the entire {@link JSDoc}. But a
 * `@param` tag on the parent function only adds the {@link JSDocTag} for the `@param`.
 *
 * ```ts
 * /** JSDoc will be returned for `a` *\/
 * const a = 0
 * /**
 *  * Entire JSDoc will be returned for `b`
 *  * @param c JSDocTag will be returned for `c`
 *  *\/
 * function b(/** JSDoc will be returned for `c` *\/ c) {}
 * ```
 */
export function getJSDocCommentsAndTags(hostNode: Node): readonly (JSDoc | JSDocTag)[];
/** @internal separate signature so that stripInternal can remove noCache from the public API */
// eslint-disable-next-line @typescript-eslint/unified-signatures
export function getJSDocCommentsAndTags(hostNode: Node, noCache?: boolean): readonly (JSDoc | JSDocTag)[];
export function getJSDocCommentsAndTags(hostNode: Node, noCache?: boolean): readonly (JSDoc | JSDocTag)[] {
    console.warn("TODO: Implement me - getJSDocCommentsAndTags");
    return emptyArray;
    // let result: (JSDoc | JSDocTag)[] | undefined;
    // // Pull parameter comments from declaring function as well
    // if (isVariableLike(hostNode) && hasInitializer(hostNode) && hasJSDocNodes(hostNode.initializer!)) {
    //     result = addRange(result, filterOwnedJSDocTags(hostNode, hostNode.initializer.jsDoc!));
    // }

    // let node: Node | undefined = hostNode;
    // while (node && node.parent) {
    //     if (hasJSDocNodes(node)) {
    //         result = addRange(result, filterOwnedJSDocTags(hostNode, node.jsDoc!));
    //     }

    //     if (node.kind === SyntaxKind.Parameter) {
    //         result = addRange(result, (noCache ? getJSDocParameterTagsNoCache : getJSDocParameterTags)(node as ParameterDeclaration));
    //         break;
    //     }
    //     if (node.kind === SyntaxKind.TypeParameter) {
    //         result = addRange(result, (noCache ? getJSDocTypeParameterTagsNoCache : getJSDocTypeParameterTags)(node as TypeParameterDeclaration));
    //         break;
    //     }
    //     node = getNextJSDocCommentLocation(node);
    // }
    // return result || emptyArray;
}


/** @internal */
export function isAssignmentExpression(node: Node, excludeCompoundAssignment: true): node is AssignmentExpression<EqualsToken>;
/** @internal */
export function isAssignmentExpression(node: Node, excludeCompoundAssignment?: false): node is AssignmentExpression<AssignmentOperatorToken>;
/** @internal */
export function isAssignmentExpression(node: Node, excludeCompoundAssignment?: boolean): node is AssignmentExpression<AssignmentOperatorToken> {
    return isBinaryExpression(node)
        && (excludeCompoundAssignment
            ? node.operatorToken.kind === SyntaxKind.EqualsToken
            : isAssignmentOperator(node.operatorToken.kind))
        && isLeftHandSideExpression(node.left);
}


// Gets the nearest enclosing block scope container that has the provided node
// as a descendant, that is not the provided node.
/** @internal */
export function getEnclosingBlockScopeContainer(node: Node): Node {
    return findAncestor(node.parent, current => isBlockScope(current, current.parent))!;
}

/** @internal */
export function isFunctionLikeOrClassStaticBlockDeclaration(node: Node | undefined): node is SignatureDeclaration {
    return !!node && (isFunctionLikeKind(node.kind));
}

/** @internal */
export function isBlockScope(node: Node, parentNode: Node | undefined): boolean {
    switch (node.kind) {
        case SyntaxKind.SourceFile:
        case SyntaxKind.CaseBlock:
        case SyntaxKind.CatchClause:        
        case SyntaxKind.ForStatement:
        case SyntaxKind.ForEachStatement:        
        //case SyntaxKind.MethodDeclaration:        
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.InlineClosureExpression:
        case SyntaxKind.PropertyDeclaration:        
            return true;

        case SyntaxKind.Block:
            // function block is not considered block-scope container
            // see comment in binder.ts: bind(...), case for SyntaxKind.Block
            return !isFunctionLikeOrClassStaticBlockDeclaration(parentNode);
    }

    return false;
}


/** @internal */
export function nodeStartsNewLexicalEnvironment(node: Node): boolean {
    const kind = node.kind;
    return kind === SyntaxKind.FunctionExpression
        || kind === SyntaxKind.FunctionDeclaration
        || kind === SyntaxKind.InlineClosureExpression
        //|| kind === SyntaxKind.MethodDeclaration        
        || kind === SyntaxKind.SourceFile;
}

/** @internal */
export function getAncestor(node: Node | undefined, kind: SyntaxKind): Node | undefined {
    while (node) {
        if (node.kind === kind) {
            return node;
        }
        node = node.parent;
    }
    return undefined;
}

/** @internal */
export const enum AssignmentKind {
    None,
    Definite,
    Compound,
}

/** @internal */
export function getAssignmentTargetKind(node: Node): AssignmentKind {
    const target = getAssignmentTarget(node);
    if (!target) {
        return AssignmentKind.None;
    }
    switch (target.kind) {
        case SyntaxKind.BinaryExpression:
            const binaryOperator = target.operatorToken.kind;
            return binaryOperator === SyntaxKind.EqualsToken || isLogicalOrCoalescingAssignmentOperator(binaryOperator) ?
                AssignmentKind.Definite :
                AssignmentKind.Compound;
        case SyntaxKind.PrefixUnaryExpression:
        case SyntaxKind.PostfixUnaryExpression:
            return AssignmentKind.Compound;
        case SyntaxKind.ForEachStatement:        
            return AssignmentKind.Definite;
    }
}

function isCompoundLikeAssignment(assignment: AssignmentExpression<EqualsToken>): boolean {
    const right = skipParentheses(assignment.right);
    return right.kind === SyntaxKind.BinaryExpression && isShiftOperatorOrHigher((right as BinaryExpression).operatorToken.kind);
}


function isExponentiationOperator(kind: SyntaxKind): kind is ExponentiationOperator {
    return kind === SyntaxKind.AsteriskAsteriskToken;
}

function isMultiplicativeOperator(kind: SyntaxKind): kind is MultiplicativeOperator {
    return kind === SyntaxKind.AsteriskToken
        || kind === SyntaxKind.SlashToken
        || kind === SyntaxKind.PercentToken;
}

function isMultiplicativeOperatorOrHigher(kind: SyntaxKind): kind is MultiplicativeOperatorOrHigher {
    return isExponentiationOperator(kind)
        || isMultiplicativeOperator(kind);
}

function isAdditiveOperator(kind: SyntaxKind): kind is AdditiveOperator {
    return kind === SyntaxKind.PlusToken
        || kind === SyntaxKind.MinusToken;
}

function isAdditiveOperatorOrHigher(kind: SyntaxKind): kind is AdditiveOperatorOrHigher {
    return isAdditiveOperator(kind)
        || isMultiplicativeOperatorOrHigher(kind);
}

function isShiftOperator(kind: SyntaxKind): kind is ShiftOperator {
    return kind === SyntaxKind.LessThanLessThanToken
        || kind === SyntaxKind.GreaterThanGreaterThanToken
        || kind === SyntaxKind.GreaterThanGreaterThanGreaterThanToken;
}

/** @internal */
export function isShiftOperatorOrHigher(kind: SyntaxKind): kind is ShiftOperatorOrHigher {
    return isShiftOperator(kind)
        || isAdditiveOperatorOrHigher(kind);
}

function isRelationalOperator(kind: SyntaxKind): kind is RelationalOperator {
    return kind === SyntaxKind.LessThanToken
        || kind === SyntaxKind.LessThanEqualsToken
        || kind === SyntaxKind.GreaterThanToken
        || kind === SyntaxKind.GreaterThanEqualsToken        
        || kind === SyntaxKind.InKeyword;
}

function isRelationalOperatorOrHigher(kind: SyntaxKind): kind is RelationalOperatorOrHigher {
    return isRelationalOperator(kind)
        || isShiftOperatorOrHigher(kind);
}

function isEqualityOperator(kind: SyntaxKind): kind is EqualityOperator {
    return kind === SyntaxKind.EqualsEqualsToken
        || kind === SyntaxKind.EqualsEqualsEqualsToken
        || kind === SyntaxKind.ExclamationEqualsToken
        || kind === SyntaxKind.ExclamationEqualsEqualsToken;
}

function isEqualityOperatorOrHigher(kind: SyntaxKind): kind is EqualityOperatorOrHigher {
    return isEqualityOperator(kind)
        || isRelationalOperatorOrHigher(kind);
}

function isBitwiseOperator(kind: SyntaxKind): kind is BitwiseOperator {
    return kind === SyntaxKind.AmpersandToken
        || kind === SyntaxKind.BarToken
        || kind === SyntaxKind.CaretToken;
}

function isBitwiseOperatorOrHigher(kind: SyntaxKind): kind is BitwiseOperatorOrHigher {
    return isBitwiseOperator(kind)
        || isEqualityOperatorOrHigher(kind);
}

// NOTE: The version in utilities includes ExclamationToken, which is not a binary operator.
function isLogicalOperator(kind: SyntaxKind): kind is LogicalOperator {
    return kind === SyntaxKind.AmpersandAmpersandToken
        || kind === SyntaxKind.BarBarToken;
}

function isLogicalOperatorOrHigher(kind: SyntaxKind): kind is LogicalOperatorOrHigher {
    return isLogicalOperator(kind)
        || isBitwiseOperatorOrHigher(kind);
}

function isAssignmentOperatorOrHigher(kind: SyntaxKind): kind is AssignmentOperatorOrHigher {
    return isLogicalOperatorOrHigher(kind)
        || isAssignmentOperator(kind);
}

function isBinaryOperator(kind: SyntaxKind): kind is BinaryOperator {
    return isAssignmentOperatorOrHigher(kind)
        || kind === SyntaxKind.CommaToken;
}

export function isBinaryOperatorToken(node: Node): node is BinaryOperatorToken {
    return isBinaryOperator(node.kind);
}


/** @internal */
export function isInCompoundLikeAssignment(node: Node): boolean {
    const target = getAssignmentTarget(node);
    return !!target && isAssignmentExpression(target, /*excludeCompoundAssignment*/ true) && isCompoundLikeAssignment(target);
}

/** @internal */
export function canHaveFlowNode(node: Node): node is HasFlowNode {
    if (node.kind >= SyntaxKind.FirstStatement && node.kind <= SyntaxKind.LastStatement) {
        return true;
    }

    switch (node.kind) {
        case SyntaxKind.Identifier:        
        case SyntaxKind.SuperKeyword:        
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.BindingElement:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.InlineClosureExpression:        
            return true;
        default:
            return false;
    }
}

/** @internal */
export function getObjectFlags(type: Type): ObjectFlags {
    return type.flags & TypeFlags.ObjectFlagsType ? (type as ObjectFlagsType).objectFlags : 0;
}


/**
 * Bypasses immutability and directly sets the `flags` property of a `Node`.
 *
 * @internal
 */
export function setNodeFlags<T extends Node>(node: T, newFlags: NodeFlags): T;
/** @internal */
export function setNodeFlags<T extends Node>(node: T | undefined, newFlags: NodeFlags): T | undefined;
/** @internal */
export function setNodeFlags<T extends Node>(node: T | undefined, newFlags: NodeFlags): T | undefined {
    if (node) {
        (node as Mutable<T>).flags = newFlags;
    }
    return node;
}

/** @internal */
export function canIncludeBindAndCheckDiagnostics(sourceFile: SourceFile, options: CompilerOptions) {
    return true;
    // if (!!sourceFile.checkJsDirective && sourceFile.checkJsDirective.enabled === false) return false;
    // if (
    //     sourceFile.scriptKind === ScriptKind.TS ||
    //     sourceFile.scriptKind === ScriptKind.TSX ||
    //     sourceFile.scriptKind === ScriptKind.External
    // ) return true;

    // const isJs = sourceFile.scriptKind === ScriptKind.JS || sourceFile.scriptKind === ScriptKind.JSX;
    // const isCheckJs = isJs && isCheckJsEnabledForFile(sourceFile, options);
    // const isPlainJs = isPlainJsFile(sourceFile, options.checkJs);

    // // By default, only type-check .ts, .tsx, Deferred, plain JS, checked JS and External
    // // - plain JS: .js files with no // ts-check and checkJs: undefined
    // // - check JS: .js files with either // ts-check or checkJs: true
    // // - external: files that are added by plugins
    // return isPlainJs || isCheckJs || sourceFile.scriptKind === ScriptKind.Deferred;
}

// True if `name` is the name of a declaration node
/** @internal */
export function isDeclarationName(name: Node): boolean {
    return !isSourceFile(name) && !isBindingPattern(name) && isDeclaration(name.parent) && name.parent.name === name;
}

/** @internal */
export function createDiagnosticForFileFromMessageChain(sourceFile: SourceFile, messageChain: DiagnosticMessageChain, relatedInformation?: DiagnosticRelatedInformation[]): DiagnosticWithLocation {
    return {
        file: sourceFile,
        start: 0,
        length: 0,
        code: messageChain.code,
        category: messageChain.category,
        messageText: messageChain.next ? messageChain : messageChain.messageText,
        relatedInformation,
    };
}

/** @internal */
export function createDiagnosticForNodeFromMessageChain(sourceFile: SourceFile, node: Node, messageChain: DiagnosticMessageChain, relatedInformation?: DiagnosticRelatedInformation[]): DiagnosticWithLocation {
    const span = getErrorSpanForNode(sourceFile, node);
    return createFileDiagnosticFromMessageChain(sourceFile, span.start, span.length, messageChain, relatedInformation);
}


/** @internal */
export function createFileDiagnosticFromMessageChain(file: SourceFile, start: number, length: number, messageChain: DiagnosticMessageChain, relatedInformation?: DiagnosticRelatedInformation[]): DiagnosticWithLocation {
    assertDiagnosticLocation(file.text, start, length);
    return {
        file,
        start,
        length,
        code: messageChain.code,
        category: messageChain.category,
        messageText: messageChain.next ? messageChain : messageChain.messageText,
        relatedInformation,
        canonicalHead: messageChain.canonicalHead,
    };
}

// Returns true if this node contains a parse error anywhere underneath it.
/** @internal */
export function containsParseError(node: Node): boolean {
    aggregateChildData(node);
    return (node.flags & NodeFlags.ThisNodeOrAnySubNodesHasError) !== 0;
}

function aggregateChildData(node: Node): void {
    if (!(node.flags & NodeFlags.HasAggregatedChildData)) {
        // A node is considered to contain a parse error if:
        //  a) the parser explicitly marked that it had an error
        //  b) any of it's children reported that it had an error.
        const thisNodeOrAnySubNodesHasError = ((node.flags & NodeFlags.ThisNodeHasError) !== 0) ||
            forEachChild(node, containsParseError);

        // If so, mark ourselves accordingly.
        if (thisNodeOrAnySubNodesHasError) {
            (node as Mutable<Node>).flags |= NodeFlags.ThisNodeOrAnySubNodesHasError;
        }

        // Also mark that we've propagated the child information to this node.  This way we can
        // always consult the bit directly on this node without needing to check its children
        // again.
        (node as Mutable<Node>).flags |= NodeFlags.HasAggregatedChildData;
    }
}

/** @internal */
export const enum FunctionFlags {
    Normal = 0,             // Function is a normal function
    Generator = 1 << 0,     // Function is a generator function or async generator function
    Async = 1 << 1,         // Function is an async function or an async generator function
    Invalid = 1 << 2,       // Function is a signature or overload and does not have a body.
    AsyncGenerator = Async | Generator, // Function is an async generator function
}


/** @internal */
export function getFunctionFlags(node: SignatureDeclaration | undefined) {
    if (!node) {
        return FunctionFlags.Invalid;
    }

    let flags = FunctionFlags.Normal;
    switch (node.kind) {
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        //case SyntaxKind.MethodDeclaration:
            
            // falls through

        case SyntaxKind.InlineClosureExpression:
            // TODO: coroutine async here
            // if (hasSyntacticModifier(node, ModifierFlags.Async)) {
            //     flags |= FunctionFlags.Async;
            // }
            break;
    }

    if (!(node as FunctionLikeDeclaration).body) {
        flags |= FunctionFlags.Invalid;
    }

    return flags;
}

/**
 * Gets the effective return type annotation of a signature. If the node was parsed in a
 * JavaScript file, gets the return type annotation from JSDoc.
 *
 * @internal
 */
export function getEffectiveReturnTypeNode(node: SignatureDeclaration | JSDocSignature): TypeNode | undefined {
    return isJSDocSignature(node) ?
        node.type && node.type.typeExpression && node.type.typeExpression.type :
        node.type;// || (isInJSFile(node) ? getJSDocReturnType(node) : undefined);
}

/** @internal */
export function isFunctionBlock(node: Node): boolean {
    return node && node.kind === SyntaxKind.Block && isFunctionLike(node.parent);
}

/** @internal */
export function getContainingFunction(node: Node): SignatureDeclaration | undefined {
    return findAncestor(node.parent, isFunctionLike);
}

const extensionsToRemove = [Extension.C, Extension.H, Extension.Lpc];
/** @internal */
export function removeFileExtension(path: string): string {
    for (const ext of extensionsToRemove) {
        const extensionless = tryRemoveExtension(path, ext);
        if (extensionless !== undefined) {
            return extensionless;
        }
    }
    return path;
}

/** @internal @knipignore */
export function tryRemoveExtension(path: string, extension: string): string | undefined {
    return fileExtensionIs(path, extension) ? removeExtension(path, extension) : undefined;
}


/** @internal */
export function removeExtension(path: string, extension: string): string {
    return path.substring(0, path.length - extension.length);
}

/** @internal */
export function hasEffectiveModifier(node: Node, flags: ModifierFlags): boolean {
    return !!getSelectedEffectiveModifierFlags(node, flags);
}

/** @internal */
export function getSelectedEffectiveModifierFlags(node: Node, flags: ModifierFlags): ModifierFlags {
    return getEffectiveModifierFlags(node) & flags;
}

/**
 * Gets the effective ModifierFlags for the provided node, including JSDoc modifiers. The modifiers will be cached on the node to improve performance.
 *
 * NOTE: This function may use `parent` pointers.
 *
 * @internal
 */
export function getEffectiveModifierFlags(node: Node): ModifierFlags {
    return getModifierFlagsWorker(node, /*includeJSDoc*/ true);
}

// Return true if the given identifier is classified as an IdentifierName
/** @internal */
export function isIdentifierName(node: Identifier): boolean {
    const parent = node.parent;
    switch (parent.kind) {
        case SyntaxKind.PropertyDeclaration:
        //case SyntaxKind.PropertySignature:
        // case SyntaxKind.MethodDeclaration:
        // case SyntaxKind.MethodSignature:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.PropertyAccessExpression:
            // Name in member declaration or property name in property access
            return (parent as NamedDeclaration | PropertyAccessExpression).name === node;
        // case SyntaxKind.QualifiedName:
        //     // Name on right hand side of dot in a type query or type reference
        //     return (parent as QualifiedName).right === node;
        case SyntaxKind.BindingElement:
        // case SyntaxKind.ImportSpecifier:
            // Property name in binding element or import specifier
            return (parent as BindingElement /*| ImportSpecifier*/).propertyName === node;
        //case SyntaxKind.ExportSpecifier:        
            // Any name in an export specifier or JSX Attribute or Jsx Element
            // return true;
    }
    return false;
}

/** @internal */
export function isKeyword(token: SyntaxKind): token is KeywordSyntaxKind {
    return SyntaxKind.FirstKeyword <= token && token <= SyntaxKind.LastKeyword;
}


/**
 * Gets the token whose text has range [start, end) and
 * position >= start and (position < end or (position === end && token is literal or keyword or identifier))
 *
 * @internal
 */
export function getTouchingPropertyName(sourceFile: SourceFile, position: number): Node {
    return getTouchingToken(sourceFile, position, n => isPropertyNameLiteral(n) || isKeyword(n.kind));// || isPrivateIdentifier(n));
}

/**
 * Returns the token if position is in [start, end).
 * If position === end, returns the preceding token if includeItemAtEndPosition(previousToken) === true
 *
 * @internal
 */
export function getTouchingToken(sourceFile: SourceFile, position: number, includePrecedingTokenAtEndPosition?: (n: Node) => boolean): Node {
    return getTokenAtPositionWorker(sourceFile, position, /*allowPositionInLeadingTrivia*/ false, includePrecedingTokenAtEndPosition, /*includeEndPosition*/ false);
}

/** Get the token whose text contains the position */
function getTokenAtPositionWorker(sourceFile: SourceFile, position: number, allowPositionInLeadingTrivia: boolean, includePrecedingTokenAtEndPosition: ((n: Node) => boolean) | undefined, includeEndPosition: boolean): Node {
    let current: Node = sourceFile;
    let foundToken: Node | undefined;
    outer:
    while (true) {
        // find the child that contains 'position'

        const children = current.getChildren(sourceFile);
        const i = binarySearchKey(children, position, (_, i) => i, (middle, _) => {
            // This last callback is more of a selector than a comparator -
            // `EqualTo` causes the `middle` result to be returned
            // `GreaterThan` causes recursion on the left of the middle
            // `LessThan` causes recursion on the right of the middle

            // Let's say you have 3 nodes, spanning positons
            // pos: 1, end: 3
            // pos: 3, end: 3
            // pos: 3, end: 5
            // and you're looking for the token at positon 3 - all 3 of these nodes are overlapping with position 3.
            // In fact, there's a _good argument_ that node 2 shouldn't even be allowed to exist - depending on if
            // the start or end of the ranges are considered inclusive, it's either wholly subsumed by the first or the last node.
            // Unfortunately, such nodes do exist. :( - See fourslash/completionsImport_tsx.tsx - empty jsx attributes create
            // a zero-length node.
            // What also you may not expect is that which node we return depends on the includePrecedingTokenAtEndPosition flag.
            // Specifically, if includePrecedingTokenAtEndPosition is set, we return the 1-3 node, while if it's unset, we
            // return the 3-5 node. (The zero length node is never correct.) This is because the includePrecedingTokenAtEndPosition
            // flag causes us to return the first node whose end position matches the position and which produces and acceptable token
            // kind. Meanwhile, if includePrecedingTokenAtEndPosition is unset, we look for the first node whose start is <= the
            // position and whose end is greater than the position.

            // There are more sophisticated end tests later, but this one is very fast
            // and allows us to skip a bunch of work
            const end = children[middle].getEnd();
            if (end < position) {
                return Comparison.LessThan;
            }

            const start = allowPositionInLeadingTrivia ? children[middle].getFullStart() : children[middle].getStart(sourceFile, /*includeJsDocComment*/ true);
            if (start > position) {
                return Comparison.GreaterThan;
            }

            // first element whose start position is before the input and whose end position is after or equal to the input
            if (nodeContainsPosition(children[middle], start, end)) {
                if (children[middle - 1]) {
                    // we want the _first_ element that contains the position, so left-recur if the prior node also contains the position
                    if (nodeContainsPosition(children[middle - 1])) {
                        return Comparison.GreaterThan;
                    }
                }
                return Comparison.EqualTo;
            }

            // this complex condition makes us left-recur around a zero-length node when includePrecedingTokenAtEndPosition is set, rather than right-recur on it
            if (includePrecedingTokenAtEndPosition && start === position && children[middle - 1] && children[middle - 1].getEnd() === position && nodeContainsPosition(children[middle - 1])) {
                return Comparison.GreaterThan;
            }
            return Comparison.LessThan;
        });

        if (foundToken) {
            return foundToken;
        }
        if (i >= 0 && children[i]) {
            current = children[i];
            continue outer;
        }

        return current;
    }

    function nodeContainsPosition(node: Node, start?: number, end?: number) {
        end ??= node.getEnd();
        if (end < position) {
            return false;
        }
        start ??= allowPositionInLeadingTrivia ? node.getFullStart() : node.getStart(sourceFile, /*includeJsDocComment*/ true);
        if (start > position) {
            // If this child begins after position, then all subsequent children will as well.
            return false;
        }
        if (position < end || (position === end && (node.kind === SyntaxKind.EndOfFileToken || includeEndPosition))) {
            return true;
        }
        else if (includePrecedingTokenAtEndPosition && end === position) {
            const previousToken = findPrecedingToken(position, sourceFile, node);
            if (previousToken && includePrecedingTokenAtEndPosition(previousToken)) {
                foundToken = previousToken;
                return true;
            }
        }
        return false;
    }
}

function isNonWhitespaceToken(n: Node): boolean {
    return isToken(n);
}

function nodeHasTokens(n: Node, sourceFile: SourceFileLike): boolean {
    // If we have a token or node that has a non-zero width, it must have tokens.
    // Note: getWidth() does not take trivia into account.
    return n.kind === SyntaxKind.EndOfFileToken ? !!(n as EndOfFileToken).jsDoc : n.getWidth(sourceFile) !== 0;
}

/**
 * Finds the rightmost child to the left of `children[exclusiveStartPosition]` which is a non-all-whitespace token or has constituent tokens.
 */
function findRightmostChildNodeWithTokens(children: readonly Node[], exclusiveStartPosition: number, sourceFile: SourceFileLike, parentKind: SyntaxKind): Node | undefined {
    for (let i = exclusiveStartPosition - 1; i >= 0; i--) {
        const child = children[i];

        if (nodeHasTokens(children[i], sourceFile)) {
            return children[i];
        }
    }
}


/**
 * Finds the rightmost token satisfying `token.end <= position`,
 * excluding `JsxText` tokens containing only whitespace.
 *
 * @internal
 */
export function findPrecedingToken(position: number, sourceFile: SourceFileLike, startNode: Node, excludeJsdoc?: boolean): Node | undefined;
/** @internal */
export function findPrecedingToken(position: number, sourceFile: SourceFile, startNode?: Node, excludeJsdoc?: boolean): Node | undefined;
/** @internal */
export function findPrecedingToken(position: number, sourceFile: SourceFileLike, startNode?: Node, excludeJsdoc?: boolean): Node | undefined {
    const result = find((startNode || sourceFile) as Node);    
    return result;

    function find(n: Node): Node | undefined {
        if (isNonWhitespaceToken(n) && n.kind !== SyntaxKind.EndOfFileToken) {
            return n;
        }

        const children = n.getChildren(sourceFile);
        const i = binarySearchKey(children, position, (_, i) => i, (middle, _) => {
            // This last callback is more of a selector than a comparator -
            // `EqualTo` causes the `middle` result to be returned
            // `GreaterThan` causes recursion on the left of the middle
            // `LessThan` causes recursion on the right of the middle
            if (position < children[middle].end) {
                // first element whose end position is greater than the input position
                if (!children[middle - 1] || position >= children[middle - 1].end) {
                    return Comparison.EqualTo;
                }
                return Comparison.GreaterThan;
            }
            return Comparison.LessThan;
        });
        if (i >= 0 && children[i]) {
            const child = children[i];
            // Note that the span of a node's tokens is [node.getStart(...), node.end).
            // Given that `position < child.end` and child has constituent tokens, we distinguish these cases:
            // 1) `position` precedes `child`'s tokens or `child` has no tokens (ie: in a comment or whitespace preceding `child`):
            // we need to find the last token in a previous child.
            // 2) `position` is within the same span: we recurse on `child`.
            if (position < child.end) {
                const start = child.getStart(sourceFile, /*includeJsDoc*/ !excludeJsdoc);
                const lookInPreviousChild = (start >= position) || // cursor in the leading trivia
                    !nodeHasTokens(child, sourceFile);

                if (lookInPreviousChild) {
                    // actual start of the node is past the position - previous token should be at the end of previous child
                    const candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ i, sourceFile, n.kind);
                    if (candidate) {
                        // Ensure we recurse into JSDoc nodes with children.
                        if (!excludeJsdoc && isJSDocCommentContainingNode(candidate) && candidate.getChildren(sourceFile).length) {
                            return find(candidate);
                        }
                        return findRightmostToken(candidate, sourceFile);
                    }
                    return undefined;
                }
                else {
                    // candidate should be in this node
                    return find(child);
                }
            }
        }

        Debug.assert(startNode !== undefined || n.kind === SyntaxKind.SourceFile || n.kind === SyntaxKind.EndOfFileToken || isJSDocCommentContainingNode(n));

        // Here we know that none of child token nodes embrace the position,
        // the only known case is when position is at the end of the file.
        // Try to find the rightmost token in the file without filtering.
        // Namely we are skipping the check: 'position < node.end'
        const candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ children.length, sourceFile, n.kind);
        return candidate && findRightmostToken(candidate, sourceFile);
    }
}

function findRightmostToken(n: Node, sourceFile: SourceFileLike): Node | undefined {
    if (isNonWhitespaceToken(n)) {
        return n;
    }

    const children = n.getChildren(sourceFile);
    if (children.length === 0) {
        return n;
    }

    const candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ children.length, sourceFile, n.kind);
    return candidate && findRightmostToken(candidate, sourceFile);
}

/**
 * True if node is of some JSDoc syntax kind.
 *
 * @internal
 */
export function isJSDocNode(node: Node): boolean {
    return node.kind >= SyntaxKind.FirstJSDocNode && node.kind <= SyntaxKind.LastJSDocNode;
}

/** @internal */
export function getTokenPosOfNode(node: Node, sourceFile?: SourceFileLike, includeJsDoc?: boolean): number {
    // With nodes that have no width (i.e. 'Missing' nodes), we actually *don't*
    // want to skip trivia because this will launch us forward to the next token.
    if (nodeIsMissing(node)) {
        return node.pos;
    }

    if (isJSDocNode(node)) {
        // JsxText cannot actually contain comments, even though the scanner will think it sees comments
        return skipTrivia((sourceFile ?? getSourceFileOfNode(node)).text, node.pos, /*stopAfterLineBreak*/ false, /*stopAtComments*/ true);
    }
    
    if (includeJsDoc && hasJSDocNodes(node)) {
        return getTokenPosOfNode(node.jsDoc![0], sourceFile);
    }

    // For a syntax list, it is possible that one of its children has JSDocComment nodes, while
    // the syntax list itself considers them as normal trivia. Therefore if we simply skip
    // trivia for the list, we may have skipped the JSDocComment as well. So we should process its
    // first child to determine the actual position of its first token.
    if (node.kind === SyntaxKind.SyntaxList) {
        sourceFile ??= getSourceFileOfNode(node);
        const first = firstOrUndefined(getNodeChildren(node, sourceFile));
        if (first) {
            return getTokenPosOfNode(first, sourceFile, includeJsDoc);
        }
    }

    return skipTrivia(
        (sourceFile ?? getSourceFileOfNode(node)).text,
        node.pos,
        /*stopAfterLineBreak*/ false,
        /*stopAtComments*/ false,
        isInJSDoc(node),
    );
}

/** @internal */
export function isInJSDoc(node: Node | undefined): boolean {
    return !!node && !!(node.flags & NodeFlags.JSDoc);
}

/**
 * True if has jsdoc nodes attached to it.
 *
 * @internal
 */
// TODO: GH#19856 Would like to return `node is Node & { jsDoc: JSDoc[] }` but it causes long compile times
export function hasJSDocNodes(node: Node): node is HasJSDoc {
    if (!canHaveJSDoc(node)) return false;

    const { jsDoc } = node as JSDocContainer;
    return !!jsDoc && jsDoc.length > 0;
}

/** @internal */
export function getTextOfIdentifierOrLiteral(node: PropertyNameLiteral): string {
    return node.text; // TODO
    //return isMemberName(node) ? idText(node) : node.text;
}


/**
 * Used by `deprecatedCompat` to patch the object allocator to apply deprecations.
 * @internal
 * @knipignore
 */
export function addObjectAllocatorPatcher(fn: (objectAllocator: ObjectAllocator) => void) {
    objectAllocatorPatchers.push(fn);
    fn(objectAllocator);
}

/** @internal */
export function setObjectAllocator(alloc: ObjectAllocator) {
    Object.assign(objectAllocator, alloc);
    forEach(objectAllocatorPatchers, fn => fn(objectAllocator));
}


const carriageReturnLineFeed = "\r\n";
const lineFeed = "\n";
/** @internal */
export function getNewLineCharacter(options: CompilerOptions | PrinterOptions): string {
    switch (options.newLine) {
        case NewLineKind.CarriageReturnLineFeed:
            return carriageReturnLineFeed;
        case NewLineKind.LineFeed:
        case undefined:
            return lineFeed;
    }
}

/** @internal */
export interface FileSystemEntries {
    readonly files: readonly string[];
    readonly directories: readonly string[];
}

/** @internal */
export const emptyFileSystemEntries: FileSystemEntries = {
    files: emptyArray,
    directories: emptyArray,
};

/** @internal */
export function closeFileWatcher(watcher: FileWatcher) {
    watcher.close();
}


/** @internal */
export function optionsHaveChanges(oldOptions: CompilerOptions, newOptions: CompilerOptions){//, optionDeclarations: readonly CommandLineOption[]) {
    return oldOptions !== newOptions;// && optionDeclarations.some(o => !isJsonEqual(getCompilerOptionValue(oldOptions, o), getCompilerOptionValue(newOptions, o)));
}

/** @internal */
export function packageIdToPackageName({ name, subModuleName }: PackageId): string {
    return subModuleName ? `${name}/${subModuleName}` : name;
}


/** @internal */
export function packageIdToString(packageId: PackageId): string {
    return `${packageIdToPackageName(packageId)}@${packageId.version}${packageId.peerDependencies ?? ""}`;
}

/** @internal */
export function ensureScriptKind(fileName: string, scriptKind: ScriptKind | undefined): ScriptKind {
    // Using scriptKind as a condition handles both:
    // - 'scriptKind' is unspecified and thus it is `undefined`
    // - 'scriptKind' is set and it is `Unknown` (0)
    // If the 'scriptKind' is 'undefined' or 'Unknown' then we attempt
    // to get the ScriptKind from the file name. If it cannot be resolved
    // from the file name then the default 'TS' script kind is returned.
    return scriptKind || ScriptKind.LPC;
}

/** @internal */
export const supportedDeclarationExtensions: readonly Extension[] = [Extension.C, Extension.H, Extension.Lpc];


/**
 * Calls `callback` for each entry in the map, returning the first truthy result.
 * Use `map.forEach` instead for normal iteration.
 *
 * @internal
 */
export function forEachEntry<K, V, U>(map: ReadonlyMap<K, V>, callback: (value: V, key: K) => U | undefined): U | undefined {
    const iterator = map.entries();
    for (const [key, value] of iterator) {
        const result = callback(value, key);
        if (result) {
            return result;
        }
    }
    return undefined;
}

/** @internal */
export function directoryProbablyExists(directoryName: string, host: { directoryExists?: (directoryName: string) => boolean; }): boolean {
    // if host does not support 'directoryExists' assume that directory will exist
    return !host.directoryExists || host.directoryExists(directoryName);
}


/**
 * See comment on `declareModuleMember` in `binder.ts`.
 *
 * @internal
 */
export function getCombinedLocalAndExportSymbolFlags(symbol: Symbol): SymbolFlags {
    return symbol.exportSymbol ? symbol.exportSymbol.flags | symbol.flags : symbol.flags;
}

/** @internal */
export function getDeclarationOfKind<T extends Declaration>(symbol: Symbol, kind: T["kind"]): T | undefined {
    const declarations = symbol.declarations;
    if (declarations) {
        for (const declaration of declarations) {
            if (declaration.kind === kind) {
                return declaration as T;
            }
        }
    }

    return undefined;
}

/** @internal */
export function getCheckFlags(symbol: Symbol): CheckFlags {
    return symbol.flags & SymbolFlags.Transient ? (symbol as TransientSymbol).links.checkFlags : 0;
}

/** @internal */
export function getDeclarationModifierFlagsFromSymbol(s: Symbol, isWrite = false): ModifierFlags {
    if (s.valueDeclaration) {
        const declaration = s.valueDeclaration;
        const flags = getCombinedModifierFlags(declaration);
        return s.parent && s.parent.flags & SymbolFlags.Class ? flags : flags & ~ModifierFlags.AccessibilityModifier;
    }
    if (getCheckFlags(s) & CheckFlags.Synthetic) {
        // NOTE: potentially unchecked cast to TransientSymbol
        const checkFlags = (s as TransientSymbol).links.checkFlags;
        const accessModifier = checkFlags & CheckFlags.ContainsPrivate ? ModifierFlags.Private :
            checkFlags & CheckFlags.ContainsPublic ? ModifierFlags.Public :
            ModifierFlags.Protected;
        const staticModifier = checkFlags & CheckFlags.ContainsStatic ? ModifierFlags.Static : 0;
        return accessModifier | staticModifier;
    }
    if (s.flags & SymbolFlags.Prototype) {
        return ModifierFlags.Public | ModifierFlags.Static;
    }
    return 0;
}

/** @internal */
export function isNumericLiteralName(name: string) {
    // The intent of numeric names is that
    //     - they are names with text in a numeric form, and that
    //     - setting properties/indexing with them is always equivalent to doing so with the numeric literal 'numLit',
    //         acquired by applying the abstract 'ToNumber' operation on the name's text.
    //
    // The subtlety is in the latter portion, as we cannot reliably say that anything that looks like a numeric literal is a numeric name.
    // In fact, it is the case that the text of the name must be equal to 'ToString(numLit)' for this to hold.
    //
    // Consider the property name '"0xF00D"'. When one indexes with '0xF00D', they are actually indexing with the value of 'ToString(0xF00D)'
    // according to the ECMAScript specification, so it is actually as if the user indexed with the string '"61453"'.
    // Thus, the text of all numeric literals equivalent to '61543' such as '0xF00D', '0xf00D', '0170015', etc. are not valid numeric names
    // because their 'ToString' representation is not equal to their original text.
    // This is motivated by ECMA-262 sections 9.3.1, 9.8.1, 11.1.5, and 11.2.1.
    //
    // Here, we test whether 'ToString(ToNumber(name))' is exactly equal to 'name'.
    // The '+' prefix operator is equivalent here to applying the abstract ToNumber operation.
    // Applying the 'toString()' method on a number gives us the abstract ToString operation on a number.
    //
    // Note that this accepts the values 'Infinity', '-Infinity', and 'NaN', and that this is intentional.
    // This is desired behavior, because when indexing with them as numeric entities, you are indexing
    // with the strings '"Infinity"', '"-Infinity"', and '"NaN"' respectively.
    return (+name).toString() === name;
}

/** @internal */
export function isTransientSymbol(symbol: Symbol): symbol is TransientSymbol {
    return (symbol.flags & SymbolFlags.Transient) !== 0;
}

/** @internal */
export function isRightSideOfQualifiedNameOrPropertyAccess(node: Node) {
    // return (node.parent.kind === SyntaxKind.QualifiedName && (node.parent as QualifiedName).right === node) ||
     return   (node.parent.kind === SyntaxKind.PropertyAccessExpression && (node.parent as PropertyAccessExpression).name === node);
   //     (node.parent.kind === SyntaxKind.MetaProperty && (node.parent as MetaProperty).name === node);
}

/** @internal */
export function isRightSideOfAccessExpression(node: Node) {
    return !!node.parent && (isPropertyAccessExpression(node.parent) && node.parent.name === node
        || isElementAccessExpression(node.parent) && node.parent.argumentExpression === node);
}

/** @internal */
export function isRightSideOfQualifiedNameOrPropertyAccessOrJSDocMemberName(node: Node) {
    return isQualifiedName(node.parent) && node.parent.right === node
        || isPropertyAccessExpression(node.parent) && node.parent.name === node
        //|| isJSDocMemberName(node.parent) && node.parent.right === node;
        ;
}

/** @internal */
export function getHostSignatureFromJSDoc(node: Node): SignatureDeclaration | undefined {
    return undefined;
    // TODO
    // const host = getEffectiveJSDocHost(node);
    // if (host) {
    //     return isPropertySignature(host) && host.type && isFunctionLike(host.type) ? host.type :
    //         isFunctionLike(host) ? host : undefined;
    // }
    // return undefined;
}

/** @internal */
export function isInJSFile(node: Node | undefined): boolean {
    return false;
    // return !!node && !!(node.flags & NodeFlags.JavaScriptFile);
}

/** @internal */
export function getFirstIdentifier(node: EntityNameOrEntityNameExpression): Identifier {
    switch (node.kind) {
        case SyntaxKind.Identifier:
            return node;
        case SyntaxKind.QualifiedName:
            do {
                node = node.left;
            }
            while (node.kind !== SyntaxKind.Identifier);
            return node;
        case SyntaxKind.PropertyAccessExpression:
            do {
                node = node.expression;
            }
            while (node.kind !== SyntaxKind.Identifier);
            return node;
    }
}

/** @internal */
export function entityNameToString(name: EntityNameOrEntityNameExpression /*| JSDocMemberName | JsxTagNameExpression | PrivateIdentifier*/): string {
    switch (name.kind) {
        // case SyntaxKind.ThisKeyword:
        //     return "this";
        // case SyntaxKind.PrivateIdentifier:
        case SyntaxKind.Identifier:
            return getFullWidth(name) === 0 ? idText(name) : getTextOfNode(name);
        case SyntaxKind.QualifiedName:
            return entityNameToString(name.left) + "." + entityNameToString(name.right);
        case SyntaxKind.PropertyAccessExpression:
            if (isIdentifier(name.name) /*|| isPrivateIdentifier(name.name)*/) {
                return entityNameToString(name.expression) + "." + entityNameToString(name.name);
            }
            else {
                return Debug.assertNever(name.name);
            }
        // case SyntaxKind.JSDocMemberName:
        //     return entityNameToString(name.left) + "#" + entityNameToString(name.right);
        default:
            return Debug.assertNever(name);
    }
}


/** @internal */
export function getInvokedExpression(node: CallLikeExpression): Expression {
    switch (node.kind) {        
        // case SyntaxKind.BinaryExpression:
        //     return node.right;
        default:
            return node.expression;
    }
}

const indentStrings: string[] = ["", "    "];
/** @internal */
export function getIndentString(level: number) {
    // prepopulate cache
    const singleLevel = indentStrings[1];
    for (let current = indentStrings.length; current <= level; current++) {
        indentStrings.push(indentStrings[current - 1] + singleLevel);
    }
    return indentStrings[level];
}

function getIndentSize() {
    return indentStrings[1].length;
}


/** @internal */
export function createTextWriter(newLine: string): EmitTextWriter {
    // Why var? It avoids TDZ checks in the runtime which can be costly.
    // See: https://github.com/microsoft/TypeScript/issues/52924
    /* eslint-disable no-var */
    var output: string;
    var indent: number;
    var lineStart: boolean;
    var lineCount: number;
    var linePos: number;
    var hasTrailingComment = false;
    /* eslint-enable no-var */

    function updateLineCountAndPosFor(s: string) {
        const lineStartsOfS = computeLineStarts(s);
        if (lineStartsOfS.length > 1) {
            lineCount = lineCount + lineStartsOfS.length - 1;
            linePos = output.length - s.length + last(lineStartsOfS);
            lineStart = (linePos - output.length) === 0;
        }
        else {
            lineStart = false;
        }
    }

    function writeText(s: string) {
        if (s && s.length) {
            if (lineStart) {
                s = getIndentString(indent) + s;
                lineStart = false;
            }
            output += s;
            updateLineCountAndPosFor(s);
        }
    }

    function write(s: string) {
        if (s) hasTrailingComment = false;
        writeText(s);
    }

    function writeComment(s: string) {
        if (s) hasTrailingComment = true;
        writeText(s);
    }

    function reset(): void {
        output = "";
        indent = 0;
        lineStart = true;
        lineCount = 0;
        linePos = 0;
        hasTrailingComment = false;
    }

    function rawWrite(s: string) {
        if (s !== undefined) {
            output += s;
            updateLineCountAndPosFor(s);
            hasTrailingComment = false;
        }
    }

    function writeLiteral(s: string) {
        if (s && s.length) {
            write(s);
        }
    }

    function writeLine(force?: boolean) {
        if (!lineStart || force) {
            output += newLine;
            lineCount++;
            linePos = output.length;
            lineStart = true;
            hasTrailingComment = false;
        }
    }

    reset();

    return {
        write,
        rawWrite,
        writeLiteral,
        writeLine,
        increaseIndent: () => {
            indent++;
        },
        decreaseIndent: () => {
            indent--;
        },
        getIndent: () => indent,
        getTextPos: () => output.length,
        getLine: () => lineCount,
        getColumn: () => lineStart ? indent * getIndentSize() : output.length - linePos,
        getText: () => output,
        isAtStartOfLine: () => lineStart,
        hasTrailingComment: () => hasTrailingComment,
        hasTrailingWhitespace: () => !!output.length && isWhiteSpaceLike(output.charCodeAt(output.length - 1)),
        clear: reset,
        writeKeyword: write,
        writeOperator: write,
        writeParameter: write,
        writeProperty: write,
        writePunctuation: write,
        writeSpace: write,
        writeStringLiteral: write,
        writeSymbol: (s, _) => write(s),
        writeTrailingSemicolon: write,
        writeComment,
    };
}

/** @internal */
export function chainDiagnosticMessages(details: DiagnosticMessageChain | DiagnosticMessageChain[] | undefined, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticMessageChain {
    let text = getLocaleSpecificMessage(message);

    if (some(args)) {
        text = formatStringFromArgs(text, args);
    }
    return {
        messageText: text,
        category: message.category,
        code: message.code,

        next: details === undefined || Array.isArray(details) ? details as [] : [details],
    };
}

export function getEmitScriptTarget(options: CompilerOptions) {
    return ScriptTarget.Latest;
}

// This consists of the first 19 unprintable ASCII characters, canonical escapes, lineSeparator,
// paragraphSeparator, and nextLine. The latter three are just desirable to suppress new lines in
// the language service. These characters should be escaped when printing, and if any characters are added,
// the map below must be updated. Note that this regexp *does not* include the 'delete' character.
// There is no reason for this other than that JSON.stringify does not handle it either.
const doubleQuoteEscapedCharsRegExp = /[\\"\u0000-\u001f\t\v\f\b\r\n\u2028\u2029\u0085]/g;
const singleQuoteEscapedCharsRegExp = /[\\'\u0000-\u001f\t\v\f\b\r\n\u2028\u2029\u0085]/g;
// Template strings preserve simple LF newlines, still encode CRLF (or CR)
const backtickQuoteEscapedCharsRegExp = /\r\n|[\\`\u0000-\u001f\t\v\f\b\r\u2028\u2029\u0085]/g;
const escapedCharsMap = new Map(Object.entries({
    "\t": "\\t",
    "\v": "\\v",
    "\f": "\\f",
    "\b": "\\b",
    "\r": "\\r",
    "\n": "\\n",
    "\\": "\\\\",
    '"': '\\"',
    "'": "\\'",
    "`": "\\`",
    "\u2028": "\\u2028", // lineSeparator
    "\u2029": "\\u2029", // paragraphSeparator
    "\u0085": "\\u0085", // nextLine
    "\r\n": "\\r\\n", // special case for CRLFs in backticks
}));


function encodeUtf16EscapeSequence(charCode: number): string {
    const hexCharCode = charCode.toString(16).toUpperCase();
    const paddedHexCode = ("0000" + hexCharCode).slice(-4);
    return "\\u" + paddedHexCode;
}

function getReplacement(c: string, offset: number, input: string) {
    if (c.charCodeAt(0) === CharacterCodes.nullCharacter) {
        const lookAhead = input.charCodeAt(offset + c.length);
        if (lookAhead >= CharacterCodes._0 && lookAhead <= CharacterCodes._9) {
            // If the null character is followed by digits, print as a hex escape to prevent the result from parsing as an octal (which is forbidden in strict mode)
            return "\\x00";
        }
        // Otherwise, keep printing a literal \0 for the null character
        return "\\0";
    }
    return escapedCharsMap.get(c) || encodeUtf16EscapeSequence(c.charCodeAt(0));
}

/**
 * Based heavily on the abstract 'Quote'/'QuoteJSONString' operation from ECMA-262 (24.3.2.2),
 * but augmented for a few select characters (e.g. lineSeparator, paragraphSeparator, nextLine)
 * Note that this doesn't actually wrap the input in double quotes.
 *
 * @internal
 */
export function escapeString(s: string, quoteChar?: CharacterCodes.doubleQuote | CharacterCodes.singleQuote | CharacterCodes.backtick): string {
    const escapedCharsRegExp = quoteChar === CharacterCodes.backtick ? backtickQuoteEscapedCharsRegExp :
        quoteChar === CharacterCodes.singleQuote ? singleQuoteEscapedCharsRegExp :
        doubleQuoteEscapedCharsRegExp;
    return s.replace(escapedCharsRegExp, getReplacement);
}

/** @internal */
export function isSingleOrDoubleQuote(charCode: number) {
    return charCode === CharacterCodes.singleQuote || charCode === CharacterCodes.doubleQuote;
}

/** @internal */
export function canUsePropertyAccess(name: string, languageVersion: ScriptTarget): boolean {
    if (name.length === 0) {
        return false;
    }
    const firstChar = name.charCodeAt(0);
    return firstChar === CharacterCodes.hash ?
        name.length > 1 && isIdentifierStart(name.charCodeAt(1), languageVersion) :
        isIdentifierStart(firstChar, languageVersion);
}

/**
 * Strip off existed surrounding single quotes, double quotes, or backticks from a given string
 *
 * @return non-quoted string
 *
 * @internal
 */
export function stripQuotes(name: string) {
    const length = name.length;
    if (length >= 2 && name.charCodeAt(0) === name.charCodeAt(length - 1) && isQuoteOrBacktick(name.charCodeAt(0))) {
        return name.substring(1, length - 1);
    }
    return name;
}


function isQuoteOrBacktick(charCode: number) {
    return charCode === CharacterCodes.singleQuote ||
        charCode === CharacterCodes.doubleQuote ||
        charCode === CharacterCodes.backtick;
}
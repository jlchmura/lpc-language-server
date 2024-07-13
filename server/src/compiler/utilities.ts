import * as antlr from "antlr4ng";
import { Signature, Type, Debug, DiagnosticArguments, DiagnosticMessage, DiagnosticRelatedInformation, DiagnosticWithDetachedLocation, DiagnosticWithLocation, Identifier, MapLike, ModifierFlags, Node, NodeFlags, ReadonlyTextRange, some, SourceFile, Symbol, SymbolFlags, SyntaxKind, TextRange, Token, TransformFlags, TypeChecker, TypeFlags, tracing, SignatureFlags, canHaveModifiers, Modifier, skipTrivia, SymbolTable, CallExpression, Declaration, getCombinedNodeFlags, BinaryExpression, AssignmentDeclarationKind, isCallExpression, isBinaryExpression, isIdentifier, Diagnostic, emptyArray, PropertyNameLiteral, DeclarationName, LiteralLikeNode, AssignmentExpression, LogicalOrCoalescingAssignmentOperator, LogicalOperator, Expression, OuterExpressionKinds, OuterExpression, WrappedExpression, PrefixUnaryExpression, PostfixUnaryExpression, ForEachStatement, ShorthandPropertyAssignment, PropertyAssignment, PropertyAccessExpression, ParenthesizedExpression, BinaryOperatorToken, AssertionLevel, DiagnosticCollection, SortedArray, binarySearch, identity, Comparison, DiagnosticMessageChain, compareStringsCaseSensitive, compareValues, insertSorted, flatMapToMutable } from "./_namespaces/lpc";
import { TextSpan } from "../backend/types";

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
    return createTextSpan(node.pos, node.end - node.pos);
    // let errorNode: Node | undefined = node;
    // switch (node.kind) {
    //     case SyntaxKind.SourceFile: {
    //         const pos = skipTrivia(sourceFile.text, 0, /*stopAfterLineBreak*/ false);
    //         if (pos === sourceFile.text.length) {
    //             // file is empty - return span for the beginning of the file
    //             return createTextSpan(0, 0);
    //         }
    //         return getSpanOfTokenAtPosition(sourceFile, pos);
    //     }
    //     // This list is a work in progress. Add missing node kinds to improve their error
    //     // spans.
    //     case SyntaxKind.VariableDeclaration:
    //     case SyntaxKind.BindingElement:
    //     case SyntaxKind.ClassDeclaration:
    //     case SyntaxKind.ClassExpression:
    //     case SyntaxKind.InterfaceDeclaration:
    //     case SyntaxKind.ModuleDeclaration:
    //     case SyntaxKind.EnumDeclaration:
    //     case SyntaxKind.EnumMember:
    //     case SyntaxKind.FunctionDeclaration:
    //     case SyntaxKind.FunctionExpression:
    //     case SyntaxKind.MethodDeclaration:
    //     case SyntaxKind.GetAccessor:
    //     case SyntaxKind.SetAccessor:
    //     case SyntaxKind.TypeAliasDeclaration:
    //     case SyntaxKind.PropertyDeclaration:
    //     case SyntaxKind.PropertySignature:
    //     case SyntaxKind.NamespaceImport:
    //         errorNode = (node as NamedDeclaration).name;
    //         break;
    //     case SyntaxKind.ArrowFunction:
    //         return getErrorSpanForArrowFunction(sourceFile, node as ArrowFunction);
    //     case SyntaxKind.CaseClause:
    //     case SyntaxKind.DefaultClause: {
    //         const start = skipTrivia(sourceFile.text, (node as CaseOrDefaultClause).pos);
    //         const end = (node as CaseOrDefaultClause).statements.length > 0 ? (node as CaseOrDefaultClause).statements[0].pos : (node as CaseOrDefaultClause).end;
    //         return createTextSpanFromBounds(start, end);
    //     }
    //     case SyntaxKind.ReturnStatement:
    //     case SyntaxKind.YieldExpression: {
    //         const pos = skipTrivia(sourceFile.text, (node as ReturnStatement | YieldExpression).pos);
    //         return getSpanOfTokenAtPosition(sourceFile, pos);
    //     }
    //     case SyntaxKind.SatisfiesExpression: {
    //         const pos = skipTrivia(sourceFile.text, (node as SatisfiesExpression).expression.end);
    //         return getSpanOfTokenAtPosition(sourceFile, pos);
    //     }
    //     case SyntaxKind.JSDocSatisfiesTag: {
    //         const pos = skipTrivia(sourceFile.text, (node as JSDocSatisfiesTag).tagName.pos);
    //         return getSpanOfTokenAtPosition(sourceFile, pos);
    //     }
    //     case SyntaxKind.Constructor: {
    //         const constructorDeclaration = node as ConstructorDeclaration;
    //         const start = skipTrivia(sourceFile.text, constructorDeclaration.pos);
    //         const scanner = createScanner(sourceFile.languageVersion, /*skipTrivia*/ true, sourceFile.languageVariant, sourceFile.text, /*onError*/ undefined, start);
    //         let token = scanner.scan();
    //         while (token !== SyntaxKind.ConstructorKeyword && token !== SyntaxKind.EndOfFileToken) {
    //             token = scanner.scan();
    //         }
    //         const end = scanner.getTokenEnd();
    //         return createTextSpanFromBounds(start, end);
    //     }
    // }

    // if (errorNode === undefined) {
    //     // If we don't have a better node, then just set the error on the first token of
    //     // construct.
    //     return node.end - node.pos;// getSpanOfTokenAtPosition(sourceFile, node.pos);
    // }

    // //Debug.assert(!isJSDoc(errorNode));

    // const isMissing = nodeIsMissing(errorNode);
    // const pos = isMissing// || isJsxText(node)
    //     ? errorNode.pos
    //     : skipTrivia(sourceFile.text, errorNode.pos);

    // // These asserts should all be satisfied for a properly constructed `errorNode`.
    // if (isMissing) {
    //     Debug.assert(pos === errorNode.pos, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
    //     Debug.assert(pos === errorNode.end, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
    // }
    // else {
    //     Debug.assert(pos >= errorNode.pos, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
    //     Debug.assert(pos <= errorNode.end, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
    // }

    // return createTextSpanFromBounds(pos, errorNode.end);
}

export function createTextSpan(start: number, length: number): TextSpan {
    if (start < 0) {
        throw new Error("start < 0");
    }
    if (length < 0) {
        throw new Error("length < 0");
    }

    return { start, length };
}

export function createTextSpanFromBounds(start: number, end: number) {
    return createTextSpan(start, end - start);
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


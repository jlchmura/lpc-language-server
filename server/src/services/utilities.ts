import {
    Symbol,
    getTextOfIdentifierOrLiteral,
    IScriptSnapshot,
    PropertyName,
    firstOrUndefined,
    findAncestor,
    isParameter,
    isBindingElement,
    isArrayBindingPattern,
    createTextSpanFromBounds,
    Node,
    SourceFile,
    TextSpan,
    SyntaxKind,
    BinaryExpression,
    ForEachStatement,
    some,
    CallExpression,
    Expression,
    skipOuterExpressions,
    tryCast,
    isPropertyAccessExpression,
    isElementAccessExpression,
    isCallOrNewExpression,
    isIdentifier,
    isFunctionLike,
    isNewExpression,
    NewExpression,
    TypeChecker,
    SymbolDisplayPart,
    Type,
    TypeFormatFlags,
    EmitTextWriter,
    DisplayPartsSymbolWriter,
    defaultMaximumTruncationLength,
    getIndentString,
    isWhiteSpaceLike,
    notImplemented,
    SymbolFlags,
    SymbolDisplayPartKind,
    Declaration,
    stringToToken,
    tokenToString,
    SymbolFormatFlags,
    ModifierFlags,
    getCombinedNodeFlagsAlwaysIncludeJSDoc,
    isDeclaration,
    NodeFlags,
    ScriptElementKindModifier,
    Signature,
    isDeclarationName,
    Debug,
    isEntityName,
    isJSDocTemplateTag,
    isLiteralTypeNode,
    isTypeParameterDeclaration,
    or,
    JSDocTypedefTag,
    LanguageServiceHost,
    ScriptKind,
    ensureScriptKind,
    DocumentSpan,
    SourceMapper,
    DocumentPosition,
    normalizePath,
    ScriptElementKind,
    VariableDeclaration,
    getRootDeclaration,
    PropertyAssignment,
    hasSyntacticModifier,
    getAssignmentDeclarationKind,
    AssignmentDeclarationKind,
    isFunctionExpression,
    assertType,
    isVarConst,
    isLet,
    TextRange,
    contains,
    Identifier,
    BreakOrContinueStatement,
    isBreakOrContinueStatement,
    isLabeledStatement,
    LabeledStatement,
    getNodeId,    
    isStringTextContainingNode,
    LiteralExpression,
    EqualityComparer,
    equateStringsCaseSensitive,
    equateStringsCaseInsensitive,
    isJSDocTag,
    TypeNode,
    isTypeNode,
    isQualifiedName,
    isTypeElement,
    ContextFlags,
    walkUpParenthesizedExpressions,
    EqualityOperator,
    CaseClause,
    CommentRange,
    formatting,
    binarySearchKey,
    Comparison,
    SourceFileLike,
    EndOfFileToken,
    isJSDocCommentContainingNode,
    isKeyword,
    isPropertyNameLiteral,
    isToken,
} from "./_namespaces/lpc.js";

// Matches the beginning of a triple slash directive
const tripleSlashDirectivePrefixRegex = /^\/\/\/\s*</;

/** @internal */
export function getNameFromPropertyName(
    name: PropertyName
): string | undefined {
    return getTextOfIdentifierOrLiteral(name);
    // return name.kind === SyntaxKind.ComputedPropertyName
    //     // treat computed property names where expression is string/numeric literal as just string/numeric literal
    //     ? isStringOrNumericLiteralLike(name.expression) ? name.expression.text : undefined
    //     : isPrivateIdentifier(name) ? idText(name) : getTextOfIdentifierOrLiteral(name);
}

/** @internal */
export function getSnapshotText(snap: IScriptSnapshot): string {
    return snap.getText(0, snap.getLength());
}

// Display-part writer helpers
// #region
/** @internal */
export function isFirstDeclarationOfSymbolParameter(symbol: Symbol) {
    const declaration = symbol.declarations ? firstOrUndefined(symbol.declarations) : undefined;
    return !!findAncestor(declaration, n => isParameter(n) ? true : isBindingElement(n) || isArrayBindingPattern(n) ? false : "quit");
}


/** @internal */
export function createTextSpanFromNode(node: Node, sourceFile?: SourceFile, endNode?: Node): TextSpan {
    return createTextSpanFromBounds(node.getStart(sourceFile), (endNode || node).getEnd());
}

/** @internal */
export function isArrayLiteralOrObjectLiteralDestructuringPattern(node: Node) {
    if (
        node.kind === SyntaxKind.ArrayLiteralExpression ||
        node.kind === SyntaxKind.ObjectLiteralExpression
    ) {
        // [a,b,c] from:
        // [a, b, c] = someExpression;
        if (
            node.parent.kind === SyntaxKind.BinaryExpression &&
            (node.parent as BinaryExpression).left === node &&
            (node.parent as BinaryExpression).operatorToken.kind === SyntaxKind.EqualsToken
        ) {
            return true;
        }

        // [a, b, c] from:
        // for([a, b, c] of expression)
        if (
            node.parent.kind === SyntaxKind.ForEachStatement &&
            some((node.parent as ForEachStatement).initializer, n => n === node)
        ) {
            return true;
        }

        // [a, b, c] of
        // [x, [a, b, c] ] = someExpression
        // or
        // {x, a: {a, b, c} } = someExpression
        if (isArrayLiteralOrObjectLiteralDestructuringPattern(node.parent.kind === SyntaxKind.PropertyAssignment ? node.parent.parent : node.parent)) {
            return true;
        }
    }

    return false;
}

/** @internal */
export interface PossibleProgramFileInfo {
    ProgramFiles?: string[];
}


function isCalleeWorker<T extends CallExpression | NewExpression>(node: Node, pred: (node: Node) => node is T, calleeSelector: (node: T) => Expression, includeElementAccess: boolean, skipPastOuterExpressions: boolean) {
    let target = includeElementAccess ? climbPastPropertyOrElementAccess(node) : climbPastPropertyAccess(node);
    if (skipPastOuterExpressions) {
        target = skipOuterExpressions(target);
    }
    return !!target && !!target.parent && pred(target.parent) && calleeSelector(target.parent) === target;
}

/** @internal */
export function isRightSideOfPropertyAccess(node: Node) {
    return tryCast(node.parent, isPropertyAccessExpression)?.name === node;
}


/** @internal */
export function climbPastPropertyAccess(node: Node) {
    return isRightSideOfPropertyAccess(node) ? node.parent : node;
}

/** @internal */
export function isArgumentExpressionOfElementAccess(node: Node) {
    return tryCast(node.parent, isElementAccessExpression)?.argumentExpression === node;
}

function climbPastPropertyOrElementAccess(node: Node) {
    return isRightSideOfPropertyAccess(node) || isArgumentExpressionOfElementAccess(node) ? node.parent : node;
}


function selectExpressionOfCallOrNewExpressionOrDecorator(node: CallExpression | NewExpression) {
    return node.expression;
}


/** @internal */
export function isCallOrNewExpressionTarget(node: Node, includeElementAccess = false, skipPastOuterExpressions = false): boolean {
    return isCalleeWorker(node, isCallOrNewExpression, selectExpressionOfCallOrNewExpressionOrDecorator, includeElementAccess, skipPastOuterExpressions);
}

/** @internal */
export function isNameOfFunctionDeclaration(node: Node): boolean {
    return isIdentifier(node) && tryCast(node.parent, isFunctionLike)?.name === node;
}

/** @internal */
export function isNewExpressionTarget(node: Node, includeElementAccess = false, skipPastOuterExpressions = false): boolean {
    return isCalleeWorker(node, isNewExpression, selectExpressionOfCallOrNewExpressionOrDecorator, includeElementAccess, skipPastOuterExpressions);
}

const displayPartWriter = getDisplayPartWriter();
function getDisplayPartWriter(): DisplayPartsSymbolWriter {
    const absoluteMaximumLength = defaultMaximumTruncationLength * 10; // A hard cutoff to avoid overloading the messaging channel in worst-case scenarios
    let displayParts: SymbolDisplayPart[];
    let lineStart: boolean;
    let indent: number;
    let length: number;

    resetWriter();
    const unknownWrite = (text: string) => writeKind(text, SymbolDisplayPartKind.text);
    return {
        displayParts: () => {
            const finalText = displayParts.length && displayParts[displayParts.length - 1].text;
            if (length > absoluteMaximumLength && finalText && finalText !== "...") {
                if (!isWhiteSpaceLike(finalText.charCodeAt(finalText.length - 1))) {
                    displayParts.push(displayPart(" ", SymbolDisplayPartKind.space));
                }
                displayParts.push(displayPart("...", SymbolDisplayPartKind.punctuation));
            }
            return displayParts;
        },
        writeKeyword: text => writeKind(text, SymbolDisplayPartKind.keyword),
        writeOperator: text => writeKind(text, SymbolDisplayPartKind.operator),
        writePunctuation: text => writeKind(text, SymbolDisplayPartKind.punctuation),
        writeTrailingSemicolon: text => writeKind(text, SymbolDisplayPartKind.punctuation),
        writeSpace: text => writeKind(text, SymbolDisplayPartKind.space),
        writeStringLiteral: text => writeKind(text, SymbolDisplayPartKind.stringLiteral),
        writeParameter: text => writeKind(text, SymbolDisplayPartKind.parameterName),
        writeProperty: text => writeKind(text, SymbolDisplayPartKind.propertyName),
        writeLiteral: text => writeKind(text, SymbolDisplayPartKind.stringLiteral),
        writeSymbol,
        writeLine,
        write: unknownWrite,
        writeComment: unknownWrite,
        getText: () => "",
        getTextPos: () => 0,
        getColumn: () => 0,
        getLine: () => 0,
        isAtStartOfLine: () => false,
        hasTrailingWhitespace: () => false,
        hasTrailingComment: () => false,
        rawWrite: notImplemented,
        getIndent: () => indent,
        increaseIndent: () => {
            indent++;
        },
        decreaseIndent: () => {
            indent--;
        },
        clear: resetWriter,
    };

    function writeIndent() {
        if (length > absoluteMaximumLength) return;
        if (lineStart) {
            const indentString = getIndentString(indent);
            if (indentString) {
                length += indentString.length;
                displayParts.push(displayPart(indentString, SymbolDisplayPartKind.space));
            }
            lineStart = false;
        }
    }

    function writeKind(text: string, kind: SymbolDisplayPartKind) {
        if (length > absoluteMaximumLength) return;
        writeIndent();
        length += text.length;
        displayParts.push(displayPart(text, kind));
    }

    function writeSymbol(text: string, symbol: Symbol) {
        if (length > absoluteMaximumLength) return;
        writeIndent();
        length += text.length;
        displayParts.push(symbolPart(text, symbol));
    }

    function writeLine() {
        if (length > absoluteMaximumLength) return;
        length += 1;
        displayParts.push(lineBreakPart());
        lineStart = true;
    }

    function resetWriter() {
        displayParts = [];
        lineStart = true;
        indent = 0;
        length = 0;
    }
}

/** @internal */
export function lineBreakPart() {
    return displayPart("\n", SymbolDisplayPartKind.lineBreak);
}

/** @internal */
export function displayPart(text: string, kind: SymbolDisplayPartKind): SymbolDisplayPart {
    return { text, kind: SymbolDisplayPartKind[kind] };
}

/** @internal */
export function symbolToDisplayParts(typeChecker: TypeChecker, symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags: SymbolFormatFlags = SymbolFormatFlags.None): SymbolDisplayPart[] {
    return mapToDisplayParts(writer => {
        typeChecker.writeSymbol(symbol, enclosingDeclaration, meaning, flags | SymbolFormatFlags.UseAliasDefinedOutsideCurrentScope, writer);
    });
}


function symbolPart(text: string, symbol: Symbol) {
    return displayPart(text, displayPartKind(symbol));

    function displayPartKind(symbol: Symbol): SymbolDisplayPartKind {
        const flags = symbol.flags;

        if (flags & SymbolFlags.Variable) {
            return isFirstDeclarationOfSymbolParameter(symbol) ? SymbolDisplayPartKind.parameterName : SymbolDisplayPartKind.localName;
        }
        if (flags & SymbolFlags.Property) return SymbolDisplayPartKind.propertyName;
        if (flags & SymbolFlags.GetAccessor) return SymbolDisplayPartKind.propertyName;
        if (flags & SymbolFlags.SetAccessor) return SymbolDisplayPartKind.propertyName;
        if (flags & SymbolFlags.EnumMember) return SymbolDisplayPartKind.enumMemberName;
        if (flags & SymbolFlags.Function) return SymbolDisplayPartKind.functionName;
        if (flags & SymbolFlags.Class) return SymbolDisplayPartKind.className;
        if (flags & SymbolFlags.Interface) return SymbolDisplayPartKind.interfaceName;
        if (flags & SymbolFlags.Enum) return SymbolDisplayPartKind.enumName;
        if (flags & SymbolFlags.Module) return SymbolDisplayPartKind.moduleName;
        if (flags & SymbolFlags.Method) return SymbolDisplayPartKind.methodName;
        if (flags & SymbolFlags.TypeParameter) return SymbolDisplayPartKind.typeParameterName;
        if (flags & SymbolFlags.TypeAlias) return SymbolDisplayPartKind.aliasName;
        if (flags & SymbolFlags.Alias) return SymbolDisplayPartKind.aliasName;

        return SymbolDisplayPartKind.text;
    }
}

/** @internal */
export function mapToDisplayParts(writeDisplayParts: (writer: DisplayPartsSymbolWriter) => void): SymbolDisplayPart[] {
    try {
        writeDisplayParts(displayPartWriter);
        return displayPartWriter.displayParts();
    }
    finally {
        displayPartWriter.clear();
    }
}

/** @internal */
export function typeToDisplayParts(typechecker: TypeChecker, type: Type, enclosingDeclaration?: Node, flags: TypeFormatFlags = TypeFormatFlags.None): SymbolDisplayPart[] {
    return mapToDisplayParts(writer => {
        typechecker.writeType(type, enclosingDeclaration, flags | TypeFormatFlags.MultilineObjectLiterals | TypeFormatFlags.UseAliasDefinedOutsideCurrentScope, writer);
    });
}

/** @internal */
export function getContainerNode(node: Node): Declaration | undefined {
    // if (isJSDocTypeAlias(node)) {
    //     // This doesn't just apply to the node immediately under the comment, but to everything in its parent's scope.
    //     // node.parent = the JSDoc comment, node.parent.parent = the node having the comment.
    //     // Then we get parent again in the loop.
    //     node = node.parent.parent;
    // }

    while (true) {
        node = node.parent;
        if (!node) {
            return undefined;
        }
        switch (node.kind) {
            case SyntaxKind.SourceFile:
            // case SyntaxKind.MethodDeclaration:
            // case SyntaxKind.MethodSignature:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:         
            // case SyntaxKind.ClassDeclaration:
            // case SyntaxKind.InterfaceDeclaration:            
            // case SyntaxKind.ModuleDeclaration:
                return node as Declaration;
        }
    }
}

/** @internal */
export const enum SemanticMeaning {
    None = 0x0,
    Value = 0x1,
    Type = 0x2,
    Namespace = 0x4,
    All = Value | Type | Namespace,
}

/** @internal */
export function spacePart() {
    return displayPart(" ", SymbolDisplayPartKind.space);
}

/** @internal */
export function keywordPart(kind: SyntaxKind) {
    return displayPart(tokenToString(kind)!, SymbolDisplayPartKind.keyword);
}

/** @internal */
export function punctuationPart(kind: SyntaxKind) {
    return displayPart(tokenToString(kind)!, SymbolDisplayPartKind.punctuation);
}

/** @internal */
export function operatorPart(kind: SyntaxKind) {
    return displayPart(tokenToString(kind)!, SymbolDisplayPartKind.operator);
}

/** @internal */
export function parameterNamePart(text: string) {
    return displayPart(text, SymbolDisplayPartKind.parameterName);
}

/** @internal */
export function propertyNamePart(text: string) {
    return displayPart(text, SymbolDisplayPartKind.propertyName);
}

/** @internal */
export function textOrKeywordPart(text: string) {
    const kind = stringToToken(text);
    return kind === undefined
        ? textPart(text)
        : keywordPart(kind);
}

/** @internal */
export function textPart(text: string) {
    return displayPart(text, SymbolDisplayPartKind.text);
}

/** @internal */
export function isDeprecatedDeclaration(decl: Declaration) {
    return !!(getCombinedNodeFlagsAlwaysIncludeJSDoc(decl) & ModifierFlags.Deprecated);
}

/** @internal */
export function getNodeModifiers(node: Node, excludeFlags = ModifierFlags.None): string {
    const result: string[] = [];
    const flags = isDeclaration(node)
        ? getCombinedNodeFlagsAlwaysIncludeJSDoc(node) & ~excludeFlags
        : ModifierFlags.None;

    if (flags & ModifierFlags.Private) result.push(ScriptElementKindModifier.privateMemberModifier);
    if (flags & ModifierFlags.Protected) result.push(ScriptElementKindModifier.protectedMemberModifier);
    if (flags & ModifierFlags.Public) result.push(ScriptElementKindModifier.publicMemberModifier);
    // if (flags & ModifierFlags.Static || isClassStaticBlockDeclaration(node)) result.push(ScriptElementKindModifier.staticModifier);
    // if (flags & ModifierFlags.Abstract) result.push(ScriptElementKindModifier.abstractModifier);
    if (flags & ModifierFlags.Export) result.push(ScriptElementKindModifier.exportedModifier);
    if (flags & ModifierFlags.Deprecated) result.push(ScriptElementKindModifier.deprecatedModifier);
    if (node.flags & NodeFlags.Ambient) result.push(ScriptElementKindModifier.ambientModifier);
    //if (node.kind === SyntaxKind.ExportAssignment) result.push(ScriptElementKindModifier.exportedModifier);

    return result.length > 0 ? result.join(",") : ScriptElementKindModifier.none;
}

/** @internal */
export function signatureToDisplayParts(typechecker: TypeChecker, signature: Signature, enclosingDeclaration?: Node, flags: TypeFormatFlags = TypeFormatFlags.None): SymbolDisplayPart[] {
    flags |= TypeFormatFlags.UseAliasDefinedOutsideCurrentScope | TypeFormatFlags.MultilineObjectLiterals | TypeFormatFlags.WriteTypeArgumentsOfSignature | TypeFormatFlags.OmitParameterModifiers;
    return mapToDisplayParts(writer => {
        typechecker.writeSignature(signature, enclosingDeclaration, flags, /*kind*/ undefined, writer);
    });
}

/**
 * Adjusts the location used for "find references" and "go to definition" when the cursor was not
 * on a property name.
 *
 * @internal
 */
export function getAdjustedReferenceLocation(node: Node): Node {
    return getAdjustedLocation(node, /*forRename*/ false);
}

function getAdjustedLocation(node: Node, forRename: boolean): Node {
    const { parent } = node;
    console.warn("TODO - getAdjustedLocation");
    // /**/<modifier> [|name|] ...
    // /**/<modifier> <class|interface|type|enum|module|namespace|function|get|set> [|name|] ...
    // /**/<class|interface|type|enum|module|namespace|function|get|set> [|name|] ...
    // /**/import [|name|] = ...
    //
    // NOTE: If the node is a modifier, we don't adjust its location if it is the `default` modifier as that is handled
    // specially by `getSymbolAtLocation`.
    // if (
    //     isModifier(node) && (forRename || node.kind !== SyntaxKind.DefaultKeyword) ? canHaveModifiers(parent) && contains(parent.modifiers, node) :
    //         node.kind === SyntaxKind.ClassKeyword ? isClassDeclaration(parent) || isClassExpression(node) :
    //         node.kind === SyntaxKind.FunctionKeyword ? isFunctionDeclaration(parent) || isFunctionExpression(node) :
    //         node.kind === SyntaxKind.InterfaceKeyword ? isInterfaceDeclaration(parent) :
    //         node.kind === SyntaxKind.EnumKeyword ? isEnumDeclaration(parent) :
    //         node.kind === SyntaxKind.TypeKeyword ? isTypeAliasDeclaration(parent) :
    //         node.kind === SyntaxKind.NamespaceKeyword || node.kind === SyntaxKind.ModuleKeyword ? isModuleDeclaration(parent) :
    //         node.kind === SyntaxKind.ImportKeyword ? isImportEqualsDeclaration(parent) :
    //         node.kind === SyntaxKind.GetKeyword ? isGetAccessorDeclaration(parent) :
    //         node.kind === SyntaxKind.SetKeyword && isSetAccessorDeclaration(parent)
    // ) {
    //     const location = getAdjustedLocationForDeclaration(parent, forRename);
    //     if (location) {
    //         return location;
    //     }
    // }
    // // /**/<var|let|const> [|name|] ...
    // if (
    //     (node.kind === SyntaxKind.VarKeyword || node.kind === SyntaxKind.ConstKeyword || node.kind === SyntaxKind.LetKeyword) &&
    //     isVariableDeclarationList(parent) && parent.declarations.length === 1
    // ) {
    //     const decl = parent.declarations[0];
    //     if (isIdentifier(decl.name)) {
    //         return decl.name;
    //     }
    // }
    // if (node.kind === SyntaxKind.TypeKeyword) {
    //     // import /**/type [|name|] from ...;
    //     // import /**/type { [|name|] } from ...;
    //     // import /**/type { propertyName as [|name|] } from ...;
    //     // import /**/type ... from "[|module|]";
    //     if (isImportClause(parent) && parent.isTypeOnly) {
    //         const location = getAdjustedLocationForImportDeclaration(parent.parent, forRename);
    //         if (location) {
    //             return location;
    //         }
    //     }
    //     // export /**/type { [|name|] } from ...;
    //     // export /**/type { propertyName as [|name|] } from ...;
    //     // export /**/type * from "[|module|]";
    //     // export /**/type * as ... from "[|module|]";
    //     if (isExportDeclaration(parent) && parent.isTypeOnly) {
    //         const location = getAdjustedLocationForExportDeclaration(parent, forRename);
    //         if (location) {
    //             return location;
    //         }
    //     }
    // }
    // // import { propertyName /**/as [|name|] } ...
    // // import * /**/as [|name|] ...
    // // export { propertyName /**/as [|name|] } ...
    // // export * /**/as [|name|] ...
    // if (node.kind === SyntaxKind.AsKeyword) {
    //     if (
    //         isImportSpecifier(parent) && parent.propertyName ||
    //         isExportSpecifier(parent) && parent.propertyName ||
    //         isNamespaceImport(parent) ||
    //         isNamespaceExport(parent)
    //     ) {
    //         return parent.name;
    //     }
    //     if (isExportDeclaration(parent) && parent.exportClause && isNamespaceExport(parent.exportClause)) {
    //         return parent.exportClause.name;
    //     }
    // }
    // // /**/import [|name|] from ...;
    // // /**/import { [|name|] } from ...;
    // // /**/import { propertyName as [|name|] } from ...;
    // // /**/import ... from "[|module|]";
    // // /**/import "[|module|]";
    // if (node.kind === SyntaxKind.ImportKeyword && isImportDeclaration(parent)) {
    //     const location = getAdjustedLocationForImportDeclaration(parent, forRename);
    //     if (location) {
    //         return location;
    //     }
    // }
    // if (node.kind === SyntaxKind.ExportKeyword) {
    //     // /**/export { [|name|] } ...;
    //     // /**/export { propertyName as [|name|] } ...;
    //     // /**/export * from "[|module|]";
    //     // /**/export * as ... from "[|module|]";
    //     if (isExportDeclaration(parent)) {
    //         const location = getAdjustedLocationForExportDeclaration(parent, forRename);
    //         if (location) {
    //             return location;
    //         }
    //     }
    //     // NOTE: We don't adjust the location of the `default` keyword as that is handled specially by `getSymbolAtLocation`.
    //     // /**/export default [|name|];
    //     // /**/export = [|name|];
    //     if (isExportAssignment(parent)) {
    //         return skipOuterExpressions(parent.expression);
    //     }
    // }
    // // import name = /**/require("[|module|]");
    // if (node.kind === SyntaxKind.RequireKeyword && isExternalModuleReference(parent)) {
    //     return parent.expression;
    // }
    // // import ... /**/from "[|module|]";
    // // export ... /**/from "[|module|]";
    // if (node.kind === SyntaxKind.FromKeyword && (isImportDeclaration(parent) || isExportDeclaration(parent)) && parent.moduleSpecifier) {
    //     return parent.moduleSpecifier;
    // }
    // // class ... /**/extends [|name|] ...
    // // class ... /**/implements [|name|] ...
    // // class ... /**/implements name1, name2 ...
    // // interface ... /**/extends [|name|] ...
    // // interface ... /**/extends name1, name2 ...
    // if ((node.kind === SyntaxKind.ExtendsKeyword || node.kind === SyntaxKind.ImplementsKeyword) && isHeritageClause(parent) && parent.token === node.kind) {
    //     const location = getAdjustedLocationForHeritageClause(parent);
    //     if (location) {
    //         return location;
    //     }
    // }
    // if (node.kind === SyntaxKind.ExtendsKeyword) {
    //     // ... <T /**/extends [|U|]> ...
    //     if (isTypeParameterDeclaration(parent) && parent.constraint && isTypeReferenceNode(parent.constraint)) {
    //         return parent.constraint.typeName;
    //     }
    //     // ... T /**/extends [|U|] ? ...
    //     if (isConditionalTypeNode(parent) && isTypeReferenceNode(parent.extendsType)) {
    //         return parent.extendsType.typeName;
    //     }
    // }
    // // ... T extends /**/infer [|U|] ? ...
    // if (node.kind === SyntaxKind.InferKeyword && isInferTypeNode(parent)) {
    //     return parent.typeParameter.name;
    // }
    // // { [ [|K|] /**/in keyof T]: ... }
    // if (node.kind === SyntaxKind.InKeyword && isTypeParameterDeclaration(parent) && isMappedTypeNode(parent.parent)) {
    //     return parent.name;
    // }
    // // /**/keyof [|T|]
    // if (
    //     node.kind === SyntaxKind.KeyOfKeyword && isTypeOperatorNode(parent) && parent.operator === SyntaxKind.KeyOfKeyword &&
    //     isTypeReferenceNode(parent.type)
    // ) {
    //     return parent.type.typeName;
    // }
    // // /**/readonly [|name|][]
    // if (
    //     node.kind === SyntaxKind.ReadonlyKeyword && isTypeOperatorNode(parent) && parent.operator === SyntaxKind.ReadonlyKeyword &&
    //     isArrayTypeNode(parent.type) && isTypeReferenceNode(parent.type.elementType)
    // ) {
    //     return parent.type.elementType.typeName;
    // }
    // if (!forRename) {
    //     // /**/new [|name|]
    //     // /**/void [|name|]
    //     // /**/void obj.[|name|]
    //     // /**/typeof [|name|]
    //     // /**/typeof obj.[|name|]
    //     // /**/await [|name|]
    //     // /**/await obj.[|name|]
    //     // /**/yield [|name|]
    //     // /**/yield obj.[|name|]
    //     // /**/delete obj.[|name|]
    //     if (
    //         node.kind === SyntaxKind.NewKeyword && isNewExpression(parent) ||
    //         node.kind === SyntaxKind.VoidKeyword && isVoidExpression(parent) ||
    //         node.kind === SyntaxKind.TypeOfKeyword && isTypeOfExpression(parent) ||
    //         node.kind === SyntaxKind.AwaitKeyword && isAwaitExpression(parent) ||
    //         node.kind === SyntaxKind.YieldKeyword && isYieldExpression(parent) ||
    //         node.kind === SyntaxKind.DeleteKeyword && isDeleteExpression(parent)
    //     ) {
    //         if (parent.expression) {
    //             return skipOuterExpressions(parent.expression);
    //         }
    //     }
    //     // left /**/in [|name|]
    //     // left /**/instanceof [|name|]
    //     if ((node.kind === SyntaxKind.InKeyword || node.kind === SyntaxKind.InstanceOfKeyword) && isBinaryExpression(parent) && parent.operatorToken === node) {
    //         return skipOuterExpressions(parent.right);
    //     }
    //     // left /**/as [|name|]
    //     if (node.kind === SyntaxKind.AsKeyword && isAsExpression(parent) && isTypeReferenceNode(parent.type)) {
    //         return parent.type.typeName;
    //     }
    //     // for (... /**/in [|name|])
    //     // for (... /**/of [|name|])
    //     if (
    //         node.kind === SyntaxKind.InKeyword && isForInStatement(parent) ||
    //         node.kind === SyntaxKind.OfKeyword && isForOfStatement(parent)
    //     ) {
    //         return skipOuterExpressions(parent.expression);
    //     }
    // }
    return node;
}

/** @internal */
export function getMeaningFromDeclaration(node: Node): SemanticMeaning {
    switch (node.kind) {
        case SyntaxKind.VariableDeclaration:
            return SemanticMeaning.Value;// isInJSFile(node) && getJSDocEnumTag(node) ? SemanticMeaning.All : SemanticMeaning.Value;

        case SyntaxKind.Parameter:
        case SyntaxKind.BindingElement:
        case SyntaxKind.PropertyDeclaration:
        // case SyntaxKind.PropertySignature:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.ShorthandPropertyAssignment:
        // case SyntaxKind.MethodDeclaration:
        // case SyntaxKind.MethodSignature:        
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.InlineClosureExpression:
        case SyntaxKind.CatchClause:        
            return SemanticMeaning.Value;

        case SyntaxKind.TypeParameter:        
        case SyntaxKind.TypeLiteral:
            return SemanticMeaning.Type;

        case SyntaxKind.JSDocTypedefTag:
            // If it has no name node, it shares the name with the value declaration below it.
            return (node as JSDocTypedefTag).name === undefined ? SemanticMeaning.Value | SemanticMeaning.Type : SemanticMeaning.Type;

        // case SyntaxKind.EnumMember:
        // case SyntaxKind.ClassDeclaration:
        //     return SemanticMeaning.Value | SemanticMeaning.Type;

        // case SyntaxKind.ModuleDeclaration:
        //     if (isAmbientModule(node as ModuleDeclaration)) {
        //         return SemanticMeaning.Namespace | SemanticMeaning.Value;
        //     }
        //     else if (getModuleInstanceState(node as ModuleDeclaration) === ModuleInstanceState.Instantiated) {
        //         return SemanticMeaning.Namespace | SemanticMeaning.Value;
        //     }
        //     else {
        //         return SemanticMeaning.Namespace;
        //     }

        // case SyntaxKind.EnumDeclaration:
        // case SyntaxKind.NamedImports:
        // case SyntaxKind.ImportSpecifier:
        // case SyntaxKind.ImportEqualsDeclaration:
        // case SyntaxKind.ImportDeclaration:
        // case SyntaxKind.ExportAssignment:
        // case SyntaxKind.ExportDeclaration:
            // return SemanticMeaning.All;

        // An external module can be a Value
        case SyntaxKind.SourceFile:
            return SemanticMeaning.Namespace | SemanticMeaning.Value;
    }

    return SemanticMeaning.All;
}

/** @internal */
export function getMeaningFromLocation(node: Node): SemanticMeaning {
    node = getAdjustedReferenceLocation(node);
    const parent = node.parent;
    if (node.kind === SyntaxKind.SourceFile) {
        return SemanticMeaning.Value;
    }
    // else if (
    //     isExportAssignment(parent)
    //     || isExportSpecifier(parent)
    //     || isExternalModuleReference(parent)
    //     || isImportSpecifier(parent)
    //     || isImportClause(parent)
    //     || isImportEqualsDeclaration(parent) && node === parent.name
    // ) {
    //     return SemanticMeaning.All;
    // }
    // else if (isInRightSideOfInternalImportEqualsDeclaration(node)) {
    //     return getMeaningFromRightHandSideOfImportEquals(node as Identifier);
    // }
    else if (isDeclarationName(node)) {
        return getMeaningFromDeclaration(parent);
    }
    // else if (isEntityName(node) && findAncestor(node, or(isJSDocNameReference, isJSDocLinkLike, isJSDocMemberName))) {
    //     return SemanticMeaning.All;
    // }
    // else if (isTypeReference(node)) {
    //     return SemanticMeaning.Type;
    // }
    // else if (isNamespaceReference(node)) {
    //     return SemanticMeaning.Namespace;
    // }
    else if (isTypeParameterDeclaration(parent)) {
        Debug.assert(isJSDocTemplateTag(parent.parent)); // Else would be handled by isDeclarationName
        return SemanticMeaning.Type;
    }
    else if (isLiteralTypeNode(parent)) {
        // This might be T["name"], which is actually referencing a property and not a type. So allow both meanings.
        return SemanticMeaning.Type | SemanticMeaning.Value;
    }
    else {
        return SemanticMeaning.Value;
    }
}

/** @internal */
export function getScriptKind(fileName: string, host: LanguageServiceHost): ScriptKind {
    // First check to see if the script kind was specified by the host. Chances are the host
    // may override the default script kind for the file extension.
    return ensureScriptKind(fileName, host.getScriptKind && host.getScriptKind(fileName));
}

/** @internal */
export function getMappedDocumentSpan(documentSpan: DocumentSpan, sourceMapper: SourceMapper, fileExists?: (path: string) => boolean): DocumentSpan | undefined {
    const { fileName, textSpan } = documentSpan;
    const newPosition = getMappedLocation({ fileName, pos: textSpan.start }, sourceMapper, fileExists);
    if (!newPosition) return undefined;
    const newEndPosition = getMappedLocation({ fileName, pos: textSpan.start + textSpan.length }, sourceMapper, fileExists);
    const newLength = newEndPosition
        ? newEndPosition.pos - newPosition.pos
        : textSpan.length; // This shouldn't happen
    return {
        fileName: newPosition.fileName,
        textSpan: {
            start: newPosition.pos,
            length: newLength,
        },
        originalFileName: documentSpan.fileName,
        originalTextSpan: documentSpan.textSpan,
        contextSpan: getMappedContextSpan(documentSpan, sourceMapper, fileExists),
        originalContextSpan: documentSpan.contextSpan,
    };
}

/** @internal */
export function getMappedLocation(location: DocumentPosition, sourceMapper: SourceMapper, fileExists: ((path: string) => boolean) | undefined): DocumentPosition | undefined {
    const mapsTo = sourceMapper.tryGetSourcePosition(location);
    return mapsTo && (!fileExists || fileExists(normalizePath(mapsTo.fileName)) ? mapsTo : undefined);
}

/** @internal */
export function getMappedContextSpan(documentSpan: DocumentSpan, sourceMapper: SourceMapper, fileExists?: (path: string) => boolean): TextSpan | undefined {
    const contextSpanStart = documentSpan.contextSpan && getMappedLocation(
        { fileName: documentSpan.fileName, pos: documentSpan.contextSpan.start },
        sourceMapper,
        fileExists,
    );
    const contextSpanEnd = documentSpan.contextSpan && getMappedLocation(
        { fileName: documentSpan.fileName, pos: documentSpan.contextSpan.start + documentSpan.contextSpan.length },
        sourceMapper,
        fileExists,
    );
    return contextSpanStart && contextSpanEnd ?
        { start: contextSpanStart.pos, length: contextSpanEnd.pos - contextSpanStart.pos } :
        undefined;
}

/** @internal */
export function getNodeKind(node: Node): ScriptElementKind {
    switch (node.kind) {
        case SyntaxKind.SourceFile:
            return ScriptElementKind.scriptElement;//isExternalModule(node as SourceFile) ? ScriptElementKind.moduleElement : ScriptElementKind.scriptElement;
        // case SyntaxKind.ModuleDeclaration:
        //     return ScriptElementKind.moduleElement;
        // case SyntaxKind.ClassDeclaration:
        case SyntaxKind.ClassExpression:
            return ScriptElementKind.classElement;
        // case SyntaxKind.InterfaceDeclaration:
        //     return ScriptElementKind.interfaceElement;
        // case SyntaxKind.TypeAliasDeclaration:
        case SyntaxKind.JSDocCallbackTag:
        case SyntaxKind.JSDocTypedefTag:
            return ScriptElementKind.typeElement;
        // case SyntaxKind.EnumDeclaration:
        //     return ScriptElementKind.enumElement;
        case SyntaxKind.VariableDeclaration:
            return getKindOfVariableDeclaration(node as VariableDeclaration);
        case SyntaxKind.BindingElement:
            return getKindOfVariableDeclaration(getRootDeclaration(node) as VariableDeclaration);
        // case SyntaxKind.ArrowFunction:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
            return ScriptElementKind.functionElement;
        // case SyntaxKind.GetAccessor:
        //     return ScriptElementKind.memberGetAccessorElement;
        // case SyntaxKind.SetAccessor:
        //     return ScriptElementKind.memberSetAccessorElement;
        // case SyntaxKind.MethodDeclaration:
        // case SyntaxKind.MethodSignature:
        //     return ScriptElementKind.memberFunctionElement;
        case SyntaxKind.PropertyAssignment:
            const { initializer } = node as PropertyAssignment;
            return isFunctionLike(initializer) ? ScriptElementKind.memberFunctionElement : ScriptElementKind.memberVariableElement;
        case SyntaxKind.PropertyDeclaration:
        // case SyntaxKind.PropertySignature:
        case SyntaxKind.ShorthandPropertyAssignment:
        // case SyntaxKind.SpreadAssignment:
            return ScriptElementKind.memberVariableElement;
        case SyntaxKind.IndexSignature:
            return ScriptElementKind.indexSignatureElement;
        // case SyntaxKind.ConstructSignature:
        //     return ScriptElementKind.constructSignatureElement;
        // case SyntaxKind.CallSignature:
        //     return ScriptElementKind.callSignatureElement;
        // case SyntaxKind.Constructor:
        // case SyntaxKind.ClassStaticBlockDeclaration:
        //     return ScriptElementKind.constructorImplementationElement;
        case SyntaxKind.TypeParameter:
            return ScriptElementKind.typeParameterElement;
        // case SyntaxKind.EnumMember:
        //     return ScriptElementKind.enumMemberElement;
        case SyntaxKind.Parameter:
            return hasSyntacticModifier(node, ModifierFlags.ParameterPropertyModifier) ? ScriptElementKind.memberVariableElement : ScriptElementKind.parameterElement;
        case SyntaxKind.ExportSpecifier:
        // case SyntaxKind.ImportEqualsDeclaration:
        // case SyntaxKind.ImportSpecifier:
        // case SyntaxKind.NamespaceImport:
        // case SyntaxKind.NamespaceExport:
            return ScriptElementKind.alias;
        case SyntaxKind.BinaryExpression:
            const kind = getAssignmentDeclarationKind(node as BinaryExpression);
            const { right } = node as BinaryExpression;
            switch (kind) {
                case AssignmentDeclarationKind.ObjectDefinePropertyValue:
                case AssignmentDeclarationKind.ObjectDefinePropertyExports:
                case AssignmentDeclarationKind.ObjectDefinePrototypeProperty:
                case AssignmentDeclarationKind.None:
                    return ScriptElementKind.unknown;
                case AssignmentDeclarationKind.ExportsProperty:
                case AssignmentDeclarationKind.ModuleExports:
                    const rightKind = getNodeKind(right);
                    return rightKind === ScriptElementKind.unknown ? ScriptElementKind.constElement : rightKind;
                case AssignmentDeclarationKind.PrototypeProperty:
                    return isFunctionExpression(right) ? ScriptElementKind.memberFunctionElement : ScriptElementKind.memberVariableElement;
                case AssignmentDeclarationKind.ThisProperty:
                    return ScriptElementKind.memberVariableElement; // property
                case AssignmentDeclarationKind.Property:
                    // static method / property
                    return isFunctionExpression(right) ? ScriptElementKind.memberFunctionElement : ScriptElementKind.memberVariableElement;
                case AssignmentDeclarationKind.Prototype:
                    return ScriptElementKind.localClassElement;
                default: {
                    assertType<never>(kind);
                    return ScriptElementKind.unknown;
                }
            }
        case SyntaxKind.Identifier:
            return ScriptElementKind.unknown;//isImportClause(node.parent) ? ScriptElementKind.alias : ScriptElementKind.unknown;
        // case SyntaxKind.ExportAssignment:
        //     const scriptKind = getNodeKind((node as ExportAssignment).expression);
        //     // If the expression didn't come back with something (like it does for an identifiers)
        //     return scriptKind === ScriptElementKind.unknown ? ScriptElementKind.constElement : scriptKind;
        default:
            return ScriptElementKind.unknown;
    }

    function getKindOfVariableDeclaration(v: VariableDeclaration): ScriptElementKind {
        return isVarConst(v)
            ? ScriptElementKind.constElement
            : isLet(v)
            ? ScriptElementKind.letElement
            : ScriptElementKind.variableElement;
    }
}

/** @internal */
export function createTextSpanFromRange(range: TextRange): TextSpan {
    return createTextSpanFromBounds(range.pos, range.end);
}

/** @internal */
export const typeKeywords: readonly SyntaxKind[] = [
    SyntaxKind.AnyKeyword,
    // SyntaxKind.AssertsKeyword,
    // SyntaxKind.BigIntKeyword,
    // SyntaxKind.BooleanKeyword,
    SyntaxKind.FalseKeyword,
    // SyntaxKind.InferKeyword,
    // SyntaxKind.KeyOfKeyword,
    // SyntaxKind.NeverKeyword,
    SyntaxKind.NullKeyword,
    // SyntaxKind.NumberKeyword,
    SyntaxKind.IntKeyword,
    SyntaxKind.FloatKeyword,
    SyntaxKind.MappingKeyword,
    SyntaxKind.StructKeyword,
    SyntaxKind.MixedKeyword,
    SyntaxKind.ObjectKeyword,
    // SyntaxKind.ReadonlyKeyword,
    SyntaxKind.StringKeyword,
    // SyntaxKind.SymbolKeyword,
    // SyntaxKind.TypeOfKeyword,
    SyntaxKind.TrueKeyword,
    SyntaxKind.VoidKeyword,
    SyntaxKind.UndefinedKeyword,
    // SyntaxKind.UniqueKeyword,
    SyntaxKind.UnknownKeyword,
];

/** @internal */
export function isTypeKeyword(kind: SyntaxKind): boolean {
    return contains(typeKeywords, kind);
}

/** @internal */
export function isJumpStatementTarget(node: Node): node is Identifier & { parent: BreakOrContinueStatement; } {
    return isIdentifier(node) && tryCast(node.parent, isBreakOrContinueStatement)?.label === node;
}

/** @internal */
export function getTargetLabel(referenceNode: Node, labelName: string): Identifier | undefined {
    while (referenceNode) {
        console.log("TODO - getTargetLabel");
        if (referenceNode.kind === SyntaxKind.LabeledStatement && (referenceNode as LabeledStatement).label.text === labelName) {
            return (referenceNode as LabeledStatement).label;
        }
        referenceNode = referenceNode.parent;
    }
    return undefined;
}

/** @internal */
export function isLabelOfLabeledStatement(node: Node): node is Identifier {
    return isIdentifier(node) && tryCast(node.parent, isLabeledStatement)?.label === node;
}


/**
 * Returns `true` the first time it encounters a node and `false` afterwards.
 *
 * @internal
 */
export type NodeSeenTracker<T = Node> = (node: T) => boolean;
/** @internal */
export function nodeSeenTracker<T extends Node>(): NodeSeenTracker<T> {
    const seen: true[] = [];
    return node => {
        const id = getNodeId(node);
        return !seen[id] && (seen[id] = true);
    };
}

/** @internal */
export function isInString(sourceFile: SourceFile, position: number, previousToken = findPrecedingToken(position, sourceFile)): boolean {
    if (previousToken && isStringTextContainingNode(previousToken)) {
        const start = previousToken.getStart(sourceFile);
        const end = previousToken.getEnd();

        // To be "in" one of these literals, the position has to be:
        //   1. entirely within the token text.
        //   2. at the end position of an unterminated token.
        //   3. at the end of a regular expression (due to trailing flags like '/foo/g').
        if (start < position && position < end) {
            return true;
        }

        if (position === end) {
            return !!(previousToken as LiteralExpression).isUnterminated;
        }
    }

    return false;
}


/** @internal */
export function textSpansEqual(a: TextSpan | undefined, b: TextSpan | undefined): boolean {
    return !!a && !!b && a.start === b.start && a.length === b.length;
}
/** @internal */
export function documentSpansEqual(a: DocumentSpan, b: DocumentSpan, useCaseSensitiveFileNames: boolean): boolean {
    return (useCaseSensitiveFileNames ? equateStringsCaseSensitive : equateStringsCaseInsensitive)(a.fileName, b.fileName) &&
        textSpansEqual(a.textSpan, b.textSpan);
}


/** @internal */
export function getDocumentSpansEqualityComparer(useCaseSensitiveFileNames: boolean): EqualityComparer<DocumentSpan> {
    return (a, b) => documentSpansEqual(a, b, useCaseSensitiveFileNames);
}

/** @internal */
export function isTagName(node: Node): boolean {
    return tryCast(node.parent, isJSDocTag)?.tagName === node;
}

/** @internal */
export function getContextualTypeFromParentOrAncestorTypeNode(node: Expression, checker: TypeChecker): Type | undefined {
    if (node.flags & (NodeFlags.JSDoc & ~NodeFlags.JavaScriptFile)) return undefined;

    const contextualType = getContextualTypeFromParent(node, checker);
    if (contextualType) return contextualType;

    const ancestorTypeNode = getAncestorTypeNode(node);
    return ancestorTypeNode && checker.getTypeAtLocation(ancestorTypeNode);
}

function getAncestorTypeNode(node: Node) {
    let lastTypeNode: TypeNode | undefined;
    findAncestor(node, a => {
        if (isTypeNode(a)) {
            lastTypeNode = a;
        }
        return !isQualifiedName(a.parent) && !isTypeNode(a.parent) && !isTypeElement(a.parent);
    });
    return lastTypeNode;
}

/** @internal */
export function getContextualTypeFromParent(node: Expression, checker: TypeChecker, contextFlags?: ContextFlags): Type | undefined {
    const parent = walkUpParenthesizedExpressions(node.parent);
    switch (parent.kind) {
        case SyntaxKind.NewExpression:
            return checker.getContextualType(parent as NewExpression, contextFlags);
        case SyntaxKind.BinaryExpression: {
            const { left, operatorToken, right } = parent as BinaryExpression;
            return isEqualityOperatorKind(operatorToken.kind)
                ? checker.getTypeAtLocation(node === right ? left : right)
                : checker.getContextualType(node, contextFlags);
        }
        case SyntaxKind.CaseClause:
            return getSwitchedType(parent as CaseClause, checker);
        default:
            return checker.getContextualType(node, contextFlags);
    }
}

/** @internal */
export function isEqualityOperatorKind(kind: SyntaxKind): kind is EqualityOperator {
    switch (kind) {
        case SyntaxKind.EqualsEqualsEqualsToken:
        case SyntaxKind.EqualsEqualsToken:
        case SyntaxKind.ExclamationEqualsEqualsToken:
        case SyntaxKind.ExclamationEqualsToken:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function getSwitchedType(caseClause: CaseClause, checker: TypeChecker): Type | undefined {
    return checker.getTypeAtLocation(caseClause.parent.parent.expression);
}

/** @internal */
export function isInNonReferenceComment(sourceFile: SourceFile, position: number): boolean {
    return isInReferenceCommentWorker(sourceFile, position, /*shouldBeReference*/ false);
}


function isInReferenceCommentWorker(sourceFile: SourceFile, position: number, shouldBeReference: boolean): boolean {
    const range = isInComment(sourceFile, position, /*tokenAtPosition*/ undefined);
    return !!range && shouldBeReference === tripleSlashDirectivePrefixRegex.test(sourceFile.text.substring(range.pos, range.end));
}


/**
 * Returns true if the cursor at position in sourceFile is within a comment.
 *
 * @param tokenAtPosition Must equal `getTokenAtPosition(sourceFile, position)`
 * @param predicate Additional predicate to test on the comment range.
 *
 * @internal
 */
export function isInComment(sourceFile: SourceFile, position: number, tokenAtPosition?: Node): CommentRange | undefined {
    return formatting.getRangeOfEnclosingComment(sourceFile, position, /*precedingToken*/ undefined, tokenAtPosition);
}

/** @internal */
export function rangeContainsPositionExclusive(r: TextRange, pos: number) {
    return r.pos < pos && pos < r.end;
}

/**
 * Returns a token if position is in [start-of-leading-trivia, end)
 *
 * @internal
 */
export function getTokenAtPosition(sourceFile: SourceFile, position: number): Node {
    return getTokenAtPositionWorker(sourceFile, position, /*allowPositionInLeadingTrivia*/ true, /*includePrecedingTokenAtEndPosition*/ undefined, /*includeEndPosition*/ false);
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

/**
 * Adjusts the location used for "rename" when the cursor was not on a property name.
 *
 * @internal
 */
export function getAdjustedRenameLocation(node: Node): Node {
    return getAdjustedLocation(node, /*forRename*/ true);
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

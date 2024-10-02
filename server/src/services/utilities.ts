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
} from "./_namespaces/lpc.js";

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

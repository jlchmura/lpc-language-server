import { Symbol, createTextSpanFromBounds, Declaration, DefinitionInfo, emptyArray, FileReference, findAncestor, forEach, FunctionLikeDeclaration, getTouchingPropertyName, isDefaultClause, isFunctionLikeDeclaration, isSwitchStatement, Node, Program, ScriptElementKind, SignatureDeclaration, SourceFile, SwitchStatement, SymbolFlags, SyntaxKind, TypeChecker, SymbolDisplay, getNameOfDeclaration, createTextSpanFromNode, NodeFlags, hasInitializer, HasInitializer, hasEffectiveModifier, ModifierFlags, FindAllReferences, TextSpan } from "./_namespaces/lpc";
import { isContextWithStartAndEndNode } from "./_namespaces/lpc.FindAllReferences";

/** @internal */
export function getDefinitionAtPosition(program: Program, sourceFile: SourceFile, position: number, searchOtherFilesOnly?: boolean, stopAtAlias?: boolean): readonly DefinitionInfo[] | undefined {
    const resolvedRef = getReferenceAtPosition(sourceFile, position, program);
    const fileReferenceDefinition = resolvedRef && [getDefinitionInfoForFileReference(resolvedRef.reference.fileName, resolvedRef.fileName, resolvedRef.unverified)] || emptyArray;
    if (resolvedRef?.file) {
        // If `file` is missing, do a symbol-based lookup as well
        return fileReferenceDefinition;
    }

    const node = getTouchingPropertyName(sourceFile, position);
    if (node === sourceFile) {
        return undefined;
    }

    const { parent } = node;
    const typeChecker = program.getTypeChecker();

    // TODO: detect super here
    // if (node.kind === SyntaxKind.OverrideKeyword || (isIdentifier(node) && isJSDocOverrideTag(parent) && parent.tagName === node)) {
    //     return getDefinitionFromOverriddenMember(typeChecker, node) || emptyArray;
    // }

    switch (node.kind) {
        case SyntaxKind.ReturnKeyword:
            const functionDeclaration = findAncestor(node.parent, n => isFunctionLikeDeclaration(n)) as FunctionLikeDeclaration | undefined;
            return functionDeclaration
                ? [createDefinitionFromSignatureDeclaration(typeChecker, functionDeclaration)]
                : undefined;
        case SyntaxKind.DefaultKeyword:
            if (!isDefaultClause(node.parent)) {
                break;
            }
        // falls through
        case SyntaxKind.CaseKeyword:
            const switchStatement = findAncestor(node.parent, isSwitchStatement);
            if (switchStatement) {
                return [createDefinitionInfoFromSwitch(switchStatement, sourceFile)];
            }
            break;
    }

    let { symbol, failedAliasResolution } = getSymbol(node, typeChecker, stopAtAlias);
    let fallbackNode = node;

    if (searchOtherFilesOnly && failedAliasResolution) {
        // We couldn't resolve the specific import, try on the module specifier.
        throw "implement me";
        //const importDeclaration = forEach([node, ...symbol?.declarations || emptyArray], n => findAncestor(n, isAnyImportOrBareOrAccessedRequire));
        // const moduleSpecifier = importDeclaration && tryGetModuleSpecifierFromDeclaration(importDeclaration);
        // if (moduleSpecifier) {
        //     ({ symbol, failedAliasResolution } = getSymbol(moduleSpecifier, typeChecker, stopAtAlias));
        //     fallbackNode = moduleSpecifier;
        // }
    }
}

/** @internal */
export function getReferenceAtPosition(sourceFile: SourceFile, position: number, program: Program): { reference: FileReference; fileName: string; unverified: boolean; file?: SourceFile; } | undefined {
    console.warn("TODO - implement me - getReferenceAtPosition");
    // const referencePath = findReferenceInPosition(sourceFile.referencedFiles, position);
    // if (referencePath) {
    //     const file = program.getSourceFileFromReference(sourceFile, referencePath);
    //     return file && { reference: referencePath, fileName: file.fileName, file, unverified: false };
    // }

    // const typeReferenceDirective = findReferenceInPosition(sourceFile.typeReferenceDirectives, position);
    // if (typeReferenceDirective) {
    //     const reference = program.getResolvedTypeReferenceDirectiveFromTypeReferenceDirective(typeReferenceDirective, sourceFile)?.resolvedTypeReferenceDirective;
    //     const file = reference && program.getSourceFile(reference.resolvedFileName!); // TODO:GH#18217
    //     return file && { reference: typeReferenceDirective, fileName: file.fileName, file, unverified: false };
    // }

    // const libReferenceDirective = findReferenceInPosition(sourceFile.libReferenceDirectives, position);
    // if (libReferenceDirective) {
    //     const file = program.getLibFileFromReference(libReferenceDirective);
    //     return file && { reference: libReferenceDirective, fileName: file.fileName, file, unverified: false };
    // }

    // if (sourceFile.imports.length || sourceFile.moduleAugmentations.length) {
    //     const node = getTouchingToken(sourceFile, position);
    //     let resolution: ResolvedModuleWithFailedLookupLocations | undefined;
    //     if (isModuleSpecifierLike(node) && isExternalModuleNameRelative(node.text) && (resolution = program.getResolvedModuleFromModuleSpecifier(node, sourceFile))) {
    //         const verifiedFileName = resolution.resolvedModule?.resolvedFileName;
    //         const fileName = verifiedFileName || resolvePath(getDirectoryPath(sourceFile.fileName), node.text);
    //         return {
    //             file: program.getSourceFile(fileName),
    //             fileName,
    //             reference: {
    //                 pos: node.getStart(),
    //                 end: node.getEnd(),
    //                 fileName: node.text,
    //             },
    //             unverified: !verifiedFileName,
    //         };
    //     }
    // }

    return undefined;
}

function getDefinitionInfoForFileReference(name: string, targetFileName: string, unverified: boolean): DefinitionInfo {
    return {
        fileName: targetFileName,
        textSpan: createTextSpanFromBounds(0, 0),
        kind: ScriptElementKind.scriptElement,
        name,
        containerName: undefined!,
        containerKind: undefined!, // TODO: GH#18217
        unverified,
    };
}

/**
 * Creates a DefinitionInfo from a Declaration, using the declaration's name if possible.
 *
 * @internal
 */
export function createDefinitionInfo(declaration: Declaration, checker: TypeChecker, symbol: Symbol, node: Node, unverified?: boolean, failedAliasResolution?: boolean): DefinitionInfo {
    const symbolName = checker.symbolToString(symbol); // Do not get scoped name, just the name of the symbol
    const symbolKind = SymbolDisplay.getSymbolKind(checker, symbol, node);
    const containerName = symbol.parent ? checker.symbolToString(symbol.parent, node) : "";
    return createDefinitionInfoFromName(checker, declaration, symbolKind, symbolName, containerName, unverified, failedAliasResolution);
}

function createDefinitionFromSignatureDeclaration(typeChecker: TypeChecker, decl: SignatureDeclaration, failedAliasResolution?: boolean): DefinitionInfo {
    return createDefinitionInfo(decl, typeChecker, decl.symbol, decl, /*unverified*/ false, failedAliasResolution);
}

/** Creates a DefinitionInfo directly from the name of a declaration. */
function createDefinitionInfoFromName(checker: TypeChecker, declaration: Declaration, symbolKind: ScriptElementKind, symbolName: string, containerName: string, unverified?: boolean, failedAliasResolution?: boolean, textSpan?: TextSpan): DefinitionInfo {
    const sourceFile = declaration.getSourceFile();
    if (!textSpan) {
        const name = getNameOfDeclaration(declaration) || declaration;
        textSpan = createTextSpanFromNode(name, sourceFile);
    }
    return {
        fileName: sourceFile.fileName,
        textSpan,
        kind: symbolKind,
        name: symbolName,
        containerKind: undefined!, // TODO: GH#18217
        containerName,
        ...FindAllReferences.toContextSpan(
            textSpan,
            sourceFile,
            FindAllReferences.getContextNode(declaration),
        ),
        isLocal: !isDefinitionVisible(checker, declaration),
        isAmbient: !!(declaration.flags & NodeFlags.Ambient),
        unverified,
        failedAliasResolution,
    };
}


function isDefinitionVisible(checker: TypeChecker, declaration: Declaration): boolean {
    if (checker.isDeclarationVisible(declaration)) return true;
    if (!declaration.parent) return false;

    // Variable initializers are visible if variable is visible
    if (hasInitializer(declaration.parent) && (declaration.parent.initializer as Node) === declaration) return isDefinitionVisible(checker, declaration.parent as Declaration);

    // Handle some exceptions here like arrow function, members of class and object literal expression which are technically not visible but we want the definition to be determined by its parent
    switch (declaration.kind) {
        case SyntaxKind.PropertyDeclaration:
        // case SyntaxKind.GetAccessor:
        // case SyntaxKind.SetAccessor:
        // case SyntaxKind.MethodDeclaration:
            // Private/protected properties/methods are not visible
            if (hasEffectiveModifier(declaration, ModifierFlags.Private)) return false;
        // Public properties/methods are visible if its parents are visible, so:
        // falls through

        // case SyntaxKind.Constructor:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.ShorthandPropertyAssignment:
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.InlineClosureExpression:
        case SyntaxKind.FunctionExpression:
            return isDefinitionVisible(checker, declaration.parent as Declaration);
        default:
            return false;
    }
}


function createDefinitionInfoFromSwitch(statement: SwitchStatement, sourceFile: SourceFile): DefinitionInfo {
    const keyword = FindAllReferences.getContextNode(statement)!;
    const textSpan = createTextSpanFromNode(isContextWithStartAndEndNode(keyword) ? keyword.start : keyword, sourceFile);
    return {
        fileName: sourceFile.fileName,
        textSpan,
        kind: ScriptElementKind.keyword,
        name: "switch",
        containerKind: undefined!,
        containerName: "",
        ...FindAllReferences.toContextSpan(textSpan, sourceFile, keyword),
        isLocal: true,
        isAmbient: false,
        unverified: false,
        failedAliasResolution: undefined,
    };
}


// Go to the original declaration for cases:
//
//   (1) when the aliased symbol was declared in the location(parent).
//   (2) when the aliased symbol is originating from an import.
//
function shouldSkipAlias(node: Node, declaration: Node): boolean {
    // Note: Import aliases can be strings:
    //
    //   import { "an alias" as foo } from "./foo";
    //   export { foo as "an alias" };
    //
    if (node.kind !== SyntaxKind.Identifier && (node.kind !== SyntaxKind.StringLiteral/* || !isImportOrExportSpecifier(node.parent)*/)) {
        return false;
    }
    if (node.parent === declaration) {
        return true;
    }
    // if (declaration.kind === SyntaxKind.NamespaceImport) {
    //     return false;
    // }
    return true;
}

function getSymbol(node: Node, checker: TypeChecker, stopAtAlias: boolean | undefined) {
    const symbol = checker.getSymbolAtLocation(node);
    // If this is an alias, and the request came at the declaration location
    // get the aliased symbol instead. This allows for goto def on an import e.g.
    //   import {A, B} from "mod";
    // to jump to the implementation directly.
    let failedAliasResolution = false;
    if (symbol?.declarations && symbol.flags & SymbolFlags.Alias && !stopAtAlias && shouldSkipAlias(node, symbol.declarations[0])) {
        const aliased = checker.getAliasedSymbol(symbol);
        if (aliased.declarations) {
            return { symbol: aliased };
        }
        else {
            failedAliasResolution = true;
        }
    }
    return { symbol, failedAliasResolution };
}
import { Symbol, createTextSpanFromBounds, Declaration, DefinitionInfo, emptyArray, FileReference, findAncestor, forEach, FunctionLikeDeclaration, getTouchingPropertyName, isDefaultClause, isFunctionLikeDeclaration, isSwitchStatement, Node, Program, ScriptElementKind, SignatureDeclaration, SourceFile, SwitchStatement, SymbolFlags, SyntaxKind, TypeChecker, SymbolDisplay, getNameOfDeclaration, createTextSpanFromNode, NodeFlags, hasInitializer, HasInitializer, hasEffectiveModifier, ModifierFlags, FindAllReferences, TextSpan, concatenate, every, mapDefined, tryCast, isFunctionLike, isAssignmentExpression, isCallLikeExpression, canHaveSymbol, filter, some, map, find, isCallOrNewExpressionTarget, isNameOfFunctionDeclaration, CallLikeExpression, isRightSideOfPropertyAccess, getInvokedExpression, isPropertyName, isBindingElement, isNewExpressionTarget, textRangeContainsPositionInclusive, IncludeDirective, getTouchingToken, ResolvedModuleWithFailedLookupLocations, getDirectoryPath, resolvePath, isStringLiteral, getPreEmitDiagnostics, Debug, isIncludeDirective, last, isInExternalFileContext, getSourceFileOrIncludeOfNode } from "./_namespaces/lpc";
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
    
    // run the type checker if it hasn't been run yet.
    getPreEmitDiagnostics(program, sourceFile);

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
        case SyntaxKind.StringLiteral:
            const includeParent = findAncestor(node, isIncludeDirective);
            if (includeParent) {
                const includeFilename = includeParent.fileName;
                return [getDefinitionInfoForFileReference(includeFilename, includeFilename, false)];
            }
        case SyntaxKind.IncludeDirective:
            const includeDirective = node as IncludeDirective;    
            const includeFilename = includeDirective.fileName;
            return [getDefinitionInfoForFileReference(includeFilename, includeFilename, false)];
    }

    let { symbol, failedAliasResolution } = getSymbol(node, typeChecker, stopAtAlias);
    let fallbackNode = node;

    if (searchOtherFilesOnly && failedAliasResolution) {
        // We couldn't resolve the specific import, try on the module specifier.
        Debug.fail("implement me");
        //const importDeclaration = forEach([node, ...symbol?.declarations || emptyArray], n => findAncestor(n, isAnyImportOrBareOrAccessedRequire));
        // const moduleSpecifier = importDeclaration && tryGetModuleSpecifierFromDeclaration(importDeclaration);
        // if (moduleSpecifier) {
        //     ({ symbol, failedAliasResolution } = getSymbol(moduleSpecifier, typeChecker, stopAtAlias));
        //     fallbackNode = moduleSpecifier;
        // }
    }

    // Could not find a symbol e.g. node is string or number keyword,
    // or the symbol was an internal symbol and does not have a declaration e.g. undefined symbol
    if (!symbol) {
        return concatenate(fileReferenceDefinition, getDefinitionInfoForIndexSignatures(node, typeChecker));
    }

    if (searchOtherFilesOnly && every(symbol.declarations, d => d.getSourceFile().fileName === sourceFile.fileName)) return undefined;

    const calledDeclaration = tryGetSignatureDeclaration(typeChecker, node);
    // Don't go to the component constructor definition for a JSX element, just go to the component definition.
    if (calledDeclaration) {
        const sigInfo = createDefinitionFromSignatureDeclaration(typeChecker, calledDeclaration, failedAliasResolution);
        // For a function, if this is the original function definition, return just sigInfo.
        // If this is the original constructor definition, parent is the class.
        if (typeChecker.getRootSymbols(symbol).some(s => symbolMatchesSignature(s, calledDeclaration))) {
            return [sigInfo];
        }
        else {
            const defs = getDefinitionFromSymbol(typeChecker, symbol, node, failedAliasResolution, calledDeclaration) || emptyArray;
            // For a 'super()' call, put the signature first, else put the variable first.
            return node.kind === SyntaxKind.SuperKeyword ? [sigInfo, ...defs] : [...defs, sigInfo];
        }
    }

    // Because name in short-hand property assignment has two different meanings: property name and property value,
    // using go-to-definition at such position should go to the variable declaration of the property value rather than
    // go to the declaration of the property name (in this case stay at the same position). However, if go-to-definition
    // is performed at the location of property access, we would like to go to definition of the property in the short-hand
    // assignment. This case and others are handled by the following code.
    if (node.parent.kind === SyntaxKind.ShorthandPropertyAssignment) {
        const shorthandSymbol = typeChecker.getShorthandAssignmentValueSymbol(symbol.valueDeclaration);
        const definitions = shorthandSymbol?.declarations ? shorthandSymbol.declarations.map(decl => createDefinitionInfo(decl, typeChecker, shorthandSymbol, node, /*unverified*/ false, failedAliasResolution)) : emptyArray;
        return concatenate(definitions, []);//getDefinitionFromObjectLiteralElement(typeChecker, node));
    }

    // If the node is the name of a BindingElement within an ObjectBindingPattern instead of just returning the
    // declaration the symbol (which is itself), we should try to get to the original type of the ObjectBindingPattern
    // and return the property declaration for the referenced property.
    // For example:
    //      import('./foo').then(({ b/*goto*/ar }) => undefined); => should get use to the declaration in file "./foo"
    //
    //      function bar<T>(onfulfilled: (value: T) => void) { //....}
    //      interface Test {
    //          pr/*destination*/op1: number
    //      }
    //      bar<Test>(({pr/*goto*/op1})=>{});
    // if (
    //     isPropertyName(node) && isBindingElement(parent) && isObjectBindingPattern(parent.parent) &&
    //     (node === (parent.propertyName || parent.name))
    // ) {
    //     const name = getNameFromPropertyName(node);
    //     const type = typeChecker.getTypeAtLocation(parent.parent);
    //     return name === undefined ? emptyArray : flatMap(type.isUnion() ? type.types : [type], t => {
    //         const prop = t.getProperty(name);
    //         return prop && getDefinitionFromSymbol(typeChecker, prop, node);
    //     });
    // }

    const objectLiteralElementDefinition = [];//getDefinitionFromObjectLiteralElement(typeChecker, node);
    return concatenate(fileReferenceDefinition, objectLiteralElementDefinition.length ? objectLiteralElementDefinition : getDefinitionFromSymbol(typeChecker, symbol, node, failedAliasResolution));
}

// At 'x.foo', see if the type of 'x' has an index signature, and if so find its declarations.
function getDefinitionInfoForIndexSignatures(node: Node, checker: TypeChecker): DefinitionInfo[] | undefined {
    return undefined;
    // TODO: return mapDefined(checker.getIndexInfosAtLocation(node), info => info.declaration && createDefinitionFromSignatureDeclaration(checker, info.declaration));
}

function tryGetSignatureDeclaration(typeChecker: TypeChecker, node: Node): SignatureDeclaration | undefined {
    const callLike = getAncestorCallLikeExpression(node);
    const signature = callLike && typeChecker.getResolvedSignature(callLike);
    // Don't go to a function type, go to the value having that type.
    return tryCast(signature && signature.declaration, (d): d is SignatureDeclaration => isFunctionLike(d));
}

/** Returns a CallLikeExpression where `node` is the target being invoked. */
function getAncestorCallLikeExpression(node: Node): CallLikeExpression | undefined {
    const target = findAncestor(node, n => !isRightSideOfPropertyAccess(n));
    const callLike = target?.parent;
    return callLike && isCallLikeExpression(callLike) && getInvokedExpression(callLike) === target ? callLike : undefined;
}


/**
 * True if we should not add definitions for both the signature symbol and the definition symbol.
 * True for `const |f = |() => 0`, false for `function |f() {} const |g = f;`.
 * Also true for any assignment RHS.
 */
function symbolMatchesSignature(s: Symbol, calledDeclaration: SignatureDeclaration) {
    return s === calledDeclaration.symbol
        || s === calledDeclaration.symbol.parent
        || isAssignmentExpression(calledDeclaration.parent)
        || (!isCallLikeExpression(calledDeclaration.parent) && s === tryCast(calledDeclaration.parent, canHaveSymbol)?.symbol);
}

function getDefinitionFromSymbol(typeChecker: TypeChecker, symbol: Symbol, node: Node, failedAliasResolution?: boolean, excludeDeclaration?: Node): DefinitionInfo[] | undefined {
    const filteredDeclarations = filter(symbol.declarations, d => d !== excludeDeclaration);
    const signatureDefinition = getConstructSignatureDefinition() || getCallSignatureDefinition();
    if (signatureDefinition) {
        return signatureDefinition;
    }
    const withoutExpandos = filter(filteredDeclarations, d => true);//!isExpandoDeclaration(d));
    const results = some(withoutExpandos) ? withoutExpandos : filteredDeclarations;
    return map(results, declaration => createDefinitionInfo(declaration, typeChecker, symbol, node, /*unverified*/ false, failedAliasResolution));

    function getConstructSignatureDefinition(): DefinitionInfo[] | undefined {
        // Applicable only if we are in a new expression, or we are on a constructor declaration
        // and in either case the symbol has a construct signature definition, i.e. class
        if (symbol.flags & SymbolFlags.Class && !(symbol.flags & (SymbolFlags.Function | SymbolFlags.Variable)) && (isNewExpressionTarget(node))) {
            // TODO
            return undefined;
            // const cls = find(filteredDeclarations, isClassLike);
            // return cls && getSignatureDefinition(cls.members, /*selectConstructors*/ true);
        }
    }

    function getCallSignatureDefinition(): DefinitionInfo[] | undefined {
        return isCallOrNewExpressionTarget(node) || isNameOfFunctionDeclaration(node)
            ? getSignatureDefinition(filteredDeclarations, /*selectConstructors*/ false)
            : undefined;
    }

    function getSignatureDefinition(signatureDeclarations: readonly Declaration[] | undefined, selectConstructors: boolean): DefinitionInfo[] | undefined {
        if (!signatureDeclarations) {
            return undefined;
        }
        const declarations = signatureDeclarations.filter(/*selectConstructors ? isConstructorDeclaration :*/ isFunctionLike);
        const declarationsWithBody = declarations.filter(d => !!(d as FunctionLikeDeclaration).body);

        // declarations defined on the global scope can be defined on multiple files. Get all of them.
        return declarations.length
            ? declarationsWithBody.length !== 0
                ? declarationsWithBody.map(x => createDefinitionInfo(x, typeChecker, symbol, node))
                : [createDefinitionInfo(last(declarations), typeChecker, symbol, node, /*unverified*/ false, failedAliasResolution)]
            : undefined;
    }
}

function findReferenceInPosition(refs: readonly FileReference[], pos: number): FileReference | undefined {
    return find(refs, ref => textRangeContainsPositionInclusive(ref, pos));
}

/** @internal */
export function getReferenceAtPosition(sourceFile: SourceFile, position: number, program: Program): { reference: FileReference; fileName: string; unverified: boolean; file?: SourceFile; } | undefined {
    const referencePath = findReferenceInPosition(sourceFile.referencedFiles, position);
    if (referencePath) {
        const file = program.getSourceFileFromReference(sourceFile, referencePath);
        return file && { reference: referencePath, fileName: file.fileName, file, unverified: false };
    }
        
    const typeReferenceDirective = findReferenceInPosition(sourceFile.typeReferenceDirectives, position);
    if (typeReferenceDirective) {
        const reference = program.getResolvedTypeReferenceDirectiveFromTypeReferenceDirective(typeReferenceDirective, sourceFile)?.resolvedTypeReferenceDirective;
        const file = reference && program.getSourceFile(reference.resolvedFileName!); // TODO:GH#18217
        return file && { reference: typeReferenceDirective, fileName: file.fileName, file, unverified: false };
    }

    const libReferenceDirective = findReferenceInPosition(sourceFile.libReferenceDirectives, position);
    if (libReferenceDirective) {
        console.warn("TODO - implement me - getReferenceAtPosition - lib");    
    //     const file = program.getLibFileFromReference(libReferenceDirective);
    //     return file && { reference: libReferenceDirective, fileName: file.fileName, file, unverified: false };
    }

    if (sourceFile.imports.length) {
        const node = getTouchingToken(sourceFile, position);
        let resolution: ResolvedModuleWithFailedLookupLocations | undefined;
        if (isStringLiteral(node) && (resolution = program.getResolvedModuleFromModuleSpecifier(node, sourceFile))) {
            const verifiedFileName = resolution.resolvedModule?.resolvedFileName;
            const fileName = verifiedFileName || resolvePath(getDirectoryPath(sourceFile.fileName), node.text);
            return {
                file: program.getSourceFile(fileName),
                fileName,
                reference: {
                    pos: node.getStart(),
                    end: node.getEnd(),
                    fileName: node.text,
                },
                unverified: !verifiedFileName,
            };
        }
    }

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
    const fileName = (isInExternalFileContext(declaration) ? getSourceFileOrIncludeOfNode(declaration).fileName : undefined) || sourceFile.fileName;    
    if (!textSpan) {
        const name = getNameOfDeclaration(declaration) || declaration;
        textSpan = createTextSpanFromNode(name, sourceFile);                
    }
    return {
        fileName,
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

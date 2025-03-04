import {
    BindingElement,
    CancellationToken,
    Classifications,
    ClassifiedSpan2020,
    createTextSpan,
    Debug,
    Declaration,
    EndOfLineState,
    forEachChild,
    getCombinedModifierFlags,
    getCombinedNodeFlags,
    getMeaningFromLocation,
    isBindingElement,
    isCallExpression,
    isFunctionDeclaration,
    isIdentifier,    
    isInExternalFileContext,    
    isInfinityOrNaNString,    
    isInIncludeContext,    
    isPropertyAccessExpression,
    isQualifiedName,
    isSourceFile,
    isVariableDeclaration,
    ModifierFlags,
    NamedDeclaration,
    Node,
    ParameterDeclaration,
    Program,
    SemanticMeaning,
    SourceFile,
    Symbol,
    SymbolFlags,
    SyntaxKind,
    TextSpan,    
    textSpanIntersectsWith,    
    Type,
    TypeChecker,
    VariableDeclaration,
} from "./_namespaces/lpc.js";

/** @internal */
export const enum TokenEncodingConsts {
    typeOffset = 8,
    modifierMask = (1 << typeOffset) - 1,
}

/** @internal */
export const enum TokenType {
    class,
    enum,
    interface,
    namespace,
    typeParameter,
    type,
    parameter,
    variable,
    enumMember,
    property,
    function,
    member,
    disabled,
}

/** @internal */
export const enum TokenModifier {
    declaration,
    static,
    async,
    readonly,
    defaultLibrary,
    local,
}

/**
 * This is mainly used internally for testing
 *
 * @internal
 */
export function getSemanticClassifications(program: Program, cancellationToken: CancellationToken, sourceFile: SourceFile, span: TextSpan): ClassifiedSpan2020[] {
    const classifications = getEncodedSemanticClassifications(program, cancellationToken, sourceFile, span);

    Debug.assert(classifications.spans.length % 3 === 0);
    const dense = classifications.spans;
    const result: ClassifiedSpan2020[] = [];
    for (let i = 0; i < dense.length; i += 3) {
        result.push({
            textSpan: createTextSpan(dense[i], dense[i + 1]),
            classificationType: dense[i + 2],
        });
    }

    return result;
}

/** @internal */
export function getEncodedSemanticClassifications(program: Program, cancellationToken: CancellationToken, sourceFile: SourceFile, span: TextSpan): Classifications {
    return {
        spans: getSemanticTokens(program, sourceFile, span, cancellationToken),
        endOfLineState: EndOfLineState.None,
    };
}

function getSemanticTokens(program: Program, sourceFile: SourceFile, span: TextSpan, cancellationToken: CancellationToken): number[] {
    const resultTokens: number[] = [];

    const collector = (node: Node, typeIdx: number, modifierSet: number) => {
        resultTokens.push(node.getStart(sourceFile), node.getWidth(sourceFile), ((typeIdx + 1) << TokenEncodingConsts.typeOffset) + modifierSet);
    };

    if (program && sourceFile) {
        collectTokens(program, sourceFile, span, collector, cancellationToken);

        // add inactive ranges
        for (const range of sourceFile.inactiveCodeRanges) {
            if (textSpanIntersectsWith(span, range.pos, range.end - range.pos)) {
                resultTokens.push(range.pos, range.end - range.pos, ((TokenType.disabled + 1) << TokenEncodingConsts.typeOffset));
            }
        }        
    }
    return resultTokens;
}

function collectTokens(program: Program, sourceFile: SourceFile, span: TextSpan, collector: (node: Node, tokenType: number, tokenModifier: number) => void, cancellationToken: CancellationToken) {
    const typeChecker = program.getTypeChecker();    
    
    // run the type checker with a currentFile assigned
    // to avoid constant lookups up the node tree
    typeChecker.runWithCurrentFile(sourceFile, () => {
        visit(sourceFile);
    });

    function isFromFile(node: Node) {
        return isSourceFile(node) || !isInExternalFileContext(node);
    }

    function visit(node: Node) {
        switch (node.kind) {
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ClassExpression:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                cancellationToken.throwIfCancellationRequested();
        }

        if (!node || isInIncludeContext(node) || !textSpanIntersectsWith(span, node.pos, node.getFullWidth()) || node.getFullWidth() === 0) {
            return;
        }                

        // advance to the next disalbed span ahead of this node
        // while (checkDisabled && node.pos > disabledSpans[lastDisabledSpan].pos && lastDisabledSpan < disabledSpans.length - 1) {
        //     lastDisabledSpan++;
        // }        

        // if (checkDisabled && lastDisabledSpan < disabledSpans.length && node.pos >= disabledSpans[lastDisabledSpan].pos && node.end <= disabledSpans[lastDisabledSpan].end) {
        //     collector(node, TokenType.disabled, 0);
        //     return;
        // }

        if (isIdentifier(node) && !inImportClause(node) && !isInfinityOrNaNString(node.text)) {
            let symbol = typeChecker.getSymbolAtLocation(node);
            if (symbol) {
                if (symbol.flags & SymbolFlags.Alias) {
                    symbol = typeChecker.getAliasedSymbol(symbol);
                }
                let typeIdx = classifySymbol(symbol, getMeaningFromLocation(node));
                if (typeIdx !== undefined) {
                    let modifierSet = 0;
                    if (node.parent) {
                        const parentIsDeclaration = isBindingElement(node.parent) || tokenFromDeclarationMapping.get(node.parent.kind) === typeIdx;
                        if (parentIsDeclaration && (node.parent as NamedDeclaration).name === node) {
                            modifierSet = 1 << TokenModifier.declaration;
                        }
                    }

                    // property declaration in constructor
                    if (typeIdx === TokenType.parameter && isRightSideOfQualifiedNameOrPropertyAccess(node)) {
                        typeIdx = TokenType.property;
                    }

                    typeIdx = reclassifyByType(typeChecker, node, typeIdx);

                    const decl = symbol.valueDeclaration;
                    if (decl) {
                        const modifiers = getCombinedModifierFlags(decl);
                        const nodeFlags = getCombinedNodeFlags(decl);
                        if (modifiers & ModifierFlags.Static) {
                            modifierSet |= 1 << TokenModifier.static;
                        }
                        // if (modifiers & ModifierFlags.Async) {
                        //     modifierSet |= 1 << TokenModifier.async;
                        // }
                        if (typeIdx !== TokenType.class && typeIdx !== TokenType.interface) {
                            if ((modifiers & ModifierFlags.Readonly) || (symbol.getFlags() & SymbolFlags.EnumMember)) {
                                modifierSet |= 1 << TokenModifier.readonly;
                            }
                        }
                        if ((typeIdx === TokenType.variable || typeIdx === TokenType.function) && isLocalDeclaration(decl, sourceFile)) {
                            modifierSet |= 1 << TokenModifier.local;
                        }
                        if (program.isSourceFileDefaultLibrary(decl.getSourceFile())) {
                            modifierSet |= 1 << TokenModifier.defaultLibrary;
                        }
                    }
                    else if (symbol.declarations && symbol.declarations.some(d => program.isSourceFileDefaultLibrary(d.getSourceFile()))) {
                        modifierSet |= 1 << TokenModifier.defaultLibrary;
                    }

                    if (isFromFile(node)) {
                        collector(node, typeIdx, modifierSet);
                    }
                }
            }
        }
        
        forEachChild(node, visit);        
    }    
}

function classifySymbol(symbol: Symbol, meaning: SemanticMeaning): TokenType | undefined {
    const flags = symbol.getFlags();
    if (flags & SymbolFlags.Class) {
        return TokenType.class;
    }
    else if (flags & SymbolFlags.Enum) {
        return TokenType.enum;
    }
    else if (flags & SymbolFlags.TypeAlias) {
        return TokenType.type;
    }
    else if (flags & SymbolFlags.Interface) {
        if (meaning & SemanticMeaning.Type) {
            return TokenType.interface;
        }
    }
    else if (flags & SymbolFlags.TypeParameter) {
        return TokenType.typeParameter;
    }
    let decl = symbol.valueDeclaration || symbol.declarations && symbol.declarations[0];
    if (decl && isBindingElement(decl)) {
        decl = getDeclarationForBindingElement(decl);
    }
    return decl && tokenFromDeclarationMapping.get(decl.kind);
}

function reclassifyByType(typeChecker: TypeChecker, node: Node, typeIdx: TokenType): TokenType {
    // type based classifications
    if (typeIdx === TokenType.variable || typeIdx === TokenType.property || typeIdx === TokenType.parameter) {
        const type = typeChecker.getTypeAtLocation(node);
        if (type) {
            const test = (condition: (type: Type) => boolean) => {
                return condition(type) || type.isUnion() && type.types.some(condition);
            };
            if (typeIdx !== TokenType.parameter && test(t => t.getConstructSignatures().length > 0)) {
                return TokenType.class;
            }
            if (test(t => t.getCallSignatures().length > 0) && !test(t => t.getProperties().length > 0) || isExpressionInCallExpression(node)) {
                return typeIdx === TokenType.property ? TokenType.member : TokenType.function;
            }
        }
    }
    return typeIdx;
}

function isLocalDeclaration(decl: Declaration, sourceFile: SourceFile): boolean {
    if (isBindingElement(decl)) {
        decl = getDeclarationForBindingElement(decl);
    }
    if (isVariableDeclaration(decl)) {
        return (!isSourceFile(decl.parent.parent.parent));// || isCatchClause(decl.parent)) && decl.getSourceFile() === sourceFile;
    }
    else if (isFunctionDeclaration(decl)) {
        return !isSourceFile(decl.parent) && decl.getSourceFile() === sourceFile;
    }
    return false;
}

function getDeclarationForBindingElement(element: BindingElement): VariableDeclaration | ParameterDeclaration {
    while (true) {
        if (isBindingElement(element.parent.parent)) {
            element = element.parent.parent;
        }
        else {
            return element.parent.parent;
        }
    }
}

function inImportClause(node: Node): boolean {
    return false;
    // const parent = node.parent;
    // return parent && (isImportClause(parent) || isImportSpecifier(parent) || isNamespaceImport(parent));
}

function isExpressionInCallExpression(node: Node): boolean {
    while (isRightSideOfQualifiedNameOrPropertyAccess(node)) {
        node = node.parent;
    }
    return isCallExpression(node.parent) && node.parent.expression === node;
}

function isRightSideOfQualifiedNameOrPropertyAccess(node: Node): boolean {
    return (isQualifiedName(node.parent) && node.parent.right === node) || (isPropertyAccessExpression(node.parent) && node.parent.name === node);
}

const tokenFromDeclarationMapping = new Map<SyntaxKind, TokenType>([
    [SyntaxKind.VariableDeclaration, TokenType.variable],
    [SyntaxKind.Parameter, TokenType.parameter],
    [SyntaxKind.PropertyDeclaration, TokenType.property],    
    [SyntaxKind.ClassDeclaration, TokenType.class],
    [SyntaxKind.MethodDeclaration, TokenType.member],
    [SyntaxKind.FunctionDeclaration, TokenType.function],
    [SyntaxKind.FunctionExpression, TokenType.function],
    [SyntaxKind.MethodSignature, TokenType.member],    
    [SyntaxKind.PropertySignature, TokenType.property],    
    [SyntaxKind.TypeAliasDeclaration, TokenType.type],
    [SyntaxKind.TypeParameter, TokenType.typeParameter],
    [SyntaxKind.PropertyAssignment, TokenType.property],
    [SyntaxKind.ShorthandPropertyAssignment, TokenType.property],
]);

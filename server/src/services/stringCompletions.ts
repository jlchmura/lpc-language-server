import { CompletionKind, createCompletionDetails, createCompletionDetailsForSymbol, getCompletionEntriesFromSymbols, Log, SortText } from "./_namespaces/lpc.Completions.js";
import { Symbol, CaseClause, CharacterCodes, CompilerOptions, CompletionEntry, CompletionInfo, contains, ContextFlags, createSortedArray, createTextSpanFromStringLiteralLikeContent, Debug, ElementAccessExpression, escapeString, Extension, findAncestor, getContextualTypeFromParent, getReplacementSpanForContextToken, getTextOfNode, IndexedAccessTypeNode, isInReferenceComment, isInString, isObjectLiteralExpression, isStringLiteralLike, LanguageServiceHost, LiteralTypeNode, newCaseClauseTracker, Node, Program, PropertyAssignment, rangeContainsPosition, ScriptElementKind, ScriptElementKindModifier, ScriptTarget, skipParentheses, SourceFile, startsWith, StringLiteralLike, StringLiteralType, SyntaxKind, TextSpan, UnionTypeNode, UserPreferences, walkUpParenthesizedTypes, walkUpParenthesizedExpressions, Type, filter, SignatureHelp, CallLikeExpression, flatMap, length, signatureHasRestParameter, TypeChecker, TypeFlags, hasIndexSignature, emptyArray, addToSeen, skipConstraint, isLiteralTypeNode, isStringLiteral, mapDefined, CancellationToken, CompletionEntryDetails, find, textPart } from "./_namespaces/lpc.js";

const enum StringLiteralCompletionKind {
    Paths,
    Properties,
    Types,
}

interface NameAndKind {
    readonly name: string;
    readonly kind: ScriptElementKind.scriptElement | ScriptElementKind.directory | ScriptElementKind.externalModuleName;
    readonly extension: Extension | undefined;
}

interface PathCompletion extends NameAndKind {
    readonly span: TextSpan | undefined;
}

interface StringLiteralCompletionsFromProperties {
    readonly kind: StringLiteralCompletionKind.Properties;
    readonly symbols: readonly Symbol[];
    readonly hasIndexSignature: boolean;
}

interface StringLiteralCompletionsFromTypes {
    readonly kind: StringLiteralCompletionKind.Types;
    readonly types: readonly StringLiteralType[];
    readonly isNewIdentifier: boolean;
}

type StringLiteralCompletion = { readonly kind: StringLiteralCompletionKind.Paths; readonly paths: readonly PathCompletion[]; } | StringLiteralCompletionsFromProperties | StringLiteralCompletionsFromTypes;

/** @internal */
export function getStringLiteralCompletions(
    sourceFile: SourceFile,
    position: number,
    contextToken: Node | undefined,
    options: CompilerOptions,
    host: LanguageServiceHost,
    program: Program,
    log: Log,
    preferences: UserPreferences,
    includeSymbol: boolean,
): CompletionInfo | undefined {
    // if (isInReferenceComment(sourceFile, position)) {
    //     const entries = getTripleSlashReferenceCompletion(sourceFile, position, options, host);
    //     return entries && convertPathCompletions(entries);
    // }
    if (isInString(sourceFile, position, contextToken)) {
        if (!contextToken || !isStringLiteralLike(contextToken)) return undefined;
        const entries = getStringLiteralCompletionEntries(sourceFile, contextToken, position, program, host, preferences);
        return convertStringLiteralCompletions(entries, contextToken, sourceFile, host, program, log, options, preferences, position, includeSymbol);
    }
}

function convertPathCompletions(pathCompletions: readonly PathCompletion[]): CompletionInfo {
    const isGlobalCompletion = false; // We don't want the editor to offer any other completions, such as snippets, inside a comment.
    const isNewIdentifierLocation = true; // The user may type in a path that doesn't yet exist, creating a "new identifier" with respect to the collection of identifiers the server is aware of.
    const entries = pathCompletions.map(({ name, kind, span, extension }): CompletionEntry => ({ name, kind, kindModifiers: kindModifiersFromExtension(extension), sortText: SortText.LocationPriority, replacementSpan: span }));
    return { isGlobalCompletion, isMemberCompletion: false, isNewIdentifierLocation, entries };
}

function kindModifiersFromExtension(extension: Extension | undefined): ScriptElementKindModifier {
    switch (extension) {
        case Extension.C:
            return ScriptElementKindModifier.cModifier;
        case Extension.H:
            return ScriptElementKindModifier.hModifier;
        case Extension.Lpc:
            return ScriptElementKindModifier.lpcModifier;        
        case Extension.Json:
            return ScriptElementKindModifier.jsonModifier;        
        case undefined:
            return ScriptElementKindModifier.none;
        default:
            return Debug.assertNever(extension);
    }
}

function convertStringLiteralCompletions(
    completion: StringLiteralCompletion | undefined,
    contextToken: StringLiteralLike,
    sourceFile: SourceFile,
    host: LanguageServiceHost,
    program: Program,
    log: Log,
    options: CompilerOptions,
    preferences: UserPreferences,
    position: number,
    includeSymbol: boolean,
): CompletionInfo | undefined {
    if (completion === undefined) {
        return undefined;
    }

    const optionalReplacementSpan = createTextSpanFromStringLiteralLikeContent(contextToken, position);
    switch (completion.kind) {
        case StringLiteralCompletionKind.Paths:
            return convertPathCompletions(completion.paths);
        case StringLiteralCompletionKind.Properties: {
            const entries = createSortedArray<CompletionEntry>();
            getCompletionEntriesFromSymbols(
                completion.symbols,
                entries,
                contextToken,
                contextToken,
                sourceFile,
                position,
                sourceFile,
                host,
                program,
                ScriptTarget.LPC,
                log,
                CompletionKind.String,
                preferences,
                options,
                /*formatContext*/ undefined,
                /*isTypeOnlyLocation*/ undefined,
                /*propertyAccessToConvert*/ undefined,                                
                /*importStatementCompletion*/ undefined,
                /*recommendedCompletion*/ undefined,
                /*symbolToOriginInfoMap*/ undefined,
                /*symbolToSortTextMap*/ undefined,                
                includeSymbol,
            ); // Target will not be used, so arbitrary
            return { isGlobalCompletion: false, isMemberCompletion: true, isNewIdentifierLocation: completion.hasIndexSignature, optionalReplacementSpan, entries };
        }
        case StringLiteralCompletionKind.Types: {
            const quoteChar = /*contextToken.kind === SyntaxKind.NoSubstitutionTemplateLiteral
                ? CharacterCodes.backtick
                : */startsWith(getTextOfNode(contextToken), "'")
                ? CharacterCodes.singleQuote
                : CharacterCodes.doubleQuote;
            const entries = completion.types.map(type => ({
                name: escapeString(type.value, quoteChar),
                kindModifiers: ScriptElementKindModifier.none,
                kind: ScriptElementKind.string,
                sortText: SortText.LocationPriority,
                replacementSpan: getReplacementSpanForContextToken(contextToken, position),
            }));
            return { isGlobalCompletion: false, isMemberCompletion: false, isNewIdentifierLocation: completion.isNewIdentifier, optionalReplacementSpan, entries };
        }
        default:
            return Debug.assertNever(completion);
    }
}

function walkUpParentheses(node: Node) {
    switch (node.kind) {
        case SyntaxKind.ParenthesizedType:
            return walkUpParenthesizedTypes(node);
        case SyntaxKind.ParenthesizedExpression:
            return walkUpParenthesizedExpressions(node);
        default:
            return node;
    }
}

function getStringLiteralCompletionEntries(sourceFile: SourceFile, node: StringLiteralLike, position: number, program: Program, host: LanguageServiceHost, preferences: UserPreferences): StringLiteralCompletion | undefined {
    const typeChecker = program.getTypeChecker();
    const parent = walkUpParentheses(node.parent);
    switch (parent.kind) {
        case SyntaxKind.LiteralType: {
            const grandParent = walkUpParentheses(parent.parent);
            // if (grandParent.kind === SyntaxKind.ImportType) {
            //     return { kind: StringLiteralCompletionKind.Paths, paths: getStringLiteralCompletionsFromModuleNames(sourceFile, node, program, host, preferences) };
            // }
            return fromUnionableLiteralType(grandParent);
        }
        case SyntaxKind.PropertyAssignment:
            if (isObjectLiteralExpression(parent.parent) && (parent as PropertyAssignment).name === node) {
                // Get quoted name of properties of the object literal expression
                // i.e. interface ConfigFiles {
                //          'jspm:dev': string
                //      }
                //      let files: ConfigFiles = {
                //          '/*completion position*/'
                //      }
                //
                //      function foo(c: ConfigFiles) {}
                //      foo({
                //          '/*completion position*/'
                //      });
                // return stringLiteralCompletionsForObjectLiteral(typeChecker, parent.parent);
                return undefined;
            }
            return fromContextualType() || fromContextualType(ContextFlags.None);

        case SyntaxKind.ElementAccessExpression: {
            const { expression, argumentExpression } = parent as ElementAccessExpression;
            if (node === skipParentheses(argumentExpression)) {
                // Get all names of properties on the expression
                // i.e. interface A {
                //      'prop1': string
                // }
                // let a: A;
                // a['/*completion position*/']
                return stringLiteralCompletionsFromProperties(typeChecker.getTypeAtLocation(expression));
            }
            return undefined;
        }

        case SyntaxKind.CallExpression:
        case SyntaxKind.NewExpression:        
            //if (!isRequireCallArgument(node) && !isImportCall(parent)) {
                const argumentInfo = SignatureHelp.getArgumentInfoForCompletions(node, position, sourceFile, typeChecker);
                // Get string literal completions from specialized signatures of the target
                // i.e. declare function f(a: 'A');
                // f("/*completion position*/")
                return argumentInfo && getStringLiteralCompletionsFromSignature(argumentInfo.invocation, node, argumentInfo, typeChecker) || fromContextualType(ContextFlags.None);
            // }
            // falls through (is `require("")` or `require(""` or `import("")`)

        // case SyntaxKind.ImportDeclaration:
        // case SyntaxKind.ExportDeclaration:
        // case SyntaxKind.ExternalModuleReference:
        // case SyntaxKind.JSDocImportTag:
        //     // Get all known external module names or complete a path to a module
        //     // i.e. import * as ns from "/*completion position*/";
        //     //      var y = import("/*completion position*/");
        //     //      import x = require("/*completion position*/");
        //     //      var y = require("/*completion position*/");
        //     //      export * from "/*completion position*/";
        //     return { kind: StringLiteralCompletionKind.Paths, paths: getStringLiteralCompletionsFromModuleNames(sourceFile, node, program, host, preferences) };
        case SyntaxKind.CaseClause:
            const tracker = newCaseClauseTracker(typeChecker, (parent as CaseClause).parent.clauses);
            const contextualTypes = fromContextualType();
            if (!contextualTypes) {
                return;
            }
            const literals = contextualTypes.types.filter(literal => !tracker.hasValue(literal.value));
            return { kind: StringLiteralCompletionKind.Types, types: literals, isNewIdentifier: false };
        default:
            return fromContextualType() || fromContextualType(ContextFlags.None);
    }

    function fromUnionableLiteralType(grandParent: Node): StringLiteralCompletionsFromTypes | StringLiteralCompletionsFromProperties | undefined {
        switch (grandParent.kind) {
            // case SyntaxKind.ExpressionWithTypeArguments:
            // case SyntaxKind.TypeReference: {
            //     const typeArgument = findAncestor(parent, n => n.parent === grandParent) as LiteralTypeNode;
            //     if (typeArgument) {
            //         return { kind: StringLiteralCompletionKind.Types, types: getStringLiteralTypes(typeChecker.getTypeArgumentConstraint(typeArgument)), isNewIdentifier: false };
            //     }
            //     return undefined;
            // }
            case SyntaxKind.IndexedAccessType:
                // Get all apparent property names
                // i.e. interface Foo {
                //          foo: string;
                //          bar: string;
                //      }
                //      let x: Foo["/*completion position*/"]
                const { indexType, objectType } = grandParent as IndexedAccessTypeNode;
                if (!rangeContainsPosition(indexType, position)) {
                    return undefined;
                }
                return stringLiteralCompletionsFromProperties(typeChecker.getTypeFromTypeNode(objectType));
            case SyntaxKind.UnionType: {
                const result = fromUnionableLiteralType(walkUpParentheses(grandParent.parent));
                if (!result) {
                    return undefined;
                }
                const alreadyUsedTypes = getAlreadyUsedTypesInStringLiteralUnion(grandParent as UnionTypeNode, parent as LiteralTypeNode);
                if (result.kind === StringLiteralCompletionKind.Properties) {
                    return { kind: StringLiteralCompletionKind.Properties, symbols: result.symbols.filter(sym => !contains(alreadyUsedTypes, sym.name)), hasIndexSignature: result.hasIndexSignature };
                }
                return { kind: StringLiteralCompletionKind.Types, types: result.types.filter(t => !contains(alreadyUsedTypes, t.value)), isNewIdentifier: false };
            }
            default:
                return undefined;
        }
    }

    function fromContextualType(contextFlags: ContextFlags = ContextFlags.Completions): StringLiteralCompletionsFromTypes | undefined {
        // Get completion for string literal from string literal type
        // i.e. var x: "hi" | "hello" = "/*completion position*/"
        const types = getStringLiteralTypes(getContextualTypeFromParent(node, typeChecker, contextFlags));
        if (!types.length) {
            return;
        }
        return { kind: StringLiteralCompletionKind.Types, types, isNewIdentifier: false };
    }
}

function getStringLiteralTypes(type: Type | undefined, uniques = new Map<string, true>()): readonly StringLiteralType[] {
    if (!type) return emptyArray;
    type = skipConstraint(type);
    return type.isUnion() ? flatMap(type.types, t => getStringLiteralTypes(t, uniques)) :
        type.isStringLiteral() && !(type.flags & TypeFlags.EnumLiteral) && addToSeen(uniques, type.value) ? [type] : emptyArray;
}

function stringLiteralCompletionsFromProperties(type: Type | undefined): StringLiteralCompletionsFromProperties | undefined {
    return type && {
        kind: StringLiteralCompletionKind.Properties,
        symbols: filter(type.getApparentProperties(), prop => true),//!(prop.valueDeclaration && isPrivateIdentifierClassElementDeclaration(prop.valueDeclaration))),
        hasIndexSignature: hasIndexSignature(type),
    };
}

function getStringLiteralCompletionsFromSignature(call: CallLikeExpression, arg: StringLiteralLike, argumentInfo: SignatureHelp.ArgumentInfoForCompletions, checker: TypeChecker): StringLiteralCompletionsFromTypes | undefined {
    let isNewIdentifier = false;
    const uniques = new Map<string, true>();
    const editingArgument = arg;// isJsxOpeningLikeElement(call) ? Debug.checkDefined(findAncestor(arg.parent, isJsxAttribute)) : arg;
    const candidates = checker.getCandidateSignaturesForStringLiteralCompletions(call, editingArgument);
    const types = [];
    // const types = flatMap(candidates, candidate => {
    //     if (!signatureHasRestParameter(candidate) && argumentInfo.argumentCount > candidate.parameters.length) return;
    //     let type = candidate.getTypeParameterAtPosition(argumentInfo.argumentIndex);        
    //     isNewIdentifier = isNewIdentifier || !!(type.flags & TypeFlags.String);
    //     return getStringLiteralTypes(type, uniques);
    // });
    return length(types) ? { kind: StringLiteralCompletionKind.Types, types, isNewIdentifier } : undefined;
}

function getAlreadyUsedTypesInStringLiteralUnion(union: UnionTypeNode, current: LiteralTypeNode): readonly string[] {
    return mapDefined(union.types, type => type !== current && isLiteralTypeNode(type) && isStringLiteral(type.literal) ? type.literal.text : undefined);
}

/** @internal */
export function getStringLiteralCompletionDetails(name: string, sourceFile: SourceFile, position: number, contextToken: Node | undefined, program: Program, host: LanguageServiceHost, cancellationToken: CancellationToken, preferences: UserPreferences) {
    if (!contextToken || !isStringLiteralLike(contextToken)) return undefined;
    const completions = getStringLiteralCompletionEntries(sourceFile, contextToken, position, program, host, preferences);
    return completions && stringLiteralCompletionDetails(name, contextToken, completions, sourceFile, program.getTypeChecker(), cancellationToken);
}

function stringLiteralCompletionDetails(name: string, location: Node, completion: StringLiteralCompletion, sourceFile: SourceFile, checker: TypeChecker, cancellationToken: CancellationToken): CompletionEntryDetails | undefined {
    switch (completion.kind) {
        case StringLiteralCompletionKind.Paths: {
            const match = find(completion.paths, p => p.name === name);
            return match && createCompletionDetails(name, kindModifiersFromExtension(match.extension), match.kind, [textPart(name)]);
        }
        case StringLiteralCompletionKind.Properties: {
            const match = find(completion.symbols, s => s.name === name);
            return match && createCompletionDetailsForSymbol(match, match.name, checker, sourceFile, location, cancellationToken);
        }
        case StringLiteralCompletionKind.Types:
            return find(completion.types, t => t.value === name) ? createCompletionDetails(name, ScriptElementKindModifier.none, ScriptElementKind.string, [textPart(name)]) : undefined;
        default:
            return Debug.assertNever(completion);
    }
}
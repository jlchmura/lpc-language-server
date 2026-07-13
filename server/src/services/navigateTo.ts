import {
    CancellationToken,
    compareStringsCaseSensitiveUI,
    compareValues,
    createPatternMatcher,
    createTextSpanFromNode,
    Declaration,
    declarationNameToString,
    emptyArray,
    getContainerNode,
    getNameOfDeclaration,
    getNodeKind,
    getNodeModifiers,
    NavigateToItem,
    PatternMatchKind,
    ScriptElementKind,
    SourceFile,
    TypeChecker,
} from "./_namespaces/lpc";

interface RawNavigateToItem {
    readonly name: string;
    readonly fileName: string;
    readonly matchKind: PatternMatchKind;
    readonly isCaseSensitive: boolean;
    readonly declaration: Declaration;
}

/**
 * Collects the declarations across `sourceFiles` whose names fuzzy-match `searchValue`.
 *
 * Only files already present in the program are searched; the lazy language server is
 * responsible for pulling candidate files into the program (via a raw-text prescan) before
 * calling this. See the "navto" handler in the server session.
 */
export function getNavigateToItems(
    sourceFiles: readonly SourceFile[],
    _checker: TypeChecker,
    cancellationToken: CancellationToken,
    searchValue: string,
    maxResultCount: number | undefined,
    excludeDtsFiles: boolean,
): NavigateToItem[] {
    const patternMatcher = createPatternMatcher(searchValue);
    if (!patternMatcher) return emptyArray;
    const rawItems: RawNavigateToItem[] = [];

    for (const sourceFile of sourceFiles) {
        cancellationToken.throwIfCancellationRequested();

        if (excludeDtsFiles && sourceFile.isDeclarationFile) {
            continue;
        }

        sourceFile.getNamedDeclarations().forEach((declarations, name) => {
            const match = patternMatcher.getMatch(name);
            if (!match) return;

            for (const declaration of declarations) {
                rawItems.push({
                    name,
                    fileName: sourceFile.fileName,
                    matchKind: match.kind,
                    isCaseSensitive: match.isCaseSensitive,
                    declaration,
                });
            }
        });
    }

    rawItems.sort(compareNavigateToItems);
    const items = maxResultCount === undefined ? rawItems : rawItems.slice(0, maxResultCount);
    return items.map(createNavigateToItem);
}

function compareNavigateToItems(i1: RawNavigateToItem, i2: RawNavigateToItem): number {
    return compareValues(i1.matchKind, i2.matchKind)
        || compareStringsCaseSensitiveUI(i1.name, i2.name);
}

function patternMatchKindToString(kind: PatternMatchKind): NavigateToItem["matchKind"] {
    switch (kind) {
        case PatternMatchKind.exact: return "exact";
        case PatternMatchKind.prefix: return "prefix";
        case PatternMatchKind.substring: return "substring";
        case PatternMatchKind.camelCase: return "camelCase";
    }
}

function createNavigateToItem(rawItem: RawNavigateToItem): NavigateToItem {
    const declaration = rawItem.declaration;
    const container = getContainerNode(declaration);
    const containerName = container && getNameOfDeclaration(container);
    return {
        name: rawItem.name,
        kind: getNodeKind(declaration),
        kindModifiers: getNodeModifiers(declaration),
        matchKind: patternMatchKindToString(rawItem.matchKind),
        isCaseSensitive: rawItem.isCaseSensitive,
        fileName: rawItem.fileName,
        textSpan: createTextSpanFromNode(declaration),
        containerName: containerName ? declarationNameToString(containerName) : "",
        containerKind: container ? getNodeKind(container) : ScriptElementKind.unknown,
    };
}

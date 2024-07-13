import { SymbolLinks, CancellationToken, createSymbolTable, Declaration, EmitTextWriter, ModifierFlags, Node, NodeFlags, objectAllocator, Scanner, Signature, SignatureKind, SymbolFlags, TypeChecker, TypeCheckerHost, TypeFormatFlags, TypeParameter, CheckFlags, TransientSymbol, TransientSymbolLinks, reduceLeft, bindSourceFile, SourceFile, Diagnostic, createDiagnosticCollection, concatenate, forEach, tracing, performance } from "./_namespaces/lpc";

/** @internal */
export function createTypeChecker(host: TypeCheckerHost): TypeChecker {
    // Why var? It avoids TDZ checks in the runtime which can be costly.
    // See: https://github.com/microsoft/TypeScript/issues/52924
    /* eslint-disable no-var */
    var deferredDiagnosticsCallbacks: (() => void)[] = [];

    var addLazyDiagnostic = (arg: () => void) => {
        deferredDiagnosticsCallbacks.push(arg);
    };

    // Cancellation that controls whether or not we can cancel in the middle of type checking.
    // In general cancelling is *not* safe for the type checker.  We might be in the middle of
    // computing something, and we will leave our internals in an inconsistent state.  Callers
    // who set the cancellation token should catch if a cancellation exception occurs, and
    // should throw away and create a new TypeChecker.
    //
    // Currently we only support setting the cancellation token when getting diagnostics.  This
    // is because diagnostics can be quite expensive, and we want to allow hosts to bail out if
    // they no longer need the information (for example, if the user started editing again).
    var cancellationToken: CancellationToken | undefined;

    var scanner: Scanner | undefined;

    var Symbol = objectAllocator.getSymbolConstructor();
    var Type = objectAllocator.getTypeConstructor();
    var Signature = objectAllocator.getSignatureConstructor();

    var typeCount = 0;
    var symbolCount = 0;
    var totalInstantiationCount = 0;
    var instantiationCount = 0;
    var instantiationDepth = 0;
    var inlineLevel = 0;
    var currentNode: Node | undefined;
    var varianceTypeParameter: TypeParameter | undefined;
    var isInferencePartiallyBlocked = false;

    var emptySymbols = createSymbolTable();

    var compilerOptions = host.getCompilerOptions();
    
    var globals = createSymbolTable();
    var undefinedSymbol = createSymbol(SymbolFlags.Property, "undefined" as string);
    undefinedSymbol.declarations = [];

    var globalThisSymbol = createSymbol(SymbolFlags.Module, "globalThis" as string, CheckFlags.Readonly);
    globalThisSymbol.exports = globals;
    globalThisSymbol.declarations = [];
    globals.set(globalThisSymbol.name, globalThisSymbol);

    var argumentsSymbol = createSymbol(SymbolFlags.Property, "arguments" as string);
    var requireSymbol = createSymbol(SymbolFlags.Property, "require" as string);    

    /** This will be set during calls to `getResolvedSignature` where services determines an apparent number of arguments greater than what is actually provided. */
    var apparentArgumentCount: number | undefined;

    var lastGetCombinedNodeFlagsNode: Node | undefined;
    var lastGetCombinedNodeFlagsResult = NodeFlags.None;
    var lastGetCombinedModifierFlagsNode: Declaration | undefined;
    var lastGetCombinedModifierFlagsResult = ModifierFlags.None;

    var diagnostics = createDiagnosticCollection();
    var suggestionDiagnostics = createDiagnosticCollection();

    const checker:TypeChecker = {
        getNodeCount: () => reduceLeft(host.getSourceFiles(), (n, s) => n + s.nodeCount, 0),
        getIdentifierCount: () => reduceLeft(host.getSourceFiles(), (n, s) => n + s.identifierCount, 0),
        getSymbolCount: () => reduceLeft(host.getSourceFiles(), (n, s) => n + s.symbolCount, symbolCount),
        getTypeCount: () => typeCount,
        getInstantiationCount: () => totalInstantiationCount,
        signatureToString,
        getDiagnostics
    };

    initializeTypeChecker();

    return checker;

    function initializeTypeChecker() {
        // Bind all source files and propagate errors
        for (const file of host.getSourceFiles()) {
            bindSourceFile(file, compilerOptions);
        }

        // TODO
    }

    function getDiagnostics(sourceFile: SourceFile, ct: CancellationToken, nodesToCheck?: Node[]): Diagnostic[] {
        try {
            // Record the cancellation token so it can be checked later on during checkSourceElement.
            // Do this in a finally block so we can ensure that it gets reset back to nothing after
            // this call is done.
            cancellationToken = ct;
            return getDiagnosticsWorker(sourceFile, nodesToCheck);
        }
        finally {
            cancellationToken = undefined;
        }
    }

    function getDiagnosticsWorker(sourceFile: SourceFile, nodesToCheck: Node[] | undefined): Diagnostic[] {
        if (sourceFile) {
            ensurePendingDiagnosticWorkComplete();
            // Some global diagnostics are deferred until they are needed and
            // may not be reported in the first call to getGlobalDiagnostics.
            // We should catch these changes and report them.
            const previousGlobalDiagnostics = diagnostics.getGlobalDiagnostics();
            const previousGlobalDiagnosticsSize = previousGlobalDiagnostics.length;

            checkSourceFileWithEagerDiagnostics(sourceFile, nodesToCheck);
            const semanticDiagnostics = diagnostics.getDiagnostics(sourceFile.fileName);
            if (nodesToCheck) {
                // No need to get global diagnostics.
                return semanticDiagnostics;
            }
            const currentGlobalDiagnostics = diagnostics.getGlobalDiagnostics();
            if (currentGlobalDiagnostics !== previousGlobalDiagnostics) {
                // If the arrays are not the same reference, new diagnostics were added.
                // TODO:
                // const deferredGlobalDiagnostics = relativeComplement(previousGlobalDiagnostics, currentGlobalDiagnostics, compareDiagnostics);
                // return concatenate(deferredGlobalDiagnostics, semanticDiagnostics);
            }
            else if (previousGlobalDiagnosticsSize === 0 && currentGlobalDiagnostics.length > 0) {
                // If the arrays are the same reference, but the length has changed, a single
                // new diagnostic was added as DiagnosticCollection attempts to reuse the
                // same array.
                return concatenate(currentGlobalDiagnostics, semanticDiagnostics);
            }

            return semanticDiagnostics;
        }

        // Global diagnostics are always added when a file is not provided to
        // getDiagnostics
        forEach(host.getSourceFiles(), file => checkSourceFileWithEagerDiagnostics(file));
        return diagnostics.getDiagnostics();
    }

    function checkSourceFile(node: SourceFile, nodesToCheck: Node[] | undefined) {
        tracing?.push(tracing.Phase.Check, nodesToCheck ? "checkSourceFileNodes" : "checkSourceFile", { path: node.path }, /*separateBeginAndEnd*/ true);
        const beforeMark = nodesToCheck ? "beforeCheckNodes" : "beforeCheck";
        const afterMark = nodesToCheck ? "afterCheckNodes" : "afterCheck";
        performance.mark(beforeMark);
        nodesToCheck ? checkSourceFileNodesWorker(node, nodesToCheck) : checkSourceFileWorker(node);
        performance.mark(afterMark);
        performance.measure("Check", beforeMark, afterMark);
        tracing?.pop();
    }

    // Fully type check a source file and collect the relevant diagnostics.
    function checkSourceFileWorker(node: SourceFile) {
        // TODO
        console.warn("Implement me");
    }
    
    function checkSourceFileNodesWorker(file: SourceFile, nodes: readonly Node[]) {
        // TODO
        console.warn("Implement me");
    }
    
    function checkSourceFileWithEagerDiagnostics(sourceFile: SourceFile, nodesToCheck?: Node[]) {
        ensurePendingDiagnosticWorkComplete();
        // then setup diagnostics for immediate invocation (as we are about to collect them, and
        // this avoids the overhead of longer-lived callbacks we don't need to allocate)
        // This also serves to make the shift to possibly lazy diagnostics transparent to serial command-line scenarios
        // (as in those cases, all the diagnostics will still be computed as the appropriate place in the tree,
        // thus much more likely retaining the same union ordering as before we had lazy diagnostics)
        const oldAddLazyDiagnostics = addLazyDiagnostic;
        addLazyDiagnostic = cb => cb();
        checkSourceFile(sourceFile, nodesToCheck);
        addLazyDiagnostic = oldAddLazyDiagnostics;
    }
    
    function ensurePendingDiagnosticWorkComplete() {
        // Invoke any existing lazy diagnostics to add them, clear the backlog of diagnostics
        for (const cb of deferredDiagnosticsCallbacks) {
            cb();
        }
        deferredDiagnosticsCallbacks = [];
    }

    function createSymbol(flags: SymbolFlags, name: string, checkFlags?: CheckFlags) {
        symbolCount++;
        const symbol = new Symbol(flags | SymbolFlags.Transient, name) as TransientSymbol;
        symbol.links = new SymbolLinks() as TransientSymbolLinks;
        symbol.links.checkFlags = checkFlags || CheckFlags.None;
        return symbol;
    }

    function signatureToString(signature: Signature, enclosingDeclaration?: Node, flags = TypeFormatFlags.None, kind?: SignatureKind, writer?: EmitTextWriter): string {
        return "n/a"; // TODO
    }
}

const SymbolLinks = class implements SymbolLinks {
    declare _symbolLinksBrand: any;
};

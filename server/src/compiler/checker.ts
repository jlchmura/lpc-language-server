import { SymbolLinks, CancellationToken, createSymbolTable, Declaration, EmitTextWriter, ModifierFlags, Node, NodeFlags, objectAllocator, Scanner, Signature, SignatureKind, SymbolFlags, TypeChecker, TypeCheckerHost, TypeFormatFlags, TypeParameter, CheckFlags, TransientSymbol, TransientSymbolLinks, reduceLeft, bindSourceFile } from "./_namespaces/lpc";

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

    const checker:TypeChecker = {
        getNodeCount: () => reduceLeft(host.getSourceFiles(), (n, s) => n + s.nodeCount, 0),
        getIdentifierCount: () => reduceLeft(host.getSourceFiles(), (n, s) => n + s.identifierCount, 0),
        getSymbolCount: () => reduceLeft(host.getSourceFiles(), (n, s) => n + s.symbolCount, symbolCount),
        getTypeCount: () => typeCount,
        getInstantiationCount: () => totalInstantiationCount,
        signatureToString
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

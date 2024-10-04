import { getModuleSpecifierResolverHost, LanguageServiceHost, Program, SymbolTracker } from "../_namespaces/lpc";

/** @internal */
export function getNoopSymbolTrackerWithResolver(context: TypeConstructionContext): SymbolTracker {
    return {
        trackSymbol: () => false,
        moduleResolverHost: getModuleSpecifierResolverHost(context.program, context.host),
    };
}


/** @internal */
export interface TypeConstructionContext {
    program: Program;
    host: LanguageServiceHost;
}
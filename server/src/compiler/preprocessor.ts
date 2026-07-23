import { Macro } from "./_namespaces/lpc.js";

/**
 * Records which macros a stretch of parsing consulted. A "definedness" read is
 * produced by `#ifdef`/`#ifndef`/`defined()` (only the defined-or-not state was
 * observed); a "value" read is produced when a macro is actually expanded (its
 * body was observed). The union of these names is the dependency set used to
 * fingerprint an `#include` for the header-parse cache -- if none of those macros
 * changed between two includers, the header parses identically and the cached
 * parse can be reused. See the preprocessor design notes.
 */
export interface MacroReadScope {
    /** names whose defined/undefined state was observed */
    definedness: Set<string>;
    /** names whose expansion (body) was observed */
    values: Set<string>;
}

/**
 * Owns the macro table and mediates every access to it. Reads flow through
 * `isDefined`/`lookup` so they can be recorded into the active read scope;
 * `hasRaw`/`getRaw` are untracked and exist for bookkeeping that is not a
 * semantic dependency (e.g. redefinition checks).
 */
export interface MacroEnvironment {
    define(name: string, macro: Macro): void;
    undef(name: string): void;

    /** tracked: records a definedness read against the active scope */
    isDefined(name: string): boolean;
    /** tracked: records a value read against the active scope when `name` is defined */
    lookup(name: string): Macro | undefined;

    /** untracked lookup -- use when the access is not a semantic dependency */
    hasRaw(name: string): boolean;
    /** untracked lookup -- use when the access is not a semantic dependency */
    getRaw(name: string): Macro | undefined;

    forEach(cb: (macro: Macro, name: string) => void): void;

    /** begin capturing reads; scopes nest, inner reads bubble up to outer scopes */
    pushReadScope(): void;
    /** stop capturing the innermost scope and return what it observed */
    popReadScope(): MacroReadScope;

    clear(): void;
}

export function createMacroEnvironment(): MacroEnvironment {
    const table = new Map<string, Macro>();
    // Stack of active read scopes. Empty in the common case (no capture), so the
    // hot lookup path pays nothing beyond a length check.
    const readScopes: MacroReadScope[] = [];

    function recordDefinedness(name: string) {
        for (let i = 0; i < readScopes.length; i++) {
            readScopes[i].definedness.add(name);
        }
    }

    function recordValue(name: string) {
        for (let i = 0; i < readScopes.length; i++) {
            readScopes[i].values.add(name);
        }
    }

    return {
        define(name, macro) {
            table.set(name, macro);
        },
        undef(name) {
            table.delete(name);
        },
        isDefined(name) {
            if (readScopes.length) recordDefinedness(name);
            return table.has(name);
        },
        lookup(name) {
            const macro = table.get(name);
            if (macro && readScopes.length) recordValue(name);
            return macro;
        },
        hasRaw(name) {
            return table.has(name);
        },
        getRaw(name) {
            return table.get(name);
        },
        forEach(cb) {
            table.forEach(cb);
        },
        pushReadScope() {
            readScopes.push({ definedness: new Set(), values: new Set() });
        },
        popReadScope() {
            return readScopes.pop() ?? { definedness: new Set(), values: new Set() };
        },
        clear() {
            table.clear();
            readScopes.length = 0;
        },
    };
}

import { createScanner, LanguageVariant, Macro, Node, NodeArray, ScriptTarget, SyntaxKind } from "./_namespaces/lpc.js";

/**
 * Records the macro dependencies of a stretch of parsing: for each macro name the
 * parse consulted, the macro's state *at the moment of first read* -- which, for a
 * header, is its state at the include point, before the header itself can redefine
 * it. Reuse of a cached header parse is valid exactly when every recorded name still
 * has that same state (`matchesCurrentState`), so an includer that defines one of the
 * header's dependencies differently forces a fresh parse.
 *
 * Capturing state-at-first-read (rather than hashing current state) is what makes
 * include guards cacheable: `#ifndef FOO_H` records FOO_H as *undefined*; the guarded
 * `#define FOO_H` that follows does not change the recorded value, so a second
 * includer (where FOO_H is likewise undefined at the include point) still matches.
 */
export interface MacroReadScope {
    /** macro name -> encoded state observed at first read (see `encodeState`) */
    observed: Map<string, string>;
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

    /** tracked: records `name`'s state at first read against the active scope(s) */
    isDefined(name: string): boolean;
    /**
     * tracked: records `name`'s state at first read (referencing a name is a
     * dependency on it not silently becoming -- or ceasing to be -- a macro, and on
     * its body when it is one). Returns the macro or undefined.
     */
    lookup(name: string): Macro | undefined;

    /**
     * True when every name `scope` recorded still has the same state now as when it
     * was first read. This is the reuse test for a cached header parse.
     */
    matchesCurrentState(scope: MacroReadScope): boolean;

    /** untracked lookup -- use when the access is not a semantic dependency */
    hasRaw(name: string): boolean;
    /** untracked lookup -- use when the access is not a semantic dependency */
    getRaw(name: string): Macro | undefined;

    forEach(cb: (macro: Macro, name: string) => void): void;

    /** begin capturing reads; scopes nest, inner reads bubble up to outer scopes */
    pushReadScope(): void;
    /** stop capturing the innermost scope and return what it observed */
    popReadScope(): MacroReadScope;

    /**
     * Record reads for `names` into the active scope(s) using their current state.
     * Used when a nested `#include` is served from cache during an outer header's
     * caching parse: the nested header's dependencies must still fold into the outer
     * header's fingerprint, even though it was not re-parsed.
     */
    noteReads(names: Iterable<string>): void;

    clear(): void;
}

// ---------------------------------------------------------------------------
// Deep clone of parsed subtrees (for the #include header-parse cache)
//
// A cached header parse can be reused across every file that includes it, but AST
// nodes cannot be shared: the binder stamps `symbol`/`locals`/`parent` onto each
// node per includer. So each reuse takes an independent deep copy of a *pristine,
// unbound* master snapshot. This clone is structural and generic (it does not
// enumerate node types): it copies own properties, recursing into any Node/NodeArray
// value, and re-establishes `parent` afterwards. It is only valid on freshly parsed,
// unbound trees -- before binding introduces back-references and cycles beyond
// `parent`.
// ---------------------------------------------------------------------------

function isNodeLike(v: any): v is Node {
    return !!v && typeof v === "object" && typeof v.kind === "number" && !Array.isArray(v);
}

/**
 * Deep-clone a property value, threading `parent` (the enclosing node's clone) so
 * child nodes get their `parent` set in this single pass -- no separate
 * `setParentRecursive` traversal.
 */
function cloneValue(v: any, parent: Node | undefined, map: Map<Node, Node> | undefined): any {
    if (isNodeLike(v)) return cloneNodeDeep(v, parent, map);
    if (Array.isArray(v)) {
        const n = v.length;
        const arr: any = new Array(n);
        for (let i = 0; i < n; i++) arr[i] = cloneValue(v[i], parent, map);
        // Preserve NodeArray metadata when present (plain arrays simply lack these).
        const na = v as any;
        if (typeof na.pos === "number") {
            arr.pos = na.pos;
            arr.end = na.end;
            arr.hasTrailingComma = na.hasTrailingComma;
            arr.transformFlags = na.transformFlags;
        }
        return arr;
    }
    return v;
}

/**
 * Deep-clone a single node, setting `parent` inline. The clone keeps the node's
 * prototype so class methods (getStart, getSourceFile, ...) and `instanceof` work.
 */
function cloneNodeDeep<T extends Node>(node: T, parent: Node | undefined, map: Map<Node, Node> | undefined): T {
    const clone: any = Object.create(Object.getPrototypeOf(node));
    if (map) map.set(node, clone);
    const keys = Object.keys(node);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key === "parent") continue;
        clone[key] = cloneValue((node as any)[key], clone, map);
    }
    clone.parent = parent;
    return clone;
}

/**
 * Deep-clone an array of freshly-parsed statements, returning independent nodes with
 * `parent` pointers established in a single pass. Positions are left untouched (the
 * header parses in its own coordinate space, identical for every includer). The roots'
 * own `parent` is left undefined for the caller to set (to the include directive). If
 * `map` is provided it is populated with original->clone for every node, so callers can
 * remap references (e.g. import candidates / inherit declarations) into the clone.
 */
export function cloneParsedNodes<T extends Node>(nodes: readonly T[], map?: Map<Node, Node>): T[] {
    const n = nodes.length;
    const clones: T[] = new Array(n);
    for (let i = 0; i < n; i++) clones[i] = cloneNodeDeep(nodes[i], /*parent*/ undefined, map);
    return clones;
}

/** A raw preprocessor token: the scanner kind plus its source text (for identifiers/literals). */
export interface PreprocessorToken {
    kind: SyntaxKind;
    value: string;
}

/**
 * Evaluate a `#if`/`#elif` controlling constant-expression to a boolean (non-zero => true).
 *
 * Handles the `defined X` / `defined(X)` operator (its operand is never expanded),
 * object-like macro expansion (recursively, with a re-entrancy guard), the full C
 * constant-expression operator set (unary `! ~ - +`; binary `* / % + - << >> < <= >
 * >= == != & ^ | && ||`; ternary `?:`; parentheses), and integer literals. Any
 * identifier that survives expansion (an undefined or function-like macro) evaluates
 * to 0, matching C. Every macro consulted is recorded through `env`, so the read set
 * captured around an `#include` reflects exactly what the conditionals depended on.
 *
 * Defensive by design: malformed input never throws -- it evaluates to whatever has
 * been parsed so far -- so a bad `#if` degrades gracefully instead of breaking parsing.
 */
export function evaluatePreprocessorCondition(tokens: readonly PreprocessorToken[], env: MacroEnvironment): boolean {
    const expanded = expandConditionTokens(tokens, env, new Set());

    let pos = 0;
    const peek = () => expanded[pos];
    const next = () => expanded[pos++];
    const atEnd = () => pos >= expanded.length;

    function parseExpr(): number {
        return parseTernary();
    }

    function parseTernary(): number {
        const cond = parseBinary(0);
        if (!atEnd() && peek().kind === SyntaxKind.QuestionToken) {
            next(); // ?
            const whenTrue = parseExpr();
            if (!atEnd() && peek().kind === SyntaxKind.ColonToken) next(); // :
            const whenFalse = parseTernary();
            return cond !== 0 ? whenTrue : whenFalse;
        }
        return cond;
    }

    // Precedence climbing over the binary operators, lowest binding first.
    function parseBinary(minLevel: number): number {
        let left = parseUnary();
        while (!atEnd()) {
            const level = binaryLevel(peek().kind);
            if (level < 0 || level < minLevel) break;
            const op = next().kind;
            const right = parseBinary(level + 1);
            left = applyBinary(op, left, right);
        }
        return left;
    }

    function parseUnary(): number {
        if (atEnd()) return 0;
        const k = peek().kind;
        switch (k) {
            case SyntaxKind.ExclamationToken: next(); return parseUnary() === 0 ? 1 : 0;
            case SyntaxKind.TildeToken: next(); return ~parseUnary();
            case SyntaxKind.MinusToken: next(); return -parseUnary();
            case SyntaxKind.PlusToken: next(); return +parseUnary();
        }
        return parsePrimary();
    }

    function parsePrimary(): number {
        if (atEnd()) return 0;
        const t = next();
        if (t.kind === SyntaxKind.OpenParenToken) {
            const inner = parseExpr();
            if (!atEnd() && peek().kind === SyntaxKind.CloseParenToken) next();
            return inner;
        }
        if (t.kind === SyntaxKind.IntLiteral || t.kind === SyntaxKind.CharLiteral) {
            return parseIntValue(t.value);
        }
        // Any surviving identifier (undefined macro, or a function-like macro not
        // invoked as a call) is 0, per C preprocessor semantics.
        return 0;
    }

    const result = atEnd() && !expanded.length ? 0 : parseExpr();
    return result !== 0;
}

function binaryLevel(kind: SyntaxKind): number {
    switch (kind) {
        case SyntaxKind.BarBarToken: return 1;
        case SyntaxKind.AmpersandAmpersandToken: return 2;
        case SyntaxKind.BarToken: return 3;
        case SyntaxKind.CaretToken: return 4;
        case SyntaxKind.AmpersandToken: return 5;
        case SyntaxKind.EqualsEqualsToken:
        case SyntaxKind.ExclamationEqualsToken: return 6;
        case SyntaxKind.LessThanToken:
        case SyntaxKind.LessThanEqualsToken:
        case SyntaxKind.GreaterThanToken:
        case SyntaxKind.GreaterThanEqualsToken: return 7;
        case SyntaxKind.LessThanLessThanToken:
        case SyntaxKind.GreaterThanGreaterThanToken: return 8;
        case SyntaxKind.PlusToken:
        case SyntaxKind.MinusToken: return 9;
        case SyntaxKind.AsteriskToken:
        case SyntaxKind.SlashToken:
        case SyntaxKind.PercentToken: return 10;
    }
    return -1;
}

function applyBinary(op: SyntaxKind, a: number, b: number): number {
    switch (op) {
        case SyntaxKind.BarBarToken: return (a !== 0 || b !== 0) ? 1 : 0;
        case SyntaxKind.AmpersandAmpersandToken: return (a !== 0 && b !== 0) ? 1 : 0;
        case SyntaxKind.BarToken: return a | b;
        case SyntaxKind.CaretToken: return a ^ b;
        case SyntaxKind.AmpersandToken: return a & b;
        case SyntaxKind.EqualsEqualsToken: return a === b ? 1 : 0;
        case SyntaxKind.ExclamationEqualsToken: return a !== b ? 1 : 0;
        case SyntaxKind.LessThanToken: return a < b ? 1 : 0;
        case SyntaxKind.LessThanEqualsToken: return a <= b ? 1 : 0;
        case SyntaxKind.GreaterThanToken: return a > b ? 1 : 0;
        case SyntaxKind.GreaterThanEqualsToken: return a >= b ? 1 : 0;
        case SyntaxKind.LessThanLessThanToken: return a << b;
        case SyntaxKind.GreaterThanGreaterThanToken: return a >> b;
        case SyntaxKind.PlusToken: return a + b;
        case SyntaxKind.MinusToken: return a - b;
        case SyntaxKind.AsteriskToken: return a * b;
        case SyntaxKind.SlashToken: return b === 0 ? 0 : Math.trunc(a / b);
        case SyntaxKind.PercentToken: return b === 0 ? 0 : a % b;
    }
    return 0;
}

function parseIntValue(text: string): number {
    if (!text) return 0;
    // char literal e.g. 'a'
    if (text.length >= 3 && text[0] === "'") {
        return text.charCodeAt(1);
    }
    const n = /^0[xX]/.test(text) ? parseInt(text, 16) : Number(text);
    return Number.isFinite(n) ? Math.trunc(n) : 0;
}

function isIdentifierToken(t: PreprocessorToken): boolean {
    // Must be kind-based: punctuation tokens carry a *stale* `getTokenValue()` (the
    // scanner only refreshes it for identifiers/literals), so a value check would
    // misclassify e.g. `<` as whatever identifier preceded it. `defined` and macro
    // names both scan as Identifier.
    return t.kind === SyntaxKind.Identifier;
}

function tokenizeMacroBody(macro: Macro): PreprocessorToken[] {
    const text = macro.getText?.() ?? "";
    const range = macro.range;
    const body = range ? text.substring(range.pos, range.end) : text;
    const scanner = createScanner(ScriptTarget.Latest, /*skipTrivia*/ true, /*skipNonParsableDirectives*/ false, LanguageVariant.Standard, body);
    const out: PreprocessorToken[] = [];
    let k = scanner.scan();
    while (k !== SyntaxKind.EndOfFileToken) {
        out.push({ kind: k, value: scanner.getTokenValue() });
        k = scanner.scan();
    }
    return out;
}

/**
 * Resolve `defined` operators and expand object-like macros, producing a token list
 * ready for constant evaluation. `expanding` guards against recursive macro bodies.
 */
function expandConditionTokens(tokens: readonly PreprocessorToken[], env: MacroEnvironment, expanding: Set<string>): PreprocessorToken[] {
    const out: PreprocessorToken[] = [];
    for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];

        if (isIdentifierToken(t) && t.value === "defined") {
            // defined X  |  defined ( X )
            let j = i + 1;
            const hasParen = tokens[j]?.kind === SyntaxKind.OpenParenToken;
            if (hasParen) j++;
            const nameTok = tokens[j];
            let val = 0;
            if (nameTok && isIdentifierToken(nameTok)) {
                val = env.isDefined(nameTok.value) ? 1 : 0;
                j++;
                if (hasParen && tokens[j]?.kind === SyntaxKind.CloseParenToken) j++;
            }
            out.push({ kind: SyntaxKind.IntLiteral, value: String(val) });
            i = j - 1;
            continue;
        }

        if (isIdentifierToken(t)) {
            const macro = env.lookup(t.value);
            const isObjectLike = macro && macro.disabled !== true && macro.range && macro.arguments === undefined;
            if (isObjectLike && !expanding.has(t.value)) {
                expanding.add(t.value);
                const body = expandConditionTokens(tokenizeMacroBody(macro!), env, expanding);
                expanding.delete(t.value);
                for (const e of body) out.push(e);
                continue;
            }
            // `lookup` above already recorded the dependency (incl. the negative case
            // where this name must stay a non-macro). A surviving identifier is 0.
            out.push(t);
            continue;
        }

        out.push(t);
    }
    return out;
}

export function createMacroEnvironment(): MacroEnvironment {
    const table = new Map<string, Macro>();
    // Stack of active read scopes. Empty in the common case (no capture), so the
    // hot lookup path pays nothing beyond a length check.
    const readScopes: MacroReadScope[] = [];

    /** Encode a name's current state: "U" if undefined, else "D" + its body text. */
    function encodeState(name: string): string {
        const macro = table.get(name);
        if (!macro) return "U";
        const body = macro.range && macro.getText
            ? macro.getText().substring(macro.range.pos, macro.range.end)
            : "";
        return "D" + body;
    }

    /** Record `name`'s current state in every active scope that hasn't seen it yet. */
    function recordRead(name: string) {
        for (let i = 0; i < readScopes.length; i++) {
            const observed = readScopes[i].observed;
            if (!observed.has(name)) observed.set(name, encodeState(name));
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
            if (readScopes.length) recordRead(name);
            return table.has(name);
        },
        lookup(name) {
            if (readScopes.length) recordRead(name);
            return table.get(name);
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
        matchesCurrentState(scope) {
            for (const [name, observed] of scope.observed) {
                if (encodeState(name) !== observed) return false;
            }
            return true;
        },
        pushReadScope() {
            readScopes.push({ observed: new Map() });
        },
        popReadScope() {
            return readScopes.pop() ?? { observed: new Map() };
        },
        noteReads(names) {
            if (!readScopes.length) return;
            for (const name of names) recordRead(name);
        },
        clear() {
            table.clear();
            readScopes.length = 0;
        },
    };
}

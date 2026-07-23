import { createScanner, LanguageVariant, Macro, ScriptTarget, SyntaxKind } from "./_namespaces/lpc.js";

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
            if (!macro) {
                // record the dependency on this name being undefined
                env.isDefined(t.value);
            }
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

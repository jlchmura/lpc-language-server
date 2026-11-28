import { CompilerOptions, forEachChild, IncludeDirective, isIncludeDirective, LanguageVariant, Node, PragmaDirective, SourceFile, Statement, SyntaxKind } from "./_namespaces/lpc.js";

/**
 * The type-enforcing pragma in effect. LDMud has all three (`weak_types`, `strong_types`,
 * `strict_types`); FluffOS only has `strict_types`, which `no_strict_types` turns off.
 *
 * Neither driver decides *whether* a function body is type checked from the pragma: that
 * depends only on the function declaring a return type (`exact_types`, set in LDMud's
 * prolang.y `def_function_typecheck` and FluffOS's grammar_rules.cc `rule_func_type`).
 * The pragma makes a return type mandatory, and under LDMud's `strict_types` a
 * call_other result must be cast before it is used.
 */
export const enum DriverTypesPragma {
    Weak,
    Strong,
    Strict,
}

/** The driver pragmas in effect at one point of a file. */
export interface DriverPragmaState {
    readonly types: DriverTypesPragma;
    /**
     * `save_types`: the program keeps its functions' argument types, so a program that
     * inherits it can check calls against them. LDMud's `rtt_checks` turns it on too. Both
     * drivers read it at the end of the file, so it is {@link DriverPragmaStates.final}
     * that matters for an inherited program.
     */
    readonly saveTypes: boolean;
    /**
     * LDMud's `pedantic` (`sloppy` turns it off): among other things, a call to a function
     * the program has not declared is a warning even where `exact_types` is off (prolang.y).
     * FluffOS has no such pragma.
     */
    readonly pedantic: boolean;
    /**
     * LDMud's `warn_missing_return`, on by default (lex.c): warn when a typed, non-void
     * function can reach its end. The driver reads it when it reaches the end of the
     * function, so it is {@link DriverPragmaStates.stateAtEndOf} that matters.
     */
    readonly warnMissingReturn: boolean;
    /**
     * LDMud's `lightweight` (`no_lightweight` turns it off): the program can be made into
     * lightweight objects. The driver reads it when the program is done, so it is
     * {@link DriverPragmaStates.final} that matters.
     */
    readonly lightweight: boolean;
    /**
     * LDMud's `no_bytes_type` (`bytes_type` turns it off): `string` then means
     * `<string|bytes>` (doc/LPC/pragma). It applies to the types written while it is on.
     */
    readonly noBytesType: boolean;
    /**
     * LDMud's `warn_deprecated`, on by default (lex.c): warn about deprecated efuns and
     * names, such as `in` used as an identifier (prolang.y check_identifier).
     */
    readonly warnDeprecated: boolean;
}

export interface DriverPragmaStates {
    /** The state in force when the driver reaches `node`. */
    stateAt(node: Node): DriverPragmaState;
    /**
     * The state in force when the driver reaches the end of `node`, counting any `#pragma`
     * written inside the statement that holds it (a function body, say).
     */
    stateAtEndOf(node: Node): DriverPragmaState;
    /** The state at the end of the file. */
    readonly final: DriverPragmaState;
}

/**
 * The state a file starts in, before `defaultPragmas` and its own `#pragma` lines.
 * FluffOS's stock `DEFAULT_PRAGMAS` (src/local_options) includes `save_types`; LDMud's
 * lexer resets to weak types with nothing saved for every compile (lex.c `start_lex`).
 */
function getInitialDriverPragmaState(variant: LanguageVariant): DriverPragmaState {
    return { types: DriverTypesPragma.Weak, saveTypes: variant === LanguageVariant.FluffOS, pedantic: false, warnMissingReturn: variant === LanguageVariant.LDMud, lightweight: false, noBytesType: false, warnDeprecated: variant === LanguageVariant.LDMud };
}

/** Applies one pragma name to `state`, the way the driver's lexer would. */
export function applyDriverPragma(state: DriverPragmaState, name: string, variant: LanguageVariant): DriverPragmaState {
    if (variant === LanguageVariant.FluffOS) {
        // lexer_utils.cc handle_pragma: an exact name from its table, or `no_` + one.
        const negated = name.startsWith("no_");
        const base = negated ? name.slice(3) : name;
        switch (base) {
            case "strict_types":
                return { ...state, types: negated ? DriverTypesPragma.Weak : DriverTypesPragma.Strict };
            case "save_types":
                return { ...state, saveTypes: !negated };
        }
        return state;
    }

    // LDMud lex.c handle_pragma.
    switch (name) {
        case "weak_types":
            return { ...state, types: DriverTypesPragma.Weak };
        case "strong_types":
            return { ...state, types: DriverTypesPragma.Strong };
        case "strict_types":
            return { ...state, types: DriverTypesPragma.Strict };
        case "save_types":
        case "rtt_checks":
        case "warn_rtt_checks":
            return { ...state, saveTypes: true };
        case "pedantic":
            return { ...state, pedantic: true };
        case "sloppy":
            return { ...state, pedantic: false };
        case "warn_missing_return":
            return { ...state, warnMissingReturn: true };
        case "no_warn_missing_return":
            return { ...state, warnMissingReturn: false };
        case "lightweight":
            return { ...state, lightweight: true };
        case "no_lightweight":
            return { ...state, lightweight: false };
        case "no_bytes_type":
            return { ...state, noBytesType: true };
        case "bytes_type":
            return { ...state, noBytesType: false };
        case "warn_deprecated":
            return { ...state, warnDeprecated: true };
        case "no_warn_deprecated":
            return { ...state, warnDeprecated: false };
    }
    return state;
}

function applyPragmaDirective(state: DriverPragmaState, directive: PragmaDirective, variant: LanguageVariant): DriverPragmaState {
    const names = directive.expression ?? [];
    // FluffOS takes one pragma per line; `#pragma strict_types, warnings` is an unknown
    // pragma and is ignored as a whole. LDMud takes a comma-separated list.
    if (variant === LanguageVariant.FluffOS && names.length !== 1) return state;
    for (const name of names) {
        if (name.text) state = applyDriverPragma(state, name.text, variant);
    }
    return state;
}

/**
 * Works out which driver pragmas are in force at each top-level statement of `file`.
 *
 * Both drivers apply a `#pragma` when their lexer reaches it, so it holds from that line
 * on, and keep it in one global that an `#include` does not save or restore: a pragma
 * in an included header stays in force in the including file after the include.
 * `defaultPragmas` act as `#pragma` lines at the very top of the file.
 */
export function computeDriverPragmaStates(file: SourceFile, options: CompilerOptions, variant: LanguageVariant): DriverPragmaStates {
    let state = getInitialDriverPragmaState(variant);
    for (const name of options.defaultPragmas ?? []) {
        state = applyDriverPragma(state, name, variant);
    }
    const initial = state;
    const byStatement = new Map<Node, DriverPragmaState>();

    /** Applies the `#pragma` lines nested in `node` that start before `end`, in order. */
    const applyNested = (state: DriverPragmaState, node: Node, end: number): DriverPragmaState => {
        // Nodes inside an include carry positions in the included file, so only the
        // include itself is compared with `end`; everything in it comes before its end.
        const walk = (child: Node, limit: number): void => {
            if (child.pos >= limit) return;
            if (child.kind === SyntaxKind.PragmaDirective) {
                state = applyPragmaDirective(state, child as PragmaDirective, variant);
            }
            else {
                const childLimit = isIncludeDirective(child) ? Infinity : limit;
                forEachChild(child, grandchild => walk(grandchild, childLimit));
            }
        };
        forEachChild(node, child => walk(child, end));
        return state;
    };

    /** The statement that sits directly in the file or in an include and holds `node`. */
    const topLevelStatementOf = (node: Node): Node | undefined => {
        let current: Node | undefined = node;
        while (current?.parent && current.parent.kind !== SyntaxKind.SourceFile && current.parent.kind !== SyntaxKind.IncludeDirective) {
            current = current.parent;
        }
        return current;
    };

    const visit = (statements: readonly Statement[] | undefined) => {
        for (const statement of statements ?? []) {
            if (statement.kind === SyntaxKind.PragmaDirective) {
                state = applyPragmaDirective(state, statement as PragmaDirective, variant);
            }
            else if (isIncludeDirective(statement)) {
                visit((statement as IncludeDirective).statements);
            }
            else {
                byStatement.set(statement, state);
                // A pragma inside a function holds from there on, after the function too.
                state = applyNested(state, statement, statement.end);
            }
        }
    };
    visit(file.statements);

    return {
        final: state,
        stateAt(node: Node) {
            const statement = topLevelStatementOf(node);
            return (statement && byStatement.get(statement)) ?? initial;
        },
        stateAtEndOf(node: Node) {
            const statement = topLevelStatementOf(node);
            const start = (statement && byStatement.get(statement)) ?? initial;
            return statement ? applyNested(start, statement, node.end) : start;
        },
    };
}

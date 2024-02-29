import {
    BaseSymbol,
    ScopedSymbol,
    MethodSymbol as BaseMethodSymbol,
    ParameterSymbol,
    TypedSymbol,
    IType,
    TypeKind,
    ReferenceKind,
    SymbolConstructor,
    SymbolTable,
    IScopedSymbol,
} from "antlr4-c3";
import { SymbolKind } from "../types";
import * as vscodelang from "vscode-languageserver";
import { ContextSymbolTable } from "../backend/ContextSymbolTable";
import {
    AssignmentExpressionContext,
    DefinePreprocessorDirectiveContext,
    IdentifierExpressionContext,
    IncludeDirectiveContext,
    InheritStatementContext,
} from "../parser3/LPCParser";
import { ParseTree, ParserRuleContext } from "antlr4ng";

export type EvalScope = Map<string, any>;

export function getSymbolsOfTypeSync<
    T extends BaseSymbol,
    Args extends unknown[]
>(symbol: ScopedSymbol, t: SymbolConstructor<T, Args>): T[] {
    return symbol.children.filter((s) => s instanceof t) as T[];
}

export interface IFoldableSymbol extends BaseSymbol {
    foldingRange: vscodelang.FoldingRange;
}
export interface IHasValue extends BaseSymbol {
    setValue(value: any);
    getValue(value: any);
}

export interface IEvaluatableSymbol extends BaseSymbol {
    eval(scope?: any): any;
}
export function isInstanceOfIEvaluatableSymbol(
    symbol: BaseSymbol
): symbol is IEvaluatableSymbol {
    return (symbol as unknown as IEvaluatableSymbol).eval !== undefined;
}

export interface IKindSymbol extends BaseSymbol {
    kind: SymbolKind;
}
export function isInstanceOfIKindSymbol(
    symbol: BaseSymbol
): symbol is IKindSymbol {
    return (symbol as unknown as IKindSymbol).kind !== undefined;
}

class LpcBaseSymbol<C extends ParseTree = ParseTree>
    extends BaseSymbol
    implements IKindSymbol
{
    public get kind() {
        return SymbolKind.Unknown;
    }
    override context: C;
}

export class IdentifierSymbol extends LpcBaseSymbol<IdentifierExpressionContext> {
    public get kind() {
        return SymbolKind.Keyword;
    }
}
export class IncludeSymbol extends LpcBaseSymbol<IncludeDirectiveContext> {
    public get kind() {
        return SymbolKind.Include;
    }
}
export class InheritSymbol extends LpcBaseSymbol<InheritStatementContext> {
    public get kind() {
        return SymbolKind.Inherit;
    }
}

export class MethodParameterSymbol
    extends ParameterSymbol
    implements IKindSymbol, IEvaluatableSymbol
{
    eval() {
        return this.value;
    }

    public get kind() {
        return SymbolKind.Variable;
    }
}

export class MethodSymbol
    extends BaseMethodSymbol
    implements IFoldableSymbol, IKindSymbol, IEvaluatableSymbol
{
    public scope = new Map<string, VariableSymbol>();

    constructor(
        name: string,
        returnType?: IType,
        public functionModifiers?: Set<string>
    ) {
        super(name, returnType);
    }

    eval(paramScope: Map<string, IEvaluatableSymbol>) {
        // start with program scope

        this.scope = new Map<string, VariableSymbol>();
        paramScope.forEach((value, key) => {
            this.scope.set(key, value as VariableSymbol);
        });

        for (const child of this.children) {
            if (isInstanceOfIEvaluatableSymbol(child)) {
                child.eval(this.scope);
            } else {
                console.warn("Non eval symbol detected in method body", child);
            }
        }
    }

    public get kind() {
        return SymbolKind.Method;
    }

    public getParametersSync() {
        return getSymbolsOfTypeSync(this, MethodParameterSymbol);
    }

    foldingRange: vscodelang.FoldingRange;
}
export class MethodDeclarationSymbol
    extends MethodSymbol
    implements IKindSymbol
{
    public get kind() {
        return SymbolKind.MethodDeclaration;
    }
}
export class InlineClosureSymbol extends MethodSymbol implements IKindSymbol {
    public get kind() {
        return SymbolKind.InlineClosure;
    }
}
export class ArgumentSymbol extends TypedSymbol implements IKindSymbol {
    public get kind() {
        return SymbolKind.Variable;
    }
}

export class ExpressionSymbol extends ScopedSymbol {}
export class FunctionIdentifierSymbol
    extends ScopedSymbol
    implements IKindSymbol
{
    public get kind() {
        return SymbolKind.Keyword;
    }
}

/**
 * Represents an identifier symbol that refers back to a variable declared
 * in this or a parent scope.
 */
export class VariableIdentifierSymbol
    extends IdentifierSymbol
    implements IEvaluatableSymbol
{
    eval() {
        const def = this.findDeclaration() as IEvaluatableSymbol;
        return def?.eval();
    }
    public findDeclaration() {
        let defSymbol: BaseSymbol = resolveOfTypeSync(
            this.parent,
            this.name,
            VariableSymbol
        );
        defSymbol ??= resolveOfTypeSync(this.parent, this.name, DefineSymbol);
        return defSymbol;
    }
}
export class ObjectSymbol extends ScopedSymbol {
    public isLoaded: boolean = false;

    constructor(
        name: string,
        public filename: string,
        public type: ObjectType
    ) {
        super(name);
    }
}
export class DefineSymbol
    extends BaseSymbol
    implements IEvaluatableSymbol, IKindSymbol
{
    public get kind() {
        return SymbolKind.Define;
    }

    constructor(name: string, public value: any) {
        super(name);
    }

    eval() {
        return this.value;
    }
}
export class VariableSymbol
    extends TypedSymbol
    implements IKindSymbol, IEvaluatableSymbol
{
    public value: any;

    constructor(name: string, type: IType) {
        super(name, type);
    }

    eval(scope?: any) {
        if (!!scope) this.value = scope;
        return this.value;
    }

    public get kind() {
        return SymbolKind.Variable;
    }
}
export class OperatorSymbol extends LpcBaseSymbol {
    public get kind() {
        return SymbolKind.Operator;
    }
}
export class AssignmentSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    public get lhs() {
        const lhsCtx = (
            this.context as AssignmentExpressionContext
        ).conditionalExpressionBase();
        return this.symbolTable.symbolWithContextSync(
            lhsCtx
        ) as IEvaluatableSymbol;
    }

    public get rhs() {
        const rhsCtx = (
            this.context as AssignmentExpressionContext
        ).expression();
        return this.symbolTable.symbolWithContextSync(
            rhsCtx
        ) as IEvaluatableSymbol;
    }

    constructor(name: string, public operator: string) {
        super(name);
    }

    eval(scope: any) {
        const lh = this.lhs;
        const rhResult = this.rhs.eval(scope);

        // lh should really only be one of these two
        if (
            lh instanceof VariableSymbol ||
            lh instanceof VariableIdentifierSymbol
        ) {
            switch (this.operator) {
                case "=":
                    return lh.eval(rhResult);
                case "+=":
                    return lh.eval(lh.eval() + rhResult);
                case "-=":
                    return lh.eval(lh.eval() - rhResult);
            }
        } else {
            console.warn("Assignment to non-variable", lh);
        }
    }
}
export class BlockSymbol extends ScopedSymbol {}
export class LiteralSymbol
    extends TypedSymbol
    implements IEvaluatableSymbol, IKindSymbol
{
    public get kind() {
        return SymbolKind.Literal;
    }

    constructor(name: string, type: IType, public value: any) {
        super(name, type);
    }

    eval(scope: EvalScope) {
        return this.value;
    }
}

export class EfunSymbol extends BaseMethodSymbol implements IKindSymbol {
    public constructor(name: string, public returnType?: IType) {
        super(name);
    }
    public get kind() {
        return SymbolKind.Efun;
    }
    public getParametersSync() {
        return getSymbolsOfTypeSync(this, ParameterSymbol);
    }
}

export class PreprocessorSymbol extends ScopedSymbol {
    constructor(name: string, public label: string) {
        super(name);
    }
}

/** if, switch, etc */
export class SelectionSymbol extends ScopedSymbol implements IFoldableSymbol {
    constructor(
        name: string,
        public label: string,
        public foldingRange: vscodelang.FoldingRange
    ) {
        super(name);
    }
}

export class IfSymbol extends ScopedSymbol {
    public if: SelectionSymbol;
    public elseIf: SelectionSymbol[];
    public else: SelectionSymbol;

    constructor(name: string) {
        super(name);
    }
}

const symbolDescriptionMap = new Map<SymbolKind, string>([
    [SymbolKind.Terminal, "Terminal"],
    [SymbolKind.Keyword, "Keyword"],
    [SymbolKind.Include, "Include"],
    [SymbolKind.Method, "Method"],
    [SymbolKind.MethodDeclaration, "Method Declaration"],
    [SymbolKind.Variable, "Variable"],
    [SymbolKind.Define, "Define"],
    [SymbolKind.Inherit, "Inherit"],
    [SymbolKind.InlineClosure, "Inline Closure Callback"],
    [SymbolKind.Efun, "Efun"],
]);

const symbolCodeTypeMap = new Map<SymbolKind, vscodelang.SymbolKind>([
    [SymbolKind.Terminal, vscodelang.SymbolKind.EnumMember],
    [SymbolKind.Keyword, vscodelang.SymbolKind.Key],
    [SymbolKind.Include, vscodelang.SymbolKind.Module],
    [SymbolKind.Inherit, vscodelang.SymbolKind.Module],
    [SymbolKind.Method, vscodelang.SymbolKind.Method],
    [SymbolKind.MethodDeclaration, vscodelang.SymbolKind.Interface],
    [SymbolKind.InlineClosure, vscodelang.SymbolKind.Method],
    [SymbolKind.Variable, vscodelang.SymbolKind.Variable],
    [SymbolKind.Define, vscodelang.SymbolKind.Constant],
]);

/**
 * Provides a textual expression for a native symbol kind.
 *
 * @param kind The kind of symbol for which a description is needed.
 *
 * @returns The description.
 */
export const symbolDescriptionFromEnum = (kind: SymbolKind): string => {
    return symbolDescriptionMap.get(kind) || "Unknown";
};

/**
 * Converts the native symbol kind to a vscode symbol kind.
 *
 * @param kind The kind of symbol for which the vscode kind is needed.
 *
 * @returns The vscode symbol kind for the given ANTLR4 kind.
 */
export const translateSymbolKind = (
    kind: SymbolKind
): vscodelang.SymbolKind => {
    return symbolCodeTypeMap.get(kind) || vscodelang.SymbolKind.Null;
};

const symbolCompletionTypeMap = new Map<
    SymbolKind,
    vscodelang.CompletionItemKind
>([
    [SymbolKind.Terminal, vscodelang.CompletionItemKind.EnumMember],
    [SymbolKind.Keyword, vscodelang.CompletionItemKind.Keyword],
    [SymbolKind.Block, vscodelang.CompletionItemKind.Function],
    [SymbolKind.Define, vscodelang.CompletionItemKind.Variable],
    [SymbolKind.Inherit, vscodelang.CompletionItemKind.Function],
    [SymbolKind.Method, vscodelang.CompletionItemKind.Function],
    [SymbolKind.Variable, vscodelang.CompletionItemKind.Variable],
    [SymbolKind.Operator, vscodelang.CompletionItemKind.Operator],
    [SymbolKind.Efun, vscodelang.CompletionItemKind.Function],
]);

/**
 * Converts the native symbol kind to a vscode completion item kind.
 *
 * @param kind The kind of symbol for which return the completion item kind.
 *
 * @returns The vscode completion item kind.
 */
export const translateCompletionKind = (
    kind: SymbolKind
): vscodelang.CompletionItemKind => {
    return (
        symbolCompletionTypeMap.get(kind) || vscodelang.CompletionItemKind.Text
    );
};

/** Determines the sort order in the completion list. One value for each SymbolKind. */

export const completionSortKeys = new Map<SymbolKind, string>([
    [SymbolKind.Keyword, "01"],
    [SymbolKind.Method, "08"],
    [SymbolKind.Variable, "05"],
    [SymbolKind.Efun, "02"],
    [SymbolKind.Operator, "00"],
]);

// Descriptions for each symbol kind.

export const completionDetails = new Map<SymbolKind, string>([
    [SymbolKind.Keyword, "Keyword"],
    [SymbolKind.Operator, "Operator"],
    [SymbolKind.Efun, "Driver efun"],
    [SymbolKind.Variable, "Variable"],
    [SymbolKind.Method, "Method"],
]);

export class ITypedSymbol {
    type: IType;
}

export class ObjectType extends BaseSymbol implements IType {
    public constructor(public name: string) {
        super(name);
    }

    baseTypes: IType[] = [];

    public get kind(): TypeKind {
        return TypeKind.Class;
    }

    public get reference(): ReferenceKind {
        return ReferenceKind.Instance;
    }
}

export function resolveOfTypeSync<T extends BaseSymbol, Args extends unknown[]>(
    scope: IScopedSymbol,
    name: string,
    t: SymbolConstructor<T, Args>,
    localOnly: boolean = false
): T {
    for (const child of scope.children) {
        if (child.name === name && child instanceof t) {
            return child;
        }
    }

    if (!localOnly) {
        if (scope.parent) {
            return resolveOfTypeSync(scope.parent, name, t, localOnly);
        }
    }

    if (!localOnly) {
        for (const dependency of (
            scope as ContextSymbolTable
        ).getDependencies()) {
            const result = resolveOfTypeSync(dependency, name, t, localOnly);
            if (!!result) {
                return result;
            }
        }
    }

    return undefined;
}

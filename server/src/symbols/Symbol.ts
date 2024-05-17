import {
    BaseSymbol,
    ScopedSymbol,
    MethodSymbol as BaseMethodSymbol,
    ParameterSymbol,
    TypedSymbol,
    SymbolConstructor,
    IType,
} from "antlr4-c3";
import { IDiagnosticEntry, SymbolKind } from "../types";
import * as vscodelang from "vscode-languageserver";
import {
    IdentifierExpressionContext,
    IncludeDirectiveContext,
    InheritStatementContext,
} from "../parser3/LPCParser";
import {
    EvalScope,
    IEvaluatableSymbol,
    IFoldableSymbol,
    IKindSymbol,
    LpcBaseSymbol,
    getSymbolsOfTypeSync,
} from "./base";
import { VariableSymbol } from "./variableSymbol";
import { ContextSymbolTable } from "../backend/ContextSymbolTable";
import { CallStack } from "../backend/CallStack";
import { Block } from "comment-parser";
import { ParseTree, ParserRuleContext } from "antlr4ng";

export class IdentifierSymbol extends LpcBaseSymbol<IdentifierExpressionContext> {
    public get kind() {
        return SymbolKind.Keyword;
    }
}

export class ArgumentSymbol extends TypedSymbol implements IKindSymbol {
    public get kind() {
        return SymbolKind.Variable;
    }
}

export class BlockSymbol extends ScopedSymbol {}

export class PreprocessorSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    constructor(name: string, public label: string) {
        super(name);
    }

    eval(stack: CallStack, scope?: any) {
        return undefined;
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
    [SymbolKind.MethodDeclaration, vscodelang.CompletionItemKind.Function],
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
    [SymbolKind.Keyword, "05"],
    [SymbolKind.Method, "03"],
    [SymbolKind.MethodDeclaration, "04"],
    [SymbolKind.Variable, "02"],
    [SymbolKind.Efun, "08"],
    [SymbolKind.Operator, "10"],
]);

// Descriptions for each symbol kind.

export const completionDetails = new Map<SymbolKind, string>([
    [SymbolKind.Keyword, "Keyword"],
    [SymbolKind.Operator, "Operator"],
    [SymbolKind.Efun, "Driver efun"],
    [SymbolKind.Variable, "Variable"],
    [SymbolKind.Method, "Method"],
    [SymbolKind.MethodDeclaration, "Method"],
]);

export class ITypedSymbol {
    type: IType;
}

/**
 * Adds diagnostics to the symbol's SourceContext.
 * @param symbol
 * @param d
 */
export function addDiagnostic(symbol: BaseSymbol, d: IDiagnosticEntry) {
    const ctx = (symbol.symbolTable as ContextSymbolTable).owner;
    ctx.addDiagnostic(d);
}

/**
 * Generate a documentation string based on a symbols JSDoc comment
 * @param symbol
 * @returns
 */
export function generateSymbolDoc(symbol: BaseSymbol) {
    // TODO: refactor this
    if (symbol && !!(symbol as any).doc) {
        let commentDoc: string = "";
        const doc = (symbol as any).doc as Block;

        commentDoc = "\n";
        commentDoc += doc.description;

        doc.tags
            .filter((t) => t.tag == "param")
            .forEach((tag) => {
                commentDoc += "\n\n_@param:_ `";
                if (tag.type) {
                    commentDoc += ` ${tag.type}`;
                }
                if (tag.name) {
                    commentDoc += ` ${tag.name}`;
                }
                commentDoc += "`";
                if (tag.description) {
                    commentDoc += ` ${tag.description}`;
                }
            });

        const returnTag = doc.tags.find((t) => t.tag === "returns");
        if (!!returnTag) {
            commentDoc += "\n\n_@returns:_";
            if (returnTag.type) {
                commentDoc += ` \`${returnTag.type}\``;
            }
            if (returnTag.description) {
                commentDoc += ` - ${returnTag.description}`;
            }
        }

        return commentDoc;
    }
    return "";
}

/**
 * checks if a symbol has a parent (at any level) of type t
 * @param symbol
 * @param t
 * @returns
 */
export function getParentOfType<T extends BaseSymbol, Args extends unknown[]>(
    symbol: BaseSymbol,
    t: SymbolConstructor<T, Args>
): T | undefined {
    if (symbol instanceof t) return symbol;
    return (symbol.symbolPath.find((s) => s instanceof t) as T) ?? undefined;
}

export function getParentContextOfType<
    T extends ParserRuleContext,
    Args extends unknown[]
>(
    ctx: ParserRuleContext,
    t: ParserRuleContextConstructor<T, Args>
): T | undefined {
    let p = ctx.parent;
    while (!!p) {
        if (p instanceof t) return p as T;
        else p = (p as ParserRuleContext).parent;
    }
    return undefined;
}

type ParserRuleContextConstructor<
    T extends ParseTree,
    Args extends unknown[]
> = new (...args: Args) => T;

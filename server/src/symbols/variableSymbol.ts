import {
    TypedSymbol,
    IType,
    ScopedSymbol,
    FundamentalType,
    BaseSymbol,
} from "antlr4-c3";
import {
    IKindSymbol,
    IEvaluatableSymbol,
    IRenameableSymbol,
    IReferenceableSymbol,
    isInstanceOfIReferenceableSymbol,
} from "./base";
import { IDefinition, ILexicalRange, SymbolKind } from "../types";
import { IdentifierSymbol, addDiagnostic } from "./Symbol";
import { rangeFromTokens } from "../utils";
import { CallStack, StackValue } from "../backend/CallStack";
import { Token } from "antlr4ng";
import { DiagnosticSeverity } from "vscode-languageserver";
import { LPCToken } from "../parser3/LPCToken";
import { InlineClosureSymbol } from "./methodSymbol";

export class VariableSymbol
    extends TypedSymbol
    implements IKindSymbol, IEvaluatableSymbol, IReferenceableSymbol
{
    public value: any;
    public lpcModifiers: Set<string> = new Set<string>();
    public references: Set<BaseSymbol> = new Set<BaseSymbol>();

    constructor(name: string, type: IType, public nameToken?: Token) {
        super(name, type);
    }

    eval(stack: CallStack, scope?: any) {
        if (scope !== undefined) {
            if (scope instanceof StackValue) {
                this.value = scope.value;
                this.type ??= scope.type;
            } else {
                this.value = scope;
            }
        }

        stack.addLocal(this.name, new StackValue(this.value, this.type, this));

        return new StackValue(this.value, this.type, this);
    }

    public get kind() {
        return SymbolKind.Variable;
    }

    public getDefinition(): IDefinition {
        const def: IDefinition = {
            text: "",
            range: {
                start: { column: 0, row: 0 },
                end: { column: 0, row: 0 },
            },
        };

        const mods = new Array(this.lpcModifiers ?? []).join(" ");
        const type = this.type.name;
        const name = this.name;

        def.text = [mods, type, name].filter((s) => s?.length > 0).join(" ");

        return def;
    }

    public addReference(symbol: BaseSymbol) {
        this.references.add(symbol);
    }
}

/**
 * Represents an identifier symbol that refers back to a variable declared
 * in this or a parent scope.
 */
export class VariableIdentifierSymbol
    extends IdentifierSymbol
    implements IEvaluatableSymbol, IRenameableSymbol
{
    nameRange: ILexicalRange;

    eval(stack: CallStack, scope?: any) {
        this.nameRange = rangeFromTokens(this.context.start, this.context.stop);
        const def = stack.getValue(this.name, this)
            ?.symbol as IEvaluatableSymbol;

        if (
            !def &&
            // exclude valid closure vars from this check
            !(
                this.name.startsWith("$") &&
                this.symbolPath.some((s) => s instanceof InlineClosureSymbol)
            )
        ) {
            addDiagnostic(this, {
                filename: (this.context.start as LPCToken).filename,
                message: `Variable '${this.name}' not declared.`,
                range: this.nameRange,
                type: DiagnosticSeverity.Error,
                code: "variableNotFound",
                source: "variableNotFound",
            });
        }

        if (isInstanceOfIReferenceableSymbol(def)) {
            def.addReference(this);
        }

        return def?.eval(stack, scope);
    }
    // public findDeclarationSymbol() {
    //     let defSymbol: BaseSymbol = resolveOfTypeSync(
    //         this.parent,
    //         this.name,
    //         VariableSymbol
    //     );
    //     defSymbol ??= resolveOfTypeSync(this.parent, this.name, ArgumentSymbol);

    //     return defSymbol;
    // }
}

export class VariableInitializerSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    constructor(name: string, public variable: VariableSymbol) {
        super(name);
    }

    eval(stack: CallStack, scope?: any) {
        let evalResult: any = null;
        this.children.forEach((child) => {
            evalResult = (child as IEvaluatableSymbol).eval(stack, evalResult);
        });

        if (!this.variable.type) {
            if (typeof evalResult === "number") {
                this.variable.type = FundamentalType.integerType;
            } else if (typeof evalResult === "string") {
                this.variable.type = FundamentalType.stringType;
            }
        }

        this.variable.eval(stack, evalResult);
    }
}

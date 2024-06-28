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
    IReferenceSymbol,
} from "./base";
import { IDefinition, ILexicalRange, SymbolKind } from "../types";
import { IdentifierSymbol, addDiagnostic } from "./Symbol";
import { rangeFromTokens } from "../utils";
import { CallStack, StackValue } from "../backend/CallStack";
import { Token } from "antlr4ng";
import { DiagnosticSeverity } from "vscode-languageserver";
import { LPCToken } from "../parser3/LPCToken";
import { InlineClosureSymbol } from "./methodSymbol";
import { asStackValue } from "../backend/CallStackUtils";
import { resolveOfTypeSync } from "../backend/symbol-utils";

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

    eval(stack: CallStack, scope?: StackValue) {
        let sval: StackValue = stack.getValue(this.name, this);
        if (scope !== undefined) {
            if (scope instanceof StackValue) {
                this.value = scope.value;
                this.type ??= scope.type;
                sval = scope;
                sval.symbol = this;
            } else {
                this.value = scope;
                sval = asStackValue(this.value, this.type, this);
            }
            stack.addLocal(this.name, scope);
        }

        return sval;
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
    implements IEvaluatableSymbol, IRenameableSymbol, IReferenceSymbol
{
    private reference: BaseSymbol;
    setReference(symbol: BaseSymbol): BaseSymbol {
        return (this.reference = symbol);
    }
    getReference(): BaseSymbol {
        return this.reference;
    }

    nameRange: ILexicalRange;

    eval(stack: CallStack, scope?: any) {
        this.nameRange = rangeFromTokens(this.context.start, this.context.stop);
        const stackVal = stack.getValue(this.name, this);
        const def = resolveOfTypeSync(this.parent, this.name, VariableSymbol);
        //const def = stackVal?.symbol as IEvaluatableSymbol;

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
            this.setReference(def);
        }

        return def?.eval(stack, scope) ?? stackVal;
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

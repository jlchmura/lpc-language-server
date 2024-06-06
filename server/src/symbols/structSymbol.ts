import { ScopedSymbol } from "antlr4-c3";
import { IEvaluatableSymbol, LpcBaseSymbol } from "./base";
import { CallStack, StackValue } from "../backend/CallStack";
import { PrimaryExpressionContext } from "../parser3/LPCParser";
import { VariableSymbol } from "./variableSymbol";
import { rangeFromTokens } from "../utils";
import { addDiagnostic } from "./Symbol";
import { LPCToken } from "../parser3/LPCToken";
import { DiagnosticSeverity } from "vscode-languageserver";
import { ArrowSymbol } from "./arrowSymbol";
import { DiagnosticCodes, StructType } from "../types";

export class StructMemberIdentifierSymbol
    extends LpcBaseSymbol<PrimaryExpressionContext>
    implements IEvaluatableSymbol
{
    constructor(public name: string) {
        super(name);
    }

    eval(stack: CallStack, scope?: any) {
        const arrowSymbol = this.parent as ArrowSymbol;
        const structVarName = arrowSymbol.source.name;

        const memberNameToken = this.context._structMember;
        const nameRange = rangeFromTokens(memberNameToken, memberNameToken);

        const varValue = stack.getValue<Record<string, any>>(
            structVarName,
            this
        );
        const structType = varValue?.type as StructType;
        const structTypeName = structType?.structName;

        const structDef = this.symbolTable.resolveSync(
            structTypeName,
            false
        ) as StructDeclarationSymbol;
        const members = structDef?.members ?? new Map();

        const def = stack.getValue(structVarName, this)
            ?.symbol as IEvaluatableSymbol;

        if (!members.has(this.name)) {
            addDiagnostic(this, {
                filename: (memberNameToken as LPCToken).filename,
                message: `Member not found '${this.name}'.`,
                range: nameRange,
                type: DiagnosticSeverity.Warning,
                source: DiagnosticCodes.MemberNotFound,
            });
            return undefined;
        }

        return def?.eval(stack, scope);
    }
}

export class StructDeclarationSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    public getMemberSymbols() {
        return this.getNestedSymbolsOfTypeSync(VariableSymbol);
    }

    public members: Map<string, StackValue> = new Map();

    constructor(public name: string, public inheritsFromName?: string) {
        super(name);
    }

    eval(stack: CallStack, scope?: any) {
        this.members = new Map();

        let inheritStructName = this.inheritsFromName;
        while (!!inheritStructName) {
            const inhStruct = this.symbolTable.resolveSync(
                inheritStructName,
                false
            ) as StructDeclarationSymbol;
            if (!inhStruct) {
                break;
            }

            // copy into this struct
            for (const [key, value] of inhStruct.members) {
                this.members.set(key, value);
            }

            inheritStructName = inhStruct.inheritsFromName;
        }

        this.getMemberSymbols().forEach((member) => {
            this.members.set(
                member.name,
                new StackValue(undefined, member.type, member)
            );
        });

        return stack.addLocal(
            this.name,
            new StackValue(this.members, new StructType(this.name), this)
        );
    }
}

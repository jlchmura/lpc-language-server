import { FundamentalType, IType, ParameterSymbol, SymbolConstructor } from "antlr4-c3";
import { ContextSymbolTable } from "./ContextSymbolTable";
import { EfunParamSymbol, EfunSymbol } from "../symbols/Symbol";
import { LpcTypes } from "../types";

export const EfunSymbols = new ContextSymbolTable("Efun Symbols", {
    allowDuplicateSymbols: true,
});

type efunArg = [name: string, type: IType, allowMulti?: boolean];

efun("abs", LpcTypes.intType, false, ["number", LpcTypes.intType]);
efun("add_action", LpcTypes.voidType, true, ["fun", FundamentalType.stringType], ["cmd", FundamentalType.stringType], ["flag", FundamentalType.integerType]);
efun("clone_object", LpcTypes.objectType, false, ["file", LpcTypes.stringType]);
efun("destruct", LpcTypes.voidType, false, ["ob", LpcTypes.objectType]);
efun("localtime", LpcTypes.intArrayType, false, ["clock", LpcTypes.intType]);
efun("load_object", LpcTypes.objectType, false, ["file", LpcTypes.stringType]);
efun("map", LpcTypes.mixedArrayType, true, ["arr", LpcTypes.mixedArrayType], ["fun", LpcTypes.closureType], ["ob", LpcTypes.stringType], ["extra", LpcTypes.mappingType]);
efun("present", LpcTypes.objectType, false, ["str", FundamentalType.stringType], ["env", LpcTypes.objectType]);
efun("sscanf", LpcTypes.intType, true, ["str", LpcTypes.stringType], ["fmt", LpcTypes.stringType], ["var...", LpcTypes.mixedType, true]);
efun("sizeof", LpcTypes.intType, false, ["val", LpcTypes.mixedType]);
efun("write", LpcTypes.voidType, false, ["msg", LpcTypes.mixedType]);

function efun(
    name: string,
    returnType: IType,
    varArgs: boolean,
    ...args: efunArg[]
) {
    const symb = EfunSymbols.addNewSymbolOfType(
        EfunSymbol,
        undefined,
        name,
        returnType
    );

    if (varArgs) symb.functionModifiers.add("varargs");

    args.forEach((arg,idx) => {
        if (arg[2] && idx < args.length-1) {
            throw "multi-arg must be last arg";
        }
        EfunSymbols.addNewSymbolOfType(EfunParamSymbol, symb, ...arg);
    });

    return symb;
}

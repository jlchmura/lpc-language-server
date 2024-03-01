import { FundamentalType, IType, ParameterSymbol, SymbolConstructor } from "antlr4-c3";
import { ContextSymbolTable } from "./ContextSymbolTable";
import { EfunParamSymbol, EfunSymbol } from "../symbols/Symbol";
import { LpcTypes } from "../types";

export const EfunSymbols = new ContextSymbolTable("Efun Symbols", {
    allowDuplicateSymbols: true,
});

type efunArg = [name: string, type: IType, allowMulti?: boolean];

efun("abs", LpcTypes.intType, false, ["number", LpcTypes.intType]);
efun("all_inventory", LpcTypes.objectArrayType, false, ["ob", LpcTypes.objectType]);
efun("add_action", LpcTypes.voidType, true, ["fun", FundamentalType.stringType], ["cmd", FundamentalType.stringType], ["flag", FundamentalType.integerType]);
efun("apply", LpcTypes.mixedType, true, ["cl", LpcTypes.closureType], ["args", LpcTypes.mixedArrayType, true]);
efun("capitalize", LpcTypes.stringType, false, ["str", LpcTypes.stringType]);
efun("clone_object", LpcTypes.objectType, false, ["file", LpcTypes.stringType]);
efun("closurep", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("creator", LpcTypes.stringType, false, ["ob", LpcTypes.objectType]);
efun("destruct", LpcTypes.voidType, false, ["ob", LpcTypes.objectType]);
efun("environment", LpcTypes.objectType, true, ["ob", LpcTypes.objectType]);
efun("first_inventory", LpcTypes.objectType, true, ["ob", LpcTypes.stringType]);
efun("function_exists", LpcTypes.intType, false, ["fun", LpcTypes.stringType], ["ob", LpcTypes.objectType]);
efun("hash", LpcTypes.intType, true, ["method", LpcTypes.intArrayType], ["arg", LpcTypes.stringType],["iterations", LpcTypes.intType]);
efun("localtime", LpcTypes.intArrayType, false, ["clock", LpcTypes.intType]);
efun("load_name", LpcTypes.stringType, true, ["ob", LpcTypes.objectType]);
efun("load_object", LpcTypes.objectType, false, ["file", LpcTypes.stringType]);
efun("map", LpcTypes.mixedArrayType, true, ["arr", LpcTypes.mixedArrayType], ["fun", LpcTypes.closureType], ["ob", LpcTypes.stringType], ["extra", LpcTypes.mappingType]);
efun("member", LpcTypes.intType, true, ["array", LpcTypes.mixedArrayType], ["elem", LpcTypes.mixedType], ["start", LpcTypes.intType]);
efun("next_inventory", LpcTypes.objectType, false, ["ob", LpcTypes.objectType]);
efun("notify_fail", LpcTypes.voidType, false, ["msg", LpcTypes.stringType]);
efun("object_name", LpcTypes.stringType, false, ["ob", LpcTypes.objectType]);
efun("objectp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("previous_object", LpcTypes.objectType, true, ["i", LpcTypes.intType]);
efun("present", LpcTypes.objectType, false, ["str", FundamentalType.stringType], ["env", LpcTypes.objectType]);
efun("pointerp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("regreplace", LpcTypes.stringType, false, ["txt", LpcTypes.stringType], ["pattern", LpcTypes.stringType], ["replacepattern", LpcTypes.closureType], ["flags", LpcTypes.intType]);
efun("sprintf", LpcTypes.stringType, true, ["fmt", LpcTypes.stringType], ["var...", LpcTypes.mixedType, true]);
efun("sscanf", LpcTypes.intType, true, ["str", LpcTypes.stringType], ["fmt", LpcTypes.stringType], ["var...", LpcTypes.mixedType, true]);
efun("strlen", LpcTypes.intType, false, ["str", LpcTypes.stringType]);
efun("stringp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("sizeof", LpcTypes.intType, false, ["val", LpcTypes.mixedType]);
efun("this_player", LpcTypes.objectType, false);
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

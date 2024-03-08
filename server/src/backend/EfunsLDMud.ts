import { FundamentalType, IType, ParameterSymbol, SymbolConstructor } from "antlr4-c3";
import { ContextSymbolTable } from "./ContextSymbolTable";
import { LpcTypes } from "../types";
import { EfunSymbol, EfunParamSymbol } from "../symbols/methodSymbol";


export const EfunSymbols = new ContextSymbolTable("Efun Symbols", {
    allowDuplicateSymbols: true,
});

type efunArg = [name: string, type: IType, allowMulti?: boolean];

efun("abs", LpcTypes.intType, false, ["number", LpcTypes.intType]);
efun("all_inventory", LpcTypes.objectArrayType, false, ["ob", LpcTypes.objectType]);
efun("allocate", LpcTypes.mixedArrayType, true, ["sizes", LpcTypes.intArrayType], ["init_value", LpcTypes.mixedType]);
efun("add_action", LpcTypes.voidType, true, ["fun", FundamentalType.stringType], ["cmd", FundamentalType.stringType], ["flag", FundamentalType.integerType]);
efun("apply", LpcTypes.mixedType, true, ["cl", LpcTypes.closureType], ["args", LpcTypes.mixedArrayType, true]);
efun("capitalize", LpcTypes.stringType, false, ["str", LpcTypes.stringType]);
efun("clone_object", LpcTypes.objectType, false, ["file", LpcTypes.stringType]);
efun("closurep", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("clear_bit", LpcTypes.stringType, false, ["str", LpcTypes.stringType], ["n", LpcTypes.intType]);
efun("creator", LpcTypes.stringType, false, ["ob", LpcTypes.objectType]);
efun("ctime", LpcTypes.stringType, false, ["clock", LpcTypes.intType]);
efun("deep_inventory", LpcTypes.objectArrayType, true, ["ob", LpcTypes.objectType], ["depth", LpcTypes.intType]);
efun("destruct", LpcTypes.voidType, false, ["ob", LpcTypes.objectType]);
efun("environment", LpcTypes.objectType, true, ["ob", LpcTypes.objectType]);
efun("explode", LpcTypes.stringArrayType, false, ["str", LpcTypes.stringType], ["del", LpcTypes.stringType]);
efun("first_inventory", LpcTypes.objectType, true, ["ob", LpcTypes.stringType]);
efun("function_exists", LpcTypes.intType, false, ["fun", LpcTypes.stringType], ["ob", LpcTypes.objectType]);
efun("hash", LpcTypes.intType, true, ["method", LpcTypes.intArrayType], ["arg", LpcTypes.stringType],["iterations", LpcTypes.intType]);
efun("implode", LpcTypes.stringType, true, ["arr", LpcTypes.mixedArrayType], ["del", LpcTypes.stringType]);
efun("input_to", LpcTypes.voidType, true, ["fun", LpcTypes.stringType], ["flag", LpcTypes.intType], ["msg", LpcTypes.stringType]);
efun("localtime", LpcTypes.intArrayType, false, ["clock", LpcTypes.intType]);
efun("load_name", LpcTypes.stringType, true, ["ob", LpcTypes.objectType]);
efun("load_object", LpcTypes.objectType, false, ["file", LpcTypes.stringType]);
efun("map", LpcTypes.mixedArrayType, true, ["arr", LpcTypes.mixedArrayType], ["fun", LpcTypes.closureType], ["ob", LpcTypes.stringType], ["extra", LpcTypes.mappingType]);
efun("member", LpcTypes.intType, true, ["array", LpcTypes.mixedArrayType], ["elem", LpcTypes.mixedType], ["start", LpcTypes.intType]);
efun("m_indices", LpcTypes.mixedArrayType, false, ["map", LpcTypes.mappingType]);
efun("next_inventory", LpcTypes.objectType, false, ["ob", LpcTypes.objectType]);
efun("notify_fail", LpcTypes.voidType, false, ["msg", LpcTypes.stringType]);
efun("object_name", LpcTypes.stringType, false, ["ob", LpcTypes.objectType]);
efun("objectp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("playerp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("previous_object", LpcTypes.objectType, true, ["i", LpcTypes.intType]);
efun("present", LpcTypes.objectType, false, ["str", FundamentalType.stringType], ["env", LpcTypes.objectType]);
efun("printf", LpcTypes.voidType, true, ["fmt", LpcTypes.stringType], ["var...", LpcTypes.mixedType, true]);
efun("pointerp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("query_once_interactive", LpcTypes.intType, false, ["ob", LpcTypes.objectType]);
efun("regreplace", LpcTypes.stringType, false, ["txt", LpcTypes.stringType], ["pattern", LpcTypes.stringType], ["replacepattern", LpcTypes.closureType], ["flags", LpcTypes.intType]);
efun("sprintf", LpcTypes.stringType, true, ["fmt", LpcTypes.stringType], ["var...", LpcTypes.mixedType, true]);
efun("set_bit", LpcTypes.stringType, false, ["str", LpcTypes.stringType], ["n", LpcTypes.intType]);
efun("sscanf", LpcTypes.intType, true, ["str", LpcTypes.stringType], ["fmt", LpcTypes.stringType], ["var...", LpcTypes.mixedType, true]);
efun("strlen", LpcTypes.intType, false, ["str", LpcTypes.stringType]);
efun("stringp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("sizeof", LpcTypes.intType, false, ["val", LpcTypes.mixedType]);
efun("test_bit", LpcTypes.intType, false, ["str", LpcTypes.stringType], ["n", LpcTypes.intType]);
efun("tell_object", LpcTypes.voidType, false, ["ob", LpcTypes.objectType], ["msg", LpcTypes.stringType]);
efun("tell_room", LpcTypes.voidType, false, ["ob", LpcTypes.objectType], ["msg", LpcTypes.stringType], ["exclude", LpcTypes.objectArrayType]);
efun("terminal_colour", LpcTypes.stringType, true, ["str", LpcTypes.stringType], ["map", LpcTypes.mappingType], ["wrap", LpcTypes.intType], ["indent", LpcTypes.intType]);
efun("this_interactive", LpcTypes.objectType, false);
efun("this_object", LpcTypes.objectType, false);
efun("this_player", LpcTypes.objectType, false);
efun("time", LpcTypes.intType, false);
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

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
efun("binary_message", LpcTypes.intType, true, ["msg", LpcTypes.mixedType], ["flags", LpcTypes.intType]);
efun("capitalize", LpcTypes.stringType, false, ["str", LpcTypes.stringType]);
efun("call_other", LpcTypes.mixedType, true, ["ob", LpcTypes.objectType], ["fun", LpcTypes.stringType], ["args...", LpcTypes.mixedType, true]);
efun("call_out", LpcTypes.intType, true, ["fun", LpcTypes.stringType], ["delay", LpcTypes.intType], ["args...", LpcTypes.mixedType, true]);
efun("caller_stack", LpcTypes.objectArrayType, true, ["add_interactive", LpcTypes.intType]);
efun("caller_stack_depth", LpcTypes.intType, false);
efun("clone_object", LpcTypes.objectType, false, ["file", LpcTypes.stringType]);
efun("clonep", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("clones", LpcTypes.objectArrayType, true, ["ob", LpcTypes.objectType],["what", LpcTypes.intType]);
efun("closurep", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("clear_bit", LpcTypes.stringType, false, ["str", LpcTypes.stringType], ["n", LpcTypes.intType]);
efun("command", LpcTypes.intType, true, ["str", LpcTypes.stringType], ["ob", LpcTypes.objectType]);
efun("copy", LpcTypes.mixedType, false, ["val", LpcTypes.mixedType]);
efun("creator", LpcTypes.stringType, false, ["ob", LpcTypes.objectType]);
efun("ctime", LpcTypes.stringType, false, ["clock", LpcTypes.intType]);
efun("deep_inventory", LpcTypes.objectArrayType, true, ["ob", LpcTypes.objectType], ["depth", LpcTypes.intType]);
efun("destruct", LpcTypes.voidType, false, ["ob", LpcTypes.objectType]);
efun("environment", LpcTypes.objectType, true, ["ob", LpcTypes.objectType]);
efun("explode", LpcTypes.stringArrayType, false, ["str", LpcTypes.stringType], ["del", LpcTypes.stringType]);
efun("file_size", LpcTypes.intType, false, ["file", LpcTypes.stringType]);
efun("filter_objects", LpcTypes.objectArrayType, true, ["arr", LpcTypes.objectArrayType], ["fun", LpcTypes.stringType], ["extra", LpcTypes.mixedType], ["args...", LpcTypes.mixedType, true]);
efun("find_object", LpcTypes.objectType, false, ["file", LpcTypes.stringType]);
efun("first_inventory", LpcTypes.objectType, true, ["ob", LpcTypes.stringType]);
efun("find_call_out", LpcTypes.intType, true, ["func", LpcTypes.mixedType]);
efun("floatp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("floor", LpcTypes.intType, false, ["number", LpcTypes.intType]);
efun("funcall", LpcTypes.mixedType, true, ["fun", LpcTypes.closureType], ["args...", LpcTypes.mixedArrayType, true]);
efun("function_exists", LpcTypes.intType, false, ["fun", LpcTypes.stringType], ["ob", LpcTypes.objectType]);
efun("get_extra_wizinfo", LpcTypes.mixedType, false, ["wiz", LpcTypes.objectType]);
efun("hash", LpcTypes.intType, true, ["method", LpcTypes.intArrayType], ["arg", LpcTypes.stringType],["iterations", LpcTypes.intType]);
efun("implode", LpcTypes.stringType, true, ["arr", LpcTypes.mixedArrayType], ["del", LpcTypes.stringType]);
efun("interactive", LpcTypes.intType, true, ["ob", LpcTypes.objectType]);
efun("input_to", LpcTypes.voidType, true, ["fun", LpcTypes.stringType], ["flag", LpcTypes.intType], ["msg", LpcTypes.stringType], ["args...", LpcTypes.mixedType, true]);
efun("interactive_info", LpcTypes.mixedType, true, ["ob", LpcTypes.objectType],["what", LpcTypes.intType]);
efun("intp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("invert_bits", LpcTypes.stringType, false, ["str", LpcTypes.stringType]);
efun("json_serialize", LpcTypes.stringType, false, ["data", LpcTypes.mixedType]);
efun("living", LpcTypes.intType, false, ["ob", LpcTypes.objectType]);
efun("localtime", LpcTypes.intArrayType, false, ["clock", LpcTypes.intType]);
efun("load_name", LpcTypes.stringType, true, ["ob", LpcTypes.objectType]);
efun("load_object", LpcTypes.objectType, false, ["file", LpcTypes.stringType]);
efun("lower_case", LpcTypes.stringType, false, ["str", LpcTypes.stringType]);
efun("map", LpcTypes.mixedArrayType, true, ["arr", LpcTypes.mixedArrayType], ["fun", LpcTypes.closureType], ["ob", LpcTypes.stringType], ["extra", LpcTypes.mappingType]);
efun("mappingp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("member", LpcTypes.intType, true, ["array", LpcTypes.mixedArrayType], ["elem", LpcTypes.mixedType], ["start", LpcTypes.intType]);
efun("min", LpcTypes.intType, true, ["arg", LpcTypes.mixedType], ["arg1", LpcTypes.mixedType]);
efun("m_add", LpcTypes.mappingType, true, ["map", LpcTypes.mappingType], ["key", LpcTypes.mixedType], ["val", LpcTypes.mixedType]);
efun("m_allocate", LpcTypes.mappingType, true, ["size", LpcTypes.intType],["width", LpcTypes.intType]);
efun("m_delete", LpcTypes.mappingType, true, ["map", LpcTypes.mappingType], ["key", LpcTypes.mixedType]);
efun("m_indices", LpcTypes.mixedArrayType, false, ["map", LpcTypes.mappingType]);
efun("m_entry", LpcTypes.mixedArrayType, true, ["map", LpcTypes.mappingType], ["key", LpcTypes.mixedType]);
efun("m_reallocate", LpcTypes.mappingType, true, ["m", LpcTypes.mappingType], ["width", LpcTypes.intType]);
efun("m_values", LpcTypes.mixedArrayType, true, ["map", LpcTypes.mappingType], ["index", LpcTypes.intType]);
efun("move_object", LpcTypes.voidType, false, ["item", LpcTypes.mixedType], ["dest", LpcTypes.mixedType]);
efun("next_inventory", LpcTypes.objectType, false, ["ob", LpcTypes.objectType]);
efun("notify_fail", LpcTypes.voidType, false, ["msg", LpcTypes.stringType]);
efun("object_name", LpcTypes.stringType, false, ["ob", LpcTypes.objectType]);
efun("objectp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("playerp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("previous_object", LpcTypes.objectType, true, ["i", LpcTypes.intType]);
efun("present", LpcTypes.objectType, true, ["str", FundamentalType.stringType], ["env", LpcTypes.objectType]);
efun("printf", LpcTypes.voidType, true, ["fmt", LpcTypes.stringType], ["var...", LpcTypes.mixedType, true]);
efun("pointerp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("query_ip_number", LpcTypes.stringType, true, ["ob", LpcTypes.objectType]);
efun("query_once_interactive", LpcTypes.intType, false, ["ob", LpcTypes.objectType]);
efun("query_verb", LpcTypes.stringType, true, ["flag", LpcTypes.intType]);
efun("random", LpcTypes.intType, true, ["n", LpcTypes.intType]);
efun("read_file", LpcTypes.stringType, true, ["file", LpcTypes.stringType], ["start", LpcTypes.intType], ["len", LpcTypes.intType]);
efun("regreplace", LpcTypes.stringType, false, ["txt", LpcTypes.stringType], ["pattern", LpcTypes.stringType], ["replacepattern", LpcTypes.closureType], ["flags", LpcTypes.intType]);
efun("rm", LpcTypes.intType, false, ["file", LpcTypes.stringType]);
efun("say", LpcTypes.voidType, true, ["msg", LpcTypes.stringType], ["exclude", LpcTypes.objectArrayType]);
efun("set_extra_wizinfo", LpcTypes.voidType, false, ["wiz", LpcTypes.objectType], ["extra", LpcTypes.mixedType]);
efun("set_heart_beat", LpcTypes.intType, true, ["flag", LpcTypes.intType]);
efun("set_light", LpcTypes.voidType, true, ["intensity", LpcTypes.intType]);
efun("set_this_object", LpcTypes.voidType, false, ["ob_to_pretend_to_be", LpcTypes.objectType]);
efun("set_prompt", LpcTypes.stringType, true, ["prompt", LpcTypes.stringType], ["ob", LpcTypes.objectType]);
efun("sprintf", LpcTypes.stringType, true, ["fmt", LpcTypes.stringType], ["var...", LpcTypes.mixedType, true]);
efun("set_bit", LpcTypes.stringType, false, ["str", LpcTypes.stringType], ["n", LpcTypes.intType]);
efun("sscanf", LpcTypes.intType, true, ["str", LpcTypes.stringType], ["fmt", LpcTypes.stringType], ["var...", LpcTypes.mixedType, true]);
efun("strlen", LpcTypes.intType, false, ["str", LpcTypes.stringType]);
efun("strrstr", LpcTypes.intType, true, ["str", LpcTypes.stringType], ["str2", LpcTypes.stringType],["pos", LpcTypes.intType]);
efun("strstr", LpcTypes.intType, true, ["str", LpcTypes.stringType], ["str2", LpcTypes.stringType],["pos", LpcTypes.intType]);
efun("stringp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("sizeof", LpcTypes.intType, false, ["val", LpcTypes.mixedType]);
efun("test_bit", LpcTypes.intType, false, ["str", LpcTypes.stringType], ["n", LpcTypes.intType]);
efun("tell_object", LpcTypes.voidType, false, ["ob", LpcTypes.objectType], ["msg", LpcTypes.stringType]);
efun("tell_room", LpcTypes.voidType, true, ["ob", LpcTypes.objectType], ["msg", LpcTypes.stringType], ["exclude", LpcTypes.objectArrayType]);
efun("terminal_colour", LpcTypes.stringType, true, ["str", LpcTypes.stringType], ["map", LpcTypes.mappingType], ["wrap", LpcTypes.intType], ["indent", LpcTypes.intType]);
efun("this_interactive", LpcTypes.objectType, false);
efun("this_object", LpcTypes.objectType, false);
efun("this_player", LpcTypes.objectType, false);
efun("time", LpcTypes.intType, false);
efun("to_int", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("widthof", LpcTypes.intType, false, ["map", LpcTypes.mappingType]);
efun("write", LpcTypes.voidType, false, ["msg", LpcTypes.mixedType]);
efun("write_file", LpcTypes.intType, true, ["file", LpcTypes.stringType], ["str", LpcTypes.stringType], ["flags", LpcTypes.intType]);

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

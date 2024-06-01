import { FundamentalType, IType } from "antlr4-c3";
import { ContextSymbolTable } from "../backend/ContextSymbolTable";
import { LpcTypes } from "../types";
import { EfunSymbol, EfunParamSymbol } from "../symbols/methodSymbol";



export const EfunSymbols = new ContextSymbolTable("Efun Symbols", {
    allowDuplicateSymbols: true,
});

type efunArg = [name: string, type: IType, allowMulti?: boolean];

efun("abs", LpcTypes.intType, false, ["number", LpcTypes.intType]);
efun("all_environment", LpcTypes.objectArrayType, true, ["ob", LpcTypes.objectType]);
efun("all_inventory", LpcTypes.objectArrayType, true, ["ob", LpcTypes.objectType]);
efun("allocate", LpcTypes.mixedArrayType, true, ["sizes", LpcTypes.intArrayType], ["init_value", LpcTypes.mixedType]);
efun("add_action", LpcTypes.voidType, true, ["fun", FundamentalType.stringType], ["cmd", FundamentalType.stringType], ["flag", FundamentalType.integerType]);
efun("apply", LpcTypes.mixedType, true, ["cl", LpcTypes.closureType], ["args", LpcTypes.mixedArrayType, true]);
efun("attach_erq_demon", LpcTypes.intType, true, ["ob", LpcTypes.objectType], ["do_close", LpcTypes.intType]);
efun("bind_lambda", LpcTypes.closureType, true, ["cl", LpcTypes.closureType], ["ob", LpcTypes.objectType]);
efun("binary_message", LpcTypes.intType, true, ["msg", LpcTypes.mixedType], ["flags", LpcTypes.intType]);
efun("capitalize", LpcTypes.stringType, false, ["str", LpcTypes.stringType]);
efun("call_direct", LpcTypes.mixedType, true, ["ob", LpcTypes.objectType], ["fun", LpcTypes.stringType], ["args...", LpcTypes.mixedType, true]);
efun("call_out", LpcTypes.intType, true, ["fun", LpcTypes.stringType], ["delay", LpcTypes.intType], ["args...", LpcTypes.mixedArrayType, true]);
efun("call_other", LpcTypes.mixedType, true, ["ob", LpcTypes.objectType], ["fun", LpcTypes.stringType], ["args...", LpcTypes.mixedType, true]);
efun("call_out", LpcTypes.intType, true, ["fun", LpcTypes.stringType], ["delay", LpcTypes.intType], ["args...", LpcTypes.mixedType, true]);
efun("caller_stack", LpcTypes.objectArrayType, true, ["add_interactive", LpcTypes.intType]);
efun("caller_stack_depth", LpcTypes.intType, false);
efun("call_out_info", LpcTypes.mixedType, false);
efun("cat", LpcTypes.intType, true, ["path", LpcTypes.stringType], ["start", LpcTypes.intType], ["num", LpcTypes.intType]);
efun("clone_object", LpcTypes.objectType, false, ["file", LpcTypes.stringType]);
efun("clonep", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("clones", LpcTypes.objectArrayType, true, ["ob", LpcTypes.objectType],["what", LpcTypes.intType]);
efun("closurep", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("clear_bit", LpcTypes.stringType, false, ["str", LpcTypes.stringType], ["n", LpcTypes.intType]);
efun("command", LpcTypes.intType, true, ["str", LpcTypes.stringType], ["ob", LpcTypes.objectType]);
efun("command_stack", LpcTypes.mixedType, false);
efun("configure_driver", LpcTypes.voidType, false, ["what", LpcTypes.intType], ["data", LpcTypes.mixedType]);
efun("configure_interactive", LpcTypes.voidType, false, ["ob", LpcTypes.objectType], ["what", LpcTypes.intType], ["data", LpcTypes.mixedType]);
efun("configure_object", LpcTypes.voidType, false, ["ob", LpcTypes.objectType], ["what", LpcTypes.intType], ["data", LpcTypes.mixedType]);
efun("configure_lwobject", LpcTypes.voidType,true, ["lwob", LpcTypes.objectType], ["what", LpcTypes.intType], ["data", LpcTypes.mixedType]);
efun("copy", LpcTypes.mixedType, false, ["val", LpcTypes.mixedType]);
efun("creator", LpcTypes.stringType, false, ["ob", LpcTypes.objectType]);
efun("creator_file", LpcTypes.stringType, false, ["ob", LpcTypes.mixedType]);
efun("crypt", LpcTypes.stringType, true, ["str", LpcTypes.stringType], ["seed", LpcTypes.intType]);
efun("ctime", LpcTypes.stringType, false, ["clock", LpcTypes.intType]);
efun("debug_message", LpcTypes.voidType, true, ["text", LpcTypes.stringType], ["flags", LpcTypes.intType]);
efun("deep_copy", LpcTypes.mixedType, false, ["arg", LpcTypes.mixedType]);
efun("deep_inventory", LpcTypes.objectArrayType, true, ["ob", LpcTypes.objectType], ["depth", LpcTypes.intType]);
efun("destruct", LpcTypes.voidType, false, ["ob", LpcTypes.objectType]);
efun("disable_commands", LpcTypes.voidType, false);
efun("driver_info", LpcTypes.mixedType, false, ["what", LpcTypes.intType]);
efun("ed", LpcTypes.voidType, true, ["file", LpcTypes.stringType], ["func", LpcTypes.stringType]);
efun("enable_commands", LpcTypes.voidType, false);
efun("environment", LpcTypes.objectType, true, ["ob", LpcTypes.objectType]);
efun("exec", LpcTypes.intType, false, ["new", LpcTypes.objectType], ["old", LpcTypes.objectType]);
efun("exp", LpcTypes.floatType, false, ["arg", LpcTypes.intType]);
efun("explode", LpcTypes.stringArrayType, false, ["str", LpcTypes.stringType], ["del", LpcTypes.stringType]);
efun("extern_call", LpcTypes.intType, false);
efun("filter_array", LpcTypes.mixedArrayType, true, ["arr", LpcTypes.mixedArrayType], ["fun", LpcTypes.stringType], ["ob", LpcTypes.stringType], ["extra", LpcTypes.mixedType], ["args", LpcTypes.mixedType, true]);
efun("file_name", LpcTypes.stringType, false, ["ob", LpcTypes.objectType]);
efun("file_size", LpcTypes.intType, false, ["file", LpcTypes.stringType]);
efun("filter", LpcTypes.mixedArrayType, true, ["arr", LpcTypes.mixedArrayType], ["fun", LpcTypes.stringType], ["ob", LpcTypes.stringType], ["...extra", LpcTypes.mixedType,true]);
efun("filter_objects", LpcTypes.objectArrayType, true, ["arr", LpcTypes.objectArrayType], ["fun", LpcTypes.stringType], ["extra", LpcTypes.mixedType], ["args...", LpcTypes.mixedType, true]);
efun("filter_indices", LpcTypes.mappingType, true, ["map", LpcTypes.mappingType], ["fun", LpcTypes.stringType], ["ob", LpcTypes.stringType], ["args...", LpcTypes.mixedType, true]);
efun("find_object", LpcTypes.objectType, false, ["file", LpcTypes.stringType]);
efun("find_player", LpcTypes.objectType, false, ["str", LpcTypes.stringType]);
efun("first_inventory", LpcTypes.objectType, true, ["ob", LpcTypes.stringType]);
efun("find_call_out", LpcTypes.intType, true, ["func", LpcTypes.mixedType]);
efun("floatp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("floor", LpcTypes.intType, false, ["number", LpcTypes.intType]);
efun("funcall", LpcTypes.mixedType, true, ["fun", LpcTypes.closureType], ["args...", LpcTypes.mixedArrayType, true]);
efun("function_exists", LpcTypes.intType, true, ["fun", LpcTypes.stringType], ["ob", LpcTypes.objectType],["flags", LpcTypes.intType]);
efun("functionlist", LpcTypes.mixedArrayType, true, ["ob", LpcTypes.objectType], ["flags", LpcTypes.intType]);
efun("garbage_collection", LpcTypes.voidType, true, ["filename", LpcTypes.stringType], ["flag", LpcTypes.intType]);
efun("get_dir", LpcTypes.mixedArrayType, true, ["path", LpcTypes.stringType], ["flags", LpcTypes.intType]);
efun("get_eval_cost", LpcTypes.intType, false);
efun("get_error_file", LpcTypes.mixedType, true, ["name", LpcTypes.stringType], ["set_forget_flag", LpcTypes.intType]);
efun("get_extra_wizinfo", LpcTypes.mixedType, false, ["wiz", LpcTypes.objectType]);
efun("get_type_info", LpcTypes.mixedType, true, ["arg", LpcTypes.mixedType], ["flag", LpcTypes.intType]);
efun("geteuid", LpcTypes.stringType, true, ["ob", LpcTypes.objectType]);
efun("getuid", LpcTypes.stringType, true, ["ob", LpcTypes.objectType]);
efun("hash", LpcTypes.intType, true, ["method", LpcTypes.intArrayType], ["arg", LpcTypes.stringType],["iterations", LpcTypes.intType]);
efun("heart_beat_info", LpcTypes.objectType, false);
efun("implode", LpcTypes.stringType, true, ["arr", LpcTypes.mixedArrayType], ["del", LpcTypes.stringType]);
efun("interactive", LpcTypes.intType, true, ["ob", LpcTypes.objectType]);
efun("inherit_list", LpcTypes.stringArrayType, true, ["ob", LpcTypes.objectType], ["flags", LpcTypes.intType]);
efun("input_to", LpcTypes.voidType, true, ["fun", LpcTypes.stringType], ["flag", LpcTypes.intType], ["msg", LpcTypes.stringType], ["args...", LpcTypes.mixedType, true]);
efun("interactive_info", LpcTypes.mixedType, true, ["ob", LpcTypes.objectType],["what", LpcTypes.intType]);
efun("intp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("invert_bits", LpcTypes.stringType, false, ["str", LpcTypes.stringType]);
efun("json_serialize", LpcTypes.stringType, false, ["data", LpcTypes.mixedType]);
efun("json_parse", LpcTypes.mixedType, false, ["jsonstring", LpcTypes.stringType]);
efun("lambda", LpcTypes.closureType, false, ["arr", LpcTypes.mixedArrayType], ["mixed", LpcTypes.mixedType]);
efun("limited", LpcTypes.mixedType, true, ["fun", LpcTypes.closureType], ["tag", LpcTypes.intType], ["value", LpcTypes.intType], ["args...", LpcTypes.mixedType, true]);
efun("living", LpcTypes.intType, false, ["ob", LpcTypes.objectType]);
efun("localtime", LpcTypes.intArrayType, true, ["clock", LpcTypes.intType]);
efun("load_name", LpcTypes.stringType, true, ["ob", LpcTypes.objectType]);
efun("load_object", LpcTypes.objectType, false, ["file", LpcTypes.stringType]);
efun("lower_case", LpcTypes.stringType, false, ["str", LpcTypes.stringType]);
efun("lwobjectp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("master", LpcTypes.objectType, true, ["dont_load", LpcTypes.intType]);
efun("map", LpcTypes.mixedArrayType, true, ["arr", LpcTypes.mixedArrayType], ["fun", LpcTypes.closureType], ["ob", LpcTypes.stringType], ["extra", LpcTypes.mappingType]);
efun("max", LpcTypes.intType, true, ["arg", LpcTypes.mixedType], ["arg1", LpcTypes.mixedType, true]);
efun("mappingp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("mapping_contains", LpcTypes.intType, true, ["map", LpcTypes.mappingType], ["key", LpcTypes.mixedType], ["data", LpcTypes.mixedArrayType]);
efun("member", LpcTypes.intType, true, ["array", LpcTypes.mixedArrayType], ["elem", LpcTypes.mixedType], ["start", LpcTypes.intType]);
efun("min", LpcTypes.intType, true, ["arg", LpcTypes.mixedType], ["arg1", LpcTypes.mixedType]);
efun("m_add", LpcTypes.mappingType, true, ["map", LpcTypes.mappingType], ["key", LpcTypes.mixedType], ["val...", LpcTypes.mixedType,true]);
efun("m_allocate", LpcTypes.mappingType, true, ["size", LpcTypes.intType],["width", LpcTypes.intType]);
efun("m_delete", LpcTypes.mappingType, true, ["map", LpcTypes.mappingType], ["key", LpcTypes.mixedType]);
efun("m_indices", LpcTypes.mixedArrayType, false, ["map", LpcTypes.mappingType]);
efun("m_entry", LpcTypes.mixedArrayType, true, ["map", LpcTypes.mappingType], ["key", LpcTypes.mixedType]);
efun("m_reallocate", LpcTypes.mappingType, true, ["m", LpcTypes.mappingType], ["width", LpcTypes.intType]);
efun("m_sizeof", LpcTypes.intType, false, ["map", LpcTypes.mappingType]);
efun("m_values", LpcTypes.mixedArrayType, true, ["map", LpcTypes.mappingType], ["index", LpcTypes.intType]);
efun("map_array", LpcTypes.mixedArrayType, true, ["arr", LpcTypes.mixedArrayType], ["fun", LpcTypes.stringType], ["ob", LpcTypes.mixedType], ["extra", LpcTypes.mixedType]);
efun("map_objects", LpcTypes.mixedArrayType, true, ["arr", LpcTypes.objectArrayType], ["fun", LpcTypes.stringType], ["extra", LpcTypes.mixedType], ["args...", LpcTypes.mixedType, true]);
efun("md5_crypt", LpcTypes.stringType, false, ["str", LpcTypes.stringType], ["seed", LpcTypes.intType]);
efun("mkmapping", LpcTypes.mappingType, true, ["...arr", LpcTypes.mixedArrayType, true]);
efun("mkdir", LpcTypes.intType, false, ["path", LpcTypes.stringType]);
efun("move_object", LpcTypes.voidType, true, ["item", LpcTypes.mixedType], ["dest", LpcTypes.mixedType]);
efun("next_bit", LpcTypes.intType, true, ["str", LpcTypes.stringType], ["start", LpcTypes.intType], ["find_cleared", LpcTypes.intType]);
efun("next_inventory", LpcTypes.objectType, false, ["ob", LpcTypes.objectType]);
efun("notify_fail", LpcTypes.voidType, false, ["msg", LpcTypes.stringType]);
efun("object_info", LpcTypes.mixedType, true, ["ob", LpcTypes.objectType],["what", LpcTypes.intType]);
efun("object_name", LpcTypes.stringType, true, ["ob", LpcTypes.objectType]);
efun("objectp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("order_alist", LpcTypes.mixedArrayType, true, ["keys", LpcTypes.mixedArrayType], ["data", LpcTypes.mixedArrayType], ["...args", LpcTypes.mixedType, true]);
efun("playerp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("previous_object", LpcTypes.objectType, true, ["i", LpcTypes.intType]);
efun("present", LpcTypes.objectType, true, ["str", FundamentalType.stringType], ["env", LpcTypes.objectType]);
efun("present_clone", LpcTypes.objectType, true, ["str", FundamentalType.stringType], ["env", LpcTypes.objectType], ["n", LpcTypes.intType]);
efun("printf", LpcTypes.voidType, true, ["fmt", LpcTypes.stringType], ["var...", LpcTypes.mixedType, true]);
efun("process_string", LpcTypes.stringType, false, ["str", LpcTypes.stringType]);
efun("program_name", LpcTypes.stringType, true, ["ob", LpcTypes.objectType]);
efun("program_time", LpcTypes.intType, true, ["ob", LpcTypes.objectType]);
efun("pointerp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("query_actions", LpcTypes.mixedArrayType, true, ["ob", LpcTypes.objectType], ["mask_or_verb", LpcTypes.mixedType]);
efun("query_editing", LpcTypes.mixedType, true, ["ob", LpcTypes.objectType]);
efun("query_ip_number", LpcTypes.stringType, true, ["ob", LpcTypes.objectType]);
efun("query_ip_name", LpcTypes.stringType, true, ["ob", LpcTypes.objectType]);
efun("query_load_average", LpcTypes.stringType, false);
efun("query_once_interactive", LpcTypes.intType, false, ["ob", LpcTypes.objectType]);
efun("query_notify_fail", LpcTypes.mixedType, true, ["flag", LpcTypes.intType]);
efun("query_shadowing", LpcTypes.objectArrayType, false, ["ob", LpcTypes.objectType]);
efun("query_snoop", LpcTypes.objectType, true, ["ob", LpcTypes.objectType]);
efun("query_verb", LpcTypes.stringType, true, ["flag", LpcTypes.intType]);
efun("quote", LpcTypes.mixedType, false, ["arg", LpcTypes.mixedType]);
efun("raise_error", LpcTypes.voidType, false, ["arg", LpcTypes.stringType]);
efun("random", LpcTypes.intType, true, ["n", LpcTypes.intType]);
efun("read_bytes", LpcTypes.bytesType, true, ["file", LpcTypes.stringType], ["start", LpcTypes.intType], ["len", LpcTypes.intType]);
efun("read_file", LpcTypes.stringType, true, ["file", LpcTypes.stringType], ["start", LpcTypes.intType], ["len", LpcTypes.intType]);
efun("regexp", LpcTypes.stringArrayType, true, ["list", LpcTypes.stringArrayType], ["pattern", LpcTypes.stringType], ["opt", LpcTypes.intType]);
efun("regexplode", LpcTypes.stringArrayType, true, ["text", LpcTypes.stringType], ["pattern", LpcTypes.stringType], ["opt", LpcTypes.intType]);
efun("regmatch", LpcTypes.stringType, true, ["text", LpcTypes.stringType], ["pattern", LpcTypes.stringType], ["opt", LpcTypes.intType], ["start", LpcTypes.intType]);
efun("regreplace", LpcTypes.stringType, false, ["txt", LpcTypes.stringType], ["pattern", LpcTypes.stringType], ["replacepattern", LpcTypes.closureType], ["flags", LpcTypes.intType]);
efun("remove_action", LpcTypes.intType, true, ["verb", LpcTypes.intType], ["ob", LpcTypes.objectType]);
efun("remove_call_out", LpcTypes.intType, true, ["fun", LpcTypes.stringType]);
efun("remove_interactive", LpcTypes.voidType, false, ["ob", LpcTypes.objectType]);
efun("replace_program", LpcTypes.voidType, true, ["program", LpcTypes.stringType]);
efun("restore_object", LpcTypes.intType, false, ["name", LpcTypes.stringType]);
efun("restore_value", LpcTypes.mixedType, false, ["str", LpcTypes.stringType]);
efun("rename", LpcTypes.intType, false, ["from", LpcTypes.stringType], ["to", LpcTypes.stringType]);
efun("rename_object", LpcTypes.voidType, false, ["ob", LpcTypes.objectType], ["new_name", LpcTypes.stringType]);
efun("rm", LpcTypes.intType, false, ["file", LpcTypes.stringType]);
efun("rmdir", LpcTypes.intType, false, ["dir", LpcTypes.stringType]);
efun("rusage", LpcTypes.intArrayType, false);
efun("save_object", LpcTypes.intType, true, ["name", LpcTypes.stringType], ["format", LpcTypes.intType]);
efun("save_value", LpcTypes.stringType,true, ["value", LpcTypes.mixedType], ["format", LpcTypes.intType]);
efun("say", LpcTypes.voidType, true, ["msg", LpcTypes.stringType], ["exclude", LpcTypes.objectArrayType]);
efun("send_erq", LpcTypes.intType, true, ["request", LpcTypes.intType], ["data", LpcTypes.bytesType], ["callback", LpcTypes.closureType]);
efun("send_imp", LpcTypes.intType, false, ["host", LpcTypes.stringType], ["port", LpcTypes.intType], ["msg", LpcTypes.stringType]); // TODO: deprecated
efun("send_udp", LpcTypes.intType, true, ["host", LpcTypes.stringType], ["port", LpcTypes.intType], ["msg", LpcTypes.bytesType]);
efun("set_driver_hook", LpcTypes.voidType, false, ["what", LpcTypes.intType], ["arg", LpcTypes.closureType]);
efun("set_environment", LpcTypes.voidType, false, ["item", LpcTypes.objectType], ["env", LpcTypes.objectType]);
efun("set_extra_wizinfo", LpcTypes.voidType, false, ["wiz", LpcTypes.objectType], ["extra", LpcTypes.mixedType]);
efun("set_extra_wizinfo_size", LpcTypes.voidType, true, ["size", LpcTypes.intType]);    
efun("set_heart_beat", LpcTypes.intType, true, ["flag", LpcTypes.intType]);
efun("set_light", LpcTypes.voidType, true, ["intensity", LpcTypes.intType]);
efun("set_living_name", LpcTypes.voidType, false, ["name", LpcTypes.stringType]);
efun("set_is_wizard", LpcTypes.intType, true, ["ob", LpcTypes.objectType], ["n", LpcTypes.intType]);
efun("set_next_reset", LpcTypes.intType, false, ["delay", LpcTypes.intType]);
efun("set_this_object", LpcTypes.voidType, false, ["ob_to_pretend_to_be", LpcTypes.objectType]);
efun("set_this_player", LpcTypes.voidType, false, ["ob", LpcTypes.objectType]);
efun("set_prompt", LpcTypes.stringType, true, ["prompt", LpcTypes.stringType], ["ob", LpcTypes.objectType]);
efun("seteuid", LpcTypes.intType, false, ["str", LpcTypes.stringType]);
// sqlite efuns - need drvier version check
efun("sl_close", LpcTypes.voidType, false);
efun("sl_exec", LpcTypes.mixedArrayType, true, ["statement", LpcTypes.stringType], ["...args", LpcTypes.mixedType, true]);
efun("sl_insert_id", LpcTypes.intType, false);
efun("sl_open", LpcTypes.intType, true, ["filename", LpcTypes.stringType]);
efun("shadow", LpcTypes.intType, false, ["ob", LpcTypes.objectType]);
efun("shutdown", LpcTypes.voidType, true, ["exit_code", LpcTypes.intType]);
efun("sprintf", LpcTypes.stringType, true, ["fmt", LpcTypes.stringType], ["var...", LpcTypes.mixedType, true]);
efun("set_bit", LpcTypes.stringType, false, ["str", LpcTypes.stringType], ["n", LpcTypes.intType]);
efun("sscanf", LpcTypes.intType, true, ["str", LpcTypes.stringType], ["fmt", LpcTypes.stringType], ["var...", LpcTypes.mixedType, true]);
efun("strlen", LpcTypes.intType, false, ["str", LpcTypes.stringType]);
efun("strrstr", LpcTypes.intType, true, ["str", LpcTypes.stringType], ["str2", LpcTypes.stringType],["pos", LpcTypes.intType]);
efun("strstr", LpcTypes.intType, true, ["str", LpcTypes.stringType], ["str2", LpcTypes.stringType],["pos", LpcTypes.intType]);
efun("stringp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("sizeof", LpcTypes.intType, false, ["val", LpcTypes.mixedType]);
efun("strftime", LpcTypes.stringType, true, ["fmt", LpcTypes.stringType], ["clock", LpcTypes.intType], ["localized", LpcTypes.intType]);
efun("sort_array", LpcTypes.mixedArrayType, true, ["arr", LpcTypes.mixedArrayType], ["wrong_order", LpcTypes.stringType], ["ob", LpcTypes.objectType], ["...extra", LpcTypes.mixedType,true]);
efun("structp", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("symbol_function", LpcTypes.closureType, true, ["arg", LpcTypes.stringType], ["ob", LpcTypes.mixedType]);
efun("snoop", LpcTypes.objectType, true, ["snooper", LpcTypes.objectType], ["snoopee", LpcTypes.objectType]);
efun("test_bit", LpcTypes.intType, false, ["str", LpcTypes.stringType], ["n", LpcTypes.intType]);
efun("tell_object", LpcTypes.voidType, false, ["ob", LpcTypes.objectType], ["msg", LpcTypes.stringType]);
efun("tell_room", LpcTypes.voidType, true, ["ob", LpcTypes.objectType], ["msg", LpcTypes.stringType], ["exclude", LpcTypes.objectArrayType]);
efun("terminal_colour", LpcTypes.stringType, true, ["str", LpcTypes.stringType], ["map", LpcTypes.mappingType], ["wrap", LpcTypes.intType], ["indent", LpcTypes.intType]);
efun("this_interactive", LpcTypes.objectType, false);
efun("this_object", LpcTypes.objectType, false);
efun("this_player", LpcTypes.objectType, false);
efun("time", LpcTypes.intType, false);
efun("to_array", LpcTypes.mixedArrayType, false, ["str", LpcTypes.stringType]);
efun("to_bytes", LpcTypes.bytesType, true, ["unicode", LpcTypes.stringType], ["encoding", LpcTypes.stringType]);
efun("to_string", LpcTypes.stringType, false, ["arg", LpcTypes.mixedType]);
efun("to_struct", LpcTypes.mappingType, true, ["data", LpcTypes.mixedType], ["template", LpcTypes.mappingType]);
efun("to_text", LpcTypes.stringType, true, ["bytesequence", LpcTypes.bytesType], ["encoding", LpcTypes.stringType]);
efun("tls_available", LpcTypes.intType, false);
efun("tls_error", LpcTypes.stringType, false, ["errorno", LpcTypes.intType]);
efun("tls_init_connection", LpcTypes.intType, true, ["ob", LpcTypes.objectType], ["fun", LpcTypes.stringType], ["fob", LpcTypes.mixedType], ["...extra", LpcTypes.mixedType,true]);
efun("tls_query_connection_info", LpcTypes.intArrayType, false, ["ob", LpcTypes.objectType]);
efun("tls_query_connection_state", LpcTypes.intType, false, ["ob", LpcTypes.objectType]);
efun("tls_refresh_certs", LpcTypes.voidType, false);
efun("to_int", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("to_float", LpcTypes.floatType, false, ["arg", LpcTypes.intType]);
efun("to_object", LpcTypes.objectType, false, ["arg", LpcTypes.stringType]);
efun("trace", LpcTypes.intType, true, ["traceflags", LpcTypes.intType]);
efun("traceprefix", LpcTypes.stringType, true, ["prefix", LpcTypes.stringType]);
efun("transfer", LpcTypes.intType, true, ["item", LpcTypes.objectType], ["dest", LpcTypes.objectType]);
efun("transpose_array", LpcTypes.mixedArrayType, false, ["arr", LpcTypes.mixedArrayType]);
efun("trim", LpcTypes.stringType, true, ["s", LpcTypes.stringType], ["where", LpcTypes.intType], ["ch", LpcTypes.stringType]);
efun("typeof", LpcTypes.intType, false, ["arg", LpcTypes.mixedType]);
efun("throw", LpcTypes.voidType, false, ["arg", LpcTypes.mixedType]);
efun("users", LpcTypes.objectArrayType, false);
efun("walk_mapping", LpcTypes.voidType, true, ["map", LpcTypes.mappingType], ["fun", LpcTypes.stringType], ["ob", LpcTypes.stringType], ["extra", LpcTypes.mixedType], ["...args", LpcTypes.mixedType,true]);
efun("widthof", LpcTypes.intType, false, ["map", LpcTypes.mappingType]);
efun("wizlist_info", LpcTypes.mixedType, false);
efun("write", LpcTypes.voidType, false, ["msg", LpcTypes.mixedType]);
efun("write_file", LpcTypes.intType, true, ["file", LpcTypes.stringType], ["str", LpcTypes.stringType], ["flags", LpcTypes.intType]);
efun("unbound_lambda", LpcTypes.closureType, false, ["args", LpcTypes.mixedArrayType], ["mixed", LpcTypes.mixedType]);
efun("unmkmapping", LpcTypes.mixedArrayType, false, ["map", LpcTypes.mappingType]);
efun("unique_array", LpcTypes.objectArrayType, true, ["obarr", LpcTypes.objectArrayType], ["fun", LpcTypes.stringType], ["extra", LpcTypes.mixedType], ["skip", LpcTypes.mixedType]);
efun("upper_case", LpcTypes.stringType, false, ["str", LpcTypes.stringType]);
efun("utime", LpcTypes.intArrayType, false);

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

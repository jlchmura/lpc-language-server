// Generated from grammar/LPC.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { LPCListener } from "./LPCListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class LPCParser extends antlr.Parser {
    public static readonly T__0 = 1;
    public static readonly T__1 = 2;
    public static readonly T__2 = 3;
    public static readonly T__3 = 4;
    public static readonly T__4 = 5;
    public static readonly T__5 = 6;
    public static readonly T__6 = 7;
    public static readonly T__7 = 8;
    public static readonly T__8 = 9;
    public static readonly T__9 = 10;
    public static readonly T__10 = 11;
    public static readonly T__11 = 12;
    public static readonly T__12 = 13;
    public static readonly T__13 = 14;
    public static readonly T__14 = 15;
    public static readonly T__15 = 16;
    public static readonly T__16 = 17;
    public static readonly TypeModifier = 18;
    public static readonly Assign = 19;
    public static readonly PlusPlus = 20;
    public static readonly MinusMinus = 21;
    public static readonly And = 22;
    public static readonly AndAnd = 23;
    public static readonly Caret = 24;
    public static readonly Or = 25;
    public static readonly OrOr = 26;
    public static readonly Equal = 27;
    public static readonly LeftShift = 28;
    public static readonly RightShift = 29;
    public static readonly RightShift3 = 30;
    public static readonly Not = 31;
    public static readonly NotEqual = 32;
    public static readonly Compare = 33;
    public static readonly LessEqual = 34;
    public static readonly Great = 35;
    public static readonly GreatEqual = 36;
    public static readonly Arrow = 37;
    public static readonly BasicType = 38;
    public static readonly Break = 39;
    public static readonly Catch = 40;
    public static readonly Colon = 41;
    public static readonly ColonColon = 42;
    public static readonly Continue = 43;
    public static readonly DefinedName = 44;
    public static readonly Efun = 45;
    public static readonly Ellipsis = 46;
    public static readonly Else = 47;
    public static readonly If = 48;
    public static readonly Inherit = 49;
    public static readonly Return = 50;
    public static readonly For = 51;
    public static readonly Foreach = 52;
    public static readonly In = 53;
    public static readonly Switch = 54;
    public static readonly Case = 55;
    public static readonly While = 56;
    public static readonly Do = 57;
    public static readonly Default = 58;
    public static readonly New = 59;
    public static readonly ParseCommand = 60;
    public static readonly Question = 61;
    public static readonly Range = 62;
    public static readonly SScanf = 63;
    public static readonly MappingOpen = 64;
    public static readonly ArrayOpen = 65;
    public static readonly FunctionOpen = 66;
    public static readonly Number = 67;
    public static readonly Parameter = 68;
    public static readonly Real = 69;
    public static readonly DigitSequence = 70;
    public static readonly Identifier = 71;
    public static readonly Include = 72;
    public static readonly String = 73;
    public static readonly StringPrefix = 74;
    public static readonly CharacterConstant = 75;
    public static readonly TimeExpression = 76;
    public static readonly BlockComment = 77;
    public static readonly LineComment = 78;
    public static readonly Whitespace = 79;
    public static readonly Newline = 80;
    public static readonly DefineStart = 81;
    public static readonly DefineBlock = 82;
    public static readonly MultiDefine = 83;
    public static readonly MultiDefineBody = 84;
    public static readonly RULE_lpc_program = 0;
    public static readonly RULE_program = 1;
    public static readonly RULE_possible_semi_colon = 2;
    public static readonly RULE_definition = 3;
    public static readonly RULE_directive = 4;
    public static readonly RULE_defineDeclaration = 5;
    public static readonly RULE_include = 6;
    public static readonly RULE_function_definition = 7;
    public static readonly RULE_modifier_change = 8;
    public static readonly RULE_type_modifier_list = 9;
    public static readonly RULE_type_decl = 10;
    public static readonly RULE_member_list = 11;
    public static readonly RULE_member_name_list = 12;
    public static readonly RULE_member_name = 13;
    public static readonly RULE_name_list = 14;
    public static readonly RULE_new_name = 15;
    public static readonly RULE_expr0 = 16;
    public static readonly RULE_time_expression = 17;
    public static readonly RULE_expr_or_block = 18;
    public static readonly RULE_comma_expr = 19;
    public static readonly RULE_parse_command = 20;
    public static readonly RULE_sscanf = 21;
    public static readonly RULE_lvalue_list = 22;
    public static readonly RULE_cast = 23;
    public static readonly RULE_basic_type = 24;
    public static readonly RULE_atomic_type = 25;
    public static readonly RULE_expr4 = 26;
    public static readonly RULE_catch_statement = 27;
    public static readonly RULE_expr_list = 28;
    public static readonly RULE_expr_list_mapping = 29;
    public static readonly RULE_expr_list4 = 30;
    public static readonly RULE_assoc_pair = 31;
    public static readonly RULE_expr_list2 = 32;
    public static readonly RULE_expr_list_node = 33;
    public static readonly RULE_string = 34;
    public static readonly RULE_string_con2 = 35;
    public static readonly RULE_string_con1 = 36;
    public static readonly RULE_function_call = 37;
    public static readonly RULE_function_name_call = 38;
    public static readonly RULE_function_arrow_call = 39;
    public static readonly RULE_function_name = 40;
    public static readonly RULE_opt_class_init = 41;
    public static readonly RULE_class_init = 42;
    public static readonly RULE_efun_override = 43;
    public static readonly RULE_block_or_semi = 44;
    public static readonly RULE_block = 45;
    public static readonly RULE_statements = 46;
    public static readonly RULE_local_declare_statement = 47;
    public static readonly RULE_local_name_list = 48;
    public static readonly RULE_new_local_def = 49;
    public static readonly RULE_new_local_name = 50;
    public static readonly RULE_statement = 51;
    public static readonly RULE_while_statement = 52;
    public static readonly RULE_do_statement = 53;
    public static readonly RULE_switch_statement = 54;
    public static readonly RULE_local_declarations = 55;
    public static readonly RULE_case_statement = 56;
    public static readonly RULE_switch_block = 57;
    public static readonly RULE_case_label = 58;
    public static readonly RULE_constant = 59;
    public static readonly RULE_foreach_loop = 60;
    public static readonly RULE_foreach_vars = 61;
    public static readonly RULE_for_loop = 62;
    public static readonly RULE_foreach_var = 63;
    public static readonly RULE_first_for_expr = 64;
    public static readonly RULE_single_new_local_def_with_init = 65;
    public static readonly RULE_single_new_local_def = 66;
    public static readonly RULE_for_expr = 67;
    public static readonly RULE_returnStatement = 68;
    public static readonly RULE_cond = 69;
    public static readonly RULE_optional_else_part = 70;
    public static readonly RULE_argument = 71;
    public static readonly RULE_argument_list = 72;
    public static readonly RULE_new_arg = 73;
    public static readonly RULE_inheritance = 74;
    public static readonly RULE_data_type = 75;
    public static readonly RULE_opt_basic_type = 76;
    public static readonly RULE_optional_star = 77;
    public static readonly RULE_identifier = 78;

    public static readonly literalNames = [
        null, "';'", "'#'", "'('", "')'", "'{'", "'}'", "','", "'<'", "'*'", 
        "'%'", "'/'", "'+'", "'-'", "'~'", "'$'", "'['", "']'", null, null, 
        "'++'", "'--'", "'&'", "'&&'", "'^'", "'|'", "'||'", "'=='", "'<<'", 
        "'>>'", "'>>>'", "'!'", "'!='", null, "'<='", "'>'", "'>='", "'->'", 
        null, "'break'", "'catch'", "':'", "'::'", "'continue'", "'foo'", 
        "'efun'", "'...'", "'else'", "'if'", "'inherit'", "'return'", "'for'", 
        "'foreach'", "'in'", "'switch'", "'case'", "'while'", "'do'", "'default'", 
        "'new'", "'parse_command'", "'?'", "'..'", "'sscanf'", null, null, 
        null, null, null, null, null, null, null, null, "'@'", null, "'time_expression'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, "TypeModifier", "Assign", 
        "PlusPlus", "MinusMinus", "And", "AndAnd", "Caret", "Or", "OrOr", 
        "Equal", "LeftShift", "RightShift", "RightShift3", "Not", "NotEqual", 
        "Compare", "LessEqual", "Great", "GreatEqual", "Arrow", "BasicType", 
        "Break", "Catch", "Colon", "ColonColon", "Continue", "DefinedName", 
        "Efun", "Ellipsis", "Else", "If", "Inherit", "Return", "For", "Foreach", 
        "In", "Switch", "Case", "While", "Do", "Default", "New", "ParseCommand", 
        "Question", "Range", "SScanf", "MappingOpen", "ArrayOpen", "FunctionOpen", 
        "Number", "Parameter", "Real", "DigitSequence", "Identifier", "Include", 
        "String", "StringPrefix", "CharacterConstant", "TimeExpression", 
        "BlockComment", "LineComment", "Whitespace", "Newline", "DefineStart", 
        "DefineBlock", "MultiDefine", "MultiDefineBody"
    ];
    public static readonly ruleNames = [
        "lpc_program", "program", "possible_semi_colon", "definition", "directive", 
        "defineDeclaration", "include", "function_definition", "modifier_change", 
        "type_modifier_list", "type_decl", "member_list", "member_name_list", 
        "member_name", "name_list", "new_name", "expr0", "time_expression", 
        "expr_or_block", "comma_expr", "parse_command", "sscanf", "lvalue_list", 
        "cast", "basic_type", "atomic_type", "expr4", "catch_statement", 
        "expr_list", "expr_list_mapping", "expr_list4", "assoc_pair", "expr_list2", 
        "expr_list_node", "string", "string_con2", "string_con1", "function_call", 
        "function_name_call", "function_arrow_call", "function_name", "opt_class_init", 
        "class_init", "efun_override", "block_or_semi", "block", "statements", 
        "local_declare_statement", "local_name_list", "new_local_def", "new_local_name", 
        "statement", "while_statement", "do_statement", "switch_statement", 
        "local_declarations", "case_statement", "switch_block", "case_label", 
        "constant", "foreach_loop", "foreach_vars", "for_loop", "foreach_var", 
        "first_for_expr", "single_new_local_def_with_init", "single_new_local_def", 
        "for_expr", "returnStatement", "cond", "optional_else_part", "argument", 
        "argument_list", "new_arg", "inheritance", "data_type", "opt_basic_type", 
        "optional_star", "identifier",
    ];

    public get grammarFileName(): string { return "LPC.g4"; }
    public get literalNames(): (string | null)[] { return LPCParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return LPCParser.symbolicNames; }
    public get ruleNames(): string[] { return LPCParser.ruleNames; }
    public get serializedATN(): number[] { return LPCParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, LPCParser._ATN, LPCParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public lpc_program(): Lpc_programContext {
        let localContext = new Lpc_programContext(this.context, this.state);
        this.enterRule(localContext, 0, LPCParser.RULE_lpc_program);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 158;
            this.program(0);
            this.state = 159;
            this.match(LPCParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public program(): ProgramContext;
    public program(_p: number): ProgramContext;
    public program(_p?: number): ProgramContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new ProgramContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 2;
        this.enterRecursionRule(localContext, 2, LPCParser.RULE_program, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 171;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new ProgramContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_program);
                    this.state = 162;
                    if (!(this.precpred(this.context, 2))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                    }
                    this.state = 167;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case LPCParser.T__1:
                    case LPCParser.DefineBlock:
                    case LPCParser.MultiDefine:
                        {
                        this.state = 163;
                        this.directive();
                        }
                        break;
                    case LPCParser.T__8:
                    case LPCParser.TypeModifier:
                    case LPCParser.BasicType:
                    case LPCParser.Colon:
                    case LPCParser.DefinedName:
                    case LPCParser.Inherit:
                    case LPCParser.Identifier:
                        {
                        this.state = 164;
                        this.definition();
                        this.state = 165;
                        this.possible_semi_colon();
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    }
                    }
                }
                this.state = 173;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public possible_semi_colon(): Possible_semi_colonContext {
        let localContext = new Possible_semi_colonContext(this.context, this.state);
        this.enterRule(localContext, 4, LPCParser.RULE_possible_semi_colon);
        try {
            this.state = 176;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                // tslint:disable-next-line:no-empty
                {
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 175;
                this.match(LPCParser.T__0);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public definition(): DefinitionContext {
        let localContext = new DefinitionContext(this.context, this.state);
        this.enterRule(localContext, 6, LPCParser.RULE_definition);
        try {
            this.state = 186;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 178;
                this.function_definition();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 179;
                this.data_type();
                this.state = 180;
                this.name_list();
                this.state = 181;
                this.match(LPCParser.T__0);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 183;
                this.inheritance();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 184;
                this.type_decl();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 185;
                this.modifier_change();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public directive(): DirectiveContext {
        let localContext = new DirectiveContext(this.context, this.state);
        this.enterRule(localContext, 8, LPCParser.RULE_directive);
        try {
            this.state = 190;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.DefineBlock:
            case LPCParser.MultiDefine:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 188;
                this.defineDeclaration();
                }
                break;
            case LPCParser.T__1:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 189;
                this.include();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public defineDeclaration(): DefineDeclarationContext {
        let localContext = new DefineDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 10, LPCParser.RULE_defineDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 192;
            _la = this.tokenStream.LA(1);
            if(!(_la === 82 || _la === 83)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public include(): IncludeContext {
        let localContext = new IncludeContext(this.context, this.state);
        this.enterRule(localContext, 12, LPCParser.RULE_include);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 194;
            this.match(LPCParser.T__1);
            this.state = 198;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 79) {
                {
                {
                this.state = 195;
                this.match(LPCParser.Whitespace);
                }
                }
                this.state = 200;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 201;
            this.match(LPCParser.Include);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public function_definition(): Function_definitionContext {
        let localContext = new Function_definitionContext(this.context, this.state);
        this.enterRule(localContext, 14, LPCParser.RULE_function_definition);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 203;
            this.data_type();
            this.state = 204;
            this.optional_star();
            this.state = 205;
            this.identifier();
            this.state = 206;
            this.match(LPCParser.T__2);
            this.state = 207;
            this.argument();
            this.state = 208;
            this.match(LPCParser.T__3);
            this.state = 209;
            this.block_or_semi();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public modifier_change(): Modifier_changeContext {
        let localContext = new Modifier_changeContext(this.context, this.state);
        this.enterRule(localContext, 16, LPCParser.RULE_modifier_change);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 211;
            this.type_modifier_list();
            this.state = 212;
            this.match(LPCParser.Colon);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public type_modifier_list(): Type_modifier_listContext {
        let localContext = new Type_modifier_listContext(this.context, this.state);
        this.enterRule(localContext, 18, LPCParser.RULE_type_modifier_list);
        try {
            this.state = 217;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.T__8:
            case LPCParser.BasicType:
            case LPCParser.Colon:
            case LPCParser.DefinedName:
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                // tslint:disable-next-line:no-empty
                {
                }
                break;
            case LPCParser.TypeModifier:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 215;
                this.match(LPCParser.TypeModifier);
                this.state = 216;
                this.type_modifier_list();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public type_decl(): Type_declContext {
        let localContext = new Type_declContext(this.context, this.state);
        this.enterRule(localContext, 20, LPCParser.RULE_type_decl);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 219;
            this.type_modifier_list();
            this.state = 220;
            this.identifier();
            this.state = 221;
            this.match(LPCParser.T__4);
            this.state = 222;
            this.member_list(0);
            this.state = 223;
            this.match(LPCParser.T__5);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public member_list(): Member_listContext;
    public member_list(_p: number): Member_listContext;
    public member_list(_p?: number): Member_listContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new Member_listContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 22;
        this.enterRecursionRule(localContext, 22, LPCParser.RULE_member_list, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 233;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new Member_listContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_member_list);
                    this.state = 226;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 227;
                    this.data_type();
                    this.state = 228;
                    this.member_name_list();
                    this.state = 229;
                    this.match(LPCParser.T__0);
                    }
                    }
                }
                this.state = 235;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public member_name_list(): Member_name_listContext {
        let localContext = new Member_name_listContext(this.context, this.state);
        this.enterRule(localContext, 24, LPCParser.RULE_member_name_list);
        try {
            this.state = 241;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 236;
                this.member_name();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 237;
                this.member_name();
                this.state = 238;
                this.match(LPCParser.T__6);
                this.state = 239;
                this.member_name_list();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public member_name(): Member_nameContext {
        let localContext = new Member_nameContext(this.context, this.state);
        this.enterRule(localContext, 26, LPCParser.RULE_member_name);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 243;
            this.optional_star();
            this.state = 244;
            this.identifier();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public name_list(): Name_listContext {
        let localContext = new Name_listContext(this.context, this.state);
        this.enterRule(localContext, 28, LPCParser.RULE_name_list);
        try {
            this.state = 251;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 246;
                this.new_name();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 247;
                this.new_name();
                this.state = 248;
                this.match(LPCParser.T__6);
                this.state = 249;
                this.name_list();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public new_name(): New_nameContext {
        let localContext = new New_nameContext(this.context, this.state);
        this.enterRule(localContext, 30, LPCParser.RULE_new_name);
        try {
            this.state = 261;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 253;
                this.optional_star();
                this.state = 254;
                this.identifier();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 256;
                this.optional_star();
                this.state = 257;
                this.identifier();
                this.state = 258;
                this.match(LPCParser.Assign);
                this.state = 259;
                this.expr0(0);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public expr0(): Expr0Context;
    public expr0(_p: number): Expr0Context;
    public expr0(_p?: number): Expr0Context {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new Expr0Context(this.context, parentState);
        let previousContext = localContext;
        let _startState = 32;
        this.enterRecursionRule(localContext, 32, LPCParser.RULE_expr0, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 293;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 11, this.context) ) {
            case 1:
                {
                this.state = 264;
                this.expr4(0);
                this.state = 265;
                this.match(LPCParser.Assign);
                this.state = 266;
                this.expr0(30);
                }
                break;
            case 2:
                {
                this.state = 268;
                this.cast();
                this.state = 269;
                this.expr0(14);
                }
                break;
            case 3:
                {
                this.state = 271;
                this.match(LPCParser.PlusPlus);
                this.state = 272;
                this.expr4(0);
                }
                break;
            case 4:
                {
                this.state = 273;
                this.match(LPCParser.MinusMinus);
                this.state = 274;
                this.expr4(0);
                }
                break;
            case 5:
                {
                this.state = 275;
                this.match(LPCParser.Not);
                this.state = 276;
                this.expr0(11);
                }
                break;
            case 6:
                {
                this.state = 277;
                this.match(LPCParser.T__13);
                this.state = 278;
                this.expr0(10);
                }
                break;
            case 7:
                {
                this.state = 279;
                this.match(LPCParser.T__12);
                this.state = 280;
                this.expr0(9);
                }
                break;
            case 8:
                {
                this.state = 281;
                this.expr4(0);
                this.state = 282;
                this.match(LPCParser.PlusPlus);
                }
                break;
            case 9:
                {
                this.state = 284;
                this.expr4(0);
                this.state = 285;
                this.match(LPCParser.MinusMinus);
                }
                break;
            case 10:
                {
                this.state = 287;
                this.expr4(0);
                }
                break;
            case 11:
                {
                this.state = 288;
                this.sscanf();
                }
                break;
            case 12:
                {
                this.state = 289;
                this.parse_command();
                }
                break;
            case 13:
                {
                this.state = 290;
                this.time_expression();
                }
                break;
            case 14:
                {
                this.state = 291;
                this.match(LPCParser.Number);
                }
                break;
            case 15:
                {
                this.state = 292;
                this.match(LPCParser.Real);
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 345;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 13, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 343;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 12, this.context) ) {
                    case 1:
                        {
                        localContext = new Expr0Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr0);
                        this.state = 295;
                        if (!(this.precpred(this.context, 29))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 29)");
                        }
                        this.state = 296;
                        this.match(LPCParser.Question);
                        this.state = 297;
                        this.expr0(0);
                        this.state = 298;
                        this.match(LPCParser.Colon);
                        this.state = 299;
                        this.expr0(30);
                        }
                        break;
                    case 2:
                        {
                        localContext = new Expr0Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr0);
                        this.state = 301;
                        if (!(this.precpred(this.context, 28))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 28)");
                        }
                        this.state = 302;
                        this.match(LPCParser.OrOr);
                        this.state = 303;
                        this.expr0(29);
                        }
                        break;
                    case 3:
                        {
                        localContext = new Expr0Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr0);
                        this.state = 304;
                        if (!(this.precpred(this.context, 27))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 27)");
                        }
                        this.state = 305;
                        this.match(LPCParser.AndAnd);
                        this.state = 306;
                        this.expr0(28);
                        }
                        break;
                    case 4:
                        {
                        localContext = new Expr0Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr0);
                        this.state = 307;
                        if (!(this.precpred(this.context, 26))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 26)");
                        }
                        this.state = 308;
                        this.match(LPCParser.Or);
                        this.state = 309;
                        this.expr0(27);
                        }
                        break;
                    case 5:
                        {
                        localContext = new Expr0Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr0);
                        this.state = 310;
                        if (!(this.precpred(this.context, 25))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 25)");
                        }
                        this.state = 311;
                        this.match(LPCParser.Caret);
                        this.state = 312;
                        this.expr0(26);
                        }
                        break;
                    case 6:
                        {
                        localContext = new Expr0Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr0);
                        this.state = 313;
                        if (!(this.precpred(this.context, 24))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 24)");
                        }
                        this.state = 314;
                        this.match(LPCParser.And);
                        this.state = 315;
                        this.expr0(25);
                        }
                        break;
                    case 7:
                        {
                        localContext = new Expr0Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr0);
                        this.state = 316;
                        if (!(this.precpred(this.context, 23))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 23)");
                        }
                        this.state = 317;
                        this.match(LPCParser.Equal);
                        this.state = 318;
                        this.expr0(24);
                        }
                        break;
                    case 8:
                        {
                        localContext = new Expr0Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr0);
                        this.state = 319;
                        if (!(this.precpred(this.context, 22))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 22)");
                        }
                        this.state = 320;
                        this.match(LPCParser.NotEqual);
                        this.state = 321;
                        this.expr0(23);
                        }
                        break;
                    case 9:
                        {
                        localContext = new Expr0Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr0);
                        this.state = 322;
                        if (!(this.precpred(this.context, 21))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 21)");
                        }
                        this.state = 323;
                        this.match(LPCParser.Compare);
                        this.state = 324;
                        this.expr0(22);
                        }
                        break;
                    case 10:
                        {
                        localContext = new Expr0Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr0);
                        this.state = 325;
                        if (!(this.precpred(this.context, 20))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 20)");
                        }
                        this.state = 326;
                        this.match(LPCParser.T__7);
                        this.state = 327;
                        this.expr0(21);
                        }
                        break;
                    case 11:
                        {
                        localContext = new Expr0Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr0);
                        this.state = 328;
                        if (!(this.precpred(this.context, 19))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 19)");
                        }
                        this.state = 329;
                        this.match(LPCParser.LeftShift);
                        this.state = 330;
                        this.expr0(20);
                        }
                        break;
                    case 12:
                        {
                        localContext = new Expr0Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr0);
                        this.state = 331;
                        if (!(this.precpred(this.context, 18))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 18)");
                        }
                        this.state = 332;
                        this.match(LPCParser.RightShift);
                        this.state = 333;
                        this.expr0(19);
                        }
                        break;
                    case 13:
                        {
                        localContext = new Expr0Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr0);
                        this.state = 334;
                        if (!(this.precpred(this.context, 17))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 17)");
                        }
                        this.state = 335;
                        this.match(LPCParser.RightShift3);
                        this.state = 336;
                        this.expr0(18);
                        }
                        break;
                    case 14:
                        {
                        localContext = new Expr0Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr0);
                        this.state = 337;
                        if (!(this.precpred(this.context, 16))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 16)");
                        }
                        this.state = 338;
                        _la = this.tokenStream.LA(1);
                        if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 3584) !== 0))) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 339;
                        this.expr0(17);
                        }
                        break;
                    case 15:
                        {
                        localContext = new Expr0Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr0);
                        this.state = 340;
                        if (!(this.precpred(this.context, 15))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 15)");
                        }
                        this.state = 341;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 12 || _la === 13)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 342;
                        this.expr0(16);
                        }
                        break;
                    }
                    }
                }
                this.state = 347;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 13, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public time_expression(): Time_expressionContext {
        let localContext = new Time_expressionContext(this.context, this.state);
        this.enterRule(localContext, 34, LPCParser.RULE_time_expression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 348;
            this.match(LPCParser.TimeExpression);
            this.state = 349;
            this.expr_or_block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expr_or_block(): Expr_or_blockContext {
        let localContext = new Expr_or_blockContext(this.context, this.state);
        this.enterRule(localContext, 36, LPCParser.RULE_expr_or_block);
        try {
            this.state = 356;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.T__4:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 351;
                this.block();
                }
                break;
            case LPCParser.T__2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 352;
                this.match(LPCParser.T__2);
                this.state = 353;
                this.comma_expr(0);
                this.state = 354;
                this.match(LPCParser.T__3);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public comma_expr(): Comma_exprContext;
    public comma_expr(_p: number): Comma_exprContext;
    public comma_expr(_p?: number): Comma_exprContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new Comma_exprContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 38;
        this.enterRecursionRule(localContext, 38, LPCParser.RULE_comma_expr, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 359;
            this.expr0(0);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 366;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 15, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new Comma_exprContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_comma_expr);
                    this.state = 361;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 362;
                    this.match(LPCParser.T__6);
                    this.state = 363;
                    this.expr0(0);
                    }
                    }
                }
                this.state = 368;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 15, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public parse_command(): Parse_commandContext {
        let localContext = new Parse_commandContext(this.context, this.state);
        this.enterRule(localContext, 40, LPCParser.RULE_parse_command);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 369;
            this.match(LPCParser.ParseCommand);
            this.state = 370;
            this.match(LPCParser.T__2);
            this.state = 371;
            this.expr0(0);
            this.state = 372;
            this.match(LPCParser.T__6);
            this.state = 373;
            this.expr0(0);
            this.state = 374;
            this.match(LPCParser.T__6);
            this.state = 375;
            this.expr0(0);
            this.state = 376;
            this.lvalue_list();
            this.state = 377;
            this.match(LPCParser.T__3);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public sscanf(): SscanfContext {
        let localContext = new SscanfContext(this.context, this.state);
        this.enterRule(localContext, 42, LPCParser.RULE_sscanf);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 379;
            this.match(LPCParser.SScanf);
            this.state = 380;
            this.match(LPCParser.T__2);
            this.state = 381;
            this.expr0(0);
            this.state = 382;
            this.match(LPCParser.T__6);
            this.state = 383;
            this.expr0(0);
            this.state = 384;
            this.lvalue_list();
            this.state = 385;
            this.match(LPCParser.T__3);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public lvalue_list(): Lvalue_listContext {
        let localContext = new Lvalue_listContext(this.context, this.state);
        this.enterRule(localContext, 44, LPCParser.RULE_lvalue_list);
        try {
            this.state = 392;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.T__3:
                this.enterOuterAlt(localContext, 1);
                // tslint:disable-next-line:no-empty
                {
                }
                break;
            case LPCParser.T__6:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 388;
                this.match(LPCParser.T__6);
                this.state = 389;
                this.expr4(0);
                this.state = 390;
                this.lvalue_list();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public cast(): CastContext {
        let localContext = new CastContext(this.context, this.state);
        this.enterRule(localContext, 46, LPCParser.RULE_cast);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 394;
            this.match(LPCParser.T__2);
            this.state = 395;
            this.basic_type();
            this.state = 396;
            this.optional_star();
            this.state = 397;
            this.match(LPCParser.T__3);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public basic_type(): Basic_typeContext {
        let localContext = new Basic_typeContext(this.context, this.state);
        this.enterRule(localContext, 48, LPCParser.RULE_basic_type);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 399;
            this.atomic_type();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public atomic_type(): Atomic_typeContext {
        let localContext = new Atomic_typeContext(this.context, this.state);
        this.enterRule(localContext, 50, LPCParser.RULE_atomic_type);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 401;
            _la = this.tokenStream.LA(1);
            if(!(_la === 38 || _la === 44)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public expr4(): Expr4Context;
    public expr4(_p: number): Expr4Context;
    public expr4(_p?: number): Expr4Context {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new Expr4Context(this.context, parentState);
        let previousContext = localContext;
        let _startState = 52;
        this.enterRecursionRule(localContext, 52, LPCParser.RULE_expr4, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 441;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context) ) {
            case 1:
                {
                this.state = 404;
                this.function_call();
                }
                break;
            case 2:
                {
                this.state = 405;
                this.match(LPCParser.DefinedName);
                }
                break;
            case 3:
                {
                this.state = 406;
                this.match(LPCParser.Identifier);
                }
                break;
            case 4:
                {
                this.state = 407;
                this.match(LPCParser.Parameter);
                }
                break;
            case 5:
                {
                this.state = 408;
                this.match(LPCParser.T__14);
                this.state = 409;
                this.match(LPCParser.T__2);
                this.state = 410;
                this.comma_expr(0);
                this.state = 411;
                this.match(LPCParser.T__3);
                }
                break;
            case 6:
                {
                this.state = 413;
                this.string_();
                }
                break;
            case 7:
                {
                this.state = 414;
                this.match(LPCParser.CharacterConstant);
                }
                break;
            case 8:
                {
                this.state = 415;
                this.match(LPCParser.T__2);
                this.state = 416;
                this.comma_expr(0);
                this.state = 417;
                this.match(LPCParser.T__3);
                }
                break;
            case 9:
                {
                this.state = 419;
                this.catch_statement();
                }
                break;
            case 10:
                {
                this.state = 420;
                this.match(LPCParser.BasicType);
                this.state = 421;
                this.match(LPCParser.T__2);
                this.state = 422;
                this.argument();
                this.state = 423;
                this.match(LPCParser.T__3);
                this.state = 424;
                this.block();
                }
                break;
            case 11:
                {
                this.state = 426;
                this.match(LPCParser.FunctionOpen);
                this.state = 427;
                this.comma_expr(0);
                this.state = 428;
                this.match(LPCParser.Colon);
                this.state = 429;
                this.match(LPCParser.T__3);
                }
                break;
            case 12:
                {
                this.state = 431;
                this.match(LPCParser.MappingOpen);
                this.state = 432;
                this.expr_list_mapping();
                this.state = 433;
                this.match(LPCParser.T__16);
                this.state = 434;
                this.match(LPCParser.T__3);
                }
                break;
            case 13:
                {
                this.state = 436;
                this.match(LPCParser.ArrayOpen);
                this.state = 437;
                this.expr_list();
                this.state = 438;
                this.match(LPCParser.T__5);
                this.state = 439;
                this.match(LPCParser.T__3);
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 506;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 19, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 504;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 18, this.context) ) {
                    case 1:
                        {
                        localContext = new Expr4Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr4);
                        this.state = 443;
                        if (!(this.precpred(this.context, 22))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 22)");
                        }
                        this.state = 444;
                        this.function_arrow_call();
                        }
                        break;
                    case 2:
                        {
                        localContext = new Expr4Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr4);
                        this.state = 445;
                        if (!(this.precpred(this.context, 17))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 17)");
                        }
                        this.state = 446;
                        this.match(LPCParser.Arrow);
                        this.state = 447;
                        this.identifier();
                        }
                        break;
                    case 3:
                        {
                        localContext = new Expr4Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr4);
                        this.state = 448;
                        if (!(this.precpred(this.context, 16))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 16)");
                        }
                        this.state = 449;
                        this.match(LPCParser.T__15);
                        this.state = 450;
                        this.comma_expr(0);
                        this.state = 451;
                        this.match(LPCParser.Range);
                        this.state = 452;
                        this.match(LPCParser.T__7);
                        this.state = 453;
                        this.comma_expr(0);
                        this.state = 454;
                        this.match(LPCParser.T__16);
                        }
                        break;
                    case 4:
                        {
                        localContext = new Expr4Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr4);
                        this.state = 456;
                        if (!(this.precpred(this.context, 15))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 15)");
                        }
                        this.state = 457;
                        this.match(LPCParser.T__15);
                        this.state = 458;
                        this.comma_expr(0);
                        this.state = 459;
                        this.match(LPCParser.Range);
                        this.state = 460;
                        this.comma_expr(0);
                        this.state = 461;
                        this.match(LPCParser.T__16);
                        }
                        break;
                    case 5:
                        {
                        localContext = new Expr4Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr4);
                        this.state = 463;
                        if (!(this.precpred(this.context, 14))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 14)");
                        }
                        this.state = 464;
                        this.match(LPCParser.T__15);
                        this.state = 465;
                        this.match(LPCParser.T__7);
                        this.state = 466;
                        this.comma_expr(0);
                        this.state = 467;
                        this.match(LPCParser.Range);
                        this.state = 468;
                        this.comma_expr(0);
                        this.state = 469;
                        this.match(LPCParser.T__16);
                        }
                        break;
                    case 6:
                        {
                        localContext = new Expr4Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr4);
                        this.state = 471;
                        if (!(this.precpred(this.context, 13))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 13)");
                        }
                        this.state = 472;
                        this.match(LPCParser.T__15);
                        this.state = 473;
                        this.match(LPCParser.T__7);
                        this.state = 474;
                        this.comma_expr(0);
                        this.state = 475;
                        this.match(LPCParser.Range);
                        this.state = 476;
                        this.match(LPCParser.T__7);
                        this.state = 477;
                        this.comma_expr(0);
                        this.state = 478;
                        this.match(LPCParser.T__16);
                        }
                        break;
                    case 7:
                        {
                        localContext = new Expr4Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr4);
                        this.state = 480;
                        if (!(this.precpred(this.context, 12))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 12)");
                        }
                        this.state = 481;
                        this.match(LPCParser.T__15);
                        this.state = 482;
                        this.comma_expr(0);
                        this.state = 483;
                        this.match(LPCParser.Range);
                        this.state = 484;
                        this.match(LPCParser.T__16);
                        }
                        break;
                    case 8:
                        {
                        localContext = new Expr4Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr4);
                        this.state = 486;
                        if (!(this.precpred(this.context, 11))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 11)");
                        }
                        this.state = 487;
                        this.match(LPCParser.T__15);
                        this.state = 488;
                        this.match(LPCParser.T__7);
                        this.state = 489;
                        this.comma_expr(0);
                        this.state = 490;
                        this.match(LPCParser.Range);
                        this.state = 491;
                        this.match(LPCParser.T__16);
                        }
                        break;
                    case 9:
                        {
                        localContext = new Expr4Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr4);
                        this.state = 493;
                        if (!(this.precpred(this.context, 10))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 10)");
                        }
                        this.state = 494;
                        this.match(LPCParser.T__15);
                        this.state = 495;
                        this.match(LPCParser.T__7);
                        this.state = 496;
                        this.comma_expr(0);
                        this.state = 497;
                        this.match(LPCParser.T__16);
                        }
                        break;
                    case 10:
                        {
                        localContext = new Expr4Context(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr4);
                        this.state = 499;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 500;
                        this.match(LPCParser.T__15);
                        this.state = 501;
                        this.comma_expr(0);
                        this.state = 502;
                        this.match(LPCParser.T__16);
                        }
                        break;
                    }
                    }
                }
                this.state = 508;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 19, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public catch_statement(): Catch_statementContext {
        let localContext = new Catch_statementContext(this.context, this.state);
        this.enterRule(localContext, 54, LPCParser.RULE_catch_statement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 509;
            this.match(LPCParser.Catch);
            this.state = 510;
            this.expr_or_block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expr_list(): Expr_listContext {
        let localContext = new Expr_listContext(this.context, this.state);
        this.enterRule(localContext, 56, LPCParser.RULE_expr_list);
        try {
            this.state = 517;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 20, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                // tslint:disable-next-line:no-empty
                {
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 513;
                this.expr_list2(0);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 514;
                this.expr_list2(0);
                this.state = 515;
                this.match(LPCParser.T__6);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expr_list_mapping(): Expr_list_mappingContext {
        let localContext = new Expr_list_mappingContext(this.context, this.state);
        this.enterRule(localContext, 58, LPCParser.RULE_expr_list_mapping);
        try {
            this.state = 524;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 21, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                // tslint:disable-next-line:no-empty
                {
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 520;
                this.expr_list4(0);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 521;
                this.expr_list4(0);
                this.state = 522;
                this.match(LPCParser.T__6);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public expr_list4(): Expr_list4Context;
    public expr_list4(_p: number): Expr_list4Context;
    public expr_list4(_p?: number): Expr_list4Context {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new Expr_list4Context(this.context, parentState);
        let previousContext = localContext;
        let _startState = 60;
        this.enterRecursionRule(localContext, 60, LPCParser.RULE_expr_list4, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 529;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 22, this.context) ) {
            case 1:
                {
                this.state = 527;
                this.expr0(0);
                }
                break;
            case 2:
                {
                this.state = 528;
                this.assoc_pair();
                }
                break;
            }
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 539;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 24, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new Expr_list4Context(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr_list4);
                    this.state = 531;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 532;
                    this.match(LPCParser.T__6);
                    this.state = 535;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 23, this.context) ) {
                    case 1:
                        {
                        this.state = 533;
                        this.expr0(0);
                        }
                        break;
                    case 2:
                        {
                        this.state = 534;
                        this.assoc_pair();
                        }
                        break;
                    }
                    }
                    }
                }
                this.state = 541;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 24, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public assoc_pair(): Assoc_pairContext {
        let localContext = new Assoc_pairContext(this.context, this.state);
        this.enterRule(localContext, 62, LPCParser.RULE_assoc_pair);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 542;
            this.expr0(0);
            this.state = 543;
            this.match(LPCParser.Colon);
            this.state = 544;
            this.expr0(0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public expr_list2(): Expr_list2Context;
    public expr_list2(_p: number): Expr_list2Context;
    public expr_list2(_p?: number): Expr_list2Context {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new Expr_list2Context(this.context, parentState);
        let previousContext = localContext;
        let _startState = 64;
        this.enterRecursionRule(localContext, 64, LPCParser.RULE_expr_list2, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 547;
            this.expr_list_node();
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 554;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 25, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new Expr_list2Context(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expr_list2);
                    this.state = 549;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 550;
                    this.match(LPCParser.T__6);
                    this.state = 551;
                    this.expr_list_node();
                    }
                    }
                }
                this.state = 556;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 25, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public expr_list_node(): Expr_list_nodeContext {
        let localContext = new Expr_list_nodeContext(this.context, this.state);
        this.enterRule(localContext, 66, LPCParser.RULE_expr_list_node);
        try {
            this.state = 561;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 26, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 557;
                this.expr0(0);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 558;
                this.expr0(0);
                this.state = 559;
                this.match(LPCParser.Ellipsis);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public string_(): StringContext {
        let localContext = new StringContext(this.context, this.state);
        this.enterRule(localContext, 68, LPCParser.RULE_string);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 563;
            this.string_con2(0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public string_con2(): String_con2Context;
    public string_con2(_p: number): String_con2Context;
    public string_con2(_p?: number): String_con2Context {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new String_con2Context(this.context, parentState);
        let previousContext = localContext;
        let _startState = 70;
        this.enterRecursionRule(localContext, 70, LPCParser.RULE_string_con2, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 566;
            this.match(LPCParser.String);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 572;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 27, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new String_con2Context(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_string_con2);
                    this.state = 568;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 569;
                    this.match(LPCParser.String);
                    }
                    }
                }
                this.state = 574;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 27, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }

    public string_con1(): String_con1Context;
    public string_con1(_p: number): String_con1Context;
    public string_con1(_p?: number): String_con1Context {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new String_con1Context(this.context, parentState);
        let previousContext = localContext;
        let _startState = 72;
        this.enterRecursionRule(localContext, 72, LPCParser.RULE_string_con1, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 581;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.String:
                {
                this.state = 576;
                this.string_con2(0);
                }
                break;
            case LPCParser.T__2:
                {
                this.state = 577;
                this.match(LPCParser.T__2);
                this.state = 578;
                this.string_con1(0);
                this.state = 579;
                this.match(LPCParser.T__3);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 588;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 29, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new String_con1Context(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_string_con1);
                    this.state = 583;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 584;
                    this.match(LPCParser.T__11);
                    this.state = 585;
                    this.string_con1(2);
                    }
                    }
                }
                this.state = 590;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 29, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public function_call(): Function_callContext {
        let localContext = new Function_callContext(this.context, this.state);
        this.enterRule(localContext, 74, LPCParser.RULE_function_call);
        try {
            this.state = 622;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 30, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 591;
                this.efun_override();
                this.state = 592;
                this.match(LPCParser.T__2);
                this.state = 593;
                this.expr_list();
                this.state = 594;
                this.match(LPCParser.T__3);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 596;
                this.match(LPCParser.New);
                this.state = 597;
                this.match(LPCParser.T__2);
                this.state = 598;
                this.expr_list();
                this.state = 599;
                this.match(LPCParser.T__3);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 601;
                this.match(LPCParser.New);
                this.state = 602;
                this.match(LPCParser.T__2);
                this.state = 603;
                this.match(LPCParser.DefinedName);
                this.state = 604;
                this.opt_class_init(0);
                this.state = 605;
                this.match(LPCParser.T__3);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 607;
                this.match(LPCParser.DefinedName);
                this.state = 608;
                this.match(LPCParser.T__2);
                this.state = 609;
                this.expr_list();
                this.state = 610;
                this.match(LPCParser.T__3);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 612;
                this.function_name_call();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 613;
                this.function_arrow_call();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 614;
                this.match(LPCParser.T__2);
                this.state = 615;
                this.match(LPCParser.T__8);
                this.state = 616;
                this.comma_expr(0);
                this.state = 617;
                this.match(LPCParser.T__3);
                this.state = 618;
                this.match(LPCParser.T__2);
                this.state = 619;
                this.expr_list();
                this.state = 620;
                this.match(LPCParser.T__3);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public function_name_call(): Function_name_callContext {
        let localContext = new Function_name_callContext(this.context, this.state);
        this.enterRule(localContext, 76, LPCParser.RULE_function_name_call);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 624;
            this.function_name();
            this.state = 625;
            this.match(LPCParser.T__2);
            this.state = 626;
            this.expr_list();
            this.state = 627;
            this.match(LPCParser.T__3);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public function_arrow_call(): Function_arrow_callContext {
        let localContext = new Function_arrow_callContext(this.context, this.state);
        this.enterRule(localContext, 78, LPCParser.RULE_function_arrow_call);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 629;
            this.match(LPCParser.Arrow);
            this.state = 630;
            this.identifier();
            this.state = 631;
            this.match(LPCParser.T__2);
            this.state = 632;
            this.expr_list();
            this.state = 633;
            this.match(LPCParser.T__3);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public function_name(): Function_nameContext {
        let localContext = new Function_nameContext(this.context, this.state);
        this.enterRule(localContext, 80, LPCParser.RULE_function_name);
        try {
            this.state = 645;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 31, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 635;
                this.match(LPCParser.Identifier);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 636;
                this.match(LPCParser.ColonColon);
                this.state = 637;
                this.identifier();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 638;
                this.match(LPCParser.BasicType);
                this.state = 639;
                this.match(LPCParser.ColonColon);
                this.state = 640;
                this.identifier();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 641;
                this.identifier();
                this.state = 642;
                this.match(LPCParser.ColonColon);
                this.state = 643;
                this.identifier();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public opt_class_init(): Opt_class_initContext;
    public opt_class_init(_p: number): Opt_class_initContext;
    public opt_class_init(_p?: number): Opt_class_initContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new Opt_class_initContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 82;
        this.enterRecursionRule(localContext, 82, LPCParser.RULE_opt_class_init, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 653;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new Opt_class_initContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_opt_class_init);
                    this.state = 648;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 649;
                    this.match(LPCParser.T__6);
                    this.state = 650;
                    this.class_init();
                    }
                    }
                }
                this.state = 655;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public class_init(): Class_initContext {
        let localContext = new Class_initContext(this.context, this.state);
        this.enterRule(localContext, 84, LPCParser.RULE_class_init);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 656;
            this.identifier();
            this.state = 657;
            this.match(LPCParser.Colon);
            this.state = 658;
            this.expr0(0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public efun_override(): Efun_overrideContext {
        let localContext = new Efun_overrideContext(this.context, this.state);
        this.enterRule(localContext, 86, LPCParser.RULE_efun_override);
        try {
            this.state = 666;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 33, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 660;
                this.match(LPCParser.Efun);
                this.state = 661;
                this.match(LPCParser.ColonColon);
                this.state = 662;
                this.identifier();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 663;
                this.match(LPCParser.Efun);
                this.state = 664;
                this.match(LPCParser.ColonColon);
                this.state = 665;
                this.match(LPCParser.New);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public block_or_semi(): Block_or_semiContext {
        let localContext = new Block_or_semiContext(this.context, this.state);
        this.enterRule(localContext, 88, LPCParser.RULE_block_or_semi);
        try {
            this.state = 670;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.T__4:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 668;
                this.block();
                }
                break;
            case LPCParser.T__0:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 669;
                this.match(LPCParser.T__0);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public block(): BlockContext {
        let localContext = new BlockContext(this.context, this.state);
        this.enterRule(localContext, 90, LPCParser.RULE_block);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 672;
            this.match(LPCParser.T__4);
            this.state = 673;
            this.statements();
            this.state = 674;
            this.match(LPCParser.T__5);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public statements(): StatementsContext {
        let localContext = new StatementsContext(this.context, this.state);
        this.enterRule(localContext, 92, LPCParser.RULE_statements);
        try {
            this.state = 683;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 35, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                // tslint:disable-next-line:no-empty
                {
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 677;
                this.statement();
                this.state = 678;
                this.statements();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 680;
                this.local_declare_statement();
                this.state = 681;
                this.statements();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public local_declare_statement(): Local_declare_statementContext {
        let localContext = new Local_declare_statementContext(this.context, this.state);
        this.enterRule(localContext, 94, LPCParser.RULE_local_declare_statement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 685;
            this.basic_type();
            this.state = 686;
            this.local_name_list();
            this.state = 687;
            this.match(LPCParser.T__0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public local_name_list(): Local_name_listContext {
        let localContext = new Local_name_listContext(this.context, this.state);
        this.enterRule(localContext, 96, LPCParser.RULE_local_name_list);
        try {
            this.state = 694;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 36, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 689;
                this.new_local_def();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 690;
                this.new_local_def();
                this.state = 691;
                this.match(LPCParser.T__6);
                this.state = 692;
                this.local_name_list();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public new_local_def(): New_local_defContext {
        let localContext = new New_local_defContext(this.context, this.state);
        this.enterRule(localContext, 98, LPCParser.RULE_new_local_def);
        try {
            this.state = 704;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 37, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 696;
                this.optional_star();
                this.state = 697;
                this.new_local_name();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 699;
                this.optional_star();
                this.state = 700;
                this.new_local_name();
                this.state = 701;
                this.match(LPCParser.Assign);
                this.state = 702;
                this.expr0(0);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public new_local_name(): New_local_nameContext {
        let localContext = new New_local_nameContext(this.context, this.state);
        this.enterRule(localContext, 100, LPCParser.RULE_new_local_name);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 706;
            _la = this.tokenStream.LA(1);
            if(!(_la === 44 || _la === 71)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public statement(): StatementContext {
        let localContext = new StatementContext(this.context, this.state);
        this.enterRule(localContext, 102, LPCParser.RULE_statement);
        try {
            this.state = 724;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.T__2:
            case LPCParser.T__12:
            case LPCParser.T__13:
            case LPCParser.T__14:
            case LPCParser.PlusPlus:
            case LPCParser.MinusMinus:
            case LPCParser.Not:
            case LPCParser.Arrow:
            case LPCParser.BasicType:
            case LPCParser.Catch:
            case LPCParser.ColonColon:
            case LPCParser.DefinedName:
            case LPCParser.Efun:
            case LPCParser.New:
            case LPCParser.ParseCommand:
            case LPCParser.SScanf:
            case LPCParser.MappingOpen:
            case LPCParser.ArrayOpen:
            case LPCParser.FunctionOpen:
            case LPCParser.Number:
            case LPCParser.Parameter:
            case LPCParser.Real:
            case LPCParser.Identifier:
            case LPCParser.String:
            case LPCParser.CharacterConstant:
            case LPCParser.TimeExpression:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 708;
                this.comma_expr(0);
                this.state = 709;
                this.match(LPCParser.T__0);
                }
                break;
            case LPCParser.If:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 711;
                this.cond();
                }
                break;
            case LPCParser.While:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 712;
                this.while_statement();
                }
                break;
            case LPCParser.Do:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 713;
                this.do_statement();
                }
                break;
            case LPCParser.Switch:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 714;
                this.switch_statement();
                }
                break;
            case LPCParser.Return:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 715;
                this.returnStatement();
                }
                break;
            case LPCParser.T__4:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 716;
                this.block();
                }
                break;
            case LPCParser.For:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 717;
                this.for_loop();
                }
                break;
            case LPCParser.Foreach:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 718;
                this.foreach_loop();
                }
                break;
            case LPCParser.T__0:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 719;
                this.match(LPCParser.T__0);
                }
                break;
            case LPCParser.Break:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 720;
                this.match(LPCParser.Break);
                this.state = 721;
                this.match(LPCParser.T__0);
                }
                break;
            case LPCParser.Continue:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 722;
                this.match(LPCParser.Continue);
                this.state = 723;
                this.match(LPCParser.T__0);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public while_statement(): While_statementContext {
        let localContext = new While_statementContext(this.context, this.state);
        this.enterRule(localContext, 104, LPCParser.RULE_while_statement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 726;
            this.match(LPCParser.While);
            this.state = 727;
            this.match(LPCParser.T__2);
            this.state = 728;
            this.comma_expr(0);
            this.state = 729;
            this.match(LPCParser.T__3);
            this.state = 730;
            this.statement();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public do_statement(): Do_statementContext {
        let localContext = new Do_statementContext(this.context, this.state);
        this.enterRule(localContext, 106, LPCParser.RULE_do_statement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 732;
            this.match(LPCParser.Do);
            this.state = 733;
            this.statement();
            this.state = 734;
            this.match(LPCParser.While);
            this.state = 735;
            this.match(LPCParser.T__2);
            this.state = 736;
            this.comma_expr(0);
            this.state = 737;
            this.match(LPCParser.T__3);
            this.state = 738;
            this.match(LPCParser.T__0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public switch_statement(): Switch_statementContext {
        let localContext = new Switch_statementContext(this.context, this.state);
        this.enterRule(localContext, 108, LPCParser.RULE_switch_statement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 740;
            this.match(LPCParser.Switch);
            this.state = 741;
            this.match(LPCParser.T__2);
            this.state = 742;
            this.comma_expr(0);
            this.state = 743;
            this.match(LPCParser.T__3);
            this.state = 744;
            this.match(LPCParser.T__4);
            this.state = 745;
            this.local_declarations(0);
            this.state = 746;
            this.case_statement();
            this.state = 747;
            this.switch_block();
            this.state = 748;
            this.match(LPCParser.T__5);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public local_declarations(): Local_declarationsContext;
    public local_declarations(_p: number): Local_declarationsContext;
    public local_declarations(_p?: number): Local_declarationsContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new Local_declarationsContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 110;
        this.enterRecursionRule(localContext, 110, LPCParser.RULE_local_declarations, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 758;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 39, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new Local_declarationsContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_local_declarations);
                    this.state = 751;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 752;
                    this.basic_type();
                    this.state = 753;
                    this.local_name_list();
                    this.state = 754;
                    this.match(LPCParser.T__0);
                    }
                    }
                }
                this.state = 760;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 39, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public case_statement(): Case_statementContext {
        let localContext = new Case_statementContext(this.context, this.state);
        this.enterRule(localContext, 112, LPCParser.RULE_case_statement);
        try {
            this.state = 773;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 40, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 761;
                this.match(LPCParser.Case);
                this.state = 762;
                this.case_label();
                this.state = 763;
                this.match(LPCParser.Colon);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 765;
                this.match(LPCParser.Case);
                this.state = 766;
                this.case_label();
                this.state = 767;
                this.match(LPCParser.Range);
                this.state = 768;
                this.case_label();
                this.state = 769;
                this.match(LPCParser.Colon);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 771;
                this.match(LPCParser.Default);
                this.state = 772;
                this.match(LPCParser.Colon);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public switch_block(): Switch_blockContext {
        let localContext = new Switch_blockContext(this.context, this.state);
        this.enterRule(localContext, 114, LPCParser.RULE_switch_block);
        try {
            this.state = 782;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.Case:
            case LPCParser.Default:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 775;
                this.case_statement();
                this.state = 776;
                this.switch_block();
                }
                break;
            case LPCParser.T__0:
            case LPCParser.T__2:
            case LPCParser.T__4:
            case LPCParser.T__12:
            case LPCParser.T__13:
            case LPCParser.T__14:
            case LPCParser.PlusPlus:
            case LPCParser.MinusMinus:
            case LPCParser.Not:
            case LPCParser.Arrow:
            case LPCParser.BasicType:
            case LPCParser.Break:
            case LPCParser.Catch:
            case LPCParser.ColonColon:
            case LPCParser.Continue:
            case LPCParser.DefinedName:
            case LPCParser.Efun:
            case LPCParser.If:
            case LPCParser.Return:
            case LPCParser.For:
            case LPCParser.Foreach:
            case LPCParser.Switch:
            case LPCParser.While:
            case LPCParser.Do:
            case LPCParser.New:
            case LPCParser.ParseCommand:
            case LPCParser.SScanf:
            case LPCParser.MappingOpen:
            case LPCParser.ArrayOpen:
            case LPCParser.FunctionOpen:
            case LPCParser.Number:
            case LPCParser.Parameter:
            case LPCParser.Real:
            case LPCParser.Identifier:
            case LPCParser.String:
            case LPCParser.CharacterConstant:
            case LPCParser.TimeExpression:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 778;
                this.statement();
                this.state = 779;
                this.switch_block();
                }
                break;
            case LPCParser.T__5:
                this.enterOuterAlt(localContext, 3);
                // tslint:disable-next-line:no-empty
                {
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public case_label(): Case_labelContext {
        let localContext = new Case_labelContext(this.context, this.state);
        this.enterRule(localContext, 116, LPCParser.RULE_case_label);
        try {
            this.state = 787;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 42, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 784;
                this.constant(0);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 785;
                this.match(LPCParser.CharacterConstant);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 786;
                this.string_con1(0);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public constant(): ConstantContext;
    public constant(_p: number): ConstantContext;
    public constant(_p?: number): ConstantContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new ConstantContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 118;
        this.enterRecursionRule(localContext, 118, LPCParser.RULE_constant, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 801;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.T__2:
                {
                this.state = 790;
                this.match(LPCParser.T__2);
                this.state = 791;
                this.constant(0);
                this.state = 792;
                this.match(LPCParser.T__3);
                }
                break;
            case LPCParser.Number:
                {
                this.state = 794;
                this.match(LPCParser.Number);
                }
                break;
            case LPCParser.T__12:
                {
                this.state = 795;
                this.match(LPCParser.T__12);
                this.state = 796;
                this.match(LPCParser.Number);
                }
                break;
            case LPCParser.Not:
                {
                this.state = 797;
                this.match(LPCParser.Not);
                this.state = 798;
                this.match(LPCParser.Number);
                }
                break;
            case LPCParser.T__13:
                {
                this.state = 799;
                this.match(LPCParser.T__13);
                this.state = 800;
                this.match(LPCParser.Number);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 850;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 45, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 848;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 44, this.context) ) {
                    case 1:
                        {
                        localContext = new ConstantContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_constant);
                        this.state = 803;
                        if (!(this.precpred(this.context, 20))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 20)");
                        }
                        this.state = 804;
                        this.match(LPCParser.Or);
                        this.state = 805;
                        this.constant(21);
                        }
                        break;
                    case 2:
                        {
                        localContext = new ConstantContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_constant);
                        this.state = 806;
                        if (!(this.precpred(this.context, 19))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 19)");
                        }
                        this.state = 807;
                        this.match(LPCParser.Caret);
                        this.state = 808;
                        this.constant(20);
                        }
                        break;
                    case 3:
                        {
                        localContext = new ConstantContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_constant);
                        this.state = 809;
                        if (!(this.precpred(this.context, 18))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 18)");
                        }
                        this.state = 810;
                        this.match(LPCParser.And);
                        this.state = 811;
                        this.constant(19);
                        }
                        break;
                    case 4:
                        {
                        localContext = new ConstantContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_constant);
                        this.state = 812;
                        if (!(this.precpred(this.context, 17))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 17)");
                        }
                        this.state = 813;
                        this.match(LPCParser.Equal);
                        this.state = 814;
                        this.constant(18);
                        }
                        break;
                    case 5:
                        {
                        localContext = new ConstantContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_constant);
                        this.state = 815;
                        if (!(this.precpred(this.context, 16))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 16)");
                        }
                        this.state = 816;
                        this.match(LPCParser.NotEqual);
                        this.state = 817;
                        this.constant(17);
                        }
                        break;
                    case 6:
                        {
                        localContext = new ConstantContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_constant);
                        this.state = 818;
                        if (!(this.precpred(this.context, 15))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 15)");
                        }
                        this.state = 819;
                        this.match(LPCParser.Compare);
                        this.state = 820;
                        this.constant(16);
                        }
                        break;
                    case 7:
                        {
                        localContext = new ConstantContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_constant);
                        this.state = 821;
                        if (!(this.precpred(this.context, 14))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 14)");
                        }
                        this.state = 822;
                        this.match(LPCParser.T__7);
                        this.state = 823;
                        this.constant(15);
                        }
                        break;
                    case 8:
                        {
                        localContext = new ConstantContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_constant);
                        this.state = 824;
                        if (!(this.precpred(this.context, 13))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 13)");
                        }
                        this.state = 825;
                        this.match(LPCParser.LeftShift);
                        this.state = 826;
                        this.constant(14);
                        }
                        break;
                    case 9:
                        {
                        localContext = new ConstantContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_constant);
                        this.state = 827;
                        if (!(this.precpred(this.context, 12))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 12)");
                        }
                        this.state = 828;
                        this.match(LPCParser.RightShift);
                        this.state = 829;
                        this.constant(13);
                        }
                        break;
                    case 10:
                        {
                        localContext = new ConstantContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_constant);
                        this.state = 830;
                        if (!(this.precpred(this.context, 11))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 11)");
                        }
                        this.state = 831;
                        this.match(LPCParser.RightShift3);
                        this.state = 832;
                        this.constant(12);
                        }
                        break;
                    case 11:
                        {
                        localContext = new ConstantContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_constant);
                        this.state = 833;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 834;
                        this.match(LPCParser.T__8);
                        this.state = 835;
                        this.constant(10);
                        }
                        break;
                    case 12:
                        {
                        localContext = new ConstantContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_constant);
                        this.state = 836;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 837;
                        this.match(LPCParser.T__9);
                        this.state = 838;
                        this.constant(9);
                        }
                        break;
                    case 13:
                        {
                        localContext = new ConstantContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_constant);
                        this.state = 839;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 840;
                        this.match(LPCParser.T__10);
                        this.state = 841;
                        this.constant(8);
                        }
                        break;
                    case 14:
                        {
                        localContext = new ConstantContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_constant);
                        this.state = 842;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 843;
                        this.match(LPCParser.T__12);
                        this.state = 844;
                        this.constant(7);
                        }
                        break;
                    case 15:
                        {
                        localContext = new ConstantContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_constant);
                        this.state = 845;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 846;
                        this.match(LPCParser.T__11);
                        this.state = 847;
                        this.constant(6);
                        }
                        break;
                    }
                    }
                }
                this.state = 852;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 45, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public foreach_loop(): Foreach_loopContext {
        let localContext = new Foreach_loopContext(this.context, this.state);
        this.enterRule(localContext, 120, LPCParser.RULE_foreach_loop);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 853;
            this.match(LPCParser.Foreach);
            this.state = 854;
            this.match(LPCParser.T__2);
            this.state = 855;
            this.foreach_vars();
            this.state = 856;
            this.match(LPCParser.In);
            this.state = 857;
            this.expr0(0);
            this.state = 858;
            this.match(LPCParser.T__3);
            this.state = 859;
            this.statement();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public foreach_vars(): Foreach_varsContext {
        let localContext = new Foreach_varsContext(this.context, this.state);
        this.enterRule(localContext, 122, LPCParser.RULE_foreach_vars);
        try {
            this.state = 866;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 46, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 861;
                this.foreach_var();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 862;
                this.foreach_var();
                this.state = 863;
                this.match(LPCParser.T__6);
                this.state = 864;
                this.foreach_var();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public for_loop(): For_loopContext {
        let localContext = new For_loopContext(this.context, this.state);
        this.enterRule(localContext, 124, LPCParser.RULE_for_loop);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 868;
            this.match(LPCParser.For);
            this.state = 869;
            this.match(LPCParser.T__2);
            this.state = 870;
            this.first_for_expr();
            this.state = 871;
            this.match(LPCParser.T__0);
            this.state = 872;
            this.for_expr();
            this.state = 873;
            this.match(LPCParser.T__0);
            this.state = 874;
            this.for_expr();
            this.state = 875;
            this.match(LPCParser.T__3);
            this.state = 876;
            this.statement();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public foreach_var(): Foreach_varContext {
        let localContext = new Foreach_varContext(this.context, this.state);
        this.enterRule(localContext, 126, LPCParser.RULE_foreach_var);
        try {
            this.state = 881;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 47, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 878;
                this.match(LPCParser.DefinedName);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 879;
                this.single_new_local_def();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 880;
                this.match(LPCParser.Identifier);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public first_for_expr(): First_for_exprContext {
        let localContext = new First_for_exprContext(this.context, this.state);
        this.enterRule(localContext, 128, LPCParser.RULE_first_for_expr);
        try {
            this.state = 885;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 48, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 883;
                this.for_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 884;
                this.single_new_local_def_with_init();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public single_new_local_def_with_init(): Single_new_local_def_with_initContext {
        let localContext = new Single_new_local_def_with_initContext(this.context, this.state);
        this.enterRule(localContext, 130, LPCParser.RULE_single_new_local_def_with_init);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 887;
            this.single_new_local_def();
            this.state = 888;
            this.match(LPCParser.Assign);
            this.state = 889;
            this.expr0(0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public single_new_local_def(): Single_new_local_defContext {
        let localContext = new Single_new_local_defContext(this.context, this.state);
        this.enterRule(localContext, 132, LPCParser.RULE_single_new_local_def);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 891;
            this.basic_type();
            this.state = 892;
            this.optional_star();
            this.state = 893;
            this.new_local_name();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public for_expr(): For_exprContext {
        let localContext = new For_exprContext(this.context, this.state);
        this.enterRule(localContext, 134, LPCParser.RULE_for_expr);
        try {
            this.state = 897;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.T__0:
            case LPCParser.T__3:
                this.enterOuterAlt(localContext, 1);
                // tslint:disable-next-line:no-empty
                {
                }
                break;
            case LPCParser.T__2:
            case LPCParser.T__12:
            case LPCParser.T__13:
            case LPCParser.T__14:
            case LPCParser.PlusPlus:
            case LPCParser.MinusMinus:
            case LPCParser.Not:
            case LPCParser.Arrow:
            case LPCParser.BasicType:
            case LPCParser.Catch:
            case LPCParser.ColonColon:
            case LPCParser.DefinedName:
            case LPCParser.Efun:
            case LPCParser.New:
            case LPCParser.ParseCommand:
            case LPCParser.SScanf:
            case LPCParser.MappingOpen:
            case LPCParser.ArrayOpen:
            case LPCParser.FunctionOpen:
            case LPCParser.Number:
            case LPCParser.Parameter:
            case LPCParser.Real:
            case LPCParser.Identifier:
            case LPCParser.String:
            case LPCParser.CharacterConstant:
            case LPCParser.TimeExpression:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 896;
                this.comma_expr(0);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public returnStatement(): ReturnStatementContext {
        let localContext = new ReturnStatementContext(this.context, this.state);
        this.enterRule(localContext, 136, LPCParser.RULE_returnStatement);
        try {
            this.state = 905;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 50, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 899;
                this.match(LPCParser.Return);
                this.state = 900;
                this.match(LPCParser.T__0);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 901;
                this.match(LPCParser.Return);
                this.state = 902;
                this.comma_expr(0);
                this.state = 903;
                this.match(LPCParser.T__0);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public cond(): CondContext {
        let localContext = new CondContext(this.context, this.state);
        this.enterRule(localContext, 138, LPCParser.RULE_cond);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 907;
            this.match(LPCParser.If);
            this.state = 908;
            this.match(LPCParser.T__2);
            this.state = 909;
            this.comma_expr(0);
            this.state = 910;
            this.match(LPCParser.T__3);
            this.state = 911;
            this.statement();
            this.state = 912;
            this.optional_else_part();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public optional_else_part(): Optional_else_partContext {
        let localContext = new Optional_else_partContext(this.context, this.state);
        this.enterRule(localContext, 140, LPCParser.RULE_optional_else_part);
        try {
            this.state = 917;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 51, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                // tslint:disable-next-line:no-empty
                {
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 915;
                this.match(LPCParser.Else);
                this.state = 916;
                this.statement();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public argument(): ArgumentContext {
        let localContext = new ArgumentContext(this.context, this.state);
        this.enterRule(localContext, 142, LPCParser.RULE_argument);
        try {
            this.state = 924;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 52, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                // tslint:disable-next-line:no-empty
                {
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 920;
                this.argument_list(0);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 921;
                this.argument_list(0);
                this.state = 922;
                this.match(LPCParser.Ellipsis);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public argument_list(): Argument_listContext;
    public argument_list(_p: number): Argument_listContext;
    public argument_list(_p?: number): Argument_listContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new Argument_listContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 144;
        this.enterRecursionRule(localContext, 144, LPCParser.RULE_argument_list, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 927;
            this.new_arg();
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 934;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 53, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new Argument_listContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_argument_list);
                    this.state = 929;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 930;
                    this.match(LPCParser.T__6);
                    this.state = 931;
                    this.new_arg();
                    }
                    }
                }
                this.state = 936;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 53, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public new_arg(): New_argContext {
        let localContext = new New_argContext(this.context, this.state);
        this.enterRule(localContext, 146, LPCParser.RULE_new_arg);
        try {
            this.state = 945;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 54, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 937;
                this.basic_type();
                this.state = 938;
                this.optional_star();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 940;
                this.basic_type();
                this.state = 941;
                this.optional_star();
                this.state = 942;
                this.new_local_name();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 944;
                this.new_local_name();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public inheritance(): InheritanceContext {
        let localContext = new InheritanceContext(this.context, this.state);
        this.enterRule(localContext, 148, LPCParser.RULE_inheritance);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 947;
            this.match(LPCParser.Inherit);
            this.state = 948;
            this.string_con1(0);
            this.state = 949;
            this.match(LPCParser.T__0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public data_type(): Data_typeContext {
        let localContext = new Data_typeContext(this.context, this.state);
        this.enterRule(localContext, 150, LPCParser.RULE_data_type);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 951;
            this.type_modifier_list();
            this.state = 952;
            this.opt_basic_type();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public opt_basic_type(): Opt_basic_typeContext {
        let localContext = new Opt_basic_typeContext(this.context, this.state);
        this.enterRule(localContext, 152, LPCParser.RULE_opt_basic_type);
        try {
            this.state = 956;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 55, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 954;
                this.basic_type();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                // tslint:disable-next-line:no-empty
                {
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public optional_star(): Optional_starContext {
        let localContext = new Optional_starContext(this.context, this.state);
        this.enterRule(localContext, 154, LPCParser.RULE_optional_star);
        try {
            this.state = 960;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 56, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                // tslint:disable-next-line:no-empty
                {
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 959;
                this.match(LPCParser.T__8);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public identifier(): IdentifierContext {
        let localContext = new IdentifierContext(this.context, this.state);
        this.enterRule(localContext, 156, LPCParser.RULE_identifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 962;
            _la = this.tokenStream.LA(1);
            if(!(_la === 44 || _la === 71)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public override sempred(localContext: antlr.RuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 1:
            return this.program_sempred(localContext as ProgramContext, predIndex);
        case 11:
            return this.member_list_sempred(localContext as Member_listContext, predIndex);
        case 16:
            return this.expr0_sempred(localContext as Expr0Context, predIndex);
        case 19:
            return this.comma_expr_sempred(localContext as Comma_exprContext, predIndex);
        case 26:
            return this.expr4_sempred(localContext as Expr4Context, predIndex);
        case 30:
            return this.expr_list4_sempred(localContext as Expr_list4Context, predIndex);
        case 32:
            return this.expr_list2_sempred(localContext as Expr_list2Context, predIndex);
        case 35:
            return this.string_con2_sempred(localContext as String_con2Context, predIndex);
        case 36:
            return this.string_con1_sempred(localContext as String_con1Context, predIndex);
        case 41:
            return this.opt_class_init_sempred(localContext as Opt_class_initContext, predIndex);
        case 55:
            return this.local_declarations_sempred(localContext as Local_declarationsContext, predIndex);
        case 59:
            return this.constant_sempred(localContext as ConstantContext, predIndex);
        case 72:
            return this.argument_list_sempred(localContext as Argument_listContext, predIndex);
        }
        return true;
    }
    private program_sempred(localContext: ProgramContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 2);
        }
        return true;
    }
    private member_list_sempred(localContext: Member_listContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 1:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private expr0_sempred(localContext: Expr0Context | null, predIndex: number): boolean {
        switch (predIndex) {
        case 2:
            return this.precpred(this.context, 29);
        case 3:
            return this.precpred(this.context, 28);
        case 4:
            return this.precpred(this.context, 27);
        case 5:
            return this.precpred(this.context, 26);
        case 6:
            return this.precpred(this.context, 25);
        case 7:
            return this.precpred(this.context, 24);
        case 8:
            return this.precpred(this.context, 23);
        case 9:
            return this.precpred(this.context, 22);
        case 10:
            return this.precpred(this.context, 21);
        case 11:
            return this.precpred(this.context, 20);
        case 12:
            return this.precpred(this.context, 19);
        case 13:
            return this.precpred(this.context, 18);
        case 14:
            return this.precpred(this.context, 17);
        case 15:
            return this.precpred(this.context, 16);
        case 16:
            return this.precpred(this.context, 15);
        }
        return true;
    }
    private comma_expr_sempred(localContext: Comma_exprContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 17:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private expr4_sempred(localContext: Expr4Context | null, predIndex: number): boolean {
        switch (predIndex) {
        case 18:
            return this.precpred(this.context, 22);
        case 19:
            return this.precpred(this.context, 17);
        case 20:
            return this.precpred(this.context, 16);
        case 21:
            return this.precpred(this.context, 15);
        case 22:
            return this.precpred(this.context, 14);
        case 23:
            return this.precpred(this.context, 13);
        case 24:
            return this.precpred(this.context, 12);
        case 25:
            return this.precpred(this.context, 11);
        case 26:
            return this.precpred(this.context, 10);
        case 27:
            return this.precpred(this.context, 9);
        }
        return true;
    }
    private expr_list4_sempred(localContext: Expr_list4Context | null, predIndex: number): boolean {
        switch (predIndex) {
        case 28:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private expr_list2_sempred(localContext: Expr_list2Context | null, predIndex: number): boolean {
        switch (predIndex) {
        case 29:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private string_con2_sempred(localContext: String_con2Context | null, predIndex: number): boolean {
        switch (predIndex) {
        case 30:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private string_con1_sempred(localContext: String_con1Context | null, predIndex: number): boolean {
        switch (predIndex) {
        case 31:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private opt_class_init_sempred(localContext: Opt_class_initContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 32:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private local_declarations_sempred(localContext: Local_declarationsContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 33:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private constant_sempred(localContext: ConstantContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 34:
            return this.precpred(this.context, 20);
        case 35:
            return this.precpred(this.context, 19);
        case 36:
            return this.precpred(this.context, 18);
        case 37:
            return this.precpred(this.context, 17);
        case 38:
            return this.precpred(this.context, 16);
        case 39:
            return this.precpred(this.context, 15);
        case 40:
            return this.precpred(this.context, 14);
        case 41:
            return this.precpred(this.context, 13);
        case 42:
            return this.precpred(this.context, 12);
        case 43:
            return this.precpred(this.context, 11);
        case 44:
            return this.precpred(this.context, 9);
        case 45:
            return this.precpred(this.context, 8);
        case 46:
            return this.precpred(this.context, 7);
        case 47:
            return this.precpred(this.context, 6);
        case 48:
            return this.precpred(this.context, 5);
        }
        return true;
    }
    private argument_list_sempred(localContext: Argument_listContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 49:
            return this.precpred(this.context, 1);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,84,965,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,
        7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,
        2,66,7,66,2,67,7,67,2,68,7,68,2,69,7,69,2,70,7,70,2,71,7,71,2,72,
        7,72,2,73,7,73,2,74,7,74,2,75,7,75,2,76,7,76,2,77,7,77,2,78,7,78,
        1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,3,1,168,8,1,5,1,170,8,1,10,1,
        12,1,173,9,1,1,2,1,2,3,2,177,8,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,
        3,3,187,8,3,1,4,1,4,3,4,191,8,4,1,5,1,5,1,6,1,6,5,6,197,8,6,10,6,
        12,6,200,9,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,8,1,8,1,8,
        1,9,1,9,1,9,3,9,218,8,9,1,10,1,10,1,10,1,10,1,10,1,10,1,11,1,11,
        1,11,1,11,1,11,1,11,5,11,232,8,11,10,11,12,11,235,9,11,1,12,1,12,
        1,12,1,12,1,12,3,12,242,8,12,1,13,1,13,1,13,1,14,1,14,1,14,1,14,
        1,14,3,14,252,8,14,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,3,15,
        262,8,15,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,
        1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,
        1,16,1,16,1,16,1,16,1,16,1,16,3,16,294,8,16,1,16,1,16,1,16,1,16,
        1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,
        1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,
        1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,
        1,16,1,16,1,16,1,16,1,16,5,16,344,8,16,10,16,12,16,347,9,16,1,17,
        1,17,1,17,1,18,1,18,1,18,1,18,1,18,3,18,357,8,18,1,19,1,19,1,19,
        1,19,1,19,1,19,5,19,365,8,19,10,19,12,19,368,9,19,1,20,1,20,1,20,
        1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,21,1,21,1,21,1,21,1,21,1,21,
        1,21,1,21,1,22,1,22,1,22,1,22,1,22,3,22,393,8,22,1,23,1,23,1,23,
        1,23,1,23,1,24,1,24,1,25,1,25,1,26,1,26,1,26,1,26,1,26,1,26,1,26,
        1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,
        1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,
        1,26,1,26,1,26,1,26,1,26,3,26,442,8,26,1,26,1,26,1,26,1,26,1,26,
        1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,
        1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,
        1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,
        1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,
        1,26,1,26,1,26,1,26,5,26,505,8,26,10,26,12,26,508,9,26,1,27,1,27,
        1,27,1,28,1,28,1,28,1,28,1,28,3,28,518,8,28,1,29,1,29,1,29,1,29,
        1,29,3,29,525,8,29,1,30,1,30,1,30,3,30,530,8,30,1,30,1,30,1,30,1,
        30,3,30,536,8,30,5,30,538,8,30,10,30,12,30,541,9,30,1,31,1,31,1,
        31,1,31,1,32,1,32,1,32,1,32,1,32,1,32,5,32,553,8,32,10,32,12,32,
        556,9,32,1,33,1,33,1,33,1,33,3,33,562,8,33,1,34,1,34,1,35,1,35,1,
        35,1,35,1,35,5,35,571,8,35,10,35,12,35,574,9,35,1,36,1,36,1,36,1,
        36,1,36,1,36,3,36,582,8,36,1,36,1,36,1,36,5,36,587,8,36,10,36,12,
        36,590,9,36,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,
        37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,
        37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,3,37,623,8,37,1,38,1,38,1,
        38,1,38,1,38,1,39,1,39,1,39,1,39,1,39,1,39,1,40,1,40,1,40,1,40,1,
        40,1,40,1,40,1,40,1,40,1,40,3,40,646,8,40,1,41,1,41,1,41,1,41,5,
        41,652,8,41,10,41,12,41,655,9,41,1,42,1,42,1,42,1,42,1,43,1,43,1,
        43,1,43,1,43,1,43,3,43,667,8,43,1,44,1,44,3,44,671,8,44,1,45,1,45,
        1,45,1,45,1,46,1,46,1,46,1,46,1,46,1,46,1,46,3,46,684,8,46,1,47,
        1,47,1,47,1,47,1,48,1,48,1,48,1,48,1,48,3,48,695,8,48,1,49,1,49,
        1,49,1,49,1,49,1,49,1,49,1,49,3,49,705,8,49,1,50,1,50,1,51,1,51,
        1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,
        1,51,3,51,725,8,51,1,52,1,52,1,52,1,52,1,52,1,52,1,53,1,53,1,53,
        1,53,1,53,1,53,1,53,1,53,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,
        1,54,1,54,1,55,1,55,1,55,1,55,1,55,1,55,5,55,757,8,55,10,55,12,55,
        760,9,55,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,
        1,56,3,56,774,8,56,1,57,1,57,1,57,1,57,1,57,1,57,1,57,3,57,783,8,
        57,1,58,1,58,1,58,3,58,788,8,58,1,59,1,59,1,59,1,59,1,59,1,59,1,
        59,1,59,1,59,1,59,1,59,1,59,3,59,802,8,59,1,59,1,59,1,59,1,59,1,
        59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,
        59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,
        59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,
        59,1,59,5,59,849,8,59,10,59,12,59,852,9,59,1,60,1,60,1,60,1,60,1,
        60,1,60,1,60,1,60,1,61,1,61,1,61,1,61,1,61,3,61,867,8,61,1,62,1,
        62,1,62,1,62,1,62,1,62,1,62,1,62,1,62,1,62,1,63,1,63,1,63,3,63,882,
        8,63,1,64,1,64,3,64,886,8,64,1,65,1,65,1,65,1,65,1,66,1,66,1,66,
        1,66,1,67,1,67,3,67,898,8,67,1,68,1,68,1,68,1,68,1,68,1,68,3,68,
        906,8,68,1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,70,1,70,1,70,3,70,
        918,8,70,1,71,1,71,1,71,1,71,1,71,3,71,925,8,71,1,72,1,72,1,72,1,
        72,1,72,1,72,5,72,933,8,72,10,72,12,72,936,9,72,1,73,1,73,1,73,1,
        73,1,73,1,73,1,73,1,73,3,73,946,8,73,1,74,1,74,1,74,1,74,1,75,1,
        75,1,75,1,76,1,76,3,76,957,8,76,1,77,1,77,3,77,961,8,77,1,78,1,78,
        1,78,0,13,2,22,32,38,52,60,64,70,72,82,110,118,144,79,0,2,4,6,8,
        10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,
        54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,
        98,100,102,104,106,108,110,112,114,116,118,120,122,124,126,128,130,
        132,134,136,138,140,142,144,146,148,150,152,154,156,0,5,1,0,82,83,
        1,0,9,11,1,0,12,13,2,0,38,38,44,44,2,0,44,44,71,71,1032,0,158,1,
        0,0,0,2,161,1,0,0,0,4,176,1,0,0,0,6,186,1,0,0,0,8,190,1,0,0,0,10,
        192,1,0,0,0,12,194,1,0,0,0,14,203,1,0,0,0,16,211,1,0,0,0,18,217,
        1,0,0,0,20,219,1,0,0,0,22,225,1,0,0,0,24,241,1,0,0,0,26,243,1,0,
        0,0,28,251,1,0,0,0,30,261,1,0,0,0,32,293,1,0,0,0,34,348,1,0,0,0,
        36,356,1,0,0,0,38,358,1,0,0,0,40,369,1,0,0,0,42,379,1,0,0,0,44,392,
        1,0,0,0,46,394,1,0,0,0,48,399,1,0,0,0,50,401,1,0,0,0,52,441,1,0,
        0,0,54,509,1,0,0,0,56,517,1,0,0,0,58,524,1,0,0,0,60,526,1,0,0,0,
        62,542,1,0,0,0,64,546,1,0,0,0,66,561,1,0,0,0,68,563,1,0,0,0,70,565,
        1,0,0,0,72,581,1,0,0,0,74,622,1,0,0,0,76,624,1,0,0,0,78,629,1,0,
        0,0,80,645,1,0,0,0,82,647,1,0,0,0,84,656,1,0,0,0,86,666,1,0,0,0,
        88,670,1,0,0,0,90,672,1,0,0,0,92,683,1,0,0,0,94,685,1,0,0,0,96,694,
        1,0,0,0,98,704,1,0,0,0,100,706,1,0,0,0,102,724,1,0,0,0,104,726,1,
        0,0,0,106,732,1,0,0,0,108,740,1,0,0,0,110,750,1,0,0,0,112,773,1,
        0,0,0,114,782,1,0,0,0,116,787,1,0,0,0,118,801,1,0,0,0,120,853,1,
        0,0,0,122,866,1,0,0,0,124,868,1,0,0,0,126,881,1,0,0,0,128,885,1,
        0,0,0,130,887,1,0,0,0,132,891,1,0,0,0,134,897,1,0,0,0,136,905,1,
        0,0,0,138,907,1,0,0,0,140,917,1,0,0,0,142,924,1,0,0,0,144,926,1,
        0,0,0,146,945,1,0,0,0,148,947,1,0,0,0,150,951,1,0,0,0,152,956,1,
        0,0,0,154,960,1,0,0,0,156,962,1,0,0,0,158,159,3,2,1,0,159,160,5,
        0,0,1,160,1,1,0,0,0,161,171,6,1,-1,0,162,167,10,2,0,0,163,168,3,
        8,4,0,164,165,3,6,3,0,165,166,3,4,2,0,166,168,1,0,0,0,167,163,1,
        0,0,0,167,164,1,0,0,0,168,170,1,0,0,0,169,162,1,0,0,0,170,173,1,
        0,0,0,171,169,1,0,0,0,171,172,1,0,0,0,172,3,1,0,0,0,173,171,1,0,
        0,0,174,177,1,0,0,0,175,177,5,1,0,0,176,174,1,0,0,0,176,175,1,0,
        0,0,177,5,1,0,0,0,178,187,3,14,7,0,179,180,3,150,75,0,180,181,3,
        28,14,0,181,182,5,1,0,0,182,187,1,0,0,0,183,187,3,148,74,0,184,187,
        3,20,10,0,185,187,3,16,8,0,186,178,1,0,0,0,186,179,1,0,0,0,186,183,
        1,0,0,0,186,184,1,0,0,0,186,185,1,0,0,0,187,7,1,0,0,0,188,191,3,
        10,5,0,189,191,3,12,6,0,190,188,1,0,0,0,190,189,1,0,0,0,191,9,1,
        0,0,0,192,193,7,0,0,0,193,11,1,0,0,0,194,198,5,2,0,0,195,197,5,79,
        0,0,196,195,1,0,0,0,197,200,1,0,0,0,198,196,1,0,0,0,198,199,1,0,
        0,0,199,201,1,0,0,0,200,198,1,0,0,0,201,202,5,72,0,0,202,13,1,0,
        0,0,203,204,3,150,75,0,204,205,3,154,77,0,205,206,3,156,78,0,206,
        207,5,3,0,0,207,208,3,142,71,0,208,209,5,4,0,0,209,210,3,88,44,0,
        210,15,1,0,0,0,211,212,3,18,9,0,212,213,5,41,0,0,213,17,1,0,0,0,
        214,218,1,0,0,0,215,216,5,18,0,0,216,218,3,18,9,0,217,214,1,0,0,
        0,217,215,1,0,0,0,218,19,1,0,0,0,219,220,3,18,9,0,220,221,3,156,
        78,0,221,222,5,5,0,0,222,223,3,22,11,0,223,224,5,6,0,0,224,21,1,
        0,0,0,225,233,6,11,-1,0,226,227,10,1,0,0,227,228,3,150,75,0,228,
        229,3,24,12,0,229,230,5,1,0,0,230,232,1,0,0,0,231,226,1,0,0,0,232,
        235,1,0,0,0,233,231,1,0,0,0,233,234,1,0,0,0,234,23,1,0,0,0,235,233,
        1,0,0,0,236,242,3,26,13,0,237,238,3,26,13,0,238,239,5,7,0,0,239,
        240,3,24,12,0,240,242,1,0,0,0,241,236,1,0,0,0,241,237,1,0,0,0,242,
        25,1,0,0,0,243,244,3,154,77,0,244,245,3,156,78,0,245,27,1,0,0,0,
        246,252,3,30,15,0,247,248,3,30,15,0,248,249,5,7,0,0,249,250,3,28,
        14,0,250,252,1,0,0,0,251,246,1,0,0,0,251,247,1,0,0,0,252,29,1,0,
        0,0,253,254,3,154,77,0,254,255,3,156,78,0,255,262,1,0,0,0,256,257,
        3,154,77,0,257,258,3,156,78,0,258,259,5,19,0,0,259,260,3,32,16,0,
        260,262,1,0,0,0,261,253,1,0,0,0,261,256,1,0,0,0,262,31,1,0,0,0,263,
        264,6,16,-1,0,264,265,3,52,26,0,265,266,5,19,0,0,266,267,3,32,16,
        30,267,294,1,0,0,0,268,269,3,46,23,0,269,270,3,32,16,14,270,294,
        1,0,0,0,271,272,5,20,0,0,272,294,3,52,26,0,273,274,5,21,0,0,274,
        294,3,52,26,0,275,276,5,31,0,0,276,294,3,32,16,11,277,278,5,14,0,
        0,278,294,3,32,16,10,279,280,5,13,0,0,280,294,3,32,16,9,281,282,
        3,52,26,0,282,283,5,20,0,0,283,294,1,0,0,0,284,285,3,52,26,0,285,
        286,5,21,0,0,286,294,1,0,0,0,287,294,3,52,26,0,288,294,3,42,21,0,
        289,294,3,40,20,0,290,294,3,34,17,0,291,294,5,67,0,0,292,294,5,69,
        0,0,293,263,1,0,0,0,293,268,1,0,0,0,293,271,1,0,0,0,293,273,1,0,
        0,0,293,275,1,0,0,0,293,277,1,0,0,0,293,279,1,0,0,0,293,281,1,0,
        0,0,293,284,1,0,0,0,293,287,1,0,0,0,293,288,1,0,0,0,293,289,1,0,
        0,0,293,290,1,0,0,0,293,291,1,0,0,0,293,292,1,0,0,0,294,345,1,0,
        0,0,295,296,10,29,0,0,296,297,5,61,0,0,297,298,3,32,16,0,298,299,
        5,41,0,0,299,300,3,32,16,30,300,344,1,0,0,0,301,302,10,28,0,0,302,
        303,5,26,0,0,303,344,3,32,16,29,304,305,10,27,0,0,305,306,5,23,0,
        0,306,344,3,32,16,28,307,308,10,26,0,0,308,309,5,25,0,0,309,344,
        3,32,16,27,310,311,10,25,0,0,311,312,5,24,0,0,312,344,3,32,16,26,
        313,314,10,24,0,0,314,315,5,22,0,0,315,344,3,32,16,25,316,317,10,
        23,0,0,317,318,5,27,0,0,318,344,3,32,16,24,319,320,10,22,0,0,320,
        321,5,32,0,0,321,344,3,32,16,23,322,323,10,21,0,0,323,324,5,33,0,
        0,324,344,3,32,16,22,325,326,10,20,0,0,326,327,5,8,0,0,327,344,3,
        32,16,21,328,329,10,19,0,0,329,330,5,28,0,0,330,344,3,32,16,20,331,
        332,10,18,0,0,332,333,5,29,0,0,333,344,3,32,16,19,334,335,10,17,
        0,0,335,336,5,30,0,0,336,344,3,32,16,18,337,338,10,16,0,0,338,339,
        7,1,0,0,339,344,3,32,16,17,340,341,10,15,0,0,341,342,7,2,0,0,342,
        344,3,32,16,16,343,295,1,0,0,0,343,301,1,0,0,0,343,304,1,0,0,0,343,
        307,1,0,0,0,343,310,1,0,0,0,343,313,1,0,0,0,343,316,1,0,0,0,343,
        319,1,0,0,0,343,322,1,0,0,0,343,325,1,0,0,0,343,328,1,0,0,0,343,
        331,1,0,0,0,343,334,1,0,0,0,343,337,1,0,0,0,343,340,1,0,0,0,344,
        347,1,0,0,0,345,343,1,0,0,0,345,346,1,0,0,0,346,33,1,0,0,0,347,345,
        1,0,0,0,348,349,5,76,0,0,349,350,3,36,18,0,350,35,1,0,0,0,351,357,
        3,90,45,0,352,353,5,3,0,0,353,354,3,38,19,0,354,355,5,4,0,0,355,
        357,1,0,0,0,356,351,1,0,0,0,356,352,1,0,0,0,357,37,1,0,0,0,358,359,
        6,19,-1,0,359,360,3,32,16,0,360,366,1,0,0,0,361,362,10,1,0,0,362,
        363,5,7,0,0,363,365,3,32,16,0,364,361,1,0,0,0,365,368,1,0,0,0,366,
        364,1,0,0,0,366,367,1,0,0,0,367,39,1,0,0,0,368,366,1,0,0,0,369,370,
        5,60,0,0,370,371,5,3,0,0,371,372,3,32,16,0,372,373,5,7,0,0,373,374,
        3,32,16,0,374,375,5,7,0,0,375,376,3,32,16,0,376,377,3,44,22,0,377,
        378,5,4,0,0,378,41,1,0,0,0,379,380,5,63,0,0,380,381,5,3,0,0,381,
        382,3,32,16,0,382,383,5,7,0,0,383,384,3,32,16,0,384,385,3,44,22,
        0,385,386,5,4,0,0,386,43,1,0,0,0,387,393,1,0,0,0,388,389,5,7,0,0,
        389,390,3,52,26,0,390,391,3,44,22,0,391,393,1,0,0,0,392,387,1,0,
        0,0,392,388,1,0,0,0,393,45,1,0,0,0,394,395,5,3,0,0,395,396,3,48,
        24,0,396,397,3,154,77,0,397,398,5,4,0,0,398,47,1,0,0,0,399,400,3,
        50,25,0,400,49,1,0,0,0,401,402,7,3,0,0,402,51,1,0,0,0,403,404,6,
        26,-1,0,404,442,3,74,37,0,405,442,5,44,0,0,406,442,5,71,0,0,407,
        442,5,68,0,0,408,409,5,15,0,0,409,410,5,3,0,0,410,411,3,38,19,0,
        411,412,5,4,0,0,412,442,1,0,0,0,413,442,3,68,34,0,414,442,5,75,0,
        0,415,416,5,3,0,0,416,417,3,38,19,0,417,418,5,4,0,0,418,442,1,0,
        0,0,419,442,3,54,27,0,420,421,5,38,0,0,421,422,5,3,0,0,422,423,3,
        142,71,0,423,424,5,4,0,0,424,425,3,90,45,0,425,442,1,0,0,0,426,427,
        5,66,0,0,427,428,3,38,19,0,428,429,5,41,0,0,429,430,5,4,0,0,430,
        442,1,0,0,0,431,432,5,64,0,0,432,433,3,58,29,0,433,434,5,17,0,0,
        434,435,5,4,0,0,435,442,1,0,0,0,436,437,5,65,0,0,437,438,3,56,28,
        0,438,439,5,6,0,0,439,440,5,4,0,0,440,442,1,0,0,0,441,403,1,0,0,
        0,441,405,1,0,0,0,441,406,1,0,0,0,441,407,1,0,0,0,441,408,1,0,0,
        0,441,413,1,0,0,0,441,414,1,0,0,0,441,415,1,0,0,0,441,419,1,0,0,
        0,441,420,1,0,0,0,441,426,1,0,0,0,441,431,1,0,0,0,441,436,1,0,0,
        0,442,506,1,0,0,0,443,444,10,22,0,0,444,505,3,78,39,0,445,446,10,
        17,0,0,446,447,5,37,0,0,447,505,3,156,78,0,448,449,10,16,0,0,449,
        450,5,16,0,0,450,451,3,38,19,0,451,452,5,62,0,0,452,453,5,8,0,0,
        453,454,3,38,19,0,454,455,5,17,0,0,455,505,1,0,0,0,456,457,10,15,
        0,0,457,458,5,16,0,0,458,459,3,38,19,0,459,460,5,62,0,0,460,461,
        3,38,19,0,461,462,5,17,0,0,462,505,1,0,0,0,463,464,10,14,0,0,464,
        465,5,16,0,0,465,466,5,8,0,0,466,467,3,38,19,0,467,468,5,62,0,0,
        468,469,3,38,19,0,469,470,5,17,0,0,470,505,1,0,0,0,471,472,10,13,
        0,0,472,473,5,16,0,0,473,474,5,8,0,0,474,475,3,38,19,0,475,476,5,
        62,0,0,476,477,5,8,0,0,477,478,3,38,19,0,478,479,5,17,0,0,479,505,
        1,0,0,0,480,481,10,12,0,0,481,482,5,16,0,0,482,483,3,38,19,0,483,
        484,5,62,0,0,484,485,5,17,0,0,485,505,1,0,0,0,486,487,10,11,0,0,
        487,488,5,16,0,0,488,489,5,8,0,0,489,490,3,38,19,0,490,491,5,62,
        0,0,491,492,5,17,0,0,492,505,1,0,0,0,493,494,10,10,0,0,494,495,5,
        16,0,0,495,496,5,8,0,0,496,497,3,38,19,0,497,498,5,17,0,0,498,505,
        1,0,0,0,499,500,10,9,0,0,500,501,5,16,0,0,501,502,3,38,19,0,502,
        503,5,17,0,0,503,505,1,0,0,0,504,443,1,0,0,0,504,445,1,0,0,0,504,
        448,1,0,0,0,504,456,1,0,0,0,504,463,1,0,0,0,504,471,1,0,0,0,504,
        480,1,0,0,0,504,486,1,0,0,0,504,493,1,0,0,0,504,499,1,0,0,0,505,
        508,1,0,0,0,506,504,1,0,0,0,506,507,1,0,0,0,507,53,1,0,0,0,508,506,
        1,0,0,0,509,510,5,40,0,0,510,511,3,36,18,0,511,55,1,0,0,0,512,518,
        1,0,0,0,513,518,3,64,32,0,514,515,3,64,32,0,515,516,5,7,0,0,516,
        518,1,0,0,0,517,512,1,0,0,0,517,513,1,0,0,0,517,514,1,0,0,0,518,
        57,1,0,0,0,519,525,1,0,0,0,520,525,3,60,30,0,521,522,3,60,30,0,522,
        523,5,7,0,0,523,525,1,0,0,0,524,519,1,0,0,0,524,520,1,0,0,0,524,
        521,1,0,0,0,525,59,1,0,0,0,526,529,6,30,-1,0,527,530,3,32,16,0,528,
        530,3,62,31,0,529,527,1,0,0,0,529,528,1,0,0,0,530,539,1,0,0,0,531,
        532,10,1,0,0,532,535,5,7,0,0,533,536,3,32,16,0,534,536,3,62,31,0,
        535,533,1,0,0,0,535,534,1,0,0,0,536,538,1,0,0,0,537,531,1,0,0,0,
        538,541,1,0,0,0,539,537,1,0,0,0,539,540,1,0,0,0,540,61,1,0,0,0,541,
        539,1,0,0,0,542,543,3,32,16,0,543,544,5,41,0,0,544,545,3,32,16,0,
        545,63,1,0,0,0,546,547,6,32,-1,0,547,548,3,66,33,0,548,554,1,0,0,
        0,549,550,10,1,0,0,550,551,5,7,0,0,551,553,3,66,33,0,552,549,1,0,
        0,0,553,556,1,0,0,0,554,552,1,0,0,0,554,555,1,0,0,0,555,65,1,0,0,
        0,556,554,1,0,0,0,557,562,3,32,16,0,558,559,3,32,16,0,559,560,5,
        46,0,0,560,562,1,0,0,0,561,557,1,0,0,0,561,558,1,0,0,0,562,67,1,
        0,0,0,563,564,3,70,35,0,564,69,1,0,0,0,565,566,6,35,-1,0,566,567,
        5,73,0,0,567,572,1,0,0,0,568,569,10,1,0,0,569,571,5,73,0,0,570,568,
        1,0,0,0,571,574,1,0,0,0,572,570,1,0,0,0,572,573,1,0,0,0,573,71,1,
        0,0,0,574,572,1,0,0,0,575,576,6,36,-1,0,576,582,3,70,35,0,577,578,
        5,3,0,0,578,579,3,72,36,0,579,580,5,4,0,0,580,582,1,0,0,0,581,575,
        1,0,0,0,581,577,1,0,0,0,582,588,1,0,0,0,583,584,10,1,0,0,584,585,
        5,12,0,0,585,587,3,72,36,2,586,583,1,0,0,0,587,590,1,0,0,0,588,586,
        1,0,0,0,588,589,1,0,0,0,589,73,1,0,0,0,590,588,1,0,0,0,591,592,3,
        86,43,0,592,593,5,3,0,0,593,594,3,56,28,0,594,595,5,4,0,0,595,623,
        1,0,0,0,596,597,5,59,0,0,597,598,5,3,0,0,598,599,3,56,28,0,599,600,
        5,4,0,0,600,623,1,0,0,0,601,602,5,59,0,0,602,603,5,3,0,0,603,604,
        5,44,0,0,604,605,3,82,41,0,605,606,5,4,0,0,606,623,1,0,0,0,607,608,
        5,44,0,0,608,609,5,3,0,0,609,610,3,56,28,0,610,611,5,4,0,0,611,623,
        1,0,0,0,612,623,3,76,38,0,613,623,3,78,39,0,614,615,5,3,0,0,615,
        616,5,9,0,0,616,617,3,38,19,0,617,618,5,4,0,0,618,619,5,3,0,0,619,
        620,3,56,28,0,620,621,5,4,0,0,621,623,1,0,0,0,622,591,1,0,0,0,622,
        596,1,0,0,0,622,601,1,0,0,0,622,607,1,0,0,0,622,612,1,0,0,0,622,
        613,1,0,0,0,622,614,1,0,0,0,623,75,1,0,0,0,624,625,3,80,40,0,625,
        626,5,3,0,0,626,627,3,56,28,0,627,628,5,4,0,0,628,77,1,0,0,0,629,
        630,5,37,0,0,630,631,3,156,78,0,631,632,5,3,0,0,632,633,3,56,28,
        0,633,634,5,4,0,0,634,79,1,0,0,0,635,646,5,71,0,0,636,637,5,42,0,
        0,637,646,3,156,78,0,638,639,5,38,0,0,639,640,5,42,0,0,640,646,3,
        156,78,0,641,642,3,156,78,0,642,643,5,42,0,0,643,644,3,156,78,0,
        644,646,1,0,0,0,645,635,1,0,0,0,645,636,1,0,0,0,645,638,1,0,0,0,
        645,641,1,0,0,0,646,81,1,0,0,0,647,653,6,41,-1,0,648,649,10,1,0,
        0,649,650,5,7,0,0,650,652,3,84,42,0,651,648,1,0,0,0,652,655,1,0,
        0,0,653,651,1,0,0,0,653,654,1,0,0,0,654,83,1,0,0,0,655,653,1,0,0,
        0,656,657,3,156,78,0,657,658,5,41,0,0,658,659,3,32,16,0,659,85,1,
        0,0,0,660,661,5,45,0,0,661,662,5,42,0,0,662,667,3,156,78,0,663,664,
        5,45,0,0,664,665,5,42,0,0,665,667,5,59,0,0,666,660,1,0,0,0,666,663,
        1,0,0,0,667,87,1,0,0,0,668,671,3,90,45,0,669,671,5,1,0,0,670,668,
        1,0,0,0,670,669,1,0,0,0,671,89,1,0,0,0,672,673,5,5,0,0,673,674,3,
        92,46,0,674,675,5,6,0,0,675,91,1,0,0,0,676,684,1,0,0,0,677,678,3,
        102,51,0,678,679,3,92,46,0,679,684,1,0,0,0,680,681,3,94,47,0,681,
        682,3,92,46,0,682,684,1,0,0,0,683,676,1,0,0,0,683,677,1,0,0,0,683,
        680,1,0,0,0,684,93,1,0,0,0,685,686,3,48,24,0,686,687,3,96,48,0,687,
        688,5,1,0,0,688,95,1,0,0,0,689,695,3,98,49,0,690,691,3,98,49,0,691,
        692,5,7,0,0,692,693,3,96,48,0,693,695,1,0,0,0,694,689,1,0,0,0,694,
        690,1,0,0,0,695,97,1,0,0,0,696,697,3,154,77,0,697,698,3,100,50,0,
        698,705,1,0,0,0,699,700,3,154,77,0,700,701,3,100,50,0,701,702,5,
        19,0,0,702,703,3,32,16,0,703,705,1,0,0,0,704,696,1,0,0,0,704,699,
        1,0,0,0,705,99,1,0,0,0,706,707,7,4,0,0,707,101,1,0,0,0,708,709,3,
        38,19,0,709,710,5,1,0,0,710,725,1,0,0,0,711,725,3,138,69,0,712,725,
        3,104,52,0,713,725,3,106,53,0,714,725,3,108,54,0,715,725,3,136,68,
        0,716,725,3,90,45,0,717,725,3,124,62,0,718,725,3,120,60,0,719,725,
        5,1,0,0,720,721,5,39,0,0,721,725,5,1,0,0,722,723,5,43,0,0,723,725,
        5,1,0,0,724,708,1,0,0,0,724,711,1,0,0,0,724,712,1,0,0,0,724,713,
        1,0,0,0,724,714,1,0,0,0,724,715,1,0,0,0,724,716,1,0,0,0,724,717,
        1,0,0,0,724,718,1,0,0,0,724,719,1,0,0,0,724,720,1,0,0,0,724,722,
        1,0,0,0,725,103,1,0,0,0,726,727,5,56,0,0,727,728,5,3,0,0,728,729,
        3,38,19,0,729,730,5,4,0,0,730,731,3,102,51,0,731,105,1,0,0,0,732,
        733,5,57,0,0,733,734,3,102,51,0,734,735,5,56,0,0,735,736,5,3,0,0,
        736,737,3,38,19,0,737,738,5,4,0,0,738,739,5,1,0,0,739,107,1,0,0,
        0,740,741,5,54,0,0,741,742,5,3,0,0,742,743,3,38,19,0,743,744,5,4,
        0,0,744,745,5,5,0,0,745,746,3,110,55,0,746,747,3,112,56,0,747,748,
        3,114,57,0,748,749,5,6,0,0,749,109,1,0,0,0,750,758,6,55,-1,0,751,
        752,10,1,0,0,752,753,3,48,24,0,753,754,3,96,48,0,754,755,5,1,0,0,
        755,757,1,0,0,0,756,751,1,0,0,0,757,760,1,0,0,0,758,756,1,0,0,0,
        758,759,1,0,0,0,759,111,1,0,0,0,760,758,1,0,0,0,761,762,5,55,0,0,
        762,763,3,116,58,0,763,764,5,41,0,0,764,774,1,0,0,0,765,766,5,55,
        0,0,766,767,3,116,58,0,767,768,5,62,0,0,768,769,3,116,58,0,769,770,
        5,41,0,0,770,774,1,0,0,0,771,772,5,58,0,0,772,774,5,41,0,0,773,761,
        1,0,0,0,773,765,1,0,0,0,773,771,1,0,0,0,774,113,1,0,0,0,775,776,
        3,112,56,0,776,777,3,114,57,0,777,783,1,0,0,0,778,779,3,102,51,0,
        779,780,3,114,57,0,780,783,1,0,0,0,781,783,1,0,0,0,782,775,1,0,0,
        0,782,778,1,0,0,0,782,781,1,0,0,0,783,115,1,0,0,0,784,788,3,118,
        59,0,785,788,5,75,0,0,786,788,3,72,36,0,787,784,1,0,0,0,787,785,
        1,0,0,0,787,786,1,0,0,0,788,117,1,0,0,0,789,790,6,59,-1,0,790,791,
        5,3,0,0,791,792,3,118,59,0,792,793,5,4,0,0,793,802,1,0,0,0,794,802,
        5,67,0,0,795,796,5,13,0,0,796,802,5,67,0,0,797,798,5,31,0,0,798,
        802,5,67,0,0,799,800,5,14,0,0,800,802,5,67,0,0,801,789,1,0,0,0,801,
        794,1,0,0,0,801,795,1,0,0,0,801,797,1,0,0,0,801,799,1,0,0,0,802,
        850,1,0,0,0,803,804,10,20,0,0,804,805,5,25,0,0,805,849,3,118,59,
        21,806,807,10,19,0,0,807,808,5,24,0,0,808,849,3,118,59,20,809,810,
        10,18,0,0,810,811,5,22,0,0,811,849,3,118,59,19,812,813,10,17,0,0,
        813,814,5,27,0,0,814,849,3,118,59,18,815,816,10,16,0,0,816,817,5,
        32,0,0,817,849,3,118,59,17,818,819,10,15,0,0,819,820,5,33,0,0,820,
        849,3,118,59,16,821,822,10,14,0,0,822,823,5,8,0,0,823,849,3,118,
        59,15,824,825,10,13,0,0,825,826,5,28,0,0,826,849,3,118,59,14,827,
        828,10,12,0,0,828,829,5,29,0,0,829,849,3,118,59,13,830,831,10,11,
        0,0,831,832,5,30,0,0,832,849,3,118,59,12,833,834,10,9,0,0,834,835,
        5,9,0,0,835,849,3,118,59,10,836,837,10,8,0,0,837,838,5,10,0,0,838,
        849,3,118,59,9,839,840,10,7,0,0,840,841,5,11,0,0,841,849,3,118,59,
        8,842,843,10,6,0,0,843,844,5,13,0,0,844,849,3,118,59,7,845,846,10,
        5,0,0,846,847,5,12,0,0,847,849,3,118,59,6,848,803,1,0,0,0,848,806,
        1,0,0,0,848,809,1,0,0,0,848,812,1,0,0,0,848,815,1,0,0,0,848,818,
        1,0,0,0,848,821,1,0,0,0,848,824,1,0,0,0,848,827,1,0,0,0,848,830,
        1,0,0,0,848,833,1,0,0,0,848,836,1,0,0,0,848,839,1,0,0,0,848,842,
        1,0,0,0,848,845,1,0,0,0,849,852,1,0,0,0,850,848,1,0,0,0,850,851,
        1,0,0,0,851,119,1,0,0,0,852,850,1,0,0,0,853,854,5,52,0,0,854,855,
        5,3,0,0,855,856,3,122,61,0,856,857,5,53,0,0,857,858,3,32,16,0,858,
        859,5,4,0,0,859,860,3,102,51,0,860,121,1,0,0,0,861,867,3,126,63,
        0,862,863,3,126,63,0,863,864,5,7,0,0,864,865,3,126,63,0,865,867,
        1,0,0,0,866,861,1,0,0,0,866,862,1,0,0,0,867,123,1,0,0,0,868,869,
        5,51,0,0,869,870,5,3,0,0,870,871,3,128,64,0,871,872,5,1,0,0,872,
        873,3,134,67,0,873,874,5,1,0,0,874,875,3,134,67,0,875,876,5,4,0,
        0,876,877,3,102,51,0,877,125,1,0,0,0,878,882,5,44,0,0,879,882,3,
        132,66,0,880,882,5,71,0,0,881,878,1,0,0,0,881,879,1,0,0,0,881,880,
        1,0,0,0,882,127,1,0,0,0,883,886,3,134,67,0,884,886,3,130,65,0,885,
        883,1,0,0,0,885,884,1,0,0,0,886,129,1,0,0,0,887,888,3,132,66,0,888,
        889,5,19,0,0,889,890,3,32,16,0,890,131,1,0,0,0,891,892,3,48,24,0,
        892,893,3,154,77,0,893,894,3,100,50,0,894,133,1,0,0,0,895,898,1,
        0,0,0,896,898,3,38,19,0,897,895,1,0,0,0,897,896,1,0,0,0,898,135,
        1,0,0,0,899,900,5,50,0,0,900,906,5,1,0,0,901,902,5,50,0,0,902,903,
        3,38,19,0,903,904,5,1,0,0,904,906,1,0,0,0,905,899,1,0,0,0,905,901,
        1,0,0,0,906,137,1,0,0,0,907,908,5,48,0,0,908,909,5,3,0,0,909,910,
        3,38,19,0,910,911,5,4,0,0,911,912,3,102,51,0,912,913,3,140,70,0,
        913,139,1,0,0,0,914,918,1,0,0,0,915,916,5,47,0,0,916,918,3,102,51,
        0,917,914,1,0,0,0,917,915,1,0,0,0,918,141,1,0,0,0,919,925,1,0,0,
        0,920,925,3,144,72,0,921,922,3,144,72,0,922,923,5,46,0,0,923,925,
        1,0,0,0,924,919,1,0,0,0,924,920,1,0,0,0,924,921,1,0,0,0,925,143,
        1,0,0,0,926,927,6,72,-1,0,927,928,3,146,73,0,928,934,1,0,0,0,929,
        930,10,1,0,0,930,931,5,7,0,0,931,933,3,146,73,0,932,929,1,0,0,0,
        933,936,1,0,0,0,934,932,1,0,0,0,934,935,1,0,0,0,935,145,1,0,0,0,
        936,934,1,0,0,0,937,938,3,48,24,0,938,939,3,154,77,0,939,946,1,0,
        0,0,940,941,3,48,24,0,941,942,3,154,77,0,942,943,3,100,50,0,943,
        946,1,0,0,0,944,946,3,100,50,0,945,937,1,0,0,0,945,940,1,0,0,0,945,
        944,1,0,0,0,946,147,1,0,0,0,947,948,5,49,0,0,948,949,3,72,36,0,949,
        950,5,1,0,0,950,149,1,0,0,0,951,952,3,18,9,0,952,953,3,152,76,0,
        953,151,1,0,0,0,954,957,3,48,24,0,955,957,1,0,0,0,956,954,1,0,0,
        0,956,955,1,0,0,0,957,153,1,0,0,0,958,961,1,0,0,0,959,961,5,9,0,
        0,960,958,1,0,0,0,960,959,1,0,0,0,961,155,1,0,0,0,962,963,7,4,0,
        0,963,157,1,0,0,0,57,167,171,176,186,190,198,217,233,241,251,261,
        293,343,345,356,366,392,441,504,506,517,524,529,535,539,554,561,
        572,581,588,622,645,653,666,670,683,694,704,724,758,773,782,787,
        801,848,850,866,881,885,897,905,917,924,934,945,956,960
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!LPCParser.__ATN) {
            LPCParser.__ATN = new antlr.ATNDeserializer().deserialize(LPCParser._serializedATN);
        }

        return LPCParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(LPCParser.literalNames, LPCParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return LPCParser.vocabulary;
    }

    private static readonly decisionsToDFA = LPCParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class Lpc_programContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public program(): ProgramContext {
        return this.getRuleContext(0, ProgramContext)!;
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(LPCParser.EOF, 0)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_lpc_program;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterLpc_program) {
             listener.enterLpc_program(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitLpc_program) {
             listener.exitLpc_program(this);
        }
    }
}


export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public program(): ProgramContext | null {
        return this.getRuleContext(0, ProgramContext);
    }
    public directive(): DirectiveContext | null {
        return this.getRuleContext(0, DirectiveContext);
    }
    public definition(): DefinitionContext | null {
        return this.getRuleContext(0, DefinitionContext);
    }
    public possible_semi_colon(): Possible_semi_colonContext | null {
        return this.getRuleContext(0, Possible_semi_colonContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_program;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitProgram) {
             listener.exitProgram(this);
        }
    }
}


export class Possible_semi_colonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_possible_semi_colon;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterPossible_semi_colon) {
             listener.enterPossible_semi_colon(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitPossible_semi_colon) {
             listener.exitPossible_semi_colon(this);
        }
    }
}


export class DefinitionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public function_definition(): Function_definitionContext | null {
        return this.getRuleContext(0, Function_definitionContext);
    }
    public data_type(): Data_typeContext | null {
        return this.getRuleContext(0, Data_typeContext);
    }
    public name_list(): Name_listContext | null {
        return this.getRuleContext(0, Name_listContext);
    }
    public inheritance(): InheritanceContext | null {
        return this.getRuleContext(0, InheritanceContext);
    }
    public type_decl(): Type_declContext | null {
        return this.getRuleContext(0, Type_declContext);
    }
    public modifier_change(): Modifier_changeContext | null {
        return this.getRuleContext(0, Modifier_changeContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_definition;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterDefinition) {
             listener.enterDefinition(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitDefinition) {
             listener.exitDefinition(this);
        }
    }
}


export class DirectiveContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public defineDeclaration(): DefineDeclarationContext | null {
        return this.getRuleContext(0, DefineDeclarationContext);
    }
    public include(): IncludeContext | null {
        return this.getRuleContext(0, IncludeContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_directive;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterDirective) {
             listener.enterDirective(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitDirective) {
             listener.exitDirective(this);
        }
    }
}


export class DefineDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DefineBlock(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DefineBlock, 0);
    }
    public MultiDefine(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.MultiDefine, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_defineDeclaration;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterDefineDeclaration) {
             listener.enterDefineDeclaration(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitDefineDeclaration) {
             listener.exitDefineDeclaration(this);
        }
    }
}


export class IncludeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Include(): antlr.TerminalNode {
        return this.getToken(LPCParser.Include, 0)!;
    }
    public Whitespace(): antlr.TerminalNode[];
    public Whitespace(i: number): antlr.TerminalNode | null;
    public Whitespace(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.Whitespace);
    	} else {
    		return this.getToken(LPCParser.Whitespace, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_include;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterInclude) {
             listener.enterInclude(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitInclude) {
             listener.exitInclude(this);
        }
    }
}


export class Function_definitionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public data_type(): Data_typeContext {
        return this.getRuleContext(0, Data_typeContext)!;
    }
    public optional_star(): Optional_starContext {
        return this.getRuleContext(0, Optional_starContext)!;
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public argument(): ArgumentContext {
        return this.getRuleContext(0, ArgumentContext)!;
    }
    public block_or_semi(): Block_or_semiContext {
        return this.getRuleContext(0, Block_or_semiContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_function_definition;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterFunction_definition) {
             listener.enterFunction_definition(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitFunction_definition) {
             listener.exitFunction_definition(this);
        }
    }
}


export class Modifier_changeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public type_modifier_list(): Type_modifier_listContext {
        return this.getRuleContext(0, Type_modifier_listContext)!;
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(LPCParser.Colon, 0)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_modifier_change;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterModifier_change) {
             listener.enterModifier_change(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitModifier_change) {
             listener.exitModifier_change(this);
        }
    }
}


export class Type_modifier_listContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TypeModifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.TypeModifier, 0);
    }
    public type_modifier_list(): Type_modifier_listContext | null {
        return this.getRuleContext(0, Type_modifier_listContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_type_modifier_list;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterType_modifier_list) {
             listener.enterType_modifier_list(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitType_modifier_list) {
             listener.exitType_modifier_list(this);
        }
    }
}


export class Type_declContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public type_modifier_list(): Type_modifier_listContext {
        return this.getRuleContext(0, Type_modifier_listContext)!;
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public member_list(): Member_listContext {
        return this.getRuleContext(0, Member_listContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_type_decl;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterType_decl) {
             listener.enterType_decl(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitType_decl) {
             listener.exitType_decl(this);
        }
    }
}


export class Member_listContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public member_list(): Member_listContext | null {
        return this.getRuleContext(0, Member_listContext);
    }
    public data_type(): Data_typeContext | null {
        return this.getRuleContext(0, Data_typeContext);
    }
    public member_name_list(): Member_name_listContext | null {
        return this.getRuleContext(0, Member_name_listContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_member_list;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterMember_list) {
             listener.enterMember_list(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitMember_list) {
             listener.exitMember_list(this);
        }
    }
}


export class Member_name_listContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public member_name(): Member_nameContext {
        return this.getRuleContext(0, Member_nameContext)!;
    }
    public member_name_list(): Member_name_listContext | null {
        return this.getRuleContext(0, Member_name_listContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_member_name_list;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterMember_name_list) {
             listener.enterMember_name_list(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitMember_name_list) {
             listener.exitMember_name_list(this);
        }
    }
}


export class Member_nameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public optional_star(): Optional_starContext {
        return this.getRuleContext(0, Optional_starContext)!;
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_member_name;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterMember_name) {
             listener.enterMember_name(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitMember_name) {
             listener.exitMember_name(this);
        }
    }
}


export class Name_listContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public new_name(): New_nameContext {
        return this.getRuleContext(0, New_nameContext)!;
    }
    public name_list(): Name_listContext | null {
        return this.getRuleContext(0, Name_listContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_name_list;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterName_list) {
             listener.enterName_list(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitName_list) {
             listener.exitName_list(this);
        }
    }
}


export class New_nameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public optional_star(): Optional_starContext {
        return this.getRuleContext(0, Optional_starContext)!;
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public Assign(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Assign, 0);
    }
    public expr0(): Expr0Context | null {
        return this.getRuleContext(0, Expr0Context);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_new_name;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterNew_name) {
             listener.enterNew_name(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitNew_name) {
             listener.exitNew_name(this);
        }
    }
}


export class Expr0Context extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr4(): Expr4Context | null {
        return this.getRuleContext(0, Expr4Context);
    }
    public Assign(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Assign, 0);
    }
    public expr0(): Expr0Context[];
    public expr0(i: number): Expr0Context | null;
    public expr0(i?: number): Expr0Context[] | Expr0Context | null {
        if (i === undefined) {
            return this.getRuleContexts(Expr0Context);
        }

        return this.getRuleContext(i, Expr0Context);
    }
    public cast(): CastContext | null {
        return this.getRuleContext(0, CastContext);
    }
    public PlusPlus(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PlusPlus, 0);
    }
    public MinusMinus(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.MinusMinus, 0);
    }
    public Not(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Not, 0);
    }
    public sscanf(): SscanfContext | null {
        return this.getRuleContext(0, SscanfContext);
    }
    public parse_command(): Parse_commandContext | null {
        return this.getRuleContext(0, Parse_commandContext);
    }
    public time_expression(): Time_expressionContext | null {
        return this.getRuleContext(0, Time_expressionContext);
    }
    public Number(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Number, 0);
    }
    public Real(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Real, 0);
    }
    public Question(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Question, 0);
    }
    public Colon(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Colon, 0);
    }
    public OrOr(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.OrOr, 0);
    }
    public AndAnd(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.AndAnd, 0);
    }
    public Or(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Or, 0);
    }
    public Caret(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Caret, 0);
    }
    public And(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.And, 0);
    }
    public Equal(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Equal, 0);
    }
    public NotEqual(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.NotEqual, 0);
    }
    public Compare(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Compare, 0);
    }
    public LeftShift(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.LeftShift, 0);
    }
    public RightShift(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.RightShift, 0);
    }
    public RightShift3(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.RightShift3, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_expr0;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterExpr0) {
             listener.enterExpr0(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitExpr0) {
             listener.exitExpr0(this);
        }
    }
}


export class Time_expressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TimeExpression(): antlr.TerminalNode {
        return this.getToken(LPCParser.TimeExpression, 0)!;
    }
    public expr_or_block(): Expr_or_blockContext {
        return this.getRuleContext(0, Expr_or_blockContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_time_expression;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterTime_expression) {
             listener.enterTime_expression(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitTime_expression) {
             listener.exitTime_expression(this);
        }
    }
}


export class Expr_or_blockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
    }
    public comma_expr(): Comma_exprContext | null {
        return this.getRuleContext(0, Comma_exprContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_expr_or_block;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterExpr_or_block) {
             listener.enterExpr_or_block(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitExpr_or_block) {
             listener.exitExpr_or_block(this);
        }
    }
}


export class Comma_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr0(): Expr0Context {
        return this.getRuleContext(0, Expr0Context)!;
    }
    public comma_expr(): Comma_exprContext | null {
        return this.getRuleContext(0, Comma_exprContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_comma_expr;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterComma_expr) {
             listener.enterComma_expr(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitComma_expr) {
             listener.exitComma_expr(this);
        }
    }
}


export class Parse_commandContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ParseCommand(): antlr.TerminalNode {
        return this.getToken(LPCParser.ParseCommand, 0)!;
    }
    public expr0(): Expr0Context[];
    public expr0(i: number): Expr0Context | null;
    public expr0(i?: number): Expr0Context[] | Expr0Context | null {
        if (i === undefined) {
            return this.getRuleContexts(Expr0Context);
        }

        return this.getRuleContext(i, Expr0Context);
    }
    public lvalue_list(): Lvalue_listContext {
        return this.getRuleContext(0, Lvalue_listContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_parse_command;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterParse_command) {
             listener.enterParse_command(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitParse_command) {
             listener.exitParse_command(this);
        }
    }
}


export class SscanfContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SScanf(): antlr.TerminalNode {
        return this.getToken(LPCParser.SScanf, 0)!;
    }
    public expr0(): Expr0Context[];
    public expr0(i: number): Expr0Context | null;
    public expr0(i?: number): Expr0Context[] | Expr0Context | null {
        if (i === undefined) {
            return this.getRuleContexts(Expr0Context);
        }

        return this.getRuleContext(i, Expr0Context);
    }
    public lvalue_list(): Lvalue_listContext {
        return this.getRuleContext(0, Lvalue_listContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_sscanf;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterSscanf) {
             listener.enterSscanf(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitSscanf) {
             listener.exitSscanf(this);
        }
    }
}


export class Lvalue_listContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr4(): Expr4Context | null {
        return this.getRuleContext(0, Expr4Context);
    }
    public lvalue_list(): Lvalue_listContext | null {
        return this.getRuleContext(0, Lvalue_listContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_lvalue_list;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterLvalue_list) {
             listener.enterLvalue_list(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitLvalue_list) {
             listener.exitLvalue_list(this);
        }
    }
}


export class CastContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public basic_type(): Basic_typeContext {
        return this.getRuleContext(0, Basic_typeContext)!;
    }
    public optional_star(): Optional_starContext {
        return this.getRuleContext(0, Optional_starContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_cast;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterCast) {
             listener.enterCast(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitCast) {
             listener.exitCast(this);
        }
    }
}


export class Basic_typeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public atomic_type(): Atomic_typeContext {
        return this.getRuleContext(0, Atomic_typeContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_basic_type;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterBasic_type) {
             listener.enterBasic_type(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitBasic_type) {
             listener.exitBasic_type(this);
        }
    }
}


export class Atomic_typeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BasicType(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.BasicType, 0);
    }
    public DefinedName(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DefinedName, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_atomic_type;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterAtomic_type) {
             listener.enterAtomic_type(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitAtomic_type) {
             listener.exitAtomic_type(this);
        }
    }
}


export class Expr4Context extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public function_call(): Function_callContext | null {
        return this.getRuleContext(0, Function_callContext);
    }
    public DefinedName(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DefinedName, 0);
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
    }
    public Parameter(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Parameter, 0);
    }
    public comma_expr(): Comma_exprContext[];
    public comma_expr(i: number): Comma_exprContext | null;
    public comma_expr(i?: number): Comma_exprContext[] | Comma_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Comma_exprContext);
        }

        return this.getRuleContext(i, Comma_exprContext);
    }
    public string(): StringContext | null {
        return this.getRuleContext(0, StringContext);
    }
    public CharacterConstant(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.CharacterConstant, 0);
    }
    public catch_statement(): Catch_statementContext | null {
        return this.getRuleContext(0, Catch_statementContext);
    }
    public BasicType(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.BasicType, 0);
    }
    public argument(): ArgumentContext | null {
        return this.getRuleContext(0, ArgumentContext);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
    }
    public FunctionOpen(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.FunctionOpen, 0);
    }
    public Colon(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Colon, 0);
    }
    public MappingOpen(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.MappingOpen, 0);
    }
    public expr_list_mapping(): Expr_list_mappingContext | null {
        return this.getRuleContext(0, Expr_list_mappingContext);
    }
    public ArrayOpen(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.ArrayOpen, 0);
    }
    public expr_list(): Expr_listContext | null {
        return this.getRuleContext(0, Expr_listContext);
    }
    public expr4(): Expr4Context | null {
        return this.getRuleContext(0, Expr4Context);
    }
    public function_arrow_call(): Function_arrow_callContext | null {
        return this.getRuleContext(0, Function_arrow_callContext);
    }
    public Arrow(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Arrow, 0);
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public Range(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Range, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_expr4;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterExpr4) {
             listener.enterExpr4(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitExpr4) {
             listener.exitExpr4(this);
        }
    }
}


export class Catch_statementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Catch(): antlr.TerminalNode {
        return this.getToken(LPCParser.Catch, 0)!;
    }
    public expr_or_block(): Expr_or_blockContext {
        return this.getRuleContext(0, Expr_or_blockContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_catch_statement;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterCatch_statement) {
             listener.enterCatch_statement(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitCatch_statement) {
             listener.exitCatch_statement(this);
        }
    }
}


export class Expr_listContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr_list2(): Expr_list2Context | null {
        return this.getRuleContext(0, Expr_list2Context);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_expr_list;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterExpr_list) {
             listener.enterExpr_list(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitExpr_list) {
             listener.exitExpr_list(this);
        }
    }
}


export class Expr_list_mappingContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr_list4(): Expr_list4Context | null {
        return this.getRuleContext(0, Expr_list4Context);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_expr_list_mapping;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterExpr_list_mapping) {
             listener.enterExpr_list_mapping(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitExpr_list_mapping) {
             listener.exitExpr_list_mapping(this);
        }
    }
}


export class Expr_list4Context extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr0(): Expr0Context | null {
        return this.getRuleContext(0, Expr0Context);
    }
    public assoc_pair(): Assoc_pairContext | null {
        return this.getRuleContext(0, Assoc_pairContext);
    }
    public expr_list4(): Expr_list4Context | null {
        return this.getRuleContext(0, Expr_list4Context);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_expr_list4;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterExpr_list4) {
             listener.enterExpr_list4(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitExpr_list4) {
             listener.exitExpr_list4(this);
        }
    }
}


export class Assoc_pairContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr0(): Expr0Context[];
    public expr0(i: number): Expr0Context | null;
    public expr0(i?: number): Expr0Context[] | Expr0Context | null {
        if (i === undefined) {
            return this.getRuleContexts(Expr0Context);
        }

        return this.getRuleContext(i, Expr0Context);
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(LPCParser.Colon, 0)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_assoc_pair;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterAssoc_pair) {
             listener.enterAssoc_pair(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitAssoc_pair) {
             listener.exitAssoc_pair(this);
        }
    }
}


export class Expr_list2Context extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr_list_node(): Expr_list_nodeContext {
        return this.getRuleContext(0, Expr_list_nodeContext)!;
    }
    public expr_list2(): Expr_list2Context | null {
        return this.getRuleContext(0, Expr_list2Context);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_expr_list2;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterExpr_list2) {
             listener.enterExpr_list2(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitExpr_list2) {
             listener.exitExpr_list2(this);
        }
    }
}


export class Expr_list_nodeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr0(): Expr0Context {
        return this.getRuleContext(0, Expr0Context)!;
    }
    public Ellipsis(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Ellipsis, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_expr_list_node;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterExpr_list_node) {
             listener.enterExpr_list_node(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitExpr_list_node) {
             listener.exitExpr_list_node(this);
        }
    }
}


export class StringContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public string_con2(): String_con2Context {
        return this.getRuleContext(0, String_con2Context)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_string;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterString) {
             listener.enterString(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitString) {
             listener.exitString(this);
        }
    }
}


export class String_con2Context extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public String(): antlr.TerminalNode {
        return this.getToken(LPCParser.String, 0)!;
    }
    public string_con2(): String_con2Context | null {
        return this.getRuleContext(0, String_con2Context);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_string_con2;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterString_con2) {
             listener.enterString_con2(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitString_con2) {
             listener.exitString_con2(this);
        }
    }
}


export class String_con1Context extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public string_con2(): String_con2Context | null {
        return this.getRuleContext(0, String_con2Context);
    }
    public string_con1(): String_con1Context[];
    public string_con1(i: number): String_con1Context | null;
    public string_con1(i?: number): String_con1Context[] | String_con1Context | null {
        if (i === undefined) {
            return this.getRuleContexts(String_con1Context);
        }

        return this.getRuleContext(i, String_con1Context);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_string_con1;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterString_con1) {
             listener.enterString_con1(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitString_con1) {
             listener.exitString_con1(this);
        }
    }
}


export class Function_callContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public efun_override(): Efun_overrideContext | null {
        return this.getRuleContext(0, Efun_overrideContext);
    }
    public expr_list(): Expr_listContext | null {
        return this.getRuleContext(0, Expr_listContext);
    }
    public New(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.New, 0);
    }
    public DefinedName(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DefinedName, 0);
    }
    public opt_class_init(): Opt_class_initContext | null {
        return this.getRuleContext(0, Opt_class_initContext);
    }
    public function_name_call(): Function_name_callContext | null {
        return this.getRuleContext(0, Function_name_callContext);
    }
    public function_arrow_call(): Function_arrow_callContext | null {
        return this.getRuleContext(0, Function_arrow_callContext);
    }
    public comma_expr(): Comma_exprContext | null {
        return this.getRuleContext(0, Comma_exprContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_function_call;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterFunction_call) {
             listener.enterFunction_call(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitFunction_call) {
             listener.exitFunction_call(this);
        }
    }
}


export class Function_name_callContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public function_name(): Function_nameContext {
        return this.getRuleContext(0, Function_nameContext)!;
    }
    public expr_list(): Expr_listContext {
        return this.getRuleContext(0, Expr_listContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_function_name_call;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterFunction_name_call) {
             listener.enterFunction_name_call(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitFunction_name_call) {
             listener.exitFunction_name_call(this);
        }
    }
}


export class Function_arrow_callContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Arrow(): antlr.TerminalNode {
        return this.getToken(LPCParser.Arrow, 0)!;
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public expr_list(): Expr_listContext {
        return this.getRuleContext(0, Expr_listContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_function_arrow_call;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterFunction_arrow_call) {
             listener.enterFunction_arrow_call(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitFunction_arrow_call) {
             listener.exitFunction_arrow_call(this);
        }
    }
}


export class Function_nameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
    }
    public ColonColon(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.ColonColon, 0);
    }
    public identifier(): IdentifierContext[];
    public identifier(i: number): IdentifierContext | null;
    public identifier(i?: number): IdentifierContext[] | IdentifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(IdentifierContext);
        }

        return this.getRuleContext(i, IdentifierContext);
    }
    public BasicType(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.BasicType, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_function_name;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterFunction_name) {
             listener.enterFunction_name(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitFunction_name) {
             listener.exitFunction_name(this);
        }
    }
}


export class Opt_class_initContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public opt_class_init(): Opt_class_initContext | null {
        return this.getRuleContext(0, Opt_class_initContext);
    }
    public class_init(): Class_initContext | null {
        return this.getRuleContext(0, Class_initContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_opt_class_init;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterOpt_class_init) {
             listener.enterOpt_class_init(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitOpt_class_init) {
             listener.exitOpt_class_init(this);
        }
    }
}


export class Class_initContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(LPCParser.Colon, 0)!;
    }
    public expr0(): Expr0Context {
        return this.getRuleContext(0, Expr0Context)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_class_init;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterClass_init) {
             listener.enterClass_init(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitClass_init) {
             listener.exitClass_init(this);
        }
    }
}


export class Efun_overrideContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Efun(): antlr.TerminalNode {
        return this.getToken(LPCParser.Efun, 0)!;
    }
    public ColonColon(): antlr.TerminalNode {
        return this.getToken(LPCParser.ColonColon, 0)!;
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public New(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.New, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_efun_override;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterEfun_override) {
             listener.enterEfun_override(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitEfun_override) {
             listener.exitEfun_override(this);
        }
    }
}


export class Block_or_semiContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_block_or_semi;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterBlock_or_semi) {
             listener.enterBlock_or_semi(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitBlock_or_semi) {
             listener.exitBlock_or_semi(this);
        }
    }
}


export class BlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public statements(): StatementsContext {
        return this.getRuleContext(0, StatementsContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_block;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitBlock) {
             listener.exitBlock(this);
        }
    }
}


export class StatementsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public statement(): StatementContext | null {
        return this.getRuleContext(0, StatementContext);
    }
    public statements(): StatementsContext | null {
        return this.getRuleContext(0, StatementsContext);
    }
    public local_declare_statement(): Local_declare_statementContext | null {
        return this.getRuleContext(0, Local_declare_statementContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_statements;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterStatements) {
             listener.enterStatements(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitStatements) {
             listener.exitStatements(this);
        }
    }
}


export class Local_declare_statementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public basic_type(): Basic_typeContext {
        return this.getRuleContext(0, Basic_typeContext)!;
    }
    public local_name_list(): Local_name_listContext {
        return this.getRuleContext(0, Local_name_listContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_local_declare_statement;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterLocal_declare_statement) {
             listener.enterLocal_declare_statement(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitLocal_declare_statement) {
             listener.exitLocal_declare_statement(this);
        }
    }
}


export class Local_name_listContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public new_local_def(): New_local_defContext {
        return this.getRuleContext(0, New_local_defContext)!;
    }
    public local_name_list(): Local_name_listContext | null {
        return this.getRuleContext(0, Local_name_listContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_local_name_list;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterLocal_name_list) {
             listener.enterLocal_name_list(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitLocal_name_list) {
             listener.exitLocal_name_list(this);
        }
    }
}


export class New_local_defContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public optional_star(): Optional_starContext {
        return this.getRuleContext(0, Optional_starContext)!;
    }
    public new_local_name(): New_local_nameContext {
        return this.getRuleContext(0, New_local_nameContext)!;
    }
    public Assign(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Assign, 0);
    }
    public expr0(): Expr0Context | null {
        return this.getRuleContext(0, Expr0Context);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_new_local_def;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterNew_local_def) {
             listener.enterNew_local_def(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitNew_local_def) {
             listener.exitNew_local_def(this);
        }
    }
}


export class New_local_nameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
    }
    public DefinedName(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DefinedName, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_new_local_name;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterNew_local_name) {
             listener.enterNew_local_name(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitNew_local_name) {
             listener.exitNew_local_name(this);
        }
    }
}


export class StatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public comma_expr(): Comma_exprContext | null {
        return this.getRuleContext(0, Comma_exprContext);
    }
    public cond(): CondContext | null {
        return this.getRuleContext(0, CondContext);
    }
    public while_statement(): While_statementContext | null {
        return this.getRuleContext(0, While_statementContext);
    }
    public do_statement(): Do_statementContext | null {
        return this.getRuleContext(0, Do_statementContext);
    }
    public switch_statement(): Switch_statementContext | null {
        return this.getRuleContext(0, Switch_statementContext);
    }
    public returnStatement(): ReturnStatementContext | null {
        return this.getRuleContext(0, ReturnStatementContext);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
    }
    public for_loop(): For_loopContext | null {
        return this.getRuleContext(0, For_loopContext);
    }
    public foreach_loop(): Foreach_loopContext | null {
        return this.getRuleContext(0, Foreach_loopContext);
    }
    public Break(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Break, 0);
    }
    public Continue(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Continue, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_statement;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitStatement) {
             listener.exitStatement(this);
        }
    }
}


export class While_statementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public While(): antlr.TerminalNode {
        return this.getToken(LPCParser.While, 0)!;
    }
    public comma_expr(): Comma_exprContext {
        return this.getRuleContext(0, Comma_exprContext)!;
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_while_statement;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterWhile_statement) {
             listener.enterWhile_statement(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitWhile_statement) {
             listener.exitWhile_statement(this);
        }
    }
}


export class Do_statementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Do(): antlr.TerminalNode {
        return this.getToken(LPCParser.Do, 0)!;
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public While(): antlr.TerminalNode {
        return this.getToken(LPCParser.While, 0)!;
    }
    public comma_expr(): Comma_exprContext {
        return this.getRuleContext(0, Comma_exprContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_do_statement;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterDo_statement) {
             listener.enterDo_statement(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitDo_statement) {
             listener.exitDo_statement(this);
        }
    }
}


export class Switch_statementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Switch(): antlr.TerminalNode {
        return this.getToken(LPCParser.Switch, 0)!;
    }
    public comma_expr(): Comma_exprContext {
        return this.getRuleContext(0, Comma_exprContext)!;
    }
    public local_declarations(): Local_declarationsContext {
        return this.getRuleContext(0, Local_declarationsContext)!;
    }
    public case_statement(): Case_statementContext {
        return this.getRuleContext(0, Case_statementContext)!;
    }
    public switch_block(): Switch_blockContext {
        return this.getRuleContext(0, Switch_blockContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_switch_statement;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterSwitch_statement) {
             listener.enterSwitch_statement(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitSwitch_statement) {
             listener.exitSwitch_statement(this);
        }
    }
}


export class Local_declarationsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public local_declarations(): Local_declarationsContext | null {
        return this.getRuleContext(0, Local_declarationsContext);
    }
    public basic_type(): Basic_typeContext | null {
        return this.getRuleContext(0, Basic_typeContext);
    }
    public local_name_list(): Local_name_listContext | null {
        return this.getRuleContext(0, Local_name_listContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_local_declarations;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterLocal_declarations) {
             listener.enterLocal_declarations(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitLocal_declarations) {
             listener.exitLocal_declarations(this);
        }
    }
}


export class Case_statementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Case(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Case, 0);
    }
    public case_label(): Case_labelContext[];
    public case_label(i: number): Case_labelContext | null;
    public case_label(i?: number): Case_labelContext[] | Case_labelContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Case_labelContext);
        }

        return this.getRuleContext(i, Case_labelContext);
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(LPCParser.Colon, 0)!;
    }
    public Range(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Range, 0);
    }
    public Default(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Default, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_case_statement;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterCase_statement) {
             listener.enterCase_statement(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitCase_statement) {
             listener.exitCase_statement(this);
        }
    }
}


export class Switch_blockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public case_statement(): Case_statementContext | null {
        return this.getRuleContext(0, Case_statementContext);
    }
    public switch_block(): Switch_blockContext | null {
        return this.getRuleContext(0, Switch_blockContext);
    }
    public statement(): StatementContext | null {
        return this.getRuleContext(0, StatementContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_switch_block;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterSwitch_block) {
             listener.enterSwitch_block(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitSwitch_block) {
             listener.exitSwitch_block(this);
        }
    }
}


export class Case_labelContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public constant(): ConstantContext | null {
        return this.getRuleContext(0, ConstantContext);
    }
    public CharacterConstant(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.CharacterConstant, 0);
    }
    public string_con1(): String_con1Context | null {
        return this.getRuleContext(0, String_con1Context);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_case_label;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterCase_label) {
             listener.enterCase_label(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitCase_label) {
             listener.exitCase_label(this);
        }
    }
}


export class ConstantContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public constant(): ConstantContext[];
    public constant(i: number): ConstantContext | null;
    public constant(i?: number): ConstantContext[] | ConstantContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConstantContext);
        }

        return this.getRuleContext(i, ConstantContext);
    }
    public Number(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Number, 0);
    }
    public Not(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Not, 0);
    }
    public Or(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Or, 0);
    }
    public Caret(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Caret, 0);
    }
    public And(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.And, 0);
    }
    public Equal(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Equal, 0);
    }
    public NotEqual(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.NotEqual, 0);
    }
    public Compare(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Compare, 0);
    }
    public LeftShift(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.LeftShift, 0);
    }
    public RightShift(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.RightShift, 0);
    }
    public RightShift3(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.RightShift3, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_constant;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterConstant) {
             listener.enterConstant(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitConstant) {
             listener.exitConstant(this);
        }
    }
}


export class Foreach_loopContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Foreach(): antlr.TerminalNode {
        return this.getToken(LPCParser.Foreach, 0)!;
    }
    public foreach_vars(): Foreach_varsContext {
        return this.getRuleContext(0, Foreach_varsContext)!;
    }
    public In(): antlr.TerminalNode {
        return this.getToken(LPCParser.In, 0)!;
    }
    public expr0(): Expr0Context {
        return this.getRuleContext(0, Expr0Context)!;
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_foreach_loop;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterForeach_loop) {
             listener.enterForeach_loop(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitForeach_loop) {
             listener.exitForeach_loop(this);
        }
    }
}


export class Foreach_varsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public foreach_var(): Foreach_varContext[];
    public foreach_var(i: number): Foreach_varContext | null;
    public foreach_var(i?: number): Foreach_varContext[] | Foreach_varContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Foreach_varContext);
        }

        return this.getRuleContext(i, Foreach_varContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_foreach_vars;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterForeach_vars) {
             listener.enterForeach_vars(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitForeach_vars) {
             listener.exitForeach_vars(this);
        }
    }
}


export class For_loopContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public For(): antlr.TerminalNode {
        return this.getToken(LPCParser.For, 0)!;
    }
    public first_for_expr(): First_for_exprContext {
        return this.getRuleContext(0, First_for_exprContext)!;
    }
    public for_expr(): For_exprContext[];
    public for_expr(i: number): For_exprContext | null;
    public for_expr(i?: number): For_exprContext[] | For_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(For_exprContext);
        }

        return this.getRuleContext(i, For_exprContext);
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_for_loop;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterFor_loop) {
             listener.enterFor_loop(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitFor_loop) {
             listener.exitFor_loop(this);
        }
    }
}


export class Foreach_varContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DefinedName(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DefinedName, 0);
    }
    public single_new_local_def(): Single_new_local_defContext | null {
        return this.getRuleContext(0, Single_new_local_defContext);
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_foreach_var;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterForeach_var) {
             listener.enterForeach_var(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitForeach_var) {
             listener.exitForeach_var(this);
        }
    }
}


export class First_for_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public for_expr(): For_exprContext | null {
        return this.getRuleContext(0, For_exprContext);
    }
    public single_new_local_def_with_init(): Single_new_local_def_with_initContext | null {
        return this.getRuleContext(0, Single_new_local_def_with_initContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_first_for_expr;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterFirst_for_expr) {
             listener.enterFirst_for_expr(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitFirst_for_expr) {
             listener.exitFirst_for_expr(this);
        }
    }
}


export class Single_new_local_def_with_initContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public single_new_local_def(): Single_new_local_defContext {
        return this.getRuleContext(0, Single_new_local_defContext)!;
    }
    public Assign(): antlr.TerminalNode {
        return this.getToken(LPCParser.Assign, 0)!;
    }
    public expr0(): Expr0Context {
        return this.getRuleContext(0, Expr0Context)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_single_new_local_def_with_init;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterSingle_new_local_def_with_init) {
             listener.enterSingle_new_local_def_with_init(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitSingle_new_local_def_with_init) {
             listener.exitSingle_new_local_def_with_init(this);
        }
    }
}


export class Single_new_local_defContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public basic_type(): Basic_typeContext {
        return this.getRuleContext(0, Basic_typeContext)!;
    }
    public optional_star(): Optional_starContext {
        return this.getRuleContext(0, Optional_starContext)!;
    }
    public new_local_name(): New_local_nameContext {
        return this.getRuleContext(0, New_local_nameContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_single_new_local_def;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterSingle_new_local_def) {
             listener.enterSingle_new_local_def(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitSingle_new_local_def) {
             listener.exitSingle_new_local_def(this);
        }
    }
}


export class For_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public comma_expr(): Comma_exprContext | null {
        return this.getRuleContext(0, Comma_exprContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_for_expr;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterFor_expr) {
             listener.enterFor_expr(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitFor_expr) {
             listener.exitFor_expr(this);
        }
    }
}


export class ReturnStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Return(): antlr.TerminalNode {
        return this.getToken(LPCParser.Return, 0)!;
    }
    public comma_expr(): Comma_exprContext | null {
        return this.getRuleContext(0, Comma_exprContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_returnStatement;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterReturnStatement) {
             listener.enterReturnStatement(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitReturnStatement) {
             listener.exitReturnStatement(this);
        }
    }
}


export class CondContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public If(): antlr.TerminalNode {
        return this.getToken(LPCParser.If, 0)!;
    }
    public comma_expr(): Comma_exprContext {
        return this.getRuleContext(0, Comma_exprContext)!;
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public optional_else_part(): Optional_else_partContext {
        return this.getRuleContext(0, Optional_else_partContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_cond;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterCond) {
             listener.enterCond(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitCond) {
             listener.exitCond(this);
        }
    }
}


export class Optional_else_partContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Else(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Else, 0);
    }
    public statement(): StatementContext | null {
        return this.getRuleContext(0, StatementContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_optional_else_part;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterOptional_else_part) {
             listener.enterOptional_else_part(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitOptional_else_part) {
             listener.exitOptional_else_part(this);
        }
    }
}


export class ArgumentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public argument_list(): Argument_listContext | null {
        return this.getRuleContext(0, Argument_listContext);
    }
    public Ellipsis(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Ellipsis, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_argument;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterArgument) {
             listener.enterArgument(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitArgument) {
             listener.exitArgument(this);
        }
    }
}


export class Argument_listContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public new_arg(): New_argContext {
        return this.getRuleContext(0, New_argContext)!;
    }
    public argument_list(): Argument_listContext | null {
        return this.getRuleContext(0, Argument_listContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_argument_list;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterArgument_list) {
             listener.enterArgument_list(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitArgument_list) {
             listener.exitArgument_list(this);
        }
    }
}


export class New_argContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public basic_type(): Basic_typeContext | null {
        return this.getRuleContext(0, Basic_typeContext);
    }
    public optional_star(): Optional_starContext | null {
        return this.getRuleContext(0, Optional_starContext);
    }
    public new_local_name(): New_local_nameContext | null {
        return this.getRuleContext(0, New_local_nameContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_new_arg;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterNew_arg) {
             listener.enterNew_arg(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitNew_arg) {
             listener.exitNew_arg(this);
        }
    }
}


export class InheritanceContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Inherit(): antlr.TerminalNode {
        return this.getToken(LPCParser.Inherit, 0)!;
    }
    public string_con1(): String_con1Context {
        return this.getRuleContext(0, String_con1Context)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_inheritance;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterInheritance) {
             listener.enterInheritance(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitInheritance) {
             listener.exitInheritance(this);
        }
    }
}


export class Data_typeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public type_modifier_list(): Type_modifier_listContext {
        return this.getRuleContext(0, Type_modifier_listContext)!;
    }
    public opt_basic_type(): Opt_basic_typeContext {
        return this.getRuleContext(0, Opt_basic_typeContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_data_type;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterData_type) {
             listener.enterData_type(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitData_type) {
             listener.exitData_type(this);
        }
    }
}


export class Opt_basic_typeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public basic_type(): Basic_typeContext | null {
        return this.getRuleContext(0, Basic_typeContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_opt_basic_type;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterOpt_basic_type) {
             listener.enterOpt_basic_type(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitOpt_basic_type) {
             listener.exitOpt_basic_type(this);
        }
    }
}


export class Optional_starContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_optional_star;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterOptional_star) {
             listener.enterOptional_star(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitOptional_star) {
             listener.exitOptional_star(this);
        }
    }
}


export class IdentifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DefinedName(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DefinedName, 0);
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_identifier;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterIdentifier) {
             listener.enterIdentifier(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitIdentifier) {
             listener.exitIdentifier(this);
        }
    }
}

// Generated from grammar/LPC.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";


export class LPCLexer extends antlr.Lexer {
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

    public static readonly channelNames = [
        "DEFAULT_TOKEN_CHANNEL", "HIDDEN"
    ];

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

    public static readonly modeNames = [
        "DEFAULT_MODE",
    ];

    public static readonly ruleNames = [
        "T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", 
        "T__8", "T__9", "T__10", "T__11", "T__12", "T__13", "T__14", "T__15", 
        "T__16", "TypeModifier", "Assign", "PlusPlus", "MinusMinus", "And", 
        "AndAnd", "Caret", "Or", "OrOr", "Equal", "LeftShift", "RightShift", 
        "RightShift3", "Not", "NotEqual", "Compare", "LessEqual", "Great", 
        "GreatEqual", "Arrow", "BasicType", "Break", "Catch", "Colon", "ColonColon", 
        "Continue", "DefinedName", "Efun", "Ellipsis", "Else", "If", "Inherit", 
        "Return", "For", "Foreach", "In", "Switch", "Case", "While", "Do", 
        "Default", "New", "ParseCommand", "Question", "Range", "SScanf", 
        "MappingOpen", "ArrayOpen", "FunctionOpen", "Number", "Parameter", 
        "Real", "FractionalConstant", "DigitSequence", "Identifier", "IdentifierNondigit", 
        "Nondigit", "Digit", "IntegerConstant", "BinaryConstant", "DecimalConstant", 
        "OctalConstant", "HexadecimalConstant", "HexadecimalPrefix", "NonzeroDigit", 
        "OctalDigit", "HexadecimalDigit", "IntegerSuffix", "UnsignedSuffix", 
        "LongSuffix", "LongLongSuffix", "FileInclude", "Include", "String", 
        "StringPrefix", "CharacterConstant", "SCharSequence", "SChar", "SingleChar", 
        "EscapeSequence", "UniversalCharacterName", "HexQuad", "HexadecimalEscapeSequence", 
        "OctalEscapeSequence", "SimpleEscapeSequence", "TimeExpression", 
        "BlockComment", "LineComment", "Whitespace", "Newline", "DefineStart", 
        "DefineBlock", "MultiDefine", "MultiDefineBody",
    ];


    public constructor(input: antlr.CharStream) {
        super(input);
        this.interpreter = new antlr.LexerATNSimulator(this, LPCLexer._ATN, LPCLexer.decisionsToDFA, new antlr.PredictionContextCache());
    }

    public get grammarFileName(): string { return "LPC.g4"; }

    public get literalNames(): (string | null)[] { return LPCLexer.literalNames; }
    public get symbolicNames(): (string | null)[] { return LPCLexer.symbolicNames; }
    public get ruleNames(): string[] { return LPCLexer.ruleNames; }

    public get serializedATN(): number[] { return LPCLexer._serializedATN; }

    public get channelNames(): string[] { return LPCLexer.channelNames; }

    public get modeNames(): string[] { return LPCLexer.modeNames; }

    public override sempred(localContext: antlr.RuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 65:
            return this.FunctionOpen_sempred(localContext, predIndex);
        case 69:
            return this.FractionalConstant_sempred(localContext, predIndex);
        }
        return true;
    }
    private FunctionOpen_sempred(localContext: antlr.RuleContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return String.fromCharCode(this.inputStream.LA(1)) != ':';            
        }
        return true;
    }
    private FractionalConstant_sempred(localContext: antlr.RuleContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 1:
            return String.fromCharCode(this._input.LA(1)) != '.';
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,0,84,970,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,
        2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,
        13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,
        19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,
        26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,
        32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,
        39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,
        45,2,46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,
        52,7,52,2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,
        58,2,59,7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,
        65,7,65,2,66,7,66,2,67,7,67,2,68,7,68,2,69,7,69,2,70,7,70,2,71,7,
        71,2,72,7,72,2,73,7,73,2,74,7,74,2,75,7,75,2,76,7,76,2,77,7,77,2,
        78,7,78,2,79,7,79,2,80,7,80,2,81,7,81,2,82,7,82,2,83,7,83,2,84,7,
        84,2,85,7,85,2,86,7,86,2,87,7,87,2,88,7,88,2,89,7,89,2,90,7,90,2,
        91,7,91,2,92,7,92,2,93,7,93,2,94,7,94,2,95,7,95,2,96,7,96,2,97,7,
        97,2,98,7,98,2,99,7,99,2,100,7,100,2,101,7,101,2,102,7,102,2,103,
        7,103,2,104,7,104,2,105,7,105,2,106,7,106,2,107,7,107,2,108,7,108,
        2,109,7,109,2,110,7,110,1,0,1,0,1,1,1,1,1,2,1,2,1,3,1,3,1,4,1,4,
        1,5,1,5,1,6,1,6,1,7,1,7,1,8,1,8,1,9,1,9,1,10,1,10,1,11,1,11,1,12,
        1,12,1,13,1,13,1,14,1,14,1,15,1,15,1,16,1,16,1,17,1,17,1,17,1,17,
        1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,
        1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,
        1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,
        1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,
        1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,3,17,322,8,17,1,18,1,18,
        1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,
        1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,3,18,347,8,18,1,19,1,19,
        1,19,1,20,1,20,1,20,1,21,1,21,1,22,1,22,1,22,1,23,1,23,1,24,1,24,
        1,25,1,25,1,25,1,26,1,26,1,26,1,27,1,27,1,27,1,28,1,28,1,28,1,29,
        1,29,1,29,1,29,1,30,1,30,1,31,1,31,1,31,1,32,1,32,1,32,3,32,388,
        8,32,1,33,1,33,1,33,1,34,1,34,1,35,1,35,1,35,1,36,1,36,1,36,1,37,
        1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,
        1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,
        1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,
        1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,
        1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,
        1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,3,37,476,8,37,1,38,
        1,38,1,38,1,38,1,38,1,38,1,39,1,39,1,39,1,39,1,39,1,39,1,40,1,40,
        1,41,1,41,1,41,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,43,
        1,43,1,43,1,43,1,44,1,44,1,44,1,44,1,44,1,45,1,45,1,45,1,45,1,46,
        1,46,1,46,1,46,1,46,1,47,1,47,1,47,1,48,1,48,1,48,1,48,1,48,1,48,
        1,48,1,48,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,50,1,50,1,50,1,50,
        1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,52,1,52,1,52,1,53,1,53,
        1,53,1,53,1,53,1,53,1,53,1,54,1,54,1,54,1,54,1,54,1,55,1,55,1,55,
        1,55,1,55,1,55,1,56,1,56,1,56,1,57,1,57,1,57,1,57,1,57,1,57,1,57,
        1,57,1,58,1,58,1,58,1,58,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,
        1,59,1,59,1,59,1,59,1,59,1,59,1,60,1,60,1,61,1,61,1,61,1,62,1,62,
        1,62,1,62,1,62,1,62,1,62,1,63,1,63,1,63,5,63,617,8,63,10,63,12,63,
        620,9,63,1,63,1,63,1,64,1,64,1,64,5,64,627,8,64,10,64,12,64,630,
        9,64,1,64,1,64,1,65,1,65,5,65,636,8,65,10,65,12,65,639,9,65,1,65,
        1,65,1,65,1,66,1,66,1,67,1,67,1,67,1,68,1,68,1,69,3,69,652,8,69,
        1,69,1,69,1,69,1,69,1,69,1,69,3,69,660,8,69,1,70,4,70,663,8,70,11,
        70,12,70,664,1,71,1,71,1,71,5,71,670,8,71,10,71,12,71,673,9,71,1,
        72,1,72,1,73,1,73,1,74,1,74,1,75,1,75,3,75,683,8,75,1,75,1,75,3,
        75,687,8,75,1,75,1,75,3,75,691,8,75,1,75,3,75,694,8,75,1,76,1,76,
        1,76,4,76,699,8,76,11,76,12,76,700,1,77,1,77,5,77,705,8,77,10,77,
        12,77,708,9,77,1,78,1,78,5,78,712,8,78,10,78,12,78,715,9,78,1,79,
        1,79,4,79,719,8,79,11,79,12,79,720,1,80,1,80,1,80,1,81,1,81,1,82,
        1,82,1,83,1,83,1,84,1,84,3,84,734,8,84,1,84,1,84,1,84,1,84,1,84,
        3,84,741,8,84,1,84,1,84,3,84,745,8,84,3,84,747,8,84,1,85,1,85,1,
        86,1,86,1,87,1,87,1,87,1,87,3,87,757,8,87,1,88,1,88,1,88,1,88,1,
        88,1,88,1,88,1,88,3,88,767,8,88,1,89,1,89,1,89,1,89,1,89,1,89,1,
        89,1,89,1,89,5,89,778,8,89,10,89,12,89,781,9,89,1,89,1,89,1,90,3,
        90,786,8,90,1,90,1,90,3,90,790,8,90,1,90,1,90,1,91,1,91,1,92,1,92,
        3,92,798,8,92,1,92,1,92,1,93,4,93,803,8,93,11,93,12,93,804,1,94,
        1,94,1,94,1,94,1,94,1,94,1,94,1,94,1,94,1,94,3,94,817,8,94,1,95,
        1,95,3,95,821,8,95,1,96,1,96,1,96,1,96,3,96,827,8,96,1,97,1,97,1,
        97,1,97,1,97,1,97,1,97,1,97,1,97,1,97,3,97,839,8,97,1,98,1,98,1,
        98,1,98,1,98,1,99,1,99,1,99,1,99,4,99,850,8,99,11,99,12,99,851,1,
        100,1,100,1,100,1,100,1,100,1,100,1,100,1,100,1,100,1,100,1,100,
        3,100,865,8,100,1,101,1,101,1,101,1,101,3,101,871,8,101,1,102,1,
        102,1,102,1,102,1,102,1,102,1,102,1,102,1,102,1,102,1,102,1,102,
        1,102,1,102,1,102,1,102,1,103,1,103,1,103,1,103,5,103,893,8,103,
        10,103,12,103,896,9,103,1,103,1,103,1,103,1,103,1,103,1,104,1,104,
        1,104,1,104,5,104,907,8,104,10,104,12,104,910,9,104,1,104,1,104,
        1,105,4,105,915,8,105,11,105,12,105,916,1,105,1,105,1,106,1,106,
        3,106,923,8,106,1,106,3,106,926,8,106,1,106,1,106,1,107,1,107,3,
        107,932,8,107,1,107,1,107,1,107,1,107,1,107,1,107,1,107,1,108,1,
        108,1,108,1,108,1,108,1,108,1,108,3,108,948,8,108,1,108,1,108,1,
        108,5,108,953,8,108,10,108,12,108,956,9,108,1,109,1,109,1,109,1,
        110,1,110,4,110,963,8,110,11,110,12,110,964,1,110,1,110,3,110,969,
        8,110,1,894,0,111,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,19,10,
        21,11,23,12,25,13,27,14,29,15,31,16,33,17,35,18,37,19,39,20,41,21,
        43,22,45,23,47,24,49,25,51,26,53,27,55,28,57,29,59,30,61,31,63,32,
        65,33,67,34,69,35,71,36,73,37,75,38,77,39,79,40,81,41,83,42,85,43,
        87,44,89,45,91,46,93,47,95,48,97,49,99,50,101,51,103,52,105,53,107,
        54,109,55,111,56,113,57,115,58,117,59,119,60,121,61,123,62,125,63,
        127,64,129,65,131,66,133,67,135,68,137,69,139,0,141,70,143,71,145,
        0,147,0,149,0,151,0,153,0,155,0,157,0,159,0,161,0,163,0,165,0,167,
        0,169,0,171,0,173,0,175,0,177,0,179,72,181,73,183,74,185,75,187,
        0,189,0,191,0,193,0,195,0,197,0,199,0,201,0,203,0,205,76,207,77,
        209,78,211,79,213,80,215,81,217,82,219,83,221,84,1,0,18,3,0,65,90,
        95,95,97,122,1,0,48,57,2,0,66,66,98,98,1,0,48,49,2,0,88,88,120,120,
        1,0,49,57,1,0,48,55,3,0,48,57,65,70,97,102,2,0,85,85,117,117,2,0,
        76,76,108,108,4,0,10,10,13,13,34,34,92,92,10,0,34,34,39,39,63,63,
        92,92,97,98,102,102,110,110,114,114,116,116,118,118,9,0,33,33,35,
        38,40,43,45,47,60,62,64,64,91,91,93,95,123,125,2,0,10,10,13,13,2,
        0,9,9,32,32,1,0,35,35,3,0,10,10,13,13,92,92,1,0,92,92,1034,0,1,1,
        0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,
        0,0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,0,0,0,0,19,1,0,0,0,0,21,1,0,0,
        0,0,23,1,0,0,0,0,25,1,0,0,0,0,27,1,0,0,0,0,29,1,0,0,0,0,31,1,0,0,
        0,0,33,1,0,0,0,0,35,1,0,0,0,0,37,1,0,0,0,0,39,1,0,0,0,0,41,1,0,0,
        0,0,43,1,0,0,0,0,45,1,0,0,0,0,47,1,0,0,0,0,49,1,0,0,0,0,51,1,0,0,
        0,0,53,1,0,0,0,0,55,1,0,0,0,0,57,1,0,0,0,0,59,1,0,0,0,0,61,1,0,0,
        0,0,63,1,0,0,0,0,65,1,0,0,0,0,67,1,0,0,0,0,69,1,0,0,0,0,71,1,0,0,
        0,0,73,1,0,0,0,0,75,1,0,0,0,0,77,1,0,0,0,0,79,1,0,0,0,0,81,1,0,0,
        0,0,83,1,0,0,0,0,85,1,0,0,0,0,87,1,0,0,0,0,89,1,0,0,0,0,91,1,0,0,
        0,0,93,1,0,0,0,0,95,1,0,0,0,0,97,1,0,0,0,0,99,1,0,0,0,0,101,1,0,
        0,0,0,103,1,0,0,0,0,105,1,0,0,0,0,107,1,0,0,0,0,109,1,0,0,0,0,111,
        1,0,0,0,0,113,1,0,0,0,0,115,1,0,0,0,0,117,1,0,0,0,0,119,1,0,0,0,
        0,121,1,0,0,0,0,123,1,0,0,0,0,125,1,0,0,0,0,127,1,0,0,0,0,129,1,
        0,0,0,0,131,1,0,0,0,0,133,1,0,0,0,0,135,1,0,0,0,0,137,1,0,0,0,0,
        141,1,0,0,0,0,143,1,0,0,0,0,179,1,0,0,0,0,181,1,0,0,0,0,183,1,0,
        0,0,0,185,1,0,0,0,0,205,1,0,0,0,0,207,1,0,0,0,0,209,1,0,0,0,0,211,
        1,0,0,0,0,213,1,0,0,0,0,215,1,0,0,0,0,217,1,0,0,0,0,219,1,0,0,0,
        0,221,1,0,0,0,1,223,1,0,0,0,3,225,1,0,0,0,5,227,1,0,0,0,7,229,1,
        0,0,0,9,231,1,0,0,0,11,233,1,0,0,0,13,235,1,0,0,0,15,237,1,0,0,0,
        17,239,1,0,0,0,19,241,1,0,0,0,21,243,1,0,0,0,23,245,1,0,0,0,25,247,
        1,0,0,0,27,249,1,0,0,0,29,251,1,0,0,0,31,253,1,0,0,0,33,255,1,0,
        0,0,35,321,1,0,0,0,37,346,1,0,0,0,39,348,1,0,0,0,41,351,1,0,0,0,
        43,354,1,0,0,0,45,356,1,0,0,0,47,359,1,0,0,0,49,361,1,0,0,0,51,363,
        1,0,0,0,53,366,1,0,0,0,55,369,1,0,0,0,57,372,1,0,0,0,59,375,1,0,
        0,0,61,379,1,0,0,0,63,381,1,0,0,0,65,387,1,0,0,0,67,389,1,0,0,0,
        69,392,1,0,0,0,71,394,1,0,0,0,73,397,1,0,0,0,75,475,1,0,0,0,77,477,
        1,0,0,0,79,483,1,0,0,0,81,489,1,0,0,0,83,491,1,0,0,0,85,494,1,0,
        0,0,87,503,1,0,0,0,89,507,1,0,0,0,91,512,1,0,0,0,93,516,1,0,0,0,
        95,521,1,0,0,0,97,524,1,0,0,0,99,532,1,0,0,0,101,539,1,0,0,0,103,
        543,1,0,0,0,105,551,1,0,0,0,107,554,1,0,0,0,109,561,1,0,0,0,111,
        566,1,0,0,0,113,572,1,0,0,0,115,575,1,0,0,0,117,583,1,0,0,0,119,
        587,1,0,0,0,121,601,1,0,0,0,123,603,1,0,0,0,125,606,1,0,0,0,127,
        613,1,0,0,0,129,623,1,0,0,0,131,633,1,0,0,0,133,643,1,0,0,0,135,
        645,1,0,0,0,137,648,1,0,0,0,139,659,1,0,0,0,141,662,1,0,0,0,143,
        666,1,0,0,0,145,674,1,0,0,0,147,676,1,0,0,0,149,678,1,0,0,0,151,
        693,1,0,0,0,153,695,1,0,0,0,155,702,1,0,0,0,157,709,1,0,0,0,159,
        716,1,0,0,0,161,722,1,0,0,0,163,725,1,0,0,0,165,727,1,0,0,0,167,
        729,1,0,0,0,169,746,1,0,0,0,171,748,1,0,0,0,173,750,1,0,0,0,175,
        756,1,0,0,0,177,766,1,0,0,0,179,768,1,0,0,0,181,785,1,0,0,0,183,
        793,1,0,0,0,185,795,1,0,0,0,187,802,1,0,0,0,189,816,1,0,0,0,191,
        820,1,0,0,0,193,826,1,0,0,0,195,838,1,0,0,0,197,840,1,0,0,0,199,
        845,1,0,0,0,201,864,1,0,0,0,203,870,1,0,0,0,205,872,1,0,0,0,207,
        888,1,0,0,0,209,902,1,0,0,0,211,914,1,0,0,0,213,925,1,0,0,0,215,
        929,1,0,0,0,217,940,1,0,0,0,219,957,1,0,0,0,221,968,1,0,0,0,223,
        224,5,59,0,0,224,2,1,0,0,0,225,226,5,35,0,0,226,4,1,0,0,0,227,228,
        5,40,0,0,228,6,1,0,0,0,229,230,5,41,0,0,230,8,1,0,0,0,231,232,5,
        123,0,0,232,10,1,0,0,0,233,234,5,125,0,0,234,12,1,0,0,0,235,236,
        5,44,0,0,236,14,1,0,0,0,237,238,5,60,0,0,238,16,1,0,0,0,239,240,
        5,42,0,0,240,18,1,0,0,0,241,242,5,37,0,0,242,20,1,0,0,0,243,244,
        5,47,0,0,244,22,1,0,0,0,245,246,5,43,0,0,246,24,1,0,0,0,247,248,
        5,45,0,0,248,26,1,0,0,0,249,250,5,126,0,0,250,28,1,0,0,0,251,252,
        5,36,0,0,252,30,1,0,0,0,253,254,5,91,0,0,254,32,1,0,0,0,255,256,
        5,93,0,0,256,34,1,0,0,0,257,258,5,110,0,0,258,259,5,111,0,0,259,
        260,5,109,0,0,260,261,5,97,0,0,261,262,5,115,0,0,262,322,5,107,0,
        0,263,264,5,112,0,0,264,265,5,114,0,0,265,266,5,105,0,0,266,267,
        5,118,0,0,267,268,5,97,0,0,268,269,5,116,0,0,269,322,5,101,0,0,270,
        271,5,112,0,0,271,272,5,114,0,0,272,273,5,111,0,0,273,274,5,116,
        0,0,274,275,5,101,0,0,275,276,5,99,0,0,276,277,5,116,0,0,277,278,
        5,101,0,0,278,322,5,100,0,0,279,280,5,112,0,0,280,281,5,117,0,0,
        281,282,5,98,0,0,282,283,5,108,0,0,283,284,5,105,0,0,284,322,5,99,
        0,0,285,286,5,115,0,0,286,287,5,116,0,0,287,288,5,97,0,0,288,289,
        5,116,0,0,289,290,5,105,0,0,290,322,5,99,0,0,291,292,5,118,0,0,292,
        293,5,97,0,0,293,294,5,114,0,0,294,295,5,97,0,0,295,296,5,114,0,
        0,296,297,5,103,0,0,297,322,5,115,0,0,298,299,5,110,0,0,299,300,
        5,111,0,0,300,301,5,115,0,0,301,302,5,97,0,0,302,303,5,118,0,0,303,
        322,5,101,0,0,304,305,5,118,0,0,305,306,5,105,0,0,306,307,5,114,
        0,0,307,308,5,116,0,0,308,309,5,117,0,0,309,310,5,97,0,0,310,322,
        5,108,0,0,311,312,5,100,0,0,312,313,5,101,0,0,313,314,5,112,0,0,
        314,315,5,114,0,0,315,316,5,101,0,0,316,317,5,99,0,0,317,318,5,97,
        0,0,318,319,5,116,0,0,319,320,5,101,0,0,320,322,5,100,0,0,321,257,
        1,0,0,0,321,263,1,0,0,0,321,270,1,0,0,0,321,279,1,0,0,0,321,285,
        1,0,0,0,321,291,1,0,0,0,321,298,1,0,0,0,321,304,1,0,0,0,321,311,
        1,0,0,0,322,36,1,0,0,0,323,347,5,61,0,0,324,325,5,43,0,0,325,347,
        5,61,0,0,326,327,5,45,0,0,327,347,5,61,0,0,328,329,5,38,0,0,329,
        347,5,61,0,0,330,331,5,124,0,0,331,347,5,61,0,0,332,333,5,94,0,0,
        333,347,5,61,0,0,334,335,5,60,0,0,335,336,5,60,0,0,336,347,5,61,
        0,0,337,338,5,62,0,0,338,339,5,62,0,0,339,347,5,61,0,0,340,341,5,
        42,0,0,341,347,5,61,0,0,342,343,5,37,0,0,343,347,5,61,0,0,344,345,
        5,47,0,0,345,347,5,61,0,0,346,323,1,0,0,0,346,324,1,0,0,0,346,326,
        1,0,0,0,346,328,1,0,0,0,346,330,1,0,0,0,346,332,1,0,0,0,346,334,
        1,0,0,0,346,337,1,0,0,0,346,340,1,0,0,0,346,342,1,0,0,0,346,344,
        1,0,0,0,347,38,1,0,0,0,348,349,5,43,0,0,349,350,5,43,0,0,350,40,
        1,0,0,0,351,352,5,45,0,0,352,353,5,45,0,0,353,42,1,0,0,0,354,355,
        5,38,0,0,355,44,1,0,0,0,356,357,5,38,0,0,357,358,5,38,0,0,358,46,
        1,0,0,0,359,360,5,94,0,0,360,48,1,0,0,0,361,362,5,124,0,0,362,50,
        1,0,0,0,363,364,5,124,0,0,364,365,5,124,0,0,365,52,1,0,0,0,366,367,
        5,61,0,0,367,368,5,61,0,0,368,54,1,0,0,0,369,370,5,60,0,0,370,371,
        5,60,0,0,371,56,1,0,0,0,372,373,5,62,0,0,373,374,5,62,0,0,374,58,
        1,0,0,0,375,376,5,62,0,0,376,377,5,62,0,0,377,378,5,62,0,0,378,60,
        1,0,0,0,379,380,5,33,0,0,380,62,1,0,0,0,381,382,5,33,0,0,382,383,
        5,61,0,0,383,64,1,0,0,0,384,388,3,67,33,0,385,388,3,69,34,0,386,
        388,3,71,35,0,387,384,1,0,0,0,387,385,1,0,0,0,387,386,1,0,0,0,388,
        66,1,0,0,0,389,390,5,60,0,0,390,391,5,61,0,0,391,68,1,0,0,0,392,
        393,5,62,0,0,393,70,1,0,0,0,394,395,5,62,0,0,395,396,5,61,0,0,396,
        72,1,0,0,0,397,398,5,45,0,0,398,399,5,62,0,0,399,74,1,0,0,0,400,
        401,5,102,0,0,401,402,5,108,0,0,402,403,5,111,0,0,403,404,5,97,0,
        0,404,476,5,116,0,0,405,406,5,105,0,0,406,407,5,110,0,0,407,476,
        5,116,0,0,408,409,5,109,0,0,409,410,5,97,0,0,410,411,5,112,0,0,411,
        412,5,112,0,0,412,413,5,105,0,0,413,414,5,110,0,0,414,476,5,103,
        0,0,415,416,5,109,0,0,416,417,5,105,0,0,417,418,5,120,0,0,418,419,
        5,101,0,0,419,476,5,100,0,0,420,421,5,111,0,0,421,422,5,98,0,0,422,
        423,5,106,0,0,423,424,5,101,0,0,424,425,5,99,0,0,425,476,5,116,0,
        0,426,427,5,115,0,0,427,428,5,116,0,0,428,429,5,97,0,0,429,430,5,
        116,0,0,430,431,5,117,0,0,431,476,5,115,0,0,432,433,5,115,0,0,433,
        434,5,116,0,0,434,435,5,114,0,0,435,436,5,105,0,0,436,437,5,110,
        0,0,437,476,5,103,0,0,438,439,5,115,0,0,439,440,5,116,0,0,440,441,
        5,114,0,0,441,442,5,117,0,0,442,443,5,99,0,0,443,476,5,116,0,0,444,
        445,5,118,0,0,445,446,5,111,0,0,446,447,5,105,0,0,447,476,5,100,
        0,0,448,449,5,97,0,0,449,450,5,114,0,0,450,451,5,114,0,0,451,452,
        5,97,0,0,452,476,5,121,0,0,453,454,5,115,0,0,454,455,5,121,0,0,455,
        456,5,109,0,0,456,457,5,98,0,0,457,458,5,111,0,0,458,476,5,108,0,
        0,459,460,5,117,0,0,460,461,5,110,0,0,461,462,5,105,0,0,462,463,
        5,111,0,0,463,476,5,110,0,0,464,465,5,110,0,0,465,466,5,117,0,0,
        466,467,5,108,0,0,467,476,5,108,0,0,468,469,5,99,0,0,469,470,5,108,
        0,0,470,471,5,111,0,0,471,472,5,115,0,0,472,473,5,117,0,0,473,474,
        5,114,0,0,474,476,5,101,0,0,475,400,1,0,0,0,475,405,1,0,0,0,475,
        408,1,0,0,0,475,415,1,0,0,0,475,420,1,0,0,0,475,426,1,0,0,0,475,
        432,1,0,0,0,475,438,1,0,0,0,475,444,1,0,0,0,475,448,1,0,0,0,475,
        453,1,0,0,0,475,459,1,0,0,0,475,464,1,0,0,0,475,468,1,0,0,0,476,
        76,1,0,0,0,477,478,5,98,0,0,478,479,5,114,0,0,479,480,5,101,0,0,
        480,481,5,97,0,0,481,482,5,107,0,0,482,78,1,0,0,0,483,484,5,99,0,
        0,484,485,5,97,0,0,485,486,5,116,0,0,486,487,5,99,0,0,487,488,5,
        104,0,0,488,80,1,0,0,0,489,490,5,58,0,0,490,82,1,0,0,0,491,492,5,
        58,0,0,492,493,5,58,0,0,493,84,1,0,0,0,494,495,5,99,0,0,495,496,
        5,111,0,0,496,497,5,110,0,0,497,498,5,116,0,0,498,499,5,105,0,0,
        499,500,5,110,0,0,500,501,5,117,0,0,501,502,5,101,0,0,502,86,1,0,
        0,0,503,504,5,102,0,0,504,505,5,111,0,0,505,506,5,111,0,0,506,88,
        1,0,0,0,507,508,5,101,0,0,508,509,5,102,0,0,509,510,5,117,0,0,510,
        511,5,110,0,0,511,90,1,0,0,0,512,513,5,46,0,0,513,514,5,46,0,0,514,
        515,5,46,0,0,515,92,1,0,0,0,516,517,5,101,0,0,517,518,5,108,0,0,
        518,519,5,115,0,0,519,520,5,101,0,0,520,94,1,0,0,0,521,522,5,105,
        0,0,522,523,5,102,0,0,523,96,1,0,0,0,524,525,5,105,0,0,525,526,5,
        110,0,0,526,527,5,104,0,0,527,528,5,101,0,0,528,529,5,114,0,0,529,
        530,5,105,0,0,530,531,5,116,0,0,531,98,1,0,0,0,532,533,5,114,0,0,
        533,534,5,101,0,0,534,535,5,116,0,0,535,536,5,117,0,0,536,537,5,
        114,0,0,537,538,5,110,0,0,538,100,1,0,0,0,539,540,5,102,0,0,540,
        541,5,111,0,0,541,542,5,114,0,0,542,102,1,0,0,0,543,544,5,102,0,
        0,544,545,5,111,0,0,545,546,5,114,0,0,546,547,5,101,0,0,547,548,
        5,97,0,0,548,549,5,99,0,0,549,550,5,104,0,0,550,104,1,0,0,0,551,
        552,5,105,0,0,552,553,5,110,0,0,553,106,1,0,0,0,554,555,5,115,0,
        0,555,556,5,119,0,0,556,557,5,105,0,0,557,558,5,116,0,0,558,559,
        5,99,0,0,559,560,5,104,0,0,560,108,1,0,0,0,561,562,5,99,0,0,562,
        563,5,97,0,0,563,564,5,115,0,0,564,565,5,101,0,0,565,110,1,0,0,0,
        566,567,5,119,0,0,567,568,5,104,0,0,568,569,5,105,0,0,569,570,5,
        108,0,0,570,571,5,101,0,0,571,112,1,0,0,0,572,573,5,100,0,0,573,
        574,5,111,0,0,574,114,1,0,0,0,575,576,5,100,0,0,576,577,5,101,0,
        0,577,578,5,102,0,0,578,579,5,97,0,0,579,580,5,117,0,0,580,581,5,
        108,0,0,581,582,5,116,0,0,582,116,1,0,0,0,583,584,5,110,0,0,584,
        585,5,101,0,0,585,586,5,119,0,0,586,118,1,0,0,0,587,588,5,112,0,
        0,588,589,5,97,0,0,589,590,5,114,0,0,590,591,5,115,0,0,591,592,5,
        101,0,0,592,593,5,95,0,0,593,594,5,99,0,0,594,595,5,111,0,0,595,
        596,5,109,0,0,596,597,5,109,0,0,597,598,5,97,0,0,598,599,5,110,0,
        0,599,600,5,100,0,0,600,120,1,0,0,0,601,602,5,63,0,0,602,122,1,0,
        0,0,603,604,5,46,0,0,604,605,5,46,0,0,605,124,1,0,0,0,606,607,5,
        115,0,0,607,608,5,115,0,0,608,609,5,99,0,0,609,610,5,97,0,0,610,
        611,5,110,0,0,611,612,5,102,0,0,612,126,1,0,0,0,613,618,5,40,0,0,
        614,617,3,211,105,0,615,617,3,213,106,0,616,614,1,0,0,0,616,615,
        1,0,0,0,617,620,1,0,0,0,618,616,1,0,0,0,618,619,1,0,0,0,619,621,
        1,0,0,0,620,618,1,0,0,0,621,622,5,91,0,0,622,128,1,0,0,0,623,628,
        5,40,0,0,624,627,3,211,105,0,625,627,3,213,106,0,626,624,1,0,0,0,
        626,625,1,0,0,0,627,630,1,0,0,0,628,626,1,0,0,0,628,629,1,0,0,0,
        629,631,1,0,0,0,630,628,1,0,0,0,631,632,5,123,0,0,632,130,1,0,0,
        0,633,637,5,40,0,0,634,636,3,211,105,0,635,634,1,0,0,0,636,639,1,
        0,0,0,637,635,1,0,0,0,637,638,1,0,0,0,638,640,1,0,0,0,639,637,1,
        0,0,0,640,641,5,58,0,0,641,642,4,65,0,0,642,132,1,0,0,0,643,644,
        3,151,75,0,644,134,1,0,0,0,645,646,5,36,0,0,646,647,3,141,70,0,647,
        136,1,0,0,0,648,649,3,139,69,0,649,138,1,0,0,0,650,652,3,141,70,
        0,651,650,1,0,0,0,651,652,1,0,0,0,652,653,1,0,0,0,653,654,5,46,0,
        0,654,660,3,141,70,0,655,656,3,141,70,0,656,657,5,46,0,0,657,658,
        4,69,1,0,658,660,1,0,0,0,659,651,1,0,0,0,659,655,1,0,0,0,660,140,
        1,0,0,0,661,663,3,149,74,0,662,661,1,0,0,0,663,664,1,0,0,0,664,662,
        1,0,0,0,664,665,1,0,0,0,665,142,1,0,0,0,666,671,3,145,72,0,667,670,
        3,145,72,0,668,670,3,149,74,0,669,667,1,0,0,0,669,668,1,0,0,0,670,
        673,1,0,0,0,671,669,1,0,0,0,671,672,1,0,0,0,672,144,1,0,0,0,673,
        671,1,0,0,0,674,675,3,147,73,0,675,146,1,0,0,0,676,677,7,0,0,0,677,
        148,1,0,0,0,678,679,7,1,0,0,679,150,1,0,0,0,680,682,3,155,77,0,681,
        683,3,169,84,0,682,681,1,0,0,0,682,683,1,0,0,0,683,694,1,0,0,0,684,
        686,3,157,78,0,685,687,3,169,84,0,686,685,1,0,0,0,686,687,1,0,0,
        0,687,694,1,0,0,0,688,690,3,159,79,0,689,691,3,169,84,0,690,689,
        1,0,0,0,690,691,1,0,0,0,691,694,1,0,0,0,692,694,3,153,76,0,693,680,
        1,0,0,0,693,684,1,0,0,0,693,688,1,0,0,0,693,692,1,0,0,0,694,152,
        1,0,0,0,695,696,5,48,0,0,696,698,7,2,0,0,697,699,7,3,0,0,698,697,
        1,0,0,0,699,700,1,0,0,0,700,698,1,0,0,0,700,701,1,0,0,0,701,154,
        1,0,0,0,702,706,3,163,81,0,703,705,3,149,74,0,704,703,1,0,0,0,705,
        708,1,0,0,0,706,704,1,0,0,0,706,707,1,0,0,0,707,156,1,0,0,0,708,
        706,1,0,0,0,709,713,5,48,0,0,710,712,3,165,82,0,711,710,1,0,0,0,
        712,715,1,0,0,0,713,711,1,0,0,0,713,714,1,0,0,0,714,158,1,0,0,0,
        715,713,1,0,0,0,716,718,3,161,80,0,717,719,3,167,83,0,718,717,1,
        0,0,0,719,720,1,0,0,0,720,718,1,0,0,0,720,721,1,0,0,0,721,160,1,
        0,0,0,722,723,5,48,0,0,723,724,7,4,0,0,724,162,1,0,0,0,725,726,7,
        5,0,0,726,164,1,0,0,0,727,728,7,6,0,0,728,166,1,0,0,0,729,730,7,
        7,0,0,730,168,1,0,0,0,731,733,3,171,85,0,732,734,3,173,86,0,733,
        732,1,0,0,0,733,734,1,0,0,0,734,747,1,0,0,0,735,736,3,171,85,0,736,
        737,3,175,87,0,737,747,1,0,0,0,738,740,3,173,86,0,739,741,3,171,
        85,0,740,739,1,0,0,0,740,741,1,0,0,0,741,747,1,0,0,0,742,744,3,175,
        87,0,743,745,3,171,85,0,744,743,1,0,0,0,744,745,1,0,0,0,745,747,
        1,0,0,0,746,731,1,0,0,0,746,735,1,0,0,0,746,738,1,0,0,0,746,742,
        1,0,0,0,747,170,1,0,0,0,748,749,7,8,0,0,749,172,1,0,0,0,750,751,
        7,9,0,0,751,174,1,0,0,0,752,753,5,108,0,0,753,757,5,108,0,0,754,
        755,5,76,0,0,755,757,5,76,0,0,756,752,1,0,0,0,756,754,1,0,0,0,757,
        176,1,0,0,0,758,759,5,60,0,0,759,760,3,187,93,0,760,761,5,62,0,0,
        761,767,1,0,0,0,762,763,5,34,0,0,763,764,3,187,93,0,764,765,5,34,
        0,0,765,767,1,0,0,0,766,758,1,0,0,0,766,762,1,0,0,0,767,178,1,0,
        0,0,768,769,5,105,0,0,769,770,5,110,0,0,770,771,5,99,0,0,771,772,
        5,108,0,0,772,773,5,117,0,0,773,774,5,100,0,0,774,775,5,101,0,0,
        775,779,1,0,0,0,776,778,3,211,105,0,777,776,1,0,0,0,778,781,1,0,
        0,0,779,777,1,0,0,0,779,780,1,0,0,0,780,782,1,0,0,0,781,779,1,0,
        0,0,782,783,3,177,88,0,783,180,1,0,0,0,784,786,3,183,91,0,785,784,
        1,0,0,0,785,786,1,0,0,0,786,787,1,0,0,0,787,789,5,34,0,0,788,790,
        3,187,93,0,789,788,1,0,0,0,789,790,1,0,0,0,790,791,1,0,0,0,791,792,
        5,34,0,0,792,182,1,0,0,0,793,794,5,64,0,0,794,184,1,0,0,0,795,797,
        5,39,0,0,796,798,3,191,95,0,797,796,1,0,0,0,797,798,1,0,0,0,798,
        799,1,0,0,0,799,800,5,39,0,0,800,186,1,0,0,0,801,803,3,189,94,0,
        802,801,1,0,0,0,803,804,1,0,0,0,804,802,1,0,0,0,804,805,1,0,0,0,
        805,188,1,0,0,0,806,817,8,10,0,0,807,817,3,193,96,0,808,809,5,92,
        0,0,809,817,5,10,0,0,810,811,5,92,0,0,811,812,5,13,0,0,812,817,5,
        10,0,0,813,817,5,10,0,0,814,815,5,13,0,0,815,817,5,10,0,0,816,806,
        1,0,0,0,816,807,1,0,0,0,816,808,1,0,0,0,816,810,1,0,0,0,816,813,
        1,0,0,0,816,814,1,0,0,0,817,190,1,0,0,0,818,821,5,34,0,0,819,821,
        3,189,94,0,820,818,1,0,0,0,820,819,1,0,0,0,821,192,1,0,0,0,822,827,
        3,203,101,0,823,827,3,201,100,0,824,827,3,199,99,0,825,827,3,195,
        97,0,826,822,1,0,0,0,826,823,1,0,0,0,826,824,1,0,0,0,826,825,1,0,
        0,0,827,194,1,0,0,0,828,829,5,92,0,0,829,830,5,117,0,0,830,831,1,
        0,0,0,831,839,3,197,98,0,832,833,5,92,0,0,833,834,5,85,0,0,834,835,
        1,0,0,0,835,836,3,197,98,0,836,837,3,197,98,0,837,839,1,0,0,0,838,
        828,1,0,0,0,838,832,1,0,0,0,839,196,1,0,0,0,840,841,3,167,83,0,841,
        842,3,167,83,0,842,843,3,167,83,0,843,844,3,167,83,0,844,198,1,0,
        0,0,845,846,5,92,0,0,846,847,5,120,0,0,847,849,1,0,0,0,848,850,3,
        167,83,0,849,848,1,0,0,0,850,851,1,0,0,0,851,849,1,0,0,0,851,852,
        1,0,0,0,852,200,1,0,0,0,853,854,5,92,0,0,854,865,3,165,82,0,855,
        856,5,92,0,0,856,857,3,165,82,0,857,858,3,165,82,0,858,865,1,0,0,
        0,859,860,5,92,0,0,860,861,3,165,82,0,861,862,3,165,82,0,862,863,
        3,165,82,0,863,865,1,0,0,0,864,853,1,0,0,0,864,855,1,0,0,0,864,859,
        1,0,0,0,865,202,1,0,0,0,866,867,5,92,0,0,867,871,7,11,0,0,868,869,
        5,92,0,0,869,871,7,12,0,0,870,866,1,0,0,0,870,868,1,0,0,0,871,204,
        1,0,0,0,872,873,5,116,0,0,873,874,5,105,0,0,874,875,5,109,0,0,875,
        876,5,101,0,0,876,877,5,95,0,0,877,878,5,101,0,0,878,879,5,120,0,
        0,879,880,5,112,0,0,880,881,5,114,0,0,881,882,5,101,0,0,882,883,
        5,115,0,0,883,884,5,115,0,0,884,885,5,105,0,0,885,886,5,111,0,0,
        886,887,5,110,0,0,887,206,1,0,0,0,888,889,5,47,0,0,889,890,5,42,
        0,0,890,894,1,0,0,0,891,893,9,0,0,0,892,891,1,0,0,0,893,896,1,0,
        0,0,894,895,1,0,0,0,894,892,1,0,0,0,895,897,1,0,0,0,896,894,1,0,
        0,0,897,898,5,42,0,0,898,899,5,47,0,0,899,900,1,0,0,0,900,901,6,
        103,0,0,901,208,1,0,0,0,902,903,5,47,0,0,903,904,5,47,0,0,904,908,
        1,0,0,0,905,907,8,13,0,0,906,905,1,0,0,0,907,910,1,0,0,0,908,906,
        1,0,0,0,908,909,1,0,0,0,909,911,1,0,0,0,910,908,1,0,0,0,911,912,
        6,104,0,0,912,210,1,0,0,0,913,915,7,14,0,0,914,913,1,0,0,0,915,916,
        1,0,0,0,916,914,1,0,0,0,916,917,1,0,0,0,917,918,1,0,0,0,918,919,
        6,105,0,0,919,212,1,0,0,0,920,922,5,13,0,0,921,923,5,10,0,0,922,
        921,1,0,0,0,922,923,1,0,0,0,923,926,1,0,0,0,924,926,5,10,0,0,925,
        920,1,0,0,0,925,924,1,0,0,0,926,927,1,0,0,0,927,928,6,106,0,0,928,
        214,1,0,0,0,929,931,5,35,0,0,930,932,3,211,105,0,931,930,1,0,0,0,
        931,932,1,0,0,0,932,933,1,0,0,0,933,934,5,100,0,0,934,935,5,101,
        0,0,935,936,5,102,0,0,936,937,5,105,0,0,937,938,5,110,0,0,938,939,
        5,101,0,0,939,216,1,0,0,0,940,941,3,215,107,0,941,954,8,15,0,0,942,
        953,8,16,0,0,943,944,5,92,0,0,944,945,5,92,0,0,945,947,1,0,0,0,946,
        948,5,13,0,0,947,946,1,0,0,0,947,948,1,0,0,0,948,949,1,0,0,0,949,
        953,5,10,0,0,950,951,5,92,0,0,951,953,9,0,0,0,952,942,1,0,0,0,952,
        943,1,0,0,0,952,950,1,0,0,0,953,956,1,0,0,0,954,952,1,0,0,0,954,
        955,1,0,0,0,955,218,1,0,0,0,956,954,1,0,0,0,957,958,3,215,107,0,
        958,959,3,221,110,0,959,220,1,0,0,0,960,962,7,17,0,0,961,963,7,13,
        0,0,962,961,1,0,0,0,963,964,1,0,0,0,964,962,1,0,0,0,964,965,1,0,
        0,0,965,966,1,0,0,0,966,969,3,221,110,0,967,969,8,13,0,0,968,960,
        1,0,0,0,968,967,1,0,0,0,969,222,1,0,0,0,52,0,321,346,387,475,616,
        618,626,628,637,651,659,664,669,671,682,686,690,693,700,706,713,
        720,733,740,744,746,756,766,779,785,789,797,804,816,820,826,838,
        851,864,870,894,908,916,922,925,931,947,952,954,964,968,1,6,0,0
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!LPCLexer.__ATN) {
            LPCLexer.__ATN = new antlr.ATNDeserializer().deserialize(LPCLexer._serializedATN);
        }

        return LPCLexer.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(LPCLexer.literalNames, LPCLexer.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return LPCLexer.vocabulary;
    }

    private static readonly decisionsToDFA = LPCLexer._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}
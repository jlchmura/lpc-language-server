// Generated from grammar/LPCPreprocessorLexer.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";


export class LPCPreprocessorLexer extends antlr.Lexer {
    public static readonly SHARP = 1;
    public static readonly CODE = 2;
    public static readonly INCLUDE = 3;
    public static readonly PRAGMA = 4;
    public static readonly DEFINE = 5;
    public static readonly DEFINED = 6;
    public static readonly IF = 7;
    public static readonly ELIF = 8;
    public static readonly ELSE = 9;
    public static readonly UNDEF = 10;
    public static readonly IFDEF = 11;
    public static readonly IFNDEF = 12;
    public static readonly ENDIF = 13;
    public static readonly TRUE = 14;
    public static readonly FALSE = 15;
    public static readonly BANG = 16;
    public static readonly LPAREN = 17;
    public static readonly RPAREN = 18;
    public static readonly EQUAL = 19;
    public static readonly NOTEQUAL = 20;
    public static readonly AND = 21;
    public static readonly OR = 22;
    public static readonly LT = 23;
    public static readonly GT = 24;
    public static readonly LE = 25;
    public static readonly GE = 26;
    public static readonly DIRECTIVE_WHITESPACES = 27;
    public static readonly DIRECTIVE_STRING = 28;
    public static readonly CONDITIONAL_SYMBOL = 29;
    public static readonly DECIMAL_LITERAL = 30;
    public static readonly FLOAT = 31;
    public static readonly NEW_LINE = 32;
    public static readonly DIRECITVE_COMMENT = 33;
    public static readonly DIRECITVE_LINE_COMMENT = 34;
    public static readonly DIRECITVE_NEW_LINE = 35;
    public static readonly DIRECITVE_TEXT_NEW_LINE = 36;
    public static readonly TEXT = 37;
    public static readonly SLASH = 38;
    public static readonly DIRECTIVE_MODE = 1;
    public static readonly DIRECTIVE_DEFINE = 2;
    public static readonly DIRECTIVE_TEXT = 3;

    public static readonly channelNames = [
        "DEFAULT_TOKEN_CHANNEL", "HIDDEN", "COMMENTS_CHANNEL"
    ];

    public static readonly literalNames = [
        null, "'#'", null, null, "'pragma'", null, "'defined'", "'if'", 
        "'elif'", "'else'", "'undef'", "'ifdef'", "'ifndef'", "'endif'", 
        null, null, "'!'", "'('", "')'", "'=='", "'!='", "'&&'", "'||'", 
        "'<'", "'>'", "'<='", "'>='"
    ];

    public static readonly symbolicNames = [
        null, "SHARP", "CODE", "INCLUDE", "PRAGMA", "DEFINE", "DEFINED", 
        "IF", "ELIF", "ELSE", "UNDEF", "IFDEF", "IFNDEF", "ENDIF", "TRUE", 
        "FALSE", "BANG", "LPAREN", "RPAREN", "EQUAL", "NOTEQUAL", "AND", 
        "OR", "LT", "GT", "LE", "GE", "DIRECTIVE_WHITESPACES", "DIRECTIVE_STRING", 
        "CONDITIONAL_SYMBOL", "DECIMAL_LITERAL", "FLOAT", "NEW_LINE", "DIRECITVE_COMMENT", 
        "DIRECITVE_LINE_COMMENT", "DIRECITVE_NEW_LINE", "DIRECITVE_TEXT_NEW_LINE", 
        "TEXT", "SLASH"
    ];

    public static readonly modeNames = [
        "DEFAULT_MODE", "DIRECTIVE_MODE", "DIRECTIVE_DEFINE", "DIRECTIVE_TEXT",
    ];

    public static readonly ruleNames = [
        "SHARP", "COMMENT", "LINE_COMMENT", "SLASH", "CHARACTER_LITERAL", 
        "QUOTE_STRING", "STRING", "CODE", "INCLUDE", "PRAGMA", "DEFINE", 
        "DEFINED", "IF", "ELIF", "ELSE", "UNDEF", "IFDEF", "IFNDEF", "ENDIF", 
        "TRUE", "FALSE", "BANG", "LPAREN", "RPAREN", "EQUAL", "NOTEQUAL", 
        "AND", "OR", "LT", "GT", "LE", "GE", "DIRECTIVE_WHITESPACES", "DIRECTIVE_STRING", 
        "CONDITIONAL_SYMBOL", "DECIMAL_LITERAL", "FLOAT", "NEW_LINE", "DIRECITVE_COMMENT", 
        "DIRECITVE_LINE_COMMENT", "DIRECITVE_NEW_LINE", "DIRECTIVE_DEFINE_CONDITIONAL_SYMBOL", 
        "DIRECITVE_TEXT_NEW_LINE", "BACK_SLASH_ESCAPE", "TEXT_NEW_LINE", 
        "DIRECTIVE_COMMENT", "DIRECTIVE_LINE_COMMENT", "DIRECTIVE_SLASH", 
        "TEXT", "EscapeSequence", "OctalEscape", "UnicodeEscape", "HexDigit", 
        "StringFragment", "LETTER", "A", "B", "C", "D", "E", "F", "G", "H", 
        "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", 
        "V", "W", "X", "Y", "Z",
    ];


    public constructor(input: antlr.CharStream) {
        super(input);
        this.interpreter = new antlr.LexerATNSimulator(this, LPCPreprocessorLexer._ATN, LPCPreprocessorLexer.decisionsToDFA, new antlr.PredictionContextCache());
    }

    public get grammarFileName(): string { return "LPCPreprocessorLexer.g4"; }

    public get literalNames(): (string | null)[] { return LPCPreprocessorLexer.literalNames; }
    public get symbolicNames(): (string | null)[] { return LPCPreprocessorLexer.symbolicNames; }
    public get ruleNames(): string[] { return LPCPreprocessorLexer.ruleNames; }

    public get serializedATN(): number[] { return LPCPreprocessorLexer._serializedATN; }

    public get channelNames(): string[] { return LPCPreprocessorLexer.channelNames; }

    public get modeNames(): string[] { return LPCPreprocessorLexer.modeNames; }

    public static readonly _serializedATN: number[] = [
        4,0,38,609,6,-1,6,-1,6,-1,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,
        4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,
        2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,
        7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,
        2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,
        7,31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,
        2,38,7,38,2,39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,
        7,44,2,45,7,45,2,46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,
        2,51,7,51,2,52,7,52,2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,
        7,57,2,58,7,58,2,59,7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,
        2,64,7,64,2,65,7,65,2,66,7,66,2,67,7,67,2,68,7,68,2,69,7,69,2,70,
        7,70,2,71,7,71,2,72,7,72,2,73,7,73,2,74,7,74,2,75,7,75,2,76,7,76,
        2,77,7,77,2,78,7,78,2,79,7,79,2,80,7,80,1,0,1,0,1,0,1,0,1,1,1,1,
        1,1,1,1,5,1,175,8,1,10,1,12,1,178,9,1,1,1,1,1,1,1,1,1,1,1,1,2,1,
        2,1,2,1,2,5,2,189,8,2,10,2,12,2,192,9,2,1,2,1,2,1,3,1,3,1,3,1,3,
        1,4,1,4,1,4,3,4,203,8,4,1,4,1,4,1,4,1,4,1,5,1,5,1,5,5,5,212,8,5,
        10,5,12,5,215,9,5,1,5,1,5,1,5,1,5,1,6,1,6,1,6,1,6,1,7,4,7,226,8,
        7,11,7,12,7,227,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,4,8,239,8,8,
        11,8,12,8,240,1,8,1,8,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,10,1,
        10,1,10,1,10,1,10,1,10,1,10,1,10,4,10,262,8,10,11,10,12,10,263,1,
        10,1,10,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,12,1,12,1,12,1,
        13,1,13,1,13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,15,1,15,1,15,1,
        15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,16,1,17,1,17,1,17,1,17,1,
        17,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,18,1,19,1,19,1,19,1,19,1,
        19,1,20,1,20,1,20,1,20,1,20,1,20,1,21,1,21,1,22,1,22,1,23,1,23,1,
        24,1,24,1,24,1,25,1,25,1,25,1,26,1,26,1,26,1,27,1,27,1,27,1,28,1,
        28,1,29,1,29,1,30,1,30,1,30,1,31,1,31,1,31,1,32,4,32,354,8,32,11,
        32,12,32,355,1,32,1,32,1,33,1,33,1,34,1,34,1,34,5,34,365,8,34,10,
        34,12,34,368,9,34,1,35,4,35,371,8,35,11,35,12,35,372,1,36,4,36,376,
        8,36,11,36,12,36,377,1,36,1,36,5,36,382,8,36,10,36,12,36,385,9,36,
        1,36,1,36,4,36,389,8,36,11,36,12,36,390,3,36,393,8,36,1,37,3,37,
        396,8,37,1,37,1,37,1,37,1,37,1,38,1,38,1,38,1,38,5,38,406,8,38,10,
        38,12,38,409,9,38,1,38,1,38,1,38,1,38,1,38,1,39,1,39,1,39,1,39,5,
        39,420,8,39,10,39,12,39,423,9,39,1,39,1,39,1,40,1,40,3,40,429,8,
        40,1,40,1,40,1,40,1,40,1,41,1,41,1,41,5,41,438,8,41,10,41,12,41,
        441,9,41,1,41,1,41,1,41,5,41,446,8,41,10,41,12,41,449,9,41,1,41,
        3,41,452,8,41,1,41,1,41,1,41,1,42,1,42,3,42,459,8,42,1,42,1,42,1,
        42,1,42,1,43,1,43,1,43,1,43,1,43,1,44,3,44,471,8,44,1,44,1,44,1,
        44,1,44,1,44,1,45,1,45,1,45,1,45,5,45,482,8,45,10,45,12,45,485,9,
        45,1,45,1,45,1,45,1,45,1,45,1,45,1,46,1,46,1,46,1,46,5,46,497,8,
        46,10,46,12,46,500,9,46,1,46,1,46,1,46,1,47,1,47,1,47,1,47,1,48,
        4,48,510,8,48,11,48,12,48,511,1,49,1,49,1,49,1,49,3,49,518,8,49,
        1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,3,50,529,8,50,1,51,
        1,51,1,51,1,51,1,51,1,51,1,51,1,52,1,52,1,53,1,53,1,53,1,53,5,53,
        544,8,53,10,53,12,53,547,9,53,1,53,1,53,1,54,1,54,1,54,1,54,1,54,
        3,54,556,8,54,1,55,1,55,1,56,1,56,1,57,1,57,1,58,1,58,1,59,1,59,
        1,60,1,60,1,61,1,61,1,62,1,62,1,63,1,63,1,64,1,64,1,65,1,65,1,66,
        1,66,1,67,1,67,1,68,1,68,1,69,1,69,1,70,1,70,1,71,1,71,1,72,1,72,
        1,73,1,73,1,74,1,74,1,75,1,75,1,76,1,76,1,77,1,77,1,78,1,78,1,79,
        1,79,1,80,1,80,3,176,407,483,0,81,4,1,6,0,8,0,10,38,12,0,14,0,16,
        0,18,2,20,3,22,4,24,5,26,6,28,7,30,8,32,9,34,10,36,11,38,12,40,13,
        42,14,44,15,46,16,48,17,50,18,52,19,54,20,56,21,58,22,60,23,62,24,
        64,25,66,26,68,27,70,28,72,29,74,30,76,31,78,32,80,33,82,34,84,35,
        86,0,88,36,90,0,92,0,94,0,96,0,98,0,100,37,102,0,104,0,106,0,108,
        0,110,0,112,0,114,0,116,0,118,0,120,0,122,0,124,0,126,0,128,0,130,
        0,132,0,134,0,136,0,138,0,140,0,142,0,144,0,146,0,148,0,150,0,152,
        0,154,0,156,0,158,0,160,0,162,0,164,0,4,0,1,2,3,43,2,0,10,10,13,
        13,2,0,39,39,92,92,3,0,34,35,39,39,47,47,2,0,9,9,32,32,1,0,48,57,
        5,0,9,9,32,32,44,44,46,46,48,57,4,0,10,10,13,13,47,47,92,92,8,0,
        34,34,39,39,92,92,98,98,102,102,110,110,114,114,116,116,1,0,48,51,
        1,0,48,55,3,0,48,57,65,70,97,102,2,0,34,34,92,92,4,0,36,36,65,90,
        95,95,97,122,2,0,0,255,55296,56319,1,0,55296,56319,1,0,56320,57343,
        1,0,233,233,2,0,65,65,97,97,2,0,66,66,98,98,2,0,67,67,99,99,2,0,
        68,68,100,100,2,0,69,69,101,101,2,0,70,70,102,102,2,0,71,71,103,
        103,2,0,72,72,104,104,2,0,73,73,105,105,2,0,74,74,106,106,2,0,75,
        75,107,107,2,0,76,76,108,108,2,0,77,77,109,109,2,0,78,78,110,110,
        2,0,79,79,111,111,2,0,80,80,112,112,2,0,81,81,113,113,2,0,82,82,
        114,114,2,0,83,83,115,115,2,0,84,84,116,116,2,0,85,85,117,117,2,
        0,86,86,118,118,2,0,87,87,119,119,2,0,88,88,120,120,2,0,89,89,121,
        121,2,0,90,90,122,122,612,0,4,1,0,0,0,0,6,1,0,0,0,0,8,1,0,0,0,0,
        10,1,0,0,0,0,12,1,0,0,0,0,14,1,0,0,0,0,16,1,0,0,0,0,18,1,0,0,0,1,
        20,1,0,0,0,1,22,1,0,0,0,1,24,1,0,0,0,1,26,1,0,0,0,1,28,1,0,0,0,1,
        30,1,0,0,0,1,32,1,0,0,0,1,34,1,0,0,0,1,36,1,0,0,0,1,38,1,0,0,0,1,
        40,1,0,0,0,1,42,1,0,0,0,1,44,1,0,0,0,1,46,1,0,0,0,1,48,1,0,0,0,1,
        50,1,0,0,0,1,52,1,0,0,0,1,54,1,0,0,0,1,56,1,0,0,0,1,58,1,0,0,0,1,
        60,1,0,0,0,1,62,1,0,0,0,1,64,1,0,0,0,1,66,1,0,0,0,1,68,1,0,0,0,1,
        70,1,0,0,0,1,72,1,0,0,0,1,74,1,0,0,0,1,76,1,0,0,0,1,78,1,0,0,0,1,
        80,1,0,0,0,1,82,1,0,0,0,1,84,1,0,0,0,2,86,1,0,0,0,3,88,1,0,0,0,3,
        90,1,0,0,0,3,92,1,0,0,0,3,94,1,0,0,0,3,96,1,0,0,0,3,98,1,0,0,0,3,
        100,1,0,0,0,4,166,1,0,0,0,6,170,1,0,0,0,8,184,1,0,0,0,10,195,1,0,
        0,0,12,199,1,0,0,0,14,208,1,0,0,0,16,220,1,0,0,0,18,225,1,0,0,0,
        20,229,1,0,0,0,22,244,1,0,0,0,24,253,1,0,0,0,26,267,1,0,0,0,28,275,
        1,0,0,0,30,278,1,0,0,0,32,283,1,0,0,0,34,288,1,0,0,0,36,294,1,0,
        0,0,38,300,1,0,0,0,40,307,1,0,0,0,42,313,1,0,0,0,44,318,1,0,0,0,
        46,324,1,0,0,0,48,326,1,0,0,0,50,328,1,0,0,0,52,330,1,0,0,0,54,333,
        1,0,0,0,56,336,1,0,0,0,58,339,1,0,0,0,60,342,1,0,0,0,62,344,1,0,
        0,0,64,346,1,0,0,0,66,349,1,0,0,0,68,353,1,0,0,0,70,359,1,0,0,0,
        72,361,1,0,0,0,74,370,1,0,0,0,76,392,1,0,0,0,78,395,1,0,0,0,80,401,
        1,0,0,0,82,415,1,0,0,0,84,426,1,0,0,0,86,434,1,0,0,0,88,456,1,0,
        0,0,90,464,1,0,0,0,92,470,1,0,0,0,94,477,1,0,0,0,96,492,1,0,0,0,
        98,504,1,0,0,0,100,509,1,0,0,0,102,517,1,0,0,0,104,528,1,0,0,0,106,
        530,1,0,0,0,108,537,1,0,0,0,110,539,1,0,0,0,112,555,1,0,0,0,114,
        557,1,0,0,0,116,559,1,0,0,0,118,561,1,0,0,0,120,563,1,0,0,0,122,
        565,1,0,0,0,124,567,1,0,0,0,126,569,1,0,0,0,128,571,1,0,0,0,130,
        573,1,0,0,0,132,575,1,0,0,0,134,577,1,0,0,0,136,579,1,0,0,0,138,
        581,1,0,0,0,140,583,1,0,0,0,142,585,1,0,0,0,144,587,1,0,0,0,146,
        589,1,0,0,0,148,591,1,0,0,0,150,593,1,0,0,0,152,595,1,0,0,0,154,
        597,1,0,0,0,156,599,1,0,0,0,158,601,1,0,0,0,160,603,1,0,0,0,162,
        605,1,0,0,0,164,607,1,0,0,0,166,167,5,35,0,0,167,168,1,0,0,0,168,
        169,6,0,0,0,169,5,1,0,0,0,170,171,5,47,0,0,171,172,5,42,0,0,172,
        176,1,0,0,0,173,175,9,0,0,0,174,173,1,0,0,0,175,178,1,0,0,0,176,
        177,1,0,0,0,176,174,1,0,0,0,177,179,1,0,0,0,178,176,1,0,0,0,179,
        180,5,42,0,0,180,181,5,47,0,0,181,182,1,0,0,0,182,183,6,1,1,0,183,
        7,1,0,0,0,184,185,5,47,0,0,185,186,5,47,0,0,186,190,1,0,0,0,187,
        189,8,0,0,0,188,187,1,0,0,0,189,192,1,0,0,0,190,188,1,0,0,0,190,
        191,1,0,0,0,191,193,1,0,0,0,192,190,1,0,0,0,193,194,6,2,1,0,194,
        9,1,0,0,0,195,196,5,47,0,0,196,197,1,0,0,0,197,198,6,3,1,0,198,11,
        1,0,0,0,199,202,5,39,0,0,200,203,3,102,49,0,201,203,8,1,0,0,202,
        200,1,0,0,0,202,201,1,0,0,0,203,204,1,0,0,0,204,205,5,39,0,0,205,
        206,1,0,0,0,206,207,6,4,1,0,207,13,1,0,0,0,208,213,5,39,0,0,209,
        212,3,102,49,0,210,212,8,1,0,0,211,209,1,0,0,0,211,210,1,0,0,0,212,
        215,1,0,0,0,213,211,1,0,0,0,213,214,1,0,0,0,214,216,1,0,0,0,215,
        213,1,0,0,0,216,217,5,39,0,0,217,218,1,0,0,0,218,219,6,5,1,0,219,
        15,1,0,0,0,220,221,3,110,53,0,221,222,1,0,0,0,222,223,6,6,1,0,223,
        17,1,0,0,0,224,226,8,2,0,0,225,224,1,0,0,0,226,227,1,0,0,0,227,225,
        1,0,0,0,227,228,1,0,0,0,228,19,1,0,0,0,229,230,5,105,0,0,230,231,
        5,110,0,0,231,232,5,99,0,0,232,233,5,108,0,0,233,234,5,117,0,0,234,
        235,5,100,0,0,235,236,5,101,0,0,236,238,1,0,0,0,237,239,7,3,0,0,
        238,237,1,0,0,0,239,240,1,0,0,0,240,238,1,0,0,0,240,241,1,0,0,0,
        241,242,1,0,0,0,242,243,6,8,2,0,243,21,1,0,0,0,244,245,5,112,0,0,
        245,246,5,114,0,0,246,247,5,97,0,0,247,248,5,103,0,0,248,249,5,109,
        0,0,249,250,5,97,0,0,250,251,1,0,0,0,251,252,6,9,2,0,252,23,1,0,
        0,0,253,254,5,100,0,0,254,255,5,101,0,0,255,256,5,102,0,0,256,257,
        5,105,0,0,257,258,5,110,0,0,258,259,5,101,0,0,259,261,1,0,0,0,260,
        262,7,3,0,0,261,260,1,0,0,0,262,263,1,0,0,0,263,261,1,0,0,0,263,
        264,1,0,0,0,264,265,1,0,0,0,265,266,6,10,3,0,266,25,1,0,0,0,267,
        268,5,100,0,0,268,269,5,101,0,0,269,270,5,102,0,0,270,271,5,105,
        0,0,271,272,5,110,0,0,272,273,5,101,0,0,273,274,5,100,0,0,274,27,
        1,0,0,0,275,276,5,105,0,0,276,277,5,102,0,0,277,29,1,0,0,0,278,279,
        5,101,0,0,279,280,5,108,0,0,280,281,5,105,0,0,281,282,5,102,0,0,
        282,31,1,0,0,0,283,284,5,101,0,0,284,285,5,108,0,0,285,286,5,115,
        0,0,286,287,5,101,0,0,287,33,1,0,0,0,288,289,5,117,0,0,289,290,5,
        110,0,0,290,291,5,100,0,0,291,292,5,101,0,0,292,293,5,102,0,0,293,
        35,1,0,0,0,294,295,5,105,0,0,295,296,5,102,0,0,296,297,5,100,0,0,
        297,298,5,101,0,0,298,299,5,102,0,0,299,37,1,0,0,0,300,301,5,105,
        0,0,301,302,5,102,0,0,302,303,5,110,0,0,303,304,5,100,0,0,304,305,
        5,101,0,0,305,306,5,102,0,0,306,39,1,0,0,0,307,308,5,101,0,0,308,
        309,5,110,0,0,309,310,5,100,0,0,310,311,5,105,0,0,311,312,5,102,
        0,0,312,41,1,0,0,0,313,314,3,152,74,0,314,315,3,148,72,0,315,316,
        3,154,75,0,316,317,3,122,59,0,317,43,1,0,0,0,318,319,3,124,60,0,
        319,320,3,114,55,0,320,321,3,136,66,0,321,322,3,150,73,0,322,323,
        3,122,59,0,323,45,1,0,0,0,324,325,5,33,0,0,325,47,1,0,0,0,326,327,
        5,40,0,0,327,49,1,0,0,0,328,329,5,41,0,0,329,51,1,0,0,0,330,331,
        5,61,0,0,331,332,5,61,0,0,332,53,1,0,0,0,333,334,5,33,0,0,334,335,
        5,61,0,0,335,55,1,0,0,0,336,337,5,38,0,0,337,338,5,38,0,0,338,57,
        1,0,0,0,339,340,5,124,0,0,340,341,5,124,0,0,341,59,1,0,0,0,342,343,
        5,60,0,0,343,61,1,0,0,0,344,345,5,62,0,0,345,63,1,0,0,0,346,347,
        5,60,0,0,347,348,5,61,0,0,348,65,1,0,0,0,349,350,5,62,0,0,350,351,
        5,61,0,0,351,67,1,0,0,0,352,354,7,3,0,0,353,352,1,0,0,0,354,355,
        1,0,0,0,355,353,1,0,0,0,355,356,1,0,0,0,356,357,1,0,0,0,357,358,
        6,32,4,0,358,69,1,0,0,0,359,360,3,110,53,0,360,71,1,0,0,0,361,366,
        3,112,54,0,362,365,3,112,54,0,363,365,7,4,0,0,364,362,1,0,0,0,364,
        363,1,0,0,0,365,368,1,0,0,0,366,364,1,0,0,0,366,367,1,0,0,0,367,
        73,1,0,0,0,368,366,1,0,0,0,369,371,7,4,0,0,370,369,1,0,0,0,371,372,
        1,0,0,0,372,370,1,0,0,0,372,373,1,0,0,0,373,75,1,0,0,0,374,376,7,
        4,0,0,375,374,1,0,0,0,376,377,1,0,0,0,377,375,1,0,0,0,377,378,1,
        0,0,0,378,379,1,0,0,0,379,383,5,46,0,0,380,382,7,4,0,0,381,380,1,
        0,0,0,382,385,1,0,0,0,383,381,1,0,0,0,383,384,1,0,0,0,384,393,1,
        0,0,0,385,383,1,0,0,0,386,388,5,46,0,0,387,389,7,4,0,0,388,387,1,
        0,0,0,389,390,1,0,0,0,390,388,1,0,0,0,390,391,1,0,0,0,391,393,1,
        0,0,0,392,375,1,0,0,0,392,386,1,0,0,0,393,77,1,0,0,0,394,396,5,13,
        0,0,395,394,1,0,0,0,395,396,1,0,0,0,396,397,1,0,0,0,397,398,5,10,
        0,0,398,399,1,0,0,0,399,400,6,37,5,0,400,79,1,0,0,0,401,402,5,47,
        0,0,402,403,5,42,0,0,403,407,1,0,0,0,404,406,9,0,0,0,405,404,1,0,
        0,0,406,409,1,0,0,0,407,408,1,0,0,0,407,405,1,0,0,0,408,410,1,0,
        0,0,409,407,1,0,0,0,410,411,5,42,0,0,411,412,5,47,0,0,412,413,1,
        0,0,0,413,414,6,38,6,0,414,81,1,0,0,0,415,416,5,47,0,0,416,417,5,
        47,0,0,417,421,1,0,0,0,418,420,8,0,0,0,419,418,1,0,0,0,420,423,1,
        0,0,0,421,419,1,0,0,0,421,422,1,0,0,0,422,424,1,0,0,0,423,421,1,
        0,0,0,424,425,6,39,6,0,425,83,1,0,0,0,426,428,5,92,0,0,427,429,5,
        13,0,0,428,427,1,0,0,0,428,429,1,0,0,0,429,430,1,0,0,0,430,431,5,
        10,0,0,431,432,1,0,0,0,432,433,6,40,4,0,433,85,1,0,0,0,434,439,3,
        112,54,0,435,438,3,112,54,0,436,438,7,4,0,0,437,435,1,0,0,0,437,
        436,1,0,0,0,438,441,1,0,0,0,439,437,1,0,0,0,439,440,1,0,0,0,440,
        451,1,0,0,0,441,439,1,0,0,0,442,447,5,40,0,0,443,446,3,112,54,0,
        444,446,7,5,0,0,445,443,1,0,0,0,445,444,1,0,0,0,446,449,1,0,0,0,
        447,445,1,0,0,0,447,448,1,0,0,0,448,450,1,0,0,0,449,447,1,0,0,0,
        450,452,5,41,0,0,451,442,1,0,0,0,451,452,1,0,0,0,452,453,1,0,0,0,
        453,454,6,41,7,0,454,455,6,41,2,0,455,87,1,0,0,0,456,458,5,92,0,
        0,457,459,5,13,0,0,458,457,1,0,0,0,458,459,1,0,0,0,459,460,1,0,0,
        0,460,461,5,10,0,0,461,462,1,0,0,0,462,463,6,42,4,0,463,89,1,0,0,
        0,464,465,5,92,0,0,465,466,9,0,0,0,466,467,1,0,0,0,467,468,6,43,
        8,0,468,91,1,0,0,0,469,471,5,13,0,0,470,469,1,0,0,0,470,471,1,0,
        0,0,471,472,1,0,0,0,472,473,5,10,0,0,473,474,1,0,0,0,474,475,6,44,
        9,0,475,476,6,44,5,0,476,93,1,0,0,0,477,478,5,47,0,0,478,479,5,42,
        0,0,479,483,1,0,0,0,480,482,9,0,0,0,481,480,1,0,0,0,482,485,1,0,
        0,0,483,484,1,0,0,0,483,481,1,0,0,0,484,486,1,0,0,0,485,483,1,0,
        0,0,486,487,5,42,0,0,487,488,5,47,0,0,488,489,1,0,0,0,489,490,6,
        45,6,0,490,491,6,45,10,0,491,95,1,0,0,0,492,493,5,47,0,0,493,494,
        5,47,0,0,494,498,1,0,0,0,495,497,8,0,0,0,496,495,1,0,0,0,497,500,
        1,0,0,0,498,496,1,0,0,0,498,499,1,0,0,0,499,501,1,0,0,0,500,498,
        1,0,0,0,501,502,6,46,6,0,502,503,6,46,11,0,503,97,1,0,0,0,504,505,
        5,47,0,0,505,506,1,0,0,0,506,507,6,47,8,0,507,99,1,0,0,0,508,510,
        8,6,0,0,509,508,1,0,0,0,510,511,1,0,0,0,511,509,1,0,0,0,511,512,
        1,0,0,0,512,101,1,0,0,0,513,514,5,92,0,0,514,518,7,7,0,0,515,518,
        3,104,50,0,516,518,3,106,51,0,517,513,1,0,0,0,517,515,1,0,0,0,517,
        516,1,0,0,0,518,103,1,0,0,0,519,520,5,92,0,0,520,521,7,8,0,0,521,
        522,7,9,0,0,522,529,7,9,0,0,523,524,5,92,0,0,524,525,7,9,0,0,525,
        529,7,9,0,0,526,527,5,92,0,0,527,529,7,9,0,0,528,519,1,0,0,0,528,
        523,1,0,0,0,528,526,1,0,0,0,529,105,1,0,0,0,530,531,5,92,0,0,531,
        532,5,117,0,0,532,533,3,108,52,0,533,534,3,108,52,0,534,535,3,108,
        52,0,535,536,3,108,52,0,536,107,1,0,0,0,537,538,7,10,0,0,538,109,
        1,0,0,0,539,545,5,34,0,0,540,544,8,11,0,0,541,542,5,92,0,0,542,544,
        9,0,0,0,543,540,1,0,0,0,543,541,1,0,0,0,544,547,1,0,0,0,545,543,
        1,0,0,0,545,546,1,0,0,0,546,548,1,0,0,0,547,545,1,0,0,0,548,549,
        5,34,0,0,549,111,1,0,0,0,550,556,7,12,0,0,551,556,8,13,0,0,552,553,
        7,14,0,0,553,556,7,15,0,0,554,556,7,16,0,0,555,550,1,0,0,0,555,551,
        1,0,0,0,555,552,1,0,0,0,555,554,1,0,0,0,556,113,1,0,0,0,557,558,
        7,17,0,0,558,115,1,0,0,0,559,560,7,18,0,0,560,117,1,0,0,0,561,562,
        7,19,0,0,562,119,1,0,0,0,563,564,7,20,0,0,564,121,1,0,0,0,565,566,
        7,21,0,0,566,123,1,0,0,0,567,568,7,22,0,0,568,125,1,0,0,0,569,570,
        7,23,0,0,570,127,1,0,0,0,571,572,7,24,0,0,572,129,1,0,0,0,573,574,
        7,25,0,0,574,131,1,0,0,0,575,576,7,26,0,0,576,133,1,0,0,0,577,578,
        7,27,0,0,578,135,1,0,0,0,579,580,7,28,0,0,580,137,1,0,0,0,581,582,
        7,29,0,0,582,139,1,0,0,0,583,584,7,30,0,0,584,141,1,0,0,0,585,586,
        7,31,0,0,586,143,1,0,0,0,587,588,7,32,0,0,588,145,1,0,0,0,589,590,
        7,33,0,0,590,147,1,0,0,0,591,592,7,34,0,0,592,149,1,0,0,0,593,594,
        7,35,0,0,594,151,1,0,0,0,595,596,7,36,0,0,596,153,1,0,0,0,597,598,
        7,37,0,0,598,155,1,0,0,0,599,600,7,38,0,0,600,157,1,0,0,0,601,602,
        7,39,0,0,602,159,1,0,0,0,603,604,7,40,0,0,604,161,1,0,0,0,605,606,
        7,41,0,0,606,163,1,0,0,0,607,608,7,42,0,0,608,165,1,0,0,0,39,0,1,
        2,3,176,190,202,211,213,227,240,263,355,364,366,372,377,383,390,
        392,395,407,421,428,437,439,445,447,451,458,470,483,498,511,517,
        528,543,545,555,12,2,1,0,7,2,0,2,3,0,2,2,0,0,1,0,2,0,0,0,2,0,7,29,
        0,7,37,0,7,32,0,7,33,0,7,34,0
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!LPCPreprocessorLexer.__ATN) {
            LPCPreprocessorLexer.__ATN = new antlr.ATNDeserializer().deserialize(LPCPreprocessorLexer._serializedATN);
        }

        return LPCPreprocessorLexer.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(LPCPreprocessorLexer.literalNames, LPCPreprocessorLexer.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return LPCPreprocessorLexer.vocabulary;
    }

    private static readonly decisionsToDFA = LPCPreprocessorLexer._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}
// Generated from grammar/LPCParser.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { LPCParserListener } from "./LPCParserListener.js";
import { LPCParserVisitor } from "./LPCParserVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class LPCParser extends antlr.Parser {
    public static readonly ARRAY = 1;
    public static readonly BREAK = 2;
    public static readonly BYTES = 3;
    public static readonly CASE = 4;
    public static readonly CATCH = 5;
    public static readonly CHAR = 6;
    public static readonly CLOSURE = 7;
    public static readonly CONST = 8;
    public static readonly CONTINUE = 9;
    public static readonly DEFAULT = 10;
    public static readonly DO = 11;
    public static readonly ECHO = 12;
    public static readonly ELSE = 13;
    public static readonly ELIF = 14;
    public static readonly ENDIF = 15;
    public static readonly ENUM = 16;
    public static readonly FLOAT = 17;
    public static readonly FOR = 18;
    public static readonly FOREACH = 19;
    public static readonly FUNCTIONS = 20;
    public static readonly FUNCTION = 21;
    public static readonly HASH = 22;
    public static readonly IF = 23;
    public static readonly IFDEF = 24;
    public static readonly IFNDEF = 25;
    public static readonly IN = 26;
    public static readonly INCLUDE = 27;
    public static readonly INHERIT = 28;
    public static readonly INT = 29;
    public static readonly LINE = 30;
    public static readonly LWOBJECT = 31;
    public static readonly MAPPING = 32;
    public static readonly MIXED = 33;
    public static readonly OBJECT = 34;
    public static readonly PRAGMA = 35;
    public static readonly RETURN = 36;
    public static readonly STATUS = 37;
    public static readonly STRUCTS = 38;
    public static readonly STRUCT = 39;
    public static readonly STRING = 40;
    public static readonly SYMBOL = 41;
    public static readonly SWITCH = 42;
    public static readonly TYPEDEF = 43;
    public static readonly UNDEF = 44;
    public static readonly VARIABLES = 45;
    public static readonly VIRTUAL = 46;
    public static readonly VOID = 47;
    public static readonly VOLATILE = 48;
    public static readonly WHILE = 49;
    public static readonly DEPRECATED = 50;
    public static readonly PRIVATE = 51;
    public static readonly PROTECTED = 52;
    public static readonly PUBLIC = 53;
    public static readonly STATIC = 54;
    public static readonly VISIBLE = 55;
    public static readonly NOSHADOW = 56;
    public static readonly NOSAVE = 57;
    public static readonly NOMASK = 58;
    public static readonly VARARGS = 59;
    public static readonly SUPER_ACCESSOR = 60;
    public static readonly PLUS = 61;
    public static readonly MINUS = 62;
    public static readonly STAR = 63;
    public static readonly DIV = 64;
    public static readonly MOD = 65;
    public static readonly INC = 66;
    public static readonly DEC = 67;
    public static readonly SHL = 68;
    public static readonly SHR = 69;
    public static readonly LT = 70;
    public static readonly GT = 71;
    public static readonly LE = 72;
    public static readonly GE = 73;
    public static readonly EQ = 74;
    public static readonly NE = 75;
    public static readonly AND = 76;
    public static readonly OR = 77;
    public static readonly XOR = 78;
    public static readonly NOT = 79;
    public static readonly BNOT = 80;
    public static readonly AND_AND = 81;
    public static readonly OR_OR = 82;
    public static readonly QUESTION = 83;
    public static readonly COLON = 84;
    public static readonly SEMI = 85;
    public static readonly COMMA = 86;
    public static readonly TRIPPLEDOT = 87;
    public static readonly DOUBLEDOT = 88;
    public static readonly DOT = 89;
    public static readonly ASSIGN = 90;
    public static readonly ADD_ASSIGN = 91;
    public static readonly SUB_ASSIGN = 92;
    public static readonly MUL_ASSIGN = 93;
    public static readonly DIV_ASSIGN = 94;
    public static readonly MOD_ASSIGN = 95;
    public static readonly OR_ASSIGN = 96;
    public static readonly AND_ASSIGN = 97;
    public static readonly BITAND_ASSIGN = 98;
    public static readonly BITOR_ASSIGN = 99;
    public static readonly XOR_ASSIGN = 100;
    public static readonly SHL_ASSIGN = 101;
    public static readonly RSH_ASSIGN = 102;
    public static readonly MAPPING_OPEN = 103;
    public static readonly ARROW = 104;
    public static readonly PAREN_OPEN = 105;
    public static readonly PAREN_CLOSE = 106;
    public static readonly CURLY_OPEN = 107;
    public static readonly CURLY_CLOSE = 108;
    public static readonly SQUARE_OPEN = 109;
    public static readonly SQUARE_CLOSE = 110;
    public static readonly BACKSLASH = 111;
    public static readonly IntegerConstant = 112;
    public static readonly FloatingConstant = 113;
    public static readonly HexIntConstant = 114;
    public static readonly STRING_START = 115;
    public static readonly StringLiteral = 116;
    public static readonly CharacterConstant = 117;
    public static readonly CloneObject = 118;
    public static readonly LoadObject = 119;
    public static readonly Identifier = 120;
    public static readonly COMMENT = 121;
    public static readonly LINE_COMMENT = 122;
    public static readonly DEFINE = 123;
    public static readonly WS = 124;
    public static readonly SINGLEQUOT = 125;
    public static readonly END_DEFINE = 126;
    public static readonly STRING_END = 127;
    public static readonly NEWLINE = 128;
    public static readonly RULE_program = 0;
    public static readonly RULE_preprocessorDirective = 1;
    public static readonly RULE_includePreprocessorDirective = 2;
    public static readonly RULE_definePreprocessorDirective = 3;
    public static readonly RULE_selectionPreprocessorDirective = 4;
    public static readonly RULE_selectionPreprocessorDirectiveTypeSingle = 5;
    public static readonly RULE_selectionPreprocessorDirectiveTypeWithArg = 6;
    public static readonly RULE_directiveIfTestExpression = 7;
    public static readonly RULE_directiveIfArgument = 8;
    public static readonly RULE_directiveTypeWithArguments = 9;
    public static readonly RULE_directiveArgument = 10;
    public static readonly RULE_directiveDefineParam = 11;
    public static readonly RULE_directiveDefineArgument = 12;
    public static readonly RULE_directiveTypeInclude = 13;
    public static readonly RULE_directiveGlobalFile = 14;
    public static readonly RULE_directiveIncludeFile = 15;
    public static readonly RULE_directiveTypePragma = 16;
    public static readonly RULE_inheritStatement = 17;
    public static readonly RULE_inheritModifier = 18;
    public static readonly RULE_inherit = 19;
    public static readonly RULE_defaultModifier = 20;
    public static readonly RULE_inheritFile = 21;
    public static readonly RULE_inheritSuperExpression = 22;
    public static readonly RULE_declaration = 23;
    public static readonly RULE_functionModifier = 24;
    public static readonly RULE_functionHeader = 25;
    public static readonly RULE_functionHeaderDeclaration = 26;
    public static readonly RULE_functionDeclaration = 27;
    public static readonly RULE_parameterList = 28;
    public static readonly RULE_parameter = 29;
    public static readonly RULE_structDeclaration = 30;
    public static readonly RULE_structMemberDeclaration = 31;
    public static readonly RULE_structMemberInitializer = 32;
    public static readonly RULE_variableModifier = 33;
    public static readonly RULE_variableDeclarationStatement = 34;
    public static readonly RULE_variableDeclaration = 35;
    public static readonly RULE_variableDeclaratorExpression = 36;
    public static readonly RULE_variableDeclarator = 37;
    public static readonly RULE_variableInitializer = 38;
    public static readonly RULE_primitiveTypeSpecifier = 39;
    public static readonly RULE_methodInvocation = 40;
    public static readonly RULE_structTypeSpecifier = 41;
    public static readonly RULE_typeSpecifier = 42;
    public static readonly RULE_unionableTypeSpecifier = 43;
    public static readonly RULE_arrayExpression = 44;
    public static readonly RULE_mappingContent = 45;
    public static readonly RULE_mappingExpression = 46;
    public static readonly RULE_expression = 47;
    public static readonly RULE_commaableExpression = 48;
    public static readonly RULE_assignmentOperator = 49;
    public static readonly RULE_commaExpression = 50;
    public static readonly RULE_assignmentOrConditionalExpression = 51;
    public static readonly RULE_conditionalTernaryExpression = 52;
    public static readonly RULE_conditionalOrExpression = 53;
    public static readonly RULE_conditionalAndExpression = 54;
    public static readonly RULE_inclusiveOrExpression = 55;
    public static readonly RULE_exclusiveOrExpression = 56;
    public static readonly RULE_andExpression = 57;
    public static readonly RULE_equalityExpression = 58;
    public static readonly RULE_relationalExpression = 59;
    public static readonly RULE_shiftExpression = 60;
    public static readonly RULE_additiveExpression = 61;
    public static readonly RULE_multiplicativeExpression = 62;
    public static readonly RULE_unaryExpression = 63;
    public static readonly RULE_primaryExpression = 64;
    public static readonly RULE_primaryExpressionStart = 65;
    public static readonly RULE_validIdentifiers = 66;
    public static readonly RULE_catchExpr = 67;
    public static readonly RULE_inlineClosureExpression = 68;
    public static readonly RULE_bracketExpression = 69;
    public static readonly RULE_lambdaArrayIndexor = 70;
    public static readonly RULE_lambdaExpression = 71;
    public static readonly RULE_castExpression = 72;
    public static readonly RULE_expressionList = 73;
    public static readonly RULE_statement = 74;
    public static readonly RULE_block = 75;
    public static readonly RULE_selectionStatement = 76;
    public static readonly RULE_elseIfExpression = 77;
    public static readonly RULE_elseExpression = 78;
    public static readonly RULE_ifExpression = 79;
    public static readonly RULE_ifStatement = 80;
    public static readonly RULE_switchStatement = 81;
    public static readonly RULE_caseExpression = 82;
    public static readonly RULE_caseOperators = 83;
    public static readonly RULE_caseCondition = 84;
    public static readonly RULE_caseStatement = 85;
    public static readonly RULE_defaultStatement = 86;
    public static readonly RULE_iterationStatement = 87;
    public static readonly RULE_forRangeExpression = 88;
    public static readonly RULE_foreachRangeExpression = 89;
    public static readonly RULE_forVariable = 90;
    public static readonly RULE_forEachVariable = 91;
    public static readonly RULE_returnStatement = 92;
    public static readonly RULE_jumpStatement = 93;
    public static readonly RULE_callOtherTarget = 94;
    public static readonly RULE_literal = 95;
    public static readonly RULE_argument = 96;
    public static readonly RULE_argumentList = 97;

    public static readonly literalNames = [
        null, "'array'", "'break'", "'bytes'", "'case'", "'catch'", "'char'", 
        "'closure'", "'const'", "'continue'", "'default'", "'do'", "'#echo'", 
        "'else'", "'elif'", "'endif'", "'enum'", "'float'", "'for'", "'foreach'", 
        "'functions'", "'function'", "'#'", "'if'", "'ifdef'", "'ifndef'", 
        "'in'", "'include'", "'inherit'", "'int'", "'#line'", "'lwobject'", 
        "'mapping'", "'mixed'", "'object'", "'pragma'", "'return'", "'status'", 
        "'structs'", "'struct'", "'string'", "'symbol'", "'switch'", "'typedef'", 
        "'undef'", "'variables'", "'virtual'", "'void'", "'volatile'", "'while'", 
        "'deprecated'", "'private'", "'protected'", "'public'", "'static'", 
        "'visible'", "'noshadow'", "'nosave'", "'nomask'", "'varargs'", 
        "'::'", "'+'", "'-'", "'*'", "'/'", "'%'", "'++'", "'--'", "'<<'", 
        "'>>'", "'<'", "'>'", "'<='", "'>='", "'=='", "'!='", "'&'", "'|'", 
        "'^'", "'!'", "'~'", "'&&'", "'||'", "'?'", "':'", "';'", "','", 
        "'...'", "'..'", "'.'", "'='", "'+='", "'-='", "'*='", "'/='", "'%='", 
        "'||='", "'&&='", "'&='", "'|='", "'^='", "'<<='", "'>>='", "'(['", 
        "'->'", "'('", "')'", "'{'", "'}'", "'['", "']'", "'\\'", null, 
        null, null, null, null, null, "'clone_object'", "'load_object'", 
        null, null, null, null, null, "'''", null, null, "'\\\\n'"
    ];

    public static readonly symbolicNames = [
        null, "ARRAY", "BREAK", "BYTES", "CASE", "CATCH", "CHAR", "CLOSURE", 
        "CONST", "CONTINUE", "DEFAULT", "DO", "ECHO", "ELSE", "ELIF", "ENDIF", 
        "ENUM", "FLOAT", "FOR", "FOREACH", "FUNCTIONS", "FUNCTION", "HASH", 
        "IF", "IFDEF", "IFNDEF", "IN", "INCLUDE", "INHERIT", "INT", "LINE", 
        "LWOBJECT", "MAPPING", "MIXED", "OBJECT", "PRAGMA", "RETURN", "STATUS", 
        "STRUCTS", "STRUCT", "STRING", "SYMBOL", "SWITCH", "TYPEDEF", "UNDEF", 
        "VARIABLES", "VIRTUAL", "VOID", "VOLATILE", "WHILE", "DEPRECATED", 
        "PRIVATE", "PROTECTED", "PUBLIC", "STATIC", "VISIBLE", "NOSHADOW", 
        "NOSAVE", "NOMASK", "VARARGS", "SUPER_ACCESSOR", "PLUS", "MINUS", 
        "STAR", "DIV", "MOD", "INC", "DEC", "SHL", "SHR", "LT", "GT", "LE", 
        "GE", "EQ", "NE", "AND", "OR", "XOR", "NOT", "BNOT", "AND_AND", 
        "OR_OR", "QUESTION", "COLON", "SEMI", "COMMA", "TRIPPLEDOT", "DOUBLEDOT", 
        "DOT", "ASSIGN", "ADD_ASSIGN", "SUB_ASSIGN", "MUL_ASSIGN", "DIV_ASSIGN", 
        "MOD_ASSIGN", "OR_ASSIGN", "AND_ASSIGN", "BITAND_ASSIGN", "BITOR_ASSIGN", 
        "XOR_ASSIGN", "SHL_ASSIGN", "RSH_ASSIGN", "MAPPING_OPEN", "ARROW", 
        "PAREN_OPEN", "PAREN_CLOSE", "CURLY_OPEN", "CURLY_CLOSE", "SQUARE_OPEN", 
        "SQUARE_CLOSE", "BACKSLASH", "IntegerConstant", "FloatingConstant", 
        "HexIntConstant", "STRING_START", "StringLiteral", "CharacterConstant", 
        "CloneObject", "LoadObject", "Identifier", "COMMENT", "LINE_COMMENT", 
        "DEFINE", "WS", "SINGLEQUOT", "END_DEFINE", "STRING_END", "NEWLINE"
    ];
    public static readonly ruleNames = [
        "program", "preprocessorDirective", "includePreprocessorDirective", 
        "definePreprocessorDirective", "selectionPreprocessorDirective", 
        "selectionPreprocessorDirectiveTypeSingle", "selectionPreprocessorDirectiveTypeWithArg", 
        "directiveIfTestExpression", "directiveIfArgument", "directiveTypeWithArguments", 
        "directiveArgument", "directiveDefineParam", "directiveDefineArgument", 
        "directiveTypeInclude", "directiveGlobalFile", "directiveIncludeFile", 
        "directiveTypePragma", "inheritStatement", "inheritModifier", "inherit", 
        "defaultModifier", "inheritFile", "inheritSuperExpression", "declaration", 
        "functionModifier", "functionHeader", "functionHeaderDeclaration", 
        "functionDeclaration", "parameterList", "parameter", "structDeclaration", 
        "structMemberDeclaration", "structMemberInitializer", "variableModifier", 
        "variableDeclarationStatement", "variableDeclaration", "variableDeclaratorExpression", 
        "variableDeclarator", "variableInitializer", "primitiveTypeSpecifier", 
        "methodInvocation", "structTypeSpecifier", "typeSpecifier", "unionableTypeSpecifier", 
        "arrayExpression", "mappingContent", "mappingExpression", "expression", 
        "commaableExpression", "assignmentOperator", "commaExpression", 
        "assignmentOrConditionalExpression", "conditionalTernaryExpression", 
        "conditionalOrExpression", "conditionalAndExpression", "inclusiveOrExpression", 
        "exclusiveOrExpression", "andExpression", "equalityExpression", 
        "relationalExpression", "shiftExpression", "additiveExpression", 
        "multiplicativeExpression", "unaryExpression", "primaryExpression", 
        "primaryExpressionStart", "validIdentifiers", "catchExpr", "inlineClosureExpression", 
        "bracketExpression", "lambdaArrayIndexor", "lambdaExpression", "castExpression", 
        "expressionList", "statement", "block", "selectionStatement", "elseIfExpression", 
        "elseExpression", "ifExpression", "ifStatement", "switchStatement", 
        "caseExpression", "caseOperators", "caseCondition", "caseStatement", 
        "defaultStatement", "iterationStatement", "forRangeExpression", 
        "foreachRangeExpression", "forVariable", "forEachVariable", "returnStatement", 
        "jumpStatement", "callOtherTarget", "literal", "argument", "argumentList",
    ];

    public get grammarFileName(): string { return "LPCParser.g4"; }
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
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, LPCParser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 201;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4099019978) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 2415715303) !== 0) || _la === 70 || ((((_la - 116)) & ~0x1F) === 0 && ((1 << (_la - 116)) & 145) !== 0)) {
                {
                this.state = 199;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context) ) {
                case 1:
                    {
                    this.state = 196;
                    this.declaration();
                    }
                    break;
                case 2:
                    {
                    this.state = 197;
                    this.preprocessorDirective();
                    }
                    break;
                case 3:
                    {
                    this.state = 198;
                    this.inheritStatement();
                    }
                    break;
                }
                }
                this.state = 203;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 204;
            this.match(LPCParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public preprocessorDirective(): PreprocessorDirectiveContext {
        let localContext = new PreprocessorDirectiveContext(this.context, this.state);
        this.enterRule(localContext, 2, LPCParser.RULE_preprocessorDirective);
        let _la: number;
        try {
            this.state = 222;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 206;
                this.selectionPreprocessorDirective();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 207;
                this.directiveTypeWithArguments();
                this.state = 208;
                this.directiveArgument();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 210;
                this.definePreprocessorDirective();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 211;
                this.includePreprocessorDirective();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 212;
                this.match(LPCParser.HASH);
                this.state = 213;
                this.directiveTypePragma();
                this.state = 214;
                this.match(LPCParser.Identifier);
                this.state = 219;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 86) {
                    {
                    {
                    this.state = 215;
                    this.match(LPCParser.COMMA);
                    this.state = 216;
                    this.match(LPCParser.Identifier);
                    }
                    }
                    this.state = 221;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public includePreprocessorDirective(): IncludePreprocessorDirectiveContext {
        let localContext = new IncludePreprocessorDirectiveContext(this.context, this.state);
        this.enterRule(localContext, 4, LPCParser.RULE_includePreprocessorDirective);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 224;
            this.match(LPCParser.HASH);
            this.state = 225;
            this.directiveTypeInclude();
            this.state = 226;
            this.directiveIncludeFile();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public definePreprocessorDirective(): DefinePreprocessorDirectiveContext {
        let localContext = new DefinePreprocessorDirectiveContext(this.context, this.state);
        this.enterRule(localContext, 6, LPCParser.RULE_definePreprocessorDirective);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 228;
            this.match(LPCParser.DEFINE);
            this.state = 229;
            this.match(LPCParser.END_DEFINE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public selectionPreprocessorDirective(): SelectionPreprocessorDirectiveContext {
        let localContext = new SelectionPreprocessorDirectiveContext(this.context, this.state);
        this.enterRule(localContext, 8, LPCParser.RULE_selectionPreprocessorDirective);
        let _la: number;
        try {
            this.state = 243;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 231;
                this.match(LPCParser.HASH);
                this.state = 232;
                this.selectionPreprocessorDirectiveTypeWithArg();
                this.state = 234;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 79) {
                    {
                    this.state = 233;
                    this.match(LPCParser.NOT);
                    }
                }

                this.state = 236;
                this.directiveArgument();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 238;
                this.match(LPCParser.HASH);
                this.state = 239;
                _la = this.tokenStream.LA(1);
                if(!(_la === 14 || _la === 23)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 240;
                this.directiveIfTestExpression(0);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 241;
                this.match(LPCParser.HASH);
                this.state = 242;
                this.selectionPreprocessorDirectiveTypeSingle();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public selectionPreprocessorDirectiveTypeSingle(): SelectionPreprocessorDirectiveTypeSingleContext {
        let localContext = new SelectionPreprocessorDirectiveTypeSingleContext(this.context, this.state);
        this.enterRule(localContext, 10, LPCParser.RULE_selectionPreprocessorDirectiveTypeSingle);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 245;
            _la = this.tokenStream.LA(1);
            if(!(_la === 13 || _la === 15)) {
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
    public selectionPreprocessorDirectiveTypeWithArg(): SelectionPreprocessorDirectiveTypeWithArgContext {
        let localContext = new SelectionPreprocessorDirectiveTypeWithArgContext(this.context, this.state);
        this.enterRule(localContext, 12, LPCParser.RULE_selectionPreprocessorDirectiveTypeWithArg);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 247;
            _la = this.tokenStream.LA(1);
            if(!(_la === 24 || _la === 25)) {
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

    public directiveIfTestExpression(): DirectiveIfTestExpressionContext;
    public directiveIfTestExpression(_p: number): DirectiveIfTestExpressionContext;
    public directiveIfTestExpression(_p?: number): DirectiveIfTestExpressionContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new DirectiveIfTestExpressionContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 14;
        this.enterRecursionRule(localContext, 14, LPCParser.RULE_directiveIfTestExpression, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 251;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
            case 1:
                {
                this.state = 250;
                this.match(LPCParser.NOT);
                }
                break;
            }
            this.state = 253;
            this.directiveIfArgument();
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 264;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 8, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new DirectiveIfTestExpressionContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_directiveIfTestExpression);
                    this.state = 255;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 258;
                    this.errorHandler.sync(this);
                    alternative = 1;
                    do {
                        switch (alternative) {
                        case 1:
                            {
                            {
                            this.state = 256;
                            _la = this.tokenStream.LA(1);
                            if(!(((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 6207) !== 0))) {
                            this.errorHandler.recoverInline(this);
                            }
                            else {
                                this.errorHandler.reportMatch(this);
                                this.consume();
                            }
                            this.state = 257;
                            this.directiveIfTestExpression(0);
                            }
                            }
                            break;
                        default:
                            throw new antlr.NoViableAltException(this);
                        }
                        this.state = 260;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
                    } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                    }
                    }
                }
                this.state = 266;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 8, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public directiveIfArgument(): DirectiveIfArgumentContext {
        let localContext = new DirectiveIfArgumentContext(this.context, this.state);
        this.enterRule(localContext, 16, LPCParser.RULE_directiveIfArgument);
        let _la: number;
        try {
            this.state = 276;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 267;
                this.match(LPCParser.Identifier);
                this.state = 271;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
                case 1:
                    {
                    this.state = 268;
                    this.match(LPCParser.PAREN_OPEN);
                    this.state = 269;
                    _la = this.tokenStream.LA(1);
                    if(!(((((_la - 112)) & ~0x1F) === 0 && ((1 << (_la - 112)) & 273) !== 0))) {
                    this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 270;
                    this.match(LPCParser.PAREN_CLOSE);
                    }
                    break;
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 273;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 274;
                this.match(LPCParser.IntegerConstant);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 275;
                this.expression();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public directiveTypeWithArguments(): DirectiveTypeWithArgumentsContext {
        let localContext = new DirectiveTypeWithArgumentsContext(this.context, this.state);
        this.enterRule(localContext, 18, LPCParser.RULE_directiveTypeWithArguments);
        try {
            this.state = 282;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.HASH:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 278;
                this.match(LPCParser.HASH);
                this.state = 279;
                this.match(LPCParser.UNDEF);
                }
                break;
            case LPCParser.ECHO:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 280;
                this.match(LPCParser.ECHO);
                }
                break;
            case LPCParser.LINE:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 281;
                this.match(LPCParser.LINE);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public directiveArgument(): DirectiveArgumentContext {
        let localContext = new DirectiveArgumentContext(this.context, this.state);
        this.enterRule(localContext, 20, LPCParser.RULE_directiveArgument);
        let _la: number;
        try {
            this.state = 294;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 284;
                this.match(LPCParser.Identifier);
                this.state = 289;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 62) {
                    {
                    {
                    this.state = 285;
                    this.match(LPCParser.MINUS);
                    this.state = 286;
                    this.match(LPCParser.Identifier);
                    }
                    }
                    this.state = 291;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 292;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case LPCParser.IntegerConstant:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 293;
                this.match(LPCParser.IntegerConstant);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public directiveDefineParam(): DirectiveDefineParamContext {
        let localContext = new DirectiveDefineParamContext(this.context, this.state);
        this.enterRule(localContext, 22, LPCParser.RULE_directiveDefineParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 296;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 297;
            this.match(LPCParser.Identifier);
            this.state = 302;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 298;
                this.match(LPCParser.COMMA);
                this.state = 299;
                this.match(LPCParser.Identifier);
                }
                }
                this.state = 304;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 305;
            this.match(LPCParser.PAREN_CLOSE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public directiveDefineArgument(): DirectiveDefineArgumentContext {
        let localContext = new DirectiveDefineArgumentContext(this.context, this.state);
        this.enterRule(localContext, 24, LPCParser.RULE_directiveDefineArgument);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 307;
            this.expression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public directiveTypeInclude(): DirectiveTypeIncludeContext {
        let localContext = new DirectiveTypeIncludeContext(this.context, this.state);
        this.enterRule(localContext, 26, LPCParser.RULE_directiveTypeInclude);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 309;
            this.match(LPCParser.INCLUDE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public directiveGlobalFile(): DirectiveGlobalFileContext {
        let localContext = new DirectiveGlobalFileContext(this.context, this.state);
        this.enterRule(localContext, 28, LPCParser.RULE_directiveGlobalFile);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 311;
            this.match(LPCParser.LT);
            this.state = 312;
            this.match(LPCParser.Identifier);
            this.state = 316;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 64 || _la === 89 || _la === 120) {
                {
                {
                this.state = 313;
                _la = this.tokenStream.LA(1);
                if(!(_la === 64 || _la === 89 || _la === 120)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                }
                this.state = 318;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 319;
            this.match(LPCParser.GT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public directiveIncludeFile(): DirectiveIncludeFileContext {
        let localContext = new DirectiveIncludeFileContext(this.context, this.state);
        this.enterRule(localContext, 30, LPCParser.RULE_directiveIncludeFile);
        try {
            let alternative: number;
            this.state = 330;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.LT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 321;
                localContext._globalFile = this.directiveGlobalFile();
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 322;
                localContext._localFile = this.match(LPCParser.StringLiteral);
                this.state = 326;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 16, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 323;
                        this.match(LPCParser.StringLiteral);
                        }
                        }
                    }
                    this.state = 328;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 16, this.context);
                }
                }
                break;
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 329;
                localContext._defineFile = this.match(LPCParser.Identifier);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public directiveTypePragma(): DirectiveTypePragmaContext {
        let localContext = new DirectiveTypePragmaContext(this.context, this.state);
        this.enterRule(localContext, 32, LPCParser.RULE_directiveTypePragma);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 332;
            this.match(LPCParser.PRAGMA);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public inheritStatement(): InheritStatementContext {
        let localContext = new InheritStatementContext(this.context, this.state);
        this.enterRule(localContext, 34, LPCParser.RULE_inheritStatement);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 353;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 22, this.context) ) {
            case 1:
                {
                this.state = 334;
                this.inherit();
                }
                break;
            case 2:
                {
                this.state = 341;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 10) {
                    {
                    this.state = 335;
                    this.match(LPCParser.DEFAULT);
                    this.state = 337;
                    this.errorHandler.sync(this);
                    alternative = 1;
                    do {
                        switch (alternative) {
                        case 1:
                            {
                            {
                            this.state = 336;
                            this.defaultModifier();
                            }
                            }
                            break;
                        default:
                            throw new antlr.NoViableAltException(this);
                        }
                        this.state = 339;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 18, this.context);
                    } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                    }
                }

                this.state = 346;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 1023) !== 0)) {
                    {
                    {
                    this.state = 343;
                    this.inheritModifier();
                    }
                    }
                    this.state = 348;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 350;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 46) {
                    {
                    this.state = 349;
                    this.match(LPCParser.VIRTUAL);
                    }
                }

                this.state = 352;
                this.inherit();
                }
                break;
            }
            this.state = 355;
            this.match(LPCParser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public inheritModifier(): InheritModifierContext {
        let localContext = new InheritModifierContext(this.context, this.state);
        this.enterRule(localContext, 36, LPCParser.RULE_inheritModifier);
        let _la: number;
        try {
            this.state = 371;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 25, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 358;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                do {
                    {
                    {
                    this.state = 357;
                    this.functionModifier();
                    }
                    }
                    this.state = 360;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                } while (((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 895) !== 0));
                this.state = 362;
                this.match(LPCParser.FUNCTIONS);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 365;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                do {
                    {
                    {
                    this.state = 364;
                    this.variableModifier();
                    }
                    }
                    this.state = 367;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                } while (((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 479) !== 0));
                this.state = 369;
                _la = this.tokenStream.LA(1);
                if(!(_la === 38 || _la === 45)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public inherit(): InheritContext {
        let localContext = new InheritContext(this.context, this.state);
        this.enterRule(localContext, 38, LPCParser.RULE_inherit);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 373;
            this.match(LPCParser.INHERIT);
            this.state = 374;
            this.inheritFile(0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public defaultModifier(): DefaultModifierContext {
        let localContext = new DefaultModifierContext(this.context, this.state);
        this.enterRule(localContext, 40, LPCParser.RULE_defaultModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 376;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 31) !== 0))) {
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

    public inheritFile(): InheritFileContext;
    public inheritFile(_p: number): InheritFileContext;
    public inheritFile(_p?: number): InheritFileContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new InheritFileContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 42;
        this.enterRecursionRule(localContext, 42, LPCParser.RULE_inheritFile, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 385;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.StringLiteral:
                {
                this.state = 379;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case LPCParser.Identifier:
                {
                this.state = 380;
                this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.PAREN_OPEN:
                {
                this.state = 381;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 382;
                this.inheritFile(0);
                this.state = 383;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 394;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 28, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new InheritFileContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_inheritFile);
                    this.state = 387;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 389;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 61) {
                        {
                        this.state = 388;
                        this.match(LPCParser.PLUS);
                        }
                    }

                    this.state = 391;
                    this.inheritFile(2);
                    }
                    }
                }
                this.state = 396;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 28, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public inheritSuperExpression(): InheritSuperExpressionContext {
        let localContext = new InheritSuperExpressionContext(this.context, this.state);
        this.enterRule(localContext, 44, LPCParser.RULE_inheritSuperExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 398;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 116 || _la === 120) {
                {
                this.state = 397;
                localContext._filename = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!(_la === 116 || _la === 120)) {
                    localContext._filename = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
            }

            this.state = 400;
            this.match(LPCParser.SUPER_ACCESSOR);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public declaration(): DeclarationContext {
        let localContext = new DeclarationContext(this.context, this.state);
        this.enterRule(localContext, 46, LPCParser.RULE_declaration);
        try {
            this.state = 406;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 30, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 402;
                this.functionHeaderDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 403;
                this.functionDeclaration();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 404;
                this.structDeclaration();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 405;
                this.variableDeclarationStatement();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public functionModifier(): FunctionModifierContext {
        let localContext = new FunctionModifierContext(this.context, this.state);
        this.enterRule(localContext, 48, LPCParser.RULE_functionModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 408;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 895) !== 0))) {
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
    public functionHeader(): FunctionHeaderContext {
        let localContext = new FunctionHeaderContext(this.context, this.state);
        this.enterRule(localContext, 50, LPCParser.RULE_functionHeader);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 413;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 895) !== 0)) {
                {
                {
                this.state = 410;
                this.functionModifier();
                }
                }
                this.state = 415;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 417;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2684485832) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33703) !== 0) || _la === 70) {
                {
                this.state = 416;
                this.typeSpecifier();
                }
            }

            this.state = 419;
            localContext._functionName = this.match(LPCParser.Identifier);
            this.state = 420;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 422;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2752643274) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 134259687) !== 0) || _la === 70 || _la === 120) {
                {
                this.state = 421;
                localContext._functionArgs = this.parameterList();
                }
            }

            this.state = 424;
            this.match(LPCParser.PAREN_CLOSE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public functionHeaderDeclaration(): FunctionHeaderDeclarationContext {
        let localContext = new FunctionHeaderDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 52, LPCParser.RULE_functionHeaderDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 426;
            this.functionHeader();
            this.state = 427;
            this.match(LPCParser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public functionDeclaration(): FunctionDeclarationContext {
        let localContext = new FunctionDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 54, LPCParser.RULE_functionDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 429;
            this.functionHeader();
            this.state = 430;
            this.block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public parameterList(): ParameterListContext {
        let localContext = new ParameterListContext(this.context, this.state);
        this.enterRule(localContext, 56, LPCParser.RULE_parameterList);
        let _la: number;
        try {
            this.state = 441;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 35, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 432;
                this.parameter();
                this.state = 437;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 86) {
                    {
                    {
                    this.state = 433;
                    this.match(LPCParser.COMMA);
                    this.state = 434;
                    this.parameter();
                    }
                    }
                    this.state = 439;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 440;
                this.match(LPCParser.VOID);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public parameter(): ParameterContext {
        let localContext = new ParameterContext(this.context, this.state);
        this.enterRule(localContext, 58, LPCParser.RULE_parameter);
        let _la: number;
        try {
            this.state = 460;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 40, this.context) ) {
            case 1:
                localContext = new PrimitiveTypeParameterExpressionContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 444;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 59) {
                    {
                    this.state = 443;
                    this.match(LPCParser.VARARGS);
                    }
                }

                this.state = 447;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 37, this.context) ) {
                case 1:
                    {
                    this.state = 446;
                    (localContext as PrimitiveTypeParameterExpressionContext)._paramType = this.unionableTypeSpecifier();
                    }
                    break;
                }
                this.state = 449;
                (localContext as PrimitiveTypeParameterExpressionContext)._paramName = this.validIdentifiers();
                this.state = 452;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 90) {
                    {
                    this.state = 450;
                    this.match(LPCParser.ASSIGN);
                    this.state = 451;
                    this.expression();
                    }
                }

                }
                break;
            case 2:
                localContext = new StructParameterExpressionContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 454;
                (localContext as StructParameterExpressionContext)._paramType = this.match(LPCParser.STRUCT);
                this.state = 455;
                (localContext as StructParameterExpressionContext)._structName = this.match(LPCParser.Identifier);
                this.state = 457;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 63) {
                    {
                    this.state = 456;
                    this.match(LPCParser.STAR);
                    }
                }

                this.state = 459;
                (localContext as StructParameterExpressionContext)._paramName = this.validIdentifiers();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public structDeclaration(): StructDeclarationContext {
        let localContext = new StructDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 60, LPCParser.RULE_structDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 462;
            this.match(LPCParser.STRUCT);
            this.state = 463;
            localContext._structName = this.match(LPCParser.Identifier);
            this.state = 467;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 105) {
                {
                this.state = 464;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 465;
                localContext._structInherits = this.match(LPCParser.Identifier);
                this.state = 466;
                this.match(LPCParser.PAREN_CLOSE);
                }
            }

            this.state = 469;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 473;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2684485832) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33703) !== 0) || _la === 70) {
                {
                {
                this.state = 470;
                localContext._structMembers = this.structMemberDeclaration();
                }
                }
                this.state = 475;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 476;
            this.match(LPCParser.CURLY_CLOSE);
            this.state = 477;
            this.match(LPCParser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public structMemberDeclaration(): StructMemberDeclarationContext {
        let localContext = new StructMemberDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 62, LPCParser.RULE_structMemberDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 479;
            this.typeSpecifier();
            this.state = 480;
            this.match(LPCParser.Identifier);
            this.state = 481;
            this.match(LPCParser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public structMemberInitializer(): StructMemberInitializerContext {
        let localContext = new StructMemberInitializerContext(this.context, this.state);
        this.enterRule(localContext, 64, LPCParser.RULE_structMemberInitializer);
        try {
            this.state = 487;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 43, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 483;
                this.match(LPCParser.Identifier);
                this.state = 484;
                this.match(LPCParser.COLON);
                this.state = 485;
                this.expression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 486;
                this.expression();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public variableModifier(): VariableModifierContext {
        let localContext = new VariableModifierContext(this.context, this.state);
        this.enterRule(localContext, 66, LPCParser.RULE_variableModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 489;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 479) !== 0))) {
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
    public variableDeclarationStatement(): VariableDeclarationStatementContext {
        let localContext = new VariableDeclarationStatementContext(this.context, this.state);
        this.enterRule(localContext, 68, LPCParser.RULE_variableDeclarationStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 491;
            this.variableDeclaration();
            this.state = 492;
            this.match(LPCParser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public variableDeclaration(): VariableDeclarationContext {
        let localContext = new VariableDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 70, LPCParser.RULE_variableDeclaration);
        let _la: number;
        try {
            this.state = 533;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 51, this.context) ) {
            case 1:
                localContext = new PrimitiveTypeVariableDeclarationContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 497;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 479) !== 0)) {
                    {
                    {
                    this.state = 494;
                    this.variableModifier();
                    }
                    }
                    this.state = 499;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 501;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 45, this.context) ) {
                case 1:
                    {
                    this.state = 500;
                    this.unionableTypeSpecifier();
                    }
                    break;
                }
                this.state = 504;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 116) {
                    {
                    this.state = 503;
                    (localContext as PrimitiveTypeVariableDeclarationContext)._objectName = this.match(LPCParser.StringLiteral);
                    }
                }

                this.state = 506;
                this.variableDeclaratorExpression();
                this.state = 511;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 86) {
                    {
                    {
                    this.state = 507;
                    this.match(LPCParser.COMMA);
                    this.state = 508;
                    this.variableDeclaratorExpression();
                    }
                    }
                    this.state = 513;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            case 2:
                localContext = new StructVariableDeclarationContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 517;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 479) !== 0)) {
                    {
                    {
                    this.state = 514;
                    this.variableModifier();
                    }
                    }
                    this.state = 519;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 520;
                this.match(LPCParser.STRUCT);
                this.state = 521;
                (localContext as StructVariableDeclarationContext)._structName = this.match(LPCParser.Identifier);
                this.state = 522;
                this.variableDeclaratorExpression();
                this.state = 530;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 86) {
                    {
                    {
                    this.state = 523;
                    this.match(LPCParser.COMMA);
                    this.state = 525;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 49, this.context) ) {
                    case 1:
                        {
                        this.state = 524;
                        (localContext as StructVariableDeclarationContext)._structName = this.match(LPCParser.Identifier);
                        }
                        break;
                    }
                    this.state = 527;
                    this.variableDeclaratorExpression();
                    }
                    }
                    this.state = 532;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public variableDeclaratorExpression(): VariableDeclaratorExpressionContext {
        let localContext = new VariableDeclaratorExpressionContext(this.context, this.state);
        this.enterRule(localContext, 72, LPCParser.RULE_variableDeclaratorExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 535;
            this.variableDeclarator();
            this.state = 538;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 90) {
                {
                this.state = 536;
                this.match(LPCParser.ASSIGN);
                this.state = 537;
                this.variableInitializer();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public variableDeclarator(): VariableDeclaratorContext {
        let localContext = new VariableDeclaratorContext(this.context, this.state);
        this.enterRule(localContext, 74, LPCParser.RULE_variableDeclarator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 541;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 53, this.context) ) {
            case 1:
                {
                this.state = 540;
                localContext._arraySpecifier = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!(_la === 1 || _la === 63)) {
                    localContext._arraySpecifier = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                break;
            }
            this.state = 543;
            localContext._variableName = this.validIdentifiers();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public variableInitializer(): VariableInitializerContext {
        let localContext = new VariableInitializerContext(this.context, this.state);
        this.enterRule(localContext, 76, LPCParser.RULE_variableInitializer);
        try {
            this.state = 548;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 54, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 545;
                this.expression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 546;
                this.arrayExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 547;
                this.mappingExpression();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public primitiveTypeSpecifier(): PrimitiveTypeSpecifierContext {
        let localContext = new PrimitiveTypeSpecifierContext(this.context, this.state);
        this.enterRule(localContext, 78, LPCParser.RULE_primitiveTypeSpecifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 550;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 2684485832) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33575) !== 0))) {
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
    public methodInvocation(): MethodInvocationContext {
        let localContext = new MethodInvocationContext(this.context, this.state);
        this.enterRule(localContext, 80, LPCParser.RULE_methodInvocation);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 552;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 554;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 74449002) !== 0) || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 868221057) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 671088665) !== 0) || ((((_la - 112)) & ~0x1F) === 0 && ((1 << (_la - 112)) & 8695) !== 0)) {
                {
                this.state = 553;
                this.argumentList();
                }
            }

            this.state = 556;
            this.match(LPCParser.PAREN_CLOSE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public structTypeSpecifier(): StructTypeSpecifierContext {
        let localContext = new StructTypeSpecifierContext(this.context, this.state);
        this.enterRule(localContext, 82, LPCParser.RULE_structTypeSpecifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 558;
            this.match(LPCParser.STRUCT);
            this.state = 559;
            this.match(LPCParser.Identifier);
            this.state = 561;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 56, this.context) ) {
            case 1:
                {
                this.state = 560;
                _la = this.tokenStream.LA(1);
                if(!(_la === 1 || _la === 63)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public typeSpecifier(): TypeSpecifierContext {
        let localContext = new TypeSpecifierContext(this.context, this.state);
        this.enterRule(localContext, 84, LPCParser.RULE_typeSpecifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 563;
            this.unionableTypeSpecifier();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public unionableTypeSpecifier(): UnionableTypeSpecifierContext {
        let localContext = new UnionableTypeSpecifierContext(this.context, this.state);
        this.enterRule(localContext, 86, LPCParser.RULE_unionableTypeSpecifier);
        let _la: number;
        try {
            let alternative: number;
            this.state = 600;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BYTES:
            case LPCParser.CHAR:
            case LPCParser.CLOSURE:
            case LPCParser.FLOAT:
            case LPCParser.INT:
            case LPCParser.LWOBJECT:
            case LPCParser.MAPPING:
            case LPCParser.MIXED:
            case LPCParser.OBJECT:
            case LPCParser.STATUS:
            case LPCParser.STRING:
            case LPCParser.SYMBOL:
            case LPCParser.VOID:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 565;
                this.primitiveTypeSpecifier();
                this.state = 567;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 57, this.context) ) {
                case 1:
                    {
                    this.state = 566;
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 1 || _la === 63)) {
                    this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    }
                    break;
                }
                this.state = 573;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 58, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 569;
                        this.match(LPCParser.OR);
                        this.state = 570;
                        this.unionableTypeSpecifier();
                        }
                        }
                    }
                    this.state = 575;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 58, this.context);
                }
                }
                break;
            case LPCParser.LT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 576;
                this.match(LPCParser.LT);
                this.state = 577;
                this.typeSpecifier();
                this.state = 578;
                this.match(LPCParser.GT);
                this.state = 582;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 59, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 579;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 1 || _la === 63)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        }
                        }
                    }
                    this.state = 584;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 59, this.context);
                }
                this.state = 589;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 60, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 585;
                        this.match(LPCParser.OR);
                        this.state = 586;
                        this.unionableTypeSpecifier();
                        }
                        }
                    }
                    this.state = 591;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 60, this.context);
                }
                }
                break;
            case LPCParser.STRUCT:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 592;
                this.structTypeSpecifier();
                this.state = 597;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 61, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 593;
                        this.match(LPCParser.OR);
                        this.state = 594;
                        this.unionableTypeSpecifier();
                        }
                        }
                    }
                    this.state = 599;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 61, this.context);
                }
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public arrayExpression(): ArrayExpressionContext {
        let localContext = new ArrayExpressionContext(this.context, this.state);
        this.enterRule(localContext, 88, LPCParser.RULE_arrayExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 602;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 603;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 612;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 74449002) !== 0) || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 868221057) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 671088665) !== 0) || ((((_la - 112)) & ~0x1F) === 0 && ((1 << (_la - 112)) & 8695) !== 0)) {
                {
                this.state = 604;
                this.expression();
                this.state = 609;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 63, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 605;
                        this.match(LPCParser.COMMA);
                        this.state = 606;
                        this.expression();
                        }
                        }
                    }
                    this.state = 611;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 63, this.context);
                }
                }
            }

            this.state = 615;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 86) {
                {
                this.state = 614;
                this.match(LPCParser.COMMA);
                }
            }

            this.state = 617;
            this.match(LPCParser.CURLY_CLOSE);
            this.state = 618;
            this.match(LPCParser.PAREN_CLOSE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public mappingContent(): MappingContentContext {
        let localContext = new MappingContentContext(this.context, this.state);
        this.enterRule(localContext, 90, LPCParser.RULE_mappingContent);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 620;
            localContext._mappingKey = this.expression();
            this.state = 630;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 84) {
                {
                this.state = 621;
                this.match(LPCParser.COLON);
                this.state = 622;
                this.expression();
                this.state = 627;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 85) {
                    {
                    {
                    this.state = 623;
                    this.match(LPCParser.SEMI);
                    this.state = 624;
                    this.expression();
                    }
                    }
                    this.state = 629;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public mappingExpression(): MappingExpressionContext {
        let localContext = new MappingExpressionContext(this.context, this.state);
        this.enterRule(localContext, 92, LPCParser.RULE_mappingExpression);
        let _la: number;
        try {
            let alternative: number;
            this.state = 656;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 70, this.context) ) {
            case 1:
                localContext = new MappingValueInitializerContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 632;
                this.match(LPCParser.MAPPING_OPEN);
                {
                this.state = 633;
                this.mappingContent();
                this.state = 638;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 68, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 634;
                        this.match(LPCParser.COMMA);
                        this.state = 635;
                        this.mappingContent();
                        }
                        }
                    }
                    this.state = 640;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 68, this.context);
                }
                }
                this.state = 642;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 86) {
                    {
                    this.state = 641;
                    this.match(LPCParser.COMMA);
                    }
                }

                this.state = 644;
                this.match(LPCParser.SQUARE_CLOSE);
                this.state = 645;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 2:
                localContext = new MappingKeylessInitializerContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 647;
                this.match(LPCParser.MAPPING_OPEN);
                this.state = 648;
                this.match(LPCParser.COLON);
                this.state = 649;
                this.expression();
                this.state = 650;
                this.match(LPCParser.SQUARE_CLOSE);
                this.state = 651;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 3:
                localContext = new MappingEmptyInitializerContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 653;
                this.match(LPCParser.MAPPING_OPEN);
                this.state = 654;
                this.match(LPCParser.SQUARE_CLOSE);
                this.state = 655;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public expression(): ExpressionContext {
        let localContext = new ExpressionContext(this.context, this.state);
        this.enterRule(localContext, 94, LPCParser.RULE_expression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 658;
            this.assignmentOrConditionalExpression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public commaableExpression(): CommaableExpressionContext {
        let localContext = new CommaableExpressionContext(this.context, this.state);
        this.enterRule(localContext, 96, LPCParser.RULE_commaableExpression);
        try {
            this.state = 662;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 71, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 660;
                this.inlineClosureExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 661;
                this.commaExpression();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public assignmentOperator(): AssignmentOperatorContext {
        let localContext = new AssignmentOperatorContext(this.context, this.state);
        this.enterRule(localContext, 98, LPCParser.RULE_assignmentOperator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 664;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & 8191) !== 0))) {
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
    public commaExpression(): CommaExpressionContext {
        let localContext = new CommaExpressionContext(this.context, this.state);
        this.enterRule(localContext, 100, LPCParser.RULE_commaExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 666;
            this.assignmentOrConditionalExpression();
            this.state = 671;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 667;
                localContext._op = this.match(LPCParser.COMMA);
                this.state = 668;
                this.assignmentOrConditionalExpression();
                }
                }
                this.state = 673;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public assignmentOrConditionalExpression(): AssignmentOrConditionalExpressionContext {
        let localContext = new AssignmentOrConditionalExpressionContext(this.context, this.state);
        this.enterRule(localContext, 102, LPCParser.RULE_assignmentOrConditionalExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 674;
            this.conditionalTernaryExpression();
            this.state = 680;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 73, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 675;
                    localContext._op = this.assignmentOperator();
                    this.state = 676;
                    this.conditionalTernaryExpression();
                    }
                    }
                }
                this.state = 682;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 73, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public conditionalTernaryExpression(): ConditionalTernaryExpressionContext {
        let localContext = new ConditionalTernaryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 104, LPCParser.RULE_conditionalTernaryExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 683;
            this.conditionalOrExpression();
            this.state = 689;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 74, this.context) ) {
            case 1:
                {
                this.state = 684;
                localContext._op = this.match(LPCParser.QUESTION);
                this.state = 685;
                this.expression();
                this.state = 686;
                this.match(LPCParser.COLON);
                this.state = 687;
                this.expression();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public conditionalOrExpression(): ConditionalOrExpressionContext {
        let localContext = new ConditionalOrExpressionContext(this.context, this.state);
        this.enterRule(localContext, 106, LPCParser.RULE_conditionalOrExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 691;
            this.conditionalAndExpression();
            this.state = 696;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 75, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 692;
                    localContext._op = this.match(LPCParser.OR_OR);
                    this.state = 693;
                    this.conditionalAndExpression();
                    }
                    }
                }
                this.state = 698;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 75, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public conditionalAndExpression(): ConditionalAndExpressionContext {
        let localContext = new ConditionalAndExpressionContext(this.context, this.state);
        this.enterRule(localContext, 108, LPCParser.RULE_conditionalAndExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 699;
            this.inclusiveOrExpression();
            this.state = 704;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 76, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 700;
                    localContext._op = this.match(LPCParser.AND_AND);
                    this.state = 701;
                    this.inclusiveOrExpression();
                    }
                    }
                }
                this.state = 706;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 76, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public inclusiveOrExpression(): InclusiveOrExpressionContext {
        let localContext = new InclusiveOrExpressionContext(this.context, this.state);
        this.enterRule(localContext, 110, LPCParser.RULE_inclusiveOrExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 707;
            this.exclusiveOrExpression();
            this.state = 712;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 77, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 708;
                    localContext._op = this.match(LPCParser.OR);
                    this.state = 709;
                    this.exclusiveOrExpression();
                    }
                    }
                }
                this.state = 714;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 77, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public exclusiveOrExpression(): ExclusiveOrExpressionContext {
        let localContext = new ExclusiveOrExpressionContext(this.context, this.state);
        this.enterRule(localContext, 112, LPCParser.RULE_exclusiveOrExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 715;
            this.andExpression();
            this.state = 720;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 78, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 716;
                    localContext._op = this.match(LPCParser.XOR);
                    this.state = 717;
                    this.andExpression();
                    }
                    }
                }
                this.state = 722;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 78, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public andExpression(): AndExpressionContext {
        let localContext = new AndExpressionContext(this.context, this.state);
        this.enterRule(localContext, 114, LPCParser.RULE_andExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 723;
            this.equalityExpression();
            this.state = 728;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 79, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 724;
                    localContext._op = this.match(LPCParser.AND);
                    this.state = 725;
                    this.equalityExpression();
                    }
                    }
                }
                this.state = 730;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 79, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public equalityExpression(): EqualityExpressionContext {
        let localContext = new EqualityExpressionContext(this.context, this.state);
        this.enterRule(localContext, 116, LPCParser.RULE_equalityExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 731;
            this.relationalExpression();
            this.state = 736;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 80, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 732;
                    localContext._op = this.tokenStream.LT(1);
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 26 || _la === 74 || _la === 75)) {
                        localContext._op = this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 733;
                    this.relationalExpression();
                    }
                    }
                }
                this.state = 738;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 80, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public relationalExpression(): RelationalExpressionContext {
        let localContext = new RelationalExpressionContext(this.context, this.state);
        this.enterRule(localContext, 118, LPCParser.RULE_relationalExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 739;
            this.shiftExpression();
            this.state = 744;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 81, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 740;
                    localContext._op = this.tokenStream.LT(1);
                    _la = this.tokenStream.LA(1);
                    if(!(((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 15) !== 0))) {
                        localContext._op = this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 741;
                    this.shiftExpression();
                    }
                    }
                }
                this.state = 746;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 81, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public shiftExpression(): ShiftExpressionContext {
        let localContext = new ShiftExpressionContext(this.context, this.state);
        this.enterRule(localContext, 120, LPCParser.RULE_shiftExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 747;
            this.additiveExpression();
            this.state = 752;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 82, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 748;
                    localContext._op = this.tokenStream.LT(1);
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 68 || _la === 69)) {
                        localContext._op = this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 749;
                    this.additiveExpression();
                    }
                    }
                }
                this.state = 754;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 82, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public additiveExpression(): AdditiveExpressionContext {
        let localContext = new AdditiveExpressionContext(this.context, this.state);
        this.enterRule(localContext, 122, LPCParser.RULE_additiveExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 755;
            this.multiplicativeExpression();
            this.state = 760;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 83, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 756;
                    localContext._op = this.tokenStream.LT(1);
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 61 || _la === 62)) {
                        localContext._op = this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 757;
                    this.multiplicativeExpression();
                    }
                    }
                }
                this.state = 762;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 83, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public multiplicativeExpression(): MultiplicativeExpressionContext {
        let localContext = new MultiplicativeExpressionContext(this.context, this.state);
        this.enterRule(localContext, 124, LPCParser.RULE_multiplicativeExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 763;
            this.unaryExpression();
            this.state = 768;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 84, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 764;
                    localContext._op = this.tokenStream.LT(1);
                    _la = this.tokenStream.LA(1);
                    if(!(((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 7) !== 0))) {
                        localContext._op = this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 765;
                    this.unaryExpression();
                    }
                    }
                }
                this.state = 770;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 84, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public unaryExpression(): UnaryExpressionContext {
        let localContext = new UnaryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 126, LPCParser.RULE_unaryExpression);
        let _la: number;
        try {
            this.state = 777;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 85, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 771;
                this.castExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 772;
                this.primaryExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 773;
                this.lambdaExpression();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 774;
                this.inlineClosureExpression();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 775;
                _la = this.tokenStream.LA(1);
                if(!(((((_la - 61)) & ~0x1F) === 0 && ((1 << (_la - 61)) & 819303) !== 0))) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 776;
                this.unaryExpression();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public primaryExpression(): PrimaryExpressionContext {
        let localContext = new PrimaryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 128, LPCParser.RULE_primaryExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 780;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 86, this.context) ) {
            case 1:
                {
                this.state = 779;
                localContext._super_ = this.inheritSuperExpression();
                }
                break;
            }
            this.state = 782;
            localContext._pe = this.primaryExpressionStart();
            this.state = 786;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 87, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 783;
                    this.bracketExpression();
                    }
                    }
                }
                this.state = 788;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 87, this.context);
            }
            this.state = 812;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 92, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 802;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case LPCParser.PAREN_OPEN:
                        {
                        this.state = 789;
                        this.methodInvocation();
                        }
                        break;
                    case LPCParser.INC:
                        {
                        this.state = 790;
                        this.match(LPCParser.INC);
                        }
                        break;
                    case LPCParser.DEC:
                        {
                        this.state = 791;
                        this.match(LPCParser.DEC);
                        }
                        break;
                    case LPCParser.ARROW:
                        {
                        {
                        this.state = 792;
                        this.match(LPCParser.ARROW);
                        this.state = 794;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 88, this.context) ) {
                        case 1:
                            {
                            this.state = 793;
                            localContext._target = this.callOtherTarget();
                            }
                            break;
                        }
                        this.state = 797;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 89, this.context) ) {
                        case 1:
                            {
                            this.state = 796;
                            localContext._invocation = this.methodInvocation();
                            }
                            break;
                        }
                        }
                        }
                        break;
                    case LPCParser.Identifier:
                        {
                        this.state = 799;
                        this.match(LPCParser.Identifier);
                        }
                        break;
                    case LPCParser.DOT:
                        {
                        {
                        this.state = 800;
                        this.match(LPCParser.DOT);
                        this.state = 801;
                        localContext._structMember = this.match(LPCParser.Identifier);
                        }
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    this.state = 807;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 91, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 804;
                            this.bracketExpression();
                            }
                            }
                        }
                        this.state = 809;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 91, this.context);
                    }
                    }
                    }
                }
                this.state = 814;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 92, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public primaryExpressionStart(): PrimaryExpressionStartContext {
        let localContext = new PrimaryExpressionStartContext(this.context, this.state);
        this.enterRule(localContext, 130, LPCParser.RULE_primaryExpressionStart);
        let _la: number;
        try {
            let alternative: number;
            this.state = 854;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 97, this.context) ) {
            case 1:
                localContext = new LiteralExpressionContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 815;
                this.literal();
                }
                break;
            case 2:
                localContext = new StringConcatExpressionContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 816;
                this.match(LPCParser.StringLiteral);
                this.state = 820;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 93, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 817;
                        this.match(LPCParser.StringLiteral);
                        }
                        }
                    }
                    this.state = 822;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 93, this.context);
                }
                }
                break;
            case 3:
                localContext = new CloneObjectExpressionContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 823;
                _la = this.tokenStream.LA(1);
                if(!(_la === 118 || _la === 119)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 824;
                this.match(LPCParser.PAREN_OPEN);
                {
                this.state = 825;
                (localContext as CloneObjectExpressionContext)._ob = this.expression();
                }
                this.state = 826;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 4:
                localContext = new IdentifierExpressionContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 828;
                this.validIdentifiers();
                }
                break;
            case 5:
                localContext = new StructInitializerExpressionContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 829;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 830;
                this.match(LPCParser.LT);
                this.state = 831;
                (localContext as StructInitializerExpressionContext)._structName = this.match(LPCParser.Identifier);
                this.state = 832;
                this.match(LPCParser.GT);
                this.state = 841;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 74449002) !== 0) || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 868221057) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 671088665) !== 0) || ((((_la - 112)) & ~0x1F) === 0 && ((1 << (_la - 112)) & 8695) !== 0)) {
                    {
                    this.state = 833;
                    this.structMemberInitializer();
                    this.state = 838;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 94, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 834;
                            this.match(LPCParser.COMMA);
                            this.state = 835;
                            this.structMemberInitializer();
                            }
                            }
                        }
                        this.state = 840;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 94, this.context);
                    }
                    }
                }

                this.state = 844;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 86) {
                    {
                    this.state = 843;
                    this.match(LPCParser.COMMA);
                    }
                }

                this.state = 846;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 6:
                localContext = new ParenExpressionContext(localContext);
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 847;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 848;
                this.commaableExpression();
                this.state = 849;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 7:
                localContext = new PrimaryArrayExpressionContext(localContext);
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 851;
                this.arrayExpression();
                }
                break;
            case 8:
                localContext = new PrimaryMappingExpressionContext(localContext);
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 852;
                this.mappingExpression();
                }
                break;
            case 9:
                localContext = new CatchExpressionContext(localContext);
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 853;
                this.catchExpr();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public validIdentifiers(): ValidIdentifiersContext {
        let localContext = new ValidIdentifiersContext(this.context, this.state);
        this.enterRule(localContext, 132, LPCParser.RULE_validIdentifiers);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 856;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 68157514) !== 0) || _la === 38 || _la === 45 || _la === 120)) {
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
    public catchExpr(): CatchExprContext {
        let localContext = new CatchExprContext(this.context, this.state);
        this.enterRule(localContext, 134, LPCParser.RULE_catchExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 858;
            this.match(LPCParser.CATCH);
            this.state = 859;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 860;
            this.expression();
            this.state = 865;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 861;
                this.match(LPCParser.COMMA);
                this.state = 862;
                this.expression();
                }
                }
                this.state = 867;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 872;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 85) {
                {
                {
                this.state = 868;
                this.match(LPCParser.SEMI);
                this.state = 869;
                this.match(LPCParser.Identifier);
                }
                }
                this.state = 874;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 875;
            this.match(LPCParser.PAREN_CLOSE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public inlineClosureExpression(): InlineClosureExpressionContext {
        let localContext = new InlineClosureExpressionContext(this.context, this.state);
        this.enterRule(localContext, 136, LPCParser.RULE_inlineClosureExpression);
        let _la: number;
        try {
            this.state = 900;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.PAREN_OPEN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 877;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 878;
                this.match(LPCParser.COLON);
                this.state = 886;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 101, this.context) ) {
                case 1:
                    {
                    this.state = 879;
                    this.expression();
                    }
                    break;
                case 2:
                    {
                    this.state = 883;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2768112366) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4152272887) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & 549907) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 4451861) !== 0)) {
                        {
                        {
                        this.state = 880;
                        this.statement();
                        }
                        }
                        this.state = 885;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    }
                    break;
                }
                this.state = 888;
                this.match(LPCParser.COLON);
                this.state = 889;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case LPCParser.FUNCTION:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 890;
                this.match(LPCParser.FUNCTION);
                this.state = 892;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2684485832) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33703) !== 0) || _la === 70) {
                    {
                    this.state = 891;
                    this.typeSpecifier();
                    }
                }

                this.state = 894;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 896;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2752643274) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 134259687) !== 0) || _la === 70 || _la === 120) {
                    {
                    this.state = 895;
                    this.parameterList();
                    }
                }

                this.state = 898;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 899;
                this.block();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public bracketExpression(): BracketExpressionContext {
        let localContext = new BracketExpressionContext(this.context, this.state);
        this.enterRule(localContext, 138, LPCParser.RULE_bracketExpression);
        let _la: number;
        try {
            this.state = 928;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 111, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 902;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 904;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 70) {
                    {
                    this.state = 903;
                    this.match(LPCParser.LT);
                    }
                }

                this.state = 906;
                this.expression();
                this.state = 909;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 86) {
                    {
                    this.state = 907;
                    this.match(LPCParser.COMMA);
                    this.state = 908;
                    this.expression();
                    }
                }

                this.state = 911;
                this.match(LPCParser.SQUARE_CLOSE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 913;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 915;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 70) {
                    {
                    this.state = 914;
                    this.match(LPCParser.LT);
                    }
                }

                this.state = 918;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 74449002) !== 0) || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 868221057) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 671088665) !== 0) || ((((_la - 112)) & ~0x1F) === 0 && ((1 << (_la - 112)) & 8695) !== 0)) {
                    {
                    this.state = 917;
                    this.expression();
                    }
                }

                this.state = 920;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 922;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 70) {
                    {
                    this.state = 921;
                    this.match(LPCParser.LT);
                    }
                }

                this.state = 925;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 74449002) !== 0) || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 868221057) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 671088665) !== 0) || ((((_la - 112)) & ~0x1F) === 0 && ((1 << (_la - 112)) & 8695) !== 0)) {
                    {
                    this.state = 924;
                    this.expression();
                    }
                }

                this.state = 927;
                this.match(LPCParser.SQUARE_CLOSE);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public lambdaArrayIndexor(): LambdaArrayIndexorContext {
        let localContext = new LambdaArrayIndexorContext(this.context, this.state);
        this.enterRule(localContext, 140, LPCParser.RULE_lambdaArrayIndexor);
        try {
            this.state = 943;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 115, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 930;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 931;
                this.match(LPCParser.LT);
                this.state = 933;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 112, this.context) ) {
                case 1:
                    {
                    this.state = 932;
                    this.match(LPCParser.DOUBLEDOT);
                    }
                    break;
                }
                this.state = 936;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 113, this.context) ) {
                case 1:
                    {
                    this.state = 935;
                    this.match(LPCParser.LT);
                    }
                    break;
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 938;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 939;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 941;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 114, this.context) ) {
                case 1:
                    {
                    this.state = 940;
                    this.match(LPCParser.LT);
                    }
                    break;
                }
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public lambdaExpression(): LambdaExpressionContext {
        let localContext = new LambdaExpressionContext(this.context, this.state);
        this.enterRule(localContext, 142, LPCParser.RULE_lambdaExpression);
        let _la: number;
        try {
            this.state = 965;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 119, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 946;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 22) {
                    {
                    this.state = 945;
                    this.match(LPCParser.HASH);
                    }
                }

                this.state = 948;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 949;
                localContext._fn = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!(((((_la - 118)) & ~0x1F) === 0 && ((1 << (_la - 118)) & 7) !== 0))) {
                    localContext._fn = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 950;
                this.match(LPCParser.HASH);
                this.state = 951;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 963;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 118, this.context) ) {
                case 1:
                    {
                    this.state = 952;
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 36 || _la === 49)) {
                    this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    }
                    break;
                case 2:
                    {
                    {
                    this.state = 953;
                    this.bracketExpression();
                    }
                    }
                    break;
                case 3:
                    {
                    {
                    this.state = 954;
                    this.lambdaArrayIndexor();
                    }
                    }
                    break;
                case 4:
                    {
                    this.state = 958;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 117, this.context) ) {
                    case 1:
                        {
                        this.state = 955;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 61)) & ~0x1F) === 0 && ((1 << (_la - 61)) & 3799515039) !== 0) || ((((_la - 93)) & ~0x1F) === 0 && ((1 << (_la - 93)) & 65791) !== 0))) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        }
                        break;
                    case 2:
                        {
                        this.state = 956;
                        this.match(LPCParser.QUESTION);
                        this.state = 957;
                        this.match(LPCParser.NOT);
                        }
                        break;
                    }
                    }
                    break;
                case 5:
                    {
                    {
                    this.state = 960;
                    this.match(LPCParser.PAREN_OPEN);
                    this.state = 961;
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 107 || _la === 109)) {
                    this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    }
                    }
                    break;
                case 6:
                    {
                    {
                    this.state = 962;
                    this.expression();
                    }
                    }
                    break;
                }
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public castExpression(): CastExpressionContext {
        let localContext = new CastExpressionContext(this.context, this.state);
        this.enterRule(localContext, 144, LPCParser.RULE_castExpression);
        let _la: number;
        try {
            this.state = 993;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 121, this.context) ) {
            case 1:
                localContext = new PrimitiveTypeCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 967;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 968;
                this.typeSpecifier();
                this.state = 969;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 970;
                this.unaryExpression();
                }
                break;
            case 2:
                localContext = new DeclarativeTypeCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 972;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 973;
                this.match(LPCParser.CURLY_OPEN);
                this.state = 974;
                this.typeSpecifier();
                this.state = 975;
                this.match(LPCParser.CURLY_CLOSE);
                this.state = 976;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 977;
                this.unaryExpression();
                }
                break;
            case 3:
                localContext = new StructCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 979;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 980;
                this.match(LPCParser.LT);
                this.state = 981;
                this.match(LPCParser.Identifier);
                this.state = 982;
                this.match(LPCParser.GT);
                this.state = 983;
                this.unaryExpression();
                this.state = 988;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 86) {
                    {
                    {
                    this.state = 984;
                    this.match(LPCParser.COMMA);
                    this.state = 985;
                    this.unaryExpression();
                    }
                    }
                    this.state = 990;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 991;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public expressionList(): ExpressionListContext {
        let localContext = new ExpressionListContext(this.context, this.state);
        this.enterRule(localContext, 146, LPCParser.RULE_expressionList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 995;
            this.expression();
            this.state = 1000;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 996;
                this.match(LPCParser.COMMA);
                this.state = 997;
                this.expression();
                }
                }
                this.state = 1002;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
        this.enterRule(localContext, 148, LPCParser.RULE_statement);
        try {
            this.state = 1013;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 123, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1003;
                this.block();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1004;
                this.match(LPCParser.SEMI);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1005;
                this.selectionStatement();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1006;
                this.iterationStatement();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1007;
                this.jumpStatement();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1008;
                this.variableDeclarationStatement();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1009;
                this.includePreprocessorDirective();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1010;
                this.commaableExpression();
                this.state = 1011;
                this.match(LPCParser.SEMI);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
        this.enterRule(localContext, 150, LPCParser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1015;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 1019;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2768112366) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4152272887) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & 549907) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 4451861) !== 0)) {
                {
                {
                this.state = 1016;
                this.statement();
                }
                }
                this.state = 1021;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1022;
            this.match(LPCParser.CURLY_CLOSE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public selectionStatement(): SelectionStatementContext {
        let localContext = new SelectionStatementContext(this.context, this.state);
        this.enterRule(localContext, 152, LPCParser.RULE_selectionStatement);
        try {
            this.state = 1026;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.IF:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1024;
                this.ifStatement();
                }
                break;
            case LPCParser.SWITCH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1025;
                this.switchStatement();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public elseIfExpression(): ElseIfExpressionContext {
        let localContext = new ElseIfExpressionContext(this.context, this.state);
        this.enterRule(localContext, 154, LPCParser.RULE_elseIfExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1028;
            this.match(LPCParser.ELSE);
            this.state = 1029;
            this.match(LPCParser.IF);
            this.state = 1030;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 1031;
            this.expression();
            this.state = 1032;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 1033;
            this.statement();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public elseExpression(): ElseExpressionContext {
        let localContext = new ElseExpressionContext(this.context, this.state);
        this.enterRule(localContext, 156, LPCParser.RULE_elseExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1035;
            this.match(LPCParser.ELSE);
            this.state = 1036;
            this.statement();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public ifExpression(): IfExpressionContext {
        let localContext = new IfExpressionContext(this.context, this.state);
        this.enterRule(localContext, 158, LPCParser.RULE_ifExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1038;
            this.match(LPCParser.IF);
            this.state = 1039;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 1040;
            this.expression();
            this.state = 1041;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 1042;
            this.statement();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public ifStatement(): IfStatementContext {
        let localContext = new IfStatementContext(this.context, this.state);
        this.enterRule(localContext, 160, LPCParser.RULE_ifStatement);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1044;
            this.ifExpression();
            this.state = 1048;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 126, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1045;
                    this.elseIfExpression();
                    }
                    }
                }
                this.state = 1050;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 126, this.context);
            }
            this.state = 1052;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 127, this.context) ) {
            case 1:
                {
                this.state = 1051;
                this.elseExpression();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public switchStatement(): SwitchStatementContext {
        let localContext = new SwitchStatementContext(this.context, this.state);
        this.enterRule(localContext, 162, LPCParser.RULE_switchStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1054;
            this.match(LPCParser.SWITCH);
            this.state = 1055;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 1056;
            this.expression();
            this.state = 1057;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 1058;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 1063;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 4 || _la === 10) {
                {
                this.state = 1061;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.CASE:
                    {
                    this.state = 1059;
                    this.caseStatement();
                    }
                    break;
                case LPCParser.DEFAULT:
                    {
                    this.state = 1060;
                    this.defaultStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 1065;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1066;
            this.match(LPCParser.CURLY_CLOSE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public caseExpression(): CaseExpressionContext {
        let localContext = new CaseExpressionContext(this.context, this.state);
        this.enterRule(localContext, 164, LPCParser.RULE_caseExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1068;
            this.caseCondition();
            this.state = 1074;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 61)) & ~0x1F) === 0 && ((1 << (_la - 61)) & 15) !== 0)) {
                {
                {
                this.state = 1069;
                this.caseOperators();
                this.state = 1070;
                this.caseCondition();
                }
                }
                this.state = 1076;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1087;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 88) {
                {
                this.state = 1077;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 1078;
                this.caseCondition();
                this.state = 1084;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 61)) & ~0x1F) === 0 && ((1 << (_la - 61)) & 15) !== 0)) {
                    {
                    {
                    this.state = 1079;
                    this.caseOperators();
                    this.state = 1080;
                    this.caseCondition();
                    }
                    }
                    this.state = 1086;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public caseOperators(): CaseOperatorsContext {
        let localContext = new CaseOperatorsContext(this.context, this.state);
        this.enterRule(localContext, 166, LPCParser.RULE_caseOperators);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1089;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 61)) & ~0x1F) === 0 && ((1 << (_la - 61)) & 15) !== 0))) {
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
    public caseCondition(): CaseConditionContext {
        let localContext = new CaseConditionContext(this.context, this.state);
        this.enterRule(localContext, 168, LPCParser.RULE_caseCondition);
        let _la: number;
        try {
            this.state = 1099;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.MINUS:
            case LPCParser.IntegerConstant:
            case LPCParser.HexIntConstant:
            case LPCParser.StringLiteral:
            case LPCParser.CharacterConstant:
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1092;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 62) {
                    {
                    this.state = 1091;
                    this.match(LPCParser.MINUS);
                    }
                }

                this.state = 1094;
                _la = this.tokenStream.LA(1);
                if(!(((((_la - 112)) & ~0x1F) === 0 && ((1 << (_la - 112)) & 309) !== 0))) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                break;
            case LPCParser.PAREN_OPEN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1095;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 1096;
                this.shiftExpression();
                this.state = 1097;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public caseStatement(): CaseStatementContext {
        let localContext = new CaseStatementContext(this.context, this.state);
        this.enterRule(localContext, 170, LPCParser.RULE_caseStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1101;
            this.match(LPCParser.CASE);
            this.state = 1102;
            this.caseExpression();
            this.state = 1103;
            this.match(LPCParser.COLON);
            this.state = 1107;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2768112366) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4152272887) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & 549907) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 4451861) !== 0)) {
                {
                {
                this.state = 1104;
                this.statement();
                }
                }
                this.state = 1109;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public defaultStatement(): DefaultStatementContext {
        let localContext = new DefaultStatementContext(this.context, this.state);
        this.enterRule(localContext, 172, LPCParser.RULE_defaultStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1110;
            this.match(LPCParser.DEFAULT);
            this.state = 1111;
            this.match(LPCParser.COLON);
            this.state = 1115;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2768112366) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4152272887) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & 549907) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 4451861) !== 0)) {
                {
                {
                this.state = 1112;
                this.statement();
                }
                }
                this.state = 1117;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public iterationStatement(): IterationStatementContext {
        let localContext = new IterationStatementContext(this.context, this.state);
        this.enterRule(localContext, 174, LPCParser.RULE_iterationStatement);
        try {
            this.state = 1150;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.WHILE:
                localContext = new WhileStatementContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1118;
                this.match(LPCParser.WHILE);
                this.state = 1119;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 1120;
                this.expression();
                this.state = 1121;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 1124;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 137, this.context) ) {
                case 1:
                    {
                    this.state = 1122;
                    this.statement();
                    }
                    break;
                case 2:
                    {
                    this.state = 1123;
                    this.match(LPCParser.SEMI);
                    }
                    break;
                }
                }
                break;
            case LPCParser.DO:
                localContext = new DoWhileStatementContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1126;
                this.match(LPCParser.DO);
                this.state = 1127;
                this.statement();
                this.state = 1128;
                this.match(LPCParser.WHILE);
                this.state = 1129;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 1130;
                this.expression();
                this.state = 1131;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 1132;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.FOR:
                localContext = new ForStatementContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1134;
                this.match(LPCParser.FOR);
                this.state = 1135;
                this.match(LPCParser.PAREN_OPEN);
                {
                this.state = 1136;
                this.forRangeExpression();
                }
                this.state = 1137;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 1140;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 138, this.context) ) {
                case 1:
                    {
                    this.state = 1138;
                    this.statement();
                    }
                    break;
                case 2:
                    {
                    this.state = 1139;
                    this.match(LPCParser.SEMI);
                    }
                    break;
                }
                }
                break;
            case LPCParser.FOREACH:
                localContext = new ForEachStatementContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1142;
                this.match(LPCParser.FOREACH);
                this.state = 1143;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 1144;
                this.foreachRangeExpression();
                this.state = 1145;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 1148;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 139, this.context) ) {
                case 1:
                    {
                    this.state = 1146;
                    this.statement();
                    }
                    break;
                case 2:
                    {
                    this.state = 1147;
                    this.match(LPCParser.SEMI);
                    }
                    break;
                }
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public forRangeExpression(): ForRangeExpressionContext {
        let localContext = new ForRangeExpressionContext(this.context, this.state);
        this.enterRule(localContext, 176, LPCParser.RULE_forRangeExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1160;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2758934762) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4026573671) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & 25603) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 4451845) !== 0)) {
                {
                this.state = 1152;
                this.forVariable();
                this.state = 1157;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 86) {
                    {
                    {
                    this.state = 1153;
                    this.match(LPCParser.COMMA);
                    this.state = 1154;
                    this.forVariable();
                    }
                    }
                    this.state = 1159;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 1162;
            this.match(LPCParser.SEMI);
            this.state = 1164;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 74449002) !== 0) || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 868221057) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 671088665) !== 0) || ((((_la - 112)) & ~0x1F) === 0 && ((1 << (_la - 112)) & 8695) !== 0)) {
                {
                this.state = 1163;
                this.expression();
                }
            }

            this.state = 1166;
            this.match(LPCParser.SEMI);
            this.state = 1168;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 74449002) !== 0) || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 868221057) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 671088665) !== 0) || ((((_la - 112)) & ~0x1F) === 0 && ((1 << (_la - 112)) & 8695) !== 0)) {
                {
                this.state = 1167;
                this.expression();
                }
            }

            this.state = 1174;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 1170;
                this.match(LPCParser.COMMA);
                this.state = 1171;
                this.expression();
                }
                }
                this.state = 1176;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public foreachRangeExpression(): ForeachRangeExpressionContext {
        let localContext = new ForeachRangeExpressionContext(this.context, this.state);
        this.enterRule(localContext, 178, LPCParser.RULE_foreachRangeExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1177;
            this.forEachVariable();
            this.state = 1182;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 1178;
                this.match(LPCParser.COMMA);
                this.state = 1179;
                this.forEachVariable();
                }
                }
                this.state = 1184;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1185;
            _la = this.tokenStream.LA(1);
            if(!(_la === 26 || _la === 84)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1186;
            this.expression();
            this.state = 1189;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 88) {
                {
                this.state = 1187;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 1188;
                this.expression();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public forVariable(): ForVariableContext {
        let localContext = new ForVariableContext(this.context, this.state);
        this.enterRule(localContext, 180, LPCParser.RULE_forVariable);
        try {
            this.state = 1202;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 150, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1192;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 148, this.context) ) {
                case 1:
                    {
                    this.state = 1191;
                    this.primitiveTypeSpecifier();
                    }
                    break;
                }
                this.state = 1194;
                this.variableDeclarator();
                this.state = 1199;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.ASSIGN:
                    {
                    this.state = 1195;
                    this.match(LPCParser.ASSIGN);
                    this.state = 1196;
                    this.variableInitializer();
                    }
                    break;
                case LPCParser.INC:
                    {
                    this.state = 1197;
                    this.match(LPCParser.INC);
                    }
                    break;
                case LPCParser.DEC:
                    {
                    this.state = 1198;
                    this.match(LPCParser.DEC);
                    }
                    break;
                case LPCParser.SEMI:
                case LPCParser.COMMA:
                    break;
                default:
                    break;
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1201;
                this.expression();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public forEachVariable(): ForEachVariableContext {
        let localContext = new ForEachVariableContext(this.context, this.state);
        this.enterRule(localContext, 182, LPCParser.RULE_forEachVariable);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1205;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 151, this.context) ) {
            case 1:
                {
                this.state = 1204;
                this.typeSpecifier();
                }
                break;
            }
            this.state = 1207;
            this.variableDeclarator();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
        this.enterRule(localContext, 184, LPCParser.RULE_returnStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1209;
            this.match(LPCParser.RETURN);
            this.state = 1211;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 74449002) !== 0) || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 868221057) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 671088665) !== 0) || ((((_la - 112)) & ~0x1F) === 0 && ((1 << (_la - 112)) & 8695) !== 0)) {
                {
                this.state = 1210;
                this.commaableExpression();
                }
            }

            this.state = 1213;
            this.match(LPCParser.SEMI);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public jumpStatement(): JumpStatementContext {
        let localContext = new JumpStatementContext(this.context, this.state);
        this.enterRule(localContext, 186, LPCParser.RULE_jumpStatement);
        try {
            this.state = 1220;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BREAK:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1215;
                this.match(LPCParser.BREAK);
                this.state = 1216;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.CONTINUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1217;
                this.match(LPCParser.CONTINUE);
                this.state = 1218;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.RETURN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1219;
                this.returnStatement();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public callOtherTarget(): CallOtherTargetContext {
        let localContext = new CallOtherTargetContext(this.context, this.state);
        this.enterRule(localContext, 188, LPCParser.RULE_callOtherTarget);
        try {
            this.state = 1228;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1222;
                this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.PAREN_OPEN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1223;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 1224;
                this.expression();
                this.state = 1225;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1227;
                this.match(LPCParser.StringLiteral);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public literal(): LiteralContext {
        let localContext = new LiteralContext(this.context, this.state);
        this.enterRule(localContext, 190, LPCParser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1230;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 112)) & ~0x1F) === 0 && ((1 << (_la - 112)) & 39) !== 0))) {
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
        this.enterRule(localContext, 192, LPCParser.RULE_argument);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1233;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 155, this.context) ) {
            case 1:
                {
                this.state = 1232;
                this.match(LPCParser.AND);
                }
                break;
            }
            this.state = 1235;
            this.expression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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
    public argumentList(): ArgumentListContext {
        let localContext = new ArgumentListContext(this.context, this.state);
        this.enterRule(localContext, 194, LPCParser.RULE_argumentList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1237;
            this.argument();
            this.state = 1244;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 86) {
                {
                {
                this.state = 1238;
                this.match(LPCParser.COMMA);
                this.state = 1240;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 74449002) !== 0) || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 868221057) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 671088665) !== 0) || ((((_la - 112)) & ~0x1F) === 0 && ((1 << (_la - 112)) & 8695) !== 0)) {
                    {
                    this.state = 1239;
                    this.argument();
                    }
                }

                }
                }
                this.state = 1246;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1248;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 87) {
                {
                this.state = 1247;
                this.match(LPCParser.TRIPPLEDOT);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
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

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 7:
            return this.directiveIfTestExpression_sempred(localContext as DirectiveIfTestExpressionContext, predIndex);
        case 21:
            return this.inheritFile_sempred(localContext as InheritFileContext, predIndex);
        }
        return true;
    }
    private directiveIfTestExpression_sempred(localContext: DirectiveIfTestExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private inheritFile_sempred(localContext: InheritFileContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 1:
            return this.precpred(this.context, 1);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,128,1251,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
        7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,
        13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
        20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,
        26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,
        33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,
        39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
        46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,
        52,2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,
        59,7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,
        65,2,66,7,66,2,67,7,67,2,68,7,68,2,69,7,69,2,70,7,70,2,71,7,71,2,
        72,7,72,2,73,7,73,2,74,7,74,2,75,7,75,2,76,7,76,2,77,7,77,2,78,7,
        78,2,79,7,79,2,80,7,80,2,81,7,81,2,82,7,82,2,83,7,83,2,84,7,84,2,
        85,7,85,2,86,7,86,2,87,7,87,2,88,7,88,2,89,7,89,2,90,7,90,2,91,7,
        91,2,92,7,92,2,93,7,93,2,94,7,94,2,95,7,95,2,96,7,96,2,97,7,97,1,
        0,1,0,1,0,5,0,200,8,0,10,0,12,0,203,9,0,1,0,1,0,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,218,8,1,10,1,12,1,221,9,1,3,1,223,
        8,1,1,2,1,2,1,2,1,2,1,3,1,3,1,3,1,4,1,4,1,4,3,4,235,8,4,1,4,1,4,
        1,4,1,4,1,4,1,4,1,4,3,4,244,8,4,1,5,1,5,1,6,1,6,1,7,1,7,3,7,252,
        8,7,1,7,1,7,1,7,1,7,1,7,4,7,259,8,7,11,7,12,7,260,5,7,263,8,7,10,
        7,12,7,266,9,7,1,8,1,8,1,8,1,8,3,8,272,8,8,1,8,1,8,1,8,3,8,277,8,
        8,1,9,1,9,1,9,1,9,3,9,283,8,9,1,10,1,10,1,10,5,10,288,8,10,10,10,
        12,10,291,9,10,1,10,1,10,3,10,295,8,10,1,11,1,11,1,11,1,11,5,11,
        301,8,11,10,11,12,11,304,9,11,1,11,1,11,1,12,1,12,1,13,1,13,1,14,
        1,14,1,14,5,14,315,8,14,10,14,12,14,318,9,14,1,14,1,14,1,15,1,15,
        1,15,5,15,325,8,15,10,15,12,15,328,9,15,1,15,3,15,331,8,15,1,16,
        1,16,1,17,1,17,1,17,4,17,338,8,17,11,17,12,17,339,3,17,342,8,17,
        1,17,5,17,345,8,17,10,17,12,17,348,9,17,1,17,3,17,351,8,17,1,17,
        3,17,354,8,17,1,17,1,17,1,18,4,18,359,8,18,11,18,12,18,360,1,18,
        1,18,1,18,4,18,366,8,18,11,18,12,18,367,1,18,1,18,3,18,372,8,18,
        1,19,1,19,1,19,1,20,1,20,1,21,1,21,1,21,1,21,1,21,1,21,1,21,3,21,
        386,8,21,1,21,1,21,3,21,390,8,21,1,21,5,21,393,8,21,10,21,12,21,
        396,9,21,1,22,3,22,399,8,22,1,22,1,22,1,23,1,23,1,23,1,23,3,23,407,
        8,23,1,24,1,24,1,25,5,25,412,8,25,10,25,12,25,415,9,25,1,25,3,25,
        418,8,25,1,25,1,25,1,25,3,25,423,8,25,1,25,1,25,1,26,1,26,1,26,1,
        27,1,27,1,27,1,28,1,28,1,28,5,28,436,8,28,10,28,12,28,439,9,28,1,
        28,3,28,442,8,28,1,29,3,29,445,8,29,1,29,3,29,448,8,29,1,29,1,29,
        1,29,3,29,453,8,29,1,29,1,29,1,29,3,29,458,8,29,1,29,3,29,461,8,
        29,1,30,1,30,1,30,1,30,1,30,3,30,468,8,30,1,30,1,30,5,30,472,8,30,
        10,30,12,30,475,9,30,1,30,1,30,1,30,1,31,1,31,1,31,1,31,1,32,1,32,
        1,32,1,32,3,32,488,8,32,1,33,1,33,1,34,1,34,1,34,1,35,5,35,496,8,
        35,10,35,12,35,499,9,35,1,35,3,35,502,8,35,1,35,3,35,505,8,35,1,
        35,1,35,1,35,5,35,510,8,35,10,35,12,35,513,9,35,1,35,5,35,516,8,
        35,10,35,12,35,519,9,35,1,35,1,35,1,35,1,35,1,35,3,35,526,8,35,1,
        35,5,35,529,8,35,10,35,12,35,532,9,35,3,35,534,8,35,1,36,1,36,1,
        36,3,36,539,8,36,1,37,3,37,542,8,37,1,37,1,37,1,38,1,38,1,38,3,38,
        549,8,38,1,39,1,39,1,40,1,40,3,40,555,8,40,1,40,1,40,1,41,1,41,1,
        41,3,41,562,8,41,1,42,1,42,1,43,1,43,3,43,568,8,43,1,43,1,43,5,43,
        572,8,43,10,43,12,43,575,9,43,1,43,1,43,1,43,1,43,5,43,581,8,43,
        10,43,12,43,584,9,43,1,43,1,43,5,43,588,8,43,10,43,12,43,591,9,43,
        1,43,1,43,1,43,5,43,596,8,43,10,43,12,43,599,9,43,3,43,601,8,43,
        1,44,1,44,1,44,1,44,1,44,5,44,608,8,44,10,44,12,44,611,9,44,3,44,
        613,8,44,1,44,3,44,616,8,44,1,44,1,44,1,44,1,45,1,45,1,45,1,45,1,
        45,5,45,626,8,45,10,45,12,45,629,9,45,3,45,631,8,45,1,46,1,46,1,
        46,1,46,5,46,637,8,46,10,46,12,46,640,9,46,1,46,3,46,643,8,46,1,
        46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,3,46,657,
        8,46,1,47,1,47,1,48,1,48,3,48,663,8,48,1,49,1,49,1,50,1,50,1,50,
        5,50,670,8,50,10,50,12,50,673,9,50,1,51,1,51,1,51,1,51,5,51,679,
        8,51,10,51,12,51,682,9,51,1,52,1,52,1,52,1,52,1,52,1,52,3,52,690,
        8,52,1,53,1,53,1,53,5,53,695,8,53,10,53,12,53,698,9,53,1,54,1,54,
        1,54,5,54,703,8,54,10,54,12,54,706,9,54,1,55,1,55,1,55,5,55,711,
        8,55,10,55,12,55,714,9,55,1,56,1,56,1,56,5,56,719,8,56,10,56,12,
        56,722,9,56,1,57,1,57,1,57,5,57,727,8,57,10,57,12,57,730,9,57,1,
        58,1,58,1,58,5,58,735,8,58,10,58,12,58,738,9,58,1,59,1,59,1,59,5,
        59,743,8,59,10,59,12,59,746,9,59,1,60,1,60,1,60,5,60,751,8,60,10,
        60,12,60,754,9,60,1,61,1,61,1,61,5,61,759,8,61,10,61,12,61,762,9,
        61,1,62,1,62,1,62,5,62,767,8,62,10,62,12,62,770,9,62,1,63,1,63,1,
        63,1,63,1,63,1,63,3,63,778,8,63,1,64,3,64,781,8,64,1,64,1,64,5,64,
        785,8,64,10,64,12,64,788,9,64,1,64,1,64,1,64,1,64,1,64,3,64,795,
        8,64,1,64,3,64,798,8,64,1,64,1,64,1,64,3,64,803,8,64,1,64,5,64,806,
        8,64,10,64,12,64,809,9,64,5,64,811,8,64,10,64,12,64,814,9,64,1,65,
        1,65,1,65,5,65,819,8,65,10,65,12,65,822,9,65,1,65,1,65,1,65,1,65,
        1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,5,65,837,8,65,10,65,
        12,65,840,9,65,3,65,842,8,65,1,65,3,65,845,8,65,1,65,1,65,1,65,1,
        65,1,65,1,65,1,65,1,65,3,65,855,8,65,1,66,1,66,1,67,1,67,1,67,1,
        67,1,67,5,67,864,8,67,10,67,12,67,867,9,67,1,67,1,67,5,67,871,8,
        67,10,67,12,67,874,9,67,1,67,1,67,1,68,1,68,1,68,1,68,5,68,882,8,
        68,10,68,12,68,885,9,68,3,68,887,8,68,1,68,1,68,1,68,1,68,3,68,893,
        8,68,1,68,1,68,3,68,897,8,68,1,68,1,68,3,68,901,8,68,1,69,1,69,3,
        69,905,8,69,1,69,1,69,1,69,3,69,910,8,69,1,69,1,69,1,69,1,69,3,69,
        916,8,69,1,69,3,69,919,8,69,1,69,1,69,3,69,923,8,69,1,69,3,69,926,
        8,69,1,69,3,69,929,8,69,1,70,1,70,1,70,3,70,934,8,70,1,70,3,70,937,
        8,70,1,70,1,70,1,70,3,70,942,8,70,3,70,944,8,70,1,71,3,71,947,8,
        71,1,71,1,71,1,71,1,71,1,71,1,71,1,71,1,71,1,71,1,71,3,71,959,8,
        71,1,71,1,71,1,71,3,71,964,8,71,3,71,966,8,71,1,72,1,72,1,72,1,72,
        1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,
        1,72,1,72,5,72,987,8,72,10,72,12,72,990,9,72,1,72,1,72,3,72,994,
        8,72,1,73,1,73,1,73,5,73,999,8,73,10,73,12,73,1002,9,73,1,74,1,74,
        1,74,1,74,1,74,1,74,1,74,1,74,1,74,1,74,3,74,1014,8,74,1,75,1,75,
        5,75,1018,8,75,10,75,12,75,1021,9,75,1,75,1,75,1,76,1,76,3,76,1027,
        8,76,1,77,1,77,1,77,1,77,1,77,1,77,1,77,1,78,1,78,1,78,1,79,1,79,
        1,79,1,79,1,79,1,79,1,80,1,80,5,80,1047,8,80,10,80,12,80,1050,9,
        80,1,80,3,80,1053,8,80,1,81,1,81,1,81,1,81,1,81,1,81,1,81,5,81,1062,
        8,81,10,81,12,81,1065,9,81,1,81,1,81,1,82,1,82,1,82,1,82,5,82,1073,
        8,82,10,82,12,82,1076,9,82,1,82,1,82,1,82,1,82,1,82,5,82,1083,8,
        82,10,82,12,82,1086,9,82,3,82,1088,8,82,1,83,1,83,1,84,3,84,1093,
        8,84,1,84,1,84,1,84,1,84,1,84,3,84,1100,8,84,1,85,1,85,1,85,1,85,
        5,85,1106,8,85,10,85,12,85,1109,9,85,1,86,1,86,1,86,5,86,1114,8,
        86,10,86,12,86,1117,9,86,1,87,1,87,1,87,1,87,1,87,1,87,3,87,1125,
        8,87,1,87,1,87,1,87,1,87,1,87,1,87,1,87,1,87,1,87,1,87,1,87,1,87,
        1,87,1,87,3,87,1141,8,87,1,87,1,87,1,87,1,87,1,87,1,87,3,87,1149,
        8,87,3,87,1151,8,87,1,88,1,88,1,88,5,88,1156,8,88,10,88,12,88,1159,
        9,88,3,88,1161,8,88,1,88,1,88,3,88,1165,8,88,1,88,1,88,3,88,1169,
        8,88,1,88,1,88,5,88,1173,8,88,10,88,12,88,1176,9,88,1,89,1,89,1,
        89,5,89,1181,8,89,10,89,12,89,1184,9,89,1,89,1,89,1,89,1,89,3,89,
        1190,8,89,1,90,3,90,1193,8,90,1,90,1,90,1,90,1,90,1,90,3,90,1200,
        8,90,1,90,3,90,1203,8,90,1,91,3,91,1206,8,91,1,91,1,91,1,92,1,92,
        3,92,1212,8,92,1,92,1,92,1,93,1,93,1,93,1,93,1,93,3,93,1221,8,93,
        1,94,1,94,1,94,1,94,1,94,1,94,3,94,1229,8,94,1,95,1,95,1,96,3,96,
        1234,8,96,1,96,1,96,1,97,1,97,1,97,3,97,1241,8,97,5,97,1243,8,97,
        10,97,12,97,1246,9,97,1,97,3,97,1249,8,97,1,97,0,2,14,42,98,0,2,
        4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,
        50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,
        94,96,98,100,102,104,106,108,110,112,114,116,118,120,122,124,126,
        128,130,132,134,136,138,140,142,144,146,148,150,152,154,156,158,
        160,162,164,166,168,170,172,174,176,178,180,182,184,186,188,190,
        192,194,0,30,2,0,14,14,23,23,2,0,13,13,15,15,1,0,24,25,2,0,70,75,
        81,82,3,0,112,112,116,116,120,120,3,0,64,64,89,89,120,120,2,0,38,
        38,45,45,1,0,51,55,2,0,116,116,120,120,2,0,50,56,58,59,2,0,50,54,
        56,58,2,0,1,1,63,63,8,0,3,3,6,7,17,17,29,29,31,34,37,37,40,41,47,
        47,1,0,90,102,2,0,26,26,74,75,1,0,70,73,1,0,68,69,1,0,61,62,1,0,
        63,65,4,0,61,63,66,67,76,76,79,80,1,0,118,119,8,0,1,1,3,3,6,6,20,
        20,26,26,38,38,45,45,120,120,1,0,118,120,2,0,36,36,49,49,6,0,61,
        65,68,79,81,83,86,86,90,100,109,109,2,0,107,107,109,109,1,0,61,64,
        4,0,112,112,114,114,116,117,120,120,2,0,26,26,84,84,2,0,112,114,
        117,117,1358,0,201,1,0,0,0,2,222,1,0,0,0,4,224,1,0,0,0,6,228,1,0,
        0,0,8,243,1,0,0,0,10,245,1,0,0,0,12,247,1,0,0,0,14,249,1,0,0,0,16,
        276,1,0,0,0,18,282,1,0,0,0,20,294,1,0,0,0,22,296,1,0,0,0,24,307,
        1,0,0,0,26,309,1,0,0,0,28,311,1,0,0,0,30,330,1,0,0,0,32,332,1,0,
        0,0,34,353,1,0,0,0,36,371,1,0,0,0,38,373,1,0,0,0,40,376,1,0,0,0,
        42,385,1,0,0,0,44,398,1,0,0,0,46,406,1,0,0,0,48,408,1,0,0,0,50,413,
        1,0,0,0,52,426,1,0,0,0,54,429,1,0,0,0,56,441,1,0,0,0,58,460,1,0,
        0,0,60,462,1,0,0,0,62,479,1,0,0,0,64,487,1,0,0,0,66,489,1,0,0,0,
        68,491,1,0,0,0,70,533,1,0,0,0,72,535,1,0,0,0,74,541,1,0,0,0,76,548,
        1,0,0,0,78,550,1,0,0,0,80,552,1,0,0,0,82,558,1,0,0,0,84,563,1,0,
        0,0,86,600,1,0,0,0,88,602,1,0,0,0,90,620,1,0,0,0,92,656,1,0,0,0,
        94,658,1,0,0,0,96,662,1,0,0,0,98,664,1,0,0,0,100,666,1,0,0,0,102,
        674,1,0,0,0,104,683,1,0,0,0,106,691,1,0,0,0,108,699,1,0,0,0,110,
        707,1,0,0,0,112,715,1,0,0,0,114,723,1,0,0,0,116,731,1,0,0,0,118,
        739,1,0,0,0,120,747,1,0,0,0,122,755,1,0,0,0,124,763,1,0,0,0,126,
        777,1,0,0,0,128,780,1,0,0,0,130,854,1,0,0,0,132,856,1,0,0,0,134,
        858,1,0,0,0,136,900,1,0,0,0,138,928,1,0,0,0,140,943,1,0,0,0,142,
        965,1,0,0,0,144,993,1,0,0,0,146,995,1,0,0,0,148,1013,1,0,0,0,150,
        1015,1,0,0,0,152,1026,1,0,0,0,154,1028,1,0,0,0,156,1035,1,0,0,0,
        158,1038,1,0,0,0,160,1044,1,0,0,0,162,1054,1,0,0,0,164,1068,1,0,
        0,0,166,1089,1,0,0,0,168,1099,1,0,0,0,170,1101,1,0,0,0,172,1110,
        1,0,0,0,174,1150,1,0,0,0,176,1160,1,0,0,0,178,1177,1,0,0,0,180,1202,
        1,0,0,0,182,1205,1,0,0,0,184,1209,1,0,0,0,186,1220,1,0,0,0,188,1228,
        1,0,0,0,190,1230,1,0,0,0,192,1233,1,0,0,0,194,1237,1,0,0,0,196,200,
        3,46,23,0,197,200,3,2,1,0,198,200,3,34,17,0,199,196,1,0,0,0,199,
        197,1,0,0,0,199,198,1,0,0,0,200,203,1,0,0,0,201,199,1,0,0,0,201,
        202,1,0,0,0,202,204,1,0,0,0,203,201,1,0,0,0,204,205,5,0,0,1,205,
        1,1,0,0,0,206,223,3,8,4,0,207,208,3,18,9,0,208,209,3,20,10,0,209,
        223,1,0,0,0,210,223,3,6,3,0,211,223,3,4,2,0,212,213,5,22,0,0,213,
        214,3,32,16,0,214,219,5,120,0,0,215,216,5,86,0,0,216,218,5,120,0,
        0,217,215,1,0,0,0,218,221,1,0,0,0,219,217,1,0,0,0,219,220,1,0,0,
        0,220,223,1,0,0,0,221,219,1,0,0,0,222,206,1,0,0,0,222,207,1,0,0,
        0,222,210,1,0,0,0,222,211,1,0,0,0,222,212,1,0,0,0,223,3,1,0,0,0,
        224,225,5,22,0,0,225,226,3,26,13,0,226,227,3,30,15,0,227,5,1,0,0,
        0,228,229,5,123,0,0,229,230,5,126,0,0,230,7,1,0,0,0,231,232,5,22,
        0,0,232,234,3,12,6,0,233,235,5,79,0,0,234,233,1,0,0,0,234,235,1,
        0,0,0,235,236,1,0,0,0,236,237,3,20,10,0,237,244,1,0,0,0,238,239,
        5,22,0,0,239,240,7,0,0,0,240,244,3,14,7,0,241,242,5,22,0,0,242,244,
        3,10,5,0,243,231,1,0,0,0,243,238,1,0,0,0,243,241,1,0,0,0,244,9,1,
        0,0,0,245,246,7,1,0,0,246,11,1,0,0,0,247,248,7,2,0,0,248,13,1,0,
        0,0,249,251,6,7,-1,0,250,252,5,79,0,0,251,250,1,0,0,0,251,252,1,
        0,0,0,252,253,1,0,0,0,253,254,3,16,8,0,254,264,1,0,0,0,255,258,10,
        1,0,0,256,257,7,3,0,0,257,259,3,14,7,0,258,256,1,0,0,0,259,260,1,
        0,0,0,260,258,1,0,0,0,260,261,1,0,0,0,261,263,1,0,0,0,262,255,1,
        0,0,0,263,266,1,0,0,0,264,262,1,0,0,0,264,265,1,0,0,0,265,15,1,0,
        0,0,266,264,1,0,0,0,267,271,5,120,0,0,268,269,5,105,0,0,269,270,
        7,4,0,0,270,272,5,106,0,0,271,268,1,0,0,0,271,272,1,0,0,0,272,277,
        1,0,0,0,273,277,5,116,0,0,274,277,5,112,0,0,275,277,3,94,47,0,276,
        267,1,0,0,0,276,273,1,0,0,0,276,274,1,0,0,0,276,275,1,0,0,0,277,
        17,1,0,0,0,278,279,5,22,0,0,279,283,5,44,0,0,280,283,5,12,0,0,281,
        283,5,30,0,0,282,278,1,0,0,0,282,280,1,0,0,0,282,281,1,0,0,0,283,
        19,1,0,0,0,284,289,5,120,0,0,285,286,5,62,0,0,286,288,5,120,0,0,
        287,285,1,0,0,0,288,291,1,0,0,0,289,287,1,0,0,0,289,290,1,0,0,0,
        290,295,1,0,0,0,291,289,1,0,0,0,292,295,5,116,0,0,293,295,5,112,
        0,0,294,284,1,0,0,0,294,292,1,0,0,0,294,293,1,0,0,0,295,21,1,0,0,
        0,296,297,5,105,0,0,297,302,5,120,0,0,298,299,5,86,0,0,299,301,5,
        120,0,0,300,298,1,0,0,0,301,304,1,0,0,0,302,300,1,0,0,0,302,303,
        1,0,0,0,303,305,1,0,0,0,304,302,1,0,0,0,305,306,5,106,0,0,306,23,
        1,0,0,0,307,308,3,94,47,0,308,25,1,0,0,0,309,310,5,27,0,0,310,27,
        1,0,0,0,311,312,5,70,0,0,312,316,5,120,0,0,313,315,7,5,0,0,314,313,
        1,0,0,0,315,318,1,0,0,0,316,314,1,0,0,0,316,317,1,0,0,0,317,319,
        1,0,0,0,318,316,1,0,0,0,319,320,5,71,0,0,320,29,1,0,0,0,321,331,
        3,28,14,0,322,326,5,116,0,0,323,325,5,116,0,0,324,323,1,0,0,0,325,
        328,1,0,0,0,326,324,1,0,0,0,326,327,1,0,0,0,327,331,1,0,0,0,328,
        326,1,0,0,0,329,331,5,120,0,0,330,321,1,0,0,0,330,322,1,0,0,0,330,
        329,1,0,0,0,331,31,1,0,0,0,332,333,5,35,0,0,333,33,1,0,0,0,334,354,
        3,38,19,0,335,337,5,10,0,0,336,338,3,40,20,0,337,336,1,0,0,0,338,
        339,1,0,0,0,339,337,1,0,0,0,339,340,1,0,0,0,340,342,1,0,0,0,341,
        335,1,0,0,0,341,342,1,0,0,0,342,346,1,0,0,0,343,345,3,36,18,0,344,
        343,1,0,0,0,345,348,1,0,0,0,346,344,1,0,0,0,346,347,1,0,0,0,347,
        350,1,0,0,0,348,346,1,0,0,0,349,351,5,46,0,0,350,349,1,0,0,0,350,
        351,1,0,0,0,351,352,1,0,0,0,352,354,3,38,19,0,353,334,1,0,0,0,353,
        341,1,0,0,0,354,355,1,0,0,0,355,356,5,85,0,0,356,35,1,0,0,0,357,
        359,3,48,24,0,358,357,1,0,0,0,359,360,1,0,0,0,360,358,1,0,0,0,360,
        361,1,0,0,0,361,362,1,0,0,0,362,363,5,20,0,0,363,372,1,0,0,0,364,
        366,3,66,33,0,365,364,1,0,0,0,366,367,1,0,0,0,367,365,1,0,0,0,367,
        368,1,0,0,0,368,369,1,0,0,0,369,370,7,6,0,0,370,372,1,0,0,0,371,
        358,1,0,0,0,371,365,1,0,0,0,372,37,1,0,0,0,373,374,5,28,0,0,374,
        375,3,42,21,0,375,39,1,0,0,0,376,377,7,7,0,0,377,41,1,0,0,0,378,
        379,6,21,-1,0,379,386,5,116,0,0,380,386,5,120,0,0,381,382,5,105,
        0,0,382,383,3,42,21,0,383,384,5,106,0,0,384,386,1,0,0,0,385,378,
        1,0,0,0,385,380,1,0,0,0,385,381,1,0,0,0,386,394,1,0,0,0,387,389,
        10,1,0,0,388,390,5,61,0,0,389,388,1,0,0,0,389,390,1,0,0,0,390,391,
        1,0,0,0,391,393,3,42,21,2,392,387,1,0,0,0,393,396,1,0,0,0,394,392,
        1,0,0,0,394,395,1,0,0,0,395,43,1,0,0,0,396,394,1,0,0,0,397,399,7,
        8,0,0,398,397,1,0,0,0,398,399,1,0,0,0,399,400,1,0,0,0,400,401,5,
        60,0,0,401,45,1,0,0,0,402,407,3,52,26,0,403,407,3,54,27,0,404,407,
        3,60,30,0,405,407,3,68,34,0,406,402,1,0,0,0,406,403,1,0,0,0,406,
        404,1,0,0,0,406,405,1,0,0,0,407,47,1,0,0,0,408,409,7,9,0,0,409,49,
        1,0,0,0,410,412,3,48,24,0,411,410,1,0,0,0,412,415,1,0,0,0,413,411,
        1,0,0,0,413,414,1,0,0,0,414,417,1,0,0,0,415,413,1,0,0,0,416,418,
        3,84,42,0,417,416,1,0,0,0,417,418,1,0,0,0,418,419,1,0,0,0,419,420,
        5,120,0,0,420,422,5,105,0,0,421,423,3,56,28,0,422,421,1,0,0,0,422,
        423,1,0,0,0,423,424,1,0,0,0,424,425,5,106,0,0,425,51,1,0,0,0,426,
        427,3,50,25,0,427,428,5,85,0,0,428,53,1,0,0,0,429,430,3,50,25,0,
        430,431,3,150,75,0,431,55,1,0,0,0,432,437,3,58,29,0,433,434,5,86,
        0,0,434,436,3,58,29,0,435,433,1,0,0,0,436,439,1,0,0,0,437,435,1,
        0,0,0,437,438,1,0,0,0,438,442,1,0,0,0,439,437,1,0,0,0,440,442,5,
        47,0,0,441,432,1,0,0,0,441,440,1,0,0,0,442,57,1,0,0,0,443,445,5,
        59,0,0,444,443,1,0,0,0,444,445,1,0,0,0,445,447,1,0,0,0,446,448,3,
        86,43,0,447,446,1,0,0,0,447,448,1,0,0,0,448,449,1,0,0,0,449,452,
        3,132,66,0,450,451,5,90,0,0,451,453,3,94,47,0,452,450,1,0,0,0,452,
        453,1,0,0,0,453,461,1,0,0,0,454,455,5,39,0,0,455,457,5,120,0,0,456,
        458,5,63,0,0,457,456,1,0,0,0,457,458,1,0,0,0,458,459,1,0,0,0,459,
        461,3,132,66,0,460,444,1,0,0,0,460,454,1,0,0,0,461,59,1,0,0,0,462,
        463,5,39,0,0,463,467,5,120,0,0,464,465,5,105,0,0,465,466,5,120,0,
        0,466,468,5,106,0,0,467,464,1,0,0,0,467,468,1,0,0,0,468,469,1,0,
        0,0,469,473,5,107,0,0,470,472,3,62,31,0,471,470,1,0,0,0,472,475,
        1,0,0,0,473,471,1,0,0,0,473,474,1,0,0,0,474,476,1,0,0,0,475,473,
        1,0,0,0,476,477,5,108,0,0,477,478,5,85,0,0,478,61,1,0,0,0,479,480,
        3,84,42,0,480,481,5,120,0,0,481,482,5,85,0,0,482,63,1,0,0,0,483,
        484,5,120,0,0,484,485,5,84,0,0,485,488,3,94,47,0,486,488,3,94,47,
        0,487,483,1,0,0,0,487,486,1,0,0,0,488,65,1,0,0,0,489,490,7,10,0,
        0,490,67,1,0,0,0,491,492,3,70,35,0,492,493,5,85,0,0,493,69,1,0,0,
        0,494,496,3,66,33,0,495,494,1,0,0,0,496,499,1,0,0,0,497,495,1,0,
        0,0,497,498,1,0,0,0,498,501,1,0,0,0,499,497,1,0,0,0,500,502,3,86,
        43,0,501,500,1,0,0,0,501,502,1,0,0,0,502,504,1,0,0,0,503,505,5,116,
        0,0,504,503,1,0,0,0,504,505,1,0,0,0,505,506,1,0,0,0,506,511,3,72,
        36,0,507,508,5,86,0,0,508,510,3,72,36,0,509,507,1,0,0,0,510,513,
        1,0,0,0,511,509,1,0,0,0,511,512,1,0,0,0,512,534,1,0,0,0,513,511,
        1,0,0,0,514,516,3,66,33,0,515,514,1,0,0,0,516,519,1,0,0,0,517,515,
        1,0,0,0,517,518,1,0,0,0,518,520,1,0,0,0,519,517,1,0,0,0,520,521,
        5,39,0,0,521,522,5,120,0,0,522,530,3,72,36,0,523,525,5,86,0,0,524,
        526,5,120,0,0,525,524,1,0,0,0,525,526,1,0,0,0,526,527,1,0,0,0,527,
        529,3,72,36,0,528,523,1,0,0,0,529,532,1,0,0,0,530,528,1,0,0,0,530,
        531,1,0,0,0,531,534,1,0,0,0,532,530,1,0,0,0,533,497,1,0,0,0,533,
        517,1,0,0,0,534,71,1,0,0,0,535,538,3,74,37,0,536,537,5,90,0,0,537,
        539,3,76,38,0,538,536,1,0,0,0,538,539,1,0,0,0,539,73,1,0,0,0,540,
        542,7,11,0,0,541,540,1,0,0,0,541,542,1,0,0,0,542,543,1,0,0,0,543,
        544,3,132,66,0,544,75,1,0,0,0,545,549,3,94,47,0,546,549,3,88,44,
        0,547,549,3,92,46,0,548,545,1,0,0,0,548,546,1,0,0,0,548,547,1,0,
        0,0,549,77,1,0,0,0,550,551,7,12,0,0,551,79,1,0,0,0,552,554,5,105,
        0,0,553,555,3,194,97,0,554,553,1,0,0,0,554,555,1,0,0,0,555,556,1,
        0,0,0,556,557,5,106,0,0,557,81,1,0,0,0,558,559,5,39,0,0,559,561,
        5,120,0,0,560,562,7,11,0,0,561,560,1,0,0,0,561,562,1,0,0,0,562,83,
        1,0,0,0,563,564,3,86,43,0,564,85,1,0,0,0,565,567,3,78,39,0,566,568,
        7,11,0,0,567,566,1,0,0,0,567,568,1,0,0,0,568,573,1,0,0,0,569,570,
        5,77,0,0,570,572,3,86,43,0,571,569,1,0,0,0,572,575,1,0,0,0,573,571,
        1,0,0,0,573,574,1,0,0,0,574,601,1,0,0,0,575,573,1,0,0,0,576,577,
        5,70,0,0,577,578,3,84,42,0,578,582,5,71,0,0,579,581,7,11,0,0,580,
        579,1,0,0,0,581,584,1,0,0,0,582,580,1,0,0,0,582,583,1,0,0,0,583,
        589,1,0,0,0,584,582,1,0,0,0,585,586,5,77,0,0,586,588,3,86,43,0,587,
        585,1,0,0,0,588,591,1,0,0,0,589,587,1,0,0,0,589,590,1,0,0,0,590,
        601,1,0,0,0,591,589,1,0,0,0,592,597,3,82,41,0,593,594,5,77,0,0,594,
        596,3,86,43,0,595,593,1,0,0,0,596,599,1,0,0,0,597,595,1,0,0,0,597,
        598,1,0,0,0,598,601,1,0,0,0,599,597,1,0,0,0,600,565,1,0,0,0,600,
        576,1,0,0,0,600,592,1,0,0,0,601,87,1,0,0,0,602,603,5,105,0,0,603,
        612,5,107,0,0,604,609,3,94,47,0,605,606,5,86,0,0,606,608,3,94,47,
        0,607,605,1,0,0,0,608,611,1,0,0,0,609,607,1,0,0,0,609,610,1,0,0,
        0,610,613,1,0,0,0,611,609,1,0,0,0,612,604,1,0,0,0,612,613,1,0,0,
        0,613,615,1,0,0,0,614,616,5,86,0,0,615,614,1,0,0,0,615,616,1,0,0,
        0,616,617,1,0,0,0,617,618,5,108,0,0,618,619,5,106,0,0,619,89,1,0,
        0,0,620,630,3,94,47,0,621,622,5,84,0,0,622,627,3,94,47,0,623,624,
        5,85,0,0,624,626,3,94,47,0,625,623,1,0,0,0,626,629,1,0,0,0,627,625,
        1,0,0,0,627,628,1,0,0,0,628,631,1,0,0,0,629,627,1,0,0,0,630,621,
        1,0,0,0,630,631,1,0,0,0,631,91,1,0,0,0,632,633,5,103,0,0,633,638,
        3,90,45,0,634,635,5,86,0,0,635,637,3,90,45,0,636,634,1,0,0,0,637,
        640,1,0,0,0,638,636,1,0,0,0,638,639,1,0,0,0,639,642,1,0,0,0,640,
        638,1,0,0,0,641,643,5,86,0,0,642,641,1,0,0,0,642,643,1,0,0,0,643,
        644,1,0,0,0,644,645,5,110,0,0,645,646,5,106,0,0,646,657,1,0,0,0,
        647,648,5,103,0,0,648,649,5,84,0,0,649,650,3,94,47,0,650,651,5,110,
        0,0,651,652,5,106,0,0,652,657,1,0,0,0,653,654,5,103,0,0,654,655,
        5,110,0,0,655,657,5,106,0,0,656,632,1,0,0,0,656,647,1,0,0,0,656,
        653,1,0,0,0,657,93,1,0,0,0,658,659,3,102,51,0,659,95,1,0,0,0,660,
        663,3,136,68,0,661,663,3,100,50,0,662,660,1,0,0,0,662,661,1,0,0,
        0,663,97,1,0,0,0,664,665,7,13,0,0,665,99,1,0,0,0,666,671,3,102,51,
        0,667,668,5,86,0,0,668,670,3,102,51,0,669,667,1,0,0,0,670,673,1,
        0,0,0,671,669,1,0,0,0,671,672,1,0,0,0,672,101,1,0,0,0,673,671,1,
        0,0,0,674,680,3,104,52,0,675,676,3,98,49,0,676,677,3,104,52,0,677,
        679,1,0,0,0,678,675,1,0,0,0,679,682,1,0,0,0,680,678,1,0,0,0,680,
        681,1,0,0,0,681,103,1,0,0,0,682,680,1,0,0,0,683,689,3,106,53,0,684,
        685,5,83,0,0,685,686,3,94,47,0,686,687,5,84,0,0,687,688,3,94,47,
        0,688,690,1,0,0,0,689,684,1,0,0,0,689,690,1,0,0,0,690,105,1,0,0,
        0,691,696,3,108,54,0,692,693,5,82,0,0,693,695,3,108,54,0,694,692,
        1,0,0,0,695,698,1,0,0,0,696,694,1,0,0,0,696,697,1,0,0,0,697,107,
        1,0,0,0,698,696,1,0,0,0,699,704,3,110,55,0,700,701,5,81,0,0,701,
        703,3,110,55,0,702,700,1,0,0,0,703,706,1,0,0,0,704,702,1,0,0,0,704,
        705,1,0,0,0,705,109,1,0,0,0,706,704,1,0,0,0,707,712,3,112,56,0,708,
        709,5,77,0,0,709,711,3,112,56,0,710,708,1,0,0,0,711,714,1,0,0,0,
        712,710,1,0,0,0,712,713,1,0,0,0,713,111,1,0,0,0,714,712,1,0,0,0,
        715,720,3,114,57,0,716,717,5,78,0,0,717,719,3,114,57,0,718,716,1,
        0,0,0,719,722,1,0,0,0,720,718,1,0,0,0,720,721,1,0,0,0,721,113,1,
        0,0,0,722,720,1,0,0,0,723,728,3,116,58,0,724,725,5,76,0,0,725,727,
        3,116,58,0,726,724,1,0,0,0,727,730,1,0,0,0,728,726,1,0,0,0,728,729,
        1,0,0,0,729,115,1,0,0,0,730,728,1,0,0,0,731,736,3,118,59,0,732,733,
        7,14,0,0,733,735,3,118,59,0,734,732,1,0,0,0,735,738,1,0,0,0,736,
        734,1,0,0,0,736,737,1,0,0,0,737,117,1,0,0,0,738,736,1,0,0,0,739,
        744,3,120,60,0,740,741,7,15,0,0,741,743,3,120,60,0,742,740,1,0,0,
        0,743,746,1,0,0,0,744,742,1,0,0,0,744,745,1,0,0,0,745,119,1,0,0,
        0,746,744,1,0,0,0,747,752,3,122,61,0,748,749,7,16,0,0,749,751,3,
        122,61,0,750,748,1,0,0,0,751,754,1,0,0,0,752,750,1,0,0,0,752,753,
        1,0,0,0,753,121,1,0,0,0,754,752,1,0,0,0,755,760,3,124,62,0,756,757,
        7,17,0,0,757,759,3,124,62,0,758,756,1,0,0,0,759,762,1,0,0,0,760,
        758,1,0,0,0,760,761,1,0,0,0,761,123,1,0,0,0,762,760,1,0,0,0,763,
        768,3,126,63,0,764,765,7,18,0,0,765,767,3,126,63,0,766,764,1,0,0,
        0,767,770,1,0,0,0,768,766,1,0,0,0,768,769,1,0,0,0,769,125,1,0,0,
        0,770,768,1,0,0,0,771,778,3,144,72,0,772,778,3,128,64,0,773,778,
        3,142,71,0,774,778,3,136,68,0,775,776,7,19,0,0,776,778,3,126,63,
        0,777,771,1,0,0,0,777,772,1,0,0,0,777,773,1,0,0,0,777,774,1,0,0,
        0,777,775,1,0,0,0,778,127,1,0,0,0,779,781,3,44,22,0,780,779,1,0,
        0,0,780,781,1,0,0,0,781,782,1,0,0,0,782,786,3,130,65,0,783,785,3,
        138,69,0,784,783,1,0,0,0,785,788,1,0,0,0,786,784,1,0,0,0,786,787,
        1,0,0,0,787,812,1,0,0,0,788,786,1,0,0,0,789,803,3,80,40,0,790,803,
        5,66,0,0,791,803,5,67,0,0,792,794,5,104,0,0,793,795,3,188,94,0,794,
        793,1,0,0,0,794,795,1,0,0,0,795,797,1,0,0,0,796,798,3,80,40,0,797,
        796,1,0,0,0,797,798,1,0,0,0,798,803,1,0,0,0,799,803,5,120,0,0,800,
        801,5,89,0,0,801,803,5,120,0,0,802,789,1,0,0,0,802,790,1,0,0,0,802,
        791,1,0,0,0,802,792,1,0,0,0,802,799,1,0,0,0,802,800,1,0,0,0,803,
        807,1,0,0,0,804,806,3,138,69,0,805,804,1,0,0,0,806,809,1,0,0,0,807,
        805,1,0,0,0,807,808,1,0,0,0,808,811,1,0,0,0,809,807,1,0,0,0,810,
        802,1,0,0,0,811,814,1,0,0,0,812,810,1,0,0,0,812,813,1,0,0,0,813,
        129,1,0,0,0,814,812,1,0,0,0,815,855,3,190,95,0,816,820,5,116,0,0,
        817,819,5,116,0,0,818,817,1,0,0,0,819,822,1,0,0,0,820,818,1,0,0,
        0,820,821,1,0,0,0,821,855,1,0,0,0,822,820,1,0,0,0,823,824,7,20,0,
        0,824,825,5,105,0,0,825,826,3,94,47,0,826,827,5,106,0,0,827,855,
        1,0,0,0,828,855,3,132,66,0,829,830,5,105,0,0,830,831,5,70,0,0,831,
        832,5,120,0,0,832,841,5,71,0,0,833,838,3,64,32,0,834,835,5,86,0,
        0,835,837,3,64,32,0,836,834,1,0,0,0,837,840,1,0,0,0,838,836,1,0,
        0,0,838,839,1,0,0,0,839,842,1,0,0,0,840,838,1,0,0,0,841,833,1,0,
        0,0,841,842,1,0,0,0,842,844,1,0,0,0,843,845,5,86,0,0,844,843,1,0,
        0,0,844,845,1,0,0,0,845,846,1,0,0,0,846,855,5,106,0,0,847,848,5,
        105,0,0,848,849,3,96,48,0,849,850,5,106,0,0,850,855,1,0,0,0,851,
        855,3,88,44,0,852,855,3,92,46,0,853,855,3,134,67,0,854,815,1,0,0,
        0,854,816,1,0,0,0,854,823,1,0,0,0,854,828,1,0,0,0,854,829,1,0,0,
        0,854,847,1,0,0,0,854,851,1,0,0,0,854,852,1,0,0,0,854,853,1,0,0,
        0,855,131,1,0,0,0,856,857,7,21,0,0,857,133,1,0,0,0,858,859,5,5,0,
        0,859,860,5,105,0,0,860,865,3,94,47,0,861,862,5,86,0,0,862,864,3,
        94,47,0,863,861,1,0,0,0,864,867,1,0,0,0,865,863,1,0,0,0,865,866,
        1,0,0,0,866,872,1,0,0,0,867,865,1,0,0,0,868,869,5,85,0,0,869,871,
        5,120,0,0,870,868,1,0,0,0,871,874,1,0,0,0,872,870,1,0,0,0,872,873,
        1,0,0,0,873,875,1,0,0,0,874,872,1,0,0,0,875,876,5,106,0,0,876,135,
        1,0,0,0,877,878,5,105,0,0,878,886,5,84,0,0,879,887,3,94,47,0,880,
        882,3,148,74,0,881,880,1,0,0,0,882,885,1,0,0,0,883,881,1,0,0,0,883,
        884,1,0,0,0,884,887,1,0,0,0,885,883,1,0,0,0,886,879,1,0,0,0,886,
        883,1,0,0,0,887,888,1,0,0,0,888,889,5,84,0,0,889,901,5,106,0,0,890,
        892,5,21,0,0,891,893,3,84,42,0,892,891,1,0,0,0,892,893,1,0,0,0,893,
        894,1,0,0,0,894,896,5,105,0,0,895,897,3,56,28,0,896,895,1,0,0,0,
        896,897,1,0,0,0,897,898,1,0,0,0,898,899,5,106,0,0,899,901,3,150,
        75,0,900,877,1,0,0,0,900,890,1,0,0,0,901,137,1,0,0,0,902,904,5,109,
        0,0,903,905,5,70,0,0,904,903,1,0,0,0,904,905,1,0,0,0,905,906,1,0,
        0,0,906,909,3,94,47,0,907,908,5,86,0,0,908,910,3,94,47,0,909,907,
        1,0,0,0,909,910,1,0,0,0,910,911,1,0,0,0,911,912,5,110,0,0,912,929,
        1,0,0,0,913,915,5,109,0,0,914,916,5,70,0,0,915,914,1,0,0,0,915,916,
        1,0,0,0,916,918,1,0,0,0,917,919,3,94,47,0,918,917,1,0,0,0,918,919,
        1,0,0,0,919,920,1,0,0,0,920,922,5,88,0,0,921,923,5,70,0,0,922,921,
        1,0,0,0,922,923,1,0,0,0,923,925,1,0,0,0,924,926,3,94,47,0,925,924,
        1,0,0,0,925,926,1,0,0,0,926,927,1,0,0,0,927,929,5,110,0,0,928,902,
        1,0,0,0,928,913,1,0,0,0,929,139,1,0,0,0,930,931,5,109,0,0,931,933,
        5,70,0,0,932,934,5,88,0,0,933,932,1,0,0,0,933,934,1,0,0,0,934,936,
        1,0,0,0,935,937,5,70,0,0,936,935,1,0,0,0,936,937,1,0,0,0,937,944,
        1,0,0,0,938,939,5,109,0,0,939,941,5,88,0,0,940,942,5,70,0,0,941,
        940,1,0,0,0,941,942,1,0,0,0,942,944,1,0,0,0,943,930,1,0,0,0,943,
        938,1,0,0,0,944,141,1,0,0,0,945,947,5,22,0,0,946,945,1,0,0,0,946,
        947,1,0,0,0,947,948,1,0,0,0,948,949,5,125,0,0,949,966,7,22,0,0,950,
        951,5,22,0,0,951,963,5,125,0,0,952,964,7,23,0,0,953,964,3,138,69,
        0,954,964,3,140,70,0,955,959,7,24,0,0,956,957,5,83,0,0,957,959,5,
        79,0,0,958,955,1,0,0,0,958,956,1,0,0,0,959,964,1,0,0,0,960,961,5,
        105,0,0,961,964,7,25,0,0,962,964,3,94,47,0,963,952,1,0,0,0,963,953,
        1,0,0,0,963,954,1,0,0,0,963,958,1,0,0,0,963,960,1,0,0,0,963,962,
        1,0,0,0,964,966,1,0,0,0,965,946,1,0,0,0,965,950,1,0,0,0,966,143,
        1,0,0,0,967,968,5,105,0,0,968,969,3,84,42,0,969,970,5,106,0,0,970,
        971,3,126,63,0,971,994,1,0,0,0,972,973,5,105,0,0,973,974,5,107,0,
        0,974,975,3,84,42,0,975,976,5,108,0,0,976,977,5,106,0,0,977,978,
        3,126,63,0,978,994,1,0,0,0,979,980,5,105,0,0,980,981,5,70,0,0,981,
        982,5,120,0,0,982,983,5,71,0,0,983,988,3,126,63,0,984,985,5,86,0,
        0,985,987,3,126,63,0,986,984,1,0,0,0,987,990,1,0,0,0,988,986,1,0,
        0,0,988,989,1,0,0,0,989,991,1,0,0,0,990,988,1,0,0,0,991,992,5,106,
        0,0,992,994,1,0,0,0,993,967,1,0,0,0,993,972,1,0,0,0,993,979,1,0,
        0,0,994,145,1,0,0,0,995,1000,3,94,47,0,996,997,5,86,0,0,997,999,
        3,94,47,0,998,996,1,0,0,0,999,1002,1,0,0,0,1000,998,1,0,0,0,1000,
        1001,1,0,0,0,1001,147,1,0,0,0,1002,1000,1,0,0,0,1003,1014,3,150,
        75,0,1004,1014,5,85,0,0,1005,1014,3,152,76,0,1006,1014,3,174,87,
        0,1007,1014,3,186,93,0,1008,1014,3,68,34,0,1009,1014,3,4,2,0,1010,
        1011,3,96,48,0,1011,1012,5,85,0,0,1012,1014,1,0,0,0,1013,1003,1,
        0,0,0,1013,1004,1,0,0,0,1013,1005,1,0,0,0,1013,1006,1,0,0,0,1013,
        1007,1,0,0,0,1013,1008,1,0,0,0,1013,1009,1,0,0,0,1013,1010,1,0,0,
        0,1014,149,1,0,0,0,1015,1019,5,107,0,0,1016,1018,3,148,74,0,1017,
        1016,1,0,0,0,1018,1021,1,0,0,0,1019,1017,1,0,0,0,1019,1020,1,0,0,
        0,1020,1022,1,0,0,0,1021,1019,1,0,0,0,1022,1023,5,108,0,0,1023,151,
        1,0,0,0,1024,1027,3,160,80,0,1025,1027,3,162,81,0,1026,1024,1,0,
        0,0,1026,1025,1,0,0,0,1027,153,1,0,0,0,1028,1029,5,13,0,0,1029,1030,
        5,23,0,0,1030,1031,5,105,0,0,1031,1032,3,94,47,0,1032,1033,5,106,
        0,0,1033,1034,3,148,74,0,1034,155,1,0,0,0,1035,1036,5,13,0,0,1036,
        1037,3,148,74,0,1037,157,1,0,0,0,1038,1039,5,23,0,0,1039,1040,5,
        105,0,0,1040,1041,3,94,47,0,1041,1042,5,106,0,0,1042,1043,3,148,
        74,0,1043,159,1,0,0,0,1044,1048,3,158,79,0,1045,1047,3,154,77,0,
        1046,1045,1,0,0,0,1047,1050,1,0,0,0,1048,1046,1,0,0,0,1048,1049,
        1,0,0,0,1049,1052,1,0,0,0,1050,1048,1,0,0,0,1051,1053,3,156,78,0,
        1052,1051,1,0,0,0,1052,1053,1,0,0,0,1053,161,1,0,0,0,1054,1055,5,
        42,0,0,1055,1056,5,105,0,0,1056,1057,3,94,47,0,1057,1058,5,106,0,
        0,1058,1063,5,107,0,0,1059,1062,3,170,85,0,1060,1062,3,172,86,0,
        1061,1059,1,0,0,0,1061,1060,1,0,0,0,1062,1065,1,0,0,0,1063,1061,
        1,0,0,0,1063,1064,1,0,0,0,1064,1066,1,0,0,0,1065,1063,1,0,0,0,1066,
        1067,5,108,0,0,1067,163,1,0,0,0,1068,1074,3,168,84,0,1069,1070,3,
        166,83,0,1070,1071,3,168,84,0,1071,1073,1,0,0,0,1072,1069,1,0,0,
        0,1073,1076,1,0,0,0,1074,1072,1,0,0,0,1074,1075,1,0,0,0,1075,1087,
        1,0,0,0,1076,1074,1,0,0,0,1077,1078,5,88,0,0,1078,1084,3,168,84,
        0,1079,1080,3,166,83,0,1080,1081,3,168,84,0,1081,1083,1,0,0,0,1082,
        1079,1,0,0,0,1083,1086,1,0,0,0,1084,1082,1,0,0,0,1084,1085,1,0,0,
        0,1085,1088,1,0,0,0,1086,1084,1,0,0,0,1087,1077,1,0,0,0,1087,1088,
        1,0,0,0,1088,165,1,0,0,0,1089,1090,7,26,0,0,1090,167,1,0,0,0,1091,
        1093,5,62,0,0,1092,1091,1,0,0,0,1092,1093,1,0,0,0,1093,1094,1,0,
        0,0,1094,1100,7,27,0,0,1095,1096,5,105,0,0,1096,1097,3,120,60,0,
        1097,1098,5,106,0,0,1098,1100,1,0,0,0,1099,1092,1,0,0,0,1099,1095,
        1,0,0,0,1100,169,1,0,0,0,1101,1102,5,4,0,0,1102,1103,3,164,82,0,
        1103,1107,5,84,0,0,1104,1106,3,148,74,0,1105,1104,1,0,0,0,1106,1109,
        1,0,0,0,1107,1105,1,0,0,0,1107,1108,1,0,0,0,1108,171,1,0,0,0,1109,
        1107,1,0,0,0,1110,1111,5,10,0,0,1111,1115,5,84,0,0,1112,1114,3,148,
        74,0,1113,1112,1,0,0,0,1114,1117,1,0,0,0,1115,1113,1,0,0,0,1115,
        1116,1,0,0,0,1116,173,1,0,0,0,1117,1115,1,0,0,0,1118,1119,5,49,0,
        0,1119,1120,5,105,0,0,1120,1121,3,94,47,0,1121,1124,5,106,0,0,1122,
        1125,3,148,74,0,1123,1125,5,85,0,0,1124,1122,1,0,0,0,1124,1123,1,
        0,0,0,1125,1151,1,0,0,0,1126,1127,5,11,0,0,1127,1128,3,148,74,0,
        1128,1129,5,49,0,0,1129,1130,5,105,0,0,1130,1131,3,94,47,0,1131,
        1132,5,106,0,0,1132,1133,5,85,0,0,1133,1151,1,0,0,0,1134,1135,5,
        18,0,0,1135,1136,5,105,0,0,1136,1137,3,176,88,0,1137,1140,5,106,
        0,0,1138,1141,3,148,74,0,1139,1141,5,85,0,0,1140,1138,1,0,0,0,1140,
        1139,1,0,0,0,1141,1151,1,0,0,0,1142,1143,5,19,0,0,1143,1144,5,105,
        0,0,1144,1145,3,178,89,0,1145,1148,5,106,0,0,1146,1149,3,148,74,
        0,1147,1149,5,85,0,0,1148,1146,1,0,0,0,1148,1147,1,0,0,0,1149,1151,
        1,0,0,0,1150,1118,1,0,0,0,1150,1126,1,0,0,0,1150,1134,1,0,0,0,1150,
        1142,1,0,0,0,1151,175,1,0,0,0,1152,1157,3,180,90,0,1153,1154,5,86,
        0,0,1154,1156,3,180,90,0,1155,1153,1,0,0,0,1156,1159,1,0,0,0,1157,
        1155,1,0,0,0,1157,1158,1,0,0,0,1158,1161,1,0,0,0,1159,1157,1,0,0,
        0,1160,1152,1,0,0,0,1160,1161,1,0,0,0,1161,1162,1,0,0,0,1162,1164,
        5,85,0,0,1163,1165,3,94,47,0,1164,1163,1,0,0,0,1164,1165,1,0,0,0,
        1165,1166,1,0,0,0,1166,1168,5,85,0,0,1167,1169,3,94,47,0,1168,1167,
        1,0,0,0,1168,1169,1,0,0,0,1169,1174,1,0,0,0,1170,1171,5,86,0,0,1171,
        1173,3,94,47,0,1172,1170,1,0,0,0,1173,1176,1,0,0,0,1174,1172,1,0,
        0,0,1174,1175,1,0,0,0,1175,177,1,0,0,0,1176,1174,1,0,0,0,1177,1182,
        3,182,91,0,1178,1179,5,86,0,0,1179,1181,3,182,91,0,1180,1178,1,0,
        0,0,1181,1184,1,0,0,0,1182,1180,1,0,0,0,1182,1183,1,0,0,0,1183,1185,
        1,0,0,0,1184,1182,1,0,0,0,1185,1186,7,28,0,0,1186,1189,3,94,47,0,
        1187,1188,5,88,0,0,1188,1190,3,94,47,0,1189,1187,1,0,0,0,1189,1190,
        1,0,0,0,1190,179,1,0,0,0,1191,1193,3,78,39,0,1192,1191,1,0,0,0,1192,
        1193,1,0,0,0,1193,1194,1,0,0,0,1194,1199,3,74,37,0,1195,1196,5,90,
        0,0,1196,1200,3,76,38,0,1197,1200,5,66,0,0,1198,1200,5,67,0,0,1199,
        1195,1,0,0,0,1199,1197,1,0,0,0,1199,1198,1,0,0,0,1199,1200,1,0,0,
        0,1200,1203,1,0,0,0,1201,1203,3,94,47,0,1202,1192,1,0,0,0,1202,1201,
        1,0,0,0,1203,181,1,0,0,0,1204,1206,3,84,42,0,1205,1204,1,0,0,0,1205,
        1206,1,0,0,0,1206,1207,1,0,0,0,1207,1208,3,74,37,0,1208,183,1,0,
        0,0,1209,1211,5,36,0,0,1210,1212,3,96,48,0,1211,1210,1,0,0,0,1211,
        1212,1,0,0,0,1212,1213,1,0,0,0,1213,1214,5,85,0,0,1214,185,1,0,0,
        0,1215,1216,5,2,0,0,1216,1221,5,85,0,0,1217,1218,5,9,0,0,1218,1221,
        5,85,0,0,1219,1221,3,184,92,0,1220,1215,1,0,0,0,1220,1217,1,0,0,
        0,1220,1219,1,0,0,0,1221,187,1,0,0,0,1222,1229,5,120,0,0,1223,1224,
        5,105,0,0,1224,1225,3,94,47,0,1225,1226,5,106,0,0,1226,1229,1,0,
        0,0,1227,1229,5,116,0,0,1228,1222,1,0,0,0,1228,1223,1,0,0,0,1228,
        1227,1,0,0,0,1229,189,1,0,0,0,1230,1231,7,29,0,0,1231,191,1,0,0,
        0,1232,1234,5,76,0,0,1233,1232,1,0,0,0,1233,1234,1,0,0,0,1234,1235,
        1,0,0,0,1235,1236,3,94,47,0,1236,193,1,0,0,0,1237,1244,3,192,96,
        0,1238,1240,5,86,0,0,1239,1241,3,192,96,0,1240,1239,1,0,0,0,1240,
        1241,1,0,0,0,1241,1243,1,0,0,0,1242,1238,1,0,0,0,1243,1246,1,0,0,
        0,1244,1242,1,0,0,0,1244,1245,1,0,0,0,1245,1248,1,0,0,0,1246,1244,
        1,0,0,0,1247,1249,5,87,0,0,1248,1247,1,0,0,0,1248,1249,1,0,0,0,1249,
        195,1,0,0,0,159,199,201,219,222,234,243,251,260,264,271,276,282,
        289,294,302,316,326,330,339,341,346,350,353,360,367,371,385,389,
        394,398,406,413,417,422,437,441,444,447,452,457,460,467,473,487,
        497,501,504,511,517,525,530,533,538,541,548,554,561,567,573,582,
        589,597,600,609,612,615,627,630,638,642,656,662,671,680,689,696,
        704,712,720,728,736,744,752,760,768,777,780,786,794,797,802,807,
        812,820,838,841,844,854,865,872,883,886,892,896,900,904,909,915,
        918,922,925,928,933,936,941,943,946,958,963,965,988,993,1000,1013,
        1019,1026,1048,1052,1061,1063,1074,1084,1087,1092,1099,1107,1115,
        1124,1140,1148,1150,1157,1160,1164,1168,1174,1182,1189,1192,1199,
        1202,1205,1211,1220,1228,1233,1240,1244,1248
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

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(LPCParser.EOF, 0)!;
    }
    public declaration(): DeclarationContext[];
    public declaration(i: number): DeclarationContext | null;
    public declaration(i?: number): DeclarationContext[] | DeclarationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(DeclarationContext);
        }

        return this.getRuleContext(i, DeclarationContext);
    }
    public preprocessorDirective(): PreprocessorDirectiveContext[];
    public preprocessorDirective(i: number): PreprocessorDirectiveContext | null;
    public preprocessorDirective(i?: number): PreprocessorDirectiveContext[] | PreprocessorDirectiveContext | null {
        if (i === undefined) {
            return this.getRuleContexts(PreprocessorDirectiveContext);
        }

        return this.getRuleContext(i, PreprocessorDirectiveContext);
    }
    public inheritStatement(): InheritStatementContext[];
    public inheritStatement(i: number): InheritStatementContext | null;
    public inheritStatement(i?: number): InheritStatementContext[] | InheritStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(InheritStatementContext);
        }

        return this.getRuleContext(i, InheritStatementContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_program;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitProgram) {
             listener.exitProgram(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitProgram) {
            return visitor.visitProgram(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PreprocessorDirectiveContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public selectionPreprocessorDirective(): SelectionPreprocessorDirectiveContext | null {
        return this.getRuleContext(0, SelectionPreprocessorDirectiveContext);
    }
    public directiveTypeWithArguments(): DirectiveTypeWithArgumentsContext | null {
        return this.getRuleContext(0, DirectiveTypeWithArgumentsContext);
    }
    public directiveArgument(): DirectiveArgumentContext | null {
        return this.getRuleContext(0, DirectiveArgumentContext);
    }
    public definePreprocessorDirective(): DefinePreprocessorDirectiveContext | null {
        return this.getRuleContext(0, DefinePreprocessorDirectiveContext);
    }
    public includePreprocessorDirective(): IncludePreprocessorDirectiveContext | null {
        return this.getRuleContext(0, IncludePreprocessorDirectiveContext);
    }
    public HASH(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.HASH, 0);
    }
    public directiveTypePragma(): DirectiveTypePragmaContext | null {
        return this.getRuleContext(0, DirectiveTypePragmaContext);
    }
    public Identifier(): antlr.TerminalNode[];
    public Identifier(i: number): antlr.TerminalNode | null;
    public Identifier(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.Identifier);
    	} else {
    		return this.getToken(LPCParser.Identifier, i);
    	}
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.COMMA);
    	} else {
    		return this.getToken(LPCParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_preprocessorDirective;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterPreprocessorDirective) {
             listener.enterPreprocessorDirective(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitPreprocessorDirective) {
             listener.exitPreprocessorDirective(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitPreprocessorDirective) {
            return visitor.visitPreprocessorDirective(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IncludePreprocessorDirectiveContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public HASH(): antlr.TerminalNode {
        return this.getToken(LPCParser.HASH, 0)!;
    }
    public directiveTypeInclude(): DirectiveTypeIncludeContext {
        return this.getRuleContext(0, DirectiveTypeIncludeContext)!;
    }
    public directiveIncludeFile(): DirectiveIncludeFileContext {
        return this.getRuleContext(0, DirectiveIncludeFileContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_includePreprocessorDirective;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterIncludePreprocessorDirective) {
             listener.enterIncludePreprocessorDirective(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitIncludePreprocessorDirective) {
             listener.exitIncludePreprocessorDirective(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitIncludePreprocessorDirective) {
            return visitor.visitIncludePreprocessorDirective(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DefinePreprocessorDirectiveContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DEFINE(): antlr.TerminalNode {
        return this.getToken(LPCParser.DEFINE, 0)!;
    }
    public END_DEFINE(): antlr.TerminalNode {
        return this.getToken(LPCParser.END_DEFINE, 0)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_definePreprocessorDirective;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterDefinePreprocessorDirective) {
             listener.enterDefinePreprocessorDirective(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitDefinePreprocessorDirective) {
             listener.exitDefinePreprocessorDirective(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitDefinePreprocessorDirective) {
            return visitor.visitDefinePreprocessorDirective(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SelectionPreprocessorDirectiveContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public HASH(): antlr.TerminalNode {
        return this.getToken(LPCParser.HASH, 0)!;
    }
    public selectionPreprocessorDirectiveTypeWithArg(): SelectionPreprocessorDirectiveTypeWithArgContext | null {
        return this.getRuleContext(0, SelectionPreprocessorDirectiveTypeWithArgContext);
    }
    public directiveArgument(): DirectiveArgumentContext | null {
        return this.getRuleContext(0, DirectiveArgumentContext);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.NOT, 0);
    }
    public directiveIfTestExpression(): DirectiveIfTestExpressionContext | null {
        return this.getRuleContext(0, DirectiveIfTestExpressionContext);
    }
    public IF(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.IF, 0);
    }
    public ELIF(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.ELIF, 0);
    }
    public selectionPreprocessorDirectiveTypeSingle(): SelectionPreprocessorDirectiveTypeSingleContext | null {
        return this.getRuleContext(0, SelectionPreprocessorDirectiveTypeSingleContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_selectionPreprocessorDirective;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterSelectionPreprocessorDirective) {
             listener.enterSelectionPreprocessorDirective(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitSelectionPreprocessorDirective) {
             listener.exitSelectionPreprocessorDirective(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitSelectionPreprocessorDirective) {
            return visitor.visitSelectionPreprocessorDirective(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SelectionPreprocessorDirectiveTypeSingleContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ELSE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.ELSE, 0);
    }
    public ENDIF(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.ENDIF, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_selectionPreprocessorDirectiveTypeSingle;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterSelectionPreprocessorDirectiveTypeSingle) {
             listener.enterSelectionPreprocessorDirectiveTypeSingle(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitSelectionPreprocessorDirectiveTypeSingle) {
             listener.exitSelectionPreprocessorDirectiveTypeSingle(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitSelectionPreprocessorDirectiveTypeSingle) {
            return visitor.visitSelectionPreprocessorDirectiveTypeSingle(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SelectionPreprocessorDirectiveTypeWithArgContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IFDEF(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.IFDEF, 0);
    }
    public IFNDEF(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.IFNDEF, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_selectionPreprocessorDirectiveTypeWithArg;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterSelectionPreprocessorDirectiveTypeWithArg) {
             listener.enterSelectionPreprocessorDirectiveTypeWithArg(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitSelectionPreprocessorDirectiveTypeWithArg) {
             listener.exitSelectionPreprocessorDirectiveTypeWithArg(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitSelectionPreprocessorDirectiveTypeWithArg) {
            return visitor.visitSelectionPreprocessorDirectiveTypeWithArg(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DirectiveIfTestExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public directiveIfArgument(): DirectiveIfArgumentContext | null {
        return this.getRuleContext(0, DirectiveIfArgumentContext);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.NOT, 0);
    }
    public directiveIfTestExpression(): DirectiveIfTestExpressionContext[];
    public directiveIfTestExpression(i: number): DirectiveIfTestExpressionContext | null;
    public directiveIfTestExpression(i?: number): DirectiveIfTestExpressionContext[] | DirectiveIfTestExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(DirectiveIfTestExpressionContext);
        }

        return this.getRuleContext(i, DirectiveIfTestExpressionContext);
    }
    public AND_AND(): antlr.TerminalNode[];
    public AND_AND(i: number): antlr.TerminalNode | null;
    public AND_AND(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.AND_AND);
    	} else {
    		return this.getToken(LPCParser.AND_AND, i);
    	}
    }
    public OR_OR(): antlr.TerminalNode[];
    public OR_OR(i: number): antlr.TerminalNode | null;
    public OR_OR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.OR_OR);
    	} else {
    		return this.getToken(LPCParser.OR_OR, i);
    	}
    }
    public EQ(): antlr.TerminalNode[];
    public EQ(i: number): antlr.TerminalNode | null;
    public EQ(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.EQ);
    	} else {
    		return this.getToken(LPCParser.EQ, i);
    	}
    }
    public NE(): antlr.TerminalNode[];
    public NE(i: number): antlr.TerminalNode | null;
    public NE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.NE);
    	} else {
    		return this.getToken(LPCParser.NE, i);
    	}
    }
    public LT(): antlr.TerminalNode[];
    public LT(i: number): antlr.TerminalNode | null;
    public LT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.LT);
    	} else {
    		return this.getToken(LPCParser.LT, i);
    	}
    }
    public GT(): antlr.TerminalNode[];
    public GT(i: number): antlr.TerminalNode | null;
    public GT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.GT);
    	} else {
    		return this.getToken(LPCParser.GT, i);
    	}
    }
    public LE(): antlr.TerminalNode[];
    public LE(i: number): antlr.TerminalNode | null;
    public LE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.LE);
    	} else {
    		return this.getToken(LPCParser.LE, i);
    	}
    }
    public GE(): antlr.TerminalNode[];
    public GE(i: number): antlr.TerminalNode | null;
    public GE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.GE);
    	} else {
    		return this.getToken(LPCParser.GE, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_directiveIfTestExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterDirectiveIfTestExpression) {
             listener.enterDirectiveIfTestExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitDirectiveIfTestExpression) {
             listener.exitDirectiveIfTestExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitDirectiveIfTestExpression) {
            return visitor.visitDirectiveIfTestExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DirectiveIfArgumentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Identifier(): antlr.TerminalNode[];
    public Identifier(i: number): antlr.TerminalNode | null;
    public Identifier(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.Identifier);
    	} else {
    		return this.getToken(LPCParser.Identifier, i);
    	}
    }
    public PAREN_OPEN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PAREN_OPEN, 0);
    }
    public PAREN_CLOSE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PAREN_CLOSE, 0);
    }
    public StringLiteral(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.StringLiteral, 0);
    }
    public IntegerConstant(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.IntegerConstant, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_directiveIfArgument;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterDirectiveIfArgument) {
             listener.enterDirectiveIfArgument(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitDirectiveIfArgument) {
             listener.exitDirectiveIfArgument(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitDirectiveIfArgument) {
            return visitor.visitDirectiveIfArgument(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DirectiveTypeWithArgumentsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public HASH(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.HASH, 0);
    }
    public UNDEF(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.UNDEF, 0);
    }
    public ECHO(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.ECHO, 0);
    }
    public LINE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.LINE, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_directiveTypeWithArguments;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterDirectiveTypeWithArguments) {
             listener.enterDirectiveTypeWithArguments(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitDirectiveTypeWithArguments) {
             listener.exitDirectiveTypeWithArguments(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitDirectiveTypeWithArguments) {
            return visitor.visitDirectiveTypeWithArguments(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DirectiveArgumentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Identifier(): antlr.TerminalNode[];
    public Identifier(i: number): antlr.TerminalNode | null;
    public Identifier(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.Identifier);
    	} else {
    		return this.getToken(LPCParser.Identifier, i);
    	}
    }
    public MINUS(): antlr.TerminalNode[];
    public MINUS(i: number): antlr.TerminalNode | null;
    public MINUS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.MINUS);
    	} else {
    		return this.getToken(LPCParser.MINUS, i);
    	}
    }
    public StringLiteral(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.StringLiteral, 0);
    }
    public IntegerConstant(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.IntegerConstant, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_directiveArgument;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterDirectiveArgument) {
             listener.enterDirectiveArgument(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitDirectiveArgument) {
             listener.exitDirectiveArgument(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitDirectiveArgument) {
            return visitor.visitDirectiveArgument(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DirectiveDefineParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PAREN_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_OPEN, 0)!;
    }
    public Identifier(): antlr.TerminalNode[];
    public Identifier(i: number): antlr.TerminalNode | null;
    public Identifier(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.Identifier);
    	} else {
    		return this.getToken(LPCParser.Identifier, i);
    	}
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.COMMA);
    	} else {
    		return this.getToken(LPCParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_directiveDefineParam;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterDirectiveDefineParam) {
             listener.enterDirectiveDefineParam(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitDirectiveDefineParam) {
             listener.exitDirectiveDefineParam(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitDirectiveDefineParam) {
            return visitor.visitDirectiveDefineParam(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DirectiveDefineArgumentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_directiveDefineArgument;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterDirectiveDefineArgument) {
             listener.enterDirectiveDefineArgument(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitDirectiveDefineArgument) {
             listener.exitDirectiveDefineArgument(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitDirectiveDefineArgument) {
            return visitor.visitDirectiveDefineArgument(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DirectiveTypeIncludeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INCLUDE(): antlr.TerminalNode {
        return this.getToken(LPCParser.INCLUDE, 0)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_directiveTypeInclude;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterDirectiveTypeInclude) {
             listener.enterDirectiveTypeInclude(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitDirectiveTypeInclude) {
             listener.exitDirectiveTypeInclude(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitDirectiveTypeInclude) {
            return visitor.visitDirectiveTypeInclude(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DirectiveGlobalFileContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LT(): antlr.TerminalNode {
        return this.getToken(LPCParser.LT, 0)!;
    }
    public Identifier(): antlr.TerminalNode[];
    public Identifier(i: number): antlr.TerminalNode | null;
    public Identifier(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.Identifier);
    	} else {
    		return this.getToken(LPCParser.Identifier, i);
    	}
    }
    public GT(): antlr.TerminalNode {
        return this.getToken(LPCParser.GT, 0)!;
    }
    public DIV(): antlr.TerminalNode[];
    public DIV(i: number): antlr.TerminalNode | null;
    public DIV(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.DIV);
    	} else {
    		return this.getToken(LPCParser.DIV, i);
    	}
    }
    public DOT(): antlr.TerminalNode[];
    public DOT(i: number): antlr.TerminalNode | null;
    public DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.DOT);
    	} else {
    		return this.getToken(LPCParser.DOT, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_directiveGlobalFile;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterDirectiveGlobalFile) {
             listener.enterDirectiveGlobalFile(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitDirectiveGlobalFile) {
             listener.exitDirectiveGlobalFile(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitDirectiveGlobalFile) {
            return visitor.visitDirectiveGlobalFile(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DirectiveIncludeFileContext extends antlr.ParserRuleContext {
    public _globalFile?: DirectiveGlobalFileContext;
    public _localFile?: Token | null;
    public _defineFile?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public directiveGlobalFile(): DirectiveGlobalFileContext | null {
        return this.getRuleContext(0, DirectiveGlobalFileContext);
    }
    public StringLiteral(): antlr.TerminalNode[];
    public StringLiteral(i: number): antlr.TerminalNode | null;
    public StringLiteral(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.StringLiteral);
    	} else {
    		return this.getToken(LPCParser.StringLiteral, i);
    	}
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_directiveIncludeFile;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterDirectiveIncludeFile) {
             listener.enterDirectiveIncludeFile(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitDirectiveIncludeFile) {
             listener.exitDirectiveIncludeFile(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitDirectiveIncludeFile) {
            return visitor.visitDirectiveIncludeFile(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DirectiveTypePragmaContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PRAGMA(): antlr.TerminalNode {
        return this.getToken(LPCParser.PRAGMA, 0)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_directiveTypePragma;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterDirectiveTypePragma) {
             listener.enterDirectiveTypePragma(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitDirectiveTypePragma) {
             listener.exitDirectiveTypePragma(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitDirectiveTypePragma) {
            return visitor.visitDirectiveTypePragma(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class InheritStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(LPCParser.SEMI, 0)!;
    }
    public inherit(): InheritContext | null {
        return this.getRuleContext(0, InheritContext);
    }
    public DEFAULT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DEFAULT, 0);
    }
    public inheritModifier(): InheritModifierContext[];
    public inheritModifier(i: number): InheritModifierContext | null;
    public inheritModifier(i?: number): InheritModifierContext[] | InheritModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(InheritModifierContext);
        }

        return this.getRuleContext(i, InheritModifierContext);
    }
    public VIRTUAL(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.VIRTUAL, 0);
    }
    public defaultModifier(): DefaultModifierContext[];
    public defaultModifier(i: number): DefaultModifierContext | null;
    public defaultModifier(i?: number): DefaultModifierContext[] | DefaultModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(DefaultModifierContext);
        }

        return this.getRuleContext(i, DefaultModifierContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_inheritStatement;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterInheritStatement) {
             listener.enterInheritStatement(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitInheritStatement) {
             listener.exitInheritStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitInheritStatement) {
            return visitor.visitInheritStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class InheritModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public FUNCTIONS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.FUNCTIONS, 0);
    }
    public functionModifier(): FunctionModifierContext[];
    public functionModifier(i: number): FunctionModifierContext | null;
    public functionModifier(i?: number): FunctionModifierContext[] | FunctionModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FunctionModifierContext);
        }

        return this.getRuleContext(i, FunctionModifierContext);
    }
    public VARIABLES(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.VARIABLES, 0);
    }
    public STRUCTS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.STRUCTS, 0);
    }
    public variableModifier(): VariableModifierContext[];
    public variableModifier(i: number): VariableModifierContext | null;
    public variableModifier(i?: number): VariableModifierContext[] | VariableModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VariableModifierContext);
        }

        return this.getRuleContext(i, VariableModifierContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_inheritModifier;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterInheritModifier) {
             listener.enterInheritModifier(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitInheritModifier) {
             listener.exitInheritModifier(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitInheritModifier) {
            return visitor.visitInheritModifier(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class InheritContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INHERIT(): antlr.TerminalNode {
        return this.getToken(LPCParser.INHERIT, 0)!;
    }
    public inheritFile(): InheritFileContext {
        return this.getRuleContext(0, InheritFileContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_inherit;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterInherit) {
             listener.enterInherit(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitInherit) {
             listener.exitInherit(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitInherit) {
            return visitor.visitInherit(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DefaultModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PRIVATE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PRIVATE, 0);
    }
    public PROTECTED(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PROTECTED, 0);
    }
    public VISIBLE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.VISIBLE, 0);
    }
    public PUBLIC(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PUBLIC, 0);
    }
    public STATIC(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.STATIC, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_defaultModifier;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterDefaultModifier) {
             listener.enterDefaultModifier(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitDefaultModifier) {
             listener.exitDefaultModifier(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitDefaultModifier) {
            return visitor.visitDefaultModifier(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class InheritFileContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public StringLiteral(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.StringLiteral, 0);
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
    }
    public PAREN_OPEN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PAREN_OPEN, 0);
    }
    public inheritFile(): InheritFileContext[];
    public inheritFile(i: number): InheritFileContext | null;
    public inheritFile(i?: number): InheritFileContext[] | InheritFileContext | null {
        if (i === undefined) {
            return this.getRuleContexts(InheritFileContext);
        }

        return this.getRuleContext(i, InheritFileContext);
    }
    public PAREN_CLOSE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PAREN_CLOSE, 0);
    }
    public PLUS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PLUS, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_inheritFile;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterInheritFile) {
             listener.enterInheritFile(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitInheritFile) {
             listener.exitInheritFile(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitInheritFile) {
            return visitor.visitInheritFile(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class InheritSuperExpressionContext extends antlr.ParserRuleContext {
    public _filename?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SUPER_ACCESSOR(): antlr.TerminalNode {
        return this.getToken(LPCParser.SUPER_ACCESSOR, 0)!;
    }
    public StringLiteral(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.StringLiteral, 0);
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_inheritSuperExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterInheritSuperExpression) {
             listener.enterInheritSuperExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitInheritSuperExpression) {
             listener.exitInheritSuperExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitInheritSuperExpression) {
            return visitor.visitInheritSuperExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public functionHeaderDeclaration(): FunctionHeaderDeclarationContext | null {
        return this.getRuleContext(0, FunctionHeaderDeclarationContext);
    }
    public functionDeclaration(): FunctionDeclarationContext | null {
        return this.getRuleContext(0, FunctionDeclarationContext);
    }
    public structDeclaration(): StructDeclarationContext | null {
        return this.getRuleContext(0, StructDeclarationContext);
    }
    public variableDeclarationStatement(): VariableDeclarationStatementContext | null {
        return this.getRuleContext(0, VariableDeclarationStatementContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_declaration;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterDeclaration) {
             listener.enterDeclaration(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitDeclaration) {
             listener.exitDeclaration(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitDeclaration) {
            return visitor.visitDeclaration(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FunctionModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DEPRECATED(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DEPRECATED, 0);
    }
    public STATIC(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.STATIC, 0);
    }
    public PRIVATE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PRIVATE, 0);
    }
    public PROTECTED(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PROTECTED, 0);
    }
    public PUBLIC(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PUBLIC, 0);
    }
    public NOSHADOW(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.NOSHADOW, 0);
    }
    public NOMASK(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.NOMASK, 0);
    }
    public VARARGS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.VARARGS, 0);
    }
    public VISIBLE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.VISIBLE, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_functionModifier;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterFunctionModifier) {
             listener.enterFunctionModifier(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitFunctionModifier) {
             listener.exitFunctionModifier(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitFunctionModifier) {
            return visitor.visitFunctionModifier(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FunctionHeaderContext extends antlr.ParserRuleContext {
    public _functionName?: Token | null;
    public _functionArgs?: ParameterListContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PAREN_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_OPEN, 0)!;
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
    }
    public functionModifier(): FunctionModifierContext[];
    public functionModifier(i: number): FunctionModifierContext | null;
    public functionModifier(i?: number): FunctionModifierContext[] | FunctionModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FunctionModifierContext);
        }

        return this.getRuleContext(i, FunctionModifierContext);
    }
    public typeSpecifier(): TypeSpecifierContext | null {
        return this.getRuleContext(0, TypeSpecifierContext);
    }
    public parameterList(): ParameterListContext | null {
        return this.getRuleContext(0, ParameterListContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_functionHeader;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterFunctionHeader) {
             listener.enterFunctionHeader(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitFunctionHeader) {
             listener.exitFunctionHeader(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitFunctionHeader) {
            return visitor.visitFunctionHeader(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FunctionHeaderDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public functionHeader(): FunctionHeaderContext {
        return this.getRuleContext(0, FunctionHeaderContext)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(LPCParser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_functionHeaderDeclaration;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterFunctionHeaderDeclaration) {
             listener.enterFunctionHeaderDeclaration(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitFunctionHeaderDeclaration) {
             listener.exitFunctionHeaderDeclaration(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitFunctionHeaderDeclaration) {
            return visitor.visitFunctionHeaderDeclaration(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FunctionDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public functionHeader(): FunctionHeaderContext {
        return this.getRuleContext(0, FunctionHeaderContext)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_functionDeclaration;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterFunctionDeclaration) {
             listener.enterFunctionDeclaration(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitFunctionDeclaration) {
             listener.exitFunctionDeclaration(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitFunctionDeclaration) {
            return visitor.visitFunctionDeclaration(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ParameterListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public parameter(): ParameterContext[];
    public parameter(i: number): ParameterContext | null;
    public parameter(i?: number): ParameterContext[] | ParameterContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ParameterContext);
        }

        return this.getRuleContext(i, ParameterContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.COMMA);
    	} else {
    		return this.getToken(LPCParser.COMMA, i);
    	}
    }
    public VOID(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.VOID, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_parameterList;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterParameterList) {
             listener.enterParameterList(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitParameterList) {
             listener.exitParameterList(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitParameterList) {
            return visitor.visitParameterList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ParameterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_parameter;
    }
    public override copyFrom(ctx: ParameterContext): void {
        super.copyFrom(ctx);
    }
}
export class StructParameterExpressionContext extends ParameterContext {
    public _paramType?: Token | null;
    public _structName?: Token | null;
    public _paramName?: ValidIdentifiersContext;
    public constructor(ctx: ParameterContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public STRUCT(): antlr.TerminalNode {
        return this.getToken(LPCParser.STRUCT, 0)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
    }
    public validIdentifiers(): ValidIdentifiersContext {
        return this.getRuleContext(0, ValidIdentifiersContext)!;
    }
    public STAR(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.STAR, 0);
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterStructParameterExpression) {
             listener.enterStructParameterExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitStructParameterExpression) {
             listener.exitStructParameterExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitStructParameterExpression) {
            return visitor.visitStructParameterExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PrimitiveTypeParameterExpressionContext extends ParameterContext {
    public _paramType?: UnionableTypeSpecifierContext;
    public _paramName?: ValidIdentifiersContext;
    public constructor(ctx: ParameterContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public validIdentifiers(): ValidIdentifiersContext {
        return this.getRuleContext(0, ValidIdentifiersContext)!;
    }
    public VARARGS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.VARARGS, 0);
    }
    public ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.ASSIGN, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public unionableTypeSpecifier(): UnionableTypeSpecifierContext | null {
        return this.getRuleContext(0, UnionableTypeSpecifierContext);
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterPrimitiveTypeParameterExpression) {
             listener.enterPrimitiveTypeParameterExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitPrimitiveTypeParameterExpression) {
             listener.exitPrimitiveTypeParameterExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitPrimitiveTypeParameterExpression) {
            return visitor.visitPrimitiveTypeParameterExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StructDeclarationContext extends antlr.ParserRuleContext {
    public _structName?: Token | null;
    public _structInherits?: Token | null;
    public _structMembers?: StructMemberDeclarationContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public STRUCT(): antlr.TerminalNode {
        return this.getToken(LPCParser.STRUCT, 0)!;
    }
    public CURLY_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.CURLY_OPEN, 0)!;
    }
    public CURLY_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.CURLY_CLOSE, 0)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(LPCParser.SEMI, 0)!;
    }
    public Identifier(): antlr.TerminalNode[];
    public Identifier(i: number): antlr.TerminalNode | null;
    public Identifier(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.Identifier);
    	} else {
    		return this.getToken(LPCParser.Identifier, i);
    	}
    }
    public PAREN_OPEN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PAREN_OPEN, 0);
    }
    public PAREN_CLOSE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PAREN_CLOSE, 0);
    }
    public structMemberDeclaration(): StructMemberDeclarationContext[];
    public structMemberDeclaration(i: number): StructMemberDeclarationContext | null;
    public structMemberDeclaration(i?: number): StructMemberDeclarationContext[] | StructMemberDeclarationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StructMemberDeclarationContext);
        }

        return this.getRuleContext(i, StructMemberDeclarationContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_structDeclaration;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterStructDeclaration) {
             listener.enterStructDeclaration(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitStructDeclaration) {
             listener.exitStructDeclaration(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitStructDeclaration) {
            return visitor.visitStructDeclaration(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StructMemberDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public typeSpecifier(): TypeSpecifierContext {
        return this.getRuleContext(0, TypeSpecifierContext)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(LPCParser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_structMemberDeclaration;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterStructMemberDeclaration) {
             listener.enterStructMemberDeclaration(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitStructMemberDeclaration) {
             listener.exitStructMemberDeclaration(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitStructMemberDeclaration) {
            return visitor.visitStructMemberDeclaration(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StructMemberInitializerContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.COLON, 0);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_structMemberInitializer;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterStructMemberInitializer) {
             listener.enterStructMemberInitializer(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitStructMemberInitializer) {
             listener.exitStructMemberInitializer(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitStructMemberInitializer) {
            return visitor.visitStructMemberInitializer(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class VariableModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public STATIC(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.STATIC, 0);
    }
    public DEPRECATED(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DEPRECATED, 0);
    }
    public PRIVATE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PRIVATE, 0);
    }
    public PROTECTED(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PROTECTED, 0);
    }
    public PUBLIC(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PUBLIC, 0);
    }
    public NOSHADOW(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.NOSHADOW, 0);
    }
    public NOMASK(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.NOMASK, 0);
    }
    public NOSAVE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.NOSAVE, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_variableModifier;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterVariableModifier) {
             listener.enterVariableModifier(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitVariableModifier) {
             listener.exitVariableModifier(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitVariableModifier) {
            return visitor.visitVariableModifier(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class VariableDeclarationStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public variableDeclaration(): VariableDeclarationContext {
        return this.getRuleContext(0, VariableDeclarationContext)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(LPCParser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_variableDeclarationStatement;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterVariableDeclarationStatement) {
             listener.enterVariableDeclarationStatement(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitVariableDeclarationStatement) {
             listener.exitVariableDeclarationStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitVariableDeclarationStatement) {
            return visitor.visitVariableDeclarationStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class VariableDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_variableDeclaration;
    }
    public override copyFrom(ctx: VariableDeclarationContext): void {
        super.copyFrom(ctx);
    }
}
export class PrimitiveTypeVariableDeclarationContext extends VariableDeclarationContext {
    public _objectName?: Token | null;
    public constructor(ctx: VariableDeclarationContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public variableDeclaratorExpression(): VariableDeclaratorExpressionContext[];
    public variableDeclaratorExpression(i: number): VariableDeclaratorExpressionContext | null;
    public variableDeclaratorExpression(i?: number): VariableDeclaratorExpressionContext[] | VariableDeclaratorExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VariableDeclaratorExpressionContext);
        }

        return this.getRuleContext(i, VariableDeclaratorExpressionContext);
    }
    public variableModifier(): VariableModifierContext[];
    public variableModifier(i: number): VariableModifierContext | null;
    public variableModifier(i?: number): VariableModifierContext[] | VariableModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VariableModifierContext);
        }

        return this.getRuleContext(i, VariableModifierContext);
    }
    public unionableTypeSpecifier(): UnionableTypeSpecifierContext | null {
        return this.getRuleContext(0, UnionableTypeSpecifierContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.COMMA);
    	} else {
    		return this.getToken(LPCParser.COMMA, i);
    	}
    }
    public StringLiteral(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.StringLiteral, 0);
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterPrimitiveTypeVariableDeclaration) {
             listener.enterPrimitiveTypeVariableDeclaration(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitPrimitiveTypeVariableDeclaration) {
             listener.exitPrimitiveTypeVariableDeclaration(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitPrimitiveTypeVariableDeclaration) {
            return visitor.visitPrimitiveTypeVariableDeclaration(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class StructVariableDeclarationContext extends VariableDeclarationContext {
    public _structName?: Token | null;
    public constructor(ctx: VariableDeclarationContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public STRUCT(): antlr.TerminalNode {
        return this.getToken(LPCParser.STRUCT, 0)!;
    }
    public variableDeclaratorExpression(): VariableDeclaratorExpressionContext[];
    public variableDeclaratorExpression(i: number): VariableDeclaratorExpressionContext | null;
    public variableDeclaratorExpression(i?: number): VariableDeclaratorExpressionContext[] | VariableDeclaratorExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VariableDeclaratorExpressionContext);
        }

        return this.getRuleContext(i, VariableDeclaratorExpressionContext);
    }
    public Identifier(): antlr.TerminalNode[];
    public Identifier(i: number): antlr.TerminalNode | null;
    public Identifier(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.Identifier);
    	} else {
    		return this.getToken(LPCParser.Identifier, i);
    	}
    }
    public variableModifier(): VariableModifierContext[];
    public variableModifier(i: number): VariableModifierContext | null;
    public variableModifier(i?: number): VariableModifierContext[] | VariableModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VariableModifierContext);
        }

        return this.getRuleContext(i, VariableModifierContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.COMMA);
    	} else {
    		return this.getToken(LPCParser.COMMA, i);
    	}
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterStructVariableDeclaration) {
             listener.enterStructVariableDeclaration(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitStructVariableDeclaration) {
             listener.exitStructVariableDeclaration(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitStructVariableDeclaration) {
            return visitor.visitStructVariableDeclaration(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class VariableDeclaratorExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public variableDeclarator(): VariableDeclaratorContext {
        return this.getRuleContext(0, VariableDeclaratorContext)!;
    }
    public ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.ASSIGN, 0);
    }
    public variableInitializer(): VariableInitializerContext | null {
        return this.getRuleContext(0, VariableInitializerContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_variableDeclaratorExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterVariableDeclaratorExpression) {
             listener.enterVariableDeclaratorExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitVariableDeclaratorExpression) {
             listener.exitVariableDeclaratorExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitVariableDeclaratorExpression) {
            return visitor.visitVariableDeclaratorExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class VariableDeclaratorContext extends antlr.ParserRuleContext {
    public _arraySpecifier?: Token | null;
    public _variableName?: ValidIdentifiersContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public validIdentifiers(): ValidIdentifiersContext {
        return this.getRuleContext(0, ValidIdentifiersContext)!;
    }
    public STAR(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.STAR, 0);
    }
    public ARRAY(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.ARRAY, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_variableDeclarator;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterVariableDeclarator) {
             listener.enterVariableDeclarator(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitVariableDeclarator) {
             listener.exitVariableDeclarator(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitVariableDeclarator) {
            return visitor.visitVariableDeclarator(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class VariableInitializerContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public arrayExpression(): ArrayExpressionContext | null {
        return this.getRuleContext(0, ArrayExpressionContext);
    }
    public mappingExpression(): MappingExpressionContext | null {
        return this.getRuleContext(0, MappingExpressionContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_variableInitializer;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterVariableInitializer) {
             listener.enterVariableInitializer(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitVariableInitializer) {
             listener.exitVariableInitializer(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitVariableInitializer) {
            return visitor.visitVariableInitializer(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PrimitiveTypeSpecifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public VOID(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.VOID, 0);
    }
    public BYTES(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.BYTES, 0);
    }
    public CHAR(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.CHAR, 0);
    }
    public INT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.INT, 0);
    }
    public FLOAT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.FLOAT, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.STRING, 0);
    }
    public OBJECT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.OBJECT, 0);
    }
    public MAPPING(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.MAPPING, 0);
    }
    public MIXED(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.MIXED, 0);
    }
    public STATUS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.STATUS, 0);
    }
    public CLOSURE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.CLOSURE, 0);
    }
    public SYMBOL(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SYMBOL, 0);
    }
    public LWOBJECT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.LWOBJECT, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_primitiveTypeSpecifier;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterPrimitiveTypeSpecifier) {
             listener.enterPrimitiveTypeSpecifier(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitPrimitiveTypeSpecifier) {
             listener.exitPrimitiveTypeSpecifier(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitPrimitiveTypeSpecifier) {
            return visitor.visitPrimitiveTypeSpecifier(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MethodInvocationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PAREN_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_OPEN, 0)!;
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public argumentList(): ArgumentListContext | null {
        return this.getRuleContext(0, ArgumentListContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_methodInvocation;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterMethodInvocation) {
             listener.enterMethodInvocation(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitMethodInvocation) {
             listener.exitMethodInvocation(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitMethodInvocation) {
            return visitor.visitMethodInvocation(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StructTypeSpecifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public STRUCT(): antlr.TerminalNode {
        return this.getToken(LPCParser.STRUCT, 0)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
    }
    public STAR(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.STAR, 0);
    }
    public ARRAY(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.ARRAY, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_structTypeSpecifier;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterStructTypeSpecifier) {
             listener.enterStructTypeSpecifier(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitStructTypeSpecifier) {
             listener.exitStructTypeSpecifier(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitStructTypeSpecifier) {
            return visitor.visitStructTypeSpecifier(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TypeSpecifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unionableTypeSpecifier(): UnionableTypeSpecifierContext {
        return this.getRuleContext(0, UnionableTypeSpecifierContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_typeSpecifier;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterTypeSpecifier) {
             listener.enterTypeSpecifier(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitTypeSpecifier) {
             listener.exitTypeSpecifier(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitTypeSpecifier) {
            return visitor.visitTypeSpecifier(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class UnionableTypeSpecifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public primitiveTypeSpecifier(): PrimitiveTypeSpecifierContext | null {
        return this.getRuleContext(0, PrimitiveTypeSpecifierContext);
    }
    public OR(): antlr.TerminalNode[];
    public OR(i: number): antlr.TerminalNode | null;
    public OR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.OR);
    	} else {
    		return this.getToken(LPCParser.OR, i);
    	}
    }
    public unionableTypeSpecifier(): UnionableTypeSpecifierContext[];
    public unionableTypeSpecifier(i: number): UnionableTypeSpecifierContext | null;
    public unionableTypeSpecifier(i?: number): UnionableTypeSpecifierContext[] | UnionableTypeSpecifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(UnionableTypeSpecifierContext);
        }

        return this.getRuleContext(i, UnionableTypeSpecifierContext);
    }
    public STAR(): antlr.TerminalNode[];
    public STAR(i: number): antlr.TerminalNode | null;
    public STAR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.STAR);
    	} else {
    		return this.getToken(LPCParser.STAR, i);
    	}
    }
    public ARRAY(): antlr.TerminalNode[];
    public ARRAY(i: number): antlr.TerminalNode | null;
    public ARRAY(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.ARRAY);
    	} else {
    		return this.getToken(LPCParser.ARRAY, i);
    	}
    }
    public LT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.LT, 0);
    }
    public typeSpecifier(): TypeSpecifierContext | null {
        return this.getRuleContext(0, TypeSpecifierContext);
    }
    public GT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.GT, 0);
    }
    public structTypeSpecifier(): StructTypeSpecifierContext | null {
        return this.getRuleContext(0, StructTypeSpecifierContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_unionableTypeSpecifier;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterUnionableTypeSpecifier) {
             listener.enterUnionableTypeSpecifier(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitUnionableTypeSpecifier) {
             listener.exitUnionableTypeSpecifier(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitUnionableTypeSpecifier) {
            return visitor.visitUnionableTypeSpecifier(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ArrayExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PAREN_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_OPEN, 0)!;
    }
    public CURLY_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.CURLY_OPEN, 0)!;
    }
    public CURLY_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.CURLY_CLOSE, 0)!;
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.COMMA);
    	} else {
    		return this.getToken(LPCParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_arrayExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterArrayExpression) {
             listener.enterArrayExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitArrayExpression) {
             listener.exitArrayExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitArrayExpression) {
            return visitor.visitArrayExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MappingContentContext extends antlr.ParserRuleContext {
    public _mappingKey?: ExpressionContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.COLON, 0);
    }
    public SEMI(): antlr.TerminalNode[];
    public SEMI(i: number): antlr.TerminalNode | null;
    public SEMI(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.SEMI);
    	} else {
    		return this.getToken(LPCParser.SEMI, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_mappingContent;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterMappingContent) {
             listener.enterMappingContent(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitMappingContent) {
             listener.exitMappingContent(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitMappingContent) {
            return visitor.visitMappingContent(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MappingExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_mappingExpression;
    }
    public override copyFrom(ctx: MappingExpressionContext): void {
        super.copyFrom(ctx);
    }
}
export class MappingEmptyInitializerContext extends MappingExpressionContext {
    public constructor(ctx: MappingExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public MAPPING_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.MAPPING_OPEN, 0)!;
    }
    public SQUARE_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.SQUARE_CLOSE, 0)!;
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterMappingEmptyInitializer) {
             listener.enterMappingEmptyInitializer(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitMappingEmptyInitializer) {
             listener.exitMappingEmptyInitializer(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitMappingEmptyInitializer) {
            return visitor.visitMappingEmptyInitializer(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class MappingValueInitializerContext extends MappingExpressionContext {
    public constructor(ctx: MappingExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public MAPPING_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.MAPPING_OPEN, 0)!;
    }
    public SQUARE_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.SQUARE_CLOSE, 0)!;
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public mappingContent(): MappingContentContext[];
    public mappingContent(i: number): MappingContentContext | null;
    public mappingContent(i?: number): MappingContentContext[] | MappingContentContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MappingContentContext);
        }

        return this.getRuleContext(i, MappingContentContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.COMMA);
    	} else {
    		return this.getToken(LPCParser.COMMA, i);
    	}
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterMappingValueInitializer) {
             listener.enterMappingValueInitializer(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitMappingValueInitializer) {
             listener.exitMappingValueInitializer(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitMappingValueInitializer) {
            return visitor.visitMappingValueInitializer(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class MappingKeylessInitializerContext extends MappingExpressionContext {
    public constructor(ctx: MappingExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public MAPPING_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.MAPPING_OPEN, 0)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(LPCParser.COLON, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public SQUARE_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.SQUARE_CLOSE, 0)!;
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterMappingKeylessInitializer) {
             listener.enterMappingKeylessInitializer(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitMappingKeylessInitializer) {
             listener.exitMappingKeylessInitializer(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitMappingKeylessInitializer) {
            return visitor.visitMappingKeylessInitializer(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public assignmentOrConditionalExpression(): AssignmentOrConditionalExpressionContext {
        return this.getRuleContext(0, AssignmentOrConditionalExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_expression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitExpression) {
             listener.exitExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitExpression) {
            return visitor.visitExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CommaableExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public inlineClosureExpression(): InlineClosureExpressionContext | null {
        return this.getRuleContext(0, InlineClosureExpressionContext);
    }
    public commaExpression(): CommaExpressionContext | null {
        return this.getRuleContext(0, CommaExpressionContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_commaableExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterCommaableExpression) {
             listener.enterCommaableExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitCommaableExpression) {
             listener.exitCommaableExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitCommaableExpression) {
            return visitor.visitCommaableExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AssignmentOperatorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.ASSIGN, 0);
    }
    public ADD_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.ADD_ASSIGN, 0);
    }
    public SUB_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SUB_ASSIGN, 0);
    }
    public MUL_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.MUL_ASSIGN, 0);
    }
    public DIV_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DIV_ASSIGN, 0);
    }
    public MOD_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.MOD_ASSIGN, 0);
    }
    public AND_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.AND_ASSIGN, 0);
    }
    public OR_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.OR_ASSIGN, 0);
    }
    public BITAND_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.BITAND_ASSIGN, 0);
    }
    public BITOR_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.BITOR_ASSIGN, 0);
    }
    public XOR_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.XOR_ASSIGN, 0);
    }
    public SHL_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SHL_ASSIGN, 0);
    }
    public RSH_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.RSH_ASSIGN, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_assignmentOperator;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterAssignmentOperator) {
             listener.enterAssignmentOperator(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitAssignmentOperator) {
             listener.exitAssignmentOperator(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitAssignmentOperator) {
            return visitor.visitAssignmentOperator(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CommaExpressionContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public assignmentOrConditionalExpression(): AssignmentOrConditionalExpressionContext[];
    public assignmentOrConditionalExpression(i: number): AssignmentOrConditionalExpressionContext | null;
    public assignmentOrConditionalExpression(i?: number): AssignmentOrConditionalExpressionContext[] | AssignmentOrConditionalExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AssignmentOrConditionalExpressionContext);
        }

        return this.getRuleContext(i, AssignmentOrConditionalExpressionContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.COMMA);
    	} else {
    		return this.getToken(LPCParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_commaExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterCommaExpression) {
             listener.enterCommaExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitCommaExpression) {
             listener.exitCommaExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitCommaExpression) {
            return visitor.visitCommaExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AssignmentOrConditionalExpressionContext extends antlr.ParserRuleContext {
    public _op?: AssignmentOperatorContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public conditionalTernaryExpression(): ConditionalTernaryExpressionContext[];
    public conditionalTernaryExpression(i: number): ConditionalTernaryExpressionContext | null;
    public conditionalTernaryExpression(i?: number): ConditionalTernaryExpressionContext[] | ConditionalTernaryExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConditionalTernaryExpressionContext);
        }

        return this.getRuleContext(i, ConditionalTernaryExpressionContext);
    }
    public assignmentOperator(): AssignmentOperatorContext[];
    public assignmentOperator(i: number): AssignmentOperatorContext | null;
    public assignmentOperator(i?: number): AssignmentOperatorContext[] | AssignmentOperatorContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AssignmentOperatorContext);
        }

        return this.getRuleContext(i, AssignmentOperatorContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_assignmentOrConditionalExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterAssignmentOrConditionalExpression) {
             listener.enterAssignmentOrConditionalExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitAssignmentOrConditionalExpression) {
             listener.exitAssignmentOrConditionalExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitAssignmentOrConditionalExpression) {
            return visitor.visitAssignmentOrConditionalExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ConditionalTernaryExpressionContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public conditionalOrExpression(): ConditionalOrExpressionContext {
        return this.getRuleContext(0, ConditionalOrExpressionContext)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.COLON, 0);
    }
    public QUESTION(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.QUESTION, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_conditionalTernaryExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterConditionalTernaryExpression) {
             listener.enterConditionalTernaryExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitConditionalTernaryExpression) {
             listener.exitConditionalTernaryExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitConditionalTernaryExpression) {
            return visitor.visitConditionalTernaryExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ConditionalOrExpressionContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public conditionalAndExpression(): ConditionalAndExpressionContext[];
    public conditionalAndExpression(i: number): ConditionalAndExpressionContext | null;
    public conditionalAndExpression(i?: number): ConditionalAndExpressionContext[] | ConditionalAndExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConditionalAndExpressionContext);
        }

        return this.getRuleContext(i, ConditionalAndExpressionContext);
    }
    public OR_OR(): antlr.TerminalNode[];
    public OR_OR(i: number): antlr.TerminalNode | null;
    public OR_OR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.OR_OR);
    	} else {
    		return this.getToken(LPCParser.OR_OR, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_conditionalOrExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterConditionalOrExpression) {
             listener.enterConditionalOrExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitConditionalOrExpression) {
             listener.exitConditionalOrExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitConditionalOrExpression) {
            return visitor.visitConditionalOrExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ConditionalAndExpressionContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public inclusiveOrExpression(): InclusiveOrExpressionContext[];
    public inclusiveOrExpression(i: number): InclusiveOrExpressionContext | null;
    public inclusiveOrExpression(i?: number): InclusiveOrExpressionContext[] | InclusiveOrExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(InclusiveOrExpressionContext);
        }

        return this.getRuleContext(i, InclusiveOrExpressionContext);
    }
    public AND_AND(): antlr.TerminalNode[];
    public AND_AND(i: number): antlr.TerminalNode | null;
    public AND_AND(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.AND_AND);
    	} else {
    		return this.getToken(LPCParser.AND_AND, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_conditionalAndExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterConditionalAndExpression) {
             listener.enterConditionalAndExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitConditionalAndExpression) {
             listener.exitConditionalAndExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitConditionalAndExpression) {
            return visitor.visitConditionalAndExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class InclusiveOrExpressionContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public exclusiveOrExpression(): ExclusiveOrExpressionContext[];
    public exclusiveOrExpression(i: number): ExclusiveOrExpressionContext | null;
    public exclusiveOrExpression(i?: number): ExclusiveOrExpressionContext[] | ExclusiveOrExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExclusiveOrExpressionContext);
        }

        return this.getRuleContext(i, ExclusiveOrExpressionContext);
    }
    public OR(): antlr.TerminalNode[];
    public OR(i: number): antlr.TerminalNode | null;
    public OR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.OR);
    	} else {
    		return this.getToken(LPCParser.OR, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_inclusiveOrExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterInclusiveOrExpression) {
             listener.enterInclusiveOrExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitInclusiveOrExpression) {
             listener.exitInclusiveOrExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitInclusiveOrExpression) {
            return visitor.visitInclusiveOrExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExclusiveOrExpressionContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public andExpression(): AndExpressionContext[];
    public andExpression(i: number): AndExpressionContext | null;
    public andExpression(i?: number): AndExpressionContext[] | AndExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AndExpressionContext);
        }

        return this.getRuleContext(i, AndExpressionContext);
    }
    public XOR(): antlr.TerminalNode[];
    public XOR(i: number): antlr.TerminalNode | null;
    public XOR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.XOR);
    	} else {
    		return this.getToken(LPCParser.XOR, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_exclusiveOrExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterExclusiveOrExpression) {
             listener.enterExclusiveOrExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitExclusiveOrExpression) {
             listener.exitExclusiveOrExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitExclusiveOrExpression) {
            return visitor.visitExclusiveOrExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AndExpressionContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public equalityExpression(): EqualityExpressionContext[];
    public equalityExpression(i: number): EqualityExpressionContext | null;
    public equalityExpression(i?: number): EqualityExpressionContext[] | EqualityExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(EqualityExpressionContext);
        }

        return this.getRuleContext(i, EqualityExpressionContext);
    }
    public AND(): antlr.TerminalNode[];
    public AND(i: number): antlr.TerminalNode | null;
    public AND(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.AND);
    	} else {
    		return this.getToken(LPCParser.AND, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_andExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterAndExpression) {
             listener.enterAndExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitAndExpression) {
             listener.exitAndExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitAndExpression) {
            return visitor.visitAndExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class EqualityExpressionContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public relationalExpression(): RelationalExpressionContext[];
    public relationalExpression(i: number): RelationalExpressionContext | null;
    public relationalExpression(i?: number): RelationalExpressionContext[] | RelationalExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(RelationalExpressionContext);
        }

        return this.getRuleContext(i, RelationalExpressionContext);
    }
    public EQ(): antlr.TerminalNode[];
    public EQ(i: number): antlr.TerminalNode | null;
    public EQ(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.EQ);
    	} else {
    		return this.getToken(LPCParser.EQ, i);
    	}
    }
    public NE(): antlr.TerminalNode[];
    public NE(i: number): antlr.TerminalNode | null;
    public NE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.NE);
    	} else {
    		return this.getToken(LPCParser.NE, i);
    	}
    }
    public IN(): antlr.TerminalNode[];
    public IN(i: number): antlr.TerminalNode | null;
    public IN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.IN);
    	} else {
    		return this.getToken(LPCParser.IN, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_equalityExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterEqualityExpression) {
             listener.enterEqualityExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitEqualityExpression) {
             listener.exitEqualityExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitEqualityExpression) {
            return visitor.visitEqualityExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class RelationalExpressionContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public shiftExpression(): ShiftExpressionContext[];
    public shiftExpression(i: number): ShiftExpressionContext | null;
    public shiftExpression(i?: number): ShiftExpressionContext[] | ShiftExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ShiftExpressionContext);
        }

        return this.getRuleContext(i, ShiftExpressionContext);
    }
    public LT(): antlr.TerminalNode[];
    public LT(i: number): antlr.TerminalNode | null;
    public LT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.LT);
    	} else {
    		return this.getToken(LPCParser.LT, i);
    	}
    }
    public GT(): antlr.TerminalNode[];
    public GT(i: number): antlr.TerminalNode | null;
    public GT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.GT);
    	} else {
    		return this.getToken(LPCParser.GT, i);
    	}
    }
    public LE(): antlr.TerminalNode[];
    public LE(i: number): antlr.TerminalNode | null;
    public LE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.LE);
    	} else {
    		return this.getToken(LPCParser.LE, i);
    	}
    }
    public GE(): antlr.TerminalNode[];
    public GE(i: number): antlr.TerminalNode | null;
    public GE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.GE);
    	} else {
    		return this.getToken(LPCParser.GE, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_relationalExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterRelationalExpression) {
             listener.enterRelationalExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitRelationalExpression) {
             listener.exitRelationalExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitRelationalExpression) {
            return visitor.visitRelationalExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ShiftExpressionContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public additiveExpression(): AdditiveExpressionContext[];
    public additiveExpression(i: number): AdditiveExpressionContext | null;
    public additiveExpression(i?: number): AdditiveExpressionContext[] | AdditiveExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AdditiveExpressionContext);
        }

        return this.getRuleContext(i, AdditiveExpressionContext);
    }
    public SHL(): antlr.TerminalNode[];
    public SHL(i: number): antlr.TerminalNode | null;
    public SHL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.SHL);
    	} else {
    		return this.getToken(LPCParser.SHL, i);
    	}
    }
    public SHR(): antlr.TerminalNode[];
    public SHR(i: number): antlr.TerminalNode | null;
    public SHR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.SHR);
    	} else {
    		return this.getToken(LPCParser.SHR, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_shiftExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterShiftExpression) {
             listener.enterShiftExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitShiftExpression) {
             listener.exitShiftExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitShiftExpression) {
            return visitor.visitShiftExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AdditiveExpressionContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public multiplicativeExpression(): MultiplicativeExpressionContext[];
    public multiplicativeExpression(i: number): MultiplicativeExpressionContext | null;
    public multiplicativeExpression(i?: number): MultiplicativeExpressionContext[] | MultiplicativeExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MultiplicativeExpressionContext);
        }

        return this.getRuleContext(i, MultiplicativeExpressionContext);
    }
    public PLUS(): antlr.TerminalNode[];
    public PLUS(i: number): antlr.TerminalNode | null;
    public PLUS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.PLUS);
    	} else {
    		return this.getToken(LPCParser.PLUS, i);
    	}
    }
    public MINUS(): antlr.TerminalNode[];
    public MINUS(i: number): antlr.TerminalNode | null;
    public MINUS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.MINUS);
    	} else {
    		return this.getToken(LPCParser.MINUS, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_additiveExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterAdditiveExpression) {
             listener.enterAdditiveExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitAdditiveExpression) {
             listener.exitAdditiveExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitAdditiveExpression) {
            return visitor.visitAdditiveExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MultiplicativeExpressionContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unaryExpression(): UnaryExpressionContext[];
    public unaryExpression(i: number): UnaryExpressionContext | null;
    public unaryExpression(i?: number): UnaryExpressionContext[] | UnaryExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(UnaryExpressionContext);
        }

        return this.getRuleContext(i, UnaryExpressionContext);
    }
    public STAR(): antlr.TerminalNode[];
    public STAR(i: number): antlr.TerminalNode | null;
    public STAR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.STAR);
    	} else {
    		return this.getToken(LPCParser.STAR, i);
    	}
    }
    public DIV(): antlr.TerminalNode[];
    public DIV(i: number): antlr.TerminalNode | null;
    public DIV(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.DIV);
    	} else {
    		return this.getToken(LPCParser.DIV, i);
    	}
    }
    public MOD(): antlr.TerminalNode[];
    public MOD(i: number): antlr.TerminalNode | null;
    public MOD(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.MOD);
    	} else {
    		return this.getToken(LPCParser.MOD, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_multiplicativeExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterMultiplicativeExpression) {
             listener.enterMultiplicativeExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitMultiplicativeExpression) {
             listener.exitMultiplicativeExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitMultiplicativeExpression) {
            return visitor.visitMultiplicativeExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class UnaryExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public castExpression(): CastExpressionContext | null {
        return this.getRuleContext(0, CastExpressionContext);
    }
    public primaryExpression(): PrimaryExpressionContext | null {
        return this.getRuleContext(0, PrimaryExpressionContext);
    }
    public lambdaExpression(): LambdaExpressionContext | null {
        return this.getRuleContext(0, LambdaExpressionContext);
    }
    public inlineClosureExpression(): InlineClosureExpressionContext | null {
        return this.getRuleContext(0, InlineClosureExpressionContext);
    }
    public unaryExpression(): UnaryExpressionContext | null {
        return this.getRuleContext(0, UnaryExpressionContext);
    }
    public PLUS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PLUS, 0);
    }
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.MINUS, 0);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.NOT, 0);
    }
    public BNOT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.BNOT, 0);
    }
    public INC(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.INC, 0);
    }
    public DEC(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DEC, 0);
    }
    public AND(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.AND, 0);
    }
    public STAR(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.STAR, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_unaryExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterUnaryExpression) {
             listener.enterUnaryExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitUnaryExpression) {
             listener.exitUnaryExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitUnaryExpression) {
            return visitor.visitUnaryExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PrimaryExpressionContext extends antlr.ParserRuleContext {
    public _super_?: InheritSuperExpressionContext;
    public _pe?: PrimaryExpressionStartContext;
    public _target?: CallOtherTargetContext;
    public _invocation?: MethodInvocationContext;
    public _structMember?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public primaryExpressionStart(): PrimaryExpressionStartContext {
        return this.getRuleContext(0, PrimaryExpressionStartContext)!;
    }
    public bracketExpression(): BracketExpressionContext[];
    public bracketExpression(i: number): BracketExpressionContext | null;
    public bracketExpression(i?: number): BracketExpressionContext[] | BracketExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(BracketExpressionContext);
        }

        return this.getRuleContext(i, BracketExpressionContext);
    }
    public inheritSuperExpression(): InheritSuperExpressionContext | null {
        return this.getRuleContext(0, InheritSuperExpressionContext);
    }
    public methodInvocation(): MethodInvocationContext[];
    public methodInvocation(i: number): MethodInvocationContext | null;
    public methodInvocation(i?: number): MethodInvocationContext[] | MethodInvocationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MethodInvocationContext);
        }

        return this.getRuleContext(i, MethodInvocationContext);
    }
    public INC(): antlr.TerminalNode[];
    public INC(i: number): antlr.TerminalNode | null;
    public INC(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.INC);
    	} else {
    		return this.getToken(LPCParser.INC, i);
    	}
    }
    public DEC(): antlr.TerminalNode[];
    public DEC(i: number): antlr.TerminalNode | null;
    public DEC(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.DEC);
    	} else {
    		return this.getToken(LPCParser.DEC, i);
    	}
    }
    public Identifier(): antlr.TerminalNode[];
    public Identifier(i: number): antlr.TerminalNode | null;
    public Identifier(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.Identifier);
    	} else {
    		return this.getToken(LPCParser.Identifier, i);
    	}
    }
    public ARROW(): antlr.TerminalNode[];
    public ARROW(i: number): antlr.TerminalNode | null;
    public ARROW(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.ARROW);
    	} else {
    		return this.getToken(LPCParser.ARROW, i);
    	}
    }
    public DOT(): antlr.TerminalNode[];
    public DOT(i: number): antlr.TerminalNode | null;
    public DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.DOT);
    	} else {
    		return this.getToken(LPCParser.DOT, i);
    	}
    }
    public callOtherTarget(): CallOtherTargetContext[];
    public callOtherTarget(i: number): CallOtherTargetContext | null;
    public callOtherTarget(i?: number): CallOtherTargetContext[] | CallOtherTargetContext | null {
        if (i === undefined) {
            return this.getRuleContexts(CallOtherTargetContext);
        }

        return this.getRuleContext(i, CallOtherTargetContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_primaryExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterPrimaryExpression) {
             listener.enterPrimaryExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitPrimaryExpression) {
             listener.exitPrimaryExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitPrimaryExpression) {
            return visitor.visitPrimaryExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PrimaryExpressionStartContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_primaryExpressionStart;
    }
    public override copyFrom(ctx: PrimaryExpressionStartContext): void {
        super.copyFrom(ctx);
    }
}
export class CloneObjectExpressionContext extends PrimaryExpressionStartContext {
    public _ob?: ExpressionContext;
    public constructor(ctx: PrimaryExpressionStartContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public PAREN_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_OPEN, 0)!;
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public CloneObject(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.CloneObject, 0);
    }
    public LoadObject(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.LoadObject, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterCloneObjectExpression) {
             listener.enterCloneObjectExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitCloneObjectExpression) {
             listener.exitCloneObjectExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitCloneObjectExpression) {
            return visitor.visitCloneObjectExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class IdentifierExpressionContext extends PrimaryExpressionStartContext {
    public constructor(ctx: PrimaryExpressionStartContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public validIdentifiers(): ValidIdentifiersContext {
        return this.getRuleContext(0, ValidIdentifiersContext)!;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterIdentifierExpression) {
             listener.enterIdentifierExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitIdentifierExpression) {
             listener.exitIdentifierExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitIdentifierExpression) {
            return visitor.visitIdentifierExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PrimaryMappingExpressionContext extends PrimaryExpressionStartContext {
    public constructor(ctx: PrimaryExpressionStartContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public mappingExpression(): MappingExpressionContext {
        return this.getRuleContext(0, MappingExpressionContext)!;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterPrimaryMappingExpression) {
             listener.enterPrimaryMappingExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitPrimaryMappingExpression) {
             listener.exitPrimaryMappingExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitPrimaryMappingExpression) {
            return visitor.visitPrimaryMappingExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class CatchExpressionContext extends PrimaryExpressionStartContext {
    public constructor(ctx: PrimaryExpressionStartContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public catchExpr(): CatchExprContext {
        return this.getRuleContext(0, CatchExprContext)!;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterCatchExpression) {
             listener.enterCatchExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitCatchExpression) {
             listener.exitCatchExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitCatchExpression) {
            return visitor.visitCatchExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class StructInitializerExpressionContext extends PrimaryExpressionStartContext {
    public _structName?: Token | null;
    public constructor(ctx: PrimaryExpressionStartContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public PAREN_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_OPEN, 0)!;
    }
    public LT(): antlr.TerminalNode {
        return this.getToken(LPCParser.LT, 0)!;
    }
    public GT(): antlr.TerminalNode {
        return this.getToken(LPCParser.GT, 0)!;
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
    }
    public structMemberInitializer(): StructMemberInitializerContext[];
    public structMemberInitializer(i: number): StructMemberInitializerContext | null;
    public structMemberInitializer(i?: number): StructMemberInitializerContext[] | StructMemberInitializerContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StructMemberInitializerContext);
        }

        return this.getRuleContext(i, StructMemberInitializerContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.COMMA);
    	} else {
    		return this.getToken(LPCParser.COMMA, i);
    	}
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterStructInitializerExpression) {
             listener.enterStructInitializerExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitStructInitializerExpression) {
             listener.exitStructInitializerExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitStructInitializerExpression) {
            return visitor.visitStructInitializerExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ParenExpressionContext extends PrimaryExpressionStartContext {
    public constructor(ctx: PrimaryExpressionStartContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public PAREN_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_OPEN, 0)!;
    }
    public commaableExpression(): CommaableExpressionContext {
        return this.getRuleContext(0, CommaableExpressionContext)!;
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterParenExpression) {
             listener.enterParenExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitParenExpression) {
             listener.exitParenExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitParenExpression) {
            return visitor.visitParenExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class LiteralExpressionContext extends PrimaryExpressionStartContext {
    public constructor(ctx: PrimaryExpressionStartContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public literal(): LiteralContext {
        return this.getRuleContext(0, LiteralContext)!;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterLiteralExpression) {
             listener.enterLiteralExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitLiteralExpression) {
             listener.exitLiteralExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitLiteralExpression) {
            return visitor.visitLiteralExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class StringConcatExpressionContext extends PrimaryExpressionStartContext {
    public constructor(ctx: PrimaryExpressionStartContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public StringLiteral(): antlr.TerminalNode[];
    public StringLiteral(i: number): antlr.TerminalNode | null;
    public StringLiteral(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.StringLiteral);
    	} else {
    		return this.getToken(LPCParser.StringLiteral, i);
    	}
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterStringConcatExpression) {
             listener.enterStringConcatExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitStringConcatExpression) {
             listener.exitStringConcatExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitStringConcatExpression) {
            return visitor.visitStringConcatExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PrimaryArrayExpressionContext extends PrimaryExpressionStartContext {
    public constructor(ctx: PrimaryExpressionStartContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public arrayExpression(): ArrayExpressionContext {
        return this.getRuleContext(0, ArrayExpressionContext)!;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterPrimaryArrayExpression) {
             listener.enterPrimaryArrayExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitPrimaryArrayExpression) {
             listener.exitPrimaryArrayExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitPrimaryArrayExpression) {
            return visitor.visitPrimaryArrayExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ValidIdentifiersContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
    }
    public ARRAY(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.ARRAY, 0);
    }
    public BYTES(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.BYTES, 0);
    }
    public FUNCTIONS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.FUNCTIONS, 0);
    }
    public VARIABLES(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.VARIABLES, 0);
    }
    public STRUCTS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.STRUCTS, 0);
    }
    public IN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.IN, 0);
    }
    public CHAR(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.CHAR, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_validIdentifiers;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterValidIdentifiers) {
             listener.enterValidIdentifiers(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitValidIdentifiers) {
             listener.exitValidIdentifiers(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitValidIdentifiers) {
            return visitor.visitValidIdentifiers(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CatchExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CATCH(): antlr.TerminalNode {
        return this.getToken(LPCParser.CATCH, 0)!;
    }
    public PAREN_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_OPEN, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.COMMA);
    	} else {
    		return this.getToken(LPCParser.COMMA, i);
    	}
    }
    public SEMI(): antlr.TerminalNode[];
    public SEMI(i: number): antlr.TerminalNode | null;
    public SEMI(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.SEMI);
    	} else {
    		return this.getToken(LPCParser.SEMI, i);
    	}
    }
    public Identifier(): antlr.TerminalNode[];
    public Identifier(i: number): antlr.TerminalNode | null;
    public Identifier(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.Identifier);
    	} else {
    		return this.getToken(LPCParser.Identifier, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_catchExpr;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterCatchExpr) {
             listener.enterCatchExpr(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitCatchExpr) {
             listener.exitCatchExpr(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitCatchExpr) {
            return visitor.visitCatchExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class InlineClosureExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PAREN_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_OPEN, 0)!;
    }
    public COLON(): antlr.TerminalNode[];
    public COLON(i: number): antlr.TerminalNode | null;
    public COLON(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.COLON);
    	} else {
    		return this.getToken(LPCParser.COLON, i);
    	}
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public FUNCTION(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.FUNCTION, 0);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
    }
    public typeSpecifier(): TypeSpecifierContext | null {
        return this.getRuleContext(0, TypeSpecifierContext);
    }
    public parameterList(): ParameterListContext | null {
        return this.getRuleContext(0, ParameterListContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_inlineClosureExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterInlineClosureExpression) {
             listener.enterInlineClosureExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitInlineClosureExpression) {
             listener.exitInlineClosureExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitInlineClosureExpression) {
            return visitor.visitInlineClosureExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BracketExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SQUARE_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.SQUARE_OPEN, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public SQUARE_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.SQUARE_CLOSE, 0)!;
    }
    public LT(): antlr.TerminalNode[];
    public LT(i: number): antlr.TerminalNode | null;
    public LT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.LT);
    	} else {
    		return this.getToken(LPCParser.LT, i);
    	}
    }
    public COMMA(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.COMMA, 0);
    }
    public DOUBLEDOT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DOUBLEDOT, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_bracketExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterBracketExpression) {
             listener.enterBracketExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitBracketExpression) {
             listener.exitBracketExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitBracketExpression) {
            return visitor.visitBracketExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LambdaArrayIndexorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SQUARE_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.SQUARE_OPEN, 0)!;
    }
    public LT(): antlr.TerminalNode[];
    public LT(i: number): antlr.TerminalNode | null;
    public LT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.LT);
    	} else {
    		return this.getToken(LPCParser.LT, i);
    	}
    }
    public DOUBLEDOT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DOUBLEDOT, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_lambdaArrayIndexor;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterLambdaArrayIndexor) {
             listener.enterLambdaArrayIndexor(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitLambdaArrayIndexor) {
             listener.exitLambdaArrayIndexor(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitLambdaArrayIndexor) {
            return visitor.visitLambdaArrayIndexor(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LambdaExpressionContext extends antlr.ParserRuleContext {
    public _fn?: Token | null;
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SINGLEQUOT(): antlr.TerminalNode {
        return this.getToken(LPCParser.SINGLEQUOT, 0)!;
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
    }
    public CloneObject(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.CloneObject, 0);
    }
    public LoadObject(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.LoadObject, 0);
    }
    public HASH(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.HASH, 0);
    }
    public WHILE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.WHILE, 0);
    }
    public RETURN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.RETURN, 0);
    }
    public bracketExpression(): BracketExpressionContext | null {
        return this.getRuleContext(0, BracketExpressionContext);
    }
    public lambdaArrayIndexor(): LambdaArrayIndexorContext | null {
        return this.getRuleContext(0, LambdaArrayIndexorContext);
    }
    public QUESTION(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.QUESTION, 0);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.NOT, 0);
    }
    public PAREN_OPEN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PAREN_OPEN, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public CURLY_OPEN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.CURLY_OPEN, 0);
    }
    public SQUARE_OPEN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SQUARE_OPEN, 0);
    }
    public PLUS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PLUS, 0);
    }
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.MINUS, 0);
    }
    public STAR(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.STAR, 0);
    }
    public DIV(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DIV, 0);
    }
    public MOD(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.MOD, 0);
    }
    public LT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.LT, 0);
    }
    public GT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.GT, 0);
    }
    public LE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.LE, 0);
    }
    public GE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.GE, 0);
    }
    public EQ(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.EQ, 0);
    }
    public NE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.NE, 0);
    }
    public AND(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.AND, 0);
    }
    public OR(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.OR, 0);
    }
    public XOR(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.XOR, 0);
    }
    public AND_AND(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.AND_AND, 0);
    }
    public OR_OR(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.OR_OR, 0);
    }
    public ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.ASSIGN, 0);
    }
    public ADD_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.ADD_ASSIGN, 0);
    }
    public SUB_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SUB_ASSIGN, 0);
    }
    public MUL_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.MUL_ASSIGN, 0);
    }
    public DIV_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DIV_ASSIGN, 0);
    }
    public MOD_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.MOD_ASSIGN, 0);
    }
    public AND_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.AND_ASSIGN, 0);
    }
    public OR_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.OR_ASSIGN, 0);
    }
    public BITAND_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.BITAND_ASSIGN, 0);
    }
    public BITOR_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.BITOR_ASSIGN, 0);
    }
    public XOR_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.XOR_ASSIGN, 0);
    }
    public SHL(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SHL, 0);
    }
    public SHR(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SHR, 0);
    }
    public COMMA(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.COMMA, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_lambdaExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterLambdaExpression) {
             listener.enterLambdaExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitLambdaExpression) {
             listener.exitLambdaExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitLambdaExpression) {
            return visitor.visitLambdaExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CastExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_castExpression;
    }
    public override copyFrom(ctx: CastExpressionContext): void {
        super.copyFrom(ctx);
    }
}
export class PrimitiveTypeCastExpressionContext extends CastExpressionContext {
    public constructor(ctx: CastExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public PAREN_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_OPEN, 0)!;
    }
    public typeSpecifier(): TypeSpecifierContext {
        return this.getRuleContext(0, TypeSpecifierContext)!;
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public unaryExpression(): UnaryExpressionContext {
        return this.getRuleContext(0, UnaryExpressionContext)!;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterPrimitiveTypeCastExpression) {
             listener.enterPrimitiveTypeCastExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitPrimitiveTypeCastExpression) {
             listener.exitPrimitiveTypeCastExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitPrimitiveTypeCastExpression) {
            return visitor.visitPrimitiveTypeCastExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DeclarativeTypeCastExpressionContext extends CastExpressionContext {
    public constructor(ctx: CastExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public PAREN_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_OPEN, 0)!;
    }
    public CURLY_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.CURLY_OPEN, 0)!;
    }
    public typeSpecifier(): TypeSpecifierContext {
        return this.getRuleContext(0, TypeSpecifierContext)!;
    }
    public CURLY_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.CURLY_CLOSE, 0)!;
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public unaryExpression(): UnaryExpressionContext {
        return this.getRuleContext(0, UnaryExpressionContext)!;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterDeclarativeTypeCastExpression) {
             listener.enterDeclarativeTypeCastExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitDeclarativeTypeCastExpression) {
             listener.exitDeclarativeTypeCastExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitDeclarativeTypeCastExpression) {
            return visitor.visitDeclarativeTypeCastExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class StructCastExpressionContext extends CastExpressionContext {
    public constructor(ctx: CastExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public PAREN_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_OPEN, 0)!;
    }
    public LT(): antlr.TerminalNode {
        return this.getToken(LPCParser.LT, 0)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
    }
    public GT(): antlr.TerminalNode {
        return this.getToken(LPCParser.GT, 0)!;
    }
    public unaryExpression(): UnaryExpressionContext[];
    public unaryExpression(i: number): UnaryExpressionContext | null;
    public unaryExpression(i?: number): UnaryExpressionContext[] | UnaryExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(UnaryExpressionContext);
        }

        return this.getRuleContext(i, UnaryExpressionContext);
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.COMMA);
    	} else {
    		return this.getToken(LPCParser.COMMA, i);
    	}
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterStructCastExpression) {
             listener.enterStructCastExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitStructCastExpression) {
             listener.exitStructCastExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitStructCastExpression) {
            return visitor.visitStructCastExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExpressionListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.COMMA);
    	} else {
    		return this.getToken(LPCParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_expressionList;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterExpressionList) {
             listener.enterExpressionList(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitExpressionList) {
             listener.exitExpressionList(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitExpressionList) {
            return visitor.visitExpressionList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
    }
    public SEMI(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SEMI, 0);
    }
    public selectionStatement(): SelectionStatementContext | null {
        return this.getRuleContext(0, SelectionStatementContext);
    }
    public iterationStatement(): IterationStatementContext | null {
        return this.getRuleContext(0, IterationStatementContext);
    }
    public jumpStatement(): JumpStatementContext | null {
        return this.getRuleContext(0, JumpStatementContext);
    }
    public variableDeclarationStatement(): VariableDeclarationStatementContext | null {
        return this.getRuleContext(0, VariableDeclarationStatementContext);
    }
    public includePreprocessorDirective(): IncludePreprocessorDirectiveContext | null {
        return this.getRuleContext(0, IncludePreprocessorDirectiveContext);
    }
    public commaableExpression(): CommaableExpressionContext | null {
        return this.getRuleContext(0, CommaableExpressionContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_statement;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitStatement) {
             listener.exitStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitStatement) {
            return visitor.visitStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CURLY_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.CURLY_OPEN, 0)!;
    }
    public CURLY_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.CURLY_CLOSE, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_block;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitBlock) {
             listener.exitBlock(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitBlock) {
            return visitor.visitBlock(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SelectionStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ifStatement(): IfStatementContext | null {
        return this.getRuleContext(0, IfStatementContext);
    }
    public switchStatement(): SwitchStatementContext | null {
        return this.getRuleContext(0, SwitchStatementContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_selectionStatement;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterSelectionStatement) {
             listener.enterSelectionStatement(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitSelectionStatement) {
             listener.exitSelectionStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitSelectionStatement) {
            return visitor.visitSelectionStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ElseIfExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ELSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.ELSE, 0)!;
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(LPCParser.IF, 0)!;
    }
    public PAREN_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_OPEN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_elseIfExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterElseIfExpression) {
             listener.enterElseIfExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitElseIfExpression) {
             listener.exitElseIfExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitElseIfExpression) {
            return visitor.visitElseIfExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ElseExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ELSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.ELSE, 0)!;
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_elseExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterElseExpression) {
             listener.enterElseExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitElseExpression) {
             listener.exitElseExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitElseExpression) {
            return visitor.visitElseExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IfExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(LPCParser.IF, 0)!;
    }
    public PAREN_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_OPEN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_ifExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterIfExpression) {
             listener.enterIfExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitIfExpression) {
             listener.exitIfExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitIfExpression) {
            return visitor.visitIfExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IfStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ifExpression(): IfExpressionContext {
        return this.getRuleContext(0, IfExpressionContext)!;
    }
    public elseIfExpression(): ElseIfExpressionContext[];
    public elseIfExpression(i: number): ElseIfExpressionContext | null;
    public elseIfExpression(i?: number): ElseIfExpressionContext[] | ElseIfExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ElseIfExpressionContext);
        }

        return this.getRuleContext(i, ElseIfExpressionContext);
    }
    public elseExpression(): ElseExpressionContext | null {
        return this.getRuleContext(0, ElseExpressionContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_ifStatement;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterIfStatement) {
             listener.enterIfStatement(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitIfStatement) {
             listener.exitIfStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitIfStatement) {
            return visitor.visitIfStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SwitchStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SWITCH(): antlr.TerminalNode {
        return this.getToken(LPCParser.SWITCH, 0)!;
    }
    public PAREN_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_OPEN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public CURLY_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.CURLY_OPEN, 0)!;
    }
    public CURLY_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.CURLY_CLOSE, 0)!;
    }
    public caseStatement(): CaseStatementContext[];
    public caseStatement(i: number): CaseStatementContext | null;
    public caseStatement(i?: number): CaseStatementContext[] | CaseStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(CaseStatementContext);
        }

        return this.getRuleContext(i, CaseStatementContext);
    }
    public defaultStatement(): DefaultStatementContext[];
    public defaultStatement(i: number): DefaultStatementContext | null;
    public defaultStatement(i?: number): DefaultStatementContext[] | DefaultStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(DefaultStatementContext);
        }

        return this.getRuleContext(i, DefaultStatementContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_switchStatement;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterSwitchStatement) {
             listener.enterSwitchStatement(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitSwitchStatement) {
             listener.exitSwitchStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitSwitchStatement) {
            return visitor.visitSwitchStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CaseExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public caseCondition(): CaseConditionContext[];
    public caseCondition(i: number): CaseConditionContext | null;
    public caseCondition(i?: number): CaseConditionContext[] | CaseConditionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(CaseConditionContext);
        }

        return this.getRuleContext(i, CaseConditionContext);
    }
    public caseOperators(): CaseOperatorsContext[];
    public caseOperators(i: number): CaseOperatorsContext | null;
    public caseOperators(i?: number): CaseOperatorsContext[] | CaseOperatorsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(CaseOperatorsContext);
        }

        return this.getRuleContext(i, CaseOperatorsContext);
    }
    public DOUBLEDOT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DOUBLEDOT, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_caseExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterCaseExpression) {
             listener.enterCaseExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitCaseExpression) {
             listener.exitCaseExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitCaseExpression) {
            return visitor.visitCaseExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CaseOperatorsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PLUS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PLUS, 0);
    }
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.MINUS, 0);
    }
    public STAR(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.STAR, 0);
    }
    public DIV(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DIV, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_caseOperators;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterCaseOperators) {
             listener.enterCaseOperators(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitCaseOperators) {
             listener.exitCaseOperators(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitCaseOperators) {
            return visitor.visitCaseOperators(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CaseConditionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public StringLiteral(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.StringLiteral, 0);
    }
    public IntegerConstant(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.IntegerConstant, 0);
    }
    public HexIntConstant(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.HexIntConstant, 0);
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
    }
    public CharacterConstant(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.CharacterConstant, 0);
    }
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.MINUS, 0);
    }
    public PAREN_OPEN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PAREN_OPEN, 0);
    }
    public shiftExpression(): ShiftExpressionContext | null {
        return this.getRuleContext(0, ShiftExpressionContext);
    }
    public PAREN_CLOSE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PAREN_CLOSE, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_caseCondition;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterCaseCondition) {
             listener.enterCaseCondition(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitCaseCondition) {
             listener.exitCaseCondition(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitCaseCondition) {
            return visitor.visitCaseCondition(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CaseStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CASE(): antlr.TerminalNode {
        return this.getToken(LPCParser.CASE, 0)!;
    }
    public caseExpression(): CaseExpressionContext {
        return this.getRuleContext(0, CaseExpressionContext)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(LPCParser.COLON, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_caseStatement;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterCaseStatement) {
             listener.enterCaseStatement(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitCaseStatement) {
             listener.exitCaseStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitCaseStatement) {
            return visitor.visitCaseStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DefaultStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DEFAULT(): antlr.TerminalNode {
        return this.getToken(LPCParser.DEFAULT, 0)!;
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(LPCParser.COLON, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_defaultStatement;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterDefaultStatement) {
             listener.enterDefaultStatement(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitDefaultStatement) {
             listener.exitDefaultStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitDefaultStatement) {
            return visitor.visitDefaultStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IterationStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_iterationStatement;
    }
    public override copyFrom(ctx: IterationStatementContext): void {
        super.copyFrom(ctx);
    }
}
export class WhileStatementContext extends IterationStatementContext {
    public constructor(ctx: IterationStatementContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(LPCParser.WHILE, 0)!;
    }
    public PAREN_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_OPEN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public statement(): StatementContext | null {
        return this.getRuleContext(0, StatementContext);
    }
    public SEMI(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SEMI, 0);
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterWhileStatement) {
             listener.enterWhileStatement(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitWhileStatement) {
             listener.exitWhileStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitWhileStatement) {
            return visitor.visitWhileStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ForEachStatementContext extends IterationStatementContext {
    public constructor(ctx: IterationStatementContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public FOREACH(): antlr.TerminalNode {
        return this.getToken(LPCParser.FOREACH, 0)!;
    }
    public PAREN_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_OPEN, 0)!;
    }
    public foreachRangeExpression(): ForeachRangeExpressionContext {
        return this.getRuleContext(0, ForeachRangeExpressionContext)!;
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public statement(): StatementContext | null {
        return this.getRuleContext(0, StatementContext);
    }
    public SEMI(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SEMI, 0);
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterForEachStatement) {
             listener.enterForEachStatement(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitForEachStatement) {
             listener.exitForEachStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitForEachStatement) {
            return visitor.visitForEachStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ForStatementContext extends IterationStatementContext {
    public constructor(ctx: IterationStatementContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public FOR(): antlr.TerminalNode {
        return this.getToken(LPCParser.FOR, 0)!;
    }
    public PAREN_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_OPEN, 0)!;
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public forRangeExpression(): ForRangeExpressionContext | null {
        return this.getRuleContext(0, ForRangeExpressionContext);
    }
    public statement(): StatementContext | null {
        return this.getRuleContext(0, StatementContext);
    }
    public SEMI(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SEMI, 0);
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterForStatement) {
             listener.enterForStatement(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitForStatement) {
             listener.exitForStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitForStatement) {
            return visitor.visitForStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DoWhileStatementContext extends IterationStatementContext {
    public constructor(ctx: IterationStatementContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public DO(): antlr.TerminalNode {
        return this.getToken(LPCParser.DO, 0)!;
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(LPCParser.WHILE, 0)!;
    }
    public PAREN_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_OPEN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(LPCParser.SEMI, 0)!;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterDoWhileStatement) {
             listener.enterDoWhileStatement(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitDoWhileStatement) {
             listener.exitDoWhileStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitDoWhileStatement) {
            return visitor.visitDoWhileStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ForRangeExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SEMI(): antlr.TerminalNode[];
    public SEMI(i: number): antlr.TerminalNode | null;
    public SEMI(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.SEMI);
    	} else {
    		return this.getToken(LPCParser.SEMI, i);
    	}
    }
    public forVariable(): ForVariableContext[];
    public forVariable(i: number): ForVariableContext | null;
    public forVariable(i?: number): ForVariableContext[] | ForVariableContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ForVariableContext);
        }

        return this.getRuleContext(i, ForVariableContext);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.COMMA);
    	} else {
    		return this.getToken(LPCParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_forRangeExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterForRangeExpression) {
             listener.enterForRangeExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitForRangeExpression) {
             listener.exitForRangeExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitForRangeExpression) {
            return visitor.visitForRangeExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ForeachRangeExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public forEachVariable(): ForEachVariableContext[];
    public forEachVariable(i: number): ForEachVariableContext | null;
    public forEachVariable(i?: number): ForEachVariableContext[] | ForEachVariableContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ForEachVariableContext);
        }

        return this.getRuleContext(i, ForEachVariableContext);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public IN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.IN, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.COLON, 0);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.COMMA);
    	} else {
    		return this.getToken(LPCParser.COMMA, i);
    	}
    }
    public DOUBLEDOT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DOUBLEDOT, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_foreachRangeExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterForeachRangeExpression) {
             listener.enterForeachRangeExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitForeachRangeExpression) {
             listener.exitForeachRangeExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitForeachRangeExpression) {
            return visitor.visitForeachRangeExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ForVariableContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public variableDeclarator(): VariableDeclaratorContext | null {
        return this.getRuleContext(0, VariableDeclaratorContext);
    }
    public primitiveTypeSpecifier(): PrimitiveTypeSpecifierContext | null {
        return this.getRuleContext(0, PrimitiveTypeSpecifierContext);
    }
    public ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.ASSIGN, 0);
    }
    public variableInitializer(): VariableInitializerContext | null {
        return this.getRuleContext(0, VariableInitializerContext);
    }
    public INC(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.INC, 0);
    }
    public DEC(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DEC, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_forVariable;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterForVariable) {
             listener.enterForVariable(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitForVariable) {
             listener.exitForVariable(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitForVariable) {
            return visitor.visitForVariable(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ForEachVariableContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public variableDeclarator(): VariableDeclaratorContext {
        return this.getRuleContext(0, VariableDeclaratorContext)!;
    }
    public typeSpecifier(): TypeSpecifierContext | null {
        return this.getRuleContext(0, TypeSpecifierContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_forEachVariable;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterForEachVariable) {
             listener.enterForEachVariable(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitForEachVariable) {
             listener.exitForEachVariable(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitForEachVariable) {
            return visitor.visitForEachVariable(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ReturnStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public RETURN(): antlr.TerminalNode {
        return this.getToken(LPCParser.RETURN, 0)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(LPCParser.SEMI, 0)!;
    }
    public commaableExpression(): CommaableExpressionContext | null {
        return this.getRuleContext(0, CommaableExpressionContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_returnStatement;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterReturnStatement) {
             listener.enterReturnStatement(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitReturnStatement) {
             listener.exitReturnStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitReturnStatement) {
            return visitor.visitReturnStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class JumpStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BREAK(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.BREAK, 0);
    }
    public SEMI(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SEMI, 0);
    }
    public CONTINUE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.CONTINUE, 0);
    }
    public returnStatement(): ReturnStatementContext | null {
        return this.getRuleContext(0, ReturnStatementContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_jumpStatement;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterJumpStatement) {
             listener.enterJumpStatement(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitJumpStatement) {
             listener.exitJumpStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitJumpStatement) {
            return visitor.visitJumpStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CallOtherTargetContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
    }
    public PAREN_OPEN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PAREN_OPEN, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public PAREN_CLOSE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PAREN_CLOSE, 0);
    }
    public StringLiteral(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.StringLiteral, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_callOtherTarget;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterCallOtherTarget) {
             listener.enterCallOtherTarget(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitCallOtherTarget) {
             listener.exitCallOtherTarget(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitCallOtherTarget) {
            return visitor.visitCallOtherTarget(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IntegerConstant(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.IntegerConstant, 0);
    }
    public FloatingConstant(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.FloatingConstant, 0);
    }
    public CharacterConstant(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.CharacterConstant, 0);
    }
    public HexIntConstant(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.HexIntConstant, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_literal;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterLiteral) {
             listener.enterLiteral(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitLiteral) {
             listener.exitLiteral(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitLiteral) {
            return visitor.visitLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ArgumentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public AND(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.AND, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_argument;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterArgument) {
             listener.enterArgument(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitArgument) {
             listener.exitArgument(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitArgument) {
            return visitor.visitArgument(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ArgumentListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public argument(): ArgumentContext[];
    public argument(i: number): ArgumentContext | null;
    public argument(i?: number): ArgumentContext[] | ArgumentContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ArgumentContext);
        }

        return this.getRuleContext(i, ArgumentContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.COMMA);
    	} else {
    		return this.getToken(LPCParser.COMMA, i);
    	}
    }
    public TRIPPLEDOT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.TRIPPLEDOT, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_argumentList;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterArgumentList) {
             listener.enterArgumentList(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitArgumentList) {
             listener.exitArgumentList(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitArgumentList) {
            return visitor.visitArgumentList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

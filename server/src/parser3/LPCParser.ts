// Generated from grammar/LPCParser.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { LPCParserListener } from "./LPCParserListener.js";
import { LPCParserVisitor } from "./LPCParserVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

 
    import {LPCParserBase} from "./LPCParserBase";


export class LPCParser extends LPCParserBase {
    public static readonly BREAK = 1;
    public static readonly BUFFER = 2;
    public static readonly BYTES = 3;
    public static readonly CASE = 4;
    public static readonly CATCH = 5;
    public static readonly CHAR = 6;
    public static readonly CLASS = 7;
    public static readonly CLOSURE = 8;
    public static readonly CONST = 9;
    public static readonly CONTINUE = 10;
    public static readonly COROUTINE = 11;
    public static readonly DEFAULT = 12;
    public static readonly DO = 13;
    public static readonly ECHO = 14;
    public static readonly ELSE = 15;
    public static readonly ELIF = 16;
    public static readonly ENDIF = 17;
    public static readonly ENUM = 18;
    public static readonly FLOAT = 19;
    public static readonly FOR = 20;
    public static readonly FOREACH = 21;
    public static readonly FUNCTIONS = 22;
    public static readonly FUNCTION = 23;
    public static readonly HASH = 24;
    public static readonly IF = 25;
    public static readonly IFDEF = 26;
    public static readonly IFNDEF = 27;
    public static readonly IN = 28;
    public static readonly INCLUDE = 29;
    public static readonly INHERIT = 30;
    public static readonly INT = 31;
    public static readonly LINE = 32;
    public static readonly LPCTYPE = 33;
    public static readonly LWOBJECT = 34;
    public static readonly MAPPING = 35;
    public static readonly MIXED = 36;
    public static readonly OBJECT = 37;
    public static readonly PRAGMA = 38;
    public static readonly QUOTEDARRAY = 39;
    public static readonly RETURN = 40;
    public static readonly REF = 41;
    public static readonly STATUS = 42;
    public static readonly STRUCTS = 43;
    public static readonly STRUCT = 44;
    public static readonly STRING = 45;
    public static readonly SYMBOL = 46;
    public static readonly SWITCH = 47;
    public static readonly TYPEDEF = 48;
    public static readonly UNDEF = 49;
    public static readonly VARIABLES = 50;
    public static readonly VIRTUAL = 51;
    public static readonly VOID = 52;
    public static readonly VOLATILE = 53;
    public static readonly WHILE = 54;
    public static readonly UNKNOWN = 55;
    public static readonly DEPRECATED = 56;
    public static readonly PRIVATE = 57;
    public static readonly PROTECTED = 58;
    public static readonly PUBLIC = 59;
    public static readonly STATIC = 60;
    public static readonly VISIBLE = 61;
    public static readonly NOSHADOW = 62;
    public static readonly NOSAVE = 63;
    public static readonly NOMASK = 64;
    public static readonly VARARGS = 65;
    public static readonly SUPER_ACCESSOR = 66;
    public static readonly PLUS = 67;
    public static readonly MINUS = 68;
    public static readonly STAR = 69;
    public static readonly DIV = 70;
    public static readonly MOD = 71;
    public static readonly INC = 72;
    public static readonly DEC = 73;
    public static readonly SHL = 74;
    public static readonly SHR = 75;
    public static readonly LT = 76;
    public static readonly GT = 77;
    public static readonly LE = 78;
    public static readonly GE = 79;
    public static readonly EQ = 80;
    public static readonly NE = 81;
    public static readonly AND = 82;
    public static readonly OR = 83;
    public static readonly XOR = 84;
    public static readonly DOUBLEBANG = 85;
    public static readonly NOT = 86;
    public static readonly BNOT = 87;
    public static readonly AND_AND = 88;
    public static readonly OR_OR = 89;
    public static readonly QUESTION = 90;
    public static readonly COLON = 91;
    public static readonly SEMI = 92;
    public static readonly COMMA = 93;
    public static readonly TRIPPLEDOT = 94;
    public static readonly DOUBLEDOT = 95;
    public static readonly DOT = 96;
    public static readonly ASSIGN = 97;
    public static readonly ADD_ASSIGN = 98;
    public static readonly SUB_ASSIGN = 99;
    public static readonly MUL_ASSIGN = 100;
    public static readonly DIV_ASSIGN = 101;
    public static readonly MOD_ASSIGN = 102;
    public static readonly OR_ASSIGN = 103;
    public static readonly AND_ASSIGN = 104;
    public static readonly BITAND_ASSIGN = 105;
    public static readonly BITOR_ASSIGN = 106;
    public static readonly XOR_ASSIGN = 107;
    public static readonly SHL_ASSIGN = 108;
    public static readonly RSH_ASSIGN = 109;
    public static readonly MAPPING_OPEN = 110;
    public static readonly ARROW = 111;
    public static readonly PAREN_OPEN = 112;
    public static readonly PAREN_CLOSE = 113;
    public static readonly CURLY_OPEN = 114;
    public static readonly CURLY_CLOSE = 115;
    public static readonly SQUARE_OPEN = 116;
    public static readonly SQUARE_CLOSE = 117;
    public static readonly BACKSLASH = 118;
    public static readonly IntegerConstant = 119;
    public static readonly FloatingConstant = 120;
    public static readonly HexIntConstant = 121;
    public static readonly TextFormatDirective = 122;
    public static readonly STRING_START = 123;
    public static readonly StringLiteral = 124;
    public static readonly CharacterConstant = 125;
    public static readonly LAMBDA_IDENTIFIER = 126;
    public static readonly SINGLEQUOT = 127;
    public static readonly BracketedIdentifier = 128;
    public static readonly Identifier = 129;
    public static readonly COMMENT = 130;
    public static readonly LINE_COMMENT = 131;
    public static readonly DEFINE = 132;
    public static readonly WS = 133;
    public static readonly END_DEFINE = 134;
    public static readonly STRING_END = 135;
    public static readonly TEXT_FORMAT_END = 136;
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
    public static readonly RULE_directiveTypeInclude = 11;
    public static readonly RULE_directiveIncludeFile = 12;
    public static readonly RULE_directiveTypePragma = 13;
    public static readonly RULE_inheritStatement = 14;
    public static readonly RULE_inheritModifier = 15;
    public static readonly RULE_inherit = 16;
    public static readonly RULE_defaultModifier = 17;
    public static readonly RULE_inheritFile = 18;
    public static readonly RULE_inheritSuperExpression = 19;
    public static readonly RULE_globalModifierStatement = 20;
    public static readonly RULE_declaration = 21;
    public static readonly RULE_functionModifier = 22;
    public static readonly RULE_functionHeader = 23;
    public static readonly RULE_functionHeaderDeclaration = 24;
    public static readonly RULE_functionDeclaration = 25;
    public static readonly RULE_parameterList = 26;
    public static readonly RULE_parameter = 27;
    public static readonly RULE_structMemberDeclaration = 28;
    public static readonly RULE_structMemberInitializer = 29;
    public static readonly RULE_variableModifier = 30;
    public static readonly RULE_structModifier = 31;
    public static readonly RULE_structDeclaration = 32;
    public static readonly RULE_variableDeclarationStatement = 33;
    public static readonly RULE_variableDeclaration = 34;
    public static readonly RULE_variableDeclaratorExpression = 35;
    public static readonly RULE_variableDeclarator = 36;
    public static readonly RULE_variableInitializer = 37;
    public static readonly RULE_primitiveTypeSpecifier = 38;
    public static readonly RULE_methodInvocation = 39;
    public static readonly RULE_structTypeSpecifier = 40;
    public static readonly RULE_typeSpecifier = 41;
    public static readonly RULE_unionableTypeSpecifier = 42;
    public static readonly RULE_arrayExpression = 43;
    public static readonly RULE_mappingContent = 44;
    public static readonly RULE_mappingExpression = 45;
    public static readonly RULE_expression = 46;
    public static readonly RULE_commaableExpression = 47;
    public static readonly RULE_assignmentOperator = 48;
    public static readonly RULE_conditionalExpression = 49;
    public static readonly RULE_primaryExpression = 50;
    public static readonly RULE_primaryExpressionStart = 51;
    public static readonly RULE_validIdentifiers = 52;
    public static readonly RULE_catchExpr = 53;
    public static readonly RULE_inlineClosureExpression = 54;
    public static readonly RULE_bracketExpression = 55;
    public static readonly RULE_lambdaArrayIndexor = 56;
    public static readonly RULE_lambdaExpression = 57;
    public static readonly RULE_castExpression = 58;
    public static readonly RULE_statement = 59;
    public static readonly RULE_block = 60;
    public static readonly RULE_selectionStatement = 61;
    public static readonly RULE_elseIfExpression = 62;
    public static readonly RULE_elseExpression = 63;
    public static readonly RULE_ifExpression = 64;
    public static readonly RULE_ifStatement = 65;
    public static readonly RULE_switchStatement = 66;
    public static readonly RULE_caseExpression = 67;
    public static readonly RULE_caseOperators = 68;
    public static readonly RULE_caseCondition = 69;
    public static readonly RULE_caseStatement = 70;
    public static readonly RULE_defaultStatement = 71;
    public static readonly RULE_iterationStatement = 72;
    public static readonly RULE_forRangeExpression = 73;
    public static readonly RULE_foreachRangeExpression = 74;
    public static readonly RULE_forVariable = 75;
    public static readonly RULE_forEachVariable = 76;
    public static readonly RULE_returnStatement = 77;
    public static readonly RULE_jumpStatement = 78;
    public static readonly RULE_callOtherTarget = 79;
    public static readonly RULE_literal = 80;
    public static readonly RULE_argument = 81;
    public static readonly RULE_argumentList = 82;

    public static readonly literalNames = [
        null, "'break'", "'buffer'", "'bytes'", "'case'", "'catch'", "'char'", 
        "'class'", "'closure'", "'const'", "'continue'", "'coroutine'", 
        "'default'", "'do'", "'#echo'", "'else'", "'elif'", "'endif'", "'enum'", 
        "'float'", "'for'", "'foreach'", "'functions'", "'function'", "'#'", 
        "'if'", "'ifdef'", "'ifndef'", "'in'", "'include'", "'inherit'", 
        "'int'", "'#line'", "'lpctype'", "'lwobject'", "'mapping'", "'mixed'", 
        "'object'", "'pragma'", "'quotedarray'", "'return'", "'ref'", "'status'", 
        "'structs'", "'struct'", "'string'", "'symbol'", "'switch'", "'typedef'", 
        "'undef'", "'variables'", "'virtual'", "'void'", "'volatile'", "'while'", 
        "'unknown'", "'deprecated'", "'private'", "'protected'", "'public'", 
        "'static'", "'visible'", "'noshadow'", "'nosave'", "'nomask'", "'varargs'", 
        "'::'", "'+'", "'-'", "'*'", "'/'", "'%'", "'++'", "'--'", "'<<'", 
        "'>>'", "'<'", "'>'", "'<='", "'>='", "'=='", "'!='", "'&'", "'|'", 
        "'^'", "'!!'", "'!'", "'~'", "'&&'", "'||'", "'?'", "':'", "';'", 
        "','", "'...'", "'..'", "'.'", "'='", "'+='", "'-='", "'*='", "'/='", 
        "'%='", "'||='", "'&&='", "'&='", "'|='", "'^='", "'<<='", "'>>='", 
        null, "'->'", "'('", "')'", "'{'", "'}'", "'['", "']'", "'\\'", 
        null, null, null, null, null, null, null, null, "'''"
    ];

    public static readonly symbolicNames = [
        null, "BREAK", "BUFFER", "BYTES", "CASE", "CATCH", "CHAR", "CLASS", 
        "CLOSURE", "CONST", "CONTINUE", "COROUTINE", "DEFAULT", "DO", "ECHO", 
        "ELSE", "ELIF", "ENDIF", "ENUM", "FLOAT", "FOR", "FOREACH", "FUNCTIONS", 
        "FUNCTION", "HASH", "IF", "IFDEF", "IFNDEF", "IN", "INCLUDE", "INHERIT", 
        "INT", "LINE", "LPCTYPE", "LWOBJECT", "MAPPING", "MIXED", "OBJECT", 
        "PRAGMA", "QUOTEDARRAY", "RETURN", "REF", "STATUS", "STRUCTS", "STRUCT", 
        "STRING", "SYMBOL", "SWITCH", "TYPEDEF", "UNDEF", "VARIABLES", "VIRTUAL", 
        "VOID", "VOLATILE", "WHILE", "UNKNOWN", "DEPRECATED", "PRIVATE", 
        "PROTECTED", "PUBLIC", "STATIC", "VISIBLE", "NOSHADOW", "NOSAVE", 
        "NOMASK", "VARARGS", "SUPER_ACCESSOR", "PLUS", "MINUS", "STAR", 
        "DIV", "MOD", "INC", "DEC", "SHL", "SHR", "LT", "GT", "LE", "GE", 
        "EQ", "NE", "AND", "OR", "XOR", "DOUBLEBANG", "NOT", "BNOT", "AND_AND", 
        "OR_OR", "QUESTION", "COLON", "SEMI", "COMMA", "TRIPPLEDOT", "DOUBLEDOT", 
        "DOT", "ASSIGN", "ADD_ASSIGN", "SUB_ASSIGN", "MUL_ASSIGN", "DIV_ASSIGN", 
        "MOD_ASSIGN", "OR_ASSIGN", "AND_ASSIGN", "BITAND_ASSIGN", "BITOR_ASSIGN", 
        "XOR_ASSIGN", "SHL_ASSIGN", "RSH_ASSIGN", "MAPPING_OPEN", "ARROW", 
        "PAREN_OPEN", "PAREN_CLOSE", "CURLY_OPEN", "CURLY_CLOSE", "SQUARE_OPEN", 
        "SQUARE_CLOSE", "BACKSLASH", "IntegerConstant", "FloatingConstant", 
        "HexIntConstant", "TextFormatDirective", "STRING_START", "StringLiteral", 
        "CharacterConstant", "LAMBDA_IDENTIFIER", "SINGLEQUOT", "BracketedIdentifier", 
        "Identifier", "COMMENT", "LINE_COMMENT", "DEFINE", "WS", "END_DEFINE", 
        "STRING_END", "TEXT_FORMAT_END"
    ];
    public static readonly ruleNames = [
        "program", "preprocessorDirective", "includePreprocessorDirective", 
        "definePreprocessorDirective", "selectionPreprocessorDirective", 
        "selectionPreprocessorDirectiveTypeSingle", "selectionPreprocessorDirectiveTypeWithArg", 
        "directiveIfTestExpression", "directiveIfArgument", "directiveTypeWithArguments", 
        "directiveArgument", "directiveTypeInclude", "directiveIncludeFile", 
        "directiveTypePragma", "inheritStatement", "inheritModifier", "inherit", 
        "defaultModifier", "inheritFile", "inheritSuperExpression", "globalModifierStatement", 
        "declaration", "functionModifier", "functionHeader", "functionHeaderDeclaration", 
        "functionDeclaration", "parameterList", "parameter", "structMemberDeclaration", 
        "structMemberInitializer", "variableModifier", "structModifier", 
        "structDeclaration", "variableDeclarationStatement", "variableDeclaration", 
        "variableDeclaratorExpression", "variableDeclarator", "variableInitializer", 
        "primitiveTypeSpecifier", "methodInvocation", "structTypeSpecifier", 
        "typeSpecifier", "unionableTypeSpecifier", "arrayExpression", "mappingContent", 
        "mappingExpression", "expression", "commaableExpression", "assignmentOperator", 
        "conditionalExpression", "primaryExpression", "primaryExpressionStart", 
        "validIdentifiers", "catchExpr", "inlineClosureExpression", "bracketExpression", 
        "lambdaArrayIndexor", "lambdaExpression", "castExpression", "statement", 
        "block", "selectionStatement", "elseIfExpression", "elseExpression", 
        "ifExpression", "ifStatement", "switchStatement", "caseExpression", 
        "caseOperators", "caseCondition", "caseStatement", "defaultStatement", 
        "iterationStatement", "forRangeExpression", "foreachRangeExpression", 
        "forVariable", "forEachVariable", "returnStatement", "jumpStatement", 
        "callOtherTarget", "literal", "argument", "argumentList",
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
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 173;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 171;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context) ) {
                    case 1:
                        {
                        this.state = 166;
                        this.declaration();
                        }
                        break;
                    case 2:
                        {
                        this.state = 167;
                        this.preprocessorDirective();
                        }
                        break;
                    case 3:
                        {
                        this.state = 168;
                        this.inheritStatement();
                        }
                        break;
                    case 4:
                        {
                        this.state = 169;
                        if (!( this.isFluff() )) {
                            throw this.createFailedPredicateException(" this.isFluff() ");
                        }
                        this.state = 170;
                        this.globalModifierStatement();
                        }
                        break;
                    }
                    }
                }
                this.state = 175;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            }
            this.state = 176;
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
        try {
            let alternative: number;
            this.state = 194;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 178;
                this.selectionPreprocessorDirective();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 179;
                this.directiveTypeWithArguments();
                this.state = 180;
                this.directiveArgument();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 182;
                this.definePreprocessorDirective();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 183;
                this.includePreprocessorDirective();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 184;
                this.match(LPCParser.HASH);
                this.state = 185;
                this.directiveTypePragma();
                this.state = 186;
                this.match(LPCParser.Identifier);
                this.state = 191;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 187;
                        this.match(LPCParser.COMMA);
                        this.state = 188;
                        this.match(LPCParser.Identifier);
                        }
                        }
                    }
                    this.state = 193;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
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
            this.state = 196;
            this.match(LPCParser.HASH);
            this.state = 197;
            this.directiveTypeInclude();
            this.state = 198;
            this.directiveIncludeFile();
            this.state = 201;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                {
                this.state = 199;
                if (!( this.isFluff() )) {
                    throw this.createFailedPredicateException(" this.isFluff() ");
                }
                this.state = 200;
                this.match(LPCParser.SEMI);
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
    public definePreprocessorDirective(): DefinePreprocessorDirectiveContext {
        let localContext = new DefinePreprocessorDirectiveContext(this.context, this.state);
        this.enterRule(localContext, 6, LPCParser.RULE_definePreprocessorDirective);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 203;
            this.match(LPCParser.DEFINE);
            this.state = 204;
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
            this.state = 218;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 206;
                this.match(LPCParser.HASH);
                this.state = 207;
                this.selectionPreprocessorDirectiveTypeWithArg();
                this.state = 209;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 86) {
                    {
                    this.state = 208;
                    this.match(LPCParser.NOT);
                    }
                }

                this.state = 211;
                this.directiveArgument();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 213;
                this.match(LPCParser.HASH);
                this.state = 214;
                _la = this.tokenStream.LA(1);
                if(!(_la === 16 || _la === 25)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 215;
                this.directiveIfTestExpression(0);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 216;
                this.match(LPCParser.HASH);
                this.state = 217;
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
            this.state = 220;
            _la = this.tokenStream.LA(1);
            if(!(_la === 15 || _la === 17)) {
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
            this.state = 222;
            _la = this.tokenStream.LA(1);
            if(!(_la === 26 || _la === 27)) {
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
            this.state = 226;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
            case 1:
                {
                this.state = 225;
                this.match(LPCParser.NOT);
                }
                break;
            }
            this.state = 228;
            this.directiveIfArgument();
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 239;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 9, this.context);
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
                    this.state = 230;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 233;
                    this.errorHandler.sync(this);
                    alternative = 1;
                    do {
                        switch (alternative) {
                        case 1:
                            {
                            {
                            this.state = 231;
                            _la = this.tokenStream.LA(1);
                            if(!(((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 12351) !== 0))) {
                            this.errorHandler.recoverInline(this);
                            }
                            else {
                                this.errorHandler.reportMatch(this);
                                this.consume();
                            }
                            this.state = 232;
                            this.directiveIfTestExpression(0);
                            }
                            }
                            break;
                        default:
                            throw new antlr.NoViableAltException(this);
                        }
                        this.state = 235;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 8, this.context);
                    } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                    }
                    }
                }
                this.state = 241;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 9, this.context);
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
            this.state = 251;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 11, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 242;
                this.match(LPCParser.Identifier);
                this.state = 246;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
                case 1:
                    {
                    this.state = 243;
                    this.match(LPCParser.PAREN_OPEN);
                    this.state = 244;
                    _la = this.tokenStream.LA(1);
                    if(!(((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 1057) !== 0))) {
                    this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 245;
                    this.match(LPCParser.PAREN_CLOSE);
                    }
                    break;
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 248;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 249;
                this.match(LPCParser.IntegerConstant);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 250;
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
            this.state = 257;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.HASH:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 253;
                this.match(LPCParser.HASH);
                this.state = 254;
                this.match(LPCParser.UNDEF);
                }
                break;
            case LPCParser.ECHO:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 255;
                this.match(LPCParser.ECHO);
                }
                break;
            case LPCParser.LINE:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 256;
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
        try {
            let alternative: number;
            this.state = 270;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 259;
                this.match(LPCParser.Identifier);
                this.state = 264;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 13, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 260;
                        this.match(LPCParser.MINUS);
                        this.state = 261;
                        this.match(LPCParser.Identifier);
                        }
                        }
                    }
                    this.state = 266;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 13, this.context);
                }
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 267;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case LPCParser.IntegerConstant:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 268;
                this.match(LPCParser.IntegerConstant);
                }
                break;
            case LPCParser.PRIVATE:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 269;
                this.match(LPCParser.PRIVATE);
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
    public directiveTypeInclude(): DirectiveTypeIncludeContext {
        let localContext = new DirectiveTypeIncludeContext(this.context, this.state);
        this.enterRule(localContext, 22, LPCParser.RULE_directiveTypeInclude);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 272;
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
    public directiveIncludeFile(): DirectiveIncludeFileContext {
        let localContext = new DirectiveIncludeFileContext(this.context, this.state);
        this.enterRule(localContext, 24, LPCParser.RULE_directiveIncludeFile);
        try {
            let alternative: number;
            this.state = 283;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BracketedIdentifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 274;
                localContext._globalFile = this.match(LPCParser.BracketedIdentifier);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 275;
                localContext._localFile = this.match(LPCParser.StringLiteral);
                this.state = 279;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 15, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 276;
                        this.match(LPCParser.StringLiteral);
                        }
                        }
                    }
                    this.state = 281;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 15, this.context);
                }
                }
                break;
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 282;
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
        this.enterRule(localContext, 26, LPCParser.RULE_directiveTypePragma);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 285;
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
        this.enterRule(localContext, 28, LPCParser.RULE_inheritStatement);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 309;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 22, this.context) ) {
            case 1:
                {
                this.state = 288;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 57) {
                    {
                    this.state = 287;
                    this.match(LPCParser.PRIVATE);
                    }
                }

                this.state = 290;
                this.inherit();
                }
                break;
            case 2:
                {
                this.state = 297;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 12) {
                    {
                    this.state = 291;
                    this.match(LPCParser.DEFAULT);
                    this.state = 293;
                    this.errorHandler.sync(this);
                    alternative = 1;
                    do {
                        switch (alternative) {
                        case 1:
                            {
                            {
                            this.state = 292;
                            this.defaultModifier();
                            }
                            }
                            break;
                        default:
                            throw new antlr.NoViableAltException(this);
                        }
                        this.state = 295;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 18, this.context);
                    } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                    }
                }

                this.state = 302;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 1023) !== 0)) {
                    {
                    {
                    this.state = 299;
                    this.inheritModifier();
                    }
                    }
                    this.state = 304;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 306;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 51) {
                    {
                    this.state = 305;
                    this.match(LPCParser.VIRTUAL);
                    }
                }

                this.state = 308;
                this.inherit();
                }
                break;
            }
            this.state = 311;
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
        this.enterRule(localContext, 30, LPCParser.RULE_inheritModifier);
        let _la: number;
        try {
            this.state = 327;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 25, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 314;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                do {
                    {
                    {
                    this.state = 313;
                    this.functionModifier();
                    }
                    }
                    this.state = 316;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                } while (((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 895) !== 0));
                this.state = 318;
                this.match(LPCParser.FUNCTIONS);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 321;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                do {
                    {
                    {
                    this.state = 320;
                    this.variableModifier();
                    }
                    }
                    this.state = 323;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                } while (((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 479) !== 0));
                this.state = 325;
                _la = this.tokenStream.LA(1);
                if(!(_la === 43 || _la === 50)) {
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
        this.enterRule(localContext, 32, LPCParser.RULE_inherit);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 329;
            this.match(LPCParser.INHERIT);
            this.state = 330;
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
        this.enterRule(localContext, 34, LPCParser.RULE_defaultModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 332;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 31) !== 0))) {
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
        let _startState = 36;
        this.enterRecursionRule(localContext, 36, LPCParser.RULE_inheritFile, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 341;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.StringLiteral:
                {
                this.state = 335;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case LPCParser.Identifier:
                {
                this.state = 336;
                this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.PAREN_OPEN:
                {
                this.state = 337;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 338;
                this.inheritFile(0);
                this.state = 339;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 350;
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
                    this.state = 343;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 345;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 67) {
                        {
                        this.state = 344;
                        this.match(LPCParser.PLUS);
                        }
                    }

                    this.state = 347;
                    this.inheritFile(2);
                    }
                    }
                }
                this.state = 352;
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
        this.enterRule(localContext, 38, LPCParser.RULE_inheritSuperExpression);
        let _la: number;
        try {
            this.state = 360;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 30, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 354;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 124 || _la === 129) {
                    {
                    this.state = 353;
                    localContext._filename = this.tokenStream.LT(1);
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 37 || _la === 124 || _la === 129)) {
                        localContext._filename = this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    }
                }

                this.state = 356;
                this.match(LPCParser.SUPER_ACCESSOR);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 357;
                localContext._validIdFilename = this.validIdentifiers();
                this.state = 358;
                this.match(LPCParser.SUPER_ACCESSOR);
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
    public globalModifierStatement(): GlobalModifierStatementContext {
        let localContext = new GlobalModifierStatementContext(this.context, this.state);
        this.enterRule(localContext, 40, LPCParser.RULE_globalModifierStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 362;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 7) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 363;
            this.match(LPCParser.COLON);
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
        this.enterRule(localContext, 42, LPCParser.RULE_declaration);
        try {
            this.state = 369;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 31, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 365;
                this.functionHeaderDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 366;
                this.functionDeclaration();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 367;
                this.structDeclaration();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 368;
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
        this.enterRule(localContext, 44, LPCParser.RULE_functionModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 371;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 895) !== 0))) {
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
        this.enterRule(localContext, 46, LPCParser.RULE_functionHeader);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 376;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 373;
                    this.functionModifier();
                    }
                    }
                }
                this.state = 378;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
            }
            this.state = 380;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 33, this.context) ) {
            case 1:
                {
                this.state = 379;
                this.typeSpecifier();
                }
                break;
            }
            this.state = 382;
            localContext._functionName = this.validIdentifiers();
            this.state = 383;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 385;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 34, this.context) ) {
            case 1:
                {
                this.state = 384;
                localContext._functionArgs = this.parameterList(true);
                }
                break;
            }
            this.state = 387;
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
        this.enterRule(localContext, 48, LPCParser.RULE_functionHeaderDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 389;
            this.functionHeader();
            this.state = 390;
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
        this.enterRule(localContext, 50, LPCParser.RULE_functionDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 392;
            this.functionHeader();
            this.state = 393;
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
    public parameterList(_isHeader: boolean): ParameterListContext {
        let localContext = new ParameterListContext(this.context, this.state, _isHeader);
        this.enterRule(localContext, 52, LPCParser.RULE_parameterList);
        let _la: number;
        try {
            this.state = 404;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 36, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 395;
                this.match(LPCParser.VOID);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 396;
                this.parameter(_isHeader);
                this.state = 401;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 93) {
                    {
                    {
                    this.state = 397;
                    this.match(LPCParser.COMMA);
                    this.state = 398;
                    this.parameter(_isHeader);
                    }
                    }
                    this.state = 403;
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
    public parameter(_isHeader: boolean): ParameterContext {
        let localContext = new ParameterContext(this.context, this.state, _isHeader);
        this.enterRule(localContext, 54, LPCParser.RULE_parameter);
        let _la: number;
        try {
            this.state = 446;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 47, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 406;
                if (!(localContext?._isHeader!==false)) {
                    throw this.createFailedPredicateException("$_isHeader==false");
                }
                this.state = 408;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 65) {
                    {
                    this.state = 407;
                    this.match(LPCParser.VARARGS);
                    }
                }

                this.state = 411;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 38, this.context) ) {
                case 1:
                    {
                    this.state = 410;
                    localContext._paramType = this.unionableTypeSpecifier();
                    }
                    break;
                }
                this.state = 413;
                localContext._paramName = this.validIdentifiers();
                this.state = 420;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 39, this.context) ) {
                case 1:
                    {
                    this.state = 414;
                    this.match(LPCParser.ASSIGN);
                    this.state = 415;
                    this.expression();
                    }
                    break;
                case 2:
                    {
                    this.state = 416;
                    if (!( this.isFluff() )) {
                        throw this.createFailedPredicateException(" this.isFluff() ");
                    }
                    this.state = 417;
                    this.match(LPCParser.COLON);
                    this.state = 418;
                    this.inlineClosureExpression();
                    }
                    break;
                case 3:
                    {
                    this.state = 419;
                    this.match(LPCParser.TRIPPLEDOT);
                    }
                    break;
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 422;
                if (!(localContext?._isHeader! && this.isFluff())) {
                    throw this.createFailedPredicateException("$_isHeader && this.isFluff()");
                }
                this.state = 424;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 65) {
                    {
                    this.state = 423;
                    this.match(LPCParser.VARARGS);
                    }
                }

                this.state = 426;
                localContext._paramType = this.unionableTypeSpecifier();
                this.state = 428;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 82) {
                    {
                    this.state = 427;
                    this.match(LPCParser.AND);
                    }
                }

                this.state = 431;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 272629836) !== 0) || ((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & 262281) !== 0) || _la === 129) {
                    {
                    this.state = 430;
                    localContext._paramName = this.validIdentifiers();
                    }
                }

                this.state = 434;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 94) {
                    {
                    this.state = 433;
                    this.match(LPCParser.TRIPPLEDOT);
                    }
                }

                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 437;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 65) {
                    {
                    this.state = 436;
                    this.match(LPCParser.VARARGS);
                    }
                }

                this.state = 440;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 45, this.context) ) {
                case 1:
                    {
                    this.state = 439;
                    localContext._paramType = this.unionableTypeSpecifier();
                    }
                    break;
                }
                this.state = 443;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 82) {
                    {
                    this.state = 442;
                    this.match(LPCParser.AND);
                    }
                }

                this.state = 445;
                localContext._paramName = this.validIdentifiers();
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
    public structMemberDeclaration(): StructMemberDeclarationContext {
        let localContext = new StructMemberDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 56, LPCParser.RULE_structMemberDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 448;
            this.unionableTypeSpecifier();
            this.state = 449;
            this.match(LPCParser.Identifier);
            this.state = 454;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 93) {
                {
                {
                this.state = 450;
                this.match(LPCParser.COMMA);
                this.state = 451;
                this.match(LPCParser.Identifier);
                }
                }
                this.state = 456;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 457;
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
        this.enterRule(localContext, 58, LPCParser.RULE_structMemberInitializer);
        try {
            this.state = 463;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 49, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 459;
                this.match(LPCParser.Identifier);
                this.state = 460;
                this.match(LPCParser.COLON);
                this.state = 461;
                this.expression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 462;
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
        this.enterRule(localContext, 60, LPCParser.RULE_variableModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 465;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 479) !== 0))) {
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
    public structModifier(): StructModifierContext {
        let localContext = new StructModifierContext(this.context, this.state);
        this.enterRule(localContext, 62, LPCParser.RULE_structModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 467;
            this.match(LPCParser.PRIVATE);
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
        this.enterRule(localContext, 64, LPCParser.RULE_structDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 471;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 50, this.context) ) {
            case 1:
                {
                this.state = 469;
                if (!(this.isFluff())) {
                    throw this.createFailedPredicateException("this.isFluff()");
                }
                this.state = 470;
                this.structModifier();
                }
                break;
            }
            this.state = 473;
            _la = this.tokenStream.LA(1);
            if(!(_la === 7 || _la === 44)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 474;
            localContext._structName = this.match(LPCParser.Identifier);
            this.state = 478;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 112) {
                {
                this.state = 475;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 476;
                localContext._structInherits = this.match(LPCParser.Identifier);
                this.state = 477;
                this.match(LPCParser.PAREN_CLOSE);
                }
            }

            this.state = 480;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 484;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2156399052) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 4733535) !== 0) || _la === 69 || _la === 76) {
                {
                {
                this.state = 481;
                this.structMemberDeclaration();
                }
                }
                this.state = 486;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 487;
            this.match(LPCParser.CURLY_CLOSE);
            this.state = 489;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 53, this.context) ) {
            case 1:
                {
                this.state = 488;
                this.match(LPCParser.SEMI);
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
    public variableDeclarationStatement(): VariableDeclarationStatementContext {
        let localContext = new VariableDeclarationStatementContext(this.context, this.state);
        this.enterRule(localContext, 66, LPCParser.RULE_variableDeclarationStatement);
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
        this.enterRule(localContext, 68, LPCParser.RULE_variableDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 497;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 479) !== 0)) {
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
            switch (this.interpreter.adaptivePredict(this.tokenStream, 55, this.context) ) {
            case 1:
                {
                this.state = 500;
                localContext._type_ = this.unionableTypeSpecifier();
                }
                break;
            }
            this.state = 504;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 124) {
                {
                this.state = 503;
                localContext._objectName = this.match(LPCParser.StringLiteral);
                }
            }

            this.state = 506;
            this.variableDeclaratorExpression();
            this.state = 511;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 93) {
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
        this.enterRule(localContext, 70, LPCParser.RULE_variableDeclaratorExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 514;
            this.variableDeclarator();
            this.state = 517;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 97) {
                {
                this.state = 515;
                this.match(LPCParser.ASSIGN);
                this.state = 516;
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
        this.enterRule(localContext, 72, LPCParser.RULE_variableDeclarator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 522;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 69) {
                {
                {
                this.state = 519;
                localContext._arraySpecifier = this.match(LPCParser.STAR);
                }
                }
                this.state = 524;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 525;
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
        this.enterRule(localContext, 74, LPCParser.RULE_variableInitializer);
        try {
            this.state = 530;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 60, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 527;
                this.arrayExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 528;
                this.mappingExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 529;
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
    public primitiveTypeSpecifier(): PrimitiveTypeSpecifierContext {
        let localContext = new PrimitiveTypeSpecifierContext(this.context, this.state);
        this.enterRule(localContext, 76, LPCParser.RULE_primitiveTypeSpecifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 532;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 2156398924) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 4731487) !== 0))) {
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
        this.enterRule(localContext, 78, LPCParser.RULE_methodInvocation);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 534;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 536;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 61, this.context) ) {
            case 1:
                {
                this.state = 535;
                this.argumentList();
                }
                break;
            }
            this.state = 538;
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
        this.enterRule(localContext, 80, LPCParser.RULE_structTypeSpecifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 540;
            _la = this.tokenStream.LA(1);
            if(!(_la === 7 || _la === 44)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 541;
            this.match(LPCParser.Identifier);
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
        this.enterRule(localContext, 82, LPCParser.RULE_typeSpecifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 543;
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
        this.enterRule(localContext, 84, LPCParser.RULE_unionableTypeSpecifier);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 567;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BUFFER:
            case LPCParser.BYTES:
            case LPCParser.CHAR:
            case LPCParser.CLASS:
            case LPCParser.CLOSURE:
            case LPCParser.COROUTINE:
            case LPCParser.FLOAT:
            case LPCParser.FUNCTION:
            case LPCParser.INT:
            case LPCParser.LPCTYPE:
            case LPCParser.LWOBJECT:
            case LPCParser.MAPPING:
            case LPCParser.MIXED:
            case LPCParser.OBJECT:
            case LPCParser.QUOTEDARRAY:
            case LPCParser.STATUS:
            case LPCParser.STRUCT:
            case LPCParser.STRING:
            case LPCParser.SYMBOL:
            case LPCParser.VOID:
            case LPCParser.UNKNOWN:
            case LPCParser.LT:
                {
                {
                this.state = 551;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.BUFFER:
                case LPCParser.BYTES:
                case LPCParser.CHAR:
                case LPCParser.CLOSURE:
                case LPCParser.COROUTINE:
                case LPCParser.FLOAT:
                case LPCParser.FUNCTION:
                case LPCParser.INT:
                case LPCParser.LPCTYPE:
                case LPCParser.LWOBJECT:
                case LPCParser.MAPPING:
                case LPCParser.MIXED:
                case LPCParser.OBJECT:
                case LPCParser.QUOTEDARRAY:
                case LPCParser.STATUS:
                case LPCParser.STRING:
                case LPCParser.SYMBOL:
                case LPCParser.VOID:
                case LPCParser.UNKNOWN:
                    {
                    this.state = 545;
                    this.primitiveTypeSpecifier();
                    }
                    break;
                case LPCParser.LT:
                    {
                    this.state = 546;
                    this.match(LPCParser.LT);
                    this.state = 547;
                    this.typeSpecifier();
                    this.state = 548;
                    this.match(LPCParser.GT);
                    }
                    break;
                case LPCParser.CLASS:
                case LPCParser.STRUCT:
                    {
                    this.state = 550;
                    this.structTypeSpecifier();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 554;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 41) {
                    {
                    this.state = 553;
                    this.match(LPCParser.REF);
                    }
                }

                this.state = 559;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 64, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 556;
                        this.match(LPCParser.STAR);
                        }
                        }
                    }
                    this.state = 561;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 64, this.context);
                }
                }
                }
                break;
            case LPCParser.STAR:
                {
                this.state = 563;
                this.errorHandler.sync(this);
                alternative = 1;
                do {
                    switch (alternative) {
                    case 1:
                        {
                        {
                        this.state = 562;
                        this.match(LPCParser.STAR);
                        }
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    this.state = 565;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 65, this.context);
                } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 573;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 67, this.context);
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
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 67, this.context);
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
    public arrayExpression(): ArrayExpressionContext {
        let localContext = new ArrayExpressionContext(this.context, this.state);
        this.enterRule(localContext, 86, LPCParser.RULE_arrayExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 576;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 577;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 592;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 71, this.context) ) {
            case 1:
                {
                this.state = 578;
                this.expression();
                this.state = 580;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 94) {
                    {
                    this.state = 579;
                    this.match(LPCParser.TRIPPLEDOT);
                    }
                }

                this.state = 589;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 70, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 582;
                        this.match(LPCParser.COMMA);
                        this.state = 583;
                        this.expression();
                        this.state = 585;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if (_la === 94) {
                            {
                            this.state = 584;
                            this.match(LPCParser.TRIPPLEDOT);
                            }
                        }

                        }
                        }
                    }
                    this.state = 591;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 70, this.context);
                }
                }
                break;
            }
            this.state = 595;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 93) {
                {
                this.state = 594;
                this.match(LPCParser.COMMA);
                }
            }

            this.state = 597;
            this.match(LPCParser.CURLY_CLOSE);
            this.state = 598;
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
        this.enterRule(localContext, 88, LPCParser.RULE_mappingContent);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 600;
            localContext._mappingKey = this.expression();
            this.state = 610;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 91) {
                {
                this.state = 601;
                this.match(LPCParser.COLON);
                this.state = 602;
                this.expression();
                this.state = 607;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 92) {
                    {
                    {
                    this.state = 603;
                    this.match(LPCParser.SEMI);
                    this.state = 604;
                    this.expression();
                    }
                    }
                    this.state = 609;
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
        this.enterRule(localContext, 90, LPCParser.RULE_mappingExpression);
        let _la: number;
        try {
            let alternative: number;
            this.state = 636;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 77, this.context) ) {
            case 1:
                localContext = new MappingValueInitializerContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 612;
                this.match(LPCParser.MAPPING_OPEN);
                {
                this.state = 613;
                this.mappingContent();
                this.state = 618;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 75, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 614;
                        this.match(LPCParser.COMMA);
                        this.state = 615;
                        this.mappingContent();
                        }
                        }
                    }
                    this.state = 620;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 75, this.context);
                }
                }
                this.state = 622;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 93) {
                    {
                    this.state = 621;
                    this.match(LPCParser.COMMA);
                    }
                }

                this.state = 624;
                this.match(LPCParser.SQUARE_CLOSE);
                this.state = 625;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 2:
                localContext = new MappingKeylessInitializerContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 627;
                this.match(LPCParser.MAPPING_OPEN);
                this.state = 628;
                this.match(LPCParser.COLON);
                this.state = 629;
                this.expression();
                this.state = 630;
                this.match(LPCParser.SQUARE_CLOSE);
                this.state = 631;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 3:
                localContext = new MappingEmptyInitializerContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 633;
                this.match(LPCParser.MAPPING_OPEN);
                this.state = 634;
                this.match(LPCParser.SQUARE_CLOSE);
                this.state = 635;
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
        this.enterRule(localContext, 92, LPCParser.RULE_expression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 638;
            this.conditionalExpression(4);
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
        this.enterRule(localContext, 94, LPCParser.RULE_commaableExpression);
        let _la: number;
        try {
            this.state = 649;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 79, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 640;
                this.inlineClosureExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 641;
                this.conditionalExpression(4);
                this.state = 646;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 93) {
                    {
                    {
                    this.state = 642;
                    localContext._op = this.match(LPCParser.COMMA);
                    this.state = 643;
                    this.conditionalExpression(4);
                    }
                    }
                    this.state = 648;
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
    public assignmentOperator(): AssignmentOperatorContext {
        let localContext = new AssignmentOperatorContext(this.context, this.state);
        this.enterRule(localContext, 96, LPCParser.RULE_assignmentOperator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 651;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 8191) !== 0))) {
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
    public conditionalExpression(_p: int): ConditionalExpressionContext {
        let localContext = new ConditionalExpressionContext(this.context, this.state, _p);
        this.enterRule(localContext, 98, LPCParser.RULE_conditionalExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 655;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 80, this.context) ) {
            case 1:
                {
                this.state = 653;
                if (!( 16 >= localContext?._p! )) {
                    throw this.createFailedPredicateException(" 16 >= $_p ");
                }
                this.state = 654;
                localContext._op = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!(((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 1867879) !== 0))) {
                    localContext._op = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                break;
            }
            this.state = 661;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 81, this.context) ) {
            case 1:
                {
                this.state = 657;
                this.castExpression();
                }
                break;
            case 2:
                {
                this.state = 658;
                this.primaryExpression();
                }
                break;
            case 3:
                {
                this.state = 659;
                this.lambdaExpression();
                }
                break;
            case 4:
                {
                this.state = 660;
                this.inlineClosureExpression();
                }
                break;
            }
            }
            this.state = 705;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 83, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 703;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 82, this.context) ) {
                    case 1:
                        {
                        this.state = 663;
                        if (!( 15 >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 15 >= $_p ");
                        }
                        this.state = 664;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 7) !== 0))) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 665;
                        this.conditionalExpression(16);
                        }
                        break;
                    case 2:
                        {
                        this.state = 666;
                        if (!( 14 >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 14 >= $_p ");
                        }
                        this.state = 667;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 67 || _la === 68)) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 668;
                        this.conditionalExpression(15);
                        }
                        break;
                    case 3:
                        {
                        this.state = 669;
                        if (!( 13 >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 13 >= $_p ");
                        }
                        this.state = 670;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 74 || _la === 75)) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 671;
                        this.conditionalExpression(14);
                        }
                        break;
                    case 4:
                        {
                        this.state = 672;
                        if (!( 12 >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 12 >= $_p ");
                        }
                        this.state = 673;
                        localContext._cond = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 15) !== 0))) {
                            localContext._cond = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 674;
                        this.conditionalExpression(13);
                        }
                        break;
                    case 5:
                        {
                        this.state = 675;
                        if (!( 11 >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 11 >= $_p ");
                        }
                        this.state = 676;
                        localContext._cond = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 28 || _la === 80 || _la === 81)) {
                            localContext._cond = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 677;
                        this.conditionalExpression(12);
                        }
                        break;
                    case 6:
                        {
                        this.state = 678;
                        if (!( 10 >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 10 >= $_p ");
                        }
                        this.state = 679;
                        localContext._op = this.match(LPCParser.AND);
                        this.state = 680;
                        this.conditionalExpression(11);
                        }
                        break;
                    case 7:
                        {
                        this.state = 681;
                        if (!( 9  >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 9  >= $_p ");
                        }
                        this.state = 682;
                        localContext._op = this.match(LPCParser.XOR);
                        this.state = 683;
                        this.conditionalExpression(10);
                        }
                        break;
                    case 8:
                        {
                        this.state = 684;
                        if (!( 8  >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 8  >= $_p ");
                        }
                        this.state = 685;
                        localContext._op = this.match(LPCParser.OR);
                        this.state = 686;
                        this.conditionalExpression(9);
                        }
                        break;
                    case 9:
                        {
                        this.state = 687;
                        if (!( 7  >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 7  >= $_p ");
                        }
                        this.state = 688;
                        localContext._cond = this.match(LPCParser.AND_AND);
                        this.state = 689;
                        this.conditionalExpression(8);
                        }
                        break;
                    case 10:
                        {
                        this.state = 690;
                        if (!( 6  >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 6  >= $_p ");
                        }
                        this.state = 691;
                        localContext._cond = this.match(LPCParser.OR_OR);
                        this.state = 692;
                        this.conditionalExpression(7);
                        }
                        break;
                    case 11:
                        {
                        this.state = 693;
                        if (!( 5  >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 5  >= $_p ");
                        }
                        this.state = 694;
                        localContext._ternOp = this.match(LPCParser.QUESTION);
                        this.state = 695;
                        this.conditionalExpression(4);
                        this.state = 696;
                        localContext._ternOp2 = this.match(LPCParser.COLON);
                        this.state = 697;
                        this.conditionalExpression(4);
                        }
                        break;
                    case 12:
                        {
                        this.state = 699;
                        if (!( 4  >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 4  >= $_p ");
                        }
                        this.state = 700;
                        localContext._assignOp = this.assignmentOperator();
                        this.state = 701;
                        this.conditionalExpression(5);
                        }
                        break;
                    }
                    }
                }
                this.state = 707;
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
    public primaryExpression(): PrimaryExpressionContext {
        let localContext = new PrimaryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 100, LPCParser.RULE_primaryExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 709;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 84, this.context) ) {
            case 1:
                {
                this.state = 708;
                localContext._super_ = this.inheritSuperExpression();
                }
                break;
            }
            this.state = 711;
            localContext._pe = this.primaryExpressionStart();
            this.state = 715;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 85, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 712;
                    this.bracketExpression();
                    }
                    }
                }
                this.state = 717;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 85, this.context);
            }
            this.state = 739;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 89, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 729;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 87, this.context) ) {
                    case 1:
                        {
                        this.state = 718;
                        this.methodInvocation();
                        }
                        break;
                    case 2:
                        {
                        this.state = 719;
                        this.match(LPCParser.INC);
                        }
                        break;
                    case 3:
                        {
                        this.state = 720;
                        this.match(LPCParser.DEC);
                        }
                        break;
                    case 4:
                        {
                        {
                        this.state = 721;
                        this.match(LPCParser.ARROW);
                        this.state = 723;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 86, this.context) ) {
                        case 1:
                            {
                            this.state = 722;
                            localContext._target = this.callOtherTarget();
                            }
                            break;
                        }
                        this.state = 725;
                        localContext._invocation = this.methodInvocation();
                        }
                        }
                        break;
                    case 5:
                        {
                        {
                        this.state = 726;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 96 || _la === 111)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 727;
                        localContext._structMember = this.match(LPCParser.Identifier);
                        }
                        }
                        break;
                    case 6:
                        {
                        this.state = 728;
                        this.match(LPCParser.Identifier);
                        }
                        break;
                    }
                    this.state = 734;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 88, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 731;
                            this.bracketExpression();
                            }
                            }
                        }
                        this.state = 736;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 88, this.context);
                    }
                    }
                    }
                }
                this.state = 741;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 89, this.context);
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
        this.enterRule(localContext, 102, LPCParser.RULE_primaryExpressionStart);
        let _la: number;
        try {
            let alternative: number;
            this.state = 792;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 97, this.context) ) {
            case 1:
                localContext = new LiteralExpressionContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 742;
                this.literal();
                }
                break;
            case 2:
                localContext = new StringConcatExpressionContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 743;
                this.match(LPCParser.StringLiteral);
                this.state = 747;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 90, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 744;
                        this.match(LPCParser.StringLiteral);
                        }
                        }
                    }
                    this.state = 749;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 90, this.context);
                }
                }
                break;
            case 3:
                localContext = new IdentifierExpressionContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 750;
                this.validIdentifiers();
                }
                break;
            case 4:
                localContext = new StructInitializerExpressionContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 780;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 95, this.context) ) {
                case 1:
                    {
                    this.state = 751;
                    if (!( this.isFluff() )) {
                        throw this.createFailedPredicateException(" this.isFluff() ");
                    }
                    {
                    this.state = 752;
                    this.match(LPCParser.PAREN_OPEN);
                    this.state = 753;
                    this.match(LPCParser.CLASS);
                    this.state = 754;
                    (localContext as StructInitializerExpressionContext)._structName = this.match(LPCParser.Identifier);
                    this.state = 759;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 93) {
                        {
                        {
                        this.state = 755;
                        this.match(LPCParser.COMMA);
                        this.state = 756;
                        this.structMemberInitializer();
                        }
                        }
                        this.state = 761;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 762;
                    this.match(LPCParser.PAREN_CLOSE);
                    }
                    }
                    break;
                case 2:
                    {
                    this.state = 763;
                    if (!( this.isLD() )) {
                        throw this.createFailedPredicateException(" this.isLD() ");
                    }
                    {
                    this.state = 764;
                    this.match(LPCParser.PAREN_OPEN);
                    this.state = 765;
                    (localContext as StructInitializerExpressionContext)._structName = this.match(LPCParser.BracketedIdentifier);
                    this.state = 774;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 93, this.context) ) {
                    case 1:
                        {
                        this.state = 766;
                        this.structMemberInitializer();
                        this.state = 771;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 92, this.context);
                        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                            if (alternative === 1) {
                                {
                                {
                                this.state = 767;
                                this.match(LPCParser.COMMA);
                                this.state = 768;
                                this.structMemberInitializer();
                                }
                                }
                            }
                            this.state = 773;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 92, this.context);
                        }
                        }
                        break;
                    }
                    this.state = 777;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 93) {
                        {
                        this.state = 776;
                        this.match(LPCParser.COMMA);
                        }
                    }

                    this.state = 779;
                    this.match(LPCParser.PAREN_CLOSE);
                    }
                    }
                    break;
                }
                }
                break;
            case 5:
                localContext = new ParenExpressionContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 782;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 785;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 96, this.context) ) {
                case 1:
                    {
                    this.state = 783;
                    this.commaableExpression();
                    }
                    break;
                case 2:
                    {
                    this.state = 784;
                    this.variableDeclaration();
                    }
                    break;
                }
                this.state = 787;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 6:
                localContext = new PrimaryArrayExpressionContext(localContext);
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 789;
                this.arrayExpression();
                }
                break;
            case 7:
                localContext = new PrimaryMappingExpressionContext(localContext);
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 790;
                this.mappingExpression();
                }
                break;
            case 8:
                localContext = new CatchExpressionContext(localContext);
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 791;
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
        this.enterRule(localContext, 104, LPCParser.RULE_validIdentifiers);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 794;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 272629836) !== 0) || ((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & 262281) !== 0) || _la === 129)) {
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
        this.enterRule(localContext, 106, LPCParser.RULE_catchExpr);
        let _la: number;
        try {
            this.state = 817;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 100, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 796;
                this.match(LPCParser.CATCH);
                this.state = 797;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 798;
                this.expression();
                this.state = 803;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 93) {
                    {
                    {
                    this.state = 799;
                    this.match(LPCParser.COMMA);
                    this.state = 800;
                    this.expression();
                    }
                    }
                    this.state = 805;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 810;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 92) {
                    {
                    {
                    this.state = 806;
                    this.match(LPCParser.SEMI);
                    this.state = 807;
                    this.match(LPCParser.Identifier);
                    }
                    }
                    this.state = 812;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 813;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 815;
                this.match(LPCParser.CATCH);
                this.state = 816;
                this.block();
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
    public inlineClosureExpression(): InlineClosureExpressionContext {
        let localContext = new InlineClosureExpressionContext(this.context, this.state);
        this.enterRule(localContext, 108, LPCParser.RULE_inlineClosureExpression);
        let _la: number;
        try {
            let alternative: number;
            this.state = 856;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 106, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 819;
                if (!(this.isFluff())) {
                    throw this.createFailedPredicateException("this.isFluff()");
                }
                this.state = 820;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 821;
                this.match(LPCParser.COLON);
                this.state = 822;
                this.expression();
                this.state = 827;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 93) {
                    {
                    {
                    this.state = 823;
                    this.match(LPCParser.COMMA);
                    this.state = 824;
                    this.expression();
                    }
                    }
                    this.state = 829;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 830;
                this.match(LPCParser.COLON);
                this.state = 831;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 833;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 834;
                this.match(LPCParser.COLON);
                this.state = 842;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 103, this.context) ) {
                case 1:
                    {
                    this.state = 835;
                    this.expression();
                    }
                    break;
                case 2:
                    {
                    this.state = 839;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 102, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 836;
                            this.statement();
                            }
                            }
                        }
                        this.state = 841;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 102, this.context);
                    }
                    }
                    break;
                }
                this.state = 844;
                this.match(LPCParser.COLON);
                this.state = 845;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 846;
                this.match(LPCParser.FUNCTION);
                this.state = 848;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2156399052) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 4733535) !== 0) || _la === 69 || _la === 76) {
                    {
                    this.state = 847;
                    this.typeSpecifier();
                    }
                }

                this.state = 850;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 852;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 105, this.context) ) {
                case 1:
                    {
                    this.state = 851;
                    this.parameterList(false);
                    }
                    break;
                }
                this.state = 854;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 855;
                this.block();
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
    public bracketExpression(): BracketExpressionContext {
        let localContext = new BracketExpressionContext(this.context, this.state);
        this.enterRule(localContext, 110, LPCParser.RULE_bracketExpression);
        let _la: number;
        try {
            this.state = 884;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 113, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 858;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 860;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 107, this.context) ) {
                case 1:
                    {
                    this.state = 859;
                    this.match(LPCParser.LT);
                    }
                    break;
                }
                this.state = 862;
                this.expression();
                this.state = 865;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 93) {
                    {
                    this.state = 863;
                    this.match(LPCParser.COMMA);
                    this.state = 864;
                    this.expression();
                    }
                }

                this.state = 867;
                this.match(LPCParser.SQUARE_CLOSE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 869;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 871;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 109, this.context) ) {
                case 1:
                    {
                    this.state = 870;
                    this.match(LPCParser.LT);
                    }
                    break;
                }
                this.state = 874;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 110, this.context) ) {
                case 1:
                    {
                    this.state = 873;
                    this.expression();
                    }
                    break;
                }
                this.state = 876;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 878;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 111, this.context) ) {
                case 1:
                    {
                    this.state = 877;
                    this.match(LPCParser.LT);
                    }
                    break;
                }
                this.state = 881;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 112, this.context) ) {
                case 1:
                    {
                    this.state = 880;
                    this.expression();
                    }
                    break;
                }
                this.state = 883;
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
        this.enterRule(localContext, 112, LPCParser.RULE_lambdaArrayIndexor);
        try {
            this.state = 899;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 117, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 886;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 887;
                this.match(LPCParser.LT);
                this.state = 889;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 114, this.context) ) {
                case 1:
                    {
                    this.state = 888;
                    this.match(LPCParser.DOUBLEDOT);
                    }
                    break;
                }
                this.state = 892;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 115, this.context) ) {
                case 1:
                    {
                    this.state = 891;
                    this.match(LPCParser.LT);
                    }
                    break;
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 894;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 895;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 897;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 116, this.context) ) {
                case 1:
                    {
                    this.state = 896;
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
        this.enterRule(localContext, 114, LPCParser.RULE_lambdaExpression);
        let _la: number;
        try {
            this.state = 920;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 121, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 902;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 24) {
                    {
                    this.state = 901;
                    this.match(LPCParser.HASH);
                    }
                }

                this.state = 904;
                this.match(LPCParser.LAMBDA_IDENTIFIER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 905;
                this.match(LPCParser.HASH);
                this.state = 906;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 918;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 120, this.context) ) {
                case 1:
                    {
                    this.state = 907;
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 40 || _la === 54)) {
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
                    this.state = 908;
                    this.bracketExpression();
                    }
                    }
                    break;
                case 3:
                    {
                    {
                    this.state = 909;
                    this.lambdaArrayIndexor();
                    }
                    }
                    break;
                case 4:
                    {
                    this.state = 913;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 119, this.context) ) {
                    case 1:
                        {
                        this.state = 910;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 3303800735) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 131583) !== 0))) {
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
                        this.state = 911;
                        this.match(LPCParser.QUESTION);
                        this.state = 912;
                        this.match(LPCParser.NOT);
                        }
                        break;
                    }
                    }
                    break;
                case 5:
                    {
                    {
                    this.state = 915;
                    this.match(LPCParser.PAREN_OPEN);
                    this.state = 916;
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 114 || _la === 116)) {
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
                    this.state = 917;
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
        this.enterRule(localContext, 116, LPCParser.RULE_castExpression);
        let _la: number;
        try {
            this.state = 948;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 123, this.context) ) {
            case 1:
                localContext = new PrimitiveTypeCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 922;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 923;
                this.typeSpecifier();
                this.state = 924;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 925;
                this.conditionalExpression(16);
                }
                break;
            case 2:
                localContext = new DeclarativeTypeCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 927;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 928;
                this.match(LPCParser.CURLY_OPEN);
                this.state = 929;
                this.typeSpecifier();
                this.state = 930;
                this.match(LPCParser.CURLY_CLOSE);
                this.state = 931;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 932;
                this.conditionalExpression(16);
                }
                break;
            case 3:
                localContext = new StructCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 934;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 935;
                this.match(LPCParser.LT);
                this.state = 936;
                this.match(LPCParser.Identifier);
                this.state = 937;
                this.match(LPCParser.GT);
                this.state = 938;
                this.conditionalExpression(16);
                this.state = 943;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 93) {
                    {
                    {
                    this.state = 939;
                    this.match(LPCParser.COMMA);
                    this.state = 940;
                    this.conditionalExpression(16);
                    }
                    }
                    this.state = 945;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 946;
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
    public statement(): StatementContext {
        let localContext = new StatementContext(this.context, this.state);
        this.enterRule(localContext, 118, LPCParser.RULE_statement);
        try {
            this.state = 960;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 124, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 950;
                this.block();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 951;
                this.match(LPCParser.SEMI);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 952;
                this.selectionStatement();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 953;
                this.iterationStatement();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 954;
                this.jumpStatement();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 955;
                this.variableDeclarationStatement();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 956;
                this.commaableExpression();
                this.state = 957;
                this.match(LPCParser.SEMI);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 959;
                this.preprocessorDirective();
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
        this.enterRule(localContext, 120, LPCParser.RULE_block);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 962;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 966;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 125, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 963;
                    this.statement();
                    }
                    }
                }
                this.state = 968;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 125, this.context);
            }
            this.state = 969;
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
        this.enterRule(localContext, 122, LPCParser.RULE_selectionStatement);
        try {
            this.state = 973;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.IF:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 971;
                this.ifStatement();
                }
                break;
            case LPCParser.SWITCH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 972;
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
        this.enterRule(localContext, 124, LPCParser.RULE_elseIfExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 975;
            this.match(LPCParser.ELSE);
            this.state = 976;
            this.match(LPCParser.IF);
            this.state = 977;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 978;
            this.expression();
            this.state = 979;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 980;
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
        this.enterRule(localContext, 126, LPCParser.RULE_elseExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 982;
            this.match(LPCParser.ELSE);
            this.state = 983;
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
        this.enterRule(localContext, 128, LPCParser.RULE_ifExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 985;
            this.match(LPCParser.IF);
            this.state = 986;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 987;
            this.expression();
            this.state = 988;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 989;
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
        this.enterRule(localContext, 130, LPCParser.RULE_ifStatement);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 991;
            this.ifExpression();
            this.state = 995;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 127, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 992;
                    this.elseIfExpression();
                    }
                    }
                }
                this.state = 997;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 127, this.context);
            }
            this.state = 999;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 128, this.context) ) {
            case 1:
                {
                this.state = 998;
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
        this.enterRule(localContext, 132, LPCParser.RULE_switchStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1001;
            this.match(LPCParser.SWITCH);
            this.state = 1002;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 1003;
            this.expression();
            this.state = 1004;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 1005;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 1009;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2429028812) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 4291444319) !== 0) || _la === 69 || _la === 76 || _la === 124 || _la === 129) {
                {
                {
                this.state = 1006;
                this.variableDeclarationStatement();
                }
                }
                this.state = 1011;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1016;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 4 || _la === 12) {
                {
                this.state = 1014;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.CASE:
                    {
                    this.state = 1012;
                    this.caseStatement();
                    }
                    break;
                case LPCParser.DEFAULT:
                    {
                    this.state = 1013;
                    this.defaultStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 1018;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1019;
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
        this.enterRule(localContext, 134, LPCParser.RULE_caseExpression);
        let _la: number;
        try {
            this.state = 1069;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 139, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1021;
                this.caseCondition();
                this.state = 1027;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 15) !== 0)) {
                    {
                    {
                    this.state = 1022;
                    this.caseOperators();
                    this.state = 1023;
                    this.caseCondition();
                    }
                    }
                    this.state = 1029;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1040;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 95) {
                    {
                    this.state = 1030;
                    this.match(LPCParser.DOUBLEDOT);
                    this.state = 1031;
                    this.caseCondition();
                    this.state = 1037;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 15) !== 0)) {
                        {
                        {
                        this.state = 1032;
                        this.caseOperators();
                        this.state = 1033;
                        this.caseCondition();
                        }
                        }
                        this.state = 1039;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    }
                }

                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1042;
                if (!( this.isFluff() )) {
                    throw this.createFailedPredicateException(" this.isFluff() ");
                }
                this.state = 1067;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.DOUBLEDOT:
                    {
                    {
                    this.state = 1043;
                    this.match(LPCParser.DOUBLEDOT);
                    this.state = 1044;
                    this.caseCondition();
                    this.state = 1050;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 15) !== 0)) {
                        {
                        {
                        this.state = 1045;
                        this.caseOperators();
                        this.state = 1046;
                        this.caseCondition();
                        }
                        }
                        this.state = 1052;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    }
                    }
                    break;
                case LPCParser.MINUS:
                case LPCParser.PAREN_OPEN:
                case LPCParser.IntegerConstant:
                case LPCParser.HexIntConstant:
                case LPCParser.StringLiteral:
                case LPCParser.CharacterConstant:
                case LPCParser.Identifier:
                    {
                    {
                    this.state = 1054;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 136, this.context) ) {
                    case 1:
                        {
                        this.state = 1053;
                        this.match(LPCParser.MINUS);
                        }
                        break;
                    }
                    this.state = 1056;
                    this.caseCondition();
                    this.state = 1062;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 15) !== 0)) {
                        {
                        {
                        this.state = 1057;
                        this.caseOperators();
                        this.state = 1058;
                        this.caseCondition();
                        }
                        }
                        this.state = 1064;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 1065;
                    this.match(LPCParser.DOUBLEDOT);
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
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
    public caseOperators(): CaseOperatorsContext {
        let localContext = new CaseOperatorsContext(this.context, this.state);
        this.enterRule(localContext, 136, LPCParser.RULE_caseOperators);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1071;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 15) !== 0))) {
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
        this.enterRule(localContext, 138, LPCParser.RULE_caseCondition);
        let _la: number;
        try {
            this.state = 1081;
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
                this.state = 1074;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 68) {
                    {
                    this.state = 1073;
                    this.match(LPCParser.MINUS);
                    }
                }

                this.state = 1076;
                _la = this.tokenStream.LA(1);
                if(!(((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 1125) !== 0))) {
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
                this.state = 1077;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 1078;
                this.conditionalExpression(13);
                this.state = 1079;
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
        this.enterRule(localContext, 140, LPCParser.RULE_caseStatement);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1083;
            this.match(LPCParser.CASE);
            this.state = 1084;
            this.caseExpression();
            this.state = 1085;
            this.match(LPCParser.COLON);
            this.state = 1089;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 142, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1086;
                    this.statement();
                    }
                    }
                }
                this.state = 1091;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 142, this.context);
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
        this.enterRule(localContext, 142, LPCParser.RULE_defaultStatement);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1092;
            this.match(LPCParser.DEFAULT);
            this.state = 1093;
            this.match(LPCParser.COLON);
            this.state = 1097;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 143, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1094;
                    this.statement();
                    }
                    }
                }
                this.state = 1099;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 143, this.context);
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
        this.enterRule(localContext, 144, LPCParser.RULE_iterationStatement);
        try {
            this.state = 1132;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.WHILE:
                localContext = new WhileStatementContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1100;
                this.match(LPCParser.WHILE);
                this.state = 1101;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 1102;
                this.expression();
                this.state = 1103;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 1106;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 144, this.context) ) {
                case 1:
                    {
                    this.state = 1104;
                    this.statement();
                    }
                    break;
                case 2:
                    {
                    this.state = 1105;
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
                this.state = 1108;
                this.match(LPCParser.DO);
                this.state = 1109;
                this.statement();
                this.state = 1110;
                this.match(LPCParser.WHILE);
                this.state = 1111;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 1112;
                this.expression();
                this.state = 1113;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 1114;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.FOR:
                localContext = new ForStatementContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1116;
                this.match(LPCParser.FOR);
                this.state = 1117;
                this.match(LPCParser.PAREN_OPEN);
                {
                this.state = 1118;
                this.forRangeExpression();
                }
                this.state = 1119;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 1122;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 145, this.context) ) {
                case 1:
                    {
                    this.state = 1120;
                    this.statement();
                    }
                    break;
                case 2:
                    {
                    this.state = 1121;
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
                this.state = 1124;
                this.match(LPCParser.FOREACH);
                this.state = 1125;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 1126;
                this.foreachRangeExpression();
                this.state = 1127;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 1130;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 146, this.context) ) {
                case 1:
                    {
                    this.state = 1128;
                    this.statement();
                    }
                    break;
                case 2:
                    {
                    this.state = 1129;
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
        this.enterRule(localContext, 146, LPCParser.RULE_forRangeExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1142;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 149, this.context) ) {
            case 1:
                {
                this.state = 1134;
                this.forVariable();
                this.state = 1139;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 93) {
                    {
                    {
                    this.state = 1135;
                    this.match(LPCParser.COMMA);
                    this.state = 1136;
                    this.forVariable();
                    }
                    }
                    this.state = 1141;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            }
            this.state = 1144;
            this.match(LPCParser.SEMI);
            this.state = 1146;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 150, this.context) ) {
            case 1:
                {
                this.state = 1145;
                this.expression();
                }
                break;
            }
            this.state = 1148;
            this.match(LPCParser.SEMI);
            this.state = 1150;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 151, this.context) ) {
            case 1:
                {
                this.state = 1149;
                this.expression();
                }
                break;
            }
            this.state = 1156;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 93) {
                {
                {
                this.state = 1152;
                this.match(LPCParser.COMMA);
                this.state = 1153;
                this.expression();
                }
                }
                this.state = 1158;
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
        this.enterRule(localContext, 148, LPCParser.RULE_foreachRangeExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1159;
            this.forEachVariable();
            this.state = 1164;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 93) {
                {
                {
                this.state = 1160;
                this.match(LPCParser.COMMA);
                this.state = 1161;
                this.forEachVariable();
                }
                }
                this.state = 1166;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1167;
            _la = this.tokenStream.LA(1);
            if(!(_la === 28 || _la === 91)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1168;
            this.expression();
            this.state = 1171;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 95) {
                {
                this.state = 1169;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 1170;
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
        this.enterRule(localContext, 150, LPCParser.RULE_forVariable);
        try {
            this.state = 1184;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 157, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1174;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 155, this.context) ) {
                case 1:
                    {
                    this.state = 1173;
                    this.primitiveTypeSpecifier();
                    }
                    break;
                }
                this.state = 1176;
                this.variableDeclarator();
                this.state = 1181;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.ASSIGN:
                    {
                    this.state = 1177;
                    this.match(LPCParser.ASSIGN);
                    this.state = 1178;
                    this.variableInitializer();
                    }
                    break;
                case LPCParser.INC:
                    {
                    this.state = 1179;
                    this.match(LPCParser.INC);
                    }
                    break;
                case LPCParser.DEC:
                    {
                    this.state = 1180;
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
                this.state = 1183;
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
        this.enterRule(localContext, 152, LPCParser.RULE_forEachVariable);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1187;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 158, this.context) ) {
            case 1:
                {
                this.state = 1186;
                this.typeSpecifier();
                }
                break;
            }
            this.state = 1189;
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
        this.enterRule(localContext, 154, LPCParser.RULE_returnStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1191;
            this.match(LPCParser.RETURN);
            this.state = 1193;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 159, this.context) ) {
            case 1:
                {
                this.state = 1192;
                this.commaableExpression();
                }
                break;
            }
            this.state = 1195;
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
        this.enterRule(localContext, 156, LPCParser.RULE_jumpStatement);
        try {
            this.state = 1202;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BREAK:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1197;
                this.match(LPCParser.BREAK);
                this.state = 1198;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.CONTINUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1199;
                this.match(LPCParser.CONTINUE);
                this.state = 1200;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.RETURN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1201;
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
        this.enterRule(localContext, 158, LPCParser.RULE_callOtherTarget);
        try {
            this.state = 1210;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BUFFER:
            case LPCParser.BYTES:
            case LPCParser.CHAR:
            case LPCParser.FUNCTIONS:
            case LPCParser.IN:
            case LPCParser.STRUCTS:
            case LPCParser.SYMBOL:
            case LPCParser.VARIABLES:
            case LPCParser.VISIBLE:
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1204;
                this.validIdentifiers();
                }
                break;
            case LPCParser.PAREN_OPEN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1205;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 1206;
                this.expression();
                this.state = 1207;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1209;
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
        this.enterRule(localContext, 160, LPCParser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1212;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 71) !== 0))) {
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
        this.enterRule(localContext, 162, LPCParser.RULE_argument);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1215;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 162, this.context) ) {
            case 1:
                {
                this.state = 1214;
                _la = this.tokenStream.LA(1);
                if(!(_la === 41 || _la === 82)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                break;
            }
            this.state = 1217;
            this.expression();
            this.state = 1219;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 94) {
                {
                this.state = 1218;
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
    public argumentList(): ArgumentListContext {
        let localContext = new ArgumentListContext(this.context, this.state);
        this.enterRule(localContext, 164, LPCParser.RULE_argumentList);
        let _la: number;
        try {
            this.state = 1242;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 167, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1221;
                this.argument();
                this.state = 1228;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 93) {
                    {
                    {
                    this.state = 1222;
                    this.match(LPCParser.COMMA);
                    this.state = 1224;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 164, this.context) ) {
                    case 1:
                        {
                        this.state = 1223;
                        this.argument();
                        }
                        break;
                    }
                    }
                    }
                    this.state = 1230;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1231;
                if (!( this.isFluff() )) {
                    throw this.createFailedPredicateException(" this.isFluff() ");
                }
                this.state = 1232;
                this.structTypeSpecifier();
                this.state = 1239;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 93) {
                    {
                    {
                    this.state = 1233;
                    this.match(LPCParser.COMMA);
                    this.state = 1234;
                    this.match(LPCParser.Identifier);
                    this.state = 1235;
                    this.match(LPCParser.COLON);
                    this.state = 1236;
                    this.expression();
                    }
                    }
                    this.state = 1241;
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

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 0:
            return this.program_sempred(localContext as ProgramContext, predIndex);
        case 2:
            return this.includePreprocessorDirective_sempred(localContext as IncludePreprocessorDirectiveContext, predIndex);
        case 7:
            return this.directiveIfTestExpression_sempred(localContext as DirectiveIfTestExpressionContext, predIndex);
        case 18:
            return this.inheritFile_sempred(localContext as InheritFileContext, predIndex);
        case 27:
            return this.parameter_sempred(localContext as ParameterContext, predIndex);
        case 32:
            return this.structDeclaration_sempred(localContext as StructDeclarationContext, predIndex);
        case 49:
            return this.conditionalExpression_sempred(localContext as ConditionalExpressionContext, predIndex);
        case 51:
            return this.primaryExpressionStart_sempred(localContext as PrimaryExpressionStartContext, predIndex);
        case 54:
            return this.inlineClosureExpression_sempred(localContext as InlineClosureExpressionContext, predIndex);
        case 67:
            return this.caseExpression_sempred(localContext as CaseExpressionContext, predIndex);
        case 82:
            return this.argumentList_sempred(localContext as ArgumentListContext, predIndex);
        }
        return true;
    }
    private program_sempred(localContext: ProgramContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return  this.isFluff() ;
        }
        return true;
    }
    private includePreprocessorDirective_sempred(localContext: IncludePreprocessorDirectiveContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 1:
            return  this.isFluff() ;
        }
        return true;
    }
    private directiveIfTestExpression_sempred(localContext: DirectiveIfTestExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 2:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private inheritFile_sempred(localContext: InheritFileContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 3:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private parameter_sempred(localContext: ParameterContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 4:
            return localContext?._isHeader!==false;
        case 5:
            return  this.isFluff() ;
        case 6:
            return localContext?._isHeader! && this.isFluff();
        }
        return true;
    }
    private structDeclaration_sempred(localContext: StructDeclarationContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 7:
            return this.isFluff();
        }
        return true;
    }
    private conditionalExpression_sempred(localContext: ConditionalExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 8:
            return  16 >= localContext?._p! ;
        case 9:
            return  15 >= localContext?._p! ;
        case 10:
            return  14 >= localContext?._p! ;
        case 11:
            return  13 >= localContext?._p! ;
        case 12:
            return  12 >= localContext?._p! ;
        case 13:
            return  11 >= localContext?._p! ;
        case 14:
            return  10 >= localContext?._p! ;
        case 15:
            return  9  >= localContext?._p! ;
        case 16:
            return  8  >= localContext?._p! ;
        case 17:
            return  7  >= localContext?._p! ;
        case 18:
            return  6  >= localContext?._p! ;
        case 19:
            return  5  >= localContext?._p! ;
        case 20:
            return  4  >= localContext?._p! ;
        }
        return true;
    }
    private primaryExpressionStart_sempred(localContext: PrimaryExpressionStartContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 21:
            return  this.isFluff() ;
        case 22:
            return  this.isLD() ;
        }
        return true;
    }
    private inlineClosureExpression_sempred(localContext: InlineClosureExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 23:
            return this.isFluff();
        }
        return true;
    }
    private caseExpression_sempred(localContext: CaseExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 24:
            return  this.isFluff() ;
        }
        return true;
    }
    private argumentList_sempred(localContext: ArgumentListContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 25:
            return  this.isFluff() ;
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,136,1245,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
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
        78,2,79,7,79,2,80,7,80,2,81,7,81,2,82,7,82,1,0,1,0,1,0,1,0,1,0,5,
        0,172,8,0,10,0,12,0,175,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,5,1,190,8,1,10,1,12,1,193,9,1,3,1,195,8,1,1,2,1,
        2,1,2,1,2,1,2,3,2,202,8,2,1,3,1,3,1,3,1,4,1,4,1,4,3,4,210,8,4,1,
        4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,219,8,4,1,5,1,5,1,6,1,6,1,7,1,7,3,
        7,227,8,7,1,7,1,7,1,7,1,7,1,7,4,7,234,8,7,11,7,12,7,235,5,7,238,
        8,7,10,7,12,7,241,9,7,1,8,1,8,1,8,1,8,3,8,247,8,8,1,8,1,8,1,8,3,
        8,252,8,8,1,9,1,9,1,9,1,9,3,9,258,8,9,1,10,1,10,1,10,5,10,263,8,
        10,10,10,12,10,266,9,10,1,10,1,10,1,10,3,10,271,8,10,1,11,1,11,1,
        12,1,12,1,12,5,12,278,8,12,10,12,12,12,281,9,12,1,12,3,12,284,8,
        12,1,13,1,13,1,14,3,14,289,8,14,1,14,1,14,1,14,4,14,294,8,14,11,
        14,12,14,295,3,14,298,8,14,1,14,5,14,301,8,14,10,14,12,14,304,9,
        14,1,14,3,14,307,8,14,1,14,3,14,310,8,14,1,14,1,14,1,15,4,15,315,
        8,15,11,15,12,15,316,1,15,1,15,1,15,4,15,322,8,15,11,15,12,15,323,
        1,15,1,15,3,15,328,8,15,1,16,1,16,1,16,1,17,1,17,1,18,1,18,1,18,
        1,18,1,18,1,18,1,18,3,18,342,8,18,1,18,1,18,3,18,346,8,18,1,18,5,
        18,349,8,18,10,18,12,18,352,9,18,1,19,3,19,355,8,19,1,19,1,19,1,
        19,1,19,3,19,361,8,19,1,20,1,20,1,20,1,21,1,21,1,21,1,21,3,21,370,
        8,21,1,22,1,22,1,23,5,23,375,8,23,10,23,12,23,378,9,23,1,23,3,23,
        381,8,23,1,23,1,23,1,23,3,23,386,8,23,1,23,1,23,1,24,1,24,1,24,1,
        25,1,25,1,25,1,26,1,26,1,26,1,26,5,26,400,8,26,10,26,12,26,403,9,
        26,3,26,405,8,26,1,27,1,27,3,27,409,8,27,1,27,3,27,412,8,27,1,27,
        1,27,1,27,1,27,1,27,1,27,1,27,3,27,421,8,27,1,27,1,27,3,27,425,8,
        27,1,27,1,27,3,27,429,8,27,1,27,3,27,432,8,27,1,27,3,27,435,8,27,
        1,27,3,27,438,8,27,1,27,3,27,441,8,27,1,27,3,27,444,8,27,1,27,3,
        27,447,8,27,1,28,1,28,1,28,1,28,5,28,453,8,28,10,28,12,28,456,9,
        28,1,28,1,28,1,29,1,29,1,29,1,29,3,29,464,8,29,1,30,1,30,1,31,1,
        31,1,32,1,32,3,32,472,8,32,1,32,1,32,1,32,1,32,1,32,3,32,479,8,32,
        1,32,1,32,5,32,483,8,32,10,32,12,32,486,9,32,1,32,1,32,3,32,490,
        8,32,1,33,1,33,1,33,1,34,5,34,496,8,34,10,34,12,34,499,9,34,1,34,
        3,34,502,8,34,1,34,3,34,505,8,34,1,34,1,34,1,34,5,34,510,8,34,10,
        34,12,34,513,9,34,1,35,1,35,1,35,3,35,518,8,35,1,36,5,36,521,8,36,
        10,36,12,36,524,9,36,1,36,1,36,1,37,1,37,1,37,3,37,531,8,37,1,38,
        1,38,1,39,1,39,3,39,537,8,39,1,39,1,39,1,40,1,40,1,40,1,41,1,41,
        1,42,1,42,1,42,1,42,1,42,1,42,3,42,552,8,42,1,42,3,42,555,8,42,1,
        42,5,42,558,8,42,10,42,12,42,561,9,42,1,42,4,42,564,8,42,11,42,12,
        42,565,3,42,568,8,42,1,42,1,42,5,42,572,8,42,10,42,12,42,575,9,42,
        1,43,1,43,1,43,1,43,3,43,581,8,43,1,43,1,43,1,43,3,43,586,8,43,5,
        43,588,8,43,10,43,12,43,591,9,43,3,43,593,8,43,1,43,3,43,596,8,43,
        1,43,1,43,1,43,1,44,1,44,1,44,1,44,1,44,5,44,606,8,44,10,44,12,44,
        609,9,44,3,44,611,8,44,1,45,1,45,1,45,1,45,5,45,617,8,45,10,45,12,
        45,620,9,45,1,45,3,45,623,8,45,1,45,1,45,1,45,1,45,1,45,1,45,1,45,
        1,45,1,45,1,45,1,45,1,45,3,45,637,8,45,1,46,1,46,1,47,1,47,1,47,
        1,47,5,47,645,8,47,10,47,12,47,648,9,47,3,47,650,8,47,1,48,1,48,
        1,49,1,49,3,49,656,8,49,1,49,1,49,1,49,1,49,3,49,662,8,49,1,49,1,
        49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,
        49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,
        49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,5,
        49,704,8,49,10,49,12,49,707,9,49,1,50,3,50,710,8,50,1,50,1,50,5,
        50,714,8,50,10,50,12,50,717,9,50,1,50,1,50,1,50,1,50,1,50,3,50,724,
        8,50,1,50,1,50,1,50,1,50,3,50,730,8,50,1,50,5,50,733,8,50,10,50,
        12,50,736,9,50,5,50,738,8,50,10,50,12,50,741,9,50,1,51,1,51,1,51,
        5,51,746,8,51,10,51,12,51,749,9,51,1,51,1,51,1,51,1,51,1,51,1,51,
        1,51,5,51,758,8,51,10,51,12,51,761,9,51,1,51,1,51,1,51,1,51,1,51,
        1,51,1,51,5,51,770,8,51,10,51,12,51,773,9,51,3,51,775,8,51,1,51,
        3,51,778,8,51,1,51,3,51,781,8,51,1,51,1,51,1,51,3,51,786,8,51,1,
        51,1,51,1,51,1,51,1,51,3,51,793,8,51,1,52,1,52,1,53,1,53,1,53,1,
        53,1,53,5,53,802,8,53,10,53,12,53,805,9,53,1,53,1,53,5,53,809,8,
        53,10,53,12,53,812,9,53,1,53,1,53,1,53,1,53,3,53,818,8,53,1,54,1,
        54,1,54,1,54,1,54,1,54,5,54,826,8,54,10,54,12,54,829,9,54,1,54,1,
        54,1,54,1,54,1,54,1,54,1,54,5,54,838,8,54,10,54,12,54,841,9,54,3,
        54,843,8,54,1,54,1,54,1,54,1,54,3,54,849,8,54,1,54,1,54,3,54,853,
        8,54,1,54,1,54,3,54,857,8,54,1,55,1,55,3,55,861,8,55,1,55,1,55,1,
        55,3,55,866,8,55,1,55,1,55,1,55,1,55,3,55,872,8,55,1,55,3,55,875,
        8,55,1,55,1,55,3,55,879,8,55,1,55,3,55,882,8,55,1,55,3,55,885,8,
        55,1,56,1,56,1,56,3,56,890,8,56,1,56,3,56,893,8,56,1,56,1,56,1,56,
        3,56,898,8,56,3,56,900,8,56,1,57,3,57,903,8,57,1,57,1,57,1,57,1,
        57,1,57,1,57,1,57,1,57,1,57,3,57,914,8,57,1,57,1,57,1,57,3,57,919,
        8,57,3,57,921,8,57,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,
        1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,5,58,942,8,58,
        10,58,12,58,945,9,58,1,58,1,58,3,58,949,8,58,1,59,1,59,1,59,1,59,
        1,59,1,59,1,59,1,59,1,59,1,59,3,59,961,8,59,1,60,1,60,5,60,965,8,
        60,10,60,12,60,968,9,60,1,60,1,60,1,61,1,61,3,61,974,8,61,1,62,1,
        62,1,62,1,62,1,62,1,62,1,62,1,63,1,63,1,63,1,64,1,64,1,64,1,64,1,
        64,1,64,1,65,1,65,5,65,994,8,65,10,65,12,65,997,9,65,1,65,3,65,1000,
        8,65,1,66,1,66,1,66,1,66,1,66,1,66,5,66,1008,8,66,10,66,12,66,1011,
        9,66,1,66,1,66,5,66,1015,8,66,10,66,12,66,1018,9,66,1,66,1,66,1,
        67,1,67,1,67,1,67,5,67,1026,8,67,10,67,12,67,1029,9,67,1,67,1,67,
        1,67,1,67,1,67,5,67,1036,8,67,10,67,12,67,1039,9,67,3,67,1041,8,
        67,1,67,1,67,1,67,1,67,1,67,1,67,5,67,1049,8,67,10,67,12,67,1052,
        9,67,1,67,3,67,1055,8,67,1,67,1,67,1,67,1,67,5,67,1061,8,67,10,67,
        12,67,1064,9,67,1,67,1,67,3,67,1068,8,67,3,67,1070,8,67,1,68,1,68,
        1,69,3,69,1075,8,69,1,69,1,69,1,69,1,69,1,69,3,69,1082,8,69,1,70,
        1,70,1,70,1,70,5,70,1088,8,70,10,70,12,70,1091,9,70,1,71,1,71,1,
        71,5,71,1096,8,71,10,71,12,71,1099,9,71,1,72,1,72,1,72,1,72,1,72,
        1,72,3,72,1107,8,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,
        1,72,1,72,1,72,1,72,1,72,3,72,1123,8,72,1,72,1,72,1,72,1,72,1,72,
        1,72,3,72,1131,8,72,3,72,1133,8,72,1,73,1,73,1,73,5,73,1138,8,73,
        10,73,12,73,1141,9,73,3,73,1143,8,73,1,73,1,73,3,73,1147,8,73,1,
        73,1,73,3,73,1151,8,73,1,73,1,73,5,73,1155,8,73,10,73,12,73,1158,
        9,73,1,74,1,74,1,74,5,74,1163,8,74,10,74,12,74,1166,9,74,1,74,1,
        74,1,74,1,74,3,74,1172,8,74,1,75,3,75,1175,8,75,1,75,1,75,1,75,1,
        75,1,75,3,75,1182,8,75,1,75,3,75,1185,8,75,1,76,3,76,1188,8,76,1,
        76,1,76,1,77,1,77,3,77,1194,8,77,1,77,1,77,1,78,1,78,1,78,1,78,1,
        78,3,78,1203,8,78,1,79,1,79,1,79,1,79,1,79,1,79,3,79,1211,8,79,1,
        80,1,80,1,81,3,81,1216,8,81,1,81,1,81,3,81,1220,8,81,1,82,1,82,1,
        82,3,82,1225,8,82,5,82,1227,8,82,10,82,12,82,1230,9,82,1,82,1,82,
        1,82,1,82,1,82,1,82,5,82,1238,8,82,10,82,12,82,1241,9,82,3,82,1243,
        8,82,1,82,0,2,14,36,83,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,
        32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,
        76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,
        114,116,118,120,122,124,126,128,130,132,134,136,138,140,142,144,
        146,148,150,152,154,156,158,160,162,164,0,30,2,0,16,16,25,25,2,0,
        15,15,17,17,1,0,26,27,2,0,76,81,88,89,3,0,119,119,124,124,129,129,
        2,0,43,43,50,50,1,0,57,61,3,0,37,37,124,124,129,129,1,0,57,59,2,
        0,56,62,64,65,2,0,56,60,62,64,2,0,7,7,44,44,13,0,2,3,6,6,8,8,11,
        11,19,19,23,23,31,31,33,37,39,39,42,42,45,46,52,52,55,55,1,0,97,
        109,4,0,67,69,72,73,82,82,85,87,1,0,69,71,1,0,67,68,1,0,74,75,1,
        0,76,79,2,0,28,28,80,81,2,0,96,96,111,111,9,0,2,3,6,6,22,22,28,28,
        43,43,46,46,50,50,61,61,129,129,2,0,40,40,54,54,7,0,67,71,74,84,
        86,86,88,90,93,93,97,107,116,116,2,0,114,114,116,116,1,0,67,70,4,
        0,119,119,121,121,124,125,129,129,2,0,28,28,91,91,2,0,119,121,125,
        125,2,0,41,41,82,82,1390,0,173,1,0,0,0,2,194,1,0,0,0,4,196,1,0,0,
        0,6,203,1,0,0,0,8,218,1,0,0,0,10,220,1,0,0,0,12,222,1,0,0,0,14,224,
        1,0,0,0,16,251,1,0,0,0,18,257,1,0,0,0,20,270,1,0,0,0,22,272,1,0,
        0,0,24,283,1,0,0,0,26,285,1,0,0,0,28,309,1,0,0,0,30,327,1,0,0,0,
        32,329,1,0,0,0,34,332,1,0,0,0,36,341,1,0,0,0,38,360,1,0,0,0,40,362,
        1,0,0,0,42,369,1,0,0,0,44,371,1,0,0,0,46,376,1,0,0,0,48,389,1,0,
        0,0,50,392,1,0,0,0,52,404,1,0,0,0,54,446,1,0,0,0,56,448,1,0,0,0,
        58,463,1,0,0,0,60,465,1,0,0,0,62,467,1,0,0,0,64,471,1,0,0,0,66,491,
        1,0,0,0,68,497,1,0,0,0,70,514,1,0,0,0,72,522,1,0,0,0,74,530,1,0,
        0,0,76,532,1,0,0,0,78,534,1,0,0,0,80,540,1,0,0,0,82,543,1,0,0,0,
        84,567,1,0,0,0,86,576,1,0,0,0,88,600,1,0,0,0,90,636,1,0,0,0,92,638,
        1,0,0,0,94,649,1,0,0,0,96,651,1,0,0,0,98,655,1,0,0,0,100,709,1,0,
        0,0,102,792,1,0,0,0,104,794,1,0,0,0,106,817,1,0,0,0,108,856,1,0,
        0,0,110,884,1,0,0,0,112,899,1,0,0,0,114,920,1,0,0,0,116,948,1,0,
        0,0,118,960,1,0,0,0,120,962,1,0,0,0,122,973,1,0,0,0,124,975,1,0,
        0,0,126,982,1,0,0,0,128,985,1,0,0,0,130,991,1,0,0,0,132,1001,1,0,
        0,0,134,1069,1,0,0,0,136,1071,1,0,0,0,138,1081,1,0,0,0,140,1083,
        1,0,0,0,142,1092,1,0,0,0,144,1132,1,0,0,0,146,1142,1,0,0,0,148,1159,
        1,0,0,0,150,1184,1,0,0,0,152,1187,1,0,0,0,154,1191,1,0,0,0,156,1202,
        1,0,0,0,158,1210,1,0,0,0,160,1212,1,0,0,0,162,1215,1,0,0,0,164,1242,
        1,0,0,0,166,172,3,42,21,0,167,172,3,2,1,0,168,172,3,28,14,0,169,
        170,4,0,0,0,170,172,3,40,20,0,171,166,1,0,0,0,171,167,1,0,0,0,171,
        168,1,0,0,0,171,169,1,0,0,0,172,175,1,0,0,0,173,171,1,0,0,0,173,
        174,1,0,0,0,174,176,1,0,0,0,175,173,1,0,0,0,176,177,5,0,0,1,177,
        1,1,0,0,0,178,195,3,8,4,0,179,180,3,18,9,0,180,181,3,20,10,0,181,
        195,1,0,0,0,182,195,3,6,3,0,183,195,3,4,2,0,184,185,5,24,0,0,185,
        186,3,26,13,0,186,191,5,129,0,0,187,188,5,93,0,0,188,190,5,129,0,
        0,189,187,1,0,0,0,190,193,1,0,0,0,191,189,1,0,0,0,191,192,1,0,0,
        0,192,195,1,0,0,0,193,191,1,0,0,0,194,178,1,0,0,0,194,179,1,0,0,
        0,194,182,1,0,0,0,194,183,1,0,0,0,194,184,1,0,0,0,195,3,1,0,0,0,
        196,197,5,24,0,0,197,198,3,22,11,0,198,201,3,24,12,0,199,200,4,2,
        1,0,200,202,5,92,0,0,201,199,1,0,0,0,201,202,1,0,0,0,202,5,1,0,0,
        0,203,204,5,132,0,0,204,205,5,134,0,0,205,7,1,0,0,0,206,207,5,24,
        0,0,207,209,3,12,6,0,208,210,5,86,0,0,209,208,1,0,0,0,209,210,1,
        0,0,0,210,211,1,0,0,0,211,212,3,20,10,0,212,219,1,0,0,0,213,214,
        5,24,0,0,214,215,7,0,0,0,215,219,3,14,7,0,216,217,5,24,0,0,217,219,
        3,10,5,0,218,206,1,0,0,0,218,213,1,0,0,0,218,216,1,0,0,0,219,9,1,
        0,0,0,220,221,7,1,0,0,221,11,1,0,0,0,222,223,7,2,0,0,223,13,1,0,
        0,0,224,226,6,7,-1,0,225,227,5,86,0,0,226,225,1,0,0,0,226,227,1,
        0,0,0,227,228,1,0,0,0,228,229,3,16,8,0,229,239,1,0,0,0,230,233,10,
        1,0,0,231,232,7,3,0,0,232,234,3,14,7,0,233,231,1,0,0,0,234,235,1,
        0,0,0,235,233,1,0,0,0,235,236,1,0,0,0,236,238,1,0,0,0,237,230,1,
        0,0,0,238,241,1,0,0,0,239,237,1,0,0,0,239,240,1,0,0,0,240,15,1,0,
        0,0,241,239,1,0,0,0,242,246,5,129,0,0,243,244,5,112,0,0,244,245,
        7,4,0,0,245,247,5,113,0,0,246,243,1,0,0,0,246,247,1,0,0,0,247,252,
        1,0,0,0,248,252,5,124,0,0,249,252,5,119,0,0,250,252,3,92,46,0,251,
        242,1,0,0,0,251,248,1,0,0,0,251,249,1,0,0,0,251,250,1,0,0,0,252,
        17,1,0,0,0,253,254,5,24,0,0,254,258,5,49,0,0,255,258,5,14,0,0,256,
        258,5,32,0,0,257,253,1,0,0,0,257,255,1,0,0,0,257,256,1,0,0,0,258,
        19,1,0,0,0,259,264,5,129,0,0,260,261,5,68,0,0,261,263,5,129,0,0,
        262,260,1,0,0,0,263,266,1,0,0,0,264,262,1,0,0,0,264,265,1,0,0,0,
        265,271,1,0,0,0,266,264,1,0,0,0,267,271,5,124,0,0,268,271,5,119,
        0,0,269,271,5,57,0,0,270,259,1,0,0,0,270,267,1,0,0,0,270,268,1,0,
        0,0,270,269,1,0,0,0,271,21,1,0,0,0,272,273,5,29,0,0,273,23,1,0,0,
        0,274,284,5,128,0,0,275,279,5,124,0,0,276,278,5,124,0,0,277,276,
        1,0,0,0,278,281,1,0,0,0,279,277,1,0,0,0,279,280,1,0,0,0,280,284,
        1,0,0,0,281,279,1,0,0,0,282,284,5,129,0,0,283,274,1,0,0,0,283,275,
        1,0,0,0,283,282,1,0,0,0,284,25,1,0,0,0,285,286,5,38,0,0,286,27,1,
        0,0,0,287,289,5,57,0,0,288,287,1,0,0,0,288,289,1,0,0,0,289,290,1,
        0,0,0,290,310,3,32,16,0,291,293,5,12,0,0,292,294,3,34,17,0,293,292,
        1,0,0,0,294,295,1,0,0,0,295,293,1,0,0,0,295,296,1,0,0,0,296,298,
        1,0,0,0,297,291,1,0,0,0,297,298,1,0,0,0,298,302,1,0,0,0,299,301,
        3,30,15,0,300,299,1,0,0,0,301,304,1,0,0,0,302,300,1,0,0,0,302,303,
        1,0,0,0,303,306,1,0,0,0,304,302,1,0,0,0,305,307,5,51,0,0,306,305,
        1,0,0,0,306,307,1,0,0,0,307,308,1,0,0,0,308,310,3,32,16,0,309,288,
        1,0,0,0,309,297,1,0,0,0,310,311,1,0,0,0,311,312,5,92,0,0,312,29,
        1,0,0,0,313,315,3,44,22,0,314,313,1,0,0,0,315,316,1,0,0,0,316,314,
        1,0,0,0,316,317,1,0,0,0,317,318,1,0,0,0,318,319,5,22,0,0,319,328,
        1,0,0,0,320,322,3,60,30,0,321,320,1,0,0,0,322,323,1,0,0,0,323,321,
        1,0,0,0,323,324,1,0,0,0,324,325,1,0,0,0,325,326,7,5,0,0,326,328,
        1,0,0,0,327,314,1,0,0,0,327,321,1,0,0,0,328,31,1,0,0,0,329,330,5,
        30,0,0,330,331,3,36,18,0,331,33,1,0,0,0,332,333,7,6,0,0,333,35,1,
        0,0,0,334,335,6,18,-1,0,335,342,5,124,0,0,336,342,5,129,0,0,337,
        338,5,112,0,0,338,339,3,36,18,0,339,340,5,113,0,0,340,342,1,0,0,
        0,341,334,1,0,0,0,341,336,1,0,0,0,341,337,1,0,0,0,342,350,1,0,0,
        0,343,345,10,1,0,0,344,346,5,67,0,0,345,344,1,0,0,0,345,346,1,0,
        0,0,346,347,1,0,0,0,347,349,3,36,18,2,348,343,1,0,0,0,349,352,1,
        0,0,0,350,348,1,0,0,0,350,351,1,0,0,0,351,37,1,0,0,0,352,350,1,0,
        0,0,353,355,7,7,0,0,354,353,1,0,0,0,354,355,1,0,0,0,355,356,1,0,
        0,0,356,361,5,66,0,0,357,358,3,104,52,0,358,359,5,66,0,0,359,361,
        1,0,0,0,360,354,1,0,0,0,360,357,1,0,0,0,361,39,1,0,0,0,362,363,7,
        8,0,0,363,364,5,91,0,0,364,41,1,0,0,0,365,370,3,48,24,0,366,370,
        3,50,25,0,367,370,3,64,32,0,368,370,3,66,33,0,369,365,1,0,0,0,369,
        366,1,0,0,0,369,367,1,0,0,0,369,368,1,0,0,0,370,43,1,0,0,0,371,372,
        7,9,0,0,372,45,1,0,0,0,373,375,3,44,22,0,374,373,1,0,0,0,375,378,
        1,0,0,0,376,374,1,0,0,0,376,377,1,0,0,0,377,380,1,0,0,0,378,376,
        1,0,0,0,379,381,3,82,41,0,380,379,1,0,0,0,380,381,1,0,0,0,381,382,
        1,0,0,0,382,383,3,104,52,0,383,385,5,112,0,0,384,386,3,52,26,0,385,
        384,1,0,0,0,385,386,1,0,0,0,386,387,1,0,0,0,387,388,5,113,0,0,388,
        47,1,0,0,0,389,390,3,46,23,0,390,391,5,92,0,0,391,49,1,0,0,0,392,
        393,3,46,23,0,393,394,3,120,60,0,394,51,1,0,0,0,395,405,5,52,0,0,
        396,401,3,54,27,0,397,398,5,93,0,0,398,400,3,54,27,0,399,397,1,0,
        0,0,400,403,1,0,0,0,401,399,1,0,0,0,401,402,1,0,0,0,402,405,1,0,
        0,0,403,401,1,0,0,0,404,395,1,0,0,0,404,396,1,0,0,0,405,53,1,0,0,
        0,406,408,4,27,4,1,407,409,5,65,0,0,408,407,1,0,0,0,408,409,1,0,
        0,0,409,411,1,0,0,0,410,412,3,84,42,0,411,410,1,0,0,0,411,412,1,
        0,0,0,412,413,1,0,0,0,413,420,3,104,52,0,414,415,5,97,0,0,415,421,
        3,92,46,0,416,417,4,27,5,0,417,418,5,91,0,0,418,421,3,108,54,0,419,
        421,5,94,0,0,420,414,1,0,0,0,420,416,1,0,0,0,420,419,1,0,0,0,420,
        421,1,0,0,0,421,447,1,0,0,0,422,424,4,27,6,1,423,425,5,65,0,0,424,
        423,1,0,0,0,424,425,1,0,0,0,425,426,1,0,0,0,426,428,3,84,42,0,427,
        429,5,82,0,0,428,427,1,0,0,0,428,429,1,0,0,0,429,431,1,0,0,0,430,
        432,3,104,52,0,431,430,1,0,0,0,431,432,1,0,0,0,432,434,1,0,0,0,433,
        435,5,94,0,0,434,433,1,0,0,0,434,435,1,0,0,0,435,447,1,0,0,0,436,
        438,5,65,0,0,437,436,1,0,0,0,437,438,1,0,0,0,438,440,1,0,0,0,439,
        441,3,84,42,0,440,439,1,0,0,0,440,441,1,0,0,0,441,443,1,0,0,0,442,
        444,5,82,0,0,443,442,1,0,0,0,443,444,1,0,0,0,444,445,1,0,0,0,445,
        447,3,104,52,0,446,406,1,0,0,0,446,422,1,0,0,0,446,437,1,0,0,0,447,
        55,1,0,0,0,448,449,3,84,42,0,449,454,5,129,0,0,450,451,5,93,0,0,
        451,453,5,129,0,0,452,450,1,0,0,0,453,456,1,0,0,0,454,452,1,0,0,
        0,454,455,1,0,0,0,455,457,1,0,0,0,456,454,1,0,0,0,457,458,5,92,0,
        0,458,57,1,0,0,0,459,460,5,129,0,0,460,461,5,91,0,0,461,464,3,92,
        46,0,462,464,3,92,46,0,463,459,1,0,0,0,463,462,1,0,0,0,464,59,1,
        0,0,0,465,466,7,10,0,0,466,61,1,0,0,0,467,468,5,57,0,0,468,63,1,
        0,0,0,469,470,4,32,7,0,470,472,3,62,31,0,471,469,1,0,0,0,471,472,
        1,0,0,0,472,473,1,0,0,0,473,474,7,11,0,0,474,478,5,129,0,0,475,476,
        5,112,0,0,476,477,5,129,0,0,477,479,5,113,0,0,478,475,1,0,0,0,478,
        479,1,0,0,0,479,480,1,0,0,0,480,484,5,114,0,0,481,483,3,56,28,0,
        482,481,1,0,0,0,483,486,1,0,0,0,484,482,1,0,0,0,484,485,1,0,0,0,
        485,487,1,0,0,0,486,484,1,0,0,0,487,489,5,115,0,0,488,490,5,92,0,
        0,489,488,1,0,0,0,489,490,1,0,0,0,490,65,1,0,0,0,491,492,3,68,34,
        0,492,493,5,92,0,0,493,67,1,0,0,0,494,496,3,60,30,0,495,494,1,0,
        0,0,496,499,1,0,0,0,497,495,1,0,0,0,497,498,1,0,0,0,498,501,1,0,
        0,0,499,497,1,0,0,0,500,502,3,84,42,0,501,500,1,0,0,0,501,502,1,
        0,0,0,502,504,1,0,0,0,503,505,5,124,0,0,504,503,1,0,0,0,504,505,
        1,0,0,0,505,506,1,0,0,0,506,511,3,70,35,0,507,508,5,93,0,0,508,510,
        3,70,35,0,509,507,1,0,0,0,510,513,1,0,0,0,511,509,1,0,0,0,511,512,
        1,0,0,0,512,69,1,0,0,0,513,511,1,0,0,0,514,517,3,72,36,0,515,516,
        5,97,0,0,516,518,3,74,37,0,517,515,1,0,0,0,517,518,1,0,0,0,518,71,
        1,0,0,0,519,521,5,69,0,0,520,519,1,0,0,0,521,524,1,0,0,0,522,520,
        1,0,0,0,522,523,1,0,0,0,523,525,1,0,0,0,524,522,1,0,0,0,525,526,
        3,104,52,0,526,73,1,0,0,0,527,531,3,86,43,0,528,531,3,90,45,0,529,
        531,3,92,46,0,530,527,1,0,0,0,530,528,1,0,0,0,530,529,1,0,0,0,531,
        75,1,0,0,0,532,533,7,12,0,0,533,77,1,0,0,0,534,536,5,112,0,0,535,
        537,3,164,82,0,536,535,1,0,0,0,536,537,1,0,0,0,537,538,1,0,0,0,538,
        539,5,113,0,0,539,79,1,0,0,0,540,541,7,11,0,0,541,542,5,129,0,0,
        542,81,1,0,0,0,543,544,3,84,42,0,544,83,1,0,0,0,545,552,3,76,38,
        0,546,547,5,76,0,0,547,548,3,82,41,0,548,549,5,77,0,0,549,552,1,
        0,0,0,550,552,3,80,40,0,551,545,1,0,0,0,551,546,1,0,0,0,551,550,
        1,0,0,0,552,554,1,0,0,0,553,555,5,41,0,0,554,553,1,0,0,0,554,555,
        1,0,0,0,555,559,1,0,0,0,556,558,5,69,0,0,557,556,1,0,0,0,558,561,
        1,0,0,0,559,557,1,0,0,0,559,560,1,0,0,0,560,568,1,0,0,0,561,559,
        1,0,0,0,562,564,5,69,0,0,563,562,1,0,0,0,564,565,1,0,0,0,565,563,
        1,0,0,0,565,566,1,0,0,0,566,568,1,0,0,0,567,551,1,0,0,0,567,563,
        1,0,0,0,568,573,1,0,0,0,569,570,5,83,0,0,570,572,3,84,42,0,571,569,
        1,0,0,0,572,575,1,0,0,0,573,571,1,0,0,0,573,574,1,0,0,0,574,85,1,
        0,0,0,575,573,1,0,0,0,576,577,5,112,0,0,577,592,5,114,0,0,578,580,
        3,92,46,0,579,581,5,94,0,0,580,579,1,0,0,0,580,581,1,0,0,0,581,589,
        1,0,0,0,582,583,5,93,0,0,583,585,3,92,46,0,584,586,5,94,0,0,585,
        584,1,0,0,0,585,586,1,0,0,0,586,588,1,0,0,0,587,582,1,0,0,0,588,
        591,1,0,0,0,589,587,1,0,0,0,589,590,1,0,0,0,590,593,1,0,0,0,591,
        589,1,0,0,0,592,578,1,0,0,0,592,593,1,0,0,0,593,595,1,0,0,0,594,
        596,5,93,0,0,595,594,1,0,0,0,595,596,1,0,0,0,596,597,1,0,0,0,597,
        598,5,115,0,0,598,599,5,113,0,0,599,87,1,0,0,0,600,610,3,92,46,0,
        601,602,5,91,0,0,602,607,3,92,46,0,603,604,5,92,0,0,604,606,3,92,
        46,0,605,603,1,0,0,0,606,609,1,0,0,0,607,605,1,0,0,0,607,608,1,0,
        0,0,608,611,1,0,0,0,609,607,1,0,0,0,610,601,1,0,0,0,610,611,1,0,
        0,0,611,89,1,0,0,0,612,613,5,110,0,0,613,618,3,88,44,0,614,615,5,
        93,0,0,615,617,3,88,44,0,616,614,1,0,0,0,617,620,1,0,0,0,618,616,
        1,0,0,0,618,619,1,0,0,0,619,622,1,0,0,0,620,618,1,0,0,0,621,623,
        5,93,0,0,622,621,1,0,0,0,622,623,1,0,0,0,623,624,1,0,0,0,624,625,
        5,117,0,0,625,626,5,113,0,0,626,637,1,0,0,0,627,628,5,110,0,0,628,
        629,5,91,0,0,629,630,3,92,46,0,630,631,5,117,0,0,631,632,5,113,0,
        0,632,637,1,0,0,0,633,634,5,110,0,0,634,635,5,117,0,0,635,637,5,
        113,0,0,636,612,1,0,0,0,636,627,1,0,0,0,636,633,1,0,0,0,637,91,1,
        0,0,0,638,639,3,98,49,0,639,93,1,0,0,0,640,650,3,108,54,0,641,646,
        3,98,49,0,642,643,5,93,0,0,643,645,3,98,49,0,644,642,1,0,0,0,645,
        648,1,0,0,0,646,644,1,0,0,0,646,647,1,0,0,0,647,650,1,0,0,0,648,
        646,1,0,0,0,649,640,1,0,0,0,649,641,1,0,0,0,650,95,1,0,0,0,651,652,
        7,13,0,0,652,97,1,0,0,0,653,654,4,49,8,1,654,656,7,14,0,0,655,653,
        1,0,0,0,655,656,1,0,0,0,656,661,1,0,0,0,657,662,3,116,58,0,658,662,
        3,100,50,0,659,662,3,114,57,0,660,662,3,108,54,0,661,657,1,0,0,0,
        661,658,1,0,0,0,661,659,1,0,0,0,661,660,1,0,0,0,662,705,1,0,0,0,
        663,664,4,49,9,1,664,665,7,15,0,0,665,704,3,98,49,0,666,667,4,49,
        10,1,667,668,7,16,0,0,668,704,3,98,49,0,669,670,4,49,11,1,670,671,
        7,17,0,0,671,704,3,98,49,0,672,673,4,49,12,1,673,674,7,18,0,0,674,
        704,3,98,49,0,675,676,4,49,13,1,676,677,7,19,0,0,677,704,3,98,49,
        0,678,679,4,49,14,1,679,680,5,82,0,0,680,704,3,98,49,0,681,682,4,
        49,15,1,682,683,5,84,0,0,683,704,3,98,49,0,684,685,4,49,16,1,685,
        686,5,83,0,0,686,704,3,98,49,0,687,688,4,49,17,1,688,689,5,88,0,
        0,689,704,3,98,49,0,690,691,4,49,18,1,691,692,5,89,0,0,692,704,3,
        98,49,0,693,694,4,49,19,1,694,695,5,90,0,0,695,696,3,98,49,0,696,
        697,5,91,0,0,697,698,3,98,49,0,698,704,1,0,0,0,699,700,4,49,20,1,
        700,701,3,96,48,0,701,702,3,98,49,0,702,704,1,0,0,0,703,663,1,0,
        0,0,703,666,1,0,0,0,703,669,1,0,0,0,703,672,1,0,0,0,703,675,1,0,
        0,0,703,678,1,0,0,0,703,681,1,0,0,0,703,684,1,0,0,0,703,687,1,0,
        0,0,703,690,1,0,0,0,703,693,1,0,0,0,703,699,1,0,0,0,704,707,1,0,
        0,0,705,703,1,0,0,0,705,706,1,0,0,0,706,99,1,0,0,0,707,705,1,0,0,
        0,708,710,3,38,19,0,709,708,1,0,0,0,709,710,1,0,0,0,710,711,1,0,
        0,0,711,715,3,102,51,0,712,714,3,110,55,0,713,712,1,0,0,0,714,717,
        1,0,0,0,715,713,1,0,0,0,715,716,1,0,0,0,716,739,1,0,0,0,717,715,
        1,0,0,0,718,730,3,78,39,0,719,730,5,72,0,0,720,730,5,73,0,0,721,
        723,5,111,0,0,722,724,3,158,79,0,723,722,1,0,0,0,723,724,1,0,0,0,
        724,725,1,0,0,0,725,730,3,78,39,0,726,727,7,20,0,0,727,730,5,129,
        0,0,728,730,5,129,0,0,729,718,1,0,0,0,729,719,1,0,0,0,729,720,1,
        0,0,0,729,721,1,0,0,0,729,726,1,0,0,0,729,728,1,0,0,0,730,734,1,
        0,0,0,731,733,3,110,55,0,732,731,1,0,0,0,733,736,1,0,0,0,734,732,
        1,0,0,0,734,735,1,0,0,0,735,738,1,0,0,0,736,734,1,0,0,0,737,729,
        1,0,0,0,738,741,1,0,0,0,739,737,1,0,0,0,739,740,1,0,0,0,740,101,
        1,0,0,0,741,739,1,0,0,0,742,793,3,160,80,0,743,747,5,124,0,0,744,
        746,5,124,0,0,745,744,1,0,0,0,746,749,1,0,0,0,747,745,1,0,0,0,747,
        748,1,0,0,0,748,793,1,0,0,0,749,747,1,0,0,0,750,793,3,104,52,0,751,
        752,4,51,21,0,752,753,5,112,0,0,753,754,5,7,0,0,754,759,5,129,0,
        0,755,756,5,93,0,0,756,758,3,58,29,0,757,755,1,0,0,0,758,761,1,0,
        0,0,759,757,1,0,0,0,759,760,1,0,0,0,760,762,1,0,0,0,761,759,1,0,
        0,0,762,781,5,113,0,0,763,764,4,51,22,0,764,765,5,112,0,0,765,774,
        5,128,0,0,766,771,3,58,29,0,767,768,5,93,0,0,768,770,3,58,29,0,769,
        767,1,0,0,0,770,773,1,0,0,0,771,769,1,0,0,0,771,772,1,0,0,0,772,
        775,1,0,0,0,773,771,1,0,0,0,774,766,1,0,0,0,774,775,1,0,0,0,775,
        777,1,0,0,0,776,778,5,93,0,0,777,776,1,0,0,0,777,778,1,0,0,0,778,
        779,1,0,0,0,779,781,5,113,0,0,780,751,1,0,0,0,780,763,1,0,0,0,781,
        793,1,0,0,0,782,785,5,112,0,0,783,786,3,94,47,0,784,786,3,68,34,
        0,785,783,1,0,0,0,785,784,1,0,0,0,786,787,1,0,0,0,787,788,5,113,
        0,0,788,793,1,0,0,0,789,793,3,86,43,0,790,793,3,90,45,0,791,793,
        3,106,53,0,792,742,1,0,0,0,792,743,1,0,0,0,792,750,1,0,0,0,792,780,
        1,0,0,0,792,782,1,0,0,0,792,789,1,0,0,0,792,790,1,0,0,0,792,791,
        1,0,0,0,793,103,1,0,0,0,794,795,7,21,0,0,795,105,1,0,0,0,796,797,
        5,5,0,0,797,798,5,112,0,0,798,803,3,92,46,0,799,800,5,93,0,0,800,
        802,3,92,46,0,801,799,1,0,0,0,802,805,1,0,0,0,803,801,1,0,0,0,803,
        804,1,0,0,0,804,810,1,0,0,0,805,803,1,0,0,0,806,807,5,92,0,0,807,
        809,5,129,0,0,808,806,1,0,0,0,809,812,1,0,0,0,810,808,1,0,0,0,810,
        811,1,0,0,0,811,813,1,0,0,0,812,810,1,0,0,0,813,814,5,113,0,0,814,
        818,1,0,0,0,815,816,5,5,0,0,816,818,3,120,60,0,817,796,1,0,0,0,817,
        815,1,0,0,0,818,107,1,0,0,0,819,820,4,54,23,0,820,821,5,112,0,0,
        821,822,5,91,0,0,822,827,3,92,46,0,823,824,5,93,0,0,824,826,3,92,
        46,0,825,823,1,0,0,0,826,829,1,0,0,0,827,825,1,0,0,0,827,828,1,0,
        0,0,828,830,1,0,0,0,829,827,1,0,0,0,830,831,5,91,0,0,831,832,5,113,
        0,0,832,857,1,0,0,0,833,834,5,112,0,0,834,842,5,91,0,0,835,843,3,
        92,46,0,836,838,3,118,59,0,837,836,1,0,0,0,838,841,1,0,0,0,839,837,
        1,0,0,0,839,840,1,0,0,0,840,843,1,0,0,0,841,839,1,0,0,0,842,835,
        1,0,0,0,842,839,1,0,0,0,843,844,1,0,0,0,844,845,5,91,0,0,845,857,
        5,113,0,0,846,848,5,23,0,0,847,849,3,82,41,0,848,847,1,0,0,0,848,
        849,1,0,0,0,849,850,1,0,0,0,850,852,5,112,0,0,851,853,3,52,26,0,
        852,851,1,0,0,0,852,853,1,0,0,0,853,854,1,0,0,0,854,855,5,113,0,
        0,855,857,3,120,60,0,856,819,1,0,0,0,856,833,1,0,0,0,856,846,1,0,
        0,0,857,109,1,0,0,0,858,860,5,116,0,0,859,861,5,76,0,0,860,859,1,
        0,0,0,860,861,1,0,0,0,861,862,1,0,0,0,862,865,3,92,46,0,863,864,
        5,93,0,0,864,866,3,92,46,0,865,863,1,0,0,0,865,866,1,0,0,0,866,867,
        1,0,0,0,867,868,5,117,0,0,868,885,1,0,0,0,869,871,5,116,0,0,870,
        872,5,76,0,0,871,870,1,0,0,0,871,872,1,0,0,0,872,874,1,0,0,0,873,
        875,3,92,46,0,874,873,1,0,0,0,874,875,1,0,0,0,875,876,1,0,0,0,876,
        878,5,95,0,0,877,879,5,76,0,0,878,877,1,0,0,0,878,879,1,0,0,0,879,
        881,1,0,0,0,880,882,3,92,46,0,881,880,1,0,0,0,881,882,1,0,0,0,882,
        883,1,0,0,0,883,885,5,117,0,0,884,858,1,0,0,0,884,869,1,0,0,0,885,
        111,1,0,0,0,886,887,5,116,0,0,887,889,5,76,0,0,888,890,5,95,0,0,
        889,888,1,0,0,0,889,890,1,0,0,0,890,892,1,0,0,0,891,893,5,76,0,0,
        892,891,1,0,0,0,892,893,1,0,0,0,893,900,1,0,0,0,894,895,5,116,0,
        0,895,897,5,95,0,0,896,898,5,76,0,0,897,896,1,0,0,0,897,898,1,0,
        0,0,898,900,1,0,0,0,899,886,1,0,0,0,899,894,1,0,0,0,900,113,1,0,
        0,0,901,903,5,24,0,0,902,901,1,0,0,0,902,903,1,0,0,0,903,904,1,0,
        0,0,904,921,5,126,0,0,905,906,5,24,0,0,906,918,5,127,0,0,907,919,
        7,22,0,0,908,919,3,110,55,0,909,919,3,112,56,0,910,914,7,23,0,0,
        911,912,5,90,0,0,912,914,5,86,0,0,913,910,1,0,0,0,913,911,1,0,0,
        0,914,919,1,0,0,0,915,916,5,112,0,0,916,919,7,24,0,0,917,919,3,92,
        46,0,918,907,1,0,0,0,918,908,1,0,0,0,918,909,1,0,0,0,918,913,1,0,
        0,0,918,915,1,0,0,0,918,917,1,0,0,0,919,921,1,0,0,0,920,902,1,0,
        0,0,920,905,1,0,0,0,921,115,1,0,0,0,922,923,5,112,0,0,923,924,3,
        82,41,0,924,925,5,113,0,0,925,926,3,98,49,0,926,949,1,0,0,0,927,
        928,5,112,0,0,928,929,5,114,0,0,929,930,3,82,41,0,930,931,5,115,
        0,0,931,932,5,113,0,0,932,933,3,98,49,0,933,949,1,0,0,0,934,935,
        5,112,0,0,935,936,5,76,0,0,936,937,5,129,0,0,937,938,5,77,0,0,938,
        943,3,98,49,0,939,940,5,93,0,0,940,942,3,98,49,0,941,939,1,0,0,0,
        942,945,1,0,0,0,943,941,1,0,0,0,943,944,1,0,0,0,944,946,1,0,0,0,
        945,943,1,0,0,0,946,947,5,113,0,0,947,949,1,0,0,0,948,922,1,0,0,
        0,948,927,1,0,0,0,948,934,1,0,0,0,949,117,1,0,0,0,950,961,3,120,
        60,0,951,961,5,92,0,0,952,961,3,122,61,0,953,961,3,144,72,0,954,
        961,3,156,78,0,955,961,3,66,33,0,956,957,3,94,47,0,957,958,5,92,
        0,0,958,961,1,0,0,0,959,961,3,2,1,0,960,950,1,0,0,0,960,951,1,0,
        0,0,960,952,1,0,0,0,960,953,1,0,0,0,960,954,1,0,0,0,960,955,1,0,
        0,0,960,956,1,0,0,0,960,959,1,0,0,0,961,119,1,0,0,0,962,966,5,114,
        0,0,963,965,3,118,59,0,964,963,1,0,0,0,965,968,1,0,0,0,966,964,1,
        0,0,0,966,967,1,0,0,0,967,969,1,0,0,0,968,966,1,0,0,0,969,970,5,
        115,0,0,970,121,1,0,0,0,971,974,3,130,65,0,972,974,3,132,66,0,973,
        971,1,0,0,0,973,972,1,0,0,0,974,123,1,0,0,0,975,976,5,15,0,0,976,
        977,5,25,0,0,977,978,5,112,0,0,978,979,3,92,46,0,979,980,5,113,0,
        0,980,981,3,118,59,0,981,125,1,0,0,0,982,983,5,15,0,0,983,984,3,
        118,59,0,984,127,1,0,0,0,985,986,5,25,0,0,986,987,5,112,0,0,987,
        988,3,92,46,0,988,989,5,113,0,0,989,990,3,118,59,0,990,129,1,0,0,
        0,991,995,3,128,64,0,992,994,3,124,62,0,993,992,1,0,0,0,994,997,
        1,0,0,0,995,993,1,0,0,0,995,996,1,0,0,0,996,999,1,0,0,0,997,995,
        1,0,0,0,998,1000,3,126,63,0,999,998,1,0,0,0,999,1000,1,0,0,0,1000,
        131,1,0,0,0,1001,1002,5,47,0,0,1002,1003,5,112,0,0,1003,1004,3,92,
        46,0,1004,1005,5,113,0,0,1005,1009,5,114,0,0,1006,1008,3,66,33,0,
        1007,1006,1,0,0,0,1008,1011,1,0,0,0,1009,1007,1,0,0,0,1009,1010,
        1,0,0,0,1010,1016,1,0,0,0,1011,1009,1,0,0,0,1012,1015,3,140,70,0,
        1013,1015,3,142,71,0,1014,1012,1,0,0,0,1014,1013,1,0,0,0,1015,1018,
        1,0,0,0,1016,1014,1,0,0,0,1016,1017,1,0,0,0,1017,1019,1,0,0,0,1018,
        1016,1,0,0,0,1019,1020,5,115,0,0,1020,133,1,0,0,0,1021,1027,3,138,
        69,0,1022,1023,3,136,68,0,1023,1024,3,138,69,0,1024,1026,1,0,0,0,
        1025,1022,1,0,0,0,1026,1029,1,0,0,0,1027,1025,1,0,0,0,1027,1028,
        1,0,0,0,1028,1040,1,0,0,0,1029,1027,1,0,0,0,1030,1031,5,95,0,0,1031,
        1037,3,138,69,0,1032,1033,3,136,68,0,1033,1034,3,138,69,0,1034,1036,
        1,0,0,0,1035,1032,1,0,0,0,1036,1039,1,0,0,0,1037,1035,1,0,0,0,1037,
        1038,1,0,0,0,1038,1041,1,0,0,0,1039,1037,1,0,0,0,1040,1030,1,0,0,
        0,1040,1041,1,0,0,0,1041,1070,1,0,0,0,1042,1067,4,67,24,0,1043,1044,
        5,95,0,0,1044,1050,3,138,69,0,1045,1046,3,136,68,0,1046,1047,3,138,
        69,0,1047,1049,1,0,0,0,1048,1045,1,0,0,0,1049,1052,1,0,0,0,1050,
        1048,1,0,0,0,1050,1051,1,0,0,0,1051,1068,1,0,0,0,1052,1050,1,0,0,
        0,1053,1055,5,68,0,0,1054,1053,1,0,0,0,1054,1055,1,0,0,0,1055,1056,
        1,0,0,0,1056,1062,3,138,69,0,1057,1058,3,136,68,0,1058,1059,3,138,
        69,0,1059,1061,1,0,0,0,1060,1057,1,0,0,0,1061,1064,1,0,0,0,1062,
        1060,1,0,0,0,1062,1063,1,0,0,0,1063,1065,1,0,0,0,1064,1062,1,0,0,
        0,1065,1066,5,95,0,0,1066,1068,1,0,0,0,1067,1043,1,0,0,0,1067,1054,
        1,0,0,0,1068,1070,1,0,0,0,1069,1021,1,0,0,0,1069,1042,1,0,0,0,1070,
        135,1,0,0,0,1071,1072,7,25,0,0,1072,137,1,0,0,0,1073,1075,5,68,0,
        0,1074,1073,1,0,0,0,1074,1075,1,0,0,0,1075,1076,1,0,0,0,1076,1082,
        7,26,0,0,1077,1078,5,112,0,0,1078,1079,3,98,49,0,1079,1080,5,113,
        0,0,1080,1082,1,0,0,0,1081,1074,1,0,0,0,1081,1077,1,0,0,0,1082,139,
        1,0,0,0,1083,1084,5,4,0,0,1084,1085,3,134,67,0,1085,1089,5,91,0,
        0,1086,1088,3,118,59,0,1087,1086,1,0,0,0,1088,1091,1,0,0,0,1089,
        1087,1,0,0,0,1089,1090,1,0,0,0,1090,141,1,0,0,0,1091,1089,1,0,0,
        0,1092,1093,5,12,0,0,1093,1097,5,91,0,0,1094,1096,3,118,59,0,1095,
        1094,1,0,0,0,1096,1099,1,0,0,0,1097,1095,1,0,0,0,1097,1098,1,0,0,
        0,1098,143,1,0,0,0,1099,1097,1,0,0,0,1100,1101,5,54,0,0,1101,1102,
        5,112,0,0,1102,1103,3,92,46,0,1103,1106,5,113,0,0,1104,1107,3,118,
        59,0,1105,1107,5,92,0,0,1106,1104,1,0,0,0,1106,1105,1,0,0,0,1107,
        1133,1,0,0,0,1108,1109,5,13,0,0,1109,1110,3,118,59,0,1110,1111,5,
        54,0,0,1111,1112,5,112,0,0,1112,1113,3,92,46,0,1113,1114,5,113,0,
        0,1114,1115,5,92,0,0,1115,1133,1,0,0,0,1116,1117,5,20,0,0,1117,1118,
        5,112,0,0,1118,1119,3,146,73,0,1119,1122,5,113,0,0,1120,1123,3,118,
        59,0,1121,1123,5,92,0,0,1122,1120,1,0,0,0,1122,1121,1,0,0,0,1123,
        1133,1,0,0,0,1124,1125,5,21,0,0,1125,1126,5,112,0,0,1126,1127,3,
        148,74,0,1127,1130,5,113,0,0,1128,1131,3,118,59,0,1129,1131,5,92,
        0,0,1130,1128,1,0,0,0,1130,1129,1,0,0,0,1131,1133,1,0,0,0,1132,1100,
        1,0,0,0,1132,1108,1,0,0,0,1132,1116,1,0,0,0,1132,1124,1,0,0,0,1133,
        145,1,0,0,0,1134,1139,3,150,75,0,1135,1136,5,93,0,0,1136,1138,3,
        150,75,0,1137,1135,1,0,0,0,1138,1141,1,0,0,0,1139,1137,1,0,0,0,1139,
        1140,1,0,0,0,1140,1143,1,0,0,0,1141,1139,1,0,0,0,1142,1134,1,0,0,
        0,1142,1143,1,0,0,0,1143,1144,1,0,0,0,1144,1146,5,92,0,0,1145,1147,
        3,92,46,0,1146,1145,1,0,0,0,1146,1147,1,0,0,0,1147,1148,1,0,0,0,
        1148,1150,5,92,0,0,1149,1151,3,92,46,0,1150,1149,1,0,0,0,1150,1151,
        1,0,0,0,1151,1156,1,0,0,0,1152,1153,5,93,0,0,1153,1155,3,92,46,0,
        1154,1152,1,0,0,0,1155,1158,1,0,0,0,1156,1154,1,0,0,0,1156,1157,
        1,0,0,0,1157,147,1,0,0,0,1158,1156,1,0,0,0,1159,1164,3,152,76,0,
        1160,1161,5,93,0,0,1161,1163,3,152,76,0,1162,1160,1,0,0,0,1163,1166,
        1,0,0,0,1164,1162,1,0,0,0,1164,1165,1,0,0,0,1165,1167,1,0,0,0,1166,
        1164,1,0,0,0,1167,1168,7,27,0,0,1168,1171,3,92,46,0,1169,1170,5,
        95,0,0,1170,1172,3,92,46,0,1171,1169,1,0,0,0,1171,1172,1,0,0,0,1172,
        149,1,0,0,0,1173,1175,3,76,38,0,1174,1173,1,0,0,0,1174,1175,1,0,
        0,0,1175,1176,1,0,0,0,1176,1181,3,72,36,0,1177,1178,5,97,0,0,1178,
        1182,3,74,37,0,1179,1182,5,72,0,0,1180,1182,5,73,0,0,1181,1177,1,
        0,0,0,1181,1179,1,0,0,0,1181,1180,1,0,0,0,1181,1182,1,0,0,0,1182,
        1185,1,0,0,0,1183,1185,3,92,46,0,1184,1174,1,0,0,0,1184,1183,1,0,
        0,0,1185,151,1,0,0,0,1186,1188,3,82,41,0,1187,1186,1,0,0,0,1187,
        1188,1,0,0,0,1188,1189,1,0,0,0,1189,1190,3,72,36,0,1190,153,1,0,
        0,0,1191,1193,5,40,0,0,1192,1194,3,94,47,0,1193,1192,1,0,0,0,1193,
        1194,1,0,0,0,1194,1195,1,0,0,0,1195,1196,5,92,0,0,1196,155,1,0,0,
        0,1197,1198,5,1,0,0,1198,1203,5,92,0,0,1199,1200,5,10,0,0,1200,1203,
        5,92,0,0,1201,1203,3,154,77,0,1202,1197,1,0,0,0,1202,1199,1,0,0,
        0,1202,1201,1,0,0,0,1203,157,1,0,0,0,1204,1211,3,104,52,0,1205,1206,
        5,112,0,0,1206,1207,3,92,46,0,1207,1208,5,113,0,0,1208,1211,1,0,
        0,0,1209,1211,5,124,0,0,1210,1204,1,0,0,0,1210,1205,1,0,0,0,1210,
        1209,1,0,0,0,1211,159,1,0,0,0,1212,1213,7,28,0,0,1213,161,1,0,0,
        0,1214,1216,7,29,0,0,1215,1214,1,0,0,0,1215,1216,1,0,0,0,1216,1217,
        1,0,0,0,1217,1219,3,92,46,0,1218,1220,5,94,0,0,1219,1218,1,0,0,0,
        1219,1220,1,0,0,0,1220,163,1,0,0,0,1221,1228,3,162,81,0,1222,1224,
        5,93,0,0,1223,1225,3,162,81,0,1224,1223,1,0,0,0,1224,1225,1,0,0,
        0,1225,1227,1,0,0,0,1226,1222,1,0,0,0,1227,1230,1,0,0,0,1228,1226,
        1,0,0,0,1228,1229,1,0,0,0,1229,1243,1,0,0,0,1230,1228,1,0,0,0,1231,
        1232,4,82,25,0,1232,1239,3,80,40,0,1233,1234,5,93,0,0,1234,1235,
        5,129,0,0,1235,1236,5,91,0,0,1236,1238,3,92,46,0,1237,1233,1,0,0,
        0,1238,1241,1,0,0,0,1239,1237,1,0,0,0,1239,1240,1,0,0,0,1240,1243,
        1,0,0,0,1241,1239,1,0,0,0,1242,1221,1,0,0,0,1242,1231,1,0,0,0,1243,
        165,1,0,0,0,168,171,173,191,194,201,209,218,226,235,239,246,251,
        257,264,270,279,283,288,295,297,302,306,309,316,323,327,341,345,
        350,354,360,369,376,380,385,401,404,408,411,420,424,428,431,434,
        437,440,443,446,454,463,471,478,484,489,497,501,504,511,517,522,
        530,536,551,554,559,565,567,573,580,585,589,592,595,607,610,618,
        622,636,646,649,655,661,703,705,709,715,723,729,734,739,747,759,
        771,774,777,780,785,792,803,810,817,827,839,842,848,852,856,860,
        865,871,874,878,881,884,889,892,897,899,902,913,918,920,943,948,
        960,966,973,995,999,1009,1014,1016,1027,1037,1040,1050,1054,1062,
        1067,1069,1074,1081,1089,1097,1106,1122,1130,1132,1139,1142,1146,
        1150,1156,1164,1171,1174,1181,1184,1187,1193,1202,1210,1215,1219,
        1224,1228,1239,1242
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
    public globalModifierStatement(): GlobalModifierStatementContext[];
    public globalModifierStatement(i: number): GlobalModifierStatementContext | null;
    public globalModifierStatement(i?: number): GlobalModifierStatementContext[] | GlobalModifierStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(GlobalModifierStatementContext);
        }

        return this.getRuleContext(i, GlobalModifierStatementContext);
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
    public SEMI(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SEMI, 0);
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
    public PRIVATE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PRIVATE, 0);
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


export class DirectiveIncludeFileContext extends antlr.ParserRuleContext {
    public _globalFile?: Token | null;
    public _localFile?: Token | null;
    public _defineFile?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BracketedIdentifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.BracketedIdentifier, 0);
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
    public PRIVATE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PRIVATE, 0);
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
    public _validIdFilename?: ValidIdentifiersContext;
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
    public OBJECT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.OBJECT, 0);
    }
    public validIdentifiers(): ValidIdentifiersContext | null {
        return this.getRuleContext(0, ValidIdentifiersContext);
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


export class GlobalModifierStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(LPCParser.COLON, 0)!;
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
    public override get ruleIndex(): number {
        return LPCParser.RULE_globalModifierStatement;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterGlobalModifierStatement) {
             listener.enterGlobalModifierStatement(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitGlobalModifierStatement) {
             listener.exitGlobalModifierStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitGlobalModifierStatement) {
            return visitor.visitGlobalModifierStatement(this);
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
    public _functionName?: ValidIdentifiersContext;
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
    public validIdentifiers(): ValidIdentifiersContext {
        return this.getRuleContext(0, ValidIdentifiersContext)!;
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
    public _isHeader: boolean;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number, _isHeader: boolean) {
        super(parent, invokingState);
        this._isHeader = _isHeader;
    }
    public VOID(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.VOID, 0);
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
    public _isHeader: boolean;
    public _paramType?: UnionableTypeSpecifierContext;
    public _paramName?: ValidIdentifiersContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number, _isHeader: boolean) {
        super(parent, invokingState);
        this._isHeader = _isHeader;
    }
    public validIdentifiers(): ValidIdentifiersContext | null {
        return this.getRuleContext(0, ValidIdentifiersContext);
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
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.COLON, 0);
    }
    public inlineClosureExpression(): InlineClosureExpressionContext | null {
        return this.getRuleContext(0, InlineClosureExpressionContext);
    }
    public TRIPPLEDOT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.TRIPPLEDOT, 0);
    }
    public unionableTypeSpecifier(): UnionableTypeSpecifierContext | null {
        return this.getRuleContext(0, UnionableTypeSpecifierContext);
    }
    public AND(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.AND, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_parameter;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterParameter) {
             listener.enterParameter(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitParameter) {
             listener.exitParameter(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitParameter) {
            return visitor.visitParameter(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StructMemberDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unionableTypeSpecifier(): UnionableTypeSpecifierContext {
        return this.getRuleContext(0, UnionableTypeSpecifierContext)!;
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
    public SEMI(): antlr.TerminalNode {
        return this.getToken(LPCParser.SEMI, 0)!;
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


export class StructModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PRIVATE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PRIVATE, 0)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_structModifier;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterStructModifier) {
             listener.enterStructModifier(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitStructModifier) {
             listener.exitStructModifier(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitStructModifier) {
            return visitor.visitStructModifier(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StructDeclarationContext extends antlr.ParserRuleContext {
    public _structName?: Token | null;
    public _structInherits?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CURLY_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.CURLY_OPEN, 0)!;
    }
    public CURLY_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.CURLY_CLOSE, 0)!;
    }
    public STRUCT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.STRUCT, 0);
    }
    public CLASS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.CLASS, 0);
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
    public structModifier(): StructModifierContext | null {
        return this.getRuleContext(0, StructModifierContext);
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
    public SEMI(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SEMI, 0);
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
    public _type_?: UnionableTypeSpecifierContext;
    public _objectName?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
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
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.COMMA);
    	} else {
    		return this.getToken(LPCParser.COMMA, i);
    	}
    }
    public unionableTypeSpecifier(): UnionableTypeSpecifierContext | null {
        return this.getRuleContext(0, UnionableTypeSpecifierContext);
    }
    public StringLiteral(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.StringLiteral, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_variableDeclaration;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterVariableDeclaration) {
             listener.enterVariableDeclaration(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitVariableDeclaration) {
             listener.exitVariableDeclaration(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitVariableDeclaration) {
            return visitor.visitVariableDeclaration(this);
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
    public STAR(): antlr.TerminalNode[];
    public STAR(i: number): antlr.TerminalNode | null;
    public STAR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.STAR);
    	} else {
    		return this.getToken(LPCParser.STAR, i);
    	}
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
    public arrayExpression(): ArrayExpressionContext | null {
        return this.getRuleContext(0, ArrayExpressionContext);
    }
    public mappingExpression(): MappingExpressionContext | null {
        return this.getRuleContext(0, MappingExpressionContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
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
    public BUFFER(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.BUFFER, 0);
    }
    public CHAR(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.CHAR, 0);
    }
    public COROUTINE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.COROUTINE, 0);
    }
    public INT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.INT, 0);
    }
    public FLOAT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.FLOAT, 0);
    }
    public FUNCTION(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.FUNCTION, 0);
    }
    public LPCTYPE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.LPCTYPE, 0);
    }
    public QUOTEDARRAY(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.QUOTEDARRAY, 0);
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
    public UNKNOWN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.UNKNOWN, 0);
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
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
    }
    public STRUCT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.STRUCT, 0);
    }
    public CLASS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.CLASS, 0);
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
    public primitiveTypeSpecifier(): PrimitiveTypeSpecifierContext | null {
        return this.getRuleContext(0, PrimitiveTypeSpecifierContext);
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
    public REF(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.REF, 0);
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
    public TRIPPLEDOT(): antlr.TerminalNode[];
    public TRIPPLEDOT(i: number): antlr.TerminalNode | null;
    public TRIPPLEDOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.TRIPPLEDOT);
    	} else {
    		return this.getToken(LPCParser.TRIPPLEDOT, i);
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
    public conditionalExpression(): ConditionalExpressionContext {
        return this.getRuleContext(0, ConditionalExpressionContext)!;
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
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public inlineClosureExpression(): InlineClosureExpressionContext | null {
        return this.getRuleContext(0, InlineClosureExpressionContext);
    }
    public conditionalExpression(): ConditionalExpressionContext[];
    public conditionalExpression(i: number): ConditionalExpressionContext | null;
    public conditionalExpression(i?: number): ConditionalExpressionContext[] | ConditionalExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConditionalExpressionContext);
        }

        return this.getRuleContext(i, ConditionalExpressionContext);
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


export class ConditionalExpressionContext extends antlr.ParserRuleContext {
    public _p: int;
    public _op?: Token | null;
    public _cond?: Token | null;
    public _ternOp?: Token | null;
    public _ternOp2?: Token | null;
    public _assignOp?: AssignmentOperatorContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number, _p: int) {
        super(parent, invokingState);
        this._p = _p;
    }
    public conditionalExpression(): ConditionalExpressionContext[];
    public conditionalExpression(i: number): ConditionalExpressionContext | null;
    public conditionalExpression(i?: number): ConditionalExpressionContext[] | ConditionalExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConditionalExpressionContext);
        }

        return this.getRuleContext(i, ConditionalExpressionContext);
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
    public AND(): antlr.TerminalNode[];
    public AND(i: number): antlr.TerminalNode | null;
    public AND(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.AND);
    	} else {
    		return this.getToken(LPCParser.AND, i);
    	}
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
    public OR(): antlr.TerminalNode[];
    public OR(i: number): antlr.TerminalNode | null;
    public OR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.OR);
    	} else {
    		return this.getToken(LPCParser.OR, i);
    	}
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
    public QUESTION(): antlr.TerminalNode[];
    public QUESTION(i: number): antlr.TerminalNode | null;
    public QUESTION(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.QUESTION);
    	} else {
    		return this.getToken(LPCParser.QUESTION, i);
    	}
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
    public assignmentOperator(): AssignmentOperatorContext[];
    public assignmentOperator(i: number): AssignmentOperatorContext | null;
    public assignmentOperator(i?: number): AssignmentOperatorContext[] | AssignmentOperatorContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AssignmentOperatorContext);
        }

        return this.getRuleContext(i, AssignmentOperatorContext);
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
    public DOUBLEBANG(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DOUBLEBANG, 0);
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
    public override get ruleIndex(): number {
        return LPCParser.RULE_conditionalExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterConditionalExpression) {
             listener.enterConditionalExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitConditionalExpression) {
             listener.exitConditionalExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitConditionalExpression) {
            return visitor.visitConditionalExpression(this);
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
    public PAREN_OPEN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PAREN_OPEN, 0);
    }
    public CLASS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.CLASS, 0);
    }
    public PAREN_CLOSE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PAREN_CLOSE, 0);
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
    }
    public BracketedIdentifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.BracketedIdentifier, 0);
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
    public structMemberInitializer(): StructMemberInitializerContext[];
    public structMemberInitializer(i: number): StructMemberInitializerContext | null;
    public structMemberInitializer(i?: number): StructMemberInitializerContext[] | StructMemberInitializerContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StructMemberInitializerContext);
        }

        return this.getRuleContext(i, StructMemberInitializerContext);
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
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
    }
    public commaableExpression(): CommaableExpressionContext | null {
        return this.getRuleContext(0, CommaableExpressionContext);
    }
    public variableDeclaration(): VariableDeclarationContext | null {
        return this.getRuleContext(0, VariableDeclarationContext);
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
    public BYTES(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.BYTES, 0);
    }
    public BUFFER(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.BUFFER, 0);
    }
    public FUNCTIONS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.FUNCTIONS, 0);
    }
    public VARIABLES(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.VARIABLES, 0);
    }
    public VISIBLE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.VISIBLE, 0);
    }
    public STRUCTS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.STRUCTS, 0);
    }
    public SYMBOL(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SYMBOL, 0);
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
    public PAREN_OPEN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PAREN_OPEN, 0);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public PAREN_CLOSE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PAREN_CLOSE, 0);
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
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
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
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LAMBDA_IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.LAMBDA_IDENTIFIER, 0);
    }
    public HASH(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.HASH, 0);
    }
    public SINGLEQUOT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SINGLEQUOT, 0);
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
    public conditionalExpression(): ConditionalExpressionContext {
        return this.getRuleContext(0, ConditionalExpressionContext)!;
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
    public conditionalExpression(): ConditionalExpressionContext {
        return this.getRuleContext(0, ConditionalExpressionContext)!;
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
    public conditionalExpression(): ConditionalExpressionContext[];
    public conditionalExpression(i: number): ConditionalExpressionContext | null;
    public conditionalExpression(i?: number): ConditionalExpressionContext[] | ConditionalExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConditionalExpressionContext);
        }

        return this.getRuleContext(i, ConditionalExpressionContext);
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
    public commaableExpression(): CommaableExpressionContext | null {
        return this.getRuleContext(0, CommaableExpressionContext);
    }
    public preprocessorDirective(): PreprocessorDirectiveContext | null {
        return this.getRuleContext(0, PreprocessorDirectiveContext);
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
    public variableDeclarationStatement(): VariableDeclarationStatementContext[];
    public variableDeclarationStatement(i: number): VariableDeclarationStatementContext | null;
    public variableDeclarationStatement(i?: number): VariableDeclarationStatementContext[] | VariableDeclarationStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VariableDeclarationStatementContext);
        }

        return this.getRuleContext(i, VariableDeclarationStatementContext);
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
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.MINUS, 0);
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
    public conditionalExpression(): ConditionalExpressionContext | null {
        return this.getRuleContext(0, ConditionalExpressionContext);
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
    public validIdentifiers(): ValidIdentifiersContext | null {
        return this.getRuleContext(0, ValidIdentifiersContext);
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
    public TRIPPLEDOT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.TRIPPLEDOT, 0);
    }
    public AND(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.AND, 0);
    }
    public REF(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.REF, 0);
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
    public structTypeSpecifier(): StructTypeSpecifierContext | null {
        return this.getRuleContext(0, StructTypeSpecifierContext);
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
    public COLON(): antlr.TerminalNode[];
    public COLON(i: number): antlr.TerminalNode | null;
    public COLON(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.COLON);
    	} else {
    		return this.getToken(LPCParser.COLON, i);
    	}
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
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

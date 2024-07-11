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
    public static readonly RULE_caseStatement = 68;
    public static readonly RULE_defaultStatement = 69;
    public static readonly RULE_iterationStatement = 70;
    public static readonly RULE_forRangeExpression = 71;
    public static readonly RULE_foreachRangeExpression = 72;
    public static readonly RULE_forVariable = 73;
    public static readonly RULE_forEachVariable = 74;
    public static readonly RULE_returnStatement = 75;
    public static readonly RULE_jumpStatement = 76;
    public static readonly RULE_callOtherTarget = 77;
    public static readonly RULE_literal = 78;
    public static readonly RULE_argument = 79;
    public static readonly RULE_argumentList = 80;

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
        "caseStatement", "defaultStatement", "iterationStatement", "forRangeExpression", 
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
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 169;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 167;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context) ) {
                    case 1:
                        {
                        this.state = 162;
                        this.declaration();
                        }
                        break;
                    case 2:
                        {
                        this.state = 163;
                        this.preprocessorDirective();
                        }
                        break;
                    case 3:
                        {
                        this.state = 164;
                        this.inheritStatement();
                        }
                        break;
                    case 4:
                        {
                        this.state = 165;
                        if (!( this.isFluff() )) {
                            throw this.createFailedPredicateException(" this.isFluff() ");
                        }
                        this.state = 166;
                        this.globalModifierStatement();
                        }
                        break;
                    }
                    }
                }
                this.state = 171;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            }
            this.state = 172;
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
            this.state = 190;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 174;
                this.selectionPreprocessorDirective();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 175;
                this.directiveTypeWithArguments();
                this.state = 176;
                this.directiveArgument();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 178;
                this.definePreprocessorDirective();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 179;
                this.includePreprocessorDirective();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 180;
                this.match(LPCParser.HASH);
                this.state = 181;
                this.directiveTypePragma();
                this.state = 182;
                this.match(LPCParser.Identifier);
                this.state = 187;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 183;
                        this.match(LPCParser.COMMA);
                        this.state = 184;
                        this.match(LPCParser.Identifier);
                        }
                        }
                    }
                    this.state = 189;
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
            this.state = 192;
            this.match(LPCParser.HASH);
            this.state = 193;
            this.directiveTypeInclude();
            this.state = 194;
            this.directiveIncludeFile();
            this.state = 197;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                {
                this.state = 195;
                if (!( this.isFluff() )) {
                    throw this.createFailedPredicateException(" this.isFluff() ");
                }
                this.state = 196;
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
            this.state = 199;
            this.match(LPCParser.DEFINE);
            this.state = 200;
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
            this.state = 214;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 202;
                this.match(LPCParser.HASH);
                this.state = 203;
                this.selectionPreprocessorDirectiveTypeWithArg();
                this.state = 205;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 86) {
                    {
                    this.state = 204;
                    this.match(LPCParser.NOT);
                    }
                }

                this.state = 207;
                this.directiveArgument();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 209;
                this.match(LPCParser.HASH);
                this.state = 210;
                _la = this.tokenStream.LA(1);
                if(!(_la === 16 || _la === 25)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 211;
                this.directiveIfTestExpression(0);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 212;
                this.match(LPCParser.HASH);
                this.state = 213;
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
            this.state = 216;
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
            this.state = 218;
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
            this.state = 222;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
            case 1:
                {
                this.state = 221;
                this.match(LPCParser.NOT);
                }
                break;
            }
            this.state = 224;
            this.directiveIfArgument();
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 235;
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
                    this.state = 226;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 229;
                    this.errorHandler.sync(this);
                    alternative = 1;
                    do {
                        switch (alternative) {
                        case 1:
                            {
                            {
                            this.state = 227;
                            _la = this.tokenStream.LA(1);
                            if(!(((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 12351) !== 0))) {
                            this.errorHandler.recoverInline(this);
                            }
                            else {
                                this.errorHandler.reportMatch(this);
                                this.consume();
                            }
                            this.state = 228;
                            this.directiveIfTestExpression(0);
                            }
                            }
                            break;
                        default:
                            throw new antlr.NoViableAltException(this);
                        }
                        this.state = 231;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 8, this.context);
                    } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                    }
                    }
                }
                this.state = 237;
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
            this.state = 247;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 11, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 238;
                this.match(LPCParser.Identifier);
                this.state = 242;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
                case 1:
                    {
                    this.state = 239;
                    this.match(LPCParser.PAREN_OPEN);
                    this.state = 240;
                    _la = this.tokenStream.LA(1);
                    if(!(((((_la - 119)) & ~0x1F) === 0 && ((1 << (_la - 119)) & 1057) !== 0))) {
                    this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 241;
                    this.match(LPCParser.PAREN_CLOSE);
                    }
                    break;
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 244;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 245;
                this.match(LPCParser.IntegerConstant);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 246;
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
            this.state = 253;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.HASH:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 249;
                this.match(LPCParser.HASH);
                this.state = 250;
                this.match(LPCParser.UNDEF);
                }
                break;
            case LPCParser.ECHO:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 251;
                this.match(LPCParser.ECHO);
                }
                break;
            case LPCParser.LINE:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 252;
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
            this.state = 266;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 255;
                this.match(LPCParser.Identifier);
                this.state = 260;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 13, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 256;
                        this.match(LPCParser.MINUS);
                        this.state = 257;
                        this.match(LPCParser.Identifier);
                        }
                        }
                    }
                    this.state = 262;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 13, this.context);
                }
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 263;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case LPCParser.IntegerConstant:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 264;
                this.match(LPCParser.IntegerConstant);
                }
                break;
            case LPCParser.PRIVATE:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 265;
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
            this.state = 268;
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
            this.state = 279;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BracketedIdentifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 270;
                localContext._globalFile = this.match(LPCParser.BracketedIdentifier);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 271;
                localContext._localFile = this.match(LPCParser.StringLiteral);
                this.state = 275;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 15, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 272;
                        this.match(LPCParser.StringLiteral);
                        }
                        }
                    }
                    this.state = 277;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 15, this.context);
                }
                }
                break;
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 278;
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
            this.state = 281;
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
            this.state = 305;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 22, this.context) ) {
            case 1:
                {
                this.state = 284;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 57) {
                    {
                    this.state = 283;
                    this.match(LPCParser.PRIVATE);
                    }
                }

                this.state = 286;
                this.inherit();
                }
                break;
            case 2:
                {
                this.state = 293;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 12) {
                    {
                    this.state = 287;
                    this.match(LPCParser.DEFAULT);
                    this.state = 289;
                    this.errorHandler.sync(this);
                    alternative = 1;
                    do {
                        switch (alternative) {
                        case 1:
                            {
                            {
                            this.state = 288;
                            this.defaultModifier();
                            }
                            }
                            break;
                        default:
                            throw new antlr.NoViableAltException(this);
                        }
                        this.state = 291;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 18, this.context);
                    } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                    }
                }

                this.state = 298;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 1023) !== 0)) {
                    {
                    {
                    this.state = 295;
                    this.inheritModifier();
                    }
                    }
                    this.state = 300;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 302;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 51) {
                    {
                    this.state = 301;
                    this.match(LPCParser.VIRTUAL);
                    }
                }

                this.state = 304;
                this.inherit();
                }
                break;
            }
            this.state = 307;
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
            this.state = 323;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 25, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 310;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                do {
                    {
                    {
                    this.state = 309;
                    this.functionModifier();
                    }
                    }
                    this.state = 312;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                } while (((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 895) !== 0));
                this.state = 314;
                this.match(LPCParser.FUNCTIONS);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 317;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                do {
                    {
                    {
                    this.state = 316;
                    this.variableModifier();
                    }
                    }
                    this.state = 319;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                } while (((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 479) !== 0));
                this.state = 321;
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
            this.state = 325;
            this.match(LPCParser.INHERIT);
            this.state = 326;
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
            this.state = 328;
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
            this.state = 337;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.StringLiteral:
                {
                this.state = 331;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case LPCParser.Identifier:
                {
                this.state = 332;
                this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.PAREN_OPEN:
                {
                this.state = 333;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 334;
                this.inheritFile(0);
                this.state = 335;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 346;
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
                    this.state = 339;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 341;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 67) {
                        {
                        this.state = 340;
                        this.match(LPCParser.PLUS);
                        }
                    }

                    this.state = 343;
                    this.inheritFile(2);
                    }
                    }
                }
                this.state = 348;
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
            this.state = 356;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 30, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 350;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 124 || _la === 129) {
                    {
                    this.state = 349;
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

                this.state = 352;
                this.match(LPCParser.SUPER_ACCESSOR);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 353;
                localContext._validIdFilename = this.validIdentifiers();
                this.state = 354;
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
            this.state = 358;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 7) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 359;
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
            this.state = 365;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 31, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 361;
                this.functionHeaderDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 362;
                this.functionDeclaration();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 363;
                this.structDeclaration();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 364;
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
            this.state = 367;
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
            this.state = 372;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 369;
                    this.functionModifier();
                    }
                    }
                }
                this.state = 374;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
            }
            this.state = 376;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 33, this.context) ) {
            case 1:
                {
                this.state = 375;
                this.typeSpecifier();
                }
                break;
            }
            this.state = 378;
            localContext._functionName = this.validIdentifiers();
            this.state = 379;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 381;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 34, this.context) ) {
            case 1:
                {
                this.state = 380;
                localContext._functionArgs = this.parameterList(true);
                }
                break;
            }
            this.state = 383;
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
            this.state = 385;
            this.functionHeader();
            this.state = 386;
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
            this.state = 388;
            this.functionHeader();
            this.state = 389;
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
            this.state = 400;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 36, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 391;
                this.match(LPCParser.VOID);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 392;
                this.parameter(_isHeader);
                this.state = 397;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 93) {
                    {
                    {
                    this.state = 393;
                    this.match(LPCParser.COMMA);
                    this.state = 394;
                    this.parameter(_isHeader);
                    }
                    }
                    this.state = 399;
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
            this.state = 442;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 47, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 402;
                if (!(localContext?._isHeader!==false)) {
                    throw this.createFailedPredicateException("$_isHeader==false");
                }
                this.state = 404;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 65) {
                    {
                    this.state = 403;
                    this.match(LPCParser.VARARGS);
                    }
                }

                this.state = 407;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 38, this.context) ) {
                case 1:
                    {
                    this.state = 406;
                    localContext._paramType = this.unionableTypeSpecifier();
                    }
                    break;
                }
                this.state = 409;
                localContext._paramName = this.validIdentifiers();
                this.state = 416;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 39, this.context) ) {
                case 1:
                    {
                    this.state = 410;
                    this.match(LPCParser.ASSIGN);
                    this.state = 411;
                    this.expression();
                    }
                    break;
                case 2:
                    {
                    this.state = 412;
                    if (!( this.isFluff() )) {
                        throw this.createFailedPredicateException(" this.isFluff() ");
                    }
                    this.state = 413;
                    this.match(LPCParser.COLON);
                    this.state = 414;
                    this.inlineClosureExpression();
                    }
                    break;
                case 3:
                    {
                    this.state = 415;
                    this.match(LPCParser.TRIPPLEDOT);
                    }
                    break;
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 418;
                if (!(localContext?._isHeader! && this.isFluff())) {
                    throw this.createFailedPredicateException("$_isHeader && this.isFluff()");
                }
                this.state = 420;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 65) {
                    {
                    this.state = 419;
                    this.match(LPCParser.VARARGS);
                    }
                }

                this.state = 422;
                localContext._paramType = this.unionableTypeSpecifier();
                this.state = 424;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 82) {
                    {
                    this.state = 423;
                    this.match(LPCParser.AND);
                    }
                }

                this.state = 427;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 272629836) !== 0) || ((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & 262281) !== 0) || _la === 129) {
                    {
                    this.state = 426;
                    localContext._paramName = this.validIdentifiers();
                    }
                }

                this.state = 430;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 94) {
                    {
                    this.state = 429;
                    this.match(LPCParser.TRIPPLEDOT);
                    }
                }

                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 433;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 65) {
                    {
                    this.state = 432;
                    this.match(LPCParser.VARARGS);
                    }
                }

                this.state = 436;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 45, this.context) ) {
                case 1:
                    {
                    this.state = 435;
                    localContext._paramType = this.unionableTypeSpecifier();
                    }
                    break;
                }
                this.state = 439;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 82) {
                    {
                    this.state = 438;
                    this.match(LPCParser.AND);
                    }
                }

                this.state = 441;
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
            this.state = 444;
            this.unionableTypeSpecifier();
            this.state = 445;
            this.match(LPCParser.Identifier);
            this.state = 450;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 93) {
                {
                {
                this.state = 446;
                this.match(LPCParser.COMMA);
                this.state = 447;
                this.match(LPCParser.Identifier);
                }
                }
                this.state = 452;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 453;
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
            this.state = 459;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 49, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 455;
                this.match(LPCParser.Identifier);
                this.state = 456;
                this.match(LPCParser.COLON);
                this.state = 457;
                this.expression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 458;
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
            this.state = 461;
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
            this.state = 463;
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
            this.state = 467;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 50, this.context) ) {
            case 1:
                {
                this.state = 465;
                if (!(this.isFluff())) {
                    throw this.createFailedPredicateException("this.isFluff()");
                }
                this.state = 466;
                this.structModifier();
                }
                break;
            }
            this.state = 469;
            _la = this.tokenStream.LA(1);
            if(!(_la === 7 || _la === 44)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 470;
            localContext._structName = this.match(LPCParser.Identifier);
            this.state = 474;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 112) {
                {
                this.state = 471;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 472;
                localContext._structInherits = this.match(LPCParser.Identifier);
                this.state = 473;
                this.match(LPCParser.PAREN_CLOSE);
                }
            }

            this.state = 476;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 480;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2156399052) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 4733535) !== 0) || _la === 69 || _la === 76) {
                {
                {
                this.state = 477;
                this.structMemberDeclaration();
                }
                }
                this.state = 482;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 483;
            this.match(LPCParser.CURLY_CLOSE);
            this.state = 485;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 53, this.context) ) {
            case 1:
                {
                this.state = 484;
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
            this.state = 487;
            this.variableDeclaration();
            this.state = 488;
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
            this.state = 493;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 479) !== 0)) {
                {
                {
                this.state = 490;
                this.variableModifier();
                }
                }
                this.state = 495;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 497;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 55, this.context) ) {
            case 1:
                {
                this.state = 496;
                localContext._type_ = this.unionableTypeSpecifier();
                }
                break;
            }
            this.state = 500;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 124) {
                {
                this.state = 499;
                localContext._objectName = this.match(LPCParser.StringLiteral);
                }
            }

            this.state = 502;
            this.variableDeclaratorExpression();
            this.state = 507;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 93) {
                {
                {
                this.state = 503;
                this.match(LPCParser.COMMA);
                this.state = 504;
                this.variableDeclaratorExpression();
                }
                }
                this.state = 509;
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
            this.state = 510;
            this.variableDeclarator();
            this.state = 513;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 97) {
                {
                this.state = 511;
                this.match(LPCParser.ASSIGN);
                this.state = 512;
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
            this.state = 518;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 69) {
                {
                {
                this.state = 515;
                localContext._arraySpecifier = this.match(LPCParser.STAR);
                }
                }
                this.state = 520;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 521;
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
            this.state = 526;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 60, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 523;
                this.arrayExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 524;
                this.mappingExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 525;
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
            this.state = 528;
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
            this.state = 530;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 532;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 61, this.context) ) {
            case 1:
                {
                this.state = 531;
                this.argumentList();
                }
                break;
            }
            this.state = 534;
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
            this.state = 536;
            _la = this.tokenStream.LA(1);
            if(!(_la === 7 || _la === 44)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 537;
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
            this.state = 539;
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
            this.state = 563;
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
                this.state = 547;
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
                    this.state = 541;
                    this.primitiveTypeSpecifier();
                    }
                    break;
                case LPCParser.LT:
                    {
                    this.state = 542;
                    this.match(LPCParser.LT);
                    this.state = 543;
                    this.typeSpecifier();
                    this.state = 544;
                    this.match(LPCParser.GT);
                    }
                    break;
                case LPCParser.CLASS:
                case LPCParser.STRUCT:
                    {
                    this.state = 546;
                    this.structTypeSpecifier();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 550;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 41) {
                    {
                    this.state = 549;
                    this.match(LPCParser.REF);
                    }
                }

                this.state = 555;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 64, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 552;
                        this.match(LPCParser.STAR);
                        }
                        }
                    }
                    this.state = 557;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 64, this.context);
                }
                }
                }
                break;
            case LPCParser.STAR:
                {
                this.state = 559;
                this.errorHandler.sync(this);
                alternative = 1;
                do {
                    switch (alternative) {
                    case 1:
                        {
                        {
                        this.state = 558;
                        this.match(LPCParser.STAR);
                        }
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    this.state = 561;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 65, this.context);
                } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 569;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 67, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 565;
                    this.match(LPCParser.OR);
                    this.state = 566;
                    this.unionableTypeSpecifier();
                    }
                    }
                }
                this.state = 571;
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
            this.state = 572;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 573;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 588;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 71, this.context) ) {
            case 1:
                {
                this.state = 574;
                this.expression();
                this.state = 576;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 94) {
                    {
                    this.state = 575;
                    this.match(LPCParser.TRIPPLEDOT);
                    }
                }

                this.state = 585;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 70, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 578;
                        this.match(LPCParser.COMMA);
                        this.state = 579;
                        this.expression();
                        this.state = 581;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if (_la === 94) {
                            {
                            this.state = 580;
                            this.match(LPCParser.TRIPPLEDOT);
                            }
                        }

                        }
                        }
                    }
                    this.state = 587;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 70, this.context);
                }
                }
                break;
            }
            this.state = 591;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 93) {
                {
                this.state = 590;
                this.match(LPCParser.COMMA);
                }
            }

            this.state = 593;
            this.match(LPCParser.CURLY_CLOSE);
            this.state = 594;
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
            this.state = 596;
            localContext._mappingKey = this.expression();
            this.state = 606;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 91) {
                {
                this.state = 597;
                this.match(LPCParser.COLON);
                this.state = 598;
                this.expression();
                this.state = 603;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 92) {
                    {
                    {
                    this.state = 599;
                    this.match(LPCParser.SEMI);
                    this.state = 600;
                    this.expression();
                    }
                    }
                    this.state = 605;
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
            this.state = 632;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 77, this.context) ) {
            case 1:
                localContext = new MappingValueInitializerContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 608;
                this.match(LPCParser.MAPPING_OPEN);
                {
                this.state = 609;
                this.mappingContent();
                this.state = 614;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 75, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 610;
                        this.match(LPCParser.COMMA);
                        this.state = 611;
                        this.mappingContent();
                        }
                        }
                    }
                    this.state = 616;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 75, this.context);
                }
                }
                this.state = 618;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 93) {
                    {
                    this.state = 617;
                    this.match(LPCParser.COMMA);
                    }
                }

                this.state = 620;
                this.match(LPCParser.SQUARE_CLOSE);
                this.state = 621;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 2:
                localContext = new MappingKeylessInitializerContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 623;
                this.match(LPCParser.MAPPING_OPEN);
                this.state = 624;
                this.match(LPCParser.COLON);
                this.state = 625;
                this.expression();
                this.state = 626;
                this.match(LPCParser.SQUARE_CLOSE);
                this.state = 627;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 3:
                localContext = new MappingEmptyInitializerContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 629;
                this.match(LPCParser.MAPPING_OPEN);
                this.state = 630;
                this.match(LPCParser.SQUARE_CLOSE);
                this.state = 631;
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
            this.state = 634;
            this.conditionalExpression(3);
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
            this.state = 645;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 79, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 636;
                this.inlineClosureExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 637;
                this.conditionalExpression(4);
                this.state = 642;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 93) {
                    {
                    {
                    this.state = 638;
                    localContext._op = this.match(LPCParser.COMMA);
                    this.state = 639;
                    this.conditionalExpression(4);
                    }
                    }
                    this.state = 644;
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
            this.state = 647;
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
            this.state = 651;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 80, this.context) ) {
            case 1:
                {
                this.state = 649;
                if (!( 16 >= localContext?._p! )) {
                    throw this.createFailedPredicateException(" 16 >= $_p ");
                }
                this.state = 650;
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
            this.state = 657;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 81, this.context) ) {
            case 1:
                {
                this.state = 653;
                this.castExpression();
                }
                break;
            case 2:
                {
                this.state = 654;
                this.primaryExpression();
                }
                break;
            case 3:
                {
                this.state = 655;
                this.lambdaExpression();
                }
                break;
            case 4:
                {
                this.state = 656;
                this.inlineClosureExpression();
                }
                break;
            }
            }
            this.state = 701;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 83, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 699;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 82, this.context) ) {
                    case 1:
                        {
                        this.state = 659;
                        if (!( 15 >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 15 >= $_p ");
                        }
                        this.state = 660;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 7) !== 0))) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 661;
                        this.conditionalExpression(16);
                        }
                        break;
                    case 2:
                        {
                        this.state = 662;
                        if (!( 14 >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 14 >= $_p ");
                        }
                        this.state = 663;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 67 || _la === 68)) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 664;
                        this.conditionalExpression(15);
                        }
                        break;
                    case 3:
                        {
                        this.state = 665;
                        if (!( 13 >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 13 >= $_p ");
                        }
                        this.state = 666;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 74 || _la === 75)) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 667;
                        this.conditionalExpression(14);
                        }
                        break;
                    case 4:
                        {
                        this.state = 668;
                        if (!( 12 >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 12 >= $_p ");
                        }
                        this.state = 669;
                        localContext._cond = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 15) !== 0))) {
                            localContext._cond = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 670;
                        this.conditionalExpression(13);
                        }
                        break;
                    case 5:
                        {
                        this.state = 671;
                        if (!( 11 >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 11 >= $_p ");
                        }
                        this.state = 672;
                        localContext._cond = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 28 || _la === 80 || _la === 81)) {
                            localContext._cond = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 673;
                        this.conditionalExpression(12);
                        }
                        break;
                    case 6:
                        {
                        this.state = 674;
                        if (!( 10 >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 10 >= $_p ");
                        }
                        this.state = 675;
                        localContext._op = this.match(LPCParser.AND);
                        this.state = 676;
                        this.conditionalExpression(11);
                        }
                        break;
                    case 7:
                        {
                        this.state = 677;
                        if (!( 9  >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 9  >= $_p ");
                        }
                        this.state = 678;
                        localContext._op = this.match(LPCParser.XOR);
                        this.state = 679;
                        this.conditionalExpression(10);
                        }
                        break;
                    case 8:
                        {
                        this.state = 680;
                        if (!( 8  >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 8  >= $_p ");
                        }
                        this.state = 681;
                        localContext._op = this.match(LPCParser.OR);
                        this.state = 682;
                        this.conditionalExpression(9);
                        }
                        break;
                    case 9:
                        {
                        this.state = 683;
                        if (!( 7  >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 7  >= $_p ");
                        }
                        this.state = 684;
                        localContext._cond = this.match(LPCParser.AND_AND);
                        this.state = 685;
                        this.conditionalExpression(8);
                        }
                        break;
                    case 10:
                        {
                        this.state = 686;
                        if (!( 6  >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 6  >= $_p ");
                        }
                        this.state = 687;
                        localContext._cond = this.match(LPCParser.OR_OR);
                        this.state = 688;
                        this.conditionalExpression(7);
                        }
                        break;
                    case 11:
                        {
                        this.state = 689;
                        if (!( 5  >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 5  >= $_p ");
                        }
                        this.state = 690;
                        localContext._ternOp = this.match(LPCParser.QUESTION);
                        this.state = 691;
                        this.conditionalExpression(4);
                        this.state = 692;
                        localContext._ternOp2 = this.match(LPCParser.COLON);
                        this.state = 693;
                        this.conditionalExpression(4);
                        }
                        break;
                    case 12:
                        {
                        this.state = 695;
                        if (!( 4  >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 4  >= $_p ");
                        }
                        this.state = 696;
                        localContext._assignOp = this.assignmentOperator();
                        this.state = 697;
                        this.conditionalExpression(5);
                        }
                        break;
                    }
                    }
                }
                this.state = 703;
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
            this.state = 705;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 84, this.context) ) {
            case 1:
                {
                this.state = 704;
                localContext._super_ = this.inheritSuperExpression();
                }
                break;
            }
            this.state = 707;
            localContext._pe = this.primaryExpressionStart();
            this.state = 711;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 85, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 708;
                    this.bracketExpression();
                    }
                    }
                }
                this.state = 713;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 85, this.context);
            }
            this.state = 735;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 89, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 725;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 87, this.context) ) {
                    case 1:
                        {
                        this.state = 714;
                        this.methodInvocation();
                        }
                        break;
                    case 2:
                        {
                        this.state = 715;
                        this.match(LPCParser.INC);
                        }
                        break;
                    case 3:
                        {
                        this.state = 716;
                        this.match(LPCParser.DEC);
                        }
                        break;
                    case 4:
                        {
                        {
                        this.state = 717;
                        this.match(LPCParser.ARROW);
                        this.state = 719;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 86, this.context) ) {
                        case 1:
                            {
                            this.state = 718;
                            localContext._target = this.callOtherTarget();
                            }
                            break;
                        }
                        this.state = 721;
                        localContext._invocation = this.methodInvocation();
                        }
                        }
                        break;
                    case 5:
                        {
                        {
                        this.state = 722;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 96 || _la === 111)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 723;
                        localContext._structMember = this.match(LPCParser.Identifier);
                        }
                        }
                        break;
                    case 6:
                        {
                        this.state = 724;
                        this.match(LPCParser.Identifier);
                        }
                        break;
                    }
                    this.state = 730;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 88, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 727;
                            this.bracketExpression();
                            }
                            }
                        }
                        this.state = 732;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 88, this.context);
                    }
                    }
                    }
                }
                this.state = 737;
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
            this.state = 788;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 97, this.context) ) {
            case 1:
                localContext = new LiteralExpressionContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 738;
                this.literal();
                }
                break;
            case 2:
                localContext = new StringConcatExpressionContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 739;
                this.match(LPCParser.StringLiteral);
                this.state = 743;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 90, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 740;
                        this.match(LPCParser.StringLiteral);
                        }
                        }
                    }
                    this.state = 745;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 90, this.context);
                }
                }
                break;
            case 3:
                localContext = new IdentifierExpressionContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 746;
                this.validIdentifiers();
                }
                break;
            case 4:
                localContext = new StructInitializerExpressionContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 776;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 95, this.context) ) {
                case 1:
                    {
                    this.state = 747;
                    if (!( this.isFluff() )) {
                        throw this.createFailedPredicateException(" this.isFluff() ");
                    }
                    {
                    this.state = 748;
                    this.match(LPCParser.PAREN_OPEN);
                    this.state = 749;
                    this.match(LPCParser.CLASS);
                    this.state = 750;
                    (localContext as StructInitializerExpressionContext)._structName = this.match(LPCParser.Identifier);
                    this.state = 755;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 93) {
                        {
                        {
                        this.state = 751;
                        this.match(LPCParser.COMMA);
                        this.state = 752;
                        this.structMemberInitializer();
                        }
                        }
                        this.state = 757;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 758;
                    this.match(LPCParser.PAREN_CLOSE);
                    }
                    }
                    break;
                case 2:
                    {
                    this.state = 759;
                    if (!( this.isLD() )) {
                        throw this.createFailedPredicateException(" this.isLD() ");
                    }
                    {
                    this.state = 760;
                    this.match(LPCParser.PAREN_OPEN);
                    this.state = 761;
                    (localContext as StructInitializerExpressionContext)._structName = this.match(LPCParser.BracketedIdentifier);
                    this.state = 770;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 93, this.context) ) {
                    case 1:
                        {
                        this.state = 762;
                        this.structMemberInitializer();
                        this.state = 767;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 92, this.context);
                        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                            if (alternative === 1) {
                                {
                                {
                                this.state = 763;
                                this.match(LPCParser.COMMA);
                                this.state = 764;
                                this.structMemberInitializer();
                                }
                                }
                            }
                            this.state = 769;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 92, this.context);
                        }
                        }
                        break;
                    }
                    this.state = 773;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 93) {
                        {
                        this.state = 772;
                        this.match(LPCParser.COMMA);
                        }
                    }

                    this.state = 775;
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
                this.state = 778;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 781;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 96, this.context) ) {
                case 1:
                    {
                    this.state = 779;
                    this.commaableExpression();
                    }
                    break;
                case 2:
                    {
                    this.state = 780;
                    this.variableDeclaration();
                    }
                    break;
                }
                this.state = 783;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 6:
                localContext = new PrimaryArrayExpressionContext(localContext);
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 785;
                this.arrayExpression();
                }
                break;
            case 7:
                localContext = new PrimaryMappingExpressionContext(localContext);
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 786;
                this.mappingExpression();
                }
                break;
            case 8:
                localContext = new CatchExpressionContext(localContext);
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 787;
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
            this.state = 790;
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
            this.state = 813;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 100, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 792;
                this.match(LPCParser.CATCH);
                this.state = 793;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 794;
                this.expression();
                this.state = 799;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 93) {
                    {
                    {
                    this.state = 795;
                    this.match(LPCParser.COMMA);
                    this.state = 796;
                    this.expression();
                    }
                    }
                    this.state = 801;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 806;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 92) {
                    {
                    {
                    this.state = 802;
                    this.match(LPCParser.SEMI);
                    this.state = 803;
                    this.match(LPCParser.Identifier);
                    }
                    }
                    this.state = 808;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 809;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 811;
                this.match(LPCParser.CATCH);
                this.state = 812;
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
            this.state = 852;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 106, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 815;
                if (!(this.isFluff())) {
                    throw this.createFailedPredicateException("this.isFluff()");
                }
                this.state = 816;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 817;
                this.match(LPCParser.COLON);
                this.state = 818;
                this.expression();
                this.state = 823;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 93) {
                    {
                    {
                    this.state = 819;
                    this.match(LPCParser.COMMA);
                    this.state = 820;
                    this.expression();
                    }
                    }
                    this.state = 825;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 826;
                this.match(LPCParser.COLON);
                this.state = 827;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 829;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 830;
                this.match(LPCParser.COLON);
                this.state = 838;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 103, this.context) ) {
                case 1:
                    {
                    this.state = 831;
                    this.expression();
                    }
                    break;
                case 2:
                    {
                    this.state = 835;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 102, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 832;
                            this.statement();
                            }
                            }
                        }
                        this.state = 837;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 102, this.context);
                    }
                    }
                    break;
                }
                this.state = 840;
                this.match(LPCParser.COLON);
                this.state = 841;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 842;
                this.match(LPCParser.FUNCTION);
                this.state = 844;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2156399052) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 4733535) !== 0) || _la === 69 || _la === 76) {
                    {
                    this.state = 843;
                    this.typeSpecifier();
                    }
                }

                this.state = 846;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 848;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 105, this.context) ) {
                case 1:
                    {
                    this.state = 847;
                    this.parameterList(false);
                    }
                    break;
                }
                this.state = 850;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 851;
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
            this.state = 880;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 113, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 854;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 856;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 107, this.context) ) {
                case 1:
                    {
                    this.state = 855;
                    this.match(LPCParser.LT);
                    }
                    break;
                }
                this.state = 858;
                this.expression();
                this.state = 861;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 93) {
                    {
                    this.state = 859;
                    this.match(LPCParser.COMMA);
                    this.state = 860;
                    this.expression();
                    }
                }

                this.state = 863;
                this.match(LPCParser.SQUARE_CLOSE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 865;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 867;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 109, this.context) ) {
                case 1:
                    {
                    this.state = 866;
                    this.match(LPCParser.LT);
                    }
                    break;
                }
                this.state = 870;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 110, this.context) ) {
                case 1:
                    {
                    this.state = 869;
                    this.expression();
                    }
                    break;
                }
                this.state = 872;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 874;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 111, this.context) ) {
                case 1:
                    {
                    this.state = 873;
                    this.match(LPCParser.LT);
                    }
                    break;
                }
                this.state = 877;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 112, this.context) ) {
                case 1:
                    {
                    this.state = 876;
                    this.expression();
                    }
                    break;
                }
                this.state = 879;
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
            this.state = 895;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 117, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 882;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 883;
                this.match(LPCParser.LT);
                this.state = 885;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 114, this.context) ) {
                case 1:
                    {
                    this.state = 884;
                    this.match(LPCParser.DOUBLEDOT);
                    }
                    break;
                }
                this.state = 888;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 115, this.context) ) {
                case 1:
                    {
                    this.state = 887;
                    this.match(LPCParser.LT);
                    }
                    break;
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 890;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 891;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 893;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 116, this.context) ) {
                case 1:
                    {
                    this.state = 892;
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
            this.state = 916;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 121, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 898;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 24) {
                    {
                    this.state = 897;
                    this.match(LPCParser.HASH);
                    }
                }

                this.state = 900;
                this.match(LPCParser.LAMBDA_IDENTIFIER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 901;
                this.match(LPCParser.HASH);
                this.state = 902;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 914;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 120, this.context) ) {
                case 1:
                    {
                    this.state = 903;
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
                    this.state = 904;
                    this.bracketExpression();
                    }
                    }
                    break;
                case 3:
                    {
                    {
                    this.state = 905;
                    this.lambdaArrayIndexor();
                    }
                    }
                    break;
                case 4:
                    {
                    this.state = 909;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 119, this.context) ) {
                    case 1:
                        {
                        this.state = 906;
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
                        this.state = 907;
                        this.match(LPCParser.QUESTION);
                        this.state = 908;
                        this.match(LPCParser.NOT);
                        }
                        break;
                    }
                    }
                    break;
                case 5:
                    {
                    {
                    this.state = 911;
                    this.match(LPCParser.PAREN_OPEN);
                    this.state = 912;
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
                    this.state = 913;
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
            this.state = 944;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 123, this.context) ) {
            case 1:
                localContext = new PrimitiveTypeCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 918;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 919;
                this.typeSpecifier();
                this.state = 920;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 921;
                this.conditionalExpression(16);
                }
                break;
            case 2:
                localContext = new DeclarativeTypeCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 923;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 924;
                this.match(LPCParser.CURLY_OPEN);
                this.state = 925;
                this.typeSpecifier();
                this.state = 926;
                this.match(LPCParser.CURLY_CLOSE);
                this.state = 927;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 928;
                this.conditionalExpression(16);
                }
                break;
            case 3:
                localContext = new StructCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 930;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 931;
                this.match(LPCParser.LT);
                this.state = 932;
                this.match(LPCParser.Identifier);
                this.state = 933;
                this.match(LPCParser.GT);
                this.state = 934;
                this.conditionalExpression(16);
                this.state = 939;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 93) {
                    {
                    {
                    this.state = 935;
                    this.match(LPCParser.COMMA);
                    this.state = 936;
                    this.conditionalExpression(16);
                    }
                    }
                    this.state = 941;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 942;
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
            this.state = 956;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 124, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 946;
                this.block();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 947;
                this.match(LPCParser.SEMI);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 948;
                this.selectionStatement();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 949;
                this.iterationStatement();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 950;
                this.jumpStatement();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 951;
                this.variableDeclarationStatement();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 952;
                this.commaableExpression();
                this.state = 953;
                this.match(LPCParser.SEMI);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 955;
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
            this.state = 958;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 962;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 125, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 959;
                    this.statement();
                    }
                    }
                }
                this.state = 964;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 125, this.context);
            }
            this.state = 965;
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
            this.state = 969;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.IF:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 967;
                this.ifStatement();
                }
                break;
            case LPCParser.SWITCH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 968;
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
            this.state = 971;
            this.match(LPCParser.ELSE);
            this.state = 972;
            this.match(LPCParser.IF);
            this.state = 973;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 974;
            this.expression();
            this.state = 975;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 976;
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
            this.state = 978;
            this.match(LPCParser.ELSE);
            this.state = 979;
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
            this.state = 981;
            this.match(LPCParser.IF);
            this.state = 982;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 983;
            this.expression();
            this.state = 984;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 985;
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
            this.state = 987;
            this.ifExpression();
            this.state = 991;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 127, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 988;
                    this.elseIfExpression();
                    }
                    }
                }
                this.state = 993;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 127, this.context);
            }
            this.state = 995;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 128, this.context) ) {
            case 1:
                {
                this.state = 994;
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
            this.state = 997;
            this.match(LPCParser.SWITCH);
            this.state = 998;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 999;
            this.expression();
            this.state = 1000;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 1001;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 1005;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2429028812) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 4291444319) !== 0) || _la === 69 || _la === 76 || _la === 124 || _la === 129) {
                {
                {
                this.state = 1002;
                this.variableDeclarationStatement();
                }
                }
                this.state = 1007;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1012;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 4 || _la === 12) {
                {
                this.state = 1010;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.CASE:
                    {
                    this.state = 1008;
                    this.caseStatement();
                    }
                    break;
                case LPCParser.DEFAULT:
                    {
                    this.state = 1009;
                    this.defaultStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 1014;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1015;
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
        try {
            this.state = 1026;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 134, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1017;
                this.expression();
                this.state = 1019;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 132, this.context) ) {
                case 1:
                    {
                    this.state = 1018;
                    this.match(LPCParser.DOUBLEDOT);
                    }
                    break;
                }
                this.state = 1022;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 133, this.context) ) {
                case 1:
                    {
                    this.state = 1021;
                    this.expression();
                    }
                    break;
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1024;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 1025;
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
    public caseStatement(): CaseStatementContext {
        let localContext = new CaseStatementContext(this.context, this.state);
        this.enterRule(localContext, 136, LPCParser.RULE_caseStatement);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1028;
            this.match(LPCParser.CASE);
            this.state = 1029;
            this.caseExpression();
            this.state = 1030;
            this.match(LPCParser.COLON);
            this.state = 1034;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 135, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1031;
                    this.statement();
                    }
                    }
                }
                this.state = 1036;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 135, this.context);
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
        this.enterRule(localContext, 138, LPCParser.RULE_defaultStatement);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1037;
            this.match(LPCParser.DEFAULT);
            this.state = 1038;
            this.match(LPCParser.COLON);
            this.state = 1042;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 136, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1039;
                    this.statement();
                    }
                    }
                }
                this.state = 1044;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 136, this.context);
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
        this.enterRule(localContext, 140, LPCParser.RULE_iterationStatement);
        try {
            this.state = 1077;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.WHILE:
                localContext = new WhileStatementContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1045;
                this.match(LPCParser.WHILE);
                this.state = 1046;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 1047;
                this.expression();
                this.state = 1048;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 1051;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 137, this.context) ) {
                case 1:
                    {
                    this.state = 1049;
                    this.statement();
                    }
                    break;
                case 2:
                    {
                    this.state = 1050;
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
                this.state = 1053;
                this.match(LPCParser.DO);
                this.state = 1054;
                this.statement();
                this.state = 1055;
                this.match(LPCParser.WHILE);
                this.state = 1056;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 1057;
                this.expression();
                this.state = 1058;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 1059;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.FOR:
                localContext = new ForStatementContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1061;
                this.match(LPCParser.FOR);
                this.state = 1062;
                this.match(LPCParser.PAREN_OPEN);
                {
                this.state = 1063;
                this.forRangeExpression();
                }
                this.state = 1064;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 1067;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 138, this.context) ) {
                case 1:
                    {
                    this.state = 1065;
                    this.statement();
                    }
                    break;
                case 2:
                    {
                    this.state = 1066;
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
                this.state = 1069;
                this.match(LPCParser.FOREACH);
                this.state = 1070;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 1071;
                this.foreachRangeExpression();
                this.state = 1072;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 1075;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 139, this.context) ) {
                case 1:
                    {
                    this.state = 1073;
                    this.statement();
                    }
                    break;
                case 2:
                    {
                    this.state = 1074;
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
        this.enterRule(localContext, 142, LPCParser.RULE_forRangeExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1087;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 142, this.context) ) {
            case 1:
                {
                this.state = 1079;
                this.forVariable();
                this.state = 1084;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 93) {
                    {
                    {
                    this.state = 1080;
                    this.match(LPCParser.COMMA);
                    this.state = 1081;
                    this.forVariable();
                    }
                    }
                    this.state = 1086;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            }
            this.state = 1089;
            this.match(LPCParser.SEMI);
            this.state = 1091;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 143, this.context) ) {
            case 1:
                {
                this.state = 1090;
                this.expression();
                }
                break;
            }
            this.state = 1093;
            this.match(LPCParser.SEMI);
            this.state = 1095;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 144, this.context) ) {
            case 1:
                {
                this.state = 1094;
                this.expression();
                }
                break;
            }
            this.state = 1101;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 93) {
                {
                {
                this.state = 1097;
                this.match(LPCParser.COMMA);
                this.state = 1098;
                this.expression();
                }
                }
                this.state = 1103;
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
        this.enterRule(localContext, 144, LPCParser.RULE_foreachRangeExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1104;
            this.forEachVariable();
            this.state = 1109;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 93) {
                {
                {
                this.state = 1105;
                this.match(LPCParser.COMMA);
                this.state = 1106;
                this.forEachVariable();
                }
                }
                this.state = 1111;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1112;
            _la = this.tokenStream.LA(1);
            if(!(_la === 28 || _la === 91)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1113;
            this.expression();
            this.state = 1116;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 95) {
                {
                this.state = 1114;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 1115;
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
        this.enterRule(localContext, 146, LPCParser.RULE_forVariable);
        try {
            this.state = 1129;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 150, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1119;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 148, this.context) ) {
                case 1:
                    {
                    this.state = 1118;
                    this.primitiveTypeSpecifier();
                    }
                    break;
                }
                this.state = 1121;
                this.variableDeclarator();
                this.state = 1126;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.ASSIGN:
                    {
                    this.state = 1122;
                    this.match(LPCParser.ASSIGN);
                    this.state = 1123;
                    this.variableInitializer();
                    }
                    break;
                case LPCParser.INC:
                    {
                    this.state = 1124;
                    this.match(LPCParser.INC);
                    }
                    break;
                case LPCParser.DEC:
                    {
                    this.state = 1125;
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
                this.state = 1128;
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
        this.enterRule(localContext, 148, LPCParser.RULE_forEachVariable);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1132;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 151, this.context) ) {
            case 1:
                {
                this.state = 1131;
                this.typeSpecifier();
                }
                break;
            }
            this.state = 1134;
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
        this.enterRule(localContext, 150, LPCParser.RULE_returnStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1136;
            this.match(LPCParser.RETURN);
            this.state = 1138;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 152, this.context) ) {
            case 1:
                {
                this.state = 1137;
                this.commaableExpression();
                }
                break;
            }
            this.state = 1140;
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
        this.enterRule(localContext, 152, LPCParser.RULE_jumpStatement);
        try {
            this.state = 1147;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BREAK:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1142;
                this.match(LPCParser.BREAK);
                this.state = 1143;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.CONTINUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1144;
                this.match(LPCParser.CONTINUE);
                this.state = 1145;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.RETURN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1146;
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
        this.enterRule(localContext, 154, LPCParser.RULE_callOtherTarget);
        try {
            this.state = 1155;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1149;
                this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.PAREN_OPEN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1150;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 1151;
                this.expression();
                this.state = 1152;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1154;
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
        this.enterRule(localContext, 156, LPCParser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1157;
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
        this.enterRule(localContext, 158, LPCParser.RULE_argument);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1160;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 155, this.context) ) {
            case 1:
                {
                this.state = 1159;
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
            this.state = 1162;
            this.expression();
            this.state = 1164;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 94) {
                {
                this.state = 1163;
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
        this.enterRule(localContext, 160, LPCParser.RULE_argumentList);
        let _la: number;
        try {
            this.state = 1187;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 160, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1166;
                this.argument();
                this.state = 1173;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 93) {
                    {
                    {
                    this.state = 1167;
                    this.match(LPCParser.COMMA);
                    this.state = 1169;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 157, this.context) ) {
                    case 1:
                        {
                        this.state = 1168;
                        this.argument();
                        }
                        break;
                    }
                    }
                    }
                    this.state = 1175;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1176;
                if (!( this.isFluff() )) {
                    throw this.createFailedPredicateException(" this.isFluff() ");
                }
                this.state = 1177;
                this.structTypeSpecifier();
                this.state = 1184;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 93) {
                    {
                    {
                    this.state = 1178;
                    this.match(LPCParser.COMMA);
                    this.state = 1179;
                    this.match(LPCParser.Identifier);
                    this.state = 1180;
                    this.match(LPCParser.COLON);
                    this.state = 1181;
                    this.expression();
                    }
                    }
                    this.state = 1186;
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
        case 80:
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
    private argumentList_sempred(localContext: ArgumentListContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 24:
            return  this.isFluff() ;
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,136,1190,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
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
        78,2,79,7,79,2,80,7,80,1,0,1,0,1,0,1,0,1,0,5,0,168,8,0,10,0,12,0,
        171,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,
        186,8,1,10,1,12,1,189,9,1,3,1,191,8,1,1,2,1,2,1,2,1,2,1,2,3,2,198,
        8,2,1,3,1,3,1,3,1,4,1,4,1,4,3,4,206,8,4,1,4,1,4,1,4,1,4,1,4,1,4,
        1,4,3,4,215,8,4,1,5,1,5,1,6,1,6,1,7,1,7,3,7,223,8,7,1,7,1,7,1,7,
        1,7,1,7,4,7,230,8,7,11,7,12,7,231,5,7,234,8,7,10,7,12,7,237,9,7,
        1,8,1,8,1,8,1,8,3,8,243,8,8,1,8,1,8,1,8,3,8,248,8,8,1,9,1,9,1,9,
        1,9,3,9,254,8,9,1,10,1,10,1,10,5,10,259,8,10,10,10,12,10,262,9,10,
        1,10,1,10,1,10,3,10,267,8,10,1,11,1,11,1,12,1,12,1,12,5,12,274,8,
        12,10,12,12,12,277,9,12,1,12,3,12,280,8,12,1,13,1,13,1,14,3,14,285,
        8,14,1,14,1,14,1,14,4,14,290,8,14,11,14,12,14,291,3,14,294,8,14,
        1,14,5,14,297,8,14,10,14,12,14,300,9,14,1,14,3,14,303,8,14,1,14,
        3,14,306,8,14,1,14,1,14,1,15,4,15,311,8,15,11,15,12,15,312,1,15,
        1,15,1,15,4,15,318,8,15,11,15,12,15,319,1,15,1,15,3,15,324,8,15,
        1,16,1,16,1,16,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,18,1,18,3,18,
        338,8,18,1,18,1,18,3,18,342,8,18,1,18,5,18,345,8,18,10,18,12,18,
        348,9,18,1,19,3,19,351,8,19,1,19,1,19,1,19,1,19,3,19,357,8,19,1,
        20,1,20,1,20,1,21,1,21,1,21,1,21,3,21,366,8,21,1,22,1,22,1,23,5,
        23,371,8,23,10,23,12,23,374,9,23,1,23,3,23,377,8,23,1,23,1,23,1,
        23,3,23,382,8,23,1,23,1,23,1,24,1,24,1,24,1,25,1,25,1,25,1,26,1,
        26,1,26,1,26,5,26,396,8,26,10,26,12,26,399,9,26,3,26,401,8,26,1,
        27,1,27,3,27,405,8,27,1,27,3,27,408,8,27,1,27,1,27,1,27,1,27,1,27,
        1,27,1,27,3,27,417,8,27,1,27,1,27,3,27,421,8,27,1,27,1,27,3,27,425,
        8,27,1,27,3,27,428,8,27,1,27,3,27,431,8,27,1,27,3,27,434,8,27,1,
        27,3,27,437,8,27,1,27,3,27,440,8,27,1,27,3,27,443,8,27,1,28,1,28,
        1,28,1,28,5,28,449,8,28,10,28,12,28,452,9,28,1,28,1,28,1,29,1,29,
        1,29,1,29,3,29,460,8,29,1,30,1,30,1,31,1,31,1,32,1,32,3,32,468,8,
        32,1,32,1,32,1,32,1,32,1,32,3,32,475,8,32,1,32,1,32,5,32,479,8,32,
        10,32,12,32,482,9,32,1,32,1,32,3,32,486,8,32,1,33,1,33,1,33,1,34,
        5,34,492,8,34,10,34,12,34,495,9,34,1,34,3,34,498,8,34,1,34,3,34,
        501,8,34,1,34,1,34,1,34,5,34,506,8,34,10,34,12,34,509,9,34,1,35,
        1,35,1,35,3,35,514,8,35,1,36,5,36,517,8,36,10,36,12,36,520,9,36,
        1,36,1,36,1,37,1,37,1,37,3,37,527,8,37,1,38,1,38,1,39,1,39,3,39,
        533,8,39,1,39,1,39,1,40,1,40,1,40,1,41,1,41,1,42,1,42,1,42,1,42,
        1,42,1,42,3,42,548,8,42,1,42,3,42,551,8,42,1,42,5,42,554,8,42,10,
        42,12,42,557,9,42,1,42,4,42,560,8,42,11,42,12,42,561,3,42,564,8,
        42,1,42,1,42,5,42,568,8,42,10,42,12,42,571,9,42,1,43,1,43,1,43,1,
        43,3,43,577,8,43,1,43,1,43,1,43,3,43,582,8,43,5,43,584,8,43,10,43,
        12,43,587,9,43,3,43,589,8,43,1,43,3,43,592,8,43,1,43,1,43,1,43,1,
        44,1,44,1,44,1,44,1,44,5,44,602,8,44,10,44,12,44,605,9,44,3,44,607,
        8,44,1,45,1,45,1,45,1,45,5,45,613,8,45,10,45,12,45,616,9,45,1,45,
        3,45,619,8,45,1,45,1,45,1,45,1,45,1,45,1,45,1,45,1,45,1,45,1,45,
        1,45,1,45,3,45,633,8,45,1,46,1,46,1,47,1,47,1,47,1,47,5,47,641,8,
        47,10,47,12,47,644,9,47,3,47,646,8,47,1,48,1,48,1,49,1,49,3,49,652,
        8,49,1,49,1,49,1,49,1,49,3,49,658,8,49,1,49,1,49,1,49,1,49,1,49,
        1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,
        1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,
        1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,5,49,700,8,49,10,49,
        12,49,703,9,49,1,50,3,50,706,8,50,1,50,1,50,5,50,710,8,50,10,50,
        12,50,713,9,50,1,50,1,50,1,50,1,50,1,50,3,50,720,8,50,1,50,1,50,
        1,50,1,50,3,50,726,8,50,1,50,5,50,729,8,50,10,50,12,50,732,9,50,
        5,50,734,8,50,10,50,12,50,737,9,50,1,51,1,51,1,51,5,51,742,8,51,
        10,51,12,51,745,9,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,5,51,754,
        8,51,10,51,12,51,757,9,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,5,51,
        766,8,51,10,51,12,51,769,9,51,3,51,771,8,51,1,51,3,51,774,8,51,1,
        51,3,51,777,8,51,1,51,1,51,1,51,3,51,782,8,51,1,51,1,51,1,51,1,51,
        1,51,3,51,789,8,51,1,52,1,52,1,53,1,53,1,53,1,53,1,53,5,53,798,8,
        53,10,53,12,53,801,9,53,1,53,1,53,5,53,805,8,53,10,53,12,53,808,
        9,53,1,53,1,53,1,53,1,53,3,53,814,8,53,1,54,1,54,1,54,1,54,1,54,
        1,54,5,54,822,8,54,10,54,12,54,825,9,54,1,54,1,54,1,54,1,54,1,54,
        1,54,1,54,5,54,834,8,54,10,54,12,54,837,9,54,3,54,839,8,54,1,54,
        1,54,1,54,1,54,3,54,845,8,54,1,54,1,54,3,54,849,8,54,1,54,1,54,3,
        54,853,8,54,1,55,1,55,3,55,857,8,55,1,55,1,55,1,55,3,55,862,8,55,
        1,55,1,55,1,55,1,55,3,55,868,8,55,1,55,3,55,871,8,55,1,55,1,55,3,
        55,875,8,55,1,55,3,55,878,8,55,1,55,3,55,881,8,55,1,56,1,56,1,56,
        3,56,886,8,56,1,56,3,56,889,8,56,1,56,1,56,1,56,3,56,894,8,56,3,
        56,896,8,56,1,57,3,57,899,8,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,
        1,57,1,57,3,57,910,8,57,1,57,1,57,1,57,3,57,915,8,57,3,57,917,8,
        57,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,
        58,1,58,1,58,1,58,1,58,1,58,1,58,5,58,938,8,58,10,58,12,58,941,9,
        58,1,58,1,58,3,58,945,8,58,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,
        59,1,59,1,59,3,59,957,8,59,1,60,1,60,5,60,961,8,60,10,60,12,60,964,
        9,60,1,60,1,60,1,61,1,61,3,61,970,8,61,1,62,1,62,1,62,1,62,1,62,
        1,62,1,62,1,63,1,63,1,63,1,64,1,64,1,64,1,64,1,64,1,64,1,65,1,65,
        5,65,990,8,65,10,65,12,65,993,9,65,1,65,3,65,996,8,65,1,66,1,66,
        1,66,1,66,1,66,1,66,5,66,1004,8,66,10,66,12,66,1007,9,66,1,66,1,
        66,5,66,1011,8,66,10,66,12,66,1014,9,66,1,66,1,66,1,67,1,67,3,67,
        1020,8,67,1,67,3,67,1023,8,67,1,67,1,67,3,67,1027,8,67,1,68,1,68,
        1,68,1,68,5,68,1033,8,68,10,68,12,68,1036,9,68,1,69,1,69,1,69,5,
        69,1041,8,69,10,69,12,69,1044,9,69,1,70,1,70,1,70,1,70,1,70,1,70,
        3,70,1052,8,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,
        1,70,1,70,1,70,1,70,3,70,1068,8,70,1,70,1,70,1,70,1,70,1,70,1,70,
        3,70,1076,8,70,3,70,1078,8,70,1,71,1,71,1,71,5,71,1083,8,71,10,71,
        12,71,1086,9,71,3,71,1088,8,71,1,71,1,71,3,71,1092,8,71,1,71,1,71,
        3,71,1096,8,71,1,71,1,71,5,71,1100,8,71,10,71,12,71,1103,9,71,1,
        72,1,72,1,72,5,72,1108,8,72,10,72,12,72,1111,9,72,1,72,1,72,1,72,
        1,72,3,72,1117,8,72,1,73,3,73,1120,8,73,1,73,1,73,1,73,1,73,1,73,
        3,73,1127,8,73,1,73,3,73,1130,8,73,1,74,3,74,1133,8,74,1,74,1,74,
        1,75,1,75,3,75,1139,8,75,1,75,1,75,1,76,1,76,1,76,1,76,1,76,3,76,
        1148,8,76,1,77,1,77,1,77,1,77,1,77,1,77,3,77,1156,8,77,1,78,1,78,
        1,79,3,79,1161,8,79,1,79,1,79,3,79,1165,8,79,1,80,1,80,1,80,3,80,
        1170,8,80,5,80,1172,8,80,10,80,12,80,1175,9,80,1,80,1,80,1,80,1,
        80,1,80,1,80,5,80,1183,8,80,10,80,12,80,1186,9,80,3,80,1188,8,80,
        1,80,0,2,14,36,81,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,
        34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,
        78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,
        116,118,120,122,124,126,128,130,132,134,136,138,140,142,144,146,
        148,150,152,154,156,158,160,0,28,2,0,16,16,25,25,2,0,15,15,17,17,
        1,0,26,27,2,0,76,81,88,89,3,0,119,119,124,124,129,129,2,0,43,43,
        50,50,1,0,57,61,3,0,37,37,124,124,129,129,1,0,57,59,2,0,56,62,64,
        65,2,0,56,60,62,64,2,0,7,7,44,44,13,0,2,3,6,6,8,8,11,11,19,19,23,
        23,31,31,33,37,39,39,42,42,45,46,52,52,55,55,1,0,97,109,4,0,67,69,
        72,73,82,82,85,87,1,0,69,71,1,0,67,68,1,0,74,75,1,0,76,79,2,0,28,
        28,80,81,2,0,96,96,111,111,9,0,2,3,6,6,22,22,28,28,43,43,46,46,50,
        50,61,61,129,129,2,0,40,40,54,54,7,0,67,71,74,84,86,86,88,90,93,
        93,97,107,116,116,2,0,114,114,116,116,2,0,28,28,91,91,2,0,119,121,
        125,125,2,0,41,41,82,82,1330,0,169,1,0,0,0,2,190,1,0,0,0,4,192,1,
        0,0,0,6,199,1,0,0,0,8,214,1,0,0,0,10,216,1,0,0,0,12,218,1,0,0,0,
        14,220,1,0,0,0,16,247,1,0,0,0,18,253,1,0,0,0,20,266,1,0,0,0,22,268,
        1,0,0,0,24,279,1,0,0,0,26,281,1,0,0,0,28,305,1,0,0,0,30,323,1,0,
        0,0,32,325,1,0,0,0,34,328,1,0,0,0,36,337,1,0,0,0,38,356,1,0,0,0,
        40,358,1,0,0,0,42,365,1,0,0,0,44,367,1,0,0,0,46,372,1,0,0,0,48,385,
        1,0,0,0,50,388,1,0,0,0,52,400,1,0,0,0,54,442,1,0,0,0,56,444,1,0,
        0,0,58,459,1,0,0,0,60,461,1,0,0,0,62,463,1,0,0,0,64,467,1,0,0,0,
        66,487,1,0,0,0,68,493,1,0,0,0,70,510,1,0,0,0,72,518,1,0,0,0,74,526,
        1,0,0,0,76,528,1,0,0,0,78,530,1,0,0,0,80,536,1,0,0,0,82,539,1,0,
        0,0,84,563,1,0,0,0,86,572,1,0,0,0,88,596,1,0,0,0,90,632,1,0,0,0,
        92,634,1,0,0,0,94,645,1,0,0,0,96,647,1,0,0,0,98,651,1,0,0,0,100,
        705,1,0,0,0,102,788,1,0,0,0,104,790,1,0,0,0,106,813,1,0,0,0,108,
        852,1,0,0,0,110,880,1,0,0,0,112,895,1,0,0,0,114,916,1,0,0,0,116,
        944,1,0,0,0,118,956,1,0,0,0,120,958,1,0,0,0,122,969,1,0,0,0,124,
        971,1,0,0,0,126,978,1,0,0,0,128,981,1,0,0,0,130,987,1,0,0,0,132,
        997,1,0,0,0,134,1026,1,0,0,0,136,1028,1,0,0,0,138,1037,1,0,0,0,140,
        1077,1,0,0,0,142,1087,1,0,0,0,144,1104,1,0,0,0,146,1129,1,0,0,0,
        148,1132,1,0,0,0,150,1136,1,0,0,0,152,1147,1,0,0,0,154,1155,1,0,
        0,0,156,1157,1,0,0,0,158,1160,1,0,0,0,160,1187,1,0,0,0,162,168,3,
        42,21,0,163,168,3,2,1,0,164,168,3,28,14,0,165,166,4,0,0,0,166,168,
        3,40,20,0,167,162,1,0,0,0,167,163,1,0,0,0,167,164,1,0,0,0,167,165,
        1,0,0,0,168,171,1,0,0,0,169,167,1,0,0,0,169,170,1,0,0,0,170,172,
        1,0,0,0,171,169,1,0,0,0,172,173,5,0,0,1,173,1,1,0,0,0,174,191,3,
        8,4,0,175,176,3,18,9,0,176,177,3,20,10,0,177,191,1,0,0,0,178,191,
        3,6,3,0,179,191,3,4,2,0,180,181,5,24,0,0,181,182,3,26,13,0,182,187,
        5,129,0,0,183,184,5,93,0,0,184,186,5,129,0,0,185,183,1,0,0,0,186,
        189,1,0,0,0,187,185,1,0,0,0,187,188,1,0,0,0,188,191,1,0,0,0,189,
        187,1,0,0,0,190,174,1,0,0,0,190,175,1,0,0,0,190,178,1,0,0,0,190,
        179,1,0,0,0,190,180,1,0,0,0,191,3,1,0,0,0,192,193,5,24,0,0,193,194,
        3,22,11,0,194,197,3,24,12,0,195,196,4,2,1,0,196,198,5,92,0,0,197,
        195,1,0,0,0,197,198,1,0,0,0,198,5,1,0,0,0,199,200,5,132,0,0,200,
        201,5,134,0,0,201,7,1,0,0,0,202,203,5,24,0,0,203,205,3,12,6,0,204,
        206,5,86,0,0,205,204,1,0,0,0,205,206,1,0,0,0,206,207,1,0,0,0,207,
        208,3,20,10,0,208,215,1,0,0,0,209,210,5,24,0,0,210,211,7,0,0,0,211,
        215,3,14,7,0,212,213,5,24,0,0,213,215,3,10,5,0,214,202,1,0,0,0,214,
        209,1,0,0,0,214,212,1,0,0,0,215,9,1,0,0,0,216,217,7,1,0,0,217,11,
        1,0,0,0,218,219,7,2,0,0,219,13,1,0,0,0,220,222,6,7,-1,0,221,223,
        5,86,0,0,222,221,1,0,0,0,222,223,1,0,0,0,223,224,1,0,0,0,224,225,
        3,16,8,0,225,235,1,0,0,0,226,229,10,1,0,0,227,228,7,3,0,0,228,230,
        3,14,7,0,229,227,1,0,0,0,230,231,1,0,0,0,231,229,1,0,0,0,231,232,
        1,0,0,0,232,234,1,0,0,0,233,226,1,0,0,0,234,237,1,0,0,0,235,233,
        1,0,0,0,235,236,1,0,0,0,236,15,1,0,0,0,237,235,1,0,0,0,238,242,5,
        129,0,0,239,240,5,112,0,0,240,241,7,4,0,0,241,243,5,113,0,0,242,
        239,1,0,0,0,242,243,1,0,0,0,243,248,1,0,0,0,244,248,5,124,0,0,245,
        248,5,119,0,0,246,248,3,92,46,0,247,238,1,0,0,0,247,244,1,0,0,0,
        247,245,1,0,0,0,247,246,1,0,0,0,248,17,1,0,0,0,249,250,5,24,0,0,
        250,254,5,49,0,0,251,254,5,14,0,0,252,254,5,32,0,0,253,249,1,0,0,
        0,253,251,1,0,0,0,253,252,1,0,0,0,254,19,1,0,0,0,255,260,5,129,0,
        0,256,257,5,68,0,0,257,259,5,129,0,0,258,256,1,0,0,0,259,262,1,0,
        0,0,260,258,1,0,0,0,260,261,1,0,0,0,261,267,1,0,0,0,262,260,1,0,
        0,0,263,267,5,124,0,0,264,267,5,119,0,0,265,267,5,57,0,0,266,255,
        1,0,0,0,266,263,1,0,0,0,266,264,1,0,0,0,266,265,1,0,0,0,267,21,1,
        0,0,0,268,269,5,29,0,0,269,23,1,0,0,0,270,280,5,128,0,0,271,275,
        5,124,0,0,272,274,5,124,0,0,273,272,1,0,0,0,274,277,1,0,0,0,275,
        273,1,0,0,0,275,276,1,0,0,0,276,280,1,0,0,0,277,275,1,0,0,0,278,
        280,5,129,0,0,279,270,1,0,0,0,279,271,1,0,0,0,279,278,1,0,0,0,280,
        25,1,0,0,0,281,282,5,38,0,0,282,27,1,0,0,0,283,285,5,57,0,0,284,
        283,1,0,0,0,284,285,1,0,0,0,285,286,1,0,0,0,286,306,3,32,16,0,287,
        289,5,12,0,0,288,290,3,34,17,0,289,288,1,0,0,0,290,291,1,0,0,0,291,
        289,1,0,0,0,291,292,1,0,0,0,292,294,1,0,0,0,293,287,1,0,0,0,293,
        294,1,0,0,0,294,298,1,0,0,0,295,297,3,30,15,0,296,295,1,0,0,0,297,
        300,1,0,0,0,298,296,1,0,0,0,298,299,1,0,0,0,299,302,1,0,0,0,300,
        298,1,0,0,0,301,303,5,51,0,0,302,301,1,0,0,0,302,303,1,0,0,0,303,
        304,1,0,0,0,304,306,3,32,16,0,305,284,1,0,0,0,305,293,1,0,0,0,306,
        307,1,0,0,0,307,308,5,92,0,0,308,29,1,0,0,0,309,311,3,44,22,0,310,
        309,1,0,0,0,311,312,1,0,0,0,312,310,1,0,0,0,312,313,1,0,0,0,313,
        314,1,0,0,0,314,315,5,22,0,0,315,324,1,0,0,0,316,318,3,60,30,0,317,
        316,1,0,0,0,318,319,1,0,0,0,319,317,1,0,0,0,319,320,1,0,0,0,320,
        321,1,0,0,0,321,322,7,5,0,0,322,324,1,0,0,0,323,310,1,0,0,0,323,
        317,1,0,0,0,324,31,1,0,0,0,325,326,5,30,0,0,326,327,3,36,18,0,327,
        33,1,0,0,0,328,329,7,6,0,0,329,35,1,0,0,0,330,331,6,18,-1,0,331,
        338,5,124,0,0,332,338,5,129,0,0,333,334,5,112,0,0,334,335,3,36,18,
        0,335,336,5,113,0,0,336,338,1,0,0,0,337,330,1,0,0,0,337,332,1,0,
        0,0,337,333,1,0,0,0,338,346,1,0,0,0,339,341,10,1,0,0,340,342,5,67,
        0,0,341,340,1,0,0,0,341,342,1,0,0,0,342,343,1,0,0,0,343,345,3,36,
        18,2,344,339,1,0,0,0,345,348,1,0,0,0,346,344,1,0,0,0,346,347,1,0,
        0,0,347,37,1,0,0,0,348,346,1,0,0,0,349,351,7,7,0,0,350,349,1,0,0,
        0,350,351,1,0,0,0,351,352,1,0,0,0,352,357,5,66,0,0,353,354,3,104,
        52,0,354,355,5,66,0,0,355,357,1,0,0,0,356,350,1,0,0,0,356,353,1,
        0,0,0,357,39,1,0,0,0,358,359,7,8,0,0,359,360,5,91,0,0,360,41,1,0,
        0,0,361,366,3,48,24,0,362,366,3,50,25,0,363,366,3,64,32,0,364,366,
        3,66,33,0,365,361,1,0,0,0,365,362,1,0,0,0,365,363,1,0,0,0,365,364,
        1,0,0,0,366,43,1,0,0,0,367,368,7,9,0,0,368,45,1,0,0,0,369,371,3,
        44,22,0,370,369,1,0,0,0,371,374,1,0,0,0,372,370,1,0,0,0,372,373,
        1,0,0,0,373,376,1,0,0,0,374,372,1,0,0,0,375,377,3,82,41,0,376,375,
        1,0,0,0,376,377,1,0,0,0,377,378,1,0,0,0,378,379,3,104,52,0,379,381,
        5,112,0,0,380,382,3,52,26,0,381,380,1,0,0,0,381,382,1,0,0,0,382,
        383,1,0,0,0,383,384,5,113,0,0,384,47,1,0,0,0,385,386,3,46,23,0,386,
        387,5,92,0,0,387,49,1,0,0,0,388,389,3,46,23,0,389,390,3,120,60,0,
        390,51,1,0,0,0,391,401,5,52,0,0,392,397,3,54,27,0,393,394,5,93,0,
        0,394,396,3,54,27,0,395,393,1,0,0,0,396,399,1,0,0,0,397,395,1,0,
        0,0,397,398,1,0,0,0,398,401,1,0,0,0,399,397,1,0,0,0,400,391,1,0,
        0,0,400,392,1,0,0,0,401,53,1,0,0,0,402,404,4,27,4,1,403,405,5,65,
        0,0,404,403,1,0,0,0,404,405,1,0,0,0,405,407,1,0,0,0,406,408,3,84,
        42,0,407,406,1,0,0,0,407,408,1,0,0,0,408,409,1,0,0,0,409,416,3,104,
        52,0,410,411,5,97,0,0,411,417,3,92,46,0,412,413,4,27,5,0,413,414,
        5,91,0,0,414,417,3,108,54,0,415,417,5,94,0,0,416,410,1,0,0,0,416,
        412,1,0,0,0,416,415,1,0,0,0,416,417,1,0,0,0,417,443,1,0,0,0,418,
        420,4,27,6,1,419,421,5,65,0,0,420,419,1,0,0,0,420,421,1,0,0,0,421,
        422,1,0,0,0,422,424,3,84,42,0,423,425,5,82,0,0,424,423,1,0,0,0,424,
        425,1,0,0,0,425,427,1,0,0,0,426,428,3,104,52,0,427,426,1,0,0,0,427,
        428,1,0,0,0,428,430,1,0,0,0,429,431,5,94,0,0,430,429,1,0,0,0,430,
        431,1,0,0,0,431,443,1,0,0,0,432,434,5,65,0,0,433,432,1,0,0,0,433,
        434,1,0,0,0,434,436,1,0,0,0,435,437,3,84,42,0,436,435,1,0,0,0,436,
        437,1,0,0,0,437,439,1,0,0,0,438,440,5,82,0,0,439,438,1,0,0,0,439,
        440,1,0,0,0,440,441,1,0,0,0,441,443,3,104,52,0,442,402,1,0,0,0,442,
        418,1,0,0,0,442,433,1,0,0,0,443,55,1,0,0,0,444,445,3,84,42,0,445,
        450,5,129,0,0,446,447,5,93,0,0,447,449,5,129,0,0,448,446,1,0,0,0,
        449,452,1,0,0,0,450,448,1,0,0,0,450,451,1,0,0,0,451,453,1,0,0,0,
        452,450,1,0,0,0,453,454,5,92,0,0,454,57,1,0,0,0,455,456,5,129,0,
        0,456,457,5,91,0,0,457,460,3,92,46,0,458,460,3,92,46,0,459,455,1,
        0,0,0,459,458,1,0,0,0,460,59,1,0,0,0,461,462,7,10,0,0,462,61,1,0,
        0,0,463,464,5,57,0,0,464,63,1,0,0,0,465,466,4,32,7,0,466,468,3,62,
        31,0,467,465,1,0,0,0,467,468,1,0,0,0,468,469,1,0,0,0,469,470,7,11,
        0,0,470,474,5,129,0,0,471,472,5,112,0,0,472,473,5,129,0,0,473,475,
        5,113,0,0,474,471,1,0,0,0,474,475,1,0,0,0,475,476,1,0,0,0,476,480,
        5,114,0,0,477,479,3,56,28,0,478,477,1,0,0,0,479,482,1,0,0,0,480,
        478,1,0,0,0,480,481,1,0,0,0,481,483,1,0,0,0,482,480,1,0,0,0,483,
        485,5,115,0,0,484,486,5,92,0,0,485,484,1,0,0,0,485,486,1,0,0,0,486,
        65,1,0,0,0,487,488,3,68,34,0,488,489,5,92,0,0,489,67,1,0,0,0,490,
        492,3,60,30,0,491,490,1,0,0,0,492,495,1,0,0,0,493,491,1,0,0,0,493,
        494,1,0,0,0,494,497,1,0,0,0,495,493,1,0,0,0,496,498,3,84,42,0,497,
        496,1,0,0,0,497,498,1,0,0,0,498,500,1,0,0,0,499,501,5,124,0,0,500,
        499,1,0,0,0,500,501,1,0,0,0,501,502,1,0,0,0,502,507,3,70,35,0,503,
        504,5,93,0,0,504,506,3,70,35,0,505,503,1,0,0,0,506,509,1,0,0,0,507,
        505,1,0,0,0,507,508,1,0,0,0,508,69,1,0,0,0,509,507,1,0,0,0,510,513,
        3,72,36,0,511,512,5,97,0,0,512,514,3,74,37,0,513,511,1,0,0,0,513,
        514,1,0,0,0,514,71,1,0,0,0,515,517,5,69,0,0,516,515,1,0,0,0,517,
        520,1,0,0,0,518,516,1,0,0,0,518,519,1,0,0,0,519,521,1,0,0,0,520,
        518,1,0,0,0,521,522,3,104,52,0,522,73,1,0,0,0,523,527,3,86,43,0,
        524,527,3,90,45,0,525,527,3,92,46,0,526,523,1,0,0,0,526,524,1,0,
        0,0,526,525,1,0,0,0,527,75,1,0,0,0,528,529,7,12,0,0,529,77,1,0,0,
        0,530,532,5,112,0,0,531,533,3,160,80,0,532,531,1,0,0,0,532,533,1,
        0,0,0,533,534,1,0,0,0,534,535,5,113,0,0,535,79,1,0,0,0,536,537,7,
        11,0,0,537,538,5,129,0,0,538,81,1,0,0,0,539,540,3,84,42,0,540,83,
        1,0,0,0,541,548,3,76,38,0,542,543,5,76,0,0,543,544,3,82,41,0,544,
        545,5,77,0,0,545,548,1,0,0,0,546,548,3,80,40,0,547,541,1,0,0,0,547,
        542,1,0,0,0,547,546,1,0,0,0,548,550,1,0,0,0,549,551,5,41,0,0,550,
        549,1,0,0,0,550,551,1,0,0,0,551,555,1,0,0,0,552,554,5,69,0,0,553,
        552,1,0,0,0,554,557,1,0,0,0,555,553,1,0,0,0,555,556,1,0,0,0,556,
        564,1,0,0,0,557,555,1,0,0,0,558,560,5,69,0,0,559,558,1,0,0,0,560,
        561,1,0,0,0,561,559,1,0,0,0,561,562,1,0,0,0,562,564,1,0,0,0,563,
        547,1,0,0,0,563,559,1,0,0,0,564,569,1,0,0,0,565,566,5,83,0,0,566,
        568,3,84,42,0,567,565,1,0,0,0,568,571,1,0,0,0,569,567,1,0,0,0,569,
        570,1,0,0,0,570,85,1,0,0,0,571,569,1,0,0,0,572,573,5,112,0,0,573,
        588,5,114,0,0,574,576,3,92,46,0,575,577,5,94,0,0,576,575,1,0,0,0,
        576,577,1,0,0,0,577,585,1,0,0,0,578,579,5,93,0,0,579,581,3,92,46,
        0,580,582,5,94,0,0,581,580,1,0,0,0,581,582,1,0,0,0,582,584,1,0,0,
        0,583,578,1,0,0,0,584,587,1,0,0,0,585,583,1,0,0,0,585,586,1,0,0,
        0,586,589,1,0,0,0,587,585,1,0,0,0,588,574,1,0,0,0,588,589,1,0,0,
        0,589,591,1,0,0,0,590,592,5,93,0,0,591,590,1,0,0,0,591,592,1,0,0,
        0,592,593,1,0,0,0,593,594,5,115,0,0,594,595,5,113,0,0,595,87,1,0,
        0,0,596,606,3,92,46,0,597,598,5,91,0,0,598,603,3,92,46,0,599,600,
        5,92,0,0,600,602,3,92,46,0,601,599,1,0,0,0,602,605,1,0,0,0,603,601,
        1,0,0,0,603,604,1,0,0,0,604,607,1,0,0,0,605,603,1,0,0,0,606,597,
        1,0,0,0,606,607,1,0,0,0,607,89,1,0,0,0,608,609,5,110,0,0,609,614,
        3,88,44,0,610,611,5,93,0,0,611,613,3,88,44,0,612,610,1,0,0,0,613,
        616,1,0,0,0,614,612,1,0,0,0,614,615,1,0,0,0,615,618,1,0,0,0,616,
        614,1,0,0,0,617,619,5,93,0,0,618,617,1,0,0,0,618,619,1,0,0,0,619,
        620,1,0,0,0,620,621,5,117,0,0,621,622,5,113,0,0,622,633,1,0,0,0,
        623,624,5,110,0,0,624,625,5,91,0,0,625,626,3,92,46,0,626,627,5,117,
        0,0,627,628,5,113,0,0,628,633,1,0,0,0,629,630,5,110,0,0,630,631,
        5,117,0,0,631,633,5,113,0,0,632,608,1,0,0,0,632,623,1,0,0,0,632,
        629,1,0,0,0,633,91,1,0,0,0,634,635,3,98,49,0,635,93,1,0,0,0,636,
        646,3,108,54,0,637,642,3,98,49,0,638,639,5,93,0,0,639,641,3,98,49,
        0,640,638,1,0,0,0,641,644,1,0,0,0,642,640,1,0,0,0,642,643,1,0,0,
        0,643,646,1,0,0,0,644,642,1,0,0,0,645,636,1,0,0,0,645,637,1,0,0,
        0,646,95,1,0,0,0,647,648,7,13,0,0,648,97,1,0,0,0,649,650,4,49,8,
        1,650,652,7,14,0,0,651,649,1,0,0,0,651,652,1,0,0,0,652,657,1,0,0,
        0,653,658,3,116,58,0,654,658,3,100,50,0,655,658,3,114,57,0,656,658,
        3,108,54,0,657,653,1,0,0,0,657,654,1,0,0,0,657,655,1,0,0,0,657,656,
        1,0,0,0,658,701,1,0,0,0,659,660,4,49,9,1,660,661,7,15,0,0,661,700,
        3,98,49,0,662,663,4,49,10,1,663,664,7,16,0,0,664,700,3,98,49,0,665,
        666,4,49,11,1,666,667,7,17,0,0,667,700,3,98,49,0,668,669,4,49,12,
        1,669,670,7,18,0,0,670,700,3,98,49,0,671,672,4,49,13,1,672,673,7,
        19,0,0,673,700,3,98,49,0,674,675,4,49,14,1,675,676,5,82,0,0,676,
        700,3,98,49,0,677,678,4,49,15,1,678,679,5,84,0,0,679,700,3,98,49,
        0,680,681,4,49,16,1,681,682,5,83,0,0,682,700,3,98,49,0,683,684,4,
        49,17,1,684,685,5,88,0,0,685,700,3,98,49,0,686,687,4,49,18,1,687,
        688,5,89,0,0,688,700,3,98,49,0,689,690,4,49,19,1,690,691,5,90,0,
        0,691,692,3,98,49,0,692,693,5,91,0,0,693,694,3,98,49,0,694,700,1,
        0,0,0,695,696,4,49,20,1,696,697,3,96,48,0,697,698,3,98,49,0,698,
        700,1,0,0,0,699,659,1,0,0,0,699,662,1,0,0,0,699,665,1,0,0,0,699,
        668,1,0,0,0,699,671,1,0,0,0,699,674,1,0,0,0,699,677,1,0,0,0,699,
        680,1,0,0,0,699,683,1,0,0,0,699,686,1,0,0,0,699,689,1,0,0,0,699,
        695,1,0,0,0,700,703,1,0,0,0,701,699,1,0,0,0,701,702,1,0,0,0,702,
        99,1,0,0,0,703,701,1,0,0,0,704,706,3,38,19,0,705,704,1,0,0,0,705,
        706,1,0,0,0,706,707,1,0,0,0,707,711,3,102,51,0,708,710,3,110,55,
        0,709,708,1,0,0,0,710,713,1,0,0,0,711,709,1,0,0,0,711,712,1,0,0,
        0,712,735,1,0,0,0,713,711,1,0,0,0,714,726,3,78,39,0,715,726,5,72,
        0,0,716,726,5,73,0,0,717,719,5,111,0,0,718,720,3,154,77,0,719,718,
        1,0,0,0,719,720,1,0,0,0,720,721,1,0,0,0,721,726,3,78,39,0,722,723,
        7,20,0,0,723,726,5,129,0,0,724,726,5,129,0,0,725,714,1,0,0,0,725,
        715,1,0,0,0,725,716,1,0,0,0,725,717,1,0,0,0,725,722,1,0,0,0,725,
        724,1,0,0,0,726,730,1,0,0,0,727,729,3,110,55,0,728,727,1,0,0,0,729,
        732,1,0,0,0,730,728,1,0,0,0,730,731,1,0,0,0,731,734,1,0,0,0,732,
        730,1,0,0,0,733,725,1,0,0,0,734,737,1,0,0,0,735,733,1,0,0,0,735,
        736,1,0,0,0,736,101,1,0,0,0,737,735,1,0,0,0,738,789,3,156,78,0,739,
        743,5,124,0,0,740,742,5,124,0,0,741,740,1,0,0,0,742,745,1,0,0,0,
        743,741,1,0,0,0,743,744,1,0,0,0,744,789,1,0,0,0,745,743,1,0,0,0,
        746,789,3,104,52,0,747,748,4,51,21,0,748,749,5,112,0,0,749,750,5,
        7,0,0,750,755,5,129,0,0,751,752,5,93,0,0,752,754,3,58,29,0,753,751,
        1,0,0,0,754,757,1,0,0,0,755,753,1,0,0,0,755,756,1,0,0,0,756,758,
        1,0,0,0,757,755,1,0,0,0,758,777,5,113,0,0,759,760,4,51,22,0,760,
        761,5,112,0,0,761,770,5,128,0,0,762,767,3,58,29,0,763,764,5,93,0,
        0,764,766,3,58,29,0,765,763,1,0,0,0,766,769,1,0,0,0,767,765,1,0,
        0,0,767,768,1,0,0,0,768,771,1,0,0,0,769,767,1,0,0,0,770,762,1,0,
        0,0,770,771,1,0,0,0,771,773,1,0,0,0,772,774,5,93,0,0,773,772,1,0,
        0,0,773,774,1,0,0,0,774,775,1,0,0,0,775,777,5,113,0,0,776,747,1,
        0,0,0,776,759,1,0,0,0,777,789,1,0,0,0,778,781,5,112,0,0,779,782,
        3,94,47,0,780,782,3,68,34,0,781,779,1,0,0,0,781,780,1,0,0,0,782,
        783,1,0,0,0,783,784,5,113,0,0,784,789,1,0,0,0,785,789,3,86,43,0,
        786,789,3,90,45,0,787,789,3,106,53,0,788,738,1,0,0,0,788,739,1,0,
        0,0,788,746,1,0,0,0,788,776,1,0,0,0,788,778,1,0,0,0,788,785,1,0,
        0,0,788,786,1,0,0,0,788,787,1,0,0,0,789,103,1,0,0,0,790,791,7,21,
        0,0,791,105,1,0,0,0,792,793,5,5,0,0,793,794,5,112,0,0,794,799,3,
        92,46,0,795,796,5,93,0,0,796,798,3,92,46,0,797,795,1,0,0,0,798,801,
        1,0,0,0,799,797,1,0,0,0,799,800,1,0,0,0,800,806,1,0,0,0,801,799,
        1,0,0,0,802,803,5,92,0,0,803,805,5,129,0,0,804,802,1,0,0,0,805,808,
        1,0,0,0,806,804,1,0,0,0,806,807,1,0,0,0,807,809,1,0,0,0,808,806,
        1,0,0,0,809,810,5,113,0,0,810,814,1,0,0,0,811,812,5,5,0,0,812,814,
        3,120,60,0,813,792,1,0,0,0,813,811,1,0,0,0,814,107,1,0,0,0,815,816,
        4,54,23,0,816,817,5,112,0,0,817,818,5,91,0,0,818,823,3,92,46,0,819,
        820,5,93,0,0,820,822,3,92,46,0,821,819,1,0,0,0,822,825,1,0,0,0,823,
        821,1,0,0,0,823,824,1,0,0,0,824,826,1,0,0,0,825,823,1,0,0,0,826,
        827,5,91,0,0,827,828,5,113,0,0,828,853,1,0,0,0,829,830,5,112,0,0,
        830,838,5,91,0,0,831,839,3,92,46,0,832,834,3,118,59,0,833,832,1,
        0,0,0,834,837,1,0,0,0,835,833,1,0,0,0,835,836,1,0,0,0,836,839,1,
        0,0,0,837,835,1,0,0,0,838,831,1,0,0,0,838,835,1,0,0,0,839,840,1,
        0,0,0,840,841,5,91,0,0,841,853,5,113,0,0,842,844,5,23,0,0,843,845,
        3,82,41,0,844,843,1,0,0,0,844,845,1,0,0,0,845,846,1,0,0,0,846,848,
        5,112,0,0,847,849,3,52,26,0,848,847,1,0,0,0,848,849,1,0,0,0,849,
        850,1,0,0,0,850,851,5,113,0,0,851,853,3,120,60,0,852,815,1,0,0,0,
        852,829,1,0,0,0,852,842,1,0,0,0,853,109,1,0,0,0,854,856,5,116,0,
        0,855,857,5,76,0,0,856,855,1,0,0,0,856,857,1,0,0,0,857,858,1,0,0,
        0,858,861,3,92,46,0,859,860,5,93,0,0,860,862,3,92,46,0,861,859,1,
        0,0,0,861,862,1,0,0,0,862,863,1,0,0,0,863,864,5,117,0,0,864,881,
        1,0,0,0,865,867,5,116,0,0,866,868,5,76,0,0,867,866,1,0,0,0,867,868,
        1,0,0,0,868,870,1,0,0,0,869,871,3,92,46,0,870,869,1,0,0,0,870,871,
        1,0,0,0,871,872,1,0,0,0,872,874,5,95,0,0,873,875,5,76,0,0,874,873,
        1,0,0,0,874,875,1,0,0,0,875,877,1,0,0,0,876,878,3,92,46,0,877,876,
        1,0,0,0,877,878,1,0,0,0,878,879,1,0,0,0,879,881,5,117,0,0,880,854,
        1,0,0,0,880,865,1,0,0,0,881,111,1,0,0,0,882,883,5,116,0,0,883,885,
        5,76,0,0,884,886,5,95,0,0,885,884,1,0,0,0,885,886,1,0,0,0,886,888,
        1,0,0,0,887,889,5,76,0,0,888,887,1,0,0,0,888,889,1,0,0,0,889,896,
        1,0,0,0,890,891,5,116,0,0,891,893,5,95,0,0,892,894,5,76,0,0,893,
        892,1,0,0,0,893,894,1,0,0,0,894,896,1,0,0,0,895,882,1,0,0,0,895,
        890,1,0,0,0,896,113,1,0,0,0,897,899,5,24,0,0,898,897,1,0,0,0,898,
        899,1,0,0,0,899,900,1,0,0,0,900,917,5,126,0,0,901,902,5,24,0,0,902,
        914,5,127,0,0,903,915,7,22,0,0,904,915,3,110,55,0,905,915,3,112,
        56,0,906,910,7,23,0,0,907,908,5,90,0,0,908,910,5,86,0,0,909,906,
        1,0,0,0,909,907,1,0,0,0,910,915,1,0,0,0,911,912,5,112,0,0,912,915,
        7,24,0,0,913,915,3,92,46,0,914,903,1,0,0,0,914,904,1,0,0,0,914,905,
        1,0,0,0,914,909,1,0,0,0,914,911,1,0,0,0,914,913,1,0,0,0,915,917,
        1,0,0,0,916,898,1,0,0,0,916,901,1,0,0,0,917,115,1,0,0,0,918,919,
        5,112,0,0,919,920,3,82,41,0,920,921,5,113,0,0,921,922,3,98,49,0,
        922,945,1,0,0,0,923,924,5,112,0,0,924,925,5,114,0,0,925,926,3,82,
        41,0,926,927,5,115,0,0,927,928,5,113,0,0,928,929,3,98,49,0,929,945,
        1,0,0,0,930,931,5,112,0,0,931,932,5,76,0,0,932,933,5,129,0,0,933,
        934,5,77,0,0,934,939,3,98,49,0,935,936,5,93,0,0,936,938,3,98,49,
        0,937,935,1,0,0,0,938,941,1,0,0,0,939,937,1,0,0,0,939,940,1,0,0,
        0,940,942,1,0,0,0,941,939,1,0,0,0,942,943,5,113,0,0,943,945,1,0,
        0,0,944,918,1,0,0,0,944,923,1,0,0,0,944,930,1,0,0,0,945,117,1,0,
        0,0,946,957,3,120,60,0,947,957,5,92,0,0,948,957,3,122,61,0,949,957,
        3,140,70,0,950,957,3,152,76,0,951,957,3,66,33,0,952,953,3,94,47,
        0,953,954,5,92,0,0,954,957,1,0,0,0,955,957,3,2,1,0,956,946,1,0,0,
        0,956,947,1,0,0,0,956,948,1,0,0,0,956,949,1,0,0,0,956,950,1,0,0,
        0,956,951,1,0,0,0,956,952,1,0,0,0,956,955,1,0,0,0,957,119,1,0,0,
        0,958,962,5,114,0,0,959,961,3,118,59,0,960,959,1,0,0,0,961,964,1,
        0,0,0,962,960,1,0,0,0,962,963,1,0,0,0,963,965,1,0,0,0,964,962,1,
        0,0,0,965,966,5,115,0,0,966,121,1,0,0,0,967,970,3,130,65,0,968,970,
        3,132,66,0,969,967,1,0,0,0,969,968,1,0,0,0,970,123,1,0,0,0,971,972,
        5,15,0,0,972,973,5,25,0,0,973,974,5,112,0,0,974,975,3,92,46,0,975,
        976,5,113,0,0,976,977,3,118,59,0,977,125,1,0,0,0,978,979,5,15,0,
        0,979,980,3,118,59,0,980,127,1,0,0,0,981,982,5,25,0,0,982,983,5,
        112,0,0,983,984,3,92,46,0,984,985,5,113,0,0,985,986,3,118,59,0,986,
        129,1,0,0,0,987,991,3,128,64,0,988,990,3,124,62,0,989,988,1,0,0,
        0,990,993,1,0,0,0,991,989,1,0,0,0,991,992,1,0,0,0,992,995,1,0,0,
        0,993,991,1,0,0,0,994,996,3,126,63,0,995,994,1,0,0,0,995,996,1,0,
        0,0,996,131,1,0,0,0,997,998,5,47,0,0,998,999,5,112,0,0,999,1000,
        3,92,46,0,1000,1001,5,113,0,0,1001,1005,5,114,0,0,1002,1004,3,66,
        33,0,1003,1002,1,0,0,0,1004,1007,1,0,0,0,1005,1003,1,0,0,0,1005,
        1006,1,0,0,0,1006,1012,1,0,0,0,1007,1005,1,0,0,0,1008,1011,3,136,
        68,0,1009,1011,3,138,69,0,1010,1008,1,0,0,0,1010,1009,1,0,0,0,1011,
        1014,1,0,0,0,1012,1010,1,0,0,0,1012,1013,1,0,0,0,1013,1015,1,0,0,
        0,1014,1012,1,0,0,0,1015,1016,5,115,0,0,1016,133,1,0,0,0,1017,1019,
        3,92,46,0,1018,1020,5,95,0,0,1019,1018,1,0,0,0,1019,1020,1,0,0,0,
        1020,1022,1,0,0,0,1021,1023,3,92,46,0,1022,1021,1,0,0,0,1022,1023,
        1,0,0,0,1023,1027,1,0,0,0,1024,1025,5,95,0,0,1025,1027,3,92,46,0,
        1026,1017,1,0,0,0,1026,1024,1,0,0,0,1027,135,1,0,0,0,1028,1029,5,
        4,0,0,1029,1030,3,134,67,0,1030,1034,5,91,0,0,1031,1033,3,118,59,
        0,1032,1031,1,0,0,0,1033,1036,1,0,0,0,1034,1032,1,0,0,0,1034,1035,
        1,0,0,0,1035,137,1,0,0,0,1036,1034,1,0,0,0,1037,1038,5,12,0,0,1038,
        1042,5,91,0,0,1039,1041,3,118,59,0,1040,1039,1,0,0,0,1041,1044,1,
        0,0,0,1042,1040,1,0,0,0,1042,1043,1,0,0,0,1043,139,1,0,0,0,1044,
        1042,1,0,0,0,1045,1046,5,54,0,0,1046,1047,5,112,0,0,1047,1048,3,
        92,46,0,1048,1051,5,113,0,0,1049,1052,3,118,59,0,1050,1052,5,92,
        0,0,1051,1049,1,0,0,0,1051,1050,1,0,0,0,1052,1078,1,0,0,0,1053,1054,
        5,13,0,0,1054,1055,3,118,59,0,1055,1056,5,54,0,0,1056,1057,5,112,
        0,0,1057,1058,3,92,46,0,1058,1059,5,113,0,0,1059,1060,5,92,0,0,1060,
        1078,1,0,0,0,1061,1062,5,20,0,0,1062,1063,5,112,0,0,1063,1064,3,
        142,71,0,1064,1067,5,113,0,0,1065,1068,3,118,59,0,1066,1068,5,92,
        0,0,1067,1065,1,0,0,0,1067,1066,1,0,0,0,1068,1078,1,0,0,0,1069,1070,
        5,21,0,0,1070,1071,5,112,0,0,1071,1072,3,144,72,0,1072,1075,5,113,
        0,0,1073,1076,3,118,59,0,1074,1076,5,92,0,0,1075,1073,1,0,0,0,1075,
        1074,1,0,0,0,1076,1078,1,0,0,0,1077,1045,1,0,0,0,1077,1053,1,0,0,
        0,1077,1061,1,0,0,0,1077,1069,1,0,0,0,1078,141,1,0,0,0,1079,1084,
        3,146,73,0,1080,1081,5,93,0,0,1081,1083,3,146,73,0,1082,1080,1,0,
        0,0,1083,1086,1,0,0,0,1084,1082,1,0,0,0,1084,1085,1,0,0,0,1085,1088,
        1,0,0,0,1086,1084,1,0,0,0,1087,1079,1,0,0,0,1087,1088,1,0,0,0,1088,
        1089,1,0,0,0,1089,1091,5,92,0,0,1090,1092,3,92,46,0,1091,1090,1,
        0,0,0,1091,1092,1,0,0,0,1092,1093,1,0,0,0,1093,1095,5,92,0,0,1094,
        1096,3,92,46,0,1095,1094,1,0,0,0,1095,1096,1,0,0,0,1096,1101,1,0,
        0,0,1097,1098,5,93,0,0,1098,1100,3,92,46,0,1099,1097,1,0,0,0,1100,
        1103,1,0,0,0,1101,1099,1,0,0,0,1101,1102,1,0,0,0,1102,143,1,0,0,
        0,1103,1101,1,0,0,0,1104,1109,3,148,74,0,1105,1106,5,93,0,0,1106,
        1108,3,148,74,0,1107,1105,1,0,0,0,1108,1111,1,0,0,0,1109,1107,1,
        0,0,0,1109,1110,1,0,0,0,1110,1112,1,0,0,0,1111,1109,1,0,0,0,1112,
        1113,7,25,0,0,1113,1116,3,92,46,0,1114,1115,5,95,0,0,1115,1117,3,
        92,46,0,1116,1114,1,0,0,0,1116,1117,1,0,0,0,1117,145,1,0,0,0,1118,
        1120,3,76,38,0,1119,1118,1,0,0,0,1119,1120,1,0,0,0,1120,1121,1,0,
        0,0,1121,1126,3,72,36,0,1122,1123,5,97,0,0,1123,1127,3,74,37,0,1124,
        1127,5,72,0,0,1125,1127,5,73,0,0,1126,1122,1,0,0,0,1126,1124,1,0,
        0,0,1126,1125,1,0,0,0,1126,1127,1,0,0,0,1127,1130,1,0,0,0,1128,1130,
        3,92,46,0,1129,1119,1,0,0,0,1129,1128,1,0,0,0,1130,147,1,0,0,0,1131,
        1133,3,82,41,0,1132,1131,1,0,0,0,1132,1133,1,0,0,0,1133,1134,1,0,
        0,0,1134,1135,3,72,36,0,1135,149,1,0,0,0,1136,1138,5,40,0,0,1137,
        1139,3,94,47,0,1138,1137,1,0,0,0,1138,1139,1,0,0,0,1139,1140,1,0,
        0,0,1140,1141,5,92,0,0,1141,151,1,0,0,0,1142,1143,5,1,0,0,1143,1148,
        5,92,0,0,1144,1145,5,10,0,0,1145,1148,5,92,0,0,1146,1148,3,150,75,
        0,1147,1142,1,0,0,0,1147,1144,1,0,0,0,1147,1146,1,0,0,0,1148,153,
        1,0,0,0,1149,1156,5,129,0,0,1150,1151,5,112,0,0,1151,1152,3,92,46,
        0,1152,1153,5,113,0,0,1153,1156,1,0,0,0,1154,1156,5,124,0,0,1155,
        1149,1,0,0,0,1155,1150,1,0,0,0,1155,1154,1,0,0,0,1156,155,1,0,0,
        0,1157,1158,7,26,0,0,1158,157,1,0,0,0,1159,1161,7,27,0,0,1160,1159,
        1,0,0,0,1160,1161,1,0,0,0,1161,1162,1,0,0,0,1162,1164,3,92,46,0,
        1163,1165,5,94,0,0,1164,1163,1,0,0,0,1164,1165,1,0,0,0,1165,159,
        1,0,0,0,1166,1173,3,158,79,0,1167,1169,5,93,0,0,1168,1170,3,158,
        79,0,1169,1168,1,0,0,0,1169,1170,1,0,0,0,1170,1172,1,0,0,0,1171,
        1167,1,0,0,0,1172,1175,1,0,0,0,1173,1171,1,0,0,0,1173,1174,1,0,0,
        0,1174,1188,1,0,0,0,1175,1173,1,0,0,0,1176,1177,4,80,24,0,1177,1184,
        3,80,40,0,1178,1179,5,93,0,0,1179,1180,5,129,0,0,1180,1181,5,91,
        0,0,1181,1183,3,92,46,0,1182,1178,1,0,0,0,1183,1186,1,0,0,0,1184,
        1182,1,0,0,0,1184,1185,1,0,0,0,1185,1188,1,0,0,0,1186,1184,1,0,0,
        0,1187,1166,1,0,0,0,1187,1176,1,0,0,0,1188,161,1,0,0,0,161,167,169,
        187,190,197,205,214,222,231,235,242,247,253,260,266,275,279,284,
        291,293,298,302,305,312,319,323,337,341,346,350,356,365,372,376,
        381,397,400,404,407,416,420,424,427,430,433,436,439,442,450,459,
        467,474,480,485,493,497,500,507,513,518,526,532,547,550,555,561,
        563,569,576,581,585,588,591,603,606,614,618,632,642,645,651,657,
        699,701,705,711,719,725,730,735,743,755,767,770,773,776,781,788,
        799,806,813,823,835,838,844,848,852,856,861,867,870,874,877,880,
        885,888,893,895,898,909,914,916,939,944,956,962,969,991,995,1005,
        1010,1012,1019,1022,1026,1034,1042,1051,1067,1075,1077,1084,1087,
        1091,1095,1101,1109,1116,1119,1126,1129,1132,1138,1147,1155,1160,
        1164,1169,1173,1184,1187
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
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
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

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
    public static readonly DEFAULT = 11;
    public static readonly DO = 12;
    public static readonly ECHO = 13;
    public static readonly ELSE = 14;
    public static readonly ELIF = 15;
    public static readonly ENDIF = 16;
    public static readonly ENUM = 17;
    public static readonly FLOAT = 18;
    public static readonly FOR = 19;
    public static readonly FOREACH = 20;
    public static readonly FUNCTIONS = 21;
    public static readonly FUNCTION = 22;
    public static readonly HASH = 23;
    public static readonly IF = 24;
    public static readonly IFDEF = 25;
    public static readonly IFNDEF = 26;
    public static readonly IN = 27;
    public static readonly INCLUDE = 28;
    public static readonly INHERIT = 29;
    public static readonly INT = 30;
    public static readonly LINE = 31;
    public static readonly LWOBJECT = 32;
    public static readonly MAPPING = 33;
    public static readonly MIXED = 34;
    public static readonly OBJECT = 35;
    public static readonly PRAGMA = 36;
    public static readonly RETURN = 37;
    public static readonly STATUS = 38;
    public static readonly STRUCTS = 39;
    public static readonly STRUCT = 40;
    public static readonly STRING = 41;
    public static readonly SYMBOL = 42;
    public static readonly SWITCH = 43;
    public static readonly TYPEDEF = 44;
    public static readonly UNDEF = 45;
    public static readonly VARIABLES = 46;
    public static readonly VIRTUAL = 47;
    public static readonly VOID = 48;
    public static readonly VOLATILE = 49;
    public static readonly WHILE = 50;
    public static readonly DEPRECATED = 51;
    public static readonly PRIVATE = 52;
    public static readonly PROTECTED = 53;
    public static readonly PUBLIC = 54;
    public static readonly STATIC = 55;
    public static readonly VISIBLE = 56;
    public static readonly NOSHADOW = 57;
    public static readonly NOSAVE = 58;
    public static readonly NOMASK = 59;
    public static readonly VARARGS = 60;
    public static readonly SUPER_ACCESSOR = 61;
    public static readonly PLUS = 62;
    public static readonly MINUS = 63;
    public static readonly STAR = 64;
    public static readonly DIV = 65;
    public static readonly MOD = 66;
    public static readonly INC = 67;
    public static readonly DEC = 68;
    public static readonly SHL = 69;
    public static readonly SHR = 70;
    public static readonly LT = 71;
    public static readonly GT = 72;
    public static readonly LE = 73;
    public static readonly GE = 74;
    public static readonly EQ = 75;
    public static readonly NE = 76;
    public static readonly AND = 77;
    public static readonly OR = 78;
    public static readonly XOR = 79;
    public static readonly NOT = 80;
    public static readonly BNOT = 81;
    public static readonly AND_AND = 82;
    public static readonly OR_OR = 83;
    public static readonly QUESTION = 84;
    public static readonly COLON = 85;
    public static readonly SEMI = 86;
    public static readonly COMMA = 87;
    public static readonly TRIPPLEDOT = 88;
    public static readonly DOUBLEDOT = 89;
    public static readonly DOT = 90;
    public static readonly ASSIGN = 91;
    public static readonly ADD_ASSIGN = 92;
    public static readonly SUB_ASSIGN = 93;
    public static readonly MUL_ASSIGN = 94;
    public static readonly DIV_ASSIGN = 95;
    public static readonly MOD_ASSIGN = 96;
    public static readonly OR_ASSIGN = 97;
    public static readonly AND_ASSIGN = 98;
    public static readonly BITAND_ASSIGN = 99;
    public static readonly BITOR_ASSIGN = 100;
    public static readonly XOR_ASSIGN = 101;
    public static readonly SHL_ASSIGN = 102;
    public static readonly RSH_ASSIGN = 103;
    public static readonly MAPPING_OPEN = 104;
    public static readonly ARROW = 105;
    public static readonly PAREN_OPEN = 106;
    public static readonly PAREN_CLOSE = 107;
    public static readonly CURLY_OPEN = 108;
    public static readonly CURLY_CLOSE = 109;
    public static readonly SQUARE_OPEN = 110;
    public static readonly SQUARE_CLOSE = 111;
    public static readonly BACKSLASH = 112;
    public static readonly IntegerConstant = 113;
    public static readonly FloatingConstant = 114;
    public static readonly HexIntConstant = 115;
    public static readonly TextFormatDirective = 116;
    public static readonly STRING_START = 117;
    public static readonly StringLiteral = 118;
    public static readonly CharacterConstant = 119;
    public static readonly LAMBDA_IDENTIFIER = 120;
    public static readonly SINGLEQUOT = 121;
    public static readonly BracketedIdentifier = 122;
    public static readonly LoadObject = 123;
    public static readonly Identifier = 124;
    public static readonly COMMENT = 125;
    public static readonly LINE_COMMENT = 126;
    public static readonly DEFINE = 127;
    public static readonly WS = 128;
    public static readonly END_DEFINE = 129;
    public static readonly STRING_END = 130;
    public static readonly TEXT_FORMAT_END = 131;
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
    public static readonly RULE_directiveIncludeFile = 14;
    public static readonly RULE_directiveTypePragma = 15;
    public static readonly RULE_inheritStatement = 16;
    public static readonly RULE_inheritModifier = 17;
    public static readonly RULE_inherit = 18;
    public static readonly RULE_defaultModifier = 19;
    public static readonly RULE_inheritFile = 20;
    public static readonly RULE_inheritSuperExpression = 21;
    public static readonly RULE_globalModifierStatement = 22;
    public static readonly RULE_declaration = 23;
    public static readonly RULE_functionModifier = 24;
    public static readonly RULE_functionHeader = 25;
    public static readonly RULE_functionHeaderDeclaration = 26;
    public static readonly RULE_functionDeclaration = 27;
    public static readonly RULE_parameterList = 28;
    public static readonly RULE_parameter = 29;
    public static readonly RULE_structMemberDeclaration = 30;
    public static readonly RULE_structMemberInitializer = 31;
    public static readonly RULE_variableModifier = 32;
    public static readonly RULE_structModifier = 33;
    public static readonly RULE_structDeclaration = 34;
    public static readonly RULE_variableDeclarationStatement = 35;
    public static readonly RULE_variableDeclaration = 36;
    public static readonly RULE_variableDeclaratorExpression = 37;
    public static readonly RULE_variableDeclarator = 38;
    public static readonly RULE_variableInitializer = 39;
    public static readonly RULE_primitiveTypeSpecifier = 40;
    public static readonly RULE_methodInvocation = 41;
    public static readonly RULE_structTypeSpecifier = 42;
    public static readonly RULE_typeSpecifier = 43;
    public static readonly RULE_unionableTypeSpecifier = 44;
    public static readonly RULE_arrayExpression = 45;
    public static readonly RULE_mappingContent = 46;
    public static readonly RULE_mappingExpression = 47;
    public static readonly RULE_expression = 48;
    public static readonly RULE_commaableExpression = 49;
    public static readonly RULE_assignmentOperator = 50;
    public static readonly RULE_conditionalExpression = 51;
    public static readonly RULE_primaryExpression = 52;
    public static readonly RULE_primaryExpressionStart = 53;
    public static readonly RULE_validIdentifiers = 54;
    public static readonly RULE_catchExpr = 55;
    public static readonly RULE_inlineClosureExpression = 56;
    public static readonly RULE_bracketExpression = 57;
    public static readonly RULE_lambdaArrayIndexor = 58;
    public static readonly RULE_lambdaExpression = 59;
    public static readonly RULE_castExpression = 60;
    public static readonly RULE_statement = 61;
    public static readonly RULE_block = 62;
    public static readonly RULE_selectionStatement = 63;
    public static readonly RULE_elseIfExpression = 64;
    public static readonly RULE_elseExpression = 65;
    public static readonly RULE_ifExpression = 66;
    public static readonly RULE_ifStatement = 67;
    public static readonly RULE_switchStatement = 68;
    public static readonly RULE_caseExpression = 69;
    public static readonly RULE_caseOperators = 70;
    public static readonly RULE_caseCondition = 71;
    public static readonly RULE_caseStatement = 72;
    public static readonly RULE_defaultStatement = 73;
    public static readonly RULE_iterationStatement = 74;
    public static readonly RULE_forRangeExpression = 75;
    public static readonly RULE_foreachRangeExpression = 76;
    public static readonly RULE_forVariable = 77;
    public static readonly RULE_forEachVariable = 78;
    public static readonly RULE_returnStatement = 79;
    public static readonly RULE_jumpStatement = 80;
    public static readonly RULE_callOtherTarget = 81;
    public static readonly RULE_literal = 82;
    public static readonly RULE_argument = 83;
    public static readonly RULE_argumentList = 84;

    public static readonly literalNames = [
        null, "'break'", "'buffer'", "'bytes'", "'case'", "'catch'", "'char'", 
        "'class'", "'closure'", "'const'", "'continue'", "'default'", "'do'", 
        "'#echo'", "'else'", "'elif'", "'endif'", "'enum'", "'float'", "'for'", 
        "'foreach'", "'functions'", "'function'", "'#'", "'if'", "'ifdef'", 
        "'ifndef'", "'in'", "'include'", "'inherit'", "'int'", "'#line'", 
        "'lwobject'", "'mapping'", "'mixed'", "'object'", "'pragma'", "'return'", 
        "'status'", "'structs'", "'struct'", "'string'", "'symbol'", "'switch'", 
        "'typedef'", "'undef'", "'variables'", "'virtual'", "'void'", "'volatile'", 
        "'while'", "'deprecated'", "'private'", "'protected'", "'public'", 
        "'static'", "'visible'", "'noshadow'", "'nosave'", "'nomask'", "'varargs'", 
        "'::'", "'+'", "'-'", "'*'", "'/'", "'%'", "'++'", "'--'", "'<<'", 
        "'>>'", "'<'", "'>'", "'<='", "'>='", "'=='", "'!='", "'&'", "'|'", 
        "'^'", "'!'", "'~'", "'&&'", "'||'", "'?'", "':'", "';'", "','", 
        "'...'", "'..'", "'.'", "'='", "'+='", "'-='", "'*='", "'/='", "'%='", 
        "'||='", "'&&='", "'&='", "'|='", "'^='", "'<<='", "'>>='", null, 
        "'->'", "'('", "')'", "'{'", "'}'", "'['", "']'", "'\\'", null, 
        null, null, null, null, null, null, null, "'''", null, "'load_object'"
    ];

    public static readonly symbolicNames = [
        null, "BREAK", "BUFFER", "BYTES", "CASE", "CATCH", "CHAR", "CLASS", 
        "CLOSURE", "CONST", "CONTINUE", "DEFAULT", "DO", "ECHO", "ELSE", 
        "ELIF", "ENDIF", "ENUM", "FLOAT", "FOR", "FOREACH", "FUNCTIONS", 
        "FUNCTION", "HASH", "IF", "IFDEF", "IFNDEF", "IN", "INCLUDE", "INHERIT", 
        "INT", "LINE", "LWOBJECT", "MAPPING", "MIXED", "OBJECT", "PRAGMA", 
        "RETURN", "STATUS", "STRUCTS", "STRUCT", "STRING", "SYMBOL", "SWITCH", 
        "TYPEDEF", "UNDEF", "VARIABLES", "VIRTUAL", "VOID", "VOLATILE", 
        "WHILE", "DEPRECATED", "PRIVATE", "PROTECTED", "PUBLIC", "STATIC", 
        "VISIBLE", "NOSHADOW", "NOSAVE", "NOMASK", "VARARGS", "SUPER_ACCESSOR", 
        "PLUS", "MINUS", "STAR", "DIV", "MOD", "INC", "DEC", "SHL", "SHR", 
        "LT", "GT", "LE", "GE", "EQ", "NE", "AND", "OR", "XOR", "NOT", "BNOT", 
        "AND_AND", "OR_OR", "QUESTION", "COLON", "SEMI", "COMMA", "TRIPPLEDOT", 
        "DOUBLEDOT", "DOT", "ASSIGN", "ADD_ASSIGN", "SUB_ASSIGN", "MUL_ASSIGN", 
        "DIV_ASSIGN", "MOD_ASSIGN", "OR_ASSIGN", "AND_ASSIGN", "BITAND_ASSIGN", 
        "BITOR_ASSIGN", "XOR_ASSIGN", "SHL_ASSIGN", "RSH_ASSIGN", "MAPPING_OPEN", 
        "ARROW", "PAREN_OPEN", "PAREN_CLOSE", "CURLY_OPEN", "CURLY_CLOSE", 
        "SQUARE_OPEN", "SQUARE_CLOSE", "BACKSLASH", "IntegerConstant", "FloatingConstant", 
        "HexIntConstant", "TextFormatDirective", "STRING_START", "StringLiteral", 
        "CharacterConstant", "LAMBDA_IDENTIFIER", "SINGLEQUOT", "BracketedIdentifier", 
        "LoadObject", "Identifier", "COMMENT", "LINE_COMMENT", "DEFINE", 
        "WS", "END_DEFINE", "STRING_END", "TEXT_FORMAT_END"
    ];
    public static readonly ruleNames = [
        "program", "preprocessorDirective", "includePreprocessorDirective", 
        "definePreprocessorDirective", "selectionPreprocessorDirective", 
        "selectionPreprocessorDirectiveTypeSingle", "selectionPreprocessorDirectiveTypeWithArg", 
        "directiveIfTestExpression", "directiveIfArgument", "directiveTypeWithArguments", 
        "directiveArgument", "directiveDefineParam", "directiveDefineArgument", 
        "directiveTypeInclude", "directiveIncludeFile", "directiveTypePragma", 
        "inheritStatement", "inheritModifier", "inherit", "defaultModifier", 
        "inheritFile", "inheritSuperExpression", "globalModifierStatement", 
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
            this.state = 177;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 175;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context) ) {
                    case 1:
                        {
                        this.state = 170;
                        this.declaration();
                        }
                        break;
                    case 2:
                        {
                        this.state = 171;
                        this.preprocessorDirective();
                        }
                        break;
                    case 3:
                        {
                        this.state = 172;
                        this.inheritStatement();
                        }
                        break;
                    case 4:
                        {
                        this.state = 173;
                        if (!( this.isFluff() )) {
                            throw this.createFailedPredicateException(" this.isFluff() ");
                        }
                        this.state = 174;
                        this.globalModifierStatement();
                        }
                        break;
                    }
                    }
                }
                this.state = 179;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            }
            this.state = 180;
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
            this.state = 198;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 182;
                this.selectionPreprocessorDirective();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 183;
                this.directiveTypeWithArguments();
                this.state = 184;
                this.directiveArgument();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 186;
                this.definePreprocessorDirective();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 187;
                this.includePreprocessorDirective();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 188;
                this.match(LPCParser.HASH);
                this.state = 189;
                this.directiveTypePragma();
                this.state = 190;
                this.match(LPCParser.Identifier);
                this.state = 195;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 191;
                        this.match(LPCParser.COMMA);
                        this.state = 192;
                        this.match(LPCParser.Identifier);
                        }
                        }
                    }
                    this.state = 197;
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
            this.state = 200;
            this.match(LPCParser.HASH);
            this.state = 201;
            this.directiveTypeInclude();
            this.state = 202;
            this.directiveIncludeFile();
            this.state = 205;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                {
                this.state = 203;
                if (!( this.isFluff() )) {
                    throw this.createFailedPredicateException(" this.isFluff() ");
                }
                this.state = 204;
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
            this.state = 207;
            this.match(LPCParser.DEFINE);
            this.state = 208;
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
            this.state = 222;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 210;
                this.match(LPCParser.HASH);
                this.state = 211;
                this.selectionPreprocessorDirectiveTypeWithArg();
                this.state = 213;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 80) {
                    {
                    this.state = 212;
                    this.match(LPCParser.NOT);
                    }
                }

                this.state = 215;
                this.directiveArgument();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 217;
                this.match(LPCParser.HASH);
                this.state = 218;
                _la = this.tokenStream.LA(1);
                if(!(_la === 15 || _la === 24)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 219;
                this.directiveIfTestExpression(0);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 220;
                this.match(LPCParser.HASH);
                this.state = 221;
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
            this.state = 224;
            _la = this.tokenStream.LA(1);
            if(!(_la === 14 || _la === 16)) {
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
            this.state = 226;
            _la = this.tokenStream.LA(1);
            if(!(_la === 25 || _la === 26)) {
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
            this.state = 230;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
            case 1:
                {
                this.state = 229;
                this.match(LPCParser.NOT);
                }
                break;
            }
            this.state = 232;
            this.directiveIfArgument();
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 243;
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
                    this.state = 234;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 237;
                    this.errorHandler.sync(this);
                    alternative = 1;
                    do {
                        switch (alternative) {
                        case 1:
                            {
                            {
                            this.state = 235;
                            _la = this.tokenStream.LA(1);
                            if(!(((((_la - 71)) & ~0x1F) === 0 && ((1 << (_la - 71)) & 6207) !== 0))) {
                            this.errorHandler.recoverInline(this);
                            }
                            else {
                                this.errorHandler.reportMatch(this);
                                this.consume();
                            }
                            this.state = 236;
                            this.directiveIfTestExpression(0);
                            }
                            }
                            break;
                        default:
                            throw new antlr.NoViableAltException(this);
                        }
                        this.state = 239;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 8, this.context);
                    } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                    }
                    }
                }
                this.state = 245;
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
            this.state = 255;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 11, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 246;
                this.match(LPCParser.Identifier);
                this.state = 250;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
                case 1:
                    {
                    this.state = 247;
                    this.match(LPCParser.PAREN_OPEN);
                    this.state = 248;
                    _la = this.tokenStream.LA(1);
                    if(!(((((_la - 113)) & ~0x1F) === 0 && ((1 << (_la - 113)) & 2081) !== 0))) {
                    this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 249;
                    this.match(LPCParser.PAREN_CLOSE);
                    }
                    break;
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 252;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 253;
                this.match(LPCParser.IntegerConstant);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 254;
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
            this.state = 261;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.HASH:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 257;
                this.match(LPCParser.HASH);
                this.state = 258;
                this.match(LPCParser.UNDEF);
                }
                break;
            case LPCParser.ECHO:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 259;
                this.match(LPCParser.ECHO);
                }
                break;
            case LPCParser.LINE:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 260;
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
            this.state = 274;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 263;
                this.match(LPCParser.Identifier);
                this.state = 268;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 13, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 264;
                        this.match(LPCParser.MINUS);
                        this.state = 265;
                        this.match(LPCParser.Identifier);
                        }
                        }
                    }
                    this.state = 270;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 13, this.context);
                }
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 271;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case LPCParser.IntegerConstant:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 272;
                this.match(LPCParser.IntegerConstant);
                }
                break;
            case LPCParser.PRIVATE:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 273;
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
    public directiveDefineParam(): DirectiveDefineParamContext {
        let localContext = new DirectiveDefineParamContext(this.context, this.state);
        this.enterRule(localContext, 22, LPCParser.RULE_directiveDefineParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 276;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 277;
            this.match(LPCParser.Identifier);
            this.state = 282;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 87) {
                {
                {
                this.state = 278;
                this.match(LPCParser.COMMA);
                this.state = 279;
                this.match(LPCParser.Identifier);
                }
                }
                this.state = 284;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 285;
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
            this.state = 287;
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
            this.state = 289;
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
        this.enterRule(localContext, 28, LPCParser.RULE_directiveIncludeFile);
        try {
            let alternative: number;
            this.state = 300;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BracketedIdentifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 291;
                localContext._globalFile = this.match(LPCParser.BracketedIdentifier);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 292;
                localContext._localFile = this.match(LPCParser.StringLiteral);
                this.state = 296;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 16, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 293;
                        this.match(LPCParser.StringLiteral);
                        }
                        }
                    }
                    this.state = 298;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 16, this.context);
                }
                }
                break;
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 299;
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
        this.enterRule(localContext, 30, LPCParser.RULE_directiveTypePragma);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 302;
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
        this.enterRule(localContext, 32, LPCParser.RULE_inheritStatement);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 326;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 23, this.context) ) {
            case 1:
                {
                this.state = 305;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 52) {
                    {
                    this.state = 304;
                    this.match(LPCParser.PRIVATE);
                    }
                }

                this.state = 307;
                this.inherit();
                }
                break;
            case 2:
                {
                this.state = 314;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 11) {
                    {
                    this.state = 308;
                    this.match(LPCParser.DEFAULT);
                    this.state = 310;
                    this.errorHandler.sync(this);
                    alternative = 1;
                    do {
                        switch (alternative) {
                        case 1:
                            {
                            {
                            this.state = 309;
                            this.defaultModifier();
                            }
                            }
                            break;
                        default:
                            throw new antlr.NoViableAltException(this);
                        }
                        this.state = 312;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 19, this.context);
                    } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                    }
                }

                this.state = 319;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 1023) !== 0)) {
                    {
                    {
                    this.state = 316;
                    this.inheritModifier();
                    }
                    }
                    this.state = 321;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 323;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 47) {
                    {
                    this.state = 322;
                    this.match(LPCParser.VIRTUAL);
                    }
                }

                this.state = 325;
                this.inherit();
                }
                break;
            }
            this.state = 328;
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
        this.enterRule(localContext, 34, LPCParser.RULE_inheritModifier);
        let _la: number;
        try {
            this.state = 344;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 26, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 331;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                do {
                    {
                    {
                    this.state = 330;
                    this.functionModifier();
                    }
                    }
                    this.state = 333;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                } while (((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 895) !== 0));
                this.state = 335;
                this.match(LPCParser.FUNCTIONS);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 338;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                do {
                    {
                    {
                    this.state = 337;
                    this.variableModifier();
                    }
                    }
                    this.state = 340;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                } while (((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 479) !== 0));
                this.state = 342;
                _la = this.tokenStream.LA(1);
                if(!(_la === 39 || _la === 46)) {
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
        this.enterRule(localContext, 36, LPCParser.RULE_inherit);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 346;
            this.match(LPCParser.INHERIT);
            this.state = 347;
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
        this.enterRule(localContext, 38, LPCParser.RULE_defaultModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 349;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 31) !== 0))) {
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
        let _startState = 40;
        this.enterRecursionRule(localContext, 40, LPCParser.RULE_inheritFile, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 358;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.StringLiteral:
                {
                this.state = 352;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case LPCParser.Identifier:
                {
                this.state = 353;
                this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.PAREN_OPEN:
                {
                this.state = 354;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 355;
                this.inheritFile(0);
                this.state = 356;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 367;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 29, this.context);
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
                    this.state = 360;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 362;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 62) {
                        {
                        this.state = 361;
                        this.match(LPCParser.PLUS);
                        }
                    }

                    this.state = 364;
                    this.inheritFile(2);
                    }
                    }
                }
                this.state = 369;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 29, this.context);
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
        this.enterRule(localContext, 42, LPCParser.RULE_inheritSuperExpression);
        let _la: number;
        try {
            this.state = 377;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 31, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 371;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 35 || _la === 118 || _la === 124) {
                    {
                    this.state = 370;
                    localContext._filename = this.tokenStream.LT(1);
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 35 || _la === 118 || _la === 124)) {
                        localContext._filename = this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    }
                }

                this.state = 373;
                this.match(LPCParser.SUPER_ACCESSOR);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 374;
                localContext._validIdFilename = this.validIdentifiers();
                this.state = 375;
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
        this.enterRule(localContext, 44, LPCParser.RULE_globalModifierStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 379;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 7) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 380;
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
        this.enterRule(localContext, 46, LPCParser.RULE_declaration);
        try {
            this.state = 386;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 32, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 382;
                this.functionHeaderDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 383;
                this.functionDeclaration();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 384;
                this.structDeclaration();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 385;
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
            this.state = 388;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 895) !== 0))) {
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
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 393;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 33, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 390;
                    this.functionModifier();
                    }
                    }
                }
                this.state = 395;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 33, this.context);
            }
            this.state = 397;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 34, this.context) ) {
            case 1:
                {
                this.state = 396;
                this.typeSpecifier();
                }
                break;
            }
            this.state = 399;
            localContext._functionName = this.validIdentifiers();
            this.state = 400;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 402;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 35, this.context) ) {
            case 1:
                {
                this.state = 401;
                localContext._functionArgs = this.parameterList(true);
                }
                break;
            }
            this.state = 404;
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
            this.state = 406;
            this.functionHeader();
            this.state = 407;
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
            this.state = 409;
            this.functionHeader();
            this.state = 410;
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
        this.enterRule(localContext, 56, LPCParser.RULE_parameterList);
        let _la: number;
        try {
            this.state = 421;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 37, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 412;
                this.match(LPCParser.VOID);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 413;
                this.parameter(_isHeader);
                this.state = 418;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 87) {
                    {
                    {
                    this.state = 414;
                    this.match(LPCParser.COMMA);
                    this.state = 415;
                    this.parameter(_isHeader);
                    }
                    }
                    this.state = 420;
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
        this.enterRule(localContext, 58, LPCParser.RULE_parameter);
        let _la: number;
        try {
            this.state = 457;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 46, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 423;
                if (!(localContext?._isHeader!==false)) {
                    throw this.createFailedPredicateException("$_isHeader==false");
                }
                this.state = 425;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 38, this.context) ) {
                case 1:
                    {
                    this.state = 424;
                    this.match(LPCParser.VARARGS);
                    }
                    break;
                }
                this.state = 428;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 39, this.context) ) {
                case 1:
                    {
                    this.state = 427;
                    localContext._paramType = this.unionableTypeSpecifier();
                    }
                    break;
                }
                this.state = 430;
                localContext._paramName = this.validIdentifiers();
                this.state = 437;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 40, this.context) ) {
                case 1:
                    {
                    this.state = 431;
                    this.match(LPCParser.ASSIGN);
                    this.state = 432;
                    this.expression();
                    }
                    break;
                case 2:
                    {
                    this.state = 433;
                    if (!( this.isFluff() )) {
                        throw this.createFailedPredicateException(" this.isFluff() ");
                    }
                    this.state = 434;
                    this.match(LPCParser.COLON);
                    this.state = 435;
                    this.inlineClosureExpression();
                    }
                    break;
                case 3:
                    {
                    this.state = 436;
                    this.match(LPCParser.TRIPPLEDOT);
                    }
                    break;
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 439;
                if (!(localContext?._isHeader! && this.isFluff())) {
                    throw this.createFailedPredicateException("$_isHeader && this.isFluff()");
                }
                this.state = 441;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 60) {
                    {
                    this.state = 440;
                    this.match(LPCParser.VARARGS);
                    }
                }

                this.state = 443;
                localContext._paramType = this.unionableTypeSpecifier();
                this.state = 445;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 42, this.context) ) {
                case 1:
                    {
                    this.state = 444;
                    localContext._paramName = this.validIdentifiers();
                    }
                    break;
                }
                this.state = 448;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 88) {
                    {
                    this.state = 447;
                    this.match(LPCParser.TRIPPLEDOT);
                    }
                }

                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 451;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 44, this.context) ) {
                case 1:
                    {
                    this.state = 450;
                    this.match(LPCParser.VARARGS);
                    }
                    break;
                }
                this.state = 454;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 45, this.context) ) {
                case 1:
                    {
                    this.state = 453;
                    localContext._paramType = this.unionableTypeSpecifier();
                    }
                    break;
                }
                this.state = 456;
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
        this.enterRule(localContext, 60, LPCParser.RULE_structMemberDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 459;
            this.unionableTypeSpecifier();
            this.state = 460;
            this.match(LPCParser.Identifier);
            this.state = 465;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 87) {
                {
                {
                this.state = 461;
                this.match(LPCParser.COMMA);
                this.state = 462;
                this.match(LPCParser.Identifier);
                }
                }
                this.state = 467;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 468;
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
        this.enterRule(localContext, 62, LPCParser.RULE_structMemberInitializer);
        try {
            this.state = 474;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 48, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 470;
                this.match(LPCParser.Identifier);
                this.state = 471;
                this.match(LPCParser.COLON);
                this.state = 472;
                this.expression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 473;
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
        this.enterRule(localContext, 64, LPCParser.RULE_variableModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 476;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 479) !== 0))) {
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
        this.enterRule(localContext, 66, LPCParser.RULE_structModifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 478;
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
        this.enterRule(localContext, 68, LPCParser.RULE_structDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 482;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 49, this.context) ) {
            case 1:
                {
                this.state = 480;
                if (!(this.isFluff())) {
                    throw this.createFailedPredicateException("this.isFluff()");
                }
                this.state = 481;
                this.structModifier();
                }
                break;
            }
            this.state = 484;
            _la = this.tokenStream.LA(1);
            if(!(_la === 7 || _la === 40)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 485;
            localContext._structName = this.match(LPCParser.Identifier);
            this.state = 489;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 106) {
                {
                this.state = 486;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 487;
                localContext._structInherits = this.match(LPCParser.Identifier);
                this.state = 488;
                this.match(LPCParser.PAREN_CLOSE);
                }
            }

            this.state = 491;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 495;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1078198732) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 67407) !== 0) || _la === 64 || _la === 71) {
                {
                {
                this.state = 492;
                this.structMemberDeclaration();
                }
                }
                this.state = 497;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 498;
            this.match(LPCParser.CURLY_CLOSE);
            this.state = 500;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 52, this.context) ) {
            case 1:
                {
                this.state = 499;
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
        this.enterRule(localContext, 70, LPCParser.RULE_variableDeclarationStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 502;
            this.variableDeclaration();
            this.state = 503;
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
        this.enterRule(localContext, 72, LPCParser.RULE_variableDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 508;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 479) !== 0)) {
                {
                {
                this.state = 505;
                this.variableModifier();
                }
                }
                this.state = 510;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 511;
            localContext._type_ = this.unionableTypeSpecifier();
            this.state = 513;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 54, this.context) ) {
            case 1:
                {
                this.state = 512;
                localContext._objectName = this.match(LPCParser.StringLiteral);
                }
                break;
            }
            this.state = 516;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 55, this.context) ) {
            case 1:
                {
                this.state = 515;
                this.variableDeclaratorExpression();
                }
                break;
            }
            this.state = 522;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 87) {
                {
                {
                this.state = 518;
                this.match(LPCParser.COMMA);
                this.state = 519;
                this.variableDeclaratorExpression();
                }
                }
                this.state = 524;
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
        this.enterRule(localContext, 74, LPCParser.RULE_variableDeclaratorExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 525;
            this.variableDeclarator();
            this.state = 528;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 91) {
                {
                this.state = 526;
                this.match(LPCParser.ASSIGN);
                this.state = 527;
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
        this.enterRule(localContext, 76, LPCParser.RULE_variableDeclarator);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 533;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 58, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 530;
                    localContext._arraySpecifier = this.match(LPCParser.STAR);
                    }
                    }
                }
                this.state = 535;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 58, this.context);
            }
            this.state = 536;
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
        this.enterRule(localContext, 78, LPCParser.RULE_variableInitializer);
        try {
            this.state = 541;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 59, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 538;
                this.arrayExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 539;
                this.mappingExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 540;
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
        this.enterRule(localContext, 80, LPCParser.RULE_primitiveTypeSpecifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 543;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 1078198604) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 67151) !== 0))) {
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
        this.enterRule(localContext, 82, LPCParser.RULE_methodInvocation);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 545;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 547;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 60, this.context) ) {
            case 1:
                {
                this.state = 546;
                this.argumentList();
                }
                break;
            }
            this.state = 549;
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
        this.enterRule(localContext, 84, LPCParser.RULE_structTypeSpecifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 551;
            _la = this.tokenStream.LA(1);
            if(!(_la === 7 || _la === 40)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 552;
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
        this.enterRule(localContext, 86, LPCParser.RULE_typeSpecifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 554;
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
        this.enterRule(localContext, 88, LPCParser.RULE_unionableTypeSpecifier);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 575;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BUFFER:
            case LPCParser.BYTES:
            case LPCParser.CHAR:
            case LPCParser.CLASS:
            case LPCParser.CLOSURE:
            case LPCParser.FLOAT:
            case LPCParser.FUNCTION:
            case LPCParser.INT:
            case LPCParser.LWOBJECT:
            case LPCParser.MAPPING:
            case LPCParser.MIXED:
            case LPCParser.OBJECT:
            case LPCParser.STATUS:
            case LPCParser.STRUCT:
            case LPCParser.STRING:
            case LPCParser.SYMBOL:
            case LPCParser.VOID:
            case LPCParser.LT:
                {
                {
                this.state = 562;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.BUFFER:
                case LPCParser.BYTES:
                case LPCParser.CHAR:
                case LPCParser.CLOSURE:
                case LPCParser.FLOAT:
                case LPCParser.FUNCTION:
                case LPCParser.INT:
                case LPCParser.LWOBJECT:
                case LPCParser.MAPPING:
                case LPCParser.MIXED:
                case LPCParser.OBJECT:
                case LPCParser.STATUS:
                case LPCParser.STRING:
                case LPCParser.SYMBOL:
                case LPCParser.VOID:
                    {
                    this.state = 556;
                    this.primitiveTypeSpecifier();
                    }
                    break;
                case LPCParser.LT:
                    {
                    this.state = 557;
                    this.match(LPCParser.LT);
                    this.state = 558;
                    this.typeSpecifier();
                    this.state = 559;
                    this.match(LPCParser.GT);
                    }
                    break;
                case LPCParser.CLASS:
                case LPCParser.STRUCT:
                    {
                    this.state = 561;
                    this.structTypeSpecifier();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 567;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 62, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 564;
                        this.match(LPCParser.STAR);
                        }
                        }
                    }
                    this.state = 569;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 62, this.context);
                }
                }
                }
                break;
            case LPCParser.STAR:
                {
                this.state = 571;
                this.errorHandler.sync(this);
                alternative = 1;
                do {
                    switch (alternative) {
                    case 1:
                        {
                        {
                        this.state = 570;
                        this.match(LPCParser.STAR);
                        }
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    this.state = 573;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 63, this.context);
                } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 581;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 65, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 577;
                    this.match(LPCParser.OR);
                    this.state = 578;
                    this.unionableTypeSpecifier();
                    }
                    }
                }
                this.state = 583;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 65, this.context);
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
        this.enterRule(localContext, 90, LPCParser.RULE_arrayExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 584;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 585;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 600;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 69, this.context) ) {
            case 1:
                {
                this.state = 586;
                this.expression();
                this.state = 588;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 88) {
                    {
                    this.state = 587;
                    this.match(LPCParser.TRIPPLEDOT);
                    }
                }

                this.state = 597;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 68, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 590;
                        this.match(LPCParser.COMMA);
                        this.state = 591;
                        this.expression();
                        this.state = 593;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if (_la === 88) {
                            {
                            this.state = 592;
                            this.match(LPCParser.TRIPPLEDOT);
                            }
                        }

                        }
                        }
                    }
                    this.state = 599;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 68, this.context);
                }
                }
                break;
            }
            this.state = 603;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 87) {
                {
                this.state = 602;
                this.match(LPCParser.COMMA);
                }
            }

            this.state = 605;
            this.match(LPCParser.CURLY_CLOSE);
            this.state = 606;
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
        this.enterRule(localContext, 92, LPCParser.RULE_mappingContent);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 608;
            localContext._mappingKey = this.expression();
            this.state = 618;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 85) {
                {
                this.state = 609;
                this.match(LPCParser.COLON);
                this.state = 610;
                this.expression();
                this.state = 615;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 86) {
                    {
                    {
                    this.state = 611;
                    this.match(LPCParser.SEMI);
                    this.state = 612;
                    this.expression();
                    }
                    }
                    this.state = 617;
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
        this.enterRule(localContext, 94, LPCParser.RULE_mappingExpression);
        let _la: number;
        try {
            let alternative: number;
            this.state = 644;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 75, this.context) ) {
            case 1:
                localContext = new MappingValueInitializerContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 620;
                this.match(LPCParser.MAPPING_OPEN);
                {
                this.state = 621;
                this.mappingContent();
                this.state = 626;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 73, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 622;
                        this.match(LPCParser.COMMA);
                        this.state = 623;
                        this.mappingContent();
                        }
                        }
                    }
                    this.state = 628;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 73, this.context);
                }
                }
                this.state = 630;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 87) {
                    {
                    this.state = 629;
                    this.match(LPCParser.COMMA);
                    }
                }

                this.state = 632;
                this.match(LPCParser.SQUARE_CLOSE);
                this.state = 633;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 2:
                localContext = new MappingKeylessInitializerContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 635;
                this.match(LPCParser.MAPPING_OPEN);
                this.state = 636;
                this.match(LPCParser.COLON);
                this.state = 637;
                this.expression();
                this.state = 638;
                this.match(LPCParser.SQUARE_CLOSE);
                this.state = 639;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 3:
                localContext = new MappingEmptyInitializerContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 641;
                this.match(LPCParser.MAPPING_OPEN);
                this.state = 642;
                this.match(LPCParser.SQUARE_CLOSE);
                this.state = 643;
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
        this.enterRule(localContext, 96, LPCParser.RULE_expression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 646;
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
        this.enterRule(localContext, 98, LPCParser.RULE_commaableExpression);
        let _la: number;
        try {
            this.state = 657;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 77, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 648;
                this.inlineClosureExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 649;
                this.conditionalExpression(4);
                this.state = 654;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 87) {
                    {
                    {
                    this.state = 650;
                    localContext._op = this.match(LPCParser.COMMA);
                    this.state = 651;
                    this.conditionalExpression(4);
                    }
                    }
                    this.state = 656;
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
        this.enterRule(localContext, 100, LPCParser.RULE_assignmentOperator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 659;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 8191) !== 0))) {
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
        this.enterRule(localContext, 102, LPCParser.RULE_conditionalExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 667;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 78, this.context) ) {
            case 1:
                {
                this.state = 661;
                this.castExpression();
                }
                break;
            case 2:
                {
                this.state = 662;
                this.primaryExpression();
                }
                break;
            case 3:
                {
                this.state = 663;
                this.lambdaExpression();
                }
                break;
            case 4:
                {
                this.state = 664;
                this.inlineClosureExpression();
                }
                break;
            case 5:
                {
                this.state = 665;
                localContext._op = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!(((((_la - 62)) & ~0x1F) === 0 && ((1 << (_la - 62)) & 819303) !== 0))) {
                    localContext._op = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 666;
                this.conditionalExpression(localContext?._p!);
                }
                break;
            }
            this.state = 711;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 80, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 709;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 79, this.context) ) {
                    case 1:
                        {
                        this.state = 669;
                        if (!( 15 >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 15 >= $_p ");
                        }
                        this.state = 670;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 7) !== 0))) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 671;
                        this.conditionalExpression(16);
                        }
                        break;
                    case 2:
                        {
                        this.state = 672;
                        if (!( 14 >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 14 >= $_p ");
                        }
                        this.state = 673;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 62 || _la === 63)) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 674;
                        this.conditionalExpression(15);
                        }
                        break;
                    case 3:
                        {
                        this.state = 675;
                        if (!( 13 >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 13 >= $_p ");
                        }
                        this.state = 676;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 69 || _la === 70)) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 677;
                        this.conditionalExpression(14);
                        }
                        break;
                    case 4:
                        {
                        this.state = 678;
                        if (!( 12 >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 12 >= $_p ");
                        }
                        this.state = 679;
                        localContext._cond = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 71)) & ~0x1F) === 0 && ((1 << (_la - 71)) & 15) !== 0))) {
                            localContext._cond = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 680;
                        this.conditionalExpression(13);
                        }
                        break;
                    case 5:
                        {
                        this.state = 681;
                        if (!( 11 >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 11 >= $_p ");
                        }
                        this.state = 682;
                        localContext._cond = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 27 || _la === 75 || _la === 76)) {
                            localContext._cond = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 683;
                        this.conditionalExpression(12);
                        }
                        break;
                    case 6:
                        {
                        this.state = 684;
                        if (!( 10 >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 10 >= $_p ");
                        }
                        this.state = 685;
                        localContext._op = this.match(LPCParser.AND);
                        this.state = 686;
                        this.conditionalExpression(11);
                        }
                        break;
                    case 7:
                        {
                        this.state = 687;
                        if (!( 9  >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 9  >= $_p ");
                        }
                        this.state = 688;
                        localContext._op = this.match(LPCParser.XOR);
                        this.state = 689;
                        this.conditionalExpression(10);
                        }
                        break;
                    case 8:
                        {
                        this.state = 690;
                        if (!( 8  >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 8  >= $_p ");
                        }
                        this.state = 691;
                        localContext._op = this.match(LPCParser.OR);
                        this.state = 692;
                        this.conditionalExpression(9);
                        }
                        break;
                    case 9:
                        {
                        this.state = 693;
                        if (!( 7  >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 7  >= $_p ");
                        }
                        this.state = 694;
                        localContext._cond = this.match(LPCParser.AND_AND);
                        this.state = 695;
                        this.conditionalExpression(8);
                        }
                        break;
                    case 10:
                        {
                        this.state = 696;
                        if (!( 6  >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 6  >= $_p ");
                        }
                        this.state = 697;
                        localContext._cond = this.match(LPCParser.OR_OR);
                        this.state = 698;
                        this.conditionalExpression(7);
                        }
                        break;
                    case 11:
                        {
                        this.state = 699;
                        if (!( 5  >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 5  >= $_p ");
                        }
                        this.state = 700;
                        localContext._ternOp = this.match(LPCParser.QUESTION);
                        this.state = 701;
                        this.conditionalExpression(4);
                        this.state = 702;
                        localContext._ternOp2 = this.match(LPCParser.COLON);
                        this.state = 703;
                        this.conditionalExpression(4);
                        }
                        break;
                    case 12:
                        {
                        this.state = 705;
                        if (!( 4  >= localContext?._p! )) {
                            throw this.createFailedPredicateException(" 4  >= $_p ");
                        }
                        this.state = 706;
                        localContext._assignOp = this.assignmentOperator();
                        this.state = 707;
                        this.conditionalExpression(5);
                        }
                        break;
                    }
                    }
                }
                this.state = 713;
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
    public primaryExpression(): PrimaryExpressionContext {
        let localContext = new PrimaryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 104, LPCParser.RULE_primaryExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 715;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 81, this.context) ) {
            case 1:
                {
                this.state = 714;
                localContext._super_ = this.inheritSuperExpression();
                }
                break;
            }
            this.state = 717;
            localContext._pe = this.primaryExpressionStart();
            this.state = 721;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 82, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 718;
                    this.bracketExpression();
                    }
                    }
                }
                this.state = 723;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 82, this.context);
            }
            this.state = 745;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 86, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 735;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 84, this.context) ) {
                    case 1:
                        {
                        this.state = 724;
                        this.methodInvocation();
                        }
                        break;
                    case 2:
                        {
                        this.state = 725;
                        this.match(LPCParser.INC);
                        }
                        break;
                    case 3:
                        {
                        this.state = 726;
                        this.match(LPCParser.DEC);
                        }
                        break;
                    case 4:
                        {
                        {
                        this.state = 727;
                        this.match(LPCParser.ARROW);
                        this.state = 729;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 83, this.context) ) {
                        case 1:
                            {
                            this.state = 728;
                            localContext._target = this.callOtherTarget();
                            }
                            break;
                        }
                        this.state = 731;
                        localContext._invocation = this.methodInvocation();
                        }
                        }
                        break;
                    case 5:
                        {
                        {
                        this.state = 732;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 90 || _la === 105)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 733;
                        localContext._structMember = this.match(LPCParser.Identifier);
                        }
                        }
                        break;
                    case 6:
                        {
                        this.state = 734;
                        this.match(LPCParser.Identifier);
                        }
                        break;
                    }
                    this.state = 740;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 85, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 737;
                            this.bracketExpression();
                            }
                            }
                        }
                        this.state = 742;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 85, this.context);
                    }
                    }
                    }
                }
                this.state = 747;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 86, this.context);
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
        this.enterRule(localContext, 106, LPCParser.RULE_primaryExpressionStart);
        let _la: number;
        try {
            let alternative: number;
            this.state = 810;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 95, this.context) ) {
            case 1:
                localContext = new LiteralExpressionContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 748;
                this.literal();
                }
                break;
            case 2:
                localContext = new StringConcatExpressionContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 749;
                this.match(LPCParser.StringLiteral);
                this.state = 753;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 87, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 750;
                        this.match(LPCParser.StringLiteral);
                        }
                        }
                    }
                    this.state = 755;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 87, this.context);
                }
                }
                break;
            case 3:
                localContext = new CloneObjectExpressionContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                {
                this.state = 756;
                this.match(LPCParser.LoadObject);
                }
                this.state = 757;
                this.match(LPCParser.PAREN_OPEN);
                {
                this.state = 758;
                (localContext as CloneObjectExpressionContext)._ob = this.expression();
                }
                this.state = 763;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 87) {
                    {
                    {
                    this.state = 759;
                    this.match(LPCParser.COMMA);
                    this.state = 760;
                    this.expression();
                    }
                    }
                    this.state = 765;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 766;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 4:
                localContext = new IdentifierExpressionContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 768;
                this.validIdentifiers();
                }
                break;
            case 5:
                localContext = new StructInitializerExpressionContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 798;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 93, this.context) ) {
                case 1:
                    {
                    this.state = 769;
                    if (!( this.isFluff() )) {
                        throw this.createFailedPredicateException(" this.isFluff() ");
                    }
                    {
                    this.state = 770;
                    this.match(LPCParser.PAREN_OPEN);
                    this.state = 771;
                    this.match(LPCParser.CLASS);
                    this.state = 772;
                    (localContext as StructInitializerExpressionContext)._structName = this.match(LPCParser.Identifier);
                    this.state = 777;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 87) {
                        {
                        {
                        this.state = 773;
                        this.match(LPCParser.COMMA);
                        this.state = 774;
                        this.structMemberInitializer();
                        }
                        }
                        this.state = 779;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 780;
                    this.match(LPCParser.PAREN_CLOSE);
                    }
                    }
                    break;
                case 2:
                    {
                    this.state = 781;
                    if (!( this.isLD() )) {
                        throw this.createFailedPredicateException(" this.isLD() ");
                    }
                    {
                    this.state = 782;
                    this.match(LPCParser.PAREN_OPEN);
                    this.state = 783;
                    (localContext as StructInitializerExpressionContext)._structName = this.match(LPCParser.BracketedIdentifier);
                    this.state = 792;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 91, this.context) ) {
                    case 1:
                        {
                        this.state = 784;
                        this.structMemberInitializer();
                        this.state = 789;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 90, this.context);
                        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                            if (alternative === 1) {
                                {
                                {
                                this.state = 785;
                                this.match(LPCParser.COMMA);
                                this.state = 786;
                                this.structMemberInitializer();
                                }
                                }
                            }
                            this.state = 791;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 90, this.context);
                        }
                        }
                        break;
                    }
                    this.state = 795;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 87) {
                        {
                        this.state = 794;
                        this.match(LPCParser.COMMA);
                        }
                    }

                    this.state = 797;
                    this.match(LPCParser.PAREN_CLOSE);
                    }
                    }
                    break;
                }
                }
                break;
            case 6:
                localContext = new ParenExpressionContext(localContext);
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 800;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 803;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 94, this.context) ) {
                case 1:
                    {
                    this.state = 801;
                    this.commaableExpression();
                    }
                    break;
                case 2:
                    {
                    this.state = 802;
                    this.variableDeclaration();
                    }
                    break;
                }
                this.state = 805;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 7:
                localContext = new PrimaryArrayExpressionContext(localContext);
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 807;
                this.arrayExpression();
                }
                break;
            case 8:
                localContext = new PrimaryMappingExpressionContext(localContext);
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 808;
                this.mappingExpression();
                }
                break;
            case 9:
                localContext = new CatchExpressionContext(localContext);
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 809;
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
        this.enterRule(localContext, 108, LPCParser.RULE_validIdentifiers);
        try {
            this.state = 824;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 96, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 812;
                this.match(LPCParser.Identifier);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 813;
                this.match(LPCParser.BYTES);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 814;
                this.match(LPCParser.BUFFER);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 815;
                this.match(LPCParser.FUNCTIONS);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 816;
                this.match(LPCParser.VARIABLES);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 817;
                this.match(LPCParser.VISIBLE);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 818;
                this.match(LPCParser.STRUCTS);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 819;
                this.match(LPCParser.SYMBOL);
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 820;
                this.match(LPCParser.IN);
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 821;
                this.match(LPCParser.CHAR);
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 822;
                if (!( this.isFluff() )) {
                    throw this.createFailedPredicateException(" this.isFluff() ");
                }
                this.state = 823;
                this.match(LPCParser.CATCH);
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
    public catchExpr(): CatchExprContext {
        let localContext = new CatchExprContext(this.context, this.state);
        this.enterRule(localContext, 110, LPCParser.RULE_catchExpr);
        let _la: number;
        try {
            this.state = 847;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 99, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 826;
                this.match(LPCParser.CATCH);
                this.state = 827;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 828;
                this.expression();
                this.state = 833;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 87) {
                    {
                    {
                    this.state = 829;
                    this.match(LPCParser.COMMA);
                    this.state = 830;
                    this.expression();
                    }
                    }
                    this.state = 835;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 840;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 86) {
                    {
                    {
                    this.state = 836;
                    this.match(LPCParser.SEMI);
                    this.state = 837;
                    this.match(LPCParser.Identifier);
                    }
                    }
                    this.state = 842;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 843;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 845;
                this.match(LPCParser.CATCH);
                this.state = 846;
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
        this.enterRule(localContext, 112, LPCParser.RULE_inlineClosureExpression);
        let _la: number;
        try {
            let alternative: number;
            this.state = 886;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 105, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 849;
                if (!(this.isFluff())) {
                    throw this.createFailedPredicateException("this.isFluff()");
                }
                this.state = 850;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 851;
                this.match(LPCParser.COLON);
                this.state = 852;
                this.expression();
                this.state = 857;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 87) {
                    {
                    {
                    this.state = 853;
                    this.match(LPCParser.COMMA);
                    this.state = 854;
                    this.expression();
                    }
                    }
                    this.state = 859;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 860;
                this.match(LPCParser.COLON);
                this.state = 861;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 863;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 864;
                this.match(LPCParser.COLON);
                this.state = 872;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 102, this.context) ) {
                case 1:
                    {
                    this.state = 865;
                    this.expression();
                    }
                    break;
                case 2:
                    {
                    this.state = 869;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 101, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 866;
                            this.statement();
                            }
                            }
                        }
                        this.state = 871;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 101, this.context);
                    }
                    }
                    break;
                }
                this.state = 874;
                this.match(LPCParser.COLON);
                this.state = 875;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 876;
                this.match(LPCParser.FUNCTION);
                this.state = 878;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1078198732) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 67407) !== 0) || _la === 64 || _la === 71) {
                    {
                    this.state = 877;
                    this.typeSpecifier();
                    }
                }

                this.state = 880;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 882;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 104, this.context) ) {
                case 1:
                    {
                    this.state = 881;
                    this.parameterList(false);
                    }
                    break;
                }
                this.state = 884;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 885;
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
        this.enterRule(localContext, 114, LPCParser.RULE_bracketExpression);
        let _la: number;
        try {
            this.state = 914;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 112, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 888;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 890;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 106, this.context) ) {
                case 1:
                    {
                    this.state = 889;
                    this.match(LPCParser.LT);
                    }
                    break;
                }
                this.state = 892;
                this.expression();
                this.state = 895;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 87) {
                    {
                    this.state = 893;
                    this.match(LPCParser.COMMA);
                    this.state = 894;
                    this.expression();
                    }
                }

                this.state = 897;
                this.match(LPCParser.SQUARE_CLOSE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 899;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 901;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 108, this.context) ) {
                case 1:
                    {
                    this.state = 900;
                    this.match(LPCParser.LT);
                    }
                    break;
                }
                this.state = 904;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 109, this.context) ) {
                case 1:
                    {
                    this.state = 903;
                    this.expression();
                    }
                    break;
                }
                this.state = 906;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 908;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 110, this.context) ) {
                case 1:
                    {
                    this.state = 907;
                    this.match(LPCParser.LT);
                    }
                    break;
                }
                this.state = 911;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 111, this.context) ) {
                case 1:
                    {
                    this.state = 910;
                    this.expression();
                    }
                    break;
                }
                this.state = 913;
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
        this.enterRule(localContext, 116, LPCParser.RULE_lambdaArrayIndexor);
        try {
            this.state = 929;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 116, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 916;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 917;
                this.match(LPCParser.LT);
                this.state = 919;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 113, this.context) ) {
                case 1:
                    {
                    this.state = 918;
                    this.match(LPCParser.DOUBLEDOT);
                    }
                    break;
                }
                this.state = 922;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 114, this.context) ) {
                case 1:
                    {
                    this.state = 921;
                    this.match(LPCParser.LT);
                    }
                    break;
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 924;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 925;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 927;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 115, this.context) ) {
                case 1:
                    {
                    this.state = 926;
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
        this.enterRule(localContext, 118, LPCParser.RULE_lambdaExpression);
        let _la: number;
        try {
            this.state = 950;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 120, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 932;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 23) {
                    {
                    this.state = 931;
                    this.match(LPCParser.HASH);
                    }
                }

                this.state = 934;
                this.match(LPCParser.LAMBDA_IDENTIFIER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 935;
                this.match(LPCParser.HASH);
                this.state = 936;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 948;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 119, this.context) ) {
                case 1:
                    {
                    this.state = 937;
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 37 || _la === 50)) {
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
                    this.state = 938;
                    this.bracketExpression();
                    }
                    }
                    break;
                case 3:
                    {
                    {
                    this.state = 939;
                    this.lambdaArrayIndexor();
                    }
                    }
                    break;
                case 4:
                    {
                    this.state = 943;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 118, this.context) ) {
                    case 1:
                        {
                        this.state = 940;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 62)) & ~0x1F) === 0 && ((1 << (_la - 62)) & 3799515039) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 65791) !== 0))) {
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
                        this.state = 941;
                        this.match(LPCParser.QUESTION);
                        this.state = 942;
                        this.match(LPCParser.NOT);
                        }
                        break;
                    }
                    }
                    break;
                case 5:
                    {
                    {
                    this.state = 945;
                    this.match(LPCParser.PAREN_OPEN);
                    this.state = 946;
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 108 || _la === 110)) {
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
                    this.state = 947;
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
        this.enterRule(localContext, 120, LPCParser.RULE_castExpression);
        let _la: number;
        try {
            this.state = 978;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 122, this.context) ) {
            case 1:
                localContext = new PrimitiveTypeCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 952;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 953;
                this.typeSpecifier();
                this.state = 954;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 955;
                this.conditionalExpression(16);
                }
                break;
            case 2:
                localContext = new DeclarativeTypeCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 957;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 958;
                this.match(LPCParser.CURLY_OPEN);
                this.state = 959;
                this.typeSpecifier();
                this.state = 960;
                this.match(LPCParser.CURLY_CLOSE);
                this.state = 961;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 962;
                this.conditionalExpression(16);
                }
                break;
            case 3:
                localContext = new StructCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 964;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 965;
                this.match(LPCParser.LT);
                this.state = 966;
                this.match(LPCParser.Identifier);
                this.state = 967;
                this.match(LPCParser.GT);
                this.state = 968;
                this.conditionalExpression(16);
                this.state = 973;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 87) {
                    {
                    {
                    this.state = 969;
                    this.match(LPCParser.COMMA);
                    this.state = 970;
                    this.conditionalExpression(16);
                    }
                    }
                    this.state = 975;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 976;
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
        this.enterRule(localContext, 122, LPCParser.RULE_statement);
        try {
            this.state = 990;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 123, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 980;
                this.block();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 981;
                this.match(LPCParser.SEMI);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 982;
                this.selectionStatement();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 983;
                this.iterationStatement();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 984;
                this.jumpStatement();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 985;
                this.variableDeclarationStatement();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 986;
                this.commaableExpression();
                this.state = 987;
                this.match(LPCParser.SEMI);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 989;
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
        this.enterRule(localContext, 124, LPCParser.RULE_block);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 992;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 996;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 124, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 993;
                    this.statement();
                    }
                    }
                }
                this.state = 998;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 124, this.context);
            }
            this.state = 999;
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
        this.enterRule(localContext, 126, LPCParser.RULE_selectionStatement);
        try {
            this.state = 1003;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.IF:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1001;
                this.ifStatement();
                }
                break;
            case LPCParser.SWITCH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1002;
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
        this.enterRule(localContext, 128, LPCParser.RULE_elseIfExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1005;
            this.match(LPCParser.ELSE);
            this.state = 1006;
            this.match(LPCParser.IF);
            this.state = 1007;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 1008;
            this.expression();
            this.state = 1009;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 1010;
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
        this.enterRule(localContext, 130, LPCParser.RULE_elseExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1012;
            this.match(LPCParser.ELSE);
            this.state = 1013;
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
        this.enterRule(localContext, 132, LPCParser.RULE_ifExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1015;
            this.match(LPCParser.IF);
            this.state = 1016;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 1017;
            this.expression();
            this.state = 1018;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 1019;
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
        this.enterRule(localContext, 134, LPCParser.RULE_ifStatement);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1021;
            this.ifExpression();
            this.state = 1025;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 126, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1022;
                    this.elseIfExpression();
                    }
                    }
                }
                this.state = 1027;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 126, this.context);
            }
            this.state = 1029;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 127, this.context) ) {
            case 1:
                {
                this.state = 1028;
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
        this.enterRule(localContext, 136, LPCParser.RULE_switchStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1031;
            this.match(LPCParser.SWITCH);
            this.state = 1032;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 1033;
            this.expression();
            this.state = 1034;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 1035;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 1039;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1078198732) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 251201359) !== 0) || _la === 64 || _la === 71) {
                {
                {
                this.state = 1036;
                this.variableDeclarationStatement();
                }
                }
                this.state = 1041;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1046;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 4 || _la === 11) {
                {
                this.state = 1044;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.CASE:
                    {
                    this.state = 1042;
                    this.caseStatement();
                    }
                    break;
                case LPCParser.DEFAULT:
                    {
                    this.state = 1043;
                    this.defaultStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 1048;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1049;
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
        this.enterRule(localContext, 138, LPCParser.RULE_caseExpression);
        let _la: number;
        try {
            this.state = 1099;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 138, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1051;
                this.caseCondition();
                this.state = 1057;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 62)) & ~0x1F) === 0 && ((1 << (_la - 62)) & 15) !== 0)) {
                    {
                    {
                    this.state = 1052;
                    this.caseOperators();
                    this.state = 1053;
                    this.caseCondition();
                    }
                    }
                    this.state = 1059;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1070;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 89) {
                    {
                    this.state = 1060;
                    this.match(LPCParser.DOUBLEDOT);
                    this.state = 1061;
                    this.caseCondition();
                    this.state = 1067;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (((((_la - 62)) & ~0x1F) === 0 && ((1 << (_la - 62)) & 15) !== 0)) {
                        {
                        {
                        this.state = 1062;
                        this.caseOperators();
                        this.state = 1063;
                        this.caseCondition();
                        }
                        }
                        this.state = 1069;
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
                this.state = 1072;
                if (!( this.isFluff() )) {
                    throw this.createFailedPredicateException(" this.isFluff() ");
                }
                this.state = 1097;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.DOUBLEDOT:
                    {
                    {
                    this.state = 1073;
                    this.match(LPCParser.DOUBLEDOT);
                    this.state = 1074;
                    this.caseCondition();
                    this.state = 1080;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (((((_la - 62)) & ~0x1F) === 0 && ((1 << (_la - 62)) & 15) !== 0)) {
                        {
                        {
                        this.state = 1075;
                        this.caseOperators();
                        this.state = 1076;
                        this.caseCondition();
                        }
                        }
                        this.state = 1082;
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
                    this.state = 1084;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 135, this.context) ) {
                    case 1:
                        {
                        this.state = 1083;
                        this.match(LPCParser.MINUS);
                        }
                        break;
                    }
                    this.state = 1086;
                    this.caseCondition();
                    this.state = 1092;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (((((_la - 62)) & ~0x1F) === 0 && ((1 << (_la - 62)) & 15) !== 0)) {
                        {
                        {
                        this.state = 1087;
                        this.caseOperators();
                        this.state = 1088;
                        this.caseCondition();
                        }
                        }
                        this.state = 1094;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    this.state = 1095;
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
        this.enterRule(localContext, 140, LPCParser.RULE_caseOperators);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1101;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 62)) & ~0x1F) === 0 && ((1 << (_la - 62)) & 15) !== 0))) {
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
        this.enterRule(localContext, 142, LPCParser.RULE_caseCondition);
        let _la: number;
        try {
            this.state = 1111;
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
                this.state = 1104;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 63) {
                    {
                    this.state = 1103;
                    this.match(LPCParser.MINUS);
                    }
                }

                this.state = 1106;
                _la = this.tokenStream.LA(1);
                if(!(((((_la - 113)) & ~0x1F) === 0 && ((1 << (_la - 113)) & 2149) !== 0))) {
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
                this.state = 1107;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 1108;
                this.conditionalExpression(13);
                this.state = 1109;
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
        this.enterRule(localContext, 144, LPCParser.RULE_caseStatement);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1113;
            this.match(LPCParser.CASE);
            this.state = 1114;
            this.caseExpression();
            this.state = 1115;
            this.match(LPCParser.COLON);
            this.state = 1119;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 141, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1116;
                    this.statement();
                    }
                    }
                }
                this.state = 1121;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 141, this.context);
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
        this.enterRule(localContext, 146, LPCParser.RULE_defaultStatement);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1122;
            this.match(LPCParser.DEFAULT);
            this.state = 1123;
            this.match(LPCParser.COLON);
            this.state = 1127;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 142, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1124;
                    this.statement();
                    }
                    }
                }
                this.state = 1129;
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
    public iterationStatement(): IterationStatementContext {
        let localContext = new IterationStatementContext(this.context, this.state);
        this.enterRule(localContext, 148, LPCParser.RULE_iterationStatement);
        try {
            this.state = 1162;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.WHILE:
                localContext = new WhileStatementContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1130;
                this.match(LPCParser.WHILE);
                this.state = 1131;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 1132;
                this.expression();
                this.state = 1133;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 1136;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 143, this.context) ) {
                case 1:
                    {
                    this.state = 1134;
                    this.statement();
                    }
                    break;
                case 2:
                    {
                    this.state = 1135;
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
                this.state = 1138;
                this.match(LPCParser.DO);
                this.state = 1139;
                this.statement();
                this.state = 1140;
                this.match(LPCParser.WHILE);
                this.state = 1141;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 1142;
                this.expression();
                this.state = 1143;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 1144;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.FOR:
                localContext = new ForStatementContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1146;
                this.match(LPCParser.FOR);
                this.state = 1147;
                this.match(LPCParser.PAREN_OPEN);
                {
                this.state = 1148;
                this.forRangeExpression();
                }
                this.state = 1149;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 1152;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 144, this.context) ) {
                case 1:
                    {
                    this.state = 1150;
                    this.statement();
                    }
                    break;
                case 2:
                    {
                    this.state = 1151;
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
                this.state = 1154;
                this.match(LPCParser.FOREACH);
                this.state = 1155;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 1156;
                this.foreachRangeExpression();
                this.state = 1157;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 1160;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 145, this.context) ) {
                case 1:
                    {
                    this.state = 1158;
                    this.statement();
                    }
                    break;
                case 2:
                    {
                    this.state = 1159;
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
        this.enterRule(localContext, 150, LPCParser.RULE_forRangeExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1172;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 148, this.context) ) {
            case 1:
                {
                this.state = 1164;
                this.forVariable();
                this.state = 1169;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 87) {
                    {
                    {
                    this.state = 1165;
                    this.match(LPCParser.COMMA);
                    this.state = 1166;
                    this.forVariable();
                    }
                    }
                    this.state = 1171;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            }
            this.state = 1174;
            this.match(LPCParser.SEMI);
            this.state = 1176;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 149, this.context) ) {
            case 1:
                {
                this.state = 1175;
                this.expression();
                }
                break;
            }
            this.state = 1178;
            this.match(LPCParser.SEMI);
            this.state = 1180;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 150, this.context) ) {
            case 1:
                {
                this.state = 1179;
                this.expression();
                }
                break;
            }
            this.state = 1186;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 87) {
                {
                {
                this.state = 1182;
                this.match(LPCParser.COMMA);
                this.state = 1183;
                this.expression();
                }
                }
                this.state = 1188;
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
        this.enterRule(localContext, 152, LPCParser.RULE_foreachRangeExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1189;
            this.forEachVariable();
            this.state = 1194;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 87) {
                {
                {
                this.state = 1190;
                this.match(LPCParser.COMMA);
                this.state = 1191;
                this.forEachVariable();
                }
                }
                this.state = 1196;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1197;
            _la = this.tokenStream.LA(1);
            if(!(_la === 27 || _la === 85)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1198;
            this.expression();
            this.state = 1201;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 89) {
                {
                this.state = 1199;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 1200;
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
        this.enterRule(localContext, 154, LPCParser.RULE_forVariable);
        try {
            this.state = 1214;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 156, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1204;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 154, this.context) ) {
                case 1:
                    {
                    this.state = 1203;
                    this.primitiveTypeSpecifier();
                    }
                    break;
                }
                this.state = 1206;
                this.variableDeclarator();
                this.state = 1211;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.ASSIGN:
                    {
                    this.state = 1207;
                    this.match(LPCParser.ASSIGN);
                    this.state = 1208;
                    this.variableInitializer();
                    }
                    break;
                case LPCParser.INC:
                    {
                    this.state = 1209;
                    this.match(LPCParser.INC);
                    }
                    break;
                case LPCParser.DEC:
                    {
                    this.state = 1210;
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
                this.state = 1213;
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
        this.enterRule(localContext, 156, LPCParser.RULE_forEachVariable);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1217;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 157, this.context) ) {
            case 1:
                {
                this.state = 1216;
                this.typeSpecifier();
                }
                break;
            }
            this.state = 1219;
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
        this.enterRule(localContext, 158, LPCParser.RULE_returnStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1221;
            this.match(LPCParser.RETURN);
            this.state = 1223;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 158, this.context) ) {
            case 1:
                {
                this.state = 1222;
                this.commaableExpression();
                }
                break;
            }
            this.state = 1225;
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
        this.enterRule(localContext, 160, LPCParser.RULE_jumpStatement);
        try {
            this.state = 1232;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BREAK:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1227;
                this.match(LPCParser.BREAK);
                this.state = 1228;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.CONTINUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1229;
                this.match(LPCParser.CONTINUE);
                this.state = 1230;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.RETURN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1231;
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
        this.enterRule(localContext, 162, LPCParser.RULE_callOtherTarget);
        try {
            this.state = 1240;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1234;
                this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.PAREN_OPEN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1235;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 1236;
                this.expression();
                this.state = 1237;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1239;
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
        this.enterRule(localContext, 164, LPCParser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1242;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 113)) & ~0x1F) === 0 && ((1 << (_la - 113)) & 71) !== 0))) {
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
        this.enterRule(localContext, 166, LPCParser.RULE_argument);
        let _la: number;
        try {
            this.state = 1253;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 163, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1245;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 161, this.context) ) {
                case 1:
                    {
                    this.state = 1244;
                    this.match(LPCParser.AND);
                    }
                    break;
                }
                this.state = 1247;
                this.expression();
                this.state = 1249;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 88) {
                    {
                    this.state = 1248;
                    this.match(LPCParser.TRIPPLEDOT);
                    }
                }

                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1251;
                if (!( this.isFluff() )) {
                    throw this.createFailedPredicateException(" this.isFluff() ");
                }
                this.state = 1252;
                this.structTypeSpecifier();
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
    public argumentList(): ArgumentListContext {
        let localContext = new ArgumentListContext(this.context, this.state);
        this.enterRule(localContext, 168, LPCParser.RULE_argumentList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1255;
            this.argument();
            this.state = 1262;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 87) {
                {
                {
                this.state = 1256;
                this.match(LPCParser.COMMA);
                this.state = 1258;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 164, this.context) ) {
                case 1:
                    {
                    this.state = 1257;
                    this.argument();
                    }
                    break;
                }
                }
                }
                this.state = 1264;
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

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 0:
            return this.program_sempred(localContext as ProgramContext, predIndex);
        case 2:
            return this.includePreprocessorDirective_sempred(localContext as IncludePreprocessorDirectiveContext, predIndex);
        case 7:
            return this.directiveIfTestExpression_sempred(localContext as DirectiveIfTestExpressionContext, predIndex);
        case 20:
            return this.inheritFile_sempred(localContext as InheritFileContext, predIndex);
        case 29:
            return this.parameter_sempred(localContext as ParameterContext, predIndex);
        case 34:
            return this.structDeclaration_sempred(localContext as StructDeclarationContext, predIndex);
        case 51:
            return this.conditionalExpression_sempred(localContext as ConditionalExpressionContext, predIndex);
        case 53:
            return this.primaryExpressionStart_sempred(localContext as PrimaryExpressionStartContext, predIndex);
        case 54:
            return this.validIdentifiers_sempred(localContext as ValidIdentifiersContext, predIndex);
        case 56:
            return this.inlineClosureExpression_sempred(localContext as InlineClosureExpressionContext, predIndex);
        case 69:
            return this.caseExpression_sempred(localContext as CaseExpressionContext, predIndex);
        case 83:
            return this.argument_sempred(localContext as ArgumentContext, predIndex);
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
            return  15 >= localContext?._p! ;
        case 9:
            return  14 >= localContext?._p! ;
        case 10:
            return  13 >= localContext?._p! ;
        case 11:
            return  12 >= localContext?._p! ;
        case 12:
            return  11 >= localContext?._p! ;
        case 13:
            return  10 >= localContext?._p! ;
        case 14:
            return  9  >= localContext?._p! ;
        case 15:
            return  8  >= localContext?._p! ;
        case 16:
            return  7  >= localContext?._p! ;
        case 17:
            return  6  >= localContext?._p! ;
        case 18:
            return  5  >= localContext?._p! ;
        case 19:
            return  4  >= localContext?._p! ;
        }
        return true;
    }
    private primaryExpressionStart_sempred(localContext: PrimaryExpressionStartContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 20:
            return  this.isFluff() ;
        case 21:
            return  this.isLD() ;
        }
        return true;
    }
    private validIdentifiers_sempred(localContext: ValidIdentifiersContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 22:
            return  this.isFluff() ;
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
    private argument_sempred(localContext: ArgumentContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 25:
            return  this.isFluff() ;
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,131,1266,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
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
        78,2,79,7,79,2,80,7,80,2,81,7,81,2,82,7,82,2,83,7,83,2,84,7,84,1,
        0,1,0,1,0,1,0,1,0,5,0,176,8,0,10,0,12,0,179,9,0,1,0,1,0,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,194,8,1,10,1,12,1,197,9,
        1,3,1,199,8,1,1,2,1,2,1,2,1,2,1,2,3,2,206,8,2,1,3,1,3,1,3,1,4,1,
        4,1,4,3,4,214,8,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,223,8,4,1,5,1,
        5,1,6,1,6,1,7,1,7,3,7,231,8,7,1,7,1,7,1,7,1,7,1,7,4,7,238,8,7,11,
        7,12,7,239,5,7,242,8,7,10,7,12,7,245,9,7,1,8,1,8,1,8,1,8,3,8,251,
        8,8,1,8,1,8,1,8,3,8,256,8,8,1,9,1,9,1,9,1,9,3,9,262,8,9,1,10,1,10,
        1,10,5,10,267,8,10,10,10,12,10,270,9,10,1,10,1,10,1,10,3,10,275,
        8,10,1,11,1,11,1,11,1,11,5,11,281,8,11,10,11,12,11,284,9,11,1,11,
        1,11,1,12,1,12,1,13,1,13,1,14,1,14,1,14,5,14,295,8,14,10,14,12,14,
        298,9,14,1,14,3,14,301,8,14,1,15,1,15,1,16,3,16,306,8,16,1,16,1,
        16,1,16,4,16,311,8,16,11,16,12,16,312,3,16,315,8,16,1,16,5,16,318,
        8,16,10,16,12,16,321,9,16,1,16,3,16,324,8,16,1,16,3,16,327,8,16,
        1,16,1,16,1,17,4,17,332,8,17,11,17,12,17,333,1,17,1,17,1,17,4,17,
        339,8,17,11,17,12,17,340,1,17,1,17,3,17,345,8,17,1,18,1,18,1,18,
        1,19,1,19,1,20,1,20,1,20,1,20,1,20,1,20,1,20,3,20,359,8,20,1,20,
        1,20,3,20,363,8,20,1,20,5,20,366,8,20,10,20,12,20,369,9,20,1,21,
        3,21,372,8,21,1,21,1,21,1,21,1,21,3,21,378,8,21,1,22,1,22,1,22,1,
        23,1,23,1,23,1,23,3,23,387,8,23,1,24,1,24,1,25,5,25,392,8,25,10,
        25,12,25,395,9,25,1,25,3,25,398,8,25,1,25,1,25,1,25,3,25,403,8,25,
        1,25,1,25,1,26,1,26,1,26,1,27,1,27,1,27,1,28,1,28,1,28,1,28,5,28,
        417,8,28,10,28,12,28,420,9,28,3,28,422,8,28,1,29,1,29,3,29,426,8,
        29,1,29,3,29,429,8,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,3,29,438,
        8,29,1,29,1,29,3,29,442,8,29,1,29,1,29,3,29,446,8,29,1,29,3,29,449,
        8,29,1,29,3,29,452,8,29,1,29,3,29,455,8,29,1,29,3,29,458,8,29,1,
        30,1,30,1,30,1,30,5,30,464,8,30,10,30,12,30,467,9,30,1,30,1,30,1,
        31,1,31,1,31,1,31,3,31,475,8,31,1,32,1,32,1,33,1,33,1,34,1,34,3,
        34,483,8,34,1,34,1,34,1,34,1,34,1,34,3,34,490,8,34,1,34,1,34,5,34,
        494,8,34,10,34,12,34,497,9,34,1,34,1,34,3,34,501,8,34,1,35,1,35,
        1,35,1,36,5,36,507,8,36,10,36,12,36,510,9,36,1,36,1,36,3,36,514,
        8,36,1,36,3,36,517,8,36,1,36,1,36,5,36,521,8,36,10,36,12,36,524,
        9,36,1,37,1,37,1,37,3,37,529,8,37,1,38,5,38,532,8,38,10,38,12,38,
        535,9,38,1,38,1,38,1,39,1,39,1,39,3,39,542,8,39,1,40,1,40,1,41,1,
        41,3,41,548,8,41,1,41,1,41,1,42,1,42,1,42,1,43,1,43,1,44,1,44,1,
        44,1,44,1,44,1,44,3,44,563,8,44,1,44,5,44,566,8,44,10,44,12,44,569,
        9,44,1,44,4,44,572,8,44,11,44,12,44,573,3,44,576,8,44,1,44,1,44,
        5,44,580,8,44,10,44,12,44,583,9,44,1,45,1,45,1,45,1,45,3,45,589,
        8,45,1,45,1,45,1,45,3,45,594,8,45,5,45,596,8,45,10,45,12,45,599,
        9,45,3,45,601,8,45,1,45,3,45,604,8,45,1,45,1,45,1,45,1,46,1,46,1,
        46,1,46,1,46,5,46,614,8,46,10,46,12,46,617,9,46,3,46,619,8,46,1,
        47,1,47,1,47,1,47,5,47,625,8,47,10,47,12,47,628,9,47,1,47,3,47,631,
        8,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,
        3,47,645,8,47,1,48,1,48,1,49,1,49,1,49,1,49,5,49,653,8,49,10,49,
        12,49,656,9,49,3,49,658,8,49,1,50,1,50,1,51,1,51,1,51,1,51,1,51,
        1,51,3,51,668,8,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,
        1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,
        1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,
        1,51,1,51,1,51,1,51,1,51,5,51,710,8,51,10,51,12,51,713,9,51,1,52,
        3,52,716,8,52,1,52,1,52,5,52,720,8,52,10,52,12,52,723,9,52,1,52,
        1,52,1,52,1,52,1,52,3,52,730,8,52,1,52,1,52,1,52,1,52,3,52,736,8,
        52,1,52,5,52,739,8,52,10,52,12,52,742,9,52,5,52,744,8,52,10,52,12,
        52,747,9,52,1,53,1,53,1,53,5,53,752,8,53,10,53,12,53,755,9,53,1,
        53,1,53,1,53,1,53,1,53,5,53,762,8,53,10,53,12,53,765,9,53,1,53,1,
        53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,5,53,776,8,53,10,53,12,53,
        779,9,53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,5,53,788,8,53,10,53,
        12,53,791,9,53,3,53,793,8,53,1,53,3,53,796,8,53,1,53,3,53,799,8,
        53,1,53,1,53,1,53,3,53,804,8,53,1,53,1,53,1,53,1,53,1,53,3,53,811,
        8,53,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,
        3,54,825,8,54,1,55,1,55,1,55,1,55,1,55,5,55,832,8,55,10,55,12,55,
        835,9,55,1,55,1,55,5,55,839,8,55,10,55,12,55,842,9,55,1,55,1,55,
        1,55,1,55,3,55,848,8,55,1,56,1,56,1,56,1,56,1,56,1,56,5,56,856,8,
        56,10,56,12,56,859,9,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,5,56,
        868,8,56,10,56,12,56,871,9,56,3,56,873,8,56,1,56,1,56,1,56,1,56,
        3,56,879,8,56,1,56,1,56,3,56,883,8,56,1,56,1,56,3,56,887,8,56,1,
        57,1,57,3,57,891,8,57,1,57,1,57,1,57,3,57,896,8,57,1,57,1,57,1,57,
        1,57,3,57,902,8,57,1,57,3,57,905,8,57,1,57,1,57,3,57,909,8,57,1,
        57,3,57,912,8,57,1,57,3,57,915,8,57,1,58,1,58,1,58,3,58,920,8,58,
        1,58,3,58,923,8,58,1,58,1,58,1,58,3,58,928,8,58,3,58,930,8,58,1,
        59,3,59,933,8,59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,1,59,3,
        59,944,8,59,1,59,1,59,1,59,3,59,949,8,59,3,59,951,8,59,1,60,1,60,
        1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,
        1,60,1,60,1,60,1,60,5,60,972,8,60,10,60,12,60,975,9,60,1,60,1,60,
        3,60,979,8,60,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,
        3,61,991,8,61,1,62,1,62,5,62,995,8,62,10,62,12,62,998,9,62,1,62,
        1,62,1,63,1,63,3,63,1004,8,63,1,64,1,64,1,64,1,64,1,64,1,64,1,64,
        1,65,1,65,1,65,1,66,1,66,1,66,1,66,1,66,1,66,1,67,1,67,5,67,1024,
        8,67,10,67,12,67,1027,9,67,1,67,3,67,1030,8,67,1,68,1,68,1,68,1,
        68,1,68,1,68,5,68,1038,8,68,10,68,12,68,1041,9,68,1,68,1,68,5,68,
        1045,8,68,10,68,12,68,1048,9,68,1,68,1,68,1,69,1,69,1,69,1,69,5,
        69,1056,8,69,10,69,12,69,1059,9,69,1,69,1,69,1,69,1,69,1,69,5,69,
        1066,8,69,10,69,12,69,1069,9,69,3,69,1071,8,69,1,69,1,69,1,69,1,
        69,1,69,1,69,5,69,1079,8,69,10,69,12,69,1082,9,69,1,69,3,69,1085,
        8,69,1,69,1,69,1,69,1,69,5,69,1091,8,69,10,69,12,69,1094,9,69,1,
        69,1,69,3,69,1098,8,69,3,69,1100,8,69,1,70,1,70,1,71,3,71,1105,8,
        71,1,71,1,71,1,71,1,71,1,71,3,71,1112,8,71,1,72,1,72,1,72,1,72,5,
        72,1118,8,72,10,72,12,72,1121,9,72,1,73,1,73,1,73,5,73,1126,8,73,
        10,73,12,73,1129,9,73,1,74,1,74,1,74,1,74,1,74,1,74,3,74,1137,8,
        74,1,74,1,74,1,74,1,74,1,74,1,74,1,74,1,74,1,74,1,74,1,74,1,74,1,
        74,1,74,3,74,1153,8,74,1,74,1,74,1,74,1,74,1,74,1,74,3,74,1161,8,
        74,3,74,1163,8,74,1,75,1,75,1,75,5,75,1168,8,75,10,75,12,75,1171,
        9,75,3,75,1173,8,75,1,75,1,75,3,75,1177,8,75,1,75,1,75,3,75,1181,
        8,75,1,75,1,75,5,75,1185,8,75,10,75,12,75,1188,9,75,1,76,1,76,1,
        76,5,76,1193,8,76,10,76,12,76,1196,9,76,1,76,1,76,1,76,1,76,3,76,
        1202,8,76,1,77,3,77,1205,8,77,1,77,1,77,1,77,1,77,1,77,3,77,1212,
        8,77,1,77,3,77,1215,8,77,1,78,3,78,1218,8,78,1,78,1,78,1,79,1,79,
        3,79,1224,8,79,1,79,1,79,1,80,1,80,1,80,1,80,1,80,3,80,1233,8,80,
        1,81,1,81,1,81,1,81,1,81,1,81,3,81,1241,8,81,1,82,1,82,1,83,3,83,
        1246,8,83,1,83,1,83,3,83,1250,8,83,1,83,1,83,3,83,1254,8,83,1,84,
        1,84,1,84,3,84,1259,8,84,5,84,1261,8,84,10,84,12,84,1264,9,84,1,
        84,0,2,14,40,85,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,
        36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,
        80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,
        118,120,122,124,126,128,130,132,134,136,138,140,142,144,146,148,
        150,152,154,156,158,160,162,164,166,168,0,28,2,0,15,15,24,24,2,0,
        14,14,16,16,1,0,25,26,2,0,71,76,82,83,3,0,113,113,118,118,124,124,
        2,0,39,39,46,46,1,0,52,56,3,0,35,35,118,118,124,124,1,0,52,54,2,
        0,51,57,59,60,2,0,51,55,57,59,2,0,7,7,40,40,10,0,2,3,6,6,8,8,18,
        18,22,22,30,30,32,35,38,38,41,42,48,48,1,0,91,103,4,0,62,64,67,68,
        77,77,80,81,1,0,64,66,1,0,62,63,1,0,69,70,1,0,71,74,2,0,27,27,75,
        76,2,0,90,90,105,105,2,0,37,37,50,50,6,0,62,66,69,80,82,84,87,87,
        91,101,110,110,2,0,108,108,110,110,1,0,62,65,4,0,113,113,115,115,
        118,119,124,124,2,0,27,27,85,85,2,0,113,115,119,119,1418,0,177,1,
        0,0,0,2,198,1,0,0,0,4,200,1,0,0,0,6,207,1,0,0,0,8,222,1,0,0,0,10,
        224,1,0,0,0,12,226,1,0,0,0,14,228,1,0,0,0,16,255,1,0,0,0,18,261,
        1,0,0,0,20,274,1,0,0,0,22,276,1,0,0,0,24,287,1,0,0,0,26,289,1,0,
        0,0,28,300,1,0,0,0,30,302,1,0,0,0,32,326,1,0,0,0,34,344,1,0,0,0,
        36,346,1,0,0,0,38,349,1,0,0,0,40,358,1,0,0,0,42,377,1,0,0,0,44,379,
        1,0,0,0,46,386,1,0,0,0,48,388,1,0,0,0,50,393,1,0,0,0,52,406,1,0,
        0,0,54,409,1,0,0,0,56,421,1,0,0,0,58,457,1,0,0,0,60,459,1,0,0,0,
        62,474,1,0,0,0,64,476,1,0,0,0,66,478,1,0,0,0,68,482,1,0,0,0,70,502,
        1,0,0,0,72,508,1,0,0,0,74,525,1,0,0,0,76,533,1,0,0,0,78,541,1,0,
        0,0,80,543,1,0,0,0,82,545,1,0,0,0,84,551,1,0,0,0,86,554,1,0,0,0,
        88,575,1,0,0,0,90,584,1,0,0,0,92,608,1,0,0,0,94,644,1,0,0,0,96,646,
        1,0,0,0,98,657,1,0,0,0,100,659,1,0,0,0,102,667,1,0,0,0,104,715,1,
        0,0,0,106,810,1,0,0,0,108,824,1,0,0,0,110,847,1,0,0,0,112,886,1,
        0,0,0,114,914,1,0,0,0,116,929,1,0,0,0,118,950,1,0,0,0,120,978,1,
        0,0,0,122,990,1,0,0,0,124,992,1,0,0,0,126,1003,1,0,0,0,128,1005,
        1,0,0,0,130,1012,1,0,0,0,132,1015,1,0,0,0,134,1021,1,0,0,0,136,1031,
        1,0,0,0,138,1099,1,0,0,0,140,1101,1,0,0,0,142,1111,1,0,0,0,144,1113,
        1,0,0,0,146,1122,1,0,0,0,148,1162,1,0,0,0,150,1172,1,0,0,0,152,1189,
        1,0,0,0,154,1214,1,0,0,0,156,1217,1,0,0,0,158,1221,1,0,0,0,160,1232,
        1,0,0,0,162,1240,1,0,0,0,164,1242,1,0,0,0,166,1253,1,0,0,0,168,1255,
        1,0,0,0,170,176,3,46,23,0,171,176,3,2,1,0,172,176,3,32,16,0,173,
        174,4,0,0,0,174,176,3,44,22,0,175,170,1,0,0,0,175,171,1,0,0,0,175,
        172,1,0,0,0,175,173,1,0,0,0,176,179,1,0,0,0,177,175,1,0,0,0,177,
        178,1,0,0,0,178,180,1,0,0,0,179,177,1,0,0,0,180,181,5,0,0,1,181,
        1,1,0,0,0,182,199,3,8,4,0,183,184,3,18,9,0,184,185,3,20,10,0,185,
        199,1,0,0,0,186,199,3,6,3,0,187,199,3,4,2,0,188,189,5,23,0,0,189,
        190,3,30,15,0,190,195,5,124,0,0,191,192,5,87,0,0,192,194,5,124,0,
        0,193,191,1,0,0,0,194,197,1,0,0,0,195,193,1,0,0,0,195,196,1,0,0,
        0,196,199,1,0,0,0,197,195,1,0,0,0,198,182,1,0,0,0,198,183,1,0,0,
        0,198,186,1,0,0,0,198,187,1,0,0,0,198,188,1,0,0,0,199,3,1,0,0,0,
        200,201,5,23,0,0,201,202,3,26,13,0,202,205,3,28,14,0,203,204,4,2,
        1,0,204,206,5,86,0,0,205,203,1,0,0,0,205,206,1,0,0,0,206,5,1,0,0,
        0,207,208,5,127,0,0,208,209,5,129,0,0,209,7,1,0,0,0,210,211,5,23,
        0,0,211,213,3,12,6,0,212,214,5,80,0,0,213,212,1,0,0,0,213,214,1,
        0,0,0,214,215,1,0,0,0,215,216,3,20,10,0,216,223,1,0,0,0,217,218,
        5,23,0,0,218,219,7,0,0,0,219,223,3,14,7,0,220,221,5,23,0,0,221,223,
        3,10,5,0,222,210,1,0,0,0,222,217,1,0,0,0,222,220,1,0,0,0,223,9,1,
        0,0,0,224,225,7,1,0,0,225,11,1,0,0,0,226,227,7,2,0,0,227,13,1,0,
        0,0,228,230,6,7,-1,0,229,231,5,80,0,0,230,229,1,0,0,0,230,231,1,
        0,0,0,231,232,1,0,0,0,232,233,3,16,8,0,233,243,1,0,0,0,234,237,10,
        1,0,0,235,236,7,3,0,0,236,238,3,14,7,0,237,235,1,0,0,0,238,239,1,
        0,0,0,239,237,1,0,0,0,239,240,1,0,0,0,240,242,1,0,0,0,241,234,1,
        0,0,0,242,245,1,0,0,0,243,241,1,0,0,0,243,244,1,0,0,0,244,15,1,0,
        0,0,245,243,1,0,0,0,246,250,5,124,0,0,247,248,5,106,0,0,248,249,
        7,4,0,0,249,251,5,107,0,0,250,247,1,0,0,0,250,251,1,0,0,0,251,256,
        1,0,0,0,252,256,5,118,0,0,253,256,5,113,0,0,254,256,3,96,48,0,255,
        246,1,0,0,0,255,252,1,0,0,0,255,253,1,0,0,0,255,254,1,0,0,0,256,
        17,1,0,0,0,257,258,5,23,0,0,258,262,5,45,0,0,259,262,5,13,0,0,260,
        262,5,31,0,0,261,257,1,0,0,0,261,259,1,0,0,0,261,260,1,0,0,0,262,
        19,1,0,0,0,263,268,5,124,0,0,264,265,5,63,0,0,265,267,5,124,0,0,
        266,264,1,0,0,0,267,270,1,0,0,0,268,266,1,0,0,0,268,269,1,0,0,0,
        269,275,1,0,0,0,270,268,1,0,0,0,271,275,5,118,0,0,272,275,5,113,
        0,0,273,275,5,52,0,0,274,263,1,0,0,0,274,271,1,0,0,0,274,272,1,0,
        0,0,274,273,1,0,0,0,275,21,1,0,0,0,276,277,5,106,0,0,277,282,5,124,
        0,0,278,279,5,87,0,0,279,281,5,124,0,0,280,278,1,0,0,0,281,284,1,
        0,0,0,282,280,1,0,0,0,282,283,1,0,0,0,283,285,1,0,0,0,284,282,1,
        0,0,0,285,286,5,107,0,0,286,23,1,0,0,0,287,288,3,96,48,0,288,25,
        1,0,0,0,289,290,5,28,0,0,290,27,1,0,0,0,291,301,5,122,0,0,292,296,
        5,118,0,0,293,295,5,118,0,0,294,293,1,0,0,0,295,298,1,0,0,0,296,
        294,1,0,0,0,296,297,1,0,0,0,297,301,1,0,0,0,298,296,1,0,0,0,299,
        301,5,124,0,0,300,291,1,0,0,0,300,292,1,0,0,0,300,299,1,0,0,0,301,
        29,1,0,0,0,302,303,5,36,0,0,303,31,1,0,0,0,304,306,5,52,0,0,305,
        304,1,0,0,0,305,306,1,0,0,0,306,307,1,0,0,0,307,327,3,36,18,0,308,
        310,5,11,0,0,309,311,3,38,19,0,310,309,1,0,0,0,311,312,1,0,0,0,312,
        310,1,0,0,0,312,313,1,0,0,0,313,315,1,0,0,0,314,308,1,0,0,0,314,
        315,1,0,0,0,315,319,1,0,0,0,316,318,3,34,17,0,317,316,1,0,0,0,318,
        321,1,0,0,0,319,317,1,0,0,0,319,320,1,0,0,0,320,323,1,0,0,0,321,
        319,1,0,0,0,322,324,5,47,0,0,323,322,1,0,0,0,323,324,1,0,0,0,324,
        325,1,0,0,0,325,327,3,36,18,0,326,305,1,0,0,0,326,314,1,0,0,0,327,
        328,1,0,0,0,328,329,5,86,0,0,329,33,1,0,0,0,330,332,3,48,24,0,331,
        330,1,0,0,0,332,333,1,0,0,0,333,331,1,0,0,0,333,334,1,0,0,0,334,
        335,1,0,0,0,335,336,5,21,0,0,336,345,1,0,0,0,337,339,3,64,32,0,338,
        337,1,0,0,0,339,340,1,0,0,0,340,338,1,0,0,0,340,341,1,0,0,0,341,
        342,1,0,0,0,342,343,7,5,0,0,343,345,1,0,0,0,344,331,1,0,0,0,344,
        338,1,0,0,0,345,35,1,0,0,0,346,347,5,29,0,0,347,348,3,40,20,0,348,
        37,1,0,0,0,349,350,7,6,0,0,350,39,1,0,0,0,351,352,6,20,-1,0,352,
        359,5,118,0,0,353,359,5,124,0,0,354,355,5,106,0,0,355,356,3,40,20,
        0,356,357,5,107,0,0,357,359,1,0,0,0,358,351,1,0,0,0,358,353,1,0,
        0,0,358,354,1,0,0,0,359,367,1,0,0,0,360,362,10,1,0,0,361,363,5,62,
        0,0,362,361,1,0,0,0,362,363,1,0,0,0,363,364,1,0,0,0,364,366,3,40,
        20,2,365,360,1,0,0,0,366,369,1,0,0,0,367,365,1,0,0,0,367,368,1,0,
        0,0,368,41,1,0,0,0,369,367,1,0,0,0,370,372,7,7,0,0,371,370,1,0,0,
        0,371,372,1,0,0,0,372,373,1,0,0,0,373,378,5,61,0,0,374,375,3,108,
        54,0,375,376,5,61,0,0,376,378,1,0,0,0,377,371,1,0,0,0,377,374,1,
        0,0,0,378,43,1,0,0,0,379,380,7,8,0,0,380,381,5,85,0,0,381,45,1,0,
        0,0,382,387,3,52,26,0,383,387,3,54,27,0,384,387,3,68,34,0,385,387,
        3,70,35,0,386,382,1,0,0,0,386,383,1,0,0,0,386,384,1,0,0,0,386,385,
        1,0,0,0,387,47,1,0,0,0,388,389,7,9,0,0,389,49,1,0,0,0,390,392,3,
        48,24,0,391,390,1,0,0,0,392,395,1,0,0,0,393,391,1,0,0,0,393,394,
        1,0,0,0,394,397,1,0,0,0,395,393,1,0,0,0,396,398,3,86,43,0,397,396,
        1,0,0,0,397,398,1,0,0,0,398,399,1,0,0,0,399,400,3,108,54,0,400,402,
        5,106,0,0,401,403,3,56,28,0,402,401,1,0,0,0,402,403,1,0,0,0,403,
        404,1,0,0,0,404,405,5,107,0,0,405,51,1,0,0,0,406,407,3,50,25,0,407,
        408,5,86,0,0,408,53,1,0,0,0,409,410,3,50,25,0,410,411,3,124,62,0,
        411,55,1,0,0,0,412,422,5,48,0,0,413,418,3,58,29,0,414,415,5,87,0,
        0,415,417,3,58,29,0,416,414,1,0,0,0,417,420,1,0,0,0,418,416,1,0,
        0,0,418,419,1,0,0,0,419,422,1,0,0,0,420,418,1,0,0,0,421,412,1,0,
        0,0,421,413,1,0,0,0,422,57,1,0,0,0,423,425,4,29,4,1,424,426,5,60,
        0,0,425,424,1,0,0,0,425,426,1,0,0,0,426,428,1,0,0,0,427,429,3,88,
        44,0,428,427,1,0,0,0,428,429,1,0,0,0,429,430,1,0,0,0,430,437,3,108,
        54,0,431,432,5,91,0,0,432,438,3,96,48,0,433,434,4,29,5,0,434,435,
        5,85,0,0,435,438,3,112,56,0,436,438,5,88,0,0,437,431,1,0,0,0,437,
        433,1,0,0,0,437,436,1,0,0,0,437,438,1,0,0,0,438,458,1,0,0,0,439,
        441,4,29,6,1,440,442,5,60,0,0,441,440,1,0,0,0,441,442,1,0,0,0,442,
        443,1,0,0,0,443,445,3,88,44,0,444,446,3,108,54,0,445,444,1,0,0,0,
        445,446,1,0,0,0,446,448,1,0,0,0,447,449,5,88,0,0,448,447,1,0,0,0,
        448,449,1,0,0,0,449,458,1,0,0,0,450,452,5,60,0,0,451,450,1,0,0,0,
        451,452,1,0,0,0,452,454,1,0,0,0,453,455,3,88,44,0,454,453,1,0,0,
        0,454,455,1,0,0,0,455,456,1,0,0,0,456,458,3,108,54,0,457,423,1,0,
        0,0,457,439,1,0,0,0,457,451,1,0,0,0,458,59,1,0,0,0,459,460,3,88,
        44,0,460,465,5,124,0,0,461,462,5,87,0,0,462,464,5,124,0,0,463,461,
        1,0,0,0,464,467,1,0,0,0,465,463,1,0,0,0,465,466,1,0,0,0,466,468,
        1,0,0,0,467,465,1,0,0,0,468,469,5,86,0,0,469,61,1,0,0,0,470,471,
        5,124,0,0,471,472,5,85,0,0,472,475,3,96,48,0,473,475,3,96,48,0,474,
        470,1,0,0,0,474,473,1,0,0,0,475,63,1,0,0,0,476,477,7,10,0,0,477,
        65,1,0,0,0,478,479,5,52,0,0,479,67,1,0,0,0,480,481,4,34,7,0,481,
        483,3,66,33,0,482,480,1,0,0,0,482,483,1,0,0,0,483,484,1,0,0,0,484,
        485,7,11,0,0,485,489,5,124,0,0,486,487,5,106,0,0,487,488,5,124,0,
        0,488,490,5,107,0,0,489,486,1,0,0,0,489,490,1,0,0,0,490,491,1,0,
        0,0,491,495,5,108,0,0,492,494,3,60,30,0,493,492,1,0,0,0,494,497,
        1,0,0,0,495,493,1,0,0,0,495,496,1,0,0,0,496,498,1,0,0,0,497,495,
        1,0,0,0,498,500,5,109,0,0,499,501,5,86,0,0,500,499,1,0,0,0,500,501,
        1,0,0,0,501,69,1,0,0,0,502,503,3,72,36,0,503,504,5,86,0,0,504,71,
        1,0,0,0,505,507,3,64,32,0,506,505,1,0,0,0,507,510,1,0,0,0,508,506,
        1,0,0,0,508,509,1,0,0,0,509,511,1,0,0,0,510,508,1,0,0,0,511,513,
        3,88,44,0,512,514,5,118,0,0,513,512,1,0,0,0,513,514,1,0,0,0,514,
        516,1,0,0,0,515,517,3,74,37,0,516,515,1,0,0,0,516,517,1,0,0,0,517,
        522,1,0,0,0,518,519,5,87,0,0,519,521,3,74,37,0,520,518,1,0,0,0,521,
        524,1,0,0,0,522,520,1,0,0,0,522,523,1,0,0,0,523,73,1,0,0,0,524,522,
        1,0,0,0,525,528,3,76,38,0,526,527,5,91,0,0,527,529,3,78,39,0,528,
        526,1,0,0,0,528,529,1,0,0,0,529,75,1,0,0,0,530,532,5,64,0,0,531,
        530,1,0,0,0,532,535,1,0,0,0,533,531,1,0,0,0,533,534,1,0,0,0,534,
        536,1,0,0,0,535,533,1,0,0,0,536,537,3,108,54,0,537,77,1,0,0,0,538,
        542,3,90,45,0,539,542,3,94,47,0,540,542,3,96,48,0,541,538,1,0,0,
        0,541,539,1,0,0,0,541,540,1,0,0,0,542,79,1,0,0,0,543,544,7,12,0,
        0,544,81,1,0,0,0,545,547,5,106,0,0,546,548,3,168,84,0,547,546,1,
        0,0,0,547,548,1,0,0,0,548,549,1,0,0,0,549,550,5,107,0,0,550,83,1,
        0,0,0,551,552,7,11,0,0,552,553,5,124,0,0,553,85,1,0,0,0,554,555,
        3,88,44,0,555,87,1,0,0,0,556,563,3,80,40,0,557,558,5,71,0,0,558,
        559,3,86,43,0,559,560,5,72,0,0,560,563,1,0,0,0,561,563,3,84,42,0,
        562,556,1,0,0,0,562,557,1,0,0,0,562,561,1,0,0,0,563,567,1,0,0,0,
        564,566,5,64,0,0,565,564,1,0,0,0,566,569,1,0,0,0,567,565,1,0,0,0,
        567,568,1,0,0,0,568,576,1,0,0,0,569,567,1,0,0,0,570,572,5,64,0,0,
        571,570,1,0,0,0,572,573,1,0,0,0,573,571,1,0,0,0,573,574,1,0,0,0,
        574,576,1,0,0,0,575,562,1,0,0,0,575,571,1,0,0,0,576,581,1,0,0,0,
        577,578,5,78,0,0,578,580,3,88,44,0,579,577,1,0,0,0,580,583,1,0,0,
        0,581,579,1,0,0,0,581,582,1,0,0,0,582,89,1,0,0,0,583,581,1,0,0,0,
        584,585,5,106,0,0,585,600,5,108,0,0,586,588,3,96,48,0,587,589,5,
        88,0,0,588,587,1,0,0,0,588,589,1,0,0,0,589,597,1,0,0,0,590,591,5,
        87,0,0,591,593,3,96,48,0,592,594,5,88,0,0,593,592,1,0,0,0,593,594,
        1,0,0,0,594,596,1,0,0,0,595,590,1,0,0,0,596,599,1,0,0,0,597,595,
        1,0,0,0,597,598,1,0,0,0,598,601,1,0,0,0,599,597,1,0,0,0,600,586,
        1,0,0,0,600,601,1,0,0,0,601,603,1,0,0,0,602,604,5,87,0,0,603,602,
        1,0,0,0,603,604,1,0,0,0,604,605,1,0,0,0,605,606,5,109,0,0,606,607,
        5,107,0,0,607,91,1,0,0,0,608,618,3,96,48,0,609,610,5,85,0,0,610,
        615,3,96,48,0,611,612,5,86,0,0,612,614,3,96,48,0,613,611,1,0,0,0,
        614,617,1,0,0,0,615,613,1,0,0,0,615,616,1,0,0,0,616,619,1,0,0,0,
        617,615,1,0,0,0,618,609,1,0,0,0,618,619,1,0,0,0,619,93,1,0,0,0,620,
        621,5,104,0,0,621,626,3,92,46,0,622,623,5,87,0,0,623,625,3,92,46,
        0,624,622,1,0,0,0,625,628,1,0,0,0,626,624,1,0,0,0,626,627,1,0,0,
        0,627,630,1,0,0,0,628,626,1,0,0,0,629,631,5,87,0,0,630,629,1,0,0,
        0,630,631,1,0,0,0,631,632,1,0,0,0,632,633,5,111,0,0,633,634,5,107,
        0,0,634,645,1,0,0,0,635,636,5,104,0,0,636,637,5,85,0,0,637,638,3,
        96,48,0,638,639,5,111,0,0,639,640,5,107,0,0,640,645,1,0,0,0,641,
        642,5,104,0,0,642,643,5,111,0,0,643,645,5,107,0,0,644,620,1,0,0,
        0,644,635,1,0,0,0,644,641,1,0,0,0,645,95,1,0,0,0,646,647,3,102,51,
        0,647,97,1,0,0,0,648,658,3,112,56,0,649,654,3,102,51,0,650,651,5,
        87,0,0,651,653,3,102,51,0,652,650,1,0,0,0,653,656,1,0,0,0,654,652,
        1,0,0,0,654,655,1,0,0,0,655,658,1,0,0,0,656,654,1,0,0,0,657,648,
        1,0,0,0,657,649,1,0,0,0,658,99,1,0,0,0,659,660,7,13,0,0,660,101,
        1,0,0,0,661,668,3,120,60,0,662,668,3,104,52,0,663,668,3,118,59,0,
        664,668,3,112,56,0,665,666,7,14,0,0,666,668,3,102,51,0,667,661,1,
        0,0,0,667,662,1,0,0,0,667,663,1,0,0,0,667,664,1,0,0,0,667,665,1,
        0,0,0,668,711,1,0,0,0,669,670,4,51,8,1,670,671,7,15,0,0,671,710,
        3,102,51,0,672,673,4,51,9,1,673,674,7,16,0,0,674,710,3,102,51,0,
        675,676,4,51,10,1,676,677,7,17,0,0,677,710,3,102,51,0,678,679,4,
        51,11,1,679,680,7,18,0,0,680,710,3,102,51,0,681,682,4,51,12,1,682,
        683,7,19,0,0,683,710,3,102,51,0,684,685,4,51,13,1,685,686,5,77,0,
        0,686,710,3,102,51,0,687,688,4,51,14,1,688,689,5,79,0,0,689,710,
        3,102,51,0,690,691,4,51,15,1,691,692,5,78,0,0,692,710,3,102,51,0,
        693,694,4,51,16,1,694,695,5,82,0,0,695,710,3,102,51,0,696,697,4,
        51,17,1,697,698,5,83,0,0,698,710,3,102,51,0,699,700,4,51,18,1,700,
        701,5,84,0,0,701,702,3,102,51,0,702,703,5,85,0,0,703,704,3,102,51,
        0,704,710,1,0,0,0,705,706,4,51,19,1,706,707,3,100,50,0,707,708,3,
        102,51,0,708,710,1,0,0,0,709,669,1,0,0,0,709,672,1,0,0,0,709,675,
        1,0,0,0,709,678,1,0,0,0,709,681,1,0,0,0,709,684,1,0,0,0,709,687,
        1,0,0,0,709,690,1,0,0,0,709,693,1,0,0,0,709,696,1,0,0,0,709,699,
        1,0,0,0,709,705,1,0,0,0,710,713,1,0,0,0,711,709,1,0,0,0,711,712,
        1,0,0,0,712,103,1,0,0,0,713,711,1,0,0,0,714,716,3,42,21,0,715,714,
        1,0,0,0,715,716,1,0,0,0,716,717,1,0,0,0,717,721,3,106,53,0,718,720,
        3,114,57,0,719,718,1,0,0,0,720,723,1,0,0,0,721,719,1,0,0,0,721,722,
        1,0,0,0,722,745,1,0,0,0,723,721,1,0,0,0,724,736,3,82,41,0,725,736,
        5,67,0,0,726,736,5,68,0,0,727,729,5,105,0,0,728,730,3,162,81,0,729,
        728,1,0,0,0,729,730,1,0,0,0,730,731,1,0,0,0,731,736,3,82,41,0,732,
        733,7,20,0,0,733,736,5,124,0,0,734,736,5,124,0,0,735,724,1,0,0,0,
        735,725,1,0,0,0,735,726,1,0,0,0,735,727,1,0,0,0,735,732,1,0,0,0,
        735,734,1,0,0,0,736,740,1,0,0,0,737,739,3,114,57,0,738,737,1,0,0,
        0,739,742,1,0,0,0,740,738,1,0,0,0,740,741,1,0,0,0,741,744,1,0,0,
        0,742,740,1,0,0,0,743,735,1,0,0,0,744,747,1,0,0,0,745,743,1,0,0,
        0,745,746,1,0,0,0,746,105,1,0,0,0,747,745,1,0,0,0,748,811,3,164,
        82,0,749,753,5,118,0,0,750,752,5,118,0,0,751,750,1,0,0,0,752,755,
        1,0,0,0,753,751,1,0,0,0,753,754,1,0,0,0,754,811,1,0,0,0,755,753,
        1,0,0,0,756,757,5,123,0,0,757,758,5,106,0,0,758,763,3,96,48,0,759,
        760,5,87,0,0,760,762,3,96,48,0,761,759,1,0,0,0,762,765,1,0,0,0,763,
        761,1,0,0,0,763,764,1,0,0,0,764,766,1,0,0,0,765,763,1,0,0,0,766,
        767,5,107,0,0,767,811,1,0,0,0,768,811,3,108,54,0,769,770,4,53,20,
        0,770,771,5,106,0,0,771,772,5,7,0,0,772,777,5,124,0,0,773,774,5,
        87,0,0,774,776,3,62,31,0,775,773,1,0,0,0,776,779,1,0,0,0,777,775,
        1,0,0,0,777,778,1,0,0,0,778,780,1,0,0,0,779,777,1,0,0,0,780,799,
        5,107,0,0,781,782,4,53,21,0,782,783,5,106,0,0,783,792,5,122,0,0,
        784,789,3,62,31,0,785,786,5,87,0,0,786,788,3,62,31,0,787,785,1,0,
        0,0,788,791,1,0,0,0,789,787,1,0,0,0,789,790,1,0,0,0,790,793,1,0,
        0,0,791,789,1,0,0,0,792,784,1,0,0,0,792,793,1,0,0,0,793,795,1,0,
        0,0,794,796,5,87,0,0,795,794,1,0,0,0,795,796,1,0,0,0,796,797,1,0,
        0,0,797,799,5,107,0,0,798,769,1,0,0,0,798,781,1,0,0,0,799,811,1,
        0,0,0,800,803,5,106,0,0,801,804,3,98,49,0,802,804,3,72,36,0,803,
        801,1,0,0,0,803,802,1,0,0,0,804,805,1,0,0,0,805,806,5,107,0,0,806,
        811,1,0,0,0,807,811,3,90,45,0,808,811,3,94,47,0,809,811,3,110,55,
        0,810,748,1,0,0,0,810,749,1,0,0,0,810,756,1,0,0,0,810,768,1,0,0,
        0,810,798,1,0,0,0,810,800,1,0,0,0,810,807,1,0,0,0,810,808,1,0,0,
        0,810,809,1,0,0,0,811,107,1,0,0,0,812,825,5,124,0,0,813,825,5,3,
        0,0,814,825,5,2,0,0,815,825,5,21,0,0,816,825,5,46,0,0,817,825,5,
        56,0,0,818,825,5,39,0,0,819,825,5,42,0,0,820,825,5,27,0,0,821,825,
        5,6,0,0,822,823,4,54,22,0,823,825,5,5,0,0,824,812,1,0,0,0,824,813,
        1,0,0,0,824,814,1,0,0,0,824,815,1,0,0,0,824,816,1,0,0,0,824,817,
        1,0,0,0,824,818,1,0,0,0,824,819,1,0,0,0,824,820,1,0,0,0,824,821,
        1,0,0,0,824,822,1,0,0,0,825,109,1,0,0,0,826,827,5,5,0,0,827,828,
        5,106,0,0,828,833,3,96,48,0,829,830,5,87,0,0,830,832,3,96,48,0,831,
        829,1,0,0,0,832,835,1,0,0,0,833,831,1,0,0,0,833,834,1,0,0,0,834,
        840,1,0,0,0,835,833,1,0,0,0,836,837,5,86,0,0,837,839,5,124,0,0,838,
        836,1,0,0,0,839,842,1,0,0,0,840,838,1,0,0,0,840,841,1,0,0,0,841,
        843,1,0,0,0,842,840,1,0,0,0,843,844,5,107,0,0,844,848,1,0,0,0,845,
        846,5,5,0,0,846,848,3,124,62,0,847,826,1,0,0,0,847,845,1,0,0,0,848,
        111,1,0,0,0,849,850,4,56,23,0,850,851,5,106,0,0,851,852,5,85,0,0,
        852,857,3,96,48,0,853,854,5,87,0,0,854,856,3,96,48,0,855,853,1,0,
        0,0,856,859,1,0,0,0,857,855,1,0,0,0,857,858,1,0,0,0,858,860,1,0,
        0,0,859,857,1,0,0,0,860,861,5,85,0,0,861,862,5,107,0,0,862,887,1,
        0,0,0,863,864,5,106,0,0,864,872,5,85,0,0,865,873,3,96,48,0,866,868,
        3,122,61,0,867,866,1,0,0,0,868,871,1,0,0,0,869,867,1,0,0,0,869,870,
        1,0,0,0,870,873,1,0,0,0,871,869,1,0,0,0,872,865,1,0,0,0,872,869,
        1,0,0,0,873,874,1,0,0,0,874,875,5,85,0,0,875,887,5,107,0,0,876,878,
        5,22,0,0,877,879,3,86,43,0,878,877,1,0,0,0,878,879,1,0,0,0,879,880,
        1,0,0,0,880,882,5,106,0,0,881,883,3,56,28,0,882,881,1,0,0,0,882,
        883,1,0,0,0,883,884,1,0,0,0,884,885,5,107,0,0,885,887,3,124,62,0,
        886,849,1,0,0,0,886,863,1,0,0,0,886,876,1,0,0,0,887,113,1,0,0,0,
        888,890,5,110,0,0,889,891,5,71,0,0,890,889,1,0,0,0,890,891,1,0,0,
        0,891,892,1,0,0,0,892,895,3,96,48,0,893,894,5,87,0,0,894,896,3,96,
        48,0,895,893,1,0,0,0,895,896,1,0,0,0,896,897,1,0,0,0,897,898,5,111,
        0,0,898,915,1,0,0,0,899,901,5,110,0,0,900,902,5,71,0,0,901,900,1,
        0,0,0,901,902,1,0,0,0,902,904,1,0,0,0,903,905,3,96,48,0,904,903,
        1,0,0,0,904,905,1,0,0,0,905,906,1,0,0,0,906,908,5,89,0,0,907,909,
        5,71,0,0,908,907,1,0,0,0,908,909,1,0,0,0,909,911,1,0,0,0,910,912,
        3,96,48,0,911,910,1,0,0,0,911,912,1,0,0,0,912,913,1,0,0,0,913,915,
        5,111,0,0,914,888,1,0,0,0,914,899,1,0,0,0,915,115,1,0,0,0,916,917,
        5,110,0,0,917,919,5,71,0,0,918,920,5,89,0,0,919,918,1,0,0,0,919,
        920,1,0,0,0,920,922,1,0,0,0,921,923,5,71,0,0,922,921,1,0,0,0,922,
        923,1,0,0,0,923,930,1,0,0,0,924,925,5,110,0,0,925,927,5,89,0,0,926,
        928,5,71,0,0,927,926,1,0,0,0,927,928,1,0,0,0,928,930,1,0,0,0,929,
        916,1,0,0,0,929,924,1,0,0,0,930,117,1,0,0,0,931,933,5,23,0,0,932,
        931,1,0,0,0,932,933,1,0,0,0,933,934,1,0,0,0,934,951,5,120,0,0,935,
        936,5,23,0,0,936,948,5,121,0,0,937,949,7,21,0,0,938,949,3,114,57,
        0,939,949,3,116,58,0,940,944,7,22,0,0,941,942,5,84,0,0,942,944,5,
        80,0,0,943,940,1,0,0,0,943,941,1,0,0,0,944,949,1,0,0,0,945,946,5,
        106,0,0,946,949,7,23,0,0,947,949,3,96,48,0,948,937,1,0,0,0,948,938,
        1,0,0,0,948,939,1,0,0,0,948,943,1,0,0,0,948,945,1,0,0,0,948,947,
        1,0,0,0,949,951,1,0,0,0,950,932,1,0,0,0,950,935,1,0,0,0,951,119,
        1,0,0,0,952,953,5,106,0,0,953,954,3,86,43,0,954,955,5,107,0,0,955,
        956,3,102,51,0,956,979,1,0,0,0,957,958,5,106,0,0,958,959,5,108,0,
        0,959,960,3,86,43,0,960,961,5,109,0,0,961,962,5,107,0,0,962,963,
        3,102,51,0,963,979,1,0,0,0,964,965,5,106,0,0,965,966,5,71,0,0,966,
        967,5,124,0,0,967,968,5,72,0,0,968,973,3,102,51,0,969,970,5,87,0,
        0,970,972,3,102,51,0,971,969,1,0,0,0,972,975,1,0,0,0,973,971,1,0,
        0,0,973,974,1,0,0,0,974,976,1,0,0,0,975,973,1,0,0,0,976,977,5,107,
        0,0,977,979,1,0,0,0,978,952,1,0,0,0,978,957,1,0,0,0,978,964,1,0,
        0,0,979,121,1,0,0,0,980,991,3,124,62,0,981,991,5,86,0,0,982,991,
        3,126,63,0,983,991,3,148,74,0,984,991,3,160,80,0,985,991,3,70,35,
        0,986,987,3,98,49,0,987,988,5,86,0,0,988,991,1,0,0,0,989,991,3,2,
        1,0,990,980,1,0,0,0,990,981,1,0,0,0,990,982,1,0,0,0,990,983,1,0,
        0,0,990,984,1,0,0,0,990,985,1,0,0,0,990,986,1,0,0,0,990,989,1,0,
        0,0,991,123,1,0,0,0,992,996,5,108,0,0,993,995,3,122,61,0,994,993,
        1,0,0,0,995,998,1,0,0,0,996,994,1,0,0,0,996,997,1,0,0,0,997,999,
        1,0,0,0,998,996,1,0,0,0,999,1000,5,109,0,0,1000,125,1,0,0,0,1001,
        1004,3,134,67,0,1002,1004,3,136,68,0,1003,1001,1,0,0,0,1003,1002,
        1,0,0,0,1004,127,1,0,0,0,1005,1006,5,14,0,0,1006,1007,5,24,0,0,1007,
        1008,5,106,0,0,1008,1009,3,96,48,0,1009,1010,5,107,0,0,1010,1011,
        3,122,61,0,1011,129,1,0,0,0,1012,1013,5,14,0,0,1013,1014,3,122,61,
        0,1014,131,1,0,0,0,1015,1016,5,24,0,0,1016,1017,5,106,0,0,1017,1018,
        3,96,48,0,1018,1019,5,107,0,0,1019,1020,3,122,61,0,1020,133,1,0,
        0,0,1021,1025,3,132,66,0,1022,1024,3,128,64,0,1023,1022,1,0,0,0,
        1024,1027,1,0,0,0,1025,1023,1,0,0,0,1025,1026,1,0,0,0,1026,1029,
        1,0,0,0,1027,1025,1,0,0,0,1028,1030,3,130,65,0,1029,1028,1,0,0,0,
        1029,1030,1,0,0,0,1030,135,1,0,0,0,1031,1032,5,43,0,0,1032,1033,
        5,106,0,0,1033,1034,3,96,48,0,1034,1035,5,107,0,0,1035,1039,5,108,
        0,0,1036,1038,3,70,35,0,1037,1036,1,0,0,0,1038,1041,1,0,0,0,1039,
        1037,1,0,0,0,1039,1040,1,0,0,0,1040,1046,1,0,0,0,1041,1039,1,0,0,
        0,1042,1045,3,144,72,0,1043,1045,3,146,73,0,1044,1042,1,0,0,0,1044,
        1043,1,0,0,0,1045,1048,1,0,0,0,1046,1044,1,0,0,0,1046,1047,1,0,0,
        0,1047,1049,1,0,0,0,1048,1046,1,0,0,0,1049,1050,5,109,0,0,1050,137,
        1,0,0,0,1051,1057,3,142,71,0,1052,1053,3,140,70,0,1053,1054,3,142,
        71,0,1054,1056,1,0,0,0,1055,1052,1,0,0,0,1056,1059,1,0,0,0,1057,
        1055,1,0,0,0,1057,1058,1,0,0,0,1058,1070,1,0,0,0,1059,1057,1,0,0,
        0,1060,1061,5,89,0,0,1061,1067,3,142,71,0,1062,1063,3,140,70,0,1063,
        1064,3,142,71,0,1064,1066,1,0,0,0,1065,1062,1,0,0,0,1066,1069,1,
        0,0,0,1067,1065,1,0,0,0,1067,1068,1,0,0,0,1068,1071,1,0,0,0,1069,
        1067,1,0,0,0,1070,1060,1,0,0,0,1070,1071,1,0,0,0,1071,1100,1,0,0,
        0,1072,1097,4,69,24,0,1073,1074,5,89,0,0,1074,1080,3,142,71,0,1075,
        1076,3,140,70,0,1076,1077,3,142,71,0,1077,1079,1,0,0,0,1078,1075,
        1,0,0,0,1079,1082,1,0,0,0,1080,1078,1,0,0,0,1080,1081,1,0,0,0,1081,
        1098,1,0,0,0,1082,1080,1,0,0,0,1083,1085,5,63,0,0,1084,1083,1,0,
        0,0,1084,1085,1,0,0,0,1085,1086,1,0,0,0,1086,1092,3,142,71,0,1087,
        1088,3,140,70,0,1088,1089,3,142,71,0,1089,1091,1,0,0,0,1090,1087,
        1,0,0,0,1091,1094,1,0,0,0,1092,1090,1,0,0,0,1092,1093,1,0,0,0,1093,
        1095,1,0,0,0,1094,1092,1,0,0,0,1095,1096,5,89,0,0,1096,1098,1,0,
        0,0,1097,1073,1,0,0,0,1097,1084,1,0,0,0,1098,1100,1,0,0,0,1099,1051,
        1,0,0,0,1099,1072,1,0,0,0,1100,139,1,0,0,0,1101,1102,7,24,0,0,1102,
        141,1,0,0,0,1103,1105,5,63,0,0,1104,1103,1,0,0,0,1104,1105,1,0,0,
        0,1105,1106,1,0,0,0,1106,1112,7,25,0,0,1107,1108,5,106,0,0,1108,
        1109,3,102,51,0,1109,1110,5,107,0,0,1110,1112,1,0,0,0,1111,1104,
        1,0,0,0,1111,1107,1,0,0,0,1112,143,1,0,0,0,1113,1114,5,4,0,0,1114,
        1115,3,138,69,0,1115,1119,5,85,0,0,1116,1118,3,122,61,0,1117,1116,
        1,0,0,0,1118,1121,1,0,0,0,1119,1117,1,0,0,0,1119,1120,1,0,0,0,1120,
        145,1,0,0,0,1121,1119,1,0,0,0,1122,1123,5,11,0,0,1123,1127,5,85,
        0,0,1124,1126,3,122,61,0,1125,1124,1,0,0,0,1126,1129,1,0,0,0,1127,
        1125,1,0,0,0,1127,1128,1,0,0,0,1128,147,1,0,0,0,1129,1127,1,0,0,
        0,1130,1131,5,50,0,0,1131,1132,5,106,0,0,1132,1133,3,96,48,0,1133,
        1136,5,107,0,0,1134,1137,3,122,61,0,1135,1137,5,86,0,0,1136,1134,
        1,0,0,0,1136,1135,1,0,0,0,1137,1163,1,0,0,0,1138,1139,5,12,0,0,1139,
        1140,3,122,61,0,1140,1141,5,50,0,0,1141,1142,5,106,0,0,1142,1143,
        3,96,48,0,1143,1144,5,107,0,0,1144,1145,5,86,0,0,1145,1163,1,0,0,
        0,1146,1147,5,19,0,0,1147,1148,5,106,0,0,1148,1149,3,150,75,0,1149,
        1152,5,107,0,0,1150,1153,3,122,61,0,1151,1153,5,86,0,0,1152,1150,
        1,0,0,0,1152,1151,1,0,0,0,1153,1163,1,0,0,0,1154,1155,5,20,0,0,1155,
        1156,5,106,0,0,1156,1157,3,152,76,0,1157,1160,5,107,0,0,1158,1161,
        3,122,61,0,1159,1161,5,86,0,0,1160,1158,1,0,0,0,1160,1159,1,0,0,
        0,1161,1163,1,0,0,0,1162,1130,1,0,0,0,1162,1138,1,0,0,0,1162,1146,
        1,0,0,0,1162,1154,1,0,0,0,1163,149,1,0,0,0,1164,1169,3,154,77,0,
        1165,1166,5,87,0,0,1166,1168,3,154,77,0,1167,1165,1,0,0,0,1168,1171,
        1,0,0,0,1169,1167,1,0,0,0,1169,1170,1,0,0,0,1170,1173,1,0,0,0,1171,
        1169,1,0,0,0,1172,1164,1,0,0,0,1172,1173,1,0,0,0,1173,1174,1,0,0,
        0,1174,1176,5,86,0,0,1175,1177,3,96,48,0,1176,1175,1,0,0,0,1176,
        1177,1,0,0,0,1177,1178,1,0,0,0,1178,1180,5,86,0,0,1179,1181,3,96,
        48,0,1180,1179,1,0,0,0,1180,1181,1,0,0,0,1181,1186,1,0,0,0,1182,
        1183,5,87,0,0,1183,1185,3,96,48,0,1184,1182,1,0,0,0,1185,1188,1,
        0,0,0,1186,1184,1,0,0,0,1186,1187,1,0,0,0,1187,151,1,0,0,0,1188,
        1186,1,0,0,0,1189,1194,3,156,78,0,1190,1191,5,87,0,0,1191,1193,3,
        156,78,0,1192,1190,1,0,0,0,1193,1196,1,0,0,0,1194,1192,1,0,0,0,1194,
        1195,1,0,0,0,1195,1197,1,0,0,0,1196,1194,1,0,0,0,1197,1198,7,26,
        0,0,1198,1201,3,96,48,0,1199,1200,5,89,0,0,1200,1202,3,96,48,0,1201,
        1199,1,0,0,0,1201,1202,1,0,0,0,1202,153,1,0,0,0,1203,1205,3,80,40,
        0,1204,1203,1,0,0,0,1204,1205,1,0,0,0,1205,1206,1,0,0,0,1206,1211,
        3,76,38,0,1207,1208,5,91,0,0,1208,1212,3,78,39,0,1209,1212,5,67,
        0,0,1210,1212,5,68,0,0,1211,1207,1,0,0,0,1211,1209,1,0,0,0,1211,
        1210,1,0,0,0,1211,1212,1,0,0,0,1212,1215,1,0,0,0,1213,1215,3,96,
        48,0,1214,1204,1,0,0,0,1214,1213,1,0,0,0,1215,155,1,0,0,0,1216,1218,
        3,86,43,0,1217,1216,1,0,0,0,1217,1218,1,0,0,0,1218,1219,1,0,0,0,
        1219,1220,3,76,38,0,1220,157,1,0,0,0,1221,1223,5,37,0,0,1222,1224,
        3,98,49,0,1223,1222,1,0,0,0,1223,1224,1,0,0,0,1224,1225,1,0,0,0,
        1225,1226,5,86,0,0,1226,159,1,0,0,0,1227,1228,5,1,0,0,1228,1233,
        5,86,0,0,1229,1230,5,10,0,0,1230,1233,5,86,0,0,1231,1233,3,158,79,
        0,1232,1227,1,0,0,0,1232,1229,1,0,0,0,1232,1231,1,0,0,0,1233,161,
        1,0,0,0,1234,1241,5,124,0,0,1235,1236,5,106,0,0,1236,1237,3,96,48,
        0,1237,1238,5,107,0,0,1238,1241,1,0,0,0,1239,1241,5,118,0,0,1240,
        1234,1,0,0,0,1240,1235,1,0,0,0,1240,1239,1,0,0,0,1241,163,1,0,0,
        0,1242,1243,7,27,0,0,1243,165,1,0,0,0,1244,1246,5,77,0,0,1245,1244,
        1,0,0,0,1245,1246,1,0,0,0,1246,1247,1,0,0,0,1247,1249,3,96,48,0,
        1248,1250,5,88,0,0,1249,1248,1,0,0,0,1249,1250,1,0,0,0,1250,1254,
        1,0,0,0,1251,1252,4,83,25,0,1252,1254,3,84,42,0,1253,1245,1,0,0,
        0,1253,1251,1,0,0,0,1254,167,1,0,0,0,1255,1262,3,166,83,0,1256,1258,
        5,87,0,0,1257,1259,3,166,83,0,1258,1257,1,0,0,0,1258,1259,1,0,0,
        0,1259,1261,1,0,0,0,1260,1256,1,0,0,0,1261,1264,1,0,0,0,1262,1260,
        1,0,0,0,1262,1263,1,0,0,0,1263,169,1,0,0,0,1264,1262,1,0,0,0,166,
        175,177,195,198,205,213,222,230,239,243,250,255,261,268,274,282,
        296,300,305,312,314,319,323,326,333,340,344,358,362,367,371,377,
        386,393,397,402,418,421,425,428,437,441,445,448,451,454,457,465,
        474,482,489,495,500,508,513,516,522,528,533,541,547,562,567,573,
        575,581,588,593,597,600,603,615,618,626,630,644,654,657,667,709,
        711,715,721,729,735,740,745,753,763,777,789,792,795,798,803,810,
        824,833,840,847,857,869,872,878,882,886,890,895,901,904,908,911,
        914,919,922,927,929,932,943,948,950,973,978,990,996,1003,1025,1029,
        1039,1044,1046,1057,1067,1070,1080,1084,1092,1097,1099,1104,1111,
        1119,1127,1136,1152,1160,1162,1169,1172,1176,1180,1186,1194,1201,
        1204,1211,1214,1217,1223,1232,1240,1245,1249,1253,1258,1262
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
    public unionableTypeSpecifier(): UnionableTypeSpecifierContext {
        return this.getRuleContext(0, UnionableTypeSpecifierContext)!;
    }
    public variableModifier(): VariableModifierContext[];
    public variableModifier(i: number): VariableModifierContext | null;
    public variableModifier(i?: number): VariableModifierContext[] | VariableModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VariableModifierContext);
        }

        return this.getRuleContext(i, VariableModifierContext);
    }
    public variableDeclaratorExpression(): VariableDeclaratorExpressionContext[];
    public variableDeclaratorExpression(i: number): VariableDeclaratorExpressionContext | null;
    public variableDeclaratorExpression(i?: number): VariableDeclaratorExpressionContext[] | VariableDeclaratorExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VariableDeclaratorExpressionContext);
        }

        return this.getRuleContext(i, VariableDeclaratorExpressionContext);
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
    public INT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.INT, 0);
    }
    public FLOAT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.FLOAT, 0);
    }
    public FUNCTION(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.FUNCTION, 0);
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
    public conditionalExpression(): ConditionalExpressionContext[];
    public conditionalExpression(i: number): ConditionalExpressionContext | null;
    public conditionalExpression(i?: number): ConditionalExpressionContext[] | ConditionalExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConditionalExpressionContext);
        }

        return this.getRuleContext(i, ConditionalExpressionContext);
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
    public AND(): antlr.TerminalNode[];
    public AND(i: number): antlr.TerminalNode | null;
    public AND(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.AND);
    	} else {
    		return this.getToken(LPCParser.AND, i);
    	}
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
    public LoadObject(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.LoadObject, 0);
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
    public CATCH(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.CATCH, 0);
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
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public AND(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.AND, 0);
    }
    public TRIPPLEDOT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.TRIPPLEDOT, 0);
    }
    public structTypeSpecifier(): StructTypeSpecifierContext | null {
        return this.getRuleContext(0, StructTypeSpecifierContext);
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

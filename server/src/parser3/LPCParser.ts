// Generated from grammar/LPCParser.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { LPCParserListener } from "./LPCParserListener.js";
import { LPCParserVisitor } from "./LPCParserVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class LPCParser extends antlr.Parser {
    public static readonly Identifier = 1;
    public static readonly BREAK = 2;
    public static readonly CASE = 3;
    public static readonly CATCH = 4;
    public static readonly CHAR = 5;
    public static readonly CLOSURE = 6;
    public static readonly CONST = 7;
    public static readonly CONTINUE = 8;
    public static readonly DEFAULT = 9;
    public static readonly DO = 10;
    public static readonly ECHO = 11;
    public static readonly ELSE = 12;
    public static readonly ELIF = 13;
    public static readonly ENDIF = 14;
    public static readonly ENUM = 15;
    public static readonly EXTERN = 16;
    public static readonly FLOAT = 17;
    public static readonly FOR = 18;
    public static readonly FOREACH = 19;
    public static readonly GOTO = 20;
    public static readonly HASH = 21;
    public static readonly IF = 22;
    public static readonly IFDEF = 23;
    public static readonly IFNDEF = 24;
    public static readonly IN = 25;
    public static readonly INCLUDE = 26;
    public static readonly INHERIT = 27;
    public static readonly INT = 28;
    public static readonly LINE = 29;
    public static readonly MAPPING = 30;
    public static readonly MIXED = 31;
    public static readonly OBJECT = 32;
    public static readonly PRAGMA = 33;
    public static readonly RETURN = 34;
    public static readonly STATUS = 35;
    public static readonly STRUCT = 36;
    public static readonly STRING = 37;
    public static readonly SYMBOL = 38;
    public static readonly SWITCH = 39;
    public static readonly TYPEDEF = 40;
    public static readonly UNION = 41;
    public static readonly UNKNOWN = 42;
    public static readonly UNDEF = 43;
    public static readonly VOID = 44;
    public static readonly VOLATILE = 45;
    public static readonly WHILE = 46;
    public static readonly PRIVATE = 47;
    public static readonly PROTECTED = 48;
    public static readonly PUBLIC = 49;
    public static readonly STATIC = 50;
    public static readonly NOSHADOW = 51;
    public static readonly NOSAVE = 52;
    public static readonly NOMASK = 53;
    public static readonly VARARGS = 54;
    public static readonly PLUS = 55;
    public static readonly MINUS = 56;
    public static readonly STAR = 57;
    public static readonly DIV = 58;
    public static readonly MOD = 59;
    public static readonly INC = 60;
    public static readonly DEC = 61;
    public static readonly SHL = 62;
    public static readonly SHR = 63;
    public static readonly LT = 64;
    public static readonly GT = 65;
    public static readonly LE = 66;
    public static readonly GE = 67;
    public static readonly EQ = 68;
    public static readonly NE = 69;
    public static readonly AND = 70;
    public static readonly OR = 71;
    public static readonly XOR = 72;
    public static readonly NOT = 73;
    public static readonly BNOT = 74;
    public static readonly AND_AND = 75;
    public static readonly OR_OR = 76;
    public static readonly QUESTION = 77;
    public static readonly COLON = 78;
    public static readonly SEMI = 79;
    public static readonly COMMA = 80;
    public static readonly DOUBLEDOT = 81;
    public static readonly DOT = 82;
    public static readonly SINGLEQUOT = 83;
    public static readonly SUPER_ACCESSOR = 84;
    public static readonly ASSIGN = 85;
    public static readonly ADD_ASSIGN = 86;
    public static readonly SUB_ASSIGN = 87;
    public static readonly MUL_ASSIGN = 88;
    public static readonly DIV_ASSIGN = 89;
    public static readonly MOD_ASSIGN = 90;
    public static readonly OR_ASSIGN = 91;
    public static readonly AND_ASSIGN = 92;
    public static readonly BITAND_ASSIGN = 93;
    public static readonly BITOR_ASSIGN = 94;
    public static readonly XOR_ASSIGN = 95;
    public static readonly SHL_ASSIGN = 96;
    public static readonly MAPPING_OPEN = 97;
    public static readonly ARROW = 98;
    public static readonly PAREN_OPEN = 99;
    public static readonly PAREN_CLOSE = 100;
    public static readonly CURLY_OPEN = 101;
    public static readonly CURLY_CLOSE = 102;
    public static readonly SQUARE_OPEN = 103;
    public static readonly SQUARE_CLOSE = 104;
    public static readonly BACKSLASH = 105;
    public static readonly IntegerConstant = 106;
    public static readonly FloatingConstant = 107;
    public static readonly HexIntConstant = 108;
    public static readonly STRING_START = 109;
    public static readonly StringLiteral = 110;
    public static readonly CharacterConstant = 111;
    public static readonly CloneObject = 112;
    public static readonly LoadObject = 113;
    public static readonly COMMENT = 114;
    public static readonly LINE_COMMENT = 115;
    public static readonly SOURCEMAP = 116;
    public static readonly DEFINE = 117;
    public static readonly WS = 118;
    public static readonly END_DEFINE = 119;
    public static readonly STRING_END = 120;
    public static readonly NEWLINE = 121;
    public static readonly RULE_program = 0;
    public static readonly RULE_preprocessorDirective = 1;
    public static readonly RULE_includeDirective = 2;
    public static readonly RULE_definePreprocessorDirective = 3;
    public static readonly RULE_selectionDirective = 4;
    public static readonly RULE_selectionDirectiveTypeSingle = 5;
    public static readonly RULE_selectionDirectiveTypeWithArg = 6;
    public static readonly RULE_directiveIfTestExpression = 7;
    public static readonly RULE_directiveIfArgument = 8;
    public static readonly RULE_directiveTypeWithArguments = 9;
    public static readonly RULE_directiveArgument = 10;
    public static readonly RULE_directiveDefineParam = 11;
    public static readonly RULE_directiveDefineArgument = 12;
    public static readonly RULE_directiveTypeInclude = 13;
    public static readonly RULE_directiveIncludeFile = 14;
    public static readonly RULE_directiveIncludeFilename = 15;
    public static readonly RULE_directiveIncludeFileGlobal = 16;
    public static readonly RULE_directiveIncludeFileLocal = 17;
    public static readonly RULE_directiveTypePragma = 18;
    public static readonly RULE_inheritStatement = 19;
    public static readonly RULE_inheritSuperExpression = 20;
    public static readonly RULE_declaration = 21;
    public static readonly RULE_functionModifier = 22;
    public static readonly RULE_functionHeader = 23;
    public static readonly RULE_functionHeaderDeclaration = 24;
    public static readonly RULE_functionDeclaration = 25;
    public static readonly RULE_parameterList = 26;
    public static readonly RULE_parameter = 27;
    public static readonly RULE_structDeclaration = 28;
    public static readonly RULE_structMemberDeclaration = 29;
    public static readonly RULE_arrayExpression = 30;
    public static readonly RULE_mappingContent = 31;
    public static readonly RULE_mappingExpression = 32;
    public static readonly RULE_variableModifier = 33;
    public static readonly RULE_variableDeclaration = 34;
    public static readonly RULE_variableDeclaratorExpression = 35;
    public static readonly RULE_variableDeclarator = 36;
    public static readonly RULE_variableInitializer = 37;
    public static readonly RULE_primitiveTypeSpecifier = 38;
    public static readonly RULE_methodInvocation = 39;
    public static readonly RULE_arrayTypeSpecifier = 40;
    public static readonly RULE_typeSpecifier = 41;
    public static readonly RULE_inlineClosureExpression = 42;
    public static readonly RULE_statement = 43;
    public static readonly RULE_expressionStatement = 44;
    public static readonly RULE_block = 45;
    public static readonly RULE_selectionStatement = 46;
    public static readonly RULE_elseIfExpression = 47;
    public static readonly RULE_elseExpression = 48;
    public static readonly RULE_ifExpression = 49;
    public static readonly RULE_ifStatement = 50;
    public static readonly RULE_switchStatement = 51;
    public static readonly RULE_caseExpression = 52;
    public static readonly RULE_caseStatement = 53;
    public static readonly RULE_defaultStatement = 54;
    public static readonly RULE_iterationStatement = 55;
    public static readonly RULE_forRangeExpression = 56;
    public static readonly RULE_foreachRangeExpression = 57;
    public static readonly RULE_forVariable = 58;
    public static readonly RULE_forEachVariable = 59;
    public static readonly RULE_returnStatement = 60;
    public static readonly RULE_jumpStatement = 61;
    public static readonly RULE_callOtherTarget = 62;
    public static readonly RULE_lambdaExpression = 63;
    public static readonly RULE_rightShiftAssignment = 64;
    public static readonly RULE_literal = 65;
    public static readonly RULE_castExpression = 66;
    public static readonly RULE_assignmentOperator = 67;
    public static readonly RULE_conditionalExpressionBase = 68;
    public static readonly RULE_unaryExpression = 69;
    public static readonly RULE_primaryExpression = 70;
    public static readonly RULE_primaryExpressionStart = 71;
    public static readonly RULE_expression = 72;
    public static readonly RULE_catchExpr = 73;
    public static readonly RULE_bracketExpression = 74;
    public static readonly RULE_argument = 75;
    public static readonly RULE_argumentList = 76;
    public static readonly RULE_expressionList = 77;
    public static readonly RULE_assignmentExpression = 78;
    public static readonly RULE_nonAssignmentExpression = 79;

    public static readonly literalNames = [
        null, null, "'break'", "'case'", "'catch'", "'char'", "'closure'", 
        "'const'", "'continue'", "'default'", "'do'", "'#echo'", "'else'", 
        "'elif'", "'endif'", "'enum'", "'extern'", "'float'", "'for'", "'foreach'", 
        "'goto'", "'#'", "'if'", "'ifdef'", "'ifndef'", "'in'", "'include'", 
        "'inherit'", "'int'", "'#line'", "'mapping'", "'mixed'", "'object'", 
        "'pragma'", "'return'", "'status'", "'struct'", "'string'", "'symbol'", 
        "'switch'", "'typedef'", "'union'", "'unknown'", "'#undef'", "'void'", 
        "'volatile'", "'while'", "'private'", "'protected'", "'public'", 
        "'static'", "'noshadow'", "'nosave'", "'nomask'", "'varargs'", "'+'", 
        "'-'", "'*'", "'/'", "'%'", "'++'", "'--'", "'<<'", "'>>'", "'<'", 
        "'>'", "'<='", "'>='", "'=='", "'!='", "'&'", "'|'", "'^'", "'!'", 
        "'~'", "'&&'", "'||'", "'?'", "':'", "';'", "','", "'..'", "'.'", 
        "'''", "'::'", "'='", "'+='", "'-='", "'*='", "'/='", "'%='", "'||='", 
        "'&&='", "'&='", "'|='", "'^='", "'<<='", "'(['", "'->'", "'('", 
        "')'", "'{'", "'}'", "'['", "']'", "'\\'", null, null, null, null, 
        null, null, "'clone_object'", "'load_object'", null, null, null, 
        null, null, "'\\n'", null, "'\\\\n'"
    ];

    public static readonly symbolicNames = [
        null, "Identifier", "BREAK", "CASE", "CATCH", "CHAR", "CLOSURE", 
        "CONST", "CONTINUE", "DEFAULT", "DO", "ECHO", "ELSE", "ELIF", "ENDIF", 
        "ENUM", "EXTERN", "FLOAT", "FOR", "FOREACH", "GOTO", "HASH", "IF", 
        "IFDEF", "IFNDEF", "IN", "INCLUDE", "INHERIT", "INT", "LINE", "MAPPING", 
        "MIXED", "OBJECT", "PRAGMA", "RETURN", "STATUS", "STRUCT", "STRING", 
        "SYMBOL", "SWITCH", "TYPEDEF", "UNION", "UNKNOWN", "UNDEF", "VOID", 
        "VOLATILE", "WHILE", "PRIVATE", "PROTECTED", "PUBLIC", "STATIC", 
        "NOSHADOW", "NOSAVE", "NOMASK", "VARARGS", "PLUS", "MINUS", "STAR", 
        "DIV", "MOD", "INC", "DEC", "SHL", "SHR", "LT", "GT", "LE", "GE", 
        "EQ", "NE", "AND", "OR", "XOR", "NOT", "BNOT", "AND_AND", "OR_OR", 
        "QUESTION", "COLON", "SEMI", "COMMA", "DOUBLEDOT", "DOT", "SINGLEQUOT", 
        "SUPER_ACCESSOR", "ASSIGN", "ADD_ASSIGN", "SUB_ASSIGN", "MUL_ASSIGN", 
        "DIV_ASSIGN", "MOD_ASSIGN", "OR_ASSIGN", "AND_ASSIGN", "BITAND_ASSIGN", 
        "BITOR_ASSIGN", "XOR_ASSIGN", "SHL_ASSIGN", "MAPPING_OPEN", "ARROW", 
        "PAREN_OPEN", "PAREN_CLOSE", "CURLY_OPEN", "CURLY_CLOSE", "SQUARE_OPEN", 
        "SQUARE_CLOSE", "BACKSLASH", "IntegerConstant", "FloatingConstant", 
        "HexIntConstant", "STRING_START", "StringLiteral", "CharacterConstant", 
        "CloneObject", "LoadObject", "COMMENT", "LINE_COMMENT", "SOURCEMAP", 
        "DEFINE", "WS", "END_DEFINE", "STRING_END", "NEWLINE"
    ];
    public static readonly ruleNames = [
        "program", "preprocessorDirective", "includeDirective", "definePreprocessorDirective", 
        "selectionDirective", "selectionDirectiveTypeSingle", "selectionDirectiveTypeWithArg", 
        "directiveIfTestExpression", "directiveIfArgument", "directiveTypeWithArguments", 
        "directiveArgument", "directiveDefineParam", "directiveDefineArgument", 
        "directiveTypeInclude", "directiveIncludeFile", "directiveIncludeFilename", 
        "directiveIncludeFileGlobal", "directiveIncludeFileLocal", "directiveTypePragma", 
        "inheritStatement", "inheritSuperExpression", "declaration", "functionModifier", 
        "functionHeader", "functionHeaderDeclaration", "functionDeclaration", 
        "parameterList", "parameter", "structDeclaration", "structMemberDeclaration", 
        "arrayExpression", "mappingContent", "mappingExpression", "variableModifier", 
        "variableDeclaration", "variableDeclaratorExpression", "variableDeclarator", 
        "variableInitializer", "primitiveTypeSpecifier", "methodInvocation", 
        "arrayTypeSpecifier", "typeSpecifier", "inlineClosureExpression", 
        "statement", "expressionStatement", "block", "selectionStatement", 
        "elseIfExpression", "elseExpression", "ifExpression", "ifStatement", 
        "switchStatement", "caseExpression", "caseStatement", "defaultStatement", 
        "iterationStatement", "forRangeExpression", "foreachRangeExpression", 
        "forVariable", "forEachVariable", "returnStatement", "jumpStatement", 
        "callOtherTarget", "lambdaExpression", "rightShiftAssignment", "literal", 
        "castExpression", "assignmentOperator", "conditionalExpressionBase", 
        "unaryExpression", "primaryExpression", "primaryExpressionStart", 
        "expression", "catchExpr", "bracketExpression", "argument", "argumentList", 
        "expressionList", "assignmentExpression", "nonAssignmentExpression",
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
            this.state = 165;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4162979938) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 41917561) !== 0) || _la === 110 || _la === 117) {
                {
                this.state = 163;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.Identifier:
                case LPCParser.CHAR:
                case LPCParser.CLOSURE:
                case LPCParser.FLOAT:
                case LPCParser.INT:
                case LPCParser.MAPPING:
                case LPCParser.MIXED:
                case LPCParser.OBJECT:
                case LPCParser.STATUS:
                case LPCParser.STRUCT:
                case LPCParser.STRING:
                case LPCParser.SYMBOL:
                case LPCParser.UNKNOWN:
                case LPCParser.VOID:
                case LPCParser.PRIVATE:
                case LPCParser.PROTECTED:
                case LPCParser.PUBLIC:
                case LPCParser.STATIC:
                case LPCParser.NOSHADOW:
                case LPCParser.NOSAVE:
                case LPCParser.NOMASK:
                case LPCParser.VARARGS:
                case LPCParser.STAR:
                case LPCParser.StringLiteral:
                    {
                    this.state = 160;
                    this.declaration();
                    }
                    break;
                case LPCParser.ECHO:
                case LPCParser.HASH:
                case LPCParser.LINE:
                case LPCParser.UNDEF:
                case LPCParser.DEFINE:
                    {
                    this.state = 161;
                    this.preprocessorDirective();
                    }
                    break;
                case LPCParser.INHERIT:
                    {
                    this.state = 162;
                    this.inheritStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 167;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 168;
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
            this.state = 186;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 170;
                this.selectionDirective();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 171;
                this.directiveTypeWithArguments();
                this.state = 172;
                this.directiveArgument();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 174;
                this.definePreprocessorDirective();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 175;
                this.includeDirective();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 176;
                this.match(LPCParser.HASH);
                this.state = 177;
                this.directiveTypePragma();
                this.state = 178;
                this.match(LPCParser.Identifier);
                this.state = 183;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 80) {
                    {
                    {
                    this.state = 179;
                    this.match(LPCParser.COMMA);
                    this.state = 180;
                    this.match(LPCParser.Identifier);
                    }
                    }
                    this.state = 185;
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
    public includeDirective(): IncludeDirectiveContext {
        let localContext = new IncludeDirectiveContext(this.context, this.state);
        this.enterRule(localContext, 4, LPCParser.RULE_includeDirective);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 188;
            this.match(LPCParser.HASH);
            this.state = 189;
            this.directiveTypeInclude();
            this.state = 190;
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
            this.state = 192;
            this.match(LPCParser.DEFINE);
            this.state = 193;
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
    public selectionDirective(): SelectionDirectiveContext {
        let localContext = new SelectionDirectiveContext(this.context, this.state);
        this.enterRule(localContext, 8, LPCParser.RULE_selectionDirective);
        let _la: number;
        try {
            this.state = 207;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 195;
                this.match(LPCParser.HASH);
                this.state = 196;
                this.selectionDirectiveTypeWithArg();
                this.state = 198;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 73) {
                    {
                    this.state = 197;
                    this.match(LPCParser.NOT);
                    }
                }

                this.state = 200;
                this.directiveArgument();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 202;
                this.match(LPCParser.HASH);
                this.state = 203;
                _la = this.tokenStream.LA(1);
                if(!(_la === 13 || _la === 22)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 204;
                this.directiveIfTestExpression(0);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 205;
                this.match(LPCParser.HASH);
                this.state = 206;
                this.selectionDirectiveTypeSingle();
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
    public selectionDirectiveTypeSingle(): SelectionDirectiveTypeSingleContext {
        let localContext = new SelectionDirectiveTypeSingleContext(this.context, this.state);
        this.enterRule(localContext, 10, LPCParser.RULE_selectionDirectiveTypeSingle);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 209;
            _la = this.tokenStream.LA(1);
            if(!(_la === 12 || _la === 14)) {
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
    public selectionDirectiveTypeWithArg(): SelectionDirectiveTypeWithArgContext {
        let localContext = new SelectionDirectiveTypeWithArgContext(this.context, this.state);
        this.enterRule(localContext, 12, LPCParser.RULE_selectionDirectiveTypeWithArg);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 211;
            _la = this.tokenStream.LA(1);
            if(!(_la === 23 || _la === 24)) {
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
            this.state = 215;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 73) {
                {
                this.state = 214;
                this.match(LPCParser.NOT);
                }
            }

            this.state = 217;
            this.directiveIfArgument();
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 277;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 16, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 275;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 15, this.context) ) {
                    case 1:
                        {
                        localContext = new DirectiveIfTestExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_directiveIfTestExpression);
                        this.state = 219;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 222;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 220;
                                this.match(LPCParser.AND_AND);
                                this.state = 221;
                                this.directiveIfTestExpression(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 224;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 2:
                        {
                        localContext = new DirectiveIfTestExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_directiveIfTestExpression);
                        this.state = 226;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
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
                                this.match(LPCParser.OR_OR);
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
                        break;
                    case 3:
                        {
                        localContext = new DirectiveIfTestExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_directiveIfTestExpression);
                        this.state = 233;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 236;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 234;
                                this.match(LPCParser.EQ);
                                this.state = 235;
                                this.directiveIfTestExpression(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 238;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 9, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 4:
                        {
                        localContext = new DirectiveIfTestExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_directiveIfTestExpression);
                        this.state = 240;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 243;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 241;
                                this.match(LPCParser.NE);
                                this.state = 242;
                                this.directiveIfTestExpression(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 245;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 10, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 5:
                        {
                        localContext = new DirectiveIfTestExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_directiveIfTestExpression);
                        this.state = 247;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 250;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 248;
                                this.match(LPCParser.LT);
                                this.state = 249;
                                this.directiveIfTestExpression(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 252;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 6:
                        {
                        localContext = new DirectiveIfTestExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_directiveIfTestExpression);
                        this.state = 254;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 257;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 255;
                                this.match(LPCParser.GT);
                                this.state = 256;
                                this.directiveIfTestExpression(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 259;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 12, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 7:
                        {
                        localContext = new DirectiveIfTestExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_directiveIfTestExpression);
                        this.state = 261;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 264;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 262;
                                this.match(LPCParser.LE);
                                this.state = 263;
                                this.directiveIfTestExpression(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 266;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 13, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 8:
                        {
                        localContext = new DirectiveIfTestExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_directiveIfTestExpression);
                        this.state = 268;
                        if (!(this.precpred(this.context, 1))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                        }
                        this.state = 271;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 269;
                                this.match(LPCParser.GE);
                                this.state = 270;
                                this.directiveIfTestExpression(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 273;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 14, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    }
                    }
                }
                this.state = 279;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 16, this.context);
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
            this.state = 288;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 280;
                this.match(LPCParser.Identifier);
                this.state = 284;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context) ) {
                case 1:
                    {
                    this.state = 281;
                    this.match(LPCParser.PAREN_OPEN);
                    this.state = 282;
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 1 || _la === 106 || _la === 110)) {
                    this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 283;
                    this.match(LPCParser.PAREN_CLOSE);
                    }
                    break;
                }
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 286;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case LPCParser.IntegerConstant:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 287;
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
    public directiveTypeWithArguments(): DirectiveTypeWithArgumentsContext {
        let localContext = new DirectiveTypeWithArgumentsContext(this.context, this.state);
        this.enterRule(localContext, 18, LPCParser.RULE_directiveTypeWithArguments);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 290;
            _la = this.tokenStream.LA(1);
            if(!(_la === 11 || _la === 29 || _la === 43)) {
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
    public directiveArgument(): DirectiveArgumentContext {
        let localContext = new DirectiveArgumentContext(this.context, this.state);
        this.enterRule(localContext, 20, LPCParser.RULE_directiveArgument);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 292;
            _la = this.tokenStream.LA(1);
            if(!(_la === 1 || _la === 106 || _la === 110)) {
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
    public directiveDefineParam(): DirectiveDefineParamContext {
        let localContext = new DirectiveDefineParamContext(this.context, this.state);
        this.enterRule(localContext, 22, LPCParser.RULE_directiveDefineParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 294;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 295;
            this.match(LPCParser.Identifier);
            this.state = 300;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 80) {
                {
                {
                this.state = 296;
                this.match(LPCParser.COMMA);
                this.state = 297;
                this.match(LPCParser.Identifier);
                }
                }
                this.state = 302;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 303;
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
            this.state = 305;
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
            this.state = 307;
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
            this.state = 312;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.LT:
                localContext = new IncludeGlobalFileContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 309;
                this.directiveIncludeFileGlobal();
                }
                break;
            case LPCParser.StringLiteral:
                localContext = new IncludeLocalFileContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 310;
                this.directiveIncludeFileLocal();
                }
                break;
            case LPCParser.Identifier:
                localContext = new IncludeDefineContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 311;
                this.match(LPCParser.Identifier);
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
    public directiveIncludeFilename(): DirectiveIncludeFilenameContext {
        let localContext = new DirectiveIncludeFilenameContext(this.context, this.state);
        this.enterRule(localContext, 30, LPCParser.RULE_directiveIncludeFilename);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 314;
            this.match(LPCParser.Identifier);
            this.state = 317;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 82) {
                {
                this.state = 315;
                this.match(LPCParser.DOT);
                this.state = 316;
                this.match(LPCParser.Identifier);
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
    public directiveIncludeFileGlobal(): DirectiveIncludeFileGlobalContext {
        let localContext = new DirectiveIncludeFileGlobalContext(this.context, this.state);
        this.enterRule(localContext, 32, LPCParser.RULE_directiveIncludeFileGlobal);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 319;
            this.match(LPCParser.LT);
            this.state = 320;
            this.directiveIncludeFilename();
            this.state = 321;
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
    public directiveIncludeFileLocal(): DirectiveIncludeFileLocalContext {
        let localContext = new DirectiveIncludeFileLocalContext(this.context, this.state);
        this.enterRule(localContext, 34, LPCParser.RULE_directiveIncludeFileLocal);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 323;
            this.match(LPCParser.StringLiteral);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 36, LPCParser.RULE_directiveTypePragma);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 325;
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
        this.enterRule(localContext, 38, LPCParser.RULE_inheritStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 327;
            this.match(LPCParser.INHERIT);
            this.state = 328;
            localContext._inheritTarget = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 1 || _la === 110)) {
                localContext._inheritTarget = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 329;
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
    public inheritSuperExpression(): InheritSuperExpressionContext {
        let localContext = new InheritSuperExpressionContext(this.context, this.state);
        this.enterRule(localContext, 40, LPCParser.RULE_inheritSuperExpression);
        try {
            this.state = 339;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.SUPER_ACCESSOR:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 331;
                this.match(LPCParser.SUPER_ACCESSOR);
                this.state = 332;
                this.expression();
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 333;
                localContext._filename = this.match(LPCParser.StringLiteral);
                this.state = 334;
                this.match(LPCParser.SUPER_ACCESSOR);
                this.state = 335;
                this.expression();
                }
                break;
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 336;
                localContext._filename = this.match(LPCParser.Identifier);
                this.state = 337;
                this.match(LPCParser.SUPER_ACCESSOR);
                this.state = 338;
                this.expression();
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
    public declaration(): DeclarationContext {
        let localContext = new DeclarationContext(this.context, this.state);
        this.enterRule(localContext, 42, LPCParser.RULE_declaration);
        try {
            this.state = 345;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 23, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 341;
                this.functionHeaderDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 342;
                this.functionDeclaration();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 343;
                this.structDeclaration();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 344;
                this.variableDeclaration();
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
            this.state = 347;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 223) !== 0))) {
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
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 352;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 223) !== 0)) {
                {
                {
                this.state = 349;
                this.functionModifier();
                }
                }
                this.state = 354;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 356;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33559657) !== 0)) {
                {
                this.state = 355;
                this.typeSpecifier();
                }
            }

            this.state = 358;
            localContext._functionName = this.match(LPCParser.Identifier);
            this.state = 359;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 361;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792098) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 37753977) !== 0)) {
                {
                this.state = 360;
                localContext._functionArgs = this.parameterList();
                }
            }

            this.state = 363;
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
            this.state = 365;
            this.functionHeader();
            this.state = 366;
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
            this.state = 368;
            this.functionHeader();
            this.state = 369;
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
        this.enterRule(localContext, 52, LPCParser.RULE_parameterList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 371;
            this.parameter();
            this.state = 376;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 80) {
                {
                {
                this.state = 372;
                this.match(LPCParser.COMMA);
                this.state = 373;
                this.parameter();
                }
                }
                this.state = 378;
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
    public parameter(): ParameterContext {
        let localContext = new ParameterContext(this.context, this.state);
        this.enterRule(localContext, 54, LPCParser.RULE_parameter);
        let _la: number;
        try {
            this.state = 389;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.Identifier:
            case LPCParser.CHAR:
            case LPCParser.CLOSURE:
            case LPCParser.FLOAT:
            case LPCParser.INT:
            case LPCParser.MAPPING:
            case LPCParser.MIXED:
            case LPCParser.OBJECT:
            case LPCParser.STATUS:
            case LPCParser.STRING:
            case LPCParser.SYMBOL:
            case LPCParser.UNKNOWN:
            case LPCParser.VOID:
            case LPCParser.VARARGS:
            case LPCParser.STAR:
                localContext = new PrimitiveTypeParameterExpressionContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 380;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 54) {
                    {
                    this.state = 379;
                    this.match(LPCParser.VARARGS);
                    }
                }

                this.state = 383;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33559657) !== 0)) {
                    {
                    this.state = 382;
                    (localContext as PrimitiveTypeParameterExpressionContext)._paramType = this.typeSpecifier();
                    }
                }

                this.state = 385;
                (localContext as PrimitiveTypeParameterExpressionContext)._paramName = this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.STRUCT:
                localContext = new StructParameterExpressionContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 386;
                (localContext as StructParameterExpressionContext)._paramType = this.match(LPCParser.STRUCT);
                this.state = 387;
                (localContext as StructParameterExpressionContext)._structName = this.match(LPCParser.Identifier);
                this.state = 388;
                (localContext as StructParameterExpressionContext)._paramName = this.match(LPCParser.Identifier);
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
    public structDeclaration(): StructDeclarationContext {
        let localContext = new StructDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 56, LPCParser.RULE_structDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 391;
            this.match(LPCParser.STRUCT);
            this.state = 392;
            localContext._structName = this.match(LPCParser.Identifier);
            this.state = 393;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 397;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33559657) !== 0)) {
                {
                {
                this.state = 394;
                localContext._structMembers = this.structMemberDeclaration();
                }
                }
                this.state = 399;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 400;
            this.match(LPCParser.CURLY_CLOSE);
            this.state = 401;
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
        this.enterRule(localContext, 58, LPCParser.RULE_structMemberDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 403;
            this.typeSpecifier();
            this.state = 404;
            this.match(LPCParser.Identifier);
            this.state = 405;
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
    public arrayExpression(): ArrayExpressionContext {
        let localContext = new ArrayExpressionContext(this.context, this.state);
        this.enterRule(localContext, 60, LPCParser.RULE_arrayExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 407;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 408;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 417;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 806125671) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 126469) !== 0)) {
                {
                this.state = 409;
                this.expression();
                this.state = 414;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 410;
                        this.match(LPCParser.COMMA);
                        this.state = 411;
                        this.expression();
                        }
                        }
                    }
                    this.state = 416;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
                }
                }
            }

            this.state = 420;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 80) {
                {
                this.state = 419;
                this.match(LPCParser.COMMA);
                }
            }

            this.state = 422;
            this.match(LPCParser.CURLY_CLOSE);
            this.state = 423;
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
        this.enterRule(localContext, 62, LPCParser.RULE_mappingContent);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 425;
            localContext._mappingKey = this.expression();
            this.state = 435;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 78) {
                {
                this.state = 426;
                this.match(LPCParser.COLON);
                this.state = 427;
                this.expression();
                this.state = 432;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 79) {
                    {
                    {
                    this.state = 428;
                    this.match(LPCParser.SEMI);
                    this.state = 429;
                    this.expression();
                    }
                    }
                    this.state = 434;
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
        this.enterRule(localContext, 64, LPCParser.RULE_mappingExpression);
        let _la: number;
        try {
            let alternative: number;
            this.state = 459;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 40, this.context) ) {
            case 1:
                localContext = new MappingValueInitializerContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 437;
                this.match(LPCParser.MAPPING_OPEN);
                this.state = 446;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 806125671) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 126469) !== 0)) {
                    {
                    this.state = 438;
                    this.mappingContent();
                    this.state = 443;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 37, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 439;
                            this.match(LPCParser.COMMA);
                            this.state = 440;
                            this.mappingContent();
                            }
                            }
                        }
                        this.state = 445;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 37, this.context);
                    }
                    }
                }

                this.state = 449;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 80) {
                    {
                    this.state = 448;
                    this.match(LPCParser.COMMA);
                    }
                }

                this.state = 451;
                this.match(LPCParser.SQUARE_CLOSE);
                this.state = 452;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 2:
                localContext = new MappingEmptyInitializerContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 453;
                this.match(LPCParser.MAPPING_OPEN);
                this.state = 454;
                this.match(LPCParser.COLON);
                this.state = 455;
                this.expression();
                this.state = 456;
                this.match(LPCParser.SQUARE_CLOSE);
                this.state = 457;
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
    public variableModifier(): VariableModifierContext {
        let localContext = new VariableModifierContext(this.context, this.state);
        this.enterRule(localContext, 66, LPCParser.RULE_variableModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 461;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 63) !== 0))) {
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
    public variableDeclaration(): VariableDeclarationContext {
        let localContext = new VariableDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 68, LPCParser.RULE_variableDeclaration);
        let _la: number;
        try {
            this.state = 504;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 47, this.context) ) {
            case 1:
                localContext = new PrimitiveTypeVariableDeclarationContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 466;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 63) !== 0)) {
                    {
                    {
                    this.state = 463;
                    this.variableModifier();
                    }
                    }
                    this.state = 468;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 470;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 5225) !== 0)) {
                    {
                    this.state = 469;
                    this.primitiveTypeSpecifier();
                    }
                }

                this.state = 473;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 110) {
                    {
                    this.state = 472;
                    (localContext as PrimitiveTypeVariableDeclarationContext)._objectName = this.match(LPCParser.StringLiteral);
                    }
                }

                this.state = 475;
                this.variableDeclaratorExpression();
                this.state = 480;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 80) {
                    {
                    {
                    this.state = 476;
                    this.match(LPCParser.COMMA);
                    this.state = 477;
                    this.variableDeclaratorExpression();
                    }
                    }
                    this.state = 482;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 483;
                this.match(LPCParser.SEMI);
                }
                break;
            case 2:
                localContext = new StructVariableDeclarationContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 488;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 63) !== 0)) {
                    {
                    {
                    this.state = 485;
                    this.variableModifier();
                    }
                    }
                    this.state = 490;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 491;
                this.match(LPCParser.STRUCT);
                this.state = 492;
                (localContext as StructVariableDeclarationContext)._structName = this.match(LPCParser.Identifier);
                this.state = 493;
                this.variableDeclaratorExpression();
                this.state = 499;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 80) {
                    {
                    {
                    this.state = 494;
                    this.match(LPCParser.COMMA);
                    this.state = 495;
                    (localContext as StructVariableDeclarationContext)._structName = this.match(LPCParser.Identifier);
                    this.state = 496;
                    this.variableDeclaratorExpression();
                    }
                    }
                    this.state = 501;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 502;
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
    public variableDeclaratorExpression(): VariableDeclaratorExpressionContext {
        let localContext = new VariableDeclaratorExpressionContext(this.context, this.state);
        this.enterRule(localContext, 70, LPCParser.RULE_variableDeclaratorExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 506;
            this.variableDeclarator();
            this.state = 509;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 85) {
                {
                this.state = 507;
                this.match(LPCParser.ASSIGN);
                this.state = 508;
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
            this.state = 512;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 57) {
                {
                this.state = 511;
                localContext._arraySpecifier = this.match(LPCParser.STAR);
                }
            }

            this.state = 514;
            localContext._variableName = this.match(LPCParser.Identifier);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
            this.state = 519;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 50, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 516;
                this.expression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 517;
                this.arrayExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 518;
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
        this.enterRule(localContext, 76, LPCParser.RULE_primitiveTypeSpecifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 521;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 5225) !== 0))) {
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
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 523;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 525;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 806125671) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 126469) !== 0)) {
                {
                this.state = 524;
                this.argumentList();
                }
            }

            this.state = 527;
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
    public arrayTypeSpecifier(): ArrayTypeSpecifierContext {
        let localContext = new ArrayTypeSpecifierContext(this.context, this.state);
        this.enterRule(localContext, 80, LPCParser.RULE_arrayTypeSpecifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 530;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 5225) !== 0)) {
                {
                this.state = 529;
                this.primitiveTypeSpecifier();
                }
            }

            this.state = 532;
            this.match(LPCParser.STAR);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
            this.state = 536;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 53, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 534;
                this.primitiveTypeSpecifier();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 535;
                this.arrayTypeSpecifier();
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
        this.enterRule(localContext, 84, LPCParser.RULE_inlineClosureExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 538;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 539;
            this.match(LPCParser.COLON);
            this.state = 547;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 55, this.context) ) {
            case 1:
                {
                this.state = 540;
                this.expression();
                }
                break;
            case 2:
                {
                this.state = 544;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871286) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 866112765) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 2818596889) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 247) !== 0)) {
                    {
                    {
                    this.state = 541;
                    this.statement();
                    }
                    }
                    this.state = 546;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            }
            this.state = 549;
            this.match(LPCParser.COLON);
            this.state = 550;
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
    public statement(): StatementContext {
        let localContext = new StatementContext(this.context, this.state);
        this.enterRule(localContext, 86, LPCParser.RULE_statement);
        try {
            this.state = 560;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 56, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 552;
                this.expressionStatement();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 553;
                this.block();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 554;
                this.selectionStatement();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 555;
                this.iterationStatement();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 556;
                this.jumpStatement();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 557;
                this.variableDeclaration();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 558;
                this.selectionDirective();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 559;
                this.returnStatement();
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
    public expressionStatement(): ExpressionStatementContext {
        let localContext = new ExpressionStatementContext(this.context, this.state);
        this.enterRule(localContext, 88, LPCParser.RULE_expressionStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 562;
            this.expression();
            this.state = 563;
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
    public block(): BlockContext {
        let localContext = new BlockContext(this.context, this.state);
        this.enterRule(localContext, 90, LPCParser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 565;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 569;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871286) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 866112765) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 2818596889) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 247) !== 0)) {
                {
                {
                this.state = 566;
                this.statement();
                }
                }
                this.state = 571;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 572;
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
        this.enterRule(localContext, 92, LPCParser.RULE_selectionStatement);
        try {
            this.state = 576;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.IF:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 574;
                this.ifStatement();
                }
                break;
            case LPCParser.SWITCH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 575;
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
        this.enterRule(localContext, 94, LPCParser.RULE_elseIfExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 578;
            this.match(LPCParser.ELSE);
            this.state = 579;
            this.match(LPCParser.IF);
            this.state = 580;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 581;
            this.expression();
            this.state = 582;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 583;
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
        this.enterRule(localContext, 96, LPCParser.RULE_elseExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 585;
            this.match(LPCParser.ELSE);
            this.state = 586;
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
        this.enterRule(localContext, 98, LPCParser.RULE_ifExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 588;
            this.match(LPCParser.IF);
            this.state = 589;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 590;
            this.expression();
            this.state = 591;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 592;
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
        this.enterRule(localContext, 100, LPCParser.RULE_ifStatement);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 594;
            this.ifExpression();
            this.state = 598;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 59, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 595;
                    this.elseIfExpression();
                    }
                    }
                }
                this.state = 600;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 59, this.context);
            }
            this.state = 602;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 60, this.context) ) {
            case 1:
                {
                this.state = 601;
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
        this.enterRule(localContext, 102, LPCParser.RULE_switchStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 604;
            this.match(LPCParser.SWITCH);
            this.state = 605;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 606;
            this.expression();
            this.state = 607;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 608;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 613;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 3 || _la === 9) {
                {
                this.state = 611;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.CASE:
                    {
                    this.state = 609;
                    this.caseStatement();
                    }
                    break;
                case LPCParser.DEFAULT:
                    {
                    this.state = 610;
                    this.defaultStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 615;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 616;
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
        this.enterRule(localContext, 104, LPCParser.RULE_caseExpression);
        let _la: number;
        try {
            this.state = 643;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 69, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 624;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.StringLiteral:
                    {
                    this.state = 618;
                    this.match(LPCParser.StringLiteral);
                    }
                    break;
                case LPCParser.MINUS:
                case LPCParser.IntegerConstant:
                    {
                    this.state = 620;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 56) {
                        {
                        this.state = 619;
                        this.match(LPCParser.MINUS);
                        }
                    }

                    this.state = 622;
                    this.match(LPCParser.IntegerConstant);
                    }
                    break;
                case LPCParser.Identifier:
                    {
                    this.state = 623;
                    this.match(LPCParser.Identifier);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 632;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.StringLiteral:
                    {
                    this.state = 626;
                    this.match(LPCParser.StringLiteral);
                    }
                    break;
                case LPCParser.MINUS:
                case LPCParser.IntegerConstant:
                    {
                    this.state = 628;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 56) {
                        {
                        this.state = 627;
                        this.match(LPCParser.MINUS);
                        }
                    }

                    this.state = 630;
                    this.match(LPCParser.IntegerConstant);
                    }
                    break;
                case LPCParser.Identifier:
                    {
                    this.state = 631;
                    this.match(LPCParser.Identifier);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 634;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 641;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.StringLiteral:
                    {
                    this.state = 635;
                    this.match(LPCParser.StringLiteral);
                    }
                    break;
                case LPCParser.MINUS:
                case LPCParser.IntegerConstant:
                    {
                    this.state = 637;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 56) {
                        {
                        this.state = 636;
                        this.match(LPCParser.MINUS);
                        }
                    }

                    this.state = 639;
                    this.match(LPCParser.IntegerConstant);
                    }
                    break;
                case LPCParser.Identifier:
                    {
                    this.state = 640;
                    this.match(LPCParser.Identifier);
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
    public caseStatement(): CaseStatementContext {
        let localContext = new CaseStatementContext(this.context, this.state);
        this.enterRule(localContext, 106, LPCParser.RULE_caseStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 645;
            this.match(LPCParser.CASE);
            this.state = 646;
            this.caseExpression();
            this.state = 647;
            this.match(LPCParser.COLON);
            this.state = 651;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871286) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 866112765) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 2818596889) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 247) !== 0)) {
                {
                {
                this.state = 648;
                this.statement();
                }
                }
                this.state = 653;
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
        this.enterRule(localContext, 108, LPCParser.RULE_defaultStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 654;
            this.match(LPCParser.DEFAULT);
            this.state = 655;
            this.match(LPCParser.COLON);
            this.state = 659;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871286) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 866112765) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 2818596889) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 247) !== 0)) {
                {
                {
                this.state = 656;
                this.statement();
                }
                }
                this.state = 661;
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
        this.enterRule(localContext, 110, LPCParser.RULE_iterationStatement);
        try {
            this.state = 694;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.WHILE:
                localContext = new WhileStatementContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 662;
                this.match(LPCParser.WHILE);
                this.state = 663;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 664;
                this.expression();
                this.state = 665;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 668;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.Identifier:
                case LPCParser.BREAK:
                case LPCParser.CATCH:
                case LPCParser.CHAR:
                case LPCParser.CLOSURE:
                case LPCParser.CONTINUE:
                case LPCParser.DO:
                case LPCParser.FLOAT:
                case LPCParser.FOR:
                case LPCParser.FOREACH:
                case LPCParser.HASH:
                case LPCParser.IF:
                case LPCParser.INT:
                case LPCParser.MAPPING:
                case LPCParser.MIXED:
                case LPCParser.OBJECT:
                case LPCParser.RETURN:
                case LPCParser.STATUS:
                case LPCParser.STRUCT:
                case LPCParser.STRING:
                case LPCParser.SYMBOL:
                case LPCParser.SWITCH:
                case LPCParser.UNKNOWN:
                case LPCParser.VOID:
                case LPCParser.WHILE:
                case LPCParser.PRIVATE:
                case LPCParser.PROTECTED:
                case LPCParser.PUBLIC:
                case LPCParser.STATIC:
                case LPCParser.NOSHADOW:
                case LPCParser.NOSAVE:
                case LPCParser.PLUS:
                case LPCParser.MINUS:
                case LPCParser.STAR:
                case LPCParser.INC:
                case LPCParser.DEC:
                case LPCParser.AND:
                case LPCParser.NOT:
                case LPCParser.BNOT:
                case LPCParser.SINGLEQUOT:
                case LPCParser.SUPER_ACCESSOR:
                case LPCParser.MAPPING_OPEN:
                case LPCParser.PAREN_OPEN:
                case LPCParser.CURLY_OPEN:
                case LPCParser.IntegerConstant:
                case LPCParser.FloatingConstant:
                case LPCParser.HexIntConstant:
                case LPCParser.StringLiteral:
                case LPCParser.CharacterConstant:
                case LPCParser.CloneObject:
                case LPCParser.LoadObject:
                    {
                    this.state = 666;
                    this.statement();
                    }
                    break;
                case LPCParser.SEMI:
                    {
                    this.state = 667;
                    this.match(LPCParser.SEMI);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                break;
            case LPCParser.DO:
                localContext = new DoWhileStatementContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 670;
                this.match(LPCParser.DO);
                this.state = 671;
                this.statement();
                this.state = 672;
                this.match(LPCParser.WHILE);
                this.state = 673;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 674;
                this.expression();
                this.state = 675;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 676;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.FOR:
                localContext = new ForStatementContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 678;
                this.match(LPCParser.FOR);
                this.state = 679;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 680;
                this.forRangeExpression();
                this.state = 681;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 684;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.Identifier:
                case LPCParser.BREAK:
                case LPCParser.CATCH:
                case LPCParser.CHAR:
                case LPCParser.CLOSURE:
                case LPCParser.CONTINUE:
                case LPCParser.DO:
                case LPCParser.FLOAT:
                case LPCParser.FOR:
                case LPCParser.FOREACH:
                case LPCParser.HASH:
                case LPCParser.IF:
                case LPCParser.INT:
                case LPCParser.MAPPING:
                case LPCParser.MIXED:
                case LPCParser.OBJECT:
                case LPCParser.RETURN:
                case LPCParser.STATUS:
                case LPCParser.STRUCT:
                case LPCParser.STRING:
                case LPCParser.SYMBOL:
                case LPCParser.SWITCH:
                case LPCParser.UNKNOWN:
                case LPCParser.VOID:
                case LPCParser.WHILE:
                case LPCParser.PRIVATE:
                case LPCParser.PROTECTED:
                case LPCParser.PUBLIC:
                case LPCParser.STATIC:
                case LPCParser.NOSHADOW:
                case LPCParser.NOSAVE:
                case LPCParser.PLUS:
                case LPCParser.MINUS:
                case LPCParser.STAR:
                case LPCParser.INC:
                case LPCParser.DEC:
                case LPCParser.AND:
                case LPCParser.NOT:
                case LPCParser.BNOT:
                case LPCParser.SINGLEQUOT:
                case LPCParser.SUPER_ACCESSOR:
                case LPCParser.MAPPING_OPEN:
                case LPCParser.PAREN_OPEN:
                case LPCParser.CURLY_OPEN:
                case LPCParser.IntegerConstant:
                case LPCParser.FloatingConstant:
                case LPCParser.HexIntConstant:
                case LPCParser.StringLiteral:
                case LPCParser.CharacterConstant:
                case LPCParser.CloneObject:
                case LPCParser.LoadObject:
                    {
                    this.state = 682;
                    this.statement();
                    }
                    break;
                case LPCParser.SEMI:
                    {
                    this.state = 683;
                    this.match(LPCParser.SEMI);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                break;
            case LPCParser.FOREACH:
                localContext = new ForEachStatementContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 686;
                this.match(LPCParser.FOREACH);
                this.state = 687;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 688;
                this.foreachRangeExpression();
                this.state = 689;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 692;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.Identifier:
                case LPCParser.BREAK:
                case LPCParser.CATCH:
                case LPCParser.CHAR:
                case LPCParser.CLOSURE:
                case LPCParser.CONTINUE:
                case LPCParser.DO:
                case LPCParser.FLOAT:
                case LPCParser.FOR:
                case LPCParser.FOREACH:
                case LPCParser.HASH:
                case LPCParser.IF:
                case LPCParser.INT:
                case LPCParser.MAPPING:
                case LPCParser.MIXED:
                case LPCParser.OBJECT:
                case LPCParser.RETURN:
                case LPCParser.STATUS:
                case LPCParser.STRUCT:
                case LPCParser.STRING:
                case LPCParser.SYMBOL:
                case LPCParser.SWITCH:
                case LPCParser.UNKNOWN:
                case LPCParser.VOID:
                case LPCParser.WHILE:
                case LPCParser.PRIVATE:
                case LPCParser.PROTECTED:
                case LPCParser.PUBLIC:
                case LPCParser.STATIC:
                case LPCParser.NOSHADOW:
                case LPCParser.NOSAVE:
                case LPCParser.PLUS:
                case LPCParser.MINUS:
                case LPCParser.STAR:
                case LPCParser.INC:
                case LPCParser.DEC:
                case LPCParser.AND:
                case LPCParser.NOT:
                case LPCParser.BNOT:
                case LPCParser.SINGLEQUOT:
                case LPCParser.SUPER_ACCESSOR:
                case LPCParser.MAPPING_OPEN:
                case LPCParser.PAREN_OPEN:
                case LPCParser.CURLY_OPEN:
                case LPCParser.IntegerConstant:
                case LPCParser.FloatingConstant:
                case LPCParser.HexIntConstant:
                case LPCParser.StringLiteral:
                case LPCParser.CharacterConstant:
                case LPCParser.CloneObject:
                case LPCParser.LoadObject:
                    {
                    this.state = 690;
                    this.statement();
                    }
                    break;
                case LPCParser.SEMI:
                    {
                    this.state = 691;
                    this.match(LPCParser.SEMI);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
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
        this.enterRule(localContext, 112, LPCParser.RULE_forRangeExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 696;
            this.forVariable();
            this.state = 701;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 80) {
                {
                {
                this.state = 697;
                this.match(LPCParser.COMMA);
                this.state = 698;
                this.forVariable();
                }
                }
                this.state = 703;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 704;
            this.match(LPCParser.SEMI);
            this.state = 706;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 806125671) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 126469) !== 0)) {
                {
                this.state = 705;
                this.expression();
                }
            }

            this.state = 708;
            this.match(LPCParser.SEMI);
            this.state = 710;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 806125671) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 126469) !== 0)) {
                {
                this.state = 709;
                this.expression();
                }
            }

            this.state = 716;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 80) {
                {
                {
                this.state = 712;
                this.match(LPCParser.COMMA);
                this.state = 713;
                this.expression();
                }
                }
                this.state = 718;
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
        this.enterRule(localContext, 114, LPCParser.RULE_foreachRangeExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 719;
            this.forEachVariable();
            this.state = 724;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 80) {
                {
                {
                this.state = 720;
                this.match(LPCParser.COMMA);
                this.state = 721;
                this.forEachVariable();
                }
                }
                this.state = 726;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 727;
            _la = this.tokenStream.LA(1);
            if(!(_la === 25 || _la === 78)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 728;
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
    public forVariable(): ForVariableContext {
        let localContext = new ForVariableContext(this.context, this.state);
        this.enterRule(localContext, 116, LPCParser.RULE_forVariable);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 731;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 5225) !== 0)) {
                {
                this.state = 730;
                this.primitiveTypeSpecifier();
                }
            }

            this.state = 734;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 57) {
                {
                this.state = 733;
                localContext._arraySpecifier = this.match(LPCParser.STAR);
                }
            }

            this.state = 736;
            localContext._variableName = this.match(LPCParser.Identifier);
            this.state = 737;
            this.match(LPCParser.ASSIGN);
            this.state = 738;
            this.variableInitializer();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 118, LPCParser.RULE_forEachVariable);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 741;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 5225) !== 0)) {
                {
                this.state = 740;
                this.primitiveTypeSpecifier();
                }
            }

            this.state = 743;
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
        this.enterRule(localContext, 120, LPCParser.RULE_returnStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 745;
            this.match(LPCParser.RETURN);
            this.state = 747;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 806125671) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 126469) !== 0)) {
                {
                this.state = 746;
                this.expression();
                }
            }

            this.state = 749;
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
        this.enterRule(localContext, 122, LPCParser.RULE_jumpStatement);
        try {
            this.state = 756;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BREAK:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 751;
                this.match(LPCParser.BREAK);
                this.state = 752;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.CONTINUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 753;
                this.match(LPCParser.CONTINUE);
                this.state = 754;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.RETURN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 755;
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
        this.enterRule(localContext, 124, LPCParser.RULE_callOtherTarget);
        try {
            this.state = 764;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 758;
                this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.PAREN_OPEN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 759;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 760;
                this.expression();
                this.state = 761;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 763;
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
    public lambdaExpression(): LambdaExpressionContext {
        let localContext = new LambdaExpressionContext(this.context, this.state);
        this.enterRule(localContext, 126, LPCParser.RULE_lambdaExpression);
        let _la: number;
        try {
            this.state = 864;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 88, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 767;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 21) {
                    {
                    this.state = 766;
                    this.match(LPCParser.HASH);
                    }
                }

                this.state = 769;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 770;
                this.match(LPCParser.Identifier);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 771;
                this.match(LPCParser.HASH);
                this.state = 772;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 773;
                this.expression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 774;
                this.match(LPCParser.HASH);
                this.state = 775;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 776;
                this.match(LPCParser.PLUS);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 777;
                this.match(LPCParser.HASH);
                this.state = 778;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 779;
                this.match(LPCParser.MINUS);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 780;
                this.match(LPCParser.HASH);
                this.state = 781;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 782;
                this.match(LPCParser.STAR);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 783;
                this.match(LPCParser.HASH);
                this.state = 784;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 785;
                this.match(LPCParser.DIV);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 786;
                this.match(LPCParser.HASH);
                this.state = 787;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 788;
                this.match(LPCParser.MOD);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 789;
                this.match(LPCParser.HASH);
                this.state = 790;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 791;
                this.match(LPCParser.LT);
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 792;
                this.match(LPCParser.HASH);
                this.state = 793;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 794;
                this.match(LPCParser.GT);
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 795;
                this.match(LPCParser.HASH);
                this.state = 796;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 797;
                this.match(LPCParser.LE);
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 798;
                this.match(LPCParser.HASH);
                this.state = 799;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 800;
                this.match(LPCParser.GE);
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 801;
                this.match(LPCParser.HASH);
                this.state = 802;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 803;
                this.match(LPCParser.EQ);
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 804;
                this.match(LPCParser.HASH);
                this.state = 805;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 806;
                this.match(LPCParser.NE);
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 807;
                this.match(LPCParser.HASH);
                this.state = 808;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 809;
                this.match(LPCParser.AND);
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 810;
                this.match(LPCParser.HASH);
                this.state = 811;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 812;
                this.match(LPCParser.OR);
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 813;
                this.match(LPCParser.HASH);
                this.state = 814;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 815;
                this.match(LPCParser.XOR);
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 816;
                this.match(LPCParser.HASH);
                this.state = 817;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 818;
                this.match(LPCParser.AND_AND);
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 819;
                this.match(LPCParser.HASH);
                this.state = 820;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 821;
                this.match(LPCParser.OR_OR);
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 822;
                this.match(LPCParser.HASH);
                this.state = 823;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 824;
                this.match(LPCParser.ADD_ASSIGN);
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 825;
                this.match(LPCParser.HASH);
                this.state = 826;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 827;
                this.match(LPCParser.SUB_ASSIGN);
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 828;
                this.match(LPCParser.HASH);
                this.state = 829;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 830;
                this.match(LPCParser.MUL_ASSIGN);
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 831;
                this.match(LPCParser.HASH);
                this.state = 832;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 833;
                this.match(LPCParser.DIV_ASSIGN);
                }
                break;
            case 23:
                this.enterOuterAlt(localContext, 23);
                {
                this.state = 834;
                this.match(LPCParser.HASH);
                this.state = 835;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 836;
                this.match(LPCParser.MOD_ASSIGN);
                }
                break;
            case 24:
                this.enterOuterAlt(localContext, 24);
                {
                this.state = 837;
                this.match(LPCParser.HASH);
                this.state = 838;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 839;
                this.match(LPCParser.AND_ASSIGN);
                }
                break;
            case 25:
                this.enterOuterAlt(localContext, 25);
                {
                this.state = 840;
                this.match(LPCParser.HASH);
                this.state = 841;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 842;
                this.match(LPCParser.OR_ASSIGN);
                }
                break;
            case 26:
                this.enterOuterAlt(localContext, 26);
                {
                this.state = 843;
                this.match(LPCParser.HASH);
                this.state = 844;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 845;
                this.match(LPCParser.BITAND_ASSIGN);
                }
                break;
            case 27:
                this.enterOuterAlt(localContext, 27);
                {
                this.state = 846;
                this.match(LPCParser.HASH);
                this.state = 847;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 848;
                this.match(LPCParser.BITOR_ASSIGN);
                }
                break;
            case 28:
                this.enterOuterAlt(localContext, 28);
                {
                this.state = 849;
                this.match(LPCParser.HASH);
                this.state = 850;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 851;
                this.match(LPCParser.XOR_ASSIGN);
                }
                break;
            case 29:
                this.enterOuterAlt(localContext, 29);
                {
                this.state = 852;
                this.match(LPCParser.HASH);
                this.state = 853;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 854;
                this.match(LPCParser.QUESTION);
                }
                break;
            case 30:
                this.enterOuterAlt(localContext, 30);
                {
                this.state = 855;
                this.match(LPCParser.HASH);
                this.state = 856;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 857;
                this.match(LPCParser.SHL);
                }
                break;
            case 31:
                this.enterOuterAlt(localContext, 31);
                {
                this.state = 858;
                this.match(LPCParser.HASH);
                this.state = 859;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 860;
                this.match(LPCParser.SHR);
                }
                break;
            case 32:
                this.enterOuterAlt(localContext, 32);
                {
                this.state = 861;
                this.match(LPCParser.HASH);
                this.state = 862;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 863;
                this.match(LPCParser.SQUARE_OPEN);
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
    public rightShiftAssignment(): RightShiftAssignmentContext {
        let localContext = new RightShiftAssignmentContext(this.context, this.state);
        this.enterRule(localContext, 128, LPCParser.RULE_rightShiftAssignment);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 866;
            localContext._first = this.match(LPCParser.GT);
            this.state = 867;
            localContext._second = this.match(LPCParser.GE);
            this.state = 868;
            if (!((localContext._first?.tokenIndex ?? 0) + 1 == (localContext._second?.tokenIndex ?? 0))) {
                throw this.createFailedPredicateException("$first.index + 1 == $second.index");
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
    public literal(): LiteralContext {
        let localContext = new LiteralContext(this.context, this.state);
        this.enterRule(localContext, 130, LPCParser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 870;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 55) !== 0))) {
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
    public castExpression(): CastExpressionContext {
        let localContext = new CastExpressionContext(this.context, this.state);
        this.enterRule(localContext, 132, LPCParser.RULE_castExpression);
        let _la: number;
        try {
            this.state = 898;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 90, this.context) ) {
            case 1:
                localContext = new PrimitiveTypeCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 872;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 873;
                this.typeSpecifier();
                this.state = 874;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 875;
                this.expression();
                }
                break;
            case 2:
                localContext = new DeclarativeTypeCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 877;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 878;
                this.match(LPCParser.CURLY_OPEN);
                this.state = 879;
                this.typeSpecifier();
                this.state = 880;
                this.match(LPCParser.CURLY_CLOSE);
                this.state = 881;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 882;
                this.expression();
                }
                break;
            case 3:
                localContext = new StructCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 884;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 885;
                this.match(LPCParser.LT);
                this.state = 886;
                this.match(LPCParser.Identifier);
                this.state = 887;
                this.match(LPCParser.GT);
                this.state = 888;
                this.expression();
                this.state = 893;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 80) {
                    {
                    {
                    this.state = 889;
                    this.match(LPCParser.COMMA);
                    this.state = 890;
                    this.expression();
                    }
                    }
                    this.state = 895;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 896;
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
    public assignmentOperator(): AssignmentOperatorContext {
        let localContext = new AssignmentOperatorContext(this.context, this.state);
        this.enterRule(localContext, 134, LPCParser.RULE_assignmentOperator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 900;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 85)) & ~0x1F) === 0 && ((1 << (_la - 85)) & 4095) !== 0))) {
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

    public conditionalExpressionBase(): ConditionalExpressionBaseContext;
    public conditionalExpressionBase(_p: number): ConditionalExpressionBaseContext;
    public conditionalExpressionBase(_p?: number): ConditionalExpressionBaseContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new ConditionalExpressionBaseContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 136;
        this.enterRecursionRule(localContext, 136, LPCParser.RULE_conditionalExpressionBase, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            localContext = new TempUnaryExpressionContext(localContext);
            this.context = localContext;
            previousContext = localContext;

            this.state = 903;
            this.unaryExpression();
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 983;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 102, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 981;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 101, this.context) ) {
                    case 1:
                        {
                        localContext = new ConditionalExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 905;
                        if (!(this.precpred(this.context, 11))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 11)");
                        }
                        {
                        this.state = 906;
                        this.match(LPCParser.QUESTION);
                        this.state = 907;
                        this.expression();
                        this.state = 908;
                        this.match(LPCParser.COLON);
                        this.state = 909;
                        this.expression();
                        }
                        }
                        break;
                    case 2:
                        {
                        localContext = new ConditionalOrExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 911;
                        if (!(this.precpred(this.context, 10))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 10)");
                        }
                        this.state = 914;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 912;
                                (localContext as ConditionalOrExpressionContext)._op = this.match(LPCParser.OR_OR);
                                this.state = 913;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 916;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 91, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 3:
                        {
                        localContext = new ConditionalAndExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 918;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 921;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 919;
                                (localContext as ConditionalAndExpressionContext)._op = this.match(LPCParser.AND_AND);
                                this.state = 920;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 923;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 92, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 4:
                        {
                        localContext = new InclusiveOrExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 925;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 928;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 926;
                                (localContext as InclusiveOrExpressionContext)._op = this.match(LPCParser.OR);
                                this.state = 927;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 930;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 93, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 5:
                        {
                        localContext = new ExclusiveOrExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 932;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 935;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 933;
                                (localContext as ExclusiveOrExpressionContext)._op = this.match(LPCParser.XOR);
                                this.state = 934;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 937;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 94, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 6:
                        {
                        localContext = new AndExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 939;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 942;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 940;
                                (localContext as AndExpressionContext)._op = this.match(LPCParser.AND);
                                this.state = 941;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 944;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 95, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 7:
                        {
                        localContext = new EqualityExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 946;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 949;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 947;
                                (localContext as EqualityExpressionContext)._op = this.tokenStream.LT(1);
                                _la = this.tokenStream.LA(1);
                                if(!(_la === 68 || _la === 69)) {
                                    (localContext as EqualityExpressionContext)._op = this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 948;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 951;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 96, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 8:
                        {
                        localContext = new RelationalExpresionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 953;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 956;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 954;
                                (localContext as RelationalExpresionContext)._op = this.tokenStream.LT(1);
                                _la = this.tokenStream.LA(1);
                                if(!(((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 15) !== 0))) {
                                    (localContext as RelationalExpresionContext)._op = this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 955;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 958;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 97, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 9:
                        {
                        localContext = new ShiftExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 960;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 963;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 961;
                                (localContext as ShiftExpressionContext)._op = this.tokenStream.LT(1);
                                _la = this.tokenStream.LA(1);
                                if(!(_la === 62 || _la === 63)) {
                                    (localContext as ShiftExpressionContext)._op = this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 962;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 965;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 98, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 10:
                        {
                        localContext = new AdditiveExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 967;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 970;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 968;
                                (localContext as AdditiveExpressionContext)._op = this.tokenStream.LT(1);
                                _la = this.tokenStream.LA(1);
                                if(!(_la === 55 || _la === 56)) {
                                    (localContext as AdditiveExpressionContext)._op = this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 969;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 972;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 99, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 11:
                        {
                        localContext = new MultiplicativeExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 974;
                        if (!(this.precpred(this.context, 1))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                        }
                        this.state = 977;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 975;
                                (localContext as MultiplicativeExpressionContext)._op = this.tokenStream.LT(1);
                                _la = this.tokenStream.LA(1);
                                if(!(((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 7) !== 0))) {
                                    (localContext as MultiplicativeExpressionContext)._op = this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 976;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 979;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 100, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    }
                    }
                }
                this.state = 985;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 102, this.context);
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
    public unaryExpression(): UnaryExpressionContext {
        let localContext = new UnaryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 138, LPCParser.RULE_unaryExpression);
        try {
            this.state = 1004;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 103, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 986;
                this.castExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 987;
                this.primaryExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 988;
                this.match(LPCParser.PLUS);
                this.state = 989;
                this.expression();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 990;
                this.match(LPCParser.MINUS);
                this.state = 991;
                this.expression();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 992;
                this.match(LPCParser.NOT);
                this.state = 993;
                this.expression();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 994;
                this.match(LPCParser.BNOT);
                this.state = 995;
                this.expression();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 996;
                this.match(LPCParser.INC);
                this.state = 997;
                this.expression();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 998;
                this.match(LPCParser.DEC);
                this.state = 999;
                this.expression();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1000;
                this.match(LPCParser.AND);
                this.state = 1001;
                this.expression();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 1002;
                this.match(LPCParser.STAR);
                this.state = 1003;
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
    public primaryExpression(): PrimaryExpressionContext {
        let localContext = new PrimaryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 140, LPCParser.RULE_primaryExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1006;
            localContext._pe = this.primaryExpressionStart();
            this.state = 1010;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 104, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1007;
                    this.bracketExpression();
                    }
                    }
                }
                this.state = 1012;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 104, this.context);
            }
            this.state = 1034;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 109, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 1024;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case LPCParser.PAREN_OPEN:
                        {
                        this.state = 1013;
                        this.methodInvocation();
                        }
                        break;
                    case LPCParser.INC:
                        {
                        this.state = 1014;
                        this.match(LPCParser.INC);
                        }
                        break;
                    case LPCParser.DEC:
                        {
                        this.state = 1015;
                        this.match(LPCParser.DEC);
                        }
                        break;
                    case LPCParser.ARROW:
                        {
                        {
                        this.state = 1016;
                        this.match(LPCParser.ARROW);
                        this.state = 1018;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 105, this.context) ) {
                        case 1:
                            {
                            this.state = 1017;
                            localContext._target = this.callOtherTarget();
                            }
                            break;
                        }
                        this.state = 1021;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 106, this.context) ) {
                        case 1:
                            {
                            this.state = 1020;
                            localContext._invocation = this.methodInvocation();
                            }
                            break;
                        }
                        }
                        }
                        break;
                    case LPCParser.Identifier:
                        {
                        this.state = 1023;
                        this.match(LPCParser.Identifier);
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    this.state = 1029;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 108, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 1026;
                            this.bracketExpression();
                            }
                            }
                        }
                        this.state = 1031;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 108, this.context);
                    }
                    }
                    }
                }
                this.state = 1036;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 109, this.context);
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
        this.enterRule(localContext, 142, LPCParser.RULE_primaryExpressionStart);
        let _la: number;
        try {
            let alternative: number;
            this.state = 1059;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 111, this.context) ) {
            case 1:
                localContext = new LiteralExpressionContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1037;
                this.literal();
                }
                break;
            case 2:
                localContext = new CloneObjectExpressionContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1038;
                _la = this.tokenStream.LA(1);
                if(!(_la === 112 || _la === 113)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 1039;
                this.match(LPCParser.PAREN_OPEN);
                {
                this.state = 1040;
                (localContext as CloneObjectExpressionContext)._ob = this.expression();
                }
                this.state = 1041;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 3:
                localContext = new IdentifierExpressionContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1043;
                this.match(LPCParser.Identifier);
                }
                break;
            case 4:
                localContext = new ParenExpressionContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1044;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 1045;
                this.expression();
                this.state = 1046;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 5:
                localContext = new PrimaryArrayExpressionContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 1048;
                this.arrayExpression();
                }
                break;
            case 6:
                localContext = new PrimaryMappingExpressionContext(localContext);
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 1049;
                this.mappingExpression();
                }
                break;
            case 7:
                localContext = new StringConcatExpressionContext(localContext);
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 1050;
                this.match(LPCParser.StringLiteral);
                this.state = 1054;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 110, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 1051;
                        this.match(LPCParser.StringLiteral);
                        }
                        }
                    }
                    this.state = 1056;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 110, this.context);
                }
                }
                break;
            case 8:
                localContext = new CatchExpressionContext(localContext);
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 1057;
                this.catchExpr();
                }
                break;
            case 9:
                localContext = new InheritExpressionContext(localContext);
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 1058;
                this.inheritSuperExpression();
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
        this.enterRule(localContext, 144, LPCParser.RULE_expression);
        try {
            this.state = 1063;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 112, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1061;
                this.assignmentExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1062;
                this.nonAssignmentExpression();
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
        this.enterRule(localContext, 146, LPCParser.RULE_catchExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1065;
            this.match(LPCParser.CATCH);
            this.state = 1066;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 1067;
            this.expression();
            this.state = 1072;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 80) {
                {
                {
                this.state = 1068;
                this.match(LPCParser.COMMA);
                this.state = 1069;
                this.expression();
                }
                }
                this.state = 1074;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1079;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 79) {
                {
                {
                this.state = 1075;
                this.match(LPCParser.SEMI);
                this.state = 1076;
                this.match(LPCParser.Identifier);
                }
                }
                this.state = 1081;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 1082;
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
    public bracketExpression(): BracketExpressionContext {
        let localContext = new BracketExpressionContext(this.context, this.state);
        this.enterRule(localContext, 148, LPCParser.RULE_bracketExpression);
        let _la: number;
        try {
            this.state = 1118;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 122, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1084;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 1086;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 64) {
                    {
                    this.state = 1085;
                    this.match(LPCParser.LT);
                    }
                }

                this.state = 1088;
                this.expression();
                this.state = 1089;
                this.match(LPCParser.SQUARE_CLOSE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1091;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 1093;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 64) {
                    {
                    this.state = 1092;
                    this.match(LPCParser.LT);
                    }
                }

                this.state = 1096;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 806125671) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 126469) !== 0)) {
                    {
                    this.state = 1095;
                    this.expression();
                    }
                }

                this.state = 1098;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 1100;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 64) {
                    {
                    this.state = 1099;
                    this.match(LPCParser.LT);
                    }
                }

                this.state = 1103;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 806125671) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 126469) !== 0)) {
                    {
                    this.state = 1102;
                    this.expression();
                    }
                }

                this.state = 1105;
                this.match(LPCParser.SQUARE_CLOSE);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1106;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 1108;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 806125671) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 126469) !== 0)) {
                    {
                    this.state = 1107;
                    this.expression();
                    }
                }

                this.state = 1114;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 80) {
                    {
                    {
                    this.state = 1110;
                    this.match(LPCParser.COMMA);
                    this.state = 1111;
                    this.expression();
                    }
                    }
                    this.state = 1116;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 1117;
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
    public argument(): ArgumentContext {
        let localContext = new ArgumentContext(this.context, this.state);
        this.enterRule(localContext, 150, LPCParser.RULE_argument);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1121;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 123, this.context) ) {
            case 1:
                {
                this.state = 1120;
                this.match(LPCParser.AND);
                }
                break;
            }
            this.state = 1123;
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
        this.enterRule(localContext, 152, LPCParser.RULE_argumentList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1125;
            this.argument();
            this.state = 1132;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 80) {
                {
                {
                this.state = 1126;
                this.match(LPCParser.COMMA);
                this.state = 1128;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 806125671) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 126469) !== 0)) {
                    {
                    this.state = 1127;
                    this.argument();
                    }
                }

                }
                }
                this.state = 1134;
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
    public expressionList(): ExpressionListContext {
        let localContext = new ExpressionListContext(this.context, this.state);
        this.enterRule(localContext, 154, LPCParser.RULE_expressionList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1135;
            this.expression();
            this.state = 1140;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 80) {
                {
                {
                this.state = 1136;
                this.match(LPCParser.COMMA);
                this.state = 1137;
                this.expression();
                }
                }
                this.state = 1142;
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
    public assignmentExpression(): AssignmentExpressionContext {
        let localContext = new AssignmentExpressionContext(this.context, this.state);
        this.enterRule(localContext, 156, LPCParser.RULE_assignmentExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1143;
            this.conditionalExpressionBase(0);
            this.state = 1144;
            this.assignmentOperator();
            this.state = 1145;
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
    public nonAssignmentExpression(): NonAssignmentExpressionContext {
        let localContext = new NonAssignmentExpressionContext(this.context, this.state);
        this.enterRule(localContext, 158, LPCParser.RULE_nonAssignmentExpression);
        try {
            this.state = 1150;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 127, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1147;
                this.inlineClosureExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1148;
                this.lambdaExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1149;
                this.conditionalExpressionBase(0);
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
        case 7:
            return this.directiveIfTestExpression_sempred(localContext as DirectiveIfTestExpressionContext, predIndex);
        case 64:
            return this.rightShiftAssignment_sempred(localContext as RightShiftAssignmentContext, predIndex);
        case 68:
            return this.conditionalExpressionBase_sempred(localContext as ConditionalExpressionBaseContext, predIndex);
        }
        return true;
    }
    private directiveIfTestExpression_sempred(localContext: DirectiveIfTestExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 8);
        case 1:
            return this.precpred(this.context, 7);
        case 2:
            return this.precpred(this.context, 6);
        case 3:
            return this.precpred(this.context, 5);
        case 4:
            return this.precpred(this.context, 4);
        case 5:
            return this.precpred(this.context, 3);
        case 6:
            return this.precpred(this.context, 2);
        case 7:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private rightShiftAssignment_sempred(localContext: RightShiftAssignmentContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 8:
            return (localContext._first?.tokenIndex ?? 0) + 1 == (localContext._second?.tokenIndex ?? 0);
        }
        return true;
    }
    private conditionalExpressionBase_sempred(localContext: ConditionalExpressionBaseContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 9:
            return this.precpred(this.context, 11);
        case 10:
            return this.precpred(this.context, 10);
        case 11:
            return this.precpred(this.context, 9);
        case 12:
            return this.precpred(this.context, 8);
        case 13:
            return this.precpred(this.context, 7);
        case 14:
            return this.precpred(this.context, 6);
        case 15:
            return this.precpred(this.context, 5);
        case 16:
            return this.precpred(this.context, 4);
        case 17:
            return this.precpred(this.context, 3);
        case 18:
            return this.precpred(this.context, 2);
        case 19:
            return this.precpred(this.context, 1);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,121,1153,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
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
        78,2,79,7,79,1,0,1,0,1,0,5,0,164,8,0,10,0,12,0,167,9,0,1,0,1,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,182,8,1,10,1,12,1,
        185,9,1,3,1,187,8,1,1,2,1,2,1,2,1,2,1,3,1,3,1,3,1,4,1,4,1,4,3,4,
        199,8,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,208,8,4,1,5,1,5,1,6,1,6,
        1,7,1,7,3,7,216,8,7,1,7,1,7,1,7,1,7,1,7,4,7,223,8,7,11,7,12,7,224,
        1,7,1,7,1,7,4,7,230,8,7,11,7,12,7,231,1,7,1,7,1,7,4,7,237,8,7,11,
        7,12,7,238,1,7,1,7,1,7,4,7,244,8,7,11,7,12,7,245,1,7,1,7,1,7,4,7,
        251,8,7,11,7,12,7,252,1,7,1,7,1,7,4,7,258,8,7,11,7,12,7,259,1,7,
        1,7,1,7,4,7,265,8,7,11,7,12,7,266,1,7,1,7,1,7,4,7,272,8,7,11,7,12,
        7,273,5,7,276,8,7,10,7,12,7,279,9,7,1,8,1,8,1,8,1,8,3,8,285,8,8,
        1,8,1,8,3,8,289,8,8,1,9,1,9,1,10,1,10,1,11,1,11,1,11,1,11,5,11,299,
        8,11,10,11,12,11,302,9,11,1,11,1,11,1,12,1,12,1,13,1,13,1,14,1,14,
        1,14,3,14,313,8,14,1,15,1,15,1,15,3,15,318,8,15,1,16,1,16,1,16,1,
        16,1,17,1,17,1,18,1,18,1,19,1,19,1,19,1,19,1,20,1,20,1,20,1,20,1,
        20,1,20,1,20,1,20,3,20,340,8,20,1,21,1,21,1,21,1,21,3,21,346,8,21,
        1,22,1,22,1,23,5,23,351,8,23,10,23,12,23,354,9,23,1,23,3,23,357,
        8,23,1,23,1,23,1,23,3,23,362,8,23,1,23,1,23,1,24,1,24,1,24,1,25,
        1,25,1,25,1,26,1,26,1,26,5,26,375,8,26,10,26,12,26,378,9,26,1,27,
        3,27,381,8,27,1,27,3,27,384,8,27,1,27,1,27,1,27,1,27,3,27,390,8,
        27,1,28,1,28,1,28,1,28,5,28,396,8,28,10,28,12,28,399,9,28,1,28,1,
        28,1,28,1,29,1,29,1,29,1,29,1,30,1,30,1,30,1,30,1,30,5,30,413,8,
        30,10,30,12,30,416,9,30,3,30,418,8,30,1,30,3,30,421,8,30,1,30,1,
        30,1,30,1,31,1,31,1,31,1,31,1,31,5,31,431,8,31,10,31,12,31,434,9,
        31,3,31,436,8,31,1,32,1,32,1,32,1,32,5,32,442,8,32,10,32,12,32,445,
        9,32,3,32,447,8,32,1,32,3,32,450,8,32,1,32,1,32,1,32,1,32,1,32,1,
        32,1,32,1,32,3,32,460,8,32,1,33,1,33,1,34,5,34,465,8,34,10,34,12,
        34,468,9,34,1,34,3,34,471,8,34,1,34,3,34,474,8,34,1,34,1,34,1,34,
        5,34,479,8,34,10,34,12,34,482,9,34,1,34,1,34,1,34,5,34,487,8,34,
        10,34,12,34,490,9,34,1,34,1,34,1,34,1,34,1,34,1,34,5,34,498,8,34,
        10,34,12,34,501,9,34,1,34,1,34,3,34,505,8,34,1,35,1,35,1,35,3,35,
        510,8,35,1,36,3,36,513,8,36,1,36,1,36,1,37,1,37,1,37,3,37,520,8,
        37,1,38,1,38,1,39,1,39,3,39,526,8,39,1,39,1,39,1,40,3,40,531,8,40,
        1,40,1,40,1,41,1,41,3,41,537,8,41,1,42,1,42,1,42,1,42,5,42,543,8,
        42,10,42,12,42,546,9,42,3,42,548,8,42,1,42,1,42,1,42,1,43,1,43,1,
        43,1,43,1,43,1,43,1,43,1,43,3,43,561,8,43,1,44,1,44,1,44,1,45,1,
        45,5,45,568,8,45,10,45,12,45,571,9,45,1,45,1,45,1,46,1,46,3,46,577,
        8,46,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,48,1,48,1,48,1,49,1,49,
        1,49,1,49,1,49,1,49,1,50,1,50,5,50,597,8,50,10,50,12,50,600,9,50,
        1,50,3,50,603,8,50,1,51,1,51,1,51,1,51,1,51,1,51,1,51,5,51,612,8,
        51,10,51,12,51,615,9,51,1,51,1,51,1,52,1,52,3,52,621,8,52,1,52,1,
        52,3,52,625,8,52,1,52,1,52,3,52,629,8,52,1,52,1,52,3,52,633,8,52,
        1,52,1,52,1,52,3,52,638,8,52,1,52,1,52,3,52,642,8,52,3,52,644,8,
        52,1,53,1,53,1,53,1,53,5,53,650,8,53,10,53,12,53,653,9,53,1,54,1,
        54,1,54,5,54,658,8,54,10,54,12,54,661,9,54,1,55,1,55,1,55,1,55,1,
        55,1,55,3,55,669,8,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,
        55,1,55,1,55,1,55,1,55,1,55,3,55,685,8,55,1,55,1,55,1,55,1,55,1,
        55,1,55,3,55,693,8,55,3,55,695,8,55,1,56,1,56,1,56,5,56,700,8,56,
        10,56,12,56,703,9,56,1,56,1,56,3,56,707,8,56,1,56,1,56,3,56,711,
        8,56,1,56,1,56,5,56,715,8,56,10,56,12,56,718,9,56,1,57,1,57,1,57,
        5,57,723,8,57,10,57,12,57,726,9,57,1,57,1,57,1,57,1,58,3,58,732,
        8,58,1,58,3,58,735,8,58,1,58,1,58,1,58,1,58,1,59,3,59,742,8,59,1,
        59,1,59,1,60,1,60,3,60,748,8,60,1,60,1,60,1,61,1,61,1,61,1,61,1,
        61,3,61,757,8,61,1,62,1,62,1,62,1,62,1,62,1,62,3,62,765,8,62,1,63,
        3,63,768,8,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,
        1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,
        1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,
        1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,
        1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,
        1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,
        1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,
        1,63,1,63,1,63,1,63,1,63,1,63,1,63,3,63,865,8,63,1,64,1,64,1,64,
        1,64,1,65,1,65,1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,
        1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,5,66,892,8,66,10,66,
        12,66,895,9,66,1,66,1,66,3,66,899,8,66,1,67,1,67,1,68,1,68,1,68,
        1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,4,68,915,8,68,11,68,
        12,68,916,1,68,1,68,1,68,4,68,922,8,68,11,68,12,68,923,1,68,1,68,
        1,68,4,68,929,8,68,11,68,12,68,930,1,68,1,68,1,68,4,68,936,8,68,
        11,68,12,68,937,1,68,1,68,1,68,4,68,943,8,68,11,68,12,68,944,1,68,
        1,68,1,68,4,68,950,8,68,11,68,12,68,951,1,68,1,68,1,68,4,68,957,
        8,68,11,68,12,68,958,1,68,1,68,1,68,4,68,964,8,68,11,68,12,68,965,
        1,68,1,68,1,68,4,68,971,8,68,11,68,12,68,972,1,68,1,68,1,68,4,68,
        978,8,68,11,68,12,68,979,5,68,982,8,68,10,68,12,68,985,9,68,1,69,
        1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,69,
        1,69,1,69,1,69,1,69,3,69,1005,8,69,1,70,1,70,5,70,1009,8,70,10,70,
        12,70,1012,9,70,1,70,1,70,1,70,1,70,1,70,3,70,1019,8,70,1,70,3,70,
        1022,8,70,1,70,3,70,1025,8,70,1,70,5,70,1028,8,70,10,70,12,70,1031,
        9,70,5,70,1033,8,70,10,70,12,70,1036,9,70,1,71,1,71,1,71,1,71,1,
        71,1,71,1,71,1,71,1,71,1,71,1,71,1,71,1,71,1,71,1,71,5,71,1053,8,
        71,10,71,12,71,1056,9,71,1,71,1,71,3,71,1060,8,71,1,72,1,72,3,72,
        1064,8,72,1,73,1,73,1,73,1,73,1,73,5,73,1071,8,73,10,73,12,73,1074,
        9,73,1,73,1,73,5,73,1078,8,73,10,73,12,73,1081,9,73,1,73,1,73,1,
        74,1,74,3,74,1087,8,74,1,74,1,74,1,74,1,74,1,74,3,74,1094,8,74,1,
        74,3,74,1097,8,74,1,74,1,74,3,74,1101,8,74,1,74,3,74,1104,8,74,1,
        74,1,74,1,74,3,74,1109,8,74,1,74,1,74,5,74,1113,8,74,10,74,12,74,
        1116,9,74,1,74,3,74,1119,8,74,1,75,3,75,1122,8,75,1,75,1,75,1,76,
        1,76,1,76,3,76,1129,8,76,5,76,1131,8,76,10,76,12,76,1134,9,76,1,
        77,1,77,1,77,5,77,1139,8,77,10,77,12,77,1142,9,77,1,78,1,78,1,78,
        1,78,1,79,1,79,1,79,3,79,1151,8,79,1,79,0,2,14,136,80,0,2,4,6,8,
        10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,
        54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,
        98,100,102,104,106,108,110,112,114,116,118,120,122,124,126,128,130,
        132,134,136,138,140,142,144,146,148,150,152,154,156,158,0,18,2,0,
        13,13,22,22,2,0,12,12,14,14,1,0,23,24,3,0,1,1,106,106,110,110,3,
        0,11,11,29,29,43,43,2,0,1,1,110,110,2,0,47,51,53,54,1,0,47,52,8,
        0,5,6,17,17,28,28,30,32,35,35,37,38,42,42,44,44,2,0,25,25,78,78,
        2,0,106,108,110,111,1,0,85,96,1,0,68,69,1,0,64,67,1,0,62,63,1,0,
        55,56,1,0,57,59,1,0,112,113,1290,0,165,1,0,0,0,2,186,1,0,0,0,4,188,
        1,0,0,0,6,192,1,0,0,0,8,207,1,0,0,0,10,209,1,0,0,0,12,211,1,0,0,
        0,14,213,1,0,0,0,16,288,1,0,0,0,18,290,1,0,0,0,20,292,1,0,0,0,22,
        294,1,0,0,0,24,305,1,0,0,0,26,307,1,0,0,0,28,312,1,0,0,0,30,314,
        1,0,0,0,32,319,1,0,0,0,34,323,1,0,0,0,36,325,1,0,0,0,38,327,1,0,
        0,0,40,339,1,0,0,0,42,345,1,0,0,0,44,347,1,0,0,0,46,352,1,0,0,0,
        48,365,1,0,0,0,50,368,1,0,0,0,52,371,1,0,0,0,54,389,1,0,0,0,56,391,
        1,0,0,0,58,403,1,0,0,0,60,407,1,0,0,0,62,425,1,0,0,0,64,459,1,0,
        0,0,66,461,1,0,0,0,68,504,1,0,0,0,70,506,1,0,0,0,72,512,1,0,0,0,
        74,519,1,0,0,0,76,521,1,0,0,0,78,523,1,0,0,0,80,530,1,0,0,0,82,536,
        1,0,0,0,84,538,1,0,0,0,86,560,1,0,0,0,88,562,1,0,0,0,90,565,1,0,
        0,0,92,576,1,0,0,0,94,578,1,0,0,0,96,585,1,0,0,0,98,588,1,0,0,0,
        100,594,1,0,0,0,102,604,1,0,0,0,104,643,1,0,0,0,106,645,1,0,0,0,
        108,654,1,0,0,0,110,694,1,0,0,0,112,696,1,0,0,0,114,719,1,0,0,0,
        116,731,1,0,0,0,118,741,1,0,0,0,120,745,1,0,0,0,122,756,1,0,0,0,
        124,764,1,0,0,0,126,864,1,0,0,0,128,866,1,0,0,0,130,870,1,0,0,0,
        132,898,1,0,0,0,134,900,1,0,0,0,136,902,1,0,0,0,138,1004,1,0,0,0,
        140,1006,1,0,0,0,142,1059,1,0,0,0,144,1063,1,0,0,0,146,1065,1,0,
        0,0,148,1118,1,0,0,0,150,1121,1,0,0,0,152,1125,1,0,0,0,154,1135,
        1,0,0,0,156,1143,1,0,0,0,158,1150,1,0,0,0,160,164,3,42,21,0,161,
        164,3,2,1,0,162,164,3,38,19,0,163,160,1,0,0,0,163,161,1,0,0,0,163,
        162,1,0,0,0,164,167,1,0,0,0,165,163,1,0,0,0,165,166,1,0,0,0,166,
        168,1,0,0,0,167,165,1,0,0,0,168,169,5,0,0,1,169,1,1,0,0,0,170,187,
        3,8,4,0,171,172,3,18,9,0,172,173,3,20,10,0,173,187,1,0,0,0,174,187,
        3,6,3,0,175,187,3,4,2,0,176,177,5,21,0,0,177,178,3,36,18,0,178,183,
        5,1,0,0,179,180,5,80,0,0,180,182,5,1,0,0,181,179,1,0,0,0,182,185,
        1,0,0,0,183,181,1,0,0,0,183,184,1,0,0,0,184,187,1,0,0,0,185,183,
        1,0,0,0,186,170,1,0,0,0,186,171,1,0,0,0,186,174,1,0,0,0,186,175,
        1,0,0,0,186,176,1,0,0,0,187,3,1,0,0,0,188,189,5,21,0,0,189,190,3,
        26,13,0,190,191,3,28,14,0,191,5,1,0,0,0,192,193,5,117,0,0,193,194,
        5,119,0,0,194,7,1,0,0,0,195,196,5,21,0,0,196,198,3,12,6,0,197,199,
        5,73,0,0,198,197,1,0,0,0,198,199,1,0,0,0,199,200,1,0,0,0,200,201,
        3,20,10,0,201,208,1,0,0,0,202,203,5,21,0,0,203,204,7,0,0,0,204,208,
        3,14,7,0,205,206,5,21,0,0,206,208,3,10,5,0,207,195,1,0,0,0,207,202,
        1,0,0,0,207,205,1,0,0,0,208,9,1,0,0,0,209,210,7,1,0,0,210,11,1,0,
        0,0,211,212,7,2,0,0,212,13,1,0,0,0,213,215,6,7,-1,0,214,216,5,73,
        0,0,215,214,1,0,0,0,215,216,1,0,0,0,216,217,1,0,0,0,217,218,3,16,
        8,0,218,277,1,0,0,0,219,222,10,8,0,0,220,221,5,75,0,0,221,223,3,
        14,7,0,222,220,1,0,0,0,223,224,1,0,0,0,224,222,1,0,0,0,224,225,1,
        0,0,0,225,276,1,0,0,0,226,229,10,7,0,0,227,228,5,76,0,0,228,230,
        3,14,7,0,229,227,1,0,0,0,230,231,1,0,0,0,231,229,1,0,0,0,231,232,
        1,0,0,0,232,276,1,0,0,0,233,236,10,6,0,0,234,235,5,68,0,0,235,237,
        3,14,7,0,236,234,1,0,0,0,237,238,1,0,0,0,238,236,1,0,0,0,238,239,
        1,0,0,0,239,276,1,0,0,0,240,243,10,5,0,0,241,242,5,69,0,0,242,244,
        3,14,7,0,243,241,1,0,0,0,244,245,1,0,0,0,245,243,1,0,0,0,245,246,
        1,0,0,0,246,276,1,0,0,0,247,250,10,4,0,0,248,249,5,64,0,0,249,251,
        3,14,7,0,250,248,1,0,0,0,251,252,1,0,0,0,252,250,1,0,0,0,252,253,
        1,0,0,0,253,276,1,0,0,0,254,257,10,3,0,0,255,256,5,65,0,0,256,258,
        3,14,7,0,257,255,1,0,0,0,258,259,1,0,0,0,259,257,1,0,0,0,259,260,
        1,0,0,0,260,276,1,0,0,0,261,264,10,2,0,0,262,263,5,66,0,0,263,265,
        3,14,7,0,264,262,1,0,0,0,265,266,1,0,0,0,266,264,1,0,0,0,266,267,
        1,0,0,0,267,276,1,0,0,0,268,271,10,1,0,0,269,270,5,67,0,0,270,272,
        3,14,7,0,271,269,1,0,0,0,272,273,1,0,0,0,273,271,1,0,0,0,273,274,
        1,0,0,0,274,276,1,0,0,0,275,219,1,0,0,0,275,226,1,0,0,0,275,233,
        1,0,0,0,275,240,1,0,0,0,275,247,1,0,0,0,275,254,1,0,0,0,275,261,
        1,0,0,0,275,268,1,0,0,0,276,279,1,0,0,0,277,275,1,0,0,0,277,278,
        1,0,0,0,278,15,1,0,0,0,279,277,1,0,0,0,280,284,5,1,0,0,281,282,5,
        99,0,0,282,283,7,3,0,0,283,285,5,100,0,0,284,281,1,0,0,0,284,285,
        1,0,0,0,285,289,1,0,0,0,286,289,5,110,0,0,287,289,5,106,0,0,288,
        280,1,0,0,0,288,286,1,0,0,0,288,287,1,0,0,0,289,17,1,0,0,0,290,291,
        7,4,0,0,291,19,1,0,0,0,292,293,7,3,0,0,293,21,1,0,0,0,294,295,5,
        99,0,0,295,300,5,1,0,0,296,297,5,80,0,0,297,299,5,1,0,0,298,296,
        1,0,0,0,299,302,1,0,0,0,300,298,1,0,0,0,300,301,1,0,0,0,301,303,
        1,0,0,0,302,300,1,0,0,0,303,304,5,100,0,0,304,23,1,0,0,0,305,306,
        3,144,72,0,306,25,1,0,0,0,307,308,5,26,0,0,308,27,1,0,0,0,309,313,
        3,32,16,0,310,313,3,34,17,0,311,313,5,1,0,0,312,309,1,0,0,0,312,
        310,1,0,0,0,312,311,1,0,0,0,313,29,1,0,0,0,314,317,5,1,0,0,315,316,
        5,82,0,0,316,318,5,1,0,0,317,315,1,0,0,0,317,318,1,0,0,0,318,31,
        1,0,0,0,319,320,5,64,0,0,320,321,3,30,15,0,321,322,5,65,0,0,322,
        33,1,0,0,0,323,324,5,110,0,0,324,35,1,0,0,0,325,326,5,33,0,0,326,
        37,1,0,0,0,327,328,5,27,0,0,328,329,7,5,0,0,329,330,5,79,0,0,330,
        39,1,0,0,0,331,332,5,84,0,0,332,340,3,144,72,0,333,334,5,110,0,0,
        334,335,5,84,0,0,335,340,3,144,72,0,336,337,5,1,0,0,337,338,5,84,
        0,0,338,340,3,144,72,0,339,331,1,0,0,0,339,333,1,0,0,0,339,336,1,
        0,0,0,340,41,1,0,0,0,341,346,3,48,24,0,342,346,3,50,25,0,343,346,
        3,56,28,0,344,346,3,68,34,0,345,341,1,0,0,0,345,342,1,0,0,0,345,
        343,1,0,0,0,345,344,1,0,0,0,346,43,1,0,0,0,347,348,7,6,0,0,348,45,
        1,0,0,0,349,351,3,44,22,0,350,349,1,0,0,0,351,354,1,0,0,0,352,350,
        1,0,0,0,352,353,1,0,0,0,353,356,1,0,0,0,354,352,1,0,0,0,355,357,
        3,82,41,0,356,355,1,0,0,0,356,357,1,0,0,0,357,358,1,0,0,0,358,359,
        5,1,0,0,359,361,5,99,0,0,360,362,3,52,26,0,361,360,1,0,0,0,361,362,
        1,0,0,0,362,363,1,0,0,0,363,364,5,100,0,0,364,47,1,0,0,0,365,366,
        3,46,23,0,366,367,5,79,0,0,367,49,1,0,0,0,368,369,3,46,23,0,369,
        370,3,90,45,0,370,51,1,0,0,0,371,376,3,54,27,0,372,373,5,80,0,0,
        373,375,3,54,27,0,374,372,1,0,0,0,375,378,1,0,0,0,376,374,1,0,0,
        0,376,377,1,0,0,0,377,53,1,0,0,0,378,376,1,0,0,0,379,381,5,54,0,
        0,380,379,1,0,0,0,380,381,1,0,0,0,381,383,1,0,0,0,382,384,3,82,41,
        0,383,382,1,0,0,0,383,384,1,0,0,0,384,385,1,0,0,0,385,390,5,1,0,
        0,386,387,5,36,0,0,387,388,5,1,0,0,388,390,5,1,0,0,389,380,1,0,0,
        0,389,386,1,0,0,0,390,55,1,0,0,0,391,392,5,36,0,0,392,393,5,1,0,
        0,393,397,5,101,0,0,394,396,3,58,29,0,395,394,1,0,0,0,396,399,1,
        0,0,0,397,395,1,0,0,0,397,398,1,0,0,0,398,400,1,0,0,0,399,397,1,
        0,0,0,400,401,5,102,0,0,401,402,5,79,0,0,402,57,1,0,0,0,403,404,
        3,82,41,0,404,405,5,1,0,0,405,406,5,79,0,0,406,59,1,0,0,0,407,408,
        5,99,0,0,408,417,5,101,0,0,409,414,3,144,72,0,410,411,5,80,0,0,411,
        413,3,144,72,0,412,410,1,0,0,0,413,416,1,0,0,0,414,412,1,0,0,0,414,
        415,1,0,0,0,415,418,1,0,0,0,416,414,1,0,0,0,417,409,1,0,0,0,417,
        418,1,0,0,0,418,420,1,0,0,0,419,421,5,80,0,0,420,419,1,0,0,0,420,
        421,1,0,0,0,421,422,1,0,0,0,422,423,5,102,0,0,423,424,5,100,0,0,
        424,61,1,0,0,0,425,435,3,144,72,0,426,427,5,78,0,0,427,432,3,144,
        72,0,428,429,5,79,0,0,429,431,3,144,72,0,430,428,1,0,0,0,431,434,
        1,0,0,0,432,430,1,0,0,0,432,433,1,0,0,0,433,436,1,0,0,0,434,432,
        1,0,0,0,435,426,1,0,0,0,435,436,1,0,0,0,436,63,1,0,0,0,437,446,5,
        97,0,0,438,443,3,62,31,0,439,440,5,80,0,0,440,442,3,62,31,0,441,
        439,1,0,0,0,442,445,1,0,0,0,443,441,1,0,0,0,443,444,1,0,0,0,444,
        447,1,0,0,0,445,443,1,0,0,0,446,438,1,0,0,0,446,447,1,0,0,0,447,
        449,1,0,0,0,448,450,5,80,0,0,449,448,1,0,0,0,449,450,1,0,0,0,450,
        451,1,0,0,0,451,452,5,104,0,0,452,460,5,100,0,0,453,454,5,97,0,0,
        454,455,5,78,0,0,455,456,3,144,72,0,456,457,5,104,0,0,457,458,5,
        100,0,0,458,460,1,0,0,0,459,437,1,0,0,0,459,453,1,0,0,0,460,65,1,
        0,0,0,461,462,7,7,0,0,462,67,1,0,0,0,463,465,3,66,33,0,464,463,1,
        0,0,0,465,468,1,0,0,0,466,464,1,0,0,0,466,467,1,0,0,0,467,470,1,
        0,0,0,468,466,1,0,0,0,469,471,3,76,38,0,470,469,1,0,0,0,470,471,
        1,0,0,0,471,473,1,0,0,0,472,474,5,110,0,0,473,472,1,0,0,0,473,474,
        1,0,0,0,474,475,1,0,0,0,475,480,3,70,35,0,476,477,5,80,0,0,477,479,
        3,70,35,0,478,476,1,0,0,0,479,482,1,0,0,0,480,478,1,0,0,0,480,481,
        1,0,0,0,481,483,1,0,0,0,482,480,1,0,0,0,483,484,5,79,0,0,484,505,
        1,0,0,0,485,487,3,66,33,0,486,485,1,0,0,0,487,490,1,0,0,0,488,486,
        1,0,0,0,488,489,1,0,0,0,489,491,1,0,0,0,490,488,1,0,0,0,491,492,
        5,36,0,0,492,493,5,1,0,0,493,499,3,70,35,0,494,495,5,80,0,0,495,
        496,5,1,0,0,496,498,3,70,35,0,497,494,1,0,0,0,498,501,1,0,0,0,499,
        497,1,0,0,0,499,500,1,0,0,0,500,502,1,0,0,0,501,499,1,0,0,0,502,
        503,5,79,0,0,503,505,1,0,0,0,504,466,1,0,0,0,504,488,1,0,0,0,505,
        69,1,0,0,0,506,509,3,72,36,0,507,508,5,85,0,0,508,510,3,74,37,0,
        509,507,1,0,0,0,509,510,1,0,0,0,510,71,1,0,0,0,511,513,5,57,0,0,
        512,511,1,0,0,0,512,513,1,0,0,0,513,514,1,0,0,0,514,515,5,1,0,0,
        515,73,1,0,0,0,516,520,3,144,72,0,517,520,3,60,30,0,518,520,3,64,
        32,0,519,516,1,0,0,0,519,517,1,0,0,0,519,518,1,0,0,0,520,75,1,0,
        0,0,521,522,7,8,0,0,522,77,1,0,0,0,523,525,5,99,0,0,524,526,3,152,
        76,0,525,524,1,0,0,0,525,526,1,0,0,0,526,527,1,0,0,0,527,528,5,100,
        0,0,528,79,1,0,0,0,529,531,3,76,38,0,530,529,1,0,0,0,530,531,1,0,
        0,0,531,532,1,0,0,0,532,533,5,57,0,0,533,81,1,0,0,0,534,537,3,76,
        38,0,535,537,3,80,40,0,536,534,1,0,0,0,536,535,1,0,0,0,537,83,1,
        0,0,0,538,539,5,99,0,0,539,547,5,78,0,0,540,548,3,144,72,0,541,543,
        3,86,43,0,542,541,1,0,0,0,543,546,1,0,0,0,544,542,1,0,0,0,544,545,
        1,0,0,0,545,548,1,0,0,0,546,544,1,0,0,0,547,540,1,0,0,0,547,544,
        1,0,0,0,548,549,1,0,0,0,549,550,5,78,0,0,550,551,5,100,0,0,551,85,
        1,0,0,0,552,561,3,88,44,0,553,561,3,90,45,0,554,561,3,92,46,0,555,
        561,3,110,55,0,556,561,3,122,61,0,557,561,3,68,34,0,558,561,3,8,
        4,0,559,561,3,120,60,0,560,552,1,0,0,0,560,553,1,0,0,0,560,554,1,
        0,0,0,560,555,1,0,0,0,560,556,1,0,0,0,560,557,1,0,0,0,560,558,1,
        0,0,0,560,559,1,0,0,0,561,87,1,0,0,0,562,563,3,144,72,0,563,564,
        5,79,0,0,564,89,1,0,0,0,565,569,5,101,0,0,566,568,3,86,43,0,567,
        566,1,0,0,0,568,571,1,0,0,0,569,567,1,0,0,0,569,570,1,0,0,0,570,
        572,1,0,0,0,571,569,1,0,0,0,572,573,5,102,0,0,573,91,1,0,0,0,574,
        577,3,100,50,0,575,577,3,102,51,0,576,574,1,0,0,0,576,575,1,0,0,
        0,577,93,1,0,0,0,578,579,5,12,0,0,579,580,5,22,0,0,580,581,5,99,
        0,0,581,582,3,144,72,0,582,583,5,100,0,0,583,584,3,86,43,0,584,95,
        1,0,0,0,585,586,5,12,0,0,586,587,3,86,43,0,587,97,1,0,0,0,588,589,
        5,22,0,0,589,590,5,99,0,0,590,591,3,144,72,0,591,592,5,100,0,0,592,
        593,3,86,43,0,593,99,1,0,0,0,594,598,3,98,49,0,595,597,3,94,47,0,
        596,595,1,0,0,0,597,600,1,0,0,0,598,596,1,0,0,0,598,599,1,0,0,0,
        599,602,1,0,0,0,600,598,1,0,0,0,601,603,3,96,48,0,602,601,1,0,0,
        0,602,603,1,0,0,0,603,101,1,0,0,0,604,605,5,39,0,0,605,606,5,99,
        0,0,606,607,3,144,72,0,607,608,5,100,0,0,608,613,5,101,0,0,609,612,
        3,106,53,0,610,612,3,108,54,0,611,609,1,0,0,0,611,610,1,0,0,0,612,
        615,1,0,0,0,613,611,1,0,0,0,613,614,1,0,0,0,614,616,1,0,0,0,615,
        613,1,0,0,0,616,617,5,102,0,0,617,103,1,0,0,0,618,625,5,110,0,0,
        619,621,5,56,0,0,620,619,1,0,0,0,620,621,1,0,0,0,621,622,1,0,0,0,
        622,625,5,106,0,0,623,625,5,1,0,0,624,618,1,0,0,0,624,620,1,0,0,
        0,624,623,1,0,0,0,625,644,1,0,0,0,626,633,5,110,0,0,627,629,5,56,
        0,0,628,627,1,0,0,0,628,629,1,0,0,0,629,630,1,0,0,0,630,633,5,106,
        0,0,631,633,5,1,0,0,632,626,1,0,0,0,632,628,1,0,0,0,632,631,1,0,
        0,0,633,634,1,0,0,0,634,641,5,81,0,0,635,642,5,110,0,0,636,638,5,
        56,0,0,637,636,1,0,0,0,637,638,1,0,0,0,638,639,1,0,0,0,639,642,5,
        106,0,0,640,642,5,1,0,0,641,635,1,0,0,0,641,637,1,0,0,0,641,640,
        1,0,0,0,642,644,1,0,0,0,643,624,1,0,0,0,643,632,1,0,0,0,644,105,
        1,0,0,0,645,646,5,3,0,0,646,647,3,104,52,0,647,651,5,78,0,0,648,
        650,3,86,43,0,649,648,1,0,0,0,650,653,1,0,0,0,651,649,1,0,0,0,651,
        652,1,0,0,0,652,107,1,0,0,0,653,651,1,0,0,0,654,655,5,9,0,0,655,
        659,5,78,0,0,656,658,3,86,43,0,657,656,1,0,0,0,658,661,1,0,0,0,659,
        657,1,0,0,0,659,660,1,0,0,0,660,109,1,0,0,0,661,659,1,0,0,0,662,
        663,5,46,0,0,663,664,5,99,0,0,664,665,3,144,72,0,665,668,5,100,0,
        0,666,669,3,86,43,0,667,669,5,79,0,0,668,666,1,0,0,0,668,667,1,0,
        0,0,669,695,1,0,0,0,670,671,5,10,0,0,671,672,3,86,43,0,672,673,5,
        46,0,0,673,674,5,99,0,0,674,675,3,144,72,0,675,676,5,100,0,0,676,
        677,5,79,0,0,677,695,1,0,0,0,678,679,5,18,0,0,679,680,5,99,0,0,680,
        681,3,112,56,0,681,684,5,100,0,0,682,685,3,86,43,0,683,685,5,79,
        0,0,684,682,1,0,0,0,684,683,1,0,0,0,685,695,1,0,0,0,686,687,5,19,
        0,0,687,688,5,99,0,0,688,689,3,114,57,0,689,692,5,100,0,0,690,693,
        3,86,43,0,691,693,5,79,0,0,692,690,1,0,0,0,692,691,1,0,0,0,693,695,
        1,0,0,0,694,662,1,0,0,0,694,670,1,0,0,0,694,678,1,0,0,0,694,686,
        1,0,0,0,695,111,1,0,0,0,696,701,3,116,58,0,697,698,5,80,0,0,698,
        700,3,116,58,0,699,697,1,0,0,0,700,703,1,0,0,0,701,699,1,0,0,0,701,
        702,1,0,0,0,702,704,1,0,0,0,703,701,1,0,0,0,704,706,5,79,0,0,705,
        707,3,144,72,0,706,705,1,0,0,0,706,707,1,0,0,0,707,708,1,0,0,0,708,
        710,5,79,0,0,709,711,3,144,72,0,710,709,1,0,0,0,710,711,1,0,0,0,
        711,716,1,0,0,0,712,713,5,80,0,0,713,715,3,144,72,0,714,712,1,0,
        0,0,715,718,1,0,0,0,716,714,1,0,0,0,716,717,1,0,0,0,717,113,1,0,
        0,0,718,716,1,0,0,0,719,724,3,118,59,0,720,721,5,80,0,0,721,723,
        3,118,59,0,722,720,1,0,0,0,723,726,1,0,0,0,724,722,1,0,0,0,724,725,
        1,0,0,0,725,727,1,0,0,0,726,724,1,0,0,0,727,728,7,9,0,0,728,729,
        3,144,72,0,729,115,1,0,0,0,730,732,3,76,38,0,731,730,1,0,0,0,731,
        732,1,0,0,0,732,734,1,0,0,0,733,735,5,57,0,0,734,733,1,0,0,0,734,
        735,1,0,0,0,735,736,1,0,0,0,736,737,5,1,0,0,737,738,5,85,0,0,738,
        739,3,74,37,0,739,117,1,0,0,0,740,742,3,76,38,0,741,740,1,0,0,0,
        741,742,1,0,0,0,742,743,1,0,0,0,743,744,3,72,36,0,744,119,1,0,0,
        0,745,747,5,34,0,0,746,748,3,144,72,0,747,746,1,0,0,0,747,748,1,
        0,0,0,748,749,1,0,0,0,749,750,5,79,0,0,750,121,1,0,0,0,751,752,5,
        2,0,0,752,757,5,79,0,0,753,754,5,8,0,0,754,757,5,79,0,0,755,757,
        3,120,60,0,756,751,1,0,0,0,756,753,1,0,0,0,756,755,1,0,0,0,757,123,
        1,0,0,0,758,765,5,1,0,0,759,760,5,99,0,0,760,761,3,144,72,0,761,
        762,5,100,0,0,762,765,1,0,0,0,763,765,5,110,0,0,764,758,1,0,0,0,
        764,759,1,0,0,0,764,763,1,0,0,0,765,125,1,0,0,0,766,768,5,21,0,0,
        767,766,1,0,0,0,767,768,1,0,0,0,768,769,1,0,0,0,769,770,5,83,0,0,
        770,865,5,1,0,0,771,772,5,21,0,0,772,773,5,83,0,0,773,865,3,144,
        72,0,774,775,5,21,0,0,775,776,5,83,0,0,776,865,5,55,0,0,777,778,
        5,21,0,0,778,779,5,83,0,0,779,865,5,56,0,0,780,781,5,21,0,0,781,
        782,5,83,0,0,782,865,5,57,0,0,783,784,5,21,0,0,784,785,5,83,0,0,
        785,865,5,58,0,0,786,787,5,21,0,0,787,788,5,83,0,0,788,865,5,59,
        0,0,789,790,5,21,0,0,790,791,5,83,0,0,791,865,5,64,0,0,792,793,5,
        21,0,0,793,794,5,83,0,0,794,865,5,65,0,0,795,796,5,21,0,0,796,797,
        5,83,0,0,797,865,5,66,0,0,798,799,5,21,0,0,799,800,5,83,0,0,800,
        865,5,67,0,0,801,802,5,21,0,0,802,803,5,83,0,0,803,865,5,68,0,0,
        804,805,5,21,0,0,805,806,5,83,0,0,806,865,5,69,0,0,807,808,5,21,
        0,0,808,809,5,83,0,0,809,865,5,70,0,0,810,811,5,21,0,0,811,812,5,
        83,0,0,812,865,5,71,0,0,813,814,5,21,0,0,814,815,5,83,0,0,815,865,
        5,72,0,0,816,817,5,21,0,0,817,818,5,83,0,0,818,865,5,75,0,0,819,
        820,5,21,0,0,820,821,5,83,0,0,821,865,5,76,0,0,822,823,5,21,0,0,
        823,824,5,83,0,0,824,865,5,86,0,0,825,826,5,21,0,0,826,827,5,83,
        0,0,827,865,5,87,0,0,828,829,5,21,0,0,829,830,5,83,0,0,830,865,5,
        88,0,0,831,832,5,21,0,0,832,833,5,83,0,0,833,865,5,89,0,0,834,835,
        5,21,0,0,835,836,5,83,0,0,836,865,5,90,0,0,837,838,5,21,0,0,838,
        839,5,83,0,0,839,865,5,92,0,0,840,841,5,21,0,0,841,842,5,83,0,0,
        842,865,5,91,0,0,843,844,5,21,0,0,844,845,5,83,0,0,845,865,5,93,
        0,0,846,847,5,21,0,0,847,848,5,83,0,0,848,865,5,94,0,0,849,850,5,
        21,0,0,850,851,5,83,0,0,851,865,5,95,0,0,852,853,5,21,0,0,853,854,
        5,83,0,0,854,865,5,77,0,0,855,856,5,21,0,0,856,857,5,83,0,0,857,
        865,5,62,0,0,858,859,5,21,0,0,859,860,5,83,0,0,860,865,5,63,0,0,
        861,862,5,21,0,0,862,863,5,83,0,0,863,865,5,103,0,0,864,767,1,0,
        0,0,864,771,1,0,0,0,864,774,1,0,0,0,864,777,1,0,0,0,864,780,1,0,
        0,0,864,783,1,0,0,0,864,786,1,0,0,0,864,789,1,0,0,0,864,792,1,0,
        0,0,864,795,1,0,0,0,864,798,1,0,0,0,864,801,1,0,0,0,864,804,1,0,
        0,0,864,807,1,0,0,0,864,810,1,0,0,0,864,813,1,0,0,0,864,816,1,0,
        0,0,864,819,1,0,0,0,864,822,1,0,0,0,864,825,1,0,0,0,864,828,1,0,
        0,0,864,831,1,0,0,0,864,834,1,0,0,0,864,837,1,0,0,0,864,840,1,0,
        0,0,864,843,1,0,0,0,864,846,1,0,0,0,864,849,1,0,0,0,864,852,1,0,
        0,0,864,855,1,0,0,0,864,858,1,0,0,0,864,861,1,0,0,0,865,127,1,0,
        0,0,866,867,5,65,0,0,867,868,5,67,0,0,868,869,4,64,8,1,869,129,1,
        0,0,0,870,871,7,10,0,0,871,131,1,0,0,0,872,873,5,99,0,0,873,874,
        3,82,41,0,874,875,5,100,0,0,875,876,3,144,72,0,876,899,1,0,0,0,877,
        878,5,99,0,0,878,879,5,101,0,0,879,880,3,82,41,0,880,881,5,102,0,
        0,881,882,5,100,0,0,882,883,3,144,72,0,883,899,1,0,0,0,884,885,5,
        99,0,0,885,886,5,64,0,0,886,887,5,1,0,0,887,888,5,65,0,0,888,893,
        3,144,72,0,889,890,5,80,0,0,890,892,3,144,72,0,891,889,1,0,0,0,892,
        895,1,0,0,0,893,891,1,0,0,0,893,894,1,0,0,0,894,896,1,0,0,0,895,
        893,1,0,0,0,896,897,5,100,0,0,897,899,1,0,0,0,898,872,1,0,0,0,898,
        877,1,0,0,0,898,884,1,0,0,0,899,133,1,0,0,0,900,901,7,11,0,0,901,
        135,1,0,0,0,902,903,6,68,-1,0,903,904,3,138,69,0,904,983,1,0,0,0,
        905,906,10,11,0,0,906,907,5,77,0,0,907,908,3,144,72,0,908,909,5,
        78,0,0,909,910,3,144,72,0,910,982,1,0,0,0,911,914,10,10,0,0,912,
        913,5,76,0,0,913,915,3,136,68,0,914,912,1,0,0,0,915,916,1,0,0,0,
        916,914,1,0,0,0,916,917,1,0,0,0,917,982,1,0,0,0,918,921,10,9,0,0,
        919,920,5,75,0,0,920,922,3,136,68,0,921,919,1,0,0,0,922,923,1,0,
        0,0,923,921,1,0,0,0,923,924,1,0,0,0,924,982,1,0,0,0,925,928,10,8,
        0,0,926,927,5,71,0,0,927,929,3,136,68,0,928,926,1,0,0,0,929,930,
        1,0,0,0,930,928,1,0,0,0,930,931,1,0,0,0,931,982,1,0,0,0,932,935,
        10,7,0,0,933,934,5,72,0,0,934,936,3,136,68,0,935,933,1,0,0,0,936,
        937,1,0,0,0,937,935,1,0,0,0,937,938,1,0,0,0,938,982,1,0,0,0,939,
        942,10,6,0,0,940,941,5,70,0,0,941,943,3,136,68,0,942,940,1,0,0,0,
        943,944,1,0,0,0,944,942,1,0,0,0,944,945,1,0,0,0,945,982,1,0,0,0,
        946,949,10,5,0,0,947,948,7,12,0,0,948,950,3,136,68,0,949,947,1,0,
        0,0,950,951,1,0,0,0,951,949,1,0,0,0,951,952,1,0,0,0,952,982,1,0,
        0,0,953,956,10,4,0,0,954,955,7,13,0,0,955,957,3,136,68,0,956,954,
        1,0,0,0,957,958,1,0,0,0,958,956,1,0,0,0,958,959,1,0,0,0,959,982,
        1,0,0,0,960,963,10,3,0,0,961,962,7,14,0,0,962,964,3,136,68,0,963,
        961,1,0,0,0,964,965,1,0,0,0,965,963,1,0,0,0,965,966,1,0,0,0,966,
        982,1,0,0,0,967,970,10,2,0,0,968,969,7,15,0,0,969,971,3,136,68,0,
        970,968,1,0,0,0,971,972,1,0,0,0,972,970,1,0,0,0,972,973,1,0,0,0,
        973,982,1,0,0,0,974,977,10,1,0,0,975,976,7,16,0,0,976,978,3,136,
        68,0,977,975,1,0,0,0,978,979,1,0,0,0,979,977,1,0,0,0,979,980,1,0,
        0,0,980,982,1,0,0,0,981,905,1,0,0,0,981,911,1,0,0,0,981,918,1,0,
        0,0,981,925,1,0,0,0,981,932,1,0,0,0,981,939,1,0,0,0,981,946,1,0,
        0,0,981,953,1,0,0,0,981,960,1,0,0,0,981,967,1,0,0,0,981,974,1,0,
        0,0,982,985,1,0,0,0,983,981,1,0,0,0,983,984,1,0,0,0,984,137,1,0,
        0,0,985,983,1,0,0,0,986,1005,3,132,66,0,987,1005,3,140,70,0,988,
        989,5,55,0,0,989,1005,3,144,72,0,990,991,5,56,0,0,991,1005,3,144,
        72,0,992,993,5,73,0,0,993,1005,3,144,72,0,994,995,5,74,0,0,995,1005,
        3,144,72,0,996,997,5,60,0,0,997,1005,3,144,72,0,998,999,5,61,0,0,
        999,1005,3,144,72,0,1000,1001,5,70,0,0,1001,1005,3,144,72,0,1002,
        1003,5,57,0,0,1003,1005,3,144,72,0,1004,986,1,0,0,0,1004,987,1,0,
        0,0,1004,988,1,0,0,0,1004,990,1,0,0,0,1004,992,1,0,0,0,1004,994,
        1,0,0,0,1004,996,1,0,0,0,1004,998,1,0,0,0,1004,1000,1,0,0,0,1004,
        1002,1,0,0,0,1005,139,1,0,0,0,1006,1010,3,142,71,0,1007,1009,3,148,
        74,0,1008,1007,1,0,0,0,1009,1012,1,0,0,0,1010,1008,1,0,0,0,1010,
        1011,1,0,0,0,1011,1034,1,0,0,0,1012,1010,1,0,0,0,1013,1025,3,78,
        39,0,1014,1025,5,60,0,0,1015,1025,5,61,0,0,1016,1018,5,98,0,0,1017,
        1019,3,124,62,0,1018,1017,1,0,0,0,1018,1019,1,0,0,0,1019,1021,1,
        0,0,0,1020,1022,3,78,39,0,1021,1020,1,0,0,0,1021,1022,1,0,0,0,1022,
        1025,1,0,0,0,1023,1025,5,1,0,0,1024,1013,1,0,0,0,1024,1014,1,0,0,
        0,1024,1015,1,0,0,0,1024,1016,1,0,0,0,1024,1023,1,0,0,0,1025,1029,
        1,0,0,0,1026,1028,3,148,74,0,1027,1026,1,0,0,0,1028,1031,1,0,0,0,
        1029,1027,1,0,0,0,1029,1030,1,0,0,0,1030,1033,1,0,0,0,1031,1029,
        1,0,0,0,1032,1024,1,0,0,0,1033,1036,1,0,0,0,1034,1032,1,0,0,0,1034,
        1035,1,0,0,0,1035,141,1,0,0,0,1036,1034,1,0,0,0,1037,1060,3,130,
        65,0,1038,1039,7,17,0,0,1039,1040,5,99,0,0,1040,1041,3,144,72,0,
        1041,1042,5,100,0,0,1042,1060,1,0,0,0,1043,1060,5,1,0,0,1044,1045,
        5,99,0,0,1045,1046,3,144,72,0,1046,1047,5,100,0,0,1047,1060,1,0,
        0,0,1048,1060,3,60,30,0,1049,1060,3,64,32,0,1050,1054,5,110,0,0,
        1051,1053,5,110,0,0,1052,1051,1,0,0,0,1053,1056,1,0,0,0,1054,1052,
        1,0,0,0,1054,1055,1,0,0,0,1055,1060,1,0,0,0,1056,1054,1,0,0,0,1057,
        1060,3,146,73,0,1058,1060,3,40,20,0,1059,1037,1,0,0,0,1059,1038,
        1,0,0,0,1059,1043,1,0,0,0,1059,1044,1,0,0,0,1059,1048,1,0,0,0,1059,
        1049,1,0,0,0,1059,1050,1,0,0,0,1059,1057,1,0,0,0,1059,1058,1,0,0,
        0,1060,143,1,0,0,0,1061,1064,3,156,78,0,1062,1064,3,158,79,0,1063,
        1061,1,0,0,0,1063,1062,1,0,0,0,1064,145,1,0,0,0,1065,1066,5,4,0,
        0,1066,1067,5,99,0,0,1067,1072,3,144,72,0,1068,1069,5,80,0,0,1069,
        1071,3,144,72,0,1070,1068,1,0,0,0,1071,1074,1,0,0,0,1072,1070,1,
        0,0,0,1072,1073,1,0,0,0,1073,1079,1,0,0,0,1074,1072,1,0,0,0,1075,
        1076,5,79,0,0,1076,1078,5,1,0,0,1077,1075,1,0,0,0,1078,1081,1,0,
        0,0,1079,1077,1,0,0,0,1079,1080,1,0,0,0,1080,1082,1,0,0,0,1081,1079,
        1,0,0,0,1082,1083,5,100,0,0,1083,147,1,0,0,0,1084,1086,5,103,0,0,
        1085,1087,5,64,0,0,1086,1085,1,0,0,0,1086,1087,1,0,0,0,1087,1088,
        1,0,0,0,1088,1089,3,144,72,0,1089,1090,5,104,0,0,1090,1119,1,0,0,
        0,1091,1093,5,103,0,0,1092,1094,5,64,0,0,1093,1092,1,0,0,0,1093,
        1094,1,0,0,0,1094,1096,1,0,0,0,1095,1097,3,144,72,0,1096,1095,1,
        0,0,0,1096,1097,1,0,0,0,1097,1098,1,0,0,0,1098,1100,5,81,0,0,1099,
        1101,5,64,0,0,1100,1099,1,0,0,0,1100,1101,1,0,0,0,1101,1103,1,0,
        0,0,1102,1104,3,144,72,0,1103,1102,1,0,0,0,1103,1104,1,0,0,0,1104,
        1105,1,0,0,0,1105,1119,5,104,0,0,1106,1108,5,103,0,0,1107,1109,3,
        144,72,0,1108,1107,1,0,0,0,1108,1109,1,0,0,0,1109,1114,1,0,0,0,1110,
        1111,5,80,0,0,1111,1113,3,144,72,0,1112,1110,1,0,0,0,1113,1116,1,
        0,0,0,1114,1112,1,0,0,0,1114,1115,1,0,0,0,1115,1117,1,0,0,0,1116,
        1114,1,0,0,0,1117,1119,5,104,0,0,1118,1084,1,0,0,0,1118,1091,1,0,
        0,0,1118,1106,1,0,0,0,1119,149,1,0,0,0,1120,1122,5,70,0,0,1121,1120,
        1,0,0,0,1121,1122,1,0,0,0,1122,1123,1,0,0,0,1123,1124,3,144,72,0,
        1124,151,1,0,0,0,1125,1132,3,150,75,0,1126,1128,5,80,0,0,1127,1129,
        3,150,75,0,1128,1127,1,0,0,0,1128,1129,1,0,0,0,1129,1131,1,0,0,0,
        1130,1126,1,0,0,0,1131,1134,1,0,0,0,1132,1130,1,0,0,0,1132,1133,
        1,0,0,0,1133,153,1,0,0,0,1134,1132,1,0,0,0,1135,1140,3,144,72,0,
        1136,1137,5,80,0,0,1137,1139,3,144,72,0,1138,1136,1,0,0,0,1139,1142,
        1,0,0,0,1140,1138,1,0,0,0,1140,1141,1,0,0,0,1141,155,1,0,0,0,1142,
        1140,1,0,0,0,1143,1144,3,136,68,0,1144,1145,3,134,67,0,1145,1146,
        3,144,72,0,1146,157,1,0,0,0,1147,1151,3,84,42,0,1148,1151,3,126,
        63,0,1149,1151,3,136,68,0,1150,1147,1,0,0,0,1150,1148,1,0,0,0,1150,
        1149,1,0,0,0,1151,159,1,0,0,0,128,163,165,183,186,198,207,215,224,
        231,238,245,252,259,266,273,275,277,284,288,300,312,317,339,345,
        352,356,361,376,380,383,389,397,414,417,420,432,435,443,446,449,
        459,466,470,473,480,488,499,504,509,512,519,525,530,536,544,547,
        560,569,576,598,602,611,613,620,624,628,632,637,641,643,651,659,
        668,684,692,694,701,706,710,716,724,731,734,741,747,756,764,767,
        864,893,898,916,923,930,937,944,951,958,965,972,979,981,983,1004,
        1010,1018,1021,1024,1029,1034,1054,1059,1063,1072,1079,1086,1093,
        1096,1100,1103,1108,1114,1118,1121,1128,1132,1140,1150
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
    public selectionDirective(): SelectionDirectiveContext | null {
        return this.getRuleContext(0, SelectionDirectiveContext);
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
    public includeDirective(): IncludeDirectiveContext | null {
        return this.getRuleContext(0, IncludeDirectiveContext);
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


export class IncludeDirectiveContext extends antlr.ParserRuleContext {
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
        return LPCParser.RULE_includeDirective;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterIncludeDirective) {
             listener.enterIncludeDirective(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitIncludeDirective) {
             listener.exitIncludeDirective(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitIncludeDirective) {
            return visitor.visitIncludeDirective(this);
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


export class SelectionDirectiveContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public HASH(): antlr.TerminalNode {
        return this.getToken(LPCParser.HASH, 0)!;
    }
    public selectionDirectiveTypeWithArg(): SelectionDirectiveTypeWithArgContext | null {
        return this.getRuleContext(0, SelectionDirectiveTypeWithArgContext);
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
    public selectionDirectiveTypeSingle(): SelectionDirectiveTypeSingleContext | null {
        return this.getRuleContext(0, SelectionDirectiveTypeSingleContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_selectionDirective;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterSelectionDirective) {
             listener.enterSelectionDirective(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitSelectionDirective) {
             listener.exitSelectionDirective(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitSelectionDirective) {
            return visitor.visitSelectionDirective(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SelectionDirectiveTypeSingleContext extends antlr.ParserRuleContext {
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
        return LPCParser.RULE_selectionDirectiveTypeSingle;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterSelectionDirectiveTypeSingle) {
             listener.enterSelectionDirectiveTypeSingle(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitSelectionDirectiveTypeSingle) {
             listener.exitSelectionDirectiveTypeSingle(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitSelectionDirectiveTypeSingle) {
            return visitor.visitSelectionDirectiveTypeSingle(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SelectionDirectiveTypeWithArgContext extends antlr.ParserRuleContext {
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
        return LPCParser.RULE_selectionDirectiveTypeWithArg;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterSelectionDirectiveTypeWithArg) {
             listener.enterSelectionDirectiveTypeWithArg(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitSelectionDirectiveTypeWithArg) {
             listener.exitSelectionDirectiveTypeWithArg(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitSelectionDirectiveTypeWithArg) {
            return visitor.visitSelectionDirectiveTypeWithArg(this);
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
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
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


export class DirectiveIncludeFileContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_directiveIncludeFile;
    }
    public override copyFrom(ctx: DirectiveIncludeFileContext): void {
        super.copyFrom(ctx);
    }
}
export class IncludeLocalFileContext extends DirectiveIncludeFileContext {
    public constructor(ctx: DirectiveIncludeFileContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public directiveIncludeFileLocal(): DirectiveIncludeFileLocalContext {
        return this.getRuleContext(0, DirectiveIncludeFileLocalContext)!;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterIncludeLocalFile) {
             listener.enterIncludeLocalFile(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitIncludeLocalFile) {
             listener.exitIncludeLocalFile(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitIncludeLocalFile) {
            return visitor.visitIncludeLocalFile(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class IncludeGlobalFileContext extends DirectiveIncludeFileContext {
    public constructor(ctx: DirectiveIncludeFileContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public directiveIncludeFileGlobal(): DirectiveIncludeFileGlobalContext {
        return this.getRuleContext(0, DirectiveIncludeFileGlobalContext)!;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterIncludeGlobalFile) {
             listener.enterIncludeGlobalFile(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitIncludeGlobalFile) {
             listener.exitIncludeGlobalFile(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitIncludeGlobalFile) {
            return visitor.visitIncludeGlobalFile(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class IncludeDefineContext extends DirectiveIncludeFileContext {
    public constructor(ctx: DirectiveIncludeFileContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterIncludeDefine) {
             listener.enterIncludeDefine(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitIncludeDefine) {
             listener.exitIncludeDefine(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitIncludeDefine) {
            return visitor.visitIncludeDefine(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DirectiveIncludeFilenameContext extends antlr.ParserRuleContext {
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
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DOT, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_directiveIncludeFilename;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterDirectiveIncludeFilename) {
             listener.enterDirectiveIncludeFilename(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitDirectiveIncludeFilename) {
             listener.exitDirectiveIncludeFilename(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitDirectiveIncludeFilename) {
            return visitor.visitDirectiveIncludeFilename(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DirectiveIncludeFileGlobalContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LT(): antlr.TerminalNode {
        return this.getToken(LPCParser.LT, 0)!;
    }
    public directiveIncludeFilename(): DirectiveIncludeFilenameContext {
        return this.getRuleContext(0, DirectiveIncludeFilenameContext)!;
    }
    public GT(): antlr.TerminalNode {
        return this.getToken(LPCParser.GT, 0)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_directiveIncludeFileGlobal;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterDirectiveIncludeFileGlobal) {
             listener.enterDirectiveIncludeFileGlobal(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitDirectiveIncludeFileGlobal) {
             listener.exitDirectiveIncludeFileGlobal(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitDirectiveIncludeFileGlobal) {
            return visitor.visitDirectiveIncludeFileGlobal(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DirectiveIncludeFileLocalContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public StringLiteral(): antlr.TerminalNode {
        return this.getToken(LPCParser.StringLiteral, 0)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_directiveIncludeFileLocal;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterDirectiveIncludeFileLocal) {
             listener.enterDirectiveIncludeFileLocal(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitDirectiveIncludeFileLocal) {
             listener.exitDirectiveIncludeFileLocal(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitDirectiveIncludeFileLocal) {
            return visitor.visitDirectiveIncludeFileLocal(this);
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
    public _inheritTarget?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INHERIT(): antlr.TerminalNode {
        return this.getToken(LPCParser.INHERIT, 0)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(LPCParser.SEMI, 0)!;
    }
    public StringLiteral(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.StringLiteral, 0);
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
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


export class InheritSuperExpressionContext extends antlr.ParserRuleContext {
    public _filename?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SUPER_ACCESSOR(): antlr.TerminalNode {
        return this.getToken(LPCParser.SUPER_ACCESSOR, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
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
    public variableDeclaration(): VariableDeclarationContext | null {
        return this.getRuleContext(0, VariableDeclarationContext);
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
    public _paramName?: Token | null;
    public constructor(ctx: ParameterContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public STRUCT(): antlr.TerminalNode {
        return this.getToken(LPCParser.STRUCT, 0)!;
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
    public _paramType?: TypeSpecifierContext;
    public _paramName?: Token | null;
    public constructor(ctx: ParameterContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
    }
    public VARARGS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.VARARGS, 0);
    }
    public typeSpecifier(): TypeSpecifierContext | null {
        return this.getRuleContext(0, TypeSpecifierContext);
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
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
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


export class VariableModifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
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
    public SEMI(): antlr.TerminalNode {
        return this.getToken(LPCParser.SEMI, 0)!;
    }
    public variableModifier(): VariableModifierContext[];
    public variableModifier(i: number): VariableModifierContext | null;
    public variableModifier(i?: number): VariableModifierContext[] | VariableModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VariableModifierContext);
        }

        return this.getRuleContext(i, VariableModifierContext);
    }
    public primitiveTypeSpecifier(): PrimitiveTypeSpecifierContext | null {
        return this.getRuleContext(0, PrimitiveTypeSpecifierContext);
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
    public _variableName?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
    }
    public STAR(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.STAR, 0);
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


export class ArrayTypeSpecifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public STAR(): antlr.TerminalNode {
        return this.getToken(LPCParser.STAR, 0)!;
    }
    public primitiveTypeSpecifier(): PrimitiveTypeSpecifierContext | null {
        return this.getRuleContext(0, PrimitiveTypeSpecifierContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_arrayTypeSpecifier;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterArrayTypeSpecifier) {
             listener.enterArrayTypeSpecifier(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitArrayTypeSpecifier) {
             listener.exitArrayTypeSpecifier(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitArrayTypeSpecifier) {
            return visitor.visitArrayTypeSpecifier(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TypeSpecifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public primitiveTypeSpecifier(): PrimitiveTypeSpecifierContext | null {
        return this.getRuleContext(0, PrimitiveTypeSpecifierContext);
    }
    public arrayTypeSpecifier(): ArrayTypeSpecifierContext | null {
        return this.getRuleContext(0, ArrayTypeSpecifierContext);
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


export class StatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expressionStatement(): ExpressionStatementContext | null {
        return this.getRuleContext(0, ExpressionStatementContext);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
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
    public variableDeclaration(): VariableDeclarationContext | null {
        return this.getRuleContext(0, VariableDeclarationContext);
    }
    public selectionDirective(): SelectionDirectiveContext | null {
        return this.getRuleContext(0, SelectionDirectiveContext);
    }
    public returnStatement(): ReturnStatementContext | null {
        return this.getRuleContext(0, ReturnStatementContext);
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


export class ExpressionStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(LPCParser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_expressionStatement;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterExpressionStatement) {
             listener.enterExpressionStatement(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitExpressionStatement) {
             listener.exitExpressionStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitExpressionStatement) {
            return visitor.visitExpressionStatement(this);
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
    public StringLiteral(): antlr.TerminalNode[];
    public StringLiteral(i: number): antlr.TerminalNode | null;
    public StringLiteral(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.StringLiteral);
    	} else {
    		return this.getToken(LPCParser.StringLiteral, i);
    	}
    }
    public IntegerConstant(): antlr.TerminalNode[];
    public IntegerConstant(i: number): antlr.TerminalNode | null;
    public IntegerConstant(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.IntegerConstant);
    	} else {
    		return this.getToken(LPCParser.IntegerConstant, i);
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
    public MINUS(): antlr.TerminalNode[];
    public MINUS(i: number): antlr.TerminalNode | null;
    public MINUS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.MINUS);
    	} else {
    		return this.getToken(LPCParser.MINUS, i);
    	}
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
    public forRangeExpression(): ForRangeExpressionContext {
        return this.getRuleContext(0, ForRangeExpressionContext)!;
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
    public forVariable(): ForVariableContext[];
    public forVariable(i: number): ForVariableContext | null;
    public forVariable(i?: number): ForVariableContext[] | ForVariableContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ForVariableContext);
        }

        return this.getRuleContext(i, ForVariableContext);
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
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.COMMA);
    	} else {
    		return this.getToken(LPCParser.COMMA, i);
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
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
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
    public _arraySpecifier?: Token | null;
    public _variableName?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ASSIGN(): antlr.TerminalNode {
        return this.getToken(LPCParser.ASSIGN, 0)!;
    }
    public variableInitializer(): VariableInitializerContext {
        return this.getRuleContext(0, VariableInitializerContext)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
    }
    public primitiveTypeSpecifier(): PrimitiveTypeSpecifierContext | null {
        return this.getRuleContext(0, PrimitiveTypeSpecifierContext);
    }
    public STAR(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.STAR, 0);
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
    public primitiveTypeSpecifier(): PrimitiveTypeSpecifierContext | null {
        return this.getRuleContext(0, PrimitiveTypeSpecifierContext);
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
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
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


export class LambdaExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SINGLEQUOT(): antlr.TerminalNode {
        return this.getToken(LPCParser.SINGLEQUOT, 0)!;
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
    }
    public HASH(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.HASH, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
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
    public QUESTION(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.QUESTION, 0);
    }
    public SHL(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SHL, 0);
    }
    public SHR(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SHR, 0);
    }
    public SQUARE_OPEN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SQUARE_OPEN, 0);
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


export class RightShiftAssignmentContext extends antlr.ParserRuleContext {
    public _first?: Token | null;
    public _second?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public GT(): antlr.TerminalNode {
        return this.getToken(LPCParser.GT, 0)!;
    }
    public GE(): antlr.TerminalNode {
        return this.getToken(LPCParser.GE, 0)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_rightShiftAssignment;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterRightShiftAssignment) {
             listener.enterRightShiftAssignment(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitRightShiftAssignment) {
             listener.exitRightShiftAssignment(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitRightShiftAssignment) {
            return visitor.visitRightShiftAssignment(this);
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
    public StringLiteral(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.StringLiteral, 0);
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
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
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
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
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


export class ConditionalExpressionBaseContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_conditionalExpressionBase;
    }
    public override copyFrom(ctx: ConditionalExpressionBaseContext): void {
        super.copyFrom(ctx);
    }
}
export class RelationalExpresionContext extends ConditionalExpressionBaseContext {
    public _op?: Token | null;
    public constructor(ctx: ConditionalExpressionBaseContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public conditionalExpressionBase(): ConditionalExpressionBaseContext[];
    public conditionalExpressionBase(i: number): ConditionalExpressionBaseContext | null;
    public conditionalExpressionBase(i?: number): ConditionalExpressionBaseContext[] | ConditionalExpressionBaseContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConditionalExpressionBaseContext);
        }

        return this.getRuleContext(i, ConditionalExpressionBaseContext);
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
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterRelationalExpresion) {
             listener.enterRelationalExpresion(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitRelationalExpresion) {
             listener.exitRelationalExpresion(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitRelationalExpresion) {
            return visitor.visitRelationalExpresion(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class AndExpressionContext extends ConditionalExpressionBaseContext {
    public _op?: Token | null;
    public constructor(ctx: ConditionalExpressionBaseContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public conditionalExpressionBase(): ConditionalExpressionBaseContext[];
    public conditionalExpressionBase(i: number): ConditionalExpressionBaseContext | null;
    public conditionalExpressionBase(i?: number): ConditionalExpressionBaseContext[] | ConditionalExpressionBaseContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConditionalExpressionBaseContext);
        }

        return this.getRuleContext(i, ConditionalExpressionBaseContext);
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
export class ConditionalOrExpressionContext extends ConditionalExpressionBaseContext {
    public _op?: Token | null;
    public constructor(ctx: ConditionalExpressionBaseContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public conditionalExpressionBase(): ConditionalExpressionBaseContext[];
    public conditionalExpressionBase(i: number): ConditionalExpressionBaseContext | null;
    public conditionalExpressionBase(i?: number): ConditionalExpressionBaseContext[] | ConditionalExpressionBaseContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConditionalExpressionBaseContext);
        }

        return this.getRuleContext(i, ConditionalExpressionBaseContext);
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
export class ShiftExpressionContext extends ConditionalExpressionBaseContext {
    public _op?: Token | null;
    public constructor(ctx: ConditionalExpressionBaseContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public conditionalExpressionBase(): ConditionalExpressionBaseContext[];
    public conditionalExpressionBase(i: number): ConditionalExpressionBaseContext | null;
    public conditionalExpressionBase(i?: number): ConditionalExpressionBaseContext[] | ConditionalExpressionBaseContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConditionalExpressionBaseContext);
        }

        return this.getRuleContext(i, ConditionalExpressionBaseContext);
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
export class AdditiveExpressionContext extends ConditionalExpressionBaseContext {
    public _op?: Token | null;
    public constructor(ctx: ConditionalExpressionBaseContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public conditionalExpressionBase(): ConditionalExpressionBaseContext[];
    public conditionalExpressionBase(i: number): ConditionalExpressionBaseContext | null;
    public conditionalExpressionBase(i?: number): ConditionalExpressionBaseContext[] | ConditionalExpressionBaseContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConditionalExpressionBaseContext);
        }

        return this.getRuleContext(i, ConditionalExpressionBaseContext);
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
export class TempUnaryExpressionContext extends ConditionalExpressionBaseContext {
    public constructor(ctx: ConditionalExpressionBaseContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public unaryExpression(): UnaryExpressionContext {
        return this.getRuleContext(0, UnaryExpressionContext)!;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterTempUnaryExpression) {
             listener.enterTempUnaryExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitTempUnaryExpression) {
             listener.exitTempUnaryExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitTempUnaryExpression) {
            return visitor.visitTempUnaryExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ConditionalExpressionContext extends ConditionalExpressionBaseContext {
    public constructor(ctx: ConditionalExpressionBaseContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public conditionalExpressionBase(): ConditionalExpressionBaseContext {
        return this.getRuleContext(0, ConditionalExpressionBaseContext)!;
    }
    public QUESTION(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.QUESTION, 0);
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
export class InclusiveOrExpressionContext extends ConditionalExpressionBaseContext {
    public _op?: Token | null;
    public constructor(ctx: ConditionalExpressionBaseContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public conditionalExpressionBase(): ConditionalExpressionBaseContext[];
    public conditionalExpressionBase(i: number): ConditionalExpressionBaseContext | null;
    public conditionalExpressionBase(i?: number): ConditionalExpressionBaseContext[] | ConditionalExpressionBaseContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConditionalExpressionBaseContext);
        }

        return this.getRuleContext(i, ConditionalExpressionBaseContext);
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
export class ExclusiveOrExpressionContext extends ConditionalExpressionBaseContext {
    public _op?: Token | null;
    public constructor(ctx: ConditionalExpressionBaseContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public conditionalExpressionBase(): ConditionalExpressionBaseContext[];
    public conditionalExpressionBase(i: number): ConditionalExpressionBaseContext | null;
    public conditionalExpressionBase(i?: number): ConditionalExpressionBaseContext[] | ConditionalExpressionBaseContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConditionalExpressionBaseContext);
        }

        return this.getRuleContext(i, ConditionalExpressionBaseContext);
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
export class EqualityExpressionContext extends ConditionalExpressionBaseContext {
    public _op?: Token | null;
    public constructor(ctx: ConditionalExpressionBaseContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public conditionalExpressionBase(): ConditionalExpressionBaseContext[];
    public conditionalExpressionBase(i: number): ConditionalExpressionBaseContext | null;
    public conditionalExpressionBase(i?: number): ConditionalExpressionBaseContext[] | ConditionalExpressionBaseContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConditionalExpressionBaseContext);
        }

        return this.getRuleContext(i, ConditionalExpressionBaseContext);
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
export class ConditionalAndExpressionContext extends ConditionalExpressionBaseContext {
    public _op?: Token | null;
    public constructor(ctx: ConditionalExpressionBaseContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public conditionalExpressionBase(): ConditionalExpressionBaseContext[];
    public conditionalExpressionBase(i: number): ConditionalExpressionBaseContext | null;
    public conditionalExpressionBase(i?: number): ConditionalExpressionBaseContext[] | ConditionalExpressionBaseContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConditionalExpressionBaseContext);
        }

        return this.getRuleContext(i, ConditionalExpressionBaseContext);
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
export class MultiplicativeExpressionContext extends ConditionalExpressionBaseContext {
    public _op?: Token | null;
    public constructor(ctx: ConditionalExpressionBaseContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public conditionalExpressionBase(): ConditionalExpressionBaseContext[];
    public conditionalExpressionBase(i: number): ConditionalExpressionBaseContext | null;
    public conditionalExpressionBase(i?: number): ConditionalExpressionBaseContext[] | ConditionalExpressionBaseContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConditionalExpressionBaseContext);
        }

        return this.getRuleContext(i, ConditionalExpressionBaseContext);
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
    public PLUS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PLUS, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
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
    public _pe?: PrimaryExpressionStartContext;
    public _target?: CallOtherTargetContext;
    public _invocation?: MethodInvocationContext;
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
export class InheritExpressionContext extends PrimaryExpressionStartContext {
    public constructor(ctx: PrimaryExpressionStartContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public inheritSuperExpression(): InheritSuperExpressionContext {
        return this.getRuleContext(0, InheritSuperExpressionContext)!;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterInheritExpression) {
             listener.enterInheritExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitInheritExpression) {
             listener.exitInheritExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitInheritExpression) {
            return visitor.visitInheritExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
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
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
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
export class ParenExpressionContext extends PrimaryExpressionStartContext {
    public constructor(ctx: PrimaryExpressionStartContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
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


export class ExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public assignmentExpression(): AssignmentExpressionContext | null {
        return this.getRuleContext(0, AssignmentExpressionContext);
    }
    public nonAssignmentExpression(): NonAssignmentExpressionContext | null {
        return this.getRuleContext(0, NonAssignmentExpressionContext);
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
    public DOUBLEDOT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DOUBLEDOT, 0);
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


export class AssignmentExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public conditionalExpressionBase(): ConditionalExpressionBaseContext {
        return this.getRuleContext(0, ConditionalExpressionBaseContext)!;
    }
    public assignmentOperator(): AssignmentOperatorContext {
        return this.getRuleContext(0, AssignmentOperatorContext)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_assignmentExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterAssignmentExpression) {
             listener.enterAssignmentExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitAssignmentExpression) {
             listener.exitAssignmentExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitAssignmentExpression) {
            return visitor.visitAssignmentExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class NonAssignmentExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public inlineClosureExpression(): InlineClosureExpressionContext | null {
        return this.getRuleContext(0, InlineClosureExpressionContext);
    }
    public lambdaExpression(): LambdaExpressionContext | null {
        return this.getRuleContext(0, LambdaExpressionContext);
    }
    public conditionalExpressionBase(): ConditionalExpressionBaseContext | null {
        return this.getRuleContext(0, ConditionalExpressionBaseContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_nonAssignmentExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterNonAssignmentExpression) {
             listener.enterNonAssignmentExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitNonAssignmentExpression) {
             listener.exitNonAssignmentExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitNonAssignmentExpression) {
            return visitor.visitNonAssignmentExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

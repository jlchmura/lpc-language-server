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
    public static readonly EFUNACCESSOR = 55;
    public static readonly PLUS = 56;
    public static readonly MINUS = 57;
    public static readonly STAR = 58;
    public static readonly DIV = 59;
    public static readonly MOD = 60;
    public static readonly INC = 61;
    public static readonly DEC = 62;
    public static readonly SHL = 63;
    public static readonly SHR = 64;
    public static readonly LT = 65;
    public static readonly GT = 66;
    public static readonly LE = 67;
    public static readonly GE = 68;
    public static readonly EQ = 69;
    public static readonly NE = 70;
    public static readonly AND = 71;
    public static readonly OR = 72;
    public static readonly XOR = 73;
    public static readonly NOT = 74;
    public static readonly BNOT = 75;
    public static readonly AND_AND = 76;
    public static readonly OR_OR = 77;
    public static readonly QUESTION = 78;
    public static readonly COLON = 79;
    public static readonly SEMI = 80;
    public static readonly COMMA = 81;
    public static readonly DOUBLEDOT = 82;
    public static readonly DOT = 83;
    public static readonly SINGLEQUOT = 84;
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
    public static readonly RULE_inheritSuperStatement = 20;
    public static readonly RULE_inheritSuperExpression = 21;
    public static readonly RULE_declaration = 22;
    public static readonly RULE_functionModifier = 23;
    public static readonly RULE_functionHeader = 24;
    public static readonly RULE_functionHeaderDeclaration = 25;
    public static readonly RULE_functionDeclaration = 26;
    public static readonly RULE_parameterList = 27;
    public static readonly RULE_parameter = 28;
    public static readonly RULE_structDeclaration = 29;
    public static readonly RULE_structMemberDeclaration = 30;
    public static readonly RULE_arrayExpression = 31;
    public static readonly RULE_mappingContent = 32;
    public static readonly RULE_mappingExpression = 33;
    public static readonly RULE_variableModifier = 34;
    public static readonly RULE_variableDeclaration = 35;
    public static readonly RULE_variableDeclaratorExpression = 36;
    public static readonly RULE_variableDeclarator = 37;
    public static readonly RULE_variableInitializer = 38;
    public static readonly RULE_primitiveTypeSpecifier = 39;
    public static readonly RULE_methodInvocation = 40;
    public static readonly RULE_arrayTypeSpecifier = 41;
    public static readonly RULE_typeSpecifier = 42;
    public static readonly RULE_inlineClosureExpression = 43;
    public static readonly RULE_statement = 44;
    public static readonly RULE_expressionStatement = 45;
    public static readonly RULE_block = 46;
    public static readonly RULE_selectionStatement = 47;
    public static readonly RULE_elseIfExpression = 48;
    public static readonly RULE_elseExpression = 49;
    public static readonly RULE_ifExpression = 50;
    public static readonly RULE_ifStatement = 51;
    public static readonly RULE_switchStatement = 52;
    public static readonly RULE_caseExpression = 53;
    public static readonly RULE_caseCondition = 54;
    public static readonly RULE_caseStatement = 55;
    public static readonly RULE_defaultStatement = 56;
    public static readonly RULE_iterationStatement = 57;
    public static readonly RULE_forRangeExpression = 58;
    public static readonly RULE_foreachRangeExpression = 59;
    public static readonly RULE_forVariable = 60;
    public static readonly RULE_forEachVariable = 61;
    public static readonly RULE_returnStatement = 62;
    public static readonly RULE_jumpStatement = 63;
    public static readonly RULE_callOtherTarget = 64;
    public static readonly RULE_lambdaExpression = 65;
    public static readonly RULE_rightShiftAssignment = 66;
    public static readonly RULE_literal = 67;
    public static readonly RULE_castExpression = 68;
    public static readonly RULE_assignmentOperator = 69;
    public static readonly RULE_conditionalExpressionBase = 70;
    public static readonly RULE_unaryExpression = 71;
    public static readonly RULE_primaryExpression = 72;
    public static readonly RULE_primaryExpressionStart = 73;
    public static readonly RULE_expression = 74;
    public static readonly RULE_catchExpr = 75;
    public static readonly RULE_bracketExpression = 76;
    public static readonly RULE_argument = 77;
    public static readonly RULE_argumentList = 78;
    public static readonly RULE_expressionList = 79;
    public static readonly RULE_assignmentExpression = 80;
    public static readonly RULE_nonAssignmentExpression = 81;

    public static readonly literalNames = [
        null, null, "'break'", "'case'", "'catch'", "'char'", "'closure'", 
        "'const'", "'continue'", "'default'", "'do'", "'#echo'", "'else'", 
        "'elif'", "'endif'", "'enum'", "'extern'", "'float'", "'for'", "'foreach'", 
        "'goto'", "'#'", "'if'", "'ifdef'", "'ifndef'", "'in'", "'include'", 
        "'inherit'", "'int'", "'#line'", "'mapping'", "'mixed'", "'object'", 
        "'pragma'", "'return'", "'status'", "'struct'", "'string'", "'symbol'", 
        "'switch'", "'typedef'", "'union'", "'unknown'", "'#undef'", "'void'", 
        "'volatile'", "'while'", "'private'", "'protected'", "'public'", 
        "'static'", "'noshadow'", "'nosave'", "'nomask'", "'varargs'", "'efun::'", 
        "'+'", "'-'", "'*'", "'/'", "'%'", "'++'", "'--'", "'<<'", "'>>'", 
        "'<'", "'>'", "'<='", "'>='", "'=='", "'!='", "'&'", "'|'", "'^'", 
        "'!'", "'~'", "'&&'", "'||'", "'?'", "':'", "';'", "','", "'..'", 
        "'.'", "'''", "'='", "'+='", "'-='", "'*='", "'/='", "'%='", "'||='", 
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
        "NOSHADOW", "NOSAVE", "NOMASK", "VARARGS", "EFUNACCESSOR", "PLUS", 
        "MINUS", "STAR", "DIV", "MOD", "INC", "DEC", "SHL", "SHR", "LT", 
        "GT", "LE", "GE", "EQ", "NE", "AND", "OR", "XOR", "NOT", "BNOT", 
        "AND_AND", "OR_OR", "QUESTION", "COLON", "SEMI", "COMMA", "DOUBLEDOT", 
        "DOT", "SINGLEQUOT", "ASSIGN", "ADD_ASSIGN", "SUB_ASSIGN", "MUL_ASSIGN", 
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
        "inheritStatement", "inheritSuperStatement", "inheritSuperExpression", 
        "declaration", "functionModifier", "functionHeader", "functionHeaderDeclaration", 
        "functionDeclaration", "parameterList", "parameter", "structDeclaration", 
        "structMemberDeclaration", "arrayExpression", "mappingContent", 
        "mappingExpression", "variableModifier", "variableDeclaration", 
        "variableDeclaratorExpression", "variableDeclarator", "variableInitializer", 
        "primitiveTypeSpecifier", "methodInvocation", "arrayTypeSpecifier", 
        "typeSpecifier", "inlineClosureExpression", "statement", "expressionStatement", 
        "block", "selectionStatement", "elseIfExpression", "elseExpression", 
        "ifExpression", "ifStatement", "switchStatement", "caseExpression", 
        "caseCondition", "caseStatement", "defaultStatement", "iterationStatement", 
        "forRangeExpression", "foreachRangeExpression", "forVariable", "forEachVariable", 
        "returnStatement", "jumpStatement", "callOtherTarget", "lambdaExpression", 
        "rightShiftAssignment", "literal", "castExpression", "assignmentOperator", 
        "conditionalExpressionBase", "unaryExpression", "primaryExpression", 
        "primaryExpressionStart", "expression", "catchExpr", "bracketExpression", 
        "argument", "argumentList", "expressionList", "assignmentExpression", 
        "nonAssignmentExpression",
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
            this.state = 169;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4162979938) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 75471993) !== 0) || _la === 110 || _la === 117) {
                {
                this.state = 167;
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
                    this.state = 164;
                    this.declaration();
                    }
                    break;
                case LPCParser.ECHO:
                case LPCParser.HASH:
                case LPCParser.LINE:
                case LPCParser.UNDEF:
                case LPCParser.DEFINE:
                    {
                    this.state = 165;
                    this.preprocessorDirective();
                    }
                    break;
                case LPCParser.INHERIT:
                    {
                    this.state = 166;
                    this.inheritStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 171;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
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
        let _la: number;
        try {
            this.state = 190;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 174;
                this.selectionDirective();
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
                this.includeDirective();
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
                _la = this.tokenStream.LA(1);
                while (_la === 81) {
                    {
                    {
                    this.state = 183;
                    this.match(LPCParser.COMMA);
                    this.state = 184;
                    this.match(LPCParser.Identifier);
                    }
                    }
                    this.state = 189;
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
            this.state = 192;
            this.match(LPCParser.HASH);
            this.state = 193;
            this.directiveTypeInclude();
            this.state = 194;
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
            this.state = 196;
            this.match(LPCParser.DEFINE);
            this.state = 197;
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
            this.state = 211;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 199;
                this.match(LPCParser.HASH);
                this.state = 200;
                this.selectionDirectiveTypeWithArg();
                this.state = 202;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 74) {
                    {
                    this.state = 201;
                    this.match(LPCParser.NOT);
                    }
                }

                this.state = 204;
                this.directiveArgument();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 206;
                this.match(LPCParser.HASH);
                this.state = 207;
                _la = this.tokenStream.LA(1);
                if(!(_la === 13 || _la === 22)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 208;
                this.directiveIfTestExpression(0);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 209;
                this.match(LPCParser.HASH);
                this.state = 210;
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
            this.state = 213;
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
            this.state = 215;
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
            this.state = 219;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
            case 1:
                {
                this.state = 218;
                this.match(LPCParser.NOT);
                }
                break;
            }
            this.state = 221;
            this.directiveIfArgument();
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 232;
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
                    this.state = 223;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 226;
                    this.errorHandler.sync(this);
                    alternative = 1;
                    do {
                        switch (alternative) {
                        case 1:
                            {
                            {
                            this.state = 224;
                            _la = this.tokenStream.LA(1);
                            if(!(((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 6207) !== 0))) {
                            this.errorHandler.recoverInline(this);
                            }
                            else {
                                this.errorHandler.reportMatch(this);
                                this.consume();
                            }
                            this.state = 225;
                            this.directiveIfTestExpression(0);
                            }
                            }
                            break;
                        default:
                            throw new antlr.NoViableAltException(this);
                        }
                        this.state = 228;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 7, this.context);
                    } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                    }
                    }
                }
                this.state = 234;
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
            this.state = 244;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 235;
                this.match(LPCParser.Identifier);
                this.state = 239;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
                case 1:
                    {
                    this.state = 236;
                    this.match(LPCParser.PAREN_OPEN);
                    this.state = 237;
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 1 || _la === 106 || _la === 110)) {
                    this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 238;
                    this.match(LPCParser.PAREN_CLOSE);
                    }
                    break;
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 241;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 242;
                this.match(LPCParser.IntegerConstant);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 243;
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
    public directiveTypeWithArguments(): DirectiveTypeWithArgumentsContext {
        let localContext = new DirectiveTypeWithArgumentsContext(this.context, this.state);
        this.enterRule(localContext, 18, LPCParser.RULE_directiveTypeWithArguments);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 246;
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
            this.state = 248;
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
            this.state = 250;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 251;
            this.match(LPCParser.Identifier);
            this.state = 256;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 81) {
                {
                {
                this.state = 252;
                this.match(LPCParser.COMMA);
                this.state = 253;
                this.match(LPCParser.Identifier);
                }
                }
                this.state = 258;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 259;
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
            this.state = 261;
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
            this.state = 263;
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
            this.state = 268;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.LT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 265;
                this.directiveIncludeFileGlobal();
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 266;
                this.directiveIncludeFileLocal();
                }
                break;
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 267;
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
            this.state = 270;
            this.match(LPCParser.Identifier);
            this.state = 273;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 83) {
                {
                this.state = 271;
                this.match(LPCParser.DOT);
                this.state = 272;
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
            this.state = 275;
            this.match(LPCParser.LT);
            this.state = 276;
            this.directiveIncludeFilename();
            this.state = 277;
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
            this.state = 279;
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
        this.enterRule(localContext, 38, LPCParser.RULE_inheritStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 283;
            this.match(LPCParser.INHERIT);
            this.state = 284;
            localContext._inheritTarget = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 1 || _la === 110)) {
                localContext._inheritTarget = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 285;
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
    public inheritSuperStatement(): InheritSuperStatementContext {
        let localContext = new InheritSuperStatementContext(this.context, this.state);
        this.enterRule(localContext, 40, LPCParser.RULE_inheritSuperStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 287;
            this.inheritSuperExpression();
            this.state = 288;
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
        this.enterRule(localContext, 42, LPCParser.RULE_inheritSuperExpression);
        let _la: number;
        try {
            this.state = 298;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.EFUNACCESSOR:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 290;
                this.match(LPCParser.EFUNACCESSOR);
                this.state = 291;
                this.expression();
                }
                break;
            case LPCParser.COLON:
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 293;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 110) {
                    {
                    this.state = 292;
                    localContext._filename = this.match(LPCParser.StringLiteral);
                    }
                }

                this.state = 295;
                this.match(LPCParser.COLON);
                this.state = 296;
                this.match(LPCParser.COLON);
                this.state = 297;
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
        this.enterRule(localContext, 44, LPCParser.RULE_declaration);
        try {
            this.state = 304;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 300;
                this.functionHeaderDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 301;
                this.functionDeclaration();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 302;
                this.structDeclaration();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 303;
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
        this.enterRule(localContext, 46, LPCParser.RULE_functionModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 306;
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
        this.enterRule(localContext, 48, LPCParser.RULE_functionHeader);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 311;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 223) !== 0)) {
                {
                {
                this.state = 308;
                this.functionModifier();
                }
                }
                this.state = 313;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 315;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 67114089) !== 0)) {
                {
                this.state = 314;
                this.typeSpecifier();
                }
            }

            this.state = 317;
            localContext._functionName = this.match(LPCParser.Identifier);
            this.state = 318;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 320;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792098) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 71308409) !== 0)) {
                {
                this.state = 319;
                localContext._functionArgs = this.parameterList();
                }
            }

            this.state = 322;
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
        this.enterRule(localContext, 50, LPCParser.RULE_functionHeaderDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 324;
            this.functionHeader();
            this.state = 325;
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
        this.enterRule(localContext, 52, LPCParser.RULE_functionDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 327;
            this.functionHeader();
            this.state = 328;
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
        this.enterRule(localContext, 54, LPCParser.RULE_parameterList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 330;
            this.parameter();
            this.state = 335;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 81) {
                {
                {
                this.state = 331;
                this.match(LPCParser.COMMA);
                this.state = 332;
                this.parameter();
                }
                }
                this.state = 337;
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
        this.enterRule(localContext, 56, LPCParser.RULE_parameter);
        let _la: number;
        try {
            this.state = 348;
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
                this.state = 339;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 54) {
                    {
                    this.state = 338;
                    this.match(LPCParser.VARARGS);
                    }
                }

                this.state = 342;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 67114089) !== 0)) {
                    {
                    this.state = 341;
                    (localContext as PrimitiveTypeParameterExpressionContext)._paramType = this.typeSpecifier();
                    }
                }

                this.state = 344;
                (localContext as PrimitiveTypeParameterExpressionContext)._paramName = this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.STRUCT:
                localContext = new StructParameterExpressionContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 345;
                (localContext as StructParameterExpressionContext)._paramType = this.match(LPCParser.STRUCT);
                this.state = 346;
                (localContext as StructParameterExpressionContext)._structName = this.match(LPCParser.Identifier);
                this.state = 347;
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
        this.enterRule(localContext, 58, LPCParser.RULE_structDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 350;
            this.match(LPCParser.STRUCT);
            this.state = 351;
            localContext._structName = this.match(LPCParser.Identifier);
            this.state = 352;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 356;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 67114089) !== 0)) {
                {
                {
                this.state = 353;
                localContext._structMembers = this.structMemberDeclaration();
                }
                }
                this.state = 358;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 359;
            this.match(LPCParser.CURLY_CLOSE);
            this.state = 360;
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
        this.enterRule(localContext, 60, LPCParser.RULE_structMemberDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 362;
            this.typeSpecifier();
            this.state = 363;
            this.match(LPCParser.Identifier);
            this.state = 364;
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
        this.enterRule(localContext, 62, LPCParser.RULE_arrayExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 366;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 367;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 376;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 555286735) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 126469) !== 0)) {
                {
                this.state = 368;
                this.expression();
                this.state = 373;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 25, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 369;
                        this.match(LPCParser.COMMA);
                        this.state = 370;
                        this.expression();
                        }
                        }
                    }
                    this.state = 375;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 25, this.context);
                }
                }
            }

            this.state = 379;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 81) {
                {
                this.state = 378;
                this.match(LPCParser.COMMA);
                }
            }

            this.state = 381;
            this.match(LPCParser.CURLY_CLOSE);
            this.state = 382;
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
        this.enterRule(localContext, 64, LPCParser.RULE_mappingContent);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 384;
            localContext._mappingKey = this.expression();
            this.state = 394;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 79) {
                {
                this.state = 385;
                this.match(LPCParser.COLON);
                this.state = 386;
                this.expression();
                this.state = 391;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 80) {
                    {
                    {
                    this.state = 387;
                    this.match(LPCParser.SEMI);
                    this.state = 388;
                    this.expression();
                    }
                    }
                    this.state = 393;
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
        this.enterRule(localContext, 66, LPCParser.RULE_mappingExpression);
        let _la: number;
        try {
            let alternative: number;
            this.state = 418;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 33, this.context) ) {
            case 1:
                localContext = new MappingValueInitializerContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 396;
                this.match(LPCParser.MAPPING_OPEN);
                this.state = 405;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 555286735) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 126469) !== 0)) {
                    {
                    this.state = 397;
                    this.mappingContent();
                    this.state = 402;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 30, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 398;
                            this.match(LPCParser.COMMA);
                            this.state = 399;
                            this.mappingContent();
                            }
                            }
                        }
                        this.state = 404;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 30, this.context);
                    }
                    }
                }

                this.state = 408;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 81) {
                    {
                    this.state = 407;
                    this.match(LPCParser.COMMA);
                    }
                }

                this.state = 410;
                this.match(LPCParser.SQUARE_CLOSE);
                this.state = 411;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 2:
                localContext = new MappingEmptyInitializerContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 412;
                this.match(LPCParser.MAPPING_OPEN);
                this.state = 413;
                this.match(LPCParser.COLON);
                this.state = 414;
                this.expression();
                this.state = 415;
                this.match(LPCParser.SQUARE_CLOSE);
                this.state = 416;
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
        this.enterRule(localContext, 68, LPCParser.RULE_variableModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 420;
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
        this.enterRule(localContext, 70, LPCParser.RULE_variableDeclaration);
        let _la: number;
        try {
            this.state = 463;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 40, this.context) ) {
            case 1:
                localContext = new PrimitiveTypeVariableDeclarationContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 425;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 63) !== 0)) {
                    {
                    {
                    this.state = 422;
                    this.variableModifier();
                    }
                    }
                    this.state = 427;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 429;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 5225) !== 0)) {
                    {
                    this.state = 428;
                    this.primitiveTypeSpecifier();
                    }
                }

                this.state = 432;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 110) {
                    {
                    this.state = 431;
                    (localContext as PrimitiveTypeVariableDeclarationContext)._objectName = this.match(LPCParser.StringLiteral);
                    }
                }

                this.state = 434;
                this.variableDeclaratorExpression();
                this.state = 439;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 81) {
                    {
                    {
                    this.state = 435;
                    this.match(LPCParser.COMMA);
                    this.state = 436;
                    this.variableDeclaratorExpression();
                    }
                    }
                    this.state = 441;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 442;
                this.match(LPCParser.SEMI);
                }
                break;
            case 2:
                localContext = new StructVariableDeclarationContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 447;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 63) !== 0)) {
                    {
                    {
                    this.state = 444;
                    this.variableModifier();
                    }
                    }
                    this.state = 449;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 450;
                this.match(LPCParser.STRUCT);
                this.state = 451;
                (localContext as StructVariableDeclarationContext)._structName = this.match(LPCParser.Identifier);
                this.state = 452;
                this.variableDeclaratorExpression();
                this.state = 458;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 81) {
                    {
                    {
                    this.state = 453;
                    this.match(LPCParser.COMMA);
                    this.state = 454;
                    (localContext as StructVariableDeclarationContext)._structName = this.match(LPCParser.Identifier);
                    this.state = 455;
                    this.variableDeclaratorExpression();
                    }
                    }
                    this.state = 460;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 461;
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
        this.enterRule(localContext, 72, LPCParser.RULE_variableDeclaratorExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 465;
            this.variableDeclarator();
            this.state = 468;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 85) {
                {
                this.state = 466;
                this.match(LPCParser.ASSIGN);
                this.state = 467;
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
            this.state = 471;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 58) {
                {
                this.state = 470;
                localContext._arraySpecifier = this.match(LPCParser.STAR);
                }
            }

            this.state = 473;
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
        this.enterRule(localContext, 76, LPCParser.RULE_variableInitializer);
        try {
            this.state = 478;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 43, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 475;
                this.expression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 476;
                this.arrayExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 477;
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
            this.state = 480;
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
        this.enterRule(localContext, 80, LPCParser.RULE_methodInvocation);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 482;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 484;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 555286735) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 126469) !== 0)) {
                {
                this.state = 483;
                this.argumentList();
                }
            }

            this.state = 486;
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
        this.enterRule(localContext, 82, LPCParser.RULE_arrayTypeSpecifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 489;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 5225) !== 0)) {
                {
                this.state = 488;
                this.primitiveTypeSpecifier();
                }
            }

            this.state = 491;
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
        this.enterRule(localContext, 84, LPCParser.RULE_typeSpecifier);
        try {
            this.state = 495;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 46, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 493;
                this.primitiveTypeSpecifier();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 494;
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
        this.enterRule(localContext, 86, LPCParser.RULE_inlineClosureExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 497;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 498;
            this.match(LPCParser.COLON);
            this.state = 506;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 48, this.context) ) {
            case 1:
                {
                this.state = 499;
                this.expression();
                }
                break;
            case 2:
                {
                this.state = 503;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 47, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 500;
                        this.statement();
                        }
                        }
                    }
                    this.state = 505;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 47, this.context);
                }
                }
                break;
            }
            this.state = 508;
            this.match(LPCParser.COLON);
            this.state = 509;
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
        this.enterRule(localContext, 88, LPCParser.RULE_statement);
        try {
            this.state = 519;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 49, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 511;
                this.expressionStatement();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 512;
                this.block();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 513;
                this.selectionStatement();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 514;
                this.iterationStatement();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 515;
                this.jumpStatement();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 516;
                this.variableDeclaration();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 517;
                this.selectionDirective();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 518;
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
        this.enterRule(localContext, 90, LPCParser.RULE_expressionStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 521;
            this.expression();
            this.state = 522;
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
        this.enterRule(localContext, 92, LPCParser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 524;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 528;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871286) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 1738527997) !== 0) || ((((_la - 71)) & ~0x1F) === 0 && ((1 << (_la - 71)) & 1409294617) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 247) !== 0)) {
                {
                {
                this.state = 525;
                this.statement();
                }
                }
                this.state = 530;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 531;
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
        this.enterRule(localContext, 94, LPCParser.RULE_selectionStatement);
        try {
            this.state = 535;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.IF:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 533;
                this.ifStatement();
                }
                break;
            case LPCParser.SWITCH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 534;
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
        this.enterRule(localContext, 96, LPCParser.RULE_elseIfExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 537;
            this.match(LPCParser.ELSE);
            this.state = 538;
            this.match(LPCParser.IF);
            this.state = 539;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 540;
            this.expression();
            this.state = 541;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 542;
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
        this.enterRule(localContext, 98, LPCParser.RULE_elseExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 544;
            this.match(LPCParser.ELSE);
            this.state = 545;
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
        this.enterRule(localContext, 100, LPCParser.RULE_ifExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 547;
            this.match(LPCParser.IF);
            this.state = 548;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 549;
            this.expression();
            this.state = 550;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 553;
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
            case LPCParser.EFUNACCESSOR:
            case LPCParser.PLUS:
            case LPCParser.MINUS:
            case LPCParser.STAR:
            case LPCParser.INC:
            case LPCParser.DEC:
            case LPCParser.AND:
            case LPCParser.NOT:
            case LPCParser.BNOT:
            case LPCParser.COLON:
            case LPCParser.SINGLEQUOT:
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
                this.state = 551;
                this.statement();
                }
                break;
            case LPCParser.SEMI:
                {
                this.state = 552;
                this.match(LPCParser.SEMI);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
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
    public ifStatement(): IfStatementContext {
        let localContext = new IfStatementContext(this.context, this.state);
        this.enterRule(localContext, 102, LPCParser.RULE_ifStatement);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 555;
            this.ifExpression();
            this.state = 559;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 53, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 556;
                    this.elseIfExpression();
                    }
                    }
                }
                this.state = 561;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 53, this.context);
            }
            this.state = 563;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 54, this.context) ) {
            case 1:
                {
                this.state = 562;
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
        this.enterRule(localContext, 104, LPCParser.RULE_switchStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 565;
            this.match(LPCParser.SWITCH);
            this.state = 566;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 567;
            this.expression();
            this.state = 568;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 569;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 574;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 3 || _la === 9) {
                {
                this.state = 572;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.CASE:
                    {
                    this.state = 570;
                    this.caseStatement();
                    }
                    break;
                case LPCParser.DEFAULT:
                    {
                    this.state = 571;
                    this.defaultStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 576;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 577;
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
        this.enterRule(localContext, 106, LPCParser.RULE_caseExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 579;
            this.caseCondition();
            this.state = 582;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 82) {
                {
                this.state = 580;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 581;
                this.caseCondition();
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
    public caseCondition(): CaseConditionContext {
        let localContext = new CaseConditionContext(this.context, this.state);
        this.enterRule(localContext, 108, LPCParser.RULE_caseCondition);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 591;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.StringLiteral:
                {
                this.state = 584;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case LPCParser.MINUS:
            case LPCParser.IntegerConstant:
                {
                this.state = 586;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 57) {
                    {
                    this.state = 585;
                    this.match(LPCParser.MINUS);
                    }
                }

                this.state = 588;
                this.match(LPCParser.IntegerConstant);
                }
                break;
            case LPCParser.Identifier:
                {
                this.state = 589;
                this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.CharacterConstant:
                {
                this.state = 590;
                this.match(LPCParser.CharacterConstant);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
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
    public caseStatement(): CaseStatementContext {
        let localContext = new CaseStatementContext(this.context, this.state);
        this.enterRule(localContext, 110, LPCParser.RULE_caseStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 593;
            this.match(LPCParser.CASE);
            this.state = 594;
            this.caseExpression();
            this.state = 595;
            this.match(LPCParser.COLON);
            this.state = 599;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871286) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 1738527997) !== 0) || ((((_la - 71)) & ~0x1F) === 0 && ((1 << (_la - 71)) & 1409294617) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 247) !== 0)) {
                {
                {
                this.state = 596;
                this.statement();
                }
                }
                this.state = 601;
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
        this.enterRule(localContext, 112, LPCParser.RULE_defaultStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 602;
            this.match(LPCParser.DEFAULT);
            this.state = 603;
            this.match(LPCParser.COLON);
            this.state = 607;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871286) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 1738527997) !== 0) || ((((_la - 71)) & ~0x1F) === 0 && ((1 << (_la - 71)) & 1409294617) !== 0) || ((((_la - 106)) & ~0x1F) === 0 && ((1 << (_la - 106)) & 247) !== 0)) {
                {
                {
                this.state = 604;
                this.statement();
                }
                }
                this.state = 609;
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
        this.enterRule(localContext, 114, LPCParser.RULE_iterationStatement);
        try {
            this.state = 642;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.WHILE:
                localContext = new WhileStatementContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 610;
                this.match(LPCParser.WHILE);
                this.state = 611;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 612;
                this.expression();
                this.state = 613;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 616;
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
                case LPCParser.EFUNACCESSOR:
                case LPCParser.PLUS:
                case LPCParser.MINUS:
                case LPCParser.STAR:
                case LPCParser.INC:
                case LPCParser.DEC:
                case LPCParser.AND:
                case LPCParser.NOT:
                case LPCParser.BNOT:
                case LPCParser.COLON:
                case LPCParser.SINGLEQUOT:
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
                    this.state = 614;
                    this.statement();
                    }
                    break;
                case LPCParser.SEMI:
                    {
                    this.state = 615;
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
                this.state = 618;
                this.match(LPCParser.DO);
                this.state = 619;
                this.statement();
                this.state = 620;
                this.match(LPCParser.WHILE);
                this.state = 621;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 622;
                this.expression();
                this.state = 623;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 624;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.FOR:
                localContext = new ForStatementContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 626;
                this.match(LPCParser.FOR);
                this.state = 627;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 628;
                this.forRangeExpression();
                this.state = 629;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 632;
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
                case LPCParser.EFUNACCESSOR:
                case LPCParser.PLUS:
                case LPCParser.MINUS:
                case LPCParser.STAR:
                case LPCParser.INC:
                case LPCParser.DEC:
                case LPCParser.AND:
                case LPCParser.NOT:
                case LPCParser.BNOT:
                case LPCParser.COLON:
                case LPCParser.SINGLEQUOT:
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
                    this.state = 630;
                    this.statement();
                    }
                    break;
                case LPCParser.SEMI:
                    {
                    this.state = 631;
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
                this.state = 634;
                this.match(LPCParser.FOREACH);
                this.state = 635;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 636;
                this.foreachRangeExpression();
                this.state = 637;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 640;
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
                case LPCParser.EFUNACCESSOR:
                case LPCParser.PLUS:
                case LPCParser.MINUS:
                case LPCParser.STAR:
                case LPCParser.INC:
                case LPCParser.DEC:
                case LPCParser.AND:
                case LPCParser.NOT:
                case LPCParser.BNOT:
                case LPCParser.COLON:
                case LPCParser.SINGLEQUOT:
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
                    this.state = 638;
                    this.statement();
                    }
                    break;
                case LPCParser.SEMI:
                    {
                    this.state = 639;
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
        this.enterRule(localContext, 116, LPCParser.RULE_forRangeExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 644;
            this.forVariable();
            this.state = 649;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 81) {
                {
                {
                this.state = 645;
                this.match(LPCParser.COMMA);
                this.state = 646;
                this.forVariable();
                }
                }
                this.state = 651;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 652;
            this.match(LPCParser.SEMI);
            this.state = 654;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 555286735) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 126469) !== 0)) {
                {
                this.state = 653;
                this.expression();
                }
            }

            this.state = 656;
            this.match(LPCParser.SEMI);
            this.state = 658;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 555286735) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 126469) !== 0)) {
                {
                this.state = 657;
                this.expression();
                }
            }

            this.state = 664;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 81) {
                {
                {
                this.state = 660;
                this.match(LPCParser.COMMA);
                this.state = 661;
                this.expression();
                }
                }
                this.state = 666;
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
        this.enterRule(localContext, 118, LPCParser.RULE_foreachRangeExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 667;
            this.forEachVariable();
            this.state = 672;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 81) {
                {
                {
                this.state = 668;
                this.match(LPCParser.COMMA);
                this.state = 669;
                this.forEachVariable();
                }
                }
                this.state = 674;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 675;
            _la = this.tokenStream.LA(1);
            if(!(_la === 25 || _la === 79)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 676;
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
        this.enterRule(localContext, 120, LPCParser.RULE_forVariable);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 679;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 5225) !== 0)) {
                {
                this.state = 678;
                this.primitiveTypeSpecifier();
                }
            }

            this.state = 682;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 58) {
                {
                this.state = 681;
                localContext._arraySpecifier = this.match(LPCParser.STAR);
                }
            }

            this.state = 684;
            localContext._variableName = this.match(LPCParser.Identifier);
            this.state = 689;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.ASSIGN:
                {
                this.state = 685;
                this.match(LPCParser.ASSIGN);
                this.state = 686;
                this.variableInitializer();
                }
                break;
            case LPCParser.INC:
                {
                this.state = 687;
                this.match(LPCParser.INC);
                }
                break;
            case LPCParser.DEC:
                {
                this.state = 688;
                this.match(LPCParser.DEC);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
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
    public forEachVariable(): ForEachVariableContext {
        let localContext = new ForEachVariableContext(this.context, this.state);
        this.enterRule(localContext, 122, LPCParser.RULE_forEachVariable);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 692;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 5225) !== 0)) {
                {
                this.state = 691;
                this.primitiveTypeSpecifier();
                }
            }

            this.state = 694;
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
        this.enterRule(localContext, 124, LPCParser.RULE_returnStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 696;
            this.match(LPCParser.RETURN);
            this.state = 698;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 555286735) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 126469) !== 0)) {
                {
                this.state = 697;
                this.expression();
                }
            }

            this.state = 700;
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
        this.enterRule(localContext, 126, LPCParser.RULE_jumpStatement);
        try {
            this.state = 707;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BREAK:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 702;
                this.match(LPCParser.BREAK);
                this.state = 703;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.CONTINUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 704;
                this.match(LPCParser.CONTINUE);
                this.state = 705;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.RETURN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 706;
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
        this.enterRule(localContext, 128, LPCParser.RULE_callOtherTarget);
        try {
            this.state = 715;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 709;
                this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.PAREN_OPEN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 710;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 711;
                this.expression();
                this.state = 712;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 714;
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
        this.enterRule(localContext, 130, LPCParser.RULE_lambdaExpression);
        let _la: number;
        try {
            this.state = 758;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 80, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 718;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 21) {
                    {
                    this.state = 717;
                    this.match(LPCParser.HASH);
                    }
                }

                this.state = 720;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 721;
                this.match(LPCParser.Identifier);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 722;
                this.match(LPCParser.HASH);
                this.state = 723;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 756;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 79, this.context) ) {
                case 1:
                    {
                    this.state = 724;
                    this.expression();
                    }
                    break;
                case 2:
                    {
                    this.state = 725;
                    this.match(LPCParser.NOT);
                    }
                    break;
                case 3:
                    {
                    this.state = 726;
                    this.match(LPCParser.PLUS);
                    }
                    break;
                case 4:
                    {
                    this.state = 727;
                    this.match(LPCParser.MINUS);
                    }
                    break;
                case 5:
                    {
                    this.state = 728;
                    this.match(LPCParser.STAR);
                    }
                    break;
                case 6:
                    {
                    this.state = 729;
                    this.match(LPCParser.DIV);
                    }
                    break;
                case 7:
                    {
                    this.state = 730;
                    this.match(LPCParser.MOD);
                    }
                    break;
                case 8:
                    {
                    this.state = 731;
                    this.match(LPCParser.LT);
                    }
                    break;
                case 9:
                    {
                    this.state = 732;
                    this.match(LPCParser.GT);
                    }
                    break;
                case 10:
                    {
                    this.state = 733;
                    this.match(LPCParser.LE);
                    }
                    break;
                case 11:
                    {
                    this.state = 734;
                    this.match(LPCParser.GE);
                    }
                    break;
                case 12:
                    {
                    this.state = 735;
                    this.match(LPCParser.EQ);
                    }
                    break;
                case 13:
                    {
                    this.state = 736;
                    this.match(LPCParser.NE);
                    }
                    break;
                case 14:
                    {
                    this.state = 737;
                    this.match(LPCParser.AND);
                    }
                    break;
                case 15:
                    {
                    this.state = 738;
                    this.match(LPCParser.OR);
                    }
                    break;
                case 16:
                    {
                    this.state = 739;
                    this.match(LPCParser.XOR);
                    }
                    break;
                case 17:
                    {
                    this.state = 740;
                    this.match(LPCParser.AND_AND);
                    }
                    break;
                case 18:
                    {
                    this.state = 741;
                    this.match(LPCParser.OR_OR);
                    }
                    break;
                case 19:
                    {
                    this.state = 742;
                    this.match(LPCParser.ADD_ASSIGN);
                    }
                    break;
                case 20:
                    {
                    this.state = 743;
                    this.match(LPCParser.SUB_ASSIGN);
                    }
                    break;
                case 21:
                    {
                    this.state = 744;
                    this.match(LPCParser.MUL_ASSIGN);
                    }
                    break;
                case 22:
                    {
                    this.state = 745;
                    this.match(LPCParser.DIV_ASSIGN);
                    }
                    break;
                case 23:
                    {
                    this.state = 746;
                    this.match(LPCParser.MOD_ASSIGN);
                    }
                    break;
                case 24:
                    {
                    this.state = 747;
                    this.match(LPCParser.AND_ASSIGN);
                    }
                    break;
                case 25:
                    {
                    this.state = 748;
                    this.match(LPCParser.OR_ASSIGN);
                    }
                    break;
                case 26:
                    {
                    this.state = 749;
                    this.match(LPCParser.BITAND_ASSIGN);
                    }
                    break;
                case 27:
                    {
                    this.state = 750;
                    this.match(LPCParser.BITOR_ASSIGN);
                    }
                    break;
                case 28:
                    {
                    this.state = 751;
                    this.match(LPCParser.XOR_ASSIGN);
                    }
                    break;
                case 29:
                    {
                    this.state = 752;
                    this.match(LPCParser.QUESTION);
                    }
                    break;
                case 30:
                    {
                    this.state = 753;
                    this.match(LPCParser.SHL);
                    }
                    break;
                case 31:
                    {
                    this.state = 754;
                    this.match(LPCParser.SHR);
                    }
                    break;
                case 32:
                    {
                    this.state = 755;
                    this.match(LPCParser.SQUARE_OPEN);
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
    public rightShiftAssignment(): RightShiftAssignmentContext {
        let localContext = new RightShiftAssignmentContext(this.context, this.state);
        this.enterRule(localContext, 132, LPCParser.RULE_rightShiftAssignment);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 760;
            localContext._first = this.match(LPCParser.GT);
            this.state = 761;
            localContext._second = this.match(LPCParser.GE);
            this.state = 762;
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
        this.enterRule(localContext, 134, LPCParser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 764;
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
        this.enterRule(localContext, 136, LPCParser.RULE_castExpression);
        let _la: number;
        try {
            this.state = 792;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 82, this.context) ) {
            case 1:
                localContext = new PrimitiveTypeCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 766;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 767;
                this.typeSpecifier();
                this.state = 768;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 769;
                this.expression();
                }
                break;
            case 2:
                localContext = new DeclarativeTypeCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 771;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 772;
                this.match(LPCParser.CURLY_OPEN);
                this.state = 773;
                this.typeSpecifier();
                this.state = 774;
                this.match(LPCParser.CURLY_CLOSE);
                this.state = 775;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 776;
                this.expression();
                }
                break;
            case 3:
                localContext = new StructCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 778;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 779;
                this.match(LPCParser.LT);
                this.state = 780;
                this.match(LPCParser.Identifier);
                this.state = 781;
                this.match(LPCParser.GT);
                this.state = 782;
                this.expression();
                this.state = 787;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 81) {
                    {
                    {
                    this.state = 783;
                    this.match(LPCParser.COMMA);
                    this.state = 784;
                    this.expression();
                    }
                    }
                    this.state = 789;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 790;
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
        this.enterRule(localContext, 138, LPCParser.RULE_assignmentOperator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 794;
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
        let _startState = 140;
        this.enterRecursionRule(localContext, 140, LPCParser.RULE_conditionalExpressionBase, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            localContext = new TempUnaryExpressionContext(localContext);
            this.context = localContext;
            previousContext = localContext;

            this.state = 797;
            this.unaryExpression();
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 877;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 94, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 875;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 93, this.context) ) {
                    case 1:
                        {
                        localContext = new ConditionalExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 799;
                        if (!(this.precpred(this.context, 11))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 11)");
                        }
                        {
                        this.state = 800;
                        this.match(LPCParser.QUESTION);
                        this.state = 801;
                        this.expression();
                        this.state = 802;
                        this.match(LPCParser.COLON);
                        this.state = 803;
                        this.expression();
                        }
                        }
                        break;
                    case 2:
                        {
                        localContext = new ConditionalOrExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 805;
                        if (!(this.precpred(this.context, 10))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 10)");
                        }
                        this.state = 808;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 806;
                                (localContext as ConditionalOrExpressionContext)._op = this.match(LPCParser.OR_OR);
                                this.state = 807;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 810;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 83, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 3:
                        {
                        localContext = new ConditionalAndExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 812;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 815;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 813;
                                (localContext as ConditionalAndExpressionContext)._op = this.match(LPCParser.AND_AND);
                                this.state = 814;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 817;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 84, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 4:
                        {
                        localContext = new InclusiveOrExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 819;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 822;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 820;
                                (localContext as InclusiveOrExpressionContext)._op = this.match(LPCParser.OR);
                                this.state = 821;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 824;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 85, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 5:
                        {
                        localContext = new ExclusiveOrExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 826;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 829;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 827;
                                (localContext as ExclusiveOrExpressionContext)._op = this.match(LPCParser.XOR);
                                this.state = 828;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 831;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 86, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 6:
                        {
                        localContext = new AndExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 833;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 836;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 834;
                                (localContext as AndExpressionContext)._op = this.match(LPCParser.AND);
                                this.state = 835;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 838;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 87, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 7:
                        {
                        localContext = new EqualityExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 840;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 843;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 841;
                                (localContext as EqualityExpressionContext)._op = this.tokenStream.LT(1);
                                _la = this.tokenStream.LA(1);
                                if(!(_la === 69 || _la === 70)) {
                                    (localContext as EqualityExpressionContext)._op = this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 842;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 845;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 88, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 8:
                        {
                        localContext = new RelationalExpresionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 847;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 850;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 848;
                                (localContext as RelationalExpresionContext)._op = this.tokenStream.LT(1);
                                _la = this.tokenStream.LA(1);
                                if(!(((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 15) !== 0))) {
                                    (localContext as RelationalExpresionContext)._op = this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 849;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 852;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 89, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 9:
                        {
                        localContext = new ShiftExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 854;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 857;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 855;
                                (localContext as ShiftExpressionContext)._op = this.tokenStream.LT(1);
                                _la = this.tokenStream.LA(1);
                                if(!(_la === 63 || _la === 64)) {
                                    (localContext as ShiftExpressionContext)._op = this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 856;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 859;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 90, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 10:
                        {
                        localContext = new AdditiveExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 861;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 864;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 862;
                                (localContext as AdditiveExpressionContext)._op = this.tokenStream.LT(1);
                                _la = this.tokenStream.LA(1);
                                if(!(_la === 56 || _la === 57)) {
                                    (localContext as AdditiveExpressionContext)._op = this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 863;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 866;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 91, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 11:
                        {
                        localContext = new MultiplicativeExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 868;
                        if (!(this.precpred(this.context, 1))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                        }
                        this.state = 871;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 869;
                                (localContext as MultiplicativeExpressionContext)._op = this.tokenStream.LT(1);
                                _la = this.tokenStream.LA(1);
                                if(!(((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 7) !== 0))) {
                                    (localContext as MultiplicativeExpressionContext)._op = this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 870;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 873;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 92, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    }
                    }
                }
                this.state = 879;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 94, this.context);
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
        this.enterRule(localContext, 142, LPCParser.RULE_unaryExpression);
        let _la: number;
        try {
            this.state = 884;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 95, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 880;
                this.castExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 881;
                this.primaryExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 882;
                _la = this.tokenStream.LA(1);
                if(!(((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 819303) !== 0))) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 883;
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
        this.enterRule(localContext, 144, LPCParser.RULE_primaryExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 886;
            localContext._pe = this.primaryExpressionStart();
            this.state = 890;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 96, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 887;
                    this.bracketExpression();
                    }
                    }
                }
                this.state = 892;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 96, this.context);
            }
            this.state = 914;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 101, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 904;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case LPCParser.PAREN_OPEN:
                        {
                        this.state = 893;
                        this.methodInvocation();
                        }
                        break;
                    case LPCParser.INC:
                        {
                        this.state = 894;
                        this.match(LPCParser.INC);
                        }
                        break;
                    case LPCParser.DEC:
                        {
                        this.state = 895;
                        this.match(LPCParser.DEC);
                        }
                        break;
                    case LPCParser.ARROW:
                        {
                        {
                        this.state = 896;
                        this.match(LPCParser.ARROW);
                        this.state = 898;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 97, this.context) ) {
                        case 1:
                            {
                            this.state = 897;
                            localContext._target = this.callOtherTarget();
                            }
                            break;
                        }
                        this.state = 901;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 98, this.context) ) {
                        case 1:
                            {
                            this.state = 900;
                            localContext._invocation = this.methodInvocation();
                            }
                            break;
                        }
                        }
                        }
                        break;
                    case LPCParser.Identifier:
                        {
                        this.state = 903;
                        this.match(LPCParser.Identifier);
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    this.state = 909;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 100, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 906;
                            this.bracketExpression();
                            }
                            }
                        }
                        this.state = 911;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 100, this.context);
                    }
                    }
                    }
                }
                this.state = 916;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 101, this.context);
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
        this.enterRule(localContext, 146, LPCParser.RULE_primaryExpressionStart);
        let _la: number;
        try {
            let alternative: number;
            this.state = 939;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 103, this.context) ) {
            case 1:
                localContext = new LiteralExpressionContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 917;
                this.literal();
                }
                break;
            case 2:
                localContext = new CloneObjectExpressionContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 918;
                _la = this.tokenStream.LA(1);
                if(!(_la === 112 || _la === 113)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 919;
                this.match(LPCParser.PAREN_OPEN);
                {
                this.state = 920;
                (localContext as CloneObjectExpressionContext)._ob = this.expression();
                }
                this.state = 921;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 3:
                localContext = new IdentifierExpressionContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 923;
                this.match(LPCParser.Identifier);
                }
                break;
            case 4:
                localContext = new ParenExpressionContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 924;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 925;
                this.expression();
                this.state = 926;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 5:
                localContext = new PrimaryArrayExpressionContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 928;
                this.arrayExpression();
                }
                break;
            case 6:
                localContext = new PrimaryMappingExpressionContext(localContext);
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 929;
                this.mappingExpression();
                }
                break;
            case 7:
                localContext = new StringConcatExpressionContext(localContext);
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 930;
                this.match(LPCParser.StringLiteral);
                this.state = 934;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 102, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 931;
                        this.match(LPCParser.StringLiteral);
                        }
                        }
                    }
                    this.state = 936;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 102, this.context);
                }
                }
                break;
            case 8:
                localContext = new CatchExpressionContext(localContext);
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 937;
                this.catchExpr();
                }
                break;
            case 9:
                localContext = new InheritExpressionContext(localContext);
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 938;
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
        this.enterRule(localContext, 148, LPCParser.RULE_expression);
        try {
            this.state = 943;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 104, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 941;
                this.assignmentExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 942;
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
        this.enterRule(localContext, 150, LPCParser.RULE_catchExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 945;
            this.match(LPCParser.CATCH);
            this.state = 946;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 947;
            this.expression();
            this.state = 952;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 81) {
                {
                {
                this.state = 948;
                this.match(LPCParser.COMMA);
                this.state = 949;
                this.expression();
                }
                }
                this.state = 954;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 959;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 80) {
                {
                {
                this.state = 955;
                this.match(LPCParser.SEMI);
                this.state = 956;
                this.match(LPCParser.Identifier);
                }
                }
                this.state = 961;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 962;
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
        this.enterRule(localContext, 152, LPCParser.RULE_bracketExpression);
        let _la: number;
        try {
            this.state = 998;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 114, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 964;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 966;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 65) {
                    {
                    this.state = 965;
                    this.match(LPCParser.LT);
                    }
                }

                this.state = 968;
                this.expression();
                this.state = 969;
                this.match(LPCParser.SQUARE_CLOSE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 971;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 973;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 65) {
                    {
                    this.state = 972;
                    this.match(LPCParser.LT);
                    }
                }

                this.state = 976;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 555286735) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 126469) !== 0)) {
                    {
                    this.state = 975;
                    this.expression();
                    }
                }

                this.state = 978;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 980;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 65) {
                    {
                    this.state = 979;
                    this.match(LPCParser.LT);
                    }
                }

                this.state = 983;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 555286735) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 126469) !== 0)) {
                    {
                    this.state = 982;
                    this.expression();
                    }
                }

                this.state = 985;
                this.match(LPCParser.SQUARE_CLOSE);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 986;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 988;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 555286735) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 126469) !== 0)) {
                    {
                    this.state = 987;
                    this.expression();
                    }
                }

                this.state = 994;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 81) {
                    {
                    {
                    this.state = 990;
                    this.match(LPCParser.COMMA);
                    this.state = 991;
                    this.expression();
                    }
                    }
                    this.state = 996;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 997;
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
        this.enterRule(localContext, 154, LPCParser.RULE_argument);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1001;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 115, this.context) ) {
            case 1:
                {
                this.state = 1000;
                this.match(LPCParser.AND);
                }
                break;
            }
            this.state = 1003;
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
        this.enterRule(localContext, 156, LPCParser.RULE_argumentList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1005;
            this.argument();
            this.state = 1012;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 81) {
                {
                {
                this.state = 1006;
                this.match(LPCParser.COMMA);
                this.state = 1008;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 555286735) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 126469) !== 0)) {
                    {
                    this.state = 1007;
                    this.argument();
                    }
                }

                }
                }
                this.state = 1014;
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
        this.enterRule(localContext, 158, LPCParser.RULE_expressionList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1015;
            this.expression();
            this.state = 1020;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 81) {
                {
                {
                this.state = 1016;
                this.match(LPCParser.COMMA);
                this.state = 1017;
                this.expression();
                }
                }
                this.state = 1022;
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
        this.enterRule(localContext, 160, LPCParser.RULE_assignmentExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1023;
            this.conditionalExpressionBase(0);
            this.state = 1024;
            this.assignmentOperator();
            this.state = 1025;
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
        this.enterRule(localContext, 162, LPCParser.RULE_nonAssignmentExpression);
        try {
            this.state = 1031;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 119, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1027;
                this.inheritSuperExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1028;
                this.inlineClosureExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1029;
                this.lambdaExpression();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1030;
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
        case 66:
            return this.rightShiftAssignment_sempred(localContext as RightShiftAssignmentContext, predIndex);
        case 70:
            return this.conditionalExpressionBase_sempred(localContext as ConditionalExpressionBaseContext, predIndex);
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
    private rightShiftAssignment_sempred(localContext: RightShiftAssignmentContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 1:
            return (localContext._first?.tokenIndex ?? 0) + 1 == (localContext._second?.tokenIndex ?? 0);
        }
        return true;
    }
    private conditionalExpressionBase_sempred(localContext: ConditionalExpressionBaseContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 2:
            return this.precpred(this.context, 11);
        case 3:
            return this.precpred(this.context, 10);
        case 4:
            return this.precpred(this.context, 9);
        case 5:
            return this.precpred(this.context, 8);
        case 6:
            return this.precpred(this.context, 7);
        case 7:
            return this.precpred(this.context, 6);
        case 8:
            return this.precpred(this.context, 5);
        case 9:
            return this.precpred(this.context, 4);
        case 10:
            return this.precpred(this.context, 3);
        case 11:
            return this.precpred(this.context, 2);
        case 12:
            return this.precpred(this.context, 1);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,121,1034,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
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
        78,2,79,7,79,2,80,7,80,2,81,7,81,1,0,1,0,1,0,5,0,168,8,0,10,0,12,
        0,171,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,
        1,186,8,1,10,1,12,1,189,9,1,3,1,191,8,1,1,2,1,2,1,2,1,2,1,3,1,3,
        1,3,1,4,1,4,1,4,3,4,203,8,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,212,
        8,4,1,5,1,5,1,6,1,6,1,7,1,7,3,7,220,8,7,1,7,1,7,1,7,1,7,1,7,4,7,
        227,8,7,11,7,12,7,228,5,7,231,8,7,10,7,12,7,234,9,7,1,8,1,8,1,8,
        1,8,3,8,240,8,8,1,8,1,8,1,8,3,8,245,8,8,1,9,1,9,1,10,1,10,1,11,1,
        11,1,11,1,11,5,11,255,8,11,10,11,12,11,258,9,11,1,11,1,11,1,12,1,
        12,1,13,1,13,1,14,1,14,1,14,3,14,269,8,14,1,15,1,15,1,15,3,15,274,
        8,15,1,16,1,16,1,16,1,16,1,17,1,17,1,18,1,18,1,19,1,19,1,19,1,19,
        1,20,1,20,1,20,1,21,1,21,1,21,3,21,294,8,21,1,21,1,21,1,21,3,21,
        299,8,21,1,22,1,22,1,22,1,22,3,22,305,8,22,1,23,1,23,1,24,5,24,310,
        8,24,10,24,12,24,313,9,24,1,24,3,24,316,8,24,1,24,1,24,1,24,3,24,
        321,8,24,1,24,1,24,1,25,1,25,1,25,1,26,1,26,1,26,1,27,1,27,1,27,
        5,27,334,8,27,10,27,12,27,337,9,27,1,28,3,28,340,8,28,1,28,3,28,
        343,8,28,1,28,1,28,1,28,1,28,3,28,349,8,28,1,29,1,29,1,29,1,29,5,
        29,355,8,29,10,29,12,29,358,9,29,1,29,1,29,1,29,1,30,1,30,1,30,1,
        30,1,31,1,31,1,31,1,31,1,31,5,31,372,8,31,10,31,12,31,375,9,31,3,
        31,377,8,31,1,31,3,31,380,8,31,1,31,1,31,1,31,1,32,1,32,1,32,1,32,
        1,32,5,32,390,8,32,10,32,12,32,393,9,32,3,32,395,8,32,1,33,1,33,
        1,33,1,33,5,33,401,8,33,10,33,12,33,404,9,33,3,33,406,8,33,1,33,
        3,33,409,8,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,3,33,419,8,
        33,1,34,1,34,1,35,5,35,424,8,35,10,35,12,35,427,9,35,1,35,3,35,430,
        8,35,1,35,3,35,433,8,35,1,35,1,35,1,35,5,35,438,8,35,10,35,12,35,
        441,9,35,1,35,1,35,1,35,5,35,446,8,35,10,35,12,35,449,9,35,1,35,
        1,35,1,35,1,35,1,35,1,35,5,35,457,8,35,10,35,12,35,460,9,35,1,35,
        1,35,3,35,464,8,35,1,36,1,36,1,36,3,36,469,8,36,1,37,3,37,472,8,
        37,1,37,1,37,1,38,1,38,1,38,3,38,479,8,38,1,39,1,39,1,40,1,40,3,
        40,485,8,40,1,40,1,40,1,41,3,41,490,8,41,1,41,1,41,1,42,1,42,3,42,
        496,8,42,1,43,1,43,1,43,1,43,5,43,502,8,43,10,43,12,43,505,9,43,
        3,43,507,8,43,1,43,1,43,1,43,1,44,1,44,1,44,1,44,1,44,1,44,1,44,
        1,44,3,44,520,8,44,1,45,1,45,1,45,1,46,1,46,5,46,527,8,46,10,46,
        12,46,530,9,46,1,46,1,46,1,47,1,47,3,47,536,8,47,1,48,1,48,1,48,
        1,48,1,48,1,48,1,48,1,49,1,49,1,49,1,50,1,50,1,50,1,50,1,50,1,50,
        3,50,554,8,50,1,51,1,51,5,51,558,8,51,10,51,12,51,561,9,51,1,51,
        3,51,564,8,51,1,52,1,52,1,52,1,52,1,52,1,52,1,52,5,52,573,8,52,10,
        52,12,52,576,9,52,1,52,1,52,1,53,1,53,1,53,3,53,583,8,53,1,54,1,
        54,3,54,587,8,54,1,54,1,54,1,54,3,54,592,8,54,1,55,1,55,1,55,1,55,
        5,55,598,8,55,10,55,12,55,601,9,55,1,56,1,56,1,56,5,56,606,8,56,
        10,56,12,56,609,9,56,1,57,1,57,1,57,1,57,1,57,1,57,3,57,617,8,57,
        1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,
        1,57,3,57,633,8,57,1,57,1,57,1,57,1,57,1,57,1,57,3,57,641,8,57,3,
        57,643,8,57,1,58,1,58,1,58,5,58,648,8,58,10,58,12,58,651,9,58,1,
        58,1,58,3,58,655,8,58,1,58,1,58,3,58,659,8,58,1,58,1,58,5,58,663,
        8,58,10,58,12,58,666,9,58,1,59,1,59,1,59,5,59,671,8,59,10,59,12,
        59,674,9,59,1,59,1,59,1,59,1,60,3,60,680,8,60,1,60,3,60,683,8,60,
        1,60,1,60,1,60,1,60,1,60,3,60,690,8,60,1,61,3,61,693,8,61,1,61,1,
        61,1,62,1,62,3,62,699,8,62,1,62,1,62,1,63,1,63,1,63,1,63,1,63,3,
        63,708,8,63,1,64,1,64,1,64,1,64,1,64,1,64,3,64,716,8,64,1,65,3,65,
        719,8,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,
        1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,
        1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,3,65,
        757,8,65,3,65,759,8,65,1,66,1,66,1,66,1,66,1,67,1,67,1,68,1,68,1,
        68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,68,1,
        68,1,68,1,68,1,68,5,68,786,8,68,10,68,12,68,789,9,68,1,68,1,68,3,
        68,793,8,68,1,69,1,69,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,
        70,1,70,1,70,1,70,4,70,809,8,70,11,70,12,70,810,1,70,1,70,1,70,4,
        70,816,8,70,11,70,12,70,817,1,70,1,70,1,70,4,70,823,8,70,11,70,12,
        70,824,1,70,1,70,1,70,4,70,830,8,70,11,70,12,70,831,1,70,1,70,1,
        70,4,70,837,8,70,11,70,12,70,838,1,70,1,70,1,70,4,70,844,8,70,11,
        70,12,70,845,1,70,1,70,1,70,4,70,851,8,70,11,70,12,70,852,1,70,1,
        70,1,70,4,70,858,8,70,11,70,12,70,859,1,70,1,70,1,70,4,70,865,8,
        70,11,70,12,70,866,1,70,1,70,1,70,4,70,872,8,70,11,70,12,70,873,
        5,70,876,8,70,10,70,12,70,879,9,70,1,71,1,71,1,71,1,71,3,71,885,
        8,71,1,72,1,72,5,72,889,8,72,10,72,12,72,892,9,72,1,72,1,72,1,72,
        1,72,1,72,3,72,899,8,72,1,72,3,72,902,8,72,1,72,3,72,905,8,72,1,
        72,5,72,908,8,72,10,72,12,72,911,9,72,5,72,913,8,72,10,72,12,72,
        916,9,72,1,73,1,73,1,73,1,73,1,73,1,73,1,73,1,73,1,73,1,73,1,73,
        1,73,1,73,1,73,1,73,5,73,933,8,73,10,73,12,73,936,9,73,1,73,1,73,
        3,73,940,8,73,1,74,1,74,3,74,944,8,74,1,75,1,75,1,75,1,75,1,75,5,
        75,951,8,75,10,75,12,75,954,9,75,1,75,1,75,5,75,958,8,75,10,75,12,
        75,961,9,75,1,75,1,75,1,76,1,76,3,76,967,8,76,1,76,1,76,1,76,1,76,
        1,76,3,76,974,8,76,1,76,3,76,977,8,76,1,76,1,76,3,76,981,8,76,1,
        76,3,76,984,8,76,1,76,1,76,1,76,3,76,989,8,76,1,76,1,76,5,76,993,
        8,76,10,76,12,76,996,9,76,1,76,3,76,999,8,76,1,77,3,77,1002,8,77,
        1,77,1,77,1,78,1,78,1,78,3,78,1009,8,78,5,78,1011,8,78,10,78,12,
        78,1014,9,78,1,79,1,79,1,79,5,79,1019,8,79,10,79,12,79,1022,9,79,
        1,80,1,80,1,80,1,80,1,81,1,81,1,81,1,81,3,81,1032,8,81,1,81,0,2,
        14,140,82,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,
        40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,
        84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,
        120,122,124,126,128,130,132,134,136,138,140,142,144,146,148,150,
        152,154,156,158,160,162,0,20,2,0,13,13,22,22,2,0,12,12,14,14,1,0,
        23,24,2,0,65,70,76,77,3,0,1,1,106,106,110,110,3,0,11,11,29,29,43,
        43,2,0,1,1,110,110,2,0,47,51,53,54,1,0,47,52,8,0,5,6,17,17,28,28,
        30,32,35,35,37,38,42,42,44,44,2,0,25,25,79,79,2,0,106,108,110,111,
        1,0,85,96,1,0,69,70,1,0,65,68,1,0,63,64,1,0,56,57,1,0,58,60,4,0,
        56,58,61,62,71,71,74,75,1,0,112,113,1149,0,169,1,0,0,0,2,190,1,0,
        0,0,4,192,1,0,0,0,6,196,1,0,0,0,8,211,1,0,0,0,10,213,1,0,0,0,12,
        215,1,0,0,0,14,217,1,0,0,0,16,244,1,0,0,0,18,246,1,0,0,0,20,248,
        1,0,0,0,22,250,1,0,0,0,24,261,1,0,0,0,26,263,1,0,0,0,28,268,1,0,
        0,0,30,270,1,0,0,0,32,275,1,0,0,0,34,279,1,0,0,0,36,281,1,0,0,0,
        38,283,1,0,0,0,40,287,1,0,0,0,42,298,1,0,0,0,44,304,1,0,0,0,46,306,
        1,0,0,0,48,311,1,0,0,0,50,324,1,0,0,0,52,327,1,0,0,0,54,330,1,0,
        0,0,56,348,1,0,0,0,58,350,1,0,0,0,60,362,1,0,0,0,62,366,1,0,0,0,
        64,384,1,0,0,0,66,418,1,0,0,0,68,420,1,0,0,0,70,463,1,0,0,0,72,465,
        1,0,0,0,74,471,1,0,0,0,76,478,1,0,0,0,78,480,1,0,0,0,80,482,1,0,
        0,0,82,489,1,0,0,0,84,495,1,0,0,0,86,497,1,0,0,0,88,519,1,0,0,0,
        90,521,1,0,0,0,92,524,1,0,0,0,94,535,1,0,0,0,96,537,1,0,0,0,98,544,
        1,0,0,0,100,547,1,0,0,0,102,555,1,0,0,0,104,565,1,0,0,0,106,579,
        1,0,0,0,108,591,1,0,0,0,110,593,1,0,0,0,112,602,1,0,0,0,114,642,
        1,0,0,0,116,644,1,0,0,0,118,667,1,0,0,0,120,679,1,0,0,0,122,692,
        1,0,0,0,124,696,1,0,0,0,126,707,1,0,0,0,128,715,1,0,0,0,130,758,
        1,0,0,0,132,760,1,0,0,0,134,764,1,0,0,0,136,792,1,0,0,0,138,794,
        1,0,0,0,140,796,1,0,0,0,142,884,1,0,0,0,144,886,1,0,0,0,146,939,
        1,0,0,0,148,943,1,0,0,0,150,945,1,0,0,0,152,998,1,0,0,0,154,1001,
        1,0,0,0,156,1005,1,0,0,0,158,1015,1,0,0,0,160,1023,1,0,0,0,162,1031,
        1,0,0,0,164,168,3,44,22,0,165,168,3,2,1,0,166,168,3,38,19,0,167,
        164,1,0,0,0,167,165,1,0,0,0,167,166,1,0,0,0,168,171,1,0,0,0,169,
        167,1,0,0,0,169,170,1,0,0,0,170,172,1,0,0,0,171,169,1,0,0,0,172,
        173,5,0,0,1,173,1,1,0,0,0,174,191,3,8,4,0,175,176,3,18,9,0,176,177,
        3,20,10,0,177,191,1,0,0,0,178,191,3,6,3,0,179,191,3,4,2,0,180,181,
        5,21,0,0,181,182,3,36,18,0,182,187,5,1,0,0,183,184,5,81,0,0,184,
        186,5,1,0,0,185,183,1,0,0,0,186,189,1,0,0,0,187,185,1,0,0,0,187,
        188,1,0,0,0,188,191,1,0,0,0,189,187,1,0,0,0,190,174,1,0,0,0,190,
        175,1,0,0,0,190,178,1,0,0,0,190,179,1,0,0,0,190,180,1,0,0,0,191,
        3,1,0,0,0,192,193,5,21,0,0,193,194,3,26,13,0,194,195,3,28,14,0,195,
        5,1,0,0,0,196,197,5,117,0,0,197,198,5,119,0,0,198,7,1,0,0,0,199,
        200,5,21,0,0,200,202,3,12,6,0,201,203,5,74,0,0,202,201,1,0,0,0,202,
        203,1,0,0,0,203,204,1,0,0,0,204,205,3,20,10,0,205,212,1,0,0,0,206,
        207,5,21,0,0,207,208,7,0,0,0,208,212,3,14,7,0,209,210,5,21,0,0,210,
        212,3,10,5,0,211,199,1,0,0,0,211,206,1,0,0,0,211,209,1,0,0,0,212,
        9,1,0,0,0,213,214,7,1,0,0,214,11,1,0,0,0,215,216,7,2,0,0,216,13,
        1,0,0,0,217,219,6,7,-1,0,218,220,5,74,0,0,219,218,1,0,0,0,219,220,
        1,0,0,0,220,221,1,0,0,0,221,222,3,16,8,0,222,232,1,0,0,0,223,226,
        10,1,0,0,224,225,7,3,0,0,225,227,3,14,7,0,226,224,1,0,0,0,227,228,
        1,0,0,0,228,226,1,0,0,0,228,229,1,0,0,0,229,231,1,0,0,0,230,223,
        1,0,0,0,231,234,1,0,0,0,232,230,1,0,0,0,232,233,1,0,0,0,233,15,1,
        0,0,0,234,232,1,0,0,0,235,239,5,1,0,0,236,237,5,99,0,0,237,238,7,
        4,0,0,238,240,5,100,0,0,239,236,1,0,0,0,239,240,1,0,0,0,240,245,
        1,0,0,0,241,245,5,110,0,0,242,245,5,106,0,0,243,245,3,162,81,0,244,
        235,1,0,0,0,244,241,1,0,0,0,244,242,1,0,0,0,244,243,1,0,0,0,245,
        17,1,0,0,0,246,247,7,5,0,0,247,19,1,0,0,0,248,249,7,4,0,0,249,21,
        1,0,0,0,250,251,5,99,0,0,251,256,5,1,0,0,252,253,5,81,0,0,253,255,
        5,1,0,0,254,252,1,0,0,0,255,258,1,0,0,0,256,254,1,0,0,0,256,257,
        1,0,0,0,257,259,1,0,0,0,258,256,1,0,0,0,259,260,5,100,0,0,260,23,
        1,0,0,0,261,262,3,148,74,0,262,25,1,0,0,0,263,264,5,26,0,0,264,27,
        1,0,0,0,265,269,3,32,16,0,266,269,3,34,17,0,267,269,5,1,0,0,268,
        265,1,0,0,0,268,266,1,0,0,0,268,267,1,0,0,0,269,29,1,0,0,0,270,273,
        5,1,0,0,271,272,5,83,0,0,272,274,5,1,0,0,273,271,1,0,0,0,273,274,
        1,0,0,0,274,31,1,0,0,0,275,276,5,65,0,0,276,277,3,30,15,0,277,278,
        5,66,0,0,278,33,1,0,0,0,279,280,5,110,0,0,280,35,1,0,0,0,281,282,
        5,33,0,0,282,37,1,0,0,0,283,284,5,27,0,0,284,285,7,6,0,0,285,286,
        5,80,0,0,286,39,1,0,0,0,287,288,3,42,21,0,288,289,5,80,0,0,289,41,
        1,0,0,0,290,291,5,55,0,0,291,299,3,148,74,0,292,294,5,110,0,0,293,
        292,1,0,0,0,293,294,1,0,0,0,294,295,1,0,0,0,295,296,5,79,0,0,296,
        297,5,79,0,0,297,299,3,148,74,0,298,290,1,0,0,0,298,293,1,0,0,0,
        299,43,1,0,0,0,300,305,3,50,25,0,301,305,3,52,26,0,302,305,3,58,
        29,0,303,305,3,70,35,0,304,300,1,0,0,0,304,301,1,0,0,0,304,302,1,
        0,0,0,304,303,1,0,0,0,305,45,1,0,0,0,306,307,7,7,0,0,307,47,1,0,
        0,0,308,310,3,46,23,0,309,308,1,0,0,0,310,313,1,0,0,0,311,309,1,
        0,0,0,311,312,1,0,0,0,312,315,1,0,0,0,313,311,1,0,0,0,314,316,3,
        84,42,0,315,314,1,0,0,0,315,316,1,0,0,0,316,317,1,0,0,0,317,318,
        5,1,0,0,318,320,5,99,0,0,319,321,3,54,27,0,320,319,1,0,0,0,320,321,
        1,0,0,0,321,322,1,0,0,0,322,323,5,100,0,0,323,49,1,0,0,0,324,325,
        3,48,24,0,325,326,5,80,0,0,326,51,1,0,0,0,327,328,3,48,24,0,328,
        329,3,92,46,0,329,53,1,0,0,0,330,335,3,56,28,0,331,332,5,81,0,0,
        332,334,3,56,28,0,333,331,1,0,0,0,334,337,1,0,0,0,335,333,1,0,0,
        0,335,336,1,0,0,0,336,55,1,0,0,0,337,335,1,0,0,0,338,340,5,54,0,
        0,339,338,1,0,0,0,339,340,1,0,0,0,340,342,1,0,0,0,341,343,3,84,42,
        0,342,341,1,0,0,0,342,343,1,0,0,0,343,344,1,0,0,0,344,349,5,1,0,
        0,345,346,5,36,0,0,346,347,5,1,0,0,347,349,5,1,0,0,348,339,1,0,0,
        0,348,345,1,0,0,0,349,57,1,0,0,0,350,351,5,36,0,0,351,352,5,1,0,
        0,352,356,5,101,0,0,353,355,3,60,30,0,354,353,1,0,0,0,355,358,1,
        0,0,0,356,354,1,0,0,0,356,357,1,0,0,0,357,359,1,0,0,0,358,356,1,
        0,0,0,359,360,5,102,0,0,360,361,5,80,0,0,361,59,1,0,0,0,362,363,
        3,84,42,0,363,364,5,1,0,0,364,365,5,80,0,0,365,61,1,0,0,0,366,367,
        5,99,0,0,367,376,5,101,0,0,368,373,3,148,74,0,369,370,5,81,0,0,370,
        372,3,148,74,0,371,369,1,0,0,0,372,375,1,0,0,0,373,371,1,0,0,0,373,
        374,1,0,0,0,374,377,1,0,0,0,375,373,1,0,0,0,376,368,1,0,0,0,376,
        377,1,0,0,0,377,379,1,0,0,0,378,380,5,81,0,0,379,378,1,0,0,0,379,
        380,1,0,0,0,380,381,1,0,0,0,381,382,5,102,0,0,382,383,5,100,0,0,
        383,63,1,0,0,0,384,394,3,148,74,0,385,386,5,79,0,0,386,391,3,148,
        74,0,387,388,5,80,0,0,388,390,3,148,74,0,389,387,1,0,0,0,390,393,
        1,0,0,0,391,389,1,0,0,0,391,392,1,0,0,0,392,395,1,0,0,0,393,391,
        1,0,0,0,394,385,1,0,0,0,394,395,1,0,0,0,395,65,1,0,0,0,396,405,5,
        97,0,0,397,402,3,64,32,0,398,399,5,81,0,0,399,401,3,64,32,0,400,
        398,1,0,0,0,401,404,1,0,0,0,402,400,1,0,0,0,402,403,1,0,0,0,403,
        406,1,0,0,0,404,402,1,0,0,0,405,397,1,0,0,0,405,406,1,0,0,0,406,
        408,1,0,0,0,407,409,5,81,0,0,408,407,1,0,0,0,408,409,1,0,0,0,409,
        410,1,0,0,0,410,411,5,104,0,0,411,419,5,100,0,0,412,413,5,97,0,0,
        413,414,5,79,0,0,414,415,3,148,74,0,415,416,5,104,0,0,416,417,5,
        100,0,0,417,419,1,0,0,0,418,396,1,0,0,0,418,412,1,0,0,0,419,67,1,
        0,0,0,420,421,7,8,0,0,421,69,1,0,0,0,422,424,3,68,34,0,423,422,1,
        0,0,0,424,427,1,0,0,0,425,423,1,0,0,0,425,426,1,0,0,0,426,429,1,
        0,0,0,427,425,1,0,0,0,428,430,3,78,39,0,429,428,1,0,0,0,429,430,
        1,0,0,0,430,432,1,0,0,0,431,433,5,110,0,0,432,431,1,0,0,0,432,433,
        1,0,0,0,433,434,1,0,0,0,434,439,3,72,36,0,435,436,5,81,0,0,436,438,
        3,72,36,0,437,435,1,0,0,0,438,441,1,0,0,0,439,437,1,0,0,0,439,440,
        1,0,0,0,440,442,1,0,0,0,441,439,1,0,0,0,442,443,5,80,0,0,443,464,
        1,0,0,0,444,446,3,68,34,0,445,444,1,0,0,0,446,449,1,0,0,0,447,445,
        1,0,0,0,447,448,1,0,0,0,448,450,1,0,0,0,449,447,1,0,0,0,450,451,
        5,36,0,0,451,452,5,1,0,0,452,458,3,72,36,0,453,454,5,81,0,0,454,
        455,5,1,0,0,455,457,3,72,36,0,456,453,1,0,0,0,457,460,1,0,0,0,458,
        456,1,0,0,0,458,459,1,0,0,0,459,461,1,0,0,0,460,458,1,0,0,0,461,
        462,5,80,0,0,462,464,1,0,0,0,463,425,1,0,0,0,463,447,1,0,0,0,464,
        71,1,0,0,0,465,468,3,74,37,0,466,467,5,85,0,0,467,469,3,76,38,0,
        468,466,1,0,0,0,468,469,1,0,0,0,469,73,1,0,0,0,470,472,5,58,0,0,
        471,470,1,0,0,0,471,472,1,0,0,0,472,473,1,0,0,0,473,474,5,1,0,0,
        474,75,1,0,0,0,475,479,3,148,74,0,476,479,3,62,31,0,477,479,3,66,
        33,0,478,475,1,0,0,0,478,476,1,0,0,0,478,477,1,0,0,0,479,77,1,0,
        0,0,480,481,7,9,0,0,481,79,1,0,0,0,482,484,5,99,0,0,483,485,3,156,
        78,0,484,483,1,0,0,0,484,485,1,0,0,0,485,486,1,0,0,0,486,487,5,100,
        0,0,487,81,1,0,0,0,488,490,3,78,39,0,489,488,1,0,0,0,489,490,1,0,
        0,0,490,491,1,0,0,0,491,492,5,58,0,0,492,83,1,0,0,0,493,496,3,78,
        39,0,494,496,3,82,41,0,495,493,1,0,0,0,495,494,1,0,0,0,496,85,1,
        0,0,0,497,498,5,99,0,0,498,506,5,79,0,0,499,507,3,148,74,0,500,502,
        3,88,44,0,501,500,1,0,0,0,502,505,1,0,0,0,503,501,1,0,0,0,503,504,
        1,0,0,0,504,507,1,0,0,0,505,503,1,0,0,0,506,499,1,0,0,0,506,503,
        1,0,0,0,507,508,1,0,0,0,508,509,5,79,0,0,509,510,5,100,0,0,510,87,
        1,0,0,0,511,520,3,90,45,0,512,520,3,92,46,0,513,520,3,94,47,0,514,
        520,3,114,57,0,515,520,3,126,63,0,516,520,3,70,35,0,517,520,3,8,
        4,0,518,520,3,124,62,0,519,511,1,0,0,0,519,512,1,0,0,0,519,513,1,
        0,0,0,519,514,1,0,0,0,519,515,1,0,0,0,519,516,1,0,0,0,519,517,1,
        0,0,0,519,518,1,0,0,0,520,89,1,0,0,0,521,522,3,148,74,0,522,523,
        5,80,0,0,523,91,1,0,0,0,524,528,5,101,0,0,525,527,3,88,44,0,526,
        525,1,0,0,0,527,530,1,0,0,0,528,526,1,0,0,0,528,529,1,0,0,0,529,
        531,1,0,0,0,530,528,1,0,0,0,531,532,5,102,0,0,532,93,1,0,0,0,533,
        536,3,102,51,0,534,536,3,104,52,0,535,533,1,0,0,0,535,534,1,0,0,
        0,536,95,1,0,0,0,537,538,5,12,0,0,538,539,5,22,0,0,539,540,5,99,
        0,0,540,541,3,148,74,0,541,542,5,100,0,0,542,543,3,88,44,0,543,97,
        1,0,0,0,544,545,5,12,0,0,545,546,3,88,44,0,546,99,1,0,0,0,547,548,
        5,22,0,0,548,549,5,99,0,0,549,550,3,148,74,0,550,553,5,100,0,0,551,
        554,3,88,44,0,552,554,5,80,0,0,553,551,1,0,0,0,553,552,1,0,0,0,554,
        101,1,0,0,0,555,559,3,100,50,0,556,558,3,96,48,0,557,556,1,0,0,0,
        558,561,1,0,0,0,559,557,1,0,0,0,559,560,1,0,0,0,560,563,1,0,0,0,
        561,559,1,0,0,0,562,564,3,98,49,0,563,562,1,0,0,0,563,564,1,0,0,
        0,564,103,1,0,0,0,565,566,5,39,0,0,566,567,5,99,0,0,567,568,3,148,
        74,0,568,569,5,100,0,0,569,574,5,101,0,0,570,573,3,110,55,0,571,
        573,3,112,56,0,572,570,1,0,0,0,572,571,1,0,0,0,573,576,1,0,0,0,574,
        572,1,0,0,0,574,575,1,0,0,0,575,577,1,0,0,0,576,574,1,0,0,0,577,
        578,5,102,0,0,578,105,1,0,0,0,579,582,3,108,54,0,580,581,5,82,0,
        0,581,583,3,108,54,0,582,580,1,0,0,0,582,583,1,0,0,0,583,107,1,0,
        0,0,584,592,5,110,0,0,585,587,5,57,0,0,586,585,1,0,0,0,586,587,1,
        0,0,0,587,588,1,0,0,0,588,592,5,106,0,0,589,592,5,1,0,0,590,592,
        5,111,0,0,591,584,1,0,0,0,591,586,1,0,0,0,591,589,1,0,0,0,591,590,
        1,0,0,0,592,109,1,0,0,0,593,594,5,3,0,0,594,595,3,106,53,0,595,599,
        5,79,0,0,596,598,3,88,44,0,597,596,1,0,0,0,598,601,1,0,0,0,599,597,
        1,0,0,0,599,600,1,0,0,0,600,111,1,0,0,0,601,599,1,0,0,0,602,603,
        5,9,0,0,603,607,5,79,0,0,604,606,3,88,44,0,605,604,1,0,0,0,606,609,
        1,0,0,0,607,605,1,0,0,0,607,608,1,0,0,0,608,113,1,0,0,0,609,607,
        1,0,0,0,610,611,5,46,0,0,611,612,5,99,0,0,612,613,3,148,74,0,613,
        616,5,100,0,0,614,617,3,88,44,0,615,617,5,80,0,0,616,614,1,0,0,0,
        616,615,1,0,0,0,617,643,1,0,0,0,618,619,5,10,0,0,619,620,3,88,44,
        0,620,621,5,46,0,0,621,622,5,99,0,0,622,623,3,148,74,0,623,624,5,
        100,0,0,624,625,5,80,0,0,625,643,1,0,0,0,626,627,5,18,0,0,627,628,
        5,99,0,0,628,629,3,116,58,0,629,632,5,100,0,0,630,633,3,88,44,0,
        631,633,5,80,0,0,632,630,1,0,0,0,632,631,1,0,0,0,633,643,1,0,0,0,
        634,635,5,19,0,0,635,636,5,99,0,0,636,637,3,118,59,0,637,640,5,100,
        0,0,638,641,3,88,44,0,639,641,5,80,0,0,640,638,1,0,0,0,640,639,1,
        0,0,0,641,643,1,0,0,0,642,610,1,0,0,0,642,618,1,0,0,0,642,626,1,
        0,0,0,642,634,1,0,0,0,643,115,1,0,0,0,644,649,3,120,60,0,645,646,
        5,81,0,0,646,648,3,120,60,0,647,645,1,0,0,0,648,651,1,0,0,0,649,
        647,1,0,0,0,649,650,1,0,0,0,650,652,1,0,0,0,651,649,1,0,0,0,652,
        654,5,80,0,0,653,655,3,148,74,0,654,653,1,0,0,0,654,655,1,0,0,0,
        655,656,1,0,0,0,656,658,5,80,0,0,657,659,3,148,74,0,658,657,1,0,
        0,0,658,659,1,0,0,0,659,664,1,0,0,0,660,661,5,81,0,0,661,663,3,148,
        74,0,662,660,1,0,0,0,663,666,1,0,0,0,664,662,1,0,0,0,664,665,1,0,
        0,0,665,117,1,0,0,0,666,664,1,0,0,0,667,672,3,122,61,0,668,669,5,
        81,0,0,669,671,3,122,61,0,670,668,1,0,0,0,671,674,1,0,0,0,672,670,
        1,0,0,0,672,673,1,0,0,0,673,675,1,0,0,0,674,672,1,0,0,0,675,676,
        7,10,0,0,676,677,3,148,74,0,677,119,1,0,0,0,678,680,3,78,39,0,679,
        678,1,0,0,0,679,680,1,0,0,0,680,682,1,0,0,0,681,683,5,58,0,0,682,
        681,1,0,0,0,682,683,1,0,0,0,683,684,1,0,0,0,684,689,5,1,0,0,685,
        686,5,85,0,0,686,690,3,76,38,0,687,690,5,61,0,0,688,690,5,62,0,0,
        689,685,1,0,0,0,689,687,1,0,0,0,689,688,1,0,0,0,690,121,1,0,0,0,
        691,693,3,78,39,0,692,691,1,0,0,0,692,693,1,0,0,0,693,694,1,0,0,
        0,694,695,3,74,37,0,695,123,1,0,0,0,696,698,5,34,0,0,697,699,3,148,
        74,0,698,697,1,0,0,0,698,699,1,0,0,0,699,700,1,0,0,0,700,701,5,80,
        0,0,701,125,1,0,0,0,702,703,5,2,0,0,703,708,5,80,0,0,704,705,5,8,
        0,0,705,708,5,80,0,0,706,708,3,124,62,0,707,702,1,0,0,0,707,704,
        1,0,0,0,707,706,1,0,0,0,708,127,1,0,0,0,709,716,5,1,0,0,710,711,
        5,99,0,0,711,712,3,148,74,0,712,713,5,100,0,0,713,716,1,0,0,0,714,
        716,5,110,0,0,715,709,1,0,0,0,715,710,1,0,0,0,715,714,1,0,0,0,716,
        129,1,0,0,0,717,719,5,21,0,0,718,717,1,0,0,0,718,719,1,0,0,0,719,
        720,1,0,0,0,720,721,5,84,0,0,721,759,5,1,0,0,722,723,5,21,0,0,723,
        756,5,84,0,0,724,757,3,148,74,0,725,757,5,74,0,0,726,757,5,56,0,
        0,727,757,5,57,0,0,728,757,5,58,0,0,729,757,5,59,0,0,730,757,5,60,
        0,0,731,757,5,65,0,0,732,757,5,66,0,0,733,757,5,67,0,0,734,757,5,
        68,0,0,735,757,5,69,0,0,736,757,5,70,0,0,737,757,5,71,0,0,738,757,
        5,72,0,0,739,757,5,73,0,0,740,757,5,76,0,0,741,757,5,77,0,0,742,
        757,5,86,0,0,743,757,5,87,0,0,744,757,5,88,0,0,745,757,5,89,0,0,
        746,757,5,90,0,0,747,757,5,92,0,0,748,757,5,91,0,0,749,757,5,93,
        0,0,750,757,5,94,0,0,751,757,5,95,0,0,752,757,5,78,0,0,753,757,5,
        63,0,0,754,757,5,64,0,0,755,757,5,103,0,0,756,724,1,0,0,0,756,725,
        1,0,0,0,756,726,1,0,0,0,756,727,1,0,0,0,756,728,1,0,0,0,756,729,
        1,0,0,0,756,730,1,0,0,0,756,731,1,0,0,0,756,732,1,0,0,0,756,733,
        1,0,0,0,756,734,1,0,0,0,756,735,1,0,0,0,756,736,1,0,0,0,756,737,
        1,0,0,0,756,738,1,0,0,0,756,739,1,0,0,0,756,740,1,0,0,0,756,741,
        1,0,0,0,756,742,1,0,0,0,756,743,1,0,0,0,756,744,1,0,0,0,756,745,
        1,0,0,0,756,746,1,0,0,0,756,747,1,0,0,0,756,748,1,0,0,0,756,749,
        1,0,0,0,756,750,1,0,0,0,756,751,1,0,0,0,756,752,1,0,0,0,756,753,
        1,0,0,0,756,754,1,0,0,0,756,755,1,0,0,0,757,759,1,0,0,0,758,718,
        1,0,0,0,758,722,1,0,0,0,759,131,1,0,0,0,760,761,5,66,0,0,761,762,
        5,68,0,0,762,763,4,66,1,1,763,133,1,0,0,0,764,765,7,11,0,0,765,135,
        1,0,0,0,766,767,5,99,0,0,767,768,3,84,42,0,768,769,5,100,0,0,769,
        770,3,148,74,0,770,793,1,0,0,0,771,772,5,99,0,0,772,773,5,101,0,
        0,773,774,3,84,42,0,774,775,5,102,0,0,775,776,5,100,0,0,776,777,
        3,148,74,0,777,793,1,0,0,0,778,779,5,99,0,0,779,780,5,65,0,0,780,
        781,5,1,0,0,781,782,5,66,0,0,782,787,3,148,74,0,783,784,5,81,0,0,
        784,786,3,148,74,0,785,783,1,0,0,0,786,789,1,0,0,0,787,785,1,0,0,
        0,787,788,1,0,0,0,788,790,1,0,0,0,789,787,1,0,0,0,790,791,5,100,
        0,0,791,793,1,0,0,0,792,766,1,0,0,0,792,771,1,0,0,0,792,778,1,0,
        0,0,793,137,1,0,0,0,794,795,7,12,0,0,795,139,1,0,0,0,796,797,6,70,
        -1,0,797,798,3,142,71,0,798,877,1,0,0,0,799,800,10,11,0,0,800,801,
        5,78,0,0,801,802,3,148,74,0,802,803,5,79,0,0,803,804,3,148,74,0,
        804,876,1,0,0,0,805,808,10,10,0,0,806,807,5,77,0,0,807,809,3,140,
        70,0,808,806,1,0,0,0,809,810,1,0,0,0,810,808,1,0,0,0,810,811,1,0,
        0,0,811,876,1,0,0,0,812,815,10,9,0,0,813,814,5,76,0,0,814,816,3,
        140,70,0,815,813,1,0,0,0,816,817,1,0,0,0,817,815,1,0,0,0,817,818,
        1,0,0,0,818,876,1,0,0,0,819,822,10,8,0,0,820,821,5,72,0,0,821,823,
        3,140,70,0,822,820,1,0,0,0,823,824,1,0,0,0,824,822,1,0,0,0,824,825,
        1,0,0,0,825,876,1,0,0,0,826,829,10,7,0,0,827,828,5,73,0,0,828,830,
        3,140,70,0,829,827,1,0,0,0,830,831,1,0,0,0,831,829,1,0,0,0,831,832,
        1,0,0,0,832,876,1,0,0,0,833,836,10,6,0,0,834,835,5,71,0,0,835,837,
        3,140,70,0,836,834,1,0,0,0,837,838,1,0,0,0,838,836,1,0,0,0,838,839,
        1,0,0,0,839,876,1,0,0,0,840,843,10,5,0,0,841,842,7,13,0,0,842,844,
        3,140,70,0,843,841,1,0,0,0,844,845,1,0,0,0,845,843,1,0,0,0,845,846,
        1,0,0,0,846,876,1,0,0,0,847,850,10,4,0,0,848,849,7,14,0,0,849,851,
        3,140,70,0,850,848,1,0,0,0,851,852,1,0,0,0,852,850,1,0,0,0,852,853,
        1,0,0,0,853,876,1,0,0,0,854,857,10,3,0,0,855,856,7,15,0,0,856,858,
        3,140,70,0,857,855,1,0,0,0,858,859,1,0,0,0,859,857,1,0,0,0,859,860,
        1,0,0,0,860,876,1,0,0,0,861,864,10,2,0,0,862,863,7,16,0,0,863,865,
        3,140,70,0,864,862,1,0,0,0,865,866,1,0,0,0,866,864,1,0,0,0,866,867,
        1,0,0,0,867,876,1,0,0,0,868,871,10,1,0,0,869,870,7,17,0,0,870,872,
        3,140,70,0,871,869,1,0,0,0,872,873,1,0,0,0,873,871,1,0,0,0,873,874,
        1,0,0,0,874,876,1,0,0,0,875,799,1,0,0,0,875,805,1,0,0,0,875,812,
        1,0,0,0,875,819,1,0,0,0,875,826,1,0,0,0,875,833,1,0,0,0,875,840,
        1,0,0,0,875,847,1,0,0,0,875,854,1,0,0,0,875,861,1,0,0,0,875,868,
        1,0,0,0,876,879,1,0,0,0,877,875,1,0,0,0,877,878,1,0,0,0,878,141,
        1,0,0,0,879,877,1,0,0,0,880,885,3,136,68,0,881,885,3,144,72,0,882,
        883,7,18,0,0,883,885,3,148,74,0,884,880,1,0,0,0,884,881,1,0,0,0,
        884,882,1,0,0,0,885,143,1,0,0,0,886,890,3,146,73,0,887,889,3,152,
        76,0,888,887,1,0,0,0,889,892,1,0,0,0,890,888,1,0,0,0,890,891,1,0,
        0,0,891,914,1,0,0,0,892,890,1,0,0,0,893,905,3,80,40,0,894,905,5,
        61,0,0,895,905,5,62,0,0,896,898,5,98,0,0,897,899,3,128,64,0,898,
        897,1,0,0,0,898,899,1,0,0,0,899,901,1,0,0,0,900,902,3,80,40,0,901,
        900,1,0,0,0,901,902,1,0,0,0,902,905,1,0,0,0,903,905,5,1,0,0,904,
        893,1,0,0,0,904,894,1,0,0,0,904,895,1,0,0,0,904,896,1,0,0,0,904,
        903,1,0,0,0,905,909,1,0,0,0,906,908,3,152,76,0,907,906,1,0,0,0,908,
        911,1,0,0,0,909,907,1,0,0,0,909,910,1,0,0,0,910,913,1,0,0,0,911,
        909,1,0,0,0,912,904,1,0,0,0,913,916,1,0,0,0,914,912,1,0,0,0,914,
        915,1,0,0,0,915,145,1,0,0,0,916,914,1,0,0,0,917,940,3,134,67,0,918,
        919,7,19,0,0,919,920,5,99,0,0,920,921,3,148,74,0,921,922,5,100,0,
        0,922,940,1,0,0,0,923,940,5,1,0,0,924,925,5,99,0,0,925,926,3,148,
        74,0,926,927,5,100,0,0,927,940,1,0,0,0,928,940,3,62,31,0,929,940,
        3,66,33,0,930,934,5,110,0,0,931,933,5,110,0,0,932,931,1,0,0,0,933,
        936,1,0,0,0,934,932,1,0,0,0,934,935,1,0,0,0,935,940,1,0,0,0,936,
        934,1,0,0,0,937,940,3,150,75,0,938,940,3,42,21,0,939,917,1,0,0,0,
        939,918,1,0,0,0,939,923,1,0,0,0,939,924,1,0,0,0,939,928,1,0,0,0,
        939,929,1,0,0,0,939,930,1,0,0,0,939,937,1,0,0,0,939,938,1,0,0,0,
        940,147,1,0,0,0,941,944,3,160,80,0,942,944,3,162,81,0,943,941,1,
        0,0,0,943,942,1,0,0,0,944,149,1,0,0,0,945,946,5,4,0,0,946,947,5,
        99,0,0,947,952,3,148,74,0,948,949,5,81,0,0,949,951,3,148,74,0,950,
        948,1,0,0,0,951,954,1,0,0,0,952,950,1,0,0,0,952,953,1,0,0,0,953,
        959,1,0,0,0,954,952,1,0,0,0,955,956,5,80,0,0,956,958,5,1,0,0,957,
        955,1,0,0,0,958,961,1,0,0,0,959,957,1,0,0,0,959,960,1,0,0,0,960,
        962,1,0,0,0,961,959,1,0,0,0,962,963,5,100,0,0,963,151,1,0,0,0,964,
        966,5,103,0,0,965,967,5,65,0,0,966,965,1,0,0,0,966,967,1,0,0,0,967,
        968,1,0,0,0,968,969,3,148,74,0,969,970,5,104,0,0,970,999,1,0,0,0,
        971,973,5,103,0,0,972,974,5,65,0,0,973,972,1,0,0,0,973,974,1,0,0,
        0,974,976,1,0,0,0,975,977,3,148,74,0,976,975,1,0,0,0,976,977,1,0,
        0,0,977,978,1,0,0,0,978,980,5,82,0,0,979,981,5,65,0,0,980,979,1,
        0,0,0,980,981,1,0,0,0,981,983,1,0,0,0,982,984,3,148,74,0,983,982,
        1,0,0,0,983,984,1,0,0,0,984,985,1,0,0,0,985,999,5,104,0,0,986,988,
        5,103,0,0,987,989,3,148,74,0,988,987,1,0,0,0,988,989,1,0,0,0,989,
        994,1,0,0,0,990,991,5,81,0,0,991,993,3,148,74,0,992,990,1,0,0,0,
        993,996,1,0,0,0,994,992,1,0,0,0,994,995,1,0,0,0,995,997,1,0,0,0,
        996,994,1,0,0,0,997,999,5,104,0,0,998,964,1,0,0,0,998,971,1,0,0,
        0,998,986,1,0,0,0,999,153,1,0,0,0,1000,1002,5,71,0,0,1001,1000,1,
        0,0,0,1001,1002,1,0,0,0,1002,1003,1,0,0,0,1003,1004,3,148,74,0,1004,
        155,1,0,0,0,1005,1012,3,154,77,0,1006,1008,5,81,0,0,1007,1009,3,
        154,77,0,1008,1007,1,0,0,0,1008,1009,1,0,0,0,1009,1011,1,0,0,0,1010,
        1006,1,0,0,0,1011,1014,1,0,0,0,1012,1010,1,0,0,0,1012,1013,1,0,0,
        0,1013,157,1,0,0,0,1014,1012,1,0,0,0,1015,1020,3,148,74,0,1016,1017,
        5,81,0,0,1017,1019,3,148,74,0,1018,1016,1,0,0,0,1019,1022,1,0,0,
        0,1020,1018,1,0,0,0,1020,1021,1,0,0,0,1021,159,1,0,0,0,1022,1020,
        1,0,0,0,1023,1024,3,140,70,0,1024,1025,3,138,69,0,1025,1026,3,148,
        74,0,1026,161,1,0,0,0,1027,1032,3,42,21,0,1028,1032,3,86,43,0,1029,
        1032,3,130,65,0,1030,1032,3,140,70,0,1031,1027,1,0,0,0,1031,1028,
        1,0,0,0,1031,1029,1,0,0,0,1031,1030,1,0,0,0,1032,163,1,0,0,0,120,
        167,169,187,190,202,211,219,228,232,239,244,256,268,273,293,298,
        304,311,315,320,335,339,342,348,356,373,376,379,391,394,402,405,
        408,418,425,429,432,439,447,458,463,468,471,478,484,489,495,503,
        506,519,528,535,553,559,563,572,574,582,586,591,599,607,616,632,
        640,642,649,654,658,664,672,679,682,689,692,698,707,715,718,756,
        758,787,792,810,817,824,831,838,845,852,859,866,873,875,877,884,
        890,898,901,904,909,914,934,939,943,952,959,966,973,976,980,983,
        988,994,998,1001,1008,1012,1020,1031
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
    public nonAssignmentExpression(): NonAssignmentExpressionContext | null {
        return this.getRuleContext(0, NonAssignmentExpressionContext);
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
    public directiveIncludeFileGlobal(): DirectiveIncludeFileGlobalContext | null {
        return this.getRuleContext(0, DirectiveIncludeFileGlobalContext);
    }
    public directiveIncludeFileLocal(): DirectiveIncludeFileLocalContext | null {
        return this.getRuleContext(0, DirectiveIncludeFileLocalContext);
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


export class InheritSuperStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public inheritSuperExpression(): InheritSuperExpressionContext {
        return this.getRuleContext(0, InheritSuperExpressionContext)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(LPCParser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_inheritSuperStatement;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterInheritSuperStatement) {
             listener.enterInheritSuperStatement(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitInheritSuperStatement) {
             listener.exitInheritSuperStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitInheritSuperStatement) {
            return visitor.visitInheritSuperStatement(this);
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
    public EFUNACCESSOR(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.EFUNACCESSOR, 0);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
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
    public StringLiteral(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.StringLiteral, 0);
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
    public statement(): StatementContext | null {
        return this.getRuleContext(0, StatementContext);
    }
    public SEMI(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SEMI, 0);
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
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
    }
    public CharacterConstant(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.CharacterConstant, 0);
    }
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.MINUS, 0);
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
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
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
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.NOT, 0);
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
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
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
    public inheritSuperExpression(): InheritSuperExpressionContext | null {
        return this.getRuleContext(0, InheritSuperExpressionContext);
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

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
    public static readonly AUTO = 2;
    public static readonly BREAK = 3;
    public static readonly CASE = 4;
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
    public static readonly REGISTER = 34;
    public static readonly RETURN = 35;
    public static readonly STATUS = 36;
    public static readonly STRUCT = 37;
    public static readonly STRING = 38;
    public static readonly SYMBOL = 39;
    public static readonly SWITCH = 40;
    public static readonly TYPEDEF = 41;
    public static readonly UNION = 42;
    public static readonly UNKNOWN = 43;
    public static readonly UNDEF = 44;
    public static readonly VOID = 45;
    public static readonly VOLATILE = 46;
    public static readonly WHILE = 47;
    public static readonly PRIVATE = 48;
    public static readonly PROTECTED = 49;
    public static readonly PUBLIC = 50;
    public static readonly STATIC = 51;
    public static readonly NOSHADOW = 52;
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
    public static readonly AND_AND = 74;
    public static readonly OR_OR = 75;
    public static readonly QUESTION = 76;
    public static readonly COLON = 77;
    public static readonly SEMI = 78;
    public static readonly COMMA = 79;
    public static readonly DOUBLEDOT = 80;
    public static readonly DOT = 81;
    public static readonly SINGLEQUOT = 82;
    public static readonly SUPER_ACCESSOR = 83;
    public static readonly ASSIGN = 84;
    public static readonly ADD_ASSIGN = 85;
    public static readonly SUB_ASSIGN = 86;
    public static readonly MUL_ASSIGN = 87;
    public static readonly DIV_ASSIGN = 88;
    public static readonly MOD_ASSIGN = 89;
    public static readonly AND_ASSIGN = 90;
    public static readonly OR_ASSIGN = 91;
    public static readonly XOR_ASSIGN = 92;
    public static readonly ARRAY_OPEN = 93;
    public static readonly ARRAY_CLOSE = 94;
    public static readonly MAPPING_OPEN = 95;
    public static readonly ARROW = 96;
    public static readonly PAREN_OPEN = 97;
    public static readonly PAREN_CLOSE = 98;
    public static readonly CURLY_OPEN = 99;
    public static readonly CURLY_CLOSE = 100;
    public static readonly SQUARE_OPEN = 101;
    public static readonly SQUARE_CLOSE = 102;
    public static readonly BACKSLASH = 103;
    public static readonly IntegerConstant = 104;
    public static readonly FloatingConstant = 105;
    public static readonly STRING_START = 106;
    public static readonly StringLiteral = 107;
    public static readonly CharacterConstant = 108;
    public static readonly COMMENT = 109;
    public static readonly LINE_COMMENT = 110;
    public static readonly DEFINE = 111;
    public static readonly WS = 112;
    public static readonly END_DEFINE = 113;
    public static readonly STRING_END = 114;
    public static readonly NEWLINE = 115;
    public static readonly RULE_program = 0;
    public static readonly RULE_preprocessorDirective = 1;
    public static readonly RULE_definePreprocessorDirective = 2;
    public static readonly RULE_selectionDirective = 3;
    public static readonly RULE_selectionDirectiveTypeSingle = 4;
    public static readonly RULE_selectionDirectiveTypeWithArg = 5;
    public static readonly RULE_directiveTypeWithArguments = 6;
    public static readonly RULE_directiveArgument = 7;
    public static readonly RULE_directiveDefineParam = 8;
    public static readonly RULE_directiveDefineArgument = 9;
    public static readonly RULE_directiveTypeInclude = 10;
    public static readonly RULE_directiveIncludeFile = 11;
    public static readonly RULE_directiveIncludeFilename = 12;
    public static readonly RULE_directiveIncludeFileGlobal = 13;
    public static readonly RULE_directiveIncludeFileLocal = 14;
    public static readonly RULE_directiveTypePragma = 15;
    public static readonly RULE_inheritStatement = 16;
    public static readonly RULE_inheritSuperExpression = 17;
    public static readonly RULE_declaration = 18;
    public static readonly RULE_functionModifier = 19;
    public static readonly RULE_functionHeader = 20;
    public static readonly RULE_functionHeaderDeclaration = 21;
    public static readonly RULE_functionDeclaration = 22;
    public static readonly RULE_parameterList = 23;
    public static readonly RULE_parameter = 24;
    public static readonly RULE_arrayExpression = 25;
    public static readonly RULE_mappingKey = 26;
    public static readonly RULE_mappingContent = 27;
    public static readonly RULE_mappingExpression = 28;
    public static readonly RULE_variableModifier = 29;
    public static readonly RULE_variableDeclaration = 30;
    public static readonly RULE_primitiveTypeSpecifier = 31;
    public static readonly RULE_arrayTypeSpecifier = 32;
    public static readonly RULE_typeSpecifier = 33;
    public static readonly RULE_inlineClosureExpression = 34;
    public static readonly RULE_statement = 35;
    public static readonly RULE_expressionStatement = 36;
    public static readonly RULE_compoundStatement = 37;
    public static readonly RULE_selectionStatement = 38;
    public static readonly RULE_elseIfExpression = 39;
    public static readonly RULE_elseExpression = 40;
    public static readonly RULE_ifExpression = 41;
    public static readonly RULE_ifStatement = 42;
    public static readonly RULE_switchStatement = 43;
    public static readonly RULE_caseExpression = 44;
    public static readonly RULE_caseStatement = 45;
    public static readonly RULE_defaultStatement = 46;
    public static readonly RULE_iterationStatement = 47;
    public static readonly RULE_returnStatement = 48;
    public static readonly RULE_jumpStatement = 49;
    public static readonly RULE_callOtherTarget = 50;
    public static readonly RULE_lambdaExpression = 51;
    public static readonly RULE_expression = 52;
    public static readonly RULE_arrayAccessExpression = 53;
    public static readonly RULE_expressionList = 54;
    public static readonly RULE_assignmentExpression = 55;

    public static readonly literalNames = [
        null, null, "'auto'", "'break'", "'case'", "'char'", "'closure'", 
        "'const'", "'continue'", "'default'", "'do'", "'echo'", "'else'", 
        "'elif'", "'endif'", "'enum'", "'extern'", "'float'", "'for'", "'foreach'", 
        "'goto'", "'#'", "'if'", "'ifdef'", "'ifndef'", "'in'", "'include'", 
        "'inherit'", "'int'", "'line'", "'mapping'", "'mixed'", "'object'", 
        "'pragma'", "'register'", "'return'", "'status'", "'struct'", "'string'", 
        "'symbol'", "'switch'", "'typedef'", "'union'", "'unknown'", "'undef'", 
        "'void'", "'volatile'", "'while'", "'private'", "'protected'", "'public'", 
        "'static'", "'noshadow'", "'nomask'", "'varargs'", "'+'", "'-'", 
        "'*'", "'/'", "'%'", "'++'", "'--'", "'<<'", "'>>'", "'<'", "'>'", 
        "'<='", "'>='", "'=='", "'!='", "'&'", "'|'", "'^'", "'!'", "'&&'", 
        "'||'", "'?'", "':'", "';'", "','", "'..'", "'.'", "'''", "'::'", 
        "'='", "'+='", "'-='", "'*='", "'/='", "'%='", "'&='", "'|='", "'^='", 
        "'({'", "'})'", "'(['", "'->'", "'('", "')'", "'{'", "'}'", "'['", 
        "']'", "'\\'", null, null, null, null, null, null, null, null, null, 
        "'\\n'", null, "'\\\\n'"
    ];

    public static readonly symbolicNames = [
        null, "Identifier", "AUTO", "BREAK", "CASE", "CHAR", "CLOSURE", 
        "CONST", "CONTINUE", "DEFAULT", "DO", "ECHO", "ELSE", "ELIF", "ENDIF", 
        "ENUM", "EXTERN", "FLOAT", "FOR", "FOREACH", "GOTO", "HASH", "IF", 
        "IFDEF", "IFNDEF", "IN", "INCLUDE", "INHERIT", "INT", "LINE", "MAPPING", 
        "MIXED", "OBJECT", "PRAGMA", "REGISTER", "RETURN", "STATUS", "STRUCT", 
        "STRING", "SYMBOL", "SWITCH", "TYPEDEF", "UNION", "UNKNOWN", "UNDEF", 
        "VOID", "VOLATILE", "WHILE", "PRIVATE", "PROTECTED", "PUBLIC", "STATIC", 
        "NOSHADOW", "NOMASK", "VARARGS", "PLUS", "MINUS", "STAR", "DIV", 
        "MOD", "INC", "DEC", "SHL", "SHR", "LT", "GT", "LE", "GE", "EQ", 
        "NE", "AND", "OR", "XOR", "NOT", "AND_AND", "OR_OR", "QUESTION", 
        "COLON", "SEMI", "COMMA", "DOUBLEDOT", "DOT", "SINGLEQUOT", "SUPER_ACCESSOR", 
        "ASSIGN", "ADD_ASSIGN", "SUB_ASSIGN", "MUL_ASSIGN", "DIV_ASSIGN", 
        "MOD_ASSIGN", "AND_ASSIGN", "OR_ASSIGN", "XOR_ASSIGN", "ARRAY_OPEN", 
        "ARRAY_CLOSE", "MAPPING_OPEN", "ARROW", "PAREN_OPEN", "PAREN_CLOSE", 
        "CURLY_OPEN", "CURLY_CLOSE", "SQUARE_OPEN", "SQUARE_CLOSE", "BACKSLASH", 
        "IntegerConstant", "FloatingConstant", "STRING_START", "StringLiteral", 
        "CharacterConstant", "COMMENT", "LINE_COMMENT", "DEFINE", "WS", 
        "END_DEFINE", "STRING_END", "NEWLINE"
    ];
    public static readonly ruleNames = [
        "program", "preprocessorDirective", "definePreprocessorDirective", 
        "selectionDirective", "selectionDirectiveTypeSingle", "selectionDirectiveTypeWithArg", 
        "directiveTypeWithArguments", "directiveArgument", "directiveDefineParam", 
        "directiveDefineArgument", "directiveTypeInclude", "directiveIncludeFile", 
        "directiveIncludeFilename", "directiveIncludeFileGlobal", "directiveIncludeFileLocal", 
        "directiveTypePragma", "inheritStatement", "inheritSuperExpression", 
        "declaration", "functionModifier", "functionHeader", "functionHeaderDeclaration", 
        "functionDeclaration", "parameterList", "parameter", "arrayExpression", 
        "mappingKey", "mappingContent", "mappingExpression", "variableModifier", 
        "variableDeclaration", "primitiveTypeSpecifier", "arrayTypeSpecifier", 
        "typeSpecifier", "inlineClosureExpression", "statement", "expressionStatement", 
        "compoundStatement", "selectionStatement", "elseIfExpression", "elseExpression", 
        "ifExpression", "ifStatement", "switchStatement", "caseExpression", 
        "caseStatement", "defaultStatement", "iterationStatement", "returnStatement", 
        "jumpStatement", "callOtherTarget", "lambdaExpression", "expression", 
        "arrayAccessExpression", "expressionList", "assignmentExpression",
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
            this.state = 117;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3626106978) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 41887985) !== 0) || _la === 111) {
                {
                this.state = 115;
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
                case LPCParser.NOMASK:
                case LPCParser.VARARGS:
                case LPCParser.STAR:
                    {
                    this.state = 112;
                    this.declaration();
                    }
                    break;
                case LPCParser.HASH:
                case LPCParser.DEFINE:
                    {
                    this.state = 113;
                    this.preprocessorDirective();
                    }
                    break;
                case LPCParser.INHERIT:
                    {
                    this.state = 114;
                    this.inheritStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 119;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 120;
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
    public preprocessorDirective(): PreprocessorDirectiveContext {
        let localContext = new PreprocessorDirectiveContext(this.context, this.state);
        this.enterRule(localContext, 2, LPCParser.RULE_preprocessorDirective);
        let _la: number;
        try {
            this.state = 142;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 122;
                this.selectionDirective();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 123;
                this.match(LPCParser.HASH);
                this.state = 124;
                this.directiveTypeWithArguments();
                this.state = 125;
                this.directiveArgument();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 127;
                this.definePreprocessorDirective();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 128;
                this.match(LPCParser.HASH);
                this.state = 129;
                this.directiveTypeInclude();
                this.state = 130;
                this.directiveIncludeFile();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 132;
                this.match(LPCParser.HASH);
                this.state = 133;
                this.directiveTypePragma();
                this.state = 134;
                this.match(LPCParser.Identifier);
                this.state = 139;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 79) {
                    {
                    {
                    this.state = 135;
                    this.match(LPCParser.COMMA);
                    this.state = 136;
                    this.match(LPCParser.Identifier);
                    }
                    }
                    this.state = 141;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
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
    public definePreprocessorDirective(): DefinePreprocessorDirectiveContext {
        let localContext = new DefinePreprocessorDirectiveContext(this.context, this.state);
        this.enterRule(localContext, 4, LPCParser.RULE_definePreprocessorDirective);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 144;
            this.match(LPCParser.DEFINE);
            this.state = 145;
            this.match(LPCParser.END_DEFINE);
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
    public selectionDirective(): SelectionDirectiveContext {
        let localContext = new SelectionDirectiveContext(this.context, this.state);
        this.enterRule(localContext, 6, LPCParser.RULE_selectionDirective);
        let _la: number;
        try {
            this.state = 156;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 147;
                this.match(LPCParser.HASH);
                this.state = 148;
                this.selectionDirectiveTypeWithArg();
                this.state = 150;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 73) {
                    {
                    this.state = 149;
                    this.match(LPCParser.NOT);
                    }
                }

                this.state = 152;
                this.directiveArgument();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 154;
                this.match(LPCParser.HASH);
                this.state = 155;
                this.selectionDirectiveTypeSingle();
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
    public selectionDirectiveTypeSingle(): SelectionDirectiveTypeSingleContext {
        let localContext = new SelectionDirectiveTypeSingleContext(this.context, this.state);
        this.enterRule(localContext, 8, LPCParser.RULE_selectionDirectiveTypeSingle);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 158;
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
    public selectionDirectiveTypeWithArg(): SelectionDirectiveTypeWithArgContext {
        let localContext = new SelectionDirectiveTypeWithArgContext(this.context, this.state);
        this.enterRule(localContext, 10, LPCParser.RULE_selectionDirectiveTypeWithArg);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 160;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 29368320) !== 0))) {
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
    public directiveTypeWithArguments(): DirectiveTypeWithArgumentsContext {
        let localContext = new DirectiveTypeWithArgumentsContext(this.context, this.state);
        this.enterRule(localContext, 12, LPCParser.RULE_directiveTypeWithArguments);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 162;
            _la = this.tokenStream.LA(1);
            if(!(_la === 11 || _la === 29 || _la === 44)) {
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
    public directiveArgument(): DirectiveArgumentContext {
        let localContext = new DirectiveArgumentContext(this.context, this.state);
        this.enterRule(localContext, 14, LPCParser.RULE_directiveArgument);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 164;
            _la = this.tokenStream.LA(1);
            if(!(_la === 1 || _la === 104 || _la === 107)) {
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
    public directiveDefineParam(): DirectiveDefineParamContext {
        let localContext = new DirectiveDefineParamContext(this.context, this.state);
        this.enterRule(localContext, 16, LPCParser.RULE_directiveDefineParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 166;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 167;
            this.match(LPCParser.Identifier);
            this.state = 172;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 79) {
                {
                {
                this.state = 168;
                this.match(LPCParser.COMMA);
                this.state = 169;
                this.match(LPCParser.Identifier);
                }
                }
                this.state = 174;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 175;
            this.match(LPCParser.PAREN_CLOSE);
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
    public directiveDefineArgument(): DirectiveDefineArgumentContext {
        let localContext = new DirectiveDefineArgumentContext(this.context, this.state);
        this.enterRule(localContext, 18, LPCParser.RULE_directiveDefineArgument);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 177;
            this.expression(0);
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
    public directiveTypeInclude(): DirectiveTypeIncludeContext {
        let localContext = new DirectiveTypeIncludeContext(this.context, this.state);
        this.enterRule(localContext, 20, LPCParser.RULE_directiveTypeInclude);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 179;
            this.match(LPCParser.INCLUDE);
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
    public directiveIncludeFile(): DirectiveIncludeFileContext {
        let localContext = new DirectiveIncludeFileContext(this.context, this.state);
        this.enterRule(localContext, 22, LPCParser.RULE_directiveIncludeFile);
        try {
            this.state = 183;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.LT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 181;
                this.directiveIncludeFileGlobal();
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 182;
                this.directiveIncludeFileLocal();
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
    public directiveIncludeFilename(): DirectiveIncludeFilenameContext {
        let localContext = new DirectiveIncludeFilenameContext(this.context, this.state);
        this.enterRule(localContext, 24, LPCParser.RULE_directiveIncludeFilename);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 185;
            this.match(LPCParser.Identifier);
            this.state = 188;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 81) {
                {
                this.state = 186;
                this.match(LPCParser.DOT);
                this.state = 187;
                this.match(LPCParser.Identifier);
                }
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
    public directiveIncludeFileGlobal(): DirectiveIncludeFileGlobalContext {
        let localContext = new DirectiveIncludeFileGlobalContext(this.context, this.state);
        this.enterRule(localContext, 26, LPCParser.RULE_directiveIncludeFileGlobal);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 190;
            this.match(LPCParser.LT);
            this.state = 191;
            this.directiveIncludeFilename();
            this.state = 192;
            this.match(LPCParser.GT);
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
    public directiveIncludeFileLocal(): DirectiveIncludeFileLocalContext {
        let localContext = new DirectiveIncludeFileLocalContext(this.context, this.state);
        this.enterRule(localContext, 28, LPCParser.RULE_directiveIncludeFileLocal);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 194;
            this.match(LPCParser.StringLiteral);
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
    public directiveTypePragma(): DirectiveTypePragmaContext {
        let localContext = new DirectiveTypePragmaContext(this.context, this.state);
        this.enterRule(localContext, 30, LPCParser.RULE_directiveTypePragma);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 196;
            this.match(LPCParser.PRAGMA);
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
    public inheritStatement(): InheritStatementContext {
        let localContext = new InheritStatementContext(this.context, this.state);
        this.enterRule(localContext, 32, LPCParser.RULE_inheritStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 198;
            this.match(LPCParser.INHERIT);
            this.state = 199;
            this.match(LPCParser.StringLiteral);
            this.state = 200;
            this.match(LPCParser.SEMI);
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
    public inheritSuperExpression(): InheritSuperExpressionContext {
        let localContext = new InheritSuperExpressionContext(this.context, this.state);
        this.enterRule(localContext, 34, LPCParser.RULE_inheritSuperExpression);
        try {
            this.state = 207;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.SUPER_ACCESSOR:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 202;
                this.match(LPCParser.SUPER_ACCESSOR);
                this.state = 203;
                this.expression(0);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 204;
                this.match(LPCParser.StringLiteral);
                this.state = 205;
                this.match(LPCParser.SUPER_ACCESSOR);
                this.state = 206;
                this.expression(0);
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
    public declaration(): DeclarationContext {
        let localContext = new DeclarationContext(this.context, this.state);
        this.enterRule(localContext, 36, LPCParser.RULE_declaration);
        try {
            this.state = 212;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 209;
                this.functionHeaderDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 210;
                this.functionDeclaration();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 211;
                this.variableDeclaration();
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
    public functionModifier(): FunctionModifierContext {
        let localContext = new FunctionModifierContext(this.context, this.state);
        this.enterRule(localContext, 38, LPCParser.RULE_functionModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 214;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 48)) & ~0x1F) === 0 && ((1 << (_la - 48)) & 127) !== 0))) {
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
    public functionHeader(): FunctionHeaderContext {
        let localContext = new FunctionHeaderContext(this.context, this.state);
        this.enterRule(localContext, 40, LPCParser.RULE_functionHeader);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 219;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 48)) & ~0x1F) === 0 && ((1 << (_la - 48)) & 127) !== 0)) {
                {
                {
                this.state = 216;
                this.functionModifier();
                }
                }
                this.state = 221;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 223;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33564913) !== 0)) {
                {
                this.state = 222;
                this.typeSpecifier();
                }
            }

            this.state = 225;
            this.match(LPCParser.Identifier);
            this.state = 226;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 228;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792098) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33564913) !== 0)) {
                {
                this.state = 227;
                this.parameterList();
                }
            }

            this.state = 230;
            this.match(LPCParser.PAREN_CLOSE);
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
    public functionHeaderDeclaration(): FunctionHeaderDeclarationContext {
        let localContext = new FunctionHeaderDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 42, LPCParser.RULE_functionHeaderDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 232;
            this.functionHeader();
            this.state = 233;
            this.match(LPCParser.SEMI);
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
    public functionDeclaration(): FunctionDeclarationContext {
        let localContext = new FunctionDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 44, LPCParser.RULE_functionDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 235;
            this.functionHeader();
            this.state = 236;
            this.compoundStatement();
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
    public parameterList(): ParameterListContext {
        let localContext = new ParameterListContext(this.context, this.state);
        this.enterRule(localContext, 46, LPCParser.RULE_parameterList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 238;
            this.parameter();
            this.state = 243;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 79) {
                {
                {
                this.state = 239;
                this.match(LPCParser.COMMA);
                this.state = 240;
                this.parameter();
                }
                }
                this.state = 245;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
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
    public parameter(): ParameterContext {
        let localContext = new ParameterContext(this.context, this.state);
        this.enterRule(localContext, 48, LPCParser.RULE_parameter);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 247;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33564913) !== 0)) {
                {
                this.state = 246;
                this.typeSpecifier();
                }
            }

            this.state = 249;
            this.match(LPCParser.Identifier);
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
    public arrayExpression(): ArrayExpressionContext {
        let localContext = new ArrayExpressionContext(this.context, this.state);
        this.enterRule(localContext, 50, LPCParser.RULE_arrayExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 251;
            this.match(LPCParser.ARRAY_OPEN);
            this.state = 260;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1 || _la === 21 || ((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 201457713) !== 0) || ((((_la - 93)) & ~0x1F) === 0 && ((1 << (_la - 93)) & 55317) !== 0)) {
                {
                this.state = 252;
                this.expression(0);
                this.state = 257;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 16, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 253;
                        this.match(LPCParser.COMMA);
                        this.state = 254;
                        this.expression(0);
                        }
                        }
                    }
                    this.state = 259;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 16, this.context);
                }
                }
            }

            this.state = 263;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 79) {
                {
                this.state = 262;
                this.match(LPCParser.COMMA);
                }
            }

            this.state = 265;
            this.match(LPCParser.ARRAY_CLOSE);
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
    public mappingKey(): MappingKeyContext {
        let localContext = new MappingKeyContext(this.context, this.state);
        this.enterRule(localContext, 52, LPCParser.RULE_mappingKey);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 267;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 104)) & ~0x1F) === 0 && ((1 << (_la - 104)) & 25) !== 0))) {
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
    public mappingContent(): MappingContentContext {
        let localContext = new MappingContentContext(this.context, this.state);
        this.enterRule(localContext, 54, LPCParser.RULE_mappingContent);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 269;
            this.mappingKey();
            this.state = 279;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 77) {
                {
                this.state = 270;
                this.match(LPCParser.COLON);
                this.state = 271;
                this.expression(0);
                this.state = 276;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 78) {
                    {
                    {
                    this.state = 272;
                    this.match(LPCParser.SEMI);
                    this.state = 273;
                    this.expression(0);
                    }
                    }
                    this.state = 278;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
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
    public mappingExpression(): MappingExpressionContext {
        let localContext = new MappingExpressionContext(this.context, this.state);
        this.enterRule(localContext, 56, LPCParser.RULE_mappingExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 281;
            this.match(LPCParser.MAPPING_OPEN);
            this.state = 290;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 104)) & ~0x1F) === 0 && ((1 << (_la - 104)) & 25) !== 0)) {
                {
                this.state = 282;
                this.mappingContent();
                this.state = 287;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 21, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 283;
                        this.match(LPCParser.COMMA);
                        this.state = 284;
                        this.mappingContent();
                        }
                        }
                    }
                    this.state = 289;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 21, this.context);
                }
                }
            }

            this.state = 293;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 79) {
                {
                this.state = 292;
                this.match(LPCParser.COMMA);
                }
            }

            this.state = 295;
            this.match(LPCParser.SQUARE_CLOSE);
            this.state = 296;
            this.match(LPCParser.PAREN_CLOSE);
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
    public variableModifier(): VariableModifierContext {
        let localContext = new VariableModifierContext(this.context, this.state);
        this.enterRule(localContext, 58, LPCParser.RULE_variableModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 298;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 48)) & ~0x1F) === 0 && ((1 << (_la - 48)) & 31) !== 0))) {
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
    public variableDeclaration(): VariableDeclarationContext {
        let localContext = new VariableDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 60, LPCParser.RULE_variableDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 303;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 48)) & ~0x1F) === 0 && ((1 << (_la - 48)) & 31) !== 0)) {
                {
                {
                this.state = 300;
                this.variableModifier();
                }
                }
                this.state = 305;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 307;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33564913) !== 0)) {
                {
                this.state = 306;
                this.typeSpecifier();
                }
            }

            this.state = 309;
            this.match(LPCParser.Identifier);
            this.state = 311;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 84) {
                {
                this.state = 310;
                this.assignmentExpression();
                }
            }

            this.state = 323;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 79) {
                {
                {
                this.state = 313;
                this.match(LPCParser.COMMA);
                this.state = 315;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 57) {
                    {
                    this.state = 314;
                    this.match(LPCParser.STAR);
                    }
                }

                this.state = 317;
                this.match(LPCParser.Identifier);
                this.state = 319;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 84) {
                    {
                    this.state = 318;
                    this.assignmentExpression();
                    }
                }

                }
                }
                this.state = 325;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 326;
            this.match(LPCParser.SEMI);
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
    public primitiveTypeSpecifier(): PrimitiveTypeSpecifierContext {
        let localContext = new PrimitiveTypeSpecifierContext(this.context, this.state);
        this.enterRule(localContext, 62, LPCParser.RULE_primitiveTypeSpecifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 328;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 10481) !== 0))) {
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
    public arrayTypeSpecifier(): ArrayTypeSpecifierContext {
        let localContext = new ArrayTypeSpecifierContext(this.context, this.state);
        this.enterRule(localContext, 64, LPCParser.RULE_arrayTypeSpecifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 331;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 10481) !== 0)) {
                {
                this.state = 330;
                this.primitiveTypeSpecifier();
                }
            }

            this.state = 333;
            this.match(LPCParser.STAR);
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
    public typeSpecifier(): TypeSpecifierContext {
        let localContext = new TypeSpecifierContext(this.context, this.state);
        this.enterRule(localContext, 66, LPCParser.RULE_typeSpecifier);
        try {
            this.state = 337;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 31, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 335;
                this.primitiveTypeSpecifier();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 336;
                this.arrayTypeSpecifier();
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
    public inlineClosureExpression(): InlineClosureExpressionContext {
        let localContext = new InlineClosureExpressionContext(this.context, this.state);
        this.enterRule(localContext, 68, LPCParser.RULE_inlineClosureExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 339;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 340;
            this.match(LPCParser.COLON);
            this.state = 348;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 33, this.context) ) {
            case 1:
                {
                this.state = 341;
                this.expression(0);
                }
                break;
            case 2:
                {
                this.state = 345;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871274) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 857713145) !== 0) || ((((_la - 73)) & ~0x1F) === 0 && ((1 << (_la - 73)) & 2236614145) !== 0) || ((((_la - 105)) & ~0x1F) === 0 && ((1 << (_la - 105)) & 13) !== 0)) {
                    {
                    {
                    this.state = 342;
                    this.statement();
                    }
                    }
                    this.state = 347;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            }
            this.state = 350;
            this.match(LPCParser.COLON);
            this.state = 351;
            this.match(LPCParser.PAREN_CLOSE);
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
        this.enterRule(localContext, 70, LPCParser.RULE_statement);
        try {
            this.state = 361;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 34, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 353;
                this.expressionStatement();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 354;
                this.compoundStatement();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 355;
                this.selectionStatement();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 356;
                this.iterationStatement();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 357;
                this.jumpStatement();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 358;
                this.variableDeclaration();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 359;
                this.selectionDirective();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 360;
                this.returnStatement();
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
    public expressionStatement(): ExpressionStatementContext {
        let localContext = new ExpressionStatementContext(this.context, this.state);
        this.enterRule(localContext, 72, LPCParser.RULE_expressionStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 363;
            this.expression(0);
            this.state = 364;
            this.match(LPCParser.SEMI);
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
    public compoundStatement(): CompoundStatementContext {
        let localContext = new CompoundStatementContext(this.context, this.state);
        this.enterRule(localContext, 74, LPCParser.RULE_compoundStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 366;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 370;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871274) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 857713145) !== 0) || ((((_la - 73)) & ~0x1F) === 0 && ((1 << (_la - 73)) & 2236614145) !== 0) || ((((_la - 105)) & ~0x1F) === 0 && ((1 << (_la - 105)) & 13) !== 0)) {
                {
                {
                this.state = 367;
                this.statement();
                }
                }
                this.state = 372;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 373;
            this.match(LPCParser.CURLY_CLOSE);
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
    public selectionStatement(): SelectionStatementContext {
        let localContext = new SelectionStatementContext(this.context, this.state);
        this.enterRule(localContext, 76, LPCParser.RULE_selectionStatement);
        try {
            this.state = 377;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.IF:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 375;
                this.ifStatement();
                }
                break;
            case LPCParser.SWITCH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 376;
                this.switchStatement();
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
    public elseIfExpression(): ElseIfExpressionContext {
        let localContext = new ElseIfExpressionContext(this.context, this.state);
        this.enterRule(localContext, 78, LPCParser.RULE_elseIfExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 379;
            this.match(LPCParser.ELSE);
            this.state = 380;
            this.match(LPCParser.IF);
            this.state = 381;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 382;
            this.expression(0);
            this.state = 383;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 384;
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
    public elseExpression(): ElseExpressionContext {
        let localContext = new ElseExpressionContext(this.context, this.state);
        this.enterRule(localContext, 80, LPCParser.RULE_elseExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 386;
            this.match(LPCParser.ELSE);
            this.state = 387;
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
    public ifExpression(): IfExpressionContext {
        let localContext = new IfExpressionContext(this.context, this.state);
        this.enterRule(localContext, 82, LPCParser.RULE_ifExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 389;
            this.match(LPCParser.IF);
            this.state = 390;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 391;
            this.expression(0);
            this.state = 392;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 393;
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
    public ifStatement(): IfStatementContext {
        let localContext = new IfStatementContext(this.context, this.state);
        this.enterRule(localContext, 84, LPCParser.RULE_ifStatement);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 395;
            this.ifExpression();
            this.state = 399;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 37, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 396;
                    this.elseIfExpression();
                    }
                    }
                }
                this.state = 401;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 37, this.context);
            }
            this.state = 403;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 38, this.context) ) {
            case 1:
                {
                this.state = 402;
                this.elseExpression();
                }
                break;
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
    public switchStatement(): SwitchStatementContext {
        let localContext = new SwitchStatementContext(this.context, this.state);
        this.enterRule(localContext, 86, LPCParser.RULE_switchStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 405;
            this.match(LPCParser.SWITCH);
            this.state = 406;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 407;
            this.expression(0);
            this.state = 408;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 409;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 414;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 4 || _la === 9) {
                {
                this.state = 412;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.CASE:
                    {
                    this.state = 410;
                    this.caseStatement();
                    }
                    break;
                case LPCParser.DEFAULT:
                    {
                    this.state = 411;
                    this.defaultStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 416;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 417;
            this.match(LPCParser.CURLY_CLOSE);
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
    public caseExpression(): CaseExpressionContext {
        let localContext = new CaseExpressionContext(this.context, this.state);
        this.enterRule(localContext, 88, LPCParser.RULE_caseExpression);
        let _la: number;
        try {
            this.state = 441;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 47, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 424;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.StringLiteral:
                    {
                    this.state = 419;
                    this.match(LPCParser.StringLiteral);
                    }
                    break;
                case LPCParser.MINUS:
                case LPCParser.IntegerConstant:
                    {
                    this.state = 421;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 56) {
                        {
                        this.state = 420;
                        this.match(LPCParser.MINUS);
                        }
                    }

                    this.state = 423;
                    this.match(LPCParser.IntegerConstant);
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
                this.state = 431;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.StringLiteral:
                    {
                    this.state = 426;
                    this.match(LPCParser.StringLiteral);
                    }
                    break;
                case LPCParser.MINUS:
                case LPCParser.IntegerConstant:
                    {
                    this.state = 428;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 56) {
                        {
                        this.state = 427;
                        this.match(LPCParser.MINUS);
                        }
                    }

                    this.state = 430;
                    this.match(LPCParser.IntegerConstant);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 433;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 439;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.StringLiteral:
                    {
                    this.state = 434;
                    this.match(LPCParser.StringLiteral);
                    }
                    break;
                case LPCParser.MINUS:
                case LPCParser.IntegerConstant:
                    {
                    this.state = 436;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 56) {
                        {
                        this.state = 435;
                        this.match(LPCParser.MINUS);
                        }
                    }

                    this.state = 438;
                    this.match(LPCParser.IntegerConstant);
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
    public caseStatement(): CaseStatementContext {
        let localContext = new CaseStatementContext(this.context, this.state);
        this.enterRule(localContext, 90, LPCParser.RULE_caseStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 443;
            this.match(LPCParser.CASE);
            this.state = 444;
            this.caseExpression();
            this.state = 445;
            this.match(LPCParser.COLON);
            this.state = 449;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871274) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 857713145) !== 0) || ((((_la - 73)) & ~0x1F) === 0 && ((1 << (_la - 73)) & 2236614145) !== 0) || ((((_la - 105)) & ~0x1F) === 0 && ((1 << (_la - 105)) & 13) !== 0)) {
                {
                {
                this.state = 446;
                this.statement();
                }
                }
                this.state = 451;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
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
    public defaultStatement(): DefaultStatementContext {
        let localContext = new DefaultStatementContext(this.context, this.state);
        this.enterRule(localContext, 92, LPCParser.RULE_defaultStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 452;
            this.match(LPCParser.DEFAULT);
            this.state = 453;
            this.match(LPCParser.COLON);
            this.state = 457;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871274) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 857713145) !== 0) || ((((_la - 73)) & ~0x1F) === 0 && ((1 << (_la - 73)) & 2236614145) !== 0) || ((((_la - 105)) & ~0x1F) === 0 && ((1 << (_la - 105)) & 13) !== 0)) {
                {
                {
                this.state = 454;
                this.statement();
                }
                }
                this.state = 459;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
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
    public iterationStatement(): IterationStatementContext {
        let localContext = new IterationStatementContext(this.context, this.state);
        this.enterRule(localContext, 94, LPCParser.RULE_iterationStatement);
        let _la: number;
        try {
            this.state = 519;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.WHILE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 460;
                this.match(LPCParser.WHILE);
                this.state = 461;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 462;
                this.expression(0);
                this.state = 463;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 466;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.Identifier:
                case LPCParser.BREAK:
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
                case LPCParser.MINUS:
                case LPCParser.STAR:
                case LPCParser.INC:
                case LPCParser.DEC:
                case LPCParser.NOT:
                case LPCParser.SINGLEQUOT:
                case LPCParser.SUPER_ACCESSOR:
                case LPCParser.ARRAY_OPEN:
                case LPCParser.MAPPING_OPEN:
                case LPCParser.PAREN_OPEN:
                case LPCParser.CURLY_OPEN:
                case LPCParser.IntegerConstant:
                case LPCParser.FloatingConstant:
                case LPCParser.StringLiteral:
                case LPCParser.CharacterConstant:
                    {
                    this.state = 464;
                    this.statement();
                    }
                    break;
                case LPCParser.SEMI:
                    {
                    this.state = 465;
                    this.match(LPCParser.SEMI);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                break;
            case LPCParser.DO:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 468;
                this.match(LPCParser.DO);
                this.state = 469;
                this.statement();
                this.state = 470;
                this.match(LPCParser.WHILE);
                this.state = 471;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 472;
                this.expression(0);
                this.state = 473;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 474;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.FOR:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 476;
                this.match(LPCParser.FOR);
                this.state = 477;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 479;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || _la === 21 || ((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 201457713) !== 0) || ((((_la - 93)) & ~0x1F) === 0 && ((1 << (_la - 93)) & 55317) !== 0)) {
                    {
                    this.state = 478;
                    this.expression(0);
                    }
                }

                this.state = 485;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 79) {
                    {
                    {
                    this.state = 481;
                    this.match(LPCParser.COMMA);
                    this.state = 482;
                    this.expression(0);
                    }
                    }
                    this.state = 487;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 488;
                this.match(LPCParser.SEMI);
                this.state = 490;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || _la === 21 || ((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 201457713) !== 0) || ((((_la - 93)) & ~0x1F) === 0 && ((1 << (_la - 93)) & 55317) !== 0)) {
                    {
                    this.state = 489;
                    this.expression(0);
                    }
                }

                this.state = 492;
                this.match(LPCParser.SEMI);
                this.state = 494;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || _la === 21 || ((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 201457713) !== 0) || ((((_la - 93)) & ~0x1F) === 0 && ((1 << (_la - 93)) & 55317) !== 0)) {
                    {
                    this.state = 493;
                    this.expression(0);
                    }
                }

                this.state = 500;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 79) {
                    {
                    {
                    this.state = 496;
                    this.match(LPCParser.COMMA);
                    this.state = 497;
                    this.expression(0);
                    }
                    }
                    this.state = 502;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 503;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 506;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.Identifier:
                case LPCParser.BREAK:
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
                case LPCParser.MINUS:
                case LPCParser.STAR:
                case LPCParser.INC:
                case LPCParser.DEC:
                case LPCParser.NOT:
                case LPCParser.SINGLEQUOT:
                case LPCParser.SUPER_ACCESSOR:
                case LPCParser.ARRAY_OPEN:
                case LPCParser.MAPPING_OPEN:
                case LPCParser.PAREN_OPEN:
                case LPCParser.CURLY_OPEN:
                case LPCParser.IntegerConstant:
                case LPCParser.FloatingConstant:
                case LPCParser.StringLiteral:
                case LPCParser.CharacterConstant:
                    {
                    this.state = 504;
                    this.statement();
                    }
                    break;
                case LPCParser.SEMI:
                    {
                    this.state = 505;
                    this.match(LPCParser.SEMI);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                break;
            case LPCParser.FOREACH:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 508;
                this.match(LPCParser.FOREACH);
                this.state = 509;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 510;
                this.typeSpecifier();
                this.state = 511;
                this.match(LPCParser.Identifier);
                this.state = 512;
                _la = this.tokenStream.LA(1);
                if(!(_la === 25 || _la === 77)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 513;
                this.expression(0);
                this.state = 514;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 517;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.Identifier:
                case LPCParser.BREAK:
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
                case LPCParser.MINUS:
                case LPCParser.STAR:
                case LPCParser.INC:
                case LPCParser.DEC:
                case LPCParser.NOT:
                case LPCParser.SINGLEQUOT:
                case LPCParser.SUPER_ACCESSOR:
                case LPCParser.ARRAY_OPEN:
                case LPCParser.MAPPING_OPEN:
                case LPCParser.PAREN_OPEN:
                case LPCParser.CURLY_OPEN:
                case LPCParser.IntegerConstant:
                case LPCParser.FloatingConstant:
                case LPCParser.StringLiteral:
                case LPCParser.CharacterConstant:
                    {
                    this.state = 515;
                    this.statement();
                    }
                    break;
                case LPCParser.SEMI:
                    {
                    this.state = 516;
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
        this.enterRule(localContext, 96, LPCParser.RULE_returnStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 521;
            this.match(LPCParser.RETURN);
            this.state = 523;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1 || _la === 21 || ((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 201457713) !== 0) || ((((_la - 93)) & ~0x1F) === 0 && ((1 << (_la - 93)) & 55317) !== 0)) {
                {
                this.state = 522;
                this.expression(0);
                }
            }

            this.state = 525;
            this.match(LPCParser.SEMI);
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
    public jumpStatement(): JumpStatementContext {
        let localContext = new JumpStatementContext(this.context, this.state);
        this.enterRule(localContext, 98, LPCParser.RULE_jumpStatement);
        try {
            this.state = 532;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BREAK:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 527;
                this.match(LPCParser.BREAK);
                this.state = 528;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.CONTINUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 529;
                this.match(LPCParser.CONTINUE);
                this.state = 530;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.RETURN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 531;
                this.returnStatement();
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
    public callOtherTarget(): CallOtherTargetContext {
        let localContext = new CallOtherTargetContext(this.context, this.state);
        this.enterRule(localContext, 100, LPCParser.RULE_callOtherTarget);
        try {
            this.state = 539;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 534;
                this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.PAREN_OPEN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 535;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 536;
                this.match(LPCParser.Identifier);
                this.state = 537;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 538;
                this.match(LPCParser.StringLiteral);
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
    public lambdaExpression(): LambdaExpressionContext {
        let localContext = new LambdaExpressionContext(this.context, this.state);
        this.enterRule(localContext, 102, LPCParser.RULE_lambdaExpression);
        try {
            this.state = 627;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 62, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 541;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 542;
                this.match(LPCParser.Identifier);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 543;
                this.match(LPCParser.HASH);
                this.state = 544;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 545;
                this.expression(0);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 546;
                this.match(LPCParser.HASH);
                this.state = 547;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 548;
                this.match(LPCParser.PLUS);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 549;
                this.match(LPCParser.HASH);
                this.state = 550;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 551;
                this.match(LPCParser.MINUS);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 552;
                this.match(LPCParser.HASH);
                this.state = 553;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 554;
                this.match(LPCParser.STAR);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 555;
                this.match(LPCParser.HASH);
                this.state = 556;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 557;
                this.match(LPCParser.DIV);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 558;
                this.match(LPCParser.HASH);
                this.state = 559;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 560;
                this.match(LPCParser.MOD);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 561;
                this.match(LPCParser.HASH);
                this.state = 562;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 563;
                this.match(LPCParser.LT);
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 564;
                this.match(LPCParser.HASH);
                this.state = 565;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 566;
                this.match(LPCParser.GT);
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 567;
                this.match(LPCParser.HASH);
                this.state = 568;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 569;
                this.match(LPCParser.LE);
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 570;
                this.match(LPCParser.HASH);
                this.state = 571;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 572;
                this.match(LPCParser.GE);
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 573;
                this.match(LPCParser.HASH);
                this.state = 574;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 575;
                this.match(LPCParser.EQ);
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 576;
                this.match(LPCParser.HASH);
                this.state = 577;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 578;
                this.match(LPCParser.NE);
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 579;
                this.match(LPCParser.HASH);
                this.state = 580;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 581;
                this.match(LPCParser.AND);
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 582;
                this.match(LPCParser.HASH);
                this.state = 583;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 584;
                this.match(LPCParser.OR);
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 585;
                this.match(LPCParser.HASH);
                this.state = 586;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 587;
                this.match(LPCParser.XOR);
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 588;
                this.match(LPCParser.HASH);
                this.state = 589;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 590;
                this.match(LPCParser.AND_AND);
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 591;
                this.match(LPCParser.HASH);
                this.state = 592;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 593;
                this.match(LPCParser.OR_OR);
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 594;
                this.match(LPCParser.HASH);
                this.state = 595;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 596;
                this.match(LPCParser.ADD_ASSIGN);
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 597;
                this.match(LPCParser.HASH);
                this.state = 598;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 599;
                this.match(LPCParser.SUB_ASSIGN);
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 600;
                this.match(LPCParser.HASH);
                this.state = 601;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 602;
                this.match(LPCParser.MUL_ASSIGN);
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 603;
                this.match(LPCParser.HASH);
                this.state = 604;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 605;
                this.match(LPCParser.DIV_ASSIGN);
                }
                break;
            case 23:
                this.enterOuterAlt(localContext, 23);
                {
                this.state = 606;
                this.match(LPCParser.HASH);
                this.state = 607;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 608;
                this.match(LPCParser.MOD_ASSIGN);
                }
                break;
            case 24:
                this.enterOuterAlt(localContext, 24);
                {
                this.state = 609;
                this.match(LPCParser.HASH);
                this.state = 610;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 611;
                this.match(LPCParser.AND_ASSIGN);
                }
                break;
            case 25:
                this.enterOuterAlt(localContext, 25);
                {
                this.state = 612;
                this.match(LPCParser.HASH);
                this.state = 613;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 614;
                this.match(LPCParser.OR_ASSIGN);
                }
                break;
            case 26:
                this.enterOuterAlt(localContext, 26);
                {
                this.state = 615;
                this.match(LPCParser.HASH);
                this.state = 616;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 617;
                this.match(LPCParser.XOR_ASSIGN);
                }
                break;
            case 27:
                this.enterOuterAlt(localContext, 27);
                {
                this.state = 618;
                this.match(LPCParser.HASH);
                this.state = 619;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 620;
                this.match(LPCParser.QUESTION);
                }
                break;
            case 28:
                this.enterOuterAlt(localContext, 28);
                {
                this.state = 621;
                this.match(LPCParser.HASH);
                this.state = 622;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 623;
                this.match(LPCParser.SHL);
                }
                break;
            case 29:
                this.enterOuterAlt(localContext, 29);
                {
                this.state = 624;
                this.match(LPCParser.HASH);
                this.state = 625;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 626;
                this.match(LPCParser.SHR);
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

    public expression(): ExpressionContext;
    public expression(_p: number): ExpressionContext;
    public expression(_p?: number): ExpressionContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new ExpressionContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 104;
        this.enterRecursionRule(localContext, 104, LPCParser.RULE_expression, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 671;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 67, this.context) ) {
            case 1:
                {
                this.state = 630;
                this.match(LPCParser.Identifier);
                }
                break;
            case 2:
                {
                this.state = 632;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 56) {
                    {
                    this.state = 631;
                    this.match(LPCParser.MINUS);
                    }
                }

                this.state = 634;
                this.match(LPCParser.IntegerConstant);
                }
                break;
            case 3:
                {
                this.state = 636;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 56) {
                    {
                    this.state = 635;
                    this.match(LPCParser.MINUS);
                    }
                }

                this.state = 638;
                this.match(LPCParser.FloatingConstant);
                }
                break;
            case 4:
                {
                this.state = 639;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case 5:
                {
                this.state = 640;
                this.match(LPCParser.StringLiteral);
                this.state = 644;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 65, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 641;
                        this.match(LPCParser.StringLiteral);
                        }
                        }
                    }
                    this.state = 646;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 65, this.context);
                }
                }
                break;
            case 6:
                {
                this.state = 647;
                this.match(LPCParser.CharacterConstant);
                }
                break;
            case 7:
                {
                this.state = 648;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 649;
                this.expression(0);
                this.state = 650;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 8:
                {
                this.state = 652;
                this.inlineClosureExpression();
                }
                break;
            case 9:
                {
                this.state = 653;
                this.lambdaExpression();
                }
                break;
            case 10:
                {
                this.state = 654;
                this.match(LPCParser.NOT);
                this.state = 655;
                this.expression(13);
                }
                break;
            case 11:
                {
                this.state = 656;
                this.match(LPCParser.INC);
                this.state = 657;
                this.expression(12);
                }
                break;
            case 12:
                {
                this.state = 658;
                this.match(LPCParser.DEC);
                this.state = 659;
                this.expression(11);
                }
                break;
            case 13:
                {
                this.state = 660;
                this.match(LPCParser.MINUS);
                this.state = 661;
                this.expression(10);
                }
                break;
            case 14:
                {
                this.state = 662;
                this.match(LPCParser.Identifier);
                this.state = 663;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 665;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || _la === 21 || ((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 201457713) !== 0) || ((((_la - 93)) & ~0x1F) === 0 && ((1 << (_la - 93)) & 55317) !== 0)) {
                    {
                    this.state = 664;
                    this.expressionList();
                    }
                }

                this.state = 667;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 15:
                {
                this.state = 668;
                this.mappingExpression();
                }
                break;
            case 16:
                {
                this.state = 669;
                this.arrayExpression();
                }
                break;
            case 17:
                {
                this.state = 670;
                this.inheritSuperExpression();
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 776;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 70, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 774;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 69, this.context) ) {
                    case 1:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 673;
                        if (!(this.precpred(this.context, 40))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 40)");
                        }
                        this.state = 674;
                        this.match(LPCParser.PLUS);
                        this.state = 675;
                        this.expression(41);
                        }
                        break;
                    case 2:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 676;
                        if (!(this.precpred(this.context, 39))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 39)");
                        }
                        this.state = 677;
                        this.match(LPCParser.MINUS);
                        this.state = 678;
                        this.expression(40);
                        }
                        break;
                    case 3:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 679;
                        if (!(this.precpred(this.context, 38))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 38)");
                        }
                        this.state = 680;
                        this.match(LPCParser.STAR);
                        this.state = 681;
                        this.expression(39);
                        }
                        break;
                    case 4:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 682;
                        if (!(this.precpred(this.context, 37))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 37)");
                        }
                        this.state = 683;
                        this.match(LPCParser.DIV);
                        this.state = 684;
                        this.expression(38);
                        }
                        break;
                    case 5:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 685;
                        if (!(this.precpred(this.context, 36))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 36)");
                        }
                        this.state = 686;
                        this.match(LPCParser.MOD);
                        this.state = 687;
                        this.expression(37);
                        }
                        break;
                    case 6:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 688;
                        if (!(this.precpred(this.context, 35))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 35)");
                        }
                        this.state = 689;
                        this.match(LPCParser.LT);
                        this.state = 690;
                        this.expression(36);
                        }
                        break;
                    case 7:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 691;
                        if (!(this.precpred(this.context, 34))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 34)");
                        }
                        this.state = 692;
                        this.match(LPCParser.GT);
                        this.state = 693;
                        this.expression(35);
                        }
                        break;
                    case 8:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 694;
                        if (!(this.precpred(this.context, 33))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 33)");
                        }
                        this.state = 695;
                        this.match(LPCParser.LE);
                        this.state = 696;
                        this.expression(34);
                        }
                        break;
                    case 9:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 697;
                        if (!(this.precpred(this.context, 32))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 32)");
                        }
                        this.state = 698;
                        this.match(LPCParser.GE);
                        this.state = 699;
                        this.expression(33);
                        }
                        break;
                    case 10:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 700;
                        if (!(this.precpred(this.context, 31))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 31)");
                        }
                        this.state = 701;
                        this.match(LPCParser.EQ);
                        this.state = 702;
                        this.expression(32);
                        }
                        break;
                    case 11:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 703;
                        if (!(this.precpred(this.context, 30))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 30)");
                        }
                        this.state = 704;
                        this.match(LPCParser.NE);
                        this.state = 705;
                        this.expression(31);
                        }
                        break;
                    case 12:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 706;
                        if (!(this.precpred(this.context, 29))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 29)");
                        }
                        this.state = 707;
                        this.match(LPCParser.AND);
                        this.state = 708;
                        this.expression(30);
                        }
                        break;
                    case 13:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 709;
                        if (!(this.precpred(this.context, 28))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 28)");
                        }
                        this.state = 710;
                        this.match(LPCParser.OR);
                        this.state = 711;
                        this.expression(29);
                        }
                        break;
                    case 14:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 712;
                        if (!(this.precpred(this.context, 27))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 27)");
                        }
                        this.state = 713;
                        this.match(LPCParser.XOR);
                        this.state = 714;
                        this.expression(28);
                        }
                        break;
                    case 15:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 715;
                        if (!(this.precpred(this.context, 26))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 26)");
                        }
                        this.state = 716;
                        this.match(LPCParser.AND_AND);
                        this.state = 717;
                        this.expression(27);
                        }
                        break;
                    case 16:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 718;
                        if (!(this.precpred(this.context, 25))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 25)");
                        }
                        this.state = 719;
                        this.match(LPCParser.OR_OR);
                        this.state = 720;
                        this.expression(26);
                        }
                        break;
                    case 17:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 721;
                        if (!(this.precpred(this.context, 24))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 24)");
                        }
                        this.state = 722;
                        this.match(LPCParser.ADD_ASSIGN);
                        this.state = 723;
                        this.expression(25);
                        }
                        break;
                    case 18:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 724;
                        if (!(this.precpred(this.context, 23))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 23)");
                        }
                        this.state = 725;
                        this.match(LPCParser.SUB_ASSIGN);
                        this.state = 726;
                        this.expression(24);
                        }
                        break;
                    case 19:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 727;
                        if (!(this.precpred(this.context, 22))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 22)");
                        }
                        this.state = 728;
                        this.match(LPCParser.MUL_ASSIGN);
                        this.state = 729;
                        this.expression(23);
                        }
                        break;
                    case 20:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 730;
                        if (!(this.precpred(this.context, 21))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 21)");
                        }
                        this.state = 731;
                        this.match(LPCParser.DIV_ASSIGN);
                        this.state = 732;
                        this.expression(22);
                        }
                        break;
                    case 21:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 733;
                        if (!(this.precpred(this.context, 20))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 20)");
                        }
                        this.state = 734;
                        this.match(LPCParser.MOD_ASSIGN);
                        this.state = 735;
                        this.expression(21);
                        }
                        break;
                    case 22:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 736;
                        if (!(this.precpred(this.context, 19))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 19)");
                        }
                        this.state = 737;
                        this.match(LPCParser.AND_ASSIGN);
                        this.state = 738;
                        this.expression(20);
                        }
                        break;
                    case 23:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 739;
                        if (!(this.precpred(this.context, 18))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 18)");
                        }
                        this.state = 740;
                        this.match(LPCParser.OR_ASSIGN);
                        this.state = 741;
                        this.expression(19);
                        }
                        break;
                    case 24:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 742;
                        if (!(this.precpred(this.context, 17))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 17)");
                        }
                        this.state = 743;
                        this.match(LPCParser.XOR_ASSIGN);
                        this.state = 744;
                        this.expression(18);
                        }
                        break;
                    case 25:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 745;
                        if (!(this.precpred(this.context, 16))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 16)");
                        }
                        this.state = 746;
                        this.match(LPCParser.SHL);
                        this.state = 747;
                        this.expression(17);
                        }
                        break;
                    case 26:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 748;
                        if (!(this.precpred(this.context, 15))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 15)");
                        }
                        this.state = 749;
                        this.match(LPCParser.SHR);
                        this.state = 750;
                        this.expression(16);
                        }
                        break;
                    case 27:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 751;
                        if (!(this.precpred(this.context, 14))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 14)");
                        }
                        this.state = 752;
                        this.match(LPCParser.QUESTION);
                        this.state = 753;
                        this.expression(0);
                        this.state = 754;
                        this.match(LPCParser.COLON);
                        this.state = 755;
                        this.expression(15);
                        }
                        break;
                    case 28:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 757;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 758;
                        this.match(LPCParser.INC);
                        }
                        break;
                    case 29:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 759;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 760;
                        this.match(LPCParser.DEC);
                        }
                        break;
                    case 30:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 761;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 762;
                        this.assignmentExpression();
                        }
                        break;
                    case 31:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 763;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 764;
                        this.arrayAccessExpression();
                        }
                        break;
                    case 32:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        localContext._callOtherOb = previousContext;
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 765;
                        if (!(this.precpred(this.context, 1))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                        }
                        this.state = 766;
                        this.match(LPCParser.ARROW);
                        this.state = 767;
                        this.callOtherTarget();
                        this.state = 768;
                        this.match(LPCParser.PAREN_OPEN);
                        this.state = 770;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if (_la === 1 || _la === 21 || ((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 201457713) !== 0) || ((((_la - 93)) & ~0x1F) === 0 && ((1 << (_la - 93)) & 55317) !== 0)) {
                            {
                            this.state = 769;
                            this.expressionList();
                            }
                        }

                        this.state = 772;
                        this.match(LPCParser.PAREN_CLOSE);
                        }
                        break;
                    }
                    }
                }
                this.state = 778;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 70, this.context);
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
    public arrayAccessExpression(): ArrayAccessExpressionContext {
        let localContext = new ArrayAccessExpressionContext(this.context, this.state);
        this.enterRule(localContext, 106, LPCParser.RULE_arrayAccessExpression);
        let _la: number;
        try {
            this.state = 801;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 76, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 779;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 781;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 64) {
                    {
                    this.state = 780;
                    this.match(LPCParser.LT);
                    }
                }

                this.state = 783;
                this.expression(0);
                this.state = 784;
                this.match(LPCParser.SQUARE_CLOSE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 786;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 788;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 64) {
                    {
                    this.state = 787;
                    this.match(LPCParser.LT);
                    }
                }

                this.state = 791;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || _la === 21 || ((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 201457713) !== 0) || ((((_la - 93)) & ~0x1F) === 0 && ((1 << (_la - 93)) & 55317) !== 0)) {
                    {
                    this.state = 790;
                    this.expression(0);
                    }
                }

                this.state = 793;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 795;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 64) {
                    {
                    this.state = 794;
                    this.match(LPCParser.LT);
                    }
                }

                this.state = 798;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || _la === 21 || ((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 201457713) !== 0) || ((((_la - 93)) & ~0x1F) === 0 && ((1 << (_la - 93)) & 55317) !== 0)) {
                    {
                    this.state = 797;
                    this.expression(0);
                    }
                }

                this.state = 800;
                this.match(LPCParser.SQUARE_CLOSE);
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
    public expressionList(): ExpressionListContext {
        let localContext = new ExpressionListContext(this.context, this.state);
        this.enterRule(localContext, 108, LPCParser.RULE_expressionList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 803;
            this.expression(0);
            this.state = 808;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 79) {
                {
                {
                this.state = 804;
                this.match(LPCParser.COMMA);
                this.state = 805;
                this.expression(0);
                }
                }
                this.state = 810;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
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
    public assignmentExpression(): AssignmentExpressionContext {
        let localContext = new AssignmentExpressionContext(this.context, this.state);
        this.enterRule(localContext, 110, LPCParser.RULE_assignmentExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 811;
            this.match(LPCParser.ASSIGN);
            this.state = 812;
            this.expression(0);
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
        case 52:
            return this.expression_sempred(localContext as ExpressionContext, predIndex);
        }
        return true;
    }
    private expression_sempred(localContext: ExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 40);
        case 1:
            return this.precpred(this.context, 39);
        case 2:
            return this.precpred(this.context, 38);
        case 3:
            return this.precpred(this.context, 37);
        case 4:
            return this.precpred(this.context, 36);
        case 5:
            return this.precpred(this.context, 35);
        case 6:
            return this.precpred(this.context, 34);
        case 7:
            return this.precpred(this.context, 33);
        case 8:
            return this.precpred(this.context, 32);
        case 9:
            return this.precpred(this.context, 31);
        case 10:
            return this.precpred(this.context, 30);
        case 11:
            return this.precpred(this.context, 29);
        case 12:
            return this.precpred(this.context, 28);
        case 13:
            return this.precpred(this.context, 27);
        case 14:
            return this.precpred(this.context, 26);
        case 15:
            return this.precpred(this.context, 25);
        case 16:
            return this.precpred(this.context, 24);
        case 17:
            return this.precpred(this.context, 23);
        case 18:
            return this.precpred(this.context, 22);
        case 19:
            return this.precpred(this.context, 21);
        case 20:
            return this.precpred(this.context, 20);
        case 21:
            return this.precpred(this.context, 19);
        case 22:
            return this.precpred(this.context, 18);
        case 23:
            return this.precpred(this.context, 17);
        case 24:
            return this.precpred(this.context, 16);
        case 25:
            return this.precpred(this.context, 15);
        case 26:
            return this.precpred(this.context, 14);
        case 27:
            return this.precpred(this.context, 9);
        case 28:
            return this.precpred(this.context, 8);
        case 29:
            return this.precpred(this.context, 7);
        case 30:
            return this.precpred(this.context, 6);
        case 31:
            return this.precpred(this.context, 1);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,115,815,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
        7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,
        13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
        20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,
        26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,
        33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,
        39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
        46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,
        52,2,53,7,53,2,54,7,54,2,55,7,55,1,0,1,0,1,0,5,0,116,8,0,10,0,12,
        0,119,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,5,1,138,8,1,10,1,12,1,141,9,1,3,1,143,8,1,1,2,1,2,
        1,2,1,3,1,3,1,3,3,3,151,8,3,1,3,1,3,1,3,1,3,3,3,157,8,3,1,4,1,4,
        1,5,1,5,1,6,1,6,1,7,1,7,1,8,1,8,1,8,1,8,5,8,171,8,8,10,8,12,8,174,
        9,8,1,8,1,8,1,9,1,9,1,10,1,10,1,11,1,11,3,11,184,8,11,1,12,1,12,
        1,12,3,12,189,8,12,1,13,1,13,1,13,1,13,1,14,1,14,1,15,1,15,1,16,
        1,16,1,16,1,16,1,17,1,17,1,17,1,17,1,17,3,17,208,8,17,1,18,1,18,
        1,18,3,18,213,8,18,1,19,1,19,1,20,5,20,218,8,20,10,20,12,20,221,
        9,20,1,20,3,20,224,8,20,1,20,1,20,1,20,3,20,229,8,20,1,20,1,20,1,
        21,1,21,1,21,1,22,1,22,1,22,1,23,1,23,1,23,5,23,242,8,23,10,23,12,
        23,245,9,23,1,24,3,24,248,8,24,1,24,1,24,1,25,1,25,1,25,1,25,5,25,
        256,8,25,10,25,12,25,259,9,25,3,25,261,8,25,1,25,3,25,264,8,25,1,
        25,1,25,1,26,1,26,1,27,1,27,1,27,1,27,1,27,5,27,275,8,27,10,27,12,
        27,278,9,27,3,27,280,8,27,1,28,1,28,1,28,1,28,5,28,286,8,28,10,28,
        12,28,289,9,28,3,28,291,8,28,1,28,3,28,294,8,28,1,28,1,28,1,28,1,
        29,1,29,1,30,5,30,302,8,30,10,30,12,30,305,9,30,1,30,3,30,308,8,
        30,1,30,1,30,3,30,312,8,30,1,30,1,30,3,30,316,8,30,1,30,1,30,3,30,
        320,8,30,5,30,322,8,30,10,30,12,30,325,9,30,1,30,1,30,1,31,1,31,
        1,32,3,32,332,8,32,1,32,1,32,1,33,1,33,3,33,338,8,33,1,34,1,34,1,
        34,1,34,5,34,344,8,34,10,34,12,34,347,9,34,3,34,349,8,34,1,34,1,
        34,1,34,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,3,35,362,8,35,1,
        36,1,36,1,36,1,37,1,37,5,37,369,8,37,10,37,12,37,372,9,37,1,37,1,
        37,1,38,1,38,3,38,378,8,38,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,
        40,1,40,1,40,1,41,1,41,1,41,1,41,1,41,1,41,1,42,1,42,5,42,398,8,
        42,10,42,12,42,401,9,42,1,42,3,42,404,8,42,1,43,1,43,1,43,1,43,1,
        43,1,43,1,43,5,43,413,8,43,10,43,12,43,416,9,43,1,43,1,43,1,44,1,
        44,3,44,422,8,44,1,44,3,44,425,8,44,1,44,1,44,3,44,429,8,44,1,44,
        3,44,432,8,44,1,44,1,44,1,44,3,44,437,8,44,1,44,3,44,440,8,44,3,
        44,442,8,44,1,45,1,45,1,45,1,45,5,45,448,8,45,10,45,12,45,451,9,
        45,1,46,1,46,1,46,5,46,456,8,46,10,46,12,46,459,9,46,1,47,1,47,1,
        47,1,47,1,47,1,47,3,47,467,8,47,1,47,1,47,1,47,1,47,1,47,1,47,1,
        47,1,47,1,47,1,47,1,47,3,47,480,8,47,1,47,1,47,5,47,484,8,47,10,
        47,12,47,487,9,47,1,47,1,47,3,47,491,8,47,1,47,1,47,3,47,495,8,47,
        1,47,1,47,5,47,499,8,47,10,47,12,47,502,9,47,1,47,1,47,1,47,3,47,
        507,8,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,3,47,518,8,
        47,3,47,520,8,47,1,48,1,48,3,48,524,8,48,1,48,1,48,1,49,1,49,1,49,
        1,49,1,49,3,49,533,8,49,1,50,1,50,1,50,1,50,1,50,3,50,540,8,50,1,
        51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,
        51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,
        51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,
        51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,
        51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,
        51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,
        51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,3,51,628,8,51,1,52,1,52,1,
        52,3,52,633,8,52,1,52,1,52,3,52,637,8,52,1,52,1,52,1,52,1,52,5,52,
        643,8,52,10,52,12,52,646,9,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,
        1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,3,52,666,
        8,52,1,52,1,52,1,52,1,52,3,52,672,8,52,1,52,1,52,1,52,1,52,1,52,
        1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,
        1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,
        1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,
        1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,
        1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,
        1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,
        1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,
        1,52,3,52,771,8,52,1,52,1,52,5,52,775,8,52,10,52,12,52,778,9,52,
        1,53,1,53,3,53,782,8,53,1,53,1,53,1,53,1,53,1,53,3,53,789,8,53,1,
        53,3,53,792,8,53,1,53,1,53,3,53,796,8,53,1,53,3,53,799,8,53,1,53,
        3,53,802,8,53,1,54,1,54,1,54,5,54,807,8,54,10,54,12,54,810,9,54,
        1,55,1,55,1,55,1,55,0,1,104,56,0,2,4,6,8,10,12,14,16,18,20,22,24,
        26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,
        70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,
        110,0,9,2,0,12,12,14,14,2,0,13,13,22,24,3,0,11,11,29,29,44,44,3,
        0,1,1,104,104,107,107,1,0,48,54,2,0,104,104,107,108,1,0,48,52,7,
        0,5,6,17,17,28,28,30,32,36,39,43,43,45,45,2,0,25,25,77,77,923,0,
        117,1,0,0,0,2,142,1,0,0,0,4,144,1,0,0,0,6,156,1,0,0,0,8,158,1,0,
        0,0,10,160,1,0,0,0,12,162,1,0,0,0,14,164,1,0,0,0,16,166,1,0,0,0,
        18,177,1,0,0,0,20,179,1,0,0,0,22,183,1,0,0,0,24,185,1,0,0,0,26,190,
        1,0,0,0,28,194,1,0,0,0,30,196,1,0,0,0,32,198,1,0,0,0,34,207,1,0,
        0,0,36,212,1,0,0,0,38,214,1,0,0,0,40,219,1,0,0,0,42,232,1,0,0,0,
        44,235,1,0,0,0,46,238,1,0,0,0,48,247,1,0,0,0,50,251,1,0,0,0,52,267,
        1,0,0,0,54,269,1,0,0,0,56,281,1,0,0,0,58,298,1,0,0,0,60,303,1,0,
        0,0,62,328,1,0,0,0,64,331,1,0,0,0,66,337,1,0,0,0,68,339,1,0,0,0,
        70,361,1,0,0,0,72,363,1,0,0,0,74,366,1,0,0,0,76,377,1,0,0,0,78,379,
        1,0,0,0,80,386,1,0,0,0,82,389,1,0,0,0,84,395,1,0,0,0,86,405,1,0,
        0,0,88,441,1,0,0,0,90,443,1,0,0,0,92,452,1,0,0,0,94,519,1,0,0,0,
        96,521,1,0,0,0,98,532,1,0,0,0,100,539,1,0,0,0,102,627,1,0,0,0,104,
        671,1,0,0,0,106,801,1,0,0,0,108,803,1,0,0,0,110,811,1,0,0,0,112,
        116,3,36,18,0,113,116,3,2,1,0,114,116,3,32,16,0,115,112,1,0,0,0,
        115,113,1,0,0,0,115,114,1,0,0,0,116,119,1,0,0,0,117,115,1,0,0,0,
        117,118,1,0,0,0,118,120,1,0,0,0,119,117,1,0,0,0,120,121,5,0,0,1,
        121,1,1,0,0,0,122,143,3,6,3,0,123,124,5,21,0,0,124,125,3,12,6,0,
        125,126,3,14,7,0,126,143,1,0,0,0,127,143,3,4,2,0,128,129,5,21,0,
        0,129,130,3,20,10,0,130,131,3,22,11,0,131,143,1,0,0,0,132,133,5,
        21,0,0,133,134,3,30,15,0,134,139,5,1,0,0,135,136,5,79,0,0,136,138,
        5,1,0,0,137,135,1,0,0,0,138,141,1,0,0,0,139,137,1,0,0,0,139,140,
        1,0,0,0,140,143,1,0,0,0,141,139,1,0,0,0,142,122,1,0,0,0,142,123,
        1,0,0,0,142,127,1,0,0,0,142,128,1,0,0,0,142,132,1,0,0,0,143,3,1,
        0,0,0,144,145,5,111,0,0,145,146,5,113,0,0,146,5,1,0,0,0,147,148,
        5,21,0,0,148,150,3,10,5,0,149,151,5,73,0,0,150,149,1,0,0,0,150,151,
        1,0,0,0,151,152,1,0,0,0,152,153,3,14,7,0,153,157,1,0,0,0,154,155,
        5,21,0,0,155,157,3,8,4,0,156,147,1,0,0,0,156,154,1,0,0,0,157,7,1,
        0,0,0,158,159,7,0,0,0,159,9,1,0,0,0,160,161,7,1,0,0,161,11,1,0,0,
        0,162,163,7,2,0,0,163,13,1,0,0,0,164,165,7,3,0,0,165,15,1,0,0,0,
        166,167,5,97,0,0,167,172,5,1,0,0,168,169,5,79,0,0,169,171,5,1,0,
        0,170,168,1,0,0,0,171,174,1,0,0,0,172,170,1,0,0,0,172,173,1,0,0,
        0,173,175,1,0,0,0,174,172,1,0,0,0,175,176,5,98,0,0,176,17,1,0,0,
        0,177,178,3,104,52,0,178,19,1,0,0,0,179,180,5,26,0,0,180,21,1,0,
        0,0,181,184,3,26,13,0,182,184,3,28,14,0,183,181,1,0,0,0,183,182,
        1,0,0,0,184,23,1,0,0,0,185,188,5,1,0,0,186,187,5,81,0,0,187,189,
        5,1,0,0,188,186,1,0,0,0,188,189,1,0,0,0,189,25,1,0,0,0,190,191,5,
        64,0,0,191,192,3,24,12,0,192,193,5,65,0,0,193,27,1,0,0,0,194,195,
        5,107,0,0,195,29,1,0,0,0,196,197,5,33,0,0,197,31,1,0,0,0,198,199,
        5,27,0,0,199,200,5,107,0,0,200,201,5,78,0,0,201,33,1,0,0,0,202,203,
        5,83,0,0,203,208,3,104,52,0,204,205,5,107,0,0,205,206,5,83,0,0,206,
        208,3,104,52,0,207,202,1,0,0,0,207,204,1,0,0,0,208,35,1,0,0,0,209,
        213,3,42,21,0,210,213,3,44,22,0,211,213,3,60,30,0,212,209,1,0,0,
        0,212,210,1,0,0,0,212,211,1,0,0,0,213,37,1,0,0,0,214,215,7,4,0,0,
        215,39,1,0,0,0,216,218,3,38,19,0,217,216,1,0,0,0,218,221,1,0,0,0,
        219,217,1,0,0,0,219,220,1,0,0,0,220,223,1,0,0,0,221,219,1,0,0,0,
        222,224,3,66,33,0,223,222,1,0,0,0,223,224,1,0,0,0,224,225,1,0,0,
        0,225,226,5,1,0,0,226,228,5,97,0,0,227,229,3,46,23,0,228,227,1,0,
        0,0,228,229,1,0,0,0,229,230,1,0,0,0,230,231,5,98,0,0,231,41,1,0,
        0,0,232,233,3,40,20,0,233,234,5,78,0,0,234,43,1,0,0,0,235,236,3,
        40,20,0,236,237,3,74,37,0,237,45,1,0,0,0,238,243,3,48,24,0,239,240,
        5,79,0,0,240,242,3,48,24,0,241,239,1,0,0,0,242,245,1,0,0,0,243,241,
        1,0,0,0,243,244,1,0,0,0,244,47,1,0,0,0,245,243,1,0,0,0,246,248,3,
        66,33,0,247,246,1,0,0,0,247,248,1,0,0,0,248,249,1,0,0,0,249,250,
        5,1,0,0,250,49,1,0,0,0,251,260,5,93,0,0,252,257,3,104,52,0,253,254,
        5,79,0,0,254,256,3,104,52,0,255,253,1,0,0,0,256,259,1,0,0,0,257,
        255,1,0,0,0,257,258,1,0,0,0,258,261,1,0,0,0,259,257,1,0,0,0,260,
        252,1,0,0,0,260,261,1,0,0,0,261,263,1,0,0,0,262,264,5,79,0,0,263,
        262,1,0,0,0,263,264,1,0,0,0,264,265,1,0,0,0,265,266,5,94,0,0,266,
        51,1,0,0,0,267,268,7,5,0,0,268,53,1,0,0,0,269,279,3,52,26,0,270,
        271,5,77,0,0,271,276,3,104,52,0,272,273,5,78,0,0,273,275,3,104,52,
        0,274,272,1,0,0,0,275,278,1,0,0,0,276,274,1,0,0,0,276,277,1,0,0,
        0,277,280,1,0,0,0,278,276,1,0,0,0,279,270,1,0,0,0,279,280,1,0,0,
        0,280,55,1,0,0,0,281,290,5,95,0,0,282,287,3,54,27,0,283,284,5,79,
        0,0,284,286,3,54,27,0,285,283,1,0,0,0,286,289,1,0,0,0,287,285,1,
        0,0,0,287,288,1,0,0,0,288,291,1,0,0,0,289,287,1,0,0,0,290,282,1,
        0,0,0,290,291,1,0,0,0,291,293,1,0,0,0,292,294,5,79,0,0,293,292,1,
        0,0,0,293,294,1,0,0,0,294,295,1,0,0,0,295,296,5,102,0,0,296,297,
        5,98,0,0,297,57,1,0,0,0,298,299,7,6,0,0,299,59,1,0,0,0,300,302,3,
        58,29,0,301,300,1,0,0,0,302,305,1,0,0,0,303,301,1,0,0,0,303,304,
        1,0,0,0,304,307,1,0,0,0,305,303,1,0,0,0,306,308,3,66,33,0,307,306,
        1,0,0,0,307,308,1,0,0,0,308,309,1,0,0,0,309,311,5,1,0,0,310,312,
        3,110,55,0,311,310,1,0,0,0,311,312,1,0,0,0,312,323,1,0,0,0,313,315,
        5,79,0,0,314,316,5,57,0,0,315,314,1,0,0,0,315,316,1,0,0,0,316,317,
        1,0,0,0,317,319,5,1,0,0,318,320,3,110,55,0,319,318,1,0,0,0,319,320,
        1,0,0,0,320,322,1,0,0,0,321,313,1,0,0,0,322,325,1,0,0,0,323,321,
        1,0,0,0,323,324,1,0,0,0,324,326,1,0,0,0,325,323,1,0,0,0,326,327,
        5,78,0,0,327,61,1,0,0,0,328,329,7,7,0,0,329,63,1,0,0,0,330,332,3,
        62,31,0,331,330,1,0,0,0,331,332,1,0,0,0,332,333,1,0,0,0,333,334,
        5,57,0,0,334,65,1,0,0,0,335,338,3,62,31,0,336,338,3,64,32,0,337,
        335,1,0,0,0,337,336,1,0,0,0,338,67,1,0,0,0,339,340,5,97,0,0,340,
        348,5,77,0,0,341,349,3,104,52,0,342,344,3,70,35,0,343,342,1,0,0,
        0,344,347,1,0,0,0,345,343,1,0,0,0,345,346,1,0,0,0,346,349,1,0,0,
        0,347,345,1,0,0,0,348,341,1,0,0,0,348,345,1,0,0,0,349,350,1,0,0,
        0,350,351,5,77,0,0,351,352,5,98,0,0,352,69,1,0,0,0,353,362,3,72,
        36,0,354,362,3,74,37,0,355,362,3,76,38,0,356,362,3,94,47,0,357,362,
        3,98,49,0,358,362,3,60,30,0,359,362,3,6,3,0,360,362,3,96,48,0,361,
        353,1,0,0,0,361,354,1,0,0,0,361,355,1,0,0,0,361,356,1,0,0,0,361,
        357,1,0,0,0,361,358,1,0,0,0,361,359,1,0,0,0,361,360,1,0,0,0,362,
        71,1,0,0,0,363,364,3,104,52,0,364,365,5,78,0,0,365,73,1,0,0,0,366,
        370,5,99,0,0,367,369,3,70,35,0,368,367,1,0,0,0,369,372,1,0,0,0,370,
        368,1,0,0,0,370,371,1,0,0,0,371,373,1,0,0,0,372,370,1,0,0,0,373,
        374,5,100,0,0,374,75,1,0,0,0,375,378,3,84,42,0,376,378,3,86,43,0,
        377,375,1,0,0,0,377,376,1,0,0,0,378,77,1,0,0,0,379,380,5,12,0,0,
        380,381,5,22,0,0,381,382,5,97,0,0,382,383,3,104,52,0,383,384,5,98,
        0,0,384,385,3,70,35,0,385,79,1,0,0,0,386,387,5,12,0,0,387,388,3,
        70,35,0,388,81,1,0,0,0,389,390,5,22,0,0,390,391,5,97,0,0,391,392,
        3,104,52,0,392,393,5,98,0,0,393,394,3,70,35,0,394,83,1,0,0,0,395,
        399,3,82,41,0,396,398,3,78,39,0,397,396,1,0,0,0,398,401,1,0,0,0,
        399,397,1,0,0,0,399,400,1,0,0,0,400,403,1,0,0,0,401,399,1,0,0,0,
        402,404,3,80,40,0,403,402,1,0,0,0,403,404,1,0,0,0,404,85,1,0,0,0,
        405,406,5,40,0,0,406,407,5,97,0,0,407,408,3,104,52,0,408,409,5,98,
        0,0,409,414,5,99,0,0,410,413,3,90,45,0,411,413,3,92,46,0,412,410,
        1,0,0,0,412,411,1,0,0,0,413,416,1,0,0,0,414,412,1,0,0,0,414,415,
        1,0,0,0,415,417,1,0,0,0,416,414,1,0,0,0,417,418,5,100,0,0,418,87,
        1,0,0,0,419,425,5,107,0,0,420,422,5,56,0,0,421,420,1,0,0,0,421,422,
        1,0,0,0,422,423,1,0,0,0,423,425,5,104,0,0,424,419,1,0,0,0,424,421,
        1,0,0,0,425,442,1,0,0,0,426,432,5,107,0,0,427,429,5,56,0,0,428,427,
        1,0,0,0,428,429,1,0,0,0,429,430,1,0,0,0,430,432,5,104,0,0,431,426,
        1,0,0,0,431,428,1,0,0,0,432,433,1,0,0,0,433,439,5,80,0,0,434,440,
        5,107,0,0,435,437,5,56,0,0,436,435,1,0,0,0,436,437,1,0,0,0,437,438,
        1,0,0,0,438,440,5,104,0,0,439,434,1,0,0,0,439,436,1,0,0,0,440,442,
        1,0,0,0,441,424,1,0,0,0,441,431,1,0,0,0,442,89,1,0,0,0,443,444,5,
        4,0,0,444,445,3,88,44,0,445,449,5,77,0,0,446,448,3,70,35,0,447,446,
        1,0,0,0,448,451,1,0,0,0,449,447,1,0,0,0,449,450,1,0,0,0,450,91,1,
        0,0,0,451,449,1,0,0,0,452,453,5,9,0,0,453,457,5,77,0,0,454,456,3,
        70,35,0,455,454,1,0,0,0,456,459,1,0,0,0,457,455,1,0,0,0,457,458,
        1,0,0,0,458,93,1,0,0,0,459,457,1,0,0,0,460,461,5,47,0,0,461,462,
        5,97,0,0,462,463,3,104,52,0,463,466,5,98,0,0,464,467,3,70,35,0,465,
        467,5,78,0,0,466,464,1,0,0,0,466,465,1,0,0,0,467,520,1,0,0,0,468,
        469,5,10,0,0,469,470,3,70,35,0,470,471,5,47,0,0,471,472,5,97,0,0,
        472,473,3,104,52,0,473,474,5,98,0,0,474,475,5,78,0,0,475,520,1,0,
        0,0,476,477,5,18,0,0,477,479,5,97,0,0,478,480,3,104,52,0,479,478,
        1,0,0,0,479,480,1,0,0,0,480,485,1,0,0,0,481,482,5,79,0,0,482,484,
        3,104,52,0,483,481,1,0,0,0,484,487,1,0,0,0,485,483,1,0,0,0,485,486,
        1,0,0,0,486,488,1,0,0,0,487,485,1,0,0,0,488,490,5,78,0,0,489,491,
        3,104,52,0,490,489,1,0,0,0,490,491,1,0,0,0,491,492,1,0,0,0,492,494,
        5,78,0,0,493,495,3,104,52,0,494,493,1,0,0,0,494,495,1,0,0,0,495,
        500,1,0,0,0,496,497,5,79,0,0,497,499,3,104,52,0,498,496,1,0,0,0,
        499,502,1,0,0,0,500,498,1,0,0,0,500,501,1,0,0,0,501,503,1,0,0,0,
        502,500,1,0,0,0,503,506,5,98,0,0,504,507,3,70,35,0,505,507,5,78,
        0,0,506,504,1,0,0,0,506,505,1,0,0,0,507,520,1,0,0,0,508,509,5,19,
        0,0,509,510,5,97,0,0,510,511,3,66,33,0,511,512,5,1,0,0,512,513,7,
        8,0,0,513,514,3,104,52,0,514,517,5,98,0,0,515,518,3,70,35,0,516,
        518,5,78,0,0,517,515,1,0,0,0,517,516,1,0,0,0,518,520,1,0,0,0,519,
        460,1,0,0,0,519,468,1,0,0,0,519,476,1,0,0,0,519,508,1,0,0,0,520,
        95,1,0,0,0,521,523,5,35,0,0,522,524,3,104,52,0,523,522,1,0,0,0,523,
        524,1,0,0,0,524,525,1,0,0,0,525,526,5,78,0,0,526,97,1,0,0,0,527,
        528,5,3,0,0,528,533,5,78,0,0,529,530,5,8,0,0,530,533,5,78,0,0,531,
        533,3,96,48,0,532,527,1,0,0,0,532,529,1,0,0,0,532,531,1,0,0,0,533,
        99,1,0,0,0,534,540,5,1,0,0,535,536,5,97,0,0,536,537,5,1,0,0,537,
        540,5,98,0,0,538,540,5,107,0,0,539,534,1,0,0,0,539,535,1,0,0,0,539,
        538,1,0,0,0,540,101,1,0,0,0,541,542,5,82,0,0,542,628,5,1,0,0,543,
        544,5,21,0,0,544,545,5,82,0,0,545,628,3,104,52,0,546,547,5,21,0,
        0,547,548,5,82,0,0,548,628,5,55,0,0,549,550,5,21,0,0,550,551,5,82,
        0,0,551,628,5,56,0,0,552,553,5,21,0,0,553,554,5,82,0,0,554,628,5,
        57,0,0,555,556,5,21,0,0,556,557,5,82,0,0,557,628,5,58,0,0,558,559,
        5,21,0,0,559,560,5,82,0,0,560,628,5,59,0,0,561,562,5,21,0,0,562,
        563,5,82,0,0,563,628,5,64,0,0,564,565,5,21,0,0,565,566,5,82,0,0,
        566,628,5,65,0,0,567,568,5,21,0,0,568,569,5,82,0,0,569,628,5,66,
        0,0,570,571,5,21,0,0,571,572,5,82,0,0,572,628,5,67,0,0,573,574,5,
        21,0,0,574,575,5,82,0,0,575,628,5,68,0,0,576,577,5,21,0,0,577,578,
        5,82,0,0,578,628,5,69,0,0,579,580,5,21,0,0,580,581,5,82,0,0,581,
        628,5,70,0,0,582,583,5,21,0,0,583,584,5,82,0,0,584,628,5,71,0,0,
        585,586,5,21,0,0,586,587,5,82,0,0,587,628,5,72,0,0,588,589,5,21,
        0,0,589,590,5,82,0,0,590,628,5,74,0,0,591,592,5,21,0,0,592,593,5,
        82,0,0,593,628,5,75,0,0,594,595,5,21,0,0,595,596,5,82,0,0,596,628,
        5,85,0,0,597,598,5,21,0,0,598,599,5,82,0,0,599,628,5,86,0,0,600,
        601,5,21,0,0,601,602,5,82,0,0,602,628,5,87,0,0,603,604,5,21,0,0,
        604,605,5,82,0,0,605,628,5,88,0,0,606,607,5,21,0,0,607,608,5,82,
        0,0,608,628,5,89,0,0,609,610,5,21,0,0,610,611,5,82,0,0,611,628,5,
        90,0,0,612,613,5,21,0,0,613,614,5,82,0,0,614,628,5,91,0,0,615,616,
        5,21,0,0,616,617,5,82,0,0,617,628,5,92,0,0,618,619,5,21,0,0,619,
        620,5,82,0,0,620,628,5,76,0,0,621,622,5,21,0,0,622,623,5,82,0,0,
        623,628,5,62,0,0,624,625,5,21,0,0,625,626,5,82,0,0,626,628,5,63,
        0,0,627,541,1,0,0,0,627,543,1,0,0,0,627,546,1,0,0,0,627,549,1,0,
        0,0,627,552,1,0,0,0,627,555,1,0,0,0,627,558,1,0,0,0,627,561,1,0,
        0,0,627,564,1,0,0,0,627,567,1,0,0,0,627,570,1,0,0,0,627,573,1,0,
        0,0,627,576,1,0,0,0,627,579,1,0,0,0,627,582,1,0,0,0,627,585,1,0,
        0,0,627,588,1,0,0,0,627,591,1,0,0,0,627,594,1,0,0,0,627,597,1,0,
        0,0,627,600,1,0,0,0,627,603,1,0,0,0,627,606,1,0,0,0,627,609,1,0,
        0,0,627,612,1,0,0,0,627,615,1,0,0,0,627,618,1,0,0,0,627,621,1,0,
        0,0,627,624,1,0,0,0,628,103,1,0,0,0,629,630,6,52,-1,0,630,672,5,
        1,0,0,631,633,5,56,0,0,632,631,1,0,0,0,632,633,1,0,0,0,633,634,1,
        0,0,0,634,672,5,104,0,0,635,637,5,56,0,0,636,635,1,0,0,0,636,637,
        1,0,0,0,637,638,1,0,0,0,638,672,5,105,0,0,639,672,5,107,0,0,640,
        644,5,107,0,0,641,643,5,107,0,0,642,641,1,0,0,0,643,646,1,0,0,0,
        644,642,1,0,0,0,644,645,1,0,0,0,645,672,1,0,0,0,646,644,1,0,0,0,
        647,672,5,108,0,0,648,649,5,97,0,0,649,650,3,104,52,0,650,651,5,
        98,0,0,651,672,1,0,0,0,652,672,3,68,34,0,653,672,3,102,51,0,654,
        655,5,73,0,0,655,672,3,104,52,13,656,657,5,60,0,0,657,672,3,104,
        52,12,658,659,5,61,0,0,659,672,3,104,52,11,660,661,5,56,0,0,661,
        672,3,104,52,10,662,663,5,1,0,0,663,665,5,97,0,0,664,666,3,108,54,
        0,665,664,1,0,0,0,665,666,1,0,0,0,666,667,1,0,0,0,667,672,5,98,0,
        0,668,672,3,56,28,0,669,672,3,50,25,0,670,672,3,34,17,0,671,629,
        1,0,0,0,671,632,1,0,0,0,671,636,1,0,0,0,671,639,1,0,0,0,671,640,
        1,0,0,0,671,647,1,0,0,0,671,648,1,0,0,0,671,652,1,0,0,0,671,653,
        1,0,0,0,671,654,1,0,0,0,671,656,1,0,0,0,671,658,1,0,0,0,671,660,
        1,0,0,0,671,662,1,0,0,0,671,668,1,0,0,0,671,669,1,0,0,0,671,670,
        1,0,0,0,672,776,1,0,0,0,673,674,10,40,0,0,674,675,5,55,0,0,675,775,
        3,104,52,41,676,677,10,39,0,0,677,678,5,56,0,0,678,775,3,104,52,
        40,679,680,10,38,0,0,680,681,5,57,0,0,681,775,3,104,52,39,682,683,
        10,37,0,0,683,684,5,58,0,0,684,775,3,104,52,38,685,686,10,36,0,0,
        686,687,5,59,0,0,687,775,3,104,52,37,688,689,10,35,0,0,689,690,5,
        64,0,0,690,775,3,104,52,36,691,692,10,34,0,0,692,693,5,65,0,0,693,
        775,3,104,52,35,694,695,10,33,0,0,695,696,5,66,0,0,696,775,3,104,
        52,34,697,698,10,32,0,0,698,699,5,67,0,0,699,775,3,104,52,33,700,
        701,10,31,0,0,701,702,5,68,0,0,702,775,3,104,52,32,703,704,10,30,
        0,0,704,705,5,69,0,0,705,775,3,104,52,31,706,707,10,29,0,0,707,708,
        5,70,0,0,708,775,3,104,52,30,709,710,10,28,0,0,710,711,5,71,0,0,
        711,775,3,104,52,29,712,713,10,27,0,0,713,714,5,72,0,0,714,775,3,
        104,52,28,715,716,10,26,0,0,716,717,5,74,0,0,717,775,3,104,52,27,
        718,719,10,25,0,0,719,720,5,75,0,0,720,775,3,104,52,26,721,722,10,
        24,0,0,722,723,5,85,0,0,723,775,3,104,52,25,724,725,10,23,0,0,725,
        726,5,86,0,0,726,775,3,104,52,24,727,728,10,22,0,0,728,729,5,87,
        0,0,729,775,3,104,52,23,730,731,10,21,0,0,731,732,5,88,0,0,732,775,
        3,104,52,22,733,734,10,20,0,0,734,735,5,89,0,0,735,775,3,104,52,
        21,736,737,10,19,0,0,737,738,5,90,0,0,738,775,3,104,52,20,739,740,
        10,18,0,0,740,741,5,91,0,0,741,775,3,104,52,19,742,743,10,17,0,0,
        743,744,5,92,0,0,744,775,3,104,52,18,745,746,10,16,0,0,746,747,5,
        62,0,0,747,775,3,104,52,17,748,749,10,15,0,0,749,750,5,63,0,0,750,
        775,3,104,52,16,751,752,10,14,0,0,752,753,5,76,0,0,753,754,3,104,
        52,0,754,755,5,77,0,0,755,756,3,104,52,15,756,775,1,0,0,0,757,758,
        10,9,0,0,758,775,5,60,0,0,759,760,10,8,0,0,760,775,5,61,0,0,761,
        762,10,7,0,0,762,775,3,110,55,0,763,764,10,6,0,0,764,775,3,106,53,
        0,765,766,10,1,0,0,766,767,5,96,0,0,767,768,3,100,50,0,768,770,5,
        97,0,0,769,771,3,108,54,0,770,769,1,0,0,0,770,771,1,0,0,0,771,772,
        1,0,0,0,772,773,5,98,0,0,773,775,1,0,0,0,774,673,1,0,0,0,774,676,
        1,0,0,0,774,679,1,0,0,0,774,682,1,0,0,0,774,685,1,0,0,0,774,688,
        1,0,0,0,774,691,1,0,0,0,774,694,1,0,0,0,774,697,1,0,0,0,774,700,
        1,0,0,0,774,703,1,0,0,0,774,706,1,0,0,0,774,709,1,0,0,0,774,712,
        1,0,0,0,774,715,1,0,0,0,774,718,1,0,0,0,774,721,1,0,0,0,774,724,
        1,0,0,0,774,727,1,0,0,0,774,730,1,0,0,0,774,733,1,0,0,0,774,736,
        1,0,0,0,774,739,1,0,0,0,774,742,1,0,0,0,774,745,1,0,0,0,774,748,
        1,0,0,0,774,751,1,0,0,0,774,757,1,0,0,0,774,759,1,0,0,0,774,761,
        1,0,0,0,774,763,1,0,0,0,774,765,1,0,0,0,775,778,1,0,0,0,776,774,
        1,0,0,0,776,777,1,0,0,0,777,105,1,0,0,0,778,776,1,0,0,0,779,781,
        5,101,0,0,780,782,5,64,0,0,781,780,1,0,0,0,781,782,1,0,0,0,782,783,
        1,0,0,0,783,784,3,104,52,0,784,785,5,102,0,0,785,802,1,0,0,0,786,
        788,5,101,0,0,787,789,5,64,0,0,788,787,1,0,0,0,788,789,1,0,0,0,789,
        791,1,0,0,0,790,792,3,104,52,0,791,790,1,0,0,0,791,792,1,0,0,0,792,
        793,1,0,0,0,793,795,5,80,0,0,794,796,5,64,0,0,795,794,1,0,0,0,795,
        796,1,0,0,0,796,798,1,0,0,0,797,799,3,104,52,0,798,797,1,0,0,0,798,
        799,1,0,0,0,799,800,1,0,0,0,800,802,5,102,0,0,801,779,1,0,0,0,801,
        786,1,0,0,0,802,107,1,0,0,0,803,808,3,104,52,0,804,805,5,79,0,0,
        805,807,3,104,52,0,806,804,1,0,0,0,807,810,1,0,0,0,808,806,1,0,0,
        0,808,809,1,0,0,0,809,109,1,0,0,0,810,808,1,0,0,0,811,812,5,84,0,
        0,812,813,3,104,52,0,813,111,1,0,0,0,78,115,117,139,142,150,156,
        172,183,188,207,212,219,223,228,243,247,257,260,263,276,279,287,
        290,293,303,307,311,315,319,323,331,337,345,348,361,370,377,399,
        403,412,414,421,424,428,431,436,439,441,449,457,466,479,485,490,
        494,500,506,517,519,523,532,539,627,632,636,644,665,671,770,774,
        776,781,788,791,795,798,801,808
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
    public HASH(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.HASH, 0);
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
    public directiveTypeInclude(): DirectiveTypeIncludeContext | null {
        return this.getRuleContext(0, DirectiveTypeIncludeContext);
    }
    public directiveIncludeFile(): DirectiveIncludeFileContext | null {
        return this.getRuleContext(0, DirectiveIncludeFileContext);
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
    public IF(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.IF, 0);
    }
    public IFDEF(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.IFDEF, 0);
    }
    public IFNDEF(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.IFNDEF, 0);
    }
    public ELIF(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.ELIF, 0);
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
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INHERIT(): antlr.TerminalNode {
        return this.getToken(LPCParser.INHERIT, 0)!;
    }
    public StringLiteral(): antlr.TerminalNode {
        return this.getToken(LPCParser.StringLiteral, 0)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(LPCParser.SEMI, 0)!;
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
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
    }
    public PAREN_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_OPEN, 0)!;
    }
    public PAREN_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.PAREN_CLOSE, 0)!;
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
    public compoundStatement(): CompoundStatementContext {
        return this.getRuleContext(0, CompoundStatementContext)!;
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
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
    }
    public typeSpecifier(): TypeSpecifierContext | null {
        return this.getRuleContext(0, TypeSpecifierContext);
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


export class ArrayExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ARRAY_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.ARRAY_OPEN, 0)!;
    }
    public ARRAY_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.ARRAY_CLOSE, 0)!;
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


export class MappingKeyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IntegerConstant(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.IntegerConstant, 0);
    }
    public StringLiteral(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.StringLiteral, 0);
    }
    public CharacterConstant(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.CharacterConstant, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_mappingKey;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterMappingKey) {
             listener.enterMappingKey(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitMappingKey) {
             listener.exitMappingKey(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitMappingKey) {
            return visitor.visitMappingKey(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MappingContentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public mappingKey(): MappingKeyContext {
        return this.getRuleContext(0, MappingKeyContext)!;
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.COLON, 0);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
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
    public override get ruleIndex(): number {
        return LPCParser.RULE_mappingExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterMappingExpression) {
             listener.enterMappingExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitMappingExpression) {
             listener.exitMappingExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitMappingExpression) {
            return visitor.visitMappingExpression(this);
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
    public variableModifier(): VariableModifierContext[];
    public variableModifier(i: number): VariableModifierContext | null;
    public variableModifier(i?: number): VariableModifierContext[] | VariableModifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VariableModifierContext);
        }

        return this.getRuleContext(i, VariableModifierContext);
    }
    public typeSpecifier(): TypeSpecifierContext | null {
        return this.getRuleContext(0, TypeSpecifierContext);
    }
    public assignmentExpression(): AssignmentExpressionContext[];
    public assignmentExpression(i: number): AssignmentExpressionContext | null;
    public assignmentExpression(i?: number): AssignmentExpressionContext[] | AssignmentExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(AssignmentExpressionContext);
        }

        return this.getRuleContext(i, AssignmentExpressionContext);
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
    public STRUCT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.STRUCT, 0);
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
    public compoundStatement(): CompoundStatementContext | null {
        return this.getRuleContext(0, CompoundStatementContext);
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


export class CompoundStatementContext extends antlr.ParserRuleContext {
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
        return LPCParser.RULE_compoundStatement;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterCompoundStatement) {
             listener.enterCompoundStatement(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitCompoundStatement) {
             listener.exitCompoundStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitCompoundStatement) {
            return visitor.visitCompoundStatement(this);
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
    public WHILE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.WHILE, 0);
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
    public statement(): StatementContext | null {
        return this.getRuleContext(0, StatementContext);
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
    public DO(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DO, 0);
    }
    public FOR(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.FOR, 0);
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
    public FOREACH(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.FOREACH, 0);
    }
    public typeSpecifier(): TypeSpecifierContext | null {
        return this.getRuleContext(0, TypeSpecifierContext);
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
    }
    public IN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.IN, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.COLON, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_iterationStatement;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterIterationStatement) {
             listener.enterIterationStatement(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitIterationStatement) {
             listener.exitIterationStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitIterationStatement) {
            return visitor.visitIterationStatement(this);
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


export class ExpressionContext extends antlr.ParserRuleContext {
    public _callOtherOb?: ExpressionContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
    }
    public IntegerConstant(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.IntegerConstant, 0);
    }
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.MINUS, 0);
    }
    public FloatingConstant(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.FloatingConstant, 0);
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
    public CharacterConstant(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.CharacterConstant, 0);
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
    public inlineClosureExpression(): InlineClosureExpressionContext | null {
        return this.getRuleContext(0, InlineClosureExpressionContext);
    }
    public lambdaExpression(): LambdaExpressionContext | null {
        return this.getRuleContext(0, LambdaExpressionContext);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.NOT, 0);
    }
    public INC(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.INC, 0);
    }
    public DEC(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DEC, 0);
    }
    public expressionList(): ExpressionListContext | null {
        return this.getRuleContext(0, ExpressionListContext);
    }
    public mappingExpression(): MappingExpressionContext | null {
        return this.getRuleContext(0, MappingExpressionContext);
    }
    public arrayExpression(): ArrayExpressionContext | null {
        return this.getRuleContext(0, ArrayExpressionContext);
    }
    public inheritSuperExpression(): InheritSuperExpressionContext | null {
        return this.getRuleContext(0, InheritSuperExpressionContext);
    }
    public PLUS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PLUS, 0);
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
    public XOR_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.XOR_ASSIGN, 0);
    }
    public SHL(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SHL, 0);
    }
    public SHR(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SHR, 0);
    }
    public QUESTION(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.QUESTION, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.COLON, 0);
    }
    public assignmentExpression(): AssignmentExpressionContext | null {
        return this.getRuleContext(0, AssignmentExpressionContext);
    }
    public arrayAccessExpression(): ArrayAccessExpressionContext | null {
        return this.getRuleContext(0, ArrayAccessExpressionContext);
    }
    public ARROW(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.ARROW, 0);
    }
    public callOtherTarget(): CallOtherTargetContext | null {
        return this.getRuleContext(0, CallOtherTargetContext);
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


export class ArrayAccessExpressionContext extends antlr.ParserRuleContext {
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
    public override get ruleIndex(): number {
        return LPCParser.RULE_arrayAccessExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterArrayAccessExpression) {
             listener.enterArrayAccessExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitArrayAccessExpression) {
             listener.exitArrayAccessExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitArrayAccessExpression) {
            return visitor.visitArrayAccessExpression(this);
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
    public ASSIGN(): antlr.TerminalNode {
        return this.getToken(LPCParser.ASSIGN, 0)!;
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

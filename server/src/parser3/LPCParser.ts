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
    public static readonly SUPER_ACCESSOR = 82;
    public static readonly ASSIGN = 83;
    public static readonly ADD_ASSIGN = 84;
    public static readonly SUB_ASSIGN = 85;
    public static readonly MUL_ASSIGN = 86;
    public static readonly DIV_ASSIGN = 87;
    public static readonly MOD_ASSIGN = 88;
    public static readonly AND_ASSIGN = 89;
    public static readonly OR_ASSIGN = 90;
    public static readonly XOR_ASSIGN = 91;
    public static readonly ARRAY_OPEN = 92;
    public static readonly ARRAY_CLOSE = 93;
    public static readonly MAPPING_OPEN = 94;
    public static readonly ARROW = 95;
    public static readonly PAREN_OPEN = 96;
    public static readonly PAREN_CLOSE = 97;
    public static readonly CURLY_OPEN = 98;
    public static readonly CURLY_CLOSE = 99;
    public static readonly SQUARE_OPEN = 100;
    public static readonly SQUARE_CLOSE = 101;
    public static readonly BACKSLASH = 102;
    public static readonly IntegerConstant = 103;
    public static readonly FloatingConstant = 104;
    public static readonly STRING_START = 105;
    public static readonly StringLiteral = 106;
    public static readonly CharacterConstant = 107;
    public static readonly COMMENT = 108;
    public static readonly LINE_COMMENT = 109;
    public static readonly DEFINE = 110;
    public static readonly WS = 111;
    public static readonly END_DEFINE = 112;
    public static readonly STRING_END = 113;
    public static readonly NEWLINE = 114;
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
    public static readonly RULE_expression = 51;
    public static readonly RULE_arrayAccessExpression = 52;
    public static readonly RULE_expressionList = 53;
    public static readonly RULE_assignmentExpression = 54;

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
        "'||'", "'?'", "':'", "';'", "','", "'..'", "'.'", "'::'", "'='", 
        "'+='", "'-='", "'*='", "'/='", "'%='", "'&='", "'|='", "'^='", 
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
        "COLON", "SEMI", "COMMA", "DOUBLEDOT", "DOT", "SUPER_ACCESSOR", 
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
        "jumpStatement", "callOtherTarget", "expression", "arrayAccessExpression", 
        "expressionList", "assignmentExpression",
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
            this.state = 115;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3626106978) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 41887985) !== 0) || _la === 110) {
                {
                this.state = 113;
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
                    this.state = 110;
                    this.declaration();
                    }
                    break;
                case LPCParser.HASH:
                case LPCParser.DEFINE:
                    {
                    this.state = 111;
                    this.preprocessorDirective();
                    }
                    break;
                case LPCParser.INHERIT:
                    {
                    this.state = 112;
                    this.inheritStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 117;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 118;
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
            this.state = 140;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 120;
                this.selectionDirective();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 121;
                this.match(LPCParser.HASH);
                this.state = 122;
                this.directiveTypeWithArguments();
                this.state = 123;
                this.directiveArgument();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 125;
                this.definePreprocessorDirective();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 126;
                this.match(LPCParser.HASH);
                this.state = 127;
                this.directiveTypeInclude();
                this.state = 128;
                this.directiveIncludeFile();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 130;
                this.match(LPCParser.HASH);
                this.state = 131;
                this.directiveTypePragma();
                this.state = 132;
                this.match(LPCParser.Identifier);
                this.state = 137;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 79) {
                    {
                    {
                    this.state = 133;
                    this.match(LPCParser.COMMA);
                    this.state = 134;
                    this.match(LPCParser.Identifier);
                    }
                    }
                    this.state = 139;
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
            this.state = 142;
            this.match(LPCParser.DEFINE);
            this.state = 143;
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
        try {
            this.state = 151;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 145;
                this.match(LPCParser.HASH);
                this.state = 146;
                this.selectionDirectiveTypeWithArg();
                this.state = 147;
                this.directiveArgument();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 149;
                this.match(LPCParser.HASH);
                this.state = 150;
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
            this.state = 153;
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
            this.state = 155;
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
            this.state = 157;
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
            this.state = 159;
            _la = this.tokenStream.LA(1);
            if(!(_la === 1 || _la === 103 || _la === 106)) {
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
            this.state = 161;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 162;
            this.match(LPCParser.Identifier);
            this.state = 167;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 79) {
                {
                {
                this.state = 163;
                this.match(LPCParser.COMMA);
                this.state = 164;
                this.match(LPCParser.Identifier);
                }
                }
                this.state = 169;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 170;
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
            this.state = 172;
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
            this.state = 174;
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
            this.state = 178;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.LT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 176;
                this.directiveIncludeFileGlobal();
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 177;
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
            this.state = 180;
            this.match(LPCParser.Identifier);
            this.state = 183;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 81) {
                {
                this.state = 181;
                this.match(LPCParser.DOT);
                this.state = 182;
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
            this.state = 185;
            this.match(LPCParser.LT);
            this.state = 186;
            this.directiveIncludeFilename();
            this.state = 187;
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
            this.state = 189;
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
            this.state = 191;
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
            this.state = 193;
            this.match(LPCParser.INHERIT);
            this.state = 194;
            this.match(LPCParser.StringLiteral);
            this.state = 195;
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
            this.state = 202;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.SUPER_ACCESSOR:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 197;
                this.match(LPCParser.SUPER_ACCESSOR);
                this.state = 198;
                this.expression(0);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 199;
                this.match(LPCParser.StringLiteral);
                this.state = 200;
                this.match(LPCParser.SUPER_ACCESSOR);
                this.state = 201;
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
            this.state = 207;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 204;
                this.functionHeaderDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 205;
                this.functionDeclaration();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 206;
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
            this.state = 209;
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
            this.state = 214;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 48)) & ~0x1F) === 0 && ((1 << (_la - 48)) & 127) !== 0)) {
                {
                {
                this.state = 211;
                this.functionModifier();
                }
                }
                this.state = 216;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 218;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33564913) !== 0)) {
                {
                this.state = 217;
                this.typeSpecifier();
                }
            }

            this.state = 220;
            this.match(LPCParser.Identifier);
            this.state = 221;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 223;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792098) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33564913) !== 0)) {
                {
                this.state = 222;
                this.parameterList();
                }
            }

            this.state = 225;
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
            this.state = 227;
            this.functionHeader();
            this.state = 228;
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
            this.state = 230;
            this.functionHeader();
            this.state = 231;
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
            this.state = 233;
            this.parameter();
            this.state = 238;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 79) {
                {
                {
                this.state = 234;
                this.match(LPCParser.COMMA);
                this.state = 235;
                this.parameter();
                }
                }
                this.state = 240;
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
            this.state = 242;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33564913) !== 0)) {
                {
                this.state = 241;
                this.typeSpecifier();
                }
            }

            this.state = 244;
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
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 246;
            this.match(LPCParser.ARRAY_OPEN);
            this.state = 255;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1 || ((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 67239985) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55317) !== 0)) {
                {
                this.state = 247;
                this.expression(0);
                this.state = 252;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 79) {
                    {
                    {
                    this.state = 248;
                    this.match(LPCParser.COMMA);
                    this.state = 249;
                    this.expression(0);
                    }
                    }
                    this.state = 254;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 257;
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
            this.state = 259;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 25) !== 0))) {
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
            this.state = 261;
            this.mappingKey();
            this.state = 271;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 77) {
                {
                this.state = 262;
                this.match(LPCParser.COLON);
                this.state = 263;
                this.expression(0);
                this.state = 268;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 78) {
                    {
                    {
                    this.state = 264;
                    this.match(LPCParser.SEMI);
                    this.state = 265;
                    this.expression(0);
                    }
                    }
                    this.state = 270;
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
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 273;
            this.match(LPCParser.MAPPING_OPEN);
            this.state = 282;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 25) !== 0)) {
                {
                this.state = 274;
                this.mappingContent();
                this.state = 279;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 79) {
                    {
                    {
                    this.state = 275;
                    this.match(LPCParser.COMMA);
                    this.state = 276;
                    this.mappingContent();
                    }
                    }
                    this.state = 281;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 284;
            this.match(LPCParser.SQUARE_CLOSE);
            this.state = 285;
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
            this.state = 287;
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
            this.state = 292;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 48)) & ~0x1F) === 0 && ((1 << (_la - 48)) & 31) !== 0)) {
                {
                {
                this.state = 289;
                this.variableModifier();
                }
                }
                this.state = 294;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 296;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33564913) !== 0)) {
                {
                this.state = 295;
                this.typeSpecifier();
                }
            }

            this.state = 298;
            this.match(LPCParser.Identifier);
            this.state = 300;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 83) {
                {
                this.state = 299;
                this.assignmentExpression();
                }
            }

            this.state = 312;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 79) {
                {
                {
                this.state = 302;
                this.match(LPCParser.COMMA);
                this.state = 304;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 57) {
                    {
                    this.state = 303;
                    this.match(LPCParser.STAR);
                    }
                }

                this.state = 306;
                this.match(LPCParser.Identifier);
                this.state = 308;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 83) {
                    {
                    this.state = 307;
                    this.assignmentExpression();
                    }
                }

                }
                }
                this.state = 314;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 315;
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
            this.state = 317;
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
            this.state = 320;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 10481) !== 0)) {
                {
                this.state = 319;
                this.primitiveTypeSpecifier();
                }
            }

            this.state = 322;
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
            this.state = 326;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 28, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 324;
                this.primitiveTypeSpecifier();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 325;
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
            this.state = 328;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 329;
            this.match(LPCParser.COLON);
            this.state = 337;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 30, this.context) ) {
            case 1:
                {
                this.state = 330;
                this.expression(0);
                }
                break;
            case 2:
                {
                this.state = 334;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871274) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 857713145) !== 0) || ((((_la - 73)) & ~0x1F) === 0 && ((1 << (_la - 73)) & 3265790465) !== 0) || _la === 106 || _la === 107) {
                    {
                    {
                    this.state = 331;
                    this.statement();
                    }
                    }
                    this.state = 336;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            }
            this.state = 339;
            this.match(LPCParser.COLON);
            this.state = 340;
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
            this.state = 350;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 31, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 342;
                this.expressionStatement();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 343;
                this.compoundStatement();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 344;
                this.selectionStatement();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 345;
                this.iterationStatement();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 346;
                this.jumpStatement();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 347;
                this.variableDeclaration();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 348;
                this.selectionDirective();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 349;
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
            this.state = 352;
            this.expression(0);
            this.state = 353;
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
            this.state = 355;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 359;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871274) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 857713145) !== 0) || ((((_la - 73)) & ~0x1F) === 0 && ((1 << (_la - 73)) & 3265790465) !== 0) || _la === 106 || _la === 107) {
                {
                {
                this.state = 356;
                this.statement();
                }
                }
                this.state = 361;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 362;
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
            this.state = 366;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.IF:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 364;
                this.ifStatement();
                }
                break;
            case LPCParser.SWITCH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 365;
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
            this.state = 368;
            this.match(LPCParser.ELSE);
            this.state = 369;
            this.match(LPCParser.IF);
            this.state = 370;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 371;
            this.expression(0);
            this.state = 372;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 373;
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
            this.state = 375;
            this.match(LPCParser.ELSE);
            this.state = 376;
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
            this.state = 378;
            this.match(LPCParser.IF);
            this.state = 379;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 380;
            this.expression(0);
            this.state = 381;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 382;
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
            this.state = 384;
            this.ifExpression();
            this.state = 388;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 34, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 385;
                    this.elseIfExpression();
                    }
                    }
                }
                this.state = 390;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 34, this.context);
            }
            this.state = 392;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 35, this.context) ) {
            case 1:
                {
                this.state = 391;
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
            this.state = 394;
            this.match(LPCParser.SWITCH);
            this.state = 395;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 396;
            this.expression(0);
            this.state = 397;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 398;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 403;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 4 || _la === 9) {
                {
                this.state = 401;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.CASE:
                    {
                    this.state = 399;
                    this.caseStatement();
                    }
                    break;
                case LPCParser.DEFAULT:
                    {
                    this.state = 400;
                    this.defaultStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 405;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 406;
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
            this.state = 412;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 38, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 408;
                _la = this.tokenStream.LA(1);
                if(!(_la === 103 || _la === 106)) {
                this.errorHandler.recoverInline(this);
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
                this.state = 409;
                _la = this.tokenStream.LA(1);
                if(!(_la === 103 || _la === 106)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 410;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 411;
                _la = this.tokenStream.LA(1);
                if(!(_la === 103 || _la === 106)) {
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
            this.state = 414;
            this.match(LPCParser.CASE);
            this.state = 415;
            this.caseExpression();
            this.state = 416;
            this.match(LPCParser.COLON);
            this.state = 420;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871274) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 857713145) !== 0) || ((((_la - 73)) & ~0x1F) === 0 && ((1 << (_la - 73)) & 3265790465) !== 0) || _la === 106 || _la === 107) {
                {
                {
                this.state = 417;
                this.statement();
                }
                }
                this.state = 422;
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
            this.state = 423;
            this.match(LPCParser.DEFAULT);
            this.state = 424;
            this.match(LPCParser.COLON);
            this.state = 428;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871274) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 857713145) !== 0) || ((((_la - 73)) & ~0x1F) === 0 && ((1 << (_la - 73)) & 3265790465) !== 0) || _la === 106 || _la === 107) {
                {
                {
                this.state = 425;
                this.statement();
                }
                }
                this.state = 430;
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
            this.state = 483;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.WHILE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 431;
                this.match(LPCParser.WHILE);
                this.state = 432;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 433;
                this.expression(0);
                this.state = 434;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 435;
                this.statement();
                }
                break;
            case LPCParser.DO:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 437;
                this.match(LPCParser.DO);
                this.state = 438;
                this.statement();
                this.state = 439;
                this.match(LPCParser.WHILE);
                this.state = 440;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 441;
                this.expression(0);
                this.state = 442;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 443;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.FOR:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 445;
                this.match(LPCParser.FOR);
                this.state = 446;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 448;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || ((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 67239985) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55317) !== 0)) {
                    {
                    this.state = 447;
                    this.expression(0);
                    }
                }

                this.state = 454;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 79) {
                    {
                    {
                    this.state = 450;
                    this.match(LPCParser.COMMA);
                    this.state = 451;
                    this.expression(0);
                    }
                    }
                    this.state = 456;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 457;
                this.match(LPCParser.SEMI);
                this.state = 459;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || ((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 67239985) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55317) !== 0)) {
                    {
                    this.state = 458;
                    this.expression(0);
                    }
                }

                this.state = 461;
                this.match(LPCParser.SEMI);
                this.state = 463;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || ((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 67239985) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55317) !== 0)) {
                    {
                    this.state = 462;
                    this.expression(0);
                    }
                }

                this.state = 469;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 79) {
                    {
                    {
                    this.state = 465;
                    this.match(LPCParser.COMMA);
                    this.state = 466;
                    this.expression(0);
                    }
                    }
                    this.state = 471;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 472;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 473;
                this.statement();
                }
                break;
            case LPCParser.FOREACH:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 474;
                this.match(LPCParser.FOREACH);
                this.state = 475;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 476;
                this.typeSpecifier();
                this.state = 477;
                this.match(LPCParser.Identifier);
                this.state = 478;
                _la = this.tokenStream.LA(1);
                if(!(_la === 25 || _la === 77)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 479;
                this.expression(0);
                this.state = 480;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 481;
                this.statement();
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
            this.state = 485;
            this.match(LPCParser.RETURN);
            this.state = 487;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1 || ((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 67239985) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55317) !== 0)) {
                {
                this.state = 486;
                this.expression(0);
                }
            }

            this.state = 489;
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
            this.state = 496;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BREAK:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 491;
                this.match(LPCParser.BREAK);
                this.state = 492;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.CONTINUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 493;
                this.match(LPCParser.CONTINUE);
                this.state = 494;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.RETURN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 495;
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
            this.state = 503;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 498;
                this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.PAREN_OPEN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 499;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 500;
                this.match(LPCParser.Identifier);
                this.state = 501;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 502;
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
        let _startState = 102;
        this.enterRecursionRule(localContext, 102, LPCParser.RULE_expression, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 546;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 54, this.context) ) {
            case 1:
                {
                this.state = 506;
                this.match(LPCParser.Identifier);
                }
                break;
            case 2:
                {
                this.state = 508;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 56) {
                    {
                    this.state = 507;
                    this.match(LPCParser.MINUS);
                    }
                }

                this.state = 510;
                this.match(LPCParser.IntegerConstant);
                }
                break;
            case 3:
                {
                this.state = 512;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 56) {
                    {
                    this.state = 511;
                    this.match(LPCParser.MINUS);
                    }
                }

                this.state = 514;
                this.match(LPCParser.FloatingConstant);
                }
                break;
            case 4:
                {
                this.state = 515;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case 5:
                {
                this.state = 516;
                this.match(LPCParser.StringLiteral);
                this.state = 520;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 52, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 517;
                        this.match(LPCParser.StringLiteral);
                        }
                        }
                    }
                    this.state = 522;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 52, this.context);
                }
                }
                break;
            case 6:
                {
                this.state = 523;
                this.match(LPCParser.CharacterConstant);
                }
                break;
            case 7:
                {
                this.state = 524;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 525;
                this.expression(0);
                this.state = 526;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 8:
                {
                this.state = 528;
                this.inlineClosureExpression();
                }
                break;
            case 9:
                {
                this.state = 529;
                this.match(LPCParser.NOT);
                this.state = 530;
                this.expression(13);
                }
                break;
            case 10:
                {
                this.state = 531;
                this.match(LPCParser.INC);
                this.state = 532;
                this.expression(12);
                }
                break;
            case 11:
                {
                this.state = 533;
                this.match(LPCParser.DEC);
                this.state = 534;
                this.expression(11);
                }
                break;
            case 12:
                {
                this.state = 535;
                this.match(LPCParser.MINUS);
                this.state = 536;
                this.expression(10);
                }
                break;
            case 13:
                {
                this.state = 537;
                this.match(LPCParser.Identifier);
                this.state = 538;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 540;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || ((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 67239985) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55317) !== 0)) {
                    {
                    this.state = 539;
                    this.expressionList();
                    }
                }

                this.state = 542;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 14:
                {
                this.state = 543;
                this.mappingExpression();
                }
                break;
            case 15:
                {
                this.state = 544;
                this.arrayExpression();
                }
                break;
            case 16:
                {
                this.state = 545;
                this.inheritSuperExpression();
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 645;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 57, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 643;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 56, this.context) ) {
                    case 1:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 548;
                        if (!(this.precpred(this.context, 38))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 38)");
                        }
                        this.state = 549;
                        this.match(LPCParser.PLUS);
                        this.state = 550;
                        this.expression(39);
                        }
                        break;
                    case 2:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 551;
                        if (!(this.precpred(this.context, 37))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 37)");
                        }
                        this.state = 552;
                        this.match(LPCParser.MINUS);
                        this.state = 553;
                        this.expression(38);
                        }
                        break;
                    case 3:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 554;
                        if (!(this.precpred(this.context, 36))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 36)");
                        }
                        this.state = 555;
                        this.match(LPCParser.STAR);
                        this.state = 556;
                        this.expression(37);
                        }
                        break;
                    case 4:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 557;
                        if (!(this.precpred(this.context, 35))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 35)");
                        }
                        this.state = 558;
                        this.match(LPCParser.DIV);
                        this.state = 559;
                        this.expression(36);
                        }
                        break;
                    case 5:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 560;
                        if (!(this.precpred(this.context, 34))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 34)");
                        }
                        this.state = 561;
                        this.match(LPCParser.MOD);
                        this.state = 562;
                        this.expression(35);
                        }
                        break;
                    case 6:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 563;
                        if (!(this.precpred(this.context, 33))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 33)");
                        }
                        this.state = 564;
                        this.match(LPCParser.LT);
                        this.state = 565;
                        this.expression(34);
                        }
                        break;
                    case 7:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 566;
                        if (!(this.precpred(this.context, 32))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 32)");
                        }
                        this.state = 567;
                        this.match(LPCParser.GT);
                        this.state = 568;
                        this.expression(33);
                        }
                        break;
                    case 8:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 569;
                        if (!(this.precpred(this.context, 31))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 31)");
                        }
                        this.state = 570;
                        this.match(LPCParser.LE);
                        this.state = 571;
                        this.expression(32);
                        }
                        break;
                    case 9:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 572;
                        if (!(this.precpred(this.context, 30))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 30)");
                        }
                        this.state = 573;
                        this.match(LPCParser.GE);
                        this.state = 574;
                        this.expression(31);
                        }
                        break;
                    case 10:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 575;
                        if (!(this.precpred(this.context, 29))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 29)");
                        }
                        this.state = 576;
                        this.match(LPCParser.EQ);
                        this.state = 577;
                        this.expression(30);
                        }
                        break;
                    case 11:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 578;
                        if (!(this.precpred(this.context, 28))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 28)");
                        }
                        this.state = 579;
                        this.match(LPCParser.NE);
                        this.state = 580;
                        this.expression(29);
                        }
                        break;
                    case 12:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 581;
                        if (!(this.precpred(this.context, 27))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 27)");
                        }
                        this.state = 582;
                        this.match(LPCParser.AND);
                        this.state = 583;
                        this.expression(28);
                        }
                        break;
                    case 13:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 584;
                        if (!(this.precpred(this.context, 26))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 26)");
                        }
                        this.state = 585;
                        this.match(LPCParser.OR);
                        this.state = 586;
                        this.expression(27);
                        }
                        break;
                    case 14:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 587;
                        if (!(this.precpred(this.context, 25))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 25)");
                        }
                        this.state = 588;
                        this.match(LPCParser.XOR);
                        this.state = 589;
                        this.expression(26);
                        }
                        break;
                    case 15:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 590;
                        if (!(this.precpred(this.context, 24))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 24)");
                        }
                        this.state = 591;
                        this.match(LPCParser.AND_AND);
                        this.state = 592;
                        this.expression(25);
                        }
                        break;
                    case 16:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 593;
                        if (!(this.precpred(this.context, 23))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 23)");
                        }
                        this.state = 594;
                        this.match(LPCParser.OR_OR);
                        this.state = 595;
                        this.expression(24);
                        }
                        break;
                    case 17:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 596;
                        if (!(this.precpred(this.context, 22))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 22)");
                        }
                        this.state = 597;
                        this.match(LPCParser.ADD_ASSIGN);
                        this.state = 598;
                        this.expression(23);
                        }
                        break;
                    case 18:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 599;
                        if (!(this.precpred(this.context, 21))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 21)");
                        }
                        this.state = 600;
                        this.match(LPCParser.SUB_ASSIGN);
                        this.state = 601;
                        this.expression(22);
                        }
                        break;
                    case 19:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 602;
                        if (!(this.precpred(this.context, 20))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 20)");
                        }
                        this.state = 603;
                        this.match(LPCParser.MUL_ASSIGN);
                        this.state = 604;
                        this.expression(21);
                        }
                        break;
                    case 20:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 605;
                        if (!(this.precpred(this.context, 19))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 19)");
                        }
                        this.state = 606;
                        this.match(LPCParser.DIV_ASSIGN);
                        this.state = 607;
                        this.expression(20);
                        }
                        break;
                    case 21:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 608;
                        if (!(this.precpred(this.context, 18))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 18)");
                        }
                        this.state = 609;
                        this.match(LPCParser.MOD_ASSIGN);
                        this.state = 610;
                        this.expression(19);
                        }
                        break;
                    case 22:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 611;
                        if (!(this.precpred(this.context, 17))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 17)");
                        }
                        this.state = 612;
                        this.match(LPCParser.AND_ASSIGN);
                        this.state = 613;
                        this.expression(18);
                        }
                        break;
                    case 23:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 614;
                        if (!(this.precpred(this.context, 16))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 16)");
                        }
                        this.state = 615;
                        this.match(LPCParser.OR_ASSIGN);
                        this.state = 616;
                        this.expression(17);
                        }
                        break;
                    case 24:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 617;
                        if (!(this.precpred(this.context, 15))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 15)");
                        }
                        this.state = 618;
                        this.match(LPCParser.XOR_ASSIGN);
                        this.state = 619;
                        this.expression(16);
                        }
                        break;
                    case 25:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 620;
                        if (!(this.precpred(this.context, 14))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 14)");
                        }
                        this.state = 621;
                        this.match(LPCParser.QUESTION);
                        this.state = 622;
                        this.expression(0);
                        this.state = 623;
                        this.match(LPCParser.COLON);
                        this.state = 624;
                        this.expression(15);
                        }
                        break;
                    case 26:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 626;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 627;
                        this.match(LPCParser.INC);
                        }
                        break;
                    case 27:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 628;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 629;
                        this.match(LPCParser.DEC);
                        }
                        break;
                    case 28:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 630;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 631;
                        this.assignmentExpression();
                        }
                        break;
                    case 29:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 632;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 633;
                        this.arrayAccessExpression();
                        }
                        break;
                    case 30:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        localContext._callOtherOb = previousContext;
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 634;
                        if (!(this.precpred(this.context, 1))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                        }
                        this.state = 635;
                        this.match(LPCParser.ARROW);
                        this.state = 636;
                        this.callOtherTarget();
                        this.state = 637;
                        this.match(LPCParser.PAREN_OPEN);
                        this.state = 639;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if (_la === 1 || ((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 67239985) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55317) !== 0)) {
                            {
                            this.state = 638;
                            this.expressionList();
                            }
                        }

                        this.state = 641;
                        this.match(LPCParser.PAREN_CLOSE);
                        }
                        break;
                    }
                    }
                }
                this.state = 647;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 57, this.context);
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
        this.enterRule(localContext, 104, LPCParser.RULE_arrayAccessExpression);
        let _la: number;
        try {
            this.state = 670;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 63, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 648;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 650;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 64) {
                    {
                    this.state = 649;
                    this.match(LPCParser.LT);
                    }
                }

                this.state = 652;
                this.expression(0);
                this.state = 653;
                this.match(LPCParser.SQUARE_CLOSE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 655;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 657;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 64) {
                    {
                    this.state = 656;
                    this.match(LPCParser.LT);
                    }
                }

                this.state = 660;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || ((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 67239985) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55317) !== 0)) {
                    {
                    this.state = 659;
                    this.expression(0);
                    }
                }

                this.state = 662;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 664;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 64) {
                    {
                    this.state = 663;
                    this.match(LPCParser.LT);
                    }
                }

                this.state = 667;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || ((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 67239985) !== 0) || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & 55317) !== 0)) {
                    {
                    this.state = 666;
                    this.expression(0);
                    }
                }

                this.state = 669;
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
        this.enterRule(localContext, 106, LPCParser.RULE_expressionList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 672;
            this.expression(0);
            this.state = 677;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 79) {
                {
                {
                this.state = 673;
                this.match(LPCParser.COMMA);
                this.state = 674;
                this.expression(0);
                }
                }
                this.state = 679;
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
        this.enterRule(localContext, 108, LPCParser.RULE_assignmentExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 680;
            this.match(LPCParser.ASSIGN);
            this.state = 681;
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
        case 51:
            return this.expression_sempred(localContext as ExpressionContext, predIndex);
        }
        return true;
    }
    private expression_sempred(localContext: ExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 38);
        case 1:
            return this.precpred(this.context, 37);
        case 2:
            return this.precpred(this.context, 36);
        case 3:
            return this.precpred(this.context, 35);
        case 4:
            return this.precpred(this.context, 34);
        case 5:
            return this.precpred(this.context, 33);
        case 6:
            return this.precpred(this.context, 32);
        case 7:
            return this.precpred(this.context, 31);
        case 8:
            return this.precpred(this.context, 30);
        case 9:
            return this.precpred(this.context, 29);
        case 10:
            return this.precpred(this.context, 28);
        case 11:
            return this.precpred(this.context, 27);
        case 12:
            return this.precpred(this.context, 26);
        case 13:
            return this.precpred(this.context, 25);
        case 14:
            return this.precpred(this.context, 24);
        case 15:
            return this.precpred(this.context, 23);
        case 16:
            return this.precpred(this.context, 22);
        case 17:
            return this.precpred(this.context, 21);
        case 18:
            return this.precpred(this.context, 20);
        case 19:
            return this.precpred(this.context, 19);
        case 20:
            return this.precpred(this.context, 18);
        case 21:
            return this.precpred(this.context, 17);
        case 22:
            return this.precpred(this.context, 16);
        case 23:
            return this.precpred(this.context, 15);
        case 24:
            return this.precpred(this.context, 14);
        case 25:
            return this.precpred(this.context, 9);
        case 26:
            return this.precpred(this.context, 8);
        case 27:
            return this.precpred(this.context, 7);
        case 28:
            return this.precpred(this.context, 6);
        case 29:
            return this.precpred(this.context, 1);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,114,684,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
        7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,
        13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
        20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,
        26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,
        33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,
        39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
        46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,
        52,2,53,7,53,2,54,7,54,1,0,1,0,1,0,5,0,114,8,0,10,0,12,0,117,9,0,
        1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,5,1,136,8,1,10,1,12,1,139,9,1,3,1,141,8,1,1,2,1,2,1,2,1,3,1,
        3,1,3,1,3,1,3,1,3,3,3,152,8,3,1,4,1,4,1,5,1,5,1,6,1,6,1,7,1,7,1,
        8,1,8,1,8,1,8,5,8,166,8,8,10,8,12,8,169,9,8,1,8,1,8,1,9,1,9,1,10,
        1,10,1,11,1,11,3,11,179,8,11,1,12,1,12,1,12,3,12,184,8,12,1,13,1,
        13,1,13,1,13,1,14,1,14,1,15,1,15,1,16,1,16,1,16,1,16,1,17,1,17,1,
        17,1,17,1,17,3,17,203,8,17,1,18,1,18,1,18,3,18,208,8,18,1,19,1,19,
        1,20,5,20,213,8,20,10,20,12,20,216,9,20,1,20,3,20,219,8,20,1,20,
        1,20,1,20,3,20,224,8,20,1,20,1,20,1,21,1,21,1,21,1,22,1,22,1,22,
        1,23,1,23,1,23,5,23,237,8,23,10,23,12,23,240,9,23,1,24,3,24,243,
        8,24,1,24,1,24,1,25,1,25,1,25,1,25,5,25,251,8,25,10,25,12,25,254,
        9,25,3,25,256,8,25,1,25,1,25,1,26,1,26,1,27,1,27,1,27,1,27,1,27,
        5,27,267,8,27,10,27,12,27,270,9,27,3,27,272,8,27,1,28,1,28,1,28,
        1,28,5,28,278,8,28,10,28,12,28,281,9,28,3,28,283,8,28,1,28,1,28,
        1,28,1,29,1,29,1,30,5,30,291,8,30,10,30,12,30,294,9,30,1,30,3,30,
        297,8,30,1,30,1,30,3,30,301,8,30,1,30,1,30,3,30,305,8,30,1,30,1,
        30,3,30,309,8,30,5,30,311,8,30,10,30,12,30,314,9,30,1,30,1,30,1,
        31,1,31,1,32,3,32,321,8,32,1,32,1,32,1,33,1,33,3,33,327,8,33,1,34,
        1,34,1,34,1,34,5,34,333,8,34,10,34,12,34,336,9,34,3,34,338,8,34,
        1,34,1,34,1,34,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,3,35,351,
        8,35,1,36,1,36,1,36,1,37,1,37,5,37,358,8,37,10,37,12,37,361,9,37,
        1,37,1,37,1,38,1,38,3,38,367,8,38,1,39,1,39,1,39,1,39,1,39,1,39,
        1,39,1,40,1,40,1,40,1,41,1,41,1,41,1,41,1,41,1,41,1,42,1,42,5,42,
        387,8,42,10,42,12,42,390,9,42,1,42,3,42,393,8,42,1,43,1,43,1,43,
        1,43,1,43,1,43,1,43,5,43,402,8,43,10,43,12,43,405,9,43,1,43,1,43,
        1,44,1,44,1,44,1,44,3,44,413,8,44,1,45,1,45,1,45,1,45,5,45,419,8,
        45,10,45,12,45,422,9,45,1,46,1,46,1,46,5,46,427,8,46,10,46,12,46,
        430,9,46,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,
        1,47,1,47,1,47,1,47,1,47,1,47,3,47,449,8,47,1,47,1,47,5,47,453,8,
        47,10,47,12,47,456,9,47,1,47,1,47,3,47,460,8,47,1,47,1,47,3,47,464,
        8,47,1,47,1,47,5,47,468,8,47,10,47,12,47,471,9,47,1,47,1,47,1,47,
        1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,3,47,484,8,47,1,48,1,48,
        3,48,488,8,48,1,48,1,48,1,49,1,49,1,49,1,49,1,49,3,49,497,8,49,1,
        50,1,50,1,50,1,50,1,50,3,50,504,8,50,1,51,1,51,1,51,3,51,509,8,51,
        1,51,1,51,3,51,513,8,51,1,51,1,51,1,51,1,51,5,51,519,8,51,10,51,
        12,51,522,9,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,
        1,51,1,51,1,51,1,51,1,51,1,51,1,51,3,51,541,8,51,1,51,1,51,1,51,
        1,51,3,51,547,8,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,
        1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,
        1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,
        1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,
        1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,
        1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,
        1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,
        1,51,1,51,1,51,1,51,3,51,640,8,51,1,51,1,51,5,51,644,8,51,10,51,
        12,51,647,9,51,1,52,1,52,3,52,651,8,52,1,52,1,52,1,52,1,52,1,52,
        3,52,658,8,52,1,52,3,52,661,8,52,1,52,1,52,3,52,665,8,52,1,52,3,
        52,668,8,52,1,52,3,52,671,8,52,1,53,1,53,1,53,5,53,676,8,53,10,53,
        12,53,679,9,53,1,54,1,54,1,54,1,54,0,1,102,55,0,2,4,6,8,10,12,14,
        16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,
        60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,
        102,104,106,108,0,10,2,0,12,12,14,14,2,0,13,13,22,24,3,0,11,11,29,
        29,44,44,3,0,1,1,103,103,106,106,1,0,48,54,2,0,103,103,106,107,1,
        0,48,52,7,0,5,6,17,17,28,28,30,32,36,39,43,43,45,45,2,0,103,103,
        106,106,2,0,25,25,77,77,750,0,115,1,0,0,0,2,140,1,0,0,0,4,142,1,
        0,0,0,6,151,1,0,0,0,8,153,1,0,0,0,10,155,1,0,0,0,12,157,1,0,0,0,
        14,159,1,0,0,0,16,161,1,0,0,0,18,172,1,0,0,0,20,174,1,0,0,0,22,178,
        1,0,0,0,24,180,1,0,0,0,26,185,1,0,0,0,28,189,1,0,0,0,30,191,1,0,
        0,0,32,193,1,0,0,0,34,202,1,0,0,0,36,207,1,0,0,0,38,209,1,0,0,0,
        40,214,1,0,0,0,42,227,1,0,0,0,44,230,1,0,0,0,46,233,1,0,0,0,48,242,
        1,0,0,0,50,246,1,0,0,0,52,259,1,0,0,0,54,261,1,0,0,0,56,273,1,0,
        0,0,58,287,1,0,0,0,60,292,1,0,0,0,62,317,1,0,0,0,64,320,1,0,0,0,
        66,326,1,0,0,0,68,328,1,0,0,0,70,350,1,0,0,0,72,352,1,0,0,0,74,355,
        1,0,0,0,76,366,1,0,0,0,78,368,1,0,0,0,80,375,1,0,0,0,82,378,1,0,
        0,0,84,384,1,0,0,0,86,394,1,0,0,0,88,412,1,0,0,0,90,414,1,0,0,0,
        92,423,1,0,0,0,94,483,1,0,0,0,96,485,1,0,0,0,98,496,1,0,0,0,100,
        503,1,0,0,0,102,546,1,0,0,0,104,670,1,0,0,0,106,672,1,0,0,0,108,
        680,1,0,0,0,110,114,3,36,18,0,111,114,3,2,1,0,112,114,3,32,16,0,
        113,110,1,0,0,0,113,111,1,0,0,0,113,112,1,0,0,0,114,117,1,0,0,0,
        115,113,1,0,0,0,115,116,1,0,0,0,116,118,1,0,0,0,117,115,1,0,0,0,
        118,119,5,0,0,1,119,1,1,0,0,0,120,141,3,6,3,0,121,122,5,21,0,0,122,
        123,3,12,6,0,123,124,3,14,7,0,124,141,1,0,0,0,125,141,3,4,2,0,126,
        127,5,21,0,0,127,128,3,20,10,0,128,129,3,22,11,0,129,141,1,0,0,0,
        130,131,5,21,0,0,131,132,3,30,15,0,132,137,5,1,0,0,133,134,5,79,
        0,0,134,136,5,1,0,0,135,133,1,0,0,0,136,139,1,0,0,0,137,135,1,0,
        0,0,137,138,1,0,0,0,138,141,1,0,0,0,139,137,1,0,0,0,140,120,1,0,
        0,0,140,121,1,0,0,0,140,125,1,0,0,0,140,126,1,0,0,0,140,130,1,0,
        0,0,141,3,1,0,0,0,142,143,5,110,0,0,143,144,5,112,0,0,144,5,1,0,
        0,0,145,146,5,21,0,0,146,147,3,10,5,0,147,148,3,14,7,0,148,152,1,
        0,0,0,149,150,5,21,0,0,150,152,3,8,4,0,151,145,1,0,0,0,151,149,1,
        0,0,0,152,7,1,0,0,0,153,154,7,0,0,0,154,9,1,0,0,0,155,156,7,1,0,
        0,156,11,1,0,0,0,157,158,7,2,0,0,158,13,1,0,0,0,159,160,7,3,0,0,
        160,15,1,0,0,0,161,162,5,96,0,0,162,167,5,1,0,0,163,164,5,79,0,0,
        164,166,5,1,0,0,165,163,1,0,0,0,166,169,1,0,0,0,167,165,1,0,0,0,
        167,168,1,0,0,0,168,170,1,0,0,0,169,167,1,0,0,0,170,171,5,97,0,0,
        171,17,1,0,0,0,172,173,3,102,51,0,173,19,1,0,0,0,174,175,5,26,0,
        0,175,21,1,0,0,0,176,179,3,26,13,0,177,179,3,28,14,0,178,176,1,0,
        0,0,178,177,1,0,0,0,179,23,1,0,0,0,180,183,5,1,0,0,181,182,5,81,
        0,0,182,184,5,1,0,0,183,181,1,0,0,0,183,184,1,0,0,0,184,25,1,0,0,
        0,185,186,5,64,0,0,186,187,3,24,12,0,187,188,5,65,0,0,188,27,1,0,
        0,0,189,190,5,106,0,0,190,29,1,0,0,0,191,192,5,33,0,0,192,31,1,0,
        0,0,193,194,5,27,0,0,194,195,5,106,0,0,195,196,5,78,0,0,196,33,1,
        0,0,0,197,198,5,82,0,0,198,203,3,102,51,0,199,200,5,106,0,0,200,
        201,5,82,0,0,201,203,3,102,51,0,202,197,1,0,0,0,202,199,1,0,0,0,
        203,35,1,0,0,0,204,208,3,42,21,0,205,208,3,44,22,0,206,208,3,60,
        30,0,207,204,1,0,0,0,207,205,1,0,0,0,207,206,1,0,0,0,208,37,1,0,
        0,0,209,210,7,4,0,0,210,39,1,0,0,0,211,213,3,38,19,0,212,211,1,0,
        0,0,213,216,1,0,0,0,214,212,1,0,0,0,214,215,1,0,0,0,215,218,1,0,
        0,0,216,214,1,0,0,0,217,219,3,66,33,0,218,217,1,0,0,0,218,219,1,
        0,0,0,219,220,1,0,0,0,220,221,5,1,0,0,221,223,5,96,0,0,222,224,3,
        46,23,0,223,222,1,0,0,0,223,224,1,0,0,0,224,225,1,0,0,0,225,226,
        5,97,0,0,226,41,1,0,0,0,227,228,3,40,20,0,228,229,5,78,0,0,229,43,
        1,0,0,0,230,231,3,40,20,0,231,232,3,74,37,0,232,45,1,0,0,0,233,238,
        3,48,24,0,234,235,5,79,0,0,235,237,3,48,24,0,236,234,1,0,0,0,237,
        240,1,0,0,0,238,236,1,0,0,0,238,239,1,0,0,0,239,47,1,0,0,0,240,238,
        1,0,0,0,241,243,3,66,33,0,242,241,1,0,0,0,242,243,1,0,0,0,243,244,
        1,0,0,0,244,245,5,1,0,0,245,49,1,0,0,0,246,255,5,92,0,0,247,252,
        3,102,51,0,248,249,5,79,0,0,249,251,3,102,51,0,250,248,1,0,0,0,251,
        254,1,0,0,0,252,250,1,0,0,0,252,253,1,0,0,0,253,256,1,0,0,0,254,
        252,1,0,0,0,255,247,1,0,0,0,255,256,1,0,0,0,256,257,1,0,0,0,257,
        258,5,93,0,0,258,51,1,0,0,0,259,260,7,5,0,0,260,53,1,0,0,0,261,271,
        3,52,26,0,262,263,5,77,0,0,263,268,3,102,51,0,264,265,5,78,0,0,265,
        267,3,102,51,0,266,264,1,0,0,0,267,270,1,0,0,0,268,266,1,0,0,0,268,
        269,1,0,0,0,269,272,1,0,0,0,270,268,1,0,0,0,271,262,1,0,0,0,271,
        272,1,0,0,0,272,55,1,0,0,0,273,282,5,94,0,0,274,279,3,54,27,0,275,
        276,5,79,0,0,276,278,3,54,27,0,277,275,1,0,0,0,278,281,1,0,0,0,279,
        277,1,0,0,0,279,280,1,0,0,0,280,283,1,0,0,0,281,279,1,0,0,0,282,
        274,1,0,0,0,282,283,1,0,0,0,283,284,1,0,0,0,284,285,5,101,0,0,285,
        286,5,97,0,0,286,57,1,0,0,0,287,288,7,6,0,0,288,59,1,0,0,0,289,291,
        3,58,29,0,290,289,1,0,0,0,291,294,1,0,0,0,292,290,1,0,0,0,292,293,
        1,0,0,0,293,296,1,0,0,0,294,292,1,0,0,0,295,297,3,66,33,0,296,295,
        1,0,0,0,296,297,1,0,0,0,297,298,1,0,0,0,298,300,5,1,0,0,299,301,
        3,108,54,0,300,299,1,0,0,0,300,301,1,0,0,0,301,312,1,0,0,0,302,304,
        5,79,0,0,303,305,5,57,0,0,304,303,1,0,0,0,304,305,1,0,0,0,305,306,
        1,0,0,0,306,308,5,1,0,0,307,309,3,108,54,0,308,307,1,0,0,0,308,309,
        1,0,0,0,309,311,1,0,0,0,310,302,1,0,0,0,311,314,1,0,0,0,312,310,
        1,0,0,0,312,313,1,0,0,0,313,315,1,0,0,0,314,312,1,0,0,0,315,316,
        5,78,0,0,316,61,1,0,0,0,317,318,7,7,0,0,318,63,1,0,0,0,319,321,3,
        62,31,0,320,319,1,0,0,0,320,321,1,0,0,0,321,322,1,0,0,0,322,323,
        5,57,0,0,323,65,1,0,0,0,324,327,3,62,31,0,325,327,3,64,32,0,326,
        324,1,0,0,0,326,325,1,0,0,0,327,67,1,0,0,0,328,329,5,96,0,0,329,
        337,5,77,0,0,330,338,3,102,51,0,331,333,3,70,35,0,332,331,1,0,0,
        0,333,336,1,0,0,0,334,332,1,0,0,0,334,335,1,0,0,0,335,338,1,0,0,
        0,336,334,1,0,0,0,337,330,1,0,0,0,337,334,1,0,0,0,338,339,1,0,0,
        0,339,340,5,77,0,0,340,341,5,97,0,0,341,69,1,0,0,0,342,351,3,72,
        36,0,343,351,3,74,37,0,344,351,3,76,38,0,345,351,3,94,47,0,346,351,
        3,98,49,0,347,351,3,60,30,0,348,351,3,6,3,0,349,351,3,96,48,0,350,
        342,1,0,0,0,350,343,1,0,0,0,350,344,1,0,0,0,350,345,1,0,0,0,350,
        346,1,0,0,0,350,347,1,0,0,0,350,348,1,0,0,0,350,349,1,0,0,0,351,
        71,1,0,0,0,352,353,3,102,51,0,353,354,5,78,0,0,354,73,1,0,0,0,355,
        359,5,98,0,0,356,358,3,70,35,0,357,356,1,0,0,0,358,361,1,0,0,0,359,
        357,1,0,0,0,359,360,1,0,0,0,360,362,1,0,0,0,361,359,1,0,0,0,362,
        363,5,99,0,0,363,75,1,0,0,0,364,367,3,84,42,0,365,367,3,86,43,0,
        366,364,1,0,0,0,366,365,1,0,0,0,367,77,1,0,0,0,368,369,5,12,0,0,
        369,370,5,22,0,0,370,371,5,96,0,0,371,372,3,102,51,0,372,373,5,97,
        0,0,373,374,3,70,35,0,374,79,1,0,0,0,375,376,5,12,0,0,376,377,3,
        70,35,0,377,81,1,0,0,0,378,379,5,22,0,0,379,380,5,96,0,0,380,381,
        3,102,51,0,381,382,5,97,0,0,382,383,3,70,35,0,383,83,1,0,0,0,384,
        388,3,82,41,0,385,387,3,78,39,0,386,385,1,0,0,0,387,390,1,0,0,0,
        388,386,1,0,0,0,388,389,1,0,0,0,389,392,1,0,0,0,390,388,1,0,0,0,
        391,393,3,80,40,0,392,391,1,0,0,0,392,393,1,0,0,0,393,85,1,0,0,0,
        394,395,5,40,0,0,395,396,5,96,0,0,396,397,3,102,51,0,397,398,5,97,
        0,0,398,403,5,98,0,0,399,402,3,90,45,0,400,402,3,92,46,0,401,399,
        1,0,0,0,401,400,1,0,0,0,402,405,1,0,0,0,403,401,1,0,0,0,403,404,
        1,0,0,0,404,406,1,0,0,0,405,403,1,0,0,0,406,407,5,99,0,0,407,87,
        1,0,0,0,408,413,7,8,0,0,409,410,7,8,0,0,410,411,5,80,0,0,411,413,
        7,8,0,0,412,408,1,0,0,0,412,409,1,0,0,0,413,89,1,0,0,0,414,415,5,
        4,0,0,415,416,3,88,44,0,416,420,5,77,0,0,417,419,3,70,35,0,418,417,
        1,0,0,0,419,422,1,0,0,0,420,418,1,0,0,0,420,421,1,0,0,0,421,91,1,
        0,0,0,422,420,1,0,0,0,423,424,5,9,0,0,424,428,5,77,0,0,425,427,3,
        70,35,0,426,425,1,0,0,0,427,430,1,0,0,0,428,426,1,0,0,0,428,429,
        1,0,0,0,429,93,1,0,0,0,430,428,1,0,0,0,431,432,5,47,0,0,432,433,
        5,96,0,0,433,434,3,102,51,0,434,435,5,97,0,0,435,436,3,70,35,0,436,
        484,1,0,0,0,437,438,5,10,0,0,438,439,3,70,35,0,439,440,5,47,0,0,
        440,441,5,96,0,0,441,442,3,102,51,0,442,443,5,97,0,0,443,444,5,78,
        0,0,444,484,1,0,0,0,445,446,5,18,0,0,446,448,5,96,0,0,447,449,3,
        102,51,0,448,447,1,0,0,0,448,449,1,0,0,0,449,454,1,0,0,0,450,451,
        5,79,0,0,451,453,3,102,51,0,452,450,1,0,0,0,453,456,1,0,0,0,454,
        452,1,0,0,0,454,455,1,0,0,0,455,457,1,0,0,0,456,454,1,0,0,0,457,
        459,5,78,0,0,458,460,3,102,51,0,459,458,1,0,0,0,459,460,1,0,0,0,
        460,461,1,0,0,0,461,463,5,78,0,0,462,464,3,102,51,0,463,462,1,0,
        0,0,463,464,1,0,0,0,464,469,1,0,0,0,465,466,5,79,0,0,466,468,3,102,
        51,0,467,465,1,0,0,0,468,471,1,0,0,0,469,467,1,0,0,0,469,470,1,0,
        0,0,470,472,1,0,0,0,471,469,1,0,0,0,472,473,5,97,0,0,473,484,3,70,
        35,0,474,475,5,19,0,0,475,476,5,96,0,0,476,477,3,66,33,0,477,478,
        5,1,0,0,478,479,7,9,0,0,479,480,3,102,51,0,480,481,5,97,0,0,481,
        482,3,70,35,0,482,484,1,0,0,0,483,431,1,0,0,0,483,437,1,0,0,0,483,
        445,1,0,0,0,483,474,1,0,0,0,484,95,1,0,0,0,485,487,5,35,0,0,486,
        488,3,102,51,0,487,486,1,0,0,0,487,488,1,0,0,0,488,489,1,0,0,0,489,
        490,5,78,0,0,490,97,1,0,0,0,491,492,5,3,0,0,492,497,5,78,0,0,493,
        494,5,8,0,0,494,497,5,78,0,0,495,497,3,96,48,0,496,491,1,0,0,0,496,
        493,1,0,0,0,496,495,1,0,0,0,497,99,1,0,0,0,498,504,5,1,0,0,499,500,
        5,96,0,0,500,501,5,1,0,0,501,504,5,97,0,0,502,504,5,106,0,0,503,
        498,1,0,0,0,503,499,1,0,0,0,503,502,1,0,0,0,504,101,1,0,0,0,505,
        506,6,51,-1,0,506,547,5,1,0,0,507,509,5,56,0,0,508,507,1,0,0,0,508,
        509,1,0,0,0,509,510,1,0,0,0,510,547,5,103,0,0,511,513,5,56,0,0,512,
        511,1,0,0,0,512,513,1,0,0,0,513,514,1,0,0,0,514,547,5,104,0,0,515,
        547,5,106,0,0,516,520,5,106,0,0,517,519,5,106,0,0,518,517,1,0,0,
        0,519,522,1,0,0,0,520,518,1,0,0,0,520,521,1,0,0,0,521,547,1,0,0,
        0,522,520,1,0,0,0,523,547,5,107,0,0,524,525,5,96,0,0,525,526,3,102,
        51,0,526,527,5,97,0,0,527,547,1,0,0,0,528,547,3,68,34,0,529,530,
        5,73,0,0,530,547,3,102,51,13,531,532,5,60,0,0,532,547,3,102,51,12,
        533,534,5,61,0,0,534,547,3,102,51,11,535,536,5,56,0,0,536,547,3,
        102,51,10,537,538,5,1,0,0,538,540,5,96,0,0,539,541,3,106,53,0,540,
        539,1,0,0,0,540,541,1,0,0,0,541,542,1,0,0,0,542,547,5,97,0,0,543,
        547,3,56,28,0,544,547,3,50,25,0,545,547,3,34,17,0,546,505,1,0,0,
        0,546,508,1,0,0,0,546,512,1,0,0,0,546,515,1,0,0,0,546,516,1,0,0,
        0,546,523,1,0,0,0,546,524,1,0,0,0,546,528,1,0,0,0,546,529,1,0,0,
        0,546,531,1,0,0,0,546,533,1,0,0,0,546,535,1,0,0,0,546,537,1,0,0,
        0,546,543,1,0,0,0,546,544,1,0,0,0,546,545,1,0,0,0,547,645,1,0,0,
        0,548,549,10,38,0,0,549,550,5,55,0,0,550,644,3,102,51,39,551,552,
        10,37,0,0,552,553,5,56,0,0,553,644,3,102,51,38,554,555,10,36,0,0,
        555,556,5,57,0,0,556,644,3,102,51,37,557,558,10,35,0,0,558,559,5,
        58,0,0,559,644,3,102,51,36,560,561,10,34,0,0,561,562,5,59,0,0,562,
        644,3,102,51,35,563,564,10,33,0,0,564,565,5,64,0,0,565,644,3,102,
        51,34,566,567,10,32,0,0,567,568,5,65,0,0,568,644,3,102,51,33,569,
        570,10,31,0,0,570,571,5,66,0,0,571,644,3,102,51,32,572,573,10,30,
        0,0,573,574,5,67,0,0,574,644,3,102,51,31,575,576,10,29,0,0,576,577,
        5,68,0,0,577,644,3,102,51,30,578,579,10,28,0,0,579,580,5,69,0,0,
        580,644,3,102,51,29,581,582,10,27,0,0,582,583,5,70,0,0,583,644,3,
        102,51,28,584,585,10,26,0,0,585,586,5,71,0,0,586,644,3,102,51,27,
        587,588,10,25,0,0,588,589,5,72,0,0,589,644,3,102,51,26,590,591,10,
        24,0,0,591,592,5,74,0,0,592,644,3,102,51,25,593,594,10,23,0,0,594,
        595,5,75,0,0,595,644,3,102,51,24,596,597,10,22,0,0,597,598,5,84,
        0,0,598,644,3,102,51,23,599,600,10,21,0,0,600,601,5,85,0,0,601,644,
        3,102,51,22,602,603,10,20,0,0,603,604,5,86,0,0,604,644,3,102,51,
        21,605,606,10,19,0,0,606,607,5,87,0,0,607,644,3,102,51,20,608,609,
        10,18,0,0,609,610,5,88,0,0,610,644,3,102,51,19,611,612,10,17,0,0,
        612,613,5,89,0,0,613,644,3,102,51,18,614,615,10,16,0,0,615,616,5,
        90,0,0,616,644,3,102,51,17,617,618,10,15,0,0,618,619,5,91,0,0,619,
        644,3,102,51,16,620,621,10,14,0,0,621,622,5,76,0,0,622,623,3,102,
        51,0,623,624,5,77,0,0,624,625,3,102,51,15,625,644,1,0,0,0,626,627,
        10,9,0,0,627,644,5,60,0,0,628,629,10,8,0,0,629,644,5,61,0,0,630,
        631,10,7,0,0,631,644,3,108,54,0,632,633,10,6,0,0,633,644,3,104,52,
        0,634,635,10,1,0,0,635,636,5,95,0,0,636,637,3,100,50,0,637,639,5,
        96,0,0,638,640,3,106,53,0,639,638,1,0,0,0,639,640,1,0,0,0,640,641,
        1,0,0,0,641,642,5,97,0,0,642,644,1,0,0,0,643,548,1,0,0,0,643,551,
        1,0,0,0,643,554,1,0,0,0,643,557,1,0,0,0,643,560,1,0,0,0,643,563,
        1,0,0,0,643,566,1,0,0,0,643,569,1,0,0,0,643,572,1,0,0,0,643,575,
        1,0,0,0,643,578,1,0,0,0,643,581,1,0,0,0,643,584,1,0,0,0,643,587,
        1,0,0,0,643,590,1,0,0,0,643,593,1,0,0,0,643,596,1,0,0,0,643,599,
        1,0,0,0,643,602,1,0,0,0,643,605,1,0,0,0,643,608,1,0,0,0,643,611,
        1,0,0,0,643,614,1,0,0,0,643,617,1,0,0,0,643,620,1,0,0,0,643,626,
        1,0,0,0,643,628,1,0,0,0,643,630,1,0,0,0,643,632,1,0,0,0,643,634,
        1,0,0,0,644,647,1,0,0,0,645,643,1,0,0,0,645,646,1,0,0,0,646,103,
        1,0,0,0,647,645,1,0,0,0,648,650,5,100,0,0,649,651,5,64,0,0,650,649,
        1,0,0,0,650,651,1,0,0,0,651,652,1,0,0,0,652,653,3,102,51,0,653,654,
        5,101,0,0,654,671,1,0,0,0,655,657,5,100,0,0,656,658,5,64,0,0,657,
        656,1,0,0,0,657,658,1,0,0,0,658,660,1,0,0,0,659,661,3,102,51,0,660,
        659,1,0,0,0,660,661,1,0,0,0,661,662,1,0,0,0,662,664,5,80,0,0,663,
        665,5,64,0,0,664,663,1,0,0,0,664,665,1,0,0,0,665,667,1,0,0,0,666,
        668,3,102,51,0,667,666,1,0,0,0,667,668,1,0,0,0,668,669,1,0,0,0,669,
        671,5,101,0,0,670,648,1,0,0,0,670,655,1,0,0,0,671,105,1,0,0,0,672,
        677,3,102,51,0,673,674,5,79,0,0,674,676,3,102,51,0,675,673,1,0,0,
        0,676,679,1,0,0,0,677,675,1,0,0,0,677,678,1,0,0,0,678,107,1,0,0,
        0,679,677,1,0,0,0,680,681,5,83,0,0,681,682,3,102,51,0,682,109,1,
        0,0,0,65,113,115,137,140,151,167,178,183,202,207,214,218,223,238,
        242,252,255,268,271,279,282,292,296,300,304,308,312,320,326,334,
        337,350,359,366,388,392,401,403,412,420,428,448,454,459,463,469,
        483,487,496,503,508,512,520,540,546,639,643,645,650,657,660,664,
        667,670,677
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
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public DO(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DO, 0);
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

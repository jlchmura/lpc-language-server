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
    public static readonly VARARGS = 53;
    public static readonly PLUS = 54;
    public static readonly MINUS = 55;
    public static readonly STAR = 56;
    public static readonly DIV = 57;
    public static readonly MOD = 58;
    public static readonly INC = 59;
    public static readonly DEC = 60;
    public static readonly SHL = 61;
    public static readonly SHR = 62;
    public static readonly LT = 63;
    public static readonly GT = 64;
    public static readonly LE = 65;
    public static readonly GE = 66;
    public static readonly EQ = 67;
    public static readonly NE = 68;
    public static readonly AND = 69;
    public static readonly OR = 70;
    public static readonly XOR = 71;
    public static readonly NOT = 72;
    public static readonly AND_AND = 73;
    public static readonly OR_OR = 74;
    public static readonly QUESTION = 75;
    public static readonly COLON = 76;
    public static readonly SEMI = 77;
    public static readonly COMMA = 78;
    public static readonly DOUBLEDOT = 79;
    public static readonly DOT = 80;
    public static readonly SUPER_ACCESSOR = 81;
    public static readonly ASSIGN = 82;
    public static readonly ADD_ASSIGN = 83;
    public static readonly SUB_ASSIGN = 84;
    public static readonly MUL_ASSIGN = 85;
    public static readonly DIV_ASSIGN = 86;
    public static readonly MOD_ASSIGN = 87;
    public static readonly AND_ASSIGN = 88;
    public static readonly OR_ASSIGN = 89;
    public static readonly XOR_ASSIGN = 90;
    public static readonly ARRAY_OPEN = 91;
    public static readonly ARRAY_CLOSE = 92;
    public static readonly MAPPING_OPEN = 93;
    public static readonly ARROW = 94;
    public static readonly CLOSURE_OPEN = 95;
    public static readonly CLOSURE_CLOSE = 96;
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
    public static readonly RULE_inheritSuperStatement = 17;
    public static readonly RULE_declaration = 18;
    public static readonly RULE_functionModifier = 19;
    public static readonly RULE_functionDeclaration = 20;
    public static readonly RULE_parameterList = 21;
    public static readonly RULE_parameter = 22;
    public static readonly RULE_arrayExpression = 23;
    public static readonly RULE_mappingKey = 24;
    public static readonly RULE_mappingContent = 25;
    public static readonly RULE_mappingExpression = 26;
    public static readonly RULE_variableDeclaration = 27;
    public static readonly RULE_primitiveTypeSpecifier = 28;
    public static readonly RULE_typeSpecifier = 29;
    public static readonly RULE_inlineClosureExpression = 30;
    public static readonly RULE_statement = 31;
    public static readonly RULE_expressionStatement = 32;
    public static readonly RULE_compoundStatement = 33;
    public static readonly RULE_selectionStatement = 34;
    public static readonly RULE_elseIfExpression = 35;
    public static readonly RULE_elseExpression = 36;
    public static readonly RULE_ifExpression = 37;
    public static readonly RULE_ifStatement = 38;
    public static readonly RULE_switchStatement = 39;
    public static readonly RULE_caseExpression = 40;
    public static readonly RULE_caseStatement = 41;
    public static readonly RULE_defaultStatement = 42;
    public static readonly RULE_iterationStatement = 43;
    public static readonly RULE_jumpStatement = 44;
    public static readonly RULE_callOtherTarget = 45;
    public static readonly RULE_expression = 46;
    public static readonly RULE_expressionList = 47;
    public static readonly RULE_assignmentExpression = 48;

    public static readonly literalNames = [
        null, null, "'auto'", "'break'", "'case'", "'char'", "'closure'", 
        "'const'", "'continue'", "'default'", "'do'", "'echo'", "'else'", 
        "'elif'", "'endif'", "'enum'", "'extern'", "'float'", "'for'", "'foreach'", 
        "'goto'", "'#'", "'if'", "'ifdef'", "'ifndef'", "'in'", "'include'", 
        "'inherit'", "'int'", "'line'", "'mapping'", "'mixed'", "'object'", 
        "'pragma'", "'register'", "'return'", "'status'", "'struct'", "'string'", 
        "'symbol'", "'switch'", "'typedef'", "'union'", "'unknown'", "'undef'", 
        "'void'", "'volatile'", "'while'", "'private'", "'protected'", "'public'", 
        "'static'", "'noshadow'", "'varargs'", "'+'", "'-'", "'*'", "'/'", 
        "'%'", "'++'", "'--'", "'<<'", "'>>'", "'<'", "'>'", "'<='", "'>='", 
        "'=='", "'!='", "'&'", "'|'", "'^'", "'!'", "'&&'", "'||'", "'?'", 
        "':'", "';'", "','", "'..'", "'.'", "'::'", "'='", "'+='", "'-='", 
        "'*='", "'/='", "'%='", "'&='", "'|='", "'^='", "'({'", "'})'", 
        "'(['", "'->'", "'(:'", "':)'", "'('", "')'", "'{'", "'}'", "'['", 
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
        "NOSHADOW", "VARARGS", "PLUS", "MINUS", "STAR", "DIV", "MOD", "INC", 
        "DEC", "SHL", "SHR", "LT", "GT", "LE", "GE", "EQ", "NE", "AND", 
        "OR", "XOR", "NOT", "AND_AND", "OR_OR", "QUESTION", "COLON", "SEMI", 
        "COMMA", "DOUBLEDOT", "DOT", "SUPER_ACCESSOR", "ASSIGN", "ADD_ASSIGN", 
        "SUB_ASSIGN", "MUL_ASSIGN", "DIV_ASSIGN", "MOD_ASSIGN", "AND_ASSIGN", 
        "OR_ASSIGN", "XOR_ASSIGN", "ARRAY_OPEN", "ARRAY_CLOSE", "MAPPING_OPEN", 
        "ARROW", "CLOSURE_OPEN", "CLOSURE_CLOSE", "PAREN_OPEN", "PAREN_CLOSE", 
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
        "directiveTypePragma", "inheritStatement", "inheritSuperStatement", 
        "declaration", "functionModifier", "functionDeclaration", "parameterList", 
        "parameter", "arrayExpression", "mappingKey", "mappingContent", 
        "mappingExpression", "variableDeclaration", "primitiveTypeSpecifier", 
        "typeSpecifier", "inlineClosureExpression", "statement", "expressionStatement", 
        "compoundStatement", "selectionStatement", "elseIfExpression", "elseExpression", 
        "ifExpression", "ifStatement", "switchStatement", "caseExpression", 
        "caseStatement", "defaultStatement", "iterationStatement", "jumpStatement", 
        "callOtherTarget", "expression", "expressionList", "assignmentExpression",
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
            this.state = 103;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3626106978) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4139249) !== 0) || _la === 111) {
                {
                this.state = 101;
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
                case LPCParser.VARARGS:
                    {
                    this.state = 98;
                    this.declaration();
                    }
                    break;
                case LPCParser.HASH:
                case LPCParser.DEFINE:
                    {
                    this.state = 99;
                    this.preprocessorDirective();
                    }
                    break;
                case LPCParser.INHERIT:
                    {
                    this.state = 100;
                    this.inheritStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 105;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 106;
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
            this.state = 128;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 108;
                this.selectionDirective();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 109;
                this.match(LPCParser.HASH);
                this.state = 110;
                this.directiveTypeWithArguments();
                this.state = 111;
                this.directiveArgument();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 113;
                this.definePreprocessorDirective();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 114;
                this.match(LPCParser.HASH);
                this.state = 115;
                this.directiveTypeInclude();
                this.state = 116;
                this.directiveIncludeFile();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 118;
                this.match(LPCParser.HASH);
                this.state = 119;
                this.directiveTypePragma();
                this.state = 120;
                this.match(LPCParser.Identifier);
                this.state = 125;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 78) {
                    {
                    {
                    this.state = 121;
                    this.match(LPCParser.COMMA);
                    this.state = 122;
                    this.match(LPCParser.Identifier);
                    }
                    }
                    this.state = 127;
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
            this.state = 130;
            this.match(LPCParser.DEFINE);
            this.state = 131;
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
            this.state = 139;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 133;
                this.match(LPCParser.HASH);
                this.state = 134;
                this.selectionDirectiveTypeWithArg();
                this.state = 135;
                this.directiveArgument();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 137;
                this.match(LPCParser.HASH);
                this.state = 138;
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
            this.state = 141;
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
            this.state = 143;
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
            this.state = 145;
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
            this.state = 147;
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
            this.state = 149;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 150;
            this.match(LPCParser.Identifier);
            this.state = 155;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 78) {
                {
                {
                this.state = 151;
                this.match(LPCParser.COMMA);
                this.state = 152;
                this.match(LPCParser.Identifier);
                }
                }
                this.state = 157;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 158;
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
            this.state = 160;
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
            this.state = 162;
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
            this.state = 166;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.LT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 164;
                this.directiveIncludeFileGlobal();
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 165;
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
            this.state = 168;
            this.match(LPCParser.Identifier);
            this.state = 171;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 80) {
                {
                this.state = 169;
                this.match(LPCParser.DOT);
                this.state = 170;
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
            this.state = 173;
            this.match(LPCParser.LT);
            this.state = 174;
            this.directiveIncludeFilename();
            this.state = 175;
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
            this.state = 177;
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
            this.state = 179;
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
            this.state = 181;
            this.match(LPCParser.INHERIT);
            this.state = 182;
            this.match(LPCParser.StringLiteral);
            this.state = 183;
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
    public inheritSuperStatement(): InheritSuperStatementContext {
        let localContext = new InheritSuperStatementContext(this.context, this.state);
        this.enterRule(localContext, 34, LPCParser.RULE_inheritSuperStatement);
        try {
            this.state = 194;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.SUPER_ACCESSOR:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 185;
                this.match(LPCParser.SUPER_ACCESSOR);
                this.state = 186;
                this.expression(0);
                this.state = 187;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 189;
                this.match(LPCParser.StringLiteral);
                this.state = 190;
                this.match(LPCParser.SUPER_ACCESSOR);
                this.state = 191;
                this.expression(0);
                this.state = 192;
                this.match(LPCParser.SEMI);
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
            this.state = 198;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 196;
                this.functionDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 197;
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
            this.state = 200;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 48)) & ~0x1F) === 0 && ((1 << (_la - 48)) & 63) !== 0))) {
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
    public functionDeclaration(): FunctionDeclarationContext {
        let localContext = new FunctionDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 40, LPCParser.RULE_functionDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 203;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 48)) & ~0x1F) === 0 && ((1 << (_la - 48)) & 63) !== 0)) {
                {
                this.state = 202;
                this.functionModifier();
                }
            }

            this.state = 206;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 10481) !== 0)) {
                {
                this.state = 205;
                this.typeSpecifier(0);
                }
            }

            this.state = 208;
            this.match(LPCParser.Identifier);
            this.state = 209;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 211;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792098) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 10481) !== 0)) {
                {
                this.state = 210;
                this.parameterList();
                }
            }

            this.state = 213;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 214;
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
        this.enterRule(localContext, 42, LPCParser.RULE_parameterList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 216;
            this.parameter();
            this.state = 221;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 78) {
                {
                {
                this.state = 217;
                this.match(LPCParser.COMMA);
                this.state = 218;
                this.parameter();
                }
                }
                this.state = 223;
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
        this.enterRule(localContext, 44, LPCParser.RULE_parameter);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 225;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 10481) !== 0)) {
                {
                this.state = 224;
                this.typeSpecifier(0);
                }
            }

            this.state = 227;
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
        this.enterRule(localContext, 46, LPCParser.RULE_arrayExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 229;
            this.match(LPCParser.ARRAY_OPEN);
            this.state = 238;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 131121) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 221269) !== 0)) {
                {
                this.state = 230;
                this.expression(0);
                this.state = 235;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 78) {
                    {
                    {
                    this.state = 231;
                    this.match(LPCParser.COMMA);
                    this.state = 232;
                    this.expression(0);
                    }
                    }
                    this.state = 237;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 240;
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
        this.enterRule(localContext, 48, LPCParser.RULE_mappingKey);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 242;
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
        this.enterRule(localContext, 50, LPCParser.RULE_mappingContent);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 244;
            this.mappingKey();
            this.state = 254;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 76) {
                {
                this.state = 245;
                this.match(LPCParser.COLON);
                this.state = 246;
                this.expression(0);
                this.state = 251;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 77) {
                    {
                    {
                    this.state = 247;
                    this.match(LPCParser.SEMI);
                    this.state = 248;
                    this.expression(0);
                    }
                    }
                    this.state = 253;
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
        this.enterRule(localContext, 52, LPCParser.RULE_mappingExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 256;
            this.match(LPCParser.MAPPING_OPEN);
            this.state = 265;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 104)) & ~0x1F) === 0 && ((1 << (_la - 104)) & 25) !== 0)) {
                {
                this.state = 257;
                this.mappingContent();
                this.state = 262;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 78) {
                    {
                    {
                    this.state = 258;
                    this.match(LPCParser.COMMA);
                    this.state = 259;
                    this.mappingContent();
                    }
                    }
                    this.state = 264;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 267;
            this.match(LPCParser.SQUARE_CLOSE);
            this.state = 268;
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
    public variableDeclaration(): VariableDeclarationContext {
        let localContext = new VariableDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 54, LPCParser.RULE_variableDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 270;
            this.typeSpecifier(0);
            this.state = 271;
            this.match(LPCParser.Identifier);
            this.state = 273;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 82) {
                {
                this.state = 272;
                this.assignmentExpression();
                }
            }

            this.state = 282;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 78) {
                {
                {
                this.state = 275;
                this.match(LPCParser.COMMA);
                this.state = 276;
                this.match(LPCParser.Identifier);
                this.state = 278;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 82) {
                    {
                    this.state = 277;
                    this.assignmentExpression();
                    }
                }

                }
                }
                this.state = 284;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 285;
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
        this.enterRule(localContext, 56, LPCParser.RULE_primitiveTypeSpecifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 287;
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

    public typeSpecifier(): TypeSpecifierContext;
    public typeSpecifier(_p: number): TypeSpecifierContext;
    public typeSpecifier(_p?: number): TypeSpecifierContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new TypeSpecifierContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 58;
        this.enterRecursionRule(localContext, 58, LPCParser.RULE_typeSpecifier, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 290;
            this.primitiveTypeSpecifier();
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 296;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 24, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new TypeSpecifierContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_typeSpecifier);
                    this.state = 292;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 293;
                    this.match(LPCParser.STAR);
                    }
                    }
                }
                this.state = 298;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 24, this.context);
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
    public inlineClosureExpression(): InlineClosureExpressionContext {
        let localContext = new InlineClosureExpressionContext(this.context, this.state);
        this.enterRule(localContext, 60, LPCParser.RULE_inlineClosureExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 299;
            this.match(LPCParser.CLOSURE_OPEN);
            this.state = 307;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 26, this.context) ) {
            case 1:
                {
                this.state = 300;
                this.expression(0);
                }
                break;
            case 2:
                {
                this.state = 304;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871274) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 411085305) !== 0) || ((((_la - 72)) & ~0x1F) === 0 && ((1 << (_la - 72)) & 178782721) !== 0) || ((((_la - 104)) & ~0x1F) === 0 && ((1 << (_la - 104)) & 27) !== 0)) {
                    {
                    {
                    this.state = 301;
                    this.statement();
                    }
                    }
                    this.state = 306;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            }
            this.state = 309;
            this.match(LPCParser.CLOSURE_CLOSE);
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
        this.enterRule(localContext, 62, LPCParser.RULE_statement);
        try {
            this.state = 319;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 27, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 311;
                this.expressionStatement();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 312;
                this.compoundStatement();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 313;
                this.selectionStatement();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 314;
                this.iterationStatement();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 315;
                this.jumpStatement();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 316;
                this.variableDeclaration();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 317;
                this.inheritSuperStatement();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 318;
                this.selectionDirective();
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
        this.enterRule(localContext, 64, LPCParser.RULE_expressionStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 321;
            this.expression(0);
            this.state = 322;
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
        this.enterRule(localContext, 66, LPCParser.RULE_compoundStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 324;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 328;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871274) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 411085305) !== 0) || ((((_la - 72)) & ~0x1F) === 0 && ((1 << (_la - 72)) & 178782721) !== 0) || ((((_la - 104)) & ~0x1F) === 0 && ((1 << (_la - 104)) & 27) !== 0)) {
                {
                {
                this.state = 325;
                this.statement();
                }
                }
                this.state = 330;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 331;
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
        this.enterRule(localContext, 68, LPCParser.RULE_selectionStatement);
        try {
            this.state = 335;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.IF:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 333;
                this.ifStatement();
                }
                break;
            case LPCParser.SWITCH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 334;
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
        this.enterRule(localContext, 70, LPCParser.RULE_elseIfExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 337;
            this.match(LPCParser.ELSE);
            this.state = 338;
            this.match(LPCParser.IF);
            this.state = 339;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 340;
            this.expression(0);
            this.state = 341;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 342;
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
        this.enterRule(localContext, 72, LPCParser.RULE_elseExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 344;
            this.match(LPCParser.ELSE);
            this.state = 345;
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
        this.enterRule(localContext, 74, LPCParser.RULE_ifExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 347;
            this.match(LPCParser.IF);
            this.state = 348;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 349;
            this.expression(0);
            this.state = 350;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 351;
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
        this.enterRule(localContext, 76, LPCParser.RULE_ifStatement);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 353;
            this.ifExpression();
            this.state = 357;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 30, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 354;
                    this.elseIfExpression();
                    }
                    }
                }
                this.state = 359;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 30, this.context);
            }
            this.state = 361;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 31, this.context) ) {
            case 1:
                {
                this.state = 360;
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
        this.enterRule(localContext, 78, LPCParser.RULE_switchStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 363;
            this.match(LPCParser.SWITCH);
            this.state = 364;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 365;
            this.expression(0);
            this.state = 366;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 367;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 372;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 4 || _la === 9) {
                {
                this.state = 370;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.CASE:
                    {
                    this.state = 368;
                    this.caseStatement();
                    }
                    break;
                case LPCParser.DEFAULT:
                    {
                    this.state = 369;
                    this.defaultStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 374;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 375;
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
        this.enterRule(localContext, 80, LPCParser.RULE_caseExpression);
        let _la: number;
        try {
            this.state = 381;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 34, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 377;
                _la = this.tokenStream.LA(1);
                if(!(_la === 104 || _la === 107)) {
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
                this.state = 378;
                _la = this.tokenStream.LA(1);
                if(!(_la === 104 || _la === 107)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 379;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 380;
                _la = this.tokenStream.LA(1);
                if(!(_la === 104 || _la === 107)) {
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
        this.enterRule(localContext, 82, LPCParser.RULE_caseStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 383;
            this.match(LPCParser.CASE);
            this.state = 384;
            this.caseExpression();
            this.state = 385;
            this.match(LPCParser.COLON);
            this.state = 389;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871274) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 411085305) !== 0) || ((((_la - 72)) & ~0x1F) === 0 && ((1 << (_la - 72)) & 178782721) !== 0) || ((((_la - 104)) & ~0x1F) === 0 && ((1 << (_la - 104)) & 27) !== 0)) {
                {
                {
                this.state = 386;
                this.statement();
                }
                }
                this.state = 391;
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
        this.enterRule(localContext, 84, LPCParser.RULE_defaultStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 392;
            this.match(LPCParser.DEFAULT);
            this.state = 393;
            this.match(LPCParser.COLON);
            this.state = 397;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871274) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 411085305) !== 0) || ((((_la - 72)) & ~0x1F) === 0 && ((1 << (_la - 72)) & 178782721) !== 0) || ((((_la - 104)) & ~0x1F) === 0 && ((1 << (_la - 104)) & 27) !== 0)) {
                {
                {
                this.state = 394;
                this.statement();
                }
                }
                this.state = 399;
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
        this.enterRule(localContext, 86, LPCParser.RULE_iterationStatement);
        let _la: number;
        try {
            this.state = 452;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.WHILE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 400;
                this.match(LPCParser.WHILE);
                this.state = 401;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 402;
                this.expression(0);
                this.state = 403;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 404;
                this.statement();
                }
                break;
            case LPCParser.DO:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 406;
                this.match(LPCParser.DO);
                this.state = 407;
                this.statement();
                this.state = 408;
                this.match(LPCParser.WHILE);
                this.state = 409;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 410;
                this.expression(0);
                this.state = 411;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 412;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.FOR:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 414;
                this.match(LPCParser.FOR);
                this.state = 415;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 417;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 131121) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 221269) !== 0)) {
                    {
                    this.state = 416;
                    this.expression(0);
                    }
                }

                this.state = 423;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 78) {
                    {
                    {
                    this.state = 419;
                    this.match(LPCParser.COMMA);
                    this.state = 420;
                    this.expression(0);
                    }
                    }
                    this.state = 425;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 426;
                this.match(LPCParser.SEMI);
                this.state = 428;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 131121) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 221269) !== 0)) {
                    {
                    this.state = 427;
                    this.expression(0);
                    }
                }

                this.state = 430;
                this.match(LPCParser.SEMI);
                this.state = 432;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 131121) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 221269) !== 0)) {
                    {
                    this.state = 431;
                    this.expression(0);
                    }
                }

                this.state = 438;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 78) {
                    {
                    {
                    this.state = 434;
                    this.match(LPCParser.COMMA);
                    this.state = 435;
                    this.expression(0);
                    }
                    }
                    this.state = 440;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 441;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 442;
                this.statement();
                }
                break;
            case LPCParser.FOREACH:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 443;
                this.match(LPCParser.FOREACH);
                this.state = 444;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 445;
                this.typeSpecifier(0);
                this.state = 446;
                this.match(LPCParser.Identifier);
                this.state = 447;
                _la = this.tokenStream.LA(1);
                if(!(_la === 25 || _la === 76)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 448;
                this.expression(0);
                this.state = 449;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 450;
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
    public jumpStatement(): JumpStatementContext {
        let localContext = new JumpStatementContext(this.context, this.state);
        this.enterRule(localContext, 88, LPCParser.RULE_jumpStatement);
        let _la: number;
        try {
            this.state = 463;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BREAK:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 454;
                this.match(LPCParser.BREAK);
                this.state = 455;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.CONTINUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 456;
                this.match(LPCParser.CONTINUE);
                this.state = 457;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.RETURN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 458;
                this.match(LPCParser.RETURN);
                this.state = 460;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 131121) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 221269) !== 0)) {
                    {
                    this.state = 459;
                    this.expression(0);
                    }
                }

                this.state = 462;
                this.match(LPCParser.SEMI);
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
        this.enterRule(localContext, 90, LPCParser.RULE_callOtherTarget);
        try {
            this.state = 470;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 465;
                this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.PAREN_OPEN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 466;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 467;
                this.match(LPCParser.Identifier);
                this.state = 468;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 469;
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
        let _startState = 92;
        this.enterRecursionRule(localContext, 92, LPCParser.RULE_expression, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 506;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 48, this.context) ) {
            case 1:
                {
                this.state = 473;
                this.match(LPCParser.Identifier);
                }
                break;
            case 2:
                {
                this.state = 474;
                this.match(LPCParser.IntegerConstant);
                }
                break;
            case 3:
                {
                this.state = 475;
                this.match(LPCParser.FloatingConstant);
                }
                break;
            case 4:
                {
                this.state = 476;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case 5:
                {
                this.state = 477;
                this.match(LPCParser.StringLiteral);
                this.state = 481;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 46, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 478;
                        this.match(LPCParser.StringLiteral);
                        }
                        }
                    }
                    this.state = 483;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 46, this.context);
                }
                }
                break;
            case 6:
                {
                this.state = 484;
                this.match(LPCParser.CharacterConstant);
                }
                break;
            case 7:
                {
                this.state = 485;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 486;
                this.expression(0);
                this.state = 487;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 8:
                {
                this.state = 489;
                this.inlineClosureExpression();
                }
                break;
            case 9:
                {
                this.state = 490;
                this.match(LPCParser.NOT);
                this.state = 491;
                this.expression(12);
                }
                break;
            case 10:
                {
                this.state = 492;
                this.match(LPCParser.INC);
                this.state = 493;
                this.expression(11);
                }
                break;
            case 11:
                {
                this.state = 494;
                this.match(LPCParser.DEC);
                this.state = 495;
                this.expression(10);
                }
                break;
            case 12:
                {
                this.state = 496;
                this.match(LPCParser.MINUS);
                this.state = 497;
                this.expression(9);
                }
                break;
            case 13:
                {
                this.state = 498;
                this.match(LPCParser.Identifier);
                this.state = 499;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 501;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 131121) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 221269) !== 0)) {
                    {
                    this.state = 500;
                    this.expressionList();
                    }
                }

                this.state = 503;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 14:
                {
                this.state = 504;
                this.mappingExpression();
                }
                break;
            case 15:
                {
                this.state = 505;
                this.arrayExpression();
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 608;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 51, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 606;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 50, this.context) ) {
                    case 1:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 508;
                        if (!(this.precpred(this.context, 37))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 37)");
                        }
                        this.state = 509;
                        this.match(LPCParser.PLUS);
                        this.state = 510;
                        this.expression(38);
                        }
                        break;
                    case 2:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 511;
                        if (!(this.precpred(this.context, 36))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 36)");
                        }
                        this.state = 512;
                        this.match(LPCParser.MINUS);
                        this.state = 513;
                        this.expression(37);
                        }
                        break;
                    case 3:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 514;
                        if (!(this.precpred(this.context, 35))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 35)");
                        }
                        this.state = 515;
                        this.match(LPCParser.STAR);
                        this.state = 516;
                        this.expression(36);
                        }
                        break;
                    case 4:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 517;
                        if (!(this.precpred(this.context, 34))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 34)");
                        }
                        this.state = 518;
                        this.match(LPCParser.DIV);
                        this.state = 519;
                        this.expression(35);
                        }
                        break;
                    case 5:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 520;
                        if (!(this.precpred(this.context, 33))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 33)");
                        }
                        this.state = 521;
                        this.match(LPCParser.MOD);
                        this.state = 522;
                        this.expression(34);
                        }
                        break;
                    case 6:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 523;
                        if (!(this.precpred(this.context, 32))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 32)");
                        }
                        this.state = 524;
                        this.match(LPCParser.LT);
                        this.state = 525;
                        this.expression(33);
                        }
                        break;
                    case 7:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 526;
                        if (!(this.precpred(this.context, 31))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 31)");
                        }
                        this.state = 527;
                        this.match(LPCParser.GT);
                        this.state = 528;
                        this.expression(32);
                        }
                        break;
                    case 8:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 529;
                        if (!(this.precpred(this.context, 30))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 30)");
                        }
                        this.state = 530;
                        this.match(LPCParser.LE);
                        this.state = 531;
                        this.expression(31);
                        }
                        break;
                    case 9:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 532;
                        if (!(this.precpred(this.context, 29))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 29)");
                        }
                        this.state = 533;
                        this.match(LPCParser.GE);
                        this.state = 534;
                        this.expression(30);
                        }
                        break;
                    case 10:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 535;
                        if (!(this.precpred(this.context, 28))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 28)");
                        }
                        this.state = 536;
                        this.match(LPCParser.EQ);
                        this.state = 537;
                        this.expression(29);
                        }
                        break;
                    case 11:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 538;
                        if (!(this.precpred(this.context, 27))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 27)");
                        }
                        this.state = 539;
                        this.match(LPCParser.NE);
                        this.state = 540;
                        this.expression(28);
                        }
                        break;
                    case 12:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 541;
                        if (!(this.precpred(this.context, 26))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 26)");
                        }
                        this.state = 542;
                        this.match(LPCParser.AND);
                        this.state = 543;
                        this.expression(27);
                        }
                        break;
                    case 13:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 544;
                        if (!(this.precpred(this.context, 25))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 25)");
                        }
                        this.state = 545;
                        this.match(LPCParser.OR);
                        this.state = 546;
                        this.expression(26);
                        }
                        break;
                    case 14:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 547;
                        if (!(this.precpred(this.context, 24))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 24)");
                        }
                        this.state = 548;
                        this.match(LPCParser.XOR);
                        this.state = 549;
                        this.expression(25);
                        }
                        break;
                    case 15:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 550;
                        if (!(this.precpred(this.context, 23))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 23)");
                        }
                        this.state = 551;
                        this.match(LPCParser.AND_AND);
                        this.state = 552;
                        this.expression(24);
                        }
                        break;
                    case 16:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 553;
                        if (!(this.precpred(this.context, 22))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 22)");
                        }
                        this.state = 554;
                        this.match(LPCParser.OR_OR);
                        this.state = 555;
                        this.expression(23);
                        }
                        break;
                    case 17:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 556;
                        if (!(this.precpred(this.context, 21))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 21)");
                        }
                        this.state = 557;
                        this.match(LPCParser.ADD_ASSIGN);
                        this.state = 558;
                        this.expression(22);
                        }
                        break;
                    case 18:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 559;
                        if (!(this.precpred(this.context, 20))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 20)");
                        }
                        this.state = 560;
                        this.match(LPCParser.SUB_ASSIGN);
                        this.state = 561;
                        this.expression(21);
                        }
                        break;
                    case 19:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 562;
                        if (!(this.precpred(this.context, 19))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 19)");
                        }
                        this.state = 563;
                        this.match(LPCParser.MUL_ASSIGN);
                        this.state = 564;
                        this.expression(20);
                        }
                        break;
                    case 20:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 565;
                        if (!(this.precpred(this.context, 18))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 18)");
                        }
                        this.state = 566;
                        this.match(LPCParser.DIV_ASSIGN);
                        this.state = 567;
                        this.expression(19);
                        }
                        break;
                    case 21:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 568;
                        if (!(this.precpred(this.context, 17))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 17)");
                        }
                        this.state = 569;
                        this.match(LPCParser.MOD_ASSIGN);
                        this.state = 570;
                        this.expression(18);
                        }
                        break;
                    case 22:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 571;
                        if (!(this.precpred(this.context, 16))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 16)");
                        }
                        this.state = 572;
                        this.match(LPCParser.AND_ASSIGN);
                        this.state = 573;
                        this.expression(17);
                        }
                        break;
                    case 23:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 574;
                        if (!(this.precpred(this.context, 15))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 15)");
                        }
                        this.state = 575;
                        this.match(LPCParser.OR_ASSIGN);
                        this.state = 576;
                        this.expression(16);
                        }
                        break;
                    case 24:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 577;
                        if (!(this.precpred(this.context, 14))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 14)");
                        }
                        this.state = 578;
                        this.match(LPCParser.XOR_ASSIGN);
                        this.state = 579;
                        this.expression(15);
                        }
                        break;
                    case 25:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 580;
                        if (!(this.precpred(this.context, 13))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 13)");
                        }
                        this.state = 581;
                        this.match(LPCParser.QUESTION);
                        this.state = 582;
                        this.expression(0);
                        this.state = 583;
                        this.match(LPCParser.COLON);
                        this.state = 584;
                        this.expression(14);
                        }
                        break;
                    case 26:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 586;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 587;
                        this.match(LPCParser.INC);
                        }
                        break;
                    case 27:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 588;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 589;
                        this.match(LPCParser.DEC);
                        }
                        break;
                    case 28:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 590;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 591;
                        this.assignmentExpression();
                        }
                        break;
                    case 29:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 592;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 593;
                        this.match(LPCParser.SQUARE_OPEN);
                        this.state = 594;
                        this.expression(0);
                        this.state = 595;
                        this.match(LPCParser.SQUARE_CLOSE);
                        }
                        break;
                    case 30:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        localContext._callOtherOb = previousContext;
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 597;
                        if (!(this.precpred(this.context, 1))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                        }
                        this.state = 598;
                        this.match(LPCParser.ARROW);
                        this.state = 599;
                        this.callOtherTarget();
                        this.state = 600;
                        this.match(LPCParser.PAREN_OPEN);
                        this.state = 602;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if (_la === 1 || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 131121) !== 0) || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 221269) !== 0)) {
                            {
                            this.state = 601;
                            this.expressionList();
                            }
                        }

                        this.state = 604;
                        this.match(LPCParser.PAREN_CLOSE);
                        }
                        break;
                    }
                    }
                }
                this.state = 610;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 51, this.context);
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
    public expressionList(): ExpressionListContext {
        let localContext = new ExpressionListContext(this.context, this.state);
        this.enterRule(localContext, 94, LPCParser.RULE_expressionList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 611;
            this.expression(0);
            this.state = 616;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 78) {
                {
                {
                this.state = 612;
                this.match(LPCParser.COMMA);
                this.state = 613;
                this.expression(0);
                }
                }
                this.state = 618;
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
        this.enterRule(localContext, 96, LPCParser.RULE_assignmentExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 619;
            this.match(LPCParser.ASSIGN);
            this.state = 620;
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
        case 29:
            return this.typeSpecifier_sempred(localContext as TypeSpecifierContext, predIndex);
        case 46:
            return this.expression_sempred(localContext as ExpressionContext, predIndex);
        }
        return true;
    }
    private typeSpecifier_sempred(localContext: TypeSpecifierContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 1);
        }
        return true;
    }
    private expression_sempred(localContext: ExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
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
            return this.precpred(this.context, 13);
        case 26:
            return this.precpred(this.context, 8);
        case 27:
            return this.precpred(this.context, 7);
        case 28:
            return this.precpred(this.context, 6);
        case 29:
            return this.precpred(this.context, 5);
        case 30:
            return this.precpred(this.context, 1);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,115,623,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
        7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,
        13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
        20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,
        26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,
        33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,
        39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
        46,7,46,2,47,7,47,2,48,7,48,1,0,1,0,1,0,5,0,102,8,0,10,0,12,0,105,
        9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,5,1,124,8,1,10,1,12,1,127,9,1,3,1,129,8,1,1,2,1,2,1,2,1,
        3,1,3,1,3,1,3,1,3,1,3,3,3,140,8,3,1,4,1,4,1,5,1,5,1,6,1,6,1,7,1,
        7,1,8,1,8,1,8,1,8,5,8,154,8,8,10,8,12,8,157,9,8,1,8,1,8,1,9,1,9,
        1,10,1,10,1,11,1,11,3,11,167,8,11,1,12,1,12,1,12,3,12,172,8,12,1,
        13,1,13,1,13,1,13,1,14,1,14,1,15,1,15,1,16,1,16,1,16,1,16,1,17,1,
        17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,3,17,195,8,17,1,18,1,18,3,
        18,199,8,18,1,19,1,19,1,20,3,20,204,8,20,1,20,3,20,207,8,20,1,20,
        1,20,1,20,3,20,212,8,20,1,20,1,20,1,20,1,21,1,21,1,21,5,21,220,8,
        21,10,21,12,21,223,9,21,1,22,3,22,226,8,22,1,22,1,22,1,23,1,23,1,
        23,1,23,5,23,234,8,23,10,23,12,23,237,9,23,3,23,239,8,23,1,23,1,
        23,1,24,1,24,1,25,1,25,1,25,1,25,1,25,5,25,250,8,25,10,25,12,25,
        253,9,25,3,25,255,8,25,1,26,1,26,1,26,1,26,5,26,261,8,26,10,26,12,
        26,264,9,26,3,26,266,8,26,1,26,1,26,1,26,1,27,1,27,1,27,3,27,274,
        8,27,1,27,1,27,1,27,3,27,279,8,27,5,27,281,8,27,10,27,12,27,284,
        9,27,1,27,1,27,1,28,1,28,1,29,1,29,1,29,1,29,1,29,5,29,295,8,29,
        10,29,12,29,298,9,29,1,30,1,30,1,30,5,30,303,8,30,10,30,12,30,306,
        9,30,3,30,308,8,30,1,30,1,30,1,31,1,31,1,31,1,31,1,31,1,31,1,31,
        1,31,3,31,320,8,31,1,32,1,32,1,32,1,33,1,33,5,33,327,8,33,10,33,
        12,33,330,9,33,1,33,1,33,1,34,1,34,3,34,336,8,34,1,35,1,35,1,35,
        1,35,1,35,1,35,1,35,1,36,1,36,1,36,1,37,1,37,1,37,1,37,1,37,1,37,
        1,38,1,38,5,38,356,8,38,10,38,12,38,359,9,38,1,38,3,38,362,8,38,
        1,39,1,39,1,39,1,39,1,39,1,39,1,39,5,39,371,8,39,10,39,12,39,374,
        9,39,1,39,1,39,1,40,1,40,1,40,1,40,3,40,382,8,40,1,41,1,41,1,41,
        1,41,5,41,388,8,41,10,41,12,41,391,9,41,1,42,1,42,1,42,5,42,396,
        8,42,10,42,12,42,399,9,42,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,
        1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,3,43,418,8,43,1,43,
        1,43,5,43,422,8,43,10,43,12,43,425,9,43,1,43,1,43,3,43,429,8,43,
        1,43,1,43,3,43,433,8,43,1,43,1,43,5,43,437,8,43,10,43,12,43,440,
        9,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,3,43,
        453,8,43,1,44,1,44,1,44,1,44,1,44,1,44,3,44,461,8,44,1,44,3,44,464,
        8,44,1,45,1,45,1,45,1,45,1,45,3,45,471,8,45,1,46,1,46,1,46,1,46,
        1,46,1,46,1,46,5,46,480,8,46,10,46,12,46,483,9,46,1,46,1,46,1,46,
        1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,
        1,46,3,46,502,8,46,1,46,1,46,1,46,3,46,507,8,46,1,46,1,46,1,46,1,
        46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,
        46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,
        46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,
        46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,
        46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,
        46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,
        46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,3,
        46,603,8,46,1,46,1,46,5,46,607,8,46,10,46,12,46,610,9,46,1,47,1,
        47,1,47,5,47,615,8,47,10,47,12,47,618,9,47,1,48,1,48,1,48,1,48,0,
        2,58,92,49,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,
        40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,
        84,86,88,90,92,94,96,0,9,2,0,12,12,14,14,2,0,13,13,22,24,3,0,11,
        11,29,29,44,44,3,0,1,1,104,104,107,107,1,0,48,53,2,0,104,104,107,
        108,7,0,5,6,17,17,28,28,30,32,36,39,43,43,45,45,2,0,104,104,107,
        107,2,0,25,25,76,76,681,0,103,1,0,0,0,2,128,1,0,0,0,4,130,1,0,0,
        0,6,139,1,0,0,0,8,141,1,0,0,0,10,143,1,0,0,0,12,145,1,0,0,0,14,147,
        1,0,0,0,16,149,1,0,0,0,18,160,1,0,0,0,20,162,1,0,0,0,22,166,1,0,
        0,0,24,168,1,0,0,0,26,173,1,0,0,0,28,177,1,0,0,0,30,179,1,0,0,0,
        32,181,1,0,0,0,34,194,1,0,0,0,36,198,1,0,0,0,38,200,1,0,0,0,40,203,
        1,0,0,0,42,216,1,0,0,0,44,225,1,0,0,0,46,229,1,0,0,0,48,242,1,0,
        0,0,50,244,1,0,0,0,52,256,1,0,0,0,54,270,1,0,0,0,56,287,1,0,0,0,
        58,289,1,0,0,0,60,299,1,0,0,0,62,319,1,0,0,0,64,321,1,0,0,0,66,324,
        1,0,0,0,68,335,1,0,0,0,70,337,1,0,0,0,72,344,1,0,0,0,74,347,1,0,
        0,0,76,353,1,0,0,0,78,363,1,0,0,0,80,381,1,0,0,0,82,383,1,0,0,0,
        84,392,1,0,0,0,86,452,1,0,0,0,88,463,1,0,0,0,90,470,1,0,0,0,92,506,
        1,0,0,0,94,611,1,0,0,0,96,619,1,0,0,0,98,102,3,36,18,0,99,102,3,
        2,1,0,100,102,3,32,16,0,101,98,1,0,0,0,101,99,1,0,0,0,101,100,1,
        0,0,0,102,105,1,0,0,0,103,101,1,0,0,0,103,104,1,0,0,0,104,106,1,
        0,0,0,105,103,1,0,0,0,106,107,5,0,0,1,107,1,1,0,0,0,108,129,3,6,
        3,0,109,110,5,21,0,0,110,111,3,12,6,0,111,112,3,14,7,0,112,129,1,
        0,0,0,113,129,3,4,2,0,114,115,5,21,0,0,115,116,3,20,10,0,116,117,
        3,22,11,0,117,129,1,0,0,0,118,119,5,21,0,0,119,120,3,30,15,0,120,
        125,5,1,0,0,121,122,5,78,0,0,122,124,5,1,0,0,123,121,1,0,0,0,124,
        127,1,0,0,0,125,123,1,0,0,0,125,126,1,0,0,0,126,129,1,0,0,0,127,
        125,1,0,0,0,128,108,1,0,0,0,128,109,1,0,0,0,128,113,1,0,0,0,128,
        114,1,0,0,0,128,118,1,0,0,0,129,3,1,0,0,0,130,131,5,111,0,0,131,
        132,5,113,0,0,132,5,1,0,0,0,133,134,5,21,0,0,134,135,3,10,5,0,135,
        136,3,14,7,0,136,140,1,0,0,0,137,138,5,21,0,0,138,140,3,8,4,0,139,
        133,1,0,0,0,139,137,1,0,0,0,140,7,1,0,0,0,141,142,7,0,0,0,142,9,
        1,0,0,0,143,144,7,1,0,0,144,11,1,0,0,0,145,146,7,2,0,0,146,13,1,
        0,0,0,147,148,7,3,0,0,148,15,1,0,0,0,149,150,5,97,0,0,150,155,5,
        1,0,0,151,152,5,78,0,0,152,154,5,1,0,0,153,151,1,0,0,0,154,157,1,
        0,0,0,155,153,1,0,0,0,155,156,1,0,0,0,156,158,1,0,0,0,157,155,1,
        0,0,0,158,159,5,98,0,0,159,17,1,0,0,0,160,161,3,92,46,0,161,19,1,
        0,0,0,162,163,5,26,0,0,163,21,1,0,0,0,164,167,3,26,13,0,165,167,
        3,28,14,0,166,164,1,0,0,0,166,165,1,0,0,0,167,23,1,0,0,0,168,171,
        5,1,0,0,169,170,5,80,0,0,170,172,5,1,0,0,171,169,1,0,0,0,171,172,
        1,0,0,0,172,25,1,0,0,0,173,174,5,63,0,0,174,175,3,24,12,0,175,176,
        5,64,0,0,176,27,1,0,0,0,177,178,5,107,0,0,178,29,1,0,0,0,179,180,
        5,33,0,0,180,31,1,0,0,0,181,182,5,27,0,0,182,183,5,107,0,0,183,184,
        5,77,0,0,184,33,1,0,0,0,185,186,5,81,0,0,186,187,3,92,46,0,187,188,
        5,77,0,0,188,195,1,0,0,0,189,190,5,107,0,0,190,191,5,81,0,0,191,
        192,3,92,46,0,192,193,5,77,0,0,193,195,1,0,0,0,194,185,1,0,0,0,194,
        189,1,0,0,0,195,35,1,0,0,0,196,199,3,40,20,0,197,199,3,54,27,0,198,
        196,1,0,0,0,198,197,1,0,0,0,199,37,1,0,0,0,200,201,7,4,0,0,201,39,
        1,0,0,0,202,204,3,38,19,0,203,202,1,0,0,0,203,204,1,0,0,0,204,206,
        1,0,0,0,205,207,3,58,29,0,206,205,1,0,0,0,206,207,1,0,0,0,207,208,
        1,0,0,0,208,209,5,1,0,0,209,211,5,97,0,0,210,212,3,42,21,0,211,210,
        1,0,0,0,211,212,1,0,0,0,212,213,1,0,0,0,213,214,5,98,0,0,214,215,
        3,66,33,0,215,41,1,0,0,0,216,221,3,44,22,0,217,218,5,78,0,0,218,
        220,3,44,22,0,219,217,1,0,0,0,220,223,1,0,0,0,221,219,1,0,0,0,221,
        222,1,0,0,0,222,43,1,0,0,0,223,221,1,0,0,0,224,226,3,58,29,0,225,
        224,1,0,0,0,225,226,1,0,0,0,226,227,1,0,0,0,227,228,5,1,0,0,228,
        45,1,0,0,0,229,238,5,91,0,0,230,235,3,92,46,0,231,232,5,78,0,0,232,
        234,3,92,46,0,233,231,1,0,0,0,234,237,1,0,0,0,235,233,1,0,0,0,235,
        236,1,0,0,0,236,239,1,0,0,0,237,235,1,0,0,0,238,230,1,0,0,0,238,
        239,1,0,0,0,239,240,1,0,0,0,240,241,5,92,0,0,241,47,1,0,0,0,242,
        243,7,5,0,0,243,49,1,0,0,0,244,254,3,48,24,0,245,246,5,76,0,0,246,
        251,3,92,46,0,247,248,5,77,0,0,248,250,3,92,46,0,249,247,1,0,0,0,
        250,253,1,0,0,0,251,249,1,0,0,0,251,252,1,0,0,0,252,255,1,0,0,0,
        253,251,1,0,0,0,254,245,1,0,0,0,254,255,1,0,0,0,255,51,1,0,0,0,256,
        265,5,93,0,0,257,262,3,50,25,0,258,259,5,78,0,0,259,261,3,50,25,
        0,260,258,1,0,0,0,261,264,1,0,0,0,262,260,1,0,0,0,262,263,1,0,0,
        0,263,266,1,0,0,0,264,262,1,0,0,0,265,257,1,0,0,0,265,266,1,0,0,
        0,266,267,1,0,0,0,267,268,5,102,0,0,268,269,5,98,0,0,269,53,1,0,
        0,0,270,271,3,58,29,0,271,273,5,1,0,0,272,274,3,96,48,0,273,272,
        1,0,0,0,273,274,1,0,0,0,274,282,1,0,0,0,275,276,5,78,0,0,276,278,
        5,1,0,0,277,279,3,96,48,0,278,277,1,0,0,0,278,279,1,0,0,0,279,281,
        1,0,0,0,280,275,1,0,0,0,281,284,1,0,0,0,282,280,1,0,0,0,282,283,
        1,0,0,0,283,285,1,0,0,0,284,282,1,0,0,0,285,286,5,77,0,0,286,55,
        1,0,0,0,287,288,7,6,0,0,288,57,1,0,0,0,289,290,6,29,-1,0,290,291,
        3,56,28,0,291,296,1,0,0,0,292,293,10,1,0,0,293,295,5,56,0,0,294,
        292,1,0,0,0,295,298,1,0,0,0,296,294,1,0,0,0,296,297,1,0,0,0,297,
        59,1,0,0,0,298,296,1,0,0,0,299,307,5,95,0,0,300,308,3,92,46,0,301,
        303,3,62,31,0,302,301,1,0,0,0,303,306,1,0,0,0,304,302,1,0,0,0,304,
        305,1,0,0,0,305,308,1,0,0,0,306,304,1,0,0,0,307,300,1,0,0,0,307,
        304,1,0,0,0,308,309,1,0,0,0,309,310,5,96,0,0,310,61,1,0,0,0,311,
        320,3,64,32,0,312,320,3,66,33,0,313,320,3,68,34,0,314,320,3,86,43,
        0,315,320,3,88,44,0,316,320,3,54,27,0,317,320,3,34,17,0,318,320,
        3,6,3,0,319,311,1,0,0,0,319,312,1,0,0,0,319,313,1,0,0,0,319,314,
        1,0,0,0,319,315,1,0,0,0,319,316,1,0,0,0,319,317,1,0,0,0,319,318,
        1,0,0,0,320,63,1,0,0,0,321,322,3,92,46,0,322,323,5,77,0,0,323,65,
        1,0,0,0,324,328,5,99,0,0,325,327,3,62,31,0,326,325,1,0,0,0,327,330,
        1,0,0,0,328,326,1,0,0,0,328,329,1,0,0,0,329,331,1,0,0,0,330,328,
        1,0,0,0,331,332,5,100,0,0,332,67,1,0,0,0,333,336,3,76,38,0,334,336,
        3,78,39,0,335,333,1,0,0,0,335,334,1,0,0,0,336,69,1,0,0,0,337,338,
        5,12,0,0,338,339,5,22,0,0,339,340,5,97,0,0,340,341,3,92,46,0,341,
        342,5,98,0,0,342,343,3,62,31,0,343,71,1,0,0,0,344,345,5,12,0,0,345,
        346,3,62,31,0,346,73,1,0,0,0,347,348,5,22,0,0,348,349,5,97,0,0,349,
        350,3,92,46,0,350,351,5,98,0,0,351,352,3,62,31,0,352,75,1,0,0,0,
        353,357,3,74,37,0,354,356,3,70,35,0,355,354,1,0,0,0,356,359,1,0,
        0,0,357,355,1,0,0,0,357,358,1,0,0,0,358,361,1,0,0,0,359,357,1,0,
        0,0,360,362,3,72,36,0,361,360,1,0,0,0,361,362,1,0,0,0,362,77,1,0,
        0,0,363,364,5,40,0,0,364,365,5,97,0,0,365,366,3,92,46,0,366,367,
        5,98,0,0,367,372,5,99,0,0,368,371,3,82,41,0,369,371,3,84,42,0,370,
        368,1,0,0,0,370,369,1,0,0,0,371,374,1,0,0,0,372,370,1,0,0,0,372,
        373,1,0,0,0,373,375,1,0,0,0,374,372,1,0,0,0,375,376,5,100,0,0,376,
        79,1,0,0,0,377,382,7,7,0,0,378,379,7,7,0,0,379,380,5,79,0,0,380,
        382,7,7,0,0,381,377,1,0,0,0,381,378,1,0,0,0,382,81,1,0,0,0,383,384,
        5,4,0,0,384,385,3,80,40,0,385,389,5,76,0,0,386,388,3,62,31,0,387,
        386,1,0,0,0,388,391,1,0,0,0,389,387,1,0,0,0,389,390,1,0,0,0,390,
        83,1,0,0,0,391,389,1,0,0,0,392,393,5,9,0,0,393,397,5,76,0,0,394,
        396,3,62,31,0,395,394,1,0,0,0,396,399,1,0,0,0,397,395,1,0,0,0,397,
        398,1,0,0,0,398,85,1,0,0,0,399,397,1,0,0,0,400,401,5,47,0,0,401,
        402,5,97,0,0,402,403,3,92,46,0,403,404,5,98,0,0,404,405,3,62,31,
        0,405,453,1,0,0,0,406,407,5,10,0,0,407,408,3,62,31,0,408,409,5,47,
        0,0,409,410,5,97,0,0,410,411,3,92,46,0,411,412,5,98,0,0,412,413,
        5,77,0,0,413,453,1,0,0,0,414,415,5,18,0,0,415,417,5,97,0,0,416,418,
        3,92,46,0,417,416,1,0,0,0,417,418,1,0,0,0,418,423,1,0,0,0,419,420,
        5,78,0,0,420,422,3,92,46,0,421,419,1,0,0,0,422,425,1,0,0,0,423,421,
        1,0,0,0,423,424,1,0,0,0,424,426,1,0,0,0,425,423,1,0,0,0,426,428,
        5,77,0,0,427,429,3,92,46,0,428,427,1,0,0,0,428,429,1,0,0,0,429,430,
        1,0,0,0,430,432,5,77,0,0,431,433,3,92,46,0,432,431,1,0,0,0,432,433,
        1,0,0,0,433,438,1,0,0,0,434,435,5,78,0,0,435,437,3,92,46,0,436,434,
        1,0,0,0,437,440,1,0,0,0,438,436,1,0,0,0,438,439,1,0,0,0,439,441,
        1,0,0,0,440,438,1,0,0,0,441,442,5,98,0,0,442,453,3,62,31,0,443,444,
        5,19,0,0,444,445,5,97,0,0,445,446,3,58,29,0,446,447,5,1,0,0,447,
        448,7,8,0,0,448,449,3,92,46,0,449,450,5,98,0,0,450,451,3,62,31,0,
        451,453,1,0,0,0,452,400,1,0,0,0,452,406,1,0,0,0,452,414,1,0,0,0,
        452,443,1,0,0,0,453,87,1,0,0,0,454,455,5,3,0,0,455,464,5,77,0,0,
        456,457,5,8,0,0,457,464,5,77,0,0,458,460,5,35,0,0,459,461,3,92,46,
        0,460,459,1,0,0,0,460,461,1,0,0,0,461,462,1,0,0,0,462,464,5,77,0,
        0,463,454,1,0,0,0,463,456,1,0,0,0,463,458,1,0,0,0,464,89,1,0,0,0,
        465,471,5,1,0,0,466,467,5,97,0,0,467,468,5,1,0,0,468,471,5,98,0,
        0,469,471,5,107,0,0,470,465,1,0,0,0,470,466,1,0,0,0,470,469,1,0,
        0,0,471,91,1,0,0,0,472,473,6,46,-1,0,473,507,5,1,0,0,474,507,5,104,
        0,0,475,507,5,105,0,0,476,507,5,107,0,0,477,481,5,107,0,0,478,480,
        5,107,0,0,479,478,1,0,0,0,480,483,1,0,0,0,481,479,1,0,0,0,481,482,
        1,0,0,0,482,507,1,0,0,0,483,481,1,0,0,0,484,507,5,108,0,0,485,486,
        5,97,0,0,486,487,3,92,46,0,487,488,5,98,0,0,488,507,1,0,0,0,489,
        507,3,60,30,0,490,491,5,72,0,0,491,507,3,92,46,12,492,493,5,59,0,
        0,493,507,3,92,46,11,494,495,5,60,0,0,495,507,3,92,46,10,496,497,
        5,55,0,0,497,507,3,92,46,9,498,499,5,1,0,0,499,501,5,97,0,0,500,
        502,3,94,47,0,501,500,1,0,0,0,501,502,1,0,0,0,502,503,1,0,0,0,503,
        507,5,98,0,0,504,507,3,52,26,0,505,507,3,46,23,0,506,472,1,0,0,0,
        506,474,1,0,0,0,506,475,1,0,0,0,506,476,1,0,0,0,506,477,1,0,0,0,
        506,484,1,0,0,0,506,485,1,0,0,0,506,489,1,0,0,0,506,490,1,0,0,0,
        506,492,1,0,0,0,506,494,1,0,0,0,506,496,1,0,0,0,506,498,1,0,0,0,
        506,504,1,0,0,0,506,505,1,0,0,0,507,608,1,0,0,0,508,509,10,37,0,
        0,509,510,5,54,0,0,510,607,3,92,46,38,511,512,10,36,0,0,512,513,
        5,55,0,0,513,607,3,92,46,37,514,515,10,35,0,0,515,516,5,56,0,0,516,
        607,3,92,46,36,517,518,10,34,0,0,518,519,5,57,0,0,519,607,3,92,46,
        35,520,521,10,33,0,0,521,522,5,58,0,0,522,607,3,92,46,34,523,524,
        10,32,0,0,524,525,5,63,0,0,525,607,3,92,46,33,526,527,10,31,0,0,
        527,528,5,64,0,0,528,607,3,92,46,32,529,530,10,30,0,0,530,531,5,
        65,0,0,531,607,3,92,46,31,532,533,10,29,0,0,533,534,5,66,0,0,534,
        607,3,92,46,30,535,536,10,28,0,0,536,537,5,67,0,0,537,607,3,92,46,
        29,538,539,10,27,0,0,539,540,5,68,0,0,540,607,3,92,46,28,541,542,
        10,26,0,0,542,543,5,69,0,0,543,607,3,92,46,27,544,545,10,25,0,0,
        545,546,5,70,0,0,546,607,3,92,46,26,547,548,10,24,0,0,548,549,5,
        71,0,0,549,607,3,92,46,25,550,551,10,23,0,0,551,552,5,73,0,0,552,
        607,3,92,46,24,553,554,10,22,0,0,554,555,5,74,0,0,555,607,3,92,46,
        23,556,557,10,21,0,0,557,558,5,83,0,0,558,607,3,92,46,22,559,560,
        10,20,0,0,560,561,5,84,0,0,561,607,3,92,46,21,562,563,10,19,0,0,
        563,564,5,85,0,0,564,607,3,92,46,20,565,566,10,18,0,0,566,567,5,
        86,0,0,567,607,3,92,46,19,568,569,10,17,0,0,569,570,5,87,0,0,570,
        607,3,92,46,18,571,572,10,16,0,0,572,573,5,88,0,0,573,607,3,92,46,
        17,574,575,10,15,0,0,575,576,5,89,0,0,576,607,3,92,46,16,577,578,
        10,14,0,0,578,579,5,90,0,0,579,607,3,92,46,15,580,581,10,13,0,0,
        581,582,5,75,0,0,582,583,3,92,46,0,583,584,5,76,0,0,584,585,3,92,
        46,14,585,607,1,0,0,0,586,587,10,8,0,0,587,607,5,59,0,0,588,589,
        10,7,0,0,589,607,5,60,0,0,590,591,10,6,0,0,591,607,3,96,48,0,592,
        593,10,5,0,0,593,594,5,101,0,0,594,595,3,92,46,0,595,596,5,102,0,
        0,596,607,1,0,0,0,597,598,10,1,0,0,598,599,5,94,0,0,599,600,3,90,
        45,0,600,602,5,97,0,0,601,603,3,94,47,0,602,601,1,0,0,0,602,603,
        1,0,0,0,603,604,1,0,0,0,604,605,5,98,0,0,605,607,1,0,0,0,606,508,
        1,0,0,0,606,511,1,0,0,0,606,514,1,0,0,0,606,517,1,0,0,0,606,520,
        1,0,0,0,606,523,1,0,0,0,606,526,1,0,0,0,606,529,1,0,0,0,606,532,
        1,0,0,0,606,535,1,0,0,0,606,538,1,0,0,0,606,541,1,0,0,0,606,544,
        1,0,0,0,606,547,1,0,0,0,606,550,1,0,0,0,606,553,1,0,0,0,606,556,
        1,0,0,0,606,559,1,0,0,0,606,562,1,0,0,0,606,565,1,0,0,0,606,568,
        1,0,0,0,606,571,1,0,0,0,606,574,1,0,0,0,606,577,1,0,0,0,606,580,
        1,0,0,0,606,586,1,0,0,0,606,588,1,0,0,0,606,590,1,0,0,0,606,592,
        1,0,0,0,606,597,1,0,0,0,607,610,1,0,0,0,608,606,1,0,0,0,608,609,
        1,0,0,0,609,93,1,0,0,0,610,608,1,0,0,0,611,616,3,92,46,0,612,613,
        5,78,0,0,613,615,3,92,46,0,614,612,1,0,0,0,615,618,1,0,0,0,616,614,
        1,0,0,0,616,617,1,0,0,0,617,95,1,0,0,0,618,616,1,0,0,0,619,620,5,
        82,0,0,620,621,3,92,46,0,621,97,1,0,0,0,53,101,103,125,128,139,155,
        166,171,194,198,203,206,211,221,225,235,238,251,254,262,265,273,
        278,282,296,304,307,319,328,335,357,361,370,372,381,389,397,417,
        423,428,432,438,452,460,463,470,481,501,506,602,606,608,616
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


export class InheritSuperStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SUPER_ACCESSOR(): antlr.TerminalNode {
        return this.getToken(LPCParser.SUPER_ACCESSOR, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(LPCParser.SEMI, 0)!;
    }
    public StringLiteral(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.StringLiteral, 0);
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


export class DeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
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


export class FunctionDeclarationContext extends antlr.ParserRuleContext {
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
    public compoundStatement(): CompoundStatementContext {
        return this.getRuleContext(0, CompoundStatementContext)!;
    }
    public functionModifier(): FunctionModifierContext | null {
        return this.getRuleContext(0, FunctionModifierContext);
    }
    public typeSpecifier(): TypeSpecifierContext | null {
        return this.getRuleContext(0, TypeSpecifierContext);
    }
    public parameterList(): ParameterListContext | null {
        return this.getRuleContext(0, ParameterListContext);
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


export class VariableDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public typeSpecifier(): TypeSpecifierContext {
        return this.getRuleContext(0, TypeSpecifierContext)!;
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


export class TypeSpecifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public primitiveTypeSpecifier(): PrimitiveTypeSpecifierContext | null {
        return this.getRuleContext(0, PrimitiveTypeSpecifierContext);
    }
    public typeSpecifier(): TypeSpecifierContext | null {
        return this.getRuleContext(0, TypeSpecifierContext);
    }
    public STAR(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.STAR, 0);
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
    public CLOSURE_OPEN(): antlr.TerminalNode {
        return this.getToken(LPCParser.CLOSURE_OPEN, 0)!;
    }
    public CLOSURE_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.CLOSURE_CLOSE, 0)!;
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
    public inheritSuperStatement(): InheritSuperStatementContext | null {
        return this.getRuleContext(0, InheritSuperStatementContext);
    }
    public selectionDirective(): SelectionDirectiveContext | null {
        return this.getRuleContext(0, SelectionDirectiveContext);
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


export class JumpStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BREAK(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.BREAK, 0);
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(LPCParser.SEMI, 0)!;
    }
    public CONTINUE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.CONTINUE, 0);
    }
    public RETURN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.RETURN, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
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
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.MINUS, 0);
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
    public SQUARE_OPEN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SQUARE_OPEN, 0);
    }
    public SQUARE_CLOSE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SQUARE_CLOSE, 0);
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

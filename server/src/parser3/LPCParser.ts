// Generated from grammar/LPC.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { LPCListener } from "./LPCListener.js";
import { LPCVisitor } from "./LPCVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class LPCParser extends antlr.Parser {
    public static readonly T__0 = 1;
    public static readonly T__1 = 2;
    public static readonly T__2 = 3;
    public static readonly T__3 = 4;
    public static readonly T__4 = 5;
    public static readonly T__5 = 6;
    public static readonly T__6 = 7;
    public static readonly T__7 = 8;
    public static readonly T__8 = 9;
    public static readonly T__9 = 10;
    public static readonly T__10 = 11;
    public static readonly T__11 = 12;
    public static readonly T__12 = 13;
    public static readonly T__13 = 14;
    public static readonly T__14 = 15;
    public static readonly T__15 = 16;
    public static readonly T__16 = 17;
    public static readonly T__17 = 18;
    public static readonly T__18 = 19;
    public static readonly AUTO = 20;
    public static readonly BREAK = 21;
    public static readonly CASE = 22;
    public static readonly CHAR = 23;
    public static readonly CLOSURE = 24;
    public static readonly CONST = 25;
    public static readonly CONTINUE = 26;
    public static readonly DEFAULT = 27;
    public static readonly DO = 28;
    public static readonly ELSE = 29;
    public static readonly ENUM = 30;
    public static readonly EXTERN = 31;
    public static readonly FLOAT = 32;
    public static readonly FOR = 33;
    public static readonly GOTO = 34;
    public static readonly IF = 35;
    public static readonly INT = 36;
    public static readonly MAPPING = 37;
    public static readonly OBJECT = 38;
    public static readonly REGISTER = 39;
    public static readonly RETURN = 40;
    public static readonly SHORT = 41;
    public static readonly SIZEOF = 42;
    public static readonly STATUS = 43;
    public static readonly STATIC = 44;
    public static readonly STRUCT = 45;
    public static readonly STRING = 46;
    public static readonly SYMBOL = 47;
    public static readonly SWITCH = 48;
    public static readonly TYPEDEF = 49;
    public static readonly UNION = 50;
    public static readonly UNKNOWN = 51;
    public static readonly VOID = 52;
    public static readonly VOLATILE = 53;
    public static readonly WHILE = 54;
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
    public static readonly SUPER_ACCESSOR = 80;
    public static readonly ADD_ASSIGN = 81;
    public static readonly SUB_ASSIGN = 82;
    public static readonly MUL_ASSIGN = 83;
    public static readonly DIV_ASSIGN = 84;
    public static readonly MOD_ASSIGN = 85;
    public static readonly AND_ASSIGN = 86;
    public static readonly OR_ASSIGN = 87;
    public static readonly XOR_ASSIGN = 88;
    public static readonly ARRAY_OPEN = 89;
    public static readonly ARRAY_CLOSE = 90;
    public static readonly MAPPING_OPEN = 91;
    public static readonly MAPPING_CLOSE = 92;
    public static readonly ARROW = 93;
    public static readonly IntegerConstant = 94;
    public static readonly FloatingConstant = 95;
    public static readonly StringLiteral = 96;
    public static readonly CharacterConstant = 97;
    public static readonly Identifier = 98;
    public static readonly WS = 99;
    public static readonly COMMENT = 100;
    public static readonly LINE_COMMENT = 101;
    public static readonly RULE_program = 0;
    public static readonly RULE_preprocessorDirective = 1;
    public static readonly RULE_directiveType = 2;
    public static readonly RULE_directiveTypeWithArguments = 3;
    public static readonly RULE_directiveArgument = 4;
    public static readonly RULE_directiveTypeDefine = 5;
    public static readonly RULE_directiveDefineParam = 6;
    public static readonly RULE_directiveDefineArgument = 7;
    public static readonly RULE_directiveTypeInclude = 8;
    public static readonly RULE_directiveIncludeFile = 9;
    public static readonly RULE_directiveIncludeFilename = 10;
    public static readonly RULE_directiveIncludeFileGlobal = 11;
    public static readonly RULE_directiveIncludeFileLocal = 12;
    public static readonly RULE_directiveTypePragma = 13;
    public static readonly RULE_inheritStatement = 14;
    public static readonly RULE_inheritSuperStatement = 15;
    public static readonly RULE_declaration = 16;
    public static readonly RULE_functionDeclaration = 17;
    public static readonly RULE_parameterList = 18;
    public static readonly RULE_parameter = 19;
    public static readonly RULE_scalarDeclaration = 20;
    public static readonly RULE_arrayContent = 21;
    public static readonly RULE_arrayDeclaration = 22;
    public static readonly RULE_mappingKey = 23;
    public static readonly RULE_mappingContent = 24;
    public static readonly RULE_mappingExpression = 25;
    public static readonly RULE_variableDeclaration = 26;
    public static readonly RULE_typeSpecifier = 27;
    public static readonly RULE_statement = 28;
    public static readonly RULE_expressionStatement = 29;
    public static readonly RULE_compoundStatement = 30;
    public static readonly RULE_selectionStatement = 31;
    public static readonly RULE_ifStatement = 32;
    public static readonly RULE_switchStatement = 33;
    public static readonly RULE_caseExpression = 34;
    public static readonly RULE_caseStatement = 35;
    public static readonly RULE_defaultStatement = 36;
    public static readonly RULE_iterationStatement = 37;
    public static readonly RULE_jumpStatement = 38;
    public static readonly RULE_callOtherTarget = 39;
    public static readonly RULE_callOtherExpression = 40;
    public static readonly RULE_expression = 41;
    public static readonly RULE_expressionList = 42;

    public static readonly literalNames = [
        null, "'#'", "'endif'", "'ifdef'", "'ifndef'", "'elif'", "'undef'", 
        "'echo'", "'line'", "'define'", "'('", "')'", "'include'", "'.'", 
        "'pragma'", "'inherit'", "'='", "'{'", "'}'", "'..'", "'auto'", 
        "'break'", "'case'", "'char'", "'closure'", "'const'", "'continue'", 
        "'default'", "'do'", "'else'", "'enum'", "'extern'", "'float'", 
        "'for'", "'goto'", "'if'", "'int'", "'mapping'", "'object'", "'register'", 
        "'return'", "'short'", "'sizeof'", "'status'", "'static'", "'struct'", 
        "'string'", "'symbol'", "'switch'", "'typedef'", "'union'", "'unknown'", 
        "'void'", "'volatile'", "'while'", "'+'", "'-'", "'*'", "'/'", "'%'", 
        "'++'", "'--'", "'<<'", "'>>'", "'<'", "'>'", "'<='", "'>='", "'=='", 
        "'!='", "'&'", "'|'", "'^'", "'!'", "'&&'", "'||'", "'?'", "':'", 
        "';'", "','", "'::'", "'+='", "'-='", "'*='", "'/='", "'%='", "'&='", 
        "'|='", "'^='", "'({'", "'})'", "'(['", "'])'", "'->'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, "AUTO", "BREAK", 
        "CASE", "CHAR", "CLOSURE", "CONST", "CONTINUE", "DEFAULT", "DO", 
        "ELSE", "ENUM", "EXTERN", "FLOAT", "FOR", "GOTO", "IF", "INT", "MAPPING", 
        "OBJECT", "REGISTER", "RETURN", "SHORT", "SIZEOF", "STATUS", "STATIC", 
        "STRUCT", "STRING", "SYMBOL", "SWITCH", "TYPEDEF", "UNION", "UNKNOWN", 
        "VOID", "VOLATILE", "WHILE", "PLUS", "MINUS", "STAR", "DIV", "MOD", 
        "INC", "DEC", "SHL", "SHR", "LT", "GT", "LE", "GE", "EQ", "NE", 
        "AND", "OR", "XOR", "NOT", "AND_AND", "OR_OR", "QUESTION", "COLON", 
        "SEMI", "COMMA", "SUPER_ACCESSOR", "ADD_ASSIGN", "SUB_ASSIGN", "MUL_ASSIGN", 
        "DIV_ASSIGN", "MOD_ASSIGN", "AND_ASSIGN", "OR_ASSIGN", "XOR_ASSIGN", 
        "ARRAY_OPEN", "ARRAY_CLOSE", "MAPPING_OPEN", "MAPPING_CLOSE", "ARROW", 
        "IntegerConstant", "FloatingConstant", "StringLiteral", "CharacterConstant", 
        "Identifier", "WS", "COMMENT", "LINE_COMMENT"
    ];
    public static readonly ruleNames = [
        "program", "preprocessorDirective", "directiveType", "directiveTypeWithArguments", 
        "directiveArgument", "directiveTypeDefine", "directiveDefineParam", 
        "directiveDefineArgument", "directiveTypeInclude", "directiveIncludeFile", 
        "directiveIncludeFilename", "directiveIncludeFileGlobal", "directiveIncludeFileLocal", 
        "directiveTypePragma", "inheritStatement", "inheritSuperStatement", 
        "declaration", "functionDeclaration", "parameterList", "parameter", 
        "scalarDeclaration", "arrayContent", "arrayDeclaration", "mappingKey", 
        "mappingContent", "mappingExpression", "variableDeclaration", "typeSpecifier", 
        "statement", "expressionStatement", "compoundStatement", "selectionStatement", 
        "ifStatement", "switchStatement", "caseExpression", "caseStatement", 
        "defaultStatement", "iterationStatement", "jumpStatement", "callOtherTarget", 
        "callOtherExpression", "expression", "expressionList",
    ];

    public get grammarFileName(): string { return "LPC.g4"; }
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
            this.state = 91;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 25198594) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 35186801) !== 0) || _la === 98) {
                {
                this.state = 89;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.CHAR:
                case LPCParser.CLOSURE:
                case LPCParser.FLOAT:
                case LPCParser.INT:
                case LPCParser.MAPPING:
                case LPCParser.OBJECT:
                case LPCParser.STATUS:
                case LPCParser.STRUCT:
                case LPCParser.STRING:
                case LPCParser.SYMBOL:
                case LPCParser.UNKNOWN:
                case LPCParser.VOID:
                case LPCParser.STAR:
                case LPCParser.Identifier:
                    {
                    this.state = 86;
                    this.declaration();
                    }
                    break;
                case LPCParser.T__0:
                    {
                    this.state = 87;
                    this.preprocessorDirective();
                    }
                    break;
                case LPCParser.T__14:
                    {
                    this.state = 88;
                    this.inheritStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 93;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 94;
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
            this.state = 125;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 96;
                this.match(LPCParser.T__0);
                this.state = 97;
                this.directiveType();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 98;
                this.match(LPCParser.T__0);
                this.state = 99;
                this.directiveTypeWithArguments();
                this.state = 100;
                this.directiveArgument();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 102;
                this.match(LPCParser.T__0);
                this.state = 103;
                this.directiveTypeDefine();
                this.state = 104;
                this.match(LPCParser.Identifier);
                this.state = 106;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
                case 1:
                    {
                    this.state = 105;
                    this.directiveDefineParam();
                    }
                    break;
                }
                this.state = 109;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
                case 1:
                    {
                    this.state = 108;
                    this.directiveDefineArgument();
                    }
                    break;
                }
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 111;
                this.match(LPCParser.T__0);
                this.state = 112;
                this.directiveTypeInclude();
                this.state = 113;
                this.directiveIncludeFile();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 115;
                this.match(LPCParser.T__0);
                this.state = 116;
                this.directiveTypePragma();
                this.state = 117;
                this.match(LPCParser.Identifier);
                this.state = 122;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 79) {
                    {
                    {
                    this.state = 118;
                    this.match(LPCParser.COMMA);
                    this.state = 119;
                    this.match(LPCParser.Identifier);
                    }
                    }
                    this.state = 124;
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
    public directiveType(): DirectiveTypeContext {
        let localContext = new DirectiveTypeContext(this.context, this.state);
        this.enterRule(localContext, 4, LPCParser.RULE_directiveType);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 127;
            _la = this.tokenStream.LA(1);
            if(!(_la === 2 || _la === 29)) {
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
        this.enterRule(localContext, 6, LPCParser.RULE_directiveTypeWithArguments);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 129;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 504) !== 0) || _la === 35)) {
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
        this.enterRule(localContext, 8, LPCParser.RULE_directiveArgument);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 131;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 21) !== 0))) {
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
    public directiveTypeDefine(): DirectiveTypeDefineContext {
        let localContext = new DirectiveTypeDefineContext(this.context, this.state);
        this.enterRule(localContext, 10, LPCParser.RULE_directiveTypeDefine);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 133;
            this.match(LPCParser.T__8);
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
        this.enterRule(localContext, 12, LPCParser.RULE_directiveDefineParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 135;
            this.match(LPCParser.T__9);
            this.state = 136;
            this.match(LPCParser.Identifier);
            this.state = 141;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 79) {
                {
                {
                this.state = 137;
                this.match(LPCParser.COMMA);
                this.state = 138;
                this.match(LPCParser.Identifier);
                }
                }
                this.state = 143;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 144;
            this.match(LPCParser.T__10);
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
        this.enterRule(localContext, 14, LPCParser.RULE_directiveDefineArgument);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 146;
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
        this.enterRule(localContext, 16, LPCParser.RULE_directiveTypeInclude);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 148;
            this.match(LPCParser.T__11);
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
        this.enterRule(localContext, 18, LPCParser.RULE_directiveIncludeFile);
        try {
            this.state = 152;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.LT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 150;
                this.directiveIncludeFileGlobal();
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 151;
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
        this.enterRule(localContext, 20, LPCParser.RULE_directiveIncludeFilename);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 154;
            this.match(LPCParser.Identifier);
            this.state = 157;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 13) {
                {
                this.state = 155;
                this.match(LPCParser.T__12);
                this.state = 156;
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
        this.enterRule(localContext, 22, LPCParser.RULE_directiveIncludeFileGlobal);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 159;
            this.match(LPCParser.LT);
            this.state = 160;
            this.directiveIncludeFilename();
            this.state = 161;
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
        this.enterRule(localContext, 24, LPCParser.RULE_directiveIncludeFileLocal);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 163;
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
        this.enterRule(localContext, 26, LPCParser.RULE_directiveTypePragma);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 165;
            this.match(LPCParser.T__13);
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
        this.enterRule(localContext, 28, LPCParser.RULE_inheritStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 167;
            this.match(LPCParser.T__14);
            this.state = 168;
            this.match(LPCParser.StringLiteral);
            this.state = 169;
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
        this.enterRule(localContext, 30, LPCParser.RULE_inheritSuperStatement);
        try {
            this.state = 176;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.SUPER_ACCESSOR:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 171;
                this.match(LPCParser.SUPER_ACCESSOR);
                this.state = 172;
                this.expression(0);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 173;
                this.match(LPCParser.StringLiteral);
                this.state = 174;
                this.match(LPCParser.SUPER_ACCESSOR);
                this.state = 175;
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
        this.enterRule(localContext, 32, LPCParser.RULE_declaration);
        try {
            this.state = 180;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 178;
                this.functionDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 179;
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
    public functionDeclaration(): FunctionDeclarationContext {
        let localContext = new FunctionDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 34, LPCParser.RULE_functionDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 183;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 23)) & ~0x1F) === 0 && ((1 << (_la - 23)) & 835772931) !== 0)) {
                {
                this.state = 182;
                this.typeSpecifier();
                }
            }

            this.state = 185;
            this.match(LPCParser.Identifier);
            this.state = 186;
            this.match(LPCParser.T__9);
            this.state = 188;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 23)) & ~0x1F) === 0 && ((1 << (_la - 23)) & 835772931) !== 0) || _la === 98) {
                {
                this.state = 187;
                this.parameterList();
                }
            }

            this.state = 190;
            this.match(LPCParser.T__10);
            this.state = 191;
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
        this.enterRule(localContext, 36, LPCParser.RULE_parameterList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 193;
            this.parameter();
            this.state = 198;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 79) {
                {
                {
                this.state = 194;
                this.match(LPCParser.COMMA);
                this.state = 195;
                this.parameter();
                }
                }
                this.state = 200;
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
        this.enterRule(localContext, 38, LPCParser.RULE_parameter);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 202;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 23)) & ~0x1F) === 0 && ((1 << (_la - 23)) & 835772931) !== 0)) {
                {
                this.state = 201;
                this.typeSpecifier();
                }
            }

            this.state = 204;
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
    public scalarDeclaration(): ScalarDeclarationContext {
        let localContext = new ScalarDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 40, LPCParser.RULE_scalarDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 206;
            this.typeSpecifier();
            this.state = 207;
            this.match(LPCParser.Identifier);
            this.state = 210;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 16) {
                {
                this.state = 208;
                this.match(LPCParser.T__15);
                this.state = 209;
                this.expression(0);
                }
            }

            this.state = 212;
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
    public arrayContent(): ArrayContentContext {
        let localContext = new ArrayContentContext(this.context, this.state);
        this.enterRule(localContext, 42, LPCParser.RULE_arrayContent);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 214;
            this.match(LPCParser.ARRAY_OPEN);
            this.state = 223;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 10 || ((((_la - 60)) & ~0x1F) === 0 && ((1 << (_la - 60)) & 2147491843) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 31) !== 0)) {
                {
                this.state = 215;
                this.expression(0);
                this.state = 220;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 79) {
                    {
                    {
                    this.state = 216;
                    this.match(LPCParser.COMMA);
                    this.state = 217;
                    this.expression(0);
                    }
                    }
                    this.state = 222;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 225;
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
    public arrayDeclaration(): ArrayDeclarationContext {
        let localContext = new ArrayDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 44, LPCParser.RULE_arrayDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 228;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 23)) & ~0x1F) === 0 && ((1 << (_la - 23)) & 835772931) !== 0)) {
                {
                this.state = 227;
                this.typeSpecifier();
                }
            }

            this.state = 230;
            this.match(LPCParser.STAR);
            this.state = 231;
            this.match(LPCParser.Identifier);
            this.state = 234;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 16) {
                {
                this.state = 232;
                this.match(LPCParser.T__15);
                this.state = 233;
                this.arrayContent();
                }
            }

            this.state = 236;
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
    public mappingKey(): MappingKeyContext {
        let localContext = new MappingKeyContext(this.context, this.state);
        this.enterRule(localContext, 46, LPCParser.RULE_mappingKey);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 238;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 13) !== 0))) {
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
        this.enterRule(localContext, 48, LPCParser.RULE_mappingContent);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 240;
            this.mappingKey();
            this.state = 250;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 77) {
                {
                this.state = 241;
                this.match(LPCParser.COLON);
                this.state = 242;
                this.expression(0);
                this.state = 247;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 78) {
                    {
                    {
                    this.state = 243;
                    this.match(LPCParser.SEMI);
                    this.state = 244;
                    this.expression(0);
                    }
                    }
                    this.state = 249;
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
        this.enterRule(localContext, 50, LPCParser.RULE_mappingExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 252;
            this.match(LPCParser.MAPPING_OPEN);
            this.state = 261;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 13) !== 0)) {
                {
                this.state = 253;
                this.mappingContent();
                this.state = 258;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 79) {
                    {
                    {
                    this.state = 254;
                    this.match(LPCParser.COMMA);
                    this.state = 255;
                    this.mappingContent();
                    }
                    }
                    this.state = 260;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 263;
            this.match(LPCParser.MAPPING_CLOSE);
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
        this.enterRule(localContext, 52, LPCParser.RULE_variableDeclaration);
        try {
            this.state = 267;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 24, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 265;
                this.scalarDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 266;
                this.arrayDeclaration();
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
    public typeSpecifier(): TypeSpecifierContext {
        let localContext = new TypeSpecifierContext(this.context, this.state);
        this.enterRule(localContext, 54, LPCParser.RULE_typeSpecifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 269;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 23)) & ~0x1F) === 0 && ((1 << (_la - 23)) & 835772931) !== 0))) {
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
    public statement(): StatementContext {
        let localContext = new StatementContext(this.context, this.state);
        this.enterRule(localContext, 56, LPCParser.RULE_statement);
        try {
            this.state = 278;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 25, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 271;
                this.expressionStatement();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 272;
                this.compoundStatement();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 273;
                this.selectionStatement();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 274;
                this.iterationStatement();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 275;
                this.jumpStatement();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 276;
                this.variableDeclaration();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 277;
                this.inheritSuperStatement();
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
        this.enterRule(localContext, 58, LPCParser.RULE_expressionStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 281;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 10 || ((((_la - 60)) & ~0x1F) === 0 && ((1 << (_la - 60)) & 2147491843) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 31) !== 0)) {
                {
                this.state = 280;
                this.expression(0);
                }
            }

            this.state = 283;
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
        this.enterRule(localContext, 60, LPCParser.RULE_compoundStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 285;
            this.match(LPCParser.T__16);
            this.state = 289;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 362939392) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 844753275) !== 0) || ((((_la - 73)) & ~0x1F) === 0 && ((1 << (_la - 73)) & 65274017) !== 0)) {
                {
                {
                this.state = 286;
                this.statement();
                }
                }
                this.state = 291;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 292;
            this.match(LPCParser.T__17);
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
        this.enterRule(localContext, 62, LPCParser.RULE_selectionStatement);
        try {
            this.state = 296;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.IF:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 294;
                this.ifStatement();
                }
                break;
            case LPCParser.SWITCH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 295;
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
    public ifStatement(): IfStatementContext {
        let localContext = new IfStatementContext(this.context, this.state);
        this.enterRule(localContext, 64, LPCParser.RULE_ifStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 298;
            this.match(LPCParser.IF);
            this.state = 299;
            this.match(LPCParser.T__9);
            this.state = 300;
            this.expression(0);
            this.state = 301;
            this.match(LPCParser.T__10);
            this.state = 302;
            this.statement();
            this.state = 305;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context) ) {
            case 1:
                {
                this.state = 303;
                this.match(LPCParser.ELSE);
                this.state = 304;
                this.statement();
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
        this.enterRule(localContext, 66, LPCParser.RULE_switchStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 307;
            this.match(LPCParser.SWITCH);
            this.state = 308;
            this.match(LPCParser.T__9);
            this.state = 309;
            this.expression(0);
            this.state = 310;
            this.match(LPCParser.T__10);
            this.state = 311;
            this.match(LPCParser.T__16);
            this.state = 316;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 22 || _la === 27) {
                {
                this.state = 314;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.CASE:
                    {
                    this.state = 312;
                    this.caseStatement();
                    }
                    break;
                case LPCParser.DEFAULT:
                    {
                    this.state = 313;
                    this.defaultStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 318;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 319;
            this.match(LPCParser.T__17);
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
        this.enterRule(localContext, 68, LPCParser.RULE_caseExpression);
        let _la: number;
        try {
            this.state = 325;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 32, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 321;
                _la = this.tokenStream.LA(1);
                if(!(_la === 94 || _la === 96)) {
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
                this.state = 322;
                _la = this.tokenStream.LA(1);
                if(!(_la === 94 || _la === 96)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 323;
                this.match(LPCParser.T__18);
                this.state = 324;
                _la = this.tokenStream.LA(1);
                if(!(_la === 94 || _la === 96)) {
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
        this.enterRule(localContext, 70, LPCParser.RULE_caseStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 327;
            this.match(LPCParser.CASE);
            this.state = 328;
            this.caseExpression();
            this.state = 329;
            this.match(LPCParser.COLON);
            this.state = 333;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 362939392) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 844753275) !== 0) || ((((_la - 73)) & ~0x1F) === 0 && ((1 << (_la - 73)) & 65274017) !== 0)) {
                {
                {
                this.state = 330;
                this.statement();
                }
                }
                this.state = 335;
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
        this.enterRule(localContext, 72, LPCParser.RULE_defaultStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 336;
            this.match(LPCParser.DEFAULT);
            this.state = 337;
            this.match(LPCParser.COLON);
            this.state = 341;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 362939392) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 844753275) !== 0) || ((((_la - 73)) & ~0x1F) === 0 && ((1 << (_la - 73)) & 65274017) !== 0)) {
                {
                {
                this.state = 338;
                this.statement();
                }
                }
                this.state = 343;
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
        this.enterRule(localContext, 74, LPCParser.RULE_iterationStatement);
        let _la: number;
        try {
            this.state = 373;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.WHILE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 344;
                this.match(LPCParser.WHILE);
                this.state = 345;
                this.match(LPCParser.T__9);
                this.state = 346;
                this.expression(0);
                this.state = 347;
                this.match(LPCParser.T__10);
                this.state = 348;
                this.statement();
                }
                break;
            case LPCParser.DO:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 350;
                this.match(LPCParser.DO);
                this.state = 351;
                this.statement();
                this.state = 352;
                this.match(LPCParser.WHILE);
                this.state = 353;
                this.match(LPCParser.T__9);
                this.state = 354;
                this.expression(0);
                this.state = 355;
                this.match(LPCParser.T__10);
                this.state = 356;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.FOR:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 358;
                this.match(LPCParser.FOR);
                this.state = 359;
                this.match(LPCParser.T__9);
                this.state = 361;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 10 || ((((_la - 60)) & ~0x1F) === 0 && ((1 << (_la - 60)) & 2147491843) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 31) !== 0)) {
                    {
                    this.state = 360;
                    this.expression(0);
                    }
                }

                this.state = 363;
                this.match(LPCParser.SEMI);
                this.state = 365;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 10 || ((((_la - 60)) & ~0x1F) === 0 && ((1 << (_la - 60)) & 2147491843) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 31) !== 0)) {
                    {
                    this.state = 364;
                    this.expression(0);
                    }
                }

                this.state = 367;
                this.match(LPCParser.SEMI);
                this.state = 369;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 10 || ((((_la - 60)) & ~0x1F) === 0 && ((1 << (_la - 60)) & 2147491843) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 31) !== 0)) {
                    {
                    this.state = 368;
                    this.expression(0);
                    }
                }

                this.state = 371;
                this.match(LPCParser.T__10);
                this.state = 372;
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
        this.enterRule(localContext, 76, LPCParser.RULE_jumpStatement);
        let _la: number;
        try {
            this.state = 384;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BREAK:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 375;
                this.match(LPCParser.BREAK);
                this.state = 376;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.CONTINUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 377;
                this.match(LPCParser.CONTINUE);
                this.state = 378;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.RETURN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 379;
                this.match(LPCParser.RETURN);
                this.state = 381;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 10 || ((((_la - 60)) & ~0x1F) === 0 && ((1 << (_la - 60)) & 2147491843) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 31) !== 0)) {
                    {
                    this.state = 380;
                    this.expression(0);
                    }
                }

                this.state = 383;
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
        this.enterRule(localContext, 78, LPCParser.RULE_callOtherTarget);
        try {
            this.state = 391;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 386;
                this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.T__9:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 387;
                this.match(LPCParser.T__9);
                this.state = 388;
                this.match(LPCParser.Identifier);
                this.state = 389;
                this.match(LPCParser.T__10);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 390;
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
    public callOtherExpression(): CallOtherExpressionContext {
        let localContext = new CallOtherExpressionContext(this.context, this.state);
        this.enterRule(localContext, 80, LPCParser.RULE_callOtherExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 393;
            _la = this.tokenStream.LA(1);
            if(!(_la === 96 || _la === 98)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 394;
            this.match(LPCParser.ARROW);
            this.state = 395;
            this.callOtherTarget();
            this.state = 396;
            this.match(LPCParser.T__9);
            this.state = 398;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 10 || ((((_la - 60)) & ~0x1F) === 0 && ((1 << (_la - 60)) & 2147491843) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 31) !== 0)) {
                {
                this.state = 397;
                this.expressionList();
                }
            }

            this.state = 400;
            this.match(LPCParser.T__10);
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
        let _startState = 82;
        this.enterRecursionRule(localContext, 82, LPCParser.RULE_expression, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 429;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 44, this.context) ) {
            case 1:
                {
                this.state = 403;
                this.match(LPCParser.Identifier);
                }
                break;
            case 2:
                {
                this.state = 404;
                this.match(LPCParser.IntegerConstant);
                }
                break;
            case 3:
                {
                this.state = 405;
                this.match(LPCParser.FloatingConstant);
                }
                break;
            case 4:
                {
                this.state = 406;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case 5:
                {
                this.state = 407;
                this.match(LPCParser.CharacterConstant);
                }
                break;
            case 6:
                {
                this.state = 408;
                this.match(LPCParser.T__9);
                this.state = 409;
                this.expression(0);
                this.state = 410;
                this.match(LPCParser.T__10);
                }
                break;
            case 7:
                {
                this.state = 412;
                this.match(LPCParser.NOT);
                this.state = 413;
                this.expression(9);
                }
                break;
            case 8:
                {
                this.state = 414;
                this.match(LPCParser.INC);
                this.state = 415;
                this.expression(8);
                }
                break;
            case 9:
                {
                this.state = 416;
                this.match(LPCParser.DEC);
                this.state = 417;
                this.expression(7);
                }
                break;
            case 10:
                {
                this.state = 418;
                this.match(LPCParser.Identifier);
                this.state = 419;
                this.match(LPCParser.T__15);
                this.state = 420;
                this.expression(4);
                }
                break;
            case 11:
                {
                this.state = 421;
                this.match(LPCParser.Identifier);
                this.state = 422;
                this.match(LPCParser.T__9);
                this.state = 424;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 10 || ((((_la - 60)) & ~0x1F) === 0 && ((1 << (_la - 60)) & 2147491843) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 31) !== 0)) {
                    {
                    this.state = 423;
                    this.expressionList();
                    }
                }

                this.state = 426;
                this.match(LPCParser.T__10);
                }
                break;
            case 12:
                {
                this.state = 427;
                this.mappingExpression();
                }
                break;
            case 13:
                {
                this.state = 428;
                this.callOtherExpression();
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 515;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 46, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 513;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 45, this.context) ) {
                    case 1:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 431;
                        if (!(this.precpred(this.context, 34))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 34)");
                        }
                        this.state = 432;
                        this.match(LPCParser.PLUS);
                        this.state = 433;
                        this.expression(35);
                        }
                        break;
                    case 2:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 434;
                        if (!(this.precpred(this.context, 33))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 33)");
                        }
                        this.state = 435;
                        this.match(LPCParser.MINUS);
                        this.state = 436;
                        this.expression(34);
                        }
                        break;
                    case 3:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 437;
                        if (!(this.precpred(this.context, 32))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 32)");
                        }
                        this.state = 438;
                        this.match(LPCParser.STAR);
                        this.state = 439;
                        this.expression(33);
                        }
                        break;
                    case 4:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 440;
                        if (!(this.precpred(this.context, 31))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 31)");
                        }
                        this.state = 441;
                        this.match(LPCParser.DIV);
                        this.state = 442;
                        this.expression(32);
                        }
                        break;
                    case 5:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 443;
                        if (!(this.precpred(this.context, 30))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 30)");
                        }
                        this.state = 444;
                        this.match(LPCParser.MOD);
                        this.state = 445;
                        this.expression(31);
                        }
                        break;
                    case 6:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 446;
                        if (!(this.precpred(this.context, 29))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 29)");
                        }
                        this.state = 447;
                        this.match(LPCParser.LT);
                        this.state = 448;
                        this.expression(30);
                        }
                        break;
                    case 7:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 449;
                        if (!(this.precpred(this.context, 28))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 28)");
                        }
                        this.state = 450;
                        this.match(LPCParser.GT);
                        this.state = 451;
                        this.expression(29);
                        }
                        break;
                    case 8:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 452;
                        if (!(this.precpred(this.context, 27))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 27)");
                        }
                        this.state = 453;
                        this.match(LPCParser.LE);
                        this.state = 454;
                        this.expression(28);
                        }
                        break;
                    case 9:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 455;
                        if (!(this.precpred(this.context, 26))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 26)");
                        }
                        this.state = 456;
                        this.match(LPCParser.GE);
                        this.state = 457;
                        this.expression(27);
                        }
                        break;
                    case 10:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 458;
                        if (!(this.precpred(this.context, 25))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 25)");
                        }
                        this.state = 459;
                        this.match(LPCParser.EQ);
                        this.state = 460;
                        this.expression(26);
                        }
                        break;
                    case 11:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 461;
                        if (!(this.precpred(this.context, 24))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 24)");
                        }
                        this.state = 462;
                        this.match(LPCParser.NE);
                        this.state = 463;
                        this.expression(25);
                        }
                        break;
                    case 12:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 464;
                        if (!(this.precpred(this.context, 23))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 23)");
                        }
                        this.state = 465;
                        this.match(LPCParser.AND);
                        this.state = 466;
                        this.expression(24);
                        }
                        break;
                    case 13:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 467;
                        if (!(this.precpred(this.context, 22))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 22)");
                        }
                        this.state = 468;
                        this.match(LPCParser.OR);
                        this.state = 469;
                        this.expression(23);
                        }
                        break;
                    case 14:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 470;
                        if (!(this.precpred(this.context, 21))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 21)");
                        }
                        this.state = 471;
                        this.match(LPCParser.XOR);
                        this.state = 472;
                        this.expression(22);
                        }
                        break;
                    case 15:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 473;
                        if (!(this.precpred(this.context, 20))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 20)");
                        }
                        this.state = 474;
                        this.match(LPCParser.AND_AND);
                        this.state = 475;
                        this.expression(21);
                        }
                        break;
                    case 16:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 476;
                        if (!(this.precpred(this.context, 19))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 19)");
                        }
                        this.state = 477;
                        this.match(LPCParser.OR_OR);
                        this.state = 478;
                        this.expression(20);
                        }
                        break;
                    case 17:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 479;
                        if (!(this.precpred(this.context, 18))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 18)");
                        }
                        this.state = 480;
                        this.match(LPCParser.ADD_ASSIGN);
                        this.state = 481;
                        this.expression(19);
                        }
                        break;
                    case 18:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 482;
                        if (!(this.precpred(this.context, 17))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 17)");
                        }
                        this.state = 483;
                        this.match(LPCParser.SUB_ASSIGN);
                        this.state = 484;
                        this.expression(18);
                        }
                        break;
                    case 19:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 485;
                        if (!(this.precpred(this.context, 16))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 16)");
                        }
                        this.state = 486;
                        this.match(LPCParser.MUL_ASSIGN);
                        this.state = 487;
                        this.expression(17);
                        }
                        break;
                    case 20:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 488;
                        if (!(this.precpred(this.context, 15))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 15)");
                        }
                        this.state = 489;
                        this.match(LPCParser.DIV_ASSIGN);
                        this.state = 490;
                        this.expression(16);
                        }
                        break;
                    case 21:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 491;
                        if (!(this.precpred(this.context, 14))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 14)");
                        }
                        this.state = 492;
                        this.match(LPCParser.MOD_ASSIGN);
                        this.state = 493;
                        this.expression(15);
                        }
                        break;
                    case 22:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 494;
                        if (!(this.precpred(this.context, 13))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 13)");
                        }
                        this.state = 495;
                        this.match(LPCParser.AND_ASSIGN);
                        this.state = 496;
                        this.expression(14);
                        }
                        break;
                    case 23:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 497;
                        if (!(this.precpred(this.context, 12))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 12)");
                        }
                        this.state = 498;
                        this.match(LPCParser.OR_ASSIGN);
                        this.state = 499;
                        this.expression(13);
                        }
                        break;
                    case 24:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 500;
                        if (!(this.precpred(this.context, 11))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 11)");
                        }
                        this.state = 501;
                        this.match(LPCParser.XOR_ASSIGN);
                        this.state = 502;
                        this.expression(12);
                        }
                        break;
                    case 25:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 503;
                        if (!(this.precpred(this.context, 10))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 10)");
                        }
                        this.state = 504;
                        this.match(LPCParser.QUESTION);
                        this.state = 505;
                        this.expression(0);
                        this.state = 506;
                        this.match(LPCParser.COLON);
                        this.state = 507;
                        this.expression(11);
                        }
                        break;
                    case 26:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 509;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 510;
                        this.match(LPCParser.INC);
                        }
                        break;
                    case 27:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 511;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 512;
                        this.match(LPCParser.DEC);
                        }
                        break;
                    }
                    }
                }
                this.state = 517;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 46, this.context);
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
        this.enterRule(localContext, 84, LPCParser.RULE_expressionList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 518;
            this.expression(0);
            this.state = 523;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 79) {
                {
                {
                this.state = 519;
                this.match(LPCParser.COMMA);
                this.state = 520;
                this.expression(0);
                }
                }
                this.state = 525;
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

    public override sempred(localContext: antlr.RuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 41:
            return this.expression_sempred(localContext as ExpressionContext, predIndex);
        }
        return true;
    }
    private expression_sempred(localContext: ExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 34);
        case 1:
            return this.precpred(this.context, 33);
        case 2:
            return this.precpred(this.context, 32);
        case 3:
            return this.precpred(this.context, 31);
        case 4:
            return this.precpred(this.context, 30);
        case 5:
            return this.precpred(this.context, 29);
        case 6:
            return this.precpred(this.context, 28);
        case 7:
            return this.precpred(this.context, 27);
        case 8:
            return this.precpred(this.context, 26);
        case 9:
            return this.precpred(this.context, 25);
        case 10:
            return this.precpred(this.context, 24);
        case 11:
            return this.precpred(this.context, 23);
        case 12:
            return this.precpred(this.context, 22);
        case 13:
            return this.precpred(this.context, 21);
        case 14:
            return this.precpred(this.context, 20);
        case 15:
            return this.precpred(this.context, 19);
        case 16:
            return this.precpred(this.context, 18);
        case 17:
            return this.precpred(this.context, 17);
        case 18:
            return this.precpred(this.context, 16);
        case 19:
            return this.precpred(this.context, 15);
        case 20:
            return this.precpred(this.context, 14);
        case 21:
            return this.precpred(this.context, 13);
        case 22:
            return this.precpred(this.context, 12);
        case 23:
            return this.precpred(this.context, 11);
        case 24:
            return this.precpred(this.context, 10);
        case 25:
            return this.precpred(this.context, 6);
        case 26:
            return this.precpred(this.context, 5);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,101,527,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
        7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,
        13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
        20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,
        26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,
        33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,
        39,2,40,7,40,2,41,7,41,2,42,7,42,1,0,1,0,1,0,5,0,90,8,0,10,0,12,
        0,93,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,107,
        8,1,1,1,3,1,110,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,121,
        8,1,10,1,12,1,124,9,1,3,1,126,8,1,1,2,1,2,1,3,1,3,1,4,1,4,1,5,1,
        5,1,6,1,6,1,6,1,6,5,6,140,8,6,10,6,12,6,143,9,6,1,6,1,6,1,7,1,7,
        1,8,1,8,1,9,1,9,3,9,153,8,9,1,10,1,10,1,10,3,10,158,8,10,1,11,1,
        11,1,11,1,11,1,12,1,12,1,13,1,13,1,14,1,14,1,14,1,14,1,15,1,15,1,
        15,1,15,1,15,3,15,177,8,15,1,16,1,16,3,16,181,8,16,1,17,3,17,184,
        8,17,1,17,1,17,1,17,3,17,189,8,17,1,17,1,17,1,17,1,18,1,18,1,18,
        5,18,197,8,18,10,18,12,18,200,9,18,1,19,3,19,203,8,19,1,19,1,19,
        1,20,1,20,1,20,1,20,3,20,211,8,20,1,20,1,20,1,21,1,21,1,21,1,21,
        5,21,219,8,21,10,21,12,21,222,9,21,3,21,224,8,21,1,21,1,21,1,22,
        3,22,229,8,22,1,22,1,22,1,22,1,22,3,22,235,8,22,1,22,1,22,1,23,1,
        23,1,24,1,24,1,24,1,24,1,24,5,24,246,8,24,10,24,12,24,249,9,24,3,
        24,251,8,24,1,25,1,25,1,25,1,25,5,25,257,8,25,10,25,12,25,260,9,
        25,3,25,262,8,25,1,25,1,25,1,26,1,26,3,26,268,8,26,1,27,1,27,1,28,
        1,28,1,28,1,28,1,28,1,28,1,28,3,28,279,8,28,1,29,3,29,282,8,29,1,
        29,1,29,1,30,1,30,5,30,288,8,30,10,30,12,30,291,9,30,1,30,1,30,1,
        31,1,31,3,31,297,8,31,1,32,1,32,1,32,1,32,1,32,1,32,1,32,3,32,306,
        8,32,1,33,1,33,1,33,1,33,1,33,1,33,1,33,5,33,315,8,33,10,33,12,33,
        318,9,33,1,33,1,33,1,34,1,34,1,34,1,34,3,34,326,8,34,1,35,1,35,1,
        35,1,35,5,35,332,8,35,10,35,12,35,335,9,35,1,36,1,36,1,36,5,36,340,
        8,36,10,36,12,36,343,9,36,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,
        1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,3,37,362,8,37,1,37,
        1,37,3,37,366,8,37,1,37,1,37,3,37,370,8,37,1,37,1,37,3,37,374,8,
        37,1,38,1,38,1,38,1,38,1,38,1,38,3,38,382,8,38,1,38,3,38,385,8,38,
        1,39,1,39,1,39,1,39,1,39,3,39,392,8,39,1,40,1,40,1,40,1,40,1,40,
        3,40,399,8,40,1,40,1,40,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,
        1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,
        1,41,3,41,425,8,41,1,41,1,41,1,41,3,41,430,8,41,1,41,1,41,1,41,1,
        41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,
        41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,
        41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,
        41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,
        41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,
        41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,
        41,5,41,514,8,41,10,41,12,41,517,9,41,1,42,1,42,1,42,5,42,522,8,
        42,10,42,12,42,525,9,42,1,42,0,1,82,43,0,2,4,6,8,10,12,14,16,18,
        20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,
        64,66,68,70,72,74,76,78,80,82,84,0,7,2,0,2,2,29,29,2,0,3,8,35,35,
        3,0,94,94,96,96,98,98,2,0,94,94,96,97,6,0,23,24,32,32,36,38,43,43,
        45,47,51,52,2,0,94,94,96,96,2,0,96,96,98,98,579,0,91,1,0,0,0,2,125,
        1,0,0,0,4,127,1,0,0,0,6,129,1,0,0,0,8,131,1,0,0,0,10,133,1,0,0,0,
        12,135,1,0,0,0,14,146,1,0,0,0,16,148,1,0,0,0,18,152,1,0,0,0,20,154,
        1,0,0,0,22,159,1,0,0,0,24,163,1,0,0,0,26,165,1,0,0,0,28,167,1,0,
        0,0,30,176,1,0,0,0,32,180,1,0,0,0,34,183,1,0,0,0,36,193,1,0,0,0,
        38,202,1,0,0,0,40,206,1,0,0,0,42,214,1,0,0,0,44,228,1,0,0,0,46,238,
        1,0,0,0,48,240,1,0,0,0,50,252,1,0,0,0,52,267,1,0,0,0,54,269,1,0,
        0,0,56,278,1,0,0,0,58,281,1,0,0,0,60,285,1,0,0,0,62,296,1,0,0,0,
        64,298,1,0,0,0,66,307,1,0,0,0,68,325,1,0,0,0,70,327,1,0,0,0,72,336,
        1,0,0,0,74,373,1,0,0,0,76,384,1,0,0,0,78,391,1,0,0,0,80,393,1,0,
        0,0,82,429,1,0,0,0,84,518,1,0,0,0,86,90,3,32,16,0,87,90,3,2,1,0,
        88,90,3,28,14,0,89,86,1,0,0,0,89,87,1,0,0,0,89,88,1,0,0,0,90,93,
        1,0,0,0,91,89,1,0,0,0,91,92,1,0,0,0,92,94,1,0,0,0,93,91,1,0,0,0,
        94,95,5,0,0,1,95,1,1,0,0,0,96,97,5,1,0,0,97,126,3,4,2,0,98,99,5,
        1,0,0,99,100,3,6,3,0,100,101,3,8,4,0,101,126,1,0,0,0,102,103,5,1,
        0,0,103,104,3,10,5,0,104,106,5,98,0,0,105,107,3,12,6,0,106,105,1,
        0,0,0,106,107,1,0,0,0,107,109,1,0,0,0,108,110,3,14,7,0,109,108,1,
        0,0,0,109,110,1,0,0,0,110,126,1,0,0,0,111,112,5,1,0,0,112,113,3,
        16,8,0,113,114,3,18,9,0,114,126,1,0,0,0,115,116,5,1,0,0,116,117,
        3,26,13,0,117,122,5,98,0,0,118,119,5,79,0,0,119,121,5,98,0,0,120,
        118,1,0,0,0,121,124,1,0,0,0,122,120,1,0,0,0,122,123,1,0,0,0,123,
        126,1,0,0,0,124,122,1,0,0,0,125,96,1,0,0,0,125,98,1,0,0,0,125,102,
        1,0,0,0,125,111,1,0,0,0,125,115,1,0,0,0,126,3,1,0,0,0,127,128,7,
        0,0,0,128,5,1,0,0,0,129,130,7,1,0,0,130,7,1,0,0,0,131,132,7,2,0,
        0,132,9,1,0,0,0,133,134,5,9,0,0,134,11,1,0,0,0,135,136,5,10,0,0,
        136,141,5,98,0,0,137,138,5,79,0,0,138,140,5,98,0,0,139,137,1,0,0,
        0,140,143,1,0,0,0,141,139,1,0,0,0,141,142,1,0,0,0,142,144,1,0,0,
        0,143,141,1,0,0,0,144,145,5,11,0,0,145,13,1,0,0,0,146,147,3,82,41,
        0,147,15,1,0,0,0,148,149,5,12,0,0,149,17,1,0,0,0,150,153,3,22,11,
        0,151,153,3,24,12,0,152,150,1,0,0,0,152,151,1,0,0,0,153,19,1,0,0,
        0,154,157,5,98,0,0,155,156,5,13,0,0,156,158,5,98,0,0,157,155,1,0,
        0,0,157,158,1,0,0,0,158,21,1,0,0,0,159,160,5,64,0,0,160,161,3,20,
        10,0,161,162,5,65,0,0,162,23,1,0,0,0,163,164,5,96,0,0,164,25,1,0,
        0,0,165,166,5,14,0,0,166,27,1,0,0,0,167,168,5,15,0,0,168,169,5,96,
        0,0,169,170,5,78,0,0,170,29,1,0,0,0,171,172,5,80,0,0,172,177,3,82,
        41,0,173,174,5,96,0,0,174,175,5,80,0,0,175,177,3,82,41,0,176,171,
        1,0,0,0,176,173,1,0,0,0,177,31,1,0,0,0,178,181,3,34,17,0,179,181,
        3,52,26,0,180,178,1,0,0,0,180,179,1,0,0,0,181,33,1,0,0,0,182,184,
        3,54,27,0,183,182,1,0,0,0,183,184,1,0,0,0,184,185,1,0,0,0,185,186,
        5,98,0,0,186,188,5,10,0,0,187,189,3,36,18,0,188,187,1,0,0,0,188,
        189,1,0,0,0,189,190,1,0,0,0,190,191,5,11,0,0,191,192,3,60,30,0,192,
        35,1,0,0,0,193,198,3,38,19,0,194,195,5,79,0,0,195,197,3,38,19,0,
        196,194,1,0,0,0,197,200,1,0,0,0,198,196,1,0,0,0,198,199,1,0,0,0,
        199,37,1,0,0,0,200,198,1,0,0,0,201,203,3,54,27,0,202,201,1,0,0,0,
        202,203,1,0,0,0,203,204,1,0,0,0,204,205,5,98,0,0,205,39,1,0,0,0,
        206,207,3,54,27,0,207,210,5,98,0,0,208,209,5,16,0,0,209,211,3,82,
        41,0,210,208,1,0,0,0,210,211,1,0,0,0,211,212,1,0,0,0,212,213,5,78,
        0,0,213,41,1,0,0,0,214,223,5,89,0,0,215,220,3,82,41,0,216,217,5,
        79,0,0,217,219,3,82,41,0,218,216,1,0,0,0,219,222,1,0,0,0,220,218,
        1,0,0,0,220,221,1,0,0,0,221,224,1,0,0,0,222,220,1,0,0,0,223,215,
        1,0,0,0,223,224,1,0,0,0,224,225,1,0,0,0,225,226,5,90,0,0,226,43,
        1,0,0,0,227,229,3,54,27,0,228,227,1,0,0,0,228,229,1,0,0,0,229,230,
        1,0,0,0,230,231,5,57,0,0,231,234,5,98,0,0,232,233,5,16,0,0,233,235,
        3,42,21,0,234,232,1,0,0,0,234,235,1,0,0,0,235,236,1,0,0,0,236,237,
        5,78,0,0,237,45,1,0,0,0,238,239,7,3,0,0,239,47,1,0,0,0,240,250,3,
        46,23,0,241,242,5,77,0,0,242,247,3,82,41,0,243,244,5,78,0,0,244,
        246,3,82,41,0,245,243,1,0,0,0,246,249,1,0,0,0,247,245,1,0,0,0,247,
        248,1,0,0,0,248,251,1,0,0,0,249,247,1,0,0,0,250,241,1,0,0,0,250,
        251,1,0,0,0,251,49,1,0,0,0,252,261,5,91,0,0,253,258,3,48,24,0,254,
        255,5,79,0,0,255,257,3,48,24,0,256,254,1,0,0,0,257,260,1,0,0,0,258,
        256,1,0,0,0,258,259,1,0,0,0,259,262,1,0,0,0,260,258,1,0,0,0,261,
        253,1,0,0,0,261,262,1,0,0,0,262,263,1,0,0,0,263,264,5,92,0,0,264,
        51,1,0,0,0,265,268,3,40,20,0,266,268,3,44,22,0,267,265,1,0,0,0,267,
        266,1,0,0,0,268,53,1,0,0,0,269,270,7,4,0,0,270,55,1,0,0,0,271,279,
        3,58,29,0,272,279,3,60,30,0,273,279,3,62,31,0,274,279,3,74,37,0,
        275,279,3,76,38,0,276,279,3,52,26,0,277,279,3,30,15,0,278,271,1,
        0,0,0,278,272,1,0,0,0,278,273,1,0,0,0,278,274,1,0,0,0,278,275,1,
        0,0,0,278,276,1,0,0,0,278,277,1,0,0,0,279,57,1,0,0,0,280,282,3,82,
        41,0,281,280,1,0,0,0,281,282,1,0,0,0,282,283,1,0,0,0,283,284,5,78,
        0,0,284,59,1,0,0,0,285,289,5,17,0,0,286,288,3,56,28,0,287,286,1,
        0,0,0,288,291,1,0,0,0,289,287,1,0,0,0,289,290,1,0,0,0,290,292,1,
        0,0,0,291,289,1,0,0,0,292,293,5,18,0,0,293,61,1,0,0,0,294,297,3,
        64,32,0,295,297,3,66,33,0,296,294,1,0,0,0,296,295,1,0,0,0,297,63,
        1,0,0,0,298,299,5,35,0,0,299,300,5,10,0,0,300,301,3,82,41,0,301,
        302,5,11,0,0,302,305,3,56,28,0,303,304,5,29,0,0,304,306,3,56,28,
        0,305,303,1,0,0,0,305,306,1,0,0,0,306,65,1,0,0,0,307,308,5,48,0,
        0,308,309,5,10,0,0,309,310,3,82,41,0,310,311,5,11,0,0,311,316,5,
        17,0,0,312,315,3,70,35,0,313,315,3,72,36,0,314,312,1,0,0,0,314,313,
        1,0,0,0,315,318,1,0,0,0,316,314,1,0,0,0,316,317,1,0,0,0,317,319,
        1,0,0,0,318,316,1,0,0,0,319,320,5,18,0,0,320,67,1,0,0,0,321,326,
        7,5,0,0,322,323,7,5,0,0,323,324,5,19,0,0,324,326,7,5,0,0,325,321,
        1,0,0,0,325,322,1,0,0,0,326,69,1,0,0,0,327,328,5,22,0,0,328,329,
        3,68,34,0,329,333,5,77,0,0,330,332,3,56,28,0,331,330,1,0,0,0,332,
        335,1,0,0,0,333,331,1,0,0,0,333,334,1,0,0,0,334,71,1,0,0,0,335,333,
        1,0,0,0,336,337,5,27,0,0,337,341,5,77,0,0,338,340,3,56,28,0,339,
        338,1,0,0,0,340,343,1,0,0,0,341,339,1,0,0,0,341,342,1,0,0,0,342,
        73,1,0,0,0,343,341,1,0,0,0,344,345,5,54,0,0,345,346,5,10,0,0,346,
        347,3,82,41,0,347,348,5,11,0,0,348,349,3,56,28,0,349,374,1,0,0,0,
        350,351,5,28,0,0,351,352,3,56,28,0,352,353,5,54,0,0,353,354,5,10,
        0,0,354,355,3,82,41,0,355,356,5,11,0,0,356,357,5,78,0,0,357,374,
        1,0,0,0,358,359,5,33,0,0,359,361,5,10,0,0,360,362,3,82,41,0,361,
        360,1,0,0,0,361,362,1,0,0,0,362,363,1,0,0,0,363,365,5,78,0,0,364,
        366,3,82,41,0,365,364,1,0,0,0,365,366,1,0,0,0,366,367,1,0,0,0,367,
        369,5,78,0,0,368,370,3,82,41,0,369,368,1,0,0,0,369,370,1,0,0,0,370,
        371,1,0,0,0,371,372,5,11,0,0,372,374,3,56,28,0,373,344,1,0,0,0,373,
        350,1,0,0,0,373,358,1,0,0,0,374,75,1,0,0,0,375,376,5,21,0,0,376,
        385,5,78,0,0,377,378,5,26,0,0,378,385,5,78,0,0,379,381,5,40,0,0,
        380,382,3,82,41,0,381,380,1,0,0,0,381,382,1,0,0,0,382,383,1,0,0,
        0,383,385,5,78,0,0,384,375,1,0,0,0,384,377,1,0,0,0,384,379,1,0,0,
        0,385,77,1,0,0,0,386,392,5,98,0,0,387,388,5,10,0,0,388,389,5,98,
        0,0,389,392,5,11,0,0,390,392,5,96,0,0,391,386,1,0,0,0,391,387,1,
        0,0,0,391,390,1,0,0,0,392,79,1,0,0,0,393,394,7,6,0,0,394,395,5,93,
        0,0,395,396,3,78,39,0,396,398,5,10,0,0,397,399,3,84,42,0,398,397,
        1,0,0,0,398,399,1,0,0,0,399,400,1,0,0,0,400,401,5,11,0,0,401,81,
        1,0,0,0,402,403,6,41,-1,0,403,430,5,98,0,0,404,430,5,94,0,0,405,
        430,5,95,0,0,406,430,5,96,0,0,407,430,5,97,0,0,408,409,5,10,0,0,
        409,410,3,82,41,0,410,411,5,11,0,0,411,430,1,0,0,0,412,413,5,73,
        0,0,413,430,3,82,41,9,414,415,5,60,0,0,415,430,3,82,41,8,416,417,
        5,61,0,0,417,430,3,82,41,7,418,419,5,98,0,0,419,420,5,16,0,0,420,
        430,3,82,41,4,421,422,5,98,0,0,422,424,5,10,0,0,423,425,3,84,42,
        0,424,423,1,0,0,0,424,425,1,0,0,0,425,426,1,0,0,0,426,430,5,11,0,
        0,427,430,3,50,25,0,428,430,3,80,40,0,429,402,1,0,0,0,429,404,1,
        0,0,0,429,405,1,0,0,0,429,406,1,0,0,0,429,407,1,0,0,0,429,408,1,
        0,0,0,429,412,1,0,0,0,429,414,1,0,0,0,429,416,1,0,0,0,429,418,1,
        0,0,0,429,421,1,0,0,0,429,427,1,0,0,0,429,428,1,0,0,0,430,515,1,
        0,0,0,431,432,10,34,0,0,432,433,5,55,0,0,433,514,3,82,41,35,434,
        435,10,33,0,0,435,436,5,56,0,0,436,514,3,82,41,34,437,438,10,32,
        0,0,438,439,5,57,0,0,439,514,3,82,41,33,440,441,10,31,0,0,441,442,
        5,58,0,0,442,514,3,82,41,32,443,444,10,30,0,0,444,445,5,59,0,0,445,
        514,3,82,41,31,446,447,10,29,0,0,447,448,5,64,0,0,448,514,3,82,41,
        30,449,450,10,28,0,0,450,451,5,65,0,0,451,514,3,82,41,29,452,453,
        10,27,0,0,453,454,5,66,0,0,454,514,3,82,41,28,455,456,10,26,0,0,
        456,457,5,67,0,0,457,514,3,82,41,27,458,459,10,25,0,0,459,460,5,
        68,0,0,460,514,3,82,41,26,461,462,10,24,0,0,462,463,5,69,0,0,463,
        514,3,82,41,25,464,465,10,23,0,0,465,466,5,70,0,0,466,514,3,82,41,
        24,467,468,10,22,0,0,468,469,5,71,0,0,469,514,3,82,41,23,470,471,
        10,21,0,0,471,472,5,72,0,0,472,514,3,82,41,22,473,474,10,20,0,0,
        474,475,5,74,0,0,475,514,3,82,41,21,476,477,10,19,0,0,477,478,5,
        75,0,0,478,514,3,82,41,20,479,480,10,18,0,0,480,481,5,81,0,0,481,
        514,3,82,41,19,482,483,10,17,0,0,483,484,5,82,0,0,484,514,3,82,41,
        18,485,486,10,16,0,0,486,487,5,83,0,0,487,514,3,82,41,17,488,489,
        10,15,0,0,489,490,5,84,0,0,490,514,3,82,41,16,491,492,10,14,0,0,
        492,493,5,85,0,0,493,514,3,82,41,15,494,495,10,13,0,0,495,496,5,
        86,0,0,496,514,3,82,41,14,497,498,10,12,0,0,498,499,5,87,0,0,499,
        514,3,82,41,13,500,501,10,11,0,0,501,502,5,88,0,0,502,514,3,82,41,
        12,503,504,10,10,0,0,504,505,5,76,0,0,505,506,3,82,41,0,506,507,
        5,77,0,0,507,508,3,82,41,11,508,514,1,0,0,0,509,510,10,6,0,0,510,
        514,5,60,0,0,511,512,10,5,0,0,512,514,5,61,0,0,513,431,1,0,0,0,513,
        434,1,0,0,0,513,437,1,0,0,0,513,440,1,0,0,0,513,443,1,0,0,0,513,
        446,1,0,0,0,513,449,1,0,0,0,513,452,1,0,0,0,513,455,1,0,0,0,513,
        458,1,0,0,0,513,461,1,0,0,0,513,464,1,0,0,0,513,467,1,0,0,0,513,
        470,1,0,0,0,513,473,1,0,0,0,513,476,1,0,0,0,513,479,1,0,0,0,513,
        482,1,0,0,0,513,485,1,0,0,0,513,488,1,0,0,0,513,491,1,0,0,0,513,
        494,1,0,0,0,513,497,1,0,0,0,513,500,1,0,0,0,513,503,1,0,0,0,513,
        509,1,0,0,0,513,511,1,0,0,0,514,517,1,0,0,0,515,513,1,0,0,0,515,
        516,1,0,0,0,516,83,1,0,0,0,517,515,1,0,0,0,518,523,3,82,41,0,519,
        520,5,79,0,0,520,522,3,82,41,0,521,519,1,0,0,0,522,525,1,0,0,0,523,
        521,1,0,0,0,523,524,1,0,0,0,524,85,1,0,0,0,525,523,1,0,0,0,48,89,
        91,106,109,122,125,141,152,157,176,180,183,188,198,202,210,220,223,
        228,234,247,250,258,261,267,278,281,289,296,305,314,316,325,333,
        341,361,365,369,373,381,384,391,398,424,429,513,515,523
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitProgram) {
             listener.exitProgram(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public directiveType(): DirectiveTypeContext | null {
        return this.getRuleContext(0, DirectiveTypeContext);
    }
    public directiveTypeWithArguments(): DirectiveTypeWithArgumentsContext | null {
        return this.getRuleContext(0, DirectiveTypeWithArgumentsContext);
    }
    public directiveArgument(): DirectiveArgumentContext | null {
        return this.getRuleContext(0, DirectiveArgumentContext);
    }
    public directiveTypeDefine(): DirectiveTypeDefineContext | null {
        return this.getRuleContext(0, DirectiveTypeDefineContext);
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
    public directiveDefineParam(): DirectiveDefineParamContext | null {
        return this.getRuleContext(0, DirectiveDefineParamContext);
    }
    public directiveDefineArgument(): DirectiveDefineArgumentContext | null {
        return this.getRuleContext(0, DirectiveDefineArgumentContext);
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterPreprocessorDirective) {
             listener.enterPreprocessorDirective(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitPreprocessorDirective) {
             listener.exitPreprocessorDirective(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
        if (visitor.visitPreprocessorDirective) {
            return visitor.visitPreprocessorDirective(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DirectiveTypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ELSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.ELSE, 0)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_directiveType;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterDirectiveType) {
             listener.enterDirectiveType(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitDirectiveType) {
             listener.exitDirectiveType(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
        if (visitor.visitDirectiveType) {
            return visitor.visitDirectiveType(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DirectiveTypeWithArgumentsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(LPCParser.IF, 0)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_directiveTypeWithArguments;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterDirectiveTypeWithArguments) {
             listener.enterDirectiveTypeWithArguments(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitDirectiveTypeWithArguments) {
             listener.exitDirectiveTypeWithArguments(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterDirectiveArgument) {
             listener.enterDirectiveArgument(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitDirectiveArgument) {
             listener.exitDirectiveArgument(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
        if (visitor.visitDirectiveArgument) {
            return visitor.visitDirectiveArgument(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DirectiveTypeDefineContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_directiveTypeDefine;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterDirectiveTypeDefine) {
             listener.enterDirectiveTypeDefine(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitDirectiveTypeDefine) {
             listener.exitDirectiveTypeDefine(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
        if (visitor.visitDirectiveTypeDefine) {
            return visitor.visitDirectiveTypeDefine(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DirectiveDefineParamContext extends antlr.ParserRuleContext {
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterDirectiveDefineParam) {
             listener.enterDirectiveDefineParam(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitDirectiveDefineParam) {
             listener.exitDirectiveDefineParam(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterDirectiveDefineArgument) {
             listener.enterDirectiveDefineArgument(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitDirectiveDefineArgument) {
             listener.exitDirectiveDefineArgument(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override get ruleIndex(): number {
        return LPCParser.RULE_directiveTypeInclude;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterDirectiveTypeInclude) {
             listener.enterDirectiveTypeInclude(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitDirectiveTypeInclude) {
             listener.exitDirectiveTypeInclude(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterDirectiveIncludeFile) {
             listener.enterDirectiveIncludeFile(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitDirectiveIncludeFile) {
             listener.exitDirectiveIncludeFile(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override get ruleIndex(): number {
        return LPCParser.RULE_directiveIncludeFilename;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterDirectiveIncludeFilename) {
             listener.enterDirectiveIncludeFilename(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitDirectiveIncludeFilename) {
             listener.exitDirectiveIncludeFilename(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterDirectiveIncludeFileGlobal) {
             listener.enterDirectiveIncludeFileGlobal(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitDirectiveIncludeFileGlobal) {
             listener.exitDirectiveIncludeFileGlobal(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterDirectiveIncludeFileLocal) {
             listener.enterDirectiveIncludeFileLocal(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitDirectiveIncludeFileLocal) {
             listener.exitDirectiveIncludeFileLocal(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override get ruleIndex(): number {
        return LPCParser.RULE_directiveTypePragma;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterDirectiveTypePragma) {
             listener.enterDirectiveTypePragma(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitDirectiveTypePragma) {
             listener.exitDirectiveTypePragma(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public StringLiteral(): antlr.TerminalNode {
        return this.getToken(LPCParser.StringLiteral, 0)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(LPCParser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_inheritStatement;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterInheritStatement) {
             listener.enterInheritStatement(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitInheritStatement) {
             listener.exitInheritStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public StringLiteral(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.StringLiteral, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_inheritSuperStatement;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterInheritSuperStatement) {
             listener.enterInheritSuperStatement(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitInheritSuperStatement) {
             listener.exitInheritSuperStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterDeclaration) {
             listener.enterDeclaration(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitDeclaration) {
             listener.exitDeclaration(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
        if (visitor.visitDeclaration) {
            return visitor.visitDeclaration(this);
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
    public compoundStatement(): CompoundStatementContext {
        return this.getRuleContext(0, CompoundStatementContext)!;
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterFunctionDeclaration) {
             listener.enterFunctionDeclaration(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitFunctionDeclaration) {
             listener.exitFunctionDeclaration(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterParameterList) {
             listener.enterParameterList(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitParameterList) {
             listener.exitParameterList(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterParameter) {
             listener.enterParameter(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitParameter) {
             listener.exitParameter(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
        if (visitor.visitParameter) {
            return visitor.visitParameter(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ScalarDeclarationContext extends antlr.ParserRuleContext {
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
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_scalarDeclaration;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterScalarDeclaration) {
             listener.enterScalarDeclaration(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitScalarDeclaration) {
             listener.exitScalarDeclaration(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
        if (visitor.visitScalarDeclaration) {
            return visitor.visitScalarDeclaration(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ArrayContentContext extends antlr.ParserRuleContext {
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
        return LPCParser.RULE_arrayContent;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterArrayContent) {
             listener.enterArrayContent(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitArrayContent) {
             listener.exitArrayContent(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
        if (visitor.visitArrayContent) {
            return visitor.visitArrayContent(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ArrayDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public STAR(): antlr.TerminalNode {
        return this.getToken(LPCParser.STAR, 0)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(LPCParser.SEMI, 0)!;
    }
    public typeSpecifier(): TypeSpecifierContext | null {
        return this.getRuleContext(0, TypeSpecifierContext);
    }
    public arrayContent(): ArrayContentContext | null {
        return this.getRuleContext(0, ArrayContentContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_arrayDeclaration;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterArrayDeclaration) {
             listener.enterArrayDeclaration(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitArrayDeclaration) {
             listener.exitArrayDeclaration(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
        if (visitor.visitArrayDeclaration) {
            return visitor.visitArrayDeclaration(this);
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterMappingKey) {
             listener.enterMappingKey(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitMappingKey) {
             listener.exitMappingKey(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterMappingContent) {
             listener.enterMappingContent(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitMappingContent) {
             listener.exitMappingContent(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public MAPPING_CLOSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.MAPPING_CLOSE, 0)!;
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterMappingExpression) {
             listener.enterMappingExpression(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitMappingExpression) {
             listener.exitMappingExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public scalarDeclaration(): ScalarDeclarationContext | null {
        return this.getRuleContext(0, ScalarDeclarationContext);
    }
    public arrayDeclaration(): ArrayDeclarationContext | null {
        return this.getRuleContext(0, ArrayDeclarationContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_variableDeclaration;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterVariableDeclaration) {
             listener.enterVariableDeclaration(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitVariableDeclaration) {
             listener.exitVariableDeclaration(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
        if (visitor.visitVariableDeclaration) {
            return visitor.visitVariableDeclaration(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TypeSpecifierContext extends antlr.ParserRuleContext {
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
        return LPCParser.RULE_typeSpecifier;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterTypeSpecifier) {
             listener.enterTypeSpecifier(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitTypeSpecifier) {
             listener.exitTypeSpecifier(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
        if (visitor.visitTypeSpecifier) {
            return visitor.visitTypeSpecifier(this);
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
    public override get ruleIndex(): number {
        return LPCParser.RULE_statement;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitStatement) {
             listener.exitStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public SEMI(): antlr.TerminalNode {
        return this.getToken(LPCParser.SEMI, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_expressionStatement;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterExpressionStatement) {
             listener.enterExpressionStatement(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitExpressionStatement) {
             listener.exitExpressionStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterCompoundStatement) {
             listener.enterCompoundStatement(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitCompoundStatement) {
             listener.exitCompoundStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterSelectionStatement) {
             listener.enterSelectionStatement(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitSelectionStatement) {
             listener.exitSelectionStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
        if (visitor.visitSelectionStatement) {
            return visitor.visitSelectionStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IfStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(LPCParser.IF, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public ELSE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.ELSE, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_ifStatement;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterIfStatement) {
             listener.enterIfStatement(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitIfStatement) {
             listener.exitIfStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterSwitchStatement) {
             listener.enterSwitchStatement(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitSwitchStatement) {
             listener.exitSwitchStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override get ruleIndex(): number {
        return LPCParser.RULE_caseExpression;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterCaseExpression) {
             listener.enterCaseExpression(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitCaseExpression) {
             listener.exitCaseExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterCaseStatement) {
             listener.enterCaseStatement(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitCaseStatement) {
             listener.exitCaseStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterDefaultStatement) {
             listener.enterDefaultStatement(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitDefaultStatement) {
             listener.exitDefaultStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
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
    public override get ruleIndex(): number {
        return LPCParser.RULE_iterationStatement;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterIterationStatement) {
             listener.enterIterationStatement(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitIterationStatement) {
             listener.exitIterationStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterJumpStatement) {
             listener.enterJumpStatement(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitJumpStatement) {
             listener.exitJumpStatement(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public StringLiteral(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.StringLiteral, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_callOtherTarget;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterCallOtherTarget) {
             listener.enterCallOtherTarget(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitCallOtherTarget) {
             listener.exitCallOtherTarget(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
        if (visitor.visitCallOtherTarget) {
            return visitor.visitCallOtherTarget(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CallOtherExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ARROW(): antlr.TerminalNode {
        return this.getToken(LPCParser.ARROW, 0)!;
    }
    public callOtherTarget(): CallOtherTargetContext {
        return this.getRuleContext(0, CallOtherTargetContext)!;
    }
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
    }
    public StringLiteral(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.StringLiteral, 0);
    }
    public expressionList(): ExpressionListContext | null {
        return this.getRuleContext(0, ExpressionListContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_callOtherExpression;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterCallOtherExpression) {
             listener.enterCallOtherExpression(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitCallOtherExpression) {
             listener.exitCallOtherExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
        if (visitor.visitCallOtherExpression) {
            return visitor.visitCallOtherExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExpressionContext extends antlr.ParserRuleContext {
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
    public StringLiteral(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.StringLiteral, 0);
    }
    public CharacterConstant(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.CharacterConstant, 0);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
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
    public callOtherExpression(): CallOtherExpressionContext | null {
        return this.getRuleContext(0, CallOtherExpressionContext);
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
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.COLON, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_expression;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitExpression) {
             listener.exitExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterExpressionList) {
             listener.enterExpressionList(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitExpressionList) {
             listener.exitExpressionList(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
        if (visitor.visitExpressionList) {
            return visitor.visitExpressionList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

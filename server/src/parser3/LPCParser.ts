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
    public static readonly FOREACH = 34;
    public static readonly GOTO = 35;
    public static readonly IF = 36;
    public static readonly IN = 37;
    public static readonly INT = 38;
    public static readonly MAPPING = 39;
    public static readonly OBJECT = 40;
    public static readonly REGISTER = 41;
    public static readonly RETURN = 42;
    public static readonly SIZEOF = 43;
    public static readonly STATUS = 44;
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
    public static readonly PRIVATE = 55;
    public static readonly PROTECTED = 56;
    public static readonly PUBLIC = 57;
    public static readonly STATIC = 58;
    public static readonly PLUS = 59;
    public static readonly MINUS = 60;
    public static readonly STAR = 61;
    public static readonly DIV = 62;
    public static readonly MOD = 63;
    public static readonly INC = 64;
    public static readonly DEC = 65;
    public static readonly SHL = 66;
    public static readonly SHR = 67;
    public static readonly LT = 68;
    public static readonly GT = 69;
    public static readonly LE = 70;
    public static readonly GE = 71;
    public static readonly EQ = 72;
    public static readonly NE = 73;
    public static readonly AND = 74;
    public static readonly OR = 75;
    public static readonly XOR = 76;
    public static readonly NOT = 77;
    public static readonly AND_AND = 78;
    public static readonly OR_OR = 79;
    public static readonly QUESTION = 80;
    public static readonly COLON = 81;
    public static readonly SEMI = 82;
    public static readonly COMMA = 83;
    public static readonly SUPER_ACCESSOR = 84;
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
    public static readonly MAPPING_CLOSE = 96;
    public static readonly ARROW = 97;
    public static readonly CLOSURE_OPEN = 98;
    public static readonly CLOSURE_CLOSE = 99;
    public static readonly IntegerConstant = 100;
    public static readonly FloatingConstant = 101;
    public static readonly StringLiteral = 102;
    public static readonly CharacterConstant = 103;
    public static readonly Identifier = 104;
    public static readonly WS = 105;
    public static readonly COMMENT = 106;
    public static readonly LINE_COMMENT = 107;
    public static readonly RULE_program = 0;
    public static readonly RULE_preprocessorDirective = 1;
    public static readonly RULE_definePreprocessorDirective = 2;
    public static readonly RULE_directiveType = 3;
    public static readonly RULE_directiveTypeWithArguments = 4;
    public static readonly RULE_directiveArgument = 5;
    public static readonly RULE_directiveTypeDefine = 6;
    public static readonly RULE_directiveDefineParam = 7;
    public static readonly RULE_directiveDefineArgument = 8;
    public static readonly RULE_directiveTypeInclude = 9;
    public static readonly RULE_directiveIncludeFile = 10;
    public static readonly RULE_directiveIncludeFilename = 11;
    public static readonly RULE_directiveIncludeFileGlobal = 12;
    public static readonly RULE_directiveIncludeFileLocal = 13;
    public static readonly RULE_directiveTypePragma = 14;
    public static readonly RULE_inheritStatement = 15;
    public static readonly RULE_inheritSuperStatement = 16;
    public static readonly RULE_declaration = 17;
    public static readonly RULE_functionModifier = 18;
    public static readonly RULE_functionDeclaration = 19;
    public static readonly RULE_parameterList = 20;
    public static readonly RULE_parameter = 21;
    public static readonly RULE_arrayExpression = 22;
    public static readonly RULE_mappingKey = 23;
    public static readonly RULE_mappingContent = 24;
    public static readonly RULE_mappingExpression = 25;
    public static readonly RULE_variableDeclaration = 26;
    public static readonly RULE_primitiveTypeSpecifier = 27;
    public static readonly RULE_typeSpecifier = 28;
    public static readonly RULE_inlineClosureExpression = 29;
    public static readonly RULE_statement = 30;
    public static readonly RULE_expressionStatement = 31;
    public static readonly RULE_compoundStatement = 32;
    public static readonly RULE_selectionStatement = 33;
    public static readonly RULE_ifStatement = 34;
    public static readonly RULE_switchStatement = 35;
    public static readonly RULE_caseExpression = 36;
    public static readonly RULE_caseStatement = 37;
    public static readonly RULE_defaultStatement = 38;
    public static readonly RULE_iterationStatement = 39;
    public static readonly RULE_jumpStatement = 40;
    public static readonly RULE_callOtherTarget = 41;
    public static readonly RULE_callOtherExpression = 42;
    public static readonly RULE_expression = 43;
    public static readonly RULE_expressionList = 44;

    public static readonly literalNames = [
        null, "'#'", "'endif'", "'ifdef'", "'ifndef'", "'elif'", "'undef'", 
        "'echo'", "'line'", "'define'", "'('", "')'", "'include'", "'.'", 
        "'pragma'", "'inherit'", "'='", "'{'", "'}'", "'..'", "'auto'", 
        "'break'", "'case'", "'char'", "'closure'", "'const'", "'continue'", 
        "'default'", "'do'", "'else'", "'enum'", "'extern'", "'float'", 
        "'for'", "'foreach'", "'goto'", "'if'", "'in'", "'int'", "'mapping'", 
        "'object'", "'register'", "'return'", "'sizeof'", "'status'", "'struct'", 
        "'string'", "'symbol'", "'switch'", "'typedef'", "'union'", "'unknown'", 
        "'void'", "'volatile'", "'while'", "'private'", "'protected'", "'public'", 
        "'static'", "'+'", "'-'", "'*'", "'/'", "'%'", "'++'", "'--'", "'<<'", 
        "'>>'", "'<'", "'>'", "'<='", "'>='", "'=='", "'!='", "'&'", "'|'", 
        "'^'", "'!'", "'&&'", "'||'", "'?'", "':'", "';'", "','", "'::'", 
        "'+='", "'-='", "'*='", "'/='", "'%='", "'&='", "'|='", "'^='", 
        "'({'", "'})'", "'(['", "'])'", "'->'", "'(:'", "':)'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, "AUTO", "BREAK", 
        "CASE", "CHAR", "CLOSURE", "CONST", "CONTINUE", "DEFAULT", "DO", 
        "ELSE", "ENUM", "EXTERN", "FLOAT", "FOR", "FOREACH", "GOTO", "IF", 
        "IN", "INT", "MAPPING", "OBJECT", "REGISTER", "RETURN", "SIZEOF", 
        "STATUS", "STRUCT", "STRING", "SYMBOL", "SWITCH", "TYPEDEF", "UNION", 
        "UNKNOWN", "VOID", "VOLATILE", "WHILE", "PRIVATE", "PROTECTED", 
        "PUBLIC", "STATIC", "PLUS", "MINUS", "STAR", "DIV", "MOD", "INC", 
        "DEC", "SHL", "SHR", "LT", "GT", "LE", "GE", "EQ", "NE", "AND", 
        "OR", "XOR", "NOT", "AND_AND", "OR_OR", "QUESTION", "COLON", "SEMI", 
        "COMMA", "SUPER_ACCESSOR", "ADD_ASSIGN", "SUB_ASSIGN", "MUL_ASSIGN", 
        "DIV_ASSIGN", "MOD_ASSIGN", "AND_ASSIGN", "OR_ASSIGN", "XOR_ASSIGN", 
        "ARRAY_OPEN", "ARRAY_CLOSE", "MAPPING_OPEN", "MAPPING_CLOSE", "ARROW", 
        "CLOSURE_OPEN", "CLOSURE_CLOSE", "IntegerConstant", "FloatingConstant", 
        "StringLiteral", "CharacterConstant", "Identifier", "WS", "COMMENT", 
        "LINE_COMMENT"
    ];
    public static readonly ruleNames = [
        "program", "preprocessorDirective", "definePreprocessorDirective", 
        "directiveType", "directiveTypeWithArguments", "directiveArgument", 
        "directiveTypeDefine", "directiveDefineParam", "directiveDefineArgument", 
        "directiveTypeInclude", "directiveIncludeFile", "directiveIncludeFilename", 
        "directiveIncludeFileGlobal", "directiveIncludeFileLocal", "directiveTypePragma", 
        "inheritStatement", "inheritSuperStatement", "declaration", "functionModifier", 
        "functionDeclaration", "parameterList", "parameter", "arrayExpression", 
        "mappingKey", "mappingContent", "mappingExpression", "variableDeclaration", 
        "primitiveTypeSpecifier", "typeSpecifier", "inlineClosureExpression", 
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
            this.state = 95;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 25198594) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 127463873) !== 0) || _la === 104) {
                {
                this.state = 93;
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
                case LPCParser.PRIVATE:
                case LPCParser.PROTECTED:
                case LPCParser.PUBLIC:
                case LPCParser.STATIC:
                case LPCParser.Identifier:
                    {
                    this.state = 90;
                    this.declaration();
                    }
                    break;
                case LPCParser.T__0:
                    {
                    this.state = 91;
                    this.preprocessorDirective();
                    }
                    break;
                case LPCParser.T__14:
                    {
                    this.state = 92;
                    this.inheritStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 97;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 98;
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
            this.state = 121;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 100;
                this.match(LPCParser.T__0);
                this.state = 101;
                this.directiveType();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 102;
                this.match(LPCParser.T__0);
                this.state = 103;
                this.directiveTypeWithArguments();
                this.state = 104;
                this.directiveArgument();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 106;
                this.definePreprocessorDirective();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 107;
                this.match(LPCParser.T__0);
                this.state = 108;
                this.directiveTypeInclude();
                this.state = 109;
                this.directiveIncludeFile();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 111;
                this.match(LPCParser.T__0);
                this.state = 112;
                this.directiveTypePragma();
                this.state = 113;
                this.match(LPCParser.Identifier);
                this.state = 118;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 83) {
                    {
                    {
                    this.state = 114;
                    this.match(LPCParser.COMMA);
                    this.state = 115;
                    this.match(LPCParser.Identifier);
                    }
                    }
                    this.state = 120;
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
            this.state = 123;
            this.match(LPCParser.T__0);
            this.state = 124;
            this.directiveTypeDefine();
            this.state = 125;
            this.match(LPCParser.Identifier);
            this.state = 127;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                {
                this.state = 126;
                this.directiveDefineParam();
                }
                break;
            }
            this.state = 130;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
            case 1:
                {
                this.state = 129;
                this.directiveDefineArgument();
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
    public directiveType(): DirectiveTypeContext {
        let localContext = new DirectiveTypeContext(this.context, this.state);
        this.enterRule(localContext, 6, LPCParser.RULE_directiveType);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 132;
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
        this.enterRule(localContext, 8, LPCParser.RULE_directiveTypeWithArguments);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 134;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 504) !== 0) || _la === 36)) {
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
        this.enterRule(localContext, 10, LPCParser.RULE_directiveArgument);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 136;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 21) !== 0))) {
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
        this.enterRule(localContext, 12, LPCParser.RULE_directiveTypeDefine);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 138;
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
        this.enterRule(localContext, 14, LPCParser.RULE_directiveDefineParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 140;
            this.match(LPCParser.T__9);
            this.state = 141;
            this.match(LPCParser.Identifier);
            this.state = 146;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 83) {
                {
                {
                this.state = 142;
                this.match(LPCParser.COMMA);
                this.state = 143;
                this.match(LPCParser.Identifier);
                }
                }
                this.state = 148;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 149;
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
        this.enterRule(localContext, 16, LPCParser.RULE_directiveDefineArgument);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 151;
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
        this.enterRule(localContext, 18, LPCParser.RULE_directiveTypeInclude);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 153;
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
        this.enterRule(localContext, 20, LPCParser.RULE_directiveIncludeFile);
        try {
            this.state = 157;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.LT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 155;
                this.directiveIncludeFileGlobal();
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 156;
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
        this.enterRule(localContext, 22, LPCParser.RULE_directiveIncludeFilename);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 159;
            this.match(LPCParser.Identifier);
            this.state = 162;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 13) {
                {
                this.state = 160;
                this.match(LPCParser.T__12);
                this.state = 161;
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
        this.enterRule(localContext, 24, LPCParser.RULE_directiveIncludeFileGlobal);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 164;
            this.match(LPCParser.LT);
            this.state = 165;
            this.directiveIncludeFilename();
            this.state = 166;
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
        this.enterRule(localContext, 26, LPCParser.RULE_directiveIncludeFileLocal);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 168;
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
        this.enterRule(localContext, 28, LPCParser.RULE_directiveTypePragma);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 170;
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
        this.enterRule(localContext, 30, LPCParser.RULE_inheritStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 172;
            this.match(LPCParser.T__14);
            this.state = 173;
            this.match(LPCParser.StringLiteral);
            this.state = 174;
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
        this.enterRule(localContext, 32, LPCParser.RULE_inheritSuperStatement);
        try {
            this.state = 181;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.SUPER_ACCESSOR:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 176;
                this.match(LPCParser.SUPER_ACCESSOR);
                this.state = 177;
                this.expression(0);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 178;
                this.match(LPCParser.StringLiteral);
                this.state = 179;
                this.match(LPCParser.SUPER_ACCESSOR);
                this.state = 180;
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
        this.enterRule(localContext, 34, LPCParser.RULE_declaration);
        try {
            this.state = 185;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 183;
                this.functionDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 184;
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
        this.enterRule(localContext, 36, LPCParser.RULE_functionModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 187;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 15) !== 0))) {
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
        this.enterRule(localContext, 38, LPCParser.RULE_functionDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 190;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 15) !== 0)) {
                {
                this.state = 189;
                this.functionModifier();
                }
            }

            this.state = 193;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 23)) & ~0x1F) === 0 && ((1 << (_la - 23)) & 836993539) !== 0)) {
                {
                this.state = 192;
                this.typeSpecifier(0);
                }
            }

            this.state = 195;
            this.match(LPCParser.Identifier);
            this.state = 196;
            this.match(LPCParser.T__9);
            this.state = 198;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 23)) & ~0x1F) === 0 && ((1 << (_la - 23)) & 836993539) !== 0) || _la === 104) {
                {
                this.state = 197;
                this.parameterList();
                }
            }

            this.state = 200;
            this.match(LPCParser.T__10);
            this.state = 201;
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
        this.enterRule(localContext, 40, LPCParser.RULE_parameterList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 203;
            this.parameter();
            this.state = 208;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 83) {
                {
                {
                this.state = 204;
                this.match(LPCParser.COMMA);
                this.state = 205;
                this.parameter();
                }
                }
                this.state = 210;
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
        this.enterRule(localContext, 42, LPCParser.RULE_parameter);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 212;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 23)) & ~0x1F) === 0 && ((1 << (_la - 23)) & 836993539) !== 0)) {
                {
                this.state = 211;
                this.typeSpecifier(0);
                }
            }

            this.state = 214;
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
        this.enterRule(localContext, 44, LPCParser.RULE_arrayExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 216;
            this.match(LPCParser.ARRAY_OPEN);
            this.state = 225;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 10 || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 2684362755) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 125) !== 0)) {
                {
                this.state = 217;
                this.expression(0);
                this.state = 222;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 83) {
                    {
                    {
                    this.state = 218;
                    this.match(LPCParser.COMMA);
                    this.state = 219;
                    this.expression(0);
                    }
                    }
                    this.state = 224;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 227;
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
        this.enterRule(localContext, 46, LPCParser.RULE_mappingKey);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 229;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 13) !== 0))) {
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
            this.state = 231;
            this.mappingKey();
            this.state = 241;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 81) {
                {
                this.state = 232;
                this.match(LPCParser.COLON);
                this.state = 233;
                this.expression(0);
                this.state = 238;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 82) {
                    {
                    {
                    this.state = 234;
                    this.match(LPCParser.SEMI);
                    this.state = 235;
                    this.expression(0);
                    }
                    }
                    this.state = 240;
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
            this.state = 243;
            this.match(LPCParser.MAPPING_OPEN);
            this.state = 252;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 13) !== 0)) {
                {
                this.state = 244;
                this.mappingContent();
                this.state = 249;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 83) {
                    {
                    {
                    this.state = 245;
                    this.match(LPCParser.COMMA);
                    this.state = 246;
                    this.mappingContent();
                    }
                    }
                    this.state = 251;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 254;
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
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 256;
            this.typeSpecifier(0);
            this.state = 257;
            this.match(LPCParser.Identifier);
            this.state = 260;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 16) {
                {
                this.state = 258;
                this.match(LPCParser.T__15);
                this.state = 259;
                this.expression(0);
                }
            }

            this.state = 262;
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
        this.enterRule(localContext, 54, LPCParser.RULE_primitiveTypeSpecifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 264;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 23)) & ~0x1F) === 0 && ((1 << (_la - 23)) & 836993539) !== 0))) {
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
        let _startState = 56;
        this.enterRecursionRule(localContext, 56, LPCParser.RULE_typeSpecifier, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 267;
            this.primitiveTypeSpecifier();
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 273;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
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
                    this.state = 269;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 270;
                    this.match(LPCParser.STAR);
                    }
                    }
                }
                this.state = 275;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
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
        this.enterRule(localContext, 58, LPCParser.RULE_inlineClosureExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 276;
            this.match(LPCParser.CLOSURE_OPEN);
            this.state = 284;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 25, this.context) ) {
            case 1:
                {
                this.state = 277;
                this.expression(0);
                }
                break;
            case 2:
                {
                this.state = 281;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 10)) & ~0x1F) === 0 && ((1 << (_la - 10)) & 1975871617) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 12588669) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 262471809) !== 0)) {
                    {
                    {
                    this.state = 278;
                    this.statement();
                    }
                    }
                    this.state = 283;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            }
            this.state = 286;
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
        this.enterRule(localContext, 60, LPCParser.RULE_statement);
        try {
            this.state = 295;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 26, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 288;
                this.expressionStatement();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 289;
                this.compoundStatement();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 290;
                this.selectionStatement();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 291;
                this.iterationStatement();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 292;
                this.jumpStatement();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 293;
                this.variableDeclaration();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 294;
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
        this.enterRule(localContext, 62, LPCParser.RULE_expressionStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 297;
            this.expression(0);
            this.state = 298;
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
        this.enterRule(localContext, 64, LPCParser.RULE_compoundStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 300;
            this.match(LPCParser.T__16);
            this.state = 304;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 10)) & ~0x1F) === 0 && ((1 << (_la - 10)) & 1975871617) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 12588669) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 262471809) !== 0)) {
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
            this.state = 307;
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
        this.enterRule(localContext, 66, LPCParser.RULE_selectionStatement);
        try {
            this.state = 311;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.IF:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 309;
                this.ifStatement();
                }
                break;
            case LPCParser.SWITCH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 310;
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
        this.enterRule(localContext, 68, LPCParser.RULE_ifStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 313;
            this.match(LPCParser.IF);
            this.state = 314;
            this.match(LPCParser.T__9);
            this.state = 315;
            this.expression(0);
            this.state = 316;
            this.match(LPCParser.T__10);
            this.state = 317;
            this.statement();
            this.state = 320;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context) ) {
            case 1:
                {
                this.state = 318;
                this.match(LPCParser.ELSE);
                this.state = 319;
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
        this.enterRule(localContext, 70, LPCParser.RULE_switchStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 322;
            this.match(LPCParser.SWITCH);
            this.state = 323;
            this.match(LPCParser.T__9);
            this.state = 324;
            this.expression(0);
            this.state = 325;
            this.match(LPCParser.T__10);
            this.state = 326;
            this.match(LPCParser.T__16);
            this.state = 331;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 22 || _la === 27) {
                {
                this.state = 329;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.CASE:
                    {
                    this.state = 327;
                    this.caseStatement();
                    }
                    break;
                case LPCParser.DEFAULT:
                    {
                    this.state = 328;
                    this.defaultStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 333;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 334;
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
        this.enterRule(localContext, 72, LPCParser.RULE_caseExpression);
        let _la: number;
        try {
            this.state = 340;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 32, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 336;
                _la = this.tokenStream.LA(1);
                if(!(_la === 100 || _la === 102)) {
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
                this.state = 337;
                _la = this.tokenStream.LA(1);
                if(!(_la === 100 || _la === 102)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 338;
                this.match(LPCParser.T__18);
                this.state = 339;
                _la = this.tokenStream.LA(1);
                if(!(_la === 100 || _la === 102)) {
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
        this.enterRule(localContext, 74, LPCParser.RULE_caseStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 342;
            this.match(LPCParser.CASE);
            this.state = 343;
            this.caseExpression();
            this.state = 344;
            this.match(LPCParser.COLON);
            this.state = 348;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 10)) & ~0x1F) === 0 && ((1 << (_la - 10)) & 1975871617) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 12588669) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 262471809) !== 0)) {
                {
                {
                this.state = 345;
                this.statement();
                }
                }
                this.state = 350;
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
        this.enterRule(localContext, 76, LPCParser.RULE_defaultStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 351;
            this.match(LPCParser.DEFAULT);
            this.state = 352;
            this.match(LPCParser.COLON);
            this.state = 356;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 10)) & ~0x1F) === 0 && ((1 << (_la - 10)) & 1975871617) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 12588669) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 262471809) !== 0)) {
                {
                {
                this.state = 353;
                this.statement();
                }
                }
                this.state = 358;
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
        this.enterRule(localContext, 78, LPCParser.RULE_iterationStatement);
        let _la: number;
        try {
            this.state = 397;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.WHILE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 359;
                this.match(LPCParser.WHILE);
                this.state = 360;
                this.match(LPCParser.T__9);
                this.state = 361;
                this.expression(0);
                this.state = 362;
                this.match(LPCParser.T__10);
                this.state = 363;
                this.statement();
                }
                break;
            case LPCParser.DO:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 365;
                this.match(LPCParser.DO);
                this.state = 366;
                this.statement();
                this.state = 367;
                this.match(LPCParser.WHILE);
                this.state = 368;
                this.match(LPCParser.T__9);
                this.state = 369;
                this.expression(0);
                this.state = 370;
                this.match(LPCParser.T__10);
                this.state = 371;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.FOR:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 373;
                this.match(LPCParser.FOR);
                this.state = 374;
                this.match(LPCParser.T__9);
                this.state = 376;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 10 || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 2684362755) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 125) !== 0)) {
                    {
                    this.state = 375;
                    this.expression(0);
                    }
                }

                this.state = 378;
                this.match(LPCParser.SEMI);
                this.state = 380;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 10 || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 2684362755) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 125) !== 0)) {
                    {
                    this.state = 379;
                    this.expression(0);
                    }
                }

                this.state = 382;
                this.match(LPCParser.SEMI);
                this.state = 384;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 10 || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 2684362755) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 125) !== 0)) {
                    {
                    this.state = 383;
                    this.expression(0);
                    }
                }

                this.state = 386;
                this.match(LPCParser.T__10);
                this.state = 387;
                this.statement();
                }
                break;
            case LPCParser.FOREACH:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 388;
                this.match(LPCParser.FOREACH);
                this.state = 389;
                this.match(LPCParser.T__9);
                this.state = 390;
                this.typeSpecifier(0);
                this.state = 391;
                this.match(LPCParser.Identifier);
                this.state = 392;
                _la = this.tokenStream.LA(1);
                if(!(_la === 37 || _la === 81)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 393;
                this.expression(0);
                this.state = 394;
                this.match(LPCParser.T__10);
                this.state = 395;
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
        this.enterRule(localContext, 80, LPCParser.RULE_jumpStatement);
        let _la: number;
        try {
            this.state = 408;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BREAK:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 399;
                this.match(LPCParser.BREAK);
                this.state = 400;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.CONTINUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 401;
                this.match(LPCParser.CONTINUE);
                this.state = 402;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.RETURN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 403;
                this.match(LPCParser.RETURN);
                this.state = 405;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 10 || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 2684362755) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 125) !== 0)) {
                    {
                    this.state = 404;
                    this.expression(0);
                    }
                }

                this.state = 407;
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
        this.enterRule(localContext, 82, LPCParser.RULE_callOtherTarget);
        try {
            this.state = 415;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 410;
                this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.T__9:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 411;
                this.match(LPCParser.T__9);
                this.state = 412;
                this.match(LPCParser.Identifier);
                this.state = 413;
                this.match(LPCParser.T__10);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 414;
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
        this.enterRule(localContext, 84, LPCParser.RULE_callOtherExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 417;
            _la = this.tokenStream.LA(1);
            if(!(_la === 102 || _la === 104)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 418;
            this.match(LPCParser.ARROW);
            this.state = 419;
            this.callOtherTarget();
            this.state = 420;
            this.match(LPCParser.T__9);
            this.state = 422;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 10 || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 2684362755) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 125) !== 0)) {
                {
                this.state = 421;
                this.expressionList();
                }
            }

            this.state = 424;
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
        let _startState = 86;
        this.enterRecursionRule(localContext, 86, LPCParser.RULE_expression, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 455;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 44, this.context) ) {
            case 1:
                {
                this.state = 427;
                this.match(LPCParser.Identifier);
                }
                break;
            case 2:
                {
                this.state = 428;
                this.match(LPCParser.IntegerConstant);
                }
                break;
            case 3:
                {
                this.state = 429;
                this.match(LPCParser.FloatingConstant);
                }
                break;
            case 4:
                {
                this.state = 430;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case 5:
                {
                this.state = 431;
                this.match(LPCParser.CharacterConstant);
                }
                break;
            case 6:
                {
                this.state = 432;
                this.match(LPCParser.T__9);
                this.state = 433;
                this.expression(0);
                this.state = 434;
                this.match(LPCParser.T__10);
                }
                break;
            case 7:
                {
                this.state = 436;
                this.inlineClosureExpression();
                }
                break;
            case 8:
                {
                this.state = 437;
                this.match(LPCParser.NOT);
                this.state = 438;
                this.expression(10);
                }
                break;
            case 9:
                {
                this.state = 439;
                this.match(LPCParser.INC);
                this.state = 440;
                this.expression(9);
                }
                break;
            case 10:
                {
                this.state = 441;
                this.match(LPCParser.DEC);
                this.state = 442;
                this.expression(8);
                }
                break;
            case 11:
                {
                this.state = 443;
                this.match(LPCParser.Identifier);
                this.state = 444;
                this.match(LPCParser.T__15);
                this.state = 445;
                this.expression(5);
                }
                break;
            case 12:
                {
                this.state = 446;
                this.match(LPCParser.Identifier);
                this.state = 447;
                this.match(LPCParser.T__9);
                this.state = 449;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 10 || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 2684362755) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 125) !== 0)) {
                    {
                    this.state = 448;
                    this.expressionList();
                    }
                }

                this.state = 451;
                this.match(LPCParser.T__10);
                }
                break;
            case 13:
                {
                this.state = 452;
                this.mappingExpression();
                }
                break;
            case 14:
                {
                this.state = 453;
                this.callOtherExpression();
                }
                break;
            case 15:
                {
                this.state = 454;
                this.arrayExpression();
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 541;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 46, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 539;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 45, this.context) ) {
                    case 1:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 457;
                        if (!(this.precpred(this.context, 35))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 35)");
                        }
                        this.state = 458;
                        this.match(LPCParser.PLUS);
                        this.state = 459;
                        this.expression(36);
                        }
                        break;
                    case 2:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 460;
                        if (!(this.precpred(this.context, 34))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 34)");
                        }
                        this.state = 461;
                        this.match(LPCParser.MINUS);
                        this.state = 462;
                        this.expression(35);
                        }
                        break;
                    case 3:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 463;
                        if (!(this.precpred(this.context, 33))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 33)");
                        }
                        this.state = 464;
                        this.match(LPCParser.STAR);
                        this.state = 465;
                        this.expression(34);
                        }
                        break;
                    case 4:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 466;
                        if (!(this.precpred(this.context, 32))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 32)");
                        }
                        this.state = 467;
                        this.match(LPCParser.DIV);
                        this.state = 468;
                        this.expression(33);
                        }
                        break;
                    case 5:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 469;
                        if (!(this.precpred(this.context, 31))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 31)");
                        }
                        this.state = 470;
                        this.match(LPCParser.MOD);
                        this.state = 471;
                        this.expression(32);
                        }
                        break;
                    case 6:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 472;
                        if (!(this.precpred(this.context, 30))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 30)");
                        }
                        this.state = 473;
                        this.match(LPCParser.LT);
                        this.state = 474;
                        this.expression(31);
                        }
                        break;
                    case 7:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 475;
                        if (!(this.precpred(this.context, 29))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 29)");
                        }
                        this.state = 476;
                        this.match(LPCParser.GT);
                        this.state = 477;
                        this.expression(30);
                        }
                        break;
                    case 8:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 478;
                        if (!(this.precpred(this.context, 28))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 28)");
                        }
                        this.state = 479;
                        this.match(LPCParser.LE);
                        this.state = 480;
                        this.expression(29);
                        }
                        break;
                    case 9:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 481;
                        if (!(this.precpred(this.context, 27))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 27)");
                        }
                        this.state = 482;
                        this.match(LPCParser.GE);
                        this.state = 483;
                        this.expression(28);
                        }
                        break;
                    case 10:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 484;
                        if (!(this.precpred(this.context, 26))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 26)");
                        }
                        this.state = 485;
                        this.match(LPCParser.EQ);
                        this.state = 486;
                        this.expression(27);
                        }
                        break;
                    case 11:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 487;
                        if (!(this.precpred(this.context, 25))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 25)");
                        }
                        this.state = 488;
                        this.match(LPCParser.NE);
                        this.state = 489;
                        this.expression(26);
                        }
                        break;
                    case 12:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 490;
                        if (!(this.precpred(this.context, 24))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 24)");
                        }
                        this.state = 491;
                        this.match(LPCParser.AND);
                        this.state = 492;
                        this.expression(25);
                        }
                        break;
                    case 13:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 493;
                        if (!(this.precpred(this.context, 23))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 23)");
                        }
                        this.state = 494;
                        this.match(LPCParser.OR);
                        this.state = 495;
                        this.expression(24);
                        }
                        break;
                    case 14:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 496;
                        if (!(this.precpred(this.context, 22))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 22)");
                        }
                        this.state = 497;
                        this.match(LPCParser.XOR);
                        this.state = 498;
                        this.expression(23);
                        }
                        break;
                    case 15:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 499;
                        if (!(this.precpred(this.context, 21))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 21)");
                        }
                        this.state = 500;
                        this.match(LPCParser.AND_AND);
                        this.state = 501;
                        this.expression(22);
                        }
                        break;
                    case 16:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 502;
                        if (!(this.precpred(this.context, 20))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 20)");
                        }
                        this.state = 503;
                        this.match(LPCParser.OR_OR);
                        this.state = 504;
                        this.expression(21);
                        }
                        break;
                    case 17:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 505;
                        if (!(this.precpred(this.context, 19))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 19)");
                        }
                        this.state = 506;
                        this.match(LPCParser.ADD_ASSIGN);
                        this.state = 507;
                        this.expression(20);
                        }
                        break;
                    case 18:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 508;
                        if (!(this.precpred(this.context, 18))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 18)");
                        }
                        this.state = 509;
                        this.match(LPCParser.SUB_ASSIGN);
                        this.state = 510;
                        this.expression(19);
                        }
                        break;
                    case 19:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 511;
                        if (!(this.precpred(this.context, 17))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 17)");
                        }
                        this.state = 512;
                        this.match(LPCParser.MUL_ASSIGN);
                        this.state = 513;
                        this.expression(18);
                        }
                        break;
                    case 20:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 514;
                        if (!(this.precpred(this.context, 16))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 16)");
                        }
                        this.state = 515;
                        this.match(LPCParser.DIV_ASSIGN);
                        this.state = 516;
                        this.expression(17);
                        }
                        break;
                    case 21:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 517;
                        if (!(this.precpred(this.context, 15))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 15)");
                        }
                        this.state = 518;
                        this.match(LPCParser.MOD_ASSIGN);
                        this.state = 519;
                        this.expression(16);
                        }
                        break;
                    case 22:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 520;
                        if (!(this.precpred(this.context, 14))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 14)");
                        }
                        this.state = 521;
                        this.match(LPCParser.AND_ASSIGN);
                        this.state = 522;
                        this.expression(15);
                        }
                        break;
                    case 23:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 523;
                        if (!(this.precpred(this.context, 13))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 13)");
                        }
                        this.state = 524;
                        this.match(LPCParser.OR_ASSIGN);
                        this.state = 525;
                        this.expression(14);
                        }
                        break;
                    case 24:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 526;
                        if (!(this.precpred(this.context, 12))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 12)");
                        }
                        this.state = 527;
                        this.match(LPCParser.XOR_ASSIGN);
                        this.state = 528;
                        this.expression(13);
                        }
                        break;
                    case 25:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 529;
                        if (!(this.precpred(this.context, 11))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 11)");
                        }
                        this.state = 530;
                        this.match(LPCParser.QUESTION);
                        this.state = 531;
                        this.expression(0);
                        this.state = 532;
                        this.match(LPCParser.COLON);
                        this.state = 533;
                        this.expression(12);
                        }
                        break;
                    case 26:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 535;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 536;
                        this.match(LPCParser.INC);
                        }
                        break;
                    case 27:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 537;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 538;
                        this.match(LPCParser.DEC);
                        }
                        break;
                    }
                    }
                }
                this.state = 543;
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
        this.enterRule(localContext, 88, LPCParser.RULE_expressionList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 544;
            this.expression(0);
            this.state = 549;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 83) {
                {
                {
                this.state = 545;
                this.match(LPCParser.COMMA);
                this.state = 546;
                this.expression(0);
                }
                }
                this.state = 551;
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
        case 28:
            return this.typeSpecifier_sempred(localContext as TypeSpecifierContext, predIndex);
        case 43:
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
            return this.precpred(this.context, 35);
        case 2:
            return this.precpred(this.context, 34);
        case 3:
            return this.precpred(this.context, 33);
        case 4:
            return this.precpred(this.context, 32);
        case 5:
            return this.precpred(this.context, 31);
        case 6:
            return this.precpred(this.context, 30);
        case 7:
            return this.precpred(this.context, 29);
        case 8:
            return this.precpred(this.context, 28);
        case 9:
            return this.precpred(this.context, 27);
        case 10:
            return this.precpred(this.context, 26);
        case 11:
            return this.precpred(this.context, 25);
        case 12:
            return this.precpred(this.context, 24);
        case 13:
            return this.precpred(this.context, 23);
        case 14:
            return this.precpred(this.context, 22);
        case 15:
            return this.precpred(this.context, 21);
        case 16:
            return this.precpred(this.context, 20);
        case 17:
            return this.precpred(this.context, 19);
        case 18:
            return this.precpred(this.context, 18);
        case 19:
            return this.precpred(this.context, 17);
        case 20:
            return this.precpred(this.context, 16);
        case 21:
            return this.precpred(this.context, 15);
        case 22:
            return this.precpred(this.context, 14);
        case 23:
            return this.precpred(this.context, 13);
        case 24:
            return this.precpred(this.context, 12);
        case 25:
            return this.precpred(this.context, 11);
        case 26:
            return this.precpred(this.context, 7);
        case 27:
            return this.precpred(this.context, 6);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,107,553,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
        7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,
        13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
        20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,
        26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,
        33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,
        39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,1,0,1,0,1,0,
        5,0,94,8,0,10,0,12,0,97,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,117,8,1,10,1,12,1,120,9,
        1,3,1,122,8,1,1,2,1,2,1,2,1,2,3,2,128,8,2,1,2,3,2,131,8,2,1,3,1,
        3,1,4,1,4,1,5,1,5,1,6,1,6,1,7,1,7,1,7,1,7,5,7,145,8,7,10,7,12,7,
        148,9,7,1,7,1,7,1,8,1,8,1,9,1,9,1,10,1,10,3,10,158,8,10,1,11,1,11,
        1,11,3,11,163,8,11,1,12,1,12,1,12,1,12,1,13,1,13,1,14,1,14,1,15,
        1,15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,3,16,182,8,16,1,17,1,17,
        3,17,186,8,17,1,18,1,18,1,19,3,19,191,8,19,1,19,3,19,194,8,19,1,
        19,1,19,1,19,3,19,199,8,19,1,19,1,19,1,19,1,20,1,20,1,20,5,20,207,
        8,20,10,20,12,20,210,9,20,1,21,3,21,213,8,21,1,21,1,21,1,22,1,22,
        1,22,1,22,5,22,221,8,22,10,22,12,22,224,9,22,3,22,226,8,22,1,22,
        1,22,1,23,1,23,1,24,1,24,1,24,1,24,1,24,5,24,237,8,24,10,24,12,24,
        240,9,24,3,24,242,8,24,1,25,1,25,1,25,1,25,5,25,248,8,25,10,25,12,
        25,251,9,25,3,25,253,8,25,1,25,1,25,1,26,1,26,1,26,1,26,3,26,261,
        8,26,1,26,1,26,1,27,1,27,1,28,1,28,1,28,1,28,1,28,5,28,272,8,28,
        10,28,12,28,275,9,28,1,29,1,29,1,29,5,29,280,8,29,10,29,12,29,283,
        9,29,3,29,285,8,29,1,29,1,29,1,30,1,30,1,30,1,30,1,30,1,30,1,30,
        3,30,296,8,30,1,31,1,31,1,31,1,32,1,32,5,32,303,8,32,10,32,12,32,
        306,9,32,1,32,1,32,1,33,1,33,3,33,312,8,33,1,34,1,34,1,34,1,34,1,
        34,1,34,1,34,3,34,321,8,34,1,35,1,35,1,35,1,35,1,35,1,35,1,35,5,
        35,330,8,35,10,35,12,35,333,9,35,1,35,1,35,1,36,1,36,1,36,1,36,3,
        36,341,8,36,1,37,1,37,1,37,1,37,5,37,347,8,37,10,37,12,37,350,9,
        37,1,38,1,38,1,38,5,38,355,8,38,10,38,12,38,358,9,38,1,39,1,39,1,
        39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,
        39,1,39,3,39,377,8,39,1,39,1,39,3,39,381,8,39,1,39,1,39,3,39,385,
        8,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,3,39,
        398,8,39,1,40,1,40,1,40,1,40,1,40,1,40,3,40,406,8,40,1,40,3,40,409,
        8,40,1,41,1,41,1,41,1,41,1,41,3,41,416,8,41,1,42,1,42,1,42,1,42,
        1,42,3,42,423,8,42,1,42,1,42,1,43,1,43,1,43,1,43,1,43,1,43,1,43,
        1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,
        1,43,1,43,1,43,3,43,450,8,43,1,43,1,43,1,43,1,43,3,43,456,8,43,1,
        43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,
        43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,
        43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,
        43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,
        43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,
        43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,
        43,1,43,1,43,1,43,5,43,540,8,43,10,43,12,43,543,9,43,1,44,1,44,1,
        44,5,44,548,8,44,10,44,12,44,551,9,44,1,44,0,2,56,86,45,0,2,4,6,
        8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,
        52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,0,9,2,0,
        2,2,29,29,2,0,3,8,36,36,3,0,100,100,102,102,104,104,1,0,55,58,2,
        0,100,100,102,103,5,0,23,24,32,32,38,40,44,47,51,52,2,0,100,100,
        102,102,2,0,37,37,81,81,2,0,102,102,104,104,606,0,95,1,0,0,0,2,121,
        1,0,0,0,4,123,1,0,0,0,6,132,1,0,0,0,8,134,1,0,0,0,10,136,1,0,0,0,
        12,138,1,0,0,0,14,140,1,0,0,0,16,151,1,0,0,0,18,153,1,0,0,0,20,157,
        1,0,0,0,22,159,1,0,0,0,24,164,1,0,0,0,26,168,1,0,0,0,28,170,1,0,
        0,0,30,172,1,0,0,0,32,181,1,0,0,0,34,185,1,0,0,0,36,187,1,0,0,0,
        38,190,1,0,0,0,40,203,1,0,0,0,42,212,1,0,0,0,44,216,1,0,0,0,46,229,
        1,0,0,0,48,231,1,0,0,0,50,243,1,0,0,0,52,256,1,0,0,0,54,264,1,0,
        0,0,56,266,1,0,0,0,58,276,1,0,0,0,60,295,1,0,0,0,62,297,1,0,0,0,
        64,300,1,0,0,0,66,311,1,0,0,0,68,313,1,0,0,0,70,322,1,0,0,0,72,340,
        1,0,0,0,74,342,1,0,0,0,76,351,1,0,0,0,78,397,1,0,0,0,80,408,1,0,
        0,0,82,415,1,0,0,0,84,417,1,0,0,0,86,455,1,0,0,0,88,544,1,0,0,0,
        90,94,3,34,17,0,91,94,3,2,1,0,92,94,3,30,15,0,93,90,1,0,0,0,93,91,
        1,0,0,0,93,92,1,0,0,0,94,97,1,0,0,0,95,93,1,0,0,0,95,96,1,0,0,0,
        96,98,1,0,0,0,97,95,1,0,0,0,98,99,5,0,0,1,99,1,1,0,0,0,100,101,5,
        1,0,0,101,122,3,6,3,0,102,103,5,1,0,0,103,104,3,8,4,0,104,105,3,
        10,5,0,105,122,1,0,0,0,106,122,3,4,2,0,107,108,5,1,0,0,108,109,3,
        18,9,0,109,110,3,20,10,0,110,122,1,0,0,0,111,112,5,1,0,0,112,113,
        3,28,14,0,113,118,5,104,0,0,114,115,5,83,0,0,115,117,5,104,0,0,116,
        114,1,0,0,0,117,120,1,0,0,0,118,116,1,0,0,0,118,119,1,0,0,0,119,
        122,1,0,0,0,120,118,1,0,0,0,121,100,1,0,0,0,121,102,1,0,0,0,121,
        106,1,0,0,0,121,107,1,0,0,0,121,111,1,0,0,0,122,3,1,0,0,0,123,124,
        5,1,0,0,124,125,3,12,6,0,125,127,5,104,0,0,126,128,3,14,7,0,127,
        126,1,0,0,0,127,128,1,0,0,0,128,130,1,0,0,0,129,131,3,16,8,0,130,
        129,1,0,0,0,130,131,1,0,0,0,131,5,1,0,0,0,132,133,7,0,0,0,133,7,
        1,0,0,0,134,135,7,1,0,0,135,9,1,0,0,0,136,137,7,2,0,0,137,11,1,0,
        0,0,138,139,5,9,0,0,139,13,1,0,0,0,140,141,5,10,0,0,141,146,5,104,
        0,0,142,143,5,83,0,0,143,145,5,104,0,0,144,142,1,0,0,0,145,148,1,
        0,0,0,146,144,1,0,0,0,146,147,1,0,0,0,147,149,1,0,0,0,148,146,1,
        0,0,0,149,150,5,11,0,0,150,15,1,0,0,0,151,152,3,86,43,0,152,17,1,
        0,0,0,153,154,5,12,0,0,154,19,1,0,0,0,155,158,3,24,12,0,156,158,
        3,26,13,0,157,155,1,0,0,0,157,156,1,0,0,0,158,21,1,0,0,0,159,162,
        5,104,0,0,160,161,5,13,0,0,161,163,5,104,0,0,162,160,1,0,0,0,162,
        163,1,0,0,0,163,23,1,0,0,0,164,165,5,68,0,0,165,166,3,22,11,0,166,
        167,5,69,0,0,167,25,1,0,0,0,168,169,5,102,0,0,169,27,1,0,0,0,170,
        171,5,14,0,0,171,29,1,0,0,0,172,173,5,15,0,0,173,174,5,102,0,0,174,
        175,5,82,0,0,175,31,1,0,0,0,176,177,5,84,0,0,177,182,3,86,43,0,178,
        179,5,102,0,0,179,180,5,84,0,0,180,182,3,86,43,0,181,176,1,0,0,0,
        181,178,1,0,0,0,182,33,1,0,0,0,183,186,3,38,19,0,184,186,3,52,26,
        0,185,183,1,0,0,0,185,184,1,0,0,0,186,35,1,0,0,0,187,188,7,3,0,0,
        188,37,1,0,0,0,189,191,3,36,18,0,190,189,1,0,0,0,190,191,1,0,0,0,
        191,193,1,0,0,0,192,194,3,56,28,0,193,192,1,0,0,0,193,194,1,0,0,
        0,194,195,1,0,0,0,195,196,5,104,0,0,196,198,5,10,0,0,197,199,3,40,
        20,0,198,197,1,0,0,0,198,199,1,0,0,0,199,200,1,0,0,0,200,201,5,11,
        0,0,201,202,3,64,32,0,202,39,1,0,0,0,203,208,3,42,21,0,204,205,5,
        83,0,0,205,207,3,42,21,0,206,204,1,0,0,0,207,210,1,0,0,0,208,206,
        1,0,0,0,208,209,1,0,0,0,209,41,1,0,0,0,210,208,1,0,0,0,211,213,3,
        56,28,0,212,211,1,0,0,0,212,213,1,0,0,0,213,214,1,0,0,0,214,215,
        5,104,0,0,215,43,1,0,0,0,216,225,5,93,0,0,217,222,3,86,43,0,218,
        219,5,83,0,0,219,221,3,86,43,0,220,218,1,0,0,0,221,224,1,0,0,0,222,
        220,1,0,0,0,222,223,1,0,0,0,223,226,1,0,0,0,224,222,1,0,0,0,225,
        217,1,0,0,0,225,226,1,0,0,0,226,227,1,0,0,0,227,228,5,94,0,0,228,
        45,1,0,0,0,229,230,7,4,0,0,230,47,1,0,0,0,231,241,3,46,23,0,232,
        233,5,81,0,0,233,238,3,86,43,0,234,235,5,82,0,0,235,237,3,86,43,
        0,236,234,1,0,0,0,237,240,1,0,0,0,238,236,1,0,0,0,238,239,1,0,0,
        0,239,242,1,0,0,0,240,238,1,0,0,0,241,232,1,0,0,0,241,242,1,0,0,
        0,242,49,1,0,0,0,243,252,5,95,0,0,244,249,3,48,24,0,245,246,5,83,
        0,0,246,248,3,48,24,0,247,245,1,0,0,0,248,251,1,0,0,0,249,247,1,
        0,0,0,249,250,1,0,0,0,250,253,1,0,0,0,251,249,1,0,0,0,252,244,1,
        0,0,0,252,253,1,0,0,0,253,254,1,0,0,0,254,255,5,96,0,0,255,51,1,
        0,0,0,256,257,3,56,28,0,257,260,5,104,0,0,258,259,5,16,0,0,259,261,
        3,86,43,0,260,258,1,0,0,0,260,261,1,0,0,0,261,262,1,0,0,0,262,263,
        5,82,0,0,263,53,1,0,0,0,264,265,7,5,0,0,265,55,1,0,0,0,266,267,6,
        28,-1,0,267,268,3,54,27,0,268,273,1,0,0,0,269,270,10,1,0,0,270,272,
        5,61,0,0,271,269,1,0,0,0,272,275,1,0,0,0,273,271,1,0,0,0,273,274,
        1,0,0,0,274,57,1,0,0,0,275,273,1,0,0,0,276,284,5,98,0,0,277,285,
        3,86,43,0,278,280,3,60,30,0,279,278,1,0,0,0,280,283,1,0,0,0,281,
        279,1,0,0,0,281,282,1,0,0,0,282,285,1,0,0,0,283,281,1,0,0,0,284,
        277,1,0,0,0,284,281,1,0,0,0,285,286,1,0,0,0,286,287,5,99,0,0,287,
        59,1,0,0,0,288,296,3,62,31,0,289,296,3,64,32,0,290,296,3,66,33,0,
        291,296,3,78,39,0,292,296,3,80,40,0,293,296,3,52,26,0,294,296,3,
        32,16,0,295,288,1,0,0,0,295,289,1,0,0,0,295,290,1,0,0,0,295,291,
        1,0,0,0,295,292,1,0,0,0,295,293,1,0,0,0,295,294,1,0,0,0,296,61,1,
        0,0,0,297,298,3,86,43,0,298,299,5,82,0,0,299,63,1,0,0,0,300,304,
        5,17,0,0,301,303,3,60,30,0,302,301,1,0,0,0,303,306,1,0,0,0,304,302,
        1,0,0,0,304,305,1,0,0,0,305,307,1,0,0,0,306,304,1,0,0,0,307,308,
        5,18,0,0,308,65,1,0,0,0,309,312,3,68,34,0,310,312,3,70,35,0,311,
        309,1,0,0,0,311,310,1,0,0,0,312,67,1,0,0,0,313,314,5,36,0,0,314,
        315,5,10,0,0,315,316,3,86,43,0,316,317,5,11,0,0,317,320,3,60,30,
        0,318,319,5,29,0,0,319,321,3,60,30,0,320,318,1,0,0,0,320,321,1,0,
        0,0,321,69,1,0,0,0,322,323,5,48,0,0,323,324,5,10,0,0,324,325,3,86,
        43,0,325,326,5,11,0,0,326,331,5,17,0,0,327,330,3,74,37,0,328,330,
        3,76,38,0,329,327,1,0,0,0,329,328,1,0,0,0,330,333,1,0,0,0,331,329,
        1,0,0,0,331,332,1,0,0,0,332,334,1,0,0,0,333,331,1,0,0,0,334,335,
        5,18,0,0,335,71,1,0,0,0,336,341,7,6,0,0,337,338,7,6,0,0,338,339,
        5,19,0,0,339,341,7,6,0,0,340,336,1,0,0,0,340,337,1,0,0,0,341,73,
        1,0,0,0,342,343,5,22,0,0,343,344,3,72,36,0,344,348,5,81,0,0,345,
        347,3,60,30,0,346,345,1,0,0,0,347,350,1,0,0,0,348,346,1,0,0,0,348,
        349,1,0,0,0,349,75,1,0,0,0,350,348,1,0,0,0,351,352,5,27,0,0,352,
        356,5,81,0,0,353,355,3,60,30,0,354,353,1,0,0,0,355,358,1,0,0,0,356,
        354,1,0,0,0,356,357,1,0,0,0,357,77,1,0,0,0,358,356,1,0,0,0,359,360,
        5,54,0,0,360,361,5,10,0,0,361,362,3,86,43,0,362,363,5,11,0,0,363,
        364,3,60,30,0,364,398,1,0,0,0,365,366,5,28,0,0,366,367,3,60,30,0,
        367,368,5,54,0,0,368,369,5,10,0,0,369,370,3,86,43,0,370,371,5,11,
        0,0,371,372,5,82,0,0,372,398,1,0,0,0,373,374,5,33,0,0,374,376,5,
        10,0,0,375,377,3,86,43,0,376,375,1,0,0,0,376,377,1,0,0,0,377,378,
        1,0,0,0,378,380,5,82,0,0,379,381,3,86,43,0,380,379,1,0,0,0,380,381,
        1,0,0,0,381,382,1,0,0,0,382,384,5,82,0,0,383,385,3,86,43,0,384,383,
        1,0,0,0,384,385,1,0,0,0,385,386,1,0,0,0,386,387,5,11,0,0,387,398,
        3,60,30,0,388,389,5,34,0,0,389,390,5,10,0,0,390,391,3,56,28,0,391,
        392,5,104,0,0,392,393,7,7,0,0,393,394,3,86,43,0,394,395,5,11,0,0,
        395,396,3,60,30,0,396,398,1,0,0,0,397,359,1,0,0,0,397,365,1,0,0,
        0,397,373,1,0,0,0,397,388,1,0,0,0,398,79,1,0,0,0,399,400,5,21,0,
        0,400,409,5,82,0,0,401,402,5,26,0,0,402,409,5,82,0,0,403,405,5,42,
        0,0,404,406,3,86,43,0,405,404,1,0,0,0,405,406,1,0,0,0,406,407,1,
        0,0,0,407,409,5,82,0,0,408,399,1,0,0,0,408,401,1,0,0,0,408,403,1,
        0,0,0,409,81,1,0,0,0,410,416,5,104,0,0,411,412,5,10,0,0,412,413,
        5,104,0,0,413,416,5,11,0,0,414,416,5,102,0,0,415,410,1,0,0,0,415,
        411,1,0,0,0,415,414,1,0,0,0,416,83,1,0,0,0,417,418,7,8,0,0,418,419,
        5,97,0,0,419,420,3,82,41,0,420,422,5,10,0,0,421,423,3,88,44,0,422,
        421,1,0,0,0,422,423,1,0,0,0,423,424,1,0,0,0,424,425,5,11,0,0,425,
        85,1,0,0,0,426,427,6,43,-1,0,427,456,5,104,0,0,428,456,5,100,0,0,
        429,456,5,101,0,0,430,456,5,102,0,0,431,456,5,103,0,0,432,433,5,
        10,0,0,433,434,3,86,43,0,434,435,5,11,0,0,435,456,1,0,0,0,436,456,
        3,58,29,0,437,438,5,77,0,0,438,456,3,86,43,10,439,440,5,64,0,0,440,
        456,3,86,43,9,441,442,5,65,0,0,442,456,3,86,43,8,443,444,5,104,0,
        0,444,445,5,16,0,0,445,456,3,86,43,5,446,447,5,104,0,0,447,449,5,
        10,0,0,448,450,3,88,44,0,449,448,1,0,0,0,449,450,1,0,0,0,450,451,
        1,0,0,0,451,456,5,11,0,0,452,456,3,50,25,0,453,456,3,84,42,0,454,
        456,3,44,22,0,455,426,1,0,0,0,455,428,1,0,0,0,455,429,1,0,0,0,455,
        430,1,0,0,0,455,431,1,0,0,0,455,432,1,0,0,0,455,436,1,0,0,0,455,
        437,1,0,0,0,455,439,1,0,0,0,455,441,1,0,0,0,455,443,1,0,0,0,455,
        446,1,0,0,0,455,452,1,0,0,0,455,453,1,0,0,0,455,454,1,0,0,0,456,
        541,1,0,0,0,457,458,10,35,0,0,458,459,5,59,0,0,459,540,3,86,43,36,
        460,461,10,34,0,0,461,462,5,60,0,0,462,540,3,86,43,35,463,464,10,
        33,0,0,464,465,5,61,0,0,465,540,3,86,43,34,466,467,10,32,0,0,467,
        468,5,62,0,0,468,540,3,86,43,33,469,470,10,31,0,0,470,471,5,63,0,
        0,471,540,3,86,43,32,472,473,10,30,0,0,473,474,5,68,0,0,474,540,
        3,86,43,31,475,476,10,29,0,0,476,477,5,69,0,0,477,540,3,86,43,30,
        478,479,10,28,0,0,479,480,5,70,0,0,480,540,3,86,43,29,481,482,10,
        27,0,0,482,483,5,71,0,0,483,540,3,86,43,28,484,485,10,26,0,0,485,
        486,5,72,0,0,486,540,3,86,43,27,487,488,10,25,0,0,488,489,5,73,0,
        0,489,540,3,86,43,26,490,491,10,24,0,0,491,492,5,74,0,0,492,540,
        3,86,43,25,493,494,10,23,0,0,494,495,5,75,0,0,495,540,3,86,43,24,
        496,497,10,22,0,0,497,498,5,76,0,0,498,540,3,86,43,23,499,500,10,
        21,0,0,500,501,5,78,0,0,501,540,3,86,43,22,502,503,10,20,0,0,503,
        504,5,79,0,0,504,540,3,86,43,21,505,506,10,19,0,0,506,507,5,85,0,
        0,507,540,3,86,43,20,508,509,10,18,0,0,509,510,5,86,0,0,510,540,
        3,86,43,19,511,512,10,17,0,0,512,513,5,87,0,0,513,540,3,86,43,18,
        514,515,10,16,0,0,515,516,5,88,0,0,516,540,3,86,43,17,517,518,10,
        15,0,0,518,519,5,89,0,0,519,540,3,86,43,16,520,521,10,14,0,0,521,
        522,5,90,0,0,522,540,3,86,43,15,523,524,10,13,0,0,524,525,5,91,0,
        0,525,540,3,86,43,14,526,527,10,12,0,0,527,528,5,92,0,0,528,540,
        3,86,43,13,529,530,10,11,0,0,530,531,5,80,0,0,531,532,3,86,43,0,
        532,533,5,81,0,0,533,534,3,86,43,12,534,540,1,0,0,0,535,536,10,7,
        0,0,536,540,5,64,0,0,537,538,10,6,0,0,538,540,5,65,0,0,539,457,1,
        0,0,0,539,460,1,0,0,0,539,463,1,0,0,0,539,466,1,0,0,0,539,469,1,
        0,0,0,539,472,1,0,0,0,539,475,1,0,0,0,539,478,1,0,0,0,539,481,1,
        0,0,0,539,484,1,0,0,0,539,487,1,0,0,0,539,490,1,0,0,0,539,493,1,
        0,0,0,539,496,1,0,0,0,539,499,1,0,0,0,539,502,1,0,0,0,539,505,1,
        0,0,0,539,508,1,0,0,0,539,511,1,0,0,0,539,514,1,0,0,0,539,517,1,
        0,0,0,539,520,1,0,0,0,539,523,1,0,0,0,539,526,1,0,0,0,539,529,1,
        0,0,0,539,535,1,0,0,0,539,537,1,0,0,0,540,543,1,0,0,0,541,539,1,
        0,0,0,541,542,1,0,0,0,542,87,1,0,0,0,543,541,1,0,0,0,544,549,3,86,
        43,0,545,546,5,83,0,0,546,548,3,86,43,0,547,545,1,0,0,0,548,551,
        1,0,0,0,549,547,1,0,0,0,549,550,1,0,0,0,550,89,1,0,0,0,551,549,1,
        0,0,0,48,93,95,118,121,127,130,146,157,162,181,185,190,193,198,208,
        212,222,225,238,241,249,252,260,273,281,284,295,304,311,320,329,
        331,340,348,356,376,380,384,397,405,408,415,422,449,455,539,541,
        549
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


export class DefinePreprocessorDirectiveContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public directiveTypeDefine(): DirectiveTypeDefineContext {
        return this.getRuleContext(0, DirectiveTypeDefineContext)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
    }
    public directiveDefineParam(): DirectiveDefineParamContext | null {
        return this.getRuleContext(0, DirectiveDefineParamContext);
    }
    public directiveDefineArgument(): DirectiveDefineArgumentContext | null {
        return this.getRuleContext(0, DirectiveDefineArgumentContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_definePreprocessorDirective;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterDefinePreprocessorDirective) {
             listener.enterDefinePreprocessorDirective(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitDefinePreprocessorDirective) {
             listener.exitDefinePreprocessorDirective(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
        if (visitor.visitDefinePreprocessorDirective) {
            return visitor.visitDefinePreprocessorDirective(this);
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
    public override get ruleIndex(): number {
        return LPCParser.RULE_functionModifier;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterFunctionModifier) {
             listener.enterFunctionModifier(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitFunctionModifier) {
             listener.exitFunctionModifier(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterArrayExpression) {
             listener.enterArrayExpression(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitArrayExpression) {
             listener.exitArrayExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterPrimitiveTypeSpecifier) {
             listener.enterPrimitiveTypeSpecifier(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitPrimitiveTypeSpecifier) {
             listener.exitPrimitiveTypeSpecifier(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterInlineClosureExpression) {
             listener.enterInlineClosureExpression(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitInlineClosureExpression) {
             listener.exitInlineClosureExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(LPCParser.SEMI, 0)!;
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
    public callOtherExpression(): CallOtherExpressionContext | null {
        return this.getRuleContext(0, CallOtherExpressionContext);
    }
    public arrayExpression(): ArrayExpressionContext | null {
        return this.getRuleContext(0, ArrayExpressionContext);
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

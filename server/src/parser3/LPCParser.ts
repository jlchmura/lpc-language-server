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
    public static readonly AUTO = 6;
    public static readonly BREAK = 7;
    public static readonly CASE = 8;
    public static readonly CHAR = 9;
    public static readonly CONST = 10;
    public static readonly CONTINUE = 11;
    public static readonly DEFAULT = 12;
    public static readonly DO = 13;
    public static readonly ELSE = 14;
    public static readonly ENUM = 15;
    public static readonly EXTERN = 16;
    public static readonly FOR = 17;
    public static readonly GOTO = 18;
    public static readonly IF = 19;
    public static readonly INT = 20;
    public static readonly LONG = 21;
    public static readonly REGISTER = 22;
    public static readonly RETURN = 23;
    public static readonly SHORT = 24;
    public static readonly SIGNED = 25;
    public static readonly SIZEOF = 26;
    public static readonly STATIC = 27;
    public static readonly STRUCT = 28;
    public static readonly SWITCH = 29;
    public static readonly TYPEDEF = 30;
    public static readonly UNION = 31;
    public static readonly UNSIGNED = 32;
    public static readonly VOID = 33;
    public static readonly VOLATILE = 34;
    public static readonly WHILE = 35;
    public static readonly PLUS = 36;
    public static readonly MINUS = 37;
    public static readonly STAR = 38;
    public static readonly DIV = 39;
    public static readonly MOD = 40;
    public static readonly INC = 41;
    public static readonly DEC = 42;
    public static readonly SHL = 43;
    public static readonly SHR = 44;
    public static readonly LT = 45;
    public static readonly GT = 46;
    public static readonly LE = 47;
    public static readonly GE = 48;
    public static readonly EQ = 49;
    public static readonly NE = 50;
    public static readonly AND = 51;
    public static readonly OR = 52;
    public static readonly XOR = 53;
    public static readonly NOT = 54;
    public static readonly AND_AND = 55;
    public static readonly OR_OR = 56;
    public static readonly QUESTION = 57;
    public static readonly COLON = 58;
    public static readonly SEMI = 59;
    public static readonly COMMA = 60;
    public static readonly IntegerConstant = 61;
    public static readonly FloatingConstant = 62;
    public static readonly StringLiteral = 63;
    public static readonly CharacterConstant = 64;
    public static readonly Identifier = 65;
    public static readonly WS = 66;
    public static readonly COMMENT = 67;
    public static readonly LINE_COMMENT = 68;
    public static readonly RULE_program = 0;
    public static readonly RULE_declaration = 1;
    public static readonly RULE_functionDeclaration = 2;
    public static readonly RULE_parameterList = 3;
    public static readonly RULE_parameter = 4;
    public static readonly RULE_variableDeclaration = 5;
    public static readonly RULE_typeSpecifier = 6;
    public static readonly RULE_statement = 7;
    public static readonly RULE_expressionStatement = 8;
    public static readonly RULE_compoundStatement = 9;
    public static readonly RULE_selectionStatement = 10;
    public static readonly RULE_iterationStatement = 11;
    public static readonly RULE_jumpStatement = 12;
    public static readonly RULE_expression = 13;
    public static readonly RULE_expressionList = 14;

    public static readonly literalNames = [
        null, "'('", "')'", "'='", "'{'", "'}'", "'auto'", "'break'", "'case'", 
        "'char'", "'const'", "'continue'", "'default'", "'do'", "'else'", 
        "'enum'", "'extern'", "'for'", "'goto'", "'if'", "'int'", "'long'", 
        "'register'", "'return'", "'short'", "'signed'", "'sizeof'", "'static'", 
        "'struct'", "'switch'", "'typedef'", "'union'", "'unsigned'", "'void'", 
        "'volatile'", "'while'", "'+'", "'-'", "'*'", "'/'", "'%'", "'++'", 
        "'--'", "'<<'", "'>>'", "'<'", "'>'", "'<='", "'>='", "'=='", "'!='", 
        "'&'", "'|'", "'^'", "'!'", "'&&'", "'||'", "'?'", "':'", "';'", 
        "','"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, "AUTO", "BREAK", "CASE", "CHAR", 
        "CONST", "CONTINUE", "DEFAULT", "DO", "ELSE", "ENUM", "EXTERN", 
        "FOR", "GOTO", "IF", "INT", "LONG", "REGISTER", "RETURN", "SHORT", 
        "SIGNED", "SIZEOF", "STATIC", "STRUCT", "SWITCH", "TYPEDEF", "UNION", 
        "UNSIGNED", "VOID", "VOLATILE", "WHILE", "PLUS", "MINUS", "STAR", 
        "DIV", "MOD", "INC", "DEC", "SHL", "SHR", "LT", "GT", "LE", "GE", 
        "EQ", "NE", "AND", "OR", "XOR", "NOT", "AND_AND", "OR_OR", "QUESTION", 
        "COLON", "SEMI", "COMMA", "IntegerConstant", "FloatingConstant", 
        "StringLiteral", "CharacterConstant", "Identifier", "WS", "COMMENT", 
        "LINE_COMMENT"
    ];
    public static readonly ruleNames = [
        "program", "declaration", "functionDeclaration", "parameterList", 
        "parameter", "variableDeclaration", "typeSpecifier", "statement", 
        "expressionStatement", "compoundStatement", "selectionStatement", 
        "iterationStatement", "jumpStatement", "expression", "expressionList",
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
            this.state = 33;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 9)) & ~0x1F) === 0 && ((1 << (_la - 9)) & 16783361) !== 0) || _la === 65) {
                {
                {
                this.state = 30;
                this.declaration();
                }
                }
                this.state = 35;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 36;
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
    public declaration(): DeclarationContext {
        let localContext = new DeclarationContext(this.context, this.state);
        this.enterRule(localContext, 2, LPCParser.RULE_declaration);
        try {
            this.state = 40;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 38;
                this.functionDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 39;
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
        this.enterRule(localContext, 4, LPCParser.RULE_functionDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 43;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 9)) & ~0x1F) === 0 && ((1 << (_la - 9)) & 16783361) !== 0)) {
                {
                this.state = 42;
                this.typeSpecifier();
                }
            }

            this.state = 45;
            this.match(LPCParser.Identifier);
            this.state = 46;
            this.match(LPCParser.T__0);
            this.state = 48;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 9)) & ~0x1F) === 0 && ((1 << (_la - 9)) & 16783361) !== 0)) {
                {
                this.state = 47;
                this.parameterList();
                }
            }

            this.state = 50;
            this.match(LPCParser.T__1);
            this.state = 51;
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
        this.enterRule(localContext, 6, LPCParser.RULE_parameterList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 53;
            this.parameter();
            this.state = 58;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 60) {
                {
                {
                this.state = 54;
                this.match(LPCParser.COMMA);
                this.state = 55;
                this.parameter();
                }
                }
                this.state = 60;
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
        this.enterRule(localContext, 8, LPCParser.RULE_parameter);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 61;
            this.typeSpecifier();
            this.state = 62;
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
    public variableDeclaration(): VariableDeclarationContext {
        let localContext = new VariableDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 10, LPCParser.RULE_variableDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 64;
            this.typeSpecifier();
            this.state = 65;
            this.match(LPCParser.Identifier);
            this.state = 68;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 3) {
                {
                this.state = 66;
                this.match(LPCParser.T__2);
                this.state = 67;
                this.expression(0);
                }
            }

            this.state = 70;
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
    public typeSpecifier(): TypeSpecifierContext {
        let localContext = new TypeSpecifierContext(this.context, this.state);
        this.enterRule(localContext, 12, LPCParser.RULE_typeSpecifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 72;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 9)) & ~0x1F) === 0 && ((1 << (_la - 9)) & 16783361) !== 0))) {
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
        this.enterRule(localContext, 14, LPCParser.RULE_statement);
        try {
            this.state = 80;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.T__0:
            case LPCParser.INC:
            case LPCParser.DEC:
            case LPCParser.NOT:
            case LPCParser.SEMI:
            case LPCParser.IntegerConstant:
            case LPCParser.FloatingConstant:
            case LPCParser.StringLiteral:
            case LPCParser.CharacterConstant:
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 74;
                this.expressionStatement();
                }
                break;
            case LPCParser.T__3:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 75;
                this.compoundStatement();
                }
                break;
            case LPCParser.IF:
            case LPCParser.SWITCH:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 76;
                this.selectionStatement();
                }
                break;
            case LPCParser.DO:
            case LPCParser.FOR:
            case LPCParser.WHILE:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 77;
                this.iterationStatement();
                }
                break;
            case LPCParser.BREAK:
            case LPCParser.CONTINUE:
            case LPCParser.RETURN:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 78;
                this.jumpStatement();
                }
                break;
            case LPCParser.CHAR:
            case LPCParser.INT:
            case LPCParser.LONG:
            case LPCParser.VOID:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 79;
                this.variableDeclaration();
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
    public expressionStatement(): ExpressionStatementContext {
        let localContext = new ExpressionStatementContext(this.context, this.state);
        this.enterRule(localContext, 16, LPCParser.RULE_expressionStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 83;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 32514051) !== 0)) {
                {
                this.state = 82;
                this.expression(0);
                }
            }

            this.state = 85;
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
        this.enterRule(localContext, 18, LPCParser.RULE_compoundStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 87;
            this.match(LPCParser.T__3);
            this.state = 91;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 549071506) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 4095738629) !== 0) || _la === 65) {
                {
                {
                this.state = 88;
                this.statement();
                }
                }
                this.state = 93;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 94;
            this.match(LPCParser.T__4);
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
        this.enterRule(localContext, 20, LPCParser.RULE_selectionStatement);
        try {
            this.state = 111;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.IF:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 96;
                this.match(LPCParser.IF);
                this.state = 97;
                this.match(LPCParser.T__0);
                this.state = 98;
                this.expression(0);
                this.state = 99;
                this.match(LPCParser.T__1);
                this.state = 100;
                this.statement();
                this.state = 103;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
                case 1:
                    {
                    this.state = 101;
                    this.match(LPCParser.ELSE);
                    this.state = 102;
                    this.statement();
                    }
                    break;
                }
                }
                break;
            case LPCParser.SWITCH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 105;
                this.match(LPCParser.SWITCH);
                this.state = 106;
                this.match(LPCParser.T__0);
                this.state = 107;
                this.expression(0);
                this.state = 108;
                this.match(LPCParser.T__1);
                this.state = 109;
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
    public iterationStatement(): IterationStatementContext {
        let localContext = new IterationStatementContext(this.context, this.state);
        this.enterRule(localContext, 22, LPCParser.RULE_iterationStatement);
        let _la: number;
        try {
            this.state = 142;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.WHILE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 113;
                this.match(LPCParser.WHILE);
                this.state = 114;
                this.match(LPCParser.T__0);
                this.state = 115;
                this.expression(0);
                this.state = 116;
                this.match(LPCParser.T__1);
                this.state = 117;
                this.statement();
                }
                break;
            case LPCParser.DO:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 119;
                this.match(LPCParser.DO);
                this.state = 120;
                this.statement();
                this.state = 121;
                this.match(LPCParser.WHILE);
                this.state = 122;
                this.match(LPCParser.T__0);
                this.state = 123;
                this.expression(0);
                this.state = 124;
                this.match(LPCParser.T__1);
                this.state = 125;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.FOR:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 127;
                this.match(LPCParser.FOR);
                this.state = 128;
                this.match(LPCParser.T__0);
                this.state = 130;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 32514051) !== 0)) {
                    {
                    this.state = 129;
                    this.expression(0);
                    }
                }

                this.state = 132;
                this.match(LPCParser.SEMI);
                this.state = 134;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 32514051) !== 0)) {
                    {
                    this.state = 133;
                    this.expression(0);
                    }
                }

                this.state = 136;
                this.match(LPCParser.SEMI);
                this.state = 138;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 32514051) !== 0)) {
                    {
                    this.state = 137;
                    this.expression(0);
                    }
                }

                this.state = 140;
                this.match(LPCParser.T__1);
                this.state = 141;
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
        this.enterRule(localContext, 24, LPCParser.RULE_jumpStatement);
        let _la: number;
        try {
            this.state = 153;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BREAK:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 144;
                this.match(LPCParser.BREAK);
                this.state = 145;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.CONTINUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 146;
                this.match(LPCParser.CONTINUE);
                this.state = 147;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.RETURN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 148;
                this.match(LPCParser.RETURN);
                this.state = 150;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 32514051) !== 0)) {
                    {
                    this.state = 149;
                    this.expression(0);
                    }
                }

                this.state = 152;
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
        let _startState = 26;
        this.enterRecursionRule(localContext, 26, LPCParser.RULE_expression, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 180;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 18, this.context) ) {
            case 1:
                {
                this.state = 156;
                this.match(LPCParser.Identifier);
                }
                break;
            case 2:
                {
                this.state = 157;
                this.match(LPCParser.IntegerConstant);
                }
                break;
            case 3:
                {
                this.state = 158;
                this.match(LPCParser.FloatingConstant);
                }
                break;
            case 4:
                {
                this.state = 159;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case 5:
                {
                this.state = 160;
                this.match(LPCParser.CharacterConstant);
                }
                break;
            case 6:
                {
                this.state = 161;
                this.match(LPCParser.T__0);
                this.state = 162;
                this.expression(0);
                this.state = 163;
                this.match(LPCParser.T__1);
                }
                break;
            case 7:
                {
                this.state = 165;
                this.match(LPCParser.NOT);
                this.state = 166;
                this.expression(7);
                }
                break;
            case 8:
                {
                this.state = 167;
                this.match(LPCParser.INC);
                this.state = 168;
                this.expression(6);
                }
                break;
            case 9:
                {
                this.state = 169;
                this.match(LPCParser.DEC);
                this.state = 170;
                this.expression(5);
                }
                break;
            case 10:
                {
                this.state = 171;
                this.match(LPCParser.Identifier);
                this.state = 172;
                this.match(LPCParser.T__2);
                this.state = 173;
                this.expression(2);
                }
                break;
            case 11:
                {
                this.state = 174;
                this.match(LPCParser.Identifier);
                this.state = 175;
                this.match(LPCParser.T__0);
                this.state = 177;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 32514051) !== 0)) {
                    {
                    this.state = 176;
                    this.expressionList();
                    }
                }

                this.state = 179;
                this.match(LPCParser.T__1);
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 242;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 240;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 19, this.context) ) {
                    case 1:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 182;
                        if (!(this.precpred(this.context, 24))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 24)");
                        }
                        this.state = 183;
                        this.match(LPCParser.PLUS);
                        this.state = 184;
                        this.expression(25);
                        }
                        break;
                    case 2:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 185;
                        if (!(this.precpred(this.context, 23))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 23)");
                        }
                        this.state = 186;
                        this.match(LPCParser.MINUS);
                        this.state = 187;
                        this.expression(24);
                        }
                        break;
                    case 3:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 188;
                        if (!(this.precpred(this.context, 22))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 22)");
                        }
                        this.state = 189;
                        this.match(LPCParser.STAR);
                        this.state = 190;
                        this.expression(23);
                        }
                        break;
                    case 4:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 191;
                        if (!(this.precpred(this.context, 21))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 21)");
                        }
                        this.state = 192;
                        this.match(LPCParser.DIV);
                        this.state = 193;
                        this.expression(22);
                        }
                        break;
                    case 5:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 194;
                        if (!(this.precpred(this.context, 20))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 20)");
                        }
                        this.state = 195;
                        this.match(LPCParser.MOD);
                        this.state = 196;
                        this.expression(21);
                        }
                        break;
                    case 6:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 197;
                        if (!(this.precpred(this.context, 19))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 19)");
                        }
                        this.state = 198;
                        this.match(LPCParser.LT);
                        this.state = 199;
                        this.expression(20);
                        }
                        break;
                    case 7:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 200;
                        if (!(this.precpred(this.context, 18))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 18)");
                        }
                        this.state = 201;
                        this.match(LPCParser.GT);
                        this.state = 202;
                        this.expression(19);
                        }
                        break;
                    case 8:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 203;
                        if (!(this.precpred(this.context, 17))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 17)");
                        }
                        this.state = 204;
                        this.match(LPCParser.LE);
                        this.state = 205;
                        this.expression(18);
                        }
                        break;
                    case 9:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 206;
                        if (!(this.precpred(this.context, 16))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 16)");
                        }
                        this.state = 207;
                        this.match(LPCParser.GE);
                        this.state = 208;
                        this.expression(17);
                        }
                        break;
                    case 10:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 209;
                        if (!(this.precpred(this.context, 15))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 15)");
                        }
                        this.state = 210;
                        this.match(LPCParser.EQ);
                        this.state = 211;
                        this.expression(16);
                        }
                        break;
                    case 11:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 212;
                        if (!(this.precpred(this.context, 14))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 14)");
                        }
                        this.state = 213;
                        this.match(LPCParser.NE);
                        this.state = 214;
                        this.expression(15);
                        }
                        break;
                    case 12:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 215;
                        if (!(this.precpred(this.context, 13))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 13)");
                        }
                        this.state = 216;
                        this.match(LPCParser.AND);
                        this.state = 217;
                        this.expression(14);
                        }
                        break;
                    case 13:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 218;
                        if (!(this.precpred(this.context, 12))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 12)");
                        }
                        this.state = 219;
                        this.match(LPCParser.OR);
                        this.state = 220;
                        this.expression(13);
                        }
                        break;
                    case 14:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 221;
                        if (!(this.precpred(this.context, 11))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 11)");
                        }
                        this.state = 222;
                        this.match(LPCParser.XOR);
                        this.state = 223;
                        this.expression(12);
                        }
                        break;
                    case 15:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 224;
                        if (!(this.precpred(this.context, 10))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 10)");
                        }
                        this.state = 225;
                        this.match(LPCParser.AND_AND);
                        this.state = 226;
                        this.expression(11);
                        }
                        break;
                    case 16:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 227;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 228;
                        this.match(LPCParser.OR_OR);
                        this.state = 229;
                        this.expression(10);
                        }
                        break;
                    case 17:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 230;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 231;
                        this.match(LPCParser.QUESTION);
                        this.state = 232;
                        this.expression(0);
                        this.state = 233;
                        this.match(LPCParser.COLON);
                        this.state = 234;
                        this.expression(9);
                        }
                        break;
                    case 18:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 236;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 237;
                        this.match(LPCParser.INC);
                        }
                        break;
                    case 19:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 238;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 239;
                        this.match(LPCParser.DEC);
                        }
                        break;
                    }
                    }
                }
                this.state = 244;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
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
        this.enterRule(localContext, 28, LPCParser.RULE_expressionList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 245;
            this.expression(0);
            this.state = 250;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 60) {
                {
                {
                this.state = 246;
                this.match(LPCParser.COMMA);
                this.state = 247;
                this.expression(0);
                }
                }
                this.state = 252;
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
        case 13:
            return this.expression_sempred(localContext as ExpressionContext, predIndex);
        }
        return true;
    }
    private expression_sempred(localContext: ExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 24);
        case 1:
            return this.precpred(this.context, 23);
        case 2:
            return this.precpred(this.context, 22);
        case 3:
            return this.precpred(this.context, 21);
        case 4:
            return this.precpred(this.context, 20);
        case 5:
            return this.precpred(this.context, 19);
        case 6:
            return this.precpred(this.context, 18);
        case 7:
            return this.precpred(this.context, 17);
        case 8:
            return this.precpred(this.context, 16);
        case 9:
            return this.precpred(this.context, 15);
        case 10:
            return this.precpred(this.context, 14);
        case 11:
            return this.precpred(this.context, 13);
        case 12:
            return this.precpred(this.context, 12);
        case 13:
            return this.precpred(this.context, 11);
        case 14:
            return this.precpred(this.context, 10);
        case 15:
            return this.precpred(this.context, 9);
        case 16:
            return this.precpred(this.context, 8);
        case 17:
            return this.precpred(this.context, 4);
        case 18:
            return this.precpred(this.context, 3);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,68,254,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,1,0,5,0,32,8,0,10,0,12,0,35,9,0,1,0,1,0,1,1,1,1,3,1,41,
        8,1,1,2,3,2,44,8,2,1,2,1,2,1,2,3,2,49,8,2,1,2,1,2,1,2,1,3,1,3,1,
        3,5,3,57,8,3,10,3,12,3,60,9,3,1,4,1,4,1,4,1,5,1,5,1,5,1,5,3,5,69,
        8,5,1,5,1,5,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,7,3,7,81,8,7,1,8,3,8,84,
        8,8,1,8,1,8,1,9,1,9,5,9,90,8,9,10,9,12,9,93,9,9,1,9,1,9,1,10,1,10,
        1,10,1,10,1,10,1,10,1,10,3,10,104,8,10,1,10,1,10,1,10,1,10,1,10,
        1,10,3,10,112,8,10,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,
        1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,3,11,131,8,11,1,11,1,11,
        3,11,135,8,11,1,11,1,11,3,11,139,8,11,1,11,1,11,3,11,143,8,11,1,
        12,1,12,1,12,1,12,1,12,1,12,3,12,151,8,12,1,12,3,12,154,8,12,1,13,
        1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,
        1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,3,13,178,8,13,1,13,3,13,
        181,8,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,
        1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,
        1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,
        1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,
        1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,5,13,241,8,13,10,13,12,13,
        244,9,13,1,14,1,14,1,14,5,14,249,8,14,10,14,12,14,252,9,14,1,14,
        0,1,26,15,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,0,1,3,0,9,9,20,
        21,33,33,292,0,33,1,0,0,0,2,40,1,0,0,0,4,43,1,0,0,0,6,53,1,0,0,0,
        8,61,1,0,0,0,10,64,1,0,0,0,12,72,1,0,0,0,14,80,1,0,0,0,16,83,1,0,
        0,0,18,87,1,0,0,0,20,111,1,0,0,0,22,142,1,0,0,0,24,153,1,0,0,0,26,
        180,1,0,0,0,28,245,1,0,0,0,30,32,3,2,1,0,31,30,1,0,0,0,32,35,1,0,
        0,0,33,31,1,0,0,0,33,34,1,0,0,0,34,36,1,0,0,0,35,33,1,0,0,0,36,37,
        5,0,0,1,37,1,1,0,0,0,38,41,3,4,2,0,39,41,3,10,5,0,40,38,1,0,0,0,
        40,39,1,0,0,0,41,3,1,0,0,0,42,44,3,12,6,0,43,42,1,0,0,0,43,44,1,
        0,0,0,44,45,1,0,0,0,45,46,5,65,0,0,46,48,5,1,0,0,47,49,3,6,3,0,48,
        47,1,0,0,0,48,49,1,0,0,0,49,50,1,0,0,0,50,51,5,2,0,0,51,52,3,18,
        9,0,52,5,1,0,0,0,53,58,3,8,4,0,54,55,5,60,0,0,55,57,3,8,4,0,56,54,
        1,0,0,0,57,60,1,0,0,0,58,56,1,0,0,0,58,59,1,0,0,0,59,7,1,0,0,0,60,
        58,1,0,0,0,61,62,3,12,6,0,62,63,5,65,0,0,63,9,1,0,0,0,64,65,3,12,
        6,0,65,68,5,65,0,0,66,67,5,3,0,0,67,69,3,26,13,0,68,66,1,0,0,0,68,
        69,1,0,0,0,69,70,1,0,0,0,70,71,5,59,0,0,71,11,1,0,0,0,72,73,7,0,
        0,0,73,13,1,0,0,0,74,81,3,16,8,0,75,81,3,18,9,0,76,81,3,20,10,0,
        77,81,3,22,11,0,78,81,3,24,12,0,79,81,3,10,5,0,80,74,1,0,0,0,80,
        75,1,0,0,0,80,76,1,0,0,0,80,77,1,0,0,0,80,78,1,0,0,0,80,79,1,0,0,
        0,81,15,1,0,0,0,82,84,3,26,13,0,83,82,1,0,0,0,83,84,1,0,0,0,84,85,
        1,0,0,0,85,86,5,59,0,0,86,17,1,0,0,0,87,91,5,4,0,0,88,90,3,14,7,
        0,89,88,1,0,0,0,90,93,1,0,0,0,91,89,1,0,0,0,91,92,1,0,0,0,92,94,
        1,0,0,0,93,91,1,0,0,0,94,95,5,5,0,0,95,19,1,0,0,0,96,97,5,19,0,0,
        97,98,5,1,0,0,98,99,3,26,13,0,99,100,5,2,0,0,100,103,3,14,7,0,101,
        102,5,14,0,0,102,104,3,14,7,0,103,101,1,0,0,0,103,104,1,0,0,0,104,
        112,1,0,0,0,105,106,5,29,0,0,106,107,5,1,0,0,107,108,3,26,13,0,108,
        109,5,2,0,0,109,110,3,14,7,0,110,112,1,0,0,0,111,96,1,0,0,0,111,
        105,1,0,0,0,112,21,1,0,0,0,113,114,5,35,0,0,114,115,5,1,0,0,115,
        116,3,26,13,0,116,117,5,2,0,0,117,118,3,14,7,0,118,143,1,0,0,0,119,
        120,5,13,0,0,120,121,3,14,7,0,121,122,5,35,0,0,122,123,5,1,0,0,123,
        124,3,26,13,0,124,125,5,2,0,0,125,126,5,59,0,0,126,143,1,0,0,0,127,
        128,5,17,0,0,128,130,5,1,0,0,129,131,3,26,13,0,130,129,1,0,0,0,130,
        131,1,0,0,0,131,132,1,0,0,0,132,134,5,59,0,0,133,135,3,26,13,0,134,
        133,1,0,0,0,134,135,1,0,0,0,135,136,1,0,0,0,136,138,5,59,0,0,137,
        139,3,26,13,0,138,137,1,0,0,0,138,139,1,0,0,0,139,140,1,0,0,0,140,
        141,5,2,0,0,141,143,3,14,7,0,142,113,1,0,0,0,142,119,1,0,0,0,142,
        127,1,0,0,0,143,23,1,0,0,0,144,145,5,7,0,0,145,154,5,59,0,0,146,
        147,5,11,0,0,147,154,5,59,0,0,148,150,5,23,0,0,149,151,3,26,13,0,
        150,149,1,0,0,0,150,151,1,0,0,0,151,152,1,0,0,0,152,154,5,59,0,0,
        153,144,1,0,0,0,153,146,1,0,0,0,153,148,1,0,0,0,154,25,1,0,0,0,155,
        156,6,13,-1,0,156,181,5,65,0,0,157,181,5,61,0,0,158,181,5,62,0,0,
        159,181,5,63,0,0,160,181,5,64,0,0,161,162,5,1,0,0,162,163,3,26,13,
        0,163,164,5,2,0,0,164,181,1,0,0,0,165,166,5,54,0,0,166,181,3,26,
        13,7,167,168,5,41,0,0,168,181,3,26,13,6,169,170,5,42,0,0,170,181,
        3,26,13,5,171,172,5,65,0,0,172,173,5,3,0,0,173,181,3,26,13,2,174,
        175,5,65,0,0,175,177,5,1,0,0,176,178,3,28,14,0,177,176,1,0,0,0,177,
        178,1,0,0,0,178,179,1,0,0,0,179,181,5,2,0,0,180,155,1,0,0,0,180,
        157,1,0,0,0,180,158,1,0,0,0,180,159,1,0,0,0,180,160,1,0,0,0,180,
        161,1,0,0,0,180,165,1,0,0,0,180,167,1,0,0,0,180,169,1,0,0,0,180,
        171,1,0,0,0,180,174,1,0,0,0,181,242,1,0,0,0,182,183,10,24,0,0,183,
        184,5,36,0,0,184,241,3,26,13,25,185,186,10,23,0,0,186,187,5,37,0,
        0,187,241,3,26,13,24,188,189,10,22,0,0,189,190,5,38,0,0,190,241,
        3,26,13,23,191,192,10,21,0,0,192,193,5,39,0,0,193,241,3,26,13,22,
        194,195,10,20,0,0,195,196,5,40,0,0,196,241,3,26,13,21,197,198,10,
        19,0,0,198,199,5,45,0,0,199,241,3,26,13,20,200,201,10,18,0,0,201,
        202,5,46,0,0,202,241,3,26,13,19,203,204,10,17,0,0,204,205,5,47,0,
        0,205,241,3,26,13,18,206,207,10,16,0,0,207,208,5,48,0,0,208,241,
        3,26,13,17,209,210,10,15,0,0,210,211,5,49,0,0,211,241,3,26,13,16,
        212,213,10,14,0,0,213,214,5,50,0,0,214,241,3,26,13,15,215,216,10,
        13,0,0,216,217,5,51,0,0,217,241,3,26,13,14,218,219,10,12,0,0,219,
        220,5,52,0,0,220,241,3,26,13,13,221,222,10,11,0,0,222,223,5,53,0,
        0,223,241,3,26,13,12,224,225,10,10,0,0,225,226,5,55,0,0,226,241,
        3,26,13,11,227,228,10,9,0,0,228,229,5,56,0,0,229,241,3,26,13,10,
        230,231,10,8,0,0,231,232,5,57,0,0,232,233,3,26,13,0,233,234,5,58,
        0,0,234,235,3,26,13,9,235,241,1,0,0,0,236,237,10,4,0,0,237,241,5,
        41,0,0,238,239,10,3,0,0,239,241,5,42,0,0,240,182,1,0,0,0,240,185,
        1,0,0,0,240,188,1,0,0,0,240,191,1,0,0,0,240,194,1,0,0,0,240,197,
        1,0,0,0,240,200,1,0,0,0,240,203,1,0,0,0,240,206,1,0,0,0,240,209,
        1,0,0,0,240,212,1,0,0,0,240,215,1,0,0,0,240,218,1,0,0,0,240,221,
        1,0,0,0,240,224,1,0,0,0,240,227,1,0,0,0,240,230,1,0,0,0,240,236,
        1,0,0,0,240,238,1,0,0,0,241,244,1,0,0,0,242,240,1,0,0,0,242,243,
        1,0,0,0,243,27,1,0,0,0,244,242,1,0,0,0,245,250,3,26,13,0,246,247,
        5,60,0,0,247,249,3,26,13,0,248,246,1,0,0,0,249,252,1,0,0,0,250,248,
        1,0,0,0,250,251,1,0,0,0,251,29,1,0,0,0,252,250,1,0,0,0,22,33,40,
        43,48,58,68,80,83,91,103,111,130,134,138,142,150,153,177,180,240,
        242,250
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
    public typeSpecifier(): TypeSpecifierContext {
        return this.getRuleContext(0, TypeSpecifierContext)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
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
    public LONG(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.LONG, 0);
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
    public IF(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.IF, 0);
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
    public SWITCH(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.SWITCH, 0);
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

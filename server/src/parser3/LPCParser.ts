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
        "iterationStatement", "jumpStatement", "expression",
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
            this.state = 31;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 9)) & ~0x1F) === 0 && ((1 << (_la - 9)) & 16783361) !== 0) || _la === 65) {
                {
                {
                this.state = 28;
                this.declaration();
                }
                }
                this.state = 33;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 34;
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
            this.state = 38;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 36;
                this.functionDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 37;
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
            this.state = 41;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 9)) & ~0x1F) === 0 && ((1 << (_la - 9)) & 16783361) !== 0)) {
                {
                this.state = 40;
                this.typeSpecifier();
                }
            }

            this.state = 43;
            this.match(LPCParser.Identifier);
            this.state = 44;
            this.match(LPCParser.T__0);
            this.state = 46;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 9)) & ~0x1F) === 0 && ((1 << (_la - 9)) & 16783361) !== 0)) {
                {
                this.state = 45;
                this.parameterList();
                }
            }

            this.state = 48;
            this.match(LPCParser.T__1);
            this.state = 49;
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
            this.state = 51;
            this.parameter();
            this.state = 56;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 60) {
                {
                {
                this.state = 52;
                this.match(LPCParser.COMMA);
                this.state = 53;
                this.parameter();
                }
                }
                this.state = 58;
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
            this.state = 59;
            this.typeSpecifier();
            this.state = 60;
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
            this.state = 62;
            this.typeSpecifier();
            this.state = 63;
            this.match(LPCParser.Identifier);
            this.state = 66;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 3) {
                {
                this.state = 64;
                this.match(LPCParser.T__2);
                this.state = 65;
                this.expression(0);
                }
            }

            this.state = 68;
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
            this.state = 70;
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
            this.state = 78;
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
                this.state = 72;
                this.expressionStatement();
                }
                break;
            case LPCParser.T__3:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 73;
                this.compoundStatement();
                }
                break;
            case LPCParser.IF:
            case LPCParser.SWITCH:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 74;
                this.selectionStatement();
                }
                break;
            case LPCParser.DO:
            case LPCParser.FOR:
            case LPCParser.WHILE:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 75;
                this.iterationStatement();
                }
                break;
            case LPCParser.BREAK:
            case LPCParser.CONTINUE:
            case LPCParser.RETURN:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 76;
                this.jumpStatement();
                }
                break;
            case LPCParser.CHAR:
            case LPCParser.INT:
            case LPCParser.LONG:
            case LPCParser.VOID:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 77;
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
            this.state = 81;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 32514051) !== 0)) {
                {
                this.state = 80;
                this.expression(0);
                }
            }

            this.state = 83;
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
            this.state = 85;
            this.match(LPCParser.T__3);
            this.state = 89;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 549071506) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 4095738629) !== 0) || _la === 65) {
                {
                {
                this.state = 86;
                this.statement();
                }
                }
                this.state = 91;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 92;
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
            this.state = 109;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.IF:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 94;
                this.match(LPCParser.IF);
                this.state = 95;
                this.match(LPCParser.T__0);
                this.state = 96;
                this.expression(0);
                this.state = 97;
                this.match(LPCParser.T__1);
                this.state = 98;
                this.statement();
                this.state = 101;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
                case 1:
                    {
                    this.state = 99;
                    this.match(LPCParser.ELSE);
                    this.state = 100;
                    this.statement();
                    }
                    break;
                }
                }
                break;
            case LPCParser.SWITCH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 103;
                this.match(LPCParser.SWITCH);
                this.state = 104;
                this.match(LPCParser.T__0);
                this.state = 105;
                this.expression(0);
                this.state = 106;
                this.match(LPCParser.T__1);
                this.state = 107;
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
            this.state = 140;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.WHILE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 111;
                this.match(LPCParser.WHILE);
                this.state = 112;
                this.match(LPCParser.T__0);
                this.state = 113;
                this.expression(0);
                this.state = 114;
                this.match(LPCParser.T__1);
                this.state = 115;
                this.statement();
                }
                break;
            case LPCParser.DO:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 117;
                this.match(LPCParser.DO);
                this.state = 118;
                this.statement();
                this.state = 119;
                this.match(LPCParser.WHILE);
                this.state = 120;
                this.match(LPCParser.T__0);
                this.state = 121;
                this.expression(0);
                this.state = 122;
                this.match(LPCParser.T__1);
                this.state = 123;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.FOR:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 125;
                this.match(LPCParser.FOR);
                this.state = 126;
                this.match(LPCParser.T__0);
                this.state = 128;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 32514051) !== 0)) {
                    {
                    this.state = 127;
                    this.expression(0);
                    }
                }

                this.state = 130;
                this.match(LPCParser.SEMI);
                this.state = 132;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 32514051) !== 0)) {
                    {
                    this.state = 131;
                    this.expression(0);
                    }
                }

                this.state = 134;
                this.match(LPCParser.SEMI);
                this.state = 136;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 32514051) !== 0)) {
                    {
                    this.state = 135;
                    this.expression(0);
                    }
                }

                this.state = 138;
                this.match(LPCParser.T__1);
                this.state = 139;
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
            this.state = 151;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BREAK:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 142;
                this.match(LPCParser.BREAK);
                this.state = 143;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.CONTINUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 144;
                this.match(LPCParser.CONTINUE);
                this.state = 145;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.RETURN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 146;
                this.match(LPCParser.RETURN);
                this.state = 148;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 32514051) !== 0)) {
                    {
                    this.state = 147;
                    this.expression(0);
                    }
                }

                this.state = 150;
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
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 172;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context) ) {
            case 1:
                {
                this.state = 154;
                this.match(LPCParser.Identifier);
                }
                break;
            case 2:
                {
                this.state = 155;
                this.match(LPCParser.IntegerConstant);
                }
                break;
            case 3:
                {
                this.state = 156;
                this.match(LPCParser.FloatingConstant);
                }
                break;
            case 4:
                {
                this.state = 157;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case 5:
                {
                this.state = 158;
                this.match(LPCParser.CharacterConstant);
                }
                break;
            case 6:
                {
                this.state = 159;
                this.match(LPCParser.T__0);
                this.state = 160;
                this.expression(0);
                this.state = 161;
                this.match(LPCParser.T__1);
                }
                break;
            case 7:
                {
                this.state = 163;
                this.match(LPCParser.NOT);
                this.state = 164;
                this.expression(6);
                }
                break;
            case 8:
                {
                this.state = 165;
                this.match(LPCParser.INC);
                this.state = 166;
                this.expression(5);
                }
                break;
            case 9:
                {
                this.state = 167;
                this.match(LPCParser.DEC);
                this.state = 168;
                this.expression(4);
                }
                break;
            case 10:
                {
                this.state = 169;
                this.match(LPCParser.Identifier);
                this.state = 170;
                this.match(LPCParser.T__2);
                this.state = 171;
                this.expression(1);
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 234;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 19, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 232;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 18, this.context) ) {
                    case 1:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 174;
                        if (!(this.precpred(this.context, 23))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 23)");
                        }
                        this.state = 175;
                        this.match(LPCParser.PLUS);
                        this.state = 176;
                        this.expression(24);
                        }
                        break;
                    case 2:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 177;
                        if (!(this.precpred(this.context, 22))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 22)");
                        }
                        this.state = 178;
                        this.match(LPCParser.MINUS);
                        this.state = 179;
                        this.expression(23);
                        }
                        break;
                    case 3:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 180;
                        if (!(this.precpred(this.context, 21))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 21)");
                        }
                        this.state = 181;
                        this.match(LPCParser.STAR);
                        this.state = 182;
                        this.expression(22);
                        }
                        break;
                    case 4:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 183;
                        if (!(this.precpred(this.context, 20))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 20)");
                        }
                        this.state = 184;
                        this.match(LPCParser.DIV);
                        this.state = 185;
                        this.expression(21);
                        }
                        break;
                    case 5:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 186;
                        if (!(this.precpred(this.context, 19))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 19)");
                        }
                        this.state = 187;
                        this.match(LPCParser.MOD);
                        this.state = 188;
                        this.expression(20);
                        }
                        break;
                    case 6:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 189;
                        if (!(this.precpred(this.context, 18))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 18)");
                        }
                        this.state = 190;
                        this.match(LPCParser.LT);
                        this.state = 191;
                        this.expression(19);
                        }
                        break;
                    case 7:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 192;
                        if (!(this.precpred(this.context, 17))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 17)");
                        }
                        this.state = 193;
                        this.match(LPCParser.GT);
                        this.state = 194;
                        this.expression(18);
                        }
                        break;
                    case 8:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 195;
                        if (!(this.precpred(this.context, 16))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 16)");
                        }
                        this.state = 196;
                        this.match(LPCParser.LE);
                        this.state = 197;
                        this.expression(17);
                        }
                        break;
                    case 9:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 198;
                        if (!(this.precpred(this.context, 15))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 15)");
                        }
                        this.state = 199;
                        this.match(LPCParser.GE);
                        this.state = 200;
                        this.expression(16);
                        }
                        break;
                    case 10:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 201;
                        if (!(this.precpred(this.context, 14))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 14)");
                        }
                        this.state = 202;
                        this.match(LPCParser.EQ);
                        this.state = 203;
                        this.expression(15);
                        }
                        break;
                    case 11:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 204;
                        if (!(this.precpred(this.context, 13))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 13)");
                        }
                        this.state = 205;
                        this.match(LPCParser.NE);
                        this.state = 206;
                        this.expression(14);
                        }
                        break;
                    case 12:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 207;
                        if (!(this.precpred(this.context, 12))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 12)");
                        }
                        this.state = 208;
                        this.match(LPCParser.AND);
                        this.state = 209;
                        this.expression(13);
                        }
                        break;
                    case 13:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 210;
                        if (!(this.precpred(this.context, 11))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 11)");
                        }
                        this.state = 211;
                        this.match(LPCParser.OR);
                        this.state = 212;
                        this.expression(12);
                        }
                        break;
                    case 14:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 213;
                        if (!(this.precpred(this.context, 10))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 10)");
                        }
                        this.state = 214;
                        this.match(LPCParser.XOR);
                        this.state = 215;
                        this.expression(11);
                        }
                        break;
                    case 15:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 216;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 217;
                        this.match(LPCParser.AND_AND);
                        this.state = 218;
                        this.expression(10);
                        }
                        break;
                    case 16:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 219;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 220;
                        this.match(LPCParser.OR_OR);
                        this.state = 221;
                        this.expression(9);
                        }
                        break;
                    case 17:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 222;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 223;
                        this.match(LPCParser.QUESTION);
                        this.state = 224;
                        this.expression(0);
                        this.state = 225;
                        this.match(LPCParser.COLON);
                        this.state = 226;
                        this.expression(8);
                        }
                        break;
                    case 18:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 228;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 229;
                        this.match(LPCParser.INC);
                        }
                        break;
                    case 19:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 230;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 231;
                        this.match(LPCParser.DEC);
                        }
                        break;
                    }
                    }
                }
                this.state = 236;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 19, this.context);
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
            return this.precpred(this.context, 23);
        case 1:
            return this.precpred(this.context, 22);
        case 2:
            return this.precpred(this.context, 21);
        case 3:
            return this.precpred(this.context, 20);
        case 4:
            return this.precpred(this.context, 19);
        case 5:
            return this.precpred(this.context, 18);
        case 6:
            return this.precpred(this.context, 17);
        case 7:
            return this.precpred(this.context, 16);
        case 8:
            return this.precpred(this.context, 15);
        case 9:
            return this.precpred(this.context, 14);
        case 10:
            return this.precpred(this.context, 13);
        case 11:
            return this.precpred(this.context, 12);
        case 12:
            return this.precpred(this.context, 11);
        case 13:
            return this.precpred(this.context, 10);
        case 14:
            return this.precpred(this.context, 9);
        case 15:
            return this.precpred(this.context, 8);
        case 16:
            return this.precpred(this.context, 7);
        case 17:
            return this.precpred(this.context, 3);
        case 18:
            return this.precpred(this.context, 2);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,68,238,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        1,0,5,0,30,8,0,10,0,12,0,33,9,0,1,0,1,0,1,1,1,1,3,1,39,8,1,1,2,3,
        2,42,8,2,1,2,1,2,1,2,3,2,47,8,2,1,2,1,2,1,2,1,3,1,3,1,3,5,3,55,8,
        3,10,3,12,3,58,9,3,1,4,1,4,1,4,1,5,1,5,1,5,1,5,3,5,67,8,5,1,5,1,
        5,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,7,3,7,79,8,7,1,8,3,8,82,8,8,1,8,
        1,8,1,9,1,9,5,9,88,8,9,10,9,12,9,91,9,9,1,9,1,9,1,10,1,10,1,10,1,
        10,1,10,1,10,1,10,3,10,102,8,10,1,10,1,10,1,10,1,10,1,10,1,10,3,
        10,110,8,10,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,
        11,1,11,1,11,1,11,1,11,1,11,1,11,3,11,129,8,11,1,11,1,11,3,11,133,
        8,11,1,11,1,11,3,11,137,8,11,1,11,1,11,3,11,141,8,11,1,12,1,12,1,
        12,1,12,1,12,1,12,3,12,149,8,12,1,12,3,12,152,8,12,1,13,1,13,1,13,
        1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,
        1,13,1,13,1,13,3,13,173,8,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,
        1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,
        1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,
        1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,
        1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,5,13,
        233,8,13,10,13,12,13,236,9,13,1,13,0,1,26,14,0,2,4,6,8,10,12,14,
        16,18,20,22,24,26,0,1,3,0,9,9,20,21,33,33,274,0,31,1,0,0,0,2,38,
        1,0,0,0,4,41,1,0,0,0,6,51,1,0,0,0,8,59,1,0,0,0,10,62,1,0,0,0,12,
        70,1,0,0,0,14,78,1,0,0,0,16,81,1,0,0,0,18,85,1,0,0,0,20,109,1,0,
        0,0,22,140,1,0,0,0,24,151,1,0,0,0,26,172,1,0,0,0,28,30,3,2,1,0,29,
        28,1,0,0,0,30,33,1,0,0,0,31,29,1,0,0,0,31,32,1,0,0,0,32,34,1,0,0,
        0,33,31,1,0,0,0,34,35,5,0,0,1,35,1,1,0,0,0,36,39,3,4,2,0,37,39,3,
        10,5,0,38,36,1,0,0,0,38,37,1,0,0,0,39,3,1,0,0,0,40,42,3,12,6,0,41,
        40,1,0,0,0,41,42,1,0,0,0,42,43,1,0,0,0,43,44,5,65,0,0,44,46,5,1,
        0,0,45,47,3,6,3,0,46,45,1,0,0,0,46,47,1,0,0,0,47,48,1,0,0,0,48,49,
        5,2,0,0,49,50,3,18,9,0,50,5,1,0,0,0,51,56,3,8,4,0,52,53,5,60,0,0,
        53,55,3,8,4,0,54,52,1,0,0,0,55,58,1,0,0,0,56,54,1,0,0,0,56,57,1,
        0,0,0,57,7,1,0,0,0,58,56,1,0,0,0,59,60,3,12,6,0,60,61,5,65,0,0,61,
        9,1,0,0,0,62,63,3,12,6,0,63,66,5,65,0,0,64,65,5,3,0,0,65,67,3,26,
        13,0,66,64,1,0,0,0,66,67,1,0,0,0,67,68,1,0,0,0,68,69,5,59,0,0,69,
        11,1,0,0,0,70,71,7,0,0,0,71,13,1,0,0,0,72,79,3,16,8,0,73,79,3,18,
        9,0,74,79,3,20,10,0,75,79,3,22,11,0,76,79,3,24,12,0,77,79,3,10,5,
        0,78,72,1,0,0,0,78,73,1,0,0,0,78,74,1,0,0,0,78,75,1,0,0,0,78,76,
        1,0,0,0,78,77,1,0,0,0,79,15,1,0,0,0,80,82,3,26,13,0,81,80,1,0,0,
        0,81,82,1,0,0,0,82,83,1,0,0,0,83,84,5,59,0,0,84,17,1,0,0,0,85,89,
        5,4,0,0,86,88,3,14,7,0,87,86,1,0,0,0,88,91,1,0,0,0,89,87,1,0,0,0,
        89,90,1,0,0,0,90,92,1,0,0,0,91,89,1,0,0,0,92,93,5,5,0,0,93,19,1,
        0,0,0,94,95,5,19,0,0,95,96,5,1,0,0,96,97,3,26,13,0,97,98,5,2,0,0,
        98,101,3,14,7,0,99,100,5,14,0,0,100,102,3,14,7,0,101,99,1,0,0,0,
        101,102,1,0,0,0,102,110,1,0,0,0,103,104,5,29,0,0,104,105,5,1,0,0,
        105,106,3,26,13,0,106,107,5,2,0,0,107,108,3,14,7,0,108,110,1,0,0,
        0,109,94,1,0,0,0,109,103,1,0,0,0,110,21,1,0,0,0,111,112,5,35,0,0,
        112,113,5,1,0,0,113,114,3,26,13,0,114,115,5,2,0,0,115,116,3,14,7,
        0,116,141,1,0,0,0,117,118,5,13,0,0,118,119,3,14,7,0,119,120,5,35,
        0,0,120,121,5,1,0,0,121,122,3,26,13,0,122,123,5,2,0,0,123,124,5,
        59,0,0,124,141,1,0,0,0,125,126,5,17,0,0,126,128,5,1,0,0,127,129,
        3,26,13,0,128,127,1,0,0,0,128,129,1,0,0,0,129,130,1,0,0,0,130,132,
        5,59,0,0,131,133,3,26,13,0,132,131,1,0,0,0,132,133,1,0,0,0,133,134,
        1,0,0,0,134,136,5,59,0,0,135,137,3,26,13,0,136,135,1,0,0,0,136,137,
        1,0,0,0,137,138,1,0,0,0,138,139,5,2,0,0,139,141,3,14,7,0,140,111,
        1,0,0,0,140,117,1,0,0,0,140,125,1,0,0,0,141,23,1,0,0,0,142,143,5,
        7,0,0,143,152,5,59,0,0,144,145,5,11,0,0,145,152,5,59,0,0,146,148,
        5,23,0,0,147,149,3,26,13,0,148,147,1,0,0,0,148,149,1,0,0,0,149,150,
        1,0,0,0,150,152,5,59,0,0,151,142,1,0,0,0,151,144,1,0,0,0,151,146,
        1,0,0,0,152,25,1,0,0,0,153,154,6,13,-1,0,154,173,5,65,0,0,155,173,
        5,61,0,0,156,173,5,62,0,0,157,173,5,63,0,0,158,173,5,64,0,0,159,
        160,5,1,0,0,160,161,3,26,13,0,161,162,5,2,0,0,162,173,1,0,0,0,163,
        164,5,54,0,0,164,173,3,26,13,6,165,166,5,41,0,0,166,173,3,26,13,
        5,167,168,5,42,0,0,168,173,3,26,13,4,169,170,5,65,0,0,170,171,5,
        3,0,0,171,173,3,26,13,1,172,153,1,0,0,0,172,155,1,0,0,0,172,156,
        1,0,0,0,172,157,1,0,0,0,172,158,1,0,0,0,172,159,1,0,0,0,172,163,
        1,0,0,0,172,165,1,0,0,0,172,167,1,0,0,0,172,169,1,0,0,0,173,234,
        1,0,0,0,174,175,10,23,0,0,175,176,5,36,0,0,176,233,3,26,13,24,177,
        178,10,22,0,0,178,179,5,37,0,0,179,233,3,26,13,23,180,181,10,21,
        0,0,181,182,5,38,0,0,182,233,3,26,13,22,183,184,10,20,0,0,184,185,
        5,39,0,0,185,233,3,26,13,21,186,187,10,19,0,0,187,188,5,40,0,0,188,
        233,3,26,13,20,189,190,10,18,0,0,190,191,5,45,0,0,191,233,3,26,13,
        19,192,193,10,17,0,0,193,194,5,46,0,0,194,233,3,26,13,18,195,196,
        10,16,0,0,196,197,5,47,0,0,197,233,3,26,13,17,198,199,10,15,0,0,
        199,200,5,48,0,0,200,233,3,26,13,16,201,202,10,14,0,0,202,203,5,
        49,0,0,203,233,3,26,13,15,204,205,10,13,0,0,205,206,5,50,0,0,206,
        233,3,26,13,14,207,208,10,12,0,0,208,209,5,51,0,0,209,233,3,26,13,
        13,210,211,10,11,0,0,211,212,5,52,0,0,212,233,3,26,13,12,213,214,
        10,10,0,0,214,215,5,53,0,0,215,233,3,26,13,11,216,217,10,9,0,0,217,
        218,5,55,0,0,218,233,3,26,13,10,219,220,10,8,0,0,220,221,5,56,0,
        0,221,233,3,26,13,9,222,223,10,7,0,0,223,224,5,57,0,0,224,225,3,
        26,13,0,225,226,5,58,0,0,226,227,3,26,13,8,227,233,1,0,0,0,228,229,
        10,3,0,0,229,233,5,41,0,0,230,231,10,2,0,0,231,233,5,42,0,0,232,
        174,1,0,0,0,232,177,1,0,0,0,232,180,1,0,0,0,232,183,1,0,0,0,232,
        186,1,0,0,0,232,189,1,0,0,0,232,192,1,0,0,0,232,195,1,0,0,0,232,
        198,1,0,0,0,232,201,1,0,0,0,232,204,1,0,0,0,232,207,1,0,0,0,232,
        210,1,0,0,0,232,213,1,0,0,0,232,216,1,0,0,0,232,219,1,0,0,0,232,
        222,1,0,0,0,232,228,1,0,0,0,232,230,1,0,0,0,233,236,1,0,0,0,234,
        232,1,0,0,0,234,235,1,0,0,0,235,27,1,0,0,0,236,234,1,0,0,0,20,31,
        38,41,46,56,66,78,81,89,101,109,128,132,136,140,148,151,172,232,
        234
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

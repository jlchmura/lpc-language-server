// Generated from grammar/LPCPreprocessorParser.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { LPCPreprocessorParserListener } from "./LPCPreprocessorParserListener.js";
import { LPCPreprocessorParserVisitor } from "./LPCPreprocessorParserVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class LPCPreprocessorParser extends antlr.Parser {
    public static readonly SHARP = 1;
    public static readonly CODE = 2;
    public static readonly INCLUDE = 3;
    public static readonly PRAGMA = 4;
    public static readonly DEFINE = 5;
    public static readonly DEFINED = 6;
    public static readonly IF = 7;
    public static readonly ELIF = 8;
    public static readonly ELSE = 9;
    public static readonly UNDEF = 10;
    public static readonly IFDEF = 11;
    public static readonly IFNDEF = 12;
    public static readonly ENDIF = 13;
    public static readonly BANG = 14;
    public static readonly LPAREN = 15;
    public static readonly RPAREN = 16;
    public static readonly EQUAL = 17;
    public static readonly NOTEQUAL = 18;
    public static readonly AND = 19;
    public static readonly OR = 20;
    public static readonly LT = 21;
    public static readonly GT = 22;
    public static readonly LE = 23;
    public static readonly GE = 24;
    public static readonly STAR = 25;
    public static readonly DIRECTIVE_WHITESPACES = 26;
    public static readonly DIRECTIVE_STRING = 27;
    public static readonly CONDITIONAL_SYMBOL = 28;
    public static readonly DECIMAL_LITERAL = 29;
    public static readonly FLOAT = 30;
    public static readonly NEW_LINE = 31;
    public static readonly DIRECITVE_COMMENT = 32;
    public static readonly DIRECITVE_LINE_COMMENT = 33;
    public static readonly DIRECITVE_NEW_LINE = 34;
    public static readonly DIRECITVE_TEXT_NEW_LINE = 35;
    public static readonly TEXT = 36;
    public static readonly SLASH = 37;
    public static readonly RULE_lpcDocument = 0;
    public static readonly RULE_text = 1;
    public static readonly RULE_code = 2;
    public static readonly RULE_directive = 3;
    public static readonly RULE_directive_text = 4;
    public static readonly RULE_preprocessor_expression = 5;

    public static readonly literalNames = [
        null, "'#'", null, null, "'pragma'", null, "'defined'", "'if'", 
        "'elif'", "'else'", "'undef'", "'ifdef'", "'ifndef'", "'endif'", 
        "'!'", "'('", "')'", "'=='", "'!='", "'&&'", "'||'", "'<'", "'>'", 
        "'<='", "'>='", "'*'"
    ];

    public static readonly symbolicNames = [
        null, "SHARP", "CODE", "INCLUDE", "PRAGMA", "DEFINE", "DEFINED", 
        "IF", "ELIF", "ELSE", "UNDEF", "IFDEF", "IFNDEF", "ENDIF", "BANG", 
        "LPAREN", "RPAREN", "EQUAL", "NOTEQUAL", "AND", "OR", "LT", "GT", 
        "LE", "GE", "STAR", "DIRECTIVE_WHITESPACES", "DIRECTIVE_STRING", 
        "CONDITIONAL_SYMBOL", "DECIMAL_LITERAL", "FLOAT", "NEW_LINE", "DIRECITVE_COMMENT", 
        "DIRECITVE_LINE_COMMENT", "DIRECITVE_NEW_LINE", "DIRECITVE_TEXT_NEW_LINE", 
        "TEXT", "SLASH"
    ];
    public static readonly ruleNames = [
        "lpcDocument", "text", "code", "directive", "directive_text", "preprocessor_expression",
    ];

    public get grammarFileName(): string { return "LPCPreprocessorParser.g4"; }
    public get literalNames(): (string | null)[] { return LPCPreprocessorParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return LPCPreprocessorParser.symbolicNames; }
    public get ruleNames(): string[] { return LPCPreprocessorParser.ruleNames; }
    public get serializedATN(): number[] { return LPCPreprocessorParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, LPCPreprocessorParser._ATN, LPCPreprocessorParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public lpcDocument(): LpcDocumentContext {
        let localContext = new LpcDocumentContext(this.context, this.state);
        this.enterRule(localContext, 0, LPCPreprocessorParser.RULE_lpcDocument);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 15;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 1 || _la === 2) {
                {
                {
                this.state = 12;
                this.text();
                }
                }
                this.state = 17;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 18;
            this.match(LPCPreprocessorParser.EOF);
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
    public text(): TextContext {
        let localContext = new TextContext(this.context, this.state);
        this.enterRule(localContext, 2, LPCPreprocessorParser.RULE_text);
        let _la: number;
        try {
            this.state = 25;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCPreprocessorParser.CODE:
                localContext = new CodeTextContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 20;
                this.code();
                }
                break;
            case LPCPreprocessorParser.SHARP:
                localContext = new PreprocessorDirectiveContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 21;
                this.match(LPCPreprocessorParser.SHARP);
                this.state = 22;
                this.directive();
                this.state = 23;
                _la = this.tokenStream.LA(1);
                if(!(_la === -1 || _la === 31)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
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
    public code(): CodeContext {
        let localContext = new CodeContext(this.context, this.state);
        this.enterRule(localContext, 4, LPCPreprocessorParser.RULE_code);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 28;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 27;
                    this.match(LPCPreprocessorParser.CODE);
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 30;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
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
    public directive(): DirectiveContext {
        let localContext = new DirectiveContext(this.context, this.state);
        this.enterRule(localContext, 6, LPCPreprocessorParser.RULE_directive);
        let _la: number;
        try {
            this.state = 56;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCPreprocessorParser.INCLUDE:
                localContext = new PreprocessorImportContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 32;
                this.match(LPCPreprocessorParser.INCLUDE);
                this.state = 33;
                this.directive_text();
                }
                break;
            case LPCPreprocessorParser.IF:
                localContext = new PreprocessorConditionalContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 34;
                this.match(LPCPreprocessorParser.IF);
                this.state = 35;
                this.preprocessor_expression(0);
                }
                break;
            case LPCPreprocessorParser.ELIF:
                localContext = new PreprocessorConditionalContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 36;
                this.match(LPCPreprocessorParser.ELIF);
                this.state = 37;
                this.preprocessor_expression(0);
                }
                break;
            case LPCPreprocessorParser.ELSE:
                localContext = new PreprocessorConditionalElseContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 38;
                this.match(LPCPreprocessorParser.ELSE);
                }
                break;
            case LPCPreprocessorParser.ENDIF:
                localContext = new PreprocessorConditionalEndContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 39;
                this.match(LPCPreprocessorParser.ENDIF);
                this.state = 41;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 939573312) !== 0)) {
                    {
                    this.state = 40;
                    this.preprocessor_expression(0);
                    }
                }

                }
                break;
            case LPCPreprocessorParser.IFDEF:
                localContext = new PreprocessorConditionalDefContext(localContext);
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 43;
                this.match(LPCPreprocessorParser.IFDEF);
                this.state = 44;
                _la = this.tokenStream.LA(1);
                if(!(_la === 28 || _la === 29)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                break;
            case LPCPreprocessorParser.IFNDEF:
                localContext = new PreprocessorConditionalDefContext(localContext);
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 45;
                this.match(LPCPreprocessorParser.IFNDEF);
                this.state = 46;
                _la = this.tokenStream.LA(1);
                if(!(_la === 28 || _la === 29)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                break;
            case LPCPreprocessorParser.UNDEF:
                localContext = new PreprocessorUndefContext(localContext);
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 47;
                this.match(LPCPreprocessorParser.UNDEF);
                this.state = 48;
                this.match(LPCPreprocessorParser.CONDITIONAL_SYMBOL);
                }
                break;
            case LPCPreprocessorParser.PRAGMA:
                localContext = new PreprocessorPragmaContext(localContext);
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 49;
                this.match(LPCPreprocessorParser.PRAGMA);
                this.state = 50;
                this.directive_text();
                }
                break;
            case LPCPreprocessorParser.DEFINE:
                localContext = new PreprocessorDefineContext(localContext);
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 51;
                this.match(LPCPreprocessorParser.DEFINE);
                this.state = 52;
                this.match(LPCPreprocessorParser.CONDITIONAL_SYMBOL);
                this.state = 54;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 36) {
                    {
                    this.state = 53;
                    this.directive_text();
                    }
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
    public directive_text(): Directive_textContext {
        let localContext = new Directive_textContext(this.context, this.state);
        this.enterRule(localContext, 8, LPCPreprocessorParser.RULE_directive_text);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 59;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 58;
                this.match(LPCPreprocessorParser.TEXT);
                }
                }
                this.state = 61;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 36);
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

    public preprocessor_expression(): Preprocessor_expressionContext;
    public preprocessor_expression(_p: number): Preprocessor_expressionContext;
    public preprocessor_expression(_p?: number): Preprocessor_expressionContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new Preprocessor_expressionContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 10;
        this.enterRecursionRule(localContext, 10, LPCPreprocessorParser.RULE_preprocessor_expression, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 86;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCPreprocessorParser.DECIMAL_LITERAL:
                {
                localContext = new PreprocessorConstantContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 64;
                this.match(LPCPreprocessorParser.DECIMAL_LITERAL);
                }
                break;
            case LPCPreprocessorParser.DIRECTIVE_STRING:
                {
                localContext = new PreprocessorConstantContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 65;
                this.match(LPCPreprocessorParser.DIRECTIVE_STRING);
                }
                break;
            case LPCPreprocessorParser.CONDITIONAL_SYMBOL:
                {
                localContext = new PreprocessorConditionalSymbolContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 66;
                this.match(LPCPreprocessorParser.CONDITIONAL_SYMBOL);
                this.state = 71;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
                case 1:
                    {
                    this.state = 67;
                    this.match(LPCPreprocessorParser.LPAREN);
                    this.state = 68;
                    this.preprocessor_expression(0);
                    this.state = 69;
                    this.match(LPCPreprocessorParser.RPAREN);
                    }
                    break;
                }
                }
                break;
            case LPCPreprocessorParser.LPAREN:
                {
                localContext = new PreprocessorParenthesisContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 73;
                this.match(LPCPreprocessorParser.LPAREN);
                this.state = 74;
                this.preprocessor_expression(0);
                this.state = 75;
                this.match(LPCPreprocessorParser.RPAREN);
                }
                break;
            case LPCPreprocessorParser.BANG:
                {
                localContext = new PreprocessorNotContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 77;
                this.match(LPCPreprocessorParser.BANG);
                this.state = 78;
                this.preprocessor_expression(6);
                }
                break;
            case LPCPreprocessorParser.DEFINED:
                {
                localContext = new PreprocessorDefinedContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 79;
                this.match(LPCPreprocessorParser.DEFINED);
                this.state = 84;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCPreprocessorParser.CONDITIONAL_SYMBOL:
                    {
                    this.state = 80;
                    this.match(LPCPreprocessorParser.CONDITIONAL_SYMBOL);
                    }
                    break;
                case LPCPreprocessorParser.LPAREN:
                    {
                    this.state = 81;
                    this.match(LPCPreprocessorParser.LPAREN);
                    this.state = 82;
                    this.match(LPCPreprocessorParser.CONDITIONAL_SYMBOL);
                    this.state = 83;
                    this.match(LPCPreprocessorParser.RPAREN);
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
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 102;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 100;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
                    case 1:
                        {
                        localContext = new PreprocessorBinaryContext(new Preprocessor_expressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCPreprocessorParser.RULE_preprocessor_expression);
                        this.state = 88;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 89;
                        (localContext as PreprocessorBinaryContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 17 || _la === 18)) {
                            (localContext as PreprocessorBinaryContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 90;
                        this.preprocessor_expression(6);
                        }
                        break;
                    case 2:
                        {
                        localContext = new PreprocessorBinaryContext(new Preprocessor_expressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCPreprocessorParser.RULE_preprocessor_expression);
                        this.state = 91;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 92;
                        (localContext as PreprocessorBinaryContext)._op = this.match(LPCPreprocessorParser.AND);
                        this.state = 93;
                        this.preprocessor_expression(5);
                        }
                        break;
                    case 3:
                        {
                        localContext = new PreprocessorBinaryContext(new Preprocessor_expressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCPreprocessorParser.RULE_preprocessor_expression);
                        this.state = 94;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 95;
                        (localContext as PreprocessorBinaryContext)._op = this.match(LPCPreprocessorParser.OR);
                        this.state = 96;
                        this.preprocessor_expression(4);
                        }
                        break;
                    case 4:
                        {
                        localContext = new PreprocessorBinaryContext(new Preprocessor_expressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCPreprocessorParser.RULE_preprocessor_expression);
                        this.state = 97;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 98;
                        (localContext as PreprocessorBinaryContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 65011712) !== 0))) {
                            (localContext as PreprocessorBinaryContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 99;
                        this.preprocessor_expression(3);
                        }
                        break;
                    }
                    }
                }
                this.state = 104;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
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

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 5:
            return this.preprocessor_expression_sempred(localContext as Preprocessor_expressionContext, predIndex);
        }
        return true;
    }
    private preprocessor_expression_sempred(localContext: Preprocessor_expressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 5);
        case 1:
            return this.precpred(this.context, 4);
        case 2:
            return this.precpred(this.context, 3);
        case 3:
            return this.precpred(this.context, 2);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,37,106,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,1,0,5,
        0,14,8,0,10,0,12,0,17,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,3,1,26,8,1,
        1,2,4,2,29,8,2,11,2,12,2,30,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,
        3,3,42,8,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,55,8,
        3,3,3,57,8,3,1,4,4,4,60,8,4,11,4,12,4,61,1,5,1,5,1,5,1,5,1,5,1,5,
        1,5,1,5,3,5,72,8,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,3,
        5,85,8,5,3,5,87,8,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,
        1,5,5,5,101,8,5,10,5,12,5,104,9,5,1,5,0,1,10,6,0,2,4,6,8,10,0,4,
        1,1,31,31,1,0,28,29,1,0,17,18,1,0,21,25,125,0,15,1,0,0,0,2,25,1,
        0,0,0,4,28,1,0,0,0,6,56,1,0,0,0,8,59,1,0,0,0,10,86,1,0,0,0,12,14,
        3,2,1,0,13,12,1,0,0,0,14,17,1,0,0,0,15,13,1,0,0,0,15,16,1,0,0,0,
        16,18,1,0,0,0,17,15,1,0,0,0,18,19,5,0,0,1,19,1,1,0,0,0,20,26,3,4,
        2,0,21,22,5,1,0,0,22,23,3,6,3,0,23,24,7,0,0,0,24,26,1,0,0,0,25,20,
        1,0,0,0,25,21,1,0,0,0,26,3,1,0,0,0,27,29,5,2,0,0,28,27,1,0,0,0,29,
        30,1,0,0,0,30,28,1,0,0,0,30,31,1,0,0,0,31,5,1,0,0,0,32,33,5,3,0,
        0,33,57,3,8,4,0,34,35,5,7,0,0,35,57,3,10,5,0,36,37,5,8,0,0,37,57,
        3,10,5,0,38,57,5,9,0,0,39,41,5,13,0,0,40,42,3,10,5,0,41,40,1,0,0,
        0,41,42,1,0,0,0,42,57,1,0,0,0,43,44,5,11,0,0,44,57,7,1,0,0,45,46,
        5,12,0,0,46,57,7,1,0,0,47,48,5,10,0,0,48,57,5,28,0,0,49,50,5,4,0,
        0,50,57,3,8,4,0,51,52,5,5,0,0,52,54,5,28,0,0,53,55,3,8,4,0,54,53,
        1,0,0,0,54,55,1,0,0,0,55,57,1,0,0,0,56,32,1,0,0,0,56,34,1,0,0,0,
        56,36,1,0,0,0,56,38,1,0,0,0,56,39,1,0,0,0,56,43,1,0,0,0,56,45,1,
        0,0,0,56,47,1,0,0,0,56,49,1,0,0,0,56,51,1,0,0,0,57,7,1,0,0,0,58,
        60,5,36,0,0,59,58,1,0,0,0,60,61,1,0,0,0,61,59,1,0,0,0,61,62,1,0,
        0,0,62,9,1,0,0,0,63,64,6,5,-1,0,64,87,5,29,0,0,65,87,5,27,0,0,66,
        71,5,28,0,0,67,68,5,15,0,0,68,69,3,10,5,0,69,70,5,16,0,0,70,72,1,
        0,0,0,71,67,1,0,0,0,71,72,1,0,0,0,72,87,1,0,0,0,73,74,5,15,0,0,74,
        75,3,10,5,0,75,76,5,16,0,0,76,87,1,0,0,0,77,78,5,14,0,0,78,87,3,
        10,5,6,79,84,5,6,0,0,80,85,5,28,0,0,81,82,5,15,0,0,82,83,5,28,0,
        0,83,85,5,16,0,0,84,80,1,0,0,0,84,81,1,0,0,0,85,87,1,0,0,0,86,63,
        1,0,0,0,86,65,1,0,0,0,86,66,1,0,0,0,86,73,1,0,0,0,86,77,1,0,0,0,
        86,79,1,0,0,0,87,102,1,0,0,0,88,89,10,5,0,0,89,90,7,2,0,0,90,101,
        3,10,5,6,91,92,10,4,0,0,92,93,5,19,0,0,93,101,3,10,5,5,94,95,10,
        3,0,0,95,96,5,20,0,0,96,101,3,10,5,4,97,98,10,2,0,0,98,99,7,3,0,
        0,99,101,3,10,5,3,100,88,1,0,0,0,100,91,1,0,0,0,100,94,1,0,0,0,100,
        97,1,0,0,0,101,104,1,0,0,0,102,100,1,0,0,0,102,103,1,0,0,0,103,11,
        1,0,0,0,104,102,1,0,0,0,12,15,25,30,41,54,56,61,71,84,86,100,102
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!LPCPreprocessorParser.__ATN) {
            LPCPreprocessorParser.__ATN = new antlr.ATNDeserializer().deserialize(LPCPreprocessorParser._serializedATN);
        }

        return LPCPreprocessorParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(LPCPreprocessorParser.literalNames, LPCPreprocessorParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return LPCPreprocessorParser.vocabulary;
    }

    private static readonly decisionsToDFA = LPCPreprocessorParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class LpcDocumentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(LPCPreprocessorParser.EOF, 0)!;
    }
    public text(): TextContext[];
    public text(i: number): TextContext | null;
    public text(i?: number): TextContext[] | TextContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TextContext);
        }

        return this.getRuleContext(i, TextContext);
    }
    public override get ruleIndex(): number {
        return LPCPreprocessorParser.RULE_lpcDocument;
    }
    public override enterRule(listener: LPCPreprocessorParserListener): void {
        if(listener.enterLpcDocument) {
             listener.enterLpcDocument(this);
        }
    }
    public override exitRule(listener: LPCPreprocessorParserListener): void {
        if(listener.exitLpcDocument) {
             listener.exitLpcDocument(this);
        }
    }
    public override accept<Result>(visitor: LPCPreprocessorParserVisitor<Result>): Result | null {
        if (visitor.visitLpcDocument) {
            return visitor.visitLpcDocument(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TextContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return LPCPreprocessorParser.RULE_text;
    }
    public override copyFrom(ctx: TextContext): void {
        super.copyFrom(ctx);
    }
}
export class PreprocessorDirectiveContext extends TextContext {
    public constructor(ctx: TextContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public SHARP(): antlr.TerminalNode {
        return this.getToken(LPCPreprocessorParser.SHARP, 0)!;
    }
    public directive(): DirectiveContext {
        return this.getRuleContext(0, DirectiveContext)!;
    }
    public NEW_LINE(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.NEW_LINE, 0);
    }
    public EOF(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.EOF, 0);
    }
    public override enterRule(listener: LPCPreprocessorParserListener): void {
        if(listener.enterPreprocessorDirective) {
             listener.enterPreprocessorDirective(this);
        }
    }
    public override exitRule(listener: LPCPreprocessorParserListener): void {
        if(listener.exitPreprocessorDirective) {
             listener.exitPreprocessorDirective(this);
        }
    }
    public override accept<Result>(visitor: LPCPreprocessorParserVisitor<Result>): Result | null {
        if (visitor.visitPreprocessorDirective) {
            return visitor.visitPreprocessorDirective(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class CodeTextContext extends TextContext {
    public constructor(ctx: TextContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public code(): CodeContext {
        return this.getRuleContext(0, CodeContext)!;
    }
    public override enterRule(listener: LPCPreprocessorParserListener): void {
        if(listener.enterCodeText) {
             listener.enterCodeText(this);
        }
    }
    public override exitRule(listener: LPCPreprocessorParserListener): void {
        if(listener.exitCodeText) {
             listener.exitCodeText(this);
        }
    }
    public override accept<Result>(visitor: LPCPreprocessorParserVisitor<Result>): Result | null {
        if (visitor.visitCodeText) {
            return visitor.visitCodeText(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CodeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CODE(): antlr.TerminalNode[];
    public CODE(i: number): antlr.TerminalNode | null;
    public CODE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCPreprocessorParser.CODE);
    	} else {
    		return this.getToken(LPCPreprocessorParser.CODE, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCPreprocessorParser.RULE_code;
    }
    public override enterRule(listener: LPCPreprocessorParserListener): void {
        if(listener.enterCode) {
             listener.enterCode(this);
        }
    }
    public override exitRule(listener: LPCPreprocessorParserListener): void {
        if(listener.exitCode) {
             listener.exitCode(this);
        }
    }
    public override accept<Result>(visitor: LPCPreprocessorParserVisitor<Result>): Result | null {
        if (visitor.visitCode) {
            return visitor.visitCode(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DirectiveContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return LPCPreprocessorParser.RULE_directive;
    }
    public override copyFrom(ctx: DirectiveContext): void {
        super.copyFrom(ctx);
    }
}
export class PreprocessorConditionalEndContext extends DirectiveContext {
    public constructor(ctx: DirectiveContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public ENDIF(): antlr.TerminalNode {
        return this.getToken(LPCPreprocessorParser.ENDIF, 0)!;
    }
    public preprocessor_expression(): Preprocessor_expressionContext | null {
        return this.getRuleContext(0, Preprocessor_expressionContext);
    }
    public override enterRule(listener: LPCPreprocessorParserListener): void {
        if(listener.enterPreprocessorConditionalEnd) {
             listener.enterPreprocessorConditionalEnd(this);
        }
    }
    public override exitRule(listener: LPCPreprocessorParserListener): void {
        if(listener.exitPreprocessorConditionalEnd) {
             listener.exitPreprocessorConditionalEnd(this);
        }
    }
    public override accept<Result>(visitor: LPCPreprocessorParserVisitor<Result>): Result | null {
        if (visitor.visitPreprocessorConditionalEnd) {
            return visitor.visitPreprocessorConditionalEnd(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PreprocessorConditionalElseContext extends DirectiveContext {
    public constructor(ctx: DirectiveContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public ELSE(): antlr.TerminalNode {
        return this.getToken(LPCPreprocessorParser.ELSE, 0)!;
    }
    public override enterRule(listener: LPCPreprocessorParserListener): void {
        if(listener.enterPreprocessorConditionalElse) {
             listener.enterPreprocessorConditionalElse(this);
        }
    }
    public override exitRule(listener: LPCPreprocessorParserListener): void {
        if(listener.exitPreprocessorConditionalElse) {
             listener.exitPreprocessorConditionalElse(this);
        }
    }
    public override accept<Result>(visitor: LPCPreprocessorParserVisitor<Result>): Result | null {
        if (visitor.visitPreprocessorConditionalElse) {
            return visitor.visitPreprocessorConditionalElse(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PreprocessorUndefContext extends DirectiveContext {
    public constructor(ctx: DirectiveContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public UNDEF(): antlr.TerminalNode {
        return this.getToken(LPCPreprocessorParser.UNDEF, 0)!;
    }
    public CONDITIONAL_SYMBOL(): antlr.TerminalNode {
        return this.getToken(LPCPreprocessorParser.CONDITIONAL_SYMBOL, 0)!;
    }
    public override enterRule(listener: LPCPreprocessorParserListener): void {
        if(listener.enterPreprocessorUndef) {
             listener.enterPreprocessorUndef(this);
        }
    }
    public override exitRule(listener: LPCPreprocessorParserListener): void {
        if(listener.exitPreprocessorUndef) {
             listener.exitPreprocessorUndef(this);
        }
    }
    public override accept<Result>(visitor: LPCPreprocessorParserVisitor<Result>): Result | null {
        if (visitor.visitPreprocessorUndef) {
            return visitor.visitPreprocessorUndef(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PreprocessorConditionalDefContext extends DirectiveContext {
    public constructor(ctx: DirectiveContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public IFDEF(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.IFDEF, 0);
    }
    public CONDITIONAL_SYMBOL(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.CONDITIONAL_SYMBOL, 0);
    }
    public DECIMAL_LITERAL(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.DECIMAL_LITERAL, 0);
    }
    public IFNDEF(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.IFNDEF, 0);
    }
    public override enterRule(listener: LPCPreprocessorParserListener): void {
        if(listener.enterPreprocessorConditionalDef) {
             listener.enterPreprocessorConditionalDef(this);
        }
    }
    public override exitRule(listener: LPCPreprocessorParserListener): void {
        if(listener.exitPreprocessorConditionalDef) {
             listener.exitPreprocessorConditionalDef(this);
        }
    }
    public override accept<Result>(visitor: LPCPreprocessorParserVisitor<Result>): Result | null {
        if (visitor.visitPreprocessorConditionalDef) {
            return visitor.visitPreprocessorConditionalDef(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PreprocessorConditionalContext extends DirectiveContext {
    public constructor(ctx: DirectiveContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public IF(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.IF, 0);
    }
    public preprocessor_expression(): Preprocessor_expressionContext {
        return this.getRuleContext(0, Preprocessor_expressionContext)!;
    }
    public ELIF(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.ELIF, 0);
    }
    public override enterRule(listener: LPCPreprocessorParserListener): void {
        if(listener.enterPreprocessorConditional) {
             listener.enterPreprocessorConditional(this);
        }
    }
    public override exitRule(listener: LPCPreprocessorParserListener): void {
        if(listener.exitPreprocessorConditional) {
             listener.exitPreprocessorConditional(this);
        }
    }
    public override accept<Result>(visitor: LPCPreprocessorParserVisitor<Result>): Result | null {
        if (visitor.visitPreprocessorConditional) {
            return visitor.visitPreprocessorConditional(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PreprocessorImportContext extends DirectiveContext {
    public constructor(ctx: DirectiveContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public INCLUDE(): antlr.TerminalNode {
        return this.getToken(LPCPreprocessorParser.INCLUDE, 0)!;
    }
    public directive_text(): Directive_textContext {
        return this.getRuleContext(0, Directive_textContext)!;
    }
    public override enterRule(listener: LPCPreprocessorParserListener): void {
        if(listener.enterPreprocessorImport) {
             listener.enterPreprocessorImport(this);
        }
    }
    public override exitRule(listener: LPCPreprocessorParserListener): void {
        if(listener.exitPreprocessorImport) {
             listener.exitPreprocessorImport(this);
        }
    }
    public override accept<Result>(visitor: LPCPreprocessorParserVisitor<Result>): Result | null {
        if (visitor.visitPreprocessorImport) {
            return visitor.visitPreprocessorImport(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PreprocessorPragmaContext extends DirectiveContext {
    public constructor(ctx: DirectiveContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public PRAGMA(): antlr.TerminalNode {
        return this.getToken(LPCPreprocessorParser.PRAGMA, 0)!;
    }
    public directive_text(): Directive_textContext {
        return this.getRuleContext(0, Directive_textContext)!;
    }
    public override enterRule(listener: LPCPreprocessorParserListener): void {
        if(listener.enterPreprocessorPragma) {
             listener.enterPreprocessorPragma(this);
        }
    }
    public override exitRule(listener: LPCPreprocessorParserListener): void {
        if(listener.exitPreprocessorPragma) {
             listener.exitPreprocessorPragma(this);
        }
    }
    public override accept<Result>(visitor: LPCPreprocessorParserVisitor<Result>): Result | null {
        if (visitor.visitPreprocessorPragma) {
            return visitor.visitPreprocessorPragma(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PreprocessorDefineContext extends DirectiveContext {
    public constructor(ctx: DirectiveContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public DEFINE(): antlr.TerminalNode {
        return this.getToken(LPCPreprocessorParser.DEFINE, 0)!;
    }
    public CONDITIONAL_SYMBOL(): antlr.TerminalNode {
        return this.getToken(LPCPreprocessorParser.CONDITIONAL_SYMBOL, 0)!;
    }
    public directive_text(): Directive_textContext | null {
        return this.getRuleContext(0, Directive_textContext);
    }
    public override enterRule(listener: LPCPreprocessorParserListener): void {
        if(listener.enterPreprocessorDefine) {
             listener.enterPreprocessorDefine(this);
        }
    }
    public override exitRule(listener: LPCPreprocessorParserListener): void {
        if(listener.exitPreprocessorDefine) {
             listener.exitPreprocessorDefine(this);
        }
    }
    public override accept<Result>(visitor: LPCPreprocessorParserVisitor<Result>): Result | null {
        if (visitor.visitPreprocessorDefine) {
            return visitor.visitPreprocessorDefine(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Directive_textContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TEXT(): antlr.TerminalNode[];
    public TEXT(i: number): antlr.TerminalNode | null;
    public TEXT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCPreprocessorParser.TEXT);
    	} else {
    		return this.getToken(LPCPreprocessorParser.TEXT, i);
    	}
    }
    public override get ruleIndex(): number {
        return LPCPreprocessorParser.RULE_directive_text;
    }
    public override enterRule(listener: LPCPreprocessorParserListener): void {
        if(listener.enterDirective_text) {
             listener.enterDirective_text(this);
        }
    }
    public override exitRule(listener: LPCPreprocessorParserListener): void {
        if(listener.exitDirective_text) {
             listener.exitDirective_text(this);
        }
    }
    public override accept<Result>(visitor: LPCPreprocessorParserVisitor<Result>): Result | null {
        if (visitor.visitDirective_text) {
            return visitor.visitDirective_text(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Preprocessor_expressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return LPCPreprocessorParser.RULE_preprocessor_expression;
    }
    public override copyFrom(ctx: Preprocessor_expressionContext): void {
        super.copyFrom(ctx);
    }
}
export class PreprocessorParenthesisContext extends Preprocessor_expressionContext {
    public constructor(ctx: Preprocessor_expressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(LPCPreprocessorParser.LPAREN, 0)!;
    }
    public preprocessor_expression(): Preprocessor_expressionContext {
        return this.getRuleContext(0, Preprocessor_expressionContext)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(LPCPreprocessorParser.RPAREN, 0)!;
    }
    public override enterRule(listener: LPCPreprocessorParserListener): void {
        if(listener.enterPreprocessorParenthesis) {
             listener.enterPreprocessorParenthesis(this);
        }
    }
    public override exitRule(listener: LPCPreprocessorParserListener): void {
        if(listener.exitPreprocessorParenthesis) {
             listener.exitPreprocessorParenthesis(this);
        }
    }
    public override accept<Result>(visitor: LPCPreprocessorParserVisitor<Result>): Result | null {
        if (visitor.visitPreprocessorParenthesis) {
            return visitor.visitPreprocessorParenthesis(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PreprocessorNotContext extends Preprocessor_expressionContext {
    public constructor(ctx: Preprocessor_expressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public BANG(): antlr.TerminalNode {
        return this.getToken(LPCPreprocessorParser.BANG, 0)!;
    }
    public preprocessor_expression(): Preprocessor_expressionContext {
        return this.getRuleContext(0, Preprocessor_expressionContext)!;
    }
    public override enterRule(listener: LPCPreprocessorParserListener): void {
        if(listener.enterPreprocessorNot) {
             listener.enterPreprocessorNot(this);
        }
    }
    public override exitRule(listener: LPCPreprocessorParserListener): void {
        if(listener.exitPreprocessorNot) {
             listener.exitPreprocessorNot(this);
        }
    }
    public override accept<Result>(visitor: LPCPreprocessorParserVisitor<Result>): Result | null {
        if (visitor.visitPreprocessorNot) {
            return visitor.visitPreprocessorNot(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PreprocessorBinaryContext extends Preprocessor_expressionContext {
    public _op?: Token | null;
    public constructor(ctx: Preprocessor_expressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public preprocessor_expression(): Preprocessor_expressionContext[];
    public preprocessor_expression(i: number): Preprocessor_expressionContext | null;
    public preprocessor_expression(i?: number): Preprocessor_expressionContext[] | Preprocessor_expressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Preprocessor_expressionContext);
        }

        return this.getRuleContext(i, Preprocessor_expressionContext);
    }
    public EQUAL(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.EQUAL, 0);
    }
    public NOTEQUAL(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.NOTEQUAL, 0);
    }
    public AND(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.AND, 0);
    }
    public OR(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.OR, 0);
    }
    public LT(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.LT, 0);
    }
    public GT(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.GT, 0);
    }
    public LE(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.LE, 0);
    }
    public GE(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.GE, 0);
    }
    public STAR(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.STAR, 0);
    }
    public override enterRule(listener: LPCPreprocessorParserListener): void {
        if(listener.enterPreprocessorBinary) {
             listener.enterPreprocessorBinary(this);
        }
    }
    public override exitRule(listener: LPCPreprocessorParserListener): void {
        if(listener.exitPreprocessorBinary) {
             listener.exitPreprocessorBinary(this);
        }
    }
    public override accept<Result>(visitor: LPCPreprocessorParserVisitor<Result>): Result | null {
        if (visitor.visitPreprocessorBinary) {
            return visitor.visitPreprocessorBinary(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PreprocessorConstantContext extends Preprocessor_expressionContext {
    public constructor(ctx: Preprocessor_expressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public DECIMAL_LITERAL(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.DECIMAL_LITERAL, 0);
    }
    public DIRECTIVE_STRING(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.DIRECTIVE_STRING, 0);
    }
    public override enterRule(listener: LPCPreprocessorParserListener): void {
        if(listener.enterPreprocessorConstant) {
             listener.enterPreprocessorConstant(this);
        }
    }
    public override exitRule(listener: LPCPreprocessorParserListener): void {
        if(listener.exitPreprocessorConstant) {
             listener.exitPreprocessorConstant(this);
        }
    }
    public override accept<Result>(visitor: LPCPreprocessorParserVisitor<Result>): Result | null {
        if (visitor.visitPreprocessorConstant) {
            return visitor.visitPreprocessorConstant(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PreprocessorConditionalSymbolContext extends Preprocessor_expressionContext {
    public constructor(ctx: Preprocessor_expressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public CONDITIONAL_SYMBOL(): antlr.TerminalNode {
        return this.getToken(LPCPreprocessorParser.CONDITIONAL_SYMBOL, 0)!;
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.LPAREN, 0);
    }
    public preprocessor_expression(): Preprocessor_expressionContext | null {
        return this.getRuleContext(0, Preprocessor_expressionContext);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.RPAREN, 0);
    }
    public override enterRule(listener: LPCPreprocessorParserListener): void {
        if(listener.enterPreprocessorConditionalSymbol) {
             listener.enterPreprocessorConditionalSymbol(this);
        }
    }
    public override exitRule(listener: LPCPreprocessorParserListener): void {
        if(listener.exitPreprocessorConditionalSymbol) {
             listener.exitPreprocessorConditionalSymbol(this);
        }
    }
    public override accept<Result>(visitor: LPCPreprocessorParserVisitor<Result>): Result | null {
        if (visitor.visitPreprocessorConditionalSymbol) {
            return visitor.visitPreprocessorConditionalSymbol(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PreprocessorDefinedContext extends Preprocessor_expressionContext {
    public constructor(ctx: Preprocessor_expressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public DEFINED(): antlr.TerminalNode {
        return this.getToken(LPCPreprocessorParser.DEFINED, 0)!;
    }
    public CONDITIONAL_SYMBOL(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.CONDITIONAL_SYMBOL, 0);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(LPCPreprocessorParser.RPAREN, 0);
    }
    public override enterRule(listener: LPCPreprocessorParserListener): void {
        if(listener.enterPreprocessorDefined) {
             listener.enterPreprocessorDefined(this);
        }
    }
    public override exitRule(listener: LPCPreprocessorParserListener): void {
        if(listener.exitPreprocessorDefined) {
             listener.exitPreprocessorDefined(this);
        }
    }
    public override accept<Result>(visitor: LPCPreprocessorParserVisitor<Result>): Result | null {
        if (visitor.visitPreprocessorDefined) {
            return visitor.visitPreprocessorDefined(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

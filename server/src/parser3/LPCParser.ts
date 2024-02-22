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
    public static readonly T__19 = 20;
    public static readonly T__20 = 21;
    public static readonly AUTO = 22;
    public static readonly BREAK = 23;
    public static readonly CASE = 24;
    public static readonly CHAR = 25;
    public static readonly CLOSURE = 26;
    public static readonly CONST = 27;
    public static readonly CONTINUE = 28;
    public static readonly DEFAULT = 29;
    public static readonly DO = 30;
    public static readonly ELSE = 31;
    public static readonly ENUM = 32;
    public static readonly EXTERN = 33;
    public static readonly FLOAT = 34;
    public static readonly FOR = 35;
    public static readonly FOREACH = 36;
    public static readonly GOTO = 37;
    public static readonly IF = 38;
    public static readonly IN = 39;
    public static readonly INT = 40;
    public static readonly MAPPING = 41;
    public static readonly OBJECT = 42;
    public static readonly REGISTER = 43;
    public static readonly RETURN = 44;
    public static readonly SIZEOF = 45;
    public static readonly STATUS = 46;
    public static readonly STRUCT = 47;
    public static readonly STRING = 48;
    public static readonly SYMBOL = 49;
    public static readonly SWITCH = 50;
    public static readonly TYPEDEF = 51;
    public static readonly UNION = 52;
    public static readonly UNKNOWN = 53;
    public static readonly VOID = 54;
    public static readonly VOLATILE = 55;
    public static readonly WHILE = 56;
    public static readonly PRIVATE = 57;
    public static readonly PROTECTED = 58;
    public static readonly PUBLIC = 59;
    public static readonly STATIC = 60;
    public static readonly PLUS = 61;
    public static readonly MINUS = 62;
    public static readonly STAR = 63;
    public static readonly DIV = 64;
    public static readonly MOD = 65;
    public static readonly INC = 66;
    public static readonly DEC = 67;
    public static readonly SHL = 68;
    public static readonly SHR = 69;
    public static readonly LT = 70;
    public static readonly GT = 71;
    public static readonly LE = 72;
    public static readonly GE = 73;
    public static readonly EQ = 74;
    public static readonly NE = 75;
    public static readonly AND = 76;
    public static readonly OR = 77;
    public static readonly XOR = 78;
    public static readonly NOT = 79;
    public static readonly AND_AND = 80;
    public static readonly OR_OR = 81;
    public static readonly QUESTION = 82;
    public static readonly COLON = 83;
    public static readonly SEMI = 84;
    public static readonly COMMA = 85;
    public static readonly SUPER_ACCESSOR = 86;
    public static readonly ADD_ASSIGN = 87;
    public static readonly SUB_ASSIGN = 88;
    public static readonly MUL_ASSIGN = 89;
    public static readonly DIV_ASSIGN = 90;
    public static readonly MOD_ASSIGN = 91;
    public static readonly AND_ASSIGN = 92;
    public static readonly OR_ASSIGN = 93;
    public static readonly XOR_ASSIGN = 94;
    public static readonly ARRAY_OPEN = 95;
    public static readonly ARRAY_CLOSE = 96;
    public static readonly MAPPING_OPEN = 97;
    public static readonly MAPPING_CLOSE = 98;
    public static readonly ARROW = 99;
    public static readonly CLOSURE_OPEN = 100;
    public static readonly CLOSURE_CLOSE = 101;
    public static readonly IntegerConstant = 102;
    public static readonly FloatingConstant = 103;
    public static readonly StringLiteral = 104;
    public static readonly CharacterConstant = 105;
    public static readonly Identifier = 106;
    public static readonly WS = 107;
    public static readonly COMMENT = 108;
    public static readonly LINE_COMMENT = 109;
    public static readonly RULE_program = 0;
    public static readonly RULE_preprocessorDirective = 1;
    public static readonly RULE_definePreprocessorDirective = 2;
    public static readonly RULE_selectionDirective = 3;
    public static readonly RULE_selectionDirectiveTypeSingle = 4;
    public static readonly RULE_selectionDirectiveTypeWithArg = 5;
    public static readonly RULE_directiveTypeWithArguments = 6;
    public static readonly RULE_directiveArgument = 7;
    public static readonly RULE_directiveTypeDefine = 8;
    public static readonly RULE_directiveDefineParam = 9;
    public static readonly RULE_directiveDefineArgument = 10;
    public static readonly RULE_directiveTypeInclude = 11;
    public static readonly RULE_directiveIncludeFile = 12;
    public static readonly RULE_directiveIncludeFilename = 13;
    public static readonly RULE_directiveIncludeFileGlobal = 14;
    public static readonly RULE_directiveIncludeFileLocal = 15;
    public static readonly RULE_directiveTypePragma = 16;
    public static readonly RULE_inheritStatement = 17;
    public static readonly RULE_inheritSuperStatement = 18;
    public static readonly RULE_declaration = 19;
    public static readonly RULE_functionModifier = 20;
    public static readonly RULE_functionDeclaration = 21;
    public static readonly RULE_parameterList = 22;
    public static readonly RULE_parameter = 23;
    public static readonly RULE_arrayExpression = 24;
    public static readonly RULE_mappingKey = 25;
    public static readonly RULE_mappingContent = 26;
    public static readonly RULE_mappingExpression = 27;
    public static readonly RULE_assignmentExpression = 28;
    public static readonly RULE_variableDeclaration = 29;
    public static readonly RULE_primitiveTypeSpecifier = 30;
    public static readonly RULE_typeSpecifier = 31;
    public static readonly RULE_inlineClosureExpression = 32;
    public static readonly RULE_statement = 33;
    public static readonly RULE_expressionStatement = 34;
    public static readonly RULE_compoundStatement = 35;
    public static readonly RULE_selectionStatement = 36;
    public static readonly RULE_elseIfExpression = 37;
    public static readonly RULE_elseExpression = 38;
    public static readonly RULE_ifExpression = 39;
    public static readonly RULE_ifStatement = 40;
    public static readonly RULE_switchStatement = 41;
    public static readonly RULE_caseExpression = 42;
    public static readonly RULE_caseStatement = 43;
    public static readonly RULE_defaultStatement = 44;
    public static readonly RULE_iterationStatement = 45;
    public static readonly RULE_jumpStatement = 46;
    public static readonly RULE_callOtherTarget = 47;
    public static readonly RULE_callOtherExpression = 48;
    public static readonly RULE_expression = 49;
    public static readonly RULE_expressionList = 50;

    public static readonly literalNames = [
        null, "'#'", "'endif'", "'ifdef'", "'ifndef'", "'elif'", "'undef'", 
        "'echo'", "'line'", "'define'", "'('", "')'", "'include'", "'.'", 
        "'pragma'", "'inherit'", "'='", "'{'", "'}'", "'..'", "'['", "']'", 
        "'auto'", "'break'", "'case'", "'char'", "'closure'", "'const'", 
        "'continue'", "'default'", "'do'", "'else'", "'enum'", "'extern'", 
        "'float'", "'for'", "'foreach'", "'goto'", "'if'", "'in'", "'int'", 
        "'mapping'", "'object'", "'register'", "'return'", "'sizeof'", "'status'", 
        "'struct'", "'string'", "'symbol'", "'switch'", "'typedef'", "'union'", 
        "'unknown'", "'void'", "'volatile'", "'while'", "'private'", "'protected'", 
        "'public'", "'static'", "'+'", "'-'", "'*'", "'/'", "'%'", "'++'", 
        "'--'", "'<<'", "'>>'", "'<'", "'>'", "'<='", "'>='", "'=='", "'!='", 
        "'&'", "'|'", "'^'", "'!'", "'&&'", "'||'", "'?'", "':'", "';'", 
        "','", "'::'", "'+='", "'-='", "'*='", "'/='", "'%='", "'&='", "'|='", 
        "'^='", "'({'", "'})'", "'(['", "'])'", "'->'", "'(:'", "':)'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        "AUTO", "BREAK", "CASE", "CHAR", "CLOSURE", "CONST", "CONTINUE", 
        "DEFAULT", "DO", "ELSE", "ENUM", "EXTERN", "FLOAT", "FOR", "FOREACH", 
        "GOTO", "IF", "IN", "INT", "MAPPING", "OBJECT", "REGISTER", "RETURN", 
        "SIZEOF", "STATUS", "STRUCT", "STRING", "SYMBOL", "SWITCH", "TYPEDEF", 
        "UNION", "UNKNOWN", "VOID", "VOLATILE", "WHILE", "PRIVATE", "PROTECTED", 
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
        "selectionDirective", "selectionDirectiveTypeSingle", "selectionDirectiveTypeWithArg", 
        "directiveTypeWithArguments", "directiveArgument", "directiveTypeDefine", 
        "directiveDefineParam", "directiveDefineArgument", "directiveTypeInclude", 
        "directiveIncludeFile", "directiveIncludeFilename", "directiveIncludeFileGlobal", 
        "directiveIncludeFileLocal", "directiveTypePragma", "inheritStatement", 
        "inheritSuperStatement", "declaration", "functionModifier", "functionDeclaration", 
        "parameterList", "parameter", "arrayExpression", "mappingKey", "mappingContent", 
        "mappingExpression", "assignmentExpression", "variableDeclaration", 
        "primitiveTypeSpecifier", "typeSpecifier", "inlineClosureExpression", 
        "statement", "expressionStatement", "compoundStatement", "selectionStatement", 
        "elseIfExpression", "elseExpression", "ifExpression", "ifStatement", 
        "switchStatement", "caseExpression", "caseStatement", "defaultStatement", 
        "iterationStatement", "jumpStatement", "callOtherTarget", "callOtherExpression", 
        "expression", "expressionList",
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
            this.state = 107;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 100696066) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & 127463873) !== 0) || _la === 106) {
                {
                this.state = 105;
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
                    this.state = 102;
                    this.declaration();
                    }
                    break;
                case LPCParser.T__0:
                    {
                    this.state = 103;
                    this.preprocessorDirective();
                    }
                    break;
                case LPCParser.T__14:
                    {
                    this.state = 104;
                    this.inheritStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 109;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 110;
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
            this.state = 132;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 112;
                this.selectionDirective();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 113;
                this.match(LPCParser.T__0);
                this.state = 114;
                this.directiveTypeWithArguments();
                this.state = 115;
                this.directiveArgument();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 117;
                this.definePreprocessorDirective();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 118;
                this.match(LPCParser.T__0);
                this.state = 119;
                this.directiveTypeInclude();
                this.state = 120;
                this.directiveIncludeFile();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 122;
                this.match(LPCParser.T__0);
                this.state = 123;
                this.directiveTypePragma();
                this.state = 124;
                this.match(LPCParser.Identifier);
                this.state = 129;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 85) {
                    {
                    {
                    this.state = 125;
                    this.match(LPCParser.COMMA);
                    this.state = 126;
                    this.match(LPCParser.Identifier);
                    }
                    }
                    this.state = 131;
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
            this.state = 134;
            this.match(LPCParser.T__0);
            this.state = 135;
            this.directiveTypeDefine();
            this.state = 136;
            this.match(LPCParser.Identifier);
            this.state = 138;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                {
                this.state = 137;
                this.directiveDefineParam();
                }
                break;
            }
            this.state = 141;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
            case 1:
                {
                this.state = 140;
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
    public selectionDirective(): SelectionDirectiveContext {
        let localContext = new SelectionDirectiveContext(this.context, this.state);
        this.enterRule(localContext, 6, LPCParser.RULE_selectionDirective);
        try {
            this.state = 149;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 143;
                this.match(LPCParser.T__0);
                this.state = 144;
                this.selectionDirectiveTypeWithArg();
                this.state = 145;
                this.directiveArgument();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 147;
                this.match(LPCParser.T__0);
                this.state = 148;
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
            this.state = 151;
            _la = this.tokenStream.LA(1);
            if(!(_la === 2 || _la === 31)) {
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
            this.state = 153;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 56) !== 0) || _la === 38)) {
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
            this.state = 155;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 448) !== 0))) {
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
            this.state = 157;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 21) !== 0))) {
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
        this.enterRule(localContext, 16, LPCParser.RULE_directiveTypeDefine);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 159;
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
        this.enterRule(localContext, 18, LPCParser.RULE_directiveDefineParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 161;
            this.match(LPCParser.T__9);
            this.state = 162;
            this.match(LPCParser.Identifier);
            this.state = 167;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 85) {
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
        this.enterRule(localContext, 20, LPCParser.RULE_directiveDefineArgument);
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
        this.enterRule(localContext, 22, LPCParser.RULE_directiveTypeInclude);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 174;
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
        this.enterRule(localContext, 24, LPCParser.RULE_directiveIncludeFile);
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
        this.enterRule(localContext, 26, LPCParser.RULE_directiveIncludeFilename);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 180;
            this.match(LPCParser.Identifier);
            this.state = 183;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 13) {
                {
                this.state = 181;
                this.match(LPCParser.T__12);
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
        this.enterRule(localContext, 28, LPCParser.RULE_directiveIncludeFileGlobal);
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
        this.enterRule(localContext, 30, LPCParser.RULE_directiveIncludeFileLocal);
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
        this.enterRule(localContext, 32, LPCParser.RULE_directiveTypePragma);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 191;
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
        this.enterRule(localContext, 34, LPCParser.RULE_inheritStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 193;
            this.match(LPCParser.T__14);
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
    public inheritSuperStatement(): InheritSuperStatementContext {
        let localContext = new InheritSuperStatementContext(this.context, this.state);
        this.enterRule(localContext, 36, LPCParser.RULE_inheritSuperStatement);
        try {
            this.state = 206;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.SUPER_ACCESSOR:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 197;
                this.match(LPCParser.SUPER_ACCESSOR);
                this.state = 198;
                this.expression(0);
                this.state = 199;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 201;
                this.match(LPCParser.StringLiteral);
                this.state = 202;
                this.match(LPCParser.SUPER_ACCESSOR);
                this.state = 203;
                this.expression(0);
                this.state = 204;
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
        this.enterRule(localContext, 38, LPCParser.RULE_declaration);
        try {
            this.state = 210;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 11, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 208;
                this.functionDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 209;
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
        this.enterRule(localContext, 40, LPCParser.RULE_functionModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 212;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 15) !== 0))) {
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
        this.enterRule(localContext, 42, LPCParser.RULE_functionDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 215;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 15) !== 0)) {
                {
                this.state = 214;
                this.functionModifier();
                }
            }

            this.state = 218;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 25)) & ~0x1F) === 0 && ((1 << (_la - 25)) & 836993539) !== 0)) {
                {
                this.state = 217;
                this.typeSpecifier(0);
                }
            }

            this.state = 220;
            this.match(LPCParser.Identifier);
            this.state = 221;
            this.match(LPCParser.T__9);
            this.state = 223;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 25)) & ~0x1F) === 0 && ((1 << (_la - 25)) & 836993539) !== 0) || _la === 106) {
                {
                this.state = 222;
                this.parameterList();
                }
            }

            this.state = 225;
            this.match(LPCParser.T__10);
            this.state = 226;
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
        this.enterRule(localContext, 44, LPCParser.RULE_parameterList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 228;
            this.parameter();
            this.state = 233;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 85) {
                {
                {
                this.state = 229;
                this.match(LPCParser.COMMA);
                this.state = 230;
                this.parameter();
                }
                }
                this.state = 235;
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
        this.enterRule(localContext, 46, LPCParser.RULE_parameter);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 237;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 25)) & ~0x1F) === 0 && ((1 << (_la - 25)) & 836993539) !== 0)) {
                {
                this.state = 236;
                this.typeSpecifier(0);
                }
            }

            this.state = 239;
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
        this.enterRule(localContext, 48, LPCParser.RULE_arrayExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 241;
            this.match(LPCParser.ARRAY_OPEN);
            this.state = 250;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 10 || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & 2684362755) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 125) !== 0)) {
                {
                this.state = 242;
                this.expression(0);
                this.state = 247;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 85) {
                    {
                    {
                    this.state = 243;
                    this.match(LPCParser.COMMA);
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

            this.state = 252;
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
        this.enterRule(localContext, 50, LPCParser.RULE_mappingKey);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 254;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 13) !== 0))) {
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
        this.enterRule(localContext, 52, LPCParser.RULE_mappingContent);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 256;
            this.mappingKey();
            this.state = 266;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 83) {
                {
                this.state = 257;
                this.match(LPCParser.COLON);
                this.state = 258;
                this.expression(0);
                this.state = 263;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 84) {
                    {
                    {
                    this.state = 259;
                    this.match(LPCParser.SEMI);
                    this.state = 260;
                    this.expression(0);
                    }
                    }
                    this.state = 265;
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
        this.enterRule(localContext, 54, LPCParser.RULE_mappingExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 268;
            this.match(LPCParser.MAPPING_OPEN);
            this.state = 277;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 13) !== 0)) {
                {
                this.state = 269;
                this.mappingContent();
                this.state = 274;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 85) {
                    {
                    {
                    this.state = 270;
                    this.match(LPCParser.COMMA);
                    this.state = 271;
                    this.mappingContent();
                    }
                    }
                    this.state = 276;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 279;
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
    public assignmentExpression(): AssignmentExpressionContext {
        let localContext = new AssignmentExpressionContext(this.context, this.state);
        this.enterRule(localContext, 56, LPCParser.RULE_assignmentExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 281;
            this.match(LPCParser.Identifier);
            this.state = 282;
            this.match(LPCParser.T__15);
            this.state = 283;
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
    public variableDeclaration(): VariableDeclarationContext {
        let localContext = new VariableDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 58, LPCParser.RULE_variableDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 285;
            this.typeSpecifier(0);
            this.state = 288;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 23, this.context) ) {
            case 1:
                {
                this.state = 286;
                this.match(LPCParser.Identifier);
                }
                break;
            case 2:
                {
                this.state = 287;
                this.assignmentExpression();
                }
                break;
            }
            this.state = 297;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 85) {
                {
                {
                this.state = 290;
                this.match(LPCParser.COMMA);
                this.state = 293;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 24, this.context) ) {
                case 1:
                    {
                    this.state = 291;
                    this.match(LPCParser.Identifier);
                    }
                    break;
                case 2:
                    {
                    this.state = 292;
                    this.assignmentExpression();
                    }
                    break;
                }
                }
                }
                this.state = 299;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 300;
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
        this.enterRule(localContext, 60, LPCParser.RULE_primitiveTypeSpecifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 302;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 25)) & ~0x1F) === 0 && ((1 << (_la - 25)) & 836993539) !== 0))) {
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
        let _startState = 62;
        this.enterRecursionRule(localContext, 62, LPCParser.RULE_typeSpecifier, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 305;
            this.primitiveTypeSpecifier();
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 311;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 26, this.context);
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
                    this.state = 307;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 308;
                    this.match(LPCParser.STAR);
                    }
                    }
                }
                this.state = 313;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 26, this.context);
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
        this.enterRule(localContext, 64, LPCParser.RULE_inlineClosureExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 314;
            this.match(LPCParser.CLOSURE_OPEN);
            this.state = 322;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 28, this.context) ) {
            case 1:
                {
                this.state = 315;
                this.expression(0);
                }
                break;
            case 2:
                {
                this.state = 319;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1451361282) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & 5895639) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & 2685411331) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 125) !== 0)) {
                    {
                    {
                    this.state = 316;
                    this.statement();
                    }
                    }
                    this.state = 321;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            }
            this.state = 324;
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
        this.enterRule(localContext, 66, LPCParser.RULE_statement);
        try {
            this.state = 334;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 326;
                this.expressionStatement();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 327;
                this.compoundStatement();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 328;
                this.selectionStatement();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 329;
                this.iterationStatement();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 330;
                this.jumpStatement();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 331;
                this.variableDeclaration();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 332;
                this.inheritSuperStatement();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 333;
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
        this.enterRule(localContext, 68, LPCParser.RULE_expressionStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 336;
            this.expression(0);
            this.state = 337;
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
        this.enterRule(localContext, 70, LPCParser.RULE_compoundStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 339;
            this.match(LPCParser.T__16);
            this.state = 343;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1451361282) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & 5895639) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & 2685411331) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 125) !== 0)) {
                {
                {
                this.state = 340;
                this.statement();
                }
                }
                this.state = 345;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 346;
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
        this.enterRule(localContext, 72, LPCParser.RULE_selectionStatement);
        try {
            this.state = 350;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.IF:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 348;
                this.ifStatement();
                }
                break;
            case LPCParser.SWITCH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 349;
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
        this.enterRule(localContext, 74, LPCParser.RULE_elseIfExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 352;
            this.match(LPCParser.ELSE);
            this.state = 353;
            this.match(LPCParser.IF);
            this.state = 354;
            this.match(LPCParser.T__9);
            this.state = 355;
            this.expression(0);
            this.state = 356;
            this.match(LPCParser.T__10);
            this.state = 357;
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
        this.enterRule(localContext, 76, LPCParser.RULE_elseExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 359;
            this.match(LPCParser.ELSE);
            this.state = 360;
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
        this.enterRule(localContext, 78, LPCParser.RULE_ifExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 362;
            this.match(LPCParser.IF);
            this.state = 363;
            this.match(LPCParser.T__9);
            this.state = 364;
            this.expression(0);
            this.state = 365;
            this.match(LPCParser.T__10);
            this.state = 366;
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
        this.enterRule(localContext, 80, LPCParser.RULE_ifStatement);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 368;
            this.ifExpression();
            this.state = 372;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 369;
                    this.elseIfExpression();
                    }
                    }
                }
                this.state = 374;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
            }
            this.state = 376;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 33, this.context) ) {
            case 1:
                {
                this.state = 375;
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
        this.enterRule(localContext, 82, LPCParser.RULE_switchStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 378;
            this.match(LPCParser.SWITCH);
            this.state = 379;
            this.match(LPCParser.T__9);
            this.state = 380;
            this.expression(0);
            this.state = 381;
            this.match(LPCParser.T__10);
            this.state = 382;
            this.match(LPCParser.T__16);
            this.state = 387;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 24 || _la === 29) {
                {
                this.state = 385;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.CASE:
                    {
                    this.state = 383;
                    this.caseStatement();
                    }
                    break;
                case LPCParser.DEFAULT:
                    {
                    this.state = 384;
                    this.defaultStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 389;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 390;
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
        this.enterRule(localContext, 84, LPCParser.RULE_caseExpression);
        let _la: number;
        try {
            this.state = 396;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 36, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 392;
                _la = this.tokenStream.LA(1);
                if(!(_la === 102 || _la === 104)) {
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
                this.state = 393;
                _la = this.tokenStream.LA(1);
                if(!(_la === 102 || _la === 104)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 394;
                this.match(LPCParser.T__18);
                this.state = 395;
                _la = this.tokenStream.LA(1);
                if(!(_la === 102 || _la === 104)) {
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
        this.enterRule(localContext, 86, LPCParser.RULE_caseStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 398;
            this.match(LPCParser.CASE);
            this.state = 399;
            this.caseExpression();
            this.state = 400;
            this.match(LPCParser.COLON);
            this.state = 404;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1451361282) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & 5895639) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & 2685411331) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 125) !== 0)) {
                {
                {
                this.state = 401;
                this.statement();
                }
                }
                this.state = 406;
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
        this.enterRule(localContext, 88, LPCParser.RULE_defaultStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 407;
            this.match(LPCParser.DEFAULT);
            this.state = 408;
            this.match(LPCParser.COLON);
            this.state = 412;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1451361282) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & 5895639) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & 2685411331) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 125) !== 0)) {
                {
                {
                this.state = 409;
                this.statement();
                }
                }
                this.state = 414;
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
        this.enterRule(localContext, 90, LPCParser.RULE_iterationStatement);
        let _la: number;
        try {
            this.state = 453;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.WHILE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 415;
                this.match(LPCParser.WHILE);
                this.state = 416;
                this.match(LPCParser.T__9);
                this.state = 417;
                this.expression(0);
                this.state = 418;
                this.match(LPCParser.T__10);
                this.state = 419;
                this.statement();
                }
                break;
            case LPCParser.DO:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 421;
                this.match(LPCParser.DO);
                this.state = 422;
                this.statement();
                this.state = 423;
                this.match(LPCParser.WHILE);
                this.state = 424;
                this.match(LPCParser.T__9);
                this.state = 425;
                this.expression(0);
                this.state = 426;
                this.match(LPCParser.T__10);
                this.state = 427;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.FOR:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 429;
                this.match(LPCParser.FOR);
                this.state = 430;
                this.match(LPCParser.T__9);
                this.state = 432;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 10 || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & 2684362755) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 125) !== 0)) {
                    {
                    this.state = 431;
                    this.expression(0);
                    }
                }

                this.state = 434;
                this.match(LPCParser.SEMI);
                this.state = 436;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 10 || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & 2684362755) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 125) !== 0)) {
                    {
                    this.state = 435;
                    this.expression(0);
                    }
                }

                this.state = 438;
                this.match(LPCParser.SEMI);
                this.state = 440;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 10 || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & 2684362755) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 125) !== 0)) {
                    {
                    this.state = 439;
                    this.expression(0);
                    }
                }

                this.state = 442;
                this.match(LPCParser.T__10);
                this.state = 443;
                this.statement();
                }
                break;
            case LPCParser.FOREACH:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 444;
                this.match(LPCParser.FOREACH);
                this.state = 445;
                this.match(LPCParser.T__9);
                this.state = 446;
                this.typeSpecifier(0);
                this.state = 447;
                this.match(LPCParser.Identifier);
                this.state = 448;
                _la = this.tokenStream.LA(1);
                if(!(_la === 39 || _la === 83)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 449;
                this.expression(0);
                this.state = 450;
                this.match(LPCParser.T__10);
                this.state = 451;
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
        this.enterRule(localContext, 92, LPCParser.RULE_jumpStatement);
        let _la: number;
        try {
            this.state = 464;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BREAK:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 455;
                this.match(LPCParser.BREAK);
                this.state = 456;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.CONTINUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 457;
                this.match(LPCParser.CONTINUE);
                this.state = 458;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.RETURN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 459;
                this.match(LPCParser.RETURN);
                this.state = 461;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 10 || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & 2684362755) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 125) !== 0)) {
                    {
                    this.state = 460;
                    this.expression(0);
                    }
                }

                this.state = 463;
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
        this.enterRule(localContext, 94, LPCParser.RULE_callOtherTarget);
        try {
            this.state = 471;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 466;
                this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.T__9:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 467;
                this.match(LPCParser.T__9);
                this.state = 468;
                this.match(LPCParser.Identifier);
                this.state = 469;
                this.match(LPCParser.T__10);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 470;
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
        this.enterRule(localContext, 96, LPCParser.RULE_callOtherExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 473;
            _la = this.tokenStream.LA(1);
            if(!(_la === 104 || _la === 106)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 474;
            this.match(LPCParser.ARROW);
            this.state = 475;
            this.callOtherTarget();
            this.state = 476;
            this.match(LPCParser.T__9);
            this.state = 478;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 10 || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & 2684362755) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 125) !== 0)) {
                {
                this.state = 477;
                this.expressionList();
                }
            }

            this.state = 480;
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
        let _startState = 98;
        this.enterRecursionRule(localContext, 98, LPCParser.RULE_expression, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 509;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 48, this.context) ) {
            case 1:
                {
                this.state = 483;
                this.match(LPCParser.Identifier);
                }
                break;
            case 2:
                {
                this.state = 484;
                this.match(LPCParser.IntegerConstant);
                }
                break;
            case 3:
                {
                this.state = 485;
                this.match(LPCParser.FloatingConstant);
                }
                break;
            case 4:
                {
                this.state = 486;
                this.match(LPCParser.StringLiteral);
                }
                break;
            case 5:
                {
                this.state = 487;
                this.match(LPCParser.CharacterConstant);
                }
                break;
            case 6:
                {
                this.state = 488;
                this.match(LPCParser.T__9);
                this.state = 489;
                this.expression(0);
                this.state = 490;
                this.match(LPCParser.T__10);
                }
                break;
            case 7:
                {
                this.state = 492;
                this.inlineClosureExpression();
                }
                break;
            case 8:
                {
                this.state = 493;
                this.match(LPCParser.NOT);
                this.state = 494;
                this.expression(11);
                }
                break;
            case 9:
                {
                this.state = 495;
                this.match(LPCParser.INC);
                this.state = 496;
                this.expression(10);
                }
                break;
            case 10:
                {
                this.state = 497;
                this.match(LPCParser.DEC);
                this.state = 498;
                this.expression(9);
                }
                break;
            case 11:
                {
                this.state = 499;
                this.assignmentExpression();
                }
                break;
            case 12:
                {
                this.state = 500;
                this.match(LPCParser.Identifier);
                this.state = 501;
                this.match(LPCParser.T__9);
                this.state = 503;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 10 || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & 2684362755) !== 0) || ((((_la - 100)) & ~0x1F) === 0 && ((1 << (_la - 100)) & 125) !== 0)) {
                    {
                    this.state = 502;
                    this.expressionList();
                    }
                }

                this.state = 505;
                this.match(LPCParser.T__10);
                }
                break;
            case 13:
                {
                this.state = 506;
                this.mappingExpression();
                }
                break;
            case 14:
                {
                this.state = 507;
                this.callOtherExpression();
                }
                break;
            case 15:
                {
                this.state = 508;
                this.arrayExpression();
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 600;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 50, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 598;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 49, this.context) ) {
                    case 1:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 511;
                        if (!(this.precpred(this.context, 36))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 36)");
                        }
                        this.state = 512;
                        this.match(LPCParser.PLUS);
                        this.state = 513;
                        this.expression(37);
                        }
                        break;
                    case 2:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 514;
                        if (!(this.precpred(this.context, 35))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 35)");
                        }
                        this.state = 515;
                        this.match(LPCParser.MINUS);
                        this.state = 516;
                        this.expression(36);
                        }
                        break;
                    case 3:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 517;
                        if (!(this.precpred(this.context, 34))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 34)");
                        }
                        this.state = 518;
                        this.match(LPCParser.STAR);
                        this.state = 519;
                        this.expression(35);
                        }
                        break;
                    case 4:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 520;
                        if (!(this.precpred(this.context, 33))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 33)");
                        }
                        this.state = 521;
                        this.match(LPCParser.DIV);
                        this.state = 522;
                        this.expression(34);
                        }
                        break;
                    case 5:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 523;
                        if (!(this.precpred(this.context, 32))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 32)");
                        }
                        this.state = 524;
                        this.match(LPCParser.MOD);
                        this.state = 525;
                        this.expression(33);
                        }
                        break;
                    case 6:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 526;
                        if (!(this.precpred(this.context, 31))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 31)");
                        }
                        this.state = 527;
                        this.match(LPCParser.LT);
                        this.state = 528;
                        this.expression(32);
                        }
                        break;
                    case 7:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 529;
                        if (!(this.precpred(this.context, 30))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 30)");
                        }
                        this.state = 530;
                        this.match(LPCParser.GT);
                        this.state = 531;
                        this.expression(31);
                        }
                        break;
                    case 8:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 532;
                        if (!(this.precpred(this.context, 29))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 29)");
                        }
                        this.state = 533;
                        this.match(LPCParser.LE);
                        this.state = 534;
                        this.expression(30);
                        }
                        break;
                    case 9:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 535;
                        if (!(this.precpred(this.context, 28))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 28)");
                        }
                        this.state = 536;
                        this.match(LPCParser.GE);
                        this.state = 537;
                        this.expression(29);
                        }
                        break;
                    case 10:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 538;
                        if (!(this.precpred(this.context, 27))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 27)");
                        }
                        this.state = 539;
                        this.match(LPCParser.EQ);
                        this.state = 540;
                        this.expression(28);
                        }
                        break;
                    case 11:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 541;
                        if (!(this.precpred(this.context, 26))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 26)");
                        }
                        this.state = 542;
                        this.match(LPCParser.NE);
                        this.state = 543;
                        this.expression(27);
                        }
                        break;
                    case 12:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 544;
                        if (!(this.precpred(this.context, 25))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 25)");
                        }
                        this.state = 545;
                        this.match(LPCParser.AND);
                        this.state = 546;
                        this.expression(26);
                        }
                        break;
                    case 13:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 547;
                        if (!(this.precpred(this.context, 24))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 24)");
                        }
                        this.state = 548;
                        this.match(LPCParser.OR);
                        this.state = 549;
                        this.expression(25);
                        }
                        break;
                    case 14:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 550;
                        if (!(this.precpred(this.context, 23))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 23)");
                        }
                        this.state = 551;
                        this.match(LPCParser.XOR);
                        this.state = 552;
                        this.expression(24);
                        }
                        break;
                    case 15:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 553;
                        if (!(this.precpred(this.context, 22))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 22)");
                        }
                        this.state = 554;
                        this.match(LPCParser.AND_AND);
                        this.state = 555;
                        this.expression(23);
                        }
                        break;
                    case 16:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 556;
                        if (!(this.precpred(this.context, 21))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 21)");
                        }
                        this.state = 557;
                        this.match(LPCParser.OR_OR);
                        this.state = 558;
                        this.expression(22);
                        }
                        break;
                    case 17:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 559;
                        if (!(this.precpred(this.context, 20))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 20)");
                        }
                        this.state = 560;
                        this.match(LPCParser.ADD_ASSIGN);
                        this.state = 561;
                        this.expression(21);
                        }
                        break;
                    case 18:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 562;
                        if (!(this.precpred(this.context, 19))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 19)");
                        }
                        this.state = 563;
                        this.match(LPCParser.SUB_ASSIGN);
                        this.state = 564;
                        this.expression(20);
                        }
                        break;
                    case 19:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 565;
                        if (!(this.precpred(this.context, 18))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 18)");
                        }
                        this.state = 566;
                        this.match(LPCParser.MUL_ASSIGN);
                        this.state = 567;
                        this.expression(19);
                        }
                        break;
                    case 20:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 568;
                        if (!(this.precpred(this.context, 17))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 17)");
                        }
                        this.state = 569;
                        this.match(LPCParser.DIV_ASSIGN);
                        this.state = 570;
                        this.expression(18);
                        }
                        break;
                    case 21:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 571;
                        if (!(this.precpred(this.context, 16))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 16)");
                        }
                        this.state = 572;
                        this.match(LPCParser.MOD_ASSIGN);
                        this.state = 573;
                        this.expression(17);
                        }
                        break;
                    case 22:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 574;
                        if (!(this.precpred(this.context, 15))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 15)");
                        }
                        this.state = 575;
                        this.match(LPCParser.AND_ASSIGN);
                        this.state = 576;
                        this.expression(16);
                        }
                        break;
                    case 23:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 577;
                        if (!(this.precpred(this.context, 14))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 14)");
                        }
                        this.state = 578;
                        this.match(LPCParser.OR_ASSIGN);
                        this.state = 579;
                        this.expression(15);
                        }
                        break;
                    case 24:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 580;
                        if (!(this.precpred(this.context, 13))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 13)");
                        }
                        this.state = 581;
                        this.match(LPCParser.XOR_ASSIGN);
                        this.state = 582;
                        this.expression(14);
                        }
                        break;
                    case 25:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 583;
                        if (!(this.precpred(this.context, 12))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 12)");
                        }
                        this.state = 584;
                        this.match(LPCParser.QUESTION);
                        this.state = 585;
                        this.expression(0);
                        this.state = 586;
                        this.match(LPCParser.COLON);
                        this.state = 587;
                        this.expression(13);
                        }
                        break;
                    case 26:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 589;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 590;
                        this.match(LPCParser.INC);
                        }
                        break;
                    case 27:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 591;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 592;
                        this.match(LPCParser.DEC);
                        }
                        break;
                    case 28:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_expression);
                        this.state = 593;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 594;
                        this.match(LPCParser.T__19);
                        this.state = 595;
                        this.expression(0);
                        this.state = 596;
                        this.match(LPCParser.T__20);
                        }
                        break;
                    }
                    }
                }
                this.state = 602;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 50, this.context);
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
        this.enterRule(localContext, 100, LPCParser.RULE_expressionList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 603;
            this.expression(0);
            this.state = 608;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 85) {
                {
                {
                this.state = 604;
                this.match(LPCParser.COMMA);
                this.state = 605;
                this.expression(0);
                }
                }
                this.state = 610;
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
        case 31:
            return this.typeSpecifier_sempred(localContext as TypeSpecifierContext, predIndex);
        case 49:
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
            return this.precpred(this.context, 36);
        case 2:
            return this.precpred(this.context, 35);
        case 3:
            return this.precpred(this.context, 34);
        case 4:
            return this.precpred(this.context, 33);
        case 5:
            return this.precpred(this.context, 32);
        case 6:
            return this.precpred(this.context, 31);
        case 7:
            return this.precpred(this.context, 30);
        case 8:
            return this.precpred(this.context, 29);
        case 9:
            return this.precpred(this.context, 28);
        case 10:
            return this.precpred(this.context, 27);
        case 11:
            return this.precpred(this.context, 26);
        case 12:
            return this.precpred(this.context, 25);
        case 13:
            return this.precpred(this.context, 24);
        case 14:
            return this.precpred(this.context, 23);
        case 15:
            return this.precpred(this.context, 22);
        case 16:
            return this.precpred(this.context, 21);
        case 17:
            return this.precpred(this.context, 20);
        case 18:
            return this.precpred(this.context, 19);
        case 19:
            return this.precpred(this.context, 18);
        case 20:
            return this.precpred(this.context, 17);
        case 21:
            return this.precpred(this.context, 16);
        case 22:
            return this.precpred(this.context, 15);
        case 23:
            return this.precpred(this.context, 14);
        case 24:
            return this.precpred(this.context, 13);
        case 25:
            return this.precpred(this.context, 12);
        case 26:
            return this.precpred(this.context, 8);
        case 27:
            return this.precpred(this.context, 7);
        case 28:
            return this.precpred(this.context, 5);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,109,612,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
        7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,
        13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
        20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,
        26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,
        33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,
        39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
        46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,1,0,1,0,1,0,5,0,
        106,8,0,10,0,12,0,109,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,128,8,1,10,1,12,1,131,9,1,3,1,
        133,8,1,1,2,1,2,1,2,1,2,3,2,139,8,2,1,2,3,2,142,8,2,1,3,1,3,1,3,
        1,3,1,3,1,3,3,3,150,8,3,1,4,1,4,1,5,1,5,1,6,1,6,1,7,1,7,1,8,1,8,
        1,9,1,9,1,9,1,9,5,9,166,8,9,10,9,12,9,169,9,9,1,9,1,9,1,10,1,10,
        1,11,1,11,1,12,1,12,3,12,179,8,12,1,13,1,13,1,13,3,13,184,8,13,1,
        14,1,14,1,14,1,14,1,15,1,15,1,16,1,16,1,17,1,17,1,17,1,17,1,18,1,
        18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,3,18,207,8,18,1,19,1,19,3,
        19,211,8,19,1,20,1,20,1,21,3,21,216,8,21,1,21,3,21,219,8,21,1,21,
        1,21,1,21,3,21,224,8,21,1,21,1,21,1,21,1,22,1,22,1,22,5,22,232,8,
        22,10,22,12,22,235,9,22,1,23,3,23,238,8,23,1,23,1,23,1,24,1,24,1,
        24,1,24,5,24,246,8,24,10,24,12,24,249,9,24,3,24,251,8,24,1,24,1,
        24,1,25,1,25,1,26,1,26,1,26,1,26,1,26,5,26,262,8,26,10,26,12,26,
        265,9,26,3,26,267,8,26,1,27,1,27,1,27,1,27,5,27,273,8,27,10,27,12,
        27,276,9,27,3,27,278,8,27,1,27,1,27,1,28,1,28,1,28,1,28,1,29,1,29,
        1,29,3,29,289,8,29,1,29,1,29,1,29,3,29,294,8,29,5,29,296,8,29,10,
        29,12,29,299,9,29,1,29,1,29,1,30,1,30,1,31,1,31,1,31,1,31,1,31,5,
        31,310,8,31,10,31,12,31,313,9,31,1,32,1,32,1,32,5,32,318,8,32,10,
        32,12,32,321,9,32,3,32,323,8,32,1,32,1,32,1,33,1,33,1,33,1,33,1,
        33,1,33,1,33,1,33,3,33,335,8,33,1,34,1,34,1,34,1,35,1,35,5,35,342,
        8,35,10,35,12,35,345,9,35,1,35,1,35,1,36,1,36,3,36,351,8,36,1,37,
        1,37,1,37,1,37,1,37,1,37,1,37,1,38,1,38,1,38,1,39,1,39,1,39,1,39,
        1,39,1,39,1,40,1,40,5,40,371,8,40,10,40,12,40,374,9,40,1,40,3,40,
        377,8,40,1,41,1,41,1,41,1,41,1,41,1,41,1,41,5,41,386,8,41,10,41,
        12,41,389,9,41,1,41,1,41,1,42,1,42,1,42,1,42,3,42,397,8,42,1,43,
        1,43,1,43,1,43,5,43,403,8,43,10,43,12,43,406,9,43,1,44,1,44,1,44,
        5,44,411,8,44,10,44,12,44,414,9,44,1,45,1,45,1,45,1,45,1,45,1,45,
        1,45,1,45,1,45,1,45,1,45,1,45,1,45,1,45,1,45,1,45,1,45,3,45,433,
        8,45,1,45,1,45,3,45,437,8,45,1,45,1,45,3,45,441,8,45,1,45,1,45,1,
        45,1,45,1,45,1,45,1,45,1,45,1,45,1,45,1,45,3,45,454,8,45,1,46,1,
        46,1,46,1,46,1,46,1,46,3,46,462,8,46,1,46,3,46,465,8,46,1,47,1,47,
        1,47,1,47,1,47,3,47,472,8,47,1,48,1,48,1,48,1,48,1,48,3,48,479,8,
        48,1,48,1,48,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,
        49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,3,49,504,8,
        49,1,49,1,49,1,49,1,49,3,49,510,8,49,1,49,1,49,1,49,1,49,1,49,1,
        49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,
        49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,
        49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,
        49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,
        49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,
        49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,
        49,1,49,1,49,1,49,5,49,599,8,49,10,49,12,49,602,9,49,1,50,1,50,1,
        50,5,50,607,8,50,10,50,12,50,610,9,50,1,50,0,2,62,98,51,0,2,4,6,
        8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,
        52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,
        96,98,100,0,10,2,0,2,2,31,31,2,0,3,5,38,38,1,0,6,8,3,0,102,102,104,
        104,106,106,1,0,57,60,2,0,102,102,104,105,5,0,25,26,34,34,40,42,
        46,49,53,54,2,0,102,102,104,104,2,0,39,39,83,83,2,0,104,104,106,
        106,665,0,107,1,0,0,0,2,132,1,0,0,0,4,134,1,0,0,0,6,149,1,0,0,0,
        8,151,1,0,0,0,10,153,1,0,0,0,12,155,1,0,0,0,14,157,1,0,0,0,16,159,
        1,0,0,0,18,161,1,0,0,0,20,172,1,0,0,0,22,174,1,0,0,0,24,178,1,0,
        0,0,26,180,1,0,0,0,28,185,1,0,0,0,30,189,1,0,0,0,32,191,1,0,0,0,
        34,193,1,0,0,0,36,206,1,0,0,0,38,210,1,0,0,0,40,212,1,0,0,0,42,215,
        1,0,0,0,44,228,1,0,0,0,46,237,1,0,0,0,48,241,1,0,0,0,50,254,1,0,
        0,0,52,256,1,0,0,0,54,268,1,0,0,0,56,281,1,0,0,0,58,285,1,0,0,0,
        60,302,1,0,0,0,62,304,1,0,0,0,64,314,1,0,0,0,66,334,1,0,0,0,68,336,
        1,0,0,0,70,339,1,0,0,0,72,350,1,0,0,0,74,352,1,0,0,0,76,359,1,0,
        0,0,78,362,1,0,0,0,80,368,1,0,0,0,82,378,1,0,0,0,84,396,1,0,0,0,
        86,398,1,0,0,0,88,407,1,0,0,0,90,453,1,0,0,0,92,464,1,0,0,0,94,471,
        1,0,0,0,96,473,1,0,0,0,98,509,1,0,0,0,100,603,1,0,0,0,102,106,3,
        38,19,0,103,106,3,2,1,0,104,106,3,34,17,0,105,102,1,0,0,0,105,103,
        1,0,0,0,105,104,1,0,0,0,106,109,1,0,0,0,107,105,1,0,0,0,107,108,
        1,0,0,0,108,110,1,0,0,0,109,107,1,0,0,0,110,111,5,0,0,1,111,1,1,
        0,0,0,112,133,3,6,3,0,113,114,5,1,0,0,114,115,3,12,6,0,115,116,3,
        14,7,0,116,133,1,0,0,0,117,133,3,4,2,0,118,119,5,1,0,0,119,120,3,
        22,11,0,120,121,3,24,12,0,121,133,1,0,0,0,122,123,5,1,0,0,123,124,
        3,32,16,0,124,129,5,106,0,0,125,126,5,85,0,0,126,128,5,106,0,0,127,
        125,1,0,0,0,128,131,1,0,0,0,129,127,1,0,0,0,129,130,1,0,0,0,130,
        133,1,0,0,0,131,129,1,0,0,0,132,112,1,0,0,0,132,113,1,0,0,0,132,
        117,1,0,0,0,132,118,1,0,0,0,132,122,1,0,0,0,133,3,1,0,0,0,134,135,
        5,1,0,0,135,136,3,16,8,0,136,138,5,106,0,0,137,139,3,18,9,0,138,
        137,1,0,0,0,138,139,1,0,0,0,139,141,1,0,0,0,140,142,3,20,10,0,141,
        140,1,0,0,0,141,142,1,0,0,0,142,5,1,0,0,0,143,144,5,1,0,0,144,145,
        3,10,5,0,145,146,3,14,7,0,146,150,1,0,0,0,147,148,5,1,0,0,148,150,
        3,8,4,0,149,143,1,0,0,0,149,147,1,0,0,0,150,7,1,0,0,0,151,152,7,
        0,0,0,152,9,1,0,0,0,153,154,7,1,0,0,154,11,1,0,0,0,155,156,7,2,0,
        0,156,13,1,0,0,0,157,158,7,3,0,0,158,15,1,0,0,0,159,160,5,9,0,0,
        160,17,1,0,0,0,161,162,5,10,0,0,162,167,5,106,0,0,163,164,5,85,0,
        0,164,166,5,106,0,0,165,163,1,0,0,0,166,169,1,0,0,0,167,165,1,0,
        0,0,167,168,1,0,0,0,168,170,1,0,0,0,169,167,1,0,0,0,170,171,5,11,
        0,0,171,19,1,0,0,0,172,173,3,98,49,0,173,21,1,0,0,0,174,175,5,12,
        0,0,175,23,1,0,0,0,176,179,3,28,14,0,177,179,3,30,15,0,178,176,1,
        0,0,0,178,177,1,0,0,0,179,25,1,0,0,0,180,183,5,106,0,0,181,182,5,
        13,0,0,182,184,5,106,0,0,183,181,1,0,0,0,183,184,1,0,0,0,184,27,
        1,0,0,0,185,186,5,70,0,0,186,187,3,26,13,0,187,188,5,71,0,0,188,
        29,1,0,0,0,189,190,5,104,0,0,190,31,1,0,0,0,191,192,5,14,0,0,192,
        33,1,0,0,0,193,194,5,15,0,0,194,195,5,104,0,0,195,196,5,84,0,0,196,
        35,1,0,0,0,197,198,5,86,0,0,198,199,3,98,49,0,199,200,5,84,0,0,200,
        207,1,0,0,0,201,202,5,104,0,0,202,203,5,86,0,0,203,204,3,98,49,0,
        204,205,5,84,0,0,205,207,1,0,0,0,206,197,1,0,0,0,206,201,1,0,0,0,
        207,37,1,0,0,0,208,211,3,42,21,0,209,211,3,58,29,0,210,208,1,0,0,
        0,210,209,1,0,0,0,211,39,1,0,0,0,212,213,7,4,0,0,213,41,1,0,0,0,
        214,216,3,40,20,0,215,214,1,0,0,0,215,216,1,0,0,0,216,218,1,0,0,
        0,217,219,3,62,31,0,218,217,1,0,0,0,218,219,1,0,0,0,219,220,1,0,
        0,0,220,221,5,106,0,0,221,223,5,10,0,0,222,224,3,44,22,0,223,222,
        1,0,0,0,223,224,1,0,0,0,224,225,1,0,0,0,225,226,5,11,0,0,226,227,
        3,70,35,0,227,43,1,0,0,0,228,233,3,46,23,0,229,230,5,85,0,0,230,
        232,3,46,23,0,231,229,1,0,0,0,232,235,1,0,0,0,233,231,1,0,0,0,233,
        234,1,0,0,0,234,45,1,0,0,0,235,233,1,0,0,0,236,238,3,62,31,0,237,
        236,1,0,0,0,237,238,1,0,0,0,238,239,1,0,0,0,239,240,5,106,0,0,240,
        47,1,0,0,0,241,250,5,95,0,0,242,247,3,98,49,0,243,244,5,85,0,0,244,
        246,3,98,49,0,245,243,1,0,0,0,246,249,1,0,0,0,247,245,1,0,0,0,247,
        248,1,0,0,0,248,251,1,0,0,0,249,247,1,0,0,0,250,242,1,0,0,0,250,
        251,1,0,0,0,251,252,1,0,0,0,252,253,5,96,0,0,253,49,1,0,0,0,254,
        255,7,5,0,0,255,51,1,0,0,0,256,266,3,50,25,0,257,258,5,83,0,0,258,
        263,3,98,49,0,259,260,5,84,0,0,260,262,3,98,49,0,261,259,1,0,0,0,
        262,265,1,0,0,0,263,261,1,0,0,0,263,264,1,0,0,0,264,267,1,0,0,0,
        265,263,1,0,0,0,266,257,1,0,0,0,266,267,1,0,0,0,267,53,1,0,0,0,268,
        277,5,97,0,0,269,274,3,52,26,0,270,271,5,85,0,0,271,273,3,52,26,
        0,272,270,1,0,0,0,273,276,1,0,0,0,274,272,1,0,0,0,274,275,1,0,0,
        0,275,278,1,0,0,0,276,274,1,0,0,0,277,269,1,0,0,0,277,278,1,0,0,
        0,278,279,1,0,0,0,279,280,5,98,0,0,280,55,1,0,0,0,281,282,5,106,
        0,0,282,283,5,16,0,0,283,284,3,98,49,0,284,57,1,0,0,0,285,288,3,
        62,31,0,286,289,5,106,0,0,287,289,3,56,28,0,288,286,1,0,0,0,288,
        287,1,0,0,0,289,297,1,0,0,0,290,293,5,85,0,0,291,294,5,106,0,0,292,
        294,3,56,28,0,293,291,1,0,0,0,293,292,1,0,0,0,294,296,1,0,0,0,295,
        290,1,0,0,0,296,299,1,0,0,0,297,295,1,0,0,0,297,298,1,0,0,0,298,
        300,1,0,0,0,299,297,1,0,0,0,300,301,5,84,0,0,301,59,1,0,0,0,302,
        303,7,6,0,0,303,61,1,0,0,0,304,305,6,31,-1,0,305,306,3,60,30,0,306,
        311,1,0,0,0,307,308,10,1,0,0,308,310,5,63,0,0,309,307,1,0,0,0,310,
        313,1,0,0,0,311,309,1,0,0,0,311,312,1,0,0,0,312,63,1,0,0,0,313,311,
        1,0,0,0,314,322,5,100,0,0,315,323,3,98,49,0,316,318,3,66,33,0,317,
        316,1,0,0,0,318,321,1,0,0,0,319,317,1,0,0,0,319,320,1,0,0,0,320,
        323,1,0,0,0,321,319,1,0,0,0,322,315,1,0,0,0,322,319,1,0,0,0,323,
        324,1,0,0,0,324,325,5,101,0,0,325,65,1,0,0,0,326,335,3,68,34,0,327,
        335,3,70,35,0,328,335,3,72,36,0,329,335,3,90,45,0,330,335,3,92,46,
        0,331,335,3,58,29,0,332,335,3,36,18,0,333,335,3,6,3,0,334,326,1,
        0,0,0,334,327,1,0,0,0,334,328,1,0,0,0,334,329,1,0,0,0,334,330,1,
        0,0,0,334,331,1,0,0,0,334,332,1,0,0,0,334,333,1,0,0,0,335,67,1,0,
        0,0,336,337,3,98,49,0,337,338,5,84,0,0,338,69,1,0,0,0,339,343,5,
        17,0,0,340,342,3,66,33,0,341,340,1,0,0,0,342,345,1,0,0,0,343,341,
        1,0,0,0,343,344,1,0,0,0,344,346,1,0,0,0,345,343,1,0,0,0,346,347,
        5,18,0,0,347,71,1,0,0,0,348,351,3,80,40,0,349,351,3,82,41,0,350,
        348,1,0,0,0,350,349,1,0,0,0,351,73,1,0,0,0,352,353,5,31,0,0,353,
        354,5,38,0,0,354,355,5,10,0,0,355,356,3,98,49,0,356,357,5,11,0,0,
        357,358,3,66,33,0,358,75,1,0,0,0,359,360,5,31,0,0,360,361,3,66,33,
        0,361,77,1,0,0,0,362,363,5,38,0,0,363,364,5,10,0,0,364,365,3,98,
        49,0,365,366,5,11,0,0,366,367,3,66,33,0,367,79,1,0,0,0,368,372,3,
        78,39,0,369,371,3,74,37,0,370,369,1,0,0,0,371,374,1,0,0,0,372,370,
        1,0,0,0,372,373,1,0,0,0,373,376,1,0,0,0,374,372,1,0,0,0,375,377,
        3,76,38,0,376,375,1,0,0,0,376,377,1,0,0,0,377,81,1,0,0,0,378,379,
        5,50,0,0,379,380,5,10,0,0,380,381,3,98,49,0,381,382,5,11,0,0,382,
        387,5,17,0,0,383,386,3,86,43,0,384,386,3,88,44,0,385,383,1,0,0,0,
        385,384,1,0,0,0,386,389,1,0,0,0,387,385,1,0,0,0,387,388,1,0,0,0,
        388,390,1,0,0,0,389,387,1,0,0,0,390,391,5,18,0,0,391,83,1,0,0,0,
        392,397,7,7,0,0,393,394,7,7,0,0,394,395,5,19,0,0,395,397,7,7,0,0,
        396,392,1,0,0,0,396,393,1,0,0,0,397,85,1,0,0,0,398,399,5,24,0,0,
        399,400,3,84,42,0,400,404,5,83,0,0,401,403,3,66,33,0,402,401,1,0,
        0,0,403,406,1,0,0,0,404,402,1,0,0,0,404,405,1,0,0,0,405,87,1,0,0,
        0,406,404,1,0,0,0,407,408,5,29,0,0,408,412,5,83,0,0,409,411,3,66,
        33,0,410,409,1,0,0,0,411,414,1,0,0,0,412,410,1,0,0,0,412,413,1,0,
        0,0,413,89,1,0,0,0,414,412,1,0,0,0,415,416,5,56,0,0,416,417,5,10,
        0,0,417,418,3,98,49,0,418,419,5,11,0,0,419,420,3,66,33,0,420,454,
        1,0,0,0,421,422,5,30,0,0,422,423,3,66,33,0,423,424,5,56,0,0,424,
        425,5,10,0,0,425,426,3,98,49,0,426,427,5,11,0,0,427,428,5,84,0,0,
        428,454,1,0,0,0,429,430,5,35,0,0,430,432,5,10,0,0,431,433,3,98,49,
        0,432,431,1,0,0,0,432,433,1,0,0,0,433,434,1,0,0,0,434,436,5,84,0,
        0,435,437,3,98,49,0,436,435,1,0,0,0,436,437,1,0,0,0,437,438,1,0,
        0,0,438,440,5,84,0,0,439,441,3,98,49,0,440,439,1,0,0,0,440,441,1,
        0,0,0,441,442,1,0,0,0,442,443,5,11,0,0,443,454,3,66,33,0,444,445,
        5,36,0,0,445,446,5,10,0,0,446,447,3,62,31,0,447,448,5,106,0,0,448,
        449,7,8,0,0,449,450,3,98,49,0,450,451,5,11,0,0,451,452,3,66,33,0,
        452,454,1,0,0,0,453,415,1,0,0,0,453,421,1,0,0,0,453,429,1,0,0,0,
        453,444,1,0,0,0,454,91,1,0,0,0,455,456,5,23,0,0,456,465,5,84,0,0,
        457,458,5,28,0,0,458,465,5,84,0,0,459,461,5,44,0,0,460,462,3,98,
        49,0,461,460,1,0,0,0,461,462,1,0,0,0,462,463,1,0,0,0,463,465,5,84,
        0,0,464,455,1,0,0,0,464,457,1,0,0,0,464,459,1,0,0,0,465,93,1,0,0,
        0,466,472,5,106,0,0,467,468,5,10,0,0,468,469,5,106,0,0,469,472,5,
        11,0,0,470,472,5,104,0,0,471,466,1,0,0,0,471,467,1,0,0,0,471,470,
        1,0,0,0,472,95,1,0,0,0,473,474,7,9,0,0,474,475,5,99,0,0,475,476,
        3,94,47,0,476,478,5,10,0,0,477,479,3,100,50,0,478,477,1,0,0,0,478,
        479,1,0,0,0,479,480,1,0,0,0,480,481,5,11,0,0,481,97,1,0,0,0,482,
        483,6,49,-1,0,483,510,5,106,0,0,484,510,5,102,0,0,485,510,5,103,
        0,0,486,510,5,104,0,0,487,510,5,105,0,0,488,489,5,10,0,0,489,490,
        3,98,49,0,490,491,5,11,0,0,491,510,1,0,0,0,492,510,3,64,32,0,493,
        494,5,79,0,0,494,510,3,98,49,11,495,496,5,66,0,0,496,510,3,98,49,
        10,497,498,5,67,0,0,498,510,3,98,49,9,499,510,3,56,28,0,500,501,
        5,106,0,0,501,503,5,10,0,0,502,504,3,100,50,0,503,502,1,0,0,0,503,
        504,1,0,0,0,504,505,1,0,0,0,505,510,5,11,0,0,506,510,3,54,27,0,507,
        510,3,96,48,0,508,510,3,48,24,0,509,482,1,0,0,0,509,484,1,0,0,0,
        509,485,1,0,0,0,509,486,1,0,0,0,509,487,1,0,0,0,509,488,1,0,0,0,
        509,492,1,0,0,0,509,493,1,0,0,0,509,495,1,0,0,0,509,497,1,0,0,0,
        509,499,1,0,0,0,509,500,1,0,0,0,509,506,1,0,0,0,509,507,1,0,0,0,
        509,508,1,0,0,0,510,600,1,0,0,0,511,512,10,36,0,0,512,513,5,61,0,
        0,513,599,3,98,49,37,514,515,10,35,0,0,515,516,5,62,0,0,516,599,
        3,98,49,36,517,518,10,34,0,0,518,519,5,63,0,0,519,599,3,98,49,35,
        520,521,10,33,0,0,521,522,5,64,0,0,522,599,3,98,49,34,523,524,10,
        32,0,0,524,525,5,65,0,0,525,599,3,98,49,33,526,527,10,31,0,0,527,
        528,5,70,0,0,528,599,3,98,49,32,529,530,10,30,0,0,530,531,5,71,0,
        0,531,599,3,98,49,31,532,533,10,29,0,0,533,534,5,72,0,0,534,599,
        3,98,49,30,535,536,10,28,0,0,536,537,5,73,0,0,537,599,3,98,49,29,
        538,539,10,27,0,0,539,540,5,74,0,0,540,599,3,98,49,28,541,542,10,
        26,0,0,542,543,5,75,0,0,543,599,3,98,49,27,544,545,10,25,0,0,545,
        546,5,76,0,0,546,599,3,98,49,26,547,548,10,24,0,0,548,549,5,77,0,
        0,549,599,3,98,49,25,550,551,10,23,0,0,551,552,5,78,0,0,552,599,
        3,98,49,24,553,554,10,22,0,0,554,555,5,80,0,0,555,599,3,98,49,23,
        556,557,10,21,0,0,557,558,5,81,0,0,558,599,3,98,49,22,559,560,10,
        20,0,0,560,561,5,87,0,0,561,599,3,98,49,21,562,563,10,19,0,0,563,
        564,5,88,0,0,564,599,3,98,49,20,565,566,10,18,0,0,566,567,5,89,0,
        0,567,599,3,98,49,19,568,569,10,17,0,0,569,570,5,90,0,0,570,599,
        3,98,49,18,571,572,10,16,0,0,572,573,5,91,0,0,573,599,3,98,49,17,
        574,575,10,15,0,0,575,576,5,92,0,0,576,599,3,98,49,16,577,578,10,
        14,0,0,578,579,5,93,0,0,579,599,3,98,49,15,580,581,10,13,0,0,581,
        582,5,94,0,0,582,599,3,98,49,14,583,584,10,12,0,0,584,585,5,82,0,
        0,585,586,3,98,49,0,586,587,5,83,0,0,587,588,3,98,49,13,588,599,
        1,0,0,0,589,590,10,8,0,0,590,599,5,66,0,0,591,592,10,7,0,0,592,599,
        5,67,0,0,593,594,10,5,0,0,594,595,5,20,0,0,595,596,3,98,49,0,596,
        597,5,21,0,0,597,599,1,0,0,0,598,511,1,0,0,0,598,514,1,0,0,0,598,
        517,1,0,0,0,598,520,1,0,0,0,598,523,1,0,0,0,598,526,1,0,0,0,598,
        529,1,0,0,0,598,532,1,0,0,0,598,535,1,0,0,0,598,538,1,0,0,0,598,
        541,1,0,0,0,598,544,1,0,0,0,598,547,1,0,0,0,598,550,1,0,0,0,598,
        553,1,0,0,0,598,556,1,0,0,0,598,559,1,0,0,0,598,562,1,0,0,0,598,
        565,1,0,0,0,598,568,1,0,0,0,598,571,1,0,0,0,598,574,1,0,0,0,598,
        577,1,0,0,0,598,580,1,0,0,0,598,583,1,0,0,0,598,589,1,0,0,0,598,
        591,1,0,0,0,598,593,1,0,0,0,599,602,1,0,0,0,600,598,1,0,0,0,600,
        601,1,0,0,0,601,99,1,0,0,0,602,600,1,0,0,0,603,608,3,98,49,0,604,
        605,5,85,0,0,605,607,3,98,49,0,606,604,1,0,0,0,607,610,1,0,0,0,608,
        606,1,0,0,0,608,609,1,0,0,0,609,101,1,0,0,0,610,608,1,0,0,0,52,105,
        107,129,132,138,141,149,167,178,183,206,210,215,218,223,233,237,
        247,250,263,266,274,277,288,293,297,311,319,322,334,343,350,372,
        376,385,387,396,404,412,432,436,440,453,461,464,471,478,503,509,
        598,600,608
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


export class SelectionDirectiveContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterSelectionDirective) {
             listener.enterSelectionDirective(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitSelectionDirective) {
             listener.exitSelectionDirective(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public ELSE(): antlr.TerminalNode {
        return this.getToken(LPCParser.ELSE, 0)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_selectionDirectiveTypeSingle;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterSelectionDirectiveTypeSingle) {
             listener.enterSelectionDirectiveTypeSingle(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitSelectionDirectiveTypeSingle) {
             listener.exitSelectionDirectiveTypeSingle(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public IF(): antlr.TerminalNode {
        return this.getToken(LPCParser.IF, 0)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_selectionDirectiveTypeWithArg;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterSelectionDirectiveTypeWithArg) {
             listener.enterSelectionDirectiveTypeWithArg(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitSelectionDirectiveTypeWithArg) {
             listener.exitSelectionDirectiveTypeWithArg(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public SEMI(): antlr.TerminalNode {
        return this.getToken(LPCParser.SEMI, 0)!;
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


export class AssignmentExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_assignmentExpression;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterAssignmentExpression) {
             listener.enterAssignmentExpression(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitAssignmentExpression) {
             listener.exitAssignmentExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
        if (visitor.visitAssignmentExpression) {
            return visitor.visitAssignmentExpression(this);
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
    public selectionDirective(): SelectionDirectiveContext | null {
        return this.getRuleContext(0, SelectionDirectiveContext);
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
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_elseIfExpression;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterElseIfExpression) {
             listener.enterElseIfExpression(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitElseIfExpression) {
             listener.exitElseIfExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public override enterRule(listener: LPCListener): void {
        if(listener.enterElseExpression) {
             listener.enterElseExpression(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitElseExpression) {
             listener.exitElseExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_ifExpression;
    }
    public override enterRule(listener: LPCListener): void {
        if(listener.enterIfExpression) {
             listener.enterIfExpression(this);
        }
    }
    public override exitRule(listener: LPCListener): void {
        if(listener.exitIfExpression) {
             listener.exitIfExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCVisitor<Result>): Result | null {
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
    public assignmentExpression(): AssignmentExpressionContext | null {
        return this.getRuleContext(0, AssignmentExpressionContext);
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

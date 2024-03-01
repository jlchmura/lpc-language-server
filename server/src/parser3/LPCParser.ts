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
    public static readonly NOMASK = 52;
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
    public static readonly BNOT = 73;
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
    public static readonly SHL_ASSIGN = 93;
    public static readonly ARRAY_OPEN = 94;
    public static readonly ARRAY_CLOSE = 95;
    public static readonly MAPPING_OPEN = 96;
    public static readonly ARROW = 97;
    public static readonly PAREN_OPEN = 98;
    public static readonly PAREN_CLOSE = 99;
    public static readonly CURLY_OPEN = 100;
    public static readonly CURLY_CLOSE = 101;
    public static readonly SQUARE_OPEN = 102;
    public static readonly SQUARE_CLOSE = 103;
    public static readonly BACKSLASH = 104;
    public static readonly IntegerConstant = 105;
    public static readonly FloatingConstant = 106;
    public static readonly HexIntConstant = 107;
    public static readonly STRING_START = 108;
    public static readonly StringLiteral = 109;
    public static readonly CharacterConstant = 110;
    public static readonly CloneObject = 111;
    public static readonly LoadObject = 112;
    public static readonly COMMENT = 113;
    public static readonly LINE_COMMENT = 114;
    public static readonly DEFINE = 115;
    public static readonly WS = 116;
    public static readonly END_DEFINE = 117;
    public static readonly STRING_END = 118;
    public static readonly NEWLINE = 119;
    public static readonly RULE_program = 0;
    public static readonly RULE_preprocessorDirective = 1;
    public static readonly RULE_includeDirective = 2;
    public static readonly RULE_definePreprocessorDirective = 3;
    public static readonly RULE_selectionDirective = 4;
    public static readonly RULE_selectionDirectiveTypeSingle = 5;
    public static readonly RULE_selectionDirectiveTypeWithArg = 6;
    public static readonly RULE_directiveTypeWithArguments = 7;
    public static readonly RULE_directiveArgument = 8;
    public static readonly RULE_directiveDefineParam = 9;
    public static readonly RULE_directiveDefineArgument = 10;
    public static readonly RULE_directiveTypeInclude = 11;
    public static readonly RULE_directiveIncludeFile = 12;
    public static readonly RULE_directiveIncludeFilename = 13;
    public static readonly RULE_directiveIncludeFileGlobal = 14;
    public static readonly RULE_directiveIncludeFileLocal = 15;
    public static readonly RULE_directiveTypePragma = 16;
    public static readonly RULE_inheritStatement = 17;
    public static readonly RULE_inheritSuperExpression = 18;
    public static readonly RULE_declaration = 19;
    public static readonly RULE_functionModifier = 20;
    public static readonly RULE_functionHeader = 21;
    public static readonly RULE_functionHeaderDeclaration = 22;
    public static readonly RULE_functionDeclaration = 23;
    public static readonly RULE_parameterList = 24;
    public static readonly RULE_parameter = 25;
    public static readonly RULE_structDeclaration = 26;
    public static readonly RULE_structMemberDeclaration = 27;
    public static readonly RULE_arrayExpression = 28;
    public static readonly RULE_mappingContent = 29;
    public static readonly RULE_mappingExpression = 30;
    public static readonly RULE_variableModifier = 31;
    public static readonly RULE_variableDeclaration = 32;
    public static readonly RULE_variableDeclarator = 33;
    public static readonly RULE_variableInitializer = 34;
    public static readonly RULE_primitiveTypeSpecifier = 35;
    public static readonly RULE_indexerArgument = 36;
    public static readonly RULE_methodInvocation = 37;
    public static readonly RULE_arrayTypeSpecifier = 38;
    public static readonly RULE_typeSpecifier = 39;
    public static readonly RULE_inlineClosureExpression = 40;
    public static readonly RULE_statement = 41;
    public static readonly RULE_expressionStatement = 42;
    public static readonly RULE_block = 43;
    public static readonly RULE_selectionStatement = 44;
    public static readonly RULE_elseIfExpression = 45;
    public static readonly RULE_elseExpression = 46;
    public static readonly RULE_ifExpression = 47;
    public static readonly RULE_ifStatement = 48;
    public static readonly RULE_switchStatement = 49;
    public static readonly RULE_caseExpression = 50;
    public static readonly RULE_caseStatement = 51;
    public static readonly RULE_defaultStatement = 52;
    public static readonly RULE_iterationStatement = 53;
    public static readonly RULE_returnStatement = 54;
    public static readonly RULE_jumpStatement = 55;
    public static readonly RULE_callOtherTarget = 56;
    public static readonly RULE_lambdaExpression = 57;
    public static readonly RULE_rightShiftAssignment = 58;
    public static readonly RULE_literal = 59;
    public static readonly RULE_castExpression = 60;
    public static readonly RULE_assignmentOperator = 61;
    public static readonly RULE_conditionalExpressionBase = 62;
    public static readonly RULE_unaryExpression = 63;
    public static readonly RULE_primaryExpression = 64;
    public static readonly RULE_callOtherExpression = 65;
    public static readonly RULE_primaryExpressionStart = 66;
    public static readonly RULE_expression = 67;
    public static readonly RULE_catchExpr = 68;
    public static readonly RULE_bracketExpression = 69;
    public static readonly RULE_argument = 70;
    public static readonly RULE_argumentList = 71;
    public static readonly RULE_expressionList = 72;
    public static readonly RULE_assignmentExpression = 73;
    public static readonly RULE_nonAssignmentExpression = 74;

    public static readonly literalNames = [
        null, null, "'break'", "'case'", "'catch'", "'char'", "'closure'", 
        "'const'", "'continue'", "'default'", "'do'", "'echo'", "'else'", 
        "'elif'", "'endif'", "'enum'", "'extern'", "'float'", "'for'", "'foreach'", 
        "'goto'", "'#'", "'if'", "'ifdef'", "'ifndef'", "'in'", "'include'", 
        "'inherit'", "'int'", "'line'", "'mapping'", "'mixed'", "'object'", 
        "'pragma'", "'return'", "'status'", "'struct'", "'string'", "'symbol'", 
        "'switch'", "'typedef'", "'union'", "'unknown'", "'undef'", "'void'", 
        "'volatile'", "'while'", "'private'", "'protected'", "'public'", 
        "'static'", "'noshadow'", "'nomask'", "'varargs'", "'+'", "'-'", 
        "'*'", "'/'", "'%'", "'++'", "'--'", "'<<'", "'>>'", "'<'", "'>'", 
        "'<='", "'>='", "'=='", "'!='", "'&'", "'|'", "'^'", "'!'", "'~'", 
        "'&&'", "'||'", "'?'", "':'", "';'", "','", "'..'", "'.'", "'''", 
        "'::'", "'='", "'+='", "'-='", "'*='", "'/='", "'%='", "'&='", "'|='", 
        "'^='", "'<<='", "'({'", "'})'", "'(['", "'->'", "'('", "')'", "'{'", 
        "'}'", "'['", "']'", "'\\'", null, null, null, null, null, null, 
        "'clone_object'", "'load_object'", null, null, null, null, "'\\n'", 
        null, "'\\\\n'"
    ];

    public static readonly symbolicNames = [
        null, "Identifier", "BREAK", "CASE", "CATCH", "CHAR", "CLOSURE", 
        "CONST", "CONTINUE", "DEFAULT", "DO", "ECHO", "ELSE", "ELIF", "ENDIF", 
        "ENUM", "EXTERN", "FLOAT", "FOR", "FOREACH", "GOTO", "HASH", "IF", 
        "IFDEF", "IFNDEF", "IN", "INCLUDE", "INHERIT", "INT", "LINE", "MAPPING", 
        "MIXED", "OBJECT", "PRAGMA", "RETURN", "STATUS", "STRUCT", "STRING", 
        "SYMBOL", "SWITCH", "TYPEDEF", "UNION", "UNKNOWN", "UNDEF", "VOID", 
        "VOLATILE", "WHILE", "PRIVATE", "PROTECTED", "PUBLIC", "STATIC", 
        "NOSHADOW", "NOMASK", "VARARGS", "PLUS", "MINUS", "STAR", "DIV", 
        "MOD", "INC", "DEC", "SHL", "SHR", "LT", "GT", "LE", "GE", "EQ", 
        "NE", "AND", "OR", "XOR", "NOT", "BNOT", "AND_AND", "OR_OR", "QUESTION", 
        "COLON", "SEMI", "COMMA", "DOUBLEDOT", "DOT", "SINGLEQUOT", "SUPER_ACCESSOR", 
        "ASSIGN", "ADD_ASSIGN", "SUB_ASSIGN", "MUL_ASSIGN", "DIV_ASSIGN", 
        "MOD_ASSIGN", "AND_ASSIGN", "OR_ASSIGN", "XOR_ASSIGN", "SHL_ASSIGN", 
        "ARRAY_OPEN", "ARRAY_CLOSE", "MAPPING_OPEN", "ARROW", "PAREN_OPEN", 
        "PAREN_CLOSE", "CURLY_OPEN", "CURLY_CLOSE", "SQUARE_OPEN", "SQUARE_CLOSE", 
        "BACKSLASH", "IntegerConstant", "FloatingConstant", "HexIntConstant", 
        "STRING_START", "StringLiteral", "CharacterConstant", "CloneObject", 
        "LoadObject", "COMMENT", "LINE_COMMENT", "DEFINE", "WS", "END_DEFINE", 
        "STRING_END", "NEWLINE"
    ];
    public static readonly ruleNames = [
        "program", "preprocessorDirective", "includeDirective", "definePreprocessorDirective", 
        "selectionDirective", "selectionDirectiveTypeSingle", "selectionDirectiveTypeWithArg", 
        "directiveTypeWithArguments", "directiveArgument", "directiveDefineParam", 
        "directiveDefineArgument", "directiveTypeInclude", "directiveIncludeFile", 
        "directiveIncludeFilename", "directiveIncludeFileGlobal", "directiveIncludeFileLocal", 
        "directiveTypePragma", "inheritStatement", "inheritSuperExpression", 
        "declaration", "functionModifier", "functionHeader", "functionHeaderDeclaration", 
        "functionDeclaration", "parameterList", "parameter", "structDeclaration", 
        "structMemberDeclaration", "arrayExpression", "mappingContent", 
        "mappingExpression", "variableModifier", "variableDeclaration", 
        "variableDeclarator", "variableInitializer", "primitiveTypeSpecifier", 
        "indexerArgument", "methodInvocation", "arrayTypeSpecifier", "typeSpecifier", 
        "inlineClosureExpression", "statement", "expressionStatement", "block", 
        "selectionStatement", "elseIfExpression", "elseExpression", "ifExpression", 
        "ifStatement", "switchStatement", "caseExpression", "caseStatement", 
        "defaultStatement", "iterationStatement", "returnStatement", "jumpStatement", 
        "callOtherTarget", "lambdaExpression", "rightShiftAssignment", "literal", 
        "castExpression", "assignmentOperator", "conditionalExpressionBase", 
        "unaryExpression", "primaryExpression", "callOtherExpression", "primaryExpressionStart", 
        "expression", "catchExpr", "bracketExpression", "argument", "argumentList", 
        "expressionList", "assignmentExpression", "nonAssignmentExpression",
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
            this.state = 155;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3626106978) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 20943993) !== 0) || _la === 115) {
                {
                this.state = 153;
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
                    this.state = 150;
                    this.declaration();
                    }
                    break;
                case LPCParser.HASH:
                case LPCParser.DEFINE:
                    {
                    this.state = 151;
                    this.preprocessorDirective();
                    }
                    break;
                case LPCParser.INHERIT:
                    {
                    this.state = 152;
                    this.inheritStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 157;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 158;
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
            this.state = 177;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 160;
                this.selectionDirective();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 161;
                this.match(LPCParser.HASH);
                this.state = 162;
                this.directiveTypeWithArguments();
                this.state = 163;
                this.directiveArgument();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 165;
                this.definePreprocessorDirective();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 166;
                this.includeDirective();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 167;
                this.match(LPCParser.HASH);
                this.state = 168;
                this.directiveTypePragma();
                this.state = 169;
                this.match(LPCParser.Identifier);
                this.state = 174;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 79) {
                    {
                    {
                    this.state = 170;
                    this.match(LPCParser.COMMA);
                    this.state = 171;
                    this.match(LPCParser.Identifier);
                    }
                    }
                    this.state = 176;
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
    public includeDirective(): IncludeDirectiveContext {
        let localContext = new IncludeDirectiveContext(this.context, this.state);
        this.enterRule(localContext, 4, LPCParser.RULE_includeDirective);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 179;
            this.match(LPCParser.HASH);
            this.state = 180;
            this.directiveTypeInclude();
            this.state = 181;
            this.directiveIncludeFile();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
            this.state = 183;
            this.match(LPCParser.DEFINE);
            this.state = 184;
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
        this.enterRule(localContext, 8, LPCParser.RULE_selectionDirective);
        let _la: number;
        try {
            this.state = 195;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 186;
                this.match(LPCParser.HASH);
                this.state = 187;
                this.selectionDirectiveTypeWithArg();
                this.state = 189;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 72) {
                    {
                    this.state = 188;
                    this.match(LPCParser.NOT);
                    }
                }

                this.state = 191;
                this.directiveArgument();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 193;
                this.match(LPCParser.HASH);
                this.state = 194;
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
        this.enterRule(localContext, 10, LPCParser.RULE_selectionDirectiveTypeSingle);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 197;
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
        this.enterRule(localContext, 12, LPCParser.RULE_selectionDirectiveTypeWithArg);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 199;
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
        this.enterRule(localContext, 14, LPCParser.RULE_directiveTypeWithArguments);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 201;
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
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 16, LPCParser.RULE_directiveArgument);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 203;
            _la = this.tokenStream.LA(1);
            if(!(_la === 1 || _la === 105 || _la === 109)) {
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
        this.enterRule(localContext, 18, LPCParser.RULE_directiveDefineParam);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 205;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 206;
            this.match(LPCParser.Identifier);
            this.state = 211;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 79) {
                {
                {
                this.state = 207;
                this.match(LPCParser.COMMA);
                this.state = 208;
                this.match(LPCParser.Identifier);
                }
                }
                this.state = 213;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 214;
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
        this.enterRule(localContext, 20, LPCParser.RULE_directiveDefineArgument);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 216;
            this.expression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
            this.state = 218;
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
        this.enterRule(localContext, 24, LPCParser.RULE_directiveIncludeFile);
        try {
            this.state = 223;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.LT:
                localContext = new IncludeGlobalFileContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 220;
                this.directiveIncludeFileGlobal();
                }
                break;
            case LPCParser.StringLiteral:
                localContext = new IncludeLocalFileContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 221;
                this.directiveIncludeFileLocal();
                }
                break;
            case LPCParser.Identifier:
                localContext = new IncludeDefineContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 222;
                this.match(LPCParser.Identifier);
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
            this.state = 225;
            this.match(LPCParser.Identifier);
            this.state = 228;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 81) {
                {
                this.state = 226;
                this.match(LPCParser.DOT);
                this.state = 227;
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
            this.state = 230;
            this.match(LPCParser.LT);
            this.state = 231;
            this.directiveIncludeFilename();
            this.state = 232;
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
            this.state = 234;
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
            this.state = 236;
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
        this.enterRule(localContext, 34, LPCParser.RULE_inheritStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 238;
            this.match(LPCParser.INHERIT);
            this.state = 239;
            localContext._inheritTarget = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 1 || _la === 109)) {
                localContext._inheritTarget = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 240;
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
        this.enterRule(localContext, 36, LPCParser.RULE_inheritSuperExpression);
        try {
            this.state = 247;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.SUPER_ACCESSOR:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 242;
                this.match(LPCParser.SUPER_ACCESSOR);
                this.state = 243;
                this.expression();
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 244;
                this.match(LPCParser.StringLiteral);
                this.state = 245;
                this.match(LPCParser.SUPER_ACCESSOR);
                this.state = 246;
                this.expression();
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
            this.state = 253;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 249;
                this.functionHeaderDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 250;
                this.functionDeclaration();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 251;
                this.structDeclaration();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 252;
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
            this.state = 255;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 127) !== 0))) {
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
        this.enterRule(localContext, 42, LPCParser.RULE_functionHeader);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 260;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 127) !== 0)) {
                {
                {
                this.state = 257;
                this.functionModifier();
                }
                }
                this.state = 262;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 264;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 16782441) !== 0)) {
                {
                this.state = 263;
                this.typeSpecifier();
                }
            }

            this.state = 266;
            localContext._functionName = this.match(LPCParser.Identifier);
            this.state = 267;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 269;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792098) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 16782457) !== 0)) {
                {
                this.state = 268;
                localContext._functionArgs = this.parameterList();
                }
            }

            this.state = 271;
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
        this.enterRule(localContext, 44, LPCParser.RULE_functionHeaderDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 273;
            this.functionHeader();
            this.state = 274;
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
        this.enterRule(localContext, 46, LPCParser.RULE_functionDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 276;
            this.functionHeader();
            this.state = 277;
            this.block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 48, LPCParser.RULE_parameterList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 279;
            this.parameter();
            this.state = 284;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 79) {
                {
                {
                this.state = 280;
                this.match(LPCParser.COMMA);
                this.state = 281;
                this.parameter();
                }
                }
                this.state = 286;
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
        this.enterRule(localContext, 50, LPCParser.RULE_parameter);
        let _la: number;
        try {
            this.state = 294;
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
            case LPCParser.STAR:
                localContext = new PrimitiveTypeParameterExpressionContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 288;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 16782441) !== 0)) {
                    {
                    this.state = 287;
                    (localContext as PrimitiveTypeParameterExpressionContext)._paramType = this.typeSpecifier();
                    }
                }

                this.state = 290;
                (localContext as PrimitiveTypeParameterExpressionContext)._paramName = this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.STRUCT:
                localContext = new StructParameterExpressionContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 291;
                (localContext as StructParameterExpressionContext)._paramType = this.match(LPCParser.STRUCT);
                this.state = 292;
                (localContext as StructParameterExpressionContext)._structName = this.match(LPCParser.Identifier);
                this.state = 293;
                (localContext as StructParameterExpressionContext)._paramName = this.match(LPCParser.Identifier);
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
    public structDeclaration(): StructDeclarationContext {
        let localContext = new StructDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 52, LPCParser.RULE_structDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 296;
            this.match(LPCParser.STRUCT);
            this.state = 297;
            localContext._structName = this.match(LPCParser.Identifier);
            this.state = 298;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 302;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 16782441) !== 0)) {
                {
                {
                this.state = 299;
                localContext._structMembers = this.structMemberDeclaration();
                }
                }
                this.state = 304;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 305;
            this.match(LPCParser.CURLY_CLOSE);
            this.state = 306;
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
    public structMemberDeclaration(): StructMemberDeclarationContext {
        let localContext = new StructMemberDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 54, LPCParser.RULE_structMemberDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 308;
            this.typeSpecifier();
            this.state = 309;
            this.match(LPCParser.Identifier);
            this.state = 310;
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
    public arrayExpression(): ArrayExpressionContext {
        let localContext = new ArrayExpressionContext(this.context, this.state);
        this.enterRule(localContext, 56, LPCParser.RULE_arrayExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 312;
            this.match(LPCParser.ARRAY_OPEN);
            this.state = 321;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 54)) & ~0x1F) === 0 && ((1 << (_la - 54)) & 873234535) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 505877) !== 0)) {
                {
                this.state = 313;
                this.expression();
                this.state = 318;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 18, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 314;
                        this.match(LPCParser.COMMA);
                        this.state = 315;
                        this.expression();
                        }
                        }
                    }
                    this.state = 320;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 18, this.context);
                }
                }
            }

            this.state = 324;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 79) {
                {
                this.state = 323;
                this.match(LPCParser.COMMA);
                }
            }

            this.state = 326;
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
    public mappingContent(): MappingContentContext {
        let localContext = new MappingContentContext(this.context, this.state);
        this.enterRule(localContext, 58, LPCParser.RULE_mappingContent);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 328;
            localContext._mappingKey = this.expression();
            this.state = 338;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 77) {
                {
                this.state = 329;
                this.match(LPCParser.COLON);
                this.state = 330;
                this.expression();
                this.state = 335;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 78) {
                    {
                    {
                    this.state = 331;
                    this.match(LPCParser.SEMI);
                    this.state = 332;
                    this.expression();
                    }
                    }
                    this.state = 337;
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
        this.enterRule(localContext, 60, LPCParser.RULE_mappingExpression);
        let _la: number;
        try {
            let alternative: number;
            this.state = 362;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 26, this.context) ) {
            case 1:
                localContext = new MappingValueInitializerContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 340;
                this.match(LPCParser.MAPPING_OPEN);
                this.state = 349;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 54)) & ~0x1F) === 0 && ((1 << (_la - 54)) & 873234535) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 505877) !== 0)) {
                    {
                    this.state = 341;
                    this.mappingContent();
                    this.state = 346;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 342;
                            this.match(LPCParser.COMMA);
                            this.state = 343;
                            this.mappingContent();
                            }
                            }
                        }
                        this.state = 348;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
                    }
                    }
                }

                this.state = 352;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 79) {
                    {
                    this.state = 351;
                    this.match(LPCParser.COMMA);
                    }
                }

                this.state = 354;
                this.match(LPCParser.SQUARE_CLOSE);
                this.state = 355;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 2:
                localContext = new MappingEmptyInitializerContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 356;
                this.match(LPCParser.MAPPING_OPEN);
                this.state = 357;
                this.match(LPCParser.COLON);
                this.state = 358;
                this.expression();
                this.state = 359;
                this.match(LPCParser.SQUARE_CLOSE);
                this.state = 360;
                this.match(LPCParser.PAREN_CLOSE);
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
    public variableModifier(): VariableModifierContext {
        let localContext = new VariableModifierContext(this.context, this.state);
        this.enterRule(localContext, 62, LPCParser.RULE_variableModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 364;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 31) !== 0))) {
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
        this.enterRule(localContext, 64, LPCParser.RULE_variableDeclaration);
        let _la: number;
        try {
            this.state = 404;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 32, this.context) ) {
            case 1:
                localContext = new PrimitiveTypeVariableDeclarationContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 369;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 31) !== 0)) {
                    {
                    {
                    this.state = 366;
                    this.variableModifier();
                    }
                    }
                    this.state = 371;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 373;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 5225) !== 0)) {
                    {
                    this.state = 372;
                    this.primitiveTypeSpecifier();
                    }
                }

                this.state = 375;
                this.variableDeclarator();
                this.state = 380;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 79) {
                    {
                    {
                    this.state = 376;
                    this.match(LPCParser.COMMA);
                    this.state = 377;
                    this.variableDeclarator();
                    }
                    }
                    this.state = 382;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 383;
                this.match(LPCParser.SEMI);
                }
                break;
            case 2:
                localContext = new StructVariableDeclarationContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 388;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 31) !== 0)) {
                    {
                    {
                    this.state = 385;
                    this.variableModifier();
                    }
                    }
                    this.state = 390;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 391;
                this.match(LPCParser.STRUCT);
                this.state = 392;
                (localContext as StructVariableDeclarationContext)._structName = this.match(LPCParser.Identifier);
                this.state = 393;
                this.variableDeclarator();
                this.state = 399;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 79) {
                    {
                    {
                    this.state = 394;
                    this.match(LPCParser.COMMA);
                    this.state = 395;
                    (localContext as StructVariableDeclarationContext)._structName = this.match(LPCParser.Identifier);
                    this.state = 396;
                    this.variableDeclarator();
                    }
                    }
                    this.state = 401;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 402;
                this.match(LPCParser.SEMI);
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
    public variableDeclarator(): VariableDeclaratorContext {
        let localContext = new VariableDeclaratorContext(this.context, this.state);
        this.enterRule(localContext, 66, LPCParser.RULE_variableDeclarator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 407;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 56) {
                {
                this.state = 406;
                localContext._arraySpecifier = this.match(LPCParser.STAR);
                }
            }

            this.state = 409;
            localContext._variableName = this.match(LPCParser.Identifier);
            this.state = 412;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 84) {
                {
                this.state = 410;
                this.match(LPCParser.ASSIGN);
                this.state = 411;
                this.variableInitializer();
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
    public variableInitializer(): VariableInitializerContext {
        let localContext = new VariableInitializerContext(this.context, this.state);
        this.enterRule(localContext, 68, LPCParser.RULE_variableInitializer);
        try {
            this.state = 417;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 35, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 414;
                this.expression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 415;
                this.arrayExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 416;
                this.mappingExpression();
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
    public primitiveTypeSpecifier(): PrimitiveTypeSpecifierContext {
        let localContext = new PrimitiveTypeSpecifierContext(this.context, this.state);
        this.enterRule(localContext, 70, LPCParser.RULE_primitiveTypeSpecifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 419;
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
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public indexerArgument(): IndexerArgumentContext {
        let localContext = new IndexerArgumentContext(this.context, this.state);
        this.enterRule(localContext, 72, LPCParser.RULE_indexerArgument);
        try {
            this.state = 426;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 36, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 421;
                this.expression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 422;
                this.expression();
                this.state = 423;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 424;
                this.expression();
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
    public methodInvocation(): MethodInvocationContext {
        let localContext = new MethodInvocationContext(this.context, this.state);
        this.enterRule(localContext, 74, LPCParser.RULE_methodInvocation);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 428;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 430;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 54)) & ~0x1F) === 0 && ((1 << (_la - 54)) & 873234535) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 505877) !== 0)) {
                {
                this.state = 429;
                this.argumentList();
                }
            }

            this.state = 432;
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
    public arrayTypeSpecifier(): ArrayTypeSpecifierContext {
        let localContext = new ArrayTypeSpecifierContext(this.context, this.state);
        this.enterRule(localContext, 76, LPCParser.RULE_arrayTypeSpecifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 435;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 5225) !== 0)) {
                {
                this.state = 434;
                this.primitiveTypeSpecifier();
                }
            }

            this.state = 437;
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
        this.enterRule(localContext, 78, LPCParser.RULE_typeSpecifier);
        try {
            this.state = 441;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 39, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 439;
                this.primitiveTypeSpecifier();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 440;
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
        this.enterRule(localContext, 80, LPCParser.RULE_inlineClosureExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 443;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 444;
            this.match(LPCParser.COLON);
            this.state = 452;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 41, this.context) ) {
            case 1:
                {
                this.state = 445;
                this.expression();
                }
                break;
            case 2:
                {
                this.state = 449;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871286) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 433050877) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 2852153369) !== 0) || ((((_la - 105)) & ~0x1F) === 0 && ((1 << (_la - 105)) & 247) !== 0)) {
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
                break;
            }
            this.state = 454;
            this.match(LPCParser.COLON);
            this.state = 455;
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
        this.enterRule(localContext, 82, LPCParser.RULE_statement);
        try {
            this.state = 465;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 42, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 457;
                this.expressionStatement();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 458;
                this.block();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 459;
                this.selectionStatement();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 460;
                this.iterationStatement();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 461;
                this.jumpStatement();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 462;
                this.variableDeclaration();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 463;
                this.selectionDirective();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 464;
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
        this.enterRule(localContext, 84, LPCParser.RULE_expressionStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 467;
            this.expression();
            this.state = 468;
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
    public block(): BlockContext {
        let localContext = new BlockContext(this.context, this.state);
        this.enterRule(localContext, 86, LPCParser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 470;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 474;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871286) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 433050877) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 2852153369) !== 0) || ((((_la - 105)) & ~0x1F) === 0 && ((1 << (_la - 105)) & 247) !== 0)) {
                {
                {
                this.state = 471;
                this.statement();
                }
                }
                this.state = 476;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 477;
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
        this.enterRule(localContext, 88, LPCParser.RULE_selectionStatement);
        try {
            this.state = 481;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.IF:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 479;
                this.ifStatement();
                }
                break;
            case LPCParser.SWITCH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 480;
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
        this.enterRule(localContext, 90, LPCParser.RULE_elseIfExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 483;
            this.match(LPCParser.ELSE);
            this.state = 484;
            this.match(LPCParser.IF);
            this.state = 485;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 486;
            this.expression();
            this.state = 487;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 488;
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
        this.enterRule(localContext, 92, LPCParser.RULE_elseExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 490;
            this.match(LPCParser.ELSE);
            this.state = 491;
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
        this.enterRule(localContext, 94, LPCParser.RULE_ifExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 493;
            this.match(LPCParser.IF);
            this.state = 494;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 495;
            this.expression();
            this.state = 496;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 497;
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
        this.enterRule(localContext, 96, LPCParser.RULE_ifStatement);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 499;
            this.ifExpression();
            this.state = 503;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 45, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 500;
                    this.elseIfExpression();
                    }
                    }
                }
                this.state = 505;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 45, this.context);
            }
            this.state = 507;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 46, this.context) ) {
            case 1:
                {
                this.state = 506;
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
        this.enterRule(localContext, 98, LPCParser.RULE_switchStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 509;
            this.match(LPCParser.SWITCH);
            this.state = 510;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 511;
            this.expression();
            this.state = 512;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 513;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 518;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 3 || _la === 9) {
                {
                this.state = 516;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.CASE:
                    {
                    this.state = 514;
                    this.caseStatement();
                    }
                    break;
                case LPCParser.DEFAULT:
                    {
                    this.state = 515;
                    this.defaultStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 520;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 521;
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
        this.enterRule(localContext, 100, LPCParser.RULE_caseExpression);
        let _la: number;
        try {
            this.state = 548;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 55, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 529;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.StringLiteral:
                    {
                    this.state = 523;
                    this.match(LPCParser.StringLiteral);
                    }
                    break;
                case LPCParser.MINUS:
                case LPCParser.IntegerConstant:
                    {
                    this.state = 525;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 55) {
                        {
                        this.state = 524;
                        this.match(LPCParser.MINUS);
                        }
                    }

                    this.state = 527;
                    this.match(LPCParser.IntegerConstant);
                    }
                    break;
                case LPCParser.Identifier:
                    {
                    this.state = 528;
                    this.match(LPCParser.Identifier);
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
                this.state = 537;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.StringLiteral:
                    {
                    this.state = 531;
                    this.match(LPCParser.StringLiteral);
                    }
                    break;
                case LPCParser.MINUS:
                case LPCParser.IntegerConstant:
                    {
                    this.state = 533;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 55) {
                        {
                        this.state = 532;
                        this.match(LPCParser.MINUS);
                        }
                    }

                    this.state = 535;
                    this.match(LPCParser.IntegerConstant);
                    }
                    break;
                case LPCParser.Identifier:
                    {
                    this.state = 536;
                    this.match(LPCParser.Identifier);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 539;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 546;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.StringLiteral:
                    {
                    this.state = 540;
                    this.match(LPCParser.StringLiteral);
                    }
                    break;
                case LPCParser.MINUS:
                case LPCParser.IntegerConstant:
                    {
                    this.state = 542;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 55) {
                        {
                        this.state = 541;
                        this.match(LPCParser.MINUS);
                        }
                    }

                    this.state = 544;
                    this.match(LPCParser.IntegerConstant);
                    }
                    break;
                case LPCParser.Identifier:
                    {
                    this.state = 545;
                    this.match(LPCParser.Identifier);
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
        this.enterRule(localContext, 102, LPCParser.RULE_caseStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 550;
            this.match(LPCParser.CASE);
            this.state = 551;
            this.caseExpression();
            this.state = 552;
            this.match(LPCParser.COLON);
            this.state = 556;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871286) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 433050877) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 2852153369) !== 0) || ((((_la - 105)) & ~0x1F) === 0 && ((1 << (_la - 105)) & 247) !== 0)) {
                {
                {
                this.state = 553;
                this.statement();
                }
                }
                this.state = 558;
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
        this.enterRule(localContext, 104, LPCParser.RULE_defaultStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 559;
            this.match(LPCParser.DEFAULT);
            this.state = 560;
            this.match(LPCParser.COLON);
            this.state = 564;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871286) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 433050877) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 2852153369) !== 0) || ((((_la - 105)) & ~0x1F) === 0 && ((1 << (_la - 105)) & 247) !== 0)) {
                {
                {
                this.state = 561;
                this.statement();
                }
                }
                this.state = 566;
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
        this.enterRule(localContext, 106, LPCParser.RULE_iterationStatement);
        let _la: number;
        try {
            this.state = 626;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.WHILE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 567;
                this.match(LPCParser.WHILE);
                this.state = 568;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 569;
                this.expression();
                this.state = 570;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 573;
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
                case LPCParser.PLUS:
                case LPCParser.MINUS:
                case LPCParser.STAR:
                case LPCParser.INC:
                case LPCParser.DEC:
                case LPCParser.AND:
                case LPCParser.NOT:
                case LPCParser.BNOT:
                case LPCParser.DOUBLEDOT:
                case LPCParser.SINGLEQUOT:
                case LPCParser.SUPER_ACCESSOR:
                case LPCParser.ARRAY_OPEN:
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
                    this.state = 571;
                    this.statement();
                    }
                    break;
                case LPCParser.SEMI:
                    {
                    this.state = 572;
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
                this.state = 575;
                this.match(LPCParser.DO);
                this.state = 576;
                this.statement();
                this.state = 577;
                this.match(LPCParser.WHILE);
                this.state = 578;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 579;
                this.expression();
                this.state = 580;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 581;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.FOR:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 583;
                this.match(LPCParser.FOR);
                this.state = 584;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 586;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 54)) & ~0x1F) === 0 && ((1 << (_la - 54)) & 873234535) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 505877) !== 0)) {
                    {
                    this.state = 585;
                    this.expression();
                    }
                }

                this.state = 592;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 79) {
                    {
                    {
                    this.state = 588;
                    this.match(LPCParser.COMMA);
                    this.state = 589;
                    this.expression();
                    }
                    }
                    this.state = 594;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 595;
                this.match(LPCParser.SEMI);
                this.state = 597;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 54)) & ~0x1F) === 0 && ((1 << (_la - 54)) & 873234535) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 505877) !== 0)) {
                    {
                    this.state = 596;
                    this.expression();
                    }
                }

                this.state = 599;
                this.match(LPCParser.SEMI);
                this.state = 601;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 54)) & ~0x1F) === 0 && ((1 << (_la - 54)) & 873234535) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 505877) !== 0)) {
                    {
                    this.state = 600;
                    this.expression();
                    }
                }

                this.state = 607;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 79) {
                    {
                    {
                    this.state = 603;
                    this.match(LPCParser.COMMA);
                    this.state = 604;
                    this.expression();
                    }
                    }
                    this.state = 609;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 610;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 613;
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
                case LPCParser.PLUS:
                case LPCParser.MINUS:
                case LPCParser.STAR:
                case LPCParser.INC:
                case LPCParser.DEC:
                case LPCParser.AND:
                case LPCParser.NOT:
                case LPCParser.BNOT:
                case LPCParser.DOUBLEDOT:
                case LPCParser.SINGLEQUOT:
                case LPCParser.SUPER_ACCESSOR:
                case LPCParser.ARRAY_OPEN:
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
                    this.state = 611;
                    this.statement();
                    }
                    break;
                case LPCParser.SEMI:
                    {
                    this.state = 612;
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
                this.state = 615;
                this.match(LPCParser.FOREACH);
                this.state = 616;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 617;
                this.typeSpecifier();
                this.state = 618;
                this.match(LPCParser.Identifier);
                this.state = 619;
                _la = this.tokenStream.LA(1);
                if(!(_la === 25 || _la === 77)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 620;
                this.expression();
                this.state = 621;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 624;
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
                case LPCParser.PLUS:
                case LPCParser.MINUS:
                case LPCParser.STAR:
                case LPCParser.INC:
                case LPCParser.DEC:
                case LPCParser.AND:
                case LPCParser.NOT:
                case LPCParser.BNOT:
                case LPCParser.DOUBLEDOT:
                case LPCParser.SINGLEQUOT:
                case LPCParser.SUPER_ACCESSOR:
                case LPCParser.ARRAY_OPEN:
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
                    this.state = 622;
                    this.statement();
                    }
                    break;
                case LPCParser.SEMI:
                    {
                    this.state = 623;
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
        this.enterRule(localContext, 108, LPCParser.RULE_returnStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 628;
            this.match(LPCParser.RETURN);
            this.state = 630;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 54)) & ~0x1F) === 0 && ((1 << (_la - 54)) & 873234535) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 505877) !== 0)) {
                {
                this.state = 629;
                this.expression();
                }
            }

            this.state = 632;
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
        this.enterRule(localContext, 110, LPCParser.RULE_jumpStatement);
        try {
            this.state = 639;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BREAK:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 634;
                this.match(LPCParser.BREAK);
                this.state = 635;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.CONTINUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 636;
                this.match(LPCParser.CONTINUE);
                this.state = 637;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.RETURN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 638;
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
        this.enterRule(localContext, 112, LPCParser.RULE_callOtherTarget);
        try {
            this.state = 647;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 641;
                this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.PAREN_OPEN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 642;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 643;
                this.expression();
                this.state = 644;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 646;
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
        this.enterRule(localContext, 114, LPCParser.RULE_lambdaExpression);
        try {
            this.state = 735;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 70, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 649;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 650;
                this.match(LPCParser.Identifier);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 651;
                this.match(LPCParser.HASH);
                this.state = 652;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 653;
                this.expression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 654;
                this.match(LPCParser.HASH);
                this.state = 655;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 656;
                this.match(LPCParser.PLUS);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 657;
                this.match(LPCParser.HASH);
                this.state = 658;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 659;
                this.match(LPCParser.MINUS);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 660;
                this.match(LPCParser.HASH);
                this.state = 661;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 662;
                this.match(LPCParser.STAR);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 663;
                this.match(LPCParser.HASH);
                this.state = 664;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 665;
                this.match(LPCParser.DIV);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 666;
                this.match(LPCParser.HASH);
                this.state = 667;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 668;
                this.match(LPCParser.MOD);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 669;
                this.match(LPCParser.HASH);
                this.state = 670;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 671;
                this.match(LPCParser.LT);
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 672;
                this.match(LPCParser.HASH);
                this.state = 673;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 674;
                this.match(LPCParser.GT);
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 675;
                this.match(LPCParser.HASH);
                this.state = 676;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 677;
                this.match(LPCParser.LE);
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 678;
                this.match(LPCParser.HASH);
                this.state = 679;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 680;
                this.match(LPCParser.GE);
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 681;
                this.match(LPCParser.HASH);
                this.state = 682;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 683;
                this.match(LPCParser.EQ);
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 684;
                this.match(LPCParser.HASH);
                this.state = 685;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 686;
                this.match(LPCParser.NE);
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 687;
                this.match(LPCParser.HASH);
                this.state = 688;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 689;
                this.match(LPCParser.AND);
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 690;
                this.match(LPCParser.HASH);
                this.state = 691;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 692;
                this.match(LPCParser.OR);
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 693;
                this.match(LPCParser.HASH);
                this.state = 694;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 695;
                this.match(LPCParser.XOR);
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 696;
                this.match(LPCParser.HASH);
                this.state = 697;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 698;
                this.match(LPCParser.AND_AND);
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 699;
                this.match(LPCParser.HASH);
                this.state = 700;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 701;
                this.match(LPCParser.OR_OR);
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 702;
                this.match(LPCParser.HASH);
                this.state = 703;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 704;
                this.match(LPCParser.ADD_ASSIGN);
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 705;
                this.match(LPCParser.HASH);
                this.state = 706;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 707;
                this.match(LPCParser.SUB_ASSIGN);
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 708;
                this.match(LPCParser.HASH);
                this.state = 709;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 710;
                this.match(LPCParser.MUL_ASSIGN);
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 711;
                this.match(LPCParser.HASH);
                this.state = 712;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 713;
                this.match(LPCParser.DIV_ASSIGN);
                }
                break;
            case 23:
                this.enterOuterAlt(localContext, 23);
                {
                this.state = 714;
                this.match(LPCParser.HASH);
                this.state = 715;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 716;
                this.match(LPCParser.MOD_ASSIGN);
                }
                break;
            case 24:
                this.enterOuterAlt(localContext, 24);
                {
                this.state = 717;
                this.match(LPCParser.HASH);
                this.state = 718;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 719;
                this.match(LPCParser.AND_ASSIGN);
                }
                break;
            case 25:
                this.enterOuterAlt(localContext, 25);
                {
                this.state = 720;
                this.match(LPCParser.HASH);
                this.state = 721;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 722;
                this.match(LPCParser.OR_ASSIGN);
                }
                break;
            case 26:
                this.enterOuterAlt(localContext, 26);
                {
                this.state = 723;
                this.match(LPCParser.HASH);
                this.state = 724;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 725;
                this.match(LPCParser.XOR_ASSIGN);
                }
                break;
            case 27:
                this.enterOuterAlt(localContext, 27);
                {
                this.state = 726;
                this.match(LPCParser.HASH);
                this.state = 727;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 728;
                this.match(LPCParser.QUESTION);
                }
                break;
            case 28:
                this.enterOuterAlt(localContext, 28);
                {
                this.state = 729;
                this.match(LPCParser.HASH);
                this.state = 730;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 731;
                this.match(LPCParser.SHL);
                }
                break;
            case 29:
                this.enterOuterAlt(localContext, 29);
                {
                this.state = 732;
                this.match(LPCParser.HASH);
                this.state = 733;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 734;
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
    public rightShiftAssignment(): RightShiftAssignmentContext {
        let localContext = new RightShiftAssignmentContext(this.context, this.state);
        this.enterRule(localContext, 116, LPCParser.RULE_rightShiftAssignment);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 737;
            localContext._first = this.match(LPCParser.GT);
            this.state = 738;
            localContext._second = this.match(LPCParser.GE);
            this.state = 739;
            if (!((localContext._first?.tokenIndex ?? 0) + 1 == (localContext._second?.tokenIndex ?? 0))) {
                throw this.createFailedPredicateException("$first.index + 1 == $second.index");
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
    public literal(): LiteralContext {
        let localContext = new LiteralContext(this.context, this.state);
        this.enterRule(localContext, 118, LPCParser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 741;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 105)) & ~0x1F) === 0 && ((1 << (_la - 105)) & 55) !== 0))) {
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
    public castExpression(): CastExpressionContext {
        let localContext = new CastExpressionContext(this.context, this.state);
        this.enterRule(localContext, 120, LPCParser.RULE_castExpression);
        let _la: number;
        try {
            this.state = 762;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 72, this.context) ) {
            case 1:
                localContext = new PrimitiveTypeCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 743;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 744;
                this.typeSpecifier();
                this.state = 745;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 746;
                this.expression();
                }
                break;
            case 2:
                localContext = new StructCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 748;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 749;
                this.match(LPCParser.LT);
                this.state = 750;
                this.match(LPCParser.Identifier);
                this.state = 751;
                this.match(LPCParser.GT);
                this.state = 752;
                this.expression();
                this.state = 757;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 79) {
                    {
                    {
                    this.state = 753;
                    this.match(LPCParser.COMMA);
                    this.state = 754;
                    this.expression();
                    }
                    }
                    this.state = 759;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 760;
                this.match(LPCParser.PAREN_CLOSE);
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
    public assignmentOperator(): AssignmentOperatorContext {
        let localContext = new AssignmentOperatorContext(this.context, this.state);
        this.enterRule(localContext, 122, LPCParser.RULE_assignmentOperator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 764;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 84)) & ~0x1F) === 0 && ((1 << (_la - 84)) & 1023) !== 0))) {
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
        let _startState = 124;
        this.enterRecursionRule(localContext, 124, LPCParser.RULE_conditionalExpressionBase, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 775;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 75, this.context) ) {
            case 1:
                {
                localContext = new TempUnaryExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 767;
                this.unaryExpression();
                }
                break;
            case 2:
                {
                localContext = new RangeExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 769;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1 || _la === 4 || ((((_la - 54)) & ~0x1F) === 0 && ((1 << (_la - 54)) & 819303) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 505877) !== 0)) {
                    {
                    this.state = 768;
                    this.unaryExpression();
                    }
                }

                this.state = 771;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 773;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 74, this.context) ) {
                case 1:
                    {
                    this.state = 772;
                    this.unaryExpression();
                    }
                    break;
                }
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 855;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 87, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this._parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 853;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 86, this.context) ) {
                    case 1:
                        {
                        localContext = new ConditionalExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 777;
                        if (!(this.precpred(this.context, 12))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 12)");
                        }
                        {
                        this.state = 778;
                        this.match(LPCParser.QUESTION);
                        this.state = 779;
                        this.expression();
                        this.state = 780;
                        this.match(LPCParser.COLON);
                        this.state = 781;
                        this.expression();
                        }
                        }
                        break;
                    case 2:
                        {
                        localContext = new ConditionalOrExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 783;
                        if (!(this.precpred(this.context, 11))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 11)");
                        }
                        this.state = 786;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 784;
                                (localContext as ConditionalOrExpressionContext)._op = this.match(LPCParser.OR_OR);
                                this.state = 785;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 788;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 76, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 3:
                        {
                        localContext = new ConditionalAndExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 790;
                        if (!(this.precpred(this.context, 10))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 10)");
                        }
                        this.state = 793;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 791;
                                (localContext as ConditionalAndExpressionContext)._op = this.match(LPCParser.AND_AND);
                                this.state = 792;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 795;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 77, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 4:
                        {
                        localContext = new InclusiveOrExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 797;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 800;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 798;
                                (localContext as InclusiveOrExpressionContext)._op = this.match(LPCParser.OR);
                                this.state = 799;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 802;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 78, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 5:
                        {
                        localContext = new ExclusiveOrExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 804;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 807;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 805;
                                (localContext as ExclusiveOrExpressionContext)._op = this.match(LPCParser.XOR);
                                this.state = 806;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 809;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 79, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 6:
                        {
                        localContext = new AndExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 811;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 814;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 812;
                                (localContext as AndExpressionContext)._op = this.match(LPCParser.AND);
                                this.state = 813;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 816;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 80, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 7:
                        {
                        localContext = new EqualityExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 818;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 821;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 819;
                                (localContext as EqualityExpressionContext)._op = this.tokenStream.LT(1);
                                _la = this.tokenStream.LA(1);
                                if(!(_la === 67 || _la === 68)) {
                                    (localContext as EqualityExpressionContext)._op = this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 820;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 823;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 81, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 8:
                        {
                        localContext = new RelationalExpresionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 825;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 828;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 826;
                                (localContext as RelationalExpresionContext)._op = this.tokenStream.LT(1);
                                _la = this.tokenStream.LA(1);
                                if(!(((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & 15) !== 0))) {
                                    (localContext as RelationalExpresionContext)._op = this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 827;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 830;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 82, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 9:
                        {
                        localContext = new ShiftExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 832;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 835;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 833;
                                (localContext as ShiftExpressionContext)._op = this.tokenStream.LT(1);
                                _la = this.tokenStream.LA(1);
                                if(!(_la === 61 || _la === 62)) {
                                    (localContext as ShiftExpressionContext)._op = this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 834;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 837;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 83, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 10:
                        {
                        localContext = new AdditiveExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 839;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 842;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 840;
                                (localContext as AdditiveExpressionContext)._op = this.tokenStream.LT(1);
                                _la = this.tokenStream.LA(1);
                                if(!(_la === 54 || _la === 55)) {
                                    (localContext as AdditiveExpressionContext)._op = this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 841;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 844;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 84, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 11:
                        {
                        localContext = new MultiplicativeExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 846;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 849;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 847;
                                (localContext as MultiplicativeExpressionContext)._op = this.tokenStream.LT(1);
                                _la = this.tokenStream.LA(1);
                                if(!(((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 7) !== 0))) {
                                    (localContext as MultiplicativeExpressionContext)._op = this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 848;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 851;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 85, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    }
                    }
                }
                this.state = 857;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 87, this.context);
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
    public unaryExpression(): UnaryExpressionContext {
        let localContext = new UnaryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 126, LPCParser.RULE_unaryExpression);
        try {
            this.state = 876;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 88, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 858;
                this.castExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 859;
                this.primaryExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 860;
                this.match(LPCParser.PLUS);
                this.state = 861;
                this.expression();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 862;
                this.match(LPCParser.MINUS);
                this.state = 863;
                this.expression();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 864;
                this.match(LPCParser.NOT);
                this.state = 865;
                this.expression();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 866;
                this.match(LPCParser.BNOT);
                this.state = 867;
                this.expression();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 868;
                this.match(LPCParser.INC);
                this.state = 869;
                this.expression();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 870;
                this.match(LPCParser.DEC);
                this.state = 871;
                this.expression();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 872;
                this.match(LPCParser.AND);
                this.state = 873;
                this.expression();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 874;
                this.match(LPCParser.STAR);
                this.state = 875;
                this.expression();
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
    public primaryExpression(): PrimaryExpressionContext {
        let localContext = new PrimaryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 128, LPCParser.RULE_primaryExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 878;
            localContext._pe = this.primaryExpressionStart();
            this.state = 882;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 89, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 879;
                    this.bracketExpression();
                    }
                    }
                }
                this.state = 884;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 89, this.context);
            }
            this.state = 900;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 92, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 890;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case LPCParser.PAREN_OPEN:
                        {
                        this.state = 885;
                        this.methodInvocation();
                        }
                        break;
                    case LPCParser.INC:
                        {
                        this.state = 886;
                        this.match(LPCParser.INC);
                        }
                        break;
                    case LPCParser.DEC:
                        {
                        this.state = 887;
                        this.match(LPCParser.DEC);
                        }
                        break;
                    case LPCParser.ARROW:
                        {
                        this.state = 888;
                        this.callOtherExpression();
                        }
                        break;
                    case LPCParser.Identifier:
                        {
                        this.state = 889;
                        this.match(LPCParser.Identifier);
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    this.state = 895;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 91, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 892;
                            this.bracketExpression();
                            }
                            }
                        }
                        this.state = 897;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 91, this.context);
                    }
                    }
                    }
                }
                this.state = 902;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 92, this.context);
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
    public callOtherExpression(): CallOtherExpressionContext {
        let localContext = new CallOtherExpressionContext(this.context, this.state);
        this.enterRule(localContext, 130, LPCParser.RULE_callOtherExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 903;
            this.match(LPCParser.ARROW);
            this.state = 907;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 93, this.context) ) {
            case 1:
                {
                this.state = 904;
                this.callOtherTarget();
                this.state = 905;
                this.methodInvocation();
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
    public primaryExpressionStart(): PrimaryExpressionStartContext {
        let localContext = new PrimaryExpressionStartContext(this.context, this.state);
        this.enterRule(localContext, 132, LPCParser.RULE_primaryExpressionStart);
        let _la: number;
        try {
            let alternative: number;
            this.state = 930;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 95, this.context) ) {
            case 1:
                localContext = new LiteralExpressionContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 909;
                this.literal();
                }
                break;
            case 2:
                localContext = new CloneObjectExpressionContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 910;
                _la = this.tokenStream.LA(1);
                if(!(_la === 111 || _la === 112)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 911;
                this.match(LPCParser.PAREN_OPEN);
                {
                this.state = 912;
                (localContext as CloneObjectExpressionContext)._ob = this.expression();
                }
                this.state = 913;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 3:
                localContext = new IdentifierExpressionContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 915;
                this.match(LPCParser.Identifier);
                }
                break;
            case 4:
                localContext = new ParenExpressionContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 916;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 917;
                this.expression();
                this.state = 918;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 5:
                localContext = new PrimaryArrayExpressionContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 920;
                this.arrayExpression();
                }
                break;
            case 6:
                localContext = new PrimaryMappingExpressionContext(localContext);
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 921;
                this.mappingExpression();
                }
                break;
            case 7:
                localContext = new StringConcatExpressionContext(localContext);
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 922;
                this.match(LPCParser.StringLiteral);
                this.state = 926;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 94, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 923;
                        this.match(LPCParser.StringLiteral);
                        }
                        }
                    }
                    this.state = 928;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 94, this.context);
                }
                }
                break;
            case 8:
                localContext = new CatchExpressionContext(localContext);
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 929;
                this.catchExpr();
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
    public expression(): ExpressionContext {
        let localContext = new ExpressionContext(this.context, this.state);
        this.enterRule(localContext, 134, LPCParser.RULE_expression);
        try {
            this.state = 934;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 96, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 932;
                this.assignmentExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 933;
                this.nonAssignmentExpression();
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
    public catchExpr(): CatchExprContext {
        let localContext = new CatchExprContext(this.context, this.state);
        this.enterRule(localContext, 136, LPCParser.RULE_catchExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 936;
            this.match(LPCParser.CATCH);
            this.state = 937;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 938;
            this.expression();
            this.state = 943;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 79) {
                {
                {
                this.state = 939;
                this.match(LPCParser.COMMA);
                this.state = 940;
                this.expression();
                }
                }
                this.state = 945;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 946;
            this.match(LPCParser.SEMI);
            this.state = 950;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 1) {
                {
                {
                this.state = 947;
                this.match(LPCParser.Identifier);
                }
                }
                this.state = 952;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 953;
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
    public bracketExpression(): BracketExpressionContext {
        let localContext = new BracketExpressionContext(this.context, this.state);
        this.enterRule(localContext, 138, LPCParser.RULE_bracketExpression);
        let _la: number;
        try {
            this.state = 989;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 106, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 955;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 957;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 63) {
                    {
                    this.state = 956;
                    this.match(LPCParser.LT);
                    }
                }

                this.state = 959;
                this.expression();
                this.state = 960;
                this.match(LPCParser.SQUARE_CLOSE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 962;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 964;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 63) {
                    {
                    this.state = 963;
                    this.match(LPCParser.LT);
                    }
                }

                this.state = 967;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 101, this.context) ) {
                case 1:
                    {
                    this.state = 966;
                    this.expression();
                    }
                    break;
                }
                this.state = 969;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 971;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 63) {
                    {
                    this.state = 970;
                    this.match(LPCParser.LT);
                    }
                }

                this.state = 974;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 54)) & ~0x1F) === 0 && ((1 << (_la - 54)) & 873234535) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 505877) !== 0)) {
                    {
                    this.state = 973;
                    this.expression();
                    }
                }

                this.state = 976;
                this.match(LPCParser.SQUARE_CLOSE);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 977;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 979;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 54)) & ~0x1F) === 0 && ((1 << (_la - 54)) & 873234535) !== 0) || ((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 505877) !== 0)) {
                    {
                    this.state = 978;
                    this.expression();
                    }
                }

                this.state = 985;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 79) {
                    {
                    {
                    this.state = 981;
                    this.match(LPCParser.COMMA);
                    this.state = 982;
                    this.expression();
                    }
                    }
                    this.state = 987;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 988;
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
    public argument(): ArgumentContext {
        let localContext = new ArgumentContext(this.context, this.state);
        this.enterRule(localContext, 140, LPCParser.RULE_argument);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 992;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 107, this.context) ) {
            case 1:
                {
                this.state = 991;
                this.match(LPCParser.AND);
                }
                break;
            }
            this.state = 994;
            this.expression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 142, LPCParser.RULE_argumentList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 996;
            this.argument();
            this.state = 1001;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 79) {
                {
                {
                this.state = 997;
                this.match(LPCParser.COMMA);
                this.state = 998;
                this.argument();
                }
                }
                this.state = 1003;
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
    public expressionList(): ExpressionListContext {
        let localContext = new ExpressionListContext(this.context, this.state);
        this.enterRule(localContext, 144, LPCParser.RULE_expressionList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1004;
            this.expression();
            this.state = 1009;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 79) {
                {
                {
                this.state = 1005;
                this.match(LPCParser.COMMA);
                this.state = 1006;
                this.expression();
                }
                }
                this.state = 1011;
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
        this.enterRule(localContext, 146, LPCParser.RULE_assignmentExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1012;
            this.conditionalExpressionBase(0);
            this.state = 1013;
            this.assignmentOperator();
            this.state = 1014;
            this.expression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                localContext.exception = re;
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 148, LPCParser.RULE_nonAssignmentExpression);
        try {
            this.state = 1020;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 110, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1016;
                this.inlineClosureExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1017;
                this.lambdaExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1018;
                this.inheritSuperExpression();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 1019;
                this.conditionalExpressionBase(0);
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

    public override sempred(localContext: antlr.RuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 58:
            return this.rightShiftAssignment_sempred(localContext as RightShiftAssignmentContext, predIndex);
        case 62:
            return this.conditionalExpressionBase_sempred(localContext as ConditionalExpressionBaseContext, predIndex);
        }
        return true;
    }
    private rightShiftAssignment_sempred(localContext: RightShiftAssignmentContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return (localContext._first?.tokenIndex ?? 0) + 1 == (localContext._second?.tokenIndex ?? 0);
        }
        return true;
    }
    private conditionalExpressionBase_sempred(localContext: ConditionalExpressionBaseContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 1:
            return this.precpred(this.context, 12);
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
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,119,1023,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
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
        72,7,72,2,73,7,73,2,74,7,74,1,0,1,0,1,0,5,0,154,8,0,10,0,12,0,157,
        9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,
        173,8,1,10,1,12,1,176,9,1,3,1,178,8,1,1,2,1,2,1,2,1,2,1,3,1,3,1,
        3,1,4,1,4,1,4,3,4,190,8,4,1,4,1,4,1,4,1,4,3,4,196,8,4,1,5,1,5,1,
        6,1,6,1,7,1,7,1,8,1,8,1,9,1,9,1,9,1,9,5,9,210,8,9,10,9,12,9,213,
        9,9,1,9,1,9,1,10,1,10,1,11,1,11,1,12,1,12,1,12,3,12,224,8,12,1,13,
        1,13,1,13,3,13,229,8,13,1,14,1,14,1,14,1,14,1,15,1,15,1,16,1,16,
        1,17,1,17,1,17,1,17,1,18,1,18,1,18,1,18,1,18,3,18,248,8,18,1,19,
        1,19,1,19,1,19,3,19,254,8,19,1,20,1,20,1,21,5,21,259,8,21,10,21,
        12,21,262,9,21,1,21,3,21,265,8,21,1,21,1,21,1,21,3,21,270,8,21,1,
        21,1,21,1,22,1,22,1,22,1,23,1,23,1,23,1,24,1,24,1,24,5,24,283,8,
        24,10,24,12,24,286,9,24,1,25,3,25,289,8,25,1,25,1,25,1,25,1,25,3,
        25,295,8,25,1,26,1,26,1,26,1,26,5,26,301,8,26,10,26,12,26,304,9,
        26,1,26,1,26,1,26,1,27,1,27,1,27,1,27,1,28,1,28,1,28,1,28,5,28,317,
        8,28,10,28,12,28,320,9,28,3,28,322,8,28,1,28,3,28,325,8,28,1,28,
        1,28,1,29,1,29,1,29,1,29,1,29,5,29,334,8,29,10,29,12,29,337,9,29,
        3,29,339,8,29,1,30,1,30,1,30,1,30,5,30,345,8,30,10,30,12,30,348,
        9,30,3,30,350,8,30,1,30,3,30,353,8,30,1,30,1,30,1,30,1,30,1,30,1,
        30,1,30,1,30,3,30,363,8,30,1,31,1,31,1,32,5,32,368,8,32,10,32,12,
        32,371,9,32,1,32,3,32,374,8,32,1,32,1,32,1,32,5,32,379,8,32,10,32,
        12,32,382,9,32,1,32,1,32,1,32,5,32,387,8,32,10,32,12,32,390,9,32,
        1,32,1,32,1,32,1,32,1,32,1,32,5,32,398,8,32,10,32,12,32,401,9,32,
        1,32,1,32,3,32,405,8,32,1,33,3,33,408,8,33,1,33,1,33,1,33,3,33,413,
        8,33,1,34,1,34,1,34,3,34,418,8,34,1,35,1,35,1,36,1,36,1,36,1,36,
        1,36,3,36,427,8,36,1,37,1,37,3,37,431,8,37,1,37,1,37,1,38,3,38,436,
        8,38,1,38,1,38,1,39,1,39,3,39,442,8,39,1,40,1,40,1,40,1,40,5,40,
        448,8,40,10,40,12,40,451,9,40,3,40,453,8,40,1,40,1,40,1,40,1,41,
        1,41,1,41,1,41,1,41,1,41,1,41,1,41,3,41,466,8,41,1,42,1,42,1,42,
        1,43,1,43,5,43,473,8,43,10,43,12,43,476,9,43,1,43,1,43,1,44,1,44,
        3,44,482,8,44,1,45,1,45,1,45,1,45,1,45,1,45,1,45,1,46,1,46,1,46,
        1,47,1,47,1,47,1,47,1,47,1,47,1,48,1,48,5,48,502,8,48,10,48,12,48,
        505,9,48,1,48,3,48,508,8,48,1,49,1,49,1,49,1,49,1,49,1,49,1,49,5,
        49,517,8,49,10,49,12,49,520,9,49,1,49,1,49,1,50,1,50,3,50,526,8,
        50,1,50,1,50,3,50,530,8,50,1,50,1,50,3,50,534,8,50,1,50,1,50,3,50,
        538,8,50,1,50,1,50,1,50,3,50,543,8,50,1,50,1,50,3,50,547,8,50,3,
        50,549,8,50,1,51,1,51,1,51,1,51,5,51,555,8,51,10,51,12,51,558,9,
        51,1,52,1,52,1,52,5,52,563,8,52,10,52,12,52,566,9,52,1,53,1,53,1,
        53,1,53,1,53,1,53,3,53,574,8,53,1,53,1,53,1,53,1,53,1,53,1,53,1,
        53,1,53,1,53,1,53,1,53,3,53,587,8,53,1,53,1,53,5,53,591,8,53,10,
        53,12,53,594,9,53,1,53,1,53,3,53,598,8,53,1,53,1,53,3,53,602,8,53,
        1,53,1,53,5,53,606,8,53,10,53,12,53,609,9,53,1,53,1,53,1,53,3,53,
        614,8,53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,3,53,625,8,
        53,3,53,627,8,53,1,54,1,54,3,54,631,8,54,1,54,1,54,1,55,1,55,1,55,
        1,55,1,55,3,55,640,8,55,1,56,1,56,1,56,1,56,1,56,1,56,3,56,648,8,
        56,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,
        57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,
        57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,
        57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,
        57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,
        57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,
        57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,3,57,736,8,57,1,58,1,
        58,1,58,1,58,1,59,1,59,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,
        60,1,60,1,60,1,60,5,60,756,8,60,10,60,12,60,759,9,60,1,60,1,60,3,
        60,763,8,60,1,61,1,61,1,62,1,62,1,62,3,62,770,8,62,1,62,1,62,3,62,
        774,8,62,3,62,776,8,62,1,62,1,62,1,62,1,62,1,62,1,62,1,62,1,62,1,
        62,4,62,787,8,62,11,62,12,62,788,1,62,1,62,1,62,4,62,794,8,62,11,
        62,12,62,795,1,62,1,62,1,62,4,62,801,8,62,11,62,12,62,802,1,62,1,
        62,1,62,4,62,808,8,62,11,62,12,62,809,1,62,1,62,1,62,4,62,815,8,
        62,11,62,12,62,816,1,62,1,62,1,62,4,62,822,8,62,11,62,12,62,823,
        1,62,1,62,1,62,4,62,829,8,62,11,62,12,62,830,1,62,1,62,1,62,4,62,
        836,8,62,11,62,12,62,837,1,62,1,62,1,62,4,62,843,8,62,11,62,12,62,
        844,1,62,1,62,1,62,4,62,850,8,62,11,62,12,62,851,5,62,854,8,62,10,
        62,12,62,857,9,62,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,
        63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,3,63,877,8,63,1,64,1,
        64,5,64,881,8,64,10,64,12,64,884,9,64,1,64,1,64,1,64,1,64,1,64,3,
        64,891,8,64,1,64,5,64,894,8,64,10,64,12,64,897,9,64,5,64,899,8,64,
        10,64,12,64,902,9,64,1,65,1,65,1,65,1,65,3,65,908,8,65,1,66,1,66,
        1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,
        5,66,925,8,66,10,66,12,66,928,9,66,1,66,3,66,931,8,66,1,67,1,67,
        3,67,935,8,67,1,68,1,68,1,68,1,68,1,68,5,68,942,8,68,10,68,12,68,
        945,9,68,1,68,1,68,5,68,949,8,68,10,68,12,68,952,9,68,1,68,1,68,
        1,69,1,69,3,69,958,8,69,1,69,1,69,1,69,1,69,1,69,3,69,965,8,69,1,
        69,3,69,968,8,69,1,69,1,69,3,69,972,8,69,1,69,3,69,975,8,69,1,69,
        1,69,1,69,3,69,980,8,69,1,69,1,69,5,69,984,8,69,10,69,12,69,987,
        9,69,1,69,3,69,990,8,69,1,70,3,70,993,8,70,1,70,1,70,1,71,1,71,1,
        71,5,71,1000,8,71,10,71,12,71,1003,9,71,1,72,1,72,1,72,5,72,1008,
        8,72,10,72,12,72,1011,9,72,1,73,1,73,1,73,1,73,1,74,1,74,1,74,1,
        74,3,74,1021,8,74,1,74,0,1,124,75,0,2,4,6,8,10,12,14,16,18,20,22,
        24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,
        68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,
        108,110,112,114,116,118,120,122,124,126,128,130,132,134,136,138,
        140,142,144,146,148,0,17,2,0,12,12,14,14,2,0,13,13,22,24,3,0,11,
        11,29,29,43,43,3,0,1,1,105,105,109,109,2,0,1,1,109,109,1,0,47,53,
        1,0,47,51,8,0,5,6,17,17,28,28,30,32,35,35,37,38,42,42,44,44,2,0,
        25,25,77,77,2,0,105,107,109,110,1,0,84,93,1,0,67,68,1,0,63,66,1,
        0,61,62,1,0,54,55,1,0,56,58,1,0,111,112,1135,0,155,1,0,0,0,2,177,
        1,0,0,0,4,179,1,0,0,0,6,183,1,0,0,0,8,195,1,0,0,0,10,197,1,0,0,0,
        12,199,1,0,0,0,14,201,1,0,0,0,16,203,1,0,0,0,18,205,1,0,0,0,20,216,
        1,0,0,0,22,218,1,0,0,0,24,223,1,0,0,0,26,225,1,0,0,0,28,230,1,0,
        0,0,30,234,1,0,0,0,32,236,1,0,0,0,34,238,1,0,0,0,36,247,1,0,0,0,
        38,253,1,0,0,0,40,255,1,0,0,0,42,260,1,0,0,0,44,273,1,0,0,0,46,276,
        1,0,0,0,48,279,1,0,0,0,50,294,1,0,0,0,52,296,1,0,0,0,54,308,1,0,
        0,0,56,312,1,0,0,0,58,328,1,0,0,0,60,362,1,0,0,0,62,364,1,0,0,0,
        64,404,1,0,0,0,66,407,1,0,0,0,68,417,1,0,0,0,70,419,1,0,0,0,72,426,
        1,0,0,0,74,428,1,0,0,0,76,435,1,0,0,0,78,441,1,0,0,0,80,443,1,0,
        0,0,82,465,1,0,0,0,84,467,1,0,0,0,86,470,1,0,0,0,88,481,1,0,0,0,
        90,483,1,0,0,0,92,490,1,0,0,0,94,493,1,0,0,0,96,499,1,0,0,0,98,509,
        1,0,0,0,100,548,1,0,0,0,102,550,1,0,0,0,104,559,1,0,0,0,106,626,
        1,0,0,0,108,628,1,0,0,0,110,639,1,0,0,0,112,647,1,0,0,0,114,735,
        1,0,0,0,116,737,1,0,0,0,118,741,1,0,0,0,120,762,1,0,0,0,122,764,
        1,0,0,0,124,775,1,0,0,0,126,876,1,0,0,0,128,878,1,0,0,0,130,903,
        1,0,0,0,132,930,1,0,0,0,134,934,1,0,0,0,136,936,1,0,0,0,138,989,
        1,0,0,0,140,992,1,0,0,0,142,996,1,0,0,0,144,1004,1,0,0,0,146,1012,
        1,0,0,0,148,1020,1,0,0,0,150,154,3,38,19,0,151,154,3,2,1,0,152,154,
        3,34,17,0,153,150,1,0,0,0,153,151,1,0,0,0,153,152,1,0,0,0,154,157,
        1,0,0,0,155,153,1,0,0,0,155,156,1,0,0,0,156,158,1,0,0,0,157,155,
        1,0,0,0,158,159,5,0,0,1,159,1,1,0,0,0,160,178,3,8,4,0,161,162,5,
        21,0,0,162,163,3,14,7,0,163,164,3,16,8,0,164,178,1,0,0,0,165,178,
        3,6,3,0,166,178,3,4,2,0,167,168,5,21,0,0,168,169,3,32,16,0,169,174,
        5,1,0,0,170,171,5,79,0,0,171,173,5,1,0,0,172,170,1,0,0,0,173,176,
        1,0,0,0,174,172,1,0,0,0,174,175,1,0,0,0,175,178,1,0,0,0,176,174,
        1,0,0,0,177,160,1,0,0,0,177,161,1,0,0,0,177,165,1,0,0,0,177,166,
        1,0,0,0,177,167,1,0,0,0,178,3,1,0,0,0,179,180,5,21,0,0,180,181,3,
        22,11,0,181,182,3,24,12,0,182,5,1,0,0,0,183,184,5,115,0,0,184,185,
        5,117,0,0,185,7,1,0,0,0,186,187,5,21,0,0,187,189,3,12,6,0,188,190,
        5,72,0,0,189,188,1,0,0,0,189,190,1,0,0,0,190,191,1,0,0,0,191,192,
        3,16,8,0,192,196,1,0,0,0,193,194,5,21,0,0,194,196,3,10,5,0,195,186,
        1,0,0,0,195,193,1,0,0,0,196,9,1,0,0,0,197,198,7,0,0,0,198,11,1,0,
        0,0,199,200,7,1,0,0,200,13,1,0,0,0,201,202,7,2,0,0,202,15,1,0,0,
        0,203,204,7,3,0,0,204,17,1,0,0,0,205,206,5,98,0,0,206,211,5,1,0,
        0,207,208,5,79,0,0,208,210,5,1,0,0,209,207,1,0,0,0,210,213,1,0,0,
        0,211,209,1,0,0,0,211,212,1,0,0,0,212,214,1,0,0,0,213,211,1,0,0,
        0,214,215,5,99,0,0,215,19,1,0,0,0,216,217,3,134,67,0,217,21,1,0,
        0,0,218,219,5,26,0,0,219,23,1,0,0,0,220,224,3,28,14,0,221,224,3,
        30,15,0,222,224,5,1,0,0,223,220,1,0,0,0,223,221,1,0,0,0,223,222,
        1,0,0,0,224,25,1,0,0,0,225,228,5,1,0,0,226,227,5,81,0,0,227,229,
        5,1,0,0,228,226,1,0,0,0,228,229,1,0,0,0,229,27,1,0,0,0,230,231,5,
        63,0,0,231,232,3,26,13,0,232,233,5,64,0,0,233,29,1,0,0,0,234,235,
        5,109,0,0,235,31,1,0,0,0,236,237,5,33,0,0,237,33,1,0,0,0,238,239,
        5,27,0,0,239,240,7,4,0,0,240,241,5,78,0,0,241,35,1,0,0,0,242,243,
        5,83,0,0,243,248,3,134,67,0,244,245,5,109,0,0,245,246,5,83,0,0,246,
        248,3,134,67,0,247,242,1,0,0,0,247,244,1,0,0,0,248,37,1,0,0,0,249,
        254,3,44,22,0,250,254,3,46,23,0,251,254,3,52,26,0,252,254,3,64,32,
        0,253,249,1,0,0,0,253,250,1,0,0,0,253,251,1,0,0,0,253,252,1,0,0,
        0,254,39,1,0,0,0,255,256,7,5,0,0,256,41,1,0,0,0,257,259,3,40,20,
        0,258,257,1,0,0,0,259,262,1,0,0,0,260,258,1,0,0,0,260,261,1,0,0,
        0,261,264,1,0,0,0,262,260,1,0,0,0,263,265,3,78,39,0,264,263,1,0,
        0,0,264,265,1,0,0,0,265,266,1,0,0,0,266,267,5,1,0,0,267,269,5,98,
        0,0,268,270,3,48,24,0,269,268,1,0,0,0,269,270,1,0,0,0,270,271,1,
        0,0,0,271,272,5,99,0,0,272,43,1,0,0,0,273,274,3,42,21,0,274,275,
        5,78,0,0,275,45,1,0,0,0,276,277,3,42,21,0,277,278,3,86,43,0,278,
        47,1,0,0,0,279,284,3,50,25,0,280,281,5,79,0,0,281,283,3,50,25,0,
        282,280,1,0,0,0,283,286,1,0,0,0,284,282,1,0,0,0,284,285,1,0,0,0,
        285,49,1,0,0,0,286,284,1,0,0,0,287,289,3,78,39,0,288,287,1,0,0,0,
        288,289,1,0,0,0,289,290,1,0,0,0,290,295,5,1,0,0,291,292,5,36,0,0,
        292,293,5,1,0,0,293,295,5,1,0,0,294,288,1,0,0,0,294,291,1,0,0,0,
        295,51,1,0,0,0,296,297,5,36,0,0,297,298,5,1,0,0,298,302,5,100,0,
        0,299,301,3,54,27,0,300,299,1,0,0,0,301,304,1,0,0,0,302,300,1,0,
        0,0,302,303,1,0,0,0,303,305,1,0,0,0,304,302,1,0,0,0,305,306,5,101,
        0,0,306,307,5,78,0,0,307,53,1,0,0,0,308,309,3,78,39,0,309,310,5,
        1,0,0,310,311,5,78,0,0,311,55,1,0,0,0,312,321,5,94,0,0,313,318,3,
        134,67,0,314,315,5,79,0,0,315,317,3,134,67,0,316,314,1,0,0,0,317,
        320,1,0,0,0,318,316,1,0,0,0,318,319,1,0,0,0,319,322,1,0,0,0,320,
        318,1,0,0,0,321,313,1,0,0,0,321,322,1,0,0,0,322,324,1,0,0,0,323,
        325,5,79,0,0,324,323,1,0,0,0,324,325,1,0,0,0,325,326,1,0,0,0,326,
        327,5,95,0,0,327,57,1,0,0,0,328,338,3,134,67,0,329,330,5,77,0,0,
        330,335,3,134,67,0,331,332,5,78,0,0,332,334,3,134,67,0,333,331,1,
        0,0,0,334,337,1,0,0,0,335,333,1,0,0,0,335,336,1,0,0,0,336,339,1,
        0,0,0,337,335,1,0,0,0,338,329,1,0,0,0,338,339,1,0,0,0,339,59,1,0,
        0,0,340,349,5,96,0,0,341,346,3,58,29,0,342,343,5,79,0,0,343,345,
        3,58,29,0,344,342,1,0,0,0,345,348,1,0,0,0,346,344,1,0,0,0,346,347,
        1,0,0,0,347,350,1,0,0,0,348,346,1,0,0,0,349,341,1,0,0,0,349,350,
        1,0,0,0,350,352,1,0,0,0,351,353,5,79,0,0,352,351,1,0,0,0,352,353,
        1,0,0,0,353,354,1,0,0,0,354,355,5,103,0,0,355,363,5,99,0,0,356,357,
        5,96,0,0,357,358,5,77,0,0,358,359,3,134,67,0,359,360,5,103,0,0,360,
        361,5,99,0,0,361,363,1,0,0,0,362,340,1,0,0,0,362,356,1,0,0,0,363,
        61,1,0,0,0,364,365,7,6,0,0,365,63,1,0,0,0,366,368,3,62,31,0,367,
        366,1,0,0,0,368,371,1,0,0,0,369,367,1,0,0,0,369,370,1,0,0,0,370,
        373,1,0,0,0,371,369,1,0,0,0,372,374,3,70,35,0,373,372,1,0,0,0,373,
        374,1,0,0,0,374,375,1,0,0,0,375,380,3,66,33,0,376,377,5,79,0,0,377,
        379,3,66,33,0,378,376,1,0,0,0,379,382,1,0,0,0,380,378,1,0,0,0,380,
        381,1,0,0,0,381,383,1,0,0,0,382,380,1,0,0,0,383,384,5,78,0,0,384,
        405,1,0,0,0,385,387,3,62,31,0,386,385,1,0,0,0,387,390,1,0,0,0,388,
        386,1,0,0,0,388,389,1,0,0,0,389,391,1,0,0,0,390,388,1,0,0,0,391,
        392,5,36,0,0,392,393,5,1,0,0,393,399,3,66,33,0,394,395,5,79,0,0,
        395,396,5,1,0,0,396,398,3,66,33,0,397,394,1,0,0,0,398,401,1,0,0,
        0,399,397,1,0,0,0,399,400,1,0,0,0,400,402,1,0,0,0,401,399,1,0,0,
        0,402,403,5,78,0,0,403,405,1,0,0,0,404,369,1,0,0,0,404,388,1,0,0,
        0,405,65,1,0,0,0,406,408,5,56,0,0,407,406,1,0,0,0,407,408,1,0,0,
        0,408,409,1,0,0,0,409,412,5,1,0,0,410,411,5,84,0,0,411,413,3,68,
        34,0,412,410,1,0,0,0,412,413,1,0,0,0,413,67,1,0,0,0,414,418,3,134,
        67,0,415,418,3,56,28,0,416,418,3,60,30,0,417,414,1,0,0,0,417,415,
        1,0,0,0,417,416,1,0,0,0,418,69,1,0,0,0,419,420,7,7,0,0,420,71,1,
        0,0,0,421,427,3,134,67,0,422,423,3,134,67,0,423,424,5,80,0,0,424,
        425,3,134,67,0,425,427,1,0,0,0,426,421,1,0,0,0,426,422,1,0,0,0,427,
        73,1,0,0,0,428,430,5,98,0,0,429,431,3,142,71,0,430,429,1,0,0,0,430,
        431,1,0,0,0,431,432,1,0,0,0,432,433,5,99,0,0,433,75,1,0,0,0,434,
        436,3,70,35,0,435,434,1,0,0,0,435,436,1,0,0,0,436,437,1,0,0,0,437,
        438,5,56,0,0,438,77,1,0,0,0,439,442,3,70,35,0,440,442,3,76,38,0,
        441,439,1,0,0,0,441,440,1,0,0,0,442,79,1,0,0,0,443,444,5,98,0,0,
        444,452,5,77,0,0,445,453,3,134,67,0,446,448,3,82,41,0,447,446,1,
        0,0,0,448,451,1,0,0,0,449,447,1,0,0,0,449,450,1,0,0,0,450,453,1,
        0,0,0,451,449,1,0,0,0,452,445,1,0,0,0,452,449,1,0,0,0,453,454,1,
        0,0,0,454,455,5,77,0,0,455,456,5,99,0,0,456,81,1,0,0,0,457,466,3,
        84,42,0,458,466,3,86,43,0,459,466,3,88,44,0,460,466,3,106,53,0,461,
        466,3,110,55,0,462,466,3,64,32,0,463,466,3,8,4,0,464,466,3,108,54,
        0,465,457,1,0,0,0,465,458,1,0,0,0,465,459,1,0,0,0,465,460,1,0,0,
        0,465,461,1,0,0,0,465,462,1,0,0,0,465,463,1,0,0,0,465,464,1,0,0,
        0,466,83,1,0,0,0,467,468,3,134,67,0,468,469,5,78,0,0,469,85,1,0,
        0,0,470,474,5,100,0,0,471,473,3,82,41,0,472,471,1,0,0,0,473,476,
        1,0,0,0,474,472,1,0,0,0,474,475,1,0,0,0,475,477,1,0,0,0,476,474,
        1,0,0,0,477,478,5,101,0,0,478,87,1,0,0,0,479,482,3,96,48,0,480,482,
        3,98,49,0,481,479,1,0,0,0,481,480,1,0,0,0,482,89,1,0,0,0,483,484,
        5,12,0,0,484,485,5,22,0,0,485,486,5,98,0,0,486,487,3,134,67,0,487,
        488,5,99,0,0,488,489,3,82,41,0,489,91,1,0,0,0,490,491,5,12,0,0,491,
        492,3,82,41,0,492,93,1,0,0,0,493,494,5,22,0,0,494,495,5,98,0,0,495,
        496,3,134,67,0,496,497,5,99,0,0,497,498,3,82,41,0,498,95,1,0,0,0,
        499,503,3,94,47,0,500,502,3,90,45,0,501,500,1,0,0,0,502,505,1,0,
        0,0,503,501,1,0,0,0,503,504,1,0,0,0,504,507,1,0,0,0,505,503,1,0,
        0,0,506,508,3,92,46,0,507,506,1,0,0,0,507,508,1,0,0,0,508,97,1,0,
        0,0,509,510,5,39,0,0,510,511,5,98,0,0,511,512,3,134,67,0,512,513,
        5,99,0,0,513,518,5,100,0,0,514,517,3,102,51,0,515,517,3,104,52,0,
        516,514,1,0,0,0,516,515,1,0,0,0,517,520,1,0,0,0,518,516,1,0,0,0,
        518,519,1,0,0,0,519,521,1,0,0,0,520,518,1,0,0,0,521,522,5,101,0,
        0,522,99,1,0,0,0,523,530,5,109,0,0,524,526,5,55,0,0,525,524,1,0,
        0,0,525,526,1,0,0,0,526,527,1,0,0,0,527,530,5,105,0,0,528,530,5,
        1,0,0,529,523,1,0,0,0,529,525,1,0,0,0,529,528,1,0,0,0,530,549,1,
        0,0,0,531,538,5,109,0,0,532,534,5,55,0,0,533,532,1,0,0,0,533,534,
        1,0,0,0,534,535,1,0,0,0,535,538,5,105,0,0,536,538,5,1,0,0,537,531,
        1,0,0,0,537,533,1,0,0,0,537,536,1,0,0,0,538,539,1,0,0,0,539,546,
        5,80,0,0,540,547,5,109,0,0,541,543,5,55,0,0,542,541,1,0,0,0,542,
        543,1,0,0,0,543,544,1,0,0,0,544,547,5,105,0,0,545,547,5,1,0,0,546,
        540,1,0,0,0,546,542,1,0,0,0,546,545,1,0,0,0,547,549,1,0,0,0,548,
        529,1,0,0,0,548,537,1,0,0,0,549,101,1,0,0,0,550,551,5,3,0,0,551,
        552,3,100,50,0,552,556,5,77,0,0,553,555,3,82,41,0,554,553,1,0,0,
        0,555,558,1,0,0,0,556,554,1,0,0,0,556,557,1,0,0,0,557,103,1,0,0,
        0,558,556,1,0,0,0,559,560,5,9,0,0,560,564,5,77,0,0,561,563,3,82,
        41,0,562,561,1,0,0,0,563,566,1,0,0,0,564,562,1,0,0,0,564,565,1,0,
        0,0,565,105,1,0,0,0,566,564,1,0,0,0,567,568,5,46,0,0,568,569,5,98,
        0,0,569,570,3,134,67,0,570,573,5,99,0,0,571,574,3,82,41,0,572,574,
        5,78,0,0,573,571,1,0,0,0,573,572,1,0,0,0,574,627,1,0,0,0,575,576,
        5,10,0,0,576,577,3,82,41,0,577,578,5,46,0,0,578,579,5,98,0,0,579,
        580,3,134,67,0,580,581,5,99,0,0,581,582,5,78,0,0,582,627,1,0,0,0,
        583,584,5,18,0,0,584,586,5,98,0,0,585,587,3,134,67,0,586,585,1,0,
        0,0,586,587,1,0,0,0,587,592,1,0,0,0,588,589,5,79,0,0,589,591,3,134,
        67,0,590,588,1,0,0,0,591,594,1,0,0,0,592,590,1,0,0,0,592,593,1,0,
        0,0,593,595,1,0,0,0,594,592,1,0,0,0,595,597,5,78,0,0,596,598,3,134,
        67,0,597,596,1,0,0,0,597,598,1,0,0,0,598,599,1,0,0,0,599,601,5,78,
        0,0,600,602,3,134,67,0,601,600,1,0,0,0,601,602,1,0,0,0,602,607,1,
        0,0,0,603,604,5,79,0,0,604,606,3,134,67,0,605,603,1,0,0,0,606,609,
        1,0,0,0,607,605,1,0,0,0,607,608,1,0,0,0,608,610,1,0,0,0,609,607,
        1,0,0,0,610,613,5,99,0,0,611,614,3,82,41,0,612,614,5,78,0,0,613,
        611,1,0,0,0,613,612,1,0,0,0,614,627,1,0,0,0,615,616,5,19,0,0,616,
        617,5,98,0,0,617,618,3,78,39,0,618,619,5,1,0,0,619,620,7,8,0,0,620,
        621,3,134,67,0,621,624,5,99,0,0,622,625,3,82,41,0,623,625,5,78,0,
        0,624,622,1,0,0,0,624,623,1,0,0,0,625,627,1,0,0,0,626,567,1,0,0,
        0,626,575,1,0,0,0,626,583,1,0,0,0,626,615,1,0,0,0,627,107,1,0,0,
        0,628,630,5,34,0,0,629,631,3,134,67,0,630,629,1,0,0,0,630,631,1,
        0,0,0,631,632,1,0,0,0,632,633,5,78,0,0,633,109,1,0,0,0,634,635,5,
        2,0,0,635,640,5,78,0,0,636,637,5,8,0,0,637,640,5,78,0,0,638,640,
        3,108,54,0,639,634,1,0,0,0,639,636,1,0,0,0,639,638,1,0,0,0,640,111,
        1,0,0,0,641,648,5,1,0,0,642,643,5,98,0,0,643,644,3,134,67,0,644,
        645,5,99,0,0,645,648,1,0,0,0,646,648,5,109,0,0,647,641,1,0,0,0,647,
        642,1,0,0,0,647,646,1,0,0,0,648,113,1,0,0,0,649,650,5,82,0,0,650,
        736,5,1,0,0,651,652,5,21,0,0,652,653,5,82,0,0,653,736,3,134,67,0,
        654,655,5,21,0,0,655,656,5,82,0,0,656,736,5,54,0,0,657,658,5,21,
        0,0,658,659,5,82,0,0,659,736,5,55,0,0,660,661,5,21,0,0,661,662,5,
        82,0,0,662,736,5,56,0,0,663,664,5,21,0,0,664,665,5,82,0,0,665,736,
        5,57,0,0,666,667,5,21,0,0,667,668,5,82,0,0,668,736,5,58,0,0,669,
        670,5,21,0,0,670,671,5,82,0,0,671,736,5,63,0,0,672,673,5,21,0,0,
        673,674,5,82,0,0,674,736,5,64,0,0,675,676,5,21,0,0,676,677,5,82,
        0,0,677,736,5,65,0,0,678,679,5,21,0,0,679,680,5,82,0,0,680,736,5,
        66,0,0,681,682,5,21,0,0,682,683,5,82,0,0,683,736,5,67,0,0,684,685,
        5,21,0,0,685,686,5,82,0,0,686,736,5,68,0,0,687,688,5,21,0,0,688,
        689,5,82,0,0,689,736,5,69,0,0,690,691,5,21,0,0,691,692,5,82,0,0,
        692,736,5,70,0,0,693,694,5,21,0,0,694,695,5,82,0,0,695,736,5,71,
        0,0,696,697,5,21,0,0,697,698,5,82,0,0,698,736,5,74,0,0,699,700,5,
        21,0,0,700,701,5,82,0,0,701,736,5,75,0,0,702,703,5,21,0,0,703,704,
        5,82,0,0,704,736,5,85,0,0,705,706,5,21,0,0,706,707,5,82,0,0,707,
        736,5,86,0,0,708,709,5,21,0,0,709,710,5,82,0,0,710,736,5,87,0,0,
        711,712,5,21,0,0,712,713,5,82,0,0,713,736,5,88,0,0,714,715,5,21,
        0,0,715,716,5,82,0,0,716,736,5,89,0,0,717,718,5,21,0,0,718,719,5,
        82,0,0,719,736,5,90,0,0,720,721,5,21,0,0,721,722,5,82,0,0,722,736,
        5,91,0,0,723,724,5,21,0,0,724,725,5,82,0,0,725,736,5,92,0,0,726,
        727,5,21,0,0,727,728,5,82,0,0,728,736,5,76,0,0,729,730,5,21,0,0,
        730,731,5,82,0,0,731,736,5,61,0,0,732,733,5,21,0,0,733,734,5,82,
        0,0,734,736,5,62,0,0,735,649,1,0,0,0,735,651,1,0,0,0,735,654,1,0,
        0,0,735,657,1,0,0,0,735,660,1,0,0,0,735,663,1,0,0,0,735,666,1,0,
        0,0,735,669,1,0,0,0,735,672,1,0,0,0,735,675,1,0,0,0,735,678,1,0,
        0,0,735,681,1,0,0,0,735,684,1,0,0,0,735,687,1,0,0,0,735,690,1,0,
        0,0,735,693,1,0,0,0,735,696,1,0,0,0,735,699,1,0,0,0,735,702,1,0,
        0,0,735,705,1,0,0,0,735,708,1,0,0,0,735,711,1,0,0,0,735,714,1,0,
        0,0,735,717,1,0,0,0,735,720,1,0,0,0,735,723,1,0,0,0,735,726,1,0,
        0,0,735,729,1,0,0,0,735,732,1,0,0,0,736,115,1,0,0,0,737,738,5,64,
        0,0,738,739,5,66,0,0,739,740,4,58,0,1,740,117,1,0,0,0,741,742,7,
        9,0,0,742,119,1,0,0,0,743,744,5,98,0,0,744,745,3,78,39,0,745,746,
        5,99,0,0,746,747,3,134,67,0,747,763,1,0,0,0,748,749,5,98,0,0,749,
        750,5,63,0,0,750,751,5,1,0,0,751,752,5,64,0,0,752,757,3,134,67,0,
        753,754,5,79,0,0,754,756,3,134,67,0,755,753,1,0,0,0,756,759,1,0,
        0,0,757,755,1,0,0,0,757,758,1,0,0,0,758,760,1,0,0,0,759,757,1,0,
        0,0,760,761,5,99,0,0,761,763,1,0,0,0,762,743,1,0,0,0,762,748,1,0,
        0,0,763,121,1,0,0,0,764,765,7,10,0,0,765,123,1,0,0,0,766,767,6,62,
        -1,0,767,776,3,126,63,0,768,770,3,126,63,0,769,768,1,0,0,0,769,770,
        1,0,0,0,770,771,1,0,0,0,771,773,5,80,0,0,772,774,3,126,63,0,773,
        772,1,0,0,0,773,774,1,0,0,0,774,776,1,0,0,0,775,766,1,0,0,0,775,
        769,1,0,0,0,776,855,1,0,0,0,777,778,10,12,0,0,778,779,5,76,0,0,779,
        780,3,134,67,0,780,781,5,77,0,0,781,782,3,134,67,0,782,854,1,0,0,
        0,783,786,10,11,0,0,784,785,5,75,0,0,785,787,3,124,62,0,786,784,
        1,0,0,0,787,788,1,0,0,0,788,786,1,0,0,0,788,789,1,0,0,0,789,854,
        1,0,0,0,790,793,10,10,0,0,791,792,5,74,0,0,792,794,3,124,62,0,793,
        791,1,0,0,0,794,795,1,0,0,0,795,793,1,0,0,0,795,796,1,0,0,0,796,
        854,1,0,0,0,797,800,10,9,0,0,798,799,5,70,0,0,799,801,3,124,62,0,
        800,798,1,0,0,0,801,802,1,0,0,0,802,800,1,0,0,0,802,803,1,0,0,0,
        803,854,1,0,0,0,804,807,10,8,0,0,805,806,5,71,0,0,806,808,3,124,
        62,0,807,805,1,0,0,0,808,809,1,0,0,0,809,807,1,0,0,0,809,810,1,0,
        0,0,810,854,1,0,0,0,811,814,10,7,0,0,812,813,5,69,0,0,813,815,3,
        124,62,0,814,812,1,0,0,0,815,816,1,0,0,0,816,814,1,0,0,0,816,817,
        1,0,0,0,817,854,1,0,0,0,818,821,10,6,0,0,819,820,7,11,0,0,820,822,
        3,124,62,0,821,819,1,0,0,0,822,823,1,0,0,0,823,821,1,0,0,0,823,824,
        1,0,0,0,824,854,1,0,0,0,825,828,10,5,0,0,826,827,7,12,0,0,827,829,
        3,124,62,0,828,826,1,0,0,0,829,830,1,0,0,0,830,828,1,0,0,0,830,831,
        1,0,0,0,831,854,1,0,0,0,832,835,10,4,0,0,833,834,7,13,0,0,834,836,
        3,124,62,0,835,833,1,0,0,0,836,837,1,0,0,0,837,835,1,0,0,0,837,838,
        1,0,0,0,838,854,1,0,0,0,839,842,10,3,0,0,840,841,7,14,0,0,841,843,
        3,124,62,0,842,840,1,0,0,0,843,844,1,0,0,0,844,842,1,0,0,0,844,845,
        1,0,0,0,845,854,1,0,0,0,846,849,10,2,0,0,847,848,7,15,0,0,848,850,
        3,124,62,0,849,847,1,0,0,0,850,851,1,0,0,0,851,849,1,0,0,0,851,852,
        1,0,0,0,852,854,1,0,0,0,853,777,1,0,0,0,853,783,1,0,0,0,853,790,
        1,0,0,0,853,797,1,0,0,0,853,804,1,0,0,0,853,811,1,0,0,0,853,818,
        1,0,0,0,853,825,1,0,0,0,853,832,1,0,0,0,853,839,1,0,0,0,853,846,
        1,0,0,0,854,857,1,0,0,0,855,853,1,0,0,0,855,856,1,0,0,0,856,125,
        1,0,0,0,857,855,1,0,0,0,858,877,3,120,60,0,859,877,3,128,64,0,860,
        861,5,54,0,0,861,877,3,134,67,0,862,863,5,55,0,0,863,877,3,134,67,
        0,864,865,5,72,0,0,865,877,3,134,67,0,866,867,5,73,0,0,867,877,3,
        134,67,0,868,869,5,59,0,0,869,877,3,134,67,0,870,871,5,60,0,0,871,
        877,3,134,67,0,872,873,5,69,0,0,873,877,3,134,67,0,874,875,5,56,
        0,0,875,877,3,134,67,0,876,858,1,0,0,0,876,859,1,0,0,0,876,860,1,
        0,0,0,876,862,1,0,0,0,876,864,1,0,0,0,876,866,1,0,0,0,876,868,1,
        0,0,0,876,870,1,0,0,0,876,872,1,0,0,0,876,874,1,0,0,0,877,127,1,
        0,0,0,878,882,3,132,66,0,879,881,3,138,69,0,880,879,1,0,0,0,881,
        884,1,0,0,0,882,880,1,0,0,0,882,883,1,0,0,0,883,900,1,0,0,0,884,
        882,1,0,0,0,885,891,3,74,37,0,886,891,5,59,0,0,887,891,5,60,0,0,
        888,891,3,130,65,0,889,891,5,1,0,0,890,885,1,0,0,0,890,886,1,0,0,
        0,890,887,1,0,0,0,890,888,1,0,0,0,890,889,1,0,0,0,891,895,1,0,0,
        0,892,894,3,138,69,0,893,892,1,0,0,0,894,897,1,0,0,0,895,893,1,0,
        0,0,895,896,1,0,0,0,896,899,1,0,0,0,897,895,1,0,0,0,898,890,1,0,
        0,0,899,902,1,0,0,0,900,898,1,0,0,0,900,901,1,0,0,0,901,129,1,0,
        0,0,902,900,1,0,0,0,903,907,5,97,0,0,904,905,3,112,56,0,905,906,
        3,74,37,0,906,908,1,0,0,0,907,904,1,0,0,0,907,908,1,0,0,0,908,131,
        1,0,0,0,909,931,3,118,59,0,910,911,7,16,0,0,911,912,5,98,0,0,912,
        913,3,134,67,0,913,914,5,99,0,0,914,931,1,0,0,0,915,931,5,1,0,0,
        916,917,5,98,0,0,917,918,3,134,67,0,918,919,5,99,0,0,919,931,1,0,
        0,0,920,931,3,56,28,0,921,931,3,60,30,0,922,926,5,109,0,0,923,925,
        5,109,0,0,924,923,1,0,0,0,925,928,1,0,0,0,926,924,1,0,0,0,926,927,
        1,0,0,0,927,931,1,0,0,0,928,926,1,0,0,0,929,931,3,136,68,0,930,909,
        1,0,0,0,930,910,1,0,0,0,930,915,1,0,0,0,930,916,1,0,0,0,930,920,
        1,0,0,0,930,921,1,0,0,0,930,922,1,0,0,0,930,929,1,0,0,0,931,133,
        1,0,0,0,932,935,3,146,73,0,933,935,3,148,74,0,934,932,1,0,0,0,934,
        933,1,0,0,0,935,135,1,0,0,0,936,937,5,4,0,0,937,938,5,98,0,0,938,
        943,3,134,67,0,939,940,5,79,0,0,940,942,3,134,67,0,941,939,1,0,0,
        0,942,945,1,0,0,0,943,941,1,0,0,0,943,944,1,0,0,0,944,946,1,0,0,
        0,945,943,1,0,0,0,946,950,5,78,0,0,947,949,5,1,0,0,948,947,1,0,0,
        0,949,952,1,0,0,0,950,948,1,0,0,0,950,951,1,0,0,0,951,953,1,0,0,
        0,952,950,1,0,0,0,953,954,5,99,0,0,954,137,1,0,0,0,955,957,5,102,
        0,0,956,958,5,63,0,0,957,956,1,0,0,0,957,958,1,0,0,0,958,959,1,0,
        0,0,959,960,3,134,67,0,960,961,5,103,0,0,961,990,1,0,0,0,962,964,
        5,102,0,0,963,965,5,63,0,0,964,963,1,0,0,0,964,965,1,0,0,0,965,967,
        1,0,0,0,966,968,3,134,67,0,967,966,1,0,0,0,967,968,1,0,0,0,968,969,
        1,0,0,0,969,971,5,80,0,0,970,972,5,63,0,0,971,970,1,0,0,0,971,972,
        1,0,0,0,972,974,1,0,0,0,973,975,3,134,67,0,974,973,1,0,0,0,974,975,
        1,0,0,0,975,976,1,0,0,0,976,990,5,103,0,0,977,979,5,102,0,0,978,
        980,3,134,67,0,979,978,1,0,0,0,979,980,1,0,0,0,980,985,1,0,0,0,981,
        982,5,79,0,0,982,984,3,134,67,0,983,981,1,0,0,0,984,987,1,0,0,0,
        985,983,1,0,0,0,985,986,1,0,0,0,986,988,1,0,0,0,987,985,1,0,0,0,
        988,990,5,103,0,0,989,955,1,0,0,0,989,962,1,0,0,0,989,977,1,0,0,
        0,990,139,1,0,0,0,991,993,5,69,0,0,992,991,1,0,0,0,992,993,1,0,0,
        0,993,994,1,0,0,0,994,995,3,134,67,0,995,141,1,0,0,0,996,1001,3,
        140,70,0,997,998,5,79,0,0,998,1000,3,140,70,0,999,997,1,0,0,0,1000,
        1003,1,0,0,0,1001,999,1,0,0,0,1001,1002,1,0,0,0,1002,143,1,0,0,0,
        1003,1001,1,0,0,0,1004,1009,3,134,67,0,1005,1006,5,79,0,0,1006,1008,
        3,134,67,0,1007,1005,1,0,0,0,1008,1011,1,0,0,0,1009,1007,1,0,0,0,
        1009,1010,1,0,0,0,1010,145,1,0,0,0,1011,1009,1,0,0,0,1012,1013,3,
        124,62,0,1013,1014,3,122,61,0,1014,1015,3,134,67,0,1015,147,1,0,
        0,0,1016,1021,3,80,40,0,1017,1021,3,114,57,0,1018,1021,3,36,18,0,
        1019,1021,3,124,62,0,1020,1016,1,0,0,0,1020,1017,1,0,0,0,1020,1018,
        1,0,0,0,1020,1019,1,0,0,0,1021,149,1,0,0,0,111,153,155,174,177,189,
        195,211,223,228,247,253,260,264,269,284,288,294,302,318,321,324,
        335,338,346,349,352,362,369,373,380,388,399,404,407,412,417,426,
        430,435,441,449,452,465,474,481,503,507,516,518,525,529,533,537,
        542,546,548,556,564,573,586,592,597,601,607,613,624,626,630,639,
        647,735,757,762,769,773,775,788,795,802,809,816,823,830,837,844,
        851,853,855,876,882,890,895,900,907,926,930,934,943,950,957,964,
        967,971,974,979,985,989,992,1001,1009,1020
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
    public includeDirective(): IncludeDirectiveContext | null {
        return this.getRuleContext(0, IncludeDirectiveContext);
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
    public override get ruleIndex(): number {
        return LPCParser.RULE_directiveIncludeFile;
    }
    public override copyFrom(ctx: DirectiveIncludeFileContext): void {
        super.copyFrom(ctx);
    }
}
export class IncludeLocalFileContext extends DirectiveIncludeFileContext {
    public constructor(ctx: DirectiveIncludeFileContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public directiveIncludeFileLocal(): DirectiveIncludeFileLocalContext {
        return this.getRuleContext(0, DirectiveIncludeFileLocalContext)!;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterIncludeLocalFile) {
             listener.enterIncludeLocalFile(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitIncludeLocalFile) {
             listener.exitIncludeLocalFile(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitIncludeLocalFile) {
            return visitor.visitIncludeLocalFile(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class IncludeGlobalFileContext extends DirectiveIncludeFileContext {
    public constructor(ctx: DirectiveIncludeFileContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public directiveIncludeFileGlobal(): DirectiveIncludeFileGlobalContext {
        return this.getRuleContext(0, DirectiveIncludeFileGlobalContext)!;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterIncludeGlobalFile) {
             listener.enterIncludeGlobalFile(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitIncludeGlobalFile) {
             listener.exitIncludeGlobalFile(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitIncludeGlobalFile) {
            return visitor.visitIncludeGlobalFile(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class IncludeDefineContext extends DirectiveIncludeFileContext {
    public constructor(ctx: DirectiveIncludeFileContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterIncludeDefine) {
             listener.enterIncludeDefine(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitIncludeDefine) {
             listener.exitIncludeDefine(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitIncludeDefine) {
            return visitor.visitIncludeDefine(this);
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
    public constructor(ctx: VariableDeclarationContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public variableDeclarator(): VariableDeclaratorContext[];
    public variableDeclarator(i: number): VariableDeclaratorContext | null;
    public variableDeclarator(i?: number): VariableDeclaratorContext[] | VariableDeclaratorContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VariableDeclaratorContext);
        }

        return this.getRuleContext(i, VariableDeclaratorContext);
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
    public variableDeclarator(): VariableDeclaratorContext[];
    public variableDeclarator(i: number): VariableDeclaratorContext | null;
    public variableDeclarator(i?: number): VariableDeclaratorContext[] | VariableDeclaratorContext | null {
        if (i === undefined) {
            return this.getRuleContexts(VariableDeclaratorContext);
        }

        return this.getRuleContext(i, VariableDeclaratorContext);
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


export class VariableDeclaratorContext extends antlr.ParserRuleContext {
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


export class IndexerArgumentContext extends antlr.ParserRuleContext {
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
    public DOUBLEDOT(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.DOUBLEDOT, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_indexerArgument;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterIndexerArgument) {
             listener.enterIndexerArgument(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitIndexerArgument) {
             listener.exitIndexerArgument(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitIndexerArgument) {
            return visitor.visitIndexerArgument(this);
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
    public Identifier(): antlr.TerminalNode[];
    public Identifier(i: number): antlr.TerminalNode | null;
    public Identifier(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.Identifier);
    	} else {
    		return this.getToken(LPCParser.Identifier, i);
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
export class RangeExpressionContext extends ConditionalExpressionBaseContext {
    public constructor(ctx: ConditionalExpressionBaseContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public DOUBLEDOT(): antlr.TerminalNode {
        return this.getToken(LPCParser.DOUBLEDOT, 0)!;
    }
    public unaryExpression(): UnaryExpressionContext[];
    public unaryExpression(i: number): UnaryExpressionContext | null;
    public unaryExpression(i?: number): UnaryExpressionContext[] | UnaryExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(UnaryExpressionContext);
        }

        return this.getRuleContext(i, UnaryExpressionContext);
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterRangeExpression) {
             listener.enterRangeExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitRangeExpression) {
             listener.exitRangeExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitRangeExpression) {
            return visitor.visitRangeExpression(this);
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
    public PLUS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.PLUS, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
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
    public callOtherExpression(): CallOtherExpressionContext[];
    public callOtherExpression(i: number): CallOtherExpressionContext | null;
    public callOtherExpression(i?: number): CallOtherExpressionContext[] | CallOtherExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(CallOtherExpressionContext);
        }

        return this.getRuleContext(i, CallOtherExpressionContext);
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


export class CallOtherExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ARROW(): antlr.TerminalNode {
        return this.getToken(LPCParser.ARROW, 0)!;
    }
    public callOtherTarget(): CallOtherTargetContext | null {
        return this.getRuleContext(0, CallOtherTargetContext);
    }
    public methodInvocation(): MethodInvocationContext | null {
        return this.getRuleContext(0, MethodInvocationContext);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_callOtherExpression;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterCallOtherExpression) {
             listener.enterCallOtherExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitCallOtherExpression) {
             listener.exitCallOtherExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitCallOtherExpression) {
            return visitor.visitCallOtherExpression(this);
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
    public SEMI(): antlr.TerminalNode {
        return this.getToken(LPCParser.SEMI, 0)!;
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
    public inlineClosureExpression(): InlineClosureExpressionContext | null {
        return this.getRuleContext(0, InlineClosureExpressionContext);
    }
    public lambdaExpression(): LambdaExpressionContext | null {
        return this.getRuleContext(0, LambdaExpressionContext);
    }
    public inheritSuperExpression(): InheritSuperExpressionContext | null {
        return this.getRuleContext(0, InheritSuperExpressionContext);
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

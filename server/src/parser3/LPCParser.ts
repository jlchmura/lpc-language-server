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
    public static readonly NOSAVE = 52;
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
    public static readonly BNOT = 74;
    public static readonly AND_AND = 75;
    public static readonly OR_OR = 76;
    public static readonly QUESTION = 77;
    public static readonly COLON = 78;
    public static readonly SEMI = 79;
    public static readonly COMMA = 80;
    public static readonly DOUBLEDOT = 81;
    public static readonly DOT = 82;
    public static readonly SINGLEQUOT = 83;
    public static readonly SUPER_ACCESSOR = 84;
    public static readonly ASSIGN = 85;
    public static readonly ADD_ASSIGN = 86;
    public static readonly SUB_ASSIGN = 87;
    public static readonly MUL_ASSIGN = 88;
    public static readonly DIV_ASSIGN = 89;
    public static readonly MOD_ASSIGN = 90;
    public static readonly OR_ASSIGN = 91;
    public static readonly AND_ASSIGN = 92;
    public static readonly BITAND_ASSIGN = 93;
    public static readonly BITOR_ASSIGN = 94;
    public static readonly XOR_ASSIGN = 95;
    public static readonly SHL_ASSIGN = 96;
    public static readonly ARRAY_OPEN = 97;
    public static readonly ARRAY_CLOSE = 98;
    public static readonly MAPPING_OPEN = 99;
    public static readonly ARROW = 100;
    public static readonly PAREN_OPEN = 101;
    public static readonly PAREN_CLOSE = 102;
    public static readonly CURLY_OPEN = 103;
    public static readonly CURLY_CLOSE = 104;
    public static readonly SQUARE_OPEN = 105;
    public static readonly SQUARE_CLOSE = 106;
    public static readonly BACKSLASH = 107;
    public static readonly IntegerConstant = 108;
    public static readonly FloatingConstant = 109;
    public static readonly HexIntConstant = 110;
    public static readonly STRING_START = 111;
    public static readonly StringLiteral = 112;
    public static readonly CharacterConstant = 113;
    public static readonly CloneObject = 114;
    public static readonly LoadObject = 115;
    public static readonly COMMENT = 116;
    public static readonly LINE_COMMENT = 117;
    public static readonly DEFINE = 118;
    public static readonly WS = 119;
    public static readonly END_DEFINE = 120;
    public static readonly STRING_END = 121;
    public static readonly NEWLINE = 122;
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
    public static readonly RULE_methodInvocation = 36;
    public static readonly RULE_arrayTypeSpecifier = 37;
    public static readonly RULE_typeSpecifier = 38;
    public static readonly RULE_inlineClosureExpression = 39;
    public static readonly RULE_statement = 40;
    public static readonly RULE_expressionStatement = 41;
    public static readonly RULE_block = 42;
    public static readonly RULE_selectionStatement = 43;
    public static readonly RULE_elseIfExpression = 44;
    public static readonly RULE_elseExpression = 45;
    public static readonly RULE_ifExpression = 46;
    public static readonly RULE_ifStatement = 47;
    public static readonly RULE_switchStatement = 48;
    public static readonly RULE_caseExpression = 49;
    public static readonly RULE_caseStatement = 50;
    public static readonly RULE_defaultStatement = 51;
    public static readonly RULE_iterationStatement = 52;
    public static readonly RULE_forVariable = 53;
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
    public static readonly RULE_primaryExpressionStart = 65;
    public static readonly RULE_expression = 66;
    public static readonly RULE_catchExpr = 67;
    public static readonly RULE_bracketExpression = 68;
    public static readonly RULE_argument = 69;
    public static readonly RULE_argumentList = 70;
    public static readonly RULE_expressionList = 71;
    public static readonly RULE_assignmentExpression = 72;
    public static readonly RULE_nonAssignmentExpression = 73;

    public static readonly literalNames = [
        null, null, "'break'", "'case'", "'catch'", "'char'", "'closure'", 
        "'const'", "'continue'", "'default'", "'do'", "'echo'", "'else'", 
        "'elif'", "'endif'", "'enum'", "'extern'", "'float'", "'for'", "'foreach'", 
        "'goto'", "'#'", "'if'", "'ifdef'", "'ifndef'", "'in'", "'include'", 
        "'inherit'", "'int'", "'line'", "'mapping'", "'mixed'", "'object'", 
        "'pragma'", "'return'", "'status'", "'struct'", "'string'", "'symbol'", 
        "'switch'", "'typedef'", "'union'", "'unknown'", "'undef'", "'void'", 
        "'volatile'", "'while'", "'private'", "'protected'", "'public'", 
        "'static'", "'noshadow'", "'nosave'", "'nomask'", "'varargs'", "'+'", 
        "'-'", "'*'", "'/'", "'%'", "'++'", "'--'", "'<<'", "'>>'", "'<'", 
        "'>'", "'<='", "'>='", "'=='", "'!='", "'&'", "'|'", "'^'", "'!'", 
        "'~'", "'&&'", "'||'", "'?'", "':'", "';'", "','", "'..'", "'.'", 
        "'''", "'::'", "'='", "'+='", "'-='", "'*='", "'/='", "'%='", "'||='", 
        "'&&='", "'&='", "'|='", "'^='", "'<<='", "'({'", "'})'", "'(['", 
        "'->'", "'('", "')'", "'{'", "'}'", "'['", "']'", "'\\'", null, 
        null, null, null, null, null, "'clone_object'", "'load_object'", 
        null, null, null, null, "'\\n'", null, "'\\\\n'"
    ];

    public static readonly symbolicNames = [
        null, "Identifier", "BREAK", "CASE", "CATCH", "CHAR", "CLOSURE", 
        "CONST", "CONTINUE", "DEFAULT", "DO", "ECHO", "ELSE", "ELIF", "ENDIF", 
        "ENUM", "EXTERN", "FLOAT", "FOR", "FOREACH", "GOTO", "HASH", "IF", 
        "IFDEF", "IFNDEF", "IN", "INCLUDE", "INHERIT", "INT", "LINE", "MAPPING", 
        "MIXED", "OBJECT", "PRAGMA", "RETURN", "STATUS", "STRUCT", "STRING", 
        "SYMBOL", "SWITCH", "TYPEDEF", "UNION", "UNKNOWN", "UNDEF", "VOID", 
        "VOLATILE", "WHILE", "PRIVATE", "PROTECTED", "PUBLIC", "STATIC", 
        "NOSHADOW", "NOSAVE", "NOMASK", "VARARGS", "PLUS", "MINUS", "STAR", 
        "DIV", "MOD", "INC", "DEC", "SHL", "SHR", "LT", "GT", "LE", "GE", 
        "EQ", "NE", "AND", "OR", "XOR", "NOT", "BNOT", "AND_AND", "OR_OR", 
        "QUESTION", "COLON", "SEMI", "COMMA", "DOUBLEDOT", "DOT", "SINGLEQUOT", 
        "SUPER_ACCESSOR", "ASSIGN", "ADD_ASSIGN", "SUB_ASSIGN", "MUL_ASSIGN", 
        "DIV_ASSIGN", "MOD_ASSIGN", "OR_ASSIGN", "AND_ASSIGN", "BITAND_ASSIGN", 
        "BITOR_ASSIGN", "XOR_ASSIGN", "SHL_ASSIGN", "ARRAY_OPEN", "ARRAY_CLOSE", 
        "MAPPING_OPEN", "ARROW", "PAREN_OPEN", "PAREN_CLOSE", "CURLY_OPEN", 
        "CURLY_CLOSE", "SQUARE_OPEN", "SQUARE_CLOSE", "BACKSLASH", "IntegerConstant", 
        "FloatingConstant", "HexIntConstant", "STRING_START", "StringLiteral", 
        "CharacterConstant", "CloneObject", "LoadObject", "COMMENT", "LINE_COMMENT", 
        "DEFINE", "WS", "END_DEFINE", "STRING_END", "NEWLINE"
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
        "methodInvocation", "arrayTypeSpecifier", "typeSpecifier", "inlineClosureExpression", 
        "statement", "expressionStatement", "block", "selectionStatement", 
        "elseIfExpression", "elseExpression", "ifExpression", "ifStatement", 
        "switchStatement", "caseExpression", "caseStatement", "defaultStatement", 
        "iterationStatement", "forVariable", "returnStatement", "jumpStatement", 
        "callOtherTarget", "lambdaExpression", "rightShiftAssignment", "literal", 
        "castExpression", "assignmentOperator", "conditionalExpressionBase", 
        "unaryExpression", "primaryExpression", "primaryExpressionStart", 
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
            this.state = 153;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3626106978) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 41915513) !== 0) || _la === 118) {
                {
                this.state = 151;
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
                case LPCParser.NOSAVE:
                case LPCParser.NOMASK:
                case LPCParser.VARARGS:
                case LPCParser.STAR:
                    {
                    this.state = 148;
                    this.declaration();
                    }
                    break;
                case LPCParser.HASH:
                case LPCParser.DEFINE:
                    {
                    this.state = 149;
                    this.preprocessorDirective();
                    }
                    break;
                case LPCParser.INHERIT:
                    {
                    this.state = 150;
                    this.inheritStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 155;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 156;
            this.match(LPCParser.EOF);
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
    public preprocessorDirective(): PreprocessorDirectiveContext {
        let localContext = new PreprocessorDirectiveContext(this.context, this.state);
        this.enterRule(localContext, 2, LPCParser.RULE_preprocessorDirective);
        let _la: number;
        try {
            this.state = 175;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 158;
                this.selectionDirective();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 159;
                this.match(LPCParser.HASH);
                this.state = 160;
                this.directiveTypeWithArguments();
                this.state = 161;
                this.directiveArgument();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 163;
                this.definePreprocessorDirective();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 164;
                this.includeDirective();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 165;
                this.match(LPCParser.HASH);
                this.state = 166;
                this.directiveTypePragma();
                this.state = 167;
                this.match(LPCParser.Identifier);
                this.state = 172;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 80) {
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
                }
                break;
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
    public includeDirective(): IncludeDirectiveContext {
        let localContext = new IncludeDirectiveContext(this.context, this.state);
        this.enterRule(localContext, 4, LPCParser.RULE_includeDirective);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 177;
            this.match(LPCParser.HASH);
            this.state = 178;
            this.directiveTypeInclude();
            this.state = 179;
            this.directiveIncludeFile();
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
    public definePreprocessorDirective(): DefinePreprocessorDirectiveContext {
        let localContext = new DefinePreprocessorDirectiveContext(this.context, this.state);
        this.enterRule(localContext, 6, LPCParser.RULE_definePreprocessorDirective);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 181;
            this.match(LPCParser.DEFINE);
            this.state = 182;
            this.match(LPCParser.END_DEFINE);
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
    public selectionDirective(): SelectionDirectiveContext {
        let localContext = new SelectionDirectiveContext(this.context, this.state);
        this.enterRule(localContext, 8, LPCParser.RULE_selectionDirective);
        let _la: number;
        try {
            this.state = 193;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 184;
                this.match(LPCParser.HASH);
                this.state = 185;
                this.selectionDirectiveTypeWithArg();
                this.state = 187;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 73) {
                    {
                    this.state = 186;
                    this.match(LPCParser.NOT);
                    }
                }

                this.state = 189;
                this.directiveArgument();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 191;
                this.match(LPCParser.HASH);
                this.state = 192;
                this.selectionDirectiveTypeSingle();
                }
                break;
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
    public selectionDirectiveTypeSingle(): SelectionDirectiveTypeSingleContext {
        let localContext = new SelectionDirectiveTypeSingleContext(this.context, this.state);
        this.enterRule(localContext, 10, LPCParser.RULE_selectionDirectiveTypeSingle);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 195;
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
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
            this.state = 197;
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
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
            this.state = 199;
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
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
            this.state = 201;
            _la = this.tokenStream.LA(1);
            if(!(_la === 1 || _la === 108 || _la === 112)) {
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
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
            this.state = 203;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 204;
            this.match(LPCParser.Identifier);
            this.state = 209;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 80) {
                {
                {
                this.state = 205;
                this.match(LPCParser.COMMA);
                this.state = 206;
                this.match(LPCParser.Identifier);
                }
                }
                this.state = 211;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 212;
            this.match(LPCParser.PAREN_CLOSE);
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
    public directiveDefineArgument(): DirectiveDefineArgumentContext {
        let localContext = new DirectiveDefineArgumentContext(this.context, this.state);
        this.enterRule(localContext, 20, LPCParser.RULE_directiveDefineArgument);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 214;
            this.expression();
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
    public directiveTypeInclude(): DirectiveTypeIncludeContext {
        let localContext = new DirectiveTypeIncludeContext(this.context, this.state);
        this.enterRule(localContext, 22, LPCParser.RULE_directiveTypeInclude);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 216;
            this.match(LPCParser.INCLUDE);
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
    public directiveIncludeFile(): DirectiveIncludeFileContext {
        let localContext = new DirectiveIncludeFileContext(this.context, this.state);
        this.enterRule(localContext, 24, LPCParser.RULE_directiveIncludeFile);
        try {
            this.state = 221;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.LT:
                localContext = new IncludeGlobalFileContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 218;
                this.directiveIncludeFileGlobal();
                }
                break;
            case LPCParser.StringLiteral:
                localContext = new IncludeLocalFileContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 219;
                this.directiveIncludeFileLocal();
                }
                break;
            case LPCParser.Identifier:
                localContext = new IncludeDefineContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 220;
                this.match(LPCParser.Identifier);
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
    public directiveIncludeFilename(): DirectiveIncludeFilenameContext {
        let localContext = new DirectiveIncludeFilenameContext(this.context, this.state);
        this.enterRule(localContext, 26, LPCParser.RULE_directiveIncludeFilename);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 223;
            this.match(LPCParser.Identifier);
            this.state = 226;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 82) {
                {
                this.state = 224;
                this.match(LPCParser.DOT);
                this.state = 225;
                this.match(LPCParser.Identifier);
                }
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
            this.state = 228;
            this.match(LPCParser.LT);
            this.state = 229;
            this.directiveIncludeFilename();
            this.state = 230;
            this.match(LPCParser.GT);
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
    public directiveIncludeFileLocal(): DirectiveIncludeFileLocalContext {
        let localContext = new DirectiveIncludeFileLocalContext(this.context, this.state);
        this.enterRule(localContext, 30, LPCParser.RULE_directiveIncludeFileLocal);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 232;
            this.match(LPCParser.StringLiteral);
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
    public directiveTypePragma(): DirectiveTypePragmaContext {
        let localContext = new DirectiveTypePragmaContext(this.context, this.state);
        this.enterRule(localContext, 32, LPCParser.RULE_directiveTypePragma);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 234;
            this.match(LPCParser.PRAGMA);
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
    public inheritStatement(): InheritStatementContext {
        let localContext = new InheritStatementContext(this.context, this.state);
        this.enterRule(localContext, 34, LPCParser.RULE_inheritStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 236;
            this.match(LPCParser.INHERIT);
            this.state = 237;
            localContext._inheritTarget = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 1 || _la === 112)) {
                localContext._inheritTarget = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 238;
            this.match(LPCParser.SEMI);
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
    public inheritSuperExpression(): InheritSuperExpressionContext {
        let localContext = new InheritSuperExpressionContext(this.context, this.state);
        this.enterRule(localContext, 36, LPCParser.RULE_inheritSuperExpression);
        try {
            this.state = 248;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.SUPER_ACCESSOR:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 240;
                this.match(LPCParser.SUPER_ACCESSOR);
                this.state = 241;
                this.expression();
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 242;
                this.match(LPCParser.StringLiteral);
                this.state = 243;
                this.match(LPCParser.SUPER_ACCESSOR);
                this.state = 244;
                this.expression();
                }
                break;
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 245;
                this.match(LPCParser.Identifier);
                this.state = 246;
                this.match(LPCParser.SUPER_ACCESSOR);
                this.state = 247;
                this.expression();
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
    public declaration(): DeclarationContext {
        let localContext = new DeclarationContext(this.context, this.state);
        this.enterRule(localContext, 38, LPCParser.RULE_declaration);
        try {
            this.state = 254;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 250;
                this.functionHeaderDeclaration();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 251;
                this.functionDeclaration();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 252;
                this.structDeclaration();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 253;
                this.variableDeclaration();
                }
                break;
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
    public functionModifier(): FunctionModifierContext {
        let localContext = new FunctionModifierContext(this.context, this.state);
        this.enterRule(localContext, 40, LPCParser.RULE_functionModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 256;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 223) !== 0))) {
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
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
            this.state = 261;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 223) !== 0)) {
                {
                {
                this.state = 258;
                this.functionModifier();
                }
                }
                this.state = 263;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 265;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33559657) !== 0)) {
                {
                this.state = 264;
                this.typeSpecifier();
                }
            }

            this.state = 267;
            localContext._functionName = this.match(LPCParser.Identifier);
            this.state = 268;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 270;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792098) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 37753977) !== 0)) {
                {
                this.state = 269;
                localContext._functionArgs = this.parameterList();
                }
            }

            this.state = 272;
            this.match(LPCParser.PAREN_CLOSE);
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
    public functionHeaderDeclaration(): FunctionHeaderDeclarationContext {
        let localContext = new FunctionHeaderDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 44, LPCParser.RULE_functionHeaderDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 274;
            this.functionHeader();
            this.state = 275;
            this.match(LPCParser.SEMI);
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
    public functionDeclaration(): FunctionDeclarationContext {
        let localContext = new FunctionDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 46, LPCParser.RULE_functionDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 277;
            this.functionHeader();
            this.state = 278;
            this.block();
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
    public parameterList(): ParameterListContext {
        let localContext = new ParameterListContext(this.context, this.state);
        this.enterRule(localContext, 48, LPCParser.RULE_parameterList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 280;
            this.parameter();
            this.state = 285;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 80) {
                {
                {
                this.state = 281;
                this.match(LPCParser.COMMA);
                this.state = 282;
                this.parameter();
                }
                }
                this.state = 287;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
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
            this.exitRule();
        }
        return localContext;
    }
    public parameter(): ParameterContext {
        let localContext = new ParameterContext(this.context, this.state);
        this.enterRule(localContext, 50, LPCParser.RULE_parameter);
        let _la: number;
        try {
            this.state = 298;
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
            case LPCParser.VARARGS:
            case LPCParser.STAR:
                localContext = new PrimitiveTypeParameterExpressionContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 289;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 54) {
                    {
                    this.state = 288;
                    this.match(LPCParser.VARARGS);
                    }
                }

                this.state = 292;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33559657) !== 0)) {
                    {
                    this.state = 291;
                    (localContext as PrimitiveTypeParameterExpressionContext)._paramType = this.typeSpecifier();
                    }
                }

                this.state = 294;
                (localContext as PrimitiveTypeParameterExpressionContext)._paramName = this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.STRUCT:
                localContext = new StructParameterExpressionContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 295;
                (localContext as StructParameterExpressionContext)._paramType = this.match(LPCParser.STRUCT);
                this.state = 296;
                (localContext as StructParameterExpressionContext)._structName = this.match(LPCParser.Identifier);
                this.state = 297;
                (localContext as StructParameterExpressionContext)._paramName = this.match(LPCParser.Identifier);
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
    public structDeclaration(): StructDeclarationContext {
        let localContext = new StructDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 52, LPCParser.RULE_structDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 300;
            this.match(LPCParser.STRUCT);
            this.state = 301;
            localContext._structName = this.match(LPCParser.Identifier);
            this.state = 302;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 306;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33559657) !== 0)) {
                {
                {
                this.state = 303;
                localContext._structMembers = this.structMemberDeclaration();
                }
                }
                this.state = 308;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 309;
            this.match(LPCParser.CURLY_CLOSE);
            this.state = 310;
            this.match(LPCParser.SEMI);
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
    public structMemberDeclaration(): StructMemberDeclarationContext {
        let localContext = new StructMemberDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 54, LPCParser.RULE_structMemberDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 312;
            this.typeSpecifier();
            this.state = 313;
            this.match(LPCParser.Identifier);
            this.state = 314;
            this.match(LPCParser.SEMI);
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
    public arrayExpression(): ArrayExpressionContext {
        let localContext = new ArrayExpressionContext(this.context, this.state);
        this.enterRule(localContext, 56, LPCParser.RULE_arrayExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 316;
            this.match(LPCParser.ARRAY_OPEN);
            this.state = 325;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 806125671) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 505877) !== 0)) {
                {
                this.state = 317;
                this.expression();
                this.state = 322;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 19, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 318;
                        this.match(LPCParser.COMMA);
                        this.state = 319;
                        this.expression();
                        }
                        }
                    }
                    this.state = 324;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 19, this.context);
                }
                }
            }

            this.state = 328;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 80) {
                {
                this.state = 327;
                this.match(LPCParser.COMMA);
                }
            }

            this.state = 330;
            this.match(LPCParser.ARRAY_CLOSE);
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
    public mappingContent(): MappingContentContext {
        let localContext = new MappingContentContext(this.context, this.state);
        this.enterRule(localContext, 58, LPCParser.RULE_mappingContent);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 332;
            localContext._mappingKey = this.expression();
            this.state = 342;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 78) {
                {
                this.state = 333;
                this.match(LPCParser.COLON);
                this.state = 334;
                this.expression();
                this.state = 339;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 79) {
                    {
                    {
                    this.state = 335;
                    this.match(LPCParser.SEMI);
                    this.state = 336;
                    this.expression();
                    }
                    }
                    this.state = 341;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
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
            this.state = 366;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 27, this.context) ) {
            case 1:
                localContext = new MappingValueInitializerContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 344;
                this.match(LPCParser.MAPPING_OPEN);
                this.state = 353;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 806125671) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 505877) !== 0)) {
                    {
                    this.state = 345;
                    this.mappingContent();
                    this.state = 350;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 24, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 346;
                            this.match(LPCParser.COMMA);
                            this.state = 347;
                            this.mappingContent();
                            }
                            }
                        }
                        this.state = 352;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 24, this.context);
                    }
                    }
                }

                this.state = 356;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 80) {
                    {
                    this.state = 355;
                    this.match(LPCParser.COMMA);
                    }
                }

                this.state = 358;
                this.match(LPCParser.SQUARE_CLOSE);
                this.state = 359;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 2:
                localContext = new MappingEmptyInitializerContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 360;
                this.match(LPCParser.MAPPING_OPEN);
                this.state = 361;
                this.match(LPCParser.COLON);
                this.state = 362;
                this.expression();
                this.state = 363;
                this.match(LPCParser.SQUARE_CLOSE);
                this.state = 364;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
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
    public variableModifier(): VariableModifierContext {
        let localContext = new VariableModifierContext(this.context, this.state);
        this.enterRule(localContext, 62, LPCParser.RULE_variableModifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 368;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 63) !== 0))) {
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
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
            this.state = 408;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 33, this.context) ) {
            case 1:
                localContext = new PrimitiveTypeVariableDeclarationContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 373;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 63) !== 0)) {
                    {
                    {
                    this.state = 370;
                    this.variableModifier();
                    }
                    }
                    this.state = 375;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 377;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 5225) !== 0)) {
                    {
                    this.state = 376;
                    this.primitiveTypeSpecifier();
                    }
                }

                this.state = 379;
                this.variableDeclarator();
                this.state = 384;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 80) {
                    {
                    {
                    this.state = 380;
                    this.match(LPCParser.COMMA);
                    this.state = 381;
                    this.variableDeclarator();
                    }
                    }
                    this.state = 386;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 387;
                this.match(LPCParser.SEMI);
                }
                break;
            case 2:
                localContext = new StructVariableDeclarationContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 392;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 63) !== 0)) {
                    {
                    {
                    this.state = 389;
                    this.variableModifier();
                    }
                    }
                    this.state = 394;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 395;
                this.match(LPCParser.STRUCT);
                this.state = 396;
                (localContext as StructVariableDeclarationContext)._structName = this.match(LPCParser.Identifier);
                this.state = 397;
                this.variableDeclarator();
                this.state = 403;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 80) {
                    {
                    {
                    this.state = 398;
                    this.match(LPCParser.COMMA);
                    this.state = 399;
                    (localContext as StructVariableDeclarationContext)._structName = this.match(LPCParser.Identifier);
                    this.state = 400;
                    this.variableDeclarator();
                    }
                    }
                    this.state = 405;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 406;
                this.match(LPCParser.SEMI);
                }
                break;
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
    public variableDeclarator(): VariableDeclaratorContext {
        let localContext = new VariableDeclaratorContext(this.context, this.state);
        this.enterRule(localContext, 66, LPCParser.RULE_variableDeclarator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 411;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 57) {
                {
                this.state = 410;
                localContext._arraySpecifier = this.match(LPCParser.STAR);
                }
            }

            this.state = 413;
            localContext._variableName = this.match(LPCParser.Identifier);
            this.state = 416;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 85) {
                {
                this.state = 414;
                this.match(LPCParser.ASSIGN);
                this.state = 415;
                this.variableInitializer();
                }
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
            this.exitRule();
        }
        return localContext;
    }
    public variableInitializer(): VariableInitializerContext {
        let localContext = new VariableInitializerContext(this.context, this.state);
        this.enterRule(localContext, 68, LPCParser.RULE_variableInitializer);
        try {
            this.state = 421;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 36, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 418;
                this.expression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 419;
                this.arrayExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 420;
                this.mappingExpression();
                }
                break;
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
    public primitiveTypeSpecifier(): PrimitiveTypeSpecifierContext {
        let localContext = new PrimitiveTypeSpecifierContext(this.context, this.state);
        this.enterRule(localContext, 70, LPCParser.RULE_primitiveTypeSpecifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 423;
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
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 72, LPCParser.RULE_methodInvocation);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 425;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 427;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 806125671) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 505877) !== 0)) {
                {
                this.state = 426;
                this.argumentList();
                }
            }

            this.state = 429;
            this.match(LPCParser.PAREN_CLOSE);
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
    public arrayTypeSpecifier(): ArrayTypeSpecifierContext {
        let localContext = new ArrayTypeSpecifierContext(this.context, this.state);
        this.enterRule(localContext, 74, LPCParser.RULE_arrayTypeSpecifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 432;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 5225) !== 0)) {
                {
                this.state = 431;
                this.primitiveTypeSpecifier();
                }
            }

            this.state = 434;
            this.match(LPCParser.STAR);
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
    public typeSpecifier(): TypeSpecifierContext {
        let localContext = new TypeSpecifierContext(this.context, this.state);
        this.enterRule(localContext, 76, LPCParser.RULE_typeSpecifier);
        try {
            this.state = 438;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 39, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 436;
                this.primitiveTypeSpecifier();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 437;
                this.arrayTypeSpecifier();
                }
                break;
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
    public inlineClosureExpression(): InlineClosureExpressionContext {
        let localContext = new InlineClosureExpressionContext(this.context, this.state);
        this.enterRule(localContext, 78, LPCParser.RULE_inlineClosureExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 440;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 441;
            this.match(LPCParser.COLON);
            this.state = 449;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 41, this.context) ) {
            case 1:
                {
                this.state = 442;
                this.expression();
                }
                break;
            case 2:
                {
                this.state = 446;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871286) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 866112765) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 2818596889) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 7905) !== 0)) {
                    {
                    {
                    this.state = 443;
                    this.statement();
                    }
                    }
                    this.state = 448;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            }
            this.state = 451;
            this.match(LPCParser.COLON);
            this.state = 452;
            this.match(LPCParser.PAREN_CLOSE);
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
    public statement(): StatementContext {
        let localContext = new StatementContext(this.context, this.state);
        this.enterRule(localContext, 80, LPCParser.RULE_statement);
        try {
            this.state = 462;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 42, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 454;
                this.expressionStatement();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 455;
                this.block();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 456;
                this.selectionStatement();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 457;
                this.iterationStatement();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 458;
                this.jumpStatement();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 459;
                this.variableDeclaration();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 460;
                this.selectionDirective();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 461;
                this.returnStatement();
                }
                break;
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
    public expressionStatement(): ExpressionStatementContext {
        let localContext = new ExpressionStatementContext(this.context, this.state);
        this.enterRule(localContext, 82, LPCParser.RULE_expressionStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 464;
            this.expression();
            this.state = 465;
            this.match(LPCParser.SEMI);
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
    public block(): BlockContext {
        let localContext = new BlockContext(this.context, this.state);
        this.enterRule(localContext, 84, LPCParser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 467;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 471;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871286) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 866112765) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 2818596889) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 7905) !== 0)) {
                {
                {
                this.state = 468;
                this.statement();
                }
                }
                this.state = 473;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 474;
            this.match(LPCParser.CURLY_CLOSE);
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
    public selectionStatement(): SelectionStatementContext {
        let localContext = new SelectionStatementContext(this.context, this.state);
        this.enterRule(localContext, 86, LPCParser.RULE_selectionStatement);
        try {
            this.state = 478;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.IF:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 476;
                this.ifStatement();
                }
                break;
            case LPCParser.SWITCH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 477;
                this.switchStatement();
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
    public elseIfExpression(): ElseIfExpressionContext {
        let localContext = new ElseIfExpressionContext(this.context, this.state);
        this.enterRule(localContext, 88, LPCParser.RULE_elseIfExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 480;
            this.match(LPCParser.ELSE);
            this.state = 481;
            this.match(LPCParser.IF);
            this.state = 482;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 483;
            this.expression();
            this.state = 484;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 485;
            this.statement();
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
    public elseExpression(): ElseExpressionContext {
        let localContext = new ElseExpressionContext(this.context, this.state);
        this.enterRule(localContext, 90, LPCParser.RULE_elseExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 487;
            this.match(LPCParser.ELSE);
            this.state = 488;
            this.statement();
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
    public ifExpression(): IfExpressionContext {
        let localContext = new IfExpressionContext(this.context, this.state);
        this.enterRule(localContext, 92, LPCParser.RULE_ifExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 490;
            this.match(LPCParser.IF);
            this.state = 491;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 492;
            this.expression();
            this.state = 493;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 494;
            this.statement();
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
    public ifStatement(): IfStatementContext {
        let localContext = new IfStatementContext(this.context, this.state);
        this.enterRule(localContext, 94, LPCParser.RULE_ifStatement);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 496;
            this.ifExpression();
            this.state = 500;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 45, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 497;
                    this.elseIfExpression();
                    }
                    }
                }
                this.state = 502;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 45, this.context);
            }
            this.state = 504;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 46, this.context) ) {
            case 1:
                {
                this.state = 503;
                this.elseExpression();
                }
                break;
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
            this.exitRule();
        }
        return localContext;
    }
    public switchStatement(): SwitchStatementContext {
        let localContext = new SwitchStatementContext(this.context, this.state);
        this.enterRule(localContext, 96, LPCParser.RULE_switchStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 506;
            this.match(LPCParser.SWITCH);
            this.state = 507;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 508;
            this.expression();
            this.state = 509;
            this.match(LPCParser.PAREN_CLOSE);
            this.state = 510;
            this.match(LPCParser.CURLY_OPEN);
            this.state = 515;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 3 || _la === 9) {
                {
                this.state = 513;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.CASE:
                    {
                    this.state = 511;
                    this.caseStatement();
                    }
                    break;
                case LPCParser.DEFAULT:
                    {
                    this.state = 512;
                    this.defaultStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 517;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 518;
            this.match(LPCParser.CURLY_CLOSE);
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
    public caseExpression(): CaseExpressionContext {
        let localContext = new CaseExpressionContext(this.context, this.state);
        this.enterRule(localContext, 98, LPCParser.RULE_caseExpression);
        let _la: number;
        try {
            this.state = 545;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 55, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 526;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.StringLiteral:
                    {
                    this.state = 520;
                    this.match(LPCParser.StringLiteral);
                    }
                    break;
                case LPCParser.MINUS:
                case LPCParser.IntegerConstant:
                    {
                    this.state = 522;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 56) {
                        {
                        this.state = 521;
                        this.match(LPCParser.MINUS);
                        }
                    }

                    this.state = 524;
                    this.match(LPCParser.IntegerConstant);
                    }
                    break;
                case LPCParser.Identifier:
                    {
                    this.state = 525;
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
                this.state = 534;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.StringLiteral:
                    {
                    this.state = 528;
                    this.match(LPCParser.StringLiteral);
                    }
                    break;
                case LPCParser.MINUS:
                case LPCParser.IntegerConstant:
                    {
                    this.state = 530;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 56) {
                        {
                        this.state = 529;
                        this.match(LPCParser.MINUS);
                        }
                    }

                    this.state = 532;
                    this.match(LPCParser.IntegerConstant);
                    }
                    break;
                case LPCParser.Identifier:
                    {
                    this.state = 533;
                    this.match(LPCParser.Identifier);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 536;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 543;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case LPCParser.StringLiteral:
                    {
                    this.state = 537;
                    this.match(LPCParser.StringLiteral);
                    }
                    break;
                case LPCParser.MINUS:
                case LPCParser.IntegerConstant:
                    {
                    this.state = 539;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 56) {
                        {
                        this.state = 538;
                        this.match(LPCParser.MINUS);
                        }
                    }

                    this.state = 541;
                    this.match(LPCParser.IntegerConstant);
                    }
                    break;
                case LPCParser.Identifier:
                    {
                    this.state = 542;
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
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 100, LPCParser.RULE_caseStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 547;
            this.match(LPCParser.CASE);
            this.state = 548;
            this.caseExpression();
            this.state = 549;
            this.match(LPCParser.COLON);
            this.state = 553;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871286) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 866112765) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 2818596889) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 7905) !== 0)) {
                {
                {
                this.state = 550;
                this.statement();
                }
                }
                this.state = 555;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
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
            this.exitRule();
        }
        return localContext;
    }
    public defaultStatement(): DefaultStatementContext {
        let localContext = new DefaultStatementContext(this.context, this.state);
        this.enterRule(localContext, 102, LPCParser.RULE_defaultStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 556;
            this.match(LPCParser.DEFAULT);
            this.state = 557;
            this.match(LPCParser.COLON);
            this.state = 561;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3496871286) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 866112765) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 2818596889) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & 7905) !== 0)) {
                {
                {
                this.state = 558;
                this.statement();
                }
                }
                this.state = 563;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
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
            this.exitRule();
        }
        return localContext;
    }
    public iterationStatement(): IterationStatementContext {
        let localContext = new IterationStatementContext(this.context, this.state);
        this.enterRule(localContext, 104, LPCParser.RULE_iterationStatement);
        let _la: number;
        try {
            this.state = 623;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.WHILE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 564;
                this.match(LPCParser.WHILE);
                this.state = 565;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 566;
                this.expression();
                this.state = 567;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 570;
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
                case LPCParser.NOSAVE:
                case LPCParser.PLUS:
                case LPCParser.MINUS:
                case LPCParser.STAR:
                case LPCParser.INC:
                case LPCParser.DEC:
                case LPCParser.AND:
                case LPCParser.NOT:
                case LPCParser.BNOT:
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
                    this.state = 568;
                    this.statement();
                    }
                    break;
                case LPCParser.SEMI:
                    {
                    this.state = 569;
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
                this.state = 572;
                this.match(LPCParser.DO);
                this.state = 573;
                this.statement();
                this.state = 574;
                this.match(LPCParser.WHILE);
                this.state = 575;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 576;
                this.expression();
                this.state = 577;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 578;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.FOR:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 580;
                this.match(LPCParser.FOR);
                this.state = 581;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 582;
                this.forVariable();
                this.state = 587;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 80) {
                    {
                    {
                    this.state = 583;
                    this.match(LPCParser.COMMA);
                    this.state = 584;
                    this.forVariable();
                    }
                    }
                    this.state = 589;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 590;
                this.match(LPCParser.SEMI);
                this.state = 592;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 806125671) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 505877) !== 0)) {
                    {
                    this.state = 591;
                    this.expression();
                    }
                }

                this.state = 594;
                this.match(LPCParser.SEMI);
                this.state = 596;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 806125671) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 505877) !== 0)) {
                    {
                    this.state = 595;
                    this.expression();
                    }
                }

                this.state = 602;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 80) {
                    {
                    {
                    this.state = 598;
                    this.match(LPCParser.COMMA);
                    this.state = 599;
                    this.expression();
                    }
                    }
                    this.state = 604;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 605;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 608;
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
                case LPCParser.NOSAVE:
                case LPCParser.PLUS:
                case LPCParser.MINUS:
                case LPCParser.STAR:
                case LPCParser.INC:
                case LPCParser.DEC:
                case LPCParser.AND:
                case LPCParser.NOT:
                case LPCParser.BNOT:
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
                    this.state = 606;
                    this.statement();
                    }
                    break;
                case LPCParser.SEMI:
                    {
                    this.state = 607;
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
                this.state = 610;
                this.match(LPCParser.FOREACH);
                this.state = 611;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 613;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33559657) !== 0)) {
                    {
                    this.state = 612;
                    this.typeSpecifier();
                    }
                }

                this.state = 615;
                this.match(LPCParser.Identifier);
                this.state = 616;
                _la = this.tokenStream.LA(1);
                if(!(_la === 25 || _la === 78)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 617;
                this.expression();
                this.state = 618;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 621;
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
                case LPCParser.NOSAVE:
                case LPCParser.PLUS:
                case LPCParser.MINUS:
                case LPCParser.STAR:
                case LPCParser.INC:
                case LPCParser.DEC:
                case LPCParser.AND:
                case LPCParser.NOT:
                case LPCParser.BNOT:
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
                    this.state = 619;
                    this.statement();
                    }
                    break;
                case LPCParser.SEMI:
                    {
                    this.state = 620;
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
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public forVariable(): ForVariableContext {
        let localContext = new ForVariableContext(this.context, this.state);
        this.enterRule(localContext, 106, LPCParser.RULE_forVariable);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 626;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3489792096) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 5225) !== 0)) {
                {
                this.state = 625;
                this.primitiveTypeSpecifier();
                }
            }

            this.state = 629;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 57) {
                {
                this.state = 628;
                localContext._arraySpecifier = this.match(LPCParser.STAR);
                }
            }

            this.state = 631;
            localContext._variableName = this.match(LPCParser.Identifier);
            this.state = 632;
            this.match(LPCParser.ASSIGN);
            this.state = 633;
            this.variableInitializer();
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
    public returnStatement(): ReturnStatementContext {
        let localContext = new ReturnStatementContext(this.context, this.state);
        this.enterRule(localContext, 108, LPCParser.RULE_returnStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 635;
            this.match(LPCParser.RETURN);
            this.state = 637;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 806125671) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 505877) !== 0)) {
                {
                this.state = 636;
                this.expression();
                }
            }

            this.state = 639;
            this.match(LPCParser.SEMI);
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
    public jumpStatement(): JumpStatementContext {
        let localContext = new JumpStatementContext(this.context, this.state);
        this.enterRule(localContext, 110, LPCParser.RULE_jumpStatement);
        try {
            this.state = 646;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.BREAK:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 641;
                this.match(LPCParser.BREAK);
                this.state = 642;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.CONTINUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 643;
                this.match(LPCParser.CONTINUE);
                this.state = 644;
                this.match(LPCParser.SEMI);
                }
                break;
            case LPCParser.RETURN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 645;
                this.returnStatement();
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
    public callOtherTarget(): CallOtherTargetContext {
        let localContext = new CallOtherTargetContext(this.context, this.state);
        this.enterRule(localContext, 112, LPCParser.RULE_callOtherTarget);
        try {
            this.state = 654;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case LPCParser.Identifier:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 648;
                this.match(LPCParser.Identifier);
                }
                break;
            case LPCParser.PAREN_OPEN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 649;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 650;
                this.expression();
                this.state = 651;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case LPCParser.StringLiteral:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 653;
                this.match(LPCParser.StringLiteral);
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
    public lambdaExpression(): LambdaExpressionContext {
        let localContext = new LambdaExpressionContext(this.context, this.state);
        this.enterRule(localContext, 114, LPCParser.RULE_lambdaExpression);
        try {
            this.state = 748;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 72, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 656;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 657;
                this.match(LPCParser.Identifier);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 658;
                this.match(LPCParser.HASH);
                this.state = 659;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 660;
                this.expression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 661;
                this.match(LPCParser.HASH);
                this.state = 662;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 663;
                this.match(LPCParser.PLUS);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 664;
                this.match(LPCParser.HASH);
                this.state = 665;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 666;
                this.match(LPCParser.MINUS);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 667;
                this.match(LPCParser.HASH);
                this.state = 668;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 669;
                this.match(LPCParser.STAR);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 670;
                this.match(LPCParser.HASH);
                this.state = 671;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 672;
                this.match(LPCParser.DIV);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 673;
                this.match(LPCParser.HASH);
                this.state = 674;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 675;
                this.match(LPCParser.MOD);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 676;
                this.match(LPCParser.HASH);
                this.state = 677;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 678;
                this.match(LPCParser.LT);
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 679;
                this.match(LPCParser.HASH);
                this.state = 680;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 681;
                this.match(LPCParser.GT);
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 682;
                this.match(LPCParser.HASH);
                this.state = 683;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 684;
                this.match(LPCParser.LE);
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 685;
                this.match(LPCParser.HASH);
                this.state = 686;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 687;
                this.match(LPCParser.GE);
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 688;
                this.match(LPCParser.HASH);
                this.state = 689;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 690;
                this.match(LPCParser.EQ);
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 691;
                this.match(LPCParser.HASH);
                this.state = 692;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 693;
                this.match(LPCParser.NE);
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 694;
                this.match(LPCParser.HASH);
                this.state = 695;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 696;
                this.match(LPCParser.AND);
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 697;
                this.match(LPCParser.HASH);
                this.state = 698;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 699;
                this.match(LPCParser.OR);
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 700;
                this.match(LPCParser.HASH);
                this.state = 701;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 702;
                this.match(LPCParser.XOR);
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 703;
                this.match(LPCParser.HASH);
                this.state = 704;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 705;
                this.match(LPCParser.AND_AND);
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 706;
                this.match(LPCParser.HASH);
                this.state = 707;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 708;
                this.match(LPCParser.OR_OR);
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 709;
                this.match(LPCParser.HASH);
                this.state = 710;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 711;
                this.match(LPCParser.ADD_ASSIGN);
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 712;
                this.match(LPCParser.HASH);
                this.state = 713;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 714;
                this.match(LPCParser.SUB_ASSIGN);
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 715;
                this.match(LPCParser.HASH);
                this.state = 716;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 717;
                this.match(LPCParser.MUL_ASSIGN);
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 718;
                this.match(LPCParser.HASH);
                this.state = 719;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 720;
                this.match(LPCParser.DIV_ASSIGN);
                }
                break;
            case 23:
                this.enterOuterAlt(localContext, 23);
                {
                this.state = 721;
                this.match(LPCParser.HASH);
                this.state = 722;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 723;
                this.match(LPCParser.MOD_ASSIGN);
                }
                break;
            case 24:
                this.enterOuterAlt(localContext, 24);
                {
                this.state = 724;
                this.match(LPCParser.HASH);
                this.state = 725;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 726;
                this.match(LPCParser.AND_ASSIGN);
                }
                break;
            case 25:
                this.enterOuterAlt(localContext, 25);
                {
                this.state = 727;
                this.match(LPCParser.HASH);
                this.state = 728;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 729;
                this.match(LPCParser.OR_ASSIGN);
                }
                break;
            case 26:
                this.enterOuterAlt(localContext, 26);
                {
                this.state = 730;
                this.match(LPCParser.HASH);
                this.state = 731;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 732;
                this.match(LPCParser.BITAND_ASSIGN);
                }
                break;
            case 27:
                this.enterOuterAlt(localContext, 27);
                {
                this.state = 733;
                this.match(LPCParser.HASH);
                this.state = 734;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 735;
                this.match(LPCParser.BITOR_ASSIGN);
                }
                break;
            case 28:
                this.enterOuterAlt(localContext, 28);
                {
                this.state = 736;
                this.match(LPCParser.HASH);
                this.state = 737;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 738;
                this.match(LPCParser.XOR_ASSIGN);
                }
                break;
            case 29:
                this.enterOuterAlt(localContext, 29);
                {
                this.state = 739;
                this.match(LPCParser.HASH);
                this.state = 740;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 741;
                this.match(LPCParser.QUESTION);
                }
                break;
            case 30:
                this.enterOuterAlt(localContext, 30);
                {
                this.state = 742;
                this.match(LPCParser.HASH);
                this.state = 743;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 744;
                this.match(LPCParser.SHL);
                }
                break;
            case 31:
                this.enterOuterAlt(localContext, 31);
                {
                this.state = 745;
                this.match(LPCParser.HASH);
                this.state = 746;
                this.match(LPCParser.SINGLEQUOT);
                this.state = 747;
                this.match(LPCParser.SHR);
                }
                break;
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
    public rightShiftAssignment(): RightShiftAssignmentContext {
        let localContext = new RightShiftAssignmentContext(this.context, this.state);
        this.enterRule(localContext, 116, LPCParser.RULE_rightShiftAssignment);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 750;
            localContext._first = this.match(LPCParser.GT);
            this.state = 751;
            localContext._second = this.match(LPCParser.GE);
            this.state = 752;
            if (!((localContext._first?.tokenIndex ?? 0) + 1 == (localContext._second?.tokenIndex ?? 0))) {
                throw this.createFailedPredicateException("$first.index + 1 == $second.index");
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
            this.state = 754;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 108)) & ~0x1F) === 0 && ((1 << (_la - 108)) & 55) !== 0))) {
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
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
            this.state = 775;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 74, this.context) ) {
            case 1:
                localContext = new PrimitiveTypeCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 756;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 757;
                this.typeSpecifier();
                this.state = 758;
                this.match(LPCParser.PAREN_CLOSE);
                this.state = 759;
                this.expression();
                }
                break;
            case 2:
                localContext = new StructCastExpressionContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 761;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 762;
                this.match(LPCParser.LT);
                this.state = 763;
                this.match(LPCParser.Identifier);
                this.state = 764;
                this.match(LPCParser.GT);
                this.state = 765;
                this.expression();
                this.state = 770;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 80) {
                    {
                    {
                    this.state = 766;
                    this.match(LPCParser.COMMA);
                    this.state = 767;
                    this.expression();
                    }
                    }
                    this.state = 772;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 773;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
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
    public assignmentOperator(): AssignmentOperatorContext {
        let localContext = new AssignmentOperatorContext(this.context, this.state);
        this.enterRule(localContext, 122, LPCParser.RULE_assignmentOperator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 777;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 85)) & ~0x1F) === 0 && ((1 << (_la - 85)) & 4095) !== 0))) {
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
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
            {
            localContext = new TempUnaryExpressionContext(localContext);
            this.context = localContext;
            previousContext = localContext;

            this.state = 780;
            this.unaryExpression();
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 860;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 86, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 858;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 85, this.context) ) {
                    case 1:
                        {
                        localContext = new ConditionalExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 782;
                        if (!(this.precpred(this.context, 11))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 11)");
                        }
                        {
                        this.state = 783;
                        this.match(LPCParser.QUESTION);
                        this.state = 784;
                        this.expression();
                        this.state = 785;
                        this.match(LPCParser.COLON);
                        this.state = 786;
                        this.expression();
                        }
                        }
                        break;
                    case 2:
                        {
                        localContext = new ConditionalOrExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 788;
                        if (!(this.precpred(this.context, 10))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 10)");
                        }
                        this.state = 791;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 789;
                                (localContext as ConditionalOrExpressionContext)._op = this.match(LPCParser.OR_OR);
                                this.state = 790;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 793;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 75, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 3:
                        {
                        localContext = new ConditionalAndExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 795;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 798;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 796;
                                (localContext as ConditionalAndExpressionContext)._op = this.match(LPCParser.AND_AND);
                                this.state = 797;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 800;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 76, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 4:
                        {
                        localContext = new InclusiveOrExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 802;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 805;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 803;
                                (localContext as InclusiveOrExpressionContext)._op = this.match(LPCParser.OR);
                                this.state = 804;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 807;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 77, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 5:
                        {
                        localContext = new ExclusiveOrExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 809;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 812;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 810;
                                (localContext as ExclusiveOrExpressionContext)._op = this.match(LPCParser.XOR);
                                this.state = 811;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 814;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 78, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 6:
                        {
                        localContext = new AndExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 816;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 819;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 817;
                                (localContext as AndExpressionContext)._op = this.match(LPCParser.AND);
                                this.state = 818;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 821;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 79, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 7:
                        {
                        localContext = new EqualityExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 823;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 826;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 824;
                                (localContext as EqualityExpressionContext)._op = this.tokenStream.LT(1);
                                _la = this.tokenStream.LA(1);
                                if(!(_la === 68 || _la === 69)) {
                                    (localContext as EqualityExpressionContext)._op = this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 825;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 828;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 80, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 8:
                        {
                        localContext = new RelationalExpresionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 830;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 833;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 831;
                                (localContext as RelationalExpresionContext)._op = this.tokenStream.LT(1);
                                _la = this.tokenStream.LA(1);
                                if(!(((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 15) !== 0))) {
                                    (localContext as RelationalExpresionContext)._op = this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 832;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 835;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 81, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 9:
                        {
                        localContext = new ShiftExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 837;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 840;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 838;
                                (localContext as ShiftExpressionContext)._op = this.tokenStream.LT(1);
                                _la = this.tokenStream.LA(1);
                                if(!(_la === 62 || _la === 63)) {
                                    (localContext as ShiftExpressionContext)._op = this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 839;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 842;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 82, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 10:
                        {
                        localContext = new AdditiveExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 844;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 847;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 845;
                                (localContext as AdditiveExpressionContext)._op = this.tokenStream.LT(1);
                                _la = this.tokenStream.LA(1);
                                if(!(_la === 55 || _la === 56)) {
                                    (localContext as AdditiveExpressionContext)._op = this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 846;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 849;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 83, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    case 11:
                        {
                        localContext = new MultiplicativeExpressionContext(new ConditionalExpressionBaseContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, LPCParser.RULE_conditionalExpressionBase);
                        this.state = 851;
                        if (!(this.precpred(this.context, 1))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                        }
                        this.state = 854;
                        this.errorHandler.sync(this);
                        alternative = 1;
                        do {
                            switch (alternative) {
                            case 1:
                                {
                                {
                                this.state = 852;
                                (localContext as MultiplicativeExpressionContext)._op = this.tokenStream.LT(1);
                                _la = this.tokenStream.LA(1);
                                if(!(((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 7) !== 0))) {
                                    (localContext as MultiplicativeExpressionContext)._op = this.errorHandler.recoverInline(this);
                                }
                                else {
                                    this.errorHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 853;
                                this.conditionalExpressionBase(0);
                                }
                                }
                                break;
                            default:
                                throw new antlr.NoViableAltException(this);
                            }
                            this.state = 856;
                            this.errorHandler.sync(this);
                            alternative = this.interpreter.adaptivePredict(this.tokenStream, 84, this.context);
                        } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                        }
                        break;
                    }
                    }
                }
                this.state = 862;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 86, this.context);
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
    public unaryExpression(): UnaryExpressionContext {
        let localContext = new UnaryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 126, LPCParser.RULE_unaryExpression);
        try {
            this.state = 881;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 87, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 863;
                this.castExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 864;
                this.primaryExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 865;
                this.match(LPCParser.PLUS);
                this.state = 866;
                this.expression();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 867;
                this.match(LPCParser.MINUS);
                this.state = 868;
                this.expression();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 869;
                this.match(LPCParser.NOT);
                this.state = 870;
                this.expression();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 871;
                this.match(LPCParser.BNOT);
                this.state = 872;
                this.expression();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 873;
                this.match(LPCParser.INC);
                this.state = 874;
                this.expression();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 875;
                this.match(LPCParser.DEC);
                this.state = 876;
                this.expression();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 877;
                this.match(LPCParser.AND);
                this.state = 878;
                this.expression();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 879;
                this.match(LPCParser.STAR);
                this.state = 880;
                this.expression();
                }
                break;
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
    public primaryExpression(): PrimaryExpressionContext {
        let localContext = new PrimaryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 128, LPCParser.RULE_primaryExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 883;
            localContext._pe = this.primaryExpressionStart();
            this.state = 887;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 88, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 884;
                    this.bracketExpression();
                    }
                    }
                }
                this.state = 889;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 88, this.context);
            }
            this.state = 911;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 93, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 901;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case LPCParser.PAREN_OPEN:
                        {
                        this.state = 890;
                        this.methodInvocation();
                        }
                        break;
                    case LPCParser.INC:
                        {
                        this.state = 891;
                        this.match(LPCParser.INC);
                        }
                        break;
                    case LPCParser.DEC:
                        {
                        this.state = 892;
                        this.match(LPCParser.DEC);
                        }
                        break;
                    case LPCParser.ARROW:
                        {
                        {
                        this.state = 893;
                        this.match(LPCParser.ARROW);
                        this.state = 895;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 89, this.context) ) {
                        case 1:
                            {
                            this.state = 894;
                            localContext._target = this.callOtherTarget();
                            }
                            break;
                        }
                        this.state = 898;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 90, this.context) ) {
                        case 1:
                            {
                            this.state = 897;
                            localContext._invocation = this.methodInvocation();
                            }
                            break;
                        }
                        }
                        }
                        break;
                    case LPCParser.Identifier:
                        {
                        this.state = 900;
                        this.match(LPCParser.Identifier);
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    this.state = 906;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 92, this.context);
                    while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                        if (alternative === 1) {
                            {
                            {
                            this.state = 903;
                            this.bracketExpression();
                            }
                            }
                        }
                        this.state = 908;
                        this.errorHandler.sync(this);
                        alternative = this.interpreter.adaptivePredict(this.tokenStream, 92, this.context);
                    }
                    }
                    }
                }
                this.state = 913;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 93, this.context);
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
            this.exitRule();
        }
        return localContext;
    }
    public primaryExpressionStart(): PrimaryExpressionStartContext {
        let localContext = new PrimaryExpressionStartContext(this.context, this.state);
        this.enterRule(localContext, 130, LPCParser.RULE_primaryExpressionStart);
        let _la: number;
        try {
            let alternative: number;
            this.state = 936;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 95, this.context) ) {
            case 1:
                localContext = new LiteralExpressionContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 914;
                this.literal();
                }
                break;
            case 2:
                localContext = new CloneObjectExpressionContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 915;
                _la = this.tokenStream.LA(1);
                if(!(_la === 114 || _la === 115)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 916;
                this.match(LPCParser.PAREN_OPEN);
                {
                this.state = 917;
                (localContext as CloneObjectExpressionContext)._ob = this.expression();
                }
                this.state = 918;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 3:
                localContext = new IdentifierExpressionContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 920;
                this.match(LPCParser.Identifier);
                }
                break;
            case 4:
                localContext = new ParenExpressionContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 921;
                this.match(LPCParser.PAREN_OPEN);
                this.state = 922;
                this.expression();
                this.state = 923;
                this.match(LPCParser.PAREN_CLOSE);
                }
                break;
            case 5:
                localContext = new PrimaryArrayExpressionContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 925;
                this.arrayExpression();
                }
                break;
            case 6:
                localContext = new PrimaryMappingExpressionContext(localContext);
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 926;
                this.mappingExpression();
                }
                break;
            case 7:
                localContext = new StringConcatExpressionContext(localContext);
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 927;
                this.match(LPCParser.StringLiteral);
                this.state = 931;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 94, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 928;
                        this.match(LPCParser.StringLiteral);
                        }
                        }
                    }
                    this.state = 933;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 94, this.context);
                }
                }
                break;
            case 8:
                localContext = new CatchExpressionContext(localContext);
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 934;
                this.catchExpr();
                }
                break;
            case 9:
                localContext = new InheritExpressionContext(localContext);
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 935;
                this.inheritSuperExpression();
                }
                break;
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
    public expression(): ExpressionContext {
        let localContext = new ExpressionContext(this.context, this.state);
        this.enterRule(localContext, 132, LPCParser.RULE_expression);
        try {
            this.state = 940;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 96, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 938;
                this.assignmentExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 939;
                this.nonAssignmentExpression();
                }
                break;
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
    public catchExpr(): CatchExprContext {
        let localContext = new CatchExprContext(this.context, this.state);
        this.enterRule(localContext, 134, LPCParser.RULE_catchExpr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 942;
            this.match(LPCParser.CATCH);
            this.state = 943;
            this.match(LPCParser.PAREN_OPEN);
            this.state = 944;
            this.expression();
            this.state = 949;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 80) {
                {
                {
                this.state = 945;
                this.match(LPCParser.COMMA);
                this.state = 946;
                this.expression();
                }
                }
                this.state = 951;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 956;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 79) {
                {
                {
                this.state = 952;
                this.match(LPCParser.SEMI);
                this.state = 953;
                this.match(LPCParser.Identifier);
                }
                }
                this.state = 958;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 959;
            this.match(LPCParser.PAREN_CLOSE);
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
    public bracketExpression(): BracketExpressionContext {
        let localContext = new BracketExpressionContext(this.context, this.state);
        this.enterRule(localContext, 136, LPCParser.RULE_bracketExpression);
        let _la: number;
        try {
            this.state = 995;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 106, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 961;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 963;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 64) {
                    {
                    this.state = 962;
                    this.match(LPCParser.LT);
                    }
                }

                this.state = 965;
                this.expression();
                this.state = 966;
                this.match(LPCParser.SQUARE_CLOSE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 968;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 970;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 64) {
                    {
                    this.state = 969;
                    this.match(LPCParser.LT);
                    }
                }

                this.state = 973;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 806125671) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 505877) !== 0)) {
                    {
                    this.state = 972;
                    this.expression();
                    }
                }

                this.state = 975;
                this.match(LPCParser.DOUBLEDOT);
                this.state = 977;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 64) {
                    {
                    this.state = 976;
                    this.match(LPCParser.LT);
                    }
                }

                this.state = 980;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 806125671) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 505877) !== 0)) {
                    {
                    this.state = 979;
                    this.expression();
                    }
                }

                this.state = 982;
                this.match(LPCParser.SQUARE_CLOSE);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 983;
                this.match(LPCParser.SQUARE_OPEN);
                this.state = 985;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 806125671) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 505877) !== 0)) {
                    {
                    this.state = 984;
                    this.expression();
                    }
                }

                this.state = 991;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 80) {
                    {
                    {
                    this.state = 987;
                    this.match(LPCParser.COMMA);
                    this.state = 988;
                    this.expression();
                    }
                    }
                    this.state = 993;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 994;
                this.match(LPCParser.SQUARE_CLOSE);
                }
                break;
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
    public argument(): ArgumentContext {
        let localContext = new ArgumentContext(this.context, this.state);
        this.enterRule(localContext, 138, LPCParser.RULE_argument);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 998;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 107, this.context) ) {
            case 1:
                {
                this.state = 997;
                this.match(LPCParser.AND);
                }
                break;
            }
            this.state = 1000;
            this.expression();
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
    public argumentList(): ArgumentListContext {
        let localContext = new ArgumentListContext(this.context, this.state);
        this.enterRule(localContext, 140, LPCParser.RULE_argumentList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1002;
            this.argument();
            this.state = 1009;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 80) {
                {
                {
                this.state = 1003;
                this.match(LPCParser.COMMA);
                this.state = 1005;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097170) !== 0) || ((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 806125671) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 505877) !== 0)) {
                    {
                    this.state = 1004;
                    this.argument();
                    }
                }

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
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 142, LPCParser.RULE_expressionList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1012;
            this.expression();
            this.state = 1017;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 80) {
                {
                {
                this.state = 1013;
                this.match(LPCParser.COMMA);
                this.state = 1014;
                this.expression();
                }
                }
                this.state = 1019;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
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
            this.exitRule();
        }
        return localContext;
    }
    public assignmentExpression(): AssignmentExpressionContext {
        let localContext = new AssignmentExpressionContext(this.context, this.state);
        this.enterRule(localContext, 144, LPCParser.RULE_assignmentExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1020;
            this.conditionalExpressionBase(0);
            this.state = 1021;
            this.assignmentOperator();
            this.state = 1022;
            this.expression();
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
    public nonAssignmentExpression(): NonAssignmentExpressionContext {
        let localContext = new NonAssignmentExpressionContext(this.context, this.state);
        this.enterRule(localContext, 146, LPCParser.RULE_nonAssignmentExpression);
        try {
            this.state = 1027;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 111, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 1024;
                this.inlineClosureExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 1025;
                this.lambdaExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 1026;
                this.conditionalExpressionBase(0);
                }
                break;
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

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
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
            return this.precpred(this.context, 11);
        case 2:
            return this.precpred(this.context, 10);
        case 3:
            return this.precpred(this.context, 9);
        case 4:
            return this.precpred(this.context, 8);
        case 5:
            return this.precpred(this.context, 7);
        case 6:
            return this.precpred(this.context, 6);
        case 7:
            return this.precpred(this.context, 5);
        case 8:
            return this.precpred(this.context, 4);
        case 9:
            return this.precpred(this.context, 3);
        case 10:
            return this.precpred(this.context, 2);
        case 11:
            return this.precpred(this.context, 1);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,122,1030,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
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
        72,7,72,2,73,7,73,1,0,1,0,1,0,5,0,152,8,0,10,0,12,0,155,9,0,1,0,
        1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,171,8,1,
        10,1,12,1,174,9,1,3,1,176,8,1,1,2,1,2,1,2,1,2,1,3,1,3,1,3,1,4,1,
        4,1,4,3,4,188,8,4,1,4,1,4,1,4,1,4,3,4,194,8,4,1,5,1,5,1,6,1,6,1,
        7,1,7,1,8,1,8,1,9,1,9,1,9,1,9,5,9,208,8,9,10,9,12,9,211,9,9,1,9,
        1,9,1,10,1,10,1,11,1,11,1,12,1,12,1,12,3,12,222,8,12,1,13,1,13,1,
        13,3,13,227,8,13,1,14,1,14,1,14,1,14,1,15,1,15,1,16,1,16,1,17,1,
        17,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,3,18,249,8,
        18,1,19,1,19,1,19,1,19,3,19,255,8,19,1,20,1,20,1,21,5,21,260,8,21,
        10,21,12,21,263,9,21,1,21,3,21,266,8,21,1,21,1,21,1,21,3,21,271,
        8,21,1,21,1,21,1,22,1,22,1,22,1,23,1,23,1,23,1,24,1,24,1,24,5,24,
        284,8,24,10,24,12,24,287,9,24,1,25,3,25,290,8,25,1,25,3,25,293,8,
        25,1,25,1,25,1,25,1,25,3,25,299,8,25,1,26,1,26,1,26,1,26,5,26,305,
        8,26,10,26,12,26,308,9,26,1,26,1,26,1,26,1,27,1,27,1,27,1,27,1,28,
        1,28,1,28,1,28,5,28,321,8,28,10,28,12,28,324,9,28,3,28,326,8,28,
        1,28,3,28,329,8,28,1,28,1,28,1,29,1,29,1,29,1,29,1,29,5,29,338,8,
        29,10,29,12,29,341,9,29,3,29,343,8,29,1,30,1,30,1,30,1,30,5,30,349,
        8,30,10,30,12,30,352,9,30,3,30,354,8,30,1,30,3,30,357,8,30,1,30,
        1,30,1,30,1,30,1,30,1,30,1,30,1,30,3,30,367,8,30,1,31,1,31,1,32,
        5,32,372,8,32,10,32,12,32,375,9,32,1,32,3,32,378,8,32,1,32,1,32,
        1,32,5,32,383,8,32,10,32,12,32,386,9,32,1,32,1,32,1,32,5,32,391,
        8,32,10,32,12,32,394,9,32,1,32,1,32,1,32,1,32,1,32,1,32,5,32,402,
        8,32,10,32,12,32,405,9,32,1,32,1,32,3,32,409,8,32,1,33,3,33,412,
        8,33,1,33,1,33,1,33,3,33,417,8,33,1,34,1,34,1,34,3,34,422,8,34,1,
        35,1,35,1,36,1,36,3,36,428,8,36,1,36,1,36,1,37,3,37,433,8,37,1,37,
        1,37,1,38,1,38,3,38,439,8,38,1,39,1,39,1,39,1,39,5,39,445,8,39,10,
        39,12,39,448,9,39,3,39,450,8,39,1,39,1,39,1,39,1,40,1,40,1,40,1,
        40,1,40,1,40,1,40,1,40,3,40,463,8,40,1,41,1,41,1,41,1,42,1,42,5,
        42,470,8,42,10,42,12,42,473,9,42,1,42,1,42,1,43,1,43,3,43,479,8,
        43,1,44,1,44,1,44,1,44,1,44,1,44,1,44,1,45,1,45,1,45,1,46,1,46,1,
        46,1,46,1,46,1,46,1,47,1,47,5,47,499,8,47,10,47,12,47,502,9,47,1,
        47,3,47,505,8,47,1,48,1,48,1,48,1,48,1,48,1,48,1,48,5,48,514,8,48,
        10,48,12,48,517,9,48,1,48,1,48,1,49,1,49,3,49,523,8,49,1,49,1,49,
        3,49,527,8,49,1,49,1,49,3,49,531,8,49,1,49,1,49,3,49,535,8,49,1,
        49,1,49,1,49,3,49,540,8,49,1,49,1,49,3,49,544,8,49,3,49,546,8,49,
        1,50,1,50,1,50,1,50,5,50,552,8,50,10,50,12,50,555,9,50,1,51,1,51,
        1,51,5,51,560,8,51,10,51,12,51,563,9,51,1,52,1,52,1,52,1,52,1,52,
        1,52,3,52,571,8,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,
        1,52,1,52,1,52,1,52,5,52,586,8,52,10,52,12,52,589,9,52,1,52,1,52,
        3,52,593,8,52,1,52,1,52,3,52,597,8,52,1,52,1,52,5,52,601,8,52,10,
        52,12,52,604,9,52,1,52,1,52,1,52,3,52,609,8,52,1,52,1,52,1,52,3,
        52,614,8,52,1,52,1,52,1,52,1,52,1,52,1,52,3,52,622,8,52,3,52,624,
        8,52,1,53,3,53,627,8,53,1,53,3,53,630,8,53,1,53,1,53,1,53,1,53,1,
        54,1,54,3,54,638,8,54,1,54,1,54,1,55,1,55,1,55,1,55,1,55,3,55,647,
        8,55,1,56,1,56,1,56,1,56,1,56,1,56,3,56,655,8,56,1,57,1,57,1,57,
        1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,
        1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,
        1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,
        1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,
        1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,
        1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,
        1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,3,57,749,
        8,57,1,58,1,58,1,58,1,58,1,59,1,59,1,60,1,60,1,60,1,60,1,60,1,60,
        1,60,1,60,1,60,1,60,1,60,1,60,5,60,769,8,60,10,60,12,60,772,9,60,
        1,60,1,60,3,60,776,8,60,1,61,1,61,1,62,1,62,1,62,1,62,1,62,1,62,
        1,62,1,62,1,62,1,62,1,62,1,62,4,62,792,8,62,11,62,12,62,793,1,62,
        1,62,1,62,4,62,799,8,62,11,62,12,62,800,1,62,1,62,1,62,4,62,806,
        8,62,11,62,12,62,807,1,62,1,62,1,62,4,62,813,8,62,11,62,12,62,814,
        1,62,1,62,1,62,4,62,820,8,62,11,62,12,62,821,1,62,1,62,1,62,4,62,
        827,8,62,11,62,12,62,828,1,62,1,62,1,62,4,62,834,8,62,11,62,12,62,
        835,1,62,1,62,1,62,4,62,841,8,62,11,62,12,62,842,1,62,1,62,1,62,
        4,62,848,8,62,11,62,12,62,849,1,62,1,62,1,62,4,62,855,8,62,11,62,
        12,62,856,5,62,859,8,62,10,62,12,62,862,9,62,1,63,1,63,1,63,1,63,
        1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,
        1,63,3,63,882,8,63,1,64,1,64,5,64,886,8,64,10,64,12,64,889,9,64,
        1,64,1,64,1,64,1,64,1,64,3,64,896,8,64,1,64,3,64,899,8,64,1,64,3,
        64,902,8,64,1,64,5,64,905,8,64,10,64,12,64,908,9,64,5,64,910,8,64,
        10,64,12,64,913,9,64,1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,
        1,65,1,65,1,65,1,65,1,65,1,65,5,65,930,8,65,10,65,12,65,933,9,65,
        1,65,1,65,3,65,937,8,65,1,66,1,66,3,66,941,8,66,1,67,1,67,1,67,1,
        67,1,67,5,67,948,8,67,10,67,12,67,951,9,67,1,67,1,67,5,67,955,8,
        67,10,67,12,67,958,9,67,1,67,1,67,1,68,1,68,3,68,964,8,68,1,68,1,
        68,1,68,1,68,1,68,3,68,971,8,68,1,68,3,68,974,8,68,1,68,1,68,3,68,
        978,8,68,1,68,3,68,981,8,68,1,68,1,68,1,68,3,68,986,8,68,1,68,1,
        68,5,68,990,8,68,10,68,12,68,993,9,68,1,68,3,68,996,8,68,1,69,3,
        69,999,8,69,1,69,1,69,1,70,1,70,1,70,3,70,1006,8,70,5,70,1008,8,
        70,10,70,12,70,1011,9,70,1,71,1,71,1,71,5,71,1016,8,71,10,71,12,
        71,1019,9,71,1,72,1,72,1,72,1,72,1,73,1,73,1,73,3,73,1028,8,73,1,
        73,0,1,124,74,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,
        38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,
        82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,
        120,122,124,126,128,130,132,134,136,138,140,142,144,146,0,17,2,0,
        12,12,14,14,2,0,13,13,22,24,3,0,11,11,29,29,43,43,3,0,1,1,108,108,
        112,112,2,0,1,1,112,112,2,0,47,51,53,54,1,0,47,52,8,0,5,6,17,17,
        28,28,30,32,35,35,37,38,42,42,44,44,2,0,25,25,78,78,2,0,108,110,
        112,113,1,0,85,96,1,0,68,69,1,0,64,67,1,0,62,63,1,0,55,56,1,0,57,
        59,1,0,114,115,1147,0,153,1,0,0,0,2,175,1,0,0,0,4,177,1,0,0,0,6,
        181,1,0,0,0,8,193,1,0,0,0,10,195,1,0,0,0,12,197,1,0,0,0,14,199,1,
        0,0,0,16,201,1,0,0,0,18,203,1,0,0,0,20,214,1,0,0,0,22,216,1,0,0,
        0,24,221,1,0,0,0,26,223,1,0,0,0,28,228,1,0,0,0,30,232,1,0,0,0,32,
        234,1,0,0,0,34,236,1,0,0,0,36,248,1,0,0,0,38,254,1,0,0,0,40,256,
        1,0,0,0,42,261,1,0,0,0,44,274,1,0,0,0,46,277,1,0,0,0,48,280,1,0,
        0,0,50,298,1,0,0,0,52,300,1,0,0,0,54,312,1,0,0,0,56,316,1,0,0,0,
        58,332,1,0,0,0,60,366,1,0,0,0,62,368,1,0,0,0,64,408,1,0,0,0,66,411,
        1,0,0,0,68,421,1,0,0,0,70,423,1,0,0,0,72,425,1,0,0,0,74,432,1,0,
        0,0,76,438,1,0,0,0,78,440,1,0,0,0,80,462,1,0,0,0,82,464,1,0,0,0,
        84,467,1,0,0,0,86,478,1,0,0,0,88,480,1,0,0,0,90,487,1,0,0,0,92,490,
        1,0,0,0,94,496,1,0,0,0,96,506,1,0,0,0,98,545,1,0,0,0,100,547,1,0,
        0,0,102,556,1,0,0,0,104,623,1,0,0,0,106,626,1,0,0,0,108,635,1,0,
        0,0,110,646,1,0,0,0,112,654,1,0,0,0,114,748,1,0,0,0,116,750,1,0,
        0,0,118,754,1,0,0,0,120,775,1,0,0,0,122,777,1,0,0,0,124,779,1,0,
        0,0,126,881,1,0,0,0,128,883,1,0,0,0,130,936,1,0,0,0,132,940,1,0,
        0,0,134,942,1,0,0,0,136,995,1,0,0,0,138,998,1,0,0,0,140,1002,1,0,
        0,0,142,1012,1,0,0,0,144,1020,1,0,0,0,146,1027,1,0,0,0,148,152,3,
        38,19,0,149,152,3,2,1,0,150,152,3,34,17,0,151,148,1,0,0,0,151,149,
        1,0,0,0,151,150,1,0,0,0,152,155,1,0,0,0,153,151,1,0,0,0,153,154,
        1,0,0,0,154,156,1,0,0,0,155,153,1,0,0,0,156,157,5,0,0,1,157,1,1,
        0,0,0,158,176,3,8,4,0,159,160,5,21,0,0,160,161,3,14,7,0,161,162,
        3,16,8,0,162,176,1,0,0,0,163,176,3,6,3,0,164,176,3,4,2,0,165,166,
        5,21,0,0,166,167,3,32,16,0,167,172,5,1,0,0,168,169,5,80,0,0,169,
        171,5,1,0,0,170,168,1,0,0,0,171,174,1,0,0,0,172,170,1,0,0,0,172,
        173,1,0,0,0,173,176,1,0,0,0,174,172,1,0,0,0,175,158,1,0,0,0,175,
        159,1,0,0,0,175,163,1,0,0,0,175,164,1,0,0,0,175,165,1,0,0,0,176,
        3,1,0,0,0,177,178,5,21,0,0,178,179,3,22,11,0,179,180,3,24,12,0,180,
        5,1,0,0,0,181,182,5,118,0,0,182,183,5,120,0,0,183,7,1,0,0,0,184,
        185,5,21,0,0,185,187,3,12,6,0,186,188,5,73,0,0,187,186,1,0,0,0,187,
        188,1,0,0,0,188,189,1,0,0,0,189,190,3,16,8,0,190,194,1,0,0,0,191,
        192,5,21,0,0,192,194,3,10,5,0,193,184,1,0,0,0,193,191,1,0,0,0,194,
        9,1,0,0,0,195,196,7,0,0,0,196,11,1,0,0,0,197,198,7,1,0,0,198,13,
        1,0,0,0,199,200,7,2,0,0,200,15,1,0,0,0,201,202,7,3,0,0,202,17,1,
        0,0,0,203,204,5,101,0,0,204,209,5,1,0,0,205,206,5,80,0,0,206,208,
        5,1,0,0,207,205,1,0,0,0,208,211,1,0,0,0,209,207,1,0,0,0,209,210,
        1,0,0,0,210,212,1,0,0,0,211,209,1,0,0,0,212,213,5,102,0,0,213,19,
        1,0,0,0,214,215,3,132,66,0,215,21,1,0,0,0,216,217,5,26,0,0,217,23,
        1,0,0,0,218,222,3,28,14,0,219,222,3,30,15,0,220,222,5,1,0,0,221,
        218,1,0,0,0,221,219,1,0,0,0,221,220,1,0,0,0,222,25,1,0,0,0,223,226,
        5,1,0,0,224,225,5,82,0,0,225,227,5,1,0,0,226,224,1,0,0,0,226,227,
        1,0,0,0,227,27,1,0,0,0,228,229,5,64,0,0,229,230,3,26,13,0,230,231,
        5,65,0,0,231,29,1,0,0,0,232,233,5,112,0,0,233,31,1,0,0,0,234,235,
        5,33,0,0,235,33,1,0,0,0,236,237,5,27,0,0,237,238,7,4,0,0,238,239,
        5,79,0,0,239,35,1,0,0,0,240,241,5,84,0,0,241,249,3,132,66,0,242,
        243,5,112,0,0,243,244,5,84,0,0,244,249,3,132,66,0,245,246,5,1,0,
        0,246,247,5,84,0,0,247,249,3,132,66,0,248,240,1,0,0,0,248,242,1,
        0,0,0,248,245,1,0,0,0,249,37,1,0,0,0,250,255,3,44,22,0,251,255,3,
        46,23,0,252,255,3,52,26,0,253,255,3,64,32,0,254,250,1,0,0,0,254,
        251,1,0,0,0,254,252,1,0,0,0,254,253,1,0,0,0,255,39,1,0,0,0,256,257,
        7,5,0,0,257,41,1,0,0,0,258,260,3,40,20,0,259,258,1,0,0,0,260,263,
        1,0,0,0,261,259,1,0,0,0,261,262,1,0,0,0,262,265,1,0,0,0,263,261,
        1,0,0,0,264,266,3,76,38,0,265,264,1,0,0,0,265,266,1,0,0,0,266,267,
        1,0,0,0,267,268,5,1,0,0,268,270,5,101,0,0,269,271,3,48,24,0,270,
        269,1,0,0,0,270,271,1,0,0,0,271,272,1,0,0,0,272,273,5,102,0,0,273,
        43,1,0,0,0,274,275,3,42,21,0,275,276,5,79,0,0,276,45,1,0,0,0,277,
        278,3,42,21,0,278,279,3,84,42,0,279,47,1,0,0,0,280,285,3,50,25,0,
        281,282,5,80,0,0,282,284,3,50,25,0,283,281,1,0,0,0,284,287,1,0,0,
        0,285,283,1,0,0,0,285,286,1,0,0,0,286,49,1,0,0,0,287,285,1,0,0,0,
        288,290,5,54,0,0,289,288,1,0,0,0,289,290,1,0,0,0,290,292,1,0,0,0,
        291,293,3,76,38,0,292,291,1,0,0,0,292,293,1,0,0,0,293,294,1,0,0,
        0,294,299,5,1,0,0,295,296,5,36,0,0,296,297,5,1,0,0,297,299,5,1,0,
        0,298,289,1,0,0,0,298,295,1,0,0,0,299,51,1,0,0,0,300,301,5,36,0,
        0,301,302,5,1,0,0,302,306,5,103,0,0,303,305,3,54,27,0,304,303,1,
        0,0,0,305,308,1,0,0,0,306,304,1,0,0,0,306,307,1,0,0,0,307,309,1,
        0,0,0,308,306,1,0,0,0,309,310,5,104,0,0,310,311,5,79,0,0,311,53,
        1,0,0,0,312,313,3,76,38,0,313,314,5,1,0,0,314,315,5,79,0,0,315,55,
        1,0,0,0,316,325,5,97,0,0,317,322,3,132,66,0,318,319,5,80,0,0,319,
        321,3,132,66,0,320,318,1,0,0,0,321,324,1,0,0,0,322,320,1,0,0,0,322,
        323,1,0,0,0,323,326,1,0,0,0,324,322,1,0,0,0,325,317,1,0,0,0,325,
        326,1,0,0,0,326,328,1,0,0,0,327,329,5,80,0,0,328,327,1,0,0,0,328,
        329,1,0,0,0,329,330,1,0,0,0,330,331,5,98,0,0,331,57,1,0,0,0,332,
        342,3,132,66,0,333,334,5,78,0,0,334,339,3,132,66,0,335,336,5,79,
        0,0,336,338,3,132,66,0,337,335,1,0,0,0,338,341,1,0,0,0,339,337,1,
        0,0,0,339,340,1,0,0,0,340,343,1,0,0,0,341,339,1,0,0,0,342,333,1,
        0,0,0,342,343,1,0,0,0,343,59,1,0,0,0,344,353,5,99,0,0,345,350,3,
        58,29,0,346,347,5,80,0,0,347,349,3,58,29,0,348,346,1,0,0,0,349,352,
        1,0,0,0,350,348,1,0,0,0,350,351,1,0,0,0,351,354,1,0,0,0,352,350,
        1,0,0,0,353,345,1,0,0,0,353,354,1,0,0,0,354,356,1,0,0,0,355,357,
        5,80,0,0,356,355,1,0,0,0,356,357,1,0,0,0,357,358,1,0,0,0,358,359,
        5,106,0,0,359,367,5,102,0,0,360,361,5,99,0,0,361,362,5,78,0,0,362,
        363,3,132,66,0,363,364,5,106,0,0,364,365,5,102,0,0,365,367,1,0,0,
        0,366,344,1,0,0,0,366,360,1,0,0,0,367,61,1,0,0,0,368,369,7,6,0,0,
        369,63,1,0,0,0,370,372,3,62,31,0,371,370,1,0,0,0,372,375,1,0,0,0,
        373,371,1,0,0,0,373,374,1,0,0,0,374,377,1,0,0,0,375,373,1,0,0,0,
        376,378,3,70,35,0,377,376,1,0,0,0,377,378,1,0,0,0,378,379,1,0,0,
        0,379,384,3,66,33,0,380,381,5,80,0,0,381,383,3,66,33,0,382,380,1,
        0,0,0,383,386,1,0,0,0,384,382,1,0,0,0,384,385,1,0,0,0,385,387,1,
        0,0,0,386,384,1,0,0,0,387,388,5,79,0,0,388,409,1,0,0,0,389,391,3,
        62,31,0,390,389,1,0,0,0,391,394,1,0,0,0,392,390,1,0,0,0,392,393,
        1,0,0,0,393,395,1,0,0,0,394,392,1,0,0,0,395,396,5,36,0,0,396,397,
        5,1,0,0,397,403,3,66,33,0,398,399,5,80,0,0,399,400,5,1,0,0,400,402,
        3,66,33,0,401,398,1,0,0,0,402,405,1,0,0,0,403,401,1,0,0,0,403,404,
        1,0,0,0,404,406,1,0,0,0,405,403,1,0,0,0,406,407,5,79,0,0,407,409,
        1,0,0,0,408,373,1,0,0,0,408,392,1,0,0,0,409,65,1,0,0,0,410,412,5,
        57,0,0,411,410,1,0,0,0,411,412,1,0,0,0,412,413,1,0,0,0,413,416,5,
        1,0,0,414,415,5,85,0,0,415,417,3,68,34,0,416,414,1,0,0,0,416,417,
        1,0,0,0,417,67,1,0,0,0,418,422,3,132,66,0,419,422,3,56,28,0,420,
        422,3,60,30,0,421,418,1,0,0,0,421,419,1,0,0,0,421,420,1,0,0,0,422,
        69,1,0,0,0,423,424,7,7,0,0,424,71,1,0,0,0,425,427,5,101,0,0,426,
        428,3,140,70,0,427,426,1,0,0,0,427,428,1,0,0,0,428,429,1,0,0,0,429,
        430,5,102,0,0,430,73,1,0,0,0,431,433,3,70,35,0,432,431,1,0,0,0,432,
        433,1,0,0,0,433,434,1,0,0,0,434,435,5,57,0,0,435,75,1,0,0,0,436,
        439,3,70,35,0,437,439,3,74,37,0,438,436,1,0,0,0,438,437,1,0,0,0,
        439,77,1,0,0,0,440,441,5,101,0,0,441,449,5,78,0,0,442,450,3,132,
        66,0,443,445,3,80,40,0,444,443,1,0,0,0,445,448,1,0,0,0,446,444,1,
        0,0,0,446,447,1,0,0,0,447,450,1,0,0,0,448,446,1,0,0,0,449,442,1,
        0,0,0,449,446,1,0,0,0,450,451,1,0,0,0,451,452,5,78,0,0,452,453,5,
        102,0,0,453,79,1,0,0,0,454,463,3,82,41,0,455,463,3,84,42,0,456,463,
        3,86,43,0,457,463,3,104,52,0,458,463,3,110,55,0,459,463,3,64,32,
        0,460,463,3,8,4,0,461,463,3,108,54,0,462,454,1,0,0,0,462,455,1,0,
        0,0,462,456,1,0,0,0,462,457,1,0,0,0,462,458,1,0,0,0,462,459,1,0,
        0,0,462,460,1,0,0,0,462,461,1,0,0,0,463,81,1,0,0,0,464,465,3,132,
        66,0,465,466,5,79,0,0,466,83,1,0,0,0,467,471,5,103,0,0,468,470,3,
        80,40,0,469,468,1,0,0,0,470,473,1,0,0,0,471,469,1,0,0,0,471,472,
        1,0,0,0,472,474,1,0,0,0,473,471,1,0,0,0,474,475,5,104,0,0,475,85,
        1,0,0,0,476,479,3,94,47,0,477,479,3,96,48,0,478,476,1,0,0,0,478,
        477,1,0,0,0,479,87,1,0,0,0,480,481,5,12,0,0,481,482,5,22,0,0,482,
        483,5,101,0,0,483,484,3,132,66,0,484,485,5,102,0,0,485,486,3,80,
        40,0,486,89,1,0,0,0,487,488,5,12,0,0,488,489,3,80,40,0,489,91,1,
        0,0,0,490,491,5,22,0,0,491,492,5,101,0,0,492,493,3,132,66,0,493,
        494,5,102,0,0,494,495,3,80,40,0,495,93,1,0,0,0,496,500,3,92,46,0,
        497,499,3,88,44,0,498,497,1,0,0,0,499,502,1,0,0,0,500,498,1,0,0,
        0,500,501,1,0,0,0,501,504,1,0,0,0,502,500,1,0,0,0,503,505,3,90,45,
        0,504,503,1,0,0,0,504,505,1,0,0,0,505,95,1,0,0,0,506,507,5,39,0,
        0,507,508,5,101,0,0,508,509,3,132,66,0,509,510,5,102,0,0,510,515,
        5,103,0,0,511,514,3,100,50,0,512,514,3,102,51,0,513,511,1,0,0,0,
        513,512,1,0,0,0,514,517,1,0,0,0,515,513,1,0,0,0,515,516,1,0,0,0,
        516,518,1,0,0,0,517,515,1,0,0,0,518,519,5,104,0,0,519,97,1,0,0,0,
        520,527,5,112,0,0,521,523,5,56,0,0,522,521,1,0,0,0,522,523,1,0,0,
        0,523,524,1,0,0,0,524,527,5,108,0,0,525,527,5,1,0,0,526,520,1,0,
        0,0,526,522,1,0,0,0,526,525,1,0,0,0,527,546,1,0,0,0,528,535,5,112,
        0,0,529,531,5,56,0,0,530,529,1,0,0,0,530,531,1,0,0,0,531,532,1,0,
        0,0,532,535,5,108,0,0,533,535,5,1,0,0,534,528,1,0,0,0,534,530,1,
        0,0,0,534,533,1,0,0,0,535,536,1,0,0,0,536,543,5,81,0,0,537,544,5,
        112,0,0,538,540,5,56,0,0,539,538,1,0,0,0,539,540,1,0,0,0,540,541,
        1,0,0,0,541,544,5,108,0,0,542,544,5,1,0,0,543,537,1,0,0,0,543,539,
        1,0,0,0,543,542,1,0,0,0,544,546,1,0,0,0,545,526,1,0,0,0,545,534,
        1,0,0,0,546,99,1,0,0,0,547,548,5,3,0,0,548,549,3,98,49,0,549,553,
        5,78,0,0,550,552,3,80,40,0,551,550,1,0,0,0,552,555,1,0,0,0,553,551,
        1,0,0,0,553,554,1,0,0,0,554,101,1,0,0,0,555,553,1,0,0,0,556,557,
        5,9,0,0,557,561,5,78,0,0,558,560,3,80,40,0,559,558,1,0,0,0,560,563,
        1,0,0,0,561,559,1,0,0,0,561,562,1,0,0,0,562,103,1,0,0,0,563,561,
        1,0,0,0,564,565,5,46,0,0,565,566,5,101,0,0,566,567,3,132,66,0,567,
        570,5,102,0,0,568,571,3,80,40,0,569,571,5,79,0,0,570,568,1,0,0,0,
        570,569,1,0,0,0,571,624,1,0,0,0,572,573,5,10,0,0,573,574,3,80,40,
        0,574,575,5,46,0,0,575,576,5,101,0,0,576,577,3,132,66,0,577,578,
        5,102,0,0,578,579,5,79,0,0,579,624,1,0,0,0,580,581,5,18,0,0,581,
        582,5,101,0,0,582,587,3,106,53,0,583,584,5,80,0,0,584,586,3,106,
        53,0,585,583,1,0,0,0,586,589,1,0,0,0,587,585,1,0,0,0,587,588,1,0,
        0,0,588,590,1,0,0,0,589,587,1,0,0,0,590,592,5,79,0,0,591,593,3,132,
        66,0,592,591,1,0,0,0,592,593,1,0,0,0,593,594,1,0,0,0,594,596,5,79,
        0,0,595,597,3,132,66,0,596,595,1,0,0,0,596,597,1,0,0,0,597,602,1,
        0,0,0,598,599,5,80,0,0,599,601,3,132,66,0,600,598,1,0,0,0,601,604,
        1,0,0,0,602,600,1,0,0,0,602,603,1,0,0,0,603,605,1,0,0,0,604,602,
        1,0,0,0,605,608,5,102,0,0,606,609,3,80,40,0,607,609,5,79,0,0,608,
        606,1,0,0,0,608,607,1,0,0,0,609,624,1,0,0,0,610,611,5,19,0,0,611,
        613,5,101,0,0,612,614,3,76,38,0,613,612,1,0,0,0,613,614,1,0,0,0,
        614,615,1,0,0,0,615,616,5,1,0,0,616,617,7,8,0,0,617,618,3,132,66,
        0,618,621,5,102,0,0,619,622,3,80,40,0,620,622,5,79,0,0,621,619,1,
        0,0,0,621,620,1,0,0,0,622,624,1,0,0,0,623,564,1,0,0,0,623,572,1,
        0,0,0,623,580,1,0,0,0,623,610,1,0,0,0,624,105,1,0,0,0,625,627,3,
        70,35,0,626,625,1,0,0,0,626,627,1,0,0,0,627,629,1,0,0,0,628,630,
        5,57,0,0,629,628,1,0,0,0,629,630,1,0,0,0,630,631,1,0,0,0,631,632,
        5,1,0,0,632,633,5,85,0,0,633,634,3,68,34,0,634,107,1,0,0,0,635,637,
        5,34,0,0,636,638,3,132,66,0,637,636,1,0,0,0,637,638,1,0,0,0,638,
        639,1,0,0,0,639,640,5,79,0,0,640,109,1,0,0,0,641,642,5,2,0,0,642,
        647,5,79,0,0,643,644,5,8,0,0,644,647,5,79,0,0,645,647,3,108,54,0,
        646,641,1,0,0,0,646,643,1,0,0,0,646,645,1,0,0,0,647,111,1,0,0,0,
        648,655,5,1,0,0,649,650,5,101,0,0,650,651,3,132,66,0,651,652,5,102,
        0,0,652,655,1,0,0,0,653,655,5,112,0,0,654,648,1,0,0,0,654,649,1,
        0,0,0,654,653,1,0,0,0,655,113,1,0,0,0,656,657,5,83,0,0,657,749,5,
        1,0,0,658,659,5,21,0,0,659,660,5,83,0,0,660,749,3,132,66,0,661,662,
        5,21,0,0,662,663,5,83,0,0,663,749,5,55,0,0,664,665,5,21,0,0,665,
        666,5,83,0,0,666,749,5,56,0,0,667,668,5,21,0,0,668,669,5,83,0,0,
        669,749,5,57,0,0,670,671,5,21,0,0,671,672,5,83,0,0,672,749,5,58,
        0,0,673,674,5,21,0,0,674,675,5,83,0,0,675,749,5,59,0,0,676,677,5,
        21,0,0,677,678,5,83,0,0,678,749,5,64,0,0,679,680,5,21,0,0,680,681,
        5,83,0,0,681,749,5,65,0,0,682,683,5,21,0,0,683,684,5,83,0,0,684,
        749,5,66,0,0,685,686,5,21,0,0,686,687,5,83,0,0,687,749,5,67,0,0,
        688,689,5,21,0,0,689,690,5,83,0,0,690,749,5,68,0,0,691,692,5,21,
        0,0,692,693,5,83,0,0,693,749,5,69,0,0,694,695,5,21,0,0,695,696,5,
        83,0,0,696,749,5,70,0,0,697,698,5,21,0,0,698,699,5,83,0,0,699,749,
        5,71,0,0,700,701,5,21,0,0,701,702,5,83,0,0,702,749,5,72,0,0,703,
        704,5,21,0,0,704,705,5,83,0,0,705,749,5,75,0,0,706,707,5,21,0,0,
        707,708,5,83,0,0,708,749,5,76,0,0,709,710,5,21,0,0,710,711,5,83,
        0,0,711,749,5,86,0,0,712,713,5,21,0,0,713,714,5,83,0,0,714,749,5,
        87,0,0,715,716,5,21,0,0,716,717,5,83,0,0,717,749,5,88,0,0,718,719,
        5,21,0,0,719,720,5,83,0,0,720,749,5,89,0,0,721,722,5,21,0,0,722,
        723,5,83,0,0,723,749,5,90,0,0,724,725,5,21,0,0,725,726,5,83,0,0,
        726,749,5,92,0,0,727,728,5,21,0,0,728,729,5,83,0,0,729,749,5,91,
        0,0,730,731,5,21,0,0,731,732,5,83,0,0,732,749,5,93,0,0,733,734,5,
        21,0,0,734,735,5,83,0,0,735,749,5,94,0,0,736,737,5,21,0,0,737,738,
        5,83,0,0,738,749,5,95,0,0,739,740,5,21,0,0,740,741,5,83,0,0,741,
        749,5,77,0,0,742,743,5,21,0,0,743,744,5,83,0,0,744,749,5,62,0,0,
        745,746,5,21,0,0,746,747,5,83,0,0,747,749,5,63,0,0,748,656,1,0,0,
        0,748,658,1,0,0,0,748,661,1,0,0,0,748,664,1,0,0,0,748,667,1,0,0,
        0,748,670,1,0,0,0,748,673,1,0,0,0,748,676,1,0,0,0,748,679,1,0,0,
        0,748,682,1,0,0,0,748,685,1,0,0,0,748,688,1,0,0,0,748,691,1,0,0,
        0,748,694,1,0,0,0,748,697,1,0,0,0,748,700,1,0,0,0,748,703,1,0,0,
        0,748,706,1,0,0,0,748,709,1,0,0,0,748,712,1,0,0,0,748,715,1,0,0,
        0,748,718,1,0,0,0,748,721,1,0,0,0,748,724,1,0,0,0,748,727,1,0,0,
        0,748,730,1,0,0,0,748,733,1,0,0,0,748,736,1,0,0,0,748,739,1,0,0,
        0,748,742,1,0,0,0,748,745,1,0,0,0,749,115,1,0,0,0,750,751,5,65,0,
        0,751,752,5,67,0,0,752,753,4,58,0,1,753,117,1,0,0,0,754,755,7,9,
        0,0,755,119,1,0,0,0,756,757,5,101,0,0,757,758,3,76,38,0,758,759,
        5,102,0,0,759,760,3,132,66,0,760,776,1,0,0,0,761,762,5,101,0,0,762,
        763,5,64,0,0,763,764,5,1,0,0,764,765,5,65,0,0,765,770,3,132,66,0,
        766,767,5,80,0,0,767,769,3,132,66,0,768,766,1,0,0,0,769,772,1,0,
        0,0,770,768,1,0,0,0,770,771,1,0,0,0,771,773,1,0,0,0,772,770,1,0,
        0,0,773,774,5,102,0,0,774,776,1,0,0,0,775,756,1,0,0,0,775,761,1,
        0,0,0,776,121,1,0,0,0,777,778,7,10,0,0,778,123,1,0,0,0,779,780,6,
        62,-1,0,780,781,3,126,63,0,781,860,1,0,0,0,782,783,10,11,0,0,783,
        784,5,77,0,0,784,785,3,132,66,0,785,786,5,78,0,0,786,787,3,132,66,
        0,787,859,1,0,0,0,788,791,10,10,0,0,789,790,5,76,0,0,790,792,3,124,
        62,0,791,789,1,0,0,0,792,793,1,0,0,0,793,791,1,0,0,0,793,794,1,0,
        0,0,794,859,1,0,0,0,795,798,10,9,0,0,796,797,5,75,0,0,797,799,3,
        124,62,0,798,796,1,0,0,0,799,800,1,0,0,0,800,798,1,0,0,0,800,801,
        1,0,0,0,801,859,1,0,0,0,802,805,10,8,0,0,803,804,5,71,0,0,804,806,
        3,124,62,0,805,803,1,0,0,0,806,807,1,0,0,0,807,805,1,0,0,0,807,808,
        1,0,0,0,808,859,1,0,0,0,809,812,10,7,0,0,810,811,5,72,0,0,811,813,
        3,124,62,0,812,810,1,0,0,0,813,814,1,0,0,0,814,812,1,0,0,0,814,815,
        1,0,0,0,815,859,1,0,0,0,816,819,10,6,0,0,817,818,5,70,0,0,818,820,
        3,124,62,0,819,817,1,0,0,0,820,821,1,0,0,0,821,819,1,0,0,0,821,822,
        1,0,0,0,822,859,1,0,0,0,823,826,10,5,0,0,824,825,7,11,0,0,825,827,
        3,124,62,0,826,824,1,0,0,0,827,828,1,0,0,0,828,826,1,0,0,0,828,829,
        1,0,0,0,829,859,1,0,0,0,830,833,10,4,0,0,831,832,7,12,0,0,832,834,
        3,124,62,0,833,831,1,0,0,0,834,835,1,0,0,0,835,833,1,0,0,0,835,836,
        1,0,0,0,836,859,1,0,0,0,837,840,10,3,0,0,838,839,7,13,0,0,839,841,
        3,124,62,0,840,838,1,0,0,0,841,842,1,0,0,0,842,840,1,0,0,0,842,843,
        1,0,0,0,843,859,1,0,0,0,844,847,10,2,0,0,845,846,7,14,0,0,846,848,
        3,124,62,0,847,845,1,0,0,0,848,849,1,0,0,0,849,847,1,0,0,0,849,850,
        1,0,0,0,850,859,1,0,0,0,851,854,10,1,0,0,852,853,7,15,0,0,853,855,
        3,124,62,0,854,852,1,0,0,0,855,856,1,0,0,0,856,854,1,0,0,0,856,857,
        1,0,0,0,857,859,1,0,0,0,858,782,1,0,0,0,858,788,1,0,0,0,858,795,
        1,0,0,0,858,802,1,0,0,0,858,809,1,0,0,0,858,816,1,0,0,0,858,823,
        1,0,0,0,858,830,1,0,0,0,858,837,1,0,0,0,858,844,1,0,0,0,858,851,
        1,0,0,0,859,862,1,0,0,0,860,858,1,0,0,0,860,861,1,0,0,0,861,125,
        1,0,0,0,862,860,1,0,0,0,863,882,3,120,60,0,864,882,3,128,64,0,865,
        866,5,55,0,0,866,882,3,132,66,0,867,868,5,56,0,0,868,882,3,132,66,
        0,869,870,5,73,0,0,870,882,3,132,66,0,871,872,5,74,0,0,872,882,3,
        132,66,0,873,874,5,60,0,0,874,882,3,132,66,0,875,876,5,61,0,0,876,
        882,3,132,66,0,877,878,5,70,0,0,878,882,3,132,66,0,879,880,5,57,
        0,0,880,882,3,132,66,0,881,863,1,0,0,0,881,864,1,0,0,0,881,865,1,
        0,0,0,881,867,1,0,0,0,881,869,1,0,0,0,881,871,1,0,0,0,881,873,1,
        0,0,0,881,875,1,0,0,0,881,877,1,0,0,0,881,879,1,0,0,0,882,127,1,
        0,0,0,883,887,3,130,65,0,884,886,3,136,68,0,885,884,1,0,0,0,886,
        889,1,0,0,0,887,885,1,0,0,0,887,888,1,0,0,0,888,911,1,0,0,0,889,
        887,1,0,0,0,890,902,3,72,36,0,891,902,5,60,0,0,892,902,5,61,0,0,
        893,895,5,100,0,0,894,896,3,112,56,0,895,894,1,0,0,0,895,896,1,0,
        0,0,896,898,1,0,0,0,897,899,3,72,36,0,898,897,1,0,0,0,898,899,1,
        0,0,0,899,902,1,0,0,0,900,902,5,1,0,0,901,890,1,0,0,0,901,891,1,
        0,0,0,901,892,1,0,0,0,901,893,1,0,0,0,901,900,1,0,0,0,902,906,1,
        0,0,0,903,905,3,136,68,0,904,903,1,0,0,0,905,908,1,0,0,0,906,904,
        1,0,0,0,906,907,1,0,0,0,907,910,1,0,0,0,908,906,1,0,0,0,909,901,
        1,0,0,0,910,913,1,0,0,0,911,909,1,0,0,0,911,912,1,0,0,0,912,129,
        1,0,0,0,913,911,1,0,0,0,914,937,3,118,59,0,915,916,7,16,0,0,916,
        917,5,101,0,0,917,918,3,132,66,0,918,919,5,102,0,0,919,937,1,0,0,
        0,920,937,5,1,0,0,921,922,5,101,0,0,922,923,3,132,66,0,923,924,5,
        102,0,0,924,937,1,0,0,0,925,937,3,56,28,0,926,937,3,60,30,0,927,
        931,5,112,0,0,928,930,5,112,0,0,929,928,1,0,0,0,930,933,1,0,0,0,
        931,929,1,0,0,0,931,932,1,0,0,0,932,937,1,0,0,0,933,931,1,0,0,0,
        934,937,3,134,67,0,935,937,3,36,18,0,936,914,1,0,0,0,936,915,1,0,
        0,0,936,920,1,0,0,0,936,921,1,0,0,0,936,925,1,0,0,0,936,926,1,0,
        0,0,936,927,1,0,0,0,936,934,1,0,0,0,936,935,1,0,0,0,937,131,1,0,
        0,0,938,941,3,144,72,0,939,941,3,146,73,0,940,938,1,0,0,0,940,939,
        1,0,0,0,941,133,1,0,0,0,942,943,5,4,0,0,943,944,5,101,0,0,944,949,
        3,132,66,0,945,946,5,80,0,0,946,948,3,132,66,0,947,945,1,0,0,0,948,
        951,1,0,0,0,949,947,1,0,0,0,949,950,1,0,0,0,950,956,1,0,0,0,951,
        949,1,0,0,0,952,953,5,79,0,0,953,955,5,1,0,0,954,952,1,0,0,0,955,
        958,1,0,0,0,956,954,1,0,0,0,956,957,1,0,0,0,957,959,1,0,0,0,958,
        956,1,0,0,0,959,960,5,102,0,0,960,135,1,0,0,0,961,963,5,105,0,0,
        962,964,5,64,0,0,963,962,1,0,0,0,963,964,1,0,0,0,964,965,1,0,0,0,
        965,966,3,132,66,0,966,967,5,106,0,0,967,996,1,0,0,0,968,970,5,105,
        0,0,969,971,5,64,0,0,970,969,1,0,0,0,970,971,1,0,0,0,971,973,1,0,
        0,0,972,974,3,132,66,0,973,972,1,0,0,0,973,974,1,0,0,0,974,975,1,
        0,0,0,975,977,5,81,0,0,976,978,5,64,0,0,977,976,1,0,0,0,977,978,
        1,0,0,0,978,980,1,0,0,0,979,981,3,132,66,0,980,979,1,0,0,0,980,981,
        1,0,0,0,981,982,1,0,0,0,982,996,5,106,0,0,983,985,5,105,0,0,984,
        986,3,132,66,0,985,984,1,0,0,0,985,986,1,0,0,0,986,991,1,0,0,0,987,
        988,5,80,0,0,988,990,3,132,66,0,989,987,1,0,0,0,990,993,1,0,0,0,
        991,989,1,0,0,0,991,992,1,0,0,0,992,994,1,0,0,0,993,991,1,0,0,0,
        994,996,5,106,0,0,995,961,1,0,0,0,995,968,1,0,0,0,995,983,1,0,0,
        0,996,137,1,0,0,0,997,999,5,70,0,0,998,997,1,0,0,0,998,999,1,0,0,
        0,999,1000,1,0,0,0,1000,1001,3,132,66,0,1001,139,1,0,0,0,1002,1009,
        3,138,69,0,1003,1005,5,80,0,0,1004,1006,3,138,69,0,1005,1004,1,0,
        0,0,1005,1006,1,0,0,0,1006,1008,1,0,0,0,1007,1003,1,0,0,0,1008,1011,
        1,0,0,0,1009,1007,1,0,0,0,1009,1010,1,0,0,0,1010,141,1,0,0,0,1011,
        1009,1,0,0,0,1012,1017,3,132,66,0,1013,1014,5,80,0,0,1014,1016,3,
        132,66,0,1015,1013,1,0,0,0,1016,1019,1,0,0,0,1017,1015,1,0,0,0,1017,
        1018,1,0,0,0,1018,143,1,0,0,0,1019,1017,1,0,0,0,1020,1021,3,124,
        62,0,1021,1022,3,122,61,0,1022,1023,3,132,66,0,1023,145,1,0,0,0,
        1024,1028,3,78,39,0,1025,1028,3,114,57,0,1026,1028,3,124,62,0,1027,
        1024,1,0,0,0,1027,1025,1,0,0,0,1027,1026,1,0,0,0,1028,147,1,0,0,
        0,112,151,153,172,175,187,193,209,221,226,248,254,261,265,270,285,
        289,292,298,306,322,325,328,339,342,350,353,356,366,373,377,384,
        392,403,408,411,416,421,427,432,438,446,449,462,471,478,500,504,
        513,515,522,526,530,534,539,543,545,553,561,570,587,592,596,602,
        608,613,621,623,626,629,637,646,654,748,770,775,793,800,807,814,
        821,828,835,842,849,856,858,860,881,887,895,898,901,906,911,931,
        936,940,949,956,963,970,973,977,980,985,991,995,998,1005,1009,1017,
        1027
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
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
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
    public VARARGS(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.VARARGS, 0);
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
    public NOSAVE(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.NOSAVE, 0);
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
    public forVariable(): ForVariableContext[];
    public forVariable(i: number): ForVariableContext | null;
    public forVariable(i?: number): ForVariableContext[] | ForVariableContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ForVariableContext);
        }

        return this.getRuleContext(i, ForVariableContext);
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
    public Identifier(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.Identifier, 0);
    }
    public IN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.IN, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.COLON, 0);
    }
    public typeSpecifier(): TypeSpecifierContext | null {
        return this.getRuleContext(0, TypeSpecifierContext);
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


export class ForVariableContext extends antlr.ParserRuleContext {
    public _arraySpecifier?: Token | null;
    public _variableName?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ASSIGN(): antlr.TerminalNode {
        return this.getToken(LPCParser.ASSIGN, 0)!;
    }
    public variableInitializer(): VariableInitializerContext {
        return this.getRuleContext(0, VariableInitializerContext)!;
    }
    public Identifier(): antlr.TerminalNode {
        return this.getToken(LPCParser.Identifier, 0)!;
    }
    public primitiveTypeSpecifier(): PrimitiveTypeSpecifierContext | null {
        return this.getRuleContext(0, PrimitiveTypeSpecifierContext);
    }
    public STAR(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.STAR, 0);
    }
    public override get ruleIndex(): number {
        return LPCParser.RULE_forVariable;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterForVariable) {
             listener.enterForVariable(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitForVariable) {
             listener.exitForVariable(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitForVariable) {
            return visitor.visitForVariable(this);
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
    public BITAND_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.BITAND_ASSIGN, 0);
    }
    public BITOR_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.BITOR_ASSIGN, 0);
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
    public BITAND_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.BITAND_ASSIGN, 0);
    }
    public BITOR_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(LPCParser.BITOR_ASSIGN, 0);
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
    public _target?: CallOtherTargetContext;
    public _invocation?: MethodInvocationContext;
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
    public Identifier(): antlr.TerminalNode[];
    public Identifier(i: number): antlr.TerminalNode | null;
    public Identifier(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.Identifier);
    	} else {
    		return this.getToken(LPCParser.Identifier, i);
    	}
    }
    public ARROW(): antlr.TerminalNode[];
    public ARROW(i: number): antlr.TerminalNode | null;
    public ARROW(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.ARROW);
    	} else {
    		return this.getToken(LPCParser.ARROW, i);
    	}
    }
    public callOtherTarget(): CallOtherTargetContext[];
    public callOtherTarget(i: number): CallOtherTargetContext | null;
    public callOtherTarget(i?: number): CallOtherTargetContext[] | CallOtherTargetContext | null {
        if (i === undefined) {
            return this.getRuleContexts(CallOtherTargetContext);
        }

        return this.getRuleContext(i, CallOtherTargetContext);
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
export class InheritExpressionContext extends PrimaryExpressionStartContext {
    public constructor(ctx: PrimaryExpressionStartContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public inheritSuperExpression(): InheritSuperExpressionContext {
        return this.getRuleContext(0, InheritSuperExpressionContext)!;
    }
    public override enterRule(listener: LPCParserListener): void {
        if(listener.enterInheritExpression) {
             listener.enterInheritExpression(this);
        }
    }
    public override exitRule(listener: LPCParserListener): void {
        if(listener.exitInheritExpression) {
             listener.exitInheritExpression(this);
        }
    }
    public override accept<Result>(visitor: LPCParserVisitor<Result>): Result | null {
        if (visitor.visitInheritExpression) {
            return visitor.visitInheritExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
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
    public SEMI(): antlr.TerminalNode[];
    public SEMI(i: number): antlr.TerminalNode | null;
    public SEMI(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(LPCParser.SEMI);
    	} else {
    		return this.getToken(LPCParser.SEMI, i);
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

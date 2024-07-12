//
// LPC (LDMud) Grammar
// Copyright (c) 2023-2024, John Chmura
//
parser grammar LPCParser;
@header { 
    import {LPCParserBase} from "./LPCParserBase";
}

options {
    tokenVocab = LPCLexer;
    superClass = LPCParserBase;
}

// Entrypoint
program
    : (
        declaration 
        | preprocessorDirective 
        | inheritStatement
        | { this.isFluff() }? globalModifierStatement // fluffos global modifiers
    )* EOF;

// Preprocessor directives - These are mostly handled by preprocessing step
preprocessorDirective
    : selectionPreprocessorDirective    
    | directiveTypeWithArguments directiveArgument
    | definePreprocessorDirective
    | includePreprocessorDirective
    | HASH directiveTypePragma Identifier (COMMA Identifier)*
    ;

includePreprocessorDirective
    : HASH directiveTypeInclude directiveIncludeFile ({ this.isFluff() }? SEMI)?
    ;

definePreprocessorDirective
    : DEFINE END_DEFINE
    ;

selectionPreprocessorDirective
    : HASH selectionPreprocessorDirectiveTypeWithArg NOT? directiveArgument
    | HASH (IF|ELIF) directiveIfTestExpression
    | HASH selectionPreprocessorDirectiveTypeSingle
    ;

selectionPreprocessorDirectiveTypeSingle
    : ELSE
    | ENDIF
    ;

selectionPreprocessorDirectiveTypeWithArg
    : IFDEF
    | IFNDEF    
    ;

directiveIfTestExpression
    : NOT? directiveIfArgument
    | directiveIfTestExpression ((AND_AND | OR_OR | EQ | NE | LT | GT | LE | GE) directiveIfTestExpression)+    
    ;

directiveIfArgument
    : Identifier (PAREN_OPEN (Identifier|StringLiteral|IntegerConstant) PAREN_CLOSE)?
    | StringLiteral
    | IntegerConstant
    | expression
    ;

directiveTypeWithArguments
    : HASH UNDEF
    | ECHO
    | LINE
    ;

directiveArgument
    : Identifier (MINUS Identifier)*
    | StringLiteral
    | IntegerConstant    
    | PRIVATE // this is apparently legal - shows up in mg-mudlib
    ;


// #include <file> | #include "file"
directiveTypeInclude: INCLUDE;

directiveIncludeFile
    : globalFile=BracketedIdentifier
    | localFile=StringLiteral StringLiteral*
    | defineFile=Identifier
    ;

directiveTypePragma: PRAGMA;

// inherit
inheritStatement
    : (
        PRIVATE? inherit        
        | (DEFAULT defaultModifier+)? inheritModifier* VIRTUAL? inherit
    ) SEMI    
    ;

inheritModifier
    : functionModifier+ FUNCTIONS
    | variableModifier+ (VARIABLES|STRUCTS)
    ;

inherit
    : INHERIT inheritFile
    ;

defaultModifier
    : PRIVATE
    | PROTECTED
    | VISIBLE
    | PUBLIC
    | STATIC;

inheritFile
    : StringLiteral        
    | Identifier // not really allowed, but will handle in semantic analysis
    | PAREN_OPEN inheritFile PAREN_CLOSE
    | inheritFile PLUS? inheritFile
    ;

inheritSuperExpression
    : filename=(StringLiteral|Identifier|OBJECT)? SUPER_ACCESSOR  // object is fluff only (SyntaxObjectSupperAccessor)
    | validIdFilename=validIdentifiers SUPER_ACCESSOR
    ;

globalModifierStatement
    : (
        PRIVATE
        | PROTECTED
        | PUBLIC
      ) COLON
    ;

declaration
    : functionHeaderDeclaration
    | functionDeclaration
    | structDeclaration
    | variableDeclarationStatement
    ;

functionModifier
    : DEPRECATED
    | STATIC
    | PRIVATE
    | PROTECTED
    | PUBLIC
    | NOSHADOW     
    | NOMASK
    | VARARGS
    | VISIBLE
    ;

functionHeader
    : functionModifier* typeSpecifier? functionName=validIdentifiers PAREN_OPEN functionArgs=parameterList[true]? PAREN_CLOSE
    ;

functionHeaderDeclaration
    : functionHeader SEMI
    ;    

functionDeclaration
    : functionHeader block
    ;

parameterList[boolean _isHeader]
    : VOID 
    | parameter[_isHeader] (COMMA parameter[_isHeader])*    
    ;

parameter[boolean _isHeader]
    : {$_isHeader==false}? VARARGS? 
        paramType=unionableTypeSpecifier? 
        paramName=validIdentifiers 
        (
              ASSIGN expression 
            | { this.isFluff() }? COLON inlineClosureExpression
            | TRIPPLEDOT
        )? 
    | {$_isHeader && this.isFluff()}? VARARGS? paramType=unionableTypeSpecifier AND? paramName=validIdentifiers? TRIPPLEDOT? // param name is optional in fluff
    | VARARGS? paramType=unionableTypeSpecifier? AND? paramName=validIdentifiers    
    ;

structMemberDeclaration
    : unionableTypeSpecifier Identifier (COMMA Identifier)* SEMI
    ;

structMemberInitializer
    : Identifier COLON expression
    | expression
    ;

variableModifier
    : STATIC
    | DEPRECATED
    | PRIVATE
    | PROTECTED
    | PUBLIC
    | NOSHADOW
    | NOMASK
    | NOSAVE
    ;

structModifier
    : PRIVATE
    ;

// struct decl needs to be above variable decl
structDeclaration
    : ({this.isFluff()}? structModifier)? (STRUCT|CLASS) structName=Identifier (PAREN_OPEN structInherits=Identifier PAREN_CLOSE)? 
        CURLY_OPEN structMemberDeclaration* CURLY_CLOSE 
        SEMI?
    ;

variableDeclarationStatement
    : variableDeclaration SEMI
    ;

variableDeclaration    
    : variableModifier* type=unionableTypeSpecifier? objectName=StringLiteral? variableDeclaratorExpression (COMMA variableDeclaratorExpression)*
    ;

variableDeclaratorExpression
    : variableDeclarator (ASSIGN variableInitializer)?
    ;

variableDeclarator
    : arraySpecifier=STAR* variableName=validIdentifiers
    ;

variableInitializer
    : arrayExpression
    | mappingExpression        
    | expression
    ;

primitiveTypeSpecifier
    : VOID
    | BYTES
    | BUFFER // Fluff-only
    | CHAR
    | COROUTINE // LD-only
    | INT   
    | FLOAT     
    | FUNCTION // Fluff-only
    | LPCTYPE // LD-only
    | QUOTEDARRAY // LD-only
    | STRING    
    | OBJECT
    | MAPPING
    | MIXED
    | STATUS
    | CLOSURE
    | SYMBOL        
    | LWOBJECT
    | UNKNOWN 
    ;

methodInvocation
    : PAREN_OPEN argumentList? PAREN_CLOSE
    ;

structTypeSpecifier
    : (STRUCT|CLASS) Identifier
    ;

typeSpecifier
    : unionableTypeSpecifier    
    ;

unionableTypeSpecifier
    : 
    ( 
      (
        (
        primitiveTypeSpecifier
        | LT typeSpecifier GT 
        | structTypeSpecifier         
        ) 
        REF?
        STAR*
      ) 
      | STAR+ // typeless array
    ) (OR unionableTypeSpecifier)*
    ;

// Arrays & Mappings

arrayExpression
    : PAREN_OPEN CURLY_OPEN (expression TRIPPLEDOT? (COMMA expression TRIPPLEDOT?)*)? COMMA? CURLY_CLOSE PAREN_CLOSE
    ;

mappingContent
    : mappingKey=expression (COLON expression (SEMI expression)*)?
    ;

mappingExpression
    : MAPPING_OPEN (mappingContent (COMMA mappingContent)*) COMMA? SQUARE_CLOSE PAREN_CLOSE    #mappingValueInitializer
    | MAPPING_OPEN COLON expression SQUARE_CLOSE PAREN_CLOSE                                   #mappingKeylessInitializer
    | MAPPING_OPEN SQUARE_CLOSE PAREN_CLOSE                                                    #mappingEmptyInitializer
    ;


// Expressions:

/** The default expression - comma expressions are not allowed here */
expression
    : conditionalExpression[3] // skip comma
    ;

/** For instances where comma expressions are allowed */
commaableExpression
    : inlineClosureExpression
    | conditionalExpression[4] (op=COMMA conditionalExpression[4])*
    ;

assignmentOperator
    : ASSIGN
    | ADD_ASSIGN
    | SUB_ASSIGN
    | MUL_ASSIGN
    | DIV_ASSIGN
    | MOD_ASSIGN
    | AND_ASSIGN
    | OR_ASSIGN
    | BITAND_ASSIGN
    | BITOR_ASSIGN
    | XOR_ASSIGN
    | SHL_ASSIGN
    | RSH_ASSIGN
    ;

conditionalExpression[int _p]
    : 
    (
        ({ 16 >= $_p }? op=(PLUS|MINUS|DOUBLEBANG|NOT|BNOT|INC|DEC|AND|STAR))?
        (
        castExpression 
        | primaryExpression 
        | lambdaExpression 
        | inlineClosureExpression               
        )
    )
    (     
      { 15 >= $_p }? op=(STAR|DIV|MOD) conditionalExpression[16]
    | { 14 >= $_p }? op=(PLUS|MINUS) conditionalExpression[15]
    | { 13 >= $_p }? op=(SHL|SHR) conditionalExpression[14]
    | { 12 >= $_p }? cond=(LT|GT|LE|GE) conditionalExpression[13]
    | { 11 >= $_p }? cond=(EQ|NE|IN) conditionalExpression[12]
    | { 10 >= $_p }? op=AND conditionalExpression[11]
    | { 9  >= $_p }? op=XOR conditionalExpression[10]
    | { 8  >= $_p }? op=OR conditionalExpression[9]
    | { 7  >= $_p }? cond=AND_AND conditionalExpression[8]
    | { 6  >= $_p }? cond=OR_OR conditionalExpression[7]
    | { 5  >= $_p }? ternOp=QUESTION conditionalExpression[4] ternOp2=COLON conditionalExpression[4]
    | { 4  >= $_p }? assignOp=assignmentOperator conditionalExpression[5]        
    //| { 2  >= $_p }? op=COMMA conditionalExpression[4]
    )*
    ;    
// rightShiftAssignment
//     : first = '>' second = '>=' {$first.index + 1 == $second.index}? // make sure there is nothing between the tokens
//     ;

// the c-style comma operator. yuk
// commaExpression
//     : assignmentOrConditionalExpression (op=COMMA assignmentOrConditionalExpression)*
//     ;
    
// assignmentOrConditionalExpression
//     : conditionalTernaryExpression (op=assignmentOperator conditionalTernaryExpression)*
//     ;

// conditionalTernaryExpression
//     : conditionalOrExpression (op=QUESTION expression COLON expression)?
//     ;

// conditionalOrExpression
//     : conditionalAndExpression (op=OR_OR conditionalAndExpression)*
//     ;

// conditionalAndExpression
//     : inclusiveOrExpression (op=AND_AND inclusiveOrExpression)*
//     ;

// inclusiveOrExpression
//     : exclusiveOrExpression (op=OR exclusiveOrExpression)*
//     ;

// exclusiveOrExpression
//     : andExpression (op=XOR andExpression)*
//     ;

// andExpression
//     : equalityExpression (op=AND equalityExpression)*
//     ;

// equalityExpression
//     : relationalExpression (op=(EQ | NE | IN) relationalExpression)*
//     ;

// relationalExpression
//     : shiftExpression (op=(LT | GT | LE | GE) shiftExpression)*
//     ;

// shiftExpression
//     : additiveExpression (op=(SHL | SHR) additiveExpression)*
//     ;

// additiveExpression
//     : multiplicativeExpression (op=(PLUS | MINUS) multiplicativeExpression)*
//     ;

// multiplicativeExpression
//     : unaryExpression (op=(STAR | DIV | MOD) unaryExpression)*
//     ;


    
// rangeExpression
//     : unaryExpression
//     | unaryExpression? DOUBLEDOT unaryExpression?
//     ;

// unaryExpression
//     : castExpression
//     | primaryExpression    
//     | lambdaExpression
//     | inlineClosureExpression
//     | (PLUS|MINUS|NOT|BNOT|INC|DEC|AND|STAR) conditionalExpression[0]    
//     ;

primaryExpression
    : super=inheritSuperExpression? pe = primaryExpressionStart 
    bracketExpression* 
    (
        (
            methodInvocation 
            | INC 
            | DEC 
            | (ARROW target=callOtherTarget? invocation=methodInvocation)  // arrow fn
            | ((DOT|ARROW) structMember=Identifier) // struct member access
            | Identifier
        ) 
        bracketExpression*
    )*
    ;

primaryExpressionStart
    : literal                               # literalExpression
    //| inheritSuperExpression                # inheritExpression    
    | StringLiteral StringLiteral*          # stringConcatExpression        
    | validIdentifiers                      # identifierExpression    
    | (    
        { this.isFluff() }? (PAREN_OPEN CLASS structName=Identifier (COMMA structMemberInitializer)* PAREN_CLOSE) // Fluff
        |    
        { this.isLD() }? (PAREN_OPEN structName=BracketedIdentifier (structMemberInitializer (COMMA structMemberInitializer)*)? COMMA? PAREN_CLOSE) // LD
      ) # structInitializerExpression            
    | PAREN_OPEN (commaableExpression | variableDeclaration) PAREN_CLOSE # parenExpression
    | arrayExpression                       # primaryArrayExpression
    | mappingExpression                     # primaryMappingExpression    
    | catchExpr                             # catchExpression    
    ;

// list of keywords that are not reserved keywords and thus can be used as identifiers
validIdentifiers
    : Identifier            
    | BYTES
    | BUFFER
    | FUNCTIONS
    | VARIABLES
    | VISIBLE
    | STRUCTS
    | SYMBOL
    | IN
    | CHAR    
    ;

catchExpr
    : CATCH PAREN_OPEN expression (COMMA expression)* (SEMI Identifier)* PAREN_CLOSE // LD
    | CATCH block        // Fluff
    ;

inlineClosureExpression
    : {this.isFluff()}? PAREN_OPEN COLON expression (COMMA expression)* COLON PAREN_CLOSE // Fluff-only function pointer
    | PAREN_OPEN COLON (expression|statement*) COLON PAREN_CLOSE
    | FUNCTION typeSpecifier? PAREN_OPEN parameterList[false]? PAREN_CLOSE block
    ;

bracketExpression
    // i don't love using expression here - because its not really a comma operator, but this is needed to get it to parse
    : SQUARE_OPEN LT? expression (COMMA expression)? SQUARE_CLOSE
    | SQUARE_OPEN LT? expression? DOUBLEDOT LT? expression? SQUARE_CLOSE        
    ;

lambdaArrayIndexor
    : SQUARE_OPEN LT DOUBLEDOT? LT?
    | SQUARE_OPEN DOUBLEDOT LT?
    ;

lambdaExpression
    : HASH? LAMBDA_IDENTIFIER // SINGLEQUOT fn=(Identifier|CloneObject|LoadObject)
    | HASH SINGLEQUOT (
        (WHILE|RETURN) // reserved words that are specifically allowed here
        | (bracketExpression) // must come before the SQUARE_OPEN in the next rule
        | (lambdaArrayIndexor)
        | (op=(NOT | PLUS | MINUS | STAR | DIV | MOD | LT | GT | LE | GE | EQ | NE | AND | OR | XOR | AND_AND | OR_OR | ASSIGN | ADD_ASSIGN | SUB_ASSIGN | MUL_ASSIGN | DIV_ASSIGN | MOD_ASSIGN | AND_ASSIGN | OR_ASSIGN | BITAND_ASSIGN | BITOR_ASSIGN | XOR_ASSIGN | QUESTION | SHL | SHR | SQUARE_OPEN | COMMA) | QUESTION NOT)
        | (PAREN_OPEN (CURLY_OPEN|SQUARE_OPEN)) // lambda collections
        | (expression      )
    )
    ;

castExpression
    : PAREN_OPEN typeSpecifier PAREN_CLOSE conditionalExpression[16]                             #primitiveTypeCastExpression
    | PAREN_OPEN CURLY_OPEN typeSpecifier CURLY_CLOSE PAREN_CLOSE conditionalExpression[16]      #declarativeTypeCastExpression
    | PAREN_OPEN LT Identifier GT conditionalExpression[16] (COMMA conditionalExpression[16])* PAREN_CLOSE          #structCastExpression
    ;

// Statements

statement
    : block
    | SEMI
    | selectionStatement
    | iterationStatement
    | jumpStatement    
    | variableDeclarationStatement    
    | commaableExpression SEMI        
    | preprocessorDirective // this is really handled by the preprocessor, but including here for convenience in symbol nav            
    ;

block: CURLY_OPEN statement* CURLY_CLOSE;

// if and switch statements
selectionStatement
    : ifStatement
    | switchStatement
    ;

elseIfExpression
    : ELSE IF PAREN_OPEN expression PAREN_CLOSE statement
    ;

elseExpression
    : ELSE statement
    ;
    
ifExpression
    : IF PAREN_OPEN expression PAREN_CLOSE statement
    ;

ifStatement
    : ifExpression elseIfExpression* elseExpression?
    ;

// Switch, case, and default statements
switchStatement
    : SWITCH PAREN_OPEN expression PAREN_CLOSE 
        CURLY_OPEN 
        variableDeclarationStatement* // this is weird, but technically allowed
        ( caseStatement | defaultStatement )* 
        CURLY_CLOSE
    ;

caseExpression
    : expression DOUBLEDOT? expression?
    | DOUBLEDOT expression
    ;

caseStatement
    : CASE caseExpression COLON statement*
    ;
defaultStatement
    : DEFAULT COLON statement*
    ;

iterationStatement
    : WHILE PAREN_OPEN expression PAREN_CLOSE (statement|SEMI)                  #whileStatement
    | DO statement WHILE PAREN_OPEN expression PAREN_CLOSE SEMI                 #doWhileStatement
    | FOR PAREN_OPEN (forRangeExpression) PAREN_CLOSE (statement|SEMI)          #forStatement
    | FOREACH PAREN_OPEN foreachRangeExpression PAREN_CLOSE (statement|SEMI)    #forEachStatement
    ;

forRangeExpression
    : init=commaableExpression? SEMI condition=expression? SEMI incrementor=commaableExpression?
    ;

foreachRangeExpression
    : forEachVariable (COMMA forEachVariable)* (IN | COLON) expression (DOUBLEDOT expression)?
    ;

forVariable
    : primitiveTypeSpecifier? variableDeclarator (ASSIGN variableInitializer | INC | DEC)?
    | expression
    ;

forEachVariable
    : typeSpecifier? variableDeclarator
    ;

returnStatement
    : RETURN commaableExpression? SEMI
    ;

jumpStatement
    : BREAK SEMI
    | CONTINUE SEMI
    | returnStatement
    ;

callOtherTarget
    : Identifier
    | PAREN_OPEN expression PAREN_CLOSE
    | StringLiteral
    ;

literal
    : IntegerConstant
    | FloatingConstant    
    | CharacterConstant
    | HexIntConstant
    ;

argument
    : (AND|REF)? expression TRIPPLEDOT?     
    ;

// The argument after comma is reall required, but that causes parsing errors that negatively impact 
// code completion & signature help while typing.  So we will validate in the semantic analyzer
argumentList
    : argument (COMMA argument?)* // trippledot must be last
    | { this.isFluff() }? structTypeSpecifier (COMMA Identifier COLON expression)* // fluff-os new syntax
    ;


//
// LPC (LDMud) Grammar
// Copyright (c) 2023-2024, John Chmura
//
parser grammar LPCParser;

options {
    tokenVocab = LPCLexer;
}

// Entrypoint
program: (declaration | preprocessorDirective | inheritStatement)* EOF;

// Preprocessor directives - These are mostly handled by preprocessing step
preprocessorDirective
    : selectionPreprocessorDirective    
    | directiveTypeWithArguments directiveArgument
    | definePreprocessorDirective
    | includePreprocessorDirective
    | HASH directiveTypePragma Identifier (COMMA Identifier)*
    ;

includePreprocessorDirective
    : HASH directiveTypeInclude directiveIncludeFile
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
    ;

// #define
directiveDefineParam: PAREN_OPEN Identifier (COMMA Identifier)* PAREN_CLOSE;
directiveDefineArgument: expression ;

// #include <file> | #include "file"
directiveTypeInclude: INCLUDE;

directiveGlobalFile: LT Identifier (DIV | DOT | Identifier)* GT;

directiveIncludeFile
    : globalFile=directiveGlobalFile
    | localFile=StringLiteral StringLiteral*
    | defineFile=Identifier
    ;

directiveTypePragma: PRAGMA;

// inherit
inheritStatement
    : (
        inherit        
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
    : filename=(StringLiteral|Identifier)? SUPER_ACCESSOR 
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
    : functionModifier* typeSpecifier? functionName=Identifier PAREN_OPEN functionArgs=parameterList? PAREN_CLOSE
    ;

functionHeaderDeclaration
    : functionHeader SEMI
    ;    

functionDeclaration
    : functionHeader block
    ;

parameterList
    : parameter (COMMA parameter)*
    | VOID
    ;

parameter
    : VARARGS? paramType=unionableTypeSpecifier? paramName=validIdentifiers (ASSIGN expression | TRIPPLEDOT)? 
    //| paramType=STRUCT structName=Identifier STAR? paramName=validIdentifiers #structParameterExpression
    ;

structMemberDeclaration
    : unionableTypeSpecifier Identifier SEMI
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

// struct decl needs to be above variable decl
structDeclaration
    : (STRUCT|CLASS) structName=Identifier (PAREN_OPEN structInherits=Identifier PAREN_CLOSE)? CURLY_OPEN structMemberDeclaration* CURLY_CLOSE SEMI
    ;

variableDeclarationStatement
    : variableDeclaration SEMI
    ;

variableDeclaration    
    : variableModifier* type=unionableTypeSpecifier objectName=StringLiteral? variableDeclaratorExpression? (COMMA variableDeclaratorExpression)*
    ;

variableDeclaratorExpression
    : variableDeclarator (ASSIGN variableInitializer)?
    ;

variableDeclarator
    : arraySpecifier=STAR? variableName=validIdentifiers
    ;

variableInitializer
    : expression
    | arrayExpression
    | mappingExpression        
    ;

primitiveTypeSpecifier
    : VOID
    | BYTES
    | CHAR
    | INT   
    | FLOAT     
    | STRING    
    | OBJECT
    | MAPPING
    | MIXED
    | STATUS
    | CLOSURE
    | SYMBOL        
    | LWOBJECT
    ;

methodInvocation
    : PAREN_OPEN argumentList? PAREN_CLOSE
    ;

structTypeSpecifier
    : (STRUCT|CLASS) Identifier STAR?
    ;

typeSpecifier
    : unionableTypeSpecifier    
    ;

unionableTypeSpecifier
    : primitiveTypeSpecifier STAR? (OR unionableTypeSpecifier)*
    | LT typeSpecifier GT STAR* (OR unionableTypeSpecifier)*    
    | structTypeSpecifier (OR unionableTypeSpecifier)*
    ;

// Arrays & Mappings

arrayExpression
    : PAREN_OPEN CURLY_OPEN (expression (COMMA expression)*)? COMMA? CURLY_CLOSE PAREN_CLOSE
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
    : conditionalExpression[4] // skip comma
    ;

/** For instances where comma expressions are allowed */
commaableExpression
    : inlineClosureExpression
    | conditionalExpression[0]
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
    : (castExpression | primaryExpression | lambdaExpression | inlineClosureExpression | op=(PLUS|MINUS|NOT|BNOT|INC|DEC|AND|STAR) conditionalExpression[{$_p}])
    ( 
    //  { 18 >= $_p }? arrow=(ARROW|DOT) arrowTarget=validIdentifiers methodInvocation conditionalExpression[19]
    // | { 17 >= $_p }? SQUARE_OPEN bracketIndex1=conditionalExpression[0]? DOUBLEDOT bracketIndex2=conditionalExpression[0]? SQUARE_CLOSE conditionalExpression[18]
    // | { 16 >= $_p }? SQUARE_OPEN bracketIndex=conditionalExpression[0] SQUARE_CLOSE conditionalExpression[17]
      { 15 >= $_p }? op=(STAR|DIV|MOD) conditionalExpression[16]
    | { 14 >= $_p }? op=(PLUS|MINUS) conditionalExpression[15]
    | { 13 >= $_p }? op=(SHL|SHR) conditionalExpression[14]
    | { 12 >= $_p }? cond=(LT|GT|LE|GE) conditionalExpression[13]
    | { 11 >= $_p }? cond=(EQ|NE|IN) conditionalExpression[12]
    | { 10 >= $_p }? op=AND conditionalExpression[11]
    | { 9 >= $_p }? op=XOR conditionalExpression[10]
    | { 8 >= $_p }? op=OR conditionalExpression[9]
    | { 7 >= $_p }? cond=AND_AND conditionalExpression[8]
    | { 6 >= $_p }? cond=OR_OR conditionalExpression[7]
    | { 5 >= $_p }? ternOp=QUESTION conditionalExpression[5] ternOp2=COLON conditionalExpression[5]
    | { 4 >= $_p }? assignOp=assignmentOperator conditionalExpression[5]    
    | { 2 >= $_p }? op=COMMA conditionalExpression[4]
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
    | (CloneObject|LoadObject) PAREN_OPEN (ob=expression) PAREN_CLOSE   # cloneObjectExpression 
    | validIdentifiers                            # identifierExpression    
    | PAREN_OPEN LT structName=Identifier GT (structMemberInitializer (COMMA structMemberInitializer)*)? COMMA? PAREN_CLOSE # structInitializerExpression    
    | PAREN_OPEN commaableExpression PAREN_CLOSE # parenExpression
    | arrayExpression                       # primaryArrayExpression
    | mappingExpression                     # primaryMappingExpression    
    | catchExpr                             # catchExpression    
    ;


// list of keywords that are not reserved keywords and thus can be used as identifiers
validIdentifiers
    : Identifier            
    | BYTES
    | FUNCTIONS
    | VARIABLES
    | STRUCTS
    | IN
    | CHAR    
    ;

catchExpr
    : CATCH '(' expression (',' expression)* (';' Identifier)* ')'
    ;

inlineClosureExpression
    : PAREN_OPEN COLON (expression|statement*) COLON PAREN_CLOSE
    | FUNCTION typeSpecifier? PAREN_OPEN parameterList? PAREN_CLOSE block
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

expressionList
    : expression (COMMA expression)*
    ;


// Statements

statement
    : block
    | SEMI
    | selectionStatement
    | iterationStatement
    | jumpStatement    
    | variableDeclarationStatement    
    | includePreprocessorDirective // this is really handled by the preprocessor, but including here for convenience in symbol nav    
    | commaableExpression SEMI        
    | definePreprocessorDirective // this is really handled by the preprocessor, but including here for convenience in symbol nav    
    //| preprocessorDirective
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
    : SWITCH PAREN_OPEN expression PAREN_CLOSE CURLY_OPEN (caseStatement | defaultStatement)* CURLY_CLOSE
    ;

caseExpression
    : caseCondition (caseOperators caseCondition)* (DOUBLEDOT caseCondition (caseOperators caseCondition)*)?
    ;

caseOperators
    : PLUS | MINUS | STAR | DIV 
    ;

caseCondition
    : MINUS? (StringLiteral|IntegerConstant|HexIntConstant|Identifier|CharacterConstant)
    | PAREN_OPEN conditionalExpression[13]  PAREN_CLOSE // NTBLA see if we can use tokens instead of expression here
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
    | FOR PAREN_OPEN (forRangeExpression) PAREN_CLOSE (statement|SEMI)            #forStatement
    | FOREACH PAREN_OPEN foreachRangeExpression PAREN_CLOSE (statement|SEMI)    #forEachStatement
    ;

forRangeExpression
    : (forVariable (COMMA forVariable)*)? SEMI expression? SEMI expression? (COMMA expression)*
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
    : AND? expression
    ;

// The argument after comma is reall required, but that causes parsing errors that negatively impact 
// code completion & signature help while typing.  So we will validate in the semantic analyzer
argumentList
    : argument (COMMA argument?)* TRIPPLEDOT? // trippledot must be last
    ;


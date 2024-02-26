//
// LPC (LDMud) Grammar
// Copyright (c) 2023-2024, John Chmura
//
parser grammar LPCParser;

options {
    tokenVocab = LPCLexer;
}

program: (declaration | preprocessorDirective | inheritStatement)* EOF;

preprocessorDirective
    : selectionDirective
    | HASH directiveTypeWithArguments directiveArgument
    | definePreprocessorDirective
    | HASH directiveTypeInclude directiveIncludeFile
    | HASH directiveTypePragma Identifier (COMMA Identifier)*
    ;


definePreprocessorDirective
    : DEFINE END_DEFINE
    ;


selectionDirective
    : HASH selectionDirectiveTypeWithArg NOT? directiveArgument
    | HASH selectionDirectiveTypeSingle
    ;

selectionDirectiveTypeSingle
    : ELSE
    | ENDIF
    ;

selectionDirectiveTypeWithArg
    : IF
    | IFDEF
    | IFNDEF
    | ELIF
    ;


directiveTypeWithArguments
    : UNDEF
    | ECHO
    | LINE
    ;

directiveArgument
    : Identifier
    | StringLiteral
    | IntegerConstant
    ;

// #define
directiveDefineParam: PAREN_OPEN Identifier (COMMA Identifier)* PAREN_CLOSE;
directiveDefineArgument: expression ;

// #include <file> | #include "file"
directiveTypeInclude: INCLUDE;

directiveIncludeFile
    : directiveIncludeFileGlobal    #includeGlobalFile
    | directiveIncludeFileLocal     #includeLocalFile
    | Identifier                    #includeDefine
    ;
directiveIncludeFilename: Identifier (DOT Identifier)?;
directiveIncludeFileGlobal: LT directiveIncludeFilename GT;
directiveIncludeFileLocal: StringLiteral;

directiveTypePragma: PRAGMA;

// inherit
inheritStatement
    : INHERIT inheritTarget=(StringLiteral | Identifier) SEMI
    ;

inheritSuperExpression
    : SUPER_ACCESSOR expression
    | StringLiteral SUPER_ACCESSOR expression
    ;

declaration
    : functionHeaderDeclaration
    | functionDeclaration
    | structDeclaration
    | variableDeclaration
    ;

functionModifier
    : STATIC
    | PRIVATE
    | PROTECTED
    | PUBLIC
    | NOSHADOW 
    | NOMASK
    | VARARGS
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
    ;

parameter
    : paramType=typeSpecifier? paramName=Identifier #primitiveTypeParameterExpression    
    | paramType=STRUCT structName=Identifier paramName=Identifier #structParameterExpression
    ;

structDeclaration
    : STRUCT structName=Identifier CURLY_OPEN structMembers=structMemberDeclaration* CURLY_CLOSE SEMI
    ;

structMemberDeclaration
    : typeSpecifier Identifier SEMI
    ;

arrayExpression
    : ARRAY_OPEN (expression (COMMA expression)*)? COMMA? ARRAY_CLOSE
    ;

mappingContent
    : mappingKey=expression (COLON expression (SEMI expression)*)?
    ;

mappingExpression
    : MAPPING_OPEN (mappingContent (COMMA mappingContent)*)? COMMA? SQUARE_CLOSE PAREN_CLOSE    #mappingValueInitializer
    | MAPPING_OPEN COLON expression SQUARE_CLOSE PAREN_CLOSE                                    #mappingEmptyInitializer
    ;

variableModifier
    : STATIC
    | PRIVATE
    | PROTECTED
    | PUBLIC
    | NOSHADOW
    ;

variableDeclaration
    : variableModifier* primitiveTypeSpecifier? variableDeclarator (COMMA variableDeclarator)* SEMI #primitiveTypeVariableDeclaration
    | variableModifier* STRUCT structName=Identifier variableDeclarator (COMMA structName=Identifier variableDeclarator)* SEMI #structVariableDeclaration
    ;

variableDeclarator
    : arraySpecifier=STAR? Identifier (ASSIGN variableInitializer)?
    ;

variableInitializer
    : expression
    | arrayExpression
    | mappingExpression
    ;

primitiveTypeSpecifier
    : VOID
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
    | UNKNOWN
    ;

indexerArgument
    : expression
    | expression DOUBLEDOT expression
    ;

methodInvocation
    : PAREN_OPEN argumentList? PAREN_CLOSE
    ;

arrayTypeSpecifier
    : primitiveTypeSpecifier? STAR
    ;

typeSpecifier
    : primitiveTypeSpecifier
    | arrayTypeSpecifier    
    ;

inlineClosureExpression
    : PAREN_OPEN COLON (expression|statement*) COLON PAREN_CLOSE
    ;

statement
    : expressionStatement
    | block
    | selectionStatement
    | iterationStatement
    | jumpStatement
    | variableDeclaration
    | selectionDirective
    | returnStatement
    //| preprocessorDirective
    ;

expressionStatement: expression SEMI;

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
    : (StringLiteral|MINUS? IntegerConstant|Identifier)
    | (StringLiteral|MINUS? IntegerConstant|Identifier) DOUBLEDOT (StringLiteral|MINUS? IntegerConstant|Identifier)
    ;
caseStatement
    : CASE caseExpression COLON statement*
    ;
defaultStatement
    : DEFAULT COLON statement*
    ;

iterationStatement
    : WHILE PAREN_OPEN expression PAREN_CLOSE (statement|SEMI)
    | DO statement WHILE PAREN_OPEN expression PAREN_CLOSE SEMI
    | FOR PAREN_OPEN expression? (COMMA expression)* SEMI expression? SEMI expression? (COMMA expression)* PAREN_CLOSE (statement|SEMI)
    | FOREACH PAREN_OPEN typeSpecifier Identifier (IN | COLON) expression PAREN_CLOSE (statement|SEMI)
    ;

returnStatement
    : RETURN expression? SEMI
    ;

jumpStatement
    : BREAK SEMI
    | CONTINUE SEMI
    | returnStatement
    ;

callOtherTarget
    : Identifier
    | PAREN_OPEN Identifier PAREN_CLOSE
    | StringLiteral
    ;

lambdaExpression
    : SINGLEQUOT Identifier
    | HASH SINGLEQUOT expression
    | HASH SINGLEQUOT PLUS
    | HASH SINGLEQUOT MINUS
    | HASH SINGLEQUOT STAR
    | HASH SINGLEQUOT DIV
    | HASH SINGLEQUOT MOD
    | HASH SINGLEQUOT LT
    | HASH SINGLEQUOT GT
    | HASH SINGLEQUOT LE
    | HASH SINGLEQUOT GE
    | HASH SINGLEQUOT EQ
    | HASH SINGLEQUOT NE
    | HASH SINGLEQUOT AND
    | HASH SINGLEQUOT OR
    | HASH SINGLEQUOT XOR
    | HASH SINGLEQUOT AND_AND
    | HASH SINGLEQUOT OR_OR
    | HASH SINGLEQUOT ADD_ASSIGN
    | HASH SINGLEQUOT SUB_ASSIGN
    | HASH SINGLEQUOT MUL_ASSIGN
    | HASH SINGLEQUOT DIV_ASSIGN
    | HASH SINGLEQUOT MOD_ASSIGN
    | HASH SINGLEQUOT AND_ASSIGN
    | HASH SINGLEQUOT OR_ASSIGN
    | HASH SINGLEQUOT XOR_ASSIGN
    | HASH SINGLEQUOT QUESTION
    | HASH SINGLEQUOT SHL
    | HASH SINGLEQUOT SHR
    ;

rightShiftAssignment
    : first = '>' second = '>=' {$first.index + 1 == $second.index}? // make sure there is nothing between the tokens
    ;

literal
    : IntegerConstant
    | FloatingConstant
    | StringLiteral
    | CharacterConstant
    | HexIntConstant
    ;

castExpression
    : PAREN_OPEN typeSpecifier PAREN_CLOSE expression                        #primitiveTypeCastExpression
    | PAREN_OPEN LT Identifier GT expression (COMMA expression)* PAREN_CLOSE #structCastExpression
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
    | XOR_ASSIGN
    | SHL_ASSIGN
    ;


// JC - I original had these broken out into separate expressions, like the C# grammar
// but I don't see why that is necesary.  It seems to just add extra nodes to the tree
// that don't provide any benefit over labelled alternatives.
// the individual expressions are commented out below in case they're needed in the future
conditionalExpressionBase
    : unaryExpression           #tempUnaryExpression
    | conditionalExpressionBase (QUESTION expression COLON expression) #conditionalExpression
    | conditionalExpressionBase (OR_OR conditionalExpressionBase)+ #conditionalOrExpression
    | conditionalExpressionBase (AND_AND conditionalExpressionBase)+ #conditionalAndExpression
    | conditionalExpressionBase (OR conditionalExpressionBase)+ #inclusiveOrExpression
    | conditionalExpressionBase (XOR conditionalExpressionBase)+ #exclusiveOrExpression
    | conditionalExpressionBase (AND conditionalExpressionBase)+ #andExpression
    | conditionalExpressionBase ((EQ | NE) conditionalExpressionBase)+ #equalityExpression
    | conditionalExpressionBase ((LT | GT | LE | GE) conditionalExpressionBase)+ #relationalExpresion
    | conditionalExpressionBase ((SHL | SHR) conditionalExpressionBase)+ #shiftExpression
    | conditionalExpressionBase ((PLUS | MINUS) conditionalExpressionBase)+ #additiveExpression
    | conditionalExpressionBase ((STAR | DIV | MOD) conditionalExpressionBase)+ #multiplicativeExpression
    | unaryExpression? DOUBLEDOT unaryExpression? #rangeExpression
    ;    

// conditionalExpression
//     : conditionalOrExpression (QUESTION expression COLON expression)?
//     ;

// conditionalOrExpression
//     : conditionalAndExpression (OR_OR conditionalAndExpression)*
//     ;

// conditionalAndExpression
//     : inclusiveOrExpression (AND_AND inclusiveOrExpression)*
//     ;

// inclusiveOrExpression
//     : exclusiveOrExpression (OR exclusiveOrExpression)*
//     ;

// exclusiveOrExpression
//     : andExpression (XOR andExpression)*
//     ;

// andExpression
//     : equalityExpression (AND equalityExpression)*
//     ;

// equalityExpression
//     : relationalExpression ((EQ | NE) relationalExpression)*
//     ;


// relationalExpresion
//     : shiftExpression ((LT | GT | LE | GE) shiftExpression)*
//     ;

// shiftExpression
//     : additiveExpression ((SHL | SHR) additiveExpression)*
//     ;

// additiveExpression
//     : multiplicativeExpression ((PLUS | MINUS) multiplicativeExpression)*
//     ;

// multiplicativeExpression
//     : rangeExpression ((STAR | DIV | MOD) rangeExpression)*    
//     ;

// rangeExpression
//     : unaryExpression
//     | unaryExpression? DOUBLEDOT unaryExpression?
//     ;

unaryExpression
    : castExpression
    | primaryExpression
    | PLUS expression
    | MINUS expression
    | NOT expression
    | BNOT expression  
    | INC expression
    | DEC expression
    | AND expression
    | STAR expression     
    ;

primaryExpression
    : pe = primaryExpressionStart bracketExpression* (
        (methodInvocation | INC | DEC | ARROW Identifier | Identifier) bracketExpression*
    )*
    ;

primaryExpressionStart
    : literal                               # literalExpression
    | Identifier                            # identifierExpression    
    | PAREN_OPEN expression PAREN_CLOSE     # parenExpression
    //| inlineClosureExpression               # primaryInlineClosureExpression
    | typeSpecifier                         # memberAccessExpression
    //| lambdaExpression                      # primaryLambdaExpression
    //| callOtherOb=expression ARROW callOtherTarget PAREN_OPEN expressionList? PAREN_CLOSE # callOtherExpression
    //| inheritSuperExpression                # primaryInheritSuperExpression
    | arrayExpression                       # primaryArrayExpression
    | mappingExpression                     # primaryMappingExpression
    | StringLiteral StringLiteral*          # stringConcatExpression        
    ;

// memberAccess
//     : ARROW Identifier

expression
    : assignmentExpression
    | nonAssignmentExpression
    ;

// expression
//     : Identifier
//     | nonAssignmentExpression
//     | castExpression
//     | MINUS? IntegerConstant
//     | MINUS? FloatingConstant
//     | literal
//     | StringLiteral StringLiteral*  // handle implicit string concatenation    
//     | PAREN_OPEN expression PAREN_CLOSE    
//     | expression unaryExpression
//     //| unaryExpression
//     // | expression PLUS expression
//     // | expression MINUS expression
//     //| expression STAR expression
//     // | expression DIV expression
//     // | expression MOD expression
//     // | expression LT expression
//     // | expression GT expression
//     // | expression LE expression
//     // | expression GE expression
//     // | expression EQ expression
//     // | expression NE expression
//     //| expression AND expression
//     // | expression OR expression
//     // | expression XOR expression
//     // | expression AND_AND expression
//     // | expression OR_OR expression
//     // | expression ADD_ASSIGN expression
//     // | expression SUB_ASSIGN expression
//     // | expression MUL_ASSIGN expression
//     // | expression DIV_ASSIGN expression
//     // | expression MOD_ASSIGN expression
//     // | expression AND_ASSIGN expression
//     // | expression OR_ASSIGN expression
//     // | expression XOR_ASSIGN expression    
//     // | expression SHL expression
//     // | expression SHR expression
//     //| expression QUESTION expression COLON expression    
//     // | NOT expression
//     // | INC expression
//     // | DEC expression
//     // | MINUS expression
//     | expression INC
//     | expression DEC
//     | expression assignmentExpression
//     | expression bracketExpression
//     | Identifier PAREN_OPEN argumentList? PAREN_CLOSE  // function call
//     | mappingExpression
//     | arrayExpression    
//     | callOtherOb=expression ARROW callOtherTarget PAREN_OPEN expressionList? PAREN_CLOSE
//     ;

bracketExpression
    : SQUARE_OPEN LT? expression SQUARE_CLOSE
    | SQUARE_OPEN LT? expression? DOUBLEDOT LT? expression? SQUARE_CLOSE    
    | SQUARE_OPEN expression? (COMMA expression)* SQUARE_CLOSE
    ;


argument
    : AND? expression
    ;

argumentList
    : argument (COMMA argument)*
    ;

expressionList
    : expression (COMMA expression)*
    ;

assignmentExpression
    : conditionalExpressionBase assignmentOperator expression
    ;

nonAssignmentExpression
    : inlineClosureExpression
    | lambdaExpression
    | inheritSuperExpression
    | conditionalExpressionBase
    ;
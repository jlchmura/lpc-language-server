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
    | directiveTypeWithArguments directiveArgument
    | definePreprocessorDirective
    | includeDirective
    | HASH directiveTypePragma Identifier (COMMA Identifier)*
    ;

includeDirective
    : HASH directiveTypeInclude directiveIncludeFile
    ;


definePreprocessorDirective
    : DEFINE END_DEFINE
    ;


selectionDirective
    : HASH selectionDirectiveTypeWithArg NOT? directiveArgument
    | HASH (IF|ELIF) directiveIfTestExpression
    | HASH selectionDirectiveTypeSingle
    ;

selectionDirectiveTypeSingle
    : ELSE
    | ENDIF
    ;

selectionDirectiveTypeWithArg
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
    | nonAssignmentExpression
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
    : directiveIncludeFileGlobal    //includeGlobalFile
    | directiveIncludeFileLocal     //includeLocalFile
    | Identifier                    //includeDefine
    ;
directiveIncludeFilename: Identifier (DOT Identifier)?;
directiveIncludeFileGlobal: LT directiveIncludeFilename GT;
directiveIncludeFileLocal: StringLiteral;

directiveTypePragma: PRAGMA;

// inherit
inheritStatement
    : INHERIT inheritTarget=(StringLiteral | Identifier) SEMI
    ;

inheritSuperStatement
    : inheritSuperExpression SEMI
    ;

inheritSuperExpression
    : EFUNACCESSOR expression
    | filename=StringLiteral? COLON COLON expression
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
    : VARARGS? paramType=typeSpecifier? paramName=Identifier #primitiveTypeParameterExpression    
    | paramType=STRUCT structName=Identifier paramName=Identifier #structParameterExpression
    ;

structDeclaration
    : STRUCT structName=Identifier CURLY_OPEN structMembers=structMemberDeclaration* CURLY_CLOSE SEMI
    ;

structMemberDeclaration
    : typeSpecifier Identifier SEMI
    ;

arrayExpression
    : PAREN_OPEN CURLY_OPEN (expression (COMMA expression)*)? COMMA? CURLY_CLOSE PAREN_CLOSE
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
    | NOSAVE
    ;

variableDeclaration
    : variableModifier* primitiveTypeSpecifier? objectName=StringLiteral? variableDeclaratorExpression (COMMA variableDeclaratorExpression)* SEMI #primitiveTypeVariableDeclaration
    | variableModifier* STRUCT structName=Identifier variableDeclaratorExpression (COMMA structName=Identifier variableDeclaratorExpression)* SEMI #structVariableDeclaration
    ;

variableDeclaratorExpression
    : variableDeclarator (ASSIGN variableInitializer)?
    ;

variableDeclarator
    : arraySpecifier=STAR? variableName=Identifier
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
    | SEMI
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
    : IF PAREN_OPEN expression PAREN_CLOSE (statement | SEMI)
    ;

ifStatement
    : ifExpression elseIfExpression* elseExpression?
    ;

// Switch, case, and default statements
switchStatement
    : SWITCH PAREN_OPEN expression PAREN_CLOSE CURLY_OPEN (caseStatement | defaultStatement)* CURLY_CLOSE
    ;

caseExpression
    : caseCondition (DOUBLEDOT caseCondition)?
    ;

caseCondition: (StringLiteral|MINUS? IntegerConstant|Identifier|CharacterConstant);

caseStatement
    : CASE caseExpression COLON statement*
    ;
defaultStatement
    : DEFAULT COLON statement*
    ;

iterationStatement
    : WHILE PAREN_OPEN expression PAREN_CLOSE (statement|SEMI)                  #whileStatement
    | DO statement WHILE PAREN_OPEN expression PAREN_CLOSE SEMI                 #doWhileStatement
    | FOR PAREN_OPEN forRangeExpression PAREN_CLOSE (statement|SEMI)            #forStatement
    | FOREACH PAREN_OPEN foreachRangeExpression PAREN_CLOSE (statement|SEMI)    #forEachStatement
    ;

forRangeExpression
    : forVariable (COMMA forVariable)* SEMI expression? SEMI expression? (COMMA expression)*
    ;

foreachRangeExpression
    : forEachVariable (COMMA forEachVariable)* (IN | COLON) expression
    ;

forVariable
    : primitiveTypeSpecifier? arraySpecifier=STAR? variableName=Identifier (ASSIGN variableInitializer | INC | DEC) 
    ;

forEachVariable
    : primitiveTypeSpecifier? variableDeclarator
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
    | PAREN_OPEN expression PAREN_CLOSE
    | StringLiteral
    ;

lambdaExpression
    : HASH? SINGLEQUOT Identifier
    | HASH SINGLEQUOT (expression | NOT | PLUS | MINUS | STAR | DIV | MOD | LT | GT | LE | GE | EQ | NE | AND | OR | XOR | AND_AND | OR_OR | ADD_ASSIGN | SUB_ASSIGN | MUL_ASSIGN | DIV_ASSIGN | MOD_ASSIGN | AND_ASSIGN | OR_ASSIGN | BITAND_ASSIGN | BITOR_ASSIGN | XOR_ASSIGN | QUESTION | SHL | SHR | SQUARE_OPEN)
    // | HASH SINGLEQUOT expression
    // | HASH SINGLEQUOT NOT
    // | HASH SINGLEQUOT PLUS
    // | HASH SINGLEQUOT MINUS
    // | HASH SINGLEQUOT STAR
    // | HASH SINGLEQUOT DIV
    // | HASH SINGLEQUOT MOD
    // | HASH SINGLEQUOT LT
    // | HASH SINGLEQUOT GT
    // | HASH SINGLEQUOT LE
    // | HASH SINGLEQUOT GE
    // | HASH SINGLEQUOT EQ
    // | HASH SINGLEQUOT NE
    // | HASH SINGLEQUOT AND
    // | HASH SINGLEQUOT OR
    // | HASH SINGLEQUOT XOR
    // | HASH SINGLEQUOT AND_AND
    // | HASH SINGLEQUOT OR_OR
    // | HASH SINGLEQUOT ADD_ASSIGN
    // | HASH SINGLEQUOT SUB_ASSIGN
    // | HASH SINGLEQUOT MUL_ASSIGN
    // | HASH SINGLEQUOT DIV_ASSIGN
    // | HASH SINGLEQUOT MOD_ASSIGN    
    // | HASH SINGLEQUOT AND_ASSIGN
    // | HASH SINGLEQUOT OR_ASSIGN
    // | HASH SINGLEQUOT BITAND_ASSIGN
    // | HASH SINGLEQUOT BITOR_ASSIGN
    // | HASH SINGLEQUOT XOR_ASSIGN
    // | HASH SINGLEQUOT QUESTION
    // | HASH SINGLEQUOT SHL
    // | HASH SINGLEQUOT SHR
    // | HASH SINGLEQUOT SQUARE_OPEN    
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
    | PAREN_OPEN CURLY_OPEN typeSpecifier CURLY_CLOSE PAREN_CLOSE expression #declarativeTypeCastExpression
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
    | BITAND_ASSIGN
    | BITOR_ASSIGN
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
    | conditionalExpressionBase (op=OR_OR conditionalExpressionBase)+ #conditionalOrExpression
    | conditionalExpressionBase (op=AND_AND conditionalExpressionBase)+ #conditionalAndExpression
    | conditionalExpressionBase (op=OR conditionalExpressionBase)+ #inclusiveOrExpression
    | conditionalExpressionBase (op=XOR conditionalExpressionBase)+ #exclusiveOrExpression
    | conditionalExpressionBase (op=AND conditionalExpressionBase)+ #andExpression
    | conditionalExpressionBase (op=(EQ | NE) conditionalExpressionBase)+ #equalityExpression
    | conditionalExpressionBase (op=(LT | GT | LE | GE) conditionalExpressionBase)+ #relationalExpresion
    | conditionalExpressionBase (op=(SHL | SHR) conditionalExpressionBase)+ #shiftExpression
    | conditionalExpressionBase (op=(PLUS | MINUS) conditionalExpressionBase)+ #additiveExpression
    | conditionalExpressionBase (op=(STAR | DIV | MOD) conditionalExpressionBase)+ #multiplicativeExpression    
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
    | (PLUS|MINUS|NOT|BNOT|INC|DEC|AND|STAR) expression     
    ;

primaryExpression
    : pe = primaryExpressionStart bracketExpression* (
        (methodInvocation | INC | DEC | (ARROW target=callOtherTarget? invocation=methodInvocation?) | Identifier) bracketExpression*
    )*
    ;

primaryExpressionStart
    : literal                               # literalExpression
    | (CloneObject|LoadObject) PAREN_OPEN (ob=expression) PAREN_CLOSE   # cloneObjectExpression 
    | Identifier                            # identifierExpression    
    | PAREN_OPEN expression PAREN_CLOSE     # parenExpression    
    | arrayExpression                       # primaryArrayExpression
    | mappingExpression                     # primaryMappingExpression
    | StringLiteral StringLiteral*          # stringConcatExpression        
    | catchExpr                             # catchExpression
    | inheritSuperExpression                # inheritExpression
    ;

expression
    : assignmentExpression
    | nonAssignmentExpression
    ;

catchExpr
    : CATCH '(' expression (',' expression)* (';' Identifier)* ')'
    ;

bracketExpression
    : SQUARE_OPEN LT? expression SQUARE_CLOSE
    | SQUARE_OPEN LT? expression? DOUBLEDOT LT? expression? SQUARE_CLOSE    
    | SQUARE_OPEN expression? (COMMA expression)* SQUARE_CLOSE
    ;


argument
    : AND? expression
    ;

// The argument after comma is reall required, but that causes parsing errors that negatively impact 
// code completion & signature help while typing.  So we will validate in the semantic analyzer
argumentList
    : argument (COMMA argument?)*
    ;

expressionList
    : expression (COMMA expression)*
    ;

assignmentExpression
    : conditionalExpressionBase assignmentOperator expression
    ;

nonAssignmentExpression
    : inheritSuperExpression // inherit must come before inline closure
    | inlineClosureExpression
    | lambdaExpression    
    | conditionalExpressionBase    
    ;
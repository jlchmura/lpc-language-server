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
    : INHERIT inheritFile SEMI
    ;

inheritFile
    : StringLiteral        
    | Identifier // not really allowed, but will handle in semantic analysis
    | PAREN_OPEN inheritFile PAREN_CLOSE
    | inheritFile PLUS? inheritFile
    ;

inheritSuperStatement
    : inheritSuperExpression SEMI
    ;

inheritSuperExpression
    : EFUNACCESSOR expression
    | filename=StringLiteral? SUPER_ACCESSOR expression
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
    | variableModifier* STRUCT structName=Identifier variableDeclaratorExpression (COMMA structName=Identifier? variableDeclaratorExpression)* SEMI #structVariableDeclaration
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
    ;

methodInvocation
    : PAREN_OPEN argumentList? PAREN_CLOSE
    ;

structTypeSpecifier
    : STRUCT Identifier
    ;

typeSpecifier
    : primitiveTypeSpecifier
    | arrayTypeSpecifier        
    | structTypeSpecifier
    ;

// Expressions:

expression
    : assignmentExpression
    | nonAssignmentExpression
    ;

nonAssignmentExpression
    : inheritSuperExpression
    | inlineClosureExpression
    | lambdaExpression        
    | conditionalExpression
    ;

assignmentExpression
    : unaryExpression assignmentOperator expression
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
    | rightShiftAssignment
    ;

rightShiftAssignment
    : first = '>' second = '>=' {$first.index + 1 == $second.index}? // make sure there is nothing between the tokens
    ;

conditionalExpression
    : conditionalTernaryExpression
    ;

conditionalTernaryExpression
    : conditionalOrExpression (op=QUESTION expression COLON expression)?
    ;

conditionalOrExpression
    : conditionalAndExpression (op=OR_OR conditionalAndExpression)*
    ;

conditionalAndExpression
    : inclusiveOrExpression (op=AND_AND inclusiveOrExpression)*
    ;

inclusiveOrExpression
    : exclusiveOrExpression (op=OR exclusiveOrExpression)*
    ;

exclusiveOrExpression
    : andExpression (op=XOR andExpression)*
    ;

andExpression
    : equalityExpression (op=AND equalityExpression)*
    ;

equalityExpression
    : relationalExpression (op=(EQ | NE) relationalExpression)*
    ;

relationalExpression
    : shiftExpression (op=(LT | GT | LE | GE) shiftExpression)*
    ;

shiftExpression
    : additiveExpression (op=(SHL | SHR) additiveExpression)*
    ;

additiveExpression
    : multiplicativeExpression (op=(PLUS | MINUS) multiplicativeExpression)*
    ;

multiplicativeExpression
    : unaryOrAssignmentExpression (op=(STAR | DIV | MOD) unaryOrAssignmentExpression)*
    ;

unaryOrAssignmentExpression
    : assignmentExpression
    | unaryExpression
    ;
// rangeExpression
//     : unaryExpression
//     | unaryExpression? DOUBLEDOT unaryExpression?
//     ;

unaryExpression
    : castExpression
    | primaryExpression
    | (PLUS|MINUS|NOT|BNOT|INC|DEC|AND|STAR) unaryExpression    
    ;

primaryExpression
    : pe = primaryExpressionStart bracketExpression* (
        (methodInvocation | INC | DEC | (ARROW target=callOtherTarget? invocation=methodInvocation?) | Identifier) bracketExpression*
    )*
    ;

primaryExpressionStart
    : StringLiteral StringLiteral*          # stringConcatExpression        
    | literal                               # literalExpression
    | (CloneObject|LoadObject) PAREN_OPEN (ob=expression) PAREN_CLOSE   # cloneObjectExpression 
    | Identifier                            # identifierExpression    
    | PAREN_OPEN LT structName=Identifier GT expression (',' expression)* PAREN_CLOSE # structInitializerExpression
    | PAREN_OPEN expression PAREN_CLOSE     # parenExpression    
    | arrayExpression                       # primaryArrayExpression
    | mappingExpression                     # primaryMappingExpression    
    | catchExpr                             # catchExpression
    | inheritSuperExpression                # inheritExpression    
    ;

catchExpr
    : CATCH '(' expression (',' expression)* (';' Identifier)* ')'
    ;

inlineClosureExpression
    : PAREN_OPEN COLON (expression|statement*) COLON PAREN_CLOSE
    ;

bracketExpression
    : SQUARE_OPEN LT? expression SQUARE_CLOSE
    | SQUARE_OPEN LT? expression? DOUBLEDOT LT? expression? SQUARE_CLOSE    
    | SQUARE_OPEN expression? (COMMA expression)* SQUARE_CLOSE
    ;

lambdaOpenBracketExpression
    : SQUARE_OPEN LT? expression 
    | SQUARE_OPEN LT? expression? DOUBLEDOT LT? expression?     
    ;

lambdaExpression
    : HASH? SINGLEQUOT fn=Identifier
    | HASH SINGLEQUOT (WHILE|RETURN) // reserved words that are specifically allowed here
    | HASH SINGLEQUOT bracketExpression // must come before the SQUARE_OPEN in the next rule
    | HASH SINGLEQUOT lambdaOpenBracketExpression
    | HASH SINGLEQUOT op=(NOT | PLUS | MINUS | STAR | DIV | MOD | LT | GT | LE | GE | EQ | NE | AND | OR | XOR | AND_AND | OR_OR | ASSIGN | ADD_ASSIGN | SUB_ASSIGN | MUL_ASSIGN | DIV_ASSIGN | MOD_ASSIGN | AND_ASSIGN | OR_ASSIGN | BITAND_ASSIGN | BITOR_ASSIGN | XOR_ASSIGN | QUESTION | SHL | SHR | SQUARE_OPEN | COMMA)
    | HASH SINGLEQUOT PAREN_OPEN (CURLY_OPEN|SQUARE_OPEN) // lambda collections
    | HASH SINGLEQUOT expression      
    ;

castExpression
    : PAREN_OPEN typeSpecifier PAREN_CLOSE unaryExpression                        #primitiveTypeCastExpression
    | PAREN_OPEN CURLY_OPEN typeSpecifier CURLY_CLOSE PAREN_CLOSE unaryExpression #declarativeTypeCastExpression
    | PAREN_OPEN LT Identifier GT unaryExpression (COMMA unaryExpression)* PAREN_CLOSE        #structCastExpression
    ;

expressionList
    : expression (COMMA expression)*
    ;

// Arrays & Mappings

arrayTypeSpecifier
    : primitiveTypeSpecifier? STAR
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


// Statements

statement
    : expressionStatement
    | block
    | selectionStatement
    | iterationStatement
    | jumpStatement    
    | variableDeclaration    
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

caseCondition
    : (StringLiteral|MINUS? IntegerConstant|HexIntConstant|Identifier|CharacterConstant)
    | PAREN_OPEN additiveExpression PAREN_CLOSE
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
    | FOR PAREN_OPEN (forRangeExpression|SEMI SEMI) PAREN_CLOSE (statement|SEMI)            #forStatement
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


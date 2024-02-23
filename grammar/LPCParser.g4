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
    : directiveIncludeFileGlobal
    | directiveIncludeFileLocal
    ;
directiveIncludeFilename: Identifier (DOT Identifier)?;
directiveIncludeFileGlobal: LT directiveIncludeFilename GT;
directiveIncludeFileLocal: StringLiteral;

directiveTypePragma: PRAGMA;

// inherit
inheritStatement
    : INHERIT StringLiteral SEMI
    ;

inheritSuperExpression
    : SUPER_ACCESSOR expression
    | StringLiteral SUPER_ACCESSOR expression
    ;

declaration
    : functionHeaderDeclaration
    | functionDeclaration
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
    : functionModifier* typeSpecifier? Identifier PAREN_OPEN parameterList? PAREN_CLOSE
    ;

functionHeaderDeclaration
    : functionHeader SEMI
    ;

functionDeclaration
    : functionHeader compoundStatement
    ;

parameterList
    : parameter (COMMA parameter)*
    ;

parameter
    : typeSpecifier? Identifier
    ;


arrayExpression
    : ARRAY_OPEN (expression (COMMA expression)*)? ARRAY_CLOSE
    ;

mappingKey
    : IntegerConstant
    | StringLiteral
    | CharacterConstant
    ;

mappingContent
    : mappingKey (COLON expression (SEMI expression)*)?
    ;

mappingExpression
    : MAPPING_OPEN (mappingContent (COMMA mappingContent)*)? SQUARE_CLOSE PAREN_CLOSE
    ;

variableModifier
    : STATIC
    | PRIVATE
    | PROTECTED
    | PUBLIC
    | NOSHADOW
    ;

variableDeclaration
    : variableModifier* typeSpecifier? Identifier assignmentExpression? (COMMA STAR? Identifier assignmentExpression?)* SEMI    
    ;

primitiveTypeSpecifier
    : VOID
    | CHAR
    | INT   
    | FLOAT 
    | STRING
    | STRUCT
    | OBJECT
    | MAPPING
    | MIXED
    | STATUS
    | CLOSURE
    | SYMBOL
    | UNKNOWN
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
    | compoundStatement
    | selectionStatement
    | iterationStatement
    | jumpStatement
    | variableDeclaration       
    | selectionDirective
    | returnStatement
    //| preprocessorDirective
    ;

expressionStatement: expression SEMI;

compoundStatement: CURLY_OPEN statement* CURLY_CLOSE;

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
    : (StringLiteral|IntegerConstant)
    | (StringLiteral|IntegerConstant) DOUBLEDOT (StringLiteral|IntegerConstant)
    ;
caseStatement
    : CASE caseExpression COLON statement*
    ;
defaultStatement
    : DEFAULT COLON statement*
    ;

iterationStatement
    : WHILE PAREN_OPEN expression PAREN_CLOSE statement
    | DO statement WHILE PAREN_OPEN expression PAREN_CLOSE SEMI
    | FOR PAREN_OPEN expression? (COMMA expression)* SEMI expression? SEMI expression? (COMMA expression)* PAREN_CLOSE statement
    | FOREACH PAREN_OPEN typeSpecifier Identifier (IN | COLON) expression PAREN_CLOSE statement
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

expression
    : Identifier
    | MINUS? IntegerConstant
    | MINUS? FloatingConstant
    | StringLiteral
    | StringLiteral StringLiteral*  // handle implicit string concatenation
    | CharacterConstant
    | PAREN_OPEN expression PAREN_CLOSE
    | inlineClosureExpression
    | expression PLUS expression
    | expression MINUS expression
    | expression STAR expression
    | expression DIV expression
    | expression MOD expression
    | expression LT expression
    | expression GT expression
    | expression LE expression
    | expression GE expression
    | expression EQ expression
    | expression NE expression
    | expression AND expression
    | expression OR expression
    | expression XOR expression
    | expression AND_AND expression
    | expression OR_OR expression
    | expression ADD_ASSIGN expression
    | expression SUB_ASSIGN expression
    | expression MUL_ASSIGN expression
    | expression DIV_ASSIGN expression
    | expression MOD_ASSIGN expression
    | expression AND_ASSIGN expression
    | expression OR_ASSIGN expression
    | expression XOR_ASSIGN expression    
    | expression QUESTION expression COLON expression
    | NOT expression
    | INC expression
    | DEC expression
    | MINUS expression
    | expression INC
    | expression DEC
    | expression assignmentExpression
    | expression arrayAccessExpression
    | Identifier PAREN_OPEN expressionList? PAREN_CLOSE  // function call
    | mappingExpression
    | arrayExpression
    | inheritSuperExpression
    | callOtherOb=expression ARROW callOtherTarget PAREN_OPEN expressionList? PAREN_CLOSE
    ;

arrayAccessExpression
    : SQUARE_OPEN LT? expression SQUARE_CLOSE
    | SQUARE_OPEN LT? expression? DOUBLEDOT LT? expression? SQUARE_CLOSE    
    ;

expressionList
    : expression (COMMA expression)*
    ;

assignmentExpression
    : ASSIGN expression
    ;
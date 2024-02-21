grammar LPC;

// Keywords

AUTO: 'auto';
BREAK: 'break';
CASE: 'case';
CHAR: 'char';
CLOSURE: 'closure';
CONST: 'const';
CONTINUE: 'continue';
DEFAULT: 'default';
DO: 'do';
ELSE: 'else';
ENUM: 'enum';
EXTERN: 'extern';
FLOAT: 'float';
FOR: 'for';
GOTO: 'goto';
IF: 'if';
INT: 'int';
MAPPING: 'mapping';
OBJECT: 'object';
REGISTER: 'register';
RETURN: 'return';
SHORT: 'short';
SIZEOF: 'sizeof';
STATUS: 'status';
STATIC: 'static';
STRUCT: 'struct';
STRING: 'string';
SYMBOL: 'symbol';
SWITCH: 'switch';
TYPEDEF: 'typedef';
UNION: 'union';
UNKNOWN: 'unknown';
VOID: 'void';
VOLATILE: 'volatile';
WHILE: 'while';

// Operators
PLUS: '+';
MINUS: '-';
STAR: '*';
DIV: '/';
MOD: '%';
INC: '++';
DEC: '--';
SHL: '<<';
SHR: '>>';
LT: '<';
GT: '>';
LE: '<=';
GE: '>=';
EQ: '==';
NE: '!=';
AND: '&';
OR: '|';
XOR: '^';
NOT: '!';
AND_AND: '&&';
OR_OR: '||';
QUESTION: '?';
COLON: ':';
SEMI: ';';
COMMA: ',';
// for inheritance
SUPER_ACCESSOR: '::';
// assignmenet operators
ADD_ASSIGN: '+=';
SUB_ASSIGN: '-=';
MUL_ASSIGN: '*=';
DIV_ASSIGN: '/=';
MOD_ASSIGN: '%=';
AND_ASSIGN: '&=';
OR_ASSIGN: '|=';
XOR_ASSIGN: '^=';
// array & mapping brackets
ARRAY_OPEN: '({';
ARRAY_CLOSE: '})';
MAPPING_OPEN: '([';
MAPPING_CLOSE: '])';
ARROW: '->';


// Literals
IntegerConstant: [0-9]+;
FloatingConstant: [0-9]* '.' [0-9]+ ([eE] [+-]? [0-9]+)?;
StringLiteral: '"' (~["\r\n\\] | '\\' .)* '"';

CharacterConstant: '\'' (~['\r\n\\] | '\\' .) '\'';

// Identifiers
Identifier: [a-zA-Z_] [a-zA-Z_0-9]*;

// Whitespace and comments
WS: [ \t\r\n]+ -> skip;
COMMENT: '/*' .*? '*/' -> skip;
LINE_COMMENT: '//' .*? '\n' -> skip;


program: (declaration | preprocessorDirective | inheritStatement)* EOF;

preprocessorDirective
    : '#' directiveType
    | '#' directiveTypeWithArguments directiveArgument
    | definePreprocessorDirective
    | '#' directiveTypeInclude directiveIncludeFile
    | '#' directiveTypePragma Identifier (',' Identifier)*
    ;

definePreprocessorDirective
    : '#' directiveTypeDefine Identifier directiveDefineParam? directiveDefineArgument?
    ;

directiveType
    : 'else'
    | 'endif'
    ;

directiveTypeWithArguments
    : 'if'
    | 'ifdef'
    | 'ifndef'
    | 'elif'
    | 'undef'
    | 'echo'
    | 'line'
    ;

directiveArgument
    : Identifier
    | StringLiteral
    | IntegerConstant
    ;

// #define
directiveTypeDefine: 'define';
directiveDefineParam: '(' Identifier (',' Identifier)* ')';
directiveDefineArgument: expression ;

// #include <file> | #include "file"
directiveTypeInclude: 'include';

directiveIncludeFile
    : directiveIncludeFileGlobal
    | directiveIncludeFileLocal
    ;
directiveIncludeFilename: Identifier ('.' Identifier)?;
directiveIncludeFileGlobal: '<' directiveIncludeFilename '>';
directiveIncludeFileLocal: StringLiteral;

directiveTypePragma: 'pragma';

// inherit
inheritStatement
    : 'inherit' StringLiteral SEMI
    ;

inheritSuperStatement
    : SUPER_ACCESSOR expression
    | StringLiteral SUPER_ACCESSOR expression
    ;


declaration
    : functionDeclaration
    | variableDeclaration
    ;

functionDeclaration
    : typeSpecifier? Identifier '(' parameterList? ')' compoundStatement
    ;

parameterList
    : parameter (',' parameter)*
    ;

parameter
    : typeSpecifier? Identifier
    ;

scalarDeclaration
    : typeSpecifier Identifier ('=' expression)? SEMI
    ;

arrayContent
    : ARRAY_OPEN (expression (',' expression)*)? ARRAY_CLOSE
    ;

arrayDeclaration
    : typeSpecifier? STAR Identifier ('=' arrayContent)? SEMI
    ;

mappingKey
    : IntegerConstant
    | StringLiteral
    | CharacterConstant
    ;

mappingContent
    : mappingKey (':' expression (SEMI expression)*)?
    ;

mappingExpression
    : MAPPING_OPEN (mappingContent (',' mappingContent)*)? MAPPING_CLOSE
    ;

variableDeclaration
    : scalarDeclaration
    | arrayDeclaration
    ;

typeSpecifier
    : VOID
    | CHAR
    | INT   
    | FLOAT 
    | STRING
    | STRUCT
    | OBJECT
    | MAPPING
    | STATUS
    | CLOSURE
    | SYMBOL
    | UNKNOWN
    ;

statement
    : expressionStatement
    | compoundStatement
    | selectionStatement
    | iterationStatement
    | jumpStatement
    | variableDeclaration   
    | inheritSuperStatement 
    ;

expressionStatement: expression? SEMI;

compoundStatement: '{' statement* '}';

// if and switch statements
selectionStatement
    : ifStatement
    | switchStatement
    ;

ifStatement
    : IF '(' expression ')' statement (ELSE statement)?
    ;

// Switch, case, and default statements
switchStatement
    : SWITCH '(' expression ')' '{' (caseStatement | defaultStatement)* '}'
    ;

caseExpression
    : (StringLiteral|IntegerConstant)
    | (StringLiteral|IntegerConstant) '..' (StringLiteral|IntegerConstant)
    ;
caseStatement
    : CASE caseExpression ':' statement*
    ;
defaultStatement
    : DEFAULT ':' statement*
    ;

iterationStatement
    : WHILE '(' expression ')' statement
    | DO statement WHILE '(' expression ')' SEMI
    | FOR '(' expression? SEMI expression? SEMI expression? ')' statement
    ;

jumpStatement
    : BREAK SEMI
    | CONTINUE SEMI
    | RETURN expression? SEMI
    ;

callOtherTarget
    : Identifier
    | '(' Identifier ')'
    | StringLiteral
    ;

callOtherExpression
    : (Identifier | StringLiteral) ARROW callOtherTarget '(' expressionList? ')'
    ;

expression
    : Identifier
    | IntegerConstant
    | FloatingConstant
    | StringLiteral
    | CharacterConstant
    | '(' expression ')'
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
    | expression INC
    | expression DEC
    | Identifier '=' expression
    | Identifier '(' expressionList? ')'  // function call
    | mappingExpression
    | callOtherExpression
    ;

expressionList
    : expression (',' expression)*
    ;
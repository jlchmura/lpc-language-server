grammar LPC;

// Keywords

AUTO: 'auto';
BREAK: 'break';
CASE: 'case';
CHAR: 'char';
CONST: 'const';
CONTINUE: 'continue';
DEFAULT: 'default';
DO: 'do';
ELSE: 'else';
ENUM: 'enum';
EXTERN: 'extern';
FOR: 'for';
GOTO: 'goto';
IF: 'if';
INT: 'int';
LONG: 'long';
REGISTER: 'register';
RETURN: 'return';
SHORT: 'short';
SIGNED: 'signed';
SIZEOF: 'sizeof';
STATIC: 'static';
STRUCT: 'struct';
STRING: 'string';
SWITCH: 'switch';
TYPEDEF: 'typedef';
UNION: 'union';
UNSIGNED: 'unsigned';
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
ARRAY_OPEN: '({';
ARRAY_CLOSE: '})';

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


program: declaration* EOF;

declaration
    : functionDeclaration
    | variableDeclaration
    | arrayDeclaration
    ;

functionDeclaration
    : typeSpecifier? Identifier '(' parameterList? ')' compoundStatement
    ;

parameterList
    : parameter (',' parameter)*
    ;

parameter
    : typeSpecifier Identifier
    ;

variableDeclaration
    : typeSpecifier Identifier ('=' expression)? SEMI
    ;

arrayContent
    : ARRAY_OPEN (expression (',' expression)*)? ARRAY_CLOSE
    ;

arrayDeclaration
    : typeSpecifier? STAR Identifier ('=' arrayContent)? SEMI
    ;

typeSpecifier
    : VOID
    | CHAR
    | INT
    | LONG
    | STRING
    ;

statement
    : expressionStatement
    | compoundStatement
    | selectionStatement
    | iterationStatement
    | jumpStatement
    | variableDeclaration    
    | arrayDeclaration
    ;

expressionStatement: expression? SEMI;

compoundStatement: '{' statement* '}';

selectionStatement
    : IF '(' expression ')' statement (ELSE statement)?
    | SWITCH '(' expression ')' statement
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
    | expression QUESTION expression COLON expression
    | NOT expression
    | INC expression
    | DEC expression
    | expression INC
    | expression DEC
    | Identifier '=' expression
    | Identifier '(' expressionList? ')'  // function call
    ;

expressionList
    : expression (',' expression)*
    ;
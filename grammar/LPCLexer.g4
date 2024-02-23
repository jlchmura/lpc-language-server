lexer grammar LPCLexer;

tokens {
    Identifier
}

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
ECHO: 'echo';
ELSE: 'else';
ELIF: 'elif';
ENDIF: 'endif';
ENUM: 'enum';
EXTERN: 'extern';
FLOAT: 'float';
FOR: 'for';
FOREACH: 'foreach';
GOTO: 'goto';
HASH: '#';
IF: 'if';
IFDEF: 'ifdef';
IFNDEF: 'ifndef';
IN: 'in';
INCLUDE: 'include';
INHERIT: 'inherit';
INT: 'int';
LINE: 'line';
MAPPING: 'mapping';
OBJECT: 'object';
PRAGMA: 'pragma';
REGISTER: 'register';
RETURN: 'return';
STATUS: 'status';
STRUCT: 'struct';
STRING: 'string';
SYMBOL: 'symbol';
SWITCH: 'switch';
TYPEDEF: 'typedef';
UNION: 'union';
UNKNOWN: 'unknown';
UNDEF: 'undef';
VOID: 'void';
VOLATILE: 'volatile';
WHILE: 'while';

PRIVATE: 'private';
PROTECTED: 'protected';
PUBLIC: 'public';
STATIC: 'static';


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
DOUBLEDOT: '..';
DOT: '.';
//DOUBLEQUOT: '"';

// for inheritance
SUPER_ACCESSOR: '::';
// assignmenet operators
ASSIGN: '=';
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
ARROW: '->';
// closure brackerts
CLOSURE_OPEN: '(:';
CLOSURE_CLOSE: ':)';

PAREN_OPEN: '(';
PAREN_CLOSE:')';
CURLY_OPEN: '{';
CURLY_CLOSE: '}';
SQUARE_OPEN: '[';
SQUARE_CLOSE: ']';
BACKSLASH: '\\';


// Literals
IntegerConstant: MINUS? [0-9]+;
FloatingConstant: MINUS? [0-9]* '.' [0-9]+ ([eE] [+-]? [0-9]+)?;
STRING_START: '"' -> mode(STRING_MODE);
StringLiteral: STRING_START STRING_CONTENT* STRING_END;

CharacterConstant: '\'' (~['\r\n\\] | '\\' .) '\'';

// Identifiers
Identifier: [$a-zA-Z_] [a-zA-Z_0-9]* -> type(Identifier);

// Whitespace and comments
COMMENT: '/*' .*? '*/' -> skip;
LINE_COMMENT: '//' .*? '\n' -> skip;

DEFINE: HASH 'define' -> pushMode(DEFINE_MODE);

WS: [ \t\r\n]+ -> skip;

// to handle #define that can be multiline
mode DEFINE_MODE;    
    DEFINE_CONTENT: ~[\n\\]+ '\\\n'? -> more;
    NEWLINE: '\\\n' -> more;
    END_DEFINE: '\n' -> popMode;

// string mode will handle escaped quotes
mode STRING_MODE;
    STRING_CONTENT : (~["\\\n] | '\\' .) -> more;
    STRING_END: '"' -> mode(DEFAULT_MODE);
    
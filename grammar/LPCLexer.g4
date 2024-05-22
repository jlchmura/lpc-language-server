//
// LPC (LDMud) Grammar
// Copyright (c) 2023-2024, John Chmura
//
lexer grammar LPCLexer;

channels { 
    COMMENTS_CHANNEL,
    SOURCEMAP_CHANNEL
}


// Keywords

BREAK: 'break';
CASE: 'case';
CATCH: 'catch';
CHAR: 'char';
CLOSURE: 'closure';
CONST: 'const';
CONTINUE: 'continue';
DEFAULT: 'default';
DO: 'do';
ECHO: '#echo';
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
LINE: '#line';
MAPPING: 'mapping';
MIXED: 'mixed';
OBJECT: 'object';
PRAGMA: 'pragma';
RETURN: 'return';
STATUS: 'status';
STRUCT: 'struct';
STRING: 'string';
SYMBOL: 'symbol';
SWITCH: 'switch';
TYPEDEF: 'typedef';
UNION: 'union';
UNKNOWN: 'unknown';
UNDEF: '#undef';
VOID: 'void';
VOLATILE: 'volatile';
WHILE: 'while';

// modifiers
PRIVATE: 'private';
PROTECTED: 'protected';
PUBLIC: 'public';
STATIC: 'static';

NOSHADOW: 'noshadow';
NOSAVE: 'nosave';
NOMASK: 'nomask';
VARARGS: 'varargs';

// for inheritance
EFUNACCESSOR: 'efun::';
SUPER_ACCESSOR: '::';

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
BNOT: '~';
AND_AND: '&&';
OR_OR: '||';
QUESTION: '?';
COLON: ':';
SEMI: ';';
COMMA: ',';
TRIPPLEDOT: '...';
DOUBLEDOT: '..';
DOT: '.';
SINGLEQUOT: '\'';
//DOUBLEQUOT: '"';

// assignmenet operators
ASSIGN: '=';
ADD_ASSIGN: '+=';
SUB_ASSIGN: '-=';
MUL_ASSIGN: '*=';
DIV_ASSIGN: '/=';
MOD_ASSIGN: '%=';
OR_ASSIGN: '||=';
AND_ASSIGN: '&&=';
BITAND_ASSIGN: '&=';
BITOR_ASSIGN: '|=';
XOR_ASSIGN: '^=';
SHL_ASSIGN: '<<=';
MAPPING_OPEN: '([';
ARROW: '->';

PAREN_OPEN: '(';
PAREN_CLOSE:')';
CURLY_OPEN: '{';
CURLY_CLOSE: '}';
SQUARE_OPEN: '[';
SQUARE_CLOSE: ']';
BACKSLASH: '\\';

fragment HexDigit: [0-9] | [A-F] | [a-f];

// Literals
IntegerConstant: [0-9]+;
FloatingConstant: [0-9]* '.' [0-9]+ ([eE] [+-]? [0-9]+)? ;
HexIntConstant: '0' [xX] HexDigit+;
STRING_START: '"' -> mode(STRING_MODE);
StringLiteral: STRING_START STRING_CONTENT* STRING_END;
CharacterConstant: '\'' (~['\r\n\\] | '\\' .) '\'';

// efuns that need special handling
CloneObject: 'clone_object';
LoadObject: 'load_object';

// Identifiers
Identifier: [$a-zA-Z_] [a-zA-Z_0-9]*;

// Whitespace and comments
COMMENT: '/*' .*? '*/' -> channel(COMMENTS_CHANNEL);
LINE_COMMENT: '//' .*? ('\n'|EOF) -> channel(COMMENTS_CHANNEL);

// sourcemaps
SOURCEMAP: '[[@' .*? ']]' -> channel(SOURCEMAP_CHANNEL);

DEFINE: HASH [ \t]* 'define' -> pushMode(DEFINE_MODE);

WS: [ \t\r\n]+ -> channel(HIDDEN);

// to handle #define that can be multiline
mode DEFINE_MODE;    
    DEFINE_CONTENT: (~[\n\\]+ | '\\' ~'\n' ) '\\\n'? -> more;
    NEWLINE: '\\\n' -> more;
    END_DEFINE: '\n' -> popMode;

// string mode will handle escaped quotes
mode STRING_MODE;
    STRING_CONTENT : (~["\\\n] | '\\' .) -> more;
    STRING_END: '"' -> mode(DEFAULT_MODE);
    
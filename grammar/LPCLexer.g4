//
// LPC (LDMud) Grammar
// Copyright (c) 2023-2024, John Chmura
//
lexer grammar LPCLexer;

@members {    
}

channels { 
    COMMENTS_CHANNEL,
    DIRECTIVE_CHANNEL,
    DISABLED_CHANNEL    // code that is disabled by a preprocessor conditional
}


// Keywords
BREAK: 'break';
BUFFER: 'buffer';
BYTES: 'bytes';
CASE: 'case';
CATCH: 'catch';
CHAR: 'char';
CLASS: 'class';
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
FLOAT: 'float';
FOR: 'for';
FOREACH: 'foreach';
FUNCTIONS: 'functions';
FUNCTION: 'function';
HASH: '#';
IF: 'if';
IFDEF: 'ifdef';
IFNDEF: 'ifndef';
IN: 'in';
INCLUDE: 'include';
INHERIT: 'inherit';
INT: 'int';
LINE: '#line';
LWOBJECT: 'lwobject';
MAPPING: 'mapping';
MIXED: 'mixed';
NEW: 'new';
OBJECT: 'object';
PRAGMA: 'pragma';
RETURN: 'return';
STATUS: 'status';
STRUCTS: 'structs';
STRUCT: 'struct';
STRING: 'string';
SYMBOL: 'symbol';
SWITCH: 'switch';
TYPEDEF: 'typedef';
//UNION: 'union';
//UNKNOWN: 'unknown';
UNDEF: 'undef';
VARIABLES: 'variables';
VIRTUAL: 'virtual';
VOID: 'void';
VOLATILE: 'volatile';
WHILE: 'while';

// modifiers
DEPRECATED: 'deprecated';
PRIVATE: 'private';
PROTECTED: 'protected';
PUBLIC: 'public';
STATIC: 'static';
VISIBLE: 'visible';

NOSHADOW: 'noshadow';
NOSAVE: 'nosave';
NOMASK: 'nomask';
VARARGS: 'varargs';

// for inheritance
//EFUNACCESSOR: 'efun::';
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
RSH_ASSIGN: '>>=';
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
IntegerConstant: [0-9] ('_'? [0-9])*;
FloatingConstant: [0-9]* '.' [0-9]+ ([eE] [+-]? [0-9]+)? ;
HexIntConstant: '0' [xX] HexDigit+;
TextFormatDirective: '@' '@'? -> mode(TEXT_FORMAT_MODE); // Fluff-Only
STRING_START: '"' -> mode(STRING_MODE);
StringLiteral: 'b'? STRING_START STRING_CONTENT* STRING_END;
CharacterConstant: '\'' (~['\r\n\\] | '\\' .) '\'';

LAMBDA_IDENTIFIER: '\'' ([$a-zA-Z_] [a-zA-Z_0-9]* ('::' [$a-zA-Z_] [a-zA-Z_0-9]*)?);
SINGLEQUOT: '\'';

// efuns that need special handling
CloneObject: 'clone_object';
LoadObject: 'load_object';

// Identifiers
Identifier: ([$a-zA-Z_] [a-zA-Z_0-9]*);


// Whitespace and comments
COMMENT: '/*' .*? '*/' -> channel(COMMENTS_CHANNEL);
LINE_COMMENT: '//' .*? ('\n'|EOF) -> channel(COMMENTS_CHANNEL);

DEFINE: HASH [ \t]* 'define' -> pushMode(DEFINE_MODE);

WS: [ \t\r\n]+ -> channel(HIDDEN);



// to handle #define that can be multiline
mode DEFINE_MODE;    
    DEFINE_CONTENT: (~[\n\\/]+ | '\\' ~'\n' | '/' ~[*/]) '\\\n'? -> more;
    NEWLINE: '\\\n' -> more;
    DEFINE_COMMENT: '//' ~[\n]+ -> more;
    DEFINE_BLOCK_COMMENT: '/*' (~'*' | '*' ~'/' )+? '*'+ '/' -> more;
    END_DEFINE: ('\n'|EOF) -> popMode;

// string mode will handle escaped quotes
mode STRING_MODE;
    STRING_CONTENT : (~["\\\n] | '\n' | '\\' .) -> more;
    STRING_END: '"' -> mode(DEFAULT_MODE);
    
mode TEXT_FORMAT_MODE;
    // for fluff @ and @@ text formatting preprocessor directives
    // we'll tokenize groups of strings separated by whitespace
    // the preprocessor will switch the mode back when it detects the end mark
    TEXT_FORMAT_CONTENT: ~[ \t\r\n]+;
    TEXT_FORMAT_WS: [ \t\r\n]+;
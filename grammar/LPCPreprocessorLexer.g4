lexer grammar LPCPreprocessorLexer;

channels {
    COMMENTS_CHANNEL
}

//LAMBA             : '#\''                                        -> type(CODE);   
SHARP             : '#'                                          -> mode(DIRECTIVE_MODE);
COMMENT           : '/*' .*? '*/'                                -> type(CODE);
LINE_COMMENT      : '//' ~[\r\n]*                                -> type(CODE);
SLASH             : '/'                                          -> type(CODE);
// char literal / quoted strings don't have an ending quote on purpose. we don't care in the preprocessor
CHARACTER_LITERAL : '\'' (EscapeSequence | ~('\'' | '\\')) ~'#'      -> type(CODE);
//QUOTE_STRING      : '\'' (EscapeSequence | ~('\'' | '\\'))* ~'#'     -> type(CODE);
STRING            : StringFragment                               -> type(CODE);
CODE              : (~[#'"/]|'#\'')+;

mode DIRECTIVE_MODE;

INCLUDE : 'include' [ \t]+ -> mode(DIRECTIVE_TEXT);
PRAGMA  : 'pragma'         -> mode(DIRECTIVE_TEXT);

DEFINE  : 'define' [ \t]+ -> mode(DIRECTIVE_DEFINE);
DEFINED : 'defined';
IF      : 'if';
ELIF    : 'elif';
ELSE    : 'else';
UNDEF   : 'undef';
IFDEF   : 'ifdef';
IFNDEF  : 'ifndef';
ENDIF   : 'endif';

BANG     : '!';
LPAREN   : '(';
RPAREN   : ')';
EQUAL    : '==';
NOTEQUAL : '!=';
AND      : '&&';
OR       : '||';
LT       : '<';
GT       : '>';
LE       : '<=';
GE       : '>=';
STAR     : '*';


DIRECTIVE_WHITESPACES  : [ \t]+ -> channel(HIDDEN);
DIRECTIVE_STRING       : StringFragment;
CONDITIONAL_SYMBOL     : LETTER (LETTER | [0-9])*;
DECIMAL_LITERAL        : [0-9]+;
FLOAT                  : ([0-9]+ '.' [0-9]* | '.' [0-9]+);
NEW_LINE               : '\r'? '\n'      -> mode(DEFAULT_MODE);
DIRECITVE_COMMENT      : '/*' .*? '*/'   -> channel(COMMENTS_CHANNEL);
DIRECITVE_LINE_COMMENT : '//' ~[\r\n]*   -> channel(COMMENTS_CHANNEL);
DIRECITVE_NEW_LINE     : '\\' '\r'? '\n' -> channel(HIDDEN);

mode DIRECTIVE_DEFINE;

DIRECTIVE_DEFINE_CONDITIONAL_SYMBOL:
    LETTER (LETTER | [0-9])* ('(' (LETTER | [0-9,. \t])* ')')? -> type(CONDITIONAL_SYMBOL), mode(DIRECTIVE_TEXT)
;

mode DIRECTIVE_TEXT;

DIRECITVE_TEXT_NEW_LINE : '\\' '\r'? '\n' -> channel(HIDDEN);
BACK_SLASH_ESCAPE       : '\\' .          -> type(TEXT);
TEXT_NEW_LINE           : '\r'? '\n'      -> type(NEW_LINE), mode(DEFAULT_MODE);
DIRECTIVE_COMMENT       : '/*' .*? '*/'   -> channel(COMMENTS_CHANNEL), type(DIRECITVE_COMMENT);
DIRECTIVE_LINE_COMMENT:
    '//' ~[\r\n]* -> channel(COMMENTS_CHANNEL), type(DIRECITVE_LINE_COMMENT)
;
DIRECTIVE_SLASH : '/' -> type(TEXT);
TEXT            : ~[\r\n\\/]+;

fragment EscapeSequence:
    '\\' ('b' | 't' | 'n' | 'f' | 'r' | '"' | '\'' | '\\')
    | OctalEscape
    | UnicodeEscape
;

fragment OctalEscape: '\\' [0-3] [0-7] [0-7] | '\\' [0-7] [0-7] | '\\' [0-7];

fragment UnicodeEscape: '\\' 'u' HexDigit HexDigit HexDigit HexDigit;

fragment HexDigit: [0-9a-fA-F];

fragment StringFragment: '"' (~('\\' | '"') | '\\' .)* '"';

fragment LETTER:
    [$A-Za-z_]
    | ~[\u0000-\u00FF\uD800-\uDBFF]
    | [\uD800-\uDBFF] [\uDC00-\uDFFF]
    | [\u00E9]
;

fragment A : [aA];
fragment B : [bB];
fragment C : [cC];
fragment D : [dD];
fragment E : [eE];
fragment F : [fF];
fragment G : [gG];
fragment H : [hH];
fragment I : [iI];
fragment J : [jJ];
fragment K : [kK];
fragment L : [lL];
fragment M : [mM];
fragment N : [nN];
fragment O : [oO];
fragment P : [pP];
fragment Q : [qQ];
fragment R : [rR];
fragment S : [sS];
fragment T : [tT];
fragment U : [uU];
fragment V : [vV];
fragment W : [wW];
fragment X : [xX];
fragment Y : [yY];
fragment Z : [zZ];
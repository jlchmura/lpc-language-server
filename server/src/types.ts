export const SemanticTokenTypes = {
    Comment: 0,
    Macro: 1,
    Operator: 2,
    Method: 3,
    Parameter: 4,
    Define: 5,
    String: 6,
    Number: 7,
    Type: 8,
    Variable: 9,
    Property: 10,
    LambdaPrefix: 11,
} as const;

export const SemanticTokenModifiers = {
    Declaration: 1,
    Definition: 2,
    Documentation: 3,
    Static: 4,
    DefaultLibrary: 5,
    Local: 6,
} as const;

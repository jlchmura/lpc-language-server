import { MapLike } from "./core";
import { KeywordSyntaxKind, PunctuationOrKeywordSyntaxKind, SyntaxKind } from "./types";
import { positionIsSynthesized } from "./utilities";

function makeReverseMap(source: Map<string, number>): string[] {
    const result: string[] = [];
    source.forEach((value, name) => {
        result[value] = name;
    });
    return result;
}



/** @internal */
export const textToKeywordObj: MapLike<KeywordSyntaxKind> = {
    // abstract: SyntaxKind.AbstractKeyword,
    // accessor: SyntaxKind.AccessorKeyword,
    // any: SyntaxKind.AnyKeyword,
    // as: SyntaxKind.AsKeyword,
    // asserts: SyntaxKind.AssertsKeyword,
    // assert: SyntaxKind.AssertKeyword,
    // bigint: SyntaxKind.BigIntKeyword,
    // boolean: SyntaxKind.BooleanKeyword,
    // break: SyntaxKind.BreakKeyword,
    // case: SyntaxKind.CaseKeyword,
    // catch: SyntaxKind.CatchKeyword,
    // class: SyntaxKind.ClassKeyword,
    // continue: SyntaxKind.ContinueKeyword,
    // const: SyntaxKind.ConstKeyword,
    // ["" + "constructor"]: SyntaxKind.ConstructorKeyword,
    // debugger: SyntaxKind.DebuggerKeyword,
    // declare: SyntaxKind.DeclareKeyword,
    // default: SyntaxKind.DefaultKeyword,
    // delete: SyntaxKind.DeleteKeyword,
    // do: SyntaxKind.DoKeyword,
    // else: SyntaxKind.ElseKeyword,
    // enum: SyntaxKind.EnumKeyword,
    // export: SyntaxKind.ExportKeyword,
    // extends: SyntaxKind.ExtendsKeyword,
    // false: SyntaxKind.FalseKeyword,
    // finally: SyntaxKind.FinallyKeyword,
    // for: SyntaxKind.ForKeyword,
    // from: SyntaxKind.FromKeyword,
    // function: SyntaxKind.FunctionKeyword,
    // get: SyntaxKind.GetKeyword,
    // if: SyntaxKind.IfKeyword,
    // implements: SyntaxKind.ImplementsKeyword,
    // import: SyntaxKind.ImportKeyword,
    // in: SyntaxKind.InKeyword,
    // infer: SyntaxKind.InferKeyword,
    // instanceof: SyntaxKind.InstanceOfKeyword,
    // interface: SyntaxKind.InterfaceKeyword,
    // intrinsic: SyntaxKind.IntrinsicKeyword,
    // is: SyntaxKind.IsKeyword,
    // keyof: SyntaxKind.KeyOfKeyword,
    // let: SyntaxKind.LetKeyword,
    // module: SyntaxKind.ModuleKeyword,
    // namespace: SyntaxKind.NamespaceKeyword,
    // never: SyntaxKind.NeverKeyword,
    // new: SyntaxKind.NewKeyword,
    // null: SyntaxKind.NullKeyword,
    // number: SyntaxKind.NumberKeyword,
    // object: SyntaxKind.ObjectKeyword,
    // package: SyntaxKind.PackageKeyword,
    private: SyntaxKind.PrivateKeyword,
    protected: SyntaxKind.ProtectedKeyword,
    public: SyntaxKind.PublicKeyword,
    // override: SyntaxKind.OverrideKeyword,
    // out: SyntaxKind.OutKeyword,
    // readonly: SyntaxKind.ReadonlyKeyword,
    // require: SyntaxKind.RequireKeyword,
    // global: SyntaxKind.GlobalKeyword,
    // return: SyntaxKind.ReturnKeyword,
    // satisfies: SyntaxKind.SatisfiesKeyword,
    // set: SyntaxKind.SetKeyword,
    // static: SyntaxKind.StaticKeyword,
    // string: SyntaxKind.StringKeyword,
    // super: SyntaxKind.SuperKeyword,
    // switch: SyntaxKind.SwitchKeyword,
    // symbol: SyntaxKind.SymbolKeyword,
    // this: SyntaxKind.ThisKeyword,
    // throw: SyntaxKind.ThrowKeyword,
    // true: SyntaxKind.TrueKeyword,
    // try: SyntaxKind.TryKeyword,
    // type: SyntaxKind.TypeKeyword,
    // typeof: SyntaxKind.TypeOfKeyword,
    // undefined: SyntaxKind.UndefinedKeyword,
    // unique: SyntaxKind.UniqueKeyword,
    // unknown: SyntaxKind.UnknownKeyword,
    // using: SyntaxKind.UsingKeyword,
    // var: SyntaxKind.VarKeyword,
    // void: SyntaxKind.VoidKeyword,
    // while: SyntaxKind.WhileKeyword,
    // with: SyntaxKind.WithKeyword,
    // yield: SyntaxKind.YieldKeyword,
    // async: SyntaxKind.AsyncKeyword,
    // await: SyntaxKind.AwaitKeyword,
    // of: SyntaxKind.OfKeyword,
};

const textToToken = new Map(Object.entries({
    ...textToKeywordObj,
    "{": SyntaxKind.OpenBraceToken,
    "}": SyntaxKind.CloseBraceToken,
    "(": SyntaxKind.OpenParenToken,
    ")": SyntaxKind.CloseParenToken,
    "[": SyntaxKind.OpenBracketToken,
    "]": SyntaxKind.CloseBracketToken,
    ".": SyntaxKind.DotToken,
    "...": SyntaxKind.DotDotDotToken,
    ";": SyntaxKind.SemicolonToken,
    ",": SyntaxKind.CommaToken,
    "<": SyntaxKind.LessThanToken,
    ">": SyntaxKind.GreaterThanToken,
    "<=": SyntaxKind.LessThanEqualsToken,
    ">=": SyntaxKind.GreaterThanEqualsToken,
    "==": SyntaxKind.EqualsEqualsToken,
    "!=": SyntaxKind.ExclamationEqualsToken,
    "===": SyntaxKind.EqualsEqualsEqualsToken,
    "!==": SyntaxKind.ExclamationEqualsEqualsToken,
    "=>": SyntaxKind.EqualsGreaterThanToken,
    "+": SyntaxKind.PlusToken,
    "-": SyntaxKind.MinusToken,
    "**": SyntaxKind.AsteriskAsteriskToken,
    "*": SyntaxKind.AsteriskToken,
    "/": SyntaxKind.SlashToken,
    "%": SyntaxKind.PercentToken,
    "++": SyntaxKind.PlusPlusToken,
    "--": SyntaxKind.MinusMinusToken,
    "<<": SyntaxKind.LessThanLessThanToken,
    "</": SyntaxKind.LessThanSlashToken,
    ">>": SyntaxKind.GreaterThanGreaterThanToken,
    ">>>": SyntaxKind.GreaterThanGreaterThanGreaterThanToken,
    "&": SyntaxKind.AmpersandToken,
    "|": SyntaxKind.BarToken,
    "^": SyntaxKind.CaretToken,
    "!": SyntaxKind.ExclamationToken,
    "~": SyntaxKind.TildeToken,
    "&&": SyntaxKind.AmpersandAmpersandToken,
    "||": SyntaxKind.BarBarToken,
    "?": SyntaxKind.QuestionToken,
    //"??": SyntaxKind.QuestionQuestionToken,
    "?.": SyntaxKind.QuestionDotToken,
    ":": SyntaxKind.ColonToken,
    "=": SyntaxKind.EqualsToken,
    "+=": SyntaxKind.PlusEqualsToken,
    "-=": SyntaxKind.MinusEqualsToken,
    "*=": SyntaxKind.AsteriskEqualsToken,
    "**=": SyntaxKind.AsteriskAsteriskEqualsToken,
    "/=": SyntaxKind.SlashEqualsToken,
    "%=": SyntaxKind.PercentEqualsToken,
    "<<=": SyntaxKind.LessThanLessThanEqualsToken,
    ">>=": SyntaxKind.GreaterThanGreaterThanEqualsToken,
    ">>>=": SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken,
    "&=": SyntaxKind.AmpersandEqualsToken,
    "|=": SyntaxKind.BarEqualsToken,
    "^=": SyntaxKind.CaretEqualsToken,
    "||=": SyntaxKind.BarBarEqualsToken,
    "&&=": SyntaxKind.AmpersandAmpersandEqualsToken,
    "??=": SyntaxKind.QuestionQuestionEqualsToken,
    "@": SyntaxKind.AtToken,
    "#": SyntaxKind.HashToken,
    //"`": SyntaxKind.BacktickToken,
}));

const tokenStrings = makeReverseMap(textToToken);

/** @internal */
export function tokenToString(t: PunctuationOrKeywordSyntaxKind): string;
export function tokenToString(t: SyntaxKind): string | undefined;
export function tokenToString(t: SyntaxKind): string | undefined {
    return tokenStrings[t];
}

/** @internal */
export function skipTrivia(text: string, pos: number, stopAfterLineBreak?: boolean, stopAtComments?: boolean, inJSDoc?: boolean): number {
    if (positionIsSynthesized(pos)) {
        return pos;
    }

    let canConsumeStar = false;
    // Keep in sync with couldStartTrivia
    // while (true) {
    //     const ch = text.charCodeAt(pos);
    //     switch (ch) {
    //         case CharacterCodes.carriageReturn:
    //             if (text.charCodeAt(pos + 1) === CharacterCodes.lineFeed) {
    //                 pos++;
    //             }
    //         // falls through
    //         case CharacterCodes.lineFeed:
    //             pos++;
    //             if (stopAfterLineBreak) {
    //                 return pos;
    //             }
    //             canConsumeStar = !!inJSDoc;
    //             continue;
    //         case CharacterCodes.tab:
    //         case CharacterCodes.verticalTab:
    //         case CharacterCodes.formFeed:
    //         case CharacterCodes.space:
    //             pos++;
    //             continue;
    //         case CharacterCodes.slash:
    //             if (stopAtComments) {
    //                 break;
    //             }
    //             if (text.charCodeAt(pos + 1) === CharacterCodes.slash) {
    //                 pos += 2;
    //                 while (pos < text.length) {
    //                     if (isLineBreak(text.charCodeAt(pos))) {
    //                         break;
    //                     }
    //                     pos++;
    //                 }
    //                 canConsumeStar = false;
    //                 continue;
    //             }
    //             if (text.charCodeAt(pos + 1) === CharacterCodes.asterisk) {
    //                 pos += 2;
    //                 while (pos < text.length) {
    //                     if (text.charCodeAt(pos) === CharacterCodes.asterisk && text.charCodeAt(pos + 1) === CharacterCodes.slash) {
    //                         pos += 2;
    //                         break;
    //                     }
    //                     pos++;
    //                 }
    //                 canConsumeStar = false;
    //                 continue;
    //             }
    //             break;

    //         case CharacterCodes.lessThan:
    //         case CharacterCodes.bar:
    //         case CharacterCodes.equals:
    //         case CharacterCodes.greaterThan:
    //             if (isConflictMarkerTrivia(text, pos)) {
    //                 pos = scanConflictMarkerTrivia(text, pos);
    //                 canConsumeStar = false;
    //                 continue;
    //             }
    //             break;

    //         case CharacterCodes.hash:
    //             if (pos === 0 && isShebangTrivia(text, pos)) {
    //                 pos = scanShebangTrivia(text, pos);
    //                 canConsumeStar = false;
    //                 continue;
    //             }
    //             break;

    //         case CharacterCodes.asterisk:
    //             if (canConsumeStar) {
    //                 pos++;
    //                 canConsumeStar = false;
    //                 continue;
    //             }
    //             break;

    //         default:
    //             if (ch > CharacterCodes.maxAsciiCharacter && (isWhiteSpaceLike(ch))) {
    //                 pos++;
    //                 continue;
    //             }
    //             break;
    //     }
    //     return pos;
    // }

    return pos;
}

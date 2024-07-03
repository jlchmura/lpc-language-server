import { CharacterCodes } from "./types";

function isDigit(ch: number): boolean {
    return ch >= CharacterCodes._0 && ch <= CharacterCodes._9;
}

function isHexDigit(ch: number): boolean {
    return (
        isDigit(ch) ||
        (ch >= CharacterCodes.A && ch <= CharacterCodes.F) ||
        (ch >= CharacterCodes.a && ch <= CharacterCodes.f)
    );
}

function isASCIILetter(ch: number): boolean {
    return (
        (ch >= CharacterCodes.A && ch <= CharacterCodes.Z) ||
        (ch >= CharacterCodes.a && ch <= CharacterCodes.z)
    );
}
function isWordCharacter(ch: number): boolean {
    return isASCIILetter(ch) || isDigit(ch) || ch === CharacterCodes._;
}

export function isIdentifierPart(ch: number): boolean {
    return isWordCharacter(ch) || ch === CharacterCodes.$;
    // TODO: support unicode identifiers?
    //||   ch > CharacterCodes.maxAsciiCharacter && isUnicodeIdentifierPart(ch, languageVersion);
}

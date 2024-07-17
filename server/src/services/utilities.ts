import {
    getTextOfIdentifierOrLiteral,
    IScriptSnapshot,
    PropertyName,
} from "./_namespaces/lpc.js";

/** @internal */
export function getNameFromPropertyName(
    name: PropertyName
): string | undefined {
    return getTextOfIdentifierOrLiteral(name);
    // return name.kind === SyntaxKind.ComputedPropertyName
    //     // treat computed property names where expression is string/numeric literal as just string/numeric literal
    //     ? isStringOrNumericLiteralLike(name.expression) ? name.expression.text : undefined
    //     : isPrivateIdentifier(name) ? idText(name) : getTextOfIdentifierOrLiteral(name);
}

/** @internal */
export function getSnapshotText(snap: IScriptSnapshot): string {
    return snap.getText(0, snap.getLength());
}

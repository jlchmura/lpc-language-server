import { CallLikeExpression, contains, createTextSpan, createTextSpanFromBounds, Debug, find, getPossibleTypeArgumentsInfo, Identifier, isCallOrNewExpression, isNoSubstitutionTemplateLiteral, isSpreadElement, isSyntaxList, last, Node, Signature, skipTrivia, SourceFile, SpreadElement, SyntaxKind, SyntaxList, TextRange, TextSpan, TypeChecker } from "./_namespaces/lpc.js";

const enum InvocationKind {
    Call,
    TypeArgs,
    Contextual,
}


/** @internal */
export interface ArgumentInfoForCompletions {
    readonly invocation: CallLikeExpression;
    readonly argumentIndex: number;
    readonly argumentCount: number;
}

interface CallInvocation {
    readonly kind: InvocationKind.Call;
    readonly node: CallLikeExpression;
}
interface TypeArgsInvocation {
    readonly kind: InvocationKind.TypeArgs;
    readonly called: Identifier;
}
interface ContextualInvocation {
    readonly kind: InvocationKind.Contextual;
    readonly signature: Signature;
    readonly node: Node; // Just for enclosingDeclaration for printing types
    readonly symbol: Symbol;
}

type Invocation = CallInvocation | TypeArgsInvocation | ContextualInvocation;

interface ArgumentListInfo {
    readonly isTypeParameterList: boolean;
    readonly invocation: Invocation;
    readonly argumentsSpan: TextSpan;
    readonly argumentIndex: number;
    /** argumentCount is the *apparent* number of arguments. */
    readonly argumentCount: number;
}


/** @internal */
export function getArgumentInfoForCompletions(node: Node, position: number, sourceFile: SourceFile, checker: TypeChecker): ArgumentInfoForCompletions | undefined {
    const info = getImmediatelyContainingArgumentInfo(node, position, sourceFile, checker);
    return !info || info.isTypeParameterList || info.invocation.kind !== InvocationKind.Call ? undefined
        : { invocation: info.invocation.node, argumentCount: info.argumentCount, argumentIndex: info.argumentIndex };
}

/**
 * Returns relevant information for the argument list and the current argument if we are
 * in the argument of an invocation; returns undefined otherwise.
 */
function getImmediatelyContainingArgumentInfo(node: Node, position: number, sourceFile: SourceFile, checker: TypeChecker): ArgumentListInfo | undefined {
    const { parent } = node;
    if (isCallOrNewExpression(parent)) {
        const invocation = parent;

        // There are 3 cases to handle:
        //   1. The token introduces a list, and should begin a signature help session
        //   2. The token is either not associated with a list, or ends a list, so the session should end
        //   3. The token is buried inside a list, and should give signature help
        //
        // The following are examples of each:
        //
        //    Case 1:
        //          foo<#T, U>(#a, b)    -> The token introduces a list, and should begin a signature help session
        //    Case 2:
        //          fo#o<T, U>#(a, b)#   -> The token is either not associated with a list, or ends a list, so the session should end
        //    Case 3:
        //          foo<T#, U#>(a#, #b#) -> The token is buried inside a list, and should give signature help
        // Find out if 'node' is an argument, a type argument, or neither
        const info = getArgumentOrParameterListInfo(node, position, sourceFile, checker);
        if (!info) return undefined;
        const { list, argumentIndex, argumentCount, argumentsSpan } = info;
        const isTypeParameterList = false;//!!parent.typeArguments && parent.typeArguments.pos === list.pos;
        return { isTypeParameterList, invocation: { kind: InvocationKind.Call, node: invocation }, argumentsSpan, argumentIndex, argumentCount };
    }
    else if (isNoSubstitutionTemplateLiteral(node)) {// && isTaggedTemplateExpression(parent)) {
        // Check if we're actually inside the template;
        // otherwise we'll fall out and return undefined.
        // if (isInsideTemplateLiteral(node, position, sourceFile)) {
        //     return getArgumentListInfoForTemplate(parent, /*argumentIndex*/ 0, sourceFile);
        // }
        return undefined;
    }
    // else if (isTemplateHead(node) && parent.parent.kind === SyntaxKind.TaggedTemplateExpression) {
    //     const templateExpression = parent as TemplateExpression;
    //     const tagExpression = templateExpression.parent as TaggedTemplateExpression;
    //     Debug.assert(templateExpression.kind === SyntaxKind.TemplateExpression);

    //     const argumentIndex = isInsideTemplateLiteral(node, position, sourceFile) ? 0 : 1;

    //     return getArgumentListInfoForTemplate(tagExpression, argumentIndex, sourceFile);
    // }
    // else if (isTemplateSpan(parent) && isTaggedTemplateExpression(parent.parent.parent)) {
    //     const templateSpan = parent;
    //     const tagExpression = parent.parent.parent;

    //     // If we're just after a template tail, don't show signature help.
    //     if (isTemplateTail(node) && !isInsideTemplateLiteral(node, position, sourceFile)) {
    //         return undefined;
    //     }

    //     const spanIndex = templateSpan.parent.templateSpans.indexOf(templateSpan);
    //     const argumentIndex = getArgumentIndexForTemplatePiece(spanIndex, node, position, sourceFile);

    //     return getArgumentListInfoForTemplate(tagExpression, argumentIndex, sourceFile);
    // }    
    else {
        const typeArgInfo = getPossibleTypeArgumentsInfo(node, sourceFile);
        if (typeArgInfo) {
            const { called, nTypeArguments } = typeArgInfo;
            const invocation: Invocation = { kind: InvocationKind.TypeArgs, called };
            const argumentsSpan = createTextSpanFromBounds(called.getStart(sourceFile), node.end);
            return { isTypeParameterList: true, invocation, argumentsSpan, argumentIndex: nTypeArguments, argumentCount: nTypeArguments + 1 };
        }
        return undefined;
    }
}

function getArgumentOrParameterListInfo(node: Node, position: number, sourceFile: SourceFile, checker: TypeChecker): { readonly list: Node; readonly argumentIndex: number; readonly argumentCount: number; readonly argumentsSpan: TextSpan; } | undefined {
    const info = getArgumentOrParameterListAndIndex(node, sourceFile, checker);
    if (!info) return undefined;
    const { list, argumentIndex } = info;

    const argumentCount = getArgumentCount(checker, list);
    if (argumentIndex !== 0) {
        Debug.assertLessThan(argumentIndex, argumentCount);
    }
    const argumentsSpan = getApplicableSpanForArguments(list, sourceFile);
    return { list, argumentIndex, argumentCount, argumentsSpan };
}

function getArgumentOrParameterListAndIndex(node: Node, sourceFile: SourceFile, checker: TypeChecker): { readonly list: Node; readonly argumentIndex: number; } | undefined {
    if (node.kind === SyntaxKind.LessThanToken || node.kind === SyntaxKind.OpenParenToken) {
        // Find the list that starts right *after* the < or ( token.
        // If the user has just opened a list, consider this item 0.
        return { list: getChildListThatStartsWithOpenerToken(node.parent, node, sourceFile), argumentIndex: 0 };
    }
    else {
        // findListItemInfo can return undefined if we are not in parent's argument list
        // or type argument list. This includes cases where the cursor is:
        //   - To the right of the closing parenthesis, non-substitution template, or template tail.
        //   - Between the type arguments and the arguments (greater than token)
        //   - On the target of the call (parent.func)
        //   - On the 'new' keyword in a 'new' expression
        const list = findContainingList(node);
        return list && { list, argumentIndex: getArgumentIndex(checker, list, node) };
    }
}

function getArgumentIndex(checker: TypeChecker, argumentsList: Node, node: Node) {
    return getArgumentIndexOrCount(checker, argumentsList, node);
}

function getArgumentCount(checker: TypeChecker, argumentsList: Node) {
    return getArgumentIndexOrCount(checker, argumentsList, /*node*/ undefined);
}

function getArgumentIndexOrCount(checker: TypeChecker, argumentsList: Node, node: Node | undefined) {
    // The list we got back can include commas. In the presence of errors it may
    // also just have nodes without commas. For example "Foo(a b c)" will have 3
    // args without commas.
    const args = argumentsList.getChildren();
    let argumentIndex = 0;
    let skipComma = false;
    for (const child of args) {
        if (node && child === node) {
            if (!skipComma && child.kind === SyntaxKind.CommaToken) {
                argumentIndex++;
            }
            return argumentIndex;
        }
        if (isSpreadElement(child)) {
            argumentIndex += getSpreadElementCount(child, checker);
            skipComma = true;
            continue;
        }
        if (child.kind !== SyntaxKind.CommaToken) {
            argumentIndex++;
            skipComma = true;
            continue;
        }
        if (skipComma) {
            skipComma = false;
            continue;
        }
        argumentIndex++;
    }
    if (node) {
        return argumentIndex;
    }
    // The argument count for a list is normally the number of non-comma children it has.
    // For example, if you have "Foo(a,b)" then there will be three children of the arg
    // list 'a' '<comma>' 'b'. So, in this case the arg count will be 2. However, there
    // is a small subtlety. If you have "Foo(a,)", then the child list will just have
    // 'a' '<comma>'. So, in the case where the last child is a comma, we increase the
    // arg count by one to compensate.
    return args.length && last(args).kind === SyntaxKind.CommaToken ? argumentIndex + 1 : argumentIndex;
}

function getApplicableSpanForArguments(argumentsList: Node, sourceFile: SourceFile): TextSpan {
    // We use full start and skip trivia on the end because we want to include trivia on
    // both sides. For example,
    //
    //    foo(   /*comment */     a, b, c      /*comment*/     )
    //        |                                               |
    //
    // The applicable span is from the first bar to the second bar (inclusive,
    // but not including parentheses)
    const applicableSpanStart = argumentsList.getFullStart();
    const applicableSpanEnd = skipTrivia(sourceFile.text, argumentsList.getEnd(), /*stopAfterLineBreak*/ false);
    return createTextSpan(applicableSpanStart, applicableSpanEnd - applicableSpanStart);
}

function getChildListThatStartsWithOpenerToken(parent: Node, openerToken: Node, sourceFile: SourceFile): Node {
    const children = parent.getChildren(sourceFile);
    const indexOfOpenerToken = children.indexOf(openerToken);
    Debug.assert(indexOfOpenerToken >= 0 && children.length > indexOfOpenerToken + 1);
    return children[indexOfOpenerToken + 1];
}

/** @internal */
export function findContainingList(node: Node): SyntaxList | undefined {
    // The node might be a list element (nonsynthetic) or a comma (synthetic). Either way, it will
    // be parented by the container of the SyntaxList, not the SyntaxList itself.
    // In order to find the list item index, we first need to locate SyntaxList itself and then search
    // for the position of the relevant node (or comma).
    const syntaxList = find(node.parent.getChildren(), (c): c is SyntaxList => isSyntaxList(c) && rangeContainsRange(c, node));
    // Either we didn't find an appropriate list, or the list must contain us.
    Debug.assert(!syntaxList || contains(syntaxList.getChildren(), node));
    return syntaxList;
}

/** @internal */
export function rangeContainsRange(r1: TextRange, r2: TextRange): boolean {
    return startEndContainsRange(r1.pos, r1.end, r2);
}

/** @internal */
export function startEndContainsRange(start: number, end: number, range: TextRange): boolean {
    return start <= range.pos && end >= range.end;
}

function getSpreadElementCount(node: SpreadElement, checker: TypeChecker) {
    const spreadType = checker.getTypeAtLocation(node.expression);
    // if (checker.isTupleType(spreadType)) {
    //     const { elementFlags, fixedLength } = (spreadType as TupleTypeReference).target;
    //     if (fixedLength === 0) {
    //         return 0;
    //     }
    //     const firstOptionalIndex = findIndex(elementFlags, f => !(f & ElementFlags.Required));
    //     return firstOptionalIndex < 0 ? fixedLength : firstOptionalIndex;
    // }
    return 0;
}
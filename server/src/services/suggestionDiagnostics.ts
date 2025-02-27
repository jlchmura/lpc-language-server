import {
    addRange,
    AnyValidImportOrReExport,
    ArrowFunction,
    AssignmentDeclarationKind,
    Block,
    CallExpression,
    CancellationToken,
    codefix,
    createDiagnosticForNode,
    Diagnostics,
    DiagnosticWithLocation,
    Expression,
    ExpressionStatement,
    Extension,
    fileExtensionIsOneOf,
    forEachReturnStatement,
    FunctionDeclaration,
    FunctionExpression,
    FunctionFlags,
    FunctionLikeDeclaration,
    getAssignmentDeclarationKind,
    getFunctionFlags,
    hasInitializer,
    Identifier,
    importFromModuleSpecifier,
    isBinaryExpression,
    isBlock,
    isCallExpression,
    isFunctionDeclaration,
    isFunctionExpression,
    isFunctionLike,
    isIdentifier,
    isPropertyAccessExpression,    
    isStringLiteral,
    isVariableDeclaration,
    isVariableStatement,
    MethodDeclaration,
    ModuleKind,
    Node,
    NodeFlags,
    Program,    
    PropertyAccessExpression,
    ReturnStatement,
    skipAlias,
    some,
    SourceFile,
    SyntaxKind,
    tryGetTextOfPropertyName,
    TypeChecker,
    VariableStatement,
} from "./_namespaces/lpc.js";

const visitedNestedConvertibleFunctions = new Map<string, true>();

/** @internal */
export function computeSuggestionDiagnostics(sourceFile: SourceFile, program: Program, cancellationToken: CancellationToken): DiagnosticWithLocation[] {
    program.getSemanticDiagnostics(sourceFile, cancellationToken);
    const diags: DiagnosticWithLocation[] = [];
    const checker = program.getTypeChecker();
    
    visitedNestedConvertibleFunctions.clear();
    check(sourceFile);

    addRange(diags, sourceFile.bindSuggestionDiagnostics);
    addRange(diags, program.getSuggestionDiagnostics(sourceFile, cancellationToken));
    return diags.sort((d1, d2) => d1.start - d2.start);

    function check(node: Node) {
                    
            // console.debug("todo - codefix typedef");
            // const jsdocTypedefNodes = codefix.getJSDocTypedefNodes(node);
            // for (const jsdocTypedefNode of jsdocTypedefNodes) {
            //     diags.push(createDiagnosticForNode(jsdocTypedefNode, Diagnostics.JSDoc_typedef_may_be_converted_to_TypeScript_type));
            // }

            // if (codefix.parameterShouldGetTypeFromJSDoc(node)) {
            //     diags.push(createDiagnosticForNode(node.name || node, Diagnostics.JSDoc_types_may_be_moved_to_TypeScript_types));
            // }
        

        if (canBeConvertedToAsync(node)) {
            addConvertToAsyncFunctionDiagnostics(node, checker, diags);
        }
        node.forEachChild(check);
    }
}

function propertyAccessLeftHandSide(node: Expression): Expression {
    return isPropertyAccessExpression(node) ? propertyAccessLeftHandSide(node.expression) : node;
}

function addConvertToAsyncFunctionDiagnostics(node: FunctionLikeDeclaration, checker: TypeChecker, diags: DiagnosticWithLocation[]): void {
    // need to check function before checking map so that deeper levels of nested callbacks are checked
    // console.debug("todo - codefix convertToAsyncFunction");
    // if (isConvertibleFunction(node, checker) && !visitedNestedConvertibleFunctions.has(getKeyFromNode(node))) {
    //     diags.push(createDiagnosticForNode(
    //         !node.name && isVariableDeclaration(node.parent) && isIdentifier(node.parent.name) ? node.parent.name : node,
    //         Diagnostics.This_may_be_converted_to_an_async_function,
    //     ));
    // }
}

function isConvertibleFunction(node: FunctionLikeDeclaration, checker: TypeChecker) {
    return false;
    // return !isAsyncFunction(node) &&
    //     node.body &&
    //     isBlock(node.body) &&
    //     hasReturnStatementWithPromiseHandler(node.body, checker) &&
    //     returnsPromise(node, checker);
}

function hasSupportedNumberOfArguments(node: CallExpression & { readonly expression: PropertyAccessExpression; }) {
    const name = tryGetTextOfPropertyName(node.expression.name);
    const maxArguments = name === "then" ? 2 : name === "catch" ? 1 : name === "finally" ? 1 : 0;
    if (node.arguments.length > maxArguments) return false;
    if (node.arguments.length < maxArguments) return true;
    return maxArguments === 1 || some(node.arguments, arg => {
        return arg.kind === SyntaxKind.NullKeyword || isIdentifier(arg) && arg.text === "undefined";
    });
}


function getKeyFromNode(exp: FunctionLikeDeclaration) {
    return `${exp.pos.toString()}:${exp.end.toString()}`;
}

function canBeConvertedToClass(node: Node, checker: TypeChecker): boolean {
    if (isFunctionExpression(node)) {
        if (isVariableDeclaration(node.parent) && node.symbol.members?.size) {
            return true;
        }
        console.debug("todo - codefix convertToClass");
        return false;
        // const symbol = checker.getSymbolOfExpando(node, /*allowDeclaration*/ false);
        // return !!(symbol && (symbol.exports?.size || symbol.members?.size));
    }

    if (isFunctionDeclaration(node)) {
        return !!node.symbol.members?.size;
    }

    return false;
}

/** @internal */
export function canBeConvertedToAsync(node: Node): node is FunctionDeclaration | MethodDeclaration | FunctionExpression | ArrowFunction {
    switch (node.kind) {
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ArrowFunction:
            return true;
        default:
            return false;
    }
}

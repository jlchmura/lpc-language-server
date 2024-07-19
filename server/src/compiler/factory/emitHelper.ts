import { ArrayLiteralExpression, Block, EntityName, Expression, FunctionExpression, Identifier, ParameterDeclaration } from "../_namespaces/lpc";

/** @internal */
export interface EmitHelperFactory {
    getUnscopedHelperName(name: string): Identifier;
    // TypeScript Helpers
    createDecorateHelper(decoratorExpressions: readonly Expression[], target: Expression, memberName?: Expression, descriptor?: Expression): Expression;
    createMetadataHelper(metadataKey: string, metadataValue: Expression): Expression;
    createParamHelper(expression: Expression, parameterOffset: number): Expression;
    // ES Decorators Helpers
    //createESDecorateHelper(ctor: Expression, descriptorIn: Expression, decorators: Expression, contextIn: ESDecorateContext, initializers: Expression, extraInitializers: Expression): Expression;
    createRunInitializersHelper(thisArg: Expression, initializers: Expression, value?: Expression): Expression;
    // ES2018 Helpers
    createAssignHelper(attributesSegments: readonly Expression[]): Expression;
    createAwaitHelper(expression: Expression): Expression;
    createAsyncGeneratorHelper(generatorFunc: FunctionExpression, hasLexicalThis: boolean): Expression;
    createAsyncDelegatorHelper(expression: Expression): Expression;
    createAsyncValuesHelper(expression: Expression): Expression;
    // ES2018 Destructuring Helpers
    //createRestHelper(value: Expression, elements: readonly BindingOrAssignmentElement[], computedTempVariables: readonly Expression[] | undefined, location: TextRange): Expression;
    // ES2017 Helpers
    createAwaiterHelper(hasLexicalThis: boolean, argumentsExpression: Expression | undefined, promiseConstructor: EntityName | Expression | undefined, parameters: readonly ParameterDeclaration[] | undefined, body: Block): Expression;
    // ES2015 Helpers
    createExtendsHelper(name: Identifier): Expression;
    createTemplateObjectHelper(cooked: ArrayLiteralExpression, raw: ArrayLiteralExpression): Expression;
    createSpreadArrayHelper(to: Expression, from: Expression, packFrom: boolean): Expression;
    createPropKeyHelper(expr: Expression): Expression;
    createSetFunctionNameHelper(f: Expression, name: Expression, prefix?: string): Expression;
    // ES2015 Destructuring Helpers
    createValuesHelper(expression: Expression): Expression;
    createReadHelper(iteratorRecord: Expression, count: number | undefined): Expression;
    // ES2015 Generator Helpers
    createGeneratorHelper(body: FunctionExpression): Expression;
    // ES Module Helpers
    createImportStarHelper(expression: Expression): Expression;
    createImportStarCallbackHelper(): Expression;
    createImportDefaultHelper(expression: Expression): Expression;
    createExportStarHelper(moduleExpression: Expression, exportsExpression?: Expression): Expression;
    // // Class Fields Helpers
    // createClassPrivateFieldGetHelper(receiver: Expression, state: Identifier, kind: PrivateIdentifierKind, f: Identifier | undefined): Expression;
    // createClassPrivateFieldSetHelper(receiver: Expression, state: Identifier, value: Expression, kind: PrivateIdentifierKind, f: Identifier | undefined): Expression;
    // createClassPrivateFieldInHelper(state: Identifier, receiver: Expression): Expression;
    // 'using' helpers
    createAddDisposableResourceHelper(envBinding: Expression, value: Expression, async: boolean): Expression;
    createDisposeResourcesHelper(envBinding: Expression): Expression;
}
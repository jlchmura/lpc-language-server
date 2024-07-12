import { CompilerOptions, Debug, FlowFlags, FlowLabel, FlowNode, HasLocals, IsBlockScopedContainer, IsContainer, Node, objectAllocator, SourceFile, SymbolFlags, Symbol, tracing, setParent } from "./_namespaces/lpc";


/** @internal */
export function bindSourceFile(file: SourceFile, options: CompilerOptions) {
    // performance.mark("beforeBind");
    // perfLogger?.logStartBindFile("" + file.fileName);
    //binder(file, options);
    // perfLogger?.logStopBindFile();
    // performance.mark("afterBind");
    // performance.measure("Bind", "beforeBind", "afterBind");
}

interface ActiveLabel {
    next: ActiveLabel | undefined;
    name: string;
    breakTarget: FlowLabel;
    continueTarget: FlowLabel | undefined;
    referenced: boolean;
}

/** @internal */
export function createFlowNode(flags: FlowFlags, node: unknown, antecedent: FlowNode | FlowNode[] | undefined): FlowNode {
    return Debug.attachFlowNodeDebugInfo({ flags, id: 0, node, antecedent } as FlowNode);
}

function createBinder(): (file: SourceFile, options: CompilerOptions) => void {
    // Why var? It avoids TDZ checks in the runtime which can be costly.
    // See: https://github.com/microsoft/TypeScript/issues/52924
    /* eslint-disable no-var */
    var file: SourceFile;
    var options: CompilerOptions;
    var parent: Node;
    var container: IsContainer;// | EntityNameExpression;
    var parentContainer: IsContainer;// | EntityNameExpression; // Container one level up
    var blockScopeContainer: IsBlockScopedContainer;
    var lastContainer: HasLocals;
    //var delayedTypeAliases: (JSDocTypedefTag | JSDocCallbackTag | JSDocEnumTag)[];
    var seenThisKeyword: boolean;
    //var jsDocImports: JSDocImportTag[];

    // state used by control flow analysis
    var currentFlow: FlowNode;
    var currentBreakTarget: FlowLabel | undefined;
    var currentContinueTarget: FlowLabel | undefined;
    var currentReturnTarget: FlowLabel | undefined;
    var currentTrueTarget: FlowLabel | undefined;
    var currentFalseTarget: FlowLabel | undefined;
    var currentExceptionTarget: FlowLabel | undefined;
    var preSwitchCaseFlow: FlowNode | undefined;
    var activeLabelList: ActiveLabel | undefined;
    var hasExplicitReturn: boolean;
    var hasFlowEffects: boolean;

    var inStrictMode: boolean;

    // If we are binding an assignment pattern, we will bind certain expressions differently.
    var inAssignmentPattern = false;

    var symbolCount = 0;

    var Symbol: new (flags: SymbolFlags, name: string) => Symbol;
    var classifiableNames: Set<string>;

    var unreachableFlow = createFlowNode(
        FlowFlags.Unreachable,
        /*node*/ undefined,
        /*antecedent*/ undefined
    );
    var reportedUnreachableFlow = createFlowNode(
        FlowFlags.Unreachable,
        /*node*/ undefined,
        /*antecedent*/ undefined
    );
        
    return bindSourceFile;

    function bindSourceFile(f: SourceFile, opts: CompilerOptions) {
        file = f;
        options = opts;        
        Symbol = objectAllocator.getSymbolConstructor();
        classifiableNames = new Set<string>();

        // Attach debugging information if necessary
        Debug.attachFlowNodeDebugInfo(unreachableFlow);
        Debug.attachFlowNodeDebugInfo(reportedUnreachableFlow);

        if (!file.locals) {
            tracing?.push(tracing.Phase.Bind, "bindSourceFile", { path: file.path }, /*separateBeginAndEnd*/ true);
            bind(file);
            tracing?.pop();
            // file.symbolCount = symbolCount;
            // file.classifiableNames = classifiableNames;
            // delayedBindJSDocTypedefTag();
            // bindJSDocImports();
        }

        file = undefined!;
        options = undefined!;
        //languageVersion = undefined!;
        parent = undefined!;
        container = undefined!;
        parentContainer = undefined!;
        blockScopeContainer = undefined!;
        lastContainer = undefined!;
        // delayedTypeAliases = undefined!;
        // jsDocImports = undefined!;
        seenThisKeyword = false;
        currentFlow = undefined!;
        currentBreakTarget = undefined;
        currentContinueTarget = undefined;
        currentReturnTarget = undefined;
        currentTrueTarget = undefined;
        currentFalseTarget = undefined;
        currentExceptionTarget = undefined;
        activeLabelList = undefined;
        hasExplicitReturn = false;
        hasFlowEffects = false;
        inAssignmentPattern = false;
        //emitFlags = NodeFlags.None;      
    }

    function bind(node:Node|undefined): void {
        if (!node) return;

        setParent(node, parent);
    }
}


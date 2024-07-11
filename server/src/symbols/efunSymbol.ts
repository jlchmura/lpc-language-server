import { IType, TypeKind } from "antlr4-c3";
import {
    IEvaluatableSymbol,
    IKindSymbol,
    ObjectReferenceInfo,
    getSymbolsOfTypeSync,
} from "./base";
import { MethodSymbol } from "./methodSymbol";
import { LpcTypes, SymbolKind } from "../types";
import { MethodParameterSymbol } from "./variableSymbol";
import {
    ArrayStackValue,
    CallStack,
    RootFrame,
    StackValue,
} from "../backend/CallStack";
import { asStackValue } from "../backend/CallStackUtils";
import { ContextSymbolTable } from "../backend/ContextSymbolTable";
import { ensureLpcConfig } from "../backend/LpcConfig";

export class EfunSymbol
    extends MethodSymbol
    implements IKindSymbol, IEvaluatableSymbol
{
    public constructor(
        name: string,
        public returnType?: IType,
        public functionModifiers: Set<string> = new Set()
    ) {
        super(name);
    }
    public get kind() {
        return SymbolKind.Efun;
    }

    public getParametersSync() {
        return getSymbolsOfTypeSync(
            this,
            MethodParameterSymbol
        ) as MethodParameterSymbol[];
    }

    eval(
        stack: CallStack,
        args: IEvaluatableSymbol[] = [],
        callScope?: RootFrame
    ) {
        const ownerProgram = (stack.root.symbol as ContextSymbolTable)?.owner;
        if (!ownerProgram) {
            return asStackValue(undefined, LpcTypes.objectType, this);
        }

        const { fileHandler } = ownerProgram;

        const argEval = args?.map((a) => {
            return a?.eval(stack, callScope) as StackValue;
        });

        const config = ensureLpcConfig();

        // handle special efuns cases
        switch (this.name) {
            // NTBLA: put current object on the stack and return that instead of loading a new
            // instance of the object
            case "first_inventory":
            case "next_inventory":
                return new StackValue(undefined, LpcTypes.objectType, this);
            case "this_object":
                return new StackValue(
                    new ObjectReferenceInfo(
                        ownerProgram.fileName,
                        true,
                        ownerProgram
                    ),
                    LpcTypes.objectType,
                    this
                );
            // TODO: this is just a quick hack to get the player object
            // need a better way to check if references are already loaded.
            case "this_interactive":
            case "this_user":
            case "this_player":
                const playerCtx = fileHandler.loadReference(
                    config.files.player,
                    this
                );

                return new StackValue(
                    new ObjectReferenceInfo(
                        playerCtx?.fileName,
                        true,
                        playerCtx
                    ),
                    LpcTypes.objectType,
                    this
                );
            case "filter":
                // just return the first argument to maintain array reference
                return argEval[0];
            case "users":
                const playerUsersCtx = fileHandler.loadReference(
                    config.files.player,
                    this
                );

                const playerObj = new ObjectReferenceInfo(
                    playerUsersCtx?.fileName,
                    true,
                    playerUsersCtx
                );
                return asStackValue(
                    [playerObj],
                    LpcTypes.objectArrayType,
                    this
                );
                break;
            case "explode":
                const str = argEval[0];
                const delim = argEval[1];
                const strVal = str?.value ?? 0;
                const delimVal = delim?.value;

                if (
                    str?.type?.name != "string" ||
                    delim?.type?.name != "string"
                ) {
                    return undefined;
                }
                if (strVal == 0 || delimVal == 0 || typeof strVal != "string") {
                    return undefined;
                }

                return new ArrayStackValue<string>(
                    (strVal as string)
                        ?.split(delimVal)
                        .map((s) => asStackValue(s, LpcTypes.stringType, this)),
                    LpcTypes.stringArrayType,
                    this
                );
            case "new":
            case "clone_object":
                return cloneObjectImpl(stack, argEval, callScope, this);
            case "previous_object":
                return previousObjectImpl(stack);
        }

        return undefined;
    }

    public allowsMultiArgs() {
        const prms = this.getParametersSync();
        if (prms.length === 0) return false;
        return prms[prms.length - 1].varArgs;
    }
}

function previousObjectImpl(stack: CallStack) {
    const filename = stack.peek().filename;
    let symbol = stack.peek().symbol;

    for (let i = stack.length - 1; i >= 0; i--) {
        const frame = stack.at(i);
        if (frame.filename != filename) {
            symbol = frame.symbol;
            break;
        }
    }

    const ownerCtx = (symbol?.symbolTable as ContextSymbolTable)?.owner;
    const info = new ObjectReferenceInfo();
    info.context = ownerCtx;
    info.filename = ownerCtx?.fileName;
    info.isLoaded = !!ownerCtx;
    return asStackValue(info);
}

function cloneObjectImpl(
    stack: CallStack,
    argVals: StackValue[],
    callScope: RootFrame,
    symbol: EfunSymbol
) {
    const ownerProgram = (stack.root.symbol as ContextSymbolTable)?.owner;
    if (!ownerProgram) {
        return asStackValue(undefined, LpcTypes.objectType, symbol);
    }

    const { fileHandler } = ownerProgram;

    // what type is the first arg?
    const firstArg = argVals.at(0);
    if (!firstArg) {
        return undefined;
    }

    if (firstArg.type.kind == TypeKind.String) {
        const filename = firstArg.value;
        const ctx = fileHandler.loadReference(filename, symbol);
        if (!ctx) {
            return undefined;
        }

        const info = new ObjectReferenceInfo();
        info.filename = filename;
        info.isLoaded = true;
        info.context = ctx;
        return asStackValue(info);
    }
}

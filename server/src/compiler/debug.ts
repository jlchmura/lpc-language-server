import * as lpc from "./_namespaces/lpc.js";
import { AnyFunction, AssertionLevel, Node, NodeArray, objectAllocator, Type,Symbol, SymbolFlags, symbolName, SortedReadonlyArray, compareValues, stableSort, TypeFlags, hasProperty } from "./_namespaces/lpc";

/** @internal */
export enum LogLevel {
    Off,
    Error,
    Warning,
    Info,
    Verbose,
}

/** @internal */
export interface LoggingHost {
    log(level: LogLevel, s: string): void;
}

export namespace Debug {
    let isDebugInfoEnabled = false;
    let currentAssertionLevel = AssertionLevel.None;
    export let currentLogLevel = LogLevel.Warning;
    export let isDebugging = false;
    export let loggingHost: LoggingHost | undefined;

    
    let nodeArrayProto: NodeArray<Node> | undefined;

    export function attachNodeArrayDebugInfo(array: NodeArray<Node>) {
        if (isDebugInfoEnabled) {
            if (typeof Object.setPrototypeOf === "function") {
                // if we're in es2015, attach the method to a shared prototype for `NodeArray`
                // so the method doesn't show up in the watch window.
                if (!nodeArrayProto) {
                    nodeArrayProto = Object.create(Array.prototype) as NodeArray<Node>;
                    attachNodeArrayDebugInfoWorker(nodeArrayProto);
                }
                Object.setPrototypeOf(array, nodeArrayProto);
            }
            else {
                // not running in an es2015 environment, attach the method directly.
                attachNodeArrayDebugInfoWorker(array);
            }
        }
    }

    function attachNodeArrayDebugInfoWorker(array: NodeArray<Node>) {
        if (!("__tsDebuggerDisplay" in array)) { // eslint-disable-line local/no-in-operator
            Object.defineProperties(array, {
                __tsDebuggerDisplay: {
                    value(this: NodeArray<Node>, defaultValue: string) {
                        // An `Array` with extra properties is rendered as `[A, B, prop1: 1, prop2: 2]`. Most of
                        // these aren't immediately useful so we trim off the `prop1: ..., prop2: ...` part from the
                        // formatted string.
                        // This regex can trigger slow backtracking because of overlapping potential captures.
                        // We don't care, this is debug code that's only enabled with a debugger attached -
                        // we're just taking note of it for anyone checking regex performance in the future.
                        defaultValue = String(defaultValue).replace(/(?:,[\s\w\d_]+:[^,]+)+\]$/, "]");
                        return `NodeArray ${defaultValue}`;
                    },
                },
            });
        }
    }
    
    export function fail(message?: string, stackCrawlMark?: AnyFunction): never {
        // eslint-disable-next-line no-debugger
        debugger;
        const e = new Error(message ? `Debug Failure. ${message}` : "Debug Failure.");
        if ((Error as any).captureStackTrace) {
            (Error as any).captureStackTrace(e, stackCrawlMark || fail);
        }
        throw e;
    }
    
    export function assertIsDefined<T>(value: T, message?: string, stackCrawlMark?: AnyFunction): asserts value is NonNullable<T> {
        // eslint-disable-next-line no-restricted-syntax
        if (value === undefined || value === null) {
            fail(message, stackCrawlMark || assertIsDefined);
        }
    }

    /**
     * Formats an enum value as a string for debugging and debug assertions.
     */
    export function formatEnum(value = 0, enumObject: any, isFlags?: boolean) {
        const members = getEnumMembers(enumObject);
        if (value === 0) {
            return members.length > 0 && members[0][0] === 0 ? members[0][1] : "0";
        }
        if (isFlags) {
            const result: string[] = [];
            let remainingFlags = value;
            for (const [enumValue, enumName] of members) {
                if (enumValue > value) {
                    break;
                }
                if (enumValue !== 0 && enumValue & value) {
                    result.push(enumName);
                    remainingFlags &= ~enumValue;
                }
            }
            if (remainingFlags === 0) {
                return result.join("|");
            }
        }
        else {
            for (const [enumValue, enumName] of members) {
                if (enumValue === value) {
                    return enumName;
                }
            }
        }
        return value.toString();
    }

    const enumMemberCache = new Map<any, SortedReadonlyArray<[number, string]>>();

    function getEnumMembers(enumObject: any) {
        // Assuming enum objects do not change at runtime, we can cache the enum members list
        // to reuse later. This saves us from reconstructing this each and every time we call
        // a formatting function (which can be expensive for large enums like SyntaxKind).
        const existing = enumMemberCache.get(enumObject);
        if (existing) {
            return existing;
        }

        const result: [number, string][] = [];
        for (const name in enumObject) {
            const value = enumObject[name];
            if (typeof value === "number") {
                result.push([value, name]);
            }
        }

        const sorted = stableSort<[number, string]>(result, (x, y) => compareValues(x[0], y[0]));
        enumMemberCache.set(enumObject, sorted);
        return sorted;
    }

    export function formatSymbolFlags(flags: SymbolFlags | undefined): string {
        return formatEnum(flags, (lpc as any).SymbolFlags, /*isFlags*/ true);
    }

    /**
     * Injects debug information into frequently used types.
     */
    export function enableDebugInfo() {
        if (isDebugInfoEnabled) return;

        // avoid recomputing
        const weakTypeTextMap = new WeakMap<Type, string>();
        const weakNodeTextMap = new WeakMap<Node, string>();

        // Add additional properties in debug mode to assist with debugging.
        Object.defineProperties(objectAllocator.getSymbolConstructor().prototype, {
            // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
            __tsDebuggerDisplay: {
                value(this: Symbol) {
                    const symbolHeader = this.flags & SymbolFlags.Transient ? "TransientSymbol" :
                        "Symbol";
                    const remainingSymbolFlags = this.flags & ~SymbolFlags.Transient;
                    return `${symbolHeader} '${symbolName(this)}'${remainingSymbolFlags ? ` (${formatSymbolFlags(remainingSymbolFlags)})` : ""}`;
                },
            },
            __debugFlags: {
                get(this: Symbol) {
                    return formatSymbolFlags(this.flags);
                },
            },
        });

        // Object.defineProperties(objectAllocator.getTypeConstructor().prototype, {
        //     // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
        //     __tsDebuggerDisplay: {
        //         value(this: Type) {
        //             const typeHeader = this.flags & TypeFlags.Intrinsic ? `IntrinsicType ${(this as IntrinsicType).intrinsicName}${(this as IntrinsicType).debugIntrinsicName ? ` (${(this as IntrinsicType).debugIntrinsicName})` : ""}` :
        //                 this.flags & TypeFlags.Nullable ? "NullableType" :
        //                 this.flags & TypeFlags.StringOrNumberLiteral ? `LiteralType ${JSON.stringify((this as LiteralType).value)}` :                        
        //                 this.flags & TypeFlags.Union ? "UnionType" :                        
        //                 this.flags & TypeFlags.Index ? "IndexType" :
        //                 this.flags & TypeFlags.IndexedAccess ? "IndexedAccessType" :
        //                 this.flags & TypeFlags.Conditional ? "ConditionalType" :
        //                 this.flags & TypeFlags.Substitution ? "SubstitutionType" :
        //                 this.flags & TypeFlags.TypeParameter ? "TypeParameter" :
        //                 this.flags & TypeFlags.Object ?
        //                 (this as ObjectType).objectFlags & ObjectFlags.ClassOrInterface ? "InterfaceType" :
        //                     (this as ObjectType).objectFlags & ObjectFlags.Reference ? "TypeReference" :
        //                     (this as ObjectType).objectFlags & ObjectFlags.Tuple ? "TupleType" :
        //                     (this as ObjectType).objectFlags & ObjectFlags.Anonymous ? "AnonymousType" :
        //                     (this as ObjectType).objectFlags & ObjectFlags.Mapped ? "MappedType" :
        //                     (this as ObjectType).objectFlags & ObjectFlags.ReverseMapped ? "ReverseMappedType" :
        //                     (this as ObjectType).objectFlags & ObjectFlags.EvolvingArray ? "EvolvingArrayType" :
        //                     "ObjectType" :
        //                 "Type";
        //             const remainingObjectFlags = this.flags & TypeFlags.Object ? (this as ObjectType).objectFlags & ~ObjectFlags.ObjectTypeKindMask : 0;
        //             return `${typeHeader}${this.symbol ? ` '${symbolName(this.symbol)}'` : ""}${remainingObjectFlags ? ` (${formatObjectFlags(remainingObjectFlags)})` : ""}`;
        //         },
        //     },
        //     __debugFlags: {
        //         get(this: Type) {
        //             return formatTypeFlags(this.flags);
        //         },
        //     },
        //     __debugObjectFlags: {
        //         get(this: Type) {
        //             return this.flags & TypeFlags.Object ? formatObjectFlags((this as ObjectType).objectFlags) : "";
        //         },
        //     },
        //     __debugTypeToString: {
        //         value(this: Type) {
        //             // avoid recomputing
        //             let text = weakTypeTextMap.get(this);
        //             if (text === undefined) {
        //                 text = this.checker.typeToString(this);
        //                 weakTypeTextMap.set(this, text);
        //             }
        //             return text;
        //         },
        //     },
        // });

        // Object.defineProperties(objectAllocator.getSignatureConstructor().prototype, {
        //     __debugFlags: {
        //         get(this: Signature) {
        //             return formatSignatureFlags(this.flags);
        //         },
        //     },
        //     __debugSignatureToString: {
        //         value(this: Signature) {
        //             return this.checker?.signatureToString(this);
        //         },
        //     },
        // });

        const nodeConstructors = [
            objectAllocator.getNodeConstructor(),
            objectAllocator.getIdentifierConstructor(),
            objectAllocator.getTokenConstructor(),
            objectAllocator.getSourceFileConstructor(),
        ];

        // for (const ctor of nodeConstructors) {
        //     if (!hasProperty(ctor.prototype, "__debugKind")) {
        //         Object.defineProperties(ctor.prototype, {
        //             // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
        //             __tsDebuggerDisplay: {
        //                 value(this: Node) {
        //                     const nodeHeader = isIdentifier(this) ? `Identifier '${idText(this)}'` :
        //                         //isPrivateIdentifier(this) ? `PrivateIdentifier '${idText(this)}'` :
        //                         isStringLiteral(this) ? `StringLiteral ${JSON.stringify(this.text.length < 10 ? this.text : this.text.slice(10) + "...")}` :
        //                         isNumericLiteral(this) ? `NumericLiteral ${this.text}` :                                
        //                         isTypeParameterDeclaration(this) ? "TypeParameterDeclaration" :
        //                         isParameter(this) ? "ParameterDeclaration" :                                
        //                         isCallSignatureDeclaration(this) ? "CallSignatureDeclaration" :                                
        //                         isIndexSignatureDeclaration(this) ? "IndexSignatureDeclaration" :
        //                         //isTypePredicateNode(this) ? "TypePredicateNode" :
        //                         //isTypeReferenceNode(this) ? "TypeReferenceNode" :
        //                         //isFunctionTypeNode(this) ? "FunctionTypeNode" :                                                                
        //                         isTypeLiteralNode(this) ? "TypeLiteralNode" :
        //                         isArrayTypeNode(this) ? "ArrayTypeNode" :                                                                
        //                         //isRestTypeNode(this) ? "RestTypeNode" :
        //                         isUnionTypeNode(this) ? "UnionTypeNode" :                                                                                                
        //                         //isParenthesizedTypeNode(this) ? "ParenthesizedTypeNode" :                                
        //                         //isTypeOperatorNode(this) ? "TypeOperatorNode" :
        //                         isIndexedAccessTypeNode(this) ? "IndexedAccessTypeNode" :
        //                         //isMappedTypeNode(this) ? "MappedTypeNode" :
        //                         isLiteralTypeNode(this) ? "LiteralTypeNode" :                                
        //                         isImportTypeNode(this) ? "ImportTypeNode" :
        //                         formatSyntaxKind(this.kind);
        //                     return `${nodeHeader}${this.flags ? ` (${formatNodeFlags(this.flags)})` : ""}`;
        //                 },
        //             },
        //             __debugKind: {
        //                 get(this: Node) {
        //                     return formatSyntaxKind(this.kind);
        //                 },
        //             },
        //             __debugNodeFlags: {
        //                 get(this: Node) {
        //                     return formatNodeFlags(this.flags);
        //                 },
        //             },
        //             __debugModifierFlags: {
        //                 get(this: Node) {
        //                     return formatModifierFlags(getEffectiveModifierFlagsNoCache(this));
        //                 },
        //             },
        //             // __debugTransformFlags: {
        //             //     get(this: Node) {
        //             //         return formatTransformFlags(this.transformFlags);
        //             //     },
        //             // },
        //             __debugIsParseTreeNode: {
        //                 get(this: Node) {
        //                     return isParseTreeNode(this);
        //                 },
        //             },
        //             // __debugEmitFlags: {
        //             //     get(this: Node) {
        //             //         return formatEmitFlags(getEmitFlags(this));
        //             //     },
        //             // },
        //             __debugGetText: {
        //                 value(this: Node, includeTrivia?: boolean) {
        //                     if (nodeIsSynthesized(this)) return "";
        //                     // avoid recomputing
        //                     let text = weakNodeTextMap.get(this);
        //                     if (text === undefined) {
        //                         const parseNode = getParseTreeNode(this);
        //                         const sourceFile = parseNode && getSourceFileOfNode(parseNode);
        //                         text = sourceFile ? getSourceTextOfNodeFromSourceFile(sourceFile, parseNode, includeTrivia) : "";
        //                         weakNodeTextMap.set(this, text);
        //                     }
        //                     return text;
        //                 },
        //             },
        //         });
        //     }
        // }

        isDebugInfoEnabled = true;
    }

    export function assertEqual<T>(a: T, b: T, msg?: string, msg2?: string, stackCrawlMark?: AnyFunction): void {
        if (a !== b) {
            const message = msg ? msg2 ? `${msg} ${msg2}` : msg : "";
            fail(`Expected ${a} === ${b}. ${message}`, stackCrawlMark || assertEqual);
        }
    }
    
    export function assertGreaterThanOrEqual(a: number, b: number, stackCrawlMark?: AnyFunction): void {
        if (a < b) {
            fail(`Expected ${a} >= ${b}`, stackCrawlMark || assertGreaterThanOrEqual);
        }
    }

    export function assertLessThanOrEqual(a: number, b: number, stackCrawlMark?: AnyFunction): void {
        if (a > b) {
            fail(`Expected ${a} <= ${b}`, stackCrawlMark || assertLessThanOrEqual);
        }
    }

    export function checkDefined<T>(value: T | null | undefined, message?: string, stackCrawlMark?: AnyFunction): T { // eslint-disable-line no-restricted-syntax
        assertIsDefined(value, message, stackCrawlMark || checkDefined);
        return value;
    }
}
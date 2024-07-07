import * as __types from "./types";
import {
    AnyFunction,
    AssertionLevel,
    compareValues,
    hasProperty,
    noop,
    stableSort,
} from "./core";
import { SortedReadonlyArray } from "./corePublic";
import { FlowFlags, FlowNode, MatchingKeys, Node, SyntaxKind } from "./types";
import { getSourceFileOfNode } from "./utilities";

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

// prettier-ignore
export namespace Debug {
    type AssertionKeys = MatchingKeys<typeof Debug, AnyFunction>;
    const assertionCache: Partial<Record<AssertionKeys, { level: AssertionLevel; assertion: AnyFunction; }>> = {};

    let currentAssertionLevel = AssertionLevel.None;
    export let currentLogLevel = LogLevel.Warning;
    export let isDebugging = false;
    export let loggingHost: LoggingHost | undefined;

    export function fail(message?: string, stackCrawlMark?: AnyFunction): never {
        // eslint-disable-next-line no-debugger
        debugger;
        const e = new Error(message ? `Debug Failure. ${message}` : "Debug Failure.");
        if ((Error as any).captureStackTrace) {
            (Error as any).captureStackTrace(e, stackCrawlMark || fail);
        }
        throw e;
    }
    
    export function assert(expression: unknown, message?: string, verboseDebugInfo?: string | (() => string), stackCrawlMark?: AnyFunction): asserts expression {
        if (!expression) {
            message = message ? `False expression: ${message}` : "False expression.";
            if (verboseDebugInfo) {
                message += "\r\nVerbose Debug Information: " + (typeof verboseDebugInfo === "string" ? verboseDebugInfo : verboseDebugInfo());
            }
            fail(message, stackCrawlMark || assert);
        }
    }

    export function assertEqual<T>(a: T, b: T, msg?: string, msg2?: string, stackCrawlMark?: AnyFunction): void {
        if (a !== b) {
            const message = msg ? msg2 ? `${msg} ${msg2}` : msg : "";
            fail(`Expected ${a} === ${b}. ${message}`, stackCrawlMark || assertEqual);
        }
    }

    export function assertIsDefined<T>(value: T, message?: string, stackCrawlMark?: AnyFunction): asserts value is NonNullable<T> {
        // eslint-disable-next-line no-restricted-syntax
        if (value === undefined || value === null) {
            fail(message, stackCrawlMark || assertIsDefined);
        }
    }

    export function shouldAssert(level: AssertionLevel): boolean {
        return currentAssertionLevel >= level;
    }

     /**
     * Tests whether an assertion function should be executed. If it shouldn't, it is cached and replaced with `ts.noop`.
     * Replaced assertion functions are restored when `Debug.setAssertionLevel` is set to a high enough level.
     * @param level The minimum assertion level required.
     * @param name The name of the current assertion function.
     */
     function shouldAssertFunction<K extends AssertionKeys>(level: AssertionLevel, name: K): boolean {
        if (!shouldAssert(level)) {
            assertionCache[name] = { level, assertion: Debug[name] };
            (Debug as any)[name] = noop;
            return false;
        }
        return true;
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
    
    export function formatFlowFlags(flags: FlowFlags | undefined): string {
        return formatEnum(flags, (__types as any).FlowFlags, /*isFlags*/ true);
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

    export function formatSyntaxKind(kind: SyntaxKind | undefined): string {
        return formatEnum(kind, (__types as any).SyntaxKind, /*isFlags*/ false);
    }

    export function getFunctionName(func: AnyFunction) {
        if (typeof func !== "function") {
            return "";
        }
        else if (hasProperty(func, "name")) {
            return (func as any).name;
        }
        else {
            const text = Function.prototype.toString.call(func);
            const match = /^function\s+([\w$]+)\s*\(/.exec(text);
            return match ? match[1] : "";
        }
    }
    
    export function assertNotNode<T extends Node, U extends T>(node: T | undefined, test: (node: Node) => node is U, message?: string, stackCrawlMark?: AnyFunction): asserts node is Exclude<T, U>;
    export function assertNotNode(node: Node | undefined, test: ((node: Node) => boolean) | undefined, message?: string, stackCrawlMark?: AnyFunction): void;
    export function assertNotNode(node: Node | undefined, test: ((node: Node) => boolean) | undefined, message?: string, stackCrawlMark?: AnyFunction) {
        if (shouldAssertFunction(AssertionLevel.Normal, "assertNotNode")) {
            assert(
                node === undefined || test === undefined || !test(node),
                message || "Unexpected node.",
                () => `Node ${formatSyntaxKind(node!.kind)} should not have passed test '${getFunctionName(test!)}'.`,
                stackCrawlMark || assertNotNode,
            );
        }
    }

    let isDebugInfoEnabled = false;

    let flowNodeProto: FlowNode | undefined;

    function attachFlowNodeDebugInfoWorker(flowNode: FlowNode) {
        if (!("__debugFlowFlags" in flowNode)) { // eslint-disable-line local/no-in-operator
            Object.defineProperties(flowNode, {
                // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
                __tsDebuggerDisplay: {
                    value(this: FlowNode) {
                        const flowHeader = this.flags & FlowFlags.Start ? "FlowStart" :
                            this.flags & FlowFlags.BranchLabel ? "FlowBranchLabel" :
                            this.flags & FlowFlags.LoopLabel ? "FlowLoopLabel" :
                            this.flags & FlowFlags.Assignment ? "FlowAssignment" :
                            this.flags & FlowFlags.TrueCondition ? "FlowTrueCondition" :
                            this.flags & FlowFlags.FalseCondition ? "FlowFalseCondition" :
                            this.flags & FlowFlags.SwitchClause ? "FlowSwitchClause" :
                            this.flags & FlowFlags.ArrayMutation ? "FlowArrayMutation" :
                            this.flags & FlowFlags.Call ? "FlowCall" :
                            this.flags & FlowFlags.ReduceLabel ? "FlowReduceLabel" :
                            this.flags & FlowFlags.Unreachable ? "FlowUnreachable" :
                            "UnknownFlow";
                        const remainingFlags = this.flags & ~(FlowFlags.Referenced - 1);
                        return `${flowHeader}${remainingFlags ? ` (${formatFlowFlags(remainingFlags)})` : ""}`;
                    },
                },
                __debugFlowFlags: {
                    get(this: FlowNode) {
                        return formatEnum(this.flags, (__types as any).FlowFlags, /*isFlags*/ true);
                    },
                },
                __debugToString: {
                    value(this: FlowNode) {
                        return "";// TODO return formatControlFlowGraph(this);
                    },
                },
            });
        }
    }


    // export function attachFlowNodeDebugInfo(flowNode: FlowNode) {
    //     if (isDebugInfoEnabled) {
    //         if (typeof Object.setPrototypeOf === "function") {
    //             // if we're in es2015, attach the method to a shared prototype for `FlowNode`
    //             // so the method doesn't show up in the watch window.
    //             if (!flowNodeProto) {
    //                 flowNodeProto = Object.create(Object.prototype) as FlowNode;
    //                 attachFlowNodeDebugInfoWorker(flowNodeProto);
    //             }
    //             Object.setPrototypeOf(flowNode, flowNodeProto);
    //         }
    //         else {
    //             // not running in an es2015 environment, attach the method directly.
    //             attachFlowNodeDebugInfoWorker(flowNode);
    //         }
    //     }
    //     return flowNode;
    // }

    // export function formatControlFlowGraph(flowNode: FlowNode) {
    //     let nextDebugFlowId = -1;

    //     function getDebugFlowNodeId(f: FlowNode) {
    //         if (!f.id) {
    //             f.id = nextDebugFlowId;
    //             nextDebugFlowId--;
    //         }
    //         return f.id;
    //     }

    //     const enum BoxCharacter {
    //         lr = "─",
    //         ud = "│",
    //         dr = "╭",
    //         dl = "╮",
    //         ul = "╯",
    //         ur = "╰",
    //         udr = "├",
    //         udl = "┤",
    //         dlr = "┬",
    //         ulr = "┴",
    //         udlr = "╫",
    //     }

    //     const enum Connection {
    //         None = 0,
    //         Up = 1 << 0,
    //         Down = 1 << 1,
    //         Left = 1 << 2,
    //         Right = 1 << 3,

    //         UpDown = Up | Down,
    //         LeftRight = Left | Right,
    //         UpLeft = Up | Left,
    //         UpRight = Up | Right,
    //         DownLeft = Down | Left,
    //         DownRight = Down | Right,
    //         UpDownLeft = UpDown | Left,
    //         UpDownRight = UpDown | Right,
    //         UpLeftRight = Up | LeftRight,
    //         DownLeftRight = Down | LeftRight,
    //         UpDownLeftRight = UpDown | LeftRight,

    //         NoChildren = 1 << 4,
    //     }

    //     interface FlowGraphNode {
    //         id: number;
    //         flowNode: FlowNode;
    //         edges: FlowGraphEdge[];
    //         text: string;
    //         lane: number;
    //         endLane: number;
    //         level: number;
    //         circular: boolean | "circularity";
    //     }

    //     interface FlowGraphEdge {
    //         source: FlowGraphNode;
    //         target: FlowGraphNode;
    //     }

    //     const hasAntecedentFlags = FlowFlags.Assignment |
    //         FlowFlags.Condition |
    //         FlowFlags.SwitchClause |
    //         FlowFlags.ArrayMutation |
    //         FlowFlags.Call |
    //         FlowFlags.ReduceLabel;

    //     const hasNodeFlags = FlowFlags.Start |
    //         FlowFlags.Assignment |
    //         FlowFlags.Call |
    //         FlowFlags.Condition |
    //         FlowFlags.ArrayMutation;

    //     const links: Record<number, FlowGraphNode> = Object.create(/*o*/ null); // eslint-disable-line no-restricted-syntax
    //     const nodes: FlowGraphNode[] = [];
    //     const edges: FlowGraphEdge[] = [];
    //     const root = buildGraphNode(flowNode, new Set());
    //     for (const node of nodes) {
    //         node.text = renderFlowNode(node.flowNode, node.circular);
    //         computeLevel(node);
    //     }

    //     const height = computeHeight(root);
    //     const columnWidths = computeColumnWidths(height);
    //     computeLanes(root, 0);
    //     return renderGraph();

    //     function isFlowSwitchClause(f: FlowNode): f is FlowSwitchClause {
    //         return !!(f.flags & FlowFlags.SwitchClause);
    //     }

    //     function hasAntecedents(f: FlowNode): f is FlowLabel & { antecedent: FlowNode[]; } {
    //         return !!(f.flags & FlowFlags.Label) && !!(f as FlowLabel).antecedent;
    //     }

    //     function hasAntecedent(f: FlowNode): f is Extract<FlowNode, { antecedent: FlowNode; }> {
    //         return !!(f.flags & hasAntecedentFlags);
    //     }

    //     function hasNode(f: FlowNode): f is Extract<FlowNode, { node?: Node; }> {
    //         return !!(f.flags & hasNodeFlags);
    //     }

    //     function getChildren(node: FlowGraphNode) {
    //         const children: FlowGraphNode[] = [];
    //         for (const edge of node.edges) {
    //             if (edge.source === node) {
    //                 children.push(edge.target);
    //             }
    //         }
    //         return children;
    //     }

    //     function getParents(node: FlowGraphNode) {
    //         const parents: FlowGraphNode[] = [];
    //         for (const edge of node.edges) {
    //             if (edge.target === node) {
    //                 parents.push(edge.source);
    //             }
    //         }
    //         return parents;
    //     }

    //     function buildGraphNode(flowNode: FlowNode, seen: Set<FlowNode>): FlowGraphNode {
    //         const id = getDebugFlowNodeId(flowNode);
    //         let graphNode = links[id];
    //         if (graphNode && seen.has(flowNode)) {
    //             graphNode.circular = true;
    //             graphNode = {
    //                 id: -1,
    //                 flowNode,
    //                 edges: [],
    //                 text: "",
    //                 lane: -1,
    //                 endLane: -1,
    //                 level: -1,
    //                 circular: "circularity",
    //             };
    //             nodes.push(graphNode);
    //             return graphNode;
    //         }
    //         seen.add(flowNode);
    //         if (!graphNode) {
    //             links[id] = graphNode = { id, flowNode, edges: [], text: "", lane: -1, endLane: -1, level: -1, circular: false };
    //             nodes.push(graphNode);
    //             if (hasAntecedents(flowNode)) {
    //                 for (const antecedent of flowNode.antecedent) {
    //                     buildGraphEdge(graphNode, antecedent, seen);
    //                 }
    //             }
    //             else if (hasAntecedent(flowNode)) {
    //                 buildGraphEdge(graphNode, flowNode.antecedent, seen);
    //             }
    //         }
    //         seen.delete(flowNode);
    //         return graphNode;
    //     }

    //     function buildGraphEdge(source: FlowGraphNode, antecedent: FlowNode, seen: Set<FlowNode>) {
    //         const target = buildGraphNode(antecedent, seen);
    //         const edge: FlowGraphEdge = { source, target };
    //         edges.push(edge);
    //         source.edges.push(edge);
    //         target.edges.push(edge);
    //     }

    //     function computeLevel(node: FlowGraphNode): number {
    //         if (node.level !== -1) {
    //             return node.level;
    //         }
    //         let level = 0;
    //         for (const parent of getParents(node)) {
    //             level = Math.max(level, computeLevel(parent) + 1);
    //         }
    //         return node.level = level;
    //     }

    //     function computeHeight(node: FlowGraphNode): number {
    //         let height = 0;
    //         for (const child of getChildren(node)) {
    //             height = Math.max(height, computeHeight(child));
    //         }
    //         return height + 1;
    //     }

    //     function computeColumnWidths(height: number) {
    //         const columns: number[] = fill(Array(height), 0);
    //         for (const node of nodes) {
    //             columns[node.level] = Math.max(columns[node.level], node.text.length);
    //         }
    //         return columns;
    //     }

    //     function computeLanes(node: FlowGraphNode, lane: number) {
    //         if (node.lane === -1) {
    //             node.lane = lane;
    //             node.endLane = lane;
    //             const children = getChildren(node);
    //             for (let i = 0; i < children.length; i++) {
    //                 if (i > 0) lane++;
    //                 const child = children[i];
    //                 computeLanes(child, lane);
    //                 if (child.endLane > node.endLane) {
    //                     lane = child.endLane;
    //                 }
    //             }
    //             node.endLane = lane;
    //         }
    //     }

    //     function getHeader(flags: FlowFlags) {
    //         if (flags & FlowFlags.Start) return "Start";
    //         if (flags & FlowFlags.BranchLabel) return "Branch";
    //         if (flags & FlowFlags.LoopLabel) return "Loop";
    //         if (flags & FlowFlags.Assignment) return "Assignment";
    //         if (flags & FlowFlags.TrueCondition) return "True";
    //         if (flags & FlowFlags.FalseCondition) return "False";
    //         if (flags & FlowFlags.SwitchClause) return "SwitchClause";
    //         if (flags & FlowFlags.ArrayMutation) return "ArrayMutation";
    //         if (flags & FlowFlags.Call) return "Call";
    //         if (flags & FlowFlags.ReduceLabel) return "ReduceLabel";
    //         if (flags & FlowFlags.Unreachable) return "Unreachable";
    //         throw new Error();
    //     }

    //     function getNodeText(node: Node) {
    //         const sourceFile = getSourceFileOfNode(node);
    //         return getSourceTextOfNodeFromSourceFile(sourceFile, node, /*includeTrivia*/ false);
    //     }

    //     function renderFlowNode(flowNode: FlowNode, circular: boolean | "circularity") {
    //         let text = getHeader(flowNode.flags);
    //         if (circular) {
    //             text = `${text}#${getDebugFlowNodeId(flowNode)}`;
    //         }
    //         if (isFlowSwitchClause(flowNode)) {
    //             const clauses: string[] = [];
    //             const { switchStatement, clauseStart, clauseEnd } = flowNode.node;
    //             for (let i = clauseStart; i < clauseEnd; i++) {
    //                 const clause = switchStatement.caseBlock.clauses[i];
    //                 if (isDefaultClause(clause)) {
    //                     clauses.push("default");
    //                 }
    //                 else {
    //                     clauses.push(getNodeText(clause.expression));
    //                 }
    //             }
    //             text += ` (${clauses.join(", ")})`;
    //         }
    //         else if (hasNode(flowNode)) {
    //             if (flowNode.node) {
    //                 text += ` (${getNodeText(flowNode.node)})`;
    //             }
    //         }
    //         return circular === "circularity" ? `Circular(${text})` : text;
    //     }

    //     function renderGraph() {
    //         const columnCount = columnWidths.length;
    //         const laneCount = nodes.reduce((x, n) => Math.max(x, n.lane), 0) + 1;
    //         const lanes: string[] = fill(Array(laneCount), "");
    //         const grid: (FlowGraphNode | undefined)[][] = columnWidths.map(() => Array(laneCount));
    //         const connectors: Connection[][] = columnWidths.map(() => fill(Array(laneCount), 0));

    //         // build connectors
    //         for (const node of nodes) {
    //             grid[node.level][node.lane] = node;
    //             const children = getChildren(node);
    //             for (let i = 0; i < children.length; i++) {
    //                 const child = children[i];
    //                 let connector: Connection = Connection.Right;
    //                 if (child.lane === node.lane) connector |= Connection.Left;
    //                 if (i > 0) connector |= Connection.Up;
    //                 if (i < children.length - 1) connector |= Connection.Down;
    //                 connectors[node.level][child.lane] |= connector;
    //             }
    //             if (children.length === 0) {
    //                 connectors[node.level][node.lane] |= Connection.NoChildren;
    //             }
    //             const parents = getParents(node);
    //             for (let i = 0; i < parents.length; i++) {
    //                 const parent = parents[i];
    //                 let connector: Connection = Connection.Left;
    //                 if (i > 0) connector |= Connection.Up;
    //                 if (i < parents.length - 1) connector |= Connection.Down;
    //                 connectors[node.level - 1][parent.lane] |= connector;
    //             }
    //         }

    //         // fill in missing connectors
    //         for (let column = 0; column < columnCount; column++) {
    //             for (let lane = 0; lane < laneCount; lane++) {
    //                 const left = column > 0 ? connectors[column - 1][lane] : 0;
    //                 const above = lane > 0 ? connectors[column][lane - 1] : 0;
    //                 let connector = connectors[column][lane];
    //                 if (!connector) {
    //                     if (left & Connection.Right) connector |= Connection.LeftRight;
    //                     if (above & Connection.Down) connector |= Connection.UpDown;
    //                     connectors[column][lane] = connector;
    //                 }
    //             }
    //         }

    //         for (let column = 0; column < columnCount; column++) {
    //             for (let lane = 0; lane < lanes.length; lane++) {
    //                 const connector = connectors[column][lane];
    //                 const fill = connector & Connection.Left ? BoxCharacter.lr : " ";
    //                 const node = grid[column][lane];
    //                 if (!node) {
    //                     if (column < columnCount - 1) {
    //                         writeLane(lane, repeat(fill, columnWidths[column] + 1));
    //                     }
    //                 }
    //                 else {
    //                     writeLane(lane, node.text);
    //                     if (column < columnCount - 1) {
    //                         writeLane(lane, " ");
    //                         writeLane(lane, repeat(fill, columnWidths[column] - node.text.length));
    //                     }
    //                 }
    //                 writeLane(lane, getBoxCharacter(connector));
    //                 writeLane(lane, connector & Connection.Right && column < columnCount - 1 && !grid[column + 1][lane] ? BoxCharacter.lr : " ");
    //             }
    //         }

    //         return `\n${lanes.join("\n")}\n`;

    //         function writeLane(lane: number, text: string) {
    //             lanes[lane] += text;
    //         }
    //     }

    //     function getBoxCharacter(connector: Connection) {
    //         switch (connector) {
    //             case Connection.UpDown:
    //                 return BoxCharacter.ud;
    //             case Connection.LeftRight:
    //                 return BoxCharacter.lr;
    //             case Connection.UpLeft:
    //                 return BoxCharacter.ul;
    //             case Connection.UpRight:
    //                 return BoxCharacter.ur;
    //             case Connection.DownLeft:
    //                 return BoxCharacter.dl;
    //             case Connection.DownRight:
    //                 return BoxCharacter.dr;
    //             case Connection.UpDownLeft:
    //                 return BoxCharacter.udl;
    //             case Connection.UpDownRight:
    //                 return BoxCharacter.udr;
    //             case Connection.UpLeftRight:
    //                 return BoxCharacter.ulr;
    //             case Connection.DownLeftRight:
    //                 return BoxCharacter.dlr;
    //             case Connection.UpDownLeftRight:
    //                 return BoxCharacter.udlr;
    //         }
    //         return " ";
    //     }

    //     function fill<T>(array: T[], value: T) {
    //         if (array.fill) {
    //             array.fill(value);
    //         }
    //         else {
    //             for (let i = 0; i < array.length; i++) {
    //                 array[i] = value;
    //             }
    //         }
    //         return array;
    //     }

    //     function repeat(ch: string, length: number) {
    //         if (ch.repeat) {
    //             return length > 0 ? ch.repeat(length) : "";
    //         }
    //         let s = "";
    //         while (s.length < length) {
    //             s += ch;
    //         }
    //         return s;
    //     }
    // }

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


    export function assertNode<T extends Node, U extends T>(node: T | undefined, test: (node: T) => node is U, message?: string, stackCrawlMark?: AnyFunction): asserts node is U;
    export function assertNode(node: Node | undefined, test: ((node: Node) => boolean) | undefined, message?: string, stackCrawlMark?: AnyFunction): void;
    export function assertNode(node: Node | undefined, test: ((node: Node) => boolean) | undefined, message?: string, stackCrawlMark?: AnyFunction) {
        if (shouldAssertFunction(AssertionLevel.Normal, "assertNode")) {
            assert(
                node !== undefined && (test === undefined || test(node)),
                message || "Unexpected node.",
                () => `Node ${formatSyntaxKind(node?.kind)} did not pass test '${getFunctionName(test!)}'.`,
                stackCrawlMark || assertNode,
            );
        }
    }
}

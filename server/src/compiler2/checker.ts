import { Node, Symbol, SymbolId } from "./types";

let nextSymbolId = 1;
let nextNodeId = 1;
let nextMergeId = 1;
let nextFlowId = 1;

/** @internal */
export function getSymbolId(symbol: Symbol): SymbolId {
    if (!symbol.id) {
        symbol.id = nextSymbolId;
        nextSymbolId++;
    }

    return symbol.id;
}

/** @internal */
export function getNodeId(node: Node): number {
    if (!node.id) {
        node.id = nextNodeId;
        nextNodeId++;
    }
    return node.id;
}

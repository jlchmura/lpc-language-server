export * from "../../compiler/_namespaces/lpc.js";
export { Symbol } from "../../compiler/_namespaces/lpc.js"; // why do I have to do this?
export * from "../types.js";
export * from "../utilities.js";
export * from "../documentRegistry.js";
export * from "../services.js";

import * as FindAllReferences from "./lpc.FindAllReferences.js";
export { FindAllReferences };
import * as SymbolDisplay from "./lpc.SymbolDisplay.js";
export { SymbolDisplay };
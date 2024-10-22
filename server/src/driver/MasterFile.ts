// import * as path from "path";
// import { CallStack, StackValue } from "../backend/CallStack";
// import { addPogramToStack } from "../backend/CallStackUtils";
// import { ensureLpcConfig } from "../compiler/LpcConfig";
// import { SourceContext } from "../backend/SourceContext";
// import { IEvaluatableSymbol } from "../symbols/base";
// import { LiteralSymbol } from "../symbols/literalSymbol";
// import { MethodSymbol } from "../symbols/methodSymbol";
// import { LpcTypes } from "../types";
// import { getDriverInfo } from "./Driver";
// import { toLibPath } from "../utils";

// /** Represents the lib's master file */
// export class MasterFileContext {
//     private get fileName() {
//         return this.sourceContext.fileName;
//     }
//     private getIncludePathLfun: (filename: string) => string[];

//     constructor(
//         private workspaceDir: string,
//         /** parsed source context for the lib's master file */
//         private sourceContext: SourceContext
//     ) {
//         this.initApplies();
//     }

//     /**
//      * Runs the get_include_path apply in the master file to get the include paths.
//      * When driver is LDMud, returns an empty array.
//      * @param filename Filename to get include paths for
//      * @returns Array of include paths
//      */
//     public getIncludePath(filename: string): string[] {
//         const config = ensureLpcConfig();
//         // run the fluff driver get_include_path to get the search dirs
//         if (
//             config.driver.type == "fluffos" &&
//             filename != this.fileName &&
//             this.getIncludePathLfun
//         ) {
//             return this.getIncludePathLfun(filename) ?? [];
//         }

//         return [];
//     }

//     private initApplies() {
//         const config = ensureLpcConfig();

//         // setup get_include_path apply
//         if (config.driver.type == "fluffos") {
//             const driver = getDriverInfo();
//             const master = this.sourceContext;

//             // setup eval stack
//             const stack = new CallStack(master.symbolTable);
//             stack.diagnosticMode = false;
//             addPogramToStack(driver.efuns, stack);
//             addPogramToStack(master.symbolTable, stack);

//             // find the get_include_path apply and run it
//             const applyFn = master.symbolTable.resolveSync(
//                 "get_include_path"
//             ) as MethodSymbol;

//             this.getIncludePathLfun = (filename: string) => {
//                 const libFilename = toLibPath(filename, this.workspaceDir);
//                 const searchDirs: string[] = [];
//                 const callArgs: IEvaluatableSymbol[] = [
//                     new LiteralSymbol(
//                         "string",
//                         LpcTypes.stringType,
//                         libFilename
//                     ),
//                 ];
//                 const fnResult = applyFn?.eval(stack, callArgs, stack.root);
//                 if (!!fnResult?.value) {
//                     (fnResult?.value as StackValue[])?.forEach((s) => {
//                         if (s.value != ":DEFAULT:") {
//                             searchDirs.push(
//                                 path.join(this.workspaceDir, s.value)
//                             );
//                         }
//                     });
//                 }
//                 return searchDirs;
//             };
//         }
//     }
// }

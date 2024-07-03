import { ArrowSymbol } from "./arrowSymbol";

// export class CloneObjectSymbol
//     extends ScopedSymbol
//     implements IEvaluatableSymbol
// {
//     public isLoaded = false;
//     private sourceContext: SourceContext;

//     public relativeFileName: string;
//     public filename?: string;

//     constructor(name: string, private fileHandler: LpcFileHandler) {
//         super(name);
//     }

//     eval(stack: CallStack) {
//         // first evaluate the filename

//         // TODO: use call stack here
//         let filename = "";
//         let evalResult: string | StackValue;
//         for (const child of this.children) {
//             if (isInstanceOfIEvaluatableSymbol(child)) {
//                 evalResult = child.eval(stack);
//             } else {
//                 throw "not evaluable";
//             }
//         }

//         if (evalResult instanceof StackValue) {
//             filename = evalResult.value;
//         } else {
//             filename = evalResult;
//         }

//         this.relativeFileName = filename;

//         // try to load the source context and store the info in this symbol
//         const backend = (this.symbolTable as ContextSymbolTable).owner.backend;
//         this.filename = normalizeFilename(
//             backend.filenameToAbsolutePath(filename)
//         );
//         this.loadSource();

//         const info = new ObjectReferenceInfo();
//         info.filename = filename;
//         info.isLoaded = this.isLoaded;
//         info.context = this.sourceContext;
//         return info;
//     }

//     private loadSource() {
//         if (!this.isLoaded) {
//             const ctx = this.context as ParserRuleContext;

//             if (!this.filename) {
//                 addDiagnostic(this, {
//                     message: "Unable to resolve filename",
//                     range: rangeFromTokens(ctx.start, ctx.stop),
//                     type: DiagnosticSeverity.Information,
//                     source: DiagnosticCodes.FileNotResolved,
//                 });
//             } else {
//                 this.sourceContext = this.fileHandler.loadReference(
//                     this.filename,
//                     this
//                 );

//                 if (!!this.sourceContext) {
//                     this.isLoaded = true;
//                 } else {
//                     addDiagnostic(this, {
//                         message: "could not load source for: " + this.filename,
//                         range: rangeFromTokens(ctx.start, ctx.stop),
//                         type: DiagnosticSeverity.Warning,
//                         code: DiagnosticCodes.ObjectNotFound,
//                     });
//                 }
//             }
//         }
//     }

//     /**
//      * intercept the resolve and resolve only from this objects source context
//      * @param name
//      * @param localOnly
//      * @returns
//      */
//     override resolveSync(name: string, localOnly?: boolean): BaseSymbol {
//         this.loadSource(); // load if needed
//         return this.sourceContext.resolveSymbol(name);
//     }
// }

/**
 * Represents a call_other expression in the code, i.e. `ob->method(args)`
 */
export class CallOtherSymbol extends ArrowSymbol {}

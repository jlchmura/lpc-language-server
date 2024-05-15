#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";

import { CharStream, CommonTokenStream, ConsoleErrorListener } from "antlr4ng";
import { LPCLexer } from "./parser3/LPCLexer";
import { LPCParser } from "./parser3/LPCParser";
import { CodeCompletionCore, NamespaceSymbol, SymbolTable } from "antlr4-c3";

import { TextDocument } from "vscode-languageserver-textdocument";
//import { VariableSymbol } from "./backend/ContextSymbolTable";
import { LpcFacade } from "./backend/facade";
import { MethodSymbol } from "./symbols/methodSymbol";
import { VariableSymbol } from "./symbols/variableSymbol";

//import { LpcFacade } from "./backend/facade";

const code = fs.existsSync(process.argv[2])
    ? fs.readFileSync(process.argv[2], "utf-8")
    : process.argv.slice(2).join(" ").replace(/\\n/g, "\n");
const doc = TextDocument.create("uri", "lpc", 0, code);
const stream = CharStream.fromString(code);
const lexer = new LPCLexer(stream);
const tStream = new CommonTokenStream(lexer);
const parser = new LPCParser(tStream);

const filename = process.argv[2];
const dir = path.dirname(filename);

const backend = new LpcFacade([dir], dir, undefined);
//main file
const ctxFile = backend.loadLpc(filename, code);

const tree = ctxFile.symbolTable;

const m = tree.getAllSymbolsSync(MethodSymbol, false);
const v = tree.getAllNestedSymbolsSync("subFn");

// trigger semantic analysis
backend.getDiagnostics(filename);

const tbl = backend.getContext(filename).symbolTable;

const varI = tbl.resolveSync("i") as VariableSymbol;
const varS = tbl.resolveSync("t") as VariableSymbol;
const finalValue = varI.value;
const finalTValue = varS?.value;

console.log("i", finalValue);
console.log("t", finalTValue);

const i = 0;

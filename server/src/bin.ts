#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";

import { CharStreams, CommonTokenStream, ConsoleErrorListener } from "antlr4ng";
import { LPCLexer } from "./parser3/LPCLexer";
import { LPCParser } from "./parser3/LPCParser";
import { CodeCompletionCore, NamespaceSymbol, SymbolTable } from "antlr4-c3";

import { TextDocument } from "vscode-languageserver-textdocument";
//import { VariableSymbol } from "./backend/ContextSymbolTable";
import { LpcFacade } from "./backend/facade";
import { MethodSymbol,  VariableSymbol } from "./backend/ContextSymbolTable";
//import { LpcFacade } from "./backend/facade";

const code = fs.existsSync(process.argv[2])
  ? fs.readFileSync(process.argv[2], "utf-8")
  : process.argv.slice(2).join(" ").replace(/\\n/g, "\n");
const doc = TextDocument.create("uri", "lpc", 0, code);
const stream = CharStreams.fromString(code);
const lexer = new LPCLexer(stream);
const tStream = new CommonTokenStream(lexer);
const parser = new LPCParser(tStream);

const filename = process.argv[2];
const dir = path.dirname(filename);


const backend = new LpcFacade(dir,dir);
//main file
const ctxFile = backend.loadLpc(filename, code);

const tree = ctxFile.symbolTable;

const m = tree.getAllSymbolsSync(MethodSymbol, false);
const v = tree.getAllNestedSymbolsSync("subFn");

const len = m.length;
console.log("done: " + len);
const i = 0;

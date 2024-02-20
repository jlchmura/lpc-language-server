#!/usr/bin/env node
import * as fs from "fs";

import { CharStreams, CommonTokenStream, ConsoleErrorListener } from "antlr4ng";
import { LPCLexer } from "./parser3/LPCLexer";
import { LPCParser } from "./parser3/LPCParser";
import { CodeCompletionCore } from "antlr4-c3/index";


const code = fs.existsSync(process.argv[2])
  ? fs.readFileSync(process.argv[2], "utf-8")
  : process.argv.slice(2).join(" ").replace(/\\n/g, "\n");

const stream = CharStreams.fromString(code);
const lexer = new LPCLexer(stream);
const tStream = new CommonTokenStream(lexer);
const parser = new LPCParser(tStream);

let errorListener =new  ConsoleErrorListener();
parser.addErrorListener(errorListener);

const p2 = parser.lpc_program();
const p = parser.program();

  let core = new CodeCompletionCore(parser);
  let candidates = core.collectCandidates(code.length-4);

  let keywords: string[] = [];
  for (let candidate of candidates.tokens) {
      keywords.push(parser.vocabulary.getDisplayName(candidate[0]));
  }
 
const i=0;




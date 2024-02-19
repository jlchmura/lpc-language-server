#!/usr/bin/env node


import * as fs from "fs";

import { CharStreams, CommonTokenStream } from "antlr4ng";
import { LPCLexer } from "./parser3/LPCLexer";
import { LPCParser } from "./parser3/LPCParser";


const code = fs.existsSync(process.argv[2])
  ? fs.readFileSync(process.argv[2], "utf-8")
  : process.argv.slice(2).join(" ").replace(/\\n/g, "\n");

const stream = CharStreams.fromString(code);
const lexer = new LPCLexer(stream);

const tStream = new CommonTokenStream(lexer);
const parser = new LPCParser(tStream);

const p = parser.program();

const i=0;
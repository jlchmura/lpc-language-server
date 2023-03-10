#!/usr/bin/env node

import { BufferedTokenStream, CharStreams, CommonTokenStream } from "antlr4ts";
import * as fs from "fs";
import { LPCLexer } from "./parser2/LPCLexer";
import { LPCParser } from "./parser2/LPCParser";

const code = fs.existsSync(process.argv[2])
  ? fs.readFileSync(process.argv[2], "utf-8")
  : process.argv.slice(2).join(" ").replace(/\\n/g, "\n");


const stream = CharStreams.fromString(code);
const lexer = new LPCLexer(stream);

const tStream = new BufferedTokenStream(lexer);
const parser = new LPCParser(tStream);

const p = parser.program();

const i=0;
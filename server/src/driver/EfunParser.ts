import * as fs from "fs";
import * as path from "path";
import { ContextSymbolTable } from "../backend/ContextSymbolTable";
import { BailErrorStrategy, CharStream, CommonTokenStream } from "antlr4ng";
import { LPCPreprocessingLexer } from "../parser3/LPCPreprocessingLexer";
import { LPCTokenFactor } from "../parser3/LPCTokenFactory";
import { EfunFileHandler } from "./EfunFileHandler";
import { LPCParser } from "../parser3/LPCParser";
import { EfunVisitor } from "./EfunVisitor";

export function parseEfuns(driverType: string, efuns: ContextSymbolTable) {
    const rootDir =
        process.argv[2]?.length > 0
            ? process.argv[2]
            : path.join(process.cwd(), "efuns");
    const efunDir = path.join(rootDir, driverType);
    const efunFile = path.join(efunDir, `efuns.${driverType}.h`);

    if (!fs.existsSync(efunFile)) {
        throw new Error(`Cannot find efun file ${efunFile}`);
    }

    const code = fs.readFileSync(efunFile, "utf-8");
    const stream = CharStream.fromString(code);
    // get a lexer
    const lexer = new LPCPreprocessingLexer(stream, efunFile);
    lexer.tokenFactory = new LPCTokenFactor(efunFile);
    lexer.fileHandler = new EfunFileHandler();
    lexer.driverType = driverType;
    // get tokens
    const tokenStream = new CommonTokenStream(lexer);
    tokenStream.fill();
    // setup the parser
    const parser = new LPCParser(tokenStream);
    parser.driverType = lexer.driverType;
    parser.setTokenFactory(lexer.tokenFactory);
    parser.errorHandler = new BailErrorStrategy();
    parser.buildParseTrees = true;

    const efunParseTree = parser.program();

    // populate symbol table
    const vis = new EfunVisitor(efuns, tokenStream);
    vis.visit(efunParseTree);
}

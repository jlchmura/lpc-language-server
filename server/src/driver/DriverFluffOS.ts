import * as path from "path";
import * as fs from "fs";
import { SymbolTable } from "antlr4-c3";
import { DriverVersion } from "./DriverVersion";
import {
    DriverVersionCompatibility,
    FeatureValidationResult,
    IDriver,
} from "./types";
import { LPCPreprocessingLexer } from "../parser3/LPCPreprocessingLexer";
import { BailErrorStrategy, CharStream, CommonTokenStream } from "antlr4ng";
import { LPCParser } from "../parser3/LPCParser";
import { LPCTokenFactor } from "../parser3/LPCTokenFactory";
import { EfunFileHandler } from "./EfunFileHandler";
import { EfunVisitor } from "./EfunVisitor";
import { ContextSymbolTable } from "../backend/ContextSymbolTable";

export const FluffOSFeatures = {
    NumericConstThousandSeparator: "NumericConstThousandSeparator",
    SyntaxBufferType: "SyntaxBufferType", // https://www.fluffos.info/lpc/types/buffer.html#buffer
    SyntaxFunctionType: "SyntaxFunctionType", // https://www.fluffos.info/lpc/types/general.html#function
    SyntaxClass: "SyntaxClass",
    SyntaxArgSpreadOperator: "SyntaxArgSpreadOperator",
    SyntaxFunctionPointer: "SyntaxFunctionPointer", // https://www.fluffos.info/lpc/types/function.html#available-kinds-of-function-pointers
    SyntaxObjectSupperAccessor: "SyntaxObjectSupperAccessor", // e.g. object::foo();
    SyntaxNew: "SyntaxNew",
    SyntaxNewArgs: "SyntaxNewArgs", // "new" with arguments, e.g. `new ("ob", 1, 2, 3)`  https://www.fluffos.info/efun/objects/new.html#description
    SyntaxNewStruct: "SyntaxNewStruct",
    SyntaxCatchBlock: "SyntaxCatchBlock",
    SyntaxPrivateInherit: "SyntaxPrivateInherit",
} as const;

export class DriverFluffOS implements IDriver {
    public efuns: ContextSymbolTable;

    Compatibility: DriverVersionCompatibility = {
        NumericConstThousandSeparator: DriverVersion.from("0"),
        SyntaxBufferType: DriverVersion.from("0"),
        SyntaxFunctionType: DriverVersion.from("0"),
        SyntaxFunctionPointer: DriverVersion.from("0"),
        SyntaxClass: DriverVersion.from("0"),
        SyntaxArgSpreadOperator: DriverVersion.from("0"),
        SyntaxObjectSupperAccessor: DriverVersion.from("0"),
        SyntaxNew: DriverVersion.from("0"),
        SyntaxNewArgs: DriverVersion.from("0"),
        SyntaxNewStruct: DriverVersion.from("0"),
        SyntaxCatchBlock: DriverVersion.from("0"),
        SyntaxPrivateInherit: DriverVersion.from("0"),
    };

    constructor() {
        this.efuns = new ContextSymbolTable("efuns", {
            allowDuplicateSymbols: true,
        });
        this.parseEfuns();
    }

    public checkFeatureCompatibility(
        feature: keyof typeof FluffOSFeatures,
        driverVersion: string
    ): FeatureValidationResult {
        const requiredVersion = this.Compatibility[feature];
        if (!requiredVersion) {
            return FeatureValidationResult.NotSupported;
        }
        return DriverVersion.from(driverVersion).gte(requiredVersion)
            ? FeatureValidationResult.Supported
            : FeatureValidationResult.VersionNotSufficient;
    }

    private parseEfuns() {
        const rootDir = process.argv[2];
        const efunDir = path.join(rootDir, "fluffos");
        const efunFile = path.join(efunDir, "efuns.fluffos.h");

        if (!fs.existsSync(efunFile)) {
            throw new Error(`Cannot find efun file ${efunFile}`);
        }

        const includes: string[] = [];
        const code = fs.readFileSync(efunFile, "utf-8");
        const stream = CharStream.fromString(code);
        // get a lexer
        const lexer = new LPCPreprocessingLexer(stream, efunFile, includes);
        lexer.tokenFactory = new LPCTokenFactor(efunFile);
        lexer.fileHandler = new EfunFileHandler();
        lexer.driverType = "fluffos";
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
        const vis = new EfunVisitor(this.efuns);
        vis.visit(efunParseTree);

        const ii = 0;
    }
}

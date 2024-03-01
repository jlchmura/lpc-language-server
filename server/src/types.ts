import {
    ArrayType,
    FundamentalType,
    IType,
    ReferenceKind,
    TypeKind,
} from "antlr4-c3";

export enum DiagnosticType {
    Hint,
    Info,
    Warning,
    Error,
}

export interface IDiagnosticEntry {
    type: DiagnosticType;
    message: string;
    range: ILexicalRange;
    source?: string;
    related?: IDiagnosticEntry;
}

/**
 * A range within a text. Just like the range object in vscode the end position is not included in the range.
 * Hence when start and end position are equal the range is empty.
 */
export interface ILexicalRange {
    start: { column: number; row: number };
    end: { column: number; row: number };
}

export interface IContextDetails {
    //unreferencedRules: string[];
    unreferencedMethods: string[];
    imports: string[];
    objectImports: string[];
}

export enum SymbolKind {
    Unknown,
    Terminal,
    Keyword,
    Literal,
    Include,
    Inherit,
    Define,
    Method,
    MethodDeclaration,
    InlineClosure,
    Variable,
    Operator,
    Block,
    Efun,
}

/** Multiple symbol kinds can be involved in a symbol lookup. */
export enum SymbolGroupKind {
    Identifier,
    MethodName,
}

/** The definition of a single symbol (range and content it is made of). */
export interface IDefinition {
    text: string;
    range: ILexicalRange;
}

export interface ISymbolInfo {
    kind: SymbolKind;
    name: string;
    source: string;
    line?: number;
    definition?: IDefinition;
    children?: ISymbolInfo[];

    /** Used for code completion. Provides a small description for certain symbols. */
    description?: string;
}

// prettier-ignore
export namespace LpcTypes {    
    export const objectType: IType = new FundamentalType("object", TypeKind.Class);
    export const voidType: IType = new FundamentalType("void", TypeKind.Unknown);
    export const mixedType: IType = new FundamentalType("mixed", TypeKind.Unknown);
    export const mixedArrayType: IType = new ArrayType("mixed *", ReferenceKind.Instance, LpcTypes.mixedType);
}

export const typeNameToIType = new Map<string, IType>([
    ["string", FundamentalType.stringType],
    ["int", FundamentalType.integerType],
    ["status", FundamentalType.integerType],
    ["float", FundamentalType.floatType],
    ["object", LpcTypes.objectType],
    ["mixed", LpcTypes.mixedType],
    ["void", LpcTypes.voidType],
]);

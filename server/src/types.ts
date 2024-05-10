import {
    ArrayType,
    BaseSymbol,
    FundamentalType,
    IType,
    ReferenceKind,
    TypeKind,
} from "antlr4-c3";
import { DiagnosticSeverity } from "vscode-languageserver";

export const COMMENT_CHANNEL_NUM = 2;
export const SOURCEMAP_CHANNEL_NUM = 3;

export interface IDiagnosticEntry {
    type: DiagnosticSeverity;
    message: string;
    range: ILexicalRange;
    source?: string;
    related?: IDiagnosticEntry;
}

export type IPosition = { column: number; row: number };
export type IIndexedPosition = { index: number } & IPosition;

/**
 * A range within a text. Just like the range object in vscode the end position is not included in the range.
 * Hence when start and end position are equal the range is empty.
 */
export interface ILexicalRange {
    start: IPosition;
    end: IPosition;
}

export type ContextImportInfo = {
    filename: string;
    symbol: BaseSymbol;
};

export interface IContextDetails {
    //unreferencedRules: string[];
    unreferencedMethods: string[];
    imports: ContextImportInfo[];
    objectImports: string[];
}

export enum SymbolKind {
    Unknown,
    Terminal,
    Keyword,
    Literal,
    Include,
    Inherit,
    InheritSuperAccessor,
    Define,
    Method,
    MethodDeclaration,
    MethodInvocation,
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
    symbol?: BaseSymbol;
    source: string;
    line?: number;
    definition?: IDefinition;
    children?: ISymbolInfo[];

    /** Used for code completion. Provides a small description for certain symbols. */
    description?: string;
}

// prettier-ignore
export namespace LpcTypes {    
    export const bytesType: IType = new FundamentalType("bytes", TypeKind.String);
    export const intType: IType = FundamentalType.integerType;
    export const intArrayType: IType = new ArrayType("int *", ReferenceKind.Instance, LpcTypes.intType);
    export const stringType: IType=FundamentalType.stringType;
    export const stringArrayType: IType = new ArrayType("string *", ReferenceKind.Instance, LpcTypes.stringType);
    export const closureType: IType = new FundamentalType("closure", TypeKind.Class);
    export const objectType: IType = new FundamentalType("object", TypeKind.Class);
    export const objectArrayType: IType = new ArrayType("object *", ReferenceKind.Instance, LpcTypes.objectType);
    export const voidType: IType = new FundamentalType("void", TypeKind.Unknown);
    export const mappingType:IType=new FundamentalType("mapping", TypeKind.Map);
    export const mixedType: IType = new FundamentalType("mixed", TypeKind.Unknown);
    export const mixedArrayType: IType = new ArrayType("mixed *", ReferenceKind.Instance, LpcTypes.mixedType);
    export const functionType: IType = new FundamentalType("function", TypeKind.Unknown);
    export const structType: IType = new FundamentalType("struct", TypeKind.Class);
}

export const typeNameToIType = new Map<string, IType>([
    ["string", FundamentalType.stringType],
    ["int", FundamentalType.integerType],
    ["status", FundamentalType.integerType],
    ["float", FundamentalType.floatType],
    ["object", LpcTypes.objectType],
    ["mixed", LpcTypes.mixedType],
    ["void", LpcTypes.voidType],
    ["struct", LpcTypes.structType],
]);

export enum DependencySearchType {
    Local,
    Global,
}

export type MacroDefinition = {
    /** the name of the macro */
    name: string;
    /** the text that will get substituted for the macro */
    value: string;
    /** filename this macro is defined in */
    filename: string;
    /* starting position of the macro */
    start: IPosition;
    /* ending position of the macro */
    end: IPosition;
    /**
     * array of arg names in the order they will be passed to the macro
     */
    args?: string[];
    /**
     * The macro value string with the arg names marked with a unique string [[@<argName>]]
     *
     */
    markedValue?: string;
    /** annotation that will be used to tag this macro */
    annotation: string;
};

export const SemanticTokenTypes = {
    Comment: 0,
    Macro: 1,
    Operator: 2,
    Method: 3,
    Parameter: 4,
    Define: 5,
    String: 6,
    Number: 7,
    Type: 8,
    Variable: 9,
} as const;

export const SemanticTokenModifiers = {
    Declaration: 1,
    Definition: 2,
    Documentation: 3,
    Static: 4,
    DefaultLibrary: 5,
    Local: 6,
} as const;

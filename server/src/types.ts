import {
    ArrayType,
    BaseSymbol,
    FundamentalType,
    IType,
    ReferenceKind,
    TypeKind,
} from "antlr4-c3";
import { Token } from "antlr4ng";
import { DiagnosticSeverity } from "vscode-languageserver";
import { LPCToken } from "./parser3/LPCToken";

export const DiagnosticCodes = {
    /** occurs when the target of a call other (eg `target->fn()`) is unknown, therefore the lfun cannot be validated */
    CallOtherTargetUnknown: "callOtherTargetUnknown",
    /** When the lfun of a call other (eg `target->lfun()` cannot be found */
    CallOtherLfunNotFound: "callOtherLfunNotFound",
    ObjectNotFound: "objectNotFound",
    FunctionModifiersMismatch: "functionModifiersMismatch",
    FunctionReturnMismatch: "functionReturnMismatch",
    FunctionParameterMismatch: "functionParameterMismatch",
    MemberNotFound: "memberNotFound",
    FileNotResolved: "fileNotResolved",
    StructMembmerAsFunction: "structMemberAsFunction",
} as const;

export interface IDiagnosticEntry {
    filename?: string;
    type: DiagnosticSeverity;
    message: string;
    range: ILexicalRange;
    source?: string;
    code?: string;
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
    includes: string[];
    objectReferences: Record<string, BaseSymbol[]>;
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
    /** the resolved symbol */
    symbol?: BaseSymbol;
    /** the token that references this symbol */
    token?: LPCToken;
    source: string;
    line?: number;
    definition?: IDefinition;
    children?: ISymbolInfo[];
    filename?: string;

    /** Used for code completion. Provides a small description for certain symbols. */
    description?: string;
}

export class StructType extends FundamentalType {
    static readonly UnknownStruct = new StructType("unknown");

    constructor(public structName: string) {
        super("struct", TypeKind.Class);
    }
}

// prettier-ignore
export namespace LpcTypes {    
    export const bytesType: IType = new FundamentalType("bytes", TypeKind.String);
    export const intType: IType = FundamentalType.integerType;
    export const intArrayType: IType = new ArrayType("int *", ReferenceKind.Instance, LpcTypes.intType);
    export const floatType: IType = FundamentalType.floatType;
    export const floatArrayType: IType = new ArrayType("float *", ReferenceKind.Instance, LpcTypes.floatType);
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
    export const structType: IType = StructType.UnknownStruct;
    export const unknownType: IType = new FundamentalType("unknown", TypeKind.Unknown);
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
    token: Token;
    /** the text that will get substituted for the macro */
    value: string;
    /** filename this macro is defined in */
    filename: string;
    /** tokens of the macro body */
    bodyTokens?: Token[];

    /**
     * array of arg names in the order they will be passed to the macro
     */
    args?: string[];
    /** name of each arg and the index of each */
    argIndex?: Map<string, number>;
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
    Property: 10,
    LambdaPrefix: 11,
} as const;

export const SemanticTokenModifiers = {
    Declaration: 1,
    Definition: 2,
    Documentation: 3,
    Static: 4,
    DefaultLibrary: 5,
    Local: 6,
} as const;

export const FUNCTION_NAME_KEY = "$$$function_id$$$";

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
}

/**
 * A range within a text. Just like the range object in vscode the end position is not included in the range.
 * Hence when start and end position are equal the range is empty.
 */
export interface ILexicalRange {
    start: { column: number; row: number; };
    end: { column: number; row: number; };
}

export interface IContextDetails {    
    //unreferencedRules: string[];
    unreferencedMethods: string[];
    imports: string[];
}

export enum SymbolKind {
    Unknown,

    Terminal,
    Keyword,
    Import,
    Define,
    Method,        
    Variable
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
    definition?: IDefinition;
    children: ISymbolInfo[];
    
    /** Used for code completion. Provides a small description for certain symbols. */
    description?: string;    
}
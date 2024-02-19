import { CodeCompletionCore, SymbolTable,  ScopedSymbol, VariableSymbol, BaseSymbol, SymbolConstructor } from "antlr4-c3";


import { CompletionItem } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";


import * as fuzzysort from 'fuzzysort';
import { SymbolTableVisitor } from "./symbolTableVisitor";
import { AbstractParseTreeVisitor, CharStreams, CommonTokenStream, ParseTree, TerminalNode, TokenStream } from "antlr4ng";
import { Expr4Context, LPCParser, Lpc_programContext } from "./parser3/LPCParser";
import { LPCVisitor } from "./parser3/LPCVisitor";
import { LPCLexer } from "./parser3/LPCLexer";

export type CaretPosition = { line: number, column: number };
export type TokenPosition = { index: number, context: ParseTree, text: string };
export type ComputeTokenPositionFunction =
    (parseTree: ParseTree, tokens: TokenStream, caretPosition: CaretPosition) => TokenPosition;

export function getScope(context: ParseTree|undefined, symbolTable: SymbolTable):BaseSymbol |undefined {
    if(!context) {
        return undefined;
    }
    
    const scope = symbolTable.symbolWithContextSync(context);
    if(scope) {
        return scope;
    } else {        
        return getScope(context.parent, symbolTable);
    }
}

export async function getAllSymbolsOfType<T extends BaseSymbol>(scope: ScopedSymbol, type: SymbolConstructor<T,any>): Promise<T[]> {
    let symbols = await scope.getSymbolsOfType(type)
    
    let parent = scope.parent;
    
    while(parent && !(parent instanceof ScopedSymbol)) {
        parent = parent.parent;
    }
    if(parent) {
        const res = await getAllSymbolsOfType(parent as ScopedSymbol, type);
        symbols.push(...res);
    }
    return symbols;
}

async function suggestVariables(symbolTable: SymbolTable, position: TokenPosition) {
    const context = position.context;
    const scope = getScope(context, symbolTable);
    let symbols: BaseSymbol[];
    if(scope instanceof ScopedSymbol) { //Local scope
        symbols = await getAllSymbolsOfType(scope, VariableSymbol);
    } else { //Global scope
        symbols = await symbolTable.getSymbolsOfType(VariableSymbol);
    }
    let variable = position.context;
    while(!(variable instanceof Expr4Context) && variable.parent) {
        variable = variable.parent;
    }
    return filterTokens(variable ? position.text : '', symbols.map(s => s.name));
}

export function filterTokens_startsWith(text: string, candidates: string[]) {
    if(text.trim().length == 0) {
        return candidates;
    } else {
        return candidates.filter(c => c.toLowerCase().startsWith(text.toLowerCase()));
    }
}

export function filterTokens_fuzzySearch(text: string, candidates: string[]) {
    if(text.trim().length == 0) {
        return candidates;
    } else {
        return fuzzysort.go(text, candidates).map(r => r.target);
    }
}

export let filterTokens = filterTokens_startsWith;
export function setTokenMatcher(fn: any) {
    filterTokens = fn;
}



export function getSuggestionsForParseTree(
    parser: LPCParser, parseTree: Lpc_programContext, 
    //symbolTableFn: () => SymbolTable,
     position: TokenPosition) {
    let core = new CodeCompletionCore(parser);
    // Luckily, the Kotlin lexer defines all keywords and identifiers after operators,
    // so we can simply exclude the first non-keyword tokens
    let ignored = Array.from(Array(LPCParser.RULE_lpc_program).keys());
    ignored.push(
        LPCParser.Assign, LPCParser.LineComment,
        LPCParser.BlockComment
        );
    ignored.push(LPCParser.ArrayOpen, LPCParser.MappingOpen)
    
    core.ignoredTokens = new Set(ignored);
    core.preferredRules = new Set([LPCParser.RULE_expr4, LPCParser.RULE_function_definition, LPCParser.RULE_type_decl]);
    let candidates = core.collectCandidates(position.index);

    const completions:string[] = [];
    // if (candidates.rules.has(LPCParser.RULE_variableRead) ||
    //     candidates.rules.has(LPCParser.RULE_suggestArgument)) {
    //     completions.push(...suggestVariables(symbolTableFn(), position));
    // }
    let tokens:string[] = [];
    candidates.tokens.forEach((_, k) => {
        if (k == LPCParser.Identifier) {
            //Skip, we’ve already handled it above
        } else {
            const symbolicName = parser.vocabulary.getSymbolicName(k);
            if (symbolicName) {
                tokens.push(symbolicName.toLowerCase());
            }
        }
    });
    const isIgnoredToken =
        position.context instanceof TerminalNode &&
        ignored.indexOf(position.context.symbol.type) >= 0;
    const textToMatch = isIgnoredToken ? '' : position.text;
    completions.push(...filterTokens(textToMatch, tokens));
    return completions;
}


function computeTokenIndexOfTerminalNode(parseTree: TerminalNode, caretPosition: CaretPosition) {
    let start = parseTree.symbol.column
    let stop = parseTree.symbol.column + parseTree.getText().length;
    if (parseTree.symbol.line == caretPosition.line && start <= caretPosition.column && stop >= caretPosition.column) {
        return parseTree.symbol.tokenIndex;
    } else {
        return undefined;
    }
}

function computeTokenIndexOfChildNode(parseTree: ParseTree, caretPosition: CaretPosition) {
    for (let i = 0; i < parseTree.getChildCount(); i++) {
        let index = computeTokenIndex(parseTree.getChild(i), caretPosition);
        if (index !== undefined) {
            return index;
        }
    }
    return undefined;
}


export function computeTokenIndex(parseTree: ParseTree, caretPosition: CaretPosition): number |undefined{
    if(parseTree instanceof TerminalNode) {
        return computeTokenIndexOfTerminalNode(parseTree, caretPosition);
    } else {
        return computeTokenIndexOfChildNode(parseTree, caretPosition);
    }
}

export function getSuggestions(
    code: string, caretPosition: CaretPosition, computeTokenPosition: ComputeTokenPositionFunction) {
    let input = CharStreams.fromString(code);
    let lexer = new LPCLexer(input);
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new LPCParser(tokenStream);

    let parseTree = parser.lpc_program();

    let position = computeTokenPosition(parseTree, tokenStream, caretPosition);
    if(!position) {
        return [];
    }
    return getSuggestionsForParseTree(
        parser, parseTree, 
        //() => new LPCVisitor().visit(parseTree),
         position);
}
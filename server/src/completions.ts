import {
  CodeCompletionCore,
  SymbolTable,
  ScopedSymbol,
  VariableSymbol,
  BaseSymbol,
  SymbolConstructor,
  MethodSymbol,
} from "antlr4-c3/index";
import { CompletionItem, CompletionItemKind } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import * as fuzzysort from "fuzzysort";
import { SymbolTableVisitor } from "./symbolTableVisitor";
import {
  AbstractParseTreeVisitor,
  CharStreams,
  CommonTokenStream,
  ConsoleErrorListener,
  DefaultErrorStrategy,
  ParseCancellationException,
  ParseTree,
  ParserInterpreter,
  PredictionMode,
  TerminalNode,
  Token,
  TokenStream,
} from "antlr4ng";
import {
  ExpressionContext,
  LPCParser, ProgramContext,
  
} from "./parser3/LPCParser";
import { LPCVisitor } from "./parser3/LPCVisitor";
import { LPCLexer } from "./parser3/LPCLexer";

export type CaretPosition = { line: number; column: number };
export type TokenPosition = { index: number; context: ParseTree; text: string; token: Token };
export type ComputeTokenPositionFunction = (
  parseTree: ParseTree,
  tokens: TokenStream,
  caretPosition: CaretPosition
) => TokenPosition;

export function getScope(
  context: ParseTree | undefined,
  symbolTable: SymbolTable
): BaseSymbol | undefined {
  if (!context) {
    return undefined;
  }

  const scope = symbolTable.symbolWithContextSync(context);
  if (scope) {
    return scope;
  } else {
    return getScope(context.parent!, symbolTable);
  }
}

export  function getAllSymbolsOfType<T extends BaseSymbol>(
  scope: ScopedSymbol,
  type: SymbolConstructor<T, any>
): T[] {
  let symbols =  scope.getAllSymbolsSync(type,true);

  let parent = scope.parent;

  while (parent && !(parent instanceof ScopedSymbol)) {
    parent = parent.parent;
  }
  if (parent) {
    const res =  getAllSymbolsOfType(parent as ScopedSymbol, type);
    symbols.push(...res);
  }
  return symbols;
}

 function suggestVariables(
  symbolTable: SymbolTable,
  position: TokenPosition
): CompletionItem[] {
  const context = position.context;
  const scope = getScope(context, symbolTable);
  let symbols: BaseSymbol[];
  if (scope instanceof ScopedSymbol) {
    //Local scope    
    symbols = getAllSymbolsOfType(scope, VariableSymbol);
    
    const symAll = symbolTable.getAllNestedSymbolsSync().filter(s => s instanceof MethodSymbol);
    symbols.push(...symAll);
  } else {
    //Global scope
    symbols =  symbolTable.getAllSymbolsSync(VariableSymbol, true);
  }

  let variable = position.context;
  while (!(variable instanceof ExpressionContext) && variable.parent) {
    variable = variable.parent;
  }
  
  const filterText = variable ? position.text : "";
  const emptyFilter = filterText.trim().length == 0;
  return symbols.filter(s => {
    return emptyFilter || s.name.toLowerCase().startsWith(filterText.toLowerCase());
  }).map(s => {
    return {
      label: s.name,
      kind: s instanceof MethodSymbol ? CompletionItemKind.Method : CompletionItemKind.Variable
    }
  });  
}

export function filterTokens_startsWith(text: string, candidates: string[]) {
  if (text.trim().length == 0) {
    return candidates;
  } else {
    return candidates.filter((c) =>
      c.toLowerCase().startsWith(text.toLowerCase())
    );
  }
}

export function filterTokens_fuzzySearch(text: string, candidates: string[]) {
  if (text.trim().length == 0) {
    return candidates;
  } else {
    return fuzzysort.go(text, candidates).map((r) => r.target);
  }
}

export let filterTokens = filterTokens_startsWith;
export function setTokenMatcher(fn: any) {
  filterTokens = fn;
}

export  function getSuggestionsForParseTree(
  parser: LPCParser,
  parseTree: ProgramContext,
  symbolTableFn: () => SymbolTable,
  position: TokenPosition
) {
  let core = new CodeCompletionCore(parser);
  // Luckily, the Kotlin lexer defines all keywords and identifiers after operators,
  // so we can simply exclude the first non-keyword tokens
  let ignored = Array.from(Array(LPCParser.RULE_program).keys());
  ignored.push(LPCParser.LINE_COMMENT, LPCParser.COMMENT);
  //ignored.push(LPCParser.ArrayOpen, LPCParser.MappingOpen);

  core.ignoredTokens = new Set(ignored);
   core.preferredRules = new Set([
    LPCParser.RULE_variableDeclaration,
    LPCParser.RULE_functionDeclaration,
    LPCParser.RULE_typeSpecifier
  //   LPCParser.RULE_expression,
  //   LPCParser.RULE_expressionStatement,
  //   LPCParser.RULE_compoundStatement,    
   ]);
  let candidates = core.collectCandidates(position.index);

  const completions: CompletionItem[] = [];

  console.dir(candidates);

  if (
    candidates.rules.has(LPCParser.RULE_variableDeclaration) ||
    candidates.rules.has(LPCParser.RULE_functionDeclaration)
  ) {
    const suggestRes = suggestVariables(symbolTableFn(), position);
    completions.push(...suggestRes);
  }
  let tokens: string[] = [];
  candidates.tokens.forEach((_, k) => {
    if (k == LPCParser.Identifier) {
      //Skip, we’ve already handled it above
    }
    // else if (k == KotlinParser.NOT_IN) {
    //     tokens.push("!in");
    // }
    else {
      const symbolicName = parser.vocabulary.getSymbolicName(k);
      if (symbolicName) {
        tokens.push(symbolicName.toLowerCase());
      }
    }
  });
  const isIgnoredToken =
    position.context instanceof TerminalNode &&
    ignored.indexOf(position.context.symbol.type) >= 0;
  const textToMatch = isIgnoredToken ? "" : position.text;
  completions.push(...filterTokens(textToMatch, tokens).map((s) => {    
    return { label: s, kind: CompletionItemKind.Keyword }; 
  }));
  console.log("Filtering for " + textToMatch);
  console.dir(completions);  
  return completions;
}

export function getSuggestions(
  code: string,
  caretPosition: CaretPosition,
  computeTokenPosition: ComputeTokenPositionFunction
) {
  let input = CharStreams.fromString(code);
  let lexer = new LPCLexer(input);
  let tokenStream = new CommonTokenStream(lexer);
  let parser = new LPCParser(tokenStream);

  parser.errorHandler = new DefaultErrorStrategy();  
  // let errorListener = new ConsoleErrorListener();
  // parser.addErrorListener(errorListener);

  let parseTree:ProgramContext;
  
  try {
    parseTree = parser.program();
  }catch (e) {
    if (e instanceof ParseCancellationException) {
      lexer.reset();
      tokenStream.setTokenSource(lexer);
      parser.reset();
      parser.interpreter.predictionMode = PredictionMode.LL;
      parseTree = parser.program();
    }
  }

  let position = computeTokenPosition(parseTree, tokenStream, caretPosition);
  console.log("Position", position);
  if (!position) {
    return [];
  }

  return  getSuggestionsForParseTree(
    parser,
    parseTree,
    () => new SymbolTableVisitor().visit(parseTree),
    position
  );
}

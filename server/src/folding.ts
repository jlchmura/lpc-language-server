import {
  CharStreams,
  CommonTokenStream,
  ParseCancellationException,
  ParserRuleContext,
  PredictionMode,
  RuleContext,
  Token,
  TokensStartState,
} from "antlr4ng";
import {
  CancellationToken,
  FoldingRange,
  FoldingRangeKind,
  Position,
  Range,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { LPCLexer } from "./parser3/LPCLexer";
import {
  FunctionDeclarationContext,
  LPCParser,
  ProgramContext,
} from "./parser3/LPCParser";
import {
  IfSymbol,
  PreprocessorSymbol,
  SelectionSymbol,
  SymbolTableVisitor,
} from "./symbolTableVisitor";
import { BaseSymbol, MethodSymbol } from "antlr4-c3";

export function getFoldingRanges(
  code: string,
  maxRanges: number | undefined
): FoldingRange[] {
  let result: FoldingRange[] = [];

  let input = CharStreams.fromString(code);
  let lexer = new LPCLexer(input);
  let tokenStream = new CommonTokenStream(lexer);
  let parser = new LPCParser(tokenStream);

  let parseTree: ProgramContext;

  try {
    parseTree = parser.program();
  } catch (e) {
    return [];
  }

  const symbols = new SymbolTableVisitor().visit(parseTree);
  const symbolArr = symbols.getAllNestedSymbolsSync();

  // functions
  symbolArr
    .filter((s) => s instanceof MethodSymbol)
    .forEach((s: MethodSymbol) => {
      const ctx = s.context as ParserRuleContext;

      result.push({
        startLine: ctx.start.line - 1,
        endLine: ctx.stop.line - 2,
        startCharacter: ctx.start.column,
        endCharacter: ctx.stop.column,
        kind: FoldingRangeKind.Region,
        collapsedText: s.name,
      });
    });

  // if statements
  symbolArr
    .filter((s) => s instanceof IfSymbol)
    .forEach((s: IfSymbol) => {
      const ctx = s.if.context as ParserRuleContext;
      const ifRange: FoldingRange = {
        startLine: ctx.start.line - 1,
        endLine: ctx.stop.line - 2,
        startCharacter: ctx.start.column,
        endCharacter: ctx.stop.column,
        kind: FoldingRangeKind.Region,
        collapsedText: "if",
      };
      result.push(ifRange);

      s.elseIf.forEach((e) => {
        const ctx = e.context as ParserRuleContext;
        const elseIfRange: FoldingRange = {
          startLine: ctx.start.line - 1,
          endLine: ctx.stop.line - 2,
          startCharacter: ctx.start.column,
          endCharacter: ctx.stop.column,
          kind: FoldingRangeKind.Region,
          collapsedText: "else if",
        };
        result.push(elseIfRange);
      });

      if (s.else) {
        const ctx = s.else.context as ParserRuleContext;
        const elseRange: FoldingRange = {
          startLine: ctx.start.line - 1,
          endLine: ctx.stop.line - 2,
          startCharacter: ctx.start.column,
          endCharacter: ctx.stop.column,
          kind: FoldingRangeKind.Region,
          collapsedText: "else",
        };
        result.push(elseRange);
      }
    });

  // gather all if directives
  const ifDirectives = symbols
    .getAllNestedSymbolsSync()
    .filter(
      (s) =>
        (s instanceof PreprocessorSymbol && s.name === "if") ||
        s.name === "ifdef" ||
        s.name === "ifndef" ||
        s.name === "else" ||
        s.name === "elif"
    ) as PreprocessorSymbol[];
  ifDirectives.sort(sortSymbols);

  // gather all endif diretives
  const endifDirectives = symbols
    .getAllNestedSymbolsSync()
    .filter((s) => s instanceof PreprocessorSymbol && s.name === "endif");
  endifDirectives.sort(sortSymbols);

  let rangeStart: Token | undefined, rangeEnd: Token | undefined;
  while (ifDirectives.length > 0) {
    let nextIf = ifDirectives.pop() as PreprocessorSymbol;
    rangeStart = (nextIf.context as ParserRuleContext).start;

    while (ifDirectives.length > 0 && ifDirectives[0].name == "elif") {
      nextIf = ifDirectives.pop() as PreprocessorSymbol;
      rangeEnd = (nextIf.context as ParserRuleContext).start;
      result.push({
        startLine: rangeStart.line - 1,
        endLine: rangeEnd.line - 1,
        startCharacter: rangeStart.column,
        endCharacter: rangeEnd.column,
        kind: FoldingRangeKind.Region,
      });

      rangeStart = (nextIf.context as ParserRuleContext).stop;
    }

    if (ifDirectives.length > 0 && ifDirectives[0].name === "else") {
      nextIf = ifDirectives.pop() as PreprocessorSymbol;
      rangeEnd = (nextIf.context as ParserRuleContext).start;

      result.push({
        startLine: rangeStart.line - 1,
        endLine: rangeEnd.line - 1,
        startCharacter: rangeStart.column,
        endCharacter: rangeEnd.column,
        kind: FoldingRangeKind.Region,
      });

      rangeStart = (nextIf.context as ParserRuleContext).stop;
    }

    if (endifDirectives.length > 0) {
      nextIf = endifDirectives.pop() as PreprocessorSymbol;
      rangeEnd = (nextIf.context as ParserRuleContext).start;
      result.push({
        startLine: rangeStart.line - 1,
        endLine: rangeEnd.line - 1,
        startCharacter: rangeStart.column,
        endCharacter: rangeEnd.column,
        kind: FoldingRangeKind.Region,
      });
    }
  }
  
  result = limitFoldingRanges(result, {});
  

  return result;
}

function sortSymbols(s1: BaseSymbol, s2: BaseSymbol) {
  const r1 = s1.context as ParserRuleContext;
  const r2 = s2.context as ParserRuleContext;
  let diff = r1.start.line - r2.start.line;
  if (diff === 0) {
    diff = r1.stop.line - r2.stop.line;
  }
  return diff;
}

/**
 * - Sort regions
 * - Remove invalid regions (intersections)
 * - If limit exceeds, only return `rangeLimit` amount of ranges
 */
function limitFoldingRanges(
  ranges: FoldingRange[],
  context: { rangeLimit?: number }
): FoldingRange[] {
  const maxRanges = (context && context.rangeLimit) || Number.MAX_VALUE;

  const sortedRanges = ranges.sort((r1, r2) => {
    let diff = r1.startLine - r2.startLine;
    if (diff === 0) {
      diff = r1.endLine - r2.endLine;
    }
    return diff;
  });

  const validRanges: FoldingRange[] = [];
  let prevEndLine = -1;
  sortedRanges.forEach((r) => {
    if (!(r.startLine < prevEndLine && prevEndLine < r.endLine)) {
      validRanges.push(r);
      prevEndLine = r.endLine;
    }
  });

  if (validRanges.length < maxRanges) {
    return validRanges;
  } else {
    return validRanges.slice(0, maxRanges);
  }
}

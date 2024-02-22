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
import { PreprocessorSymbol, SymbolTableVisitor } from "./symbolTableVisitor";
import { BaseSymbol, MethodSymbol } from "antlr4-c3/index";

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

  symbols
    .getAllNestedSymbolsSync()
    .filter((s) => s instanceof MethodSymbol)
    .forEach((s: MethodSymbol) => {
      const ctx = s.context as ParserRuleContext;

      result.push({
        startLine: ctx.start.line - 1,
        endLine: ctx.stop.line - 2,
        startCharacter: ctx.start.column,
        endCharacter: ctx.stop.column,
        kind: "function",
        collapsedText: s.name,
      });
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
    );
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

  console.log("Folding ranges:", result);
  result = limitRanges(result, maxRanges || 1000);
  console.dir(result);

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

function limitRanges(ranges: FoldingRange[], maxRanges: number) {
  ranges = ranges.sort((r1, r2) => {
    let diff = r1.startLine - r2.startLine;
    if (diff === 0) {
      diff = r1.endLine - r2.endLine;
    }
    return diff;
  });

  // compute each range's nesting level in 'nestingLevels'.
  // count the number of ranges for each level in 'nestingLevelCounts'
  let top: FoldingRange | undefined = undefined;
  const previous: FoldingRange[] = [];
  const nestingLevels: number[] = [];
  const nestingLevelCounts: number[] = [];

  const setNestingLevel = (index: number, level: number) => {
    nestingLevels[index] = level;
    if (level < 30) {
      nestingLevelCounts[level] = (nestingLevelCounts[level] || 0) + 1;
    }
  };

  // compute nesting levels and sanitize
  for (let i = 0; i < ranges.length; i++) {
    const entry = ranges[i];
    if (!top) {
      top = entry;
      setNestingLevel(i, 0);
    } else {
      if (entry.startLine > top.startLine) {
        if (entry.endLine <= top.endLine) {
          previous.push(top);
          top = entry;
          setNestingLevel(i, previous.length);
        } else if (entry.startLine > top.endLine) {
          do {
            top = previous.pop();
          } while (top && entry.startLine > top.endLine);
          if (top) {
            previous.push(top);
          }
          top = entry;
          setNestingLevel(i, previous.length);
        }
      }
    }
  }
  let entries = 0;
  let maxLevel = 0;
  for (let i = 0; i < nestingLevelCounts.length; i++) {
    const n = nestingLevelCounts[i];
    if (n) {
      if (n + entries > maxRanges) {
        maxLevel = i;
        break;
      }
      entries += n;
    }
  }
  const result = [];
  for (let i = 0; i < ranges.length; i++) {
    const level = nestingLevels[i];
    if (typeof level === "number") {
      if (level < maxLevel || (level === maxLevel && entries++ < maxRanges)) {
        result.push(ranges[i]);
      }
    }
  }
  return result;
}

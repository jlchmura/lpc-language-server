import { ParserRuleContext } from "antlr4ng";
import { Position, Range } from "vscode-languageserver";
import { ILexicalRange } from "./types";

export function getSelectionRange(ctx: ParserRuleContext): Range {
  const start = ctx.start;
  const stop = ctx.stop;
  const rng = Range.create(
    Position.create(start.line - 1, start.column),
    Position.create(stop.line - 1, stop.column)
  );
  return rng;
}

/**
 * convert a lexer range to a language server range
 * @param range 
 * @returns 
 */
export function lexRangeToLspRange(range: ILexicalRange) {
  if (!range) { return undefined; }
  
  const { start, end } = range;
  const startRow = start.row === 0 ? 0 : start.row - 1;
  const endRow = end.row === 0 ? 0 : end.row - 1;

  return Range.create(startRow, start.column, endRow, end.column);
}
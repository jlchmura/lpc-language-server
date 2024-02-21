import { ParserRuleContext } from "antlr4ng";
import { Position, Range } from "vscode-languageserver";

export function getSelectionRange(ctx: ParserRuleContext): Range {
  const start = ctx.start;
  const stop = ctx.stop;
  const rng = Range.create(
    Position.create(start.line - 1, start.column),
    Position.create(stop.line - 1, stop.column)
  );
  return rng;
}

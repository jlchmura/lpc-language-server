import {
  CancellationToken,
  FoldingRange,
  Position,
  Range,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";

import { LPCDocument, ParseLPC } from "./parser";
import { FunctionDeclarationNode } from "./parser/nodeTypes";

export function getFoldingRanges(
  document: TextDocument,
  maxRanges: number | undefined
): FoldingRange[] {  
  let result: FoldingRange[] = [];

  const ast = ParseLPC(document.getText());
  ast.roots.forEach((node) => {
    if (node.type == "function") {
      const fn = node as FunctionDeclarationNode;
      result.push({
        startLine: document.positionAt(fn.start).line,
        endLine: document.positionAt(fn.end).line,
        startCharacter: fn.start,
        endCharacter: fn.end,
        kind: "function",
        collapsedText: fn?.id?.name,
      });
    }
  });

  if (maxRanges && result.length > maxRanges) {
    result = limitRanges(result, maxRanges);
  }
  return result;
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

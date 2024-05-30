/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ParseTree, ParserRuleContext, TerminalNode } from "antlr4ng";
import { LPCToken } from "../parser3/LPCToken";

export class BackendUtils {
    /**
     * Get the lowest level parse tree, which covers the given position.
     *
     * @param root The start point to search from.
     * @param column The position in the given row.
     * @param row The row position to search for.
     *
     * @returns The parse tree which covers the given position or undefined if none could be found.
     */
    public static parseTreeFromPosition = (
        root: ParseTree,
        column: number,
        row: number,
        filename?: string
    ): ParseTree | null => {
        // Does the root node actually contain the position? If not we don't need to look further.
        if (root instanceof TerminalNode) {
            const terminal = root;
            const token = terminal.symbol as LPCToken;
            if (token?.line !== row) {
                return null;
            }

            const tokenStop = token.column + (token.stop - token.start + 1);
            if (
                token.column <= column &&
                tokenStop >= column &&
                (!filename || token.filename == filename)
            ) {
                return terminal;
            }

            return null;
        } else {
            const context = root as ParserRuleContext;
            const start = context.start as LPCToken;
            const stop = context.stop as LPCToken;

            if (!start || !stop) {
                // Invalid tree?
                return null;
            }

            if (filename && start.filename !== filename) {
                // token is from a different source file
                return null;
            }

            if (
                start.line > row ||
                (start.line === row && column < start.column)
            ) {
                return null;
            }

            const tokenStop = stop.column + (stop.stop - stop.start + 1);
            if (stop.line < row || (stop.line === row && tokenStop < column)) {
                return null;
            }

            if (context.children) {
                for (const child of context.children) {
                    const result = BackendUtils.parseTreeFromPosition(
                        child,
                        column,
                        row,
                        filename
                    );
                    if (result) {
                        return result;
                    }
                }
            }

            return context;
        }
    };
}

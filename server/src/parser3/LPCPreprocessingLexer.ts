import { CharStream, Token } from "antlr4ng";
import { LPCLexer } from "./LPCLexer";
import { LPCTokenFactor } from "./LPCTokenFactory";
import { MacroDefinition } from "../types";
import { LPCToken } from "./LPCToken";

const DISABLED_CHANNEL_NAME = "DISABLED_CHANNEL";
export const DISABLED_CHANNEL = LPCLexer.channelNames.indexOf(
    DISABLED_CHANNEL_NAME
);

enum ConditionalState {
    Disabled = 0,
    Enabled = 1,
    Ignored = 2,
}

export class LPCPreprocessingLexer extends LPCLexer {
    /** the token buffer */
    buffer: Token[] = [];

    /** tracks the state of preprocessor conditionals */
    private conditionalStack: ConditionalState[] = [];

    /** indicates if we are inside one or more preprocessor conditionals */
    get inConditional() {
        return this.conditionalStack.length > 0;
    }
    /** indicates if the next token is executable code or not */
    get isExecutable() {
        return this.conditionalStack.length > 0
            ? this.conditionalStack[this.conditionalStack.length - 1] ===
                  ConditionalState.Enabled
            : true;
    }

    /** indicates if macro substitutions are allowed for the next token */
    allowSubstitutions = true;
    /** the macro table */
    macroTable: Map<string, MacroDefinition> = new Map();
    /** set of disabled macros that should not be applied to the next macro */
    disabledMacros: Set<string> = new Set();
    /** lexer used for processing macro bodies */
    private readonly macroLexer: LPCLexer;

    constructor(input: CharStream) {
        super(input);

        this.macroLexer = new LPCLexer(input);
        this.macroLexer.tokenFactory = new LPCTokenFactor("macro.h");
    }

    override nextToken(): Token {
        if (this.buffer.length == 0) {
            // we're pulling a token from the source doc, which means macro processing has ended
            // turn all macros back on.
            this.disabledMacros.clear();
            super.nextToken();
        }
        return this.buffer.shift()!;
    }

    /** consume tokens until we reach the end of the directive (newline). This will also handle
     * escaped newlines, when the conditional is split across multiple lines separated by a backslash.
     * @returns array containing the tokens that were consumed
     */
    private consumeToEndOfDirective(): Token[] {
        const consumedTokens: Token[] = [];
        let t: Token | undefined = undefined;
        while (
            !(t?.type == LPCLexer.WS && t?.text.indexOf("\n") >= 0) &&
            t?.type != LPCLexer.EOF
        ) {
            t = super.nextToken();
            consumedTokens.push(t);
            if (t?.type == LPCLexer.BACKSLASH) {
                // consume the newline
                t = super.nextToken();
                consumedTokens.push(t);
            }
        }
        return consumedTokens;
    }

    override emitToken(token: Token): void {
        const ltoken = token as LPCToken;

        // there are certain conditionals that are applied even if code is disabled
        switch (token.type) {
            case LPCLexer.IF:
            case LPCLexer.ELIF:
                this.allowSubstitutions = false;
                this.emitAndPush(token);
                if (this.inConditional && !this.isExecutable) {
                    this.conditionalStack.push(ConditionalState.Ignored);
                    // disable this entire conditional
                    token.channel = DISABLED_CHANNEL;
                    this.consumeToEndOfDirective().forEach((t) => {
                        token.channel = DISABLED_CHANNEL;
                    });
                } else {
                    const ifTokens = this.consumeToEndOfDirective();
                    ifTokens.shift(); // remove the space

                    // very basic processing
                    // NTBLA: improve this
                    let expStr = ifTokens
                        .map((t) => t.text)
                        .join(" ")
                        .trim();

                    if (this.macroTable.has(expStr)) {
                        expStr = this.macroTable.get(expStr).value;
                    }

                    let flag = true;
                    if (expStr == "0") {
                        flag = false;
                    } else if (expStr == "1") {
                        flag = true;
                    } else if (expStr.includes("defined(")) {
                        flag = true; // NTBLA implement this
                    } else {
                        // some other string
                        flag = true; // NTBLA implement this
                    }

                    this.conditionalStack.push(
                        flag
                            ? ConditionalState.Enabled
                            : ConditionalState.Disabled
                    );
                }
                this.allowSubstitutions = true;
                return;
            case LPCLexer.ELSE:
                this.allowSubstitutions = true;
                this.emitAndPush(token);
                if (this.inConditional) {
                    const st =
                        this.conditionalStack[this.conditionalStack.length - 1];
                    if (st !== ConditionalState.Ignored) {
                        this.conditionalStack[
                            this.conditionalStack.length - 1
                        ] =
                            st === ConditionalState.Enabled
                                ? ConditionalState.Disabled
                                : ConditionalState.Enabled;
                    }
                } else {
                    // this is an error - log it
                    console.error(
                        "found an #ELSE outside of conditional directive block",
                        `${ltoken.filename}:${token.line}:${token.column}`
                    );
                }
                this.allowSubstitutions = true;
                return;
            case LPCLexer.ENDIF:
                this.emitAndPush(token);
                this.conditionalStack.pop();
                return;
            case LPCLexer.IFDEF:
            case LPCLexer.IFNDEF:
                this.allowSubstitutions = true;
                this.emitAndPush(token);
                const conditionalTokens = this.consumeToEndOfDirective();
                if (this.inConditional && !this.isExecutable) {
                    this.conditionalStack.push(ConditionalState.Ignored);
                    // disable this entire conditional
                    token.channel = DISABLED_CHANNEL;
                    conditionalTokens.forEach((t) => {
                        token.channel = DISABLED_CHANNEL;
                    });
                } else {
                    const shouldExist =
                        token.type == LPCLexer.IFDEF ? true : false;
                    const conditionalTokens = this.consumeToEndOfDirective();
                    conditionalTokens.shift(); // remove the space
                    const symName = conditionalTokens
                        .map((t) => t.text)
                        .join(" ")
                        .trim();

                    this.conditionalStack.push(
                        this.macroTable.has(symName) === shouldExist
                            ? ConditionalState.Enabled
                            : ConditionalState.Disabled
                    );
                }
                this.allowSubstitutions = false;
                return;
        }

        if (!this.isExecutable) {
            token.channel = DISABLED_CHANNEL;
            this.emitAndPush(token);
            return;
        }

        switch (token.type) {
            case LPCLexer.DEFINE:
                this.allowSubstitutions = false;
                this.emitAndPush(token);

                const defValToken = super.nextToken();
                const defVal = defValToken.text.trim();
                // macro name is everything up to the first space
                const nameEndIndex = defVal.match(/[(\s]/)?.index;
                const spaceIndex = defVal.indexOf(" ");
                const macroName = defVal.substring(0, nameEndIndex);

                // macro value is everything after the first space
                const macroValue = defVal.substring(spaceIndex + 1);
                const isFn = nameEndIndex != spaceIndex;

                const def: MacroDefinition = {
                    value: macroValue,
                    name: macroName,
                    filename: "macro.h",
                    annotation: "",
                    args: isFn ? [] : undefined,
                };

                // lex the body
                this.macroLexer.inputStream = CharStream.fromString(macroValue);
                this.macroLexer.reset();
                def.bodyTokens = this.macroLexer.getAllTokens();

                if (isFn) {
                    def.argIndex = new Map();

                    const openParenIndex = defVal.indexOf("(");
                    const closingParenIndex = defVal.indexOf(")");

                    // lex the args
                    const args = defVal
                        .substring(openParenIndex + 1, closingParenIndex)
                        .split(",");
                    args.forEach((a, i) => {
                        def.argIndex.set(a.trim(), i);
                    });
                    // prob don't need this:
                    def.args = args.map((a) => a.trim());
                }

                this.macroTable.set(macroName, def);

                this.allowSubstitutions = true;
                return;
            case LPCLexer.UNDEF:
                this.allowSubstitutions = false;
                this.emitAndPush(token);
                const spaceToken = super.nextToken();
                const undefToken = super.nextToken();
                const undefMacroName = undefToken.text.trim();
                this.macroTable.delete(undefMacroName);

                this.allowSubstitutions = true;
                return;
        }

        if (
            this.allowSubstitutions &&
            !this.disabledMacros.has(token.text) &&
            this.macroTable.has(token.text)
        ) {
            // macro can only be applied once to this stream of tokens.
            this.disabledMacros.add(token.text);

            const macroDef = this.macroTable.get(token.text)!;
            const { argIndex } = macroDef;
            const isFn = !!argIndex;

            // fill in an empty array for each arg
            let fnParams: Token[][] = isFn
                ? Array(macroDef.args.length).fill([])
                : undefined;
            if (isFn) fnParams = fnParams.map((_, i) => []);

            // mark macro as hidden and emit
            token.channel = LPCLexer.HIDDEN;
            this.emitAndPush(token);

            if (isFn) {
                // scroll forward through the macro params all the way to the closing paren
                // hide them all
                let t: Token = undefined;
                let parenCount = 0; // number of open parens we've seen
                let paramIndex = 0; // index of the current param we're on

                // scroll forward to the opening paren
                while (t?.type != LPCLexer.PAREN_OPEN) {
                    t = super.nextToken();
                    t.channel = LPCLexer.HIDDEN;
                    parenCount++;
                }

                // keep scrolling until all the parens are closed
                while (parenCount > 0) {
                    t = super.nextToken();
                    if (t?.type == LPCLexer.PAREN_OPEN) {
                        parenCount++;
                    } else if (t?.type == LPCLexer.PAREN_CLOSE) {
                        parenCount--;
                    } else if (t?.type == LPCLexer.COMMA && parenCount == 1) {
                        paramIndex++;
                        // hide commas
                        t.channel = LPCLexer.HIDDEN;
                    } else {
                        fnParams[paramIndex].push(t);
                    }
                }

                // hide the closing paren
                t.channel = LPCLexer.HIDDEN;
            }

            // emit the macro body, substituting args when encountered
            macroDef.bodyTokens.forEach((t) => {
                if (isFn && argIndex.has(t.text)) {
                    this.emitAndPush(fnParams[argIndex.get(t.text)]);
                } else {
                    this.emitToken(t); // send back through lexer for more macro substitutions
                }
            });
            return;
        }

        this.emitAndPush(token);
    }

    private emitAndPush(tokens: Token | Token[]) {
        const tokenArray = Array.isArray(tokens) ? tokens : [tokens];
        tokenArray.forEach((t) => {
            super.emitToken(t);
            this.buffer.push(t);
        });
    }
}

import { CharStream, Token } from "antlr4ng";
import { LPCLexer } from "./LPCLexer";
import { LPCTokenFactor } from "./LPCTokenFactory";
import { MacroDefinition } from "../types";
import { LPCToken } from "./LPCToken";
import { IFileHandler } from "../backend/types";

const MacroReg = /(\w+)(?:\s*\(([\w\s,]+)\))?\s+(.*)/;

const DISABLED_CHANNEL_NAME = "DISABLED_CHANNEL";
export const DISABLED_CHANNEL = LPCLexer.channelNames.indexOf(
    DISABLED_CHANNEL_NAME
);

enum ConditionalState {
    Disabled = 0,
    Enabled = 1,
    Ignored = 2,
}

type MacroState = {
    tokens: Token[];
    name: string;
    def: MacroDefinition;
    parenCount: number;
    paramIndex: number;
    fnParams?: Token[][];
};

/**
 * @description
 *   nextToken() calls emit, which genearates a token and passes it to emitToken,
 * which sets the token returned by nextToken.
 *
 * Our override of emitToken should only ever add to the buffer.
 */
export class LPCPreprocessingLexer extends LPCLexer {
    public fileHandler: IFileHandler;

    /** the last token index we've emitted */
    tokenIndex: number = 0;

    /** the token buffer */
    buffer: Token[] = [];
    /** queue of tokens to process a directive */
    directiveTokens: Token[] = [];
    macroTokens: Token[] = [];

    private isConsumingDirective = false;

    private macroStack: MacroState[] = [];
    private get isConsumingMacro() {
        return this.macroStack.length > 0;
    }

    /** tracks the state of preprocessor conditionals */
    private conditionalStack: ConditionalState[] = [];

    /** indicates if we are inside one or more preprocessor conditionals */
    private get inConditional() {
        return this.conditionalStack.length > 0;
    }
    /** indicates if the next token is executable code or not */
    private get isExecutable() {
        return this.conditionalStack.length > 0
            ? this.conditionalStack[this.conditionalStack.length - 1] ===
                  ConditionalState.Enabled
            : true;
    }

    /** indicates if macro substitutions are allowed for the next token */
    private allowSubstitutions = true;
    /** the macro table */
    private macroTable: Map<string, MacroDefinition> = new Map();
    /** set of disabled macros that should not be applied to the next macro */
    private disabledMacros: Set<string> = new Set();
    /** lexer used for processing macro bodies */
    private readonly macroLexer: LPCLexer;

    constructor(input: CharStream) {
        super(input);

        this.macroLexer = new LPCLexer(input);
        this.macroLexer.tokenFactory = new LPCTokenFactor("macro.h");
    }

    override nextToken(): Token {
        if (this.buffer.length == 0) {
            // buffer is empty so pull a token from the source doc
            // this will trigger emitToken which will add a token to the buffer
            super.nextToken();
        }

        if (this.buffer.length == 0) debugger;

        // get the next directive
        const token = this.buffer.shift()!;

        // are we starting to consume a directive?
        if (token.type == LPCLexer.HASH || token.type == LPCLexer.DEFINE) {
            this.isConsumingDirective = true;
            this.allowSubstitutions = false;
        }

        if (this.isConsumingDirective) {
            // queue directive tokens
            this.directiveTokens.push(token);

            if (token.type == LPCLexer.INCLUDE) {
                // turn substitutions back on for the include directive
                this.allowSubstitutions = true;
            }

            // check if we're at the end
            if (
                token.type == LPCLexer.EOF ||
                (token.text.indexOf("\n") >= 0 &&
                    this.directiveTokens[this.directiveTokens.length - 1]
                        ?.type != LPCLexer.BACKSLASH)
            ) {
                // end of directive
                this.processDirective(this.directiveTokens);

                this.directiveTokens = [];
                this.isConsumingDirective = false;
                this.allowSubstitutions = true;
            }
        }

        if (
            this.allowSubstitutions &&
            token.type == LPCLexer.Identifier &&
            this.isExecutable &&
            this.macroTable.has(token.text) &&
            !this.disabledMacros.has(token.text)
        ) {
            const def = this.macroTable.get(token.text)!;

            // init params array for function macros

            let fnParams: Token[][];
            if (!!def.args) {
                fnParams = Array(def.args.length).fill([]);
                fnParams = fnParams.map((_, i) => []);
            }

            this.macroStack.push({
                tokens: [],
                def,
                name: token.text,
                fnParams,
                parenCount: 0,
                paramIndex: 0,
            });

            // hide the macro name
            // ntbla: mark this as a macro channel?
            token.channel = LPCLexer.HIDDEN;

            this.disabledMacros.add(token.text);
        }

        if (this.isConsumingMacro && this.isExecutable) {
            token.channel = LPCLexer.HIDDEN; // hide by default

            const macro = peekStack(this.macroStack);
            macro.tokens.push(token);

            const { def, fnParams } = macro;
            const { argIndex } = def;
            const isFn = !!argIndex;

            let macroDone = false;

            if (isFn) {
                // scroll forward through the macro params all the way to the closing paren
                switch (token.type) {
                    case LPCLexer.PAREN_OPEN:
                        // hide the first paren
                        if (macro.parenCount == 0)
                            token.channel = LPCLexer.HIDDEN;
                        macro.parenCount++;
                        break;
                    case LPCLexer.PAREN_CLOSE:
                        macro.parenCount--;
                        // hide the closing paren
                        if (macro.parenCount == 0) {
                            token.channel = LPCLexer.HIDDEN;
                            macroDone = true;
                        }
                        break;
                    case LPCLexer.COMMA:
                        if (macro.parenCount == 1) {
                            // hide commas
                            token.channel = LPCLexer.HIDDEN;
                            macro.paramIndex++;
                        }
                        break;
                    default:
                        if (macro.parenCount > 0)
                            fnParams[macro.paramIndex].push(token);
                }
            } else {
                // not fn, this macro is done
                macroDone = true;
            }

            if (macroDone) {
                // emit the macro body, substituting args when encountered
                def.bodyTokens.forEach((t) => {
                    if (isFn && argIndex.has(t.text)) {
                        this.buffer.push(...fnParams[argIndex.get(t.text)]);
                    } else {
                        this.buffer.push(t);
                    }
                });

                this.disabledMacros.delete(token.text);
                this.macroStack.pop();
            }
        }

        // need to copy the token here so that the tokenIndex is correct
        token.tokenIndex = this.tokenIndex++;
        return token;
    }

    private processInclude(
        token: Token,
        directiveToken: Token,
        directiveTokens: Token[]
    ): boolean {
        directiveTokens.shift(); // remove the space
        const includeFilename = directiveTokens
            .map((t) => t.text.trim())
            .join("")
            .trim();

        if (!this.fileHandler) {
            console.warn(
                `Could not load ${includeFilename}, no file handler set.`
            );
        }

        const includeFile = this.fileHandler.loadImport(includeFilename);

        (this.macroLexer.tokenFactory as LPCTokenFactor).filenameStack.push(
            includeFile.uri
        );

        // lex the the include file
        this.macroLexer.inputStream = CharStream.fromString(includeFile.source);
        this.macroLexer.reset();
        const includeTokens = this.macroLexer.getAllTokens();

        // check if last token is EOF and remove it
        if (includeTokens[includeTokens.length - 1].type == LPCLexer.EOF) {
            includeTokens.pop();
        }

        // push via emit to ensure that the tokens are processed by the preprocessor
        this.isConsumingDirective = false;
        this.allowSubstitutions = true;

        if (includeFile.uri.endsWith("snoop.h")) {
            const i = 0;
        }

        (this.macroLexer.tokenFactory as LPCTokenFactor).filenameStack.pop();

        includeTokens?.forEach((t) => {
            this.emitToken(t); // emit each token so that macro substitutions are applied
        });
        // if (includeTokens?.length > 0) {
        //     this.buffer.push(...includeTokens);
        // }

        return true;
    }

    private processDefine(
        token: Token,
        directiveToken: Token,
        directiveTokens: Token[]
    ): boolean {
        const defValToken = directiveTokens.shift()!;
        const defVal = defValToken.text.trim();
        const matches = defVal.match(MacroReg);

        if (!matches) return false;

        const macroName = matches[1];
        const macroArgs = matches[2];
        const macroValue = matches[3];

        // macro value is everything after the first space
        const isFn = macroArgs?.length > 0;

        const fac = this.tokenFactory as LPCTokenFactor;
        const filename = fac.filenameStack[fac.filenameStack.length - 1];
        const def: MacroDefinition = {
            value: macroValue.trim(),
            name: macroName,
            filename: filename,
            annotation: "",
            args: isFn ? [] : undefined,
        };

        // lex the body
        this.macroLexer.inputStream = CharStream.fromString(macroValue);
        this.macroLexer.reset();
        def.bodyTokens = this.macroLexer.getAllTokens();

        if (isFn) {
            def.argIndex = new Map();

            // lex the args
            const args = macroArgs.split(",");
            args.forEach((a, i) => {
                def.argIndex.set(a.trim(), i);
            });
            // prob don't need this:
            def.args = args.map((a) => a.trim());
        }

        this.macroTable.set(macroName, def);

        return true;
    }

    private processIf(
        token: Token,
        directiveToken: Token,
        directiveTokens: Token[]
    ): boolean {
        this.allowSubstitutions = false;

        if (this.inConditional && !this.isExecutable) {
            this.conditionalStack.push(ConditionalState.Ignored);
            // disable this entire conditional
            token.channel = directiveToken.channel = DISABLED_CHANNEL;
            directiveTokens.forEach((t) => {
                t.channel = DISABLED_CHANNEL;
            });
        } else {
            const ifTokens = directiveTokens;
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
                flag ? ConditionalState.Enabled : ConditionalState.Disabled
            );

            // hide everything
            token.channel = directiveToken.channel = LPCLexer.HIDDEN;
            directiveTokens.forEach((t) => {
                t.channel = token.channel;
            });
        }
        this.allowSubstitutions = true;
        return true;
    }

    private processElse(
        token: Token,
        directiveToken: Token,
        directiveTokens: Token[]
    ): boolean {
        this.allowSubstitutions = true;
        if (this.inConditional) {
            const st = this.conditionalStack[this.conditionalStack.length - 1];
            if (st !== ConditionalState.Ignored) {
                this.conditionalStack[this.conditionalStack.length - 1] =
                    st === ConditionalState.Enabled
                        ? ConditionalState.Disabled
                        : ConditionalState.Enabled;
            }
        } else {
            // this is an error - log it
            const ltoken = directiveToken as LPCToken;
            console.error(
                "found an #ELSE outside of conditional directive block",
                `${ltoken.filename}:${token.line}:${token.column}`
            );
        }
        this.allowSubstitutions = true;
        // hide everything
        token.channel = directiveToken.channel = LPCLexer.HIDDEN;
        directiveTokens.forEach((t) => {
            t.channel = token.channel;
        });
        return true;
    }

    private processEndif(
        token: Token,
        directiveToken: Token,
        directiveTokens: Token[]
    ): boolean {
        this.conditionalStack.pop();
        // set this back to NOT disabled
        token.channel = directiveToken.channel = LPCLexer.DEFAULT_TOKEN_CHANNEL;
        // hide everything
        token.channel = directiveToken.channel = LPCLexer.HIDDEN;
        directiveTokens.forEach((t) => {
            t.channel = token.channel;
        });
        return true;
    }

    private processIfdef(
        token: Token,
        directiveToken: Token,
        directiveTokens: Token[]
    ): boolean {
        this.allowSubstitutions = true;
        const conditionalTokens = directiveTokens;
        if (this.inConditional && !this.isExecutable) {
            this.conditionalStack.push(ConditionalState.Ignored);
            // disable this entire conditional
            token.channel = directiveToken.channel = DISABLED_CHANNEL;
            conditionalTokens.forEach((t) => {
                token.channel = DISABLED_CHANNEL;
            });
        } else {
            const shouldExist = token.type == LPCLexer.IFDEF ? true : false;
            const conditionalTokens = directiveTokens;
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

        // hide everything
        token.channel = directiveToken.channel = LPCLexer.HIDDEN;
        directiveTokens.forEach((t) => {
            t.channel = token.channel;
        });

        return true;
    }

    private processUndefine(
        token: Token,
        directiveToken: Token,
        directiveTokens: Token[]
    ): boolean {
        const spaceToken = directiveTokens.shift()!;
        const undefToken = directiveTokens.shift()!;
        const undefMacroName = undefToken.text.trim();
        this.macroTable.delete(undefMacroName);

        return true;
    }

    /**
     * handles preprocessor directives
     * @param token the first token - should be a hash
     * @returns true if the token was consumed as a directive, false otherwise
     */
    private processDirective(directiveTokens: Token[]): boolean {
        const token = directiveTokens.shift(); // the hash will be back, remove it.

        const directiveToken =
            token.type == LPCLexer.HASH ? directiveTokens.shift() : token; // special case for define

        // there are certain conditionals that are applied even if code is disabled
        switch (directiveToken.type) {
            case LPCLexer.IF:
            case LPCLexer.ELIF:
                return this.processIf(token, directiveToken, directiveTokens);
            case LPCLexer.ELSE:
                return this.processElse(token, directiveToken, directiveTokens);
            case LPCLexer.ENDIF:
                return this.processEndif(
                    token,
                    directiveToken,
                    directiveTokens
                );
            case LPCLexer.IFDEF:
            case LPCLexer.IFNDEF:
                return this.processIfdef(
                    token,
                    directiveToken,
                    directiveTokens
                );
        }

        if (!this.isExecutable) {
            token.channel = directiveToken.channel = DISABLED_CHANNEL;
            directiveTokens.forEach((t) => {
                token.channel = DISABLED_CHANNEL;
            });
            return true;
        }

        switch (directiveToken.type) {
            case LPCLexer.INCLUDE:
                return this.processInclude(
                    token,
                    directiveToken,
                    directiveTokens
                );
            case LPCLexer.DEFINE:
                return this.processDefine(
                    token,
                    directiveToken,
                    directiveTokens
                );
            case LPCLexer.UNDEF:
                return this.processUndefine(
                    token,
                    directiveToken,
                    directiveTokens
                );
        }
    }

    override emitToken(token: Token): void {
        const lt = token as LPCToken;

        if (!this.isExecutable) {
            token.channel = DISABLED_CHANNEL;
        }

        // if (
        //     this.allowSubstitutions &&
        //     !this.disabledMacros.has(token.text) &&
        //     this.macroTable.has(token.text) &&
        //     token.channel == LPCLexer.DEFAULT_TOKEN_CHANNEL
        // ) {
        //     // macro can only be applied once to this stream of tokens.
        //     this.disabledMacros.add(token.text);

        //     const macroDef = this.macroTable.get(token.text)!;
        //     const { argIndex } = macroDef;
        //     const isFn = !!argIndex;

        //     // fill in an empty array for each arg
        //     let fnParams: Token[][] = isFn
        //         ? Array(macroDef.args.length).fill([])
        //         : undefined;
        //     if (isFn) fnParams = fnParams.map((_, i) => []);

        //     // mark macro as hidden and emit
        //     token.channel = LPCLexer.HIDDEN;

        //     if (isFn) {
        //         // scroll forward through the macro params all the way to the closing paren
        //         // hide them all
        //         let t: Token = undefined;
        //         let parenCount = 0; // number of open parens we've seen
        //         let paramIndex = 0; // index of the current param we're on

        //         // scroll forward to the opening paren
        //         while (
        //             t?.type != LPCLexer.PAREN_OPEN &&
        //             t?.type != LPCLexer.EOF
        //         ) {
        //             t = this.nextToken();
        //             t.channel = LPCLexer.HIDDEN;
        //             parenCount++;
        //         }

        //         // keep scrolling until all the parens are closed
        //         while (parenCount > 0 && t.type != LPCLexer.EOF) {
        //             t = this.nextToken();
        //             if (t?.type == LPCLexer.PAREN_OPEN) {
        //                 parenCount++;
        //             } else if (t?.type == LPCLexer.PAREN_CLOSE) {
        //                 parenCount--;
        //             } else if (t?.type == LPCLexer.COMMA && parenCount == 1) {
        //                 paramIndex++;
        //                 // hide commas
        //                 t.channel = LPCLexer.HIDDEN;
        //             } else {
        //                 fnParams[paramIndex].push(t);
        //             }
        //         }

        //         // hide the closing paren
        //         t.channel = LPCLexer.HIDDEN;
        //     }

        //     // emit the macro body, substituting args when encountered
        //     this.buffer.push(token);
        //     macroDef.bodyTokens.forEach((t) => {
        //         if (isFn && argIndex.has(t.text)) {
        //             this.buffer.push(...fnParams[argIndex.get(t.text)]);
        //         } else {
        //             this.buffer.push(t);
        //         }
        //     });

        //     this.disabledMacros.delete(token.text);
        //     return;
        // }

        // we don't eve need to call super.emitToken because we'll always return from the buffer
        //super.emitToken(token);
        this.buffer.push(token);
    }
}

function peekStack<T>(stack: T[]) {
    return stack[stack.length - 1];
}

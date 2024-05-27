import { CharStream, Token } from "antlr4ng";
import { LPCLexer } from "./LPCLexer";
import { LPCTokenFactor } from "./LPCTokenFactory";
import { MacroDefinition } from "../types";
import { LPCToken } from "./LPCToken";
import { LpcFileHandler } from "../backend/FileHandler";
import { IFileHandler } from "../backend/types";

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
    public fileHandler: IFileHandler;

    /** the token buffer */
    buffer: Token[] = [];
    emitQueue: Token[] = [];

    private isConsumingDirective = false;

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
        if (this.emitQueue.length > 0) {
            this.emitToken(this.emitQueue.shift());
        } else if (this.buffer.length == 0) {
            // we're pulling a token from the source doc, which means macro processing has ended
            // turn all macros back on.
            super.nextToken();
        }

        const token = this.buffer.shift()!;

        if (this.isConsumingDirective) {
            return token;
        } else if (
            (token.type == LPCLexer.HASH || token.type == LPCLexer.DEFINE) &&
            token.column - (token.text?.length ?? 0) == 0
        ) {
            if (this.processDirective(token)) {
                return token;
            }
        }

        if (
            this.allowSubstitutions &&
            !this.disabledMacros.has(token.text) &&
            this.macroTable.has(token.text) &&
            token.channel == LPCLexer.DEFAULT_TOKEN_CHANNEL
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

            if (isFn) {
                // scroll forward through the macro params all the way to the closing paren
                // hide them all
                let t: Token = undefined;
                let parenCount = 0; // number of open parens we've seen
                let paramIndex = 0; // index of the current param we're on

                // scroll forward to the opening paren
                while (
                    t?.type != LPCLexer.PAREN_OPEN &&
                    t?.type != LPCLexer.EOF
                ) {
                    t = this.nextToken();
                    t.channel = LPCLexer.HIDDEN;
                    parenCount++;
                }

                // keep scrolling until all the parens are closed
                while (parenCount > 0 && t.type != LPCLexer.EOF) {
                    t = this.nextToken();
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
                    this.emitQueue.push(...fnParams[argIndex.get(t.text)]);
                    //this.emitAndPush(fnParams[argIndex.get(t.text)]);
                } else {
                    this.emitQueue.push(t);
                    //this.emitToken(t); // send back through lexer for more macro substitutions
                }
            });

            this.disabledMacros.delete(token.text);

            return token;
        }

        return token;
    }

    /** consume tokens until we reach the end of the directive (newline). This will also handle
     * escaped newlines, when the conditional is split across multiple lines separated by a backslash.
     * @returns array containing the tokens that were consumed
     */
    private consumeToEndOfDirective(
        allowSubstitutions = false,
        tokenLimit: number = undefined
    ): Token[] {
        this.isConsumingDirective = true;
        this.allowSubstitutions = false;
        const consumedTokens: Token[] = [];
        let t: Token | undefined = undefined;
        let i = 0;
        while (
            !(t?.type == LPCLexer.WS && t?.text.indexOf("\n") >= 0) &&
            t?.type != LPCLexer.EOF &&
            (tokenLimit === undefined || i < tokenLimit)
        ) {
            t = this.nextToken();
            consumedTokens.push(t);
            if (t?.type == LPCLexer.BACKSLASH) {
                // consume the newline
                t = this.nextToken();
                consumedTokens.push(t);
            }
            i++;
        }
        this.isConsumingDirective = false;
        this.allowSubstitutions = true;

        //this.buffer.push(...consumedTokens);
        this.emitQueue.push(...consumedTokens);
        return consumedTokens;
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

        if (includeTokens?.length > 0) {
            this.emitQueue.push(...includeTokens);
        }

        (this.macroLexer.tokenFactory as LPCTokenFactor).filenameStack.pop();
        return true;
    }

    private processDefine(
        token: Token,
        directiveToken: Token,
        directiveTokens: Token[]
    ): boolean {
        const defValToken = directiveTokens.shift()!;
        const defVal = defValToken.text.trim();
        // macro name is everything up to the first space
        const nameEndIndex = defVal.match(/[(\s]/)?.index;
        const spaceIndex = defVal.indexOf(" ");
        const openParenIndex = defVal.indexOf("(");
        const closingParenIndex = defVal.indexOf(")");

        const macroName = defVal.substring(0, nameEndIndex);

        // macro value is everything after the first space
        const isFn = closingParenIndex >= 0;
        const macroValue = defVal.substring(
            defVal.indexOf(" ", closingParenIndex)
        );

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
    private processDirective(token: Token): boolean {
        //this.emitAndPush(token);

        const directiveTokens = this.consumeToEndOfDirective(
            token.type == LPCLexer.INCLUDE,
            token.type == LPCLexer.DEFINE ? 1 : undefined
        );
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
            this.consumeToEndOfDirective().forEach((t) => {
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
            // this.emitAndPush(token);
            // return;
        }

        super.emitToken(token);
        this.buffer.push(token);
        // this.emitAndPush(token);
    }

    private emitAndPush(tokens: Token | Token[]) {
        const tokenArray = Array.isArray(tokens) ? tokens : [tokens];
        tokenArray.forEach((t) => {
            //super.emitToken(t);
            if (!t) debugger;
            this.buffer.push(t);
        });
    }
}

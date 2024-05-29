import { CharStream, Token } from "antlr4ng";
import { LPCLexer } from "./LPCLexer";
import { LPCTokenFactor } from "./LPCTokenFactory";
import { MacroDefinition } from "../types";
import { LPCToken } from "./LPCToken";
import { IFileHandler } from "../backend/types";

const DISABLED_CHANNEL_NAME = "DISABLED_CHANNEL";
const DIRECTIVE_CHANNEL_NAME = "DIRECTIVE_CHANNEL";
const COMMENT_CHANNEL_NAME = "COMMENTS_CHANNEL";

export const DISABLED_CHANNEL = LPCLexer.channelNames.indexOf(
    DISABLED_CHANNEL_NAME
);
export const DIRECTIVE_CHANNEL = LPCLexer.channelNames.indexOf(
    DIRECTIVE_CHANNEL_NAME
);
export const COMMENT_CHANNEL =
    LPCLexer.channelNames.indexOf(COMMENT_CHANNEL_NAME);

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

    /** the token buffer */
    private buffer: Token[] = [];
    /** queue of tokens to process a directive */
    private directiveTokens: Token[] = [];

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

    constructor(input: CharStream, filename: string) {
        super(input);

        this.macroLexer = new LPCLexer(input);
        this.macroLexer.tokenFactory = new LPCTokenFactor(filename);
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
        if (
            (token.type == LPCLexer.HASH || token.type == LPCLexer.DEFINE) &&
            token.column == 0
        ) {
            this.isConsumingDirective = true;
            this.allowSubstitutions = false;
        }

        if (this.isConsumingDirective) {
            // put directives on the directive channel by default.
            // they may get disabled or hidden later
            if (token.channel == LPCLexer.DEFAULT_TOKEN_CHANNEL) {
                token.channel = DIRECTIVE_CHANNEL;
            }

            // queue directive tokens
            // don't add EOF tokens to the directive
            if (token.type != LPCLexer.EOF) {
                this.directiveTokens.push(token);
            }

            if (token.type == LPCLexer.INCLUDE) {
                // turn substitutions back on for the include directive
                // don't hide
                this.allowSubstitutions = true;
                //token.channel = LPCLexer.DEFAULT_TOKEN_CHANNEL;
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
            token.channel = DIRECTIVE_CHANNEL;

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
                        else fnParams[macro.paramIndex].push(token);

                        macro.parenCount++;
                        break;
                    case LPCLexer.PAREN_CLOSE:
                        macro.parenCount--;
                        // hide the closing paren
                        if (macro.parenCount == 0) {
                            token.channel = LPCLexer.HIDDEN;
                            macroDone = true;
                        } else {
                            fnParams[macro.paramIndex].push(token);
                        }
                        break;
                    case LPCLexer.COMMA:
                        if (macro.parenCount == 1) {
                            // hide commas
                            token.channel = LPCLexer.HIDDEN;
                            macro.paramIndex++;
                        } else {
                            fnParams[macro.paramIndex].push(token);
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
                const fac = this.tokenFactory as LPCTokenFactor;
                const refTkn = macro.tokens[0];

                // collect tokens for this substitution
                const macroBuffer: Token[] = [];

                def.bodyTokens?.forEach((bodyToken: LPCToken) => {
                    if (bodyToken.channel == 0) {
                        const t = fac.cloneToken(bodyToken);
                        t.line = refTkn.line;
                        t.relatedToken = refTkn; // the first token is the triggering token
                        if (isFn && argIndex.has(t.text)) {
                            const tks = fnParams[argIndex.get(t.text)].map(
                                (tk: LPCToken) => {
                                    const newToken = fac.cloneToken(tk);
                                    newToken.channel =
                                        LPCLexer.DEFAULT_TOKEN_CHANNEL;
                                    newToken.line = refTkn.line;
                                    return newToken;
                                }
                            );
                            macroBuffer.push(...tks);
                        } else {
                            macroBuffer.push(t);
                        }
                    }
                });

                // when applying macros, they must be applied to the start of the buffer
                this.buffer.unshift(...macroBuffer);

                this.disabledMacros.delete(macro.name);
                this.macroStack.pop();
            }
        }

        if (!this.isExecutable) {
            token.channel = DISABLED_CHANNEL;
        }

        // do some final checks
        if (token.type == LPCLexer.EOF) {
            if (token.channel != 0) {
                const filename = (this.tokenFactory as LPCTokenFactor)
                    ?.filenameStack[0];
                console.warn(
                    `EOF token was is channel ${token.channel}, moving to default. [${filename}]`
                );
                token.channel = 0;
            }

            if (!this.isExecutable) {
                throw "missing #endif";
            } else if (this.isConsumingMacro) {
                throw "missing macro end";
            } else if (this.disabledMacros.size > 0) {
                throw "incomplete macro processing";
            }
        }

        return token;
    }

    private processInclude(
        token: Token,
        directiveToken: Token,
        directiveTokens: Token[]
    ): boolean {
        const lt = token as LPCToken;
        // move back to the default channel
        token.channel = directiveToken.channel = LPCLexer.DEFAULT_TOKEN_CHANNEL;
        directiveTokens
            .filter((t) => t.channel == DIRECTIVE_CHANNEL)
            .forEach((t) => {
                t.channel = LPCLexer.DEFAULT_TOKEN_CHANNEL;
            });

        directiveTokens.shift(); // remove the space
        const includeFilename = directiveTokens
            .filter((t) => t.channel == LPCLexer.DEFAULT_TOKEN_CHANNEL)
            .map((t) => t.text.trim())
            .join("")
            .trim();

        if (!this.fileHandler) {
            console.warn(
                `Could not load ${includeFilename}, no file handler set.`
            );
        }

        const includeFile = this.fileHandler.loadImport(
            lt.filename,
            includeFilename
        );

        if (!includeFile?.source) {
            console.warn("Could not load include file ", includeFilename);
        }

        // lex the the include file
        const includeTokens = this.lexMacro(
            includeFile.uri,
            includeFile.source + "\n" // add a newline just to be safe
        );

        // push via emit to ensure that the tokens are processed by the preprocessor
        this.isConsumingDirective = false;
        this.allowSubstitutions = true;

        if (!!includeTokens) {
            includeTokens?.forEach((t: LPCToken) => {
                t.relatedToken = token;
            });
            this.buffer.unshift(...includeTokens);
        }

        return true;
    }

    private processDefine(
        token: Token,
        directiveToken: Token,
        directiveTokens: Token[]
    ): boolean {
        // move everyone back to default
        token.channel = directiveToken.channel = LPCLexer.DEFAULT_TOKEN_CHANNEL;
        directiveTokens.forEach((t) => {
            t.channel = LPCLexer.DEFAULT_TOKEN_CHANNEL;
        });

        const lt = token as LPCToken;
        const defValToken = directiveTokens.shift()!;
        let defVal = defValToken?.text.trim();
        let isFn = false;

        // scroll through the characters of the string defVal
        // until we find either whitespace or an open paren
        // the chars up to that point are macroName.
        let i = 0;
        for (
            i = 0;
            i < defVal.length &&
            !isWS(defVal.charCodeAt(i)) &&
            defVal.charAt(i) != "(";
            i++
        ) {}

        const macroName = defVal.substring(0, i);
        defVal = defVal.substring(i).trim();

        let macroValue = defVal.trim();
        let macroArgs = "";
        if (defVal.charAt(0) == "(") {
            // this might be a macro function, find the closing paren
            let parenCount = 1;
            let j = 1;
            for (; parenCount > 0 && j < defVal.length; j++) {
                if (defVal.charAt(j) == "(") parenCount++;
                if (defVal.charAt(j) == ")") parenCount--;
            }
            const tempVal = defVal.substring(1, j - 1);
            defVal = defVal.substring(j).trim();

            if (
                defVal.length > 0 &&
                !defVal.startsWith("//") &&
                !defVal.startsWith("/*")
            ) {
                // this is a function macro
                // evertyting that's left is the value
                isFn = true;
                macroValue = defVal.trim();

                // parse the args - remove outermost parens
                macroArgs = tempVal;
            }
        }

        // replace all '\\n' with '\n'
        macroValue = macroValue.replace(/\\\n/g, "\n");

        const filename = lt.filename;
        const def: MacroDefinition = {
            value: macroValue.trim(),
            token: directiveToken,
            name: macroName,
            filename: filename,
            args: isFn ? [] : undefined,
        };

        // lex the body
        def.bodyTokens = this.lexMacro(filename + ":" + macroName, macroValue);

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
                .filter((t) => t.channel != COMMENT_CHANNEL)
                .map((t) => t?.text)
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
            token.channel = directiveToken.channel = DIRECTIVE_CHANNEL;
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
        token.channel = directiveToken.channel = DIRECTIVE_CHANNEL;
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
        // hide everything
        token.channel = directiveToken.channel = DIRECTIVE_CHANNEL;
        directiveTokens.forEach((t) => {
            if (t.channel != COMMENT_CHANNEL) {
                t.channel = token.channel;
            }
        });
        return true;
    }

    private processIfdef(
        token: Token,
        directiveToken: Token,
        directiveTokens: Token[]
    ): boolean {
        const conditionalTokens = directiveTokens;
        if (this.inConditional && !this.isExecutable) {
            this.conditionalStack.push(ConditionalState.Ignored);
            // disable this entire conditional
            token.channel = directiveToken.channel = DISABLED_CHANNEL;
            conditionalTokens.forEach((t) => {
                token.channel = DISABLED_CHANNEL;
            });
        } else {
            const shouldExist =
                directiveToken.type == LPCLexer.IFDEF ? true : false;
            const conditionalTokens = directiveTokens;
            conditionalTokens.shift(); // remove the space
            const symName = conditionalTokens
                .map((t) => t?.text)
                .join(" ")
                .trim();

            this.conditionalStack.push(
                this.macroTable.has(symName) === shouldExist
                    ? ConditionalState.Enabled
                    : ConditionalState.Disabled
            );

            // hide everything
            token.channel = directiveToken.channel = DIRECTIVE_CHANNEL;
            directiveTokens.forEach((t) => {
                t.channel = token.channel;
            });
        }

        return true;
    }

    private processUndefine(
        token: Token,
        directiveToken: Token,
        directiveTokens: Token[]
    ): boolean {
        const spaceToken = directiveTokens.shift()!;
        const undefToken = directiveTokens.shift()!;
        const undefMacroName = undefToken?.text.trim();
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

        this.buffer.push(token);
    }

    private lexMacro(filename: string, macroBody: string): Token[] {
        if (!macroBody) return undefined;

        const fac = this.macroLexer.tokenFactory as LPCTokenFactor;
        fac.filenameStack.push(filename);

        // lex the the include file
        this.macroLexer.inputStream = CharStream.fromString(macroBody);
        this.macroLexer.reset();
        const tokens = this.macroLexer.getAllTokens();

        // check if last token is EOF and remove it
        if (peekStack(tokens)?.type == LPCLexer.EOF) {
            tokens.pop();
        }

        fac.filenameStack.pop();
        return tokens;
    }

    /**
     * Reset the lexer and its macro table
     * @param seekBack
     */
    override reset(seekBack?: boolean): void {
        super.reset(seekBack);

        this.conditionalStack = [];
        this.macroTable.clear();
        this.buffer = [];
    }

    /**
     * Adds a set of key/value pairs as macros to the lexer.
     * @param configMacros key/value pairs where `key` is the macro name and `value` is the macro value
     */
    public addMacros(configMacros: Map<string, string>) {
        for (const [name, value] of configMacros.entries()) {
            const def: MacroDefinition = {
                name,
                value,
                bodyTokens: this.lexMacro("internal", value),
                filename: undefined,
                token: undefined,
            };
            this.macroTable.set(name, def);
        }
    }
}

function peekStack<T>(stack: T[]) {
    return stack[stack.length - 1];
}

function isWS(charCode: number) {
    return (
        charCode === 32 || charCode === 9 || charCode === 13 || charCode === 10
    );
}

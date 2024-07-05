import {
    CharStream,
    CommonTokenStream,
    DefaultErrorStrategy,
    PredictionMode,
    TerminalNode,
} from "antlr4ng";
import { LPCPreprocessingLexer } from "../parser3/LPCPreprocessingLexer";
import { BaseNodeFactory } from "./baseNodeFactory";
import { createNodeFactory } from "./nodeFactory";
import {
    EndOfFileToken,
    Identifier,
    Node,
    NodeFlags,
    PrivateIdentifier,
    SourceFile,
    Statement,
    SyntaxKind,
} from "./types";
import {
    Mutable,
    objectAllocator,
    setTextRangePosEnd,
    setTextRangePosWidth,
} from "./utilities";
import { LPCParser, ProgramContext } from "../parser3/LPCParser";

namespace Parser {
    // Init some ANTLR stuff
    const lexer = new LPCPreprocessingLexer(CharStream.fromString(""), "");
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new LPCParser(tokenStream);
    parser.errorHandler = new DefaultErrorStrategy();
    parser.interpreter.predictionMode = PredictionMode.SLL;
    var tree: ProgramContext; // antlr parse tree

    // capture constructors in 'initializeState' to avoid null checks
    var NodeConstructor: new (kind: SyntaxKind, pos: number, end: number) => Node; // prettier-ignore
    var TokenConstructor: new (kind: SyntaxKind, pos: number, end: number) => Node; // prettier-ignore
    var IdentifierConstructor: new (kind: SyntaxKind.Identifier, pos: number, end: number) => Identifier; // prettier-ignore
    var PrivateIdentifierConstructor: new (kind: SyntaxKind.PrivateIdentifier, pos: number, end: number) => PrivateIdentifier; // prettier-ignore
    var SourceFileConstructor: new (kind: SyntaxKind.SourceFile, pos: number, end: number) => SourceFile; // prettier-ignore

    function countNode(node: Node) {
        nodeCount++;
        return node;
    }

    // Rather than using `createBaseNodeFactory` here, we establish a `BaseNodeFactory` that closes over the
    // constructors above, which are reset each time `initializeState` is called.
    // prettier-ignore
    var baseNodeFactory: BaseNodeFactory = {
        createBaseSourceFileNode: kind => countNode(new SourceFileConstructor(kind, /*pos*/ 0, /*end*/ 0)),
        createBaseIdentifierNode: kind => countNode(new IdentifierConstructor(kind, /*pos*/ 0, /*end*/ 0)),
        createBasePrivateIdentifierNode: kind => countNode(new PrivateIdentifierConstructor(kind, /*pos*/ 0, /*end*/ 0)),
        createBaseTokenNode: kind => countNode(new TokenConstructor(kind, /*pos*/ 0, /*end*/ 0)),
        createBaseNode: kind => countNode(new NodeConstructor(kind, /*pos*/ 0, /*end*/ 0)),
    };

    var factory = createNodeFactory(baseNodeFactory);
    // pull out some factories here
    var { createToken: factoryCreateToken } = factory;

    let fileName: string;
    let sourceText: string;
    /** indicates whether we are parsing top-level statements */
    let topLevel = true;

    var contextFlags: NodeFlags;
    var parseErrorBeforeNextFinishedNode = false;

    var nodeCount: number;
    var identifiers: Map<string, string>;
    var identifierCount: number;

    export function parseSourceFile(fileName: string, sourceText: string) {
        initState(fileName, sourceText);
        const result = parseSourceFileWorker();
        clearState();
        return result;
    }

    function initState(_fileName: string, _sourceText: string) {
        NodeConstructor = objectAllocator.getNodeConstructor();
        TokenConstructor = objectAllocator.getTokenConstructor();
        IdentifierConstructor = objectAllocator.getIdentifierConstructor();
        PrivateIdentifierConstructor =
            objectAllocator.getPrivateIdentifierConstructor();
        SourceFileConstructor = objectAllocator.getSourceFileConstructor();

        fileName = _fileName;
        sourceText = _sourceText;

        // initialize antlr stuff here
        lexer.inputStream = CharStream.fromString(sourceText);
        lexer.reset();
        // TODO: add macros

        tokenStream.setTokenSource(lexer);
        parser.reset();

        tokenStream.reset();
        tokenStream.fill();
    }

    function clearState() {
        // reset antlr stuff
        this.lexer.inputStream = CharStream.fromString("");
        this.tokenStream.setTokenSource(undefined); // this will clear the buffered tokens

        sourceText = undefined!;
        topLevel = true;
        tree = undefined!; // should this be cleared?
    }

    function parseSourceFileWorker() {
        // execute the antlr parser
        tree = parser.program();
        const eofToken = parseTokenNode<EndOfFileToken>(tree.EOF());
        const statements = [];
        const sourceFile = createSourceFile(fileName, statements, eofToken);
        return sourceFile;
    }

    function createSourceFile(
        fileName: string,
        statements: readonly Statement[],
        endOfFileToken: EndOfFileToken
    ): SourceFile {
        let sourceFile = factory.createSourceFile(
            statements,
            endOfFileToken,
            0
        );
        setTextRangePosWidth(sourceFile, 0, sourceText.length);

        sourceFile.fileName = fileName;
        sourceFile.text = sourceText;

        return sourceFile;
    }

    function finishNode<T extends Node>(node: T, pos: number, end?: number): T {
        setTextRangePosEnd(node, pos, end ?? pos);
        if (contextFlags) {
            (node as Mutable<T>).flags |= contextFlags;
        }

        // Keep track on the node if we encountered an error while parsing it.  If we did, then
        // we cannot reuse the node incrementally.  Once we've marked this node, clear out the
        // flag so that we don't mark any subsequent nodes.
        if (parseErrorBeforeNextFinishedNode) {
            parseErrorBeforeNextFinishedNode = false;
            (node as Mutable<T>).flags |= NodeFlags.ThisNodeHasError;
        }

        return node;
    }

    function parseTokenNode<T extends Node>(parserNode: TerminalNode): T {
        const pos = getTerminalPos(parserNode);
        const kind = getTerminalKind(parserNode);
        return finishNode(factoryCreateToken(kind), pos) as T;
    }

    function getTerminalPos(t: TerminalNode): number {
        return t.getSymbol().start;
    }

    function getTerminalKind(t: TerminalNode): SyntaxKind {
        return t.getSymbol().type;
    }
}

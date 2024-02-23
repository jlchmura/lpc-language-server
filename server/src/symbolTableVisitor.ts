import {
  SymbolTable,
  ScopedSymbol,
  VariableSymbol,
  RoutineSymbol,
  MethodSymbol,
  TypedSymbol,
  IType,
  TypeKind,
  FundamentalType,
  ArrayType,
  ReferenceKind,
  BaseSymbol,
} from "antlr4-c3/index";

import { AbstractParseTreeVisitor, ParseTree, TerminalNode } from "antlr4ng";
import { DefinePreprocessorDirectiveContext, SelectionDirectiveContext, VariableDeclarationContext, IfStatementContext, FunctionDeclarationContext } from "./parser3/LPCParser";
import { LPCParserVisitor } from "./parser3/LPCParserVisitor";



export class SymbolTableVisitor
  extends AbstractParseTreeVisitor<SymbolTable>
  implements LPCParserVisitor<SymbolTable>
{
  public functionNodes = new Map<string, TerminalNode>();

  constructor(
    protected readonly symbolTable = new SymbolTable("", {}),
    protected scope = symbolTable.addNewSymbolOfType(ScopedSymbol, undefined)
  ) {
    super();
  }

  protected defaultResult(): SymbolTable {
    return this.symbolTable;
  }
  
  visitDefinePreprocessorDirective = (
    ctx: DefinePreprocessorDirectiveContext
  ) => {
    const defineStr = ctx.END_DEFINE()?.getText();

    // trim everything after the first space
    const idx = defineStr.indexOf(" ");
    const label = defineStr.substring(0, idx);

    //this.scope.context = ctx; // store the context for later
    const sym = this.symbolTable.addNewSymbolOfType(
      DefineSymbol,
      this.scope,
      label
    );
    sym.context = ctx;
    return this.visitChildren(ctx);
  };

  visitSelectionDirective = (ctx: SelectionDirectiveContext) => {
    const tokenIdx = ctx.start.tokenIndex;
    const label =
      ctx.selectionDirectiveTypeSingle()?.getText() ||
      ctx.selectionDirectiveTypeWithArg()?.getText();
    const name = label + "_" + tokenIdx;

    if (!!name) {
      return this.withScope(ctx, PreprocessorSymbol, [name, label], () =>
        this.visitChildren(ctx)
      );
    } else {
      return this.visitChildren(ctx);
    }
  };

  visitVariableDeclaration = (ctx: VariableDeclarationContext) => {
    // ctx will either be scalar or array, it doesn't matter right now
    let tt = ctx.typeSpecifier()?.getText();
    let varType: IType;
    const isArray = tt.endsWith("*");
    if (isArray) {
      tt = tt.substring(0, tt.length - 1);
    }
    switch (tt) {
      case "int":
        varType = FundamentalType.integerType;
        break;
      case "string":
        varType = FundamentalType.stringType;
        break;
      case "float":
        varType = FundamentalType.floatType;
        break;
    }

    if (isArray) {
      varType = new ArrayType(tt + "*", ReferenceKind.Pointer, varType);
    }

    const ids = ctx.Identifier();    
    ids.forEach((id) => {
      const sym = this.symbolTable.addNewSymbolOfType(
        VariableSymbol,
        this.scope,
        id.getText(),
        undefined,
        varType
      );
      sym.context = ctx;
    });

    const assigns = ctx.assignmentExpression();
    assigns.forEach((assign) => {
      const id = assign.Identifier();
      const exp = assign.expression();
      const sym = this.symbolTable.addNewSymbolOfType(
        VariableSymbol,
        this.scope,
        id.getText(),
        exp.getText(),
        varType
      );
      sym.context = ctx;
    });

    return this.visitChildren(ctx);
  };

  visitIfStatement = (ctx: IfStatementContext) => {
    const tokenIdx = ctx.start.tokenIndex;
    const name = "if_" + tokenIdx;

    const ifSym = this.withScope(ctx, IfSymbol, [name], () => {
      const scope = this.scope as IfSymbol;

      let i = 0;
      const ifExpCtx = ctx.ifExpression();
      const ifExp = this.symbolTable.addNewSymbolOfType(
        SelectionSymbol,
        this.scope,
        `if_${tokenIdx}_${i++}`,
        "if"
      );
      ifExp.context = ifExpCtx;
      scope.if = ifExp;

      const ifElseCtx = ctx.elseIfExpression() ?? [];
      scope.elseIf = [];
      ifElseCtx.forEach((e) => {
        const elseIfExp = this.symbolTable.addNewSymbolOfType(
          SelectionSymbol,
          this.scope,
          `elseif_${tokenIdx}_${i++}`,
          "else if"
        );
        elseIfExp.context = e;
        scope.elseIf.push(elseIfExp);
      });

      const elseCtx = ctx.elseExpression();
      if (!!elseCtx) {
        const elseExp = this.symbolTable.addNewSymbolOfType(
          SelectionSymbol,
          this.scope,
          `else_${tokenIdx}_${i++}`,
          "else"
        );
        elseExp.context = elseCtx;
        scope.else = elseExp;
      }

      return this.visitChildren(ctx);
    });

    return ifSym;
  };

  //   visitSelectionStatement = (ctx: SelectionStatementContext) => {
  //     const label =
  //       ctx.ifStatement()?.IF()?.getText() ||
  //       ctx.switchStatement()?.SWITCH()?.getText();
  //     const tokenIdx = ctx.start.tokenIndex;
  //     const name = label + "_" + tokenIdx;
  //     return this.withScope(ctx, SelectionSymbol, [name, label], () =>
  //       this.visitChildren(ctx)
  //     );
  //   };

  visitFunctionDeclaration = (ctx: FunctionDeclarationContext) => {
    const id = ctx.Identifier();
    const nm = id.getText();

    this.functionNodes.set(nm, id);

    return this.withScope(ctx, MethodSymbol, [nm], () =>
      this.visitChildren(ctx)
    );
  };

  protected withScope<T>(
    tree: ParseTree,
    type: new (...args: any[]) => ScopedSymbol,
    args: any[],
    action: () => T
  ): T {
    const scope = this.symbolTable.addNewSymbolOfType(
      type,
      this.scope,
      ...args
    );
    scope.context = tree;
    this.scope = scope;
    try {
      return action();
    } finally {
      this.scope = scope.parent as ScopedSymbol;
    }
  }
}

export class DefineSymbol extends BaseSymbol {
  constructor(name: string) {
    super(name);
  }
}

export class PreprocessorSymbol extends ScopedSymbol {
  constructor(name: string, public label: string) {
    super(name);
  }
}

/** if, switch, etc */
export class SelectionSymbol extends ScopedSymbol {
  constructor(name: string, public label: string) {
    super(name);
  }
}

export class IfSymbol extends ScopedSymbol {
  public if: SelectionSymbol;
  public elseIf: SelectionSymbol[];
  public else: SelectionSymbol;

  constructor(name: string) {
    super(name);
  }
}

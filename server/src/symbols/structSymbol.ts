import { ScopedSymbol } from "antlr4-c3";
import { IEvaluatableSymbol } from "./base";
import { CallStack, StackValue } from "../backend/CallStack";
import { ContextSymbolTable } from "../backend/ContextSymbolTable";
import { ParserRuleContext } from "antlr4ng";
import { DiagnosticSeverity } from "vscode-languageserver";
import { rangeFromTokens } from "../utils";

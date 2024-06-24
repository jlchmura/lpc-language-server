import { SymbolTable } from "antlr4-c3";
import { DriverVersion } from "./DriverVersion";
import { ContextSymbolTable } from "../backend/ContextSymbolTable";

export interface IDriver {
    efuns: ContextSymbolTable;

    checkFeatureCompatibility(
        feature: string,
        driverVersion: string
    ): FeatureValidationResult;
}

export type DriverVersionCompatibility = Record<string, DriverVersion>;

export enum FeatureValidationResult {
    Supported,
    VersionNotSufficient,
    NotSupported,
}

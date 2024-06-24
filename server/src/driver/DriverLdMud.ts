import { SymbolTable } from "antlr4-c3";
import { DriverVersion } from "./DriverVersion";
import {
    DriverVersionCompatibility,
    FeatureValidationResult,
    IDriver,
} from "./types";
import { ContextSymbolTable } from "../backend/ContextSymbolTable";
import { parseEfuns } from "./EfunParser";

export const LDMudFeatures = {
    NamedObjectTypes: "NamedObjectTypes",
    DotCallStrict: "DotCallStrict",
    SyntaxStructInitializer: "SyntaxStructInitializer",
} as const;

export class DriverLDMud implements IDriver {
    public efuns: ContextSymbolTable;

    Compatibility: DriverVersionCompatibility = {
        NamedObjectTypes: DriverVersion.from("3.6.5"),
        DotCallStrict: DriverVersion.from("3.6.2"),
        SyntaxStructInitializer: DriverVersion.from("0.0.0"),
    };

    constructor() {
        this.efuns = new ContextSymbolTable("efuns", {
            allowDuplicateSymbols: true,
        });
        parseEfuns("ldmud", this.efuns);
    }

    public checkFeatureCompatibility(
        feature: keyof typeof LDMudFeatures,
        driverVersion: string
    ): FeatureValidationResult {
        const requiredVersion = this.Compatibility[feature];
        if (!requiredVersion) {
            return FeatureValidationResult.NotSupported;
        }
        return DriverVersion.from(driverVersion).gte(requiredVersion)
            ? FeatureValidationResult.Supported
            : FeatureValidationResult.VersionNotSufficient;
    }
}

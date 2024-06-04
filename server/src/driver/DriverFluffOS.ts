import { DriverVersion } from "./DriverVersion";
import {
    DriverVersionCompatibility,
    FeatureValidationResult,
    IDriver,
} from "./types";

export const FluffOSFeatures = {
    NumericConstThousandSeparator: "NumericConstThousandSeparator",
    SyntaxClass: "SyntaxClass",
    SyntaxArgSpreadOperator: "SyntaxArgSpreadOperator",
    SyntaxNew: "SyntaxNew",
    SyntaxNewStruct: "SyntaxNewStruct",
    SyntaxCatchBlock: "SyntaxCatchBlock",
} as const;

export class DriverFluffOS implements IDriver {
    Compatibility: DriverVersionCompatibility = {
        NumericConstThousandSeparator: DriverVersion.from("0"),
        SyntaxClass: DriverVersion.from("0"),
        SyntaxArgSpreadOperator: DriverVersion.from("0"),
        SyntaxNew: DriverVersion.from("0"),
        SyntaxNewStruct: DriverVersion.from("0"),
        SyntaxCatchBlock: DriverVersion.from("0"),
    };

    public checkFeatureCompatibility(
        feature: keyof typeof FluffOSFeatures,
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

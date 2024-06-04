import { DriverVersion } from "./DriverVersion";
import {
    DriverVersionCompatibility,
    FeatureValidationResult,
    IDriver,
} from "./types";

export const LDMudFeatures = {
    NamedObjectTypes: "NamedObjectTypes",
    DotCallStrict: "DotCallStrict",
    SyntaxStructInitializer: "SyntaxStructInitializer",
} as const;

export class DriverLDMud implements IDriver {
    Compatibility: DriverVersionCompatibility = {
        NamedObjectTypes: DriverVersion.from("3.6.5"),
        DotCallStrict: DriverVersion.from("3.6.2"),
        SyntaxStructInitializer: DriverVersion.from("0.0.0"),
    };

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

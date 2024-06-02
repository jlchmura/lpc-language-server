import { DriverVersion } from "./DriverVersion";
import { IDriver } from "./types";

type DriverVersionCompatibility = Record<string, DriverVersion>;

export const LDMudFeatures = {
    NamedObjectTypes: "NamedObjectTypes",
    DotCallStrict: "DotCallStrict",
} as const;

export class DriverLDMud implements IDriver {
    Compatibility: DriverVersionCompatibility = {
        NamedObjectTypes: DriverVersion.from("3.6.5"),
        DotCallStrict: DriverVersion.from("3.6.2"),
    };

    public checkFeatureCompatibility(
        feature: keyof typeof LDMudFeatures,
        driverVersion: string
    ): boolean {
        const requiredVersion = this.Compatibility[feature];
        if (!requiredVersion) {
            throw new Error(`Unknown feature: ${feature}`);
        }
        return DriverVersion.from(driverVersion).gte(requiredVersion);
    }
}

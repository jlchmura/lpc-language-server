import { DriverVersion } from "./DriverVersion";

type DriverVersionCompatibility = Record<string, DriverVersion>;

export const LDMudFeatures = {
    NamedObjectTypes: "NamedObjectTypes",
} as const;

export class DriverLDMud {
    Compatibility: DriverVersionCompatibility = {
        NamedObjectTypes: DriverVersion.from("3.6.5"),
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

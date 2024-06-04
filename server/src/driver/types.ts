import { DriverVersion } from "./DriverVersion";

export interface IDriver {
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

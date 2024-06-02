export interface IDriver {
    checkFeatureCompatibility(feature: string, driverVersion: string): boolean;
}

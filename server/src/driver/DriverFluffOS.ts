import { DriverVersion } from "./DriverVersion";
import {
    DriverVersionCompatibility,
    FeatureValidationResult,
    IDriver,
} from "./types";

export const FluffOSFeatures = {
    NumericConstThousandSeparator: "NumericConstThousandSeparator",
    SyntaxBufferType: "SyntaxBufferType", // https://www.fluffos.info/lpc/types/buffer.html#buffer
    SyntaxFunctionType: "SyntaxFunctionType", // https://www.fluffos.info/lpc/types/general.html#function
    SyntaxClass: "SyntaxClass",
    SyntaxArgSpreadOperator: "SyntaxArgSpreadOperator",
    SyntaxFunctionPointer: "SyntaxFunctionPointer", // https://www.fluffos.info/lpc/types/function.html#available-kinds-of-function-pointers
    SyntaxNew: "SyntaxNew",
    SyntaxNewStruct: "SyntaxNewStruct",
    SyntaxCatchBlock: "SyntaxCatchBlock",
    SyntaxPrivateInherit: "SyntaxPrivateInherit",
} as const;

export class DriverFluffOS implements IDriver {
    Compatibility: DriverVersionCompatibility = {
        NumericConstThousandSeparator: DriverVersion.from("0"),
        SyntaxBufferType: DriverVersion.from("0"),
        SyntaxFunctionType: DriverVersion.from("0"),
        SyntaxFunctionPointer: DriverVersion.from("0"),
        SyntaxClass: DriverVersion.from("0"),
        SyntaxArgSpreadOperator: DriverVersion.from("0"),
        SyntaxNew: DriverVersion.from("0"),
        SyntaxNewStruct: DriverVersion.from("0"),
        SyntaxCatchBlock: DriverVersion.from("0"),
        SyntaxPrivateInherit: DriverVersion.from("0"),
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

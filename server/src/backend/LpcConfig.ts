import * as fs from "fs";
import { parse } from "jsonc-parser";
import { DiagnosticSeverity } from "vscode-languageserver";

enum DiagnosticLevel {
    Error = "error",
    Warning = "warning",
    Info = "info",
    Hint = "hint",
    None = "none",
}

type DiagnosticsInfo = {
    callOtherTargetUnknown: DiagnosticLevel;
    callOtherLfunNotFound: DiagnosticLevel;
    argumentTypeMismatch: DiagnosticLevel;
    argumentsMissing: DiagnosticLevel;
    argumentsTooMany: DiagnosticLevel;
    functionNotFound: DiagnosticLevel;
    variableNotFound: DiagnosticLevel;
    functionUnknown: DiagnosticLevel;
    functionModifiersMismatch: DiagnosticLevel;
    functionReturnMismatch: DiagnosticLevel;
    functionParameterMismatch: DiagnosticLevel;
    memberNotFound: DiagnosticLevel;
    fileNotResolved: DiagnosticLevel;
    structMemberAsFunction: DiagnosticLevel;
    objectNotFound: DiagnosticLevel;
};

const defaultDiagnostics: DiagnosticsInfo = {
    callOtherTargetUnknown: DiagnosticLevel.Info,
    callOtherLfunNotFound: DiagnosticLevel.Hint,
    argumentTypeMismatch: DiagnosticLevel.Warning,
    argumentsMissing: DiagnosticLevel.Warning,
    argumentsTooMany: DiagnosticLevel.Error,
    functionNotFound: DiagnosticLevel.Warning,
    variableNotFound: DiagnosticLevel.Error,
    functionUnknown: DiagnosticLevel.Hint,
    functionModifiersMismatch: DiagnosticLevel.Error,
    functionReturnMismatch: DiagnosticLevel.Error,
    functionParameterMismatch: DiagnosticLevel.Error,
    memberNotFound: DiagnosticLevel.Warning,
    fileNotResolved: DiagnosticLevel.Info,
    structMemberAsFunction: DiagnosticLevel.Error,
    objectNotFound: DiagnosticLevel.Warning,
};

type FilesInfo = {
    simul_efun: string;
    init_files: string[];
    master: string;
    global_include: string;
    player: string;
};

export enum DriverType {
    LDMud = "ldmud",
    FluffOS = "fluffos",
}

export type DriverInfo = {
    type: DriverType;
    version: string;
};

export interface ILpcConfig {
    defines: Map<string, string>;
    include: string[];
    exclude: string[];
    driver: DriverInfo;
    diagnostics: DiagnosticsInfo;
    files: FilesInfo;
}

export class LpcConfig implements ILpcConfig {
    public defines: Map<string, string> = new Map([
        ["__HOST_NAME__", '"localhost"'],
        ["__MASTER_OBJECT__", '"/obj/master"'],
        ["TLS_PORT", "5555"],
        ["__INT_MAX__", "2147483647"],
        ["__INT_MIN__", "-2147483648"],
        ["__HEART_BEAT_INTERVAL__", "2"],
        ["__BOOT_TIME__", "1"],
    ]);

    public include: string[] = ["/sys", "/obj", "/room"];
    public exclude: string[] = [];

    public driver: DriverInfo = {
        type: DriverType.LDMud,
        version: "3.6.7",
    };

    public diagnostics: DiagnosticsInfo = defaultDiagnostics;
    public allDiagnosticsOff: boolean = false;

    public files: FilesInfo = {
        simul_efun: "/obj/simul_efun.c",
        master: "/obj/master.c",
        init_files: ["/room/init_files"],
        global_include: "",
        player: "/obj/player.c",
    };
}

export function getDiagnosticLevelFromConfig(
    config: LpcConfig,
    code: string,
    defaultLevel: DiagnosticSeverity
): DiagnosticSeverity {
    if (!!code && config.allDiagnosticsOff) {
        return undefined;
    }

    const configLevel = config.diagnostics[code];
    switch (configLevel) {
        case DiagnosticLevel.Error:
            return DiagnosticSeverity.Error;
        case DiagnosticLevel.Warning:
            return DiagnosticSeverity.Warning;
        case DiagnosticLevel.Info:
            return DiagnosticSeverity.Information;
        case DiagnosticLevel.Hint:
            return DiagnosticSeverity.Hint;
        case DiagnosticLevel.None:
            return undefined;
    }

    return defaultLevel;
}

let globalConfig: LpcConfig | null = new LpcConfig();
export function ensureLpcConfig(): LpcConfig {
    if (!globalConfig) {
        throw "LPC config not loaded";
    } else {
        return globalConfig;
    }
}

export function setLpcConfig(config: LpcConfig): void {
    globalConfig = config;
}

export function loadLpcConfig(filename: string): LpcConfig {
    try {
        fs.accessSync(filename, fs.constants.R_OK);
        const config = new LpcConfig();
        const data = fs.readFileSync(filename, "utf8");

        const rawConfig = parse(data);

        rawConfig.defines?.forEach((defObj: any) => {
            const key = Object.keys(defObj)[0];
            let val = defObj[key];
            if (
                typeof val === "string" &&
                !(val.startsWith('"') && val.endsWith('"'))
            ) {
                val = `"${val}"`;
            }
            config.defines.set(key, val);
        });

        config.files = {
            ...config.files,
            ...rawConfig.files,
            init_files:
                (rawConfig.files?.init_files as string[]) ??
                config.files?.init_files,
        };

        config.exclude = (rawConfig.exclude as string[]) ?? config.exclude;
        config.include = (rawConfig.include as string[]) ?? config.include;
        config.driver = { ...config.driver, ...rawConfig.driver };
        config.diagnostics = {
            ...config.diagnostics,
            ...rawConfig.diagnostics,
        };
        if (rawConfig.diagnostics === "off" || !rawConfig.diagnostics) {
            config.allDiagnosticsOff = true;
        }

        globalConfig = config;
    } catch (e) {
        console.warn(
            `Failed to load LPC config file ${filename}: ${e.message}`
        );
    }

    return globalConfig;
}

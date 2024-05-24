import * as fs from "fs";
import { DiagnosticSeverity } from "vscode-languageserver";

enum DiagnosticLevel {
    Error = "error",
    Warning = "warning",
    Info = "info",
    Hint = "hint",
    None = "none",
}

enum DriverType {
    LDMud = "ldmud",
    FluffOS = "fluffos",
}

type DriverInfo = {
    type: DriverType;
    version: string;
};

type DiagnosticsInfo = {
    callOtherTargetUnknown: DiagnosticLevel;
    callOtherLfunNotFound: DiagnosticLevel;
};

type FilesInfo = {
    simul_efun: string;
};

export class LpcConfig {
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
        version: "3.3.720",
    };
    public diagnostics: DiagnosticsInfo = {
        callOtherTargetUnknown: DiagnosticLevel.Info,
        callOtherLfunNotFound: DiagnosticLevel.Error,
    };

    public files: FilesInfo = {
        simul_efun: "/obj/simul_efun.c",
    };
}

export function getDiagnosticLevelFromConfig(
    config: LpcConfig,
    code: string,
    defaultLevel: DiagnosticSeverity
): DiagnosticSeverity {
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

export function loadLpcConfig(filename: string): LpcConfig {
    try {
        fs.accessSync(filename, fs.constants.R_OK);
        const config = new LpcConfig();
        const data = fs.readFileSync(filename, "utf8");
        const rawConfig = JSON.parse(data);

        rawConfig.defines?.forEach((defObj: any) => {
            const key = Object.keys(defObj)[0];
            let val = defObj[key];
            if (typeof val === "string") {
                val = `"${val}"`;
            }
            config.defines.set(key, val);
        });

        config.files = {
            ...config.files,
            ...rawConfig.files,
        };

        config.exclude = (rawConfig.exclude as string[]) ?? config.exclude;
        config.include = (rawConfig.include as string[]) ?? config.include;
        config.driver = { ...config.driver, ...rawConfig.driver };
        config.diagnostics = {
            ...config.diagnostics,
            ...rawConfig.diagnostics,
        };

        globalConfig = config;
    } catch (e) {
        console.info(
            `Failed to load LPC config file ${filename}: ${e.message}`
        );
    }

    return globalConfig;
}

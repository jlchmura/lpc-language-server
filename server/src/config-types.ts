export enum DiagnosticLevel {
    Error = "error",
    Warning = "warning",
    Info = "info",
    Hint = "hint",
    None = "none",
}

export type DiagnosticsInfo = Record<string, DiagnosticLevel>;

export type FilesInfo = {
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

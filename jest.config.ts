import type { Config } from "jest";

const config: Config = {
    collectCoverage: true,
    collectCoverageFrom: [
        "server/src/**/*.ts",
        "!server/src/tests/**",
        "!**/node_modules/**",
    ],
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    coverageReporters: ["json", "text", "html"],
    coverageThreshold: {
        global: {
            statements: 54,
            branches: 49,
            functions: 43,
            lines: 54,
        },
    },
    moduleDirectories: ["node_modules"],
    workerIdleMemoryLimit: "500MB",
    moduleFileExtensions: ["ts", "js", "mjs", "cjs", "json"],
    extensionsToTreatAsEsm: [".ts"],
    moduleNameMapper: {
        "(.+)\\.js": "$1",
    },
    preset: "ts-jest/presets/js-with-ts-esm",

    resetMocks: false,

    // A list of paths to directories that Jest should use to search for files in
    roots: ["server/src/tests"],

    setupFilesAfterEnv: [],
    testEnvironment: "node",

    testEnvironmentOptions: {},

    testMatch: ["**/tests/**/*.spec.ts"],

    testPathIgnorePatterns: [],

    testTimeout: 30000,

    transform: {
        "\\.ts?$": ["ts-jest", { useESM: true }],
    },

    transformIgnorePatterns: ["node_modules/"],
};

export default config;

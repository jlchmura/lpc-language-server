/**
 * This config is .mjs rather than .ts because jest parses a .ts config through the
 * `typescript` package, and TypeScript 7's native compiler no longer exposes the JS API
 * that requires. For the same reason the transform is ts-jest wrapped so it compiles
 * with the JS-API TypeScript pinned by tools/ts-jest-compiler (see
 * scripts/ts-jest-ts6-transformer.cjs), leaving `typescript` itself on 7 for `tsc -b`.
 *
 * @type {import("jest").Config}
 */
const config = {
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
    moduleNameMapper: {
        "(.+)\\.js": "$1",
    },

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
        "^.+\\.[cm]?ts$": [
            "<rootDir>/scripts/ts-jest-ts6-transformer.cjs",
            {
                tsconfig: "server/tsconfig.json",
                useESM: false,
            },
        ],
    },

    transformIgnorePatterns: ["node_modules/"],
};

export default config;

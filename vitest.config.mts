import { defineConfig } from "vitest/config";
import esbuildMutableNamespaces from "./scripts/vitest-esbuild-namespaces.mjs";
import inlineEnums from "./scripts/vitest-inline-enums.mjs";

export default defineConfig({
    plugins: [
        esbuildMutableNamespaces({ tsconfig: "server/tsconfig.json" }),
        inlineEnums({
            srcDir: "server/src",
            exclude: (file) => file.includes("/tests/") || file.includes("\\tests\\"),
        }),
    ],
    test: {
        globals: true,
        environment: "node",
        root: ".",
        include: ["server/src/tests/**/*.spec.ts"],
        testTimeout: 30000,
        // Reuse workers and their loaded compiler across spec files instead of re-importing
        // it per file: ~12s instead of ~15.5s, and about 40% less CPU. Specs build their own
        // programs and language services; one that changes shared module state (e.g.
        // `Debug.isDebugging`) must restore it, as debugNamespaceBindings.spec.ts does.
        isolate: false,
        coverage: {
            enabled: false,
            provider: "v8",
            include: ["server/src/**/*.ts"],
            exclude: ["server/src/tests/**", "**/node_modules/**"],
            reportsDirectory: "coverage",
            reporter: ["json", "text", "html"],
            // Re-baselined for Vitest, which counts AST statements and every branch path
            // (Jest's v8 coverage counted lines as statements and only branches that ran), and
            // also counts files no test loads. Same suite on Jest: 61/73/58/61%.
            thresholds: {
                statements: 49,
                branches: 41,
                functions: 50,
                lines: 49,
            },
        },
    },
});

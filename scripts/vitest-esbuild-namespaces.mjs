/**
 * Vite plugin: compile TypeScript files whose namespaces have mutable exports with esbuild
 * instead of Oxc (Vite 8's TypeScript transform).
 *
 * Oxc only partly supports namespaces. `namespace Debug { export let isDebugging = false }`
 * becomes a local `let` that is copied onto the namespace object once, so code inside the
 * namespace never sees a later `Debug.isDebugging = true` from another module (and an
 * export with no initializer is never attached at all). esbuild, which builds the shipped
 * extension, keeps these as live properties of the namespace object, so the files that use
 * the pattern are handed to esbuild first and Oxc only sees the plain JavaScript it emits.
 * See server/src/tests/debugNamespaceBindings.spec.ts.
 */
import { transform } from "esbuild";
import fs from "node:fs";

const NAMESPACE = /^\s*(?:export\s+)?(?:declare\s+)?namespace\s/m;
const MUTABLE_EXPORT = /^\s+export\s+(?:let|var)\s/m;

/** @param {{ tsconfig: string }} options -- read so class-field semantics match the real build */
export default function esbuildMutableNamespaces({ tsconfig }) {
    const tsconfigRaw = fs.readFileSync(tsconfig, "utf8");
    return {
        name: "lpc:esbuild-mutable-namespaces",
        enforce: "pre",
        async transform(code, id) {
            const file = id.split("?")[0];
            if (!/\.[cm]?ts$/.test(file) || file.includes("/node_modules/")) return;
            if (!NAMESPACE.test(code) || !MUTABLE_EXPORT.test(code)) return;
            const result = await transform(code, {
                loader: "ts",
                format: "esm",
                sourcemap: "external",
                sourcefile: file,
                tsconfigRaw,
            });
            return { code: result.code, map: result.map };
        },
    };
}

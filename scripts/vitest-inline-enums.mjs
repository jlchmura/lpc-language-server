/**
 * Vite plugin: inline cross-module enum member accesses (`SyntaxKind.Identifier` -> `80`)
 * in the code Vitest runs.
 *
 * Vitest compiles each file on its own (esbuild), so a `const enum` imported from another
 * module is emitted as a runtime object and every `SyntaxKind.X` in the checker's hot loops
 * becomes a property read through the module-namespace getters. Inlining them is what the
 * old type-aware ts-jest setup bought; without it the suite runs about 4x slower.
 *
 * Values are not computed here. At startup every file that exports an enum is bundled with
 * esbuild and run, and the values are read off the real enum objects, so computed members
 * (`A | B`, `FirstToken = Unknown`, references across files) come out exactly as they do at
 * runtime. The rewrite then runs after Vite has turned each module into JavaScript and only
 * touches `X.Member` where `X` is a named import of an exported enum whose name is unique
 * across server/src and is not re-declared anywhere in that module. Anything else (duplicate
 * names, enums used inside their own file, namespace accesses like `lpc.SyntaxKind.X` in
 * specs) is left alone and still works through the runtime object -- just not inlined.
 *
 * Caching: a rewritten module depends on enum values declared in other files, which Vitest's
 * on-disk module cache (`fsModuleCache`, on by default) does not know about -- its key covers
 * only the module's own source. So a hash of every inlined value is added to each module's
 * cache key; editing an enum changes the hash and nothing stale is reused. In watch mode an
 * enum edit also drops every loaded module so the rerun re-transforms them.
 */
import { build } from "esbuild";
import MagicString from "magic-string";
import { createHash } from "node:crypto";
import fs from "node:fs";
import Module from "node:module";
import path from "node:path";

const ENUM_DECL = /^export\s+(?:declare\s+)?(?:const\s+)?enum\s+([A-Za-z_$][\w$]*)/gm;

/** Vite module ids always use forward slashes, including on Windows. */
const posix = (p) => p.replace(/\\/g, "/");

/** @param {{ srcDir: string, exclude?: (file: string) => boolean }} options */
export default function inlineEnums({ srcDir, exclude = () => false }) {
    srcDir = path.resolve(srcDir);
    const srcPrefix = posix(srcDir) + "/";
    /** @type {Map<string, Map<string, string | number>>} enum name -> member -> value */
    let enums = new Map();
    /** @type {Set<string>} files that declare an exported enum */
    let enumFiles = new Set();
    /** Hash of every inlined value; part of each module's cache key. */
    let enumHash = "";
    let vitest;

    function scan() {
        const declared = new Map(); // name -> files
        for (const rel of fs.readdirSync(srcDir, { recursive: true })) {
            const file = path.join(srcDir, rel);
            if (!file.endsWith(".ts") || file.endsWith(".d.ts") || exclude(file)) continue;
            const text = fs.readFileSync(file, "utf8");
            for (const m of text.matchAll(ENUM_DECL)) {
                if (!declared.has(m[1])) declared.set(m[1], new Set());
                declared.get(m[1]).add(file);
            }
        }
        enumFiles = new Set([...declared.values()].flatMap((s) => [...s]));
        return declared;
    }

    async function load() {
        const declared = scan();
        const files = [...enumFiles];
        const entry = files.map((f, i) => `export * as m${i} from ${JSON.stringify(f)};`).join("\n");
        const result = await build({
            stdin: { contents: entry, resolveDir: srcDir, loader: "ts" },
            bundle: true,
            platform: "node",
            format: "cjs",
            packages: "external",
            write: false,
            logLevel: "silent",
        });
        const filename = path.join(srcDir, "__inline_enums_probe__.cjs");
        const mod = new Module(filename);
        mod.filename = filename;
        mod.paths = Module._nodeModulePaths(srcDir);
        mod._compile(result.outputFiles[0].text, filename);

        const next = new Map();
        for (const [name, declFiles] of declared) {
            if (declFiles.size !== 1) continue; // ambiguous by bare name
            const file = [...declFiles][0];
            const obj = mod.exports[`m${files.indexOf(file)}`][name];
            if (!obj || typeof obj !== "object") continue;
            const members = new Map();
            for (const [key, value] of Object.entries(obj)) {
                if (String(Number(key)) === key) continue; // reverse mapping of a numeric member
                if (typeof value === "number" || typeof value === "string") members.set(key, value);
            }
            next.set(name, members);
        }
        const nextHash = createHash("sha1").update(JSON.stringify([...next].map(([k, v]) => [k, [...v]]))).digest("hex");
        const changed = nextHash !== enumHash;
        enums = next;
        enumHash = nextHash;
        return changed;
    }

    return {
        name: "lpc:inline-enums",
        enforce: "post",
        api: { getEnums: () => enums },

        async buildStart() {
            if (enums.size === 0) await load();
        },

        async configureVitest(ctx) {
            if (enums.size === 0) await load();
            vitest = ctx.vitest;
            ctx.defineCacheKeyGenerator(() => enumHash);
        },

        // In watch mode an edited enum can shift every later member's value, and modules
        // that were already rewritten would keep the old numbers. Recompute and drop every
        // loaded module when that happens.
        async watchChange(id) {
            const file = path.resolve(id);
            if (!posix(file).startsWith(srcPrefix) || !file.endsWith(".ts")) return;
            const wasEnumFile = enumFiles.has(file);
            const isEnumFile = fs.existsSync(file) && ENUM_DECL.test(fs.readFileSync(file, "utf8"));
            ENUM_DECL.lastIndex = 0;
            if (!wasEnumFile && !isEnumFile) return;
            if ((await load()) && vitest) {
                const files = new Set();
                for (const project of vitest.projects) {
                    for (const env of Object.values(project.vite.environments)) {
                        for (const f of env.moduleGraph.fileToModulesMap.keys()) files.add(f);
                    }
                }
                for (const f of files) vitest.invalidateFile(f);
            }
        },

        transform(code, id) {
            const file = posix(id.split("?")[0]);
            if (!file.startsWith(srcPrefix) || !/\.[cm]?ts$/.test(file) || file.includes("/node_modules/")) return;
            if (!code.includes("import")) return;

            const ast = this.parse(code);

            /** local binding -> enum name */
            const imported = new Map();
            for (const node of ast.body) {
                if (node.type !== "ImportDeclaration" || node.importKind === "type") continue;
                for (const spec of node.specifiers) {
                    if (spec.type !== "ImportSpecifier") continue;
                    const name = spec.imported.type === "Identifier" ? spec.imported.name : spec.imported.value;
                    if (enums.has(name)) imported.set(spec.local.name, name);
                }
            }
            if (imported.size === 0) return;

            // Conservative shadowing check: drop a name if anything else in the module binds it.
            walk(ast, null, (node) => {
                for (const id of bindingIdentifiers(node)) imported.delete(id);
            });
            if (imported.size === 0) return;

            const s = new MagicString(code);
            let count = 0;
            walk(ast, null, (node, parent) => {
                if (node.type !== "MemberExpression" || node.object.type !== "Identifier") return;
                const enumName = imported.get(node.object.name);
                if (!enumName) return;
                const member = !node.computed && node.property.type === "Identifier" ? node.property.name : node.computed && node.property.type === "Literal" && typeof node.property.value === "string" ? node.property.value : undefined;
                if (member === undefined) return;
                const value = enums.get(enumName).get(member);
                if (value === undefined) return;
                if (parent && ((parent.type === "AssignmentExpression" && parent.left === node) || parent.type === "UpdateExpression" || (parent.type === "UnaryExpression" && parent.operator === "delete"))) return;
                s.overwrite(node.start, node.end, `(${JSON.stringify(value)})`);
                count++;
            });
            if (count === 0) return;
            return { code: s.toString(), map: s.generateMap({ hires: "boundary", source: file, includeContent: true }) };
        },
    };
}

function walk(node, parent, visit) {
    visit(node, parent);
    for (const key in node) {
        if (key === "type" || key === "start" || key === "end") continue;
        const child = node[key];
        if (Array.isArray(child)) {
            for (const c of child) if (c && typeof c.type === "string") walk(c, node, visit);
        } else if (child && typeof child.type === "string") {
            walk(child, node, visit);
        }
    }
}

/** Names a node introduces into some scope (other than through an import). */
function bindingIdentifiers(node) {
    const out = [];
    const pattern = (p) => {
        if (!p) return;
        switch (p.type) {
            case "Identifier": out.push(p.name); break;
            case "ObjectPattern": for (const prop of p.properties) pattern(prop.type === "RestElement" ? prop.argument : prop.value); break;
            case "ArrayPattern": for (const el of p.elements) pattern(el); break;
            case "RestElement": pattern(p.argument); break;
            case "AssignmentPattern": pattern(p.left); break;
        }
    };
    switch (node.type) {
        case "VariableDeclarator": pattern(node.id); break;
        case "FunctionDeclaration":
        case "FunctionExpression":
        case "ArrowFunctionExpression":
            if (node.id) out.push(node.id.name);
            for (const p of node.params) pattern(p);
            break;
        case "ClassDeclaration":
        case "ClassExpression":
            if (node.id) out.push(node.id.name);
            break;
        case "CatchClause": pattern(node.param); break;
    }
    return out;
}

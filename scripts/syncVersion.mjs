// Syncs `versionMajorMinor` / `version` in server/src/compiler/corePublic.ts
// with the `version` field in the root package.json, so the two never drift.
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const pkgPath = path.join(rootDir, "package.json");
const corePublicPath = path.join(rootDir, "server/src/compiler/corePublic.ts");

const { version } = JSON.parse(readFileSync(pkgPath, "utf8"));
const [major, minor] = version.split(".");
const versionMajorMinor = `${major}.${minor}`;

let content = readFileSync(corePublicPath, "utf8");

content = content.replace(
    /export const versionMajorMinor = "[^"]*";/,
    `export const versionMajorMinor = "${versionMajorMinor}";`
);
content = content.replace(
    /export const version = "[^"]*" as string;/,
    `export const version = "${version}" as string;`
);

writeFileSync(corePublicPath, content);
console.log(`corePublic.ts synced to version ${version}`);

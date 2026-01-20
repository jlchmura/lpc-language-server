# Repository Guidelines

This is an LPC language server, compiler, and type checker, implemented in TypeScript.
It is modelled after the official TypeScript compiler/language server, and has been
adapted for LPC syntax.

## Project Structure & Module Organization

- `client/`: VS Code extension (language client). Source in `client/src`; built output in `client/out`.
- `server/`: LPC language server. Source in `server/src`; built output in `server/out`.
- `syntaxes/`: TextMate grammars used for editor syntax highlighting.
- `schemas/`: JSON schemas for `lpc-config.json`.
- `efuns/`: Driver-specific metadata (LDMud/FluffOS) copied into the server build.
- `lib/`: Generated library artifacts/typings (generally treated as build output; keep changes minimal).
- `out/`: Root build outputs and bundled artifacts used by the extension.
- `tools/`: Local helper scripts (for example, `tools/rebuild-and-install.js`).

## Build, Test, and Development Commands

- `npm ci`: Clean install (CI uses this). Root `postinstall` also installs dependencies in `client/` and `server/`.
- `npm run compile`: Builds TypeScript, bundles artifacts, and copies `efuns/` into the server output.
- `npm run watch`: Incremental rebuild while developing.
- `npm test`: Runs Jest unit tests (configured in `jest.config.ts`).
- VS Code: use `.vscode/launch.json` → “Launch Client” (F5) to run the extension in an Extension Host.

## Coding Style & Naming Conventions

- TypeScript (ESM). Keep imports consistent with existing patterns (many files use `.js` in relative import specifiers).
- Formatting uses the Prettier config embedded in `package.json` (notably `tabWidth: 4`, semicolons, double quotes).
- Follow local naming conventions: `camelCase.ts` is common; tests use `*.spec.ts` under `server/src/tests`.

## Testing Guidelines

- Jest + `ts-jest` (ESM preset). Tests live in `server/src/tests` (example: `server/src/tests/compiler.spec.ts`).
- When adding features or bug fixes, add/extend tests and keep coverage thresholds from `jest.config.ts` met.

## Commit & Pull Request Guidelines

- Commits are typically short and imperative; many use conventional prefixes like `feat:`, `fix(parser):`, `perf:` and may include PR refs like `(#301)`.
- PRs should explain the change, link related issues, and note any user-visible behavior changes.
- Don’t commit generated outputs (`out/`, `coverage/`, most of `lib/`, `*.vsix`) unless the change explicitly requires it.

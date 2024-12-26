import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['client/src/extension.ts','server/src/server.ts', 'server/src/bin/lpc.ts'],
  bundle: true,
  outdir: 'out',
  external: ['vscode'],
  platform: 'node',
  format: 'cjs',
  sourcemap: 'both',
  mainFields: ['module', 'main'],  //  needed for jsonc-parse until they fix https://github.com/microsoft/node-jsonc-parser/issues/57
});
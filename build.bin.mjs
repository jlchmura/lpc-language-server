import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['server/src/bin.ts'],
  bundle: true,
  outdir: 'out/server/src',
  external: ['vscode'],
  platform: 'node',
  format: 'cjs',
  sourcemap: 'both',
  mainFields: ['module', 'main'],  
})
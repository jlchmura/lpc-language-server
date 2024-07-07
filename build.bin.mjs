import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['server/src/bin.ts'],
  bundle: true,
  banner: { js: "// Copyright 2024 John L Chmura\n" },
  outdir: 'out/server/src',
  target: ["es2020", "node14.17"],
  external: ['vscode'],
  platform: 'node',
  format: 'cjs',
  sourcemap: 'both',
  mainFields: ['module', 'main'], 
  logLevel: 'warning',  
})
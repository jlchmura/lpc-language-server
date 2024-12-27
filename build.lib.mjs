import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['server/src/lpc/_namespaces/lpc.ts'],  
  bundle: true,  
  banner: { js: "// Copyright 2024 John L Chmura\n" },
  outdir: 'out/lib',
  target: ["es2020"],
  // external: ['vscode'],
  platform: 'node',
  format: 'cjs',
  sourcemap: 'both',
  mainFields: ['module','main'], 
  logLevel: 'warning',    
})
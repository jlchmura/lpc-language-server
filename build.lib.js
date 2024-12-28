const ts = require("typescript");
const esbuild = require("esbuild");
const path = require("path");
const { dependencies, peerDependencies } = require('./package.json');
const { serverDeps = dependencies, serverPeers = peerDependencies } = require('./server/package.json');

const external = Object.keys(dependencies)
  .concat(Object.keys(peerDependencies || []))
  .concat(Object.keys(serverDeps || []))
  .concat(Object.keys(serverPeers || []));

// LIB - CJS
esbuild.build({
  entryPoints: ['server/src/lpc/lpc.ts'],  
  bundle: true, 
  banner: { js: "// Copyright 2024 John L Chmura\n" },
  outfile: 'out/lib/lpc.js',  
  target: ["es2020"],
  external: Object.keys(dependencies).concat(Object.keys(peerDependencies || [])),
  packages: "external",
  sourcesContent: false,
  platform: 'node',
  format: 'cjs',
  sourcemap: 'linked',
  mainFields: ['module','main'], 
  logLevel: 'warning',    
})

// CLI
esbuild.build({
  entryPoints: ['server/src/cli/lpc.ts'],  
  bundle: true, 
  banner: { js: "// Copyright 2024 John L Chmura\n" },
  outfile: 'out/lib/cli.js',
  // outdir: 'out/lib',
  target: ["es2020"],
  external: Object.keys(dependencies).concat(Object.keys(peerDependencies || [])),
  platform: 'node',
  format: 'cjs',
  sourcemap: 'linked',
  mainFields: ['module','main'], 
  logLevel: 'warning',  
  treeShaking: true,
  minify: true  
})

// SERVER
esbuild.build({
  entryPoints: ['server/src/server.ts'],  
  bundle: true, 
  banner: { js: "// Copyright 2024 John L Chmura\n" },
  outfile: 'out/lib/server.js',
  target: ["es2020"],
  external: Object.keys(dependencies).concat(Object.keys(peerDependencies || [])),
  platform: 'node',
  format: 'cjs',
  sourcemap: 'linked',
  mainFields: ['module','main'], 
  logLevel: 'warning',
  treeShaking: true,
  minify: true
})

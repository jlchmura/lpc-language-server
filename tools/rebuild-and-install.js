#!/usr/bin/env node

// Cross-platform rebuild & reinstall script for the LPC language server extension.

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const profileName = process.argv[2];

if (!profileName) {
  console.error('Usage: node rebuild-and-install.js <vscode-profile-name>');
  process.exit(1);
}

const repoRoot = path.resolve(__dirname);
const pkgPath = path.join(repoRoot, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const extensionId = `${pkg.publisher}.${pkg.name}`;
const vsixPath = path.join(repoRoot, '..', `${pkg.name}-${pkg.version}.vsix`);
const useShell = process.platform === 'win32';

function run(command, args, opts = {}) {
  const prettyArgs = args.join(' ');
  console.log(`\n$ ${command} ${prettyArgs}`);

  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: useShell,
    ...opts,
  });

  if (result.error) {
    console.error(`Failed to start ${command}: ${result.error.message}`);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log('=========================================');
console.log('LPC Language Server - Rebuild & Install');
console.log('=========================================\n');

console.log(`Repository: ${repoRoot}`);

// Build the extension
console.log('\nBuilding extension...');
run('npm', ['run', 'compile'], { cwd: repoRoot });
console.log('✓ Build complete');

// Package the extension
console.log('\nPackaging extension...');
run('npm', ['run', 'vsce:package'], { cwd: repoRoot });

if (!fs.existsSync(vsixPath)) {
  console.error(`VSIX not found at ${vsixPath}. Did packaging succeed?`);
  process.exit(1);
}

console.log(`✓ Package complete (${path.basename(vsixPath)})`);

// Uninstall the old version (if present)
console.log('\nUninstalling old version (if present)...');
const uninstall = spawnSync('code', ['--uninstall-extension', extensionId, '--profile', profileName], {
  stdio: 'inherit',
  shell: useShell,
});

if (uninstall.error) {
  console.error(`Failed to start VS Code CLI: ${uninstall.error.message}`);
  process.exit(1);
}

if (uninstall.status === 0) {
  console.log('✓ Old version uninstalled');
} else {
  console.log('⚠ No existing version found or uninstall failed; continuing with install');
}

// Install the new version
console.log('\nInstalling new version...');
run('code', ['--install-extension', vsixPath, '--force', '--profile', profileName], { cwd: repoRoot });
console.log('✓ New version installed');

console.log('\n=========================================');
console.log('✓ All done!');
console.log('=========================================\n');
console.log('Next steps:');
console.log("1. Reload your VS Code window (Ctrl+Shift+P -> 'Developer: Reload Window')");
console.log("2. Open the Output panel and select 'LPC Language Server'");
console.log('3. Hover over a macro in a mapping value to see debug logs');

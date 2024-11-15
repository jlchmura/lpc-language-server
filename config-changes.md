# LPC Config v2 Breaking Changes

The rewrite of the language server for version 2 necessitated some breaking config file changes.
This document outlines how to migrate your `lpc-config.json` file.

### The following config options were renamed:

- `include` is now `libInclude` 
- `files` is now `libFiles` 
- `diagnostics` should now be set to either `"on"` or `"off"`
- `mudlibDir` was removed, see below.

### Adding files to your project (or, what happened to mudlibDir?)

The ability to place your config file outside the lib root directory was added to v1, but is not yet available in v2. (Coming soon!)

For now, **You must place your config file in the root of your lib**.

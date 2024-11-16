# LPC Config v2 Breaking Changes

The rewrite of the language server for version 2 necessitated some breaking config file changes.
This document outlines how to migrate your `lpc-config.json` file.

### The following config options were renamed:

- `include` is now `libInclude` 
- `files` is now `libFiles` 
- `diagnostics` should now be set to either `"on"` or `"off"`
- `mudlibDir` was removed, see below.

### Adding files to your project (or, what happened to mudlibDir?)

To place your lpc-config file in a folder other than your lib's root directory, you need to tell it how to locate lib files.
The `include` setting tells the compiler where those files are located and can be either a relative path (from the location of your config file) or a 
disk rooted path. The first entry in this array will be used as your "lib root" folder.

Example:

For example, let's say your project is structured thus:

```
MyProj
|- settings
|  |- lpc-config.json
|- lib
|  |- std
|  |  |- simul_efun.c
|  |- rooms
|  |  |- entrance.c
|  |- admin
```

In this case, your config file should read:
```json
{
    "include": ["../lib"],
    ...
}
```
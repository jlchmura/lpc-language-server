# LPC Language Services Changelog

## 1.1.11

-   Fix: [Hover text garbled when type annotation uses a macro #110](https://github.com/jlchmura/lpc-language-server/issues/110)
-   Fix: [Function not recognized as callback #109](https://github.com/jlchmura/lpc-language-server/issues/109)
-   Enhancement: [Include file handler should read from ScriptSnapshot instead of disk #60](https://github.com/jlchmura/lpc-language-server/issues/60)
-   Moved #include resolution error to checker instead of parser
-   Added #include files to program dependency graph
-   LPCDoc @var tags now provide additional validation (must have a name, must be an inherited var)
-   Improved AST structure for include directives
-   Improved diagnostic reporting for errors inside include directive nodes

## 1.1.10

-   Fix: [Prefix unary expr is parsed incorrectly causing lpc2367 to be reported #104](https://github.com/jlchmura/lpc-language-server/issues/104)
-   Fix: [@var comment tag not working when placed before an inherit #105](https://github.com/jlchmura/lpc-language-server/issues/105)
-   Fix some errors introduced by #102

## 1.1.9

-   Fix: [efun:: prefix reports 9023 and should not #99](https://github.com/jlchmura/lpc-language-server/issues/99)
-   New: [Feature request: Annotate the type of variables declared in an inherited object](https://github.com/jlchmura/lpc-language-server/issues/102)

For the full history, see [CHANGELOG-FULL.md](./CHANGELOG-FULL.md)

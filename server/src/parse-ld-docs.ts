import * as fs from "fs";
import * as path from "path";

import { glob } from "glob";
const MarkdownIt = require("markdown-it");

// Initialize markdown parser
const md = new MarkdownIt();

type efunDef = {
    name: string;
    title: string;
    description: string;
    since: string;
    example: string;
    declarations: string[];
};
const efunsByFile = new Map<string, efunDef[]>();

// Walk through the directories
const dir = process.cwd();
const rootDir = path.resolve(dir, "../");
const files = glob.globSync("ldmud/doc/efun/*", {
    cwd: rootDir,
});

const filesObs = glob.globSync("ldmud/doc/obsolete/*", {});
files.push(...filesObs.filter((f) => !f.endsWith(".de")));

let lines: string[];
let blockLines: string[];

files.forEach((filepath) => {
    const parts = filepath.split("/");
    const filename = parts[parts.length - 2];

    // Read each markdown file
    const content = fs.readFileSync(path.join(rootDir, filepath), {
        encoding: "utf8",
    });
    // Parse the markdown content

    lines = content.split("\n");

    let name = parts[parts.length - 1];
    let decl: string[] = [];
    let title = "";
    let description = "";
    let since = "";
    let example = "";

    readToNextHeader();
    while (lines.length > 0) {
        const l = lines.shift();
        readToNextHeader();

        switch (l.trim()) {
            case "SYNOPSIS":
                decl.push(...blockLines);
                break;
            case "DESCRIPTION":
                description += blockLines.join("\n");
                break;
            case "EXAMPLES":
                example = blockLines.join("\n");
                break;
            case "HISTORY":
                since = blockLines.join("\n");
                break;
        }
        readToNextHeader();
    }

    if (name.trim().length > 0) {
        const efunArr = efunsByFile.get(filename) || [];
        efunArr.push({
            name,
            title,
            description,
            since,
            example,
            declarations: decl,
        });
        efunsByFile.set(filename, efunArr);
    }
});

// loop through the efunsByFile map and create an .f file for each one
efunsByFile.forEach((efuns, filename) => {
    const outFilename = path.join(
        process.cwd(),
        "./efuns/ldmud/",
        `${filename}.h`
    );
    const outfile = fs.createWriteStream(outFilename, {
        encoding: "utf8",
    });
    outfile.write(`// ${filename}.h\n\n`);
    efuns.forEach((efun) => {
        // write the efuns jsdoc comment
        outfile.write(`/**\n`);
        outfile.write(` * ${efun.name.trim()}\n`);
        //outfile.write(` * ${efun.title.trim()}\n`);
        outfile.write(` *\n`);

        let desc = efun.description.trim();
        // escpape closing comment chars (*/)
        desc = desc.replace(/\*\//g, "*\\/");
        const descLines = desc.split("\n");
        descLines.forEach((line) => {
            outfile.write(` * ${line.trim()}\n`);
        });

        if (efun.example.trim().length > 0) {
            let example = efun.example.trim();
            // escpape closing comment chars (*/)
            example = example.replace(/\*\//g, "*\\/");
            const exampleLines = example.split("\n");
            outfile.write(` *\n`);
            outfile.write(` * @example \n`);
            exampleLines.forEach((line) => {
                outfile.write(` * ${line.trim()}\n`);
            });
        }
        outfile.write(` *\n`);

        let syn = efun.since.trim();
        if (syn.length > 0) {
            outfile.write(" * @since " + syn + "\n");
        }

        outfile.write(` *\n`);
        outfile.write(" */\n");

        efun.declarations.forEach((d) => {
            d = d.trim();
            if (d.length == 0 || d.startsWith("#include")) return;

            if (d.match(/,\s*\.\.\.\s*\)/)) {
                // move all spread ops to the end of the argument list using regex replace
                d = d.replace(/,\s*\.\.\.\s*\)/g, "... )");
            }
            outfile.write(`${d.trim()};\n\n`);
        });
    });
    outfile.close();
});

console.log("LPC header file has been generated.");

function readToNextHeader() {
    let s = "";
    blockLines = [];
    while (lines.length > 0) {
        const l = lines[0];
        if (l.length > 0 && l.at(0) != " ") {
            return blockLines;
        }

        blockLines.push(l);
        lines.shift();
    }

    return blockLines;
}

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
    synopsis: string;
    example: string;
};
const efunsByFile = new Map<string, efunDef[]>();

// Walk through the directories
const dir = process.cwd();
const rootDir = path.resolve(dir, "../");
const files = glob.globSync("fluffos/docs/efun/**/*.md", {
    cwd: rootDir,
});
files.forEach((filepath) => {
    // the filepath will be something like "~/code/fluffos/docs/efun/contrib/abs.md"
    // we want to extract the "contrib" part, which will be used as the .h filename
    const parts = filepath.split("/");
    const filename = parts[parts.length - 2];

    // Read each markdown file
    const content = fs.readFileSync(path.join(rootDir, filepath), {
        encoding: "utf8",
    });
    // Parse the markdown content

    const tokens = md.parse(content, {});

    let name = "";
    let title = "";
    let description = "";
    let synopsis = "";
    let example = "";

    for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        const { type, tag } = t;

        if (type === "heading_open" && tag === "h1") {
            name = tokens[i + 1].content;
        } else if (type === "heading_open" && tag === "h3") {
            switch (tokens[i + 1].content) {
                case "NAME":
                    title = tokens[i + 3].content;
                    break;
                case "SYNOPSIS":
                    synopsis = tokens[i + 3].content;
                    break;
                case "DESCRIPTION":
                    description = tokens[i + 3].content;
                    break;
                case "EXAMPLE":
                    example = tokens[i + 3].content;
                    break;
            }
        }
    }

    if (name.trim().length > 0) {
        const efunArr = efunsByFile.get(filename) || [];
        efunArr.push({ name, title, description, synopsis, example });
        efunsByFile.set(filename, efunArr);
    }
});

// loop through the efunsByFile map and create an .f file for each one
efunsByFile.forEach((efuns, filename) => {
    const outFilename = path.join(
        process.cwd(),
        "./efuns/fluffos/",
        `${filename}.h`
    );
    const outfile = fs.createWriteStream(outFilename, {
        encoding: "utf8",
    });
    outfile.write(`// ${filename}.h\n\n`);
    efuns.forEach((efun) => {
        // write the efuns jsdoc comment
        outfile.write(`/**\n`);
        //outfile.write(` * ${efun.name.trim()}\n`);
        outfile.write(` * ${efun.title.trim()}\n`);
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
            exampleLines.forEach((line) => {
                outfile.write(` * ${line.trim()}\n`);
            });
        }
        outfile.write(` *\n`);
        outfile.write(" */\n");

        let syn = efun.synopsis.trim();

        if (syn.match(/,\s*\.\.\.\s*\)/)) {
            // move all spread ops to the end of the argument list using regex replace
            syn = syn.replace(/,\s*\.\.\.\s*\)/g, "... )");
        }
        outfile.write(`${syn}\n\n`);
    });
    outfile.close();
});

console.log("LPC header file has been generated.");

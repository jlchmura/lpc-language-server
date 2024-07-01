import * as fs from "fs";
import * as path from "path";
import { IFileHandler } from "../backend/types";

/* @internal */
export class EfunFileHandler implements IFileHandler {
    constructor() {}

    public loadInclude(
        refFilename: string,
        filename: string
    ): { uri: string; source: string } {
        filename = path.join(refFilename, "../", filename);
        if (fs.existsSync(filename)) {
            const source = fs.readFileSync(filename, "utf-8");
            return { uri: filename, source };
        } else {
            return { uri: filename, source: "" };
        }
    }
}

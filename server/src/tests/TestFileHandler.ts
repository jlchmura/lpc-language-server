import * as fs from "fs";
import * as path from "path";
import { IFileHandler, LoadImportResult } from "../lpc/lpc.js";

export class TestFileHandler implements IFileHandler {
    public includes: string[] = [];

    loadInclude(sourceFilename: string, filename: string): LoadImportResult {
        const f = path.join(
            process.cwd(),
            "server/src/tests/test-assets/",
            filename
        );
        this.includes.push(f);
        return {
            uri: f,
            source: fs.readFileSync(f, "utf8").toString(),
        };
    }
}

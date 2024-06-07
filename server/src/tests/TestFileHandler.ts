import * as fs from "fs";
import * as path from "path";
import { IFileHandler, LoadImportResult } from "../backend/types";

export class TestFileHandler implements IFileHandler {
    loadImport(sourceFilename: string, filename: string): LoadImportResult {
        const f = path.join(
            process.cwd(),
            "server/src/tests/test-assets/",
            filename
        );
        return {
            uri: f,
            source: fs.readFileSync(f, "utf8").toString(),
        };
    }
}

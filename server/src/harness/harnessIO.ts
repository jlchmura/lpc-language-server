import * as lpc from "../lpc/_namespaces/lpc.js";
import * as fs from "fs";
import * as pathModule from "path";

export function listFiles(path: string, spec: RegExp | undefined, options: { recursive?: boolean; } = {}) {    
    function filesInFolder(folder: string): string[] {
        const { files, directories } = lpc.sys.getAccessibleFileSystemEntries!(folder);
        let paths: string[] = [];
        for (const file of files) {            
            const pathToFile = pathModule.join(folder, file);
            if (!spec || file.match(spec)) {
                paths.push(pathToFile);
            }
        }
        if (options.recursive) {
            for (const dir of directories) {
                const pathToDir = pathModule.join(folder, dir);
                paths = paths.concat(filesInFolder(pathToDir));
            }
        }
        return paths;
    }

    return filesInFolder(path);
}
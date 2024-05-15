import * as path from "path";
import * as fs from "fs";

export class LpcConfig {
    public defines: Map<string, string> = new Map([
        ["__HOST_NAME__", "localhost"],
        ["__MASTER_OBJECT__", "/obj/master"],
    ]);
}

export function loadLpcConfig(filename: string): LpcConfig {
    try {
        fs.accessSync(filename, fs.constants.R_OK);
        const config = new LpcConfig();
        const data = fs.readFileSync(filename, "utf8");
        const rawConfig = JSON.parse(data);

        rawConfig.defines.forEach((defObj: any) => {
            const key = Object.keys(defObj)[0];
            config.defines.set(key, defObj[key]);
        });

        return config;
    } catch (e) {
        console.warn(
            `Failed to load LPC config file ${filename}: ${e.message}`
        );
        return new LpcConfig();
    }
}

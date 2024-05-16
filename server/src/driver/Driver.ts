import { DriverLDMud } from "./DriverLdMud";
import { ensureLpcConfig } from "../backend/LpcConfig";

const supportedDriverLdMud = new DriverLDMud();

export function getDriverInfo() {
    const config = ensureLpcConfig();
    switch (config.driver.type) {
        case "ldmud":
            return supportedDriverLdMud;
        default:
            throw new Error(`Unsupported driver type: ${config.driver.type}`);
    }
}

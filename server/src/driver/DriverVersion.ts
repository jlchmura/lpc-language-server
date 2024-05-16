/**
 * Holds the version of a driver along with utility functions to compare versions.
 * Version is in the format of "major.minor.patch" where each part is a number.
 */
export class DriverVersion {
    constructor(
        public major: number,
        public minor: number,
        public patch: number
    ) {}

    static from(version: string) {
        return parseVersion(version);
    }

    public gte(version: DriverVersion): boolean {
        const other = version;
        if (this.major > other.major) {
            return true;
        }
        if (this.major === other.major && this.minor > other.minor) {
            return true;
        }
        if (
            this.major === other.major &&
            this.minor === other.minor &&
            this.patch >= other.patch
        ) {
            return true;
        }
        return false;
    }
}

function parseVersion(version: string): DriverVersion {
    const parts = version.split(".");
    if (parts.length !== 3) {
        throw new Error(`Invalid version format: ${version}`);
    }

    return new DriverVersion(
        parseInt(parts[0]),
        parseInt(parts[1]),
        parseInt(parts[2])
    );
}

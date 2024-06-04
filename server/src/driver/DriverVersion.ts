/**
 * Holds the version of a driver along with utility functions to compare versions.
 * Version is in the format of "major.minor.micro" where each part is a number.
 */
export class DriverVersion {
    constructor(
        public major: number,
        public minor: number,
        public micro: number
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
            this.micro >= other.micro
        ) {
            return true;
        }
        return false;
    }
}

function parseVersion(version: string): DriverVersion {
    const parts = version.split(".");

    return new DriverVersion(
        parseInt(parts[0]),
        parts.length > 1 ? parseInt(parts[1]) : 0,
        parts.length > 2 ? parseInt(parts[2]) : 0
    );
}

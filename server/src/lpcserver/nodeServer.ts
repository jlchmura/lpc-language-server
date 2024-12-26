import fs from "fs";
import * as lpc from "../lpc/lpc.js";
import { noop } from "../lpc/lpc.js";

export class Logger implements Logger {
    private seq = 0;
    private inGroup = false;
    private firstInGroup = true;
    private fd = -1;
    constructor(
        private readonly logFilename: string,
        private readonly traceToConsole: boolean,
        private readonly level: lpc.server.LogLevel,
    ) {
        if (this.logFilename) {
            try {
                this.fd = fs.openSync(this.logFilename, "w");
            }
            catch (_) {
                // swallow the error and keep logging disabled if file cannot be opened
            }
        }
    }
    static padStringRight(str: string, padding: string) {
        return (str + padding).slice(0, padding.length);
    }
    close() {
        if (this.fd >= 0) {
            fs.close(this.fd, noop);
            this.fd = -1;
        }
    }
    getLogFileName(): string | undefined {
        return this.logFilename;
    }
    perftrc(s: string) {
        this.msg(s, lpc.server.Msg.Perf);
    }
    info(s: string) {
        this.msg(s, lpc.server.Msg.Info);
    }
    err(s: string) {
        this.msg(s, lpc.server.Msg.Err);
    }
    startGroup() {
        this.inGroup = true;
        this.firstInGroup = true;
    }
    endGroup() {
        this.inGroup = false;
    }
    loggingEnabled() {
        return !!this.logFilename || this.traceToConsole;
    }
    hasLevel(level: lpc.server.LogLevel) {
        return this.loggingEnabled() && this.level >= level;
    }
    msg(s: string, type: lpc.server.Msg = lpc.server.Msg.Err) {
        if (!this.canWrite()) return;

        s = `[${lpc.server.nowString()}] ${s}\n`;
        if (!this.inGroup || this.firstInGroup) {
            const prefix = Logger.padStringRight(type + " " + this.seq.toString(), "          ");
            s = prefix + s;
        }
        this.write(s, type);
        if (!this.inGroup) {
            this.seq++;
        }
    }
    protected canWrite() {
        return this.fd >= 0 || this.traceToConsole;
    }
    protected write(s: string, _type: lpc.server.Msg) {
        if (this.fd >= 0) {
            const buf = Buffer.from(s);
            // eslint-disable-next-line no-restricted-syntax
            fs.writeSync(this.fd, buf, 0, buf.length, /*position*/ null);
        }
        if (this.traceToConsole) {
            console.debug(s);
        }
    }    
}

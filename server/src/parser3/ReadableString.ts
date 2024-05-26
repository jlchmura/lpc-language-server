import { Readable } from "stream";

export class ReadableString extends Readable {
    private sent = false;

    constructor(private str: string) {
        super();
    }

    _read() {
        if (!this.sent) {
            this.push(Buffer.from(this.str));
            this.sent = true;
        } else {
            this.push(null);
        }
    }
}

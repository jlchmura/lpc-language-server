export namespace protocol {
    /**
     * Location in source code expressed as (one-based) line and (one-based) column offset.
     */
    export interface Location {
        line: number;
        offset: number;
    }
}

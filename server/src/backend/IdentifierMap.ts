export class IdentifierMap extends Map<string, string> {
    /**
     * Intern a string
     * @param text
     * @returns
     */
    public intern(text: string): string {
        if (text === undefined || text === null) return text;

        let interned = this.get(text);
        if (interned === undefined) {
            interned = text;
            this.set(interned, interned);
        }
        return interned;
    }
}

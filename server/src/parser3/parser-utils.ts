/**
 * remove quotes from the start & end of the string
 * @param str
 */
export function trimQuotes(str: string) {
    if (str.startsWith('"') && str.endsWith('"')) {
        return str.slice(1, -1);
    }
    return str;
}

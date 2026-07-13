import {
    createTextSpan,
    TextSpan,
} from "./_namespaces/lpc";

/**
 * A lightweight fuzzy matcher used by workspace-symbol search ("navigate to").
 *
 * It intentionally mirrors the *semantics* of the TypeScript services pattern matcher
 * (the four {@link PatternMatchKind} buckets and camelCase/word-boundary matching) but
 * drops the dotted-container machinery: LPC declaration names are plain identifiers, so
 * there is no namespace-qualified ("Container.member") pattern to resolve.
 */
export const enum PatternMatchKind {
    // Ordered best-to-worst; comparisons rely on this ordering.
    exact = 0,
    prefix = 1,
    substring = 2,
    camelCase = 3,
}

export interface PatternMatch {
    kind: PatternMatchKind;
    /** True when the candidate matched the pattern with identical casing. */
    isCaseSensitive: boolean;
}

export interface PatternMatcher {
    /** Returns the best match for `candidate`, or `undefined` if it doesn't match at all. */
    getMatch(candidate: string): PatternMatch | undefined;
    /**
     * The first word segment of the pattern, lowercased. A cheap, sound-ish prefilter:
     * callers scanning raw (unparsed) file text can require this substring to be present
     * before paying to parse the file. See the lazy prescan in the server session.
     */
    readonly firstSegment: string;
}

/** Returns `undefined` for an empty/whitespace-only pattern (matches nothing meaningful). */
export function createPatternMatcher(pattern: string): PatternMatcher | undefined {
    const trimmed = pattern.trim();
    if (trimmed.length === 0) {
        return undefined;
    }

    const patternLower = trimmed.toLowerCase();
    // Strip separators so a snake_case or camelCase query matches either identifier style.
    const patternCore = patternLower.replace(/[^a-z0-9]/g, "");
    const segments = breakIntoWordSpans(trimmed);
    const firstSegment = segments.length ? trimmed.substr(segments[0].start, segments[0].length).toLowerCase() : patternLower;

    return {
        firstSegment,
        getMatch(candidate: string): PatternMatch | undefined {
            const candidateLower = candidate.toLowerCase();

            // exact
            if (candidateLower === patternLower) {
                return { kind: PatternMatchKind.exact, isCaseSensitive: candidate === trimmed };
            }
            // prefix
            if (candidateLower.startsWith(patternLower)) {
                return { kind: PatternMatchKind.prefix, isCaseSensitive: candidate.startsWith(trimmed) };
            }
            // substring
            const subIndex = candidateLower.indexOf(patternLower);
            if (subIndex >= 0) {
                return { kind: PatternMatchKind.substring, isCaseSensitive: candidate.indexOf(trimmed) >= 0 };
            }
            // camelCase / word-boundary subsequence (uses the separator-stripped core so
            // "queryPlayer", "query_player" and "querplay" all probe word boundaries)
            if (patternCore.length !== 0 && isCamelCaseMatch(candidate, patternCore)) {
                return { kind: PatternMatchKind.camelCase, isCaseSensitive: false };
            }
            return undefined;
        },
    };
}

/**
 * Matches `pattern` (already lowercased, separators removed) against the word "humps" of
 * `candidate`. Each contiguous run of pattern characters must begin at a word boundary of
 * the candidate — e.g. `qp` and `queryplayer` match `query_player`, but `uery` does not.
 */
function isCamelCaseMatch(candidate: string, pattern: string): boolean {
    const spans = breakIntoWordSpans(candidate);
    let p = 0;
    for (const span of spans) {
        if (p >= pattern.length) break;
        const wordEnd = span.start + span.length;
        let w = span.start;
        // A pattern chunk must align with the start of this word to "enter" it.
        if (toLowerChar(candidate.charCodeAt(w)) !== pattern.charCodeAt(p)) {
            continue;
        }
        while (w < wordEnd && p < pattern.length && toLowerChar(candidate.charCodeAt(w)) === pattern.charCodeAt(p)) {
            w++;
            p++;
        }
    }
    return p === pattern.length;
}

const enum Ch {
    a = 0x61, z = 0x7a,
    A = 0x41, Z = 0x5a,
    _0 = 0x30, _9 = 0x39,
}

function isUpper(ch: number): boolean {
    return ch >= Ch.A && ch <= Ch.Z;
}
function isLower(ch: number): boolean {
    return ch >= Ch.a && ch <= Ch.z;
}
function isDigit(ch: number): boolean {
    return ch >= Ch._0 && ch <= Ch._9;
}
function isWordChar(ch: number): boolean {
    return isUpper(ch) || isLower(ch) || isDigit(ch) || ch > 0x7f; // treat non-ASCII as word chars
}
function toLowerChar(ch: number): number {
    return isUpper(ch) ? ch + 0x20 : ch;
}

/**
 * Splits an identifier into word spans, treating separators (anything non-alphanumeric),
 * lower→upper transitions (`fooBar`), acronym→word transitions (`XMLHttp` → `XML`,`Http`),
 * and letter↔digit transitions as boundaries.
 */
export function breakIntoWordSpans(identifier: string): TextSpan[] {
    const result: TextSpan[] = [];
    let wordStart = -1;

    const push = (end: number) => {
        if (wordStart >= 0 && end > wordStart) {
            result.push(createTextSpan(wordStart, end - wordStart));
        }
        wordStart = -1;
    };

    for (let i = 0; i < identifier.length; i++) {
        const ch = identifier.charCodeAt(i);
        if (!isWordChar(ch)) {
            push(i);
            continue;
        }
        if (wordStart < 0) {
            wordStart = i;
            continue;
        }
        const prev = identifier.charCodeAt(i - 1);
        const next = i + 1 < identifier.length ? identifier.charCodeAt(i + 1) : 0;
        if (isUpper(ch) && !isUpper(prev)) {
            // lower→Upper: start of a new word ("fooBar")
            push(i);
            wordStart = i;
        }
        else if (isUpper(ch) && isUpper(prev) && isLower(next)) {
            // Acronym boundary ("XMLHttp" → "XML", "Http")
            push(i);
            wordStart = i;
        }
        else if (isDigit(ch) !== isDigit(prev)) {
            // letter↔digit boundary ("utf8" → "utf", "8")
            push(i);
            wordStart = i;
        }
    }
    push(identifier.length);
    return result;
}

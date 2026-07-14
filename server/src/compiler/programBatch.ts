import {
    CompilerHost,
    CompilerOptions,
    createCompilerHost,
    createProgram,
    Program,
} from "./_namespaces/lpc";

/** Default number of root files processed per batch by {@link forEachProgramBatch}. */
export const defaultProgramBatchSize = 1000;

export interface ProgramBatchOptions {
    /** The full set of root files to process (e.g. an lpc-config's matched file list). */
    rootNames: readonly string[];
    /** Compiler options shared by every batch. */
    options: CompilerOptions;
    /**
     * Maximum root files per batch. Each batch builds an independent {@link Program} from its
     * root chunk plus the dependency closure those roots pull in on demand. Smaller batches
     * lower peak memory but re-parse shared dependencies more often. Defaults to
     * {@link defaultProgramBatchSize}; values below 1 are treated as 1.
     */
    batchSize?: number;
    /**
     * Factory for the {@link CompilerHost} each batch uses. A fresh host per batch ensures the
     * host's own source-file cache is released along with the batch. Defaults to
     * `createCompilerHost(options)`; override to customize e.g. `getDefaultLibFileName`.
     */
    createHost?: (options: CompilerOptions) => CompilerHost;
}

/**
 * Processes a large set of root files in memory-bounded batches, invoking `cb` with a fully
 * usable {@link Program} for each batch and then releasing it before building the next.
 *
 * Why: a single Program keeps every bound `SourceFile` and the type checker's caches alive for
 * its whole lifetime, so checking a 40k-file mudlib in one Program exhausts the heap. Each
 * batch here builds a Program from a chunk of roots (plus their lazily loaded dependency
 * closure); once `cb` returns, all references to that Program and its host are dropped, so the
 * GC can reclaim its ASTs and checker state. Peak memory stays ~one batch instead of growing
 * to the whole project.
 *
 * Correctness: a file's semantic diagnostics depend only on the files it *depends on*
 * (inherits / includes / simul_efun / efuns), which are pulled into the same batch as non-root
 * sources — never on the files that depend on *it*. Every root is processed in exactly one
 * batch, so nothing is missed or duplicated.
 *
 * Caveat for callers: to keep the batching effective, do NOT retain a batch's `Program`, its
 * `SourceFile`s, `Node`s, `Symbol`s, `Type`s, or `Diagnostic`s (whose `.file` points at a
 * `SourceFile`) after `cb` returns — extract the plain data you need (strings, positions)
 * inside the callback. Holding any of these pins that batch's AST in memory across batches.
 */
export function forEachProgramBatch(
    opts: ProgramBatchOptions,
    cb: (program: Program, batchRootNames: readonly string[], batchIndex: number) => void,
): void {
    const { rootNames, options } = opts;
    const batchSize = Math.max(1, opts.batchSize ?? defaultProgramBatchSize);
    const createHost = opts.createHost ?? ((o: CompilerOptions) => createCompilerHost(o));

    let batchIndex = 0;
    for (let start = 0; start < rootNames.length; start += batchSize) {
        const batchRootNames = rootNames.slice(start, start + batchSize);
        const host = createHost(options);
        const program = createProgram({ host, rootNames: batchRootNames, options, oldProgram: undefined });
        cb(program, batchRootNames, batchIndex++);
        // `host` and `program` fall out of scope here; nothing global retains their files on
        // this path (no DocumentRegistry), so they become eligible for GC before the next batch.
    }
}

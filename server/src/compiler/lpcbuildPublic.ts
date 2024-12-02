export type ReportEmitErrorSummary = (errorCount: number, filesInError: (ReportFileInError | undefined)[]) => void;

export interface ReportFileInError {
    fileName: string;
    line: number;
}

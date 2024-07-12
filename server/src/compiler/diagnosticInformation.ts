import { DiagnosticCategory, DiagnosticMessage } from "./_namespaces/lpc";

function diag(code: number, category: DiagnosticCategory, key: string, message: string, reportsUnnecessary?: {}, elidedInCompatabilityPyramid?: boolean, reportsDeprecated?: {}): DiagnosticMessage {
    return { code, category, key, message, reportsUnnecessary, elidedInCompatabilityPyramid, reportsDeprecated };
}

export const Diagnostics = {
    Expression_expected: diag(1001, DiagnosticCategory.Error, "Expression_expected_1001", "Expression expected."),
}
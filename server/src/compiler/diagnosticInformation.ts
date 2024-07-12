import { DiagnosticCategory, DiagnosticMessage } from "./_namespaces/lpc";

function diag(code: number, category: DiagnosticCategory, key: string, message: string, reportsUnnecessary?: {}, elidedInCompatabilityPyramid?: boolean, reportsDeprecated?: {}): DiagnosticMessage {
    return { code, category, key, message, reportsUnnecessary, elidedInCompatabilityPyramid, reportsDeprecated };
}

export const Diagnostics = {
    Merge_conflict_marker_encountered: diag(1000, DiagnosticCategory.Error, "Merge_conflict_marker_encountered_1000", "Merge conflict marker encountered."),
    Expression_expected: diag(1001, DiagnosticCategory.Error, "Expression_expected_1001", "Expression expected."),
    A_default_clause_cannot_appear_more_than_once_in_a_switch_statement: diag(1100, DiagnosticCategory.Error, "A_default_clause_cannot_appear_more_than_once_in_a_switch_statement_1113", "A 'default' clause cannot appear more than once in a 'switch' statement."),
    Cannot_redeclare_block_scoped_variable_0: diag(2451, DiagnosticCategory.Error, "Cannot_redeclare_block_scoped_variable_0_2451", "Cannot redeclare block-scoped variable '{0}'."),
    Duplicate_identifier_0: diag(2300, DiagnosticCategory.Error, "Duplicate_identifier_0_2300", "Duplicate identifier '{0}'."),
}
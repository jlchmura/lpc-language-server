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
    _0_only_refers_to_a_type_but_is_being_used_as_a_value_here: diag(2693, DiagnosticCategory.Error, "_0_only_refers_to_a_type_but_is_being_used_as_a_value_here_2693", "'{0}' only refers to a type, but is being used as a value here."),
    Circular_definition_of_import_alias_0: diag(2303, DiagnosticCategory.Error, "Circular_definition_of_import_alias_0_2303", "Circular definition of import alias '{0}'."),
    _0_refers_to_a_value_but_is_being_used_as_a_type_here_Did_you_mean_typeof_0: diag(2749, DiagnosticCategory.Error, "_0_refers_to_a_value_but_is_being_used_as_a_type_here_Did_you_mean_typeof_0_2749", "'{0}' refers to a value, but is being used as a type here. Did you mean 'typeof {0}'?"),
    Cannot_find_name_0_Did_you_mean_1: diag(2552, DiagnosticCategory.Error, "Cannot_find_name_0_Did_you_mean_1_2552", "Cannot find name '{0}'. Did you mean '{1}'?"),
    _0_is_declared_here: diag(2728, DiagnosticCategory.Message, "_0_is_declared_here_2728", "'{0}' is declared here."),
    No_value_exists_in_scope_for_the_shorthand_property_0_Either_declare_one_or_provide_an_initializer: diag(18004, DiagnosticCategory.Error, "No_value_exists_in_scope_for_the_shorthand_property_0_Either_declare_one_or_provide_an_initializer_18004", "No value exists in scope for the shorthand property '{0}'. Either declare one or provide an initializer."),
    Cannot_find_name_0: diag(2304, DiagnosticCategory.Error, "Cannot_find_name_0_2304", "Cannot find name '{0}'."),
    _0_is_deprecated: diag(6385, DiagnosticCategory.Suggestion, "_0_is_deprecated_6385", "'{0}' is deprecated.", /*reportsUnnecessary*/ undefined, /*elidedInCompatabilityPyramid*/ undefined, /*reportsDeprecated*/ true),
    The_declaration_was_marked_as_deprecated_here: diag(2798, DiagnosticCategory.Error, "The_declaration_was_marked_as_deprecated_here_2798", "The declaration was marked as deprecated here."),
    Cannot_assign_to_0_because_it_is_a_function: diag(2630, DiagnosticCategory.Error, "Cannot_assign_to_0_because_it_is_a_function_2630", "Cannot assign to '{0}' because it is a function."),
    Cannot_assign_to_0_because_it_is_not_a_variable: diag(2539, DiagnosticCategory.Error, "Cannot_assign_to_0_because_it_is_not_a_variable_2539", "Cannot assign to '{0}' because it is not a variable."),
    Variable_0_is_used_before_being_assigned: diag(2454, DiagnosticCategory.Error, "Variable_0_is_used_before_being_assigned_2454", "Variable '{0}' is used before being assigned."),
    Unreachable_code_detected: diag(7027, DiagnosticCategory.Error, "Unreachable_code_detected_7027", "Unreachable code detected.", /*reportsUnnecessary*/ true),
    
}
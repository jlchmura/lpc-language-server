test() {
  // the type checker correctly evaluates the lambda as a function type
  // which matches the parameter
  test_fn( (: return 1; :) );

  // the type checker correctly evaluates the return type of the lambda
  // as an int
  int i = (: return 1; :);

  // the return type should
  // not be used in this case, since we're assigning to a function type
  function ff = (: return 1; :);
}

test_fn(function f) {
  return 0;
}

// @driver: fluffos

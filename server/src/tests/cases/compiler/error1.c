int test() {
    error("This is an error message");    
}

/**
 * this tests the error() call expr handling in the binder
 * If successful, error should act as a return point of the function
 * Which means it won't report an error that the function doesn't return a value
 */

// @driver: fluffos
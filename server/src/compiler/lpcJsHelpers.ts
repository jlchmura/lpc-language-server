
/**
 * Puts some LPC->JS helper functions into an object that can be used in a VM context
 * @returns 
 */
export function createVmHelperContext() {    
    // any functions that are used in the VM context must be defined here
    // in vanilla javascript
    return {        
        explode,
        implode,
        __lpcBinaryArrayHelper,
        __lpcBinaryHelper
    };

    /** helper for the LPC explode function */
    function explode(string: string | 0, delim: string) {
        return string ? string.split(delim) : string;
    }

    /** helper for the LPC implode function */
    function implode(array: string[] | 0, delim: string) {        
        return array ? array.join(delim) : array;
    }

    /**
     * Performs a binary operation on two arrays
     * @param {*} left 
     * @param {*} right 
     * @param {string} op 
     * @returns 
     */
    function __lpcBinaryArrayHelper<T>(left: T[], right: T[], op: string): T[] {
        switch (op) {
            case "+":
                return left.concat(right);
            case "-":
                return left.filter((item) => !right.includes(item));     
            default:
                throw "Unhandled array operator " + op;            
        }
    }    

    function __lpcBinaryHelper(left: any, right: any, op: string) {
        if (Array.isArray(left) && Array.isArray(right)) {
            return __lpcBinaryArrayHelper(left, right, op);
        } else {
            switch (op) {
                case "+":
                    return left + right;
                case "-":
                    return left - right;
                case "*":
                    return left * right;
                case "/":
                    return left / right;
                default:
                    throw "Unhandled operator " + op;
            }
        }
    }
}
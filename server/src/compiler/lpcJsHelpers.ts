
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
        file_size,
        __lpcBinaryArrayHelper,
        __lpcBinaryHelper,
        __lpcIndexAccessHelper
    };

    /** helper for the LPC explode function */
    function explode(string: string | 0, delim: string) {
        return string ? string.split(delim) : string;
    }

    /** helper for the LPC implode function */
    function implode(array: string[] | 0, delim: string) {        
        return array ? array.join(delim) : array;
    }    

    function file_size(path: string): number {
        if (!path) { return -1; }
        else if (path.endsWith(".c") || path.endsWith(".h")) { return 1; }            
        else { return -2; }
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
                case "==":
                    return left == right;
                case "=":
                    return right;
                default:
                    throw new Error("Unhandled operator " + op);
            }
        }
    }

    function __lpcIndexAccessHelper(array: any[], index: number | string | IndexAccessRange) {
        if (typeof index === "number") {
            return array[index];
        } else if (typeof index === "string") {
            let start = (index.startsWith("<")) ? array.length - parseInt(index.slice(1)) + 1: parseInt(index);
            return array[start];            
        } else if (typeof index === "object") {
            let { start, end } = (index as IndexAccessRange);
                     
            // first convert to numbers.  a < character means set the index
            // that many from the end of the array
            if (typeof start === "string" && start.startsWith("<")) {
                start = array.length - parseInt(start.slice(1)) + 1;                
            }
            if (typeof end === "string" && end.startsWith("<")) {
                end = array.length - parseInt(end.slice(1)) + 1;
            }

            if (end === undefined) {
                return array.slice(start as number);
            } else if (start === undefined) {
                return array.slice(0, end as number);
            } else {
                return array.slice(start as number, end as number);
            }

            return array;            
        }
    }    
}

interface IndexAccessRange {
    start: number | string | undefined; 
    end: number | string | undefined;
}

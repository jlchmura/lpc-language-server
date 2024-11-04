/** helper for the LPC explode function */
function explode(string, delim) {
    return string.split(delim);
}

/**
 * Performs a binary operation on two arrays
 * @param {*} left 
 * @param {*} right 
 * @param {string} op 
 * @returns 
 */
function __lpcBinaryArrayHelper(left, right, op) {
	switch (op) {
        case "+":
            return left.concat(right);
        case "-":
            return left.filter((item) => !right.includes(item));     
        case "+=":
            return left.push(...right);
        case "-=":
            return left = left.filter((item) => !right.includes(item));
  }
}

function __lpcBinaryHelper(left, right, op) {
	if (Array.isArray(left) || Array.isArray(right)) {
        return __lpcBinaryArrayHelper(left, right, op);
    } else {
        switch (op) {
            case "+":
                return left + right;
            case "-":
                return left - right;
        }
    }
}

function get_include_path(string file) {
    let path = __lpcBinaryHelper(explode(file, "/"),[""],"-"), paths = [":DEFAULT:"];
    switch (path[0]) {
        case "domain":
            __lpcBinaryHelper(paths,[__lpcBinaryHelper(__lpcBinaryHelper("/domain/",path[1],"+"),"/include","+")],"+=");
            break;
        case "realm":
            __lpcBinaryHelper(paths,[__lpcBinaryHelper(__lpcBinaryHelper("/realm/",path[1],"+"),"/include","+")],"+=");
            break;
    }
    return paths;
}
var ctxResult = get_include_path(ctxInput);

console.log(get_include_path("/domain/area1/room.c"));
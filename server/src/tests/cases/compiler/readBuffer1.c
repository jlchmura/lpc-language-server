// read_buffer(): a string (filename) source yields a buffer; a buffer source
// yields a string. https://github.com/jlchmura/lpc-language-server/issues/311

void test(string file, buffer buf) {
    buffer contents = read_buffer(file, 0, file_size(file));
    string part = read_buffer(buf, 0, 10);
    string whole = read_buffer(buf);

    contents = allocate_buffer(1);
    part = "x";
    whole = "y";
}

// @driver: fluffos
// @errors: 0

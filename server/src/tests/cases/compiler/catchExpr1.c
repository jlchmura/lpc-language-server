void testCatches() {
    if (err=catch(this_user()->quit_character())) {
        write("error");
    }
}
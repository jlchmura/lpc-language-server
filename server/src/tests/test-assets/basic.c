#define FOO 1
#define WR(x) write(x)

int test() {
    WR(sprintf("%s", FOO));
    return 1;
}
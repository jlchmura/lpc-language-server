// nested macro sub
#define BAR(y) y
#define FOO(x) BAR(x)

int a = FOO(1);
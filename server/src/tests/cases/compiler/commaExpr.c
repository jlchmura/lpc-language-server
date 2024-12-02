// a comma expression with more than 1 comma
void testMultiCommaExpression() {
    int i=0;
    int *common1 = ({});
    int *common2 = ({});
    int e1 = sizeof(common1) - 1;
    int e2 = sizeof(common2) - 1;

    while( i && common1[ e1  ] == common2[ e2  ] ) e1--, e2--, i--;
}
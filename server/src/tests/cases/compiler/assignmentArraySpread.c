// @driver: fluffos

void testArrayWithSpread() {
    int *arr = ({ 1, 2, 3 });
    int *arr2 = ({ 1, arr... });

    int elem = 1;
    int *arr3 = ({arr..., elem});
}

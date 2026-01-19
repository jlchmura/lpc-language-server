test() {
    float *frgb;
    int *rgb = ({ 100, 150, 200 });
    frgb = map(rgb, (: to_float :));
}

/**
 * This tests that simplified closure syntax with an efun
 * uses the efun's return type for inference.
 */

// @driver: fluffos

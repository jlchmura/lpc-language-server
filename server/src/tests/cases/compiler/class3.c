class equipped {
    string name;
    int time, uptime;
    string eq_file;
    string primary;
    int *guilds;
    int *stats;
    int wc;
    int dr, dt, ac;
    int weight, value;
    string *armor_slots;
}

test() {
    class equipped eq;
    int j = eq->dt;
}

/**
 * Class property declarations can be a list. (e.g. dr, dt, ac)
 */

// @driver: fluffos

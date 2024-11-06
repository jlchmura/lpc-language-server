// @driver: ldmud
test() {
    mixed *wl = filter(
        wizlist_info(), 
        lambda( ({'a}),
                ({#'!=, ({#'[, 'a, "NAME"}), "NONAME"})
              )
    );
}
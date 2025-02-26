private
nosave mapping multiline_lit = (
    ["metal":([128:"steel",
                 64:"darksteel", 32:"silver", 16:"gold", 8:"platinum", 4:"titanium", 2:"adamantine", 1:"orichalcum", ]),
        "wood":([128:"fir", 64:"pine", 32:"oak", 16:"cedar", 8:"larch", 4:"hemlock", 2:"ebony", 1:"bloodwood", ]), ]);

// from LIMA: https://github.com/fluffos/lima/blob/dbcef2a9b2919474145e6a533fc434d67f6c7f5a/lib/daemons/crafting_d.c#L31

// mapping literals can have whitespace (including newlines) between the ( and [ characters

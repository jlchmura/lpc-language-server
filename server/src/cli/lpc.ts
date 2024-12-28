import * as lpc from "../lpc/lpc.js";

// This file actually uses arguments passed on commandline and executes it

// enable deprecation logging
lpc.Debug.loggingHost = {
    log(_level, s) {
        lpc.sys.write(`${s || ""}${lpc.sys.newLine}`);
    },
};

if (lpc.Debug.isDebugging) {
    lpc.Debug.enableDebugInfo();
}

if (lpc.sys.tryEnableSourceMapsForHost && /^development$/i.test(lpc.sys.getEnvironmentVariable("NODE_ENV"))) {
    lpc.sys.tryEnableSourceMapsForHost();
}

if (lpc.sys.setBlocking) {
    lpc.sys.setBlocking();
}

lpc.executeCommandLine(lpc.sys, lpc.sys.args);
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

// our console output is still verbose, so mask console output
console.log = lpc.noop;
console.debug = lpc.noop;
console.info = lpc.noop;
console.warn = lpc.noop;

lpc.executeCommandLine(lpc.sys, lpc.sys.args, onMessage);

function onMessage(msg: string, msgType?: lpc.ExecuteCommandMsgType) {
    lpc.sys.write(msg);
}
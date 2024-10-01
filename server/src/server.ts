import { createConnection, ProposedFeatures } from "vscode-languageserver/node";
import { LpcServer } from "./backend/LpcServer";
import * as lpc from "./lpc/lpc.js";
import {start} from "./lpcserver/server.js";

console.info("Starting LPC Language Server");

// Create a connection for the server, using Node's IPC as a transport.
const connection = createConnection(ProposedFeatures.all);
// console.log = connection.console.log.bind(connection.console.log);
// console.error = connection.console.error.bind(connection.console.error);

// const server = new LpcServer(connection);
// server.start();

// start server2
start(connection, require("os").platform());

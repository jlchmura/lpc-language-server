import { createConnection, ProposedFeatures } from "vscode-languageserver/node";
import {start} from "./lpcserver/server.js";

console.info("Starting LPC Language Server");
process.title = "lpc-language-server-2";

// Create a connection for the server, using Node's IPC as a transport.
const connection = createConnection(ProposedFeatures.all);
// console.log = connection.console.log.bind(connection.console.log);
// console.error = connection.console.error.bind(connection.console.error);

start(connection, require("os").platform(), process.argv);

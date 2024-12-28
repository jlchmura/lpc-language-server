import * as core from '@actions/core';
import * as lpc from "lpc";

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
    try {
      // trap the console output - since lpc is so chatty
      // console.log = () => {};
      console.debug = () => {};
      // console.info = () => {};
      // console.warn = () => {};

      console.log = (msg) => { core.info(msg) };
      console.info = (msg) => { core.info(msg) };
      console.warn = (msg) => { core.warning(msg) };


      // Set outputs for other workflow steps to use
      // core.setOutput('time', new Date().toTimeString())
      
      // redirect lpc output to core.info
      lpc.sys.write = (message: string) => {
        core.info(message);
      }      

      const lpcConfig = core.getInput('lpc-config');
      if (!lpcConfig) {
        core.setFailed("No lpc-config input provided");
        return;
      }

      core.info(`Running lpc build with config: ${lpcConfig}`);      
      lpc.executeCommandLine(lpc.sys, ["--project", core.toPlatformPath(lpcConfig)]);
      
    } catch (error) {
      // Fail the workflow run if an error occurs
      if (error instanceof Error) core.setFailed(error.message)
    }
  }
import * as core from '@actions/core';
import * as lpc from "lpc";
import ansiStyles from "ansi-styles";

const problemMatcher = /^([^\s].*)[\(:](\d+)[,:](\d+)(?:\):\s+|\s+-\s+)(error|warning|info)\s+LPC(\d+)\s*:\s*(.*)$/;

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

      lpc.sys.writeOutputIsTTY = () => true; // force color on

      let hadError = false;
      // Set outputs for other workflow steps to use
      // core.setOutput('time', new Date().toTimeString())
      
      // redirect lpc output to core.info
      lpc.sys.write = (message: string) => {
        const cleanedMessage = message.trim();
        const match = problemMatcher.exec(cleanedMessage);
        // if match is found, log as error
        if (match) {
          hadError = true;         
          core.error(cleanedMessage, {
            file: match[1],            
            startLine: parseInt(match[2]),
            startColumn: parseInt(match[3]),                        
            title: `LPC${match[5]}: ${match[6]}`
          }); 
        } else {        
          core.info(cleanedMessage);
        }
      }      

      const lpcConfig = core.getInput('lpc-config');
      if (!lpcConfig) {
        core.setFailed("No lpc-config input provided");
        return;
      }

      core.info(`Running lpc build with config: ${lpcConfig}`);      
      lpc.executeCommandLine(lpc.sys, ["--project", core.toPlatformPath(lpcConfig)], onExecuteCommandMsg);
      
      if (hadError) {
        core.setFailed(ansiStyles.color.redBright + "LPC build failed");
      } 
    } catch (error) {
      // Fail the workflow run if an error occurs
      if (error instanceof Error) core.setFailed(error.message)
    }

  function onExecuteCommandMsg(msg: string, msgType?: lpc.ExecuteCommandMsgType) {
    switch (msgType) {
      case lpc.ExecuteCommandMsgType.Failure:
        core.setFailed(msg.trim());
        break;      
      case lpc.ExecuteCommandMsgType.Success:
        core.summary.addRaw(msg);
        core.info(msg.trim());
        break;
      default:
        core.info(msg.trim());
    }    
  }
}

 
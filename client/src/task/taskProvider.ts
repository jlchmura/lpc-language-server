import * as jsonc from 'jsonc-parser';
import * as path from 'path';
import * as vscode from 'vscode';

import { LanguageClient } from 'vscode-languageclient/node';
import { Disposable } from '../utils/dispose';
import { LpcConfig, LpcConfigProvider } from './lpcConfigProvider';
import { isLpcConfigFileName } from '../configuration/languageDescription';
import { isImplicitProjectConfigFile } from '../extension';
import { coalesce, exists, wait } from '../utils/utils';

enum AutoDetect {
	on = 'on',
	off = 'off',
	build = 'build',
	watch = 'watch'
}

interface LpcTaskDefinition extends vscode.TaskDefinition {
	lpcConfig: string;
	option?: string;
}

class LpcTaskProvider extends Disposable implements vscode.TaskProvider {
    private readonly projectInfoRequestTimeout = 2000;
    private readonly findConfigFilesTimeout = 5000;

    private autoDetect = AutoDetect.on;
    private readonly configProvider: LpcConfigProvider;

    constructor(
        private readonly context: vscode.ExtensionContext,
        private readonly client: LanguageClient
    ) {
        super();
        this.configProvider = new LpcConfigProvider();
    }

    private static async getCommand(context: vscode.ExtensionContext, project: LpcConfig): Promise<string> {
        const cliModule = context.asAbsolutePath(
            path.join("out", "server", "src", "cli", "lpc.js")
        );

        return cliModule;

		// if (project.workspaceFolder) {
		// 	const localLpc = await LpcTaskProvider.getLocalLpcAtPath(path.dirname(project.fsPath));
		// 	if (localLpc) {
		// 		return localLpc;
		// 	}

		// 	const workspaceTsc = await LpcTaskProvider.getLocalLpcAtPath(project.workspaceFolder.uri.fsPath);
		// 	if (workspaceTsc) {
		// 		return workspaceTsc;
		// 	}
		// }

		// // Use global lpc version
		// return 'lpc';
	}

    private static async getLocalLpcAtPath(folderPath: string): Promise<string | undefined> {        
		const platform = process.platform;
		const bin = path.join(folderPath, 'node_modules', '.bin');
		if (platform === 'win32' && await exists(vscode.Uri.file(path.join(bin, 'lpc.cmd')))) {
			return path.join(bin, 'lpc.cmd');
		} else if ((platform === 'linux' || platform === 'darwin') && await exists(vscode.Uri.file(path.join(bin, 'lpc')))) {
			return path.join(bin, 'lpc');
		}
		return undefined;
	}

    public async provideTasks(token: vscode.CancellationToken): Promise<vscode.Task[]> {
		const folders = vscode.workspace.workspaceFolders;
		if ((this.autoDetect === AutoDetect.off) || !folders?.length) {
			return [];
		}

		const configPaths: Set<string> = new Set();
		const tasks: vscode.Task[] = [];
		for (const project of await this.getAllConfigs(token)) {
			if (!configPaths.has(project.fsPath)) {
				configPaths.add(project.fsPath);
				tasks.push(...(await this.getTasksForProject(project)));
			}
		}
		return tasks;
	}

    public async resolveTask(task: vscode.Task): Promise<vscode.Task | undefined> {
		const definition = <LpcTaskDefinition>task.definition;
		if (/\\lpc-config.*\.json/.test(definition.lpcConfig)) {
			// Warn that the task has the wrong slash type
			vscode.window.showWarningMessage(vscode.l10n.t("LPC Task in tasks.json contains \"\\\\\". LPC tasks lpc-cconfig must use \"/\""));
			return undefined;
		}

		const tsconfigPath = definition.lpcConfig;
		if (!tsconfigPath) {
			return undefined;
		}

		if (task.scope === undefined || task.scope === vscode.TaskScope.Global || task.scope === vscode.TaskScope.Workspace) {
			// scope is required to be a WorkspaceFolder for resolveTask
			return undefined;
		}
		const tsconfigUri = task.scope.uri.with({ path: task.scope.uri.path + '/' + tsconfigPath });
		const tsconfig: LpcConfig = {
			uri: tsconfigUri,
			fsPath: tsconfigUri.fsPath,
			posixPath: tsconfigUri.path,
			workspaceFolder: task.scope
		};
		return this.getTasksForProjectAndDefinition(tsconfig, definition);
	}

    private async getTasksForProjectAndDefinition(project: LpcConfig, definition: LpcTaskDefinition): Promise<vscode.Task | undefined> {
		const command = await LpcTaskProvider.getCommand(this.context, project);
		const args = await this.getBuildShellArgs(project);
		const label = this.getLabelForTasks(project);

		let task: vscode.Task | undefined;

		if (definition.option === undefined) {
			task = this.getBuildTask(project.workspaceFolder, label, command, args, definition);
		} 
        // else if (definition.option === 'watch') {
		// 	task = this.getWatchTask(project.workspaceFolder, label, command, args, definition);
		// }

		return task;
	}

    private async getTasksForProject(project: LpcConfig): Promise<vscode.Task[]> {
		const command = await LpcTaskProvider.getCommand(this.context, project);
		const args = await this.getBuildShellArgs(project);
		const label = this.getLabelForTasks(project);

		const tasks: vscode.Task[] = [];

		if (this.autoDetect === AutoDetect.build || this.autoDetect === AutoDetect.on) {
			tasks.push(this.getBuildTask(project.workspaceFolder, label, command, args, { type: 'typescript', lpcConfig: label }));
		}

		// if (this.autoDetect === AutoDetect.watch || this.autoDetect === AutoDetect.on) {
		// 	tasks.push(this.getWatchTask(project.workspaceFolder, label, command, args, { type: 'typescript', tsconfig: label, option: 'watch' }));
		// }

		return tasks;
	}

    private getBuildTask(workspaceFolder: vscode.WorkspaceFolder | undefined, label: string, command: string, args: string[], buildTaskidentifier: LpcTaskDefinition): vscode.Task {
		const buildTask = new vscode.Task(
			buildTaskidentifier,
			workspaceFolder || vscode.TaskScope.Workspace,
			vscode.l10n.t("Build - {0}", label),
			'lpc',
			new vscode.ShellExecution("node", [command, ...args]),
			'$lpc');
		buildTask.group = vscode.TaskGroup.Build;
		buildTask.isBackground = false;
				
		return buildTask;
	}

    private getLabelForTasks(project: LpcConfig): string {
		if (project.workspaceFolder) {
			const workspaceNormalizedUri = vscode.Uri.file(path.normalize(project.workspaceFolder.uri.fsPath)); // Make sure the drive letter is lowercase
			return path.posix.relative(workspaceNormalizedUri.path, project.posixPath);
		}

		return project.posixPath;
	}


    private async getBuildShellArgs(project: LpcConfig): Promise<Array<string>> {
		const defaultArgs = ['--project', project.fsPath];
		// try {
		// 	const bytes = await vscode.workspace.fs.readFile(project.uri);
		// 	const text = Buffer.from(bytes).toString('utf-8');
		// 	const tsconfig = jsonc.parse(text);
		// 	if (tsconfig?.references) {
		// 		return ['-b', project.fsPath];
		// 	}
		// } catch {
		// 	// noops
		// }
		return defaultArgs;
	}

    private async getAllConfigs(token: vscode.CancellationToken): Promise<LpcConfig[]> {
		const configs = (await Promise.all([
			this.getLpcConfigForActiveFile(token),
			this.getLpcConfigsInWorkspace(token),
		])).flat();

		return Promise.all(
			configs.map(async config => await exists(config.uri) ? config : undefined),
		).then(coalesce);
	}

    private async getLpcConfigForActiveFile(token: vscode.CancellationToken): Promise<LpcConfig[]> {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			if (isLpcConfigFileName(editor.document.fileName)) {
				const uri = editor.document.uri;
				return [{
					uri,
					fsPath: uri.fsPath,
					posixPath: uri.path,
					workspaceFolder: vscode.workspace.getWorkspaceFolder(uri)
				}];
			}
		}

		const file = this.getActiveLpcFile();
		if (!file) {
			return [];
		}

		const response: any|undefined = await Promise.race([
            this.client.sendRequest("projectInfo", { 
                command: "projectInfo",
                arguments: {
                    needFileNameList: false,
                    file
                }                     
            }),
			new Promise<undefined>(resolve => setTimeout(() => resolve(undefined), this.projectInfoRequestTimeout))
		]);
		if (!response) {
			return [];
		}

		const { configFileName } = response;
		if (configFileName && !isImplicitProjectConfigFile(configFileName)) {
			const normalizedConfigPath = path.normalize(configFileName);
			const uri = vscode.Uri.file(normalizedConfigPath);
			const folder = vscode.workspace.getWorkspaceFolder(uri);
			return [{
				uri,
				fsPath: normalizedConfigPath,
				posixPath: uri.path,
				workspaceFolder: folder
			}];
		}

		return [];
	}

	private async getLpcConfigsInWorkspace(token: vscode.CancellationToken): Promise<LpcConfig[]> {
		const getConfigsTimeout = new vscode.CancellationTokenSource();
		token.onCancellationRequested(() => getConfigsTimeout.cancel());

		return Promise.race([
			this.configProvider.getConfigsForWorkspace(getConfigsTimeout.token).then(x => Array.from(x)),
			wait(this.findConfigFilesTimeout).then(() => {
				getConfigsTimeout.cancel();
				return [];
			}),
		]);
	}

    private getActiveLpcFile(): string | undefined {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			if (document && (document.languageId === 'lpc')) {
                return document.uri.toString();
			}
		}
		return undefined;
	}
}

export function register(
    context: vscode.ExtensionContext,
	client: LanguageClient,
) {
	return vscode.tasks.registerTaskProvider('typescript', new LpcTaskProvider(context, client));
}

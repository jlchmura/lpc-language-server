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

/**
 * Must match the `type` of the task definition contributed in package.json, and the
 * property name it lists under `required` -- VS Code matches a task to its contributed
 * definition by both, so a task built with anything else is never resolved.
 */
const taskType = 'LPC';

interface LpcTaskDefinition extends vscode.TaskDefinition {
	'lpc-config': string;
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
        return getCliModule(context);

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
		if (/\\lpc-config.*\.json/.test(definition['lpc-config'])) {
			// Warn that the task has the wrong slash type
			vscode.window.showWarningMessage(vscode.l10n.t("LPC Task in tasks.json contains \"\\\\\". LPC tasks lpc-cconfig must use \"/\""));
			return undefined;
		}

		const tsconfigPath = definition['lpc-config'];
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
			task = this.getBuildTask(project, label, command, args, definition);
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
			tasks.push(this.getBuildTask(project, label, command, args, { type: taskType, 'lpc-config': label }));
		}

		// if (this.autoDetect === AutoDetect.watch || this.autoDetect === AutoDetect.on) {
		// 	tasks.push(this.getWatchTask(project.workspaceFolder, label, command, args, { type: 'typescript', tsconfig: label, option: 'watch' }));
		// }

		return tasks;
	}

    private getBuildTask(project: LpcConfig, label: string, command: string, args: string[], buildTaskidentifier: LpcTaskDefinition): vscode.Task {
		const buildTask = new vscode.Task(
			buildTaskidentifier,
			project.workspaceFolder || vscode.TaskScope.Workspace,
			vscode.l10n.t("Build - {0}", label),
			'lpc',
			new vscode.ShellExecution("node", [command, ...args]),
			'$lpc');
		buildTask.group = vscode.TaskGroup.Build;
		buildTask.isBackground = false;

		return buildTask;
	}

    private getLabelForTasks(project: LpcConfig): string {
		return labelForConfig(project);
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

function getCliModule(context: vscode.ExtensionContext): string {
	return context.asAbsolutePath(path.join("out", "server", "src", "cli", "lpc.js"));
}

/**
 * The whole-project check, as a task rather than a bare child process: the terminal
 * gives a slow run somewhere to report progress, and `$lpc` -- declared `applyTo:
 * closedDocuments` -- files the results under Problems for the files nobody has open,
 * leaving the language server's own diagnostics in charge of the ones you do.
 *
 * Deliberately no `cwd`. The CLI writes file paths relative to its working directory and
 * the matcher resolves them against `${cwd}`, which is the WORKSPACE FOLDER -- a task's
 * ShellExecution cwd does not feed it. Pointing the CLI at the directory holding
 * lpc-config.json therefore only lines the two up when that happens to be the workspace
 * root; for a config in a subfolder every problem lands on a path that does not exist.
 * Letting the shell default to the workspace folder keeps both sides on the same root.
 */
function createCheckTask(context: vscode.ExtensionContext, project: LpcConfig, label: string): vscode.Task {
	const definition: LpcTaskDefinition = { type: taskType, 'lpc-config': project.fsPath };
	const task = new vscode.Task(
		definition,
		project.workspaceFolder || vscode.TaskScope.Workspace,
		vscode.l10n.t("Check Project - {0}", label),
		'lpc',
		new vscode.ShellExecution("node", [getCliModule(context), "--project", project.fsPath]),
		// Not `$lpc`: that one is `applyTo: closedDocuments`, which is right for a compile of
		// the active file but silently drops every finding for a file the user has open -- so
		// a whole-project check reported nothing for exactly the files being worked on.
		'$lpcCheck');
	task.group = vscode.TaskGroup.Build;
	task.isBackground = false;
	// The terminal is a means, not the point: everything this produces lands in Problems,
	// so showing it only leaves a panel to dismiss. `close` disposes it on exit instead of
	// parking it for reuse. `Never` rather than `Silent` because Silent's reveal condition
	// is subtle enough not to want to rely on it; the caller reports a failed run itself.
	task.presentationOptions = {
		reveal: vscode.TaskRevealKind.Never,
		echo: false,
		focus: false,
		panel: vscode.TaskPanelKind.Dedicated,
		showReuseMessage: false,
		clear: true,
		close: true,
	};

	return task;
}

function labelForConfig(project: LpcConfig): string {
	if (project.workspaceFolder) {
		// Make sure the drive letter is lowercase
		const folder = vscode.Uri.file(path.normalize(project.workspaceFolder.uri.fsPath));
		return path.posix.relative(folder.path, project.posixPath);
	}

	return project.posixPath;
}

/** Backs the `lpc.checkProject` command: check every file in a project, not just the open ones. */
export async function checkProject(context: vscode.ExtensionContext): Promise<void> {
	const source = new vscode.CancellationTokenSource();
	let configs: LpcConfig[];
	try {
		configs = Array.from(await new LpcConfigProvider().getConfigsForWorkspace(source.token));
	} finally {
		source.dispose();
	}

	if (!configs.length) {
		vscode.window.showWarningMessage(
			vscode.l10n.t("No lpc-config.json found in this workspace."));
		return;
	}

	let project = configs[0];
	if (configs.length > 1) {
		const picked = await vscode.window.showQuickPick(
			configs.map(config => ({ label: labelForConfig(config), config })),
			{ placeHolder: vscode.l10n.t("Which project should be checked?") });
		if (!picked) {
			return;
		}
		project = picked.config;
	}

	const label = labelForConfig(project);
	const task = createCheckTask(context, project, label);

	// With the terminal hidden there would otherwise be nothing to say the check is
	// running, and Problems stays as it was until the results land. A window-location
	// progress item is the same spinner a visible task gets, without the panel.
	// A failed run reports itself without help: VS Code raises its own notification, and
	// `close` leaves the terminal open when the task exits non-zero, so the output is
	// still there to read. Only a successful run is closed and forgotten.
	const exitCode = await vscode.window.withProgress(
		{ location: vscode.ProgressLocation.Window, title: vscode.l10n.t("Checking {0}", label) },
		async () => {
			const execution = await vscode.tasks.executeTask(task);
			return new Promise<number | undefined>(resolve => {
				const finished = vscode.tasks.onDidEndTaskProcess(event => {
					if (event.execution === execution) {
						finished.dispose();
						resolve(event.exitCode);
					}
				});
			});
		});

	// A check that ran to the end has put everything it found in Problems, so go there unless
	// told not to -- `!== false` because an unset setting means yes, read now so a change made
	// mid-run applies. The CLI exits 0 whether or not it found problems; anything else (or
	// undefined, when the task was stopped) means it failed, and its output is in the terminal
	// `close` leaves open -- focusing Problems would bury it. Focus the view rather than run
	// `workbench.actions.view.problems`, a toggle that closes the panel when Problems is showing.
	if (exitCode === 0 && vscode.workspace.getConfiguration("LPC").get<boolean>("checkProject.openProblemsPanel") !== false) {
		await vscode.commands.executeCommand("workbench.panel.markers.view.focus");
	}
}

export function register(
    context: vscode.ExtensionContext,
	client: LanguageClient,
) {
	return vscode.tasks.registerTaskProvider(taskType, new LpcTaskProvider(context, client));
}

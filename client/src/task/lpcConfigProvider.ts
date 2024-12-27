import * as vscode from 'vscode';

export interface LpcConfig {
	readonly uri: vscode.Uri;
	readonly fsPath: string;
	readonly posixPath: string;
	readonly workspaceFolder?: vscode.WorkspaceFolder;
}

export class LpcConfigProvider {
    public async getConfigsForWorkspace(token: vscode.CancellationToken): Promise<Iterable<LpcConfig>> {
		if (!vscode.workspace.workspaceFolders) {
			return [];
		}

		const configs = new Map<string, LpcConfig>();
		for (const config of await this.findConfigFiles(token)) {
			const root = vscode.workspace.getWorkspaceFolder(config);
			if (root) {
				configs.set(config.fsPath, {
					uri: config,
					fsPath: config.fsPath,
					posixPath: config.path,
					workspaceFolder: root
				});
			}
		}
		return configs.values();
	}

	private async findConfigFiles(token: vscode.CancellationToken): Promise<vscode.Uri[]> {
		return await vscode.workspace.findFiles('**/lpc-config.json', '**/{node_modules,.*}/**', undefined, token);
	}
}
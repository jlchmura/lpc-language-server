import * as vscode from 'vscode';

export abstract class BaseServiceConfigurationProvider {
    public loadFromWorkspace(): LpcServiceConfiguration {
		const configuration = vscode.workspace.getConfiguration();
        return {
            locale: this.readLocale(configuration),
            maxLpcServerMemory: this.readMaxLpcServerMemory(configuration),
        }
    }

    protected readLocale(configuration: vscode.WorkspaceConfiguration): string | null {
		const value = configuration.get<string>('LPC.locale', 'auto');
		return !value || value === 'auto' ? null : value;
	}

    protected readMaxLpcServerMemory(configuration: vscode.WorkspaceConfiguration): number {
		const defaultMaxMemory = 3072;
		const minimumMaxMemory = 128;
		const memoryInMB = configuration.get<number>('LPC.languageServer.maxLpcServerMemory', defaultMaxMemory);
		if (!Number.isSafeInteger(memoryInMB)) {
			return defaultMaxMemory;
		}
		return Math.max(memoryInMB, minimumMaxMemory);
	}
}

export interface LpcServiceConfiguration {
    readonly locale: string | null;
    readonly maxLpcServerMemory: number;
}
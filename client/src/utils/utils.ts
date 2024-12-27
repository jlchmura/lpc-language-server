import * as vscode from 'vscode';

export const wait = (ms: number) => new Promise<void>(resolve => setTimeout(() => resolve(), ms));

export function coalesce<T>(array: ReadonlyArray<T | undefined>): T[] {
	return array.filter((e): e is T => !!e);
}

export async function exists(resource: vscode.Uri): Promise<boolean> {
	try {
		const stat = await vscode.workspace.fs.stat(resource);
		// stat.type is an enum flag
		return !!(stat.type & vscode.FileType.File);
	} catch {
		return false;
	}
}

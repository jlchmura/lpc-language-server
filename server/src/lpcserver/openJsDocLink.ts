export interface OpenJsDocLinkCommand_Args {
	readonly file: {
		readonly scheme: string;
		readonly authority?: string;
		readonly path?: string;
		readonly query?: string;
		readonly fragment?: string;
	};
	readonly position: {
		readonly line: number;
		readonly character: number;
	};
}

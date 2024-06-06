/*
 * Based on ANTLR4 code from Mike Lischke.
 *
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { StatusBarAlignment, StatusBarItem, window } from "vscode";

export class ProgressIndicator {
    private static progressChars =
        "⠁⠃⠅⡁⢁⠡⠑⠉⠁⠃⠇⡃⢃⠣⠓⠋⠃⠃⠇⡇⢇⠧⠗⠏⠇⠇⠇⡇⣇⡧⡗⡏⡇⡇⡇⡇⣇⣧⣗⣏⣇⣇⣇⣇⣇⣧⣷⣯⣧⣧⣧⣧⣧⣧⣷⠧⠗⠏⠇⠇⠇⣿⣿⣿⣿⣿⣿⣿⣿";

    private statusBarItem: StatusBarItem;
    private timer: ReturnType<typeof setInterval> | null;
    private progress = 0;

    public driverType: string = "";

    public constructor() {
        this.statusBarItem = window.createStatusBarItem(
            StatusBarAlignment.Left,
            0
        );
        this.setText();
    }

    private setText() {
        this.statusBarItem.text = this.baseText();
        this.statusBarItem.tooltip =
            "LPC Language Server - Driver Type: " + this.driverType;
    }

    public startAnimation(): void {
        this.statusBarItem.show();
        if (!this.timer) {
            this.timer = setInterval(() => {
                const index =
                    this.progress % ProgressIndicator.progressChars.length;
                this.statusBarItem.text = `${this.baseText()} ${ProgressIndicator.progressChars.charAt(
                    index
                )}`;
                this.progress++;
            }, 50);
        }
    }

    public stopAnimation(): void {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
            this.statusBarItem.text = this.baseText();
        }
    }

    private baseText(): string {
        return `LPC [${this.driverType}]`;
    }

    public setDriverType(type: string) {
        this.driverType = type;
        this.setText();
    }
}

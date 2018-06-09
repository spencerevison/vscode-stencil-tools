'use strict';

import * as vscode from 'vscode';
import registerCommands from './commands/_register';
import registerSnippets from './snippets/_register';

export const extensionTitle = 'stencilTools';

export function activate(context: vscode.ExtensionContext) {

    vscode.commands.executeCommand('setContext', 'isStencilProject', true);
    registerCommands(context);
    registerSnippets();
}

export function deactivate() {
}

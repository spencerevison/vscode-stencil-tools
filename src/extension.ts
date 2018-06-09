'use strict';

import * as vscode from 'vscode';
import registerCommands from './commands/_register';

export const extensionTitle = 'stencilTools';

export function activate(context: vscode.ExtensionContext) {

    vscode.commands.executeCommand('setContext', 'isStencilProject', true);
    registerCommands(context);

}

export function deactivate() {
}

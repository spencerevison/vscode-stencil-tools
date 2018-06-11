'use strict';

import * as vscode from 'vscode';
import registerCommands from './commands/_register';
import registerSnippets from './snippets/_register';
import { onStartedProjectOpen } from './commands/start-project/on-started-project-open';

export const extensionTitle = 'stencilTools';
let registered = {
    typescriptreact: false,
    typescript: false
}

export function activate(context: vscode.ExtensionContext) {
    
    registerCommands(context);
    doCheckWorkspace();
    
    if (vscode.window.activeTextEditor) {
        const doc = vscode.window.activeTextEditor.document;
        doRegisterSnippets(doc);
    }
    vscode.workspace.onDidOpenTextDocument((e) => doRegisterSnippets(e))
}

function doCheckWorkspace() {
    console.log('Checking workspace');

    vscode.workspace.findFiles('**/stencil.config.js').then((uri) => {
        if (uri.length) { vscode.commands.executeCommand('setContext', 'isStencilProject', true); }
    });

    vscode.workspace.findFiles('**/.stencilTools').then((uri) => {
        if (uri.length) { onStartedProjectOpen(uri); }
    });
}

function doRegisterSnippets(e: { languageId: string }) {
    if (e.languageId === 'typescriptreact' && !registered.typescriptreact) {
        registerSnippets('typescriptreact');
        registered.typescriptreact = true;
    } else if (e.languageId === 'typescript' && !registered.typescript) {
        registerSnippets('typescript');
        registered.typescript = true;
    }
}

export function deactivate() {
}

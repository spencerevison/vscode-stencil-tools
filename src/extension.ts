'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as changeCase from 'change-case';
import { Observable } from 'rxjs';

import { FileHelper } from './FileHelper';
import { Config } from './config.interface';

import OpenDocs from './commands/open-docs';
import StartProject, { STENCIL_STARTER } from './commands/start-project';
import GenerateComponent from './commands/generate-component';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    vscode.commands.executeCommand('setContext', 'isStencilProject', true);

    const commands = new Map([
        ['openDocs', () => OpenDocs()],
        ['startProjectComponent', () => StartProject(STENCIL_STARTER.COMPONENT)],
        ['startProjectApp', () => StartProject(STENCIL_STARTER.APP)],
        ['generateComponentFilesFromCommandPalette', () => GenerateComponent(null)],
        ['generateComponentFiles', (uri) => GenerateComponent(uri)]
    ])

    commands.forEach((action, command) => {
        let disposable = vscode.commands.registerCommand(`extension.${command}`, action);
        context.subscriptions.push(disposable);
    })
}

// this method is called when your extension is deactivated
export function deactivate() {
}

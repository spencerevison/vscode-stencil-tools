'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as changeCase from 'change-case';
import { Observable } from 'rxjs';

import { FileHelper } from './FileHelper';
import { Config } from './config.interface';

// import { GlobalConfig } from './config/global.interface';
// import { FileConfig } from './config/files.interface';

const extensionTitle = 'stencilGenerator';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    
    const workspace = vscode.workspace;
    vscode.commands.executeCommand('setContext', 'isStencilProject', true);

    let generateComponentFilesFromCommandPalette = vscode.commands.registerCommand(`extension.generateComponentFilesFromCommandPalette`, () => {
        let configPrefix: string = extensionTitle;
        let config: Config = <Config>workspace.getConfiguration(configPrefix);
        let uri;

        // Display a dialog to the user
        let enterComponentNameDialog$ = Observable.from(
            vscode.window.showInputBox(
                { prompt: 'Please enter component name in camelCase' }
            ));


        enterComponentNameDialog$
            .concatMap(val => {
                if (val.length === 0) {
                    throw new Error('Component name can not be empty!');
                }
                let componentName = changeCase.paramCase(val);
                let componentDir = FileHelper.createComponentDir(uri, componentName, config);

                return Observable.forkJoin(
                    FileHelper.createComponent(componentDir, componentName, config),
                    FileHelper.createStyle(componentDir, componentName, config)
                );
            }
            )
            .concatMap(result => Observable.from(result))
            .filter(path => path.length > 0)
            .first()
            .concatMap(filename => Observable.from(vscode.workspace.openTextDocument(filename)))
            .concatMap(textDocument => {
                if (!textDocument) {
                    throw new Error('Could not open file!');
                };
                return Observable.from(vscode.window.showTextDocument(textDocument))
            })
            .do(editor => {
                if (!editor) {
                    throw new Error('Could not open file!')
                };
            })
            .subscribe(
                () => vscode.window.setStatusBarMessage('Component Successfuly created!', 5000),
                err => vscode.window.showErrorMessage(err.message)
            );

    });

    let generateComponentFiles = vscode.commands.registerCommand(`extension.generateComponentFiles`, (uri) => {
        // The code you place here will be executed every time your command is executed

        let configPrefix: string = extensionTitle;
        let config: Config = <Config>workspace.getConfiguration(configPrefix);

        // Display a dialog to the user
        let enterComponentNameDialog$ = Observable.from(
            vscode.window.showInputBox(
                {prompt: 'Please enter component name in camelCase'}
            ));


        enterComponentNameDialog$
            .concatMap( val => {
                    if (val.length === 0) {
                        throw new Error('Component name can not be empty!');
                    }
                    let componentName = changeCase.paramCase(val);
                    let componentDir = FileHelper.createComponentDir(uri, componentName, config);

                    return Observable.forkJoin(
                        FileHelper.createComponent(componentDir, componentName, config),
                        FileHelper.createStyle(componentDir, componentName, config)
                    );
                }
            )
            .concatMap(result => Observable.from(result))
            .filter(path => path.length > 0)
            .first()
            .concatMap(filename => Observable.from(vscode.workspace.openTextDocument(filename)))
            .concatMap(textDocument => {
                if (!textDocument) {
                    throw new Error('Could not open file!');
                };
                return Observable.from(vscode.window.showTextDocument(textDocument))
            })
            .do(editor => {
                if (!editor) {
                    throw new Error('Could not open file!')
                };
            })
            .subscribe(
                () => vscode.window.setStatusBarMessage('Component Successfuly created!', 5000),
                err => vscode.window.showErrorMessage(err.message)
            );

    });
    
    context.subscriptions.push(generateComponentFiles);
    context.subscriptions.push(generateComponentFilesFromCommandPalette);

}

// this method is called when your extension is deactivated
export function deactivate() {
}

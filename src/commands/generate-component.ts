import * as vscode from 'vscode';
import * as changeCase from 'change-case';
import { Observable } from 'rxjs';

import { FileHelper } from '../FileHelper';
import { Config } from '../config.interface';
import { extensionTitle } from '../extension';

export default function generateComponent(uri: any) {
    const workspace = vscode.workspace;

    let configPrefix: string = extensionTitle;
    let config: Config = <Config>workspace.getConfiguration(configPrefix);

    // Display a dialog to the user
    let enterComponentNameDialog$ = Observable.from(
        vscode.window.showInputBox(
            { prompt: 'Please enter the component name' }
        ))


    enterComponentNameDialog$
        .concatMap(val => {
            if (val === undefined) {
                // TODO: This probably shouldn't throw an error if undefined
                // ...the user just cancelled the action
                // BUT I can't figure out how to break the observables sequence w/o an Error
                throw new Error('Component Generator cancelled');
            } else if (val.length === 0) {
                throw new Error('Component name can not be empty!');
            }
            let componentName = changeCase.paramCase(val);
            let componentDir = FileHelper.createComponentDir(uri, componentName, config);

            return Observable.forkJoin(
                FileHelper.createComponent(componentDir, componentName, config),
                FileHelper.createStyle(componentDir, componentName, config),
                FileHelper.createTest(componentDir, componentName, config)
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
}
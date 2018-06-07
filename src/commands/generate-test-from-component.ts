import * as vscode from 'vscode';
import * as changeCase from 'change-case';
import * as path from 'path';
import { Observable } from 'rxjs';

import { extensionTitle } from '../extension';
import { FileHelper } from '../FileHelper';
import { Config } from '../config.interface';
import * as json from 'jsonic';


export default function generateTestFromComponent() {
    const workspace = vscode.workspace;
    const editor = vscode.window.activeTextEditor;
    const doc = editor.document;
    
    let configPrefix: string = extensionTitle;
    let config: Config = <Config>workspace.getConfiguration(configPrefix);
    
    if (!editor) { throw new Error('Please open a file containing a Stencil Component'); };

    const content = doc.getText();
    const ComponentDeclaration = /@Component\(\{([\s\S]*)\}\)[\s\S]export class(.*){/g;
    const componentMeta = ComponentDeclaration.exec(content);
    if (!componentMeta) {
        throw new Error('Please open a file containing a Stencil Component');
    } else {
        const componentClass = componentMeta[2].trim().replace(/extends.*/, '').trim();
        const { tag: componentSelector } = json(componentMeta[1].trim());
        let fromFilePath = doc.fileName.replace(path.extname(doc.fileName), '');


        return FileHelper.createTestFromComponent(fromFilePath, componentClass, componentSelector, config)
            .do(result => {
                if (!result.length) {
                    throw new Error(`${path.basename(fromFilePath)}.${config.test.extension} already exists`);
                }
            })
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
                () => vscode.window.setStatusBarMessage('Test successfuly created!', 5000),
                err => vscode.window.showErrorMessage(err.message)
            );;
    }
}
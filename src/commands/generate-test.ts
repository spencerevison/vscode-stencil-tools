import * as vscode from 'vscode';
import * as path from 'path';
import { Observable } from 'rxjs';

import { FileHelper } from '../FileHelper';
import * as json from 'jsonic';
import { GetConfig } from '../config/get';

import { moveCursorToDefaultPosition } from './utils';

function getComponentInfo(uri: vscode.Uri) {
    return vscode.workspace.openTextDocument(uri).then((doc) => {
        const content = doc.getText();
        const ComponentDeclaration = /@Component\(\{([\s\S]*)\}\)[\s\S]export class(.*){/g;
        
        const componentMeta = ComponentDeclaration.exec(content);
        if (!componentMeta) {
            throw new Error('This file does not appear to contain a Stencil Component');
        } else {
            let info = {
                componentClass: componentMeta[2].trim().replace(/extends.*/, '').trim(),
                componentSelector: json(componentMeta[1].trim()).tag,
                fromFilePath: doc.fileName.replace(path.extname(doc.fileName), '')
            }
            return info;
        }
    });
}

export async function GenerateTest(uri: vscode.Uri|null) {
    const config = GetConfig();

    let componentInfo;
    if (uri) {
        try {
            componentInfo = await getComponentInfo(uri);
        } catch (e) {
            vscode.window.showErrorMessage(e.message)
        }
    } else {
        try {
            componentInfo = await getComponentInfo(vscode.window.activeTextEditor.document.uri);
        } catch (e) {
            vscode.window.showErrorMessage(e.message)
        }
    }
    const { fromFilePath, componentClass, componentSelector } = componentInfo;

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
            } else {
                moveCursorToDefaultPosition(editor);
            }
        })
        .subscribe(
            () => vscode.window.setStatusBarMessage('Test successfuly created!', 5000),
            err => vscode.window.showErrorMessage(err.message)
        );
}
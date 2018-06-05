import * as vscode from 'vscode';
import * as changeCase from 'change-case';
import { Observable } from 'rxjs';

import { FileHelper } from '../FileHelper';
import { Config } from '../config.interface';

export default function generateTestFromComponent() {
    const workspace = vscode.workspace;
    const extensionTitle = 'stencilGenerator';

    let configPrefix: string = extensionTitle;
    let config: Config = <Config>workspace.getConfiguration(configPrefix);

    let componentDir = '';
    let componentName = '';

    Observable.of(FileHelper.createTest(componentDir, componentName, config))
}
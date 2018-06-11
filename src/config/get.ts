import * as vscode from 'vscode';
import { extensionTitle } from '../extension';

import { Config } from './interface';

export function GetConfig() {
    let configPrefix: string = extensionTitle;
    let config = <Config>vscode.workspace.getConfiguration(configPrefix);

    return config;

    // config.component.extension = removeLeading(config.test.extension, '.');
    // config.test.extension = removeLeading(config.test.extension, '.');
    // if (config.component.prefix) { config.component.prefix = removeTrailing(config.component.prefix, '-'); } 

    // return config;
}
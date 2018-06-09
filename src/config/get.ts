import * as vscode from 'vscode';
import { extensionTitle } from '../extension';

import { Config } from './interface';

function removeLeading(str: string, chars: string): string {
    if (str.startsWith(chars)) { return str.slice(chars.length) }
    else { return str; }
}
function removeTrailing(str: string, chars: string): string {
    if (str.endsWith(chars)) { return str.slice(0, -1 * chars.length) }
    else { return str; }
}

export function GetConfig() {
    let configPrefix: string = extensionTitle;
    let config = <Config>vscode.workspace.getConfiguration(configPrefix);

    return config;

    // config.component.extension = removeLeading(config.test.extension, '.');
    // config.test.extension = removeLeading(config.test.extension, '.');
    // if (config.component.prefix) { config.component.prefix = removeTrailing(config.component.prefix, '-'); } 

    // return config;
}
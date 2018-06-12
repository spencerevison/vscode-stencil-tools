import * as vscode from 'vscode';
import * as os from 'os';

import { GetConfig } from '../../config/get';


export function getDefaultUri() {
    let defaultProjectDirectory: string = GetConfig().get('newProjectDirectory') || os.homedir();
    defaultProjectDirectory = defaultProjectDirectory.replace(/^~/, os.homedir());
    
    return vscode.Uri.file(defaultProjectDirectory);
}

export function getWorkspaceUri(workspaceFolders: vscode.WorkspaceFolder[]) {
    let workspaceUri;
    if (!workspaceFolders) {
        workspaceUri = getDefaultUri();
    } else {
        if (!workspaceFolders[0]) {
            workspaceUri = getDefaultUri();
        } else {
            workspaceUri = workspaceFolders[0].uri;
        }
    }
    return workspaceUri;
}
os.homedir()
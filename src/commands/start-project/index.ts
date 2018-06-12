import * as vscode from 'vscode';
import * as promisify from 'util.promisify';
import * as fs from 'fs';
import * as pathUtil from 'path';

import { STARTERS, getStarterRepo, getStarterDocs } from './starters';
import { createApp } from './create-app';
import { getWorkspaceUri } from './utils';
import { onStartedProjectOpen } from './on-started-project-open';

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

export async function StartProject() {
    const opts: vscode.QuickPickOptions = { matchOnDescription: true, placeHolder: 'Please choose a Stencil Starter' };
    const items: vscode.QuickPickItem[] = STARTERS.map(s => ({
        label: s.name,
        description: s.description
    }));
    const selected = await vscode.window.showQuickPick(items, opts);

    if (!selected) {
        cancelCommand();
    } else {
        const repo = getStarterRepo(selected.label);
        const docs = getStarterDocs(selected.label);
        const cloneUri = await OpenDialog();
        if (cloneUri) {
            const emptyDir = await checkIfEmptyDir(cloneUri);
            const currentDir = await checkIfCurrentDir(cloneUri);
            if (!emptyDir) {
                vscode.window.showErrorMessage(`Cannot Start a New Project – Please select an empty directory`);
            } else {
                const progressOpts: vscode.ProgressOptions = {
                    location: vscode.ProgressLocation.Notification,
                    title: 'Starting your new Stencil Project...'
                }
                const newUri = await vscode.window.withProgress(progressOpts, (p) => createApp(p, repo, cloneUri, docs));
                if (newUri) {
                    const items = [];
                    const addToWorkspace = 'Add to Workspace';
                    const openProject = 'Open Project';
                    if (!currentDir) {
                        items.push(addToWorkspace, openProject);
                        
                        const action = await vscode.window.showInformationMessage(`Your new Stencil Project has been created! 🎉`, ...items);
                        if (action) {
                            switch (action) {
                                case openProject:
                                    vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(newUri));
                                    break;
                                case addToWorkspace:
                                    const start = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders.length : 0;
                                    vscode.workspace.updateWorkspaceFolders(start, 0, { uri: vscode.Uri.file(newUri) });
                                    break;
                            }
                        }
                    } else {
                        onStartedProjectOpen([vscode.Uri.file(pathUtil.join(newUri, '.stencilTools'))]);
                    }
                }
            }
        } else {
            cancelCommand();
        }
    }
}

async function OpenDialog() {
    let defaultUri = getWorkspaceUri(vscode.workspace.workspaceFolders);
    const opts: vscode.OpenDialogOptions = {
        defaultUri,
        openLabel: 'Start Project',
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false
    };

    return vscode.window.showOpenDialog(opts).then(res => res ? res[0].fsPath : '');
}

async function checkIfEmptyDir(path: string) {
    const status: fs.Stats = await stat(path);
    const isDir = status.isDirectory();
    const isEmpty = await readdir(path);

    return isDir && !isEmpty.length;
}   

async function checkIfCurrentDir(path: string) {
    if (vscode.workspace.workspaceFolders) {
        const current = vscode.workspace.workspaceFolders[0].uri.fsPath;
        return path === current;
    } else {
        return false;
    }
}

function cancelCommand() {
    vscode.window.setStatusBarMessage('Stencil: Start New Project cancelled', 5000);
}
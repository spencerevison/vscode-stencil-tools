import * as vscode from 'vscode';
import * as promisify from 'util.promisify';
import * as fs from 'fs';
import * as path from 'path';
const unlink = promisify(fs.unlink);
const readFile = promisify(fs.readFile);

import { installPackages, cdIntoNewApp } from './create-app';

export async function onStartedProjectOpen(uris: vscode.Uri[]) {
    const uri = uris[0];
    const dir = path.join(uri.fsPath, '../');
    const docsUrl = await readFile(uri.fsPath);
    await unlink(uri.fsPath);

    const progressOpts: vscode.ProgressOptions = {
        title: 'New Stencil Project',
        location: vscode.ProgressLocation.Notification
    }
    try {
        await vscode.window.withProgress(progressOpts, (p) => installNewPackages(dir, p));
    } catch (e) {
        vscode.window.showErrorMessage(e);
    }

    const items = [];
    const openDocs = 'Open Starter Docs';
    const updateInfo = 'Update package.json';
    items.push(openDocs, updateInfo);
    const action = await vscode.window.showInformationMessage('Welcome to your new Stencil Project! ✨', ...items);

    switch (action) {
        case openDocs:
            vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(docsUrl));
            break;
        case updateInfo:
            const pkg = path.join(uri.fsPath, '../', 'package.json');
            vscode.workspace.openTextDocument(pkg).then(doc => vscode.window.showTextDocument(doc));
            break;
    }
}

async function installNewPackages(path, p: vscode.Progress<{ message: string }>) {
    await cdIntoNewApp(path);
    p.report({ message: `Installing packages... 📦 ` });
    await installPackages();
    return;
}
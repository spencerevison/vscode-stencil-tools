import * as vscode from 'vscode';

export enum DOCS {
    INDEX = 'https://stenciljs.com/docs/'
}

export default function openDocs() {
    vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(DOCS.INDEX));
}
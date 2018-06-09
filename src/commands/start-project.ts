import * as vscode from 'vscode';

export enum STENCIL_STARTER {
    COMPONENT = 'https://github.com/ionic-team/stencil-component-starter',
    APP = 'https://github.com/ionic-team/stencil-app-starter'
}

export function StartProject(repo: STENCIL_STARTER) {
    vscode.commands.executeCommand('git.clone', repo).then((res) => {
        console.log('CLONED!', res);
    });
}
import * as vscode from 'vscode';
import { extensionTitle } from '../extension';
import {
    OpenDocs,
    StartProject, STENCIL_STARTER,
    GenerateComponent,
    GenerateTest
} from './index';


export default function registerCommands(context: vscode.ExtensionContext) {
    const commands = new Map([
        ['openDocs', () => OpenDocs()],
        ['startProjectComponent', () => StartProject(STENCIL_STARTER.COMPONENT)],
        ['startProjectApp', () => StartProject(STENCIL_STARTER.APP)],
        ['generateComponent', () => GenerateComponent(null)],
        ['generateComponentFromExplorer', (uri) => GenerateComponent(uri)],
        ['generateTest', () => GenerateTest(null)],
        ['generateTestFromExplorer', (uri) => GenerateTest(uri)],
    ])

    commands.forEach((action, command) => {
        let disposable = vscode.commands.registerCommand(`extension.${extensionTitle}.${command}`, action);
        context.subscriptions.push(disposable);
    })
}
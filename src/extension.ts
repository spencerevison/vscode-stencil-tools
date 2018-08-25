'use strict';

import * as vscode from 'vscode';
import * as path from 'path';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient';
import registerCommands from './commands/_register';
import { onStartedProjectOpen } from './commands/start-project/on-started-project-open';

export const extensionTitle = 'stencilTools';
let registered = {
    typescriptreact: false,
    typescript: false
}
let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
    
    registerCommands(context);
    doCheckWorkspace(context);

    vscode.workspace.onDidChangeWorkspaceFolders((e) => {
        if (e.added) { doCheckWorkspace(context); }
    })
    
    if (vscode.window.activeTextEditor) {
        const doc = vscode.window.activeTextEditor.document;
    }
}

function doCheckWorkspace(context: vscode.ExtensionContext) {
    vscode.workspace.findFiles('**/stencil.config.{ts,js}').then((uri) => {
        if (uri) {
            vscode.commands.executeCommand('setContext', 'isStencilProject', true);
            attachLanguageServer(context);
        }
    });

    vscode.workspace.findFiles('**/.stencilTools').then((uri) => {
        if (uri) { onStartedProjectOpen(uri); }
    });
}

function attachLanguageServer(context: vscode.ExtensionContext) {
    let serverModule = context.asAbsolutePath(path.join('node_modules', 'stencil-languageserver', 'dist', 'main.js'));
    // The debug options for the server
	let debugOptions = { execArgv: ["--inspect=6009"] };

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	let serverOptions: ServerOptions = {
		run : { module: serverModule, transport: TransportKind.ipc },
		debug: { module: serverModule, transport: TransportKind.ipc, options: debugOptions }
	}

	// Options to control the language client
	let clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'typescriptreact'}],
		synchronize: {
			fileEvents: [
                vscode.workspace.createFileSystemWatcher('**/stencil.config.{ts,js}'),
				vscode.workspace.createFileSystemWatcher('**/*.tsx')
			]
		}
	}

	// Create the language client and start the client.
	client = new LanguageClient('stencilLanguageServer', 'Stencil Language Server', serverOptions, clientOptions);

	// Start the client. This will also launch the server
	client.start();

	async function logFiles() {
		console.log(await vscode.workspace.findFiles('**/*'));
	}
	
	client.onReady().then(() => {
		client.onRequest('workspace/xfiles', async () => {
			console.log('Recieved workspace/xfiles request');
			const params = { base: vscode.workspace.workspaceFolders[0].uri.fsPath };
			const files = await vscode.workspace.findFiles(`${params.base}/**/*`);
			return files;
		})
	})
}

export function deactivate() {
}

import * as vscode from 'vscode';
import { COMPONENT_SNIPPETS } from './index';
import { Snippet } from './interface';
import { GetConfig } from '../config/get';

// import * as path from 'path';

import GetAutoImportEdits from '../auto-import';

function createSnippet(snippet: Snippet, language: 'tsx'|'ts'): vscode.CompletionItem {
    let item: vscode.CompletionItem = new vscode.CompletionItem(snippet.name, vscode.CompletionItemKind.Snippet);
    item.detail = snippet.description;
    if (Array.isArray(snippet.body)) { snippet.body = snippet.body.join('\n'); }
    item.documentation = new vscode.MarkdownString(`\`\`\`${language}\n${Array.isArray(snippet.preview) ? snippet.preview.join('\n') : snippet.preview}\n\`\`\``);
    item.insertText = new vscode.SnippetString(snippet.body);
    return item;
}

export default function registerSnippets() {
    const config = GetConfig();
    if (!config.snippet.enabled) { return; }

    let autoImports = new Map();
    const componentSnippets: vscode.CompletionItem[] = COMPONENT_SNIPPETS.map(snippet => {
        snippet.name = `${config.snippet.prefix}-${snippet.name}`;
        if (snippet.autoImport) { autoImports.set(snippet.name, snippet.autoImport); }

        return createSnippet(snippet, 'tsx');
    })
    // const testSnippets: vscode.CompletionItem[] = TEST_SNIPPETS.map(snippet => {
    //     snippet.name = `${config.snippet.prefix}-${snippet.name}`;
    //     return createSnippet(snippet, 'ts');
    // })

    vscode.languages.registerCompletionItemProvider('typescriptreact', {
        provideCompletionItems: (document: vscode.TextDocument, position: vscode.Position) => {
            const items = [];
            componentSnippets.forEach(snippet => {
                if (autoImports.has(snippet.label)) {
                    snippet.additionalTextEdits = [...GetAutoImportEdits(document, autoImports.get(snippet.label))]
                }
                items.push(snippet);
            })
            return items;
        }
    })
    // vscode.languages.registerCompletionItemProvider('typescript', {
    //     provideCompletionItems: (document: vscode.TextDocument, position: vscode.Position) => {
    //         if (path.basename(document.uri.fsPath).endsWith(config.test.extension)) {
    //             return [...testSnippets];
    //         }
    //     }
    // })
}
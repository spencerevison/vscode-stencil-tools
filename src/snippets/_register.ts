import * as vscode from 'vscode';
import Snippets from './index';
import { Snippet } from './interface';
import { GetConfig } from '../config/get';

import GetAutoImportEdits from '../auto-import';
import { isInsideComponent } from './utils';

function createSnippet(snippet: Snippet): vscode.CompletionItem {
    let item: vscode.CompletionItem = new vscode.CompletionItem(snippet.name, vscode.CompletionItemKind.Snippet);
    item.detail = snippet.description;
    if (Array.isArray(snippet.body)) { snippet.body = snippet.body.join('\n'); }
    item.documentation = new vscode.MarkdownString(`\`\`\`tsx\n${Array.isArray(snippet.preview) ? snippet.preview.join('\n') : snippet.preview}\n\`\`\``);
    item.insertText = new vscode.SnippetString(snippet.body);
    return item;
}

export default function registerSnippets(context: vscode.ExtensionContext) {
    const config = GetConfig();
    if (!config.snippet.enabled) { return; }

    let autoImports = new Map();
    const snippets: vscode.CompletionItem[] = Snippets.map(snippet => {
        snippet.name = `${config.snippet.prefix}-${snippet.name}`;
        if (snippet.autoImport) { autoImports.set(snippet.name, snippet.autoImport); }

        return createSnippet(snippet);
    })

    vscode.languages.registerCompletionItemProvider('typescriptreact', {
        provideCompletionItems: (document: vscode.TextDocument, position: vscode.Position) => {
            const items = [];
            if (isInsideComponent(document, position)) {
                snippets.forEach(snippet => {
                    if (autoImports.has(snippet.label)) {
                        snippet.additionalTextEdits = [...GetAutoImportEdits(document, autoImports.get(snippet.label))]
                    }
                    items.push(snippet);
                })
            }
            return items;
        }
    })
}
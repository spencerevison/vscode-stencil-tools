import * as vscode from 'vscode';
import { COMPONENT_SNIPPETS } from './index';
import { Snippet } from './interface';
import { GetConfig } from '../config/get';
import { removeTrailing } from '../config/utils';

import { flatten } from './utils';

import GetAutoImportEdits from '../auto-import';
import { Config } from '../config/interface';

function createSnippet(snippet: Snippet, language: 'tsx'|'ts'): vscode.CompletionItem {
    let item: vscode.CompletionItem = new vscode.CompletionItem(snippet.name, vscode.CompletionItemKind.Snippet);
    item.detail = snippet.title ? snippet.title : flatten(snippet.description);
    snippet.body = flatten(snippet.body);
    item.documentation = snippet.title
        ? new vscode.MarkdownString(flatten(snippet.description))
        : new vscode.MarkdownString(`\`\`\`${language}\n${flatten(snippet.preview)}\n\`\`\``);
    item.insertText = new vscode.SnippetString(snippet.body);
    
    // Force component lifecycle events to the bottom of the completion list
    if (/component/g.test(snippet.name)) {
        item.sortText = snippet.name.replace('-', '-z-');
    }

    return item;
}

export default function registerSnippets(type: 'typescriptreact' | 'typescript') {
    const config = GetConfig();

    if (type === 'typescriptreact') {
        registerSnippetsTypescriptReact(config);
    } else if (type === 'typescript') {
        registerSnippetsTypescript(config);
    }
}

function registerSnippetsTypescriptReact(config: Config) {
    if (!config.snippet.enabled) { return; }

    let autoImports = new Map();
    const componentSnippets: vscode.CompletionItem[] = COMPONENT_SNIPPETS.map(snippet => {
        snippet.name = `${removeTrailing(config.snippet.prefix, '-')}-${snippet.name}`;
        if (snippet.autoImport) { autoImports.set(snippet.name, snippet.autoImport); }

        return createSnippet(snippet, 'tsx');
    })

    vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'typescriptreact' }, {
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
}

function registerSnippetsTypescript(config: Config) {
    if (!config.snippet.enabled) { return; }
}
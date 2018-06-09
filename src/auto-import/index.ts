import * as vscode from 'vscode';
import { getStencilImportLine, getStencilImportList, getAutoImportRange } from './utils';

export default function getAutoImportEdits(document: vscode.TextDocument, insertText: string): vscode.TextEdit[] {
    console.log(`AutoImport for ${insertText}`)
    const edits = [];
    const line = getStencilImportLine(document);
    const imports = getStencilImportList(line);
    if (imports) {
        if (imports.findIndex(item => item === insertText) === -1) {
            imports.push(insertText)
            const edit = new vscode.TextEdit(getAutoImportRange(line), ` ${imports.join(', ')} `)
            edits.push(edit)
        }
    }
    return edits;
}
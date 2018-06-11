import * as vscode from 'vscode';
import { GetConfig } from '../config/get';
import { getStencilImportLine, getStencilImportList, getAutoImportRange, alphabetizeImports } from './utils';

export default function getAutoImportEdits(document: vscode.TextDocument, insertText: string): vscode.TextEdit[] {
    const alphabetize = GetConfig().component.alphabetizeImports;
    const edits = [];
    const line = getStencilImportLine(document);
    const imports = getStencilImportList(line);
    if (imports) {
        if (imports.findIndex(item => item === insertText) === -1) {
            imports.push(insertText)
            const importList = alphabetize ? alphabetizeImports(imports) : imports;
            const edit = new vscode.TextEdit(getAutoImportRange(line), ` ${importList.join(', ')} `)
            edits.push(edit)
        }
    }
    return edits;
}
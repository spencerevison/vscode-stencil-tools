import * as vscode from 'vscode';

export function isStencilImport(text: string) {
    const PATTERN = /from (['"])@stencil\/core\1;?\s*$/g;
    return PATTERN.test(text)
}

export function getStencilImportLine(document: vscode.TextDocument) {
    let textLine: vscode.TextLine;
    for (let i = 0; i < document.lineCount + 1 && !textLine; i++) {
        const ln = document.lineAt(i);
        if (isStencilImport(ln.text)) {
            textLine = ln;
        }
    }
    return textLine;
}

export function getStencilImportList(line: vscode.TextLine): string[] | undefined {
    const imports = /\{(.*)\}/g;
    const match = imports.exec(line.text);
    if (match) {
        return match[1].split(',').map(text => text.trim()).filter(text => text);
    }
}

export function getAutoImportRange(line: vscode.TextLine): vscode.Range {
    const start = new vscode.Position(line.lineNumber, line.text.indexOf('{') + 1);
    const end = new vscode.Position(line.lineNumber, line.text.indexOf('}'));
    return new vscode.Range(start, end);
}

export function alphabetizeImports(imports: string[]) {
    const mapped = imports.map((value, index) => {
        return { index, value: value.toLowerCase() }
    }).sort((a, b) => {
        if (a.value > b.value) { return 1; }
        if (a.value < b.value) { return -1; }
        return 0;
    });
    
    return mapped.map((el) => imports[el.index]);
}
import { Config } from './config/interface';
import { removeLeading, removeTrailing } from './config/utils';
import * as vscode from 'vscode';
import * as fse from 'fs-extra';
import * as fs from 'fs';
import * as path from 'path';
import * as changeCase from 'change-case';
import { alphabetizeImports } from './auto-import/utils';
import { Observable } from 'rxjs';

export class FileHelper {
    private static createFile = <(file: string, data: string) => Observable<{}>>Observable.bindNodeCallback(fse.outputFile);
    private static assetRootDir: string = path.join(__dirname, '../../assets');

    private static getFilename(componentDir: string, componentName: string, config: Config, type: 'component' | 'style' | 'test') {
        return `${componentDir}/${componentName}.${removeLeading(config[type].extension, '.')}`;
    }

    public static createComponent(componentDir: string, componentName: string, config: Config): Observable<string> {
        let templateFileName = this.assetRootDir + '/templates/component.template';
        if (config.component.template) {
            templateFileName = this.resolveWorkspaceRoot(config.component.template);
        }

        let componentContent = fs.readFileSync(templateFileName).toString()
            .replace(/{defaultImports}/g, this.getDefaultImports(config))
            .replace(/{selector}/g, this.getSelector(componentName, config))
            .replace(/{styleUrl}/g, `${componentName}.${config.style.extension}`)
            .replace(/{className}/g, changeCase.pascalCase(componentName))
            .replace(/{shadow}/g, this.getShadow(config))
            .replace(/{quotes}/g, this.getQuotes(config));

        let filename = this.getFilename(componentDir, componentName, config, 'component');

        if (config.component.create) {
            return this.createFile(filename, componentContent)
                .map(result => filename);
        }
        else {
            return Observable.of('');
        }
    };

    public static createStyle(componentDir: string, componentName: string, config: Config): Observable<string> {
        const { style } = config;
        let templateFileName = this.assetRootDir + '/templates/style.template';
        if (style.template) {
            templateFileName = this.resolveWorkspaceRoot(style.template);
        }

        let block = this.getBlockOpenAndClose(config);
        let styleContent = fs.readFileSync(templateFileName).toString()
            .replace(/{styleSelector}/g, this.getStyleSelector(componentName, config))
            .replace(/{blockOpen}/g, block.open)
            .replace(/{blockClose}/g, block.close);


        let filename = this.getFilename(componentDir, componentName, config, 'style');

        if (style.create) {
            return this.createFile(filename, styleContent)
                .map(result => filename);
        }
        else {
            return Observable.of('');
        }
    };

    public static createComponentDir(uri: any, componentName: string, config: Config): string {
        let contextMenuSourcePath;

        if (uri && fs.lstatSync(uri.fsPath).isDirectory()) {
            contextMenuSourcePath = uri.fsPath;
        } else if (uri) {
            contextMenuSourcePath = path.dirname(uri.fsPath);
        } else {
            contextMenuSourcePath = path.join(vscode.workspace.rootPath, path.normalize(config.componentsDirectory));
        }

        let componentDir = `${contextMenuSourcePath}`;
        if (config.generateFolder) {
            componentDir = `${contextMenuSourcePath}/${componentName}`;
            fse.mkdirsSync(componentDir);
        }

        return componentDir;
    }

    public static createTest(componentDir: string, componentName: string, config: Config) {
        let templateFileName = this.assetRootDir + '/templates/component.e2e.template';

        let testContent = fs.readFileSync(templateFileName).toString()
            .replace(/{fileName}/g, componentName)
            .replace(/{selector}/g, this.getSelector(componentName, config))
            .replace(/{quotes}/g, this.getQuotes(config));

        let filename = this.getFilename(componentDir, componentName, config, 'test');

        if (config.test.create) {
            return this.createFile(filename, testContent)
                .map(result => filename);
        }
        else {
            return Observable.of('');
        }
    }

    public static createTestFromComponent(fromFilePath: string, componentClass: string, componentSelector: string, config: Config) {
        let templateFileName = this.assetRootDir + '/templates/component.e2e.template';
        let fileImport = `${path.basename(fromFilePath)}`;

        let testContent = fs.readFileSync(templateFileName).toString()
            .replace(/{fileName}/g, fileImport)
            .replace(/{selector}/g, componentSelector)
            .replace(/{quotes}/g, this.getQuotes(config));

        let filename = `${fromFilePath}.${removeLeading(config.test.extension, '.')}`;
        try {
            if (fs.lstatSync(filename).isFile()) {
                return Observable.of('');
            }
        } catch(e) {
            return this.createFile(filename, testContent)
                .map(result => filename);
        }
    }


    public static resolveWorkspaceRoot(path: string): string {
        return path.replace('${workspaceRoot}', vscode.workspace.rootPath);
    }

    private static getSelector(componentName: string, config: Config) {
        let prefix = config.component.prefix;
        if (prefix) {
            prefix = removeTrailing(prefix, '-');
            return `${prefix}-${changeCase.paramCase(componentName)}`;
        } else {
            return changeCase.paramCase(componentName);
        }
    }

    private static getShadow(config: Config) {
        return config.component.shadow ? ',\n    shadow: true' : ''
    }

    private static getDefaultImports(config: Config) {
        const imports = config.component.defaultImports;
        if (imports === false) {
            return '';
        } else {
            const alphabetize = config.component.alphabetizeImports;
            const importList = alphabetize ? alphabetizeImports(imports) : imports;
            return importList.join(", ");
        }
    }

    private static getInterface(selector: string) {
        return `HTML${changeCase.pascal(selector)}Element`;
    }

    private static getBlockOpenAndClose(config: Config): { open: string, close: string } {
        return config.style.extension === 'sass' ? { open: '', close: ''} : { open: ' {', close: '}'}
    }
    
    private static getStyleSelector(componentName: string, config: Config) {
        return config.component.shadow ? ':host' : this.getSelector(componentName, config);
    }

    private static getQuotes(config: Config) {
        return config.quotes === "double" ? '"' : '\'';
    }

}

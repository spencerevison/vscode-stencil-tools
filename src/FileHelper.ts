import { StyleConfig } from './config/types/style-config.interface';
import { FileConfig } from './config/files.interface';
import { GlobalConfig } from './config/global.interface';
import { Config } from './config.interface';
import * as vscode from 'vscode';
import * as fse from 'fs-extra';
import * as fs from 'fs';
import * as path from 'path';
import * as changeCase from 'change-case';
import { Observable } from 'rxjs';
import { ADDRCONFIG } from 'dns';
import { ComponentConfig } from './config/types/component-config.interface';

export class FileHelper {
    private static createFile = <(file: string, data: string) => Observable<{}>>Observable.bindNodeCallback(fse.outputFile);
    private static assetRootDir: string = path.join(__dirname, '../../assets');

    public static createComponent(componentDir: string, componentName: string, globalConfig: GlobalConfig, config: FileConfig): Observable<string> {
        let templateFileName = this.assetRootDir + '/templates/component.template';
        if (config.component.template) {
            templateFileName = this.resolveWorkspaceRoot(config.component.template);
        }

        let componentContent = fs.readFileSync( templateFileName ).toString()
            .replace(/{selector}/g, this.getSelector(componentName))
            .replace(/{styleUrl}/g, `${componentName}.${config.style.extension}`)
            .replace(/{className}/g, changeCase.pascalCase(componentName))
            .replace(/{shadow}/g, this.getShadow(config))
            .replace(/{quotes}/g, this.getQuotes(globalConfig));

        let filename = `${componentDir}/${componentName}.${config.component.extension}`;

        if (config.component.create) {
            return this.createFile(filename, componentContent)
                .map(result => filename);
        }
        else {
            return Observable.of('');
        }
    };

    public static createStyle(componentDir: string, componentName: string, config: FileConfig): Observable<string> {
        const { style } = config;
        let templateFileName = this.assetRootDir + '/templates/style.template';
        if (style.template) {
            templateFileName = this.resolveWorkspaceRoot(style.template);
        }

        let styleContent = fs.readFileSync(templateFileName).toString()
            .replace(/{styleSelector}/g, this.getStyleSelector(componentName, config));


        let filename = `${componentDir}/${componentName}.${style.extension}`;
        if (style.create) {
            return this.createFile(filename, styleContent)
                .map(result => filename);
        }
        else {
            return Observable.of('');
        }
    };

    public static createComponentDir(uri: any, componentName: string, globalConfig: GlobalConfig): string {
        let contextMenuSourcePath;

        if (uri && fs.lstatSync(uri.fsPath).isDirectory()) {
            contextMenuSourcePath = uri.fsPath;
        } else if (uri) {
            contextMenuSourcePath = path.dirname(uri.fsPath);
        } else {
            contextMenuSourcePath = vscode.workspace.rootPath;
        }

        let componentDir = `${contextMenuSourcePath}`;
        if(globalConfig.generateFolder) {
            componentDir = `${contextMenuSourcePath}/${componentName}`;
            fse.mkdirsSync(componentDir);
        }

        return componentDir;
    }

    public static getDefaultConfig(): any {
        let content = fs.readFileSync( this.assetRootDir + '/config/config.json' ).toString();
        content = content.replace(/\${workspaceRoot}/g, vscode.workspace.rootPath);
        return JSON.parse(content);
    }

    public static resolveWorkspaceRoot(path: string): string {
        return path.replace('${workspaceRoot}', vscode.workspace.rootPath);
    }

    private static getSelector(componentName: string) {
        return changeCase.paramCase(componentName);
    }

    private static getShadow(config: FileConfig) {
        return config.component.shadow ? ',\n    shadow: true' : ''
    }
    
    private static getStyleSelector(componentName: string, config: FileConfig) {
        return config.component.shadow ? ':root' : this.getSelector(componentName);
    }

    private static getQuotes(config: GlobalConfig) {
        return config.quotes === "double" ? '"' : '\'';
    }

}

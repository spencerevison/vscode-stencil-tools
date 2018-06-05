import { WorkspaceConfiguration } from 'vscode';

export interface ComponentConfig extends WorkspaceConfiguration {
    create?: boolean,
    extension?: string,
    prefix?: string,
    shadow?: boolean
}
export interface StyleConfig extends WorkspaceConfiguration {
    create?: boolean,
    extension?: string
};

export interface Config extends WorkspaceConfiguration {
    quotes?: 'single' | 'double',
    generateFolder?: boolean,
    componentsDirectory?: string,
    component: ComponentConfig,
    style: StyleConfig
}
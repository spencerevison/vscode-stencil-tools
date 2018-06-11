import { WorkspaceConfiguration } from 'vscode';

export interface ComponentConfig extends WorkspaceConfiguration {
    create?: boolean,
    extension?: string,
    prefix?: string,
    shadow?: boolean,
    defaultImports?: string[] | false;
    alphabetizeImports?: boolean;
}
export interface StyleConfig extends WorkspaceConfiguration {
    create?: boolean,
    extension?: string
};
export interface TestConfig extends WorkspaceConfiguration {
    create?: boolean,
    extension?: string
};
export interface SnippetConfig extends WorkspaceConfiguration {
    enabled?: boolean,
    prefix?: string
};


export interface Config extends WorkspaceConfiguration {
    quotes?: 'single' | 'double',
    generateFolder?: boolean,
    componentsDirectory?: string,
    newProjectDirectory?: '',
    snippet: SnippetConfig,
    component: ComponentConfig,
    style: StyleConfig,
    test: TestConfig
}
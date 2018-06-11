export interface Snippet {
    name: string;
    description: string|string[];
    body: string | string[];
    preview?: string | string[];
    autoImport?: string;
    title?: string;
}
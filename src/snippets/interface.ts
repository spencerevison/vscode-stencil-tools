export interface Snippet {
    name: string;
    description: string;
    body: string | string[];
    preview?: string | string[];
    autoImport?: string;
}
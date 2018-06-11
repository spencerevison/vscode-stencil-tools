export function flatten(value: string | string[]) {
    return Array.isArray(value) ? value.join('\n') : value;
}
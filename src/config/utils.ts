export function removeLeading(str: string, chars: string): string {
    if (str.startsWith(chars)) { return str.slice(chars.length) }
    else { return str; }
}

export function removeTrailing(str: string, chars: string): string {
    if (str.endsWith(chars)) { return str.slice(0, -1 * chars.length) }
    else { return str; }
}
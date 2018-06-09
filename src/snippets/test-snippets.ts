import { Snippet } from "./interface";

export const TEST_SNIPPETS: Snippet[] = [
    {
        name: 'it basic',
        description: '',
        body: [
            "it('should work ${1:description}', () => {",
            "\t$0",
            "\texpect(${2:element.textContent.trim()}).toEqual('${3:value}');",
            "});"
        ],
        preview: [
            "it('should description', () => {",
            "\texpect(element.textContent.trim()).toEqual('value');",
            "});"
        ],
    },
    {
        name: 'it prop',
        description: '',
        body: [
            "it('should work with ${1:propName}', async () => {",
            "\telement.${2:${1}} = ${3:'value'};$0",
            "\tawait testWindow.flush();",
            "\texpect(${4:element.textContent.trim()}).toEqual('${5:value}');",
            "});"
        ],
        preview: [
            "it('should description', () => {",
            "\texpect(element.textContent.trim()).toEqual('value');",
            "});"
        ],
    },
    {
        name: 'prop',
        description: '',
        body: [
            "it('should work with ${1:propName}', async () => {",
                "\telement.${1} = ${2:'value'};",
                "\tawait testWindow.flush();",
                "\texpect(element.textContent.trim()).toEqual('Hello, World! I\'m Peter');",
            "});",
        ],
        preview: "await testWindow.flush();"
    },
    {
        name: 'flush',
        description: '',
        body: "await testWindow.flush();",
        preview: "await testWindow.flush();"
    }
 ];
<!-- [![Version](http://vsmarketplacebadge.apphb.com/version/dbaikov.vscode-angular2-component-generator.svg)](https://marketplace.visualstudio.com/items?itemName=dbaikov.vscode-angular2-component-generator) [![Installs](http://vsmarketplacebadge.apphb.com/installs/dbaikov.vscode-angular2-component-generator.svg)](https://marketplace.visualstudio.com/items?itemName=dbaikov.vscode-angular2-component-generator) -->
# Stencil Tools 
Extension for VS Code

![New Component](./assets/tutorial/new-component.gif)

## Description
This that makes working with [Stencil](https://stenciljs.com/) projects a breeze. 
### Features
- Automatically creates Stencil components (`component.tsx`, `component.spec.tsx`, `component.css`)
- Configurable component templates – see [#Configuration](#configuration)
    - Add a custom prefix to generated component tags
    - Easily toggle on/off @Component({ shadow: true })
    - Change the extension of any generated file
        - For example, `css` => `scss` or `sass` or `spec.tsx` => `test.tsx`
- Easily start a new Stencil project from the Command Palette via Git
- Quickly open the Stencil Docs in your browser

## Usage

### Generate a Component
![New Component](./assets/tutorial/new-component.gif)
- From the File Explorer
    - Right click on a file or folder
    - Select "Generate Stencil Component"
    - Enter your component name in the prompt
- From the Command Palette
    - Select "> Stencil: New Component"
    - Enter your component name in the prompt

### Generate a Component with a Prefix
Easy to configure! See [#Configuration](#configuration)
![New Component with Prefix](./assets/tutorial/component-prefix.gif)
- Open Workspace or User Settings
- Set "stencilGenerator.component.prefix" to "your-prefix"
- Generate your component as usual

### Generate a Test from a Component
![New Test](./assets/tutorial/new-test.gif)
- From the Command Palette, when a Component is open
    - Select "> Stencil: New Test for Component"

### Start a Stencil Project
![Start a Project](./assets/tutorial/start-project.gif)
- From the Command Palette
    - Select "> Stencil: Start Project - App" or "> Stencil: Start Project - Component"
    - Select a Repository Location - this is where your Stencil Starter will be cloned
    - Open the new repository or add it to your workspace
    - run `git remote rm origin` and `npm install` as outlined [in the docs](https://stenciljs.com/docs/getting-started)

### Open the Stencil Docs
![Open Docs](./assets/tutorial/open-docs.gif)
- From the Command Palette
    - Select "> Stencil: Open Docs"


## Configuration
| Property                          | Default Value         | Description                                                                                                       |
|---------------------------------- |---------------------- |------------------------------------------------------------------------------------------------------------------ |
stencilTools.quotes                 | "single"              | Defines the quote style ("single" or "double") used in all templates                                              |
stencilTools.generateFolder         | true                  | Determines whether component files are generated within their own folder (true) or outside of a folder (false)    |
stencilTools.componentsDirectory    | "./src/components"    | Determines the directory where components generated from the Command Palette are placed                           |
stencilTools.component.create       | true                  | Determines if a component file should be created when a new component is generated                                |
stencilTools.component.extension    | "tsx"                 | The extension of a component file (no leading period)                                                             |
stencilTools.component.imports      | false                 | A list of additional imports from '@stencil/core' to be included when a component is generated                    |
stencilTools.component.prefix       | false                 | Prepends a given prefix to the selector for generated components. Best practice is to use a unique selector, unrelated to "stencil". See the [Stencil Docs](https://stenciljs.com/docs/style-guide#prefix)    |
stencilTools.component.shadow       | false                 | Determines whether generated components should be created with ShadowDOM support. Also changes the selector in Style from Scoped CSS to :host |
stencilTools.test.create            | true                  | Determines if a test file should be created when a new component is generated                                     |
stencilTools.test.extension         | "spec.tsx"            | The extension of a test file (no leading period). Typically something like "spec.tsx" (default) or "test.tsx"     |
stencilTools.style.create           | true                  | Determines if a style file should be created when a new component is generated                                    |
stencilTools.style.extension        | "css"                 | The extension of a test file (no leading period). This is how you generate "scss" of "sass" files instead of "css" (default)                  |

## Changelog
#### 0.0.1 (2018-06-05)
- Publish the extension!

## Bugs
Please report [here](https://github.com/natemoo-re/vscode-stencil-tools/issues)

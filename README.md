<!-- [![Version](http://vsmarketplacebadge.apphb.com/version/dbaikov.vscode-angular2-component-generator.svg)](https://marketplace.visualstudio.com/items?itemName=dbaikov.vscode-angular2-component-generator) [![Installs](http://vsmarketplacebadge.apphb.com/installs/dbaikov.vscode-angular2-component-generator.svg)](https://marketplace.visualstudio.com/items?itemName=dbaikov.vscode-angular2-component-generator) -->
# Stencil Generator Extension for VSCode

## Description
This that makes working with [Stencil](https://stenciljs.com/) projects a breeze. 
### Features
- Automatically creates Stencil components (`component.tsx`, `component.spec.tsx`, `component.css`)
- Configurable component templates [see Configuration](#configuration)
    - Add a custom prefix to generated component tags
    - Easily toggle on/off @Component({ shadow: true })
    - Change the extension of any generated file
        - For example, `css` => `scss` or `sass` or `spec.tsx` => `test.tsx`
- Easily start a new Stencil project from the Command Palette via Git
- Quickly open the Stencil Docs in your browser

## Usage

### Generate a Component
- From the File Explorer
    - Right click on a file or folder
    - Select "Generate Stencil Component"
    - Enter your component name in the prompt
- From the Command Palette
    - Select "> Stencil: New Component"
    - Enter your component name in the prompt

### Start a Stencil Project
- From the Command Palette
    - Select "> Stencil: Start Project - App" or "> Stencil: Start Project - Component"
    - Select a Repository Location - this is where your Stencil Starter will be cloned
    - Open the new repository or add it to your workspace
    - run `git remote rm origin` and `npm install` as outlined [in the docs](https://stenciljs.com/docs/getting-started)

### Open the Stencil Docs
- From the Command Palette
    - Select "> Stencil: Open Docs"


```json
{
    
}
```

## Changelog
#### 0.0.1 (2018-06-05)
- Publish the extension!

## Bugs

Please report [here](https://github.com/dbaikov/vscode-angular2-component-generator/issues)

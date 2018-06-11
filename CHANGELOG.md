# 2.0.0
## Breaking Changes
- Command names have been namespaced to `extension.stencilTools` rather than `extension`. Please update your keybindings (if any).
- Some Commands have been renamed
    - `startProjectComponent` and `startProjectApp` have been merged into `startProject`
    - `generateComponentFiles` is now `generateComponentFromExplorer`
    - `generateComponentFilesFromCommandPalette` is now `generateComponent`
    - `generateTestFromComponent` is now `generateTest`
## Overview
- New Commands
    - `startProject`
    - `generateTestFromExplorer`
- Generated files now automatically set your cursor position to a convenient spot.
- `Start Project` has now been enabled globally rather than from Stencil Projects only.
- `Start Project` has been completely rewritten. Stencil Project will now be initialized and have dependencies installed completely automatically.
- Snippets with Automatic Imports have been added. These can be accessed from any .tsx file in a Stencil Project by typing `s-{snippet-name}`
- Completions are now provided for the Stencil `keydown` constants within @Listener declarations.
- Add "Generate Test for Stencil Component" to Explorer Context Menu
- Fix default extension for Test files (`spec.tsx` => `spec.ts`)
- Fix generated `HTML{Component}Element` interface in Test files *(now includes prefix)*

# 1.0.0
- Publish extension
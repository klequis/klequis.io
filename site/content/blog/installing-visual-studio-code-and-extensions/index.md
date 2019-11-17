---
description: With the addition of a few extensions VS Code is a great code editor.
modifiedDate: ''
partOfBook: false
postFooterText: 'You are ready to start coding!'
postFooterIcon: ''
previewImage: ''
publishedDate: '2019-11-15'
slug: installing-visual-studio-code-and-extensions
title: Installing Visual Studio Code and Extensions
---



> TODO: Seems using Ubuntu Software is currently the best install option.

# Installing Visual Studio Code

- https://code.visualstudio.com/
- Download .deb
- Open with: software install
- Click Install


## Suggested Extensions
- Better Comments
- Bracket Pair Colorizer
- npm Intellisense
- Prettier - Code formatter

## VS Code Settings
### Update Imports On File Move
> Last I tried it, doesn't work well with absolute imports and adds unwanted imports
"javascript.updateImportsOnFileMove.enabled": "never",
"typescript.updateImportsOnFileMove.enabled": "never",

### Window Title
"window.title": "${dirty}${folderName} : ${activeEditorShort}"

## Editor: Tab Size

Set to 2

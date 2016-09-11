'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { DigdagAutocomplete } from './digdagAutocomplete';

const LANG_DIGDAG: vscode.DocumentFilter = { language: 'digdag', scheme: 'file' };

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(LANG_DIGDAG, new DigdagAutocomplete)
    );

	// need to set in the extension host as well as the completion provider uses it.
	vscode.languages.setLanguageConfiguration('digdag', {
		wordPattern: /[^\-\`\~\@\#\%\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+/g
	});
}
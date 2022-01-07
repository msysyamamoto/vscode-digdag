import { DocumentFormattingEditProvider, Position, Range, TextDocument, TextEdit } from 'vscode';
import * as prettier from 'prettier';

export class DigdagFormatter implements DocumentFormattingEditProvider {
    provideDocumentFormattingEdits(document: TextDocument): TextEdit[] {
        try {
            const text = document.getText();

            const prettierOptions: prettier.Options = {
                parser: 'yaml',
                tabWidth: 2,
            };
            const formatted = prettier.format(text, prettierOptions);

            return [TextEdit.replace(new Range(new Position(0, 0), document.positionAt(text.length)), formatted)];
        } catch (error) {
            return [];
        }
    }
}
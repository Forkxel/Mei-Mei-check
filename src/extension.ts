import * as vscode from 'vscode';
import { exec } from 'child_process';

const successImages = [
    'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif',
    'https://media.giphy.com/media/nxxQgBGvwxRji/giphy.gif'
];

const failImages = [
    'https://media.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif',
    'https://media.giphy.com/media/14aUO0KQmWlc4/giphy.gif'
];

function getRandomImage(images: string[]): string {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('mei-mei-check.run', () => {
        const editor = vscode.window.activeTextEditor;
        
        if (!editor) {
            vscode.window.showErrorMessage('Nemáš otevřený žádný soubor!');
            return;
        }

        const document = editor.document;
        const filePath = document.fileName;
        const languageId = document.languageId;

        const runners: { [key: string]: string } = {
            'javascript': 'node',
            'python': 'python',
            'php': 'php',
            'ruby': 'ruby',
            'shellscript': 'bash'
        };

        const baseCommand = runners[languageId];

        if (!baseCommand) {
            vscode.window.showErrorMessage(`Jazyk ${languageId} zatím není podporován.`);
            return;
        }

        const command = `${baseCommand} "${filePath}"`;

        document.save().then(() => {
            exec(command, (error) => {
                const panel = vscode.window.createWebviewPanel(
                    'meiMeiCheckResult',
                    'Mei Mei Check',
                    vscode.ViewColumn.Beside,
                    {}
                );

                let imageUrl = '';
                let message = '';

                if (error) {
                    imageUrl = getRandomImage(failImages);
                    message = 'Kód spadl! Mei Mei není spokojená 💀';
                } else {
                    imageUrl = getRandomImage(successImages);
                    message = 'Vše běží v klidu! Mei Mei schvaluje 😎';
                }

                panel.webview.html = getWebviewContent(imageUrl, message);
            });
        });
    });

    context.subscriptions.push(disposable);
}

function getWebviewContent(imageUrl: string, message: string) {
    return `<!DOCTYPE html>
    <html lang="cs">
    <head>
        <style>
            body { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; font-family: sans-serif; text-align: center; margin: 0; padding: 20px; box-sizing: border-box; }
            img { max-width: 100%; max-height: 60vh; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.4); }
            h1 { margin-bottom: 20px; }
        </style>
    </head>
    <body>
        <h1>${message}</h1>
        <img src="${imageUrl}" alt="Mei Mei Result">
    </body>
    </html>`;
}

export function deactivate() {}
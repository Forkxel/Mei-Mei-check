import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';

const successImageFiles = ['happy1.png', 'happy2.png', 'happy3.png', 'happy4.png', 'happy5.png', 'happy6.png'];
const failImageFiles = ['sad1.png', 'sad2.png', 'sad3.png'];

function getRandomItem(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('mei-mei-check.run', () => {
        const editor = vscode.window.activeTextEditor;
        
        if (!editor) {
            vscode.window.showErrorMessage('No file open!');
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
            vscode.window.showErrorMessage(`Language ${languageId} is not supported yet.`);
            return;
        }

        const command = `${baseCommand} "${filePath}"`;

        document.save().then(() => {
            exec(command, (error) => {
                const mediaPath = path.join(context.extensionPath, 'media');

                const panel = vscode.window.createWebviewPanel(
                    'meiMeiCheckResult',
                    'Mei Mei Check',
                    vscode.ViewColumn.Beside,
                    {
                        localResourceRoots: [vscode.Uri.file(mediaPath)]
                    }
                );

                const isSuccess = !error;
                const selectedFile = isSuccess ? getRandomItem(successImageFiles) : getRandomItem(failImageFiles);
                const message = isSuccess ? 'All is well! Mei Mei approves your code!' : 'Code failed! Mei Mei is not happy with your code!';

                const onDiskUri = vscode.Uri.file(path.join(mediaPath, selectedFile));
                const imageUri = panel.webview.asWebviewUri(onDiskUri);

                panel.webview.html = getWebviewContent(imageUri.toString(), message);
            });
        });
    });

    context.subscriptions.push(disposable);
}

function getWebviewContent(imageSrc: string, message: string) {
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
        <img src="${imageSrc}" alt="Mei Mei Result">
    </body>
    </html>`;
}

export function deactivate() {}
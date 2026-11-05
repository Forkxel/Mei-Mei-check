# Mei Mei Check 

**Mei Mei Check** evaluates your code execution in real-time right inside Visual Studio Code! Run your script, and Mei Mei will judge whether your code passed cleanly or crashed with an error.

![Mei Mei Check Demo](media/happy4.png)

---

## Features

-  **Instant Execution:** Run your active code file directly within VS Code without switching to an external terminal.
-  **Visual Feedback:** Displays a random Mei Mei image/GIF in a side webview panel depending on whether the code succeeded or failed.
-  **Easy Access:** Launch via the Command Palette, editor top-bar play button, right-click context menu.
-  **Offline Support:** All media assets are bundled locally with the extension for instant loading.

---

## Supported Languages

To run your files, the corresponding interpreter must be installed on your system and accessible from your system PATH:

- **JavaScript** (`node`)
- **Python** (`python`)
- **PHP** (`php`)
- **Ruby** (`ruby`)
- **Shell Scripts** (`bash`)

---

## How to Use

1. Open any supported code file (e.g., `test.js` or `script.py`).
2. Run the check using any of the following methods:
   - **Click the Play button (`▶`)** in the top-right corner of the editor title bar.
   - **Right-click** inside the editor and select **Mei Mei Check: Run Code**.
   - Press **`Ctrl+Alt+M`** (`Cmd+Alt+M` on macOS).
   - Press **`F1`** or **`Ctrl+Shift+P`**, type `Mei Mei Check: Run Code`, and press **Enter**.
3. A side panel will open displaying Mei Mei's verdict!

---

## Requirements

Make sure you have the runtime/interpreter installed on your machine for the language you wish to test (e.g., [Node.js](https://nodejs.org/) for JavaScript or [Python](https://www.python.org/) for Python scripts).

---

## Extension Settings

This extension currently relies on zero-configuration defaults out of the box.

---

## Known Issues

- Unsaved files must be saved before execution (the extension automatically saves the file upon running).
- Compiled languages like C++ or Java are not yet supported.

---

## Release Notes

### 0.0.1

- Initial release of **Mei Mei Check**.
- Added support for JavaScript, Python, PHP, Ruby, and Bash.
- Added local media assets for offline pass/fail reactions.
- Added editor title bar button, context menu integration, and keyboard shortcuts.

---

**Enjoy coding with Mei Mei!** 
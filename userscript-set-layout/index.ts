import * as vscode from "vscode";
import type { ScriptRunResult } from "../api";
import type { Config } from "./config";
export const main = async (
    params: Config,
    context: vscode.ExtensionContext
): Promise<ScriptRunResult> => {
    if (!vscode.window.activeTextEditor) {
        await vscode.commands.executeCommand(
            "workbench.action.files.newUntitledFile"
        );
    }
    await vscode.commands.executeCommand(
        "workbench.action.editorLayoutTwoColumns"
    );
    await vscode.commands.executeCommand(
        "script-plus.commands.webviewControl.open"
    );
    await vscode.commands.executeCommand(
        "workbench.action.moveEditorToNextGroup"
    );
};

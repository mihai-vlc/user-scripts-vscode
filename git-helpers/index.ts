import * as vscode from "vscode";
import type { ScriptRunResult } from "../api";
import type { Config } from "./config";
import type { GitExtension, API as BuiltInGitApi } from "./git";
export const main = async (
    params: Config,
    context: vscode.ExtensionContext
): Promise<ScriptRunResult> => {
    const fixupButton = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left
    );
    fixupButton.text = "Git Fixup";
    fixupButton.command = "user.git.fixup";
    fixupButton.show();

    var fixupCmd = vscode.commands.registerCommand(
        "user.git.fixup",
        async () => {
            try {
                await gitFixup();
            } catch (e) {
                logError(e);
            }
        }
    );

    return () => {
        fixupButton.dispose();
        fixupCmd.dispose();
    };
};

async function gitFixup() {
    const gitApi = await getBuiltInGitApi();

    if (!gitApi) {
        logError("no api");

        return;
    }

    const uri = vscode.window.activeTextEditor?.document.uri;
    if (!uri) {
        logError("no uri");
        return;
    }

    const repo = gitApi.getRepository(uri);

    if (!repo) {
        logError("no repo");
        return;
    }

    await vscode.commands.executeCommand("git.commit", repo);
    // await vscode.commands.executeCommand("git.stageAll", repo);
    // console.log("staged all");
}

async function logError(msg: string) {
    await vscode.window.showErrorMessage("GH: " + msg);
}

async function getBuiltInGitApi(): Promise<BuiltInGitApi | undefined> {
    try {
        const extension = vscode.extensions.getExtension(
            "vscode.git"
        ) as vscode.Extension<GitExtension>;
        if (extension !== undefined) {
            const gitExtension = extension.isActive
                ? extension.exports
                : await extension.activate();

            return gitExtension.getAPI(1);
        }
    } catch {}

    return undefined;
}

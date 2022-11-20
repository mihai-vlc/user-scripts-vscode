import * as vscode from "vscode";
import type { ScriptRunResult } from "../api";
import type { Config } from "./config";
import slug from "slug";
import * as myMath from "my-math";

export const main = async (
    params: Config,
    context: vscode.ExtensionContext
): Promise<ScriptRunResult> => {
    console.log("hello darkness " + params.tooltip);
    vscode.window.showInformationMessage(slug("Hello, Script Plus!"));

    console.log(myMath.add(1, 4));
    console.log(myMath.add(7, 4));
    console.log(myMath);

    const hoverDisposable = vscode.languages.registerHoverProvider(
        "typescript",
        {
            provideHover(doc: vscode.TextDocument) {
                return new vscode.Hover("For *all* TypeScript documents.");
            },
        }
    );

    return () => {
        hoverDisposable.dispose();
        vscode.window.showInformationMessage("Cleanup");
    };
};

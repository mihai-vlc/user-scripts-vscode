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

    return () => {
        vscode.window.showInformationMessage("Cleanup");
    };
};

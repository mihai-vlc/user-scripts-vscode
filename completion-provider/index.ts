import * as vscode from "vscode";
import type { ScriptRunResult } from "../api";
import type { Config } from "./config";

export const main = async (
    params: Config,
    context: vscode.ExtensionContext
): Promise<ScriptRunResult> => {
    const provider1 = vscode.languages.registerCompletionItemProvider(
        {
            language: "markdown",
        },
        {
            provideCompletionItems(document, position, token, context) {
                console.log("completion calculated");

                const snippetCompletion = new vscode.CompletionItem(
                    "Good part of the day"
                );
                snippetCompletion.insertText = new vscode.SnippetString(
                    "Good ${1|morning,afternoon,evening|}. It is ${1}, right?"
                );

                return [snippetCompletion];
            },
        },
        ":"
    );
    return () => {
        provider1.dispose();
    };
};

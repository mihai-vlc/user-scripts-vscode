import * as vscode from "vscode";
import type { ScriptRunResult } from "../api";
import type { Config } from "./config";
export const main = async (
  params: Config,
  context: vscode.ExtensionContext
): Promise<ScriptRunResult> => {
  vscode.window.showInformationMessage("This is a nice messagexx");

  console.log("Something is happening");

  return () => {
    vscode.window.showInformationMessage("Cleanup executed");
  };
};

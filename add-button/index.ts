import * as vscode from "vscode";
import type { ScriptRunResult } from "../api";
import type { Config } from "./config";

import slug from "slug";

export const main = async (
  params: Config,
  context: vscode.ExtensionContext
): Promise<ScriptRunResult> => {

  console.log("hello darkness " + params.tooltip);
  vscode.window.showInformationMessage(slug("Hello, Script Plus!"));

  return () => {
    vscode.window.showInformationMessage("Cleanup");
  }
};

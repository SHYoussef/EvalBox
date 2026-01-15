import fs from "fs";

export const loadPrompt = (name: string) =>
  fs.readFileSync(`prompts/${name}.md`, "utf-8");

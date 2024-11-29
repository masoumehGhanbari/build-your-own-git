import fs from "fs-extra";
import { hashObject } from "./hashObject.js";

async function gitAdd(filePath) {
  const content = await fs.readFile(filePath, "utf-8");
  const hash = await hashObject(content);

  console.log(`Staged ${filePath} (hash: ${hash})`);
}

gitAdd(process.argv[2]).catch(console.error);

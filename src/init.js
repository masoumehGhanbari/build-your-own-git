import fs from "fs-extra";
import path from "path";

async function getInit() {
  const gitDir = path.join(process.cwd(), ".js-git");

  if (await fs.pathExists(gitDir)) {
    console.log("Repository already initialized.");
    return;
  }

  await fs.ensureDir(path.join(gitDir, "objects"));
  await fs.ensureDir(path.join(gitDir, "refs"));
  await fs.writeFile(path.join(gitDir, "HEAD"), "ref: refs/heads/main\n");

  const mainBranchPath = path.join(gitDir, "refs", "heads", "main");
  await fs.ensureDir(mainBranchPath);
  await fs.writeFile(mainBranchPath, "");

  console.log("Initialized empty Git repository in .js-git/");
}

getInit().catch(console.error);

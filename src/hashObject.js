import fs from "fs-extra";
import crypto from "crypto";
import path from "path";

export async function hashObject(content) {
  const hash = crypto.createHash("sha1").update(content).digest("hex");
  const dir = path.join(".js-git", "objects", hash.substring(0, 2));
  const file = path.join(dir, hash.substring(2));

  await fs.ensureDir(dir);
  if (!(await fs.pathExists(file))) {
    await fs.writeFile(file, content);
  }

  return hash;
}

import { isFolderEmpty } from "./helpers/is-folder-empty";
import { isWriteable } from "./helpers/is-writeable";
import { makeDir } from "./helpers/make-dir";

const fs = require("fs-extra");
const os = require("os");
const path = require("path");

export async function createTemplateApp(params: any) {
  const { pathResolved, template } = params;
  const root = path.resolve(pathResolved);
  const appName = path.basename(root);

  if (!(await isWriteable(path.dirname(root)))) {
    console.error(
      "The application path is not writable, please check folder permissions and try again."
    );
    console.error(
      "It is likely you do not have write permissions for this folder."
    );
    process.exit(1);
  }

  await makeDir(root);
  if (!isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  const packageJson = {
    name: appName,
    version: "0.1.0",
    private: true,
  };

  const appPath = path.resolve(root, appName);

  await fs.ensureDir(appPath);

  await fs.writeFile(
    path.join(appPath, "package.json"),
    JSON.stringify(packageJson, null, 2) + os.EOL
  );

  // await fs.ensureDir(root);
}

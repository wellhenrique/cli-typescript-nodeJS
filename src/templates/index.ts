import chalk from "chalk";
import fs from "fs";
import path from "path";

import cpy from "cpy";
import os from "os";
import { install } from "../helpers/install";

export const installTemplate = async ({
  appName,
  root,
  packageManager = "npm",
  template,
  addTypescript,
  addRedoc,
}: any) => {
  console.log(chalk.bold(`Usando ${packageManager}.`));

  const packageJson = {
    name: appName,
    version: "0.1.0",
    private: true,
    scripts: {},
  };

  fs.writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify(packageJson, null, 2) + os.EOL
  );

  const installFlags = { packageManager };

  const dependencies: string[] = [];

  if (addTypescript) {
    dependencies.push(
      "typescript",
      "ts-node",
      "ts-node-dev",
      "@types/node",
      "@types/express"
    );
  }

  if (addRedoc) {
    dependencies.push("redoc-cli");
  }

  if (dependencies.length) {
    console.log();
    console.log("Installing dependencies:");
    for (const dependency of dependencies) {
      console.log(`- ${chalk.cyan(dependency)}`);
    }
    console.log();

    await install(root, dependencies, installFlags);
  }
  /**
   * Copy the template files to the target directory.
   */
  console.log("\nInitializing project with template:", template, "\n");
  const templatePath = path.join(__dirname, template);
  console.log(root, "root");
  console.log(templatePath, "templatePath");
  await cpy("**", root, {
    parents: true,
    cwd: templatePath,
    rename: (name) => {
      switch (name) {
        case "gitignore":
        case "eslintrc.json": {
          return ".".concat(name);
        }
        // README.md is ignored by webpack-asset-relocator-loader used by ncc:
        // https://github.com/vercel/webpack-asset-relocator-loader/blob/e9308683d47ff507253e37c9bcbb99474603192b/src/asset-relocator.js#L227
        case "README-template.md": {
          return "README.md";
        }
        default: {
          return name;
        }
      }
    },
  });

  // if (!eslint) {
  //   // remove un-necessary template file if eslint is not desired
  //   await fs.promises.unlink(path.join(root, ".eslintrc.json"));
  // }
};

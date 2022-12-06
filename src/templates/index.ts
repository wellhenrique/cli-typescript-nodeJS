export const installTemplate = async ({
  appName,
  root,
  packageManager,
  isOnline,
  template,
  mode,
  eslint,
}: any) => {
  // console.log(chalk.bold(`Using ${packageManager}.`))

  const packageJson = {
    name: appName,
    version: "0.1.0",
    private: true,
  };

  fs.writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify(packageJson, null, 2) + os.EOL
  );

  const installFlags = { packageManager, isOnline };

  const dependencies = ["react", "react-dom"];

  if (mode === "ts") {
    dependencies.push(
      "typescript",
      "@types/react",
      "@types/node",
      "@types/react-dom"
    );
  }

  if (eslint) {
    dependencies.push("eslint");
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
  const templatePath = path.join(__dirname, template, mode);
  await cpy("**", root, {
    parents: true,
    cwd: templatePath,
    rename: (name) => {
      switch (name) {
        case "gitignore":
        case "eslintrc.json": {
          return ".".concat(name);
        }
        case "README-template.md": {
          return "README.md";
        }
        default: {
          return name;
        }
      }
    },
  });

  if (!eslint) {
    await fs.promises.unlink(path.join(root, ".eslintrc.json"));
  }
};

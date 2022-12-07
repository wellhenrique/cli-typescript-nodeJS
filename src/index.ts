async function bootstrap() {
  const chalk = require("chalk");
  const { Command } = require("commander");
  const prompts = require("prompts");
  const { createTemplateApp } = require("./createTemplateApp");

  const program = new Command();
  let projectPath: string = "";

  program
    .version("0.0.1")
    .description("A CLI for generating template projects")
    .arguments("<project-directory>")
    .usage(`${chalk.green("<project-directory>")} [options]`)
    .action((name: string) => {
      projectPath = name;
    })
    .option("--t, --template", `Initialize as template name.`)
    .allowUnknownOption()
    .parse(process.argv);

  const options = program.opts();
  let template = options.template;

  async function exec(): Promise<void> {
    if (typeof projectPath === "string") {
      projectPath = projectPath.trim();
    }

    if (!projectPath) {
      const res = await prompts({
        type: "text",
        name: "path",
        message: "What is your project named?",
        initial: "my-app",
        validate: (name: string) => {
          if (name) return true;
          return "Invalid project name: " + name;
        },
      });

      if (typeof res.path === "string") {
        projectPath = res.path.trim();
      }
    }

    if (!template) {
      const res = await prompts({
        type: "text",
        name: "path",
        message: "What is your template named?",
        initial: "my-template-typescript",
        validate: (name: string) => {
          if (name) return true;
          return "Invalid template name: " + name;
        },
      });

      if (typeof res.path === "string") {
        template = res.path.trim();
      }
    }

    await createTemplateApp({
      pathResolved: projectPath,
      template,
    });
  }

  await exec();
}

bootstrap();

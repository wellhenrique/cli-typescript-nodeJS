"use strict";
async function startApp() {
    const chalk = require("chalk");
    const { Command } = require("commander");
    const figlet = require("figlet");
    const prompts = require("prompts");
    const program = new Command();
    let projectPath = "";
    program
        .version("0.0.1")
        .description("A CLI for generating ASCII art from text")
        .arguments("<project-directory>")
        .usage(`${chalk.green("<project-directory>")} [options]`)
        .action((name) => {
        projectPath = name;
    })
        .option("--t, --template", `
    Initialize as template name.
  `)
        .allowUnknownOption()
        .parse(process.argv);
    const options = program.opts();
    let template = options.template;
    console.log(template, "template");
    async function run() {
        if (typeof projectPath === "string") {
            projectPath = projectPath.trim();
        }
        if (!projectPath) {
            const res = await prompts({
                type: "text",
                name: "path",
                message: "What is your project named?",
                initial: "my-app",
                validate: (name) => {
                    if (name)
                        return true;
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
                validate: (name) => {
                    if (name)
                        return true;
                    return "Invalid template name: " + name;
                },
            });
            if (typeof res.path === "string") {
                template = res.path.trim();
            }
        }
    }
    await run();
}
startApp();
//# sourceMappingURL=index.js.map
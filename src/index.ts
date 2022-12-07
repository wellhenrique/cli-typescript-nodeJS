#!/usr/bin/env node

const chalk = require("chalk");
const { Command } = require("commander");
const prompts = require("prompts");
const { createTemplateApp } = require("./createTemplateApp");

const program = new Command();
let projectPath: string = "";

program
  .version("0.0.1")
  .description("Uma CLI para gerar modelos de projetos.")
  .arguments("<project-directory>")
  .usage(`${chalk.green("<project-directory>")} [options]`)
  .action((name: string) => {
    projectPath = name;
  })
  .option("--t, --template", `Inicializa um modelo pelo nome.`)
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
      message: "Qual é o nome do seu projeto?",
      initial: "meu-app",
      validate: (name: string) => {
        if (name) return true;
        return "Nome de projeto invalido: " + name;
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
      message: "Qual é o nome do modelo que você deseja inicializar?",
      initial: "top-bar",
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

exec();

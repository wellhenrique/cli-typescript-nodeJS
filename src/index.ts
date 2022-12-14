#!/usr/bin/env node
import { Command } from "commander";
import path from "path";
import prompts from "prompts";
import fs from "fs";

const program = new Command();
let projectPath: string = "";

program
  .version("0.0.1")
  .description("Uma CLI para gerar modelos de projetos.")
  .description("Cria um projeto com o nome especificado")
  .command("create <project-name> [destination]")
  .action((projectName, destination) => {
    if (projectName === "create") {
      projectPath = destination;
    }
  })
  .allowUnknownOption()
  .parse(process.argv);

const options = program.opts();

async function exec(): Promise<void> {
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

  if (!projectPath) return;
  fs.mkdirSync(projectPath);

    // Create a package.json file for the project
    const packageJson = {
      name: projectPath,
      version: "1.0.0",
      description: "A new project created with the CLI",
    };
    fs.writeFileSync(
      path.join(projectPath, "package.json"),
      JSON.stringify(packageJson)
    );

    // Create a README.md file for the project
    const readme = `# ${projectPath}`;
    fs.writeFileSync(path.join(projectPath, "README.md"), readme);

    console.log(`Successfully created project ${projectPath}`);
}

exec();

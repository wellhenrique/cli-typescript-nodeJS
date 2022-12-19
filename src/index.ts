#!/usr/bin/env node
import { Command } from "commander";
import path from "path";
import prompts from "prompts";
import fs from "fs";
import { exec as execute } from "child_process";
import { redocHtmlTemplate } from "./utils/generateHtmlRedocTemplate";
import chalk from "chalk";
import { createMicroServiceApp } from "./createMicroserviceTemplate";

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

async function exec(): Promise<void> {
  if (!projectPath) {
    const res = await prompts({
      type: "text",
      name: "path",
      message: `${chalk.blue("Qual é o nome do seu projeto?")}}`,
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

  if (projectPath) {
    projectPath = path.resolve(projectPath);
    console.log(`
    ${chalk.blue("Criando projeto em: ")} ${chalk.green(projectPath)}
    `);

    fs.mkdirSync(projectPath);
    const response = await prompts([
      {
        type: "select",
        name: "projectType",
        message: "Selecione o tipo de projeto:",
        choices: [
          { title: "Front-end", value: "front-end" },
          { title: "Back-end", value: "back-end" },
          { title: "Mobile", value: "mobile" },
        ],
      },
    ]);
    console.log(response.projectType, "projectType");

    if (response.projectType === "front-end") generateFrontEndProject();
    if (response.projectType === "back-end") generateBackEndProject();
    if (response.projectType === "mobile") generateMobileProject();
  }
}

async function generateFrontEndProject() {
  console.log("Front-end project");
}

async function generateBackEndProject() {
  // const redocHTMLTemplate = redocHtmlTemplate;
  // fs.writeFileSync(path.join(projectPath, "index.html"), redocHTMLTemplate);

  const { projectType } = await prompts([
    {
      type: "select",
      name: "projectType",
      message: "Selecione o tipo de projeto:",
      choices: [
        { title: "Microservice", value: "microservice" },
        { title: "Lambda Serverless", value: "serverless" },
      ],
    },
  ]);

  const { addTypescript } = await prompts([
    {
      type: "confirm",
      name: "addTypescript",
      message: "Deseja adicionar typescript ao projeto?",
      initial: true,
    },
  ]);
  if (addTypescript) console.log("Adicionando typescript ao projeto.");

  const { addRedoc } = await prompts([
    {
      type: "confirm",
      name: "addRedoc",
      message: "Deseja adicionar o redoc como documentação?",
      initial: true,
    },
  ]);
  if (addRedoc) console.log("Adicionando redoc como documentação.");

  if (projectType === "microservice")
    createMicroServiceApp({
      projectPath,
      options: {
        addTypescript,
        addRedoc,
      },
    });
}

async function generateMobileProject() {
  console.log("Mobile project");
}

// async function generateMicroservicesProject(
//   addTypescript: boolean,
//   addRedoc: boolean
// ) {
//   // Create a package.json file for the project
//   const packageJson = {
//     name: path.basename(projectPath),
//     version: "0.1.0",
//     private: true,
//     dependencies: {},
//     scripts: {},
//   };

//   if (addTypescript) {
//     packageJson.dependencies = {
//       typescript: "^4.1.3",
//       "ts-node": "^9.1.1",
//       "ts-node-dev": "^1.0.0-pre.65",
//     };
//     packageJson.scripts = {
//       start: "ts-node-dev",
//     };
//   }

//   if (addRedoc) {
//     packageJson.dependencies = {
//       "redoc-cli": "^0.9.8",
//     };
//     packageJson.scripts = {
//       start: "node index.js",
//       docs: "redoc-cli bundle openapi.yaml --output index.html",
//     };
//   }

//   fs.writeFileSync(
//     path.join(projectPath, "package.json"),
//     JSON.stringify(packageJson)
//   );

//   // Create a README.md file for the project
//   const readme = `# ${projectPath}`;
//   fs.writeFileSync(path.join(projectPath, "README.md"), readme);

//   execute(
//     `cd ${projectPath} && npm install redoc-cli`,
//     (error, stdout, stderr) => {
//       if (error) {
//         console.error(`Erro ao instalar a lib redoc: ${error}`);
//         return;
//       }
//       console.log(`stdout: ${stdout}`);
//       console.error(`stderr: ${stderr}`);
//     }
//   );

//   console.log(`Projeto criado com sucesso em ${projectPath}`);
// }

exec();

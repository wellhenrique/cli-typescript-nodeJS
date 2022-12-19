#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const path_1 = __importDefault(require("path"));
const prompts_1 = __importDefault(require("prompts"));
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const createMicroserviceTemplate_1 = require("./createMicroserviceTemplate");
const program = new commander_1.Command();
let projectPath = "";
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
function exec() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!projectPath) {
            const res = yield (0, prompts_1.default)({
                type: "text",
                name: "path",
                message: `${chalk_1.default.blue("Qual é o nome do seu projeto?")}}`,
                initial: "meu-app",
                validate: (name) => {
                    if (name)
                        return true;
                    return "Nome de projeto invalido: " + name;
                },
            });
            if (typeof res.path === "string") {
                projectPath = res.path.trim();
            }
        }
        if (projectPath) {
            projectPath = path_1.default.resolve(projectPath);
            console.log(`
    ${chalk_1.default.blue("Criando projeto em: ")} ${chalk_1.default.green(projectPath)}
    `);
            fs_1.default.mkdirSync(projectPath);
            const response = yield (0, prompts_1.default)([
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
            if (response.projectType === "front-end")
                generateFrontEndProject();
            if (response.projectType === "back-end")
                generateBackEndProject();
            if (response.projectType === "mobile")
                generateMobileProject();
        }
    });
}
function generateFrontEndProject() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Front-end project");
    });
}
function generateBackEndProject() {
    return __awaiter(this, void 0, void 0, function* () {
        // const redocHTMLTemplate = redocHtmlTemplate;
        // fs.writeFileSync(path.join(projectPath, "index.html"), redocHTMLTemplate);
        const { projectType } = yield (0, prompts_1.default)([
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
        const { addTypescript } = yield (0, prompts_1.default)([
            {
                type: "confirm",
                name: "addTypescript",
                message: "Deseja adicionar typescript ao projeto?",
                initial: true,
            },
        ]);
        if (addTypescript)
            console.log("Adicionando typescript ao projeto.");
        const { addRedoc } = yield (0, prompts_1.default)([
            {
                type: "confirm",
                name: "addRedoc",
                message: "Deseja adicionar o redoc como documentação?",
                initial: true,
            },
        ]);
        if (addRedoc)
            console.log("Adicionando redoc como documentação.");
        if (projectType === "microservice")
            (0, createMicroserviceTemplate_1.createMicroServiceApp)({
                projectPath,
                options: {
                    addTypescript,
                    addRedoc,
                },
            });
    });
}
function generateMobileProject() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Mobile project");
    });
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

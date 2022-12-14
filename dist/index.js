#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const path_1 = __importDefault(require("path"));
const prompts_1 = __importDefault(require("prompts"));
const fs_1 = __importDefault(require("fs"));
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
async function exec() {
    if (!projectPath) {
        const res = await (0, prompts_1.default)({
            type: "text",
            name: "path",
            message: "Qual é o nome do seu projeto?",
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
    console.log("Criando projeto em: ", projectPath);
    fs_1.default.mkdirSync(projectPath);
    // Create a package.json file for the project
    const packageJson = {
        name: projectPath,
        version: "1.0.0",
        description: "A new project created with the CLI",
    };
    fs_1.default.writeFileSync(path_1.default.join(projectPath, "package.json"), JSON.stringify(packageJson));
    // Create a README.md file for the project
    const readme = `# ${projectPath}`;
    fs_1.default.writeFileSync(path_1.default.join(projectPath, "README.md"), readme);
    console.log(`Successfully created project ${projectPath}`);
}
exec();
//# sourceMappingURL=index.js.map
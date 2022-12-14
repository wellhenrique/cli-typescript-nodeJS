#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const prompts_1 = __importDefault(require("prompts"));
const program = new commander_1.Command();
let projectPath = "";
// program
//   .command('create <project-name>')
//   .description('Create a new project with the specified name')
//   .action((projectName) => {
//     // Create a new directory for the project
//     fs.mkdirSync(projectName);
//     // Create a package.json file for the project
//     const packageJson = {
//       name: projectName,
//       version: '1.0.0',
//       description: 'A new project created with the CLI',
//     };
//     fs.writeFileSync(path.join(projectName, 'package.json'), JSON.stringify(packageJson));
//     // Create a README.md file for the project
//     const readme = `# ${projectName}
// A new project created with the CLI.`;
//     fs.writeFileSync(path.join(projectName, 'README.md'), readme);
//     console.log(`Successfully created project ${projectName}`);
//   });
// program.parse(process.argv);
program
    .version("0.0.1")
    .description("Uma CLI para gerar modelos de projetos.")
    .description("Cria um projeto com o nome especificado")
    .command("create <project-name>")
    .action((projectName) => {
    if (typeof projectName === "string") {
        projectPath = projectName.trim();
    }
})
    .option("--t, --template", `Inicializa um modelo pelo nome.`)
    .allowUnknownOption()
    .parse(process.argv);
const options = program.opts();
let template = options.template;
async function exec() {
    console.log("projectName", projectPath);
    console.log(projectPath.replace("create ", ""), "replace");
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
}
exec();
//# sourceMappingURL=index.js.map
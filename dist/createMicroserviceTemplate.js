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
exports.createMicroServiceApp = void 0;
const path_1 = __importDefault(require("path"));
const isWriteable_1 = require("./utils/isWriteable");
const make_dir_1 = require("./helpers/make-dir");
const is_folder_empty_1 = require("./helpers/is-folder-empty");
const chalk_1 = __importDefault(require("chalk"));
const templates_1 = require("./templates");
function createMicroServiceApp({ projectPath, options }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { addTypescript = false, addRedoc = true } = options;
        const root = path_1.default.resolve(projectPath);
        if (!(yield (0, isWriteable_1.isWriteable)(path_1.default.dirname(root)))) {
            console.error("O caminho do projeto não é gravável, verifique as permissões da pasta e tente novamente.");
            console.error("É provável que você não tenha permissões de gravação para esta pasta.");
            process.exit(1);
        }
        const appName = path_1.default.basename(root);
        yield (0, make_dir_1.makeDir)(root);
        if (!(0, is_folder_empty_1.isFolderEmpty)(root, appName)) {
            process.exit(1);
        }
        // const originalDirectory = process.cwd();
        console.log(`Criando Microservice em ${chalk_1.default.green(root)}.`);
        console.log();
        process.chdir(root);
        yield (0, templates_1.installTemplate)({
            appName,
            root,
            packageManager: "npm",
            template: "microservice",
            addTypescript,
            addRedoc,
        });
        console.log(`${chalk_1.default.green("Sucesso!")} Criado ${appName} em ${root}`);
        // // Create a README.md file for the project
        // const readme = `# ${projectPath}`;
        // fs.writeFileSync(path.join(projectPath, "README.md"), readme);
        // execute(
        //   `cd ${projectPath} && npm install redoc-cli`,
        //   (error, stdout, stderr) => {
        //     if (error) {
        //       console.error(`Erro ao instalar a lib redoc: ${error}`);
        //       return;
        //     }
        //     console.log(`stdout: ${stdout}`);
        //     console.error(`stderr: ${stderr}`);
        //   }
        // );
    });
}
exports.createMicroServiceApp = createMicroServiceApp;

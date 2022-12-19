import path from "path";
import { isWriteable } from "./utils/isWriteable";
import { makeDir } from "./helpers/make-dir";
import { isFolderEmpty } from "./helpers/is-folder-empty";
import chalk from "chalk";
import { installTemplate } from "./templates";

type Props = {
  projectPath: string;
  options: any;
};

export async function createMicroServiceApp({ projectPath, options }: Props) {
  const { addTypescript = false, addRedoc = true } = options;

  const root = path.resolve(projectPath);

  if (!(await isWriteable(path.dirname(root)))) {
    console.error(
      "O caminho do projeto não é gravável, verifique as permissões da pasta e tente novamente."
    );
    console.error(
      "É provável que você não tenha permissões de gravação para esta pasta."
    );
    process.exit(1);
  }

  const appName = path.basename(root);
  await makeDir(root);
  if (!isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  // const originalDirectory = process.cwd();

  console.log(`Criando Microservice em ${chalk.green(root)}.`);
  console.log();

  process.chdir(root);

  await installTemplate({
    appName,
    root,
    packageManager: "npm",
    template: "microservice",
    addTypescript,
    addRedoc,
  });
  console.log(`${chalk.green("Sucesso!")} Criado ${appName} em ${root}`);

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
}

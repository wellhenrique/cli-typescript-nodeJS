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
exports.installTemplate = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cpy_1 = __importDefault(require("cpy"));
const os_1 = __importDefault(require("os"));
const install_1 = require("../helpers/install");
const installTemplate = ({ appName, root, packageManager = "npm", template, addTypescript, addRedoc, }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(chalk_1.default.bold(`Usando ${packageManager}.`));
    const packageJson = {
        name: appName,
        version: "0.1.0",
        private: true,
        scripts: {},
    };
    fs_1.default.writeFileSync(path_1.default.join(root, "package.json"), JSON.stringify(packageJson, null, 2) + os_1.default.EOL);
    const installFlags = { packageManager };
    const dependencies = [];
    if (addTypescript) {
        dependencies.push("typescript", "ts-node", "ts-node-dev", "@types/node", "@types/express");
    }
    if (addRedoc) {
        dependencies.push("redoc-cli");
    }
    if (dependencies.length) {
        console.log();
        console.log("Installing dependencies:");
        for (const dependency of dependencies) {
            console.log(`- ${chalk_1.default.cyan(dependency)}`);
        }
        console.log();
        yield (0, install_1.install)(root, dependencies, installFlags);
    }
    /**
     * Copy the template files to the target directory.
     */
    console.log("\nInitializing project with template:", template, "\n");
    const templatePath = path_1.default.join(__dirname, template);
    console.log(root, "root");
    console.log(templatePath, "templatePath");
    yield (0, cpy_1.default)("**", root, {
        parents: true,
        cwd: templatePath,
        rename: (name) => {
            switch (name) {
                case "gitignore":
                case "eslintrc.json": {
                    return ".".concat(name);
                }
                // README.md is ignored by webpack-asset-relocator-loader used by ncc:
                // https://github.com/vercel/webpack-asset-relocator-loader/blob/e9308683d47ff507253e37c9bcbb99474603192b/src/asset-relocator.js#L227
                case "README-template.md": {
                    return "README.md";
                }
                default: {
                    return name;
                }
            }
        },
    });
    // if (!eslint) {
    //   // remove un-necessary template file if eslint is not desired
    //   await fs.promises.unlink(path.join(root, ".eslintrc.json"));
    // }
});
exports.installTemplate = installTemplate;

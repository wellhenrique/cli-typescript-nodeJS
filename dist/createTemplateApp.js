"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTemplateApp = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const is_folder_empty_1 = require("./helpers/is-folder-empty");
const is_writeable_1 = require("./helpers/is-writeable");
const make_dir_1 = require("./helpers/make-dir");
async function createTemplateApp(params) {
    const { pathResolved, template } = params;
    const root = path_1.default.resolve(pathResolved);
    const appName = path_1.default.basename(root);
    if (!(await (0, is_writeable_1.isWriteable)(path_1.default.dirname(root)))) {
        console.error("The application path is not writable, please check folder permissions and try again.");
        console.error("It is likely you do not have write permissions for this folder.");
        process.exit(1);
    }
    await (0, make_dir_1.makeDir)(root);
    if (!(0, is_folder_empty_1.isFolderEmpty)(root, appName)) {
        process.exit(1);
    }
    const packageJson = {
        name: appName,
        version: "0.1.0",
        private: true,
    };
    const appPath = path_1.default.resolve(root, appName);
    await fs_extra_1.default.ensureDir(appPath);
    await fs_extra_1.default.writeFile(path_1.default.join(appPath, "package.json"), JSON.stringify(packageJson, null, 2) + os_1.default.EOL);
    // await fs.ensureDir(root);
}
exports.createTemplateApp = createTemplateApp;
//# sourceMappingURL=createTemplateApp.js.map
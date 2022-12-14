"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWriteable = void 0;
const fs_1 = __importDefault(require("fs"));
async function isWriteable(directory) {
    try {
        await fs_1.default.promises.access(directory, (fs_1.default.constants || fs_1.default).W_OK);
        return true;
    }
    catch (err) {
        return false;
    }
}
exports.isWriteable = isWriteable;
//# sourceMappingURL=is-writeable.js.map
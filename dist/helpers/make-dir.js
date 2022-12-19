"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDir = void 0;
const fs_1 = __importDefault(require("fs"));
function makeDir(root, options = { recursive: true }) {
    return fs_1.default.promises.mkdir(root, options);
}
exports.makeDir = makeDir;

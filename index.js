#!/usr/bin/env node

const execSync = require("child_process").execSync;

const runCommand = (command) => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.log(`Failed to execute command: ${command}`, error);
    return false;
  }
  return true;
};

const repoName = process.argv[2] || "micro-frontend-template";
const gitCheckoutCommand = `git clone --depth 1 https://github.com/wellhenrique/micro-frontend-template ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Creating a new micro-frontend project in ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(1);

console.log("Installing dependencies...");
const installedDependencies = runCommand(installDepsCommand);
if (!installedDependencies) process.exit(1);

console.log("Done!");
console.log(`cd ${repoName} && npm start`);
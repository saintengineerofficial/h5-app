import inquirer from 'inquirer';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const appsDir = path.join(new URL('.', import.meta.url).pathname, '..', 'apps');
const apps = fs.readdirSync(appsDir).filter((dir) => {
  return fs.statSync(path.join(appsDir, dir)).isDirectory();
});

const { selectedApp } = await inquirer.prompt([
  {
    type: 'list',
    name: 'selectedApp',
    message: '请选择要运行的子应用',
    choices: apps,
  },
]);

console.log(`🚀 启动 ${selectedApp}...`);
execSync(`turbo run dev --filter=${selectedApp}`, {
  stdio: 'inherit',
});

import fs from 'fs';
import path from 'path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

function printDirectoryStructure(dir, indent = '') {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (file !== 'node_modules' && file !== '.vscode' && file !== 'dir.js'  && file !== 'coverage' && file !== 'dist') {
      if (stats.isDirectory()) {
        console.log(indent + file + '/');
        printDirectoryStructure(filePath, indent + '  ');
      } else {
        console.log(indent + file);
      }
    }
  });
}

// Provide the root directory path of your npm project
const rootDirectory = __dirname;

// Print the directory structure
printDirectoryStructure(rootDirectory);

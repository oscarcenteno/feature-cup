// Used for README.md file

const fs = require('fs');
const path = require('path');
const printer = require('./printer');

function generateAsciiTree(directoryPath, prefix = '') {
    const files = fs.readdirSync(directoryPath);
    let tree = '';

    files.forEach((file, index) => {
        const filePath = path.join(directoryPath, file);
        const isDirectory = fs.statSync(filePath).isDirectory();
        const isLastItem = index === files.length - 1;
        const marker = isLastItem ? '└──' : '├──';
        const newPrefix = prefix + (isLastItem ? '   ' : '│  ');

        tree += prefix + marker + file + '\n';

        if (isDirectory) {
            tree += generateAsciiTree(path.join(directoryPath, file), newPrefix);
        }
    });

    return tree;
}

const directoryPath = './demo';
const asciiTree = generateAsciiTree(directoryPath);

printer.log('ASCII representation of the folder structure:');
printer.log('');
printer.log(directoryPath);
printer.log(asciiTree);

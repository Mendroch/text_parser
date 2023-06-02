const fs = require('fs');
const path = require('path');
const {get} = require('./argv');
const {parseText} = require('./utils');

// node index.js --dir 'pieśni'

let startDir = get('dir');

if (!startDir) {
  throw new Error('Missing parameters');
}

const saveFile = (dir, parsedText) => {
  fs.mkdir(path.dirname(dir), {recursive: true}, (err) => {
    if (err) throw err;

    fs.writeFile(dir, parsedText, (err) => {
      if (err) throw err;
    });
  });
};

const parseFile = (dir) => {
  fs.readFile(dir, 'utf8', (err, data) => {
    if (err) throw err;
    const parsedText = parseText(data);

    let newDir = dir.replace(startDir, `${startDir}-parsed`).replace('.atf', '.txt');
    saveFile(newDir, parsedText);
  });
};

const searchDirectory = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const fullPath = path.join(dir, file);

      fs.lstat(fullPath, (err, stats) => {
        if (err) throw err;

        if (stats.isDirectory()) {
          searchDirectory(fullPath);
        } else {
          if (path.extname(file).slice(1) === 'atf') parseFile(fullPath);
        }
      });
    });
  });
};

let dir = path.join(__dirname, startDir);

searchDirectory(dir);

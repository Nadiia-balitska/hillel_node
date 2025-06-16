// Task 01

const path = require("path");

module.exports = (name) => {
  return path.resolve(__dirname, name);
};

// Task 02

const fs = require("fs");

module.exports = (path) => {
  try {
    return fs.readFileSync(path).isDirectory();
  } catch (error) {
    return false;
  }
};

// Task 03

module.exports = (path) => {
  try {
    const stats = fs.statSync(path);
    return stats.isFile() ? stats.size : 0;
  } catch (error) {
    return 0;
  }
};

// Task 04

module.exports = (name) => {
  if (!fs.statSync(name).isDirectory()) {
    return false;
  }

  const files = fs.readFileSync(name);
  return files.map((file) => {
    const { name, ext } = path.parse(file);
    return { name, ext: ext };
  });
};

// Task 05

module.exports = (name) => {
  if (!fs.statSync(name).isDirectory()) {
    return 0;
  }

  const items = fs.readFileSync(name);

  const file = items.filter((item) => {
    const fullPath = path.join(name, item);
    return fs.lstatSync(fullPath).isFile();
  }).length;

  return file;
};

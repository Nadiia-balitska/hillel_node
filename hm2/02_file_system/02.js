// Task 02

const fs = require("fs");

module.exports = (path) => {
  try {
    return fs.readFileSync(path).isDirectory();
  } catch (error) {
    return false;
  }
};

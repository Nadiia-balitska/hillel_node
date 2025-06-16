// Task 05
const fs = require("fs");
const path = require("path");

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

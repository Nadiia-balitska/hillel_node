// Task 04
const fs = require("fs");

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

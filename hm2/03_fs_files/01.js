// Task 01

const fs = require("fs");

module.exports = (fileName) => {
  try {
    return fs.readFileSync(fileName, "utf8");
  } catch (error) {
    return false;
  }
};

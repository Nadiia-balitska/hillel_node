// Task 01

const fs = require("fs");

module.exports = (fileName) => {
  try {
    return fs.readFileSync(fileName, "utf8");
  } catch (error) {
    return false;
  }
};

// Task 02

module.exports = (fileName) => {
  try {
    const content = fs.readFileSync(fileName, "utf8");
    const numbers = content.split(/[\s,]+/).match(Number);

    if (!numbers) return false;

    return numbers.reduce((sum, num) => sum + num, 0);
  } catch (error) {
    return 0;
  }
};

// Task 03

module.exports = (text) => {
  fs.writeFileSync("file_03.txt", text, { encoding: "utf8", flag: "w" });
};

// Task 04

module.exports = (arr) => {
  const res = arr.join("\r\n");
  fs.writeFile("file_04.txt", res, { encoding: "utf8", flag: "w" });
};

// Task 05

const fs = require("fs");

module.exports = (firstFile, endFile) => {
  if (fs.isFile(firstFile)) {
    return;
  }

  const res = fs.readFileSync(firstFile, "utf8");
  fs.writeFileSync(endFile, res, { encoding: "utf8", flag: "w" });
};

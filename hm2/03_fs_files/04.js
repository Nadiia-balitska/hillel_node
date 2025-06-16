// Task 04
const fs = require("fs");

module.exports = (arr) => {
  const res = arr.join("\r\n");
  fs.writeFile("file_04.txt", res, { encoding: "utf8", flag: "w" });
};

// Task 03
const fs = require("fs");

module.exports = (text) => {
  fs.writeFileSync("file_03.txt", text, { encoding: "utf8", flag: "w" });
};

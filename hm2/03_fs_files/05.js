// Task 05

const fs = require("fs");

module.exports = (firstFile, endFile) => {
  if (fs.isFile(firstFile)) {
    return;
  }

  const res = fs.readFileSync(firstFile, "utf8");
  fs.writeFileSync(endFile, res, { encoding: "utf8", flag: "w" });
};

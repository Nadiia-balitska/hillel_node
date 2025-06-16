// Task 02
const fs = require("fs");

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

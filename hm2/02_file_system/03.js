// Task 03
const fs = require("fs");

module.exports = (path) => {
  try {
    const stats = fs.statSync(path);
    return stats.isFile() ? stats.size : 0;
  } catch (error) {
    return 0;
  }
};

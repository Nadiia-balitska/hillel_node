const path = require("path");

module.exports = (name) => {
  return path.resolve(__dirname, name);
};

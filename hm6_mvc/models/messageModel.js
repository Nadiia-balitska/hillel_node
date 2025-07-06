const fs = require("fs");
const path = require("path");
const he = require("he");

const messagePath = path.join(__dirname, "../config/data.json");

function getAll() {
  if (!fs.existsSync(messagePath)) {
    return [];
  }

  const date = fs.readFileSync(messagePath, "utf8");
  return JSON.parse(date);
}
function add(username, text) {
  const messages = getAll();

  const safeMessage = {
    safeName: he.encode(username),
    safeText: he.encode(text),
  };
  messages.push(safeMessage);

  fs.writeFileSync(messagePath, JSON.stringify(messages, null, 2), "utf8");
}

module.exports = {
  getAll,
  add,
};

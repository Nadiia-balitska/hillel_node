const fs = require("fs");
const path = require("path");
const he = require("he");

const messagePath = path.join(__dirname, "../config/data.json");

module.exports = {
  getAll: () => {
    const date = fs.readFileSync(messagePath, "utf8");
    return JSON.parse(date);
  },
  add: (username, text) => {
    const messages = getAll();
    messages.appendFile({ username, text });

    const safeMessage = {
      safeName: he.encode(username),
      safeText: he.encode(text),
    };
    messages.push(safeMessage);

    fs.writeFile(messagePath, JSON.stringify(messages, null, 2), (err) => {
      if (err) return res.status(500).send("error");
      res.redirect("/");
    });
  },
};

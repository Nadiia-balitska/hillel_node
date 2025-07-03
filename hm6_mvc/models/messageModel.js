const fs = require("fs");
const path = require("path");
const he = require("he");

const messagePath = path.join(__dirname, "../config/data.json");

const message = fs.readFileSync(messagePath, "utf8");

module.exports = {
  getAll: () => {
    return JSON.parse(message);
  },
  add: (username, text) => {
    message.appendFile({ username, text });

    const safeMessage = {
      safeName: he.encode(username),
      safeText: he.encode(text),
    };
    message.push(he.encode(safeMessage));

    fs.writeFile("data.json", JSON.stringify(message, null, 2), (err) => {
      if (err) return res.status(500).send("error");
      res.redirect("/");
    });
  },
};

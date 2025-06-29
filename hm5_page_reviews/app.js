const config = require("config");
console.log(config);

const path = require("path");
const fs = require("fs");
const he = require("he");

const express = require("express");
const app = express();

const data = require("./message.json");

app.listen(config.port, () =>
  console.log(`express work on: http://localhost:${config.port}/form`)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("main", {});
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.post("/form", (req, res) => {
  const { username, message } = req.body;
  const newEntry = {
    username: he.encode(username),
    message: he.encode(message),
    timestamp: new Date().toLocaleString(),
  };
  data.push(newEntry);

  fs.writeFile("message.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.status(500).send("error");
    res.redirect("/guests");
  });
});

app.get("/guests", (req, res) => {
  res.render("guests", {
    guests: data,
  });
});

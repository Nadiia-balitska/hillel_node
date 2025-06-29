const config = require("config");
console.log(config);

const path = require("path");
const fs = require("fs");
const he = require("he");

const express = require("express");
const app = express();

const data = require("./data.json");
// console.log(data);

app.listen(
  config.port,
  () => `express work on: http://localhost:${config.port}`
);

// POST data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //  form-urlencoded

// template
app.set("view engine", "pug");
// view folder
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("main", {
    t1: "hi",
    t2: "<mark>some mark text</mark>",
    b: 1,
    y: 27,
    data1: [22, 33, 44],
    price: 12000.4,
    fractaion: 5.3737363,
  });
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.post("/form", (req, res) => {
  const { text } = req.body;
  console.log(text);
  data.push(he.encode(text));
  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.status(500).send("error");
    res.redirect("/base");
  });
});

app.get("/base", (req, res) => {
  // xss
  res.render("base", {
    data: data,
  });
});

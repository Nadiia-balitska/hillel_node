const config = require("config");

const path = require("path");
const fs = require("fs");
const he = require("he");

const data = require("./data.json");

const express = require("express");
const app = express();

app.listen(config.port, () => {
  console.log(`Server is running in port  http://localhost:${config.port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//template
app.set("view engine", "pug");
//view folder
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("main", {
    t1: "hi",
    t2: "<mark>some mark text</mark>",
    b: true,
    y: 18,
    data1: [22, 33, 44],
    price: 12000.5,
    fractaio: 3.5889,
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
    if (err) return res.status(500), send("error");
    res.redirect("/base");
  });
});

app.get("/base", (req, res) => {
  //xss міжсайтовий вивід
  res.render("base", {
    data: data,
  });
});

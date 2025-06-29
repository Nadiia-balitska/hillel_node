const config = require("config");
console.log(config);

const path = require("path");
const fs = require("fs");

const json = require("./public/sample.json");
console.log(json);

const express = require("express");
const app = express();

app.listen(
  config.port,
  () => `express work on: http://localhost:${config.port}`
);

// POST data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //  form-urlencoded

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/get-json", (req, res) => {
  res.json(json);
  // const filePath = path.join(__dirname, 'public', 'sample.json');

  // fs.readFile(filePath, 'utf8', (err, data) => {
  //     if (err) {
  //         return res.status(500).send('File error');
  //     }

  //     try {
  //         const json = JSON.parse(data);
  //         res.json(json);
  //     } catch (e) {
  //         res.status(500).send('JSON error');
  //     }
  // });
});

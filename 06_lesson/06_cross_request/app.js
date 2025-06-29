const config = require("config");
console.log(config);

const path = require("path");
const fs = require("fs");

const express = require("express");
const app = express();

app.listen(
  config.port,
  () => `express work on: http://localhost:${config.port}`
);

// POST data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //  form-urlencoded

app.get("/", (req, res) => {
  res.send("server 2");
});

app.get("/fetch", async (req, res) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  res.json(data);
});

app.get("/fetch2", async (req, res) => {
  const response = await fetch("http://localhost:3070/get-json");
  const data = await response.json();
  res.json(data);
});

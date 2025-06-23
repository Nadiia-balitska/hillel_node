const express = require("express");
const config = require("config");

const app = express();
app.listen(config.port, () =>
  console.log(`Server is running in port  http://localhost:${config.port}`)
);

app.get("/", (req, res) => {
  res.send("home");
});

app.get("/json", (req, res) => {
  res.json({
    title: "express",
    success: 1,
  });
});

app.get("/redirect", (req, res) => {
  res.redirect("/json");
});

app.get("/goods/:id", (req, res) => {
  res.json({
    url: "goods",
    id: "one",
  });
});

app.get("/q", (req, res) => {
  res.json(req.query);
});

app.get("/random", (req, res) => {
  const min = parseInt(req.query.min);
  const max = parseInt(req.query.max);
  const random = Math.random(min, max);
  res.json({ min, max, random });
});

app.use((req, res) => {
  res.status(400).send("not found");
});

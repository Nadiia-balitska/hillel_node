const path = require("path");

const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
// app.use(express.static('public')); //we will not use it today
app.use(cors());

const SECRET_KEY = "super_secret_key"; //  Зберігайте у .env у реальному проєкті!!!!!!!!!!!!

app.get("/", (req, res) => {
  res.json({
    data: "Main page text",
    title: "Main page",
  });
});

app.get("/about", (req, res) => {
  res.json({
    data: "About text text about",
    title: "About page",
  });
});

app.post("/login", (req, res) => {});

app.get("/dashboard", (req, res) => {
  res.json({
    data: [
      "To be, or not to be, that is the question:",
      "Whether 'tis nobler in the mind to suffer",
      "The slings and arrows of outrageous fortune,",
      "Or to take arms against a sea of troubles",
    ],
    title: "Dashboard",
  });
});

app.listen(3100, () => {
  console.log("Server work on  http://localhost:3100");
});

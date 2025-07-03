const path = require("path");
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

const app = express();

const messageRoutes = require("./routes/messageRoutes.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));

//*Morgan для роботи з консоллю
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  }
);
app.use(morgan("tiny", { stream: accessLogStream }));

app.use("/", messageRoutes);

app.use((req, res) => {
  res.status(404).render("notFound");
});

module.exports = app;

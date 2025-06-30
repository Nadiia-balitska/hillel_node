const config = require("config");

const path = require("path");
const fs = require("fs");
const morgan = require("morgan");

const express = require("express");
const app = express();

const mainRouter = require("./routes/main.js");
const aboutRouter = require("./routes/about.js");

//Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

//*Morgan для роботи з консоллю
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  }
);
app.use(morgan("tiny", { stream: accessLogStream }));
// app.use(morgan("combined"));
// app.use(morgan("tiny"));

app.listen(config.port, () =>
  console.log(`express work on: http://localhost:${config.port}`)
);

app.use("/", mainRouter);
app.use("/about", aboutRouter);

app.use(function (req, res, next) {
  // next(createError(404));
});

app.use(function (req, res, next) {
  res.render("error");
});

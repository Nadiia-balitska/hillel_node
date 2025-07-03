const path = require("path");
const fs = require("fs");
const morgan = require("morgan");

const express = require("express");
const app = express();

const debugRoute = require("debug")("app:route");
const debugDB = require("debug")("app:db");

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

app.use((req, res, next) => {
  debugRoute(`route: ${req.method} ${req.url}`);
  debugDB(`some text `);

  next();
});

app.use("/", mainRouter);
app.use("/about", aboutRouter);

app.use((req, res, next) => {
  // next(createError(404));
});

app.use(function (req, res, next) {
  res.render("error");
});

module.exports = app;

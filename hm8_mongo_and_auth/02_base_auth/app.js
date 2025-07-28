const config = require("config");
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const sessionMiddleware = require("./db/session");
const loadTasks = require("./utils/tasks");

const { dbConnect } = require("./db/db");

const app = express();

// Setups
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static(`${__dirname}/assets`));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(sessionMiddleware);

app.use(
  morgan("tiny", {
    skip: (req) => req.url.startsWith("/.well-known"),
  })
);

app.use((req, res, next) => {
  app.locals.email = req.session?.email || null;
  next();
});

dbConnect()
  .then(async ({ usersCollection, articlesCollection, tasksCollection }) => {
    await loadTasks(tasksCollection);
    // pseudo  Immediately Invoked Function Expression (IIFE)
    app.use("/", require("./routes/index")({ articlesCollection }));
    app.use("/", require("./routes/auth")({ usersCollection }));
    app.use(
      "/",
      require("./routes/dashboard")({ tasksCollection, usersCollection })
    );

    app.listen(3500, () => {
      console.log("Server http://localhost:3500");
    });
  })
  .catch((err) => {
    console.error("DB Connection Failed:", err.message);
    process.exit(1);
  });

const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const bodyParser = require("body-parser");
const FileStore = require("session-file-store")(session);

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    store: new FileStore({
      path: "./sessions",
      ttl: 3600, // sec,
      retries: 1,
    }),
    secret: "s8sd9sdf8hnr4n432r",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // ms
    },
  })
);

app.use((req, res, next) => {
  app.locals.username = req.session?.user || null;
  next();
});

app.get("/", (req, res) => {
  res.render("main");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  // аутентифікація
  if (
    (username === "admin" && password === "123") ||
    (username === "alex" && password === "777")
  ) {
    // хто ти?
    req.session.user = username;
  }
  res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
  // авторизація
  // що дозволяємо юзеру
  //
  if (!req.session.user) return res.redirect("/login");
  res.render("dashboard", {
    username: req.session.user,
  });
});

app.listen(3100, () => console.log(`http://localhost:3100`));

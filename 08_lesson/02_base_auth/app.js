const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const bodyParser = require("body-parser");
const fileStore = require("session-file-store")(session);

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");
app.use(morgan("tiny"));

app.use(express.json);
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false })); // для того щоб розібрати кукі у вигляді об*єкту

app.use(
  session({
    store: new fileStore({
      path: "./sessions",
      ttl: 3600, // seconds//how long session will be live in brouser
      retries: 1, //спроби перезапису файлу
    }),
    secret: "jfjamfhasf", //secret key that not downloads to github.
    resave: false, // dont save sessio for not to press the site
    saveUninitialized: false,

    cookie: {
      maxAge: 3600000, //milliseconds
    },
  })
);

//щоб змінні були глобальні і видимі для всіх
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
  //*аyтентифікація = хто ти, впізнання користувача
  if (
    (username === "admin" && password === "123") ||
    (username === "alex" && password === "777")
  ) {
    req.session.user = username; // поставили в сесію ім*я юзера
  }
  res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
  //*авторизація == що дозволяєму юзеру а що ні
  if (!req.session.user) return res.redirect("/login");
  res.render("dashboard", {
    username: req.session.user,
  });
});

app.listen(3100, () => console.log(`http://localhost:3100`));

const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const bodyParser = require("body-parser");
const app = express();

//Mongo
const MongoStore = require("connect-mongo"); // для зберігання наших сесій у монгодб

const { MongoClient } = require("mongodb"); // щод під*єднуватися до бази даних і виконувати наші запити
const bcrypt = require("bcrypt"); // для хешування паролей

//connecting to database
const mongoUrl = "mongodb://localhost:27017/site";
const client = new MongoClient(mongoUrl);
let usersCollection, articlesCollection; //collections which we will use from or put in

async function connectDB() {
  try {
    const articles = await articlesCollection
      .find({ published: true })
      .toArray();
    // console.log(articles);
    res.render("main", { articles: articles });
  } catch (err) {
    // res.status(500).send("server error");
  }
}

// Налаштування шаблонізатора
app.set("view engine", "pug");
app.set("views", "./views");
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    store: MongoStore.create({}),
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

app.get("/", async (req, res) => {
  try {
    const articles = await articlesCollection
      .find({ published: true })
      .toArray();
    // console.log(articles);
    res.render("main", { articles: articles });
  } catch (err) {
    res.status(500).send("server error");
  }
});

app.get("/article/:url", async (req, res) => {
  try {
    const article = await articlesCollection.findOne({ url: req.params.url });
    console.log(article);
    res.render("article", { article: article });
  } catch (err) {
    res.status(500).send("server error");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
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

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

connectDB().then(() => {
  app.listen(3000, () => console.log(`http://localhost:3000`));
});

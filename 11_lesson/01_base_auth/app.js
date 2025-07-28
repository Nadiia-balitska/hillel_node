const express = require("express");
const session = require("express-session");
const morgan = require("morgan");

const bodyParser = require("body-parser");
const app = express();

// Mongo
const MongoStore = require("connect-mongo");

const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

const mongoUrl = "mongodb://localhost:27017/site";
const client = new MongoClient(mongoUrl);
let usersCollection, articlesCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("site");
    articlesCollection = db.collection("articles");
    usersCollection = db.collection("users");
    console.log("Mongo db work");
  } catch (err) {
    console.log(err);
  }
}

// Налаштування шаблонізатора
app.set("view engine", "pug");
app.set("views", "./views");
// статика
app.use(express.static(`${__dirname}/assets`));

// Для роботи з кукі
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl,
      collectionName: "sessions",
      ttl: 60 * 60,
    }),
    secret: "your_secret_key_39393", // Ваш секрет для кукі
    resave: false, // не зберігати якщо не змінювалась
    saveUninitialized: false, // не зберігати в теку якщо не добавляли дані
    cookie: {
      maxAge: 3600000, // Час життя кукі у мс (1 час)
    },
  })
);

app.use(
  morgan("tiny", {
    skip: (req) => req.url.startsWith("/.well-known"),
  })
);

app.use((req, res, next) => {
  // app.locals.username = req.session?.user || null;
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

app.get("/articles", async (req, res) => {
  try {
    const articles = await articlesCollection
      .find({ published: true })
      .toArray();
    console.log(articles);
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

app.get("/common", (req, res) => {
  res.render("common");
});

// Сторінка логіну
app.get("/login", (req, res) => {
  res.render("login");
});

const prepareString = (str) => str.trim().toLowerCase();
// Обробка форми логіну
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (email === undefined || password === undefined)
      return res.render("login", { error: "Некоректний логін або пароль" });

    const formattedEmail = prepareString(req.body.email);

    const user = await usersCollection.findOne({ email: formattedEmail });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        req.session.role = user.role;
        req.session.user = user.username;
        req.session.email = user.email;
        return res.redirect("/dashboard");
      } else {
        return res.render("login", { error: "Невірний логін або пароль" });
      }
    } else {
      return res.render("login", { error: "Невірний логін або пароль" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

app.get("/signin", (req, res) => {
  res.render("signin", {});
});

app.post("/signin", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // перевіряємо чи є людина з таким емейл
    const user = await usersCollection.findOne({ email: email });
    if (!user) {
      req.session.user = username;
      req.session.email = email;
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const result = await usersCollection.insertOne({
        username: username,
        email: email,
        password: hashPassword,
        role: "user",
        createdAt: new Date().toISOString(),
      });
      res.redirect("/dashboard");
    } else {
      return res.render("signin", { error: "Емейл вже зареєстровано" });
    }
  } catch (err) {}
});

// Захищена сторінка
app.get("/dashboard", async (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  try {
    const users = await usersCollection.find({ role: "user" }).toArray();
    res.render("dashboard", { users });
  } catch (err) {
    console.log(err);
    res.status(500).send("Помилка сервера");
  }
});

// Вихід
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// Запуск
connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Сервер запущено на http://localhost:3000");
  });
});

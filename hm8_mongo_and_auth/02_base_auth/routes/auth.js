module.exports = function ({ usersCollection }) {
  const express = require("express");
  const router = express.Router();
  const bcrypt = require("bcrypt");

  router.get("/register", (req, res) => {
    res.render("register");
  });

  router.post("/register", async (req, res) => {
    let { role, email, password } = req.body;

    email = (email || "").trim().toLowerCase();
    password = (password || "").trim();
    role = (role || "user").toLowerCase();

    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return res.render("register", { error: "Емейл вже зареєстровано" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({
      role,
      email,
      password: hashPassword,
      createdAt: new Date().toISOString(),
    });

    req.session.email = email;
    req.session.role = role;

    res.redirect("/dashboard");
  });

  router.get("/login", (req, res) => {
    res.render("login");
  });

  router.post("/login", async (req, res) => {
    let { email, password } = req.body;

    email = (email || "").trim().toLowerCase();
    password = (password || "").trim();

    const user = await usersCollection.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.email = user.email;
      req.session.role = user.role;
      return res.redirect("/dashboard");
    }

    res.render("login", { error: "Невірний логін або пароль" });
  });

  router.get("/logout", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  });

  return router;
};

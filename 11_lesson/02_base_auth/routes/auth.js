module.exports = function ({ usersCollection }) {

  const express = require('express');
  const router = express.Router();
  const bcrypt = require('bcrypt');

  router.get('/login', (req, res) => {
    res.render('login');
  });

  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await usersCollection.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = user.username;
      req.session.email = user.email;
      return res.redirect('/dashboard');
    }

    res.render('login', { error: 'Невірний логін або пароль' });
  });

  router.get('/signin', (req, res) => {
    res.render('signin');
  });

  router.post('/signin', async (req, res) => {
    const { username, email, password } = req.body;
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return res.render('signin', { error: 'Емейл вже зареєстровано' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({
      username,
      email,
      password: hashPassword,
      role: 'user',
      createdAt: new Date().toISOString()
    });

    req.session.user = username;
    req.session.email = email;
    res.redirect('/dashboard');
  });

  router.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  });

  return router;
}
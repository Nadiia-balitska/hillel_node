// route factory pattern

module.exports = function({ articlesCollection }) {
  const express = require('express');
  const router = express.Router();

  router.get('/', async (req, res) => {
    const articles = await articlesCollection.find({ published: true }).toArray();
    res.render('main', { articles });
  });

  router.get('/article/:url', async (req, res) => {
    const article = await articlesCollection.findOne({ url: req.params.url });
    res.render('article', { article });
  });

  return router;
};

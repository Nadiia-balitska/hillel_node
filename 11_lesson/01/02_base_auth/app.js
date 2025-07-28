const config = require('config');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const sessionMiddleware = require('./db/session');

const { connectDB } = require('./db/db');

const app = express();

const authRouter = require('./routes/auth');

// Setups
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(`${__dirname}/assets`));
app.use(bodyParser.urlencoded({ extended: false }));


app.use(sessionMiddleware);

app.use(morgan('tiny', {
  skip: req => req.url.startsWith('/.well-known')
}));

app.use((req, res, next) => {
  // app.locals.username = req.session?.user || null;
  next();
});

connectDB().then(({ usersCollection, articlesCollection }) => {
  console.log('routing generate');
  // pseudo  Immediately Invoked Function Expression (IIFE)
  app.use('/', require('./routes/index')({ articlesCollection }));
  app.use('/', authRouter({ usersCollection}));
  app.use('/', require('./routes/dashboard')({ usersCollection }));

  app.listen(config.port, () => {
    console.log('Сервер запущено на http://localhost:' + config.port);
  });
});

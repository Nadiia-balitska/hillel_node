const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const codesFile = path.join(__dirname, 'codes.json');
let codes = fs.existsSync(codesFile) ? JSON.parse(fs.readFileSync(codesFile)) : {};

const bodyParser = require('body-parser');
const app = express();

// Налаштування шаблонізатора
app.set('view engine', 'pug');
app.set('views', './views');
// статика
app.use(express.static(`${__dirname}/assets`));

// Для роботи з кукі
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  store: new FileStore({
    path: './sessions',      // Тека де зберігаються сесії
    ttl: 3600,               // Час життя сесії у секундах (1 час)
    retries: 1,              // Спроб запису файлу
  }),
  secret: 'your_secret_key_39393', // Ваш секрет для кукі
  resave: false, // не зберігати якщо не змінювалась
  saveUninitialized: false, // не зберігати в теку якщо не добавляли дані
  cookie: {
    maxAge: 3600000          // Час життя кукі у мс (1 час)
  },
}));

app.use(morgan('tiny', {
  skip: (req) => req.url.startsWith('/.well-known'),
}))



app.use((req, res, next) => {
  app.locals.username = req.session?.user || null;
  next();
});

app.get('/', (req, res) => {
  console.log(req.session.user);
  res.render('main',)
});

app.get('/common', (req, res) => {
  res.render('common')
});


// Сторінка логіну
app.get('/login', (req, res) => {
  res.render('login');
});



app.post('/send-code', (req, res) => {
  const email = req.body.email;
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-значный код
  console.log(code);

  codes[email] = {
    code,
    created: Date.now()
  };
  saveCodes();
  res.render('email', { 'email': email })
});

app.post('/verify', (req, res) => {
  const { email, code } = req.body;
  const entry = codes[email];

  if (entry && entry.code === code && Date.now() - entry.created < 10 * 60 * 1000) {
    delete codes[email];
    saveCodes();
    req.session.user = email;
    return res.redirect('/dashboard');
  }
  else {
    req.session.destroy(() => {
      res.render('login', { error: 'Невірний логін або пароль' });
    });
  }
});




// Захищена сторінка
app.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('dashboard', { user: req.session.user });
});

// Вихід
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

function saveCodes() {
  fs.writeFileSync(codesFile, JSON.stringify(codes, null, 2));
}

// Запуск
app.listen(3000, () => {
  console.log('Сервер запущено на http://localhost:3000');
});

const path = require('path');

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

const SECRET_KEY = 'super_secret_key'; //  Зберігайте у .env у реальному проєкті!!!!!!!!!!!!

app.get('/', (req, res) => {
  res.json({
    data: "Main page text",
    title: "Main page"
  });
});

app.get('/about', (req, res) => {
  res.json({
    data: "About text text about",
    title: "About page"
  });
});

app.get('/dashboard', verifyToken, (req, res) => {
  res.json({
    data: ['To be, or not to be, that is the question:', 'Whether \'tis nobler in the mind to suffer', 'The slings and arrows of outrageous fortune,', 'Or to take arms against a sea of troubles'],
    title: "Dashboard"
  });
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '123') {
    // Генеруємо токен на 1 годину
    const token = jwt.sign({username}, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Невірний логін або пароль' });
});




// Middleware для перевірки токена
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(403).json({ message: 'Немає токена' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Недійсний токен' });

    req.user = user;
    next();
  });
}

app.listen(3100, () => {
  console.log('Server work on  http://localhost:3100');
});

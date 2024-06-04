const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');
const users = require('./userData.json');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const SECRET_KEY = 'your_secret_key';
const TOKEN_EXPIRATION = '3m';

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
    res.json({ accessToken: token });
  } else {
    res.status(401).json({ message: 'Неправильный логин или пароль' });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Невалидный токен' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(401).json({ message: 'Невалидный токен' });

    const decodedToken = jwt.decode(token, { complete: true });
    const expirationTime = decodedToken.payload.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    const timeToLive = expirationTime - currentTime;

    req.user = user;
    req.tokenTTL = timeToLive;
    next();
  });
}

app.get('/profile', authenticateToken, (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    tokenTTL: req.tokenTTL
  });
});

app.use((req, res) => {
  res.status(404).send(`<h1 style="text-align: center;">Error 404: Page not found</h1>`);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));

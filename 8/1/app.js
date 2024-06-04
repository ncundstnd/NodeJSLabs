const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const fs = require('fs');

// JSON объект с разрешенными данными для аутентификации
const users = require('./userData.json');
const app = express();

// ----------------Настройка passport---------

passport.use(new LocalStrategy(
  (username, password, done) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect username or password' });
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// ------------------------------------------------

// ----------------Настройка роутов----------------

app.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/profile');
  } else {
    fs.readFile('loginForm.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading loginForm.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}));

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error logging out');
    } else {
      res.redirect('/login');
    }
  });
});

app.get('/profile', isAuthenticated, (req, res) => {
  res.send(`<h1 style="text-align: center;">Authenticated user: ${req.user.username}</h1>`);
});

app.use((req, res) => {
  res.status(404).send(`<h1 style="text-align: center;">Error 404: Page not found</h1>`);
});

// ------------------------------------------------

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));

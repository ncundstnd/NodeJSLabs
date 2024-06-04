const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const path = require('path');

const app = express();

// Конфигурация OAuth с использованием GitHub
passport.use(new GitHubStrategy({
  clientID: '',
  clientSecret: '',
  callbackURL: 'http://localhost:3000/auth/github/callback'
},
function(accessToken, refreshToken, profile, done) {
  // Сохранение профиля пользователя в сессии
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'GitHub.html'));
});

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/resource');
  }
);

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

app.get('/resource', isAuthenticated, (req, res) => {
  res.send(`
    <h1>RESOURCE</h1>
    <p>User: ${req.user.username}</p>
    <p>ID: ${req.user.id}</p>
    <img src="${req.user.photos[0].value}" alt="Profile Picture">
  `);
});

app.use((req, res) => {
  res.status(404).send(`<h1 style="text-align: center;">Error 404: Page not found</h1>`);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));

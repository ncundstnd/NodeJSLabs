const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const path = require('path');

const app = express();

passport.use(new GoogleStrategy({
  clientID: '',
  clientSecret: '',
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
function(token, tokenSecret, profile, done) {
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
  res.sendFile(path.join(__dirname, 'views', 'Google.html'));
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
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
    <p>User: ${req.user.displayName}</p>
    <p>ID: ${req.user.id}</p>
    <img src="${req.user.photos[0].value}" alt="Profile Picture">
  `);
});

app.use((req, res) => {
  res.status(404).send(`<h1 style="text-align: center;">Error 404: Page not found</h1>`);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));

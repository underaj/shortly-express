var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.login(username, password)
      .then(PwIsCorrect => done(null, username))
      .catch(err => done(null, false, { message: 'Incorrect password.' }));
  }
));

passport.serializeUser(function(username, done) {
  done(null, username);
});

passport.deserializeUser(function(username, done) {
  new User({'username': username})
  .fetch()
  .then(function(userObj) {
    done(null, userObj);
  })
  .catch(done);
});
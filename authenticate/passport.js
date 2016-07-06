var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../app/models/user');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.login(username, password)
      .then(PwIsCorrect => done(null, username))
      .catch(err => done(null, false, { message: 'Incorrect password.' }));
  }
));

passport.use(new GoogleStrategy({
  clientID: '144260601504-gr3aagd7dk3k98vuskoer7spdrlc53cg.apps.googleusercontent.com',
  clientSecret: '-msqytutkdglOxsc5Tb-mp-X',
  callbackURL: 'http://localhost:4568/auth/google/callback'
},
  function(token, tokenSecret, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    // });
    return done(null, profile);
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

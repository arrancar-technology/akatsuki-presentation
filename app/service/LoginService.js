var loginService
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , ObjectID = require('mongodb').ObjectID;

function LoginService(compound) {
  var db = require('./DbService')(compound);

  function findById(id, fn) {
    var _id = new ObjectID(id);
    db.collection('users').findOne({_id: _id}, function (err, user) {
      if (err) { console.log('>> err: ', err); }
      console.log('>> user: ', user);
      return fn(null, user);
    });
  }

  function findByEmail(email, fn) {
    db.collection('users').findOne({email: email}, function (err, user) {
      if (err) { console.log('>> err: ', err); }
      console.log('>> user: ', user);
      return fn(null, user);
    });
  }

  // Passport session setup.
  //   To support persistent login sessions, Passport needs to be able to
  //   serialize users into and deserialize users out of the session.  Typically,
  //   this will be as simple as storing the user ID when serializing, and finding
  //   the user by ID when deserializing.
  passport.serializeUser(function (user, done) {
    done(null, user._id.toString());
  });

  passport.deserializeUser(function (id, done) {
    findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy(
    {usernameField: 'email'},
    function (email, password, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {

        // Find the user by email.  If there is no user with the given
        // email, or the password is not correct, set the user to `false` to
        // indicate failure and set a flash message.  Otherwise, return the
        // authenticated `user`.
        findByEmail(email, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: 'Unknown email ' + email });
          }
          if (user.password !== password) {
            return done(null, false, { message: 'Invalid password' });
          }
          return done(null, user);
        });
      });
    }
  ));
}

LoginService.prototype.initialize = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());
};

LoginService.prototype.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login/admin?redirectUrl=' + req.url);
};

module.exports = {
  init: function (compound) {
    if (!loginService) {
      loginService = new LoginService(compound);
    }

    return loginService;
  },
  getInstance: function() {
    return loginService;
  }
};


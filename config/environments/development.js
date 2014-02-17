var express = require('express');

module.exports = function (compound) {
  var app = compound.app;

  var environment = 'development';
  app.configure(environment, function () {
    app.enable('log actions');
    app.enable('env info');
    app.enable('watch');
    app.enable('force assets compilation');
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

    // Create users
    var db = require('./../../app/service/DbService')(compound);
    db.collection('users').drop(function() {
      console.log('>> dropped the users collection...');

      var users = [{username: 'admin', email: 'admin@akatsuki.com', password: 'password'}];
      users.forEach(function(user) {
        db.collection('users').save(user, function(err, result) {
          if (err) console.log('>> err: ', err);
          if (result) console.log('>> created user: ', result.username);
        });
      });
    });
  });
};

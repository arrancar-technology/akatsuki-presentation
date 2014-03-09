var express = require('express')
  , config = require('./config');

module.exports = function (compound) {
  var app = compound.app;

  app.configure(function () {
    var environment = process.env.NODE_ENV || 'development';
    app.set('config', config[environment]);

    app.use(express.compress());
    app.use(express.static(app.root + '/public', { maxAge: 86400000 }));
    app.set('jsDirectory', '/javascripts/');
    app.set('cssDirectory', '/stylesheets/');
    app.set('cssEngine', 'stylus');
    app.set('view options', { layout: false });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('fJKL123jk'));
    app.use(express.session());

    var loginService = require('./../app/service/LoginService').init(compound);
    loginService.initialize(app);

    app.use(app.router);
  });

};

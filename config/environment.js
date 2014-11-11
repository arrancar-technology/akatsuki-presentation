var express = require('express')
  , config = require('./config')
  , robots = require('robots.txt');

module.exports = function (compound) {
  var app = compound.app;

  app.configure(function () {
    var environment = process.env.NODE_ENV || 'development';
    app.set('config', config[environment]);

    app.use(express.compress());
    app.use(express.static(app.root + '/public', { maxAge: 2592000000 }));
    app.set('jsDirectory', '/javascripts/');
    app.set('cssDirectory', '/stylesheets/');
    app.set('cssEngine', 'stylus');
    app.set('view engine', 'jade');
    app.set('view options', { layout: false });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('fJKL123jk'));
    app.use(express.session());
    app.use(robots(__dirname + '/robots.txt'));

    // Initialise LoginService
    var loginService = require('./../app/service/LoginService').init(compound);
    loginService.initialize(app);

    // Initialise UtilityService
    var db = require('./../app/service/DbService')(compound);
    db.collection('orders').find().sort({_id: -1}).limit(1).toArray(function(err, orders) {
      if (err) { console.log('>> err: ', err); }

      var utilityService = require('./../app/service/UtilityService'),
          lastReferenceNumber = orders[0] ? (orders[0].referenceNumber || utilityService.SEED_ORDER_REFERENCE_NUMBER) : utilityService.SEED_ORDER_REFERENCE_NUMBER;

      utilityService.init(lastReferenceNumber);
    });

    app.use(app.router);

    app.use(function(req, res){
      res.status(404);

      if (req.accepts('html')) {
        res.render('404', { title: "Simply Certificate" });
        return;
      }

      if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
      }

      res.type('txt').send('Not found');
    });


//    /*jshint unused: false */
//    app.use(function(err, req, res, next){ // [DK]: Expressjs requires 'next' to be there even if you don't use it
//      res.status(err.status || 500);
//      res.render('500', { title: "Simply Certificate" });
//    });
//    /*jshint unused: true */

    app.get('/404', function(req, res, next){
      next();
    });

    app.get('/403', function(req, res, next){
      var err = new Error('not allowed!');
      err.status = 403;
      next(err);
    });

    app.get('/500', function(req, res, next){
      next(new Error('keyboard cat!'));
    });
  });

};

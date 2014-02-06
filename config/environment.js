module.exports = function (compound) {

    var express = require('express');
    var app = compound.app;

    app.configure(function(){
        app.use(express.static(app.root + '/public', { maxAge: 86400000 }));
        app.set('jsDirectory', '/javascripts/');
        app.set('cssDirectory', '/stylesheets/');
        app.set('cssEngine', 'stylus');
        app.set('view options', { layout: false });
        app.use(express.bodyParser());
        app.use(express.cookieParser('fJKL123jk'));
        // app.use(express.session({secret: 'fJKL123jk'}));
        app.use(express.methodOverride());
        app.use(app.router);
    });

};

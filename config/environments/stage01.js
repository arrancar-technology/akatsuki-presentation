module.exports = function (compound) {
  var app = compound.app;

  var environment = 'stage01';
  app.configure(environment, function () {
    app.enable('watch');
    app.disable('assets timestamps');
    app.use(require('express').errorHandler());
    app.settings.quiet = true;
  });
};

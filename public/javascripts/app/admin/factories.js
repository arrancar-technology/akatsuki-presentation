(function() {
  var app, factories;

  factories = {
    Status: [
      '$resource', function($resource) {
        return $resource('/api/1/status/:section');
      }
    ]
  };

  app = angular.module(appName);

  app.factory(factories);

}).call(this);

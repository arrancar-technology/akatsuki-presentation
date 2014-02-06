(function() {
  var app, factories;

  factories = {
    Order: [
      "$resource", function($resource) {
        return $resource("/api/1/orders/:id", {
          id: "@id"
        }, {
          get: {
            method: 'GET',
            isArray: true
          },
          getOne: {
            method: 'GET'
          },
          create: {
            method: "POST"
          },
          update: {
            method: "PUT"
          }
        });
      }
    ]
  };

  app = angular.module(appName);

  app.factory(factories);

}).call(this);

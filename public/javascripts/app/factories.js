(function() {
  var app, factories;

  factories = {
    Customer: [
      "$resource", function($resource) {
        return $resource("/api/1/customers/:id", {
          id: "@id"
        }, {
          get: {
            method: 'GET',
            isArray: true
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

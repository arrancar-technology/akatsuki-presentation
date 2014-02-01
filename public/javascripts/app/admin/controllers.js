(function() {
  var app, controllers;

  controllers = {
    OrdersController: [
      "$scope", "Customer", "Lookups", function($scope, Customer, Lookups) {
        $scope.model = {};
        $scope.model.orders = Customer.get({}, function() {});
        $scope.filterByCertificateBirth = function(order) {
          return order.birth;
        };
        $scope.filterByCertificateMarriage = function(order) {
          return order.marriage;
        };
        return $scope.filterByCertificateDeath = function(order) {
          return order.death;
        };
      }
    ],
    StatusController: [
      '$scope', '$routeParams', 'Status', function($scope, $routeParams, Status) {
        return $scope.params = Status.get({
          section: $routeParams.section
        });
      }
    ]
  };

  app = angular.module(appName);

  app.controller(controllers);

}).call(this);

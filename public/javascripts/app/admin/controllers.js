(function() {
  var app, controllers;

  controllers = {
    OrdersController: [
      "$scope", "Order", "Lookups", function($scope, Order, Lookups) {
        $scope.model = {};
        $scope.model.lists = {};
        $scope.model.lists.birth = {};
        $scope.model.lists.birth.filter = 'received';
        $scope.model.lists.marriage = {};
        $scope.model.lists.marriage.filter = 'received';
        $scope.model.lists.death = {};
        $scope.model.lists.death.filter = 'received';
        $scope.model.orders = Order.get({}, function() {});
        return $scope.selectOrder = function(index) {
          return $scope.model.orderSelected = $scope.model.orders[index];
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

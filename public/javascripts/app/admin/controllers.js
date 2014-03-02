(function() {
  var app, controllers;

  controllers = {
    OrdersController: [
      "$scope", "Order", "Lookups", function($scope, Order, Lookups) {
        $scope.model = {};
        $scope.model.lists = {};
        $scope.model.lists.birth = {};
        $scope.model.lists.birth.filter = 'paid';
        $scope.model.lists.marriage = {};
        $scope.model.lists.marriage.filter = 'paid';
        $scope.model.lists.death = {};
        $scope.model.lists.death.filter = 'paid';
        $scope.model.orders = Order.get({}, function() {});
        $scope.selectOrder = function(orderId) {
          return $scope.model.orderSelected = $scope.model.orders.find(function(order) {
            return order._id === orderId;
          });
        };
        return $scope.saveOrder = function() {
          return Order.update({
            id: $scope.model.orderSelected._id
          }, $scope.model.orderSelected);
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

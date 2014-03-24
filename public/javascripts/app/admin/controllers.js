(function() {
  var app, controllers;

  controllers = {
    OrdersListSectionController: [
      "$scope", "Order", function($scope, Order) {
        $scope.model = {};
        $scope.model.orders = {};
        $scope.model.filter = 'paid';
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

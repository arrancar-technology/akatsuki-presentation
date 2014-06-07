(function() {
  var app, controllers;

  controllers = {
    OrdersListSectionController: [
      "$scope", "$http", "Order", function($scope, $http, Order) {
        $scope.model = {};
        $scope.model.orders = {};
        $scope.model.filter = 'paid';
        $scope.selectOrder = function(orderId) {
          return $scope.model.orderSelected = $scope.model.orders.find(function(order) {
            return order._id === orderId;
          });
        };
        $scope.emailCustomer = function(orderId) {
          var order;
          order = $scope.model.orders.find(function(order) {
            return order._id === orderId;
          });
          return $http({
            method: 'GET',
            url: '/admin/sendCheckingInEmail',
            params: {
              email: order.email,
              firstName: order.firstName,
              certificateType: order.certificate.type
            }
          }).success(function(data, status) {
            alert('Email sent successfully');
            order.status = 'done';
            return Order.update({
              id: order._id
            }, order);
          }).error(function(data, status) {
            return alert('Email sent failed!!!');
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

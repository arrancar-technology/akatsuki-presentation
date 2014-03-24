controllers =
  OrdersListSectionController: ["$scope", "Order", ($scope, Order) ->
    $scope.model = {}
    $scope.model.orders = {}
    $scope.model.filter = 'paid'

    $scope.selectOrder = (orderId) ->
      $scope.model.orderSelected = $scope.model.orders.find (order) -> order._id == orderId

    $scope.saveOrder = () ->
      Order.update id: $scope.model.orderSelected._id, $scope.model.orderSelected
  ]
  StatusController: ['$scope', '$routeParams', 'Status', ($scope, $routeParams, Status) ->
    $scope.params = Status.get(section: $routeParams.section)
  ]

app = angular.module appName
app.controller controllers

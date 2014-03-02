controllers =
  OrdersController: ["$scope", "Order", "Lookups", ($scope, Order, Lookups) ->
    $scope.model = {}
    $scope.model.lists = {}
    $scope.model.lists.birth = {}
    $scope.model.lists.birth.filter = 'paid'
    $scope.model.lists.marriage = {}
    $scope.model.lists.marriage.filter = 'paid'
    $scope.model.lists.death = {}
    $scope.model.lists.death.filter = 'paid'

    $scope.model.orders = Order.get {}, ->

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

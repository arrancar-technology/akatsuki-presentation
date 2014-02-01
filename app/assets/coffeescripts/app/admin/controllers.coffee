controllers =
  OrdersController: ["$scope", "Customer", "Lookups", ($scope, Customer, Lookups) ->
    $scope.model = {}
    $scope.model.orders = Customer.get {}, ->

    $scope.filterByCertificateBirth = (order) ->
      order.birth
    $scope.filterByCertificateMarriage = (order) ->
      order.marriage
    $scope.filterByCertificateDeath = (order) ->
      order.death
  ]
  StatusController: ['$scope', '$routeParams', 'Status', ($scope, $routeParams, Status) ->
    $scope.params = Status.get(section: $routeParams.section)
  ]

app = angular.module appName
app.controller controllers

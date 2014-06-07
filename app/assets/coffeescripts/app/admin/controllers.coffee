controllers =
  OrdersListSectionController: ["$scope", "$http", "Order", ($scope, $http, Order) ->
    $scope.model = {}
    $scope.model.orders = {}
    $scope.model.filter = 'paid'

    $scope.selectOrder = (orderId) ->
      $scope.model.orderSelected = $scope.model.orders.find (order) -> order._id == orderId

    $scope.emailCustomer = (orderId) ->
      order = $scope.model.orders.find (order) -> order._id == orderId
      $http({
        method: 'GET',
        url: '/admin/sendCheckingInEmail',
        params: {
          email: order.email,
          firstName: order.firstName,
          certificateType: order.certificate.type
        }
      })
        .success (data, status) ->
          alert('Email sent successfully')
          order.status = 'done'
          Order.update id: order._id, order
        .error (data, status) ->
          alert('Email sent failed!!!')

    $scope.saveOrder = () ->
      Order.update id: $scope.model.orderSelected._id, $scope.model.orderSelected
  ]
  StatusController: ['$scope', '$routeParams', 'Status', ($scope, $routeParams, Status) ->
    $scope.params = Status.get(section: $routeParams.section)
  ]

app = angular.module appName
app.controller controllers

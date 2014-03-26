directives =
  applyForm: [() ->
    restrict: 'E'
    scope:
      formtype: '@'
    controller: ['$scope', '$cookies', '$window', 'Order', 'PopoverService', ($scope, $cookies, $window, Order, PopoverService) ->
      $scope.model = {}
      $scope.model.order = new Order()
      $scope.model.order.status = 'created'
      $scope.proceed = ->
        $scope.model.submitted = true
        if $scope.apply_form.$valid
          $scope.model.order.certificate = {}
          $scope.model.order.certificate.type = $scope.formtype
          Order.create $scope.model.order, (order) ->
            $cookies.o_id = order._id
            $window.location.href = "/certificate/#{$scope.formtype}"
        PopoverService.initializePopover $(element).attr('id') for element in $(".applyForm input[required]")
    ]
    templateUrl: '/partials/form_apply'
  ]

app = angular.module appName
app.directive 'applyForm', directives.applyForm
directives =
  applyForm: [() ->
    restrict: 'E'
    scope:
      formtype: '@'
    controller: ['$scope', '$cookies', '$window', 'Order', 'PopoverService', ($scope, $cookies, $window, Order, PopoverService) ->
      $scope.model = {}
      $scope.model.order = new Order()
      $scope.proceed = ->
        $scope.model.submitted = true
        if $scope.apply_form.$valid
          Order.create $scope.model.order, (order) ->
            console.log 'order: ', order
            $cookies.o_id = order._id
            $window.location.href = "/certificate/#{$scope.formtype}"
        PopoverService.initializePopover $(element).attr('id') for element in $(".applyForm input[required]")
    ]
    templateUrl: '/partials/form_apply'
  ]

app = angular.module appName
app.directive 'applyForm', directives.applyForm
directives =
  apply: [() ->
    restrict: 'C'
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
        PopoverService.initializePopover $(element).attr('id') for element in $(".applyForm." + $scope.formtype + " input[required]")
    ]
    templateUrl: '/partials/form_apply'
  ]
  pricingPanel: [() ->
    restrict: 'E'
    scope:
      panelType: '@'
      panelStyle: '@'
      mostPopular: '@'
      scanAndEmail: '@'
      trackingEmail: '@'
      trackingSms: '@'
    controller: ['$scope', 'Lookups', ($scope, Lookups) ->
      $scope.model = {}
      $scope.model.serviceType = Lookups.serviceTypes[$scope.panelType]
    ]
    templateUrl: '/partials/price_panel'
  ]

app = angular.module appName
app.directive 'apply', directives.apply
app.directive 'pricingPanel', directives.pricingPanel
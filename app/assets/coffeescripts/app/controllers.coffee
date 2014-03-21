controllers =
  CertificateDetailsController: ["$scope", "$cookies", "$window", "Order", "Lookups", "PopoverService", ($scope, $cookies, $window, Order, Lookups, PopoverService) ->
    $scope.init = (type) ->
      $scope.type = type
      $scope.model = {}
      $scope.model.step = {}
      $scope.model.step[1] = {} # Certificate Details
      $scope.model.step[2] = {} # Additional Details
      $scope.model.step[3] = {} # Payment Details
      $scope.model.step.current = 1
      $scope.model.errors = {}

      orderId = $cookies.o_id
      $scope.model.order = new Order()
      if orderId
        Order.getOne
          id: orderId
          , (order) ->
            $scope.model.order._id = order._id
            $scope.model.order.firstName = order.firstName
            $scope.model.order.lastName = order.lastName
            $scope.model.order.email = order.email

      # Defaults
      $scope.model.order.status = 'created'
      $scope.model.order.certificate = {}
      $scope.model.order.certificate.type = $scope.type
      $scope.model.order.certificate.serviceType = 'standard'
      $scope.model.order.certificate.eventCountry = 'England and Wales'
      $scope.model.order.certificate.numberOfCopies = 1

      $scope.model.order.charge = {}

      $scope.model.order.address = {}
      $scope.model.order.address.country = 'GB'

      $scope.model.card = {}

      expiryYearStart = new Date().getFullYear()
      $scope.model.yearsExpiry = [expiryYearStart..expiryYearStart+15]
      $scope.model.numberOfCopies = [1..10]
      $scope.model.numberOfApostilles = [0..10]
      $scope.model.countries = Lookups.countries
      $scope.model.eventCountries = Lookups.eventCountries
      $scope.model.serviceTypes = Lookups.serviceTypes
      $scope.model.priceList = Lookups.priceList
      $scope.model.months = Lookups.months
      $scope.model.days = [1..31]

    $scope.goToStep = (step)->
      $scope.model.step.current = step
    $scope.previousStep = ->
      $scope.model.step.current--
    $scope.nextStep = ->
      $scope.model.step[$scope.model.step.current].submitted = true
      if $scope["#{$scope.type}_form"].$valid && $scope.model.step.current == 1
        $scope.model.step.current = 2
      else if $scope.address_form.$valid && $scope.model.step.current == 2
        $scope.model.step.current = 3
      else if $scope.payment_form.$valid && $scope.model.step.current == 3
        $scope.model.order.status = 'creating_charge_token'
        Stripe.card.createToken
          number: $scope.model.card.number
          cvc: $scope.model.card.cvc
          exp_month: $scope.model.card.expiryMonth
          exp_year: $scope.model.card.expiryYear
        , (status, response) ->
            if (response.error)
              $scope.model.order.status = 'error_creating_charge_token'
              $scope.model.errors.payment = Lookups.messages.errors[response.error.code]
              $scope.$apply()
            else
              $scope.model.order.status = 'created_charge_token'
              $scope.model.order.charge.token = response.id
              Order.create $scope.model.order, (result) ->
                if(result.code)
                  $scope.model.order.status = 'error_charging_token'
                  $scope.model.errors.payment = Lookups.messages.errors[result.code]
                  $scope.$apply()
                else
                  $window.location.href = "/certificate/success"
      else
        PopoverService.initializePopover $(element).attr('id') for element in $(".step.#{$scope.model.step.current} input[required]")
  ]

app = angular.module appName
app.controller controllers

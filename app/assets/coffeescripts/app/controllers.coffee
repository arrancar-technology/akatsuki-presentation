# Find bootstrap environment
findBootstrapEnvironment = ->
  envs = ["ExtraSmall", "Small", "Medium", "Large"]
  envValues = ["xs", "sm", "md", "lg"]
  $el = $("<div>")
  $el.appendTo $("body")
  i = envValues.length - 1

  while i >= 0
    envVal = envValues[i]
    $el.addClass "hidden-" + envVal
    if $el.is(":hidden")
      $el.remove()
      return envs[i]
    i--

# Initialize popovers
bootstrapEnv = findBootstrapEnvironment()
placement = (if (bootstrapEnv is "ExtraSmall") then "bottom" else "right")
popoverOptions =
  'trigger': "focus"
  'container': "body"
  'toggle': "popover"
  'placement': placement
  'original-title': ""
  'title': ""

popoverContents =
  "year-of-birth": "Please enter year of birth in YYYY format"
  "place-of-birth": "Please enter place of birth"
  "last-name-at-birth": "Please enter last name at birth"
  "first-name-at-birth": "Please enter first name at birth"
  "first-name": "Please enter your first name"
  "last-name": "Please enter your last name"
  "email": "Please enter your email address"
  "address-1": "Please enter your address"
  "city": "Please enter your city"
  "postcode": "Please enter your postcode"
  "phone": "Please enter your phone number"
  "cardholder-name": "Please enter cardholder's name as it is displayed on the card"
  "card-number": "Please enter 16 digit card number"
  "card-verification-number": "Please enter last 3 digits as it is displayed on signature strip"

initializePopover = (elementId) ->
  $("##{elementId}").popover(Object.merge(popoverOptions, {'content': popoverContents[elementId]}))

controllers =
  CertificateDetailsController: ["$scope", "$cookies", "Order", "Lookups", ($scope, $cookies, Order, Lookups) ->
    $scope.init = (type) ->
      $scope.type = type
      $scope.model = {}
      $scope.model.step = {}
      $scope.model.step[1] = {} # Certificate Details
      $scope.model.step[2] = {} # Additional Details
      $scope.model.step[3] = {} # Payment Details
      $scope.model.step.current = 1
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
      $scope.model.order.status = 'received'
      $scope.model.order.certificate = {}
      $scope.model.order.certificate.type = $scope.type
      $scope.model.order.certificate.numberOfCopies = 1

      $scope.model.order.card = {}
      $scope.model.order.card.type = 'visa'

      $scope.model.order.address = {}
      $scope.model.order.address.country = 'GB'

      expiryYearStart = new Date().getFullYear()
      $scope.model.yearsExpiry = [expiryYearStart..expiryYearStart+10]
      $scope.model.numberOfCopies = [1..10]
      $scope.model.numberOfApostilles = [0..10]
      $scope.model.countries = Lookups.countries
      $scope.model.cardTypes = Lookups.cardTypes
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
        # TODO: [DK] make payment request

        Order.create($scope.model.order)
      else
        initializePopover $(element).attr('id') for element in $(".step.#{$scope.model.step.current} input[required]")
  ]

app = angular.module appName
app.controller controllers

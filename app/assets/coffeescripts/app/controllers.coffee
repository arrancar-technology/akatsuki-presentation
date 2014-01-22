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

initializePopover = (elementId) ->
  $("##{elementId}").popover(Object.merge(popoverOptions, {'content': popoverContents[elementId]}))

controllers =
  CertificateDetailsController: ["$scope", "Customer", "Lookups", ($scope, Customer, Lookups) ->
    $scope.model = {}
    $scope.model.step = {}
    $scope.model.step[1] = {} # Certificate Details
    $scope.model.step[2] = {} # Additional Details
    $scope.model.step[3] = {} # Payment Details
    $scope.model.step.current = 1
    $scope.model.customer = new Customer()

    # Defaults
    $scope.model.customer.serviceRequest = {}
    $scope.model.customer.serviceRequest.numberOfCopies = 1

    $scope.model.customer.card = {}
    $scope.model.customer.card.type = 'visa'

    $scope.model.address = {}
    $scope.model.address.country = 'GB'

    $scope.goToStep = (step)->
      $scope.model.step.current = step
    $scope.previousStep = ->
      $scope.model.step.current--
    $scope.nextStep = ->
      $scope.model.step[$scope.model.step.current].submitted = true
      if $scope.birth_form.$valid
        $scope.model.step.current = 2
      else if $scope.service_request_form.$valid && $scope.address_form.$valid
        $scope.model.step.current = 3
      else if $scope.birth_form.$valid
        $scope.model.step.current = 4
      else
        initializePopover $(element).attr('id') for element in $(".step.#{$scope.model.step.current} input[required]")

    $scope.saveStepAdditionalInfo = ->
      Customer.create($scope.model.customer)

    $scope.model.numberOfCopies = [1..10]
    $scope.model.numberOfApostilles = [0..10]
    $scope.model.yearsExpiry = [2014..2020]
    $scope.model.countries = Lookups.countries
    $scope.model.cardTypes = Lookups.cardTypes
    $scope.model.months = Lookups.months
    $scope.model.days = [1..31]
  ]

app = angular.module 'main-app'
app.controller controllers

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
  CertificateDetailsController: ["$scope", "Customer", ($scope, Customer) ->
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
    $scope.model.customer.serviceRequest.numberOfApostilles = 1

    $scope.model.customer.card = {}
    $scope.model.customer.card.type = 'visa'

    $scope.goToStep = (step)->
      $scope.model.step.current = step
    $scope.previousStep = ->
      $scope.model.step.current--
    $scope.nextStep = ->
      if $scope.birth_form.$valid
        $scope.model.step.current++
      else
        initializePopover $(element).attr('id') for element in $(".step.#{$scope.model.step.current} input[required]")
      $scope.model.step[$scope.model.step.current].submitted = true

    $scope.saveStepAdditionalInfo = ->
      Customer.create($scope.model.customer)

    $scope.model.numberOfCopies = [1..10]
    $scope.model.numberOfApostilles = [1..10]
    $scope.model.yearsExpiry = [2014..2020]
    $scope.model.coutries = [] #TODO: [DK] find an up-to-date country list
    $scope.model.cardTypes =
      'visa': 'Visa',
      'visaDebit': 'Visa Debit',
      'master': 'Master',
      'maestro': 'Maestro'
    $scope.model.months =
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December'
    $scope.model.days = [1..31]
  ]

factories =
  Customer: ["$resource", ($resource) ->
    $resource "/api/1/customers/:id",
      id: "@id"
    ,
      create:
        method: "POST"
      update:
        method: "PUT"
  ]

app = angular.module 'main-app', ["ngResource"]

app.controller "CertificateDetailsController", controllers.CertificateDetailsController
app.factory "Customer", factories.Customer

# Show form when click on apply
$('.apply-button').on 'click', ->
  targetForm = $(@).data('target-form')
  $(".#{targetForm} .certificate-show").removeClass('hidden')
  $(".#{targetForm} .certificate-hide").addClass('hidden')

$('.animate-inview').one 'inview', ->
  setTimeout (->
    $('.animate').removeClass('invisible').addClass('animated')),
    500

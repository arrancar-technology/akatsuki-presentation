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
    $scope.model.steps = {}
    $scope.model.steps[1] = {} # Certificate Details
    $scope.model.steps[2] = {} # Additional Details
    $scope.model.steps[3] = {} # Payment Details
    $scope.model.steps.current = 1
    $scope.model.customer = new Customer()

    # Defaults
    $scope.model.customer.serviceRequest = {}
    $scope.model.customer.serviceRequest.numberOfCopies = 1
    $scope.model.customer.serviceRequest.numberOfApostilles = 1

    $scope.model.customer.card = {}
    $scope.model.customer.card.type = 'visa'

    $scope.goToStep = (step)->
      $scope.model.steps.current = step
    $scope.previousStep = ->
      $scope.model.steps.current--
    $scope.nextStep = ->
      if $scope.birth_form.$valid
        $scope.model.steps.current++
      else
        initializePopover $(element).attr('id') for element in $(".step.#{$scope.model.steps.current} input[required]")
      $scope.model.steps[$scope.model.steps.current].submitted = true

    $scope.saveStepAdditionalInfo = ->
      Customer.create($scope.model.customer)

    $scope.model.numberOfCopies = ({name: num, value: num} for num in [1..10])
    $scope.model.numberOfApostilles = ({name: num, value: num} for num in [1..10])
    $scope.model.yearsExpiry = ({name: num, value: num} for num in [2014..2020])
    $scope.model.coutries = []
    $scope.model.cardTypes = [
      name: 'Visa', value: 'visa'
    ,
      name: 'Visa Debit', value: 'visaDebit'
    ,
      name: 'Master', value: 'master'
    ,
      name: 'Maestro', value: 'maestro'
    ]
    $scope.model.months = [
      name: 'January', value: 1
    ,
      name: 'February', value: 2
    ,
      name: 'March', value: 3
    ,
      name: 'April', value: 4
    ,
      name: 'May', value: 5
    ,
      name: 'June', value: 6
    ,
      name: 'July', value: 7
    ,
      name: 'August', value: 8
    ,
      name: 'September', value: 9
    ,
      name: 'October', value: 10
    ,
      name: 'November', value: 11
    ,
      name: 'December', value: 12
    ]
    $scope.model.days = ({name: num, value: num} for num in [1..31])
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

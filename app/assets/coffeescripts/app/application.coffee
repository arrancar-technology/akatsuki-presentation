controllers =
  CertificateDetailsController: ["$scope", "Customer", ($scope, Customer) ->
    $scope.model = {}
    $scope.model.step = 1
    $scope.model.customer = new Customer()

    $scope.saveStepAdditionalInfo = ->
      console.log "value: b"
      $scope.model.customer.firstName = 'mmm'
      $scope.model.customer.lastName = 'iii'
      Customer.create($scope.model.customer)

    $scope.goToStep = (step)->
      $scope.model.step = step
    $scope.previousStep = ->
      $scope.model.step--
    $scope.nextStep = ->
      $scope.model.step++
  ]

app = angular.module('main-app', ["ngResource"])
app.controller("CertificateDetailsController", controllers.CertificateDetailsController)

app.factory "Customer", ["$resource", ($resource) ->
  $resource "/api/1/customers/:id",
    id: "@id"
  ,
    create:
      method: "POST"
    update:
      method: "PUT"
]

# Show form when click on apply
$('.apply-button').on 'click', ->
  targetForm = $(@).data('target-form')
  $(".#{targetForm} .certificate-show").removeClass('hidden')
  $(".#{targetForm} .certificate-hide").addClass('hidden')

$('.animate-inview').one 'inview', ->
  setTimeout (->
    $('.animate').removeClass('invisible').addClass('animated')),
    500
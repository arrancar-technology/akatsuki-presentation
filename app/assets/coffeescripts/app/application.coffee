controllers =
  CertificateDetailsController: ["$scope", "Customer", ($scope, Customer) ->
    $scope.model = {}
    $scope.model.step = 1
    $scope.model.customer = new Customer()

    $scope.goToStep = (step)->
      $scope.model.step = step
    $scope.previousStep = ->
      $scope.model.step--
    $scope.nextStep = ->
      $scope.model.step++

    $scope.saveStepAdditionalInfo = ->
      Customer.create($scope.model.customer)

    $scope.model.days = [
      name: '1', value: 1
    ,
      name: '2', value: 2
    ,
      name: '3', value: 3
    ,
      name: '4', value: 4
    ,
      name: '5', value: 5
    ,
      name: '6', value: 6
    ,
      name: '7', value: 7
    ,
      name: '8', value: 8
    ,
      name: '9', value: 9
    ,
      name: '10', value: 10
    ,
      name: '11', value: 11
    ,
      name: '12', value: 12
    ,
      name: '13', value: 13
    ,
      name: '14', value: 14
    ,
      name: '15', value: 15
    ,
      name: '16', value: 16
    ,
      name: '17', value: 17
    ,
      name: '18', value: 18
    ,
      name: '19', value: 19
    ,
      name: '20', value: 20
    ,
      name: '21', value: 21
    ,
      name: '22', value: 22
    ,
      name: '23', value: 23
    ,
      name: '24', value: 24
    ,
      name: '25', value: 25
    ,
      name: '26', value: 26
    ,
      name: '27', value: 27
    ,
      name: '28', value: 28
    ,
      name: '29', value: 29
    ,
      name: '30', value: 30
    ,
      name: '31', value: 31
    ]
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
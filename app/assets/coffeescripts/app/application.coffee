controllers =
  StatusController: ($scope) ->
#    console.log "value: #{$scope.value}"

app = angular.module('main-app', [])
app.controller("StatusController", controllers.StatusController)
app.directive "duplicate", ->
  restrict: "E"
  scope:
    value: "=ngModel"
  controller: "StatusController"
  templateUrl: "/partials/duplicate"

# Show form when click on apply
$('.apply-button').on 'click', ->
  targetForm = $(@).data('target-form')
  $(".#{targetForm} .certificate-show").removeClass('hidden')
  $(".#{targetForm} .certificate-hide").addClass('hidden')
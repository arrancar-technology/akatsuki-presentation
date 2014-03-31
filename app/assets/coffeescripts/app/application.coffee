appName = 'main-app'

app = angular.module appName, ["ngResource", "ngCookies", 'ui.bootstrap']

# Show form when click on apply
$('.apply-button').on 'click', ->
  targetForm = $(@).data('target-form')
  $(".#{targetForm} .certificate-show").removeClass('hidden')
  $(".#{targetForm} .certificate-hide").addClass('hidden')
  $(".#{targetForm}").find('input').first().focus()

$('.animate-inview').one 'inview', ->
  setTimeout (->
    $('.animate').removeClass('invisible').addClass('animated')),
    500

exports = this
exports.appName = appName

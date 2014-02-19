appName = 'admin-app'
app = angular.module appName, ['ngResource', 'ngRoute', 'xeditable']

app.config ['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) ->
  $routeProvider
  .when "/admin/status/:section",
      templateUrl: "/partials/admin_status"
      controller: "StatusController"
  .when "/admin/status",
      templateUrl: "/partials/admin_status"
      controller: "StatusController"
  .otherwise redirecTo: "/admin/status"

  $locationProvider.html5Mode(true)
]
app.run (editableOptions) ->
  editableOptions.theme = 'bs3'

exports = this
exports.appName = appName
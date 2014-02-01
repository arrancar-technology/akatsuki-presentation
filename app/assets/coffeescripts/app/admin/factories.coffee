factories =
  Status: ['$resource', ($resource) ->
    $resource '/api/1/status/:section'
  ]

app = angular.module appName
app.factory factories
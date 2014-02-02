factories =
  Order: ["$resource", ($resource) ->
    $resource "/api/1/orders/:id",
      id: "@id"
    ,
      get:
        method: 'GET'
        isArray: true
      create:
        method: "POST"
      update:
        method: "PUT"
  ]

app = angular.module appName
app.factory factories
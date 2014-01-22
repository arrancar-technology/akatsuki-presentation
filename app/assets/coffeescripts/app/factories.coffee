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

app = angular.module 'main-app'
app.factory factories
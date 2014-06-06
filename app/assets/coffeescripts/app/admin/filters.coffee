filters =
  extractCreateDate: [() ->
    (id) ->
      if (id)
        moment(parseInt(id.slice(0,8), 16)*1000).format("YYYY.MM.DD-h:mm")
  ]

app = angular.module appName
app.filter 'extractCreateDate', filters.extractCreateDate

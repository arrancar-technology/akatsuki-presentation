filters =
  countryLookUp: ['Lookups', (Lookups) ->
    (countryCode) ->
      foundCountry = Lookups.countries.find (country) ->
        country.code == countryCode
      foundCountry.name
  ]

app = angular.module appName
app.filter 'countryLookUp', filters.countryLookUp

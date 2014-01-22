filters =
  countryLookUp: ['Lookups', (Lookups) ->
    (countryCode) ->
      foundCountry = Lookups.countries.find (country) ->
        country.code == countryCode
      foundCountry.name
  ]

app = angular.module 'main-app'
app.filter 'countryLookUp', filters.countryLookUp

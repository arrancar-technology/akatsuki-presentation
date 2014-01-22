(function() {
  var app, filters;

  filters = {
    countryLookUp: [
      'Lookups', function(Lookups) {
        return function(countryCode) {
          var foundCountry;
          foundCountry = Lookups.countries.find(function(country) {
            return country.code === countryCode;
          });
          return foundCountry.name;
        };
      }
    ]
  };

  app = angular.module('main-app');

  app.filter('countryLookUp', filters.countryLookUp);

}).call(this);

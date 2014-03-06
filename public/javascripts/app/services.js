(function() {
  var app, bootstrapEnv, findBootstrapEnvironment, placement, popoverContents, popoverOptions, services;

  findBootstrapEnvironment = function() {
    var $el, envVal, envValues, envs, i;
    envs = ["ExtraSmall", "Small", "Medium", "Large"];
    envValues = ["xs", "sm", "md", "lg"];
    $el = $("<div>");
    $el.appendTo($("body"));
    i = envValues.length - 1;
    while (i >= 0) {
      envVal = envValues[i];
      $el.addClass("hidden-" + envVal);
      if ($el.is(":hidden")) {
        $el.remove();
        return envs[i];
      }
      i--;
    }
  };

  bootstrapEnv = findBootstrapEnvironment();

  placement = (bootstrapEnv === "ExtraSmall" ? "bottom" : "right");

  popoverOptions = {
    'trigger': "focus",
    'container': "body",
    'toggle': "popover",
    'placement': placement,
    'original-title': "",
    'title': ""
  };

  popoverContents = {
    "year-of-birth": "Please enter year of birth in YYYY format",
    "place-of-birth": "Please enter place of birth",
    "last-name-at-birth": "Please enter last name at birth",
    "first-name-at-birth": "Please enter first name at birth",
    "year-of-death": "Please enter year of death in YYYY format",
    "place-of-death": "Please enter place of death",
    "last-name-at-death": "Please enter last name of deceased",
    "first-name-at-death": "Please enter first name of deceased",
    "year-of-marriage": "Please enter year of marriage in YYYY format",
    "place-of-marriage": "Please enter place of marriage",
    "woman-last-name": "Please enter last name of woman",
    "woman-first-name": "Please enter first name of woman",
    "man-last-name": "Please enter last name of man",
    "man-first-name": "Please enter first name of man",
    "first-name": "Please enter your first name",
    "last-name": "Please enter your last name",
    "email": "Please enter your email address",
    "address-1": "Please enter your address",
    "city": "Please enter your city",
    "postcode": "Please enter your postcode",
    "phone": "Please enter your phone number",
    "cardholder-name": "Please enter cardholder's name as it is displayed on the card",
    "card-number": "Please enter 16 digit card number",
    "card-verification-number": "Please enter last 3 digits as it is displayed on signature strip"
  };

  services = {
    PopoverService: [
      function() {
        return {
          initializePopover: function(elementId) {
            return $("#" + elementId).popover(Object.merge(popoverOptions, {
              'content': popoverContents[elementId]
            }));
          }
        };
      }
    ]
  };

  app = angular.module(appName);

  app.service(services);

}).call(this);

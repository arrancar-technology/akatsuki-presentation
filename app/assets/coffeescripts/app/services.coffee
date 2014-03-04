# Find bootstrap environment
findBootstrapEnvironment = ->
  envs = ["ExtraSmall", "Small", "Medium", "Large"]
  envValues = ["xs", "sm", "md", "lg"]
  $el = $("<div>")
  $el.appendTo $("body")
  i = envValues.length - 1

  while i >= 0
    envVal = envValues[i]
    $el.addClass "hidden-" + envVal
    if $el.is(":hidden")
      $el.remove()
      return envs[i]
    i--

# Initialize popovers
bootstrapEnv = findBootstrapEnvironment()
placement = (if (bootstrapEnv is "ExtraSmall") then "bottom" else "right")
popoverOptions =
  'trigger': "focus"
  'container': "body"
  'toggle': "popover"
  'placement': placement
  'original-title': ""
  'title': ""

popoverContents =
  "year-of-birth": "Please enter year of birth in YYYY format"
  "place-of-birth": "Please enter place of birth"
  "last-name-at-birth": "Please enter last name at birth"
  "first-name-at-birth": "Please enter first name at birth"
  "first-name": "Please enter your first name"
  "last-name": "Please enter your last name"
  "year-of-marriage": "Please enter year of marriage in YYYY format"
  "place-of-marriage": "Please enter place of marriage"
  "woman-last-name": "Please enter last name of woman"
  "woman-first-name": "Please enter first name of woman"
  "man-last-name": "Please enter last name of man"
  "man-first-name": "Please enter first name of man"
  "email": "Please enter your email address"
  "address-1": "Please enter your address"
  "city": "Please enter your city"
  "postcode": "Please enter your postcode"
  "phone": "Please enter your phone number"
  "cardholder-name": "Please enter cardholder's name as it is displayed on the card"
  "card-number": "Please enter 16 digit card number"
  "card-verification-number": "Please enter last 3 digits as it is displayed on signature strip"

services =
  PopoverService: [() ->
    initializePopover: (elementId) ->
      $("##{elementId}").popover(Object.merge(popoverOptions, {'content': popoverContents[elementId]}))
  ]

app = angular.module appName
app.service services
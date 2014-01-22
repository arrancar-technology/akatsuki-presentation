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

initializePopover = (elementId) ->
  $("##{elementId}").popover(Object.merge(popoverOptions, {'content': popoverContents[elementId]}))

lookUps =
  cardTypes:
    'visa': 'Visa',
    'visaDebit': 'Visa Debit',
    'master': 'Master',
    'maestro': 'Maestro'
  months:
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  countries: [
    code: 'AF', name: 'Afghanistan'
  ,
    code: 'AL', name: 'Albania'
  ,
    code: 'DZ', name: 'Algeria'
  ,
    code: 'AS', name: 'American Samoa'
  ,
    code: 'AD', name: 'Andorra'
  ,
    code: 'AO', name: 'Angola'
  ,
    code: 'AI', name: 'Anguilla'
  ,
    code: 'AG', name: 'Antigua and Barbuda'
  ,
    code: 'AQ', name: 'Antarctica'
  ,
    code: 'AR', name: 'Argentina'
  ,
    code: 'AW', name: 'Aruba'
  ,
    code: 'AM', name: 'Armenia'
  ,
    code: 'AU', name: 'Australia'
  ,
    code: 'AT', name: 'Austria'
  ,
    code: 'AZ', name: 'Azerbaidjan'
  ,
    code: 'BS', name: 'Bahamas'
  ,
    code: 'BH', name: 'Bahrain'
  ,
    code: 'BD', name: 'Bangladesh'
  ,
    code: 'BB', name: 'Barbados'
  ,
    code: 'BY', name: 'Belarus'
  ,
    code: 'BE', name: 'Belgium'
  ,
    code: 'BZ', name: 'Belize'
  ,
    code: 'BJ', name: 'Benin'
  ,
    code: 'BM', name: 'Bermuda'
  ,
    code: 'BT', name: 'Bhutan'
  ,
    code: 'BO', name: 'Bolivia'
  ,
    code: 'BA', name: 'Bosnia-Herzegovina'
  ,
    code: 'BW', name: 'Botswana'
  ,
    code: 'BV', name: 'Bouvet Island'
  ,
    code: 'BR', name: 'Brazil'
  ,
    code: 'IO', name: 'British Indian Ocean Territory'
  ,
    code: 'BN', name: 'Brunei Darussalam'
  ,
    code: 'BG', name: 'Bulgaria'
  ,
    code: 'BF', name: 'Burkina Faso'
  ,
    code: 'BI', name: 'Burundi'
  ,
    code: 'KH', name: 'Cambodia'
  ,
    code: 'CM', name: 'Cameroon'
  ,
    code: 'CA', name: 'Canada'
  ,
    code: 'CV', name: 'Cape Verde'
  ,
    code: 'KY', name: 'Cayman Islands'
  ,
    code: 'CF', name: 'Central African Republic'
  ,
    code: 'TD', name: 'Chad'
  ,
    code: 'CL', name: 'Chile'
  ,
    code: 'CN', name: 'China'
  ,
    code: 'CX', name: 'Christmas Island'
  ,
    code: 'CC', name: 'Cocos (Keeling) Islands'
  ,
    code: 'CO', name: 'Colombia'
  ,
    code: 'KM', name: 'Comoros'
  ,
    code: 'CG', name: 'Congo'
  ,
    code: 'CK', name: 'Cook Islands'
  ,
    code: 'CR', name: 'Costa Rica'
  ,
    code: 'HR', name: 'Croatia'
  ,
    code: 'CU', name: 'Cuba'
  ,
    code: 'CY', name: 'Cyprus'
  ,
    code: 'CZ', name: 'Czech Republic'
  ,
    code: 'DK', name: 'Denmark'
  ,
    code: 'DJ', name: 'Djibouti'
  ,
    code: 'DM', name: 'Dominica'
  ,
    code: 'DO', name: 'Dominican Republic'
  ,
    code: 'TP', name: 'East Timor'
  ,
    code: 'EC', name: 'Ecuador'
  ,
    code: 'EG', name: 'Egypt'
  ,
    code: 'SV', name: 'El Salvador'
  ,
    code: 'GQ', name: 'Equatorial Guinea'
  ,
    code: 'ER', name: 'Eritrea'
  ,
    code: 'EE', name: 'Estonia'
  ,
    code: 'ET', name: 'Ethiopia'
  ,
    code: 'FK', name: 'Falkland Islands'
  ,
    code: 'FO', name: 'Faroe Islands'
  ,
    code: 'FJ', name: 'Fiji'
  ,
    code: 'FI', name: 'Finland'
  ,
    code: 'CS', name: 'Former Czechoslovakia'
  ,
    code: 'SU', name: 'Former USSR'
  ,
    code: 'FR', name: 'France'
  ,
    code: 'FX', name: 'France (European Territory)'
  ,
    code: 'GF', name: 'French Guyana'
  ,
    code: 'TF', name: 'French Southern Territories'
  ,
    code: 'GA', name: 'Gabon'
  ,
    code: 'GM', name: 'Gambia'
  ,
    code: 'GE', name: 'Georgia'
  ,
    code: 'DE', name: 'Germany'
  ,
    code: 'GH', name: 'Ghana'
  ,
    code: 'GI', name: 'Gibraltar'
  ,
    code: 'GR', name: 'Greece'
  ,
    code: 'GL', name: 'Greenland'
  ,
    code: 'GD', name: 'Grenada'
  ,
    code: 'GP', name: 'Guadeloupe (French)'
  ,
    code: 'GU', name: 'Guam (USA)'
  ,
    code: 'GT', name: 'Guatemala'
  ,
    code: 'GN', name: 'Guinea'
  ,
    code: 'GW', name: 'Guinea Bissau'
  ,
    code: 'GY', name: 'Guyana'
  ,
    code: 'HT', name: 'Haiti'
  ,
    code: 'HM', name: 'Heard and McDonald Islands'
  ,
    code: 'HN', name: 'Honduras'
  ,
    code: 'HK', name: 'Hong Kong'
  ,
    code: 'HU', name: 'Hungary'
  ,
    code: 'IS', name: 'Iceland'
  ,
    code: 'IN', name: 'India'
  ,
    code: 'ID', name: 'Indonesia'
  ,
    code: 'IR', name: 'Iran'
  ,
    code: 'IQ', name: 'Iraq'
  ,
    code: 'IE', name: 'Ireland'
  ,
    code: 'IL', name: 'Israel'
  ,
    code: 'IT', name: 'Italy'
  ,
    code: 'CI', name: 'Ivory Coast (Cote D\'Ivoire)'
  ,
    code: 'JM', name: 'Jamaica'
  ,
    code: 'JP', name: 'Japan'
  ,
    code: 'JO', name: 'Jordan'
  ,
    code: 'KZ', name: 'Kazakhstan'
  ,
    code: 'KE', name: 'Kenya'
  ,
    code: 'KI', name: 'Kiribati'
  ,
    code: 'KW', name: 'Kuwait'
  ,
    code: 'KG', name: 'Kyrgyzstan'
  ,
    code: 'LA', name: 'Laos'
  ,
    code: 'LV', name: 'Latvia'
  ,
    code: 'LB', name: 'Lebanon'
  ,
    code: 'LS', name: 'Lesotho'
  ,
    code: 'LR', name: 'Liberia'
  ,
    code: 'LY', name: 'Libya'
  ,
    code: 'LI', name: 'Liechtenstein'
  ,
    code: 'LT', name: 'Lithuania'
  ,
    code: 'LU', name: 'Luxembourg'
  ,
    code: 'MO', name: 'Macau'
  ,
    code: 'MK', name: 'Macedonia'
  ,
    code: 'MG', name: 'Madagascar'
  ,
    code: 'MW', name: 'Malawi'
  ,
    code: 'MY', name: 'Malaysia'
  ,
    code: 'MV', name: 'Maldives'
  ,
    code: 'ML', name: 'Mali'
  ,
    code: 'MT', name: 'Malta'
  ,
    code: 'MH', name: 'Marshall Islands'
  ,
    code: 'MQ', name: 'Martinique (French)'
  ,
    code: 'MR', name: 'Mauritania'
  ,
    code: 'MU', name: 'Mauritius'
  ,
    code: 'YT', name: 'Mayotte'
  ,
    code: 'MX', name: 'Mexico'
  ,
    code: 'FM', name: 'Micronesia'
  ,
    code: 'MD', name: 'Moldavia'
  ,
    code: 'MC', name: 'Monaco'
  ,
    code: 'MN', name: 'Mongolia'
  ,
    code: 'ME', name: 'Montenagro'
  ,
    code: 'MS', name: 'Montserrat'
  ,
    code: 'MA', name: 'Morocco'
  ,
    code: 'MZ', name: 'Mozambique'
  ,
    code: 'MM', name: 'Myanmar'
  ,
    code: 'NA', name: 'Namibia'
  ,
    code: 'NR', name: 'Nauru'
  ,
    code: 'NP', name: 'Nepal'
  ,
    code: 'NL', name: 'Netherlands'
  ,
    code: 'AN', name: 'Netherlands Antilles'
  ,
    code: 'NT', name: 'Neutral Zone'
  ,
    code: 'NC', name: 'New Caledonia (French)'
  ,
    code: 'NZ', name: 'New Zealand'
  ,
    code: 'NI', name: 'Nicaragua'
  ,
    code: 'NE', name: 'Niger'
  ,
    code: 'NG', name: 'Nigeria'
  ,
    code: 'NU', name: 'Niue'
  ,
    code: 'NF', name: 'Norfolk Island'
  ,
    code: 'KP', name: 'North Korea'
  ,
    code: 'MP', name: 'Northern Mariana Islands'
  ,
    code: 'NO', name: 'Norway'
  ,
    code: 'OM', name: 'Oman'
  ,
    code: 'PK', name: 'Pakistan'
  ,
    code: 'PW', name: 'Palau'
  ,
    code: 'PA', name: 'Panama'
  ,
    code: 'PG', name: 'Papua New Guinea'
  ,
    code: 'PY', name: 'Paraguay'
  ,
    code: 'PE', name: 'Peru'
  ,
    code: 'PH', name: 'Philippines'
  ,
    code: 'PN', name: 'Pitcairn Island'
  ,
    code: 'PL', name: 'Poland'
  ,
    code: 'PF', name: 'Polynesia (French)'
  ,
    code: 'PT', name: 'Portugal'
  ,
    code: 'PR', name: 'Puerto Rico'
  ,
    code: 'QA', name: 'Qatar'
  ,
    code: 'RE', name: 'Reunion (French)'
  ,
    code: 'RO', name: 'Romania'
  ,
    code: 'RU', name: 'Russian Federation'
  ,
    code: 'RW', name: 'Rwanda'
  ,
    code: 'GS', name: 'S. Georgia & S. Sandwich Isls.'
  ,
    code: 'SH', name: 'Saint Helena'
  ,
    code: 'KN', name: 'Saint Kitts & Nevis Anguilla'
  ,
    code: 'LC', name: 'Saint Lucia'
  ,
    code: 'PM', name: 'Saint Pierre and Miquelon'
  ,
    code: 'ST', name: 'Sao Tome and Principe'
  ,
    code: 'VC', name: 'Saint Vincent & Grenadines'
  ,
    code: 'WS', name: 'Samoa'
  ,
    code: 'SM', name: 'San Marino'
  ,
    code: 'SA', name: 'Saudi Arabia'
  ,
    code: 'SN', name: 'Senegal'
  ,
    code: 'RS', name: 'Serbia'
  ,
    code: 'SC', name: 'Seychelles'
  ,
    code: 'SL', name: 'Sierra Leone'
  ,
    code: 'SG', name: 'Singapore'
  ,
    code: 'SK', name: 'Slovak Republic'
  ,
    code: 'SI', name: 'Slovenia'
  ,
    code: 'SB', name: 'Solomon Islands'
  ,
    code: 'SO', name: 'Somalia'
  ,
    code: 'ZA', name: 'South Africa'
  ,
    code: 'KR', name: 'South Korea'
  ,
    code: 'ES', name: 'Spain'
  ,
    code: 'LK', name: 'Sri Lanka'
  ,
    code: 'SD', name: 'Sudan'
  ,
    code: 'SR', name: 'Suriname'
  ,
    code: 'SJ', name: 'Svalbard and Jan Mayen Islands'
  ,
    code: 'SZ', name: 'Swaziland'
  ,
    code: 'SE', name: 'Sweden'
  ,
    code: 'CH', name: 'Switzerland'
  ,
    code: 'SY', name: 'Syria'
  ,
    code: 'TJ', name: 'Tadjikistan'
  ,
    code: 'TW', name: 'Taiwan'
  ,
    code: 'TZ', name: 'Tanzania'
  ,
    code: 'TH', name: 'Thailand'
  ,
    code: 'TG', name: 'Togo'
  ,
    code: 'TK', name: 'Tokelau'
  ,
    code: 'TO', name: 'Tonga'
  ,
    code: 'TT', name: 'Trinidad and Tobago'
  ,
    code: 'TN', name: 'Tunisia'
  ,
    code: 'TR', name: 'Turkey'
  ,
    code: 'TM', name: 'Turkmenistan'
  ,
    code: 'TC', name: 'Turks and Caicos Islands'
  ,
    code: 'TV', name: 'Tuvalu'
  ,
    code: 'UG', name: 'Uganda'
  ,
    code: 'UA', name: 'Ukraine'
  ,
    code: 'AE', name: 'United Arab Emirates'
  ,
    code: 'GB', name: 'United Kingdom'
  ,
    code: 'US', name: 'United States'
  ,
    code: 'UY', name: 'Uruguay'
  ,
    code: 'UM', name: 'USA Minor Outlying Islands'
  ,
    code: 'UZ', name: 'Uzbekistan'
  ,
    code: 'VU', name: 'Vanuatu'
  ,
    code: 'VA', name: 'Vatican City State'
  ,
    code: 'VE', name: 'Venezuela'
  ,
    code: 'VN', name: 'Vietnam'
  ,
    code: 'VG', name: 'Virgin Islands (British)'
  ,
    code: 'VI', name: 'Virgin Islands (USA)'
  ,
    code: 'WF', name: 'Wallis and Futuna Islands'
  ,
    code: 'EH', name: 'Western Sahara'
  ,
    code: 'YE', name: 'Yemen'
  ,
    code: 'YU', name: 'Yugoslavia'
  ,
    code: 'ZR', name: 'Zaire'
  ,
    code: 'ZM', name: 'Zambia'
  ,
    code: 'ZW', name: 'Zimbabwe']

filters =
  countryLookUp: ->
    (countryCode) ->
      foundCountry = lookUps.countries.find (country) ->
        country.code == countryCode
      foundCountry.name

controllers =
  CertificateDetailsController: ["$scope", "Customer", ($scope, Customer) ->
    $scope.model = {}
    $scope.model.step = {}
    $scope.model.step[1] = {} # Certificate Details
    $scope.model.step[2] = {} # Additional Details
    $scope.model.step[3] = {} # Payment Details
    $scope.model.step.current = 1
    $scope.model.customer = new Customer()

    # Defaults
    $scope.model.customer.serviceRequest = {}
    $scope.model.customer.serviceRequest.numberOfCopies = 1

    $scope.model.customer.card = {}
    $scope.model.customer.card.type = 'visa'

    $scope.model.address = {}
    $scope.model.address.country = 'GB'

    $scope.goToStep = (step)->
      $scope.model.step.current = step
    $scope.previousStep = ->
      $scope.model.step.current--
    $scope.nextStep = ->
      $scope.model.step[$scope.model.step.current].submitted = true
      if $scope.birth_form.$valid
        $scope.model.step.current = 2
      else if $scope.service_request_form.$valid && $scope.address_form.$valid
        $scope.model.step.current = 3
      else if $scope.birth_form.$valid
        $scope.model.step.current = 4
      else
        initializePopover $(element).attr('id') for element in $(".step.#{$scope.model.step.current} input[required]")

    $scope.saveStepAdditionalInfo = ->
      Customer.create($scope.model.customer)

    $scope.model.numberOfCopies = [1..10]
    $scope.model.numberOfApostilles = [0..10]
    $scope.model.yearsExpiry = [2014..2020]
    $scope.model.countries = lookUps.countries
    $scope.model.cardTypes = lookUps.cardTypes
    $scope.model.months = lookUps.months
    $scope.model.days = [1..31]
  ]

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

app = angular.module 'main-app', ["ngResource"]

app.controller "CertificateDetailsController", controllers.CertificateDetailsController
app.filter "countryLookUp", filters.countryLookUp
app.factory "Customer", factories.Customer

# Show form when click on apply
$('.apply-button').on 'click', ->
  targetForm = $(@).data('target-form')
  $(".#{targetForm} .certificate-show").removeClass('hidden')
  $(".#{targetForm} .certificate-hide").addClass('hidden')

$('.animate-inview').one 'inview', ->
  setTimeout (->
    $('.animate').removeClass('invisible').addClass('animated')),
    500

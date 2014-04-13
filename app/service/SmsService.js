var smsService,
    twilio = require('twilio'),
    ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || 'ACc5dda2b7652571c388b00e742bab335d',
    AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "72f044cd42ff2c3ff9f42644105e65c8",
    FROM_PHONE_NUMBER = process.env.TWILIO_FROM_PHONE_NUMBER || "+441536609085",
    client;

function getNormalizedPhoneNumber(phoneNumber) {
  var normalizedPhoneNumber;
  if (phoneNumber.indexOf('+44') === 0) {
    normalizedPhoneNumber = phoneNumber
  } else if (phoneNumber.indexOf('0') === 0) {
    normalizedPhoneNumber = phoneNumber.replace("0", "+44");
  }

  return normalizedPhoneNumber;
}

function SmsService() {
  client = new twilio.RestClient(ACCOUNT_SID, AUTH_TOKEN);
}

SmsService.prototype.sendSuccessMessageFor = function (order) {
  var normalizedPhoneNumber = getNormalizedPhoneNumber(order.address.phone);
  if (normalizedPhoneNumber) {
    client.sms.messages.create({
      to: normalizedPhoneNumber,
      from: FROM_PHONE_NUMBER,
      body: "Thanks for your order, your reference number is " + order.referenceNumber + ". Simply Certificate"
    }, function(error, message) {
      if (error) {
        console.log(error.message);
      }
    });
  }
};

module.exports = function () {
  if (!smsService) {
    smsService = new SmsService();
  }

  return smsService;
};


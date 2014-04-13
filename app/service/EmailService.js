var Mailgun = require('mailgun').Mailgun;

var emailService,
  mailGun;

function EmailService() {
  mailGun = new Mailgun('key-1d3k06fyrimls7rbsrwh8-l19r62-yn2');
}

EmailService.prototype.sendSuccessMessageFor = function (order) {
  mailGun.sendRaw('no-reply@simplycertificate.co.uk',
    [order.email],
    'From: no-reply@simplycertificate.co.uk' +
      '\nTo: ' + order.email +
      '\nContent-Type: text/html; charset=utf-8' +
      '\nSubject:' + 'Your Simply Certificate order' + // <-- this line is important
      '\n\n' + '<h3 style="font-size:18px;color:rgb(13, 68, 138);margin:15px 0 0 0;font-weight:bold">Hello ' + order.firstName + ',</h3><br>'
      + "<p style='margin:5px 0 0 0;font:12px/16px Arial,sans-serif'>Thanks for your order.</p><br>"
      + "<p style='margin:5px 0 0 0;font:12px/16px Arial,sans-serif'>Your order reference number is <strong>" + order.referenceNumber + "</strong>. We will let you know once your documents are ready to dispatch.</p><br>"
      + "<p style='margin:5px 0 0 0;font:12px/16px Arial,sans-serif'>Please do not hesitate to contact us with any questions you have at <strong>support@simplycertificate.co.uk</strong></p><br><br>"
      + "<p style='margin:5px 0 0 0;font:12px/16px Arial,sans-serif'>Simply Certificate Team <br><br> <span style='font-size:16px;font-weight:bold'> <strong><a href='https://www.simplycertificate.co.uk' target='_blank'>simplycertificate.co.uk</a></strong> </span> </p>",
    function (err) {
      console.log(err);
    });
};

module.exports = function () {
  if (!emailService) {
    emailService = new EmailService();
  }

  return emailService;
};


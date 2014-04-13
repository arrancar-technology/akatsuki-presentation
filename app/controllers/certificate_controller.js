require('sugar');

var db = require('./app/service/DbService')(compound);

var actions = {
  personalDetails: function () {
    db.collection('orders').save(req.body, function(err, result) {
      if (err) { throw err; }
      res.cookie('o_id', result._id.toString(), { maxAge: 3600000, path: '/' });
      redirect('/certificate/' + req.params.section);
    });
  },
  additionalDetails: function () {
    var section = req.params.section,
        title = 'Simply Certificate - ' + section.capitalize()  + ' Certificate',
        stripePublicKey = process.env.STRIPE_PUBLIC_KEY || 'pk_test_fgOdS2r4FsJ9sfCgzsaZ0RM9';

    render(section, {title: title, stripePublicKey: stripePublicKey});
  },
  success: function() {
    var order = req.session.order;

    // TODO: [DK] redirect to homepage if there is no order in the session.

    render({title: 'Simply Certificate - Order Success', order: order});
  }
};

action('personalDetails', actions.personalDetails);
action('additionalDetails', actions.additionalDetails);
action('success', actions.success);

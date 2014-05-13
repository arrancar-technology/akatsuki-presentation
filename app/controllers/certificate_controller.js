require('sugar');

var actions = {
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

action('additionalDetails', actions.additionalDetails);
action('success', actions.success);

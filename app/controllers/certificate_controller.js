require('sugar');

var actions = {
  additionalDetails: function () {
    var section = req.params.section,
        title = 'Simply Certificate - ' + section.capitalize()  + ' Certificate',
        stripePublicKey = process.env.STRIPE_PUBLIC_KEY || 'pk_test_fgOdS2r4FsJ9sfCgzsaZ0RM9';

    render(section, {title: title, stripePublicKey: stripePublicKey});
  },
  success: function() {
    var model = {},
      order = req.session.order;

    model.order = order;

    if(!order) {
      redirect('/');
    } else {
      render({title: 'Simply Certificate - Order Success', model: model});
    }
  }
};

action('additionalDetails', actions.additionalDetails);
action('success', actions.success);

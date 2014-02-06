require('sugar');

var db = require('./app/service/DbService')(compound);

var actions = {
  personalDetails: function () {
    db.collection('orders').save(req.body, function(err, result) {
      if (err) throw err;
      res.cookie('o_id', result._id.toString(), { maxAge: 3600000, path: '/' });
      redirect('/certificate/' + req.params.section);
    });
  },
  additionalDetails: function () {
    var section = req.params.section;
    render(section, {title: 'UK ' + section.capitalize()  + ' Certificate'});
  }
};

action('personalDetails', actions.personalDetails);
action('additionalDetails', actions.additionalDetails);

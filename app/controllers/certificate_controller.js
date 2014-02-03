require('sugar');

var actions = {
  personalDetails: function () {
    redirect('/certificate/' + req.params.section);
  },
  additionalDetails: function () {
    var section = req.params.section;
    render(section, {title: 'UK ' + section.capitalize()  + ' Certificate'});
  }
};

action('personalDetails', actions.personalDetails);
action('additionalDetails', actions.additionalDetails);

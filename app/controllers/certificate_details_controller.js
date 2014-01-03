var actions = {
  personalDetails: function () {
    redirect('/details/' + req.params.section);
  },
  additionalDetails: function () {
    render(req.params.section, {title: 'UK Certificates'});
  }
};

action('personalDetails', actions.personalDetails);
action('additionalDetails', actions.additionalDetails);

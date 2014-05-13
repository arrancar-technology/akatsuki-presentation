require('sugar');

var staticPages = ['terms-and-conditions', 'faq', 'pricing', 'privacy-policy', 'about-us', 'contact-us'];

var actions = {
  googleWebmasterToolVerify: function(){
    send('google-site-verification: googlef46f912f19ecdab2.html');
  },
  staticPage: function(){
    var staticPage = req.params.staticPage;
    if (staticPages.indexOf(staticPage) > -1) {
      render(staticPage.underscore(), { title: 'Simply Certificate - ' + staticPage.titleize() });
    } else {
      res.status(404).render('404', { title: 'Simply Certificate' });
    }
  }
};

action('googleWebmasterToolVerify', actions.googleWebmasterToolVerify);
action('staticPage', actions.staticPage);

var actions = {
  googleWebmasterToolVerify: function(){
    send('google-site-verification: googlef46f912f19ecdab2.html');
  },
  pricing: function(){
    render('pricing', {title: 'Simply Certificate - Pricing'});
  }
};

action('googleWebmasterToolVerify', actions.googleWebmasterToolVerify);
action('pricing', actions.pricing);

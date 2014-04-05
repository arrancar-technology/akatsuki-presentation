action('show', function(){
  // TODO: [DK] remove this after go live
  var environment = process.env.NODE_ENV || 'development';
  var layout = environment === 'prod01' && req.query.debug !== 'true' ? 'show_prod' : 'show';

  render(layout, {title: 'Simply Certificate'});
});

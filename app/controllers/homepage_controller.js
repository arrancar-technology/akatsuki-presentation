var actions = {
  homepage: function(){
    var testimonials = [
      'All documents were lost due to moving, but we were able to get birth certificate through Simply Certificate and saved me a lot of time and hassle.',
      'Internet site was very user friendly and I ordered birth certificates for the whole family.',
      'Marriage certificate received within 15 working days, very happy with the service and would definitely recommend.',
      'Scottish birth certificate arrived in 14 working days and I was able to put my request using user friendly web site.',
      'Received replacement birth certificate in 11 working days. Exceptional service.',
      'Irish birth certificate was received in 5 working days, I used rapid service and it arrived in time, will highly recommend the service to family and friends.',
      'Birth certificate was ordered and I received updates by email with every step. Excellent service, highly recommended.',
      'Received marriage certificate with apostille stamp within 10 working days. Whenever I emailed or called, I was updated with progress, exceptional customer service.'
    ];
    var testimonialIndex = new Date().getMilliseconds() % 7;

    var model = {
      title: 'Welcome to Simply Certificate',
      metaDescription: 'Simply Certificate offers a faster, more convenient way of replacing or getting a copy of official UK birth, death or marriage certificates.',
      testimonials: testimonials,
      testimonialIndex: testimonialIndex
    };

    render('homepage', model);
  },
  birth: function () {
    var model = {
      title: 'Replacement Birth Certificate | Lost Birth Certificate',
      metaDescription: 'Have you lost or need to replace your UK birth certificate? Simply Certificate offers an official, secure replacement service that saves you time and hassle.',
      sectionTitle: 'Birth Certificate Replacement'
    };

    render('birth', model);
  }
};

action('homepage', actions.homepage);
action('birth', actions.birth);

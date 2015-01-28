var actions = {
  index: function () {
    var articles = [
      {
        title: 'What Do I Need A Birth Certificate For?',
        synopsis: 'Birth certificates are a very handy document in terms of identification and applying for other legal documents. Make sure you register your child’s birth so that they have their birth certificate. If your own birth certificate has become lost or',
        date: '28th January, 2015',
        url: '/blog/what-do-i-need-a-birth-certificate-for'
      }
    ];

    var model = {
      title: 'Simply Certificate | Blog',
      articles: articles
    };

    render('index', model);
  }
};

action('index', actions.index);

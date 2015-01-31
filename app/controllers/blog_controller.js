var markdown = require( "markdown" ).markdown
  , fs = require('fs')
  , cheerio = require('cheerio');

require('sugar');

var articles = [
  {
    title: 'What Do I Need A Birth Certificate For?',
    synopsis: 'Birth certificates are a very handy document in terms of identification and applying for other legal documents. Make sure you register your child’s birth so that they have their birth certificate. If your own birth certificate has become lost or',
    date: '28th January, 2015',
    url: '/blog/what-do-i-need-a-birth-certificate-for'
  } /* TODO: [DK] Uncomment on 10th of February 2015,
  {
    title: 'How Can I Trace My Family History?',
    synopsis: "You want to trace your family's history and build your family tree, but you're not sure where to start and it seems like a lot of paperwork. Here's a simplified guide on how to get",
    date: '10th February, 2015',
    url: '/blog/how-can-i-trace-my-family-history'
  } */
];

var actions = {
  index: function () {
    var model = {
      title: 'Simply Certificate | Blog',
      articles: articles
    };

    render('index', model);
  },
  show: function() {
    var article = articles.find(function(article) {
      return article.title.indexOf(req.params.articleTitle.spacify().humanize().capitalize(true)) >= 0;
    });

    var filename = 'app/resources/blog/' + req.params.articleTitle + '.md';
    fs.readFile(filename, 'utf8', function(err, data) {
      if (err) {
        return res.status(404).render('404', { title: 'Simply Certificate' });
      }

      var html = markdown.toHTML(data);
      $ = cheerio.load(html);
      $("a").each(function(i, element) {
        element = $(element);
        if(element.attr('href').indexOf('www.simplycertificate.co.uk') < 0) {
          element.attr('rel', 'nofollow');
        }
      });

      article.content = $.html();
      var model = {
        title: article.title,
        article: article
      };

      render('show', model);
    });
  }
};

action('index', actions.index);
action('show', actions.show);

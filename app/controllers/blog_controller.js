var markdown = require( "markdown" ).markdown
  , fs = require('fs')
  , cheerio = require('cheerio');

require('sugar');

var articles = [
  {
    title: 'Death Certificates: A Practical Guide',
    synopsis: "A death certificate is an essential document needed in the settling of a deceased person’s affairs. Beyond the legal implications of it as an official document there are other reasons a death certificate will be needed.",
    date: '01 May, 2015',
    url: '/blog/death-certificates-a-practical-guide'
  },
  {
    title: 'What Documents Do I Need For My Wedding?',
    synopsis: "It's coming up to your very special day. You've planned the dress, the flower arrangements and the reception, it's all coming together. But in order for your wedding day to go ahead without a hitch there's also the paperwork that goes alongside.",
    date: '15 April, 2015',
    url: '/blog/what-documents-do-i-need-for-my-wedding'
  },
  {
    title: 'Replacing Damaged Or Lost Certificates',
    synopsis: "We live in a country that is particularly partial to inclement weather. From storms to flooding, adverse changes in the weather can lead to the loss or destruction of personal property.",
    date: '01 April, 2015',
    url: '/blog/replacing-damaged-or-lost-certificates'
  },
  {
    title: 'How To Get A Death Certificate?',
    synopsis: "A death certificate is an essential legal document in the process of settling a loved one's affairs. When a family member sadly passes away the paperwork involved is understandably not at the forefront of a person's mind. However, you will need to",
    date: '06 March, 2015',
    url: '/blog/how-to-get-a-death-certificate'
  },
  {
    title: 'How Can I Trace My Family History?',
    synopsis: "You want to trace your family's history and build your family tree, but you're not sure where to start and it seems like a lot of paperwork. Here's a simplified guide on how to get",
    date: '10th February, 2015',
    url: '/blog/how-can-i-trace-my-family-history'
  },
  {
    title: 'What Do I Need A Birth Certificate For?',
    synopsis: 'Birth certificates are a very handy document in terms of identification and applying for other legal documents. Make sure you register your child’s birth so that they have their birth certificate. If your own birth certificate has become lost or',
    date: '28th January, 2015',
    url: '/blog/what-do-i-need-a-birth-certificate-for'
  }
];

var ILLICIT_CHARACTERS = ":";

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
      return article.title.replace(ILLICIT_CHARACTERS, "").indexOf(req.params.articleTitle.spacify().humanize().capitalize(true)) >= 0;
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

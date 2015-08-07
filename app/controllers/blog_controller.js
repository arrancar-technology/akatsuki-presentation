var markdown = require( "markdown" ).markdown
  , fs = require('fs')
  , cheerio = require('cheerio');

require('sugar');

var articles = [
  {
    title: "Three Parent Birth Certificates: What Are They?",
    synopsis: "Three parent birth certificates are not a common occurrence and they are not often needed. But with the changing world meaning that families are different to how they used to be, some countries are discussing or even issuing, three parent",
    date: '22 Aug, 2015',
    url: '/blog/three-parent-birth-certificates-what-are-they'
  },
  {
    title: "Birth Of Princess Charlotte Is Registered: How To Register A Birth In The Uk",
    synopsis: "The Duke and Duchess of Cambridge's second child, Princess Charlotte Elizabeth Diana, has her birth officially registered on 5th May 2015. Kensington Palace tweeted a picture of her birth certificate in",
    date: '7 Aug, 2015',
    url: '/blog/birth-of-princess-charlotte-is-registered-how-to-register-a-birth-in-the-uk'
  },
  {
    title: "What Is A Long Form Birth Certificate?",
    synopsis: "There are two versions of your birth certificate available in Britain, a long and short form. A birth certificate works as evidence of a person's name, date and place of birth. This type of documentation is required as personal identification",
    date: '18 Jul, 2015',
    url: '/blog/what-is-a-long-form-birth-certificate'
  },
  {
    title: "Registering A Birth After The Death Of Father",
    synopsis: "Having to register a birth after the death of a parent is a sad and unfortunate position to be in. As both parents would typically need to be present in order to have their names included on the",
    date: '03 Jul, 2015',
    url: '/blog/registering-a-birth-after-the-death-of-father'
  },
  {
    title: '4 Reasons You Will Need Your Marriage Certificate',
    synopsis: "A marriage certificate is not just the proof of your union with your partner, it is also a very important legal document",
    date: '21 Jun, 2015',
    url: '/blog/4-reasons-you-will-need-your-marriage-certificate'
  },
  {
    title: 'Birth Certificates: How It Works With Surrogacy',
    synopsis: "Last year over 150 babies were born in the United Kingdom to surrogate parents. A surrogacy agreement implies that a woman will carry a couple's baby, as they are unable to carry a child themselves, but then have no legal role in the child's",
    date: '06 Jun, 2015',
    url: '/blog/birth-certificates-how-it-works-with-surrogacy'
  },
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

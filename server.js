var express = require('express');
var morgan = require('morgan');
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var config = require('./config.js');
var sendgrid  = require('sendgrid')(config.api_user, config.api_key);


require('locus');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/fetchposts', function(req, res){
  var url = 'https://medium.com/@neel.patel';

  request(url, function(error, response, html){
    var $ = cheerio.load(html);

    var payload = [];

    var postItems = $('.section-inner');

    for(i = 1; i < 3; i++){
      if( (postItems[i] == 'undefined') ){ return }

        var postInfo = {}
        postInfo.title = $(postItems[i]).children('h2').text();
        postInfo.image = $(postItems[i]).children().find('img').eq(0).attr('src');
        postInfo.subheading = $(postItems[i]).find('.graf--last').text();
        postInfo.url = $(postItems[i]).parent().parent().parent().parent().parent().parent().parent().find('a').eq(0).attr('href');

        payload.push(postInfo);
    }

      res.send(JSON.stringify(payload));

  });

});

app.post('/sendemail', function(req, res){
  console.log(req.body);
  var toSend = {
    to:       'neelp22@gmail',
    from:     req.body.email,
    subject:  req.body.subject,
    text:     'Name: ' + req.body.name + '\n' + 'Message: ' + '\n' + req.body.message  
  };

  sendgrid.send(toSend, function(err, json) {
    if (err) {
      res.status(404).send("Error"); 
    } else {
      res.status(200).send("Success");
    }
  });

  res.status(200).send(testString);
});


app.listen(process.env.PORT || 3000, function(){
  console.log('Listening on port 3000');
});
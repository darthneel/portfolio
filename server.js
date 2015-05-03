var express = require('express');
var morgan = require('morgan');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

require('locus');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

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

app.listen(process.env.PORT || 3000, function(){
  console.log('Listening on port 3000');
});
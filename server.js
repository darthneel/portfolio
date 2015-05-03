var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
})

app.listen(process.env.PORT || 3000, function(){
  console.log('Listening on port 3000');
})
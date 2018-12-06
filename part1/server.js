var express = require('express');
const fs = require('fs');
var app = express();
var port = process.env.PORT || 8000;

app.get('/hello', function(req, res) {
  res.send("Hello!");
});

app.get('/', function(req, res) {
  let indexHTMLFile = fs.readFileSync('./part1/index.html', 'utf8')
  res.type('html');
  res.send(indexHTMLFile)
});

app.get('/verify/:age', function(req, res) {
  if(req.params.age > 13) {
    res.sendStatus(200)
  } else {
    res.sendStatus(403)
  }
});

app.post('/create/:name', function(req, res) {
  let nameObj = {"id": 1, "name": req.params.name}
  res.json(nameObj)
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

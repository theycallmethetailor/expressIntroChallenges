var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
const fs = require('fs');
app.get('/yourroute', function(req, res) {
  res.send("stuff");
});
app.post('/create/:name/:age', function(req, res) {
  console.log('this worked again!');
  let newObj = {
    "name": req.params.name,
    "age": req.params.age
  };
  // let currentStorage = fs.readFileSync('./storage.json')
  fs.appendFileSync('./part2/storage.json', JSON.stringify(newObj))
  res.end()
})

app.get('/', (req, res) => {
  let stuff = fs.readFileSync('./part2/storage.json')
  console.log(stuff);
  res.send(stuff)
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

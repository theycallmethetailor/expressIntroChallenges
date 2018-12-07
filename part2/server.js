var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
const fs = require('fs');
// const storage = require('./storage.json')
// console.log(storage);
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
  // console.log(currentStorage);
  // fs.appendFileSync('./part2/storage.json', JSON.stringify(newObj))
  let storageFile = fs.readFileSync('./part2/storage.json', 'utf8')

  let contents = JSON.parse(storageFile)
  contents.push(JSON.stringify(newObj))
  console.log(contents);
  let writeInNow = fs.writeFileSync('part2/storage.json', JSON.stringify(contents))
  // console.log(JSON.stringify(newObj));
  // storage.push(JSON.stringify(newObj))
  res.end()
})

app.get('/', (req, res) => {
  let stuff = fs.readFileSync('./part2/storage.json')
  console.log(stuff);
  res.send(stuff)
})

app.get('/:name', (req, res) => {
  // console.log(req.params.name);
  let storageFile = fs.readFileSync('./part2/storage.json', 'utf8')
  let contents = JSON.parse(storageFile)
  console.log(contents.length);

  for (var i = 0; i < contents.length; i++) {
    let jsonContentItem = JSON.parse(contents[i])
    if(jsonContentItem.name === req.params.name) {
      res.json(jsonContentItem)
    }
  }
  res.status(400)
  //NEED TO MAKE 
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

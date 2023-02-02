const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({
    extended: true
}));

const fs = require('fs');

var url = require('url');

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });
}

const eventsData = JSON.parse(fs.readFileSync('eventsData.json'));

function getEvent(eventId){
    
  return eventsData.events[eventId];
}

app.get('/', (req, res) => {
  res.json({"hello": "World"});
});

app.get('/events', (req, res) => {
  res.json(eventsData);
   
});

app.get(['/events/', '/events/*'], (req, res) => {
  const givenId = req.url.split('/')[2];
  res.json(getEvent(givenId));
});



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


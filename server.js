'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai').expect;
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');
// new changes 
const validator = require("./validator");
const myDB = require("./connection");


let app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({ origin: '*' })); //For FCC testing purposes only



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Sample front-end
app.route('/:project/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/issue.html');
  });

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });






//Routing for API 
myDB(async client => {
  const db = await client.db('database');
  const myDataBase = (await db.listCollections({ name: 'issues' }).next() ? await db.collection('issues') : await db.createCollection('issues', validator));
  //For FCC testing purposes 
  fccTestingRoutes(app);
  apiRoutes(app, myDataBase);

}).catch(e => {
  console.log(e);
});


//Start our server and tests!
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (e) {
        console.log('Tests are not valid:');
        console.error(e);
      }
    }, 3500);
  }
});

module.exports = app; //for testing

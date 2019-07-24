// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const winston = require('winston');
const morgan = require('morgan');

const logger = require('./src/logger.js');

const listen = winston.createLogger({
  transports: [
      new winston.transports.Console(),
    ]
});
const fileLogger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
fileLogger.stream = { //don't print the GET requests to the console
  write: function(message, encoding) {
    fileLogger.info(message);
  },
};
const detailLog = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs.log' })
  ]
});
console.log = detailLog.info.bind(detailLog);

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan('combined', { stream: fileLogger.stream }));
process.on('warning', e => logger.warn(e.stack));



const parseSet = require('./src/parser/directTraffic.js');
const methodSets = require('./src/samples/methodSets2.js');
const directTraffic = require('./src/directTraffic.js');
const parseXML = require('./src/parseXML.js');
const lhs = require('./src/lh/run.js');
const updateApps = require('./src/updateApps.js');
const addCalls = require('./src/addCalls.js');
const connect = require('./src/mongoose/connect2.js');
const del = require('./src/find/delete.js');
//const getbb = require('./src/bb/a.js');
const bbcycle = require('./src/bbcycle.js');
const names = require('./src/names/add.js');
//const pro = require('./src/process.js');
//const compare = require('./src/bb/rawtext.js');
const bbmaster = require('./src/bbmaster.js');
//pro();

//addCalls();
//compare(30000);
//var db = connect();
//del(db, 'bbperformances', {bbNum: {$gt: 1002}}, () => {listen.info("done")})


//bbmaster(909, 1, null, () => {listen.info("done")});
//bbcycle("redo", 1001, 1, () => {listen.info("done")});
//getbb(1293136, () => {listen.info("done")});

//names(() => listen.info("all done"));

var date2 = '2019-01-09T00:27:00.937Z';
//listen.info(parseSet(methodSets[0]).aboveBelow);
//listen.info(Date.parse(date2) - Date.parse('2019-01-09T00:26:18.937Z'));
let lhObj;
//lhs(o => listen.info(o));
const pb = require('./src/lh/plainbob.js');
//listen.info(pb().includes("135264"));

//parseXML(() => {logger.info('json file updated')})
//parseSet(methodSets[2])
// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  //listen.info("this is a test");
  //fileLogger.info("test " + request.headers["x-forwarded-for"]);
  listen.info(request._startTime);
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/'+process.env.SECRET3, function(request, response) {
  //compare(100000);
  bbmaster(null, 100, request._startTime, () => {listen.info("done")});
  response.sendStatus(200);
});

app.get('/'+process.env.SECRET, function(request, response) {
  directTraffic({}, request._startTime, () => {logger.info('done')});
  //listen.info(request._startTime);
  response.sendStatus(200);
});

app.get('/zapier'+process.env.SECRET, function(request, response) {
  logger.info('zapier access at ' + request._startTime);
  logger.info(request.query);
  console.log('starting request at ' + request._startTime);
  directTraffic(request.query, request._startTime, () => {
    logger.info('done with request at ' + request._startTime);
    
  });
  response.sendStatus(200);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  listen.info('Your app is listening on port ' + listener.address().port);
});


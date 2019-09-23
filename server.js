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
const find = require('./src/find/findFields.js');
const findmax = require('./src/find/findmax.js');
const del = require('./src/find/delete.js');
const refs = require('./src/reference/refs.js');
const track = require('./src/track.js');
//const getbb = require('./src/bb/a.js');
const bbcycle = require('./src/bbcycle.js');
const names = require('./src/names/add.js');
const pro = require('./src/process.js');
//const analyze = require('./src/query.js');
const prune = require('./src/bb/prune.js');
//const compare = require('./src/bb/rawtext.js');
const bbmaster = require('./src/bbmaster.js');
const bbmaster2 = require('./src/bbmaster2.js');
const update = require('./src/find/updateMany.js');
//pro((info) => listen.info(info));
var shoetest = require('shoetest');
//var test = 'camridge'

//connect();
//listen.info(shoetest.test("st alban", test, {end: "s?"}));
//listen.info(track());
//track();
//addCalls();
//compare(30000);
//var db = connect();
//del(db, 'bbperformances', {bbNum: {$gt: 1002}}, () => {listen.info("done")});
//prune();

//update(db, {coll: "bbtexts", query: {bbNum: {$in: [62311, 64975]}}, update: {$set: {recordlength: true}}}, () => {});
//find("bbperformance", {query: {}, fields: "titleFull"}, (rr) => {listen.info(rr.filter(r => refs.stageNames.every(s => !r.titleFull.toLowerCase().includes(s))))});
//find("bbtext", {query: {methods: {$size: 1}}, fields: "title"}, (rr) => {console.log(rr.length)});
//findmax("bbtext", {}, "-bbNum", (r) => {listen.info(r[0].bbNum)});
//bbmaster2(null, 100, null, () => {listen.info("done")});
//bbcycle("redo", 379839, 1, './bb/text.js', (p, du, dn) => {listen.info(p)});
//getbb(1293136, () => {listen.info("done")});
var x ;
//listen.info(Math.max(...[123, 456]))
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
  bbmaster2(null, 1000, request._startTime, () => {listen.info("done")});
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


const updateFiles = require('./updateFiles.js');
const parseMethods = require('./parseMethods.js');
const connectDrop = require('./mongoose/connectDrop.js');
const parse = require('./parser/directTraffic.js');
const addRecords = require('./mongoose/addRecords.js');
const fs = require('fs');
const times = require('./times.js').split(' ');
const logger = require('./logger.js');
const updateApps = require('./updateApps.js');
const things = ["method", "performance", "methodab", "title"]

//come here from a /zapier etc. get request
//if download=true, download the zip file from cccbr
//parse the xml to JSON
//otherwise work with already saved json file
//build arrays of methods and performances
//clear the mongodb database
//insertMany

module.exports = function directTraffic(query, time, cb) {
  let diff = Date.parse(time) - times[times.length-1];
  times.push(Date.parse(time));
  if (times.length > 200) {times.splice(0, times.length-200)}
  
  
  if (query.download == 'true' && diff > 120000) {
    
    logger.info('updating files');
    updateFiles(() => {
      doStuff(cb);
    })
  } else if (diff <= 120000) {
    logger.info('request at ' + time + ' is too soon');
    cb();
  } else if (!query.download) {
    doStuff(cb);
  }
  
  
  function doStuff(cb) {
    logger.info('doing stuff for request at' + time);
    parseMethods((results) => {
      if (!results || results.error) {
        logger.info(results.error);
        cb();
      } else {
        logger.info('number of methods: ' + results.methods.length);
        logger.info('number of performances: ' + results.performances.length);
        logger.info('number of methods above & below: ' + results.aboveBelow.length);

        connectDrop(["methods", "performances", "methodabs"], (db) => {
          let i = 0;
          addLoop();
          function addLoop() {
            let c = things[i];
            addRecords(results[c+"s"], c, () => {
              logger.info('finished adding '+c+'s');
              i++;
              if (i < things.length) {
                addLoop();
              } else {
                fs.writeFileSync('src/times.js', 'module.exports = "' + times.join(' ') + '"');
                console.log('updating methodNames files on other apps');
                updateApps(() => {
                  console.log('finished');
                  cb();
                });
                
              }
            });
          }
          
          /*
          logger.info('adding stuff');
            addRecords(results.methods, 'method', () => { 
              logger.info('finished adding methods')
              addRecords(results.performances, 'performance', () => {
                logger.info('finished adding performances');
                addRecords(results.aboveBelow, 'methodAB', () => {
                  logger.info('finished adding methodABs');
                  
                });
              });
            });
*/
        });

      }
      
    });
    
    
  
    
  }
  
}
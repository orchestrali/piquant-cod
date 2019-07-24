const fs = require('fs');
const parse = require('./parser/directTraffic.js');
const logger = require('./logger.js');
const combineAB = require('./combineAB.js');
const connect = require('./mongoose/connect2.js');
const find = require('./find/find.js');

module.exports = function parseMethods(cb) {

	if (fs.existsSync('work/collection.json')) {
		let collection = JSON.parse(fs.readFileSync('work/collection.json')).collection.methodSet;
    //.filter(o => Number(o.properties.stage) <= 12);
    logger.info('collection length: ' + collection.length);
    
    let connection = connect();
    find('call', {}, (calls) => {
      if (!calls) {
        cb({error: "no calls"});
      }
      find('title', {type: 'method'}, (titles) => {
        let results = {methods: [], performances: [], methodabs: [], titles: []}
        
        for (var i = 0; i < collection.length; i++) {
          console.log("methodSet " + (i+1));
          let methodSet = parse(collection[i], calls, titles);
          results.methods = results.methods.concat(methodSet.methods); 
          results.performances = results.performances.concat(methodSet.performances);
          results.titles = results.titles.concat(methodSet.titles);
          if (methodSet.methodabs.length > 0) {
            //console.log("methodSet with " + methodSet.aboveBelow.length + " methods above and below");
            combineAB(results.methodabs, methodSet.methodabs);
          }
          /*
          if (i % 100 == 0) {
            console.log(i+1 + " methodsets processed");
            console.log("methods above and below: " + results.aboveBelow.length);
          }
          */
        }
        cb(results);
        
        
      });
      
      
      
    });
		

	  
	  
	} else {
		cb({error: 'json file does not exist'});
	}
	

}
const logger = require('../logger.js');

module.exports = function addRecords(arr, model, cb) {
	let mod = require('../models/'+model+'.js');
  
  insertLoop();
  
  function insertLoop() {
    
    mod.insertMany(arr.slice(0, 4000), (err, docs) => {
      if (err) return logger.error(err);
      arr.splice(0, 4000);
      //console.log('some records added');
      if (arr.length > 0) {
        insertLoop();
      } else {
        cb();
      }
    });
    
  }
	

}
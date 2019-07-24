const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+'/'+process.env.DB+'?retryWrites=true';
const dbName = process.env.DB;

const logger = require('../logger.js');

module.exports = function connectDrop(drop, cb) {
	logger.info('attempting to connect to mongoDB');
  mongoose.connect(uri, {dbName: dbName, useNewUrlParser: true});
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  console.log('attempting to drop collection');
  /*
  db.dropCollection('methods', (err) => {
    if (err) logger.error(err);
    db.dropCollection('performances', (err) => {
    	if (err) logger.error(err);
    	db.dropCollection('methodabs', (err) => {
        cb(db);
      });
    });

  });
  */
  let i = 0;
  drops(drop[i]);
  
  function drops(coll) {
    db.dropCollection(coll, (err) => {
      if (err) logger.error(err);
      i++;
      if (i < drop.length) {
        drops(drop[i]);
      } else {
        cb(db);
      }
      
    });
    
  }
  
  
}
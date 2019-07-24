const router = require('./router.js');
const add = require('../mongoose/addRecords.js');
const connect = require('../mongoose/connect2.js');

module.exports = function run(cb) {
  let db = connect();
  
  db.dropCollection('leadheads', (err) => {
    if (err) console.log(err);
    db.dropCollection('cycles', (err) => {
      if (err) console.log(err);
      next(cb);
    });
  });
  
  
}

function next(cb) {
  router((o) => {
    add(o.leadheads, 'leadhead', () => {
      console.log('added leadheads');
      add(o.cycles, 'cycle', () => {
        console.log('added cycles');
        cb("done");
      });
    });
  });
  
}
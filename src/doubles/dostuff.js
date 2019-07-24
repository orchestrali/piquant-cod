var methods = require('./methods.js');
const find = require('../find/findFields.js');
const connect = require('../mongoose/connect2.js');
const fs = require('fs');
const s = require('stream');

module.exports = function stuff(cb) {
  connect();
  
  let q = {
    query: {stage: 5, class: {$in: ["Bob", "Place"]}},
    fields: "title oldtitle"
  };
  let q2 = {
    query: {stage: 5},
    fields: "title"
  }
  
  find("method", q, (arr) => {
    find("unmethod", q, (uarr) => {
      for (let i = 0; i < methods.length; i++) {
        let m = arr.find(o => o.title === methods[i].name + " Doubles" || o.oldtitle.includes(methods[i].name + " Doubles"));
        if (m) {
          methods[i].mNum = m._id;
        } else {
          let um = uarr.find(o => o.title === methods[i].name + " Doubles");
          if (um) {
            methods[i].umNum = um._id;
          }
        }
      }
      
      let stream = new s.Readable();
      stream.push(JSON.stringify(methods, null, 2));
      stream.push(null);
      stream.pipe(fs.createWriteStream('src/doubles/methods.json'));
      cb();
      
    });
    
    
    
  });
  
}
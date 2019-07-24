const get = require('./b.js');
const trim = require('./c.js');
const fs = require('fs');
const s = require('stream');

var duplicates = require('../duplicates.json');
var dne = require('../dne.json');

const connect = require('../mongoose/connect2.js');
const find = require('../find/find.js');
const add = require('../mongoose/addRecords.js');

//1294540

module.exports = function compare(max) {
  connect();
  var perfs;
  let start;
  let i;
  
  find("bbtext", {}, (arr) => {
    perfs = arr;
    start = arr.length;
    perfs.sort((a,b) => {return a.num - b.num});
    i = perfs[perfs.length-1].num+1;
    console.log("starting");
    loop();
    
    
  });
  
  
  
  
  function loop() {
    if (i%200 === 0) console.log("working "+i);
    get(i, (body) => {
      if (!body.startsWith("No such performance")) {
        let p = trim(body);
        let prev = perfs.find(o => o.body === p);
        if (prev) {
          let dup = duplicates.findIndex(a => a[0] === prev.num);
          if (dup > -1) {
            duplicates[dup].push(i);
          } else {
            duplicates.push([prev.num, i]);
          }
        } else {
          perfs.push({
            num: i,
            body: p
          });
        }
      } else {
        dne.push(i);
      }
      i++;
      if (i <= max) {
        loop();
      } else {
        finish();
      }
    });
  }
  
  
  function finish() {
    let things = {duplicates: duplicates, dne: dne};
    for (let key in things) {
      let stream = new s.Readable();
      stream.push(JSON.stringify(things[key], null, 2));
      stream.push(null);
      stream.pipe(fs.createWriteStream('src/'+key+'.json'));
    }
    add(perfs.slice(start), "bbtext", () => {console.log("finished")});
    
    
    
  }
  
  
}



/*
get(b, (body2) => {
      let x = trim(body1);
      let y = trim(body2);
      
      if (x === y) {
        console.log("these bodies are the same");
      } else {
        console.log("different");
      }
      
    })
*/
const bbcycle = require('./bbcycle.js');
const connect = require('./mongoose/connect2.js');
const fs = require('fs');
const s = require('stream');
const findmax = require('./find/findmax.js');
const add = require('./mongoose/addRecords.js');
const times = require('./times2.js').split(' ');
const compare = require('./comparebb.js');
const test = require('./bb/test.js');
var st = require('./start2.js');

var duplicates = require('./duplicates.json');
var dne1 = require('./dne.json');

module.exports = function bbmaster(start, max, time, cb) {
  let diff;
  if (time) {
    diff = Date.parse(time) - times[times.length-1];
    times.push(Date.parse(time));
    if (times.length > 200) {times.splice(0, times.length-200)}
  }
  if (diff && diff < 60000) {
    console.log("too soon");
  } else {
    connect();
    let writestart;
    if (start === null) {
      findmax("bbtext", {}, "-bbNum", (r) => {
        start = Math.max(r[0].bbNum, dne1[dne1.length-1]);
        let dup = duplicates.find(d => d.some(e => e > start));
        while (dup) {
          start = Math.max(...dup);
          dup = duplicates.find(d => d.some(e => e > start));
        }
        start++;
        next();
      });
    } else {
      next();
    }
    
    function next() {
      console.log("starting: "+start);
      bbcycle("redo", start, max, './bb/text.js', (perfs, dup, dne) => {
        duplicates = addArr(duplicates, dup);
        dne1 = addArr(dne1, dne).sort((a,b) => a-b);
        let things = {duplicates: duplicates, dne: dne1};
        let last = [dne1[dne1.length-1], start];
        if (perfs.length) last.push(perfs[perfs.length-1].bbNum);
        let next = Math.max(...last)+1;
        console.log("next: "+next);
        test(perfs, duplicates, (pp, dd) => {
          console.log("perfs to add: "+pp.length);
          things.duplicates = dd;
          if (writestart) fs.writeFileSync('src/start2.js', 'module.exports = ' + next + ';');
          if (diff) fs.writeFileSync('src/times2.js', 'module.exports = "' + times.join(' ') + '"');
          for (let key in things) {
            let stream = new s.Readable();
            stream.push(JSON.stringify(things[key], null, 2));
            stream.push(null);
            stream.pipe(fs.createWriteStream('src/'+key+'.json'));
          }
          if (pp.length) {
            add(pp, "bbtext", () => {
              cb();
            });
          } else {
            cb();
          }
          
          
        });
        
        

      
      });
    }
    
    
    
  }
  
  
  
  
}


function addArr(a, b) {
  b.forEach(e => {
    if (e > 0 && !a.includes(e)) {
      a.push(e);
    } else if (Array.isArray(e) && Array.isArray(a) && !a.some(arr => e.some(n => arr.includes(n)))) {
      a.push(e);
    }
  });
  return a;
}
const get = require('./bb/a.js');
const bbcycle = require('./bbcycle.js');
const fs = require('fs');
const s = require('stream');
const find = require('./find/find.js');
const add = require('./mongoose/addRecords.js');
const times = require('./times2.js').split(' ');
const compare = require('./comparebb.js');

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
    let writestart;
    if (start === null) {
      start = require('./start.js');
      writestart = true;
    }
    bbcycle("redo", start, max, (perfs, dup, dne) => {
      dup.forEach(d => duplicates.push(d));
      dne1 = dne1.concat(dne);
      find("bbperformance", {}, (results) => {
        let i = 0;
        while (i < perfs.length) {
          let current = perfs[i];
          let d = results.find(o => o.date === current.date && o.location.place === current.location.place && o.titleFull === current.titleFull);
          if (d && compare(current, d)) {
            if (current.bbNum != d.bbNum) {
              let index = duplicates.findIndex(a => a.includes(d.bbNum));
              if (index > -1) {
                duplicates[index].push(current.bbNum);
              } else {
                duplicates.push([d.bbNum, current.bbNum]);
              }
            }
            perfs.splice(i, 1);
          } else {
            i++;
          }
        }
        let last = perfs.length > 0 ? perfs[perfs.length-1].bbNum + 1 : start;
        //console.log("last: "+last);
        if (writestart) fs.writeFileSync('src/start.js', 'module.exports = ' + last + ';');
        if (diff) fs.writeFileSync('src/times2.js', 'module.exports = "' + times.join(' ') + '"');
        add(perfs, "bbperformance", () => {
          let things = {duplicates: duplicates, dne: dne1};
          for (let key in things) {
            let stream = new s.Readable();
            stream.push(JSON.stringify(things[key], null, 2));
            stream.push(null);
            stream.pipe(fs.createWriteStream('src/'+key+'.json'));
          }
          cb();
        });

      });
    });
    
    
  }
  
  
  
  
}
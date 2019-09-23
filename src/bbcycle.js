var perfs = require('./performance.json');
var notes = require('./perfornotes.json');
//const run = require('./bb/a.js');
const fs = require('fs');
const s = require('stream');

const connect = require('./mongoose/connect2.js');
const exclude = require('./dne.json');

var dne = [];
var duplicates = [];
//440717 = 1!!!

module.exports = function bbcycle(action, start, x, path, cb) {
  let f = require(path);
  //let connection = connect();
  let num = start === 0 ? perfs[perfs.length-1].bbNum + 1 : start;
  if (action === "redo") {
    perfs = [];
    notes = [];
  } 
  let i = 0;
  let prev;
  
  loop(num);
  
  function loop(n) {
    if (!exclude.includes(n)) {
      try {
        if (i%200 === 0) console.log("working "+n);
        f(n, prev, (err, obj, note, body) => {
          if (err) {
            notes.push({err: err, num: n});
            write(notes);
            cb(perfs, duplicates, dne);
          } else if (obj) {
            if (obj.duplicate) {
              duplicates.push([obj.duplicate, n]);
            } else {
              perfs.push(obj);
              notes.push(note);
              prev = body;
            }
          } else if (obj === null) {
            dne.push(n);
          }
          n++, i++;
          //console.log("x "+x);
          if (i < x && !err) {
            loop(n);
          } else if (!err) {
            write(notes);
            cb(perfs, duplicates, dne);
          }
        });
        
        
      }
      catch (e) {
        notes.push({error: e.message, num: n});
        write(notes);
        cb(perfs, duplicates, dne);
      }
      
    } else {
      n++, i++;
      if (i < x) {
        loop(n);
      } else {
        write(notes);
        cb(perfs, duplicates, dne);
      }
    }
    
  }
  
  function write(n) {
    console.log("writing notes");
    //let stream = new s.Readable();
    //stream.push(JSON.stringify(p, null, 2));
    //stream.push(null);
    let notestream = new s.Readable();
    notestream.push(JSON.stringify(n, null, 2));
    notestream.push(null);
    //stream.pipe(fs.createWriteStream('src/performance.json'));
    notestream.pipe(fs.createWriteStream('src/perfornotes.json'));
    //.on('finish', () => {
      //cb();
    //})
    
  }
  
  
}

/*

*/
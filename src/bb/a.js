const fs = require('fs');
const s = require('stream');
//const recents = require('../dperfs.json');

module.exports = function router(num, prev, cb) {
  f(0)(num, (body) => { //f(0) = b.js
    if (body && body.length > 0 && !body.includes("No such performance") && !body.includes("This record has been deleted.")) {
      try {
      //console.log("c");
      let performance = f(1)(body);
      
      if (!prev || prev.body != performance) {
        //console.log(performance);
      //console.log("d");
      let tokens = f(2)(performance);
        //console.log("e");
        let pairs = f(3)(tokens);
        //console.log("f");
        f(4)(pairs, tokens);
        //console.log("g");
        f(5)(pairs);
        //console.log("h");
        let elements = f(6)(pairs, tokens);
      //tokens = null;
      //console.log(elements[0]);
        //console.log("i");
        f(7)(elements, pairs);
      //pairs = null;
        //console.log("j");
        let prelim = f(8)(elements);
      //elements = null;
        //console.log("k");
        f(9)(num, prelim, (err, obj, notes) => {
          if (err) {
            cb(err)
          } else {
            cb(null, obj, notes, {num: num, body: performance});
          }
        });
      //prelim = null;
        //cb(obj);
        
      } else {
        cb(null, {duplicate: prev.num});
      }
      }
      catch (e) {
        console.log("error in a.js");
        cb({message: e.message, loc: "a.js", stack: e.stack})
      }
    } else {
      console.log("no such performance");
      cb(null, null);
    }
  });
  
}



const letters = [];
for (let i = 98; i < 109; i++) {
  letters.push(String.fromCharCode(i));
}

function f(n) {
  return require("./"+letters[n]+".js");
}


/*
let stream = new s.Readable();
          stream.push(JSON.stringify(stages, null, 2));
          stream.push(null);
          let nameStream = new s.Readable();
          nameStream.push(JSON.stringify(names, null, 2));
          nameStream.push(null);
          //fs.writeFileSync('src/stages.js', 'module.exports = ' + JSON.stringify(stages));
          stream.pipe(fs.createWriteStream('src/stages.json'));
          nameStream.pipe(fs.createWriteStream('methodNames2.json'));
*/
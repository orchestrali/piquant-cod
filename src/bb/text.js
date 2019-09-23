const k2 = require('./k2.js');
const method = require('./methods/title.js');

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
        //console.log(prelim);
      //elements = null;
        //console.log("k2");
        let results = k2(num, prelim);
        if (results.obj.title) {
          method(results.obj.title, (obj) => {
            if (obj) {
              for (let key in obj) {
                results.obj[key] = obj[key];
              }
            }
            cb(null, results.obj, results.notes, {num: num, body: performance});
          });
        } else {
          cb(null, results.obj, results.notes, {num: num, body: performance});
        }
        
        
      //prelim = null;
        //cb(obj);
        
      } else {
        cb(null, {duplicate: prev.num});
      }
      }
      catch (e) {
        console.log("error in text.js");
        cb({message: e.message, loc: "text.js", stack: e.stack})
      }
    } else {
      console.log("no such performance "+num);
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
{
    "num": 62311,
    "discard": [
      {
        "attribs": {
          "class": "annotation record-length"
        },
        "text": " This peal has been recognised as a record length in the method. "
      }
    ],
    "notes": [
      "more than one footnote element"
    ]
  }
  {
  "num": 64975, //same thing
  }
*/
const title = require('../k/title.js');


module.exports = function texts(num, cb) {
  let results = {num: num};
  
  f(0)(num, (body) => {
    if (body && body.length > 0 && !body.includes("No such performance") && !body.includes("This record has been deleted.")) {
      let p = f(1)(body);
      let tokens = f(2)(p);
      let pairs = f(3)(tokens);
      f(4)(pairs, tokens);
      f(5)(pairs);
      let elements = f(6)(pairs, tokens);
      f(7)(elements, pairs);
      let prelim = f(8)(elements);
      
      if (prelim.details.length > 0 && prelim.details[0].fulltext) {
        results.details = prelim.details[0].fulltext;
      }
      
      if (prelim.title) {
        let t = title(prelim.title);
        for (let key in t) {
          results[key] = t[key];
        }
      }
      cb(results);
    }
  });
  
  
}


const letters = [];
for (let i = 98; i < 109; i++) {
  letters.push(String.fromCharCode(i));
}

function f(n) {
  return require("../"+letters[n]+".js");
}
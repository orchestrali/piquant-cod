const find = require('../../find/find.js');


module.exports = function title(t, cb) {
  let reg = {$regex: "^"+t+"$", $options: "i"};
  
  
  find("method", {$or: [{title: reg}, {oldtitle: reg}]}, (rr) => {
    if (rr.length === 1) {
      cb({methods: [rr[0].title]});
    } else if (rr.length === 0 && t.endsWith("Doubles")) {
      find("variation", {title: reg}, (vv) => {
        if (vv.length === 1) {
          cb({variations: [vv[0].title]})
        } else {
          cb(null);
        }
      });
      
    } else {
      cb(null);
    }
  });
  
}
const places = require('../places.js');
const cycle = require('./cycle.js');

module.exports = function plainbob() {
  let lhs = cycle("1342");
  
  for (var i = 5; i <= places.length; i++) {
    let co = "";
    
    for (let j = 1; j < i; j+=2) {
      co += places[j];
    }
    for (let j = i%2 == 1 ? i-1 : i-2; j > 1; j-=2) {
      co += places[j];
    }
    
    let lh = "13";
    let f = 0, b = co.length-2;
    for (let k = 1; k < co.length; k++) {
      if (k%2 == 1) {
        lh += co[b];
        b--;
      } else if (k%2 == 0) {
        lh += co[f];
        f++;
      }
    }
    lhs = lhs.concat(cycle(lh));
    
  }
  
  return lhs;
}
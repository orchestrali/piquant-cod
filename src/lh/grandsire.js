const places = require('../places.js');
const cycle = require('./cycle.js');

module.exports = function grandsire() {
  let lhs = cycle("12534");
  
  for (let i = 6; i <= places.length; i++) {
    let co = "";
    for (let j = 4; j < i; j+=2) {
      co += places[j];
    }
    for (let j = i%2 == 1 ? i-2 : i-1; j > 2; j-=2) {
      co += places[j];
    }
    co += "3";
    
    let lh = "12";
    let f = 0, b = co.length-1;
    for (let k = 0; k < co.length; k++) {
      if (k%2 == 0) {
        lh += co[f];
        f++;
      } else if (k%2 == 1) {
        lh += co[b];
        b--;
      }
    }
    lhs = lhs.concat(cycle(lh));
  }
  
  return lhs;
}
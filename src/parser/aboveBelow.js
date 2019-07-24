const places = require('../places.js');

module.exports = function aboveBelow(method) {
  let A = {
    loc: "above",
    placeNotation: [],
    methods: [method.title]
  };
  let B = {
    loc: "below",
    placeNotation: [],
    methods: [method.title]
  };

  let pn = method.pnFull;
  
  for (var i = 0; i < method.huntPath.length; i++) {
    let above = "", below = "";
    if (Array.isArray(pn[i])) {
      let index2 = i == method.huntPath.length-1 ? 0 : i+1;
      for (var j = 0; j < pn[i].length; j++) {
        if (pn[i][j] < Math.min(method.huntPath[i], method.huntPath[index2])) {
          below += places[pn[i][j]-1];
        } else if (pn[i][j] > Math.max(method.huntPath[i], method.huntPath[index2])) {
          above += places[pn[i][j]-1];
        }
      }
    }
    A.placeNotation.push(above);
    B.placeNotation.push(below);
  }
  
  return [A, B];
}
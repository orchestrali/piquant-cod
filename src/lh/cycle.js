const places = require('../places.js');
const transpose = require('./transpose.js');

//given an initial leadhead, generate the whole cycle of leadheads
module.exports = function cycle(lh) {
  let stage = lh.length;
  let lhs = [];
  let nextlh;
  let tr = lh;
  do {
    nextlh = transpose(lh, tr);
    lhs.push(lh);
    lh = nextlh;

  } while (nextlh != places.substring(0, stage));
  
  return lhs;
  
}
const places = require('../places.js');

module.exports = function transpose(lh, tr) {
  let newlh = '';
  
  for (var i = 0; i < lh.length; i++) {
    let index = places.indexOf(tr[i]);
    newlh += lh[index];
  }
  
  return newlh;
  
}
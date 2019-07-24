const compareArr = require('./compareArr.js');

module.exports = function combineAB(arr, AB) {
  let max = AB.length;
  for (var i = 0; i < max; i++) {
    const current = AB[i];
    let index = arr.findIndex(o => o.loc == current.loc && compareArr(o.placeNotation, current.placeNotation));
    if (index > -1) {
      arr[index].methods = arr[index].methods.concat(current.methods);
    } else {
      arr.push(current);
    }
  }
  
}
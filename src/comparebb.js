const compareArr = require('./compareArr.js');
const str = ["date", "time", "titleFull", "details", "footnote"];
const lockeys = ["place", "address"]

//compares two arrays element by element
module.exports = comparebb;


function comparebb(a, b) {
  str.forEach(k => {
    if (a[k] != b[k]) {
      return false;
    }
  });
  lockeys.forEach(k => {
    if (a.location[k] != b.location[k]) {
      return false;
    }
  });
  return true;
}
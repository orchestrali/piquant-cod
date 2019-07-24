//compares two arrays element by element
module.exports = function compareArr(a, b) {
  if (a.length != b.length) {
    return false;
  } else {
    for (var i = 0; i < a.length; i++) {
      if (Array.isArray(a[i]) && Array.isArray(b[i])) {
        if (!compareArr(a[i], b[i])) return false;
      } else if (Array.isArray(a[i]) || Array.isArray(b[i])) {
        return false;     
      } else if (a[i] != b[i]) {
        return false;
      }
    }
    return true;
  }
}

//starting a & b must be the same length, but nested arrays can be different lengths
function countDiff(a, b) {
  let count = 0;
  if (a.length != b.length) {
    count++;
  } else {
    for (var i = 0; i < a.length; i++) {
      if (Array.isArray(a[i]) && Array.isArray(b[i])) {
        count += countDiff(a[i], b[i]);
      } else if (Array.isArray(a[i]) || Array.isArray(b[i])) {
        count++;     
      } else if (a[i] != b[i]) {
        count++;
      }
    }
  }
  
  return count;
}
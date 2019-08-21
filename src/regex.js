
module.exports = function findtruth(str, test) {
  if (str === "") return false;
  let locs = [];
  let i = 0;
  let found
  do {
    found = str.indexOf(test, i);
    if (found > -1) {
      locs.push(found);
      i = found+1;
    }
  } while (i < str.length-test.length && found != -1);
  
  if (locs.length === 0) {
    return false;
  }
  if (/[^\w]/.test(test[test.length-1]) && locs.every(loc => loc === 0 || /[^\w]/.test(str[loc-1]))) {
    return true;
  }
  if (locs.every(loc => (loc > 0 && /\w/.test(str[loc-1])) || (loc + test.length != str.length && /\w/.test(str[loc+test.length])))) {
    return false;
  }
  if (test === "s" && locs.every(loc => /'/.test(str[loc-1]))) {
    return false;
  }
  return true;
}


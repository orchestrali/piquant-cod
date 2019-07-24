
module.exports = function findlocs(str, test) {
  let locs = [];
  
  if (str === test) {
    locs.push(0);
    return locs;
  } 
  
  let i = 0;
  let found;
  do {
    found = str.indexOf(test, i);
    if (found > -1) {
      locs.push(found);
      i = found+1;
    }
  } while (i < str.length-test.length && found != -1);
  
  let j = 0;
    
  while (j < locs.length) {
    let c = locs[j];
    if (c > 0 && /\w/.test(str[c-1])) {
      locs.splice(j, 1);
    } else if (/\w/.test(test[test.length-1]) && c + test.length != str.length && /\w/.test(str[c+test.length])) {
      locs.splice(j, 1);
    } else if (test === "s" && c > 0 && /'/.test(str[c-1])) {
      locs.splice(j, 1);
    } else {
      j++;
    }
  }
    
  return locs;
}
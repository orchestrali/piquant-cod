const other = ["rounds", "call changes", "tolling", "firing", "plain hunt", "called changes"];

module.exports = function next(t, stuff) {
  for (let i = 0; i < other.length; i++) {
    let index = t.indexOf(other[i]);
    if (index > -1 && (index === 0 || /[^\w]/.test(t[index-1]))) {
      if (stuff.nonMethods) {
        stuff.nonMethods.push(other[i]);
      } else {
        stuff.nonMethods = [other[i]];
      }
      t = t.replace(new RegExp(other[i], "g"), "").replace(/  +/g, " ");
    }
  }
  return t;
}
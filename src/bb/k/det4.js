const filter = require('../../names/filter.js');

const plainClass = ["Bob", "Place", "Slow Course"];
const tdclass = ["Treble Bob", "Delight", "Surprise"];

module.exports = function abbr(t, stuff) {
  let filtered = filter(stuff);

  if (filtered) {
    for (let i = 0; i < filtered.length; i++) {
      if (t.indexOf(filtered[i].abbr.toLowerCase()) > -1) {
        if (stuff.abbr && !stuff.abbr.some(o => o.abbr === filtered[i].abbr)) { //this is maybe not good enough
          stuff.abbr.push(filtered[i]);
        } else {
          stuff.abbr = [filtered[i]];
        }
        t = t.replace(filtered[i].abbr.toLowerCase(), "").replace(/  +/g, " ");
      }
    }
  }
  
  return t;
}
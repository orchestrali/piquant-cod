const index = require('./alt.js');

const plainClass = ["Bob", "Place", "Slow Course"];
const tdclass = ["Treble Bob", "Delight", "Surprise"];

module.exports = function filter(stuff) {
  
  let filtered;
  if (stuff.classStages && stuff.classStages.length > 0) {
    filtered = index.filter(o => stuff.classStages.some(e => o.class && o.class.toLowerCase() === e.class && o.stage === e.stage))
  } else if (stuff.catStages) {
    let plain = [];
    let td = [];
    stuff.catStages.forEach(o => {
      if (o.cat === "plain") plain.push(o.stage);
      if (o.cat === "treble dodging") td.push(o.stage);
    });
    if (plain.length > 0) {
      filtered = index.filter(o => plainClass.includes(o.class) && plain.includes(o.stage));
    } else if (td.length > 0) {
      filtered = index.filter(o => tdclass.includes(o.class) && td.includes(o.stage));
    }
  } else if (stuff.stages && stuff.stages.length > 0) {
    filtered = index.filter(o => stuff.stages.includes(o.stage));
  } else if (stuff.numbells) {
    //console.log("numbells");
    filtered = index.filter(o => o.stage <= stuff.numbells);
  } else {
    filtered = index;
  }
  console.log("abbr "+filtered.length)
  //filtered.forEach(o => console.log(o.abbr));
  return filtered;
  
}
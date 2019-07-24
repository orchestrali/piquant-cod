const template = {
    association: "soc",
    location: "loc",
    dateTimeTenor: "dtt",
    title: "title",
    //details: "detail",
    attribution: "att",
    ringers: "ring",
    footnote: "foot",
    event: "event"
  };

const details = require('./k/title2.js');

var notes = [];

module.exports = function traffic(num, prelim, cb) {
  let obj = {
    bbNum: num
  };
  let n = {
    num: num,
  }
  if (prelim.pealSpeed) obj.pealSpeed = prelim.pealSpeed.replace("Peal speed: ", "");
  for (let key in prelim) {
    if (key === "title") {
      countText([prelim[key]], key, 1);
    } else {
      countText(prelim[key], key, 1);
    }
    if (template[key]) {
      let f = require('./k/' + template[key] + '.js');
      let results = f(prelim[key]);
      for (let k in results) {
        obj[k] = results[k];
      }
      
    }
    
  }
  if (prelim.discard.length > 0) {
    n.discard = [];
    prelim.discard.forEach(o => {
      let d = {}
      if (o.attributes) d.attribs = o.attributes;
      if (o.fulltext) d.text = o.fulltext;
      if (o.content) d.hascontent = true;
      n.discard.push(d);
    })
  }
  n.notes = notes;
  n.multitext = multitext;
  let detail = prelim.details.length > 0 && prelim.details[0].fulltext ? prelim.details[0].fulltext.toLowerCase() : "";
  if (!obj.title && detail === "") {
    cb(null, obj, n);
  } else {
    details(obj, n, prelim.details, (err, r) => {
      if (err) {
        cb(err)
      } else {
        for (let k in r) {
          obj[k] = r[k];
        }
        prelim = null;
        cb(null, obj, n);
      }

    });
  }
  
  //return obj;
}

var multitext = [];

function countText(x, key, level) {
  if (Array.isArray(x)) {
    if (level === 1 && x.length > 1 && !notes.includes("more than one "+key+" element")) {
      notes.push("more than one "+key+" element");
    }
    x.forEach(o => {
      if (o.text && o.text.length > 1) {
        if (!multitext.includes(key)) multitext.push(key);
      }
      if (o.content) {
        countText(o.content, key, 2);
      }
    })
  }
  if (level === 1 && key === "location") {
    countText(x.fullPlace, "fullplace", 2);
    countText(x.address, "address", 2);
  }
  
}
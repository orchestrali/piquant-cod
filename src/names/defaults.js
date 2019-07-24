const fs = require("fs");
const s = require("stream");

const known = [{name: "Cambridge", descriptor: "Surprise"}, {name: "Kent", descriptor: "Treble Bob"}, {name: "Oxford", descriptor: "Treble Bob"}, {name: "Stedman", descriptor: "Principle"}, {name: "Double Oxford", descriptor: "Bob"}];

module.exports = function defaults(names, cb) {
  let multiples = [];
  let numnames = 0;
  
  for (let i = 0; i < names.length; i++) {
    if (names[i].classes && names[i].classes.length > 1) {
      let cStages = [];
      for (let j = 3; j < 23; j++) {
        for (let k = 0; k < names[i].classes.length; k++) {
          if (names[i].classes[k].stages.includes(j)) {
            let cs = cStages.find(o => o.stage === j);
            if (cs) {
              cs.classes.push(names[i].classes[k].descriptor); //.replace("Little ", "").replace("Differential ", "")
            } else {
              cStages.push({
                name: names[i].name,
                classes: [names[i].classes[k].descriptor],
                stage: j
              });
            }
          }
        }
      }
      if (cStages.find(o => o.classes.length > 1)) numnames++;
      for (let n = 0; n < cStages.length; n++) {
        if (cStages[n].classes.length > 1) {
          multiples.push(cStages[n]);
        }
      }
    }
  }
  console.log("num names w multiple: "+numnames);
  console.log(multiples.length);
  let stream = new s.Readable();
  stream.push(JSON.stringify(multiples, null, 2));
  stream.push(null);
  stream.pipe(fs.createWriteStream('src/names/multiples.json'));
  cb();
}
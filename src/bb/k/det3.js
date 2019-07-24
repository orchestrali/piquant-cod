const stageNames = ["singles", "minimus", "doubles", "minor", "triples", "major", "caters", "royal", "cinques", "maximus", "sextuples", "fourteen", "septuples", "sixteen", "octuples", "eighteen"];

const classes = ["slow course", "treble bob", "treble place", "delight", "surprise", "alliance", "hybrid", "bob", "place", "differential", "principle"];

const classes2 = ["Slow Course", "Treble Bob", "Treble Place", "Delight", "Surprise", "Alliance", "Hybrid", "Bob", "Place", "Differential", "Principle"];

const abbr = {TB: "Treble Bob", "T.B.": "Treble Bob"}


module.exports = function classStage(t, stuff) {
  for (let i = 0; i < classes.length; i++) {
    for (let j = 0; j < stageNames.length; j++) {
      if (t.indexOf(classes[i]+" "+stageNames[j]) > -1) {
        if (stuff.classStages) {
          stuff.classStages.push({class: classes2[i], stage: j+3});
        } else {
          stuff.classStages = [{class: classes2[i], stage: j+3}];
        }
        t = t.replace(new RegExp(classes[i]+" "+stageNames[j], "g"), "").replace(/  +/g, " ");
      }
      if (t.indexOf("tb "+stageNames[j]) > -1 || t.indexOf("t.b. "+stageNames[j]) > -1) {
        if (stuff.classStages) {
          stuff.classStages.push({class: "Treble Bob", stage: j+3});
        } else {
          stuff.classStages = [{class: "Treble Bob", stage: j+3}];
        }
      }
      if (t.includes("surpirse "+stageNames[j]) || t.includes("suprise "+stageNames[j])) {
        if (stuff.classStages) {
          stuff.classStages.push({class: "Surprise", stage: j+3});
        } else {
          stuff.classStages = [{class: "Surprise", stage: j+3}];
        }
      }
    }
    if (t.indexOf(classes[i]) > -1) {
      stuff.classes.push(classes[i]);
      t = t.replace(new RegExp(classes[i], "g"), "").replace(/  +/g, " ");
    }
  }
  for (let i = 0; i < stageNames.length; i++) {
    if (t.includes("plain "+stageNames[i])) {
      let cls = [{class: "Bob", stage: i+3}, {class: "Place", stage: i+3}];
      if (stuff.classStages) {
        stuff.classStages.push(cls[0], cls[1]);
      } else {
        stuff.classStages = cls;
      }
      t = t.replace("plain "+stageNames[i], "").replace(/  +/g, " ");
    }
    
    if (i%2 === 1) {
      let tests = ["treble dodging "+stageNames[i], "treble-dodging "+stageNames[i]];
      let td = tests.find(s => t.includes(s));
      if (td) {
        let cls = ["Treble Bob", "Delight", "Surprise"]
        if (stuff.classStages) {
          cls.forEach(n => {
            if (!stuff.classStages.find(o => o.class === n)) {
              stuff.classStages.push({class: n, stage: i+3});
            }
          });
        } else {
          stuff.classStages = cls.map(n => {return {class: n, stage: i+3}});
        }
        t = t.replace(td, "").replace(/  +/g, " ");
      }
      
    }
    
  }
  if (stuff.classStages && stuff.classStages.some(o => o.class === "Treble Bob")) {
    let cls = ["Delight", "Surprise"];
    let stage = stuff.classStages.find(o => o.class === "Treble Bob").stage;
    cls.forEach(n => {
      if (!stuff.classStages.find(o => o.class === n)) {
        stuff.classStages.push({class: n, stage: stage});
      }
    });
  }
  if (stuff.catStages && stuff.catStages.some(o => o.cat === "plain") && stuff.catStages.some(o => o.cat === "treble dodging")) {
    stuff.bothcats = true;
  }
  
  return t;
}
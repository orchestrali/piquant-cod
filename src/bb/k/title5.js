const stageNames = require('../../reference/stageNames.js');
const classes = require('../../reference/classes.js');
const stageclasses = require('../../reference/stageclasses.js');
const tests = {
  stageName: stageNames,
  classword: ["delight", "surprise", "alliance", "hybrid", "bob", "place", "differential", "principle", "suprise", "surpirse"],
  abbr1: ["tb", "t.b.", "s", "a", "d", "b", "del", "sc", "s.c"],
  abbr2: ["lb", "p", "pb", "c.b.", "cb", "dncb", "diff"],
  category: ["dodging", "treble-dodging"],
  other: ["spliced", "and", "of", "each", "methods", "method", "principles", "principle", "variations", "variation", "on", "extent", "called", "call", "variable", "cover", "mixed", "half", "muffled", "half-muffled", "handstroke", "backstroke", "hand", "back", "stroke", "front", "+"],
  plain: ["plain"],
  nonmethod: ["rounds", "changes", "tolling", "firing", "hunt", "calls"]
};

const abbr = {tb: "treble bob", "t.b.": "treble bob", s: "surprise", d: "delight", b: "bob", a: "alliance"};
const abbr1 = ["tb", "s", "a", "d", "b", "sc"];
const abbr2 = ["t.b.", "del", "ltp", "la", "lb", "s.c"];
const types = ["stageName", "classword", "abbr1", "abbr2", "category", "other", "treble", "unknown", "number", "plain", "nonmethod"];
const dtests = [stageclasses, stageNames, classes, abbr1, abbr2];
const td = ["surprise", "treble bob", "delight"];
const titledets = require('./titledets.js');
const regex = require('../../regex.js');
const replace = [/,/g, /\./g, /;/g, /\//g];

module.exports = function titlecats(t, dets, perf) {
  let info = {
    stages: [],
    classes: [],
    classStages: [],
    nonMethods: []
  }
  let dcheck = [], tcheck = [];
  //console.log(dets);
  //console.log(regex(dets, "s"));
  if (dets === "") {
    info.dets = "done";
  } else {
    info.dets = "check";
    dtests.forEach((dt, i) => {
      if (dt.some(e => regex(dets, e))) {
        dcheck.push(1);
        if (i === 1) {
          let stages = dt.filter(e => regex(dets, e)).map(e => stageNames.indexOf(e)+3).filter(e => !info.stages.includes(e));
          info.stages = info.stages.concat(stages);
        }
      } else {
        dcheck.push(0);
      }
    });
  }
  //console.log(dcheck);
  if (!t || t === "") {
    info.title = "done";
    return info;
  }
  replace.forEach(rr => {
    t = t.replace(rr, " ");
  });
  //console.log("title: "+t);
  let words = t.replace(/  +/g, " ").split(" ");
  let tokens = [];
  let possible = [];
  let unknown = [];
  
  for (let i = 0; i < words.length; i++) {
    let token = {
      value: words[i]
    }
    for (let key in tests) {
      if (tests[key].includes(words[i])) {
        token.type = key;
      }
    }
    if (words[i] === "treble") {
      token.type = "treble";
    } else if (/\d+/.test(words[i])) {
      token.type = "number";
    }
    if (!token.type) {
      token.type = "unknown";
      unknown.push(words[i]);
    }
    tokens.push(token);
  }
  let counts = {};
  types.forEach(typ => {
    counts[typ] = tokens.filter(tok => tok.type === typ).length;
  });
  
  if (tokens.length === 1 && tokens[0].type === "stageName") {
    info.stages.push(tests.stageName.indexOf(tokens[0].value)+3);
    info.title = "done";
    if (info.dets === "check") {
      info.check = dcheck;
    }
    //console.log(info);
    return info; //done
  }
  let prevtype, prevtoken;
  let plainbob;
  
  for (let i = 0; i < tokens.length; i++) {
    let typ = tokens[i].type;
    //console.log("token type "+typ);
    if ((prevtype === "plain" && tokens[i].value === "hunt") || typ === "nonmethod") {
      plainbob = false;
      info.nonMethods.push(tokens[i].value);
    } else if (prevtype === "plain" && tokens[i].value != "bob") {
      info.classes.push("bob", "place", "slow course");
      plainbob = false;
    } else if (prevtype === "plain" && tokens[i].value === "bob") {
      plainbob = true;
    }
    if (tokens[i].value === "and" && prevtype === "stageName") {
      info.possible = t.split(" and ");
    }
    if (typ === "stageName") {
      let stage = tests.stageName.indexOf(tokens[i].value)+3;
      info.stages.push(stage);
      if (prevtype === "classword") {
        info.classStages.push({class: info.classes[info.classes.length-1], stage: stage});
      } else if (prevtype === "category") {
        td.forEach(n => info.classStages.push({class: n, stage: stage}));
      }
    } else if (typ === "classword") {
      if (prevtype === "treble" && (tokens[i].value === "bob" || tokens[i].value === "place")) {
        info.classes.push("treble "+tokens[i].value);
      } else if (tokens[i].value === "suprise" || tokens[i].value === "surpirse") {
        info.classes.push("surprise");
      } else {
        info.classes.push(tokens[i].value);
      }
    } else if (typ === "category") {
      if (tokens[i].value === "treble-dodging" || prevtype === "treble") {
        info.classes.push("treble bob", "surprise", "delight");
      }
    } else if (typ === "abbr1") {
      info.classes.push(abbr[tokens[i].value]);
    }
    prevtype = typ;
  }
  if (info.classStages.find(o => o.stage === 5 && o.class === "bob") && !info.classStages.find(o => o.class === "place")) {
    info.classStages.push({class: "place", stage: 5});
  }
  if (counts.abbr2 === 0 && counts.unknown === 0 && (counts.plain === 0 || !plainbob)) {
    info.title = "done";
  } else {
    info.title = "check";
    let checktests = [["stageName", "classword"], ["stageName"], ["classword"], ["abbr1"], ["abbr1"]];
    checktests.forEach(ct => {
      if (ct.every(w => counts[w] > 0)) {
        tcheck.push(1);
      } else {
        tcheck.push(0);
      }
    });
  }
  if (counts.other + counts.nonmethod === words.length) {
    info.dets = "done";
  }
  let tdclass = info.classStages.find(x => td.includes(x.class) && x.stage > 4)
  if (tdclass) {
    td.forEach(x => {
      if (!info.classStages.find(o => o.class === x)) info.classStages.push({class: x, stage: tdclass.stage});
    });
  }
  if (info.title === "check" && info.dets === "check") {
    if (unknown.length > 0 && unknown.every(w => dets.includes(w)) && !plainbob) {
      info.title = "done";
      info.check = dcheck;
    } else {
      info.check = [];
      for (let i = 0; i < 5; i++) {
        if (tcheck[i] === 1 || dcheck[i] === 1) {
          info.check.push(1);
        } else {
          info.check.push(0);
        }
      }
    }
    
  } else if (info.title === "check") {
    info.check = tcheck;
  } else if (info.dets === "check") {
    info.check = dcheck;
  }
  //console.log(info);
  return info;
}
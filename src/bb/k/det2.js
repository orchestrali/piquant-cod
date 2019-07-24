const find = require('../../find/find.js');
const exclude = ["little hybrid", "hybrid", "principle"];
const excludeN = ["Grandsire", "Reverse Grandsire", "Double Grandsire", "Little Grandsire", "Union", "Reverse Union", "Double Union", "Little Union"];

const stageNames = ["singles", "minimus", "doubles", "minor", "triples", "major", "caters", "royal", "cinques", "maximus", "sextuples", "fourteen", "septuples", "sixteen", "octuples", "eighteen"];

var abbr = {Surprise: "s", "Treble Bob": "tb", Delight: "d", Bob: "b", Alliance: "a"}

module.exports = function methodNames(t, stuff, cb) {
  //console.log(t);
  let fullt = t;
  let namet = t;
  let possible = [], likely = [];
  let q = {};
  if (stuff.stages.length === 1) {
    namet = t.replace(stageNames[stuff.stages[0]-3], "").replace(/  +/g, " ").trim();
    q["classes.stages"] = stuff.stages[0];
  } else if (stuff.stages.length > 1) {
    q.$or = [];
    namet = t;
    stuff.stages.forEach(s => {
      q.$or.push({"classes.stages": s});
      namet = namet.replace(stageNames[s-3], "").replace(/  +/g, " ").trim();
    });
  } else {
    q["classes.stages"] = {$lt: stuff.numbells+1};
  }
  
  find("name", q, (r) => {
    for (let i = 0; i < r.length; i++) {
      r.type = "method";
    }
    let length = t.length;
    if (stuff.stages.length > 0) {
      let sn = [];
      stuff.stages.forEach(n => sn.push(stageNames[n-3]));
      sn.sort((a, b) => {return b.length - a.length});
      length += sn[0].length;
    }
    let names = r.concat(stuff.unmethods, stuff.vars).filter(o => o.name.length <= length);
    require('../../names/unique.js')(names);
    names.sort((a, b) => {return b.name.length - a.name.length;});
    
    let i = 0;
    while (i < names.length && namet.length > 0) {
      if (t.indexOf(names[i].name.toLowerCase()) > -1 || (names[i].unique && t.indexOf(names[i].unique.toLowerCase()) > -1)) { //&& !possible.find(o => o.name.includes(names[i].name))
        possible.push(names[i]);
        namet = namet.replace(new RegExp(names[i].name, "gi"), "").replace(/  +/g, " ");
      }
      i++;
    }
    
    
    for (let j = 0; j < possible.length; j++) {
      if (namet.length < 1 && possible[j].name != "" && (!possible[j].classes || possible[j].classes.length === 1)) {
        if (possible[j].type === "method") {
          likely.push({
            name: possible[j].name,
            class: possible[j].classes[0].descriptor.replace("Little ", "").replace("Differential ", ""),
            stages: possible[j].classes[0].stages,
            type: "method"
          });
        } else {
          likely.push({
            name: possible[j].name,
            stages: [possible[j].stage],
            type: possible[j].type
          });
          if (possible[j].class) {
            likely[likely.length-1].class = possible[j].class;
          }
        }
        
      } 
      if (possible[j].classes) {
        checkClass(possible[j], "classes", "name");
        checkAbbr(possible[j]);
      }
      if (possible[j].unique) checkClass(possible[j], "classes", "unique");
      if (possible[j].prevClasses) {
        checkClass(possible[j], "prevClasses", "name");
      }
    }
    
    stuff.possible = possible;
    stuff.likely = likely;
    stuff.names = r.sort((a, b) => {return b.name.length - a.name.length;});
    //console.log(likely);
    cb(fullt);
    
  });
  
  function checkAbbr(p) {
    for (let k = 0; k < p.classes.length; k++) {
      let cl = p.classes[k].descriptor.replace("Little ", "").replace("Differential ", "");
      if (abbr[cl]) {
        let testname = p.name.toLowerCase() + " " + abbr[cl];
        if (fullt.includes(testname)) {
          likely.push({
            name: p.name,
            class: cl,
            stages: p.classes[k].stages,
            type: "method"
          });
          fullt = fullt.replace(testname, "").replace(/  +/g, " ");
        }
      }
      
    }
  }
  
  function checkClass(p, key, name) {
    for (let k = 0; k < p[key].length; k++) {
      let nameclass = p[key][k].descriptor.toLowerCase();
      let testname = p[name] === "" ? nameclass : p[name].toLowerCase() + " " + nameclass;
      //console.log("testname: "+testname);
      let replace = fullt.includes(testname) ? testname : p[name].toLowerCase();
      if (replace === testname || exclude.includes(nameclass) || excludeN.includes(p[name])) {
        //let mtitle = [p[name]];
        //if (p[key][k].title.length > 0) mtitle.push(p[key][k].title);
        likely.push({
          name: p[name],
          class: p[key][k].descriptor.replace("Little ", "").replace("Differential ", ""),
          stages: p[key][k].stages,
          //title: p.name,
          old: key === "prevClasses"
        });
        fullt = fullt.replace(new RegExp(replace, "gi"), "").replace(/  +/g, " ");
      } 
      
      
    }
    
  }
  
  
}
       
       //!exclude.includes(nameclass) && !excludeN.includes(possible[j].name)
const leftovers = ["and", "spliced", "extent", "extents", "of", "alternating", "each", "'s", "changes", "method", "work", "com.", "atw", "variable", "cover", "com", "com,", "&lt;br/&gt;"];
const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const regex = require('../../regexlocs.js');
const titleopts = require('./titleopts.js');
const abbr1 = [" tb", " s", " a", " d", " b", " sc", " t.b.", " del"];
const leave = abbr1.concat(require('../../reference/stageNames.js'), require('../../reference/stageclasses.js'), require('../../reference/classes.js')).map(x => /^ /.test(x) ? x : " "+x).sort((a,b) => b.length-a.length);

module.exports = function findmethods(stuff, methods, strings, notes) {
  
  try {
    let results = {
    methods: [],
    unmethods: [],
    variations: []
  }
  let t = strings.title;
  let max = 0;
    let variations;
  if (stuff.nums) {
    for (let key in stuff.nums) {
      if (key != "check") max += stuff.nums[key];
      if (key.includes("v")) variations = true;
    }
    if (max > 10) max++; //because people can't count sometimes
  }
  
  let possible = [];
  let except = [];
  let group;
    let vars = 0, numM = 0;
  
  if (t) {
    console.log("checking title");
    let tremnants = check(t);
    if (!checkdone(tremnants)) {
      notes.titleRemnants = tremnants;
    }
  }
  if (strings.dets) {
    console.log("checking details");
    let detremnants = check(strings.dets);
    if (!checkdone(detremnants)) {
      notes.detRemnants = detremnants;
    }
  }
    if (strings.extra) {
      notes.titleExtra = strings.extra;
      check(strings.extra);
    }
  methods = null;
  
  function check(str, keep) {
    let long = str;
    let i = methods.findIndex(m => m.search.length <= str.length);
    //console.log("starting, "+str);
    
    //console.log("checkdone "+checkdone(str));
    while (i > -1 && i < methods.length && !checkdone(str) && (possible.length < max || except.length > 0 || max === 0)) {
      let search = methods[i].search;
      //if (search.includes("cambridge")) console.log(methods[i].title + " "+i);
      //console.log(search);
      let locs = regex(str, search);
      if (locs.length === 0) {
        locs = regex(str, search+"s");
      }
      if (locs.length > 0) {
        let rep = search;
        let leavein = leave.find(w => search.endsWith(w));
        if (leavein) {
          rep = search.replace(leavein, "");
        }
        if (methods[i].options) {
          let locs2 = regex(long, search)
          if (search.includes("mary")) {
            //console.log(search + " "+i);
            //methods[i].options.forEach(m => console.log(m.title));
          }
          let title = str === stuff.title ? null : stuff.title;
          let arr = titleopts(long, locs2, methods[i], stuff.check, title, variations);
          arr.forEach(obj => {
            if (str.indexOf("except") > -1 && locs.some(l => str.indexOf("except") < l)) {
              except.push(obj.title);
            } else if (!possible.find(o => o.title === obj.title)) {
              possible.push({id: obj._id, title: obj.title, type: obj.type});
            }
          });
        } else if (methods[i].title && str.indexOf("except") > -1 && locs.some(l => str.indexOf("except") < l)) {
          except.push(methods[i].title);
        } else if (methods[i].group) {
          //console.log(search);
          //console.log(methods[i].group)
          group = true;
          if (search === "cynr") {
            //console.log(search + " "+loc);
          }
          methods[i].group.forEach(m => {
            if (!possible.find(o => o.title === m.title)) {
              possible.push({id: m._id, title: m.title, type: "method"});
            }
          });
        } else if (!possible.find(o => o.title === methods[i].title)) {
          //let id = methods[i]._id ? methods[i]._id : methods.find(m => m.title === methods[i].title)._id;
          possible.push({id: methods[i]._id, title: methods[i].title, type: methods[i].type});
          //console.log("method type: "+methods[i].type);
        }
        str = replace(str, search);
        long = replace(long, rep);
      }
      
      i++;
    }
    console.log("ending "+i);
    return str;
  }
  
  console.log("possible: "+possible.length);
  //console.log("max: "+max);
  for (let i = 0; i < possible.length; i++) {
    let p = possible[i];
    let key = possible[i].type + "s";
    let r = results.methods.length + results.unmethods.length + results.variations.length;
    //
    if ((!except.includes(p.title) || !group) && !results[key].find(o => o.title === p.title) && (max === 0 || r < max)) {
      results[key].push(p);
    }
  }
  //console.log(results.methods);
  return {results: results};
  }
  catch(e) {
    console.log("error caught in title4");
    return {err: {message: e.message, loc: "title4", stack: e.stack}}
  }
}

function replace(str, rep) {
  return str.replace(new RegExp(rep, "gi"), "").replace(/  +/g, " ").trim();
}

function checkdone(str) {
  if (str === "" || str === " ") return true;
  let words = str.split(" ");
  let tests = [/^[^\w]+$/, /^\(\d+\)$/, /^\d+m:$/, /^[whx\d]+$/]
  //console.log("words "+words)
  if (words.every(w => tests.some(tt => tt.test(w)) || leftovers.includes(w) || numbers.includes(w))) return true;
  return false;
}
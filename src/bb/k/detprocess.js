const stageNames = ["Singles", "Minimus", "Doubles", "Minor", "Triples", "Major", "Caters", "Royal", "Cinques", "Maximus", "Sextuples", "Fourteen", "Septuples", "Sixteen", "Octuples", "Eighteen"];
const exclude = ["Little Hybrid", "Hybrid", "Principle"];
const excludeN = ["Grandsire", "Reverse Grandsire", "Double Grandsire", "Little Grandsire", "Union", "Reverse Union", "Double Union", "Little Union"];

const prefixes = ["Little ", "Differential ", "Differential Little ", ""];
const plainClass = ["Bob", "Place", "Slow Course"];
const tdclass = ["Treble Bob", "Delight", "Surprise"];

const index = require('../../names/alt.js');
const det4 =  require('./det4.js');
const nameindex = require('./detnames.js');

const extents = ["one extent each", "1 extent each", "one extent", "two extents", " extent", " extents", " each", " each:"]

function descriptors(arr) {
  let list = [];
  arr.forEach(c => {
    prefixes.forEach(p => {
      list.push(p+c);
    })
  });
  return list;
}

const plainDescript = descriptors(plainClass);
const tdDescript = descriptors(tdclass);

module.exports = function process(stuff, dets, m, notes) {
  let max = 0;
  if (stuff.nums) {
    for (let key in stuff.nums) {
      max += stuff.nums[key];
    }
    if (max > 10) max++; //because people can't count sometimes
  }
  //console.log("numbells "+stuff.numbells);
  for (let key in stuff) {
    //console.log("stuff key: "+key);
  }
  let results = {
    methods: [],
    variations: [],
    unmethods: []
  };
  //if (dets.length > 1) console.log("more than one details div");
  results.details = [];
  dets.forEach(o => {
    if (o.fulltext) results.details.push(o.fulltext);
  });
  //add known methods to results
  if (stuff.methods.length > 0) {
    stuff.methods.forEach(o => {
      results[o.type + "s"].push({id: o._id, title: o.title})
    });
    //console.log(results.methods);
  }
  //add rounds etc. to results
  if (stuff.nonMethods) {
    results.nonMethods = stuff.nonMethods;
  }
  //if there's something in the likely array and only one stage name, add it
  if (stuff.likely && stuff.likely.length > 0 && stuff.stages.length === 1 && (max === 0 || results.methods.length < max)) {
    //console.log("likely: "+stuff.likely)
    stuff.likely.forEach(o => {
      let method = m.find(e => e.stage === stuff.stages[0] && e.class === o.class && e.name === o.name);
      if (method && !results[method.type + "s"].find(o => o.title === method.title)) {
        results[method.type + "s"].push({id: method._id, title: method.title});
        //console.log("likely: "+method.title);
      }
    });
    
  } else if (stuff.likely && stuff.likely.length > 0 && stuff.stages.length != 1) {
    //console.log("something is likely");
    stuff.likely.forEach(o => {
      if (o.stages) {
        //console.log("likely stages: "+o.stages);
        if (o.stages.some(s => stuff.stages.includes(s)) || o.stages.includes(stuff.numbells)) {
          let method = m.find(e => e.class === o.class && e.name === o.name && (e.stage === stuff.numbells || e.stage === stuff.numbells-1));
          //console.log(method);
          if (method && !results[method.type + "s"].find(o => o.title === method.title)) {
            results[method.type + "s"].push({id: method._id, title: method.title});
            //console.log("likely: "+method.title);
          }
        } else {
          notes.likely = stuff.likely;
        }
        
      } else {
        notes.likely = stuff.likely;
      }
      
    });
    //
  }
  //if there are classStages, make a list of methods that would fit one of the classStages
  var names = [];
  if (stuff.classStages && stuff.names) {
    //console.log("building classStage names");
    let classStages = [];
    
    stuff.classStages.forEach(e => {
      let cs = classStages.find(o => o.class === e.class)
      if (cs) {
        if (!cs.stages.includes(e.stage)) cs.stages.push(e.stage);
      } else {
        let possible = [];
        prefixes.forEach(p => possible.push(p+e.class));
        classStages.push({class: e.class, descriptors: possible, stages: [e.stage]});
      }
    });
    //console.log("classStages length "+classStages.length);
    //console.log(classStages[0]);
    classStages.forEach(o => {
      names = names.concat(addNames(o.descriptors, o.stages));
    }); 
    
  }
  //same for category stages
  if (stuff.catStages && stuff.names) {
    let plain = [];
    let td = [];
    stuff.catStages.forEach(o => {
      if (o.cat === "plain") plain.push(o.stage);
      if (o.cat === "treble dodging") td.push(o.stage);
    });
    if (plain.length > 0) {
      names = names.concat(addNames(plainDescript, plain));
    }
    if (td.length > 0) {
      names = names.concat(addNames(tdDescript, td));
    }
  }
  
  if (stuff.status === "stage only" && stuff.stages.length > 0) {
    //console.log("stage only");
    for (let i = 0; i < m.length; i++) {
      let d = [];
      if (m[i].type != "variation") {
        if (m[i].classification.differential) d.push("Differential");
        if (m[i].classification.little) d.push("Little");
        d.push(m[i].class);
      }
      names.push({
        name: m[i].name,
        class: m[i].class ? m[i].class : "",
        descriptor: d.join(" "),
        stage: m[i].stage,
        title: m[i].title
      });
    }
  }
  
  var abbr = {Surprise: "S", "Treble Bob": "TB", Delight: "D", Bob: "B", Alliance: "A"}
  var nameFs = [function(n) {return n.title.toLowerCase()}, function(n) {return n.title.slice(0, n.title.lastIndexOf(" ")).toLowerCase()}, function(n) {return (n.name + " " + abbr[n.class]).toLowerCase()}, function(n) {return n.name.toLowerCase()}];
  //function(n) {return n.unique ? n.unique.toLowerCase() : ""}
  let detail = dets.length > 0 && dets[0].fulltext ? dets[0].fulltext.toLowerCase() : "";
  extents.forEach(s => {
    detail = detail.replace(new RegExp(s, "gi"), "").replace(/  +/g, " ");
  });
  if (stuff.titleExtra.length > 0) {
    detail = detail.replace(stuff.titleExtra, "").replace(/  +/g, " ");
  }
  let possible = [];
  let except = [];
  //console.log("names: "+names.length);
  var remove = ["pleasure", "college", "place"]
  
  if (names.length > 0 && detail.length > 4) {
    let namesort = nameindex(names, stuff);
    let i = 0;
    console.log("searching details for names");
    while (i < namesort.length && detail.length > 2) {
      
      let search = namesort[i].search;
      //if (namesort[i].name === "Cambridge") console.log(search);
      remove.forEach(w => {
        if (search.length < w.length) {
          detail = detail.replace(new RegExp(w, "g"), "").replace(/  +/g, " ");
        }
      });
      let loc = detail.indexOf(search);
      if (loc > -1 && (loc === 0 || /[^\w]/.test(detail[loc-1]))) {
        if (namesort[i].title) {
          let method = m.find(o => o.title === namesort[i].title);
          if (detail.indexOf("except") === -1 || detail.indexOf("except") > loc) {
            if (method) { //&& !results.methods.find(o => o.title === method.title)
              
              possible.push({id: method._id, title: method.title, type: method.type});
            }
          } else if (method) {
            except.push(method.title);
          }
          
        } else if (namesort[i].group) {
          let group = [];
          namesort[i].group.forEach(e => {
            let met = m.find(o => o.title === e);
            if (met) group.push({id: met._id, title: met.title, type: "method"});
          });
          possible = possible.concat(group);
        }
        detail = detail.replace(new RegExp(search, "gi"), "").replace(/  +/g, " ");
        
      }
      i++;
    }
    
  }
  
  for (let i = 0; i < possible.length; i++) {
    let p = possible[i];
    let key = possible[i].type + "s";
    let r = results.methods.length + results.unmethods.length + results.variations.length;
    //
    if (!except.includes(p.title) && !results[key].find(o => o.title === p.title) && (max === 0 || r < max)) {
      results[key].push(p);
    }
  }
  
  
  
  function addNames(descripts, stages) {
    let names = [];
    stuff.names.forEach(o => {
      o.classes.forEach(c => {
        if (descripts.includes(c.descriptor) && c.stages.some(s => stages.includes(s))) {
          let s = c.stages.filter(st => stages.includes(st));
          s.forEach(st => {
            let title = [o.name];
            if (c.title.length > 0) title.push(c.title);
            title.push(stageNames[st-3]);
            let n = {
              name: o.name,
              class: c.descriptor.replace("Differential ", "").replace("Little ", ""),
              descriptor: c.descriptor,
              stage: st,
              title: title.join(" ")
            }
            names.push(n);
          });
        }
        
      });
    });
    return names;
  }
  
  let r = {
    nonMethods: results.nonMethods,
    details: results.details[0],
    //titles: []
  }
  notes.titles = [];
  let keys = ["methods", "variations", "unmethods"];
  keys.forEach(k => {
    results[k].forEach(o => {
      notes.titles.push(o.title);
      if (r[k]) {
        r[k].push(o.id);
      } else {
        r[k] = [o.id];
      }
    });
  });
  
  
  notes.detremnants = detail;
  
  return r;
}



const uniques = require('../../names/unique.js');
const abindex = require('../../names/filter.js');
var abbr = {Surprise: "s", "Treble Bob": "tb", Delight: "d", Bob: "b", Alliance: "a"};
  var nameFs = [
    function(n) {return n.title.toLowerCase()}, 
    function(n) {return n.title.slice(0, n.title.lastIndexOf(" ")).toLowerCase()}, 
    function(n) {return n.title.slice(0, n.title.lastIndexOf(" ")).replace(n.class, abbr[n.class]).toLowerCase()}, 
    function(n) {return n.name.toLowerCase()}, 
    function(n) {return n.unique ? n.unique.toLowerCase() : ""}];
  //
const known = [{name: "Cambridge", descriptor: "Surprise"}, {name: "Kent", descriptor: "Treble Bob"}, {name: "Oxford", descriptor: "Treble Bob"}, {name: "Stedman", descriptor: "Principle"}, {name: "Double Oxford", descriptor: "Bob"}, {name: "Plain", descriptor: "Bob"}];

const saints = ["st.", "st. "];
const apostrophes = [{include: "'s", test: ["", "s"]}, {include: "s'", test: ["s", "'s"]}];

module.exports = function search(names, stuff) {
  let index = [];
  uniques(names);
  //console.log("test "+ names[0].class+ " " +abbr[names[0].class]);
  
  names.forEach(o => {
    for (let i = 0; i < nameFs.length; i++) {
      //if (o.title === "Bristol Little Surprise Maximus") console.log(o);
      if ((i != 2 || abbr[o.class]) && (i != 3 || (!o.descriptor.includes("Little") && !o.descriptor.includes("Differential")))) {
        if (i === 2 && o.name === "Cambridge") {
          //console.log(o);
        }
        let search = nameFs[i](o);
        if (search != "") {
          let obj = {
            search: search === "bob" ? "of bob" : search
          };
          for (let key in o) {
            obj[key] = o[key];
          }
          index.push(obj);
        }
      }
    }
    if (o.name.startsWith("St ")) {
      saints.forEach(s => {
        let obj = {
          search: o.name.replace("St ", s).toLowerCase()
        }
        for (let key in o) {
          obj[key] = o[key];
        }
        if (!index.find(e => e.search === obj.search)) {
          index.push(obj);
        }
      })
    }
    let ap = apostrophes.find(x => o.name.includes(x.include))
    if (ap) {
      ap.test.forEach(s => {
        let obj = {
          search: o.name.replace(ap.include, s).toLowerCase()
        };
        for (let key in o) {
          obj[key] = o[key];
        }
        if (!index.find(e => e.search === obj.search)) {
          index.push(obj);
        }
      });
    }
  });
  
  abindex(stuff).forEach(o => {
    let obj = {
      search: o.abbr.toLowerCase()
    };
    for (let key in o) {
      if (key != "abbr") {
        obj[key] = o[key];
      }
    }
    if (!index.find(e => e.search === obj.search)) {
      index.push(obj);
    }
  });
  
  
  index.sort((a,b) => {
    if (a.search === "bristol") {
      //console.log(a.title)
    }
    let num = b.search.length - a.search.length;
    if (num != 0) {
      return num;
    } else if (a.search.localeCompare(b.search) != 0) {
      return a.search.localeCompare(b.search);
    } else {
      let w, z;
      if (stuff.classStages) {
        let m = stuff.classStages.find(o => o.class === a.class) ? -1 : 0;
        let n = stuff.classStages.find(o => o.class === b.class) ? -1 : 0;
        w = m-n;
      }
      let k = known.find(o => o.name.toLowerCase() === a.search);
      if (k) {
        let x = a.descriptor === k.descriptor ? -1 : 0;
        let y = b.descriptor === k.descriptor ? -1 : 0;
        z = x-y;
      }
      if (w && !k) return w;
      if (w === 0 && z != 0) return z;
      if (k && !w) return z;
      
      return 0;
    }
    
  });
  
  
  /*
  
  */
  //console.log("Pink index "+index.findIndex(o => o.search === "pinks"));
  return index;
}
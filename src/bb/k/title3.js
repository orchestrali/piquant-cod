const uniques = require('../../names/unique.js');
const abindex = require('../../names/filter.js');

var abbr = {Surprise: "s", "Treble Bob": "tb", Delight: "d", Bob: "b", Alliance: "a", "Slow Course": "sc"};
var abbr2 = {"Treble Bob": "t.b.", Delight: "del", "Little Treble Place": "ltp", "Little Alliance": "la", "Little Bob": "lb", "Slow Course": "s.c", "Differential Little Alliance": "diff la"};
var nameFs = [
  function(n, name) {return n.title.replace(n.name, name).toLowerCase()}, //only if stage name present
  function(n, name) {return n.title.replace(n.class, "").replace(n.name, name).replace(/  +/g, " ").toLowerCase()}, //also stage name
  function(n, name) {return n.title.slice(0, n.title.lastIndexOf(" ")).replace(n.name, name).toLowerCase()}, //all
  function(n, name) {
    return abbr[n.class] ? n.title.slice(0, n.title.lastIndexOf(" ")).replace(n.name, name).replace(n.class, abbr[n.class]).toLowerCase() : "";
  }, //abb
  function(n, name) {
    return abbr2[n.desc] ? n.title.slice(0, n.title.lastIndexOf(" ")).replace(n.name, name).replace(n.desc, abbr2[n.desc]).toLowerCase() : "";
  },
  function(n, name) {
    let nn = name.toLowerCase();
    if (n.diff) nn += " differential";
    if (n.little) nn += " little";
    return nn;
  },
  //function(n) {return n.unique ? n.unique.toLowerCase() : ""}, //all
  //function(n) {return n.oldtitle && n.oldtitle.length > 0 ? n.oldtitle[0].slice(0, n.oldtitle[0].lastIndexOf(" ")).toLowerCase() : ""}
]; 

const known = [{name: "Cambridge", descriptor: "Surprise"}, {name: "Kent", descriptor: "Treble Bob"}, {name: "Oxford", descriptor: "Treble Bob"}, {name: "Stedman", descriptor: "Principle"}, {name: "Double Oxford", descriptor: "Bob"}, {name: "Plain", descriptor: "Bob"}, {name: "Reverse Canterbury Pleasure", descriptor: "Place"}];

const stageNames = require('../../reference/stageNames.js');
const classes2 = require('../../reference/classes2.js');
const badnames = ["bob", "", "cover", "devon"];
const titlenames = require('./titlenames.js');
const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

const tests = [
  function (t, obj) {
    if (obj.class && t.includes(obj.class.toLowerCase() + " "+ stageNames[obj.stage-3])) {
      if ((obj.class != "Bob" || !t.includes("treble bob")) && (obj.class != "Place" || !t.includes("treble place"))) {
        return -1;
      }
    } 
    return 0;
  },
  function (obj) {
    if (obj.desc && (obj.desc.includes("Little") || obj.desc.includes("Differential"))) return 0;
    return -1;
  },
  function (obj) {
    let k = known.find(o => o.name === obj.name);
    if (k && obj.desc && obj.desc === k.descriptor) {
      return -1;
    }
    return 0;
  }
]


module.exports = function dostuff(methods, stuff) {
  try {
    let t = stuff.title;
    let filtered = methods.filter(m => {
      if (stuff.classStages && m.class && stuff.classStages.some(cl => m.class.toLowerCase() === cl.class && m.stage === cl.stage)) {
        return true;
      }
      if (m.class && stuff.classes.length > 0 && stuff.classes.includes(m.class.toLowerCase())) {
        return true;
      }
      if (!m.class || m.class === "Principle") return true;
      if (stuff.stages.includes(m.stage) && (!stuff.classStages || !stuff.classStages.some(cl => m.stage === cl.stage))) { //!stuff.classes.includes(m.class) &&
        return true;
      }
      if (stuff.stages.length === 0) {
        return true;
      }
      return false;
    });

     /* //console.log("surprise "+methods.filter(m => m.class === "Surprise").length);
    if (stuff.classStages) {
      //console.log("classStage "+stuff.classStages.length)
      filtered = methods.filter(m => m.class && stuff.classStages.some(cl => m.class.toLowerCase() === cl.class && m.stage === cl.stage));
    } else if (stuff.classes.length > 0) {
      filtered = methods.filter(m => !m.class || stuff.classes.includes(m.class.toLowerCase()));
    } else {
      console.log("no filter");
      filtered = methods;
    }
*/

    //console.log("building index, "+filtered.length);
    let index = [];
    let multiples = [];
    //uniques(filtered);

    console.log("adding methods");
    filtered.forEach(m => {
      //if (m.title === "Cambridge Surprise Minor") console.log(m);
      
      let d = m.title.slice(0, m.title.lastIndexOf(" ")).replace(m.name, "").trim();
      m.desc = d != "" ? d : m.class ? m.class : ""; //no class for variations
      let desc = d != "" ? d : m.class ? m.class : "";
      let littlediff = desc.includes("Little") || desc.includes("Differential");
      m.little = desc.includes("Little"), m.diff = desc.includes("Differential");
      let names = [m.name];
      if (m.name.endsWith("Baptist") || m.name.endsWith("Evangelist") || m.name.endsWith("Divine")) {
        names.push(m.name.replace(" the ", " "));
      }
      if (m.name.includes(" ") && /^[^\d]/.test(m.name) && !littlediff) {
        let words = m.name.split(" ");
        let last = words.pop();
        let u = words.join(" ");
        if (u.length > 3 && ((!filtered.find(o => o.name === u || o.name.slice(0, o.name.lastIndexOf(" ")) === u)) || u === "Reverse Canterbury") && u != "Little" && !numbers.includes(u.toLowerCase()) && u != "Reverse") {
          names.push(u);
        }
      }
      names = titlenames(m.name, names);
      
      let searches = [];
      
      names.forEach(n => {
        for (let i = 0; i < nameFs.length; i++) {
          if ((i > 4 || stuff.check[i] === 1) && (i != 5 || m.name.length > 2)) {
            let search = nameFs[i](m, n);
            if (!badnames.concat(stageNames, searches).includes(search) && (search != "little" || m.name === "") && (search != "bob doubles" || m.name === "Plain")) {
              searches.push(search);
            }
          }
        }
      });
      if (m.oldtitle && m.oldtitle.length > 0) {
        //if (m.name === "Cardiganshire") console.log(m);
        let ot = m.oldtitle[0];
        let oc = classes2.some(cla => ot.includes(cla)) ? classes2.find(cla => ot.includes(cla)) : "Principle";
        let name = ot.slice(0, ot.lastIndexOf(" ")).replace(oc, "").replace(/Little $/, "").replace("Differential", "").trim();
        let d = ot.slice(0, ot.lastIndexOf(" ")).replace(name, "").trim();
        let odesc = d === "" ? oc : d;
        let om = {title: ot, class: oc, name: name, desc: odesc, little: odesc.includes("Little"), diff: odesc.includes("Differential")};
        for (let i = 0; i < nameFs.length; i++) {
          if ((i > 4 || stuff.check[i] === 1) && (i != 5 || om.name.length > 2)) {
            let search = nameFs[i](om, om.name);
            if (search != "" && search != "bob" && search != "cover") {
              searches.push(search);
            }
          }
        }
      }
      searches.forEach(s => {
        if (s.includes("differential")) {
          searches.push(s.replace("differential", "diff"));
        }
      });
      searches.forEach(s => {
        if (s.length <= stuff.strlength) {
          let prev = index.find(ob => ob.search === s);
          if (prev) {
            if (prev.options) {
              //console.log("title "+m.title);
              //console.log("search " +s);
              prev.options.push(m);
            } else {
              let prevobj = {}
              for (let key in prev) {
                if (key != "search") {
                  prevobj[key] = prev[key];
                  delete prev[key];
                }
              }
              prev.options = [prevobj, m];
            }
          } else {
            let obj = {
              search: s
            };
            for (let key in m) {
              obj[key] = m[key];
            }
            index.push(obj);
          }
        }
      })

    });
    console.log("adding abbreviations");
    //console.log(index[index.length-1].search + " " + index[index.length-1].type);
    abindex(stuff).forEach(o => {
      let search = o.abbr.toLowerCase();
      let searches = [search];
      let stagename = stageNames[o.stage-3];
      if (!search.includes(stagename)) searches.push(search+ " "+stagename);
      if (o.class && !search.includes(o.class.toLowerCase()) && (!abbr[o.class] || !search.includes(" "+abbr[o.class]))) searches.push(search + " "+o.class.toLowerCase());
      if (o.class && !search.includes(stagename) && !search.includes(o.class.toLowerCase())) searches.push(search + " "+o.class.toLowerCase()+ " "+stagename);
      searches.filter(s => s.length <= stuff.strlength).forEach(s => {
        let obj = {
          search: s
        };
        for (let key in o) {
          if (key != "abbr" && key != "group") {
            obj[key] = o[key];
          }
        }
        if (o.group) {
          obj.group = [];
          o.group.forEach(tt => {
            let method = methods.find(m => m.title === tt);
            if (method && method._id) {
              obj.group.push({title: tt, _id: method._id});
            }
          })
        }
        if (o.class) {
          obj.desc = o.class;
        }
        if (o.title) {
          let method = methods.find(m => m.title === o.title);
          if (method && method._id) {
            obj._id = method._id;
          }
        } else if (o.name && o.class) {
          if (o.class != "Principle" && o.class != "Hybrid") {
            obj.title = o.name + " " + o.class + " " + stagename[0].toUpperCase() + stagename.slice(1);
          } else {
            obj.title = o.name + " " + stagename[0].toUpperCase() + stagename.slice(1);
          }
        }
        if (o.name) {

          let method = filtered.find(m => m.name === o.name && m.stage === o.stage && m.class === o.class);
          if (method && method._id) {
            obj._id = method._id;
          }
        }
        let prev = index.find(e => e.search === obj.search);
        if (prev) {
          if (prev.options) {
              prev.options.push(obj);
            } else {
              let prevobj = {}
              for (let key in prev) {
                if (key != "search") {
                  prevobj[key] = prev[key];
                  delete prev[key];
                }
              }
              prev.options = [prevobj, obj];
            }
          
        } else {
          index.push(obj);
        }
        if (obj.search.includes("cant")) {
          //console.log(obj.search)
        }
      });
    });
    console.log("sorting");
    index.sort((a,b) => {return b.search.length - a.search.length});
    let arrays = [];
    let lengths = [];
    /*
    let i = 0;
    while (i < index.length) {
      let next = index.findIndex(o => o.search.length < index[i].search.length);
      if (next > -1) {
        lengths.push(next);
        i = next;
      } else {
        i = index.length;
      }
      //arrays = arrays.concat(index.splice())
    }
    //console.log("length steps, "+lengths);
    */
    
    /*
    index.sort((a,b) => {
      let num = b.search.length - a.search.length;
      if (num != 0) {
        return num;
      } else if (a.search.localeCompare(b.search) != 0) {
        return a.search.localeCompare(b.search);
      } else {
        let values = [tests[0](t, a) - tests[0](t, b), tests[1](a) - tests[1](b), tests[2](a) - tests[2](b)];

        if (values.filter(v => v != 0).length === 1) {
          return values.find(v => v!= 0);
        } else if (values.every(v => v === 0)) {
          return 0;
        } else if (values[0] != 0) {
          return values[0];
        } else if (values[1] != 0 && values[2] != 0) {
          return values[1];
        } else {
          return 0;
        }
        return 0;
      }


    });
    */
    return {results: index};
  }
  catch(e) {
    console.log("error caught in title3");
    return {err: {message: e.message, loc: "title3", stack: e.stack}}
  }
}
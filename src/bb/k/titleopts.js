const stageNames = require('../../reference/stageNames.js');
const classes = require('../../reference/classes.js');
const stageclasses = require('../../reference/stageclasses.js');
const regex = require('../../regexlocs.js');
var abbr1 = {Surprise: "s", "Treble Bob": "tb", Delight: "d", Bob: "b", Alliance: "a"};
var abbr2 = {"Treble Bob": "t.b.", Delight: "del", "Little Treble Place": "ltp", "Little Alliance": "la", "Little Bob": "lb"};
const dtests = [stageclasses, stageNames, classes, abbr1, abbr2];
const known = [{name: "Cambridge", descriptor: "Surprise"}, {name: "Kent", descriptor: "Treble Bob"}, {name: "Oxford", descriptor: "Treble Bob"}, {name: "Double Oxford", descriptor: "Bob"}];
const known2 = [{name: "Stedman", descriptor: "Principle"}, {name: "Plain", descriptor: "Bob"}, {name: "Reverse Canterbury Pleasure", descriptor: "Place"}]
const odd = ["Grandsire", "Stedman", "Reverse Canterbury Pleasure"];

const testfs = [
  function (m) {return m.class ? m.class.toLowerCase() +" "+stageNames[m.stage-3]: null},
  function (m) {return null},
  function (m) {return m.class ? m.class.toLowerCase() : null},
  function (m) {return abbr1[m.class] ? abbr1[m.class] : null},
  function (m) {return abbr2[m.desc] ? abbr2[m.desc] : null}
];

const knowtest = function (obj) {
    let k = known2.find(o => o.name === obj.name);
    if (k && obj.desc && obj.desc === k.descriptor) {
      return -1;
    }
    return 0;
  }

const matchtest = function (obj, search) {
  if (obj.name.toLowerCase() === search) {
    return -1;
  }
  return 0;
}

const vartest = function (obj, vv) {
  let type = vv ? "variation" : "method";
  if (obj.type === type) return -1;
  return 0;
}

const st = [
  function (t, obj) {
    if (t && obj.class && t.includes(obj.class.toLowerCase() + " "+ stageNames[obj.stage-3])) {
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
  },
  function (obj) {
    if (odd.includes(obj.name) && obj.stage % 2 === 1) return -1;
    return 0;
  }
]

module.exports = function options(str, locs, obj, check, title, vv) {
  let tests = [];
  let unknown = true;
  let sorted = false;
  let opts = obj.options;
  opts.sort((a,b) => {
    let x = knowtest(a)-knowtest(b);
    let y = matchtest(a, obj.search)-matchtest(b, obj.search);
    let z = vartest(a)-vartest(b);
    if (x != 0) {
      unknown = false;
      return x;
    } else if (y != 0) {
      sorted = true;
      return y;
    } else if (z != 0) {
      sorted = true;
      return z;
    }
    return 0;
  });
  if (!unknown || sorted) {
    return [opts[0]];
  }
  
  opts.forEach(o => {
    for (let i = 0; i < check.length; i++) {
      if (check[i] === 1) {
        let t = testfs[i](o);
        if (t && !tests.find(x => x.test === t)) {
          let test = {test: t, title: o.title}
          tests.push(test);
        }
      }
    }
  });
  tests.sort((a,b) => b.test.length-a.test.length);
  
  let descs = [];
  
  for (let i = 0; i < tests.length; i++) {
    let p = regex(str, tests[i].test);
    p.forEach(pp => {
      let possible = {
        index: pp
      }
      for (let k in tests[i]) {
        possible[k] = tests[i][k];
      }
      descs.push(possible);
    });
  }
  descs.sort((a,b) => a.index-b.index);
  if (opts.some(o => o.name === "Finchampstead")) {
    //console.log(tests);
    //console.log(descs);
    //console.log(locs);
  }
  let probable = [];
  locs.forEach(l => {
    let i = descs.find(o => o.index > l);
    if (i) {
      let m = opts.find(o => o.title === i.title);
      if (m) probable.push(m);
    }
  });
  if (probable.length === 0) {
    opts.sort((a,b) => {
      let values = [];
      for (let j = 0; j < st.length; j++) {
        if (j === 0) {
          values.push(st[j](title, a) - st[j](title, b));
        } else {
          values.push(st[j](a) - st[j](b));
        }
      }

        if (values.filter(v => v != 0).length === 1) {
          return values.find(v => v!= 0);
        } else {
          let i = 0;
          while (values[i] === 0 && i < values.length) {
            i++;
          }
          if (i < values.length) return values[i];
        }
        return 0;
    });
    
    probable.push(opts[0]);
    
  }
  
  return probable;
}



/*
else if (values.every(v => v === 0)) {
          return 0;
        } else if (values[0] != 0) {
          return values[0];
        } else if (values[1] != 0 && values[2] != 0) {
          return values[1];
        } else {
          return 0;
        }

*/
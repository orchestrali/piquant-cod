const check = require('./title5.js');
const getmethods = require('./titleget.js');
const buildtests = require('./title3.js');
const testnames = require('./title4.js');
const titledets = require('./titledets.js');
const stageNames = require('../../reference/stageNames.js');
const known = require('./known.js');
const regex = require('../../regex.js');
const remove = ["with cover", "cover bell", "hand stroke", "back stroke", "plain leads"];
const devon = ["devon call changes 60 on 3rds", "devon call changes", "a devon peal", "devon peal", "60 on 3rds"];

function replace(str, rep) {
  return str.replace(rep, "").replace(/  +/g, " ").trim();
}

module.exports = function title(perf, notes, dets, cb) {
  let r = {
    methods: [],
    titleExtra: perf.titleExtra ? perf.titleExtra.replace("(", "").replace(")", "") : "",
    numbells: perf.numbells,
    title: perf.title ? perf.title.toLowerCase() : "",
  };
  if (perf.titleExtra) r.nums = require('./det0.js')(perf.titleExtra);
  let title = perf.title ? perf.title.toLowerCase() : "";
  let detail = dets.length > 0 && dets[0].fulltext ? titledets(dets[0].fulltext.toLowerCase(), perf) : "";
  if (perf.attribs) {
    notes.attribs = perf.attribs;
  }
  if (title.length > 0) {
    remove.forEach(ww => {
      if (regex(title, ww)) title = replace(title, ww);
    });
  }
  if (detail.length > 0) {
    detail = replace(detail, "â");
    remove.forEach(ww => {
      if (regex(detail, ww)) detail = replace(detail, ww);
    });
  }
  if (devon.find(x => title === x)) {
    r.nonMethods = [perf.title];
    finish(r);
  } else {
    if (devon.find(x => title.includes(x))) {
      r.nonMethods = []
      devon.forEach(d => {
        if (title.includes(d)) {
          r.nonMethods.push(d.replace("devon", "Devon"));
          title = replace(title, d);
        }
      });
    }
  
  
    r.strlength = Math.max(title.length, detail.length, r.titleExtra.length);
    let info = check(title, detail, perf);
    if (info.nonMethods) {
      r.nonMethods = info.nonMethods.map(e => {return e === "changes" ? "call changes" : e});
    }
    console.log(info);
    r.stages = info.stages;
    r.classes = info.classes;
    if (info.classStages.length > 0) {
      r.classStages = info.classStages;
    }
  
    let methods = [];
    let strings = {};
    if (r.nums && r.nums.check) {
      strings.extra = r.titleExtra.toLowerCase();
    }
    r.check = info.check ? info.check : [0,0,0,0,0];
    if (info.title === "check") {
      strings.title = title;
    } else {
      r.titledone = true;
      r.strlength = Math.max(detail.length, r.titleExtra.length);
    }
    if (info.dets === "check") {
      strings.dets = detail;
    }
    if (strings.title || strings.dets || strings.extra) {
      getmethods(r, (arr) => {
        methods = arr;
        next();
      });
    } else {
      finish(r);
    }
  
  
  
  function next() {
    let k = known.find(o => o.bbNum === perf.bbNum);
    if (k) {
      k.titles.forEach(mt => {
        let m = methods.find(o => o.title === mt);
        if (m) {
          console.log("finished, "+m.title);
          if (r[m.type+'s']) {
            r[m.type+'s'].push(m);
          } else {
            r[m.type+'s'] = [m];
          }
        }
      });
      finish(r);
    } else if (info.title === "check") {
      console.log("checking title");
      let m = methods.find(o => o.title.toLowerCase() === title || (o.oldtitle && o.oldtitle.some(t => t.toLowerCase() === title)));
      if (m) {
        console.log("finished, "+m.title);
        if (r[m.type+'s']) {
          r[m.type+'s'].push(m);
        } else {
          r[m.type+'s'] = [m];
        }
        finish(r)
      } else {
        let twords = title.replace(/[^\w]/gi, " ").replace(/  +/g, " ").trim().split(" ");
        let filtered = methods.filter(mm => {
          if (mm.name.toLowerCase().includes(title)) {
            return true;
          }
          if (twords.some(tw => regex(mm.name.toLowerCase(), tw))) {
            return true;
          }
          //if (twords.includes("little") && mm.name === "") {
            //return true;
          //}
          return false;
        });
        console.log("filtered: "+filtered.length);
        let tests;
        if (info.dets === "done" && filtered.length > 0) {
          tests = buildtests(filtered, r);
        } else {
          tests = buildtests(methods, r);
        }
        if (tests.err) {
          cb(tests.err);
        } else {
          let possible = testnames(r, tests.results, strings, notes);
          if (possible.err) {
            cb(possible.err);
          } else {
            finish(possible.results);
          }
        }
        
        
      }
    } else if (info.dets === "check" || strings.extra) {
      //console.log("checking details");
      let tests = buildtests(methods, r);
      if (tests.err) {
          cb(tests.err);
        } else {
          let possible = testnames(r, tests.results, strings, notes);
          if (possible.err) {
            cb(possible.err);
          } else {
            finish(possible.results);
          }
        }
      
      
    }
    
  }
}
  
  function finish(things) {
    let keys = ["methods", "variations", "unmethods"];
    notes.titles = [];
    //perf.details = 
    let results = {
      details: detail === "" ? "" : dets[0].fulltext
    }
    if (r.nonMethods) {
      results.nonMethods = r.nonMethods;
      notes.nonMethods = r.nonMethods;
    }
    keys.forEach(k => {
      if (things[k]) {
        //console.log(k);
        things[k].forEach(th => {
          notes.titles.push(th.title);
          if (results[k]) {
            results[k].push(th.id);
          } else {
            results[k] = [th.id];
          }
        });
      }
    });
    cb(null, results);
  }
  
  
  
}

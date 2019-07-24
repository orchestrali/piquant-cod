const stageNames = ["singles", "minimus", "doubles", "minor", "triples", "major", "caters", "royal", "cinques", "maximus", "sextuples", "fourteen", "septuples", "sixteen", "octuples", "eighteen"];

const leftovers = ["", " ", ", ", " and ", ", and ", "spliced ", "spliced and "];
const pb = ["and pb", ", pb", "/pb", "/ pb", ": pb", ") pb"]

const connect = require('../../mongoose/connect2.js');
const find = require('../../find/findFields.js');
const process = require('./detprocess.js');
var fns = [{path: "./det1.js"}, {path: "./det2.js", callback: true}, {path: "./det3.js"}, {path: "./det4.js"}];

module.exports = function details(perf, notes, dets, cb) {
  
  let r = {
    methods: [],
    stages: [],
    classes: [],
    unmethods: [],
    vars: [],
    titleExtra: perf.titleExtra ? perf.titleExtra.replace("(", "").replace(")", "") : "",
    numbells: perf.numbells
  };
  if (perf.titleExtra) r.nums = require('./det0.js')(perf.titleExtra);
  let methods = [];
  let title = perf.title.toLowerCase();
  //console.log(title);
  let t2 = title;
  let little = title.startsWith("lb") || title.includes(" and lb");
  
  for (let i = 0; i < stageNames.length; i++) {
    if (title.indexOf(stageNames[i]) > -1) {
      r.stages.push(i+3);
      t2 = t2.replace(new RegExp(stageNames[i], "g"), "").replace(/  +/g, " ");
    }
  }
  //console.log(t2);
  let q = {
      fields: "title class stage oldtitle name classification"
    };
  
  if (r.stages.length === 0) {
    console.log("no stage name");
    q.query = {stage: {$lt: perf.numbells+1}};
  } else {
    q.query = {stage: {$in: r.stages}};
  }
  
  
    //get method titles for stages in pStages
  
    find("method", q, (mArr) => {
      console.log(mArr.length + " methods match stage");
      find("unmethod", q, (umArr) => {
        for (let i = 0; i < mArr.length; i++) {
          mArr[i].type = "method";
        }
        for (let i = 0; i < umArr.length; i++) {
          umArr[i].type = "unmethod";
        }
        methods = mArr.concat(umArr);
        r.unmethods = umArr;
        
        if (r.stages.includes(5)) {
          console.log("getting variations");
          find("variation", {query: {}, fields: "name stage altnames title"}, (vArr) => {
            
            for (let i = 0; i < vArr.length; i++) {
              vArr[i].type = "variation";
              if (vArr[i].altnames.length > 0) {
                vArr[i].altnames.forEach(n => {
                  let alt = {
                    name: n.slice(0, n.lastIndexOf(" ")),
                    title: n,
                    stage: vArr[i].stage,
                    type: "variation",
                    realtitle: vArr[i].title
                  }
                  methods.push(alt);
                })
              }
            }
            r.vars = vArr;
            methods = methods.concat(vArr);
            //console.log(methods[methods.length-1]);
            first();
            
          });
          
        } else {
          first();
        }
        
        
        function first() {
          if (checkDone(t2) && !little) {
            console.log("stage only");
            r.status = "stage only";
            next(t2, 0);
          } else {
            if (little) {
              r.methods.push(mArr.find(o => o.name === ""));
              title = title.replace("lb", "").replace(/  +/g, " ");
            }
            methods.sort((a,b) => b.title.length-a.title.length);
            if (title.startsWith("st. ") || title.includes(" st. ")) {
              title = title.replace("st. ", "st ")
            }
            for (let i = 0; i < methods.length; i++) {
              let old = methods[i].oldtitle ? methods[i].oldtitle.find(e => title.indexOf(e.toLowerCase()) > -1) : null;
              let replace = title.includes(methods[i].title.toLowerCase()) ? methods[i].title.toLowerCase() : old ? old : null;

              if (replace) {
                r.methods.push(methods[i]);
                title = title.replace(replace, "").replace(/  +/g, " ");
              }
            }

            if (checkDone(title)) {
              //finished processing performance title!
              cb(process(r, dets, methods, notes));
            } else {
              console.log("more to do");
              next(title, 0);
            }
          }
          
        }
        
      });
    });
  
  
  
  
  function next(t, i) {
    if (!checkDone(t)) {
      if (i < fns.length) {
        if (fns[i].callback) {
          require(fns[i].path)(t, r, (title) => {
            i++;
            next(title, i);
          });
        } else {
          title = require(fns[i].path)(t, r);
          i++;
          next(title, i);
        }
      } else {
        //console.log("remnants: "+t);
        if (r.bothcats) notes.bothcats = true;
        notes.titleRemnants = t;
        cb(process(r, dets, methods, notes));
      }
    } else {
      cb(process(r, dets, methods, notes));
    }
    
  }
  
  
  
}


function checkDone(t) {
  return leftovers.includes(t);
}
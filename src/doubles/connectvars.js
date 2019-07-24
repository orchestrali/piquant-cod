var variations = require('./variations.js');
const methods = require('./methods.json');
const connect = require('../mongoose/connect2.js');
const find = require('../find/find.js');
const compare = require('../compareArr.js');
const add = require('../mongoose/addRecords.js');

module.exports = function con(cb) {
  variations.sort((a,b) => {
    let x = a.alt ? 1 : 0; 
    let y = b.alt ? 1 : 0;
    return x-y;
  });
  
  connect();
  find("doublescall", {}, (calls) => {
    let vars = [];
    for (let i = 0; i < variations.length; i++) {
      let v = variations[i];
      let c = [];
      v.calls.forEach(o => {
        let call = calls.find(x => x.code === o);
        if (call) {
          c.push(call._id);
        }
      });
      let m;
      if (v.method) {
        m = methods.find(o => o.name === v.method);
      } else if (v.mnum) {
        m = methods.find(o => o.num === v.mnum);
      }
      if (m && !v.alt && v.name != v.name.toUpperCase()) { //v.name.toLowerCase() != m.name.toLowerCase()
        let obj = {
          stage: 5,
          calls: c,
          name: v.name,
          title: v.name + " Doubles"
        }
        if (m && m.mNum) {
          obj.method = {id: m.mNum, title: m.name + " Doubles"}
        } else if (m && m.umNum) {
          obj.unmethod = {id: m.umNum, title: m.name + " Doubles"}
        }
        
        vars.push(obj);
      } else if (m && v.alt) {
        let indices = []
        vars.forEach((o, j) => {
          if ((o.method && o.method.title === m.name + " Doubles") || (o.unmethod && o.unmethod.title === m.name + " Doubles")) {
            indices.push(j);
          }
        });
        let j = 0;
        
        while (j < indices.length && !compare(vars[indices[j]].calls, c)) {
          j++;
        }
        if (j < indices.length) {
          if (vars[indices[j]].altnames && !vars[indices[j]].altnames.includes(v.name + " Doubles")) {
            vars[indices[j]].altnames.push(v.name + " Doubles");
          } else if (!vars[indices[j]].altnames) {
            vars[indices[j]].altnames = [v.name + " Doubles"];
          }
        }
        
      }
      
    }
    add(vars, "variation", cb);
    
  });
  
  
}
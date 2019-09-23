const find = require('../find/findFields.js');
const get = require('./b.js');
const perf = require('./c.js');

module.exports = function test(perfs, dups, cb) {
  let sets = [];
  let extra = [];
  loop(0);
  
  function loop(i) {
    let current = perfs[i];
    if (!current.changes || ((!current.methods || current.methods.length === 0) && (!current.variations || current.variations.length === 0))) {
      i++;
      next(i);
    } else {
      let q = {
        query: {date: current.date, changes: current.changes},
        fields: "bbNum"
      };
      if (current.methods.length === 1) {
        q.query.methods = current.methods[0];
      } else if (current.variations.length === 1) {
        q.query.variations = current.variations[0];
      }
      
      find("bbtext", q, (res) => {
        if (res.length) {
          let nums = res.map(r => r.bbNum).concat([current.bbNum]);
          let tt = [];
          nums.forEach(n => tt.push(n));
          getperf(tt, 0, (texts) => {
            let dd = [];
            for (let j = 0; j < texts.length-1; j++) {
              if (texts[j] === texts[texts.length-1]) {
                dd.push(nums[j]);
              }
            }
            if (dd.length) {
              if (i%50 === 0) console.log("duplicate found: "+current.bbNum);
              dd.push(current.bbNum);
              sets.push(dd);
              extra.push(current.bbNum);
            }
            i++;
            next(i);
            
          });
          
        } else {
          i++;
          next(i);
        }
        
      });
      
    }
    
  }
  
  function next(i) {
    if (i < perfs.length) {
      loop(i);
    } else {
      console.log("sets length: "+sets.length);
      deal();
    }
  }
  
  
  function deal() {
    for (let i = 0; i < sets.length; i++) {
      let c = sets[i];
      let set = dups.find(a => c.some(e => a.includes(e)));
      if (set) {
        c.forEach(e => {
          if (!set.includes(e)) {
            set.push(e);
          }
        });
        set.sort((a,b) => a-b)
      } else {
        dups.push(c);
      }
    }
    
    cb(perfs.filter(p => !extra.includes(p.bbNum)), dups);
    
    
  }
}


function getperf(arr, i, cb) {
  let num = arr[i]
  //if (i === 0) console.log(arr);
  get(arr[i], (text) => {
    arr.splice(i, 1, perf(text)); //{num: num, text: perf(text)}
    if (i < arr.length-1) {
      
      getperf(arr, ++i, cb);
    } else {
      cb(arr);
    }
  });
}
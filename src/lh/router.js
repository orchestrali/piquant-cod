const find = require('../find/findFields.js');
const compArr = require('../compareArr.js');
const places = require('../places.js');
const cycle = require('./cycle.js');
const connect = require('../mongoose/connect2.js');
const plainbob = require('./plainbob.js');
const grandsire = require('./grandsire.js');

const codes1 = ["a", "b", "c", "d", "e", "f", "g", "h", "j", "k", "l", "m"];
const codes2 = ["p", "q", "r", "s"];

module.exports = function router(cb) {
  let i = 4;
  let leadheads = [], cycles = [];
  let connection = connect();
  
  getMethods();
  
  function getMethods() {
    console.log(i);
    let query = i < 13 ? {stage: i} : {stage: {$gt: 12}};
    let q = {
      query: query,
      fields: "title leadHead leadHeadCode pnFull pbOrder"
    };
    
    find("method", q, (arr) => {
      //do stuff with arr
      doStuff(arr);
      if (i < 13) {
        i++;
        getMethods();
      } else {
        cb({leadheads: leadheads, cycles: cycles});
      }
    });
    
  }
  
  function doStuff(arr) {
    let lhs = [];
    let cs = [];
    for (var j = 0; j < arr.length; j++) {
      let lh = arr[j].leadHead;
      let lhpn = arr[j].pnFull[arr[j].pnFull.length-1];
      let pn1 = arr[j].pnFull[0];
      let stage = lh.length;
      let index = lhs.findIndex(o => o.leadhead == lh && compArr(o.lhpn, lhpn) && compArr(o.pn1, pn1));
      
      if (index == -1) {
        let newlh = {
          stage: stage,
          leadhead: lh,
          lhpn: lhpn,
          pn1: pn1,
          code: arr[j].leadHeadCode ? arr[j].leadHeadCode : "z",
          plainbob: plainbob().includes(lh),
          grandsire: grandsire().includes(lh)
        }
        
        lhs.push(newlh);
        
        if (cs.findIndex(o => o.cycle.includes(lh)) == -1) {
          let numhunts = 0;
          let hunts = [];
          for (var n = 0; n < lh.length; n++) {
            if (lh[n] == places[n]) {
              numhunts++;
              hunts.push(n+1);
            }
          }
          let c = {
            stage: stage,
            cycle: cycle(lh),
            numHunts: numhunts,
            hunts: hunts,
            plainbob: newlh.plainbob,
            grandsire: newlh.grandsire
          };
          
          if (arr[j].pbOrder.length > 1) {
            if (arr[j].pbOrder.some(e => e.length != arr[j].pbOrder[0].length)) {
              c.differential = true;
              c.shortcourse = false;
            } else {
              c.differential = false;
              c.shortcourse = true;
            }
          } else {
            c.differential = false;
            c.shortcourse = false;
          }
          
          cs.push(c);
        }
      }
      
    }
    leadheads = leadheads.concat(lhs);
    cycles = cycles.concat(cs);
    
  }
  
  
}
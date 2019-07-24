const places = require("../places.js");
const experiment = [
  {
    calls: ["4th place lead-end bob", "1234 lead-end single"],
    conditions: [{stage: [6,8,10,12,14,18,20,22], codes: "abcdef"}, {stage: [7,9,11,13,15,17], codes: "pq"}]
  },
  {
    calls: ["4th place lead-end bob", "123 lead-end single"],
    conditions: [{stage: [5], codes: "pqrs"}]
  },
  {
    calls: ["4th place lead-end bob", "n-2,n-1 lead-end single"],
    conditions: [{stage: [6], codes: "ghlm"}]
  },
  {
    calls: ["n-2 lead-end bob", "n-2,n-1 lead-end single"],
    conditions: [{stage: [8,10,12,14,16,18,20,22], codes: "ghjklm"}],
    //test: function(stage, pn) {return !pn[pn.length-1].includes(stage-2)}
  },
  {
    calls: ["Grandsire bob", "Grandsire single"],
    conditions: [{stage: [5,7,9,11,13,15,17], codes: "abcdefghjklm"}, {stage: [6,8,10,12,14,16,18,20,22], codes: "pq"}],
    test: function(stage, pn) {return !pn[pn.length-2].includes(3)}
  }
];
const huntclasses = ["Treble Place", "Hybrid", "Alliance"]

module.exports = function calls(method, callArr) {
  method.calls = [];
  let arr = callArr.filter(o => o.stage === method.stage);
  
  if (arr.some(o => o.methods.includes(method.title))) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].methods.includes(method.title)) {
        //add call id to method;
        method.calls.push(arr[i]._id);
      }
    }
    
  } else if (method.leadHeadCode) {
    let c = experiment.find(o => o.conditions.includes(e => e.stage.includes(method.stage) && e.codes.indexOf(method.leadHeadCode[0]) > -1));
    if (c && (!c.test || (c.test && c.test(method.pnFull)))) {
      //add c.calls to method
      let calls = arr.filter(o => c.calls.includes(o.description));
      for (var i = 0; i < calls.length; i++) {
        method.calls.push(arr[i]._id);
      }
    }
    
  } else if (method.stage > 4 && (method.classification.plain || method.classification.trebleDodging || huntclasses.includes(method.class)) && method.huntBells.includes(1)) {
    let calls = [];
    if (method.stage % 2 === 0) {
      if (method.pn.substring(method.pn.length-2) === "12") {
        //add 4th place, 1234 single
        calls = arr.filter(o => o.description === "4th place lead-end bob" || o.description === "1234 lead-end single");
      } else if (method.pn.substring(method.pn.length-2) === "1"+places[method.stage-1] && method.stage > 6) {
        //add n-2 calls
        calls = arr.filter(o => o.description === "n-2 lead-end bob" || o.description === "n-2,n-1 lead-end single");
      } else if (method.stage === 6 && method.pn.substring(method.pn.length-2) === "16") {
        calls = arr.filter(o => o.description === "4th place lead-end bob" || o.description === "n-2,n-1 lead-end single");
        
      }
    } else if (method.stage % 2 === 1) {
      if ((method.pn.substring(method.pn.length-3) === "12"+places[method.stage-1] || method.pn.substring(method.pn.length-1) === "1") && method.stage > 5) {
        //add 4th place, 1234 single
        calls = arr.filter(o => o.description === "4th place lead-end bob" || o.description === "1234 lead-end single");
      } else if (method.stage === 5 && (method.pn.substring(method.pn.length-1) === "1" || method.pn.substring(method.pn.length-3) === "125")) {
        calls = arr.filter(o => o.description === "4th place lead-end bob" || o.description === "123 lead-end single");
      }
    }
    calls.forEach(e => method.calls.push(e._id));
  } 
  
}
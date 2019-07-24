const places = require('../places.js');

module.exports = function addNums(method) {
  method.numWorking = method.stage - method.numHunts;
  method.huntBells = [];
  method.pbOrder = [];
  let working = [];
  
  if (method.numHunts > 0) {
    for (var i = 0; i < method.stage; i++) {
      if (method.leadHead[i] == places[i]) {
        method.huntBells.push(i+1);
      } else {
        working.push(i+1);
      }
    }
    if (method.huntBells.length != method.numHunts) {
      console.log("number of hunt bells appears to be wrong: " + method.title);
    }
  } else {
    for (var i = 1; i <= method.stage; i++) working.push(i);
  }
  
  let stationary = [];
  for (var i = 1; i <= method.stage; i++) {
    if (method.pnFull.every(e => e.includes(i))) {
      stationary.push(i);
    }
  }
  if (stationary.length > 0) method.stationaryBells = stationary;
  
  //console.log("adding pbOrder");
  
  if (method.numWorking > 0) {
    let pbs = [];
    let working2 = working;
    
    while (working2.length > 0) {
      pbs.push(working2[0]);
      working2.shift();
      let next = method.leadHead.indexOf(places[pbs[pbs.length-1]-1])+1;
      do {
        pbs.push(next);
        let i = working2.indexOf(next);
        working2.splice(i, 1);
        next = method.leadHead.indexOf(places[pbs[pbs.length-1]-1])+1;
      } while (!pbs.includes(next))
        
      method.pbOrder.push(pbs);
      pbs = [];
    }
  }
  
  //console.log("pbOrder: "+ method.pbOrder);
  
  if (!method.classification.differential && method.numWorking > 0) {
    method.leadsInCourse = method.numWorking;
  } else if (method.numWorking == 0) {
    method.leadsInCourse = 1;
  } else {
    let cycle = method.pbOrder[0].length;
    if (method.pbOrder.slice(1).every(arr => arr.length == cycle)) {
      method.leadsInCourse = cycle;
    } else {
      let leads = 1;
      let leadhead = method.leadHead;
      let transpos = method.leadHead.split('').map(e => places.indexOf(e)+1);
      let roundsStr = places.substring(0, method.stage);
      do {
        let newleadhead = "";
        for (var i = 0; i < transpos.length; i++) {
          newleadhead += leadhead[transpos[i]-1]
        }
        leads++;
        leadhead = newleadhead;
      } while (leadhead != roundsStr)
      method.leadsInCourse = leads;
    }
  }
  
  //console.log("adding max blows");
  
  if (method.stationaryBells) {
    console.log("stationary bells");
    method.maxBlows = method.leadLength * method.leadsInCourse;
  } else {
    //console.log("no stationary");
    let pn = method.pnFull;
    let maxblows = 1;
    if (pn.some(e => Array.isArray(e))) {
      
      maxblows++;
      
      if (method.leadLength > 2) {
        let pnPlaces = [];
        for (var i = 1; i <= method.stage; i++) {
          if (pn.some(x => x.includes(i))) pnPlaces.push(i);
        }
        //console.log("pnPlaces: "+pnPlaces);

        for (var i = 0; i < pnPlaces.length; i++) {
          //console.log("checking place "+pnPlaces[i]);
          let included = [];
          for (var j = 0; j < pn.length; j++) {
            if (Array.isArray(pn[j]) && pn[j].includes(pnPlaces[i])) {
              included.push(1);
            } else {
              included.push(0);
            }
          }
          ///*
          if (included.includes(1)) {
            let start = included.indexOf(1, included.indexOf(0)) == -1 ? included.indexOf(1) : included.indexOf(1, included.indexOf(0));
            let index = start;
            let streak = 2;
            do {
              index < included.length-1 ? index++ : index = 0;
              included[index] == 1 ? streak++ : streak = 1;
              maxblows = Math.max(maxblows, streak);
            } while (index != start);

          }
        }
      }
      
      //*/
    }
    
    method.maxBlows = maxblows;
  }
  
  
  
  
  
  return method;
}
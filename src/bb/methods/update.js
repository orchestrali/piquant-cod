const connect = require('../../mongoose/connect2.js');
const aggregate = require('../mongoose/aggregate.js');
const updateMany = require('../../find/updateMany.js');
const find = require('../../find/findFields.js');
const fs = require('fs');
var updated = require('./updated.json');

module.exports = function update(num) {
  let db = connect();
  //, class: {$in: ["Treble Place"]}x
  find("method", {query: {stage: 6}, fields: "title altnames"}, (methods) => {
    if (methods.length) {
      //if (methods.length < num) console.log("not that many methods left!");
      loop(0);
    } else {
      console.log("no methods match search");
    }
    
    
    function loop(i, o) {
      let q = {title: o > -1 ? methods[i].altnames[o] : methods[i].title}
      console.log(q.title);
      updateMany(db, {coll: "bbtexts", query: q, update: {$set: {variations: [q.title]}}}, () => {
        updated.push(q.title);
        if (i < num && i < methods.length-1) {
          loop(i+1);
        } else if (i === num || i === methods.length-1) {
          console.log("finished looping");
          fs.writeFileSync('src/bb/methods/updated.json', JSON.stringify(updated, null, 2));
        }
        
      });
      
    }
    
    
  });
  
  
}


/*
function loop(i, o) {
      let q = {title: o > -1 ? methods[i].altnames[o] : methods[i].title}
      console.log(q.title);
      updateMany(db, {coll: "bbtexts", query: q, update: {$set: {variations: [q.title]}}}, () => {
        updated.push(q.title);
        
        if (o === undefined && methods[i].altnames.length) {
          loop(i, 0);
        } else if (i < num && i < methods.length-1 && (methods[i].altnames.length === 0 || o === methods[i].altnames.length-1)) {
          loop(i+1);
        } else if (o && o < methods[i].altnames.length-1) {
          loop(i, o+1);
        } else if (i === num || i === methods.length-1) {
          console.log("finished looping");
          fs.writeFileSync('src/bb/methods/updated.json', JSON.stringify(updated, null, 2));
        }
        
      });
      
    }
    
    
    function loopvars(i, o) {
      let q = {title: o > -1 ? methods[i].altnames[o] : methods[i].title}
      console.log(q.title);
      updateMany(db, {coll: "bbtexts", query: q, update: {$set: {variations: [q.title]}}}, () => {
        updated.push(q.title);
        if (i < num && i < methods.length-1) {
          loop(i+1);
        } else if (i === num || i === methods.length-1) {
          console.log("finished looping");
          fs.writeFileSync('src/bb/methods/updated.json', JSON.stringify(updated, null, 2));
        }
        
      });
      
    }
*/
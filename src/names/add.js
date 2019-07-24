const connectDrop = require('../mongoose/connectDrop.js');
const connect = require('../mongoose/connect2.js');
const find = require('../find/findFields.js');
const add = require('../mongoose/addRecords.js');
const build = require('./build.js');
const unique = require('./unique.js');
const mults = require('./defaults.js');

const classes = ["Surprise", "Bob", "Delight", "Alliance", "Treble Bob", "Treble Place", "Place", "Hybrid", "Differential", "Principle"];

module.exports = function addNames(cb) {
  let things = {
    names: [],
    oldtitles: []
  };
  connect();
  //connectDrop(["names"], (db) => {
    
    console.log("getting first class of methods");
    getMethods(0);
    
    function getMethods(i) {
      let q = {
        query: {class: classes[i]},
        fields: "title name classification class stage oldtitle"
      }
      find("method", q, (arr) => {
        console.log(classes[i] + ": " + arr.length);
        build(arr, things);
        i++;
        if (i < classes.length) { //
          getMethods(i);
        } else {
          build(things.oldtitles, things);
          unique(things.names);
          mults(things.names, cb);
          //cb();
          //add(things.names, "name", () => cb());
        }
        
      });
      
      
    }
    
    
    
    
  //});
  
}
const add = require('./mongoose/addRecords.js');
const connect = require('./mongoose/connect2.js');
const find = require('./find/find.js');
var sample = require('./samples/method.js');
var bbperf = require('./performance.json');
const types = ["method", "variation", "unmethod"]
module.exports = function process() {
  connect();
  
  let q = {title: "Ursa Minor"};
  
  find("title", q, (titles) => {
    
    sample.forEach(s => {
      let title = titles.find(t => t.title === s.title);
      if (title) {
        s._id = title.string;
      }
    });
    add(sample, "method", () => console.log("done"));
  });
  

}

/*
let q = {
    query: {},
    fields: "title"
  }
  let titles = [];
  let i = 0;
  loop();
  function loop() {
    find(types[i], q, (arr) => {
      arr.forEach(m => {
        titles.push({title: m.title, string: m._id, type: types[i]})
      });
      i++;
      if (i < types.length) loop();
      else end();
    });
    
  }
  
  function end() {
    add(titles, "title", () => {console.log("done")});
  }
  
  */
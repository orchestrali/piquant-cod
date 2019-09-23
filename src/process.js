const add = require('./mongoose/addRecords.js');
const connect = require('./mongoose/connect2.js');
const find = require('./find/find.js');
const findFields = require('./find/findFields.js');
const del = require('./find/deleteOne.js');
const words = require('./names/words.js');
var sample = require('./samples/method.js');
var bbperf = require('./performance.json');
const types = ["method", "variation", "unmethod"];

module.exports = indexinfo;
  
function process() {
  connect();
  
  let q = {query: {}, fields: "name"};
  let methods = [];
  
  let i = 0;
  loop();
  function loop() {
    console.log("finding "+types[i]+"s");
    findFields(types[i], q, (arr) => {
      arr.forEach(m => {
        methods.push({name: m.name, type: types[i]});
      });
      i++;
      if (i < types.length) loop();
      else end();
    });
    
  }
  
  function end() {
    console.log("processing");
    let ww = words(methods);
    
    add(ww, "word", () => {console.log("done")});
  }

}

function unique(cb) {
  var db = connect();
  db.collection("bbtexts").createIndex({bbNum: 1}, {dropDups: true, unique: true}, (err, indexName) => {
    //?????
    console.log(err);
    listIndex(cb);
  });
  
}

function listIndex(cb) {
  var db = connect();
  db.collection("bbtexts").indexes((err, indexes) => {
    console.log(indexes);
    cb();
  });
  
}

function indexinfo(cb) {
  var db = connect();
  db.collection("bbtexts").indexInformation((err, info) => {
    cb(info);
  });
}

function delLoop(cb) {
  var db = connect();
  let nums = [];
  let i = 88301;
  let max = 1;
  let deleted = 0;
  
  find("bbtext", {bbNum: {$gt: i-1}}, (r) => {
    for (i; i < 91301; i++) {
      let num = r.filter(p => p.bbNum === i).length;
      if (num > max) {
        max = num;
      }
      if (num > 1) {
        nums.push(i);
      }
    }
    if (nums.length) {
      loop2(0);
    } else {
      cb();
    }
  });
  
  function loop1(n) {
    find("bbtext", {bbNum: n}, (r) => {
      if (r.length > 1) {
        nums.push(n);
      }
      n++;
      if (n < 91301) { //11301
        loop1(n);
      } else {
        loop2(0);
      }
    });
  }
  
  function loop2(n) {
    if (n === 0) console.log(nums.length);
    //console.log(nums);
    del(db, "bbtexts", {bbNum: nums[n]}, (count) => {
      deleted += count;
      n++;
      if (n < nums.length) {
        loop2(n);
      } else {
        console.log("deleted: "+deleted);
        if (max > 2) {
          delLoop(cb);
        } else {
          cb();
        }
      }
    });
    
  }
  
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
/*

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
*/
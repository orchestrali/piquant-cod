const aggregate = require('../mongoose/aggregate.js');
const connect = require('../mongoose/connect2.js');
const get = require('./b.js');
const perf = require('./c.js');
var dups = require('../duplicates.json');
const fs = require('fs');
const s = require('stream');
const find = require('../find/findFields.js');
const del = require('../find/delete.js');

module.exports = function prune() {
  let arr = [
    { $match: { changes: {$exists: true}, variations: {$size: 0}, methods: {$size: 0}} },
    { $group: { _id: {changes: "$changes", date: "$date"}, bbNums: {$push: "$bbNum"} } }, //, variation: {$arrayElemAt: ["$variations", 0]}
    { $project: { _id: 0, date: "$_id.date", changes: "$_id.changes", bbNums: 1 } } //, variation: "$_id.variation"
  ];
  let db = connect();
  let min;
  let delcount = 0;
  
  aggregate("bbtext", arr, (res) => {
    res = res.filter(e => e.bbNums.length > 1 && (e.bbNums.every(n => n > 95350) )).sort((a,b) => {return a.bbNums[0]-b.bbNums[0]}); //|| e.bbNums.some(n => n > 400000)
    console.log(res.length);
    let sets = [];
    //console.log(res[2000]);
    loop(0); //7935
    
    function loop(i) {
      if (res[i].length > 10) {
        console.log("next array of length "+res[i].length);
        console.log("i: "+i);
        console.log(sets.length);
        deal(0);
      } else {
        console.log(res[i]);
        let nums2 = [];
        res[i].bbNums.forEach(n => nums2.push(n));
        getperf(nums2, 0, (texts) => {
          let nums = res[i].bbNums;
          //console.log("texts gotten");
          let j = 0;
          let exclude = [];
          while (j < texts.length-1) {
            let dd = [nums[j]];
            for (let k = j+1; k < texts.length; k++) {
              if (texts[k] === texts[j]) {
                dd.push(nums[k]);
                exclude.push(k);
              }
            }
            if (dd.length > 1) sets.push(dd);
            do {
              j++;
            } while (exclude.includes(j));
          }
          i++;
          //console.log("i: "+i);
          if (sets.length <= 399 && i < res.length) { //i < Math.min(1000, res.length)
            loop(i);
          } else {
            console.log("i: "+i);
            console.log(sets.length);
            deal(0);
            //console.log(res[i-1].bbNums);
          }
        });
      }
      
    }
    
    function deal(i) {

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
      find("bbtext", {query: {bbNum: {$in: set ? set : c}}, fields: "bbNum"}, (rr) => {
        let extra = rr.sort((a,b)=>a.bbNum-b.bbNum).slice(1).map(o => o.bbNum);
        //console.log(extra);
        if (extra.length) {
          if (!min || extra[0] < min) {
            min = extra[0];
          }
          del(db, "bbtexts", {bbNum: {$in: extra}}, (count) => {
            if (count > 0) {
              delcount++;
            }
            if (i < sets.length-1) {
              deal(++i);
            } else {
              console.log(min);
              console.log("deleted: "+delcount);
              dups.sort((a,b) => a[0]-b[0]);
              let stream = new s.Readable();
              stream.push(JSON.stringify(dups, null, 2));
              stream.push(null);
              stream.pipe(fs.createWriteStream('src/duplicates.json'));
              console.log("finished");
            }
          });
        }
      });
      
      
      
    }
    
    
  });
  
  
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
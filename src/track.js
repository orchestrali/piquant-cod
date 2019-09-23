const dne = require('./dne.json');
const dups = require('./duplicates.json');
const connect = require('./mongoose/connect2.js');
const agg = require('./mongoose/aggregate.js');

module.exports = track2;
  
function track() {
  let extra = 0;
  
  dups.forEach(d => {
    extra += (d.length-1);
  });
  
  return extra + dne.length;
}


function track2() {
  let arr = [
    {$group: {_id: {$floor: [{$divide: ["$bbNum", 1000]}]}, bbNums: {$push: "$bbNum"}}},
    {$project: {
      missing: {$filter: {input: {$range: [{$min: "$bbNums"}, {$max: "$bbNums"}]}, cond: {$not: {$in: ["$$this", "$bbNums"]}}}},
      numMissing: {$subtract: [1000, {$size: "$bbNums"}]}
    }}
  ];
  connect();
  
  agg("bbtext", arr, (res) => {
    res = res.filter(r => r.numMissing > 0).sort((a,b) => a._id - b._id);
    console.log(res.length);
    
    let sets = [];
    let set;
    let num = 0;
    
    res.forEach(r => {
      r.missing.forEach(n => {
        if (!dne.includes(n) && !dups.some(a => a.includes(n))) {
          num++;
          if (set && set.length && set[set.length-1]+1 === n) {
            set.push(n);
          } else {
            if (set && set.length) {
              sets.push(set);
            }
            set = [n];
          }
        }
      });
    });
    if (set && set.length) {
      sets.push(set);
    }
    console.log("num missing: "+num);
    console.log("num sets: "+sets.length);
    console.log(sets[0][0] + " " + sets[sets.length-1][0]);
    
  });
  
}
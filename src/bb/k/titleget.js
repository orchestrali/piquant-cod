const find = require('../../find/findFields.js');

module.exports = function getmethods(r, cb) {
  let methods = [];
  let q = {
    fields: "title class stage oldtitle name classification"
  };
  if (r.stages.length === 0) {
    console.log("no stage name");
    q.query = {stage: {$lt: r.numbells+1}};
  } else {
    q.query = {stage: {$in: r.stages}};
  }
  //console.log(q.query);
  find("method", q, (mArr) => {
    console.log(mArr.length + " methods match stage(s)");
    find("unmethod", q, (umArr) => {
      if (umArr.length > 0) console.log("some unmethods match");
      for (let i = 0; i < mArr.length; i++) {
        let obj = {
          type: "method"
        }
        for (let k in mArr[i]) {
          obj[k] = mArr[i][k];
        }
        methods.push(obj);
        mArr[i].type = "method";
        if (i ===200) {
          //console.log(obj);
        }
      }
      //console.log(mArr[mArr.length-1]);
      for (let i = 0; i < umArr.length; i++) {
        let obj = {
          type: "unmethod"
        }
        for (let k in mArr[i]) {
          obj[k] = mArr[i][k];
        }
        methods.push(obj);
      }
      //methods = mArr.concat(umArr);
      //r.unmethods = umArr;
      
      if (r.stages.includes(5) || r.numbells === 5 || (r.stages.length === 0 && r.numbells === 6)) {
        console.log("getting variations");
        find("variation", {query: {}, fields: "name stage altnames title"}, (vArr) => {
          //r.vars = vArr;
          for (let i = 0; i < vArr.length; i++) {
            vArr[i].type = "variation";
            //deal with altnames? arrrrgh
          }
          
          if (r.nums && r.nums.v && !r.nums.m && !r.nums.p) {
            methods = vArr;
          } else {
            methods = methods.concat(vArr);
          }
          cb(methods);

        });
      } else {
        //console.log(methods[200]);
        cb(methods);
      }
      
      
    });
  });
  
}
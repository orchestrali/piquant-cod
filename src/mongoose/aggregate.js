

module.exports = function aggregate(model, arr, cb) {
  let mod = require('../models/'+model+'.js');
  
  mod.aggregate(arr)
  .exec(function (err, results) {
    if (err) console.log(err);
    
    cb(results);
  });
  
}
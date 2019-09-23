

module.exports = function findmax(mod, q, sort, cb) {
  let model = require('../models/'+mod+'.js');
  
  model.find(q).sort(sort).limit(1).exec((err, result) => {
    if (err) {
      console.log(err);
      cb([]);
    }
    cb(result);
  });
  
  
}
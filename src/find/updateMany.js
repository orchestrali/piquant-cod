


module.exports = function update(db, info, cb) {
  
  db.collection(info.coll).updateMany(info.query, info.update, function (err, results) {
    if (err) console.log(err);
    //console.log("number of calls: " + results.length);
    console.log("updated: "+results.modifiedCount);
    cb();
    
  });
}
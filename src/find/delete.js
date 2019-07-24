


module.exports = function find(db, coll, query, cb) {
  
  db.collection(coll).deleteMany(query, null, function (err, results) {
    if (err) console.log(err);
    //console.log("number of calls: " + results.length);
    console.log("deleted: "+results.deletedCount);
    cb();
    
  })
}
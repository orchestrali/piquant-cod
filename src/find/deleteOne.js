


module.exports = function find(db, coll, query, cb) {
  //console.log(query);
  db.collection(coll).deleteOne(query, function (err, results) {
    if (err) console.log(err);
    //console.log(results);
    cb(results.deletedCount);
    
  });
}
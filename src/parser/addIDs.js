const mongoose = require('mongoose');

module.exports = function addIDs(method, titles) {
  let results = {}
  let title = titles.find(t => t.title === method.title);
  if (title) {
    method._id = title.string;
  } else {
    method._id = new mongoose.Types.ObjectId();
    results.title = {title: method.title, string: method._id, type: "method"};
  }
  
  let ids = [];
  let performances = [];
  
  if (method.performances) {
    for (var i = 0; i < method.performances.length; i++) {
      method.performances[i].method = method._id; 
      method.performances[i]._id = new mongoose.Types.ObjectId();
      ids.push(method.performances[i]._id);
      performances.push(method.performances[i]);
    }
    method.performances = ids;
  }
  results.method = method;
  results.performances = performances;
  
  return results;
}
const things = ["stageNames", "classes", "classes2", "stageclasses"];


const reference = function () {
  let obj = {};
  things.forEach(t => {
    obj[t] = require('./'+t+'.js');
  });
  return obj;
}();

module.exports = reference;
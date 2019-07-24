const stageNames = require('./stageNames');
const classes = require('./classes.js');

const stageclasses = (function (cl, st) {
  let results = [];
  cl.forEach(c => {
    st.forEach(s => {
      results.push(c + " " + s);
    });
  });
  return results;
})(classes, stageNames);


module.exports = stageclasses;
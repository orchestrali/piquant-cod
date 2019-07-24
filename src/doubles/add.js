const connect = require('../mongoose/connect2.js');
const add = require('../mongoose/addRecords.js');
const methods = require('./methods.json');

module.exports = function addstuff(cb) {
  let toadd = [];
  
  for (let i = 0; i < methods.length; i++) {
    if (!methods[i].mNum) {
      let unmethod = {
        stage: 5,
        class: methods[i].name.endsWith("Grandsire") ? "Bob" : methods[i].name.slice(methods[i].name.lastIndexOf(" ")+1),
        title: methods[i].name + " Doubles",
        name: methods[i].name.endsWith("Grandsire") ? methods[i].name : methods[i].name.slice(0, methods[i].name.lastIndexOf(" ")),
        classification: {
          plain: true,
          little: false,
          trebleDodging: false,
          differential: false
        }
      }
      toadd.push(unmethod);
    }
    
  }
  connect();
  add(toadd, "unmethod", cb);
  
  
}
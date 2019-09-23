const refs = require('./reference/refs.js');
const animals = require('./reference/animals.json');

module.exports = function analyze(arr, methods) {
   let mm = methods.filter(m => {
     return animals.some(a => {
       return RegExp("\b"+a+"\b", "i").test(m.name);
     });
   });
  console.log(mm.length);
}


/*
let results = {};
  let leftover = arr.length;
  
  refs.classes.forEach(s => {
    results[s] = arr.filter(p => p.title && p.title.toLowerCase().includes(s)).length;
    leftover -= results[s];
  });
  results.leftover = leftover;
  console.log(results); 
*/
/*
let num = arr.filter(p => {
     methods.some(m => {
       m.title.toLowerCase() === p.title;
     });
   }).length;
  console.log(num);
*/
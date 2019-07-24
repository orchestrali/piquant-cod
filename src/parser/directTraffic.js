const lexer = require('./lexer.js');
const handleProps = require('./handleProps.js');
const handleMethod = require('./handleMethod.js');
const compareSet = require('./compareSet.js');
const parsePN = require('../pn/parse.js');
const truth = require('./truth.js');
const addNums = require('./addNums.js');
const aboveBelow = require('./aboveBelow.js');
const addIDs = require('./addIDs.js');
const addCalls = require('./calls.js');
const keys1 = ['properties', 'method'];
const keys2 = ['stage','huntbellPath', 'classification', 'lengthOfLead','numberOfHunts', 'leadHead', 'leadHeadCode', 'falseness', 'symmetry'];
const keys2m = ['title', 'id', 'name', 'notation', 'references', 'performances', 'notes'];

const logger = require('../logger.js');
const combineAB = require('../combineAB.js');

//handling a single methodSet
module.exports = function directTraffic(obj, calls, titles) {
  let level1 = lexer(obj, keys1); //divide methodSet into properties and method(s)
  let props;
  let propObj;
  let methods = []; //for arrays of tokens
  let methodArr = []; //for method objects
  let results = {
    methods: [],
    performances: [],
    methodabs: [],
    titles: []
  }
  
  for (var i = 0; i < level1.length; i++) {
    if (level1[i].name == keys1[0]) {
      //turn properties tokens into an object with the methodSet properties
      props = lexer(level1[i].value, keys2);
      propObj = handleProps(props);
    } else if (level1[i].name == keys1[1]) {
      //turn methods into arrays of tokens
      if (Array.isArray(level1[i].value)) {
        for (var j = 0; j < level1[i].value.length; j++) {
          methods.push(lexer(level1[i].value[j], keys2.concat(keys2m)));
        }
      } else {
        methods.push(lexer(level1[i].value, keys2.concat(keys2m)));
      }
      //listen.info('method tokens', methods);
    }
  }
  //turn arrays of tokens into method objects
  for (var j = 0; j < methods.length; j++) {
    let mObj = handleMethod(handleProps(methods[j]), methods[j]);
    methodArr.push(mObj);
  }
  
  let pnErr = 0;
  //add methodSet values to method objects, add full PN, add IDs
  for (var k = 0; k < methodArr.length; k++) {
    let pnResults = parsePN(compareSet(propObj, methodArr[k]));
    
    if (!pnResults.error) {
      let method = addNums(truth(methodArr[k]));
      //console.log("method after nums: " + method);
      if (method.numHunts > 0) {
        //console.log("method has hunts");
        combineAB(results.methodabs, aboveBelow(method));
      }
      addCalls(method, calls);
      let idResults = addIDs(method, titles);
      results.methods.push(idResults.method); 
      results.performances = results.performances.concat(idResults.performances);
      if (idResults.title) {
        results.titles.push(idResults.title);
      }
    } else {
      pnErr++;
    }
  }
  methods = null;
  methodArr = null;
  if (pnErr > 0) {
    logger.warn(pnErr + " method(s) with pn error");
  }
  //listen.info(results.methods[results.methods.length-1]);
  return results;
}

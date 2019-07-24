const lexer = require('./lexer');
const numJoin = require('./numJoin');
const parseNumAbbr = require('./numAbbr');
const grouping = require('./grouping');
const stringify = require('./objToStr');

//takes input method, returns fully parsed array of place notation
module.exports = function parseNotation(method) {
  if (method.pn && method.stage) {
    let tokens = lexer(method.pn, method.stage);
    if (tokens.unknown.length > 0) {
      console.log('invalid place notation, ' + method);
      return {error: "invalid place notation"};
    } else {
      method.pnFull = stringify(grouping(parseNumAbbr(numJoin(tokens.tokens, method.stage))))
      return method;
    }
    //stringify(grouping(parseNumAbbr(numJoin(lexer(method.pn, numBells)), numBells)))
  } else {
    console.log('method missing PN or stage! ' + method);
    return {error: "method missing PN or stage!"};
  }
  
}
const white = function(x) {return RegExp("\s").test(x)}

module.exports = function firstLevel(pairs, tokens) {
  let elements = [];
  elements.push(pairs[0]);
  let next = pairs.findIndex(o => o.openIndex > pairs[0].closeIndex);
  while (next > -1) {
    elements.push(pairs[next]);
    next = pairs.findIndex(o => o.openIndex > pairs[next].closeIndex);
  }
  
  for (let i = 0; i < elements.length; i++) {
    let fulltext = "";
    for (let j = elements[i].openIndex+1; j < elements[i].closeIndex; j++) {
      if (tokens[j].type === "contents") {
        if (fulltext.length > 0 && !white(fulltext[fulltext.length-1]) && !white(tokens[j].value[0])) {
          fulltext += " ";
        }
        fulltext += tokens[j].value;
      }
    }
    if (fulltext.length > 0) {
      elements[i].fulltext = fulltext;
      //console.log("fulltext: "+fulltext);
    }
  }
  
  return elements; 
}


module.exports = function addValues(pairs, tokens) {
  //console.log(tokens[86]);
  //console.log(pairs[pairs.length-1]);
  for (let i = 0; i < tokens.length; i++) {
    //if (i === 1) console.log(tokens[i].type);
    if (tokens[i].type === "opening tag") {
      pairs.find(o => o.openIndex === i).opening = tokens[i].value;
    } else if (tokens[i].type === "contents") {
      let objs = pairs.filter(o => o.openIndex < i && i < o.closeIndex);
      //console.log(i+" objs length: "+objs.length);
      if (i === 1) {
        //console.log(objs);
      }
      let j = pairs.findIndex(o => o.openIndex === objs[objs.length-1].openIndex);
      if (pairs[j].text) {
        pairs[j].text.push(tokens[i].value);
      } else {
        pairs[j].text = [tokens[i].value];
      }
    }
  }
}